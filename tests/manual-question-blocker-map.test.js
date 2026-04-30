const fs = require("fs");
const path = require("path");

const blockerMap = require("../scripts/report_manual_question_blocker_map.js");

const ROOT = path.resolve(__dirname, "..");

describe("manual question blocker map", () => {
  it("maps the current SVCollege release blockers without generating questions", () => {
    const report = blockerMap.buildReport();

    expect(report.reportVersion).toBe("manual-question-blocker-map-v1");
    expect(report.policy.manualOnly).toBe(true);
    expect(report.policy.generatesQuestions).toBe(false);
    expect(report.policy.mutatesQuestionBank).toBe(false);
    expect(report.summary.mappingReady).toBe(true);
    expect(report.summary.targetModules).toBe(2);
    expect(report.summary.mappedTargetModules).toBe(2);
    expect(report.summary.conceptCount).toBe(9);
    expect(report.modules.map((module) => module.title)).toEqual([
      "עיצוב רספונסיבי ו-CSS מתקדם",
      "AI למפתחים — Cursor, Windsurf, Bolt, תיעוד וטסטים עם AI",
    ]);
  });

  it("keeps the exact manual authoring deficits visible", () => {
    const report = blockerMap.buildReport();

    expect(report.summary.releaseQuestionDeficit).toBe(0);
    expect(report.summary.strictMcDeficit).toBe(0);
    expect(report.summary.strictFillDeficit).toBe(0);

    report.modules.forEach((module) => {
      module.concepts.forEach((concept) => {
        expect(concept.mappedInCoverageTargets).toBe(true);
        expect(concept.requiresFill).toBe(true);
        expect(concept.manualMC).toBeGreaterThanOrEqual(3);
        expect(concept.manualFill).toBeGreaterThanOrEqual(2);
      });
    });
  });

  it("is exposed through package scripts and keeps deterministic source", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
    const source = fs.readFileSync(path.join(ROOT, "scripts/report_manual_question_blocker_map.js"), "utf8");
    const token = ["Math", "random"].join(".");

    expect(pkg.scripts["questions:blocker-map"]).toBe(
      "node scripts/report_manual_question_blocker_map.js --summary",
    );
    expect(pkg.scripts["questions:blocker-map:write"]).toBe(
      "node scripts/report_manual_question_blocker_map.js --write --summary",
    );
    expect(pkg.scripts["questions:blocker-map:strict"]).toBe(
      "node scripts/report_manual_question_blocker_map.js --strict --summary",
    );
    expect(source.includes(token)).toBe(false);
  });
});
