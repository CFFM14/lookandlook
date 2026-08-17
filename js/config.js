/**
 * config.js —— 全局配置：常量 + 576 个关卡定义 + 网格尺寸自适应
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
 * 关卡配置：前 16 关为手调配好的经典关（1普通 → 2下坠 → 3上浮 → 4左移 → 5右移 → 6冰冻…），
 * 第 17~576 关由确定性算法生成：24 个章节 × 每章 24 关，
 * 覆盖 5 种重力（无/下坠/上浮/左移/右移）× 4 档冰冻（0/0.2/0.3/0.4），
 * 棋盘规格（40→54 张卡）与水果种类数随全局进度单调递增，难度只升不降。
 */
GameGlobal.LEVELS = (function () {
  var HANDBOOK = [
    {
      id: 1, name: '水果初识', desc: '轻松入门，认识水果', difficulty: 1,
      rows: 6, cols: 4, fruitTypeCount: 6,
      gravity: null, frozenRatio: 0,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      id: 2, name: '果果下坠', desc: '消除后水果会往下掉落哦', difficulty: 1,
      rows: 8, cols: 6, fruitTypeCount: 8,
      gravity: 'down', frozenRatio: 0,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      id: 3, name: '果果上浮', desc: '消除后水果向上飘动', difficulty: 2,
      rows: 8, cols: 6, fruitTypeCount: 8,
      gravity: 'up', frozenRatio: 0,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      id: 4, name: '左移风暴', desc: '消除后水果向左移动', difficulty: 2,
      rows: 8, cols: 5, fruitTypeCount: 10,
      gravity: 'left', frozenRatio: 0,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      id: 5, name: '右移风暴', desc: '消除后水果向右移动', difficulty: 3,
      rows: 8, cols: 5, fruitTypeCount: 10,
      gravity: 'right', frozenRatio: 0,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      id: 6, name: '冰封之果', desc: '冰住的果子要点击两次才能消除', difficulty: 3,
      rows: 7, cols: 6, fruitTypeCount: 10,
      gravity: null, frozenRatio: 0.3,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      id: 7, name: '下坠冰雨', desc: '下坠 + 冰块，双重考验！', difficulty: 3,
      rows: 8, cols: 6, fruitTypeCount: 8,
      gravity: 'down', frozenRatio: 0.25,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      id: 8, name: '上浮冰晶', desc: '上浮 + 冰块，越玩越难', difficulty: 3,
      rows: 8, cols: 6, fruitTypeCount: 10,
      gravity: 'up', frozenRatio: 0.25,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      id: 9, name: '左移冰川', desc: '左移 + 冰块，冰封挑战', difficulty: 4,
      rows: 8, cols: 6, fruitTypeCount: 10,
      gravity: 'left', frozenRatio: 0.3,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      id: 10, name: '终极冰暴', desc: '右移 + 冰块，终极试炼！', difficulty: 4,
      rows: 8, cols: 6, fruitTypeCount: 12,
      gravity: 'right', frozenRatio: 0.3,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      id: 11, name: '寒潮下坠', desc: '更冷的坠落，更厚的冰', difficulty: 4,
      rows: 8, cols: 6, fruitTypeCount: 10,
      gravity: 'down', frozenRatio: 0.35,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      id: 12, name: '寒潮上浮', desc: '冰晶上飘，寒意逼人', difficulty: 4,
      rows: 8, cols: 6, fruitTypeCount: 10,
      gravity: 'up', frozenRatio: 0.35,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      id: 13, name: '左移寒潮', desc: '寒潮向左席卷而来', difficulty: 4,
      rows: 8, cols: 6, fruitTypeCount: 10,
      gravity: 'left', frozenRatio: 0.35,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      id: 14, name: '右移寒潮', desc: '右移 + 深冻，寸步难行', difficulty: 5,
      rows: 8, cols: 6, fruitTypeCount: 12,
      gravity: 'right', frozenRatio: 0.4,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      id: 15, name: '极地冰牢', desc: '九层冰墙，冰封挑战', difficulty: 5,
      rows: 9, cols: 6, fruitTypeCount: 10,
      gravity: 'down', frozenRatio: 0.4,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
    {
      id: 16, name: '万果归一', desc: '终极冰封王座，最后的试炼！', difficulty: 5,
      rows: 9, cols: 6, fruitTypeCount: 12,
      gravity: 'right', frozenRatio: 0.4,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    },
  ];

  var GRAVITIES = [null, 'down', 'up', 'left', 'right'];
  var FROZEN = [0, 0.2, 0.3, 0.4];
  // 17 种棋盘规格（行×列，卡片总数为偶数），按卡片数从小到大排列。
  // 末尾两档（10×6=60、10×7=70）为终章大型棋盘，让后期关卡卡片数可继续超过手工关峰值（54）
  var SHAPES = [
    [4, 4], [4, 5], [5, 4], [4, 6], [6, 4], [7, 4], [5, 6], [6, 5],
    [8, 4], [6, 6], [9, 4], [8, 5], [7, 6], [8, 6], [9, 6], [10, 6], [10, 7],
  ];
  // 24 个场景词：同一章节内每关取一个，保证 576 关名称互不重复
  var SCENES = [
    '春晓', '微风', '拾光', '星语', '晨曦', '夏夜', '山岚', '云海',
    '枫红', '霜降', '雪落', '冰晶', '银河', '月影', '花语', '果香',
    '蜜语', '清泉', '霓虹', '琥珀', '苍穹', '星辰', '远方', '心晴',
  ];
  // 章节主题词：重力 + 冰冻档位
  var THEMES = {
    'null_0': '果缘', 'down_0': '下坠', 'up_0': '上浮', 'left_0': '左移', 'right_0': '右移',
    'null_0.2': '微冰', 'down_0.2': '冰坠', 'up_0.2': '冰浮', 'left_0.2': '冰移', 'right_0.2': '冰驰',
    'null_0.3': '寒霜', 'down_0.3': '寒坠', 'up_0.3': '寒浮', 'left_0.3': '寒袭', 'right_0.3': '寒驰',
    'null_0.4': '极冻', 'down_0.4': '深坠', 'up_0.4': '深浮', 'left_0.4': '深移', 'right_0.4': '深驰',
  };
  // 最后 4 个章节（20~23）为终章主题
  var FINALE_THEMES = ['冰皇', '坠渊', '浮天', '疾袭'];
  var GRAVITY_DESC = {
    null: '经典连连看，眼疾手快',
    down: '消除后水果会往下掉落',
    up: '消除后水果向上飘动',
    left: '消除后水果向左移动',
    right: '消除后水果向右移动',
  };
  var FROZEN_DESC = {
    0: '', 0.2: '，少量冰块要配对两次', 0.3: '，冰封来袭', 0.4: '，深层冰冻挑战',
  };

  var levels = [];
  for (var h = 0; h < HANDBOOK.length; h++) levels.push(HANDBOOK[h]);

  for (var i = 17; i <= 576; i++) {
    var k = i - 17;               // 全局序号 0..559（跨章节单调推进）
    var c = Math.floor(k / 24);   // 章节 0..23
    var p = k % 24;               // 章内序号 0..23
    var gravity = GRAVITIES[c % 5];
    var frozenTier = Math.min(3, Math.floor(c / 5));
    var frozenRatio = FROZEN[frozenTier];

    // 棋盘规格：随全局序号 k 单调递增（核心修复）。
    // 原实现按章内序号 p 在 15 档棋盘间循环，每章开头都退回最小棋盘，
    // 导致后置关卡（如第 41 关 16 张）相对前置关卡（第 40 关 54 张）卡片数与难度断崖下降；
    // 终章特殊覆盖（c>=20 时从 8 档起步）同样造成终章开局弱于前一章末尾。
    // 现改为 k 从 0→559 平滑推进 SHAPES[13]→[16]（48→54→60→70 张卡），全程只增不减，
    // 起点（48 张）紧贴手工关峰值（16 关 54 张），终章（第 20~23 章）为全程最大的 70 张棋盘。
    var shapeIdx = 13 + Math.floor(k * 4 / 560);
    if (shapeIdx > 16) shapeIdx = 16;

    var rows = SHAPES[shapeIdx][0];
    var cols = SHAPES[shapeIdx][1];
    var pairs = rows * cols / 2;
    // 水果种类数只随棋盘档位单调（去掉原章内回环的 p % 3 扰动），上限 12 种
    var fruitTypeCount = Math.max(3, Math.min(pairs, 3 + shapeIdx));
    if (fruitTypeCount > 12) fruitTypeCount = 12;
    // 难度 = 棋盘档位分 + 重力阶段分 + 冰冻档位分，各分量随章节单调不减 → 总难度只升不降。
    // （重力分量原为 gravity?1:0，会随 c%5 循环在“无重力章”回落，改以章节阶段判断）
    var difficulty = 2 + Math.floor(shapeIdx / 3) + (c >= 5 ? 1 : 0) + (frozenRatio >= 0.3 ? 1 : 0);
    if (difficulty > 5) difficulty = 5;

    var theme = c >= 20 ? FINALE_THEMES[c - 20] : THEMES[gravity + '_' + frozenRatio];
    var desc = GRAVITY_DESC[gravity] + FROZEN_DESC[frozenRatio] + (c >= 20 ? '，终章终极试炼！' : '');

    levels.push({
      id: i,
      name: theme + '·' + SCENES[p],
      desc: desc,
      difficulty: difficulty,
      rows: rows, cols: cols, fruitTypeCount: fruitTypeCount,
      gravity: gravity, frozenRatio: frozenRatio,
      hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
    });
  }
  return levels;
})();

GameGlobal.TOTAL_LEVELS = GameGlobal.LEVELS.length;

/** 选关界面每页显示的关卡数（2 列 × 5 行 = 10 关/页，576 关 → 58 页） */
GameGlobal.LEVELS_PER_PAGE = 10;

/** 根据关卡编号获取配置 */
GameGlobal.getLevelConfig = function (id) {
  for (var i = 0; i < GameGlobal.LEVELS.length; i++) {
    if (GameGlobal.LEVELS[i].id === id) return GameGlobal.LEVELS[i];
  }
  return GameGlobal.LEVELS[0];
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
  // cardSize * (cols - (cols-1)*ratio) ≤ availW → 网格恰好占满可用宽度
  var cardSize = Math.floor(availW / (cfg.cols - (cfg.cols - 1) * ratio));
  var cardSizeH = Math.floor(availH / (cfg.rows - (cfg.rows - 1) * ratio));
  cardSize = Math.max(32, Math.min(cardSize, cardSizeH));

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
