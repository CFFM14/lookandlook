/**
 * main.js —— 入口类：屏幕适配、图片加载、触摸、帧循环、Tween 系统
 */
(function () {
  'use strict';

  // ══════════════════════════════════════════════
  //  Tween 简易动画系统
  // ══════════════════════════════════════════════

  var tweens = [];

  function ease(p, name) {
    if (name === 'easeIn') return p * p;
    if (name === 'easeOut') return 1 - (1 - p) * (1 - p);
    if (name === 'easeInOut') return p < 0.5 ? 2 * p * p : 1 - 2 * (1 - p) * (1 - p);
    return p;
  }

  var Tween = {
    /** 对 obj 的属性做插值动画，props 为目标值对象 */
    to: function (obj, props, dur, easeName, cb) {
      var start = {};
      for (var k in props) {
        if (props.hasOwnProperty(k)) start[k] = obj[k];
      }
      tweens.push({ obj: obj, start: start, props: props, dur: dur, easeName: easeName, cb: cb, t: 0 });
    },

    update: function (dt) {
      var i = 0;
      while (i < tweens.length) {
        var tw = tweens[i];
        tw.t += dt;
        var p = Math.min(1, tw.t / tw.dur);
        var e = ease(p, tw.easeName);
        for (var k in tw.props) {
          if (tw.props.hasOwnProperty(k)) {
            tw.obj[k] = tw.start[k] + (tw.props[k] - tw.start[k]) * e;
          }
        }
        if (p >= 1) {
          tweens.splice(i, 1);
          if (tw.cb) tw.cb();
        } else {
          i++;
        }
      }
    },
  };

  GameGlobal.Tween = Tween;

  // ══════════════════════════════════════════════
  //  Main
  // ══════════════════════════════════════════════

  var IMAGE_FILES = {
    bg_menu: 'images/bg_menu.jpg',
    bg_game: 'images/bg_game.jpg',
    title_menu: 'images/title_menu.png',
    title_game: 'images/title_game.png',
    btn_bomb: 'images/btn_bomb.png',
    btn_shuffle: 'images/btn_shuffle.png',
    btn_hint: 'images/btn_hint.png',
  };
  for (var fi = 1; fi <= 12; fi++) {
    IMAGE_FILES['fruit_' + (fi < 10 ? '0' : '') + fi] = 'images/fruit_' + (fi < 10 ? '0' : '') + fi + '.png';
  }

  var Main = {
    canvas: null,
    ctx: null,
    screenW: 390,
    screenH: 844,
    scale: 1,
    offsetX: 0,
    offsetY: 0,

    images: {},
    page: 'menu',
    game: null,
    winData: null,
    toast: null,
    soundOn: true,
    lastTime: 0,
    winShownAt: 0, // 结算面板出现时间（弹入动画基准）

    buttonBounds: [],
    pressedId: null,

    levelScrollY: 0, // 关卡选择页列表滚动偏移（设计坐标，≤0）
    _touchStart: null,
    _touchMoved: false,
    _ready: false,

    init: function () {
      var self = this;
      var sys = wx.getSystemInfoSync();
      this.screenW = sys.windowWidth;
      this.screenH = sys.windowHeight;
      var pr = sys.pixelRatio || 2;

      this.canvas = wx.createCanvas();
      this.ctx = this.canvas.getContext('2d');

      this.canvas.width = this.screenW * pr;
      this.canvas.height = this.screenH * pr;
      this.scale = Math.min(this.screenW / GameGlobal.DESIGN_W, this.screenH / GameGlobal.DESIGN_H);
      this.offsetX = (this.screenW - GameGlobal.DESIGN_W * this.scale) / 2;
      this.offsetY = (this.screenH - GameGlobal.DESIGN_H * this.scale) / 2;
      this._pr = pr;

      GameGlobal.Renderer.init(this.ctx);
      GameGlobal.SoundManager.init();
      this.soundOn = GameGlobal.SoundManager.isEnabled();

      this.loadImages(function () {
        self._ready = true;
        self.bindTouch();
        self.gameLoop();
      });
    },

    loadImages: function (done) {
      var remaining = 0;
      var finished = false;
      var self = this;
      var check = function () {
        remaining--;
        if (remaining <= 0 && !finished) {
          finished = true;
          GameGlobal.Renderer.setImages(self.images);
          done();
        }
      };
      for (var key in IMAGE_FILES) {
        if (!IMAGE_FILES.hasOwnProperty(key)) continue;
        remaining++;
        (function (k) {
          var img = wx.createImage();
          img.onload = check;
          img.onerror = check; // 单张失败不阻塞启动
          img.src = IMAGE_FILES[k];
          self.images[k] = img;
        })(key);
      }
    },

    // ── 触摸 ────────────────────────────────────

    bindTouch: function () {
      var self = this;
      wx.onTouchStart(function (e) {
        var t = e.touches && e.touches[0];
        if (!t) return;
        self._touchStart = { x: t.clientX, y: t.clientY };
        self._touchMoved = false;
        var hit = self.hitButton(t.clientX, t.clientY);
        self.pressedId = hit ? hit : null;
      });
      wx.onTouchMove && wx.onTouchMove(function (e) {
        var t = e.touches && e.touches[0];
        if (!t || !self._touchStart) return;
        if (self.page === 'levels') {
          self._touchMoved = true;
          self.pressedId = null;
          var d = (t.clientY - self._touchStart.y) / self.scale;
          var scrollMax = GameGlobal.Renderer.getLevelListMetrics().scrollMax;
          if (scrollMax > 0) {
            self.levelScrollY = Math.max(-scrollMax, Math.min(0, self.levelScrollY + d));
          }
          self._touchStart.y = t.clientY;
        }
      });
      wx.onTouchEnd(function (e) {
        var t = e.changedTouches && e.changedTouches[0];
        if (!t || !self._touchStart) return;
        var dx = t.clientX - self._touchStart.x;
        var dy = t.clientY - self._touchStart.y;
        self._touchStart = null;
        self.pressedId = null;
        if (self._touchMoved) return; // 滑动过列表则不算点击
        if (dx * dx + dy * dy > 1600) return; // 滑动超过 40px 视为滑动，不触发
        self.handleTap(t.clientX, t.clientY);
      });
    },

    /** 屏幕 CSS 坐标 → 设计坐标 */
    toDesign: function (cx, cy) {
      return {
        x: (cx - this.offsetX) / this.scale,
        y: (cy - this.offsetY) / this.scale,
      };
    },

    hitButton: function (cx, cy) {
      var d = this.toDesign(cx, cy);
      for (var i = this.buttonBounds.length - 1; i >= 0; i--) {
        var b = this.buttonBounds[i];
        if (d.x >= b.x && d.x <= b.x + b.w && d.y >= b.y && d.y <= b.y + b.h) {
          return b.id;
        }
      }
      return null;
    },

    handleTap: function (cx, cy) {
      var d = this.toDesign(cx, cy);
      // 按钮优先（最上层）
      var btn = this.hitButton(cx, cy);
      if (btn) {
        GameGlobal.UI.onAction(btn);
        return;
      }
      // 卡片
      if (this.page === 'game' && this.game) {
        var cell = this.game.hitTest(d.x, d.y);
        if (cell) this.game.onTapCard(cell.r, cell.c);
      }
    },

    buttonPressed: function (id) {
      return this.pressedId === id;
    },

    // ── 提示 ────────────────────────────────────

    showToast: function (text) {
      this.toast = { text: text, until: Date.now() + 2000 };
    },

    /** 显示胜利结算（game.onWin 调用） */
    showWin: function (levelId, moves, elapsed, coinsEarned) {
      // 守卫：胜利回调延迟弹出，若玩家已离开游戏页（返回/切关）则忽略
      if (this.page !== 'game') return;
      this.winData = { levelId: levelId, moves: moves, elapsed: elapsed, coinsEarned: coinsEarned || 0 };
      this.winShownAt = Date.now();
      this.page = 'win';
    },

    // ── 主循环 ──────────────────────────────────

    gameLoop: function () {
      var self = this;
      function tick() {
        var now = Date.now();
        var dt = Math.min(50, now - (self.lastTime || now));
        self.lastTime = now;
        self.update(dt);
        self.render();
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    },

    update: function (dt) {
      Tween.update(dt);
      GameGlobal.Renderer.updateParticles(dt);
    },

    render: function () {
      var ctx = this.ctx;
      var pr = this._pr;
      ctx.setTransform(this.scale * pr, 0, 0, this.scale * pr, this.offsetX * pr, this.offsetY * pr);
      // 清屏（留边区与背景图覆盖）
      ctx.clearRect(0, 0, GameGlobal.DESIGN_W, GameGlobal.DESIGN_H);

      this.buttonBounds = [];
      var r = GameGlobal.Renderer;
      switch (this.page) {
        case 'menu': r.renderMenu(); break;
        case 'levels': r.renderLevelSelect(); break;
        case 'shop': r.renderShop(); break;
        case 'game': r.renderGame(); break;
        case 'win': r.renderWin(); break;
      }
    },
  };

  GameGlobal.Main = Main;

  // ── 启动 ─────────────────────────────────────
  Main.init();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Main;
  }
})();
