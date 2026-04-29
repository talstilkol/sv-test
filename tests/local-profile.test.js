const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("local learner profiles", () => {
  const html = read("index.html");
  const app = read("app.js");
  const css = read("style.css");

  it("adds a passwordless local learner selector in the sidebar", () => {
    expect(html).toContain('class="local-profile-panel"');
    expect(html).toContain('id="local-profile-select"');
    expect(html).toContain('id="local-profile-name"');
    expect(html).toContain('id="local-profile-create"');
    expect(html).toContain("שמירה מקומית ללא סיסמה");
  });

  it("scopes learning localStorage keys by the active local profile", () => {
    expect(app).toContain('const PROFILE_LIST_KEY = "lumenportal:profiles:v1"');
    expect(app).toContain('const ACTIVE_PROFILE_KEY = "lumenportal:activeProfile:v1"');
    expect(app).toContain('const PROFILE_PREFIX = "lumenportal:profile:"');
    expect(app).toContain("Storage.prototype.getItem = function getProfileScopedItem");
    expect(app).toContain("Storage.prototype.setItem = function setProfileScopedItem");
    expect(app).toContain("Storage.prototype.removeItem = function removeProfileScopedItem");
    expect(app).toContain("migrateExistingLearningData();");
    expect(app).toContain('window.LUMEN_LOCAL_PROFILE = localProfileStore');
  });

  it("keeps device-level UI settings global while student progress is per-profile", () => {
    [
      '"lumenportal:theme:v1"',
      '"lumenportal:a11y:v1"',
      '"lumenportal:learning-focus:v1"',
      '"lumenportal:userId:v1"',
    ].forEach((key) => expect(app).toContain(key));
    expect(app).toContain('const profileLocalKeys = new Set(["ob_tour_dismissed"])');
    expect(app).toContain("if (profileLocalKeys.has(value)) return true");
  });

  it("styles the profile panel as compact sidebar chrome", () => {
    expect(css).toContain(".local-profile-panel");
    expect(css).toContain(".local-profile-create");
    expect(css).toContain(".local-profile-status");
  });
});
