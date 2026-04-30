import {
  authUserIdFromAccessToken,
  normalizeSupabaseSyncConfig,
} from "./progress-sync.js";
import { normalizeClassId } from "./teacher-students.js";

export const TEACHER_ASSIGNMENTS_VERSION = 1;
export const ASSIGNMENT_TYPES = Object.freeze(["concept_practice", "mock_exam", "code_task", "reading"]);

function safeText(value, max = 240) {
  return String(value ?? "").trim().slice(0, max);
}

function assignmentHeaders(config, prefer = "") {
  const headers = {
    apikey: config.anonKey,
    Authorization: `Bearer ${config.accessToken}`,
    "Content-Type": "application/json",
  };
  if (prefer) headers.Prefer = prefer;
  return headers;
}

function assignmentUrl(config, query = "") {
  return `${config.url}/rest/v1/class_assignments${query}`;
}

function safeIsoOrNull(value) {
  const text = safeText(value, 80);
  if (!text) return null;
  const time = Date.parse(text);
  return Number.isFinite(time) ? new Date(time).toISOString() : null;
}

export function normalizeAssignmentDraft({
  title = "",
  assignmentType = "concept_practice",
  targetConceptKey = "",
  dueAt = "",
} = {}) {
  const draft = {
    title: safeText(title, 160),
    assignmentType: ASSIGNMENT_TYPES.includes(assignmentType) ? assignmentType : "",
    targetConceptKey: safeText(targetConceptKey, 180),
    dueAt: safeIsoOrNull(dueAt),
  };
  const errors = [
    ...(draft.title ? [] : ["assignment-title-required"]),
    ...(draft.assignmentType ? [] : ["assignment-type-invalid"]),
  ];
  return {
    ...draft,
    valid: errors.length === 0,
    errors,
  };
}

export function normalizeAssignmentRow(row = {}) {
  return {
    id: safeText(row.id, 120),
    classId: safeText(row.class_id, 120),
    title: safeText(row.title, 160),
    assignmentType: safeText(row.assignment_type, 60),
    targetConceptKey: safeText(row.target_concept_key || "unknown/unavailable", 180),
    dueAt: safeText(row.due_at || "unknown/unavailable", 80),
    status: safeText(row.status || "unknown/unavailable", 40),
    createdAt: safeText(row.created_at || "unknown/unavailable", 80),
  };
}

export async function createClassAssignment({ config, classId, draft, fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Assignment creation requires Supabase URL, anon key, and authenticated access token.");
  }
  const teacherId = authUserIdFromAccessToken(readyConfig.accessToken);
  if (!teacherId) throw new Error("Assignment creation requires an authenticated access token with a UUID subject.");
  const normalizedClass = normalizeClassId(classId);
  if (!normalizedClass.valid) throw new Error("Assignment creation requires a valid class UUID.");
  const normalizedDraft = normalizeAssignmentDraft(draft);
  if (!normalizedDraft.valid) throw new Error(`Assignment creation blocked: ${normalizedDraft.errors.join(", ")}`);

  const body = {
    class_id: normalizedClass.classId,
    created_by: teacherId,
    title: normalizedDraft.title,
    assignment_type: normalizedDraft.assignmentType,
    target_concept_key: normalizedDraft.targetConceptKey || null,
    due_at: normalizedDraft.dueAt,
  };
  const response = await fetchImpl(assignmentUrl(readyConfig), {
    method: "POST",
    headers: assignmentHeaders(readyConfig, "return=representation"),
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Supabase assignment creation failed: ${response.status}`);
  const rows = await response.json().catch(() => []);
  return {
    version: TEACHER_ASSIGNMENTS_VERSION,
    assignment: normalizeAssignmentRow(Array.isArray(rows) ? rows[0] : {}),
  };
}

export async function fetchClassAssignments({ config, classId, fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Assignment list requires Supabase URL, anon key, and authenticated access token.");
  }
  const normalizedClass = normalizeClassId(classId);
  if (!normalizedClass.valid) throw new Error("Assignment list requires a valid class UUID.");
  const query = [
    `class_id=eq.${encodeURIComponent(normalizedClass.classId)}`,
    "select=id,class_id,title,assignment_type,target_concept_key,due_at,status,created_at",
    "order=due_at.asc.nullslast,created_at.desc",
  ].join("&");
  const response = await fetchImpl(assignmentUrl(readyConfig, `?${query}`), {
    method: "GET",
    headers: assignmentHeaders(readyConfig),
  });
  if (!response.ok) throw new Error(`Supabase assignment list fetch failed: ${response.status}`);
  const rows = await response.json();
  return {
    version: TEACHER_ASSIGNMENTS_VERSION,
    classId: normalizedClass.classId,
    assignments: Array.isArray(rows) ? rows.map(normalizeAssignmentRow) : [],
  };
}
