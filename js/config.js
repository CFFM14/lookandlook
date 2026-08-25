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

/** 布局常量 */
GameGlobal.TOP_BAR_H = 96;       // 顶部信息区高度（返回/关卡名/计时）
GameGlobal.BOTTOM_BAR_H = 116;    // 底部工具按钮区高度
GameGlobal.GRID_MARGIN_X = 12;    // 网格左右留白
// 卡片重叠比例（仿原版 Cocos 负间距 -12/-26：卡片互相叠放，视觉紧凑）。
// 0.12 ≈ 卡片边长 12% 被相邻卡片覆盖（比 0.18 略宽松一丁点）；连线的外围通道逻辑不受影响。
GameGlobal.GRID_OVERLAP_RATIO = 0.12;

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
 * 1~24 关默认只走 fruit 套，card.type 仍是数字 1~12（零改动）；25/26 关写 cardSets 后切语义串。
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

  // ── 新玩法关：形状棋盘 / 分区 / 镜头 ──────────────
  // shapeMap 字符画：'.'=镂空(无格子)  A~H=分区 0~7 的普通格
  // zonePools：每个分区独立的水果池（不同分区的水果默认不能互消）
  levels.push({
    // 第25关【展翅雄鹰】：鹰形棋盘（10×20 大地图，支持拖拽平移/缩放），
    // 左翅=红区 / 右翅=蓝区 / 躯干=橙区，默认只能同区消除。
    // 分区视觉皮：左翅用蔬菜卡组，右翅用水果卡组（题材对比更直观）：
    //   v = 蔬菜（茄子/南瓜/.../白菜）  f = 水果（柚子/.../香蕉）
    id: 25,
    name: '展翅雄鹰',
    desc: '分区棋盘：左右翅分区，左翅蔬菜·右翅水果',
    difficulty: 5,
    rows: 10, cols: 20, fruitTypeCount: 12,
    gravity: null, frozenRatio: 0,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    cardSets: ['fruit', 'veg'], // 启用多卡组：card.type 改为 'f<n>'/'v<n>'
    viewport: true, cardSize: 46,
    shapeMap: [
      '........CCCC........',
      '..AAA...CCCC...BBB..',
      '.AAAAA.CCCCCC.BBBBB.',
      'AAAAAAACCCCCCCBBBBBB',
      'AAAAAAACCCCCCCBBBBBB',
      '.AAAAA.CCCCCC.BBBB..',
      '..AAAA.CCCCCC.BBB...',
      '...AAA..CCCC..BBB...',
      '........CCCC........',
      '........C..C........',
    ],
    zonePools: {
      0: ['v1','v2','v3','v4','v5','v6','v7','v8'],           // 左翅（红区）= 蔬菜 8 种
      1: ['f1','f2','f3','f4','f5','f6','f7','f8'],           // 右翅（蓝区）= 水果 8 种
      2: ['f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12'], // 躯干（橙区）= 水果全 12 种
    },
  });
  levels.push({
    // 第26关【心心相印】：心形镂空棋盘（10×11，单分区），
    // 体验形状棋盘 + 分区边框主题 + 全盘蔬菜卡组。
    id: 26,
    name: '心心相印',
    desc: '心形棋盘：全盘蔬菜主题',
    difficulty: 4,
    rows: 10, cols: 11, fruitTypeCount: 12,
    gravity: null, frozenRatio: 0,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    cardSets: ['veg'], // 启用多卡组（仅蔬菜）：card.type = 'v<n>'
    viewport: false, zoomable: true, // 心形恰好入屏；但仍允许双指捏合缩放 / 单指平移细看
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
  });

  return levels;
})();

GameGlobal.TOTAL_LEVELS = GameGlobal.LEVELS.length;

/** 选关界面每页显示的关卡数（2 列 × 5 行 = 10 关/页，17 关 → 2 页） */
GameGlobal.LEVELS_PER_PAGE = 10;

/** 根据关卡编号获取配置 */
GameGlobal.getLevelConfig = function (id) {
  for (var i = 0; i < GameGlobal.LEVELS.length; i++) {
    if (GameGlobal.LEVELS[i].id === id) return GameGlobal.LEVELS[i];
  }
  return GameGlobal.LEVELS[0];
};

/**
 * 生成某关的“玩法说明”文本（多行），供游戏内问号弹窗展示。
 * 清楚告诉玩家：重力往哪个方向坠（左/右/上/下/斜向），有没有冰冻，共几种水果。
 * @returns {string[]} 第一行是标题，其余为说明行
 */
GameGlobal.getLevelHelp = function (cfg) {
  cfg = cfg || {};
  var lines = [];
  lines.push('第' + (cfg.id || '?') + '关 · ' + (cfg.name || ''));

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

  lines.push('本关共 ' + (cfg.fruitTypeCount || 12) + ' 种水果，加油！');
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
