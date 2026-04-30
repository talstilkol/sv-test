import { normalizeSupabaseSyncConfig } from "./progress-sync.js";
import { normalizeClassId, normalizeStudentRow } from "./teacher-students.js";
import { normalizeHeatmapRow } from "./teacher-heatmap.js";

export const TEACHER_RISK_ALERTS_VERSION = 1;

function safeText(value, max = 240) {
  return String(value ?? "").trim().slice(0, max);
}

function dayMs(days) {
  return days * 24 * 60 * 60 * 1000;
}

function parseTime(value) {
  const time = Date.parse(safeText(value, 80));
  return Number.isFinite(time) ? time : null;
}

function headers(config) {
  return {
    apikey: config.anonKey,
    Authorization: `Bearer ${config.accessToken}`,
    "Content-Type": "application/json",
  };
}

function studentsUrl(config, classId) {
  const query = [
    `class_id=eq.${encodeURIComponent(classId)}`,
    "select=id,display_name,status,joined_at,last_active_at",
    "order=display_name.asc",
  ].join("&");
  return `${config.url}/rest/v1/class_students?${query}`;
}

function masteryUrl(config, classId) {
  const query = [
    `class_id=eq.${encodeURIComponent(classId)}`,
    "select=class_student_id,concept_key,mastery_pct,previous_mastery_pct,attempts,correct,last_evidence_at,updated_at,class_students(display_name,status)",
    "order=updated_at.desc",
  ].join("&");
  return `${config.url}/rest/v1/class_concept_mastery?${query}`;
}

export function buildRiskAlerts({
  students = [],
  masteryRows = [],
  now = Date.now(),
  inactiveDays = 3,
  dropThresholdPct = 15,
} = {}) {
  const nowMs = typeof now === "number" ? now : parseTime(now);
  const alerts = [];
  const normalizedStudents = (Array.isArray(students) ? students : []).map(normalizeStudentRow);
  normalizedStudents.forEach((student) => {
    const activeAt = parseTime(student.lastActiveAt);
    if (activeAt === null || nowMs === null) return;
    const inactiveForDays = Math.floor(Math.max(0, nowMs - activeAt) / dayMs(1));
    if (inactiveForDays >= inactiveDays && student.status !== "removed") {
      alerts.push({
        type: "inactive",
        severity: inactiveForDays >= inactiveDays + 4 ? "high" : "medium",
        classStudentId: student.id,
        studentName: student.displayName,
        conceptKey: "",
        metric: `${inactiveForDays}d`,
        message: `Inactive for ${inactiveForDays} days`,
      });
    }
  });

  (Array.isArray(masteryRows) ? masteryRows : []).map(normalizeHeatmapRow).forEach((row) => {
    if (row.previousMasteryPct === null || row.masteryDeltaPct === null) return;
    const drop = -row.masteryDeltaPct;
    if (drop >= dropThresholdPct) {
      alerts.push({
        type: "mastery-drop",
        severity: drop >= dropThresholdPct * 2 ? "high" : "medium",
        classStudentId: row.classStudentId,
        studentName: row.studentName,
        conceptKey: row.conceptKey,
        metric: `-${drop}%`,
        message: `Mastery dropped from ${row.previousMasteryPct}% to ${row.masteryPct}%`,
      });
    }
  });

  alerts.sort((a, b) =>
    a.severity.localeCompare(b.severity) ||
    a.studentName.localeCompare(b.studentName) ||
    a.type.localeCompare(b.type) ||
    a.conceptKey.localeCompare(b.conceptKey)
  );

  return {
    version: TEACHER_RISK_ALERTS_VERSION,
    alertCount: alerts.length,
    alerts,
  };
}

export async function fetchClassRiskAlerts({ config, classId, now = Date.now(), fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Risk alerts require Supabase URL, anon key, and authenticated access token.");
  }
  const normalized = normalizeClassId(classId);
  if (!normalized.valid) {
    throw new Error("Risk alerts require a valid class UUID.");
  }
  const [studentResponse, masteryResponse] = await Promise.all([
    fetchImpl(studentsUrl(readyConfig, normalized.classId), { method: "GET", headers: headers(readyConfig) }),
    fetchImpl(masteryUrl(readyConfig, normalized.classId), { method: "GET", headers: headers(readyConfig) }),
  ]);
  if (!studentResponse.ok) throw new Error(`Supabase risk students fetch failed: ${studentResponse.status}`);
  if (!masteryResponse.ok) throw new Error(`Supabase risk mastery fetch failed: ${masteryResponse.status}`);
  const students = await studentResponse.json();
  const masteryRows = await masteryResponse.json();
  return {
    classId: normalized.classId,
    ...buildRiskAlerts({ students, masteryRows, now }),
  };
}
