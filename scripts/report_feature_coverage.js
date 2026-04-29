#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const distractorAudit = require("./audit_distractors.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const REPORT_DATE = "2026-04-28";
const JSON_REPORT_PATH = path.join(ROOT, "FEATURE_COVERAGE_REPORT.json");
const MD_REPORT_PATH = path.join(ROOT, "FEATURE_COVERAGE_REPORT.md");

const OUTCOME_METRICS = Object.freeze({
  antiPatterns: "Misconception repair coverage for hard concepts",
  warStories: "Real-world transfer coverage through production incident stories",
  miniBuilds: "Hands-on build-practice coverage for code-writing workflows",
  codeTrace: "Execution-prediction practice coverage",
  optionFeedback: "Option-specific remediation coverage across the full MC bank",
  metaphors: "Explanation-fit coverage through multiple metaphors per core concept",
  pathways: "Persona-based explanation coverage for grandma/parent/technical paths",
  pairMatch: "Associative retrieval practice coverage",
  bugQuests: "Narrative debugging practice coverage",
  mnemonics: "Memory-aid coverage for hard concepts",
  animations: "Visual mental-model coverage",
  comparisons: "Side-by-side distinction coverage for confusing concept pairs",
  whatIf: "Interactive counterfactual reasoning coverage",
  scenarios: "Themed scenario coverage across concept-context pairs",
  counterfactuals: "What-breaks-without-this reasoning coverage",
  conceptVideos: "Embedded concept clip coverage",
  grandmaVisuals: "Concrete visual-aid coverage for beginner explanations",
  conceptComics: "Visual story coverage for hard concepts",
  memoryPalaces: "Spatial memory-location coverage",
  problemFirst: "Problem-first discovery coverage",
  stageZero: "Beginner broken-example coverage",
  glossary: "Foundational terminology coverage",
  capstones: "Project-readiness coverage through full capstone briefs and rubrics",
  courseBlueprints: "Course and exam alignment coverage from public curriculum sources",
});

function createSandbox() {
  return { window: {}, console };
}

function loadDataFile(file, sandbox = createSandbox()) {
  const filePath = path.join(DATA_DIR, file);
  const code = fs.readFileSync(filePath, "utf8");
  vm.runInNewContext(code, sandbox, { filename: file });
  return sandbox;
}

function readDataValue(file, globalName) {
  const sandbox = loadDataFile(file);
  return sandbox[globalName] || sandbox.window[globalName];
}

function countObjectArrays(value) {
  return Object.values(value || {}).reduce((sum, item) => {
    if (!Array.isArray(item)) return sum;
    return sum + item.length;
  }, 0);
}

function countObjectKeys(value) {
  return Object.keys(value || {}).length;
}

function countScenarioEntries(value) {
  return Object.values(value || {}).reduce((sum, scenarios) => {
    if (!scenarios || typeof scenarios !== "object") return sum;
    return (
      sum +
      Object.values(scenarios).filter((scenario) => typeof scenario === "string" && scenario.trim()).length
    );
  }, 0);
}

function countCompletePathways(value) {
  return Object.values(value || {}).filter(
    (pathway) =>
      pathway &&
      typeof pathway.grandma === "string" &&
      pathway.grandma.trim() &&
      typeof pathway.parent === "string" &&
      pathway.parent.trim() &&
      typeof pathway.technical === "string" &&
      pathway.technical.trim(),
  ).length;
}

function countQuestBugs(quests) {
  return (Array.isArray(quests) ? quests : []).reduce((sum, quest) => {
    return sum + (Array.isArray(quest.bugs) ? quest.bugs.length : 0);
  }, 0);
}

function countPairs(games) {
  return (Array.isArray(games) ? games : []).reduce((sum, game) => {
    return sum + (Array.isArray(game.pairs) ? game.pairs.length : 0);
  }, 0);
}

