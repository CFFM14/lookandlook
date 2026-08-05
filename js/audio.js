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

      var names = ['elim', 'thaw', 'click', 'fail', 'bomb', 'win'];
      for (var i = 0; i < names.length; i++) {
        var name = names[i];
        try {
          var ctx = wx.createInnerAudioContext();
          ctx.src = 'audio/' + name + '.wav';
          // 提前解码，减少首次播放延迟
          ctx.volume = 1;
          this._ctxs[name] = ctx;
        } catch (e) {
          this._ctxs[name] = null;
        }
      }
    },

    isEnabled: function () {
      return this._enabled;
    },

    setEnabled: function (on) {
      this._enabled = !!on;
      GameGlobal.Storage.setSoundOn(this._enabled);
    },

    /** 播放音效：'elim'|'thaw'|'click'|'fail'|'bomb'|'win' */
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
