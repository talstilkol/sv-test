const questionQuality = require("../scripts/report_question_quality.js");

describe("Question quality report", () => {
  it("creates deterministic questionQuality objects for the full MC/Fill bank", () => {
    const first = questionQuality.buildQuestionQualityReport();
    const second = questionQuality.buildQuestionQualityReport();

    expect(first).toEqual(second);
    expect(first.reportVersion).toBe("question-quality-v1");
    expect(first.summary.total).toBe(409);
    expect(first.summary.manual).toBe(409);
    expect(Object.keys(first.questionQuality)).toHaveLength(first.summary.total);
  });

  it("keeps blocker-level issues out of the current full bank", () => {
    const report = questionQuality.buildQuestionQualityReport();

    expect(report.summary.blockerIssues).toBe(0);
    expect(report.summary.blockerQuestions).toBe(0);
    expect(report.summary.questionQualityIndex).toBeGreaterThanOrEqual(88);
  });

  it("detects duplicate MC options as blockers", () => {
    const issues = questionQuality.auditMc({
      id: "bad_mc",
      kind: "mc",
      source: "curated",
      conceptKey: "lesson_11::Array",
      question: "מה נכון?",
      options: ["map", "filter", "map", "reduce"],
      correctIndex: 0,
      explanation: "map נכון.",
    });

    expect(issues.some((issue) => issue.code === "duplicate-option")).toBe(true);
  });

  it("detects ambiguous Fill questions as blockers", () => {
    const issues = questionQuality.auditFill({
      id: "bad_fill",
      kind: "fill",
      source: "curated",
      conceptKey: "lesson_11::Array",
      code: "const value = 1;",
      answer: "value",
      explanation: "Missing blank.",
    });

    expect(issues.some((issue) => issue.code === "blank-count")).toBe(true);
  });
});
