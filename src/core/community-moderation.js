import {
  authUserIdFromAccessToken,
  normalizeSupabaseSyncConfig,
} from "./progress-sync.js";

export const COMMUNITY_MODERATION_VERSION = 1;
export const THREAD_MODERATION_ACTIONS = Object.freeze(["lock_thread", "unlock_thread", "hide_thread", "restore_thread"]);
export const POST_MODERATION_ACTIONS = Object.freeze(["hide_post", "restore_post"]);
export const MODERATION_ACTIONS = Object.freeze([...THREAD_MODERATION_ACTIONS, ...POST_MODERATION_ACTIONS]);

function safeText(value, max = 240) {
  return String(value ?? "").trim().slice(0, max);
}

function safeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.trunc(number) : 0;
}

function headers(config, prefer = "") {
  const result = {
    apikey: config.anonKey,
    Authorization: `Bearer ${config.accessToken}`,
    "Content-Type": "application/json",
  };
  if (prefer) result.Prefer = prefer;
  return result;
}

function reportsUrl(config, query = "") {
  return `${config.url}/rest/v1/concept_discussion_reports${query}`;
}

function moderationRpcUrl(config) {
  return `${config.url}/rest/v1/rpc/apply_concept_discussion_moderation`;
}

function normalizeTarget({ threadId = "", postId = "" } = {}) {
  const target = {
    threadId: safeText(threadId, 120),
    postId: safeText(postId, 120),
  };
  const hasThread = Boolean(target.threadId);
  const hasPost = Boolean(target.postId);
  return {
    ...target,
    valid: hasThread !== hasPost,
    errors: hasThread === hasPost ? ["moderation-target-required"] : [],
  };
}

export function normalizeReportDraft({ threadId = "", postId = "", reason = "" } = {}) {
  const target = normalizeTarget({ threadId, postId });
  const draft = {
    threadId: target.threadId,
    postId: target.postId,
    reason: safeText(reason, 1000),
  };
  const errors = [
    ...target.errors,
    ...(draft.reason ? [] : ["moderation-reason-required"]),
  ];
  return {
    ...draft,
    valid: errors.length === 0,
    errors,
  };
}

export function normalizeModerationAction({ threadId = "", postId = "", action = "", reason = "" } = {}) {
  const target = normalizeTarget({ threadId, postId });
  const safeAction = safeText(action, 80);
  const validAction = target.threadId
    ? THREAD_MODERATION_ACTIONS.includes(safeAction)
    : POST_MODERATION_ACTIONS.includes(safeAction);
  const draft = {
    threadId: target.threadId,
    postId: target.postId,
    action: validAction ? safeAction : "",
    reason: safeText(reason, 1000),
  };
  const errors = [
    ...target.errors,
    ...(draft.action ? [] : ["moderation-action-invalid"]),
    ...(draft.reason ? [] : ["moderation-reason-required"]),
  ];
  return {
    ...draft,
    valid: errors.length === 0,
    errors,
  };
}

export function normalizeModerationReport(row = {}) {
  return {
    id: safeText(row.id, 120),
    threadId: safeText(row.thread_id, 120),
    postId: safeText(row.post_id, 120),
    reporterId: safeText(row.reporter_id, 120),
    reason: safeText(row.reason || "unknown/unavailable", 1000),
    status: safeText(row.status || "unknown/unavailable", 40),
    createdAt: safeText(row.created_at || "unknown/unavailable", 80),
  };
}

export function normalizeModerationResult(row = {}, fallback = {}) {
  return {
    version: COMMUNITY_MODERATION_VERSION,
    actionId: safeText(row.action_id, 120),
    threadId: safeText(row.thread_id || fallback.threadId, 120),
    postId: safeText(row.post_id || fallback.postId, 120),
    action: safeText(row.action || fallback.action, 80),
    newStatus: safeText(row.new_status || "unknown/unavailable", 40),
    createdAt: safeText(row.created_at || "unknown/unavailable", 80),
  };
}

export async function reportDiscussionTarget({ config, threadId = "", postId = "", reason = "", fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Discussion reporting requires Supabase URL, anon key, and authenticated access token.");
  }
  const reporterId = authUserIdFromAccessToken(readyConfig.accessToken);
  if (!reporterId) throw new Error("Discussion reporting requires an authenticated access token with a UUID subject.");
  const draft = normalizeReportDraft({ threadId, postId, reason });
  if (!draft.valid) throw new Error(`Discussion report blocked: ${draft.errors.join(", ")}`);
  const response = await fetchImpl(reportsUrl(readyConfig), {
    method: "POST",
    headers: headers(readyConfig, "return=representation"),
    body: JSON.stringify({
      thread_id: draft.threadId || null,
      post_id: draft.postId || null,
      reporter_id: reporterId,
      reason: draft.reason,
    }),
  });
  if (!response.ok) throw new Error(`Supabase discussion report failed: ${response.status}`);
  const rows = await response.json().catch(() => []);
  return {
    version: COMMUNITY_MODERATION_VERSION,
    report: normalizeModerationReport(Array.isArray(rows) ? rows[0] : {}),
  };
}

export async function fetchModerationReports({ config, status = "open", limit = 20, fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Moderation report queue requires Supabase URL, anon key, and authenticated access token.");
  }
  const safeStatus = safeText(status, 40);
  const safeLimit = Math.min(100, Math.max(1, safeNumber(limit) || 20));
  const query = [
    ...(safeStatus && safeStatus !== "all" ? [`status=eq.${encodeURIComponent(safeStatus)}`] : []),
    "select=id,thread_id,post_id,reporter_id,reason,status,created_at",
    "order=created_at.desc",
    `limit=${safeLimit}`,
  ].join("&");
  const response = await fetchImpl(reportsUrl(readyConfig, `?${query}`), {
    method: "GET",
    headers: headers(readyConfig),
  });
  if (!response.ok) throw new Error(`Supabase moderation report queue failed: ${response.status}`);
  const rows = await response.json();
  const reports = Array.isArray(rows) ? rows.map(normalizeModerationReport) : [];
  return {
    version: COMMUNITY_MODERATION_VERSION,
    status: safeStatus || "all",
    totalReports: reports.length,
    reports,
  };
}

export async function applyDiscussionModeration({ config, threadId = "", postId = "", action = "", reason = "", fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Discussion moderation requires Supabase URL, anon key, and authenticated access token.");
  }
  const moderatorId = authUserIdFromAccessToken(readyConfig.accessToken);
  if (!moderatorId) throw new Error("Discussion moderation requires an authenticated access token with a UUID subject.");
  const draft = normalizeModerationAction({ threadId, postId, action, reason });
  if (!draft.valid) throw new Error(`Discussion moderation blocked: ${draft.errors.join(", ")}`);
  const response = await fetchImpl(moderationRpcUrl(readyConfig), {
    method: "POST",
    headers: headers(readyConfig, "return=representation"),
    body: JSON.stringify({
      target_thread_id: draft.threadId || null,
      target_post_id: draft.postId || null,
      moderation_action: draft.action,
      moderation_reason: draft.reason,
    }),
  });
  if (!response.ok) throw new Error(`Supabase discussion moderation failed: ${response.status}`);
  const rows = await response.json().catch(() => []);
  const row = Array.isArray(rows) ? rows[0] : rows;
  return {
    moderatorId,
    ...normalizeModerationResult(row, draft),
  };
}
