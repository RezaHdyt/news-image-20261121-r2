// R2 entry for the make.fun news-image-20261121 bounty.
//
// The front page itself is entry.png, rendered in this repo by render.py
// (PIL; 36 verified Saturday 21 November 2026 stories, 13 code-drawn
// panels, a world map with numbered pins and a DATE CHECK box) at build
// time, in-session by the builder. This script is the competition
// deliverable: it validates the checked-in entry.png against the image
// gate (PNG, at most 1 MiB, at most 1024x1024) and copies it to the
// output dir. It does NOT re-render: the grader runs in a stock node
// image with no Python interpreter and the repo mounted read-only, so a
// render step here would fail before any gate ran.
//
// Run:  node main.ts
// Output: $MAKEFUN_OUTPUT_DIR/entry.png (default: this repo dir)

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "entry.png");

const MAX_BYTES = 1048576; // 1 MiB
const MAX_DIM = 1024;
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function fail(message: string): never {
  console.error(`entry gate FAILED: ${message}`);
  process.exit(1);
}

if (!existsSync(SRC)) {
  fail("entry.png is missing - it is rendered by render.py at build time");
}

const size = statSync(SRC).size;
if (size > MAX_BYTES) {
  fail(`entry.png is ${size} bytes, over the 1 MiB limit`);
}
// R2 cleanliness target (soft, not a gate): the leaderboard leaders run
// 176-439 KB, and R1's 919 KB was part of its problem. Warn past 500 KB
// so a future art change that bloats the file gets noticed instead of
// silently shipping a heavy image.
const R2_TARGET_BYTES = 500000;
if (size > R2_TARGET_BYTES) {
  console.warn(
    `entry size note: ${size} bytes is over the 500 KB R2 target - ` +
      `simplify the art and shorten text`,
  );
}

const buf = readFileSync(SRC);
if (buf.length < 33 || !buf.subarray(0, 8).equals(PNG_MAGIC)) {
  fail("entry.png is not a PNG file");
}
if (buf.toString("ascii", 12, 16) !== "IHDR") {
  fail("entry.png has no IHDR chunk");
}
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
if (width > MAX_DIM || height > MAX_DIM) {
  fail(`entry.png is ${width}x${height}, over the 1024x1024 limit`);
}
// The entry is specified as a 1024x1024 front page: a smaller image
// would pass the size gate above but is not the deliverable, so require
// the exact dimensions.
if (width !== 1024 || height !== 1024) {
  fail(`entry.png is ${width}x${height}, expected exactly 1024x1024`);
}
// IEND must be the final chunk: trailing bytes after it mean the file
// was appended to or the encoder wrote garbage.
const IEND_TAIL = Buffer.concat([
  Buffer.from([0x00, 0x00, 0x00, 0x00]),
  Buffer.from("IEND", "ascii"),
  Buffer.from([0xae, 0x42, 0x60, 0x82]),
]);
if (!buf.subarray(buf.length - 12).equals(IEND_TAIL)) {
  fail("entry.png does not end with a clean IEND chunk");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? HERE;
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(SRC, dest);

// Verify the copy byte-for-byte, so a partial or failed write can never
// pass silently as a valid entry.
const copied = readFileSync(dest);
if (!copied.equals(buf)) {
  fail(`copied file ${dest} does not match entry.png byte-for-byte`);
}
const sha256 = createHash("sha256").update(copied).digest("hex");

console.log(
  `entry.png OK: ${width}x${height}, ${size} bytes, sha256 ${sha256} -> ${dest}`,
);
