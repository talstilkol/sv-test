#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const { chromium } = require("@playwright/test");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const DEFAULT_CONFIG_PATH = path.join(ROOT, "scripts", "qa-scan.config.json");
const DEFAULT_REPORT_VERSION = "qa-portal-scan-v1";

const CLI_DEFAULTS = {
  strict: false,
  target: null,
  json: false,
  summary: false,
};

const CLI_FLAGS = {
  config: DEFAULT_CONFIG_PATH,
  artifactsDir: null,
};

const FLOW_HANDLERS = {
  "boot-consent-onboarding": runBootConsentFlow,
  "top-tab-coverage": runTopTabCoverageFlow,
  "critical-learning-flows": runCriticalLearningFlow,
  "mobile-flow": runMobileFlow,
  "offline-pwa": runOfflinePwaFlow,
  "accessibility-basics": runAccessibilityFlow,
  "console-noise": runConsoleNoiseFlow,
};

const TAB_VIEW_MAP = Object.freeze({
  ancestry: "knowledge-map-view",
  "grandma-knowledge": "grandma-knowledge-view",
  "programming-basics": "programming-basics-view",
  "programming-principles": "programming-principles-view",
  "programming-museum": "programming-museum-view",
  "language-tools": "language-tools-view",
  "reward-store": "reward-store-view",
  flashcards: "flashcards-view",
  codeblocks: "codeblocks-view",
  trace: "trace-view",
  "mock-exam": "mock-exam-view",
  "gap-matrix": "gap-matrix-view",
  "learning-evidence": "learning-evidence-view",
  capstones: "capstones-view",
  blueprints: "blueprints-view",
  comparator: "comparator-view",
  trainer: "trainer-view",
  "concept-sprint": "concept-sprint-view",
  study: "study-mode-view",
  km: "knowledge-map-view",
  anatomy: "code-anatomy-view",
  home: "welcome-screen",
  settings: "settings-view",
  guide: "guide-view",
});

const COMMAND_FAILURE_MARKERS = [
  "listen EPERM",
  "operation not permitted",
  "Process from config.webServer was not able to start",
  "EADDRINUSE",
  "not allowed",
];

function parseArgs(rawArgs = process.argv.slice(2)) {
  const args = {
    ...CLI_DEFAULTS,
    ...CLI_FLAGS,
    positional: [],
  };

  for (let i = 0; i < rawArgs.length; i += 1) {
    const arg = rawArgs[i];
    if (arg === "--strict") {
      args.strict = true;
      continue;
    }
    if (arg === "--json") {
      args.json = true;
      continue;
    }
    if (arg === "--summary") {
      args.summary = true;
      continue;
    }
    if (arg === "--target") {
      if (rawArgs[i + 1] && !rawArgs[i + 1].startsWith("--")) {
        args.target = rawArgs[i + 1];
        i += 1;
      } else {
        args.target = args.target || "local";
      }
      continue;
    }
    if (arg === "--config" && rawArgs[i + 1]) {
      args.config = rawArgs[i + 1];
      i += 1;
      continue;
    }
    if (arg === "--artifacts-dir" && rawArgs[i + 1]) {
      args.artifactsDir = rawArgs[i + 1];
      i += 1;
      continue;
    }
    if (arg === "--help") {
      args.help = true;
      continue;
    }
    args.positional.push(arg);
  }

  if (!args.target && process.env.SCAN_TARGET) {
    args.target = process.env.SCAN_TARGET;
  }
  if (args.artifactsDir) {
    args.artifactsDir = path.resolve(args.artifactsDir);
  }
  return args;
}

function showHelp() {
  return [
    "Usage:",
    "  node scripts/qa-portal-scan.js --target <name> [options]",
    "  node scripts/qa-portal-scan.js [options]",
    "",
    "--config <path>        Scan config JSON path",
    "--target <name>        Run single target by name",
    "--strict               Set process exit non-zero on merge blockers",
    "--json                 Print full combined JSON",
    "--summary              Print compact JSON summary",
    "--artifacts-dir <dir>  Override artifacts directory",
    "--help",
  ].join("\n");
}

function readJson(filePath) {
  const abs = path.resolve(filePath);
  const content = fs.readFileSync(abs, "utf8");
  return JSON.parse(content);
}

function nowIso() {
  return new Date().toISOString();
}

function buildHash(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

function deterministicRunId(seed) {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `${today}-${buildHash(seed).slice(0, 14)}`;
}

function sanitizeName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function resolveEnvTemplate(value) {
  if (value === undefined || value === null) {
    return value;
  }
  if (typeof value !== "string") {
    return value;
  }
  return value
    .replace(/\$\{([^}]+)\}/g, (_, token) => process.env[token] || "")
    .replace(/\$([A-Z0-9_]+)/g, (_, token) => process.env[token] || "");
}

function normalizeTargetName(value) {
  return String(value || "").trim();
}

function normalizeTargetUrl(value) {
  const trimmed = String(resolveEnvTemplate(value || "") || "").trim();
  return trimmed || "unknown/unavailable";
}

function relativePath(base, value) {
  if (!value) {
    return value;
  }
  return path.relative(base, value).split(path.sep).join("/");
}

function isInfrastructureUnavailable(text) {
  return COMMAND_FAILURE_MARKERS.some((marker) => text.includes(marker));
}

async function probeUrl(targetUrl, timeoutMs = 1300) {
  if (!targetUrl || targetUrl === "unknown/unavailable") {
    return false;
  }
  try {
    const parsed = new URL(targetUrl);
    const protocol = parsed.protocol === "https:" ? https : http;
    return await new Promise((resolve) => {
      const req = protocol.get(
        {
          hostname: parsed.hostname,
          port: parsed.port || (parsed.protocol === "https:" ? 443 : 80),
          path: `${parsed.pathname || "/"}${parsed.search || ""}`,
          timeout: timeoutMs,
        },
        (res) => {
          const ok = typeof res.statusCode === "number" && res.statusCode >= 200 && res.statusCode < 500;
          res.resume();
          resolve(ok);
        },
      );
      req.on("error", () => resolve(false));
      req.on("timeout", () => {
        req.destroy();
        resolve(false);
      });
    });
  } catch {
    return false;
  }
}

