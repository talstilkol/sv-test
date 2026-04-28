const {
  actionFor,
  buildRemediationPlan,
  buildRemediationQueue,
} = require("../scripts/build_question_remediation_queue.js");

describe("question remediation queue", () => {
  it("maps known warning codes to concrete remediation actions", () => {
    expect(actionFor({ code: "near-duplicate" })).toBe("rewrite-distractor");
    expect(actionFor({ code: "length-cue" })).toBe("balance-option-lengths");
    expect(actionFor({ code: "answer-visible" })).toBe("review-fill-leakage");
  });

  it("builds a deterministic manual-review queue without auto rewrites", () => {
    const first = buildRemediationQueue();
    const second = buildRemediationQueue();

    expect(first.map((item) => item.id)).toEqual(second.map((item) => item.id));
    expect(first.length).toBeGreaterThan(0);
    expect(first.every((item) => item.reviewStatus === "pending-manual-review")).toBe(true);
    expect(first.every((item) => item.guidance && item.guidance.length > 20)).toBe(true);
  });

  it("summarizes the generated queue for governance reporting", () => {
    const plan = buildRemediationPlan();

    expect(plan.policy.deterministic).toBe(true);
    expect(plan.policy.autoRewrite).toBe(false);
    expect(plan.summary.total).toBe(plan.queue.length);
    expect(plan.summary.batches).toBe(Math.ceil(plan.queue.length / plan.policy.batchSize));
  });
});
