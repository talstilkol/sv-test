import {
  buildTeacherLiteExport,
  buildConceptHeatmap,
  fetchClassConceptHeatmap,
  normalizeHeatmapRow,
} from "../src/core/teacher-heatmap.js";

function fixtureJwt(subject) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none", typ: "JWT" })}.${encode({ sub: subject })}.signature`;
}

describe("teacher concept heatmap", () => {
  const classId = "10000000-0000-4000-8000-000000000001";
  const studentId = "20000000-0000-4000-8000-000000000001";

  it("normalizes mastery rows and classifies cells without fabricated values", () => {
    expect(normalizeHeatmapRow({
      class_student_id: studentId,
      concept_key: "lesson_11::Array",
      mastery_pct: 83.4,
      previous_mastery_pct: 70,
      attempts: 5,
      correct: 4,
      class_students: { display_name: "Dana", status: "active" },
    })).toMatchObject({
      classStudentId: studentId,
      studentName: "Dana",
      conceptKey: "lesson_11::Array",
      masteryPct: 83,
      previousMasteryPct: 70,
      masteryDeltaPct: 13,
      attempts: 5,
      correct: 4,
      status: "strong",
      lastEvidenceAt: "unknown/unavailable",
    });

    expect(normalizeHeatmapRow({
      class_student_id: studentId,
      concept_key: "lesson_12::map",
      mastery_pct: 40,
      attempts: 0,
      correct: 0,
    })).toMatchObject({
      status: "unknown",
      studentName: "unknown/unavailable",
    });
  });

  it("builds a deterministic concept x student matrix from existing rows only", () => {
    const heatmap = buildConceptHeatmap([
      {
        class_student_id: studentId,
        concept_key: "lesson_12::map",
        mastery_pct: 55,
        attempts: 2,
        correct: 1,
        class_students: { display_name: "Dana", status: "active" },
      },
      {
        class_student_id: studentId,
        concept_key: "lesson_11::Array",
        mastery_pct: 25,
        attempts: 4,
        correct: 1,
        class_students: { display_name: "Dana", status: "active" },
      },
    ]);

    expect(heatmap.students).toEqual([{ id: studentId, name: "Dana", status: "active" }]);
    expect(heatmap.concepts).toEqual(["lesson_11::Array", "lesson_12::map"]);
    expect(heatmap.cells[`${studentId}::lesson_11::Array`]).toMatchObject({
      masteryPct: 25,
      status: "risk",
    });
    expect(buildConceptHeatmap([])).toMatchObject({
      students: [],
      concepts: [],
      rowCount: 0,
    });
  });

  it("fetches heatmap rows from Supabase through the authenticated teacher token", async () => {
    const accessToken = fixtureJwt("00000000-0000-4000-8000-000000000004");
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        json: async () => [{
          class_student_id: studentId,
          concept_key: "lesson_11::Array",
          mastery_pct: 80,
          attempts: 5,
          correct: 4,
          last_evidence_at: "2026-04-29T10:00:00.000Z",
          updated_at: "2026-04-29T10:05:00.000Z",
          class_students: { display_name: "Dana", status: "active" },
        }],
      };
    };

    await expect(fetchClassConceptHeatmap({
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
      rowCount: 1,
      students: [{ name: "Dana" }],
      concepts: ["lesson_11::Array"],
    });

    expect(calls[0].url).toContain("/rest/v1/class_concept_mastery?");
    expect(calls[0].url).toContain(`class_id=eq.${classId}`);
    expect(calls[0].url).toContain("class_students(display_name,status)");
    expect(calls[0].options.headers).toMatchObject({
      apikey: "anon-key",
      Authorization: `Bearer ${accessToken}`,
    });
  });

  it("exports one-class Teacher Lite progress without fabricated rows", () => {
    const heatmap = buildConceptHeatmap([
      {
        class_student_id: studentId,
        concept_key: "lesson_11::Array",
        mastery_pct: 35,
        attempts: 4,
        correct: 1,
        class_students: { display_name: "Dana", status: "active" },
      },
      {
        class_student_id: studentId,
        concept_key: "lesson_12::map",
        mastery_pct: 82,
        attempts: 5,
        correct: 4,
        class_students: { display_name: "Dana", status: "active" },
      },
    ]);
    const report = buildTeacherLiteExport({
      classId,
      generatedAt: "2026-04-29T18:00:00.000Z",
      studentsReport: {
        classId,
        students: [{
          id: studentId,
          displayName: "Dana",
          status: "active",
          joinedAt: "2026-04-29T10:00:00.000Z",
          lastActiveAt: "2026-04-29T12:00:00.000Z",
        }],
      },
      heatmapReport: { classId, ...heatmap },
    });

    expect(report).toMatchObject({
      reportType: "teacher-lite-class-export",
      classId,
      courseKey: "svcollege_fullstack_ai",
      generatedAt: "2026-04-29T18:00:00.000Z",
      unavailable: { students: false, heatmap: false },
    });
    expect(report.students).toHaveLength(1);
    expect(report.heatmap.rowCount).toBe(2);
    expect(report.weakTopics).toEqual([{
      conceptKey: "lesson_11::Array",
      attemptedStudents: 1,
      riskCount: 1,
      averageMastery: 35,
    }]);

    expect(buildTeacherLiteExport()).toMatchObject({
      classId: "unknown/unavailable",
      unavailable: { students: true, heatmap: true },
      weakTopics: [],
    });
  });
});
