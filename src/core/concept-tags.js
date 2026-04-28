const HEBREW_NIQQUD_RE = /[\u0591-\u05C7]/g;

export function normalizeConceptName(value) {
  return String(value || "")
    .normalize("NFKC")
    .replace(HEBREW_NIQQUD_RE, "")
    .replace(/[״"]/g, '"')
    .replace(/[׳']/g, "'")
    .replace(/[‐‑‒–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function canonicalConceptKey(lessonId, conceptName) {
  return `${String(lessonId || "").trim()}::${String(conceptName || "").trim()}`;
}

export function splitConceptKey(key) {
  const raw = String(key || "").trim();
  const idx = raw.indexOf("::");
  if (idx < 0) return { lessonId: "", conceptName: raw };
  return {
    lessonId: raw.slice(0, idx),
    conceptName: raw.slice(idx + 2),
  };
}

export function uniqueStable(values = []) {
  const seen = new Set();
  return values.filter((value) => {
    const normalized = String(value || "").trim();
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function explicitConceptAliases(concept = {}) {
  return [
    ...(Array.isArray(concept.aliases) ? concept.aliases : []),
    ...(Array.isArray(concept.tags) ? concept.tags : []),
    ...(Array.isArray(concept.keywords) ? concept.keywords : []),
    concept.hebrewName,
    concept.en,
    concept.term,
  ].filter(Boolean);
}

export function tagForConcept(lesson = {}, concept = {}, index = 0) {
  const conceptName = String(concept.conceptName || "").trim();
  const lessonId = String(lesson.id || "").trim();
  const key = canonicalConceptKey(lessonId, conceptName);
  const normalizedName = normalizeConceptName(conceptName);
  const aliases = uniqueStable([
    conceptName,
    normalizedName,
    ...explicitConceptAliases(concept),
  ].map((alias) => String(alias || "").trim()).filter(Boolean));
  const normalizedAliases = uniqueStable(aliases.map(normalizeConceptName).filter(Boolean));
  const tags = uniqueStable([
    key,
    `lesson:${lessonId}`,
    `concept:${normalizedName}`,
    `concept-index:${index + 1}`,
    lesson.svcollegeModule ? `svcollege:${normalizeConceptName(lesson.svcollegeModule)}` : "",
    typeof concept.difficulty === "number" ? `difficulty:${concept.difficulty}` : "",
    ...normalizedAliases.map((alias) => `alias:${alias}`),
  ]);

  return {
    key,
    lessonId,
    lessonTitle: lesson.title || "",
    conceptName,
    normalizedName,
    aliases,
    normalizedAliases,
    tags,
  };
}

function addAlias(aliasToKeys, alias, key) {
  const normalized = normalizeConceptName(alias);
  if (!normalized) return;
  if (!aliasToKeys[normalized]) aliasToKeys[normalized] = [];
  if (!aliasToKeys[normalized].includes(key)) aliasToKeys[normalized].push(key);
}

export function buildConceptRegistry(lessons = []) {
  const byKey = Object.create(null);
  const aliasToKeys = Object.create(null);
  const normalizedNameToKeys = Object.create(null);

  (lessons || []).forEach((lesson) => {
    (lesson.concepts || []).forEach((concept, index) => {
      const tag = tagForConcept(lesson, concept, index);
      if (!tag.lessonId || !tag.conceptName) return;
      byKey[tag.key] = tag;
      if (!normalizedNameToKeys[tag.normalizedName]) normalizedNameToKeys[tag.normalizedName] = [];
      normalizedNameToKeys[tag.normalizedName].push(tag.key);
      tag.normalizedAliases.forEach((alias) => addAlias(aliasToKeys, alias, tag.key));
    });
  });

  const duplicateConceptNames = Object.entries(normalizedNameToKeys)
    .filter(([, keys]) => keys.length > 1)
    .map(([name, keys]) => ({ name, keys: uniqueStable(keys) }));

  return {
    version: 1,
    size: Object.keys(byKey).length,
    byKey,
    aliasToKeys,
    duplicateConceptNames,
  };
}

function resolveFromAlias(alias, registry, lessonId = "") {
  const normalized = normalizeConceptName(alias);
  if (!normalized || !registry?.aliasToKeys) return "";
  let matches = registry.aliasToKeys[normalized] || [];
  if (lessonId) {
    const lessonMatches = matches.filter((key) => splitConceptKey(key).lessonId === lessonId);
    if (lessonMatches.length) matches = lessonMatches;
  }
  return matches.length === 1 ? matches[0] : "";
}

function resolveCandidateKey(candidate, registry, lessonIdHint = "") {
  if (!candidate) return "";
  const raw = String(candidate).trim();
  if (!raw) return "";
  if (registry?.byKey?.[raw]) return raw;
  const { lessonId, conceptName } = splitConceptKey(raw);
  const effectiveLessonId = lessonId || lessonIdHint;
  if (effectiveLessonId && conceptName) {
    const exact = canonicalConceptKey(effectiveLessonId, conceptName);
    if (registry?.byKey?.[exact]) return exact;
    const aliasKey = resolveFromAlias(conceptName, registry, effectiveLessonId);
    if (aliasKey) return aliasKey;
  }
  return resolveFromAlias(raw, registry, lessonIdHint) || (raw.includes("::") ? raw : "");
}

export function resolveConceptKey({
  conceptKey = "",
  conceptKeys = [],
  lessonId = "",
  conceptName = "",
  lesson = null,
  concept = null,
  registry = null,
} = {}) {
  const effectiveLessonId = lessonId || lesson?.id || "";
  const effectiveConceptName = conceptName || concept?.conceptName || "";
  const candidates = [
    conceptKey,
    ...(Array.isArray(conceptKeys) ? conceptKeys : []),
    effectiveLessonId && effectiveConceptName
      ? canonicalConceptKey(effectiveLessonId, effectiveConceptName)
      : "",
    effectiveConceptName,
  ].filter(Boolean);

  for (const candidate of candidates) {
    const resolved = resolveCandidateKey(candidate, registry, effectiveLessonId);
    if (resolved) return resolved;
  }
  return "";
}

export function resolveConceptKeysForQuestion({
  question = {},
  lesson = null,
  concept = null,
  questionIndex = null,
  registry = null,
  limit = 8,
} = {}) {
  const explicit = [
    ...(Array.isArray(question.conceptKeys) ? question.conceptKeys : []),
    question.conceptKey,
  ].filter(Boolean);
  const keys = explicit
    .map((key) => resolveConceptKey({ conceptKey: key, lesson, registry }))
    .filter(Boolean);

  if (!keys.length && lesson && concept) {
    keys.push(resolveConceptKey({ lesson, concept, registry }));
  }

  if (!keys.length && lesson && Number.isInteger(questionIndex)) {
    const fallbackConcept = (lesson.concepts || [])[questionIndex];
    if (fallbackConcept) keys.push(resolveConceptKey({ lesson, concept: fallbackConcept, registry }));
  }

  return uniqueStable(keys).slice(0, Math.max(1, Number(limit) || 8));
}
