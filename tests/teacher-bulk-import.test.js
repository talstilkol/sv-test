import {
  bulkImportClassStudents,
  parseStudentCsv,
} from "../src/core/teacher-bulk-import.js";

function fixtureJwt(subject) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none", typ: "JWT" })}.${encode({ sub: subject })}.signature`;
}

describe("teacher bulk CSV import", () => {
  const classId = "10000000-0000-4000-8000-000000000001";
  const accessToken = fixtureJwt("00000000-0000-4000-8000-000000000007");

  it("parses CSV students without inventing missing names", () => {
    expect(parseStudentCsv([
      "display_name,status,student_id",
      '"Dana Cohen",active,00000000-0000-4000-8000-000000000101',
      "Noa Levi,invalid,",
    ].join("\n"))).toMatchObject({
      rows: [
        { displayName: "Dana Cohen", status: "active", studentId: "00000000-0000-4000-8000-000000000101" },
        { displayName: "Noa Levi", status: "invited", studentId: null },
      ],
      errors: [],
    });

    expect(parseStudentCsv("status\nactive")).toMatchObject({
      rows: [],
      errors: ["display_name-header-required"],
    });
    expect(parseStudentCsv("display_name\n")).toMatchObject({
      rows: [],
    });
  });

  it("imports parsed students through Supabase upsert", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{ id: "row-1" }, { id: "row-2" }],
      };
    };

    await expect(bulkImportClassStudents({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken },
      classId,
      csvText: "display_name,status\nDana Cohen,active\nNoa Levi,invited",
      fetchImpl,
    })).resolves.toMatchObject({
      version: 1,
      classId,
      imported: 2,
      requested: 2,
    });

    expect(calls[0].url).toBe("http://127.0.0.1:54321/rest/v1/class_students?on_conflict=class_id,display_name");
    expect(calls[0].options.headers).toMatchObject({
      apikey: "anon-key",
      Authorization: `Bearer ${accessToken}`,
      Prefer: "resolution=merge-duplicates,return=representation",
    });
    expect(JSON.parse(calls[0].options.body)).toEqual([
      { class_id: classId, student_id: null, display_name: "Dana Cohen", status: "active" },
      { class_id: classId, student_id: null, display_name: "Noa Levi", status: "invited" },
    ]);
  });

  it("blocks import when CSV has validation errors", async () => {
    await expect(bulkImportClassStudents({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken },
      classId,
      csvText: "display_name,student_id\nDana,not-a-uuid",
      fetchImpl: async () => ({ ok: true, json: async () => [] }),
    })).rejects.toThrow("invalid-student-id");
  });
});
