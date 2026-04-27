#!/usr/bin/env node
/**
 * scripts/add_difficulty.js
 *
 * Auto-adds `difficulty: 1-10` to every concept that doesn't have one.
 * Heuristic: base = lesson_index * 0.3 + 1, then bump per concept-name pattern.
 * Idempotent: skips concepts that already have difficulty.
 *
 * Usage:
 *   node scripts/add_difficulty.js
 *   node scripts/add_difficulty.js --check   # dry-run, exit 1 if any missing
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");

// All lesson + workbook files. Skip questions_*.js + quick_guide + concept_enrichment.
const SKIP_FILES = new Set([
  "questions_bank.js",
  "questions_bank_seeded.js",
  "questions_trace.js",
  "quick_guide.js",
  "concept_enrichment.js",
  "extended_explanations.js",
]);

const HINTS = [
  // Trivial primitives → 1
  [/^(string|number|boolean|undefined|null|let|var|const)$/i, 1],
  [/^(console\.log|console|true|false|return|if|else|for|while)$/i, 1],
  [/^(\+|\-|\*|\/|=|\!\=|\=\=|\<|\>|&&|\|\|)$/, 1],
  // Easy fundamentals → 2-3
  [/^(array|object|function|loop|index|push|pop|slice|length)$/i, 2],
  [/^(if|else if|switch|case|break|continue)$/i, 2],
  [/^(\.find|\.indexOf|\.includes)$/i, 3],
  // Mid-level → 4-5
  [/(spread|rest|destructuring|template literal|arrow function|default)/i, 4],
  [/(map|filter|reduce|forEach|sort|every|some)/i, 4],
  [/(class|constructor|new|extends|prototype|this)/i, 5],
  [/(Promise|then|catch|fetch|json|api|http)/i, 5],
  [/(error|exception|throw|try|catch)/i, 5],
  // Hard → 6-7
  [/(closure|scope|hoisting|reference|by value|by reference)/i, 6],
  [/(async|await|generator|yield)/i, 6],
  [/(useState|useEffect|hook|setState|render)/i, 6],
  [/(express|router|middleware|cors|cookie|session)/i, 6],
  // Advanced → 7-8
  [/(useMemo|useCallback|useRef|useReducer|useContext)/i, 7],
  [/(typescript|generic|interface|type|enum|union)/i, 7],
  [/(mongoose|schema|model|aggregate|populate)/i, 7],
  [/(testing|jest|vitest|RTL|playwright)/i, 7],
  // Very advanced → 8-9
  [/(IoC|Dependency Injection|MVC|MVVM|Reactive)/i, 9],
  [/(Server Side|SSR|hydration|streaming)/i, 9],
];

function inferDifficulty(conceptName, lessonIdx) {
  const base = Math.min(5, Math.max(1, Math.floor((lessonIdx - 11) / 2) + 2));
  const bumps = HINTS.filter(([re]) => re.test(conceptName)).map(([, v]) => v);
  const d = bumps.length === 0 ? base + 1 : Math.max(...bumps);
  return Math.min(10, Math.max(1, d));
}

function processFile(fname, dryRun) {
  const fpath = path.join(DATA_DIR, fname);
  let src = fs.readFileSync(fpath, "utf8");
  const idMatch = src.match(/["']?id["']?\s*:\s*["']([^"']+)["']/);
  const lessonId = idMatch ? idMatch[1] : "lesson_15";
  const lessonIdx = parseInt((lessonId.match(/\d+/) || ["15"])[0], 10);

  const conceptRegex = /(["']?conceptName["']?\s*:\s*["']([^"']+)["']\s*,)/g;
  const insertions = [];
  let total = 0;
  let m;
  while ((m = conceptRegex.exec(src)) !== null) {
    total++;
    const after = src.slice(m.index + m[0].length, m.index + m[0].length + 300);
    if (/difficulty\s*:/.test(after)) continue;
    const lineStart = src.lastIndexOf("\n", m.index) + 1;
    const indent = src.slice(lineStart, m.index);
    const text = `\n${indent}difficulty: ${inferDifficulty(m[2], lessonIdx)},`;
    insertions.push({ pos: m.index + m[0].length, text });
  }
  insertions.sort((a, b) => b.pos - a.pos);
  if (!dryRun) {
    for (const ins of insertions) {
      src = src.slice(0, ins.pos) + ins.text + src.slice(ins.pos);
    }
    if (insertions.length > 0) fs.writeFileSync(fpath, src, "utf8");
  }
  return { added: insertions.length, total };
}

function main() {
  const dryRun = process.argv.includes("--check");
  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".js") && !SKIP_FILES.has(f));

  let totalAdded = 0;
  let totalScanned = 0;
  for (const fname of files) {
    const { added, total } = processFile(fname, dryRun);
    totalAdded += added;
    totalScanned += total;
    if (added > 0) console.log(`  ${fname}: ${added}/${total} ${dryRun ? "(dry-run)" : ""}`);
  }
  if (totalAdded === 0) {
    console.log("✅ All concepts already have difficulty.");
    process.exit(0);
  } else {
    console.log(
      `\n${dryRun ? "ℹ️ " : "✅ "}${dryRun ? "Would add" : "Added"} difficulty to ${totalAdded}/${totalScanned} concepts.`,
    );
    if (dryRun) process.exit(1);
  }
}

main();
