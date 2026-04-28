// data/svcollege_traces_ai_engineering.js
// SVCollege Finish Line 1 - Practical AI Engineering Code Trace practice.

var SVCOLLEGE_AI_ENGINEERING_TRACES = [
  {
    id: "trace_svai_001",
    conceptKey: "lesson_ai_engineering::RAG",
    level: 6,
    title: "מעקב אחרי RAG בסיסי",
    code:
      "const queryVector = await embed(question);\nconst matches = await vectorStore.search(queryVector, { topK: 6 });\nconst selected = matches.filter((match) => match.score >= 0.72).slice(0, 4);\nconst answer = await askModel({ question, context: selected });",
    steps: [
      {
        line: 1,
        prompt: "למה הופכים את השאלה ל-vector?",
        answer: "כדי לבצע חיפוש סמנטי לפי משמעות",
        acceptable: ["semantic", "vector", "משמעות", "חיפוש"],
        hint: "Embedding מאפשר להשוות משמעות.",
      },
      {
        line: 3,
        prompt: "מה filter ואז slice עושים?",
        answer: "מסננים התאמות חלשות ובוחרים עד ארבע תוצאות חזקות",
        acceptable: ["filter", "slice", "top", "חזקות"],
        hint: "זה שלב ranking ו-token budget.",
      },
      {
        line: 4,
        prompt: "מה נשלח למודל בנוסף לשאלה?",
        answer: "context שנשלף מה-vector store",
        acceptable: ["context", "selected", "chunks"],
        hint: "זה החלק של Augmented Generation.",
      },
    ],
    explanation:
      "RAG מתחיל ב-embedding, מחפש matches, מסנן לפי score ושולח רק context רלוונטי למודל.",
    requiredConcepts: ["lesson_ai_engineering::embeddings", "lesson_ai_engineering::retrieval ranking", "lesson_ai_engineering::RAG"],
    requiredTerms: ["embedding", "vector store", "topK", "context"],
    sideExplanation:
      "המודל לא צריך את כל הידע. הוא צריך את המקטעים שהמערכת מצאה כרלוונטיים לשאלה.",
  },
  {
    id: "trace_svai_002",
    conceptKey: "lesson_ai_engineering::tool calling",
    level: 6,
    title: "מעקב אחרי tool מאובטח",
    code:
      "const tools = {\n  getWeakConcepts: async ({ actorId, studentId }) => {\n    await assertCanViewProgress(actorId, studentId);\n    return progressRepo.findWeakConcepts(studentId);\n  }\n};",
    steps: [
      {
        line: 2,
        prompt: "איזה נתונים ה-tool מקבל?",
        answer: "actorId ו-studentId",
        acceptable: ["actorId", "studentId"],
        hint: "אחד הוא המבקש ואחד הוא מושא הפעולה.",
      },
      {
        line: 3,
        prompt: "למה assertCanViewProgress חייב לרוץ לפני query?",
        answer: "כדי לוודא הרשאה לפני חשיפת נתוני התקדמות",
        acceptable: ["authorization", "הרשאה", "לפני", "נתונים"],
        hint: "AI tool הוא endpoint מבחינת אבטחה.",
      },
      {
        line: 4,
        prompt: "איזה מידע מוחזר אחרי ההרשאה?",
        answer: "מושגים חלשים של התלמיד",
        acceptable: ["weak concepts", "חולשות", "progress"],
        hint: "ה-repository קורא נתוני התקדמות.",
      },
    ],
    explanation:
      "Tool בטוח מקבל actor context, בודק הרשאה, ורק אז ניגש לנתוני משתמש.",
    requiredConcepts: ["lesson_ai_engineering::tool calling", "lesson_auth_security::authorization"],
    requiredTerms: ["actorId", "studentId", "authorization", "repository"],
    sideExplanation:
      "המודל יכול לבקש פעולה, אבל הקוד עדיין שומר על גבולות ההרשאה.",
  },
  {
    id: "trace_svai_003",
    conceptKey: "lesson_ai_engineering::evaluation",
    level: 6,
    title: "מעקב אחרי AI eval קטן",
    code:
      "const rubric = ['correct', 'clear', 'grounded'];\nconst result = await runAiAnswer(caseItem.question);\nconst checks = rubric.map((criterion) => grade(result, criterion));\nconst passed = checks.every((check) => check.ok);",
    steps: [
      {
        line: 1,
        prompt: "מה rubric מגדיר?",
        answer: "קריטריונים למדידת תשובה",
        acceptable: ["criteria", "קריטריונים", "rubric"],
        hint: "זו רשימת הדברים שבודקים.",
      },
      {
        line: 3,
        prompt: "מה map מחזיר כאן?",
        answer: "רשימת בדיקות לכל קריטריון",
        acceptable: ["checks", "בדיקות", "criterion"],
        hint: "כל criterion מקבל grade.",
      },
      {
        line: 4,
        prompt: "מתי passed יהיה true?",
        answer: "רק אם כל הבדיקות ok",
        acceptable: ["every", "all", "כולם", "true"],
        hint: "every דורש שכל הפריטים יעברו.",
      },
    ],
    explanation:
      "Evaluation מודד תשובה לפי rubric ולא מסתפק בתחושת בטן.",
    requiredConcepts: ["lesson_ai_engineering::evaluation", "lesson_12::map"],
    requiredTerms: ["rubric", "map", "every", "regression"],
    sideExplanation:
      "כמו tests רגילים, evals מגלים אם שינוי קטן בפרומפט שבר איכות.",
  },
];

function appendAiEngineeringTraceItemsOnce(target, items) {
  var existing = {};
  for (var index = 0; index < target.length; index += 1) {
    existing[target[index].id] = true;
  }
  for (var itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    if (!existing[items[itemIndex].id]) {
      target.push(items[itemIndex]);
      existing[items[itemIndex].id] = true;
    }
  }
}

if (typeof window !== "undefined") {
  window.SVCOLLEGE_AI_ENGINEERING_TRACES = SVCOLLEGE_AI_ENGINEERING_TRACES;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  appendAiEngineeringTraceItemsOnce(window.QUESTIONS_TRACE, SVCOLLEGE_AI_ENGINEERING_TRACES);
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_AI_ENGINEERING_TRACES: SVCOLLEGE_AI_ENGINEERING_TRACES };
}
