#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { loadQuestionBanks } = require("./report_question_quality.js");
const { stableHash } = require("./audit_distractors.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "QUESTION_QA_CHECKLIST.json");
const MD_PATH = path.join(ROOT, "QUESTION_QA_CHECKLIST.md");
const REPORT_DATE = new Date().toISOString().slice(0,10);
const SAMPLE_RATIO = 0.1;
const HARD_LEVEL = 4;
const MAX_GATE_ROWS = 80;

const BASE_CHECKS = [
  "correct-answer-verified",
  "explanation-matches-answer",
  "prerequisites-and-terms-covered",
  "difficulty-fits-lesson-order",
  "hebrew-is-clear",
];

const MC_CHECKS = [
  "four-options-exactly",
  "distractors-are-common-mistakes",
  "no-guessing-cues",
];

const FILL_CHECKS = [
  "single-clear-blank",
  "answer-not-leaked",
  "hint-narrows-without-revealing",
];

const REQUIRED_GATE_CODES = [
  "missingPrerequisites",
  "missingGlossaryTerms",
  "hardQuestionWithoutAid",
  "repeatedLowSignalExplanation",
];

const COMPLEX_CONCEPT_PATTERNS = [
  /::.*\b(API|SDK|RAG|JWT|ORM|SQL|CI|CD|SSR|SSG|ISR)\b/i,
  /::.*\b(auth|authorization|authentication|middleware|guardrail|embedding|vector|streaming|schema|migration|deployment|provider|repository)\b/i,
  /^(lesson_ai_engineering|lesson_auth_security|lesson_devops_deploy|lesson_design_systems|lesson_nestjs|lesson_nextjs|lesson_sql_orm)::/i,
];

function allQuestions() {
  const bank = loadQuestionBanks();
  return [...bank.mc, ...bank.fill].map((q) => ({
    id: q.id || "unknown",
    kind: q.kind,
    source: q.source,
    conceptKey: q.conceptKey || null,
    level: typeof q.level === "number" ? q.level : null,
    prompt: q.kind === "mc" ? q.question || "" : q.code || "",
  }));
}

function deterministicSample(questions, ratio = SAMPLE_RATIO) {
  const sampleSize = Math.ceil(questions.length * ratio);
  return [...questions]
    .map((q) => ({
      q,
      key: stableHash(`${q.id}|${q.kind}|${q.conceptKey || ""}|${q.prompt}`),
    }))
    .sort((a, b) => a.key - b.key || a.q.id.localeCompare(b.q.id))
    .slice(0, sampleSize)
    .map(({ q }, index) => ({
      ...q,
      order: index + 1,
      reviewStatus: "pending",
      checks: [...BASE_CHECKS, ...(q.kind === "mc" ? MC_CHECKS : FILL_CHECKS)],
    }));
}

function dataFilesMatching(pattern) {
  return fs.readdirSync(DATA_DIR)
    .filter((file) => pattern.test(file))
    .sort((a, b) => a.localeCompare(b));
}

function loadDataSandbox(files) {
  const sandbox = { window: {}, console };
  files.forEach((file) => {
    const code = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
    vm.runInNewContext(code, sandbox, { filename: file });
    if (sandbox.CONCEPT_PREREQUISITES && !sandbox.window.CONCEPT_PREREQUISITES) {
      sandbox.window.CONCEPT_PREREQUISITES = sandbox.CONCEPT_PREREQUISITES;
    }
  });
  return sandbox;
}

function loadGlossary() {
  const sandbox = loadDataSandbox(["glossary.js"]);
  return sandbox.window.GLOSSARY || sandbox.GLOSSARY || {};
}

function loadConceptPrerequisites() {
  const files = ["prerequisites.js", ...dataFilesMatching(/^svcollege_prerequisites_.*\.js$/)];
  const sandbox = loadDataSandbox(files);
  const maps = [sandbox.CONCEPT_PREREQUISITES || sandbox.window.CONCEPT_PREREQUISITES || {}];
  Object.keys(sandbox)
    .filter((key) => /^SVCOLLEGE_.*_PREREQUISITES$/.test(key))
    .forEach((key) => maps.push(sandbox[key]));
  return Object.assign({}, ...maps);
}

function svcollegeQuestionPrompt(q, kind) {
  if (kind === "fill") return q.code || "";
  if (kind === "bugHunt") return q.brokenCode || q.title || "";
  return q.question || q.title || "";
}

function loadSvcollegeQuestions() {
  const files = dataFilesMatching(/^svcollege_questions_.*\.js$/);
  const sandbox = loadDataSandbox(files);
  return Object.keys(sandbox)
    .filter((key) => /^SVCOLLEGE_.*_QUESTIONS$/.test(key))
    .sort((a, b) => a.localeCompare(b))
    .flatMap((key) => {
      const moduleQuestions = sandbox[key] || {};
      return ["mc", "fill", "bugHunt"].flatMap((kind) =>
        (moduleQuestions[kind] || []).map((q) => ({
          ...q,
          id: q.id || "unknown",
          kind,
          source: "svcollege",
          moduleKey: key,
          lessonId: moduleQuestions.lessonId || null,
          conceptKey: q.conceptKey || null,
          level: typeof q.level === "number" ? q.level : null,
          prompt: svcollegeQuestionPrompt(q, kind),
        })),
      );
    })
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[\u0591-\u05C7]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function stableList(value) {
  const seen = new Set();
  return (Array.isArray(value) ? value : [])
    .map((item) => String(item || "").trim())
    .filter((item) => {
      if (!item || seen.has(item)) return false;
      seen.add(item);
      return true;
    });
}

function isHardQuestion(q) {
  return typeof q.level === "number" && q.level >= HARD_LEVEL;
}

function hasComplexConcept(q) {
  return stableList([q.conceptKey, ...(Array.isArray(q.conceptKeys) ? q.conceptKeys : [])])
    .some((key) => COMPLEX_CONCEPT_PATTERNS.some((pattern) => pattern.test(key)));
}

function sideExplanationSource(q) {
  const explicitSource = String(q.sideExplanationSource || "").trim();
  const text = String(q.sideExplanation || "").trim();
  if (explicitSource && text) return explicitSource;
  if (text) return "question.sideExplanation";
  return "";
}

function glossaryTermSet(glossary) {
  return new Set(Object.keys(glossary || {}).map((term) => normalizeText(term)));
}

function missingGlossaryTerms(requiredTerms, glossaryTerms) {
  return requiredTerms.filter((term) => !glossaryTerms.has(normalizeText(term)));
}

function isLowSignalExplanation(text) {
  const normalized = normalizeText(text);
  if (!normalized) return true;
  const tokens = normalized.split(" ").filter(Boolean);
  const uniqueTokens = new Set(tokens);
  return normalized.length < 35 || uniqueTokens.size < 5;
}

function repeatedExplanationCounts(questions) {
  return questions.reduce((counts, q) => {
    const key = normalizeText(q.sideExplanation);
    if (!key) return counts;
    counts.set(key, (counts.get(key) || 0) + 1);
    return counts;
  }, new Map());
}

function gateIssue(q, code, message, details = {}) {
  return {
    id: q.id,
    kind: q.kind,
    moduleKey: q.moduleKey,
    conceptKey: q.conceptKey,
    level: q.level,
    code,
    message,
    ...details,
  };
}

function auditSvcollegeQuestion(q, context) {
  const hardQuestion = isHardQuestion(q);
  const complexConcept = hasComplexConcept(q);
  const requiresAid = hardQuestion || complexConcept;
  const requiredConcepts = stableList(q.requiredConcepts);
  const mappedPrerequisites = stableList(context.conceptPrerequisites[q.conceptKey] || []);
  const resolvedRequiredConcepts = requiredConcepts.length ? requiredConcepts : mappedPrerequisites;
  const requiredTerms = stableList(q.requiredTerms);
  const sideSource = sideExplanationSource(q);
  const missingTerms = missingGlossaryTerms(requiredTerms, context.glossaryTerms);
  const issues = [];

  if (requiresAid && resolvedRequiredConcepts.length === 0) {
    issues.push(gateIssue(
      q,
      "missingPrerequisites",
      "Hard or complex SVCollege question has no explicit requiredConcepts and no prerequisite map entry.",
    ));
  }

  if (requiresAid && requiredTerms.length === 0) {
    issues.push(gateIssue(q, "missingGlossaryTerms", "Hard or complex SVCollege question has no requiredTerms contract."));
  } else if (requiresAid && missingTerms.length > 0) {
    issues.push(gateIssue(
      q,
      "missingGlossaryTerms",
      "Required terms are not present in data/glossary.js.",
      { missingTerms },
    ));
  }

  if (hardQuestion && (!sideSource || resolvedRequiredConcepts.length === 0 || requiredTerms.length === 0)) {
    issues.push(gateIssue(
      q,
      "hardQuestionWithoutAid",
      "Hard SVCollege question is missing at least one side-aid contract field.",
      { sideExplanationSource: sideSource || null },
    ));
  }

  const explanationKey = normalizeText(q.sideExplanation);
  if (
    requiresAid &&
    explanationKey &&
    context.explanationCounts.get(explanationKey) > 1 &&
    isLowSignalExplanation(q.sideExplanation)
  ) {
    issues.push(gateIssue(
      q,
      "repeatedLowSignalExplanation",
      "Side explanation text is repeated and too short to be a useful aid.",
      { repeatedCount: context.explanationCounts.get(explanationKey) },
    ));
  }

  return {
    id: q.id,
    kind: q.kind,
    moduleKey: q.moduleKey,
    conceptKey: q.conceptKey,
    level: q.level,
    hardQuestion,
    complexConcept,
    requiresAid,
    requiredConcepts,
    mappedPrerequisites,
    resolvedRequiredConcepts,
    requiredTerms,
    sideExplanationSource: sideSource,
    issues,
  };
}

function summarizeGateRows(rows) {
  const issueCounts = Object.fromEntries(REQUIRED_GATE_CODES.map((code) => [code, 0]));
  rows.forEach((row) => {
    row.issues.forEach((issue) => {
      issueCounts[issue.code] = (issueCounts[issue.code] || 0) + 1;
    });
  });
  return {
    totalQuestions: rows.length,
    hardQuestions: rows.filter((row) => row.hardQuestion).length,
    complexConceptQuestions: rows.filter((row) => row.complexConcept).length,
    questionsRequiringAid: rows.filter((row) => row.requiresAid).length,
    questionsWithIssues: rows.filter((row) => row.issues.length > 0).length,
    totalIssues: Object.values(issueCounts).reduce((sum, count) => sum + count, 0),
    issueCounts,
    ready: Object.values(issueCounts).every((count) => count === 0),
  };
}

function buildSvcollegePrerequisiteGate() {
  const questions = loadSvcollegeQuestions();
  const context = {
    conceptPrerequisites: loadConceptPrerequisites(),
    glossaryTerms: glossaryTermSet(loadGlossary()),
    explanationCounts: repeatedExplanationCounts(questions),
  };
  const rows = questions.map((q) => auditSvcollegeQuestion(q, context));
  const issues = rows
    .flatMap((row) => row.issues)
    .sort((a, b) => {
      const codeCompare = a.code.localeCompare(b.code);
      if (codeCompare) return codeCompare;
      return stableHash(`${a.id}|${a.code}|${a.message}`) - stableHash(`${b.id}|${b.code}|${b.message}`);
    });

  return {
    gateVersion: "svcollege-prerequisite-gate-v1",
    hardLevel: HARD_LEVEL,
    issueCodes: REQUIRED_GATE_CODES,
    summary: summarizeGateRows(rows),
    issues,
    rows,
  };
}

function summarize(totalQuestions, sample) {
  return {
    totalQuestions,
    sampleRatio: SAMPLE_RATIO,
    sampleSize: sample.length,
    mc: sample.filter((item) => item.kind === "mc").length,
    fill: sample.filter((item) => item.kind === "fill").length,
    manual: sample.filter((item) => item.source === "manual").length,
  };
}

function buildChecklist() {
  const questions = allQuestions();
  const sample = deterministicSample(questions);
  const svcollegePrerequisiteGate = buildSvcollegePrerequisiteGate();
  return {
    reportVersion: "question-qa-checklist-v2",
    date: REPORT_DATE,
    policy: {
      deterministic: true,
      sampleRatio: SAMPLE_RATIO,
      manualReviewRequired: true,
      noFakeData: true,
      svcollegePrerequisiteGate: true,
    },
    summary: summarize(questions.length, sample),
    gates: {
      svcollegePrerequisites: svcollegePrerequisiteGate,
    },
    checks: {
      base: BASE_CHECKS,
      mc: MC_CHECKS,
      fill: FILL_CHECKS,
    },
    sample,
  };
}

function preview(text, maxLength = 110) {
  const compact = String(text || "").replace(/\s+/g, " ").trim();
  if (compact.length <= maxLength) return compact;
  return `${compact.slice(0, maxLength - 1)}...`;
}

function buildMarkdown(checklist) {
  const s = checklist.summary;
  const gate = checklist.gates.svcollegePrerequisites;
  const gateSummary = gate.summary;
  const lines = [
    "# Question QA Checklist — Deterministic Sample + SVCollege Prerequisite Gate",
    "",
    "Manual QA checklist for the fixed 10% question sample plus a deterministic SVCollege prerequisite gate. The sample is selected by stable hash over question identity and content, so reviewers get the same rows on every run.",
    "",
    "## Summary",
    "",
    `- Date: ${checklist.date}`,
    `- Total questions: ${s.totalQuestions}`,
    `- Sample ratio: ${Math.round(s.sampleRatio * 100)}%`,
    `- Sample size: ${s.sampleSize}`,
    `- Sample mix: ${s.mc} MC, ${s.fill} Fill`,
    `- Source mix: ${s.manual} manual`,
    "",
    "## SVCollege Prerequisite Gate",
    "",
    `- Gate version: ${gate.gateVersion}`,
    `- Hard question threshold: level >= ${gate.hardLevel}`,
    `- SVCollege questions checked: ${gateSummary.totalQuestions}`,
    `- Questions requiring aid: ${gateSummary.questionsRequiringAid}`,
    `- Questions with issues: ${gateSummary.questionsWithIssues}`,
    `- Total gate issues: ${gateSummary.totalIssues}`,
    `- missingPrerequisites: ${gateSummary.issueCounts.missingPrerequisites}`,
    `- missingGlossaryTerms: ${gateSummary.issueCounts.missingGlossaryTerms}`,
    `- hardQuestionWithoutAid: ${gateSummary.issueCounts.hardQuestionWithoutAid}`,
    `- repeatedLowSignalExplanation: ${gateSummary.issueCounts.repeatedLowSignalExplanation}`,
    `- Ready: ${gateSummary.ready ? "yes" : "no"}`,
    "",
    "### Gate Issue Sample",
    "",
    "| # | Code | ID | Kind | Concept | Level | Details |",
    "|---:|---|---|---|---|---:|---|",
  ];

  gate.issues.slice(0, MAX_GATE_ROWS).forEach((issue, index) => {
    const details = issue.missingTerms
      ? `Missing glossary terms: ${issue.missingTerms.slice(0, 8).map((term) => `\`${term}\``).join(", ")}${issue.missingTerms.length > 8 ? ", ..." : ""}`
      : issue.message;
    lines.push(
      `| ${index + 1} | ${issue.code} | \`${issue.id}\` | ${issue.kind} | \`${issue.conceptKey || "unknown"}\` | ${issue.level ?? ""} | ${details} |`,
    );
  });

  if (gate.issues.length > MAX_GATE_ROWS) {
    lines.push(`|  |  |  |  |  |  | ${gate.issues.length - MAX_GATE_ROWS} more issues in QUESTION_QA_CHECKLIST.json |`);
  }

  if (gate.issues.length === 0) {
    lines.push("| 1 | clean | `none` |  |  |  | No prerequisite gate issues found. |");
  }

  lines.push(
    "",
    "### Closure Tasks",
    "",
    "- Add real glossary entries for missing requiredTerms before surfacing those terms as hover/side aids.",
    "- Add explicit requiredConcepts or concept prerequisite map rows for any future missingPrerequisites issue.",
    "- Replace any repeatedLowSignalExplanation with question-specific sideExplanation text tied to the actual misconception.",
    "",
    "## Required Checks",
    "",
    "- Correct answer verified against lesson content.",
    "- Explanation matches the answer and identifies the misconception.",
    "- Prerequisites and unfamiliar terms are covered by the side-aid.",
    "- Difficulty fits the lesson order and does not require future material.",
    "- Hebrew wording is clear and does not allow guessing.",
    "- MC only: exactly four options, plausible distractors, no length/absolute-wording cues.",
    "- Fill only: one clear blank, answer is not leaked, hint narrows without revealing.",
    "",
    "## Sample",
    "",
    "| # | Status | ID | Kind | Source | Concept | Level | Prompt Preview | Checks |",
    "|---:|---|---|---|---|---|---:|---|---|",
  );

  checklist.sample.forEach((item) => {
    lines.push(
      `| ${item.order} | pending | \`${item.id}\` | ${item.kind} | ${item.source} | \`${item.conceptKey || "unknown"}\` | ${item.level ?? ""} | ${preview(item.prompt)} | ${item.checks.map((check) => `[ ] ${check}`).join("<br>")} |`,
    );
  });

  lines.push(
    "",
    "## Review Outcome",
    "",
    "Copy failed rows into the PR evidence with the fix commit. A sampled question is accepted only when every required check is marked complete.",
    "",
  );

  return `${lines.join("\n")}\n`;
}

