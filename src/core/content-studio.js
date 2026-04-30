import { stableHash } from "./learning-evidence.js";

export const CONTENT_STUDIO_VERSION = "content-studio-v1";

export const CONTENT_ITEM_STATUSES = Object.freeze({
  DRAFT: "draft",
  REVIEWED: "reviewed",
  VERIFIED: "verified",
  NEEDS_FIX: "needs-fix",
});

export const CONTENT_ITEM_TYPES = Object.freeze({
  QUESTION: "question",
  EXPLANATION: "explanation",
  TECHNICAL_CLAIM: "technical-claim",
  VIDEO_ASSET: "video-asset",
});

const VALID_STATUSES = new Set(Object.values(CONTENT_ITEM_STATUSES));
const VALID_TYPES = new Set(Object.values(CONTENT_ITEM_TYPES));
const SEVERITY_PRIORITY = Object.freeze({
  blocker: 0,
  error: 0,
  warning: 1,
  needs_fix: 1,
  "needs-fix": 1,
  note: 2,
  info: 3,
});

function safeText(value, max = 220) {
  return String(value || "").trim().slice(0, max);
}

function safeNumber(value, fallback = null) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function stableList(value, maxItems = 12, maxText = 180) {
  const seen = new Set();
  return safeArray(value)
    .map((item) => safeText(item, maxText))
    .filter((item) => {
      if (!item || seen.has(item)) return false;
      seen.add(item);
      return true;
    })
    .slice(0, maxItems);
}

function itemConceptKey(item = {}) {
  return safeText(item.conceptKey || item.concept || item.tag || "", 220);
}

function itemLevel(item = {}) {
  return safeNumber(item.level ?? item.difficulty ?? item.challenge, 0) || 0;
}

function hasCompleteOptionFeedback(question = {}, optionFeedback = {}) {
  const options = safeArray(question.options);
  if (!options.length) return true;
  const inline = safeArray(question.optionFeedback);
  if (inline.length === options.length && inline.every((item) => safeText(item, 260))) return true;
  const mapped = safeArray(optionFeedback[safeText(question.id, 180)]);
  return mapped.length === options.length && mapped.every((item) => safeText(item, 260));
}

function itemsForConcept(items = [], key = "") {
  return safeArray(items).filter((item) => itemConceptKey(item) === key);
}

function normalizeStatus(status) {
  const value = safeText(status, 40);
  return VALID_STATUSES.has(value) ? value : CONTENT_ITEM_STATUSES.DRAFT;
}

function normalizeType(type) {
  const value = safeText(type, 50);
  return VALID_TYPES.has(value) ? value : CONTENT_ITEM_TYPES.QUESTION;
}

function normalizeEvidenceItem(item = {}) {
  return {
    kind: safeText(item.kind || item.type || "repository", 60),
    title: safeText(item.title || item.label || item.sourceId || "unknown/unavailable", 160),
    url: safeText(item.url || item.href || "", 260),
    status: safeText(item.status || "unreviewed", 60),
    reviewedAt: safeText(item.reviewedAt || "", 40),
    replacementDate: safeText(item.replacementDate || "", 40),
  };
}

function normalizeEvidenceList(value) {
  return safeArray(value)
    .map(normalizeEvidenceItem)
    .filter((item) => item.title !== "unknown/unavailable" || item.url || item.status !== "unreviewed")
    .slice(0, 8);
}

export function makeContentItemId(input = {}) {
  const type = normalizeType(input.type);
  const seed = [
    type,
    safeText(input.sourceId || input.questionId || input.id, 180),
    safeText(input.lessonId, 120),
    safeText(input.conceptKey, 220),
    safeText(input.title || input.prompt || input.claim, 260),
    safeText(input.explanation || input.body || input.message, 260),
    normalizeEvidenceList(input.sourceEvidence)
      .map((item) => `${item.kind}:${item.title}:${item.url}:${item.status}`)
      .join("|"),
  ].join("::");
  return `content-${stableHash(seed)}`;
}

export function normalizeContentItem(input = {}) {
  const type = normalizeType(input.type);
  const sourceId = safeText(input.sourceId || input.questionId || input.id, 180);
  const conceptKey = safeText(input.conceptKey, 220);
  const title = safeText(
    input.title || input.prompt || input.claim || sourceId || conceptKey || "unknown/unavailable",
    180,
  );
  const itemForId = {
    ...input,
    type,
    sourceId,
    conceptKey,
    title,
  };

  return {
    id: safeText(input.id, 100) || makeContentItemId(itemForId),
    version: CONTENT_STUDIO_VERSION,
    type,
    status: normalizeStatus(input.status),
    sourceId,
    lessonId: safeText(input.lessonId, 120),
    conceptKey,
    title,
    prompt: safeText(input.prompt || input.question || input.code, 500),
    explanation: safeText(input.explanation || input.body, 700),
    claim: safeText(input.claim, 360),
    severity: safeText(input.severity || "", 40),
    code: safeText(input.code || input.issueCode || input.feedbackCode, 100),
    action: safeText(input.action || "", 120),
    statusReason: safeText(input.statusReason || input.message || "", 260),
    reviewer: safeText(input.reviewer || "", 90),
    reviewNotes: safeText(input.reviewNotes || "", 360),
    sourceEvidence: normalizeEvidenceList(input.sourceEvidence),
    conceptKeys: stableList(input.conceptKeys, 16, 220),
    updatedAt: safeText(input.updatedAt || "", 40),
    priority: safeNumber(input.priority, SEVERITY_PRIORITY[safeText(input.severity, 40)] ?? 3),
  };
}

