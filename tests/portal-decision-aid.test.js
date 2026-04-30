const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("portal-wide one-line and comparison aid", () => {
  const app = read("app.js");
  const html = read("index.html");
  const css = read("style.css");

  it("adds a reusable decision aid menu in the secondary top nav", () => {
    expect(html).toContain('id="portal-decision-menu"');
    expect(html).toContain('id="portal-decision-aid"');
    expect(html).toContain("מתי להשתמש");
    expect(html).toContain('aria-label="מבט מהיר והשוואות לפי טאב"');
    expect(app).toContain('const portalDecisionMenu = document.getElementById("portal-decision-menu")');
    expect(app).toContain('const portalDecisionAid = document.getElementById("portal-decision-aid")');
    expect(app).toContain('portalDecisionMenu.dataset.ready = "true"');
  });

  it("defines one-line rows and comparison tables for the main portal tabs", () => {
    [
      "home: {",
      "lesson: {",
      "guide: {",
      "grandma: {",
      '"concept-sprint": {',
      "trainer: {",
      "study: {",
      "flashcards: {",
      '"mock-exam": {',
      "codeblocks: {",
      "trace: {",
      "anatomy: {",
      "comparator: {",
      '"knowledge-map": {',
      "gap: {",
      '"learning-evidence": {',
      "capstones: {",
      "blueprints: {",
      '"programming-basics": {',
      '"programming-principles": {',
      '"programming-museum": {',
      '"language-tools": {',
      '"reward-store": {',
    ].forEach((key) => expect(app).toContain(key));
    expect(app).toContain("const PORTAL_DECISION_AIDS = {");
    expect(app).toContain("function renderPortalDecisionRows");
    expect(app).toContain("function renderPortalDecisionComparisons");
    expect(app).toContain("function setPortalDecisionAid");
  });

  it("wires every major view opener to the shared aid", () => {
    [
      'setPortalDecisionAid("home")',
      'setPortalDecisionAid("lesson")',
      'setPortalDecisionAid("guide")',
      'setPortalDecisionAid("grandma")',
      'setPortalDecisionAid("concept-sprint")',
      'setPortalDecisionAid("trainer")',
      'setPortalDecisionAid("study")',
      'setPortalDecisionAid("flashcards")',
      'setPortalDecisionAid("mock-exam")',
      'setPortalDecisionAid("codeblocks")',
      'setPortalDecisionAid("trace")',
      'setPortalDecisionAid("anatomy")',
      'setPortalDecisionAid("comparator")',
      'setPortalDecisionAid("knowledge-map")',
      'setPortalDecisionAid("gap")',
      'setPortalDecisionAid("learning-evidence")',
      'setPortalDecisionAid("capstones")',
      'setPortalDecisionAid("blueprints")',
      'setPortalDecisionAid("programming-basics")',
      'setPortalDecisionAid("programming-principles")',
      'setPortalDecisionAid("programming-museum")',
      'setPortalDecisionAid("language-tools")',
      'setPortalDecisionAid("reward-store")',
    ].forEach((call) => expect(app).toContain(call));
    expect(app).toContain("hidePortalDecisionAid();");
  });

  it("styles the compact rows and comparison table consistently", () => {
    [
      ".portal-decision-aid",
      ".site-when-menu .portal-decision-aid",
      ".portal-aid-head",
      ".portal-aid-grid",
      ".portal-aid-row",
      ".portal-aid-row[open]",
      ".portal-aid-one-line",
      ".portal-aid-compare",
      ".portal-aid-table",
      ".portal-aid-table td:first-child",
    ].forEach((selector) => expect(css).toContain(selector));
  });
});