function runCommand(entry, env, runRoot) {
  const command = entry.command || "";
  const args = Array.isArray(entry.args) ? entry.args : [];
  const started = Date.now();
  const artifactPath = path.join(runRoot, "artifacts", "commands", `${sanitizeName(entry.id || "command")}.log`);
  const result = spawnSync(command, args, {
    cwd: ROOT,
    env: { ...process.env, ...env },
    encoding: "utf8",
    timeout: entry.timeoutMs || 10 * 60 * 1000,
    maxBuffer: 15 * 1024 * 1024,
  });

  const stdout = String(result.stdout || "");
  const stderr = String(result.stderr || "");
  const statusCode = typeof result.status === "number" ? result.status : 1;
  const output = `${stdout}\n${stderr}`.trim();
  fs.mkdirSync(path.dirname(artifactPath), { recursive: true });
  fs.writeFileSync(artifactPath, output, "utf8");

  const infraUnavailable = isInfrastructureUnavailable(output);
  const expectedPass = entry.allowFailure ? true : statusCode === 0;
  const status = expectedPass ? "PASS" : (infraUnavailable ? "ENV_WARNING" : "FAIL");
  return {
    id: entry.id || `${command}-${args.join("-") || "cmd"}`,
    domain: entry.domain || "core",
    label: entry.label || `${command} ${args.join(" ")}`.trim(),
    command: `${command} ${args.join(" ")}`.trim(),
    status,
    statusCode,
    stdout: stdout.length > 2000 ? `${stdout.slice(0, 1400)}\n...\n${stdout.slice(-500)}` : stdout,
    stderr: stderr.length > 2000 ? `${stderr.slice(0, 1400)}\n...\n${stderr.slice(-500)}` : stderr,
    artifact: artifactPath,
    durationMs: Date.now() - started,
    environmentStatus: infraUnavailable ? "environmentUnavailable" : "ok",
    severity: entry.severity || "high",
  };
}

function isKnownBenignConsole(text) {
  return /\b(ServiceWorker|service worker|webpack-dev-server|LumenPortal|react-dom|service worker)/i.test(text);
}

function getViewIdForTab(dataTab) {
  return TAB_VIEW_MAP[dataTab] || `${dataTab}-view`;
}

function buildIssue(state, params) {
  const payload = {
    env: state.target.name,
    domain: params.domain || "core",
    step: params.step || "check",
    expected: params.expected || "",
    observed: params.observed || "",
    selector: params.selector || "",
    severity: params.severity || "medium",
    message: params.message || "",
    timestamp: nowIso(),
  };
  const key = buildHash([
    payload.env,
    payload.domain,
    payload.step,
    payload.selector,
    payload.expected,
    payload.observed,
    payload.message,
  ].join("||"));
  const existing = state.issuesByFingerprint.get(key);
  const evidenceArtifact = params.artifact ? relativePath(state.reportRoot, params.artifact) : undefined;

  if (existing) {
    existing.count += 1;
    existing.lastSeenAt = payload.timestamp;
    if (evidenceArtifact && !existing.evidence.artifacts.includes(evidenceArtifact)) {
      existing.evidence.artifacts.push(evidenceArtifact);
    }
    if (params.artifact && !existing.artifact) {
      existing.artifact = evidenceArtifact;
    }
    return existing.id;
  }

  const issue = {
    id: `issue-${key.slice(0, 12)}`,
    env: payload.env,
    severity: payload.severity,
    domain: payload.domain,
    step: payload.step,
    expected: payload.expected,
    observed: payload.observed,
    artifact: evidenceArtifact,
    firstSeenAt: payload.timestamp,
    evidence: {
      message: payload.message,
      selector: payload.selector,
      artifacts: evidenceArtifact ? [evidenceArtifact] : [],
    },
    count: 1,
    lastSeenAt: payload.timestamp,
  };

  state.issues.push(issue);
  state.issuesByFingerprint.set(key, issue);
  return issue.id;
}

async function captureFailureArtifact(state, flowId, step, reason = "failure") {
  const folder = path.join(state.artifactsRoot, "screenshots");
  fs.mkdirSync(folder, { recursive: true });
  const filename = `${sanitizeName(flowId)}__${sanitizeName(step)}__${sanitizeName(reason)}_${String(state.screenshotCounter).padStart(4, "0")}.png`;
  state.screenshotCounter += 1;
  const filePath = path.join(folder, filename);
  try {
    await state.page.screenshot({ path: filePath, fullPage: true });
    return filePath;
  } catch {
    return null;
  }
}

async function clickById(page, elementId) {
  await page.evaluate((id) => {
    const node = document.getElementById(id);
    if (node) node.click();
  }, elementId);
}

async function isVisible(page, selector) {
  try {
    return await page.locator(selector).first().isVisible();
  } catch {
    return false;
  }
}

async function waitForUiStable(page) {
  await page.waitForTimeout(180);
}

function checkConsoleIssues(state) {
  const failures = [];
  for (const event of state.consoleEvents) {
    const text = String(event.text || "").trim();
    if (!text || isKnownBenignConsole(text)) {
      continue;
    }
    if (event.type === "error" || event.type === "warning") {
      failures.push({
        type: event.type,
        text,
        url: event.location && event.location.url ? event.location.url : "",
      });
    }
  }
  return failures;
}

