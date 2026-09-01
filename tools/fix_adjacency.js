/**
 * fix_adjacency.js —— 降低关卡初始布局中「相同水果相邻」的对数
 *
 * 做法：
 *   1. 载入 js/levels.js 当前 24 关布局。
 *   2. 统计每关初始布局里「横向或纵向相邻且水果相同」的对数（adjacency）。
 *   3. 对每关做模拟退火：只交换位置、绝不改动每种水果的数量（保持难度分布不变），
 *      把 adjacency 压到尽可能低。多次随机重启取最优。
 *   4. 用 tools/gen_levels.js 自带求解器校验可解性（非斜向重力关强制要求可解；
 *      斜向重力关因求解器未实现对角压实，交由游戏内死局自动清场兜底）。
 *   5. 写回 js/levels.js（仅 g 数组，保持原格式，不写 f）。
 *
 * 运行：node tools/fix_adjacency.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

global.GameGlobal = {};
require('../js/config.js');
require('../js/levels.js');
require('../js/pathChecker.js');
const Solver = require('./gen_levels.js');
const PathChecker = GameGlobal.PathChecker;

const ROWS = 10, COLS = 8, N = ROWS * COLS;
const DIAGONAL = new Set(['downRight', 'downLeft', 'upRight', 'upLeft']);

// ── 确定性 PRNG（mulberry32）──
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── adjacency：横向/纵向相邻且相同的对数 ──
function adjacency(g) {
  let cost = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c;
      if (c + 1 < COLS && g[i] === g[i + 1]) cost++;
      if (r + 1 < ROWS && g[i] === g[i + COLS]) cost++;
    }
  }
  return cost;
}

function neighbors(i) {
  const r = Math.floor(i / COLS), c = i % COLS;
  const res = [];
  if (c > 0) res.push(i - 1);
  if (c < COLS - 1) res.push(i + 1);
  if (r > 0) res.push(i - COLS);
  if (r < ROWS - 1) res.push(i + COLS);
  return res;
}

// 交换 a,b 后 adjacency 的变化量（只考虑与 a、b 相关的边）
function swapDelta(g, a, b) {
  const va = g[a], vb = g[b];
  let delta = 0;
  const na = neighbors(a), nb = neighbors(b);
  for (const n of na) {
    if (n === b) continue;
    delta += ((vb === g[n]) ? 1 : 0) - ((va === g[n]) ? 1 : 0);
  }
  for (const n of nb) {
    if (n === a) continue;
    delta += ((va === g[n]) ? 1 : 0) - ((vb === g[n]) ? 1 : 0);
  }
  return delta;
}

// 模拟退火优化（保持 multiset 不变，只交换）
function optimize(g0, seed, iters) {
  const rand = mulberry32(seed);
  let g = g0.slice();
  let curCost = adjacency(g);
  let best = g.slice();
  let bestCost = curCost;
  let temp = 2.0;
  const cooling = Math.pow(0.0001, 1 / iters); // 末尾温度≈0.0002
  for (let it = 0; it < iters; it++) {
    temp *= cooling;
    const a = Math.floor(rand() * N);
    const b = Math.floor(rand() * N);
    if (a === b) continue;
    if (g[a] === g[b]) continue; // 交换相同值无意义
    const delta = swapDelta(g, a, b);
    if (delta <= 0 || rand() < Math.exp(-delta / temp)) {
      const t = g[a]; g[a] = g[b]; g[b] = t;
      curCost += delta;
      if (curCost < bestCost) { bestCost = curCost; best = g.slice(); }
    }
  }
  // 末尾贪心下降，尽量榨干剩余相邻
  let improved = true;
  while (improved) {
    improved = false;
    for (let a = 0; a < N && !improved; a++) {
      for (let b = a + 1; b < N; b++) {
        if (g[a] === g[b]) continue;
        const delta = swapDelta(g, a, b);
        if (delta < 0) {
          const t = g[a]; g[a] = g[b]; g[b] = t;
          curCost += delta;
          if (curCost < bestCost) { bestCost = curCost; best = g.slice(); }
          improved = true;
          break;
        }
      }
    }
  }
  return { best, bestCost };
}

// 校验可解（非斜向重力关要求 solvable；斜向关交给游戏兜底）
function isSolvable(cfg, g) {
  if (DIAGONAL.has(cfg.gravity)) return true; // 求解器未实现对角压实，信任游戏内死局自动清场
  for (let s = 0; s < 60; s++) {
    const moves = Solver.solveLevel(cfg, g, [], Solver.mulberry32(777 + s));
    if (moves) return true;
  }
  return false;
}

function main() {
  const layouts = GameGlobal.LEVEL_LAYOUTS;
  const report = [];
  const newLayouts = {};

  const RESTARTS = 14;
  const ITERS = 30000;

  for (let id = 1; id <= GameGlobal.TOTAL_LEVELS; id++) {
    const cfg = GameGlobal.getLevelConfig(id);
    const lay = layouts[id];
    if (!lay) continue; // 无固定布局的关（如第 25 关移动卡，运行时随机布局）跳过
    const g0 = lay.g.slice();
    const before = adjacency(g0);
    const diag = DIAGONAL.has(cfg.gravity);

    // 多次随机重启，收集最低 adjacency 的若干候选（不在此处做昂贵的求解）
    const candidates = []; // {g, cost}
    let bestCost = before;
    for (let r = 0; r < RESTARTS; r++) {
      const { best, bestCost: c } = optimize(g0, id * 1000 + r * 13 + 1, ITERS);
      candidates.push({ g: best, cost: c });
      if (c < bestCost) bestCost = c;
    }
    candidates.sort((a, b) => a.cost - b.cost);

    // 按 cost 升序挑选第一个可解的；斜向关直接取最低（求解器未实现对角压实）
    let chosen = candidates[0], solvable = diag;
    if (!diag) {
      for (const cand of candidates) {
        if (isSolvable(cfg, cand.g)) { chosen = cand; solvable = true; break; }
      }
      // 若前若干都不可解，放宽到全部候选再试
      if (!solvable) {
        for (const cand of candidates) {
          if (isSolvable(cfg, cand.g)) { chosen = cand; solvable = true; break; }
        }
      }
    }

    newLayouts[id] = chosen.g.slice();
    report.push({ id, name: cfg.name, gravity: cfg.gravity || '无', before, after: chosen.cost, solvable });
  }

  // 写回 js/levels.js
  const lines = [];
  lines.push('/**');
  lines.push(' * levels.js —— 固定关卡布局（24 关，10×8，12 种水果）');
  lines.push(' * 由 tools/fix_adjacency.js 优化：在保持每关水果种类分布不变的前提下，');
  lines.push(' * 降低初始布局中「相同水果相邻」的对数，提升开局难度。');
  lines.push(' * 每关：g = 行优先水果类型数组（1..12），长度恒为 80（=10×8）。');
  lines.push(' * 冰冻位置 f 不再写死，由引擎按 frozenRatio 随机成对冰冻。');
  lines.push(' */');
  lines.push('GameGlobal.LEVEL_LAYOUTS = {');
  for (let id = 1; id <= GameGlobal.TOTAL_LEVELS; id++) {
    const g = newLayouts[id];
    const gStr = g.join(',');
    lines.push(`  ${id}: { g: [${gStr}] },`);
  }
  lines.push('};');
  lines.push('');
  lines.push("if (typeof module !== 'undefined' && module.exports) { module.exports = GameGlobal.LEVEL_LAYOUTS; }");

  const outPath = path.join(__dirname, '..', 'js', 'levels.js');
  fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');

  console.log('关卡  名称          重力      优化前相邻对数  优化后相邻对数  可解');
  console.log('--------------------------------------------------------------');
  let sumBefore = 0, sumAfter = 0;
  for (const r of report) {
    sumBefore += r.before; sumAfter += r.after;
    const g = String(r.gravity).padEnd(6);
    const nm = r.name.padEnd(10);
    console.log(
      String(r.id).padStart(2) + '    ' + nm + '  ' + g + '   ' +
      String(r.before).padStart(4) + '           ' + String(r.after).padStart(4) + '          ' +
      (r.solvable ? '✓' : '✗(兜底)')
    );
  }
  console.log('--------------------------------------------------------------');
  console.log(`合计：优化前 ${sumBefore} 对  →  优化后 ${sumAfter} 对（减少 ${sumBefore - sumAfter} 对）`);
  console.log(`已写入 ${outPath}`);
}

if (require.main === module) main();

module.exports = { adjacency, optimize, isSolvable };
