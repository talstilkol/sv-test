const accessibilityAudit = require("../scripts/report_exam_accessibility_audit.js");

describe("exam accessibility audit", () => {
  it("covers tree navigation, modals, store, XP panel and mock exam accessibility", () => {
    const report = accessibilityAudit.buildReport();
    expect(report.reportVersion).toBe("exam-accessibility-audit-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.summary.failed).toBe(0);
    expect(report.checks.map((check) => check.id)).toEqual([
      "tree-navigation",
      "modal-dialogs",
      "store-accessibility",
      "xp-panel-accessibility",
      "mock-exam-accessibility",
      "focus-and-motion-css",
      "screen-reader-pass",
    ]);
  });
});
