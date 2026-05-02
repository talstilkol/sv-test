const fs = require("fs");
const path = require("path");

const authoringPlan = require("../scripts/report_manual_question_authoring_plan.js");
const coverageTargets = require("../scripts/report_question_coverage_targets.js");
const activityCoverage = require("../scripts/report_question_activity_coverage.js");

const ROOT = path.resolve(__dirname, "..");

describe("manual question authoring plan", () => {
  it("covers every current manual coverage gap without generating questions", () => {
    const coverage = coverageTargets.buildReport();
    const report = authoringPlan.buildReport();

    expect(report.reportVersion).toBe("manual-question-authoring-plan-v1");
    expect(report.policy.manualOnly).toBe(true);
    expect(report.policy.generatesQuestions).toBe(false);
    expect(report.policy.noFakeData).toBe(true);
    expect(report.summary.readyForAuthoring).toBe(true);
    expect(report.summary.mcGapCount).toBe(coverage.summary.mcGapCount);
    expect(report.summary.fillGapCount).toBe(coverage.summary.fillGapCount);
    expect(report.summary.activityGapCount).toBe(activityCoverage.buildReport().summary.activityGapCount);
    expect(report.summary.batches).toBeGreaterThan(0);
    expect(report.summary.strictActivityDeficit).toBe(report.summary.activityGapCount);
  });

  it("keeps owner and reviewer unknown until real assignment exists", () => {
    const report = authoringPlan.buildReport();

    report.batches.forEach((batch) => {
      expect(batch.owner).toBe("unknown/unavailable");
      expect(batch.reviewer).toBe("unknown/unavailable");
      batch.items.forEach((item) => {
        expect(item.reviewer).toBe("unknown/unavailable");
        expect(item.manualReviewDate).toBe("unknown/unavailable");
      });
    });
  });

  it("is exposed through package scripts and keeps deterministic source", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
    const source = fs.readFileSync(path.join(ROOT, "scripts/report_manual_question_authoring_plan.js"), "utf8");
    const token = ["Math", "random"].join(".");

    expect(pkg.scripts["questions:manual-authoring-plan"]).toBe(
      "node scripts/report_manual_question_authoring_plan.js --summary",
    );
    expect(pkg.scripts["questions:manual-authoring-plan:write"]).toBe(
      "node scripts/report_manual_question_authoring_plan.js --write --summary",
    );
    expect(pkg.scripts["questions:manual-authoring-plan:strict"]).toBe(
      "node scripts/report_manual_question_authoring_plan.js --strict --summary",
    );
    expect(source.includes(token)).toBe(false);
  });
});
