import {
  buildRiskAlerts,
  fetchClassRiskAlerts,
} from "../src/core/teacher-risk-alerts.js";

function fixtureJwt(subject) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none", typ: "JWT" })}.${encode({ sub: subject })}.signature`;
}

describe("teacher risk alerts", () => {
  const classId = "10000000-0000-4000-8000-000000000001";
  const studentId = "20000000-0000-4000-8000-000000000001";

  it("builds inactive and mastery-drop alerts from real rows only", () => {
    const report = buildRiskAlerts({
      now: Date.UTC(2026, 3, 29, 12),
      students: [{
        id: studentId,
        display_name: "Dana",
        status: "active",
        joined_at: "2026-04-20T10:00:00.000Z",
        last_active_at: "2026-04-25T10:00:00.000Z",
      }],
      masteryRows: [{
        class_student_id: studentId,
        concept_key: "lesson_11::Array",
        mastery_pct: 42,
        previous_mastery_pct: 70,
        attempts: 5,
        correct: 2,
        class_students: { display_name: "Dana", status: "active" },
      }],
    });

    expect(report.alertCount).toBe(2);
    expect(report.alerts).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: "inactive", studentName: "Dana", metric: "4d" }),
      expect.objectContaining({ type: "mastery-drop", conceptKey: "lesson_11::Array", metric: "-28%" }),
    ]));
  });

  it("does not invent risks when activity or previous mastery is unavailable", () => {
    expect(buildRiskAlerts({
      now: Date.UTC(2026, 3, 29, 12),
      students: [{ id: studentId, display_name: "Dana", status: "active", last_active_at: null }],
      masteryRows: [{
        class_student_id: studentId,
        concept_key: "lesson_11::Array",
        mastery_pct: 42,
        previous_mastery_pct: null,
        attempts: 5,
        correct: 2,
        class_students: { display_name: "Dana", status: "active" },
      }],
    })).toMatchObject({
      alertCount: 0,
      alerts: [],
    });
  });

  it("fetches students and mastery rows before calculating alerts", async () => {
    const accessToken = fixtureJwt("00000000-0000-4000-8000-000000000005");
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      if (url.includes("/rest/v1/class_students?")) {
        return {
          ok: true,
          json: async () => [{
            id: studentId,
            display_name: "Dana",
            status: "active",
            joined_at: "2026-04-20T10:00:00.000Z",
            last_active_at: "2026-04-25T10:00:00.000Z",
          }],
        };
      }
      return {
        ok: true,
        json: async () => [{
          class_student_id: studentId,
          concept_key: "lesson_11::Array",
          mastery_pct: 40,
          previous_mastery_pct: 80,
          attempts: 5,
          correct: 2,
          class_students: { display_name: "Dana", status: "active" },
        }],
      };
    };

    await expect(fetchClassRiskAlerts({
      config: {
        url: "http://127.0.0.1:54321",
        anonKey: "anon-key",
        accessToken,
      },
      classId,
      now: Date.UTC(2026, 3, 29, 12),
      fetchImpl,
    })).resolves.toMatchObject({
      version: 1,
      classId,
      alertCount: 2,
    });

    expect(calls).toHaveLength(2);
    expect(calls[0].url).toContain("/rest/v1/class_students?");
    expect(calls[1].url).toContain("/rest/v1/class_concept_mastery?");
    expect(calls[1].url).toContain("previous_mastery_pct");
  });
});
