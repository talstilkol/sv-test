#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "EXAM_FLOW_SIMULATION_REPORT.json");
const MD_PATH = path.join(ROOT, "EXAM_FLOW_SIMULATION_REPORT.md");
const REPORT_DATE = new Date().toISOString().slice(0,10);
const REPORT_VERSION = "exam-flow-simulation-v1";

function loadQuestionBanks() {
  const sandbox = { window: {}, console };
  ["questions_bank.js"].forEach((file) => {
    const code = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
    vm.runInNewContext(code, sandbox, { filename: file });
  });
  const curated = sandbox.QUESTIONS_BANK || { mc: [], fill: [] };
  return [
    ...(curated.mc || []).map((q) => ({ ...q, kind: "mc", source: "curated" })),
    ...(curated.fill || []).map((q) => ({ ...q, kind: "fill", source: "curated" })),
  ].filter((q) => q && q.conceptKey);
}

function stableQuestionHash(input) {
  let hash = 2166136261;
  String(input || "").split("").forEach((char) => {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  });
  return (hash >>> 0).toString(36);
}

function questionIdentity(question = {}) {
  const explicit = String(question.id || question.questionId || "").trim();
  if (explicit) return explicit;
  return `q-${stableQuestionHash([
    question.kind || "",
    question.conceptKey || "",
    question.question || "",
    question.codeBlock || question.code || "",
    Array.isArray(question.options) ? question.options.join("|") : "",
    question.answer || "",
  ].join("||"))}`;
}

function challengeValue(question = {}) {
  return Number(question.challengeLevel ?? question.level ?? question.difficulty ?? 1) || 1;
}

function sortQuestions(questions = []) {
  return questions.slice().sort((a, b) => {
    const conceptDiff = String(a.conceptKey).localeCompare(String(b.conceptKey));
    if (conceptDiff) return conceptDiff;
    const challengeDiff = challengeValue(a) - challengeValue(b);
    if (challengeDiff) return challengeDiff;
    return questionIdentity(a).localeCompare(questionIdentity(b));
  });
}

function groupByConcept(questions = []) {
  return questions.reduce((groups, question) => {
    const key = question.conceptKey;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(question);
    return groups;
  }, new Map());
}

function answerAid(question = {}) {
  return String(
    question.sideExplanation ||
    question.deepExplanation ||
    question.explanation ||
    question.hint ||
    "",
  ).trim();
}

function memoryAid(question = {}) {
  if (question.memoryAssociation) return String(question.memoryAssociation).trim();
  if (Array.isArray(question.optionFeedback) && question.optionFeedback.length) {
    return String(question.optionFeedback[0] || "").trim();
  }
  return answerAid(question);
}

function simulateNoRepeat(questions, limit = 100) {
  const ordered = sortQuestions(questions);
  const answered = new Set();
  const picked = [];
  const duplicates = [];
  ordered.some((question) => {
    const id = questionIdentity(question);
    if (answered.has(id)) {
      duplicates.push(id);
      return false;
    }
    answered.add(id);
    picked.push({ id, conceptKey: question.conceptKey, challenge: challengeValue(question) });
    return picked.length >= limit;
  });
  return {
    requested: limit,
    bankSize: ordered.length,
    answered: picked.length,
    unique: answered.size,
    exhaustedBeforeLimit: picked.length < limit,
    duplicateCount: duplicates.length,
    duplicates: duplicates.slice(0, 10),
    passed: picked.length === limit && duplicates.length === 0,
  };
}

