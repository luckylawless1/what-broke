// Say What Actually Broke — u-po-pu-say-what-actually-broke-a2c153b5
// Writes one single-line error message (1-200 chars) to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "The server is fine. Your deploy renamed a column, and now every page is searching for it like a lost dog.";

function validate(line) {
  if (typeof line !== "string") throw new Error("entry must be a string");
  if (line.length < 1 || line.length > 200) throw new Error("entry must be 1-200 characters");
  if (line.trim().length === 0) throw new Error("entry must not be only whitespace");
  if (line.includes("\n") || line.includes("\r")) throw new Error("entry must be a single line");
  return line;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
const expected = validate(LINE) + "\n";
writeFileSync(outFile, expected, "utf8");
// Read the file back and verify the bytes on disk match the intended entry
// exactly; fail loudly instead of leaving a corrupt entry behind.
const onDisk = readFileSync(outFile, "utf8");
if (onDisk !== expected) throw new Error("entry.txt on disk does not match the intended entry");
