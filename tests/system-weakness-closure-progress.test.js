const closure = require("../scripts/report_system_weakness_closure_progress.js");

describe("system weakness closure progress report", () => {
  it("tracks the next slice after post-green hardening", () => {
    const report = closure.buildReport({ generatedAt: "2026-05-06T15:15:00.000Z" });

    expect(report.reportVersion).toBe("system-weakness-closure-v1");
    expect(report.strictReady).toBe(true);
    expect(report.ready).toBe(true);
    expect(report.summary.closedTasks).toBe(8);
    expect(report.summary.totalTasks).toBe(8);
    expect(report.summary.taskPercent).toBe("100%");
    expect(report.summary.timePercent).toBe("100%");
    expect(report.summary.remainingLabel).toBe("0 דק׳");
    expect(report.question.total).toBe(13);
    expect(report.distractor.deferred).toBe(58);
    expect(report.backlog.realOpen).toBe(8);
    expect(report.releaseInventory.unknownPaths).toBe(0);
  });

  it("formats percent and time labels deterministically", () => {
    expect(closure.pct(4.5, 18.5)).toBe("24.3%");
    expect(closure.hoursLabel(14)).toBe("14 שעות");
    expect(closure.hoursLabel(0.5)).toBe("30 דק׳");
  });
});
