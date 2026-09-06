/**
 * test_stack.js —— 层层消消「叠叠乐」单局玩法测试
 *
 * 玩法形态：不做关卡解锁，点「层层消消」入口直接开一局超级叠层（约 227 张 / 7 层）。
 * 轮廓（花苞）固定不变，每局随机：① 各层错落方向 ② 图案在槽位上的分配。
 *
 * 验证核心不变量：
 *   1) 配置：STACK_LEVELS 只有 1 关，形状参数齐全，开放提示/打乱道具
 *   2) 生成：牌数达量级且为偶数、卡片尺寸自适应、整盘落在「HUD 之下 / 道具栏之上」可用区
 *   3) 配对：每种图案偶数张、各图案数量均衡、槽位唯一、覆盖关系与 z 序正确
 *   4) 每局随机：12 局排布互不相同，总张数/底层张数（轮廓）保持一致
 *   5) 通关模拟：贪心求解多局，统计自动洗牌次数（死局率）
 *   6) restart 重排复位、提示/打乱道具可用
 *
 * 运行：node tools/test_stack.js
 */
'use strict';

// ── mock 微信环境（与 test_play.js 同款）─────
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

require('../js/shapes.js');
require('../js/special_levels.js');
require('../js/config.js');
require('../js/storage.js');

// 模拟真机刘海屏（HUD 挂在胶囊按钮下方）
GameGlobal.SAFE_TOP = 48;

var winData = null;
GameGlobal.Main = {
  showWin: function (id, m, e, c) { winData = { id: id, moves: m, elapsed: e, coinsEarned: c }; },
  showToast: function () {},
};
GameGlobal.Tween = { to: function () {}, update: function () {} };

require('../js/stackGame.js');
const StackGame = GameGlobal.StackGame;

let failures = 0, total = 0;
function check(name, cond, extra) {
  total++;
  if (!cond) { failures++; console.log('  ✗ ' + name + (extra ? '  → ' + extra : '')); }
  else { console.log('  ✓ ' + name + (extra ? '  (' + extra + ')' : '')); }
}
function section(t) { console.log('\n[' + t + ']'); }

const LVID = GameGlobal.STACK_LEVELS[0].id;

// ── 1. 配置：单局「点击就玩」 ────────────────────────────────────────
section('1 关卡配置');
check('STACK_LEVELS 只有 1 关（不做一关一关）', GameGlobal.STACK_LEVELS.length === 1,
  GameGlobal.STACK_LEVELS.length + ' 关');
const cfg = GameGlobal.STACK_LEVELS[0];
check('形状参数齐全（花苞/7 层/半径 4/收缩 0.3）',
  cfg.shape === 'flower' && cfg.depth === 7 && cfg.baseR === 4 && cfg.shrink === 0.3);
check('开放提示 + 打乱道具', cfg.hintEnabled === true && cfg.shuffleEnabled === true);
check('getLevelConfig 能取到且标记为 stack', GameGlobal.getLevelConfig(LVID)._category === 'stack');

// ── 2. 生成：张数 / 自适应 / 居中 ────────────────────────────────────
section('2 叠层生成');
const g = new StackGame(LVID);
check('牌数达「超级复杂」量级（>150）', g.tiles.length > 150, g.tiles.length + ' 张');
check('总张数为偶数（保证全部成对可消）', g.tiles.length % 2 === 0);
check('卡片像素尺寸在可视区间 [24,52]', g.cardW >= 24 && g.cardW <= 52, g.cardW + 'px');
check('metrics.cw 与 cardW 一致（drawCard 取 metrics.cw）', g.metrics.cw === g.cardW);

const W = GameGlobal.DESIGN_W, H = GameGlobal.DESIGN_H;
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
g.tiles.forEach(function (t) {
  minX = Math.min(minX, t.visual.x - g.cardW / 2); maxX = Math.max(maxX, t.visual.x + g.cardW / 2);
  minY = Math.min(minY, t.visual.y - g.cardW / 2); maxY = Math.max(maxY, t.visual.y + g.cardW / 2);
});
const topLimit = GameGlobal.SAFE_TOP + 96, bottomLimit = H - 132;
check('棋盘横向不出血', minX >= 0 && maxX <= W, 'x ' + minX.toFixed(1) + '~' + maxX.toFixed(1));
check('棋盘顶部不压 HUD（≥' + topLimit + '）', minY >= topLimit - 1, 'top=' + minY.toFixed(1));
check('棋盘底部不压道具栏（≤' + bottomLimit + '）', maxY <= bottomLimit + 1, 'bottom=' + maxY.toFixed(1));

