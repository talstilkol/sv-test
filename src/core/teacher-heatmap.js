import { normalizeSupabaseSyncConfig } from "./progress-sync.js";
import { normalizeClassId } from "./teacher-students.js";

export const TEACHER_HEATMAP_VERSION = 1;

function safeText(value, max = 240) {
  return String(value ?? "").trim().slice(0, max);
}

function safeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Math.round(safeNumber(value, 0))));
}

function masteryStatus(masteryPct, attempts) {
  if (!safeNumber(attempts, 0)) return "unknown";
  if (masteryPct >= 80) return "strong";
  if (masteryPct >= 50) return "developing";
  return "risk";
}

function heatmapRestUrl(config, classId) {
  const query = [
    `class_id=eq.${encodeURIComponent(classId)}`,
    "select=class_student_id,concept_key,mastery_pct,previous_mastery_pct,attempts,correct,last_evidence_at,updated_at,class_students(display_name,status)",
    "order=concept_key.asc",
  ].join("&");
  return `${config.url}/rest/v1/class_concept_mastery?${query}`;
}

function heatmapHeaders(config) {
  return {
    apikey: config.anonKey,
    Authorization: `Bearer ${config.accessToken}`,
    "Content-Type": "application/json",
  };
}

export function normalizeHeatmapRow(row = {}) {
  const masteryPct = clampPercent(row.mastery_pct);
  const previousMasteryPct = row.previous_mastery_pct === null || row.previous_mastery_pct === undefined
    ? null
    : clampPercent(row.previous_mastery_pct);
  const attempts = Math.max(0, Math.round(safeNumber(row.attempts, 0)));
  const correct = Math.max(0, Math.min(attempts, Math.round(safeNumber(row.correct, 0))));
  const student = row.class_students && typeof row.class_students === "object" ? row.class_students : {};
  return {
    classStudentId: safeText(row.class_student_id, 120),
    studentName: safeText(student.display_name || "unknown/unavailable", 160),
    studentStatus: safeText(student.status || "unknown/unavailable", 40),
    conceptKey: safeText(row.concept_key, 180),
    masteryPct,
    previousMasteryPct,
    masteryDeltaPct: previousMasteryPct === null ? null : masteryPct - previousMasteryPct,
    attempts,
    correct,
    status: masteryStatus(masteryPct, attempts),
    lastEvidenceAt: safeText(row.last_evidence_at || "unknown/unavailable", 80),
    updatedAt: safeText(row.updated_at || "unknown/unavailable", 80),
  };
}

export function buildConceptHeatmap(rows = []) {
  const normalizedRows = (Array.isArray(rows) ? rows : [])
    .map(normalizeHeatmapRow)
    .filter((row) => row.classStudentId && row.conceptKey);
  const studentsById = new Map();
  const concepts = [];
  const conceptSet = new Set();
  const cells = Object.create(null);

  normalizedRows.forEach((row) => {
    if (!studentsById.has(row.classStudentId)) {
      studentsById.set(row.classStudentId, {
        id: row.classStudentId,
        name: row.studentName,
        status: row.studentStatus,
      });
    }
    if (!conceptSet.has(row.conceptKey)) {
      conceptSet.add(row.conceptKey);
      concepts.push(row.conceptKey);
    }
    cells[`${row.classStudentId}::${row.conceptKey}`] = {
      masteryPct: row.masteryPct,
      previousMasteryPct: row.previousMasteryPct,
      masteryDeltaPct: row.masteryDeltaPct,
      attempts: row.attempts,
      correct: row.correct,
      status: row.status,
      lastEvidenceAt: row.lastEvidenceAt,
      updatedAt: row.updatedAt,
    };
  });

  return {
    version: TEACHER_HEATMAP_VERSION,
    students: Array.from(studentsById.values()).sort((a, b) => a.name.localeCompare(b.name)),
    concepts: concepts.sort((a, b) => a.localeCompare(b)),
    cells,
    rowCount: normalizedRows.length,
  };
}

