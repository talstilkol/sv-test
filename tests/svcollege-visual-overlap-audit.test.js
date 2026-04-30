const { runAudit } = require("../scripts/report_svcollege_visual_overlap_audit.js");

describe("SVCollege visual overlap audit", () => {
  it("keeps learning chrome from overlapping the main content area", () => {
    const report = runAudit();
    expect(report.ready).toBe(true);
    expect(report.failures).toEqual([]);
    expect(report.checks).toBeGreaterThanOrEqual(7);
  });
});
