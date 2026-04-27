// lib/code-runner.js — P1.4.1
// Sandboxed JS code execution via <iframe srcdoc> + postMessage.
// No external dependencies — works with vanilla JS.
//
// Usage:
//   const runner = new CodeRunner(containerEl);
//   runner.run(codeString)  → returns Promise<{logs: [], errors: []}>
//
// Security: iframe is sandboxed (sandbox="allow-scripts") — no DOM access
// to parent, no top-frame navigation, no popups, no forms. Code can't
// escape the iframe; worst case it crashes its own iframe.

(function (root) {
  "use strict";

  const RUNNER_TIMEOUT_MS = 5000;

  function buildHTML(code, runId) {
    // Wrap user code with a try/catch and console capture.
    // Send results back via postMessage to parent.
    return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<script>
(function() {
  const logs = [];
  const errors = [];
  const RUN_ID = ${JSON.stringify(runId)};

  function fmt(args) {
    return Array.from(args).map(a => {
      try {
        if (a === undefined) return 'undefined';
        if (a === null) return 'null';
        if (typeof a === 'object') return JSON.stringify(a);
        if (typeof a === 'function') return a.toString();
        return String(a);
      } catch (_) { return String(a); }
    }).join(' ');
  }

  // Override console
  const orig = window.console || {};
  ['log','info','warn','error','debug'].forEach(method => {
    window.console = window.console || {};
    window.console[method] = function() {
      logs.push({ level: method, text: fmt(arguments), t: Date.now() });
    };
  });

  // Capture errors
  window.addEventListener('error', e => {
    errors.push({
      message: e.message,
      line: e.lineno,
      col: e.colno
    });
  });
  window.addEventListener('unhandledrejection', e => {
    errors.push({ message: 'Unhandled promise rejection: ' + (e.reason?.message || e.reason) });
  });

  // Run user code
  try {
    ${code}
  } catch (err) {
    errors.push({ message: err.message, stack: err.stack });
  }

  // Allow async code to settle, then report
  setTimeout(() => {
    parent.postMessage({ runId: RUN_ID, logs, errors }, '*');
  }, 100);
})();
<\/script></head><body></body></html>`;
  }

  function CodeRunner(container) {
    this.container = container;
    this._runCounter = 0;
  }

  CodeRunner.prototype.run = function (code) {
    const self = this;
    const runId = `run-${Date.now()}-${++this._runCounter}`;
    return new Promise((resolve) => {
      // Remove old iframe
      const old = self.container.querySelector("iframe.code-runner-iframe");
      if (old) old.remove();

      const iframe = document.createElement("iframe");
      iframe.className = "code-runner-iframe";
      iframe.setAttribute("sandbox", "allow-scripts");
      iframe.style.cssText =
        "width:100%;height:0;border:0;visibility:hidden;position:absolute;";
      iframe.srcdoc = buildHTML(code, runId);

      let resolved = false;
      const cleanup = () => {
        window.removeEventListener("message", onMessage);
        try { iframe.remove(); } catch (_) {}
      };
      const onMessage = (e) => {
        if (!e.data || e.data.runId !== runId) return;
        resolved = true;
        cleanup();
        resolve({ logs: e.data.logs || [], errors: e.data.errors || [] });
      };
      window.addEventListener("message", onMessage);

      // Timeout fallback
      setTimeout(() => {
        if (resolved) return;
        cleanup();
        resolve({
          logs: [],
          errors: [
            {
              message: `Code execution timed out after ${RUNNER_TIMEOUT_MS}ms`,
            },
          ],
        });
      }, RUNNER_TIMEOUT_MS);

      self.container.appendChild(iframe);
    });
  };

  CodeRunner.prototype.dispose = function () {
    const ifr = this.container.querySelector("iframe.code-runner-iframe");
    if (ifr) ifr.remove();
  };

  // ---- export ----
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { CodeRunner };
  }
  if (root) {
    root.CodeRunner = CodeRunner;
  }
})(typeof window !== "undefined" ? window : globalThis);
