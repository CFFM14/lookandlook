/**
 * game.js —— 游戏核心主逻辑（Game 类）
 * 移植自 Cocos 版 GameManager.ts，并扩展：重力掉落 / 冰冻方块 / 10 关配置化 / 计时步数。
 *
 * 数据结构：
 *   grid[r][c]      —— 水果类型 1..12 或 0（空）
 *   cardNodes[r][c] —— card 对象或 null；card = {r, c, type, state, baseX, baseY, visual}
 *   frozen[r][c]    —— 1=带冰层 0=无（与卡片位置同步移动）；成对冻结，冰块=两张卡（破冰保留，需消除两次）
 *   singletonSet    —— Set<"r,c"> 单例（仅炸弹等外力或玩家孤立冰卡时产生，结算前自动消除）
 *   card.state      —— 'normal'|'selected'|'eliminating'|'eliminated'|'mismatch'|'hintFlash'
 */
(function () {
  'use strict';

  var T = GameGlobal.TIMING;

  function Game(levelId) {
    this.levelId = levelId;
    this.cfg = GameGlobal.getLevelConfig(levelId);
    // 注水关为「引用版」（只有 shapeKey/k/zoneMode/cardSet），在此按需展开成完整 shapeMap（用 shapes.js 运行时重建）
    if (this.cfg.shapeKey && !this.cfg.shapeMap && typeof GameGlobal.expandShapeRef === 'function') {
      GameGlobal.expandShapeRef(this.cfg);
    }
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

    // ── 新玩法扩展（形状棋盘 / 分区 / 特殊格 / 镜头）──
    this.hasShape = !!this.cfg.shapeMap;      // 是否形状棋盘（含镂空格）
    this.shape = null;        // shape[r][c] = true/false 格子是否存在（1-based，同 grid）
    this.zoneMap = null;      // zoneMap[r][c] = 分区 id
    this.zoneCount = 1;
    this.useNewEngine = this.hasShape; // 新玩法关走泛化寻路；旧关走原 canConnect（行为不变）
    this.cam = null;          // 镜头 {cx, cy, scale}（棋盘坐标系）；null = 固定布局（旧关）
    this.boardBox = null;     // 棋盘世界包围盒
    this._introOn = false;    // 入场镜头播放中
    this._introTarget = null;

    this.initLevel();
  }

  // ══════════════════════════════════════════════
  //  初始化
  // ══════════════════════════════════════════════

  Game.prototype.initLevel = function () {
    // 会话号：restart / 重新开局后，旧定时器回调自动失效（防止切页后误触发结算）
    this._session = (this._session || 0) + 1;
    this._won = false;
    this._lost = false;   // 移动卡飞出屏幕判负（游戏失败分支）
    this.movers = [];     // 移动卡列表（mover 关，可多张）：浮动卡，不占 grid、不挡路、独立命中/绘制
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

    // 新玩法：解析形状/分区 + 初始化镜头
    this._introOn = false;
    if (this.hasShape) this._buildShapeData();
    this._initCamera();

    this.generateLayout();
    this.createCards();
    // 移动卡关：随机抽一张卡成为移动卡（在冰冻之前；mover 关无冰冻）
    if (this.cfg.mover) this._setupMover();
    if (this.cfg.frozenRatio > 0) this.applyFrozen(this.cfg.frozenRatio);
    // 新棋盘：离屏缓存失效，首帧（Main.game 已就位、metrics 正确）重建并烘焙，避免进场全程全量重绘
    if (GameGlobal.Renderer && GameGlobal.Renderer.invalidateBoardCache) GameGlobal.Renderer.invalidateBoardCache();
  };

  // ══════════════════════════════════════════════
  //  新玩法：形状 / 分区 / 特殊格
  // ══════════════════════════════════════════════

  /** 解析 shapeMap 字符画：'.'=镂空，A~H=分区 0~7 */
  Game.prototype._buildShapeData = function () {
    var rows = this.rows, cols = this.cols;
    var map = this.cfg.shapeMap;
    this.shape = [];
    this.zoneMap = [];
    var maxZone = 0;
    for (var r = 0; r <= rows + 1; r++) {
      this.shape[r] = [];
      this.zoneMap[r] = [];
      for (var c = 0; c <= cols + 1; c++) {
        var inBoard = (r >= 1 && r <= rows && c >= 1 && c <= cols);
        var ch = inBoard ? (map[r - 1] && map[r - 1][c - 1]) : '.';
        var exists = inBoard && ch && ch !== '.';
        this.shape[r][c] = !!exists;
        var zone = 0;
        if (exists) {
          var code = ch.charCodeAt(0);
          zone = (code >= 65 && code <= 72) ? code - 65 : 0; // 'A'..'H' → 0..7
          if (zone > maxZone) maxZone = zone;
        }
        this.zoneMap[r][c] = zone;
      }
    }
    this.zoneCount = maxZone + 1;
  };

  /** 分区是否隔离中（多分区时默认隔离，不同分区的水果不能互消） */
  Game.prototype.zoneIsolated = function () {
    return this.zoneCount > 1;
  };

  /** 配对记账 key：分区隔离时按「类型+分区」分组，否则仅按类型（与旧行为一致） */
  Game.prototype._pairKey = function (card) {
    return this.zoneIsolated() ? card.type + '|z' + card.zone : String(card.type);
  };

  /**
   * 连线判定入口：旧关走原 canConnect（行为 100% 不变）；
   * 新玩法关走泛化引擎（支持形状棋盘/分区的寻路，经典 2 折、不可穿透）。
   *
   * 移动卡（mover）实体挡路规则：
   *   · mover 作为起点/终点：占位格临时填上目标类型（空起点过不了校验），坐标基准 = 视觉当前位置 `_moverCell`；
   *   · 其他未消除 mover 的占位格 = 会动的墙（临时填 -1），路径不能穿过它 → 被挡的配对暂时消不了；
   *   · ignoreMoverWall=true 时跳过墙（用于挡路提示判定/死局检测：mover 会动，挡路是暂时的，不算死局）。
   * 寻路完成后立即恢复所有临时改动（仅影响本次判定）。
   */
  Game.prototype.findConnectPath = function (cardA, cardB, ignoreMoverWall) {
    var saved = []; // [r, c, 原值]
    var placeA = this._isMover(cardA) ? this._moverCell(cardA) : null;
    var placeB = this._isMover(cardB) ? this._moverCell(cardB) : null;

    // 1) mover 起/终点：占位格临时填类型（过起点校验；坐标用视觉格）
    if (placeA) {
      saved.push([placeA.r, placeA.c, this.grid[placeA.r][placeA.c]]);
      this.grid[placeA.r][placeA.c] = cardB.type;
    }
    if (placeB) {
      saved.push([placeB.r, placeB.c, this.grid[placeB.r][placeB.c]]);
      this.grid[placeB.r][placeB.c] = cardA.type;
    }

    // 2) 实体挡路：其他未消除 mover 的占位格临时填障碍（-1 = 墙，路径不可穿过）
    if (!ignoreMoverWall) {
      for (var i = 0; i < this.movers.length; i++) {
        var mv = this.movers[i];
        if (mv === cardA || mv === cardB) continue;
        if (mv.eliminated || mv.state === 'eliminating' || mv.state === 'eliminated') continue;
        var cell = this._moverCell(mv);
        if (this.grid[cell.r][cell.c] === 0) {
          saved.push([cell.r, cell.c, 0]);
          this.grid[cell.r][cell.c] = -1;
        }
      }
    }

    var rA = placeA ? placeA.r : cardA.r;
    var cA = placeA ? placeA.c : cardA.c;
    var rB = placeB ? placeB.r : cardB.r;
    var cB = placeB ? placeB.c : cardB.c;

    var path;
    if (!this.useNewEngine) {
      path = GameGlobal.PathChecker.canConnect(this.grid, this.rows, this.cols,
        rA, cA, rB, cB);
    } else {
      path = GameGlobal.PathChecker.findPath(this.grid, this.rows, this.cols,
        rA, cA, rB, cB, {
          maxTurns: 2,
          maxPierce: 0,
        });
    }
    for (var s = saved.length - 1; s >= 0; s--) {
      this.grid[saved[s][0]][saved[s][1]] = saved[s][2];
    }
    return path;
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
    // 形状棋盘：按分区各自成对生成（保证每个分区内部可独立消完）
    if (this.hasShape) {
      this._generateShapedLayout();
      return;
    }

    var totalCards = this.rows * this.cols;
    var pairsNeeded = totalCards / 2;

    // 移动卡关：不预留空格（棋盘满格），mover 占中心附近 n 格（grid=0，mover 视觉嵌那，靠玩家消除相邻卡解锁空间）。
    // 每个 mover 类型只放 1 张 partner（场上唯一同类，只能与对应 mover 配对）；mover 类型互不相同，避免互配卡死。
    if (this.cfg.mover) {
      var moverTypes = this.cfg.moverTypes || [1, 2];
      var n = moverTypes.length;
      var others = [];
      for (var t = 1; t <= this.cfg.fruitTypeCount; t++) {
        if (moverTypes.indexOf(t) >= 0) continue;
        others.push(t);
      }
      var types = moverTypes.slice(); // 每种 mover 类型 1 张 partner
      var remPairs = pairsNeeded - n; // 其余类型对数
      var base = Math.floor(remPairs / others.length);
      var extra = remPairs - base * others.length;
      for (var i = 0; i < others.length; i++) {
        var nn = base + (i < extra ? 1 : 0);
        for (var p = 0; p < nn; p++) types.push(others[i], others[i]);
      }
      this.shuffleArray(types);
      // 移动卡起始格：在棋盘内部区（避开最外圈 r∈[2,rows-1]×c∈[2,cols-1]）随机选 n 个互不相邻（曼哈顿距离 ≥ 2）的格子，
      // 尽量分散又不贴边（边缘卡开局就有逃跑通道，体验差）。
      var cands = [];
      for (var rr = 2; rr <= this.rows - 1; rr++) {
        for (var cc = 2; cc <= this.cols - 1; cc++) cands.push([rr, cc, Math.random()]);
      }
      cands.sort(function (a, b) { return a[2] - b[2]; });
      var moverCells = [];
      for (var ci = 0; ci < cands.length && moverCells.length < n; ci++) {
        var cr = cands[ci][0], cc2 = cands[ci][1];
        var far = true;
        for (var mj = 0; mj < moverCells.length; mj++) {
          if (Math.abs(cr - moverCells[mj][0]) + Math.abs(cc2 - moverCells[mj][1]) < 2) { far = false; break; }
        }
        if (far) moverCells.push([cr, cc2]);
      }
      var fillCells = [];
      for (var r2 = 1; r2 <= this.rows; r2++) {
        for (var c2 = 1; c2 <= this.cols; c2++) {
          var isMoverCell = false;
          for (var k = 0; k < moverCells.length; k++) {
            if (moverCells[k][0] === r2 && moverCells[k][1] === c2) { isMoverCell = true; break; }
          }
          if (isMoverCell) { this.grid[r2][c2] = 0; continue; }
          fillCells.push([r2, c2]);
        }
      }
      // 铺散摆放：同类尽量隔开，避免「一堆相同方块挨在一起」导致过于简单
      // （只改空间分布、不改各类型份数，不影响可解性；partner 单张也按最近质心锚定）
      var assign = this._spreadTypes(types, fillCells);
      for (var k2 = 0; k2 < fillCells.length; k2++) {
        this.grid[fillCells[k2][0]][fillCells[k2][1]] = assign[k2];
      }
      this._moverCells = moverCells;
      this.remainingPairs = types.length / 2; // _setupMover 里 recompute 会按 partner 单卡重算
      return;
    }

    // 固定关卡：直接使用预生成布局（js/levels.js），保证每关打开都是同一副棋盘
    var fixed = GameGlobal.LEVEL_LAYOUTS && GameGlobal.LEVEL_LAYOUTS[this.levelId];
    if (fixed && fixed.g && fixed.g.length === totalCards) {
      var idx = 0;
      for (var r2 = 1; r2 <= this.rows; r2++) {
        for (var c2 = 1; c2 <= this.cols; c2++) {
          this.grid[r2][c2] = fixed.g[idx++];
        }
      }
      this.remainingPairs = pairsNeeded;
      return;
    }

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
    // 铺散摆放：同类尽量隔开，避免「一堆相同方块挨在一起」导致过于简单（只改空间分布，不影响可解性）
    var cells2 = [];
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) cells2.push([r, c]);
    }
    var assign2 = this._spreadTypes(types, cells2);
    for (var k2 = 0; k2 < cells2.length; k2++) {
      this.grid[cells2[k2][0]][cells2[k2][1]] = assign2[k2];
    }
    this.remainingPairs = pairsNeeded;
  };

  /**
   * 形状棋盘布局：按分区收集格子 → 各分区用独立水果池成对填充。
   * 分区格数为奇时多出的一格随机补一种（结算前的单例机制会自动收掉）。
   */
  Game.prototype._generateShapedLayout = function () {
    var byZone = {};
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        if (!this.shape[r][c]) continue;
        var z = this.zoneMap[r][c];
        (byZone[z] = byZone[z] || []).push([r, c]);
      }
    }
    var pools = this.cfg.zonePools || {};
    // 多卡组模式：cardSets = ['fruit','veg'] 时，type 写成 'f<n>'/'v<n>'；否则保持数字 1~12
    var allTypes = [];
    var cardSets = this.cfg.cardSets;
    if (cardSets && cardSets.length) {
      var fruitTypeCount = this.cfg.fruitTypeCount || 12;
      for (var s = 0; s < cardSets.length; s++) {
        var cs = GameGlobal.CARD_SETS && GameGlobal.CARD_SETS[cardSets[s]];
        if (!cs) continue;
        for (var t = 1; t <= fruitTypeCount; t++) allTypes.push(cs.prefix + t);
      }
    } else {
      for (var t2 = 1; t2 <= (this.cfg.fruitTypeCount || 12); t2++) allTypes.push(t2);
    }

    for (var z2 in byZone) {
      if (!byZone.hasOwnProperty(z2)) continue;
      var cells = byZone[z2];
      var pool = pools[z2] || allTypes;
      var pairs = Math.floor(cells.length / 2);
      var types = this._zoneTypeList(pool, pairs);
      // 奇数格：随机补一张（会成为孤卡，由单例机制自动消除，不会卡关）
      if (cells.length % 2 !== 0) {
        types.push(pool[Math.floor(Math.random() * pool.length)]);
      }
      // 铺散摆放：把同一种类尽量隔开，避免「一堆相同方块挨在一起」导致过于简单
      var assign = this._spreadTypes(types, cells);
      for (var k = 0; k < cells.length; k++) {
        this.grid[cells[k][0]][cells[k][1]] = assign[k];
      }
    }
    var total = 0;
    for (var r2 = 1; r2 <= this.rows; r2++) {
      for (var c2 = 1; c2 <= this.cols; c2++) if (this.grid[r2][c2] !== 0) total++;
    }
    this.remainingPairs = Math.floor(total / 2);
  };

  /**
   * 按分区水果池生成成对类型列表，并保证池内【每种至少出现一对】，
   * 这样无论棋盘多大，都能用到全部种类（如雄鹰关 12 蔬菜 + 12 水果全上阵）。
   * 剩余位置再从池中随机成对补充。
   * @param {Array} pool 该分区可用类型（如 ['v1'..'v12']）
   * @param {number} pairs 需要成对的数量（= floor(格子数/2)）
   * @returns {Array} 长度 pairs*2 的类型序列
   */
  Game.prototype._zoneTypeList = function (pool, pairs) {
    var need = pairs * 2;
    var types = [];
    var i = 0;
    // 保证池内每种至少一对（用到全部种类）
    while (i < pool.length && types.length + 2 <= need) {
      types.push(pool[i], pool[i]);
      i++;
    }
    // 剩余随机成对补充
    while (types.length < need) {
      var t = pool[Math.floor(Math.random() * pool.length)];
      types.push(t, t);
    }
    return types;
  };

  /**
   * 铺散摆放：把同一类型的卡片尽量隔开，避免「一堆相同方块挨在一起」导致过于简单。
   * 贪心策略：份数多的类型先铺（径向散开）——首张锚定分区质心，后续每张选「离同类已放卡片最远」的空格。
   * 只改变同类型方块的空间分布，不改变各类型的份数，因此不影响关卡可解性。
   * @param {Array} types 该分区全部卡片类型（每种偶数份，奇数格为孤卡）
   * @param {Array<Array<number>>} cells 该分区格子坐标 [[r,c],...]
   * @returns {Array} 与 cells 等长的类型序列（按 cells 顺序）
   */
  Game.prototype._spreadTypes = function (types, cells) {
    var n = cells.length;
    if (n === 0) return types;
    // 统计每种类型份数（注意：对象 key 会字符串化，需另存原值，避免数字类型被转成字符串）
    var counts = {};
    var origVal = {};
    for (var i = 0; i < types.length; i++) {
      var key = String(types[i]);
      counts[key] = (counts[key] || 0) + 1;
      if (!(key in origVal)) origVal[key] = types[i];
    }
    // 类型按份数降序（多份的先铺，保证充分散开）
    var typeList = [];
    for (var t in counts) if (counts.hasOwnProperty(t)) typeList.push(origVal[t]);
    typeList.sort(function (a, b) { return counts[String(b)] - counts[String(a)]; });
    // 复制队列：每种类型按其份数入队
    var queue = [];
    for (var q = 0; q < typeList.length; q++) {
      var ty = typeList[q];
      for (var c = 0; c < counts[ty]; c++) queue.push(ty);
    }
    // 分区质心（格子坐标均值）
    var cx = 0, cy = 0;
    for (var ci = 0; ci < n; ci++) { cx += cells[ci][1]; cy += cells[ci][0]; }
    cx /= n; cy /= n;
    var used = [];
    for (var u = 0; u < n; u++) used.push(false);
    var placedByType = {};
    var assign = [];
    for (var a = 0; a < n; a++) assign.push(null);

    for (var p = 0; p < queue.length; p++) {
      var curType = queue[p];
      var already = placedByType[curType] || [];
      var bestIdx = -1, bestVal = -1;
      for (var idx = 0; idx < n; idx++) {
        if (used[idx]) continue;
        var rr = cells[idx][0], cc = cells[idx][1];
        var val;
        if (already.length === 0) {
          // 首张：离质心最近（锚定中心），后续同类型向外辐射散开
          var d0 = (rr - cy) * (rr - cy) + (cc - cx) * (cc - cx);
          if (bestIdx < 0 || d0 < bestVal) { bestVal = d0; bestIdx = idx; }
          continue;
        } else {
          // 后续：选与同类已放卡片「最小距离」最大者（尽量隔开）
          var minD = Infinity;
          for (var m = 0; m < already.length; m++) {
            var pr = cells[already[m]][0], pc = cells[already[m]][1];
            var dd = (rr - pr) * (rr - pr) + (cc - pc) * (cc - pc);
            if (dd < minD) minD = dd;
          }
          val = minD;
        }
        if (val > bestVal) { bestVal = val; bestIdx = idx; }
      }
      used[bestIdx] = true;
      assign[bestIdx] = curType;
      (placedByType[curType] = placedByType[curType] || []).push(bestIdx);
    }
    return assign;
  };

  /** 创建卡片对象（含视觉状态） */
  Game.prototype.createCards = function () {
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
          zone: this.zoneMap ? this.zoneMap[r][c] : 0,
        };
        this.cardNodes[r][c] = card;
      }
    }
  };

  // ══════════════════════════════════════════════
  //  移动卡（mover）：第 25 关「逃逸的移动卡」
  //  开局静止嵌在棋盘；主轴方向（水平）的走廊墙卡被消除 → 走廊变宽 → 开始往复，
  //  行程随走廊扩展变长；所在行完全清空 → 单向滑出屏幕 → 完全出屏判负（onLose）。
  //  mover 是浮动卡：不占 grid、不在 cardNodes、不挡路、独立命中/绘制。
  // ══════════════════════════════════════════════

  /** 初始化移动卡：在中心预留格创建 n 张 mover（类型 = cfg.moverTypes，各自占一格，不占 grid）。
   *  场上每种 mover 类型只有 1 张 partner（唯一同类，只能与对应 mover 配对消除）。 */
  Game.prototype._setupMover = function () {
    var moverTypes = this.cfg.moverTypes || [1, 2];
    var cells = this._moverCells || [];
    this.movers = [];
    for (var i = 0; i < moverTypes.length; i++) {
      var pr = cells[i] ? cells[i][0] : Math.floor(this.rows / 2) + (i % 2);
      var pc = cells[i] ? cells[i][1] : Math.floor(this.cols / 2) + Math.floor(i / 2);
      var px = this.logicToPixel(pr, pc);
      this.movers.push({
        r: pr, c: pc, type: moverTypes[i],
        state: 'normal',
        baseX: px.x, baseY: px.y,
        visual: { x: px.x, y: px.y, scale: 1, iceAlpha: 0 },
        zone: 0,
        isMover: true,        // 渲染标记：红色薄边框，让玩家一眼认出会移动的那张卡
        moving: false,        // 是否已开始移动（开局静止，消除相邻卡后朝解锁方向启动）
        dr: 0, dc: 0,         // 当前运动方向（单位向量，上/下/左/右）
        vx: 0, vy: 0,         // 当前速度（px/s）
        paused: false,        // 玩家点击选中时暂停移动（给思考时间；取消选中/配对失败恢复）
        hesitateLeft: 0,      // 跑到出口准备溜走时的"犹豫"剩余毫秒（停顿预警，给玩家最后机会点住它）
        freezeLeft: 0,        // 时间静止剩余毫秒（道具 useFreeze 触发；>0 时整张卡冻结不动；paused 期间不流逝）
        flying: false,        // 前方无阻挡直通棋盘边缘 → 单向滑出屏幕（出屏判负）
        eliminated: false,    // 已被配对消除（一次性目标，不再出现）
      });
      this.grid[pr][pc] = 0;
      this.cardNodes[pr][pc] = null;
    }
    this.recomputeRemainingPairs();
  };

  /** 某卡是否为移动卡（任一 mover） */
  Game.prototype._isMover = function (card) {
    var arr = this.movers;
    for (var i = 0; i < arr.length; i++) if (arr[i] === card) return true;
    return false;
  };

  /** 某类型是否为未消除 mover 的类型（用于单例/洗牌保护 partner） */
  Game.prototype._isMoverType = function (type) {
    var arr = this.movers;
    for (var i = 0; i < arr.length; i++) {
      if (!arr[i].eliminated && arr[i].type === type) return true;
    }
    return false;
  };

  /** 把寻路路径中 mover 端（path[0]：findConnectPath 以 mover 为起点）换成实时像素点，
   *  让连线/提示线端点对准移动卡当前实际位置（drawConnectionLine 支持 {x,y} 像素点）。 */
  Game.prototype._pathWithMoverPos = function (path, mover) {
    var pts = path.slice();
    if (pts.length) pts[0] = { x: mover.visual.x, y: mover.visual.y };
    return pts;
  };

  /** mover 视觉当前位置压着的逻辑格 {r,c}（实体挡路/配对基准都用它，移动中也能精确到所在格） */
  Game.prototype._moverCell = function (mover) {
    var m = this.metrics;
    var r = Math.round((mover.visual.y - m.oy - m.ch / 2) / (m.ch + m.gy)) + 1;
    var c = Math.round((mover.visual.x - m.ox - m.cw / 2) / (m.cw + m.gx)) + 1;
    return { r: Math.max(1, Math.min(this.rows, r)), c: Math.max(1, Math.min(this.cols, c)) };
  };

  /** (r,c) 是否被某张未消除的 mover 占据（exclude 排除自身，用于移动卡互撞检测） */
  Game.prototype._moverAtCell = function (r, c, exclude) {
    for (var i = 0; i < this.movers.length; i++) {
      var mv = this.movers[i];
      if (mv === exclude) continue;
      if (mv.eliminated || mv.state === 'eliminating' || mv.state === 'eliminated') continue;
      var cell = this._moverCell(mv);
      if (cell.r === r && cell.c === c) return mv;
    }
    return null;
  };

  /** 移动卡是否正停在出口"犹豫"（准备溜走前的预警期，渲染层据此高亮警示） */
  Game.prototype._moverHesitating = function (mover) {
    return !!(mover && !mover.flying && mover.hesitateLeft > 0);
  };

  /** mover 上下左右任一相邻格是否为解锁出的空格（其他 mover 的占位格不算），返回方向 {dr,dc} 或 null */
  Game.prototype._firstEmptyNeighborDir = function (mover) {
    var dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (var i = 0; i < 4; i++) {
      var r = mover.r + dirs[i][0], c = mover.c + dirs[i][1];
      if (r < 1 || r > this.rows || c < 1 || c > this.cols) continue;
      if (this.grid[r][c] !== 0) continue;
      // 该空格若是另一张 mover 的占位格，不算"玩家消除解锁"
      var isOtherMover = false;
      for (var k = 0; k < this.movers.length; k++) {
        if (this.movers[k] !== mover && this.movers[k].r === r && this.movers[k].c === c) {
          isOtherMover = true; break;
        }
      }
      if (!isOtherMover) return { dr: dirs[i][0], dc: dirs[i][1] };
    }
    return null;
  };

  /** 命中设计坐标 (x, y) 的 mover（main.handleTap 优先于棋盘 hitTest 检测），返回 mover 或 null。
   *  onlyFlying=true 时只命中"正在逃出屏幕"的 mover —— 逃逸中的卡会飘到 HUD/按钮上方，
   *  若被按钮抢走点击玩家就点不到、救不回来，故 handleTap 让它优先于按钮判定。 */
  Game.prototype.hitTestMover = function (x, y, onlyFlying) {
    var m = this.metrics;
    for (var i = 0; i < this.movers.length; i++) {
      var mover = this.movers[i];
      if (mover.state === 'eliminating' || mover.state === 'eliminated') continue;
      if (onlyFlying && !mover.flying) continue;
      if (Math.abs(x - mover.visual.x) <= m.cw / 2 &&
          Math.abs(y - mover.visual.y) <= m.ch / 2) {
        return mover;
      }
    }
    return null;
  };

  /** 每帧驱动所有 mover（挂 Main.update，dt 单位 ms）
   *  规则：朝解锁方向逐格移动（上下左右皆可）；前方有卡 → 反弹（反方向空则转，前后都堵则原地等待）；
   *        前方直通棋盘边缘（无卡阻挡）→ 单向滑出屏幕，完全出屏判负（onLose）。 */
  Game.prototype.updateMover = function (dt) {
    if (this._won || this._lost) return;
    var m = this.metrics;
    var cfg = GameGlobal.MOVER_CFG || { speed: 35, escapeSpeed: 35 };
    for (var i = 0; i < this.movers.length; i++) {
      var mover = this.movers[i];
      if (mover.eliminated || mover.state === 'eliminating' || mover.state === 'eliminated') continue;
      if (mover.paused) continue; // 玩家点击选中时暂停，给思考时间
      if (mover.freezeLeft > 0) { mover.freezeLeft -= dt; if (mover.freezeLeft < 0) mover.freezeLeft = 0; continue; } // 时间静止（paused 在前，思考时不数）

      // 未启动：上下左右任一相邻格被消除 → 朝该解锁方向启动
      if (!mover.moving) {
        var d = this._firstEmptyNeighborDir(mover);
        if (!d) continue;
        mover.moving = true;
        mover.dr = d.dr;
        mover.dc = d.dc;
      }

      // 飞出模式：前方直通棋盘边缘 → 直线滑出屏幕；完全出屏判负
      if (mover.flying) {
        mover.visual.x += mover.vx * dt / 1000;
        mover.visual.y += mover.vy * dt / 1000;
        if (mover.visual.x < -m.cw || mover.visual.x > GameGlobal.DESIGN_W + m.cw ||
            mover.visual.y < -m.ch || mover.visual.y > GameGlobal.DESIGN_H + m.ch) {
          this.onLose();
          return;
        }
        continue;
      }

      // 前方格（沿当前方向）
      var nr = mover.r + mover.dr, nc = mover.c + mover.dc;
      if (nr < 1 || nr > this.rows || nc < 1 || nc > this.cols) {
        // 前方直通棋盘边缘 → 先在出口"犹豫"片刻（预警 + 给玩家最后机会点住它），再单向滑出屏幕。
        // 用剩余毫秒倒计时：暂停/思考期间不流逝（玩家点住它时可以从容决定）。
        if (!mover.hesitateLeft) mover.hesitateLeft = cfg.hesitate || 800;
        mover.hesitateLeft -= dt;
        if (mover.hesitateLeft > 0) continue;
        mover.hesitateLeft = 0;
        mover.flying = true;
        mover.vx = mover.dc * cfg.escapeSpeed;
        mover.vy = mover.dr * cfg.escapeSpeed;
        continue;
      }
      // 前方被其他移动卡占据（实体碰撞：两卡不会重叠；撞上则主动方反弹，被撞方方向不变）
      var hitMover = this._moverAtCell(nr, nc, mover);
      if (hitMover || this.grid[nr][nc] !== 0) {
        // 前方有卡 / 有移动卡 → 尝试反弹（反方向空则转向）；前后都堵则原地等待新解锁
        var ndr = -mover.dr, ndc = -mover.dc;
        var bnr = mover.r + ndr, bnc = mover.c + ndc;
        if (bnr >= 1 && bnr <= this.rows && bnc >= 1 && bnc <= this.cols &&
            this.grid[bnr][bnc] === 0 && !this._moverAtCell(bnr, bnc, mover)) {
          mover.dr = ndr; mover.dc = ndc;
        }
        continue;
      }

      // 前方畅通：向目标格中心匀速移动
      mover.vx = mover.dc * cfg.speed;
      mover.vy = mover.dr * cfg.speed;
      var tx = this.logicToPixel(nr, nc).x;
      var ty = this.logicToPixel(nr, nc).y;
      var dx = tx - mover.visual.x, dy = ty - mover.visual.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var step = cfg.speed * dt / 1000;
      if (dist <= step) {
        mover.visual.x = tx;
        mover.visual.y = ty;
        mover.r = nr;
        mover.c = nc;
      } else {
        mover.visual.x += (dx / dist) * step;
        mover.visual.y += (dy / dist) * step;
      }
    }
  };

  /** 失败：移动卡完全飞出屏幕（游戏首个失败分支；_session 守卫 restart 后失效） */
  Game.prototype.onLose = function () {
    if (this._lost || this._won) return;
    this._lost = true;
    this.isProcessing = true;
    GameGlobal.SoundManager.play('fail');
    var self = this;
    var levelId = this.levelId;
    this._after(600, function () {
      GameGlobal.Main.showLose(levelId);
    });
  };

  /** 随机冻结 k 张卡片（尽量不相邻） */
  /**
   * 随机冻结卡片（成对冻结）：同类型的两张卡一起冻，保证冰卡天然成对。
   * 配对规则（普+普 / 冰+冰 可消；普+冰 禁止），因此不用炸弹时数量永远正好配对、无单张。
   */
  Game.prototype.applyFrozen = function (ratio) {
    // 固定关卡：使用预生成冰冻位置
    var fixed = GameGlobal.LEVEL_LAYOUTS && GameGlobal.LEVEL_LAYOUTS[this.levelId];
    if (fixed && fixed.f && fixed.f.length) {
      for (var fi = 0; fi < fixed.f.length; fi++) {
        var fidx = fixed.f[fi];
        var fr = Math.floor(fidx / this.cols) + 1;
        var fc = (fidx % this.cols) + 1;
        this.frozen[fr][fc] = 1;
        var fcard = this.cardNodes[fr][fc];
        if (fcard) fcard.visual.iceAlpha = 1;
      }
      if (GameGlobal.Renderer && GameGlobal.Renderer.invalidateBoardCache) GameGlobal.Renderer.invalidateBoardCache();
      return;
    }

    // 按类型收集卡片
    var byType = {};
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        var t = this.grid[r][c];
        if (t !== 0) (byType[t] = byType[t] || []).push([r, c]);
      }
    }
    // 每种类型内部两两配对（同类型两张一起冻）
    var pairs = [];
    for (var t2 in byType) {
      if (!byType.hasOwnProperty(t2)) continue;
      var list = byType[t2];
      for (var i = 0; i + 1 < list.length; i += 2) pairs.push([list[i], list[i + 1]]);
    }
    this.shuffleArray(pairs);

    // 期望冰冻张数（取偶数，保持成对）
    var total = 0;
    for (var r2 = 1; r2 <= this.rows; r2++) {
      for (var c2 = 1; c2 <= this.cols; c2++) if (this.grid[r2][c2] !== 0) total++;
    }
    var k = Math.floor(total * ratio);
    k = Math.floor(k / 2) * 2;

    var count = 0;
    for (var p = 0; p < pairs.length && count < k; p++) {
      var pair = pairs[p];
      for (var j = 0; j < 2; j++) {
        var rc = pair[j];
        this.frozen[rc[0]][rc[1]] = 1;
        var card = this.cardNodes[rc[0]][rc[1]];
        if (card) card.visual.iceAlpha = 1; // 冰层是视觉效果，冰块在配对消除时碎裂
      }
      count += 2;
    }
    if (GameGlobal.Renderer && GameGlobal.Renderer.invalidateBoardCache) GameGlobal.Renderer.invalidateBoardCache();
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

    // 移动卡：已选 mover 时，点击场上卡即与 mover 配对
    if (this._isMover(this.selectedCard)) {
      this.tryEliminateMover(this.selectedCard, card);
      return;
    }

    // 所有卡片（含奇数残留卡）均可正常选中配对；最后多出的单张在剩余对清完后自动消除
    if (!this.selectedCard) {
      this.selectedCard = card;
      card.state = 'selected';
      this.highlightCard(card, true);
      GameGlobal.SoundManager.play('select');
    } else if (this.selectedCard === card) {
      card.state = 'normal';
      this.highlightCard(card, false);
      this.selectedCard = null;
      GameGlobal.SoundManager.play('select');
    } else {
      var first = this.selectedCard;
      this.isProcessing = true;
      card.state = 'selected';
      this.highlightCard(card, true);

      // 类型必须相同（连线只查路径不查类型，这里补判定，防止误消不同类型）
      if (first.type !== card.type) {
        this.showMismatch(first, card);
        return;
      }
      // 分区隔离：不同分区的水果默认不能互消（跨区特殊格解锁后放行）
      if (this.zoneIsolated() && first.zone !== card.zone) {
        var zn = GameGlobal.ZONE_NAMES || [];
        GameGlobal.Main.showToast('不同区域的卡片不能互消（' +
          (zn[first.zone] || '') + ' ≠ ' + (zn[card.zone] || '') + '）');
        this.showMismatch(first, card);
        return;
      }
      // 冰块 = 两张卡（需消除两次）：普+冰 配对时普卡消、冰卡破冰保留；
      // 冰+冰 双双击碎。任何同类型组合都可配对，不做状态限制（见 eliminatePair）

      var path = this.findConnectPath(first, card);
      if (path) {
        this.eliminatePair(first, card, path);
      } else {
        // 实体挡路：无视 mover 墙能通则说明被移动卡挡住（mover 会动，等它移开即可消）
        if (this.movers.length && this.findConnectPath(first, card, true)) {
          GameGlobal.Main.showToast('被移动卡挡住了，等它移开或先消掉它');
        }
        this.showMismatch(first, card);
      }
    }
  };

  /** 玩家点击移动卡（main.handleTap 命中 mover 时调用）：选中/取消/与已选卡配对。
   *  点中即暂停移动（给玩家思考时间）；取消选中恢复。 */
  Game.prototype.onTapMover = function (mover) {
    if (this.isProcessing) return;
    if (!mover || mover.eliminated || mover.state === 'eliminating' || mover.state === 'eliminated') return;
    mover.paused = true; // 点中移动卡 → 暂停移动
    if (!this.selectedCard) {
      this.selectedCard = mover;
      mover.state = 'selected';
      this.highlightCard(mover, true);
      GameGlobal.SoundManager.play('select');
    } else if (this.selectedCard === mover) {
      mover.state = 'normal';
      this.highlightCard(mover, false);
      mover.paused = false; // 取消选中 → 恢复移动
      this.selectedCard = null;
      GameGlobal.SoundManager.play('select');
    } else {
      // 已选场上卡 → 与 mover 配对（配对成功 mover 消失；失败在 tryEliminateMover 内恢复移动）
      this.tryEliminateMover(mover, this.selectedCard);
    }
  };

  /** mover 与场上卡配对：类型校验 + 2 折路径（基准 = mover 当前逻辑格）。
   *  配对瞬间冻结 mover（暂停），连线/特效对准其实际所在点；失败恢复移动。 */
  Game.prototype.tryEliminateMover = function (mover, card) {
    if (!mover || mover.eliminated || mover.state === 'eliminating' || mover.state === 'eliminated') return;
    if (!card || card.state === 'eliminated') return;

    mover.paused = true; // 冻结当前位置，避免判定/连线时它还在动
    this.isProcessing = true;
    if (mover.type !== card.type) {
      mover.paused = false; // 配对失败 → 恢复移动
      this.showMismatch(mover, card);
      return;
    }
    // 分区隔离（mover 关恒 false，保留防御）
    if (this.zoneIsolated() && mover.zone !== card.zone) {
      var zn = GameGlobal.ZONE_NAMES || [];
      GameGlobal.Main.showToast('不同区域的卡片不能互消（' +
        (zn[mover.zone] || '') + ' ≠ ' + (zn[card.zone] || '') + '）');
      mover.paused = false; // 配对失败 → 恢复移动
      this.showMismatch(mover, card);
      return;
    }
    // 路径基准：直接传 mover 本身（findConnectPath 内部处理空起点 + clamp；mover.r/c 恒在棋盘内）
    var path = this.findConnectPath(mover, card);
    if (path) {
      this.eliminateMoverPair(mover, card, path);
    } else {
      mover.paused = false; // 配对失败 → 恢复移动
      // 实体挡路：无视 mover 墙能通则说明被移动卡挡住（等它移开即可消）
      if (this.findConnectPath(mover, card, true)) {
        GameGlobal.Main.showToast('被移动卡挡住了，等它移开或先消掉它');
      }
      this.showMismatch(mover, card);
    }
  };

  /** 消除 mover + 场上同类（普通配对流程；mover 不占 grid，无需清格） */
  Game.prototype.eliminateMoverPair = function (mover, card, path) {
    var self = this;

    // 连线端点用 mover 实时像素位置（配对瞬间已暂停冻结），消除特效/连线对准实际所在点
    this.connectionLine = { points: this._pathWithMoverPos(path, mover), color: 'gold', timeLeft: T.ELIM_LINE };
    GameGlobal.SoundManager.play('elim');
    // 注：消除不再让其他 mover 刹车（每次消除都顿一下太打断节奏）；
    // 改为"出口犹豫"——只有它真跑到边缘要溜时才停顿预警（见 updateMover）。

    // 普通卡（partner）消除
    this.grid[card.r][card.c] = 0;
    this.cardNodes[card.r][card.c] = null;
    this.frozen[card.r][card.c] = 0;
    this.singletonSet.delete(card.r + ',' + card.c);
    var p = this.logicToPixel(card.r, card.c);
    card.state = 'eliminating';
    GameGlobal.Renderer.spawnFirework(p.x, p.y);
    GameGlobal.Tween.to(card.visual, { scale: 0 }, T.ELIM_SCALE, 'easeIn', function () {
      card.state = 'eliminated';
    });

    // mover 消除（延迟 100ms 错开）
    this._after(100, function () {
      mover.state = 'eliminating';
      mover.eliminated = true;
      GameGlobal.Renderer.spawnFirework(mover.visual.x, mover.visual.y);
      GameGlobal.Tween.to(mover.visual, { scale: 0 }, T.ELIM_SCALE, 'easeIn', function () {
        mover.state = 'eliminated';
      });
    });

    this._after(T.ELIM_LINE + 20, function () {
      if (self.connectionLine && self.connectionLine.color === 'gold') self.connectionLine = null;
    });

    this._after(T.ELIM_TOTAL, function () {
      self.selectedCard = null;
      self.isProcessing = false;
      self.moves++;
      self.recomputeRemainingPairs();
      self.recomputeSingletons();
      self.afterEliminate();
    });
  };

  /**
   * 选中/取消缩放动画（复刻原版 Cocos FruitCard.setHighlight）：
   * 选中 → 弹到 1.18 再回落到 1.08 保持微大；取消 → 回到 1.0
   */
  Game.prototype.highlightCard = function (card, on) {
    // 选中态会改变卡片缩放，离屏缓存需失效以便重建（含选中放大效果）
    if (GameGlobal.Renderer && GameGlobal.Renderer.invalidateBoardCache) GameGlobal.Renderer.invalidateBoardCache();
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
   * 配对消除（冰块 = 两张卡，需消除两次）：
   *   普+普 → 两张都消除
   *   普+冰 → 普通卡消除，冰卡只破冰（冰裂动画）保留为普通卡 —— 冰块第一次被消（破冰）
   *   冰+冰 → 两张都消除（双双击碎）
   * 成对冻结保证初始"单位数"（普×1 + 冰×2）恒为偶数，不用炸弹时布局可完美消完；
   * 玩家若把冰卡孤立成单张，由单例机制在结算前自动清除（与炸弹单张一致）。
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

    // 连线（金色）+ 音效马上响
    this.connectionLine = { points: path, color: 'gold', timeLeft: T.ELIM_LINE };
    GameGlobal.SoundManager.play('elim');
    // 注：消除不再让 mover 刹车（保持消除节奏流畅）

    // ── 破冰保留的卡：冰裂动画，卡片留在棋盘变普通卡 ──
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

    // ── 消除的卡（冰+冰 消除伴随双冰碎裂）──
    if (elim1) {
      this.grid[card1.r][card1.c] = 0;
      this.cardNodes[card1.r][card1.c] = null;
      this.frozen[card1.r][card1.c] = 0;
      this.singletonSet.delete(card1.r + ',' + card1.c);
      var p1 = this.logicToPixel(card1.r, card1.c);
      card1.state = 'eliminating';
      GameGlobal.Renderer.spawnFirework(p1.x, p1.y);
      if (f1) {
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
        self.frozen[card2.r][card2.c] = 0;
        self.singletonSet.delete(card2.r + ',' + card2.c);
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
      self.moves++;
      // 破冰保留会改变类型奇偶结构 → 按类型全量重算对数与单例（最可靠）
      self.recomputeRemainingPairs();
      self.recomputeSingletons();
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
    var byKey = {};
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        var card = this.cardNodes[r][c];
        if (card && card.state !== 'eliminated') {
          var k = this._pairKey(card);
          byKey[k] = (byKey[k] || 0) + 1;
        }
      }
    }
    var pairs = 0;
    for (var t in byKey) {
      if (byKey.hasOwnProperty(t)) pairs += Math.floor(byKey[t] / 2);
    }
    this.remainingPairs = pairs;
  };

  /**
   * 全量重算并处理"单张"：只有某类型真正只剩 1 张（孤卡，已无配对可能）时，
   * 立即自动消除（冰块融化/孤卡消失，不滞留棋盘）。
   * 奇数 ≥3 张（如破冰保留后的 3 张）仍可配对，交给后续配对自然消完，不清除。
   */
  Game.prototype.recomputeSingletons = function () {
    this.singletonSet.clear();
    var byKey = {};
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        var card = this.cardNodes[r][c];
        if (card && card.state !== 'eliminated') {
          (byKey[this._pairKey(card)] = byKey[this._pairKey(card)] || []).push(card);
        }
      }
    }
    for (var t in byKey) {
      if (!byKey.hasOwnProperty(t)) continue;
      var list = byKey[t];
      if (list.length === 1) {
        // 移动卡关：mover 未消除时保护其唯一同类（partner），不能被单例机制自动消
        if (this.movers.length && this._isMoverType(list[0].type)) {
          continue;
        }
        this.clearSingletonImmediately(list[0]);
      }
    }
  };

  /** 立即自动消除一张单张（缩放消失动画，动画结束再检测一次胜利） */
  Game.prototype.clearSingletonImmediately = function (card) {
    if (card.state === 'eliminated' || card.state === 'eliminating') return;
    var self = this;
    this.grid[card.r][card.c] = 0;
    this.cardNodes[card.r][card.c] = null;
    this.frozen[card.r][card.c] = 0;
    card.state = 'eliminating';
    GameGlobal.SoundManager.play('elim');
    GameGlobal.Tween.to(card.visual, { scale: 0 }, 220, 'easeIn', function () {
      card.state = 'eliminated';
      // 单张可能触发胜利（棋盘清空）或需要重力填充空位
      self.afterEliminate();
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

    // 对角线（往角）重力：卡片只沿对角线朝角落滑落，撞墙也不改走竖直/水平方向
    if (dir === 'downRight' || dir === 'downLeft' || dir === 'upRight' || dir === 'upLeft') {
      return this.applyDiagonalGravity(dir);
    }

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

  /**
   * 对角线（往角落）重力：每张卡只沿对角线朝目标角落滑落，绝不改走竖直/水平方向。
   * 反复塌落直到所有卡都无法再沿对角线靠近角落为止。最终呈现「纯斜向坠落」的效果
   * （卡片沿对角线流向角落，撞墙即停，不再沿墙上下左右滑动）。
   * 支持 4 个对角方向：'downRight'（右下）| 'downLeft'（左下）| 'upRight'（右上）| 'upLeft'（左上）
   * @returns [{card, fr, fc, tr, tc}] 需要动画的移动列表
   */
  Game.prototype.applyDiagonalGravity = function (dir) {
    var moves = [];
    var R = this.rows, C = this.cols;
    var vDown = (dir === 'downRight' || dir === 'downLeft');   // 竖直朝「下」还是「上」
    var hRight = (dir === 'downRight' || dir === 'upRight');  // 水平朝「右」还是「左」

    // start：每张卡起点（不被模拟改动）；cur：模拟过程中当前位置
    var start = new Map();
    var cur = new Map();
    for (var r = 1; r <= R; r++) {
      for (var c = 1; c <= C; c++) {
        var cd = this.cardNodes[r][c];
        if (cd) { start.set(cd, { r: r, c: c }); cur.set(cd, { r: r, c: c }); }
      }
    }
    // 占位网格（存卡片引用）
    var pos = [];
    for (var r2 = 0; r2 <= R + 1; r2++) { pos[r2] = []; for (var c2 = 0; c2 <= C + 1; c2++) pos[r2][c2] = null; }
    cur.forEach(function (p, card) { pos[p.r][p.c] = card; });

    // 给定当前格，返回该卡朝角落能前进到的下一格；不能前进则返回 null
    function nextCell(r, c) {
      var nr = vDown ? r + 1 : r - 1;
      var nc = hRight ? c + 1 : c - 1;
      // 仅沿对角线朝角落滑落；撞到墙也不改走竖直/水平方向，保持「纯斜向坠落」
      if (nr >= 1 && nr <= R && nc >= 1 && nc <= C && !pos[nr][nc]) return { r: nr, c: nc };
      return null;
    }

    // 反复塌落直到稳定（从角落往外扫描，让靠角落的卡先就位）
    var changed = true, guard = 0;
    var rStart = vDown ? R : 1, rEnd = vDown ? 1 : R, rStep = vDown ? -1 : 1;
    var cStart = hRight ? C : 1, cEnd = hRight ? 1 : C, cStep = hRight ? -1 : 1;
    while (changed && guard < R * C * 4 + 16) {
      changed = false; guard++;
      for (var r = rStart; vDown ? r >= rEnd : r <= rEnd; r += rStep) {
        for (var c = cStart; hRight ? c >= cEnd : c <= cEnd; c += cStep) {
          var card = pos[r][c];
          if (!card) continue;
          var nx = nextCell(r, c);
          if (nx) {
            pos[r][c] = null;
            pos[nx.r][nx.c] = card;
            var p = cur.get(card);
            p.r = nx.r; p.c = nx.c;
            changed = true;
          }
        }
      }
    }

    // 生成 moves 并重建正式结构（grid / cardNodes / frozen / singleton）
    var oldFrozen = this.frozen;
    var oldSingleton = this.singletonSet;
    var newGrid = [], newCardNodes = [], newFrozen = [], newSingleton = new Set();
    for (var rr = 0; rr <= R + 1; rr++) {
      newGrid[rr] = []; newCardNodes[rr] = []; newFrozen[rr] = [];
      for (var cc = 0; cc <= C + 1; cc++) { newGrid[rr][cc] = 0; newCardNodes[rr][cc] = null; newFrozen[rr][cc] = 0; }
    }
    cur.forEach(function (p, card) {
      var r = p.r, c = p.c;
      var s = start.get(card);
      if (s.r !== r || s.c !== c) moves.push({ card: card, fr: s.r, fc: s.c, tr: r, tc: c });
      if (oldSingleton.has(s.r + ',' + s.c)) newSingleton.add(r + ',' + c);
      newFrozen[r][c] = oldFrozen[s.r][s.c];
      newGrid[r][c] = card.type;
      newCardNodes[r][c] = card;
      card.r = r; card.c = c;
      var px = this.logicToPixel(r, c);
      card.baseX = px.x; card.baseY = px.y;
    }, this);

    this.grid = newGrid;
    this.cardNodes = newCardNodes;
    this.frozen = newFrozen;
    this.singletonSet = newSingleton;
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
    GameGlobal.SoundManager.play('slide');
    var maxDist = 0;
    for (var i = 0; i < moves.length; i++) {
      var m = moves[i];
      maxDist = Math.max(maxDist, Math.abs(m.tr - m.fr) + Math.abs(m.tc - m.fc));
    }
    var duration = maxDist * T.GRAVITY_PER_CELL;
    var g = this.cfg.gravity;
    // 含「下 / 上」的方向（含对角线）用下落缓动，纯左右移动用平滑缓动
    var ease = (g && (g.indexOf('down') === 0 || g.indexOf('up') === 0)) ? 'easeIn' : 'easeInOut';

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

  /** 时间静止：让所有未消除移动卡停止运动 5 秒（包括正在滑出的，可救回）；消耗 1 次 */
  Game.prototype.useFreeze = function () {
    if (this.isProcessing) return;
    if (!this.movers || !this.movers.length) {
      GameGlobal.Main.showToast('当前关卡没有移动卡');
      return;
    }
    if (!GameGlobal.Storage.useTool('freeze')) {
      GameGlobal.Main.showToast('时间静止次数不足，去商店购买吧');
      return;
    }
    var MS = 5000;
    for (var i = 0; i < this.movers.length; i++) {
      var mv = this.movers[i];
      if (mv.eliminated || mv.state === 'eliminating' || mv.state === 'eliminated') continue;
      mv.freezeLeft = MS;
    }
    GameGlobal.SoundManager.play('select');
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
        if (card && card.state !== 'eliminated') {
          // 移动卡关：partner（mover 唯一同类）固定不参与洗牌，保证 mover 始终可配对
          if (this.movers.length && this._isMoverType(card.type)) continue;
          cards.push(card);
        }
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
    GameGlobal.SoundManager.play('sweep');
    // 打乱后卡片类型全部重排，离屏缓存失效重建
    if (GameGlobal.Renderer && GameGlobal.Renderer.invalidateBoardCache) GameGlobal.Renderer.invalidateBoardCache();
  };

  // ══════════════════════════════════════════════
  //  💡 提示
  // ══════════════════════════════════════════════

  /** 找第一对可连接的配对（冰块可配普卡/冰卡，按类型分组即可），画蓝色连线并闪烁（消耗 1 次提示） */
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
        if (card && card.state !== 'eliminated') cards.push(card);
      }
    }

    // 移动卡关：优先提示 mover 与同类的通路，避免玩家忘了处理它
    if (this.movers.length) {
      for (var mi = 0; mi < this.movers.length; mi++) {
        var mv = this.movers[mi];
        if (mv.eliminated || mv.state === 'eliminating' || mv.state === 'eliminated') continue;
        for (var mj = 0; mj < cards.length; mj++) {
          if (cards[mj].type === mv.type) {
            var mpath = this.findConnectPath(mv, cards[mj]);
            if (mpath) {
              GameGlobal.SoundManager.play('hint');
              this.showHintLine(mpath, mv, cards[mj]);
              return;
            }
          }
        }
      }
    }

    var byKey = {};
    for (var i = 0; i < cards.length; i++) {
      var cd = cards[i];
      (byKey[this._pairKey(cd)] = byKey[this._pairKey(cd)] || []).push(cd);
    }

    for (var t in byKey) {
      if (!byKey.hasOwnProperty(t)) continue;
      var same = byKey[t];
      if (same.length < 2) continue;
      for (var a = 0; a < same.length; a++) {
        for (var b = a + 1; b < same.length; b++) {
          var cardA = same[a], cardB = same[b];
          var path = this.findConnectPath(cardA, cardB);
          if (path) {
            GameGlobal.SoundManager.play('hint');
            this.showHintLine(path, cardA, cardB);
            return;
          }
        }
      }
    }
    // 实体挡路：当前无直通配对，但无视 mover 墙存在可消配对 → 提示等它移开，不是真死局
    if (this.movers.length && this._findAnyValidMove(false)) {
      GameGlobal.Main.showToast('有配对被移动卡挡住了，等它移开再试');
      return;
    }
    GameGlobal.Main.showToast('没有可消除的配对，试试打乱或炸弹吧');
  };

  Game.prototype.showHintLine = function (path, card1, card2) {
    // 移动卡提示：线头对准 mover 实时位置（card1 为 mover 时替换 path[0]）
    var pts = path;
    if (this._isMover(card1)) pts = this._pathWithMoverPos(path, card1);
    this.connectionLine = { points: pts, color: 'blue', timeLeft: T.HINT_LINE };
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

  /** 是否存在可消除配对。ignoreMoverWall=true 时无视移动卡墙（mover 会动，挡路是暂时的，不算死局）。 */
  Game.prototype._findAnyValidMove = function (ignoreMoverWall) {
    var cards = [];
    for (var r = 1; r <= this.rows; r++) {
      for (var c = 1; c <= this.cols; c++) {
        var card = this.cardNodes[r][c];
        if (card && card.state !== 'eliminated') cards.push(card);
      }
    }
    // 移动卡关：mover 未消除时也算一张可配对卡（检查其与同类的通路）
    for (var mi = 0; mi < this.movers.length; mi++) {
      var mv = this.movers[mi];
      if (!mv.eliminated && mv.state !== 'eliminating' && mv.state !== 'eliminated') {
        cards.push(mv);
      }
    }
    var byKey = {};
    for (var i = 0; i < cards.length; i++) {
      var cd = cards[i];
      (byKey[this._pairKey(cd)] = byKey[this._pairKey(cd)] || []).push(cd);
    }
    for (var t in byKey) {
      if (!byKey.hasOwnProperty(t)) continue;
      var same = byKey[t];
      if (same.length < 2) continue;
      for (var a = 0; a < same.length; a++) {
        for (var b = a + 1; b < same.length; b++) {
          if (this.findConnectPath(same[a], same[b], ignoreMoverWall)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  /** 死局检测：mover 挡路不算死局（它一直在动，迟早让路） */
  Game.prototype.hasValidMove = function () {
    return this._findAnyValidMove(true);
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
    // 移动卡兜底：死局清盘时 mover 一并消失，避免残留浮动卡
    // 移动卡兜底：所有未消除 mover 一并消失，避免残留浮动卡
    for (var mi = 0; mi < this.movers.length; mi++) {
      var mv = this.movers[mi];
      if (!mv.eliminated) {
        mv.eliminated = true;
        mv.state = 'eliminated';
      }
    }
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
    if (toClear.length) GameGlobal.SoundManager.play('elim');

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
    if (toClear.length) GameGlobal.SoundManager.play('elim');

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
    // 移动卡兜底：正常通关前 mover 必须已消除（partner 残留检查拦截），死局清盘场景已在上游处理
    // 移动卡兜底：所有未消除 mover 一并消失，避免残留浮动卡
    for (var mi = 0; mi < this.movers.length; mi++) {
      var mv = this.movers[mi];
      if (!mv.eliminated) {
        mv.eliminated = true;
        mv.state = 'eliminated';
      }
    }
    GameGlobal.SoundManager.play('win');
    GameGlobal.SoundManager.play('coin');
    // 按关卡类别解锁下一关：普通关走 unlockNextLevel，特殊关走 unlockNextSpecial（顺序解锁）
    if (this.cfg && this.cfg._category === 'special') {
      GameGlobal.Storage.unlockNextSpecial(this.levelId);
    } else {
      GameGlobal.Storage.unlockNextLevel(this.levelId);
    }
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
   * 带镜头的新玩法关：先把设计坐标逆变换回棋盘坐标再命中。
   */
  Game.prototype.hitTest = function (x, y) {
    var bp = this.designToBoard(x, y);
    x = bp.x; y = bp.y;
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

  // ══════════════════════════════════════════════
  //  镜头（camera）：新玩法关启用，旧关 cam=null 完全走旧逻辑
  //  设计坐标点 P ↔ 棋盘坐标点 B：
  //    绘制  B → P：P = (B - cam.c) * cam.scale + screenCenter
  //    命中  P → B：B = (P - screenCenter) / cam.scale + cam.c
  // ══════════════════════════════════════════════

  /** 棋盘在屏幕上的展示中心（顶/底栏之间的区域中心，设计坐标） */
  Game.prototype._boardScreenCenter = function () {
    var topBar = GameGlobal.TOP_BAR_H + (GameGlobal.SAFE_TOP || 0);
    var availH = GameGlobal.DESIGN_H - topBar - GameGlobal.BOTTOM_BAR_H;
    return { x: GameGlobal.DESIGN_W / 2, y: topBar + availH / 2 };
  };

  /** 初始化镜头：旧关 cam=null；新玩法关计算包围盒并摆到「全景」位 */
  Game.prototype._initCamera = function () {
    if (!this.useNewEngine) { this.cam = null; this.boardBox = null; return; }
    var m = this.metrics;
    var bw = this.cols * (m.cw + m.gx) - m.gx;
    var bh = this.rows * (m.ch + m.gy) - m.gy;
    this.boardBox = { x: m.ox, y: m.oy, w: bw, h: bh };
    this.cam = { cx: m.ox + bw / 2, cy: m.oy + bh / 2, scale: 1 };
  };

  /** 整盘恰好入屏的缩放（全景用） */
  Game.prototype._fitScale = function () {
    var b = this.boardBox;
    var availW = GameGlobal.DESIGN_W - GameGlobal.GRID_MARGIN_X * 2;
    var topBar = GameGlobal.TOP_BAR_H + (GameGlobal.SAFE_TOP || 0);
    var availH = GameGlobal.DESIGN_H - topBar - GameGlobal.BOTTOM_BAR_H;
    return Math.min(availW / (b.w + 30), availH / (b.h + 30));
  };

  /** 入场镜头：先全景展示整个图案 → 缓动推近到对局视角（可点击跳过） */
  Game.prototype.startIntro = function () {
    if (!this.cam) return;
    var b = this.boardBox;
    var fit = this._fitScale();
    var from = { cx: b.x + b.w / 2, cy: b.y + b.h / 2, scale: fit * 0.92 };
    // 大地图关：推近到接近自然尺寸，聚焦棋盘中心；普通形状关：轻推近到 1.0
    // 大地图放大系数取 4.0：棋盘越大（如 2 倍雄鹰），入场后默认视角也能看清卡片
    var toScale = this.cfg.viewport ? Math.min(1, fit * 4.0) : 1;
    var to = { cx: b.x + b.w / 2, cy: b.y + b.h / 2, scale: toScale };
    this.cam.cx = from.cx; this.cam.cy = from.cy; this.cam.scale = from.scale;
    this._introTarget = to;
    this._introOn = true;
    var self = this;
    GameGlobal.Tween.to(this.cam, { cx: to.cx, cy: to.cy, scale: to.scale }, 1500, 'easeInOut', function () {
      self._introOn = false;
      self._fireIntroDone();
    });
  };

  /** 跳过入场镜头（立即到目标视角） */
  Game.prototype.skipIntro = function () {
    if (!this._introOn) return;
    GameGlobal.Tween.kill(this.cam);
    var t = this._introTarget;
    this.cam.cx = t.cx; this.cam.cy = t.cy; this.cam.scale = t.scale;
    this._introOn = false;
    this._fireIntroDone();
  };

  /** 入场镜头结束（自然播完或被点按跳过）后通知 UI 层，例如延迟弹出玩法说明 */
  Game.prototype._fireIntroDone = function () {
    if (GameGlobal.Main && GameGlobal.Main.onIntroFinished) {
      GameGlobal.Main.onIntroFinished();
    }
  };

  /** 平移镜头（ddx/ddy 为设计坐标位移，内容跟随手指） */
  Game.prototype.panBy = function (ddx, ddy) {
    if (!this.cam || this._introOn || !(this.cfg.viewport || this.cfg.zoomable)) return;
    this.cam.cx -= ddx / this.cam.scale;
    this.cam.cy -= ddy / this.cam.scale;
    this._clampCam();
  };

  /** 以设计坐标点 (dx,dy) 为支点缩放（该点下的棋盘内容保持不动） */
  Game.prototype.zoomAt = function (dx, dy, factor) {
    if (!this.cam || this._introOn || !(this.cfg.viewport || this.cfg.zoomable)) return;
    var sc = this._boardScreenCenter();
    var ns = Math.max(this._fitScale() * 0.9, Math.min(2.2, this.cam.scale * factor));
    var wx = (dx - sc.x) / this.cam.scale + this.cam.cx;
    var wy = (dy - sc.y) / this.cam.scale + this.cam.cy;
    this.cam.scale = ns;
    this.cam.cx = wx - (dx - sc.x) / ns;
    this.cam.cy = wy - (dy - sc.y) / ns;
    this._clampCam();
  };

  /** 镜头钳制：别把棋盘拖/缩丢（留 30% 余量） */
  Game.prototype._clampCam = function () {
    var b = this.boardBox;
    var padX = b.w * 0.3, padY = b.h * 0.3;
    this.cam.cx = Math.max(b.x - padX, Math.min(b.x + b.w + padX, this.cam.cx));
    this.cam.cy = Math.max(b.y - padY, Math.min(b.y + b.h + padY, this.cam.cy));
  };

  /** 设计坐标 → 棋盘坐标（旧关 cam=null 时恒等，行为不变） */
  Game.prototype.designToBoard = function (x, y) {
    if (!this.cam) return { x: x, y: y };
    var sc = this._boardScreenCenter();
    return {
      x: (x - sc.x) / this.cam.scale + this.cam.cx,
      y: (y - sc.y) / this.cam.scale + this.cam.cy,
    };
  };

  /** 剩余对数的可用提示（UI 用） */
  Game.prototype.getRemainingPairs = function () {
    return this.remainingPairs;
  };

  Game.prototype.restart = function () {
    this._won = false;
    this.initLevel();
    this.startIntro(); // 重开也重播入场镜头（新玩法关；旧关 cam=null 自动无操作）
  };

  GameGlobal.Game = Game;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Game;
  }
})();
