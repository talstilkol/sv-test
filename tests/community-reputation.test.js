import {
  fetchCommunityReputation,
  normalizeReputationRow,
  summarizeReputationRows,
} from "../src/core/community-reputation.js";

function fixtureJwt(subject) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none", typ: "JWT" })}.${encode({ sub: subject })}.signature`;
}

describe("community reputation", () => {
  const accessToken = fixtureJwt("00000000-0000-4000-8000-000000000009");

  it("normalizes reputation rows without fabricated profile data", () => {
    expect(normalizeReputationRow({
      user_id: "00000000-0000-4000-8000-000000000010",
      reputation_points: "7",
      thread_count: "3",
      received_votes: "4",
      last_vote_at: "",
    })).toEqual({
      userId: "00000000-0000-4000-8000-000000000010",
      reputationPoints: 7,
      threadCount: 3,
      receivedVotes: 4,
      lastVoteAt: "unknown/unavailable",
    });
  });

  it("summarizes deterministic rows from Supabase view output", () => {
    expect(summarizeReputationRows([
      { user_id: "00000000-0000-4000-8000-000000000010", reputation_points: 4, thread_count: 2, received_votes: 2, last_vote_at: "2026-04-01T00:00:00.000Z" },
      { user_id: "00000000-0000-4000-8000-000000000011", reputation_points: -1, thread_count: 1, received_votes: 1, last_vote_at: null },
    ])).toEqual({
      version: 1,
      totalUsers: 2,
      rows: [
        {
          userId: "00000000-0000-4000-8000-000000000010",
          reputationPoints: 4,
          threadCount: 2,
          receivedVotes: 2,
          lastVoteAt: "2026-04-01T00:00:00.000Z",
        },
        {
          userId: "00000000-0000-4000-8000-000000000011",
          reputationPoints: -1,
          threadCount: 1,
          receivedVotes: 1,
          lastVoteAt: "unknown/unavailable",
        },
      ],
    });
  });

  it("loads community reputation from the Supabase view with session credentials", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{
          user_id: "00000000-0000-4000-8000-000000000010",
          reputation_points: 9,
          thread_count: 4,
          received_votes: 5,
          last_vote_at: "2026-04-01T00:00:00.000Z",
        }],
      };
    };

    await expect(fetchCommunityReputation({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken },
      limit: 12,
      fetchImpl,
    })).resolves.toMatchObject({
      version: 1,
      totalUsers: 1,
      rows: [{ reputationPoints: 9, threadCount: 4, receivedVotes: 5 }],
    });

    expect(calls[0].url).toBe(
      "http://127.0.0.1:54321/rest/v1/community_reputation_summary?select=user_id,reputation_points,thread_count,received_votes,last_vote_at&order=reputation_points.desc&limit=12",
    );
    expect(calls[0].options).toMatchObject({
      method: "GET",
      headers: {
        apikey: "anon-key",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });
});
