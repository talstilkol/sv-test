const audit = require("../scripts/audit_distractors.js");

describe("Distractor audit", () => {
  it("selects the same deterministic 50-question sample every time", () => {
    const all = audit.loadBanks();
    const first = audit.deterministicSample(all, 50).map((q) => q.id);
    const second = audit.deterministicSample(all, 50).map((q) => q.id);

    expect(first).toEqual(second);
    expect(first).toHaveLength(50);
  });

  it("finds no blocker-level issues in the deterministic audit sample", () => {
    const all = audit.loadBanks();
    const sample = audit.deterministicSample(all, 50);
    const audits = sample.map((question) => ({
      question,
      issues: audit.auditQuestion(question),
    }));
    const summary = audit.summarize(audits);

    expect(summary.total).toBe(50);
    expect(summary.blocker).toBe(0);
  });

  it("detects duplicate options as an objective blocker", () => {
    const issues = audit.auditQuestion({
      id: "duplicate_demo",
      question: "מה נכון?",
      options: ["A", "B", "A", "C"],
      correctIndex: 0,
      explanation: "A נכון.",
    });

    expect(issues.some((issue) => issue.code === "duplicate-option")).toBe(true);
  });
});
