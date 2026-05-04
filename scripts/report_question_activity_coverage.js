#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { byFilename } = require("./lib/sort.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "QUESTION_ACTIVITY_COVERAGE_REPORT.json");
const MD_PATH = path.join(ROOT, "QUESTION_ACTIVITY_COVERAGE_REPORT.md");
const REPORT_DATE = new Date().toISOString().slice(0,10);

function dataFiles() {
  return fs.readdirSync(DATA_DIR)
    .filter((file) => file.endsWith(".js"))
    .sort(byFilename);
}

function loadData() {
  const sandbox = { window: {}, console };
  dataFiles().forEach((file) => {
    const code = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
    vm.runInNewContext(code, sandbox, { filename: file });
  });
  const lessons = Object.keys(sandbox)
    .map((key) => sandbox[key])
    .filter((value) => value && typeof value.id === "string" && Array.isArray(value.concepts))
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));
  return {
    lessons,
    trace: sandbox.QUESTIONS_TRACE || [],
    build: sandbox.QUESTIONS_BUILD || [],
    bug: sandbox.QUESTIONS_BUG || [],
  };
}

function conceptKey(lessonId, conceptName) {
  return `${lessonId}::${conceptName}`;
}

function countByConcept(items) {
  return (items || []).reduce((counts, item) => {
    const key = item?.conceptKey || "";
    if (!key) return counts;
    counts.set(key, (counts.get(key) || 0) + 1);
    return counts;
  }, new Map());
}

function countFor(counts, key) {
  return counts.get(key) || 0;
}

function buildRows(data = loadData()) {
  const traceCounts = countByConcept(data.trace);
  const buildCounts = countByConcept(data.build);
  const bugCounts = countByConcept(data.bug);
  return data.lessons.flatMap((lesson) =>
    (lesson.concepts || []).map((concept) => {
      const key = conceptKey(lesson.id, concept.conceptName);
      const trace = countFor(traceCounts, key);
      const build = countFor(buildCounts, key);
      const bug = countFor(bugCounts, key);
      const totalActivity = trace + build + bug;
      return {
        key,
        lessonId: lesson.id,
        lessonTitle: lesson.title || lesson.id,
        conceptName: concept.conceptName,
        relevant: Boolean(concept.codeExample),
        trace,
        build,
        bug,
        totalActivity,
        ready: !concept.codeExample || totalActivity >= 1,
      };
    }),
  );
}

function buildReport() {
  const data = loadData();
  const rows = buildRows(data);
  const relevantRows = rows.filter((row) => row.relevant);
  const gaps = relevantRows.filter((row) => !row.ready);
  return {
    reportVersion: "question-activity-coverage-v1",
    date: REPORT_DATE,
    policy: {
      deterministic: true,
      noFakeData: true,
      rule: "A code-bearing concept is activity-ready only when it has at least one Trace, Mini Build, or Bug Hunt item tied to its real conceptKey.",
    },
    sourceMix: {
      trace: data.trace.length,
      build: data.build.length,
      bug: data.bug.length,
    },
    summary: {
      concepts: rows.length,
      relevantConcepts: relevantRows.length,
      activityReadyConcepts: relevantRows.length - gaps.length,
      activityGapCount: gaps.length,
      ready: gaps.length === 0,
    },
    gaps: gaps.map((row) => ({
      key: row.key,
      lessonTitle: row.lessonTitle,
      conceptName: row.conceptName,
      trace: row.trace,
      build: row.build,
      bug: row.bug,
    })),
  };
}

function toMarkdown(report) {
  const s = report.summary;
  return [
    "# Question Activity Coverage",
    "",
    `Date: ${report.date}`,
    "",
    "## Summary",
    "",
    `- Ready: ${s.ready ? "yes" : "no"}`,
    `- Activity-ready concepts: ${s.activityReadyConcepts}/${s.relevantConcepts}`,
    `- Activity gaps: ${s.activityGapCount}`,
    `- Source mix: ${report.sourceMix.trace} Trace · ${report.sourceMix.build} Mini Build · ${report.sourceMix.bug} Bug Hunt`,
    "",
    "## Policy",
    "",
    `- ${report.policy.rule}`,
    "- Missing activity coverage remains an explicit gap; this report does not generate or backfill activity items.",
    "",
    "## First Gaps",
    "",
    ...(report.gaps.length
      ? report.gaps.slice(0, 60).map((gap) => `- \`${gap.key}\` — Trace ${gap.trace}, Build ${gap.build}, Bug ${gap.bug}`)
      : ["- None"]),
  ].join("\n");
}

function main(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--write")) {
    fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(MD_PATH, `${toMarkdown(report)}\n`);
  }
  if (argv.includes("--summary")) {
    console.log(JSON.stringify(report.summary, null, 2));
  } else {
    console.log(toMarkdown(report));
  }
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) main();

module.exports = { buildReport, buildRows, toMarkdown };
