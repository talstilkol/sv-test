#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const guard = require("./report_qwen_output_guard.js");

const ROOT = path.resolve(__dirname, "..");
const MODEL = "qwen3-coder-next:latest";
const OUTPUT_ROOT = "output/qwen-coder-next";
const SYSTEM_PROMPT = "docs/qwen-coder-next-training/qwen-system-prompt.md";
const PROMPTS_DIR = "docs/qwen-coder-next-training/prompts";
const SV_LIBRARY_CONTRACT = "docs/qwen-coder-next-training/contracts/sv-library-contract.json";
const SV_TEAM_MANAGER_CONTRACT = "docs/qwen-coder-next-training/contracts/sv-team-manager-contract.json";
const SV_APPOINTMENTS_CONTRACT = "docs/qwen-coder-next-training/contracts/sv-appointments-contract.json";
const DEFAULT_TIMEOUT_MS = 45 * 60 * 1000;
const REPORT_VERSION = "qwen-training-runner-v1";
const FAILURE_CONTEXT_SKIP_DIRS = new Set(["node_modules", "dist", "build", ".vite"]);
const FAILURE_CONTEXT_SKIP_FILES = new Set([
  "qwen-materialization-report.json",
  "qwen-materialization-report.md",
  "qwen-output-guard-report.json",
  "qwen-output-guard-report.md",
  "qwen-runtime-evaluation-report.json",
  "qwen-runtime-evaluation-report.md",
]);

const DAY_FILES = Object.freeze({
  1: "day-01-setup-login-register.md",
  2: "day-02-backend-crud.md",
  3: "day-03-frontend-full.md",
  4: "day-04-validation-stress.md",
  5: "day-05-js-ts.md",
  6: "day-06-sv-library-simulation.md",
  7: "day-07-failure-repair.md",
});

const FULL_SIMULATIONS = Object.freeze({
  "sv-library": {
    promptFile: path.join(PROMPTS_DIR, "day-06-sv-library-simulation.md"),
    contract: SV_LIBRARY_CONTRACT,
  },
  "sv-team-manager": {
    promptFile: path.join(PROMPTS_DIR, "full-simulation-sv-team-manager.md"),
    contract: SV_TEAM_MANAGER_CONTRACT,
  },
  "sv-appointments": {
    promptFile: path.join(PROMPTS_DIR, "full-simulation-sv-appointments.md"),
    contract: SV_APPOINTMENTS_CONTRACT,
  },
});

function absolute(file) {
  return path.isAbsolute(file) ? file : path.join(ROOT, file);
}

function relative(file) {
  return path.relative(ROOT, file) || ".";
}

function read(file) {
  return fs.readFileSync(absolute(file), "utf8");
}

function write(file, text) {
  const full = absolute(file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, text, "utf8");
}

function parseDays(value) {
  if (!value || value === "all") return [1, 2, 3, 4, 5, 6, 7];
  return String(value)
    .split(",")
    .flatMap((part) => {
      const trimmed = part.trim();
      if (!trimmed) return [];
      const range = trimmed.match(/^(\d+)-(\d+)$/);
      if (!range) return [Number(trimmed)];
      const start = Number(range[1]);
      const end = Number(range[2]);
      const days = [];
      for (let day = start; day <= end; day += 1) days.push(day);
      return days;
    })
    .filter((day) => Number.isInteger(day) && DAY_FILES[day]);
}

function parseSimulations(value) {
  if (!value || value === "all") return Object.keys(FULL_SIMULATIONS);
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter((item) => FULL_SIMULATIONS[item]);
}

function parseArgs(argv) {
  const options = {
    days: [1, 2, 3, 4, 5, 6, 7],
    simulations: null,
    model: MODEL,
    outputRoot: OUTPUT_ROOT,
    dryRun: false,
    smoke: false,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    keepalive: "30m",
    think: null,
    contract: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--smoke") options.smoke = true;
    else if (arg === "--days" || arg === "--day") {
      options.days = parseDays(argv[index + 1]);
      index += 1;
    } else if (arg === "--model") {
      options.model = argv[index + 1];
      index += 1;
    } else if (arg === "--simulation" || arg === "--simulations") {
      options.simulations = parseSimulations(argv[index + 1]);
      index += 1;
    } else if (arg === "--contract") {
      options.contract = argv[index + 1];
      index += 1;
    } else if (arg === "--output") {
      options.outputRoot = argv[index + 1];
      index += 1;
    } else if (arg === "--timeout-ms") {
      options.timeoutMs = Number(argv[index + 1]);
      index += 1;
    } else if (arg === "--keepalive") {
      options.keepalive = argv[index + 1];
      index += 1;
    } else if (arg === "--think") {
      options.think = argv[index + 1];
      index += 1;
    }
  }
  return options;
}

