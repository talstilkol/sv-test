// data/svcollege_builds_ai_engineering.js
// SVCollege Finish Line 1 - Practical AI Engineering Mini Build practice.

var SVCOLLEGE_AI_ENGINEERING_BUILDS = [
  {
    id: "build_svai_001",
    conceptKey: "lesson_ai_engineering::Vercel AI SDK",
    level: 6,
    title: "Route handler ל-streaming tutor",
    prompt:
      "כתוב route handler שמקבל messages מ-request, מריץ streamText עם model שמגיע מ-env, ומחזיר toDataStreamResponse.",
    starter:
      "import { streamText } from 'ai';\nimport { openai } from '@ai-sdk/openai';\n\nexport async function POST(request) {\n  // read messages\n  // stream response\n}",
    tests: [
      { regex: "export\\s+async\\s+function\\s+POST", description: "מגדיר POST route handler", flags: "" },
      { regex: "await\\s+request\\.json\\s*\\(", description: "קורא JSON מה-request", flags: "" },
      { regex: "streamText\\s*\\(", description: "משתמש ב-streamText", flags: "" },
      { regex: "process\\.env\\.[A-Z0-9_]*MODEL", description: "קורא שם מודל מה-env", flags: "" },
      { regex: "toDataStreamResponse\\s*\\(", description: "מחזיר response זורם", flags: "" },
    ],
    reference:
      "import { streamText } from 'ai';\nimport { openai } from '@ai-sdk/openai';\n\nexport async function POST(request) {\n  const { messages } = await request.json();\n  const result = streamText({\n    model: openai(process.env.OPENAI_MODEL),\n    messages,\n  });\n  return result.toDataStreamResponse();\n}",
    hint:
      "הלקוח שולח messages. השרת מחזיק את provider ואת המודל.",
    explanation:
      "ה-handler מחבר Next route לזרימת AI בלי לחשוף secret בדפדפן.",
    requiredConcepts: ["lesson_ai_engineering::Vercel AI SDK", "lesson_ai_engineering::streaming response"],
    requiredTerms: ["route handler", "streamText", "env", "response"],
    sideExplanation:
      "Streaming route הוא הצורה המעשית לבנות tutor שמתחיל לענות מהר.",
  },
  {
    id: "build_svai_002",
    conceptKey: "lesson_ai_engineering::RAG",
    level: 6,
    title: "פונקציית RAG עם ranking",
    prompt:
      "כתוב פונקציה answerWithRag שמקבלת question, יוצרת embedding, מחפשת ב-vectorStore, מסננת score מעל 0.72, מגבילה ל-4 chunks ושולחת ל-askModel.",
    starter:
      "async function answerWithRag(question) {\n  // embed\n  // search\n  // rank\n  // ask model\n}",
    tests: [
      { regex: "async\\s+function\\s+answerWithRag\\s*\\(", description: "מגדיר answerWithRag", flags: "" },
      { regex: "embed\\s*\\(\\s*question\\s*\\)", description: "יוצר embedding לשאלה", flags: "" },
      { regex: "vectorStore\\.search", description: "מחפש ב-vector store", flags: "" },
      { regex: "score\\s*>=\\s*0\\.72", description: "מסנן לפי score", flags: "" },
      { regex: "\\.slice\\s*\\(\\s*0\\s*,\\s*4\\s*\\)", description: "מגביל לארבעה chunks", flags: "" },
      { regex: "askModel\\s*\\(", description: "שולח question ו-context למודל", flags: "" },
    ],
    reference:
      "async function answerWithRag(question) {\n  const queryVector = await embed(question);\n  const matches = await vectorStore.search(queryVector, { topK: 8 });\n  const context = matches\n    .filter((match) => match.score >= 0.72)\n    .slice(0, 4);\n  return askModel({ question, context });\n}",
    hint:
      "RAG טוב לא שולח הכל. הוא שולף, מדרג ומצמצם.",
    explanation:
      "הפונקציה שומרת על token budget ומשתמשת רק ב-context רלוונטי.",
    requiredConcepts: ["lesson_ai_engineering::RAG", "lesson_ai_engineering::retrieval ranking"],
    requiredTerms: ["embedding", "vectorStore", "score", "context"],
    sideExplanation:
      "החלק החשוב הוא הסינון לפני המודל, לא רק עצם הקריאה למודל.",
  },
  {
    id: "build_svai_003",
    conceptKey: "lesson_ai_engineering::tool calling",
    level: 6,
    title: "Tool מאובטח לחולשות תלמיד",
    prompt:
      "כתוב tool בשם getWeakConcepts שמקבל actorId ו-studentId, בודק assertCanViewProgress, ואז מחזיר progressRepo.findWeakConcepts(studentId).",
    starter:
      "const tools = {\n  getWeakConcepts: async ({ actorId, studentId }) => {\n    // authorize\n    // read progress\n  }\n};",
    tests: [
      { regex: "getWeakConcepts\\s*:", description: "מגדיר tool בשם getWeakConcepts", flags: "" },
      { regex: "actorId", description: "מקבל actorId", flags: "" },
      { regex: "studentId", description: "מקבל studentId", flags: "" },
      { regex: "assertCanViewProgress\\s*\\(", description: "בודק הרשאה לפני קריאה", flags: "" },
      { regex: "progressRepo\\.findWeakConcepts\\s*\\(\\s*studentId\\s*\\)", description: "מחזיר חולשות תלמיד", flags: "" },
    ],
    reference:
      "const tools = {\n  getWeakConcepts: async ({ actorId, studentId }) => {\n    await assertCanViewProgress(actorId, studentId);\n    return progressRepo.findWeakConcepts(studentId);\n  }\n};",
    hint:
      "AI tool שנוגע בנתוני תלמיד חייב לדעת מי המבקש.",
    explanation:
      "ה-tool מבודד פעולה אחת, בודק הרשאה, ורק אז קורא מידע רגיש.",
    requiredConcepts: ["lesson_ai_engineering::tool calling", "lesson_ai_engineering::guardrails"],
    requiredTerms: ["tool", "authorization", "actorId", "repository"],
    sideExplanation:
      "כלי AI הוא לא קיצור דרך סביב אבטחה. הוא עוד כניסה מבוקרת למערכת.",
  },
];

function appendAiEngineeringBuildsOnce(target, items) {
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
  window.SVCOLLEGE_AI_ENGINEERING_BUILDS = SVCOLLEGE_AI_ENGINEERING_BUILDS;
  if (!window.QUESTIONS_BUILD) window.QUESTIONS_BUILD = [];
  appendAiEngineeringBuildsOnce(window.QUESTIONS_BUILD, SVCOLLEGE_AI_ENGINEERING_BUILDS);
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_AI_ENGINEERING_BUILDS: SVCOLLEGE_AI_ENGINEERING_BUILDS };
}
