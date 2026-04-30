import { normalizeSupabaseSyncConfig } from "./progress-sync.js";

export const TEACHER_STUDENTS_VERSION = 1;

function safeText(value, max = 240) {
  return String(value ?? "").trim().slice(0, max);
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(safeText(value, 80));
}

function studentsRestUrl(config, classId) {
  const query = [
    `class_id=eq.${encodeURIComponent(classId)}`,
    "select=id,display_name,status,joined_at,last_active_at",
    "order=display_name.asc",
  ].join("&");
  return `${config.url}/rest/v1/class_students?${query}`;
}

function studentsHeaders(config) {
  return {
    apikey: config.anonKey,
    Authorization: `Bearer ${config.accessToken}`,
    "Content-Type": "application/json",
  };
}

export function normalizeClassId(value = "") {
  const classId = safeText(value, 80);
  return {
    classId,
    valid: isUuid(classId),
  };
}

export function normalizeStudentRow(row = {}) {
  return {
    id: safeText(row.id, 120),
    displayName: safeText(row.display_name, 160),
    status: safeText(row.status || "unknown/unavailable", 40),
    joinedAt: safeText(row.joined_at, 80),
    lastActiveAt: safeText(row.last_active_at || "unknown/unavailable", 80),
  };
}

export async function fetchClassStudents({ config, classId, fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Student list requires Supabase URL, anon key, and authenticated access token.");
  }
  const normalized = normalizeClassId(classId);
  if (!normalized.valid) {
    throw new Error("Student list requires a valid class UUID.");
  }
  const response = await fetchImpl(studentsRestUrl(readyConfig, normalized.classId), {
    method: "GET",
    headers: studentsHeaders(readyConfig),
  });
  if (!response.ok) {
    throw new Error(`Supabase student list fetch failed: ${response.status}`);
  }
  const rows = await response.json();
  return {
    version: TEACHER_STUDENTS_VERSION,
    classId: normalized.classId,
    students: Array.isArray(rows) ? rows.map(normalizeStudentRow) : [],
  };
}
