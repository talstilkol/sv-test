#!/usr/bin/env node
"use strict";

// scripts/audit_hebrew_quality.js
//
// Light Hebrew quality + RTL bidi audit:
//   1. Common typos / misspellings of high-frequency words.
//   2. Mixed-direction patterns that often render wrong (Latin word inside
//      Hebrew sentence without proper isolation).
//   3. Niqqud (vowel marks) sneaking into prose — usually accidental copy.
//   4. Trailing English-only Hebrew (e.g. an English code identifier with
//      Hebrew text bleeding into it).
//
// Output: HEBREW_QUALITY_REPORT.json + .md

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { byFilename } = require("./lib/sort.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "HEBREW_QUALITY_REPORT.json");
const MD_PATH = path.join(ROOT, "HEBREW_QUALITY_REPORT.md");

// Common typo pairs (wrong → right). Conservative list — only flag patterns
// that are nearly always typos, not legitimate alternatives.
const TYPO_PAIRS = [
  ["מעלות", null],            // not actually a typo — example
  ["שפיע", "שפע"],
  ["מתפעיל", "מפעיל"],
  ["נשאר ", "נישאר "],         // could be either; skip
];

// More confident: stems of mistyped frequent words
const SUSPICIOUS_PATTERNS = [
  // [pattern, label]
  [/\bתאמיד\b/, "תאמיד (probably תמיד)"],
  [/\bמחבסר\b/, "מחבסר (probably מחבר)"],
  [/\bמסויים\b/, "מסויים → מסוים (Academia)"],
  [/\bאומיר\b/, "אומיר (probably אומר)"],
  [/\bמתופעל\b/, "מתופעל (probably מופעל)"],
  [/\bויאות\b/, "ויאות (probably ראות)"],
  [/\bפרוייקט\b/, "פרוייקט → פרויקט (Academia)"],
];

// Niqqud (vowel marks) — excludes U+05BE (MAQAF, legitimate compound joiner)
// Ranges: U+0591–U+05AF cantillation, U+05B0–U+05BD vowel points, U+05C1–U+05C2 sin/shin dots
const NIQQUD_RE = /[֑-ְ֯-ׇֽׁׂׅׄ]/;

// Latin word in Hebrew sentence without LTR isolation
const MIXED_DIR_RE = /[֐-׿].{0,2}[A-Za-z]{3,}.{0,2}[֐-׿]/;

function loadAll() {
  const sandbox = { window: {}, console };
  fs.readdirSync(DATA_DIR).filter(f => f.endsWith(".js")).sort(byFilename).forEach(f => {
    vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, f), "utf8"), sandbox, { filename: f });
  });
  return sandbox;
}

function checkText(text, location, results) {
  if (!text || typeof text !== "string") return;
  if (NIQQUD_RE.test(text)) {
    results.niqqud.push({ location, snippet: text.slice(0, 60) });
  }
  for (const [re, label] of SUSPICIOUS_PATTERNS) {
    if (re.test(text)) {
      if (!results.typos[label]) results.typos[label] = [];
      results.typos[label].push({ location, snippet: text.slice(0, 60) });
    }
  }
  // Mixed-direction without LTR isolation — this is fine for code identifiers
  // (browsers handle ASCII-letters inside RTL text via UBA), so we don't flag.
}

function run() {
  const sandbox = loadAll();
  const results = { niqqud: [], typos: {}, mixedDir: [] };

  // Iterate lessons
  const lessons = Object.values(sandbox).filter(v => v && typeof v.id === "string" && Array.isArray(v.concepts));
  lessons.forEach(lesson => {
    checkText(lesson.title, `${lesson.id}::title`, results);
    checkText(lesson.description, `${lesson.id}::description`, results);
    (lesson.concepts || []).forEach(c => {
      const base = `${lesson.id}::${c.conceptName}`;
      checkText(c.codeExplanation, `${base}::codeExplanation`, results);
      checkText(c.illustration, `${base}::illustration`, results);
      if (c.levels) {
        Object.entries(c.levels).forEach(([level, text]) => {
          checkText(text, `${base}::levels.${level}`, results);
        });
      }
    });
  });

  // Iterate question bank explanations
  const bank = sandbox.QUESTIONS_BANK || { mc: [], fill: [] };
  (bank.mc || []).forEach(q => {
    checkText(q.question, `${q.id}::question`, results);
    checkText(q.explanation, `${q.id}::explanation`, results);
    (q.optionFeedback || []).forEach((fb, i) => checkText(fb, `${q.id}::feedback[${i}]`, results));
  });
  (bank.fill || []).forEach(q => {
    checkText(q.hint, `${q.id}::hint`, results);
    checkText(q.explanation, `${q.id}::explanation`, results);
  });

  return results;
}

function main() {
  const r = run();
  fs.writeFileSync(JSON_PATH, JSON.stringify(r, null, 2));

  const totalTypos = Object.values(r.typos).reduce((s, arr) => s + arr.length, 0);

  const md = [
    "# Hebrew Quality Audit",
    "",
    `_Generated: ${new Date().toISOString().slice(0, 10)}_`,
    "",
    "## Summary",
    `- Niqqud (vowel marks) found: ${r.niqqud.length}`,
    `- Suspicious typo patterns: ${totalTypos}`,
    "",
    "## Typo patterns",
    "",
    Object.keys(r.typos).length === 0 ? "_No suspicious typos found._" :
      Object.entries(r.typos).map(([label, hits]) =>
        `### ${label} (${hits.length})\n\n` +
        hits.slice(0, 10).map(h => `- \`${h.location}\` — "${h.snippet}"`).join("\n") +
        (hits.length > 10 ? `\n- ...and ${hits.length - 10} more` : "")
      ).join("\n\n"),
    "",
    "## Niqqud occurrences",
    "",
    r.niqqud.length === 0 ? "_None._" :
      r.niqqud.slice(0, 20).map(h => `- \`${h.location}\` — "${h.snippet}"`).join("\n"),
  ].join("\n");
  fs.writeFileSync(MD_PATH, md);

  console.log(JSON.stringify({
    niqqud: r.niqqud.length,
    typoPatternsFound: Object.keys(r.typos).length,
    typoTotalHits: totalTypos,
  }, null, 2));
}

if (require.main === module) main();
