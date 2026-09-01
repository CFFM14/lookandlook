// subpkg_bgm/game.js —— 分包入口占位文件。
// 微信小游戏要求 subpackages 的 root 目录根必须有 game.js 作为入口，否则编译报
// “未找到 [...] 对应的 game.js 文件”。本分包只放 BGM 音频（bgm_gem_jam.mp3），
// 实际加载/播放逻辑在主包 js/audio.js 的 loadBgm() 内，这里无需任何代码。
