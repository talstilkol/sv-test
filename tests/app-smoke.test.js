// tests/app-smoke.test.js
//
// Smoke test that catches the bug class that hit the funny-bhabha branch
// twice — TDZ violations in the app.js DOMContentLoaded IIFE.
//
// HOW THIS WORKS:
//   1. Read index.html and collect every <script src=...> in document order.
//   2. Build a vm sandbox that holds enough of a browser to run the IIFE:
//      - window/document are happy-dom (provided by the vitest environment)
//      - localStorage, sessionStorage, navigator stubs
//   3. Evaluate each script in the same vm context, in order. Capture parse
//      errors per file and any runtime exceptions.
//   4. Dispatch DOMContentLoaded so app.js's main IIFE actually runs (happy-dom
//      doesn't fire it for scripts that were eval'd outside the parser path).
//   5. Assert: no parse errors, no IIFE error sentinel, and bank globals
//      populated by the data files.
//
// WHAT THIS CATCHES:
//   - SyntaxError in any data file or app.js (would have caught commit 0e45c23)
//   - Duplicate `const` in same scope causing TDZ (would have caught commit
//     322a148 — the funny-bhabha incident)
//   - ReferenceError during initial bootstrap
//   - Missing functions that other scripts depend on
//
// WHAT THIS DOES NOT CATCH:
//   - Runtime visual glitches (use Playwright for that)
//   - Service-worker behavior (different test class)
//   - Mobile-only bugs (different viewport)

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const INDEX_PATH = path.join(ROOT, "index.html");

// Skip these scripts — they reference browser-only APIs (CDNs, service worker
// registration paths) that we don't need to exercise here.
const SCRIPT_SKIP_PATTERNS = [
  /^https?:\/\//,
  /^\/\//,
];

function readScriptSrcs(html) {
  // Match the WHOLE <script ... src="..." ...> tag so we can also see attributes
  // like `type="module"` that mark ES-module scripts (which need a different
  // loader and aren't part of the legacy IIFE bootstrap path).
  const out = [];
  const tagRe = /<script\b([^>]*)>/gi;
  let m;
  while ((m = tagRe.exec(html)) !== null) {
    const attrs = m[1];
    const srcMatch = attrs.match(/\ssrc=["']([^"']+)["']/i);
    if (!srcMatch) continue;
    const src = srcMatch[1];
    if (SCRIPT_SKIP_PATTERNS.some((p) => p.test(src))) continue;
    if (/\stype=["']module["']/i.test(attrs)) continue;
    out.push(src);
  }
  return out;
}

function buildSandbox() {
  // Minimal browser-shaped object. happy-dom's window provides most of the
  // DOM-y bits; we layer localStorage, navigator, and listener tracking on top.
  const localStorageStore = {};
  const sandbox = {
    console,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    queueMicrotask,
    requestAnimationFrame: (fn) => setTimeout(fn, 16),
    cancelAnimationFrame: (id) => clearTimeout(id),
    Date,
    Math,
    JSON,
    Promise,
    Error,
    TypeError,
    RangeError,
    Object,
    Array,
    String,
    Number,
    Boolean,
    Map,
    Set,
    WeakMap,
    WeakSet,
    Symbol,
    RegExp,
    URLSearchParams,
    URL,
    location: { href: "http://localhost/", pathname: "/", search: "", hash: "" },
    navigator: { userAgent: "smoke", language: "he", onLine: true, serviceWorker: undefined },
    localStorage: {
      getItem: (k) => (k in localStorageStore ? localStorageStore[k] : null),
      setItem: (k, v) => { localStorageStore[k] = String(v); },
      removeItem: (k) => { delete localStorageStore[k]; },
      clear: () => { for (const k of Object.keys(localStorageStore)) delete localStorageStore[k]; },
      key: (i) => Object.keys(localStorageStore)[i] || null,
      get length() { return Object.keys(localStorageStore).length; },
    },
    sessionStorage: {
      getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {},
      key: () => null, length: 0,
    },
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    fetch: () => Promise.reject(new Error("fetch not available in smoke")),
  };

  // document with addEventListener that captures DOMContentLoaded.
  const docListeners = [];
  sandbox.document = {
    readyState: "loading",
    addEventListener(type, fn) {
      if (type === "DOMContentLoaded") docListeners.push(fn);
    },
    removeEventListener() {},
    createElement: () => ({ classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, appendChild() {}, addEventListener() {}, querySelectorAll: () => [], querySelector: () => null, style: {} }),
    body: { appendChild() {}, classList: { add() {}, remove() {}, toggle() {} } },
    documentElement: { setAttribute() {}, classList: { add() {}, remove() {}, toggle() {} }, dir: "rtl", lang: "he" },
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    dispatchEvent: () => true,
  };

  // window points to the sandbox itself (so window.X === sandbox.X).
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.globalThis = sandbox;

  // Window-level event listeners.
  const winListeners = {};
  sandbox.addEventListener = (type, fn) => {
    if (!winListeners[type]) winListeners[type] = [];
    winListeners[type].push(fn);
  };
  sandbox.removeEventListener = () => {};
  sandbox.dispatchEvent = (event) => {
    const list = winListeners[event.type] || [];
    list.forEach((fn) => { try { fn(event); } catch {} });
    return true;
  };

  // Helper for the test to fire DOMContentLoaded.
  sandbox.__fireDOMContentLoaded = () => {
    sandbox.document.readyState = "complete";
    docListeners.forEach((fn) => fn());
  };

  return sandbox;
}

function evalScript(sandbox, src) {
  const cleanSrc = src.split("?")[0].replace(/^\//, "");
  const fullPath = path.join(ROOT, cleanSrc);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Script not found: ${cleanSrc}`);
  }
  const code = fs.readFileSync(fullPath, "utf8");
  vm.runInNewContext(code, sandbox, { filename: cleanSrc });
}

describe("app smoke (TDZ catcher)", () => {
  it("loads index.html scripts without parse / TDZ errors", () => {
    const html = fs.readFileSync(INDEX_PATH, "utf8");
    const scripts = readScriptSrcs(html);
    expect(scripts.length).toBeGreaterThan(50);

    const sandbox = buildSandbox();
    const errors = [];
    for (const src of scripts) {
      try {
        evalScript(sandbox, src);
      } catch (err) {
        errors.push({ src, message: err.message, stack: err.stack?.split("\n")[1] || "" });
      }
    }

    // Surface any script that failed to parse/execute.
    if (errors.length > 0) {
      const summary = errors
        .slice(0, 5)
        .map((e) => `  ✗ ${e.src}: ${e.message}`)
        .join("\n");
      throw new Error(
        `${errors.length} of ${scripts.length} scripts failed to evaluate:\n${summary}` +
          (errors.length > 5 ? `\n  ... and ${errors.length - 5} more` : ""),
      );
    }

    // Bank globals must have been populated by the data files.
    expect(sandbox.QUESTIONS_BANK).toBeDefined();
    expect(sandbox.QUESTIONS_BANK.mc?.length).toBeGreaterThanOrEqual(2000);
    expect(sandbox.QUESTIONS_BANK.fill?.length).toBeGreaterThanOrEqual(1000);
    expect(sandbox.LESSONS_DATA?.length).toBeGreaterThanOrEqual(29);
    expect(sandbox.QUESTIONS_TRACE?.length).toBeGreaterThanOrEqual(500);
  });
});
