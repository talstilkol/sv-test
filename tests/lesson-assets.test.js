const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const LESSONS_DIR = path.join(ROOT, "lessons");
const MANIFEST_PATH = path.join(LESSONS_DIR, "manifest.json");
const ASSET_RE = /\.(pdf|mp4|docx|pptx)$/i;

function listAssets(dir) {
  return fs.readdirSync(dir).filter((name) => ASSET_RE.test(name)).sort();
}

function mayBeLocalOnlyAsset(entry) {
  return entry.type === "mp4" && entry.importedStatus === "asset-only";
}

function loadGlobal(file, globalName) {
  const context = {};
  context.window = context;
  context.global = context;
  vm.runInNewContext(
    fs.readFileSync(path.join(ROOT, file), "utf8"),
    context,
    { filename: file },
  );
  return context[globalName] || context.window[globalName];
}

describe("lesson source assets", () => {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));

  it("keeps raw lesson assets out of the repository root", () => {
    expect(listAssets(ROOT)).toEqual([]);
  });

  it("tracks every lesson asset in lessons/manifest.json", () => {
    const files = listAssets(LESSONS_DIR);
    const manifestNames = manifest.assets.map((entry) => entry.filename).sort();
    const fileSet = new Set(files);
    const manifestSet = new Set(manifestNames);
    const missingFromManifest = files.filter((name) => !manifestSet.has(name));
    const missingFromDisk = manifest.assets
      .filter((entry) => !fileSet.has(entry.filename) && !mayBeLocalOnlyAsset(entry))
      .map((entry) => entry.filename);

    expect(missingFromManifest).toEqual([]);
    expect(missingFromDisk).toEqual([]);
  });

  it("links each asset to an SVCollege module and import status", () => {
    manifest.assets.forEach((entry) => {
      expect(entry.filename).toMatch(ASSET_RE);
      expect(entry.type).toMatch(/^(pdf|mp4|docx|pptx)$/);
      expect(entry.svcollegeModule).toEqual(expect.any(String));
      expect(entry.svcollegeModule.length).toBeGreaterThan(2);
      expect(entry.lessonId).toEqual(expect.any(String));
      expect(entry.importedStatus).toEqual(expect.any(String));
      expect(entry.linkedDataFiles.length).toBeGreaterThan(0);
    });
  });

  it("links Finish Line 1 bridge lessons to raw source assets and generated summaries", () => {
    const manifestNames = new Set(manifest.assets.map((entry) => entry.filename));
    const lessons = [
      loadGlobal("data/lesson_html_css_foundations.js", "LESSON_HTML_CSS_FOUNDATIONS"),
      loadGlobal("data/lesson_tooling_git.js", "LESSON_TOOLING_GIT"),
    ];

    lessons.forEach((lesson) => {
      expect(lesson.sourceAssets.length).toBeGreaterThanOrEqual(1);
      expect(lesson.generatedSummaries).toEqual(expect.arrayContaining([
        "SVCOLLEGE_LESSON_INVENTORY.md",
        "SVCOLLEGE_COVERAGE_REPORT.md",
      ]));
      expect(lesson.sourceCoverageNote.length).toBeGreaterThan(20);

      lesson.sourceAssets.forEach((asset) => {
        expect(asset.path.startsWith("lessons/")).toBe(true);
        expect(manifestNames.has(asset.path.replace("lessons/", ""))).toBe(true);
        expect(asset.role.length).toBeGreaterThan(3);
        expect(["primary", "partial"]).toContain(asset.coverage);
      });
    });
  });
});
