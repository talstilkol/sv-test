const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function loadGrandmaKnowledgeContext() {
  const context = {
    console: { log() {} },
  };
  context.window = context;
  context.global = context;

  ["data/grandma_knowledge.js", "data/grandma_visuals.js"].forEach((file) => {
    vm.runInNewContext(
      fs.readFileSync(path.join(ROOT, file), "utf8"),
      context,
      { filename: file },
    );
  });

  return context;
}

function allTerms(knowledge) {
  return (knowledge.sections || []).flatMap((section) =>
    (section.terms || []).map((term) => ({
      ...term,
      sectionTitle: section.title,
      description: section.description,
    })),
  );
}

describe("grandma knowledge atlas", () => {
  const context = loadGrandmaKnowledgeContext();
  const knowledge = context.GRANDMA_KNOWLEDGE;
  const visuals = context.GRANDMA_VISUALS;

  it("keeps the external knowledge corpus complete", () => {
    expect(knowledge.sections.length).toBe(165);
    expect(allTerms(knowledge).length).toBe(3362);
  });

  it("selects local visual kinds from real terms deterministically", () => {
    const terms = allTerms(knowledge);
    const browser = terms.find((term) => term.term.includes("Browser Engine"));
    const payment = terms.find((term) => term.term.includes("Payment Authorization Hold"));
    const ai = terms.find((term) => term.term.includes("AI Product"));

    expect(visuals.selectKind(browser)).toBe("web");
    expect(visuals.selectKind(payment)).toBe("payments");
    expect(visuals.selectKind(ai)).toBe("ai");
  });

  it("ships 50 local real-object visual aids across the atlas categories", () => {
    const kinds = new Set(visuals.aids.map((aid) => aid.kind));

    expect(visuals.aids.length).toBe(50);
    expect(kinds.size).toBe(10);
    expect(visuals.aids.every((aid) => aid.id && aid.title)).toBe(true);
  });

  it("renders the same visual markup for the same real term", () => {
    const browser = allTerms(knowledge).find((term) => term.term.includes("Browser Engine"));
    const first = visuals.render(browser);
    const second = visuals.render(browser);

    expect(first).toBe(second);
    expect(first).toContain("grandma-visual--web");
    expect(first).toContain("grandma-object-tags");
    expect(first).toContain("<svg");
  });

  it("keeps arrow expansion separate from branch selection in the atlas tree", () => {
    const source = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
    const arrowStart = source.indexOf('container.querySelectorAll(".grandma-tree-arrow")');
    const branchStart = source.indexOf('container.querySelectorAll(".grandma-tree-title');
    const arrowBlock = source.slice(arrowStart, branchStart);
    const branchBlock = source.slice(branchStart, source.indexOf('container.querySelectorAll(".grandma-tree-term'));

    expect(arrowBlock).toContain("grandmaKnowledgeOpenStates[nodeId]");
    expect(arrowBlock).not.toContain("grandmaKnowledgeSelectedBranch");
    expect(branchBlock).toContain("grandmaKnowledgeSelectedBranch = btn.dataset.branch");
    expect(source).toContain("function renderGrandmaAtlas");
    expect(source).toContain("data-grandma-atlas");
  });
});
