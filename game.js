/**
 * 大乱炖连连消 · 微信小游戏入口
 * 加载顺序：config → storage → pathChecker → audio → game → stackGame → render → ui → main
 * 注意：新增的引擎/模块必须在此处 require，否则微信运行时不会加载该文件（GameGlobal.X 为 undefined）。
 * main.js 加载完成后自动启动游戏。
 */
require('./js/config.js');
require('./js/levels.js');
require('./js/storage.js');
require('./js/pathChecker.js');
require('./js/audio.js');
require('./js/game.js');
require('./js/stackGame.js');
require('./js/render.js');
require('./js/ui.js');
require('./js/main.js');