function extractPromptBody(markdown) {
  const blocks = [...markdown.matchAll(/```text\n([\s\S]*?)```/g)];
  if (!blocks.length) return markdown.trim();
  return blocks.map((match) => match[1].trim()).join("\n\n");
}

function dayDir(outputRoot, day) {
  return path.join(outputRoot, `day-${String(day).padStart(2, "0")}`);
}

function simulationDir(outputRoot, name) {
  return path.join(outputRoot, `simulation-${name}`);
}

function buildFailureContext(outputRoot) {
  const runtimeReportPath = absolute(path.join(dayDir(outputRoot, 6), "materialized-project", "qwen-runtime-evaluation-report.json"));
  if (fs.existsSync(runtimeReportPath)) {
    const report = JSON.parse(fs.readFileSync(runtimeReportPath, "utf8"));
    if (Array.isArray(report.blockers) && report.blockers.length > 0) {
      const checks = Array.isArray(report.checks) ? report.checks : [];
      const materializedDir = absolute(path.join(dayDir(outputRoot, 6), "materialized-project"));
      const fileList = listFailureContextFiles(materializedDir)
        .slice(0, 160)
        .map((file) => `- ${file}`)
        .join("\n");
      const failures = report.blockers
        .map((blocker, index) => {
          const check = checks.find((item) => item.id === blocker.id);
          const evidence = check && check.evidence ? `\nEvidence: ${JSON.stringify(check.evidence).slice(0, 3500)}` : "";
          return `${index + 1}. ${blocker.id}: ${blocker.detail}${evidence}`;
        })
        .join("\n\n");
      return [
        "Materialized project files:",
        fileList || "- unavailable",
        "",
        "Runtime failures:",
        failures,
      ].join("\n");
    }
  }

  const reportPath = absolute(path.join(dayDir(outputRoot, 6), "qwen-output-guard-report.json"));
  if (!fs.existsSync(reportPath)) {
    return "No Day 6 guard report is available. Repair only explicit failures provided in this prompt.";
  }
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  if (!Array.isArray(report.blockers) || report.blockers.length === 0) {
    return "Day 6 guard report has no blockers. Verify only actual build/manual failures if supplied.";
  }
  return report.blockers
    .map((blocker, index) => `${index + 1}. ${blocker.id}: ${blocker.detail}`)
    .join("\n");
}

