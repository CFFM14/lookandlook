
// ── mock 微信环境（浏览器预览用） ──────────────
window.GameGlobal = {};
var memStore = { 'look_best_1': { moves: 6, elapsed: 35 }, 'look_unlocked': '2' };
var wx = {
  getSystemInfoSync: function () { return { windowWidth: 390, windowHeight: 844, pixelRatio: 2 }; },
  createCanvas: function () { return document.getElementById('game'); },
  createImage: function () { return new Image(); },
  onTouchStart: function () {}, onTouchEnd: function () {},
  getStorageSync: function (k) { return memStore[k] !== undefined ? memStore[k] : ''; },
  setStorageSync: function (k, v) { memStore[k] = v; },
  createInnerAudioContext: function () { return { stop: function(){}, play: function(){}, seek: function(){}, src: '', volume: 1 }; },
};

// ── 加载真实游戏模块（与 game.js 同顺序） ───────
document.write('<script src="js/config.js"><\/script>');
document.write('<script src="js/storage.js"><\/script>');
document.write('<script src="js/pathChecker.js"><\/script>');
document.write('<script src="js/audio.js"><\/script>');
document.write('<script src="js/game.js"><\/script>');
document.write('<script src="js/render.js"><\/script>');
document.write('<script src="js/ui.js"><\/script>');
document.write('<script src="js/main.js"><\/script>');

// canvas 放大 1.25 倍显示
document.getElementById('game').style.width = (390 * 1.25) + 'px';
document.getElementById('game').style.height = (844 * 1.25) + 'px';

// ── 页面切换 ───────────────────────────────────
function showPage(page) {
  if (!GameGlobal.Main || !GameGlobal.Main._ready) return;
  var Main = GameGlobal.Main, Game = GameGlobal.Game;
  if (page === 'menu') {
    Main.page = 'menu'; Main.game = null; Main.winData = null;
  } else if (page === 'levels') {
    Main.page = 'levels'; Main.game = null;
  } else if (page === 'game') {
    Main.game = new Game(2); Main.page = 'game'; Main.winData = null;
  } else if (page === 'win') {
    Main.game = new Game(1);
    Main.winData = { levelId: 1, moves: 6, elapsed: 35 };
    Main.winShownAt = Date.now() - 600; // 弹入动画进行中
    Main.page = 'win';
  }
}
// 图片加载完成后默认展示结算面板
(function wait() {
  if (GameGlobal.Main && GameGlobal.Main._ready) showPage('win');
  else setTimeout(wait, 100);
})();
