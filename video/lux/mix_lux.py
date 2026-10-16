# python3 mix_lux.py outdir : picture-computed sound for "The First Room" (cues mirror window.CUE_LIST in lux.html)
import subprocess, sys
import numpy as np

SR, FPS, LEN = 48000, 60, 28.0
N = int(LEN * SR)
A = "audio/"
F = lambda f: f / FPS
out = sys.argv[1]

C = dict(seams=[248, 338, 438, 798, 868, 938, 1008, 1098, 1278], doorOpen=70, doorClose=1500, slam=426,
         toms=[546, 586, 626], drop=690, silence=[672, 690], shutter=1040, peak=1378, name=1530,
         crystal=112, glass=[806, 876, 946], stop=1488)


def load(p, a=None, b=None):
    cmd = ["ffmpeg", "-v", "error"]
    if a is not None:
        cmd += ["-ss", str(a)]
    if b is not None:
        cmd += ["-t", str(b - (a or 0))]
    cmd += ["-i", p, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"]
    x = np.frombuffer(subprocess.run(cmd, capture_output=True).stdout, np.float32).reshape(-1, 2).copy()
    fade = min(len(x), int(0.03 * SR))
    x[-fade:] *= np.linspace(1, 0, fade)[:, None]
    return x


def peak(x):
    m = np.abs(x).mean(1)
    w = int(SR * 0.004)
    return int(np.argmax(np.convolve(m, np.ones(w) / w, "same")))


bus = np.zeros((N, 2), np.float32)


def place(x, t, gain_db, align="peak"):
    """put clip x so that its peak (or its start) lands at time t"""
    off = peak(x) if align == "peak" else 0
    st = int(t * SR) - off
    a, b = max(0, st), min(N, st + len(x))
    if b > a:
        bus[a:b] += x[a - st : b - st] * 10 ** (gain_db / 20)


# the hall: room tone and footsteps on marble under the walk-in
room = load(A + "room-cathedral-mantova.mp3", 10, 40)
env = np.ones(len(room))
env[: int(1.2 * SR)] = np.linspace(0, 1, int(1.2 * SR))
room *= env[:, None]
place(room[: int(11.3 * SR)], 0, -20, "start")
place(room[int(12 * SR) : int(15.4 * SR)], F(1092), -24, "start")  # under the lull
place(room[int(16 * SR) : int(19 * SR)], F(1500), -22, "start")  # behind the closed doors
steps = load(A + "steps-cathedral.mp3")
s_env = np.ones(len(steps))
s_env[int(1.6 * SR) :] = np.linspace(1, 0, len(steps) - int(1.6 * SR)) ** 1.5
place(steps * s_env[:, None], 0.05, -13, "start")

# the doors open; a chandelier answers
place(load(A + "door-open-medieval.mp3", 0.0, 3.8), F(C["doorOpen"]) - 0.25, -9, "start")
place(load(A + "crystal-lamp-swing.mp3"), F(C["crystal"]), -15)

# every seam: a soft cinematic pass with a breath of glass
wh = load(A + "whoosh-cinematic-jw.mp3")
sg = load(A + "shimmer-glass.mp3", 0, 2.5)
for s in C["seams"]:
    place(wh, F(s + 12), -21)
    place(sg, F(s + 6), -27)

# pain: the gold drains, a door slams down a long hall, toms on each failing
place(load(A + "door-slam-reverberant.mp3"), F(C["slam"] + 10), -11)
toms = load(A + "orch-toms.mp3", 0, 2.4)
for t in C["toms"]:
    place(toms, F(t), -13)

# the turn: sub rising into one orchestral hit
place(load(A + "sub-rumble-drop.mp3", 0.35), F(C["drop"]) - 0.01, -3, "start")
place(load(A + "orch-hit-a.mp3"), F(C["drop"]) + 0.01, -2)

# proof: a champagne ding per claim, a shutter on the report
ding = load(A + "glass-toast.mp3", 0, 0.9)
for g in C["glass"]:
    place(ding, F(g), -19)
place(load(A + "camera-shutter-mixkit.mp3"), F(C["shutter"]), -12)

# the lull carries a strings riser that lands on the biggest frame
place(load(A + "strings-riser-impact.mp3"), F(C["peak"]), -9)

# the doors close; the name gets one soft note
place(load(A + "door-close-big-hall.mp3"), F(C["doorClose"]), 8)
place(load(A + "luxury-runway-shimmer.mp3"), F(C["name"]), -4)
place(load(A + "piano-boom-g3.mp3"), F(C["name"]) + 0.02, -2)

fx = bus.copy()

# music: "Staring at the Night Sky" (Mixkit). Opening as written, then an edit under the silence
# into its strongest downbeat (79.75 s) on the turn. Ducked through the lull, stops as the doors shut.
mus = np.zeros((N, 2), np.float32)
intro = load(A + "music-staring-at-the-night-sky.mp3", 0, F(C["silence"][1]))
mus[: len(intro)] = intro[:N]
body = load(A + "music-staring-at-the-night-sky.mp3", 79.75, 79.75 + LEN - F(C["drop"]))
d0 = int(F(C["drop"]) * SR)
mus[d0 : d0 + len(body)] = body[: N - d0]
g = np.ones(N, np.float32)
g[: int(0.6 * SR)] = np.linspace(0, 1, int(0.6 * SR))
s0, s1 = int(F(C["silence"][0]) * SR), int(F(C["silence"][1]) * SR)
g[s0 - int(0.06 * SR) : s0] = np.linspace(1, 0.03, int(0.06 * SR))
g[s0:s1] = 0.03
l0, l1 = int(F(1100) * SR), int(F(1290) * SR)
g[l0 : l0 + int(0.5 * SR)] = np.linspace(1, 0.42, int(0.5 * SR))
g[l0 + int(0.5 * SR) : l1] = 0.42
g[l1 : l1 + int(0.4 * SR)] = np.linspace(0.42, 1, int(0.4 * SR))
st = int(F(C["stop"]) * SR)
g[st : st + int(0.12 * SR)] = np.linspace(1, 0, int(0.12 * SR))
g[st + int(0.12 * SR) :] = 0
mus *= g[:, None]

for name, mix in [("lux-fx-only", fx), ("lux-mix", fx + mus * 10 ** (-3 / 20))]:
    raw = f"{out}/{name}.f32"
    mix.astype(np.float32).tofile(raw)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", raw,
                    "-af", "highpass=f=28,loudnorm=I=-14:TP=-1.5:LRA=9", "-ar", "48000", f"{out}/{name}.wav"], check=True)
print("mixed")
