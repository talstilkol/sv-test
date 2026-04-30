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
  {
    id: "trace_svai_004",
    conceptKey: "lesson_ai_engineering::agent loop",
    level: 6,
    title: "מעקב אחרי agent loop מוגבל בצעדים",
    code:
      "for (const step of allowedSteps) {\n  const decision = await planner.next(state);\n  if (decision.done) break;\n  await assertToolAllowed(decision.toolName, user.role);\n  state = await runTool(decision.toolName, decision.args);\n}",
    steps: [
      { line: 1, prompt: "מה מגביל את מספר הצעדים?", answer: "allowedSteps", acceptable: ["allowedSteps", "steps"], hint: "הלולאה עוברת על רשימה מוגבלת." },
      { line: 3, prompt: "מתי הלולאה נעצרת מוקדם?", answer: "כאשר decision.done true", acceptable: ["decision.done", "done", "break"], hint: "חפש break." },
      { line: 4, prompt: "איזו בדיקה רצה לפני tool execution?", answer: "assertToolAllowed", acceptable: ["assertToolAllowed", "authorization", "allowed"], hint: "היא לפני runTool." },
    ],
    explanation: "Agent loop בטוח מגביל צעדים, מאפשר עצירה, ובודק הרשאות לפני כל כלי.",
    requiredConcepts: ["lesson_ai_engineering::agent loop", "lesson_ai_engineering::tool calling", "lesson_ai_engineering::guardrails"],
    requiredTerms: ["allowedSteps", "decision.done", "assertToolAllowed"],
    sideExplanation: "Agent בלי מגבלת צעדים והרשאות הוא סיכון עלות ואבטחה, לא פיצ'ר בשל.",
  },
  {
    id: "trace_svai_005",
    conceptKey: "lesson_ai_engineering::chunking",
    level: 6,
    title: "מעקב אחרי chunking לפי כותרות",
    code:
      "const sections = splitByHeadings(markdown);\nconst chunks = sections\n  .map((section) => ({ title: section.title, text: section.body.trim() }))\n  .filter((chunk) => chunk.text.length >= 120);",
    steps: [
      { line: 1, prompt: "לפי מה המסמך מתפצל?", answer: "headings", acceptable: ["headings", "כותרות"], hint: "שם הפונקציה אומר splitByHeadings." },
      { line: 3, prompt: "אילו שני שדות נשמרים בכל chunk?", answer: "title and text", acceptable: ["title", "text", "title and text"], hint: "קרא את האובייקט ב-map." },
      { line: 4, prompt: "איזה chunks מסוננים החוצה?", answer: "chunks קצרים מ-120 תווים", acceptable: ["short", "120", "קצרים"], hint: "ה-filter דורש אורך מינימלי." },
    ],
    explanation: "Chunking טוב שומר גבולות לוגיים ומסנן מקטעים קצרים מדי שלא מספקים הקשר.",
    requiredConcepts: ["lesson_ai_engineering::chunking", "lesson_ai_engineering::token budget", "lesson_12::map"],
    requiredTerms: ["splitByHeadings", "map", "filter"],
    sideExplanation: "חתיכה עיוורת לפי מספר תווים עלולה לשבור רעיון באמצע ולהחליש retrieval.",
  },
  {
    id: "trace_svai_006",
    conceptKey: "lesson_ai_engineering::embeddings",
    level: 6,
    title: "מעקב אחרי יצירת embedding לחיפוש סמנטי",
    code:
      "const input = 'איך JWT נשמר בצורה בטוחה?';\nconst vector = await createEmbedding(input);\nawait vectorStore.upsert({ id: 'auth-jwt-storage', vector, metadata: { conceptKey: 'lesson_auth_security::JWT' } });",
    steps: [
      { line: 2, prompt: "מה createEmbedding מחזיר?", answer: "vector", acceptable: ["vector", "embedding"], hint: "שם המשתנה הוא vector." },
      { line: 3, prompt: "מה ה-id של הרשומה שנשמרת?", answer: "auth-jwt-storage", acceptable: ["auth-jwt-storage"], hint: "חפש id." },
      { line: 3, prompt: "איזה metadata קושר את ה-vector למושג?", answer: "conceptKey", acceptable: ["conceptKey", "lesson_auth_security::JWT"], hint: "זה בתוך metadata." },
    ],
    explanation: "Embedding מייצג משמעות כ-vector, אבל צריך לשמור metadata כדי להסביר מאיפה match הגיע.",
    requiredConcepts: ["lesson_ai_engineering::embeddings", "lesson_ai_engineering::vector store"],
    requiredTerms: ["createEmbedding", "vector", "metadata"],
    sideExplanation: "Embedding אינו תשובה. הוא ייצוג שמאפשר חיפוש דמיון בין טקסטים.",
  },
  {
    id: "trace_svai_007",
    conceptKey: "lesson_ai_engineering::fine-tuning boundary",
    level: 6,
    title: "מעקב אחרי החלטה בין RAG ל-fine-tuning",
    code:
      "const needsFreshKnowledge = source.changesWeekly === true;\nconst needsStyleConsistency = task.kind === 'tone-format';\nconst strategy = needsFreshKnowledge ? 'RAG' : needsStyleConsistency ? 'fine-tune-candidate' : 'prompt';",
    steps: [
      { line: 1, prompt: "איזה תנאי אומר שהידע משתנה מהר?", answer: "source.changesWeekly === true", acceptable: ["changesWeekly", "fresh knowledge"], hint: "השורה הראשונה." },
      { line: 2, prompt: "איזה צורך יכול להפוך fine-tuning לרלוונטי?", answer: "style consistency", acceptable: ["tone-format", "style", "format"], hint: "חפש task.kind." },
      { line: 3, prompt: "מה נבחר אם הידע מתעדכן כל שבוע?", answer: "RAG", acceptable: ["RAG"], hint: "זה הצד הראשון של ה-ternary." },
    ],
    explanation: "Fine-tuning לא מיועד לעדכון ידע טרי. ידע משתנה שייך לרוב ל-RAG, וסגנון חוזר יכול להצדיק fine-tune.",
    requiredConcepts: ["lesson_ai_engineering::fine-tuning boundary", "lesson_ai_engineering::RAG", "lesson_ai_engineering::evaluation"],
    requiredTerms: ["RAG", "fine-tune", "prompt"],
    sideExplanation: "הגבול החשוב: fine-tuning משנה התנהגות/סגנון, לא מחליף database עדכני.",
  },
  {
    id: "trace_svai_008",
    conceptKey: "lesson_ai_engineering::guardrails",
    level: 6,
    title: "מעקב אחרי guardrails לפני ואחרי model call",
    code:
      "if (!user.canAskAi) throw new Error('AI quota exceeded');\nconst answer = await askModel(messages);\nif (containsPrivateData(answer)) return safeFallback;\nreturn answer;",
    steps: [
      { line: 1, prompt: "איזה guardrail רץ לפני הקריאה למודל?", answer: "quota/permission check", acceptable: ["canAskAi", "quota", "permission"], hint: "הוא לפני askModel." },
      { line: 3, prompt: "איזה guardrail בודק את הפלט?", answer: "containsPrivateData", acceptable: ["containsPrivateData", "private data"], hint: "הוא אחרי answer." },
      { line: 3, prompt: "מה מוחזר אם הפלט מסוכן?", answer: "safeFallback", acceptable: ["safeFallback", "fallback"], hint: "קרא את return בתוך if." },
    ],
    explanation: "Guardrails צריכים להקיף גם קלט/הרשאה לפני המודל וגם פלט לפני הצגה למשתמש.",
    requiredConcepts: ["lesson_ai_engineering::guardrails", "lesson_auth_security::authorization"],
    requiredTerms: ["canAskAi", "containsPrivateData", "safeFallback"],
    sideExplanation: "Prompt לבד אינו מנגנון אבטחה. גבולות קריטיים נאכפים בקוד.",
  },
  {
    id: "trace_svai_009",
    conceptKey: "lesson_ai_engineering::hallucination check",
    level: 6,
    title: "מעקב אחרי בדיקת מקורות לתשובת AI",
    code:
      "const hasCitation = answer.sources.length > 0;\nconst contradictsContext = context.some((source) => source.warning === answer.claim);\nconst canShow = hasCitation && !contradictsContext;\nreturn canShow ? answer.text : 'unknown/unavailable';",
    steps: [
      { line: 1, prompt: "מה מוכיח שיש מקור לתשובה?", answer: "answer.sources.length > 0", acceptable: ["sources", "citation", "hasCitation"], hint: "השורה הראשונה." },
      { line: 2, prompt: "מה מחפש סתירה מול context?", answer: "contradictsContext", acceptable: ["contradictsContext", "context.some"], hint: "שם המשתנה מתאר את הבדיקה." },
      { line: 4, prompt: "מה מוחזר כשאין ראיה מספיקה?", answer: "unknown/unavailable", acceptable: ["unknown/unavailable", "unknown", "unavailable"], hint: "זה fallback מפורש, לא המצאה." },
    ],
    explanation: "Hallucination check דורש מקור ואי-סתירה מול ההקשר לפני שמציגים תשובה בביטחון.",
    requiredConcepts: ["lesson_ai_engineering::hallucination check", "lesson_ai_engineering::RAG"],
    requiredTerms: ["sources", "contradictsContext", "unknown/unavailable"],
    sideExplanation: "במערכת לימוד עדיף להודות בחוסר מידע מאשר ללמד תשובה שגויה בביטחון.",
  },
  {
    id: "trace_svai_010",
    conceptKey: "lesson_ai_engineering::LangChain",
    level: 6,
    title: "מעקב אחרי chain של prompt-model-parser",
    code:
      "const chain = prompt.pipe(model).pipe(parser);\nconst result = await chain.invoke({ question: userQuestion });\nreturn result.nextAction;",
    steps: [
      { line: 1, prompt: "מהו הסדר ב-chain?", answer: "prompt -> model -> parser", acceptable: ["prompt", "model", "parser", "prompt -> model -> parser"], hint: "קרא את pipe לפי הסדר." },
      { line: 2, prompt: "איזה קלט נשלח ל-chain?", answer: "question: userQuestion", acceptable: ["userQuestion", "question"], hint: "זה האובייקט ב-invoke." },
      { line: 3, prompt: "איזה שדה מהתוצאה מוחזר?", answer: "nextAction", acceptable: ["nextAction"], hint: "קרא את result." },
    ],
    explanation: "LangChain מחבר שלבים לשרשרת: prompt מכין קלט, model מפיק תשובה, parser מחזיר מבנה לקוד.",
    requiredConcepts: ["lesson_ai_engineering::LangChain", "lesson_ai_engineering::prompt messages", "lesson_ai_engineering::structured output"],
    requiredTerms: ["pipe", "invoke", "parser"],
    sideExplanation: "Orchestration טובה כשהפעולה רב-שלבית; לפעולה פשוטה chain יכול להיות עומס מיותר.",
  },
  {
    id: "trace_svai_011",
    conceptKey: "lesson_ai_engineering::model selection",
    level: 5,
    title: "מעקב אחרי בחירת מודל לפי משימה",
    code:
      "const model = task.kind === 'fast-summary'\n  ? process.env.OPENAI_FAST_MODEL\n  : process.env.OPENAI_REASONING_MODEL;\nconst result = await runModel(model, task.input);",
    steps: [
      { line: 1, prompt: "איזו משימה מקבלת מודל מהיר?", answer: "fast-summary", acceptable: ["fast-summary"], hint: "זה תנאי ה-ternary." },
      { line: 2, prompt: "מאיפה שם המודל המהיר מגיע?", answer: "environment variable", acceptable: ["process.env", "OPENAI_FAST_MODEL", "env"], hint: "חפש process.env." },
      { line: 4, prompt: "איזה model נשלח בפועל להרצה?", answer: "model", acceptable: ["model"], hint: "המשתנה הראשון ב-runModel." },
    ],
    explanation: "Model selection בוחר מודל לפי איכות/latency/עלות במקום לקבע מודל אחד לכל פעולה.",
    requiredConcepts: ["lesson_ai_engineering::model selection", "lesson_devops_deploy::environment variables"],
    requiredTerms: ["fast-summary", "OPENAI_FAST_MODEL", "OPENAI_REASONING_MODEL"],
    sideExplanation: "לא כל פעולה צריכה את המודל היקר ביותר; התאמה למשימה שומרת על מהירות ועלות.",
  },
  {
    id: "trace_svai_012",
    conceptKey: "lesson_ai_engineering::prompt messages",
    level: 4,
    title: "מעקב אחרי הפרדת system ו-user messages",
    code:
      "const messages = [\n  { role: 'system', content: 'ענה בעברית קצרה וברורה.' },\n  { role: 'user', content: userQuestion }\n];\nconst answer = await askModel(messages);",
    steps: [
      { line: 2, prompt: "איזו הודעה מגדירה התנהגות כללית?", answer: "system", acceptable: ["system"], hint: "קרא את role." },
      { line: 3, prompt: "איפה נמצא קלט המשתמש?", answer: "userQuestion", acceptable: ["userQuestion", "user"], hint: "הוא בתוכן של role user." },
      { line: 5, prompt: "מה נשלח למודל?", answer: "messages", acceptable: ["messages"], hint: "הפרמטר של askModel." },
    ],
    explanation: "Prompt messages מפרידים בין כללי מערכת לבין קלט משתמש, כדי שההתנהגות תהיה עקבית וברורה.",
    requiredConcepts: ["lesson_ai_engineering::prompt messages", "lesson_ai_engineering::OpenAI API"],
    requiredTerms: ["system", "user", "messages"],
    sideExplanation: "ערבוב הוראות מערכת בתוך user input מקשה על בדיקה ועל שמירה מפני prompt injection.",
  },
  {
    id: "trace_svai_013",
    conceptKey: "lesson_ai_engineering::retrieval ranking",
    level: 6,
    title: "מעקב אחרי threshold ו-topK ב-retrieval",
    code:
      "const matches = await vectorStore.search(queryVector, { topK: 8 });\nconst selected = matches\n  .filter((match) => match.score >= 0.72)\n  .slice(0, 4);",
    steps: [
      { line: 1, prompt: "כמה תוצאות ראשוניות מבקשים?", answer: "8", acceptable: ["8", "topK 8"], hint: "קרא את topK." },
      { line: 3, prompt: "מהו score מינימלי להתאמה?", answer: "0.72", acceptable: ["0.72"], hint: "הוא בתנאי filter." },
      { line: 4, prompt: "כמה תוצאות לכל היותר נשלחות הלאה?", answer: "4", acceptable: ["4"], hint: "קרא את slice." },
    ],
    explanation: "Retrieval ranking מסנן התאמות חלשות ומגביל מספר chunks כדי לשמור על רלוונטיות ו-token budget.",
    requiredConcepts: ["lesson_ai_engineering::retrieval ranking", "lesson_ai_engineering::vector store", "lesson_ai_engineering::token budget"],
    requiredTerms: ["topK", "score", "slice"],
    sideExplanation: "שליחת כל תוצאה למודל מגדילה רעש ועלות, ולפעמים מורידה את איכות התשובה.",
  },
  {
    id: "trace_svai_014",
    conceptKey: "lesson_ai_engineering::streaming response",
    level: 5,
    title: "מעקב אחרי streaming route",
    code:
      "export async function POST(request) {\n  const { messages } = await request.json();\n  const result = streamText({ model, messages });\n  return result.toDataStreamResponse();\n}",
    steps: [
      { line: 2, prompt: "איזה מידע נקרא מה-request?", answer: "messages", acceptable: ["messages"], hint: "זה destructuring מה-json." },
      { line: 3, prompt: "איזו פונקציה יוצרת תשובה זורמת?", answer: "streamText", acceptable: ["streamText"], hint: "היא מקבלת model ו-messages." },
      { line: 4, prompt: "איזה response מוחזר ללקוח?", answer: "toDataStreamResponse", acceptable: ["toDataStreamResponse", "stream response"], hint: "זה ה-return." },
    ],
    explanation: "Streaming route מחזיר chunks בזמן שהמודל מפיק תשובה, ולכן UI יכול להציג התקדמות מוקדם.",
    requiredConcepts: ["lesson_ai_engineering::streaming response", "lesson_ai_engineering::Vercel AI SDK", "lesson_nextjs::route handler"],
    requiredTerms: ["POST", "streamText", "toDataStreamResponse"],
    sideExplanation: "Streaming מתאים ל-chat, אבל לא תמיד מתאים לפעולה שדורשת JSON מלא ומאומת לפני הצגה.",
  },
  {
    id: "trace_svai_015",
    conceptKey: "lesson_ai_engineering::structured output",
    level: 6,
    title: "מעקב אחרי אימות structured output",
    code:
      "const result = await askModelForJson(prompt);\nif (typeof result.title !== 'string') throw new Error('missing title');\nif (!Array.isArray(result.weakConcepts)) throw new Error('missing weak concepts');\nreturn { title: result.title, weakConcepts: result.weakConcepts };",
    steps: [
      { line: 1, prompt: "איזה סוג פלט מבקשים מהמודל?", answer: "JSON", acceptable: ["JSON", "structured"], hint: "שם הפונקציה אומר ForJson." },
      { line: 2, prompt: "איזה שדה חייב להיות string?", answer: "title", acceptable: ["title"], hint: "חפש typeof." },
      { line: 3, prompt: "איזה שדה חייב להיות array?", answer: "weakConcepts", acceptable: ["weakConcepts"], hint: "חפש Array.isArray." },
    ],
    explanation: "Structured output חייב validation לפני שימוש, גם אם ביקשנו מהמודל JSON.",
    requiredConcepts: ["lesson_ai_engineering::structured output", "lesson_11::object", "lesson_12::array"],
    requiredTerms: ["JSON", "typeof", "Array.isArray"],
    sideExplanation: "מודל יכול להחזיר מבנה שגוי; קוד production בודק shape לפני שמירה או הצגה.",
  },
  {
    id: "trace_svai_016",
    conceptKey: "lesson_ai_engineering::token budget",
    level: 5,
    title: "מעקב אחרי קיצור context לתקציב tokens",
    code:
      "const compactContext = relevantChunks\n  .slice(0, 4)\n  .map((chunk) => chunk.text)\n  .join('\\n---\\n');",
    steps: [
      { line: 2, prompt: "כמה chunks נבחרים לכל היותר?", answer: "4", acceptable: ["4"], hint: "קרא את slice." },
      { line: 3, prompt: "איזה שדה מכל chunk נכנס לפרומפט?", answer: "text", acceptable: ["text", "chunk.text"], hint: "זה בתוך map." },
      { line: 4, prompt: "מה מפריד בין chunks?", answer: "---", acceptable: ["---", "\\n---\\n"], hint: "הוא בתוך join." },
    ],
    explanation: "Token budget שומר שהמודל יקבל רק context רלוונטי ומוגבל, במקום את כל המאגר.",
    requiredConcepts: ["lesson_ai_engineering::token budget", "lesson_ai_engineering::chunking", "lesson_12::array"],
    requiredTerms: ["slice", "map", "join"],
    sideExplanation: "Context גדול מדי עולה כסף, מאט תשובות ועלול לחרוג מחלון ההקשר.",
  },
  {
    id: "trace_svai_017",
    conceptKey: "lesson_ai_engineering::vector store",
    level: 6,
    title: "מעקב אחרי upsert וחיפוש ב-vector store",
    code:
      "await vectorStore.upsert({ id: conceptKey, vector, metadata: { lessonId } });\nconst matches = await vectorStore.search(queryVector, { topK: 5 });\nconst best = matches[0];",
    steps: [
      { line: 1, prompt: "איזה מזהה נשמר עם ה-vector?", answer: "conceptKey", acceptable: ["conceptKey"], hint: "זה הערך של id." },
      { line: 1, prompt: "איזה metadata נשמר?", answer: "lessonId", acceptable: ["lessonId"], hint: "הוא בתוך metadata." },
      { line: 2, prompt: "כמה matches מבקשים בחיפוש?", answer: "5", acceptable: ["5", "topK 5"], hint: "קרא את topK." },
    ],
    explanation: "Vector store שומר vectors עם metadata ומחזיר matches לפי דמיון סמנטי.",
    requiredConcepts: ["lesson_ai_engineering::vector store", "lesson_ai_engineering::embeddings", "lesson_ai_engineering::retrieval ranking"],
    requiredTerms: ["upsert", "metadata", "search"],
    sideExplanation: "ללא metadata, גם match טוב קשה להסביר או להציג כמקור אמין למשתמש.",
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
