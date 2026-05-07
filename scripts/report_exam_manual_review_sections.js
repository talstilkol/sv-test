#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "data", "exam_tasks_tree.js");
const OUT_JSON = path.join(ROOT, "EXAM_MANUAL_REVIEW_SECTIONS_REPORT.json");
const OUT_MD = path.join(ROOT, "EXAM_MANUAL_REVIEW_SECTIONS_REPORT.md");
const args = new Set(process.argv.slice(2));
const strict = args.has("--strict");
const summary = args.has("--summary");
const FORBIDDEN_NATIVE_RANDOM_TOKEN = ["Math", "random"].join(".");
const EXPECTED_MANUAL_REVIEW_IDS = ["section-04", "section-33", "section-50", "section-51"];
const SOURCE_REVIEW_FILE = "docs/source-review.md";
const REQUIRED_CONTRACT_FIELDS = [
  {
    id: "full_source_prompt",
    label: "נוסח מלא של השאלה",
    evidence: "טקסט מלא או צילום/OCR של סעיף המבחן, מעבר לכותרת ולניקוד.",
  },
  {
    id: "target_surface",
    label: "משטח יעד",
    evidence: "קובץ או מסך יעד: route, component, function, model, schema או DB.",
  },
  {
    id: "input_output_contract",
    label: "קלט ופלט",
    evidence: "מה המשתמש/השרת מקבל, מה חייב לחזור, ומה מבנה הנתונים.",
  },
  {
    id: "validation_and_errors",
    label: "ולידציה ושגיאות",
    evidence: "תנאי חובה, edge cases, הודעות שגיאה או status codes.",
  },
  {
    id: "scoring_rubric",
    label: "ניקוד רשמי",
    evidence: "חלוקת נקודות רשמית לתת־סעיפים, אם קיימת במקור.",
  },
  {
    id: "acceptance_gate",
    label: "בדיקת קבלה",
    evidence: "איך מוכיחים שהפתרון נכון: UI state, API response, DB state או test.",
  },
];

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function loadTree() {
  const context = { console: { log() {}, warn() {}, error() {} } };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(read(DATA_FILE), context, { filename: "data/exam_tasks_tree.js" });
  return context.SVCOLLEGE_EXAM_TASKS_TREE;
}

function onlyGenericSourceText(sectionText) {
  const text = String(sectionText || "").trim();
  const lower = text.toLowerCase();
  const hasQuestionAndPoints = /שאלה/.test(text) && /נקוד/.test(text);
  const technicalContractTerms = [
    "api",
    "route",
    "endpoint",
    "schema",
    "database",
    "db",
    "react",
    "component",
    "validation",
    "function",
    "array",
    "object",
    "server",
    "client",
    "טופס",
    "ולידציה",
    "פונקציה",
    "מערך",
    "אובייקט",
    "קומפוננטה",
    "שרת",
    "לקוח",
    "מסד",
    "נתונים",
    "ראוט",
    "נתיב",
  ];
  const hasTechnicalContractTerm = technicalContractTerms.some((term) => lower.includes(term));
  return hasQuestionAndPoints && !hasTechnicalContractTerm && text.length <= 80;
}

function rubricPoints(exercise) {
  return (exercise.scoreRubric || []).reduce((sum, item) => sum + Number(item.points || 0), 0);
}

function hasManualSourceReviewTask(exercise) {
  return (exercise.technicalSubtasks || []).some((task) =>
    String(task.id || "") === `${exercise.id}::manual-review` &&
    String(task.file || "") === SOURCE_REVIEW_FILE &&
    /עיון ידני|manual|מקור/.test(`${task.title || ""} ${task.details || ""}`),
  );
}

function targetFileIsSourceReview(exercise) {
  return String((exercise.projectFileTree || {}).targetFile || "") === SOURCE_REVIEW_FILE;
}

function sourceRefsAreTraceable(exercise) {
  return (exercise.sourceRefs || []).some((ref) => String(ref).includes("exam_sections_task_breakdown"));
}

function hasNoInventedCodeSurface(exercise) {
  const refs = Array.isArray(exercise.technicalTaskRefs) ? exercise.technicalTaskRefs : [];
  return refs.length === 0 &&
    !Object.prototype.hasOwnProperty.call(exercise, "codeRecipe") &&
    !Object.prototype.hasOwnProperty.call(exercise, "implementationCode") &&
    !Object.prototype.hasOwnProperty.call(exercise, "starterCode");
}

