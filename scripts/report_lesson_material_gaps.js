#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "lesson-material-gaps-v3";
const REPORT_DATE = "2026-05-05";

const EXAM_LESSONS = Object.freeze({
  lesson_24: { heat: 10, label: "React Hooks/API", minComparison: 0.9, minExtras: 0.9 },
  lesson_25: { heat: 10, label: "Tailwind/Movie Project", minComparison: 0.9, minExtras: 0.9 },
  lesson_26: { heat: 10, label: "TypeScript/React TS", minComparison: 0.9, minExtras: 0.9 },
  lesson_20: { heat: 9, label: "Mongo/Mongoose", minComparison: 0.75, minExtras: 0.75 },
  lesson_22: { heat: 9, label: "React State", minComparison: 0.75, minExtras: 0.75 },
  lesson_23: { heat: 9, label: "Router/Context", minComparison: 0.75, minExtras: 0.75 },
  lesson_27: { heat: 9, label: "TS Homework/Budget", minComparison: 0.75, minExtras: 0.75 },
  lesson_17: { heat: 8, label: "HTTP/Express", minComparison: 0.6, minExtras: 0.6 },
  lesson_18: { heat: 8, label: "Node/Express HW", minComparison: 0.6, minExtras: 0.6 },
  lesson_21: { heat: 8, label: "React Basics", minComparison: 0.6, minExtras: 0.6 },
  lesson_nextjs: { heat: 8, label: "Next.js Dashboard", minComparison: 0.6, minExtras: 0.6 },
});

const REQUIRED_EXAM_COMPARISON_PAIRS = Object.freeze([
  "exam_l20_sql_vs_nosql",
  "exam_l20_collection_document_json",
  "exam_l20_schema_vs_model",
  "exam_l20_insert_find_update_delete",
  "exam_l23_route_building_blocks",
  "exam_l23_dynamic_vs_context",
  "exam_l24_effect_vs_render_body",
  "exam_l24_dependency_modes",
  "exam_l24_fetch_flow_vs_render_flow",
  "exam_l24_memo_vs_plain_calculation",
  "exam_l24_ref_dom_focus",
  "exam_l25_tailwind_vs_css",
  "exam_l25_flex_vs_grid_layout",
  "exam_l25_spacing_color_shape",
  "exam_l25_movie_interactions",
  "exam_l26_ts_vs_js_toolchain",
  "exam_l26_primitives_collections",
  "exam_l26_type_interface_union_enum",
  "exam_l26_safety_modifiers",
  "exam_l26_react_ts_files",
  "exam_l27_core_ts_models",
  "exam_l27_budget_crud_summary",
  "exam_next_router_vs_react_router",
  "exam_next_server_client_api_rendering",
]);

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function indexContentScripts() {
  const html = read("index.html");
  const scripts = [];
  const re = /<script[^>]*\ssrc=["']([^"']+)["']/gi;
  let match = re.exec(html);
  while (match) {
    const src = match[1].split("?")[0];
    if (src.startsWith("data/") || src === "content-loader.js") scripts.push(src);
    match = re.exec(html);
  }
  return scripts;
}

function loadPortalContent() {
  const context = {
    console: { log() {}, warn() {}, error() {} },
    document: {},
    localStorage: { getItem() { return null; }, setItem() {} },
  };
  context.window = context;
  vm.createContext(context);
  indexContentScripts().forEach((script) => {
    const absolute = path.join(ROOT, script);
    if (!fs.existsSync(absolute)) return;
    vm.runInContext(fs.readFileSync(absolute, "utf8"), context, { filename: script });
  });
  return context;
}

function percent(part, total) {
  return total ? Math.round((part / total) * 100) : 0;
}

function hasFullExtras(concept) {
  const extras = concept && concept.extras;
  return Boolean(extras &&
    ["moreExamples", "pitfalls", "practiceQuestions"].every((field) =>
      Array.isArray(extras[field]) && extras[field].length > 0,
    ));
}

function conceptKey(lesson, concept) {
  return `${lesson.id}::${concept.conceptName}`;
}

function conceptKeySet(lessons) {
  const keys = new Set();
  lessons.forEach((lesson) => {
    (lesson.concepts || []).forEach((concept) => keys.add(conceptKey(lesson, concept)));
  });
  return keys;
}

