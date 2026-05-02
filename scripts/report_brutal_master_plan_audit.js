#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_MD = "BRUTAL_MASTER_PLAN_AUDIT.md";
const REPORT_JSON = "BRUTAL_MASTER_PLAN_AUDIT.json";
const REPORT_DATE = new Date().toISOString().slice(0,10);

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(ROOT, file));
}

function extractItems(file) {
  const lines = read(file).split(/\n/);
  const items = [];
  lines.forEach((line, index) => {
    const checkbox = line.match(/\[([ Vv~\-])\]/);
    const bugRow = line.match(/^\|\s*(BUG-AUDIT-\d+)\s*\|\s*(\[[^\]]+\])\s*\|\s*([^|]+)\|\s*(.+?)\s*\|$/);
    if (bugRow) {
      items.push({
        file,
        line: index + 1,
        id: bugRow[1],
        sourceStatus: bugRow[2],
        text: bugRow[4].trim(),
        kind: "bug-audit",
      });
      return;
    }
    if (!checkbox) return;
    const idMatch = line.match(/\b(P-?\d+(?:\.\d+)*|P\d+(?:\.\d+)*|AUDIT-FIX-\d+|BUG-AUDIT-\d+)\b/);
    items.push({
      file,
      line: index + 1,
      id: idMatch ? idMatch[1] : `${file}:${index + 1}`,
      sourceStatus: `[${checkbox[1]}]`,
      text: line.replace(/^\s*[-*]\s*/, "").trim(),
      kind: "checkbox",
    });
  });
  return items;
}

function hasAnyArtifact(needles) {
  return needles.some((needle) => exists(needle));
}

function classify(item) {
  const text = item.text;
  const lower = text.toLowerCase();
  const source = item.sourceStatus;

  if (source === "[ ]" || source === "[-]") {
    return {
      auditStatus: "NOT DONE",
      confidence: "high",
      reason: "The source plan itself marks this as open/deferred.",
    };
  }
  if (source === "[~]") {
    return {
      auditStatus: "PARTIAL",
      confidence: "high",
      reason: "The source plan marks this as in progress.",
    };
  }

  const impossibleExternalEvidence =
    /real usage|quarterly|validated .* learner|exam uplift|d7 retention|10[- ]student|app store|google play|push notification|\biOS\b|\bAndroid\b|pricing|business kpi|teacher\/mentor review after the exam|after the exam/i.test(text);
  if (impossibleExternalEvidence) {
    return {
      auditStatus: "FAKED",
      confidence: "medium",
      reason:
        "Marked done, but it claims real-world/external/post-exam evidence that is not available in the local repo. Treat as overclaimed until real evidence exists.",
    };
  }

  const specOnly =
    /define |plan |template|roadmap|policy|checklist|notes|spec|split .*future|premium experience rules|quarterly roadmap/i.test(text);
  if (specOnly && source === "[V]") {
    return {
      auditStatus: "PARTIAL",
      confidence: "medium",
      reason:
        "A document/spec may exist, but this is not the same as a fully working product path verified end to end.",
    };
  }

  const evidenceFiles = [];
  if (/svcollege|tab matrix|readiness/i.test(text)) {
    evidenceFiles.push("tests/svcollege-tab-matrix.test.js", "tests/svcollege-full-portal-smoke.test.js");
  }
  if (/pwa|offline|service-worker|cache/i.test(text)) {
    evidenceFiles.push("tests/svcollege-pwa-offline-smoke.test.js", "tests/service-worker-cache.test.js");
  }
  if (/bug agent/i.test(text)) {
    evidenceFiles.push("tests/bug-agent.test.js", "src/core/bug-agent.js");
  }
  if (/content factory|content studio|schema|variant/i.test(text)) {
    evidenceFiles.push("tests/content-factory-pipeline.test.js", "tests/content-studio.test.js", "tests/content-schema-contract.test.js");
  }
  if (/sync/i.test(text)) {
    evidenceFiles.push("tests/sync-alpha.test.js", "src/core/progress-sync.js");
  }
  if (/xp|store|level 100|economy/i.test(text)) {
    evidenceFiles.push("tests/xp-economy.test.js", "tests/level100-release-gate.test.js", "tests/economy-anti-cheat.test.js");
  }
  if (/question|distractor|coverage|reuse/i.test(text)) {
    evidenceFiles.push("tests/question-coverage-targets.test.js", "tests/question-reuse-audit.test.js", "tests/question-activity-coverage.test.js");
  }
  if (/museum/i.test(text)) {
    evidenceFiles.push("tests/museum-access-smoke.test.js", "tests/museum-evidence-fields.test.js");
  }

  if (source === "[V]" && evidenceFiles.length > 0 && hasAnyArtifact(evidenceFiles)) {
    return {
      auditStatus: "DONE",
      confidence: "medium",
      reason:
        "Marked done and has local implementation/test/report artifacts. This still does not prove real-world usage unless separately stated.",
    };
  }

  if (source === "[V]" && /test|strict|gate|verified|build|validate/i.test(text)) {
    return {
      auditStatus: "DONE",
      confidence: "medium",
      reason: "Marked done and describes a local gate/test/build artifact.",
    };
  }

  if (source === "[V]" && lower.includes("no fake data")) {
    return {
      auditStatus: "PARTIAL",
      confidence: "high",
      reason:
        "Validators reduce fake data risk, but they cannot prove every product claim and document sentence is real.",
    };
  }

  return {
    auditStatus: source === "[V]" ? "PARTIAL" : "PARTIAL",
    confidence: "medium",
    reason:
      "Marked done in the plan, but this audit did not find enough direct end-to-end evidence to call it 100/100 DONE.",
  };
}

