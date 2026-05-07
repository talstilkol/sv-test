const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("runtime protocol guard", () => {
  it("shows a clear warning when the portal is opened through file protocol", () => {
    const html = read("index.html");
    const css = read("style.css");
    const guard = read("src/boot/file-protocol-guard.js");

    expect(html).toContain('id="file-protocol-warning"');
    expect(html).toContain("פתח דרך שרת מקומי");
    expect(html).toContain("src/boot/file-protocol-guard.js?v=file-protocol-guard-v1");
    expect(css).toContain(".file-protocol-warning");
    expect(guard).toContain('window.location.protocol !== "file:"');
    expect(guard).toContain('data-runtime-warning", "file-protocol"');
  });

  it("does not load the ES module bootstrap directly in file mode", () => {
    const html = read("index.html");
    const loader = read("src/boot/module-bootstrap-loader.js");

    expect(html).not.toContain('<script type="module" src="/src/main.js?v=core-bootstrap-v2"></script>');
    expect(html).toContain('data-module-path="/src/main.js?v=core-bootstrap-v2"');
    expect(loader).toContain('window.location.protocol === "file:"');
    expect(loader).toContain('moduleBootstrap: "disabled-file-protocol"');
  });

  it("skips server-only APIs and service worker registration outside http protocols", () => {
    const app = read("app.js");

    expect(app).toContain('if (window.location.protocol === "file:") return;');
    expect(app).toContain('"serviceWorker" in navigator && /^https?:$/.test(window.location.protocol)');
    expect(app).toContain("const LOCAL_AUTOSAVE_AVAILABLE = /^https?:$/.test(window.location.protocol);");
    expect(app).toContain('appendProgressLog("autosave-local-only", { reason: "file-protocol" });');
  });
});
