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
const QUEUE_JSON_PATH = path.join(ROOT, "DISTRACTOR_REMEDIATION_QUEUE.json");
const QUEUE_MD_PATH = path.join(ROOT, "DISTRACTOR_REMEDIATION_QUEUE.md");

const ISSUE_PRIORITY = {
  "correct-much-longer": 1,
  "option-no-unique-words": 2,
  "correct-much-shorter": 3,
  "lengths-too-uniform": 4,
  "uses-all-or-none-of-the-above": 5,
};

const EXAM_HEAT_BY_LESSON = {
  24: 10, 25: 10, 26: 10,
  20: 9, 22: 9, 23: 9, 27: 9,
  17: 8, 18: 8, 21: 8,
  11: 8, 19: 8,
};

const EXAM_CRITICAL_LESSONS = new Set([11, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]);
const LESSON_PRIORITY_ORDER = [19, 11, 17, 24, 25, 26, 20, 22, 23, 27, 18, 21];
const LESSON_PRIORITY_RANK = LESSON_PRIORITY_ORDER.reduce((acc, lessonId, idx) => {
  acc[lessonId] = idx + 1;
  return acc;
}, {});
const TECHNICAL_SHORT_TOKENS = new Set(["ai", "cd", "ci", "db", "id", "js", "kv", "ts", "ui"]);

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

function isMeaningfulUniqueToken(token) {
  const value = String(token || "");
  return value.length > 2 || /^-?\d+(?:\.\d+)?$/.test(value) || TECHNICAL_SHORT_TOKENS.has(value.toLowerCase());
}

function normalizeIssue(issue) {
  if (!issue) return "unknown";
  const issueCode = String(issue).split(" ")[0];
  if (/^option-\d+-no-unique-words$/.test(issueCode)) return "option-no-unique-words";
  if (/^option-\d+-placeholder$/.test(issueCode)) return "option-placeholder";
  return issueCode;
}

function countIssues(flagged) {
  return flagged.reduce((acc, item) => {
    item.issues.forEach((issue) => {
      const key = normalizeIssue(issue);
      acc[key] = (acc[key] || 0) + 1;
    });
    return acc;
  }, {});
}

function extractLessonId(conceptKey) {
  const match = String(conceptKey || "").match(/lesson_(\d+)/);
  return match ? Number(match[1]) : null;
}

function getHeat(conceptKey) {
  const lessonId = extractLessonId(conceptKey);
  if (lessonId && EXAM_HEAT_BY_LESSON[lessonId]) return EXAM_HEAT_BY_LESSON[lessonId];
  if (/next/i.test(String(conceptKey || ""))) return 8;
  return 3;
}

function isExamCriticalConcept(conceptKey) {
  const lessonId = extractLessonId(conceptKey);
  if (lessonId && EXAM_CRITICAL_LESSONS.has(lessonId)) return true;
  return /lesson_nextjs::|workbook_taskmanager/i.test(String(conceptKey || ""));
}

function getLessonRank(conceptKey) {
  const lessonId = extractLessonId(conceptKey);
  if (!lessonId) return 999;
  return LESSON_PRIORITY_RANK[lessonId] || 999;
}

function recommendAction(issueCode) {
  if (issueCode === "correct-much-longer") {
    return "הרחב/י את המסיחים להיות מפורטים באותה רמה או קצר/י את התשובה הנכונה כך שהיחס לא יעלה על 2.5x.";
  }
  if (issueCode === "option-no-unique-words") {
    return "החלף/י מסיח כללי במסיח שמייצג טעות תלמיד אמיתית עם מונחים ייחודיים, והוסף/י optionFeedback.";
  }
  if (issueCode === "correct-much-shorter") {
    return "קצר/י מסיחים ארוכים מדי או חדד/י את התשובה הנכונה כדי למנוע רמז אורך הפוך.";
  }
  if (issueCode === "lengths-too-uniform") {
    return "פזר/י מעט את אורכי האופציות בלי לפגוע באיכות כדי למנוע תבנית מלאכותית.";
  }
  if (issueCode === "uses-all-or-none-of-the-above") {
    return "החלף/י 'הכול/אף אחד' במסיחים קונקרטיים שניתנים להפרכה לפי החומר.";
  }
  if (issueCode === "option-placeholder") {
    return "החלף/י placeholder במסיח תקף שמייצג misconception אמיתי.";
  }
  return "שפר/י ניסוח אופציות כך שכל המסיחים יהיו סבירים וללא רמזי ניחוש.";
}

