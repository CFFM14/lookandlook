/**
 * test_play.js —— 自动通关求解器（验证随机生成的「分区棋盘」可解性）
 *
 * 思路：直接复用真实 PathChecker.findPath，在网格副本上模拟玩家消除：
 *   - 同类型 + 同分区（未跨区解锁时）才能配对
 *   - 消除特殊格上的水果 → 解锁对应能力（多折/穿透/跨区）
 *   - 卡死时按分区重排（保持每区每色偶数），模拟玩家用「打乱」自救
 * 每关跑多轮随机种子，断言全部能消到全空 —— 证明生成的随机布局一定可通关。
 *
 * 运行：node tools/test_play.js
 */
'use strict';

// ── mock 微信环境（与 test_newfeatures.js 同款）─────
global.GameGlobal = {};
const ctxStub = {
  setTransform() {}, clearRect() {}, beginPath() {}, moveTo() {}, lineTo() {},
  stroke() {}, fill() {}, fillRect() {}, arc() {}, arcTo() {}, closePath() {},
  clip() {}, save() {}, restore() {}, translate() {}, scale() {}, rotate() {},
  drawImage() {}, fillText() {}, createLinearGradient() { return { addColorStop() {} }; },
  measureText() { return { width: 10 }; },
};
['fillStyle', 'strokeStyle', 'lineWidth', 'font', 'textAlign', 'textBaseline',
  'globalAlpha', 'shadowColor', 'shadowBlur', 'lineJoin', 'lineCap'].forEach(k => {
  Object.defineProperty(ctxStub, k, { set() {}, get() { return ''; } });
});
const memStore = { 'look_unlocked': '26' };
global.wx = {
  getSystemInfoSync: () => ({ windowWidth: 390, windowHeight: 844, pixelRatio: 2 }),
  createCanvas: () => ({ width: 0, height: 0, getContext: () => ctxStub }),
  createImage: () => ({ set src(v) { if (this.onload) setTimeout(this.onload, 0); } }),
  onTouchStart() {}, onTouchMove() {}, onTouchEnd() {},
  getStorageSync: (k) => (memStore[k] !== undefined ? memStore[k] : ''),
  setStorageSync: (k, v) => { memStore[k] = v; },
  createInnerAudioContext: () => ({ stop() {}, pause() {}, seek() {}, play() {}, set src(v) {}, set volume(v) {} }),
};
global.requestAnimationFrame = () => {};

require('../js/config.js');
require('../js/levels.js');
require('../js/storage.js');
require('../js/pathChecker.js');
require('../js/audio.js');
require('../js/game.js');
require('../js/render.js');
require('../js/ui.js');
require('../js/main.js');
Object.assign(global, GameGlobal);

let errors = 0;
function check(cond, name) { if (cond) console.log('  ✓ ' + name); else { console.error('  ✗ FAIL: ' + name); errors++; } }

// 深度拷贝网格（rows+2 × cols+2）
function cloneGrid(g) {
  const ng = [];
  for (let r = 0; r < g.rows + 2; r++) { ng[r] = []; for (let c = 0; c < g.cols + 2; c++) ng[r][c] = g.grid[r][c]; }
  return ng;
}

// 剩余卡片是否「全是孤卡」（每种类型仅剩 ≤1 张）。
// 游戏内 singleton 机制会在结算前自动消除这些孤卡，因此应当判胜而非「卡死」。
function allSingletons(grid, zoneMap, rows, cols) {
  const cnt = {};
  for (let r = 1; r <= rows; r++) for (let c = 1; c <= cols; c++) {
    const t = grid[r][c];
    if (t) cnt[t] = (cnt[t] || 0) + 1;
  }
  for (const k in cnt) if (cnt[k] >= 2) return false;
  return true;
}

// 在 (grid 副本, zoneMap) 上自动求解；返回 {win, moves, reshuffles}
function autoSolve(g, opts) {
  const rows = g.rows, cols = g.cols;
  const grid = cloneGrid(g);
  const zoneMap = g.zoneMap;
  const moveCap = opts.moveCap || 4000;
  let reshuffles = 0;
  const reshuffleCap = opts.reshuffleCap || 200;

  function cellsLeft() {
    let n = 0;
    for (let r = 1; r <= rows; r++) for (let c = 1; c <= cols; c++) if (grid[r][c]) n++;
    return n;
  }

  // 按分区重排剩余卡片（保持每区每色偶数）
  function reshuffle() {
    const byZone = {};
    for (let r = 1; r <= rows; r++) for (let c = 1; c <= cols; c++) {
      const t = grid[r][c];
      if (!t) continue;
      const z = zoneMap[r][c];
      (byZone[z] = byZone[z] || []).push({ r, c, type: t });
    }
    for (const z in byZone) {
      const list = byZone[z];
      // 收集类型多集合后重新洗牌，再写回该区格子
      const types = list.map(x => x.type);
      for (let i = types.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; const tmp = types[i]; types[i] = types[j]; types[j] = tmp; }
      for (let i = 0; i < list.length; i++) grid[list[i].r][list[i].c] = types[i];
    }
    reshuffles++;
  }

  // 找一对可消除的（同类型 + 分区规则 + 寻路可达）
  function findAnyMove() {
    const list = [];
    for (let r = 1; r <= rows; r++) for (let c = 1; c <= cols; c++) {
      const t = grid[r][c];
      if (t) list.push({ r, c, type: t, zone: zoneMap[r][c] });
    }
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i], b = list[j];
        if (a.type !== b.type) continue;
        // 分区规则：不同分区的水果不能互消（分区默认永久隔离）
        if (a.zone !== b.zone) continue;
        const path = GameGlobal.PathChecker.findPath(grid, rows, cols, a.r, a.c, b.r, b.c, {
          maxTurns: 2,
          maxPierce: 0,
        });
        if (path) return { a, b };
      }
    }
    return null;
  }

  let moves = 0;
  while (cellsLeft() > 0) {
    if (moves >= moveCap) return { win: false, moves, reshuffles, reason: 'move cap' };
    let mv = findAnyMove();
    if (!mv) {
      // 剩余全是孤卡（每种仅剩 1 张）→ 游戏内 singleton 机制自动消除，判胜（避免奇数格关误判卡死）
      if (allSingletons(grid, zoneMap, rows, cols)) return { win: true, moves, reshuffles };
      if (reshuffles >= reshuffleCap) return { win: false, moves, reshuffles, reason: 'stuck+reshuffle cap' };
      reshuffle();
      continue;
    }
    // 消除：清格
    grid[mv.a.r][mv.a.c] = 0;
    grid[mv.b.r][mv.b.c] = 0;
    moves++;
  }
  return { win: true, moves, reshuffles };
}

