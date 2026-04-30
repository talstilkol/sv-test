#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const REPORT_DATE = "2026-04-29";
const REPORT_VERSION = "question-reuse-audit-v1";
const JSON_PATH = path.join(ROOT, "QUESTION_REUSE_AUDIT_REPORT.json");
const MD_PATH = path.join(ROOT, "QUESTION_REUSE_AUDIT_REPORT.md");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function normalizeAssetPath(src) {
  return String(src || "").split("?")[0].replace(/^\//, "");
}

function indexBrowserScripts() {
  const html = read("index.html");
  const scripts = [];
  const re = /<script\s+[^>]*src="([^"]+)"/g;
  let match = re.exec(html);
  while (match) {
    const asset = normalizeAssetPath(match[1]);
    if ((asset.startsWith("data/") || asset === "content-loader.js") && !scripts.includes(asset)) {
      scripts.push(asset);
    }
    match = re.exec(html);
  }
  return scripts;
}

function makeSandbox() {
  const sandbox = {
    window: {},
    console: { log() {}, warn() {}, error() {} },
    module: { exports: {} },
    exports: {},
    document: {
      createElement() {
        return {};
      },
      head: {
        appendChild() {},
      },
    },
  };
  sandbox.globalThis = sandbox;
  return sandbox;
}

function runDataScript(file, sandbox) {
  sandbox.module = { exports: {} };
  sandbox.exports = sandbox.module.exports;
  vm.runInNewContext(read(file), sandbox, { filename: file });
}

function isLowSignalGeneratedQuestion(question) {
  const lowSignalExplanationRe =
    /רעיון שמופיע הרבה בפועל|מייצג קונספט שמופיע בסטנדרט|משמש בתוך מבני קוד אמיתיים|תאר\/תארי|חלק מהפרוטוקול|חוסכת הרבה זמן דיבוג|ניתוח המושג/;
  const text = [
    question && question.question,
    question && question.prompt,
    question && question.explanation,
    question && question.code,
    ...((question && question.options) || []),
  ].filter(Boolean).join(" ");
  return lowSignalExplanationRe.test(text);
}

function loadPortalQuestionData() {
  const sandbox = makeSandbox();
  indexBrowserScripts().forEach((file) => {
    if (file === "data/questions_bank_seeded.js") return;
    runDataScript(file, sandbox);
  });

  const bank = sandbox.window.QUESTIONS_BANK || { mc: [], fill: [], trace: [], bug: [], build: [] };

  return {
    bank: {
      mc: bank.mc || [],
      fill: bank.fill || [],
      trace: bank.trace || [],
      bug: bank.bug || [],
      build: bank.build || [],
    },
    legacyGeneratedFiltered: {
      mc: 0,
      fill: 0,
    },
  };
}

function stableHash(input) {
  let hash = 2166136261;
  String(input || "").split("").forEach((char) => {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  });
  return (hash >>> 0).toString(36);
}

function questionIdentity(question = {}, kind = "mc") {
  const explicit = String(question.id || question.questionId || "").trim();
  if (explicit) return explicit;
  return `q-${stableHash([
    kind,
    question.conceptKey || "",
    question.question || question.prompt || question.title || "",
    question.codeBlock || question.code || question.brokenCode || question.starter || "",
    Array.isArray(question.options) ? question.options.join("|") : "",
    question.answer || question.reference || "",
  ].join("||"))}`;
}

function questionSource(question = {}) {
  if (question._seeded) return "legacy-generated";
  const id = String(question.id || "");
  if (id.startsWith("sv") || id.includes("_sv") || id.includes("bridge_")) return "svcollege-curated";
  return "curated";
}

function collectQuestionRows(bank) {
  const rows = [];
  const add = (kind, questions = []) => {
    questions.forEach((question, index) => {
      rows.push({
        kind,
        source: questionSource(question),
        index,
        id: questionIdentity(question, kind),
        conceptKey: String(question.conceptKey || "").trim(),
        level: Number(question.challengeLevel ?? question.level ?? question.difficulty ?? 1) || 1,
      });
    });
  };
  add("mc", bank.mc);
  add("fill", bank.fill);
  add("trace", bank.trace);
  add("bug", bank.bug);
  add("build", bank.build);
  return rows;
}

