export const PROGRESS_SYNC_VERSION = 1;

export const PROGRESS_SYNC_ROW = Object.freeze({
  table: "user_progress",
  lessonId: "__lumenportal__",
  concept: "progress_snapshot_v2",
});

function safeText(value, max = 4000) {
  return String(value ?? "").trim().slice(0, max);
}

function safeIsoTimestamp(value) {
  const date = value instanceof Date ? value : new Date(value || Date.now());
  return Number.isNaN(date.getTime()) ? new Date(0).toISOString() : date.toISOString();
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value ?? null));
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort((a, b) => a.localeCompare(b))
      .reduce((acc, key) => {
        if (key === "exportedAt") return acc;
        acc[key] = stableValue(value[key]);
        return acc;
      }, {});
  }
  return value;
}

function stableJson(value) {
  return JSON.stringify(stableValue(value));
}

function stableHash(input) {
  let hash = 2166136261;
  const text = String(input || "");
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).padStart(7, "0");
}

export function progressFingerprint(snapshot = {}) {
  return stableHash(stableJson(snapshot));
}

export function buildSyncPayload(
  snapshot = {},
  { profileId = "", updatedAt = Date.now(), appVersion = "" } = {},
) {
  const safeSnapshot = cloneJson(snapshot);
  return {
    version: PROGRESS_SYNC_VERSION,
    profileId: safeText(profileId || safeSnapshot?.profile?.id, 160),
    appVersion: safeText(appVersion, 80),
    updatedAt: safeIsoTimestamp(updatedAt),
    fingerprint: progressFingerprint(safeSnapshot),
    snapshot: safeSnapshot,
  };
}

function timestampMs(value) {
  const time = Date.parse(safeText(value, 80));
  return Number.isFinite(time) ? time : 0;
}

export function resolveLastWriteWins({ localPayload = null, remotePayload = null } = {}) {
  if (!remotePayload && !localPayload) {
    return {
      winner: "none",
      action: "noop",
      payload: null,
      reason: "no-local-or-remote-progress",
    };
  }
  if (!remotePayload) {
    return {
      winner: "local",
      action: "push",
      payload: localPayload,
      reason: "remote-progress-missing",
    };
  }
  if (!localPayload) {
    return {
      winner: "remote",
      action: "pull",
      payload: remotePayload,
      reason: "local-progress-missing",
    };
  }

  const localTime = timestampMs(localPayload.updatedAt);
  const remoteTime = timestampMs(remotePayload.updatedAt);
  if (remoteTime > localTime) {
    return {
      winner: "remote",
      action: "pull",
      payload: remotePayload,
      reason: "remote-updated-after-local",
    };
  }
  if (localTime > remoteTime) {
    return {
      winner: "local",
      action: "push",
      payload: localPayload,
      reason: "local-updated-after-remote",
    };
  }
  if (localPayload.fingerprint === remotePayload.fingerprint) {
    return {
      winner: "equal",
      action: "noop",
      payload: localPayload,
      reason: "matching-fingerprints",
    };
  }
  return {
    winner: "local",
    action: "push",
    payload: localPayload,
    reason: "same-timestamp-local-tie-break",
  };
}

export function normalizeSupabaseUrl(value = "") {
  const raw = safeText(value, 500).replace(/\/+$/g, "");
  if (!raw) return "";
  try {
    const url = new URL(raw);
    const isLocalhost = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
    if (url.protocol !== "https:" && !(url.protocol === "http:" && isLocalhost)) return "";
    return url.toString().replace(/\/+$/g, "");
  } catch (_) {
    return "";
  }
}

export function normalizeSupabaseSyncConfig(config = {}) {
  const normalized = {
    url: normalizeSupabaseUrl(config.url || config.supabaseUrl),
    anonKey: safeText(config.anonKey || config.apikey || config.apiKey, 5000),
    accessToken: safeText(config.accessToken || config.jwt, 5000),
  };
  return {
    ...normalized,
    ready: Boolean(normalized.url && normalized.anonKey && normalized.accessToken),
  };
}

