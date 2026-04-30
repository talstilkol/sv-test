import {
  authUserIdFromAccessToken,
  normalizeSupabaseSyncConfig,
} from "./progress-sync.js";

export const COMMUNITY_VOTES_VERSION = 1;

function safeText(value, max = 240) {
  return String(value ?? "").trim().slice(0, max);
}

function normalizeVote(value) {
  const number = Number(value);
  return number > 0 ? 1 : number < 0 ? -1 : 0;
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

function votesUrl(config, query = "") {
  return `${config.url}/rest/v1/concept_discussion_votes${query}`;
}

export function summarizeDiscussionVotes(rows = []) {
  const votes = (Array.isArray(rows) ? rows : []).map((row) => normalizeVote(row.vote)).filter(Boolean);
  const upvotes = votes.filter((vote) => vote === 1).length;
  const downvotes = votes.filter((vote) => vote === -1).length;
  return {
    version: COMMUNITY_VOTES_VERSION,
    upvotes,
    downvotes,
    score: upvotes - downvotes,
    totalVotes: votes.length,
  };
}

export async function fetchDiscussionVoteSummary({ config, threadId, fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Discussion vote summary requires Supabase URL, anon key, and authenticated access token.");
  }
  const safeThreadId = safeText(threadId, 120);
  if (!safeThreadId) throw new Error("Discussion vote summary requires a thread id.");
  const query = [
    `thread_id=eq.${encodeURIComponent(safeThreadId)}`,
    "select=vote",
  ].join("&");
  const response = await fetchImpl(votesUrl(readyConfig, `?${query}`), {
    method: "GET",
    headers: headers(readyConfig),
  });
  if (!response.ok) throw new Error(`Supabase discussion vote summary failed: ${response.status}`);
  const rows = await response.json();
  return {
    threadId: safeThreadId,
    ...summarizeDiscussionVotes(rows),
  };
}

export async function upsertDiscussionVote({ config, threadId, vote, fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Discussion voting requires Supabase URL, anon key, and authenticated access token.");
  }
  const voterId = authUserIdFromAccessToken(readyConfig.accessToken);
  if (!voterId) throw new Error("Discussion voting requires an authenticated access token with a UUID subject.");
  const safeThreadId = safeText(threadId, 120);
  if (!safeThreadId) throw new Error("Discussion voting requires a thread id.");
  const safeVote = normalizeVote(vote);
  if (!safeVote) throw new Error("Discussion voting requires upvote or downvote.");
  const response = await fetchImpl(votesUrl(readyConfig, "?on_conflict=thread_id,voter_id"), {
    method: "POST",
    headers: headers(readyConfig, "resolution=merge-duplicates,return=representation"),
    body: JSON.stringify({
      thread_id: safeThreadId,
      voter_id: voterId,
      vote: safeVote,
    }),
  });
  if (!response.ok) throw new Error(`Supabase discussion vote failed: ${response.status}`);
  const rows = await response.json().catch(() => []);
  return {
    version: COMMUNITY_VOTES_VERSION,
    threadId: safeThreadId,
    voterId,
    vote: normalizeVote(Array.isArray(rows) ? rows[0]?.vote : safeVote) || safeVote,
  };
}