async function runBootConsentFlow(state) {
  const flow = {
    id: "boot-consent-onboarding",
    label: "Boot, consent and onboarding stabilization",
    domain: "core",
    severity: "critical",
    passed: true,
    totalChecks: 0,
    failedChecks: 0,
    issueIds: [],
    artifacts: [],
  };

  let isBooted = false;
  try {
    flow.totalChecks += 1;
    await state.page.goto(state.target.url, { timeout: 60000, waitUntil: "domcontentloaded" });
    await state.page.waitForFunction(() => document.readyState === "complete", { timeout: 30000 });
    await state.page.waitForFunction(() => window.__lumenIIFEComplete === true, { timeout: 30000 });
    await state.page.waitForLoadState("networkidle", { timeout: 30000 });
    isBooted = true;
  } catch (error) {
    const artifact = await captureFailureArtifact(state, flow.id, "boot");
    const issueId = buildIssue(state, {
      domain: flow.domain,
      step: "bootstrap",
      selector: "#app",
      severity: flow.severity,
      expected: "app page should boot successfully",
      observed: error && error.message ? error.message : "boot failure",
      message: "Boot failure during initial load",
      artifact,
    });
    flow.failedChecks += 1;
    flow.passed = false;
    flow.issueIds.push(issueId);
    if (artifact) flow.artifacts.push(relativePath(state.reportRoot, artifact));
  }

  flow.totalChecks += 1;
  if (isBooted) {
    try {
      await state.page.evaluate(() => {
        document.getElementById("consent-accept")?.click();
        document.getElementById("onboarding-skip")?.click();
      });
      await state.page.waitForTimeout(120);
      const consentVisible = await isVisible(state.page, "#consent-banner");
      if (consentVisible) {
        const artifact = await captureFailureArtifact(state, flow.id, "consent");
        const issueId = buildIssue(state, {
          domain: flow.domain,
          step: "consent-banner",
          selector: "#consent-banner",
          severity: "high",
          expected: "consent banner should be dismissed",
          observed: "consent banner remains visible",
          message: "Consent banner did not close",
          artifact,
        });
        flow.failedChecks += 1;
        flow.passed = false;
        flow.issueIds.push(issueId);
        if (artifact) flow.artifacts.push(relativePath(state.reportRoot, artifact));
      }
    } catch (error) {
      const artifact = await captureFailureArtifact(state, flow.id, "consent");
      const issueId = buildIssue(state, {
        domain: flow.domain,
        step: "consent-interaction",
        selector: "#consent-accept / #onboarding-skip",
        severity: "high",
        expected: "consent controls should be clickable",
        observed: error && error.message ? error.message : "interaction failure",
        message: "Consent/onboarding interaction failed",
        artifact,
      });
      flow.failedChecks += 1;
      flow.passed = false;
      flow.issueIds.push(issueId);
      if (artifact) flow.artifacts.push(relativePath(state.reportRoot, artifact));
    }
  }

  flow.totalChecks += 1;
  if (isBooted) {
    const contentVisible = await isVisible(state.page, "#content-container");
    if (!contentVisible) {
      const artifact = await captureFailureArtifact(state, flow.id, "main-content");
      const issueId = buildIssue(state, {
        domain: flow.domain,
        step: "main-content",
        selector: "#content-container",
        severity: "high",
        expected: "main content container should be visible",
        observed: "main content container is hidden",
        message: "Main content did not become visible",
        artifact,
      });
      flow.failedChecks += 1;
      flow.passed = false;
      flow.issueIds.push(issueId);
      if (artifact) flow.artifacts.push(relativePath(state.reportRoot, artifact));
    }
  }

  return flow;
}

async function runTopTabCoverageFlow(state) {
  const flow = {
    id: "top-tab-coverage",
    label: "Top-tab traversal and view rendering",
    domain: "core",
    severity: "critical",
    passed: true,
    totalChecks: 0,
    failedChecks: 0,
    issueIds: [],
    artifacts: [],
  };

  const tabs = await state.page
    .locator("nav#top-tabs-bar button.top-tab")
    .evaluateAll((nodes) =>
      nodes
        .map((node) => ({
          id: node.id || "",
          tab: node.getAttribute("data-tab") || "",
          label: node.getAttribute("aria-label") || node.textContent || "",
        }))
        .filter((item) => item.id && item.tab),
    );

  if (!tabs.length) {
    const issueId = buildIssue(state, {
      domain: flow.domain,
      step: "top-tab-list",
      selector: "nav#top-tabs-bar button.top-tab",
      severity: "critical",
      expected: "at least one top tab should be present",
      observed: "no top-tab controls found",
      message: "Top-tab bar is empty",
    });
    flow.totalChecks = 1;
    flow.failedChecks = 1;
    flow.passed = false;
    flow.issueIds.push(issueId);
    return flow;
  }

  for (const tab of tabs) {
    flow.totalChecks += 1;
    try {
      await clickById(state.page, tab.id);
      await waitForUiStable(state.page);
      const expectedView = getViewIdForTab(tab.tab);
      const tabInfo = await state.page.evaluate(
        ({ tabId, tabValue, expectedViewId }) => {
          const button = document.getElementById(tabId);
          if (!button) {
            return { active: false, viewId: "", viewExists: false, viewVisible: false };
          }
          const fallbackViewId = tabValue ? `${tabValue}-view` : `${tabId}-view`;
          const view = document.getElementById(expectedViewId) ||
            document.getElementById(fallbackViewId) ||
            document.querySelector(`[data-view='${tabValue}']`);
          if (!view) {
            return {
              active: false,
              viewId: expectedViewId,
              viewExists: false,
              viewVisible: false,
            };
          }
          const style = window.getComputedStyle(view);
          const rect = view.getBoundingClientRect();
          return {
            active: button.classList.contains("active") || button.classList.contains("is-active"),
            viewId: view.id || fallbackViewId,
            viewExists: true,
            viewVisible: style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0,
          };
        },
        { tabId: tab.id, tabValue: tab.tab, expectedViewId: expectedView },
      );

      const viewMatched = tabInfo.viewExists && tabInfo.viewId === expectedView;
      if (!tabInfo.viewExists || !tabInfo.viewVisible || !viewMatched) {
        const artifact = await captureFailureArtifact(state, flow.id, `tab-${tab.id}`);
        const issueId = buildIssue(state, {
          domain: flow.domain,
          step: `top-tab-${tab.id}`,
          selector: `#${tab.id}`,
          severity: flow.severity,
          expected: `${expectedView} should be present and visible`,
          observed: `viewExists=${tabInfo.viewExists}, viewVisible=${tabInfo.viewVisible}, observedId=${tabInfo.viewId || "missing"}`,
          message: `Top tab ${tab.id} did not render expected view`,
          artifact,
        });
        flow.failedChecks += 1;
        flow.passed = false;
        flow.issueIds.push(issueId);
        if (artifact) flow.artifacts.push(relativePath(state.reportRoot, artifact));
      }
      if (!tab.label.trim()) {
        const issueId = buildIssue(state, {
          domain: flow.domain,
          step: `top-tab-${tab.id}-a11y`,
          selector: `#${tab.id}`,
          severity: "high",
          expected: "top-tab should include aria-label",
          observed: "missing aria-label",
          message: "Top tab missing accessibility label",
        });
        flow.failedChecks += 1;
        flow.passed = false;
        flow.issueIds.push(issueId);
      }
      if (!tabInfo.active) {
        const issueId = buildIssue(state, {
          domain: "ui",
          step: `top-tab-${tab.id}-active-state`,
          selector: `#${tab.id}`,
          severity: "low",
          expected: "top-tab should get active state",
          observed: "missing active visual state",
          message: "Top tab active-state is not applied",
        });
        flow.issueIds.push(issueId);
        flow.failedChecks += 1;
        flow.passed = false;
      }
    } catch (error) {
      const artifact = await captureFailureArtifact(state, flow.id, `tab-${tab.id}-exception`);
      const issueId = buildIssue(state, {
        domain: flow.domain,
        step: `top-tab-${tab.id}-exception`,
        selector: `#${tab.id}`,
        severity: "high",
        expected: "tab click and view render",
        observed: error && error.message ? error.message : "exception",
        message: "Top-tab interaction threw",
        artifact,
      });
      flow.failedChecks += 1;
      flow.passed = false;
      flow.issueIds.push(issueId);
      if (artifact) flow.artifacts.push(relativePath(state.reportRoot, artifact));
    }
  }

  return flow;
}

