const fs = require("fs");
const path = require("path");
const aiTutorAlpha = require("../scripts/report_ai_tutor_alpha.js");

const ROOT = path.resolve(__dirname, "..");

describe("AI Tutor Production Alpha", () => {
  it("locks backend proxy, guardrails, rate limits and logs", () => {
    const report = aiTutorAlpha.buildReport();

    expect(report.reportVersion).toBe("ai-tutor-alpha-gate-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.checks.map((check) => check.id)).toEqual([
      "backend-proxy",
      "guardrails",
      "server-rate-limit",
      "structured-logs",
      "credential-gated-ui",
      "visible-alpha-note",
      "policy-doc",
    ]);
  });

  it("documents the production alpha policy", () => {
    const policy = fs.readFileSync(path.join(ROOT, "AI_TUTOR_ALPHA_POLICY.md"), "utf8");

    expect(policy).toContain("No AI provider key is stored in frontend code");
    expect(policy).toContain("Socratic-first");
    expect(policy).toContain("Default limit: 12 requests per minute");
    expect(policy).toContain("Logs never include the full user message");
  });

  it("exposes AI Tutor Alpha scripts", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["ai-tutor:alpha"]).toBe("node scripts/report_ai_tutor_alpha.js --summary");
    expect(pkg.scripts["ai-tutor:alpha:write"]).toBe("node scripts/report_ai_tutor_alpha.js --write --summary");
    expect(pkg.scripts["ai-tutor:alpha:strict"]).toBe("node scripts/report_ai_tutor_alpha.js --strict --summary");
  });
});
