const fs = require("fs");
const path = require("path");
const vm = require("vm");

function loadActiveBank() {
  const root = path.resolve(__dirname, "..");
  const dataDir = path.join(root, "data");
  const sandbox = { window: {}, console };
  fs.readdirSync(dataDir)
    .filter((file) => file.endsWith(".js"))
    .sort()
    .forEach((file) => {
      vm.runInNewContext(
        fs.readFileSync(path.join(dataDir, file), "utf8"),
        sandbox,
        { filename: file },
      );
    });
  return sandbox.QUESTIONS_BANK || { mc: [], fill: [] };
}

describe("question option feedback contract", () => {
  it("keeps every active MC question paired with full optionFeedback", () => {
    const bank = loadActiveBank();
    const missing = (bank.mc || []).filter((question) => (
      !Array.isArray(question.optionFeedback) ||
      question.optionFeedback.length !== question.options.length
    ));

    expect(bank.mc.length).toBeGreaterThan(0);
    expect(missing).toEqual([]);
  });
});
