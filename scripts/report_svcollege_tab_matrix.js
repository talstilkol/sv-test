#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const REPORT_DATE = "2026-04-28";
const JSON_PATH = path.join(ROOT, "SVCOLLEGE_TAB_MATRIX.json");
const MD_PATH = path.join(ROOT, "SVCOLLEGE_TAB_MATRIX.md");

const LESSON_FILES = Object.freeze([
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
  ["lesson_closures.js", "LESSON_CLOSURES"],
  ["workbook_taskmanager.js", "WORKBOOK_TASKMANAGER"],
  ["ai_development.js", "AI_DEVELOPMENT"],
  ["react_blueprint.js", "REACT_BLUEPRINT"],
]);

const QUESTION_BANK_FILES = Object.freeze([
  ["questions_bank.js", "QUESTIONS_BANK"],
  ["svcollege_questions_sql_orm.js", "SVCOLLEGE_SQL_ORM_QUESTIONS"],
  ["svcollege_questions_auth.js", "SVCOLLEGE_AUTH_QUESTIONS"],
  ["svcollege_questions_nextjs.js", "SVCOLLEGE_NEXTJS_QUESTIONS"],
  ["svcollege_questions_nestjs.js", "SVCOLLEGE_NESTJS_QUESTIONS"],
  ["svcollege_questions_devops.js", "SVCOLLEGE_DEVOPS_QUESTIONS"],
  ["svcollege_questions_ai_engineering.js", "SVCOLLEGE_AI_ENGINEERING_QUESTIONS"],
  ["svcollege_questions_design_systems.js", "SVCOLLEGE_DESIGN_SYSTEMS_QUESTIONS"],
  ["svcollege_questions_bridge.js", "SVCOLLEGE_BRIDGE_QUESTIONS"],
]);

const TRACE_FILES = Object.freeze([
  ["questions_trace.js", "QUESTIONS_TRACE"],
  ["svcollege_traces_sql_orm.js", "SVCOLLEGE_SQL_ORM_TRACES"],
  ["svcollege_traces_auth.js", "SVCOLLEGE_AUTH_TRACES"],
  ["svcollege_traces_nextjs.js", "SVCOLLEGE_NEXTJS_TRACES"],
  ["svcollege_traces_nestjs.js", "SVCOLLEGE_NESTJS_TRACES"],
  ["svcollege_traces_devops.js", "SVCOLLEGE_DEVOPS_TRACES"],
  ["svcollege_traces_ai_engineering.js", "SVCOLLEGE_AI_ENGINEERING_TRACES"],
  ["svcollege_traces_design_systems.js", "SVCOLLEGE_DESIGN_SYSTEMS_TRACES"],
  ["svcollege_traces_bridge.js", "SVCOLLEGE_BRIDGE_TRACES"],
]);

const BUILD_FILES = Object.freeze([
  ["questions_build.js", "QUESTIONS_BUILD"],
  ["svcollege_builds_sql_orm.js", "SVCOLLEGE_SQL_ORM_BUILDS"],
  ["svcollege_builds_auth.js", "SVCOLLEGE_AUTH_BUILDS"],
  ["svcollege_builds_nextjs.js", "SVCOLLEGE_NEXTJS_BUILDS"],
  ["svcollege_builds_nestjs.js", "SVCOLLEGE_NESTJS_BUILDS"],
  ["svcollege_builds_devops.js", "SVCOLLEGE_DEVOPS_BUILDS"],
  ["svcollege_builds_ai_engineering.js", "SVCOLLEGE_AI_ENGINEERING_BUILDS"],
  ["svcollege_builds_design_systems.js", "SVCOLLEGE_DESIGN_SYSTEMS_BUILDS"],
  ["svcollege_builds_bridge.js", "SVCOLLEGE_BRIDGE_BUILDS"],
]);

const PREREQ_FILES = Object.freeze([
  ["prerequisites.js", "CONCEPT_PREREQUISITES"],
  ["svcollege_prerequisites_sql_orm.js", "SVCOLLEGE_SQL_ORM_PREREQUISITES"],
  ["svcollege_prerequisites_auth.js", "SVCOLLEGE_AUTH_PREREQUISITES"],
  ["svcollege_prerequisites_nextjs.js", "SVCOLLEGE_NEXTJS_PREREQUISITES"],
  ["svcollege_prerequisites_nestjs.js", "SVCOLLEGE_NESTJS_PREREQUISITES"],
  ["svcollege_prerequisites_devops.js", "SVCOLLEGE_DEVOPS_PREREQUISITES"],
  ["svcollege_prerequisites_ai_engineering.js", "SVCOLLEGE_AI_ENGINEERING_PREREQUISITES"],
  ["svcollege_prerequisites_design_systems.js", "SVCOLLEGE_DESIGN_SYSTEMS_PREREQUISITES"],
]);

