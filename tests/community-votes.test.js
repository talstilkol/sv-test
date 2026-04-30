import {
  fetchDiscussionVoteSummary,
  summarizeDiscussionVotes,
  upsertDiscussionVote,
} from "../src/core/community-votes.js";

function fixtureJwt(subject) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none", typ: "JWT" })}.${encode({ sub: subject })}.signature`;
}

describe("community discussion votes", () => {
  const voterId = "00000000-0000-4000-8000-000000000009";
  const accessToken = fixtureJwt(voterId);

  it("summarizes vote rows deterministically", () => {
    expect(summarizeDiscussionVotes([{ vote: 1 }, { vote: 1 }, { vote: -1 }, { vote: 0 }])).toEqual({
      version: 1,
      upvotes: 2,
      downvotes: 1,
      score: 1,
      totalVotes: 3,
    });
  });

  it("upserts one vote per thread and voter", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{ vote: -1 }],
      };
    };

    await expect(upsertDiscussionVote({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken },
      threadId: "thread-1",
      vote: -1,
      fetchImpl,
    })).resolves.toMatchObject({
      version: 1,
      threadId: "thread-1",
      voterId,
      vote: -1,
    });

    expect(calls[0].url).toBe("http://127.0.0.1:54321/rest/v1/concept_discussion_votes?on_conflict=thread_id,voter_id");
    expect(calls[0].options.headers).toMatchObject({
      apikey: "anon-key",
      Authorization: `Bearer ${accessToken}`,
      Prefer: "resolution=merge-duplicates,return=representation",
    });
    expect(JSON.parse(calls[0].options.body)).toEqual({
      thread_id: "thread-1",
      voter_id: voterId,
      vote: -1,
    });
  });

  it("loads vote summary from Supabase rows", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{ vote: 1 }, { vote: -1 }],
      };
    };

    await expect(fetchDiscussionVoteSummary({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken },
      threadId: "thread-1",
      fetchImpl,
    })).resolves.toMatchObject({
      threadId: "thread-1",
      upvotes: 1,
      downvotes: 1,
      score: 0,
    });

    expect(calls[0].url).toContain("/rest/v1/concept_discussion_votes?");
    expect(calls[0].url).toContain("thread_id=eq.thread-1");
  });
});
