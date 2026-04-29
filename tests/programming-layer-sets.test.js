const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const appSource = fs.readFileSync(path.join(root, "app.js"), "utf8");
const cssSource = fs.readFileSync(path.join(root, "style.css"), "utf8");

describe("programming basics layer sets", () => {
  it("adds a dedicated layer tab for Node React and Next", () => {
    expect(appSource).toContain('{ id: "layers", label: "שכבות", icon: "🧩" }');
    expect(appSource).toContain("PROGRAMMING_LAYER_SETS");
    expect(appSource).toContain("renderLayerSets");
    expect(appSource).toContain('programmingBasicsTab === "layers" ? renderLayerSets()');
  });

  it("explains what each layer adds beyond the language", () => {
    [
      "שפה: JavaScript / TypeScript",
      "Node.js",
      "React",
      "Next.js",
      "V8 runtime",
      "components",
      "file-system routing",
      "server/client split",
    ].forEach((term) => {
      expect(appSource).toContain(term);
    });
  });

  it("renders a set-theory visual with responsive styles", () => {
    [
      "pb-layer-venn",
      "pb-set-stage",
      "pb-set-language",
      "pb-set-node",
      "pb-set-react",
      "pb-set-next",
      "pb-layer-table",
    ].forEach((selector) => {
      expect(cssSource + appSource).toContain(selector);
    });
  });
});
