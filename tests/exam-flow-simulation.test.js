const flows = require("../scripts/simulate_exam_learning_flows.js");

describe("exam flow simulation", () => {
  it("keeps a clean learner profile from seeing repeats in the first 100 answers", () => {
    const report = flows.buildReport();
    expect(report.noRepeat.passed).toBe(true);
    expect(report.noRepeat.answered).toBe(100);
    expect(report.noRepeat.duplicateCount).toBe(0);
  });

  it("escalates correct answers to a harder same-concept question when available", () => {
    const report = flows.buildReport();
    expect(report.harderAfterCorrect.passed).toBe(true);
    expect(report.harderAfterCorrect.checked).toBeGreaterThan(100);
    expect(report.harderAfterCorrect.failureCount).toBe(0);
  });

  it("keeps wrong-answer repair wired to weakness, explanation, association, and recovery", () => {
    const report = flows.buildReport();
    expect(report.wrongAnswerRepair.passed).toBe(true);
    expect(report.wrongAnswerRepair.checked).toBeGreaterThan(100);
    expect(report.wrongAnswerRepair.hookFailures).toEqual([]);
    expect(report.wrongAnswerRepair.failureCount).toBe(0);
  });
});
