/**
 * check_curve.js —— 关卡难度曲线验证
 *
 * 检查项：
 *  1. difficulty 在全部 576 关中单调不减（无逆序下降）；
 *  2. 生成关（18~576，以第 17 关为起点基准）卡片数量（rows*cols）单调不减；
 *  3. 生成关 fruitTypeCount 单调不减；
 *  4. 输出各章节统计（章节/卡片数范围/冰冻档/重力/难度），便于人工核对曲线。
 *
 * 说明：手工关（1~16）为手调教程关，棋盘规格按机制设计存在小幅波动（如 48→40），
 * 属预期行为，不计入逆序；第 16→17 关为“手工关压轴 → 生成关起点”的设计过渡，单独提示。
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
  if (lv.difficulty < prevDiff) diffDrops.push(`第${lv.id}关 difficulty ${prevDiff}→${lv.difficulty}`);
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
  if (!chapterStats[c]) chapterStats[c] = { cardsMin: Infinity, cardsMax: -Infinity, frozen: new Set(), gravity: new Set(), diff: new Set() };
  const s = chapterStats[c];
  const cards = lv.rows * lv.cols;
  s.cardsMin = Math.min(s.cardsMin, cards);
  s.cardsMax = Math.max(s.cardsMax, cards);
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
  console.log('✓ difficulty 全局单调不减（1~576 无逆序下降）');
}
if (cardDrops.length) {
  console.log('✗ 生成关卡片数量逆序：');
  cardDrops.forEach(d => console.log('   ' + d));
  exit = 1;
} else {
  console.log('✓ 生成关（18~576）卡片数量单调不减');
}
if (typeDrops.length) {
  console.log('✗ 生成关水果种类逆序：');
  typeDrops.forEach(d => console.log('   ' + d));
  exit = 1;
} else {
  console.log('✓ 生成关（18~576）水果种类数量单调不减');
}

// 手工关压轴 → 生成关起点 的过渡提示
const lv16 = LEVELS.find(l => l.id === 16);
const lv17 = LEVELS.find(l => l.id === 17);
const cards16 = lv16.rows * lv16.cols;
const cards17 = lv17.rows * lv17.cols;
const trend = cards17 >= cards16 ? '持平/上升' : `回落 ${cards16 - cards17} 张`;
console.log(`\n过渡提示：第16关（手工关压轴）卡片=${cards16} → 第17关（生成关起点）卡片=${cards17}（${trend}，难度 ${lv16.difficulty}→${lv17.difficulty}）`);

console.log('\n═══ 前 20 关概况 ═══');
for (const lv of LEVELS.slice(0, 20)) {
  console.log(`第${String(lv.id).padStart(3)}关 卡片=${String(lv.rows * lv.cols).padStart(2)} 种类=${String(lv.fruitTypeCount).padStart(2)} 难度=${lv.difficulty} 重力=${lv.gravity || '无'} 冰=${lv.frozenRatio}`);
}

console.log('\n═══ 章节统计（生成关 17~576）═══');
for (const c of Object.keys(chapterStats).map(Number).sort((a, b) => a - b)) {
  const s = chapterStats[c];
  console.log(`第${String(c).padStart(2)}章（关卡${17 + c * 24}~${Math.min(576, 40 + c * 24)}）卡片=${s.cardsMin}~${s.cardsMax} 冰=[${[...s.frozen].join('/')}] 重力=[${[...s.gravity].join('/')}] 难度=[${[...s.diff].join('/')}]`);
}

if (exit) process.exitCode = 1;
else console.log('\n全部检查通过 ✓');
