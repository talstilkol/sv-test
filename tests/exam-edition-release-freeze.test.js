const fs = require("fs");
const path = require("path");
const freeze = require("../scripts/report_exam_edition_release_freeze.js");

const ROOT = path.resolve(__dirname, "..");

describe("Exam Edition release freeze", () => {
  it("defines the full P9 release evidence gate list without executing commands in unit tests", () => {
    const report = freeze.buildReport({ execute: false });

    expect(report.reportVersion).toBe("exam-edition-release-freeze-v1");
    expect(report.releaseTag).toBe("svcollege-exam-edition-2026-04-29");
    expect(report.policy).toContain("all P9 smoke");
    expect(report.releaseNotes).toEqual(expect.arrayContaining([
      expect.stringContaining("deterministic standard, hard, stress and code-only final simulations"),
      expect.stringContaining("prove-again retests"),
    ]));
    expect(report.checks.map((check) => check.id)).toEqual([
      "validate-strict",
      "qa-questions-strict",
      "readiness-release",
      "tab-matrix-strict",
      "command-center-strict",
      "student-export-strict",
      "critical-flows-strict",
      "full-portal-smoke-strict",
      "visual-overlap-strict",
      "pwa-offline-strict",
      "profile-backup-restore-strict",
      "exam-accessibility-strict",
      "performance-budget-strict",
      "questions-reuse-audit-strict",
      "level100-release-gate-strict",
      "unit-tests",
      "build",
    ]);
    expect(report.summary.ready).toBe(false);
    expect(report.blockers.every((blocker) => blocker.status === "not-run")).toBe(true);
  });

  it("serializes the frozen release evidence for runtime inspection", () => {
    const report = {
      reportVersion: "exam-edition-release-freeze-v1",
      date: "2026-04-29",
      releaseTag: "svcollege-exam-edition-2026-04-29",
      commit: "2995653",
      target: "SVCollege AI & Full Stack Exam Edition",
      policy: "Exam Edition can be frozen only when all P9 gates pass.",
      summary: { ready: true, frozen: true },
      checks: [
        { id: "build", label: "npm run build", command: "npm run build", passed: true, status: "pass", detail: "ok" },
      ],
      blockers: [],
    };
    const dataFile = freeze.toDataFile(report);

    expect(dataFile).toContain("window.EXAM_EDITION_RELEASE_FREEZE");
    expect(dataFile).toContain("svcollege-exam-edition-2026-04-29");
    expect(dataFile).toContain('"frozen": true');
    expect(dataFile).toContain('"releaseNotes"');
  });

  it("exposes the freeze command in package scripts", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["exam:release-freeze"]).toBe("node scripts/report_exam_edition_release_freeze.js --summary");
    expect(pkg.scripts["exam:release-freeze:write"]).toBe("node scripts/report_exam_edition_release_freeze.js --write --summary");
    expect(pkg.scripts["exam:release-freeze:strict"]).toBe("node scripts/report_exam_edition_release_freeze.js --strict --summary");
  });
});