function countVideoScenes(videos) {
  return Object.values(videos || {}).reduce((sum, video) => {
    return sum + (Array.isArray(video.scenes) ? video.scenes.length : 0);
  }, 0);
}

function countGlossaryEntries() {
  const sandbox = loadDataFile("glossary.js");
  return Object.keys(sandbox.window.GLOSSARY || {}).length;
}

function countCompleteCapstones(projects) {
  return (Array.isArray(projects) ? projects : []).filter((project) => {
    if (!project || typeof project.goal !== "string" || !project.goal.trim()) return false;
    return [
      project.conceptKeys,
      project.milestones,
      project.requirements,
      project.edgeCases,
      project.tests,
      project.reviewChecklist,
      project.deliverables,
    ].every((items) => Array.isArray(items) && items.length > 0);
  }).length;
}

function countCapstoneRubricItems(projects) {
  return (Array.isArray(projects) ? projects : []).reduce((sum, project) => {
    return (
      sum +
      (Array.isArray(project.requirements) ? project.requirements.length : 0) +
      (Array.isArray(project.edgeCases) ? project.edgeCases.length : 0) +
      (Array.isArray(project.tests) ? project.tests.length : 0) +
      (Array.isArray(project.reviewChecklist) ? project.reviewChecklist.length : 0)
    );
  }, 0);
}

function countCompleteCourseBlueprints(blueprints) {
  return (Array.isArray(blueprints) ? blueprints : []).filter((blueprint) => {
    return (
      blueprint &&
      typeof blueprint.provider === "string" &&
      blueprint.provider.trim() &&
      Array.isArray(blueprint.sources) &&
      blueprint.sources.length > 0 &&
      Array.isArray(blueprint.modules) &&
      blueprint.modules.length >= 5 &&
      Array.isArray(blueprint.mockExamTags) &&
      blueprint.mockExamTags.length > 0 &&
      Array.isArray(blueprint.capstoneLinks) &&
      blueprint.capstoneLinks.length > 0
    );
  }).length;
}

function pct(implemented, target) {
  if (!target) return 100;
  return Math.min(100, Math.round((implemented / target) * 1000) / 10);
}

function metric(id, label, implemented, target, unit, evidence, extra = {}) {
  const coverage = pct(implemented, target);
  const outcomeMetric = extra.outcomeMetric || OUTCOME_METRICS[id] || "";
  return {
    id,
    label,
    implemented,
    target,
    unit,
    coverage,
    status: implemented >= target ? "Done" : implemented > 0 ? "Partial" : "Missing",
    evidence,
    outcomeMetric,
    enforceStrict: extra.enforceStrict !== false,
    enforceEvidenceGate: extra.enforceEvidenceGate !== false,
    details: extra.details || {},
  };
}

function evidenceGateFailures(metrics) {
  return (Array.isArray(metrics) ? metrics : []).filter((item) => {
    if (!item || item.status !== "Done" || item.enforceEvidenceGate === false) return false;
    const hasEvidence = Array.isArray(item.evidence) && item.evidence.some((entry) => String(entry || "").trim());
    const hasOutcomeMetric = typeof item.outcomeMetric === "string" && item.outcomeMetric.trim();
    return !hasEvidence || !hasOutcomeMetric;
  });
}

