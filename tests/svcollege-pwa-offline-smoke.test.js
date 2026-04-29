const pwaOfflineSmoke = require("../scripts/report_svcollege_pwa_offline_smoke.js");

describe("SVCollege PWA offline smoke", () => {
  it("builds a deterministic offline readiness report", () => {
    const first = pwaOfflineSmoke.buildReport();
    const second = pwaOfflineSmoke.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("svcollege-pwa-offline-smoke-v1");
    expect(first.summary.assets).toBeGreaterThan(40);
    expect(first.summary.strategyChecks).toBeGreaterThanOrEqual(10);
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
      "/style.css?v=concept-sprint-v2",
      "/app.js?v=concept-sprint-v2",
      "/src/main.js?v=core-bootstrap-v2",
      "/src/core/question-prerequisites.js?v=question-prereq-v2",
      "/src/core/outcome-loop.js",
      "/src/core/concept-tags.js",
      "/data/svcollege_questions_ai_engineering.js",
      "/data/svcollege_traces_design_systems.js",
      "/data/svcollege_builds_bridge.js",
      "/data/svcollege_prerequisites_devops.js",
    ]));
  });
});
