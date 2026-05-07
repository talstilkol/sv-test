const solutionGuideCoverage = require("../scripts/report_solution_guide_coverage.js");

describe("SVCollege solution guide coverage", () => {
  it("accounts for the large solution guide as a covered reference source", () => {
    const report = solutionGuideCoverage.buildReport();

    expect(report.ready).toBe(true);
    expect(report.summary.sectionsPresent).toBe(report.summary.sectionsTotal);
    expect(report.summary.topicsPresent).toBe(report.summary.topicsTotal);
    expect(report.summary.codeBlocks).toBeGreaterThanOrEqual(90);
    expect(report.summary.detailsBlocks).toBeGreaterThanOrEqual(30);
    expect(report.summary.topHeadings).toEqual(expect.arrayContaining([
      expect.stringContaining("מבחן 1"),
      expect.stringContaining("מבחן 2"),
      expect.stringContaining("מבחן 3"),
      expect.stringContaining("מבחן 4"),
      expect.stringContaining("שאלות JS"),
    ]));
    expect(report.coveragePolicy).toContain("לא מוסיפים ממנה תוכן חדש בלי פירוק ידני");
  });
});
