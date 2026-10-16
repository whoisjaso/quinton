# python3 mix.py cues.json outdir : music + SFX placed by measured peak on picture cue frames, -14 LUFS.
import json, subprocess, sys
import numpy as np

SR = 48000
FPS = 60
LEN = 25.0
N = int(LEN * SR)
A = "audio/"
F = lambda f: f / FPS

# "The Journey" (Mixkit, free license). Measured drop onset at 45.30 s; land it on the "Revenue" frame.
MUSIC = A + "music-the-journey.mp3"
DROP_IN_TRACK = 45.30


def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).copy()


def peak(x):
    m = np.abs(x).mean(1)
    w = int(SR * 0.004)
    return int(np.argmax(np.convolve(m, np.ones(w) / w, "same")))


C = json.load(open(sys.argv[1]))
out = sys.argv[2]

EV = []
for w in C["whoosh"]:
    EV.append((F(w), "sfx-1492.mp3", -17))  # slit opens: velocity peak
EV.append((F(C["drop"]) + 0.02, "sfx-788.mp3", -7))  # the drop
EV.append((F(792 + 19), "sfx-1143.mp3", -15))  # first colour scene
for s in C["shutter"]:
    EV.append((F(s), "sfx-1133.mp3", -9))  # photo report
EV.append((F(C["name"]) + 0.05, "sfx-2900.mp3", -11))  # the name

fx = np.zeros((N, 2), np.float32)
cache = {}
for t, f, g in EV:
    if f not in cache:
        x = load(A + f)
        cache[f] = (x, peak(x))
    x, pk = cache[f]
    st = int(t * SR) - pk
    a, b = max(0, st), min(N, st + len(x))
    if b > a:
        fx[a:b] += x[a - st : b - st] * 10 ** (g / 20)

start = DROP_IN_TRACK - F(C["drop"])
mus = load(MUSIC)[int(start * SR) : int(start * SR) + N]
env = np.ones(N, np.float32)
fade_in = int(0.4 * SR)
env[:fade_in] = np.linspace(0, 1, fade_in)
s0, s1 = int(F(C["silence"][0]) * SR), int(F(C["silence"][1]) * SR)  # the breath before the drop
ramp = int(0.05 * SR)
env[s0 - ramp : s0] = np.linspace(1, 0.06, ramp)
env[s0:s1] = 0.06
st = int(F(1290) * SR)  # the ending subtracts: music leaves as the name arrives
env[st : st + int(0.7 * SR)] = np.linspace(1, 0, int(0.7 * SR))
env[st + int(0.7 * SR) :] = 0
mus *= env[:, None]

for name, mix in [("ad-fx-only", fx), ("ad-mix", fx + mus * 10 ** (-4 / 20))]:
    raw = f"{out}/{name}.f32"
    mix.astype(np.float32).tofile(raw)
    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", raw,
         "-af", "highpass=f=25,loudnorm=I=-14:TP=-1.5:LRA=7", "-ar", "48000", f"{out}/{name}.wav"],
        check=True,
    )
print("events", len(EV), "music offset", round(start, 3))
