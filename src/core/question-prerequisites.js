const DEFAULT_TERM_ALIASES = Object.freeze({
  Array: ["מערך", "מערכים", "arr", "array"],
  Index: ["אינדקס", "אינדקסים", "איבר ראשון", "איבר השני", "arr[", "[0]", "[1]"],
  "By Value": ["by value", "טיפוס בסיסי", "טיפוסים בסיסיים", "primitive", "מועתק לחלוטין"],
  "By Reference": ["by reference", "reference", "הפניה", "הפניות", "אותו מערך", "אותו אובייקט"],
  Pointer: ["pointer", "מצביע", "מצביעים"],
  Assignment: ["assignment", "הקצאה", "הצבה"],
  filter: ["filter", "סינון", "מסנן"],
  map: ["map", "מערך חדש"],
  find: ["find", "חיפוש"],
  forEach: ["foreach", "לכל אלמנט", "לולאה"],
  reduce: ["reduce", "צמצום"],
  spread: ["spread", "...", "פורש", "שופך"],
  pop: ["pop", "קצה אחרון"],
  shift: ["shift", "תחילת", "איבר אפס"],
  undefined: ["undefined", "אין return", "בלי return"],
  "arrow function": ["arrow function", "פונקציית חץ", "פונקציות חץ", "=>", "es6"],
  function: ["function", "פונקציה", "פונקציות"],
  scope: ["scope", "סקופ", "תחום"],
  var: ["var", "hoisting"],
  let: ["let"],
  const: ["const"],
  boolean: ["boolean", "בוליאני", "true", "false"],
  number: ["number", "מספר"],
  string: ["string", "מחרוזת"],
  object: ["object", "אובייקט"],
  Promise: ["promise", "then", "catch"],
  fetch: ["fetch"],
  useState: ["usestate", "state", "סטייט"],
  useEffect: ["useeffect", "dependency", "cleanup"],
  JSX: ["jsx"],
  Component: ["component", "קומפוננטה"],
  props: ["props"],
  Router: ["router", "route"],
  Context: ["context"],
  TypeScript: ["typescript", "ts"],
});

export function normalizeQuestionText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[\u0591-\u05C7]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function conceptKey(lessonId, conceptName) {
  return `${lessonId}::${conceptName}`;
}

export function questionTextBlob(question = {}, options = {}) {
  const includeExplanation = options.includeExplanation !== false;
  return [
    question.question,
    question.title,
    question.prompt,
    question.hint,
    question.code,
    question.codeBlock,
    question.brokenCode,
    ...(question.options || []),
    includeExplanation ? question.explanation : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function termTokens(term, glossaryEntry) {
  const tokens = new Set([term]);
  const explicitAliases = Object.prototype.hasOwnProperty.call(DEFAULT_TERM_ALIASES, term)
    ? DEFAULT_TERM_ALIASES[term]
    : [];
  (Array.isArray(explicitAliases) ? explicitAliases : []).forEach((alias) => tokens.add(alias));
  if (glossaryEntry?.he) tokens.add(glossaryEntry.he);
  return Array.from(tokens).filter(Boolean);
}

function hasToken(text, token) {
  const normalizedText = normalizeQuestionText(text);
  const normalizedToken = normalizeQuestionText(token);
  if (!normalizedToken) return false;
  if (/^[a-z0-9_.$:[\]()=>+\-/*\s]+$/i.test(normalizedToken)) {
    return normalizedText.includes(normalizedToken);
  }
  return normalizedText.includes(normalizedToken);
}

function scoreTermMatch(blob, term, glossaryEntry) {
  let score = 0;
  termTokens(term, glossaryEntry).forEach((token) => {
    if (!hasToken(blob, token)) return;
    score += token === term ? 14 : 10;
    if (String(token).length >= 5) score += 2;
  });
  return score;
}

export function inferQuestionConceptKeys({
  question = {},
  lesson = null,
  concept = null,
  lessons = [],
  glossary = {},
  questionIndex = null,
  limit = 6,
} = {}) {
  const scores = new Map();
  const blob = questionTextBlob(question, { includeExplanation: true });

  function addScore(key, points, reason) {
    if (!key || points <= 0) return;
    const prev = scores.get(key) || { key, score: 0, reasons: [] };
    prev.score += points;
    if (reason) prev.reasons.push(reason);
    scores.set(key, prev);
  }

  (Array.isArray(question.conceptKeys) ? question.conceptKeys : []).forEach((key) => {
    addScore(key, 110, "question.conceptKeys");
  });
  if (question.conceptKey) addScore(question.conceptKey, 100, "question.conceptKey");
  if (lesson && concept) addScore(conceptKey(lesson.id, concept.conceptName), 90, "active concept");

  (lessons || []).forEach((courseLesson) => {
    (courseLesson.concepts || []).forEach((courseConcept) => {
      const key = conceptKey(courseLesson.id, courseConcept.conceptName);
      const glossaryEntry = glossary[courseConcept.conceptName];
      const matchScore = scoreTermMatch(blob, courseConcept.conceptName, glossaryEntry);
      if (matchScore) addScore(key, matchScore, "matched concept text");
    });
  });

  if (!scores.size && lesson && Number.isInteger(questionIndex)) {
    const fallbackConcept = (lesson.concepts || [])[questionIndex];
    if (fallbackConcept) addScore(conceptKey(lesson.id, fallbackConcept.conceptName), 8, "quiz index fallback");
  }

  return Array.from(scores.values())
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.key.localeCompare(b.key);
    })
    .slice(0, limit)
    .map((item) => item.key);
}

export function inferGlossaryTerms({ question = {}, glossary = {}, limit = 8 } = {}) {
  const blob = questionTextBlob(question, { includeExplanation: false });
  return Object.entries(glossary || {})
    .map(([term, entry]) => ({
      term,
      entry,
      score: scoreTermMatch(blob, term, entry),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.term.localeCompare(b.term);
    })
    .slice(0, limit);
}

export function uniqueStable(values) {
  const seen = new Set();
  return (values || []).filter((value) => {
    if (!value || seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

export function choosePrerequisiteRewind({
  prereqKeys = [],
  statsByKey = {},
  thresholdPct = 60,
} = {}) {
  const threshold = Math.max(1, Math.min(100, Number(thresholdPct) || 60));
  const candidates = uniqueStable(prereqKeys)
    .map((key) => {
      const stats = statsByKey[key] || {};
      const level = Math.max(1, Math.min(7, Number(stats.level) || 1));
      const masteryPct = Math.max(0, Math.min(100, Number(stats.masteryPct) || 0));
      const attempts = Math.max(0, Number(stats.attempts) || 0);
      const relation = stats.relation === "direct" ? "direct" : "base";
      return { key, level, masteryPct, attempts, relation };
    })
    .filter((item) => item.masteryPct < threshold || item.level <= 2);

  return candidates.sort((a, b) => {
    if (a.masteryPct !== b.masteryPct) return a.masteryPct - b.masteryPct;
    if (a.level !== b.level) return a.level - b.level;
    if (a.relation !== b.relation) return a.relation === "direct" ? -1 : 1;
    if (a.attempts !== b.attempts) return a.attempts - b.attempts;
    return a.key.localeCompare(b.key);
  })[0] || null;
}
