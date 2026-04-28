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
  });

  it("loads the seeded bank before composing an exam", () => {
    expect(app).toContain("const begin = () => {");
    expect(app).toContain("const questions = composeMockExam(template)");
    expect(app).toContain("window.ensureSeededBank().then(begin).catch(begin)");
    expect(app).toContain("begin();");
  });
});
