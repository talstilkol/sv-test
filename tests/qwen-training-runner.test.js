const fs = require("fs");
const path = require("path");
const runner = require("../scripts/run_qwen_training.js");

const ROOT = path.resolve(__dirname, "..");

describe("qwen training runner", () => {
  it("parses single days, ranges and all", () => {
    expect(runner.parseDays("1")).toEqual([1]);
    expect(runner.parseDays("1,3,5")).toEqual([1, 3, 5]);
    expect(runner.parseDays("2-4")).toEqual([2, 3, 4]);
    expect(runner.parseDays("all")).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("builds a day prompt from the system and daily prompt files", () => {
    const prompt = runner.buildPrompt(6, { outputRoot: "output/qwen-coder-next" });

    expect(prompt).toContain("SYSTEM:");
    expect(prompt).toContain("DAY 6 TASK:");
    expect(prompt).toContain("SV Library");
    expect(prompt).toContain("POST /api/books");
  });

  it("computes deterministic output directory names", () => {
    expect(runner.dayDir("output/qwen-coder-next", 1)).toBe(path.join("output/qwen-coder-next", "day-01"));
    expect(runner.dayDir("output/qwen-coder-next", 7)).toBe(path.join("output/qwen-coder-next", "day-07"));
    expect(runner.simulationDir("output/qwen-coder-next", "sv-team-manager")).toBe(
      path.join("output/qwen-coder-next", "simulation-sv-team-manager"),
    );
  });

  it("parses and builds full simulation prompts", () => {
    expect(runner.parseSimulations("sv-library,sv-appointments")).toEqual(["sv-library", "sv-appointments"]);
    expect(runner.parseSimulations("all")).toEqual(["sv-library", "sv-team-manager", "sv-appointments"]);

    const prompt = runner.buildSimulationPrompt("sv-team-manager");
    expect(prompt).toContain("FULL SIMULATION TASK: sv-team-manager");
    expect(prompt).toContain("GET /api/members/status/:status");
    expect(prompt).toContain("VITE_API_URL");
  });

  it("supports dry-run without invoking Ollama", () => {
    const out = path.join("/private/tmp", "qwen-training-runner-dry");
    fs.rmSync(out, { recursive: true, force: true });

    const summary = runner.run(["--dry-run", "--day", "1", "--output", out]);

    expect(summary.dryRun).toBe(true);
    expect(summary.runs).toHaveLength(1);
    expect(fs.existsSync(path.join(out, "day-01", "prompt.md"))).toBe(true);
    expect(fs.existsSync(path.join(out, "scorecard.md"))).toBe(true);

    fs.rmSync(out, { recursive: true, force: true });
  });

  it("supports simulation dry-run without invoking Ollama", () => {
    const out = path.join("/private/tmp", "qwen-training-runner-simulation-dry");
    fs.rmSync(out, { recursive: true, force: true });

    const summary = runner.run(["--dry-run", "--simulation", "sv-appointments", "--output", out]);

    expect(summary.mode).toBe("simulation");
    expect(summary.runs).toHaveLength(1);
    expect(summary.runs[0].simulation).toBe("sv-appointments");
    expect(fs.existsSync(path.join(out, "simulation-sv-appointments", "prompt.md"))).toBe(true);
    expect(fs.existsSync(path.join(out, "scorecard.md"))).toBe(true);

    fs.rmSync(out, { recursive: true, force: true });
  });

  it("adds materialized file context to runtime repair prompts", () => {
    const out = path.join("/private/tmp", "qwen-training-runner-repair-context");
    const materialized = path.join(out, "day-06", "materialized-project");
    fs.rmSync(out, { recursive: true, force: true });
    fs.mkdirSync(path.join(materialized, "client", "src"), { recursive: true });
    fs.writeFileSync(path.join(materialized, "client", "src", "main.jsx"), "export {};\n", "utf8");
    fs.writeFileSync(
      path.join(materialized, "qwen-runtime-evaluation-report.json"),
      `${JSON.stringify({
        checks: [
          {
            id: "package-build",
            evidence: [{ command: "npm run build", stderr: "Could not resolve entry module" }],
          },
        ],
        blockers: [{ id: "package-build", detail: "0/1 package commands passed." }],
      })}\n`,
      "utf8",
    );

    const prompt = runner.buildPrompt(7, { outputRoot: out });

    expect(prompt).toContain("Materialized project files:");
    expect(prompt).toContain("client/src/main.jsx");
    expect(prompt).toContain("Runtime failures:");

    fs.rmSync(out, { recursive: true, force: true });
  });

  it("does not write the forbidden native-random token into the runner source", () => {
    const source = fs.readFileSync(path.join(ROOT, "scripts/run_qwen_training.js"), "utf8");
    const forbidden = ["Math", "random"].join(".");

    expect(source.includes(forbidden)).toBe(false);
  });
});
