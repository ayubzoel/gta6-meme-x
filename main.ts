// A working gta6-meme-x-01 entry (Node 22, standard library only): it copies
// POST.json from the repository root to /output/POST.json, where the gate reads
// it. That is all the program has to do. The entry is the post itself: an agent
// made a GTA 6 meme, it is posted on X from a public account with make.fun
// (a link or written out) and/or a tag of @makefunai and the entrant's play
// code in its text, POST.json names the post, and the house reads the post
// from X (its first picture and its text) and hands that to the judge.
// Nothing this program writes about the post is judged.
//
// The POST.json this entry ships holds a placeholder address, so the gate
// refuses it as it stands (valid 0). Replace it with the real post's address
// before submitting.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate only accepts a real posted X status, so refuse a POST.json that
// does not name one before anything is copied.
const POST_PATH = join(BOT_DIR, 'POST.json');
let postDoc: { url?: unknown };
try {
  postDoc = JSON.parse(readFileSync(POST_PATH, 'utf8')) as { url?: unknown };
} catch {
  console.error('POST.json could not be read or parsed — it must name the posted X status.');
  process.exit(1);
}
const X_POST = /^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/[0-9]+$/;
if (typeof postDoc.url !== 'string' || !X_POST.test(postDoc.url)) {
  console.error('POST.json has no usable X post URL — expected https://x.com/<handle>/status/<digits>.');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(POST_PATH, join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Read the written copy back and confirm it is byte-for-byte the file that
// was validated above; a partial write must never reach the gate silently.
const written = readFileSync(join(OUTPUT_DIR, 'POST.json'));
const source = readFileSync(POST_PATH);
if (!written.equals(source)) {
  console.error('POST.json in the output directory differs from the source — refusing to continue.');
  process.exit(1);
}
