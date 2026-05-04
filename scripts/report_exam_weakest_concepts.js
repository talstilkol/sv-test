#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const questionQa = require("./build_question_qa_checklist.js");
const questionQuality = require("./report_question_quality.js");
const { byFilename } = require("./lib/sort.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "EXAM_WEEK_WEAKEST_CONCEPTS.json");
const MD_PATH = path.join(ROOT, "EXAM_WEEK_WEAKEST_CONCEPTS.md");
const REPORT_DATE = new Date().toISOString().slice(0,10);
const REPORT_VERSION = "exam-week-weakest-v1";
const TARGET = "SVCollege AI & Full Stack";

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
  ["lesson_sql_orm.js", "LESSON_SQL_ORM"],
  ["lesson_auth_security.js", "LESSON_AUTH_SECURITY"],
  ["lesson_nextjs.js", "LESSON_NEXTJS"],
  ["lesson_nestjs.js", "LESSON_NESTJS"],
  ["lesson_devops_deploy.js", "LESSON_DEVOPS_DEPLOY"],
  ["lesson_ai_engineering.js", "LESSON_AI_ENGINEERING"],
  ["lesson_design_systems.js", "LESSON_DESIGN_SYSTEMS"],
  ["lesson21.js", "LESSON_21"],
  ["lesson22.js", "LESSON_22"],
  ["lesson23.js", "LESSON_23"],
  ["lesson24.js", "LESSON_24"],
  ["lesson25.js", "LESSON_25"],
  ["lesson26.js", "LESSON_26"],
  ["lesson27.js", "LESSON_27"],
  ["ai_development.js", "AI_DEVELOPMENT"],
  ["react_blueprint.js", "REACT_BLUEPRINT"],
  ["workbook_taskmanager.js", "WORKBOOK_TASKMANAGER"],
  ["lesson_closures.js", "LESSON_CLOSURES"],
];

const CODE_LESSON_RE = /^(lesson_1[1-9]|lesson_2[0-7]|lesson_sql_orm|lesson_auth_security|lesson_nextjs|lesson_nestjs|lesson_devops_deploy|lesson_ai_engineering|lesson_design_systems|react_blueprint|workbook_taskmanager|ai_development)/;

function createSandbox() {
  return { window: {}, console };
}

function loadDataFile(file, sandbox = createSandbox()) {
  vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, file), "utf8"), sandbox, {
    filename: `data/${file}`,
  });
  return sandbox;
}

function dataFilesMatching(pattern) {
  return fs.readdirSync(DATA_DIR)
    .filter((file) => pattern.test(file))
    .sort(byFilename);
}

function readDataValue(file, globalName) {
  const sandbox = loadDataFile(file);
  return sandbox[globalName] || sandbox.window[globalName];
}

function stableList(values = []) {
  const seen = new Set();
  return values
    .flat()
    .map((value) => String(value || "").trim())
    .filter((value) => {
      if (!value || seen.has(value)) return false;
      seen.add(value);
      return true;
    });
}

