'use strict';
/**
 * tools/gen_levels.js —— 形状棋盘批量「注水」关卡生成器
 *
 * 目标：把现有 26 关扩展到 1000+ 关，靠「形状 × 尺寸 × 分区模式 × 卡组 × 冰档」系统化组合。
 *
 * 维度：
 *   · 形状：SHAPES 25 个手工图案（排除 eagle，雄鹰作为第 25 关独家）
 *   · 尺寸：scale k ∈ {1,2,3}（放大后总格数 > MAX_CELLS 则跳过该尺寸，避免真机卡顿）
 *   · 分区模式：single（单区）/ lr（左右分区，左果右蔬）/ tb（上下分区，上果下蔬）
 *   · 卡组（仅单区）：fruit（全盘水果）/ veg（全盘蔬菜）/ mixed（果蔬混合 24 种）
 *   · 冰档：0 / 0.2 / 0.3（形状关冰冻按同类型两两配对，保证可解）
 *
 * 可解性保证（全部复用 game.js 现有机制，已在 25/26 关实证）：
 *   · 每分区 _zoneTypeList 保证池内每种至少一对；_spreadTypes 铺散避免同型扎堆；
 *   · 奇数格补孤卡，结算前 singleton 机制自动收掉，不卡关；
 *   · 大棋盘(>400格)用 viewport 大地图（双指缩放/单指平移）。
 *
 * 输出：js/levels_injected.js —— GameGlobal.INJECTED_LEVELS = [...]
 *   （引用版：仅存 shapeKey/k/zoneMode/cardSet；shapeMap/zonePools 由运行时 config.js 的 expandShapeRef 用 shapes.js 重建，文件体积极小）
 *
 * 运行：node tools/gen_levels.js
 */
const fs = require('fs');
const path = require('path');
const G = require('../js/shapes.js');
const SHAPES = G.SHAPES;
const scaleShape = G.scaleShape;
const shapeSize = G.shapeSize;
const shapeNames = G.shapeNames;

const MAX_CELLS = 2100;          // 放大后总格数上限（15 列原型 k=3 放大为 45x45=2025 格，保留「巨」档以保 1000+ 关；真机若「巨」档明显卡顿再收紧）
const EXCLUDE = new Set(['eagle']); // 雄鹰作为第 25 关独家，不进入注水池
const FROZEN = [0, 0.2, 0.3];

const SHAPE_CN = {
  heart: '爱心', star: '星星', circle: '圆', diamond: '菱形', triangle: '三角',
  square: '方块', ring: '圆环', cross: '十字', crescent: '月牙', flower: '花',
  tree: '树', fish: '鱼', cat: '猫', house: '房子', sun: '太阳', cloud: '云',
  mushroom: '蘑菇', leaf: '叶子', drop: '水滴', smiley: '笑脸', music: '音符',
  crown: '皇冠', gift: '礼物', shield: '盾牌', butterfly: '蝴蝶',
};

const FRUIT = ['f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12'];
const VEG   = ['v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12'];
const MIXED = FRUIT.concat(VEG);

function splitLR(rows) {
  const cols = rows[0].length, mid = Math.ceil(cols / 2);
  return rows.map(row => row.split('').map((ch, c) => (ch === 'A' && c >= mid) ? 'B' : ch).join(''));
}
function splitTB(rows) {
  const R = rows.length, mid = Math.ceil(R / 2);
  return rows.map((row, r) => row.split('').map(ch => (ch === 'A' && r >= mid) ? 'B' : ch).join(''));
}
function countZones(shapeMap) {
  const cnt = {};
  for (const row of shapeMap) for (const ch of row) {
    if (ch !== '.' && ch >= 'A' && ch <= 'H') cnt[ch] = (cnt[ch] || 0) + 1;
  }
  return cnt;
}
function cellCount(shapeMap) {
  let n = 0;
  for (const row of shapeMap) for (const ch of row) if (ch !== '.') n++;
  return n;
}

function buildSpec(o) {
  const cn = SHAPE_CN[o.name] || o.name;
  const sizeTag = o.k === 1 ? '' : (o.k === 2 ? '大' : '巨');
  const zoneTag = o.zoneMode === 'single' ? '' : (o.zoneMode === 'lr' ? '左右' : '上下');
  const cardTag = o.zoneMode === 'single'
    ? (o.cardSet === 'fruit' ? '果' : o.cardSet === 'veg' ? '蔬' : '混')
    : '';
  const iceTag = o.fr === 0 ? '' : (o.fr === 0.2 ? '薄' : '厚');
  // 紧凑变体串（尺寸+卡组+冰+分区，无分隔），仅用「·」把图案名与变体分开，便于在窄卡片上完整显示
  const variant = sizeTag + cardTag + iceTag + zoneTag;
  const name = variant ? (cn + '·' + variant) : cn;

  // 难度分数（用于平滑排序）：尺寸 + 双区 + 冰 + 混合 + 棋盘规模
  const score = o.k
    + (o.zoneMode !== 'single' ? 1 : 0)
    + (o.fr * 2)
    + (o.cardSet === 'mixed' ? 1 : 0)
    + Math.floor(o.cells / 300);
  const difficulty = Math.min(5, Math.max(1, 1 + Math.floor(score / 2)));

  const lv = {
    name: name, difficulty: difficulty,
    frozenRatio: o.fr,
    // 引用版：只存形状名+倍数+分区模式+卡组+冰档，其余（shapeMap/zonePools/rows/cols/
    // cardSets/viewport/fruitTypeCount 等）运行时由 config.js 的 expandShapeRef 用 shapes.js 重建
    shapeKey: o.name, k: o.k, zoneMode: o.zoneMode, cardSet: o.cardSet || null,
  };

  return { score: score, name: o.name, lv: lv };
}

