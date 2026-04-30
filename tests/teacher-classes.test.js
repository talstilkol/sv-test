import {
  DEFAULT_COURSE_KEY,
  createSupabaseClass,
  normalizeClassDraft,
} from "../src/core/teacher-classes.js";

function fixtureJwt(subject) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none", typ: "JWT" })}.${encode({ sub: subject })}.signature`;
}

describe("teacher class creation", () => {
  it("normalizes class drafts without inventing class records", () => {
    expect(normalizeClassDraft({ name: "  כיתה ערב  ", courseKey: "" })).toMatchObject({
      name: "כיתה ערב",
      courseKey: DEFAULT_COURSE_KEY,
      valid: true,
      errors: [],
    });
    expect(normalizeClassDraft({ name: "", courseKey: DEFAULT_COURSE_KEY })).toMatchObject({
      valid: false,
      errors: ["class-name-required"],
    });
  });

  it("posts a class owned by the authenticated teacher to Supabase", async () => {
    const teacherId = "00000000-0000-4000-8000-000000000002";
    const config = {
      url: "http://127.0.0.1:54321",
      anonKey: "anon-key",
      accessToken: fixtureJwt(teacherId),
    };
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{
          id: "class-1",
          teacher_id: teacherId,
          course_key: DEFAULT_COURSE_KEY,
          name: "כיתה ערב",
          created_at: "2026-04-29T10:00:00.000Z",
        }],
      };
    };

    await expect(createSupabaseClass({
      config,
      draft: { name: "כיתה ערב", courseKey: DEFAULT_COURSE_KEY },
      fetchImpl,
    })).resolves.toMatchObject({
      version: 1,
      id: "class-1",
      teacherId,
      courseKey: DEFAULT_COURSE_KEY,
      name: "כיתה ערב",
    });

    expect(calls[0].url).toBe("http://127.0.0.1:54321/rest/v1/classes");
    expect(calls[0].options.headers).toMatchObject({
      apikey: "anon-key",
      Authorization: `Bearer ${config.accessToken}`,
      Prefer: "return=representation",
    });
    expect(JSON.parse(calls[0].options.body)).toEqual({
      teacher_id: teacherId,
      course_key: DEFAULT_COURSE_KEY,
      name: "כיתה ערב",
    });
  });

  it("blocks class creation when credentials or class name are missing", async () => {
    await expect(createSupabaseClass({
      config: { url: "", anonKey: "", accessToken: "" },
      draft: { name: "כיתה ערב", courseKey: DEFAULT_COURSE_KEY },
      fetchImpl: async () => ({ ok: true, json: async () => [] }),
    })).rejects.toThrow("requires Supabase URL");

    await expect(createSupabaseClass({
      config: {
        url: "http://127.0.0.1:54321",
        anonKey: "anon-key",
        accessToken: fixtureJwt("00000000-0000-4000-8000-000000000002"),
      },
      draft: { name: "", courseKey: DEFAULT_COURSE_KEY },
      fetchImpl: async () => ({ ok: true, json: async () => [] }),
    })).rejects.toThrow("class-name-required");
  });
});
