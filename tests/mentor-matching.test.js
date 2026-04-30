import {
  fetchMentorEligibility,
  fetchMentorMessages,
  fetchMentorReputation,
  mentorRealtimeChannel,
  normalizeMentorConcept,
  rateMentorMatch,
  registerMentorAvailability,
  requestMentorMatch,
  sendMentorMessage,
} from "../src/core/mentor-matching.js";

function fixtureJwt(subject) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none", typ: "JWT" })}.${encode({ sub: subject })}.signature`;
}

describe("mentor matching", () => {
  const learnerId = "00000000-0000-4000-8000-000000000010";
  const mentorId = "00000000-0000-4000-8000-000000000011";
  const learnerToken = fixtureJwt(learnerId);
  const mentorToken = fixtureJwt(mentorId);

  it("normalizes mentor concepts and realtime channels deterministically", () => {
    expect(normalizeMentorConcept(" react-hooks ")).toEqual({
      conceptKey: "react-hooks",
      valid: true,
      errors: [],
    });
    expect(normalizeMentorConcept("")).toEqual({
      conceptKey: "",
      valid: false,
      errors: ["mentor-concept-required"],
    });
    expect(mentorRealtimeChannel("match-1")).toBe("mentor_messages:match_id=eq.match-1");
  });

  it("loads master eligibility for the authenticated user", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{
          user_id: mentorId,
          completed_reviews: 4,
          avg_review_score: "4.50",
          community_reputation: 8,
          eligible: true,
        }],
      };
    };

    await expect(fetchMentorEligibility({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken: mentorToken },
      fetchImpl,
    })).resolves.toMatchObject({
      userId: mentorId,
      completedReviews: 4,
      averageReviewScore: 4.5,
      communityReputation: 8,
      eligible: true,
    });

    expect(calls[0].url).toContain("/rest/v1/mentor_master_eligibility?");
    expect(calls[0].url).toContain(`user_id=eq.${mentorId}`);
  });

  it("registers mentor availability through eligibility-gated RPC", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{ user_id: mentorId, concept_key: "react-hooks", status: "active", eligible: true }],
      };
    };

    await expect(registerMentorAvailability({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken: mentorToken },
      conceptKey: "react-hooks",
      fetchImpl,
    })).resolves.toMatchObject({
      userId: mentorId,
      conceptKey: "react-hooks",
      status: "active",
      eligible: true,
    });

    expect(calls[0].url).toBe("http://127.0.0.1:54321/rest/v1/rpc/register_mentor_availability");
    expect(JSON.parse(calls[0].options.body)).toEqual({ target_concept_key: "react-hooks" });
  });

  it("requests a mentor match through the deterministic matching RPC", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{
          match_id: "match-1",
          learner_id: learnerId,
          mentor_id: mentorId,
          concept_key: "react-hooks",
          status: "active",
          created_at: "2026-04-01T00:00:00.000Z",
        }],
      };
    };

    await expect(requestMentorMatch({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken: learnerToken },
      conceptKey: "react-hooks",
      fetchImpl,
    })).resolves.toMatchObject({
      matchId: "match-1",
      learnerId,
      mentorId,
      conceptKey: "react-hooks",
      status: "active",
    });

    expect(calls[0].url).toBe("http://127.0.0.1:54321/rest/v1/rpc/request_mentor_match");
  });

  it("sends and fetches mentor chat messages with a realtime channel name", async () => {
    const sendCalls = [];
    const sendFetch = async (url, options) => {
      sendCalls.push({ url, options });
      return {
        ok: true,
        json: async () => [{ id: "message-1", match_id: "match-1", sender_id: learnerId, body: "I am stuck on cleanup timing." }],
      };
    };

    await expect(sendMentorMessage({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken: learnerToken },
      matchId: "match-1",
      body: "I am stuck on cleanup timing.",
      fetchImpl: sendFetch,
    })).resolves.toMatchObject({
      realtimeChannel: "mentor_messages:match_id=eq.match-1",
      message: { id: "message-1", senderId: learnerId },
    });

    expect(JSON.parse(sendCalls[0].options.body)).toEqual({
      match_id: "match-1",
      sender_id: learnerId,
      body: "I am stuck on cleanup timing.",
    });

    const loadFetch = async () => ({
      ok: true,
      json: async () => [{ id: "message-1", match_id: "match-1", sender_id: learnerId, body: "I am stuck on cleanup timing." }],
    });
    await expect(fetchMentorMessages({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken: learnerToken },
      matchId: "match-1",
      fetchImpl: loadFetch,
    })).resolves.toMatchObject({
      realtimeChannel: "mentor_messages:match_id=eq.match-1",
      messages: [{ id: "message-1" }],
    });
  });

  it("rates a mentor match and loads mentor reputation", async () => {
    const ratingFetch = async (url, options) => {
      expect(url).toBe("http://127.0.0.1:54321/rest/v1/rpc/rate_mentor_match");
      expect(JSON.parse(options.body)).toEqual({
        target_match_id: "match-1",
        target_rating_score: 5,
        target_feedback: "Clear explanation of cleanup timing.",
      });
      return {
        ok: true,
        json: async () => [{ rating_id: "rating-1", match_id: "match-1", learner_id: learnerId, mentor_id: mentorId, rating_score: 5, status: "closed" }],
      };
    };

    await expect(rateMentorMatch({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken: learnerToken },
      matchId: "match-1",
      ratingScore: 5,
      feedback: "Clear explanation of cleanup timing.",
      fetchImpl: ratingFetch,
    })).resolves.toMatchObject({
      ratingId: "rating-1",
      matchId: "match-1",
      ratingScore: 5,
      status: "closed",
    });

    const reputationFetch = async (url) => {
      expect(url).toContain("/rest/v1/mentor_reputation_summary?");
      expect(url).toContain(`mentor_id=eq.${mentorId}`);
      return {
        ok: true,
        json: async () => [{ mentor_id: mentorId, rated_sessions: 3, average_rating: "4.67", completed_peer_reviews: 5, community_reputation: 11 }],
      };
    };
    await expect(fetchMentorReputation({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken: learnerToken },
      mentorId,
      fetchImpl: reputationFetch,
    })).resolves.toMatchObject({
      mentorId,
      ratedSessions: 3,
      averageRating: 4.67,
      completedPeerReviews: 5,
      communityReputation: 11,
    });
  });
});
