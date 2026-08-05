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
        card.state = 'frozen';
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
  //  点击处理（含冰冻解冻分支）
  // ══════════════════════════════════════════════

  /** 玩家点击 (r, c) 卡片 */
  Game.prototype.onTapCard = function (r, c) {
    if (this.isProcessing) return;
    var card = this.cardNodes[r][c];
    if (!card || card.state === 'eliminated') return;

    // 第一层：冰冻 → 解冻（双重解锁）
    if (this.frozen[r][c] === 1) {
      this.isProcessing = true;
      this.frozen[r][c] = 0;
      card.state = 'thawing';
      GameGlobal.SoundManager.play('thaw');
      GameGlobal.Renderer.spawnIceShards(this.logicToPixel(r, c).x, this.logicToPixel(r, c).y);
      var self = this;
      GameGlobal.Tween.to(card.visual, { iceAlpha: 0 }, T.THAW, 'linear', function () {
        card.state = 'normal';
        self.isProcessing = false;
      });
      return;
    }

    if (!this.selectedCard) {
      this.selectedCard = card;
      card.state = 'selected';
    } else if (this.selectedCard === card) {
      card.state = 'normal';
      this.selectedCard = null;
    } else {
      var first = this.selectedCard;
      this.isProcessing = true;
      card.state = 'selected';

      var path = GameGlobal.PathChecker.canConnect(this.grid, this.rows, this.cols,
        first.r, first.c, card.r, card.c);
      if (path) {
        this.eliminatePair(first, card, path);
      } else {
        this.showMismatch(first, card);
      }
    }
  };

  // ══════════════════════════════════════════════
  //  消除 / 失败
  // ══════════════════════════════════════════════

  Game.prototype.eliminatePair = function (card1, card2, path) {
    var self = this;
    var pos1 = card1.r + ',' + card1.c;
    var pos2 = card2.r + ',' + card2.c;
    var wasSingleton1 = this.singletonSet.has(pos1);
    var wasSingleton2 = this.singletonSet.has(pos2);
    this.singletonSet.delete(pos1);
    this.singletonSet.delete(pos2);

    this.grid[card1.r][card1.c] = 0;
    this.grid[card2.r][card2.c] = 0;
    this.cardNodes[card1.r][card1.c] = null;
    this.cardNodes[card2.r][card2.c] = null;

    // 连线（金色）+ 音效马上响
    this.connectionLine = { points: path, color: 'gold', timeLeft: T.ELIM_LINE };
    GameGlobal.SoundManager.play('elim');

    // 第一张消失 + 烟花
    var p1 = this.logicToPixel(card1.r, card1.c);
    card1.state = 'eliminating';
    GameGlobal.Renderer.spawnFirework(p1.x, p1.y);
    GameGlobal.Tween.to(card1.visual, { scale: 0 }, T.ELIM_SCALE, 'easeIn', function () {
      card1.state = 'eliminated';
    });

    // 第二张延迟 0.1s
    this._after(100, function () {
      var p2 = self.logicToPixel(card2.r, card2.c);
      card2.state = 'eliminating';
      GameGlobal.Renderer.spawnFirework(p2.x, p2.y);
      GameGlobal.Tween.to(card2.visual, { scale: 0 }, T.ELIM_SCALE, 'easeIn', function () {
        card2.state = 'eliminated';
      });
    });

    // 连线 0.2s 后清除
    this._after(T.ELIM_LINE + 20, function () {
      if (self.connectionLine && self.connectionLine.color === 'gold') self.connectionLine = null;
    });

    // 全部动画结束后记账 + 后续（重力 / 胜利检测）
    this._after(T.ELIM_TOTAL, function () {
      self.selectedCard = null;
      self.isProcessing = false;
      if (!wasSingleton1 && !wasSingleton2) {
        self.remainingPairs--;
        self.moves++;
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
      self.selectedCard = null;
      self.isProcessing = false;
    });
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

  /** 随机炸掉一块 3×3 区域（冰冻卡直接炸，无需解冻） */
  Game.prototype.useBomb = function () {
    if (this.isProcessing) return;
    if (this.remainingPairs <= 0 || !this.hasCardsLeft()) return;

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
      that.handleBombAftermath(bombedByType);
      that.isProcessing = false;
      that.checkWinOrAutoClear();
    });
  };

  /** 炸弹后处理：调整 remainingPairs 与单例标记（复刻原版 handleBombAftermath） */
  Game.prototype.handleBombAftermath = function (bombedByType) {
    var self = this;
    for (var fruitType in bombedByType) {
      if (!bombedByType.hasOwnProperty(fruitType)) continue;
      var type = parseInt(fruitType, 10);
      var bombedCards = bombedByType[fruitType];

      // 统计该类型剩余卡片
      var remaining = [];
      for (var r = 1; r <= this.rows; r++) {
        for (var c = 1; c <= this.cols; c++) {
          var card = this.cardNodes[r][c];
          if (card && card.state !== 'eliminated' && card.type === type) {
            remaining.push(card);
          }
        }
      }

      var destroyedCount = bombedCards.length;
      var remainingCount = remaining.length;

      if (remainingCount === 0) {
        // 全部被炸掉：原来对数全消除
        this.remainingPairs -= Math.floor(destroyedCount / 2);
        for (var i = 0; i < bombedCards.length; i++) {
          this.singletonSet.delete(bombedCards[i].r + ',' + bombedCards[i].c);
        }
      } else if (remainingCount % 2 === 1) {
        // 剩余奇数：一张成为单例
        for (var j = 0; j < remaining.length; j++) {
          this.singletonSet.delete(remaining[j].r + ',' + remaining[j].c);
        }
        var originalTotal = destroyedCount + remainingCount;
        var originalPairs = Math.floor(originalTotal / 2);
        var newPairs = Math.floor(remainingCount / 2);
        this.remainingPairs -= (originalPairs - newPairs);
        var last = remaining[remaining.length - 1];
        this.singletonSet.add(last.r + ',' + last.c);
      } else {
        // 剩余偶数
        var originalTotal2 = destroyedCount + remainingCount;
        var originalPairs2 = Math.floor(originalTotal2 / 2);
        var newPairs2 = remainingCount / 2;
        this.remainingPairs -= (originalPairs2 - newPairs2);
      }
    }
  };

  // ══════════════════════════════════════════════
  //  🔀 打乱
  // ══════════════════════════════════════════════

  /** 剩余卡片的水果类型重新洗牌（位置不变，冰冻跟随） */
  Game.prototype.shuffleCards = function () {
    if (this.isProcessing) return;
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
      this.selectedCard = null;
    }
    GameGlobal.SoundManager.play('click');
  };

  // ══════════════════════════════════════════════
  //  💡 提示
  // ══════════════════════════════════════════════

  /** 找第一对可连接的配对（跳过冰冻卡），画蓝色连线并闪烁 */
  Game.prototype.showHint = function () {
    if (this.isProcessing) return;

    var cards = [];
    var frozenCount = 0;
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        var card = this.cardNodes[r][c];
        if (!card || card.state === 'eliminated') continue;
        if (this.frozen[r][c] === 1) {
          frozenCount++;
        } else {
          cards.push(card);
        }
      }
    }

    // 全部都是冰冻卡：先解冻
    if (!cards.length && frozenCount > 0) {
      GameGlobal.Main.showToast('先点击解冻被冰住的水果吧');
      return;
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

  /** 是否至少存在一对可连接的相同水果（冰冻卡视作普通卡参与计算） */
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
    GameGlobal.Storage.setBestScore(this.levelId, this.moves, elapsed);

    var self = this;
    this._after(T.WIN_PANEL_DELAY, function () {
      GameGlobal.Main.showWin(self.levelId, self.moves, elapsed);
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

  /** 设计坐标 → 逻辑格子 {r, c} | null */
  Game.prototype.hitTest = function (x, y) {
    var m = this.metrics;
    var c = Math.round((x - m.ox - m.cw / 2) / (m.cw + m.gx)) + 1;
    var r = Math.round((y - m.oy - m.ch / 2) / (m.ch + m.gy)) + 1;
    if (r < 1 || r > this.rows || c < 1 || c > this.cols) return null;
    var px = this.logicToPixel(r, c);
    if (Math.abs(x - px.x) > m.cw / 2 + 4 || Math.abs(y - px.y) > m.ch / 2 + 4) return null;
    return { r: r, c: c };
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