function queueItemFromQa(issue = {}) {
  const sourceId = safeText(issue.id || issue.questionId || issue.sourceId, 180);
  const severity = safeText(issue.severity || "warning", 40);
  return normalizeContentItem({
    type: CONTENT_ITEM_TYPES.QUESTION,
    status: CONTENT_ITEM_STATUSES.NEEDS_FIX,
    sourceId,
    conceptKey: issue.conceptKey || "",
    title: sourceId || issue.entity || "QA warning",
    prompt: issue.prompt || "",
    explanation: issue.explanation || "",
    severity,
    code: issue.code || issue.issueCode || "",
    action: issue.action || "manual-review",
    statusReason: issue.message || issue.guidance || "",
    sourceEvidence: [
      {
        kind: issue.source || "repository-qa",
        title: issue.sourceReport || "QUESTION_QUALITY_REPORT",
        status: "review-required",
      },
    ],
    priority: safeNumber(issue.priority, SEVERITY_PRIORITY[severity] ?? 1),
  });
}

function queueItemFromMistake(event = {}) {
  const isStuck = event.type === "student_stuck";
  const sourceId = safeText(event.questionId || event.feedbackId || event.id, 180);
  return normalizeContentItem({
    type: CONTENT_ITEM_TYPES.EXPLANATION,
    status: CONTENT_ITEM_STATUSES.NEEDS_FIX,
    sourceId,
    lessonId: event.lessonId || "",
    conceptKey: event.conceptKey || "",
    title: event.conceptName || event.conceptKey || sourceId || "student mistake",
    severity: isStuck ? "warning" : "note",
    code: isStuck ? event.feedbackCode || "student-stuck" : "wrong-answer",
    action: isStuck ? "clarify-prerequisite-path" : "review-explanation",
    statusReason: isStuck
      ? "Learner reported being stuck on this question or prerequisite path."
      : "Wrong answer evidence indicates this explanation should be reviewed.",
    sourceEvidence: [
      {
        kind: "local-learning-evidence",
        title: isStuck ? "student_stuck event" : "wrong answer event",
        status: "anonymized",
      },
    ],
    conceptKeys: event.conceptKeys || [],
    priority: isStuck ? 1 : 2,
  });
}

function queueItemFromTeacherFeedback(feedback = {}) {
  const sourceId = safeText(feedback.sourceId || feedback.questionId || feedback.id, 180);
  return normalizeContentItem({
    type: normalizeType(feedback.type || CONTENT_ITEM_TYPES.EXPLANATION),
    status: normalizeStatus(feedback.status || CONTENT_ITEM_STATUSES.NEEDS_FIX),
    sourceId,
    lessonId: feedback.lessonId || "",
    conceptKey: feedback.conceptKey || "",
    title: feedback.title || sourceId || feedback.conceptKey || "teacher feedback",
    severity: feedback.severity || "warning",
    code: feedback.code || "teacher-feedback",
    action: feedback.action || "manual-review",
    statusReason: feedback.message || feedback.statusReason || "",
    sourceEvidence: [
      {
        kind: "teacher-feedback",
        title: feedback.sourceLabel || "teacher review",
        status: "review-required",
      },
    ],
    priority: safeNumber(feedback.priority, 1),
  });
}

function dedupeAndSort(queue) {
  const byId = new Map();
  queue.forEach((item) => {
    const existing = byId.get(item.id);
    if (!existing || item.priority < existing.priority) byId.set(item.id, item);
  });
  return [...byId.values()].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    const severityCompare = a.severity.localeCompare(b.severity);
    if (severityCompare) return severityCompare;
    const typeCompare = a.type.localeCompare(b.type);
    if (typeCompare) return typeCompare;
    return a.id.localeCompare(b.id);
  });
}

export function buildReviewQueue({ qaWarnings = [], mistakeEvents = [], teacherFeedback = [] } = {}) {
  const qaItems = safeArray(qaWarnings).map(queueItemFromQa);
  const mistakeItems = safeArray(mistakeEvents)
    .filter((event) => event && (event.type === "student_stuck" || event.correct === false))
    .map(queueItemFromMistake);
  const teacherItems = safeArray(teacherFeedback).map(queueItemFromTeacherFeedback);

  return dedupeAndSort([...qaItems, ...mistakeItems, ...teacherItems]).map((item, index) => ({
    ...item,
    order: index + 1,
  }));
}

export function diffContentRevision(before = {}, after = {}) {
  const oldItem = normalizeContentItem(before);
  const newItem = normalizeContentItem(after);
  const fields = [
    "type",
    "status",
    "sourceId",
    "lessonId",
    "conceptKey",
    "title",
    "prompt",
    "explanation",
    "claim",
    "code",
    "action",
    "statusReason",
    "reviewNotes",
  ];
  const changes = fields
    .map((field) => ({
      field,
      before: oldItem[field],
      after: newItem[field],
      changed: oldItem[field] !== newItem[field],
    }))
    .filter((change) => change.changed);

  const evidenceBefore = JSON.stringify(oldItem.sourceEvidence);
  const evidenceAfter = JSON.stringify(newItem.sourceEvidence);
  if (evidenceBefore !== evidenceAfter) {
    changes.push({
      field: "sourceEvidence",
      before: evidenceBefore,
      after: evidenceAfter,
      changed: true,
    });
  }

  return {
    version: CONTENT_STUDIO_VERSION,
    id: newItem.id || oldItem.id,
    changed: changes.length > 0,
    changes,
    before: oldItem,
    after: newItem,
  };
}

