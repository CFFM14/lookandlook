/**
 * game.js —— 游戏核心主逻辑（Game 类）
 * 移植自 Cocos 版 GameManager.ts，并扩展：重力掉落 / 冰冻方块 / 6 关配置化 / 计时步数。
 *
 * 数据结构：
 *   grid[r][c]      —— 水果类型 1..12 或 0（空）
 *   cardNodes[r][c] —— card 对象或 null；card = {r, c, type, state, baseX, baseY, visual}
 *   frozen[r][c]    —— 1=带冰层 0=无（与卡片位置同步移动）
 *   singletonSet    —— Set<"r,c"> 单例（因炸弹产生奇数张的水果，通关前自动消除）
 *   card.state      —— 'normal'|'selected'|'eliminating'|'eliminated'|'frozen'|'thawing'|'mismatch'|'hintFlash'
 */
(function () {
  'use strict';

  var T = GameGlobal.TIMING;

  function Game(levelId) {
    this.levelId = levelId;
    this.cfg = GameGlobal.getLevelConfig(levelId);
    this.rows = this.cfg.rows;
    this.cols = this.cfg.cols;
    this.metrics = GameGlobal.getGridMetrics(this.cfg);

    this.grid = null;
    this.cardNodes = null;
    this.frozen = null;
    this.singletonSet = null;
    this.selectedCard = null;
    this.isProcessing = false;
    this.remainingPairs = 0;
    this.moves = 0;
    this.startTime = 0;
    this.connectionLine = null; // {points, color:'gold'|'blue', timeLeft}

    this.initLevel();
  }

  // ══════════════════════════════════════════════
  //  初始化
  // ══════════════════════════════════════════════

  Game.prototype.initLevel = function () {
    // 会话号：restart / 重新开局后，旧定时器回调自动失效（防止切页后误触发结算）
    this._session = (this._session || 0) + 1;
    this._won = false;
    var rows = this.rows, cols = this.cols;
    this.grid = [];
    this.cardNodes = [];
    this.frozen = [];
    this.singletonSet = new Set();
    this.selectedCard = null;
    this.isProcessing = false;
    this.moves = 0;
    this.connectionLine = null;
    this.startTime = Date.now();

    for (var r = 0; r <= rows + 1; r++) {
      this.grid[r] = [];
      this.cardNodes[r] = [];
      this.frozen[r] = [];
      for (var c = 0; c <= cols + 1; c++) {
        this.grid[r][c] = 0;
        this.cardNodes[r][c] = null;
        this.frozen[r][c] = 0;
      }
    }

    this.generateLayout();
    this.createCards();
    if (this.cfg.frozenRatio > 0) this.applyFrozen(this.cfg.frozenRatio);
  };

  /** 会话安全定时器：restart/切关后旧回调自动失效 */
  Game.prototype._after = function (delay, fn) {
    var self = this;
    var session = this._session;
    setTimeout(function () {
      if (self._session !== session) return;
      fn();
    }, delay);
  };

  /** 成对生成水果布局（Fisher-Yates 洗牌），复刻原版 */
  Game.prototype.generateLayout = function () {
    var totalCards = this.rows * this.cols;
    var pairsNeeded = totalCards / 2;
    var fruitTypeCount = this.cfg.fruitTypeCount;
    var types = [];
    var basePairs = Math.floor(pairsNeeded / fruitTypeCount);
    var remaining = pairsNeeded - basePairs * fruitTypeCount;

    for (var type = 1; type <= fruitTypeCount; type++) {
      for (var p = 0; p < basePairs; p++) {
        types.push(type, type);
      }
    }
    for (var i = 0; i < remaining; i++) {
      var t = Math.floor(Math.random() * fruitTypeCount) + 1;
      types.push(t, t);
    }

    this.shuffleArray(types);
    var idx = 0;
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        this.grid[r][c] = types[idx++];
      }
    }
    this.remainingPairs = pairsNeeded;
  };

  /** 创建卡片对象（含视觉状态） */
  Game.prototype.createCards = function () {
    var m = this.metrics;
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        var ft = this.grid[r][c];
        if (ft === 0) continue;
        var px = this.logicToPixel(r, c);
        var card = {
          r: r, c: c, type: ft,
          state: 'normal',
          baseX: px.x, baseY: px.y,
          visual: { x: px.x, y: px.y, scale: 1, iceAlpha: 0 },
        };
        this.cardNodes[r][c] = card;
      }
    }
  };

  /** 随机冻结 k 张卡片（尽量不相邻） */
  Game.prototype.applyFrozen = function (ratio) {
    var cells = [];
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        if (this.grid[r][c] !== 0) cells.push([r, c]);
      }
    }
    this.shuffleArray(cells);
    var k = Math.floor(cells.length * ratio);
    var count = 0;
    for (var i = 0; i < cells.length && count < k; i++) {
      var r = cells[i][0], c = cells[i][1];
      // 四邻已有冰冻则跳过（避免大片相邻）
      if (this.frozen[r - 1][c] || this.frozen[r + 1][c] ||
        this.frozen[r][c - 1] || this.frozen[r][c + 1]) continue;
      this.frozen[r][c] = 1;
      var card = this.cardNodes[r][c];
      if (card) {
        // 冰层只是视觉效果：卡片状态保持 normal，可正常选中参与配对；
        // 冰块在配对消除时碎裂消失（见 eliminatePair）
        card.visual.iceAlpha = 1;
      }
      count++;
    }
  };

  Game.prototype.shuffleArray = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
  };

  // ══════════════════════════════════════════════
  //  点击处理
  // ══════════════════════════════════════════════

  /** 玩家点击 (r, c) 卡片 */
  Game.prototype.onTapCard = function (r, c) {
    if (this.isProcessing) return;
    var card = this.cardNodes[r][c];
    if (!card || card.state === 'eliminated') return;

    // 所有卡片（含奇数残留卡）均可正常选中配对；最后多出的单张在剩余对清完后自动消除
    if (!this.selectedCard) {
      this.selectedCard = card;
      card.state = 'selected';
      this.highlightCard(card, true);
    } else if (this.selectedCard === card) {
      card.state = 'normal';
      this.highlightCard(card, false);
      this.selectedCard = null;
    } else {
      var first = this.selectedCard;
      this.isProcessing = true;
      card.state = 'selected';
      this.highlightCard(card, true);

      var path = GameGlobal.PathChecker.canConnect(this.grid, this.rows, this.cols,
        first.r, first.c, card.r, card.c);
      if (path) {
        this.eliminatePair(first, card, path);
      } else {
        this.showMismatch(first, card);
      }
    }
  };

  /**
   * 选中/取消缩放动画（复刻原版 Cocos FruitCard.setHighlight）：
   * 选中 → 弹到 1.18 再回落到 1.08 保持微大；取消 → 回到 1.0
   */
  Game.prototype.highlightCard = function (card, on) {
    if (on) {
      GameGlobal.Tween.to(card.visual, { scale: 1.18 }, 80, 'easeOut', function () {
        GameGlobal.Tween.to(card.visual, { scale: 1.08 }, 60, 'easeOut');
      });
    } else {
      GameGlobal.Tween.to(card.visual, { scale: 1 }, 100, 'easeOut');
    }
  };

  // ══════════════════════════════════════════════
  //  消除 / 失败
  // ══════════════════════════════════════════════

  /**
   * 配对消除（含冰层双层机制）：
   *   普+普 → 两张都消除
   *   普+冰 → 普通卡消除，冰卡只破冰（冰裂动画）保留为普通卡 —— 冰卡需配对两次才能真正消除
   *   冰+冰 → 两张都消除（双双击破）
   */
  Game.prototype.eliminatePair = function (card1, card2, path) {
    var self = this;
    var f1 = this.frozen[card1.r][card1.c] === 1;
    var f2 = this.frozen[card2.r][card2.c] === 1;
    // 破冰保留（仅"普+冰"中的冰卡）：keepX=true → 不消除
    var keep1 = f1 && !f2;
    var keep2 = f2 && !f1;
    var elim1 = !keep1;
    var elim2 = !keep2;

    var pos1 = card1.r + ',' + card1.c;
    var pos2 = card2.r + ',' + card2.c;
    // 消除的卡移除其单例标记（单例卡本身不可被点选，但防御性清理）
    if (elim1) this.singletonSet.delete(pos1);
    if (elim2) this.singletonSet.delete(pos2);

    // 连线（金色）+ 音效马上响
    this.connectionLine = { points: path, color: 'gold', timeLeft: T.ELIM_LINE };
    GameGlobal.SoundManager.play('elim');

    // ── 破冰保留的卡：冰裂动画，卡片留在棋盘 ──
    if (keep1) {
      this.frozen[card1.r][card1.c] = 0;
      var pk1 = this.logicToPixel(card1.r, card1.c);
      GameGlobal.SoundManager.play('thaw');
      GameGlobal.Renderer.spawnIceShards(pk1.x, pk1.y);
      GameGlobal.Tween.to(card1.visual, { iceAlpha: 0 }, 250, 'linear');
      card1.state = 'normal';
      this.highlightCard(card1, false);
    }
    if (keep2) {
      this.frozen[card2.r][card2.c] = 0;
      var pk2 = this.logicToPixel(card2.r, card2.c);
      GameGlobal.SoundManager.play('thaw');
      GameGlobal.Renderer.spawnIceShards(pk2.x, pk2.y);
      GameGlobal.Tween.to(card2.visual, { iceAlpha: 0 }, 250, 'linear');
      card2.state = 'normal';
      this.highlightCard(card2, false);
    }

    // ── 消除的卡 ──
    if (elim1) {
      this.grid[card1.r][card1.c] = 0;
      this.cardNodes[card1.r][card1.c] = null;
      var p1 = this.logicToPixel(card1.r, card1.c);
      card1.state = 'eliminating';
      GameGlobal.Renderer.spawnFirework(p1.x, p1.y);
      if (f1) { // 冰+冰：消除伴随冰裂
        GameGlobal.SoundManager.play('thaw');
        GameGlobal.Renderer.spawnIceShards(p1.x, p1.y);
        GameGlobal.Tween.to(card1.visual, { iceAlpha: 0 }, 180, 'linear');
      }
      GameGlobal.Tween.to(card1.visual, { scale: 0 }, T.ELIM_SCALE, 'easeIn', function () {
        card1.state = 'eliminated';
      });
    }

    if (elim2) {
      this._after(100, function () {
        self.grid[card2.r][card2.c] = 0;
        self.cardNodes[card2.r][card2.c] = null;
        var p2 = self.logicToPixel(card2.r, card2.c);
        card2.state = 'eliminating';
        GameGlobal.Renderer.spawnFirework(p2.x, p2.y);
        if (f2) {
          GameGlobal.SoundManager.play('thaw');
          GameGlobal.Renderer.spawnIceShards(p2.x, p2.y);
          GameGlobal.Tween.to(card2.visual, { iceAlpha: 0 }, 180, 'linear');
        }
        GameGlobal.Tween.to(card2.visual, { scale: 0 }, T.ELIM_SCALE, 'easeIn', function () {
          card2.state = 'eliminated';
        });
      });
    }

    // 连线 0.2s 后清除
    this._after(T.ELIM_LINE + 20, function () {
      if (self.connectionLine && self.connectionLine.color === 'gold') self.connectionLine = null;
    });

    // 全部动画结束后记账 + 后续（重力 / 胜利检测）
    this._after(T.ELIM_TOTAL, function () {
      self.selectedCard = null;
      self.isProcessing = false;
      if (elim1 || elim2) {
        self.moves++;
        // 破冰保留会改变类型奇偶结构 → 按类型全量重算对数与单例（最可靠）
        self.recomputeRemainingPairs();
        self.recomputeSingletons();
      }
      self.afterEliminate();
    });
  };

  Game.prototype.showMismatch = function (card1, card2) {
    var self = this;
    card1.state = 'mismatch';
    card2.state = 'mismatch';
    card1.shakeT = Date.now();
    card2.shakeT = Date.now();
    GameGlobal.SoundManager.play('fail');

    this._after(T.MISMATCH, function () {
      card1.state = 'normal';
      card2.state = 'normal';
      self.highlightCard(card1, false);
      self.highlightCard(card2, false);
      self.selectedCard = null;
      self.isProcessing = false;
    });
  };

  /**
   * 重新统计剩余对数 = 各类型剩余卡数 floor(count/2) 之和。
   * 破冰保留会改变类型数量的奇偶结构，手动增减账目容易出错，统一按类型重算最可靠。
   */
  Game.prototype.recomputeRemainingPairs = function () {
    var byType = {};
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        var card = this.cardNodes[r][c];
        if (card && card.state !== 'eliminated') {
          byType[card.type] = (byType[card.type] || 0) + 1;
        }
      }
    }
    var pairs = 0;
    for (var t in byType) {
      if (byType.hasOwnProperty(t)) pairs += Math.floor(byType[t] / 2);
    }
    this.remainingPairs = pairs;
  };

  /**
   * 全量重算单例标记：每种水果剩余奇数张时，最后 1 张标记为单例
   * （单例卡不可点选，剩余对清完后自动消除）
   */
  Game.prototype.recomputeSingletons = function () {
    this.singletonSet.clear();
    var byType = {};
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        var card = this.cardNodes[r][c];
        if (card && card.state !== 'eliminated') {
          (byType[card.type] = byType[card.type] || []).push(card);
        }
      }
    }
    for (var t in byType) {
      if (!byType.hasOwnProperty(t)) continue;
      var list = byType[t];
      if (list.length % 2 === 1) {
        var last = list[list.length - 1];
        this.singletonSet.add(last.r + ',' + last.c);
      }
    }
  };

  /** 消除流程收尾：剩余对>0 且有重力 → 重力动画；否则胜利检测 */
  Game.prototype.afterEliminate = function () {
    if (this.remainingPairs > 0 && this.cfg.gravity && this.hasCardsLeft()) {
      this.isProcessing = true;
      this.runGravityAnimation();
    } else {
      this.checkWinOrAutoClear();
    }
  };

  Game.prototype.hasCardsLeft = function () {
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        var card = this.cardNodes[r][c];
        if (card && card.state !== 'eliminated') return true;
      }
    }
    return false;
  };

  // ══════════════════════════════════════════════
  //  重力掉落
  // ══════════════════════════════════════════════

  /**
   * 按重力方向 compact（仅 1..ROWS/1..COLS 内部，外围 0 圈模型不变）
   * @returns [{card, fr, fc, tr, tc}] 需要动画的移动列表
   */
  Game.prototype.applyGravity = function () {
    var dir = this.cfg.gravity;
    var moves = [];
    if (!dir) return moves;

    if (dir === 'down' || dir === 'up') {
      for (var c = 1; c <= this.cols; c++) {
        var stack = [];
        if (dir === 'down') {
          for (var r = this.rows; r >= 1; r--) if (this.grid[r][c]) stack.push({ r: r, c: c });
        } else {
          for (var r = 1; r <= this.rows; r++) if (this.grid[r][c]) stack.push({ r: r, c: c });
        }
        var fill = (dir === 'down') ? this.rows : 1;
        var step = (dir === 'down') ? -1 : 1;
        for (var i = 0; i < stack.length; i++) {
          var from = stack[i];
          if (from.r !== fill) {
            moves.push({ card: this.cardNodes[from.r][from.c], fr: from.r, fc: from.c, tr: fill, tc: c });
          }
          this.moveCard(from.r, from.c, fill, c);
          fill += step;
        }
      }
    } else { // 'left' | 'right'
      for (var r = 1; r <= this.rows; r++) {
        var stack2 = [];
        if (dir === 'left') {
          for (var c = 1; c <= this.cols; c++) if (this.grid[r][c]) stack2.push({ r: r, c: c });
        } else {
          for (var c = this.cols; c >= 1; c--) if (this.grid[r][c]) stack2.push({ r: r, c: c });
        }
        var fillC = (dir === 'left') ? 1 : this.cols;
        var stepC = (dir === 'left') ? 1 : -1;
        for (var j = 0; j < stack2.length; j++) {
          var from2 = stack2[j];
          if (from2.c !== fillC) {
            moves.push({ card: this.cardNodes[from2.r][from2.c], fr: from2.r, fc: from2.c, tr: from2.r, tc: fillC });
          }
          this.moveCard(from2.r, from2.c, from2.r, fillC);
          fillC += stepC;
        }
      }
    }
    return moves;
  };

  /** 移动卡片位置，同步 grid / cardNodes / frozen / 单例 key / baseX/baseY */
  Game.prototype.moveCard = function (fr, fc, tr, tc) {
    if (fr === tr && fc === tc) return; // 已在目标位置，无需移动
    var card = this.cardNodes[fr][fc];
    if (!card) return;

    // 单例 key 跟随
    var key = fr + ',' + fc;
    if (this.singletonSet.has(key)) {
      this.singletonSet.delete(key);
      this.singletonSet.add(tr + ',' + tc);
    }
    // 冰冻跟随
    this.frozen[tr][tc] = this.frozen[fr][fc];
    this.frozen[fr][fc] = 0;
    // 网格
    this.grid[tr][tc] = this.grid[fr][fc];
    this.grid[fr][fc] = 0;
    this.cardNodes[tr][tc] = card;
    this.cardNodes[fr][fc] = null;
    // 卡片逻辑位置 + 视觉目标
    card.r = tr;
    card.c = tc;
    var px = this.logicToPixel(tr, tc);
    card.baseX = px.x;
    card.baseY = px.y;
  };

  /** 重力动画：逐格插值移动，结束后胜利检测 */
  Game.prototype.runGravityAnimation = function () {
    var self = this;
    var moves = this.applyGravity();
    if (!moves.length) {
      this.isProcessing = false;
      this.checkWinOrAutoClear();
      return;
    }
    var maxDist = 0;
    for (var i = 0; i < moves.length; i++) {
      var m = moves[i];
      maxDist = Math.max(maxDist, Math.abs(m.tr - m.fr) + Math.abs(m.tc - m.fc));
    }
    var duration = maxDist * T.GRAVITY_PER_CELL;
    var ease = (this.cfg.gravity === 'down' || this.cfg.gravity === 'up') ? 'easeIn' : 'easeInOut';

    for (var j = 0; j < moves.length; j++) {
      var mv = moves[j];
      var fromPx = this.logicToPixel(mv.fr, mv.fc);
      var toPx = this.logicToPixel(mv.tr, mv.tc);
      mv.card.visual.x = fromPx.x;
      mv.card.visual.y = fromPx.y;
      GameGlobal.Tween.to(mv.card.visual, { x: toPx.x, y: toPx.y }, duration, ease);
    }

    this._after(duration + 40, function () {
      self.isProcessing = false;
      self.checkWinOrAutoClear();
    });
  };

  // ══════════════════════════════════════════════
  //  💣 炸弹
  // ══════════════════════════════════════════════

  /** 随机炸掉一块 3×3 区域（冰冻卡直接炸，无需解冻；消耗 1 次炸弹） */
  Game.prototype.useBomb = function () {
    if (this.isProcessing) return;
    if (this.remainingPairs <= 0 || !this.hasCardsLeft()) return;
    if (!GameGlobal.Storage.useTool('bomb')) {
      GameGlobal.Main.showToast('炸弹次数不足，去商店购买吧');
      return;
    }

    var centerR = Math.floor(Math.random() * (this.rows - 2)) + 2;
    var centerC = Math.floor(Math.random() * (this.cols - 2)) + 2;

    var affected = [];
    for (var dr = -1; dr <= 1; dr++) {
      for (var dc = -1; dc <= 1; dc++) {
        var r = centerR + dr, c = centerC + dc;
        var card = this.cardNodes[r][c];
        if (card && card.state !== 'eliminated') affected.push(card);
      }
    }
    if (!affected.length) return;

    if (this.selectedCard) {
      this.selectedCard.state = 'normal';
      this.highlightCard(this.selectedCard, false);
      this.selectedCard = null;
    }
    this.isProcessing = true;
    GameGlobal.SoundManager.play('bomb');

    // 统计受影响类型（复刻原版记账）
    var bombedByType = {};
    for (var i = 0; i < affected.length; i++) {
      var cd = affected[i];
      (bombedByType[cd.type] = bombedByType[cd.type] || []).push(cd);
    }

    // 爆炸中心粒子
    var boomPx = this.logicToPixel(centerR, centerC);
    GameGlobal.Renderer.spawnBombEffect(boomPx.x, boomPx.y);

    // 炸掉（放大再缩没）
    for (var k = 0; k < affected.length; k++) {
      var c2 = affected[k];
      this.grid[c2.r][c2.c] = 0;
      this.cardNodes[c2.r][c2.c] = null;
      this.frozen[c2.r][c2.c] = 0;
      this.singletonSet.delete(c2.r + ',' + c2.c);
      c2.state = 'eliminating';
      var target = c2.visual;
      GameGlobal.Tween.to(target, { scale: 1.3 }, 100, 'easeOut', function () {
        GameGlobal.Tween.to(target, { scale: 0 }, 150, 'easeIn', function () {
          c2.state = 'eliminated';
        });
      });
    }

    var that = this;
    this._after(T.BOMB_TOTAL, function () {
      that.handleBombAftermath();
      that.isProcessing = false;
      that.checkWinOrAutoClear();
    });
  };

  /**
   * 炸弹后处理：按类型全量重算剩余对数与单例标记
   * （被炸类型剩余奇数张时，最后 1 张标记为单例）
   */
  Game.prototype.handleBombAftermath = function () {
    this.recomputeRemainingPairs();
    this.recomputeSingletons();
  };

  // ══════════════════════════════════════════════
  //  🔀 打乱
  // ══════════════════════════════════════════════

  /** 剩余卡片的水果类型重新洗牌（位置不变，冰冻跟随） */
  Game.prototype.shuffleCards = function () {
    if (this.isProcessing) return;
    if (!GameGlobal.Storage.useTool('shuffle')) {
      GameGlobal.Main.showToast('打乱次数不足，去商店购买吧');
      return;
    }
    var cards = [];
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        var card = this.cardNodes[r][c];
        if (card && card.state !== 'eliminated') cards.push(card);
      }
    }
    if (cards.length < 2) return;

    var types = [];
    for (var i = 0; i < cards.length; i++) types.push(cards[i].type);
    this.shuffleArray(types);

    for (var j = 0; j < cards.length; j++) {
      cards[j].type = types[j];
      this.grid[cards[j].r][cards[j].c] = types[j];
    }
    if (this.selectedCard) {
      this.selectedCard.state = 'normal';
      this.highlightCard(this.selectedCard, false);
      this.selectedCard = null;
    }
    GameGlobal.SoundManager.play('click');
  };

  // ══════════════════════════════════════════════
  //  💡 提示
  // ══════════════════════════════════════════════

  /** 找第一对可连接的配对（冰冻卡同样参与配对），画蓝色连线并闪烁（消耗 1 次提示） */
  Game.prototype.showHint = function () {
    if (this.isProcessing) return;
    if (!GameGlobal.Storage.useTool('hint')) {
      GameGlobal.Main.showToast('提示次数不足，去商店购买吧');
      return;
    }

    var cards = [];
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        var card = this.cardNodes[r][c];
        // 所有未消除卡都可配对（含奇数残留卡）
        if (card && card.state !== 'eliminated') cards.push(card);
      }
    }

    var byType = {};
    for (var i = 0; i < cards.length; i++) {
      var cd = cards[i];
      (byType[cd.type] = byType[cd.type] || []).push(cd);
    }

    for (var t in byType) {
      if (!byType.hasOwnProperty(t)) continue;
      var same = byType[t];
      if (same.length < 2) continue;
      for (var a = 0; a < same.length; a++) {
        for (var b = a + 1; b < same.length; b++) {
          var cardA = same[a], cardB = same[b];
          var path = GameGlobal.PathChecker.canConnect(this.grid, this.rows, this.cols,
            cardA.r, cardA.c, cardB.r, cardB.c);
          if (path) {
            this.showHintLine(path, cardA, cardB);
            return;
          }
        }
      }
    }
    GameGlobal.Main.showToast('没有可消除的配对，试试打乱或炸弹吧');
  };

  Game.prototype.showHintLine = function (path, card1, card2) {
    this.connectionLine = { points: path, color: 'blue', timeLeft: T.HINT_LINE };
    card1.state = 'hintFlash';
    card2.state = 'hintFlash';
    card1.flashT = Date.now();
    card2.flashT = Date.now();
    var self = this;
    this._after(T.HINT_LINE, function () {
      if (self.connectionLine && self.connectionLine.color === 'blue') self.connectionLine = null;
      if (card1.state === 'hintFlash') card1.state = 'normal';
      if (card2.state === 'hintFlash') card2.state = 'normal';
    });
  };

  // ══════════════════════════════════════════════
  //  胜利检查 & 死局 & 单例
  // ══════════════════════════════════════════════

  /** 是否至少存在一对可连接的相同水果（冰冻卡视作普通卡；所有未消除卡都可配对） */
  Game.prototype.hasValidMove = function () {
    var cards = [];
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        var card = this.cardNodes[r][c];
        if (card && card.state !== 'eliminated') cards.push(card);
      }
    }
    var byType = {};
    for (var i = 0; i < cards.length; i++) {
      var cd = cards[i];
      (byType[cd.type] = byType[cd.type] || []).push(cd);
    }
    for (var t in byType) {
      if (!byType.hasOwnProperty(t)) continue;
      var same = byType[t];
      if (same.length < 2) continue;
      for (var a = 0; a < same.length; a++) {
        for (var b = a + 1; b < same.length; b++) {
          if (GameGlobal.PathChecker.canConnect(this.grid, this.rows, this.cols,
            same[a].r, same[a].c, same[b].r, same[b].c)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  Game.prototype.checkWinOrAutoClear = function () {
    // 死局：还有配对但无有效移动 → 全部自动消除 → 胜利
    if (this.remainingPairs > 0 && !this.hasValidMove()) {
      this.autoClearAllRemaining();
      return;
    }
    if (this.remainingPairs > 0) return;

    // 配对消完，清除单例
    if (this.singletonSet.size > 0) {
      this.autoClearSingletons();
      return;
    }

    // 检查残留
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        if (this.cardNodes[r][c] && this.cardNodes[r][c].state !== 'eliminated') return;
      }
    }
    this.onWin();
  };

  /** 死局：自动消除所有剩余卡片 */
  Game.prototype.autoClearAllRemaining = function () {
    var self = this;
    var toClear = [];
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        var card = this.cardNodes[r][c];
        if (card && card.state !== 'eliminated') {
          toClear.push(card);
          this.grid[r][c] = 0;
          this.cardNodes[r][c] = null;
        }
      }
    }
    this.singletonSet.clear();
    this.remainingPairs = 0;

    for (var i = 0; i < toClear.length; i++) {
      (function (card, delay) {
        self._after(delay, function () {
          card.state = 'eliminating';
          GameGlobal.Tween.to(card.visual, { scale: 0 }, 250, 'easeIn', function () {
            card.state = 'eliminated';
          });
        });
      })(toClear[i], i * 50);
    }

    this._after(toClear.length * 50 + 400, function () {
      self.onWin();
    });
  };

  /** 自动消除所有单例卡片（无需解冻） */
  Game.prototype.autoClearSingletons = function () {
    var self = this;
    var toClear = [];
    this.singletonSet.forEach(function (key) {
      var parts = key.split(',');
      var r = parseInt(parts[0], 10), c = parseInt(parts[1], 10);
      var card = self.cardNodes[r][c];
      if (card && card.state !== 'eliminated') toClear.push(card);
    });
    this.singletonSet.clear();

    for (var i = 0; i < toClear.length; i++) {
      (function (card, delay) {
        self.grid[card.r][card.c] = 0;
        self.cardNodes[card.r][card.c] = null;
        self.frozen[card.r][card.c] = 0;
        self._after(delay, function () {
          card.state = 'eliminating';
          GameGlobal.Tween.to(card.visual, { scale: 0 }, 250, 'easeIn', function () {
            card.state = 'eliminated';
          });
        });
      })(toClear[i], i * 80);
    }

    this._after(toClear.length * 80 + 400, function () {
      var allGone = true;
      for (var r = 1; r <= self.rows; r++) {
        for (var c = 1; c <= self.cols; c++) {
          if (self.cardNodes[r][c] && self.cardNodes[r][c].state !== 'eliminated') {
            allGone = false;
          }
        }
      }
      if (allGone) self.onWin();
    });
  };

  /** 胜利：音效 + 解锁下一关 + 记录最佳成绩 + 展示结算面板 */
  Game.prototype.onWin = function () {
    if (this._won) return;
    this._won = true;
    GameGlobal.SoundManager.play('win');
    GameGlobal.Storage.unlockNextLevel(this.levelId);
    GameGlobal.Renderer.spawnWinFireworks();

    var elapsed = this.getElapsed();
    // 先判断是否首通（必须在 setBestScore 之前，否则最佳成绩已存在）
    var firstClear = GameGlobal.Storage.isFirstClear(this.levelId);
    GameGlobal.Storage.setBestScore(this.levelId, this.moves, elapsed);

    // 金币奖励：首次通关 100，重复通关 20
    var coinsEarned = firstClear ? GameGlobal.COINS_FIRST_CLEAR : GameGlobal.COINS_REPEAT_CLEAR;
    GameGlobal.Storage.addCoins(coinsEarned);

    var self = this;
    this._after(T.WIN_PANEL_DELAY, function () {
      GameGlobal.Main.showWin(self.levelId, self.moves, elapsed, coinsEarned);
    });
  };

  // ══════════════════════════════════════════════
  //  计时 / 坐标转换 / 工具
  // ══════════════════════════════════════════════

  Game.prototype.getElapsed = function () {
    return Math.round((Date.now() - this.startTime) / 1000);
  };

  /** 逻辑索引 → 设计坐标（含外围 0 / ROWS+1 / COLS+1） */
  Game.prototype.logicToPixel = function (r, c) {
    var m = this.metrics;
    var x, y;
    if (c === 0) {
      x = m.ox - m.cw / 2 - m.gx;
    } else if (c === this.cols + 1) {
      x = m.ox + this.cols * (m.cw + m.gx) - m.gx + m.cw / 2;
    } else {
      x = m.ox + (c - 1) * (m.cw + m.gx) + m.cw / 2;
    }
    if (r === 0) {
      y = m.oy - m.ch / 2 - m.gy;
    } else if (r === this.rows + 1) {
      y = m.oy + this.rows * (m.ch + m.gy) - m.gy + m.ch / 2;
    } else {
      y = m.oy + (r - 1) * (m.ch + m.gy) + m.ch / 2;
    }
    return { x: x, y: y };
  };

  /**
   * 设计坐标 → 逻辑格子 {r, c} | null
   * 卡片重叠排列时（负间距），后绘制的卡在最上层（原版 Cocos 触摸同样按层级优先），
   * 因此从右下角（最后绘制）向左上遍历，命中首个包含点击点的卡。
   */
  Game.prototype.hitTest = function (x, y) {
    var m = this.metrics;
    var hw = m.cw / 2, hh = m.ch / 2;
    for (var r = this.rows; r >= 1; r--) {
      for (var c = this.cols; c >= 1; c--) {
        var px = this.logicToPixel(r, c);
        if (Math.abs(x - px.x) <= hw && Math.abs(y - px.y) <= hh) {
          return { r: r, c: c };
        }
      }
    }
    return null;
  };

  /** 剩余对数的可用提示（UI 用） */
  Game.prototype.getRemainingPairs = function () {
    return this.remainingPairs;
  };

  Game.prototype.restart = function () {
    this._won = false;
    this.initLevel();
  };

  GameGlobal.Game = Game;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Game;
  }
})();