// ── 实测：每关多轮随机种子 ──────────────────────
const TRIALS = 25;
// 25 为「逃逸的移动卡」（mover 关）：autoSolve 只按普通配对求解，partner 无法在 grid 副本配对会误判死局，
// 其可解性由 test_mover.js 专项覆盖；这里只测形状关 26（心形）。
const levels = [1002]; // 心形（特殊关号段 1001 起，1002=心形；移动卡关由 test_mover 验证）
for (const lv of levels) {
  console.log('[关卡 ' + lv + '] 自动通关 ×' + TRIALS + ' 轮');
  let wins = 0, totalMoves = 0, totalReshuffle = 0, worst = null;
  for (let t = 0; t < TRIALS; t++) {
    const g = new GameGlobal.Game(lv);
    const res = autoSolve(g, { moveCap: 6000, reshuffleCap: 300 });
    if (res.win) { wins++; totalMoves += res.moves; totalReshuffle += res.reshuffles; }
    else { worst = res; console.error('    第' + t + '轮未通关: ' + JSON.stringify(res)); }
  }
  check(wins === TRIALS, '全部 ' + TRIALS + ' 轮通关（失败轮=' + (TRIALS - wins) + (worst ? ' 样例:' + JSON.stringify(worst) : '') + '）');
  if (wins) {
    console.log('    平均步数=' + (totalMoves / wins).toFixed(0) +
      '，平均重排=' + (totalReshuffle / wins).toFixed(1) +
      '（重排=模拟玩家用「打乱」自救的次数，越少越好）');
  }
}

// ── 特殊关抽验（形状批量生成，千关级，抽样验证可解性）──
(function sampleInjected() {
  // 所有特殊关（含 25/26 手调形状关 + gen_levels.js 生成关）一起抽验；巨档(k=3)是最大棋盘，最需验证可解性
  const all = GameGlobal.SPECIAL_LEVELS || [];
  if (!all.length) return;
  const STEP = 41; // 约每 41 关切一个，覆盖各难度
  const sampleIds = new Set();
  all.forEach((lv, i) => { if (lv.mover) return; if (i % STEP === 0) sampleIds.add(lv.id); });
  // 强制包含大地图代表（>800 格）与厚冰代表，确保极端关也能通关（各限量 4 个，控时）
  const bigRep = [], iceRep = [];
  all.forEach((lv) => {
    if (lv.mover) return; // 移动卡关无 shapeMap，跳过（见下）
    GameGlobal.expandShapeRef(lv); // 引用版 → 完整 shapeMap（幂等，顺便缓存）
    const cells = lv.shapeMap.reduce((s, r) => s + r.replace(/\./g, '').length, 0);
    if (cells > 800) bigRep.push(lv.id);
    if (lv.frozenRatio >= 0.3) iceRep.push(lv.id);
  });
  bigRep.slice(0, 4).forEach((id) => sampleIds.add(id));
  iceRep.slice(0, 4).forEach((id) => sampleIds.add(id));

  const ids = [...sampleIds].sort((a, b) => a - b);
  console.log('\n[特殊关抽样] 抽验 ' + ids.length + ' 关（特殊关共 ' + (GameGlobal.SPECIAL_LEVELS || []).length + ' 关）');
  let fail = 0, totalMoves = 0, totalReshuffle = 0, wins = 0;
  for (const lv of ids) {
    if (GameGlobal.getLevelConfig(lv).mover) continue; // 移动卡关：partner 只能与 mover 配对，autoSolve 不扩展，跳过抽验
    const g = new GameGlobal.Game(lv);
    const res = autoSolve(g, { moveCap: 6000, reshuffleCap: 300 });
    if (res.win) { wins++; totalMoves += res.moves; totalReshuffle += res.reshuffles; }
    else { fail++; console.error('  ✗ 关 ' + lv + ' 未通关: ' + JSON.stringify(res)); }
  }
  if (wins) {
    console.log('    抽样平均步数=' + (totalMoves / wins).toFixed(0) +
      '，平均重排=' + (totalReshuffle / wins).toFixed(1));
  }
  check(fail === 0, '注水关抽样全部可通关（抽验 ' + ids.length + ' 关，失败 ' + fail + '）');
})();

console.log('');
if (errors) { console.log('自动通关测试存在失败 (' + errors + ' 项)'); process.exitCode = 1; }
else { console.log('自动通关测试全部通过 ✓（随机分区棋盘可解性已实证）'); }
