const cram = require("../scripts/build_exam_cram_sheet.js");

describe("exam final cram sheet", () => {
  it("uses only the deterministic weakest concepts queue", () => {
    const result = cram.buildCramSheet();
    expect(result.items).toHaveLength(10);
    expect(result.markdown).toContain("מושגים חלשים בלבד");
    expect(result.markdown).toContain("npm run exam:weakest:write");
  });

  it("adds one-line definitions for every weak concept", () => {
    const result = cram.buildCramSheet();
    result.items.forEach((item) => {
      expect(item.oneLine).toBeTruthy();
      expect(item.oneLine).not.toContain("חסר ניסוח");
    });
  });

  it("includes comparison sections when a weak concept has a known comparison table", () => {
    const result = cram.buildCramSheet();
    expect(result.markdown).toContain("## טבלאות השוואה רלוונטיות");
    expect(result.markdown).toContain("|");
  });
});
