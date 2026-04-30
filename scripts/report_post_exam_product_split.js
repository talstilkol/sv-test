#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const portalBoundary = require("./report_portal_boundary.js");
const contentSchema = require("./report_content_schema_contract.js");
const syncAlpha = require("./report_sync_alpha.js");
const aiTutorAlpha = require("./report_ai_tutor_alpha.js");
const metricsDashboard = require("./report_metrics_dashboard.js");
const roadmapWaves = require("./report_90_day_roadmap_waves.js");
const pricingPackaging = require("./report_pricing_packaging_plan.js");
const questionReuseAudit = require("./report_question_reuse_audit.js");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "post-exam-product-split-v1";
const REPORT_DATE = "2026-04-30";
const JSON_PATH = path.join(ROOT, "POST_EXAM_PRODUCT_SPLIT_REPORT.json");
const MD_PATH = path.join(ROOT, "POST_EXAM_PRODUCT_SPLIT_REPORT.md");

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

function packageScripts() {
  return JSON.parse(read("package.json")).scripts || {};
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

function buildTrack(id, closes, label, checks) {
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
  const scripts = packageScripts();
  const app = read("app.js");
  const index = read("index.html");
  const portalTemplate = exists("POST_EXAM_PORTAL_TEMPLATE.md") ? read("POST_EXAM_PORTAL_TEMPLATE.md") : "";
  const teacherKit = exists("TEACHER_ONBOARDING_KIT.md") ? read("TEACHER_ONBOARDING_KIT.md") : "";
  const syncPolicy = read("SYNC_ALPHA_POLICY.md");
  const aiPolicy = read("AI_TUTOR_ALPHA_POLICY.md");
  const pricingPlan = read("PRICING_PACKAGING_PLAN.md");
  const promotionPolicy = exists("SEEDED_QUESTION_PROMOTION_POLICY.md") ? read("SEEDED_QUESTION_PROMOTION_POLICY.md") : "";
  const roadmapDoc = read("ROADMAP_90_DAY_WAVES.md");

  const boundary = portalBoundary.buildReport();
  const schema = contentSchema.buildReport();
  const sync = syncAlpha.buildReport();
  const ai = aiTutorAlpha.buildReport();
  const metrics = metricsDashboard.buildReport();
  const roadmap = roadmapWaves.buildReport();
  const pricing = pricingPackaging.buildReport();
  const reuse = questionReuseAudit.buildReport();

  const tracks = [
    buildTrack("future-portal-specs", "P10.5.1", "Split non-SVCollege course mappings into future portal specs", [
      check(
        "portal-boundary-ready",
        "Portal boundary gate is ready",
        boundary.summary.ready,
        `${boundary.summary.passed}/${boundary.summary.checks} portal boundary checks passed.`,
        ["PORTAL_BOUNDARY_POLICY.md", "PORTAL_BOUNDARY_REPORT.json"],
      ),
      check(
        "future-spec-rule",
        "Future mappings are separate specs",
        boundary.policy.includes("separate portal specs") &&
          read("PORTAL_BOUNDARY_POLICY.md").includes("Future school mappings must be specified as separate portal specs"),
        "Non-SVCollege providers must not become active navigation inside Exam Edition.",
        ["PORTAL_BOUNDARY_POLICY.md"],
      ),
    ]),
    buildTrack("portal-template", "P10.5.2", "Create a reusable portal template contract", [
      check(
        "template-doc",
        "Template documents blueprint, tags, questions, proof gates, tabs and smoke tests",
        portalTemplate.includes("Curriculum blueprint") &&
          portalTemplate.includes("Concept tags") &&
          portalTemplate.includes("Question banks") &&
          portalTemplate.includes("Proof gates") &&
          portalTemplate.includes("Tabs") &&
          portalTemplate.includes("Smoke tests"),
        "POST_EXAM_PORTAL_TEMPLATE.md must describe every required portal surface.",
        ["POST_EXAM_PORTAL_TEMPLATE.md"],
      ),
      check(
        "schema-contract-ready",
        "Content schema contract is ready",
        schema.summary.ready,
        `${schema.summary.passed}/${schema.summary.checks} schema checks passed.`,
        ["CONTENT_SCHEMA_CONTRACT.md", "CONTENT_SCHEMA_CONTRACT_REPORT.json"],
      ),
    ]),
    buildTrack("teacher-lite-v2", "P10.5.3", "Define Teacher Lite v2 from actual exam data", [
      check(
        "teacher-export-and-heatmap",
        "Teacher Lite exposes progress table, heatmap and export",
        app.includes("function exportTeacherLiteClassReport") &&
          index.includes('id="teacher-student-table-body"') &&
          index.includes('id="teacher-heatmap-body"') &&
          exists("src/core/teacher-heatmap.js"),
        "Teacher Lite v2 must use real class/student/heatmap modules, not invented rosters.",
        ["app.js", "src/core/teacher-heatmap.js", "tests/teacher-lite-ui.test.js"],
      ),
      check(
        "exam-audit-export",
        "Teacher/mentor export uses exam evidence",
        app.includes("buildTeacherMentorAuditExport") &&
          app.includes("teacherMentorAuditExport.summary.examCriticalBlockers"),
        "Teacher Lite v2 must summarize proof blockers from exam evidence.",
        ["app.js", "tests/content-studio.test.js"],
      ),
      check(
        "teacher-kit-v2",
        "Teacher kit documents weak-topic and D1/D7 review",
        teacherKit.includes("D1/D7") &&
          teacherKit.includes("weak concepts") &&
          teacherKit.includes("unknown/unavailable"),
        "Teacher docs must keep missing student data explicit.",
        ["TEACHER_ONBOARDING_KIT.md"],
      ),
    ]),
    buildTrack("sync-v2-privacy", "P10.5.4", "Define Sync v2 privacy model", [
      check(
        "sync-alpha-ready",
        "Sync Alpha gate is ready",
        sync.summary.ready,
        `${sync.summary.passed}/${sync.summary.checks} Sync checks passed.`,
        ["SYNC_ALPHA_REPORT.json", "SYNC_ALPHA_POLICY.md", "src/core/progress-sync.js"],
      ),
      check(
        "sync-policy",
        "Sync policy is local-first, cloud optional and deterministic",
        syncPolicy.includes("local-first") &&
          syncPolicy.includes("optional") &&
          syncPolicy.includes("last-write-wins") &&
          syncPolicy.includes("sessionStorage"),
        "Sync v2 must stay opt-in and conflict-safe.",
        ["SYNC_ALPHA_POLICY.md"],
      ),
    ]),
    buildTrack("ai-tutor-v2-eval", "P10.5.5", "Define AI Tutor v2 eval set and guardrails", [
      check(
        "ai-alpha-ready",
        "AI Tutor Alpha gate is ready",
        ai.summary.ready,
        `${ai.summary.passed}/${ai.summary.checks} AI Tutor checks passed.`,
        ["AI_TUTOR_ALPHA_REPORT.json", "AI_TUTOR_ALPHA_POLICY.md", "supabase/functions/ai-tutor/index.ts"],
      ),
      check(
        "ai-eval-policy",
        "AI policy covers Socratic hints, answer leak prevention and misconception repair",
        aiPolicy.includes("Socratic-first") &&
          aiPolicy.includes("answer-only") &&
          aiPolicy.includes("misconception repair"),
        "AI Tutor v2 must be evaluated for hinting and repair, not answer leakage.",
        ["AI_TUTOR_ALPHA_POLICY.md"],
      ),
    ]),
    buildTrack("premium-boundary", "P10.5.6", "Define premium experience rules", [
      check(
        "pricing-ready",
        "Pricing packaging gate is ready",
        pricing.summary.ready,
        `${pricing.summary.passed}/${pricing.summary.checks} pricing checks passed.`,
        ["PRICING_PACKAGING_PLAN.md", "PRICING_PACKAGING_PLAN_REPORT.json"],
      ),
      check(
        "exam-content-not-locked",
        "Premium cannot lock exam-critical knowledge",
        pricingPlan.includes("All exam-critical learning content stays available") &&
          pricingPlan.includes("Premium cannot lock") &&
          pricingPlan.includes("A concept required by SVCollege AI & Full Stack"),
        "Premium can add service and enrichment only.",
        ["PRICING_PACKAGING_PLAN.md"],
      ),
    ]),
    buildTrack("business-kpis", "P10.5.7", "Add business KPIs", [
      check(
        "metrics-ready",
        "Metrics dashboard gate is ready",
        metrics.summary.ready,
        `${metrics.summary.passed}/${metrics.summary.checks} metrics checks passed.`,
        ["METRICS_DASHBOARD_REPORT.json", "src/core/outcome-loop.js"],
      ),
      check(
        "kpi-policy",
        "KPIs include D1/D7, mastery velocity, exam uplift and question quality index",
        metrics.policy.includes("D1/D7 retention") &&
          metrics.policy.includes("mastery velocity") &&
          metrics.policy.includes("exam uplift") &&
          metrics.policy.includes("question quality index"),
        "Business KPIs must come from local evidence and QA reports.",
        ["METRICS_DASHBOARD_REPORT.md"],
      ),
    ]),
    buildTrack("quarterly-roadmap-review", "P10.5.8", "Add quarterly roadmap review", [
      check(
        "roadmap-ready",
        "Roadmap waves gate is ready",
        roadmap.summary.ready,
        `${roadmap.summary.readyWaves}/${roadmap.summary.waves} roadmap waves ready.`,
        ["ROADMAP_90_DAY_WAVES.md", "ROADMAP_90_DAY_WAVES.json"],
      ),
      check(
        "quarterly-rule",
        "Roadmap review uses freeze, cut or promote decisions from evidence",
        roadmapDoc.includes("freeze") &&
          roadmapDoc.includes("cut") &&
          roadmapDoc.includes("promote") &&
          roadmapDoc.includes("real usage"),
        "Quarterly review must not promote features without usage evidence.",
        ["ROADMAP_90_DAY_WAVES.md"],
      ),
    ]),
    buildTrack("manual-promotion", "P10.5.9", "Promote legacy generated questions only after manual review", [
      check(
        "reuse-ready",
        "Question reuse audit is ready",
        reuse.summary.ready,
        `${reuse.summary.questions} questions audited; ${reuse.summary.duplicateIdentityIssues} duplicate identities.`,
        ["QUESTION_REUSE_AUDIT_REPORT.json"],
      ),
      check(
        "promotion-policy",
        "Legacy promotion requires explicit human review evidence",
        promotionPolicy.includes("Real learner outcome evidence may support") &&
          promotionPolicy.includes("explicit human review evidence") &&
          promotionPolicy.includes("unknown/unavailable") &&
          promotionPolicy.includes("cannot replace manual review"),
        "Legacy generated questions cannot become hand-curated by coverage pressure alone.",
        ["SEEDED_QUESTION_PROMOTION_POLICY.md"],
      ),
    ]),
  ];

  const blockers = tracks.flatMap((track) => track.blockers.map((blocker) => ({ track: track.id, ...blocker })));
  const packageScriptReady =
    scripts["post-exam:product-split"] === "node scripts/report_post_exam_product_split.js --summary" &&
    scripts["post-exam:product-split:write"] === "node scripts/report_post_exam_product_split.js --write --summary" &&
    scripts["post-exam:product-split:strict"] === "node scripts/report_post_exam_product_split.js --strict --summary";
  if (!packageScriptReady) {
    blockers.push({
      track: "package-scripts",
      id: "post-exam-product-split-scripts",
      label: "Post-exam product split scripts are wired",
      detail: "package.json must expose summary/write/strict scripts.",
    });
  }

  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "Phase 10 W49 Post-Exam Product Split",
    policy: "Post-exam expansion is gated by repository evidence. Missing pricing, usage, learner or review evidence remains unknown/unavailable.",
    summary: {
      tracks: tracks.length,
      readyTracks: tracks.filter((track) => track.ready).length,
      checks: tracks.reduce((sum, track) => sum + track.checks.length, 0) + 1,
      passed: tracks.reduce((sum, track) => sum + track.checks.filter((item) => item.passed).length, 0) + (packageScriptReady ? 1 : 0),
      failed: blockers.length,
      ready: blockers.length === 0,
    },
    packageScriptReady,
    tracks,
    blockers,
  };
}

function toMarkdown(report) {
  const lines = [
    `# Post-Exam Product Split Report — ${report.date}`,
    "",
    `- Target: ${report.target}`,
    `- Policy: ${report.policy}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    `- Tracks: ${report.summary.readyTracks}/${report.summary.tracks}`,
    `- Checks: ${report.summary.passed}/${report.summary.checks}`,
    "",
  ];

  report.tracks.forEach((track) => {
    lines.push(
      `## ${track.label}`,
      "",
      `- Closes: ${track.closes}`,
      `- Ready: ${track.ready ? "Yes" : "No"}`,
      "",
      "| Check | Status | Detail | Evidence |",
      "|---|---|---|---|",
      ...track.checks.map((item) =>
        `| ${item.label} | ${item.status} | ${String(item.detail || "").replace(/\|/g, "\\|")} | ${item.evidence.map((file) => `\`${file}\``).join("<br>")} |`,
      ),
      "",
    );
  });

  if (report.blockers.length) {
    lines.push("## Blockers", "", ...report.blockers.map((item) => `- ${item.track}/${item.id}: ${item.detail}`), "");
  }

  return `${lines.join("\n")}\n`;
}

function writeReport(report) {
  fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(MD_PATH, toMarkdown(report), "utf8");
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
