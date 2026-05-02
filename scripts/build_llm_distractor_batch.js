#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const REPORT_JSON_PATH = path.join(ROOT, "LLM_DISTRACTOR_BATCH_REPORT.json");
const REPORT_MD_PATH = path.join(ROOT, "LLM_DISTRACTOR_BATCH_REPORT.md");
const REPORT_DATE = new Date().toISOString().slice(0, 10);
const DEFAULT_BATCH_SIZE = 25;
const DEFAULT_TARGET = 1316;

function parseArgs(argv = process.argv.slice(2)) {
  const args = {
    batchSize: DEFAULT_BATCH_SIZE,
    target: DEFAULT_TARGET,
    summary: false,
    write: false,
    json: false,
    strict: false,
  };

  argv.forEach((entry) => {
    if (!entry.startsWith("--")) return;
    if (entry === "--write") {
      args.write = true;
      return;
    }
    if (entry === "--json") {
      args.json = true;
      return;
    }
    if (entry === "--summary") {
      args.summary = true;
      return;
    }
    if (entry === "--strict") {
      args.strict = true;
      return;
    }
    const [name, value] = entry.slice(2).split("=");
    if (name === "batch-size" && value) args.batchSize = Math.max(1, Number(value) || DEFAULT_BATCH_SIZE);
    if (name === "target" && value) args.target = Math.max(0, Number(value) || DEFAULT_TARGET);
  });
  return args;
}

function readDataValue(file, globalName) {
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, file), "utf8"), sandbox, { filename: file });
  return sandbox[globalName] || sandbox.window[globalName];
}

function hasCompleteOptionFeedback(item) {
  if (!item || !Array.isArray(item.optionFeedback)) return false;
  if (item.optionFeedback.length !== 4) return false;
  return item.optionFeedback.every((line) => typeof line === "string" && line.trim().length > 0);
}

function normalizeText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildPrompt(item) {
  const stem = normalizeText(item.question);
  const options = (item.options || []).slice(0, 4).map((option, index) => `${index + 1}. ${normalizeText(option)}`);
  return [
    "צור 4 הסברי דיפטראקטור קצרים ומדויקים בעברית עבור השאלה הבאה.",
    "",
    `ID: ${item.id}`,
    `lesson: ${item.topicId || "unknown/unavailable"}`,
    `conceptKey: ${item.conceptKey || "unknown/unavailable"}`,
    `level: ${item.level == null ? "unknown/unavailable" : item.level}`,
    "",
    `שאלה: ${stem}`,
    ...options,
    `\nindex נכון: ${item.correctIndex == null ? "unknown" : Number(item.correctIndex) + 1}`,
    `הסבר מקור (קיים): ${normalizeText(item.explanation) || "unknown/unavailable"}`,
    "",
    "דרישות:",
    "- עבור כל אפשרות, כתוב הסבר מדויק למה היא נכונה/שגויה לפי אותו חומר לימוד.",
    "- שים לב: רק אפשרות אחת נכונה, שלוש שגויות.",
    "- שמור על ניסוח ללא רמיזות לתשובה האחרת.",
    "- פנה לקונספט עצמו בלבד (לא ידע חיצוני).",
    "- החזר בדיוק 4 שורות בלבד, אחת לכל אפשרות, בפורמט JSON: [\"...\",\"...\",\"...\",\"...\"]",
    "",
    "החזר רק אובייקט JSON תקין ללא טקסט פתיחה או הסבר חופשי.",
  ].join("\n");
}

function buildCandidates() {
  const questionBank = readDataValue("questions_bank.js", "QUESTIONS_BANK") || {};
  const optionFeedback = readDataValue("option_feedback.js", "OPTION_FEEDBACK") || {};
  const mc = Array.isArray(questionBank.mc) ? questionBank.mc : [];

  const missing = mc
    .filter((question) => {
      if (!question || !question.id || !Array.isArray(question.options)) return false;
      if (question.options.length < 4) return false;
      const inQuestion = hasCompleteOptionFeedback(question);
      const inMap = hasCompleteOptionFeedback({ optionFeedback: optionFeedback[question.id] });
      return !inQuestion && !inMap;
    })
    .sort((a, b) => {
      const aConcept = String(a.conceptKey || "").localeCompare(String(b.conceptKey || ""));
      if (aConcept !== 0) return aConcept;
      const aLevel = Number(a.level || 0);
      const bLevel = Number(b.level || 0);
      if (aLevel !== bLevel) return bLevel - aLevel;
      return String(a.id).localeCompare(String(b.id));
    })
    .map((question) => {
      const explanation = normalizeText(question.explanation);
      return {
        id: question.id,
        conceptKey: question.conceptKey || "unknown/unavailable",
        topicId: question.topicId || "unknown/unavailable",
        level: Number(question.level || 0),
        question: normalizeText(question.question),
        options: question.options.map((option) => normalizeText(option)),
        correctIndex: Number(question.correctIndex),
        explanation: explanation || "unknown/unavailable",
        prompt: buildPrompt(question),
      };
    });

  return missing;
}

