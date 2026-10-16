# python3 mix_thread.py cues.json outdir : sound for "The Thread". Loops: everything is quiet at both ends.
import json, subprocess, sys
import numpy as np

SR, FPS, LEN = 48000, 60, 30.0
N = int(LEN * SR)
A = "audio/"
F = lambda f: f / FPS
C = json.load(open(sys.argv[1]))
out = sys.argv[2]
VODIR = sys.argv[3] if len(sys.argv) > 3 else "vo"
V2 = int(sys.argv[4]) if len(sys.argv) > 4 else 596
TAG = sys.argv[5] if len(sys.argv) > 5 else "thread"


def load(p, a=None, b=None):
    cmd = ["ffmpeg", "-v", "error"] + (["-ss", str(a)] if a is not None else []) + (["-t", str(b - (a or 0))] if b is not None else [])
    x = np.frombuffer(subprocess.run(cmd + ["-i", p, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout, np.float32).reshape(-1, 2).copy()
    k = min(len(x), int(0.02 * SR))
    if k:
        x[:k] *= np.linspace(0, 1, k)[:, None]
        x[-k:] *= np.linspace(1, 0, k)[:, None]
    return x


def peak(x):
    m = np.abs(x).mean(1)
    w = int(SR * 0.004)
    return int(np.argmax(np.convolve(m, np.ones(w) / w, "same")))


fx = np.zeros((N, 2), np.float32)
vo = np.zeros((N, 2), np.float32)
mus = np.zeros((N, 2), np.float32)


def place(bus, x, t, g, align="start"):
    st = int(t * SR) - (peak(x) if align == "peak" else 0)
    a, b = max(0, st), min(N, st + len(x))
    if b > a:
        bus[a:b] += x[a - st : b - st] * 10 ** (g / 20)


# a quiet room, fading in from nothing and back to nothing at the loop point
room = load(A + "room-cathedral-mantova.mp3", 20, 20 + LEN)
env = np.ones(len(room))
k = int(1.2 * SR)
env[:k] = np.linspace(0, 1, k)
env[-k:] = np.linspace(1, 0, k)
place(fx, room * env[:, None], 0, -19)

# typing under every message I write, the send whoosh as it leaves
typing = load(A + "typing-iphone.mp3")
off = 0.0
for t0, dur in C["typing"]:
    seg = load(A + "typing-iphone.mp3", off, off + F(dur))
    off = (off + F(dur) + 0.3) % 4.5
    place(fx, seg, F(t0), -1)
for t in C["sends"]:
    place(fx, load(A + "msg-sent.mp3"), F(t), -2, "peak")

# Quinton's side: a buzz on the first reply, a chime on each message
place(fx, load(A + "vibrate-twice.mp3", 0, 1.0), F(C.get("firstQ") or C.get("firstReply")) - 0.35, -10, "start")
for t in C["receives"]:
    place(fx, load(A + "msg-receive.mp3"), F(t), -9, "peak")

# the end card: one soft note
place(fx, load(A + "piano-boom-g3.mp3"), F(C["end"] + 34), -8, "peak")

# voice: four lines, deadpan and warm
for key, f0 in [("v1", 14), ("v2", V2), ("v3", C["end"]), ("v4", 1490)]:
    place(vo, load(f"{VODIR}/{key}.wav"), F(f0), 0)

# music only once someone finally answers: the track's own quiet piano opening, from the swipe
body = load(A + "music-staring-at-the-night-sky.mp3", 6.3, 6.3 + LEN - F(C["push"]))
d0 = int(F(C["push"]) * SR)
mus[d0 : d0 + len(body)] = body[: N - d0]
g = np.ones(N, np.float32)
r = int(1.5 * SR)
g[d0 : d0 + r] = np.linspace(0, 1, r)
st = int(F(C["tail"]) * SR)
g[st : st + int(0.9 * SR)] = np.linspace(1, 0, int(0.9 * SR))
g[st + int(0.9 * SR) :] = 0
mus *= g[:, None]

# duck music and room under the voice
venv = np.convolve(np.abs(vo).mean(1), np.ones(int(0.05 * SR)) / int(0.05 * SR), "same")
duck = np.clip(np.convolve((venv > 0.004).astype(np.float32), np.ones(int(0.4 * SR)) / int(0.4 * SR), "same") * 3, 0, 1)
mus *= (1 - 0.5 * duck)[:, None]

for name, mix in [(f"{TAG}-fx-only", fx + mus * 10 ** (-9 / 20)), (f"{TAG}-vo-mix", fx + mus * 10 ** (-9 / 20) + vo * 10 ** (-9 / 20))]:
    raw = f"{out}/{name}.f32"
    mix.astype(np.float32).tofile(raw)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", raw,
                    "-af", "highpass=f=30,loudnorm=I=-14:TP=-1.5:LRA=11", "-ar", "48000", f"{out}/{name}.wav"], check=True)
print("mixed")
