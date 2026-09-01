/**
 * audio.js —— 音效管理（createInnerAudioContext + 本地 WAV）
 * 比 wx.createWebAudioContext 兼容性更稳（基础库要求低）。
 */
(function () {
  'use strict';

  var SoundManager = {
    _ctxs: {},
    _enabled: true,
    _initialized: false,
    _bgmLoading: false,
    _bgmReady: false,
    _bgmWanted: false,

    init: function () {
      if (this._initialized) return;
      this._initialized = true;
      this._enabled = GameGlobal.Storage.getSoundOn();

      var names = ['elim', 'thaw', 'click', 'fail', 'bomb', 'win', 'select', 'coin', 'slide', 'sweep', 'hint'];
      for (var i = 0; i < names.length; i++) {
        var name = names[i];
        try {
          var ctx = wx.createInnerAudioContext();
          ctx.src = 'audio/' + name + '.mp3';
          // 提前解码，减少首次播放延迟
          ctx.volume = 1;
          this._ctxs[name] = ctx;
        } catch (e) {
          this._ctxs[name] = null;
        }
      }

      // 背景音乐在 subpkg_bgm/ 分包里，后台下载，下完自动播
      this._bgmWanted = this._enabled;
      this.loadBgm();
    },

    /**
     * 下载 BGM 分包（约 1.8MB）。失败也不影响游戏，只是没背景音乐。
     * 分包下好后若当前音效开关是开着的，会自动开始播放。
     */
    loadBgm: function () {
      var self = this;
      if (this._bgmReady || this._bgmLoading) return;
      if (typeof wx === 'undefined' || !wx.loadSubpackage) return;
      this._bgmLoading = true;
      try {
        var task = wx.loadSubpackage({
          name: 'bgm',
          success: function () {
            self._bgmLoading = false;
            self._bgmReady = true;
            self._createBgm();
            if (self._bgmWanted) self.playBgm();
          },
          fail: function (err) {
            self._bgmLoading = false;
            console.warn('[audio] BGM 分包加载失败，游戏不受影响', err);
          }
        });
        if (task && task.onProgressUpdate) {
          task.onProgressUpdate(function (res) {
            self._bgmProgress = res.progress;
          });
        }
      } catch (e) {
        this._bgmLoading = false;
      }
    },

    /** 分包就绪后创建 BGM 播放器（循环，音量压低不抢音效） */
    _createBgm: function () {
      try {
        var bgm = wx.createInnerAudioContext();
        bgm.src = 'subpkg_bgm/bgm_gem_jam.mp3';
        bgm.loop = true;
        bgm.volume = 0.45;
        this._ctxs['bgm'] = bgm;
      } catch (e) {
        this._ctxs['bgm'] = null;
      }
    },

    isEnabled: function () {
      return this._enabled;
    },

    setEnabled: function (on) {
      this._enabled = !!on;
      GameGlobal.Storage.setSoundOn(this._enabled);
      if (this._enabled) {
        this.playBgm();
      } else {
        this.stopBgm();
      }
    },

    /** 播放背景音乐（从暂停处继续）。分包没下好就先触发下载，下完自动播 */
    playBgm: function () {
      this._bgmWanted = true;
      var bgm = this._ctxs['bgm'];
      if (!bgm) {
        this.loadBgm();
        return;
      }
      if (!this._enabled) return;
      try {
        bgm.play();
      } catch (e) {
        // 忽略
      }
    },

    /** 暂停背景音乐 */
    stopBgm: function () {
      this._bgmWanted = false;
      var bgm = this._ctxs['bgm'];
      if (!bgm) return;
      try {
        if (bgm.pause) bgm.pause();
        else bgm.stop();
      } catch (e) {
        // 忽略
      }
    },

    /** 播放音效：'elim'|'thaw'|'click'|'fail'|'bomb'|'win'|'select'|'coin'|'slide'|'sweep'|'hint' */
    play: function (name) {
      if (!this._enabled) return;
      var ctx = this._ctxs[name];
      if (!ctx) return;
      try {
        // stop 后 play 会从头播放（部分基础库 stop 后 seek 会报错，故不调 seek）
        ctx.stop();
        ctx.play();
      } catch (e) {
        // 忽略
      }
    },
  };

  GameGlobal.SoundManager = SoundManager;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SoundManager;
  }
})();
