const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("runtime content loader validation", () => {
  it("validates loaded lesson and practice content without blocking portal boot", () => {
    const loader = read("content-loader.js");

    expect(loader).toContain("function validateLoadedContent()");
    expect(loader).toContain("window.LUMEN_CONTENT_VALIDATION");
    expect(loader).toContain("runtime-content-validation-v1");
    expect(loader).toContain("function renderContentValidationPanel(report)");
    expect(loader).toContain("content-validation-panel");
    expect(loader).toContain("document.addEventListener(\"DOMContentLoaded\", mount");
  });

  it("checks the same core fields as the schema contract", () => {
    const loader = read("content-loader.js");

    expect(loader).toContain("missing-concept-name");
    expect(loader).toContain("missing-difficulty");
    expect(loader).toContain("bad-correct-index");
    expect(loader).toContain("missing-blank");
    expect(loader).toContain("missing-steps");
    expect(loader).toContain("missing-broken-code");
    expect(loader).toContain("missing-tests");
    expect(loader).toContain("unknown-concept-key");
  });

  it("keeps the soft error panel styled and cache-busted", () => {
    const css = read("style.css");
    const html = read("index.html");
    const sw = read("service-worker.js");

    expect(css).toContain(".content-validation-panel");
    expect(css).toContain(".content-validation-panel.blockers");
    expect(html).toContain("content-loader.js?v=content-validation-v1");
    expect(sw).toContain("/content-loader.js?v=content-validation-v1");
  });
});
