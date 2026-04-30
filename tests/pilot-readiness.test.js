const fs = require("fs");
const path = require("path");
const pilot = require("../scripts/report_pilot_readiness.js");

const ROOT = path.resolve(__dirname, "..");

describe("pilot readiness", () => {
  it("locks pilot plan, teacher onboarding and support payload checks", () => {
    const report = pilot.buildReport();

    expect(report.reportVersion).toBe("pilot-readiness-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.policy).toMatchObject({
      noFakePilotResults: true,
      missingPilotResults: "unknown/unavailable",
      supportPayloadLocalOnly: true,
    });
    expect(report.checks.map((check) => check.id)).toEqual([
      "pilot-cohort",
      "pilot-metrics",
      "teacher-onboarding",
      "support-ui",
      "support-payload-contract",
      "package-gate",
    ]);
  });

  it("documents no-backfill pilot and teacher operating flow", () => {
    const pilotDoc = fs.readFileSync(path.join(ROOT, "PILOT_READINESS_PLAN.md"), "utf8");
    const teacherDoc = fs.readFileSync(path.join(ROOT, "TEACHER_ONBOARDING_KIT.md"), "utf8");

    expect(pilotDoc).toContain("10-30 real students");
    expect(pilotDoc).toContain("unknown/unavailable");
    expect(teacherDoc).toContain("Class Setup");
    expect(teacherDoc).toContain("Support Workflow");
  });

  it("exposes package scripts for the pilot readiness gate", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["pilot:readiness"]).toBe("node scripts/report_pilot_readiness.js --summary");
    expect(pkg.scripts["pilot:readiness:write"]).toBe("node scripts/report_pilot_readiness.js --write --summary");
    expect(pkg.scripts["pilot:readiness:strict"]).toBe("node scripts/report_pilot_readiness.js --strict --summary");
  });
});