function isExamConceptKey(key) {
  if (typeof key !== "string") return false;
  const [lessonId] = key.split("::");
  return Boolean(EXAM_LESSONS[lessonId]);
}

function comparisonHasShape(comparison) {
  return Boolean(
    comparison &&
    typeof comparison.pairKey === "string" &&
    comparison.pairKey.trim() &&
    Array.isArray(comparison.relatedConcepts) &&
    comparison.relatedConcepts.length > 0 &&
    comparison.relatedConcepts.every((key) => typeof key === "string" && key.includes("::")) &&
    comparison.a &&
    typeof comparison.a.name === "string" &&
    comparison.b &&
    typeof comparison.b.name === "string" &&
    Array.isArray(comparison.rows) &&
    comparison.rows.length > 0 &&
    comparison.rows.every((row) =>
      row &&
      typeof row.dim === "string" &&
      typeof row.a === "string" &&
      typeof row.b === "string",
    ) &&
    typeof comparison.when === "string" &&
    comparison.when.trim()
  );
}

function comparisonLibraryReport(context, loadedLessons) {
  const comparisons = Object.values(context.COMPARISONS || {});
  const keys = conceptKeySet(loadedLessons);
  const requiredSet = new Set(REQUIRED_EXAM_COMPARISON_PAIRS);
  const pairKeys = new Set(comparisons.map((comparison) => comparison && comparison.pairKey).filter(Boolean));
  const examComparisons = comparisons.filter((comparison) =>
    (comparison.relatedConcepts || []).some(isExamConceptKey),
  );
  const malformedExamComparisons = examComparisons
    .filter((comparison) => !comparisonHasShape(comparison))
    .map((comparison) => comparison && comparison.pairKey ? comparison.pairKey : "unknown-pair");
  const orphanExamReferences = examComparisons.flatMap((comparison) =>
    (comparison.relatedConcepts || [])
      .filter(isExamConceptKey)
      .filter((key) => !keys.has(key))
      .map((key) => ({ pairKey: comparison.pairKey, conceptKey: key })),
  );
  const requiredMissing = REQUIRED_EXAM_COMPARISON_PAIRS.filter((pairKey) => !pairKeys.has(pairKey));
  return {
    total: comparisons.length,
    examComparisons: examComparisons.length,
    requiredPairs: requiredSet.size,
    requiredPairsPresent: REQUIRED_EXAM_COMPARISON_PAIRS.length - requiredMissing.length,
    requiredPairsMissing: requiredMissing,
    malformedExamComparisons,
    orphanExamReferences,
    ready: requiredMissing.length === 0 &&
      malformedExamComparisons.length === 0 &&
      orphanExamReferences.length === 0,
  };
}

function fullPortalInventory(context) {
  const lessons = context.LESSONS_DATA || [];
  const concepts = lessons.reduce((sum, lesson) => sum + ((lesson.concepts || []).length), 0);
  const comparisons = Object.values(context.COMPARISONS || {});
  return {
    loadedLessonCount: lessons.length,
    loadedConceptCount: concepts,
    loadedComparisonCount: comparisons.length,
    sourceTruth: "index.html data scripts + content-loader VM merge",
    scopeNote: "fullPortal counts every loaded lesson; examOnly counts only SVCollege exam lessons in EXAM_LESSONS.",
  };
}

function questionCounts(context) {
  const bank = context.QUESTIONS_BANK || {};
  const items = [
    ...(bank.mc || []),
    ...(bank.fill || []),
    ...(bank.trace || []),
    ...(bank.bug || []),
    ...(bank.build || []),
  ];
  return items.reduce((acc, item) => {
    if (!item || !item.conceptKey) return acc;
    acc[item.conceptKey] = (acc[item.conceptKey] || 0) + 1;
    return acc;
  }, {});
}

