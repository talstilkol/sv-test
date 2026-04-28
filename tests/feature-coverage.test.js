const featureCoverage = require("../scripts/report_feature_coverage.js");

describe("Feature coverage report", () => {
  it("builds deterministic coverage counters from repository data files", () => {
    const first = featureCoverage.buildCoverage();
    const second = featureCoverage.buildCoverage();

    expect(first).toEqual(second);
    expect(first.reportVersion).toBe("feature-coverage-v2");
    expect(first.summary.modules).toBeGreaterThan(15);
    expect(first.summary.evidenceGateFailures).toBe(0);
  });

  it("reports completed content modules against their measured targets", () => {
    const report = featureCoverage.buildCoverage();
    const byId = Object.fromEntries(report.metrics.map((item) => [item.id, item]));

    expect(byId.antiPatterns.implemented).toBe(22);
    expect(byId.antiPatterns.target).toBe(22);
    expect(byId.antiPatterns.status).toBe("Done");

    expect(byId.warStories.implemented).toBe(31);
    expect(byId.miniBuilds.implemented).toBe(23);
    expect(byId.codeTrace.implemented).toBe(89);
    expect(byId.capstones.implemented).toBe(6);
    expect(byId.capstones.target).toBe(6);
    expect(byId.capstones.status).toBe("Done");
    expect(byId.capstones.details.rubricItems).toBeGreaterThanOrEqual(100);

    expect(byId.courseBlueprints.implemented).toBe(1);
    expect(byId.courseBlueprints.target).toBe(1);
    expect(byId.courseBlueprints.status).toBe("Done");
    expect(byId.courseBlueprints.details.modules).toBe(15);
  });

  it("keeps full-bank distractor feedback marked partial until all MC questions are covered", () => {
    const report = featureCoverage.buildCoverage();
    const optionFeedback = report.metrics.find((item) => item.id === "optionFeedback");

    expect(optionFeedback.implemented).toBe(50);
    expect(optionFeedback.target).toBeGreaterThan(optionFeedback.implemented);
    expect(optionFeedback.details.optionExplanations).toBe(200);
    expect(optionFeedback.status).toBe("Partial");
    expect(optionFeedback.enforceStrict).toBe(false);
  });

  it("renders the machine-readable counters as a markdown report", () => {
    const report = featureCoverage.buildCoverage();
    const markdown = featureCoverage.buildMarkdown(report);

    expect(markdown).toContain("Feature Coverage Report");
    expect(markdown).toContain("Evidence gate failures: 0");
    expect(markdown).toContain("Per-Distractor Feedback");
    expect(markdown).toContain("Partial");
  });

  it("fails the evidence gate when a Done module has no explicit outcome metric", () => {
    const missingMetric = featureCoverage.metric("newFeatureWithoutMetric", "New Feature", 1, 1, "items", [
      "data/new_feature.js",
    ]);
    const partialMissingMetric = featureCoverage.metric("partialWithoutMetric", "Partial Feature", 1, 2, "items", [
      "data/partial_feature.js",
    ]);

    expect(featureCoverage.evidenceGateFailures([missingMetric])).toHaveLength(1);
    expect(featureCoverage.evidenceGateFailures([partialMissingMetric])).toHaveLength(0);
  });
});
