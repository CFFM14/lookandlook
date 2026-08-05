/**
 * smoke_test.js —— 完整运行时冒烟测试
 * mock wx / Canvas 环境，加载全部模块，模拟：启动 → 首页渲染 → 进入第1关 → 点击卡片 → 结算。
 * 运行：node tools/smoke_test.js
 */
'use strict';

// ── mock 微信环境 ────────────────────────────
global.GameGlobal = {};
// 记录最后一次 drawImage 的矩形，用于验证背景覆盖
let lastDrawRect = null;
const ctxStub = {
  setTransform() {}, clearRect() {}, beginPath() {}, moveTo() {}, lineTo() {},
  stroke() {}, fill() {}, fillRect() {}, arc() {}, arcTo() {}, closePath() {},
  clip() {}, save() {}, restore() {}, translate() {}, scale() {}, rotate() {},
  drawImage(img, x, y, w, h) { lastDrawRect = { x: x, y: y, w: w, h: h }; },
  fillText() {}, createLinearGradient() { return { addColorStop() {} }; },
};
// Canvas 属性 setter
['fillStyle', 'strokeStyle', 'lineWidth', 'font', 'textAlign', 'textBaseline',
  'globalAlpha', 'shadowColor', 'shadowBlur', 'lineJoin', 'lineCap'].forEach(k => {
  Object.defineProperty(ctxStub, k, { set() {}, get() { return ''; } });
});

// 内存存储（模拟 wx 存档，测试可读写）
const memStore = { 'look_unlocked': '1' };
global.wx = {
  getSystemInfoSync: () => ({ windowWidth: 390, windowHeight: 844, pixelRatio: 2 }),
  createCanvas: () => ({ width: 0, height: 0, getContext: () => ctxStub }),
  createImage: () => ({
    width: 780, height: 1387, // 模拟加载完成后的背景图尺寸
    set src(v) { if (this.onload) setTimeout(this.onload, 0); },
  }),
  onTouchStart() {}, onTouchEnd() {},
  getStorageSync: (k) => (memStore[k] !== undefined ? memStore[k] : ''),
  setStorageSync: (k, v) => { memStore[k] = v; },
  createInnerAudioContext: () => ({
    stop() {}, seek() {}, play() {},
    set src(v) {}, set volume(v) {},
  }),
};
// 不自动循环，由测试手动驱动帧
global.requestAnimationFrame = () => {};

// ── 加载全部游戏模块（与 game.js 相同顺序）─────
require('../js/config.js');
require('../js/storage.js');
require('../js/pathChecker.js');
require('../js/audio.js');
require('../js/game.js');
require('../js/render.js');
require('../js/ui.js');
require('../js/main.js');

// 微信小游戏中 GameGlobal 即全局对象（挂载的属性全局可见）；Node 测试需手动桥接
Object.assign(global, GameGlobal);

let errors = 0;
function check(cond, name) {
  if (cond) console.log('  ✓ ' + name);
  else { console.error('  ✗ FAIL: ' + name); errors++; }
}

// 等待图片加载完成（Main._ready）
const waitReady = () => new Promise(res => {
  const t = setInterval(() => {
    if (GameGlobal.Main._ready) { clearInterval(t); res(); }
  }, 10);
});

