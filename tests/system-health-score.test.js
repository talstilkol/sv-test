const systemHealth = require("../scripts/report_system_health_score.js");

describe("System health score", () => {
  it("includes runtime classification readiness as a critical gate", () => {
    const report = systemHealth.buildReport();

    expect(report.axes.critical).toHaveProperty("runtimeClassifiedReady");
    expect(report.axes.tests.detail).toMatch(/^\d+\/\d+$/);
    expect(report.axes.critical.runtimeClassifiedReady).toBe(true);
    expect(report.axes.runtimeCoverage.detail).toContain("classified=");
    expect(report.axes.runtimeCoverage.detail).toContain("audited=");
    expect(report.axes.runtimeCoverage.detail).toContain("executed=");
    expect(report.axes.runtimeCoverage.detail).toContain("runnable-js");
    expect(report.axes.critical).toHaveProperty("solutionGuideReady");
    expect(report.axes.critical.solutionGuideReady).toBe(true);
    expect(report.axes.solutionGuideCoverage.detail).toContain("sections=");
    expect(report.axes.solutionGuideCoverage.detail).toContain("codeBlocks=");
    expect(report.axes.solutionGuideCoverage.detail).toContain("drills=4 exams/4 js");
    expect(report.axes.distractorQuality.detail).toContain("examCriticalFlaggedPercent=");
    expect(report.axes.distractorQuality.detail).toContain("globalFlaggedPercent=");
  });
});
