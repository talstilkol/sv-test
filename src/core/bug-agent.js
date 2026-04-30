export const BUG_AGENT_VERSION = 1;

function stableHash(input) {
  const text = String(input || "");
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).padStart(7, "0");
}

function safeText(value, max = 220) {
  return String(value ?? "").trim().slice(0, max);
}

function safeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function isoTimestamp(timestamp) {
  const date = new Date(safeNumber(timestamp, Date.now()));
  return Number.isNaN(date.getTime()) ? "unknown/unavailable" : date.toISOString();
}

function normalizeSeverity(value) {
  const severity = safeText(value || "warning", 30).toLowerCase();
  if (severity === "critical" || severity === "error" || severity === "warning" || severity === "info") return severity;
  return "warning";
}

function bugSortWeight(severity) {
  if (severity === "critical") return 0;
  if (severity === "error") return 1;
  if (severity === "warning") return 2;
  return 3;
}

export function normalizeBugFinding(input = {}, { now = Date.now() } = {}) {
  const featureId = safeText(input.featureId || input.feature || "unknown/unavailable", 120);
  const source = safeText(input.source || "bug-agent", 120);
  const title = safeText(input.title || featureId || "unknown/unavailable", 160);
  const evidence = safeText(input.evidence || input.detail || "unknown/unavailable", 220);
  const severity = normalizeSeverity(input.severity);
  const id = `bug-${stableHash([source, featureId, title, evidence].join("|"))}`;
  return {
    id,
    version: BUG_AGENT_VERSION,
    status: "active",
    severity,
    source,
    featureId,
    title,
    detail: safeText(input.detail || evidence, 260),
    evidence,
    action: safeText(input.action || "בדוק את המקור, תקן, ואז הרץ סריקת Bug Agent חוזרת.", 260),
    firstSeen: isoTimestamp(input.firstSeen || now),
    lastSeen: isoTimestamp(input.lastSeen || now),
    occurrences: Math.max(1, safeNumber(input.occurrences, 1)),
  };
}

export function emptyBugAgentLog({ now = Date.now() } = {}) {
  return {
    version: BUG_AGENT_VERSION,
    generatedAt: isoTimestamp(now),
    activeBugs: [],
    lastResolved: [],
    summary: {
      active: 0,
      critical: 0,
      error: 0,
      warning: 0,
      info: 0,
      resolvedThisScan: 0,
      ready: true,
    },
  };
}

function summarize(activeBugs, resolvedThisScan = 0) {
  const summary = {
    active: activeBugs.length,
    critical: activeBugs.filter((bug) => bug.severity === "critical").length,
    error: activeBugs.filter((bug) => bug.severity === "error").length,
    warning: activeBugs.filter((bug) => bug.severity === "warning").length,
    info: activeBugs.filter((bug) => bug.severity === "info").length,
    resolvedThisScan,
    ready: activeBugs.every((bug) => bug.severity !== "critical" && bug.severity !== "error"),
  };
  return summary;
}

