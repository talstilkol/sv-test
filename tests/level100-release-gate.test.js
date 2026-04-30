const gate = require("../scripts/report_level100_release_gate.js");

describe("Level 100 release gate", () => {
  it("builds a deterministic gate that includes QA, build and smoke blockers", () => {
    const first = gate.buildReport({ runBuild: false });
    const second = gate.buildReport({ runBuild: false });

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("level-100-release-gate-v1");
    expect(first.policy).toContain("Level 100 cannot open");
    expect(first.checks.map((check) => check.id)).toEqual(expect.arrayContaining([
      "qa-questions-strict",
      "build",
      "critical-flows",
      "pwa-offline",
      "accessibility",
      "top-tabs",
      "console-gate",
    ]));
    expect(first.checks.find((check) => check.id === "build").status).toBe("not-run");
    expect(first.summary.ready).toBe(false);
  });

  it("serializes the latest release gate into runtime data", () => {
    const report = {
      reportVersion: "level-100-release-gate-v1",
      date: "2026-04-29",
      policy: "Level 100 cannot open when QA, build or smoke gates are red.",
      summary: { ready: true },
      checks: [
        { id: "qa-questions-strict", label: "qa:questions:strict", passed: true, status: "pass", command: "npm run qa:questions:strict", detail: "ok" },
      ],
      blockers: [],
    };
    const dataFile = gate.toDataFile(report);

    expect(dataFile).toContain("window.LEVEL100_RELEASE_GATES");
    expect(dataFile).toContain("qa-questions-strict");
    expect(dataFile).toContain('"ready": true');
  });
});
