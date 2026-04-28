#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const REPORT_DATE = "2026-04-28";
const JSON_PATH = path.join(ROOT, "SVCOLLEGE_READINESS_REPORT.json");
const MD_PATH = path.join(ROOT, "SVCOLLEGE_READINESS_REPORT.md");

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

const STATUS_BASELINE = Object.freeze({
  covered: 100,
  partial: 50,
  gap: 0,
});

function createSandbox() {
  return { window: {}, console };
}

function loadDataFile(file, sandbox = createSandbox()) {
  vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, file), "utf8"), sandbox, {
    filename: `data/${file}`,
  });
  return sandbox;
}

function readDataValue(file, globalName) {
  const sandbox = loadDataFile(file);
  return sandbox[globalName] || sandbox.window[globalName];
}

function pct(part, total) {
  if (!total) return 0;
  return Math.round((part / total) * 1000) / 10;
}

function capPercent(value) {
  return Math.max(0, Math.min(100, Math.round(value * 10) / 10));
}

function average(values) {
  if (!values.length) return 0;
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) / 10;
}

function buildLessonCatalog() {
  const sandbox = createSandbox();
  LESSON_FILES.forEach(([file]) => loadDataFile(file, sandbox));

  const lessons = LESSON_FILES.map(([, globalName]) => sandbox[globalName] || sandbox.window[globalName]).filter(Boolean);
  const lessonIds = new Set();
  const conceptKeys = new Set();

  lessons.forEach((lesson) => {
    if (!lesson || !lesson.id) return;
    lessonIds.add(lesson.id);
    (lesson.concepts || []).forEach((concept) => {
      if (concept && concept.conceptName) {
        conceptKeys.add(`${lesson.id}::${concept.conceptName}`);
      }
    });
  });

  return { lessons, lessonIds, conceptKeys };
}

function listQuestions(bank, kind) {
  return Array.isArray(bank && bank[kind]) ? bank[kind] : [];
}

function collectPractice() {
  const bank = readDataValue("questions_bank.js", "QUESTIONS_BANK") || {};
  const seeded = readDataValue("questions_bank_seeded.js", "QUESTIONS_BANK_SEEDED") || {};
  const sqlOrmQuestions = readDataValue("svcollege_questions_sql_orm.js", "SVCOLLEGE_SQL_ORM_QUESTIONS") || {};
  const sqlOrmTraces = readDataValue("svcollege_traces_sql_orm.js", "SVCOLLEGE_SQL_ORM_TRACES") || [];
  const sqlOrmBuilds = readDataValue("svcollege_builds_sql_orm.js", "SVCOLLEGE_SQL_ORM_BUILDS") || [];
  const authQuestions = readDataValue("svcollege_questions_auth.js", "SVCOLLEGE_AUTH_QUESTIONS") || {};
  const authTraces = readDataValue("svcollege_traces_auth.js", "SVCOLLEGE_AUTH_TRACES") || [];
  const authBuilds = readDataValue("svcollege_builds_auth.js", "SVCOLLEGE_AUTH_BUILDS") || [];
  const nextjsQuestions = readDataValue("svcollege_questions_nextjs.js", "SVCOLLEGE_NEXTJS_QUESTIONS") || {};
  const nextjsTraces = readDataValue("svcollege_traces_nextjs.js", "SVCOLLEGE_NEXTJS_TRACES") || [];
  const nextjsBuilds = readDataValue("svcollege_builds_nextjs.js", "SVCOLLEGE_NEXTJS_BUILDS") || [];

  return {
    mc: [
      ...listQuestions(bank, "mc"),
      ...listQuestions(seeded, "mc"),
      ...listQuestions(sqlOrmQuestions, "mc"),
      ...listQuestions(authQuestions, "mc"),
      ...listQuestions(nextjsQuestions, "mc"),
    ],
    fill: [
      ...listQuestions(bank, "fill"),
      ...listQuestions(seeded, "fill"),
      ...listQuestions(sqlOrmQuestions, "fill"),
      ...listQuestions(authQuestions, "fill"),
      ...listQuestions(nextjsQuestions, "fill"),
    ],
    trace: [...(readDataValue("questions_trace.js", "QUESTIONS_TRACE") || []), ...sqlOrmTraces, ...authTraces, ...nextjsTraces],
    builds: [...(readDataValue("questions_build.js", "QUESTIONS_BUILD") || []), ...sqlOrmBuilds, ...authBuilds, ...nextjsBuilds],
    bugs: [
      ...(readDataValue("questions_bug.js", "QUESTIONS_BUG") || []),
      ...listQuestions(sqlOrmQuestions, "bugHunt"),
      ...listQuestions(authQuestions, "bugHunt"),
      ...listQuestions(nextjsQuestions, "bugHunt"),
    ],
    pairMatch: readDataValue("pair_match.js", "PAIR_MATCH_GAMES") || [],
    capstones: readDataValue("capstones.js", "CAPSTONE_PROJECTS") || [],
  };
}

