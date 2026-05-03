const coverageTargets = require("../scripts/report_question_coverage_targets.js");

describe("question coverage targets", () => {
  it("builds a deterministic manual-only coverage report", () => {
    const first = coverageTargets.buildReport();
    const second = coverageTargets.buildReport();

    expect(first).toEqual(second);
    expect(first.policy.noFakeData).toBe(true);
    expect(first.policy.deterministic).toBe(true);
    expect(first.policy.manualOnly).toBe(true);
    expect(first.policy.seededCountsForReadiness).toBe(false);
    expect(first.policy.ignoredArchives).toContain("data/questions_bank_seeded.js");
    expect(first.sourceMix.ignoredGeneratedMC).toBe(0);
    expect(first.sourceMix.ignoredGeneratedFill).toBe(0);
  });

  it("reports manual MC and Fill coverage state", () => {
    const report = coverageTargets.buildReport();

    expect(report.summary.totalConcepts).toBeGreaterThan(0);
    expect(report.summary.mcGapCount).toBeGreaterThanOrEqual(0);
    expect(report.summary.fillGapCount).toBeGreaterThanOrEqual(0);
    expect(report.summary.mcReadyConcepts).toBeLessThanOrEqual(report.summary.totalConcepts);
    expect(report.summary.fillReadyConcepts).toBeLessThanOrEqual(report.summary.codeExampleConcepts);
    expect(report.summary.ready).toBe(
      report.summary.mcGapCount === 0 && report.summary.fillGapCount === 0,
    );
  });

  it("keeps generated archives disconnected from readiness", () => {
    const report = coverageTargets.buildReport();
    const markdown = coverageTargets.toMarkdown(report);

    expect(report.summary.handCuratedMcPromotionBacklog).toBeGreaterThanOrEqual(0);
    expect(markdown).toContain("Hand-curated promotion backlog");
    expect(markdown).toContain("Generated/seeded archives are ignored");
  });
});
