#!/usr/bin/env node
/**
 * scripts/auto-rate-difficulty.js
 *
 * Adds `difficulty: N,` to every concept that lacks it across the lessons
 * within the configured set. Performs a *line-level* insert immediately after
 * the `conceptName: "..."` line. **No content is rewritten.**
 *
 * The score per concept is:
 *   1. Keyword override (e.g. closure → 8) — strongest signal first.
 *   2. Lesson default (midpoint of the band given in the Track C plan).
 *
 * Bands per coordination plan:
 *   lesson 11 (Arrays/Functions/Scope):  2-7  (default 4)
 *   lesson 12 (Array methods):           3-6  (default 4)
 *   lesson 13 (Objects/DOM/Classes):     4-7  (default 5)
 *   lesson 15 (Errors/Closure/Async):    5-9  (default 7)
 *   lesson 16 (Node/npm/FS):             4-7  (default 5)
 *   lesson 17 (HTTP/Express/REST):       5-8  (default 6)
 *   lesson 18 (Forms/Validation):        4-6  (default 5)
 *   lesson 19 (חזרה/סיכום):              2-7  (default 4)
 *   lesson 20 (Database/Mongo):          5-8  (default 6)
 *
 * Usage:
 *   node scripts/auto-rate-difficulty.js          # apply
 *   node scripts/auto-rate-difficulty.js --dry    # preview only
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const DRY = process.argv.includes("--dry");

const TARGET_FILES = [
  "lesson11.js",
  "lesson12.js",
  "lesson13.js",
  "lesson15.js",
  "lesson16.js",
  "lesson17.js",
  "lesson18.js",
  "lesson19.js",
  "lesson20.js",
];

const LESSON_DEFAULT = {
  lesson11: 4,
  lesson12: 4,
  lesson13: 5,
  lesson15: 7,
  lesson16: 5,
  lesson17: 6,
  lesson18: 5,
  lesson19: 4,
  lesson20: 6,
};

// Keyword overrides — tested case-insensitive against conceptName.
// Order matters: first match wins.
const KEYWORD_RULES = [
  // ── Highest-difficulty topics ──
  [/closure/i, 8],
  [/stale.*closure/i, 9],
  [/^prototype$/i, 8],
  [/event loop/i, 8],
  [/web socket|websocket/i, 8],
  [/jwt|oauth|cookie.*auth|bcrypt|hash.*password|session.*store/i, 7],
  [/middleware/i, 7],
  [/async\/await|async function|^async$/i, 7],
  [/promise/i, 7],
  [/this binding|^this$/i, 7],
  [/scope chain|lexical scope/i, 6],
  [/^scope$/i, 5],

  // ── Networking / async ──
  [/fetch|xhr|xmlhttp|axios|cors/i, 6],
  [/rest|http method|status code|^http$|express\.json|^express$/i, 6],
  [/route|router|^routes$/i, 6],
  [/^get$|^post$|^put$|^delete$|^patch$|^options$/i, 5],

  // ── Database / Mongo ──
  [/aggregat|pipeline/i, 8],
  [/populate|ref(?!\s)|relations?hip/i, 7],
  [/mongoose|schema|model|validation/i, 6],
  [/mongo|^db$|nosql|sql|cluster|atlas/i, 6],
  [/^crud$|create.*read.*update.*delete/i, 5],

  // ── Node / Build ──
  [/file system|^fs$|require|^module$|module\.export|export.*default/i, 5],
  [/^npm$|package\.json|node_modules/i, 4],

  // ── DOM / events ──
  [/event delegation|bubbl|capture/i, 7],
  [/event|listener|click|keydown|submit/i, 5],
  [/dom|querySelector|getElement/i, 5],
  [/^class$|inherit|extends|super/i, 6],
  [/object|^obj$/i, 5],
  [/json|stringify|parse/i, 4],

  // ── Errors ──
  [/try.?catch|throw|error.*handl|^error$|^exception/i, 6],

  // ── Forms / Validation ──
  [/^form$|formData|input|^submit$|controlled|uncontrolled/i, 5],
  [/^validat|required|pattern|min.?length|max.?length/i, 5],

  // ── Array methods ──
  [/^reduce$|reducer/i, 6],
  [/^map$|^filter$|^find$|^some$|^every$|^sort$|^reverse$/i, 4],
  [/^forEach$|^push$|^pop$|^shift$|^unshift$|^splice$|^slice$|^join$|^concat$|^includes$|^indexOf$/i, 3],
  [/spread|rest operator|destructur/i, 5],

  // ── Primitives / variables ──
  [/^let$|^const$|^var$/i, 3],
  [/^number$|^string$|^boolean$|^null$|^undefined$|^typeof$/i, 2],
  [/^pointer$|^reference$|by reference|by value/i, 6],
  [/^array$|^index$/i, 3],

  // ── Functions ──
  [/arrow function|callback|higher.?order/i, 5],
  [/^function$|hoisting/i, 4],
];

function pickDifficulty(conceptName, lessonId) {
  for (const [re, score] of KEYWORD_RULES) {
    if (re.test(conceptName)) return score;
  }
  const baseId = lessonId.replace(/\.js$/, "");
  return LESSON_DEFAULT[baseId] ?? 5;
}

function processFile(file) {
  const filePath = path.join(DATA_DIR, file);
  const lessonId = file.replace(/\.js$/, "");
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  const output = [];
  const insertions = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    output.push(line);
    // Accept both unquoted (`conceptName: "X"`) and JSON-quoted
    // (`"conceptName": "X"`) keys to support both authoring styles.
    const m = line.match(
      /^(\s*)(?:"conceptName"|conceptName):\s*["'`]([^"'`]+)["'`]\s*,?\s*$/,
    );
    if (!m) continue;

    const [, indent, conceptName] = m;
    const quoted = /"conceptName"/.test(line);
    // Look ahead: skip blank lines and conceptTopic lines until we find
    // either `difficulty:` (already done) or anything else (need to insert).
    let j = i + 1;
    let alreadyHasDifficulty = false;
    while (j < lines.length) {
      const next = lines[j];
      if (/^\s*$/.test(next)) {
        j++;
        continue;
      }
      if (/^\s*(?:"conceptTopic"|conceptTopic):/.test(next)) {
        j++;
        continue;
      }
      if (/^\s*(?:"difficulty"|difficulty):/.test(next)) {
        alreadyHasDifficulty = true;
      }
      break;
    }
    if (alreadyHasDifficulty) continue;

    const score = pickDifficulty(conceptName, lessonId);
    const insertedLine = quoted
      ? `${indent}"difficulty": ${score},`
      : `${indent}difficulty: ${score},`;
    output.push(insertedLine);
    insertions.push({ conceptName, score });
  }

  return { filePath, output, insertions };
}

function main() {
  let totalInsertions = 0;
  for (const file of TARGET_FILES) {
    const { filePath, output, insertions } = processFile(file);
    if (insertions.length === 0) {
      console.log(`✓ ${file}: nothing to add (already complete).`);
      continue;
    }
    console.log(`+ ${file}: adding ${insertions.length} difficulty entries`);
    if (process.env.VERBOSE) {
      insertions.forEach((ins) =>
        console.log(`    ${ins.score.toString().padStart(2)} ← ${ins.conceptName}`),
      );
    }
    totalInsertions += insertions.length;
    if (!DRY) {
      fs.writeFileSync(filePath, output.join("\n"), "utf8");
    }
  }
  console.log(
    `\n${DRY ? "[dry-run] would add" : "Added"} ${totalInsertions} difficulty fields.`,
  );
}

main();
