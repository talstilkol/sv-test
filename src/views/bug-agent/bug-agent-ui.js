(function () {
  "use strict";

  /**
   * @typedef {import("../view-contracts").BugAgentLogContract} BugAgentLogContract
   * @typedef {import("../view-contracts").BugAgentRowContract} BugAgentRowContract
   */

  const root = typeof window !== "undefined" ? window : globalThis;

  const KEYS = Object.freeze({
    bugAgentLog: "lumenportal:bugAgentLog:v1",
  });

  function emptyLog(core) {
    if (core && typeof core.emptyBugAgentLog === "function") return core.emptyBugAgentLog();
    return { version: 1, activeBugs: [], lastResolved: [], summary: { active: 0, ready: true } };
  }

  function loadBugAgentLog({ core, storage, key = KEYS.bugAgentLog, cachedLog = null }) {
    if (!core) return emptyLog(core);
    if (cachedLog) return cachedLog;
    try {
      const parsed = JSON.parse(storage.getItem(key) || "null");
      return parsed && typeof parsed === "object"
        ? {
            ...emptyLog(core),
            ...parsed,
            activeBugs: Array.isArray(parsed.activeBugs) ? parsed.activeBugs : [],
            lastResolved: Array.isArray(parsed.lastResolved) ? parsed.lastResolved : [],
          }
        : emptyLog(core);
    } catch (_) {
      return emptyLog(core);
    }
  }

  function saveBugAgentLog({ storage, key = KEYS.bugAgentLog, log }) {
    try {
      storage.setItem(key, JSON.stringify(log || { activeBugs: [] }));
      return true;
    } catch (_) {
      return false;
    }
  }

  function bugAgentSources({ runtime = root, telemetry, commandCenter = {} }) {
    return {
      runtimeValidation: runtime.LUMEN_CONTENT_VALIDATION || null,
      questionBank: runtime.QUESTIONS_BANK || {},
      telemetry,
      commandCenter,
    };
  }

  function runBugAgent({ core, sources, previousLog, now }) {
    if (!core || typeof core.runBugAgentScan !== "function") return previousLog || emptyLog(core);
    return core.runBugAgentScan(sources, previousLog || emptyLog(core), { now });
  }

  /** @param {{ log: BugAgentLogContract, esc: (value: unknown) => string }} input */
  function renderBugAgentLog({ log, esc }) {
    const escape = typeof esc === "function" ? esc : (value) => String(value ?? "");
    const activeBugs = Array.isArray(log && log.activeBugs) ? log.activeBugs : [];
    const resolved = Array.isArray(log && log.lastResolved) ? log.lastResolved : [];
    const summary = (log && log.summary) || {};
    const statusText = activeBugs.length ? `${activeBugs.length} באגים פעילים` : "אין באגים פעילים";
    const readyClass = activeBugs.length ? "watch" : "pass";
    return `
      <section class="blueprint-feature-health bug-agent-panel" data-bug-agent-log="active" aria-label="Bug Agent automatic log">
        <div class="blueprint-feature-health-head">
          <div>
            <span class="blueprint-command-kicker">Bug Agent</span>
            <h4>סוכן איתור באגים אוטומטי</h4>
            <p>סריקה דטרמיניסטית של runtime validation, בנק שאלות, tab matrix, release blockers ושגיאות פיצ'רים. באג שתוקן נעלם מהלוג בסריקה הבאה.</p>
          </div>
          <strong class="${escape(readyClass)}">${escape(statusText)}</strong>
        </div>
        <div class="blueprint-feature-health-grid bug-agent-summary">
          <div class="blueprint-health-check ${activeBugs.length ? "watch" : "pass"}">
            <span>Active</span>
            <strong>${escape(summary.active || 0)}</strong>
            <small>נשמר ב-localStorage</small>
          </div>
          <div class="blueprint-health-check ${summary.critical ? "blocked" : "pass"}">
            <span>Critical</span>
            <strong>${escape(summary.critical || 0)}</strong>
            <small>חוסם שחרור/למידה</small>
          </div>
          <div class="blueprint-health-check ${summary.error ? "watch" : "pass"}">
            <span>Runtime errors</span>
            <strong>${escape(summary.error || 0)}</strong>
            <small>מתוך feature telemetry</small>
          </div>
          <div class="blueprint-health-check ${resolved.length ? "pass" : "watch"}">
            <span>Resolved this scan</span>
            <strong>${escape(summary.resolvedThisScan || 0)}</strong>
            <small>נמחקו מהלוג הפעיל</small>
          </div>
        </div>
        <div class="bug-agent-list">
          ${activeBugs.length ? activeBugs.slice(0, 8).map((bug) => `
<article class="bug-agent-row ${escape(bug.severity)}" data-bug-agent-id="${escape(bug.id)}">
<div>
<strong>${escape(bug.title)}</strong>
<p>${escape(bug.detail)}</p>
</div>
<div>
<span>${escape(bug.severity)} · ${escape(bug.featureId)}</span>
<small>${escape(bug.action)}</small>
</div>
</article>
`).join("") : `<div class="le-empty">הלוג הפעיל נקי. אם יחזור runtime error או gate חסום, הסוכן יוסיף אותו אוטומטית.</div>`}
        </div>
        ${resolved.length ? `
<div class="bug-agent-resolved">
<strong>נפתרו ונמחקו מהלוג הפעיל בסריקה זו</strong>
${resolved.slice(0, 6).map((bug) => `<span>${escape(bug.title)} · ${escape(bug.featureId)}</span>`).join("")}
</div>
` : ""}
      </section>
    `;
  }

  root.LumenBugAgentUI = {
    KEYS,
    emptyLog,
    loadBugAgentLog,
    saveBugAgentLog,
    bugAgentSources,
    runBugAgent,
    renderBugAgentLog,
  };
})();
