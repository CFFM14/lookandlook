// js/shapes.js —— 形状字符画素材库（供关卡 shapeMap 直接引用）
//
// 格式约定（与 game.js _buildShapeData 完全兼容）：
//   · 形状是一个「字符串数组」，每个元素是一行；同一形状内【每行长度必须相等】。
//   · 字符 '.' = 镂空（该格不生成卡片）。
//   · 字符 'A'~'H' = 分区 0~7：单分区形状统一用 'A'，多分区用不同字母划分（见 eagle）。
//   · 绝对不要在形状里使用空格——空格会被当成填充格！镂空一律用 '.'。
//
// 用法（在 config.js 的 levels.push({...}) 里）：
//   shapeMap: GameGlobal.SHAPES.star                              // 直接引用
//   shapeMap: GameGlobal.scaleShape(GameGlobal.SHAPES.star, 2)    // 放大 2 倍（同一形状 → S/M/L 尺寸）
//   rows/cols 必须与 shapeMap 实际尺寸一致，用 GameGlobal.shapeSize(x) 取得 {rows, cols}。
//   多分区形状（如 eagle）还需配 zonePools；单分区配 zonePools:{0:[...]} 即可。
(function () {
  var G = (typeof GameGlobal !== 'undefined') ? GameGlobal
        : (typeof globalThis !== 'undefined' ? globalThis : this);

  // ── 5×7 点阵字体（字母 A~Z + 数字 0~9）─────────────────────
  // '1' = 填充（→ 'A'），'0' = 镂空（→ '.'），转换见 letterShape / digitShape。
  G.FONT5x7 = {
    'A': ['01110','10001','10001','11111','10001','10001','10001'],
    'B': ['11110','10001','10001','11110','10001','10001','11110'],
    'C': ['01111','10000','10000','10000','10000','10000','01111'],
    'D': ['11110','10001','10001','10001','10001','10001','11110'],
    'E': ['11111','10000','10000','11110','10000','10000','11111'],
    'F': ['11111','10000','10000','11110','10000','10000','10000'],
    'G': ['01111','10000','10000','10011','10001','10001','01111'],
    'H': ['10001','10001','10001','11111','10001','10001','10001'],
    'I': ['11111','00100','00100','00100','00100','00100','11111'],
    'J': ['00111','00010','00010','00010','00010','10010','01100'],
    'K': ['10001','10010','10100','11000','10100','10010','10001'],
    'L': ['10000','10000','10000','10000','10000','10000','11111'],
    'M': ['10001','11011','10101','10101','10001','10001','10001'],
    'N': ['10001','11001','10101','10101','10011','10001','10001'],
    'O': ['01110','10001','10001','10001','10001','10001','01110'],
    'P': ['11110','10001','10001','11110','10000','10000','10000'],
    'Q': ['01110','10001','10001','10001','10101','10010','01101'],
    'R': ['11110','10001','10001','11110','10100','10010','10001'],
    'S': ['01111','10000','10000','01110','00001','00001','11110'],
    'T': ['11111','00100','00100','00100','00100','00100','00100'],
    'U': ['10001','10001','10001','10001','10001','10001','01110'],
    'V': ['10001','10001','10001','10001','10001','01010','00100'],
    'W': ['10001','10001','10001','10101','10101','10101','11011'],
    'X': ['10001','10001','01010','00100','01010','10001','10001'],
    'Y': ['10001','10001','01010','00100','00100','00100','00100'],
    'Z': ['11111','00001','00100','01000','10000','10000','11111'],
    '0': ['01110','10001','10011','10101','11001','10001','01110'],
    '1': ['00100','01100','00100','00100','00100','00100','01110'],
    '2': ['01110','10001','00001','00100','01000','10000','11111'],
    '3': ['11110','00001','00001','01110','00001','00001','11110'],
    '4': ['00010','00110','01010','10010','11111','00010','00010'],
    '5': ['11111','10000','11110','00001','00001','00001','11110'],
    '6': ['01110','10000','10000','11110','10001','10001','01110'],
    '7': ['11111','00001','00100','01000','01000','01000','01000'],
    '8': ['01110','10001','10001','01110','10001','10001','01110'],
    '9': ['01110','10001','10001','01111','00001','00001','01110'],
  };

  /** 把单个字符（字母/数字）转成 7 行字符画（'1'→'A'，'0'→'.'）；不支持的字符返回 null */
  G.letterShape = function (ch) {
    var bits = G.FONT5x7[String(ch).toUpperCase()];
    if (!bits) return null;
    return bits.map(function (row) {
      var s = '';
      for (var i = 0; i < row.length; i++) s += (row[i] === '1' ? 'A' : '.');
      return s;
    });
  };
  /** 数字别名（与 letterShape 同实现，语义更清楚） */
  G.digitShape = G.letterShape;

  // ── 手工图案素材库 ──────────────────────────────────────
  // 单分区图案统一用 'A'；eagle 是多分区示例（A=左翅 B=右翅 C=躯干）。
  G.SHAPES = {
    // —— 形状棋盘示例（复用现有 25/26 关，可直接引用）——
    heart: [
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
    eagle: [
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

    // —— 几何 ——
    star: [
      '..AAAAA..',
      '.AAAAAAA.',
      'AAAA.AAAA',
      '.AAAAAAA.',
      '..AAAAA..',
      '.AAAAAAA.',
      'AAAA.AAAA',
      '.AAAAAAA.',
      '..AAAAA..',
    ],
    circle: [
      '....AAA....',
      '..AAAAAAA..',
      '.AAAAAAAAA.',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      '.AAAAAAAAA.',
      '..AAAAAAA..',
      '....AAA....',
    ],
    diamond: [
      '.....A.....',
      '....AAA....',
      '...AAAAA...',
      '..AAAAAAA..',
      '.AAAAAAAAA.',
      'AAAAAAAAAAA',
      '.AAAAAAAAA.',
      '..AAAAAAA..',
      '...AAAAA...',
      '....AAA....',
      '.....A.....',
    ],
    triangle: [
      '.....A.....',
      '....AAA....',
      '....AAA....',
      '...AAAAA...',
      '...AAAAA...',
      '..AAAAAAA..',
      '..AAAAAAA..',
      '.AAAAAAAAA.',
      '.AAAAAAAAA.',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
    ],
    square: [
      'AAAAAAAAA',
      'AAAAAAAAA',
      'AAAAAAAAA',
      'AAAAAAAAA',
      'AAAAAAAAA',
      'AAAAAAAAA',
      'AAAAAAAAA',
      'AAAAAAAAA',
      'AAAAAAAAA',
    ],
    ring: [
      '....AAA....',
      '..A.....A..',
      '.A.......A.',
      'A.........A',
      'A.........A',
      'A.........A',
      'A.........A',
      'A.........A',
      '.A.......A.',
      '..A.....A..',
      '....AAA....',
    ],
    cross: [
      '...AAA...',
      '...AAA...',
      '...AAA...',
      'AAAAAAAAA',
      'AAAAAAAAA',
      'AAAAAAAAA',
      '...AAA...',
      '...AAA...',
      '...AAA...',
    ],
    crescent: [
      '....AAAA...',
      '..AAAA.....',
      '.AAA.......',
      'AAA........',
      'AAA........',
      'AAA........',
      'AAA........',
      'AAA........',
      '.AAA.......',
      '..AAAA.....',
      '....AAAA...',
    ],

    // —— 自然 / 物品 ——
    flower: [
      '..AAA.AAA..',
      '.AAAAAAAAA.',
      '.AAAAAAAAA.',
      '..AAAAAAA..',
      '....AAA....',
      '.....A.....',
      '.....A.....',
    ],
    tree: [
      '....AAA....',
      '...AAAAA...',
      '..AAAAAAA..',
      '.AAAAAAAAA.',
      '..AAAAAAA..',
      '...AAAAA...',
      '.....A.....',
      '....AAA....',
      '...AAAAA...',
      '..AAAAAAA..',
      '....AAA....',
    ],
    fish: [
      '.....AAA.....',
      '...AAAAAAA...',
      '.AAAAAAAAAAA.',
      'AAAAAAAAAAAAA',
      '.AAAAAAAAAAA.',
      '...AAAAAAA...',
      '.....AAA.....',
      '.......A.....',
      '......A......',
    ],
    cat: [
      'A.........A',
      'AA.......AA',
      'AAA.....AAA',
      'AAAAAAAAAAA',
      'AA.AAAA.AA.',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      '.AAAAAAAAA.',
      '.AA.....AA.',
    ],
    house: [
      '.....A.....',
      '....AAA....',
      '...AAAAA...',
      '..AAAAAAA..',
      '.AAAAAAAAA.',
      'AAAAAAAAAAA',
      '.AAAAAAAAA.',
      'AA.AAAAA.AA',
      'AA.AAAAA.AA',
      'AA.AAAAA.AA',
      'AAAAAAAAAAA',
    ],
    sun: [
      '....A.A....',
      '.A..A.A..A.',
      '.....A.....',
      '..A.AAA.A..',
      '.A.AAAAA.A.',
      'AA.AAAAA.AA',
      '.A.AAAAA.A.',
      '..A.AAA.A..',
      '.....A.....',
      '.A..A.A..A.',
      '....A.A....',
    ],
    cloud: [
      '....AAA....',
      '..AAAAAAA..',
      '.AAAAAAAAA.',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      '.AAAAAAAAA.',
      '..AAAAAAA..',
    ],
    mushroom: [
      '....AAA....',
      '..AAAAAAA..',
      '.AAAAAAAAA.',
      'AAAAAAAAAAA',
      '.AAAAAAAAA.',
      '..AAAAAAA..',
      '.....A.....',
      '....AAA....',
      '...AAAAA...',
      '..AAAAAAA..',
      '....AAA....',
    ],
    leaf: [
      '....A....',
      '...AAA...',
      '..AAAAA..',
      '.AAAAAAA.',
      'AAAAAAAAA',
      '.AAAAAAA.',
      '..AAAAA..',
      '...AAA...',
      '....A....',
      '....A....',
      '....A....',
    ],
    drop: [
      '....A....',
      '...AAA...',
      '...AAA...',
      '..AAAAA..',
      '..AAAAA..',
      '.AAAAAAA.',
      '.AAAAAAA.',
      '.AAAAAAA.',
      '..AAAAA..',
      '...AAA...',
      '....A....',
    ],
    smiley: [
      '..AAAAAAA..',
      '.AAAAAAAAA.',
      'AA.AAAA.AA.',
      'AA.AAAA.AA.',
      'AAAAAAAAAAA',
      'AA.AAAAA.AA',
      'AA.AAAAA.AA',
      'AA..AAA..AA',
      '.AAAAAAAAA.',
      '..AAAAAAA..',
    ],
    music: [
      '..AA.....',
      '..AA.....',
      '..AA.....',
      '..AA.....',
      'AAAAA....',
      'AAAAA....',
      'AAAAA....',
      '..AA.....',
      '..AA.....',
      '..AA.....',
      '..AA.....',
    ],
    crown: [
      'A.A.A.A.A.A',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      '.AAAAAAA.A.',
      '..AAAAAAA..',
    ],
    gift: [
      'AAAAAAAAAAA',
      'AAA.AAA.AAA',
      'AAA.AAA.AAA',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
    ],
    shield: [
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      'AAAAAAAAAAA',
      '.AAAAAAAAA.',
      '.AAAAAAAAA.',
      '..AAAAAAA..',
      '..AAAAAAA..',
      '...AAAAA...',
      '....AAA....',
      '.....A.....',
    ],
    butterfly: [
      'A.A...A.A.',
      'AAA.A.AAA.',
      'AAAAAAAAA.',
      '.AAAAAAA..',
      '..AAAAA...',
      '.AAAAAAA..',
      'AAA.A.AAA.',
      'A.A...A.A.',
    ],
  };

  /** 放大 k 倍：每字符横向重复 k 次、整行纵向重复 k 次（用于 S/M/L 尺寸档） */
  G.scaleShape = function (rows, k) {
    k = k || 1;
    if (k <= 1) return rows.slice();
    var out = [];
    for (var r = 0; r < rows.length; r++) {
      var wide = '';
      for (var c = 0; c < rows[r].length; c++) {
        var ch = rows[r][c];
        for (var x = 0; x < k; x++) wide += ch;
      }
      for (var y = 0; y < k; y++) out.push(wide);
    }
    return out;
  };

  /** 取形状尺寸：返回 { rows, cols } */
  G.shapeSize = function (rows) {
    return { rows: rows.length, cols: rows[0] ? rows[0].length : 0 };
  };

  /** 所有手工图案名（供生成器枚举） */
  G.shapeNames = function () {
    return Object.keys(G.SHAPES);
  };

  if (typeof globalThis !== 'undefined') globalThis.GameGlobal = G;
  if (typeof module !== 'undefined' && module.exports) module.exports = G;
})();
