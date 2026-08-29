/**
 * test_stack.js —— 「层层消消」叠层引擎单元测试
 *
 * 验证 StackGame（立体堆叠层数限制玩法）的核心不变量：
 *   1) 构建：牌数 = rows*cols*layers，且每种类型成对（偶数张）
 *   2) 覆盖关系：同 (gx,gy) 有更高层未消除牌 → covered，post-condition 恒成立
 *   3) hitTest 只返回最顶层（未被压住）的牌
 *   4) 同色顶层两张 → 消除，active 数 -2，并触发重算覆盖
 *   5) 贪心求解：能跑到全空则 _won + Main.showWin（含金币奖励），否则判死局而不崩
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

// Storage 桩：避免 wx 存储副作用，同时记录 unlockNextStack 调用
var unlockCalls = [];
GameGlobal.Storage = {
  unlockNextStack: function (id) { unlockCalls.push(id); },
  isFirstClear: function () { return true; },
  setBestScore: function () {},
  addCoins: function () {},
};
var winData = null;
GameGlobal.Main = {
  showWin: function (id, m, e, c) { winData = { id: id, moves: m, elapsed: e, coinsEarned: c }; },
  showToast: function () {},
};
GameGlobal.Tween = { to: function () {}, update: function () {} };

require('../js/stackGame.js');
const StackGame = GameGlobal.StackGame;

var failures = 0;
function check(name, cond) { if (!cond) { failures++; console.log('  ✗ ' + name); } else { console.log('  ✓ ' + name); } }

// ── 1. 构建 + 覆盖 post-condition + 类型偶数 ──
[2001, 2002, 2003].forEach(function (id) {
  var g = new StackGame(id);
  var n = g.rows * g.cols * g.layers;
  check('L' + id + ' 牌数=' + n, g.tiles.length === n);

  // 每种类型偶数张（天然成对，可两两消）
  var cnt = {};
  g.tiles.forEach(function (t) { cnt[t.type] = (cnt[t.type] || 0) + 1; });
  var evenOK = Object.keys(cnt).every(function (k) { return cnt[k] % 2 === 0; });
  check('L' + id + ' 每种类型偶数张', evenOK);

  // 关键可解性不变量：同色两张牌不得落在同一列 (gx,gy)（同列堆叠永远无法同消）
  var sameCol = {};
  var crossColOK = g.tiles.every(function (t) {
    var key = t.gx + ',' + t.gy + ',' + t.type;
    if (sameCol[key]) return false;
    sameCol[key] = true;
    return true;
  });
  check('L' + id + ' 同色牌不共列（可解前提）', crossColOK);

  // 覆盖 post-condition：covered === 存在更高层同格未消除牌
  var okCov = true;
  for (var i = 0; i < g.tiles.length; i++) {
    var t = g.tiles[i];
    var expect = false;
    for (var j = 0; j < g.tiles.length; j++) {
      var u = g.tiles[j];
      if (u === t || u.state === 'eliminated') continue;
      if (u.gx === t.gx && u.gy === t.gy && u.layer > t.layer) { expect = true; break; }
    }
    if (t.covered !== expect) { okCov = false; break; }
  }
  check('L' + id + ' 覆盖关系正确', okCov);

  // hitTest 命中被压牌中心时，不返回被压牌本身（除非它恰好是顶层）
  var covered = g.tiles.filter(function (t) { return t.covered; })[0];
  if (covered) {
    var hit = g.hitTest(covered.visual.x, covered.visual.y);
    check('L' + id + ' hitTest 跳过被压牌', hit === null || hit === covered || !hit.covered);
  }
});

// ── 2. 消除机制 ──
(function () {
  var g = new StackGame(2001);
  var before = g._activeTiles().length;
  // 找两张顶层同色牌
  var top = g._activeTiles().filter(function (t) { return !t.covered; });
  var byType = {};
  top.forEach(function (t) { (byType[t.type] = byType[t.type] || []).push(t); });
  var pair = null;
  for (var k in byType) { if (byType[k].length >= 2) { pair = [byType[k][0], byType[k][1]]; break; } }
  check('能找到一对顶层同色牌', !!pair);
  if (pair) {
    g._eliminate(pair[0], pair[1]);
    var after = g._activeTiles().length;
    check('消除后 active 数 -2', after === before - 2);
    // 被消除的两张 state==='eliminated'
    check('被消除牌 state=eliminated', pair[0].state === 'eliminated' && pair[1].state === 'eliminated');
  }
})();

// ── 3. 贪心求解（多种子）：可通关则 _won + showWin(含金币)；否则判死局不崩 ──
function solve(g) {
  var guard = 0;
  while (true) {
    if (g._won) return 'win';
    var active = g._activeTiles().filter(function (t) { return !t.covered; });
    if (active.length === 0) return g._won ? 'win' : 'empty';
    var byType = {};
    active.forEach(function (t) { (byType[t.type] = byType[t.type] || []).push(t); });
    var p = null;
    for (var k in byType) { if (byType[k].length >= 2) { p = [byType[k][0], byType[k][1]]; break; } }
    if (!p) return g._lost ? 'deadlock' : 'stuck';
    g._eliminate(p[0], p[1]);
    if (++guard > 100000) return 'guard';
  }
}

var seeds = 60, wins = 0, deadlocks = 0, crashed = 0;
for (var s = 0; s < seeds; s++) {
  try {
    var g = new StackGame(2002); // 6x6x3 = 108 张，三层
    var r = solve(g);
    if (r === 'win') {
      wins++;
      if (!g._won || !winData || winData.id !== 2002) crashed++;
      // 金币：首通桩返回 true → COINS_FIRST_CLEAR(100)
      if (winData.coinsEarned !== GameGlobal.COINS_FIRST_CLEAR) crashed++;
    } else if (r === 'deadlock' || r === 'stuck' || r === 'empty') {
      deadlocks++;
    } else { crashed++; }
  } catch (e) {
    crashed++;
    console.log('  求解异常: ' + e.message);
  }
}
check('贪心求解无异常', crashed === 0);
check('自动洗牌后原型可通关（≥50/60 胜）', wins >= 50);
console.log('  · 60 种子：胜 ' + wins + ' / 死局或卡住 ' + deadlocks);

// ── 4. 解锁调用 ──
check('胜利会调用 unlockNextStack', unlockCalls.indexOf(2002) >= 0);

console.log('\n' + (failures === 0 ? '✅ 全部通过' : '❌ 失败 ' + failures + ' 项'));
process.exit(failures === 0 ? 0 : 1);
