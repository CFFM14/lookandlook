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

    /** 显示关卡选择（保留上次停留的页码，不强制跳到解锁进度页） */
    showLevelSelect: function () {
      Main.page = 'levels';
      Main.levelCategory = 'normal';
      Main.game = null;
      // 进入选关界面时保留上次所在的页（不再强制跳“正在解锁”的页，避免 UNLOCK_ALL 下每次都落到最后一页）
      if (Main.levelPage == null || Main.levelPage < 0) Main.levelPage = 0;
      Main.levelPageAnim = 0; // 清掉残留翻页动画，避免回到主页再进来时画面错位
    },

    /** 显示特殊关卡玩法 hub（主界面“特殊关卡”进入，列出各玩法入口：巨物关卡 / 趣味关卡） */
    showSpecialHub: function () {
      Main.page = 'specials_hub';
      Main.levelCategory = 'special';
      Main.specialSub = null;
      Main.game = null;
    },

    /** 显示完整特殊关列表（specialSub=null 即全部；hub 的巨物/趣味按钮切到子分类，这里作兜底） */
    showSpecialSelect: function () {
      Main.page = 'specials';
      Main.levelCategory = 'special';
      Main.specialSub = null; // 完整列表
      Main.game = null;
      // 与选关一致：保留上次停留的特殊关页码，不强制跳到末页
      if (Main.specialPage == null || Main.specialPage < 0) Main.specialPage = 0;
      Main.specialPageAnim = 0;
    },

    /** 显示商店 */
    showShop: function () {
      Main.page = 'shop';
      Main.game = null;
    },

    /** 进入某关（普通 / 特殊 共用；按配置 _category 自动判定解锁与“返回”去向） */
    startLevel: function (levelId) {
      var cfg = GameGlobal.getLevelConfig(levelId);
      var category = (cfg && cfg._category) || 'normal';
      if (category === 'stack') {
        var stidx = GameGlobal.getStackIndex(levelId);
        var unlockedSt = GameGlobal.Storage.getUnlockedStack();
        if (stidx < 0 || stidx >= unlockedSt) {
          Main.showToast('请先通关前面的层层消消');
          return;
        }
        // gameFrom 由调用方设置（specials_stack / sp_ → 'stack'），此处不再覆盖
      } else if (category === 'special') {
        var sidx = GameGlobal.getSpecialIndex(levelId);
        var unlockedSp = GameGlobal.Storage.getUnlockedSpecial();
        if (sidx < 0 || sidx >= unlockedSp) {
          Main.showToast('请先通关前面的特殊关卡');
          return;
        }
        // gameFrom 由调用方设置（hub_giant→'giant' / hub_fun→'fun' / 其它 sp_→'special'），此处不再覆盖
      } else {
        var unlocked = GameGlobal.Storage.getUnlockedLevels();
        if (levelId > unlocked) {
          Main.showToast('请先通关前面的关卡');
          return;
        }
        // gameFrom 由调用方设置（menu_start→'menu'，选关卡片→'levels'），此处不再覆盖
      }
      Main.game = (category === 'stack') ? new GameGlobal.StackGame(levelId) : new GameGlobal.Game(levelId);
      Main.page = 'game';
      Main.winData = null;
      Main.game.startIntro(); // 新玩法关：先全景后聚焦的入场镜头（旧关 cam=null 自动无操作）
      // 玩法说明弹窗：每次进入先关掉；若该关首次进入（未看过说明）则弹出并标记已看。
      // 有特殊入场镜头的关卡（cam 存在 = 25/26 关）延迟到镜头结束后再弹，避免遮挡入场动画；旧关立即弹。
      Main.helpPopupOpen = false;
      Main.pendingHelp = false;
      if (!GameGlobal.Storage.isHelpSeen(levelId)) {
        GameGlobal.Storage.markHelpSeen(levelId);
        if (Main.game.cam) {
          Main.pendingHelp = true; // 等入场镜头结束（onIntroFinished）再弹
        } else {
          Main.helpPopupOpen = true;
        }
      }
    },

    /** 选关 / 特殊关翻页：dir = 1 下一页 / -1 上一页（带动画，按 Main.levelCategory 切换命名空间） */
    flipLevelPage: function (dir) {
      var M = Main;
      var isSpecial = M.levelCategory === 'special';
      var isStack = M.levelCategory === 'stack';
      if ((isSpecial && M.page !== 'specials') || (isStack && M.page !== 'stacks') || (!isSpecial && !isStack && M.page !== 'levels')) return;
      // 动画进行中忽略连点，避免页面状态错乱
      if (isSpecial) {
        if (M.specialPageAnim > 0 && M.specialPageAnim < 1) return;
      } else if (isStack) {
        if (M.stackPageAnim > 0 && M.stackPageAnim < 1) return;
      } else {
        if (M.levelPageAnim > 0 && M.levelPageAnim < 1) return;
      }
      var perPage = GameGlobal.LEVELS_PER_PAGE;
      var sub = M.specialSub;
      var total = isStack ? GameGlobal.TOTAL_STACK
        : (sub === 'giant' ? GameGlobal.TOTAL_GIANT : (sub === 'fun' ? GameGlobal.TOTAL_FUN : (isSpecial ? GameGlobal.TOTAL_SPECIAL : GameGlobal.TOTAL_LEVELS)));
      var totalPages = Math.ceil(total / perPage);
      var cur = isStack ? M.stackPage : (isSpecial ? M.specialPage : M.levelPage);
      var target = cur + dir;
      if (target < 0 || target >= totalPages) return; // 边界页不响应

      if (isStack) {
        M.stackPageFrom = cur;
        M.stackPageTo = target;
        M.stackPageDir = dir;
        M.stackPageAnim = 0.0001; // 触发动画
        GameGlobal.Tween.to(M, { stackPageAnim: 1 }, 300, 'easeInOut', function () {
          M.stackPage = M.stackPageTo;
          M.stackPageAnim = 0;
        });
      } else if (isSpecial) {
        M.specialPageFrom = cur;
        M.specialPageTo = target;
        M.specialPageDir = dir;
        M.specialPageAnim = 0.0001; // 触发动画
        GameGlobal.Tween.to(M, { specialPageAnim: 1 }, 300, 'easeInOut', function () {
          M.specialPage = M.specialPageTo;
          M.specialPageAnim = 0;
        });
      } else {
        M.levelPageFrom = cur;
        M.levelPageTo = target;
        M.levelPageDir = dir;
        M.levelPageAnim = 0.0001; // 触发动画
        GameGlobal.Tween.to(M, { levelPageAnim: 1 }, 300, 'easeInOut', function () {
          M.levelPage = M.levelPageTo;
          M.levelPageAnim = 0;
        });
      }
    },

    /** 选关页码跳转：把输入的页码（1 起）落到对应页（0 起），越界自动夹取 */
    jumpToPage: function () {
      var M = Main;
      var isSpecial = M.levelCategory === 'special';
      var isStack = M.levelCategory === 'stack';
      var sub = M.specialSub;
      var total = isStack ? GameGlobal.TOTAL_STACK
        : (sub === 'giant' ? GameGlobal.TOTAL_GIANT : (sub === 'fun' ? GameGlobal.TOTAL_FUN : (isSpecial ? GameGlobal.TOTAL_SPECIAL : GameGlobal.TOTAL_LEVELS)));
      var totalPages = Math.ceil(total / GameGlobal.LEVELS_PER_PAGE);
      var txt = (M.pageJumpText || '').trim();
      M.pageJumpActive = false;
      M.pageJumpText = '';
      if (!txt) return;
      var p = parseInt(txt, 10);
      if (isNaN(p)) return;
      if (p < 1) p = 1;
      if (p > totalPages) p = totalPages;
      var target = p - 1;
      if (isStack) M.stackPage = target; else if (isSpecial) M.specialPage = target; else M.levelPage = target;
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
      // 选关“跳转页码”输入覆盖层
      if (id === 'levels_jump' || id === 'specials_jump' || id === 'stacks_jump') {
        Main.pageJumpActive = true;
        Main.pageJumpText = '';
        return;
      }
      if (id.indexOf('pj_') === 0) {
        var sub = id.slice(3);
        if (sub === 'ok') UI.jumpToPage();
        else if (sub === 'cancel') { Main.pageJumpActive = false; Main.pageJumpText = ''; }
        else if (sub === 'del') { Main.pageJumpText = Main.pageJumpText.slice(0, -1); }
        else if (sub.length === 1 && sub >= '0' && sub <= '9') {
          if (Main.pageJumpText.length < 3) Main.pageJumpText += sub; // 最多 3 位（<=999 页）
        }
        return;
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
        case 'menu_special':
          UI.showSpecialHub();
          break;
        case 'menu_shop':
          UI.showShop();
          break;
        case 'menu_sound':
          Main.soundOn = !Main.soundOn;
          GameGlobal.SoundManager.setEnabled(Main.soundOn);
          Main.showToast(Main.soundOn ? '音效已开启' : '音效已关闭');
          break;
        case 'hub_giant':
          // 进入“巨物关卡”选关界面（k=3 大棋盘子集）
          Main.page = 'specials';
          Main.levelCategory = 'special';
          Main.specialSub = 'giant';
          Main.specialPage = 0;
          Main.specialPageAnim = 0;
          break;
        case 'hub_fun':
          // 进入“趣味关卡”选关界面（k=1/2 普通尺寸子集）
          Main.page = 'specials';
          Main.levelCategory = 'special';
          Main.specialSub = 'fun';
          Main.specialPage = 0;
          Main.specialPageAnim = 0;
          break;
        case 'specials_stack':
          // 进入“层层消消”选关界面（立体堆叠层数限制玩法）
          Main.page = 'stacks';
          Main.levelCategory = 'stack';
          Main.stackPage = 0;
          Main.stackPageAnim = 0;
          break;
        case 'hub_back':
          UI.showMenu();
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
        case 'specials_back':
          // 子分类视图（巨物/趣味）下：返回玩法 hub；完整列表则回主界面
          if (Main.specialSub) UI.showSpecialHub();
          else UI.showMenu();
          break;
        case 'specials_prev':
          UI.flipLevelPage(-1);
          break;
        case 'specials_next':
          UI.flipLevelPage(1);
          break;
        case 'stacks_back':
          // 从层层消消选关界面返回玩法 hub
          UI.showSpecialHub();
          break;
        case 'stacks_prev':
          UI.flipLevelPage(-1);
          break;
        case 'stacks_next':
          UI.flipLevelPage(1);
          break;
        case 'shop_back':
          UI.showMenu();
          break;
        case 'game_back':
          // 游戏内返回：主界面“开始游戏”进的 → 回主界面；选关界面进的 → 回选关界面
          Main.helpPopupOpen = false; // 离开关卡时关闭玩法说明弹窗
          Main.pendingHelp = false;   // 一并清理：中途离场则不弹待弹说明
          if (Main.gameFrom === 'menu') UI.showMenu();
          else if (Main.gameFrom === 'giant') {
            // 从巨物关卡进的 → 回到巨物关卡选关界面
            Main.specialSub = 'giant';
            Main.page = 'specials';
            Main.levelCategory = 'special';
            Main.game = null;
          } else if (Main.gameFrom === 'fun') {
            // 从趣味关卡进的 → 回到趣味关卡选关界面
            Main.specialSub = 'fun';
            Main.page = 'specials';
            Main.levelCategory = 'special';
            Main.game = null;
          } else if (Main.gameFrom === 'stack') {
            // 从层层消消进的 → 回到层层消消选关界面
            Main.page = 'stacks';
            Main.levelCategory = 'stack';
            Main.game = null;
          } else if (Main.gameFrom === 'special') UI.showSpecialHub();
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
            if (Main.winData.category === 'stack') {
              // 层层消消：在 STACK_LEVELS 内顺序连关
              var stidx = GameGlobal.getStackIndex(Main.winData.levelId);
              if (stidx >= 0 && stidx < GameGlobal.STACK_LEVELS.length - 1) {
                UI.startLevel(GameGlobal.STACK_LEVELS[stidx + 1].id);
              } else {
                UI.showSpecialHub(); // 层层消消最后一关 → 回 hub
              }
            } else if (Main.winData.category === 'special') {
              if (Main.gameFrom === 'giant') {
                // 巨物关卡：在 GIANT_LEVELS 内顺序连关
                var gidx = -1;
                for (var gi = 0; gi < GameGlobal.GIANT_LEVELS.length; gi++) {
                  if (GameGlobal.GIANT_LEVELS[gi].id === Main.winData.levelId) { gidx = gi; break; }
                }
                if (gidx >= 0 && gidx < GameGlobal.GIANT_LEVELS.length - 1) {
                  Main.specialSub = 'giant';
                  UI.startLevel(GameGlobal.GIANT_LEVELS[gidx + 1].id);
                } else {
                  Main.specialSub = 'giant';
                  UI.showSpecialHub(); // 巨物最后一关 → 回 hub
                }
              } else if (Main.gameFrom === 'fun') {
                // 趣味关卡：在 FUN_LEVELS 内顺序连关
                var fidx = -1;
                for (var fi = 0; fi < GameGlobal.FUN_LEVELS.length; fi++) {
                  if (GameGlobal.FUN_LEVELS[fi].id === Main.winData.levelId) { fidx = fi; break; }
                }
                if (fidx >= 0 && fidx < GameGlobal.FUN_LEVELS.length - 1) {
                  Main.specialSub = 'fun';
                  UI.startLevel(GameGlobal.FUN_LEVELS[fidx + 1].id);
                } else {
                  Main.specialSub = 'fun';
                  UI.showSpecialHub(); // 趣味最后一关 → 回 hub
                }
              } else {
                // 特殊关（完整列表）：顺序解锁，下一关 = 同数组下一个
                var sidx = GameGlobal.getSpecialIndex(Main.winData.levelId);
                if (sidx >= 0 && sidx < GameGlobal.SPECIAL_LEVELS.length - 1) {
                  UI.startLevel(GameGlobal.SPECIAL_LEVELS[sidx + 1].id);
                } else {
                  UI.showMenu();
                }
              }
            } else {
              var next = Main.winData.levelId + 1;
              if (next <= GameGlobal.TOTAL_LEVELS) {
                UI.startLevel(next);
              } else {
                UI.showMenu();
              }
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
          // 关卡选择（普通 lv_ / 特殊 sp_ 共用；startLevel 按 _category 决定 gameFrom 与解锁）
          if (id.indexOf('lv_') === 0 || id.indexOf('sp_') === 0) {
            var lv = parseInt(id.substring(3), 10);
            if (!isNaN(lv)) {
              Main.gameFrom = (id.indexOf('sp_') === 0)
                ? (Main.levelCategory === 'stack' ? 'stack' : (Main.specialSub === 'giant' ? 'giant' : (Main.specialSub === 'fun' ? 'fun' : 'special')))
                : 'levels';
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
