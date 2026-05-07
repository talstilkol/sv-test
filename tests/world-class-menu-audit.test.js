const menuAudit = require("../scripts/report_world_class_menu_audit.js");

describe("world-class menu audit", () => {
  it("scores the closed Exam100 route as release-ready while keeping polish tasks visible", () => {
    const report = menuAudit.buildReport();

    expect(report.reportVersion).toBe("world-class-menu-audit-v1");
    expect(report.ready).toBe(true);
    expect(report.score).toBeGreaterThanOrEqual(95);
    expect(report.summary.blockers).toBe(0);
    expect(report.checks.map((check) => check.id)).toEqual(expect.arrayContaining([
      "default-exam-focus-mode",
      "closed-mode-only-exam100",
      "two-arrow-navigation",
      "progress-map-visible",
      "primary-task-board-progress",
      "advanced-library-hidden",
      "release-gated-menu",
    ]));
    expect(report.advisoryTasks.length).toBeGreaterThanOrEqual(5);
    expect(report.masterPlan.totalTime).toBe("10 שעות 15 דק׳");
  });

  it("renders the master plan as a readable markdown artifact", () => {
    const markdown = menuAudit.toMarkdown(menuAudit.buildReport());

    expect(markdown).toContain("# World-Class User Menu Audit");
    expect(markdown).toContain("Remaining Tasks");
    expect(markdown).toContain("Master Plan");
    expect(markdown).toContain("חצים בלבד");
  });
});
