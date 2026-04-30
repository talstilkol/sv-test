const fs = require("fs");
const path = require("path");
const museumEvidence = require("../scripts/report_museum_evidence_fields.js");

const ROOT = path.resolve(__dirname, "..");

describe("museum evidence fields gate", () => {
  it("requires source/evidence fields for historical and technical museum claims", () => {
    const report = museumEvidence.buildReport();

    expect(report.reportVersion).toBe("museum-evidence-fields-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.checks.map((check) => check.id)).toEqual([
      "source-list-present",
      "source-panel-rendered",
      "claim-readiness-policy",
      "video-tracker-evidence",
      "museum-tests-lock-fields",
    ]);
  });

  it("documents the no-backfill policy", () => {
    const report = museumEvidence.buildReport();
    expect(report.policy).toContain("unknown/unavailable");
    expect(report.policy).toContain("no historical or technical claim is backfilled");
  });

  it("exposes package scripts", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["museum:evidence-fields"]).toBe("node scripts/report_museum_evidence_fields.js --summary");
    expect(pkg.scripts["museum:evidence-fields:write"]).toBe(
      "node scripts/report_museum_evidence_fields.js --write --summary",
    );
    expect(pkg.scripts["museum:evidence-fields:strict"]).toBe(
      "node scripts/report_museum_evidence_fields.js --strict --summary",
    );
  });
});
