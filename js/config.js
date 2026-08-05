/**
 * config.js —— 全局配置：常量 + 6 个关卡定义 + 网格尺寸自适应
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
// 卡片间隙：0 = 紧贴排列（连连看规则中卡片互相紧挨，避免用户误以为"只有贴着的才能消"）。
// 原版 Cocos 配置即为负间距（重叠），此处贴合即可；连线判定与视觉间距无关。
GameGlobal.GRID_GAP = 0;

/** 水果名称（与 images/fruit_01~12.png 一一对应） */
GameGlobal.FRUIT_NAMES = [
  '柚子', '桃子', '梨子', '橘子', '紫葡萄', '红苹果',
  '草莓', '菠萝', '西瓜', '青苹果', '青葡萄', '香蕉'
];

/** 6 个关卡配置（用户确认方案） */
GameGlobal.LEVELS = [
  {
    id: 1, name: '水果初识', desc: '轻松入门，认识水果', difficulty: 1,
    rows: 4, cols: 4, fruitTypeCount: 4,
    gravity: null, frozenRatio: 0,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
  },
  {
    id: 2, name: '经典果园', desc: '标准连连看，水果大丰收', difficulty: 1,
    rows: 6, cols: 8, fruitTypeCount: 12,
    gravity: null, frozenRatio: 0,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
  },
  {
    id: 3, name: '果果下坠', desc: '消除后水果会往下掉落哦', difficulty: 2,
    rows: 6, cols: 8, fruitTypeCount: 8,
    gravity: 'down', frozenRatio: 0,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
  },
  {
    id: 4, name: '冰封之果', desc: '冰住的果子要点击两次才能消除', difficulty: 2,
    rows: 5, cols: 6, fruitTypeCount: 6,
    gravity: null, frozenRatio: 0.3,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
  },
  {
    id: 5, name: '左移风暴', desc: '消除后水果向左移动', difficulty: 3,
    rows: 6, cols: 6, fruitTypeCount: 6,
    gravity: 'left', frozenRatio: 0,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
  },
  {
    id: 6, name: '终极挑战', desc: '重力+冰冻，双重考验！', difficulty: 3,
    rows: 7, cols: 8, fruitTypeCount: 10,
    gravity: 'down', frozenRatio: 0.2,
    hintEnabled: true, bombEnabled: true, shuffleEnabled: true,
  },
];

GameGlobal.TOTAL_LEVELS = GameGlobal.LEVELS.length;

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
  var availH = GameGlobal.DESIGN_H - GameGlobal.TOP_BAR_H - GameGlobal.BOTTOM_BAR_H;
  var gap = GameGlobal.GRID_GAP;
  var cardSize = Math.floor((availW - gap * (cfg.cols - 1)) / cfg.cols);
  var cardSizeH = Math.floor((availH - gap * (cfg.rows - 1)) / cfg.rows);
  cardSize = Math.max(32, Math.min(cardSize, cardSizeH));

  var gridW = cfg.cols * cardSize + (cfg.cols - 1) * gap;
  var gridH = cfg.rows * cardSize + (cfg.rows - 1) * gap;
  return {
    cw: cardSize, ch: cardSize,
    gx: gap, gy: gap,
    ox: (GameGlobal.DESIGN_W - gridW) / 2,
    oy: GameGlobal.TOP_BAR_H + (availH - gridH) / 2,
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
