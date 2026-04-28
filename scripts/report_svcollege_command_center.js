#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const readiness = require("./report_svcollege_readiness.js");
const featureCoverage = require("./report_feature_coverage.js");

const ROOT = path.resolve(__dirname, "..");
const REPORT_DATE = "2026-04-28";
const JSON_PATH = path.join(ROOT, "SVCOLLEGE_COMMAND_CENTER.json");
const MD_PATH = path.join(ROOT, "SVCOLLEGE_COMMAND_CENTER.md");
const LESSONS_MANIFEST_PATH = path.join(ROOT, "lessons", "manifest.json");
const PARALLEL_PROMPTS_PATH = path.join(ROOT, "SVCOLLEGE_PARALLEL_SESSION_PROMPTS.md");
const ASSET_RE = /\.(pdf|mp4|docx|pptx)$/i;

const LESSON_FILE_BY_ID = Object.freeze({
  lesson_11: "data/lesson11.js",
  lesson_12: "data/lesson12.js",
  lesson_13: "data/lesson13.js",
  lesson_html_css_foundations: "data/lesson_html_css_foundations.js",
  lesson_tooling_git: "data/lesson_tooling_git.js",
  lesson_15: "data/lesson15.js",
  lesson_16: "data/lesson16.js",
  lesson_17: "data/lesson17.js",
  lesson_18: "data/lesson18.js",
  lesson_19: "data/lesson19.js",
  lesson_20: "data/lesson20.js",
  lesson_sql_orm: "data/lesson_sql_orm.js",
  lesson_auth_security: "data/lesson_auth_security.js",
  lesson_nextjs: "data/lesson_nextjs.js",
  lesson_nestjs: "data/lesson_nestjs.js",
  lesson_devops_deploy: "data/lesson_devops_deploy.js",
  lesson_21: "data/lesson21.js",
  lesson_22: "data/lesson22.js",
  lesson_23: "data/lesson23.js",
  lesson_24: "data/lesson24.js",
  lesson_25: "data/lesson25.js",
  lesson_26: "data/lesson26.js",
  lesson_27: "data/lesson27.js",
  ai_development: "data/ai_development.js",
  react_blueprint: "data/react_blueprint.js",
  workbook_taskmanager: "data/workbook_taskmanager.js",
  lesson_closures: "data/lesson_closures.js",
});

const QUESTION_EVIDENCE_FILES = Object.freeze([
  "data/questions_bank.js",
  "data/questions_bank_seeded.js",
  "data/svcollege_questions_sql_orm.js",
  "data/svcollege_questions_auth.js",
  "data/svcollege_questions_nextjs.js",
  "data/svcollege_questions_nestjs.js",
  "data/svcollege_questions_devops.js",
]);

const ACTIVITY_EVIDENCE_FILES = Object.freeze([
  "data/questions_trace.js",
  "data/svcollege_traces_sql_orm.js",
  "data/svcollege_traces_auth.js",
  "data/svcollege_traces_nextjs.js",
  "data/svcollege_traces_nestjs.js",
  "data/svcollege_traces_devops.js",
  "data/questions_build.js",
  "data/svcollege_builds_sql_orm.js",
  "data/svcollege_builds_auth.js",
  "data/svcollege_builds_nextjs.js",
  "data/svcollege_builds_nestjs.js",
  "data/svcollege_builds_devops.js",
  "data/questions_bug.js",
  "data/pair_match.js",
  "data/capstones.js",
]);

const TEST_EVIDENCE_FILES = Object.freeze([
  "tests/svcollege-readiness.test.js",
  "tests/svcollege-readiness-report.test.js",
  "tests/course-blueprints.test.js",
  "tests/mock-exam-svcollege.test.js",
  "tests/lesson-quiz-keys.test.js",
  "tests/svcollege-sql-orm-content.test.js",
  "tests/svcollege-auth-content.test.js",
  "tests/svcollege-nextjs-content.test.js",
  "tests/svcollege-nestjs-content.test.js",
  "tests/svcollege-devops-content.test.js",
]);

const TAB_EVIDENCE_FILES = Object.freeze([
  "data/course_blueprints.js",
  "data/lesson_quiz_keys.js",
  "index.html",
  "app.js",
  "tests/course-blueprints.test.js",
  "tests/lesson-quiz-keys.test.js",
]);

