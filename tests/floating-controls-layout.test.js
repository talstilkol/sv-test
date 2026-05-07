const fs = require("fs");
const path = require("path");
const { cssIncludes } = require("./css-evidence.js");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("floating control layout", () => {
  const css = read("style.css");

  it("positions left floating controls on exclusive slots below the top menu", () => {
    expect(cssIncludes(css, "--floating-control-left: 1rem")).toBe(true);
    expect(cssIncludes(css, "--floating-control-top: 5.4rem")).toBe(true);
    expect(cssIncludes(css, "--floating-control-step: 3.35rem")).toBe(true);
    expect(cssIncludes(css, "top: var(--floating-control-top)")).toBe(true);
    expect(cssIncludes(css, "top: calc(var(--floating-control-top) + var(--floating-control-step))")).toBe(true);
    expect(cssIncludes(css, "top: calc(var(--floating-control-top) + (var(--floating-control-step) * 2))")).toBe(true);
    expect(cssIncludes(css, "top: calc(var(--floating-control-top) + (var(--floating-control-step) * 3))")).toBe(true);
  });

  it("keeps mobile floating controls lower than the top tabs and in separate rows", () => {
    expect(cssIncludes(css, "--floating-control-top: 6.25rem")).toBe(true);
    expect(cssIncludes(css, "--floating-control-step: 3.1rem")).toBe(true);
    expect(cssIncludes(css, "left: var(--floating-control-left)")).toBe(true);
    expect(cssIncludes(css, "top: calc(var(--floating-control-top) + (var(--floating-control-step) * 3))")).toBe(true);
  });

  it("keeps the left display controls fixed when menus collapse", () => {
    expect(cssIncludes(css, "body.top-chrome-collapsed .theme-toggle-btn")).toBe(true);
    expect(cssIncludes(css, "body.right-sidebar-collapsed .view-mode-fab")).toBe(true);
    expect(cssIncludes(css, "body.learning-focus-mode .global-print-btn")).toBe(true);
    expect(cssIncludes(css, "body.learning-focus-mode .theme-toggle-btn")).toBe(true);
    expect(cssIncludes(css, "body.learning-focus-mode .view-mode-fab")).toBe(true);
    expect(cssIncludes(css, "display: inline-flex !important")).toBe(true);
    expect(cssIncludes(css, "left: var(--floating-control-left)")).toBe(true);
  });
});
