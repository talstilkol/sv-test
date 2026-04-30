const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("floating control layout", () => {
  const css = read("style.css");

  it("positions left floating controls on exclusive slots below the top menu", () => {
    expect(css).toContain("--floating-control-left: 1rem");
    expect(css).toContain("--floating-control-top: 5.4rem");
    expect(css).toContain("--floating-control-step: 3.35rem");
    expect(css).toContain("top: var(--floating-control-top)");
    expect(css).toContain("top: calc(var(--floating-control-top) + var(--floating-control-step))");
    expect(css).toContain("top: calc(var(--floating-control-top) + (var(--floating-control-step) * 2))");
    expect(css).toContain("top: calc(var(--floating-control-top) + (var(--floating-control-step) * 3))");
  });

  it("keeps mobile floating controls lower than the top tabs and in separate rows", () => {
    expect(css).toContain("--floating-control-top: 6.25rem");
    expect(css).toContain("--floating-control-step: 3.1rem");
    expect(css).toContain("left: var(--floating-control-left)");
    expect(css).toContain("top: calc(var(--floating-control-top) + (var(--floating-control-step) * 3))");
  });

  it("keeps the left display controls fixed when menus collapse", () => {
    expect(css).toContain("body.top-chrome-collapsed .theme-toggle-btn");
    expect(css).toContain("body.right-sidebar-collapsed .view-mode-fab");
    expect(css).toContain("body.learning-focus-mode .global-print-btn");
    expect(css).toContain("body.learning-focus-mode .theme-toggle-btn");
    expect(css).toContain("body.learning-focus-mode .view-mode-fab");
    expect(css).toContain("display: inline-flex !important");
    expect(css).toContain("left: var(--floating-control-left)");
  });
});
