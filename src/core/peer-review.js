import {
  authUserIdFromAccessToken,
  normalizeSupabaseSyncConfig,
} from "./progress-sync.js";

export const PEER_REVIEW_VERSION = 1;
export const PEER_REVIEW_LEVELS = Object.freeze(["beginner", "intermediate", "advanced"]);

function safeText(value, max = 240) {
  return String(value ?? "").trim().slice(0, max);
}

function safeScore(value) {
  const score = Number(value);
  return Number.isInteger(score) && score >= 1 && score <= 5 ? score : 0;
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

function submissionsUrl(config) {
  return `${config.url}/rest/v1/peer_review_submissions`;
}

function rpcUrl(config, functionName) {
  return `${config.url}/rest/v1/rpc/${functionName}`;
}

export function normalizePeerSolutionDraft({ conceptKey = "", level = "", solutionText = "" } = {}) {
  const draft = {
    conceptKey: safeText(conceptKey, 180),
    level: PEER_REVIEW_LEVELS.includes(level) ? level : "",
    solutionText: safeText(solutionText, 8000),
  };
  const errors = [
    ...(draft.conceptKey ? [] : ["peer-review-concept-required"]),
    ...(draft.level ? [] : ["peer-review-level-invalid"]),
    ...(draft.solutionText ? [] : ["peer-review-solution-required"]),
  ];
  return {
    ...draft,
    valid: errors.length === 0,
    errors,
  };
}

export function normalizePeerReviewTemplate({
  matchId = "",
  correctnessScore = 0,
  clarityScore = 0,
  strengths = "",
  improvements = "",
} = {}) {
  const template = {
    matchId: safeText(matchId, 120),
    correctnessScore: safeScore(correctnessScore),
    clarityScore: safeScore(clarityScore),
    strengths: safeText(strengths, 2000),
    improvements: safeText(improvements, 2000),
  };
  const errors = [
    ...(template.matchId ? [] : ["peer-review-match-required"]),
    ...(template.correctnessScore ? [] : ["peer-review-correctness-score-invalid"]),
    ...(template.clarityScore ? [] : ["peer-review-clarity-score-invalid"]),
    ...(template.strengths ? [] : ["peer-review-strengths-required"]),
    ...(template.improvements ? [] : ["peer-review-improvements-required"]),
  ];
  return {
    ...template,
    valid: errors.length === 0,
    errors,
  };
}

export function normalizePeerSubmission(row = {}) {
  return {
    id: safeText(row.id, 120),
    authorId: safeText(row.author_id, 120),
    conceptKey: safeText(row.concept_key, 180),
    level: safeText(row.level || "unknown/unavailable", 40),
    status: safeText(row.status || "unknown/unavailable", 40),
    reviewXpAwarded: safeNumber(row.review_xp_awarded),
    createdAt: safeText(row.created_at || "unknown/unavailable", 80),
  };
}

export function normalizePeerMatch(row = {}) {
  return {
    version: PEER_REVIEW_VERSION,
    matchId: safeText(row.match_id, 120),
    submissionId: safeText(row.submission_id, 120),
    revieweeId: safeText(row.reviewee_id, 120),
    conceptKey: safeText(row.concept_key, 180),
    level: safeText(row.level || "unknown/unavailable", 40),
    solutionText: safeText(row.solution_text, 8000),
    createdAt: safeText(row.created_at || "unknown/unavailable", 80),
  };
}

export function normalizePeerReviewResult(row = {}) {
  return {
    version: PEER_REVIEW_VERSION,
    reviewId: safeText(row.review_id, 120),
    matchId: safeText(row.match_id, 120),
    submissionId: safeText(row.submission_id, 120),
    xpAwarded: safeNumber(row.xp_awarded),
    status: safeText(row.status || "unknown/unavailable", 40),
    createdAt: safeText(row.created_at || "unknown/unavailable", 80),
  };
}

export async function submitPeerSolution({ config, draft, fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Peer solution submission requires Supabase URL, anon key, and authenticated access token.");
  }
  const authorId = authUserIdFromAccessToken(readyConfig.accessToken);
  if (!authorId) throw new Error("Peer solution submission requires an authenticated access token with a UUID subject.");
  const normalizedDraft = normalizePeerSolutionDraft(draft);
  if (!normalizedDraft.valid) throw new Error(`Peer solution submission blocked: ${normalizedDraft.errors.join(", ")}`);
  const response = await fetchImpl(submissionsUrl(readyConfig), {
    method: "POST",
    headers: headers(readyConfig, "return=representation"),
    body: JSON.stringify({
      author_id: authorId,
      concept_key: normalizedDraft.conceptKey,
      level: normalizedDraft.level,
      solution_text: normalizedDraft.solutionText,
    }),
  });
  if (!response.ok) throw new Error(`Supabase peer solution submission failed: ${response.status}`);
  const rows = await response.json().catch(() => []);
  return {
    version: PEER_REVIEW_VERSION,
    submission: normalizePeerSubmission(Array.isArray(rows) ? rows[0] : {}),
  };
}

export async function claimPeerReview({ config, level = "", fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Peer review matching requires Supabase URL, anon key, and authenticated access token.");
  }
  if (!authUserIdFromAccessToken(readyConfig.accessToken)) {
    throw new Error("Peer review matching requires an authenticated access token with a UUID subject.");
  }
  const targetLevel = PEER_REVIEW_LEVELS.includes(level) ? level : "";
  const response = await fetchImpl(rpcUrl(readyConfig, "claim_peer_review_submission"), {
    method: "POST",
    headers: headers(readyConfig, "return=representation"),
    body: JSON.stringify({ target_level: targetLevel || null }),
  });
  if (!response.ok) throw new Error(`Supabase peer review matching failed: ${response.status}`);
  const rows = await response.json().catch(() => []);
  return normalizePeerMatch(Array.isArray(rows) ? rows[0] : rows);
}

export async function submitPeerReview({ config, template, fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Peer review submission requires Supabase URL, anon key, and authenticated access token.");
  }
  if (!authUserIdFromAccessToken(readyConfig.accessToken)) {
    throw new Error("Peer review submission requires an authenticated access token with a UUID subject.");
  }
  const normalizedTemplate = normalizePeerReviewTemplate(template);
  if (!normalizedTemplate.valid) throw new Error(`Peer review submission blocked: ${normalizedTemplate.errors.join(", ")}`);
  const response = await fetchImpl(rpcUrl(readyConfig, "submit_peer_review"), {
    method: "POST",
    headers: headers(readyConfig, "return=representation"),
    body: JSON.stringify({
      peer_match_id: normalizedTemplate.matchId,
      correctness: normalizedTemplate.correctnessScore,
      clarity: normalizedTemplate.clarityScore,
      review_strengths: normalizedTemplate.strengths,
      review_improvements: normalizedTemplate.improvements,
    }),
  });
  if (!response.ok) throw new Error(`Supabase peer review submission failed: ${response.status}`);
  const rows = await response.json().catch(() => []);
  return normalizePeerReviewResult(Array.isArray(rows) ? rows[0] : rows);
}