async function runCriticalLearningFlow(state) {
  const flow = {
    id: "critical-learning-flows",
    label: "Critical learning and task flows",
    domain: "core",
    severity: "critical",
    passed: true,
    totalChecks: 0,
    failedChecks: 0,
    issueIds: [],
    artifacts: [],
  };

  const checkpoints = [
    { tabId: "open-trainer", expectedSelectors: ["#trainer-view", "#trainer-quiz-card"] },
    { tabId: "open-study-mode", expectedSelectors: ["#study-mode-view", "#study-card-container"] },
    { tabId: "open-mock-exam", expectedSelectors: ["#mock-exam-view", "#homework-exam-mode"] },
    { tabId: "open-codeblocks", expectedSelectors: ["#codeblocks-view", "#cb-blocks-container"] },
    { tabId: "open-trace", expectedSelectors: ["#trace-view"] },
    { tabId: "open-learning-evidence", expectedSelectors: ["#learning-evidence-view"] },
  ];

  for (const checkpoint of checkpoints) {
    flow.totalChecks += 1;
    try {
      await clickById(state.page, checkpoint.tabId);
      await waitForUiStable(state.page);
      const results = await state.page.evaluate((selectors) => {
        return selectors.map((selector) => {
          const node = document.querySelector(selector);
          if (!node) {
            return { selector, exists: false, visible: false };
          }
          const style = window.getComputedStyle(node);
          return {
            selector,
            exists: true,
            visible: style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0" && node.getBoundingClientRect().height > 0,
          };
        });
      }, checkpoint.expectedSelectors);
      const notVisible = results.filter((item) => !item.visible);
      if (notVisible.length) {
        const artifact = await captureFailureArtifact(state, flow.id, checkpoint.tabId);
        const issueId = buildIssue(state, {
          domain: flow.domain,
          step: `flow-${checkpoint.tabId}`,
          selector: checkpoint.tabId,
          severity: flow.severity,
          expected: `all expected selectors visible: ${checkpoint.expectedSelectors.join(", ")}`,
          observed: `not visible: ${notVisible.map((item) => item.selector).join(", ")}`,
          message: "Critical flow did not render expected view",
          artifact,
        });
        flow.failedChecks += 1;
        flow.passed = false;
        flow.issueIds.push(issueId);
        if (artifact) flow.artifacts.push(relativePath(state.reportRoot, artifact));
      }
    } catch (error) {
      const artifact = await captureFailureArtifact(state, flow.id, `${checkpoint.tabId}-exception`);
      const issueId = buildIssue(state, {
        domain: flow.domain,
        step: `flow-${checkpoint.tabId}-exception`,
        selector: checkpoint.tabId,
        severity: "high",
        expected: "critical flow should open without exception",
        observed: error && error.message ? error.message : "exception",
        message: "Critical flow execution failed",
        artifact,
      });
      flow.failedChecks += 1;
      flow.passed = false;
      flow.issueIds.push(issueId);
      if (artifact) flow.artifacts.push(relativePath(state.reportRoot, artifact));
    }
  }

  flow.totalChecks += 1;
  const taskBoardVisible = await isVisible(state.page, "#hxm-time-plan");
  if (!taskBoardVisible) {
    const issueId = buildIssue(state, {
      domain: "learning",
      step: "task-board",
      selector: "#hxm-time-plan",
      severity: "medium",
      expected: "task board component visible",
      observed: "task board not visible",
      message: "Task board is unavailable after exam flow actions",
    });
    flow.failedChecks += 1;
    flow.passed = false;
    flow.issueIds.push(issueId);
  }

  return flow;
}