function buildCoverage() {
  const antiPatterns = readDataValue("anti_patterns.js", "ANTI_PATTERNS");
  const warStories = readDataValue("war_stories.js", "WAR_STORIES");
  const builds = readDataValue("questions_build.js", "QUESTIONS_BUILD");
  const traces = readDataValue("questions_trace.js", "QUESTIONS_TRACE");
  const optionFeedback = readDataValue("option_feedback.js", "OPTION_FEEDBACK");
  const metaphors = readDataValue("metaphors.js", "CONCEPT_METAPHORS");
  const pathways = readDataValue("pathways.js", "CONCEPT_PATHWAYS");
  const pairMatch = readDataValue("pair_match.js", "PAIR_MATCH_GAMES");
  const bugQuests = readDataValue("bug_quests.js", "BUG_QUESTS");
  const animations = readDataValue("animations.js", "ANIMATIONS");
  const warComparisons = readDataValue("comparisons.js", "COMPARISONS");
  const whatIf = readDataValue("what_if.js", "WHAT_IF");
  const scenarios = readDataValue("scenarios.js", "CONCEPT_SCENARIOS");
  const counterfactuals = readDataValue("counterfactuals.js", "CONCEPT_COUNTERFACTUALS");
  const conceptVideos = readDataValue("concept_videos.js", "CONCEPT_VIDEOS");
  const conceptComics = readDataValue("concept_comics.js", "CONCEPT_COMICS");
  const memoryPalaces = readDataValue("memory_palaces.js", "MEMORY_PALACES");
  const problemFirst = readDataValue("problem_first.js", "PROBLEM_FIRST");
  const stageZero = readDataValue("stage_zero.js", "STAGE_ZERO");
  const mnemonics = readDataValue("mnemonics.js", "MNEMONICS");
  const grandmaVisuals = readDataValue("grandma_visuals.js", "GRANDMA_VISUALS");
  const capstones = readDataValue("capstones.js", "CAPSTONE_PROJECTS");
  const courseBlueprints = readDataValue("course_blueprints.js", "COURSE_BLUEPRINTS");
  const mcBank = distractorAudit.loadBanks();

  const optionFeedbackIds = Object.keys(optionFeedback || {});
  const mcIds = new Set(mcBank.map((question) => question && question.id).filter(Boolean));
  const optionFeedbackCoveredIds = new Set(optionFeedbackIds.filter((id) => mcIds.has(id)));
  let inlineOptionExplanations = 0;
  mcBank.forEach((question) => {
    if (
      question &&
      question.id &&
      Array.isArray(question.options) &&
      Array.isArray(question.optionFeedback) &&
      question.optionFeedback.length === question.options.length
    ) {
      optionFeedbackCoveredIds.add(question.id);
      inlineOptionExplanations += question.optionFeedback.length;
    }
  });
  const metrics = [
    metric("antiPatterns", "Anti-Pattern Gallery", countObjectArrays(antiPatterns), 22, "patterns", [
      "data/anti_patterns.js",
    ]),
    metric("warStories", "War Stories Library", countObjectArrays(warStories), 30, "incidents", [
      "data/war_stories.js",
    ]),
    metric("miniBuilds", "Mini Build", Array.isArray(builds) ? builds.length : 0, 21, "builds", [
      "data/questions_build.js",
    ]),
    metric("codeTrace", "Code Trace", Array.isArray(traces) ? traces.length : 0, 85, "traces", [
      "data/questions_trace.js",
    ]),
    metric(
      "optionFeedback",
      "Per-Distractor Feedback",
      optionFeedbackCoveredIds.size,
      mcBank.length,
      "MC questions",
      ["data/option_feedback.js", "data/questions_bank.js", "data/questions_bank_seeded.js"],
      {
        enforceStrict: false,
        details: {
          optionExplanations: Object.values(optionFeedback || {}).reduce(
            (sum, feedback) => sum + (Array.isArray(feedback) ? feedback.length : 0),
            0,
          ) + inlineOptionExplanations,
        },
      },
    ),
    metric("metaphors", "Concept Metaphors", countObjectArrays(metaphors), 250, "metaphors", [
      "data/metaphors.js",
    ]),
    metric("pathways", "3 Learning Pathways", countCompletePathways(pathways), 30, "complete concepts", [
      "data/pathways.js",
    ]),
    metric("pairMatch", "Pair-Match", Array.isArray(pairMatch) ? pairMatch.length : 0, 5, "games", [
      "data/pair_match.js",
    ], { details: { pairs: countPairs(pairMatch) } }),
    metric("bugQuests", "Bug Hunt Quests", countQuestBugs(bugQuests), 25, "bugs", [
      "data/bug_quests.js",
    ], { details: { quests: Array.isArray(bugQuests) ? bugQuests.length : 0 } }),
    metric("mnemonics", "Mnemonics Lab", countObjectKeys(mnemonics), 9, "concepts", [
      "data/mnemonics.js",
    ]),
    metric("animations", "Mental Model Animator", countObjectKeys(animations), 6, "concepts", [
      "data/animations.js",
    ]),
    metric("comparisons", "Side-by-Side Comparator", countObjectKeys(warComparisons), 10, "comparisons", [
      "data/comparisons.js",
    ]),
    metric("whatIf", "What-If Simulator", countObjectKeys(whatIf), 5, "concepts", [
      "data/what_if.js",
    ]),
    metric("scenarios", "Themed Scenarios", countScenarioEntries(scenarios), 150, "scenarios", [
      "data/scenarios.js",
    ]),
    metric("counterfactuals", "Counterfactuals", countObjectKeys(counterfactuals), 30, "concepts", [
      "data/counterfactuals.js",
    ]),
    metric("conceptVideos", "Animated Concept Clips", countObjectKeys(conceptVideos), 10, "clips", [
      "data/concept_videos.js",
    ], { details: { scenes: countVideoScenes(conceptVideos) } }),
    metric("grandmaVisuals", "Real-Object Visual Aids", Array.isArray(grandmaVisuals.aids) ? grandmaVisuals.aids.length : 0, 50, "aids", [
      "data/grandma_visuals.js",
    ]),
    metric("conceptComics", "Concept Comics", countObjectKeys(conceptComics), 8, "concepts", [
      "data/concept_comics.js",
    ]),
    metric("memoryPalaces", "Memory Palace", countObjectKeys(memoryPalaces), 8, "concepts", [
      "data/memory_palaces.js",
    ]),
    metric("problemFirst", "Problem-First Discovery", countObjectKeys(problemFirst), 8, "concepts", [
      "data/problem_first.js",
    ]),
    metric("stageZero", "Stage-Zero Broken Examples", countObjectKeys(stageZero), 8, "concepts", [
      "data/stage_zero.js",
    ]),
    metric("glossary", "Hebrew/English Glossary", countGlossaryEntries(), 200, "entries", [
      "data/glossary.js",
    ]),
    metric("capstones", "Capstone Project Track", countCompleteCapstones(capstones), 6, "projects", [
      "data/capstones.js",
    ], {
      details: {
        rubricItems: countCapstoneRubricItems(capstones),
        conceptLinks: (Array.isArray(capstones) ? capstones : []).reduce(
          (sum, project) => sum + (Array.isArray(project.conceptKeys) ? project.conceptKeys.length : 0),
          0,
        ),
      },
    }),
    metric("courseBlueprints", "SVCollege Course Blueprint Alignment", countCompleteCourseBlueprints(courseBlueprints), 1, "active blueprint", [
      "data/course_blueprints.js",
    ], {
      details: {
        modules: (Array.isArray(courseBlueprints) ? courseBlueprints : []).reduce(
          (sum, blueprint) => sum + (Array.isArray(blueprint.modules) ? blueprint.modules.length : 0),
          0,
        ),
        sources: (Array.isArray(courseBlueprints) ? courseBlueprints : []).reduce(
          (sum, blueprint) => sum + (Array.isArray(blueprint.sources) ? blueprint.sources.length : 0),
          0,
        ),
      },
    }),
  ];

  const evidenceFailures = evidenceGateFailures(metrics);
  const summary = {
    modules: metrics.length,
    done: metrics.filter((item) => item.status === "Done").length,
    partial: metrics.filter((item) => item.status === "Partial").length,
    missing: metrics.filter((item) => item.status === "Missing").length,
    strictFailures: metrics.filter((item) => item.enforceStrict && item.implemented < item.target).length,
    evidenceGateChecked: metrics.filter((item) => item.status === "Done" && item.enforceEvidenceGate !== false).length,
    evidenceGateFailures: evidenceFailures.length,
  };

  return {
    reportVersion: "feature-coverage-v2",
    date: REPORT_DATE,
    source: "repo",
    summary,
    evidenceGateFailures: evidenceFailures.map((item) => ({
      id: item.id,
      label: item.label,
      hasEvidence: Array.isArray(item.evidence) && item.evidence.length > 0,
      hasOutcomeMetric: Boolean(item.outcomeMetric),
    })),
    metrics,
  };
}

