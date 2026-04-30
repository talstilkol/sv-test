const fs = require("fs");
const path = require("path");
const learningOsReport = require("../scripts/report_learning_os_outcome_scale.js");

const ROOT = path.resolve(__dirname, "..");

describe("Learning OS outcome scale report", () => {
  it("closes all Phase 7 task groups from repository evidence", () => {
    const report = learningOsReport.buildReport();

    expect(report.reportVersion).toBe("learning-os-outcome-scale-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.summary.closedTasks).toBe(48);
    expect(report.checks.map((check) => check.id)).toEqual([
      "diagnostic-intake",
      "weekly-study-plan",
      "project-studio",
      "cohort-pilot-lite",
      "ai-tutor-production-guardrails",
      "accessibility-mobile-trust",
      "package-scripts",
    ]);
  });

  it("documents the no-fake-data evidence policy", () => {
    const report = learningOsReport.buildReport();
    expect(report.policy).toContain("real lesson, question, learner, capstone, teacher and audit evidence only");
    expect(report.policy).toContain("unknown/unavailable");
  });

  it("exposes package scripts", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["learning-os:outcome-scale"]).toBe("node scripts/report_learning_os_outcome_scale.js --summary");
    expect(pkg.scripts["learning-os:outcome-scale:write"]).toBe(
      "node scripts/report_learning_os_outcome_scale.js --write --summary",
    );
    expect(pkg.scripts["learning-os:outcome-scale:strict"]).toBe(
      "node scripts/report_learning_os_outcome_scale.js --strict --summary",
    );
  });
});