async function runMobileFlow(state) {
  const flow = {
    id: "mobile-flow",
    label: "Mobile viewport and responsive behavior",
    domain: "ux",
    severity: "high",
    passed: true,
    totalChecks: 0,
    failedChecks: 0,
    issueIds: [],
    artifacts: [],
  };

  flow.totalChecks += 1;
  await state.page.setViewportSize({ width: 390, height: 844 });
  await state.page.waitForTimeout(120);
  const hasMobileToggle = await isVisible(state.page, "#mobile-toggle");
  if (!hasMobileToggle) {
    const issueId = buildIssue(state, {
      domain: flow.domain,
      step: "mobile-toggle",
      selector: "#mobile-toggle",
      severity: "medium",
      expected: "mobile drawer toggle exists",
      observed: "mobile drawer toggle missing",
      message: "Responsive mobile entry point missing",
    });
    flow.failedChecks += 1;
    flow.passed = false;
    flow.issueIds.push(issueId);
  } else {
    try {
      flow.totalChecks += 1;
      await state.page.locator("#mobile-toggle").click({ force: true });
      await state.page.waitForTimeout(120);
      const drawerOpen = await state.page.evaluate(() => {
        const className = document.body.className || "";
        return className.includes("mobile-context-open") || className.includes("focus-menu-open");
      });
      if (!drawerOpen) {
        const issueId = buildIssue(state, {
          domain: flow.domain,
          step: "mobile-drawer-open",
          selector: "body.mobile-context-open",
          severity: "low",
          expected: "mobile context drawer should open and mark body state",
          observed: "drawer open marker absent",
          message: "Mobile drawer toggle did not set expected body class",
        });
        flow.failedChecks += 1;
        flow.passed = false;
        flow.issueIds.push(issueId);
      }
      await state.page.locator("#mobile-toggle").click({ force: true });
    } catch (error) {
      const artifact = await captureFailureArtifact(state, flow.id, "mobile-toggle");
      const issueId = buildIssue(state, {
        domain: flow.domain,
        step: "mobile-toggle-exception",
        selector: "#mobile-toggle",
        severity: "medium",
        expected: "mobile toggle click should not throw",
        observed: error && error.message ? error.message : "exception",
        message: "Mobile responsive toggle failed",
        artifact,
      });
      flow.failedChecks += 1;
      flow.passed = false;
      flow.issueIds.push(issueId);
      if (artifact) flow.artifacts.push(relativePath(state.reportRoot, artifact));
    }
  }

  flow.totalChecks += 1;
  const tabCount = await state.page.locator("nav#top-tabs-bar button.top-tab").count();
  if (tabCount < 8) {
    const issueId = buildIssue(state, {
      domain: flow.domain,
      step: "mobile-top-tabs",
      selector: "nav#top-tabs-bar button.top-tab",
      severity: "medium",
      expected: "mobile layout should preserve top tabs set",
      observed: `found ${tabCount}`,
      message: "Top-tab count unexpectedly low in mobile viewport",
    });
    flow.failedChecks += 1;
    flow.passed = false;
    flow.issueIds.push(issueId);
  }

  await state.page.setViewportSize({ width: 1280, height: 800 });
  return flow;
}

async function runOfflinePwaFlow(state) {
  const flow = {
    id: "offline-pwa",
    label: "Offline mode smoke",
    domain: "pwa",
    severity: "high",
    passed: true,
    totalChecks: 0,
    failedChecks: 0,
    issueIds: [],
    artifacts: [],
  };

  flow.totalChecks += 1;
  const consoleStartIndex = state.consoleEvents.length;
  try {
    await state.context.setOffline(true);
    await state.page.reload({ waitUntil: "domcontentloaded", timeout: 60000 });
    const stillVisible = await isVisible(state.page, "#content-container");
    if (!stillVisible) {
      const artifact = await captureFailureArtifact(state, flow.id, "offline-content");
      const issueId = buildIssue(state, {
        domain: flow.domain,
        step: "offline-content",
        selector: "#content-container",
        severity: flow.severity,
        expected: "content should remain visible in offline mode",
        observed: "content container hidden",
        message: "Offline reload did not render app shell",
        artifact,
      });
      flow.failedChecks += 1;
      flow.passed = false;
      flow.issueIds.push(issueId);
      if (artifact) flow.artifacts.push(relativePath(state.reportRoot, artifact));
    }
  } catch (error) {
    const artifact = await captureFailureArtifact(state, flow.id, "offline-exception");
    const issueId = buildIssue(state, {
      domain: flow.domain,
      step: "offline-reload",
      selector: "#content-container",
      severity: "medium",
      expected: "offline reload should complete",
      observed: error && error.message ? error.message : "exception",
      message: "Offline scenario failed",
      artifact,
    });
    flow.failedChecks += 1;
    flow.passed = false;
    flow.issueIds.push(issueId);
    if (artifact) flow.artifacts.push(relativePath(state.reportRoot, artifact));
  } finally {
    await state.context.setOffline(false).catch(() => undefined);
    await state.page.goto(state.target.url, { timeout: 60000, waitUntil: "domcontentloaded" }).catch(() => undefined);
    await state.page.waitForFunction(() => window.__lumenIIFEComplete === true, { timeout: 30000 }).catch(() => undefined);
    await state.page.evaluate(() => {
      document.getElementById("consent-accept")?.click();
      document.getElementById("onboarding-skip")?.click();
    }).catch(() => undefined);
    await state.page.waitForTimeout(250).catch(() => undefined);
    state.consoleEvents.splice(consoleStartIndex);
  }

  return flow;
}

async function runAccessibilityFlow(state) {
  const flow = {
    id: "accessibility-basics",
    label: "Accessibility baseline checks",
    domain: "a11y",
    severity: "medium",
    passed: true,
    totalChecks: 0,
    failedChecks: 0,
    issueIds: [],
    artifacts: [],
  };

  const result = await state.page.evaluate(() => {
    const isInteractiveVisible = (el) => {
      if (!el) return false;
      const disabled = el.disabled || el.getAttribute("aria-disabled") === "true";
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return !disabled && style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    };
    const interactive = Array.from(
      document.querySelectorAll(
        "button[aria-label], a[aria-label], input[aria-label], select[aria-label], textarea[aria-label], [role='button'][aria-label], [role='link'][aria-label]",
      ),
    ).filter(isInteractiveVisible);
    const unlabeled = Array.from(
      document.querySelectorAll("button, a, input, select, textarea, [role='button'], [role='link']"),
    )
      .filter(isInteractiveVisible)
      .filter(
        (el) => !(el.getAttribute("aria-label") || "").trim() && !(el.getAttribute("aria-labelledby") || "").trim(),
      )
      .slice(0, 30)
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        id: el.id || "",
        text: (el.textContent || "").trim().slice(0, 72),
      }));
    return {
      labeledInteractive: interactive.length,
      missingCount: unlabeled.length,
      missingSamples: unlabeled.slice(0, 6),
    };
  });

  flow.totalChecks = 1;
  if (result.missingCount > 8) {
    const artifact = await captureFailureArtifact(state, flow.id, "a11y-labels");
    const issueId = buildIssue(state, {
      domain: flow.domain,
      step: "interactive-labels",
      selector: "[role='button'], button, a, input",
      severity: "medium",
      expected: "interactive controls should include accessible labeling",
      observed: `${result.missingCount} interactive controls missing labels`,
      message: "Interactive elements missing a11y labels",
      artifact,
    });
    flow.failedChecks += 1;
    flow.passed = false;
    flow.issueIds.push(issueId);
    if (artifact) flow.artifacts.push(relativePath(state.reportRoot, artifact));
  }

  return flow;
}

