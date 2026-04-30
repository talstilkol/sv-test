const perfBudget = require("../scripts/report_performance_budget.js");

describe("performance budget", () => {
  it("keeps the initial shell budgeted and manual-question policy enforced", () => {
    const report = perfBudget.buildReport();
    expect(report.reportVersion).toBe("performance-budget-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.summary.failed).toBe(0);
    expect(report.checks.map((check) => check.id)).toContain("manual-bank-only");
    expect(report.checks.map((check) => check.id)).toContain("lazy-render-hooks");
    expect(report.checks.map((check) => check.id)).toContain("offline-cache-budget");
    expect(report.checks.map((check) => check.id)).toContain("mobile-cpu-budget");
  });
});