const ACTIVE_PARALLEL_MODE = Object.freeze({
  status: "single-session-finish-line-after-sql-auth-nextjs-museum-nestjs-devops",
  note: "Full merge train is paused. SQL/ORM, Auth/Security, Next.js, Museum, Nest.js and DevOps are integrated; current work continues one Finish Line 1 module at a time.",
  activeExternalSessions: Object.freeze([]),
  completedExternalSessions: Object.freeze([
    Object.freeze({
      id: "sql-orm",
      branch: "codex/svcollege-sql-orm",
      status: "integrated",
      result: "Database module covered: lesson_sql_orm + SQL/ORM practice + readiness evidence.",
    }),
    Object.freeze({
      id: "auth-security",
      branch: "current",
      status: "integrated",
      result: "Auth module covered: lesson_auth_security + Auth practice + readiness evidence.",
    }),
    Object.freeze({
      id: "nextjs",
      branch: "current",
      status: "integrated",
      result: "Next.js module covered: lesson_nextjs + Next.js practice + readiness evidence.",
    }),
    Object.freeze({
      id: "museum",
      branch: "codex/finish-line1-museum-integration-20260428",
      status: "integrated",
      result: "Museum plan and experience shell merged without tracking MP4 assets.",
    }),
    Object.freeze({
      id: "nestjs",
      branch: "codex/svcollege-backend-prod-coverage-20260428",
      status: "integrated",
      result: "Nest.js module covered: lesson_nestjs + Nest.js practice + readiness evidence.",
    }),
    Object.freeze({
      id: "devops",
      branch: "codex/svcollege-backend-prod-coverage-20260428",
      status: "integrated",
      result: "DevOps module covered: lesson_devops_deploy + deploy/Docker/CI practice + readiness evidence.",
    }),
  ]),
  pausedSessions: Object.freeze([
    "AI Engineering",
    "Question Quality",
    "All Tabs QA",
  ]),
  currentSessionAllowedScope: Object.freeze([
    "SVCollege governance docs",
    "Command Center reports",
    "readiness scripts",
    "post-SQL/Auth/Next.js/Museum integration quality gates",
    "non-museum planning documents",
  ]),
});

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function exists(file) {
  return fs.existsSync(path.join(ROOT, file));
}

