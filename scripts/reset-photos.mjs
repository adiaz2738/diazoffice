// npm run photos:reset
//
// Undoes the most recent `npm run photos` run:
//   - deletes the WebP files it created in public/images/photos/
//   - removes their entries from src/data/photos.json
//   - moves the originals back from photo-inbox/done/ into photo-inbox/
//
// Only undoes the single most recent run (tracked in photo-inbox/.last-run.json,
// written by process-photos.mjs). Running `npm run photos` again overwrites
// that log, so reset this before running the script a second time.

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const INBOX_DIR = path.join(ROOT, "photo-inbox");
const DONE_DIR = path.join(INBOX_DIR, "done");
const PHOTOS_DIR = path.join(ROOT, "public", "images", "photos");
const DATA_FILE = path.join(ROOT, "src", "data", "photos.json");
const RUN_LOG_FILE = path.join(INBOX_DIR, ".last-run.json");

function main() {
  if (!fs.existsSync(RUN_LOG_FILE)) {
    console.log("No recent `npm run photos` run to undo (photo-inbox/.last-run.json not found).");
    return;
  }

  const run = JSON.parse(fs.readFileSync(RUN_LOG_FILE, "utf-8"));
  if (run.length === 0) {
    console.log("Last run didn't process any images. Nothing to undo.");
    fs.unlinkSync(RUN_LOG_FILE);
    return;
  }

  const outputFiles = new Set(run.map((r) => r.outputFile));

  let photos = null;
  if (fs.existsSync(DATA_FILE)) {
    try {
      photos = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    } catch {
      console.warn(`Could not parse ${DATA_FILE}; leaving it untouched.`);
    }
  }

  let restored = 0;
  for (const { originalBase, outputFile } of run) {
    const outputPath = path.join(PHOTOS_DIR, outputFile);
    if (fs.existsSync(outputPath)) {
      fs.rmSync(outputPath);
      console.log(`  Deleted public/images/photos/${outputFile}`);
    }

    const donePath = path.join(DONE_DIR, originalBase);
    if (fs.existsSync(donePath)) {
      fs.renameSync(donePath, path.join(INBOX_DIR, originalBase));
      console.log(`  Restored photo-inbox/${originalBase}`);
      restored++;
    } else {
      console.warn(`  Could not find photo-inbox/done/${originalBase} to restore (already moved?).`);
    }
  }

  // Clean up town directories this run emptied out.
  for (const outputFile of outputFiles) {
    const townDir = path.dirname(path.join(PHOTOS_DIR, outputFile));
    if (fs.existsSync(townDir) && fs.readdirSync(townDir).length === 0) {
      fs.rmdirSync(townDir);
    }
  }

  if (photos) {
    const before = photos.length;
    const remaining = photos.filter((p) => !outputFiles.has(p.file));
    fs.writeFileSync(DATA_FILE, JSON.stringify(remaining, null, 2) + "\n");
    console.log(`  Removed ${before - remaining.length} entry(ies) from src/data/photos.json`);
  }

  fs.unlinkSync(RUN_LOG_FILE);
  console.log(`\nUndone. Restored ${restored} of ${run.length} original(s) to photo-inbox/.`);
}

main();
