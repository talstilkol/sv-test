const fs = require("fs");
const path = require("path");
const pipeline = require("../scripts/report_content_factory_pipeline.js");

const ROOT = path.resolve(__dirname, "..");

describe("content factory pipeline", () => {
  it("locks manual authoring, QA, distractor review and prerequisite metadata gates", () => {
    const report = pipeline.buildReport();

    expect(report.reportVersion).toBe("content-factory-pipeline-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.checks.map((check) => check.id)).toEqual([
      "automatic-generation-removed",
      "strict-validation",
      "question-qa",
      "distractor-review",
      "remediation-queue",
      "prerequisite-metadata",
      "reuse-audit",
      "pipeline-policy",
    ]);
  });

  it("documents no-fake-data content workflow", () => {
    const policy = fs.readFileSync(path.join(ROOT, "CONTENT_FACTORY_PIPELINE.md"), "utf8");

    expect(policy).toContain("No fake questions");
    expect(policy).toContain("No automatic question generation");
    expect(policy).toContain("manual review");
    expect(policy).toContain("Prerequisite metadata is mandatory");
  });

  it("exposes content factory scripts", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["content-factory:pipeline"]).toBe("node scripts/report_content_factory_pipeline.js --summary");
    expect(pkg.scripts["content-factory:pipeline:write"]).toBe("node scripts/report_content_factory_pipeline.js --write --summary");
    expect(pkg.scripts["content-factory:pipeline:strict"]).toBe("node scripts/report_content_factory_pipeline.js --strict --summary");
  });
});
