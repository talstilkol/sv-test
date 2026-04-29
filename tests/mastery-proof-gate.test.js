const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("mastery proof gate integration", () => {
  const app = read("app.js");
  const scoring = read("src/core/scoring.js");

  it("does not treat level 7 as mastery without explicit proof", () => {
    expect(scoring).toContain("return level >= 7 && hasMasteryProof(score)");
    expect(app).toContain("return Boolean(sc && (Number(sc.level) || 1) >= 7 && scoreHasMasteryProof(sc))");
    expect(app).toContain("if ((Number(scores[k].level) || 1) >= 7 && !scoreHasStoredMasteryProof(scores[k]))");
    expect(app).toContain("scores[k].level = 6");
    expect(app).toContain("scores[k].masteryGatePending = true");
  });

  it("blocks promotion to mastery until the highest available challenge is solved", () => {
    expect(app).toContain("function masteryProofThresholdForConcept");
    expect(app).toContain("function maybeRecordMasteryProof");
    expect(app).toContain("function markMasteryGatePending");
    expect(app).toContain("if (targetLevel >= 7 && !scoreHasMasteryProof(sc))");
    expect(app).toContain("masteryGateBlocked: true");
    expect(app).toContain("כדי לקבל 100 במושג צריך לפתור נכון שאלה ברמת האתגר הגבוהה ביותר שלו");
  });

  it("uses every question mode when calculating the highest available challenge", () => {
    expect(app).toContain("trace: (bank.trace || []).filter(hasKey)");
    expect(app).toContain("bug: (bank.bug || []).filter(hasKey)");
    expect(app).toContain("...(bank.trace || [])");
    expect(app).toContain("...(bank.bug || [])");
    expect(app).toContain("if (levels.length) return Math.max(...levels)");
  });

  it("requires code proof for code-bearing concepts before mastery", () => {
    expect(app).toContain("function conceptRequiresCodeProof");
    expect(app).toContain("function scoreHasCodeProof");
    expect(app).toContain("function answerCountsAsCodeProof");
    expect(app).toContain("function maybeRecordCodeProof");
    expect(app).toContain("codeProofRequired");
    expect(app).toContain("reason: info.blockedByCodeProof ? \"needs-code-proof\" : \"needs-highest-question\"");
    expect(app).toContain("כדי לקבל 100 במושג עם קוד צריך לפתור נכון גם משימת קוד");
  });

  it("records code proof from Bug Hunt, Mini Build, and codeblock answers", () => {
    expect(app).toContain("actualKind: \"bug\"");
    expect(app).toContain("mode: \"bug-hunt\"");
    expect(app).toContain("actualKind: \"build\"");
    expect(app).toContain("mode: \"mini-build\"");
    expect(app).toContain("mode: \"codeblock\"");
    expect(app).toContain("הוכחת קוד נרשמה למושג הזה");
    expect(app).toContain("mb-proof-line");
  });

  it("keeps the concept card locked until the mastery proof exists", () => {
    expect(app).toContain("if (isScoreMastered(sc))");
    expect(app).toContain("const masteryGateHTML = sc.masteryGatePending");
    expect(app).toContain("נשאר מבחן עומק");
  });
});
