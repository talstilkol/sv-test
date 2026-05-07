const postGreen = require("../scripts/report_post_green_hardening_progress.js");

describe("post-green hardening progress report", () => {
  it("builds a live progress board for residual non-blocking debt", () => {
    const report = postGreen.buildReport({ generatedAt: "2026-05-06T14:49:00.000Z" });

    expect(report.reportVersion).toBe("post-green-hardening-v1");
    expect(report.strictReady).toBe(false);
    expect(report.ready).toBe(false);
    expect(report.summary.closedTasks).toBe(7);
    expect(report.summary.totalTasks).toBe(8);
    expect(report.summary.taskPercent).toBe("87.5%");
    expect(report.summary.timePercent).toBe("94.4%");
    expect(report.summary.remainingLabel).toBe("1 שעות");
    expect(report.questionRollup.queuedIssues).toBe(13);
    expect(report.questionRollup.noteQueue).toBe(13);
    expect(report.distractorRollup.deferredQueue).toBe(58);
    expect(report.distractorRollup.actionableQueue).toBe(7);
    expect(report.backlogRollup.realOpen).toBe(8);
  });

  it("formats percent and time labels deterministically", () => {
    expect(postGreen.pct(5, 8)).toBe("62.5%");
    expect(postGreen.hoursLabel(14)).toBe("14 שעות");
    expect(postGreen.hoursLabel(0.5)).toBe("30 דק׳");
  });
});
