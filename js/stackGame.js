// js/stackGame.js
// 「层层消消」叠层连连看引擎：在现有连连看基础上，把“拐角 ≤ 2 的连接限制”换成“层数限制”。
// 牌立体堆叠（layer），只有最顶层（不被更高层压住）可点；选两张顶层同色牌直接消除，整体仍是连连消玩法。
// 复用 render.js 的 drawCard（tile.visual / type / state 结构与连连看 card 兼容），棋盘坐标即设计坐标（cam = null）。

(function (GameGlobal) {
  'use strict';

  function StackGame(levelId) {
    this.isStack = true;
    this.levelId = levelId;
    this.cfg = GameGlobal.getLevelConfig(levelId);
    this.rows = this.cfg.rows || 6;
    this.cols = this.cfg.cols || 6;
    this.layers = this.cfg.layers || 3;
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
    this._computeMetrics();
    this._buildTiles();
    this._recomputeCovered();
  }

  var CARD = 46; // 卡片设计像素尺寸

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

  /** 计算棋盘在设计坐标中的居中矩形（顶部预留 HUD 空间） */
  StackGame.prototype._computeMetrics = function () {
    var W = GameGlobal.DESIGN_W, H = GameGlobal.DESIGN_H || 844;
    var safeTop = GameGlobal.SAFE_TOP || 0;
    var boardW = this.cols * CARD;
    var boardH = this.rows * CARD;
    var cx = Math.round((W - boardW) / 2);
    var cy = Math.round(safeTop + 150);
    this.metrics = { cw: CARD, cx: cx, cy: cy, boardW: boardW, boardH: boardH };
  };

  /** 生成立体牌堆：每层每格一张牌；关键约束——每对同色牌必须落在【不同列】(gx,gy)，
   *  这样两张牌都能各自成为所在列的顶层而被点中消除（同列堆叠的对子永远无法同消，会死局）。 */
  StackGame.prototype._buildTiles = function () {
    var layer, gy, gx;
    // 按列 (gx,gy) 分组，每列 layers 张
    var colSlots = {}, colKeys = [];
    for (gy = 0; gy < this.rows; gy++) {
      for (gx = 0; gx < this.cols; gx++) {
        var key = gy * this.cols + gx;
        colSlots[key] = [];
        for (layer = 1; layer <= this.layers; layer++) {
          colSlots[key].push({ gx: gx, gy: gy, layer: layer });
        }
        colKeys.push(key);
      }
    }
    // 贪心：每次从两个不同列各取一张组成一对（保证每对跨列，可解）
    var posPairs = [];
    var avail = colKeys.filter(function (k) { return colSlots[k].length > 0; });
    while (avail.length >= 2) {
      var a = avail[0], b = avail[1];
      posPairs.push([colSlots[a].pop(), colSlots[b].pop()]);
      avail = colKeys.filter(function (k) { return colSlots[k].length > 0; });
    }
    var pool = this._typePool();
    this.tiles = [];
    for (var p = 0; p < posPairs.length; p++) {
      var t = pool[p % pool.length];
      this._makeTile(posPairs[p][0], t);
      this._makeTile(posPairs[p][1], t);
    }
  };

  /** 单张牌的实例化（位置 + 类型 → tile，含立体错位偏移） */
  StackGame.prototype._makeTile = function (pos, type) {
    var off = (pos.layer - 1) * 5; // 错位堆叠：每层向右下偏移 5px，露出下层边形成立体感
    var vx = this.metrics.cx + pos.gx * CARD + CARD / 2 + off;
    var vy = this.metrics.cy + pos.gy * CARD + CARD / 2 + off;
    this.tiles.push({
      id: this.levelId + '_' + pos.gx + '_' + pos.gy + '_' + pos.layer,
      type: type, layer: pos.layer, gx: pos.gx, gy: pos.gy,
      covered: false, state: 'normal', shakeT: 0,
      visual: { x: vx, y: vy, scale: 1, iceAlpha: 0 },
    });
  };

  /** 重算覆盖关系：同 (gx,gy) 有更高层未消除牌 → 本牌被压住（covered） */
  StackGame.prototype._recomputeCovered = function () {
    var i, j;
    for (i = 0; i < this.tiles.length; i++) {
      var t = this.tiles[i];
      if (t.state === 'eliminated') { t.covered = true; continue; }
      t.covered = false;
      for (j = 0; j < this.tiles.length; j++) {
        var u = this.tiles[j];
        if (u === t || u.state === 'eliminated') continue;
        if (u.gx === t.gx && u.gy === t.gy && u.layer > t.layer) { t.covered = true; break; }
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

  /** 屏幕设计坐标 → 命中的最顶层可点牌（被压住的牌不会被返回） */
  StackGame.prototype.hitTest = function (dx, dy) {
    var best = null, bestLayer = -1, half = this.metrics.cw / 2;
    for (var i = 0; i < this.tiles.length; i++) {
      var t = this.tiles[i];
      if (t.state === 'eliminated') continue;
      if (dx >= t.visual.x - half && dx <= t.visual.x + half &&
          dy >= t.visual.y - half && dy <= t.visual.y + half) {
        if (!t.covered && t.layer > bestLayer) { best = t; bestLayer = t.layer; }
      }
    }
    return best;
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
   * 死局自救：重洗剩余牌的类型分配，保持「每对跨列 + 每种偶数张」，并强制顶层存在一对同色可消。
   * 这样原型阶段玩家永远不会被“无解布局”卡死（与连连看的「打乱」道具同理）。
   */
  StackGame.prototype._reshuffleRemaining = function () {
    var remaining = this._activeTiles();
    if (remaining.length === 0) return;
    // 按列分组，贪心跨列配对（与构建一致，保证每对跨列 → 可解）
    var colSlots = {}, self = this;
    remaining.forEach(function (t) {
      var key = t.gy * 1000 + t.gx; // 同一 (gx,gy) 列唯一 key
      (colSlots[key] = colSlots[key] || []).push(t);
    });
    var colKeys = Object.keys(colSlots);
    var posPairs = [];
    var avail = colKeys.filter(function (k) { return colSlots[k].length > 0; });
    while (avail.length >= 2) {
      var a = avail[0], b = avail[1];
      posPairs.push([colSlots[a].pop(), colSlots[b].pop()]);
      avail = colKeys.filter(function (k) { return colSlots[k].length > 0; });
    }
    // 现有类型按相同类型两两成组（每种偶数张）
    var byType = {};
    remaining.forEach(function (t) { (byType[t.type] = byType[t.type] || []).push(t.type); });
    var typeGroups = [];
    Object.keys(byType).forEach(function (ty) {
      var arr = byType[ty];
      for (var i = 0; i + 1 < arr.length; i += 2) typeGroups.push(ty);
    });
    // 把类型组按顺序分配到跨列位置对
    for (var i = 0; i < posPairs.length; i++) {
      var ty = typeGroups[i % typeGroups.length];
      posPairs[i][0].type = ty;
      posPairs[i][1].type = ty;
    }
    // 强制顶层存在一对同色可消（避免洗完仍无步 → 无限重洗）
    var U = remaining.filter(function (t) { return !t.covered; });
    if (U.length >= 2) {
      var T = U[0].type;
      var partner = null;
      for (var pi = 0; pi < remaining.length; pi++) {
        if (remaining[pi] !== U[0] && remaining[pi].type === T) { partner = remaining[pi]; break; }
      }
      if (partner) {
        var old1 = U[1].type;
        U[1].type = T;        // U[0] 与 U[1] 同色 → 顶层可消
        partner.type = old1;  // 交换保持各类型偶数张
      }
    }
    // 清理选择态 + 重算覆盖
    this.selectedTile = null;
    this.connectionLine = null;
    this._recomputeCovered();
  };

  /** 胜利 = 全部消除；死局 = 当前顶层可点牌中无同 type 对（无步可走则自动洗牌自救） */
  StackGame.prototype._checkEnd = function () {
    var active = this._activeTiles();
    if (active.length === 0) { this._won = true; this.onWin(); return; }
    var top = {};
    for (var i = 0; i < active.length; i++) {
      if (!active[i].covered) top[active[i].type] = (top[active[i].type] || 0) + 1;
    }
    var hasPair = false;
    for (var k in top) { if (top[k] >= 2) { hasPair = true; break; } }
    if (!hasPair) {
      // 先自动洗牌自救（原型不卡死）
      this._reshuffleRemaining();
      var top2 = {};
      var act2 = this._activeTiles();
      for (var x = 0; x < act2.length; x++) {
        if (!act2[x].covered) top2[act2[x].type] = (top2[act2[x].type] || 0) + 1;
      }
      var has2 = false;
      for (var k2 in top2) { if (top2[k2] >= 2) { has2 = true; break; } }
      if (!has2) {
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

  /** 重新开局：重置会话号，重洗牌堆（原型阶段随机布局，可能再次死局） */
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
    this._buildTiles();
    this._recomputeCovered();
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