function conceptMatches(item, conceptKeys, lessonIds) {
  if (!item || !item.conceptKey) return false;
  if (conceptKeys.has(item.conceptKey)) return true;
  return Array.from(lessonIds).some((lessonId) => item.conceptKey.startsWith(`${lessonId}::`));
}

function countConceptPractice(items, conceptKeys, lessonIds) {
  return (Array.isArray(items) ? items : []).filter((item) => conceptMatches(item, conceptKeys, lessonIds)).length;
}

function countPairMatchPractice(games, lessonIds) {
  return (Array.isArray(games) ? games : [])
    .filter((game) => lessonIds.has(game.lesson))
    .reduce((sum, game) => sum + (Array.isArray(game.pairs) ? game.pairs.length : 0), 0);
}

function countCapstonePractice(projects, conceptKeys, lessonIds) {
  return (Array.isArray(projects) ? projects : []).filter((project) => {
    const projectKeys = new Set(project.conceptKeys || []);
    const hasConcept = Array.from(conceptKeys).some((key) => projectKeys.has(key));
    const recommendedAfter = new Set(project.recommendedAfter || []);
    const hasLesson = Array.from(lessonIds).some((lessonId) => recommendedAfter.has(lessonId));
    return hasConcept || hasLesson;
  }).length;
}

function scoreModule(module, lessonCatalog, practice) {
  const lessonIds = new Set(module.lessonIds || []);
  const conceptKeys = new Set(module.conceptKeys || []);
  const existingLessons = Array.from(lessonIds).filter((lessonId) => lessonCatalog.lessonIds.has(lessonId));
  const existingConcepts = Array.from(conceptKeys).filter((key) => lessonCatalog.conceptKeys.has(key));

  const counts = {
    mc: countConceptPractice(practice.mc, conceptKeys, lessonIds),
    fill: countConceptPractice(practice.fill, conceptKeys, lessonIds),
    trace: countConceptPractice(practice.trace, conceptKeys, lessonIds),
    miniBuild: countConceptPractice(practice.builds, conceptKeys, lessonIds),
    bugHunt: countConceptPractice(practice.bugs, conceptKeys, lessonIds),
    pairMatchPairs: countPairMatchPractice(practice.pairMatch, lessonIds),
    capstone: countCapstonePractice(practice.capstones, conceptKeys, lessonIds),
    generatedFlashcards: existingConcepts.length,
  };

  const questionCount = counts.mc + counts.fill;
  const activityCount = counts.trace + counts.miniBuild + counts.bugHunt + counts.pairMatchPairs + counts.capstone;
  const questionTarget = Math.max(conceptKeys.size * 2, lessonIds.size ? 2 : 0);

  const dimensions = {
    declaredStatus: STATUS_BASELINE[module.status] ?? 0,
    lessonCoverage: lessonIds.size ? pct(existingLessons.length, lessonIds.size) : 0,
    conceptCoverage: conceptKeys.size ? pct(existingConcepts.length, conceptKeys.size) : 0,
    questionCoverage: questionTarget ? capPercent((questionCount / questionTarget) * 100) : 0,
    activityCoverage: lessonIds.size ? (activityCount > 0 ? 100 : 0) : 0,
  };

  const readiness = capPercent(
    dimensions.declaredStatus * 0.2 +
      dimensions.lessonCoverage * 0.2 +
      dimensions.conceptCoverage * 0.2 +
      dimensions.questionCoverage * 0.25 +
      dimensions.activityCoverage * 0.15,
  );

  const level = readiness >= 90 && module.status === "covered" ? "green" : readiness >= 50 ? "amber" : "red";

  return {
    title: module.title,
    status: module.status,
    readiness,
    level,
    lessonIds: Array.from(lessonIds),
    existingLessons,
    conceptKeys: Array.from(conceptKeys),
    existingConcepts,
    dimensions,
    counts,
    nextAction: module.primaryGap || "Maintain practice, mock-exam coverage and tab health.",
  };
}

function validateBlueprint(blueprint) {
  const failures = [];
  if (!blueprint) {
    failures.push("Missing svcollege_fullstack_ai blueprint");
    return failures;
  }
  if (blueprint.priority !== "primary") failures.push("SVCollege blueprint is not marked primary");
  if (!Array.isArray(blueprint.sources) || !blueprint.sources.length) failures.push("SVCollege blueprint has no source");
  if (!Array.isArray(blueprint.modules) || !blueprint.modules.length) failures.push("SVCollege blueprint has no modules");

  const titles = new Set();
  (blueprint.modules || []).forEach((module, index) => {
    if (!module.title) failures.push(`Module ${index + 1} is missing title`);
    if (titles.has(module.title)) failures.push(`Duplicate module title: ${module.title}`);
    titles.add(module.title);
    if (!Object.prototype.hasOwnProperty.call(STATUS_BASELINE, module.status)) {
      failures.push(`${module.title}: unknown status ${module.status}`);
    }
    if ((module.status === "partial" || module.status === "gap") && !module.primaryGap) {
      failures.push(`${module.title}: partial/gap module has no primaryGap`);
    }
  });
  return failures;
}

