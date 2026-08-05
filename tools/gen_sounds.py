# -*- coding: utf-8 -*-
"""
音效生成脚本：用 Python 标准库 wave + struct 生成 6 个 WAV 音效（44.1kHz / 16bit / mono）。
微信小游戏用 createInnerAudioContext 播放本地 WAV（比 wx.createWebAudioContext 兼容性更稳）。
参数复刻原版 Cocos 的 WebAudio 合成逻辑。
"""
import math
import os
import random
import struct
import wave

SR = 44100
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "audio")
os.makedirs(OUT_DIR, exist_ok=True)


def write_wav(path, samples):
    with wave.open(path, "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        frames = b"".join(struct.pack("<h", int(max(-1.0, min(1.0, s)) * 32767)) for s in samples)
        w.writeframes(frames)


def sine(freq, dur, amp=0.3):
    n = int(SR * dur)
    return [amp * math.sin(2 * math.pi * freq * i / SR) for i in range(n)]


def sweep(f0, f1, dur, amp=0.3, wave_type="sine"):
    """线性扫频 + 指数衰减（复刻原版消除音 1200->3000Hz）"""
    n = int(SR * dur)
    out = []
    for i in range(n):
        t = i / SR
        f = f0 + (f1 - f0) * (t / dur)
        phase = 2 * math.pi * (f0 * t + (f1 - f0) * t * t / (2 * dur))
        if wave_type == "sine":
            v = math.sin(phase)
        elif wave_type == "triangle":
            v = 2 / math.pi * math.asin(math.sin(phase))
        else:
            v = math.sin(phase)
        env = math.exp(-3 * t / dur) if dur > 0 else 0
        out.append(amp * v * env)
    return out


def noise_burst(dur, amp=0.3, decay=8.0):
    n = int(SR * dur)
    return [amp * (random.random() * 2 - 1) * math.exp(-decay * i / n) for i in range(n)]


def mix(*tracks, total=None):
    n = total or max(len(t) for t in tracks)
    out = [0.0] * n
    for t in tracks:
        for i, v in enumerate(t):
            if i < n:
                out[i] += v
    return out


def pad(track, start, total=None):
    """把 track 放到 start 偏移处"""
    n = total or (start + len(track))
    out = [0.0] * n
    for i, v in enumerate(track):
        out[start + i] = v
    return out


def gen_elim():
    """消除 bling：正弦扫频 1200->3000Hz 0.15s + 泛音 2400->5000Hz 0.1s（复刻原版）"""
    main = sweep(1200, 3000, 0.15, 0.25)
    overtone = sweep(2400, 5000, 0.10, 0.12)
    return mix(main, overtone)


def gen_thaw():
    """解冻冰裂：白噪声 8ms 爆破 + 2 段 2500Hz 短促音"""
    burst = noise_burst(0.008, 0.4, 6.0)
    crack1 = sweep(2500, 1400, 0.05, 0.25)
    crack2 = pad(sweep(2500, 1800, 0.05, 0.2), int(SR * 0.08))
    return mix(burst, crack1, crack2, total=int(SR * 0.35))


def gen_click():
    """按钮点击：600Hz 正弦 50ms 衰减"""
    return sweep(600, 500, 0.05, 0.2)


def gen_fail():
    """匹配失败：400->200Hz 正弦 0.2s 衰减"""
    return sweep(400, 200, 0.2, 0.25)


def gen_bomb():
    """炸弹：白噪声 80ms 爆破 + 150->50Hz 低频 0.4s"""
    boom = noise_burst(0.08, 0.5, 5.0)
    low = sweep(150, 50, 0.4, 0.35)
    return mix(boom, low, total=int(SR * 0.5))


def gen_win():
    """胜利：三角波 C5-E5-G5-C6 琶音 + 末音延音（复刻原版）"""
    notes = [523.25, 659.25, 783.99, 1046.50]  # C5 E5 G5 C6
    note_dur, gap = 0.12, 0.04
    tracks = []
    total = int(SR * (len(notes) * (note_dur + gap) + 0.55))
    for i, f in enumerate(notes):
        t = int(SR * i * (note_dur + gap))
        n = int(SR * note_dur)
        amp = 0.3
        tr = [amp * (2 / math.pi) * math.asin(math.sin(2 * math.pi * f * k / SR)) *
              min(1, k / max(1, int(SR * 0.02))) * math.exp(-3 * k / n) for k in range(n)]
        tracks.append(pad(tr, t, total))
    # 末音延音 C6
    t2 = int(SR * (len(notes) * (note_dur + gap)))
    n2 = int(SR * 0.5)
    tr2 = [0.4 * (2 / math.pi) * math.asin(math.sin(2 * math.pi * 1046.50 * k / SR)) *
           math.exp(-3 * k / n2) for k in range(n2)]
    tracks.append(pad(tr2, t2, total))
    return mix(*tracks)


SOUNDS = {
    "elim.wav": gen_elim,
    "thaw.wav": gen_thaw,
    "click.wav": gen_click,
    "fail.wav": gen_fail,
    "bomb.wav": gen_bomb,
    "win.wav": gen_win,
}


def main():
    total = 0
    print("=" * 50)
    for name, fn in SOUNDS.items():
        path = os.path.join(OUT_DIR, name)
        write_wav(path, fn())
        sz = os.path.getsize(path)
        total += sz
        print("[OK] %-10s %6.1f KB" % (name, sz / 1024))
    print("=" * 50)
    print("音效总大小: %.2f KB" % (total / 1024))


if __name__ == "__main__":
    main()