function listRootAssets() {
  return fs.readdirSync(ROOT).filter((name) => ASSET_RE.test(name)).sort((a, b) => a.localeCompare(b, "he"));
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || "unknown";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function parseParallelSessions() {
  if (!fs.existsSync(PARALLEL_PROMPTS_PATH)) return [];
  const text = fs.readFileSync(PARALLEL_PROMPTS_PATH, "utf8");
  return text
    .split(/\r?\n/)
    .filter((line) => /^\| [0-8] /.test(line))
    .map((line) => {
      const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
      return {
        session: cells[0],
        branch: cells[1].replace(/`/g, ""),
        model: cells[2],
        intelligence: cells[3],
        openWhen: cells[4],
        ownership: cells[5],
      };
    });
}

function buildRedFirstQueue(readinessReport) {
  const priorityOrder = [
    "אימות ואבטחה",
    "בסיסי נתונים",
    "פיתוח Full-Stack עם Next.js",
    "תשתיות, DevOps",
    "Frameworks צד-שרת",
    "הנדסת AI מעשית",
    "מערכות עיצוב",
  ];

  const modules = readinessReport.modules
    .filter((module) => module.status !== "covered" || module.readiness < 100)
    .map((module) => {
      const priorityIndex = priorityOrder.findIndex((prefix) => module.title.includes(prefix));
      return {
        title: module.title,
        status: module.status,
        readiness: module.readiness,
        level: module.level,
        nextAction: module.nextAction,
        priority: priorityIndex === -1 ? 99 : priorityIndex + 1,
      };
    })
    .sort((a, b) => a.priority - b.priority || a.readiness - b.readiness || a.title.localeCompare(b.title, "he"));

  return modules;
}

function buildDocsStatus() {
  const docs = [
    "EXECUTION_TASKS.md",
    "SPEC_AND_MASTER_PLAN.md",
    "SVCOLLEGE_COVERAGE_REPORT.md",
    "SVCOLLEGE_READINESS_REPORT.md",
    "SVCOLLEGE_READINESS_REPORT.json",
    "SVCOLLEGE_LESSON_INVENTORY.md",
    "SVCOLLEGE_PARALLEL_SESSION_PROMPTS.md",
    "lessons/manifest.json",
  ];

  return docs.map((file) => ({ file, exists: exists(file) }));
}

function fileEvidence(file) {
  return {
    file,
    exists: exists(file),
  };
}

function buildModuleEvidence(readinessReport) {
  return readinessReport.modules.map((module) => {
    const lessonFiles = module.lessonIds.map((lessonId) => {
      const file = LESSON_FILE_BY_ID[lessonId] || null;
      return {
        lessonId,
        file,
        exists: file ? exists(file) : false,
      };
    });
    const questionCount = (module.counts?.mc || 0) + (module.counts?.fill || 0);
    const activityCount =
      (module.counts?.trace || 0) +
      (module.counts?.miniBuild || 0) +
      (module.counts?.bugHunt || 0) +
      (module.counts?.pairMatchPairs || 0) +
      (module.counts?.capstone || 0);

    return {
      title: module.title,
      status: module.status,
      readiness: module.readiness,
      lessonFiles,
      questions: {
        count: questionCount,
        files: QUESTION_EVIDENCE_FILES.map(fileEvidence),
      },
      activities: {
        count: activityCount,
        files: ACTIVITY_EVIDENCE_FILES.map(fileEvidence),
      },
      tests: TEST_EVIDENCE_FILES.map(fileEvidence),
      tabEvidence: {
        status: "mapped-through-course-blueprints",
        files: TAB_EVIDENCE_FILES.map(fileEvidence),
      },
      browserVerification: {
        status: "pending-session-7",
        owner: "codex/svcollege-tab-health",
        note: "Session 7 owns desktop/mobile smoke evidence after content integration.",
      },
    };
  });
}

function buildNoEvidenceGate(moduleEvidence) {
  const coveredModules = moduleEvidence.filter((module) => module.status === "covered");
  const failures = coveredModules
    .map((module) => {
      const hasLessonEvidence = module.lessonFiles.length > 0 && module.lessonFiles.every((lesson) => lesson.exists);
      const hasPracticeEvidence = module.questions.count > 0 && module.activities.count > 0;
      const hasTabEvidence =
        module.tabEvidence &&
        module.tabEvidence.status === "mapped-through-course-blueprints" &&
        module.tabEvidence.files.length > 0 &&
        module.tabEvidence.files.every((file) => file.exists);
      const hasTestEvidence = module.tests.length > 0 && module.tests.every((test) => test.exists);
      const missing = [];

      if (!hasLessonEvidence) missing.push("lesson");
      if (!hasPracticeEvidence) missing.push("practice");
      if (!hasTabEvidence) missing.push("tab");
      if (!hasTestEvidence) missing.push("test");

      return {
        title: module.title,
        missing,
      };
    })
    .filter((failure) => failure.missing.length > 0);

  return {
    status: failures.length ? "failed" : "passed",
    checkedCoveredModules: coveredModules.length,
    failures,
    rule: "`covered` is forbidden without lesson + practice + tab + test evidence.",
  };
}

function buildReport() {
  const readinessReport = readiness.buildReport();
  const coverageReport = featureCoverage.buildCoverage();
  const manifest = readJson(LESSONS_MANIFEST_PATH);
  const assets = Array.isArray(manifest.assets) ? manifest.assets : [];
  const sessions = parseParallelSessions();
  const rootAssets = listRootAssets();
  const optionFeedback = coverageReport.metrics.find((metric) => metric.id === "optionFeedback") || null;
  const courseBlueprints = coverageReport.metrics.find((metric) => metric.id === "courseBlueprints") || null;
  const moduleEvidence = buildModuleEvidence(readinessReport);

  return {
    reportVersion: "svcollege-command-center-v1",
    date: REPORT_DATE,
    finishLine: {
      target: "SVCollege AI & Full Stack only",
      ready: readinessReport.summary.finishLineReady,
      readiness: readinessReport.summary.averageReadiness,
      covered: readinessReport.summary.covered,
      partial: readinessReport.summary.partial,
      gap: readinessReport.summary.gap,
      modules: readinessReport.summary.modules,
      releaseBlockers: readinessReport.releaseBlockers.length,
    },
    redFirstQueue: buildRedFirstQueue(readinessReport),
    moduleEvidence,
    noEvidenceGate: buildNoEvidenceGate(moduleEvidence),
    sourceAssets: {
      total: assets.length,
      rootAssets: rootAssets.length,
      rootAssetNames: rootAssets,
      byType: countBy(assets, "type"),
      byImportStatus: countBy(assets, "importedStatus"),
    },
    featureCoverage: {
      modules: coverageReport.summary.modules,
      done: coverageReport.summary.done,
      partial: coverageReport.summary.partial,
      missing: coverageReport.summary.missing,
      strictFailures: coverageReport.summary.strictFailures,
      evidenceGateFailures: coverageReport.summary.evidenceGateFailures,
      optionFeedback,
      courseBlueprints,
    },
    activeParallelMode: ACTIVE_PARALLEL_MODE,
    parallelSessions: {
      total: sessions.length,
      sessions,
      nextOpenRule:
        "Limited mode active: do not open the full train. SQL/ORM, Auth/Security, Next.js, Museum, Nest.js and DevOps are integrated; open one Finish Line 1 module at a time unless the user re-enables wider merging.",
    },
    docs: buildDocsStatus(),
    commands: [
      "npm run svcollege:readiness:write",
      "npm run coverage:features:strict",
      "npm run lessons:assets",
      "npm test -- --run",
      "npm run build",
    ],
  };
}

function statusIcon(value) {
  return value ? "yes" : "no";
}

function mdQueue(queue) {
  if (!queue.length) return ["- None"];
  return queue.map((item, index) => {
    return `${index + 1}. **${item.title}** — ${item.status}, ${item.readiness}%, ${item.level}. Next: ${item.nextAction}`;
  });
}

function mdSessions(sessions) {
  if (!sessions.length) return ["- No session table found."];
  return [
    "| Session | Branch | Model | Intelligence | Open when | Ownership |",
    "|---|---|---:|---:|---|---|",
    ...sessions.map((session) =>
      `| ${session.session} | \`${session.branch}\` | ${session.model} | ${session.intelligence} | ${session.openWhen} | ${session.ownership} |`,
    ),
  ];
}

function mdModuleEvidence(items) {
  if (!items.length) return ["- No module evidence available."];
  return [
    "| Module | Lessons | Questions | Activities | Tab evidence | Tests | Browser smoke |",
    "|---|---:|---:|---:|---|---:|---|",
    ...items.map((item) => {
      const lessonCount = item.lessonFiles.filter((lesson) => lesson.exists).length;
      const testCount = item.tests.filter((test) => test.exists).length;
      const tabStatus = item.tabEvidence.files.every((file) => file.exists) ? item.tabEvidence.status : "missing";
      return `| ${item.title} | ${lessonCount}/${item.lessonFiles.length} | ${item.questions.count} | ${item.activities.count} | ${tabStatus} | ${testCount}/${item.tests.length} | ${item.browserVerification.status} |`;
    }),
  ];
}

function mdNoEvidenceGate(gate) {
  if (!gate.failures.length) {
    return [
      `- Status: ${gate.status}`,
      `- Checked covered modules: ${gate.checkedCoveredModules}`,
      `- Rule: ${gate.rule}`,
      "- Failures: none",
    ];
  }

  return [
    `- Status: ${gate.status}`,
    `- Checked covered modules: ${gate.checkedCoveredModules}`,
    `- Rule: ${gate.rule}`,
    "- Failures:",
    ...gate.failures.map((failure) => `  - ${failure.title}: missing ${failure.missing.join(", ")}`),
  ];
}

function mdActiveParallelMode(mode) {
  const activeRows = mode.activeExternalSessions.map((session) => {
    return `| ${session.id} | \`${session.branch}\` | ${session.owner} | ${session.scope.length} files/areas |`;
  });
  const completedRows = mode.completedExternalSessions.map((session) => {
    return `| ${session.id} | \`${session.branch}\` | ${session.status} | ${session.result} |`;
  });

  const rows = [
    `- Status: \`${mode.status}\``,
    `- Note: ${mode.note}`,
    `- Paused sessions: ${mode.pausedSessions.join(", ")}`,
    `- Current session allowed scope: ${mode.currentSessionAllowedScope.join(", ")}`,
    "",
    "| Active session | Branch | Owner | Scope size |",
    "|---|---|---|---:|",
    ...activeRows,
    "",
    "| Completed session | Branch | Status | Result |",
    "|---|---|---|---|",
    ...completedRows,
  ];

  return rows;
}

function toMarkdown(report) {
  const optionFeedback = report.featureCoverage.optionFeedback;
  const courseBlueprints = report.featureCoverage.courseBlueprints;
  const lines = [
    "# SVCollege Command Center",
    "",
    `> Generated: ${report.date}`,
    `> Target: ${report.finishLine.target}`,
    "",
    "## Finish Line",
    "",
    `- Ready: ${statusIcon(report.finishLine.ready)}`,
    `- Readiness: ${report.finishLine.readiness}%`,
    `- Covered / Partial / Gap: ${report.finishLine.covered}/${report.finishLine.partial}/${report.finishLine.gap}`,
    `- Release blockers: ${report.finishLine.releaseBlockers}`,
    "",
    "## Current Parallel Mode",
    "",
    ...mdActiveParallelMode(report.activeParallelMode),
    "",
    "## Red-First Queue",
    "",
    ...mdQueue(report.redFirstQueue),
    "",
    "## Source Assets",
    "",
    `- Assets in lessons/: ${report.sourceAssets.total}`,
    `- Raw assets in root: ${report.sourceAssets.rootAssets}`,
    `- By type: ${Object.entries(report.sourceAssets.byType).map(([key, value]) => `${key}=${value}`).join(", ")}`,
    `- By import status: ${Object.entries(report.sourceAssets.byImportStatus).map(([key, value]) => `${key}=${value}`).join(", ")}`,
    "",
    "## Feature Gates",
    "",
    `- Feature coverage modules: ${report.featureCoverage.done}/${report.featureCoverage.modules} done`,
    `- Strict failures: ${report.featureCoverage.strictFailures}`,
    `- Evidence gate failures: ${report.featureCoverage.evidenceGateFailures}`,
    `- Course blueprint: ${courseBlueprints ? `${courseBlueprints.implemented}/${courseBlueprints.target} ${courseBlueprints.unit}` : "missing"}`,
    `- Per-distractor feedback: ${optionFeedback ? `${optionFeedback.implemented}/${optionFeedback.target} ${optionFeedback.unit} (${optionFeedback.coverage}%)` : "missing"}`,
    `- No-evidence gate: ${report.noEvidenceGate.status} (${report.noEvidenceGate.failures.length} failures)`,
    "",
    "## No-Evidence Gate",
    "",
    ...mdNoEvidenceGate(report.noEvidenceGate),
    "",
    "## Module Evidence Matrix",
    "",
    ...mdModuleEvidence(report.moduleEvidence),
    "",
    "## Parallel Sessions",
    "",
    `- Total planned sessions: ${report.parallelSessions.total}`,
    `- Rule: ${report.parallelSessions.nextOpenRule}`,
    "",
    ...mdSessions(report.parallelSessions.sessions),
    "",
    "## Canonical Docs",
    "",
    "| File | Exists |",
    "|---|---:|",
    ...report.docs.map((doc) => `| \`${doc.file}\` | ${statusIcon(doc.exists)} |`),
    "",
    "## Commands",
    "",
    ...report.commands.map((command) => `- \`${command}\``),
    "",
  ];

  if (report.sourceAssets.rootAssetNames.length) {
    lines.push("## Root Asset Violations", "", ...report.sourceAssets.rootAssetNames.map((name) => `- ${name}`), "");
  }

  return `${lines.join("\n").replace(/\n+$/, "")}\n`;
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
    process.stdout.write(
      `SVCollege command center: ${report.finishLine.readiness}% readiness, ${report.finishLine.releaseBlockers} blockers, ${report.redFirstQueue.length} queued modules.\n`,
    );
  } else {
    process.stdout.write(toMarkdown(report));
  }

  if (argv.includes("--strict")) {
    const missingDocs = report.docs.filter((doc) => !doc.exists);
    if (missingDocs.length || report.sourceAssets.rootAssets > 0 || report.noEvidenceGate.failures.length) {
      if (missingDocs.length) {
        console.error(`Missing command-center docs: ${missingDocs.map((doc) => doc.file).join(", ")}`);
      }
      if (report.sourceAssets.rootAssets > 0) {
        console.error(`Raw lesson assets in root: ${report.sourceAssets.rootAssetNames.join(", ")}`);
      }
      if (report.noEvidenceGate.failures.length) {
        console.error(
          `Covered modules without evidence: ${report.noEvidenceGate.failures
            .map((failure) => `${failure.title} (${failure.missing.join(", ")})`)
            .join("; ")}`,
        );
      }
      process.exit(1);
    }
  }

  return report;
}

if (require.main === module) {
  run();
}

module.exports = {
  buildReport,
  toMarkdown,
  parseParallelSessions,
  buildRedFirstQueue,
  buildModuleEvidence,
  buildNoEvidenceGate,
  run,
};
