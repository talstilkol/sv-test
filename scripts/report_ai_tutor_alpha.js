#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "ai-tutor-alpha-gate-v1";
const REPORT_DATE = "2026-04-29";
const JSON_PATH = path.join(ROOT, "AI_TUTOR_ALPHA_REPORT.json");
const MD_PATH = path.join(ROOT, "AI_TUTOR_ALPHA_REPORT.md");

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function check(id, label, passed, detail) {
  return { id, label, passed: Boolean(passed), status: passed ? "pass" : "fail", detail };
}

function buildReport() {
  const edge = read("supabase/functions/ai-tutor/index.ts");
  const app = read("app.js");
  const html = read("index.html");
  const policy = read("AI_TUTOR_ALPHA_POLICY.md");
  const checks = [
    check(
      "backend-proxy",
      "Backend proxy exists without frontend AI key",
      edge.includes("Deno.env.get(\"ANTHROPIC_API_KEY\")") &&
        !app.includes("ANTHROPIC_API_KEY") &&
        app.includes("/functions/v1/ai-tutor"),
      "AI provider key must stay in Supabase Edge Function env only.",
    ),
    check(
      "guardrails",
      "Socratic guardrails block answer leakage",
      edge.includes("looksLikeBypassRequest") &&
        edge.includes("answer-leak-prevention") &&
        edge.includes("unknown/unavailable"),
      "Tutor must block copy-paste / answer-only bypass prompts.",
    ),
    check(
      "server-rate-limit",
      "Server-side rate limit exists",
      edge.includes("AI_TUTOR_RATE_LIMIT") &&
        edge.includes("rateLimitStatus") &&
        edge.includes("rate limit exceeded"),
      "Edge Function must rate-limit requests before model calls.",
    ),
    check(
      "structured-logs",
      "Structured tutor logs exist",
      edge.includes("ai_tutor_response") &&
        edge.includes("ai_tutor_guardrail_blocked") &&
        edge.includes("ai_tutor_rate_limited") &&
        !/console\.(?:info|warn|error)\([^)]*message/i.test(edge),
      "Logs must cover response, guardrail and rate-limit events without raw message logging.",
    ),
    check(
      "credential-gated-ui",
      "UI calls production only with real sync credentials",
      app.includes("callProductionAITutor") &&
        app.includes("core?.normalizeSupabaseSyncConfig(readSupabaseSyncConfig())") &&
        app.includes("if (!config?.ready) return null") &&
        app.includes("getAIDemoResponse"),
      "Frontend must fall back locally when credentials are unavailable.",
    ),
    check(
      "visible-alpha-note",
      "Production Alpha note is visible",
      html.includes("ai-production-note") &&
        html.includes("אין מפתחות AI בדפדפן"),
      "Learner-facing UI must explain backend-backed alpha and fallback.",
    ),
    check(
      "policy-doc",
      "AI Tutor Alpha policy exists",
      policy.includes("No AI provider key is stored in frontend code") &&
        policy.includes("Logs never include the full user message"),
      "AI_TUTOR_ALPHA_POLICY.md must document backend, guardrails, rate limits and logs.",
    ),
  ];
  const blockers = checks.filter((item) => !item.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "AI Tutor Production Alpha",
    policy: "AI Tutor Alpha requires backend proxy, guardrails, server-side rate limits, structured logs, and credential-gated frontend calls.",
    summary: {
      checks: checks.length,
      passed: checks.length - blockers.length,
      failed: blockers.length,
      ready: blockers.length === 0,
    },
    checks,
    blockers: blockers.map((item) => ({ id: item.id, label: item.label, detail: item.detail })),
  };
}

function toMarkdown(report) {
  return [
    `# AI Tutor Alpha Report — ${report.date}`,
    "",
    `- Target: ${report.target}`,
    `- Policy: ${report.policy}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    `- Checks: ${report.summary.passed}/${report.summary.checks}`,
    "",
    "| Check | Status | Detail |",
    "|---|---|---|",
    ...report.checks.map((item) =>
      `| ${item.label} | ${item.status} | ${String(item.detail || "").replace(/\|/g, "\\|")} |`,
    ),
    "",
  ].join("\n");
}

function writeReport(report) {
  fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(MD_PATH, `${toMarkdown(report)}\n`);
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--write")) writeReport(report);
  if (argv.includes("--summary")) process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  else if (argv.includes("--json")) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  else process.stdout.write(`${toMarkdown(report)}\n`);
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = { buildReport, run, toMarkdown };
