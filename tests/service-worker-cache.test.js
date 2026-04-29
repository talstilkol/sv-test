const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("service worker cache freshness", () => {
  const sw = read("service-worker.js");
  const html = read("index.html");

  it("uses a fresh cache version for concept sprint assets", () => {
    expect(sw).toContain('const CACHE_VERSION = "lumen-v2.4.29"');
    expect(html).toContain("style.css?v=concept-sprint-v2");
    expect(html).toContain("app.js?v=concept-sprint-v2");
    expect(html).toContain("/src/main.js?v=core-bootstrap-v2");
  });

  it("loads versioned JS/CSS through network-first reload before cached fallback", () => {
    expect(sw).toContain("function isVersionedCodeAsset");
    expect(sw).toContain('url.searchParams.has("v")');
    expect(sw).toContain("function networkFirstVersionedAsset");
    expect(sw).toContain('fetch(new Request(request, { cache: "reload" }))');
    expect(sw).toContain("event.respondWith(networkFirstVersionedAsset(request))");
  });
});