function rowForLesson(lesson, questionCountByKey) {
  const concepts = Array.isArray(lesson.concepts) ? lesson.concepts : [];
  const meta = EXAM_LESSONS[lesson.id] || { heat: 1, label: "לא במסלול מבחן", minComparison: 0, minExtras: 0 };
  const conceptRows = concepts.map((concept) => {
    const key = conceptKey(lesson, concept);
    const comparisons = Array.isArray(concept.comparisons) ? concept.comparisons.length : 0;
    const extrasReady = hasFullExtras(concept);
    const codeReady = Boolean(concept.codeExample || concept.code || concept.example);
    const questions = questionCountByKey[key] || 0;
    return {
      key,
      conceptName: concept.conceptName,
      comparisons,
      extrasReady,
      codeReady,
      questions,
      ready: comparisons > 0 && extrasReady,
    };
  });
  const comparisonCovered = conceptRows.filter((row) => row.comparisons > 0).length;
  const extrasCovered = conceptRows.filter((row) => row.extrasReady).length;
  const codeCovered = conceptRows.filter((row) => row.codeReady).length;
  const questionCovered = conceptRows.filter((row) => row.questions > 0).length;
  const total = conceptRows.length;
  const comparisonPercent = percent(comparisonCovered, total);
  const extrasPercent = percent(extrasCovered, total);
  const missingConcepts = conceptRows.filter((row) => !row.ready);
  return {
    lessonId: lesson.id,
    title: lesson.title,
    heat: meta.heat,
    label: meta.label,
    threshold: {
      comparisons: Math.round(meta.minComparison * 100),
      extras: Math.round(meta.minExtras * 100),
    },
    totals: {
      concepts: total,
      comparisons: comparisonCovered,
      extras: extrasCovered,
      code: codeCovered,
      questions: questionCovered,
    },
    percent: {
      comparisons: comparisonPercent,
      extras: extrasPercent,
      code: percent(codeCovered, total),
      questions: percent(questionCovered, total),
      ready: percent(conceptRows.filter((row) => row.ready).length, total),
    },
    comparisonCoverage: {
      covered: comparisonCovered,
      total,
      percent: comparisonPercent,
      requiredPercent: Math.round(meta.minComparison * 100),
      gap: Math.max(0, Math.ceil((meta.minComparison * total) - comparisonCovered)),
    },
    practiceCoverage: {
      covered: extrasCovered,
      total,
      percent: extrasPercent,
      requiredPercent: Math.round(meta.minExtras * 100),
      gap: Math.max(0, Math.ceil((meta.minExtras * total) - extrasCovered)),
    },
    missingConcepts: missingConcepts.map((row) => ({
      key: row.key,
      conceptName: row.conceptName,
      comparisons: row.comparisons,
      extrasReady: row.extrasReady,
      questions: row.questions,
    })),
    missing: missingConcepts,
    conceptRows,
  };
}

