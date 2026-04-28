const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("Museum master plan implementation", () => {
  const app = read("app.js");
  const css = read("style.css");
  const museum = read("museum.html");
  const notebook = read("NOTEBOOKLM_MUSEUM_VIDEOS.md");

  it("keeps deterministic museum routing and data fields in app.js", () => {
    expect(app).toContain("MUSEUM_STACK_LAYER_PAGE_VERSION");
    expect(app).toContain("museum-ai-model-deep-dive-v1");
    expect(app).toContain("function getMuseumWingId()");
    expect(app).toContain("function renderMuseumWingGate");
    expect(app).toContain("function renderMuseumFocusHeader");
    expect(app).toContain("function applyMuseumFocusedWing");
    expect(app).toContain("MUSEUM_CROSS_WING_ROUTES");
    expect(app).toContain("route = buildMuseumRoute");
    expect(app).toContain("learningGoal");
    expect(app).toContain("interactiveDemo");
    expect(app).toContain("diagramSteps");
    expect(app).toContain("upgradeSignals");
    expect(app).toContain("replaceSignals");
  });

  it("supports the external museum query-param interface", () => {
    expect(museum).toContain("museum-ai-model-deep-dive-v1");
    ["wing", "stackLayer", "hall", "domain", "room", "tour"].forEach((param) => {
      expect(museum).toContain(param);
    });
  });

  it("adds the required student experience systems", () => {
    [
      "data-museum-connection-search",
      "data-museum-connection-layer",
      "MUSEUM_VISIT_STORAGE_KEY",
      "IntersectionObserver",
      "data-museum-motion-toggle",
      "data-museum-passport-stamp",
      "data-museum-tour-stop",
      "function renderMuseumTourCockpit",
      "function renderMuseumKnowledgeAtlas",
      "function renderLineageTimelineSvg",
      "lineage.milestones",
      "diagramTakeaway",
      "function renderMuseumProductCommandBoard",
      "function renderMuseumContractInspector",
      "function renderMuseumPracticeLab",
      "function renderMuseumRootCauseRouter",
      "function renderMuseumCourseBridge",
      "function renderMuseumAiEvolutionWing",
      "AI_MUSEUM_TIMELINE",
      "AI_MUSEUM_COMPARISON",
      "AI_MUSEUM_MODEL_TERMS",
      "AI_MUSEUM_MODEL_MILESTONES",
      "AI_MUSEUM_FIRST_MODEL_CARDS",
      "AI_MUSEUM_TRAINING_FLOW",
      "AI_MUSEUM_PRODUCT_SCENARIOS",
      "data-museum-ai-scenario",
      "function bindMuseumAiProductLab",
      "function renderMuseumTeamHandoffLab",
      "function renderMuseumIntegrationMatrix",
      "data-museum-contract-step",
      "data-museum-practice-drill",
      "data-museum-practice-complete",
      "museum-root-cause-card",
      "museum-course-bridge-card",
      "data-museum-team-role",
      "data-museum-integration-step",
      "data-museum-product-phase",
      "data-museum-xray-step",
      "function renderMuseumXrayLab",
      "function renderMuseumDebugLab",
    ].forEach((needle) => {
      expect(app).toContain(needle);
    });
  });

  it("styles the new museum wings, filters, passport and reduced motion controls", () => {
    [
      ".museum-wing-nav",
      ".museum-wing-gate",
      ".museum-focus-header",
      ".museum-focused-target",
      ".museum-card-page-link",
      ".museum-tour-cockpit",
      ".museum-tour-passport-grid",
      ".museum-knowledge-atlas",
      ".museum-knowledge-lane",
      ".museum-lineage-visual",
      ".lineage-timeline-svg",
      ".museum-lineage-detail-grid",
      ".museum-lineage-milestone",
      ".museum-product-command-board",
      ".museum-product-readiness-grid",
      ".museum-contract-inspector",
      ".museum-contract-step-grid",
      ".museum-practice-lab",
      ".museum-practice-card",
      ".museum-root-cause-router",
      ".museum-root-cause-card",
      ".museum-course-bridge",
      ".museum-course-bridge-card",
      ".museum-ai-wing",
      ".museum-ai-model-deep-dive",
      ".museum-ai-model-graph",
      ".museum-ai-first-model-card",
      ".museum-ai-training-flow",
      ".museum-ai-product-lab",
      ".museum-ai-agent-loop",
      ".museum-ai-readiness",
      ".museum-ai-comparison-table",
      ".museum-team-handoff-lab",
      ".museum-team-role-card",
      ".museum-integration-matrix",
      ".museum-integration-card",
      ".museum-xray-lab",
      ".museum-debug-lab",
      ".museum-connection-tools",
      ".museum-mini-simulator",
      ".museum-passport-wing",
      "body.museum-reduced-motion",
    ].forEach((needle) => {
      expect(css).toContain(needle);
    });
  });

  it("generates the NotebookLM museum video document for all 63 videos", () => {
    const videoHeadings = notebook.match(/^### \d+\. /gm) || [];
    expect(videoHeadings).toHaveLength(63);
    [
      "#### 1. חומר רקע מלא לסרטון",
      "#### 2. ידע מקדים להוסיף למחברת",
      "#### 3. סקריפט לסרטון",
      "#### 4. פרומפט ל-NotebookLM",
      "#### 5. במה לבחור ב-NotebookLM",
    ].forEach((heading) => {
      expect(notebook).toContain(heading);
    });
  });
});
