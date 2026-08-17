/**
 * 水果连连看 · 微信小游戏入口
 * 加载顺序：config → storage → pathChecker → audio → game → render → ui → main
 * main.js 加载完成后自动启动游戏。
 */
require('./js/config.js');
require('./js/levels.js');
require('./js/storage.js');
require('./js/pathChecker.js');
require('./js/audio.js');
require('./js/game.js');
require('./js/render.js');
require('./js/ui.js');
require('./js/main.js');
