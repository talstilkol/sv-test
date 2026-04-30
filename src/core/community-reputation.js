import { normalizeSupabaseSyncConfig } from "./progress-sync.js";

export const COMMUNITY_REPUTATION_VERSION = 1;

function safeText(value, max = 240) {
  return String(value ?? "").trim().slice(0, max);
}

function safeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.trunc(number) : 0;
}

function headers(config) {
  return {
    apikey: config.anonKey,
    Authorization: `Bearer ${config.accessToken}`,
    "Content-Type": "application/json",
  };
}

function reputationUrl(config, limit) {
  const safeLimit = Math.min(100, Math.max(1, safeNumber(limit) || 20));
  const query = [
    "select=user_id,reputation_points,thread_count,received_votes,last_vote_at",
    "order=reputation_points.desc",
    `limit=${safeLimit}`,
  ].join("&");
  return `${config.url}/rest/v1/community_reputation_summary?${query}`;
}

export function normalizeReputationRow(row = {}) {
  return {
    userId: safeText(row.user_id, 120),
    reputationPoints: safeNumber(row.reputation_points),
    threadCount: safeNumber(row.thread_count),
    receivedVotes: safeNumber(row.received_votes),
    lastVoteAt: safeText(row.last_vote_at || "unknown/unavailable", 80),
  };
}

export function summarizeReputationRows(rows = []) {
  const normalized = (Array.isArray(rows) ? rows : []).map(normalizeReputationRow);
  return {
    version: COMMUNITY_REPUTATION_VERSION,
    totalUsers: normalized.length,
    rows: normalized,
  };
}

export async function fetchCommunityReputation({ config, limit = 20, fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Community reputation requires Supabase URL, anon key, and authenticated access token.");
  }
  const response = await fetchImpl(reputationUrl(readyConfig, limit), {
    method: "GET",
    headers: headers(readyConfig),
  });
  if (!response.ok) throw new Error(`Supabase community reputation fetch failed: ${response.status}`);
  const rows = await response.json();
  return summarizeReputationRows(rows);
}
