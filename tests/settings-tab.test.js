const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("settings tab consolidation", () => {
  const html = read("index.html");
  const app = read("app.js");
  const css = read("style.css");

  it("moves sync and advanced controls out of the home card into a dedicated settings tab", () => {
    expect(html).toContain('id="open-settings"');
    expect(html).toContain('data-tab="settings"');
    expect(html).toContain('id="settings-view"');
    expect(html).toContain('id="btn-sync-config"');
    expect(html).toContain('id="btn-export-progress"');
    expect(html).toContain('class="teacher-class-panel"');
    const welcomeBlock = html.slice(
      html.indexOf('id="welcome-screen"'),
      html.indexOf("<!-- Settings View"),
    );
    expect(welcomeBlock).not.toContain('id="btn-sync-config"');
    expect(welcomeBlock).not.toContain('class="teacher-class-panel"');
  });

  it("persists display defaults from the settings tab", () => {
    expect(app).toContain("function initSettingsTab");
    expect(app).toContain("function openSettings");
    expect(app).toContain('const LESSON_MODE_KEY = "lumenportal:lessonCompactMode:v1"');
    expect(html).toContain('data-settings-select="theme"');
    expect(html).toContain('data-settings-select="lesson-mode"');
    expect(html).toContain('data-settings-toggle="learning-focus"');
    expect(html).toContain('data-settings-a11y="reduce-motion"');
    expect(html).toContain('data-settings-vm="code"');
    expect(app).toContain("window.LUMEN_VIEW_SETTINGS");
    expect(app).toContain("openSettingsBtn?.addEventListener(\"click\", openSettings)");
  });

  it("styles settings as a full tab instead of home-page chrome", () => {
    expect(css).toContain(".settings-view");
    expect(css).toContain(".settings-grid");
    expect(css).toContain(".settings-card-wide");
    expect(css).toContain(".settings-toggle.active");
    expect(css).toContain(".settings-view .teacher-class-panel");
  });
});
