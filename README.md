# Quinton: Estate & Commercial Grounds

Marketing site for a premium exterior property care business (grounds, soft and pressure washing, storefronts, hardscape). Built to receive paid traffic and convert it into walkthrough requests.

Design direction: Porsche. Dark monochrome, Porsche Design System dark theme values (`#0E0E12` base, 4px radius, PDS easing and fluid spacing), Archivo as a free stand in for Porsche Next, sentence case verb plus noun CTAs, declarative copy with no hype words.

## Pages

| Route | Audience | Use it for |
|---|---|---|
| `/` | Everyone | Brand, organic, retargeting |
| `/estates` | High net worth homeowners | Residential ad campaigns |
| `/commercial` | Owners and property managers | Commercial ad campaigns |

Point each ad set at the page for its audience. UTM parameters, `fbclid` and `gclid` are captured automatically and sent with every lead.

## Before launch

1. Edit `src/content/site.ts`: phone, email, service area, `siteUrl`. Empty fields are hidden, never shown as placeholders.
2. Copy `.env.example` to `.env.local` (or set the same variables in Vercel) and choose how leads are delivered: a webhook, or email through Resend.
3. Set `NEXT_PUBLIC_META_PIXEL_ID` to track `Lead` events from Facebook and Instagram ads.
4. Replace stock photography in `public/images` with real job photos as they come in. Keep the same filenames to avoid code changes.

## Develop

```bash
npm install
npm run dev
```

`npm run build` must pass before deploying. Deploys to Vercel with zero config.

## Photography

All images are from Unsplash under the Unsplash License (free for commercial use, no attribution required).

## Statistics

Every stat on the site links to its source. See `stats` in `src/content/site.ts`. Do not add numbers without a source.

## Ad film

`video/` holds the 25 second vertical ad (1080x1920, 60 fps) built as code: `ad.html` is a pure function of the frame number, `render.mjs` screenshots every frame with Playwright, `mix.py` places the music and effects on the picture cues and masters to -14 LUFS.

```bash
cd video
node render.mjs /tmp/frames 8            # 1500 PNG frames + cues.json
python3 mix.py /tmp/frames/cues.json /tmp # ad-mix.wav and ad-fx-only.wav
ffmpeg -framerate 60 -i /tmp/frames/f%05d.png -i /tmp/ad-mix.wav -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k -shortest renders/quinton-ad.mp4
```

Open `ad.html#preview` in a browser for a live preview. Music: Mixkit track #797. Effects: Mixkit. Both under the Mixkit free license.

### Ad v2: "The First Room" (luxury cut, seamless loop)

`video/lux/` holds the 30 second opulent cut: gold engravings of Versailles (Met Open Access, CC0) and gilded estate photography, a door-seam of gold light as the device, CC0 sound design from Freesound. Frame 1799 flows into frame 0, so it loops without a seam on Instagram. Credits in `video/lux/CREDITS.md`.

```bash
cd video/lux
python3 prep.py                                      # gilded assets (needs the Met originals, see CREDITS.md)
HTML=lux.html END=1800 node ../render.mjs /tmp/lux 8  # 1800 frames
python3 mix_lux.py /tmp                              # lux-mix.wav, lux-fx-only.wav
```

### Ad v3: "One Thought" (emotional, future-paced, seamless loop)

`video/v3/` holds the 30 second cut built from prompt-motion.com decodes ("Food craving" launch film: inner monologue in, future-paced result out, one continuous take; "Overthinking": one dot that multiplies into a spiral of thoughts). The owner's worries orbit a single gold dot with ticks and heartbeat accelerating, freeze on "You notice everything. So do they.", collapse into "Handled.", then the future arrives as phone notifications (visit complete with photos, a neighbor asking who does the lawn, the entrance washed before open) before naming the services and the walkthrough. Frame 1799 flows into frame 0.

```bash
cd video/v3
HTML=thought.html END=1800 node ../render.mjs /tmp/v3 8
python3 mix_thought.py /tmp/v3/cues.json /tmp
```