// ── 枚举组合 ──
const names = shapeNames().filter(n => !EXCLUDE.has(n));
const pool = [];

for (const name of names) {
  const base = SHAPES[name];
  for (let k = 1; k <= 3; k++) {
    const scaled = scaleShape(base, k);
    const sz = shapeSize(scaled);
    const cells = cellCount(scaled);
    if (cells > MAX_CELLS) continue;
    const isViewport = cells > 400;

    // 单区：三种卡组 × 三冰档
    for (const cardSet of ['fruit', 'veg', 'mixed']) {
      for (const fr of FROZEN) {
        const zonePools = cardSet === 'mixed'
          ? { 0: MIXED.slice() }
          : (cardSet === 'fruit' ? { 0: FRUIT.slice() } : { 0: VEG.slice() });
        const cardSets = cardSet === 'mixed' ? ['fruit', 'veg'] : [cardSet];
        pool.push(buildSpec({ name, scaled, sz, cells, isViewport, k, zoneMode: 'single', cardSet, fr, zonePools, cardSets }));
      }
    }

    // 双区（左右 / 上下）：固定 左果右蔬 / 上果下蔬，仅当切分后两区都够大（避免退化成单区）
    for (const mode of ['lr', 'tb']) {
      const split = mode === 'lr' ? splitLR(scaled) : splitTB(scaled);
      const zc = countZones(split);
      if ((zc['B'] || 0) < 4) continue;
      const sc = cellCount(split);
      for (const fr of FROZEN) {
        pool.push(buildSpec({
          name, scaled: split, sz: shapeSize(split), cells: sc, isViewport, k,
          zoneMode: mode, cardSet: null, fr,
          zonePools: { 0: FRUIT.slice(), 1: VEG.slice() }, cardSets: ['fruit', 'veg'],
        }));
      }
    }
  }
}

// ── 难度平滑排序，再分配 id（27 起）──
pool.sort((a, b) => (a.score - b.score) || a.name.localeCompare(b.name));
let id = 27;
const levels = pool.map(s => { const lv = s.lv; lv.id = id++; return lv; });

// ── 输出 js/levels_injected.js ──
const lines = [];
lines.push('// 自动生成，勿手改 —— 由 tools/gen_levels.js 产出（形状棋盘批量注水关卡）');
lines.push('// 共 ' + levels.length + ' 关，id 从 27 起，按难度平滑递进。');
lines.push('GameGlobal.INJECTED_LEVELS = [');
for (const lv of levels) {
  lines.push('  {');
  lines.push("    id: " + lv.id + ", name: '" + lv.name + "', difficulty: " + lv.difficulty + ",");
  lines.push("    frozenRatio: " + lv.frozenRatio + ",");
  lines.push("    shapeKey: '" + lv.shapeKey + "', k: " + lv.k + ", zoneMode: '" + lv.zoneMode + "', cardSet: " + (lv.cardSet ? "'" + lv.cardSet + "'" : 'null') + ",");
  lines.push("  },");
}
lines.push('];');
lines.push("if (typeof module !== 'undefined' && module.exports) module.exports = GameGlobal.INJECTED_LEVELS;");

const target = path.join(__dirname, '..', 'js', 'levels_injected.js');
fs.writeFileSync(target, lines.join('\n'), 'utf8');

// ── 统计（用形状库重新推导，不依赖已删除的存储字段）──
const stat = { single: 0, double: 0, frozen: 0, viewport: 0, big: 0 };
for (const lv of levels) {
  if (lv.zoneMode !== 'single') stat.double++; else stat.single++;
  if (lv.frozenRatio > 0) stat.frozen++;
  let s = scaleShape(SHAPES[lv.shapeKey], lv.k);
  if (lv.zoneMode === 'lr') s = splitLR(s); else if (lv.zoneMode === 'tb') s = splitTB(s);
  if (cellCount(s) > 400) { stat.viewport++; stat.big++; }
}
console.log('生成 ' + levels.length + ' 关 → ' + target);
console.log('总关卡数（含 1~26）= ' + (levels.length + 26));
console.log('统计：单区=' + stat.single + ' 双区(左右/上下)=' + stat.double +
  ' 含冰=' + stat.frozen + ' 大地图(viewport)=' + stat.viewport + ' 大棋盘(>400格)=' + stat.big);