const layerCount = {};
g.tiles.forEach(function (t) { layerCount[t.layer] = (layerCount[t.layer] || 0) + 1; });
check('实际占用 ' + cfg.depth + ' 层', Object.keys(layerCount).length === cfg.depth,
  JSON.stringify(layerCount));

// ── 3. 配对与覆盖不变量 ──────────────────────────────────────────────
section('3 配对与覆盖');
const cnt = {};
g.tiles.forEach(function (t) { cnt[t.type] = (cnt[t.type] || 0) + 1; });
let evenOK = true, mx = 0, mn = Infinity;
Object.keys(cnt).forEach(function (k) {
  if (cnt[k] % 2 !== 0) evenOK = false;
  mx = Math.max(mx, cnt[k]); mn = Math.min(mn, cnt[k]);
});
check('每种图案偶数张', evenOK, JSON.stringify(cnt));
check('各图案数量均衡（极差 ≤ 2）', mx - mn <= 2, '极差 ' + (mx - mn));
check('用到 12 种图案', Object.keys(cnt).length === 12, Object.keys(cnt).length + ' 种');

const dup = {}, uniqueOK = g.tiles.every(function (t) {
  const key = t.cx + ',' + t.cy + ',' + t.layer;
  if (dup[key]) return false; dup[key] = true; return true;
});
check('槽位唯一（无同格同层叠死）', uniqueOK);

let okCov = true;
for (let i = 0; i < g.tiles.length && okCov; i++) {
  const t = g.tiles[i];
  let expect = false;
  for (let j = 0; j < g.tiles.length; j++) {
    const u = g.tiles[j];
    if (u === t || u.state === 'eliminated') continue;
    if (u.layer > t.layer && Math.abs(u.cx - t.cx) < 1 && Math.abs(u.cy - t.cy) < 1) { expect = true; break; }
  }
  if (t.covered !== expect) okCov = false;
}
check('覆盖关系正确（更高层且矩形重叠）', okCov);

// z 序：点任意未覆盖牌中心，必须命中该点最高的那张（与绘制 layer 升序一致）
let zOK = true, hitSelfOK = 0, hitSelfAll = 0;
g.tiles.filter(function (t) { return !t.covered; }).forEach(function (t) {
  const h = g.hitTest(t.visual.x, t.visual.y);
  hitSelfAll++; if (h === t) hitSelfOK++;
  if (!h) { zOK = false; return; }
  const cellX = (t.visual.x - g.metrics.originX) / g.cardW;
  const cellY = (t.visual.y - g.metrics.originY) / g.cardW;
  let maxL = -1;
  g.tiles.forEach(function (u) {
    if (u.state === 'eliminated' || u.covered) return;
    if (Math.abs(cellX - u.cx) <= 0.5 && Math.abs(cellY - u.cy) <= 0.5 && u.layer > maxL) maxL = u.layer;
  });
  if (h.layer !== maxL) zOK = false;
});
check('点击命中最高层（z 序一致）', zOK);
check('顶层牌点自己中心可命中', hitSelfOK === hitSelfAll, hitSelfOK + '/' + hitSelfAll);
check('棋盘外点击返回 null', g.hitTest(-999, -999) === null);

// ── 4. 每局随机性 ────────────────────────────────────────────────────
section('4 每局随机性');
const sigs = new Set(), dirs = new Set(), shapes = new Set();
for (let i = 0; i < 12; i++) {
  const s = new StackGame(LVID);
  dirs.add(JSON.stringify(s._shiftDir));
  sigs.add(s.tiles.map(function (t) { return t.type + '@' + t.cx + ',' + t.cy; }).join('|'));
  shapes.add(s.tiles.length + '/' + s.tiles.filter(function (t) { return t.layer === 1; }).length);
}
check('错落方向每局随机（4 条对角线轮换）', dirs.size >= 2, dirs.size + ' 种方向');
check('12 局排布互不相同（图案分配随机）', sigs.size === 12, sigs.size + '/12');
check('轮廓不变（总张数/底层张数每局一致）', shapes.size === 1, [...shapes].join(' '));

