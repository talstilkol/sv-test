const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("Teacher Lite UI", () => {
  const html = read("index.html");
  const app = read("app.js");
  const css = read("style.css");

  it("exposes one-class progress, heatmap and export controls", () => {
    expect(html).toContain('id="teacher-class-id"');
    expect(html).toContain('id="teacher-student-table-body"');
    expect(html).toContain('id="teacher-heatmap-body"');
    expect(html).toContain('id="btn-export-teacher-lite"');
    expect(html).toContain('id="teacher-export-status"');
    expect(app).toContain("let latestTeacherStudentsReport = null");
    expect(app).toContain("let latestTeacherHeatmapReport = null");
    expect(app).toContain("function exportTeacherLiteClassReport");
    expect(app).toContain("core.buildTeacherLiteExport");
    expect(app).toContain('document.getElementById("btn-export-teacher-lite")');
    expect(css).toContain(".teacher-export-status");
  });
});
