const fs = require("fs");
const path = require("path");
const syncAlpha = require("../scripts/report_sync_alpha.js");

const ROOT = path.resolve(__dirname, "..");

describe("Sync Alpha gate", () => {
  it("locks auth, cloud progress, conflict and privacy requirements", () => {
    const report = syncAlpha.buildReport();

    expect(report.reportVersion).toBe("sync-alpha-gate-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.checks.map((check) => check.id)).toEqual([
      "auth-token-required",
      "cloud-progress-row",
      "last-write-wins",
      "session-token-ui",
      "privacy-note-visible",
      "policy-doc",
    ]);
  });

  it("documents the optional local-first sync policy", () => {
    const policy = fs.readFileSync(path.join(ROOT, "SYNC_ALPHA_POLICY.md"), "utf8");

    expect(policy).toContain("local-first");
    expect(policy).toContain("sessionStorage");
    expect(policy).toContain("last-write-wins");
    expect(policy).toContain("No placeholder Supabase project");
  });

  it("exposes Sync Alpha scripts", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["sync:alpha"]).toBe("node scripts/report_sync_alpha.js --summary");
    expect(pkg.scripts["sync:alpha:write"]).toBe("node scripts/report_sync_alpha.js --write --summary");
    expect(pkg.scripts["sync:alpha:strict"]).toBe("node scripts/report_sync_alpha.js --strict --summary");
  });
});
