/**
 * storage.js —— 存档封装（wx.setStorageSync）
 * 保存：关卡解锁进度、每关最佳成绩（步数+用时）、音效开关
 */
(function () {
  'use strict';

  var KEY_UNLOCK = 'look_unlocked';
  var KEY_BEST_PREFIX = 'look_best_';
  var KEY_SOUND = 'look_sound';

  var Storage = {
    /** 读取已解锁的关卡数（至少 1，最多 TOTAL_LEVELS） */
    getUnlockedLevels: function () {
      try {
        var raw = wx.getStorageSync(KEY_UNLOCK);
        var val = raw ? parseInt(raw, 10) : 1;
        if (isNaN(val)) val = 1;
        return Math.max(1, Math.min(val, GameGlobal.TOTAL_LEVELS));
      } catch (e) {
        return 1;
      }
    },

    /** 通关后解锁下一关 */
    unlockNextLevel: function (currentLevel) {
      var unlocked = this.getUnlockedLevels();
      if (currentLevel >= unlocked && currentLevel < GameGlobal.TOTAL_LEVELS) {
        wx.setStorageSync(KEY_UNLOCK, String(currentLevel + 1));
      }
    },

    /** 读取某关最佳成绩 {moves, elapsed} | null */
    getBestScore: function (levelId) {
      try {
        var raw = wx.getStorageSync(KEY_BEST_PREFIX + levelId);
        return raw || null;
      } catch (e) {
        return null;
      }
    },

    /** 写入最佳成绩（更少步数或同步数更短用时才更新） */
    setBestScore: function (levelId, moves, elapsed) {
      var prev = this.getBestScore(levelId);
      if (prev && (prev.moves < moves || (prev.moves === moves && prev.elapsed <= elapsed))) {
        return;
      }
      wx.setStorageSync(KEY_BEST_PREFIX + levelId, { moves: moves, elapsed: elapsed });
    },

    /** 音效开关 */
    getSoundOn: function () {
      try {
        var v = wx.getStorageSync(KEY_SOUND);
        return v === undefined || v === null || v === '' ? true : !!v;
      } catch (e) {
        return true;
      }
    },

    setSoundOn: function (on) {
      wx.setStorageSync(KEY_SOUND, !!on);
    },
  };

  GameGlobal.Storage = Storage;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
  }
})();