export function summarizeContentStudio(items = []) {
  const normalized = safeArray(items).map(normalizeContentItem);
  const summary = {
    version: CONTENT_STUDIO_VERSION,
    total: normalized.length,
    byStatus: {},
    byType: {},
    needsReview: 0,
    verified: 0,
    missingEvidence: 0,
    readyForRelease: false,
  };

  normalized.forEach((item) => {
    summary.byStatus[item.status] = (summary.byStatus[item.status] || 0) + 1;
    summary.byType[item.type] = (summary.byType[item.type] || 0) + 1;
    if (item.status === CONTENT_ITEM_STATUSES.NEEDS_FIX || item.status === CONTENT_ITEM_STATUSES.DRAFT) {
      summary.needsReview += 1;
    }
    if (item.status === CONTENT_ITEM_STATUSES.VERIFIED) summary.verified += 1;
    if (
      (item.type === CONTENT_ITEM_TYPES.TECHNICAL_CLAIM || item.type === CONTENT_ITEM_TYPES.VIDEO_ASSET)
      && item.sourceEvidence.length === 0
    ) {
      summary.missingEvidence += 1;
    }
  });

  summary.readyForRelease = summary.total > 0 && summary.needsReview === 0 && summary.missingEvidence === 0;
  return summary;
}

export function buildContentFactoryDashboard({
  lessons = [],
  questionsBank = {},
  optionFeedback = {},
  hardLevel = 6,
} = {}) {
  const mc = safeArray(questionsBank.mc);
  const fill = safeArray(questionsBank.fill);
  const trace = safeArray(questionsBank.trace);
  const bug = safeArray(questionsBank.bug);
  const build = safeArray(questionsBank.build);
  const rows = safeArray(lessons).flatMap((lesson) =>
    safeArray(lesson.concepts).map((concept) => {
      const conceptName = safeText(concept.conceptName || concept.name, 180);
      const lessonId = safeText(lesson.id, 120);
      const key = `${lessonId}::${conceptName}`;
      const conceptMc = itemsForConcept(mc, key);
      const conceptFill = itemsForConcept(fill, key);
      const conceptTrace = itemsForConcept(trace, key);
      const conceptBug = itemsForConcept(bug, key);
      const conceptBuild = itemsForConcept(build, key);
      const hardMc = conceptMc.filter((item) => itemLevel(item) >= hardLevel);
      const hardFill = conceptFill.filter((item) => itemLevel(item) >= hardLevel);
      const missingDistractorFeedback = conceptMc.filter((item) => !hasCompleteOptionFeedback(item, optionFeedback));
      const codeBearing = Boolean(concept.codeExample || concept.code || concept.syntax || concept.example);
      const missing = [
        hardMc.length ? "" : "hard-mc",
        hardFill.length ? "" : "hard-fill",
        codeBearing && !conceptTrace.length ? "trace" : "",
        codeBearing && !conceptBug.length ? "bug" : "",
        codeBearing && !conceptBuild.length ? "build" : "",
        missingDistractorFeedback.length ? "distractor-feedback" : "",
      ].filter(Boolean);
      return {
        key,
        lessonId,
        lessonTitle: safeText(lesson.title || lessonId, 180),
        conceptName,
        codeBearing,
        hardMc: hardMc.length,
        hardFill: hardFill.length,
        trace: conceptTrace.length,
        bug: conceptBug.length,
        build: conceptBuild.length,
        mcWithoutDistractorFeedback: missingDistractorFeedback.length,
        missing,
        ready: missing.length === 0,
      };
    }),
  );
  const needsRows = rows.filter((row) => !row.ready);
  const countMissing = (kind) => rows.filter((row) => row.missing.includes(kind)).length;
  return {
    version: CONTENT_STUDIO_VERSION,
    policy: "Dashboard only reads real lesson and question-bank data. It does not generate, backfill, or invent questions.",
    targets: {
      hardLevel,
      hardMcPerConcept: 1,
      hardFillPerConcept: 1,
      codeActivitiesPerCodeConcept: "trace + bug + build",
      distractorFeedback: "complete optionFeedback for every MC option",
    },
    summary: {
      concepts: rows.length,
      ready: rows.length - needsRows.length,
      needsWork: needsRows.length,
      missingHardMc: countMissing("hard-mc"),
      missingHardFill: countMissing("hard-fill"),
      missingTrace: countMissing("trace"),
      missingBug: countMissing("bug"),
      missingBuild: countMissing("build"),
      missingDistractorFeedback: countMissing("distractor-feedback"),
    },
    rows,
    needsQueue: needsRows
      .sort((a, b) => {
        if (b.missing.length !== a.missing.length) return b.missing.length - a.missing.length;
        return a.key.localeCompare(b.key);
      })
      .map((row, index) => ({ ...row, order: index + 1 })),
  };
}

const MANUAL_AUTHORING_ACTIONS = Object.freeze({
  "hard-mc": {
    priority: 1,
    type: "hard-mc",
    action: "author-hard-mc",
    requiredOutput: "hard multiple-choice question with per-option feedback",
  },
  "hard-fill": {
    priority: 2,
    type: "hard-fill",
    action: "author-hard-fill",
    requiredOutput: "fill/code proof question",
  },
  trace: {
    priority: 3,
    type: "trace",
    action: "author-trace",
    requiredOutput: "code trace activity",
  },
  bug: {
    priority: 4,
    type: "bug",
    action: "author-bug",
    requiredOutput: "bug diagnosis activity",
  },
  build: {
    priority: 5,
    type: "build",
    action: "author-build",
    requiredOutput: "guided build activity",
  },
  "distractor-feedback": {
    priority: 6,
    type: "distractor-feedback",
    action: "write-distractor-feedback",
    requiredOutput: "feedback for every existing MC option",
  },
});