function auditConceptReuse(rows) {
  const missingConceptKey = rows.filter((row) => !row.conceptKey);
  const byIdentity = new Map();
  const byConcept = new Map();

  rows.forEach((row) => {
    const identityKey = `${row.conceptKey}::${row.kind}::${row.id}`;
    const matches = byIdentity.get(identityKey) || [];
    matches.push(row);
    byIdentity.set(identityKey, matches);

    if (!row.conceptKey) return;
    const concept = byConcept.get(row.conceptKey) || {
      conceptKey: row.conceptKey,
      total: 0,
      kinds: {},
      sources: {},
      maxLevel: 0,
    };
    concept.total += 1;
    concept.kinds[row.kind] = (concept.kinds[row.kind] || 0) + 1;
    concept.sources[row.source] = (concept.sources[row.source] || 0) + 1;
    concept.maxLevel = Math.max(concept.maxLevel, row.level);
    byConcept.set(row.conceptKey, concept);
  });

  const duplicateIdentityIssues = [...byIdentity.entries()]
    .filter(([, matches]) => matches.length > 1)
    .map(([identityKey, matches]) => ({
      identityKey,
      count: matches.length,
      sources: [...new Set(matches.map((row) => row.source))],
    }));

  const conceptBuckets = [...byConcept.values()].sort((a, b) => a.conceptKey.localeCompare(b.conceptKey));
  return {
    missingConceptKey,
    duplicateIdentityIssues,
    conceptBuckets,
  };
}

function auditProfileContract() {
  const app = read("app.js");
  const html = read("index.html");
  const checks = [
    ["local profile selector", html.includes('id="local-profile-select"') && html.includes('id="local-profile-create"')],
    ["profile scope prefix", app.includes('const PROFILE_PREFIX = "lumenportal:profile:"')],
    ["answered questions key", app.includes('const ANSWERED_QUESTIONS_KEY = "lumenportal:answeredQuestions:v1"')],
    ["answered state by concept", app.includes("state.byConcept[key]") && app.includes("record.answered[id]")],
    ["profile-scoped localStorage", app.includes("function shouldScopeKey(key)") && app.includes("return !globalKeys.has(value)")],
    ["unanswered selector", app.includes("function pickUnansweredBankQuestion") && app.includes("!questionWasAnswered(question, lessonId, conceptName, kind)")],
    ["exhaustion fallback explicit", app.includes("allowExhaustedFallback") && app.includes("pickReusableQuestionFallback(sorted)")],
    ["progress export carries answered IDs", app.includes("data.answeredQuestions = collectProfileScopedEntries([ANSWERED_QUESTIONS_KEY])")],
    ["progress import restores answered IDs", app.includes("Object.entries(data.answeredQuestions || {}).forEach(([k, v]) => localStorage.setItem(k, v))")],
  ].map(([id, passed]) => ({
    id,
    passed: Boolean(passed),
    failures: passed ? [] : [`failed profile reuse contract: ${id}`],
  }));

  return checks;
}

function progressExportPaths(argv) {
  const paths = [];
  argv.forEach((arg, index) => {
    if (arg === "--progress-export" && argv[index + 1]) paths.push(argv[index + 1]);
    if (arg.startsWith("--progress-export=")) paths.push(arg.slice("--progress-export=".length));
  });
  return paths;
}

function auditProgressExport(file, conceptBuckets) {
  const absolute = path.resolve(ROOT, file);
  const raw = fs.readFileSync(absolute, "utf8");
  const data = JSON.parse(raw);
  const answeredEntries = data.answeredQuestions || {};
  const staticByConcept = new Map(conceptBuckets.map((bucket) => [bucket.conceptKey, bucket.total]));
  let answeredConcepts = 0;
  let answeredQuestions = 0;
  const conceptsBeyondStaticBank = [];

  Object.values(answeredEntries).forEach((value) => {
    let parsed = null;
    try {
      parsed = typeof value === "string" ? JSON.parse(value) : value;
    } catch (_) {
      parsed = null;
    }
    const byConcept = parsed && parsed.byConcept && typeof parsed.byConcept === "object" ? parsed.byConcept : {};
    Object.entries(byConcept).forEach(([conceptKey, record]) => {
      const ids = Object.keys((record && record.answered) || {});
      if (!ids.length) return;
      answeredConcepts += 1;
      answeredQuestions += ids.length;
      const staticAvailable = staticByConcept.get(conceptKey) || 0;
      if (staticAvailable && ids.length > staticAvailable) {
        conceptsBeyondStaticBank.push({ conceptKey, answered: ids.length, staticAvailable });
      }
    });
  });

  return {
    file: path.relative(ROOT, absolute),
    profileId: data.profile && data.profile.id ? data.profile.id : "unknown/unavailable",
    profileName: data.profile && data.profile.name ? data.profile.name : "unknown/unavailable",
    answeredConcepts,
    answeredQuestions,
    conceptsBeyondStaticBank,
    passed: conceptsBeyondStaticBank.length === 0,
  };
}

