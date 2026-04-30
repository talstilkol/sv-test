const guard = require("../scripts/report_no_auto_question_generation.js");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

describe("no automatic question generation guard", () => {
  it("blocks legacy generation tools and runtime seeded-bank hooks", () => {
    const report = guard.buildReport();

    expect(report.reportVersion).toBe("no-auto-question-generation-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.summary.failed).toBe(0);
    expect(report.checks.map((check) => check.id)).toEqual([
      "deleted-generation-tools",
      "package-generation-scripts",
      "runtime-seeded-bank-block",
      "archive-inactive",
      "no-native-random",
    ]);
  });

  it("is exposed as a strict package script", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["guard:no-auto-questions"]).toBe(
      "node scripts/report_no_auto_question_generation.js --strict --summary",
    );
  });

  it("does not write the forbidden native-random API token into the guard source", () => {
    const source = fs.readFileSync(path.join(ROOT, "scripts/report_no_auto_question_generation.js"), "utf8");
    const token = ["Math", "random"].join(".");

    expect(source.includes(token)).toBe(false);
  });
});