function buildSourceIndex() {
  const index = new Map();
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith(".js")).sort();
  files.forEach((file) => {
    const fullPath = path.join(DATA_DIR, file);
    const code = fs.readFileSync(fullPath, "utf8");
    const regex = /id\s*:\s*["'`]([^"'`]+)["'`]|"id"\s*:\s*["'`]([^"'`]+)["'`]/g;
    let match = null;
    while ((match = regex.exec(code)) !== null) {
      const id = match[1] || match[2];
      if (id && !index.has(id)) {
        index.set(id, fullPath);
      }
    }
  });
  return index;
}

function buildQueue(report, sourceIndex) {
  const rows = [];
  report.flagged.forEach((item) => {
    const heat = getHeat(item.conceptKey);
    const examCritical = isExamCriticalConcept(item.conceptKey);
    const lessonRank = getLessonRank(item.conceptKey);
    item.issues.forEach((rawIssue) => {
      const issueCode = normalizeIssue(rawIssue);
      const priority = ISSUE_PRIORITY[issueCode] || 99;
      rows.push({
        id: item.id,
        conceptKey: item.conceptKey || "unknown",
        heat,
        examCritical,
        lessonRank,
        issue: issueCode,
        rawIssue,
        currentOptions: item.options || [],
        recommendedAction: recommendAction(issueCode),
        sourceFile: sourceIndex.get(item.id) || "unknown",
        priority,
      });
    });
  });

  rows.sort((a, b) => {
    if (a.examCritical !== b.examCritical) return a.examCritical ? -1 : 1;
    if (b.heat !== a.heat) return b.heat - a.heat;
    if (a.priority !== b.priority) return a.priority - b.priority;
    if (a.lessonRank !== b.lessonRank) return a.lessonRank - b.lessonRank;
    if (a.conceptKey !== b.conceptKey) return a.conceptKey.localeCompare(b.conceptKey);
    return a.id.localeCompare(b.id);
  });
  return rows;
}

function isAdvisoryOnlyLengthSkew(item) {
  const issueCodes = (item.issues || []).map(normalizeIssue);
  return !isExamCriticalConcept(item.conceptKey) &&
    issueCodes.length > 0 &&
    getHeat(item.conceptKey) > 3 &&
    issueCodes.every((issueCode) => issueCode === "correct-much-longer");
}

function isDeferredOnlyLengthSkew(item) {
  const issueCodes = (item.issues || []).map(normalizeIssue);
  return !isExamCriticalConcept(item.conceptKey) &&
    getHeat(item.conceptKey) <= 3 &&
    issueCodes.length > 0 &&
    issueCodes.every((issueCode) => issueCode === "correct-much-longer");
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
    const unique = tokens.filter(t => isMeaningfulUniqueToken(t) && !others.has(t));
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
  const allFlagged = [];
  const sourceIndex = buildSourceIndex();
  bank.mc.forEach(q => {
    const issues = audit(q);
    if (issues.length) {
      allFlagged.push({ id: q.id, conceptKey: q.conceptKey, issues, options: Array.isArray(q.options) ? q.options : [] });
    }
  });

  const deferred = allFlagged.filter(isDeferredOnlyLengthSkew);
  const advisory = allFlagged.filter((item) => !isDeferredOnlyLengthSkew(item) && isAdvisoryOnlyLengthSkew(item));
  const flagged = allFlagged.filter((item) => !isDeferredOnlyLengthSkew(item) && !isAdvisoryOnlyLengthSkew(item));
  const activeRaw = flagged.concat(advisory);
  const issueCount = countIssues(flagged);
  const advisoryIssueCount = countIssues(advisory);
  const deferredIssueCount = countIssues(deferred);
  const remediationQueue = buildQueue({ flagged }, sourceIndex);
  const advisoryQueue = buildQueue({ flagged: advisory }, sourceIndex);
  const deferredQueue = buildQueue({ flagged: deferred }, sourceIndex);
  const byHeat = remediationQueue.reduce((acc, row) => {
    const key = `heat${row.heat}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const byExamCritical = remediationQueue.reduce((acc, row) => {
    const key = row.examCritical ? "examCritical" : "nonExam";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return {
    total,
    flaggedCount: flagged.length,
    flaggedPct: Math.round(flagged.length / total * 1000) / 10,
    rawFlaggedCount: activeRaw.length,
    rawFlaggedPct: Math.round(activeRaw.length / total * 1000) / 10,
    historicalRawFlaggedCount: allFlagged.length,
    historicalRawFlaggedPct: Math.round(allFlagged.length / total * 1000) / 10,
    advisoryFlaggedCount: advisory.length,
    advisoryFlaggedPct: Math.round(advisory.length / total * 1000) / 10,
    deferredFlaggedCount: deferred.length,
    deferredFlaggedPct: Math.round(deferred.length / total * 1000) / 10,
    issueCount,
    advisoryIssueCount,
    deferredIssueCount,
    flagged,
    advisory,
    deferred,
    byHeat,
    byExamCritical,
    remediationQueue,
    advisoryQueue,
    deferredQueue,
  };
}

function main() {
  const r = run();
  fs.writeFileSync(JSON_PATH, JSON.stringify(r, null, 2));
  fs.writeFileSync(QUEUE_JSON_PATH, JSON.stringify({
    generatedAt: new Date().toISOString(),
    totalItems: r.remediationQueue.length,
    advisoryItems: r.advisoryQueue.length,
    deferredItems: r.deferredQueue.length,
    items: r.remediationQueue,
    advisory: r.advisoryQueue,
    deferred: r.deferredQueue,
  }, null, 2));

  const md = [
    "# Distractor Quality Audit",
    "",
    `_Generated: ${new Date().toISOString().slice(0, 10)}_`,
    "",
    `## Summary`,
    `- MC questions: ${r.total}`,
    `- Actionable flagged: ${r.flaggedCount} (${r.flaggedPct}%)`,
    `- Advisory flagged: ${r.advisoryFlaggedCount} (${r.advisoryFlaggedPct}%)`,
    `- Active raw flagged before advisory split: ${r.rawFlaggedCount} (${r.rawFlaggedPct}%)`,
    `- Deferred non-exam length-only flagged: ${r.deferredFlaggedCount} (${r.deferredFlaggedPct}%)`,
    `- Historical raw flagged before deferred split: ${r.historicalRawFlaggedCount} (${r.historicalRawFlaggedPct}%)`,
    "",
    "## Issue counts",
    "",
    "| Issue | Count |",
    "|---|---:|",
    ...Object.entries(r.issueCount)
      .sort((a, b) => b[1] - a[1])
      .map(([k, n]) => `| ${k} | ${n} |`),
    "",
    "## Advisory issue counts",
    "",
    "| Issue | Count |",
    "|---|---:|",
    ...Object.entries(r.advisoryIssueCount)
      .sort((a, b) => b[1] - a[1])
      .map(([k, n]) => `| ${k} | ${n} |`),
    "",
    "## Deferred issue counts",
    "",
    "| Issue | Count |",
    "|---|---:|",
    ...Object.entries(r.deferredIssueCount)
      .sort((a, b) => b[1] - a[1])
      .map(([k, n]) => `| ${k} | ${n} |`),
    "",
    "## Top 50 flagged questions",
    "",
    ...r.flagged.slice(0, 50).map(f => `- \`${f.id}\` (${f.conceptKey}): ${f.issues.join(", ")}`),
  ].join("\n");
  fs.writeFileSync(MD_PATH, md);

  const queueMd = [
    "# Distractor Remediation Queue",
    "",
    `_Generated: ${new Date().toISOString().slice(0, 10)}_`,
    "",
    `- Total queue items: ${r.remediationQueue.length}`,
    `- Advisory queue items: ${r.advisoryQueue.length}`,
    `- Deferred queue items: ${r.deferredQueue.length}`,
    "",
    "## Prioritized Top 120",
    "",
    "| Priority | Heat | ID | Concept | Issue | Recommended Action | Source |",
    "|---:|---:|---|---|---|---|---|",
    ...r.remediationQueue.slice(0, 120).map((item) =>
      `| ${item.priority} | ${item.heat} | \`${item.id}\` | \`${item.conceptKey}\` | \`${item.issue}\` | ${item.recommendedAction} | \`${item.sourceFile}\` |`
    ),
  ].join("\n");
  fs.writeFileSync(QUEUE_MD_PATH, queueMd);

  console.log(JSON.stringify({
    total: r.total,
    flagged: r.flaggedCount,
    pct: r.flaggedPct + "%",
    rawFlagged: r.rawFlaggedCount,
    rawPct: r.rawFlaggedPct + "%",
    historicalRawFlagged: r.historicalRawFlaggedCount,
    historicalRawPct: r.historicalRawFlaggedPct + "%",
    advisoryFlagged: r.advisoryFlaggedCount,
    advisoryPct: r.advisoryFlaggedPct + "%",
    deferredFlagged: r.deferredFlaggedCount,
    deferredPct: r.deferredFlaggedPct + "%",
    queueItems: r.remediationQueue.length,
    advisoryQueueItems: r.advisoryQueue.length,
    deferredQueueItems: r.deferredQueue.length,
    queueExamCriticalItems: r.byExamCritical.examCritical || 0,
    queueTop: r.remediationQueue.slice(0, 10).map((item) => ({
      id: item.id,
      conceptKey: item.conceptKey,
      examCritical: item.examCritical,
      issue: item.issue,
      heat: item.heat,
      sourceFile: item.sourceFile,
    })),
    topIssues: Object.entries(r.issueCount).sort((a, b) => b[1] - a[1]).slice(0, 5),
    topAdvisoryIssues: Object.entries(r.advisoryIssueCount).sort((a, b) => b[1] - a[1]).slice(0, 5),
    topDeferredIssues: Object.entries(r.deferredIssueCount).sort((a, b) => b[1] - a[1]).slice(0, 5),
  }, null, 2));
}

if (require.main === module) main();

module.exports = {
  audit,
  isMeaningfulUniqueToken,
  isAdvisoryOnlyLengthSkew,
  isDeferredOnlyLengthSkew,
  normalizeIssue,
  run,
  tokenize,
};
