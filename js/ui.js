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

    /** 显示关卡选择（默认回到“正在解锁”的那一页 = 下一关所在页） */
    showLevelSelect: function () {
      Main.page = 'levels';
      Main.game = null;
      // 进入选关界面时，定位到当前解锁进度的那一页，而不是停留在上次手动翻到的页
      var perPage = GameGlobal.LEVELS_PER_PAGE;
      var unlocked = GameGlobal.Storage.getUnlockedLevels();
      var totalPages = Math.ceil(GameGlobal.TOTAL_LEVELS / perPage);
      var frontierPage = Math.floor(unlocked / perPage); // 0 起；下一关（unlocked+1）所在页
      if (frontierPage > totalPages - 1) frontierPage = totalPages - 1;
      if (frontierPage < 0) frontierPage = 0;
      Main.levelPage = frontierPage;
      Main.levelPageAnim = 0; // 清掉残留翻页动画，避免回到主页再进来时画面错位
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
      // 玩法说明弹窗：每次进入先关掉；若该关首次进入（未看过说明）则自动弹出并标记已看
      Main.helpPopupOpen = false;
      if (!GameGlobal.Storage.isHelpSeen(levelId)) {
        Main.helpPopupOpen = true;
        GameGlobal.Storage.markHelpSeen(levelId);
      }
    },

    /** 选关界面翻页：dir = 1 下一页 / -1 上一页（带动画） */
    flipLevelPage: function (dir) {
      var M = Main;
      if (M.page !== 'levels') return;
      // 动画进行中忽略连点，避免页面状态错乱
      if (M.levelPageAnim > 0 && M.levelPageAnim < 1) return;
      var perPage = GameGlobal.LEVELS_PER_PAGE;
      var totalPages = Math.ceil(GameGlobal.TOTAL_LEVELS / perPage);
      var target = M.levelPage + dir;
      if (target < 0 || target >= totalPages) return; // 边界页不响应

      M.levelPageFrom = M.levelPage;
      M.levelPageTo = target;
      M.levelPageDir = dir;
      M.levelPageAnim = 0.0001; // 触发动画
      GameGlobal.Tween.to(M, { levelPageAnim: 1 }, 300, 'easeInOut', function () {
        M.levelPage = M.levelPageTo;
        M.levelPageAnim = 0;
      });
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
        GameGlobal.SoundManager.play('coin');
        return;
      }
    },

    /** 全局按钮分发 */
    onAction: function (id) {
      // 按钮点击音（游戏内工具按钮有各自专属音效，不重复播）
      if (id.indexOf('btn_') !== 0 && id.indexOf('buy_') !== 0) {
        GameGlobal.SoundManager.play('click');
      }
      switch (id) {
        case 'menu_start':
          // 从最新解锁的关卡开始（首次为第 1 关）
          Main.gameFrom = 'menu'; // 主界面进入 → 游戏内"返回"回主界面
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
        case 'levels_prev':
          UI.flipLevelPage(-1);
          break;
        case 'levels_next':
          UI.flipLevelPage(1);
          break;
        case 'shop_back':
          UI.showMenu();
          break;
        case 'game_back':
          // 游戏内返回：主界面“开始游戏”进的 → 回主界面；选关界面进的 → 回选关界面
          Main.helpPopupOpen = false; // 离开关卡时关闭玩法说明弹窗
          if (Main.gameFrom === 'menu') UI.showMenu();
          else UI.showLevelSelect();
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
        case 'win_share':
          // 胜利后分享：必须在用户点击事件中调用，wx.shareAppMessage 才能正常触发
          if (Main.winData) {
            var wd = Main.winData;
            var title = '我 ' + wd.moves + ' 步通关"水果连连看"第' + wd.levelId + '关，速来挑战！';
            try {
              wx.shareAppMessage({ title: title });
            } catch (e) {
              Main.showToast('分享功能不可用');
            }
          }
          break;
        case 'btn_help':
          // 点击游戏内问号：打开本关玩法说明弹窗
          Main.helpPopupOpen = true;
          break;
        case 'help_close':
          // 关闭玩法说明弹窗
          Main.helpPopupOpen = false;
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
            if (!isNaN(lv)) {
              Main.gameFrom = 'levels'; // 选关界面进入 → 游戏内"返回"回选关界面
              UI.startLevel(lv);
            }
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
