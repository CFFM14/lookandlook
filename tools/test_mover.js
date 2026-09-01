/**
 * test_mover.js —— 第 25 关「逃逸的移动卡」专项测试（2 张移动卡，Node 环境，剥离 wx/Canvas）
 * 运行：node tools/test_mover.js
 * 覆盖：配置/开局(满格)/partner 唯一/单例保护/配对消除/命中/静止-启动-往复-逃亡-判负
 */
'use strict';

// ── mock 环境（同 test_logic.js）────────────────
global.GameGlobal = {};
const memStore = {};
global.wx = {
  getStorageSync: (k) => (memStore[k] !== undefined ? memStore[k] : ''),
  setStorageSync: (k, v) => { memStore[k] = v; },
};
function noop() {}
global.GameGlobal.Tween = {
  to(obj, props, dur, ease, cb) {
    for (const k in props) obj[k] = props[k];
    if (cb) cb();
  },
  update: noop,
};
global.GameGlobal.Renderer = {
  spawnFirework: noop, spawnIceShards: noop, spawnBombEffect: noop, spawnWinFireworks: noop,
  updateParticles: noop, invalidateBoardCache: noop,
};
global.GameGlobal.SoundManager = { play: noop, setEnabled: noop, isEnabled: () => true };

let loseCalled = false;
let loseLevel = null;
global.GameGlobal.Main = {
  showWin: noop,
  showLose: (lv) => { loseCalled = true; loseLevel = lv; },
  showToast: noop,
  helpPopupOpen: false,
};

require('../js/config.js');
require('../js/levels.js');
require('../js/pathChecker.js');
require('../js/storage.js');
const Game = require('../js/game.js');
require('../js/ui.js');
Object.assign(global, GameGlobal);

