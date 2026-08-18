/**
 * test_levels_paging.js —— 选关界面分页功能验证
 *
 * 验证：每页 12 关、翻页按钮注册、页码边界、翻页动画状态推进、
 *       水平滑动手势触发翻页、不足阈值回弹不翻页。
 * 运行：node tools/test_levels_paging.js
 */
'use strict';

global.GameGlobal = {};
const ctxStub = {
  setTransform() {}, clearRect() {}, beginPath() {}, moveTo() {}, lineTo() {},
  stroke() {}, fill() {}, fillRect() {}, arc() {}, arcTo() {}, closePath() {},
  clip() {}, save() {}, restore() {}, translate() {}, scale() {}, rotate() {},
  drawImage() {}, fillText() {}, createLinearGradient() { return { addColorStop() {} }; },
};
['fillStyle', 'strokeStyle', 'lineWidth', 'font', 'textAlign', 'textBaseline',
  'globalAlpha', 'shadowColor', 'shadowBlur', 'lineJoin', 'lineCap'].forEach(k => {
  Object.defineProperty(ctxStub, k, { set() {}, get() { return ''; } });
});

const memStore = { 'look_unlocked': '12' };
const touchHandlers = {};
global.wx = {
  getSystemInfoSync: () => ({ windowWidth: 390, windowHeight: 844, pixelRatio: 2 }),
  createCanvas: () => ({ width: 0, height: 0, getContext: () => ctxStub }),
  createImage: () => ({ set src(v) { if (this.onload) setTimeout(this.onload, 0); } }),
  onTouchStart: (fn) => { touchHandlers.start = fn; },
  onTouchMove: (fn) => { touchHandlers.move = fn; },
  onTouchEnd: (fn) => { touchHandlers.end = fn; },
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
function check(cond, name) {
  if (cond) console.log('  ✓ ' + name);
  else { console.error('  ✗ FAIL: ' + name); errors++; }
}

const waitReady = () => new Promise(res => {
  const t = setInterval(() => {
    if (GameGlobal.Main._ready) { clearInterval(t); res(); }
  }, 10);
});

const lvIds = () => Main.buttonBounds.filter(b => b.id.indexOf('lv_') === 0).map(b => b.id);

async function main() {
  await waitReady();
  const M = GameGlobal.Main;
  const UI = GameGlobal.UI;
  const perPage = GameGlobal.LEVELS_PER_PAGE;
  const totalPages = Math.ceil(GameGlobal.TOTAL_LEVELS / perPage);

  console.log('[A] 分页结构');
  check(totalPages === 2, `总页数 = 2（17/${perPage}，实际 ${totalPages}）`);

  UI.showLevelSelect();
  M.render();
  const ids = M.buttonBounds.map(b => b.id);
  check(M.page === 'levels', '进入选关界面');
  check(ids.includes('levels_back'), '返回按钮已注册');
  check(ids.includes('levels_prev') && ids.includes('levels_next'), '左右翻页按钮已注册');
  const page0 = lvIds();
  check(page0.length === 12, `第 1 页注册 12 个关卡按钮（实际 ${page0.length}）`);
  check(page0[0] === 'lv_1' && page0[page0.length - 1] === 'lv_12', '第 1 页为关卡 1~12');

  console.log('[B] 翻页动画');
  UI.flipLevelPage(-1);
  check(M.levelPage === 0 && M.levelPageAnim === 0, '第 1 页不能向上翻（边界拦截）');
  UI.flipLevelPage(1);
  check(M.levelPageTo === 1 && M.levelPageAnim > 0, '下一页动画已触发（目标第 2 页）');
  UI.flipLevelPage(1);
  check(M.levelPageTo === 1, '动画进行中忽略连点（仍在第 2 页目标）');
  for (let i = 0; i < 40 && M.levelPageAnim > 0; i++) M.update(16);
  check(M.levelPage === 1 && M.levelPageAnim === 0, '动画结束后当前页 = 2');
  M.render();
  const page1 = lvIds();
  check(page1[0] === 'lv_13' && page1[page1.length - 1] === 'lv_24', '第 2 页为关卡 13~24');

  console.log('[C] 页码边界');
  M.levelPage = totalPages - 1; M.levelPageAnim = 0;
  UI.flipLevelPage(1);
  check(M.levelPage === totalPages - 1 && M.levelPageAnim === 0, '最后一页不能向后翻（边界拦截）');
  M.render();
  const last = lvIds();
  check(last.includes('lv_17'), '最后一页包含第 17 关');

  console.log('[D] 水平滑动手势');
  M.levelPage = 0; M.levelPageAnim = 0; M._levelDragX = 0; M._levelDragging = false;
  // 向右滑 120px（设计坐标）→ 应回上一页（第 0 页边界 → 不翻页）
  touchHandlers.start({ touches: [{ clientX: 200, clientY: 400 }] });
  touchHandlers.move({ touches: [{ clientX: 320, clientY: 400 }] });
  touchHandlers.end({ changedTouches: [{ clientX: 320, clientY: 400 }] });
  check(M.levelPage === 0, '第 1 页右滑 120px 不越界翻页');

  // 到第 2 页后左滑 120px → 下一页
  UI.flipLevelPage(1);
  for (let i = 0; i < 40 && M.levelPageAnim > 0; i++) M.update(16);
  touchHandlers.start({ touches: [{ clientX: 300, clientY: 400 }] });
  touchHandlers.move({ touches: [{ clientX: 180, clientY: 400 }] });
  touchHandlers.end({ changedTouches: [{ clientX: 180, clientY: 400 }] });
  for (let i = 0; i < 40 && M.levelPageAnim > 0; i++) M.update(16);
  check(M.levelPage === 2, '第 2 页左滑 120px 翻到第 3 页');

  // 只滑 30px → 回弹不翻页
  touchHandlers.start({ touches: [{ clientX: 200, clientY: 400 }] });
  touchHandlers.move({ touches: [{ clientX: 230, clientY: 400 }] });
  touchHandlers.end({ changedTouches: [{ clientX: 230, clientY: 400 }] });
  for (let i = 0; i < 40 && M._levelDragX !== 0; i++) M.update(16);
  check(M.levelPage === 2 && M._levelDragX === 0, '滑动 30px 不足阈值：回弹不翻页');

  console.log('');
  if (errors) {
    console.log('分页测试存在失败 (' + errors + ' 项)');
    process.exitCode = 1;
  } else {
    console.log('分页测试全部通过 ✓');
  }
}

main().catch(e => {
  console.error('分页测试异常:', e);
  process.exitCode = 1;
});