export const HARD_QUESTION_TEMPLATE_FAMILIES = Object.freeze({
  "js-basics": {
    label: "JS basics",
    appliesWhen: ["lesson_11", "lesson_12", "lesson_13", "lesson_14", "lesson_15"],
    requiredProof: ["define in one line", "predict runtime value", "explain mutation/reference behavior"],
  },
  "react-state": {
    label: "React state",
    appliesWhen: ["lesson_21", "lesson_22", "lesson_23", "lesson_24", "react"],
    requiredProof: ["identify owner of state", "avoid mutation", "explain render trigger"],
  },
  api: {
    label: "API",
    appliesWhen: ["lesson_17", "REST", "HTTP", "Request", "Response"],
    requiredProof: ["method/url/body/status contract", "error handling path", "client/server boundary"],
  },
  db: {
    label: "DB",
    appliesWhen: ["lesson_sql_orm", "SQL", "ORM", "database"],
    requiredProof: ["schema/source-of-truth", "query shape", "persistence vs temporary state"],
  },
  auth: {
    label: "Auth",
    appliesWhen: ["lesson_auth_security", "authentication", "authorization", "JWT"],
    requiredProof: ["identity vs permission", "token/session boundary", "protected route failure mode"],
  },
  next: {
    label: "Next",
    appliesWhen: ["lesson_nextjs", "Next", "server component", "route handler"],
    requiredProof: ["server/client component boundary", "routing contract", "data loading point"],
  },
  devops: {
    label: "DevOps",
    appliesWhen: ["devops", "deploy", "ci", "docker", "environment"],
    requiredProof: ["build/runtime distinction", "environment variable risk", "release rollback"],
  },
  ai: {
    label: "AI",
    appliesWhen: ["ai", "LLM", "agent", "prompt", "model"],
    requiredProof: ["tool vs model vs product", "input/output constraint", "safety/evaluation signal"],
  },
});

export const REVIEWER_CHECKLIST_ITEMS = Object.freeze([
  {
    id: "one-line-definition",
    label: "One-line definition",
    requirement: "The item states the concept in one precise sentence before testing edge cases.",
  },
  {
    id: "prerequisite-terms",
    label: "Prerequisite terms",
    requirement: "The item names prerequisite terms that a learner must know before solving it.",
  },
  {
    id: "correct-answer",
    label: "Correct answer",
    requirement: "The correct answer is unambiguous and follows from the existing lesson/source data.",
  },
  {
    id: "distractor-quality",
    label: "Distractor quality",
    requirement: "Every wrong option maps to a real misconception and has per-option feedback.",
  },
  {
    id: "memory-association",
    label: "Memory association",
    requirement: "The review includes a memorable cue or association tied to the concept, not a new fact.",
  },
]);

export function classifyConceptFamily({ conceptKey = "", lessonTitle = "", conceptName = "" } = {}) {
  const text = [conceptKey, lessonTitle, conceptName].map((item) => safeText(item, 260).toLowerCase()).join(" ");
  const entries = Object.entries(HARD_QUESTION_TEMPLATE_FAMILIES);
  const found = entries.find(([, family]) =>
    family.appliesWhen.some((signal) => text.includes(String(signal).toLowerCase())),
  );
  return found ? found[0] : "js-basics";
}

export function buildHardQuestionTemplateCatalog() {
  return Object.entries(HARD_QUESTION_TEMPLATE_FAMILIES).map(([id, family], index) => ({
    id,
    order: index + 1,
    label: family.label,
    appliesWhen: stableList(family.appliesWhen, 12, 120),
    requiredProof: stableList(family.requiredProof, 12, 180),
    policy: "Template is an authoring checklist only. It is not a generated question, answer, option list or placeholder.",
  }));
}

export function buildReviewerChecklistCatalog() {
  return REVIEWER_CHECKLIST_ITEMS.map((item, index) => ({
    ...item,
    order: index + 1,
    policy: "Checklist validates human-authored content only. It does not invent missing answers, distractors or examples.",
  }));
}

const QUESTION_DUPLICATE_KINDS = Object.freeze(["mc", "fill", "trace", "bug", "build"]);

