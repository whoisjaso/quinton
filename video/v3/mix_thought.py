# python3 mix_thought.py cues.json outdir : picture-computed sound for "One Thought". Loops: the tail fades to the
# same room tone the opening fades in from.
import json, subprocess, sys
import numpy as np

SR, FPS, LEN = 48000, 60, 30.0
N = int(LEN * SR)
A = "audio/"
F = lambda f: f / FPS
C = json.load(open(sys.argv[1]))
out = sys.argv[2]


def load(p, a=None, b=None, rev=False):
    cmd = ["ffmpeg", "-v", "error"] + (["-ss", str(a)] if a is not None else []) + (["-t", str(b - (a or 0))] if b is not None else [])
    cmd += ["-i", p, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"]
    x = np.frombuffer(subprocess.run(cmd, capture_output=True).stdout, np.float32).reshape(-1, 2).copy()
    if rev:
        x = x[::-1].copy()
    k = min(len(x), int(0.02 * SR))
    x[-k:] *= np.linspace(1, 0, k)[:, None]
    return x


def peak(x):
    m = np.abs(x).mean(1)
    w = int(SR * 0.004)
    return int(np.argmax(np.convolve(m, np.ones(w) / w, "same")))


fx = np.zeros((N, 2), np.float32)


def place(x, t, g, align="peak"):
    st = int(t * SR) - (peak(x) if align == "peak" else 0)
    a, b = max(0, st), min(N, st + len(x))
    if b > a:
        fx[a:b] += x[a - st : b - st] * 10 ** (g / 20)


# room tone: fades in from nothing at frame 0 and back to nothing at the loop point
room = load(A + "room-cathedral-mantova.mp3", 8, 8 + LEN)
env = np.ones(len(room))
k = int(1.0 * SR)
env[:k] = np.linspace(0, 1, k)
env[-k:] = np.linspace(1, 0, k)
fz = int(F(C["freeze"]) * SR)
env[fz : fz + int(0.08 * SR)] *= np.linspace(1, 0.35, int(0.08 * SR))  # the room holds its breath on the freeze
env[fz + int(0.08 * SR) : int(F(C["drop"]) * SR)] *= 0.35
place(room * env[:, None], 0, -19, "start")

# inside the head: ticks and a heartbeat accelerating together, a glint for every new worry
tick = load(A + "clock-tick-single.mp3")
for i, t in enumerate(C["ticks"]):
    place(tick, F(t), -7 + min(6, i * 0.12))
kick = load(A + "heartbeat-sub-kick.mp3")
for i, b in enumerate(C["beats"]):
    gl = -11 + min(5, i * 0.4)
    place(kick, F(b), gl)
    place(kick, F(b + 11), gl - 5)  # lub-dub
glint = load(A + "shimmer-tick.mp3")
for t in C["thoughts"]:
    place(glint, F(t), -24)

# the freeze: one heartbeat under each rehook line
for t in C["rehook"]:
    place(kick, F(t), -7)
    place(kick, F(t + 11), -12)

# the turn: silence while the worries fold into the dot, then one hit
place(load(A + "orch-hit-a.mp3"), F(C["drop"]) + 0.01, 2)
place(load(A + "sub-rumble-drop.mp3", 0.35), F(C["drop"]) - 0.01, -4, "start")

# the future arrives on the phone
for t in C["notif"]:
    place(load(A + "msg-receive.mp3"), F(t + 2), -8)
for t in C["text"]:
    place(load(A + "msg-notif-4.mp3"), F(t + 2), -16)
wh = load(A + "whoosh-cinematic-jw.mp3")
place(wh, F(846), -22)
place(wh, F(1132), -22)
place(wh, F(1258), -24)

# what he does: a glass glint per word, the riser lands on the last
sg = load(A + "shimmer-glass.mp3", 0, 2.0)
for t in C["words"]:
    place(sg, F(t), -18)
place(load(A + "strings-riser-impact.mp3"), F(C["peak"]), -9)

# the name
place(load(A + "luxury-runway-shimmer.mp3"), F(C["name"]), -6)
place(load(A + "piano-boom-g3.mp3"), F(C["name"]) + 0.02, -3)

# music arrives only with relief: "Staring at the Night Sky" from its strongest downbeat on the turn
mus = np.zeros((N, 2), np.float32)
d0 = int(F(C["drop"]) * SR)
body = load(A + "music-staring-at-the-night-sky.mp3", 79.75, 79.75 + LEN - F(C["drop"]))
mus[d0 : d0 + len(body)] = body[: N - d0]
g = np.ones(N, np.float32)
l0, l1 = int(F(C["lull"][0]) * SR), int(F(C["lull"][1]) * SR)
r = int(0.5 * SR)
g[l0 : l0 + r] = np.linspace(1, 0.45, r)
g[l0 + r : l1] = 0.45
g[l1 : l1 + r] = np.linspace(0.45, 1, r)
st = int(F(1700) * SR)
g[st : st + int(0.9 * SR)] = np.linspace(1, 0, int(0.9 * SR))
g[st + int(0.9 * SR) :] = 0
mus *= g[:, None]

for name, mix in [("thought-fx-only", fx), ("thought-mix", fx + mus * 10 ** (3 / 20))]:
    raw = f"{out}/{name}.f32"
    mix.astype(np.float32).tofile(raw)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", raw,
                    "-af", "highpass=f=28,loudnorm=I=-14:TP=-1.5:LRA=10", "-ar", "48000", f"{out}/{name}.wav"], check=True)
print("mixed")