function manualReviewClosurePlan(exercise) {
  const sourceRefs = Array.isArray(exercise.sourceRefs) ? exercise.sourceRefs : [];
  const sourceRefText = sourceRefs.length ? sourceRefs.join(" | ") : "unknown/unavailable";
  return {
    canPromote: false,
    currentEvidence: {
      sourceFile: exercise.sourceFile || "unknown/unavailable",
      question: exercise.question || "unknown/unavailable",
      sectionText: exercise.sectionText || "unknown/unavailable",
      sourceRefs,
    },
    missingEvidence: REQUIRED_CONTRACT_FIELDS,
    nextAction: `Open the original source for ${exercise.sourceFile || "unknown/unavailable"} / ${exercise.question || "unknown/unavailable"} and fill ${SOURCE_REVIEW_FILE} with the full technical contract.`,
    promotionGate: [
      "sourceText is longer than a heading/points line",
      "target file or surface is known",
      "input/output contract is explicit",
      "validation/errors and acceptance gate are explicit",
      "score rubric can be mapped without inventing code",
      "sourceRefs remain traceable",
    ],
    blockerEvidence: `Only heading-level source is available now: ${exercise.sectionText || "unknown/unavailable"}; refs: ${sourceRefText}`,
  };
}

function auditExercise(exercise) {
  const failures = [];
  const sourceTextIsOnlyHeading = onlyGenericSourceText(exercise.sectionText);
  const noInventedCodeSurface = hasNoInventedCodeSurface(exercise);
  const lockedCorrectly = exercise.status === "manual_review" && exercise.autoScorable === false;
  const manualSourceReviewTask = hasManualSourceReviewTask(exercise);
  const sourceReviewTarget = targetFileIsSourceReview(exercise);
  const traceableSourceRefs = sourceRefsAreTraceable(exercise);
  const rubricIsReviewGate = rubricPoints(exercise) === 100 &&
    (exercise.scoreRubric || []).some((item) => /עיון ידני|manual_review|ציון אוטומטי/.test(`${item.label || ""} ${item.evidence || ""}`));

  if (!lockedCorrectly) failures.push("manual_review section must be locked and non-autoScorable.");
  if (!sourceTextIsOnlyHeading) failures.push("manual_review section contains enough apparent source text; review whether it can be promoted to ready.");
  if (!noInventedCodeSurface) failures.push("manual_review section must not contain generated implementation/code references.");
  if (!manualSourceReviewTask) failures.push(`manual_review section must include a source-review task in ${SOURCE_REVIEW_FILE}.`);
  if (!sourceReviewTarget) failures.push(`manual_review section projectFileTree.targetFile must be ${SOURCE_REVIEW_FILE}.`);
  if (!traceableSourceRefs) failures.push("manual_review section must keep sourceRefs traceable to exam_sections_task_breakdown.");
  if (!rubricIsReviewGate) failures.push("manual_review rubric must be a 100-point internal review gate, not an auto-score rubric.");

  return {
    id: exercise.id,
    idx: exercise.idx,
    sourceFile: exercise.sourceFile || "unknown/unavailable",
    question: exercise.question || "unknown/unavailable",
    sectionText: exercise.sectionText || "unknown/unavailable",
    reason: sourceTextIsOnlyHeading ? "insufficient-source-contract" : "needs-human-review",
    lockedCorrectly,
    autoScorable: exercise.autoScorable,
    sourceTextIsOnlyHeading,
    noInventedCodeSurface,
    manualSourceReviewTask,
    sourceReviewTarget,
    traceableSourceRefs,
    rubricIsReviewGate,
    closurePlan: manualReviewClosurePlan(exercise),
    sourceRefs: exercise.sourceRefs || [],
    failures,
  };
}

