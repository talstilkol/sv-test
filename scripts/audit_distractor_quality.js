#!/usr/bin/env node
"use strict";

// scripts/audit_distractor_quality.js
//
// Heuristic check on MC distractor quality. For each MC question:
//   1. Length skew — correct answer shouldn't be much longer/shorter than
//      distractors (a "way longer" answer is a giveaway).
//   2. Length collisions — at least one distractor should differ by ≥10%.
//   3. Word uniqueness — each option should have at least one unique word.
//   4. "All of the above" / "None of the above" overuse.
//   5. Empty / placeholder options ("...", "TBD", "—").
//
// Outputs DISTRACTOR_QUALITY_REPORT.json + .md with concrete flags.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "DISTRACTOR_QUALITY_REPORT.json");
const MD_PATH = path.join(ROOT, "DISTRACTOR_QUALITY_REPORT.md");

function loadBank() {
  const sandbox = { window: {}, console };
  fs.readdirSync(DATA_DIR).filter(f => f.endsWith(".js")).sort().forEach(f => {
    vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, f), "utf8"), sandbox, { filename: f });
  });
  return sandbox.QUESTIONS_BANK || { mc: [] };
}

function tokenize(s) {
  return String(s || "").toLowerCase().split(/[\s\-,.;:!?'"`{}()\[\]]+/).filter(Boolean);
}

function audit(q) {
  const issues = [];
  if (!Array.isArray(q.options) || q.options.length < 2) {
    issues.push("options-missing");
    return issues;
  }
  if (typeof q.correctIndex !== "number" || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
    issues.push("correctIndex-invalid");
    return issues;
  }
  const lengths = q.options.map(o => String(o || "").length);
  const correctLen = lengths[q.correctIndex];
  const distractorLens = lengths.filter((_, i) => i !== q.correctIndex);
  const avgDistractor = distractorLens.reduce((s, n) => s + n, 0) / distractorLens.length;

  // 1. Length skew >2x average distractor → giveaway
  if (avgDistractor > 0 && correctLen / avgDistractor > 2.5) {
    issues.push(`correct-much-longer (${correctLen} vs avg ${Math.round(avgDistractor)})`);
  }
  if (correctLen > 0 && avgDistractor / correctLen > 2.5) {
    issues.push(`correct-much-shorter (${correctLen} vs avg ${Math.round(avgDistractor)})`);
  }

  // 2. All options identical length (less of a problem but flag if all 4 are within ±2 chars)
  const lenSpread = Math.max(...lengths) - Math.min(...lengths);
  if (lengths.length === 4 && lenSpread <= 2 && Math.min(...lengths) > 5) {
    // Suspiciously uniform — typically a sign of cargo-culting
    issues.push("lengths-too-uniform");
  }

  // 3. Empty / placeholder options
  q.options.forEach((opt, i) => {
    const trimmed = String(opt || "").trim();
    if (!trimmed || trimmed === "..." || trimmed === "—" || trimmed === "TBD" || trimmed === "TODO") {
      issues.push(`option-${i}-placeholder`);
    }
  });

  // 4. Word uniqueness — each option needs at least 1 word that doesn't appear in others
  const tokenLists = q.options.map(tokenize);
  tokenLists.forEach((tokens, i) => {
    const others = new Set();
    tokenLists.forEach((tList, j) => {
      if (i !== j) tList.forEach(t => others.add(t));
    });
    const unique = tokens.filter(t => t.length > 2 && !others.has(t));
    if (tokens.length > 0 && unique.length === 0) {
      issues.push(`option-${i}-no-unique-words`);
    }
  });

  // 5. "All of the above" / "None of the above" — common crutch
  const aboveText = q.options.map(o => String(o || "").toLowerCase());
  if (aboveText.some(o => /(?:כל הנ"ל|כל האפשרויות|all of the above|none of the above|אף אחד מהנ"ל)/.test(o))) {
    issues.push("uses-all-or-none-of-the-above");
  }

  return issues;
}

function run() {
  const bank = loadBank();
  const total = (bank.mc || []).length;
  const flagged = [];
  const issueCount = {};
  bank.mc.forEach(q => {
    const issues = audit(q);
    if (issues.length) {
      flagged.push({ id: q.id, conceptKey: q.conceptKey, issues });
      issues.forEach(iss => {
        const key = iss.split(" ")[0];
        issueCount[key] = (issueCount[key] || 0) + 1;
      });
    }
  });

  return {
    total,
    flaggedCount: flagged.length,
    flaggedPct: Math.round(flagged.length / total * 1000) / 10,
    issueCount,
    flagged,
  };
}

function main() {
  const r = run();
  fs.writeFileSync(JSON_PATH, JSON.stringify(r, null, 2));

  const md = [
    "# Distractor Quality Audit",
    "",
    `_Generated: ${new Date().toISOString().slice(0, 10)}_`,
    "",
    `## Summary`,
    `- MC questions: ${r.total}`,
    `- Flagged: ${r.flaggedCount} (${r.flaggedPct}%)`,
    "",
    "## Issue counts",
    "",
    "| Issue | Count |",
    "|---|---:|",
    ...Object.entries(r.issueCount)
      .sort((a, b) => b[1] - a[1])
      .map(([k, n]) => `| ${k} | ${n} |`),
    "",
    "## Top 50 flagged questions",
    "",
    ...r.flagged.slice(0, 50).map(f => `- \`${f.id}\` (${f.conceptKey}): ${f.issues.join(", ")}`),
  ].join("\n");
  fs.writeFileSync(MD_PATH, md);

  console.log(JSON.stringify({
    total: r.total,
    flagged: r.flaggedCount,
    pct: r.flaggedPct + "%",
    topIssues: Object.entries(r.issueCount).sort((a, b) => b[1] - a[1]).slice(0, 5),
  }, null, 2));
}

if (require.main === module) main();
