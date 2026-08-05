/**
 * test_logic.js —— Node 环境逻辑自测（剥离 wx / Canvas 依赖）
 * 运行：node tools/test_logic.js
 * 覆盖：PathChecker 连线判定、布局生成、重力 compact、冰冻解冻、炸弹记账、完整消除与胜利流程。
 */
'use strict';

const assert = require('assert');

// ── mock 环境 ──────────────────────────────
global.GameGlobal = {};
// 内存存储（模拟 wx 存档，支持经济系统读写）
const memStore = {};
global.wx = {
  getStorageSync: (k) => (memStore[k] !== undefined ? memStore[k] : ''),
  setStorageSync: (k, v) => { memStore[k] = v; },
};

function noop() {}
global.GameGlobal.Tween = {
  // 测试用：立即应用终值并执行回调（同步）
  to(obj, props, dur, ease, cb) {
    for (const k in props) obj[k] = props[k];
    if (cb) cb();
  },
  update: noop,
};
global.GameGlobal.Renderer = {
  spawnFirework: noop, spawnIceShards: noop, spawnBombEffect: noop, spawnWinFireworks: noop,
  updateParticles: noop,
};
global.GameGlobal.SoundManager = { play: noop, setEnabled: noop, isEnabled: () => true };

let winCalled = false;
global.GameGlobal.Main = {
  showWin: () => { winCalled = true; },
  showToast: noop,
};

require('../js/config.js');
require('../js/pathChecker.js');
require('../js/storage.js');
const Game = require('../js/game.js');
require('../js/ui.js'); // 商店购买等 UI 逻辑
// 微信小游戏中 GameGlobal 即全局对象；Node 测试需手动桥接（ui.js 内使用裸标识符 Main）
Object.assign(global, GameGlobal);
const PathChecker = GameGlobal.PathChecker;

let passed = 0;
function ok(cond, name) {
  if (cond) { passed++; console.log('  ✓ ' + name); }
  else { console.error('  ✗ FAIL: ' + name); process.exitCode = 1; }
}

function makeGrid(rows, cols, layout) {
  const grid = [];
  for (let r = 0; r <= rows + 1; r++) {
    grid[r] = [];
    for (let c = 0; c <= cols + 1; c++) grid[r][c] = 0;
  }
  for (let r = 1; r <= rows; r++)
    for (let c = 1; c <= cols; c++)
      grid[r][c] = layout[r - 1][c - 1];
  return grid;
}

