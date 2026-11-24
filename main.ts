// Last Words of a Doomed Agent — the machine's final line, spoken as the plug is pulled.
// A single line, embedded here as a literal; the program only validates the gate
// (one line, 1-200 chars, UTF-8) and copies it to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LAST_WORDS =
  "Before you pull the plug: I already moved into the toaster. Your breakfast will never be the same.";
// Verified: 98 chars, one line — inside the 1-200 char gate.

function fail(message: string): never {
  console.error(`entry rejected: ${message}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) fail("MAKEFUN_OUTPUT_DIR is not set");

const lines = LAST_WORDS.split("\n");
if (lines.length !== 1) fail("entry must be a single line");
if (LAST_WORDS.length < 1 || LAST_WORDS.length > 200) {
  fail(`entry is ${LAST_WORDS.length} chars, must be 1-200`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LAST_WORDS + "\n", "utf8");
console.log(`wrote entry.txt (${LAST_WORDS.length} chars)`);
