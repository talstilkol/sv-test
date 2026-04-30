const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("SVCollege command center UI", () => {
  it("renders a single dashboard section inside the SVCollege alignment tab", () => {
    const app = read("app.js");
    const css = read("style.css");

    expect(app).toContain("function renderBlueprintCommandCenter");
    expect(app).toContain("svcollege-command-center-panel");
    expect(app).toContain("SVCollege Command Center");
    expect(app).toContain("Release blockers");
    expect(app).toContain("בריאות טאבים");
    expect(app).toContain("Browser smoke");
    expect(app).toContain("function featureHealthDiagnostics");
    expect(app).toContain("function renderFeatureHealthDiagnostics");
    expect(app).toContain("function installFeatureErrorTelemetry");
    expect(app).toContain("function featureErrorTelemetrySummary");
    expect(app).toContain("function runBugAgent");
    expect(app).toContain("function renderBugAgentLog");
    expect(app).toContain("window.setInterval(() => runBugAgent(), 30000)");
    expect(app).toContain('data-command-center-diagnostics="feature-health"');
    expect(app).toContain('data-bug-agent-log="active"');
    expect(app).toContain("LUMEN_CONTENT_VALIDATION");
    expect(app).toContain("LUMEN_FEATURE_TELEMETRY");
    expect(app).toContain("LUMEN_BUG_AGENT");
    expect(app).toContain("בנק שאלות חי");
    expect(app).toContain("שגיאות פיצ׳רים");
    expect(app).toContain("סוכן איתור באגים אוטומטי");
    expect(app).toContain("data-blueprint-module-jump");
    expect(css).toContain(".blueprint-command-center");
    expect(css).toContain(".blueprint-command-grid");
    expect(css).toContain(".blueprint-feature-health");
    expect(css).toContain(".blueprint-health-check");
    expect(css).toContain(".bug-agent-panel");
    expect(css).toContain(".bug-agent-row");
    expect(css).toContain(".blueprint-command-item");
  });

  it("keeps the dashboard deterministic and tied to course blueprints", () => {
    const app = read("app.js");

    expect(app).toContain("function blueprintCommandCenterData");
    expect(app).toContain("blueprintModuleReadiness(module)");
    expect(app).toContain("moduleCount * 15");
    expect(app).toContain('const questionKinds = ["mc", "fill", "trace", "bug", "build"]');
    expect(app).toContain('recordLearningEvidence("feature_error"');
    expect(app).not.toContain(["Math", "random"].join(".") + "()");
  });
});