function formatCoverage(value) {
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
}

function buildMarkdown(report) {
  const lines = [
    "# Feature Coverage Report — 2026-04-28",
    "",
    "Generated from repository data files. The report is deterministic and does not use sampling or native randomness.",
    "",
    "## Summary",
    "",
    `- Modules tracked: ${report.summary.modules}`,
    `- Done: ${report.summary.done}`,
    `- Partial: ${report.summary.partial}`,
    `- Missing: ${report.summary.missing}`,
    `- Strict target failures: ${report.summary.strictFailures}`,
    `- Evidence gate checked: ${report.summary.evidenceGateChecked}`,
    `- Evidence gate failures: ${report.summary.evidenceGateFailures}`,
    "",
    "## Coverage",
    "",
    "| Module | Implemented | Target | Coverage | Status | Outcome metric | Evidence |",
    "|---|---:|---:|---:|---|---|---|",
  ];

  report.metrics.forEach((item) => {
    lines.push(
      `| ${item.label} | ${item.implemented} ${item.unit} | ${item.target} ${item.unit} | ${formatCoverage(item.coverage)} | ${item.status} | ${item.outcomeMetric || "MISSING"} | ${item.evidence.join("<br>")} |`,
    );
  });

  lines.push(
    "",
    "## Notes",
    "",
    "- Per-Distractor Feedback is intentionally reported against the full MC bank; Done means every loaded MC has option-specific feedback from either inline data or the curated feedback map.",
    "- Strict target failures ignore modules explicitly marked as non-strict because they are tracked as staged coverage work.",
    "- Evidence gate failures block Done modules that lack an outcome metric or repository evidence.",
    "- This report is the source of truth for content-module coverage counters in Phase 5.",
    "",
  );

  return `${lines.join("\n")}\n`;
}

