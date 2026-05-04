#!/usr/bin/env node
"use strict";

// scripts/audit_bidi.js
//
// Scan all lesson "levels" text for Hebrew characters immediately adjacent to
// Latin/camelCase identifiers without LTR isolation. The Unicode bidi algorithm
// can misplace English words that are adjacent to Hebrew letters.
//
// Highest-risk pattern: Hebrew definite article ה fused directly with English
// identifier (e.g. הPromise, הbody, לreFactor).
//
// Output: BIDI_AUDIT.json + BIDI_AUDIT.md

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { byFilename } = require("./lib/sort.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "BIDI_AUDIT.json");
const MD_PATH = path.join(ROOT, "BIDI_AUDIT.md");

// Hebrew Unicode range: U+0590–U+05FF
const HEB_RE = /[֐-׿]/;
// Pattern: Hebrew letter(s) immediately followed by ASCII uppercase or multi-char ASCII
// הPromise / לreFactor / הbody / עPromise etc.
const FUSED_HEB_LATIN_RE = /[֐-׿][A-Za-z]{2,}/g;
// Also: ASCII identifier immediately followed by Hebrew (less common but possible)
const FUSED_LATIN_HEB_RE = /[A-Za-z]{2,}[֐-׿]/g;

function loadAll() {
  const sandbox = { window: {}, console };
  fs.readdirSync(DATA_DIR).filter(f => f.endsWith(".js")).sort(byFilename).forEach(f => {
    vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, f), "utf8"), sandbox, { filename: f });
  });
  return sandbox;
}

function extractSnippet(text, matchIndex, radius = 40) {
  const start = Math.max(0, matchIndex - radius);
  const end = Math.min(text.length, matchIndex + radius);
  return text.slice(start, end).replace(/\n/g, "↵");
}

function scanText(text, location, flags) {
  if (!text || typeof text !== "string") return;
  let m;

  // Hebrew → Latin fused
  FUSED_HEB_LATIN_RE.lastIndex = 0;
  while ((m = FUSED_HEB_LATIN_RE.exec(text)) !== null) {
    const match = m[0];
    flags.push({
      location,
      type: "heb-then-latin",
      match,
      snippet: extractSnippet(text, m.index),
    });
  }

  // Latin → Hebrew fused (less severe, flag anyway)
  FUSED_LATIN_HEB_RE.lastIndex = 0;
  while ((m = FUSED_LATIN_HEB_RE.exec(text)) !== null) {
    const match = m[0];
    // Skip if it looks like a URL or code token boundary (e.g. someFunc()ה won't happen in practice)
    if (/https?:/.test(match)) continue;
    flags.push({
      location,
      type: "latin-then-heb",
      match,
      snippet: extractSnippet(text, m.index),
    });
  }
}

function run() {
  const sandbox = loadAll();
  const lessons = Object.values(sandbox).filter(v => v && typeof v.id === "string" && Array.isArray(v.concepts));
  const flags = [];

  lessons.forEach(lesson => {
    (lesson.concepts || []).forEach(c => {
      const base = `${lesson.id}::${c.conceptName}`;
      if (c.levels) {
        Object.entries(c.levels).forEach(([level, text]) => {
          scanText(text, `${base}::levels.${level}`, flags);
        });
      }
      scanText(c.codeExplanation, `${base}::codeExplanation`, flags);
      scanText(c.illustration, `${base}::illustration`, flags);
    });
  });

  // Also scan question bank
  const bank = sandbox.QUESTIONS_BANK || { mc: [], fill: [] };
  (bank.mc || []).forEach(q => {
    scanText(q.question, `${q.id}::question`, flags);
    scanText(q.explanation, `${q.id}::explanation`, flags);
  });
  (bank.fill || []).forEach(q => {
    scanText(q.hint, `${q.id}::hint`, flags);
    scanText(q.explanation, `${q.id}::explanation`, flags);
  });

  return flags;
}

function main() {
  const flags = run();
  fs.writeFileSync(JSON_PATH, JSON.stringify(flags, null, 2));

  // Group by type
  const hebLatin = flags.filter(f => f.type === "heb-then-latin");
  const latinHeb = flags.filter(f => f.type === "latin-then-heb");

  // Find most frequent fused patterns
  const matchFreq = {};
  flags.forEach(f => {
    matchFreq[f.match] = (matchFreq[f.match] || 0) + 1;
  });
  const topMatches = Object.entries(matchFreq).sort((a,b) => b[1]-a[1]).slice(0, 20);

  const md = [
    "# Bidi Audit — Hebrew/Latin Fusion",
    "",
    `_Generated: ${new Date().toISOString().slice(0, 10)}_`,
    "",
    "## Summary",
    `- Total flags: **${flags.length}**`,
    `- Hebrew → Latin fused: **${hebLatin.length}**`,
    `- Latin → Hebrew fused: **${latinHeb.length}**`,
    "",
    "## Most common fused patterns",
    "",
    "| Pattern | Count |",
    "|---|---:|",
    ...topMatches.map(([pat, n]) => `| \`${pat}\` | ${n} |`),
    "",
    "## Hebrew → Latin flags (sample, first 60)",
    "",
    ...hebLatin.slice(0, 60).map(f =>
      `- \`${f.match}\` @ \`${f.location}\`\n  > …${f.snippet}…`
    ),
    "",
    "## Latin → Hebrew flags (sample, first 20)",
    "",
    ...latinHeb.slice(0, 20).map(f =>
      `- \`${f.match}\` @ \`${f.location}\`\n  > …${f.snippet}…`
    ),
  ].join("\n");

  fs.writeFileSync(MD_PATH, md);

  console.log(`Total bidi flags: ${flags.length}`);
  console.log(`  Heb→Latin: ${hebLatin.length}`);
  console.log(`  Latin→Heb: ${latinHeb.length}`);
  console.log("\nTop 10 fused patterns:");
  topMatches.slice(0, 10).forEach(([pat, n]) => console.log(`  ${n}x  ${pat}`));
}

if (require.main === module) main();
