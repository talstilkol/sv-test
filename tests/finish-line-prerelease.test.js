const fs = require("fs");
const path = require("path");

const prerelease = require("../scripts/report_finish_line_prerelease.js");

const ROOT = path.resolve(__dirname, "..");

describe("Finish Line pre-release gate", () => {
  it("plans the complete Finish Line gate chain without executing long commands", () => {
    const report = prerelease.buildReport({ execute: false });
    const ids = report.checks.map((check) => check.id);

    expect(report.reportVersion).toBe("finish-line-prerelease-v1");
    expect(report.policy.manualQuestionsOnly).toBe(true);
    expect(report.policy.generatesQuestions).toBe(false);
    expect(ids).toContain("no-native-random-scan");
    expect(ids).toContain("guard-no-auto-questions");
    expect(ids).toContain("questions-coverage-targets-strict");
    expect(ids).toContain("svcollege-readiness-release");
    expect(ids).toContain("svcollege-student-export-strict");
    expect(ids).toContain("vitest-run");
    expect(ids).toContain("vite-build");
  });

  it("keeps the active source free from the forbidden native randomness token", () => {
    const scan = prerelease.scanNativeRandom();

    expect(scan.status).toBe("pass");
    expect(scan.passed).toBe(true);
  });

  it("is exposed through package scripts", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
    const source = fs.readFileSync(path.join(ROOT, "scripts/report_finish_line_prerelease.js"), "utf8");
    const token = ["Math", "random"].join(".");

    expect(pkg.scripts["finish-line:pre-release"]).toBe(
      "node scripts/report_finish_line_prerelease.js --strict --summary",
    );
    expect(pkg.scripts["finish-line:pre-release:write"]).toBe(
      "node scripts/report_finish_line_prerelease.js --write --summary",
    );
    expect(pkg.scripts["finish-line:pre-release:plan"]).toBe(
      "node scripts/report_finish_line_prerelease.js --summary",
    );
    expect(source.includes(token)).toBe(false);
  });
});
