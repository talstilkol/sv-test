#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "LESSON_QUIZ_KEYS_REPORT.json");
const MD_PATH = path.join(ROOT, "LESSON_QUIZ_KEYS_REPORT.md");
const REPORT_DATE = "2026-04-28";

const LESSON_FILES = [
  ["lesson11.js", "LESSON_11"],
  ["lesson12.js", "LESSON_12"],
  ["lesson13.js", "LESSON_13"],
  ["lesson_html_css_foundations.js", "LESSON_HTML_CSS_FOUNDATIONS"],
  ["lesson_tooling_git.js", "LESSON_TOOLING_GIT"],
  ["lesson15.js", "LESSON_15"],
  ["lesson16.js", "LESSON_16"],
  ["lesson17.js", "LESSON_17"],
  ["lesson18.js", "LESSON_18"],
  ["lesson19.js", "LESSON_19"],
  ["lesson20.js", "LESSON_20"],
  ["lesson21.js", "LESSON_21"],
  ["lesson22.js", "LESSON_22"],
  ["lesson23.js", "LESSON_23"],
  ["lesson24.js", "LESSON_24"],
  ["lesson25.js", "LESSON_25"],
  ["lesson26.js", "LESSON_26"],
  ["lesson27.js", "LESSON_27"],
  ["ai_development.js", "AI_DEVELOPMENT"],
  ["react_blueprint.js", "REACT_BLUEPRINT"],
];

function loadData() {
  const sandbox = { window: {}, console };
  LESSON_FILES.forEach(([file]) => {
    vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, file), "utf8"), sandbox, { filename: file });
  });
  vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, "lesson_quiz_keys.js"), "utf8"), sandbox, {
    filename: "lesson_quiz_keys.js",
  });

  return {
    lessons: LESSON_FILES.map(([, globalName]) => sandbox[globalName]).filter(Boolean),
    mappings: sandbox.LESSON_QUIZ_KEYS || {},
  };
}

function conceptKeySet(lesson) {
  return new Set((lesson.concepts || []).map((concept) => `${lesson.id}::${concept.conceptName}`));
}

function auditLesson(lesson, mappings) {
  const quiz = lesson.quiz || [];
  const lessonMappings = mappings[lesson.id] || [];
  const validKeys = conceptKeySet(lesson);
  const issues = [];
  const rows = quiz.map((question, index) => {
    const keys = Array.isArray(lessonMappings[index]) ? lessonMappings[index] : [];
    const rowIssues = [];
    if (!keys.length) {
      rowIssues.push("missing-keys");
    }
    keys.forEach((key) => {
      if (!validKeys.has(key)) rowIssues.push(`unknown-key:${key}`);
    });
    if (new Set(keys).size !== keys.length) {
      rowIssues.push("duplicate-key");
    }
    rowIssues.forEach((issue) => issues.push({ lessonId: lesson.id, index, issue }));
    return {
      index,
      question: question.question || "",
      keys,
      status: rowIssues.length ? "fail" : "ok",
      issues: rowIssues,
    };
  });

  if (lessonMappings.length !== quiz.length) {
    issues.push({
      lessonId: lesson.id,
      index: null,
      issue: `mapping-count:${lessonMappings.length}/${quiz.length}`,
    });
  }

  return {
    lessonId: lesson.id,
    title: lesson.title,
    quizCount: quiz.length,
    mappedCount: rows.filter((row) => row.status === "ok").length,
    status: issues.length ? "fail" : "ok",
    issues,
    rows,
  };
}

function summarize(lessons) {
  const totalQuizItems = lessons.reduce((sum, lesson) => sum + lesson.quizCount, 0);
  const mappedQuizItems = lessons.reduce((sum, lesson) => sum + lesson.mappedCount, 0);
  const issueCount = lessons.reduce((sum, lesson) => sum + lesson.issues.length, 0);
  return {
    lessons: lessons.length,
    totalQuizItems,
    mappedQuizItems,
    issueCount,
    coverage: totalQuizItems ? Math.round((mappedQuizItems / totalQuizItems) * 1000) / 10 : 100,
  };
}

function buildReport() {
  const { lessons, mappings } = loadData();
  const audited = lessons.map((lesson) => auditLesson(lesson, mappings));
  return {
    reportVersion: "lesson-quiz-keys-v1",
    date: REPORT_DATE,
    source: "data/lesson_quiz_keys.js",
    summary: summarize(audited),
    lessons: audited,
  };
}

function preview(text, maxLength = 80) {
  const compact = String(text || "").replace(/\s+/g, " ").trim();
  return compact.length <= maxLength ? compact : `${compact.slice(0, maxLength - 1)}...`;
}

function buildMarkdown(report) {
  const lines = [
    "# Lesson Quiz Concept Keys Report — 2026-04-28",
    "",
    "Validates that every lesson-level quiz item has explicit concept routing and that every mapped concept key exists in the same lesson.",
    "",
    "## Summary",
    "",
    `- Lessons audited: ${report.summary.lessons}`,
    `- Quiz items: ${report.summary.totalQuizItems}`,
    `- Mapped quiz items: ${report.summary.mappedQuizItems}`,
    `- Coverage: ${report.summary.coverage}%`,
    `- Issues: ${report.summary.issueCount}`,
    "",
    "## Lesson Rows",
    "",
    "| Lesson | Quiz | Mapped | Status |",
    "|---|---:|---:|---|",
  ];

  report.lessons.forEach((lesson) => {
    lines.push(`| \`${lesson.lessonId}\` | ${lesson.quizCount} | ${lesson.mappedCount} | ${lesson.status} |`);
  });

  lines.push("", "## Quiz Rows", "", "| Lesson | # | Status | Keys | Question |", "|---|---:|---|---|---|");
  report.lessons.forEach((lesson) => {
    lesson.rows.forEach((row) => {
      lines.push(
        `| \`${lesson.lessonId}\` | ${row.index} | ${row.status} | ${row.keys.map((key) => `\`${key}\``).join("<br>")} | ${preview(row.question)} |`,
      );
    });
  });

  lines.push("");
  return `${lines.join("\n")}\n`;
}

function writeReports(report) {
  fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(MD_PATH, buildMarkdown(report));
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--write")) writeReports(report);
  if (argv.includes("--summary")) {
    process.stdout.write(`${JSON.stringify({
      reportVersion: report.reportVersion,
      date: report.date,
      source: report.source,
      summary: report.summary,
    }, null, 2)}\n`);
  } else if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    process.stdout.write(buildMarkdown(report));
  }
  return report;
}

if (require.main === module) {
  const report = run();
  if (process.argv.includes("--strict") && report.summary.issueCount > 0) {
    console.error(`Lesson quiz key strict failure: ${report.summary.issueCount} issue(s).`);
    process.exit(1);
  }
}

module.exports = {
  auditLesson,
  buildMarkdown,
  buildReport,
  conceptKeySet,
  loadData,
  run,
  summarize,
};
