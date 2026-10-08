// npm run photos
//
// Processes every image in photo-inbox/ (jpg, jpeg, heic, png), including
// one level of subfolders:
//   - a file directly in photo-inbox/ is sorted by nearest-town GPS match
//   - a file inside a town-named subfolder (e.g. photo-inbox/pacific-grove/)
//     uses that folder name as the town directly, skipping GPS matching
//   - converts to WebP, capped at 1800px on the long edge, metadata stripped
//   - writes it to public/images/photos/<town>/<town>-<date>-<nnn>.webp
//   - moves the original into photo-inbox/done/
//   - appends a record to src/data/photos.json
//
// Originals in photo-inbox/ are never committed (see .gitignore).

import fs from "fs";
import path from "path";
import sharp from "sharp";
import exifr from "exifr";
import { nearestTown, towns } from "./towns.mjs";

const TOWN_SLUGS = new Set(towns.map((t) => t.slug));

const ROOT = process.cwd();
const INBOX_DIR = path.join(ROOT, "photo-inbox");
const DONE_DIR = path.join(INBOX_DIR, "done");
const PHOTOS_DIR = path.join(ROOT, "public", "images", "photos");
const DATA_FILE = path.join(ROOT, "src", "data", "photos.json");

const EXTENSIONS = new Set([".jpg", ".jpeg", ".heic", ".png"]);
const MAX_EDGE = 1800;
const WEBP_QUALITY = 82;

function loadPhotosData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    console.warn(`Could not parse ${DATA_FILE}, starting a fresh list.`);
    return [];
  }
}

function savePhotosData(data) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + "\n");
}

function formatDate(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/** Next unused sequence number for <town>-<date>-NNN.webp, based on what's already on disk. */
function nextSequence(townDir, town, date) {
  if (!fs.existsSync(townDir)) return 1;
  const prefix = `${town}-${date}-`;
  let max = 0;
  for (const name of fs.readdirSync(townDir)) {
    if (!name.startsWith(prefix) || !name.endsWith(".webp")) continue;
    const n = parseInt(name.slice(prefix.length, name.length - ".webp".length), 10);
    if (!Number.isNaN(n) && n > max) max = n;
  }
  return max + 1;
}

async function processFile(filePath, sequenceCounters, folderTown) {
  const base = path.basename(filePath);
  console.log(`Processing ${base}${folderTown ? ` (folder: ${folderTown})` : ""}...`);

  let gps = null;
  let exifDate = null;
  try {
    const data = await exifr.parse(filePath, {
      gps: true,
      pick: ["DateTimeOriginal", "CreateDate", "ModifyDate"],
    });
    if (data) {
      if (typeof data.latitude === "number" && typeof data.longitude === "number") {
        gps = { lat: data.latitude, lng: data.longitude };
      }
      exifDate = data.DateTimeOriginal || data.CreateDate || data.ModifyDate || null;
    }
  } catch (err) {
    console.warn(`  Could not read EXIF from ${base}: ${err.message}`);
  }

  const town = folderTown || (gps ? nearestTown(gps.lat, gps.lng) : "unsorted");
  const date = formatDate(
    exifDate instanceof Date && !Number.isNaN(exifDate.getTime())
      ? exifDate
      : fs.statSync(filePath).mtime
  );

  const townDir = path.join(PHOTOS_DIR, town);
  fs.mkdirSync(townDir, { recursive: true });

  const counterKey = `${town}-${date}`;
  if (!(counterKey in sequenceCounters)) {
    sequenceCounters[counterKey] = nextSequence(townDir, town, date);
  }
  const seq = sequenceCounters[counterKey]++;
  const outputName = `${town}-${date}-${String(seq).padStart(3, "0")}.webp`;
  const outputPath = path.join(townDir, outputName);

  await sharp(filePath, { failOn: "none" })
    .rotate() // apply EXIF orientation before metadata gets stripped below
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    // No .withMetadata() call: sharp strips all metadata (EXIF/GPS/ICC/XMP) by default.
    .toFile(outputPath);

  fs.mkdirSync(DONE_DIR, { recursive: true });
  fs.renameSync(filePath, path.join(DONE_DIR, base));

  console.log(`  -> ${town}/${outputName}`);
  return { file: `${town}/${outputName}`, town, date, alt: "", caption: "" };
}

const isImage = (name) => EXTENSIONS.has(path.extname(name).toLowerCase());

/** Files directly in photo-inbox/, plus one level of town-named subfolders. */
function collectEntries() {
  const result = [];
  for (const entry of fs.readdirSync(INBOX_DIR, { withFileTypes: true })) {
    if (entry.name === "done") continue;

    if (entry.isFile()) {
      if (isImage(entry.name)) {
        result.push({ filePath: path.join(INBOX_DIR, entry.name), folderTown: null });
      }
      continue;
    }

    if (entry.isDirectory()) {
      const subDir = path.join(INBOX_DIR, entry.name);
      const folderTown = TOWN_SLUGS.has(entry.name) ? entry.name : null;
      if (entry.name !== "done" && !folderTown) {
        console.warn(`  Subfolder "${entry.name}" doesn't match a known town slug — sorting its photos by GPS instead.`);
      }
      for (const sub of fs.readdirSync(subDir, { withFileTypes: true })) {
        if (sub.isFile() && isImage(sub.name)) {
          result.push({ filePath: path.join(subDir, sub.name), folderTown });
        }
      }
    }
  }
  return result;
}

async function main() {
  fs.mkdirSync(INBOX_DIR, { recursive: true });
  const entries = collectEntries();

  if (entries.length === 0) {
    console.log("No images found in photo-inbox/.");
    return;
  }

  const photos = loadPhotosData();
  const sequenceCounters = {};
  let processed = 0;

  for (const { filePath, folderTown } of entries) {
    try {
      const record = await processFile(filePath, sequenceCounters, folderTown);
      photos.push(record);
      processed++;
    } catch (err) {
      console.error(`  Failed to process ${path.basename(filePath)}: ${err.message}`);
    }
  }

  savePhotosData(photos);
  console.log(`\nDone. Processed ${processed} of ${entries.length} image(s).`);
}

main();
