const fs = require("fs");
const path = require("path");
const featureCoverage = require("../scripts/report_feature_coverage.js");
const tabMatrix = require("../scripts/report_svcollege_tab_matrix.js");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("SVCollege practice feedback and repair loop", () => {
  it("keeps per-distractor feedback complete for the question pool used by SVCollege mock exams", () => {
    const report = featureCoverage.buildCoverage();
    const optionFeedback = report.metrics.find((item) => item.id === "optionFeedback");

    expect(optionFeedback).toBeTruthy();
    expect(optionFeedback.status).toBe("Done");
    expect(optionFeedback.implemented).toBe(optionFeedback.target);
    expect(optionFeedback.details.optionExplanations).toBeGreaterThanOrEqual(optionFeedback.target * 4);
  });

  it("keeps every SVCollege module connected to weak-concept prerequisite repair routing", () => {
    const report = tabMatrix.buildReport();
    const app = read("app.js");

    expect(report.summary.ready).toBe(true);
    expect(report.modules).toHaveLength(15);
    report.modules.forEach((module) => {
      expect(module.counts.prereq).toBeGreaterThan(0);
      expect(module.cells.find((cell) => cell.id === "studyMode").passed).toBe(true);
      expect(module.cells.find((cell) => cell.id === "prerequisites").passed).toBe(true);
    });
    expect(report.strictGaps).toEqual([]);

    expect(app).toContain("function schedulePrerequisiteRewindForRecord(record)");
    expect(app).toContain("function startWrongAnswerRecovery(record)");
    expect(app).toContain("stage: \"prerequisite_rewind\"");
    expect(app).toContain("startWrongAnswerRecovery(result?.mistake || null)");
  });
});
