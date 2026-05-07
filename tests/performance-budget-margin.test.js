const performanceBudget = require("../scripts/report_performance_budget.js");

describe("Performance budget margin report", () => {
  it("keeps release budgets separate from stricter margin targets", () => {
    const report = performanceBudget.buildReport();

    expect(report.summary.ready).toBe(true);
    expect(report.summary.marginChecks).toBe(3);
    expect(Array.isArray(report.marginChecks)).toBe(true);
    expect(report.marginChecks.map((check) => check.id)).toEqual([
      "margin-index-html",
      "margin-app-js",
      "margin-style-css",
    ]);
    expect(report.marginChecks.every((check) => Number.isFinite(check.deltaBytes))).toBe(true);
  });
});
