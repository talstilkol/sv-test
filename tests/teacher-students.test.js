import {
  fetchClassStudents,
  normalizeClassId,
  normalizeStudentRow,
} from "../src/core/teacher-students.js";

function fixtureJwt(subject) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none", typ: "JWT" })}.${encode({ sub: subject })}.signature`;
}

describe("teacher student list", () => {
  const classId = "10000000-0000-4000-8000-000000000001";

  it("validates class ids and normalizes rows without fallback records", () => {
    expect(normalizeClassId(classId)).toEqual({ classId, valid: true });
    expect(normalizeClassId("not-a-class-id")).toEqual({ classId: "not-a-class-id", valid: false });
    expect(normalizeStudentRow({
      id: "student-row-1",
      display_name: "Dana",
      status: "active",
      joined_at: "2026-04-29T10:00:00.000Z",
      last_active_at: null,
    })).toEqual({
      id: "student-row-1",
      displayName: "Dana",
      status: "active",
      joinedAt: "2026-04-29T10:00:00.000Z",
      lastActiveAt: "unknown/unavailable",
    });
  });

  it("fetches class students from Supabase using the teacher token", async () => {
    const accessToken = fixtureJwt("00000000-0000-4000-8000-000000000003");
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{
          id: "row-1",
          display_name: "Dana",
          status: "active",
          joined_at: "2026-04-29T10:00:00.000Z",
          last_active_at: "2026-04-29T12:00:00.000Z",
        }],
      };
    };

    await expect(fetchClassStudents({
      config: {
        url: "http://127.0.0.1:54321",
        anonKey: "anon-key",
        accessToken,
      },
      classId,
      fetchImpl,
    })).resolves.toMatchObject({
      version: 1,
      classId,
      students: [{ displayName: "Dana", status: "active" }],
    });

    expect(calls[0].url).toContain("/rest/v1/class_students?");
    expect(calls[0].url).toContain(`class_id=eq.${classId}`);
    expect(calls[0].options.headers).toMatchObject({
      apikey: "anon-key",
      Authorization: `Bearer ${accessToken}`,
    });
  });

  it("blocks student loading without credentials or a valid class id", async () => {
    await expect(fetchClassStudents({
      config: { url: "", anonKey: "", accessToken: "" },
      classId,
      fetchImpl: async () => ({ ok: true, json: async () => [] }),
    })).rejects.toThrow("requires Supabase URL");

    await expect(fetchClassStudents({
      config: {
        url: "http://127.0.0.1:54321",
        anonKey: "anon-key",
        accessToken: fixtureJwt("00000000-0000-4000-8000-000000000003"),
      },
      classId: "not-a-class-id",
      fetchImpl: async () => ({ ok: true, json: async () => [] }),
    })).rejects.toThrow("valid class UUID");
  });
});
