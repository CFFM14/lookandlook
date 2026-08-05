# -*- coding: utf-8 -*-
"""
素材压缩脚本：从 Cocos 项目 assets 复制素材到微信小游戏 images/ 目录，并压缩以控制主包体积（<4MB）。

- 背景(1440x2560) -> JPEG 780x1400 q85（照片风，无透明）
- 水果卡(500x500) -> PNG 220x220（保留 alpha）
- 按钮(500x500)  -> PNG 200x200（保留 alpha）
- 标题(612x408)  -> PNG 等比缩放到宽 ~380
- 结算(500x500)  -> PNG 280x280

源文件名超长且含全角逗号，使用 glob + 关键词匹配定位。
"""
import glob
import os
from PIL import Image

SRC_BASE = r"E:\学校资料\大一下学期（2026.3-2026.7）\Project_all\Cocos学习项目\Look_and_Look\assets"
DST_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "images")
DST_DIR = os.path.abspath(DST_DIR)

os.makedirs(DST_DIR, exist_ok=True)

# (目录, 匹配关键词列表(按优先级), 目标名, 目标尺寸, 格式, 附加参数)
# 规则按顺序匹配，第一个命中的生效；每轮匹配后跳过已用的文件
RULES = [
    # background
    (("background",), ["去掉所有水果元素"], "bg_menu", (780, 1400), "JPEG", {"quality": 85}),
    (("background",), [], "bg_game", (780, 1400), "JPEG", {"quality": 85}),
    # fruit_photo 按固定顺序（与 FRUIT_NAMES 对应）
    (("fruit_photo",), ["柚子"], "fruit_01", (220, 220), "PNG", {}),
    (("fruit_photo",), ["桃子"], "fruit_02", (220, 220), "PNG", {}),
    (("fruit_photo",), ["梨子"], "fruit_03", (220, 220), "PNG", {}),
    (("fruit_photo",), ["橘子"], "fruit_04", (220, 220), "PNG", {}),
    (("fruit_photo",), ["紫葡萄"], "fruit_05", (220, 220), "PNG", {}),
    (("fruit_photo",), ["红苹果"], "fruit_06", (220, 220), "PNG", {}),
    (("fruit_photo",), ["草莓"], "fruit_07", (220, 220), "PNG", {}),
    (("fruit_photo",), ["菠萝"], "fruit_08", (220, 220), "PNG", {}),
    (("fruit_photo",), ["西瓜"], "fruit_09", (220, 220), "PNG", {}),
    (("fruit_photo",), ["青苹果"], "fruit_10", (220, 220), "PNG", {}),
    (("fruit_photo",), ["青葡萄"], "fruit_11", (220, 220), "PNG", {}),
    (("fruit_photo",), ["香蕉"], "fruit_12", (220, 220), "PNG", {}),
    # bottom（按优先级：炸弹/提示/连连看/卡片中间/水果/结算）
    (("bottom",), ["炸弹"], "btn_bomb", (200, 200), "PNG", {}),
    (("bottom",), ["提示"], "btn_hint", (200, 200), "PNG", {}),
    (("bottom",), ["连连看"], "title_game", (380, 380), "PNG", {}),
    (("bottom",), ["卡片中间"], "btn_shuffle", (200, 200), "PNG", {}),
    (("bottom",), ["水果"], "title_menu", (380, 380), "PNG", {}),
    (("bottom",), ["结算"], "panel_win", (280, 280), "PNG", {}),
]


def compress(src, dst, size, fmt, extra):
    im = Image.open(src)
    if fmt == "PNG":
        im = im.convert("RGBA")
    else:
        im = im.convert("RGB")
    im.thumbnail(size, Image.LANCZOS)
    if fmt == "PNG":
        im.save(dst, fmt, optimize=True, **extra)
    else:
        im.save(dst, fmt, **extra)


def main():
    used = set()
    total = 0
    print("=" * 70)
    for dirs, keywords, name, size, fmt, extra in RULES:
        files = []
        for d in dirs:
            files.extend(glob.glob(os.path.join(SRC_BASE, d, "*.png")))
        # 过滤已用文件
        candidates = [f for f in files if f not in used]
        chosen = None
        if keywords:
            for f in candidates:
                base = os.path.basename(f)
                if all(k in base for k in keywords):
                    chosen = f
                    break
        else:
            chosen = candidates[0] if candidates else None
        if chosen is None:
            print("[MISS] %-12s <- %s" % (name, "|".join(keywords) or "(fallback any)"))
            continue
        used.add(chosen)
        dst = os.path.join(DST_DIR, name + (".jpg" if fmt == "JPEG" else ".png"))
        compress(chosen, dst, size, fmt, extra)
        sz = os.path.getsize(dst)
        total += sz
        im = Image.open(dst)
        print("[OK]   %-12s <- %-40s  -> %dx%d  %6.1f KB" % (
            os.path.basename(dst), os.path.basename(chosen)[:38], im.width, im.height, sz / 1024))
    print("=" * 70)
    print("总素材体积: %.2f MB (限制 4MB)" % (total / 1024 / 1024))
    # 未匹配文件警告
    all_files = set()
    for d in ("background", "fruit_photo", "bottom"):
        all_files.update(glob.glob(os.path.join(SRC_BASE, d, "*.png")))
    left = all_files - used
    if left:
        print("警告：以下文件未匹配（可能是 meta 或多余素材）:")
        for f in sorted(left):
            print("   -", os.path.basename(f))


if __name__ == "__main__":
    main()
