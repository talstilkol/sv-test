import {
  authUserIdFromAccessToken,
  normalizeSupabaseSyncConfig,
} from "./progress-sync.js";

export const COMMUNITY_DISCUSSIONS_VERSION = 1;

function safeText(value, max = 240) {
  return String(value ?? "").trim().slice(0, max);
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

function threadUrl(config, query = "") {
  return `${config.url}/rest/v1/concept_discussion_threads${query}`;
}

function postUrl(config) {
  return `${config.url}/rest/v1/concept_discussion_posts`;
}

export function normalizeDiscussionDraft({ conceptKey = "", title = "", body = "" } = {}) {
  const draft = {
    conceptKey: safeText(conceptKey, 180),
    title: safeText(title, 160),
    body: safeText(body, 2000),
  };
  const errors = [
    ...(draft.conceptKey ? [] : ["discussion-concept-key-required"]),
    ...(draft.title ? [] : ["discussion-title-required"]),
  ];
  return {
    ...draft,
    valid: errors.length === 0,
    errors,
  };
}

export function normalizeDiscussionThread(row = {}) {
  return {
    id: safeText(row.id, 120),
    conceptKey: safeText(row.concept_key, 180),
    title: safeText(row.title, 160),
    status: safeText(row.status || "unknown/unavailable", 40),
    createdAt: safeText(row.created_at || "unknown/unavailable", 80),
    updatedAt: safeText(row.updated_at || "unknown/unavailable", 80),
  };
}

export async function fetchConceptDiscussionThreads({ config, conceptKey, fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Concept discussions require Supabase URL, anon key, and authenticated access token.");
  }
  const safeConceptKey = safeText(conceptKey, 180);
  if (!safeConceptKey) throw new Error("Concept discussions require a concept key.");
  const query = [
    `concept_key=eq.${encodeURIComponent(safeConceptKey)}`,
    "status=neq.hidden",
    "select=id,concept_key,title,status,created_at,updated_at",
    "order=created_at.desc",
  ].join("&");
  const response = await fetchImpl(threadUrl(readyConfig, `?${query}`), {
    method: "GET",
    headers: headers(readyConfig),
  });
  if (!response.ok) throw new Error(`Supabase concept discussion fetch failed: ${response.status}`);
  const rows = await response.json();
  return {
    version: COMMUNITY_DISCUSSIONS_VERSION,
    conceptKey: safeConceptKey,
    threads: Array.isArray(rows) ? rows.map(normalizeDiscussionThread) : [],
  };
}

export async function createConceptDiscussionThread({ config, draft, fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Concept discussion creation requires Supabase URL, anon key, and authenticated access token.");
  }
  const authorId = authUserIdFromAccessToken(readyConfig.accessToken);
  if (!authorId) throw new Error("Concept discussion creation requires an authenticated access token with a UUID subject.");
  const normalizedDraft = normalizeDiscussionDraft(draft);
  if (!normalizedDraft.valid) throw new Error(`Concept discussion blocked: ${normalizedDraft.errors.join(", ")}`);

  const threadResponse = await fetchImpl(threadUrl(readyConfig), {
    method: "POST",
    headers: headers(readyConfig, "return=representation"),
    body: JSON.stringify({
      concept_key: normalizedDraft.conceptKey,
      title: normalizedDraft.title,
      author_id: authorId,
    }),
  });
  if (!threadResponse.ok) throw new Error(`Supabase concept discussion create failed: ${threadResponse.status}`);
  const threadRows = await threadResponse.json().catch(() => []);
  const thread = normalizeDiscussionThread(Array.isArray(threadRows) ? threadRows[0] : {});

  if (normalizedDraft.body && thread.id) {
    const postResponse = await fetchImpl(postUrl(readyConfig), {
      method: "POST",
      headers: headers(readyConfig, "return=representation"),
      body: JSON.stringify({
        thread_id: thread.id,
        author_id: authorId,
        body: normalizedDraft.body,
      }),
    });
    if (!postResponse.ok) throw new Error(`Supabase concept discussion post create failed: ${postResponse.status}`);
  }

  return {
    version: COMMUNITY_DISCUSSIONS_VERSION,
    thread,
  };
}
