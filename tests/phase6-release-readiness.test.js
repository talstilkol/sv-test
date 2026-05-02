const fs = require("fs");
const path = require("path");
const readiness = require("../scripts/report_phase6_release_readiness.js");

const ROOT = path.resolve(__dirname, "..");

describe("phase 6 release readiness", () => {
  it("covers privacy, performance, accessibility and release checklist gates", () => {
    const report = readiness.buildReport();

    expect(report.reportVersion).toBe("phase6-release-readiness-v1");
    expect(report.checks.length).toBe(7);
    expect(report.checks.map((check) => check.id)).toEqual([
      "privacy-retention-policy",
      "performance-budget",
      "wcag-screen-reader-pass",
      "release-checklist",
      "curriculum-question-coverage",
      "pilot-readiness",
      "package-gate",
    ]);
  });

  it("keeps privacy and release docs explicit about unknown data and rollback", () => {
    const privacy = fs.readFileSync(path.join(ROOT, "STUDENT_PRIVACY_DATA_RETENTION_POLICY.md"), "utf8");
    const release = fs.readFileSync(path.join(ROOT, "RELEASE_READINESS_CHECKLIST.md"), "utf8");

    expect(privacy).toContain("unknown/unavailable");
    expect(privacy).toContain("Support screenshots are attached only when the user selects a file");
    expect(release).toContain("rollback");
    expect(release).toContain("cache version");
  });

  it("exposes package scripts for the Phase 6 release readiness gate", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["phase6:release-readiness"]).toBe("node scripts/report_phase6_release_readiness.js --summary");
    expect(pkg.scripts["phase6:release-readiness:write"]).toBe("node scripts/report_phase6_release_readiness.js --write --summary");
    expect(pkg.scripts["phase6:release-readiness:strict"]).toBe("node scripts/report_phase6_release_readiness.js --strict --summary");
  });
});