// ── 5. 通关模拟（死局率） ────────────────────────────────────────────
section('5 通关模拟');
function autoPlay() {
  const gg = new StackGame(LVID);
  let shuffles = 0, steps = 0, guard = 0, stuck = false;
  while (true) {
    if (++guard > 5000) break;
    const act = gg.tiles.filter(function (t) { return t.state !== 'eliminated'; });
    if (act.length === 0) break;
    const by = {};
    act.filter(function (t) { return !t.covered; }).forEach(function (t) {
      (by[t.type] = by[t.type] || []).push(t);
    });
    let pair = null;
    Object.keys(by).forEach(function (k) {
      if (!pair && by[k].length >= 2) pair = [by[k][0], by[k][1]];
    });
    if (!pair) {
      shuffles++;
      if (shuffles > 30) { stuck = true; break; }
      gg._reshuffleRemaining();
      if (!gg._hasTopPair()) { stuck = true; break; }
      continue;
    }
    gg._eliminate(pair[0], pair[1]);
    steps++;
  }
  return {
    shuffles: shuffles, steps: steps, stuck: stuck,
    left: gg.tiles.filter(function (t) { return t.state !== 'eliminated'; }).length,
    total: gg.tiles.length,
  };
}
const ROUNDS = 5;
let worstShuffle = 0, clearAllOK = true, stuckAny = false;
for (let i = 0; i < ROUNDS; i++) {
  const r = autoPlay();
  worstShuffle = Math.max(worstShuffle, r.shuffles);
  if (r.left !== 0 || r.stuck) clearAllOK = false;
  if (r.stuck) stuckAny = true;
  console.log('    · 局' + (i + 1) + '：' + r.total + ' 张 / ' + r.steps + ' 步消完，剩余 ' +
    r.left + '，自动洗牌 ' + r.shuffles + ' 次');
}
check(ROUNDS + ' 局全部能消干净（无卡死）', clearAllOK && !stuckAny);
check('单局自动洗牌 ≤ 3 次（邻层配对策略生效）', worstShuffle <= 3, '最差 ' + worstShuffle + ' 次');
check('胜利会触发 showWin（含金币奖励）', !!winData && winData.id === LVID);

// ── 6. restart 重排 ──────────────────────────────────────────────────
section('6 restart 重开一局');
const g3 = new StackGame(LVID);
const first = g3.tiles[0];
const mate = g3.tiles.filter(function (t) { return t !== first && t.type === first.type; })[0];
g3._eliminate(first, mate);
g3.moves = 5;
const beforeSig = g3.tiles.map(function (t) { return t.type + '@' + t.cx + ',' + t.cy; }).join('|');
g3.restart();
const afterSig = g3.tiles.map(function (t) { return t.type + '@' + t.cx + ',' + t.cy; }).join('|');
check('restart 后所有牌复位为 normal', g3.tiles.every(function (t) { return t.state === 'normal'; }));
check('restart 后步数清零', g3.moves === 0);
check('restart 后牌全部回来', g3.tiles.filter(function (t) { return t.state !== 'eliminated'; }).length === g3.tiles.length);
check('restart 后重新随机排布', beforeSig !== afterSig);
check('restart 后开局必有一步可走', g3._hasTopPair());

// ── 7. 道具：提示 / 打乱 ─────────────────────────────────────────────
section('7 道具');
const g4 = new StackGame(LVID);
GameGlobal.Storage.addTool('hint', 1);
g4.showHint();
check('提示画一条蓝线', !!g4.connectionLine && g4.connectionLine.color === 'blue');
check('提示高亮两张牌', g4.tiles.filter(function (t) { return t.state === 'hintFlash'; }).length === 2);
GameGlobal.Storage.addTool('shuffle', 1);
const sigBefore = g4.tiles.map(function (t) { return t.type; }).join(',');
g4.shuffleCards();
const sigAfter = g4.tiles.map(function (t) { return t.type; }).join(',');
check('打乱后图案分配变化', sigBefore !== sigAfter);
check('打乱后仍保证有一步可走', g4._hasTopPair());

console.log('\n' + (failures === 0 ? '✅ 全部通过' : '❌ 失败 ' + failures + ' 项') +
  '（共 ' + total + ' 项断言）');
process.exit(failures === 0 ? 0 : 1);
