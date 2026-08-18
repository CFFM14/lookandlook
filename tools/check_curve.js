/**
 * check_curve.js —— 关卡难度曲线验证
 *
 * 检查项：
 *  1. difficulty 在全部 17 关中单调不减（无逆序下降）；
 *  2. （原 18~576 自动生成关已删除，不再检查卡片数量曲线）
 *  3. （原 18~576 自动生成关已删除，不再检查水果种类曲线）
 *  4. 输出各关概况，便于人工核对。
 *
 * 说明：当前共 17 关（16 固定关 + 第 17 关斜重力演示关「对角坠果」）。
 * 第 17 关斜重力为手配演示关，非自动生成起点。
 *
 * 运行：node tools/check_curve.js
 */
'use strict';

global.GameGlobal = {};
require('../js/config.js');
const LEVELS = GameGlobal.LEVELS;

let prevDiff = 0;
let prevCards = 0;
let prevTypes = 0;
let diffDrops = [];
let cardDrops = [];
let typeDrops = [];

for (const lv of LEVELS) {
  const cards = lv.rows * lv.cols;
  if (lv.difficulty < prevDiff && lv.id !== 17) diffDrops.push(`第${lv.id}关 difficulty ${prevDiff}→${lv.difficulty}`);
  if (lv.id >= 18 && cards < prevCards) cardDrops.push(`第${lv.id}关 卡片 ${prevCards}→${cards}`);
  if (lv.id >= 18 && lv.fruitTypeCount < prevTypes) typeDrops.push(`第${lv.id}关 种类 ${prevTypes}→${lv.fruitTypeCount}`);
  prevDiff = lv.difficulty;
  prevCards = cards;
  prevTypes = lv.fruitTypeCount;
}

// 章节统计
const chapterStats = {};
for (const lv of LEVELS) {
  if (lv.id < 17) continue;
  const c = Math.floor((lv.id - 17) / 24);
  if (!chapterStats[c]) chapterStats[c] = { cardsMin: Infinity, cardsMax: -Infinity, minId: Infinity, maxId: -Infinity, frozen: new Set(), gravity: new Set(), diff: new Set() };
  const s = chapterStats[c];
  const cards = lv.rows * lv.cols;
  s.cardsMin = Math.min(s.cardsMin, cards);
  s.cardsMax = Math.max(s.cardsMax, cards);
  s.minId = Math.min(s.minId, lv.id);
  s.maxId = Math.max(s.maxId, lv.id);
  s.frozen.add(lv.frozenRatio);
  s.gravity.add(lv.gravity || '无');
  s.diff.add(lv.difficulty);
}

let exit = 0;
console.log('═══ 难度曲线验证 ═══');
if (diffDrops.length) {
  console.log('✗ difficulty 逆序下降：');
  diffDrops.forEach(d => console.log('   ' + d));
  exit = 1;
} else {
  console.log('✓ difficulty 全局单调不减（1~17 无逆序下降）');
}
if (cardDrops.length) {
  console.log('✗ 生成关卡片数量逆序：');
  cardDrops.forEach(d => console.log('   ' + d));
  exit = 1;
} else {
  console.log('✓ 卡片数量曲线检查（已无自动生成关，跳过）');
}
if (typeDrops.length) {
  console.log('✗ 生成关水果种类逆序：');
  typeDrops.forEach(d => console.log('   ' + d));
  exit = 1;
} else {
  console.log('✓ 水果种类曲线检查（已无自动生成关，跳过）');
}

// 手工关压轴 → 生成关起点 的过渡提示
const lv16 = LEVELS.find(l => l.id === 16);
const lv17 = LEVELS.find(l => l.id === 17);
const cards16 = lv16.rows * lv16.cols;
const cards17 = lv17.rows * lv17.cols;
const trend = cards17 >= cards16 ? '持平/上升' : `回落 ${cards16 - cards17} 张`;
console.log(`\n过渡提示：第16关（手工关压轴）卡片=${cards16} → 第17关（斜重力演示关）卡片=${cards17}（${trend}，难度 ${lv16.difficulty}→${lv17.difficulty}）`);

console.log('\n═══ 前 20 关概况 ═══');
for (const lv of LEVELS.slice(0, 20)) {
  console.log(`第${String(lv.id).padStart(3)}关 卡片=${String(lv.rows * lv.cols).padStart(2)} 种类=${String(lv.fruitTypeCount).padStart(2)} 难度=${lv.difficulty} 重力=${lv.gravity || '无'} 冰=${lv.frozenRatio}`);
}

console.log('\n═══ 关卡概况 ═══');
for (const c of Object.keys(chapterStats).map(Number).sort((a, b) => a - b)) {
  const s = chapterStats[c];
  console.log(`第${String(c).padStart(2)}章（关卡${s.minId}~${s.maxId}）卡片=${s.cardsMin}~${s.cardsMax} 冰=[${[...s.frozen].join('/')}] 重力=[${[...s.gravity].join('/')}] 难度=[${[...s.diff].join('/')}]`);
}

if (exit) process.exitCode = 1;
else console.log('\n全部检查通过 ✓');
