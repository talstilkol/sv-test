const fs = require("fs");
const path = require("path");
const metrics = require("../scripts/report_metrics_dashboard.js");

const ROOT = path.resolve(__dirname, "..");

describe("metrics dashboard gate", () => {
  it("locks D1/D7, mastery velocity, exam uplift and question quality dashboard evidence", () => {
    const report = metrics.buildReport();

    expect(report.reportVersion).toBe("metrics-dashboard-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.checks.map((check) => check.id)).toEqual([
      "core-dashboard",
      "no-fake-policy",
      "learning-evidence-ui",
      "dashboard-styles",
      "quality-index-source",
      "package-scripts",
    ]);
  });

  it("exposes metrics dashboard scripts", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["metrics:dashboard"]).toBe("node scripts/report_metrics_dashboard.js --summary");
    expect(pkg.scripts["metrics:dashboard:write"]).toBe("node scripts/report_metrics_dashboard.js --write --summary");
    expect(pkg.scripts["metrics:dashboard:strict"]).toBe("node scripts/report_metrics_dashboard.js --strict --summary");
  });
});
