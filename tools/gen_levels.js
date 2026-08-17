/**
 * gen_levels.js —— 固定关卡布局生成器
 *
 * 用法：
 *   node tools/gen_levels.js           生成 js/levels.js（576 关固定布局）
 *   node tools/gen_levels.js --stats   只统计各章节可解率，不写文件
 *
 * 逻辑：
 *   1. 读取 config.js 中的关卡参数（棋盘大小 / 水果种类 / 重力 / 冰冻比例）。
 *   2. 用确定性种子生成「水果类型布局 + 冰冻位置」，完全复刻 game.js 的成对生成与成对冻结规则。
 *   3. 用与游戏完全一致的状态机（连线判定 + 冰冻三态 + 重力压实）搜索一条可通关的消除顺序，
 *      找不到则换下一个种子重试 —— 保证固化下来的每一关都能靠正常配对消完（不触发死局自动清场）。
 *   4. 输出 js/levels.js：每关 { g: 行优先类型数组(1..12), f: 冰冻下标数组 }。
 */
'use strict';

const fs = require('fs');
const path = require('path');

if (!global.GameGlobal) global.GameGlobal = {};
require('../js/config.js');
const PathChecker = require('../js/pathChecker.js');

// ───────────────────────────── 确定性 PRNG ─────────────────────────────

/** mulberry32：小而快的 32 位种子随机数（确定性，跨 Node 版本稳定） */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, rand) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}

// ───────────────────────── 布局生成（复刻 game.js）─────────────────────────

/** 行优先类型数组：成对水果 + Fisher-Yates 洗牌（用种子随机源） */
function genFlatTypes(cfg, rand) {
  const totalCards = cfg.rows * cfg.cols;
  const pairsNeeded = totalCards / 2;
  const types = [];
  const basePairs = Math.floor(pairsNeeded / cfg.fruitTypeCount);
  const remaining = pairsNeeded - basePairs * cfg.fruitTypeCount;

  for (let type = 1; type <= cfg.fruitTypeCount; type++) {
    for (let p = 0; p < basePairs; p++) types.push(type, type);
  }
  for (let i = 0; i < remaining; i++) {
    const t = Math.floor(rand() * cfg.fruitTypeCount) + 1;
    types.push(t, t);
  }
  shuffle(types, rand);
  return types;
}

/** 成对冻结（复刻 game.js applyFrozen）：同类型两两成对，取偶数张 */
function pickFrozen(cfg, flatTypes, rand) {
  const byType = {};
  flatTypes.forEach((t, idx) => {
    (byType[t] = byType[t] || []).push(idx);
  });
  const pairs = [];
  for (const t in byType) {
    const list = byType[t];
    for (let i = 0; i + 1 < list.length; i += 2) pairs.push([list[i], list[i + 1]]);
  }
  shuffle(pairs, rand);

  const total = flatTypes.length;
  let k = Math.floor(total * cfg.frozenRatio);
  k = Math.floor(k / 2) * 2;

  const frozen = [];
  let count = 0;
  for (const pair of pairs) {
    if (count >= k) break;
    frozen.push(pair[0], pair[1]);
    count += 2;
  }
  return frozen;
}

// ───────────────────────── 状态机（复刻 game.js）─────────────────────────

function createState(cfg, flatTypes, frozen) {
  const rows = cfg.rows;
  const cols = cfg.cols;
  const grid = [];
  const frozenGrid = [];
  for (let r = 0; r <= rows + 1; r++) {
    grid[r] = [];
    frozenGrid[r] = [];
    for (let c = 0; c <= cols + 1; c++) {
      grid[r][c] = 0;
      frozenGrid[r][c] = 0;
    }
  }
  const frozenSet = new Set(frozen);
  for (let idx = 0; idx < flatTypes.length; idx++) {
    const r = Math.floor(idx / cols) + 1;
    const c = (idx % cols) + 1;
    grid[r][c] = flatTypes[idx];
    if (frozenSet.has(idx)) frozenGrid[r][c] = 1;
  }
  return { grid, frozen: frozenGrid, rows, cols, gravity: cfg.gravity || null };
}

function countCards(st) {
  let n = 0;
  for (let r = 1; r <= st.rows; r++) {
    for (let c = 1; c <= st.cols; c++) {
      if (st.grid[r][c] !== 0) n++;
    }
  }
  return n;
}

/** 消除一对（复刻 eliminatePair 的账目部分）：普普消 / 普冰破冰保留 / 冰冰双消，随后重力压实 */
function applyMove(st, p1, p2) {
  const f1 = st.frozen[p1.r][p1.c] === 1;
  const f2 = st.frozen[p2.r][p2.c] === 1;
  const keep1 = f1 && !f2;
  const keep2 = f2 && !f1;

  if (!keep1) {
    st.grid[p1.r][p1.c] = 0;
    st.frozen[p1.r][p1.c] = 0;
  } else {
    st.frozen[p1.r][p1.c] = 0; // 破冰保留：只化冰
  }
  if (!keep2) {
    st.grid[p2.r][p2.c] = 0;
    st.frozen[p2.r][p2.c] = 0;
  } else {
    st.frozen[p2.r][p2.c] = 0;
  }
  if (st.gravity) compact(st);
}

