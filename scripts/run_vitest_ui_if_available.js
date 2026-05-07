#!/usr/bin/env node
"use strict";

const { spawnSync } = require("child_process");

function hasVitestUi() {
  try {
    require.resolve("@vitest/ui");
    return true;
  } catch (_) {
    return false;
  }
}

if (!hasVitestUi()) {
  process.stdout.write(
    `${JSON.stringify(
      {
        mode: "test-ui",
        ready: "unknown/unavailable",
        reason: "missing-dev-dependency",
        missing: "@vitest/ui",
        message: "UI mode skipped. Install @vitest/ui to enable interactive test runner.",
      },
      null,
      2,
    )}\n`,
  );
  process.exit(0);
}

const result = spawnSync("npx", ["vitest", "--ui"], { stdio: "inherit", encoding: "utf8" });
process.exit(typeof result.status === "number" ? result.status : 1);

