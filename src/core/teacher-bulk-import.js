import { normalizeSupabaseSyncConfig } from "./progress-sync.js";
import { normalizeClassId } from "./teacher-students.js";

export const TEACHER_BULK_IMPORT_VERSION = 1;
const ALLOWED_STATUSES = new Set(["active", "invited", "inactive"]);

function safeText(value, max = 240) {
  return String(value ?? "").trim().slice(0, max);
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(safeText(value, 80));
}

function splitCsvLine(line = "") {
  const cells = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
      continue;
    }
    if (char === '"') {
      quoted = !quoted;
      continue;
    }
    if (char === "," && !quoted) {
      cells.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  cells.push(current.trim());
  return cells;
}

export function parseStudentCsv(csvText = "") {
  const lines = String(csvText || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!lines.length) return { rows: [], errors: ["csv-empty"] };

  const headers = splitCsvLine(lines[0]).map((header) => safeText(header, 80).toLowerCase());
  const displayNameIndex = headers.indexOf("display_name");
  const statusIndex = headers.indexOf("status");
  const studentIdIndex = headers.indexOf("student_id");
  if (displayNameIndex < 0) return { rows: [], errors: ["display_name-header-required"] };

  const errors = [];
  const rows = lines.slice(1).map((line, lineIndex) => {
    const cells = splitCsvLine(line);
    const displayName = safeText(cells[displayNameIndex], 160);
    const rawStatus = statusIndex >= 0 ? safeText(cells[statusIndex], 40) : "invited";
    const status = ALLOWED_STATUSES.has(rawStatus) ? rawStatus : "invited";
    const studentId = studentIdIndex >= 0 ? safeText(cells[studentIdIndex], 80) : "";
    if (!displayName) errors.push(`row-${lineIndex + 2}-missing-display-name`);
    if (studentId && !isUuid(studentId)) errors.push(`row-${lineIndex + 2}-invalid-student-id`);
    return {
      displayName,
      status,
      studentId: studentId || null,
    };
  }).filter((row) => row.displayName);

  return {
    version: TEACHER_BULK_IMPORT_VERSION,
    rows,
    errors,
  };
}

function importHeaders(config) {
  return {
    apikey: config.anonKey,
    Authorization: `Bearer ${config.accessToken}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=representation",
  };
}

export async function bulkImportClassStudents({ config, classId, csvText, fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Bulk import requires Supabase URL, anon key, and authenticated access token.");
  }
  const normalizedClass = normalizeClassId(classId);
  if (!normalizedClass.valid) throw new Error("Bulk import requires a valid class UUID.");
  const parsed = parseStudentCsv(csvText);
  if (parsed.errors.length) throw new Error(`Bulk import blocked: ${parsed.errors.join(", ")}`);
  if (!parsed.rows.length) throw new Error("Bulk import blocked: no student rows.");

  const body = parsed.rows.map((row) => ({
    class_id: normalizedClass.classId,
    student_id: row.studentId,
    display_name: row.displayName,
    status: row.status,
  }));
  const response = await fetchImpl(
    `${readyConfig.url}/rest/v1/class_students?on_conflict=class_id,display_name`,
    {
      method: "POST",
      headers: importHeaders(readyConfig),
      body: JSON.stringify(body),
    },
  );
  if (!response.ok) throw new Error(`Supabase bulk student import failed: ${response.status}`);
  const rows = await response.json().catch(() => []);
  return {
    version: TEACHER_BULK_IMPORT_VERSION,
    classId: normalizedClass.classId,
    imported: Array.isArray(rows) ? rows.length : parsed.rows.length,
    requested: parsed.rows.length,
  };
}
