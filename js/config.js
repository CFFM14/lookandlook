/**
 * config.js —— 全局配置：常量 + 24 个关卡（16 固定 + 8 斜重力）定义 + 网格尺寸自适应
 *
 * 坐标系统（Canvas 2D，y 轴向下为正）：
 *   逻辑索引 1..ROWS / 1..COLS 为卡片，0 与 ROWS+1 / COLS+1 为外围可穿越空区域
 *   卡片中心 x = ox + (c-1)*(cw+gx) + cw/2
 *              y = oy + (r-1)*(ch+gy) + ch/2      （row 1 在屏幕上方）
 *   ox/oy 为网格区域左上角（网格左边缘 / 上边缘）
 */

GameGlobal.DESIGN_W = 390;
GameGlobal.DESIGN_H = 844;

// 形状素材库（运行时加载，用于特殊关 shapeMap 的按需展开，避免把放大后的字符画写死进 special_levels.js）
require('./shapes.js');

// 注水关「引用版」（只有 shapeKey/k/zoneMode/cardSet）在运行时展开成完整 shapeMap/zonePools/rows/cols，
// 用 shapes.js 重建 —— 这样 special_levels.js 只存引用版（几十 KB）。
(function () {
  var FRUIT = ['f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12'];
  var VEG   = ['v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12'];
  function splitLR(rows) {
    var cols = rows[0].length, mid = Math.ceil(cols / 2);
    return rows.map(function (row) {
      return row.split('').map(function (ch, c) { return (ch === 'A' && c >= mid) ? 'B' : ch; }).join('');
    });
  }
  function splitTB(rows) {
    var R = rows.length, mid = Math.ceil(R / 2);
    return rows.map(function (row, r) {
      return row.split('').map(function (ch) { return (ch === 'A' && r >= mid) ? 'B' : ch; }).join('');
    });
  }
  GameGlobal.expandShapeRef = function (cfg) {
    if (!cfg.shapeKey || cfg.shapeMap) return cfg;
    var base = GameGlobal.SHAPES[cfg.shapeKey];
    if (!base) return cfg;
    var scaled = GameGlobal.scaleShape(base, cfg.k || 1);
    if (cfg.zoneMode === 'lr') scaled = splitLR(scaled);
    else if (cfg.zoneMode === 'tb') scaled = splitTB(scaled);
    cfg.shapeMap = scaled;
    var sz = GameGlobal.shapeSize(scaled);
    cfg.rows = sz.rows; cfg.cols = sz.cols;
    if (cfg.zoneMode === 'single') {
      var pool = cfg.cardSet === 'mixed' ? FRUIT.concat(VEG)
        : (cfg.cardSet === 'fruit' ? FRUIT : VEG);
      cfg.zonePools = { 0: pool };
    } else {
      cfg.zonePools = { 0: FRUIT.slice(), 1: VEG.slice() };
    }
    // 常量 / 派生字段：不再写死进 special_levels.js，运行时补全，文件体积极小
    cfg.fruitTypeCount = 12;
    cfg.gravity = null;
    cfg.hintEnabled = true;
    cfg.bombEnabled = true;
    cfg.shuffleEnabled = true;
    cfg.cardSets = cfg.zoneMode === 'single'
      ? (cfg.cardSet === 'mixed' ? ['fruit', 'veg'] : [cfg.cardSet])
      : ['fruit', 'veg'];
    // 大棋盘 → 大地图（双指缩放/单指平移）；否则允许缩放手势（心形等）
    var cells = 0, ri, ci;
    for (ri = 0; ri < scaled.length; ri++) for (ci = 0; ci < scaled[ri].length; ci++) if (scaled[ri][ci] !== '.') cells++;
    cfg.viewport = cells > 400;
    cfg.zoomable = !cfg.viewport;
    return cfg;
  };
})();

/** 布局常量 */
GameGlobal.TOP_BAR_H = 96;       // 顶部信息区高度（返回/关卡名/计时）
GameGlobal.BOTTOM_BAR_H = 116;    // 底部工具按钮区高度
GameGlobal.GRID_MARGIN_X = 12;    // 网格左右留白
// 卡片重叠比例（仿原版 Cocos 负间距 -12/-26：卡片互相叠放，视觉紧凑）。
// 0.12 ≈ 卡片边长 12% 被相邻卡片覆盖（比 0.18 略宽松一丁点）；连线的外围通道逻辑不受影响。
GameGlobal.GRID_OVERLAP_RATIO = 0.12;

