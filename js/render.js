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
      r = Math.min(r, w / 2, h / 2);
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
      if (size <= 1) return;

      var x = v.x - size / 2, y = v.y - size / 2;

      // 抖动偏移（mismatch）
      var dx = 0;
      if (state === 'mismatch' && card.shakeT) {
        var t = now - card.shakeT;
        if (t < 500) dx = Math.sin(t * 0.06) * 5 * (1 - t / 500);
      }
      x += dx;

      // 水果卡图：素材本身已包含卡片底座，直接铺满格子（不再叠加程序绘制的底座）
      var img = this.images['fruit_' + (card.type < 10 ? '0' : '') + card.type];
      if (img) {
        ctx.drawImage(img, x, y, size, size);
      }

      // 冰层（frozen 卡 iceAlpha=1 常驻，配对消除时 Tween 淡出，直接叠在水果图上）
      var iceAlpha = v.iceAlpha;
      if (iceAlpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, iceAlpha);
        // 裁剪到卡片范围内，防止斜线/冰面画到相邻卡片上
        ctx.beginPath();
        ctx.rect(x, y, size, size);
        ctx.clip();
        ctx.fillStyle = 'rgba(180, 225, 255, 0.62)';
        ctx.fillRect(x, y, size, size);
        // 斜线纹理（只在卡片内部斜切，不越界）
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = Math.max(1, size * 0.045);
        for (var i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(x + i * size * 0.5, y);
          ctx.lineTo(x + (i + 1) * size * 0.5, y + size);
          ctx.stroke();
        }
        // 顶部高光条
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillRect(x, y, size, size * 0.22);
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
        var p = game.logicToPixel(line.points[i].r, line.points[i].c);
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

    drawParticles: function () {
      var ctx = this.ctx;
      for (var i = 0; i < this.particles.length; i++) {
        var p = this.particles[i];
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
        });
      }
    },

    /** 胜利全屏烟花：3 轮，每轮 2 个随机位置烟花 */
    spawnWinFireworks: function () {
      var self = this;
      for (var round = 0; round < 3; round++) {
        (function (delay) {
          setTimeout(function () {
            for (var k = 0; k < 2; k++) {
              var x = 60 + Math.random() * (GameGlobal.DESIGN_W - 120);
              var y = 120 + Math.random() * 480;
              self.spawnFirework(x, y);
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
      var ctx = this.ctx;

      // 右上角金币
      this.drawCoinBadge(GameGlobal.DESIGN_W - 14, 36, GameGlobal.Storage.getCoins());

      // 标题
      this.drawImageCentered('title_menu', cx, 250, 340, 260);

      // 开始游戏
      this.drawTextButton(cx - 130, 400, 260, 72, '开始游戏', { id: 'menu_start', fontSize: 26 });
      // 选择关卡
      this.drawTextButton(cx - 130, 492, 260, 72, '选择关卡', { id: 'menu_levels', fontSize: 26 });
      // 商店
      this.drawTextButton(cx - 130, 584, 260, 72, '🏪 商店', { id: 'menu_shop', fontSize: 24 });
      // 音效开关（小按钮）
      var soundOn = Main.soundOn;
      this.drawTextButton(cx - 100, 676, 200, 48,
        '音效：' + (soundOn ? '开' : '关'), { id: 'menu_sound', fontSize: 18 });

      this.drawText('连连看 · 水果消消乐', cx, 800, 15, 'rgba(139,90,43,0.7)', 'center', false);
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

    /** 关卡列表布局：两列卡片 + 滚动范围（设计坐标） */
    getLevelListMetrics: function () {
      var cardW = 132, cardH = 132, gap = 12, rowGap = 16;
      var startX = (GameGlobal.DESIGN_W - cardW * 2 - gap) / 2;
      var startY = 124;
      var rows = Math.ceil(GameGlobal.TOTAL_LEVELS / 2);
      var contentBottom = startY + rows * (cardH + rowGap) - rowGap;
      // 底部给提示文字留 60 设计像素
      var scrollMax = Math.max(0, contentBottom - (GameGlobal.DESIGN_H - 60));
      return { cardW: cardW, cardH: cardH, gap: gap, rowGap: rowGap, startX: startX, startY: startY, rows: rows, contentBottom: contentBottom, scrollMax: scrollMax };
    },

    /** 关卡选择（卡片列表可上下滑动） */
    renderLevelSelect: function () {
      this.drawBackground('bg_menu');
      var cx = GameGlobal.DESIGN_W / 2;
      var unlocked = GameGlobal.Storage.getUnlockedLevels();

      this.drawText('选择关卡', cx, 70, 30, '#8B5A2B', 'center', true);
      this.drawTextButton(20, 44, 70, 40, '返回', { id: 'levels_back', fontSize: 16 });

      var m = this.getLevelListMetrics();
      var cardW = m.cardW, cardH = m.cardH, gap = m.gap, rowGap = m.rowGap;
      var startX = m.startX, startY = m.startY;
      var scrollMax = m.scrollMax;

      // 滚动位置收敛（拖动越界后回弹）
      if (scrollMax > 0) {
        Main.levelScrollY = Math.max(-scrollMax, Math.min(0, Main.levelScrollY));
      } else {
        Main.levelScrollY = 0;
      }
      var scrollY = Main.levelScrollY;

      for (var i = 0; i < GameGlobal.TOTAL_LEVELS; i++) {
        var lv = GameGlobal.LEVELS[i];
        var col = i % 2, row = Math.floor(i / 2);
        var x = startX + col * (cardW + gap);
        var y = startY + row * (cardH + rowGap) + scrollY;
        var locked = lv.id > unlocked;

        var id = 'lv_' + lv.id;
        Main.buttonBounds.push({ id: id, x: x, y: y, w: cardW, h: cardH });
        var pressed = Main.buttonPressed(id);

        var ctx = this.ctx;
        var sx = pressed ? 0.95 : 1;
        ctx.save();
        ctx.translate(x + cardW / 2, y + cardH / 2);
        ctx.scale(sx, sx);
        ctx.translate(-(x + cardW / 2), -(y + cardH / 2));

        // 卡片底
        this.roundRectPath(x, y, cardW, cardH, 16);
        ctx.fillStyle = locked ? 'rgba(160,160,160,0.85)' : 'rgba(255,245,222,0.95)';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = locked ? '#B0B0B0' : '#E8B34B';
        ctx.stroke();

        // 难度星
        var starStr = '';
        for (var s = 0; s < 3; s++) starStr += s < lv.difficulty ? '★' : '☆';
        this.drawText(starStr, x + cardW / 2, y + 18, 14, locked ? '#999' : '#F5A623', 'center', false);

        if (locked) {
          this.drawText('第' + lv.id + '关', x + cardW / 2, y + cardH / 2 - 8, 18, '#FFF', 'center', true);
          this.drawText('🔒', x + cardW / 2, y + cardH / 2 + 26, 24, '#FFF', 'center', false);
        } else {
          this.drawText('第' + lv.id + '关', x + cardW / 2, y + 46, 16, '#8B5A2B', 'center', true);
          this.drawText(lv.name, x + cardW / 2, y + 72, 19, '#D2691E', 'center', true);
          // 最佳成绩
          var best = GameGlobal.Storage.getBestScore(lv.id);
          if (best) {
            this.drawText('最佳：' + best.moves + '步 ' + best.elapsed + 's',
              x + cardW / 2, y + cardH - 16, 11, '#A08060', 'center', false);
          } else {
            this.drawText('尚未通关', x + cardW / 2, y + cardH - 16, 11, '#C0A080', 'center', false);
          }
        }
        ctx.restore();
      }

      // 上滑提示（列表可滚动时显示，滚到底后消失）
      if (scrollMax > 0 && Main.levelScrollY > -scrollMax) {
        this.drawText('⬆ 上滑查看更多关卡', cx, 792, 13, 'rgba(139,90,43,0.6)', 'center', false);
      }

      this.drawText('每关玩法不同，通关解锁下一关', cx, 820, 14, 'rgba(139,90,43,0.65)', 'center', false);
    },

    /** 商店 */
    renderShop: function () {
      this.drawBackground('bg_menu');
      var cx = GameGlobal.DESIGN_W / 2;
      var ctx = this.ctx;
      var coins = GameGlobal.Storage.getCoins();

      this.drawTextButton(20, 44, 70, 40, '返回', { id: 'shop_back', fontSize: 16 });
      this.drawText('🏪 商店', cx, 60, 30, '#8B5A2B', 'center', true);
      this.drawCoinBadge(GameGlobal.DESIGN_W - 14, 44, coins);

      var cardW = 168, cardH = 196, gapX = 16, gapY = 18;
      var startX = (GameGlobal.DESIGN_W - cardW * 2 - gapX) / 2;
      var startY = 110;
      var toolIcons = { hint: '💡', shuffle: '🔀', bomb: '💣' };

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

      // 顶部信息栏
      if (withButtons) {
        this.drawTextButton(16, 28, 68, 40, '返回', { id: 'game_back', fontSize: 15 });
      }
      this.drawText('第' + game.levelId + '关 · ' + game.cfg.name,
        GameGlobal.DESIGN_W / 2, 48, 20, '#7A4A1F', 'center', true);
      this.drawText('⏱ ' + game.getElapsed() + 's', GameGlobal.DESIGN_W - 30, 48, 17, '#7A4A1F', 'right', false);

      // 卡片（先画，连线需要覆盖在卡片上方）
      for (var r = 1; r <= game.rows; r++) {
        for (var c = 1; c <= game.cols; c++) {
          var card = game.cardNodes[r][c];
          if (card && card.state !== 'eliminated') {
            this.drawCard(card, now);
          }
        }
      }

      // 连线（消除金线 / 提示蓝线，画在卡片上层）
      this.drawConnectionLine(game.connectionLine);

      // 粒子
      this.drawParticles();

      // 底部工具区（结算页不注册这些按钮）——按钮加大 + 剩余次数角标 + 库存不足变灰
      if (withButtons) {
        var btnSize = 78;
        var bottomY = GameGlobal.DESIGN_H - 104;
        var tools = GameGlobal.Storage.getTools();
        var toolDefs = [
          { key: 'hint', img: 'btn_hint', id: 'btn_hint', x: GameGlobal.DESIGN_W / 2 - btnSize * 1.9, enabled: game.cfg.hintEnabled },
          { key: 'shuffle', img: 'btn_shuffle', id: 'btn_shuffle', x: GameGlobal.DESIGN_W / 2 - btnSize / 2, enabled: game.cfg.shuffleEnabled },
          { key: 'bomb', img: 'btn_bomb', id: 'btn_bomb', x: GameGlobal.DESIGN_W / 2 + btnSize * 0.9, enabled: game.cfg.bombEnabled },
        ];
        for (var t = 0; t < toolDefs.length; t++) {
          var td = toolDefs[t];
          if (!td.enabled) continue;
          var count = tools[td.key] || 0;
          this.drawImageButton(td.x, bottomY, btnSize, btnSize, td.img, td.id);
          if (count <= 0) {
            // 库存不足：灰色蒙层
            ctx.save();
            ctx.fillStyle = 'rgba(90, 90, 100, 0.45)';
            this.roundRectPath(td.x, bottomY, btnSize, btnSize, 12);
            ctx.fill();
            ctx.restore();
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
     *   0~88 金色标题条 / 108 关卡名 / 142~252 成绩三卡 / 272 下一关 / 340 再玩一次 / 398 返回首页
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
      this.drawText('第' + winData.levelId + '关 · ' + lvCfg.name, cx, py + 114, 20, '#8B5A2B', 'center', true);
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
      var bestText = best ? best.moves + '步 · ' + best.elapsed + 's' : '—';
      this.drawStatCard(cardsX + 2 * (cardW + cardGap), cardsY, cardW, cardH,
        isBest ? '🏆 新纪录' : '🏆 最佳', bestText, '', isBest);

      // 新纪录徽章（金色旋转小标签）
      if (isBest) {
        ctx.save();
        ctx.translate(px + panelW - 52, py + 150);
        ctx.rotate(0.12);
        var bW = 92, bH = 34;
        this.roundRectPath(-bW / 2, -bH / 2, bW, bH, 17);
        var badgeGrad = ctx.createLinearGradient(0, -bH / 2, 0, bH / 2);
        badgeGrad.addColorStop(0, '#FFD54A');
        badgeGrad.addColorStop(1, '#F5A623');
        ctx.fillStyle = badgeGrad;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#D98A1A';
        ctx.stroke();
        this.drawText('✦ 新纪录 ✦', 0, 1, 15, '#FFF', 'center', true);
        ctx.restore();
      }

      // ── 按钮 ──
      var hasNext = winData.levelId < GameGlobal.TOTAL_LEVELS;
      var btnW = panelW - 60;
      var bx = cx - btnW / 2;
      if (hasNext) {
        this.drawTextButton(bx, py + 292, btnW, 56, '下一关 ▶', {
          id: 'win_next', fontSize: 24,
          gradient: ['#FFD66B', '#F2A93B'], border: '#D98A1A', textColor: '#FFF',
          shadow: 'rgba(230,150,30,0.5)', bottomBar: '#D98A1A', radius: 16,
        });
      }
      this.drawTextButton(bx, py + 358, btnW, 48, '再玩一次', {
        id: 'win_replay', fontSize: 20,
        bg: '#FFFDF4', border: '#E8B34B', textColor: '#8B5A2B',
        shadow: 'rgba(180,140,60,0.25)', radius: 15,
      });
      this.drawTextButton(bx, py + 418, btnW, 38, '返回首页', {
        id: 'win_home', fontSize: 16,
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

      this.drawText(label, x + w / 2, y + 26, 13, highlight ? '#C87E0F' : '#A08060', 'center', true);
      this.drawText(value, x + w / 2, y + 62, 24, highlight ? '#D98A1A' : '#5D4037', 'center', true);
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
  };

  GameGlobal.Renderer = Renderer;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Renderer;
  }
})();
