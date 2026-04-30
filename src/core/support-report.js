import { stableHash } from "./learning-evidence.js";

export const SUPPORT_REPORT_VERSION = "support-report-v1";

const ISSUE_TYPES = new Set(["bug", "content", "ui", "performance", "accessibility", "support"]);
const SEVERITIES = new Set(["low", "medium", "high", "blocking"]);

function safeText(value, max = 240) {
  return String(value || "").trim().slice(0, max);
}

function safeNumber(value, fallback = null) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function safeViewport(value) {
  const viewport = value && typeof value === "object" ? value : {};
  return {
    width: safeNumber(viewport.width, null),
    height: safeNumber(viewport.height, null),
    devicePixelRatio: safeNumber(viewport.devicePixelRatio, null),
  };
}

function normalizeScreenshot(input = {}) {
  const dataUrl = safeText(input.dataUrl, 1_200_000);
  const mediaType = dataUrl.match(/^data:([^;,]+)[;,]/)?.[1] || safeText(input.mediaType, 80);
  return {
    status: dataUrl ? "attached" : "not-attached",
    mediaType: dataUrl ? mediaType || "unknown/unavailable" : "unknown/unavailable",
    filename: safeText(input.filename || "", 180),
    byteLength: dataUrl ? dataUrl.length : 0,
    dataUrl,
  };
}

export function buildSupportContext(input = {}) {
  return {
    route: safeText(input.route || "", 260),
    activeTab: safeText(input.activeTab || "", 90),
    lessonId: safeText(input.lessonId || "", 120),
    lessonTitle: safeText(input.lessonTitle || "", 180),
    conceptKey: safeText(input.conceptKey || "", 220),
    conceptName: safeText(input.conceptName || "", 180),
    viewport: safeViewport(input.viewport),
    appVersion: safeText(input.appVersion || "", 120),
    cacheVersion: safeText(input.cacheVersion || "", 120),
    userAgent: safeText(input.userAgent || "", 260),
  };
}

export function buildSupportReport(input = {}) {
  const type = ISSUE_TYPES.has(input.type) ? input.type : "support";
  const severity = SEVERITIES.has(input.severity) ? input.severity : "medium";
  const context = buildSupportContext(input.context || {});
  const screenshot = normalizeScreenshot(input.screenshot || {});
  const title = safeText(input.title, 180);
  const description = safeText(input.description, 1200);
  const createdAt = safeText(input.createdAt || "", 40);
  const idSeed = [
    type,
    severity,
    title,
    description,
    createdAt,
    context.route,
    context.activeTab,
    context.lessonId,
    context.conceptKey,
    screenshot.status,
    screenshot.byteLength,
  ].join("|");

  return {
    version: SUPPORT_REPORT_VERSION,
    id: `support-${stableHash(idSeed)}`,
    createdAt,
    type,
    severity,
    title,
    description,
    context,
    screenshot,
    privacy: {
      piiRequired: false,
      freeTextIncluded: Boolean(description),
      localOnly: true,
    },
  };
}

export function validateSupportReport(report = {}) {
  const issues = [];
  if (report.version !== SUPPORT_REPORT_VERSION) issues.push("version");
  if (!safeText(report.title, 180)) issues.push("title");
  if (!safeText(report.description, 1200)) issues.push("description");
  if (!report.context || typeof report.context !== "object") issues.push("context");
  if (!report.screenshot || typeof report.screenshot !== "object") issues.push("screenshot");
  return {
    valid: issues.length === 0,
    issues,
  };
}
