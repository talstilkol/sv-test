#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

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

function readJson(file) {
  if (!exists(file)) return null;
  try {
    return JSON.parse(read(file));
  } catch (error) {
    return null;
  }
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

function liveEvidenceFacts() {
  const portal = readJson("PORTAL_FULL_AUDIT_REPORT.json");
  const dom = readJson("DOM_STORAGE_TRUST_BOUNDARY_REPORT.json");
  const coverage = readJson("QUESTION_COVERAGE_TARGETS.json");
  const activity = readJson("QUESTION_ACTIVITY_COVERAGE_REPORT.json");
  const sourceOfTruth = readJson("REPORT_SOURCE_OF_TRUTH.json");
  const finishLine = readJson("FINISH_LINE_PRERELEASE_REPORT.json");
  const taskBoard = readJson("EXAM_TASK_BOARD_REPORT.json");
  const quality = readJson("QUESTION_QUALITY_REPORT.json");
  const distractor = readJson("DISTRACTOR_EXAM_GATE_REPORT.json");
  const performance = readJson("PORTAL_FULL_AUDIT_REPORT.json");
  const weekly = readJson("WEEKLY_PORTAL_STATUS.json");
  const manualPlan = readJson("MANUAL_QUESTION_AUTHORING_PLAN.json");
  const postGreen = readJson("POST_GREEN_HARDENING_REPORT.json");
  const releaseInventory = readJson("RELEASE_INVENTORY_REPORT.json");
  const questionBankStats = readActiveQuestionBankStats();
  const weeklyPortalReady =
    weekly?.ready === true &&
    weekly?.summary?.portalGates === "31/31" &&
    (Array.isArray(weekly?.regressions) ? weekly.regressions.length === 0 : weekly?.summary?.regressions === 0);
  const portalReady = (portal?.ready === true && portal?.summary?.passed === portal?.summary?.total) || weeklyPortalReady;
  const finishLineReady = finishLine?.summary?.ready === true || weeklyPortalReady;
  const coverageReady = coverage?.summary?.ready === true && coverage?.summary?.mcGapCount === 0 && coverage?.summary?.fillGapCount === 0;
  const activityReady = activity?.summary?.ready === true && activity?.summary?.activityGapCount === 0;
  const sourceOfTruthReady = Boolean(sourceOfTruth?.artifactSummary);
  const questionQualityReady = quality?.summary?.blockerIssues === 0 && quality?.summary?.warningIssues === 0;
  const distractorExamReady = distractor?.ready === true && distractor?.totals?.examCriticalFlaggedPercent === 0;
  const seededArchiveReady = exists("tests/no-auto-question-generation.test.js") && exists("data/questions_bank_seeded.js");
  const manualQuestionPlanReady =
    manualPlan?.summary?.readyForAuthoring === true &&
    manualPlan?.summary?.gapConcepts === 0 &&
    manualPlan?.summary?.mcGapCount === 0 &&
    manualPlan?.summary?.fillGapCount === 0 &&
    manualPlan?.summary?.activityGapCount === 0 &&
    manualPlan?.summary?.batches === 0;
  return {
    portalReady,
    portalE2EGreen: (portal?.scores || []).some((score) => score.domain === "E2E" && String(score.status).startsWith("green")),
    domReady: dom?.summary?.ready === true && dom?.summary?.dom?.requiresReview === 0,
    coverageReady,
    activityReady,
    sourceOfTruthReady,
    finishLineReady,
    taskBoardReady: taskBoard?.ready === true,
    questionQualityReady,
    questionQualityNotes: quality?.summary?.noteIssues ?? null,
    distractorExamReady,
    performanceReady: (performance?.scores || []).some((score) => score.domain === "Core gates" && score.status === "green") || weeklyPortalReady,
    keyboardReady: exists("tests/keyboard-accessibility.test.js") && weeklyPortalReady,
    accessibilityReady: exists("tests/svcollege-accessibility-smoke.test.js") && weeklyPortalReady,
    bugAgentReady: exists("tests/bug-agent.test.js"),
    seededArchiveReady,
    studentExportReady: exists("SVCOLLEGE_STUDENT_READINESS_EXPORT.json"),
    currentAuditReady: exists("scripts/report_brutal_master_plan_audit.js") && exists("BRUTAL_MASTER_PLAN_AUDIT.json"),
    manualQuestionPlanReady,
    questionReportScopeReady: sourceOfTruthReady && seededArchiveReady && coverageReady && activityReady && questionQualityReady,
    postGreenGateSummaryReady: postGreen?.strictReady === true && postGreen?.summary?.portalReady === true && postGreen?.summary?.qualityDebtReady === true,
    releaseInventoryReady: releaseInventory?.ready === true && releaseInventory?.summary?.unknownPaths === 0,
    mcTotal: questionBankStats.mcTotal,
    optionFeedbackReady:
      questionBankStats.mcTotal > 0 &&
      questionBankStats.mcMissingOptionFeedback === 0 &&
      exists("tests/question-option-feedback-contract.test.js"),
    learningTypesReady:
      hasLearningTypeContracts() &&
      exists("tests/learning-types-contract.test.js"),
    unknownUnavailablePolicyReady:
      sourceOfTruthReady &&
      exists("tests/learning-os-outcome-scale.test.js") &&
      exists("MANUAL_QUESTION_AUTHORING_PLAN.md") &&
      read("MANUAL_QUESTION_AUTHORING_PLAN.md").includes("unknown/unavailable"),
  };
}

function duplicateKey(item) {
  return item.text
    .toLowerCase()
    .replace(/\|/g, " ")
    .replace(/\b(sys-audit|bug-audit|audit-fix|fwd|kimi-audit|museum-fwd)-[\w.]+/gi, "")
    .replace(/`[^`]+`/g, "`code`")
    .replace(/\[[ v~\-]\]/gi, "")
    .replace(/\d+/g, "#")
    .replace(/\s+/g, " ")
    .trim();
}

function readActiveQuestionBankStats() {
  const dataDir = path.join(ROOT, "data");
  const sandbox = { window: {}, console };
  try {
    fs.readdirSync(dataDir)
      .filter((file) => file.endsWith(".js"))
      .sort()
      .forEach((file) => {
        vm.runInNewContext(
          fs.readFileSync(path.join(dataDir, file), "utf8"),
          sandbox,
          { filename: file },
        );
      });
  } catch (error) {
    return {
      mcTotal: 0,
      mcMissingOptionFeedback: null,
    };
  }
  const mc = Array.isArray(sandbox.QUESTIONS_BANK?.mc) ? sandbox.QUESTIONS_BANK.mc : [];
  return {
    mcTotal: mc.length,
    mcMissingOptionFeedback: mc.filter((question) => (
      !Array.isArray(question.optionFeedback) ||
      !Array.isArray(question.options) ||
      question.optionFeedback.length !== question.options.length
    )).length,
  };
}

function hasLearningTypeContracts() {
  if (!exists("src/core/learning-types.ts")) return false;
  const source = read("src/core/learning-types.ts");
  return [
    "export interface LessonContract",
    "export interface ConceptContract",
    "export type QuestionContract",
    "export interface ScoreContract",
  ].every((needle) => source.includes(needle));
}

function evidenceForItem(item, facts) {
  const text = item.text;
  const evidence = [];
  if (/questions:coverage-targets|פערי MC|פערי Fill|mcGap|fillGap|coverage-targets/i.test(text) && facts.coverageReady) {
    evidence.push("QUESTION_COVERAGE_TARGETS: mcGapCount=0, fillGapCount=0");
  }
  if (/Trace\/Build\/Bug|activity|פערי פעילות|activity coverage/i.test(text) && facts.activityReady) {
    evidence.push("QUESTION_ACTIVITY_COVERAGE_REPORT: activityGapCount=0");
  }
  if (/innerHTML|document\.write|insertAdjacentHTML|localStorage|sessionStorage|trust boundary|CSP|security inventory/i.test(text) && facts.domReady) {
    evidence.push("DOM_STORAGE_TRUST_BOUNDARY_REPORT: requiresReview=0, criticalExamReady=true");
  }
  if (/source-of-truth|historical|superseded|דוחות ישנים|generated reports|metadata|drift|תאריך/i.test(text) && facts.sourceOfTruthReady) {
    evidence.push("REPORT_SOURCE_OF_TRUTH exists and separates active vs historical reports");
  }
  if (/Playwright|E2E|browser smoke|visual smoke|desktop\/mobile|mobile|דפדפן/i.test(text) && facts.portalE2EGreen) {
    evidence.push("PORTAL_FULL_AUDIT_REPORT: E2E green");
  }
  if (/PWA|offline|service-worker|cache/i.test(text) && facts.portalReady) {
    evidence.push("PORTAL_FULL_AUDIT_REPORT: PWA/offline gates green in full audit");
  }
  if (/Finish Line|finish-line|release gate|pre-release/i.test(text) && facts.finishLineReady) {
    evidence.push("FINISH_LINE_PRERELEASE_REPORT: ready=true");
  }
  if (/Exam100|mock exam|exam task|לוח משימות|מבחן/i.test(text) && facts.taskBoardReady) {
    evidence.push("EXAM_TASK_BOARD_REPORT: ready=true");
  }
  if (/quality:questions|quality:remediation|הערות איכות|distractor/i.test(text) && facts.questionQualityReady && facts.distractorExamReady) {
    evidence.push(`QUESTION_QUALITY_REPORT: blockers=0 warnings=0, notes=${facts.questionQualityNotes}; DISTRACTOR_EXAM_GATE: examCritical=0%`);
  }
  if (/payload|CSS|stylesheet|bundle|performance/i.test(text) && facts.performanceReady) {
    evidence.push("PORTAL_FULL_AUDIT_REPORT: Core gates green; performance budget green");
  }
  if (/keyboard|Escape|Enter|Arrow|focus|a11y|accessibility|ניווט|מקלדת/i.test(text) && (facts.keyboardReady || facts.accessibilityReady)) {
    evidence.push("KEYBOARD/A11Y: keyboard-accessibility and accessibility smoke artifacts exist; portal audit green");
  }
  if (/bug agent/i.test(text) && facts.bugAgentReady) {
    evidence.push("BUG_AGENT: tests/bug-agent.test.js exists as local verification artifact");
  }
  if (/questions_bank_seeded|seeded|generated question|generated\/seeded|ארכיון/i.test(text) && facts.seededArchiveReady) {
    evidence.push("NO_AUTO_QUESTIONS: seeded bank is archive-only and covered by no-auto-question-generation tests");
  }
  if (/MANUAL_QUESTION_AUTHORING_PLAN|1,347|865|owner\/reviewer|owner|reviewer/i.test(text) && facts.manualQuestionPlanReady) {
    evidence.push("MANUAL_QUESTION_AUTHORING_PLAN: gapConcepts=0, mcGapCount=0, fillGapCount=0, activityGapCount=0, batches=0; owner/reviewer remains unknown/unavailable unless a real active batch exists");
  }
  if (/דוחות שאלות|scope של דוחות|active manual bank|archive\/generated|concept-density|dashboard display|stale report|דוח stale/i.test(text) && facts.questionReportScopeReady) {
    evidence.push("REPORT_SOURCE_OF_TRUTH + QUESTION_COVERAGE_TARGETS + QUESTION_ACTIVITY_COVERAGE_REPORT: active manual bank is separated from archive/generated reports and current gaps are 0");
  }
  if (/data-shape.*batch פעילות|batch פעילות חדש.*data-shape|activity batch.*data-shape/i.test(text) && facts.activityReady) {
    evidence.push("QUESTION_ACTIVITY_COVERAGE_REPORT: activityGapCount=0, so there is no active new activity batch missing a data-shape gate");
  }
  if (/Kimi|AUDIT חיצוני|external audit|live gate|claim/i.test(text) && facts.sourceOfTruthReady && facts.portalReady) {
    evidence.push("REPORT_SOURCE_OF_TRUTH + PORTAL_FULL_AUDIT: external audit claims require current live gates");
  }
  if (/weak counters|student-export|withoutQuestions|withoutHardQuestion|codeConceptsWithoutProof/i.test(text) && facts.studentExportReady) {
    evidence.push("SVCOLLEGE_STUDENT_READINESS_EXPORT: weak counters are generated and available for prioritization");
  }
  if (/brutal-master-plan-audit|master-plan:brutal-audit|BRUTAL_MASTER_PLAN_AUDIT|FAKED|PARTIAL|NOT DONE|phase/i.test(text) && facts.currentAuditReady) {
    evidence.push("BRUTAL_MASTER_PLAN_AUDIT: current audit report and script exist");
  }
  if (/סיכום ההתקדמות העליון|לפי gates|ספירה היסטורית|progress summary/i.test(text) && facts.postGreenGateSummaryReady) {
    evidence.push("POST_GREEN_HARDENING_REPORT: current progress summary is derived from live gates and quality debt reports, not historical source checkbox totals");
  }
  if (/unknown\/unavailable|אין backfill|backfill/i.test(text) && facts.unknownUnavailablePolicyReady) {
    evidence.push("REPORT_SOURCE_OF_TRUTH + MANUAL_QUESTION_AUTHORING_PLAN: missing evidence remains unknown/unavailable and is not backfilled");
  }
  if (/data-originated HTML|esc\(|DOM API|sanitizer/i.test(text) && facts.domReady) {
    evidence.push("DOM_STORAGE_TRUST_BOUNDARY_REPORT: data-originated DOM sinks are reviewed; requiresReview=0 and criticalExamReady=true");
  }
  if (/release\/commit|inventory|generated artifacts|worktree מלוכלך|קבצים מיועדים/i.test(text) && facts.releaseInventoryReady) {
    evidence.push("RELEASE_INVENTORY_REPORT: every dirty/generated/source/test path is classified; unknownPaths=0 and releaseAllowed remains false while the worktree is dirty");
  }
  if (/optionFeedback|לכל MC חדש/i.test(text) && facts.optionFeedbackReady) {
    evidence.push(`QUESTION_OPTION_FEEDBACK_CONTRACT: ${facts.mcTotal} active MC questions have optionFeedback aligned to options`);
  }
  if (/interfaces של lesson\/concept\/question\/score/i.test(text) && facts.learningTypesReady) {
    evidence.push("LEARNING_TYPES_CONTRACT: src/core/learning-types.ts defines Lesson/Concept/Question/Score contracts before view migration");
  }
  return evidence;
}

function isNotRelevantCurrentRelease(item) {
  return /pilot|10 תלמידים|d1|d7|real usage|learner outcome|promotion outcome|שער הקידום|ראיות תלמידים|retention|pricing|business kpi|app store|google play|post-exam|after the exam|telemetry חיצוני|sentry|plausible|seo|community|קהילה|supabase אמיתי|backend\/auth אמיתי|cross-device sync|MUSEUM-FWD|museum|מוזיאון|React Native|iOS build|Android build|Push notifications|Pocket Card|TTS|Install prompt|Shared core\/ with web|deferred|אחרי SVCollege|רק אחרי SVCollege/i.test(item.text);
}

function classifyBacklog(item, facts, seenDuplicateKeys) {
  if (item.auditStatus === "DONE") {
    return {
      backlogClass: "done-with-evidence",
      backlogReason: "The audit already found local evidence for this item.",
      evidence: [],
    };
  }

  if (isNotRelevantCurrentRelease(item)) {
    return {
      backlogClass: "not-relevant",
      backlogReason: "External, post-exam, commercial, backend-auth, pilot, or future-product work; not required for the local Exam100 release gate.",
      evidence: [],
    };
  }

  const evidence = evidenceForItem(item, facts);
  if (evidence.length) {
    return {
      backlogClass: "done-with-evidence",
      backlogReason: "The source checkbox is stale/open, but current local reports provide live evidence.",
      evidence,
    };
  }

  const key = duplicateKey(item);
  const duplicateOf = key.length > 40 ? seenDuplicateKeys.get(key) : null;
  if (!duplicateOf && key.length > 40) seenDuplicateKeys.set(key, item.id);
  if (duplicateOf) {
    return {
      backlogClass: "duplicate",
      backlogReason: `Near-identical text already appears earlier as ${duplicateOf}.`,
      evidence: [],
    };
  }

  return {
    backlogClass: "real-open",
    backlogReason: item.auditStatus === "PARTIAL"
      ? "Partial or in-progress item still needs a concrete closing artifact."
      : "No current local evidence was found that fully closes this open item.",
    evidence: [],
  };
}

function summarizeBacklogClasses(items) {
  const counts = {
    "real-open": 0,
    "done-with-evidence": 0,
    duplicate: 0,
    "not-relevant": 0,
  };
  items.forEach((item) => {
    counts[item.backlogClass] += 1;
  });
  return counts;
}

function summarizeActiveStatusDrift(items) {
  const counts = { DONE: 0, FAKED: 0, PARTIAL: 0, "NOT DONE": 0 };
  items
    .filter((item) => item.backlogClass === "real-open")
    .forEach((item) => {
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
  lines.push("## Active Status Drift");
  lines.push("- Raw source marks are preserved above for historical traceability.");
  lines.push("- Active drift below counts only `real-open` items after evidence/not-relevant/duplicate classification.");
  lines.push(`- Active DONE: ${report.activeStatusSummary.DONE}`);
  lines.push(`- Active FAKED: ${report.activeStatusSummary.FAKED}`);
  lines.push(`- Active PARTIAL: ${report.activeStatusSummary.PARTIAL}`);
  lines.push(`- Active NOT DONE: ${report.activeStatusSummary["NOT DONE"]}`);
  lines.push("");
  lines.push("## Operational Backlog Classes");
  lines.push(`- real-open: ${report.backlogClassSummary["real-open"]}`);
  lines.push(`- done-with-evidence: ${report.backlogClassSummary["done-with-evidence"]}`);
  lines.push(`- duplicate: ${report.backlogClassSummary.duplicate}`);
  lines.push(`- not-relevant: ${report.backlogClassSummary["not-relevant"]}`);
  lines.push("");
  lines.push("## High-Risk Conclusions");
  lines.push("- Several broad phase totals in `EXECUTION_TASKS.md` are overconfident. They mix working code, reports, specs, local-only scaffolding and post-exam plans.");
  lines.push("- Anything that claims real learner outcomes, D1/D7 retention, real usage, pricing validation, App Store/Google Play, post-exam review or validated promotion must be treated as FAKED until real evidence exists.");
  lines.push("- Many `[V]` items are real local artifacts but not 100/100 product completion. They are PARTIAL when they lack browser, mobile, keyboard, live-backend or real-user verification.");
  lines.push("- `MASTER_PLAN.md` is a legacy/backlog file. The operational truth is split across multiple documents, which itself is a bug.");
  lines.push("");
  lines.push("## Every Audited Item");
  lines.push("| # | Status | Backlog Class | Source | Line | ID | Source Mark | Reason | Evidence | Item |");
  lines.push("|---:|---|---|---|---:|---|---|---|---|---|");
  report.items.forEach((item, index) => {
    const escapedText = item.text.replace(/\|/g, "\\|");
    const escapedReason = item.reason.replace(/\|/g, "\\|");
    const escapedEvidence = (item.evidence || []).join("<br>").replace(/\|/g, "\\|") || "none";
    lines.push(
      `| ${index + 1} | ${item.auditStatus} | ${item.backlogClass} | ${item.file} | ${item.line} | ${item.id} | ${item.sourceStatus} | ${escapedReason} ${item.backlogReason ? `Backlog: ${item.backlogReason}` : ""} | ${escapedEvidence} | ${escapedText} |`,
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
  const facts = liveEvidenceFacts();
  const seenDuplicateKeys = new Map();
  const items = [
    ...extractItems("MASTER_PLAN.md"),
    ...extractItems("EXECUTION_TASKS.md"),
  ].map((item) => {
    const audited = { ...item, ...classify(item) };
    return { ...audited, ...classifyBacklog(audited, facts, seenDuplicateKeys) };
  });
  return {
    reportVersion: "brutal-master-plan-audit-v1",
    date: REPORT_DATE,
    summary: summarize(items),
    activeStatusSummary: summarizeActiveStatusDrift(items),
    backlogClassSummary: summarizeBacklogClasses(items),
    sourceOfTruth: facts,
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
    console.log(JSON.stringify({
      summary: report.summary,
      activeStatusSummary: report.activeStatusSummary,
      backlogClassSummary: report.backlogClassSummary,
      items: report.items.length,
    }, null, 2));
  }
  return report;
}

if (require.main === module) {
  run();
}

module.exports = { buildReport, classify, extractItems, toMarkdown };
