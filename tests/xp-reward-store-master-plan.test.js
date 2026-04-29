const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("XP reward store master plan", () => {
  const plan = read("XP_REWARD_STORE_MASTER_PLAN.md");
  const tasks = read("EXECUTION_TASKS.md");
  const master = read("MASTER_PLAN.md");

  it("documents the XP economy as a canonical Priority 2 plan", () => {
    expect(plan).toContain("100 רמות XP");
    expect(plan).toContain("Coins");
    expect(plan).toContain("חנות חוויות");
    expect(plan).toContain("Priority 2");
    expect(tasks).toContain("Phase 8: XP Economy + Experience Store");
    expect(master).toContain("XP_REWARD_STORE_MASTER_PLAN.md");
  });

  it("prevents purchases from replacing real learning evidence", () => {
    expect(plan).toContain("אי אפשר לקנות אותו");
    expect(plan).toContain("אי אפשר לקנות ציון");
    expect(plan).toContain("לא נותנת \"מאסטר\"");
    expect(plan).toContain("רמה 100");
    expect(plan).toContain("כל המושגים");
    expect(tasks).toContain("no-purchase/no-XP shortcut to level 100");
  });

  it("plans locked museum experiences without blocking exam-critical content", () => {
    expect(plan).toContain("נעילת מוזיאון");
    expect(plan).toContain("חומר חובה למבחן");
    expect(plan).toContain("לא נועלים");
    expect(tasks).toContain("Keep exam-critical explanations free");
    expect(tasks).toContain("locked museum does not block SVCollege readiness flows");
  });
});