function buildReport() {
  const source = read(DATA_FILE);
  const tree = loadTree();
  const failures = [];
  const sectionExercises = Array.isArray(tree && tree.sectionExercises) ? tree.sectionExercises : [];
  const manualReviewSections = sectionExercises.filter((exercise) => exercise.status === "manual_review");
  const manualReviewIds = manualReviewSections.map((exercise) => exercise.id).sort();
  const expected = EXPECTED_MANUAL_REVIEW_IDS.slice().sort();

  if (source.includes(FORBIDDEN_NATIVE_RANDOM_TOKEN)) failures.push("Forbidden native random token appears in exam task tree data.");
  if (sectionExercises.length !== 73) failures.push(`Expected 73 section exercises, got ${sectionExercises.length}.`);
  if (manualReviewSections.length !== EXPECTED_MANUAL_REVIEW_IDS.length) {
    failures.push(`Expected ${EXPECTED_MANUAL_REVIEW_IDS.length} manual_review sections, got ${manualReviewSections.length}.`);
  }
  if (manualReviewIds.join("|") !== expected.join("|")) {
    failures.push(`Expected manual_review ids ${expected.join(", ")}, got ${manualReviewIds.join(", ") || "none"}.`);
  }

  const sections = manualReviewSections.map(auditExercise);
  sections.forEach((section) => {
    section.failures.forEach((failure) => failures.push(`${section.id}: ${failure}`));
  });

  const readySections = sectionExercises.filter((exercise) => exercise.status === "ready");
  const readyWithManualIds = readySections.filter((exercise) => EXPECTED_MANUAL_REVIEW_IDS.includes(exercise.id));
  if (readyWithManualIds.length) {
    failures.push(`Manual-review ids were promoted without source contract: ${readyWithManualIds.map((exercise) => exercise.id).join(", ")}.`);
  }

  return {
    reportVersion: "exam-manual-review-sections-v1",
    ready: failures.length === 0,
    policy: "manual_review stays locked until the original source exposes a complete technical contract; no invented code is allowed.",
    expectedManualReviewIds: EXPECTED_MANUAL_REVIEW_IDS,
    totals: {
      sectionExercises: sectionExercises.length,
      readySections: readySections.length,
      manualReviewSections: manualReviewSections.length,
      lockedNonAutoScorable: sections.filter((section) => section.lockedCorrectly).length,
      withSourceReviewTask: sections.filter((section) => section.manualSourceReviewTask).length,
      withoutInventedCodeSurface: sections.filter((section) => section.noInventedCodeSurface).length,
      sourceHeadingOnly: sections.filter((section) => section.sourceTextIsOnlyHeading).length,
      promotionReady: sections.filter((section) => section.closurePlan && section.closurePlan.canPromote).length,
      requiredContractFields: REQUIRED_CONTRACT_FIELDS.length,
    },
    sections,
    failures,
  };
}

function writeReports(report) {
  fs.writeFileSync(OUT_JSON, `${JSON.stringify(report, null, 2)}\n`);
  const sectionRows = report.sections.map((section) =>
    `| ${section.id} | ${section.sourceFile} | ${section.question} | ${section.reason} | ${section.lockedCorrectly ? "V" : "X"} | ${section.noInventedCodeSurface ? "V" : "X"} | ${section.manualSourceReviewTask ? "V" : "X"} | ${section.closurePlan.canPromote ? "V" : "X"} | ${section.closurePlan.missingEvidence.length} |`,
  ).join("\n");
  const closureRows = report.sections.map((section) => [
    `### ${section.id} - ${section.sourceFile} / ${section.question}`,
    "",
    `- blockerEvidence: ${section.closurePlan.blockerEvidence}`,
    `- nextAction: ${section.closurePlan.nextAction}`,
    "- missingEvidence:",
    section.closurePlan.missingEvidence.map((field) => `  - ${field.id}: ${field.label} - ${field.evidence}`).join("\n"),
    "- promotionGate:",
    section.closurePlan.promotionGate.map((gate) => `  - ${gate}`).join("\n"),
    "",
  ].join("\n")).join("\n");
  const md = [
    "# Exam Manual Review Sections Report",
    "",
    `- ready: ${report.ready}`,
    `- policy: ${report.policy}`,
    `- sectionExercises: ${report.totals.sectionExercises}`,
    `- readySections: ${report.totals.readySections}`,
    `- manualReviewSections: ${report.totals.manualReviewSections}`,
    `- lockedNonAutoScorable: ${report.totals.lockedNonAutoScorable}/${report.totals.manualReviewSections}`,
    `- withSourceReviewTask: ${report.totals.withSourceReviewTask}/${report.totals.manualReviewSections}`,
    `- withoutInventedCodeSurface: ${report.totals.withoutInventedCodeSurface}/${report.totals.manualReviewSections}`,
    `- promotionReady: ${report.totals.promotionReady}/${report.totals.manualReviewSections}`,
    `- requiredContractFields: ${report.totals.requiredContractFields}`,
    "",
    "## Sections",
    "| ID | Source | Question | Reason | Locked | No Invented Code | Source Review Task | Promotion Ready | Missing Fields |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    sectionRows || "| none | unknown/unavailable | unknown/unavailable | unknown/unavailable | X | X | X | X | 0 |",
    "",
    "## Closure Plan",
    closureRows || "- none",
    "",
    "## Failures",
    report.failures.length ? report.failures.map((item) => `- ${item}`).join("\n") : "- none",
    "",
  ].join("\n");
  fs.writeFileSync(OUT_MD, `${md}\n`);
}

if (require.main === module) {
  const report = buildReport();
  writeReports(report);

  if (summary) {
    console.log(JSON.stringify({
      ready: report.ready,
      totals: report.totals,
      failures: report.failures.length,
    }, null, 2));
  } else {
    console.log(JSON.stringify(report, null, 2));
  }

  if (strict && !report.ready) {
    process.exitCode = 1;
  }
}

module.exports = { buildReport, writeReports };
