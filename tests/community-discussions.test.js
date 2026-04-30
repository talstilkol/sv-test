import {
  createConceptDiscussionThread,
  fetchConceptDiscussionThreads,
  normalizeDiscussionDraft,
} from "../src/core/community-discussions.js";

function fixtureJwt(subject) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none", typ: "JWT" })}.${encode({ sub: subject })}.signature`;
}

describe("community concept discussions", () => {
  const authorId = "00000000-0000-4000-8000-000000000008";
  const accessToken = fixtureJwt(authorId);

  it("normalizes thread drafts without inventing content", () => {
    expect(normalizeDiscussionDraft({
      conceptKey: " lesson_11::Array ",
      title: " למה map מחזיר מערך חדש? ",
      body: "שאלה אמיתית על תרגול.",
    })).toMatchObject({
      conceptKey: "lesson_11::Array",
      title: "למה map מחזיר מערך חדש?",
      body: "שאלה אמיתית על תרגול.",
      valid: true,
      errors: [],
    });
    expect(normalizeDiscussionDraft({ conceptKey: "", title: "" })).toMatchObject({
      valid: false,
      errors: ["discussion-concept-key-required", "discussion-title-required"],
    });
  });

  it("creates a concept thread and optional first post through Supabase", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      if (url.includes("concept_discussion_threads")) {
        return {
          ok: true,
          json: async () => [{
            id: "thread-1",
            concept_key: "lesson_11::Array",
            title: "למה map מחזיר מערך חדש?",
            status: "open",
            created_at: "2026-04-29T10:00:00.000Z",
            updated_at: "2026-04-29T10:00:00.000Z",
          }],
        };
      }
      return {
        ok: true,
        json: async () => [{ id: "post-1" }],
      };
    };

    await expect(createConceptDiscussionThread({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken },
      draft: {
        conceptKey: "lesson_11::Array",
        title: "למה map מחזיר מערך חדש?",
        body: "שאלה אמיתית על תרגול.",
      },
      fetchImpl,
    })).resolves.toMatchObject({
      version: 1,
      thread: {
        id: "thread-1",
        conceptKey: "lesson_11::Array",
        title: "למה map מחזיר מערך חדש?",
      },
    });

    expect(calls).toHaveLength(2);
    expect(JSON.parse(calls[0].options.body)).toEqual({
      concept_key: "lesson_11::Array",
      title: "למה map מחזיר מערך חדש?",
      author_id: authorId,
    });
    expect(JSON.parse(calls[1].options.body)).toEqual({
      thread_id: "thread-1",
      author_id: authorId,
      body: "שאלה אמיתית על תרגול.",
    });
  });

  it("loads existing threads for one concept key only", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{
          id: "thread-1",
          concept_key: "lesson_11::Array",
          title: "דיון קיים",
          status: "open",
          created_at: "2026-04-29T10:00:00.000Z",
          updated_at: "2026-04-29T10:00:00.000Z",
        }],
      };
    };

    await expect(fetchConceptDiscussionThreads({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken },
      conceptKey: "lesson_11::Array",
      fetchImpl,
    })).resolves.toMatchObject({
      version: 1,
      conceptKey: "lesson_11::Array",
      threads: [{ title: "דיון קיים", status: "open" }],
    });

    expect(calls[0].url).toContain("/rest/v1/concept_discussion_threads?");
    expect(calls[0].url).toContain("concept_key=eq.lesson_11%3A%3AArray");
    expect(calls[0].url).toContain("status=neq.hidden");
  });
});
