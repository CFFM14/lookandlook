# -*- coding: utf-8 -*-
"""
regen_fruit.py —— 用 Cocos 工程里的高清水果源(500x500 RGBA) 重生成游戏内水果卡。
目标：消除"水果关整局朦胧"——旧卡是 128/220px 低清，现统一重生成 500x500 调色板 PNG，
风格与 veg_01~12 一致（调色板量化、保留透明），保证真机清晰且主包 < 4MB。

源：Cocos 工程 assets/fruit_photo/<水果>.png  (全 500x500 RGBA)
输出：images/fruit_01~12.png  (500x500, P 模式, 保留 alpha)
"""
import os
from PIL import Image

SRC_DIR = r"E:\学校资料\大一下学期（2026.3-2026.7）\Project_all\Cocos学习项目\Look_and_Look\assets\fruit_photo"
DST_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "images"))

# 与 config.js FRUIT_NAMES + compress_images.py 的对应关系一致
MAP = [
    ("柚子", "fruit_01"), ("桃子", "fruit_02"), ("梨子", "fruit_03"),
    ("橘子", "fruit_04"), ("紫葡萄", "fruit_05"), ("红苹果", "fruit_06"),
    ("草莓", "fruit_07"), ("菠萝", "fruit_08"), ("西瓜", "fruit_09"),
    ("青苹果", "fruit_10"), ("青葡萄", "fruit_11"), ("香蕉", "fruit_12"),
]

TARGET = (500, 500)  # 与 veg 卡一致，保证最大清晰度

def regen():
    total = 0
    print("=" * 64)
    for kw, name in MAP:
        src = None
        for f in os.listdir(SRC_DIR):
            if f.endswith(".png") and kw in f:
                src = os.path.join(SRC_DIR, f)
                break
        if not src:
            print("[MISS] %-10s 未找到含 '%s' 的源图" % (name, kw))
            continue
        im = Image.open(src).convert("RGBA")
        if im.size[0] != TARGET[0] or im.size[1] != TARGET[1]:
            im = im.resize(TARGET, Image.LANCZOS)
        # 调色板量化（保留透明），与 veg 卡同款做法
        p = im.quantize(colors=255, method=Image.FASTOCTREE, dither=Image.NONE)
        dst = os.path.join(DST_DIR, name + ".png")
        p.save(dst, "PNG", optimize=True)
        sz = os.path.getsize(dst)
        total += sz
        # 校验：转回 RGBA 检查透明是否保留
        chk = p.convert("RGBA")
        print("[OK]   %-10s <- %-12s -> 500x500 P  %6.1f KB  alpha保留=%s" % (
            name, os.path.basename(src), sz / 1024, chk.getextrema()[3][0] < 255))
    print("=" * 64)
    print("水果卡总体积: %.2f MB（主包仍 < 4MB）" % (total / 1024 / 1024))

if __name__ == "__main__":
    regen()
