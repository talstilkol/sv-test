#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadQuestionBanks } = require("./report_question_quality.js");
const { stableHash } = require("./audit_distractors.js");

const ROOT = path.resolve(__dirname, "..");
const JSON_PATH = path.join(ROOT, "QUESTION_QA_CHECKLIST.json");
const MD_PATH = path.join(ROOT, "QUESTION_QA_CHECKLIST.md");
const REPORT_DATE = "2026-04-28";
const SAMPLE_RATIO = 0.1;

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

function summarize(totalQuestions, sample) {
  return {
    totalQuestions,
    sampleRatio: SAMPLE_RATIO,
    sampleSize: sample.length,
    mc: sample.filter((item) => item.kind === "mc").length,
    fill: sample.filter((item) => item.kind === "fill").length,
    curated: sample.filter((item) => item.source === "curated").length,
    seeded: sample.filter((item) => item.source === "seeded").length,
  };
}

function buildChecklist() {
  const questions = allQuestions();
  const sample = deterministicSample(questions);
  return {
    reportVersion: "question-qa-checklist-v1",
    date: REPORT_DATE,
    policy: {
      deterministic: true,
      sampleRatio: SAMPLE_RATIO,
      manualReviewRequired: true,
      noFakeData: true,
    },
    summary: summarize(questions.length, sample),
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
  const lines = [
    "# Question QA Checklist — 10% Deterministic Sample",
    "",
    "Manual QA checklist for the fixed 10% question sample. The sample is selected by stable hash over question identity and content, so reviewers get the same rows on every run.",
    "",
    "## Summary",
    "",
    `- Date: ${checklist.date}`,
    `- Total questions: ${s.totalQuestions}`,
    `- Sample ratio: ${Math.round(s.sampleRatio * 100)}%`,
    `- Sample size: ${s.sampleSize}`,
    `- Sample mix: ${s.mc} MC, ${s.fill} Fill`,
    `- Source mix: ${s.curated} curated, ${s.seeded} seeded`,
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
  ];

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
  run,
  summarize,
};
