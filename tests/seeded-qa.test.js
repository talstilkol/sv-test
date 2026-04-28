const seededQa = require("../scripts/audit_seeded_questions.js");

describe("Seeded question QA", () => {
  it("samples 170 seeded questions deterministically", () => {
    const bank = seededQa.loadSeededBank();
    const all = [...bank.mc, ...bank.fill];
    const first = seededQa.deterministicSample(all, 170).map((item) => item.id);
    const second = seededQa.deterministicSample(all, 170).map((item) => item.id);

    expect(first).toEqual(second);
    expect(first).toHaveLength(170);
  });

  it("finds no blocker-level issues in the seeded QA sample", () => {
    const bank = seededQa.loadSeededBank();
    const all = [...bank.mc, ...bank.fill];
    const audits = seededQa.deterministicSample(all, 170).map((item) => ({
      item,
      issues: seededQa.auditSeededItem(item),
    }));
    const summary = seededQa.summarize(audits);

    expect(summary.total).toBe(170);
    expect(summary.blocker).toBe(0);
  });

  it("detects malformed fill questions as blockers", () => {
    const issues = seededQa.auditFill({
      id: "bad_fill",
      conceptKey: "lesson_11::Array",
      code: "const x = 1;",
      answer: "const",
      explanation: "Missing blank.",
      _seeded: true,
    });

    expect(issues.some((issue) => issue.code === "blank-count")).toBe(true);
  });
});