async function runConsoleNoiseFlow(state) {
  const flow = {
    id: "console-noise",
    label: "Runtime console noise",
    domain: "runtime",
    severity: "high",
    passed: true,
    totalChecks: 1,
    failedChecks: 0,
    issueIds: [],
    artifacts: [],
  };

  const failures = checkConsoleIssues(state);
  if (failures.length > 0) {
    const byType = failures.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});
    const artifact = await captureFailureArtifact(state, flow.id, "console");
    const issueId = buildIssue(state, {
      domain: flow.domain,
      step: "console",
      selector: "window console",
      severity: flow.severity,
      expected: "no runtime errors or warnings",
      observed: JSON.stringify(byType),
      message: `Console diagnostics found: ${failures.length} warnings/errors`,
      artifact,
    });
    flow.failedChecks = failures.length;
    flow.passed = false;
    flow.issueIds.push(issueId);
    if (artifact) flow.artifacts.push(relativePath(state.reportRoot, artifact));
  }

  return flow;
}

function buildTargetSummary(targetReport) {
  const totalIssues = targetReport.issues.length;
  const bySeverity = targetReport.issues.reduce((acc, issue) => {
    acc[issue.severity] = (acc[issue.severity] || 0) + 1;
    return acc;
  }, {});
  const byDomain = targetReport.issues.reduce((acc, issue) => {
    acc[issue.domain] = (acc[issue.domain] || 0) + 1;
    return acc;
  }, {});
  const blockerKeys = Object.keys(targetReport.severityPolicy || {});
  const blockerCount = targetReport.issues.filter((issue) => {
    const rule = targetReport.severityPolicy[issue.severity];
    return rule && rule.mergeBlock;
  }).length;

  return {
    totalChecks: targetReport.checks.length,
    passedChecks: targetReport.checks.filter((check) => check.passed).length,
    failedChecks: targetReport.checks.filter((check) => !check.passed).length,
    totalIssues,
    blockerCount,
    bySeverity,
    byDomain,
    blockerPolicySeverities: blockerKeys,
  };
}

function resolveTargets(config, targetFilter) {
  const base = Array.isArray(config.targets) ? config.targets : [];
  const resolved = base
    .filter((target) => target && target.name)
    .map((target) => ({
      name: normalizeTargetName(target.name),
      url: normalizeTargetUrl(target.url),
      enabled: target.enabled !== false,
      metadata: target.metadata || {},
    }))
    .filter((target) => target.enabled);

  if (targetFilter) {
    return resolved.filter((target) => target.name === targetFilter);
  }
  return resolved;
}

function buildCommandIssue(state, commandEntry, commandResult) {
  if (commandResult.status === "PASS") {
    return null;
  }
  if (commandResult.status === "ENV_WARNING") {
    return buildIssue(state, {
      domain: commandResult.domain,
      step: `command-${commandResult.id}`,
      selector: commandResult.command,
      severity: commandResult.severity || "low",
      expected: "command should run without infra warning",
      observed: commandResult.environmentStatus,
      message: "command infrastructure/environment unavailable",
      artifact: commandResult.artifact,
    });
  }
  return buildIssue(state, {
    domain: commandResult.domain,
    step: `command-${commandResult.id}`,
    selector: commandResult.command,
    severity: commandResult.severity || "high",
    expected: `${commandEntry.label || commandEntry.id} passes`,
    observed: `exitCode=${commandResult.statusCode}`,
    message: `Command failed: ${commandResult.command}`,
    artifact: commandResult.artifact,
  });
}

function addCheck(targetReport, result, issueIds = []) {
  targetReport.checks.push({
    id: result.id || `command-${targetReport.checks.length + 1}`,
    label: result.label,
    domain: result.domain,
    severity: result.severity || "medium",
    status: result.status === "PASS" ? "PASS" : "FAIL",
    passed: result.status === "PASS",
    totalChecks: result.status === "PASS" ? 1 : 1,
    failedChecks: result.status === "PASS" ? 0 : 1,
    issueIds,
    artifacts: [relativePath(targetReport.reportRoot, result.artifact)].filter(Boolean),
    durationMs: result.durationMs,
    output: result.stdout,
  });
}