/** 重力压实（复刻 game.js applyGravity，frozen 跟随卡片移动） */
function compact(st) {
  const dir = st.gravity;
  const rows = st.rows;
  const cols = st.cols;

  if (dir === 'down' || dir === 'up') {
    for (let c = 1; c <= cols; c++) {
      const stack = [];
      if (dir === 'down') {
        for (let r = rows; r >= 1; r--) if (st.grid[r][c]) stack.push(r);
      } else {
        for (let r = 1; r <= rows; r++) if (st.grid[r][c]) stack.push(r);
      }
      let fill = dir === 'down' ? rows : 1;
      const step = dir === 'down' ? -1 : 1;
      for (const from of stack) {
        if (from !== fill) {
          st.grid[fill][c] = st.grid[from][c];
          st.grid[from][c] = 0;
          st.frozen[fill][c] = st.frozen[from][c];
          st.frozen[from][c] = 0;
        }
        fill += step;
      }
    }
  } else {
    for (let r = 1; r <= rows; r++) {
      const stack = [];
      if (dir === 'left') {
        for (let c = 1; c <= cols; c++) if (st.grid[r][c]) stack.push(c);
      } else {
        for (let c = cols; c >= 1; c--) if (st.grid[r][c]) stack.push(c);
      }
      let fillC = dir === 'left' ? 1 : cols;
      const stepC = dir === 'left' ? 1 : -1;
      for (const from of stack) {
        if (from !== fillC) {
          st.grid[r][fillC] = st.grid[r][from];
          st.grid[r][from] = 0;
          st.frozen[r][fillC] = st.frozen[r][from];
          st.frozen[r][from] = 0;
        }
        fillC += stepC;
      }
    }
  }
}

/** 边界卡：四个邻居中有一个是空的或越界（容易连通的卡） */
function isBoundary(st, r, c) {
  return (
    r - 1 < 1 || st.grid[r - 1][c] === 0 ||
    r + 1 > st.rows || st.grid[r + 1][c] === 0 ||
    c - 1 < 1 || st.grid[r][c - 1] === 0 ||
    c + 1 > st.cols || st.grid[r][c + 1] === 0
  );
}

/** 找出全部可连接的同类型配对，返回 [{p1:{r,c}, p2:{r,c}, phase, boundary}] */
function findPairs(st) {
  const byType = {};
  for (let r = 1; r <= st.rows; r++) {
    for (let c = 1; c <= st.cols; c++) {
      const t = st.grid[r][c];
      if (t !== 0) (byType[t] = byType[t] || []).push({ r, c });
    }
  }
  const pairs = [];
  for (const t in byType) {
    const list = byType[t];
    if (list.length < 2) continue;
    for (let a = 0; a < list.length; a++) {
      for (let b = a + 1; b < list.length; b++) {
        const p1 = list[a];
        const p2 = list[b];
        if (!PathChecker.canConnect(st.grid, st.rows, st.cols, p1.r, p1.c, p2.r, p2.c)) continue;
        const f1 = st.frozen[p1.r][p1.c] === 1;
        const f2 = st.frozen[p2.r][p2.c] === 1;
        // phase：0=冰冰，1=普冰，2=普普（与 test_logic 的策略一致，优先消冰）
        const phase = f1 && f2 ? 0 : (f1 || f2 ? 1 : 2);
        const bd = (isBoundary(st, p1.r, p1.c) ? 1 : 0) + (isBoundary(st, p2.r, p2.c) ? 1 : 0);
        pairs.push({ p1, p2, phase, bd });
      }
    }
  }
  return pairs;
}

function stateKey(st) {
  let s = '';
  for (let r = 1; r <= st.rows; r++) {
    for (let c = 1; c <= st.cols; c++) s += st.grid[r][c] + ',' + st.frozen[r][c] + ';';
  }
  return s;
}

function cloneState(st) {
  const grid = st.grid.map(row => row.slice());
  const frozen = st.frozen.map(row => row.slice());
  return { grid, frozen, rows: st.rows, cols: st.cols, gravity: st.gravity };
}

// ───────────────────────── 求解器 ─────────────────────────

/**
 * 找一个能清空棋盘的消除顺序。
 * 策略：先随机化贪心（偏好边界配对，冰冻关优先冰冰/普冰），多次尝试；
 * 贪心失败后用带记忆的有限 DFS 兜底。
 */
