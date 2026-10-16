# python3 prep.py : builds the one visual language for the film into assets/
#   engravings -> inverted gold line-work on black lacquer
#   photographs -> gilded monochrome
#   neglect     -> the same photo with the gold drained to cold grey
import numpy as np
from PIL import Image, ImageFilter, ImageOps

MET = "/tmp/claude-0/metfull/raw/"
PHOTO = "../../public/images/"
OUT = "assets/"

# grey value -> colour ramps (stops: position, rgb)
GOLD = [(0.0, (10, 9, 8)), (0.35, (58, 42, 22)), (0.62, (150, 112, 60)), (0.82, (211, 176, 112)), (1.0, (246, 234, 206))]
PGOLD = [(0.0, (6, 6, 6)), (0.4, (30, 24, 16)), (0.7, (118, 88, 46)), (0.9, (214, 178, 110)), (1.0, (250, 238, 210))]
COLD = [(0.0, (7, 8, 10)), (0.5, (52, 56, 62)), (0.85, (124, 128, 134)), (1.0, (176, 179, 184))]


def ramp(g, stops):
    out = np.zeros(g.shape + (3,))
    for (p0, c0), (p1, c1) in zip(stops, stops[1:]):
        m = (g >= p0) & (g <= p1)
        t = ((g - p0) / (p1 - p0))[m][:, None]
        out[m] = np.array(c0) * (1 - t) + np.array(c1) * t
    return out.clip(0, 255).astype(np.uint8)


def crop(im, box):
    W, H = im.size
    return im.crop((int(box[0] * W), int(box[1] * H), int(box[2] * W), int(box[3] * H)))


def engraving(name, box, out):
    im = crop(Image.open(MET + name + ".jpg").convert("L"), box)
    im = ImageOps.autocontrast(im, cutoff=1)
    g = 1 - np.asarray(im, float) / 255  # invert: ink becomes light
    g = np.clip((g - 0.12) / 0.8, 0, 1) ** 0.9  # paper texture to black, lines to gold
    rgb = ramp(g * 0.92, GOLD)
    Image.fromarray(rgb).save(OUT + out + ".jpg", quality=92)


def photo(name, out, stops=GOLD, gamma=1.0, lift=0.0):
    im = Image.open(PHOTO + name + ".jpg").convert("L")
    im = ImageOps.autocontrast(im, cutoff=0.5)
    g = (np.asarray(im, float) / 255) ** gamma
    g = lift + g * (1 - lift)
    Image.fromarray(ramp(g, stops)).save(OUT + out + ".jpg", quality=92)


engraving("gallery", (0.09, 0.05, 0.93, 0.84), "e-gallery")
engraving("versailles-gates", (0.02, 0.04, 0.96, 0.86), "e-gates")
engraving("versailles-garden", (0.05, 0.09, 0.96, 0.80), "e-garden")
engraving("apollo", (0.01, 0.06, 0.99, 0.84), "e-apollo")
engraving("parterre", (0.09, 0.05, 0.92, 0.95), "e-parterre")
engraving("carlton-hall", (0.03, 0.03, 0.98, 0.86), "e-hall")

for n in ["hero-estate-dusk", "modern-dusk-lawn", "estate-pool-lawn", "turf-macro", "hardscape-pool-deck",
          "storefront", "hands-pruning", "garden-path", "estate-classic-lawn", "estate-lit-terrace", "estate-sunset"]:
    photo(n, "g-" + n, PGOLD, gamma=1.3)
for n in ["storefront", "modern-entry-drive", "garden-path", "estate-classic-lawn"]:
    photo(n, "c-" + n, COLD, gamma=1.25)
print("done")
