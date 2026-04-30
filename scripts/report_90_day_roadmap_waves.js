#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const featureCoverage = require("./report_feature_coverage.js");
const metricsDashboard = require("./report_metrics_dashboard.js");
const syncAlpha = require("./report_sync_alpha.js");
const aiTutorAlpha = require("./report_ai_tutor_alpha.js");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "roadmap-90-day-waves-v1";
const REPORT_DATE = "2026-04-29";
const JSON_PATH = path.join(ROOT, "ROADMAP_90_DAY_WAVES.json");
const MD_PATH = path.join(ROOT, "ROADMAP_90_DAY_WAVES.md");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(ROOT, file));
}

function check(id, label, passed, detail, evidence = []) {
  return {
    id,
    label,
    passed: Boolean(passed),
    status: passed ? "pass" : "fail",
    detail,
    evidence,
  };
}

function coverageMetric(report, id) {
  return (report.metrics || []).find((item) => item.id === id) || null;
}

function buildWave(id, closes, label, checks) {
  const blockers = checks.filter((item) => !item.passed);
  return {
    id,
    closes,
    label,
    ready: blockers.length === 0,
    checks,
    blockers: blockers.map((item) => ({ id: item.id, label: item.label, detail: item.detail })),
  };
}

function buildReport() {
  const app = read("app.js");
  const index = read("index.html");
  const outcomeLoop = read("src/core/outcome-loop.js");
  const coverage = featureCoverage.buildCoverage();
  const metrics = metricsDashboard.buildReport();
  const sync = syncAlpha.buildReport();
  const aiTutor = aiTutorAlpha.buildReport();
  const pairMatch = coverageMetric(coverage, "pairMatch");
  const bugQuests = coverageMetric(coverage, "bugQuests");
  const pathways = coverageMetric(coverage, "pathways");

  const waves = [
    buildWave(
      "wave-1-hardening",
      "P5.5.1",
      "Wave 1 hardening: FSRS/Gap/Pathways metrics + retention baseline",
      [
        check(
          "fsrs-core",
          "FSRS/SRS core exists",
          exists("lib/srs.js") && exists("tests/srs.test.js") && read("tests/srs.test.js").includes("FSRS-4"),
          "Spaced repetition must have deterministic core tests before roadmap scale.",
          ["lib/srs.js", "tests/srs.test.js"],
        ),
        check(
          "gap-matrix",
          "Gap Matrix is learner-facing",
          app.includes("function openGapMatrix()") && app.includes("function renderGapMatrix()"),
          "Gap dashboard must be reachable and computed from real learner scores.",
          ["app.js"],
        ),
        check(
          "pathways",
          "Pathways coverage is complete",
          pathways?.status === "Done" && pathways.implemented >= pathways.target && exists("data/pathways.js"),
          pathways ? `${pathways.implemented}/${pathways.target} ${pathways.unit}` : "Pathways metric missing.",
          ["data/pathways.js", "FEATURE_COVERAGE_REPORT.json"],
        ),
        check(
          "retention-baseline",
          "D1/D7 retention baseline exists without fabricated outcomes",
          outcomeLoop.includes("D1 retention") &&
            outcomeLoop.includes("D7 retention") &&
            outcomeLoop.includes("unknown/unavailable") &&
            metrics.summary.ready,
          "Retention and metrics dashboard use local learning evidence; missing pilot evidence stays unknown/unavailable.",
          ["src/core/outcome-loop.js", "METRICS_DASHBOARD_REPORT.json"],
        ),
      ],
    ),
    buildWave(
      "wave-2-alpha",
      "P5.5.2",
      "Wave 2 alpha: AI Tutor + Sync + Pair-Match hardening",
      [
        check(
          "ai-tutor-alpha",
          "AI Tutor Alpha gate is ready",
          aiTutor.summary.ready,
          `${aiTutor.summary.passed}/${aiTutor.summary.checks} AI Tutor Alpha checks passed.`,
          ["AI_TUTOR_ALPHA_REPORT.json", "AI_TUTOR_ALPHA_POLICY.md", "supabase/functions/ai-tutor/index.ts"],
        ),
        check(
          "sync-alpha",
          "Sync Alpha gate is ready",
          sync.summary.ready,
          `${sync.summary.passed}/${sync.summary.checks} Sync Alpha checks passed.`,
          ["SYNC_ALPHA_REPORT.json", "SYNC_ALPHA_POLICY.md", "src/core/progress-sync.js"],
        ),
        check(
          "pair-match",
          "Pair-Match feature coverage is done",
          pairMatch?.status === "Done" && pairMatch.implemented >= pairMatch.target && app.includes("function openPairMatch()"),
          pairMatch ? `${pairMatch.implemented}/${pairMatch.target} ${pairMatch.unit}; ${pairMatch.details?.pairs || 0} pairs.` : "Pair-Match metric missing.",
          ["data/pair_match.js", "app.js", "FEATURE_COVERAGE_REPORT.json"],
        ),
        check(
          "bug-quests",
          "Bug Quest hardening is tracked",
          bugQuests?.status === "Done" && bugQuests.implemented >= bugQuests.target,
          bugQuests ? `${bugQuests.implemented}/${bugQuests.target} ${bugQuests.unit}.` : "Bug Quest metric missing.",
          ["data/bug_quests.js", "FEATURE_COVERAGE_REPORT.json"],
        ),
      ],
    ),
    buildWave(
      "wave-3-lite",
      "P5.5.3",
      "Wave 3 lite: Teacher Dashboard Lite + class progress heatmap",
      [
        check(
          "teacher-lite-ui",
          "Teacher Lite UI exposes one-class controls",
          index.includes('id="teacher-class-id"') &&
            index.includes('id="teacher-student-table-body"') &&
            index.includes('id="teacher-heatmap-body"') &&
            app.includes("function exportTeacherLiteClassReport"),
          "Teacher Lite must expose class, student table, heatmap and export controls.",
          ["index.html", "app.js", "tests/teacher-lite-ui.test.js"],
        ),
        check(
          "teacher-core",
          "Teacher Lite core modules exist",
          [
            "src/core/teacher-classes.js",
            "src/core/teacher-students.js",
            "src/core/teacher-heatmap.js",
            "src/core/teacher-risk-alerts.js",
            "src/core/teacher-assignments.js",
          ].every(exists),
          "Teacher Lite needs real class/student/heatmap/risk modules, not local fake rosters.",
          [
            "src/core/teacher-classes.js",
            "src/core/teacher-students.js",
            "src/core/teacher-heatmap.js",
            "src/core/teacher-risk-alerts.js",
            "src/core/teacher-assignments.js",
          ],
        ),
        check(
          "teacher-schema",
          "Teacher Supabase schema is present",
          [
            "supabase/migrations/002_classes.sql",
            "supabase/migrations/003_class_students.sql",
            "supabase/migrations/004_class_concept_mastery.sql",
            "supabase/migrations/005_class_assignments.sql",
          ].every(exists),
          "Teacher Lite scale path requires real tables and RLS migrations.",
          [
            "supabase/migrations/002_classes.sql",
            "supabase/migrations/003_class_students.sql",
            "supabase/migrations/004_class_concept_mastery.sql",
            "supabase/migrations/005_class_assignments.sql",
          ],
        ),
        check(
          "teacher-tests",
          "Teacher Lite tests cover class progress and heatmap",
          [
            "tests/teacher-classes.test.js",
            "tests/teacher-students.test.js",
            "tests/teacher-heatmap.test.js",
            "tests/teacher-risk-alerts.test.js",
            "tests/teacher-lite-ui.test.js",
          ].every(exists),
          "Teacher Lite must be locked by module and UI tests.",
          [
            "tests/teacher-classes.test.js",
            "tests/teacher-students.test.js",
            "tests/teacher-heatmap.test.js",
            "tests/teacher-risk-alerts.test.js",
            "tests/teacher-lite-ui.test.js",
          ],
        ),
      ],
    ),
  ];

  const blockers = waves.flatMap((wave) => wave.blockers.map((blocker) => ({ wave: wave.id, ...blocker })));
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "Phase 5 90-day roadmap waves",
    policy: "A roadmap wave is closed only when repository evidence exists. Missing learner/pilot outcomes remain unknown/unavailable and are not backfilled.",
    summary: {
      waves: waves.length,
      readyWaves: waves.filter((wave) => wave.ready).length,
      checks: waves.reduce((sum, wave) => sum + wave.checks.length, 0),
      passed: waves.reduce((sum, wave) => sum + wave.checks.filter((item) => item.passed).length, 0),
      failed: blockers.length,
      ready: blockers.length === 0,
    },
    waves,
    blockers,
  };
}

