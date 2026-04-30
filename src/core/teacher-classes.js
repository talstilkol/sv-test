import {
  authUserIdFromAccessToken,
  normalizeSupabaseSyncConfig,
} from "./progress-sync.js";

export const TEACHER_CLASS_VERSION = 1;
export const DEFAULT_COURSE_KEY = "svcollege_fullstack_ai";

function safeText(value, max = 240) {
  return String(value ?? "").trim().slice(0, max);
}

function classRestUrl(config, query = "") {
  return `${config.url}/rest/v1/classes${query}`;
}

function classHeaders(config, prefer = "") {
  const headers = {
    apikey: config.anonKey,
    Authorization: `Bearer ${config.accessToken}`,
    "Content-Type": "application/json",
  };
  if (prefer) headers.Prefer = prefer;
  return headers;
}

export function normalizeClassDraft({ name = "", courseKey = DEFAULT_COURSE_KEY } = {}) {
  const draft = {
    name: safeText(name, 120),
    courseKey: safeText(courseKey || DEFAULT_COURSE_KEY, 120),
  };
  return {
    ...draft,
    valid: Boolean(draft.name && draft.courseKey),
    errors: [
      ...(draft.name ? [] : ["class-name-required"]),
      ...(draft.courseKey ? [] : ["course-key-required"]),
    ],
  };
}

export async function createSupabaseClass({ config, draft, fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Class creation requires Supabase URL, anon key, and authenticated access token.");
  }
  const teacherId = authUserIdFromAccessToken(readyConfig.accessToken);
  if (!teacherId) {
    throw new Error("Class creation requires an authenticated access token with a UUID subject.");
  }
  const normalizedDraft = normalizeClassDraft(draft);
  if (!normalizedDraft.valid) {
    throw new Error(`Class creation blocked: ${normalizedDraft.errors.join(", ")}`);
  }

  const response = await fetchImpl(classRestUrl(readyConfig), {
    method: "POST",
    headers: classHeaders(readyConfig, "return=representation"),
    body: JSON.stringify({
      teacher_id: teacherId,
      course_key: normalizedDraft.courseKey,
      name: normalizedDraft.name,
    }),
  });
  if (!response.ok) {
    throw new Error(`Supabase class creation failed: ${response.status}`);
  }
  const rows = await response.json().catch(() => []);
  const row = Array.isArray(rows) ? rows[0] : null;
  return {
    version: TEACHER_CLASS_VERSION,
    id: safeText(row?.id, 120),
    teacherId: safeText(row?.teacher_id || teacherId, 120),
    courseKey: safeText(row?.course_key || normalizedDraft.courseKey, 120),
    name: safeText(row?.name || normalizedDraft.name, 120),
    createdAt: safeText(row?.created_at, 80),
  };
}
