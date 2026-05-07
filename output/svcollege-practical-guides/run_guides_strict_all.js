"use strict";

const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = __dirname;
const NODE = process.execPath;

const STEPS = [
  { id: "verify", file: "verify_guides.js" },
  { id: "closed-route-smoke", file: "report_closed_route_smoke.js" },
  { id: "closed-route-browser-runtime", file: "report_closed_route_browser_runtime.js" },
  { id: "release-gate", file: "report_guides_release_gate.js" },
];

function runStep(step) {
  const fullPath = path.join(ROOT, step.file);
  const result = spawnSync(NODE, [fullPath], {
    cwd: ROOT,
    stdio: "inherit",
  });
  return {
    id: step.id,
    file: step.file,
    status: typeof result.status === "number" ? result.status : 1,
  };
}

function main() {
  const results = [];
  for (const step of STEPS) {
    const outcome = runStep(step);
    results.push(outcome);
    if (outcome.status !== 0) {
      process.exit(outcome.status);
    }
  }
}

main();
