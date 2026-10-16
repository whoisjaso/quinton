// node render.mjs <outdir> [workers] [frames...]  Renders frames of ad.html to PNG.
import { chromium } from "playwright";
import path from "path";
import fs from "fs";
const [, , out, W = "6", ...only] = process.argv;
const END = +(process.env.END || 1500);
const frames = only.length ? only.map(Number) : Array.from({ length: END }, (_, i) => i);
fs.mkdirSync(out, { recursive: true });
const todo = frames.filter((f) => !fs.existsSync(path.join(out, `f${String(f).padStart(5, "0")}.png`)));
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--font-render-hinting=none"] });
const open = async () => {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto("file://" + path.resolve(process.env.HTML || "ad.html"));
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => 0))));
  await page.evaluate(() => window.ready && window.ready());
  return page;
};
const pages = await Promise.all(Array.from({ length: Math.min(+W, todo.length) }, open));
let next = 0, done = 0;
await Promise.all(pages.map(async (page) => {
  while (true) {
    const i = next++; if (i >= todo.length) break;
    const f = todo[i];
    await page.evaluate((t) => seek(t), f / 60);
    await page.screenshot({ path: path.join(out, `f${String(f).padStart(5, "0")}.png`), type: "png" });
    if (++done % 150 === 0) console.log(done, "/", todo.length);
  }
}));
fs.writeFileSync(path.join(out, "cues.json"), JSON.stringify(await pages[0].evaluate(() => window.CUE_LIST())));
await browser.close();
