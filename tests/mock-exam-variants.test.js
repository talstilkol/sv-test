const variants = require("../scripts/report_mock_exam_variants.js");

describe("SVCollege mock exam deterministic variants", () => {
  it("builds three deterministic SVCollege mock variants without manual-question blockers", () => {
    const report = variants.buildReport();
    expect(report.summary.passed).toBe(true);
    expect(report.summary.variants).toBe(3);
    expect(report.summary.blockers).toBe(0);
  });

  it("covers every SVCollege module after the manual blocker authoring batch", () => {
    const report = variants.buildReport();
    report.variants.forEach((variant) => {
      expect(variant.totalQuestions).toBe(55);
      expect(variant.uniqueQuestions).toBe(55);
      expect(variant.moduleCoverage.filter((item) => item.covered)).toHaveLength(15);
      expect(variant.missingModules).toEqual([]);
    });
  });
});
