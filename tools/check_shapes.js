// tools/check_shapes.js —— 校验 js/shapes.js 的形状素材库
// 检查：① 每个形状内部每行等长；② 形状里没有误用空格（空格会被当成填充格）；
//       ③ 5×7 字体覆盖 A~Z + 0~9 且每个点阵都是 7 行 5 列。
// 用法：node tools/check_shapes.js
global.GameGlobal = {};
require('../js/shapes.js');
var G = global.GameGlobal;

var bad = 0, cellChecked = 0;

function checkShape(name, rows) {
  if (!rows || !rows.length) { console.log('  ✗ EMPTY  ', name); bad++; return; }
  var w = rows[0].length;
  for (var i = 0; i < rows.length; i++) {
    cellChecked++;
    var r = rows[i];
    if (r.length !== w) { console.log('  ✗ WIDTH  ', name, 'row', i, 'len', r.length, '!=', w); bad++; }
    if (r.indexOf(' ') >= 0) { console.log('  ✗ SPACE  ', name, 'row', i, '(空格会被当填充格！)'); bad++; }
  }
  console.log('  ✓', name.padEnd(10), rows.length + '×' + w);
}

console.log('— 手工图案 SHAPES —');
G.shapeNames().forEach(function (k) { checkShape(k, G.SHAPES[k]); });

console.log('— 5×7 字体 —');
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
var missing = [];
chars.forEach(function (c) {
  var s = G.letterShape(c);
  if (!s) { missing.push(c); console.log('  ✗ MISSING', c); bad++; return; }
  if (s.length !== 7) { console.log('  ✗ ROWS  ', c, s.length, '!= 7'); bad++; }
  s.forEach(function (row, i) {
    cellChecked++;
    if (row.length !== 5) { console.log('  ✗ COLS  ', c, 'row', i, 'len', row.length, '!= 5'); bad++; }
    if (row.indexOf(' ') >= 0) { console.log('  ✗ SPACE  ', c, 'row', i); bad++; }
  });
});
if (missing.length) console.log('  MISSING FONT:', missing.join(''));

console.log('— 缩放助手自检 —');
var big = G.scaleShape(G.SHAPES.star, 2);
var sz = G.shapeSize(big);
console.log('  star ×2 →', sz.rows + '×' + sz.cols, (sz.rows === 18 && sz.cols === 22) ? '✓' : '✗');
if (!(sz.rows === 18 && sz.cols === 22)) bad++;

console.log('— 统计 —');
console.log('  图案总数:', G.shapeNames().length, ' 字体字符:', chars.length, ' 校验格子:', cellChecked);
console.log(bad ? ('\n❌ 失败项: ' + bad) : '\n✅ 全部通过');
process.exit(bad ? 1 : 0);