function summarize(items) {
  const counts = { DONE: 0, FAKED: 0, PARTIAL: 0, "NOT DONE": 0 };
  items.forEach((item) => {
    counts[item.auditStatus] += 1;
  });
  return counts;
}

function toMarkdown(report) {
  const lines = [];
  lines.push("# Brutal Master Plan Audit");
  lines.push(`Date: ${REPORT_DATE}`);
  lines.push("");
  lines.push("## Method");
  lines.push("- This audit is intentionally strict.");
  lines.push("- DONE means local code/test/report evidence exists or the item is a concrete gate that can be verified locally.");
  lines.push("- PARTIAL means work/spec/local scaffolding exists or the item is marked done but not proven end-to-end.");
  lines.push("- FAKED means the plan marks an item done while it depends on real external/post-exam/learner/business evidence that is not present.");
  lines.push("- NOT DONE means the plan itself marks it open/deferred.");
  lines.push("- This report does not invent evidence. Missing evidence stays missing.");
  lines.push("");
  lines.push("## Summary");
  lines.push(`- Items audited: ${report.items.length}`);
  lines.push(`- DONE: ${report.summary.DONE}`);
  lines.push(`- FAKED: ${report.summary.FAKED}`);
  lines.push(`- PARTIAL: ${report.summary.PARTIAL}`);
  lines.push(`- NOT DONE: ${report.summary["NOT DONE"]}`);
  lines.push("");
  lines.push("## High-Risk Conclusions");
  lines.push("- Several broad phase totals in `EXECUTION_TASKS.md` are overconfident. They mix working code, reports, specs, local-only scaffolding and post-exam plans.");
  lines.push("- Anything that claims real learner outcomes, D1/D7 retention, real usage, pricing validation, App Store/Google Play, post-exam review or validated promotion must be treated as FAKED until real evidence exists.");
  lines.push("- Many `[V]` items are real local artifacts but not 100/100 product completion. They are PARTIAL when they lack browser, mobile, keyboard, live-backend or real-user verification.");
  lines.push("- `MASTER_PLAN.md` is a legacy/backlog file. The operational truth is split across multiple documents, which itself is a bug.");
  lines.push("");
  lines.push("## Every Audited Item");
  lines.push("| # | Status | Source | Line | ID | Source Mark | Reason | Item |");
  lines.push("|---:|---|---|---:|---|---|---|---|");
  report.items.forEach((item, index) => {
    const escapedText = item.text.replace(/\|/g, "\\|");
    const escapedReason = item.reason.replace(/\|/g, "\\|");
    lines.push(
      `| ${index + 1} | ${item.auditStatus} | ${item.file} | ${item.line} | ${item.id} | ${item.sourceStatus} | ${escapedReason} | ${escapedText} |`,
    );
  });
  lines.push("");
  lines.push("## Completion Plan");
  lines.push("1. Freeze feature expansion until all FAKED and NOT DONE P0/P1 items are converted into real tasks.");
  lines.push("2. Finish P6.3.1 SVCollege-priority activity gaps first, using real Trace/Build/Bug content only.");
  lines.push("3. Add blocking gates for activity coverage only after real content can pass them.");
  lines.push("4. Split legacy specs from active release requirements so phase totals cannot overclaim completion.");
  lines.push("5. For every `[V]` item downgraded to PARTIAL, add one concrete verification artifact: unit test, browser smoke, generated report, live-backend proof or explicit deferred status.");
  lines.push("6. Remove FAKED status only when real external evidence exists, not when a local placeholder/spec exists.");
  return `${lines.join("\n")}\n`;
}

function buildReport() {
  const items = [
    ...extractItems("MASTER_PLAN.md"),
    ...extractItems("EXECUTION_TASKS.md"),
  ].map((item) => ({ ...item, ...classify(item) }));
  return {
    reportVersion: "brutal-master-plan-audit-v1",
    date: REPORT_DATE,
    summary: summarize(items),
    items,
  };
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--write")) {
    fs.writeFileSync(path.join(ROOT, REPORT_JSON), `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(path.join(ROOT, REPORT_MD), toMarkdown(report));
  }
  if (argv.includes("--summary")) {
    console.log(JSON.stringify({ summary: report.summary, items: report.items.length }, null, 2));
  }
  return report;
}

if (require.main === module) {
  run();
}

module.exports = { buildReport, classify, extractItems, toMarkdown };
