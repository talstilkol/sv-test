const fs = require("fs");
const path = require("path");
const schema = require("../src/core/content-schema-contract.js");
const schemaReport = require("../scripts/report_content_schema_contract.js");

const ROOT = path.resolve(__dirname, "..");

describe("content schema contract", () => {
  it("defines the canonical Lesson/Concept/Question/Trace/Build entities", () => {
    expect(schema.CONTENT_SCHEMA_CONTRACT_VERSION).toBe("content-schema-contract-v1");
    expect(schema.entityNames()).toEqual([
      "Lesson",
      "Concept",
      "MCQuestion",
      "FillQuestion",
      "TraceQuestion",
      "BugQuestion",
      "BuildQuestion",
    ]);
    expect(schema.requiredFieldNames("Lesson")).toEqual(["id", "title", "concepts"]);
    expect(schema.requiredFieldNames("Concept")).toEqual(["conceptName", "levels", "difficulty"]);
    expect(schema.requiredFieldNames("MCQuestion")).toEqual([
      "id",
      "conceptKey",
      "question",
      "options",
      "correctIndex",
      "explanation",
    ]);
    expect(schema.requiredFieldNames("BuildQuestion")).toContain("tests");
  });

  it("keeps the schema report ready and backed by strict gates", () => {
    const report = schemaReport.buildReport();

    expect(report.summary.ready).toBe(true);
    expect(report.checks.map((check) => check.id)).toContain("strict-gates-wired");
    expect(report.checks.map((check) => check.id)).toContain("validator-fields");
    expect(report.failures).toEqual([]);
  });

  it("documents the human-readable contract and script wiring", () => {
    const doc = fs.readFileSync(path.join(ROOT, "CONTENT_SCHEMA_CONTRACT.md"), "utf8");
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(doc).toContain("TraceQuestion");
    expect(doc).toContain("BuildQuestion");
    expect(doc).toContain("npm run validate:strict");
    expect(pkg.scripts["content:schema-contract:strict"]).toBe(
      "node scripts/report_content_schema_contract.js --strict --summary",
    );
  });
});