const STRICT_TABS = Object.freeze([
  { id: "lessons", label: "שיעורים", need: "lesson" },
  { id: "rightTree", label: "עץ צד", need: "rightTree" },
  { id: "knowledgeMap", label: "מפת ידע", need: "topic" },
  { id: "gapMatrix", label: "פערים", need: "lesson" },
  { id: "studyMode", label: "לימוד מותאם", need: "lesson" },
  { id: "trainer", label: "מאמן", need: "questions" },
  { id: "flashcards", label: "כרטיסיות", need: "lesson" },
  { id: "mockExam", label: "מבחן", need: "questions" },
  { id: "codeTrace", label: "Code Trace", need: "trace" },
  { id: "bugHunt", label: "Bug Hunt", need: "bug" },
  { id: "miniBuild", label: "Mini Build", need: "build" },
  { id: "codeBlocks", label: "בלוקי קוד", need: "codeBlock" },
  { id: "capstones", label: "פרויקטים", need: "capstone" },
  { id: "prerequisites", label: "דרישות קדם", need: "prereq" },
  { id: "blueprints", label: "יישור SVCollege", need: "blueprint" },
]);

const SUPPORT_TABS = Object.freeze([
  ["guide", "מדריך מקוצר", "function setGuideContextTree"],
  ["grandma", "ידע מורחב", "function setGrandmaContextTree"],
  ["programmingBasics", "אבני בסיס", "function setProgrammingBasicsContextTree"],
  ["programmingPrinciples", "עקרונות יסוד", "function setProgrammingPrinciplesContextTree"],
  ["programmingMuseum", "מוזיאון", "function setProgrammingMuseumContextTree"],
  ["learningEvidence", "ראיות למידה", "function setLearningEvidenceContextTree"],
  ["comparator", "השוואות", "function setComparatorContextTree"],
]);

function createSandbox() {
  const sandbox = { window: {}, console };
  sandbox.global = sandbox;
  return sandbox;
}

function readDataValue(file, globalName) {
  const sandbox = createSandbox();
  vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, file), "utf8"), sandbox, {
    filename: `data/${file}`,
  });
  return sandbox[globalName] || sandbox.window[globalName];
}

function listQuestions(bank, kind) {
  return Array.isArray(bank && bank[kind]) ? bank[kind] : [];
}

function buildLessonCatalog() {
  const sandbox = createSandbox();
  LESSON_FILES.forEach(([file]) => {
    vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, file), "utf8"), sandbox, {
      filename: `data/${file}`,
    });
  });
  const lessons = LESSON_FILES
    .map(([, globalName]) => sandbox[globalName] || sandbox.window[globalName])
    .filter(Boolean);
  const lessonIds = new Set();
  const conceptKeys = new Set();
  lessons.forEach((lesson) => {
    lessonIds.add(lesson.id);
    (lesson.concepts || []).forEach((concept) => {
      conceptKeys.add(`${lesson.id}::${concept.conceptName}`);
    });
  });
  return { lessons, lessonIds, conceptKeys };
}

function collectPractice() {
  const banks = QUESTION_BANK_FILES.map(([file, globalName]) => readDataValue(file, globalName) || {});
  const traces = TRACE_FILES.flatMap(([file, globalName]) => readDataValue(file, globalName) || []);
  const builds = BUILD_FILES.flatMap(([file, globalName]) => readDataValue(file, globalName) || []);
  const codeBlocks = [
    ...((readDataValue("code_blocks.js", "CODE_BLOCKS") || {}).blocks || []),
    ...(readDataValue("svcollege_code_blocks.js", "SVCOLLEGE_CODE_BLOCKS") || []),
  ];
  const capstones = readDataValue("capstones.js", "CAPSTONE_PROJECTS") || [];
  const prerequisites = PREREQ_FILES.reduce((acc, [file, globalName]) => {
    return Object.assign(acc, readDataValue(file, globalName) || {});
  }, {});

  return {
    mc: banks.flatMap((bank) => listQuestions(bank, "mc")),
    fill: banks.flatMap((bank) => listQuestions(bank, "fill")),
    bug: [
      ...(readDataValue("questions_bug.js", "QUESTIONS_BUG") || []),
      ...banks.flatMap((bank) => listQuestions(bank, "bugHunt")),
    ],
    trace: traces,
    build: builds,
    codeBlocks,
    capstones,
    prerequisites,
  };
}

function appText() {
  return fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
}

