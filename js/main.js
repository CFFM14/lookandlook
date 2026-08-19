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
    gameFrom: 'menu',   // 当前局的进入来源：'menu'（主界面开始）| 'levels'（选关界面进入），决定游戏内"返回"去向
    winData: null,
    toast: null,
    soundOn: true,
    lastTime: 0,
    winShownAt: 0, // 结算面板出现时间（弹入动画基准）
    helpPopupOpen: false, // 游戏内“玩法说明”弹窗是否打开

    buttonBounds: [],
    pressedId: null,

    // 选关界面分页状态
    levelPage: 0,          // 当前页码（0 起）
    levelPageAnim: 0,      // 翻页动画进度 0~1（0 = 静止）
    levelPageFrom: 0,      // 动画起始页
    levelPageTo: 0,        // 动画目标页
    levelPageDir: 1,       // 翻页方向：1 下一页 / -1 上一页
    _levelDragging: false, // 选关界面水平拖拽中
    _levelDragX: 0,        // 拖拽累计偏移（设计坐标）
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

      // 刘海屏安全距离：取右上角胶囊按钮顶部到屏幕顶的距离，
      // 顶部"返回"按钮/标题绘制在胶囊下方，避免被刘海/状态栏遮挡
      try {
        var mb = wx.getMenuButtonBoundingClientRect && wx.getMenuButtonBoundingClientRect();
        // mb.top 是 CSS 像素，转设计坐标（除以 scale），并留出 8px 缓冲
        GameGlobal.SAFE_TOP = mb ? Math.round(mb.top / this.scale) + 8 : 0;
      } catch (e) {
        GameGlobal.SAFE_TOP = 0;
      }

      GameGlobal.Renderer.init(this.ctx);
      GameGlobal.SoundManager.init();
      this.soundOn = GameGlobal.SoundManager.isEnabled();

      // 稳定性：错误上报 + 内存告警
      if (wx.onError) {
        wx.onError(function (err) {
          if (console && console.error) console.error('[wx.onError]', err);
        });
      }
      if (wx.onMemoryWarning) {
        wx.onMemoryWarning && wx.onMemoryWarning(function (level) {
          // level: 0=低 1=中 2=高；高时给玩家提示并暂停 BGM 释放音频内存
          if (level >= 1 && GameGlobal.SoundManager && GameGlobal.SoundManager.stopBgm) {
            GameGlobal.SoundManager.stopBgm();
          }
          if (level >= 2 && Main && Main.showToast) {
            Main.showToast('内存紧张，建议重启小游戏');
          }
        });
      }

      this.loadImages(function () {
        self._ready = true;
        self.bindTouch();
        self.gameLoop();
        // 启用右上角"转发"菜单（覆盖整个游戏，玩家随时可分享）
        try {
          if (wx.showShareMenu) {
            wx.showShareMenu({ withShareTicket: false, menus: ['shareAppMessage'] });
          }
        } catch (e) {}
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
          var dx = (t.clientX - self._touchStart.x) / self.scale;
          var dy = (t.clientY - self._touchStart.y) / self.scale;
          // 只有移动超过阈值（约 8 设计像素）才视为“滑动过”，
          // 否则轻按时的微小抖动会置位 _touchMoved，导致 onTouchEnd 吞掉本次点击
          if (dx * dx + dy * dy > 64) {
            self._touchMoved = true;
            self.pressedId = null;
          }
          // 判定为水平拖拽后，跟随手指平移（垂直方向不再处理）
          if (Math.abs(dx) > Math.abs(dy) + 6 && !self._levelDragging) {
            self._levelDragging = true;
          }
          if (self._levelDragging) {
            // 动画中禁止拖拽（等动画结束）
            if (!(self.levelPageAnim > 0 && self.levelPageAnim < 1)) {
              self._levelDragX = dx;
            }
          } else {
            self._touchStart.y = t.clientY; // 垂直方向：无滚动，忽略
          }
        }
      });
      wx.onTouchEnd(function (e) {
        var t = e.changedTouches && e.changedTouches[0];
        if (!t || !self._touchStart) return;
        var dx = (t.clientX - self._touchStart.x) / self.scale;
        var dy = (t.clientY - self._touchStart.y) / self.scale;
        self._touchStart = null;
        self.pressedId = null;

        // 选关界面：水平拖拽结束 → 判定翻页
        if (self.page === 'levels' && self._levelDragging) {
          var dragX = self._levelDragX;
          self._levelDragging = false;
          // 拖满 60 设计像素才翻页，否则平滑回弹到原页
          if (Math.abs(dragX) > 60) {
            self._levelDragX = 0;
            GameGlobal.UI.onAction(dragX < 0 ? 'levels_next' : 'levels_prev');
          } else if (dragX !== 0) {
            GameGlobal.Tween.to(self, { _levelDragX: 0 }, 180, 'easeOut');
          }
          return;
        }
        if (self._touchMoved) return; // 滑动过列表则不算点击
        if (dx * dx + dy * dy > 1600) return; // 滑动超过 40 设计像素视为滑动，不触发
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
      // 玩法说明弹窗打开时：仅“知道了”按钮可关闭；点其它地方也直接关闭，
      // 并拦截底层按钮/卡片的点击，避免误触。
      if (this.helpPopupOpen) {
        var popupBtn = this.hitButton(cx, cy);
        if (popupBtn === 'help_close') {
          GameGlobal.UI.onAction('help_close');
        } else {
          this.helpPopupOpen = false;
        }
        return;
      }
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
      this.helpPopupOpen = false; // 通关时关闭玩法说明弹窗，避免覆盖结算面板
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

      // 游戏内“玩法说明”弹窗（仅在游戏页且打开时绘制，覆盖在游戏画面上方）
      if (this.page === 'game' && this.helpPopupOpen) {
        r.renderHelpOverlay();
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