async function runTarget(target, config, runContext) {
  const targetName = target.name;
  const runRoot = runContext.runRoot;
  const envRoot = path.join(runRoot, "envs", sanitizeName(targetName));
  const reportRoot = path.join(envRoot, "reports");
  const artifactRoot = path.join(envRoot, "artifacts");

  fs.mkdirSync(reportRoot, { recursive: true });
  fs.mkdirSync(artifactRoot, { recursive: true });

  const state = {
    target,
    screenshotCounter: 0,
    issues: [],
    issuesByFingerprint: new Map(),
    consoleEvents: [],
    artifactsRoot: artifactRoot,
    reportRoot,
    page: null,
    context: null,
    browser: null,
  };

  const report = {
    name: targetName,
    requestedUrl: target.url,
    resolvedUrl: target.url,
    status: "unknown/unavailable",
    checks: [],
    issues: state.issues,
    warnings: [],
    startedAt: nowIso(),
    durationMs: 0,
    severityPolicy: config.severityPolicy || {},
    reportRoot,
    commandResults: [],
  };
  const started = Date.now();

  const available = await probeUrl(target.url);
  if (!available) {
    report.status = "environmentUnavailable";
    report.warnings.push(`target unavailable at ${target.url}`);
    report.durationMs = Date.now() - started;
    report.summary = buildTargetSummary(report);
    report.ready = report.summary.blockerCount === 0;
    const reportPath = path.join(reportRoot, "scan-target.json");
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
    report.reportPath = relativePath(runRoot, reportPath);
    return report;
  }

  const commandEnv = {
    ...process.env,
    SCAN_TARGET: targetName,
    SMOKE_BROWSER_BASE_URL: target.url,
    PLAYWRIGHT_BASE_URL: target.url,
    PLAYWRIGHT_USE_EXISTING_SERVER: "1",
  };

  const commands = Array.isArray(config.commands) ? config.commands : [];
  for (const commandEntry of commands) {
    const entry = {
      ...commandEntry,
      id: commandEntry.id || sanitizeName(commandEntry.command),
    };
    const result = runCommand(entry, commandEnv, runRoot);
    report.commandResults.push(result);
    const issueId = buildCommandIssue(state, entry, result);
    const issueIds = issueId ? [issueId] : [];
    addCheck(
      { ...report, reportRoot },
      {
        ...result,
        label: result.label || `${entry.command} ${entry.args?.join(" ")}`.trim(),
        severity: entry.severity || result.severity,
      },
      issueIds,
    );
    if (issueId && result.environmentStatus === "environmentUnavailable") {
      report.warnings.push(`command ${entry.id}: infrastructure unavailable`);
    }
  }

  try {
    state.browser = await chromium.launch({ headless: true });
    state.context = await state.browser.newContext({ viewport: { width: 1280, height: 800 } });
    state.page = await state.context.newPage();
    state.page.on("console", (msg) => {
      const text = msg.text();
      state.consoleEvents.push({
        type: msg.type(),
        text,
        location: msg.location(),
        time: nowIso(),
      });
    });
    state.page.on("pageerror", (error) => {
      state.consoleEvents.push({
        type: "error",
        text: error && error.message ? error.message : "pageerror",
        location: {},
        time: nowIso(),
      });
    });

    const boot = await runBootConsentFlow(state);
    report.checks.push({
      id: boot.id,
      label: boot.label,
      domain: boot.domain,
      severity: boot.severity,
      status: boot.passed ? "PASS" : "FAIL",
      passed: boot.passed,
      totalChecks: boot.totalChecks,
      failedChecks: boot.failedChecks,
      issueIds: boot.issueIds,
      artifacts: boot.artifacts,
    });

    const configuredFlows = Array.isArray(config.browserUseFlows) ? config.browserUseFlows : [];
    for (const flowId of configuredFlows) {
      const id = String(flowId || "").trim();
      if (!id) continue;
      if (id === boot.id) continue;
      const handler = FLOW_HANDLERS[id];
      if (!handler) {
        report.warnings.push(`unknown flow id in config: ${id}`);
        continue;
      }
      const flow = await handler(state);
      report.checks.push({
        id: flow.id,
        label: flow.label,
        domain: flow.domain,
        severity: flow.severity,
        status: flow.passed ? "PASS" : "FAIL",
        passed: flow.passed,
        totalChecks: flow.totalChecks,
        failedChecks: flow.failedChecks,
        issueIds: flow.issueIds,
        artifacts: flow.artifacts,
      });
    }
  } catch (error) {
    const issueId = buildIssue(state, {
      domain: "runtime",
      step: "runtime-flow",
      selector: "#app",
      severity: "critical",
      expected: "all scan flows execute to completion",
      observed: error && error.message ? error.message : "runtime exception",
      message: "Runtime failure during browser scan",
    });
    report.checks.push({
      id: "runtime-flow",
      label: "Runtime flow execution",
      domain: "runtime",
      severity: "critical",
      status: "FAIL",
      passed: false,
      totalChecks: 1,
      failedChecks: 1,
      issueIds: [issueId],
      artifacts: [],
    });
    report.warnings.push(`runtime error: ${error && error.message ? error.message : "unknown"}`);
  } finally {
    await state.page?.close().catch(() => undefined);
    await state.context?.close().catch(() => undefined);
    await state.browser?.close().catch(() => undefined);
  }

  report.status = "ready";
  report.issues = state.issues.slice();
  report.durationMs = Date.now() - started;
  report.summary = buildTargetSummary(report);
  report.ready = report.summary.blockerCount === 0 && report.warnings.length === 0;

  const reportPath = path.join(reportRoot, "scan-target.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
  report.reportPath = relativePath(runRoot, reportPath);
  return report;
}

function buildCombinedReport(runMetadata, targetReports, strictMode) {
  const combinedIssues = targetReports.flatMap((report) => report.issues || []);
  const totals = {
    targets: targetReports.length,
    checks: targetReports.reduce((acc, report) => acc + (report.checks || []).length, 0),
    passed: targetReports.reduce((acc, report) => acc + (report.summary ? report.summary.passedChecks : 0), 0),
    failed: targetReports.reduce((acc, report) => acc + (report.summary ? report.summary.failedChecks : 0), 0),
    issues: combinedIssues.length,
    bySeverity: {},
    byDomain: {},
  };

  const blockers = [];
  const severityPolicy = runMetadata.config.severityPolicy || {};
  combinedIssues.forEach((issue) => {
    totals.bySeverity[issue.severity] = (totals.bySeverity[issue.severity] || 0) + 1;
    totals.byDomain[issue.domain] = (totals.byDomain[issue.domain] || 0) + 1;
    const policy = severityPolicy[issue.severity] || {};
    if (policy.mergeBlock) {
      blockers.push({
        report: issue.env,
        issueId: issue.id,
        severity: issue.severity,
        domain: issue.domain,
        step: issue.step,
      });
    }
  });

  const unavailableTargets = targetReports.filter((report) => report.status === "environmentUnavailable").length;
  return {
    reportVersion: DEFAULT_REPORT_VERSION,
    runId: runMetadata.runId,
    generatedAt: runMetadata.generatedAt,
    runPath: runMetadata.runPath,
    strictMode,
    scanConfig: runMetadata.configPath,
    targets: targetReports.map((report) => ({
      name: report.name,
      requestedUrl: report.requestedUrl,
      status: report.status,
      summary: report.summary,
      warningCount: report.warnings.length,
    })),
    severityPolicy,
    totals,
    blockerCount: blockers.length,
    blockers,
    issues: combinedIssues.map((issue) => ({ ...issue })),
    ready: blockers.length === 0 && unavailableTargets === 0,
    unavailableTargets,
  };
}

function toMarkdown(report) {
  const lines = [
    "# QA Portal Scan Report",
    "",
    `- Run ID: ${report.runId}`,
    `- Generated: ${report.generatedAt}`,
    `- Ready: ${report.ready ? "Yes" : "No"}`,
    `- Targets: ${report.targets.length}`,
    `- Checks: ${report.totals.passed}/${report.totals.checks}`,
    `- Total issues: ${report.totals.issues}`,
    `- Severity policy: critical=${report.severityPolicy?.critical?.mergeBlock ? "block" : "warn"}, high=${report.severityPolicy?.high?.mergeBlock ? "block" : "warn"}`,
    "",
    "## Severity breakdown",
  ];

  Object.entries(report.totals.bySeverity)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([severity, count]) => {
      lines.push(`- ${severity}: ${count}`);
    });

  lines.push("");
  lines.push("## Domain breakdown");
  Object.entries(report.totals.byDomain)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([domain, count]) => {
      lines.push(`- ${domain}: ${count}`);
    });

  lines.push("");
  lines.push("## Targets");
  report.targets.forEach((target) => {
    lines.push(
      `- ${target.name}: ${target.status} (${target.summary.passedChecks}/${target.summary.totalChecks} checks, issues=${target.summary.totalIssues})`,
    );
  });

  if (report.blockerCount > 0) {
    lines.push("");
    lines.push("## Merge blockers");
    report.blockers.forEach((item) => {
      lines.push(`- [${item.report}] ${item.severity}/${item.domain}: ${item.step}`);
    });
  } else {
    lines.push("");
    lines.push("## Merge blockers");
    lines.push("- none");
  }

  if (report.unavailableTargets > 0) {
    lines.push("");
    lines.push("## Availability");
    lines.push(`- unavailableTargets: ${report.unavailableTargets}`);
  }

  return `${lines.join("\n")}\n`;
}