function writeReports(checklist) {
  fs.writeFileSync(JSON_PATH, `${JSON.stringify(checklist, null, 2)}\n`);
  fs.writeFileSync(MD_PATH, buildMarkdown(checklist));
}

function assertStrict(checklist) {
  const expected = Math.ceil(checklist.summary.totalQuestions * SAMPLE_RATIO);
  const ids = new Set(checklist.sample.map((item) => item.id));
  if (checklist.sample.length !== expected) {
    throw new Error(`Expected ${expected} QA rows, got ${checklist.sample.length}.`);
  }
  if (ids.size !== checklist.sample.length) {
    throw new Error("QA sample contains duplicate question ids.");
  }
  const gate = checklist.gates && checklist.gates.svcollegePrerequisites;
  if (!gate) {
    throw new Error("Missing SVCollege prerequisite gate.");
  }
  REQUIRED_GATE_CODES.forEach((code) => {
    if (!Object.prototype.hasOwnProperty.call(gate.summary.issueCounts, code)) {
      throw new Error(`Missing SVCollege prerequisite gate issue count: ${code}.`);
    }
  });
  if (!gate.summary.ready || gate.summary.totalIssues > 0) {
    throw new Error(`SVCollege prerequisite gate is not ready: ${gate.summary.totalIssues} issues.`);
  }
}

function run(argv = process.argv.slice(2)) {
  const checklist = buildChecklist();
  if (argv.includes("--strict")) {
    assertStrict(checklist);
  }
  if (argv.includes("--write")) {
    writeReports(checklist);
  }
  if (argv.includes("--summary")) {
    process.stdout.write(`${JSON.stringify({
      reportVersion: checklist.reportVersion,
      date: checklist.date,
      policy: checklist.policy,
      summary: checklist.summary,
      gates: {
        svcollegePrerequisites: checklist.gates.svcollegePrerequisites.summary,
      },
    }, null, 2)}\n`);
  } else if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(checklist, null, 2)}\n`);
  } else {
    process.stdout.write(buildMarkdown(checklist));
  }
  return checklist;
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
  BASE_CHECKS,
  FILL_CHECKS,
  MC_CHECKS,
  allQuestions,
  assertStrict,
  buildChecklist,
  buildMarkdown,
  deterministicSample,
  buildSvcollegePrerequisiteGate,
  loadSvcollegeQuestions,
  run,
  summarize,
};
