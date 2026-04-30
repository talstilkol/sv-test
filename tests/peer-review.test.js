import {
  claimPeerReview,
  normalizePeerReviewTemplate,
  normalizePeerSolutionDraft,
  submitPeerReview,
  submitPeerSolution,
} from "../src/core/peer-review.js";

function fixtureJwt(subject) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none", typ: "JWT" })}.${encode({ sub: subject })}.signature`;
}

describe("peer code review", () => {
  const authorId = "00000000-0000-4000-8000-000000000010";
  const reviewerId = "00000000-0000-4000-8000-000000000011";
  const authorToken = fixtureJwt(authorId);
  const reviewerToken = fixtureJwt(reviewerId);

  it("validates solution submission drafts", () => {
    expect(normalizePeerSolutionDraft({ conceptKey: "", level: "expert", solutionText: "" })).toMatchObject({
      valid: false,
      errors: ["peer-review-concept-required", "peer-review-level-invalid", "peer-review-solution-required"],
    });
    expect(normalizePeerSolutionDraft({
      conceptKey: "react-hooks",
      level: "intermediate",
      solutionText: "Use useEffect cleanup to unsubscribe from the active subscription.",
    })).toMatchObject({
      valid: true,
      level: "intermediate",
    });
  });

  it("validates review templates with score ranges and written feedback", () => {
    expect(normalizePeerReviewTemplate({ matchId: "match-1", correctnessScore: 6, clarityScore: 0 })).toMatchObject({
      valid: false,
      errors: [
        "peer-review-correctness-score-invalid",
        "peer-review-clarity-score-invalid",
        "peer-review-strengths-required",
        "peer-review-improvements-required",
      ],
    });
    expect(normalizePeerReviewTemplate({
      matchId: "match-1",
      correctnessScore: 4,
      clarityScore: 5,
      strengths: "The state transition is explicit.",
      improvements: "Add an error branch for failed requests.",
    })).toMatchObject({ valid: true });
  });

  it("submits a solution with the authenticated author id", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{
          id: "submission-1",
          author_id: authorId,
          concept_key: "react-hooks",
          level: "intermediate",
          status: "submitted",
          review_xp_awarded: 0,
        }],
      };
    };

    await expect(submitPeerSolution({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken: authorToken },
      draft: {
        conceptKey: "react-hooks",
        level: "intermediate",
        solutionText: "Use useEffect cleanup to unsubscribe from the active subscription.",
      },
      fetchImpl,
    })).resolves.toMatchObject({
      version: 1,
      submission: { id: "submission-1", authorId, status: "submitted" },
    });

    expect(calls[0].url).toBe("http://127.0.0.1:54321/rest/v1/peer_review_submissions");
    expect(JSON.parse(calls[0].options.body)).toEqual({
      author_id: authorId,
      concept_key: "react-hooks",
      level: "intermediate",
      solution_text: "Use useEffect cleanup to unsubscribe from the active subscription.",
    });
  });

  it("claims a matching peer review through the RPC", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{
          match_id: "match-1",
          submission_id: "submission-1",
          reviewee_id: authorId,
          concept_key: "react-hooks",
          level: "intermediate",
          solution_text: "Use cleanup.",
        }],
      };
    };

    await expect(claimPeerReview({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken: reviewerToken },
      level: "intermediate",
      fetchImpl,
    })).resolves.toMatchObject({
      matchId: "match-1",
      submissionId: "submission-1",
      revieweeId: authorId,
      level: "intermediate",
    });

    expect(calls[0].url).toBe("http://127.0.0.1:54321/rest/v1/rpc/claim_peer_review_submission");
    expect(JSON.parse(calls[0].options.body)).toEqual({ target_level: "intermediate" });
  });

  it("submits a completed review and returns deterministic XP", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{
          review_id: "review-1",
          match_id: "match-1",
          submission_id: "submission-1",
          xp_awarded: 29,
          status: "completed",
        }],
      };
    };

    await expect(submitPeerReview({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken: reviewerToken },
      template: {
        matchId: "match-1",
        correctnessScore: 4,
        clarityScore: 5,
        strengths: "The state transition is explicit.",
        improvements: "Add an error branch for failed requests.",
      },
      fetchImpl,
    })).resolves.toMatchObject({
      reviewId: "review-1",
      matchId: "match-1",
      xpAwarded: 29,
      status: "completed",
    });

    expect(calls[0].url).toBe("http://127.0.0.1:54321/rest/v1/rpc/submit_peer_review");
    expect(JSON.parse(calls[0].options.body)).toEqual({
      peer_match_id: "match-1",
      correctness: 4,
      clarity: 5,
      review_strengths: "The state transition is explicit.",
      review_improvements: "Add an error branch for failed requests.",
    });
  });
});
