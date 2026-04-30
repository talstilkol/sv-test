import {
  authUserIdFromAccessToken,
  normalizeSupabaseSyncConfig,
} from "./progress-sync.js";

export const MENTOR_MATCHING_VERSION = 1;

function safeText(value, max = 240) {
  return String(value ?? "").trim().slice(0, max);
}

function safeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.trunc(number) : 0;
}

function safeDecimal(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Number(number.toFixed(2)) : 0;
}

function safeRating(value) {
  const rating = Number(value);
  return Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : 0;
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

function restUrl(config, table, query = "") {
  return `${config.url}/rest/v1/${table}${query}`;
}

function rpcUrl(config, name) {
  return `${config.url}/rest/v1/rpc/${name}`;
}

export function normalizeMentorConcept(value = "") {
  const conceptKey = safeText(value, 180);
  return {
    conceptKey,
    valid: Boolean(conceptKey),
    errors: conceptKey ? [] : ["mentor-concept-required"],
  };
}

export function normalizeMentorEligibility(row = {}) {
  return {
    version: MENTOR_MATCHING_VERSION,
    userId: safeText(row.user_id, 120),
    completedReviews: safeNumber(row.completed_reviews),
    averageReviewScore: safeDecimal(row.avg_review_score),
    communityReputation: safeNumber(row.community_reputation),
    eligible: row.eligible === true,
  };
}

export function normalizeMentorProfile(row = {}) {
  return {
    version: MENTOR_MATCHING_VERSION,
    userId: safeText(row.user_id, 120),
    conceptKey: safeText(row.concept_key, 180),
    status: safeText(row.status || "unknown/unavailable", 40),
    eligible: row.eligible === true,
  };
}

export function normalizeMentorMatch(row = {}) {
  return {
    version: MENTOR_MATCHING_VERSION,
    matchId: safeText(row.match_id || row.id, 120),
    learnerId: safeText(row.learner_id, 120),
    mentorId: safeText(row.mentor_id, 120),
    conceptKey: safeText(row.concept_key, 180),
    status: safeText(row.status || "unknown/unavailable", 40),
    createdAt: safeText(row.created_at || "unknown/unavailable", 80),
  };
}

export function normalizeMentorMessage(row = {}) {
  return {
    id: safeText(row.id, 120),
    matchId: safeText(row.match_id, 120),
    senderId: safeText(row.sender_id, 120),
    body: safeText(row.body || "unknown/unavailable", 4000),
    createdAt: safeText(row.created_at || "unknown/unavailable", 80),
  };
}

export function normalizeMentorRating(row = {}) {
  return {
    version: MENTOR_MATCHING_VERSION,
    ratingId: safeText(row.rating_id || row.id, 120),
    matchId: safeText(row.match_id, 120),
    learnerId: safeText(row.learner_id, 120),
    mentorId: safeText(row.mentor_id, 120),
    ratingScore: safeRating(row.rating_score),
    status: safeText(row.status || "unknown/unavailable", 40),
    createdAt: safeText(row.created_at || "unknown/unavailable", 80),
  };
}

export function normalizeMentorReputation(row = {}) {
  return {
    version: MENTOR_MATCHING_VERSION,
    mentorId: safeText(row.mentor_id, 120),
    ratedSessions: safeNumber(row.rated_sessions),
    averageRating: safeDecimal(row.average_rating),
    completedPeerReviews: safeNumber(row.completed_peer_reviews),
    communityReputation: safeNumber(row.community_reputation),
    lastRatingAt: safeText(row.last_rating_at || "unknown/unavailable", 80),
  };
}

export function mentorRealtimeChannel(matchId = "") {
  const safeMatchId = safeText(matchId, 120);
  return safeMatchId ? `mentor_messages:match_id=eq.${safeMatchId}` : "";
}

export async function fetchMentorEligibility({ config, fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Mentor eligibility requires Supabase URL, anon key, and authenticated access token.");
  }
  const userId = authUserIdFromAccessToken(readyConfig.accessToken);
  if (!userId) throw new Error("Mentor eligibility requires an authenticated access token with a UUID subject.");
  const query = [
    `user_id=eq.${encodeURIComponent(userId)}`,
    "select=user_id,completed_reviews,avg_review_score,community_reputation,eligible",
    "limit=1",
  ].join("&");
  const response = await fetchImpl(restUrl(readyConfig, "mentor_master_eligibility", `?${query}`), {
    method: "GET",
    headers: headers(readyConfig),
  });
  if (!response.ok) throw new Error(`Supabase mentor eligibility fetch failed: ${response.status}`);
  const rows = await response.json();
  return normalizeMentorEligibility(Array.isArray(rows) ? rows[0] : {});
}

export async function registerMentorAvailability({ config, conceptKey = "", fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Mentor availability requires Supabase URL, anon key, and authenticated access token.");
  }
  if (!authUserIdFromAccessToken(readyConfig.accessToken)) {
    throw new Error("Mentor availability requires an authenticated access token with a UUID subject.");
  }
  const concept = normalizeMentorConcept(conceptKey);
  if (!concept.valid) throw new Error(`Mentor availability blocked: ${concept.errors.join(", ")}`);
  const response = await fetchImpl(rpcUrl(readyConfig, "register_mentor_availability"), {
    method: "POST",
    headers: headers(readyConfig, "return=representation"),
    body: JSON.stringify({ target_concept_key: concept.conceptKey }),
  });
  if (!response.ok) throw new Error(`Supabase mentor availability failed: ${response.status}`);
  const rows = await response.json().catch(() => []);
  return normalizeMentorProfile(Array.isArray(rows) ? rows[0] : rows);
}

export async function requestMentorMatch({ config, conceptKey = "", fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Mentor matching requires Supabase URL, anon key, and authenticated access token.");
  }
  if (!authUserIdFromAccessToken(readyConfig.accessToken)) {
    throw new Error("Mentor matching requires an authenticated access token with a UUID subject.");
  }
  const concept = normalizeMentorConcept(conceptKey);
  if (!concept.valid) throw new Error(`Mentor matching blocked: ${concept.errors.join(", ")}`);
  const response = await fetchImpl(rpcUrl(readyConfig, "request_mentor_match"), {
    method: "POST",
    headers: headers(readyConfig, "return=representation"),
    body: JSON.stringify({ target_concept_key: concept.conceptKey }),
  });
  if (!response.ok) throw new Error(`Supabase mentor matching failed: ${response.status}`);
  const rows = await response.json().catch(() => []);
  return normalizeMentorMatch(Array.isArray(rows) ? rows[0] : rows);
}

export async function fetchMentorMessages({ config, matchId = "", fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Mentor chat requires Supabase URL, anon key, and authenticated access token.");
  }
  const safeMatchId = safeText(matchId, 120);
  if (!safeMatchId) throw new Error("Mentor chat requires match id.");
  const query = [
    `match_id=eq.${encodeURIComponent(safeMatchId)}`,
    "select=id,match_id,sender_id,body,created_at",
    "order=created_at.asc",
  ].join("&");
  const response = await fetchImpl(restUrl(readyConfig, "mentor_messages", `?${query}`), {
    method: "GET",
    headers: headers(readyConfig),
  });
  if (!response.ok) throw new Error(`Supabase mentor chat fetch failed: ${response.status}`);
  const rows = await response.json();
  return {
    version: MENTOR_MATCHING_VERSION,
    matchId: safeMatchId,
    realtimeChannel: mentorRealtimeChannel(safeMatchId),
    messages: Array.isArray(rows) ? rows.map(normalizeMentorMessage) : [],
  };
}

export async function sendMentorMessage({ config, matchId = "", body = "", fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Mentor message requires Supabase URL, anon key, and authenticated access token.");
  }
  const senderId = authUserIdFromAccessToken(readyConfig.accessToken);
  if (!senderId) throw new Error("Mentor message requires an authenticated access token with a UUID subject.");
  const safeMatchId = safeText(matchId, 120);
  const safeBody = safeText(body, 4000);
  if (!safeMatchId) throw new Error("Mentor message requires match id.");
  if (!safeBody) throw new Error("Mentor message requires body.");
  const response = await fetchImpl(restUrl(readyConfig, "mentor_messages"), {
    method: "POST",
    headers: headers(readyConfig, "return=representation"),
    body: JSON.stringify({
      match_id: safeMatchId,
      sender_id: senderId,
      body: safeBody,
    }),
  });
  if (!response.ok) throw new Error(`Supabase mentor message failed: ${response.status}`);
  const rows = await response.json().catch(() => []);
  return {
    version: MENTOR_MATCHING_VERSION,
    realtimeChannel: mentorRealtimeChannel(safeMatchId),
    message: normalizeMentorMessage(Array.isArray(rows) ? rows[0] : {}),
  };
}

export async function rateMentorMatch({ config, matchId = "", ratingScore = 0, feedback = "", fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Mentor rating requires Supabase URL, anon key, and authenticated access token.");
  }
  if (!authUserIdFromAccessToken(readyConfig.accessToken)) {
    throw new Error("Mentor rating requires an authenticated access token with a UUID subject.");
  }
  const safeMatchId = safeText(matchId, 120);
  const safeRatingScore = safeRating(ratingScore);
  if (!safeMatchId) throw new Error("Mentor rating requires match id.");
  if (!safeRatingScore) throw new Error("Mentor rating score must be between 1 and 5.");
  const response = await fetchImpl(rpcUrl(readyConfig, "rate_mentor_match"), {
    method: "POST",
    headers: headers(readyConfig, "return=representation"),
    body: JSON.stringify({
      target_match_id: safeMatchId,
      target_rating_score: safeRatingScore,
      target_feedback: safeText(feedback, 2000) || null,
    }),
  });
  if (!response.ok) throw new Error(`Supabase mentor rating failed: ${response.status}`);
  const rows = await response.json().catch(() => []);
  return normalizeMentorRating(Array.isArray(rows) ? rows[0] : rows);
}

export async function fetchMentorReputation({ config, mentorId = "", fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Mentor reputation requires Supabase URL, anon key, and authenticated access token.");
  }
  const safeMentorId = safeText(mentorId, 120);
  if (!safeMentorId) throw new Error("Mentor reputation requires mentor id.");
  const query = [
    `mentor_id=eq.${encodeURIComponent(safeMentorId)}`,
    "select=mentor_id,rated_sessions,average_rating,last_rating_at,completed_peer_reviews,community_reputation",
    "limit=1",
  ].join("&");
  const response = await fetchImpl(restUrl(readyConfig, "mentor_reputation_summary", `?${query}`), {
    method: "GET",
    headers: headers(readyConfig),
  });
  if (!response.ok) throw new Error(`Supabase mentor reputation fetch failed: ${response.status}`);
  const rows = await response.json();
  return normalizeMentorReputation(Array.isArray(rows) ? rows[0] : {});
}
