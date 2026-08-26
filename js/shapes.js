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
    heart: [
      '...AA...AA.....',
      '..AAAA.AAAA....',
      '.AAAAAAAAAAA...',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      '.AAAAAAAAAAA...',
      '..AAAAAAAAA....',
      '...AAAAAAA.....',
      '....AAAAA......',
      '.....AAA.......',
      '......A........',
      '...............',
      '...............',
      '...............'
    ],
    star: [
      '.......A.......',
      '.......A.......',
      '......AAA......',
      '.....AAAAA.....',
      '....AAAAAAA....',
      '...AAAA.AAAA...',
      '..AAAA...AAAA..',
      '.AAA.....AAA...',
      'AAA.......AAA..',
      '.A.........A...',
      '..A.......A....',
      '...A.....A.....',
      '....A...A......',
      '.....A.A.......',
      '......A........'
    ],
    circle: [
      '.......A.......',
      '....AAAAAAA....',
      '...AAAAAAAAA...',
      '..AAAAAAAAAAA..',
      '.AAAAAAAAAAAAA.',
      '.AAAAAAAAAAAAA.',
      '.AAAAAAAAAAAAA.',
      'AAAAAAAAAAAAAAA',
      '.AAAAAAAAAAAAA.',
      '.AAAAAAAAAAAAA.',
      '.AAAAAAAAAAAAA.',
      '..AAAAAAAAAAA..',
      '...AAAAAAAAA...',
      '....AAAAAAA....',
      '.......A.......'
    ],
    diamond: [
      '.......A.......',
      '......AAA......',
      '.....AAAAA.....',
      '....AAAAAAA....',
      '...AAAAAAAAA...',
      '..AAAAAAAAAAA..',
      '.AAAAAAAAAAAAA.',
      'AAAAAAAAAAAAAAA',
      '.AAAAAAAAAAAAA.',
      '..AAAAAAAAAAA..',
      '...AAAAAAAAA...',
      '....AAAAAAA....',
      '.....AAAAA.....',
      '......AAA......',
      '.......A.......'
    ],
    triangle: [
      '.......A.......',
      '......AAA......',
      '.....AAAAA.....',
      '....AAAAAAA....',
      '...AAAAAAAAA...',
      '..AAAAAAAAAAA..',
      '.AAAAAAAAAAAAA.',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA'
    ],
    square: [
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA'
    ],
    ring: [
      '.......A.......',
      '....AAAAAAA....',
      '...AAAAAAAAA...',
      '..AAA.....AAA..',
      '.AAA.......AAA.',
      '.AA.........AA.',
      '.AA.........AA.',
      'AAA.........AAA',
      '.AA.........AA.',
      '.AA.........AA.',
      '.AAA.......AAA.',
      '..AAA.....AAA..',
      '...AAAAAAAAA...',
      '....AAAAAAA....',
      '.......A.......'
    ],
    cross: [
      '.....AAAAA.....',
      '.....AAAAA.....',
      '.....AAAAA.....',
      '.....AAAAA.....',
      '.....AAAAA.....',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      '.....AAAAA.....',
      '.....AAAAA.....',
      '.....AAAAA.....',
      '.....AAAAA.....',
      '.....AAAAA.....'
    ],
    crescent: [
      '.......A.......',
      '....AAAAAAA....',
      '.....AAAAAAA...',
      '.......AAAAAA..',
      '........AAAAAA.',
      '........AAAAAA.',
      '.........AAAAA.',
      '.........AAAAAA',
      '.........AAAAA.',
      '........AAAAAA.',
      '........AAAAAA.',
      '.......AAAAAA..',
      '.....AAAAAAA...',
      '....AAAAAAA....',
      '.......A.......'
    ],
    flower: [
      '...............',
      '......AAA......',
      '...AAA.AAA.....',
      '..AAA...AAA....',
      'AAA...A...AAA..',
      '.AAA..A..AAA...',
      'AAA...A...AAA..',
      '..AAA...AAA....',
      '...AAA.AAA.....',
      '......AAA......',
      '.......A.......',
      '.....AAAAA.....',
      '......AAA......',
      '...............',
      '...............'
    ],
    tree: [
      '...............',
      '.....AAA.......',
      '...AAAAAAA.....',
      '..AAAAAAAAA....',
      '.AAAAAAAAAAAAA.',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      '.AAAAAAAAAAAAA.',
      '..AAAAAAAAA....',
      '...AAAAAAA.....',
      '.....AAA.......',
      '.......A.......',
      '.......A.......',
      '......AAA......'
    ],
    fish: [
      '...............',
      '...AAAAAA......',
      '..AAAAAAAAA....',
      '..AAAAAAAAA.AA.',
      '.AAAAAAAAAAA.A.',
      'AAAAAAAAAAAAA..',
      'AAAAAAAAAAAAAA.',
      'AAAAAAAAAAAAAA.',
      'AAAAAAAAAAAAA..',
      '.AAAAAAAAAAA.A.',
      '..AAAAAAAAA.AA.',
      '...AAAAAA......',
      '...............',
      '...............',
      '...............'
    ],
    cat: [
      '..A.........A..',
      '.AAA.......AAA.',
      '.AAA.......AAA.',
      '.AAAAAAAAAAAAA.',
      '.AAAAAAAAAAAAA.',
      '.AAA..AAA..AAA.',
      '.AAA..AAA..AAA.',
      '.AAAAAAAAAAAAA.',
      '.AAAAAA.AAAAAA.',
      '.AAAAAAAAAAAAA.',
      '..AAAAAAAAAAA..',
      '...AAAAAAAAA...',
      '....AAAAA......',
      '.....AAA.......',
      '...............'
    ],
    house: [
      '.......A.......',
      '......AAA......',
      '.....AAAAA.....',
      '....AAAAAAA....',
      '...AAAAAAAAA...',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '..AAAA...AAAA..',
      '..AAAA...AAAA..',
      '..AAAA...AAAA..',
      '..AAAA...AAAA..',
      '...............'
    ],
    sun: [
      '......A........',
      '......A........',
      '...A..A..A.....',
      '....AAAAA......',
      '..A.AAAAA...A..',
      '.A.AAAAAAA.A...',
      '..AAAAAAAAAAA..',
      '.A.AAAAAAA.A...',
      '..A.AAAAA...A..',
      '....AAAAA......',
      '...A..A..A.....',
      '......A........',
      '......A........',
      '...............',
      '...............'
    ],
    cloud: [
      '...............',
      '...............',
      '....AAAAA......',
      '..AAAAAAAAA....',
      '.AAAAAAAAAAAAA.',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      '.AAAAAAAAAAAAA.',
      '..AAAAAAAAA....',
      '....AAAAA......',
      '...............',
      '...............',
      '...............',
      '...............'
    ],
    mushroom: [
      '...............',
      '.....AAAAA.....',
      '...AAAAAAAAA...',
      '..AAAAAAAAAAA..',
      '.AAAAAAAAAAAAA.',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      '.....AAAAA.....',
      '.....AAAAA.....',
      '.....AAAAA.....',
      '.....AAAAA.....',
      '....AAAAA......',
      '...............',
      '...............',
      '...............'
    ],
    leaf: [
      '...............',
      '......AAA......',
      '.....AAAAA.....',
      '....AAAAAAA....',
      '...AAAAAAAAA...',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '...AAAAAAAAA...',
      '....AAAAAAA....',
      '.....AAAAA.....',
      '......AAA......',
      '.......A.......',
      '........A......',
      '.......A.......'
    ],
    drop: [
      '.......A.......',
      '......AAA......',
      '.....AAAAA.....',
      '....AAAAAAA....',
      '...AAAAAAAAA...',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '.AAAAAAAAAAAAA.',
      '.AAAAAAAAAAAAA.',
      'AAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAA',
      '.AAAAAAAAAAAAA.',
      '..AAAAAAAAA....',
      '...AAAAAAA.....',
      '...............'
    ],
    smiley: [
      '......AAA......',
      '....AAAAAAA....',
      '...AAAAAAAAA...',
      '..AAAAAAAAAAA..',
      '.AAAAAAAAAAAAA.',
      '.AAA..AAA..AAA.',
      '.AAA..AAA..AAA.',
      '.AAAAAAAAAAAAA.',
      '.AAAAAAAAAAAAA.',
      '.AAA.AAAAA.AAA.',
      '.AAA.......AAA.',
      '.AAAAAAAAAAAAA.',
      '..AAAAAAAAAAA..',
      '...AAAAAAAAA...',
      '....AAAAAAA....'
    ],
    music: [
      '..............A',
      '.............AA',
      '.............AA',
      '............AA.',
      '...........AA..',
      '...........AA..',
      '...........AA..',
      '...........AA..',
      '...........AA..',
      '...........AA..',
      '..........AA...',
      '..........AAAA.',
      '.........AAAAAA',
      '........AAAAA..',
      '.........AAA...'
    ],
    crown: [
      '.A..A..A..A..A.',
      '.AA.AA.AA.AA.AA',
      '.AAAAAAAAAAAAA.',
      '.AAAAAAAAAAAAA.',
      '.AAAAAAAAAAAAA.',
      '.AAAAAAAAAAAAA.',
      '.AAAAAAAAAAAAA.',
      '.AAAAAAAAAAAAA.',
      '.AAAAAAAAAAAAA.',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '...AAAAAAAAA...',
      '....AAAAAAA....',
      '.....AAAAA.....'
    ],
    gift: [
      '..AA.......AA..',
      '.AAAA.....AAAA.',
      '.AAAA.AAA.AAAA.',
      '..AAA.AAA.AAA..',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..',
      '..AAAAAAAAAAA..'
    ],
    shield: [
      '..AAAAAAAAA....',
      '.AAAAAAAAAAA...',
      'AAAAAAAAAAAAA..',
      'AAAAAAAAAAAAA..',
      'AAAAAAAAAAAAA..',
      'AAAAAAAAAAAAA..',
      '.AAAAAAAAAAA...',
      '.AAAAAAAAAAA...',
      '..AAAAAAAAA....',
      '..AAAAAAAAA....',
      '...AAAAAAA.....',
      '....AAAAA......',
      '.....AAA.......',
      '......A........',
      '...............'
    ],
    butterfly: [
      '...A.....A.....',
      '...A.....A.....',
      '.AA..AA........',
      '.AAAA.AAAA.....',
      'AAAAA.AAAAA....',
      'AAAAA.AAAAA....',
      '.AAAA.AAAA.....',
      '..AAA.AAA......',
      '.AAAA.AAAA.....',
      'AAAAA.AAAAA....',
      '.AAAA.AAAA.....',
      '.AA..AA........',
      '...A.....A.....',
      '...............',
      '...............'
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
      '........C..C........'
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
