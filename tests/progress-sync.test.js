import {
  authUserIdFromAccessToken,
  buildSyncPayload,
  fetchRemoteProgress,
  normalizeSupabaseSyncConfig,
  progressFingerprint,
  resolveLastWriteWins,
  upsertRemoteProgress,
} from "../src/core/progress-sync.js";

function fixtureJwt(subject) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none", typ: "JWT" })}.${encode({ sub: subject })}.signature`;
}

describe("progress sync core", () => {
  it("fingerprints progress snapshots deterministically without exportedAt noise", () => {
    const base = {
      version: 2,
      exportedAt: "2026-04-29T08:00:00.000Z",
      profile: { id: "student-1", name: "Student" },
      scores: { "lumenportal:scores:lesson_11::Array": "{\"level\":7}" },
    };
    const next = {
      ...base,
      exportedAt: "2026-04-29T09:00:00.000Z",
    };

    expect(progressFingerprint(base)).toBe(progressFingerprint(next));
    expect(buildSyncPayload(base, {
      profileId: "student-1",
      updatedAt: "2026-04-29T08:00:00.000Z",
    })).toMatchObject({
      version: 1,
      profileId: "student-1",
      updatedAt: "2026-04-29T08:00:00.000Z",
      fingerprint: progressFingerprint(base),
      snapshot: base,
    });
  });

  it("resolves conflicts with deterministic last-write-wins", () => {
    const localPayload = { updatedAt: "2026-04-29T09:00:00.000Z", fingerprint: "local" };
    const remotePayload = { updatedAt: "2026-04-29T08:00:00.000Z", fingerprint: "remote" };

    expect(resolveLastWriteWins({ localPayload, remotePayload })).toMatchObject({
      winner: "local",
      action: "push",
      reason: "local-updated-after-remote",
    });
    expect(resolveLastWriteWins({
      localPayload,
      remotePayload: { ...remotePayload, updatedAt: "2026-04-29T10:00:00.000Z" },
    })).toMatchObject({
      winner: "remote",
      action: "pull",
      reason: "remote-updated-after-local",
    });
    expect(resolveLastWriteWins({
      localPayload: { updatedAt: "2026-04-29T09:00:00.000Z", fingerprint: "same" },
      remotePayload: { updatedAt: "2026-04-29T09:00:00.000Z", fingerprint: "same" },
    })).toMatchObject({
      winner: "equal",
      action: "noop",
      reason: "matching-fingerprints",
    });
  });

  it("normalizes real Supabase credentials and derives user id from an authenticated token", () => {
    const subject = "00000000-0000-4000-8000-000000000001";
    const accessToken = fixtureJwt(subject);

    expect(normalizeSupabaseSyncConfig({
      url: "http://127.0.0.1:54321/",
      anonKey: "anon-key",
      accessToken,
    })).toMatchObject({
      url: "http://127.0.0.1:54321",
      anonKey: "anon-key",
      accessToken,
      ready: true,
    });
    expect(authUserIdFromAccessToken(accessToken)).toBe(subject);
    expect(normalizeSupabaseSyncConfig({
      url: "ftp://127.0.0.1",
      anonKey: "anon-key",
      accessToken,
    }).ready).toBe(false);
  });

  it("reads and upserts the single progress snapshot row through Supabase REST", async () => {
    const subject = "00000000-0000-4000-8000-000000000001";
    const config = {
      url: "http://127.0.0.1:54321",
      anonKey: "anon-key",
      accessToken: fixtureJwt(subject),
    };
    const payload = buildSyncPayload({
      version: 2,
      exportedAt: "2026-04-29T08:00:00.000Z",
      profile: { id: "student-1", name: "Student" },
      scores: {},
    }, {
      profileId: "student-1",
      updatedAt: "2026-04-29T08:00:00.000Z",
    });
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      if (options.method === "GET") {
        return {
          ok: true,
          json: async () => [{ scores_json: payload, updated_at: "2026-04-29T08:00:01.000Z" }],
        };
      }
      return {
        ok: true,
        json: async () => [{ scores_json: payload, updated_at: "2026-04-29T08:00:02.000Z" }],
      };
    };

    await expect(fetchRemoteProgress({ config, fetchImpl })).resolves.toMatchObject({
      rowUpdatedAt: "2026-04-29T08:00:01.000Z",
      payload,
    });
    await expect(upsertRemoteProgress({ config, payload, fetchImpl })).resolves.toMatchObject({
      rowUpdatedAt: "2026-04-29T08:00:02.000Z",
      payload,
    });

    expect(calls[0].url).toContain("/rest/v1/user_progress?");
    expect(calls[1].url).toContain("on_conflict=user_id,lesson_id,concept");
    expect(calls[1].options.headers).toMatchObject({
      apikey: "anon-key",
      Authorization: `Bearer ${config.accessToken}`,
      Prefer: "resolution=merge-duplicates,return=representation",
    });
    expect(JSON.parse(calls[1].options.body)).toMatchObject({
      user_id: subject,
      lesson_id: "__lumenportal__",
      concept: "progress_snapshot_v2",
      scores_json: payload,
    });
  });
});
