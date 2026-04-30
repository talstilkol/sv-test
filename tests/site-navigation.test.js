const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("global site navigation", () => {
  const html = read("index.html");
  const app = read("app.js");
  const css = read("style.css");

  it("exposes a global tree, back action, and home action in the main shell", () => {
    expect(html).toContain('id="site-trail-nav"');
    expect(html).toContain('id="site-back-btn"');
    expect(html).toContain('id="site-home-btn"');
    expect(html).toContain('id="site-map-menu"');
    expect(html).toContain('id="site-map-menu-body"');
    expect(html).toContain('id="portal-decision-menu"');
    expect(html).toContain('id="site-breadcrumb"');
  });

  it("builds the site tree from real portal tabs and lesson data", () => {
    expect(app).toContain("function renderSiteMapMenu");
    expect(app).toContain('document.querySelectorAll(".top-tab")');
    expect(app).toContain("window.LESSONS_DATA || []");
    expect(app).toContain("groupedLessonNodes()");
    expect(app).toContain("data-site-tab");
    expect(app).toContain("data-site-lesson");
  });

  it("keeps an internal navigation stack for back and home navigation", () => {
    expect(app).toContain("const siteNavigationStack = []");
    expect(app).toContain("function pushCurrentSiteNavigationState");
    expect(app).toContain("function restoreSiteNavigationState");
    expect(app).toContain("siteBackBtn?.addEventListener");
    expect(app).toContain("window.history.back()");
    expect(app).toContain("siteHomeBtn?.addEventListener");
    expect(app).toContain('document.getElementById("open-home")?.click()');
  });

  it("keeps the site tree available in focus mode without stealing the full viewport", () => {
    expect(css).toContain(".site-trail-nav");
    expect(css).toContain(".site-when-menu");
    expect(css).toContain(".site-map-menu-body");
    expect(css).toContain("body.learning-focus-mode .site-trail-nav");
    expect(css).toContain("body.learning-focus-mode.learning-focus-top-collapsed .content-wrapper");
    expect(css).toContain("height: 100vh");
  });
});