async function main() {
  console.log('\n[1] PathChecker 连线判定');
  {
    // 直线
    let g = makeGrid(3, 4, [
      [1, 0, 1, 2],
      [2, 3, 3, 4],
      [4, 5, 5, 6],
    ]);
    let p = PathChecker.canConnect(g, 3, 4, 1, 1, 1, 3);
    ok(p && p.length === 2, '直线连接');

    // 不能连（中间被挡）
    g = makeGrid(3, 3, [
      [1, 2, 3],
      [2, 3, 1],
      [3, 1, 2],
    ]);
    p = PathChecker.canConnect(g, 3, 3, 1, 1, 3, 1);
    ok(p === null, '被挡不可连（垂直方向中间有卡）');

    // L 形
    g = makeGrid(3, 4, [
      [1, 2, 2, 0],
      [0, 1, 3, 3],
      [4, 4, 5, 5],
    ]);
    p = PathChecker.canConnect(g, 3, 4, 1, 1, 2, 2);
    ok(p && p.length === 3, 'L 形连接');

    // Z 形绕外围
    g = makeGrid(4, 4, [
      [1, 0, 0, 0],
      [2, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0],
    ]);
    p = PathChecker.canConnect(g, 4, 4, 1, 1, 4, 3);
    ok(p && p.length === 4, 'Z 形绕外围连接');

    // 同卡不可连
    g = makeGrid(3, 3, [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    p = PathChecker.canConnect(g, 3, 3, 1, 1, 1, 1);
    ok(p === null, '同一张卡不可连');
  }

  console.log('\n[2] 布局生成合法性');
  {
    for (const lv of [1, 2, 3, 4, 5, 6]) {
      const game = new Game(lv);
      const expectPairs = (lv === 1 ? 24 : lv === 2 ? 48 : lv === 3 ? 48 : lv === 4 ? 40 : lv === 5 ? 40 : 42) / 2;
      ok(game.remainingPairs === expectPairs, '第' + lv + '关 对数=' + expectPairs);
      const counts = {};
      let total = 0;
      for (let r = 1; r <= game.rows; r++) for (let c = 1; c <= game.cols; c++) {
        const t = game.grid[r][c];
        if (t === 0) continue;
        counts[t] = (counts[t] || 0) + 1;
        total++;
      }
      ok(total === expectPairs * 2, '第' + lv + '关 卡片总数正确');
      for (const t in counts) {
        if (counts[t] % 2 !== 0) { ok(false, '第' + lv + '关 类型' + t + ' 数量非偶数'); break; }
      }
    }
  }

  console.log('\n[3] 重力 down（第2关）');
  {
    const g = new Game(2);
    const R = g.rows, C = g.cols;
    // 模拟消除底部第 3、5 列各一格
    g.grid[R][3] = 0; g.cardNodes[R][3] = null;
    g.grid[R][5] = 0; g.cardNodes[R][5] = null;
    const moves = g.applyGravity();
    ok(g.grid[R][3] !== 0, '第3列底部被填充');
    ok(g.grid[R][5] !== 0, '第5列底部被填充');
    ok(moves.some(m => m.fc === 3 && m.tr === R && m.tc === 3), '第3列有下移动画');
    // 不变量：非空卡数量不变
    let cnt = 0;
    for (let r = 1; r <= R; r++) for (let c = 1; c <= C; c++) if (g.grid[r][c]) cnt++;
    ok(cnt === R * C - 2, '重力后卡片数量守恒');
    // 每列底部无空洞
    let bottomFull = true;
    for (let c = 1; c <= C; c++) {
      for (let r = R; r >= 1; r--) {
        if (g.grid[r][c] === 0) {
          for (let r2 = r - 1; r2 >= 1; r2--) if (g.grid[r2][c]) bottomFull = false;
          break;
        }
      }
    }
    ok(bottomFull, '所有列底部无空洞');
  }

  console.log('\n[4] 重力 left（第4关）');
  {
    const g = new Game(4);
    g.grid[3][1] = 0; g.cardNodes[3][1] = null;
    g.grid[3][g.cols] = 0; g.cardNodes[3][g.cols] = null;
    const moves = g.applyGravity();
    ok(g.grid[3][1] !== 0 && g.grid[3][2] !== 0, '第3行左侧被填充');
    ok(moves.some(m => m.fr === 3 && m.fc === 2 && m.tr === 3 && m.tc === 1), '第3行有左移动画');
    let rowFull = true;
    for (let c = 1; c <= g.cols; c++) {
      if (g.grid[3][c] === 0) {
        for (let c2 = c + 1; c2 <= g.cols; c2++) if (g.grid[3][c2]) rowFull = false;
        break;
      }
    }
    ok(rowFull, '第3行左侧无空洞');
  }

  console.log('\n[4b] 重力 up（第3关）');
  {
    const g = new Game(3);
    const R = g.rows, C = g.cols;
    // 模拟消除顶部第 3、5 列各一格
    g.grid[1][3] = 0; g.cardNodes[1][3] = null;
    g.grid[1][5] = 0; g.cardNodes[1][5] = null;
    const moves = g.applyGravity();
    ok(g.grid[1][3] !== 0, '第3列顶部被填充');
    ok(g.grid[1][5] !== 0, '第5列顶部被填充');
    ok(moves.some(m => m.fc === 3 && m.tr === 1 && m.tc === 3), '第3列有上移动画');
    let cnt = 0;
    for (let r = 1; r <= R; r++) for (let c = 1; c <= C; c++) if (g.grid[r][c]) cnt++;
    ok(cnt === R * C - 2, '上移后卡片数量守恒');
    // 每列顶部无空洞
    let topFull = true;
    for (let c = 1; c <= C; c++) {
      for (let r = 1; r <= R; r++) {
        if (g.grid[r][c] === 0) {
          for (let r2 = r + 1; r2 <= R; r2++) if (g.grid[r2][c]) topFull = false;
          break;
        }
      }
    }
    ok(topFull, '所有列顶部无空洞');
  }

  console.log('\n[5] 冰冻机制（第6关·双层冰）');
  {
    const g = new Game(6);
    const frozenCells = [];
    for (let r = 1; r <= g.rows; r++) for (let c = 1; c <= g.cols; c++) if (g.frozen[r][c]) frozenCells.push([r, c]);
    ok(frozenCells.length >= 5, '冰冻卡数量合理（约30%，含不相邻约束）');

    // 找一对「普+冰」可连接组合：冰卡 + 同类型普通卡
    let ice = null, plain = null;
    outer3:
    for (const cell of frozenCells) {
      const fr = cell[0], fc = cell[1];
      const type = g.cardNodes[fr][fc].type;
      for (let r2 = 1; r2 <= g.rows; r2++) {
        for (let c2 = 1; c2 <= g.cols; c2++) {
          if (r2 === fr && c2 === fc) continue;
          const c2card = g.cardNodes[r2][c2];
          if (!c2card || c2card.type !== type) continue;
          if (g.frozen[r2][c2]) continue; // 必须是普通卡
          if (PathChecker.canConnect(g.grid, g.rows, g.cols, fr, fc, r2, c2)) {
            ice = { r: fr, c: fc };
            plain = { r: r2, c: c2 };
            break outer3;
          }
        }
      }
    }

    if (ice) {
      // 点冰卡 → 选中且冰块保留
      g.onTapCard(ice.r, ice.c);
      ok(g.cardNodes[ice.r][ice.c].state === 'selected', '点击冰卡选中');
      ok(g.frozen[ice.r][ice.c] === 1, '选中后冰块保留');
      // 点普通卡配对 → 普通卡消、冰卡破冰保留
      g.onTapCard(plain.r, plain.c);
      await new Promise(r => setTimeout(r, 600));
      ok(!g.cardNodes[plain.r][plain.c], '普通卡被消除');
      ok(g.cardNodes[ice.r][ice.c] !== null, '冰卡保留在棋盘');
      ok(g.frozen[ice.r][ice.c] === 0, '冰卡已破冰');
      ok(g.cardNodes[ice.r][ice.c].state === 'normal', '破冰卡状态 normal');
      ok(g.cardNodes[ice.r][ice.c].visual.iceAlpha === 0, '破冰卡冰层已消失');
      // 破冰后的卡（普通）再配对一次 → 真正消除
      const type2 = g.cardNodes[ice.r][ice.c].type;
      let pair2 = null;
      outer4:
      for (let r2 = 1; r2 <= g.rows; r2++) {
        for (let c2 = 1; c2 <= g.cols; c2++) {
          if (r2 === ice.r && c2 === ice.c) continue;
          const c2card = g.cardNodes[r2][c2];
          if (!c2card || c2card.type !== type2) continue;
          if (PathChecker.canConnect(g.grid, g.rows, g.cols, ice.r, ice.c, r2, c2)) {
            pair2 = { r: r2, c: c2 };
            break outer4;
          }
        }
      }
      if (pair2) {
        g.onTapCard(ice.r, ice.c);
        g.onTapCard(pair2.r, pair2.c);
        await new Promise(r => setTimeout(r, 600));
        ok(!g.cardNodes[ice.r][ice.c], '破冰卡二次配对后消除');
      } else {
        console.log('  (随机布局未找到二次配对，跳过该项)');
      }
    } else {
      console.log('  (随机布局未找到可连「普+冰」对，该项跳过)');
    }

    // 炸弹直接炸冰冻卡（不崩溃且记账正确）
    g.useBomb();
    await new Promise(r => setTimeout(r, 600));
    ok(g.isProcessing === false, '炸弹流程结束');
    const rem = g.remainingPairs;
    ok(rem >= 0 && rem < 21, '炸弹后剩余对数合理');
  }

  console.log('\n[6] 完整消除与胜利流程（第1关·普通规则）');
  {
    winCalled = false;
    const g = new Game(1);
    let guard = 0;
    while (g.remainingPairs > 0 && guard++ < 100) {
      let found = false;
      outer:
      for (let r1 = 1; r1 <= g.rows; r1++) {
        for (let c1 = 1; c1 <= g.cols; c1++) {
          if (!g.grid[r1][c1]) continue;
          for (let r2 = 1; r2 <= g.rows; r2++) {
            for (let c2 = 1; c2 <= g.cols; c2++) {
              if (r1 === r2 && c1 === c2) continue;
              if (g.grid[r1][c1] !== g.grid[r2][c2]) continue;
              if (PathChecker.canConnect(g.grid, g.rows, g.cols, r1, c1, r2, c2)) {
                g.onTapCard(r1, c1);
                g.onTapCard(r2, c2);
                await new Promise(r => setTimeout(r, 520));
                found = true;
                break outer;
              }
            }
          }
        }
      }
      if (!found) break; // 死局：自动清场是合法胜利路径（下方断言覆盖）
    }
    // 等待胜利回调：正常消除 450ms 记账 + 400ms 面板；死局清场最长 48张×50ms+400ms
    await new Promise(r => setTimeout(r, 3200));
    ok(g.remainingPairs === 0, '消除完所有对（含死局自动清场）');
    ok(g.moves <= 12 && g.moves >= 1, '步数在合法范围（第1关 12 对）');
    ok(winCalled, '触发胜利（showWin 被调用）');
  }

  console.log('\n[7] 重力关胜利流程（第2关·下坠）');
  {
    winCalled = false;
    const g = new Game(2);
    let guard = 0;
    while (g.remainingPairs > 0 && guard++ < 120) {
      let found = false;
      outer:
      for (let r1 = 1; r1 <= g.rows; r1++) {
        for (let c1 = 1; c1 <= g.cols; c1++) {
          if (!g.grid[r1][c1]) continue;
          for (let r2 = 1; r2 <= g.rows; r2++) {
            for (let c2 = 1; c2 <= g.cols; c2++) {
              if (r1 === r2 && c1 === c2) continue;
              if (g.grid[r1][c1] !== g.grid[r2][c2]) continue;
              if (PathChecker.canConnect(g.grid, g.rows, g.cols, r1, c1, r2, c2)) {
                g.onTapCard(r1, c1);
                g.onTapCard(r2, c2);
                await new Promise(r => setTimeout(r, 1400)); // 消除450ms + 最长5格重力动画600ms
                found = true;
                break outer;
              }
            }
          }
        }
      }
      if (!found) break;
    }
    // 等待胜利回调（含死局清场最长时长）
    await new Promise(r => setTimeout(r, 3200));
    ok(winCalled, '重力关最终胜利');
    // 重力后无空洞
    let ok2 = true;
    for (let c = 1; c <= g.cols; c++) {
      for (let r = g.rows; r >= 1; r--) {
        if (g.grid[r][c] === 0) {
          for (let r2 = r - 1; r2 >= 1; r2--) if (g.grid[r2][c]) ok2 = false;
          break;
        }
      }
    }
    ok(ok2, '重力关全程列底无空洞');
  }

  console.log('\n[8] 会话失效（restart 后旧定时器不触发）');
  {
    winCalled = false;
    const g = new Game(1);
    // 找一对可消除的，触发消除流程
    let found = false;
    outer:
    for (let r1 = 1; r1 <= g.rows; r1++) {
      for (let c1 = 1; c1 <= g.cols; c1++) {
        if (!g.grid[r1][c1]) continue;
        for (let r2 = 1; r2 <= g.rows; r2++) {
          for (let c2 = 1; c2 <= g.cols; c2++) {
            if (r1 === r2 && c1 === c2) continue;
            if (g.grid[r1][c1] !== g.grid[r2][c2]) continue;
            if (PathChecker.canConnect(g.grid, g.rows, g.cols, r1, c1, r2, c2)) {
              g.onTapCard(r1, c1);
              g.onTapCard(r2, c2);
              found = true;
              break outer;
            }
          }
        }
      }
    }
    ok(found, '触发一次消除流程');
    // 消除流程进行中（450ms 记账前）立即 restart
    g.restart();
    const expectPairs = g.remainingPairs;
    await new Promise(r => setTimeout(r, 800));
    ok(g.remainingPairs === expectPairs, '旧消除流程未污染新棋盘计数');
    ok(!winCalled, '旧胜利回调未误触发（无结算弹出）');
    ok(g.isProcessing === false, 'restart 后输入已解锁');
  }

  console.log('\n[9] 冰冻关完整通关（第6关·双层冰+单例不卡死）');
  {
    winCalled = false;
    const g = new Game(6);
    let guard = 0;
    while (g.remainingPairs > 0 && guard++ < 150) {
      let found = false;
      outer:
      for (let r1 = 1; r1 <= g.rows; r1++) {
        for (let c1 = 1; c1 <= g.cols; c1++) {
          const card = g.cardNodes[r1][c1];
          if (!card || card.state === 'eliminated') continue;
          for (let r2 = 1; r2 <= g.rows; r2++) {
            for (let c2 = 1; c2 <= g.cols; c2++) {
              if (r1 === r2 && c1 === c2) continue;
              const c2card = g.cardNodes[r2][c2];
              if (!c2card || c2card.state === 'eliminated') continue;
              if (g.grid[r1][c1] !== g.grid[r2][c2]) continue;
              if (PathChecker.canConnect(g.grid, g.rows, g.cols, r1, c1, r2, c2)) {
                g.onTapCard(r1, c1);
                g.onTapCard(r2, c2);
                await new Promise(r => setTimeout(r, 650)); // 无重力关 450ms 记账
                found = true;
                break outer;
              }
            }
          }
        }
      }
      if (!found) break; // 死局 / 剩单例 → 自动清场（合法路径）
    }
    // 等待：消除收尾 + 单例自动清除 + 死局清场最长时长
    await new Promise(r => setTimeout(r, 3600));
    ok(winCalled, '冰冻关最终胜利（双层冰+单例机制不卡死）');
    // 通关后棋盘应已清空
    let left = 0;
    for (let r = 1; r <= g.rows; r++) for (let c = 1; c <= g.cols; c++) {
      if (g.cardNodes[r][c] && g.cardNodes[r][c].state !== 'eliminated') left++;
    }
    ok(left === 0, '通关后棋盘清空');
  }

  console.log('\n[10] 经济系统（工具限次 / 金币 / 商店）');
  {
    const S = GameGlobal.Storage;
    // 清空存档相关 key（不影响前面的关卡测试结果）
    delete memStore['look_coins'];
    delete memStore['look_tools'];

    ok(S.getCoins() === 0, '金币初始 0');
    const t0 = S.getTools();
    ok(t0.hint === 3 && t0.shuffle === 2 && t0.bomb === 1, '工具初始库存 hint3/shuffle2/bomb1');

    // 工具消耗
    ok(S.useTool('hint'), '消耗 1 次提示成功');
    ok(S.getTools().hint === 2, '提示库存减为 2');
    S.useTool('hint');
    S.useTool('hint');
    ok(S.getTools().hint === 0, '提示库存归 0');
    ok(!S.useTool('hint'), '库存 0 时消耗失败');
    ok(S.getTools().bomb === 1, '炸弹库存不受影响');

    // 金币增减与消费
    S.addCoins(100);
    ok(S.getCoins() === 100, '加 100 金币');
    ok(S.spendCoins(60), '消费 60 成功');
    ok(S.getCoins() === 40, '剩余 40');
    ok(!S.spendCoins(100), '余额不足消费失败');

    // 商店购买（走 UI.buyItem 真实路径）
    memStore['look_coins'] = '200';
    GameGlobal.UI.buyItem('buy_hint_5'); // 160
    ok(S.getCoins() === 40, '购买提示×5 后金币 200-160=40');
    ok(S.getTools().hint === 5, '购买后提示库存 0+5=5');
    GameGlobal.UI.buyItem('buy_bomb_1'); // 110 > 40
    ok(S.getCoins() === 40, '金币不足购买失败（金币不变）');
    ok(S.getTools().bomb === 1, '炸弹库存不变');

    // 通关金币：首通 100 / 重复 20（用关卡 2，前面用例已通第 1 关）
    delete memStore['look_best_2'];
    memStore['look_coins'] = '0';
    const g1 = new Game(2);
    g1.onWin(); // 首通
    await new Promise(r => setTimeout(r, 500)); // 等 win 面板回调（mock noop）
    ok(S.getCoins() === 100, '首通奖励 100 金币');
    const g2 = new Game(2);
    g2.onWin(); // 重复通关
    await new Promise(r => setTimeout(r, 500));
    ok(S.getCoins() === 120, '重复通关奖励 20（100+20）');
  }

  console.log('\n' + '='.repeat(40));
  if (process.exitCode) {
    console.log('存在失败用例');
  } else {
    console.log('全部通过 ✓ (' + passed + ' 项断言)');
  }
}

main().catch(e => {
  console.error('测试异常:', e);
  process.exitCode = 1;
});