async function main() {
  console.log('[A] 模块加载');
  check(typeof GameGlobal.PathChecker === 'object', 'PathChecker 已挂载');
  check(typeof GameGlobal.Game === 'function', 'Game 类已挂载');
  check(typeof GameGlobal.Main === 'object', 'Main 已挂载');
  check(GameGlobal.LEVELS.length === 10, '10 个关卡配置');

  await waitReady();
  console.log('[B] 启动');
  check(GameGlobal.Main._ready === true, '图片加载完成进入就绪');
  check(GameGlobal.Main.page === 'menu', '初始页为 menu');

  // 渲染首页
  GameGlobal.Main.render();
  check(GameGlobal.Main.buttonBounds.some(b => b.id === 'menu_start'), '首页按钮已注册');

  // 「开始游戏」应进入最新解锁的关卡（当前解锁 1 → 第 1 关）
  GameGlobal.UI.onAction('menu_start');
  check(GameGlobal.Main.page === 'game', '进入游戏页');
  check(GameGlobal.Main.game.levelId === 1, '最新解锁=1 时进入第 1 关');

  // 解锁推进到第 3 关后，「开始游戏」应直接进入第 3 关
  memStore['look_unlocked'] = '3';
  GameGlobal.UI.onAction('game_back');
  GameGlobal.UI.onAction('menu_start');
  check(GameGlobal.Main.game && GameGlobal.Main.game.levelId === 3, '最新解锁=3 时直接进入第 3 关');
  // 还原为第 1 关继续后续交互测试
  memStore['look_unlocked'] = '1';
  GameGlobal.UI.onAction('game_back');
  GameGlobal.UI.onAction('menu_start');
  check(GameGlobal.Main.game && GameGlobal.Main.game.levelId === 1, '还原后进入第 1 关');

  // 渲染游戏帧（多帧推进动画/粒子）
  for (let i = 0; i < 5; i++) {
    GameGlobal.Main.update(16);
    GameGlobal.Main.render();
  }

  // 水果图键名一致性：渲染层用的 key 必须与加载的 key 完全一致（fruit_01~12）
  let fruitImgOk = true;
  for (let t = 1; t <= 12; t++) {
    const key = 'fruit_' + (t < 10 ? '0' : '') + t;
    if (!Main.images[key]) fruitImgOk = false;
  }
  check(fruitImgOk, '12 张水果图全部加载（键名补零一致）');

  // 模拟点击卡片：先点第一张有卡的格子，再点另一张同类型
  const game = GameGlobal.Main.game;
  let clicked = 0;
  outer:
  for (let r1 = 1; r1 <= game.rows; r1++) {
    for (let c1 = 1; c1 <= game.cols; c1++) {
      if (!game.grid[r1][c1]) continue;
      for (let r2 = 1; r2 <= game.rows; r2++) {
        for (let c2 = 1; c2 <= game.cols; c2++) {
          if (r1 === r2 && c1 === c2) continue;
          if (game.grid[r1][c1] !== game.grid[r2][c2]) continue;
          if (GameGlobal.PathChecker.canConnect(game.grid, game.rows, game.cols, r1, c1, r2, c2)) {
            const p1 = game.logicToPixel(r1, c1);
            const p2 = game.logicToPixel(r2, c2);
            // 用 Main.handleTap 走完整触摸分发路径
            const toScreen = (d) => ({ x: d.x * Main.scale + Main.offsetX, y: d.y * Main.scale + Main.offsetY });
            const s1 = toScreen(p1), s2 = toScreen(p2);
            Main.handleTap(s1.x, s1.y);
            Main.handleTap(s2.x, s2.y);
            clicked++;
            break outer;
          }
        }
      }
    }
  }
  check(clicked === 1, '模拟点击了一对可消除卡片');
  check(game.isProcessing === true, '消除流程进行中');
  await new Promise(r => setTimeout(r, 600));
  check(game.remainingPairs === 11, '消除后剩余 11 对（第1关 12 对）');

  // 工具按钮
  GameGlobal.UI.onAction('btn_hint');
  GameGlobal.UI.onAction('btn_shuffle');
  GameGlobal.UI.onAction('btn_bomb');
  await new Promise(r => setTimeout(r, 700));
  check(game.isProcessing === false, '炸弹流程结束解锁');
  check(game.remainingPairs <= 11, '炸弹后对数减少或不变');

  // 渲染 win 前的动画帧
  for (let i = 0; i < 3; i++) { GameGlobal.Main.update(16); GameGlobal.Main.render(); }

  // 关卡选择页
  GameGlobal.UI.onAction('game_back');
  check(GameGlobal.Main.page === 'menu', '返回首页');
  GameGlobal.UI.onAction('menu_levels');
  check(GameGlobal.Main.page === 'levels', '进入关卡选择');
  GameGlobal.Main.render();
  check(GameGlobal.Main.buttonBounds.some(b => b.id === 'lv_1'), '关卡按钮已注册');

  console.log('[C] 回归：背景覆盖非标准屏 + 结算面板按钮');
  {
    // 模拟 375×667（iPhone SE 类）非标准屏幕
    Main.screenW = 375; Main.screenH = 667;
    Main.scale = Math.min(Main.screenW / GameGlobal.DESIGN_W, Main.screenH / GameGlobal.DESIGN_H);
    Main.offsetX = (Main.screenW - GameGlobal.DESIGN_W * Main.scale) / 2;
    Main.offsetY = (Main.screenH - GameGlobal.DESIGN_H * Main.scale) / 2;

    GameGlobal.Renderer.drawBackground('bg_menu');
    const visL = -Main.offsetX / Main.scale;
    const visR = visL + Main.screenW / Main.scale;
    const visT = -Main.offsetY / Main.scale;
    const visB = visT + Main.screenH / Main.scale;
    check(!!lastDrawRect && lastDrawRect.x <= visL && lastDrawRect.x + lastDrawRect.w >= visR &&
      lastDrawRect.y <= visT && lastDrawRect.y + lastDrawRect.h >= visB,
      '背景 cover 覆盖可见区（375×667 无白边）');

    // 结算面板：手动进入 win 页渲染，验证按钮注册
    Main.page = 'win';
    Main.game = new GameGlobal.Game(1);
    Main.winData = { levelId: 1, moves: 5, elapsed: 20 };
    Main.render();
    check(Main.buttonBounds.some(b => b.id === 'win_next'), '结算页注册「下一关」');
    check(Main.buttonBounds.some(b => b.id === 'win_replay'), '结算页注册「再玩一次」');
    check(Main.buttonBounds.some(b => b.id === 'win_home'), '结算页注册「返回首页」');
    check(!Main.buttonBounds.some(b => b.id === 'btn_bomb'), '结算页不注册游戏内工具按钮');
    // 还原
    Main.page = 'menu';
    Main.winData = null;
    Main.screenW = 390; Main.screenH = 844;
    Main.scale = 1; Main.offsetX = 0; Main.offsetY = 0;
  }

  console.log('');
  if (errors) {
    console.log('冒烟测试存在失败 (' + errors + ' 项)');
    process.exitCode = 1;
  } else {
    console.log('冒烟测试全部通过 ✓');
  }
}

main().catch(e => {
  console.error('冒烟测试异常:', e);
  process.exitCode = 1;
});