function writeReports(report) {
  fs.writeFileSync(JSON_REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(MD_REPORT_PATH, buildMarkdown(report));
}

function run(argv = process.argv.slice(2)) {
  const report = buildCoverage();
  if (argv.includes("--write")) {
    writeReports(report);
  }

  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    process.stdout.write(buildMarkdown(report));
  }

  return report;
}

if (require.main === module) {
  const report = run();
  if (process.argv.includes("--strict") && (report.summary.strictFailures > 0 || report.summary.evidenceGateFailures > 0)) {
    const failed = report.metrics
      .filter((item) => item.enforceStrict && item.implemented < item.target)
      .map((item) => `${item.id}: ${item.implemented}/${item.target}`)
      .join(", ");
    const evidenceFailed = report.evidenceGateFailures
      .map((item) => `${item.id}: metric=${item.hasOutcomeMetric ? "yes" : "no"}, evidence=${item.hasEvidence ? "yes" : "no"}`)
      .join(", ");
    if (failed) console.error(`Feature coverage strict target failure: ${failed}`);
    if (evidenceFailed) console.error(`Feature evidence gate failure: ${evidenceFailed}`);
    process.exit(1);
  }
}

module.exports = {
  buildCoverage,
  buildMarkdown,
  countCompleteCapstones,
  countCompleteCourseBlueprints,
  countCompletePathways,
  countObjectArrays,
  countScenarioEntries,
  evidenceGateFailures,
  metric,
  run,
};
