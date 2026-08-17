"""
gen_icon.py —— 生成微信小游戏游戏图标
  输出 images/icon.png（144x144，后台上传用）+ images/icon.webp（同款，更小）
  风格：暖黄渐变圆角背景 + 2x2 水果 + 一条金色配对连线，呼应游戏内的连连看配对消除
"""
from PIL import Image, ImageDraw

BASE = r"E:\学校资料\大一下学期（2026.3-2026.7）\Project_all\倒水游戏合集\抄抄抄\look"
SIZE = 144

# 颜色（与游戏 UI 主题一致）
C_BG_TOP = (255, 233, 168)     # #FFE9A8
C_BG_BOT = (245, 194, 107)     # #F5C26B
C_BORDER = (232, 179, 75)      # #E8B34B
C_LINK = (245, 166, 35)        # #F5A623
C_LINK_GLOW = (255, 220, 140, 90)
C_TITLE = (139, 90, 43)        # #8B5A2B

# 选 4 种水果（左上/右上/左下/右下），下标对应 config.js 的 FRUIT_NAMES
# 0柚子 1桃子 2梨子 3橘子 4紫葡萄 5红苹果 6草莓 7菠萝 8西瓜 9青苹果 10青葡萄 11香蕉
PICKS = [
    (3, 'fruit_04.png'),   # 左上：橘子
    (5, 'fruit_06.png'),   # 右上：红苹果
    (8, 'fruit_09.png'),   # 左下：西瓜
    (7, 'fruit_08.png'),   # 右下：菠萝
]

def rounded_bg(size, radius):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    # 暖黄上下渐变
    grad = Image.new('RGB', (size, size))
    for y in range(size):
        t = y / (size - 1)
        r = int(C_BG_TOP[0] + (C_BG_BOT[0] - C_BG_TOP[0]) * t)
        g = int(C_BG_TOP[1] + (C_BG_BOT[1] - C_BG_TOP[1]) * t)
        b = int(C_BG_TOP[2] + (C_BG_BOT[2] - C_BG_TOP[2]) * t)
        for x in range(size):
            grad.putpixel((x, y), (r, g, b))
    mask = Image.new('L', (size, size), 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=255)
    img.paste(grad, (0, 0), mask)
    # 金色描边
    d2 = ImageDraw.Draw(img)
    d2.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, outline=C_BORDER, width=3)
    return img

def main():
    bg = rounded_bg(SIZE, 26)

    # 2x2 水果网格：单元格 56x56，间距 4，整体居中
    cell = 56
    gap = 4
    grid_w = cell * 2 + gap
    ox = (SIZE - grid_w) // 2
    oy = ox
    positions = [(ox, oy), (ox + cell + gap, oy), (ox, oy + cell + gap), (ox + cell + gap, oy + cell + gap)]

    for (idx, fname), pos in zip(PICKS, positions):
        src = Image.open(f"{BASE}\\images\\{fname}").convert('RGBA')
        src = src.resize((cell, cell), Image.LANCZOS)
        bg.alpha_composite(src, pos)

    # 金色配对连线（左上 ↔ 右下），加光晕层
    overlay = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    p1 = (positions[0][0] + cell // 2, positions[0][1] + cell // 2)
    p2 = (positions[3][0] + cell // 2, positions[3][1] + cell // 2)
    # 光晕（粗半透明）
    d.line([p1, p2], fill=C_LINK_GLOW, width=10)
    # 主连线
    d.line([p1, p2], fill=C_LINK, width=4)
    # 端点小球（"消除"光环）
    r = 7
    d.ellipse((p1[0] - r, p1[1] - r, p1[0] + r, p1[1] + r), outline=C_TITLE, width=2, fill=(255, 240, 200, 255))
    d.ellipse((p2[0] - r, p2[1] - r, p2[0] + r, p2[1] + r), outline=C_TITLE, width=2, fill=(255, 240, 200, 255))
    bg.alpha_composite(overlay)

    out_png = f"{BASE}\\images\\icon.png"
    out_webp = f"{BASE}\\images\\icon.webp"
    bg.convert('RGB').save(out_png, 'PNG', optimize=True)
    bg.save(out_webp, 'WEBP', quality=90, method=6)
    print(f"已生成 {out_png}")
    print(f"已生成 {out_webp}")

if __name__ == '__main__':
    main()