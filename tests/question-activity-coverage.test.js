const activityCoverage = require("../scripts/report_question_activity_coverage.js");

describe("question activity coverage report", () => {
  it("quantifies Trace/Build/Bug gaps without marking them complete", () => {
    const report = activityCoverage.buildReport();

    expect(report.reportVersion).toBe("question-activity-coverage-v1");
    expect(report.policy.noFakeData).toBe(true);
    expect(report.summary.concepts).toBeGreaterThan(0);
    expect(report.summary.relevantConcepts).toBeGreaterThan(0);
    expect(report.summary.activityReadyConcepts).toBeGreaterThan(0);
    expect(report.summary.activityGapCount).toBeGreaterThan(0);
    expect(report.summary.ready).toBe(false);
    expect(report.gaps.length).toBe(report.summary.activityGapCount);
  });
});
