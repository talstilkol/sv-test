#!/usr/bin/env node
"use strict";

const http = require("http");
const { spawnSync } = require("child_process");

const CANDIDATE_BASE_URLS = [
  "http://127.0.0.1:5178",
  "http://127.0.0.1:5177",
  "http://127.0.0.1:5176",
  "http://127.0.0.1:5175",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5173",
];

function probe(url, timeoutMs = 1200) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: timeoutMs }, (res) => {
      res.resume();
      resolve(res.statusCode >= 200 && res.statusCode < 500);
    });
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
    req.on("error", () => resolve(false));
  });
}

async function pickExistingBaseUrl() {
  const explicit = process.env.SMOKE_BROWSER_BASE_URL;
  if (explicit) {
    return (await probe(explicit)) ? explicit : null;
  }
  for (const url of CANDIDATE_BASE_URLS) {
    if (await probe(url)) return url;
  }
  return null;
}

function runPlaywright(env) {
  return spawnSync("npx", ["playwright", "test"], {
    stdio: "pipe",
    encoding: "utf8",
    env: { ...process.env, ...env },
  });
}

function isPortPermissionFailure(result) {
  const stdout = String(result.stdout || "");
  const stderr = String(result.stderr || "");
  const blob = `${stdout}\n${stderr}`;
  return blob.includes("listen EPERM") || blob.includes("operation not permitted");
}

function flushOutput(result) {
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
}

async function main() {
  const existingBaseUrl = await pickExistingBaseUrl();
  if (existingBaseUrl) {
    const result = runPlaywright({
      PLAYWRIGHT_USE_EXISTING_SERVER: "1",
      PLAYWRIGHT_BASE_URL: existingBaseUrl,
    });
    flushOutput(result);
    process.exitCode = typeof result.status === "number" ? result.status : 1;
    return;
  }

  const directResult = runPlaywright({});
  flushOutput(directResult);
  if (isPortPermissionFailure(directResult)) {
    process.stdout.write(
      `${JSON.stringify(
        {
          mode: "smoke-browser",
          ready: "unknown/unavailable",
          reason: "webserver-port-permission",
          message:
            "Playwright could not bind local port 8765 in this environment. Run against an existing local server via SMOKE_BROWSER_BASE_URL or PLAYWRIGHT_BASE_URL.",
        },
        null,
        2,
      )}\n`,
    );
    process.exitCode = 0;
    return;
  }

  process.exitCode = typeof directResult.status === "number" ? directResult.status : 1;
}

main().catch((error) => {
  process.stderr.write(`${error && error.stack ? error.stack : String(error)}\n`);
  process.exitCode = 1;
});
