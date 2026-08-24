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

      // 背景音乐（循环播放，音量压低不抢音效）
      try {
        var bgm = wx.createInnerAudioContext();
        bgm.src = 'audio/bgm_gem_jam.mp3';
        bgm.loop = true;
        bgm.volume = 0.45;
        this._ctxs['bgm'] = bgm;
        if (this._enabled) this.playBgm();
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

    /** 播放背景音乐（从暂停处继续） */
    playBgm: function () {
      var bgm = this._ctxs['bgm'];
      if (!bgm || !this._enabled) return;
      try {
        bgm.play();
      } catch (e) {
        // 忽略
      }
    },

    /** 暂停背景音乐 */
    stopBgm: function () {
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