function topicTaxonomyText(source) {
  const start = source.indexOf("const TOPIC_TAXONOMY = {");
  const end = source.indexOf("  function getTopicForLesson", start);
  if (start === -1 || end === -1) return "";
  return source.slice(start, end);
}

function moduleMatcher(module) {
  const lessonIds = new Set(module.lessonIds || []);
  const conceptKeys = new Set(module.conceptKeys || []);
  return (item) => {
    const key = item && item.conceptKey ? String(item.conceptKey) : "";
    if (conceptKeys.has(key)) return true;
    return Array.from(lessonIds).some((lessonId) => key.startsWith(`${lessonId}::`));
  };
}

function capstoneMatches(project, module) {
  const lessonIds = new Set(module.lessonIds || []);
  const conceptKeys = new Set(module.conceptKeys || []);
  const projectKeys = new Set(project.conceptKeys || []);
  const recommendedAfter = new Set(project.recommendedAfter || []);
  const hasConcept = Array.from(conceptKeys).some((key) => projectKeys.has(key));
  const hasLesson = Array.from(lessonIds).some((lessonId) => recommendedAfter.has(lessonId));
  return hasConcept || hasLesson;
}

function countExistingConcepts(module, lessonCatalog) {
  return (module.conceptKeys || []).filter((key) => lessonCatalog.conceptKeys.has(key)).length;
}

function buildModuleCells(module, context) {
  const lessonIds = new Set(module.lessonIds || []);
  const hasLessons = Array.from(lessonIds).every((lessonId) => context.lessonCatalog.lessonIds.has(lessonId));
  const topicMapped = Array.from(lessonIds).every((lessonId) =>
    context.topicText.includes(`"${lessonId}"`) || context.topicText.includes(`'${lessonId}'`)
  );
  const match = moduleMatcher(module);
  const counts = {
    lessons: Array.from(lessonIds).filter((lessonId) => context.lessonCatalog.lessonIds.has(lessonId)).length,
    concepts: countExistingConcepts(module, context.lessonCatalog),
    mc: context.practice.mc.filter(match).length,
    fill: context.practice.fill.filter(match).length,
    trace: context.practice.trace.filter(match).length,
    bug: context.practice.bug.filter(match).length,
    build: context.practice.build.filter(match).length,
    codeBlock: context.practice.codeBlocks.filter((block) => {
      const key = `${block.lessonId}::${block.conceptName}`;
      return (module.conceptKeys || []).includes(key) || lessonIds.has(block.lessonId);
    }).length,
    capstone: context.practice.capstones.filter((project) => capstoneMatches(project, module)).length,
    prereq: (module.conceptKeys || []).filter((key) => context.practice.prerequisites[key]).length,
  };

  const base = {
    lesson: hasLessons,
    rightTree: hasLessons && context.source.includes("function setLessonContextTree") && context.source.includes("lessonConceptTreeNodes"),
    topic: hasLessons && topicMapped,
    questions: counts.mc + counts.fill > 0,
    trace: counts.trace > 0,
    bug: counts.bug > 0,
    build: counts.build > 0,
    codeBlock: counts.codeBlock > 0,
    capstone: counts.capstone > 0,
    prereq: counts.prereq > 0 && context.source.includes("renderQuestionPrereqPanel"),
    blueprint: module.status === "covered",
  };

  const cells = STRICT_TABS.map((tab) => ({
    id: tab.id,
    label: tab.label,
    passed: !!base[tab.need],
    metric: tab.need === "questions"
      ? counts.mc + counts.fill
      : tab.need === "lesson"
        ? `${counts.lessons}/${lessonIds.size}`
        : counts[tab.need] ?? (base[tab.need] ? 1 : 0),
  }));

  return { counts, cells };
}

function buildSupportTabs(source) {
  return SUPPORT_TABS.map(([id, label, marker]) => ({
    id,
    label,
    passed: source.includes(marker),
    marker,
  }));
}