function solveLevel(cfg, flatTypes, frozen, rand, opts) {
  opts = opts || {};
  const hasIce = cfg.frozenRatio > 0;
  const greedyAttempts = opts.greedyAttempts || 40;
  const dfsBudget = opts.dfsBudget || 400000;

  for (let attempt = 0; attempt < greedyAttempts; attempt++) {
    const st = createState(cfg, flatTypes, frozen);
    const moves = [];
    let guard = 0;
    let ok = true;
    while (countCards(st) > 0) {
      if (++guard > 2000) { ok = false; break; }
      const pairs = orderPairs(findPairs(st), hasIce, rand);
      if (!pairs.length) { ok = false; break; }
      const pick = pairs[Math.floor(rand() * Math.min(3, pairs.length))];
      applyMove(st, pick.p1, pick.p2);
      moves.push(pick);
    }
    if (ok && countCards(st) === 0) return moves;
  }

  // DFS 兜底
  const failed = new Set();
  const budget = { nodes: 0 };
  const root = createState(cfg, flatTypes, frozen);

  function dfs(st, depth) {
    if (countCards(st) === 0) return [];
    budget.nodes++;
    if (budget.nodes > dfsBudget) return null;
    const key = stateKey(st);
    if (failed.has(key)) return null;
    const pairs = orderPairs(findPairs(st), hasIce, rand);
    if (!pairs.length) {
      failed.add(key);
      return null;
    }
    const maxBranch = Math.min(5, pairs.length);
    for (let i = 0; i < maxBranch; i++) {
      const next = cloneState(st);
      applyMove(next, pairs[i].p1, pairs[i].p2);
      const res = dfs(next, depth + 1);
      if (res) return [pairs[i], ...res];
    }
    failed.add(key);
    return null;
  }

  return dfs(root, 0);
}

/** 候选排序：先种子洗牌保证随机性，再按 相位(冰优先) → 边界 稳定排序 */
function orderPairs(pairs, hasIce, rand) {
  shuffle(pairs, rand);
  pairs.sort((a, b) => {
    if (hasIce && a.phase !== b.phase) return a.phase - b.phase;
    if (a.bd !== b.bd) return b.bd - a.bd;
    return 0;
  });
  return pairs;
}

// ───────────────────────── 主流程 ─────────────────────────

function main() {
  const statsMode = process.argv.includes('--stats');
  const limitArg = process.argv.indexOf('--limit');
  const limit = limitArg > -1 ? parseInt(process.argv[limitArg + 1], 10) : 0;
  const LEVELS = GameGlobal.LEVELS;
  const layouts = {};
  const total = limit > 0 ? Math.min(limit, LEVELS.length) : LEVELS.length;
  let solved = 0;
  const t0 = Date.now();

  for (let li = 0; li < total; li++) {
    const cfg = LEVELS[li];
    let result = null;
    let seedUsed = null;

    for (let seedTry = 0; seedTry < 400; seedTry++) {
      const seed = cfg.id * 100000 + seedTry;
      const rand = mulberry32(seed);
      const flatTypes = genFlatTypes(cfg, rand);
      const frozen = pickFrozen(cfg, flatTypes, rand);
      result = solveLevel(cfg, flatTypes, frozen, rand);
      if (result) {
        seedUsed = seed;
        layouts[cfg.id] = { g: flatTypes, f: frozen };
        break;
      }
    }

    if (result) {
      solved++;
      process.stdout.write(`第${cfg.id}关 完成 seed=${seedUsed} 卡片=${cfg.rows * cfg.cols} 重力=${cfg.gravity || '无'} 冰=${cfg.frozenRatio}\n`);
    } else {
      process.stdout.write(`第${cfg.id}关 未找到可解布局！（400 个种子均失败）\n`);
    }
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  process.stdout.write(`\n可解率：${solved}/${total}（耗时 ${elapsed}s）\n`);

  if (solved < total) {
    process.exitCode = 1;
    return;
  }
  if (statsMode) return;

  // 输出 js/levels.js
  const outPath = path.join(__dirname, '..', 'js', 'levels.js');
  const lines = [];
  lines.push('/**');
  lines.push(' * levels.js —— 固定关卡数据（由 tools/gen_levels.js 生成，勿手改）');
  lines.push(' * 每关：g = 行优先水果类型数组（1..12），f = 冰冻卡片下标数组（frozenRatio>0 时存在）');
  lines.push(' */');
  lines.push('GameGlobal.LEVEL_LAYOUTS = {');
  const ids = Object.keys(layouts).map(Number).sort((a, b) => a - b);
  for (const id of ids) {
    const l = layouts[id];
    const gStr = l.g.join(',');
    let line = `  ${id}: { g: [${gStr}]`;
    if (l.f && l.f.length) line += `, f: [${l.f.join(',')}]`;
    line += ' },';
    lines.push(line);
  }
  lines.push('};');
  lines.push('');
  lines.push("if (typeof module !== 'undefined' && module.exports) { module.exports = GameGlobal.LEVEL_LAYOUTS; }");
  fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');
  const bytes = fs.statSync(outPath).size;
  process.stdout.write(`已写入 ${outPath}（${(bytes / 1024).toFixed(1)} KB）\n`);
}

if (require.main === module) {
  main();
}

module.exports = {
  mulberry32,
  shuffle,
  genFlatTypes,
  pickFrozen,
  createState,
  applyMove,
  compact,
  findPairs,
  isBoundary,
  orderPairs,
  solveLevel,
  main,
};
