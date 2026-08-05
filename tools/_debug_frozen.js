// 临时诊断：追踪第6关通关过程中每类型卡数与单例演变
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
global.GameGlobal.Main = { showWin: () => { winCount++; console.log('>>> onWin'); }, showToast: noop };

require('../js/config.js');
require('../js/pathChecker.js');
require('../js/storage.js');
const Game = require('../js/game.js');
const PathChecker = GameGlobal.PathChecker;

(async () => {
  const g = new Game(6);
  const typeCounts = () => {
    const m = {};
    for (let r = 1; r <= g.rows; r++) for (let c = 1; c <= g.cols; c++) {
      const cd = g.cardNodes[r][c];
      if (cd && cd.state !== 'eliminated') m[cd.type] = (m[cd.type] || 0) + 1;
    }
    return m;
  };
  const dump = (tag) => {
    const t = typeCounts();
    const singles = Array.from(g.singletonSet).join(',');
    let total = 0;
    const parts = [];
    for (const k in t) { total += t[k]; parts.push(k + ':' + t[k]); }
    console.log(tag + ' pairs=' + g.remainingPairs + ' 卡数=' + total + ' 单例[' + singles + '] | ' + parts.join(' '));
  };
  dump('初始');
  let guard = 0;
  while (g.remainingPairs > 0 && guard++ < 40) {
    let found = false;
    outer:
    for (let r1 = 1; r1 <= g.rows; r1++) {
      for (let c1 = 1; c1 <= g.cols; c1++) {
        const card = g.cardNodes[r1][c1];
        if (!card || card.state === 'eliminated') continue;
        if (g.singletonSet.has(r1 + ',' + c1)) continue;
        for (let r2 = 1; r2 <= g.rows; r2++) {
          for (let c2 = 1; c2 <= g.cols; c2++) {
            if (r1 === r2 && c1 === c2) continue;
            const c2c = g.cardNodes[r2][c2];
            if (!c2c || c2c.state === 'eliminated') continue;
            if (g.singletonSet.has(r2 + ',' + c2)) continue;
            if (g.grid[r1][c1] !== g.grid[r2][c2]) continue;
            if (PathChecker.canConnect(g.grid, g.rows, g.cols, r1, c1, r2, c2)) {
              const f1 = g.frozen[r1][c1] ? '冰' : '普';
              const f2 = g.frozen[r2][c2] ? '冰' : '普';
              g.onTapCard(r1, c1);
              g.onTapCard(r2, c2);
              await new Promise((r) => setTimeout(r, 650));
              if (guard >= 18) {
                console.log('#' + guard + ' 配(' + r1 + ',' + c1 + ')' + f1 + '+(' + r2 + ',' + c2 + ')' + f2);
                dump('  →');
              }
              found = true;
              break outer;
            }
          }
        }
      }
    }
    if (!found) { console.log('无可连配对@' + guard); dump('  →'); break; }
  }
  await new Promise((r) => setTimeout(r, 4500));
  console.log('最终 win=' + winCount);
  dump('最终');
})();
