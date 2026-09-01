// 自动生成，勿手改 —— 由 tools/gen_levels.js 产出（特殊关卡：id 从 28 起，按难度递进）
// 共 1125 关，覆盖 k=1/2/3 全尺寸，顺序解锁。
// 注意：id 27 为手调特殊关「展翅雄鹰」（config.js SPECIAL_HANDBOOK），gen_levels.js START_ID=28 保证重跑不会覆盖；
//       id 25 为普通关「逃逸的移动卡」（移动卡玩法），不在本文件内。
// 想新增特殊玩法：在此数组追加一条（引用版：shapeKey/k/zoneMode/cardSet，运行时由 config.js 的 expandShapeRef 展开），
// 或把更多 k 档/维度交给 gen_levels.js 重跑生成。1~25 为手调普通关（含移动卡关），不在本文件内。
GameGlobal.SPECIAL_LEVELS = [
  {
    id: 28, name: '蝴蝶·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 29, name: '蝴蝶·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 30, name: '猫·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 31, name: '猫·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 32, name: '圆·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 33, name: '圆·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 34, name: '云·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 35, name: '云·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 36, name: '月牙·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 37, name: '月牙·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 38, name: '十字·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 39, name: '十字·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 40, name: '皇冠·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 41, name: '皇冠·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 42, name: '菱形·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 43, name: '菱形·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 44, name: '水滴·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 45, name: '水滴·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 46, name: '鱼·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 47, name: '鱼·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 48, name: '花·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 49, name: '花·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 50, name: '礼物·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 51, name: '礼物·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 52, name: '爱心·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 53, name: '爱心·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 54, name: '房子·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 55, name: '房子·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 56, name: '叶子·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 57, name: '叶子·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 58, name: '蘑菇·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 59, name: '蘑菇·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 60, name: '音符·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 61, name: '音符·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 62, name: '圆环·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 63, name: '圆环·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 64, name: '盾牌·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 65, name: '盾牌·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 66, name: '笑脸·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 67, name: '笑脸·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 68, name: '方块·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 69, name: '方块·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 70, name: '星星·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 71, name: '星星·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 72, name: '太阳·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 73, name: '太阳·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 74, name: '树·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 75, name: '树·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 76, name: '三角·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 77, name: '三角·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 78, name: '蝴蝶·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 79, name: '蝴蝶·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 80, name: '猫·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 81, name: '猫·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 82, name: '圆·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 83, name: '圆·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 84, name: '云·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 85, name: '云·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 86, name: '月牙·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 87, name: '月牙·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 88, name: '十字·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 89, name: '十字·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 90, name: '皇冠·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 91, name: '皇冠·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 92, name: '菱形·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 93, name: '菱形·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 94, name: '水滴·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 95, name: '水滴·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 96, name: '鱼·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 97, name: '鱼·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 98, name: '花·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 99, name: '花·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 100, name: '礼物·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 101, name: '礼物·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 102, name: '爱心·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 103, name: '爱心·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 104, name: '房子·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 105, name: '房子·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 106, name: '叶子·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 107, name: '叶子·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 108, name: '蘑菇·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 109, name: '蘑菇·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 110, name: '音符·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 111, name: '音符·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 112, name: '圆环·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 113, name: '圆环·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 114, name: '盾牌·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 115, name: '盾牌·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 116, name: '笑脸·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 117, name: '笑脸·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 118, name: '方块·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 119, name: '方块·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 120, name: '星星·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 121, name: '星星·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 122, name: '太阳·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 123, name: '太阳·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 124, name: '树·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 125, name: '树·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 126, name: '三角·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 127, name: '三角·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 128, name: '蝴蝶·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 129, name: '蝴蝶·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 130, name: '猫·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 131, name: '猫·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 132, name: '圆·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 133, name: '圆·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 134, name: '云·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 135, name: '云·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 136, name: '月牙·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 137, name: '月牙·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 138, name: '十字·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 139, name: '十字·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 140, name: '皇冠·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 141, name: '皇冠·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 142, name: '菱形·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 143, name: '菱形·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 144, name: '水滴·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 145, name: '水滴·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 146, name: '鱼·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 147, name: '鱼·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 148, name: '花·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 149, name: '花·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 150, name: '礼物·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 151, name: '礼物·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 152, name: '爱心·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 153, name: '爱心·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 154, name: '房子·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 155, name: '房子·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 156, name: '叶子·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 157, name: '叶子·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 158, name: '蘑菇·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 159, name: '蘑菇·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 160, name: '音符·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 161, name: '音符·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 162, name: '圆环·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 163, name: '圆环·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 164, name: '盾牌·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 165, name: '盾牌·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 166, name: '笑脸·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 167, name: '笑脸·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 168, name: '方块·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 169, name: '方块·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 170, name: '星星·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 171, name: '星星·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 172, name: '太阳·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 173, name: '太阳·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 174, name: '树·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 175, name: '树·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 176, name: '三角·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 177, name: '三角·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 178, name: '蝴蝶·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 179, name: '蝴蝶·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 180, name: '蝴蝶·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 181, name: '猫·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 182, name: '猫·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cat', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 183, name: '猫·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cat', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 184, name: '圆·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 185, name: '圆·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'circle', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 186, name: '圆·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'circle', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 187, name: '云·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 188, name: '云·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 189, name: '云·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 190, name: '月牙·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 191, name: '月牙·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 192, name: '月牙·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 193, name: '十字·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 194, name: '十字·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cross', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 195, name: '十字·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cross', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 196, name: '皇冠·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 197, name: '皇冠·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crown', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 198, name: '皇冠·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crown', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 199, name: '菱形·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 200, name: '菱形·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 201, name: '菱形·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 202, name: '水滴·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 203, name: '水滴·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'drop', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 204, name: '水滴·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'drop', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 205, name: '鱼·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 206, name: '鱼·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'fish', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 207, name: '鱼·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'fish', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 208, name: '花·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 209, name: '花·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 210, name: '花·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 211, name: '花·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 212, name: '花·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 213, name: '礼物·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 214, name: '礼物·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'gift', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 215, name: '礼物·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'gift', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 216, name: '爱心·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 217, name: '爱心·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'heart', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 218, name: '爱心·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'heart', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 219, name: '房子·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 220, name: '房子·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'house', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 221, name: '房子·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'house', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 222, name: '叶子·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 223, name: '叶子·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 224, name: '叶子·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 225, name: '蘑菇·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 226, name: '蘑菇·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 227, name: '蘑菇·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 228, name: '音符·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 229, name: '音符·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 230, name: '音符·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 231, name: '音符·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 232, name: '音符·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 233, name: '圆环·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 234, name: '圆环·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'ring', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 235, name: '圆环·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'ring', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 236, name: '盾牌·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 237, name: '盾牌·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'shield', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 238, name: '盾牌·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'shield', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 239, name: '笑脸·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 240, name: '笑脸·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 241, name: '笑脸·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 242, name: '方块·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 243, name: '方块·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'square', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 244, name: '方块·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'square', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 245, name: '星星·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 246, name: '星星·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 247, name: '星星·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 248, name: '星星·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 249, name: '星星·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 250, name: '太阳·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 251, name: '太阳·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 252, name: '太阳·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 253, name: '太阳·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 254, name: '太阳·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 255, name: '树·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 256, name: '树·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'tree', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 257, name: '树·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'tree', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 258, name: '三角·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 259, name: '三角·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 260, name: '三角·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 261, name: '蝴蝶·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 262, name: '蝴蝶·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 263, name: '蝴蝶·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 264, name: '猫·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 265, name: '猫·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 266, name: '猫·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 267, name: '圆·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 268, name: '圆·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 269, name: '圆·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 270, name: '云·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 271, name: '云·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 272, name: '云·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 273, name: '月牙·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 274, name: '月牙·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 275, name: '月牙·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 276, name: '十字·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 277, name: '十字·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 278, name: '十字·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 279, name: '皇冠·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 280, name: '皇冠·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 281, name: '皇冠·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 282, name: '菱形·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 283, name: '菱形·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 284, name: '菱形·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 285, name: '水滴·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 286, name: '水滴·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 287, name: '水滴·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 288, name: '鱼·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 289, name: '鱼·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 290, name: '鱼·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 291, name: '花·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 292, name: '花·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 293, name: '花·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 294, name: '花·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 295, name: '花·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 296, name: '礼物·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 297, name: '礼物·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 298, name: '礼物·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 299, name: '爱心·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 300, name: '爱心·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 301, name: '爱心·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 302, name: '房子·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 303, name: '房子·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 304, name: '房子·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 305, name: '叶子·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 306, name: '叶子·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 307, name: '叶子·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 308, name: '蘑菇·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 309, name: '蘑菇·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 310, name: '蘑菇·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 311, name: '音符·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 312, name: '音符·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 313, name: '音符·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 314, name: '音符·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 315, name: '音符·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 316, name: '圆环·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 317, name: '圆环·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 318, name: '圆环·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 319, name: '盾牌·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 320, name: '盾牌·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 321, name: '盾牌·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 322, name: '笑脸·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 323, name: '笑脸·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 324, name: '笑脸·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 325, name: '方块·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 326, name: '方块·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 327, name: '方块·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 328, name: '星星·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 329, name: '星星·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 330, name: '星星·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 331, name: '星星·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 332, name: '星星·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 333, name: '太阳·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 334, name: '太阳·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 335, name: '太阳·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 336, name: '太阳·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 337, name: '太阳·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 338, name: '树·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 339, name: '树·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 340, name: '树·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 341, name: '三角·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 342, name: '三角·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 343, name: '三角·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 344, name: '蝴蝶·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 345, name: '蝴蝶·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 346, name: '蝴蝶·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 347, name: '猫·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 348, name: '猫·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 349, name: '猫·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 350, name: '圆·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 351, name: '圆·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 352, name: '圆·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 353, name: '云·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 354, name: '云·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 355, name: '云·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 356, name: '月牙·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 357, name: '月牙·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 358, name: '月牙·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 359, name: '十字·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 360, name: '十字·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 361, name: '十字·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 362, name: '皇冠·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 363, name: '皇冠·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 364, name: '皇冠·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 365, name: '菱形·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 366, name: '菱形·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 367, name: '菱形·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 368, name: '水滴·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 369, name: '水滴·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 370, name: '水滴·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 371, name: '鱼·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 372, name: '鱼·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 373, name: '鱼·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 374, name: '花·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 375, name: '花·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 376, name: '花·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 377, name: '花·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 378, name: '花·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 379, name: '礼物·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 380, name: '礼物·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 381, name: '礼物·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 382, name: '爱心·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 383, name: '爱心·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 384, name: '爱心·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 385, name: '房子·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 386, name: '房子·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 387, name: '房子·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 388, name: '叶子·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 389, name: '叶子·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 390, name: '叶子·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 391, name: '蘑菇·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 392, name: '蘑菇·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 393, name: '蘑菇·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 394, name: '音符·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 395, name: '音符·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 396, name: '音符·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 397, name: '音符·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 398, name: '音符·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 399, name: '圆环·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 400, name: '圆环·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 401, name: '圆环·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 402, name: '盾牌·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 403, name: '盾牌·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 404, name: '盾牌·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 405, name: '笑脸·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 406, name: '笑脸·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 407, name: '笑脸·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 408, name: '方块·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 409, name: '方块·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 410, name: '方块·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 411, name: '星星·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 412, name: '星星·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 413, name: '星星·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 414, name: '星星·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 415, name: '星星·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 416, name: '太阳·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 417, name: '太阳·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 418, name: '太阳·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 419, name: '太阳·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 420, name: '太阳·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 421, name: '树·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 422, name: '树·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 423, name: '树·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 424, name: '三角·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 425, name: '三角·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 426, name: '三角·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 427, name: '蝴蝶·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 428, name: '蝴蝶·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 429, name: '猫·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 430, name: '猫·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 431, name: '圆·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 432, name: '圆·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 433, name: '云·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 434, name: '云·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 435, name: '月牙·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 436, name: '月牙·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 437, name: '十字·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 438, name: '十字·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 439, name: '菱形·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 440, name: '菱形·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 441, name: '水滴·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 442, name: '水滴·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 443, name: '鱼·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 444, name: '鱼·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 445, name: '花·大混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 446, name: '花·大左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 447, name: '花·大上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 448, name: '爱心·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 449, name: '爱心·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 450, name: '房子·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 451, name: '房子·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 452, name: '叶子·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 453, name: '叶子·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 454, name: '蘑菇·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 455, name: '蘑菇·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 456, name: '音符·大混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 457, name: '音符·大左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 458, name: '音符·大上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 459, name: '圆环·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 460, name: '圆环·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 461, name: '盾牌·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 462, name: '盾牌·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 463, name: '笑脸·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 464, name: '笑脸·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 465, name: '星星·大混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 466, name: '星星·大左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 467, name: '星星·大上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 468, name: '太阳·大混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 469, name: '太阳·大左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 470, name: '太阳·大上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 471, name: '树·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 472, name: '树·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 473, name: '蝴蝶·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 474, name: '蝴蝶·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 475, name: '猫·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 476, name: '猫·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 477, name: '圆·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 478, name: '圆·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 479, name: '云·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 480, name: '云·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 481, name: '月牙·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 482, name: '月牙·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 483, name: '十字·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 484, name: '十字·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 485, name: '菱形·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 486, name: '菱形·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 487, name: '水滴·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 488, name: '水滴·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 489, name: '鱼·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 490, name: '鱼·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 491, name: '花·大混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 492, name: '花·大薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 493, name: '花·大薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 494, name: '爱心·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 495, name: '爱心·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 496, name: '房子·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 497, name: '房子·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 498, name: '叶子·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 499, name: '叶子·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 500, name: '蘑菇·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 501, name: '蘑菇·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 502, name: '音符·大混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 503, name: '音符·大薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 504, name: '音符·大薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 505, name: '圆环·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 506, name: '圆环·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 507, name: '盾牌·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 508, name: '盾牌·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 509, name: '笑脸·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 510, name: '笑脸·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 511, name: '星星·大混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 512, name: '星星·大薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 513, name: '星星·大薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 514, name: '太阳·大混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 515, name: '太阳·大薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 516, name: '太阳·大薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 517, name: '树·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 518, name: '树·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 519, name: '蝴蝶·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 520, name: '蝴蝶·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 521, name: '猫·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 522, name: '猫·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 523, name: '圆·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 524, name: '圆·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 525, name: '云·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 526, name: '云·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 527, name: '月牙·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 528, name: '月牙·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 529, name: '十字·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 530, name: '十字·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 531, name: '菱形·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 532, name: '菱形·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 533, name: '水滴·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 534, name: '水滴·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 535, name: '鱼·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 536, name: '鱼·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 537, name: '花·大混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 538, name: '花·大厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 539, name: '花·大厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 540, name: '爱心·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 541, name: '爱心·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 542, name: '房子·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 543, name: '房子·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 544, name: '叶子·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 545, name: '叶子·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 546, name: '蘑菇·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 547, name: '蘑菇·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 548, name: '音符·大混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 549, name: '音符·大厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 550, name: '音符·大厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 551, name: '圆环·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 552, name: '圆环·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 553, name: '盾牌·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 554, name: '盾牌·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 555, name: '笑脸·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 556, name: '笑脸·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 557, name: '星星·大混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 558, name: '星星·大厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 559, name: '星星·大厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 560, name: '太阳·大混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 561, name: '太阳·大厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 562, name: '太阳·大厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 563, name: '树·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 564, name: '树·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 565, name: '蝴蝶·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 566, name: '蝴蝶·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 567, name: '蝴蝶·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 568, name: '猫·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 569, name: '猫·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cat', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 570, name: '猫·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cat', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 571, name: '圆·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 572, name: '圆·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'circle', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 573, name: '圆·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'circle', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 574, name: '云·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 575, name: '云·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 576, name: '云·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 577, name: '月牙·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 578, name: '月牙·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 579, name: '月牙·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 580, name: '十字·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 581, name: '十字·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cross', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 582, name: '十字·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cross', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 583, name: '皇冠·大果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 584, name: '皇冠·大蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 585, name: '菱形·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 586, name: '菱形·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 587, name: '菱形·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 588, name: '水滴·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 589, name: '水滴·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'drop', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 590, name: '水滴·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'drop', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 591, name: '鱼·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 592, name: '鱼·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'fish', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 593, name: '鱼·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'fish', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 594, name: '花·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 595, name: '花·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 596, name: '礼物·大果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 597, name: '礼物·大蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 598, name: '爱心·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 599, name: '爱心·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'heart', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 600, name: '爱心·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'heart', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 601, name: '房子·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 602, name: '房子·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'house', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 603, name: '房子·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'house', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 604, name: '叶子·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 605, name: '叶子·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 606, name: '叶子·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 607, name: '蘑菇·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 608, name: '蘑菇·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 609, name: '蘑菇·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 610, name: '音符·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 611, name: '音符·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 612, name: '圆环·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 613, name: '圆环·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'ring', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 614, name: '圆环·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'ring', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 615, name: '盾牌·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 616, name: '盾牌·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'shield', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 617, name: '盾牌·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'shield', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 618, name: '笑脸·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 619, name: '笑脸·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 620, name: '笑脸·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 621, name: '星星·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 622, name: '星星·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 623, name: '太阳·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 624, name: '太阳·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 625, name: '树·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 626, name: '树·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'tree', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 627, name: '树·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'tree', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 628, name: '三角·大果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 629, name: '三角·大蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 630, name: '蝴蝶·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 631, name: '蝴蝶·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 632, name: '蝴蝶·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 633, name: '猫·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 634, name: '猫·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 635, name: '猫·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 636, name: '圆·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 637, name: '圆·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 638, name: '圆·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 639, name: '云·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 640, name: '云·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 641, name: '云·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 642, name: '月牙·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 643, name: '月牙·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 644, name: '月牙·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 645, name: '十字·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 646, name: '十字·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 647, name: '十字·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 648, name: '皇冠·大果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 649, name: '皇冠·大蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 650, name: '菱形·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 651, name: '菱形·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 652, name: '菱形·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 653, name: '水滴·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 654, name: '水滴·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 655, name: '水滴·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 656, name: '鱼·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 657, name: '鱼·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 658, name: '鱼·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 659, name: '花·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 660, name: '花·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 661, name: '礼物·大果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 662, name: '礼物·大蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 663, name: '爱心·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 664, name: '爱心·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 665, name: '爱心·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 666, name: '房子·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 667, name: '房子·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 668, name: '房子·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 669, name: '叶子·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 670, name: '叶子·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 671, name: '叶子·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 672, name: '蘑菇·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 673, name: '蘑菇·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 674, name: '蘑菇·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 675, name: '音符·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 676, name: '音符·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 677, name: '圆环·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 678, name: '圆环·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 679, name: '圆环·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 680, name: '盾牌·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 681, name: '盾牌·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 682, name: '盾牌·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 683, name: '笑脸·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 684, name: '笑脸·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 685, name: '笑脸·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 686, name: '星星·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 687, name: '星星·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 688, name: '太阳·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 689, name: '太阳·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 690, name: '树·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 691, name: '树·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 692, name: '树·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 693, name: '三角·大果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 694, name: '三角·大蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 695, name: '蝴蝶·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 696, name: '蝴蝶·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 697, name: '蝴蝶·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 698, name: '猫·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 699, name: '猫·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 700, name: '猫·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 701, name: '圆·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 702, name: '圆·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 703, name: '圆·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 704, name: '云·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 705, name: '云·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 706, name: '云·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 707, name: '月牙·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 708, name: '月牙·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 709, name: '月牙·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 710, name: '十字·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 711, name: '十字·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 712, name: '十字·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 713, name: '皇冠·大果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 714, name: '皇冠·大蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 715, name: '菱形·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 716, name: '菱形·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 717, name: '菱形·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 718, name: '水滴·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 719, name: '水滴·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 720, name: '水滴·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 721, name: '鱼·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 722, name: '鱼·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 723, name: '鱼·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 724, name: '花·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 725, name: '花·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 726, name: '礼物·大果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 727, name: '礼物·大蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 728, name: '爱心·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 729, name: '爱心·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 730, name: '爱心·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 731, name: '房子·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 732, name: '房子·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 733, name: '房子·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 734, name: '叶子·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 735, name: '叶子·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 736, name: '叶子·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 737, name: '蘑菇·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 738, name: '蘑菇·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 739, name: '蘑菇·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 740, name: '音符·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 741, name: '音符·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 742, name: '圆环·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 743, name: '圆环·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 744, name: '圆环·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 745, name: '盾牌·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 746, name: '盾牌·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 747, name: '盾牌·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 748, name: '笑脸·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 749, name: '笑脸·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 750, name: '笑脸·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 751, name: '星星·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 752, name: '星星·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 753, name: '太阳·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 754, name: '太阳·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 755, name: '树·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 756, name: '树·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 757, name: '树·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 758, name: '三角·大果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 759, name: '三角·大蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 760, name: '蝴蝶·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 761, name: '蝴蝶·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 762, name: '云·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 763, name: '云·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 764, name: '月牙·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 765, name: '月牙·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 766, name: '皇冠·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 767, name: '皇冠·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crown', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 768, name: '皇冠·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crown', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 769, name: '花·巨混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 770, name: '花·巨左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'flower', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 771, name: '花·巨上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'flower', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 772, name: '礼物·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 773, name: '礼物·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'gift', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 774, name: '礼物·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'gift', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 775, name: '叶子·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 776, name: '叶子·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 777, name: '蘑菇·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 778, name: '蘑菇·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 779, name: '音符·巨混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 780, name: '音符·巨左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'music', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 781, name: '音符·巨上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'music', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 782, name: '圆环·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 783, name: '圆环·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 784, name: '方块·大果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 785, name: '方块·大蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 786, name: '星星·巨混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 787, name: '星星·巨左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'star', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 788, name: '星星·巨上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'star', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 789, name: '太阳·巨混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 790, name: '太阳·巨左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'sun', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 791, name: '太阳·巨上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'sun', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 792, name: '三角·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 793, name: '三角·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 794, name: '三角·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 795, name: '蝴蝶·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 796, name: '蝴蝶·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 797, name: '云·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 798, name: '云·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 799, name: '月牙·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 800, name: '月牙·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 801, name: '皇冠·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 802, name: '皇冠·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 803, name: '皇冠·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 804, name: '花·巨混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 805, name: '花·巨薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 806, name: '花·巨薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 807, name: '礼物·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 808, name: '礼物·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 809, name: '礼物·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 810, name: '叶子·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 811, name: '叶子·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 812, name: '蘑菇·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 813, name: '蘑菇·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 814, name: '音符·巨混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 815, name: '音符·巨薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 816, name: '音符·巨薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 817, name: '圆环·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 818, name: '圆环·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 819, name: '方块·大果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 820, name: '方块·大蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 821, name: '星星·巨混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 822, name: '星星·巨薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 823, name: '星星·巨薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 824, name: '太阳·巨混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 825, name: '太阳·巨薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 826, name: '太阳·巨薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 827, name: '三角·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 828, name: '三角·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 829, name: '三角·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 830, name: '蝴蝶·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 831, name: '蝴蝶·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 832, name: '云·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 833, name: '云·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 834, name: '月牙·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 835, name: '月牙·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 836, name: '皇冠·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 837, name: '皇冠·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 838, name: '皇冠·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 839, name: '花·巨混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 840, name: '花·巨厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 841, name: '花·巨厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 842, name: '礼物·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 843, name: '礼物·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 844, name: '礼物·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 845, name: '叶子·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 846, name: '叶子·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 847, name: '蘑菇·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 848, name: '蘑菇·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 849, name: '音符·巨混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 850, name: '音符·巨厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 851, name: '音符·巨厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 852, name: '圆环·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 853, name: '圆环·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 854, name: '方块·大果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 855, name: '方块·大蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 856, name: '星星·巨混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 857, name: '星星·巨厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 858, name: '星星·巨厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 859, name: '太阳·巨混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 860, name: '太阳·巨厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 861, name: '太阳·巨厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 862, name: '三角·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 863, name: '三角·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 864, name: '三角·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 865, name: '蝴蝶·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 866, name: '蝴蝶·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 867, name: '蝴蝶·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 868, name: '猫·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 869, name: '猫·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 870, name: '云·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 871, name: '云·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 872, name: '云·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 873, name: '月牙·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 874, name: '月牙·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 875, name: '月牙·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 876, name: '十字·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 877, name: '十字·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 878, name: '菱形·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 879, name: '菱形·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 880, name: '水滴·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 881, name: '水滴·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 882, name: '鱼·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 883, name: '鱼·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 884, name: '爱心·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 885, name: '爱心·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 886, name: '房子·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 887, name: '房子·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 888, name: '叶子·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 889, name: '叶子·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 890, name: '叶子·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 891, name: '蘑菇·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 892, name: '蘑菇·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 893, name: '蘑菇·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 894, name: '圆环·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 895, name: '圆环·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'ring', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 896, name: '圆环·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'ring', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 897, name: '盾牌·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 898, name: '盾牌·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 899, name: '方块·大混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 900, name: '方块·大左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'square', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 901, name: '方块·大上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'square', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 902, name: '树·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 903, name: '树·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 904, name: '蝴蝶·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 905, name: '蝴蝶·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 906, name: '蝴蝶·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 907, name: '猫·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 908, name: '猫·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 909, name: '云·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 910, name: '云·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 911, name: '云·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 912, name: '月牙·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 913, name: '月牙·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 914, name: '月牙·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 915, name: '十字·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 916, name: '十字·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 917, name: '菱形·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 918, name: '菱形·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 919, name: '水滴·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 920, name: '水滴·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 921, name: '鱼·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 922, name: '鱼·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 923, name: '爱心·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 924, name: '爱心·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 925, name: '房子·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 926, name: '房子·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 927, name: '叶子·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 928, name: '叶子·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 929, name: '叶子·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 930, name: '蘑菇·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 931, name: '蘑菇·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 932, name: '蘑菇·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 933, name: '圆环·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 934, name: '圆环·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 935, name: '圆环·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 936, name: '盾牌·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 937, name: '盾牌·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 938, name: '方块·大混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 939, name: '方块·大薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 940, name: '方块·大薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 941, name: '树·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 942, name: '树·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 943, name: '蝴蝶·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 944, name: '蝴蝶·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 945, name: '蝴蝶·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 946, name: '猫·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 947, name: '猫·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 948, name: '云·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 949, name: '云·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 950, name: '云·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 951, name: '月牙·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 952, name: '月牙·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 953, name: '月牙·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 954, name: '十字·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 955, name: '十字·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 956, name: '菱形·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 957, name: '菱形·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 958, name: '水滴·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 959, name: '水滴·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 960, name: '鱼·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 961, name: '鱼·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 962, name: '爱心·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 963, name: '爱心·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 964, name: '房子·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 965, name: '房子·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 966, name: '叶子·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 967, name: '叶子·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 968, name: '叶子·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 969, name: '蘑菇·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 970, name: '蘑菇·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 971, name: '蘑菇·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 972, name: '圆环·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 973, name: '圆环·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 974, name: '圆环·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 975, name: '盾牌·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 976, name: '盾牌·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 977, name: '方块·大混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 978, name: '方块·大厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 979, name: '方块·大厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 980, name: '树·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 981, name: '树·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 982, name: '猫·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 983, name: '猫·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cat', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 984, name: '猫·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cat', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 985, name: '圆·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 986, name: '圆·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 987, name: '十字·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 988, name: '十字·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cross', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 989, name: '十字·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cross', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 990, name: '皇冠·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 991, name: '皇冠·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 992, name: '菱形·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 993, name: '菱形·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 994, name: '菱形·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 995, name: '水滴·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 996, name: '水滴·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'drop', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 997, name: '水滴·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'drop', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 998, name: '鱼·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 999, name: '鱼·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'fish', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1000, name: '鱼·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'fish', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1001, name: '礼物·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1002, name: '礼物·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1003, name: '爱心·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1004, name: '爱心·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'heart', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1005, name: '爱心·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'heart', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1006, name: '房子·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1007, name: '房子·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'house', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1008, name: '房子·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'house', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1009, name: '盾牌·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1010, name: '盾牌·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'shield', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1011, name: '盾牌·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'shield', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1012, name: '笑脸·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1013, name: '笑脸·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1014, name: '树·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1015, name: '树·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'tree', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1016, name: '树·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'tree', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1017, name: '猫·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1018, name: '猫·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1019, name: '猫·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1020, name: '圆·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1021, name: '圆·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1022, name: '十字·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1023, name: '十字·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1024, name: '十字·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1025, name: '皇冠·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1026, name: '皇冠·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1027, name: '菱形·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1028, name: '菱形·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1029, name: '菱形·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1030, name: '水滴·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1031, name: '水滴·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1032, name: '水滴·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1033, name: '鱼·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1034, name: '鱼·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1035, name: '鱼·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1036, name: '礼物·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1037, name: '礼物·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1038, name: '爱心·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1039, name: '爱心·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1040, name: '爱心·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1041, name: '房子·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1042, name: '房子·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1043, name: '房子·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1044, name: '盾牌·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1045, name: '盾牌·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1046, name: '盾牌·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1047, name: '笑脸·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1048, name: '笑脸·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1049, name: '树·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1050, name: '树·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1051, name: '树·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1052, name: '猫·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1053, name: '猫·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1054, name: '猫·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1055, name: '圆·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1056, name: '圆·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1057, name: '十字·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1058, name: '十字·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1059, name: '十字·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1060, name: '皇冠·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1061, name: '皇冠·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1062, name: '菱形·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1063, name: '菱形·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1064, name: '菱形·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1065, name: '水滴·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1066, name: '水滴·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1067, name: '水滴·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1068, name: '鱼·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1069, name: '鱼·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1070, name: '鱼·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1071, name: '礼物·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1072, name: '礼物·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1073, name: '爱心·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1074, name: '爱心·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1075, name: '爱心·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1076, name: '房子·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1077, name: '房子·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1078, name: '房子·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1079, name: '盾牌·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1080, name: '盾牌·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1081, name: '盾牌·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1082, name: '笑脸·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1083, name: '笑脸·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1084, name: '树·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1085, name: '树·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1086, name: '树·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1087, name: '圆·巨混', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1088, name: '圆·巨左右', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'circle', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1089, name: '圆·巨上下', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'circle', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1090, name: '皇冠·巨混', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1091, name: '皇冠·巨左右', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'crown', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1092, name: '皇冠·巨上下', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'crown', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1093, name: '礼物·巨混', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1094, name: '礼物·巨左右', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'gift', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1095, name: '礼物·巨上下', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'gift', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1096, name: '笑脸·巨混', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1097, name: '笑脸·巨左右', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1098, name: '笑脸·巨上下', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1099, name: '三角·巨果', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1100, name: '三角·巨蔬', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1101, name: '圆·巨混薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1102, name: '圆·巨薄左右', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1103, name: '圆·巨薄上下', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1104, name: '皇冠·巨混薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1105, name: '皇冠·巨薄左右', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1106, name: '皇冠·巨薄上下', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1107, name: '礼物·巨混薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1108, name: '礼物·巨薄左右', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1109, name: '礼物·巨薄上下', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1110, name: '笑脸·巨混薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1111, name: '笑脸·巨薄左右', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1112, name: '笑脸·巨薄上下', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1113, name: '三角·巨果薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1114, name: '三角·巨蔬薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1115, name: '圆·巨混厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1116, name: '圆·巨厚左右', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1117, name: '圆·巨厚上下', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1118, name: '皇冠·巨混厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1119, name: '皇冠·巨厚左右', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1120, name: '皇冠·巨厚上下', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1121, name: '礼物·巨混厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1122, name: '礼物·巨厚左右', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1123, name: '礼物·巨厚上下', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1124, name: '笑脸·巨混厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1125, name: '笑脸·巨厚左右', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1126, name: '笑脸·巨厚上下', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1127, name: '三角·巨果厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1128, name: '三角·巨蔬厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1129, name: '方块·巨果', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1130, name: '方块·巨蔬', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1131, name: '三角·巨混', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1132, name: '三角·巨左右', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1133, name: '三角·巨上下', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1134, name: '方块·巨果薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1135, name: '方块·巨蔬薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1136, name: '三角·巨混薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1137, name: '三角·巨薄左右', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1138, name: '三角·巨薄上下', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1139, name: '方块·巨果厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1140, name: '方块·巨蔬厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1141, name: '三角·巨混厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1142, name: '三角·巨厚左右', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1143, name: '三角·巨厚上下', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1144, name: '方块·巨混', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1145, name: '方块·巨左右', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'square', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1146, name: '方块·巨上下', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'square', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1147, name: '方块·巨混薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1148, name: '方块·巨薄左右', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1149, name: '方块·巨薄上下', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1150, name: '方块·巨混厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1151, name: '方块·巨厚左右', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1152, name: '方块·巨厚上下', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 3, zoneMode: 'tb', cardSet: null,
  },
];
if (typeof module !== 'undefined' && module.exports) module.exports = GameGlobal.SPECIAL_LEVELS;