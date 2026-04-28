const {
  BASE_CHECKS,
  FILL_CHECKS,
  MC_CHECKS,
  assertStrict,
  buildChecklist,
  deterministicSample,
} = require("../scripts/build_question_qa_checklist.js");

describe("question QA checklist", () => {
  it("selects exactly ten percent of questions with a deterministic order", () => {
    const checklist = buildChecklist();
    const expectedSize = Math.ceil(checklist.summary.totalQuestions * checklist.policy.sampleRatio);

    expect(checklist.summary.sampleSize).toBe(expectedSize);
    expect(checklist.sample.length).toBe(expectedSize);
    expect(deterministicSample(checklist.sample, 1).map((item) => item.id)).toEqual(
      deterministicSample(checklist.sample, 1).map((item) => item.id),
    );
  });

  it("attaches the right manual checks for MC and Fill rows", () => {
    const checklist = buildChecklist();
    const mc = checklist.sample.find((item) => item.kind === "mc");
    const fill = checklist.sample.find((item) => item.kind === "fill");

    expect(mc.checks).toEqual(expect.arrayContaining([...BASE_CHECKS, ...MC_CHECKS]));
    expect(fill.checks).toEqual(expect.arrayContaining([...BASE_CHECKS, ...FILL_CHECKS]));
  });

  it("passes strict uniqueness and sample-size validation", () => {
    const checklist = buildChecklist();
    expect(() => assertStrict(checklist)).not.toThrow();
  });
});