/** 移动卡（mover）关卡参数：speed=移动速度，escapeSpeed=飞出滑行速度（px/s，越小越容易点中），
 *  hesitate=跑到出口准备溜走前的"犹豫"停顿毫秒（预警 + 给玩家最后机会点住它） */
GameGlobal.MOVER_CFG = { speed: 35, escapeSpeed: 35, hesitate: 900 };

/** 水果名称（与 images/fruit_01~12.png 一一对应） */
GameGlobal.FRUIT_NAMES = [
  '柚子', '桃子', '梨子', '橘子', '紫葡萄', '红苹果',
  '草莓', '菠萝', '西瓜', '青苹果', '青葡萄', '香蕉'
];

/**
 * 多卡组定义：让分区可指定不同主题（fruit 水果 / veg 蔬菜，未来可扩）。
 * 配置键：
 *   - prefix：card.type 的语义前缀，如 'f' → 'f1'，'v' → 'v1'
 *   - assetPrefix：render.js 拿去 images 字典的键前缀，如 'fruit_' → images['fruit_01']
 *   - names：可选的展示名数组（与 images/veg_01~12.png 一一对应）
 * 1~24 普通关默认只走 fruit 套，card.type 仍是数字 1~12（零改动）；特殊关（含 25/26）写 cardSets 后切语义串。
 */
GameGlobal.CARD_SETS = {
  fruit: { prefix: 'f', assetPrefix: 'fruit_', names: GameGlobal.FRUIT_NAMES },
  veg:   { prefix: 'v', assetPrefix: 'veg_',
    names: ['茄子','南瓜','西兰花','洋葱','胡萝卜','青辣椒','红薯','大蒜','蘑菇','土豆','红辣椒','白菜'] },
};
/** 蔬菜名称（与 images/veg_01~12.png 一一对应） */
GameGlobal.VEG_NAMES = GameGlobal.CARD_SETS.veg.names;

/** 把 card.type（'f3'/'v3'/数字 3）映射成 images 字典键 'fruit_03'/'veg_03' */
GameGlobal.cardTypeToAssetKey = function (type) {
  if (typeof type === 'string' && type.length >= 2) {
    var cs = GameGlobal.CARD_SETS[type.charAt(0) === 'v' ? 'veg' : 'fruit'];
    var num = parseInt(type.substring(1), 10);
    if (cs && num >= 1 && num <= 12) return cs.assetPrefix + (num < 10 ? '0' + num : '' + num);
  }
  // 老关：纯数字 type（如 3）→ fruit_03
  if (typeof type === 'number' || (typeof type === 'string' && /^\d+$/.test(type))) {
    var n = +type;
    if (n >= 1 && n <= 12) return 'fruit_' + (n < 10 ? '0' + n : '' + n);
  }
  return '';
};

/** 分区名称（玩法说明 / 提示用，中性命名；分区视觉现在靠卡片图案区分，不再用边框颜色） */
GameGlobal.ZONE_NAMES = ['左区', '右区', '中区', '四区', '五区', '六区'];

/**
 * 关卡配置：前 16 关为手调配好的经典关（1普通 → 2下坠 → 3上浮 → 4左移 → 5右移 → 6冰冻…），
 * 第 17~20 关为 4 个斜向（对角线）重力演示关「对角坠果」（消除后水果分别滑向 右下/左下/右上/左上 角）。
 * 不再自动生成 17~576 的随机关卡。
 */
/** 特殊关卡（手调形状演示关）：第 27 关展翅雄鹰、第 26 关心心相印。
 *  固定排在「特殊关卡」列表最前（id 27/26），后面接 gen_levels.js 生成的注水关（id 从 28 起）。
 *  注：id 25 已被普通关第 25 关「逃逸的移动卡」（移动卡玩法）占用，雄鹰改占 27 号避免 getLevelConfig 冲突。
 *  _category 由 getLevelConfig 命中时打标；这里只放纯配置。 */
