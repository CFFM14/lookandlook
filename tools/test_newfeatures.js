/**
 * test_newfeatures.js —— 新玩法专项测试（形状棋盘 / 分区隔离 / 特殊格 / 镜头）
 * mock wx 环境后加载全部模块，验证第 25/26 关的新机制与旧关回归。
 * 运行：node tools/test_newfeatures.js
 */
'use strict';

// ── mock 微信环境（与 smoke_test.js 同款）─────
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
  createInnerAudioContext: () => ({
    stop() {}, pause() {}, seek() {}, play() {}, set src(v) {}, set volume(v) {},
  }),
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
// 微信小游戏中 GameGlobal 即全局对象；Node 需手动桥接（裸 Main/SoundManager 等才能解析）
Object.assign(global, GameGlobal);

let errors = 0;
function check(cond, name) {
  if (cond) console.log('  ✓ ' + name);
  else { console.error('  ✗ FAIL: ' + name); errors++; }
}

// 统计某关每个分区的格子数
function zoneCounts(g) {
  const cnt = {};
  for (let r = 1; r <= g.rows; r++) for (let c = 1; c <= g.cols; c++) {
    if (g.shape[r][c]) { const z = g.zoneMap[r][c]; cnt[z] = (cnt[z] || 0) + 1; }
  }
  return cnt;
}

console.log('[A] 第25关 展翅雄鹰（形状 + 分区 + 特殊格 + 大地图镜头）');
{
  const g = new GameGlobal.Game(25);
  check(g.rows === 10 && g.cols === 20, '棋盘 10×20');
  check(g.hasShape && g.useNewEngine, '启用形状棋盘与新寻路引擎');
  const cnt = zoneCounts(g);
  check(cnt[0] === 34 && cnt[1] === 30 && cnt[2] === 50,
    '分区格数 红34/蓝30/橙50（均为偶数可配对） got=' + JSON.stringify(cnt));
  check(g.zoneCount === 3 && g.zoneIsolated(), '3 个分区且默认隔离');

  // 网格填充与形状一致：存在的格子必有水果，镂空/圈外必为 0
  let fillOk = true, hollowOk = true;
  for (let r = 1; r <= g.rows; r++) for (let c = 1; c <= g.cols; c++) {
    if (g.shape[r][c] && g.grid[r][c] === 0) fillOk = false;
    if (!g.shape[r][c] && g.grid[r][c] !== 0) hollowOk = false;
  }
  check(fillOk, '形状格全部填了水果');
  check(hollowOk, '镂空格保持为空');
  check(g.remainingPairs === 57, '共 57 对 got=' + g.remainingPairs);

  // 分区水果池：左翅(zone0)只允许 1~8，右翅(zone1)只允许 5~12
  let poolOk = true;
  for (let r = 1; r <= g.rows; r++) for (let c = 1; c <= g.cols; c++) {
    const t = g.grid[r][c];
    if (!t) continue;
    const z = g.zoneMap[r][c];
    if (z === 0 && (t < 1 || t > 8)) poolOk = false;
    if (z === 1 && (t < 5 || t > 12)) poolOk = false;
  }
  check(poolOk, '分区水果池生效（左翅1~8 / 右翅5~12，重叠5~8=跨区目标）');

  // 卡片带分区号
  let cardZoneOk = true;
  for (let r = 1; r <= g.rows; r++) for (let c = 1; c <= g.cols; c++) {
    const cd = g.cardNodes[r][c];
    if (cd && cd.zone !== g.zoneMap[r][c]) cardZoneOk = false;
  }
  check(cardZoneOk, '卡片 zone 与地图一致');

  // 特殊格位置正确（1-based）：cross(4,10) fold(6,10) pierce(7,11)
  check(g.specialMap[4][10] === 'cross', '跨区格在躯干上部');
  check(g.specialMap[6][10] === 'fold', '多折格在躯干中部');
  check(g.specialMap[7][11] === 'pierce', '穿透格在躯干下部');
  check(!g.unlocked.fold && !g.unlocked.pierce && !g.unlocked.cross, '开局能力全部未解锁');

  // 跨区配对被拦截：找一个 zone0 与 zone2 中同类型的两张卡
  let blocked = null;
  outer:
  for (let r1 = 1; r1 <= g.rows; r1++) for (let c1 = 1; c1 <= g.cols; c1++) {
    const a = g.cardNodes[r1][c1];
    if (!a || a.zone !== 0) continue;
    for (let r2 = 1; r2 <= g.rows; r2++) for (let c2 = 1; c2 <= g.cols; c2++) {
      const b = g.cardNodes[r2][c2];
      if (b && b.zone === 2 && b.type === a.type) { blocked = [a, b]; break outer; }
    }
  }
  if (blocked) {
    g.onTapCard(blocked[0].r, blocked[0].c);
    g.onTapCard(blocked[1].r, blocked[1].c);
    check(g.grid[blocked[0].r][blocked[0].c] !== 0 && g.grid[blocked[1].r][blocked[1].c] !== 0,
      '分区隔离：跨区同类型也不能消除');
    check(g.moves === 0, '跨区拦截不计步数');
  } else {
    check(false, '测试数据：没找到跨区同类型卡片（布局异常）');
  }

  // 消除特殊格上的水果 → 解锁能力（直接调 eliminatePair 模拟配对消除）
  const sp = g.cardNodes[4][10]; // cross 格上的卡
  let mate = null;
  for (let r = 1; r <= g.rows && !mate; r++) for (let c = 1; c <= g.cols; c++) {
    const cd = g.cardNodes[r][c];
    if (cd && cd !== sp && cd.type === sp.type && cd.zone === sp.zone) { mate = cd; break; }
  }
  check(!!mate, '为跨区格上的卡找到同区同类配对');
  g.eliminatePair(sp, mate, [{ r: sp.r, c: sp.c }, { r: mate.r, c: mate.c }]);
  check(g.unlocked.cross === true, '消掉跨区格水果后：跨区能力解锁');
  check(!g.zoneIsolated(), '跨区解锁后分区不再隔离');

  // 解锁前后 findConnectPath 参数联动（监视 findPath 的 opts）
  const g2 = new GameGlobal.Game(25);
  let seenOpts = null;
  const origFind = GameGlobal.PathChecker.findPath;
  GameGlobal.PathChecker.findPath = function (grid, rows, cols, r1, c1, r2, c2, opts) {
    seenOpts = opts; return origFind.apply(this, arguments);
  };
  const cA = g2.cardNodes[1][9], cB = g2.cardNodes[1][10]; // 躯干顶行相邻两格
  g2.findConnectPath(cA, cB);
  check(seenOpts && seenOpts.maxTurns === 2 && seenOpts.maxPierce === 0, '默认 2 折 0 穿透');
  g2.unlocked.fold = true; g2.unlocked.pierce = true;
  g2.findConnectPath(cA, cB);
  check(seenOpts && seenOpts.maxTurns === 3 && seenOpts.maxPierce === 1, '解锁后 3 折 1 穿透');
  GameGlobal.PathChecker.findPath = origFind;
}