function buildReport() {
  const source = appText();
  const blueprints = readDataValue("course_blueprints.js", "COURSE_BLUEPRINTS") || [];
  const blueprint = blueprints.find((item) => item.id === "svcollege_fullstack_ai");
  const lessonCatalog = buildLessonCatalog();
  const practice = collectPractice();
  const context = {
    source,
    topicText: topicTaxonomyText(source),
    lessonCatalog,
    practice,
  };

  const modules = (blueprint?.modules || []).map((module) => {
    const { counts, cells } = buildModuleCells(module, context);
    const passed = cells.filter((cell) => cell.passed).length;
    const total = cells.length;
    return {
      title: module.title,
      status: module.status,
      lessonIds: module.lessonIds || [],
      counts,
      cells,
      coverage: total ? Math.round((passed / total) * 1000) / 10 : 0,
      gaps: cells.filter((cell) => !cell.passed).map((cell) => cell.id),
    };
  });

  const supportTabs = buildSupportTabs(source);
  const cellsTotal = modules.reduce((sum, module) => sum + module.cells.length, 0);
  const cellsPassed = modules.reduce((sum, module) => sum + module.cells.filter((cell) => cell.passed).length, 0);
  const supportPassed = supportTabs.filter((tab) => tab.passed).length;
  const strictGaps = modules.flatMap((module) =>
    module.cells
      .filter((cell) => !cell.passed)
      .map((cell) => `${module.title}::${cell.id}`)
  );
  const supportGaps = supportTabs.filter((tab) => !tab.passed).map((tab) => tab.id);

  return {
    reportVersion: "svcollege-tab-matrix-v1",
    date: REPORT_DATE,
    target: "SVCollege AI & Full Stack only",
    strictTabs: STRICT_TABS.map(({ id, label }) => ({ id, label })),
    summary: {
      modules: modules.length,
      strictTabs: STRICT_TABS.length,
      strictCells: cellsTotal,
      passedCells: cellsPassed,
      strictCoverage: cellsTotal ? Math.round((cellsPassed / cellsTotal) * 1000) / 10 : 0,
      strictGaps: strictGaps.length,
      supportTabs: supportTabs.length,
      supportPassed,
      supportGaps: supportGaps.length,
      ready: strictGaps.length === 0 && supportGaps.length === 0,
    },
    strictGaps,
    supportGaps,
    supportTabs,
    modules,
  };
}

function cellIcon(cell) {
  return cell.passed ? "V" : "!";
}

function toMarkdown(report) {
  const lines = [
    "# SVCollege Module × Tab Matrix",
    "",
    `> Generated: ${report.date}`,
    `> Target: ${report.target}`,
    "",
    "## Summary",
    "",
    `- Modules: ${report.summary.modules}`,
    `- Strict tabs per module: ${report.summary.strictTabs}`,
    `- Strict cells: ${report.summary.passedCells}/${report.summary.strictCells} (${report.summary.strictCoverage}%)`,
    `- Strict gaps: ${report.summary.strictGaps}`,
    `- Support tabs: ${report.summary.supportPassed}/${report.summary.supportTabs}`,
    `- Ready: ${report.summary.ready ? "yes" : "no"}`,
    "",
    "## Matrix",
    "",
    `| Module | ${report.strictTabs.map((tab) => tab.label).join(" | ")} | Coverage |`,
    `|---|${report.strictTabs.map(() => "---:").join("|")}|---:|`,
    ...report.modules.map((module) => {
      return `| ${module.title} | ${module.cells.map((cell) => cellIcon(cell)).join(" | ")} | ${module.coverage}% |`;
    }),
    "",
    "## Counts",
    "",
    "| Module | Lessons | Concepts | MC | Fill | Trace | Bug | Build | Code Blocks | Capstones | Prereq |",
    "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|",
    ...report.modules.map((module) => {
      const c = module.counts;
      return `| ${module.title} | ${c.lessons} | ${c.concepts} | ${c.mc} | ${c.fill} | ${c.trace} | ${c.bug} | ${c.build} | ${c.codeBlock} | ${c.capstone} | ${c.prereq} |`;
    }),
    "",
    "## Support Tabs",
    "",
    "| Tab | Status | Marker |",
    "|---|---:|---|",
    ...report.supportTabs.map((tab) => `| ${tab.label} | ${tab.passed ? "V" : "!"} | \`${tab.marker}\` |`),
    "",
    "## Gaps",
    "",
    ...(report.strictGaps.length ? report.strictGaps.map((gap) => `- ${gap}`) : ["- None"]),
    "",
  ];
  return `${lines.join("\n").replace(/\n+$/, "")}\n`;
}

function printSummary(report) {
  console.log(
    `SVCollege tab matrix: ${report.summary.strictCoverage}% strict coverage, ${report.summary.strictGaps} strict gaps, ${report.summary.supportGaps} support gaps.`,
  );
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--write")) {
    fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(MD_PATH, toMarkdown(report));
  }
  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (argv.includes("--summary")) {
    printSummary(report);
  } else {
    process.stdout.write(toMarkdown(report));
  }
  if (argv.includes("--strict") && !report.summary.ready) {
    if (report.strictGaps.length) console.error(`Strict tab gaps: ${report.strictGaps.join("; ")}`);
    if (report.supportGaps.length) console.error(`Support tab gaps: ${report.supportGaps.join("; ")}`);
    process.exit(1);
  }
  return report;
}

if (require.main === module) {
  run();
}

module.exports = {
  buildReport,
  toMarkdown,
  run,
};
