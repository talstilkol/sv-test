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

  it("exposes the true manual MC and Fill coverage gaps", () => {
    const report = coverageTargets.buildReport();

    expect(report.summary.ready).toBe(false);
    expect(report.summary.totalConcepts).toBeGreaterThan(0);
    expect(report.summary.mcGapCount).toBeGreaterThan(0);
    expect(report.summary.fillGapCount).toBeGreaterThan(0);
    expect(report.summary.mcReadyConcepts).toBeLessThan(report.summary.totalConcepts);
    expect(report.summary.fillReadyConcepts).toBeLessThan(report.summary.codeExampleConcepts);
  });

  it("keeps generated archives disconnected from readiness", () => {
    const report = coverageTargets.buildReport();
    const markdown = coverageTargets.toMarkdown(report);

    expect(report.summary.handCuratedMcPromotionBacklog).toBeGreaterThan(0);
    expect(markdown).toContain("Hand-curated promotion backlog");
    expect(markdown).toContain("Generated/seeded archives are ignored");
  });
});