function normalizeDuplicateText(value, max = 1200) {
  return safeText(value, max)
    .toLowerCase()
    .replace(/[\u200e\u200f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function canonicalConceptForDuplicate(rawKey, aliasMap = {}) {
  const start = safeText(rawKey, 220);
  if (!start) return "";
  let current = start;
  const seen = new Set();
  for (let step = 0; step < 12; step += 1) {
    const next = safeText(aliasMap[current], 220);
    if (!next || next === current || seen.has(next)) return current;
    seen.add(current);
    current = next;
  }
  return current;
}

function questionPromptForDuplicate(question = {}) {
  const parts = [
    question.question,
    question.prompt,
    question.title,
    question.code,
    safeArray(question.steps).map((step) => [step.prompt, step.answer].map((item) => safeText(item, 260)).join(" = ")).join(" | "),
    safeArray(question.tests).map((test) => safeText(test.description, 180)).join(" | "),
  ].filter((part) => safeText(part, 1200));
  return normalizeDuplicateText(parts.join(" | "));
}

function questionAnswerForDuplicate(question = {}) {
  return normalizeDuplicateText([
    question.answer,
    question.expected,
    question.reference,
    safeArray(question.answers).join(" | "),
    safeArray(question.acceptable).join(" | "),
  ].filter((part) => safeText(part, 1200)).join(" | "));
}

function questionOptionsForDuplicate(question = {}) {
  return stableList(question.options, 12, 260)
    .map((option) => normalizeDuplicateText(option, 260))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
    .join(" || ");
}

function collectQuestionDuplicateEntries(questionsBank = {}, conceptAliases = {}) {
  const sources = [
    { source: "curated", bank: questionsBank },
  ];
  return sources.flatMap(({ source, bank }) =>
    QUESTION_DUPLICATE_KINDS.flatMap((kind) =>
      safeArray(bank?.[kind]).map((question, index) => {
        const rawConceptKey = itemConceptKey(question);
        const canonicalConceptKey = canonicalConceptForDuplicate(rawConceptKey, conceptAliases);
        const prompt = questionPromptForDuplicate(question);
        const options = questionOptionsForDuplicate(question);
        const answer = questionAnswerForDuplicate(question);
        const identitySeed = [kind, canonicalConceptKey, prompt, options, answer].join("::");
        return {
          id: safeText(question.id, 180),
          kind,
          source,
          sourceIndex: index + 1,
          rawConceptKey,
          canonicalConceptKey,
          prompt,
          options,
          answer,
          identity: `question-identity-${stableHash(identitySeed)}`,
        };
      }),
    ),
  );
}

function duplicateGroups(entries, keyGetter, issueType) {
  const groups = new Map();
  entries.forEach((entry) => {
    const key = keyGetter(entry);
    if (!key) return;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(entry);
  });
  return [...groups.entries()]
    .filter(([, items]) => items.length > 1)
    .map(([key, items]) => ({
      type: issueType,
      key,
      count: items.length,
      ids: stableList(items.map((item) => item.id || `${item.source}:${item.kind}:${item.sourceIndex}`), 20, 220),
      conceptKeys: stableList(items.map((item) => item.rawConceptKey), 20, 220),
      canonicalConceptKeys: stableList(items.map((item) => item.canonicalConceptKey), 20, 220),
      pools: stableList(items.map((item) => `${item.source}:${item.kind}`), 20, 80),
    }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.key.localeCompare(b.key);
    });
}

export function buildQuestionDuplicateDetector({
  questionsBank = {},
  conceptAliases = {},
} = {}) {
  const entries = collectQuestionDuplicateEntries(questionsBank, conceptAliases);
  const duplicateIds = duplicateGroups(entries, (entry) => entry.id, "duplicate-id");
  const duplicateIdentities = duplicateGroups(
    entries.filter((entry) => entry.prompt),
    (entry) => entry.identity,
    "duplicate-question-identity",
  );
  const aliasCollisions = duplicateIdentities
    .filter((issue) => issue.conceptKeys.length > 1 && issue.canonicalConceptKeys.length === 1)
    .map((issue) => ({ ...issue, type: "alias-collision" }));
  const issues = [...duplicateIds, ...duplicateIdentities, ...aliasCollisions].sort((a, b) => {
    const typeCompare = a.type.localeCompare(b.type);
    if (typeCompare) return typeCompare;
    if (b.count !== a.count) return b.count - a.count;
    return a.key.localeCompare(b.key);
  });

  return {
    version: CONTENT_STUDIO_VERSION,
    policy: "Duplicate detector reads existing question pools and concept aliases only. It reports collisions for manual review and never deletes, rewrites or invents question content.",
    summary: {
      scannedQuestions: entries.length,
      duplicateIds: duplicateIds.length,
      duplicateIdentities: duplicateIdentities.length,
      aliasCollisions: aliasCollisions.length,
      issues: issues.length,
    },
    issues,
  };
}

function collectLessonConceptKeys(lessons = [], conceptAliases = {}) {
  const rows = safeArray(lessons).flatMap((lesson) =>
    safeArray(lesson.concepts).map((concept) => {
      const lessonId = safeText(lesson.id, 120);
      const conceptName = safeText(concept.conceptName || concept.name, 180);
      const key = `${lessonId}::${conceptName}`;
      return {
        key,
        canonicalKey: canonicalConceptForDuplicate(key, conceptAliases),
        lessonId,
        lessonTitle: safeText(lesson.title || lessonId, 180),
        conceptName,
      };
    }),
  );
  const canonicalKeys = new Set(rows.map((row) => row.canonicalKey).filter(Boolean));
  return { rows, canonicalKeys };
}

function collectScoreBucketEntries(scores = {}, conceptAliases = {}) {
  return Object.entries(scores || {})
    .map(([key, value]) => {
      const rawConceptKey = safeText(value?.conceptKey || key, 220);
      return {
        id: safeText(key, 220),
        source: "scores",
        kind: "score",
        sourceIndex: 1,
        rawScoreKey: safeText(key, 220),
        rawConceptKey,
        canonicalConceptKey: canonicalConceptForDuplicate(rawConceptKey, conceptAliases),
        level: safeNumber(value?.level ?? value?.currentLevel ?? value?.masteryLevel, null),
        attempts: safeNumber(value?.attempts ?? value?.total ?? value?.answers, null),
      };
    })
    .filter((entry) => entry.rawScoreKey || entry.rawConceptKey);
}

export function buildConceptTagAudit({
  lessons = [],
  questionsBank = {},
  scores = {},
  conceptAliases = {},
} = {}) {
  const { canonicalKeys } = collectLessonConceptKeys(lessons, conceptAliases);
  const questionEntries = collectQuestionDuplicateEntries(questionsBank, conceptAliases);
  const scoreEntries = collectScoreBucketEntries(scores, conceptAliases);
  const aliasEntries = Object.entries(conceptAliases || {})
    .map(([from, to]) => ({
      from: safeText(from, 220),
      to: safeText(to, 220),
      canonicalTo: canonicalConceptForDuplicate(to, conceptAliases),
    }))
    .filter((entry) => entry.from || entry.to)
    .sort((a, b) => a.from.localeCompare(b.from));

  const duplicateScoreBuckets = duplicateGroups(
    scoreEntries,
    (entry) => entry.canonicalConceptKey,
    "duplicate-score-bucket",
  ).filter((issue) => issue.conceptKeys.length > 1 || issue.ids.length > 1);

  const unresolvedQuestionKeys = questionEntries
    .filter((entry) => !entry.canonicalConceptKey || !canonicalKeys.has(entry.canonicalConceptKey))
    .map((entry) => ({
      type: "unresolved-question-concept",
      source: `${entry.source}:${entry.kind}`,
      id: entry.id || `${entry.source}:${entry.kind}:${entry.sourceIndex}`,
      rawConceptKey: entry.rawConceptKey,
      canonicalConceptKey: entry.canonicalConceptKey,
    }));

  const unresolvedScoreKeys = scoreEntries
    .filter((entry) => !entry.canonicalConceptKey || !canonicalKeys.has(entry.canonicalConceptKey))
    .map((entry) => ({
      type: "unresolved-score-concept",
      source: "scores",
      id: entry.rawScoreKey,
      rawConceptKey: entry.rawConceptKey,
      canonicalConceptKey: entry.canonicalConceptKey,
    }));

  const brokenAliases = aliasEntries
    .filter((entry) => !entry.canonicalTo || !canonicalKeys.has(entry.canonicalTo))
    .map((entry) => ({
      type: "broken-alias",
      source: "conceptAliases",
      id: entry.from,
      rawConceptKey: entry.from,
      canonicalConceptKey: entry.canonicalTo || entry.to,
    }));

  const unresolvedConceptKeys = [...unresolvedQuestionKeys, ...unresolvedScoreKeys]
    .sort((a, b) => {
      const typeCompare = a.type.localeCompare(b.type);
      if (typeCompare) return typeCompare;
      return a.id.localeCompare(b.id);
    });
  const orphanQuestions = unresolvedQuestionKeys
    .sort((a, b) => a.id.localeCompare(b.id));
  const issues = [
    ...duplicateScoreBuckets,
    ...unresolvedConceptKeys,
    ...brokenAliases,
  ].sort((a, b) => {
    const typeCompare = a.type.localeCompare(b.type);
    if (typeCompare) return typeCompare;
    return safeText(a.key || a.id, 220).localeCompare(safeText(b.key || b.id, 220));
  });

  return {
    version: CONTENT_STUDIO_VERSION,
    policy: "Concept-tag audit reads lesson registry, question pools, learner score buckets and aliases only. It reports issues for manual review and never renames, deletes or invents data.",
    summary: {
      lessonConcepts: canonicalKeys.size,
      scannedQuestions: questionEntries.length,
      scannedScoreBuckets: scoreEntries.length,
      aliases: aliasEntries.length,
      duplicateScoreBuckets: duplicateScoreBuckets.length,
      unresolvedConceptKeys: unresolvedConceptKeys.length,
      orphanQuestions: orphanQuestions.length,
      brokenAliases: brokenAliases.length,
      issues: issues.length,
    },
    duplicateScoreBuckets,
    unresolvedConceptKeys,
    orphanQuestions,
    brokenAliases,
    issues,
  };
}

export function buildConceptDensityTargetReport({
  lessons = [],
  questionsBank = {},
  optionFeedback = {},
  hardLevel = 6,
  targets = {},
} = {}) {
  const effectiveTargets = {
    hardMc: safeNumber(targets.hardMc, 1) || 1,
    hardFill: safeNumber(targets.hardFill, 1) || 1,
    traceForCode: safeNumber(targets.traceForCode, 1) || 1,
    bugForCode: safeNumber(targets.bugForCode, 1) || 1,
    buildForCode: safeNumber(targets.buildForCode, 1) || 1,
    requireDistractorFeedback: targets.requireDistractorFeedback !== false,
  };
  const dashboard = buildContentFactoryDashboard({ lessons, questionsBank, optionFeedback, hardLevel });
  const rows = dashboard.rows.map((row) => {
    const deficits = {
      hardMc: Math.max(0, effectiveTargets.hardMc - row.hardMc),
      hardFill: Math.max(0, effectiveTargets.hardFill - row.hardFill),
      trace: row.codeBearing ? Math.max(0, effectiveTargets.traceForCode - row.trace) : 0,
      bug: row.codeBearing ? Math.max(0, effectiveTargets.bugForCode - row.bug) : 0,
      build: row.codeBearing ? Math.max(0, effectiveTargets.buildForCode - row.build) : 0,
      distractorFeedback: effectiveTargets.requireDistractorFeedback ? row.mcWithoutDistractorFeedback : 0,
    };
    const deficitTotal = Object.values(deficits).reduce((sum, value) => sum + value, 0);
    return {
      key: row.key,
      lessonId: row.lessonId,
      lessonTitle: row.lessonTitle,
      conceptName: row.conceptName,
      codeBearing: row.codeBearing,
      counts: {
        hardMc: row.hardMc,
        hardFill: row.hardFill,
        trace: row.trace,
        bug: row.bug,
        build: row.build,
        mcWithoutDistractorFeedback: row.mcWithoutDistractorFeedback,
      },
      targets: effectiveTargets,
      deficits,
      deficitTotal,
      ready: deficitTotal === 0,
    };
  });
  const needsWork = rows.filter((row) => !row.ready);
  const sumDeficit = (kind) => rows.reduce((sum, row) => sum + row.deficits[kind], 0);

  return {
    version: CONTENT_STUDIO_VERSION,
    policy: "Density targets are measured from real lesson and question-bank data only. Missing density is reported as authoring work; no questions or proofs are fabricated.",
    hardLevel,
    targets: effectiveTargets,
    summary: {
      concepts: rows.length,
      ready: rows.length - needsWork.length,
      needsWork: needsWork.length,
      hardMcDeficit: sumDeficit("hardMc"),
      hardFillDeficit: sumDeficit("hardFill"),
      traceDeficit: sumDeficit("trace"),
      bugDeficit: sumDeficit("bug"),
      buildDeficit: sumDeficit("build"),
      distractorFeedbackDeficit: sumDeficit("distractorFeedback"),
    },
    rows,
    needsQueue: needsWork
      .sort((a, b) => {
        if (b.deficitTotal !== a.deficitTotal) return b.deficitTotal - a.deficitTotal;
        return a.key.localeCompare(b.key);
      })
      .map((row, index) => ({ ...row, order: index + 1 })),
  };
}

function videoExternalLinks(video = {}) {
  return safeArray(video.fallbackVideos)
    .map((link) => ({
      title: safeText(link.title || link.label, 180),
      source: safeText(link.source || "unknown/unavailable", 120),
      url: safeText(link.url || link.href, 260),
    }))
    .filter((link) => link.title && link.url)
    .slice(0, 8);
}

function normalizeVideoImportEntry(entry = {}, sourceType = "external-video", conceptAliases = {}) {
  const rawConceptKey = safeText(entry.conceptKey || entry.canonicalConceptKey, 220);
  const canonicalConceptKey = canonicalConceptForDuplicate(rawConceptKey, conceptAliases);
  const externalLinks = safeArray(entry.externalLinks).length
    ? safeArray(entry.externalLinks).map((link) => ({
        title: safeText(link.title || link.label, 180),
        source: safeText(link.source || "unknown/unavailable", 120),
        url: safeText(link.url || link.href, 260),
      })).filter((link) => link.title && link.url).slice(0, 8)
    : videoExternalLinks(entry);
  return {
    id: safeText(entry.id, 180) || `video-import-${stableHash([sourceType, rawConceptKey, entry.title, entry.url].join("|"))}`,
    sourceType: safeText(entry.sourceType || sourceType, 80),
    title: safeText(entry.title || entry.name, 180),
    source: safeText(entry.source || "unknown/unavailable", 120),
    rawConceptKey,
    canonicalConceptKey,
    prompt: safeText(entry.prompt || entry.objective || "", 420),
    storyboardScenes: safeArray(entry.scenes).length,
    externalLinks,
    mapped: Boolean(canonicalConceptKey),
  };
}

export function buildVideoImportMap({
  conceptVideos = {},
  notebookClips = [],
  externalVideos = [],
  conceptAliases = {},
} = {}) {
  const storyboardEntries = Object.entries(conceptVideos || {}).map(([conceptKey, video]) =>
    normalizeVideoImportEntry({ ...video, conceptKey, source: "CONCEPT_VIDEOS" }, "concept-video-storyboard", conceptAliases),
  );
  const notebookEntries = safeArray(notebookClips).map((clip) =>
    normalizeVideoImportEntry(clip, "notebooklm-clip", conceptAliases),
  );
  const externalEntries = safeArray(externalVideos).map((video) =>
    normalizeVideoImportEntry(video, "external-video", conceptAliases),
  );
  const entries = [...storyboardEntries, ...notebookEntries, ...externalEntries]
    .sort((a, b) => {
      if (a.mapped !== b.mapped) return a.mapped ? -1 : 1;
      const keyCompare = a.canonicalConceptKey.localeCompare(b.canonicalConceptKey);
      if (keyCompare) return keyCompare;
      return a.id.localeCompare(b.id);
    })
    .map((entry, index) => ({ ...entry, order: index + 1 }));
  const mapped = entries.filter((entry) => entry.mapped);
  const unmapped = entries.filter((entry) => !entry.mapped);
  const externalLinkCount = entries.reduce((sum, entry) => sum + entry.externalLinks.length, 0);

  return {
    version: CONTENT_STUDIO_VERSION,
    policy: "Video import map only indexes existing NotebookLM clip metadata, storyboard clips and external links by canonical concept tag. Missing concept tags stay unmapped; no URLs, clips or video claims are invented.",
    summary: {
      entries: entries.length,
      mappedEntries: mapped.length,
      unmappedEntries: unmapped.length,
      mappedConcepts: new Set(mapped.map((entry) => entry.canonicalConceptKey)).size,
      notebookClips: entries.filter((entry) => entry.sourceType === "notebooklm-clip").length,
      storyboardClips: entries.filter((entry) => entry.sourceType === "concept-video-storyboard").length,
      externalLinks: externalLinkCount,
    },
    entries,
    unmapped,
  };
}

export function buildExamCriticalContentReport({
  lessons = [],
  questionsBank = {},
  conceptVideos = {},
  examCriticalConceptKeys = [],
  conceptAliases = {},
} = {}) {
  const criticalKeys = new Set(
    stableList(examCriticalConceptKeys, 2000, 220).map((key) => canonicalConceptForDuplicate(key, conceptAliases)),
  );
  const questionEntries = collectQuestionDuplicateEntries(questionsBank, conceptAliases);
  const videoEntries = Object.entries(conceptVideos || {}).map(([conceptKey, video]) =>
    normalizeVideoImportEntry({ ...video, conceptKey, source: "CONCEPT_VIDEOS" }, "concept-video-storyboard", conceptAliases),
  );
  const conceptRows = safeArray(lessons).flatMap((lesson) =>
    safeArray(lesson.concepts).map((concept) => {
      const conceptName = safeText(concept.conceptName || concept.name, 180);
      const key = canonicalConceptForDuplicate(`${safeText(lesson.id, 120)}::${conceptName}`, conceptAliases);
      const isExamCritical = criticalKeys.has(key);
      const questions = questionEntries.filter((entry) => entry.canonicalConceptKey === key);
      const videos = videoEntries.filter((entry) => entry.canonicalConceptKey === key);
      return {
        key,
        lessonId: safeText(lesson.id, 120),
        lessonTitle: safeText(lesson.title || lesson.id, 180),
        conceptName,
        category: isExamCritical ? "exam-critical" : "enrichment-only",
        questionCount: questions.length,
        videoCount: videos.length,
        hardQuestionCount: questions.filter((entry) => {
          const allQuestions = safeArray(questionsBank?.[entry.kind]);
          const sourceQuestion = allQuestions.find((item) => safeText(item.id, 180) === entry.id);
          return itemLevel(sourceQuestion) >= 6;
        }).length,
      };
    }),
  );
  const questionSummary = questionEntries.reduce((acc, entry) => {
    const category = criticalKeys.has(entry.canonicalConceptKey) ? "examCritical" : "enrichmentOnly";
    acc[category] += 1;
    return acc;
  }, { examCritical: 0, enrichmentOnly: 0 });
  const videoSummary = videoEntries.reduce((acc, entry) => {
    const category = criticalKeys.has(entry.canonicalConceptKey) ? "examCritical" : "enrichmentOnly";
    acc[category] += 1;
    return acc;
  }, { examCritical: 0, enrichmentOnly: 0 });

  return {
    version: CONTENT_STUDIO_VERSION,
    policy: "Exam-critical report separates required SVCollege exam content from enrichment-only assets using real concept tags and exam module mappings. It does not promote enrichment into required learning and does not hide required exam content behind XP.",
    summary: {
      concepts: conceptRows.length,
      examCriticalConcepts: conceptRows.filter((row) => row.category === "exam-critical").length,
      enrichmentOnlyConcepts: conceptRows.filter((row) => row.category === "enrichment-only").length,
      examCriticalQuestions: questionSummary.examCritical,
      enrichmentOnlyQuestions: questionSummary.enrichmentOnly,
      examCriticalVideos: videoSummary.examCritical,
      enrichmentOnlyVideos: videoSummary.enrichmentOnly,
    },
    rows: conceptRows.sort((a, b) => {
      if (a.category !== b.category) return a.category === "exam-critical" ? -1 : 1;
      return a.key.localeCompare(b.key);
    }).map((row, index) => ({ ...row, order: index + 1 })),
  };
}

function manualAuthoringSourceBundle(lesson = {}, concept = {}) {
  const conceptName = safeText(concept.conceptName || concept.name, 180);
  const lessonId = safeText(lesson.id, 120);
  return {
    lessonId,
    lessonTitle: safeText(lesson.title || lessonId, 180),
    conceptName,
    conceptKey: `${lessonId}::${conceptName}`,
    oneLine: safeText(concept.oneLine || concept.definition || concept.description || "", 260),
    codeExample: safeText(concept.codeExample || concept.code || concept.syntax || concept.example || "", 500),
    difficulty: safeNumber(concept.difficulty, null),
    sourceEvidence: [
      {
        kind: "lesson-data",
        title: `${lessonId}::${conceptName}`,
        status: "repository",
      },
    ],
  };
}

export function buildManualQuestionAuthoringQueue({
  lessons = [],
  questionsBank = {},
  optionFeedback = {},
  hardLevel = 6,
} = {}) {
  const dashboard = buildContentFactoryDashboard({ lessons, questionsBank, optionFeedback, hardLevel });
  const conceptByKey = new Map();
  safeArray(lessons).forEach((lesson) => {
    safeArray(lesson.concepts).forEach((concept) => {
      const bundle = manualAuthoringSourceBundle(lesson, concept);
      if (bundle.lessonId && bundle.conceptName) conceptByKey.set(bundle.conceptKey, bundle);
    });
  });

  const queue = dashboard.needsQueue.flatMap((row) =>
    row.missing
      .map((missingKind) => {
        const action = MANUAL_AUTHORING_ACTIONS[missingKind];
        const source = conceptByKey.get(row.key);
        if (!action || !source) return null;
        const id = `manual-authoring-${stableHash([row.key, missingKind, hardLevel].join("|"))}`;
        return {
          id,
          orderSeed: `${String(row.order).padStart(5, "0")}::${String(action.priority).padStart(2, "0")}::${missingKind}::${row.key}`,
          status: "queued-authoring",
          type: action.type,
          action: action.action,
          templateFamily: classifyConceptFamily({
            conceptKey: row.key,
            lessonTitle: row.lessonTitle,
            conceptName: row.conceptName,
          }),
          reviewerChecklist: REVIEWER_CHECKLIST_ITEMS.map((item) => item.id),
          requiredOutput: action.requiredOutput,
          conceptKey: row.key,
          lessonId: row.lessonId,
          lessonTitle: row.lessonTitle,
          conceptName: row.conceptName,
          codeBearing: row.codeBearing,
          source,
          counts: {
            hardMc: row.hardMc,
            hardFill: row.hardFill,
            trace: row.trace,
            bug: row.bug,
            build: row.build,
            mcWithoutDistractorFeedback: row.mcWithoutDistractorFeedback,
          },
        };
      })
      .filter(Boolean),
  ).sort((a, b) => a.orderSeed.localeCompare(b.orderSeed))
    .map((item, index) => {
      const { orderSeed, ...rest } = item;
      return { ...rest, order: index + 1 };
    });

  return {
    version: CONTENT_STUDIO_VERSION,
    policy: "Manual authoring queue only. It reads real lesson/question data and never fabricates question text, answers, options, examples or placeholder rows.",
    summary: {
      concepts: dashboard.summary.concepts,
      queuedTasks: queue.length,
      sourceConcepts: new Set(queue.map((item) => item.conceptKey)).size,
      hardQuestionTasks: queue.filter((item) => item.type === "hard-mc" || item.type === "hard-fill").length,
      activityTasks: queue.filter((item) => ["trace", "bug", "build"].includes(item.type)).length,
      feedbackTasks: queue.filter((item) => item.type === "distractor-feedback").length,
    },
    queue,
  };
}