console.log('[B] 镜头系统（第25关大地图）');
{
  const g = new GameGlobal.Game(25);
  check(!!g.cam, '大地图关有镜头');
  const fit = g._fitScale();
  check(fit > 0.3 && fit < 0.7, '全景缩放合理（整鹰入屏）fit=' + fit.toFixed(3));
  g.startIntro();
  check(g._introOn === true, '入场镜头开始');
  check(Math.abs(g.cam.scale - fit * 0.92) < 0.01, '镜头起于全景位');
  g.skipIntro();
  check(g._introOn === false, '跳过入场镜头');
  check(Math.abs(g.cam.scale - Math.min(1, fit * 2.2)) < 0.01, '跳过后直达对局视角');

  // 平移与缩放 + 钳制
  const cx0 = g.cam.cx;
  g.panBy(50, 0);
  check(g.cam.cx !== cx0, '拖拽可平移镜头');
  const s0 = g.cam.scale;
  g.zoomAt(195, 400, 1.5);
  check(g.cam.scale > s0, '滚轮/捏合可放大');
  g.zoomAt(195, 400, 100); // 疯狂放大 → 被钳制
  check(g.cam.scale <= 2.2, '放大上限钳制 2.2');
  g.zoomAt(195, 400, 0.0001);
  check(g.cam.scale >= fit * 0.9 - 0.001, '缩小下限钳制在全景附近');

  // 命中换算：卡片棋盘坐标 → 设计坐标 → hitTest 应还原同一格
  const p = g.logicToPixel(4, 10); // 棋盘坐标
  const sc = g._boardScreenCenter();
  const dx = (p.x - g.cam.cx) * g.cam.scale + sc.x;
  const dy = (p.y - g.cam.cy) * g.cam.scale + sc.y;
  const hit = g.hitTest(dx, dy);
  check(hit && hit.r === 4 && hit.c === 10, '镜头逆变换命中正确格 got=' + JSON.stringify(hit));
}

console.log('[C] 第26关 心心相印（心形镂空，单分区）');
{
  const g = new GameGlobal.Game(26);
  let cells = 0;
  for (let r = 1; r <= g.rows; r++) for (let c = 1; c <= g.cols; c++) if (g.shape[r][c]) cells++;
  check(cells === 66, '心形共 66 格（偶数可配对）got=' + cells);
  check(g.zoneCount === 1 && !g.zoneIsolated(), '单分区不隔离');
  check(g.cam && !g.cfg.viewport, '有入场镜头但不可拖拽');
  const cx0 = g.cam.cx, s0 = g.cam.scale;
  g.panBy(80, 80); g.zoomAt(195, 400, 2);
  check(g.cam.cx === cx0 && g.cam.scale === s0, '非大地图关平移缩放被禁用');
  check(g.specialMap[3][5] === 'fold' && g.specialMap[4][9] === 'pierce', '特殊格位置正确');
}

console.log('[D] 旧关回归（第1关必须零变化）');
{
  const g = new GameGlobal.Game(1);
  check(g.cam === null, '旧关无镜头');
  check(!g.useNewEngine && !g.hasShape, '旧关不走新引擎');
  check(g.zoneCount === 1 && !g.zoneIsolated(), '旧关单分区');
  let n = 0;
  for (let r = 1; r <= g.rows; r++) for (let c = 1; c <= g.cols; c++) if (g.grid[r][c]) n++;
  check(n === 80 && g.remainingPairs === 40, '旧关 80 卡 40 对');
  // 旧关寻路仍走 canConnect
  let usedOld = false;
  const origCC = GameGlobal.PathChecker.canConnect;
  GameGlobal.PathChecker.canConnect = function () { usedOld = true; return origCC.apply(this, arguments); };
  const a = g.cardNodes[1][1], b = g.cardNodes[1][2];
  g.findConnectPath(a, b);
  GameGlobal.PathChecker.canConnect = origCC;
  check(usedOld, '旧关寻路走原 canConnect');
  // 固定布局未变（第1关首张卡类型 = LEVEL_LAYOUTS[1].g[0]）
  check(g.grid[1][1] === GameGlobal.LEVEL_LAYOUTS[1].g[0], '旧关固定布局原样');
}

console.log('');
if (errors) { console.log('新玩法测试存在失败 (' + errors + ' 项)'); process.exitCode = 1; }
else { console.log('新玩法测试全部通过 ✓'); }
