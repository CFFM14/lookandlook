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

    /** 取消某对象上的所有补间（如：跳过入场镜头时停掉镜头动画） */
    kill: function (obj) {
      for (var i = tweens.length - 1; i >= 0; i--) {
        if (tweens[i].obj === obj) tweens.splice(i, 1);
      }
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
    banana: 'images/banana.png',
  };
  for (var fi = 1; fi <= 12; fi++) {
    IMAGE_FILES['fruit_' + (fi < 10 ? '0' : '') + fi] = 'images/fruit_' + (fi < 10 ? '0' : '') + fi + '.png';
  }
  // 蔬菜卡组（veg_01~12.png，对应 茄子/南瓜/.../白菜）：给分区可指定不同主题
  for (var vi = 1; vi <= 12; vi++) {
    IMAGE_FILES['veg_' + (vi < 10 ? '0' : '') + vi] = 'images/veg_' + (vi < 10 ? '0' : '') + vi + '.png';
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
    pendingHelp: false, // 入场镜头结束后才弹玩法说明（特殊关卡用）

    buttonBounds: [],
    pressedId: null,

    // 选关界面分页状态
    levelPage: 0,          // 当前页码（0 起）
    levelPageAnim: 0,      // 翻页动画进度 0~1（0 = 静止）
    levelPageFrom: 0,      // 动画起始页
    levelPageTo: 0,        // 动画目标页
    levelPageDir: 1,       // 翻页方向：1 下一页 / -1 上一页
    // 特殊关卡选关分页状态（复用选关 UI，独立命名空间）
    levelCategory: 'normal', // 当前选关类别：'normal'（普通）| 'special'（特殊关卡）
    specialSub: null,        // 特殊关子分类：null=完整列表 / 'giant'=巨物关卡 / 'fun'=趣味关卡
    specialPage: 0,
    specialPageAnim: 0,
    specialPageFrom: 0,
    specialPageTo: 0,
    specialPageDir: 1,
    // 堆叠关卡（层层消消）选关分页状态（独立命名空间，复用选关 UI）
    stackPage: 0,
    stackPageAnim: 0,
    stackPageFrom: 0,
    stackPageTo: 0,
    stackPageDir: 1,
    // 选关“跳转页码”输入覆盖层（屏上数字键盘，不依赖系统键盘）
    pageJumpActive: false, // 覆盖层是否打开
    pageJumpText: '',      // 已输入的页码（字符串，1 起）
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
        self._boardPanned = false;
        // 双指（捏合缩放）起点记录
        if (e.touches && e.touches.length >= 2) {
          var t2 = e.touches[1];
          self._pinch = {
            dist: Math.hypot(t2.clientX - t.clientX, t2.clientY - t.clientY),
          };
        } else {
          self._pinch = null;
        }
        var hit = self.hitButton(t.clientX, t.clientY);
        self.pressedId = hit ? hit : null;
      });
      wx.onTouchMove && wx.onTouchMove(function (e) {
        var t = e.touches && e.touches[0];
        if (!t || !self._touchStart) return;
        var game = self.page === 'game' ? self.game : null;

        // ── 游戏页（大地图关 / 可缩放关）：双指捏合缩放 ──
        if (game && game.cam && (game.cfg.viewport || game.cfg.zoomable) && e.touches && e.touches.length >= 2) {
          var t2 = e.touches[1];
          var dist = Math.hypot(t2.clientX - t.clientX, t2.clientY - t.clientY);
          if (self._pinch && self._pinch.dist > 0) {
            var mid = self.toDesign((t.clientX + t2.clientX) / 2, (t.clientY + t2.clientY) / 2);
            game.zoomAt(mid.x, mid.y, dist / self._pinch.dist);
            self._pinch.dist = dist;
            self._boardPanned = true; // 捏合后不算点击
            self.pressedId = null;
          }
          return;
        }

        // ── 游戏页（大地图关 / 可缩放关）：单指拖拽平移棋盘 ──
        if (game && game.cam && (game.cfg.viewport || game.cfg.zoomable)) {
          var gdx = (t.clientX - self._touchStart.x) / self.scale;
          var gdy = (t.clientY - self._touchStart.y) / self.scale;
          if (gdx * gdx + gdy * gdy > 64) { // 超过 8 设计像素视为拖拽
            self._boardPanned = true;
            self.pressedId = null;
            game.panBy(gdx - (self._lastPanDx || 0), gdy - (self._lastPanDy || 0));
            self._lastPanDx = gdx; self._lastPanDy = gdy;
          }
          return;
        }

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
            // 动画中禁止拖拽（等动画结束；特殊关用 specialPageAnim）
            var animBusy = (self.levelCategory === 'special')
              ? (self.specialPageAnim > 0 && self.specialPageAnim < 1)
              : (self.levelPageAnim > 0 && self.levelPageAnim < 1);
            if (!animBusy) {
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
        self._pinch = null;
        self._lastPanDx = 0; self._lastPanDy = 0;

        // 棋盘拖拽/捏合过 → 本次不算点击
        if (self._boardPanned) { self._boardPanned = false; return; }

        // 选关 / 特殊关界面：水平拖拽结束 → 判定翻页
        if ((self.page === 'levels' || self.page === 'specials' || self.page === 'stacks') && self._levelDragging) {
          var dragX = self._levelDragX;
          self._levelDragging = false;
          // 拖满 60 设计像素才翻页，否则平滑回弹到原页
          if (Math.abs(dragX) > 60) {
            self._levelDragX = 0;
            var isSp = self.levelCategory === 'special';
            GameGlobal.UI.onAction(dragX < 0 ? (isSp ? 'specials_next' : 'levels_next') : (isSp ? 'specials_prev' : 'levels_prev'));
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
      // “跳转页码”输入覆盖层打开时：仅响应键盘按钮（pj_ 开头），其余点击忽略，避免误触底层
      if (this.pageJumpActive) {
        var pjb = this.hitButton(cx, cy);
        if (pjb && pjb.indexOf('pj_') === 0) GameGlobal.UI.onAction(pjb);
        return;
      }

      // 按钮优先（最上层）
      var btn = this.hitButton(cx, cy);
      if (btn) {
        GameGlobal.UI.onAction(btn);
        return;
      }
      // 入场镜头播放中：点棋盘任意处跳过镜头（本次不选卡）
      if (this.page === 'game' && this.game && this.game._introOn) {
        this.game.skipIntro();
        return;
      }
      // 卡片
      if (this.page === 'game' && this.game) {
        if (this.game.isStack) {
          var tile = this.game.hitTest(d.x, d.y);
          if (tile) this.game.onTapTile(tile);
        } else {
          // 移动卡（mover）优先命中：浮动在最上层（hitTestMover 返回命中的那张 mover）
          var mv = this.game.hitTestMover(d.x, d.y);
          if (mv) {
            this.game.onTapMover(mv);
            return;
          }
          var cell = this.game.hitTest(d.x, d.y);
          if (cell) this.game.onTapCard(cell.r, cell.c);
        }
      }
    },

    buttonPressed: function (id) {
      return this.pressedId === id;
    },

    // ── 提示 ────────────────────────────────────

    showToast: function (text) {
      this.toast = { text: text, until: Date.now() + 2000 };
    },

    /** 入场镜头结束回调（game._fireIntroDone 触发）：仅在游戏页把待弹的玩法说明弹出 */
    onIntroFinished: function () {
      if (this.page !== 'game') { this.pendingHelp = false; return; }
      if (this.pendingHelp) {
        this.helpPopupOpen = true;
        this.pendingHelp = false;
      }
    },

    /** 显示失败结算（game.onLose 调用：移动卡飞出屏幕） */
    showLose: function (levelId) {
      // 守卫：失败回调延迟弹出，若玩家已离开游戏页（返回/切关）则忽略
      if (this.page !== 'game') return;
      this.helpPopupOpen = false; // 失败时关闭玩法说明弹窗，避免覆盖结算面板
      this.loseData = { levelId: levelId };
      this.loseShownAt = Date.now();
      this.page = 'lose';
    },

    /** 显示胜利结算（game.onWin 调用） */
    showWin: function (levelId, moves, elapsed, coinsEarned) {
      // 守卫：胜利回调延迟弹出，若玩家已离开游戏页（返回/切关）则忽略
      if (this.page !== 'game') return;
      this.helpPopupOpen = false; // 通关时关闭玩法说明弹窗，避免覆盖结算面板
      this.winData = {
        levelId: levelId, moves: moves, elapsed: elapsed, coinsEarned: coinsEarned || 0,
        category: (this.game && this.game.cfg && this.game.cfg._category) || 'normal',
      };
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
      // 移动卡（mover）每帧驱动：仅游戏页内运行（离开游戏页自动停）
      if (this.page === 'game' && this.game && this.game.updateMover) {
        this.game.updateMover(dt);
      }
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
      case 'specials': r.renderLevelSelect(); break;
      case 'stacks': r.renderLevelSelect(); break;
      case 'specials_hub': r.renderSpecialHub(); break;
        case 'shop': r.renderShop(); break;
        case 'game': r.renderGame(); break;
        case 'win': r.renderWin(); break;
        case 'lose': r.renderLose(); break;
      }

      // 游戏内“玩法说明”弹窗（仅在游戏页且打开时绘制，覆盖在游戏画面上方）
      if (this.page === 'game' && this.helpPopupOpen) {
        r.renderHelpOverlay();
      }
      // 选关“跳转页码”输入覆盖层（数字键盘），覆盖在选关界面上方
      if (Main.pageJumpActive) {
        r.renderPageJump();
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
