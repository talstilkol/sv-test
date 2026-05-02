const pwaOfflineSmoke = require("../scripts/report_svcollege_pwa_offline_smoke.js");

describe("SVCollege PWA offline smoke", () => {
  it("builds a deterministic offline readiness report", () => {
    const first = pwaOfflineSmoke.buildReport();
    const second = pwaOfflineSmoke.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("svcollege-pwa-offline-smoke-v1");
    expect(first.summary.assets).toBeGreaterThan(150);
    expect(first.summary.strategyChecks).toBeGreaterThanOrEqual(13);
  });

  it("keeps the core SVCollege offline shell fully precached", () => {
    const report = pwaOfflineSmoke.buildReport();

    expect(report.summary.ready).toBe(true);
    expect(report.summary.failedAssets).toBe(0);
    expect(report.summary.failedStrategyChecks).toBe(0);
    report.assetResults.forEach((asset) => {
      expect(asset.passed).toBe(true);
      expect(asset.inPrecache).toBe(true);
      expect(asset.exists).toBe(true);
    });
  });

  it("covers the current module imports and versioned browser assets", () => {
    const assets = pwaOfflineSmoke.buildReport().assetResults.map((asset) => asset.asset);

    expect(assets).toEqual(expect.arrayContaining([
      "/style.css?v=concept-sprint-v69",
      "/app.js?v=top-bar-perf-v103",
      "/src/main.js?v=core-bootstrap-v2",
      "/src/core/question-prerequisites.js?v=question-prereq-v2",
      "/src/core/outcome-loop.js",
      "/src/core/bug-agent.js",
      "/data/level100_release_gates.js?v=level100-gate-v1",
      "/src/core/concept-tags.js",
      "/data/questions_bank.js",
      "/data/svcollege_questions_ai_engineering.js",
      "/data/svcollege_traces_design_systems.js",
      "/data/svcollege_builds_bridge.js",
      "/data/svcollege_prerequisites_devops.js",
      "/data/war_stories.js",
      "/data/comparisons.js",
      "/data/prerequisites.js",
      "/data/metaphors.js",
      "/data/pathways.js",
      "/data/scenarios.js",
      "/data/counterfactuals.js",
      "/data/pair_match.js",
      "/data/bug_quests.js",
    ]));
  });
});
