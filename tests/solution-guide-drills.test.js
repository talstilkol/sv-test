const drills = require("../scripts/extract_solution_guide_drills.js");
const dataDrills = require("../data/solution_guide_drills.js");

describe("SVCollege solution guide drill extraction", () => {
  it("extracts the four solved exams into deterministic drill sections", () => {
    const report = drills.buildDrillMap();

    expect(report.ready).toBe(true);
    expect(report.summary.exams).toBe(4);
    expect(report.summary.jsSolutions).toBe(4);
    expect(report.summary.routes).toBeGreaterThanOrEqual(13);
    expect(report.summary.stages).toBeGreaterThanOrEqual(24);
    expect(report.summary.codeBlocks).toBeGreaterThanOrEqual(34);
    expect(report.failures).toHaveLength(0);
    expect(report.exams.map((exam) => exam.id)).toEqual(["flights", "bank", "warehouse", "currency"]);
    report.exams.forEach((exam) => {
      expect(exam.scoreParts.length).toBeGreaterThanOrEqual(3);
      expect(exam.routes.length).toBeGreaterThanOrEqual(2);
      expect(exam.stages.length).toBeGreaterThanOrEqual(3);
      expect(exam.drillPolicy).toContain("אין השלמת דרישות");
    });
  });

  it("keeps the generated portal data aligned with the extractor", () => {
    const report = drills.buildDrillMap();

    expect(dataDrills.reportVersion).toBe(report.reportVersion);
    expect(dataDrills.ready).toBe(true);
    expect(dataDrills.summary).toEqual(report.summary);
    expect(dataDrills.extractionPolicy).toContain("במקום להמציא");
  });

  it("is attached to Homework Exam Mode as an advanced reference source", () => {
    const fs = require("fs");
    const path = require("path");
    const vm = require("vm");
    const root = path.resolve(__dirname, "..");
    const context = { console };
    context.window = context;
    vm.runInNewContext(fs.readFileSync(path.join(root, "data/questions_bank.js"), "utf8"), context);
    vm.runInNewContext(fs.readFileSync(path.join(root, "data/questions_build.js"), "utf8"), context);
    vm.runInNewContext(fs.readFileSync(path.join(root, "data/exam_tasks_tree.js"), "utf8"), context);
    vm.runInNewContext(fs.readFileSync(path.join(root, "data/solution_guide_drills.js"), "utf8"), context);
    vm.runInNewContext(fs.readFileSync(path.join(root, "data/homework_exam_mode.js"), "utf8"), context);

    expect(context.HOMEWORK_EXAM_MODE.solutionGuideDrills.ready).toBe(true);
    expect(context.HOMEWORK_EXAM_MODE.solutionGuideDrills.summary.exams).toBe(4);
    expect(context.HOMEWORK_EXAM_MODE.sources.map((source) => source.id)).toContain("solution_guide_4_exams");
  });
});