function simulateHarderAfterCorrect(questions, sampleLimit = 160) {
  const groups = groupByConcept(questions);
  const failures = [];
  let checked = 0;
  Array.from(groups.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .some(([conceptKey, items]) => {
      const ordered = sortQuestions(items);
      const levels = Array.from(new Set(ordered.map(challengeValue))).sort((a, b) => a - b);
      if (levels.length < 2) return false;
      const first = ordered.find((q) => challengeValue(q) === levels[0]);
      const target = Math.min(6, challengeValue(first) + 1);
      const next = ordered.find((q) => questionIdentity(q) !== questionIdentity(first) && challengeValue(q) >= target);
      checked += 1;
      if (!next || challengeValue(next) <= challengeValue(first)) {
        failures.push({
          conceptKey,
          first: questionIdentity(first),
          firstChallenge: challengeValue(first),
          next: next ? questionIdentity(next) : "",
          nextChallenge: next ? challengeValue(next) : null,
        });
      }
      return checked >= sampleLimit;
    });
  return {
    checked,
    failures: failures.slice(0, 20),
    failureCount: failures.length,
    passed: checked > 0 && failures.length === 0,
  };
}

function simulateWrongAnswerRepair(questions, sampleLimit = 160) {
  const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  const requiredHooks = [
    "function recordWrongQuestionByConceptKey",
    "function renderMistakeAgentFeedback",
    "function recoveryRetestItemFromMistake",
    "function startWrongAnswerRecovery",
    "נוסף לרשימת החולשות",
    "אסוציאציה קלה",
    "שאלת התאוששות בדרישת קדם",
  ];
  const hookFailures = requiredHooks.filter((hook) => !app.includes(hook));
  const failures = [];
  const ordered = sortQuestions(questions).filter((q) => q.kind === "mc" || q.kind === "fill");
  const checked = Math.min(sampleLimit, ordered.length);
  ordered.slice(0, checked).forEach((question) => {
    const conceptKey = String(question.conceptKey || "");
    const topic = String(question.topicId || conceptKey.split("::")[0] || "");
    const explanation = answerAid(question);
    const association = memoryAid(question);
    if (!conceptKey || !topic || !explanation || !association) {
      failures.push({
        id: questionIdentity(question),
        conceptKey,
        missingTopic: !topic,
        missingExplanation: !explanation,
        missingAssociation: !association,
      });
    }
  });
  return {
    checked,
    hookFailures,
    dataFailures: failures.slice(0, 20),
    failureCount: hookFailures.length + failures.length,
    passed: checked > 0 && hookFailures.length === 0 && failures.length === 0,
  };
}

function buildReport() {
  const questions = loadQuestionBanks();
  const noRepeat = simulateNoRepeat(questions);
  const harderAfterCorrect = simulateHarderAfterCorrect(questions);
  const wrongAnswerRepair = simulateWrongAnswerRepair(questions);
  const blockers = [];
  if (!noRepeat.passed) blockers.push("no-repeat-simulation");
  if (!harderAfterCorrect.passed) blockers.push("harder-after-correct-simulation");
  if (!wrongAnswerRepair.passed) blockers.push("wrong-answer-repair-simulation");
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    policy: {
      deterministic: true,
      noRandomness: true,
      noFakeData: true,
      sampleProfile: "clean-local-learner",
    },
    summary: {
      questionBankSize: questions.length,
      blockers: blockers.length,
      blockerCodes: blockers,
      passed: blockers.length === 0,
    },
    noRepeat,
    harderAfterCorrect,
    wrongAnswerRepair,
  };
}

function toMarkdown(report) {
  return [
    `# Exam Flow Simulation Report — ${report.date}`,
    "",
    `- Question bank size: ${report.summary.questionBankSize}`,
    `- Blockers: ${report.summary.blockers}`,
    `- Overall: ${report.summary.passed ? "PASS" : "FAIL"}`,
    "",
    "## No-Repeat Clean Profile",
    "",
    `- Requested answers: ${report.noRepeat.requested}`,
    `- Answered: ${report.noRepeat.answered}`,
    `- Unique: ${report.noRepeat.unique}`,
    `- Duplicate count: ${report.noRepeat.duplicateCount}`,
    "",
    "## Harder After Correct",
    "",
    `- Concepts checked: ${report.harderAfterCorrect.checked}`,
    `- Failures: ${report.harderAfterCorrect.failureCount}`,
    "",
    "## Wrong Answer Repair",
    "",
    `- Questions checked: ${report.wrongAnswerRepair.checked}`,
    `- Hook failures: ${report.wrongAnswerRepair.hookFailures.length}`,
    `- Data failures: ${report.wrongAnswerRepair.dataFailures.length}`,
    "",
  ].join("\n");
}

function main() {
  const args = new Set(process.argv.slice(2));
  const report = buildReport();
  if (args.has("--write")) {
    fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(MD_PATH, toMarkdown(report));
  }
  if (args.has("--summary")) {
    console.log(JSON.stringify(report.summary, null, 2));
  } else {
    console.log(toMarkdown(report));
  }
  if (args.has("--strict") && !report.summary.passed) {
    process.exitCode = 1;
  }
}

if (require.main === module) main();

module.exports = {
  buildReport,
  simulateNoRepeat,
  simulateHarderAfterCorrect,
  simulateWrongAnswerRepair,
};