function buildReport(argv = []) {
  const { bank, legacyGeneratedFiltered } = loadPortalQuestionData();
  const rows = collectQuestionRows(bank);
  const conceptAudit = auditConceptReuse(rows);
  const profileContractChecks = auditProfileContract();
  const failedProfileContractChecks = profileContractChecks.filter((check) => !check.passed);
  const profileExports = progressExportPaths(argv).map((file) =>
    auditProgressExport(file, conceptAudit.conceptBuckets),
  );
  const failedProfileExports = profileExports.filter((item) => !item.passed);

  const summary = {
    questions: rows.length,
    conceptTags: conceptAudit.conceptBuckets.length,
    missingConceptKey: conceptAudit.missingConceptKey.length,
    duplicateIdentityIssues: conceptAudit.duplicateIdentityIssues.length,
    profileContractChecks: profileContractChecks.length,
    failedProfileContractChecks: failedProfileContractChecks.length,
    profileExports: profileExports.length,
    failedProfileExports: failedProfileExports.length,
    legacyGeneratedFiltered: legacyGeneratedFiltered.mc + legacyGeneratedFiltered.fill,
  };
  summary.ready =
    summary.questions > 0 &&
    summary.conceptTags > 0 &&
    summary.missingConceptKey === 0 &&
    summary.duplicateIdentityIssues === 0 &&
    summary.failedProfileContractChecks === 0 &&
    summary.failedProfileExports === 0;

  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "SVCollege question reuse by learner profile contract and concept tag",
    summary,
    profileContractChecks,
    profileExports,
    conceptBuckets: conceptAudit.conceptBuckets,
    duplicateIdentityIssues: conceptAudit.duplicateIdentityIssues,
    missingConceptKey: conceptAudit.missingConceptKey,
  };
}

function toMarkdown(report) {
  const topConcepts = report.conceptBuckets
    .slice()
    .sort((a, b) => b.total - a.total || a.conceptKey.localeCompare(b.conceptKey))
    .slice(0, 20);
  return [
    "# Question Reuse Audit",
    "",
    `- Date: ${report.date}`,
    `- Target: ${report.target}`,
    `- Questions audited: ${report.summary.questions}`,
    `- Concept tags: ${report.summary.conceptTags}`,
    `- Duplicate concept/kind/question identities: ${report.summary.duplicateIdentityIssues}`,
    `- Missing conceptKey: ${report.summary.missingConceptKey}`,
    `- Profile contract checks: ${report.summary.profileContractChecks - report.summary.failedProfileContractChecks}/${report.summary.profileContractChecks}`,
    `- Real profile exports checked: ${report.summary.profileExports}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    "",
    "## Profile Contract Checks",
    "",
    "| Check | Status |",
    "|---|---|",
    ...report.profileContractChecks.map((check) => `| ${check.id} | ${check.passed ? "pass" : "fail"} |`),
    "",
    "## Top Concept Buckets",
    "",
    "| Concept | Questions | Kinds | Sources | Max level |",
    "|---|---:|---|---|---:|",
    ...topConcepts.map((bucket) =>
      `| \`${bucket.conceptKey}\` | ${bucket.total} | ${Object.entries(bucket.kinds).map(([k, v]) => `${k}:${v}`).join(", ")} | ${Object.entries(bucket.sources).map(([k, v]) => `${k}:${v}`).join(", ")} | ${bucket.maxLevel} |`,
    ),
    "",
  ].join("\n");
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport(argv);
  if (argv.includes("--write")) {
    fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(MD_PATH, `${toMarkdown(report)}\n`);
  }
  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (argv.includes("--summary")) {
    process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  } else {
    process.stdout.write(`${toMarkdown(report)}\n`);
  }
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = {
  buildReport,
  collectQuestionRows,
  indexBrowserScripts,
  questionIdentity,
  run,
  toMarkdown,
};
