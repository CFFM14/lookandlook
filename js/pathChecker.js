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

  GameGlobal.PathChecker = PathChecker;

  // ─── 自测（Node 环境下可跑）──────────────────
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PathChecker;
  }
})();