let passed = 0, failed = 0;
function ok(cond, name) {
  if (cond) { passed++; console.log('  ✓ ' + name); }
  else { failed++; console.error('  ✗ FAIL: ' + name); }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** 统计场上普通卡数量（cardNodes 非空） */
function countCards(g) {
  let n = 0;
  for (let r = 1; r <= g.rows; r++) for (let c = 1; c <= g.cols; c++) if (g.cardNodes[r][c]) n++;
  return n;
}
/** 找场上 type 相同的卡列表 */
function findCardsByType(g, type) {
  const out = [];
  for (let r = 1; r <= g.rows; r++) for (let c = 1; c <= g.cols; c++) {
    const cd = g.cardNodes[r][c];
    if (cd && cd.state !== 'eliminated' && cd.type === type) out.push(cd);
  }
  return out;
}
/** 把 partner 卡搬到 (pr, pc)，目标格原有卡交换到 partner 原位置（保持卡数不变） */
function placePartnerAt(g, partner, pr, pc) {
  const origR = partner.r, origC = partner.c;
  const swapCard = g.cardNodes[pr][pc];
  g.cardNodes[origR][origC] = null;
  g.grid[origR][origC] = 0;
  if (swapCard) {
    swapCard.r = origR; swapCard.c = origC;
    const qx = g.logicToPixel(origR, origC);
    swapCard.visual.x = qx.x; swapCard.visual.y = qx.y;
    g.cardNodes[origR][origC] = swapCard;
    g.grid[origR][origC] = swapCard.type;
  }
  partner.r = pr; partner.c = pc;
  const px = g.logicToPixel(pr, pc);
  partner.visual.x = px.x; partner.visual.y = px.y;
  g.cardNodes[pr][pc] = partner;
  g.grid[pr][pc] = partner.type;
}
/** 清空某行所有普通卡（模拟整行打通） */
function clearRow(g, row) {
  for (let c = 1; c <= g.cols; c++) {
    g.grid[row][c] = 0;
    if (g.cardNodes[row][c]) g.cardNodes[row][c] = null;
  }
}

async function main() {
  console.log('\n[1] 第 25 关配置');
  {
    const cfg = GameGlobal.getLevelConfig(25);
    ok(cfg && cfg.mover === true, 'id:25 存在且 mover=true');
    ok(Array.isArray(cfg.moverTypes) && cfg.moverTypes.length === 2, 'moverTypes = 2 种（2 张移动卡）');
    ok(cfg.moverTypes[0] !== cfg.moverTypes[1], '2 张 mover 类型互不相同（避免互配卡死）');
    ok(cfg.rows === 10 && cfg.cols === 8, '棋盘 10 行 × 8 列');
    ok(!cfg.shapeMap, '无 shapeMap（矩形棋盘，非形状关）');
    ok(cfg.bombEnabled === false, '炸弹禁用（保护 partner）');
    const g = new Game(25);
    ok(g.useNewEngine === false, '走旧 2 折引擎 canConnect');
    ok(g.cam === null, '无镜头');
  }

  console.log('\n[2] 开局状态（满格棋盘 + 2 张中心 mover）');
  {
    const g = new Game(25);
    ok(g.movers.length === 2, '创建 2 张移动卡');
    ok(g.movers.every(m => !m.eliminated && m.isMover), '两张 mover 均存活且带红框标记');
    // 位置在中心附近（行 4~7、列 3~6 范围内）
    ok(g.movers.every(m => m.r >= 4 && m.r <= 7 && m.c >= 3 && m.c <= 6),
      'mover 放在中心附近（got: ' + g.movers.map(m => '(' + m.r + ',' + m.c + ')').join(' ') + '）');
    // 两张分开放（不相邻）
    const mdist = Math.abs(g.movers[0].r - g.movers[1].r) + Math.abs(g.movers[0].c - g.movers[1].c);
    ok(mdist > 1, '两张移动卡分开放（不相邻，曼哈顿距离=' + mdist + '）');
    ok(countCards(g) === 78, '场上普通卡 78 张');
    // 满格：grid 空格只有 2 个，且就是 mover 占位格
    let emptyCount = 0, emptyNotMover = 0;
    for (let r = 1; r <= g.rows; r++) for (let c = 1; c <= g.cols; c++) {
      if (g.grid[r][c] === 0) {
        emptyCount++;
        if (!g.movers.some(m => m.r === r && m.c === c)) emptyNotMover++;
      }
    }
    ok(emptyCount === 2, '棋盘仅 2 个空格（mover 占位格）');
    ok(emptyNotMover === 0, '没有额外预留空格（棋盘满格，靠消除解锁空间）');
    // 每种 mover 类型场上恰 1 张 partner
    for (const m of g.movers) {
      ok(findCardsByType(g, m.type).length === 1, 'mover 类型 ' + m.type + ' 场上唯一同类（partner）恰 1 张');
    }
    ok(g.movers.every(m => m.moving === false && m.vx === 0), '开局静止（moving=false, vx=0）');
    ok(g.remainingPairs === 38, '剩余对数 = 38（partner 单卡不计对）');
  }

  console.log('\n[3] 单例保护（两种 partner 不被自动消）');
  {
    const g = new Game(25);
    const partners = g.movers.map(m => findCardsByType(g, m.type)[0]);
    // 只留 2 张 partner，其余卡全部清掉
    for (let r = 1; r <= g.rows; r++) for (let c = 1; c <= g.cols; c++) {
      const cd = g.cardNodes[r][c];
      if (cd && !partners.includes(cd)) { g.grid[r][c] = 0; g.cardNodes[r][c] = null; }
    }
    g.recomputeSingletons();
    ok(g.cardNodes[partners[0].r][partners[0].c] === partners[0], 'partner1 被保护，不会被单例机制吞掉');
    ok(g.cardNodes[partners[1].r][partners[1].c] === partners[1], 'partner2 被保护，不会被单例机制吞掉');
    // mover 全部消除后保护解除
    for (const m of g.movers) { m.eliminated = true; m.state = 'eliminated'; }
    g.recomputeSingletons();
    ok(g.cardNodes[partners[0].r][partners[0].c] === null, 'mover 消除后保护解除，partner 单卡自动消');
  }

  console.log('\n[4] mover 配对消除（点 mover + 点同类）');
  {
    const g = new Game(25);
    const mover = g.movers[0];
    const partner = findCardsByType(g, mover.type)[0];
    // 把 partner 搬到 mover 相邻格，保证 2 折直连
    const pr = mover.r, pc = mover.c + 1 <= g.cols ? mover.c + 1 : mover.c - 1;
    placePartnerAt(g, partner, pr, pc);
    g.onTapMover(mover);
    ok(g.selectedCard === mover, '点 mover 后被选中');
    g.onTapCard(pr, pc);
    await sleep(700);
    ok(mover.eliminated === true, 'mover 被消除（eliminated=true）');
    ok(partner.state === 'eliminated', 'partner 被消除');
    ok(g.cardNodes[pr][pc] === null, 'partner 格子已清空');
    ok(g.selectedCard === null && g.isProcessing === false, '记账完成，锁释放');
    ok(countCards(g) === 77, '消除后场上 77 张');
    ok(g.movers[1] && !g.movers[1].eliminated, '另一张 mover 不受影响');
  }

  console.log('\n[5] mover 命中检测（返回命中的那张）');
  {
    const g = new Game(25);
    const m0 = g.movers[0];
    ok(g.hitTestMover(m0.visual.x, m0.visual.y) === m0, '命中 mover0 中心');
    const m1 = g.movers[1];
    ok(g.hitTestMover(m1.visual.x, m1.visual.y) === m1, '命中 mover1 中心');
    ok(g.hitTestMover(m0.visual.x + 500, m0.visual.y) === null, '远离 mover 不命中');
    m0.state = 'eliminated';
    ok(g.hitTestMover(m0.visual.x, m0.visual.y) === null, '消除后不再命中');
  }

  console.log('\n[6] 静止 → 相邻解锁 → 上下方向启动 → 撞墙反弹往复');
  {
    const g = new Game(25);
    const mover = g.movers[0];
    const y0 = mover.visual.y;
    g.updateMover(100);
    ok(mover.visual.y === y0, '开局静止：周围未解锁时不动');
    // 消除 mover 上邻格（竖方向解锁）→ 应向上移动（不再只是横向）
    const ur = mover.r - 1, uc = mover.c;
    ok(g.grid[ur][uc] !== 0, '上邻格有卡（可消除）');
    g.grid[ur][uc] = 0;
    if (g.cardNodes[ur][uc]) g.cardNodes[ur][uc] = null;
    g.updateMover(100);
    ok(mover.moving === true && mover.dr === -1, '上邻解锁 → 朝上启动（dr=-1）');
    // 多帧统计：mover 应上下移动（撞上方墙反弹，形成上下往复）
    let movedY = false;
    let minY = y0, maxY = y0;
    for (let i = 0; i < 200; i++) {
      g.updateMover(50);
      if (mover.visual.y !== y0) movedY = true;
      if (mover.visual.y < minY) minY = mover.visual.y;
      if (mover.visual.y > maxY) maxY = mover.visual.y;
    }
    ok(movedY === true, '竖方向空间被利用：mover 上下移动');
    ok(minY < maxY, '撞墙反弹形成上下往复（min=' + minY.toFixed(0) + ', max=' + maxY.toFixed(0) + '）');
  }

  console.log('\n[7] 竖方向走廊打通 → 沿列飞出 → 完全出屏判负');
  {
    const g = new Game(25);
    const mover = g.movers[0];
    // 启动：清上邻格 → 朝上
    const ur = mover.r - 1, uc = mover.c;
    g.grid[ur][uc] = 0;
    if (g.cardNodes[ur][uc]) g.cardNodes[ur][uc] = null;
    g.updateMover(50);
    ok(mover.moving === true && mover.dr === -1, '上邻解锁后向上启动');
    // 清空 mover 所在列（该列直通棋盘边缘）→ 一路向上飞出
    for (let r = 1; r <= g.rows; r++) {
      if (r === mover.r && g.cardNodes[r][uc]) { g.cardNodes[r][uc] = null; }
      g.grid[r][uc] = 0;
    }
    loseCalled = false; loseLevel = null;
    let guard = 0;
    while (!g._lost && guard++ < 4000) g.updateMover(100);
    ok(g._lost === true, '竖方向走廊贯通后沿列飞出屏幕（_lost=true）');
    await sleep(800); // 等 onLose 的 _after(600) 回调
    ok(loseCalled === true && loseLevel === 25, 'onLose 触发 Main.showLose(25)');
    ok(g.isProcessing === true, '失败后进入处理锁（防误操作）');
    const yAfter = mover.visual.y;
    g.updateMover(100);
    ok(mover.visual.y === yAfter, '判负后 mover 停止移动');
  }

  console.log('\n[8] 水平方向单侧走廊贯通 → 沿行飞出判负');
  {
    const g = new Game(25);
    const mover = g.movers[0];
    // 启动：清左邻格 → 朝左
    const lc = mover.c - 1;
    ok(g.grid[mover.r][lc] !== 0, '左邻格有卡（可消除）');
    g.grid[mover.r][lc] = 0;
    if (g.cardNodes[mover.r][lc]) g.cardNodes[mover.r][lc] = null;
    g.updateMover(50);
    ok(mover.moving === true && mover.dc === -1, '左邻解锁后向左启动');
    // 清空 mover 所在行左侧走廊（列 1~lc-1）→ 向左直通棋盘边缘
    for (let c = 1; c < mover.c; c++) {
      if (c === lc) continue;
      g.grid[mover.r][c] = 0;
      if (g.cardNodes[mover.r][c]) g.cardNodes[mover.r][c] = null;
    }
    loseCalled = false; loseLevel = null;
    let guard = 0;
    while (!g._lost && guard++ < 4000) g.updateMover(100);
    ok(g._lost === true, '水平单侧贯通后沿行飞出屏幕（_lost=true）');
    await sleep(800);
    ok(loseCalled === true && loseLevel === 25, 'onLose 触发 Main.showLose(25)');
  }

  console.log('\n[9] 点击移动卡 → 暂停；取消选中 → 恢复');
  {
    const g = new Game(25);
    const mover = g.movers[0];
    // 先启动：清上邻格
    const ur = mover.r - 1, uc = mover.c;
    g.grid[ur][uc] = 0;
    if (g.cardNodes[ur][uc]) g.cardNodes[ur][uc] = null;
    g.updateMover(50);
    ok(mover.moving === true, '前置：mover 已启动');
    g.updateMover(100);
    const x1 = mover.visual.x, y1 = mover.visual.y;
    g.updateMover(100);
    ok(mover.visual.x !== x1 || mover.visual.y !== y1,
      '前置：暂停前在移动（' + x1.toFixed(1) + ',' + y1.toFixed(1) + ' → ' +
      mover.visual.x.toFixed(1) + ',' + mover.visual.y.toFixed(1) + '）');
    // 点击选中 → 暂停
    g.onTapMover(mover);
    ok(mover.paused === true && g.selectedCard === mover, '点击后 paused=true 且被选中');
    const x3 = mover.visual.x, y3 = mover.visual.y;
    g.updateMover(200);
    ok(mover.visual.x === x3 && mover.visual.y === y3, '暂停期间 updateMover 位置不变');
    // 再点（取消选中）→ 恢复
    g.onTapMover(mover);
    ok(mover.paused === false && g.selectedCard === null, '取消选中后 paused=false');
    g.updateMover(200);
    ok(mover.visual.x !== x3 || mover.visual.y !== y3,
      '恢复后继续移动（' + x3.toFixed(1) + ',' + y3.toFixed(1) + ' → ' +
      mover.visual.x.toFixed(1) + ',' + mover.visual.y.toFixed(1) + '）');
  }

  console.log('\n[10] 布局分散（同类不扎堆）');
  {
    const g = new Game(25);
    // 统计相邻（上下左右）同型对数
    let sameAdj = 0;
    for (let r = 1; r <= g.rows; r++) for (let c = 1; c <= g.cols; c++) {
      if (g.grid[r][c] === 0) continue;
      if (r < g.rows && g.grid[r + 1][c] !== 0 && g.grid[r + 1][c] === g.grid[r][c]) sameAdj++;
      if (c < g.cols && g.grid[r][c + 1] !== 0 && g.grid[r][c + 1] === g.grid[r][c]) sameAdj++;
    }
    // _spreadTypes 贪心隔开同类，随机铺放时相邻同型通常 20+，这里应极少
    ok(sameAdj <= 6, '相邻同型对数 ≤ 6（实际 ' + sameAdj + '）');
    // mover partner 仍在场且唯一
    const m0 = g.movers[0], m1 = g.movers[1];
    ok(findCardsByType(g, m0.type).length === 1, 'mover0 的 partner 唯一');
    ok(findCardsByType(g, m1.type).length === 1, 'mover1 的 partner 唯一');
  }

  console.log('\n[11] 消除连线端点对准 mover 实时位置');
  {
    const g = new Game(25);
    const mover = g.movers[0];
    const mate = findCardsByType(g, mover.type)[0];
    // 让 mover 移动起来（清上邻格启动）
    const ur = mover.r - 1, uc = mover.c;
    g.grid[ur][uc] = 0;
    if (g.cardNodes[ur][uc]) g.cardNodes[ur][uc] = null;
    g.updateMover(100);
    // 把 partner 搬到与 mover 逻辑格相邻的位置（保证路径可通）
    const pr = mover.r, pc = mover.c + 1 <= g.cols ? mover.c + 1 : mover.c - 1;
    placePartnerAt(g, mate, pr, pc);
    const visX = mover.visual.x, visY = mover.visual.y;
    // 走真实配对流程：点场上 partner → 点 mover
    g.onTapCard(pr, pc);
    g.onTapMover(mover);
    ok(g.connectionLine && g.connectionLine.points, '已建立消除连线');
    const p0 = g.connectionLine.points[0];
    ok(p0.x !== undefined && p0.y !== undefined, '连线起点是像素点（实时位置）');
    ok(Math.abs(p0.x - visX) < 0.001 && Math.abs(p0.y - visY) < 0.001,
      '连线起点 = mover 实际位置（' + p0.x.toFixed(1) + ',' + p0.y.toFixed(1) + '）');
  }

  console.log('\n[12] 移动卡实体挡路（会动的墙）');
  {
    const g = new Game(25);
    const mover = g.movers[0];
    const r = mover.r;
    // 清空 mover 所在行；两端紧邻格放两张同型卡（中间恰是 mover 占位格）
    for (let c = 1; c <= g.cols; c++) {
      g.grid[r][c] = 0;
      if (g.cardNodes[r][c]) g.cardNodes[r][c] = null;
    }
    g.grid[r][2] = 3; g.grid[r][4] = 3;
    // 其余行全部填满障碍 → 直线是唯一 2 折内通路
    for (let rr = 1; rr <= g.rows; rr++) {
      if (rr === r) continue;
      for (let cc = 1; cc <= g.cols; cc++) g.grid[rr][cc] = 9;
    }
    const cardA = { r, c: 2, type: 3 };
    const cardB = { r, c: 4, type: 3 };
    const pathBlocked = g.findConnectPath(cardA, cardB);
    ok(pathBlocked === null, 'mover 挡路：唯一通路被切断（返回 null）');
    const pathOpen = g.findConnectPath(cardA, cardB, true);
    ok(pathOpen !== null, '无视 mover 墙后路径可通（等它移开即可消）');
    // grid 完整恢复（无 -1 墙残留）
    let hasMinusOne = false;
    for (let rr = 1; rr <= g.rows; rr++) for (let cc = 1; cc <= g.cols; cc++) {
      if (g.grid[rr][cc] === -1) hasMinusOne = true;
    }
    ok(!hasMinusOne, '寻路后无 -1 墙残留（临时改动已恢复）');
    ok(g.grid[r][3] === 0, 'mover 占位格恢复为 0（不占 grid）');
    // 死亡兜底：mover 挡路不影响死局判定（hasValidMove 无视 mover 墙，等它移开即可）
    ok(g.hasValidMove() === true, '挡路不算死局（hasValidMove 无视 mover 墙，等它移开即可）');
  }

  console.log('\n[13] 移动卡互相碰撞（不重叠，主动方反弹）');
  {
    const g = new Game(25);
    const a = g.movers[0], b = g.movers[1];
    // 行 4 清空 1~5 列保证移动通畅
    for (let c = 1; c <= 5; c++) {
      g.grid[4][c] = 0;
      if (g.cardNodes[4][c]) g.cardNodes[4][c] = null;
    }
    // a 在 (4,3) 往左；b 在 (4,2) 往左（b 挡在 a 的目标格上，正对相撞）
    a.r = 4; a.c = 3; a.moving = true; a.dr = 0; a.dc = -1;
    const pa = g.logicToPixel(4, 3);
    a.visual.x = pa.x; a.visual.y = pa.y;
    b.r = 4; b.c = 2; b.moving = true; b.dr = 0; b.dc = -1;
    const pb = g.logicToPixel(4, 2);
    b.visual.x = pb.x; b.visual.y = pb.y;
    g.updateMover(16);
    ok(a.dc === 1, 'a 撞到 b 后反弹向右（dc: -1 → 1）');
    ok(b.dc === -1, 'b（被撞方）方向不变，继续向左');
    const ca = g._moverCell(a), cb = g._moverCell(b);
    ok(!(ca.r === cb.r && ca.c === cb.c), '两卡不重叠（占位格不同）');
    // 反方向也堵（a 右边有卡）→ 原地等待不穿模
    g.grid[4][4] = 9;
    const cBefore = a.dc;
    g.updateMover(16);
    ok(a.dc === cBefore, '前后都堵时原地等待（方向保持）');
  }

  console.log('\n[14] 消除不再打断移动（节奏流畅）');
  {
    const g = new Game(25);
    const m = g.movers[0];
    // 启动
    const ur = m.r - 1, uc = m.c;
    g.grid[ur][uc] = 0;
    if (g.cardNodes[ur][uc]) g.cardNodes[ur][uc] = null;
    g.updateMover(50);
    ok(m.moving === true, '前置：mover 已启动');
    ok(!m.hesitateLeft && !m.flying, '常规移动中无犹豫（不会每帧顿一下）');
    const x0 = m.visual.x, y0 = m.visual.y;
    g.updateMover(100);
    ok(m.visual.x !== x0 || m.visual.y !== y0, '常规帧正常移动');
  }

  console.log('\n[15] 出口犹豫（准备溜走前停顿预警）');
  {
    const g = new Game(25);
    const m1 = g.movers[1];
    const r = m1.r;
    // 行 r 全清 → 向左直通边缘
    for (let c = 1; c <= g.cols; c++) {
      g.grid[r][c] = 0;
      if (g.cardNodes[r][c]) g.cardNodes[r][c] = null;
    }
    m1.r = r; m1.c = 2;
    const pm = g.logicToPixel(r, 2);
    m1.visual.x = pm.x; m1.visual.y = pm.y;
    m1.moving = true; m1.dr = 0; m1.dc = -1;
    // 走到出口格 (r,1)
    let guard = 0;
    while (m1.c > 1 && guard++ < 400) g.updateMover(50);
    ok(m1.c === 1, '走到出口格（列 1）');
    // 前方出界 → 应进入犹豫而非立即飞出
    g.updateMover(50);
    ok(m1.hesitateLeft > 0 && m1.flying === false, '前方出界后进入犹豫（未立即飞出）');
    const hx = m1.visual.x;
    g.updateMover(100);
    ok(m1.visual.x === hx, '犹豫期间停在出口不动');
    // 犹豫倒计时用尽 → 开始滑出
    let guard2 = 0;
    while (!m1.flying && guard2++ < 200) g.updateMover(100);
    ok(m1.flying === true, '犹豫结束后开始滑出（flying=true）');
  }

  console.log('\n' + (failed ? '—— 有 ' + failed + ' 项失败 ——' : '—— 全部通过 ✓ ——') + '（通过 ' + passed + ' 项）');
  if (failed) process.exitCode = 1;
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
