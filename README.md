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
