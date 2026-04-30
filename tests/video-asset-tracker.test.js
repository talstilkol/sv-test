const fs = require("fs");
const path = require("path");
const tracker = require("../scripts/report_video_asset_tracker.js");

const ROOT = path.resolve(__dirname, "..");

describe("video asset tracker", () => {
  it("tracks real concept video assets with script, link, review and replacement-date fields", () => {
    const report = tracker.buildReport();

    expect(report.reportVersion).toBe("video-asset-tracker-v1");
    expect(report.summary.totalAssets).toBeGreaterThanOrEqual(10);
    expect(report.summary.ready).toBe(true);
    report.rows.forEach((row) => {
      expect(row.validConceptKey).toBe(true);
      expect(row.script.source).toBe("NOTEBOOKLM_CONCEPT_CLIPS.md");
      expect(row.script.status).toBe("documented");
      expect(row.script.expectedFilename).toMatch(/__notebooklm_v1\.mp4$/);
      expect(row.asset.status).toBe("pending-original-notebooklm-export");
      expect(row.asset.linkStatus).toBe("temporary-fallback-linked");
      expect(row.asset.link).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/);
      expect(row.asset.replacementDate).toBe("unknown/unavailable");
      expect(row.review.status).toBe("ready-for-production-review");
    });
  });

  it("documents that unknown replacement dates are not invented", () => {
    const report = tracker.buildReport();
    const markdown = tracker.toMarkdown(report);

    expect(report.policy.noInventedReplacementDates).toBe(true);
    expect(markdown).toContain("No replacement date is invented");
  });

  it("exposes package scripts for the tracker gate", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["video:asset-tracker"]).toBe("node scripts/report_video_asset_tracker.js --summary");
    expect(pkg.scripts["video:asset-tracker:write"]).toBe("node scripts/report_video_asset_tracker.js --write --summary");
    expect(pkg.scripts["video:asset-tracker:strict"]).toBe("node scripts/report_video_asset_tracker.js --strict --summary");
  });
});
