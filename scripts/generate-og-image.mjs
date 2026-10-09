// npm run og-image
//
// Renders public/og-default.png (1200x630, #fafaf8 background, logo centered
// at ~640px wide) from public/diazoffice-logo.svg. Safe to rerun.

import sharp from "sharp";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WIDTH = 1200;
const HEIGHT = 630;
const LOGO_WIDTH = 640;

const svg = await readFile(path.join(root, "public", "diazoffice-logo.svg"));
// Rasterize at 2x the target width so the downscale stays crisp.
const logo = await sharp(svg, { density: 300 })
  .resize({ width: LOGO_WIDTH })
  .png()
  .toBuffer();

const out = path.join(root, "public", "og-default.png");
await sharp({
  create: { width: WIDTH, height: HEIGHT, channels: 4, background: "#fafaf8" },
})
  .composite([{ input: logo, gravity: "center" }])
  .png()
  .toFile(out);

console.log(`Wrote ${out}`);
