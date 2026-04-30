import {
  ASSIGNMENT_TYPES,
  createClassAssignment,
  fetchClassAssignments,
  normalizeAssignmentDraft,
} from "../src/core/teacher-assignments.js";

function fixtureJwt(subject) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none", typ: "JWT" })}.${encode({ sub: subject })}.signature`;
}

describe("teacher assignments", () => {
  const classId = "10000000-0000-4000-8000-000000000001";
  const teacherId = "00000000-0000-4000-8000-000000000006";
  const accessToken = fixtureJwt(teacherId);

  it("normalizes assignment drafts without fallback assignments", () => {
    expect(ASSIGNMENT_TYPES).toContain("concept_practice");
    expect(normalizeAssignmentDraft({
      title: "  תרגול Array  ",
      assignmentType: "concept_practice",
      targetConceptKey: "lesson_11::Array",
      dueAt: "2026-05-01T10:00:00.000Z",
    })).toMatchObject({
      title: "תרגול Array",
      assignmentType: "concept_practice",
      targetConceptKey: "lesson_11::Array",
      dueAt: "2026-05-01T10:00:00.000Z",
      valid: true,
      errors: [],
    });
    expect(normalizeAssignmentDraft({ title: "", assignmentType: "invalid" })).toMatchObject({
      valid: false,
      errors: ["assignment-title-required", "assignment-type-invalid"],
    });
  });

  it("creates a class assignment through Supabase", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{
          id: "assignment-1",
          class_id: classId,
          title: "תרגול Array",
          assignment_type: "concept_practice",
          target_concept_key: "lesson_11::Array",
          due_at: "2026-05-01T10:00:00.000Z",
          status: "active",
          created_at: "2026-04-29T10:00:00.000Z",
        }],
      };
    };

    await expect(createClassAssignment({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken },
      classId,
      draft: {
        title: "תרגול Array",
        assignmentType: "concept_practice",
        targetConceptKey: "lesson_11::Array",
        dueAt: "2026-05-01T10:00:00.000Z",
      },
      fetchImpl,
    })).resolves.toMatchObject({
      version: 1,
      assignment: {
        title: "תרגול Array",
        assignmentType: "concept_practice",
        targetConceptKey: "lesson_11::Array",
      },
    });

    expect(calls[0].url).toBe("http://127.0.0.1:54321/rest/v1/class_assignments");
    expect(JSON.parse(calls[0].options.body)).toMatchObject({
      class_id: classId,
      created_by: teacherId,
      title: "תרגול Array",
      assignment_type: "concept_practice",
      target_concept_key: "lesson_11::Array",
    });
  });

  it("loads real assignments for an existing class", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{
          id: "assignment-1",
          class_id: classId,
          title: "מבחן קצר",
          assignment_type: "mock_exam",
          target_concept_key: null,
          due_at: null,
          status: "active",
          created_at: "2026-04-29T10:00:00.000Z",
        }],
      };
    };

    await expect(fetchClassAssignments({
      config: { url: "http://127.0.0.1:54321", anonKey: "anon-key", accessToken },
      classId,
      fetchImpl,
    })).resolves.toMatchObject({
      version: 1,
      classId,
      assignments: [{ title: "מבחן קצר", assignmentType: "mock_exam" }],
    });

    expect(calls[0].url).toContain("/rest/v1/class_assignments?");
    expect(calls[0].url).toContain(`class_id=eq.${classId}`);
  });
});
