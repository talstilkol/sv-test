import { describe, expect, it } from "vitest";
import {
  emptyBugAgentLog,
  normalizeBugFinding,
  runBugAgentScan,
  scanBugSources,
} from "../src/core/bug-agent.js";

describe("bug agent", () => {
  it("creates deterministic bug ids from source, feature and evidence", () => {
    const first = normalizeBugFinding({
      source: "runtime-validation",
      featureId: "content-loader",
      title: "חוזה תוכן נכשל",
      evidence: "runtime-validation:1:0",
      severity: "critical",
    }, { now: Date.UTC(2026, 3, 30, 8) });
    const second = normalizeBugFinding({
      source: "runtime-validation",
      featureId: "content-loader",
      title: "חוזה תוכן נכשל",
      evidence: "runtime-validation:1:0",
      severity: "critical",
    }, { now: Date.UTC(2026, 3, 30, 9) });

    expect(first.id).toBe(second.id);
    expect(first.id).toMatch(/^bug-/);
  });

  it("detects runtime validation, question bank, tab matrix and feature telemetry bugs", () => {
    const findings = scanBugSources({
      runtimeValidation: { ready: false, blockerCount: 1, warningCount: 2 },
      questionBank: { mc: [], fill: [], trace: [], bug: [], build: [] },
      commandCenter: { tabPassedCells: 224, tabStrictCells: 225, releaseBlockers: 1 },
      telemetry: {
        byFeature: [
          { featureId: "lesson-question-bank", count: 2, codes: { RenderError: 2 } },
        ],
      },
    }, { now: Date.UTC(2026, 3, 30, 8) });

    expect(findings.map((bug) => bug.featureId)).toEqual([
      "content-loader",
      "question-bank",
      "release-readiness",
      "tab-matrix",
      "lesson-question-bank",
    ]);
    expect(findings.filter((bug) => bug.severity === "critical")).toHaveLength(4);
    expect(findings.find((bug) => bug.featureId === "lesson-question-bank").severity).toBe("error");
  });

  it("removes fixed bugs from the active log on the next scan", () => {
    const firstLog = runBugAgentScan({
      runtimeValidation: { ready: false, blockerCount: 1, warningCount: 0 },
      questionBank: { mc: [{ id: "q1" }], fill: [], trace: [], bug: [], build: [] },
      commandCenter: { tabPassedCells: 225, tabStrictCells: 225, releaseBlockers: 0 },
      telemetry: { byFeature: [] },
    }, emptyBugAgentLog({ now: Date.UTC(2026, 3, 30, 8) }), { now: Date.UTC(2026, 3, 30, 8) });

    expect(firstLog.activeBugs).toHaveLength(1);

    const secondLog = runBugAgentScan({
      runtimeValidation: { ready: true, blockerCount: 0, warningCount: 0 },
      questionBank: { mc: [{ id: "q1" }], fill: [], trace: [], bug: [], build: [] },
      commandCenter: { tabPassedCells: 225, tabStrictCells: 225, releaseBlockers: 0 },
      telemetry: { byFeature: [] },
    }, firstLog, { now: Date.UTC(2026, 3, 30, 9) });

    expect(secondLog.activeBugs).toHaveLength(0);
    expect(secondLog.lastResolved).toHaveLength(1);
    expect(secondLog.summary.resolvedThisScan).toBe(1);
    expect(secondLog.summary.ready).toBe(true);
  });
});
