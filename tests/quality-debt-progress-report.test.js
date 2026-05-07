const qualityDebt = require("../scripts/report_quality_debt_progress.js");

describe("quality debt progress report", () => {
  it("computes phase progress from live reports", () => {
    const report = qualityDebt.buildReport({ generatedAt: "2026-05-06T14:30:00.000Z" });

    expect(report.reportVersion).toBe("quality-debt-progress-v1");
    expect(report.summary.closedTasks).toBe(9);
    expect(report.summary.totalTasks).toBe(9);
    expect(report.summary.taskPercent).toBe("100%");
    expect(report.summary.timePercent).toBe("100%");
    expect(report.summary.remainingLabel).toBe("0 דק׳");
    expect(report.metrics.portalGates).toBe("31/31");
    expect(report.metrics.weeklyRegressions).toBe(0);
    expect(report.metrics.manualReviewReady).toBe(true);
  });

  it("formats fractional hour estimates as Hebrew hour/minute labels", () => {
    expect(qualityDebt.hoursLabel(0.5)).toBe("30 דק׳");
    expect(qualityDebt.hoursLabel(22.5)).toBe("22 שעות 30 דק׳");
  });
});
