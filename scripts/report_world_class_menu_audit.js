#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "world-class-menu-audit-v1";
const REPORT_DATE = new Date().toISOString().slice(0, 10);
const JSON_PATH = path.join(ROOT, "WORLD_CLASS_MENU_AUDIT_REPORT.json");
const MD_PATH = path.join(ROOT, "WORLD_CLASS_MENU_AUDIT_REPORT.md");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function addCheck(checks, id, label, weight, passed, detail, severity = "P2") {
  checks.push({
    id,
    label,
    weight,
    passed: Boolean(passed),
    status: passed ? "pass" : "fail",
    severity,
    detail,
  });
}

function normalizeCssText(value) {
  return String(value || "")
    .replace(/\s*([{}:;,>!])\s*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function cssIncludes(source, snippet) {
  return normalizeCssText(source).includes(normalizeCssText(snippet));
}

function cssHasMaxWidthMedia(source, px) {
  const normalized = normalizeCssText(source);
  return normalized.includes(normalizeCssText(`@media (max-width: ${px}px)`)) ||
    normalized.includes(`@media (width<=${px}px)`);
}

function weightedScore(checks) {
  const total = checks.reduce((sum, check) => sum + Number(check.weight || 0), 0);
  const passed = checks.reduce((sum, check) => sum + (check.passed ? Number(check.weight || 0) : 0), 0);
  return total ? Math.round((passed / total) * 1000) / 10 : 0;
}

function buildReport() {
  const html = read("index.html");
  const app = read("app.js");
  const view = read("src/views/homework-exam-mode-view.js");
  const css = read("style.css");
  const checks = [];

  addCheck(
    checks,
    "default-exam-focus-mode",
    "Exam100 is the first default surface",
    10,
    html.includes('<body class="exam-focus-mode">') && app.includes('initialTabFromUrl === "mock-exam"') && app.includes("openMockExam();"),
    "A new student should land in the closed exam flow without choosing from the legacy portal.",
    "P0",
  );
  addCheck(
    checks,
    "closed-mode-only-exam100",
    "Closed mode renders only Exam100 rows",
    12,
    /container\.innerHTML\s*=\s*sanitizeHtml\(\s*exam100Rows\s*\)/.test(view),
    "The primary path must not render the advanced library when exam focus is active.",
    "P0",
  );
  addCheck(
    checks,
    "two-arrow-navigation",
    "Closed route exposes only previous and next arrows",
    10,
    view.includes("data-exam100-path-prev") &&
      view.includes("data-exam100-path-next") &&
      view.includes("hxm-exam100-arrow-controls") &&
      view.includes("אין תפריט בחירה בתוך המסלול"),
    "The route should move through backward/forward only, not a menu of choices.",
    "P0",
  );
  addCheck(
    checks,
    "progress-map-visible",
    "Progress percent and graphical step map are visible",
    10,
    view.includes("data-exam100-closed-percent") &&
      view.includes("data-exam100-bar") &&
      view.includes("data-exam100-progress-label") &&
      view.includes("מפת מסלול עם פרסים") &&
      view.includes("step.reward"),
    "The student sees percent complete, a linear map and rewards.",
    "P0",
  );
  addCheck(
    checks,
    "primary-task-board-progress",
    "Primary task board, progress and next task are present",
    10,
    view.includes("data-hxm-primary-task-board") &&
      view.includes("data-hxm-time-required-percent") &&
      view.includes("data-hxm-time-summary-left") &&
      view.includes("data-hxm-time-next-card") &&
      !view.includes("data-exam100-day-board"),
    "The student sees one official task board with percent, remaining time and a next-task card.",
    "P0",
  );
  addCheck(
    checks,
    "local-storage-not-authoritative",
    "Local progress is clearly marked as recovery only",
    8,
    view.includes("שמירה מקומית בלבד") &&
      view.includes("לא ציון רשמי") &&
      view.includes("exam100RuntimeSaveMode"),
    "The UI must not present localStorage as an official score proof.",
    "P1",
  );
  addCheck(
    checks,
    "advanced-library-hidden",
    "Legacy and advanced surfaces are hidden by default",
    10,
    cssIncludes(css, "body.exam-focus-mode:not(.show-advanced-tabs)") &&
      cssIncludes(css, ".hxm-advanced-library") &&
      cssIncludes(css, ".top-tabs-bar") &&
      view.includes("ספרייה מתקדמת - לא חלק מהמסלול הסגור"),
    "Legacy remains available but not as the primary decision surface.",
    "P0",
  );
  addCheck(
    checks,
    "solution-guide-reference-only",
    "Solution guide is available only as extracted reference",
    6,
    view.includes("hxm-solution-guide-drills") &&
      view.includes("לא תפריט בתוך Exam100") &&
      view.includes("כל נתון כאן חולץ מה-HTML המקורי"),
    "The solution guide should support practice without becoming a shortcut menu.",
    "P1",
  );
  addCheck(
    checks,
    "start-here-single-command",
    "Start-here area keeps next action prominent",
    8,
    view.includes("מה עושים עכשיו") &&
      view.includes("כרטיס אחד בלבד") &&
      view.includes("renderTodayCommandPanel") &&
      view.includes("התחל כאן - גרסה פשוטה"),
    "The beginner surface should tell the student what to do now.",
    "P1",
  );
  addCheck(
    checks,
    "mobile-responsive-route",
    "Closed route adapts to mobile width",
    8,
    cssHasMaxWidthMedia(css, 780) &&
      cssIncludes(css, ".hxm-exam100-journey-track") &&
      cssIncludes(css, ".hxm-time-plan>summary") &&
      cssIncludes(css, ".hxm-time-task") &&
      cssIncludes(css, ".hxm-time-next-card"),
    "The map, primary task board and arrows must not overflow on mobile.",
    "P1",
  );
  addCheck(
    checks,
    "release-gated-menu",
    "Menu and route are protected by release gates",
    8,
    read("scripts/report_finish_line_prerelease.js").includes("exam-solution-guide-drills-strict") &&
      read("tests/homework-exam-mode.test.js").includes("data-exam100-path-next") &&
      read("tests/homework-exam-mode.test.js").includes("hxm-solution-guide-drills"),
    "Critical menu expectations must be in tests and pre-release checks.",
    "P1",
  );

  const score = weightedScore(checks);
  const blockers = checks.filter((check) => !check.passed && (check.severity === "P0" || check.severity === "P1"));
  const advisoryTasks = [
    {
      id: "ux-next-task-hero",
      priority: "P0",
      title: "להפוך את כרטיס המשימה הבאה לגדול יותר מכל שאר האלמנטים",
      minutes: 90,
      acceptance: "במסך ראשון יש CTA אחד בולט יותר מכל פעולה אחרת.",
    },
    {
      id: "ux-gate-proof-inline",
      priority: "P0",
      title: "להוסיף הוכחת Gate קצרה בתוך כרטיס השלב הנוכחי",
      minutes: 120,
      acceptance: "אי אפשר ללחוץ קדימה בלי ראיה/ציון עצמי כששלב מוגדר כחובה.",
    },
    {
      id: "ux-advanced-library-friction",
      priority: "P1",
      title: "להוסיף friction לפתיחת ספרייה מתקדמת",
      minutes: 60,
      acceptance: "פתיחה מציגה אזהרה: לא חלק מהמסלול הראשי למבחן.",
    },
    {
      id: "ux-route-reward-polish",
      priority: "P1",
      title: "לחדד את מפת הפרסים הגרפית",
      minutes: 120,
      acceptance: "כל שלב מראה פרס, סטטוס, ותוצר סיום בלי טקסט צפוף.",
    },
    {
      id: "ux-user-test-script",
      priority: "P1",
      title: "להוסיף smoke של משתמש חדש: פתיחה עד משימה ראשונה",
      minutes: 90,
      acceptance: "בדיקה מוכיחה שתוך 10 שניות נמצא CTA אחד ברור.",
    },
    {
      id: "ux-legacy-tab-failsafe",
      priority: "P2",
      title: "להוסיף failsafe אם תלמיד פותח legacy tab בזמן Exam100",
      minutes: 75,
      acceptance: "מופיע באנר חזרה למסלול, בלי למחוק את בחירת המשתמש.",
    },
  ];

  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    score,
    ready: blockers.length === 0,
    target: "World-class closed-route student menu for SVCollege exam preparation",
    summary: {
      checks: checks.length,
      passed: checks.filter((check) => check.passed).length,
      failed: checks.filter((check) => !check.passed).length,
      blockers: blockers.length,
      score,
      grade: score >= 97 ? "world-class-ready" : score >= 92 ? "excellent-with-polish-debt" : "needs-work",
    },
    checks,
    blockers,
    advisoryTasks,
    masterPlan: {
      waves: [
        { id: "wave-a", title: "אפס החלטות במסך ראשון", minutes: 210, tasks: ["CTA אחד", "Gate proof", "חצים בלבד"] },
        { id: "wave-b", title: "מפת מסלול מעוררת רצון לסיים", minutes: 180, tasks: ["פרסים", "סטטוס שלב", "אחוז יומי"] },
        { id: "wave-c", title: "Legacy בשליטה", minutes: 135, tasks: ["Advanced friction", "return banner", "no accidental tabs"] },
        { id: "wave-d", title: "בדיקות UX חוזרות", minutes: 90, tasks: ["new-user smoke", "mobile route smoke", "regression gate"] },
      ],
      totalMinutes: 615,
      totalTime: "10 שעות 15 דק׳",
    },
  };
}

function toMarkdown(report) {
  return [
    "# World-Class User Menu Audit",
    "",
    `Date: ${report.date}`,
    `Score: **${report.score}/100**`,
    `Ready: **${report.ready ? "yes" : "no"}**`,
    `Grade: ${report.summary.grade}`,
    "",
    "## Checks",
    "",
    "| Check | Status | Severity | Detail |",
    "|---|---:|---:|---|",
    ...report.checks.map((check) => `| ${check.label} | ${check.status} | ${check.severity} | ${check.detail} |`),
    "",
    "## Remaining Tasks",
    "",
    ...report.advisoryTasks.map((task) => `- **${task.priority} ${task.title}** — ${task.minutes} דק׳. ${task.acceptance}`),
    "",
    "## Master Plan",
    "",
    `Total: **${report.masterPlan.totalTime}**`,
    "",
    ...report.masterPlan.waves.map((wave) => `- ${wave.title}: ${wave.minutes} דק׳ — ${wave.tasks.join(", ")}`),
    "",
  ].join("\n");
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--write") || argv.includes("--strict")) {
    fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    fs.writeFileSync(MD_PATH, `${toMarkdown(report)}\n`, "utf8");
  }
  if (argv.includes("--summary")) {
    console.log(JSON.stringify(report.summary, null, 2));
  } else if (argv.includes("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(toMarkdown(report));
  }
  if (argv.includes("--strict") && !report.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = { buildReport, toMarkdown };