function buildBatches(candidates, batchSize, target) {
  const effective = target > 0 ? candidates.slice(0, target) : candidates;
  const batches = [];
  for (let index = 0; index < effective.length; index += batchSize) {
    const chunk = effective.slice(index, index + batchSize);
    batches.push({
      index: batches.length + 1,
      itemCount: chunk.length,
      start: chunk[0]?.id || "",
      end: chunk[chunk.length - 1]?.id || "",
      questions: chunk.map((item, offset) => ({
        batchOrder: index + offset + 1,
        id: item.id,
        conceptKey: item.conceptKey,
        topicId: item.topicId,
        level: item.level,
        questionStem: item.question,
        options: item.options,
        correctIndex: item.correctIndex,
        explanation: item.explanation,
        prompt: item.prompt,
      })),
    });
  }
  return batches;
}

function buildReport(argv) {
  const candidates = buildCandidates();
  const selectedTarget = Number(argv.target || DEFAULT_TARGET);
  const selectedBatchSize = Number(argv.batchSize || DEFAULT_BATCH_SIZE);
  const selected = selectedTarget > 0 ? candidates.slice(0, selectedTarget) : candidates;
  const batches = buildBatches(selected, selectedBatchSize, selectedTarget);

  return {
    reportVersion: "llm-distractor-batch-v1",
    date: REPORT_DATE,
    policy: {
      manualReviewRequired: true,
      deterministic: true,
      noFakeData: true,
      reviewScope: "optionFeedback only",
      noAutoWrite: true,
    },
    summary: {
      totalMcQuestions: candidates.length,
      targetRequested: selectedTarget || selected.length,
      selectedForBatch: selected.length,
      batchSize: selectedBatchSize,
      batches: batches.length,
      ready: selected.length > 0,
    },
    batches,
    nextStep: "Run with --write to export LLM prompts for review pipeline + manual commit.",
    candidates,
  };
}

function toMarkdown(report) {
  const lines = [
    `# LLM Distractor Feedback Batch — ${report.date}`,
    "",
    `- Total MC questions: ${report.summary.totalMcQuestions}`,
    `- Target requested: ${report.summary.targetRequested}`,
    `- Selected for batch: ${report.summary.selectedForBatch}`,
    `- Batch size: ${report.summary.batchSize}`,
    `- Deterministic: yes`,
    "",
    "## Policy",
    "",
    "- This pipeline prepares prompts בלבד.",
    "- No generated answer content is written to question banks automatically.",
    "- All LLM output must pass manual author review + QA gates before applying.",
    "",
    `## Batches (${report.summary.batches})`,
    "",
  ];

  report.batches.forEach((batch) => {
    lines.push(`### Batch ${batch.index}`);
    lines.push(`- Items: ${batch.itemCount}`);
    lines.push(`- Range: ${batch.start} → ${batch.end}`);
    lines.push("");
    batch.questions.forEach((question) => {
      lines.push(`- ${question.id} (${question.topicId}, ${question.conceptKey}, level ${question.level})`);
    });
    lines.push("");
  });

  if (report.summary.ready) {
    lines.push("## Next step", "", "Run `npm run questions:feedback-batch:write` and pass all outputs to manual review queue.");
  } else {
    lines.push("## Next step", "", "No batch candidates currently found.");
  }

  return `${lines.join("\n")}\n`;
}

function writeReport(report) {
  fs.writeFileSync(REPORT_JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(REPORT_MD_PATH, toMarkdown(report));
}

function run(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const report = buildReport(options);

  if (options.write) {
    writeReport(report);
  }

  if (options.summary) {
    process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
    return report;
  }
  if (options.json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return report;
  }
  process.stdout.write(toMarkdown(report));

  if (options.strict && !report.summary.ready) {
    process.exitCode = 1;
  }
  return report;
}

if (require.main === module) {
  run();
}

module.exports = { parseArgs, buildReport, toMarkdown, run };