function listFailureContextFiles(entry, base = entry, output = []) {
  if (!fs.existsSync(entry)) return output;
  const stat = fs.statSync(entry);
  if (stat.isFile()) {
    const name = path.basename(entry);
    if (!FAILURE_CONTEXT_SKIP_FILES.has(name)) output.push(path.relative(base, entry).split(path.sep).join("/"));
    return output;
  }
  if (!stat.isDirectory()) return output;
  fs.readdirSync(entry, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((dirent) => {
      if (dirent.name.startsWith(".") || FAILURE_CONTEXT_SKIP_DIRS.has(dirent.name)) return;
      if (dirent.isFile() && FAILURE_CONTEXT_SKIP_FILES.has(dirent.name)) return;
      listFailureContextFiles(path.join(entry, dirent.name), base, output);
    });
  return output;
}

function buildPrompt(day, options = {}) {
  const systemText = extractPromptBody(read(SYSTEM_PROMPT));
  const promptFile = path.join(PROMPTS_DIR, DAY_FILES[day]);
  const dailyText = extractPromptBody(read(promptFile));
  const failureContext = day === 7 ? `\n\nActual Day 6 failures:\n${buildFailureContext(options.outputRoot || OUTPUT_ROOT)}` : "";
  return [
    "SYSTEM:",
    systemText,
    "",
    `DAY ${day} TASK:`,
    dailyText,
    failureContext,
    "",
    "Return the complete answer in Markdown. Do not write files outside the requested output.",
  ].join("\n");
}

function buildSimulationPrompt(name) {
  const simulation = FULL_SIMULATIONS[name];
  if (!simulation) throw new Error(`Unknown simulation: ${name}`);
  const systemText = extractPromptBody(read(SYSTEM_PROMPT));
  const taskText = extractPromptBody(read(simulation.promptFile));
  return [
    "SYSTEM:",
    systemText,
    "",
    `FULL SIMULATION TASK: ${name}`,
    taskText,
    "",
    "Return the complete answer in Markdown. Do not write files outside the requested output.",
  ].join("\n");
}

function runOllama(prompt, options) {
  const startedAt = new Date();
  const args = [
    "run",
    options.model,
    "--nowordwrap",
    "--keepalive",
    options.keepalive,
  ];
  if (options.think) args.push("--think", options.think);
  const result = spawnSync("ollama", args, {
    cwd: ROOT,
    input: prompt,
    encoding: "utf8",
    timeout: options.timeoutMs,
    maxBuffer: 1024 * 1024 * 80,
  });
  const endedAt = new Date();
  return {
    startedAt: startedAt.toISOString(),
    endedAt: endedAt.toISOString(),
    durationMs: endedAt.getTime() - startedAt.getTime(),
    status: typeof result.status === "number" ? result.status : null,
    signal: result.signal || null,
    error: result.error ? result.error.message : null,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
  };
}

function runGuard(target, contract) {
  const report = guard.buildReport({ target: absolute(target), contract });
  const written = guard.writeReport(report, absolute(target));
  return { summary: report.summary, blockers: report.blockers, written };
}

function runGuardForDay(outputRoot, day) {
  if (day !== 6 && day !== 7) return null;
  return runGuard(dayDir(outputRoot, day), day === 6 ? SV_LIBRARY_CONTRACT : null);
}

function writeScorecard(outputRoot, summaries) {
  const lines = [
    "# Qwen Training Run Scorecard",
    "",
    "| Run | Exit | Duration ms | Guard ready | Output | Top blocker |",
    "|---|---:|---:|---|---|---|",
    ...summaries.map((item) => {
      const blocker = item.guard && item.guard.blockers && item.guard.blockers[0]
        ? `${item.guard.blockers[0].id}: ${item.guard.blockers[0].detail}`
        : "";
      const label = item.simulation ? `simulation:${item.simulation}` : `day:${item.day}`;
      return `| ${label} | ${item.status === null ? "null" : item.status} | ${item.durationMs} | ${item.guard ? item.guard.summary.ready : "not-run"} | ${item.outputDir} | ${String(blocker).replace(/\|/g, "\\|")} |`;
    }),
  ];
  write(path.join(outputRoot, "scorecard.md"), `${lines.join("\n")}\n`);
  write(path.join(outputRoot, "scorecard.json"), `${JSON.stringify({ reportVersion: REPORT_VERSION, runs: summaries }, null, 2)}\n`);
}

function runDay(day, options) {
  const outDir = dayDir(options.outputRoot, day);
  const prompt = buildPrompt(day, options);
  write(path.join(outDir, "prompt.md"), prompt);

  if (options.dryRun) {
    return {
      day,
      outputDir: relative(absolute(outDir)),
      status: 0,
      durationMs: 0,
      guard: null,
      dryRun: true,
    };
  }

  const result = runOllama(prompt, options);
  write(path.join(outDir, "qwen-response.md"), result.stdout);
  write(path.join(outDir, "ollama-stderr.txt"), result.stderr);

  const metadata = {
    reportVersion: REPORT_VERSION,
    model: options.model,
    day,
    promptFile: path.join(PROMPTS_DIR, DAY_FILES[day]),
    outputDir: relative(absolute(outDir)),
    startedAt: result.startedAt,
    endedAt: result.endedAt,
    durationMs: result.durationMs,
    status: result.status,
    signal: result.signal,
    error: result.error,
    responseBytes: Buffer.byteLength(result.stdout, "utf8"),
    stderrBytes: Buffer.byteLength(result.stderr, "utf8"),
  };
  write(path.join(outDir, "metadata.json"), `${JSON.stringify(metadata, null, 2)}\n`);

  const guardReport = runGuardForDay(options.outputRoot, day);
  return {
    day,
    outputDir: relative(absolute(outDir)),
    status: result.status,
    durationMs: result.durationMs,
    guard: guardReport,
    dryRun: false,
  };
}

function runSimulation(name, options) {
  const simulation = FULL_SIMULATIONS[name];
  if (!simulation) throw new Error(`Unknown simulation: ${name}`);
  const outDir = simulationDir(options.outputRoot, name);
  const prompt = buildSimulationPrompt(name);
  write(path.join(outDir, "prompt.md"), prompt);

  if (options.dryRun) {
    return {
      simulation: name,
      outputDir: relative(absolute(outDir)),
      status: 0,
      durationMs: 0,
      guard: null,
      dryRun: true,
    };
  }

  const result = runOllama(prompt, options);
  write(path.join(outDir, "qwen-response.md"), result.stdout);
  write(path.join(outDir, "ollama-stderr.txt"), result.stderr);

  const metadata = {
    reportVersion: REPORT_VERSION,
    model: options.model,
    mode: "simulation",
    simulation: name,
    promptFile: simulation.promptFile,
    outputDir: relative(absolute(outDir)),
    startedAt: result.startedAt,
    endedAt: result.endedAt,
    durationMs: result.durationMs,
    status: result.status,
    signal: result.signal,
    error: result.error,
    responseBytes: Buffer.byteLength(result.stdout, "utf8"),
    stderrBytes: Buffer.byteLength(result.stderr, "utf8"),
  };
  write(path.join(outDir, "metadata.json"), `${JSON.stringify(metadata, null, 2)}\n`);

  const contract = options.contract || simulation.contract;
  const guardReport = runGuard(outDir, contract);
  return {
    simulation: name,
    outputDir: relative(absolute(outDir)),
    status: result.status,
    durationMs: result.durationMs,
    guard: guardReport,
    dryRun: false,
  };
}

function runSmoke(options) {
  const prompt = [
    "SYSTEM:",
    extractPromptBody(read(SYSTEM_PROMPT)),
    "",
    "TASK:",
    "Return exactly one line: QWEN_TRAINING_READY",
  ].join("\n");
  const result = runOllama(prompt, { ...options, timeoutMs: Math.min(options.timeoutMs, 5 * 60 * 1000) });
  const outDir = path.join(options.outputRoot, "smoke");
  write(path.join(outDir, "prompt.md"), prompt);
  write(path.join(outDir, "qwen-response.md"), result.stdout);
  const infraPattern = /(EPERM|EACCES|ENOENT|operation not permitted|connect)/i;
  const infrastructureUnavailable = Boolean(
    (result.error && infraPattern.test(String(result.error))) ||
    (result.stderr && infraPattern.test(String(result.stderr))),
  );
  write(path.join(outDir, "metadata.json"), `${JSON.stringify({
    reportVersion: REPORT_VERSION,
    model: options.model,
    mode: "smoke",
    status: result.status,
    signal: result.signal,
    error: result.error,
    infrastructureUnavailable,
    durationMs: result.durationMs,
    responseBytes: Buffer.byteLength(result.stdout, "utf8"),
    stderr: result.stderr,
  }, null, 2)}\n`);
  return {
    mode: "smoke",
    status: result.status,
    ready: result.status === 0 && !infrastructureUnavailable,
    infrastructureUnavailable,
    reason: infrastructureUnavailable ? "ollama-unavailable-or-blocked" : undefined,
    durationMs: result.durationMs,
    outputDir: relative(absolute(outDir)),
  };
}

function run(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.smoke) {
    const summary = runSmoke(options);
    process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
    return summary;
  }

  const summaries = options.simulations
    ? options.simulations.map((name) => runSimulation(name, options))
    : options.days.map((day) => runDay(day, options));
  writeScorecard(options.outputRoot, summaries);
  const payload = {
    reportVersion: REPORT_VERSION,
    model: options.model,
    outputRoot: relative(absolute(options.outputRoot)),
    dryRun: options.dryRun,
    mode: options.simulations ? "simulation" : "day",
    runs: summaries,
  };
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  return payload;
}

if (require.main === module) run();

module.exports = {
  FULL_SIMULATIONS,
  buildSimulationPrompt,
  buildPrompt,
  dayDir,
  listFailureContextFiles,
  parseArgs,
  parseDays,
  parseSimulations,
  run,
  runDay,
  runSimulation,
  simulationDir,
  writeScorecard,
};