var SPECIAL_HANDBOOK = [
  {
    id: 27,
    name: '展翅雄鹰',
    desc: '分区棋盘：左翅12种蔬菜·右翅12种水果·中间混合（全24种上阵）',
    difficulty: 5,
    rows: 20, cols: 40, fruitTypeCount: 12,
    gravity: null, frozenRatio: 0,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    cardSets: ['fruit', 'veg'],
    viewport: true, cardSize: 46,
    shapeMap: [
      '................CCCCCCCC................',
      '................CCCCCCCC................',
      '....AAAAAA......CCCCCCCC......BBBBBB....',
      '....AAAAAA......CCCCCCCC......BBBBBB....',
      '..AAAAAAAAAA..CCCCCCCCCCCC..BBBBBBBBBB..',
      '..AAAAAAAAAA..CCCCCCCCCCCC..BBBBBBBBBB..',
      'AAAAAAAAAAAAAACCCCCCCCCCCCCCBBBBBBBBBBBB',
      'AAAAAAAAAAAAAACCCCCCCCCCCCCCBBBBBBBBBBBB',
      'AAAAAAAAAAAAAACCCCCCCCCCCCCCBBBBBBBBBBBB',
      'AAAAAAAAAAAAAACCCCCCCCCCCCCCBBBBBBBBBBBB',
      '..AAAAAAAAAA..CCCCCCCCCCCC..BBBBBBBB....',
      '..AAAAAAAAAA..CCCCCCCCCCCC..BBBBBBBB....',
      '....AAAAAAAA..CCCCCCCCCCCC..BBBBBB......',
      '....AAAAAAAA..CCCCCCCCCCCC..BBBBBB......',
      '......AAAAAA....CCCCCCCC....BBBBBB......',
      '......AAAAAA....CCCCCCCC....BBBBBB......',
      '................CCCCCCCC................',
      '................CCCCCCCC................',
      '................CC....CC................',
      '................CC....CC................',
    ],
    zonePools: {
      0: ['v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12'],
      1: ['f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12'],
      2: ['v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12','f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12'],
    },
  },
  {
    id: 26,
    name: '心心相印',
    desc: '心形棋盘：全盘蔬菜主题',
    difficulty: 4,
    rows: 10, cols: 11, fruitTypeCount: 12,
    gravity: null, frozenRatio: 0,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    cardSets: ['veg'],
    viewport: false, zoomable: true,
    shapeMap: [
      '.AA.AAA.AA.',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      '.AAAAAAAAA.',
      '..AAAAAAA..',
      '...AAAAA...',
      '....AAA....',
      '.....A.....',
      '.....A.....',
    ],
    zonePools: { 0: ['v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12'] },
  },
];

