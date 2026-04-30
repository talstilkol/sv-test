import {
  applyDiscussionModeration,
  fetchModerationReports,
  normalizeModerationAction,
  normalizeReportDraft,
  reportDiscussionTarget,
} from "../src/core/community-moderation.js";

function fixtureJwt(subject) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none", typ: "JWT" })}.${encode({ sub: subject })}.signature`;
}

describe("community moderation", () => {
  const moderatorId = "00000000-0000-4000-8000-000000000009";
  const reporterId = "00000000-0000-4000-8000-000000000010";
  const moderatorToken = fixtureJwt(moderatorId);
  const reporterToken = fixtureJwt(reporterId);

  it("requires exactly one target and a reason for reports", () => {
    expect(normalizeReportDraft({ threadId: "thread-1", postId: "post-1", reason: "" })).toMatchObject({
      valid: false,
      errors: ["moderation-target-required", "moderation-reason-required"],
    });
    expect(normalizeReportDraft({ threadId: "thread-1", reason: "contains exam answer leakage" })).toMatchObject({
      valid: true,
      threadId: "thread-1",
      reason: "contains exam answer leakage",
    });
  });

  it("validates action families by target type", () => {
    expect(normalizeModerationAction({ threadId: "thread-1", action: "lock_thread", reason: "duplicate thread" })).toMatchObject({
      valid: true,
      action: "lock_thread",
    });
    expect(normalizeModerationAction({ postId: "post-1", action: "lock_thread", reason: "wrong target" })).toMatchObject({
      valid: false,
      errors: ["moderation-action-invalid"],
    });
  });

  it("creates a report with the authenticated reporter id", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{
          id: "report-1",
          thread_id: "thread-1",
          reporter_id: reporterId,
          reason: "contains exam answer leakage",
          status: "open",
          created_at: "2026-04-01T00:00:00.000Z",
        }],
      };
    };

    await expect(reportDiscussionTarget({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken: reporterToken },
      threadId: "thread-1",
      reason: "contains exam answer leakage",
      fetchImpl,
    })).resolves.toMatchObject({
      version: 1,
      report: { id: "report-1", reporterId, status: "open" },
    });

    expect(calls[0].url).toBe("http://127.0.0.1:54321/rest/v1/concept_discussion_reports");
    expect(JSON.parse(calls[0].options.body)).toEqual({
      thread_id: "thread-1",
      post_id: null,
      reporter_id: reporterId,
      reason: "contains exam answer leakage",
    });
  });

  it("loads moderation reports through the Supabase report queue", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{ id: "report-1", thread_id: "thread-1", reporter_id: reporterId, reason: "spam", status: "open" }],
      };
    };

    await expect(fetchModerationReports({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken: moderatorToken },
      fetchImpl,
    })).resolves.toMatchObject({
      totalReports: 1,
      reports: [{ id: "report-1", status: "open" }],
    });

    expect(calls[0].url).toContain("/rest/v1/concept_discussion_reports?");
    expect(calls[0].url).toContain("status=eq.open");
    expect(calls[0].options.headers.Authorization).toBe(`Bearer ${moderatorToken}`);
  });

  it("applies moderation through the transactional RPC", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{
          action_id: "action-1",
          thread_id: "thread-1",
          action: "hide_thread",
          new_status: "hidden",
          created_at: "2026-04-01T00:00:00.000Z",
        }],
      };
    };

    await expect(applyDiscussionModeration({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken: moderatorToken },
      threadId: "thread-1",
      action: "hide_thread",
      reason: "contains private student data",
      fetchImpl,
    })).resolves.toMatchObject({
      moderatorId,
      actionId: "action-1",
      threadId: "thread-1",
      action: "hide_thread",
      newStatus: "hidden",
    });

    expect(calls[0].url).toBe("http://127.0.0.1:54321/rest/v1/rpc/apply_concept_discussion_moderation");
    expect(JSON.parse(calls[0].options.body)).toEqual({
      target_thread_id: "thread-1",
      target_post_id: null,
      moderation_action: "hide_thread",
      moderation_reason: "contains private student data",
    });
  });
});
