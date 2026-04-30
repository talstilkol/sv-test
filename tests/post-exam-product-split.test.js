const fs = require("fs");
const path = require("path");
const productSplit = require("../scripts/report_post_exam_product_split.js");

const ROOT = path.resolve(__dirname, "..");

describe("post-exam product split gate", () => {
  it("closes all W49 tracks from repository evidence", () => {
    const report = productSplit.buildReport();

    expect(report.reportVersion).toBe("post-exam-product-split-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.summary.readyTracks).toBe(9);
    expect(report.tracks.map((track) => track.closes)).toEqual([
      "P10.5.1",
      "P10.5.2",
      "P10.5.3",
      "P10.5.4",
      "P10.5.5",
      "P10.5.6",
      "P10.5.7",
      "P10.5.8",
      "P10.5.9",
    ]);
    expect(report.blockers).toEqual([]);
  });

  it("documents future portal template and manual promotion boundaries", () => {
    const template = fs.readFileSync(path.join(ROOT, "POST_EXAM_PORTAL_TEMPLATE.md"), "utf8");
    const promotion = fs.readFileSync(path.join(ROOT, "SEEDED_QUESTION_PROMOTION_POLICY.md"), "utf8");

    expect(template).toContain("Curriculum blueprint");
    expect(template).toContain("Concept tags");
    expect(template).toContain("Smoke tests");
    expect(promotion).toContain("Real learner outcome evidence may support");
    expect(promotion).toContain("explicit human review evidence");
    expect(promotion).toContain("cannot replace manual review");
    expect(promotion).toContain("unknown/unavailable");
  });

  it("exposes summary/write/strict scripts", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["post-exam:product-split"]).toBe("node scripts/report_post_exam_product_split.js --summary");
    expect(pkg.scripts["post-exam:product-split:write"]).toBe(
      "node scripts/report_post_exam_product_split.js --write --summary",
    );
    expect(pkg.scripts["post-exam:product-split:strict"]).toBe(
      "node scripts/report_post_exam_product_split.js --strict --summary",
    );
  });
});
