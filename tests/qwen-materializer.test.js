const fs = require("fs");
const path = require("path");
const materializer = require("../scripts/materialize_qwen_response.js");

const TMP = path.join("/private/tmp", "qwen-materializer-fixture");
const RESPONSE = path.join(TMP, "qwen-response.md");
const OUT = path.join(TMP, "materialized-project");

function resetTmp() {
  fs.rmSync(TMP, { recursive: true, force: true });
  fs.mkdirSync(TMP, { recursive: true });
}

function write(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
}

describe("qwen response materializer", () => {
  afterEach(() => {
    fs.rmSync(TMP, { recursive: true, force: true });
  });

  it("extracts fenced code blocks with file paths into a project folder", () => {
    resetTmp();
    write(
      RESPONSE,
      [
        "# Qwen output",
        "",
        "### `backend/index.js`",
        "```js",
        "const express = require(\"express\");",
        "const app = express();",
        "app.get(\"/\", (req, res) => res.status(200).json({ message: \"ok\" }));",
        "```",
        "",
        "```jsx path=frontend/src/App.jsx",
        "export function App() {",
        "  return <main>Ready</main>;",
        "}",
        "```",
        "",
        "```text",
        "plain notes without a file path",
        "```",
      ].join("\n"),
    );

    const report = materializer.materialize({ response: RESPONSE, output: OUT });

    expect(report.summary.ready).toBe(true);
    expect(report.summary.written).toBe(2);
    expect(report.summary.skipped).toBe(1);
    expect(fs.existsSync(path.join(OUT, "backend", "index.js"))).toBe(true);
    expect(fs.existsSync(path.join(OUT, "frontend", "src", "App.jsx"))).toBe(true);
    expect(fs.existsSync(path.join(OUT, "qwen-materialization-report.json"))).toBe(true);
  });

  it("rejects unsafe or unsupported output paths", () => {
    expect(materializer.normalizeCandidate("../outside.js")).toBeNull();
    expect(materializer.normalizeCandidate("/tmp/outside.js")).toBeNull();
    expect(materializer.normalizeCandidate("folder with spaces/file.js")).toBeNull();
    expect(materializer.normalizeCandidate("backend/index.js")).toBe("backend/index.js");
  });

  it("can infer a file path from nearby Markdown context", () => {
    const blocks = materializer.parseCodeBlocks(
      [
        "#### `server/routes/books.js`",
        "```js",
        "module.exports = {};",
        "```",
      ].join("\n"),
    );

    expect(blocks).toHaveLength(1);
    expect(blocks[0].filePath).toBe("server/routes/books.js");
  });
});
