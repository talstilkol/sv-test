const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("content variant rendering", () => {
  it("normalizes object and array forms for concept levels", () => {
    const app = read("app.js");

    expect(app).toContain("function levelText(levels, keyOrLevel");
    expect(app).toContain("Array.isArray(levels)");
    expect(app).toContain("LEVEL_KEYS.indexOf(keyOrLevel)");
    expect(app).toContain("levelText(concept.levels, displayKey)");
    expect(app).toContain('levelText(lv, "junior")');
    expect(app).toContain('levelText(concept.levels, "grandma")');
  });

  it("normalizes object and array forms for extras panels", () => {
    const app = read("app.js");

    expect(app).toContain("function normalizeExtras(extras)");
    expect(app).toContain("if (!Array.isArray(extras)) return extras || {}");
    expect(app).toContain("acc.pitfalls.push(item)");
    expect(app).toContain("acc.practiceQuestions.push(item)");
    expect(app).toContain("acc.moreExamples.push(item)");
    expect(app).toContain("const ext = normalizeExtras(concept.extras)");
  });

  it("keeps the schema contract aligned with both variants", () => {
    const contract = read("src/core/content-schema-contract.js");

    expect(contract).toContain('levels: field("object|string[]"');
    expect(contract).toContain("miniBuilds");
    expect(contract).toContain("bugHunts");
  });
});
