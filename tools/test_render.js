/**
 * test_render.js —— 渲染层冒烟：把新玩法关的绘制函数全部跑一遍（mock 画布抓崩溃）
 * 覆盖：renderGame（镜头/地板/特殊格角标/能力徽章/分区边框）、renderWin、help 弹窗。
 * 运行：node tools/test_render.js
 */
'use strict';

global.GameGlobal = {};
const calls = { save: 0, restore: 0, translate: 0, scale: 0, arc: 0, fillText: 0, arcTo: 0 };
const ctxStub = {
  setTransform() {}, clearRect() {}, beginPath() {}, moveTo() {}, lineTo() {},
  stroke() {}, fill() {}, fillRect() {},
  arc() { calls.arc++; },
  // 真机 canvas 严格校验参数：半径非法（负/NaN）直接抛 IndexSizeError 崩掉游戏。
  // 这里同样校验，把这类问题挡在测试阶段（曾出现：移动卡消除动画末期内缩尺寸为负 → 负半径崩溃）。
  arcTo(x1, y1, x2, y2, r) {
    calls.arcTo++;
    if (typeof r !== 'number' || !isFinite(r) || r < 0) {
      throw new Error('arcTo 非法半径: ' + r + '（真机 canvas 会抛 IndexSizeError 崩溃）');
    }
  },
  closePath() {},
  clip() {},
  save() { calls.save++; }, restore() { calls.restore++; },
  translate() { calls.translate++; }, scale() { calls.scale++; }, rotate() {},
  drawImage() {}, fillText() { calls.fillText++; },
  createLinearGradient() { return { addColorStop() {} }; },
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
Object.assign(global, GameGlobal);

let errors = 0;
function check(cond, name) {
  if (cond) console.log('  ✓ ' + name);
  else { console.error('  ✗ FAIL: ' + name); errors++; }
}

const waitReady = () => new Promise(res => {
  const t = setInterval(() => {
    if (GameGlobal.Main._ready) { clearInterval(t); res(); }
  }, 10);
});

async function main() {
  await waitReady();
  const Main = GameGlobal.Main;

  // 第 27 关（鹰形 + 镜头）：完整渲染 3 帧（含入场镜头推进）
  Main.game = new GameGlobal.Game(1001);
  Main.game.startIntro();
  Main.page = 'game';
  for (let i = 0; i < 3; i++) { Main.update(16); Main.render(); }
  check(true, '特殊关1001 游戏页渲染无崩溃（含镜头/地板/特殊格/分区边框）');
  check(calls.translate > 0 && calls.scale > 0, '镜头变换被应用');
  check(calls.arc > 0, '特殊格角标/能力徽章已绘制');
  Main.game.skipIntro();
  Main.render();
  check(true, '跳过镜头后渲染无崩溃');

  // help 弹窗（含新玩法说明文案换行）
  Main.helpPopupOpen = true;
  Main.render();
  check(true, '玩法说明弹窗渲染无崩溃');
  Main.helpPopupOpen = false;

  // 第 26 关（心形）
  Main.game = new GameGlobal.Game(1002);
  Main.game.startIntro();
  for (let i = 0; i < 3; i++) { Main.update(16); Main.render(); }
  check(true, '特殊关1002 游戏页渲染无崩溃');

  // 结算页叠在新玩法关之上（镜头 + design 粒子共存）
  Main.winData = { levelId: 25, moves: 40, elapsed: 120, coinsEarned: 100 };
  Main.winShownAt = Date.now();
  Main.page = 'win';
  GameGlobal.Renderer.spawnWinFireworks();
  for (let i = 0; i < 3; i++) { Main.update(16); Main.render(); }
  check(true, '新玩法关结算页渲染无崩溃（烟花分层）');

  // 旧关渲染回归
  Main.game = new GameGlobal.Game(1);
  Main.page = 'game';
  for (let i = 0; i < 3; i++) { Main.update(16); Main.render(); }
  check(true, '旧关渲染回归无崩溃');

  // 第 25 关（移动卡）消除动画全程：scale 从 1 逐帧缩到 0 再到负值。
  // 曾在此崩溃：卡片内缩后尺寸为负 → roundRectPath 半径为负 → 真机 arcTo IndexSizeError。
  Main.game = new GameGlobal.Game(25);
  Main.page = 'game';
  const gm25 = Main.game;
  for (let s = 1; s >= -0.4; s -= 0.04) {
    gm25.movers.forEach((mv) => { mv.visual.scale = s; });
    Main.render();
  }
  gm25.movers.forEach((mv) => { mv.visual.scale = 1; });
  check(true, '移动卡消除动画全程（scale 1→0→负）渲染无非法圆角参数');

  console.log('');
  if (errors) { console.log('渲染冒烟存在失败 (' + errors + ' 项)'); process.exitCode = 1; }
  else { console.log('渲染冒烟全部通过 ✓'); }
}
main().catch(e => { console.error('渲染冒烟异常:', e); process.exitCode = 1; });
