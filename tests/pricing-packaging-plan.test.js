const fs = require("fs");
const path = require("path");
const pricing = require("../scripts/report_pricing_packaging_plan.js");

const ROOT = path.resolve(__dirname, "..");

describe("pricing packaging plan", () => {
  it("keeps paid packaging behind exam readiness without locking required learning", () => {
    const report = pricing.buildReport();

    expect(report.reportVersion).toBe("pricing-packaging-plan-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.checks.map((check) => check.id)).toEqual([
      "exam-content-unlocked",
      "packages-defined",
      "prices-not-fabricated",
      "readiness-gated",
      "package-scripts",
    ]);
  });

  it("documents unknown pricing until real validation exists", () => {
    const plan = fs.readFileSync(path.join(ROOT, "PRICING_PACKAGING_PLAN.md"), "utf8");

    expect(plan).toContain("unknown/unavailable until real pricing validation");
    expect(plan).toContain("No fabricated revenue assumptions");
    expect(plan).toContain("Premium cannot lock");
  });

  it("exposes pricing packaging scripts", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["pricing:packaging"]).toBe("node scripts/report_pricing_packaging_plan.js --summary");
    expect(pkg.scripts["pricing:packaging:write"]).toBe("node scripts/report_pricing_packaging_plan.js --write --summary");
    expect(pkg.scripts["pricing:packaging:strict"]).toBe("node scripts/report_pricing_packaging_plan.js --strict --summary");
  });
});