function buildReport() {
  const context = loadPortalContent();
  const questionCountByKey = questionCounts(context);
  const allLessons = context.LESSONS_DATA || [];
  const lessons = allLessons.filter((lesson) => EXAM_LESSONS[lesson.id]);
  const fullPortal = fullPortalInventory(context);
  const comparisonLibrary = comparisonLibraryReport(context, allLessons);
  const rows = lessons
    .map((lesson) => rowForLesson(lesson, questionCountByKey))
    .sort((a, b) => (b.heat - a.heat) || a.lessonId.localeCompare(b.lessonId));
  const failures = rows.flatMap((row) => {
    const out = [];
    if (row.percent.comparisons < row.threshold.comparisons) {
      out.push({
        lessonId: row.lessonId,
        kind: "comparisons",
        actual: row.percent.comparisons,
        required: row.threshold.comparisons,
        message: `${row.lessonId} comparison coverage ${row.percent.comparisons}% < ${row.threshold.comparisons}%`,
      });
    }
    if (row.percent.extras < row.threshold.extras) {
      out.push({
        lessonId: row.lessonId,
        kind: "extras",
        actual: row.percent.extras,
        required: row.threshold.extras,
        message: `${row.lessonId} practice extras ${row.percent.extras}% < ${row.threshold.extras}%`,
      });
    }
    return out;
  });
  if (comparisonLibrary.requiredPairsMissing.length) {
    failures.push({
      lessonId: "comparison-library",
      kind: "required-comparison-pairs",
      actual: comparisonLibrary.requiredPairsPresent,
      required: comparisonLibrary.requiredPairs,
      message: `required exam comparison pairs missing: ${comparisonLibrary.requiredPairsMissing.join(", ")}`,
    });
  }
  if (comparisonLibrary.malformedExamComparisons.length) {
    failures.push({
      lessonId: "comparison-library",
      kind: "comparison-schema",
      actual: comparisonLibrary.malformedExamComparisons.length,
      required: 0,
      message: `exam comparisons with invalid schema: ${comparisonLibrary.malformedExamComparisons.join(", ")}`,
    });
  }
  if (comparisonLibrary.orphanExamReferences.length) {
    failures.push({
      lessonId: "comparison-library",
      kind: "orphan-comparison-references",
      actual: comparisonLibrary.orphanExamReferences.length,
      required: 0,
      message: `exam comparison references not found in loaded concepts: ${comparisonLibrary.orphanExamReferences.map((item) => `${item.pairKey}:${item.conceptKey}`).join(", ")}`,
    });
  }
  const heatGapCount = (heat) => rows.filter((row) =>
    row.heat === heat &&
    (row.percent.comparisons < row.threshold.comparisons || row.percent.extras < row.threshold.extras),
  ).length;
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "SVCollege exam-critical lesson material gaps",
    policy: "Counts only loaded portal lessons and concept fields after content-loader merge. Missing content remains a gap; no source is inferred from video.",
    summary: {
      ready: failures.length === 0,
      lessons: rows.length,
      concepts: rows.reduce((sum, row) => sum + row.totals.concepts, 0),
      fullPortalLessons: fullPortal.loadedLessonCount,
      fullPortalConcepts: fullPortal.loadedConceptCount,
      heat10Lessons: rows.filter((row) => row.heat === 10).length,
      heat9Lessons: rows.filter((row) => row.heat === 9).length,
      heat8Lessons: rows.filter((row) => row.heat === 8).length,
      heat10Gaps: heatGapCount(10),
      heat9Gaps: heatGapCount(9),
      heat8Gaps: heatGapCount(8),
      failures: failures.length,
      globalComparisons: comparisonLibrary.total,
      examComparisons: comparisonLibrary.examComparisons,
      requiredComparisonPairs: comparisonLibrary.requiredPairs,
      requiredComparisonPairsPresent: comparisonLibrary.requiredPairsPresent,
      orphanExamComparisonReferences: comparisonLibrary.orphanExamReferences.length,
      malformedExamComparisons: comparisonLibrary.malformedExamComparisons.length,
      minComparisonPercent: rows.reduce((min, row) => Math.min(min, row.percent.comparisons), 100),
      minExtrasPercent: rows.reduce((min, row) => Math.min(min, row.percent.extras), 100),
    },
    fullPortal,
    comparisonLibrary,
    lessons: rows,
    rows,
    failures,
  };
}

function toMarkdown(report) {
  const lines = [
    "# Lesson Material Gaps",
    "",
    `- Date: ${report.date}`,
    `- Ready: ${report.summary.ready ? "yes" : "no"}`,
    `- Lessons: ${report.summary.lessons}`,
    `- Concepts: ${report.summary.concepts}`,
    `- Full portal lessons: ${report.summary.fullPortalLessons}`,
    `- Full portal concepts: ${report.summary.fullPortalConcepts}`,
    `- Global comparisons: ${report.summary.globalComparisons}`,
    `- Exam comparisons: ${report.summary.examComparisons}`,
    `- Required comparison pairs: ${report.summary.requiredComparisonPairsPresent}/${report.summary.requiredComparisonPairs}`,
    `- Heat gaps: H10=${report.summary.heat10Gaps}, H9=${report.summary.heat9Gaps}, H8=${report.summary.heat8Gaps}`,
    `- Failures: ${report.summary.failures}`,
    "",
    "| Heat | Lesson | Comparisons | Extras | Code | Questions | Missing ready concepts |",
    "|---:|---|---:|---:|---:|---:|---:|",
  ];
  report.rows.forEach((row) => {
    lines.push(`| ${row.heat} | ${row.lessonId} ${row.title} | ${row.totals.comparisons}/${row.totals.concepts} (${row.percent.comparisons}%) | ${row.totals.extras}/${row.totals.concepts} (${row.percent.extras}%) | ${row.totals.code}/${row.totals.concepts} (${row.percent.code}%) | ${row.totals.questions}/${row.totals.concepts} (${row.percent.questions}%) | ${row.missing.length} |`);
  });
  if (report.failures.length) {
    lines.push("", "## Failures");
    report.failures.forEach((failure) => lines.push(`- ${failure.message}`));
  }
  return `${lines.join("\n")}\n`;
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (argv.includes("--summary")) {
    process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  } else {
    process.stdout.write(toMarkdown(report));
  }
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = {
  EXAM_LESSONS,
  buildReport,
  hasFullExtras,
  run,
  toMarkdown,
};
