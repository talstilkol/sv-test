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
      "/style.css?v=homework-exam-mode-v19",
      "/app.js?v=homework-exam-mode-v6",
      "/src/main.js?v=core-bootstrap-v2",
      "/src/boot/file-protocol-guard.js?v=file-protocol-guard-v1",
      "/src/boot/module-bootstrap-loader.js?v=module-bootstrap-loader-v1",
      "/src/core/cluster-engine.js?v=cluster-engine-v1",
      "/src/core/question-prerequisites.js?v=question-prereq-v2",
      "/src/core/outcome-loop.js",
      "/src/core/bug-agent.js",
      "/src/views/exam100-path-core.js?v=exam100-path-core-v1",
      "/src/views/homework-exam-mode-view.js?v=homework-exam-mode-view-v18",
      "/data/level100_release_gates.js?v=level100-gate-v1",
      "/data/exam_tasks_tree.js?v=exam-tasks-tree-v1",
      "/data/homework_exam_mode.js?v=homework-exam-mode-v6",
      "/src/core/concept-tags.js",
      "/data/questions_bank.js",
      "/data/svcollege_questions_ai_engineering.js",
      "/data/svcollege_traces_design_systems.js",
      "/data/svcollege_builds_bridge.js",
      "/data/svcollege_prerequisites_devops.js",
      "/data/war_stories.js",
      "/data/comparisons.js?v=exam-comparisons-v1",
      "/data/exam_practice_extras.js?v=exam-practice-extras-v1",
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
