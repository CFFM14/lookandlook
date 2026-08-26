/**
 * storage.js —— 存档封装（wx.setStorageSync）
 * 保存：关卡解锁进度、每关最佳成绩（步数+用时）、音效开关、金币、工具库存
 */
(function () {
  'use strict';

  var KEY_UNLOCK = 'look_unlocked';
  var KEY_UNLOCK_SPECIAL = 'look_unlocked_special';
  var KEY_BEST_PREFIX = 'look_best_';
  var KEY_SOUND = 'look_sound';
  var KEY_COINS = 'look_coins';
  var KEY_TOOLS = 'look_tools';
  var KEY_HELP_SEEN_PREFIX = 'look_help_';

  // ╔══════════════════════════════════════════════════════════╗
  // ║ 测试开关：true = 所有关卡直接解锁（方便测试，进任意关）    ║
  // ║ 正式发布 / 交作业前请改回 false，否则会跳过正常解锁进度！  ║
  // ╚══════════════════════════════════════════════════════════╝
  var UNLOCK_ALL_FOR_TEST = true; // ⚠️ 测试期临时全解锁（测完 25/26 关请改回 false 再发布）

  var Storage = {
    /** 读取已解锁的关卡数（至少 1，最多 TOTAL_LEVELS） */
    getUnlockedLevels: function () {
      if (UNLOCK_ALL_FOR_TEST) return GameGlobal.TOTAL_LEVELS; // 测试期：全解锁
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

    /** 读取已解锁的特殊关卡数（至少 1，最多 TOTAL_SPECIAL）；与普通过独立存档 */
    getUnlockedSpecial: function () {
      if (UNLOCK_ALL_FOR_TEST) return GameGlobal.TOTAL_SPECIAL; // 测试期：全解锁
      try {
        var raw = wx.getStorageSync(KEY_UNLOCK_SPECIAL);
        var val = raw ? parseInt(raw, 10) : 1;
        if (isNaN(val)) val = 1;
        return Math.max(1, Math.min(val, GameGlobal.TOTAL_SPECIAL));
      } catch (e) {
        return 1;
      }
    },

    /** 通关特殊关后解锁下一个特殊关（顺序解锁） */
    unlockNextSpecial: function (currentLevel) {
      var unlocked = this.getUnlockedSpecial();
      if (currentLevel >= unlocked && currentLevel < GameGlobal.TOTAL_SPECIAL) {
        wx.setStorageSync(KEY_UNLOCK_SPECIAL, String(currentLevel + 1));
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

    /** 该关是否首次通关（无最佳成绩 = 首通） */
    isFirstClear: function (levelId) {
      return this.getBestScore(levelId) === null;
    },

    // ══════════════════════════════════════════════
    //  金币
    // ══════════════════════════════════════════════

    getCoins: function () {
      try {
        var v = parseInt(wx.getStorageSync(KEY_COINS), 10);
        return isNaN(v) ? 0 : Math.max(0, v);
      } catch (e) {
        return 0;
      }
    },

    addCoins: function (n) {
      if (n <= 0) return;
      wx.setStorageSync(KEY_COINS, String(this.getCoins() + n));
    },

    /** 尝试消费金币，成功返回 true */
    spendCoins: function (n) {
      var coins = this.getCoins();
      if (coins < n) return false;
      wx.setStorageSync(KEY_COINS, String(coins - n));
      return true;
    },

    // ══════════════════════════════════════════════
    //  工具库存（hint/shuffle/bomb 使用次数）
    // ══════════════════════════════════════════════

    /** 读取库存 {hint, shuffle, bomb}，缺失项补默认初始次数 */
    getTools: function () {
      var def = GameGlobal.TOOLS_DEFAULT || { hint: 3, shuffle: 2, bomb: 1 };
      var tools = null;
      try {
        var raw = wx.getStorageSync(KEY_TOOLS);
        if (raw && typeof raw === 'object') tools = raw;
      } catch (e) {
        tools = null;
      }
      var out = {};
      for (var name in def) {
        if (!def.hasOwnProperty(name)) continue;
        var v = tools ? parseInt(tools[name], 10) : NaN;
        out[name] = isNaN(v) ? def[name] : Math.max(0, v);
      }
      return out;
    },

    /** 增加工具次数 */
    addTool: function (name, n) {
      var tools = this.getTools();
      tools[name] = (tools[name] || 0) + n;
      wx.setStorageSync(KEY_TOOLS, tools);
    },

    /** 尝试消耗一次工具，成功返回 true */
    useTool: function (name) {
      var tools = this.getTools();
      if ((tools[name] || 0) <= 0) return false;
      tools[name]--;
      wx.setStorageSync(KEY_TOOLS, tools);
      return true;
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

    /** 该关的“玩法说明”是否已在首次进入时弹出过（看过即不再自动弹） */
    isHelpSeen: function (levelId) {
      try {
        return !!wx.getStorageSync(KEY_HELP_SEEN_PREFIX + levelId);
      } catch (e) {
        return false;
      }
    },

    /** 标记该关的“玩法说明”已弹出过（看过） */
    markHelpSeen: function (levelId) {
      try {
        wx.setStorageSync(KEY_HELP_SEEN_PREFIX + levelId, 1);
      } catch (e) {}
    },
  };

  GameGlobal.Storage = Storage;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
  }
})();