function normalizeTerm(value) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/[\u0591-\u05C7]/g, "")
    .replace(/[״"]/g, '"')
    .replace(/[׳']/g, "'")
    .replace(/[‐‑‒–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function splitConceptKey(key) {
  const raw = String(key || "").trim();
  const idx = raw.indexOf("::");
  if (idx < 0) return { lessonId: "", conceptName: raw };
  return { lessonId: raw.slice(0, idx), conceptName: raw.slice(idx + 2) };
}

function conceptKey(lessonId, conceptName) {
  return `${String(lessonId || "").trim()}::${String(conceptName || "").trim()}`;
}

function loadLessons() {
  const sandbox = createSandbox();
  LESSON_FILES.forEach(([file]) => loadDataFile(file, sandbox));
  return LESSON_FILES
    .map(([, globalName]) => sandbox[globalName] || sandbox.window[globalName])
    .filter(Boolean);
}

function loadPrimaryBlueprint() {
  const blueprints = readDataValue("course_blueprints.js", "COURSE_BLUEPRINTS") || [];
  const blueprint = blueprints.find((item) => item.id === "svcollege_fullstack_ai");
  if (!blueprint) throw new Error("Missing primary SVCollege course blueprint.");
  return blueprint;
}

function loadDefinitions() {
  const defs = readDataValue("concise_definitions.js", "CONCISE_CONCEPT_DEFINITIONS") || {};
  const byTerm = new Map();
  Object.entries(defs).forEach(([term, value]) => {
    byTerm.set(normalizeTerm(term), value);
  });
  return byTerm;
}

function cleanDerivedDefinition(value) {
  const text = String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "";
  const firstSentence = text.split(/(?<=[.!?。])\s+|[׃]\s+/)[0] || text;
  const beforeExample = firstSentence.split(/\s+לדוגמה[:：]?|\s+למשל[:：]?/)[0] || firstSentence;
  const clean = beforeExample.trim();
  if (clean.length <= 110) return clean;
  return `${clean.slice(0, 107).replace(/\s+\S*$/, "")}...`;
}

function deriveDefinitionFromConcept(concept) {
  const levels = concept && concept.levels ? concept.levels : {};
  const what = cleanDerivedDefinition(
    concept && (
      concept.conciseDefinition ||
      levels.grandma ||
      levels.child ||
      concept.description ||
      concept.summary
    ),
  );
  if (!what) return null;
  const need = cleanDerivedDefinition(
    (concept && concept.mustKnow) ||
    levels.student ||
    levels.technical ||
    levels.parent ||
    levels.child ||
    what,
  );
  return { what, need: need || what, derived: true };
}

function addDerivedDefinitions(definitions, concepts) {
  concepts.forEach((concept) => {
    const term = normalizeTerm(concept.conceptName);
    if (!term || definitions.has(term)) return;
    const derived = deriveDefinitionFromConcept(concept);
    if (derived) definitions.set(term, derived);
  });
  return definitions;
}

function loadPrerequisites() {
  const files = ["prerequisites.js", ...dataFilesMatching(/^svcollege_prerequisites_.*\.js$/)];
  const sandbox = createSandbox();
  files.forEach((file) => loadDataFile(file, sandbox));
  const maps = [];
  if (sandbox.CONCEPT_PREREQUISITES || sandbox.window.CONCEPT_PREREQUISITES) {
    maps.push(sandbox.CONCEPT_PREREQUISITES || sandbox.window.CONCEPT_PREREQUISITES);
  }
  Object.keys(sandbox)
    .filter((key) => /^SVCOLLEGE_.*_PREREQUISITES$/.test(key))
    .sort((a, b) => a.localeCompare(b))
    .forEach((key) => maps.push(sandbox[key]));
  return Object.assign({}, ...maps);
}

function buildConceptCatalog(blueprint, lessons) {
  const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
  const concepts = new Map();
  const lessonToModule = new Map();
  const keyToModule = new Map();

  blueprint.modules.forEach((module, moduleIndex) => {
    (module.lessonIds || []).forEach((lessonId) => {
      if (!lessonToModule.has(lessonId)) lessonToModule.set(lessonId, { module, moduleIndex });
    });
    (module.conceptKeys || []).forEach((key) => {
      if (!keyToModule.has(key)) keyToModule.set(key, { module, moduleIndex });
    });
  });

  blueprint.modules.forEach((module, moduleIndex) => {
    (module.lessonIds || []).forEach((lessonId) => {
      const lesson = lessonById.get(lessonId);
      if (!lesson) return;
      (lesson.concepts || []).forEach((concept, index) => {
        const key = conceptKey(lesson.id, concept.conceptName);
        if (!concepts.has(key)) {
          concepts.set(key, {
            key,
            lessonId: lesson.id,
            lessonTitle: lesson.title || "",
            conceptName: concept.conceptName || "",
            moduleTitle: module.title,
            moduleIndex,
            conceptIndex: index,
            difficulty: typeof concept.difficulty === "number" ? concept.difficulty : 1,
            codeBearing: Boolean(concept.codeExample || concept.code || CODE_LESSON_RE.test(lesson.id || "")),
            levels: concept.levels || {},
            description: concept.description || "",
            conciseDefinition: concept.conciseDefinition || "",
            mustKnow: concept.mustKnow || "",
          });
        }
      });
    });
    (module.conceptKeys || []).forEach((key) => {
      if (concepts.has(key)) return;
      const parsed = splitConceptKey(key);
      concepts.set(key, {
        key,
        lessonId: parsed.lessonId,
        lessonTitle: parsed.lessonId,
        conceptName: parsed.conceptName,
        moduleTitle: module.title,
        moduleIndex,
        conceptIndex: 999,
        difficulty: 1,
        codeBearing: CODE_LESSON_RE.test(parsed.lessonId),
        levels: {},
        description: "",
        conciseDefinition: "",
        mustKnow: "",
      });
    });
  });

  Array.from(concepts.values()).forEach((concept) => {
    const override = keyToModule.get(concept.key) || lessonToModule.get(concept.lessonId);
    if (!override) return;
    concept.moduleTitle = override.module.title;
    concept.moduleIndex = override.moduleIndex;
  });

  return Array.from(concepts.values()).sort((a, b) =>
    a.moduleIndex - b.moduleIndex ||
    a.lessonId.localeCompare(b.lessonId) ||
    a.conceptIndex - b.conceptIndex ||
    a.conceptName.localeCompare(b.conceptName, "he"),
  );
}

function keysFromItem(item) {
  return stableList([
    item && item.conceptKey,
    item && item.conceptKeys,
    item && item.requiredConcepts,
  ]);
}

function addQuestionStats(stats, item, kind) {
  keysFromItem(item).forEach((key) => {
    if (!stats[key]) {
      stats[key] = { total: 0, mc: 0, fill: 0, hard: 0, codeProof: 0, trace: 0, bug: 0, build: 0 };
    }
    const row = stats[key];
    row.total += 1;
    if (kind === "mc") row.mc += 1;
    if (kind === "fill") row.fill += 1;
    if (kind === "trace") row.trace += 1;
    if (kind === "bug") row.bug += 1;
    if (kind === "build") row.build += 1;
    if (kind === "fill" || kind === "trace" || kind === "bug" || kind === "build") row.codeProof += 1;
    if (typeof item.level === "number" && item.level >= 4) row.hard += 1;
  });
}

function loadTraceBuildBugPractice() {
  const sandbox = createSandbox();
  ["questions_trace.js", "questions_build.js", "questions_bug.js"]
    .filter((file) => fs.existsSync(path.join(DATA_DIR, file)))
    .forEach((file) => loadDataFile(file, sandbox));
  dataFilesMatching(/^svcollege_(traces|builds)_.*\.js$/).forEach((file) => loadDataFile(file, sandbox));

  const traces = [];
  const builds = [];
  Object.keys(sandbox)
    .sort((a, b) => a.localeCompare(b))
    .forEach((key) => {
      if (key === "QUESTIONS_TRACE" || /^SVCOLLEGE_.*_TRACES$/.test(key)) traces.push(...(sandbox[key] || []));
      if (key === "QUESTIONS_BUILD" || /^SVCOLLEGE_.*_BUILDS$/.test(key)) builds.push(...(sandbox[key] || []));
    });

  return {
    traces,
    builds,
    bugs: sandbox.QUESTIONS_BUG || [],
  };
}

function buildQuestionStats() {
  const stats = Object.create(null);
  const base = questionQuality.loadQuestionBanks();
  const svcollege = questionQa.loadSvcollegeQuestions();
  const practice = loadTraceBuildBugPractice();

  [...base.mc, ...svcollege.filter((q) => q.kind === "mc")].forEach((q) => addQuestionStats(stats, q, "mc"));
  [...base.fill, ...svcollege.filter((q) => q.kind === "fill")].forEach((q) => addQuestionStats(stats, q, "fill"));
  svcollege.filter((q) => q.kind === "bugHunt").forEach((q) => addQuestionStats(stats, q, "bug"));
  practice.bugs.forEach((q) => addQuestionStats(stats, q, "bug"));
  practice.traces.forEach((q) => addQuestionStats(stats, q, "trace"));
  practice.builds.forEach((q) => addQuestionStats(stats, q, "build"));

  return stats;
}

function buildQaIssueCounts() {
  const checklist = questionQa.buildChecklist();
  const gate = checklist.gates && checklist.gates.svcollegePrerequisites;
  const issues = gate && Array.isArray(gate.issues) ? gate.issues : [];
  return issues.reduce((counts, issue) => {
    const key = issue.conceptKey || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, Object.create(null));
}

function countSummary(concepts) {
  return {
    totalConcepts: concepts.length,
    withoutQuestions: concepts.filter((item) => item.counts.total === 0).length,
    withoutHardQuestion: concepts.filter((item) => item.counts.hard === 0).length,
    withoutDefinition: concepts.filter((item) => !item.hasDefinition).length,
    withoutPrerequisiteEntry: concepts.filter((item) => !item.hasPrerequisiteEntry).length,
    codeConceptsWithoutProof: concepts.filter((item) => item.codeBearing && item.counts.codeProof === 0).length,
  };
}

function riskForConcept(concept, context) {
  const counts = context.questionStats[concept.key] || { total: 0, mc: 0, fill: 0, hard: 0, codeProof: 0, trace: 0, bug: 0, build: 0 };
  const hasDefinition = context.definitions.has(normalizeTerm(concept.conceptName));
  const hasPrerequisiteEntry = Object.prototype.hasOwnProperty.call(context.prerequisites, concept.key);
  const qaIssues = context.qaIssueCounts[concept.key] || 0;
  const reasons = [];
  let risk = 0;

  if (counts.total === 0) {
    risk += 70;
    reasons.push("אין שאלות למושג");
  } else if (counts.total < 3) {
    risk += (3 - counts.total) * 18;
    reasons.push(`רק ${counts.total} שאלות`);
  }
  if (counts.hard === 0) {
    risk += 35;
    reasons.push("אין שאלת עומק");
  }
  if (counts.fill === 0) {
    risk += 12;
    reasons.push("אין Fill/השלמת קוד");
  }
  if (concept.codeBearing && counts.codeProof === 0) {
    risk += 28;
    reasons.push("אין הוכחת קוד");
  }
  if (!hasDefinition) {
    risk += 18;
    reasons.push("אין הגדרה בשורה אחת");
  }
  if (!hasPrerequisiteEntry) {
    risk += 12;
    reasons.push("אין רשומת דרישות קדם");
  }
  if (qaIssues > 0) {
    risk += qaIssues * 10;
    reasons.push(`${qaIssues} בעיות QA בשאלות`);
  }

  risk += Math.min(20, (concept.difficulty || 1) * 2);
  risk += Math.max(0, 12 - concept.moduleIndex);
  if (reasons.length === 0) {
    reasons.push("עדיפות חזרה לפי קושי/מיקום בקורס");
  }

  return {
    ...concept,
    riskScore: Math.round(risk * 10) / 10,
    reasons,
    hasDefinition,
    hasPrerequisiteEntry,
    qaIssues,
    counts,
    nextAction: nextActionFor(concept, counts, hasDefinition, hasPrerequisiteEntry, qaIssues),
  };
}

function nextActionFor(concept, counts, hasDefinition, hasPrerequisiteEntry, qaIssues) {
  if (!hasDefinition) return "להוסיף הגדרה בשורה אחת: מה זה, בלי מילים מיותרות.";
  if (!hasPrerequisiteEntry) return "להוסיף/לאמת דרישות קדם לפני שאלה קשה.";
  if (counts.hard === 0) return "להוסיף שאלת עומק ברמה 6/7 עם הסבר ודיסטרקטורים.";
  if (concept.codeBearing && counts.codeProof === 0) return "להוסיף Trace/Bug/Fill שמוכיח הבנת קוד.";
  if (qaIssues > 0) return "לתקן aid/terms/prerequisites בשאלות הקיימות.";
  if (counts.total < 3) return "להוסיף וריאציות נוספות כדי למנוע חזרת שאלה.";
  return "לבדוק ידנית בסימולציית תלמיד נקייה.";
}

function buildReport() {
  const blueprint = loadPrimaryBlueprint();
  const lessons = loadLessons();
  const concepts = buildConceptCatalog(blueprint, lessons);
  const context = {
    definitions: addDerivedDefinitions(loadDefinitions(), concepts),
    prerequisites: loadPrerequisites(),
    questionStats: buildQuestionStats(),
    qaIssueCounts: buildQaIssueCounts(),
  };
  const rankedConcepts = concepts
    .map((concept) => riskForConcept(concept, context))
    .sort((a, b) =>
      b.riskScore - a.riskScore ||
      a.moduleIndex - b.moduleIndex ||
      a.lessonId.localeCompare(b.lessonId) ||
      a.conceptIndex - b.conceptIndex ||
      a.conceptName.localeCompare(b.conceptName, "he"),
    );

  const topTen = rankedConcepts.slice(0, 10).map((item, index) => ({ rank: index + 1, ...item }));

  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: TARGET,
    source: "course_blueprints + lesson concepts + question banks + QA gates",
    policy: {
      priority: "P-0.3.1",
      maxRows: 10,
      hardQuestionLevel: 4,
      noRandom: true,
    },
    summary: countSummary(rankedConcepts),
    topTen,
    concepts: rankedConcepts,
  };
}

function toMarkdown(report) {
  const lines = [
    "# Exam Week Weakest Concepts",
    "",
    `> Generated: ${report.date}`,
    `> Target: ${report.target}`,
    `> Policy: ${report.policy.priority}`,
    "",
    "## Summary",
    "",
    `- Concepts checked: ${report.summary.totalConcepts}`,
    `- Without questions: ${report.summary.withoutQuestions}`,
    `- Without hard question: ${report.summary.withoutHardQuestion}`,
    `- Without one-line definition: ${report.summary.withoutDefinition}`,
    `- Without prerequisite entry: ${report.summary.withoutPrerequisiteEntry}`,
    `- Code concepts without code proof: ${report.summary.codeConceptsWithoutProof}`,
    "",
    "## Weakest 10",
    "",
    "| # | Risk | Concept | Module | Questions | Hard | Code proof | Reasons | Next action |",
    "|---:|---:|---|---|---:|---:|---:|---|---|",
    ...report.topTen.map((item) => (
      `| ${item.rank} | ${item.riskScore} | \`${item.key}\` | ${item.moduleTitle} | ${item.counts.total} | ${item.counts.hard} | ${item.counts.codeProof} | ${item.reasons.join(", ") || "manual review"} | ${item.nextAction} |`
    )),
    "",
    "## Usage",
    "",
    "Run this every morning during exam week:",
    "",
    "```bash",
    "npm run exam:weakest:write",
    "```",
    "",
  ];
  return `${lines.join("\n")}\n`;
}

function writeReports(report) {
  fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(MD_PATH, toMarkdown(report));
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--write")) writeReports(report);
  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (argv.includes("--summary")) {
    process.stdout.write(`${JSON.stringify({
      reportVersion: report.reportVersion,
      date: report.date,
      target: report.target,
      summary: report.summary,
      topTen: report.topTen.map((item) => ({
        rank: item.rank,
        conceptKey: item.key,
        riskScore: item.riskScore,
        nextAction: item.nextAction,
      })),
    }, null, 2)}\n`);
  } else {
    process.stdout.write(toMarkdown(report));
  }
  return report;
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
  buildConceptCatalog,
  buildReport,
  normalizeTerm,
  run,
  toMarkdown,
};
