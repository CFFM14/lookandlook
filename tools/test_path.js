/**
 * test_path.js —— PathChecker 泛化引擎自测（Node 直接跑）
 * 覆盖：旧 canConnect 回归 / findPath 直线·1折·2折 / 3折(多折) / 穿透 / 不穿过起点
 */
'use strict';
global.GameGlobal = {};
var PC = require('../js/pathChecker.js');

var pass = 0, fail = 0;
function ok(cond, name) {
  if (cond) { pass++; console.log('  ✅ ' + name); }
  else { fail++; console.log('  ❌ ' + name); }
}

// 建 rows×cols 网格（含外围圈），fill: {r:c->type}
function mk(rows, cols, fill) {
  var g = [];
  for (var r = 0; r <= rows + 1; r++) { g[r] = []; for (var c = 0; c <= cols + 1; c++) g[r][c] = 0; }
  for (var k in fill) { var p = k.split(','); g[+p[0]][+p[1]] = fill[k]; }
  return g;
}

console.log('— 旧引擎 canConnect 回归 —');
var g1 = mk(4, 4, { '1,1': 5, '1,4': 5 });           // 同行直线
ok(!!PC.canConnect(g1, 4, 4, 1, 1, 1, 4), '直线可连');
var g2 = mk(4, 4, { '1,1': 5, '1,3': 9, '3,3': 5 });  // 需绕外圈
ok(!!PC.canConnect(g2, 4, 4, 1, 1, 3, 3), '绕外圈 1-2 折可连');
var g3 = mk(4, 4, { '2,2': 5, '2,3': 9, '3,2': 9, '3,4': 5 });
// (2,2)→(3,4)：两个 L 拐角 (2,3)/(3,2) 都被 9 堵死，只能 Z 形绕顶行：(2,2)→(1,2)→(1,4)→(3,4) 恰 2 折
ok(!!PC.canConnect(g3, 4, 4, 2, 2, 3, 4), 'Z 形 2 折可连');
var g4 = mk(4, 4, { '1,1': 5, '1,2': 5 });            // 相邻
ok(!!PC.canConnect(g4, 4, 4, 1, 1, 1, 2), '相邻可连');
ok(PC.canConnect(g4, 4, 4, 1, 1, 1, 1) === null, '自身不可连');
var g5 = mk(4, 4, { '1,1': 5, '1,2': 6 });
ok(PC.canConnect(g5, 4, 4, 1, 1, 1, 2) === null, '异类不可连');

console.log('— 新引擎 findPath 基础（maxTurns=2, pierce=0）应与旧引擎一致 —');
ok(!!PC.findPath(g1, 4, 4, 1, 1, 1, 4), '直线可连');
ok(!!PC.findPath(g2, 4, 4, 1, 1, 3, 3), '绕外圈可连');
ok(!!PC.findPath(g3, 4, 4, 2, 2, 3, 4), 'Z 形可连');
ok(PC.findPath(g5, 4, 4, 1, 1, 1, 2) === null, '异类不可连');

console.log('— 多折（maxTurns=3）：被围到必须 3 折的场景 —');
// 外圈恒空，多数局 2 折就够；3 折的价值在「内部被围、外圈绕进去不够折」。
// 先验证一个普通外圈 2 折对照例（起点右/下皆堵，绕外圈 2 折到对角）：
var g6 = mk(3, 3, { '1,1': 5, '1,2': 9, '2,1': 9, '2,2': 9, '3,3': 5 });
// (1,1)→(3,3)：(1,1)→(0,1)→(0,3)→(3,3)，2 折
ok(!!PC.findPath(g6, 3, 3, 1, 1, 3, 3, { maxTurns: 2 }), '外圈 2 折可连（对照）');

// 必须 3 折的场景（5x5）：
//  . . . . .
//  . 5 9 . .
//  . 9 9 9 .
//  . . 9 5 .
//  . . . . .
// (2,2)→(4,4)：起点右/下皆 9，只能先上或先左；枚举所有 2 折路径均被 9 墙截断，
// 唯一通路 (2,2)→(2,1)→(5,1)→(5,4)→(4,4) 恰需 3 折。
var g7 = mk(5, 5, {
  '2,2': 5, '2,3': 9,
  '3,2': 9, '3,3': 9, '3,4': 9,
  '4,3': 9, '4,4': 5,
});
ok(PC.findPath(g7, 5, 5, 2, 2, 4, 4, { maxTurns: 2 }) === null, '2 折连不上（被围）');
ok(PC.canConnect(g7, 5, 5, 2, 2, 4, 4) === null, '旧引擎也连不上（对照一致）');
var p7 = PC.findPath(g7, 5, 5, 2, 2, 4, 4, { maxTurns: 3 });
ok(!!p7, '3 折能连上（多折解锁）');
ok(p7 && p7.length === 5, '路径恰为 3 折（5 个拐点） got=' + (p7 && p7.length));

console.log('— 穿透（maxPierce=1）—');
//  5 9 5  横排：中间被 9 挡死，1 穿透可直穿
var g8 = mk(3, 3, { '2,1': 5, '2,2': 9, '2,3': 5 });
ok(PC.findPath(g8, 3, 3, 2, 1, 2, 3, { maxTurns: 2 }) !== null, '无穿透：可绕外圈连上（对照）');
// 造一个绕外圈也不够、必须穿透的：9 墙封死 + 目标被围
//  9 9 9
//  9 5 9   中间 5 完全被围 → 任何路径都要穿 1 个 9
//  9 9 9   另一个 5 放 (1,1)? 被 9 围。放外围圈不行（恒空不能放卡）。4x4：
//  . . . .
//  . 9 9 .
//  . 9 5 9 → (3,4)=9
//  . 9 9 9
// 另一个 5 在 (1,1)：(1,1)→(3,3) 需穿 (2,2) 或 (2,3)/(3,2) 任一 9。
var g9 = mk(4, 4, {
  '1,1': 5,
  '2,2': 9, '2,3': 9,
  '3,2': 9, '3,3': 5, '3,4': 9,
  '4,2': 9, '4,3': 9, '4,4': 9,
});
ok(PC.findPath(g9, 4, 4, 1, 1, 3, 3, { maxTurns: 3 }) === null, '被围死：3 折无穿透也连不上');
var p9 = PC.findPath(g9, 4, 4, 1, 1, 3, 3, { maxTurns: 3, maxPierce: 1 });
ok(!!p9, '穿透 1 个阻挡后能连上');

console.log('— 路径不穿过起点卡 —');
var p = PC.findPath(g1, 4, 4, 1, 1, 1, 4, { maxTurns: 3, maxPierce: 1 });
var thruStart = false;
// 压缩后的拐点不含中间经过起点的情况（起点只在 index 0）
for (var i = 1; i < p.length; i++) if (p[i].r === 1 && p[i].c === 1) thruStart = true;
ok(!thruStart, '路径拐点不重复经过起点');

console.log('— 拐点压缩正确性 —');
var p2 = PC.findPath(g1, 4, 4, 1, 1, 1, 4);
ok(p2.length === 2, '直线压缩为 2 个点');
var p3 = PC.findPath(g2, 4, 4, 1, 1, 3, 3);
ok(p3.length >= 2 && p3.length <= 4, '绕外圈拐点数合理 got=' + p3.length);

console.log('\n结果：' + pass + ' 通过, ' + fail + ' 失败');
process.exit(fail ? 1 : 0);
