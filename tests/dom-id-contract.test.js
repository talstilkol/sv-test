const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const REPORT = path.join(ROOT, "DOM_ID_CONTRACT_REPORT.json");

describe("dom id contract audit", () => {
  it("passes in strict mode with no required missing ids", () => {
    execSync("node scripts/report_dom_id_contract.js --strict --summary", {
      cwd: ROOT,
      stdio: "pipe",
    });

    expect(fs.existsSync(REPORT)).toBe(true);
    const json = JSON.parse(fs.readFileSync(REPORT, "utf8"));
    expect(json.status).toBe("pass");
    expect(json.missingRequiredCount).toBe(0);
    expect(Array.isArray(json.missingRequired)).toBe(true);
  });
});