export function buildTeacherLiteExport({
  classId = "",
  studentsReport = null,
  heatmapReport = null,
  generatedAt = "unknown/unavailable",
} = {}) {
  const students = Array.isArray(studentsReport?.students) ? studentsReport.students : [];
  const heatmap = heatmapReport && typeof heatmapReport === "object"
    ? heatmapReport
    : buildConceptHeatmap([]);
  const concepts = Array.isArray(heatmap.concepts) ? heatmap.concepts : [];
  const heatmapStudents = Array.isArray(heatmap.students) ? heatmap.students : [];
  const cells = heatmap.cells && typeof heatmap.cells === "object" ? heatmap.cells : {};
  const weakTopics = concepts
    .map((conceptKey) => {
      const conceptCells = heatmapStudents
        .map((student) => cells[`${student.id}::${conceptKey}`])
        .filter(Boolean);
      const attempted = conceptCells.filter((cell) => safeNumber(cell.attempts, 0) > 0);
      const averageMastery = attempted.length
        ? Math.round(attempted.reduce((sum, cell) => sum + clampPercent(cell.masteryPct), 0) / attempted.length)
        : 0;
      const riskCount = attempted.filter((cell) => cell.status === "risk").length;
      return {
        conceptKey,
        attemptedStudents: attempted.length,
        riskCount,
        averageMastery,
      };
    })
    .filter((topic) => topic.attemptedStudents > 0 && (topic.riskCount > 0 || topic.averageMastery < 60))
    .sort((a, b) => {
      const riskDiff = b.riskCount - a.riskCount;
      if (riskDiff) return riskDiff;
      const masteryDiff = a.averageMastery - b.averageMastery;
      if (masteryDiff) return masteryDiff;
      return a.conceptKey.localeCompare(b.conceptKey);
    });

  return {
    version: TEACHER_HEATMAP_VERSION,
    reportType: "teacher-lite-class-export",
    generatedAt: safeText(generatedAt || "unknown/unavailable", 80),
    classId: safeText(classId || heatmap.classId || studentsReport?.classId || "unknown/unavailable", 120),
    courseKey: "svcollege_fullstack_ai",
    students: students.map((student) => ({
      id: safeText(student.id || "unknown/unavailable", 120),
      displayName: safeText(student.displayName || student.name || "unknown/unavailable", 160),
      status: safeText(student.status || "unknown/unavailable", 40),
      joinedAt: safeText(student.joinedAt || "unknown/unavailable", 80),
      lastActiveAt: safeText(student.lastActiveAt || "unknown/unavailable", 80),
    })),
    heatmap: {
      rowCount: Math.max(0, Math.round(safeNumber(heatmap.rowCount, 0))),
      students: heatmapStudents,
      concepts,
      cells,
    },
    weakTopics,
    unavailable: {
      students: !students.length,
      heatmap: !concepts.length || !heatmapStudents.length,
    },
  };
}

export async function fetchClassConceptHeatmap({ config, classId, fetchImpl = fetch } = {}) {
  const readyConfig = normalizeSupabaseSyncConfig(config);
  if (!readyConfig.ready) {
    throw new Error("Concept heatmap requires Supabase URL, anon key, and authenticated access token.");
  }
  const normalized = normalizeClassId(classId);
  if (!normalized.valid) {
    throw new Error("Concept heatmap requires a valid class UUID.");
  }
  const response = await fetchImpl(heatmapRestUrl(readyConfig, normalized.classId), {
    method: "GET",
    headers: heatmapHeaders(readyConfig),
  });
  if (!response.ok) {
    throw new Error(`Supabase concept heatmap fetch failed: ${response.status}`);
  }
  const rows = await response.json();
  return {
    classId: normalized.classId,
    ...buildConceptHeatmap(rows),
  };
}
