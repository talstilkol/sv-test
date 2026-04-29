const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function loadData(files) {
  const context = {};
  context.window = context;
  context.global = context;
  files.forEach((file) => {
    vm.runInNewContext(
      fs.readFileSync(path.join(ROOT, file), "utf8"),
      context,
      { filename: file },
    );
  });
  return context;
}

describe("exam week hardening content", () => {
  it("adds hard Git/tooling MC questions and code-proof fills for the weakest queue", () => {
    const context = loadData(["data/questions_bank.js"]);
    const bank = context.QUESTIONS_BANK;
    const keys = [
      "lesson_tooling_git::working tree",
      "lesson_tooling_git::Git",
      "lesson_tooling_git::repository",
      "lesson_tooling_git::staging area",
    ];

    keys.forEach((key) => {
      const hardMc = bank.mc.filter((item) => item.conceptKey === key && item.level >= 5);
      const fills = bank.fill.filter((item) => item.conceptKey === key);

      expect(hardMc.length, `${key} hard MC`).toBeGreaterThan(0);
      expect(fills.length, `${key} fill`).toBeGreaterThan(0);
      fills.forEach((item) => {
        expect(item.code).toContain("____");
        expect(item.answer).toEqual(expect.any(String));
        expect(item.explanation.length).toBeGreaterThan(30);
      });
    });
  });

  it("adds a trace that proves working-tree understanding", () => {
    const context = loadData(["data/svcollege_traces_bridge.js"]);
    const trace = context.SVCOLLEGE_BRIDGE_TRACES.find(
      (item) => item.id === "sv_bridge_trace_tooling_git_status_001",
    );

    expect(trace).toBeTruthy();
    expect(trace.conceptKey).toBe("lesson_tooling_git::working tree");
    expect(trace.level).toBeGreaterThanOrEqual(5);
    expect(trace.steps.length).toBeGreaterThanOrEqual(3);
    expect(trace.requiredTerms).toEqual(expect.arrayContaining(["working tree", "tracked", "untracked"]));
  });

  it("adds code-proof fills for the current Nest, Next and AI weakest concepts", () => {
    const context = loadData(["data/questions_bank.js"]);
    const bank = context.QUESTIONS_BANK;
    const keys = [
      "lesson_nestjs::interceptor",
      "lesson_nestjs::middleware",
      "lesson_ai_engineering::LangChain",
      "lesson_ai_engineering::model selection",
      "lesson_nextjs::layout",
      "lesson_nextjs::image optimization",
      "lesson_nextjs::page",
      "lesson_devops_deploy::preview deployment",
      "lesson_ai_engineering::prompt messages",
      "lesson_html_css_foundations::HTML document",
      "lesson_html_css_foundations::HTML form",
      "lesson_13::Document Object Model",
      "lesson_16::File System",
      "lesson_20::$eq",
      "lesson_20::$gt",
      "lesson_20::$lt",
      "lesson_auth_security::Supabase Auth",
      "lesson_ai_engineering::fine-tuning boundary",
      "lesson_design_systems::cva",
      "lesson_design_systems::theme tokens",
      "lesson_design_systems::component registry",
      "lesson_devops_deploy::Docker",
      "lesson_nextjs::Next.js",
      "lesson_nestjs::Nest.js",
      "lesson_nestjs::decorator",
      "lesson_sql_orm::database",
      "lesson_sql_orm::column",
      "lesson_devops_deploy::production readiness",
      "lesson_devops_deploy::container",
      "lesson_devops_deploy::Vercel deploy",
      "lesson_design_systems::accessible primitive",
      "lesson_13::inheritance",
      "lesson_sql_orm::ORM",
      "lesson_auth_security::provider auth",
      "lesson_auth_security::session",
      "lesson_tooling_git::Prettier",
    ];

    keys.forEach((key) => {
      const fills = bank.fill.filter((item) => item.conceptKey === key && item.level >= 5);
      expect(fills.length, `${key} level-5 fill`).toBeGreaterThan(0);
      expect(fills.some((item) => item.code.includes("____")), `${key} blank`).toBe(true);
    });
  });

  it("adds a hard CSS selector question for specificity-level proof", () => {
    const context = loadData(["data/questions_bank.js"]);
    const hardQuestions = context.QUESTIONS_BANK.mc.filter((item) => item.level >= 6);

    expect(
      hardQuestions.some(
        (item) =>
          item.conceptKey === "lesson_html_css_foundations::CSS selector" &&
          item.explanation.includes("id selector"),
      ),
    ).toBe(true);
    expect(
      hardQuestions.some(
        (item) =>
          item.conceptKey === "lesson_tooling_git::commit" &&
          item.explanation.includes("review"),
      ),
    ).toBe(true);
    expect(
      hardQuestions.some(
        (item) =>
          item.conceptKey === "lesson_11::let" &&
          item.explanation.includes("block scoped"),
      ),
    ).toBe(true);
    expect(
      hardQuestions.some(
        (item) =>
          item.conceptKey === "lesson_html_css_foundations::cascade and specificity" &&
          item.explanation.includes("cascade"),
      ),
    ).toBe(true);
    expect(
      hardQuestions.some(
        (item) =>
          item.conceptKey === "lesson_sql_orm::row" &&
          item.explanation.includes("columns"),
      ),
    ).toBe(true);
    expect(
      hardQuestions.some(
        (item) =>
          item.conceptKey === "lesson_nextjs::file-system routing" &&
          item.explanation.includes("page.jsx"),
      ),
    ).toBe(true);
  });
});