function decodeBase64Url(value) {
  const padded = safeText(value, 12000).replace(/-/g, "+").replace(/_/g, "/");
  const normalized = `${padded}${"=".repeat((4 - (padded.length % 4)) % 4)}`;
  if (!normalized) return "";
  if (typeof atob === "function") return atob(normalized);
  if (typeof Buffer !== "undefined") return Buffer.from(normalized, "base64").toString("utf8");
  return "";
}

export function authUserIdFromAccessToken(accessToken = "") {
  const parts = safeText(accessToken, 12000).split(".");
  if (parts.length < 2) return "";
  try {
    const payload = JSON.parse(decodeBase64Url(parts[1]));
    const subject = safeText(payload.sub, 80);
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(subject)
      ? subject
      : "";
  } catch (_) {
    return "";
  }
}

function assertReadyConfig(config) {
  const normalized = normalizeSupabaseSyncConfig(config);
  if (!normalized.ready) {
    throw new Error("Supabase sync requires project URL, anon key, and authenticated access token.");
  }
  return normalized;
}

function supabaseRestUrl(config, query = "") {
  const table = encodeURIComponent(PROGRESS_SYNC_ROW.table);
  return `${config.url}/rest/v1/${table}${query}`;
}

function supabaseHeaders(config, prefer = "") {
  const headers = {
    apikey: config.anonKey,
    Authorization: `Bearer ${config.accessToken}`,
    "Content-Type": "application/json",
  };
  if (prefer) headers.Prefer = prefer;
  return headers;
}

function normalizeRemotePayload(rawPayload, rowUpdatedAt = "") {
  if (!rawPayload || typeof rawPayload !== "object") return null;
  const payload = cloneJson(rawPayload);
  if (!payload.updatedAt && rowUpdatedAt) payload.updatedAt = safeIsoTimestamp(rowUpdatedAt);
  if (!payload.fingerprint && payload.snapshot) payload.fingerprint = progressFingerprint(payload.snapshot);
  return payload;
}

export async function fetchRemoteProgress({ config, fetchImpl = fetch } = {}) {
  const readyConfig = assertReadyConfig(config);
  const query = [
    `lesson_id=eq.${encodeURIComponent(PROGRESS_SYNC_ROW.lessonId)}`,
    `concept=eq.${encodeURIComponent(PROGRESS_SYNC_ROW.concept)}`,
    "select=scores_json,updated_at",
    "limit=1",
  ].join("&");
  const response = await fetchImpl(supabaseRestUrl(readyConfig, `?${query}`), {
    method: "GET",
    headers: supabaseHeaders(readyConfig),
  });
  if (!response.ok) {
    throw new Error(`Supabase progress fetch failed: ${response.status}`);
  }
  const rows = await response.json();
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!row) return null;
  return {
    rowUpdatedAt: safeIsoTimestamp(row.updated_at),
    payload: normalizeRemotePayload(row.scores_json, row.updated_at),
  };
}

export async function upsertRemoteProgress({ config, payload, fetchImpl = fetch } = {}) {
  const readyConfig = assertReadyConfig(config);
  const userId = safeText(config.userId, 80) || authUserIdFromAccessToken(readyConfig.accessToken);
  if (!userId) {
    throw new Error("Supabase sync requires an authenticated access token with a UUID subject.");
  }
  const safePayload = cloneJson(payload);
  const response = await fetchImpl(
    supabaseRestUrl(readyConfig, "?on_conflict=user_id,lesson_id,concept"),
    {
      method: "POST",
      headers: supabaseHeaders(readyConfig, "resolution=merge-duplicates,return=representation"),
      body: JSON.stringify({
        user_id: userId,
        lesson_id: PROGRESS_SYNC_ROW.lessonId,
        concept: PROGRESS_SYNC_ROW.concept,
        scores_json: safePayload,
      }),
    },
  );
  if (!response.ok) {
    throw new Error(`Supabase progress upsert failed: ${response.status}`);
  }
  const rows = await response.json().catch(() => []);
  const row = Array.isArray(rows) ? rows[0] : null;
  return {
    rowUpdatedAt: row?.updated_at ? safeIsoTimestamp(row.updated_at) : safePayload.updatedAt,
    payload: row?.scores_json ? normalizeRemotePayload(row.scores_json, row.updated_at) : safePayload,
  };
}