function toMarkdown(report) {
  const lines = [
    `# 90-Day Roadmap Waves — ${report.date}`,
    "",
    `- Target: ${report.target}`,
    `- Policy: ${report.policy}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    `- Waves: ${report.summary.readyWaves}/${report.summary.waves}`,
    `- Checks: ${report.summary.passed}/${report.summary.checks}`,
    "",
  ];

  report.waves.forEach((wave) => {
    lines.push(
      `## ${wave.label}`,
      "",
      `- Closes: ${wave.closes}`,
      `- Ready: ${wave.ready ? "Yes" : "No"}`,
      "",
      "| Check | Status | Detail | Evidence |",
      "|---|---|---|---|",
      ...wave.checks.map((item) =>
        `| ${item.label} | ${item.status} | ${String(item.detail || "").replace(/\|/g, "\\|")} | ${item.evidence.map((file) => `\`${file}\``).join("<br>")} |`,
      ),
      "",
    );
  });

  if (report.blockers.length) {
    lines.push("## Blockers", "", ...report.blockers.map((item) => `- ${item.wave}/${item.id}: ${item.detail}`), "");
  }

  return `${lines.join("\n")}\n`;
}

function writeReport(report) {
  fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(MD_PATH, toMarkdown(report));
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--write")) writeReport(report);
  if (argv.includes("--summary")) process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  else if (argv.includes("--json")) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  else process.stdout.write(toMarkdown(report));
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = { buildReport, run, toMarkdown };
