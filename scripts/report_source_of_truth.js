#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "report-source-of-truth-v1";
const REPORT_DATE = new Date().toISOString().slice(0, 10);
const JSON_PATH = path.join(ROOT, "REPORT_SOURCE_OF_TRUTH.json");
const MD_PATH = path.join(ROOT, "REPORT_SOURCE_OF_TRUTH.md");
const HISTORICAL_LABEL = "Historical / Superseded";
const HISTORICAL_MARKER = new RegExp(`\\*\\*?${HISTORICAL_LABEL}\\*\\*?`, "i");

function toDateValue(value) {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return null;
  const date = new Date(`${trimmed}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeText(filePath, value) {
  fs.writeFileSync(filePath, value);
}

function isReportJsonFile(fileName, data) {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.reportVersion === "string" &&
    typeof data.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(data.date)
  );
}

function parseReportDateFromMarkdown(content) {
  const dateMatch = content.match(/^(?:>\s*)?Date:\s*(\d{4}-\d{2}-\d{2})/m) ||
    content.match(/^# .*?—\s*(\d{4}-\d{2}-\d{2})/m) ||
    content.match(/^# .*?\((\d{4}-\d{2}-\d{2})\)/m);
  return dateMatch ? dateMatch[1] : null;
}

function buildHistoricalBanner(entry) {
  const dateText = entry.date || "unknown";
  return [
    "",
    `> **${HISTORICAL_LABEL}**: this artifact is older than the current source-of-truth run.`,
    `> Captured on: ${dateText}`,
    `> Source-of-truth refresh date: ${REPORT_DATE}`,
    "> Use `npm run report:source-of-truth:write` to regenerate current artifacts before making live claims.",
    "",
  ];
}

function hasHistoricalBanner(lines) {
  return lines.some((line) => HISTORICAL_MARKER.test(line));
}

function isHistoricalDate(reportDate) {
  const parsedDate = toDateValue(reportDate);
  if (!parsedDate) return true;
  return parsedDate.getTime() < toDateValue(REPORT_DATE).getTime();
}

function collectTrackedJsonArtifacts() {
  const files = fs.readdirSync(ROOT).filter((file) => file.endsWith(".json")).sort();
  const out = [];
  for (const fileName of files) {
    const fullPath = path.join(ROOT, fileName);
    try {
      const parsed = readJson(fullPath);
      if (!isReportJsonFile(fileName, parsed)) continue;
      const mdName = `${path.basename(fileName, ".json")}.md`;
      const mdPath = path.join(ROOT, mdName);
      out.push({
        id: path.basename(fileName, ".json"),
        jsonPath: fullPath,
        mdPath: fs.existsSync(mdPath) ? mdPath : null,
        type: mdPath ? "markdown+json" : "json-only",
        reportVersion: parsed.reportVersion,
        date: parsed.date,
        summary: parsed.summary || parsed.checks,
        title: parsed.source || path.basename(fileName, ".json"),
      });
    } catch (error) {
      continue;
    }
  }
  return out;
}

function markMarkdownHistorical(artifact) {
  if (!artifact.mdPath || !artifact.state || artifact.state !== "historical") return { updated: false };
  const original = readText(artifact.mdPath);
  const lines = original.split("\n");
  if (hasHistoricalBanner(lines)) {
    return { updated: false, reason: "already-marked" };
  }

  const banner = buildHistoricalBanner(artifact);
  const insertedAt = lines.findIndex((line) => line.startsWith("#"));
  const index = insertedAt === 0 ? 1 : 0;
  lines.splice(index, 0, ...banner);
  writeText(artifact.mdPath, `${lines.join("\n")}\n`);
  return { updated: true };
}

function markJsonHistorical(artifact) {
  const report = readJson(artifact.jsonPath);
  const existing = report.sourceOfTruth || {};
  const nextState = {
    status: artifact.state,
    reportVersion: REPORT_VERSION,
    evaluatedAt: REPORT_DATE,
    sourceDate: artifact.date,
    source: artifact.state === "historical" ? "report-archive" : "report-active",
    reason: artifact.state === "historical" ? "date-mismatch-with-source-of-truth" : "fresh-to-source-of-truth",
  };
  if (
    existing.status === nextState.status &&
    existing.reportVersion === nextState.reportVersion &&
    existing.evaluatedAt === nextState.evaluatedAt &&
    existing.sourceDate === nextState.sourceDate
  ) {
    return { updated: false };
  }
  report.sourceOfTruth = {
    ...existing,
    ...nextState,
  };
  writeJson(artifact.jsonPath, report);
  return { updated: true };
}

function collectLiveSignals() {
  const featureCoverage = (() => {
    try {
      const feature = require("./report_feature_coverage.js");
      const report = typeof feature.buildCoverage === "function"
        ? feature.buildCoverage()
        : feature.buildReport();
      return {
        id: "FEATURE_COVERAGE",
        status: report.summary && report.summary.strictFailures === 0 && report.summary.evidenceGateFailures === 0 ? "green" : "red",
        detail: `strictFailures=${report.summary.strictFailures}, evidenceGateFailures=${report.summary.evidenceGateFailures}, version=${report.reportVersion}`,
        date: report.date,
      };
    } catch (error) {
      return {
        id: "FEATURE_COVERAGE",
        status: "unknown",
        detail: `failed to rebuild: ${error.message}`,
        date: null,
      };
    }
  })();

  const questionCoverage = (() => {
    try {
      const qc = require("./report_question_coverage_targets.js");
      const report = qc.buildReport();
      return {
        id: "QUESTION_COVERAGE_TARGETS",
        status: report.summary?.ready ? "green" : "red",
        detail: `ready=${report.summary?.ready}, mcGap=${report.summary?.mcGapCount}, fillGap=${report.summary?.fillGapCount}, version=${report.reportVersion}`,
        date: report.date,
        source: "questionCoverage",
      };
    } catch (error) {
      return {
        id: "QUESTION_COVERAGE_TARGETS",
        status: "unknown",
        detail: `failed to rebuild: ${error.message}`,
        date: null,
      };
    }
  })();

  const questionQuality = (() => {
    try {
      const qa = require("./report_question_quality.js");
      const report = qa.buildQuestionQualityReport();
      return {
        id: "QUESTION_QUALITY",
        status: report.summary?.cleanQuestions === report.summary?.total ? "green" : "yellow",
        detail: `questionQualityIndex=${report.summary?.questionQualityIndex}%, total=${report.summary?.total}`,
        date: report.date,
      };
    } catch (error) {
      return {
        id: "QUESTION_QUALITY",
        status: "unknown",
        detail: `failed to rebuild: ${error.message}`,
        date: null,
      };
    }
  })();

  const finishLine = (() => {
    try {
      const finishLineReport = require("./report_finish_line_prerelease.js");
      const report = finishLineReport.buildReport({});
      return {
        id: "FINISH_LINE_PRE_RELEASE",
        status: report.summary?.ready ? "green" : "red",
        detail: `ready=${report.summary?.ready}, passed=${report.summary?.passed}/${report.summary?.checks}`,
        date: report.date,
      };
    } catch (error) {
      return {
        id: "FINISH_LINE_PRE_RELEASE",
        status: "unknown",
        detail: `failed to rebuild: ${error.message}`,
        date: null,
      };
    }
  })();

  return [featureCoverage, questionCoverage, questionQuality, finishLine];
}

function collectReconcilationFindings(signals, artifactSummary = {}) {
  const feature = signals.find((item) => item.id === "FEATURE_COVERAGE");
  const questions = signals.find((item) => item.id === "QUESTION_COVERAGE_TARGETS");
  const findings = [];
  if (feature?.status === "green" && questions?.status === "red") {
    findings.push({
      id: "recon-001",
      severity: "P1",
      finding: "Feature coverage is clean while question coverage remains red. Do not claim both as current production truth.",
      evidence: {
        feature: feature.detail,
        questions: questions.detail,
      },
    });
  }
  if (questions?.status === "green" && feature?.status === "red") {
    findings.push({
      id: "recon-002",
      severity: "P2",
      finding: "Question coverage is ready while feature coverage still shows strict failures; validate the feature metrics and refresh feature gates.",
      evidence: {
        feature: feature.detail,
        questions: questions.detail,
      },
    });
  }
  const staleCount = artifactSummary.historical || 0;
  if (staleCount > 10) {
    findings.push({
      id: "recon-003",
      severity: "P1",
      finding: `${staleCount} tracked report snapshots are older than the source-of-truth date and should be regenerated or explicitly kept historical.`,
      evidence: {
        sourceOfTruthDate: REPORT_DATE,
        staleArtifacts: staleCount,
      },
    });
  }
  return findings;
}

function buildArtifacts() {
  const artifacts = collectTrackedJsonArtifacts();
  for (const artifact of artifacts) {
    const isHistorical = isHistoricalDate(artifact.date);
    artifact.state = isHistorical ? "historical" : "active";
    artifact.reportDate = artifact.date;
    artifact.mdDate = artifact.mdPath && parseReportDateFromMarkdown(readText(artifact.mdPath));
  }
  artifacts.sort((left, right) =>
    (left.id < right.id ? -1 : 1) || (left.state === right.state ? 0 : left.state === "historical" ? 1 : -1),
  );
  return artifacts;
}

function buildSourceOfTruthReport() {
  const artifacts = buildArtifacts();
  const signals = collectLiveSignals();
  const artifactSummary = {
    total: artifacts.length,
    historical: artifacts.filter((item) => item.state === "historical").length,
    active: artifacts.filter((item) => item.state === "active").length,
  };
  const findings = collectReconcilationFindings(signals, artifactSummary);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    source: "scripts/report_source_of_truth.js",
    scope: "generated report freshness + contradiction reconciliation",
    artifactSummary,
    policy: [
      "Reconciliation uses live rebuilds of feature and question coverage reports.",
      "Any report older than today's source-of-truth date is marked historical/superseded.",
      "Live decisions must be driven by active reports in this file.",
    ].join(" "),
    signals,
    findings,
    artifacts: artifacts.map((artifact) => ({
      id: artifact.id,
      state: artifact.state,
      date: artifact.date,
      mdDate: artifact.mdDate || "unknown",
      reportVersion: artifact.reportVersion,
      type: artifact.type,
      title: artifact.title,
    })),
  };
}

function toMarkdown(report) {
  const rows = report.artifacts.map((artifact) =>
    `| ${artifact.id} | ${artifact.state} | ${artifact.date} | ${artifact.reportVersion} | ${artifact.type} | ${artifact.mdDate === "unknown" ? "md date missing" : artifact.mdDate} |`,
  );
  const signalLines = report.signals.map((signal) => `- **${signal.id}**: ${signal.status} (` + signal.detail + `)`);
  const findingLines = report.findings.length
    ? report.findings.map((finding) => `- [${finding.severity}] ${finding.finding} (${finding.id})`)
    : ["- No contradictions found for active evidence."];

  return [
    "# Report Source of Truth",
    "",
    `Date: ${report.date}`,
    `Version: ${report.reportVersion}`,
    "",
    "## Tracked Artifacts",
    "",
    "| Artifact | State | Date | Version | Type | Markdown Date |",
    "|---|---|---|---|---|---|",
    ...rows,
    "",
    "## Live Signals",
    "",
    ...signalLines,
    "",
    "## Source-of-Truth Findings",
    "",
    ...findingLines,
    "",
    "## Policy",
    "",
    "- Active claims should come from reports where `state=active`.",
    "- Historical artifacts must not be treated as live truth unless explicitly noted in a migration note.",
    "- Re-run with `--write` after refreshing reports or running `npm run ...` commands.",
    "",
  ].join("\n");
}

function applyHistoricalTags(artifacts) {
  const updated = {
    artifacts: 0,
    markdown: 0,
    json: 0,
  };
  for (const artifact of artifacts) {
    const mark = markMarkdownHistorical(artifact);
    if (mark.updated) updated.markdown++;
    const markJson = markJsonHistorical(artifact);
    if (markJson.updated) updated.json++;
  }
  return updated;
}

function run() {
  const report = buildSourceOfTruthReport();
  const argv = process.argv.slice(2);
  if (argv.includes("--write")) {
    applyHistoricalTags(report.artifacts.map((artifact) => ({
      ...artifact,
      jsonPath: path.join(ROOT, `${artifact.id}.json`),
      mdPath: artifact.type === "markdown+json" ? path.join(ROOT, `${artifact.id}.md`) : null,
      date: artifact.date,
      state: artifact.state,
      summary: null,
      title: artifact.title,
    })));
    writeJson(JSON_PATH, report);
    writeText(MD_PATH, `${toMarkdown(report)}\n`);
  }
  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (argv.includes("--summary")) {
    process.stdout.write(`${JSON.stringify(report.artifactSummary, null, 2)}\n`);
  } else {
    process.stdout.write(toMarkdown(report));
  }
  if (argv.includes("--strict")) {
    const hasCritical = report.findings.some((finding) => String(finding.severity || "").toUpperCase().startsWith("P1"));
    const hasActive = report.artifactSummary.active > 0;
    if (hasCritical || !hasActive) process.exitCode = 1;
  }
}

if (require.main === module) {
  run();
}

module.exports = { buildSourceOfTruthReport, collectTrackedJsonArtifacts, collectLiveSignals, collectReconcilationFindings };
