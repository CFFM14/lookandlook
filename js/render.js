/**
 * render.js —— Canvas 2D 渲染层
 * 设计坐标系 390×844；Main 每帧先 setTransform(scale) 后再调用各页面渲染。
 * 按钮：渲染时把矩形注册进 Main.buttonBounds，触摸命中后分发。
 */
(function () {
  'use strict';

  /** easeOutBack：带轻微回弹的缓出（结算面板弹入用） */
  function easeOutBack(p) {
    var c1 = 1.70158, c3 = c1 + 1;
    var t = p - 1;
    return 1 + c3 * t * t * t + c1 * t * t;
  }

  var Renderer = {
    ctx: null,
    images: {},
    particles: [],

    // 离屏棋盘缓存（棋盘静止时直接贴图，省去每帧全量重绘大棋盘）
    _boardCache: null,
    _boardCacheCtx: null,
    boardCacheValid: false,
    _boardCacheDisabled: false,
    _cacheCamKey: null,   // 缓存对应的相机状态(cx,cy,scale)；镜头变化时需重建缓存

    init: function (ctx) {
      this.ctx = ctx;
    },

    setImages: function (images) {
      this.images = images;
    },

    // ══════════════════════════════════════════════
    //  基础绘制工具
    // ══════════════════════════════════════════════

    roundRectPath: function (x, y, w, h, r) {
      var ctx = this.ctx;
      // 防御：消除动画末期卡片缩到极小时，内缩计算可能让 w/h 变成 0 或负数，
      // 若直接拿 w/2 去 clamp 会把半径也变成负数 → 真机 canvas 的 arcTo 抛 IndexSizeError 直接崩游戏。
      if (!(w > 0) || !(h > 0)) return;      // 宽高非正（含 NaN/负）→ 不绘制
      r = Math.max(0, Math.min(r, w / 2, h / 2)); // 半径夹到 [0, min(w,h)/2]
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    },

    drawText: function (text, x, y, size, color, align, bold, fontFamily) {
      var ctx = this.ctx;
      ctx.font = (bold ? 'bold ' : '') + size + 'px ' + (fontFamily || 'sans-serif');
      ctx.fillStyle = color;
      ctx.textAlign = align || 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x, y);
    },

    /** 超宽自动截断（末尾加 …），保证文本不超出 maxWidth；measureText 不可用时降级为普通绘制 */
    drawTextFit: function (text, x, y, maxWidth, size, color, align, bold, fontFamily) {
      var ctx = this.ctx;
      align = align || 'center';
      ctx.font = (bold ? 'bold ' : '') + size + 'px ' + (fontFamily || 'sans-serif');
      if (!ctx.measureText || ctx.measureText(text).width <= maxWidth) {
        this.drawText(text, x, y, size, color, align, bold, fontFamily);
        return;
      }
      var ell = '…';
      var s = String(text);
      while (s.length > 1 && ctx.measureText(s + ell).width > maxWidth) {
        s = s.slice(0, -1);
      }
      this.drawText(s + ell, x, y, size, color, align, bold, fontFamily);
    },

    /**
     * 程序圆角按钮 + 文字，返回是否被按下
     * opts: { id, bg, gradient:[上,下], border, textColor, radius, fontSize, icon, shadow, bottomBar }
     */
    drawTextButton: function (x, y, w, h, text, opts) {
      var ctx = this.ctx;
      opts = opts || {};
      var id = opts.id;
      var pressed = Main.buttonPressed(id);
      var bg = opts.bg || '#FFE9A8';
      var border = opts.border || '#E8B34B';
      var textColor = opts.textColor || '#8B5A2B';

      if (id) Main.buttonBounds.push({ id: id, x: x, y: y, w: w, h: h });
      var sx = pressed ? 0.94 : 1;
      var cx = x + w / 2, cy = y + h / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(sx, sx);
      ctx.translate(-cx, -cy);

      // 阴影
      if (opts.shadow) {
        ctx.shadowColor = opts.shadow;
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 3;
      }
      this.roundRectPath(x, y, w, h, opts.radius || 14);
      if (opts.gradient) {
        var g = ctx.createLinearGradient(x, y, x, y + h);
        g.addColorStop(0, opts.gradient[0]);
        g.addColorStop(1, opts.gradient[1]);
        ctx.fillStyle = g;
      } else {
        ctx.fillStyle = bg;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.lineWidth = 2;
      ctx.strokeStyle = border;
      ctx.stroke();

      // 3D 底边（模拟立体感）
      if (opts.bottomBar) {
        var r = opts.radius || 14;
        this.roundRectPath(x, y + h * 0.55, w, h * 0.45, r);
        ctx.save();
        ctx.clip();
        ctx.fillStyle = opts.bottomBar;
        ctx.globalAlpha = pressed ? 0.5 : 0.3;
        ctx.fillRect(x, y + h * 0.55, w, h * 0.45);
        ctx.restore();
        ctx.globalAlpha = 1;
      }

      if (opts.icon) {
        var img = this.images[opts.icon];
        if (img) {
          var is = Math.min(w, h) * 0.45;
          ctx.drawImage(img, x + w / 2 - is / 2, y + h / 2 - is / 2, is, is);
        }
      }
      if (text) {
        this.drawText(text, x + w / 2, y + h / 2, opts.fontSize || 20, textColor, 'center', true);
      }
      ctx.restore();
      return pressed;
    },

    /** PNG 图片按钮 */
    drawImageButton: function (x, y, w, h, imgKey, id) {
      var ctx = this.ctx;
      var img = this.images[imgKey];
      if (!img) return;
      var pressed = Main.buttonPressed(id);
      if (id) Main.buttonBounds.push({ id: id, x: x, y: y, w: w, h: h });
      var s = pressed ? 0.92 : 1;
      var cx = x + w / 2, cy = y + h / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);
      ctx.translate(-cx, -cy);
      ctx.drawImage(img, x, y, w, h);
      ctx.restore();
    },

    /**
     * 程序绘制「时间静止」按钮（无图片资源：蓝色渐变圆角矩形 + 雪花 + "冻结"文字，匹配 btn_hint 风格）
     * 用于无生图预算/中文易翻车的场景——与 btn_hint 等图片按钮视觉接近，肉眼难辨差异。
     */
    drawFreezeButton: function (x, y, size, id) {
      var ctx = this.ctx;
      var pressed = Main.buttonPressed(id);
      if (id) Main.buttonBounds.push({ id: id, x: x, y: y, w: size, h: size });
      var s = pressed ? 0.92 : 1;
      var cx = x + size / 2, cy = y + size / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);
      ctx.translate(-cx, -cy);
      // 底板：浅蓝渐变 + 黄色描边（与 btn_hint.png 同色系）
      this.roundRectPath(x, y, size, size, 14);
      var grad = ctx.createLinearGradient(0, y, 0, y + size);
      grad.addColorStop(0, '#A8E0F5');
      grad.addColorStop(1, '#6CC5E5');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#E8B34B';
      ctx.stroke();
      // 雪花符号（白色，居中稍上）
      this.drawText('❄', cx, y + size * 0.4, 40, '#FFF', 'center', false);
      // "冻结"文字（黄色加粗，下方）
      this.drawText('冻结', cx, y + size * 0.74, 15, '#F5A623', 'center', true);
      ctx.restore();
    },

    /** 画一张居中的图片（等比） */
    drawImageCentered: function (imgKey, cx, cy, maxW, maxH) {
      var img = this.images[imgKey];
      if (!img) return;
      var scale = Math.min(maxW / img.width, maxH / img.height);
      var w = img.width * scale, h = img.height * scale;
      this.ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h);
    },

    /**
     * 背景 cover 铺满可见区（设计变换坐标系下绘制）
     * 可见区中心与设计区中心重合（offset 对称居中），可见区尺寸 = 屏幕尺寸 / scale
     */
    drawBackground: function (imgKey) {
      var ctx = this.ctx;
      var img = this.images[imgKey];
      if (!img) return;
      var coverW = Main.screenW / Main.scale; // 可见区宽度（设计坐标）
      var coverH = Main.screenH / Main.scale;
      // +3% 余量，避免浮点误差导致边缘露白
      var bs = Math.max(coverW / img.width, coverH / img.height) * 1.03;
      var w = img.width * bs, h = img.height * bs;
      var cx = GameGlobal.DESIGN_W / 2, cy = GameGlobal.DESIGN_H / 2;
      ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h);
    },

    // ══════════════════════════════════════════════
    //  卡片绘制
    // ══════════════════════════════════════════════

    drawCard: function (card, now) {
      var ctx = this.ctx;
      var m = Main.game.metrics;
      var v = card.visual;
      var state = card.state;
      // 绘制缩放：基础缩放(选中时由 Tween 驱动放大) × 提示闪烁脉冲（复刻原版 Cocos 闪烁特效）
      var drawScale = v.scale;
      if (state === 'hintFlash' && card.flashT) {
        drawScale *= 1 + 0.1 * Math.sin((now - card.flashT) / 150 * Math.PI * 2);
      }
      var size = m.cw * drawScale;
      if (!(size > 1)) return; // 缩小到极小/负数/NaN（消除动画末期）不绘制

      var x = v.x - size / 2, y = v.y - size / 2;

      // 抖动偏移（mismatch）
      var dx = 0;
      if (state === 'mismatch' && card.shakeT) {
        var t = now - card.shakeT;
        if (t < 500) dx = Math.sin(t * 0.06) * 5 * (1 - t / 500);
      }
      x += dx;

      // 水果/蔬菜卡图：素材本身已包含卡片底座，直接铺满格子（不再叠加程序绘制的底座）
      // 多卡组关卡 card.type 为 'v<n>'（蔬菜）或 'f<n>'（水果）；老关仍是纯数字 1~12
      var imgKey = GameGlobal.cardTypeToAssetKey(card.type);
      var img = imgKey ? this.images[imgKey] : null;

      if (img) {
        ctx.drawImage(img, x, y, size, size);
      }

      // 移动卡（mover）：红色薄边框标识，让玩家一眼认出会移动的那张卡（普通卡无此标记）
      // 内缩 8% 圆角描边，完全嵌在卡片图案内部，不压到卡片边缘。
      // 香蕉皮肤卡（imgKey==='banana'，如 b1）已有醒目底图，不再叠红框，避免遮挡。
      if (card.isMover && state !== 'eliminated' && imgKey !== 'banana') {
        var mp = Math.max(2, size * 0.08);
        var inner = size - mp * 2;
        // 卡片缩小到内缩后没有空间时跳过红框（否则负尺寸会让 arcTo 崩）
        if (inner > 2) {
          // 停在出口"犹豫"（准备溜走）时红框加粗变亮 → 玩家一眼看出它要跑了
          var hesitating = !card.flying && card.hesitateLeft > 0;
          ctx.save();
          ctx.lineWidth = Math.max(1, size * 0.035) * (hesitating ? 2.4 : 1);
          ctx.strokeStyle = hesitating ? 'rgba(255, 48, 48, 0.98)' : 'rgba(235, 60, 60, 0.85)';
          this.roundRectPath(x + mp, y + mp, inner, inner, size * 0.1);
          ctx.stroke();
          ctx.restore();
        }
      }

      // 冰层（frozen 卡 iceAlpha=1 常驻，配对消除时 Tween 淡出，直接叠在水果图上）
      var iceAlpha = v.iceAlpha;
      if (iceAlpha > 0.01) {
        // 冰壳：比卡片内缩一圈（6%）+ 圆角，露出水果卡片边缘
        var pad = Math.max(2, size * 0.06);
        var ix = x + pad, iy = y + pad, isz = size - pad * 2;
        if (isz <= 2) return; // 内缩后无空间（卡片缩到极小）→ 跳过冰层绘制
        ctx.save();
        ctx.globalAlpha = Math.min(1, iceAlpha);
        this.roundRectPath(ix, iy, isz, isz, isz * 0.2);
        ctx.clip();
        ctx.fillStyle = 'rgba(180, 225, 255, 0.62)';
        ctx.fillRect(ix, iy, isz, isz);
        // 斜线纹理（只在冰壳内部斜切，不越界）
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = Math.max(1, isz * 0.045);
        for (var i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(ix + i * isz * 0.5, iy);
          ctx.lineTo(ix + (i + 1) * isz * 0.5, iy + isz);
          ctx.stroke();
        }
        // 顶部高光条
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillRect(ix, iy, isz, isz * 0.22);
        ctx.restore();
      }

      // 选中/提示不再绘制任何框或角标：选中靠视觉缩放(highlightCard Tween)，
      // 提示靠上方的 drawScale 闪烁脉冲（均复刻原版 Cocos 特效）
    },

    // ══════════════════════════════════════════════
    //  连线绘制
    // ══════════════════════════════════════════════

    /** line: {points: 逻辑坐标数组, color:'gold'|'blue'} */
    drawConnectionLine: function (line) {
      if (!line || !line.points) return;
      var ctx = this.ctx;
      var game = Main.game;
      ctx.save();
      ctx.lineWidth = 4;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.strokeStyle = line.color === 'blue' ? '#4DA6FF' : '#FFD700';
      ctx.shadowColor = line.color === 'blue' ? 'rgba(77,166,255,0.6)' : 'rgba(255,215,0,0.7)';
      ctx.shadowBlur = 6;

      var pts = [];
      for (var i = 0; i < line.points.length; i++) {
        var pp = line.points[i];
        // 连连看：点用逻辑坐标 {r,c} → 经 logicToPixel 转换；
        // 层层消消：点已存设计坐标 {x,y}（cam=null，棋盘即设计坐标），直接用。
        var p = (pp.x !== undefined && pp.y !== undefined)
          ? { x: pp.x, y: pp.y }
          : game.logicToPixel(pp.r, pp.c);
        pts.push(p);
      }
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (var j = 1; j < pts.length; j++) {
        ctx.lineTo(pts[j].x, pts[j].y);
      }
      ctx.stroke();
      ctx.restore();
    },

    // ══════════════════════════════════════════════
    //  离屏棋盘缓存（优化大棋盘每帧重绘造成的掉帧）
    // ══════════════════════════════════════════════

    /** 惰性创建离屏画布（设计坐标系 390×844）。微信下用第二次 createCanvas 拿到的离屏画布；带护栏防误用主屏画布 */
    _createBoardCache: function () {
      if (this._boardCache || this._boardCacheDisabled) return;
      var W = GameGlobal.DESIGN_W, H = GameGlobal.DESIGN_H;
      var c = null;
      try {
        if (typeof wx !== 'undefined' && wx.createCanvas) c = wx.createCanvas();
        else if (typeof document !== 'undefined') c = document.createElement('canvas');
      } catch (e) { c = null; }
      if (!c) { this._boardCacheDisabled = true; return; }
      // 护栏：若不慎拿到主屏画布，禁用缓存避免画面错乱
      if (GameGlobal.Main && GameGlobal.Main.canvas === c) { this._boardCacheDisabled = true; return; }
      c.width = W; c.height = H;
      this._boardCache = c;
      this._boardCacheCtx = c.getContext('2d');
    },

    /** 标记缓存失效：棋盘内容变化（选关/选卡/打乱/铺冰/消除后）时调用 */
    invalidateBoardCache: function () { this.boardCacheValid = false; this._cacheCamKey = null; },

    /** 棋盘是否处于静止态（可安全复用缓存）：无处理中、无连线、无瞬时卡片动画、镜头未变动 */
    _isBoardStatic: function (game) {
      if (game._introOn || game.isProcessing || game.connectionLine) return false;
      if (this._anyTransientAnim(game)) return false;
      // 镜头关：相机未稳定（入场镜头播放中已在上面拦截；此处处理用户平移/缩放导致 cam 变化）则视为非静态
      if (game.cam) {
        var k = game.cam.cx + ',' + game.cam.cy + ',' + game.cam.scale;
        if (k !== this._cacheCamKey) return false;
      }
      return true;
    },

    /** 是否存在正在播放的瞬时卡片动画（消除缩放 / 抖动 / 提示闪烁 / 冰壳淡出） */
    _anyTransientAnim: function (game) {
      for (var r = 1; r <= game.rows; r++) {
        for (var c = 1; c <= game.cols; c++) {
          var card = game.cardNodes[r][c];
          if (!card || card.state === 'eliminated') continue;
          var st = card.state;
          if (st === 'eliminating' || st === 'mismatch' || st === 'hintFlash') return true;
          var v = card.visual;
          if (v && v.iceAlpha > 0.01 && v.iceAlpha < 0.99) return true; // 冰壳淡出中
        }
      }
      return false;
    },

    /** 把当前静态棋盘（地板 + 卡片）烘焙进离屏画布，供后续帧直接贴图 */
    renderBoardToCache: function (game, now) {
      this._createBoardCache();
      if (!this._boardCacheCtx) { this._boardCacheDisabled = true; return; }
      var cctx = this._boardCacheCtx;
      cctx.setTransform(1, 0, 0, 1, 0, 0);
      cctx.clearRect(0, 0, GameGlobal.DESIGN_W, GameGlobal.DESIGN_H);
      var live = this.ctx;
      this.ctx = cctx; // drawBoardFloor / drawCard 走离屏 ctx，无需镜头变换
      if (game.hasShape) this.drawBoardFloor(game);
      for (var r = 1; r <= game.rows; r++) {
        for (var c = 1; c <= game.cols; c++) {
          var card = game.cardNodes[r][c];
          if (card && card.state !== 'eliminated') {
            this.drawCard(card, now);
          }
        }
      }
      this.ctx = live;
    },

    // ══════════════════════════════════════════════
    //  新玩法绘制：形状地板 / 特殊格 / 能力徽章
    // ══════════════════════════════════════════════

    /** 形状棋盘地板：存在的格子画底板（镂空不画，图案自然显现）；特殊格染对应色 */
    drawBoardFloor: function (game) {
      var ctx = this.ctx;
      var m = game.metrics;
      var sz = m.cw + 6;
      for (var r = 1; r <= game.rows; r++) {
        for (var c = 1; c <= game.cols; c++) {
          if (!game.shape[r] || !game.shape[r][c]) continue;
          var p = game.logicToPixel(r, c);
          this.roundRectPath(p.x - sz / 2, p.y - sz / 2, sz, sz, 10);
          ctx.fillStyle = 'rgba(255,255,255,0.42)';
          ctx.fill();
        }
      }
    },

    // ══════════════════════════════════════════════
    //  粒子系统
    // ══════════════════════════════════════════════

    updateParticles: function (dt) {
      var list = this.particles;
      for (var i = list.length - 1; i >= 0; i--) {
        var p = list[i];
        p.life -= dt;
        if (p.life <= 0) {
          list.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt / 1000;
        p.y += p.vy * dt / 1000;
        if (p.gravity) p.vy += p.gravity * dt / 1000;
        if (p.rot !== undefined) p.rot += p.vr * dt / 1000;
      }
    },

    drawParticles: function (space) {
      var ctx = this.ctx;
      for (var i = 0; i < this.particles.length; i++) {
        var p = this.particles[i];
        // 粒子分层：'board' 随镜头（棋盘坐标），'design' 固定在屏幕（设计坐标）
        var pSpace = p.space || 'board';
        if (space && pSpace !== space) continue;
        var alpha = Math.max(0, Math.min(1, p.life / p.maxLife));
        ctx.save();
        ctx.globalAlpha = alpha;
        if (p.type === 'shard') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot || 0);
          ctx.fillStyle = p.color;
          var s = p.size;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.8, s * 0.7);
          ctx.lineTo(-s * 0.8, s * 0.7);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    },

    /** 消除小烟花：10 个彩色圆点向四周炸开（复刻原版配色） */
    spawnFirework: function (x, y) {
      var colors = ['#FFD700', '#FF8C00', '#FFFF50', '#FF5050', '#FFC832'];
      for (var i = 0; i < 10; i++) {
        var angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.6;
        var dist = 35 + Math.random() * 45;
        this.particles.push({
          x: x, y: y,
          vx: Math.cos(angle) * dist * 2.2,
          vy: Math.sin(angle) * dist * 2.2,
          life: 350, maxLife: 350,
          size: 4 + Math.random() * 2,
          color: colors[i % colors.length],
          type: 'dot',
          gravity: 150,
          space: 'board',
        });
      }
    },

    /** 解冻冰屑：6 个冰蓝碎片 */
    spawnIceShards: function (x, y) {
      for (var i = 0; i < 6; i++) {
        var angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.5;
        var dist = 25 + Math.random() * 30;
        this.particles.push({
          x: x, y: y,
          vx: Math.cos(angle) * dist * 2,
          vy: Math.sin(angle) * dist * 2 - 40,
          life: 380, maxLife: 380,
          size: 4 + Math.random() * 3,
          color: i % 2 === 0 ? '#BDE4FF' : '#E8F6FF',
          type: 'shard',
          rot: Math.random() * Math.PI,
          vr: 6 + Math.random() * 6,
          gravity: 260,
          space: 'board',
        });
      }
    },

    /** 炸弹爆炸：12 个橙红圆点 + 少量碎片 */
    spawnBombEffect: function (x, y) {
      for (var i = 0; i < 12; i++) {
        var angle = Math.random() * Math.PI * 2;
        var dist = 30 + Math.random() * 60;
        this.particles.push({
          x: x, y: y,
          vx: Math.cos(angle) * dist * 2.5,
          vy: Math.sin(angle) * dist * 2.5,
          life: 420, maxLife: 420,
          size: 4 + Math.random() * 3,
          color: i % 3 === 0 ? '#FFD54A' : i % 3 === 1 ? '#FF8A3D' : '#FF6B35',
          type: 'dot',
          gravity: 120,
          space: 'board',
        });
      }
    },

    /** 胜利全屏烟花：3 轮，每轮 2 个随机位置烟花（设计坐标系，不随镜头移动） */
    spawnWinFireworks: function () {
      var self = this;
      for (var round = 0; round < 3; round++) {
        (function (delay) {
          setTimeout(function () {
            for (var k = 0; k < 2; k++) {
              var x = 60 + Math.random() * (GameGlobal.DESIGN_W - 120);
              var y = 120 + Math.random() * 480;
              var before = self.particles.length;
              self.spawnFirework(x, y);
              for (var i = before; i < self.particles.length; i++) {
                self.particles[i].space = 'design';
              }
            }
          }, delay);
        })(round * 400);
      }
    },

    // ══════════════════════════════════════════════
    //  页面渲染
    // ══════════════════════════════════════════════

    /** 首页 */
    renderMenu: function () {
      this.drawBackground('bg_menu');
      var cx = GameGlobal.DESIGN_W / 2;
      var W = GameGlobal.DESIGN_W;
      var ctx = this.ctx;
      var safeTop = GameGlobal.SAFE_TOP || 0;

      // 右上角金币（随安全区下移，避免顶到刘海）
      this.drawCoinBadge(W - 14, 36 + safeTop, GameGlobal.Storage.getCoins());

      // 标题
      this.drawImageCentered('title_menu', cx, 250 + Math.floor(safeTop / 2), 340, 260);

      // 悬浮动画参数：一起一伏 + 光晕呼吸
      var t = Date.now() / 1000;
      var bob = Math.sin(t * 2.2) * 7;          // 上下浮动 ±7px
      var glow = 0.5 + 0.5 * Math.sin(t * 2.2); // 0~1 呼吸

      // ── 开始游戏（大按钮，悬浮感） ──
      var baseY = 440;
      var startW = 300, startH = 88;
      var startX = cx - startW / 2;
      var startY = baseY + bob;
      // 呼吸光晕（让按钮像浮起来一样）
      ctx.save();
      ctx.shadowColor = 'rgba(255,170,50,0.9)';
      ctx.shadowBlur = 26 + 20 * glow;
      this.roundRectPath(startX, startY, startW, startH, 22);
      ctx.fillStyle = 'rgba(255,190,80,' + (0.30 + 0.28 * glow) + ')';
      ctx.fill();
      ctx.restore();
      this.drawTextButton(startX, startY, startW, startH, '开始游戏',
        { id: 'menu_start', fontSize: 30, gradient: ['#FFD479', '#F4A93C'],
          border: '#C9821F', textColor: '#7A4A1F', radius: 22,
          shadow: 'rgba(120,70,20,0.45)', bottomBar: '#B9701A' });

      // ── 选择关卡（稍小，固定在开始游戏正下方，不浮动） ──
      var lvW = 240, lvH = 60;
      var lvX = cx - lvW / 2;
      var lvY = baseY + startH + 30;
      this.drawTextButton(lvX, lvY, lvW, lvH, '选择关卡',
        { id: 'menu_levels', fontSize: 24, gradient: ['#FFF3D6', '#FFE9A8'],
          border: '#E8B34B', textColor: '#8B5A2B', radius: 18 });

      // ── 特殊关卡（固定在选择关卡正下方，不浮动）──
      var spW = 240, spH = 60;
      var spX = cx - spW / 2;
      var spY = lvY + lvH + 16;
      this.drawTextButton(spX, spY, spW, spH, '特殊关卡',
        { id: 'menu_special', fontSize: 24, gradient: ['#FFE0C2', '#FFC59A'],
          border: '#D98A4B', textColor: '#8B4A2B', radius: 18 });

      // ── 音效键（左上角小圆按钮，与右上角金币同高） ──
      var soundOn = Main.soundOn;
      this.drawTextButton(16, (36 + safeTop) - 23, 46, 46,
        soundOn ? '🔊' : '🔇', { id: 'menu_sound', radius: 23, fontSize: 22,
          bg: 'rgba(255,245,222,0.95)', border: '#E8B34B', textColor: '#8B5A2B' });

      // ── 商店（贴在大标题右侧的小标签纸，不浮动） ──
      var titleCY = 250 + Math.floor(safeTop / 2);
      var shopW = 48, shopH = 96;
      var shopX = W - shopW + 8;                 // 贴着大标题右侧、探出屏幕一点点
      var shopY = titleCY - shopH / 2;           // 与大标题同高
      ctx.save();
      // 轻微倾斜，像随手贴/挂上去的标签纸
      ctx.translate(shopX + shopW / 2, shopY + shopH / 2);
      ctx.rotate(-3 * Math.PI / 180);
      ctx.translate(-(shopX + shopW / 2), -(shopY + shopH / 2));
      // 纸面投影（显得浮起）
      ctx.shadowColor = 'rgba(80,50,20,0.35)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 3;
      this.roundRectPath(shopX, shopY, shopW, shopH, 8);
      ctx.fillStyle = '#FFFDF3';                 // 纸本色
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(180,150,110,0.8)';
      ctx.stroke();
      ctx.restore();
      // 顶部打孔（吊牌孔），与文字对齐（不旋转）
      ctx.beginPath();
      ctx.arc(shopX + shopW / 2, shopY + 13, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(120,90,60,0.28)';
      ctx.fill();
      // 图标 + 竖排“商店”
      this.drawText('🏪', shopX + shopW / 2, shopY + 38, 20, '#8B5A2B', 'center', false);
      this.drawText('商', shopX + shopW / 2, shopY + 62, 15, '#8B5A2B', 'center', true);
      this.drawText('店', shopX + shopW / 2, shopY + 80, 15, '#8B5A2B', 'center', true);
      // 点击区域（轴对齐矩形即可）
      Main.buttonBounds.push({ id: 'menu_shop', x: shopX, y: shopY, w: shopW, h: shopH });

      this.drawText('大乱炖连连消', cx, 765, 15, 'rgba(139,90,43,0.7)', 'center', false);
    },

    /** 金币徽章：金色圆角 + 🪙 + 数量 */
    drawCoinBadge: function (rx, ry, coins) {
      var ctx = this.ctx;
      var text = '🪙 ' + coins;
      var w = 34 + String(coins).length * 13;
      var h = 34;
      this.roundRectPath(rx - w, ry - h / 2, w, h, 17);
      ctx.fillStyle = 'rgba(255, 240, 200, 0.95)';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#E8B34B';
      ctx.stroke();
      this.drawText(text, rx - w / 2, ry + 1, 16, '#B8860B', 'center', true);
    },

    /** 选关界面分页参数（2 列 × 5 行，每页 10 关）
     *  卡片区随 SAFE_TOP 下移（与顶部标题/返回保持一致，避免刘海屏遮挡重叠），
     *  卡片高度动态压缩，保证底部始终不撞翻页按钮（y=758 上方留 20px）。 */
    getLevelPageMetrics: function () {
      var safeTop = GameGlobal.SAFE_TOP || 0;
      var cardW = 146, gap = 12, rowGap = 14;
      var startY = 122 + safeTop;
      var avail = 738 - startY; // 卡片区可用高度（翻页按钮顶 758 - 20 间隙）
      var cardH = Math.max(84, Math.min(110, Math.floor((avail - 4 * rowGap) / 5)));
      var startX = (GameGlobal.DESIGN_W - cardW * 2 - gap) / 2;
      return { cardW: cardW, cardH: cardH, gap: gap, rowGap: rowGap, startX: startX, startY: startY, cols: 2, rows: 5 };
    },

    /** 绘制一页关卡（offX 为整页水平偏移，翻页动画 / 拖拽预览用）
     *  arr / total / cardPrefix 由 renderLevelSelect 按「普通 / 特殊」类别传入，复用同一套绘制逻辑 */
    drawLevelPage: function (pageIdx, offX, unlocked, arr, total, cardPrefix) {
      var perPage = GameGlobal.LEVELS_PER_PAGE;
      var m = this.getLevelPageMetrics();
      var cardW = m.cardW, cardH = m.cardH, gap = m.gap, rowGap = m.rowGap;
      var startX = m.startX, startY = m.startY;
      var begin = pageIdx * perPage;
      var end = Math.min(begin + perPage, total);

      for (var i = begin; i < end; i++) {
        var lv = arr[i];
        var idxInPage = i - begin;
        var col = idxInPage % 2, row = Math.floor(idxInPage / 2);
        var x = startX + col * (cardW + gap) + offX;
        var y = startY + row * (cardH + rowGap);
        // 各类独立计数与解锁：普通关 id 连续；特殊关用 SPECIAL 下标；层层消消用 STACK 下标
        var isStack = arr === GameGlobal.STACK_LEVELS;
        var locked = isStack
          ? (GameGlobal.getStackIndex(lv.id) >= unlocked)
          : (cardPrefix === 'sp_'
            ? (GameGlobal.getSpecialIndex(lv.id) >= unlocked)
            : (lv.id > unlocked));
        // 展示序号：每个大类独立从 1 开始（i 即该大类数组中的下标）
        var displayNo = i + 1;

        var id = cardPrefix + lv.id;
        Main.buttonBounds.push({ id: id, x: x, y: y, w: cardW, h: cardH });
        var pressed = Main.buttonPressed(id);

        var ctx = this.ctx;
        var sx = pressed ? 0.95 : 1;
        ctx.save();
        ctx.translate(x + cardW / 2, y + cardH / 2);
        ctx.scale(sx, sx);
        ctx.translate(-(x + cardW / 2), -(y + cardH / 2));

        // 卡片底
        this.roundRectPath(x, y, cardW, cardH, 14);
        ctx.fillStyle = locked ? 'rgba(160,160,160,0.85)' : 'rgba(255,245,222,0.95)';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = locked ? '#B0B0B0' : '#E8B34B';
        ctx.stroke();

        // 难度星
        var starStr = '';
        for (var s = 0; s < 3; s++) starStr += s < lv.difficulty ? '★' : '☆';
        this.drawText(starStr, x + cardW / 2, y + 14, 13, locked ? '#999' : '#F5A623', 'center', false);

        if (locked) {
          this.drawText('第' + displayNo + '关', x + cardW / 2, y + 38, 17, '#FFF', 'center', true);
          this.drawText('🔒', x + cardW / 2, y + 66, 22, '#FFF', 'center', false);
        } else {
          this.drawText('第' + displayNo + '关', x + cardW / 2, y + 34, 15, '#8B5A2B', 'center', true);
          this.drawTextFit(lv.name, x + cardW / 2, y + 58, cardW - 16, 18, '#D2691E', 'center', true);
          var best = GameGlobal.Storage.getBestScore(lv.id);
          if (best) {
            this.drawText('最佳：' + best.moves + '步 ' + best.elapsed + 's',
              x + cardW / 2, y + 86, 11, '#A08060', 'center', false);
          } else {
            this.drawText('尚未通关', x + cardW / 2, y + 86, 11, '#C0A080', 'center', false);
          }
        }
        ctx.restore();
      }
    },

    /** 关卡选择 / 特殊关卡选择（同一套分页 UI，按 Main.levelCategory + Main.specialSub 切换数组与解锁数据） */
    renderLevelSelect: function () {
      this.drawBackground('bg_menu');
      var cx = GameGlobal.DESIGN_W / 2;
      var W = GameGlobal.DESIGN_W;
      var isSpecial = Main.levelCategory === 'special';
      var isStack = Main.levelCategory === 'stack';
      var sub = Main.specialSub; // null | 'giant' | 'fun'
      var isGiant = sub === 'giant';
      var isFun = sub === 'fun';
      var arr = isStack ? GameGlobal.STACK_LEVELS
        : (isGiant ? GameGlobal.GIANT_LEVELS
          : (isFun ? GameGlobal.FUN_LEVELS
            : (isSpecial ? GameGlobal.SPECIAL_LEVELS : GameGlobal.LEVELS)));
      var total = isStack ? GameGlobal.TOTAL_STACK
        : (isGiant ? GameGlobal.TOTAL_GIANT
          : (isFun ? GameGlobal.TOTAL_FUN
            : (isSpecial ? GameGlobal.TOTAL_SPECIAL : GameGlobal.TOTAL_LEVELS)));
      var unlocked = isStack ? GameGlobal.Storage.getUnlockedStack()
        : (isSpecial ? GameGlobal.Storage.getUnlockedSpecial() : GameGlobal.Storage.getUnlockedLevels());
      var perPage = GameGlobal.LEVELS_PER_PAGE;
      var totalPages = Math.ceil(total / perPage);
      var safeTop = GameGlobal.SAFE_TOP || 0;

      var title = isStack ? '层层消消'
        : (isGiant ? '巨物关卡' : (isFun ? '趣味关卡' : (isSpecial ? '特殊关卡' : '选择关卡')));
      var backId = isStack ? 'stacks_back' : (isSpecial ? 'specials_back' : 'levels_back');
      this.drawText(title, cx, 70 + safeTop, 30, '#8B5A2B', 'center', true);
      this.drawTextButton(20, 44 + safeTop, 70, 40, '返回', { id: backId, fontSize: 16 });

      // 页码收敛到合法范围
      if (isStack) {
        if (Main.stackPage > totalPages - 1) Main.stackPage = totalPages - 1;
        if (Main.stackPage < 0) Main.stackPage = 0;
      } else if (isSpecial) {
        if (Main.specialPage > totalPages - 1) Main.specialPage = totalPages - 1;
        if (Main.specialPage < 0) Main.specialPage = 0;
      } else {
        if (Main.levelPage > totalPages - 1) Main.levelPage = totalPages - 1;
        if (Main.levelPage < 0) Main.levelPage = 0;
      }

      var page, anim, from, to, dir;
      if (isStack) {
        page = Main.stackPage; anim = Main.stackPageAnim; from = Main.stackPageFrom; to = Main.stackPageTo; dir = Main.stackPageDir;
      } else if (isSpecial) {
        page = Main.specialPage; anim = Main.specialPageAnim; from = Main.specialPageFrom; to = Main.specialPageTo; dir = Main.specialPageDir;
      } else {
        page = Main.levelPage; anim = Main.levelPageAnim; from = Main.levelPageFrom; to = Main.levelPageTo; dir = Main.levelPageDir;
      }
      var inAnim = anim > 0 && anim < 1;
      var ctx = this.ctx;
      var cardPrefix = (isSpecial || isStack) ? 'sp_' : 'lv_';

      // 页面内容：动画中同时绘制新旧两页（位移 + 淡入淡出）；静止时绘制当前页（含拖拽偏移）
      if (inAnim) {
        ctx.save();
        ctx.globalAlpha = 1 - anim;
        this.drawLevelPage(from, -dir * anim * W, unlocked, arr, total, cardPrefix);
        ctx.restore();
        ctx.save();
        ctx.globalAlpha = anim;
        this.drawLevelPage(to, dir * (1 - anim) * W, unlocked, arr, total, cardPrefix);
        ctx.restore();
      } else {
        var dragOff = Main._levelDragging ? Main._levelDragX : 0;
        this.drawLevelPage(page, dragOff, unlocked, arr, total, cardPrefix);
      }

      // 左右翻页按钮（动画中 / 边界页置灰）
      var animBusy = inAnim;
      var prevDisabled = page <= 0;
      var nextDisabled = page >= totalPages - 1;
      var prevId = isStack ? 'stacks_prev' : (isSpecial ? 'specials_prev' : 'levels_prev');
      var nextId = isStack ? 'stacks_next' : (isSpecial ? 'specials_next' : 'levels_next');
      this.drawTextButton(28, 758, 54, 44, '◀', {
        id: prevId, fontSize: 20,
        bg: (prevDisabled || animBusy) ? 'rgba(205,195,175,0.85)' : '#FFE9A8',
        border: '#B0A080', textColor: '#8B5A2B',
      });
      this.drawTextButton(W - 28 - 54, 758, 54, 44, '▶', {
        id: nextId, fontSize: 20,
        bg: (nextDisabled || animBusy) ? 'rgba(205,195,175,0.85)' : '#FFE9A8',
        border: '#B0A080', textColor: '#8B5A2B',
      });

      // 页码指示器（当前页 / 总页数）——点击可输入页码跳转（与左右翻页键同高）
      this.roundRectPath(cx - 78, 758, 156, 44, 16);
      ctx.fillStyle = 'rgba(255,246,224,0.92)';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#E8B34B';
      ctx.stroke();
      this.drawText('✏ ' + (page + 1) + ' / ' + totalPages, cx, 780, 15, '#8B5A2B', 'center', true);
      var jumpId = isStack ? 'stacks_jump' : (isSpecial ? 'specials_jump' : 'levels_jump');
      Main.buttonBounds.push({ id: jumpId, x: cx - 78, y: 758, w: 156, h: 44 });
    },

    /** 特殊关卡玩法 hub：主界面“特殊关卡”进入，列出各玩法入口（巨物关卡 / 趣味关卡），后续新玩法在此追加 */
    renderSpecialHub: function () {
      this.drawBackground('bg_menu');
      var cx = GameGlobal.DESIGN_W / 2;
      var safeTop = GameGlobal.SAFE_TOP || 0;
      this.drawText('特殊关卡', cx, 120 + safeTop, 32, '#8B5A2B', 'center', true);
      this.drawTextButton(20, 44 + safeTop, 70, 40, '返回', { id: 'hub_back', fontSize: 16 });

      // 玩法入口按钮（竖排居中；后续新玩法在 y2 之后再追加即可）
      var bw = 280, bh = 74, bx = cx - bw / 2;
      var y1 = 300 + safeTop;
      this.drawTextButton(bx, y1, bw, bh, '巨物关卡', {
        id: 'hub_giant', fontSize: 26, gradient: ['#FFD8A8', '#FFB067'], textColor: '#8B4A2B', radius: 18,
      });
      var y2 = y1 + bh + 32;
      this.drawTextButton(bx, y2, bw, bh, '趣味关卡', {
        id: 'hub_fun', fontSize: 26, gradient: ['#CFE8FF', '#9CCBFF'], textColor: '#2B5A8B', radius: 18,
      });
      var y3 = y2 + bh + 32;
      this.drawTextButton(bx, y3, bw, bh, '层层消消', {
        id: 'specials_stack', fontSize: 26, gradient: ['#E6D2FF', '#C4A3F0'], textColor: '#4A2B8B', radius: 18,
      });
      this.drawText('（后续新玩法将在此添加）', cx, y3 + bh + 52, 14, 'rgba(139,90,43,0.6)', 'center', false);
    },

    /** 选关“跳转页码”输入覆盖层：屏上数字键盘（无系统键盘依赖，适配微信小游戏 Canvas）
     *  点页码指示器（levels_jump / specials_jump）打开；pj_0~9 输入、pj_del 删除、pj_ok 跳转、pj_cancel 关闭 */
    renderPageJump: function () {
      var ctx = this.ctx;
      var cx = GameGlobal.DESIGN_W / 2;
      var W = GameGlobal.DESIGN_W, H = GameGlobal.DESIGN_H;
      var safeTop = GameGlobal.SAFE_TOP || 0;

      var isSpecial = Main.levelCategory === 'special';
      var isStack = Main.levelCategory === 'stack';
      var sub = Main.specialSub;
      var total = isStack ? GameGlobal.TOTAL_STACK
        : (sub === 'giant' ? GameGlobal.TOTAL_GIANT
          : (sub === 'fun' ? GameGlobal.TOTAL_FUN
            : (isSpecial ? GameGlobal.TOTAL_SPECIAL : GameGlobal.TOTAL_LEVELS)));
      var totalPages = Math.ceil(total / GameGlobal.LEVELS_PER_PAGE);

      // 暗化遮罩
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(0, 0, W, H);

      var panelW = 330, panelH = 396;
      var px = cx - panelW / 2;
      var py = Math.max(safeTop + 12, (H - panelH) / 2);

      // 面板（暖金渐变 + 投影）
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.35)';
      ctx.shadowBlur = 22;
      this.roundRectPath(px, py, panelW, panelH, 22);
      var g = ctx.createLinearGradient(px, py, px, py + panelH);
      g.addColorStop(0, '#FFFDF2');
      g.addColorStop(1, '#FFEFC4');
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();
      this.roundRectPath(px, py, panelW, panelH, 22);
      ctx.lineWidth = 2; ctx.strokeStyle = '#E8A93D'; ctx.stroke();

      // 标题
      this.drawText('跳转到第几页', cx, py + 38, 21, '#8B5A2B', 'center', true);
      // 关闭（✕）按钮（右上角）
      this.drawTextButton(px + panelW - 44, py + 14, 30, 30, '✕', {
        id: 'pj_cancel', fontSize: 18, bg: 'rgba(220,180,150,0.5)', border: '#C8A070', textColor: '#7A4A20', radius: 15,
      });

      // 数字显示框
      var dx = px + 30, dy = py + 64, dw = panelW - 60, dh = 52;
      this.roundRectPath(dx, dy, dw, dh, 12);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fill();
      ctx.lineWidth = 1.5; ctx.strokeStyle = '#E8B34B'; ctx.stroke();
      var shown = Main.pageJumpText ? Main.pageJumpText : '—';
      this.drawText(shown + '  /  ' + totalPages, dx + dw / 2, dy + 34, 24, '#8B5A2B', 'center', true);

      // 数字键盘 4×3
      var gw = 86, gh = 52, ggap = 12;
      var gridW = gw * 3 + ggap * 2;
      var gx0 = px + (panelW - gridW) / 2;
      var gy0 = py + 134;
      var keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'ok'];
      for (var ki = 0; ki < keys.length; ki++) {
        var col = ki % 3, row = Math.floor(ki / 3);
        var kx = gx0 + col * (gw + ggap);
        var ky = gy0 + row * (gh + ggap);
        var key = keys[ki];
        var label = key === 'del' ? '⌫' : (key === 'ok' ? '✓' : key);
        var id = key === 'del' ? 'pj_del' : (key === 'ok' ? 'pj_ok' : 'pj_' + key);
        var isOk = key === 'ok';
        this.drawTextButton(kx, ky, gw, gh, label, {
          id: id, fontSize: 22,
          bg: isOk ? '#FFD66B' : '#FFE9A8',
          border: '#E8A93D', textColor: isOk ? '#B5651D' : '#8B5A2B', radius: 12,
        });
      }
    },

    /** 商店 */
    renderShop: function () {
      this.drawBackground('bg_menu');
      var cx = GameGlobal.DESIGN_W / 2;
      var ctx = this.ctx;
      var coins = GameGlobal.Storage.getCoins();
      var safeTop = GameGlobal.SAFE_TOP || 0;

      this.drawTextButton(20, 44 + safeTop, 70, 40, '返回', { id: 'shop_back', fontSize: 16 });
      this.drawText('🏪 商店', cx, 60 + safeTop, 30, '#8B5A2B', 'center', true);
      this.drawCoinBadge(GameGlobal.DESIGN_W - 14, 44 + safeTop, coins);

      var cardW = 168, cardH = 196, gapX = 16, gapY = 18;
      var startX = (GameGlobal.DESIGN_W - cardW * 2 - gapX) / 2;
      // 商品卡区随 SAFE_TOP 下移，避免与顶部"返回"/标题/金币徽章重叠（与选关页同源问题）
      var startY = 110 + safeTop;
      var toolIcons = { hint: '💡', shuffle: '🔀', bomb: '💣', freeze: '❄' };

      for (var i = 0; i < GameGlobal.SHOP_ITEMS.length; i++) {
        var item = GameGlobal.SHOP_ITEMS[i];
        var col = i % 2, row = Math.floor(i / 2);
        var x = startX + col * (cardW + gapX);
        var y = startY + row * (cardH + gapY);

        // 商品卡底
        this.roundRectPath(x, y, cardW, cardH, 16);
        ctx.fillStyle = 'rgba(255, 246, 224, 0.95)';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#E8B34B';
        ctx.stroke();

        // 工具图标
        this.drawText(toolIcons[item.tool] || '🎁', x + cardW / 2, y + 44, 42, '#8B5A2B', 'center', false);
        // 名称
        this.drawText(item.name, x + cardW / 2, y + 86, 20, '#5D4037', 'center', true);
        // 描述
        this.drawText(item.desc, x + cardW / 2, y + 112, 12, '#A08060', 'center', false);
        // 价格
        this.drawText('🪙 ' + item.coins, x + cardW / 2, y + 140, 20, '#B8860B', 'center', true);

        // 购买按钮
        var afford = coins >= item.coins;
        this.drawTextButton(x + 20, y + 152, cardW - 40, 34, '购买', {
          id: item.id, fontSize: 15,
          gradient: afford ? ['#FFD66B', '#F2A93B'] : ['#D8D8D8', '#C0C0C0'],
          border: afford ? '#D98A1A' : '#A8A8A8',
          textColor: '#FFF',
          radius: 12,
        });
      }

      this.drawText('通关可获得金币，首次通关奖励更丰厚', cx, 820, 14, 'rgba(139,90,43,0.65)', 'center', false);
    },

    /** 游戏页（withButtons=false 时仅绘制画面，用于结算页底层） */
    renderGame: function (withButtons) {
      this.drawBackground('bg_game');
      var game = Main.game;
      var now = Main.lastTime;
      var ctx = this.ctx;
      withButtons = withButtons !== false;
      var safeTop = GameGlobal.SAFE_TOP || 0;

      // （顶部信息栏改到棋盘之后绘制，见下方，确保 HUD 始终压在卡片上方）

      // ── 棋盘区（地板 + 卡片 + 连线 + 棋盘粒子）统一在镜头变换内 ──
      // （注：曾尝试离屏缓存优化大棋盘掉帧，但微信真机下离屏画布 drawImage 到主屏不稳定，
      //   会导致整盘图片不显示，故回退为逐帧全量重绘——保证显示正确。后续若需优化掉帧，
      //   改用更稳妥的方案。）
      ctx.save();
      if (game.cam) {
        var sc = game._boardScreenCenter();
        ctx.translate(sc.x, sc.y);
        ctx.scale(game.cam.scale, game.cam.scale);
        ctx.translate(-game.cam.cx, -game.cam.cy);
      }
      // 形状地板 + 特殊格底色（仅形状棋盘关）
      if (game.hasShape) this.drawBoardFloor(game);
      // 卡片（先画，连线需要覆盖在卡片上方）
      if (game.isStack) {
        // 按 layer 升序绘制：高层最后画、视觉压在顶层，与 hitTest 返回的逻辑顶层一致，
        // 否则随机数组顺序会让底层盖住顶层，造成“先消底层”的视觉错位。
        var stackTiles = [];
        for (var si = 0; si < game.tiles.length; si++) {
          if (game.tiles[si] && game.tiles[si].state !== 'eliminated') stackTiles.push(game.tiles[si]);
        }
        stackTiles.sort(function (a, b) { return a.layer - b.layer; });
        for (var sk = 0; sk < stackTiles.length; sk++) this.drawCard(stackTiles[sk], now);
      } else {
        for (var r = 1; r <= game.rows; r++) {
          for (var c = 1; c <= game.cols; c++) {
            var card = game.cardNodes[r][c];
            if (card && card.state !== 'eliminated') {
              this.drawCard(card, now);
            }
          }
        }
      }
      // 连线（消除金线 / 提示蓝线，画在卡片上层）
      this.drawConnectionLine(game.connectionLine);
      // 移动卡（mover）：浮动于棋盘最上层（独立于 cardNodes，复用 drawCard；多张遍历绘制）
      if (game.movers) {
        for (var mi = 0; mi < game.movers.length; mi++) {
          var mv = game.movers[mi];
          if (mv.state !== 'eliminated') this.drawCard(mv, now);
        }
      }
      // 棋盘粒子（随镜头）
      this.drawParticles('board');
      ctx.restore();

      // ── 顶部信息栏（画在棋盘之上：返回/标题/计时 永远压在卡片上方）──
      // 不用实心底衬（会多出一条丑陋的页眉带）；改用白色文字阴影，保证 HUD 在彩色卡片上也清晰
      ctx.save();
      ctx.shadowColor = 'rgba(255,255,255,0.92)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 1;
      if (withButtons) {
        this.drawTextButton(16, 28 + safeTop, 68, 40, '返回', { id: 'game_back', fontSize: 15 });
        // 玩法说明问号按钮（右上角圆形），点击弹出本关玩法
        var helpX = GameGlobal.DESIGN_W - 44;
        var helpY = 26 + safeTop;
        var helpSz = 38;
        var hcx = helpX + helpSz / 2, hcy = helpY + helpSz / 2;
        var pressedHelp = Main.buttonPressed('btn_help');
        ctx.save();
        ctx.beginPath();
        ctx.arc(hcx, hcy, helpSz / 2, 0, Math.PI * 2);
        ctx.fillStyle = pressedHelp ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.88)';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#E8A93D';
        ctx.stroke();
        ctx.restore();
        this.drawText('?', hcx, hcy + 1, 22, '#C8761A', 'center', true);
        Main.buttonBounds.push({ id: 'btn_help', x: helpX, y: helpY, w: helpSz, h: helpSz });
      }
      this.drawTextFit('第' + GameGlobal.getLevelDisplayNumber(game.levelId) + '关 · ' + game.cfg.name,
        GameGlobal.DESIGN_W / 2, 48 + safeTop, GameGlobal.DESIGN_W - 170, 20, '#7A4A1F', 'center', true);
      this.drawText('⏱ ' + game.getElapsed() + 's', GameGlobal.DESIGN_W - 62, 48 + safeTop, 17, '#7A4A1F', 'right', false);
      ctx.restore();

      // 屏幕粒子（胜利烟花等，不随镜头）
      this.drawParticles('design');

      // 底部工具区（结算页不注册这些按钮）——按钮加大 + 剩余次数角标（用完不置灰，点击会提示去商店购买）
      // 4 个按钮等距分布（15.6 / 109.2 / 202.8 / 296.4，左上角 x），间距 93.6
      if (withButtons) {
        var btnSize = 78;
        var bottomY = GameGlobal.DESIGN_H - 104;
        var tools = GameGlobal.Storage.getTools();
        var toolDefs = [
          { key: 'hint', img: 'btn_hint', id: 'btn_hint', x: 15.6, enabled: game.cfg.hintEnabled },
          { key: 'shuffle', img: 'btn_shuffle', id: 'btn_shuffle', x: 109.2, enabled: game.cfg.shuffleEnabled },
          { key: 'bomb', img: 'btn_bomb', id: 'btn_bomb', x: 202.8, enabled: game.cfg.bombEnabled },
          { key: 'freeze', id: 'btn_freeze', x: 296.4, enabled: !!(game.movers && game.movers.length) },
        ];
        for (var t = 0; t < toolDefs.length; t++) {
          var td = toolDefs[t];
          if (!td.enabled) continue;
          var count = tools[td.key] || 0;
          // 冻结按钮无图片，程序绘制（与 btn_hint 同风格的蓝黄按钮）
          if (td.key === 'freeze') {
            this.drawFreezeButton(td.x, bottomY, btnSize, td.id);
          } else {
            this.drawImageButton(td.x, bottomY, btnSize, btnSize, td.img, td.id);
          }
          // 次数角标（右上角小圆，略微向左下偏移贴近按钮）
          ctx.save();
          ctx.beginPath();
          ctx.arc(td.x + btnSize - 10, bottomY + 16, 13, 0, Math.PI * 2);
          ctx.fillStyle = count > 0 ? '#F5A623' : '#B0B0B0';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#FFF';
          ctx.stroke();
          this.drawText(String(count), td.x + btnSize - 10, bottomY + 17, 12, '#FFF', 'center', true);
          ctx.restore();
        }
      }

      // 剩余对数
      this.drawText('剩余 ' + game.getRemainingPairs() + ' 对',
        GameGlobal.DESIGN_W / 2, GameGlobal.DESIGN_H - 20, 14, 'rgba(122,74,31,0.8)', 'center', false);

      // toast
      if (Main.toast && Main.toast.until > Main.lastTime) {
        var toast = Main.toast;
        ctx.save();
        ctx.globalAlpha = Math.min(1, (toast.until - Main.lastTime) / 400);
        var tw = toast.text.length * 16 + 30;
        this.roundRectPath(GameGlobal.DESIGN_W / 2 - tw / 2, 110, tw, 38, 19);
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
        ctx.fill();
        this.drawText(toast.text, GameGlobal.DESIGN_W / 2, 129, 15, '#FFF', 'center', false);
        ctx.restore();
      }
    },

    /**
     * 结算面板 —— 全程序绘制（替代原静态图片），带弹入动画与星星点缀
     * 布局（面板内相对坐标）：
     *   0~88 金色标题条 / 108 关卡名 / 142~252 成绩三卡 / 292 下一关 / 356 再玩一次 / 406 返回首页
     */
    renderWin: function () {
      this.renderGame(false);

      var ctx = this.ctx;
      var now = Main.lastTime;
      var cx = GameGlobal.DESIGN_W / 2;

      // 暗化遮罩
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, GameGlobal.DESIGN_W, GameGlobal.DESIGN_H);

      // 面板外星星点缀（呼吸闪烁）
      var starSeed = [
        { x: 40, y: 240, r: 7, ph: 0 },
        { x: 350, y: 210, r: 5, ph: 1.3 },
        { x: 58, y: 620, r: 5, ph: 2.2 },
        { x: 336, y: 600, r: 7, ph: 0.8 },
        { x: 195, y: 120, r: 6, ph: 1.8 },
        { x: 195, y: 720, r: 6, ph: 2.6 },
      ];
      for (var s = 0; s < starSeed.length; s++) {
        var st = starSeed[s];
        var alpha = 0.35 + 0.3 * Math.sin(now / 350 + st.ph);
        this.drawStar(st.x, st.y, st.r, '#FFE28A', alpha);
      }

      // 面板弹入动画（easeOutBack 弹性）
      var t = Math.min(1, (now - Main.winShownAt) / 450);
      var scale = easeOutBack(t);

      var panelW = 330, panelH = 496;
      var px = cx - panelW / 2;
      var py = (GameGlobal.DESIGN_H - panelH) / 2 - 6;

      ctx.save();
      ctx.translate(cx, py + panelH / 2);
      ctx.scale(scale, scale);
      ctx.translate(-cx, -(py + panelH / 2));

      // 面板主体（暖金渐变 + 外发光）
      ctx.save();
      ctx.shadowColor = 'rgba(232, 169, 61, 0.6)';
      ctx.shadowBlur = 26;
      this.roundRectPath(px, py, panelW, panelH, 24);
      var bodyGrad = ctx.createLinearGradient(px, py, px, py + panelH);
      bodyGrad.addColorStop(0, '#FFFDF2');
      bodyGrad.addColorStop(1, '#FFEFC4');
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.restore();

      // 双描边
      this.roundRectPath(px, py, panelW, panelH, 24);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#E8A93D';
      ctx.stroke();
      this.roundRectPath(px + 5, py + 5, panelW - 10, panelH - 10, 20);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.stroke();

      // ── 顶部金色标题条 ──
      var barH = 88;
      this.roundRectPath(px, py, panelW, barH, 24);
      ctx.save();
      ctx.clip();
      var barGrad = ctx.createLinearGradient(px, py, px, py + barH);
      barGrad.addColorStop(0, '#FFCE5C');
      barGrad.addColorStop(1, '#F2A93B');
      ctx.fillStyle = barGrad;
      ctx.fillRect(px, py, panelW, barH);
      // 标题条下缘高光弧
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillRect(px, py + barH - 6, panelW, 6);
      ctx.restore();

      // 标题条内装饰小星
      this.drawStar(px + 36, py + 30, 7, 'rgba(255,255,255,0.85)', 0.9);
      this.drawStar(px + panelW - 36, py + 30, 7, 'rgba(255,255,255,0.85)', 0.9);
      this.drawText('🎉 恭喜通关 🎉', cx, py + 46, 29, '#FFF', 'center', true);

      // ── 关卡名 + 金币奖励 ──
      var winData = Main.winData;
      var lvCfg = GameGlobal.getLevelConfig(winData.levelId);
      var titleText = (winData.category === 'stack')
        ? ('层层消消 · 第' + GameGlobal.getLevelDisplayNumber(winData.levelId) + '关 · ' + lvCfg.name)
        : (winData.category === 'special'
          ? ('特殊关卡 · 第' + GameGlobal.getLevelDisplayNumber(winData.levelId) + '关 · ' + lvCfg.name)
          : ('第' + GameGlobal.getLevelDisplayNumber(winData.levelId) + '关 · ' + lvCfg.name));
      this.drawTextFit(titleText, cx, py + 114, panelW - 50, 20, '#8B5A2B', 'center', true);
      // 金币奖励（金色高亮）
      var coinsEarned = winData.coinsEarned || 0;
      var isFirstClearText = coinsEarned >= GameGlobal.COINS_FIRST_CLEAR;
      this.drawText((isFirstClearText ? '首次通关 ' : '') + '+🪙' + coinsEarned,
        cx, py + 142, 22, '#D98A1A', 'center', true);
      // 分隔线
      ctx.strokeStyle = 'rgba(232, 169, 61, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px + 50, py + 162);
      ctx.lineTo(px + panelW - 50, py + 162);
      ctx.stroke();

      // ── 成绩三卡 ──
      var cardW = 92, cardH = 102, cardGap = 14;
      var cardsX = cx - (cardW * 3 + cardGap * 2) / 2;
      var cardsY = py + 174;
      var statDefs = [
        { label: '⏱ 用时', value: winData.elapsed + 's', sub: '' },
        { label: '🍀 步数', value: String(winData.moves), sub: '步' },
      ];
      for (var i = 0; i < 2; i++) {
        var x0 = cardsX + i * (cardW + cardGap);
        this.drawStatCard(x0, cardsY, cardW, cardH, statDefs[i].label, statDefs[i].value, statDefs[i].sub);
      }
      // 最佳成绩卡（第三卡）
      var best = GameGlobal.Storage.getBestScore(winData.levelId);
      var isBest = !!best && best.moves === winData.moves && best.elapsed === winData.elapsed;
      var bestText = best ? best.moves + '步·' + best.elapsed + 's' : '—';
      this.drawStatCard(cardsX + 2 * (cardW + cardGap), cardsY, cardW, cardH,
        isBest ? '🏆 新纪录' : '🏆 最佳', bestText, '', isBest);

      // 新纪录徽章（金色旋转小标签）：贴在“最佳成绩”卡右上角，位于金币行下方，不遮挡金币、不超出面板
      if (isBest) {
        ctx.save();
        var badgeText = '✦ 新纪录 ✦';
        var badgeSize = 15;
        ctx.font = 'bold ' + badgeSize + 'px sans-serif';
        var badgeTW = (ctx.measureText ? ctx.measureText(badgeText).width : badgeText.length * badgeSize);
        var bW = Math.ceil(badgeTW) + 20;   // 框宽随文字自适应，文字永远不会超出框
        var bH = 30;
        var bestCardX = cardsX + 2 * (cardW + cardGap);
        // 贴在最佳卡右上角偏上方（略探出卡顶与右缘，但限制在面板内），
        // 往上一点、往右一点，避开“🏆 新纪录”标签文字
        var badgeCx = Math.min(bestCardX + cardW - bW / 2 + 9, px + panelW - bW / 2 - 4);
        var badgeCy = cardsY - 2;
        ctx.translate(badgeCx, badgeCy);
        ctx.rotate(0.04);
        this.roundRectPath(-bW / 2, -bH / 2, bW, bH, 15);
        var badgeGrad = ctx.createLinearGradient(0, -bH / 2, 0, bH / 2);
        badgeGrad.addColorStop(0, '#FFD54A');
        badgeGrad.addColorStop(1, '#F5A623');
        ctx.fillStyle = badgeGrad;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#D98A1A';
        ctx.stroke();
        this.drawText(badgeText, 0, 1, badgeSize, '#FFF', 'center', true);
        ctx.restore();
      }

      // ── 按钮 ──
      // 下一关：普通关 = id+1；特殊关 = 同数组下一个（顺序解锁）
      var hasNext;
      if (winData.category === 'special') {
        var sidx = GameGlobal.getSpecialIndex(winData.levelId);
        hasNext = sidx >= 0 && sidx < GameGlobal.SPECIAL_LEVELS.length - 1;
      } else {
        hasNext = winData.levelId < GameGlobal.TOTAL_LEVELS;
      }
      var btnW = panelW - 60;
      var bx = cx - btnW / 2;
      if (hasNext) {
        this.drawTextButton(bx, py + 292, btnW, 56, '下一关 ▶', {
          id: 'win_next', fontSize: 24,
          gradient: ['#FFD66B', '#F2A93B'], border: '#D98A1A', textColor: '#FFF',
          shadow: 'rgba(230,150,30,0.5)', bottomBar: '#D98A1A', radius: 16,
        });
      }
      this.drawTextButton(bx, py + 356, btnW, 44, '再玩一次', {
        id: 'win_replay', fontSize: 20,
        bg: '#FFFDF4', border: '#E8B34B', textColor: '#8B5A2B',
        shadow: 'rgba(180,140,60,0.25)', radius: 14,
      });
      this.drawTextButton(bx, py + 406, btnW, 32, '返回首页', {
        id: 'win_home', fontSize: 16,
        bg: 'rgba(0,0,0,0)', border: 'transparent', textColor: '#A08050',
      });

      ctx.restore();
    },

    /** 失败结算：移动卡完全飞出屏幕（第 25 关移动卡玩法；仿 renderWin） */
    renderLose: function () {
      this.renderGame(false);

      var ctx = this.ctx;
      var now = Main.lastTime;
      var cx = GameGlobal.DESIGN_W / 2;

      // 暗化遮罩
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(0, 0, GameGlobal.DESIGN_W, GameGlobal.DESIGN_H);

      // 面板弹入动画（easeOutBack 弹性）
      var t = Math.min(1, (now - Main.loseShownAt) / 450);
      var scale = easeOutBack(t);

      var panelW = 320, panelH = 360;
      var px = cx - panelW / 2;
      var py = (GameGlobal.DESIGN_H - panelH) / 2 - 6;

      ctx.save();
      ctx.translate(cx, py + panelH / 2);
      ctx.scale(scale, scale);
      ctx.translate(-cx, -(py + panelH / 2));

      // 面板主体（暖白 + 红警示描边）
      ctx.save();
      ctx.shadowColor = 'rgba(200, 60, 50, 0.5)';
      ctx.shadowBlur = 24;
      this.roundRectPath(px, py, panelW, panelH, 24);
      var bodyGrad = ctx.createLinearGradient(px, py, px, py + panelH);
      bodyGrad.addColorStop(0, '#FFFBF7');
      bodyGrad.addColorStop(1, '#FFE9E0');
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.restore();

      this.roundRectPath(px, py, panelW, panelH, 24);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#E2725B';
      ctx.stroke();

      // 顶部红色标题条
      var barH = 92;
      this.roundRectPath(px, py, panelW, barH, 24);
      ctx.save();
      ctx.clip();
      var barGrad = ctx.createLinearGradient(px, py, px, py + barH);
      barGrad.addColorStop(0, '#F0856B');
      barGrad.addColorStop(1, '#E2584B');
      ctx.fillStyle = barGrad;
      ctx.fillRect(px, py, panelW, barH);
      ctx.restore();

      this.drawText('移动卡飞出屏幕！', cx, py + 50, 26, '#FFF', 'center', true);

      // 关卡名 + 失败说明
      var loseData = Main.loseData || {};
      var lvCfg = GameGlobal.getLevelConfig(loseData.levelId);
      var titleText = '特殊关卡 · 第' + GameGlobal.getLevelDisplayNumber(loseData.levelId) + '关 · ' + (lvCfg ? lvCfg.name : '');
      this.drawTextFit(titleText, cx, py + 124, panelW - 50, 18, '#8B5A2B', 'center', true);
      this.drawText('在它滑出屏幕前，你没能消除它…', cx, py + 158, 16, '#B06050', 'center', true);
      this.drawText('（点中它 + 它的同类即可配对消除）', cx, py + 184, 13, '#C09080', 'center', true);

      // 按钮
      var btnW = panelW - 60;
      var bx = cx - btnW / 2;
      this.drawTextButton(bx, py + 226, btnW, 52, '再试一次', {
        id: 'lose_retry', fontSize: 22,
        gradient: ['#FFB08A', '#EF6A50'], border: '#C8503A', textColor: '#FFF',
        shadow: 'rgba(210,90,60,0.5)', bottomBar: '#C8503A', radius: 16,
      });
      this.drawTextButton(bx, py + 290, btnW, 36, '返回首页', {
        id: 'lose_home', fontSize: 16,
        bg: 'rgba(0,0,0,0)', border: 'transparent', textColor: '#A08050',
      });

      ctx.restore();
    },

    /** 成绩小卡：白底圆角 + 标签 + 数值（新纪录时金框高亮） */
    drawStatCard: function (x, y, w, h, label, value, sub, highlight) {
      var ctx = this.ctx;
      this.roundRectPath(x, y, w, h, 14);
      var grad = ctx.createLinearGradient(x, y, x, y + h);
      if (highlight) {
        grad.addColorStop(0, '#FFF6DC');
        grad.addColorStop(1, '#FFE9AE');
      } else {
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(1, '#FFF6E2');
      }
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.lineWidth = highlight ? 2.5 : 1.5;
      ctx.strokeStyle = highlight ? '#F5A623' : '#F0D9A8';
      ctx.stroke();

      // 测量辅助：必须先显式把字号写入 ctx.font，否则 measureText 会沿用上一次文字的字号而失真
      var canMeasure = !!ctx.measureText;
      function meas(str, size) { if (!canMeasure) return 0; ctx.font = 'bold ' + size + 'px sans-serif'; return ctx.measureText(str).width; }

      // 标签自适应字号：过长自动缩小，保证不出框
      var labelSize = 13;
      var maxLW = w - 12;
      if (canMeasure) { while (labelSize > 10 && meas(label, labelSize) > maxLW) labelSize -= 1; }
      this.drawText(label, x + w / 2, y + 26, labelSize, highlight ? '#C87E0F' : '#A08060', 'center', true);

      // 数值自适应字号：过长自动缩小；若缩到最小仍超框，则拆成两行（优先按“·”拆分），保证不出框
      var valueColor = highlight ? '#D98A1A' : '#5D4037';
      var maxW = w - 14;
      if (!canMeasure || meas(value, 24) <= maxW) {
        this.drawText(value, x + w / 2, y + 62, 24, valueColor, 'center', true);
      } else {
        var vs = 24;
        while (vs > 11 && meas(value, vs) > maxW) vs -= 1;
        if (vs > 11 || meas(value, vs) <= maxW) {
          this.drawText(value, x + w / 2, y + 62, vs, valueColor, 'center', true);
        } else {
          // 仍超框 → 拆两行（优先按“·”拆，否则从中间拆）
          var dot = value.indexOf('·');
          var parts = dot > 0
            ? [value.slice(0, dot), value.slice(dot + 1)]
            : (function () { var m = Math.ceil(value.length / 2); return [value.slice(0, m), value.slice(m)]; })();
          var ps = 22;
          while (ps > 11 && (meas(parts[0], ps) > maxW || meas(parts[1], ps) > maxW)) ps -= 1;
          this.drawText(parts[0], x + w / 2, y + 52, ps, valueColor, 'center', true);
          this.drawText(parts[1], x + w / 2, y + 78, ps, valueColor, 'center', true);
        }
      }
      if (sub) {
        this.drawText(sub, x + w / 2 + (value.length + 1) * 6, y + 62, 13, '#A08060', 'center', false);
      }
    },

    /** 程序绘制五角星 */
    drawStar: function (x, y, r, color, alpha) {
      var ctx = this.ctx;
      ctx.save();
      ctx.globalAlpha = alpha === undefined ? 1 : alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      for (var i = 0; i < 5; i++) {
        var outer = i * 2 * Math.PI / 5 - Math.PI / 2;
        var inner = outer + Math.PI / 5;
        var ox = x + r * Math.cos(outer), oy = y + r * Math.sin(outer);
        var ix = x + r * 0.42 * Math.cos(inner), iy = y + r * 0.42 * Math.sin(inner);
        if (i === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
        ctx.lineTo(ix, iy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    },

    /** 文本按字符自动换行（适配中文），返回多行数组 */
    wrapText: function (text, maxWidth) {
      var ctx = this.ctx;
      var lines = [];
      var line = '';
      for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        var test = line + ch;
        if (ctx.measureText(test).width > maxWidth && line) {
          lines.push(line);
          line = ch;
        } else {
          line = test;
        }
      }
      if (line) lines.push(line);
      return lines;
    },

    /** 玩法说明弹窗：暗化遮罩 + 面板 + 换行说明 + “知道了”关闭按钮 */
    renderHelpOverlay: function () {
      var ctx = this.ctx;
      var game = Main.game;
      if (!game) return;
      var helpLines = GameGlobal.getLevelHelp(game.cfg);
      var cx = GameGlobal.DESIGN_W / 2;

      // 暗化遮罩
      ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      ctx.fillRect(0, 0, GameGlobal.DESIGN_W, GameGlobal.DESIGN_H);

      var safeTop = GameGlobal.SAFE_TOP || 0;
      var panelW = 330;
      var textW = panelW - 56;
      var lineH = 26;

      // 先按内容字号(15px)设置字体再测量换行行数，得到面板所需高度（自适应），避免文字溢出框外
      ctx.font = '15px sans-serif';
      var contentH = 0;
      for (var ci = 1; ci < helpLines.length; ci++) {
        var wlines = this.wrapText(helpLines[ci], textW);
        contentH += wlines.length * lineH + 4;
      }
      // 上部分（标题+分隔线 92）+ 下部分（按钮区 78）；超高则夹到屏幕内
      var panelH = Math.min(92 + contentH + 78, GameGlobal.DESIGN_H - 60);
      var px = cx - panelW / 2;
      var py = Math.max(safeTop + 10, (GameGlobal.DESIGN_H - panelH) / 2);

      // 面板主体（暖金渐变 + 投影）
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 22;
      this.roundRectPath(px, py, panelW, panelH, 22);
      var g = ctx.createLinearGradient(px, py, px, py + panelH);
      g.addColorStop(0, '#FFFDF2');
      g.addColorStop(1, '#FFEFC4');
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();
      this.roundRectPath(px, py, panelW, panelH, 22);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#E8A93D';
      ctx.stroke();

      // 标题（说明第一行）
      this.drawTextFit(helpLines[0], cx, py + 38, panelW - 56, 23, '#8B5A2B', 'center', true);
      // 分隔线
      ctx.strokeStyle = 'rgba(232, 169, 61, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px + 34, py + 60);
      ctx.lineTo(px + panelW - 34, py + 60);
      ctx.stroke();

      // 说明内容（从第二行起，逐行自动换行，左对齐）
      var textX = px + 28;
      var textW = panelW - 56;
      var y = py + 92;
      var lineH = 26;
      for (var i = 1; i < helpLines.length; i++) {
        var wrapped = this.wrapText(helpLines[i], textW);
        for (var j = 0; j < wrapped.length; j++) {
          this.drawText(wrapped[j], textX, y, 15, '#5D4037', 'left', false);
          y += lineH;
        }
        y += 4;
      }

      // “知道了”关闭按钮
      var btnW = panelW - 80, btnH = 46;
      var bx = cx - btnW / 2, by = py + panelH - 62;
      this.drawTextButton(bx, by, btnW, btnH, '知道了', {
        id: 'help_close', fontSize: 20,
        gradient: ['#FFD66B', '#F2A93B'], border: '#D98A1A', textColor: '#FFF',
        radius: 16,
      });
    },
  };

  GameGlobal.Renderer = Renderer;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Renderer;
  }
})();
