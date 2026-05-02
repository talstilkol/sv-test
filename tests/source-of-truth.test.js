const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const sourceOfTruth = require("../scripts/report_source_of_truth.js");

const ROOT = path.resolve(__dirname, "..");

describe("source-of-truth report", () => {
  it("builds deterministic artifact reconciliation with a valid live signal set", () => {
    const report = sourceOfTruth.buildSourceOfTruthReport();

    expect(report.reportVersion).toBe("report-source-of-truth-v1");
    expect(typeof report.date).toBe("string");
    expect(Array.isArray(report.signals)).toBe(true);
    expect(report.signals.length).toBeGreaterThanOrEqual(4);
    expect(report.signals.map((signal) => signal.id)).toEqual(expect.arrayContaining([
      "FEATURE_COVERAGE",
      "QUESTION_COVERAGE_TARGETS",
      "QUESTION_QUALITY",
      "FINISH_LINE_PRE_RELEASE",
    ]));
    expect(report.artifactSummary.total).toBe(report.artifacts.length);
    expect(report.artifactSummary.total).toBeGreaterThan(10);

    const ids = report.artifacts.map((artifact) => artifact.id);
    expect(ids).toContain("REPORT_SOURCE_OF_TRUTH");
    expect(ids).toContain("FEATURE_COVERAGE_REPORT");
    expect(report.artifacts.find((artifact) => artifact.id === "REPORT_SOURCE_OF_TRUTH")).toMatchObject({ state: "active" });

    expect(report.artifactSummary.historical + report.artifactSummary.active).toBe(report.artifactSummary.total);
  });

  it("exposes package scripts for source-of-truth reporting", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["report:source-of-truth"]).toBe("node scripts/report_source_of_truth.js");
    expect(pkg.scripts["report:source-of-truth:write"]).toBe("node scripts/report_source_of_truth.js --write");
    expect(pkg.scripts["report:source-of-truth:strict"]).toBe("node scripts/report_source_of_truth.js --strict --write --summary");
  });

  it("aligns strict exit code to critical findings and outputs a findings section", () => {
    const report = sourceOfTruth.buildSourceOfTruthReport();
    const hasCritical = report.findings.some((finding) => String(finding.severity || "").toUpperCase().startsWith("P1"));

    const result = spawnSync(process.execPath, ["scripts/report_source_of_truth.js", "--strict"], {
      encoding: "utf8",
    });

    expect(result.status).toBe(hasCritical ? 1 : 0);
    expect(result.stdout).toContain("## Source-of-Truth Findings");
  });

  it("supports machine-readable summary output", () => {
    const result = spawnSync(process.execPath, ["scripts/report_source_of_truth.js", "--json"], { encoding: "utf8" });

    expect(result.status).toBe(0);
    const report = JSON.parse(result.stdout);

    expect(report.reportVersion).toBe("report-source-of-truth-v1");
    expect(Array.isArray(report.signals)).toBe(true);
    expect(report.artifactSummary.historical + report.artifactSummary.active).toBe(report.artifactSummary.total);
  });
});
