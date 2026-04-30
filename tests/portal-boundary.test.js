const fs = require("fs");
const path = require("path");
const boundary = require("../scripts/report_portal_boundary.js");

const ROOT = path.resolve(__dirname, "..");

describe("portal boundary", () => {
  it("keeps the active portal scoped to SVCollege AI & Full Stack", () => {
    const report = boundary.buildReport();

    expect(report.reportVersion).toBe("portal-boundary-v1");
    expect(report.policy).toContain("separate portal specs");
    expect(report.summary.ready).toBe(true);
    expect(report.checks.map((check) => check.id)).toEqual([
      "single-primary-blueprint",
      "svcollege-primary-blueprint",
      "no-active-secondary-provider",
      "navigation-names-svcollege",
      "boundary-policy-doc",
      "release-freeze-script",
    ]);
  });

  it("documents the split rule for future school mappings", () => {
    const policy = fs.readFileSync(path.join(ROOT, "PORTAL_BOUNDARY_POLICY.md"), "utf8");

    expect(policy).toContain("SVCollege AI & Full Stack");
    expect(policy).toContain("Future school mappings must be specified as separate portal specs");
    expect(policy).toContain("svcollege-exam-edition-2026-04-29");
  });

  it("exposes the boundary gate in package scripts", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["portal:boundary"]).toBe("node scripts/report_portal_boundary.js --summary");
    expect(pkg.scripts["portal:boundary:write"]).toBe("node scripts/report_portal_boundary.js --write --summary");
    expect(pkg.scripts["portal:boundary:strict"]).toBe("node scripts/report_portal_boundary.js --strict --summary");
  });
});
