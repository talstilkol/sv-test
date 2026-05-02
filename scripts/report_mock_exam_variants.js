#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "MOCK_EXAM_VARIANTS_REPORT.json");
const MD_PATH = path.join(ROOT, "MOCK_EXAM_VARIANTS_REPORT.md");
const REPORT_DATE = new Date().toISOString().slice(0,10);
const REPORT_VERSION = "mock-exam-variants-v1";
const VARIANT_IDS = ["svcollege-variant-a", "svcollege-variant-b", "svcollege-variant-c"];
const TARGET_SIZE = 55;

function loadData(file, globalName, sandbox = { window: {}, console }) {
  vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, file), "utf8"), sandbox, {
    filename: `data/${file}`,
  });
  return sandbox[globalName] || sandbox.window[globalName];
}

function loadBlueprint() {
  const blueprints = loadData("course_blueprints.js", "COURSE_BLUEPRINTS") || [];
  return blueprints.find((item) => item.id === "svcollege_fullstack_ai");
}

function loadMainQuestions() {
  const sandbox = { window: {}, console };
  loadData("questions_bank.js", "QUESTIONS_BANK", sandbox);
  const curated = sandbox.QUESTIONS_BANK || {};
  return [
    ...(curated.mc || []).map((q) => ({ ...q, kind: "mc", source: "curated" })),
    ...(curated.fill || []).map((q) => ({ ...q, kind: "fill", source: "curated" })),
    ...(curated.trace || []).map((q) => ({ ...q, kind: "trace", source: "curated" })),
    ...(curated.bug || []).map((q) => ({ ...q, kind: "bug", source: "curated" })),
  ].filter((q) => q && q.conceptKey);
}

function stableHash(input) {
  let hash = 2166136261;
  String(input || "").split("").forEach((char) => {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  });
  return hash >>> 0;
}

function questionId(question = {}) {
  return `${question.kind}:${question.id || stableHash([
    question.conceptKey,
    question.question,
    question.code,
    question.codeBlock,
    question.answer,
  ].join("|")).toString(36)}`;
}

function challengeValue(question = {}) {
  return Number(question.challengeLevel ?? question.level ?? question.difficulty ?? 1) || 1;
}

function moduleMatchesQuestion(module, question) {
  const key = String(question.conceptKey || "");
  const lessonIds = Array.isArray(module.lessonIds) ? module.lessonIds : [];
  const conceptKeys = Array.isArray(module.conceptKeys) ? module.conceptKeys : [];
  return conceptKeys.includes(key) || lessonIds.some((lessonId) => key.startsWith(`${lessonId}::`));
}

function sortForVariant(questions, variantId) {
  return questions.slice().sort((a, b) => {
    const scoreA = stableHash(`${variantId}|${questionId(a)}|${a.conceptKey}`);
    const scoreB = stableHash(`${variantId}|${questionId(b)}|${b.conceptKey}`);
    if (scoreA !== scoreB) return scoreA - scoreB;
    const challengeDiff = challengeValue(b) - challengeValue(a);
    if (challengeDiff) return challengeDiff;
    return questionId(a).localeCompare(questionId(b));
  });
}

function composeVariant(variantId, blueprint, bank) {
  const used = new Set();
  const selected = [];
  const moduleCoverage = blueprint.modules.map((module, index) => {
    const moduleQuestions = sortForVariant(
      bank.filter((question) => moduleMatchesQuestion(module, question) && !used.has(questionId(question))),
      `${variantId}|module-${index}`,
    );
    const picked = moduleQuestions[0] || null;
    if (picked) {
      used.add(questionId(picked));
      selected.push(picked);
    }
    return {
      index: index + 1,
      title: module.title,
      questionId: picked ? questionId(picked) : "",
      conceptKey: picked ? picked.conceptKey : "",
      kind: picked ? picked.kind : "",
      covered: Boolean(picked),
    };
  });

  const rest = sortForVariant(
    bank.filter((question) => !used.has(questionId(question))),
    `${variantId}|fill`,
  );
  rest.some((question) => {
    used.add(questionId(question));
    selected.push(question);
    return selected.length >= TARGET_SIZE;
  });

  return {
    id: variantId,
    totalQuestions: selected.length,
    uniqueQuestions: used.size,
    moduleCoverage,
    missingModules: moduleCoverage.filter((item) => !item.covered),
    kindMix: selected.reduce((mix, question) => {
      mix[question.kind] = (mix[question.kind] || 0) + 1;
      return mix;
    }, {}),
  };
}

function buildReport() {
  const blueprint = loadBlueprint();
  if (!blueprint) throw new Error("Missing svcollege_fullstack_ai blueprint");
  const bank = loadMainQuestions();
  const variants = VARIANT_IDS.map((variantId) => composeVariant(variantId, blueprint, bank));
  const blockers = [];
  variants.forEach((variant) => {
    if (variant.totalQuestions < TARGET_SIZE) blockers.push(`${variant.id}:too-few-questions`);
    if (variant.uniqueQuestions !== variant.totalQuestions) blockers.push(`${variant.id}:duplicate-questions`);
    if (variant.missingModules.length) blockers.push(`${variant.id}:missing-modules`);
  });
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "SVCollege AI & Full Stack",
    template: "svcollege_fullstack",
    targetSize: TARGET_SIZE,
    moduleCount: blueprint.modules.length,
    bankSize: bank.length,
    summary: {
      variants: variants.length,
      blockers: blockers.length,
      blockerCodes: blockers,
      passed: blockers.length === 0,
    },
    variants,
  };
}

function toMarkdown(report) {
  return [
    `# Mock Exam Variants Report — ${report.date}`,
    "",
    `- Target: ${report.target}`,
    `- Template: ${report.template}`,
    `- Variants: ${report.summary.variants}`,
    `- Modules: ${report.moduleCount}`,
    `- Question bank: ${report.bankSize}`,
    `- Blockers: ${report.summary.blockers}`,
    "",
    "| Variant | Questions | Unique | Covered modules | Missing | Kind mix |",
    "|---|---:|---:|---:|---:|---|",
    ...report.variants.map((variant) => (
      `| ${variant.id} | ${variant.totalQuestions} | ${variant.uniqueQuestions} | ${variant.moduleCoverage.filter((item) => item.covered).length}/${report.moduleCount} | ${variant.missingModules.length} | ${Object.entries(variant.kindMix).map(([k, v]) => `${k}:${v}`).join(", ")} |`
    )),
    "",
  ].join("\n");
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--write")) {
    fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(MD_PATH, `${toMarkdown(report)}\n`);
  }
  if (argv.includes("--summary")) {
    process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  } else {
    process.stdout.write(`${toMarkdown(report)}\n`);
  }
  if (argv.includes("--strict") && !report.summary.passed) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = {
  buildReport,
  composeVariant,
  moduleMatchesQuestion,
};
