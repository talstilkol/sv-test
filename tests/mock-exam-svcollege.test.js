const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("SVCollege mock exam integration", () => {
  const app = read("app.js");

  it("adds a dedicated SVCollege exam template with module groups", () => {
    expect(app).toContain("const SVCOLLEGE_EXAM_MODULES");
    expect(app).toContain('id: "svcollege_fullstack"');
    expect(app).toContain("SVCollege Full Stack + AI");
    expect(app).toContain("moduleGroups: SVCOLLEGE_EXAM_MODULES");
    expect(app).toContain("releaseGate: \"Finish Line 1\"");
  });

  it("scores SVCollege exams by module, not only by question type", () => {
    expect(app).toContain("function examModuleForQuestion");
    expect(app).toContain("const moduleBreakdown = {}");
    expect(app).toContain("moduleBreakdown[moduleInfo.id]");
    expect(app).toContain("פירוק לפי מודולי SVCollege");
    expect(app).toContain("/^lesson_(20|sql_orm)::/i.test(k)");
    expect(app).toContain("/^lesson_auth_security::/i.test(k)");
    expect(app).toContain("/^lesson_nextjs::/i.test(k)");
    expect(app).toContain("/^lesson_nestjs::/i.test(k)");
    expect(app).toContain("/^lesson_devops_deploy::/i.test(k)");
    expect(app).toContain("/^lesson_ai_engineering::/i.test(k)");
    expect(app).toContain("lesson_design_systems::");
  });

  it("loads the seeded bank before composing an exam", () => {
    expect(app).toContain("const begin = () => {");
    expect(app).toContain("const questions = composeMockExam(template)");
    expect(app).toContain("window.ensureSeededBank().then(begin).catch(begin)");
    expect(app).toContain("begin();");
  });

  it("shows an exam review path with weak modules and prerequisite rewind", () => {
    expect(app).toContain("const weakModules = Object.values(record.moduleBreakdown || {})");
    expect(app).toContain("const recommendedPathItems = wrongRecords.slice(0, 6).map");
    expect(app).toContain("🧭 סקירת מבחן — מה עושים עכשיו");
    expect(app).toContain("מודולים חלשים");
    expect(app).toContain("מסלול מומלץ");
    expect(app).toContain("קודם:");
    expect(app).toContain("אחר כך:");
  });
});