async function runScan(args, config, artifactsDir) {
  const targets = resolveTargets(config, args.target);
  if (targets.length === 0) {
    throw new Error("No enabled targets were selected.");
  }

  const runId = deterministicRunId(`${targets.map((target) => target.name).join(",")}-${targets.length}`);
  const runPath = path.join(artifactsDir, nowIso().slice(0, 10), runId);
  fs.mkdirSync(runPath, { recursive: true });

  const runMetadata = {
    configPath: args.config,
    runId,
    generatedAt: nowIso(),
    runPath,
  };
  runMetadata.config = config;

  const targetReports = [];
  for (const target of targets) {
    targetReports.push(await runTarget(target, config, { runRoot: runPath, ...args }));
  }

  const combined = buildCombinedReport(
    {
      ...runMetadata,
      configPath: runMetadata.configPath,
      config: config,
    },
    targetReports,
    args.strict,
  );
  const scanJsonPath = path.join(runPath, "scan-combined.json");
  const scanMdPath = path.join(runPath, "scan-combined.md");
  const scanDateDir = path.join(artifactsDir, combined.generatedAt.slice(0, 10));
  const scanDateJsonPath = path.join(scanDateDir, "scan-combined.json");
  const scanDateMdPath = path.join(scanDateDir, "scan-combined.md");
  fs.mkdirSync(scanDateDir, { recursive: true });
  fs.writeFileSync(scanJsonPath, `${JSON.stringify(combined, null, 2)}\n`, "utf8");
  fs.writeFileSync(scanMdPath, toMarkdown(combined), "utf8");
  fs.writeFileSync(scanDateJsonPath, `${JSON.stringify(combined, null, 2)}\n`, "utf8");
  fs.writeFileSync(scanDateMdPath, toMarkdown(combined), "utf8");
  fs.writeFileSync(
    path.join(runPath, "scan-meta.json"),
    JSON.stringify(
      {
        generatedAt: combined.generatedAt,
        runId: combined.runId,
        configPath: path.resolve(args.config),
        scanJsonPath,
        scanMdPath,
        targets: combined.targets.map((target) => target.name),
      },
      null,
      2,
    ),
    "utf8",
  );

  if (args.summary) {
    console.log(
      JSON.stringify(
        {
          runId: combined.runId,
          generatedAt: combined.generatedAt,
          ready: combined.ready,
          blockers: combined.blockerCount,
          targets: combined.targets.length,
          issues: combined.totals.issues,
          checks: `${combined.totals.passed}/${combined.totals.checks}`,
        },
        null,
        2,
      ),
    );
  } else if (args.json) {
    console.log(JSON.stringify(combined, null, 2));
  } else {
    console.log(`Wrote scan reports:\n- ${scanJsonPath}\n- ${scanMdPath}\n- ${scanDateJsonPath}\n- ${scanDateMdPath}`);
  }

  return { combined, paths: { scanJsonPath, scanMdPath, runPath } };
}

function determineExitCode(combined, strictMode) {
  if (!strictMode) {
    return 0;
  }
  return combined.ready ? 0 : 1;
}

async function main() {
  const args = parseArgs();
  if (args.help) {
    console.log(showHelp());
    return;
  }

  const config = readJson(args.config);
  const artifactsDir = path.resolve(args.artifactsDir || path.join(ROOT, CLI_FLAGS.artifactsDir || config.artifactsDir || "output/qa/scan"));

  const result = await runScan(args, config, artifactsDir);
  const exitCode = determineExitCode(result.combined, args.strict);
  process.exitCode = exitCode;
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exitCode = 1;
});
