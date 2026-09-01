// 自动生成，勿手改 —— 由 tools/gen_levels.js 产出（特殊关卡：id 从 1003 起，按难度递进）
// 共 1125 关，覆盖 k=1/2/3 全尺寸，顺序解锁。
// **号段约定**：普通关 1~99；特殊关统一 1001 起（1001 展翅雄鹰 / 1002 心心相印 / 1003+ 本文件注水关），
// 两类号段彻底分离、永不撞号（getLevelConfig 先查普通关，号段不重叠即不会互相遮蔽）。
// 想新增特殊玩法：在此数组追加一条（引用版：shapeKey/k/zoneMode/cardSet，运行时由 config.js 的 expandShapeRef 展开），
// 或把更多 k 档/维度交给 gen_levels.js 重跑生成。1~99 为手调普通关（含移动卡关），不在本文件内。
GameGlobal.SPECIAL_LEVELS = [
  {
    id: 1003, name: '蝴蝶·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1004, name: '蝴蝶·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1005, name: '猫·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1006, name: '猫·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1007, name: '圆·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1008, name: '圆·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1009, name: '云·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1010, name: '云·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1011, name: '月牙·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1012, name: '月牙·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1013, name: '十字·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1014, name: '十字·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1015, name: '皇冠·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1016, name: '皇冠·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1017, name: '菱形·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1018, name: '菱形·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1019, name: '水滴·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1020, name: '水滴·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1021, name: '鱼·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1022, name: '鱼·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1023, name: '花·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1024, name: '花·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1025, name: '礼物·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1026, name: '礼物·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1027, name: '爱心·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1028, name: '爱心·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1029, name: '房子·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1030, name: '房子·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1031, name: '叶子·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1032, name: '叶子·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1033, name: '蘑菇·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1034, name: '蘑菇·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1035, name: '音符·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1036, name: '音符·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1037, name: '圆环·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1038, name: '圆环·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1039, name: '盾牌·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1040, name: '盾牌·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1041, name: '笑脸·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1042, name: '笑脸·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1043, name: '方块·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1044, name: '方块·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1045, name: '星星·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1046, name: '星星·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1047, name: '太阳·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1048, name: '太阳·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1049, name: '树·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1050, name: '树·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1051, name: '三角·果', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1052, name: '三角·蔬', difficulty: 1,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1053, name: '蝴蝶·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1054, name: '蝴蝶·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1055, name: '猫·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1056, name: '猫·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1057, name: '圆·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1058, name: '圆·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1059, name: '云·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1060, name: '云·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1061, name: '月牙·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1062, name: '月牙·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1063, name: '十字·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1064, name: '十字·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1065, name: '皇冠·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1066, name: '皇冠·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1067, name: '菱形·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1068, name: '菱形·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1069, name: '水滴·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1070, name: '水滴·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1071, name: '鱼·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1072, name: '鱼·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1073, name: '花·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1074, name: '花·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1075, name: '礼物·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1076, name: '礼物·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1077, name: '爱心·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1078, name: '爱心·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1079, name: '房子·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1080, name: '房子·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1081, name: '叶子·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1082, name: '叶子·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1083, name: '蘑菇·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1084, name: '蘑菇·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1085, name: '音符·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1086, name: '音符·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1087, name: '圆环·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1088, name: '圆环·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1089, name: '盾牌·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1090, name: '盾牌·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1091, name: '笑脸·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1092, name: '笑脸·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1093, name: '方块·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1094, name: '方块·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1095, name: '星星·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1096, name: '星星·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1097, name: '太阳·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1098, name: '太阳·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1099, name: '树·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1100, name: '树·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1101, name: '三角·果薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1102, name: '三角·蔬薄', difficulty: 1,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1103, name: '蝴蝶·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1104, name: '蝴蝶·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1105, name: '猫·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1106, name: '猫·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1107, name: '圆·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1108, name: '圆·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1109, name: '云·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1110, name: '云·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1111, name: '月牙·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1112, name: '月牙·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1113, name: '十字·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1114, name: '十字·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1115, name: '皇冠·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1116, name: '皇冠·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1117, name: '菱形·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1118, name: '菱形·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1119, name: '水滴·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1120, name: '水滴·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1121, name: '鱼·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1122, name: '鱼·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1123, name: '花·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1124, name: '花·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1125, name: '礼物·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1126, name: '礼物·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1127, name: '爱心·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1128, name: '爱心·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1129, name: '房子·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1130, name: '房子·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1131, name: '叶子·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1132, name: '叶子·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1133, name: '蘑菇·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1134, name: '蘑菇·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1135, name: '音符·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1136, name: '音符·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1137, name: '圆环·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1138, name: '圆环·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1139, name: '盾牌·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1140, name: '盾牌·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1141, name: '笑脸·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1142, name: '笑脸·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1143, name: '方块·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1144, name: '方块·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1145, name: '星星·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1146, name: '星星·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1147, name: '太阳·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1148, name: '太阳·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1149, name: '树·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1150, name: '树·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1151, name: '三角·果厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1152, name: '三角·蔬厚', difficulty: 1,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1153, name: '蝴蝶·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1154, name: '蝴蝶·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1155, name: '蝴蝶·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1156, name: '猫·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1157, name: '猫·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cat', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1158, name: '猫·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cat', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1159, name: '圆·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1160, name: '圆·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'circle', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1161, name: '圆·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'circle', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1162, name: '云·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1163, name: '云·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1164, name: '云·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1165, name: '月牙·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1166, name: '月牙·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1167, name: '月牙·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1168, name: '十字·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1169, name: '十字·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cross', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1170, name: '十字·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cross', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1171, name: '皇冠·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1172, name: '皇冠·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crown', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1173, name: '皇冠·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crown', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1174, name: '菱形·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1175, name: '菱形·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1176, name: '菱形·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1177, name: '水滴·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1178, name: '水滴·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'drop', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1179, name: '水滴·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'drop', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1180, name: '鱼·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1181, name: '鱼·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'fish', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1182, name: '鱼·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'fish', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1183, name: '花·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1184, name: '花·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1185, name: '花·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1186, name: '花·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1187, name: '花·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1188, name: '礼物·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1189, name: '礼物·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'gift', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1190, name: '礼物·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'gift', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1191, name: '爱心·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1192, name: '爱心·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'heart', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1193, name: '爱心·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'heart', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1194, name: '房子·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1195, name: '房子·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'house', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1196, name: '房子·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'house', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1197, name: '叶子·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1198, name: '叶子·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1199, name: '叶子·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1200, name: '蘑菇·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1201, name: '蘑菇·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1202, name: '蘑菇·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1203, name: '音符·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1204, name: '音符·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1205, name: '音符·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1206, name: '音符·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1207, name: '音符·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1208, name: '圆环·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1209, name: '圆环·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'ring', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1210, name: '圆环·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'ring', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1211, name: '盾牌·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1212, name: '盾牌·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'shield', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1213, name: '盾牌·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'shield', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1214, name: '笑脸·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1215, name: '笑脸·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1216, name: '笑脸·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1217, name: '方块·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1218, name: '方块·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'square', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1219, name: '方块·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'square', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1220, name: '星星·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1221, name: '星星·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1222, name: '星星·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1223, name: '星星·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1224, name: '星星·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1225, name: '太阳·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1226, name: '太阳·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1227, name: '太阳·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1228, name: '太阳·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1229, name: '太阳·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1230, name: '树·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1231, name: '树·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'tree', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1232, name: '树·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'tree', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1233, name: '三角·混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1234, name: '三角·左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1235, name: '三角·上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1236, name: '蝴蝶·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1237, name: '蝴蝶·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1238, name: '蝴蝶·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1239, name: '猫·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1240, name: '猫·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1241, name: '猫·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1242, name: '圆·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1243, name: '圆·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1244, name: '圆·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1245, name: '云·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1246, name: '云·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1247, name: '云·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1248, name: '月牙·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1249, name: '月牙·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1250, name: '月牙·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1251, name: '十字·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1252, name: '十字·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1253, name: '十字·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1254, name: '皇冠·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1255, name: '皇冠·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1256, name: '皇冠·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1257, name: '菱形·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1258, name: '菱形·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1259, name: '菱形·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1260, name: '水滴·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1261, name: '水滴·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1262, name: '水滴·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1263, name: '鱼·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1264, name: '鱼·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1265, name: '鱼·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1266, name: '花·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1267, name: '花·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1268, name: '花·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1269, name: '花·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1270, name: '花·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1271, name: '礼物·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1272, name: '礼物·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1273, name: '礼物·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1274, name: '爱心·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1275, name: '爱心·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1276, name: '爱心·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1277, name: '房子·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1278, name: '房子·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1279, name: '房子·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1280, name: '叶子·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1281, name: '叶子·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1282, name: '叶子·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1283, name: '蘑菇·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1284, name: '蘑菇·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1285, name: '蘑菇·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1286, name: '音符·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1287, name: '音符·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1288, name: '音符·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1289, name: '音符·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1290, name: '音符·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1291, name: '圆环·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1292, name: '圆环·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1293, name: '圆环·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1294, name: '盾牌·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1295, name: '盾牌·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1296, name: '盾牌·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1297, name: '笑脸·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1298, name: '笑脸·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1299, name: '笑脸·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1300, name: '方块·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1301, name: '方块·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1302, name: '方块·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1303, name: '星星·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1304, name: '星星·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1305, name: '星星·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1306, name: '星星·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1307, name: '星星·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1308, name: '太阳·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1309, name: '太阳·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1310, name: '太阳·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1311, name: '太阳·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1312, name: '太阳·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1313, name: '树·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1314, name: '树·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1315, name: '树·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1316, name: '三角·混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1317, name: '三角·薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1318, name: '三角·薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1319, name: '蝴蝶·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1320, name: '蝴蝶·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1321, name: '蝴蝶·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1322, name: '猫·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1323, name: '猫·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1324, name: '猫·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1325, name: '圆·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1326, name: '圆·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1327, name: '圆·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1328, name: '云·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1329, name: '云·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1330, name: '云·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1331, name: '月牙·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1332, name: '月牙·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1333, name: '月牙·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1334, name: '十字·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1335, name: '十字·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1336, name: '十字·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1337, name: '皇冠·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1338, name: '皇冠·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1339, name: '皇冠·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1340, name: '菱形·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1341, name: '菱形·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1342, name: '菱形·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1343, name: '水滴·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1344, name: '水滴·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1345, name: '水滴·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1346, name: '鱼·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1347, name: '鱼·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1348, name: '鱼·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1349, name: '花·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1350, name: '花·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1351, name: '花·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1352, name: '花·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1353, name: '花·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1354, name: '礼物·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1355, name: '礼物·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1356, name: '礼物·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1357, name: '爱心·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1358, name: '爱心·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1359, name: '爱心·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1360, name: '房子·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1361, name: '房子·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1362, name: '房子·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1363, name: '叶子·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1364, name: '叶子·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1365, name: '叶子·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1366, name: '蘑菇·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1367, name: '蘑菇·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1368, name: '蘑菇·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1369, name: '音符·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1370, name: '音符·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1371, name: '音符·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1372, name: '音符·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1373, name: '音符·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1374, name: '圆环·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1375, name: '圆环·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1376, name: '圆环·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1377, name: '盾牌·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1378, name: '盾牌·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1379, name: '盾牌·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1380, name: '笑脸·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1381, name: '笑脸·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1382, name: '笑脸·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1383, name: '方块·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1384, name: '方块·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1385, name: '方块·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1386, name: '星星·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1387, name: '星星·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1388, name: '星星·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1389, name: '星星·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1390, name: '星星·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1391, name: '太阳·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1392, name: '太阳·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1393, name: '太阳·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1394, name: '太阳·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1395, name: '太阳·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1396, name: '树·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1397, name: '树·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1398, name: '树·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1399, name: '三角·混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 1, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1400, name: '三角·厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 1, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1401, name: '三角·厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 1, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1402, name: '蝴蝶·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1403, name: '蝴蝶·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1404, name: '猫·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1405, name: '猫·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1406, name: '圆·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1407, name: '圆·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1408, name: '云·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1409, name: '云·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1410, name: '月牙·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1411, name: '月牙·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1412, name: '十字·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1413, name: '十字·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1414, name: '菱形·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1415, name: '菱形·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1416, name: '水滴·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1417, name: '水滴·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1418, name: '鱼·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1419, name: '鱼·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1420, name: '花·大混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1421, name: '花·大左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1422, name: '花·大上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'flower', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1423, name: '爱心·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1424, name: '爱心·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1425, name: '房子·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1426, name: '房子·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1427, name: '叶子·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1428, name: '叶子·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1429, name: '蘑菇·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1430, name: '蘑菇·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1431, name: '音符·大混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1432, name: '音符·大左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1433, name: '音符·大上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'music', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1434, name: '圆环·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1435, name: '圆环·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1436, name: '盾牌·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1437, name: '盾牌·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1438, name: '笑脸·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1439, name: '笑脸·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1440, name: '星星·大混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1441, name: '星星·大左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1442, name: '星星·大上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'star', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1443, name: '太阳·大混', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1444, name: '太阳·大左右', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1445, name: '太阳·大上下', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'sun', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1446, name: '树·大果', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1447, name: '树·大蔬', difficulty: 2,
    frozenRatio: 0,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1448, name: '蝴蝶·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1449, name: '蝴蝶·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1450, name: '猫·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1451, name: '猫·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1452, name: '圆·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1453, name: '圆·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1454, name: '云·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1455, name: '云·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1456, name: '月牙·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1457, name: '月牙·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1458, name: '十字·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1459, name: '十字·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1460, name: '菱形·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1461, name: '菱形·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1462, name: '水滴·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1463, name: '水滴·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1464, name: '鱼·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1465, name: '鱼·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1466, name: '花·大混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1467, name: '花·大薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1468, name: '花·大薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1469, name: '爱心·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1470, name: '爱心·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1471, name: '房子·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1472, name: '房子·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1473, name: '叶子·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1474, name: '叶子·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1475, name: '蘑菇·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1476, name: '蘑菇·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1477, name: '音符·大混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1478, name: '音符·大薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1479, name: '音符·大薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1480, name: '圆环·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1481, name: '圆环·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1482, name: '盾牌·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1483, name: '盾牌·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1484, name: '笑脸·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1485, name: '笑脸·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1486, name: '星星·大混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1487, name: '星星·大薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1488, name: '星星·大薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1489, name: '太阳·大混薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1490, name: '太阳·大薄左右', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1491, name: '太阳·大薄上下', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1492, name: '树·大果薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1493, name: '树·大蔬薄', difficulty: 2,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1494, name: '蝴蝶·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1495, name: '蝴蝶·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1496, name: '猫·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1497, name: '猫·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1498, name: '圆·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1499, name: '圆·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1500, name: '云·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1501, name: '云·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1502, name: '月牙·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1503, name: '月牙·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1504, name: '十字·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1505, name: '十字·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1506, name: '菱形·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1507, name: '菱形·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1508, name: '水滴·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1509, name: '水滴·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1510, name: '鱼·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1511, name: '鱼·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1512, name: '花·大混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1513, name: '花·大厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1514, name: '花·大厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1515, name: '爱心·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1516, name: '爱心·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1517, name: '房子·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1518, name: '房子·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1519, name: '叶子·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1520, name: '叶子·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1521, name: '蘑菇·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1522, name: '蘑菇·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1523, name: '音符·大混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1524, name: '音符·大厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1525, name: '音符·大厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1526, name: '圆环·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1527, name: '圆环·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1528, name: '盾牌·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1529, name: '盾牌·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1530, name: '笑脸·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1531, name: '笑脸·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1532, name: '星星·大混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1533, name: '星星·大厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1534, name: '星星·大厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1535, name: '太阳·大混厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1536, name: '太阳·大厚左右', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1537, name: '太阳·大厚上下', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1538, name: '树·大果厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1539, name: '树·大蔬厚', difficulty: 2,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1540, name: '蝴蝶·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1541, name: '蝴蝶·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1542, name: '蝴蝶·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1543, name: '猫·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1544, name: '猫·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cat', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1545, name: '猫·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cat', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1546, name: '圆·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1547, name: '圆·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'circle', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1548, name: '圆·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'circle', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1549, name: '云·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1550, name: '云·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1551, name: '云·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1552, name: '月牙·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1553, name: '月牙·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1554, name: '月牙·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1555, name: '十字·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1556, name: '十字·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cross', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1557, name: '十字·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cross', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1558, name: '皇冠·大果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1559, name: '皇冠·大蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1560, name: '菱形·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1561, name: '菱形·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1562, name: '菱形·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1563, name: '水滴·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1564, name: '水滴·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'drop', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1565, name: '水滴·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'drop', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1566, name: '鱼·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1567, name: '鱼·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'fish', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1568, name: '鱼·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'fish', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1569, name: '花·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1570, name: '花·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1571, name: '礼物·大果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1572, name: '礼物·大蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1573, name: '爱心·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1574, name: '爱心·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'heart', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1575, name: '爱心·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'heart', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1576, name: '房子·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1577, name: '房子·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'house', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1578, name: '房子·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'house', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1579, name: '叶子·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1580, name: '叶子·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1581, name: '叶子·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1582, name: '蘑菇·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1583, name: '蘑菇·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1584, name: '蘑菇·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1585, name: '音符·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1586, name: '音符·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1587, name: '圆环·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1588, name: '圆环·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'ring', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1589, name: '圆环·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'ring', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1590, name: '盾牌·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1591, name: '盾牌·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'shield', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1592, name: '盾牌·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'shield', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1593, name: '笑脸·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1594, name: '笑脸·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1595, name: '笑脸·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1596, name: '星星·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1597, name: '星星·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1598, name: '太阳·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1599, name: '太阳·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1600, name: '树·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1601, name: '树·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'tree', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1602, name: '树·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'tree', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1603, name: '三角·大果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1604, name: '三角·大蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1605, name: '蝴蝶·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1606, name: '蝴蝶·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1607, name: '蝴蝶·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1608, name: '猫·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1609, name: '猫·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1610, name: '猫·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1611, name: '圆·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1612, name: '圆·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1613, name: '圆·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1614, name: '云·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1615, name: '云·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1616, name: '云·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1617, name: '月牙·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1618, name: '月牙·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1619, name: '月牙·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1620, name: '十字·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1621, name: '十字·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1622, name: '十字·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1623, name: '皇冠·大果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1624, name: '皇冠·大蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1625, name: '菱形·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1626, name: '菱形·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1627, name: '菱形·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1628, name: '水滴·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1629, name: '水滴·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1630, name: '水滴·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1631, name: '鱼·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1632, name: '鱼·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1633, name: '鱼·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1634, name: '花·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1635, name: '花·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1636, name: '礼物·大果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1637, name: '礼物·大蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1638, name: '爱心·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1639, name: '爱心·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1640, name: '爱心·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1641, name: '房子·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1642, name: '房子·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1643, name: '房子·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1644, name: '叶子·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1645, name: '叶子·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1646, name: '叶子·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1647, name: '蘑菇·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1648, name: '蘑菇·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1649, name: '蘑菇·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1650, name: '音符·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1651, name: '音符·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1652, name: '圆环·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1653, name: '圆环·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1654, name: '圆环·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1655, name: '盾牌·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1656, name: '盾牌·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1657, name: '盾牌·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1658, name: '笑脸·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1659, name: '笑脸·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1660, name: '笑脸·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1661, name: '星星·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1662, name: '星星·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1663, name: '太阳·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1664, name: '太阳·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1665, name: '树·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1666, name: '树·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1667, name: '树·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1668, name: '三角·大果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1669, name: '三角·大蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1670, name: '蝴蝶·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1671, name: '蝴蝶·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1672, name: '蝴蝶·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1673, name: '猫·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1674, name: '猫·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1675, name: '猫·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1676, name: '圆·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1677, name: '圆·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1678, name: '圆·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1679, name: '云·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1680, name: '云·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1681, name: '云·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1682, name: '月牙·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1683, name: '月牙·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1684, name: '月牙·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1685, name: '十字·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1686, name: '十字·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1687, name: '十字·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1688, name: '皇冠·大果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1689, name: '皇冠·大蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1690, name: '菱形·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1691, name: '菱形·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1692, name: '菱形·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1693, name: '水滴·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1694, name: '水滴·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1695, name: '水滴·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1696, name: '鱼·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1697, name: '鱼·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1698, name: '鱼·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1699, name: '花·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1700, name: '花·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1701, name: '礼物·大果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1702, name: '礼物·大蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1703, name: '爱心·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1704, name: '爱心·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1705, name: '爱心·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1706, name: '房子·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1707, name: '房子·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1708, name: '房子·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1709, name: '叶子·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1710, name: '叶子·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1711, name: '叶子·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1712, name: '蘑菇·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1713, name: '蘑菇·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1714, name: '蘑菇·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1715, name: '音符·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1716, name: '音符·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1717, name: '圆环·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1718, name: '圆环·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1719, name: '圆环·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1720, name: '盾牌·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1721, name: '盾牌·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1722, name: '盾牌·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1723, name: '笑脸·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1724, name: '笑脸·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1725, name: '笑脸·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1726, name: '星星·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1727, name: '星星·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1728, name: '太阳·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1729, name: '太阳·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1730, name: '树·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1731, name: '树·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1732, name: '树·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1733, name: '三角·大果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1734, name: '三角·大蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1735, name: '蝴蝶·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1736, name: '蝴蝶·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1737, name: '云·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1738, name: '云·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1739, name: '月牙·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1740, name: '月牙·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1741, name: '皇冠·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1742, name: '皇冠·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crown', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1743, name: '皇冠·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'crown', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1744, name: '花·巨混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1745, name: '花·巨左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'flower', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1746, name: '花·巨上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'flower', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1747, name: '礼物·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1748, name: '礼物·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'gift', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1749, name: '礼物·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'gift', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1750, name: '叶子·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1751, name: '叶子·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1752, name: '蘑菇·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1753, name: '蘑菇·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1754, name: '音符·巨混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1755, name: '音符·巨左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'music', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1756, name: '音符·巨上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'music', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1757, name: '圆环·巨果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1758, name: '圆环·巨蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1759, name: '方块·大果', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1760, name: '方块·大蔬', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1761, name: '星星·巨混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1762, name: '星星·巨左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'star', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1763, name: '星星·巨上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'star', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1764, name: '太阳·巨混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1765, name: '太阳·巨左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'sun', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1766, name: '太阳·巨上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'sun', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1767, name: '三角·大混', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1768, name: '三角·大左右', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1769, name: '三角·大上下', difficulty: 3,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1770, name: '蝴蝶·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1771, name: '蝴蝶·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1772, name: '云·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1773, name: '云·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1774, name: '月牙·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1775, name: '月牙·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1776, name: '皇冠·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1777, name: '皇冠·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1778, name: '皇冠·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1779, name: '花·巨混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1780, name: '花·巨薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1781, name: '花·巨薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'flower', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1782, name: '礼物·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1783, name: '礼物·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1784, name: '礼物·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1785, name: '叶子·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1786, name: '叶子·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1787, name: '蘑菇·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1788, name: '蘑菇·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1789, name: '音符·巨混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1790, name: '音符·巨薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1791, name: '音符·巨薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'music', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1792, name: '圆环·巨果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1793, name: '圆环·巨蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1794, name: '方块·大果薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1795, name: '方块·大蔬薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1796, name: '星星·巨混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1797, name: '星星·巨薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1798, name: '星星·巨薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'star', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1799, name: '太阳·巨混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1800, name: '太阳·巨薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1801, name: '太阳·巨薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'sun', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1802, name: '三角·大混薄', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1803, name: '三角·大薄左右', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1804, name: '三角·大薄上下', difficulty: 3,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1805, name: '蝴蝶·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1806, name: '蝴蝶·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1807, name: '云·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1808, name: '云·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1809, name: '月牙·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1810, name: '月牙·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1811, name: '皇冠·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1812, name: '皇冠·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1813, name: '皇冠·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1814, name: '花·巨混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1815, name: '花·巨厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1816, name: '花·巨厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'flower', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1817, name: '礼物·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1818, name: '礼物·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1819, name: '礼物·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1820, name: '叶子·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1821, name: '叶子·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1822, name: '蘑菇·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1823, name: '蘑菇·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1824, name: '音符·巨混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1825, name: '音符·巨厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1826, name: '音符·巨厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'music', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1827, name: '圆环·巨果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1828, name: '圆环·巨蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1829, name: '方块·大果厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1830, name: '方块·大蔬厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1831, name: '星星·巨混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1832, name: '星星·巨厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1833, name: '星星·巨厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'star', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1834, name: '太阳·巨混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1835, name: '太阳·巨厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1836, name: '太阳·巨厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'sun', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1837, name: '三角·大混厚', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1838, name: '三角·大厚左右', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1839, name: '三角·大厚上下', difficulty: 3,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1840, name: '蝴蝶·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1841, name: '蝴蝶·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1842, name: '蝴蝶·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'butterfly', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1843, name: '猫·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1844, name: '猫·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1845, name: '云·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1846, name: '云·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1847, name: '云·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cloud', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1848, name: '月牙·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1849, name: '月牙·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1850, name: '月牙·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'crescent', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1851, name: '十字·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1852, name: '十字·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1853, name: '菱形·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1854, name: '菱形·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1855, name: '水滴·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1856, name: '水滴·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1857, name: '鱼·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1858, name: '鱼·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1859, name: '爱心·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1860, name: '爱心·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1861, name: '房子·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1862, name: '房子·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1863, name: '叶子·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1864, name: '叶子·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1865, name: '叶子·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'leaf', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1866, name: '蘑菇·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1867, name: '蘑菇·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1868, name: '蘑菇·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'mushroom', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1869, name: '圆环·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1870, name: '圆环·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'ring', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1871, name: '圆环·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'ring', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1872, name: '盾牌·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1873, name: '盾牌·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1874, name: '方块·大混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1875, name: '方块·大左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'square', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1876, name: '方块·大上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'square', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1877, name: '树·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1878, name: '树·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1879, name: '蝴蝶·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1880, name: '蝴蝶·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1881, name: '蝴蝶·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'butterfly', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1882, name: '猫·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1883, name: '猫·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1884, name: '云·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1885, name: '云·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1886, name: '云·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cloud', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1887, name: '月牙·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1888, name: '月牙·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1889, name: '月牙·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'crescent', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1890, name: '十字·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1891, name: '十字·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1892, name: '菱形·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1893, name: '菱形·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1894, name: '水滴·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1895, name: '水滴·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1896, name: '鱼·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1897, name: '鱼·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1898, name: '爱心·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1899, name: '爱心·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1900, name: '房子·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1901, name: '房子·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1902, name: '叶子·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1903, name: '叶子·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1904, name: '叶子·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'leaf', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1905, name: '蘑菇·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1906, name: '蘑菇·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1907, name: '蘑菇·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'mushroom', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1908, name: '圆环·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1909, name: '圆环·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1910, name: '圆环·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'ring', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1911, name: '盾牌·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1912, name: '盾牌·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1913, name: '方块·大混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1914, name: '方块·大薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1915, name: '方块·大薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1916, name: '树·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1917, name: '树·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1918, name: '蝴蝶·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1919, name: '蝴蝶·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1920, name: '蝴蝶·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'butterfly', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1921, name: '猫·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1922, name: '猫·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1923, name: '云·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1924, name: '云·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1925, name: '云·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cloud', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1926, name: '月牙·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1927, name: '月牙·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1928, name: '月牙·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'crescent', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1929, name: '十字·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1930, name: '十字·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1931, name: '菱形·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1932, name: '菱形·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1933, name: '水滴·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1934, name: '水滴·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1935, name: '鱼·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1936, name: '鱼·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1937, name: '爱心·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1938, name: '爱心·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1939, name: '房子·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1940, name: '房子·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1941, name: '叶子·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1942, name: '叶子·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1943, name: '叶子·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'leaf', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1944, name: '蘑菇·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1945, name: '蘑菇·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1946, name: '蘑菇·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'mushroom', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1947, name: '圆环·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1948, name: '圆环·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1949, name: '圆环·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'ring', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1950, name: '盾牌·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1951, name: '盾牌·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1952, name: '方块·大混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 2, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1953, name: '方块·大厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 2, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1954, name: '方块·大厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 2, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1955, name: '树·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1956, name: '树·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1957, name: '猫·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1958, name: '猫·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cat', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1959, name: '猫·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cat', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1960, name: '圆·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1961, name: '圆·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1962, name: '十字·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1963, name: '十字·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cross', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1964, name: '十字·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'cross', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1965, name: '皇冠·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1966, name: '皇冠·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1967, name: '菱形·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1968, name: '菱形·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1969, name: '菱形·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'diamond', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1970, name: '水滴·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1971, name: '水滴·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'drop', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1972, name: '水滴·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'drop', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1973, name: '鱼·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1974, name: '鱼·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'fish', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1975, name: '鱼·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'fish', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1976, name: '礼物·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1977, name: '礼物·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1978, name: '爱心·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1979, name: '爱心·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'heart', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1980, name: '爱心·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'heart', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1981, name: '房子·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1982, name: '房子·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'house', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1983, name: '房子·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'house', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1984, name: '盾牌·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1985, name: '盾牌·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'shield', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1986, name: '盾牌·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'shield', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1987, name: '笑脸·巨果', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1988, name: '笑脸·巨蔬', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1989, name: '树·巨混', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1990, name: '树·巨左右', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'tree', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1991, name: '树·巨上下', difficulty: 4,
    frozenRatio: 0,
    shapeKey: 'tree', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1992, name: '猫·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1993, name: '猫·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1994, name: '猫·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cat', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 1995, name: '圆·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 1996, name: '圆·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 1997, name: '十字·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 1998, name: '十字·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 1999, name: '十字·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'cross', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2000, name: '皇冠·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 2001, name: '皇冠·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 2002, name: '菱形·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2003, name: '菱形·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2004, name: '菱形·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'diamond', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2005, name: '水滴·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2006, name: '水滴·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2007, name: '水滴·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'drop', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2008, name: '鱼·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2009, name: '鱼·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2010, name: '鱼·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'fish', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2011, name: '礼物·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 2012, name: '礼物·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 2013, name: '爱心·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2014, name: '爱心·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2015, name: '爱心·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'heart', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2016, name: '房子·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2017, name: '房子·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2018, name: '房子·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'house', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2019, name: '盾牌·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2020, name: '盾牌·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2021, name: '盾牌·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'shield', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2022, name: '笑脸·巨果薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 2023, name: '笑脸·巨蔬薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 2024, name: '树·巨混薄', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2025, name: '树·巨薄左右', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2026, name: '树·巨薄上下', difficulty: 4,
    frozenRatio: 0.2,
    shapeKey: 'tree', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2027, name: '猫·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2028, name: '猫·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2029, name: '猫·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cat', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2030, name: '圆·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 2031, name: '圆·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 2032, name: '十字·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2033, name: '十字·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2034, name: '十字·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'cross', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2035, name: '皇冠·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 2036, name: '皇冠·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 2037, name: '菱形·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2038, name: '菱形·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2039, name: '菱形·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'diamond', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2040, name: '水滴·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2041, name: '水滴·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2042, name: '水滴·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'drop', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2043, name: '鱼·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2044, name: '鱼·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2045, name: '鱼·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'fish', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2046, name: '礼物·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 2047, name: '礼物·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 2048, name: '爱心·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2049, name: '爱心·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2050, name: '爱心·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'heart', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2051, name: '房子·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2052, name: '房子·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2053, name: '房子·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'house', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2054, name: '盾牌·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2055, name: '盾牌·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2056, name: '盾牌·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'shield', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2057, name: '笑脸·巨果厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 2058, name: '笑脸·巨蔬厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 2059, name: '树·巨混厚', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2060, name: '树·巨厚左右', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2061, name: '树·巨厚上下', difficulty: 4,
    frozenRatio: 0.3,
    shapeKey: 'tree', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2062, name: '圆·巨混', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2063, name: '圆·巨左右', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'circle', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2064, name: '圆·巨上下', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'circle', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2065, name: '皇冠·巨混', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2066, name: '皇冠·巨左右', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'crown', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2067, name: '皇冠·巨上下', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'crown', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2068, name: '礼物·巨混', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2069, name: '礼物·巨左右', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'gift', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2070, name: '礼物·巨上下', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'gift', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2071, name: '笑脸·巨混', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2072, name: '笑脸·巨左右', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2073, name: '笑脸·巨上下', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'smiley', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2074, name: '三角·巨果', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 2075, name: '三角·巨蔬', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 2076, name: '圆·巨混薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2077, name: '圆·巨薄左右', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2078, name: '圆·巨薄上下', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'circle', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2079, name: '皇冠·巨混薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2080, name: '皇冠·巨薄左右', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2081, name: '皇冠·巨薄上下', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'crown', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2082, name: '礼物·巨混薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2083, name: '礼物·巨薄左右', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2084, name: '礼物·巨薄上下', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'gift', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2085, name: '笑脸·巨混薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2086, name: '笑脸·巨薄左右', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2087, name: '笑脸·巨薄上下', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'smiley', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2088, name: '三角·巨果薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 2089, name: '三角·巨蔬薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 2090, name: '圆·巨混厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2091, name: '圆·巨厚左右', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2092, name: '圆·巨厚上下', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'circle', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2093, name: '皇冠·巨混厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2094, name: '皇冠·巨厚左右', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2095, name: '皇冠·巨厚上下', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'crown', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2096, name: '礼物·巨混厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2097, name: '礼物·巨厚左右', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2098, name: '礼物·巨厚上下', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'gift', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2099, name: '笑脸·巨混厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2100, name: '笑脸·巨厚左右', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2101, name: '笑脸·巨厚上下', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'smiley', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2102, name: '三角·巨果厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 2103, name: '三角·巨蔬厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 2104, name: '方块·巨果', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 2105, name: '方块·巨蔬', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 2106, name: '三角·巨混', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2107, name: '三角·巨左右', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2108, name: '三角·巨上下', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'triangle', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2109, name: '方块·巨果薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 2110, name: '方块·巨蔬薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 2111, name: '三角·巨混薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2112, name: '三角·巨薄左右', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2113, name: '三角·巨薄上下', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'triangle', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2114, name: '方块·巨果厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'fruit',
  },
  {
    id: 2115, name: '方块·巨蔬厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'veg',
  },
  {
    id: 2116, name: '三角·巨混厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2117, name: '三角·巨厚左右', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2118, name: '三角·巨厚上下', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'triangle', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2119, name: '方块·巨混', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2120, name: '方块·巨左右', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'square', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2121, name: '方块·巨上下', difficulty: 5,
    frozenRatio: 0,
    shapeKey: 'square', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2122, name: '方块·巨混薄', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2123, name: '方块·巨薄左右', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2124, name: '方块·巨薄上下', difficulty: 5,
    frozenRatio: 0.2,
    shapeKey: 'square', k: 3, zoneMode: 'tb', cardSet: null,
  },
  {
    id: 2125, name: '方块·巨混厚', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 3, zoneMode: 'single', cardSet: 'mixed',
  },
  {
    id: 2126, name: '方块·巨厚左右', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 3, zoneMode: 'lr', cardSet: null,
  },
  {
    id: 2127, name: '方块·巨厚上下', difficulty: 5,
    frozenRatio: 0.3,
    shapeKey: 'square', k: 3, zoneMode: 'tb', cardSet: null,
  },
];
if (typeof module !== 'undefined' && module.exports) module.exports = GameGlobal.SPECIAL_LEVELS;