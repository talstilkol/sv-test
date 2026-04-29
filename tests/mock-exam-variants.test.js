const variants = require("../scripts/report_mock_exam_variants.js");

describe("SVCollege mock exam deterministic variants", () => {
  it("builds three full SVCollege mock variants with no blockers", () => {
    const report = variants.buildReport();
    expect(report.summary.passed).toBe(true);
    expect(report.summary.variants).toBe(3);
    expect(report.summary.blockers).toBe(0);
  });

  it("covers every SVCollege module in each variant", () => {
    const report = variants.buildReport();
    report.variants.forEach((variant) => {
      expect(variant.totalQuestions).toBe(55);
      expect(variant.uniqueQuestions).toBe(55);
      expect(variant.moduleCoverage.filter((item) => item.covered)).toHaveLength(report.moduleCount);
      expect(variant.missingModules).toHaveLength(0);
    });
  });
});
