const fs = require("fs");
const path = require("path");
const weeklyStatus = require("../scripts/report_weekly_portal_status.js");

const ROOT = path.resolve(__dirname, "..");

describe("weekly portal status report", () => {
  it("builds from live local reports and keeps regressions separate from quality debt", () => {
    const report = weeklyStatus.buildReport({ now: new Date("2026-05-06T14:25:00.000Z") });

    expect(report.reportVersion).toBe("weekly-portal-status-v1");
    expect(report.summary.portalGates).toBe("31/31");
    expect(report.summary.portalScore).toBe(100);
    expect(report.summary.regressions).toBe(0);
    expect(report.regressions).toEqual([]);
    expect(report.qualityDebt.length).toBeGreaterThan(0);
    expect(report.remaining.closedTasks).toBe("11/11");
    expect(report.remaining.activeTask).toBe("אין");
  });

  it("parses the forward board completion metrics from the real task board", () => {
    const board = fs.readFileSync(path.join(ROOT, "FORWARD_TASK_BOARD.md"), "utf8");
    const metrics = weeklyStatus.parseForwardBoardMetrics(board);

    expect(metrics.taskPercent).toBe("100%");
    expect(metrics.timePercent).toBe("100%");
    expect(metrics.remainingTime).toBe("0 דק׳");
  });
});
