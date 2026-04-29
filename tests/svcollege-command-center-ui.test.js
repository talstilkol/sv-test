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
    expect(app).toContain("data-blueprint-module-jump");
    expect(css).toContain(".blueprint-command-center");
    expect(css).toContain(".blueprint-command-grid");
    expect(css).toContain(".blueprint-command-item");
  });

  it("keeps the dashboard deterministic and tied to course blueprints", () => {
    const app = read("app.js");

    expect(app).toContain("function blueprintCommandCenterData");
    expect(app).toContain("blueprintModuleReadiness(module)");
    expect(app).toContain("moduleCount * 15");
    expect(app).not.toContain(["Math", "random"].join(".") + "()");
  });
});
