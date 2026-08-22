/**
 * pathChecker.js —— 连连看连线判定核心算法
 * 从 Cocos 版 PathChecker.ts 100% 移植，ROWS/COLS 改为函数参数（每关不同）。
 *
 * 规则：
 *   1. 两个相同水果
 *   2. 连线路径不能穿过其他方块（空位和网格外围 0/ROWS+1/COLS+1 可以走）
 *   3. 拐角 ≤ 2 个（0 直线 / 1 L形 / 2 Z·U 形）
 *   4. 优先走最近路线（scanOrder 从两点中间向外扫描）
 */
(function () {
  'use strict';

  var PathChecker = {};

  /**
   * 检查两个水果能否被消除
   * @param grid number[][] 逻辑网格（0=空）
   * @param rows 行数
   * @param cols 列数
   * @returns 拐点数组（含起点终点）| null
   */
  PathChecker.canConnect = function (grid, rows, cols, r1, c1, r2, c2) {
    if (r1 === r2 && c1 === c2) return null;
    if (grid[r1][c1] === 0 || grid[r1][c1] !== grid[r2][c2]) return null;
    return PathChecker._tryStraight(grid, rows, cols, r1, c1, r2, c2)
      || PathChecker._tryOneTurn(grid, rows, cols, r1, c1, r2, c2)
      || PathChecker._tryTwoTurns(grid, rows, cols, r1, c1, r2, c2);
  };

  // ─── 0 转弯：直线 ──────────────────────────

  PathChecker._tryStraight = function (grid, rows, cols, r1, c1, r2, c2) {
    if (r1 === r2 && PathChecker._horizontalClear(grid, rows, cols, r1, c1, c2)) {
      return [{ r: r1, c: c1 }, { r: r2, c: c2 }];
    }
    if (c1 === c2 && PathChecker._verticalClear(grid, rows, cols, c1, r1, r2)) {
      return [{ r: r1, c: c1 }, { r: r2, c: c2 }];
    }
    return null;
  };

  // ─── 1 转弯：L 形 ──────────────────────────

  PathChecker._tryOneTurn = function (grid, rows, cols, r1, c1, r2, c2) {
    // 拐角 (r1, c2)：先横后竖
    if (PathChecker._passable(grid, rows, cols, r1, c2, r1, c1, r2, c2) &&
      PathChecker._horizontalClear(grid, rows, cols, r1, c1, c2) &&
      PathChecker._verticalClear(grid, rows, cols, c2, r1, r2)) {
      return [{ r: r1, c: c1 }, { r: r1, c: c2 }, { r: r2, c: c2 }];
    }
    // 拐角 (r2, c1)：先竖后横
    if (PathChecker._passable(grid, rows, cols, r2, c1, r1, c1, r2, c2) &&
      PathChecker._verticalClear(grid, rows, cols, c1, r1, r2) &&
      PathChecker._horizontalClear(grid, rows, cols, r2, c1, c2)) {
      return [{ r: r1, c: c1 }, { r: r2, c: c1 }, { r: r2, c: c2 }];
    }
    return null;
  };

  // ─── 2 转弯：Z / U 形 ──────────────────────

  PathChecker._tryTwoTurns = function (grid, rows, cols, r1, c1, r2, c2) {
    // 扫描行：拐点在 (r, c1) 和 (r, c2)，从中间向外扫保证最短
    var rowOrder = PathChecker._scanOrder(r1, r2, rows);
    for (var i = 0; i < rowOrder.length; i++) {
      var r = rowOrder[i];
      if (PathChecker._passable(grid, rows, cols, r, c1, r1, c1, r2, c2) &&
        PathChecker._passable(grid, rows, cols, r, c2, r1, c1, r2, c2) &&
        PathChecker._verticalClear(grid, rows, cols, c1, Math.min(r1, r), Math.max(r1, r)) &&
        PathChecker._horizontalClear(grid, rows, cols, r, c1, c2) &&
        PathChecker._verticalClear(grid, rows, cols, c2, Math.min(r, r2), Math.max(r, r2))) {
        return [
          { r: r1, c: c1 },
          { r: r, c: c1 },
          { r: r, c: c2 },
          { r: r2, c: c2 }
        ];
      }
    }

    // 扫描列：拐点在 (r1, c) 和 (r2, c)
    var colOrder = PathChecker._scanOrder(c1, c2, cols);
    for (var j = 0; j < colOrder.length; j++) {
      var c = colOrder[j];
      if (PathChecker._passable(grid, rows, cols, r1, c, r1, c1, r2, c2) &&
        PathChecker._passable(grid, rows, cols, r2, c, r1, c1, r2, c2) &&
        PathChecker._horizontalClear(grid, rows, cols, r1, Math.min(c1, c), Math.max(c1, c)) &&
        PathChecker._verticalClear(grid, rows, cols, c, r1, r2) &&
        PathChecker._horizontalClear(grid, rows, cols, r2, Math.min(c, c2), Math.max(c, c2))) {
        return [
          { r: r1, c: c1 },
          { r: r1, c: c },
          { r: r2, c: c },
          { r: r2, c: c2 }
        ];
      }
    }

    return null;
  };

  /** 扫描顺序：从两点之间向外（先内部保证最短，再向外到 0 和 max+1） */
  PathChecker._scanOrder = function (a, b, max) {
    var result = [];
    var lo = Math.min(a, b);
    var hi = Math.max(a, b);

    for (var i = lo; i <= hi; i++) {
      if (i >= 0 && i <= max + 1) result.push(i);
    }
    for (var i = lo - 1; i >= 0; i--) result.push(i);
    for (var i = hi + 1; i <= max + 1; i++) result.push(i);
    return result;
  };

  // ─── 工具方法 ───────────────────────────────

  /** 水平方向 (row, minC..maxC) 之间是否畅通 */
  PathChecker._horizontalClear = function (grid, rows, cols, row, c1, c2) {
    for (var c = Math.min(c1, c2) + 1; c < Math.max(c1, c2); c++) {
      if (!PathChecker._isEmpty(grid, rows, cols, row, c)) return false;
    }
    return true;
  };

  /** 垂直方向 (col, minR..maxR) 之间是否畅通 */
  PathChecker._verticalClear = function (grid, rows, cols, col, r1, r2) {
    for (var r = Math.min(r1, r2) + 1; r < Math.max(r1, r2); r++) {
      if (!PathChecker._isEmpty(grid, rows, cols, r, col)) return false;
    }
    return true;
  };

  /** 该位置是否为空（不阻挡连线）—— 外围始终空 */
  PathChecker._isEmpty = function (grid, rows, cols, r, c) {
    if (r === 0 || r === rows + 1 || c === 0 || c === cols + 1) return true;
    return grid[r][c] === 0;
  };

  /** 拐角点可通行：空地，或起点/终点本身（即将被消除不算阻挡） */
  PathChecker._passable = function (grid, rows, cols, r, c, r1, c1, r2, c2) {
    if ((r === r1 && c === c1) || (r === r2 && c === c2)) return true;
    return PathChecker._isEmpty(grid, rows, cols, r, c);
  };

  // ══════════════════════════════════════════════════════════
  //  泛化寻路引擎（新玩法关卡专用：多折 / 穿透）
  //  旧关卡仍走上方 canConnect（行为 100% 不变）。
  // ══════════════════════════════════════════════════════════

  /** 极简二叉堆（按 cost 小顶堆） */
  function _Heap() { this.a = []; }
  _Heap.prototype.push = function (n) {
    var a = this.a; a.push(n); var i = a.length - 1;
    while (i > 0) {
      var p = (i - 1) >> 1;
      if (a[p].cost <= a[i].cost) break;
      var t = a[p]; a[p] = a[i]; a[i] = t; i = p;
    }
  };
  _Heap.prototype.pop = function () {
    var a = this.a; var top = a[0]; var last = a.pop();
    if (a.length) {
      a[0] = last; var i = 0;
      for (;;) {
        var l = i * 2 + 1, rr = l + 1, m = i;
        if (l < a.length && a[l].cost < a[m].cost) m = l;
        if (rr < a.length && a[rr].cost < a[m].cost) m = rr;
        if (m === i) break;
        var t = a[m]; a[m] = a[i]; a[i] = t; i = m;
      }
    }
    return top;
  };

  /** 把逐格路径压缩成拐点数组（含起点终点），供连线绘制 */
  PathChecker._compressPath = function (path) {
    if (path.length <= 2) return path;
    var out = [path[0]];
    for (var i = 1; i < path.length - 1; i++) {
      var dr0 = path[i].r - path[i - 1].r, dc0 = path[i].c - path[i - 1].c;
      var dr1 = path[i + 1].r - path[i].r, dc1 = path[i + 1].c - path[i].c;
      if (dr0 !== dr1 || dc0 !== dc1) out.push(path[i]);
    }
    out.push(path[path.length - 1]);
    return out;
  };

  /**
   * 泛化连线判定（Dijkstra：转弯最少优先 → 穿透最少 → 步数最短）
   * @param grid number[][] 逻辑网格（0=空，外围 0/rows+1/cols+1 恒空）
   * @param opts { maxTurns=2, maxPierce=0 }
   *   maxTurns  —— 最大转弯数（默认 2；解锁「多折」后传 3）
   *   maxPierce —— 允许穿过的阻挡数（默认 0；解锁「穿透」后传 1）
   * @returns 拐点数组（含起终点）| null
   */
  PathChecker.findPath = function (grid, rows, cols, r1, c1, r2, c2, opts) {
    opts = opts || {};
    var maxTurns = (opts.maxTurns === undefined) ? 2 : opts.maxTurns;
    var maxPierce = opts.maxPierce || 0;
    if (r1 === r2 && c1 === c2) return null;
    if (grid[r1][c1] === 0 || grid[r1][c1] !== grid[r2][c2]) return null;

    var dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    var W = cols + 2;
    var heap = new _Heap();
    var best = {}; // (r*W+c)*4+dir → cost（已更优则跳过）
    // cost = 转弯*1e6 + 穿透*1e4 + 步数（字典序优先级）
    function costOf(turns, pierce, steps) { return turns * 1000000 + pierce * 10000 + steps; }

    heap.push({ cost: 0, r: r1, c: c1, dir: -1, turns: 0, pierce: 0, path: [{ r: r1, c: c1 }] });

    var guard = (rows + 2) * (cols + 2) * 4 * (maxTurns + 1) * (maxPierce + 1) + 64;
    while (heap.a.length && guard-- > 0) {
      var cur = heap.pop();
      if (cur.r === r2 && cur.c === c2) return PathChecker._compressPath(cur.path);

      for (var d = 0; d < 4; d++) {
        var nr = cur.r + dirs[d][0], nc = cur.c + dirs[d][1];
        if (nr < 0 || nc < 0 || nr > rows + 1 || nc > cols + 1) continue;
        if (nr === r1 && nc === c1) continue; // 不允许回头穿过起点卡
        var nt = cur.turns + ((cur.dir !== -1 && cur.dir !== d) ? 1 : 0);
        if (nt > maxTurns) continue;
        var np = cur.pierce;
        var isTarget = (nr === r2 && nc === c2);
        if (!isTarget && grid[nr][nc] !== 0) {
          if (np < maxPierce) np++; else continue;
        }
        var ncost = costOf(nt, np, cur.path.length);
        var key = (nr * W + nc) * 4 + d;
        if (best[key] !== undefined && best[key] <= ncost) continue;
        best[key] = ncost;
        heap.push({ cost: ncost, r: nr, c: nc, dir: d, turns: nt, pierce: np,
          path: cur.path.concat([{ r: nr, c: nc }]) });
      }
    }
    return null;
  };

  GameGlobal.PathChecker = PathChecker;

  // ─── 自测（Node 环境下可跑）──────────────────
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PathChecker;
  }
})();