GameGlobal.LEVELS = (function () {
  var HANDBOOK = [
    {
      // 第1关【水果初识】：经典连连看入门，无重力、无冰冻，12 种水果（10×8 棋盘），点两张相同水果连线消除
      id: 1, name: '水果初识', desc: '轻松入门，认识水果', difficulty: 1,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: null, frozenRatio: 0,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      // 第2关【果果下坠】：经典玩法 + 下坠重力，消除后水果向下掉落补充空位（12 种水果）
      id: 2, name: '果果下坠', desc: '消除后水果会往下掉落哦', difficulty: 1,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: 'down', frozenRatio: 0,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      // 第3关【果果上浮】：经典玩法 + 上浮重力，消除后水果向上飘动（12 种水果）
      id: 3, name: '果果上浮', desc: '消除后水果向上飘动', difficulty: 2,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: 'up', frozenRatio: 0,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      // 第4关【左移风暴】：经典玩法 + 左移重力，消除后水果向左滑动（12 种水果，10×8 棋盘）
      id: 4, name: '左移风暴', desc: '消除后水果向左移动', difficulty: 2,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: 'left', frozenRatio: 0,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      // 第5关【右移风暴】：经典玩法 + 右移重力，消除后水果向右滑动（12 种水果，10×8 棋盘）
      id: 5, name: '右移风暴', desc: '消除后水果向右移动', difficulty: 3,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: 'right', frozenRatio: 0,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      // 第6关【冰封之果】：约 30% 冰冻卡片，冰住的果子要点两下才能消除，无重力（入门冰关）
      id: 6, name: '冰封之果', desc: '冰住的果子要点击两次才能消除', difficulty: 3,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: null, frozenRatio: 0.3,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      // 第7关【下坠冰雨】：下坠重力 + 冰（25%），下落与破冰双重操作
      id: 7, name: '下坠冰雨', desc: '下坠 + 冰块，双重考验！', difficulty: 3,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: 'down', frozenRatio: 0.25,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      // 第8关【上浮冰晶】：上浮重力 + 冰（25%），水果上飘同时破冰
      id: 8, name: '上浮冰晶', desc: '上浮 + 冰块，越玩越难', difficulty: 3,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: 'up', frozenRatio: 0.25,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      // 第9关【左移冰川】：左移重力 + 冰（30%），向左滑动并破冰
      id: 9, name: '左移冰川', desc: '左移 + 冰块，冰封挑战', difficulty: 4,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: 'left', frozenRatio: 0.3,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      // 第10关【终极冰暴】：右移重力 + 冰（30%），10×8 棋盘，向右滑动破冰
      id: 10, name: '终极冰暴', desc: '右移 + 冰块，终极试炼！', difficulty: 4,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: 'right', frozenRatio: 0.3,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      // 第11关【寒潮下坠】：下坠重力 + 更厚冰（35%），冰更多更难
      id: 11, name: '寒潮下坠', desc: '更冷的坠落，更厚的冰', difficulty: 4,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: 'down', frozenRatio: 0.35,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      // 第12关【寒潮上浮】：上浮重力 + 厚冰（35%）
      id: 12, name: '寒潮上浮', desc: '冰晶上飘，寒意逼人', difficulty: 4,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: 'up', frozenRatio: 0.35,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      // 第13关【左移寒潮】：左移重力 + 厚冰（35%）
      id: 13, name: '左移寒潮', desc: '寒潮向左席卷而来', difficulty: 4,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: 'left', frozenRatio: 0.35,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      // 第14关【右移寒潮】：右移重力 + 深冻（40%），12 种水果，难度拉满
      id: 14, name: '右移寒潮', desc: '右移 + 深冻，寸步难行', difficulty: 5,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: 'right', frozenRatio: 0.4,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      // 第15关【极地冰牢】：下坠重力 + 厚冰（40%），10×8 棋盘，九层冰墙
      id: 15, name: '极地冰牢', desc: '九层冰墙，冰封挑战', difficulty: 5,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: 'down', frozenRatio: 0.4,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      // 第16关【万果归一】：右移重力 + 深冻（40%），12 种水果，最终试炼关
      id: 16, name: '万果归一', desc: '终极冰封王座，最后的试炼！', difficulty: 5,
      rows: 10, cols: 8, fruitTypeCount: 12,
      gravity: 'right', frozenRatio: 0.4,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
  ];

  /**
   * 重力可选值（gravity）：
   *   经典/无：null
   *   单轴：'down' 下坠 / 'up' 上浮 / 'left' 左移 / 'right' 右移
   *   斜向（往角落）：'downRight' 右下 / 'downLeft' 左下 / 'upRight' 右上 / 'upLeft' 左上
   * 冰冻档位（frozenRatio）：0（无）/ 0.2 / 0.3 / 0.4
   */
  var GRAVITY_DESC = {
    null: '经典连连看，眼疾手快',
    down: '消除后水果会往下掉落',
    up: '消除后水果向上飘动',
    left: '消除后水果向左移动',
    right: '消除后水果向右移动',
    downRight: '消除后水果沿对角线向右下滑落（斜向坠落）',
    downLeft: '消除后水果沿对角线向左下滑落（斜向坠落）',
    upRight: '消除后水果沿对角线向右上滑落（斜向坠落）',
    upLeft: '消除后水果沿对角线向左上滑落（斜向坠落）',
  };

  var levels = [];
  for (var h = 0; h < HANDBOOK.length; h++) levels.push(HANDBOOK[h]);

  // ── 斜向（往角落）重力关：紧跟 16 固定关之后，共 8 关 ──
  // 第 17~20 关：纯斜坠落（无冰）；第 21~24 关：冰+斜坠落（0.3 冰冻）。
  // 两批都用同一 10×8 棋盘、仅重力方向不同（控制变量对比 4 个角）。
  // 想换方向改 gravity 即可：
  //   'downRight' 右下 | 'downLeft' 左下 | 'upRight' 右上 | 'upLeft' 左上
  // 第 17~20 关：纯斜坠落（无冰）
  levels.push({
    // 第17关【右下坠】：斜向重力演示关，消除后水果沿对角线向右下滑落（无冰）
    id: 17,
    name: '右下坠',
    desc: '斜向右下角坠落',
    difficulty: 3,
    rows: 10, cols: 8, fruitTypeCount: 12,
    gravity: 'downRight', frozenRatio: 0,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
  });
  levels.push({
    // 第18关【左下坠】：斜向重力演示关，水果向左下滑落（无冰）
    id: 18,
    name: '左下坠',
    desc: '斜向左下角坠落',
    difficulty: 3,
    rows: 10, cols: 8, fruitTypeCount: 12,
    gravity: 'downLeft', frozenRatio: 0,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
  });
  levels.push({
    // 第19关【右上坠】：斜向重力演示关，水果向右上滑落（无冰）
    id: 19,
    name: '右上坠',
    desc: '斜向右上角坠落',
    difficulty: 3,
    rows: 10, cols: 8, fruitTypeCount: 12,
    gravity: 'upRight', frozenRatio: 0,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
  });
  levels.push({
    // 第20关【左上坠】：斜向重力演示关，水果向左上滑落（无冰）
    id: 20,
    name: '左上坠',
    desc: '斜向左上角坠落',
    difficulty: 3,
    rows: 10, cols: 8, fruitTypeCount: 12,
    gravity: 'upLeft', frozenRatio: 0,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
  });
  // 第 21~24 关：冰 + 斜坠落（0.3 冰冻，成对冻结保证可解）
  levels.push({
    // 第21关【右下冰坠】：斜向重力（右下）+ 冰（30%），下落同时破冰
    id: 21,
    name: '右下冰坠',
    desc: '斜向右下角坠落，还有冰块！',
    difficulty: 4,
    rows: 10, cols: 8, fruitTypeCount: 12,
    gravity: 'downRight', frozenRatio: 0.3,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
  });
  levels.push({
    // 第22关【左下冰坠】：斜向重力（左下）+ 冰（30%）
    id: 22,
    name: '左下冰坠',
    desc: '斜向左下角坠落，还有冰块！',
    difficulty: 4,
    rows: 10, cols: 8, fruitTypeCount: 12,
    gravity: 'downLeft', frozenRatio: 0.3,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
  });
  levels.push({
    // 第23关【右上冰坠】：斜向重力（右上）+ 冰（30%）
    id: 23,
    name: '右上冰坠',
    desc: '斜向右上角坠落，还有冰块！',
    difficulty: 4,
    rows: 10, cols: 8, fruitTypeCount: 12,
    gravity: 'upRight', frozenRatio: 0.3,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
  });
  levels.push({
    // 第24关【左上冰坠】：斜向重力（左上）+ 冰（30%），斜向重力关收尾
    id: 24,
    name: '左上冰坠',
    desc: '斜向左上角坠落，还有冰块！',
    difficulty: 4,
    rows: 10, cols: 8, fruitTypeCount: 12,
    gravity: 'upLeft', frozenRatio: 0.3,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
  });
  levels.push({
    // 第25关【逃逸的移动卡】：棋盘上有 2 张会移动的卡片（柚子/桃子，红框标识），找到并消除它们的同类，别让它们飞出屏幕！
    // 布局：不预留空格（棋盘满格），mover 占中心 2 格；mover 类型各只 1 张 partner（场上唯一同类）；炸弹禁用保护 partner。
    id: 25,
    name: '逃逸的移动卡',
    desc: '有两张卡片会自己移动，找到并消除它们的同类，别让它们飞出屏幕！',
    difficulty: 2,
    rows: 10, cols: 8, fruitTypeCount: 12,
    gravity: null, frozenRatio: 0,
    mover: true, moverTypes: [1, 2],
    hintEnabled: true, bombEnabled: false, shuffleEnabled: true,
  });

  return levels;
})();

GameGlobal.TOTAL_LEVELS = GameGlobal.LEVELS.length;
// 特殊关卡：27(雄鹰)/26(心形) 手调形状关 在前，gen_levels.js 生成的注水关（id 从 28 起，27 留作雄鹰）在后，统一顺序解锁
require('./special_levels.js');
GameGlobal.SPECIAL_LEVELS = SPECIAL_HANDBOOK.concat(GameGlobal.SPECIAL_LEVELS || []);
GameGlobal.TOTAL_SPECIAL = GameGlobal.SPECIAL_LEVELS.length;

// 巨物关卡：特殊关里 k=3（放大 3 倍的大棋盘）的子集，单独抽出来给“巨物关卡”入口用
GameGlobal.GIANT_LEVELS = GameGlobal.SPECIAL_LEVELS.filter(function (l) { return (l.k || 1) === 3; });
GameGlobal.TOTAL_GIANT = GameGlobal.GIANT_LEVELS.length;
// 趣味关卡：特殊关里非 k=3（k=1/2 普通尺寸）的子集，给“趣味关卡”入口用（hub 与巨物并列）
GameGlobal.FUN_LEVELS = GameGlobal.SPECIAL_LEVELS.filter(function (l) { return (l.k || 1) !== 3; });
GameGlobal.TOTAL_FUN = GameGlobal.FUN_LEVELS.length;

// 堆叠关卡（层层消消）：在连连看基础上把“拐角限制”换成“层数限制”的新玩法，
// 原型手填 3 关（id 2001+，与 1~24 普通关、25~1151 特殊关不冲突）。
// 形状用 shape(depth) 生成：diamond=钻石/金字塔错落堆叠；flower=花瓣形。卡牌总数偶数（奇数自动剔除一张）。
var STACK_HANDBOOK = [
  { id: 2001, name: '层叠入门', shape: 'diamond', depth: 2, difficulty: 1, cardSet: 'fruit', _category: 'stack' },
  { id: 2002, name: '三层叠塔', shape: 'diamond', depth: 3, difficulty: 2, cardSet: 'fruit', _category: 'stack' },
  { id: 2003, name: '混合深叠', shape: 'flower',  depth: 4, difficulty: 3, cardSet: 'mixed', _category: 'stack' },
];
GameGlobal.STACK_LEVELS = STACK_HANDBOOK;
GameGlobal.TOTAL_STACK = GameGlobal.STACK_LEVELS.length;

/** 选关界面每页显示的关卡数（2 列 × 5 行 = 10 关/页，17 关 → 2 页） */
GameGlobal.LEVELS_PER_PAGE = 10;

/** 根据关卡编号获取配置（先查普通关，再查特殊关；命中后打 _category 标记供解锁/返回判断） */
GameGlobal.getLevelConfig = function (id) {
  var i, c;
  for (i = 0; i < GameGlobal.LEVELS.length; i++) {
    if (GameGlobal.LEVELS[i].id === id) {
      c = GameGlobal.LEVELS[i];
      c._category = 'normal';
      if (typeof GameGlobal.expandShapeRef === 'function') GameGlobal.expandShapeRef(c);
      return c;
    }
  }
  if (GameGlobal.SPECIAL_LEVELS) {
    for (i = 0; i < GameGlobal.SPECIAL_LEVELS.length; i++) {
      if (GameGlobal.SPECIAL_LEVELS[i].id === id) {
        c = GameGlobal.SPECIAL_LEVELS[i];
        c._category = 'special';
        if (typeof GameGlobal.expandShapeRef === 'function') GameGlobal.expandShapeRef(c);
        return c;
      }
    }
  }
  // 堆叠关卡（层层消消）
  if (GameGlobal.STACK_LEVELS) {
    for (i = 0; i < GameGlobal.STACK_LEVELS.length; i++) {
      if (GameGlobal.STACK_LEVELS[i].id === id) {
        c = GameGlobal.STACK_LEVELS[i];
        c._category = 'stack';
        return c;
      }
    }
  }
  // 兜底：返回普通第 1 关
  var first = GameGlobal.LEVELS[0];
  first._category = 'normal';
  if (typeof GameGlobal.expandShapeRef === 'function') GameGlobal.expandShapeRef(first);
  return first;
};

/** 取特殊关数组中某 id 的下标（用于「下一关」导航），找不到返回 -1 */
GameGlobal.getSpecialIndex = function (id) {
  if (!GameGlobal.SPECIAL_LEVELS) return -1;
  for (var i = 0; i < GameGlobal.SPECIAL_LEVELS.length; i++) {
    if (GameGlobal.SPECIAL_LEVELS[i].id === id) return i;
  }
  return -1;
};

/** 取堆叠关卡（层层消消）数组中某 id 的下标，找不到返回 -1（用于「下一关」导航） */
GameGlobal.getStackIndex = function (id) {
  if (!GameGlobal.STACK_LEVELS) return -1;
  for (var i = 0; i < GameGlobal.STACK_LEVELS.length; i++) {
    if (GameGlobal.STACK_LEVELS[i].id === id) return i;
  }
  return -1;
};

/**
 * 关卡“展示序号”：每个大类（普通/特殊/层层消消）独立从 1 开始计数，
 * 不沿用全局 id（普通 1~24、特殊 25~1151、层层消消 2001+）。
 * 普通关 id 即序号，原样返回；特殊关返回其在 SPECIAL_LEVELS 中的下标+1；
 * 层层消消返回其在 STACK_LEVELS 中的下标+1。
 */
GameGlobal.getLevelDisplayNumber = function (id) {
  var cfg = GameGlobal.getLevelConfig(id);
  if (!cfg) return id;
  if (cfg._category === 'stack') return GameGlobal.getStackIndex(id) + 1;
  if (cfg._category === 'special') return GameGlobal.getSpecialIndex(id) + 1;
  return id; // normal：id 即序号
};

/**
 * 生成某关的“玩法说明”文本（多行），供游戏内问号弹窗展示。
 * 清楚告诉玩家：重力往哪个方向坠（左/右/上/下/斜向），有没有冰冻，共几种水果。
 * @returns {string[]} 第一行是标题，其余为说明行
 */
GameGlobal.getLevelHelp = function (cfg) {
  cfg = cfg || {};
  var lines = [];
  lines.push('第' + GameGlobal.getLevelDisplayNumber(cfg.id) + '关 · ' + (cfg.name || ''));

  var g = cfg.gravity;
  if (!g) {
    lines.push('这是经典连连看：消除一对水果后，其它卡片不会移动。');
  } else {
    var dirText = {
      down: '水果会向下掉落，填补下方的空缺。',
      up: '水果会向上飘动，填补上方的空缺。',
      left: '水果会向左滑动，填补左侧的空缺。',
      right: '水果会向右滑动，填补右侧的空缺。',
      downRight: '水果会沿对角线向右下方滑落（斜向坠落）。',
      downLeft: '水果会沿对角线向左下方滑落（斜向坠落）。',
      upRight: '水果会沿对角线向右上方滑落（斜向坠落）。',
      upLeft: '水果会沿对角线向左上方滑落（斜向坠落）。',
    };
    lines.push('重力方向：' + (dirText[g] || '有特殊重力，注意卡片滑动方向。'));
  }

  if (cfg.frozenRatio > 0) {
    lines.push('注意冰冻：被冰封的水果要先点一次破冰，再点一次才能消除。');
  }

  // 新玩法说明：形状棋盘 / 分区 / 特殊格 / 镜头
  if (cfg.shapeMap) {
    lines.push('特殊棋盘：棋盘不是矩形，空白处没有卡片，开局镜头会先展示整个图案。');
  }
  if (cfg.zonePools && Object.keys(cfg.zonePools).length > 1) {
    lines.push('分区规则：靠卡片图案区分所属区域（如左翅蔬菜、右翅水果），默认只能消除同一区域内的卡片对。');
  }
  if (cfg.viewport) {
    lines.push('大地图：单指拖动平移棋盘，双指捏合缩放。');
  }
  if (cfg._category === 'stack') {
    lines.push('层层消消：牌一层层叠起来，只能点最顶层（没被压住的）的牌。');
    lines.push('选中两张最顶层的同色牌即可消除，不要求路径连通——层，就是新的限制。');
    lines.push('层数越深越难：下层被压住，要先消掉上层才能动它。');
  }
  if (cfg.mover) {
    lines.push('移动卡：棋盘上有张会来回移动的卡片，找到并消除它的同类即可。');
    lines.push('它两侧的卡片被消除后它开始移动；所在行被清空后它会飞向屏幕外——务必在出屏前消掉它！');
  }

  var typeCount = cfg.fruitTypeCount || 12;
  var hasSets = cfg.cardSets && cfg.cardSets.length >= 1;
  if (hasSets) typeCount = cfg.cardSets.length * typeCount;
  lines.push('本关共 ' + typeCount + ' 种' + (hasSets ? '图案' : '水果') + '，加油！');
  return lines;
};

/**
 * 网格尺寸自适应：按设计分辨率 + 顶/底部预留，计算卡片尺寸与网格左上角
 * @returns {cw, ch, gx, gy, ox, oy}
 */
GameGlobal.getGridMetrics = function (cfg) {
  var availW = GameGlobal.DESIGN_W - GameGlobal.GRID_MARGIN_X * 2;
  // 刘海屏：顶部预留增加 SAFE_TOP（init 时根据胶囊位置计算），网格整体下移避开刘海
  var topBar = GameGlobal.TOP_BAR_H + (GameGlobal.SAFE_TOP || 0);
  var availH = GameGlobal.DESIGN_H - topBar - GameGlobal.BOTTOM_BAR_H;
  var ratio = GameGlobal.GRID_OVERLAP_RATIO; // 重叠比例（负间距）
  var cardSize;
  if (cfg.viewport) {
    // 大地图关卡：卡片用固定自然尺寸，超出屏幕的部分交给镜头平移/缩放
    cardSize = cfg.cardSize || 46;
  } else {
    // cardSize * (cols - (cols-1)*ratio) ≤ availW → 网格恰好占满可用宽度
    cardSize = Math.floor(availW / (cfg.cols - (cfg.cols - 1) * ratio));
    var cardSizeH = Math.floor(availH / (cfg.rows - (cfg.rows - 1) * ratio));
    cardSize = Math.max(32, Math.min(cardSize, cardSizeH));
  }

  var gx = -Math.round(cardSize * ratio);
  var gy = -Math.round(cardSize * ratio);
  var gridW = cfg.cols * cardSize + (cfg.cols - 1) * gx;
  var gridH = cfg.rows * cardSize + (cfg.rows - 1) * gy;
  return {
    cw: cardSize, ch: cardSize,
    gx: gx, gy: gy,
    ox: (GameGlobal.DESIGN_W - gridW) / 2,
    oy: topBar + (availH - gridH) / 2,
  };
};

/** 动画/计时常量（毫秒） */
GameGlobal.TIMING = {
  ELIM_SCALE: 300,     // 卡片消除缩放时长
  ELIM_LINE: 200,      // 消除连线保持时长
  ELIM_TOTAL: 450,     // 消除完整流程（含两卡先后）
  MISMATCH: 500,       // 匹配失败抖动流程
  HINT_LINE: 1200,     // 提示连线保持时长
  THAW: 320,           // 解冻动画时长
  GRAVITY_PER_CELL: 120, // 重力每格动画时长
  BOMB_TOTAL: 500,     // 炸弹流程
  WIN_PANEL_DELAY: 400,// 胜利面板出现延迟
};

// ══════════════════════════════════════════════
//  经济系统（工具限次 / 金币 / 商店）
// ══════════════════════════════════════════════

/** 工具初始免费次数（新玩家赠送，用完去商店购买） */
GameGlobal.TOOLS_DEFAULT = { hint: 3, shuffle: 2, bomb: 1 };

/** 商店商品：{id, name, tool, amount, coins, desc} */
GameGlobal.SHOP_ITEMS = [
  { id: 'buy_hint_1', name: '提示 ×1', tool: 'hint', amount: 1, coins: 40, desc: '找到一对可消除的水果' },
  { id: 'buy_hint_5', name: '提示 ×5', tool: 'hint', amount: 5, coins: 160, desc: '超值打包（省 40）' },
  { id: 'buy_shuffle_1', name: '打乱 ×1', tool: 'shuffle', amount: 1, coins: 70, desc: '重新洗牌剩余水果' },
  { id: 'buy_bomb_1', name: '炸弹 ×1', tool: 'bomb', amount: 1, coins: 110, desc: '随机炸掉 3×3 区域' },
];

/** 通关金币奖励：首次通关 100，重复通关 20 */
GameGlobal.COINS_FIRST_CLEAR = 100;
GameGlobal.COINS_REPEAT_CLEAR = 20;