function buildReport() {
  const blueprints = readDataValue("course_blueprints.js", "COURSE_BLUEPRINTS") || [];
  const blueprint = blueprints.find((item) => item.id === "svcollege_fullstack_ai");
  const lessonCatalog = buildLessonCatalog();
  const practice = collectPractice();
  const modules = (blueprint && blueprint.modules ? blueprint.modules : []).map((module) =>
    scoreModule(module, lessonCatalog, practice),
  );
  const statusCounts = modules.reduce(
    (counts, module) => {
      counts[module.status] = (counts[module.status] || 0) + 1;
      counts[module.level] = (counts[module.level] || 0) + 1;
      return counts;
    },
    { covered: 0, partial: 0, gap: 0, green: 0, amber: 0, red: 0 },
  );
  const releaseBlockers = modules
    .filter((module) => module.status !== "covered" || module.readiness < 100)
    .map((module) => `${module.title} (${module.status}, ${module.readiness}%)`);

  return {
    reportVersion: "svcollege-readiness-v1",
    date: REPORT_DATE,
    source: "data/course_blueprints.js#svcollege_fullstack_ai",
    summary: {
      modules: modules.length,
      covered: statusCounts.covered,
      partial: statusCounts.partial,
      gap: statusCounts.gap,
      green: statusCounts.green,
      amber: statusCounts.amber,
      red: statusCounts.red,
      averageReadiness: average(modules.map((module) => module.readiness)),
      finishLineReady: releaseBlockers.length === 0,
    },
    validation: {
      failures: validateBlueprint(blueprint),
    },
    releaseBlockers,
    modules,
  };
}

function markdownTableRows(modules) {
  return modules.map((module) => {
    return `| ${module.title} | ${module.status} | ${module.readiness}% | ${module.level} | ${module.dimensions.lessonCoverage}% | ${module.dimensions.conceptCoverage}% | ${module.dimensions.questionCoverage}% | ${module.dimensions.activityCoverage}% | ${module.nextAction} |`;
  });
}

function toMarkdown(report) {
  const lines = [
    "# SVCollege Readiness Report",
    "",
    `> Generated: ${report.date}`,
    `> Source: \`${report.source}\``,
    "",
    "## Summary",
    "",
    `- Modules: ${report.summary.modules}`,
    `- Covered / Partial / Gap: ${report.summary.covered}/${report.summary.partial}/${report.summary.gap}`,
    `- Green / Amber / Red: ${report.summary.green}/${report.summary.amber}/${report.summary.red}`,
    `- Average readiness: ${report.summary.averageReadiness}%`,
    `- Finish Line 1 ready: ${report.summary.finishLineReady ? "yes" : "no"}`,
    "",
    "## Module Readiness",
    "",
    "| Module | Status | Readiness | Level | Lessons | Concepts | Questions | Activities | Next action |",
    "|---|---:|---:|---|---:|---:|---:|---:|---|",
    ...markdownTableRows(report.modules),
    "",
    "## Release Blockers",
    "",
    ...(report.releaseBlockers.length ? report.releaseBlockers.map((item) => `- ${item}`) : ["- None"]),
    "",
    "## Validation",
    "",
    ...(report.validation.failures.length ? report.validation.failures.map((item) => `- ${item}`) : ["- Blueprint metadata is valid."]),
    "",
  ];
  return `${lines.join("\n")}\n`;
}

function printSummary(report) {
  console.log(
    `SVCollege readiness: ${report.summary.averageReadiness}% average, ${report.summary.covered}/${report.summary.modules} covered, ${report.summary.gap} gaps.`,
  );
  if (report.validation.failures.length) {
    console.log(`Metadata failures: ${report.validation.failures.length}`);
  }
  if (report.releaseBlockers.length) {
    console.log(`Release blockers: ${report.releaseBlockers.length}`);
  }
}

function runCli() {
  const args = new Set(process.argv.slice(2));
  const report = buildReport();

  if (args.has("--write")) {
    fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(MD_PATH, toMarkdown(report));
  }

  if (args.has("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printSummary(report);
  }

  if (args.has("--strict") && report.validation.failures.length) {
    console.error(`SVCollege readiness metadata failures: ${report.validation.failures.join("; ")}`);
    process.exit(1);
  }

  if (args.has("--release-gate") && report.releaseBlockers.length) {
    console.error(`Finish Line 1 is not ready: ${report.releaseBlockers.join("; ")}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  buildReport,
  toMarkdown,
};
