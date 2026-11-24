#!/usr/bin/env node
// One line: a developer's excuse for code that broke in production.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The whole entry is this single line. A 'temporary' check nobody re-enabled,
// and the production incident that finally caught up with it.
const EXCUSE =
  "It's not a regression. I disabled that check 'temporarily' last sprint to ship on time, and production just caught up with me.";

function main(): void {
  const text = EXCUSE.trim();
  const points = [...text].length;
  if (points < 1 || points > 200) {
    throw new Error(`excuse must be 1 to 200 code points, got ${points}`);
  }
  // One clean line only: a stray control character is never part of a good excuse.
  if (/[\u0000-\u001f\u007f\u2028\u2029]/.test(text)) {
    throw new Error("excuse must be a single clean line");
  }
  // Refuse text that is nothing but whitespace dressed up as an excuse.
  if (!/\S/.test(text)) {
    throw new Error("excuse must contain non-whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(outDir, { recursive: true });
  const path = join(outDir, "entry.txt");
  writeFileSync(path, `${text}\n`, "utf8");
  console.log(`wrote ${points} characters to ${path}`);
}

main();
