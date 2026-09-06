// js/stackGame.js
// 「层层消消」叠层连连看引擎：在现有连连看基础上，把“拐角 ≤ 2 的连接限制”换成“层数限制”。
// 牌以羊了个羊式错落堆叠（每层向右下偏移半格，形成花瓣/钻石轮廓），只有最顶层（不被更高层压住）可点；
// 选两张顶层同色牌直接消除，整体仍是连连消玩法。
// 复用 render.js 的 drawCard（tile.visual / type / state 结构与连连看 card 兼容），棋盘坐标即设计坐标（cam = null）。

(function (GameGlobal) {
  'use strict';

  function StackGame(levelId) {
    this.isStack = true;
    this.levelId = levelId;
    this.cfg = GameGlobal.getLevelConfig(levelId);
    this.shape = this.cfg.shape || 'flower';
    this.depth = this.cfg.depth || 6;                       // 叠层数
    this.baseR = this.cfg.baseR || 4;                       // 底层半径（格）
    this.shrink = (this.cfg.shrink == null ? 0.3 : this.cfg.shrink); // 每层收缩（格）
    this.cardSet = this.cfg.cardSet || 'fruit';
    this.cam = null;                 // 固定布局，无入场镜头
    this.connectionLine = null;      // 复用 render.drawConnectionLine
    this.selectedTile = null;
    this._won = false;
    this._lost = false;
    this._winFired = false;
    this._deadlock = false;
    this._session = 0;
    this.moves = 0;
    this.startTime = Date.now();
    this.tiles = [];
    this.cardW = 40;                 // 卡片像素尺寸，_computeMetrics 按屏幕可用区自适应覆写
    this._slots = this._genSlots(this.shape, this.depth); // 先生成错落槽位（每局随机错落方向）
    this._computeMetrics();          // 再按槽位范围居中 + 定卡片尺寸
    this._buildTiles();              // 分配类型（每局随机）+ 实例化
    this._recomputeCovered();
    if (!this._hasTopPair()) this._reshuffleRemaining(); // 开局必保证有一步可走
  }

  var CARD_MIN = 10, CARD_MAX = 52; // 卡片像素尺寸上下限（防极端形状算出超大/超小）

  /** 卡组 → type 池（'fruit' = f1~f12；'mixed' = f1~f12 + v1~v12） */
  StackGame.prototype._typePool = function () {
    var pool = [], i;
    if (this.cardSet === 'mixed') {
      for (i = 1; i <= 12; i++) { pool.push('f' + i); pool.push('v' + i); }
    } else {
      for (i = 1; i <= 12; i++) pool.push('f' + i);
    }
    return pool;
  };

  /**
   * 生成羊了个羊式错落槽位：每层一张牌落在“形状掩码”内，且每层整体向右下偏移半格（0.5），
   * 形成经典的花瓣/钻石堆叠外观。cx/cy 为“格坐标”（可为半整数），视觉位置 = origin + (cx,cy)*CARD。
   * 覆盖判定靠矩形重叠：更高层、且 |Δcx|<1 且 |Δcy|<1 的牌会盖住下层。
   */
  StackGame.prototype._genSlots = function (shape, depth) {
    var slots = [], L, x, y;
    // 每局随机一个“错落方向”（4 条对角线取一）：轮廓（花苞/钻石）不变，但叠出来朝向每局不同
    var dirs = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    var d = dirs[Math.floor(Math.random() * dirs.length)];
    this._shiftDir = d;
    for (L = 1; L <= depth; L++) {
      var step = (L - 1) * 0.5;             // 每层半格错位（花瓣堆叠的灵魂）
      var ox = d[0] * step, oy = d[1] * step;
      var rad = this.baseR - (L - 1) * this.shrink; // 高层逐渐收小，呈金字塔/花苞状
      if (rad < 0.6) rad = 0.6;
      var r = Math.ceil(rad);
      for (x = -r; x <= r; x++) {
        for (y = -r; y <= r; y++) {
          var inMask = false;
          if (shape === 'flower') {
            // 圆润花苞：圆盘（整数格上接近圆形）
            inMask = (x * x + y * y) <= rad * rad + 0.25;
          } else {
            // 钻石/金字塔：|x|+|y| <= rad（菱形轮廓）
            inMask = (Math.abs(x) + Math.abs(y)) <= rad + 0.001;
          }
          if (inMask) slots.push({ cx: x + ox, cy: y + oy, layer: L });
        }
      }
    }
    return slots;
  };

  /**
   * 计算棋盘在设计坐标中的居中矩形 + 卡片像素尺寸。
   * 大牌堆（200+ 张）不能再用固定 46px：按屏幕可用区（顶部 HUD 之下、底部道具栏之上）等比缩放，
   * 保证任何 shape/depth 组合都能整盘塞进屏幕，不被 HUD 遮挡。
   */
  StackGame.prototype._computeMetrics = function () {
    var W = GameGlobal.DESIGN_W, H = GameGlobal.DESIGN_H || 844;
    var safeTop = GameGlobal.SAFE_TOP || 0;
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (var i = 0; i < this._slots.length; i++) {
      var s = this._slots[i];
      if (s.cx < minX) minX = s.cx; if (s.cx > maxX) maxX = s.cx;
      if (s.cy < minY) minY = s.cy; if (s.cy > maxY) maxY = s.cy;
    }
    var gridW = (maxX - minX + 1), gridH = (maxY - minY + 1);
    var availW = W - 20;                       // 左右各留 10 边距
    var availTop = safeTop + 96;               // 顶部信息栏（返回/关卡名/计时）之下
    var availBottom = H - 132;                 // 底部道具区之上
    var availH = Math.max(120, availBottom - availTop);
    var cw = Math.floor(Math.min(availW / gridW, availH / gridH));
    if (!(cw > CARD_MIN)) cw = CARD_MIN;
    if (cw > CARD_MAX) cw = CARD_MAX;
    this.cardW = cw;

    // 注意半格：cx/cy 是卡片“中心”，卡片左/上边缘在 (cx-0.5)/(cy-0.5)，
    // 所以居中基准要减 (minX-0.5)*cw，否则整盘左移半张卡（大牌堆时左边会出血）。
    var boardW = gridW * cw, boardH = gridH * cw;
    var originX = Math.round((W - boardW) / 2) - (minX - 0.5) * cw;
    var originY = Math.round(availTop + (availH - boardH) / 2) - (minY - 0.5) * cw;
    this.metrics = { cw: cw, originX: originX, originY: originY, boardW: boardW, boardH: boardH };
  };

  /**
   * 实例化所有牌：槽位总数须为偶数（奇数则去掉最后一张），每对（两张）同 type 保证成对可消。
   *
   * 配对策略（关键，决定死局率）：按每张牌“头顶压着几张牌”（coverCount）升序排序后两两配对。
   * 这样一对牌的 uncover 时机几乎相同 → 玩家从上往下消时两张会同时露头，不会长期堆着一堆“孤牌”。
   * 若按槽位顺序或纯随机配对，会出现「A 早就露出、B 还压在 5 张底下」，顶层全是无法配对的单牌 → 频繁死局。
   */
  StackGame.prototype._buildTiles = function () {
    var slots = this._slots;
    if (slots.length % 2 === 1) slots = slots.slice(0, slots.length - 1); // 保证偶数张
    this._slots = slots;

    var i, j, n;
    // 1) 算 coverCount：更高层且矩形重叠（|Δcx|<1 且 |Δcy|<1）的牌数量 = 消掉它之前要先清掉的牌数
    for (i = 0; i < slots.length; i++) {
      var s = slots[i];
      n = 0;
      for (j = 0; j < slots.length; j++) {
        var o = slots[j];
        if (o === s) continue;
        if (o.layer > s.layer && Math.abs(o.cx - s.cx) < 1 && Math.abs(o.cy - s.cy) < 1) n++;
      }
      s.coverCount = n;
    }
    // 2) 按 coverCount 升序 + 小随机扰动排序（扰动避免同层的牌固定扎堆），再两两配对
    var order = slots.slice();
    for (i = 0; i < order.length; i++) order[i]._rk = order[i].coverCount + Math.random() * 0.9;
    order.sort(function (a, b) { return a._rk - b._rk; });

    // 3) 类型池打乱后循环取，保证各图案数量均衡（不会出现某种只有 1 对、某种 20 对）
    var pool = this._typePool();
    for (i = pool.length - 1; i > 0; i--) {
      var k = Math.floor(Math.random() * (i + 1));
      var tmp = pool[i]; pool[i] = pool[k]; pool[k] = tmp;
    }

    this.tiles = [];
    for (i = 0; i < order.length; i += 2) {
      var ty = pool[(i / 2) % pool.length];
      this._makeTile(order[i], ty);
      this._makeTile(order[i + 1], ty);
    }
  };

  /** 单张牌的实例化（格坐标 → 视觉中心） */
  StackGame.prototype._makeTile = function (pos, type) {
    var cw = this.cardW;
    var vx = this.metrics.originX + pos.cx * cw;
    var vy = this.metrics.originY + pos.cy * cw;
    this.tiles.push({
      id: this.levelId + '_' + pos.cx + '_' + pos.cy + '_' + pos.layer,
      type: type, layer: pos.layer, cx: pos.cx, cy: pos.cy,
      covered: false, state: 'normal', shakeT: 0,
      visual: { x: vx, y: vy, scale: 1, iceAlpha: 0 },
    });
  };

  /** 重算覆盖关系：更高层且矩形重叠（|Δcx|<1 且 |Δcy|<1）的牌 → 本牌被压住（covered） */
  StackGame.prototype._recomputeCovered = function () {
    for (var i = 0; i < this.tiles.length; i++) {
      var t = this.tiles[i];
      if (t.state === 'eliminated') { t.covered = true; continue; }
      t.covered = false;
      var tx = t.cx, ty = t.cy, tl = t.layer;
      for (var j = 0; j < this.tiles.length; j++) {
        var u = this.tiles[j];
        if (u === t || u.state === 'eliminated') continue;
        if (u.layer > tl && Math.abs(u.cx - tx) < 1 && Math.abs(u.cy - ty) < 1) { t.covered = true; break; }
      }
    }
  };

  StackGame.prototype._activeTiles = function () {
    var out = [];
    for (var i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i].state !== 'eliminated') out.push(this.tiles[i]);
    }
    return out;
  };

  /** 屏幕设计坐标 → 命中的最顶层可点牌（被压住的牌不会被返回；更高层牌优先） */
  StackGame.prototype.hitTest = function (dx, dy) {
    var cellX = (dx - this.metrics.originX) / this.cardW;
    var cellY = (dy - this.metrics.originY) / this.cardW;
    var best = null, bestLayer = -1;
    for (var i = 0; i < this.tiles.length; i++) {
      var t = this.tiles[i];
      if (t.state === 'eliminated') continue;
      if (Math.abs(cellX - t.cx) <= 0.5 && Math.abs(cellY - t.cy) <= 0.5) {
        if (!t.covered && t.layer > bestLayer) { best = t; bestLayer = t.layer; }
      }
    }
    return best;
  };

  StackGame.prototype._hasTopPair = function () {
    var top = {};
    for (var i = 0; i < this.tiles.length; i++) {
      var t = this.tiles[i];
      if (t.state === 'eliminated' || t.covered) continue;
      top[t.type] = (top[t.type] || 0) + 1;
    }
    for (var k in top) { if (top[k] >= 2) return true; }
    return false;
  };

  /** 点牌：选中 / 取消 / 同色消除（去掉拐角寻路，仅顶层同色即可消） */
  StackGame.prototype.onTapTile = function (tile) {
    if (!tile || tile.state === 'eliminated' || tile.covered) return;
    var now = Date.now();
    if (!this.selectedTile) {
      this.selectedTile = tile; tile.state = 'selected'; tile.visual.scale = 1.14; return;
    }
    if (this.selectedTile === tile) {
      tile.state = 'normal'; tile.visual.scale = 1; this.selectedTile = null; return;
    }
    if (this.selectedTile.type === tile.type) {
      var a = this.selectedTile, b = tile;
      this.selectedTile = null;
      this.connectionLine = {
        points: [{ x: a.visual.x, y: a.visual.y }, { x: b.visual.x, y: b.visual.y }],
        color: 'gold', t0: now,
      };
      var self = this, s = this._session;
      setTimeout(function () { if (self._session !== s) return; self._eliminate(a, b); }, 160);
    } else {
      tile.state = 'mismatch'; tile.shakeT = now;
      this.selectedTile.state = 'normal'; this.selectedTile.visual.scale = 1; this.selectedTile = null;
      var tg = tile;
      setTimeout(function () { if (tg.state === 'mismatch') tg.state = 'normal'; }, 500);
    }
  };

  StackGame.prototype._eliminate = function (a, b) {
    a.state = 'eliminated'; b.state = 'eliminated';
    this._recomputeCovered();
    this.connectionLine = null;
    this.moves++;
    this._checkEnd();
  };

  /**
   * 死局自救：重洗剩余牌的类型分配，保持各 type 偶数张，并强制让某两张“未被压住”的牌同色，
   * 使洗完后立刻有一步可走（与连连看的「打乱」道具同理）。原型阶段玩家永远不会被无解布局卡死。
   */
  StackGame.prototype._reshuffleRemaining = function () {
    var R = this._activeTiles();
    if (R.length === 0) return;
    var U = R.filter(function (t) { return !t.covered; });
    if (U.length >= 2) {
      var baseType = U[0].type;
      var partner = null;
      for (var i = 0; i < R.length; i++) {
        if (R[i] !== U[0] && R[i].type === baseType) { partner = R[i]; break; }
      }
      if (partner) {
        var oldU1 = U[1].type;
        U[0].type = baseType; U[1].type = baseType; partner.type = oldU1;
        // 其余牌随机重分配（保持各 type 偶数张）
        var rest = [], restTypes = [];
        for (var k = 0; k < R.length; k++) {
          var t = R[k];
          if (t !== U[0] && t !== U[1] && t !== partner) { rest.push(t); restTypes.push(t.type); }
        }
        for (var m = restTypes.length - 1; m > 0; m--) {
          var j = Math.floor(Math.random() * (m + 1));
          var tmp = restTypes[m]; restTypes[m] = restTypes[j]; restTypes[j] = tmp;
        }
        for (var n = 0; n < rest.length; n++) rest[n].type = restTypes[n];
      }
    }
    this.selectedTile = null;
    this.connectionLine = null;
    this._recomputeCovered();
  };

  // ══════════════════════════════════════════════
  //  道具：提示 / 打乱（叠层局只开放这两个，炸弹/冻结与本玩法无关）
  // ══════════════════════════════════════════════

  /** 提示：高亮一对「当前顶层可点」的同色牌（蓝线 + 闪烁），消耗 1 次提示 */
  StackGame.prototype.showHint = function () {
    if (!GameGlobal.Storage.useTool('hint')) {
      if (GameGlobal.Main) GameGlobal.Main.showToast('提示次数不足，去商店购买吧');
      return;
    }
    var top = [], i;
    for (i = 0; i < this.tiles.length; i++) {
      var t = this.tiles[i];
      if (t.state !== 'eliminated' && !t.covered) top.push(t);
    }
    var byType = {};
    for (i = 0; i < top.length; i++) (byType[top[i].type] = byType[top[i].type] || []).push(top[i]);
    for (var k in byType) {
      if (!byType.hasOwnProperty(k)) continue;
      var same = byType[k];
      if (same.length < 2) continue;
      var a = same[0], b = same[1];
      var now = Date.now(), s = this._session, self = this;
      a.state = 'hintFlash'; a.flashT = now; a.visual.scale = 1;
      b.state = 'hintFlash'; b.flashT = now; b.visual.scale = 1;
      this.connectionLine = {
        points: [{ x: a.visual.x, y: a.visual.y }, { x: b.visual.x, y: b.visual.y }],
        color: 'blue', t0: now,
      };
      setTimeout(function () {
        if (self._session !== s) return;
        if (self.connectionLine && self.connectionLine.color === 'blue') self.connectionLine = null;
        if (a.state === 'hintFlash') a.state = 'normal';
        if (b.state === 'hintFlash') b.state = 'normal';
      }, 1600);
      return;
    }
    if (GameGlobal.Main) GameGlobal.Main.showToast('顶层暂无同色对，试试打乱');
  };

  /** 打乱：重洗剩余牌的图案分配（复用死局自救的洗牌逻辑），消耗 1 次打乱 */
  StackGame.prototype.shuffleCards = function () {
    if (!GameGlobal.Storage.useTool('shuffle')) {
      if (GameGlobal.Main) GameGlobal.Main.showToast('打乱次数不足，去商店购买吧');
      return;
    }
    this._reshuffleRemaining();
    if (GameGlobal.Main) GameGlobal.Main.showToast('已重新洗牌');
  };

  /** 胜利 = 全部消除；死局 = 当前顶层可点牌中无同 type 对（无步可走则自动洗牌自救） */
  StackGame.prototype._checkEnd = function () {
    var active = this._activeTiles();
    if (active.length === 0) { this._won = true; this.onWin(); return; }
    if (!this._hasTopPair()) {
      this._reshuffleRemaining();
      if (!this._hasTopPair()) {
        this._lost = true; this._deadlock = true;
        if (GameGlobal.Main) GameGlobal.Main.showToast('无步可走，点返回重玩');
      } else if (GameGlobal.Main) {
        GameGlobal.Main.showToast('已自动洗牌');
      }
    }
  };

  StackGame.prototype.onWin = function () {
    if (this._winFired) return;
    this._winFired = true;
    // 顺序解锁下一层层消消关
    GameGlobal.Storage.unlockNextStack(this.levelId);
    // 与连连看一致：记录最佳成绩 + 金币奖励（首通 100 / 重复 20）
    var elapsed = Math.floor((Date.now() - this.startTime) / 1000);
    var firstClear = GameGlobal.Storage.isFirstClear(this.levelId);
    GameGlobal.Storage.setBestScore(this.levelId, this.moves, elapsed);
    var coinsEarned = firstClear ? GameGlobal.COINS_FIRST_CLEAR : GameGlobal.COINS_REPEAT_CLEAR;
    GameGlobal.Storage.addCoins(coinsEarned);
    if (GameGlobal.Main) GameGlobal.Main.showWin(this.levelId, this.moves, elapsed, coinsEarned);
  };

  /** 重新开局：重置会话号，重洗牌堆 */
  StackGame.prototype.restart = function () {
    this._session++;
    this._won = false;
    this._lost = false;
    this._winFired = false;
    this._deadlock = false;
    this.selectedTile = null;
    this.connectionLine = null;
    this.moves = 0;
    this.startTime = Date.now();
    this._slots = this._genSlots(this.shape, this.depth);
    this._computeMetrics();
    this._buildTiles();
    this._recomputeCovered();
    if (!this._hasTopPair()) this._reshuffleRemaining();
  };

  StackGame.prototype.getRemainingPairs = function () {
    return Math.ceil(this._activeTiles().length / 2);
  };

  StackGame.prototype.getElapsed = function () {
    return Math.floor((Date.now() - this.startTime) / 1000);
  };

  StackGame.prototype.startIntro = function () { this._introOn = false; };

  GameGlobal.StackGame = StackGame;

  if (typeof module !== 'undefined' && module.exports) module.exports = StackGame;
})(typeof GameGlobal !== 'undefined' ? GameGlobal : (typeof window !== 'undefined' ? window : this));
