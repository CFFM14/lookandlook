/**
 * ui.js —— 页面状态与按钮分发
 * 页面：menu（首页）/ levels（关卡选择）/ game（游戏）/ win（结算）/ shop（商店）
 */
(function () {
  'use strict';

  var UI = {
    /** 显示首页 */
    showMenu: function () {
      Main.page = 'menu';
      Main.game = null;
      Main.winData = null;
    },

    /** 显示关卡选择 */
    showLevelSelect: function () {
      Main.page = 'levels';
      Main.levelScrollY = 0;
      Main.game = null;
    },

    /** 显示商店 */
    showShop: function () {
      Main.page = 'shop';
      Main.game = null;
    },

    /** 进入某关 */
    startLevel: function (levelId) {
      var unlocked = GameGlobal.Storage.getUnlockedLevels();
      if (levelId > unlocked) {
        Main.showToast('请先通关前面的关卡');
        return;
      }
      Main.game = new GameGlobal.Game(levelId);
      Main.page = 'game';
      Main.winData = null;
    },

    /** 购买商品（id 以 buy_ 开头） */
    buyItem: function (itemId) {
      var items = GameGlobal.SHOP_ITEMS;
      for (var i = 0; i < items.length; i++) {
        if (items[i].id !== itemId) continue;
        var item = items[i];
        if (!GameGlobal.Storage.spendCoins(item.coins)) {
          Main.showToast('金币不足，先去通关赚金币吧');
          return;
        }
        GameGlobal.Storage.addTool(item.tool, item.amount);
        Main.showToast('购买成功：' + item.name);
        return;
      }
    },

    /** 全局按钮分发 */
    onAction: function (id) {
      switch (id) {
        case 'menu_start':
          // 从最新解锁的关卡开始（首次为第 1 关）
          UI.startLevel(GameGlobal.Storage.getUnlockedLevels());
          break;
        case 'menu_levels':
          UI.showLevelSelect();
          break;
        case 'menu_shop':
          UI.showShop();
          break;
        case 'menu_sound':
          Main.soundOn = !Main.soundOn;
          GameGlobal.SoundManager.setEnabled(Main.soundOn);
          Main.showToast(Main.soundOn ? '音效已开启' : '音效已关闭');
          break;
        case 'levels_back':
          UI.showMenu();
          break;
        case 'shop_back':
          UI.showMenu();
          break;
        case 'game_back':
          UI.showMenu();
          break;
        case 'win_home':
          UI.showMenu();
          break;
        case 'win_replay':
          if (Main.game) Main.game.restart();
          Main.page = 'game';
          break;
        case 'win_next':
          if (Main.winData) {
            var next = Main.winData.levelId + 1;
            if (next <= GameGlobal.TOTAL_LEVELS) {
              UI.startLevel(next);
            } else {
              UI.showMenu();
            }
          }
          break;
        default:
          // 商店购买
          if (id.indexOf('buy_') === 0) {
            UI.buyItem(id);
            break;
          }
          // 关卡选择
          if (id.indexOf('lv_') === 0) {
            var lv = parseInt(id.substring(3), 10);
            if (!isNaN(lv)) UI.startLevel(lv);
            break;
          }
          // 游戏内工具按钮
          if (Main.page === 'game' && Main.game) {
            var g = Main.game;
            switch (id) {
              case 'btn_hint': g.showHint(); break;
              case 'btn_shuffle': g.shuffleCards(); break;
              case 'btn_bomb': g.useBomb(); break;
            }
          }
          break;
      }
    },
  };

  GameGlobal.UI = UI;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = UI;
  }
})();
