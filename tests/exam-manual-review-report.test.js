const manualReview = require("../scripts/report_exam_manual_review_sections.js");

describe("exam manual review sections report", () => {
  it("keeps locked sections actionable without promoting unknown source contracts", () => {
    const report = manualReview.buildReport();

    expect(report.reportVersion).toBe("exam-manual-review-sections-v1");
    expect(report.ready).toBe(true);
    expect(report.totals.manualReviewSections).toBe(4);
    expect(report.totals.promotionReady).toBe(0);
    expect(report.totals.requiredContractFields).toBe(6);
    expect(report.sections.map((section) => section.id)).toEqual([
      "section-04",
      "section-33",
      "section-50",
      "section-51",
    ]);
    report.sections.forEach((section) => {
      expect(section.lockedCorrectly).toBe(true);
      expect(section.noInventedCodeSurface).toBe(true);
      expect(section.closurePlan.canPromote).toBe(false);
      expect(section.closurePlan.missingEvidence).toHaveLength(6);
      expect(section.closurePlan.blockerEvidence).toContain(section.sectionText);
      expect(section.closurePlan.nextAction).toContain("docs/source-review.md");
      expect(section.closurePlan.promotionGate).toContain("sourceRefs remain traceable");
    });
  });
});
