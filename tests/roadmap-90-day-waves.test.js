const fs = require("fs");
const path = require("path");
const roadmap = require("../scripts/report_90_day_roadmap_waves.js");

const ROOT = path.resolve(__dirname, "..");

describe("90-day roadmap waves gate", () => {
  it("closes the three Phase 5 roadmap waves from repository evidence only", () => {
    const report = roadmap.buildReport();

    expect(report.reportVersion).toBe("roadmap-90-day-waves-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.summary.readyWaves).toBe(3);
    expect(report.blockers).toEqual([]);
    expect(report.waves.map((wave) => wave.closes)).toEqual(["P5.5.1", "P5.5.2", "P5.5.3"]);
    expect(report.waves.flatMap((wave) => wave.checks).every((check) => check.passed)).toBe(true);
  });

  it("keeps the roadmap gate wired as a strict package script", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

    expect(pkg.scripts["roadmap:90-day"]).toBe("node scripts/report_90_day_roadmap_waves.js --summary");
    expect(pkg.scripts["roadmap:90-day:write"]).toBe("node scripts/report_90_day_roadmap_waves.js --write --summary");
    expect(pkg.scripts["roadmap:90-day:strict"]).toBe("node scripts/report_90_day_roadmap_waves.js --strict --summary");
  });
});
