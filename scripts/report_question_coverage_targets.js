#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { byFilename } = require("./lib/sort.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "QUESTION_COVERAGE_TARGETS.json");
const MD_PATH = path.join(ROOT, "QUESTION_COVERAGE_TARGETS.md");
const REPORT_DATE = new Date().toISOString().slice(0,10);
const TARGET_MC_PER_CONCEPT = 3;
const TARGET_FILL_PER_CODE_CONCEPT = 2;

function dataFiles() {
  return fs.readdirSync(DATA_DIR)
    .filter((file) => file.endsWith(".js") && file !== "questions_bank_seeded.js")
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
  const curated = sandbox.QUESTIONS_BANK || { mc: [], fill: [] };
  return { lessons, curated };
}

function conceptKey(lessonId, conceptName) {
  return `${lessonId}::${conceptName}`;
}

function countByConcept(questions) {
  return (questions || []).reduce((counts, question) => {
    const key = question?.conceptKey || "";
    if (!key) return counts;
    counts.set(key, (counts.get(key) || 0) + 1);
    return counts;
  }, new Map());
}

function countFor(counts, key) {
  return counts.get(key) || 0;
}

function buildRows(data = loadData()) {
  const curatedMC = countByConcept(data.curated.mc || []);
  const curatedFill = countByConcept(data.curated.fill || []);

  return data.lessons.flatMap((lesson) =>
    (lesson.concepts || []).map((concept) => {
      const key = conceptKey(lesson.id, concept.conceptName);
      const mc = {
        curated: countFor(curatedMC, key),
      };
      const fill = {
        curated: countFor(curatedFill, key),
      };
      mc.total = mc.curated;
      fill.total = fill.curated;
      return {
        key,
        lessonId: lesson.id,
        lessonTitle: lesson.title || lesson.id,
        conceptName: concept.conceptName,
        requiresFill: Boolean(concept.codeExample),
        mc,
        fill,
        mcReady: mc.total >= TARGET_MC_PER_CONCEPT,
        fillReady: !concept.codeExample || fill.total >= TARGET_FILL_PER_CODE_CONCEPT,
        handCuratedMcReady: mc.curated >= TARGET_MC_PER_CONCEPT,
        handCuratedFillReady: !concept.codeExample || fill.curated >= TARGET_FILL_PER_CODE_CONCEPT,
      };
    }),
  );
}

function buildReport() {
  const data = loadData();
  const rows = buildRows(data);
  const mcGaps = rows.filter((row) => !row.mcReady);
  const fillRows = rows.filter((row) => row.requiresFill);
  const fillGaps = fillRows.filter((row) => !row.fillReady);
  const handCuratedMcBacklog = rows.filter((row) => !row.handCuratedMcReady);
  const handCuratedFillBacklog = fillRows.filter((row) => !row.handCuratedFillReady);

  return {
    reportVersion: "question-coverage-targets-v1",
    date: REPORT_DATE,
    policy: {
      noFakeData: true,
      deterministic: true,
      manualOnly: true,
      seededCountsForReadiness: false,
      liveBankIncludes: ["data/questions_bank.js"],
      ignoredArchives: ["data/questions_bank_seeded.js"],
      mcTargetPerConcept: TARGET_MC_PER_CONCEPT,
      fillTargetPerCodeConcept: TARGET_FILL_PER_CODE_CONCEPT,
    },
    sourceMix: {
      curatedMC: (data.curated.mc || []).length,
      ignoredGeneratedMC: 0,
      curatedFill: (data.curated.fill || []).length,
      ignoredGeneratedFill: 0,
    },
    summary: {
      totalConcepts: rows.length,
      mcReadyConcepts: rows.length - mcGaps.length,
      mcGapCount: mcGaps.length,
      codeExampleConcepts: fillRows.length,
      fillReadyConcepts: fillRows.length - fillGaps.length,
      fillGapCount: fillGaps.length,
      handCuratedMcPromotionBacklog: handCuratedMcBacklog.length,
      handCuratedFillPromotionBacklog: handCuratedFillBacklog.length,
      ready: mcGaps.length === 0 && fillGaps.length === 0,
    },
    gaps: {
      mc: mcGaps.map(({ key, lessonTitle, conceptName, mc }) => ({ key, lessonTitle, conceptName, mc })),
      fill: fillGaps.map(({ key, lessonTitle, conceptName, fill }) => ({ key, lessonTitle, conceptName, fill })),
    },
  };
}

function toMarkdown(report) {
  const s = report.summary;
  const mix = report.sourceMix;
  return [
    "# Question Coverage Targets",
    "",
    `Date: ${report.date}`,
    "",
    "## Summary",
    "",
    `- Ready: ${s.ready ? "yes" : "no"}`,
    `- MC target: ${s.mcReadyConcepts}/${s.totalConcepts} concepts have at least ${report.policy.mcTargetPerConcept} manually authored MC questions`,
    `- Fill target: ${s.fillReadyConcepts}/${s.codeExampleConcepts} code concepts have at least ${report.policy.fillTargetPerCodeConcept} manually authored Fill questions`,
    `- Source mix: ${mix.curatedMC} manual MC + ${mix.curatedFill} manual Fill`,
    `- Hand-curated promotion backlog: ${s.handCuratedMcPromotionBacklog} MC concepts, ${s.handCuratedFillPromotionBacklog} Fill concepts`,
    "",
    "## Policy",
    "",
    "- Manual-only: learner-facing coverage is enforced on hand-authored questions only.",
    "- Generated/seeded archives are ignored and not loaded by this report.",
    "- New questions must be authored and reviewed manually before entering the curated bank.",
  ].join("\n");
}

function main() {
  const report = buildReport();
  if (process.argv.includes("--write")) {
    fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    fs.writeFileSync(MD_PATH, `${toMarkdown(report)}\n`, "utf8");
  }
  if (process.argv.includes("--summary")) {
    console.log(JSON.stringify({
      ready: report.summary.ready,
      totalConcepts: report.summary.totalConcepts,
      mcGapCount: report.summary.mcGapCount,
      fillGapCount: report.summary.fillGapCount,
      handCuratedMcPromotionBacklog: report.summary.handCuratedMcPromotionBacklog,
      handCuratedFillPromotionBacklog: report.summary.handCuratedFillPromotionBacklog,
    }, null, 2));
  } else {
    console.log(toMarkdown(report));
  }
  if (process.argv.includes("--strict") && !report.summary.ready) {
    process.exitCode = 1;
  }
}

if (require.main === module) main();

module.exports = {
  buildReport,
  buildRows,
  toMarkdown,
};
