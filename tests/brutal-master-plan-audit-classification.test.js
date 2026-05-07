const audit = require("../scripts/report_brutal_master_plan_audit.js");

function findItem(report, fragment) {
  return report.items.find((item) => item.text.includes(fragment));
}

describe("brutal master plan backlog classification", () => {
  it("keeps the post-green real-open backlog under the first hardening slice target", () => {
    const report = audit.buildReport();

    expect(report.backlogClassSummary["real-open"]).toBeLessThanOrEqual(15);
    expect(report.backlogClassSummary["real-open"]).toBe(8);
  });

  it("only closes stale open items when current live evidence exists", () => {
    const report = audit.buildReport();

    expect(findItem(report, "MANUAL_QUESTION_AUTHORING_PLAN.md").backlogClass).toBe("done-with-evidence");
    expect(findItem(report, "data-originated HTML").backlogClass).toBe("done-with-evidence");
    expect(findItem(report, "Shared core/ with web").backlogClass).toBe("not-relevant");
    expect(findItem(report, "`optionFeedback` מלא").backlogClass).toBe("done-with-evidence");
    expect(findItem(report, "interfaces של lesson/concept/question/score").backlogClass).toBe("done-with-evidence");
    expect(findItem(report, "לפרק `app.js` למודולים קטנים").backlogClass).toBe("real-open");
  });
});
