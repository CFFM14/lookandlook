// 压力测试：第6关随机布局通关 20 轮，统计失败率并输出失败状态
global.GameGlobal = {};
global.wx = { getStorageSync: () => '', setStorageSync: () => {} };
function noop() {}
let winCount = 0;
global.GameGlobal.Tween = {
  to(obj, props, dur, ease, cb) { for (const k in props) obj[k] = props[k]; if (cb) cb(); },
  update: noop,
};
global.GameGlobal.Renderer = { spawnFirework: noop, spawnIceShards: noop, spawnBombEffect: noop, spawnWinFireworks: noop, updateParticles: noop };
global.GameGlobal.SoundManager = { play: noop, setEnabled: noop, isEnabled: () => true };
global.GameGlobal.Main = { showWin: () => { winCount++; }, showToast: noop };

require('../js/config.js');
require('../js/pathChecker.js');
require('../js/storage.js');
const Game = require('../js/game.js');
const PathChecker = GameGlobal.PathChecker;

(async () => {
  const rounds = 6;
  let fail = 0;
  for (let round = 0; round < rounds; round++) {
    winCount = 0;
    const g = new Game(6);
    let guard = 0;
    while (g.remainingPairs > 0 && guard++ < 200) {
      let found = false;
      outer:
      for (let r1 = 1; r1 <= g.rows; r1++) {
        for (let c1 = 1; c1 <= g.cols; c1++) {
          const card = g.cardNodes[r1][c1];
          if (!card || card.state === 'eliminated') continue;
          for (let r2 = 1; r2 <= g.rows; r2++) {
            for (let c2 = 1; c2 <= g.cols; c2++) {
              if (r1 === r2 && c1 === c2) continue;
              const c2c = g.cardNodes[r2][c2];
              if (!c2c || c2c.state === 'eliminated') continue;
              if (g.grid[r1][c1] !== g.grid[r2][c2]) continue;
              if (PathChecker.canConnect(g.grid, g.rows, g.cols, r1, c1, r2, c2)) {
                g.onTapCard(r1, c1);
                g.onTapCard(r2, c2);
                await new Promise((r) => setTimeout(r, 500));
                found = true;
                break outer;
              }
            }
          }
        }
      }
      if (!found) break;
    }
    await new Promise((r) => setTimeout(r, 3600));
    let left = 0;
    const leftCards = [];
    for (let r = 1; r <= g.rows; r++) {
      for (let c = 1; c <= g.cols; c++) {
        if (g.cardNodes[r][c] && g.cardNodes[r][c].state !== 'eliminated') {
          left++;
          leftCards.push('(' + r + ',' + c + ')t' + g.cardNodes[r][c].type);
        }
      }
    }
    const okRound = winCount > 0 && left === 0;
    if (!okRound) {
      fail++;
      console.log('第' + round + '轮失败: win=' + winCount + ' pairs=' + g.remainingPairs + ' 残留卡=' + left + ' ' + leftCards.join(' '));
    }
  }
  console.log('压力测试完成: ' + (rounds - fail) + '/' + rounds + ' 通过, ' + fail + ' 失败');
})();