export function scanBugSources(sources = {}, { now = Date.now() } = {}) {
  const findings = [];
  const validation = sources.runtimeValidation || null;
  const questionBank = sources.questionBank || {};
  const commandCenter = sources.commandCenter || {};
  const telemetry = sources.telemetry || {};

  if (validation && validation.ready === false) {
    findings.push(normalizeBugFinding({
      source: "runtime-validation",
      featureId: "content-loader",
      severity: safeNumber(validation.blockerCount, 0) > 0 ? "critical" : "warning",
      title: "חוזה תוכן נכשל בזמן ריצה",
      detail: `${safeNumber(validation.blockerCount, 0)} חוסמים · ${safeNumber(validation.warningCount, 0)} אזהרות`,
      evidence: `runtime-validation:${safeNumber(validation.blockerCount, 0)}:${safeNumber(validation.warningCount, 0)}`,
      action: "פתח את דוח content validation, תקן את הפריטים החוסמים והריץ טעינה מחדש.",
    }, { now }));
  }

  const questionKinds = ["mc", "fill", "trace", "bug", "build"];
  const totalQuestions = questionKinds.reduce((sum, kind) =>
    sum + (Array.isArray(questionBank[kind]) ? questionBank[kind].length : 0), 0);
  if (totalQuestions === 0) {
    findings.push(normalizeBugFinding({
      source: "runtime-data",
      featureId: "question-bank",
      severity: "critical",
      title: "בנק השאלות לא נטען",
      detail: "אין אף שאלת MC/Fill/Trace/Bug/Build בזיכרון.",
      evidence: "question-bank:0",
      action: "בדוק טעינת data scripts, content-loader ו-service worker cache.",
    }, { now }));
  }

  const tabPassed = safeNumber(commandCenter.tabPassedCells, null);
  const tabTotal = safeNumber(commandCenter.tabStrictCells, null);
  if (tabTotal && tabPassed !== tabTotal) {
    findings.push(normalizeBugFinding({
      source: "command-center",
      featureId: "tab-matrix",
      severity: "critical",
      title: "Tab matrix לא מלאה",
      detail: `${tabPassed}/${tabTotal} תאי Module×Tab תקינים`,
      evidence: `tab-matrix:${tabPassed}/${tabTotal}`,
      action: "פתח את svcollege:tab-matrix, תקן את התא החסר והריץ את gate שוב.",
    }, { now }));
  }

  const releaseBlockers = safeNumber(commandCenter.releaseBlockers, 0);
  if (releaseBlockers > 0) {
    findings.push(normalizeBugFinding({
      source: "command-center",
      featureId: "release-readiness",
      severity: "critical",
      title: "יש release blockers",
      detail: `${releaseBlockers} חסמים לפני קידום תלמיד/גרסה`,
      evidence: `release-blockers:${releaseBlockers}`,
      action: "טפל במודולים החלשים שמופיעים ב-Command Center.",
    }, { now }));
  }

  (Array.isArray(telemetry.byFeature) ? telemetry.byFeature : []).forEach((item) => {
    const count = safeNumber(item.count, 0);
    if (count <= 0) return;
    const codes = Object.keys(item.codes || {}).sort().join(", ") || "unknown/unavailable";
    findings.push(normalizeBugFinding({
      source: "feature-error-telemetry",
      featureId: item.featureId || "unknown/unavailable",
      severity: "error",
      title: `שגיאות runtime ב-${item.featureId || "unknown/unavailable"}`,
      detail: `${count} אירועי שגיאה · ${codes}`,
      evidence: `feature-error:${item.featureId || "unknown/unavailable"}:${codes}`,
      action: "שחזר את המסך/הפעולה, תקן את מקור השגיאה, ואז ודא שבסריקה הבאה האירוע לא פעיל.",
    }, { now }));
  });

  const byId = new Map();
  findings.forEach((finding) => byId.set(finding.id, finding));
  return [...byId.values()].sort((a, b) =>
    bugSortWeight(a.severity) - bugSortWeight(b.severity) ||
    a.featureId.localeCompare(b.featureId) ||
    a.id.localeCompare(b.id));
}

export function reconcileBugLog(previousLog = {}, findings = [], { now = Date.now() } = {}) {
  const previousActive = new Map(
    (Array.isArray(previousLog.activeBugs) ? previousLog.activeBugs : []).map((bug) => [bug.id, bug]),
  );
  const activeBugs = findings.map((finding) => {
    const previous = previousActive.get(finding.id);
    if (!previous) return finding;
    return {
      ...finding,
      firstSeen: previous.firstSeen || finding.firstSeen,
      lastSeen: isoTimestamp(now),
      occurrences: safeNumber(previous.occurrences, 1) + 1,
    };
  });
  const activeIds = new Set(activeBugs.map((bug) => bug.id));
  const lastResolved = [...previousActive.values()]
    .filter((bug) => !activeIds.has(bug.id))
    .map((bug) => ({
      id: bug.id,
      title: bug.title,
      featureId: bug.featureId,
      resolvedAt: isoTimestamp(now),
    }));

  return {
    version: BUG_AGENT_VERSION,
    generatedAt: isoTimestamp(now),
    activeBugs,
    lastResolved,
    summary: summarize(activeBugs, lastResolved.length),
  };
}

export function runBugAgentScan(sources = {}, previousLog = {}, { now = Date.now() } = {}) {
  const findings = scanBugSources(sources, { now });
  return reconcileBugLog(previousLog, findings, { now });
}
