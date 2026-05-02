const curriculumCoverage = require("../scripts/report_curriculum_coverage.js");

describe("curriculum coverage report", () => {
  it("aggregates curriculum readiness across coverage and activity reports", () => {
    const report = curriculumCoverage.buildReport({ batchSize: 12 });

    expect(report.reportVersion).toBe("curriculum-coverage-v1");
    expect(report.summary.totalConcepts).toBeGreaterThan(0);
    expect(Array.isArray(report.gaps)).toBe(true);
    expect(report.summary.gapCount).toBeGreaterThanOrEqual(0);
    expect(report.summary.nextBatchCount).toBe(report.nextBatch.length);
    expect(report.summary.nextBatchCount).toBeGreaterThan(0);
    expect(report.summary.nextActionNeeds).toHaveProperty("mc");
    expect(report.summary.nextActionNeeds).toHaveProperty("fill");
    expect(report.summary.nextActionNeeds).toHaveProperty("activity");
    expect(report.nextBatch.length).toBeLessThanOrEqual(12);

    const first = report.nextBatch[0];
    expect(typeof first?.key).toBe("string");
    expect(first?.key.length).toBeGreaterThan(0);
    expect(Array.isArray(first.requiredActions)).toBe(true);
  });
});
