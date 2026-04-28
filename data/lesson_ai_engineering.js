// data/lesson_ai_engineering.js
// SVCollege Finish Line 1 - Practical AI Engineering bridge lesson.

var LESSON_AI_ENGINEERING = {
  id: "lesson_ai_engineering",
  title: "AI Engineering - OpenAI, Vercel AI SDK, RAG ו-Agents",
  description:
    "איך בונים פיצ'ר AI אמיתי באפליקציית Full Stack: בחירת מודל, prompt, streaming, structured output, embeddings, RAG, tools, agents, guardrails ו-evaluation.",
  svcollegeModule: "הנדסת AI מעשית - Vercel AI SDK, OpenAI, LangChain, RAG, Agents, Fine-tuning",
  sourceAssets: [],
  sourceCoverageNote:
    "מודול SVCollege דורש בניית יכולות AI בתוך מוצר Full Stack. מקור שיעור AI Engineering מקומי ייעודי הוא unknown/unavailable, לכן זהו bridge עצמאי שמכסה את פער הקוריקולום.",
  concepts: [
    {
      conceptName: "OpenAI API",
      difficulty: 5,
      simpleExplanation:
        "OpenAI API הוא שירות backend שמקבל בקשה עם הוראות וקלט, מריץ מודל, ומחזיר טקסט, JSON, embeddings או קריאה לכלי.",
      whyFullStack:
        "מפתח Full Stack צריך לדעת לשים את הקריאה בצד שרת, לשמור את המפתח ב-env, ולהחזיר ללקוח רק את התוצאה המותרת.",
      codeExample:
        "import OpenAI from 'openai';\n\nconst client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\nconst result = await client.responses.create({\n  model: process.env.OPENAI_MODEL,\n  input: 'סכם את ההודעה לתלמיד בשורה אחת'\n});",
      codeExplanation:
        "הלקוח נוצר בשרת עם API key מהסביבה. הבקשה שולחת model ו-input ומקבלת response מהמודל.",
      commonMistake:
        "לקרוא ל-API ישירות מהדפדפן ולחשוף את OPENAI_API_KEY למשתמשים.",
      prerequisite: "lesson_devops_deploy::environment variables",
    },
    {
      conceptName: "Vercel AI SDK",
      difficulty: 5,
      simpleExplanation:
        "Vercel AI SDK היא שכבת עזר ל-Next/Node שמפשטת generate, stream, tool calls ו-structured output מול ספקי AI.",
      whyFullStack:
        "היא נותנת API נוח ל-route handlers ול-React UI, במיוחד כשצריך streaming chat בלי לכתוב plumbing ידני.",
      codeExample:
        "import { streamText } from 'ai';\nimport { openai } from '@ai-sdk/openai';\n\nexport async function POST(request) {\n  const { messages } = await request.json();\n  const result = streamText({ model: openai(process.env.OPENAI_MODEL), messages });\n  return result.toDataStreamResponse();\n}",
      codeExplanation:
        "route handler מקבל messages, מפעיל streamText ומחזיר response זורם ללקוח.",
      commonMistake:
        "להשתמש ב-SDK בצד לקוח במקום בצד שרת, או לשכוח לטפל בשגיאות ובמגבלות קצב.",
      prerequisite: "lesson_nextjs::route handler",
    },
    {
      conceptName: "LangChain",
      difficulty: 6,
      simpleExplanation:
        "LangChain היא ספריית orchestration שמחברת prompt, model, parser, retrieval ו-tools לשרשראות עבודה.",
      whyFullStack:
        "כשפיצ'ר AI גדל מעבר לקריאה אחת למודל, צריך דרך מסודרת להרכיב שלבים, להחליף רכיבים ולבדוק אותם.",
      codeExample:
        "const chain = prompt.pipe(model).pipe(parser);\nconst answer = await chain.invoke({ question: userQuestion });",
      codeExplanation:
        "ה-chain מעביר את הקלט דרך prompt, אחר כך model, ואז parser שמחזיר מבנה נוח לקוד.",
      commonMistake:
        "להוסיף orchestration כבדה בשביל פעולה פשוטה שאפשר לבצע בקריאה אחת ברורה.",
      prerequisite: "lesson_ai_engineering::OpenAI API",
    },
    {
      conceptName: "model selection",
      difficulty: 5,
      simpleExplanation:
        "model selection היא החלטה איזה מודל מתאים למשימה לפי איכות, latency, עלות, context window ויכולת tool/JSON.",
      whyFullStack:
        "בחירת מודל לא נכונה יכולה להפוך מוצר לאיטי, יקר או לא מדויק, גם אם הקוד תקין.",
      codeExample:
        "const modelForTask = task.kind === 'fast-summary'\n  ? process.env.OPENAI_FAST_MODEL\n  : process.env.OPENAI_REASONING_MODEL;",
      codeExplanation:
        "הקוד בוחר מודל לפי סוג משימה במקום לקבע מודל אחד לכל המערכת.",
      commonMistake:
        "להשתמש תמיד במודל החזק ביותר גם למשימות פשוטות, ואז לשלם ב-latency ועלות.",
      prerequisite: "lesson_devops_deploy::environment variables",
    },
    {
      conceptName: "prompt messages",
      difficulty: 4,
      simpleExplanation:
        "prompt messages הם ההוראות והקלט שנשלחים למודל: תפקיד, כללים, הקשר, שאלה ופורמט תשובה.",
      whyFullStack:
        "Prompt הוא חלק מהקוד. הוא צריך להיות עקבי, ניתן לבדיקה, ולא לערבב נתוני משתמש עם הוראות מערכת בלי גבולות.",
      codeExample:
        "const messages = [\n  { role: 'system', content: 'ענה בעברית קצרה וברורה.' },\n  { role: 'user', content: userQuestion }\n];",
      codeExplanation:
        "system מגדיר התנהגות כללית, user מכיל את בקשת המשתמש.",
      commonMistake:
        "לשים את כל הכללים בתוך הודעת user ולא להפריד בין הוראות מערכת לקלט משתמש.",
      prerequisite: "lesson_ai_engineering::OpenAI API",
    },
    {
      conceptName: "structured output",
      difficulty: 6,
      simpleExplanation:
        "structured output הוא מצב שבו מבקשים מהמודל להחזיר JSON לפי schema במקום טקסט חופשי.",
      whyFullStack:
        "קוד צריך נתונים צפויים. JSON לפי schema מאפשר validation, שמירה ב-DB והצגה ב-UI בלי parsing שביר.",
      codeExample:
        "const expectedShape = {\n  title: 'string',\n  weakConcepts: ['string'],\n  nextAction: 'string'\n};",
      codeExplanation:
        "ה-shape מתאר מה הקוד מצפה לקבל, ואז אפשר לבדוק שכל שדה קיים לפני שימוש.",
      commonMistake:
        "לבקש 'תחזיר JSON' אבל לא לאמת את התוצאה לפני שמשתמשים בה.",
      prerequisite: "lesson_11::object",
    },
    {
      conceptName: "streaming response",
      difficulty: 5,
      simpleExplanation:
        "streaming response מחזיר תשובה בהדרגה במקום לחכות שכל הטקסט יהיה מוכן.",
      whyFullStack:
        "ב-chat או tutor, streaming מוריד תחושת המתנה ומאפשר UI שמגיב מהר.",
      codeExample:
        "const result = streamText({ model, messages });\nreturn result.toDataStreamResponse();",
      codeExplanation:
        "השרת פותח response זורם, והלקוח מציג chunks כשהם מגיעים.",
      commonMistake:
        "לערבב streaming עם פעולות שחייבות JSON מלא וסופי בלי parser מתאים.",
      prerequisite: "lesson_nextjs::route handler",
    },
    {
      conceptName: "token budget",
      difficulty: 5,
      simpleExplanation:
        "token budget הוא ניהול כמות הקלט והפלט שהמודל מעבד, כי כל הודעה, מסמך ותשובה צורכים tokens.",
      whyFullStack:
        "בלי תקציב tokens, פיצ'ר AI נהיה יקר, איטי, או נכשל כשעוברים את context window.",
      codeExample:
        "const compactContext = relevantChunks.slice(0, 4).join('\\n---\\n');",
      codeExplanation:
        "לא שולחים את כל המסמכים; בוחרים רק chunks רלוונטיים כדי להישאר בתקציב.",
      commonMistake:
        "להדביק את כל הידע לפרומפט במקום לבצע retrieval וסינון.",
      prerequisite: "lesson_12::array",
    },
    {
      conceptName: "embeddings",
      difficulty: 6,
      simpleExplanation:
        "embeddings הם וקטורים מספריים שמייצגים משמעות של טקסט כך שאפשר להשוות דמיון בין טקסטים.",
      whyFullStack:
        "Embeddings מאפשרים חיפוש סמנטי: למצוא מסמך רלוונטי גם אם המשתמש לא השתמש באותן מילים.",
      codeExample:
        "const vector = await createEmbedding('איך עובד JWT?');\nconst matches = await vectorStore.search(vector, { topK: 5 });",
      codeExplanation:
        "הטקסט הופך לווקטור, ואז משווים אותו לווקטורים שמורים במסד נתונים או vector store.",
      commonMistake:
        "לחשוב ש-embedding הוא תשובה. הוא רק ייצוג לחיפוש והשוואה.",
      prerequisite: "lesson_sql_orm::database",
    },
    {
      conceptName: "vector store",
      difficulty: 6,
      simpleExplanation:
        "vector store הוא אחסון שמחזיק vectors ומאפשר similarity search מהיר.",
      whyFullStack:
        "RAG מעשי צריך מקום לשמור embeddings של מסמכים, שיעורים, snippets או תשובות מאושרות.",
      codeExample:
        "await vectorStore.upsert({ id: conceptKey, vector, metadata: { lessonId } });",
      codeExplanation:
        "שומרים vector עם id ו-metadata כדי לדעת מאיזה מושג או מסמך הגיע match.",
      commonMistake:
        "לשמור vector בלי metadata ואז לא לדעת להסביר למשתמש מאיפה התשובה הגיעה.",
      prerequisite: "lesson_ai_engineering::embeddings",
    },
    {
      conceptName: "RAG",
      difficulty: 7,
      simpleExplanation:
        "RAG הוא Retrieval-Augmented Generation: קודם שולפים ידע רלוונטי, ואז נותנים אותו למודל כדי לענות על בסיס מקור.",
      whyFullStack:
        "RAG מחבר AI לידע של המוצר בלי fine-tuning מלא, ומקטין תשובות מנותקות מהחומר.",
      codeExample:
        "const chunks = await retrieveRelevantChunks(question);\nconst answer = await askModel({ question, context: chunks });",
      codeExplanation:
        "המודל לא מקבל רק שאלה; הוא מקבל גם context שנשלף מהחומר הרלוונטי.",
      commonMistake:
        "להניח ש-RAG תמיד נכון. אם retrieval גרוע, התשובה עדיין תהיה גרועה.",
      prerequisite: "lesson_ai_engineering::vector store",
    },
    {
      conceptName: "chunking",
      difficulty: 6,
      simpleExplanation:
        "chunking הוא פירוק מסמך ליחידות קטנות מספיק לחיפוש, אבל גדולות מספיק כדי לשמור הקשר.",
      whyFullStack:
        "אם chunk גדול מדי הוא מבזבז tokens; אם הוא קטן מדי הוא מאבד משמעות.",
      codeExample:
        "const chunks = splitByHeadings(markdown).filter((chunk) => chunk.text.length > 120);",
      codeExplanation:
        "מפרקים לפי כותרות או גבולות לוגיים במקום לחתוך טקסט באמצע רעיון.",
      commonMistake:
        "לחתוך כל 500 תווים בלי להתחשב בכותרות, קוד או הקשר.",
      prerequisite: "lesson_ai_engineering::token budget",
    },
    {
      conceptName: "retrieval ranking",
      difficulty: 6,
      simpleExplanation:
        "retrieval ranking הוא דירוג תוצאות החיפוש לפי רלוונטיות לפני ששולחים אותן למודל.",
      whyFullStack:
        "המודל עונה לפי מה שנתת לו. דירוג טוב מעלה את הסיכוי שהתשובה נשענת על החומר הנכון.",
      codeExample:
        "const selected = matches\n  .filter((match) => match.score >= 0.72)\n  .slice(0, 4);",
      codeExplanation:
        "מסננים matches חלשים ובוחרים מספר קטן של תוצאות חזקות.",
      commonMistake:
        "לשלוח את כל matches למודל בלי threshold ובלי סדר עדיפויות.",
      prerequisite: "lesson_ai_engineering::RAG",
    },
    {
      conceptName: "tool calling",
      difficulty: 7,
      simpleExplanation:
        "tool calling מאפשר למודל לבקש מקוד חיצוני לבצע פעולה מוגדרת, למשל חיפוש, חישוב או קריאת database.",
      whyFullStack:
        "כך AI לא רק כותב טקסט, אלא משתמש בפונקציות backend שנשלטות על ידי הקוד שלך.",
      codeExample:
        "const tools = {\n  getProgress: async ({ userId }) => progressRepo.findByUser(userId)\n};",
      codeExplanation:
        "המודל לא מקבל גישה חופשית למערכת; הוא יכול לבקש כלי שהקוד הגדיר ומאשר.",
      commonMistake:
        "לתת לכלי לבצע פעולה מסוכנת בלי validation, permissions ו-audit log.",
      prerequisite: "lesson_auth_security::authorization",
    },
    {
      conceptName: "agent loop",
      difficulty: 7,
      simpleExplanation:
        "agent loop הוא מחזור שבו המערכת מתכננת, קוראת לכלים, בודקת תוצאה ומחליטה אם להמשיך או לעצור.",
      whyFullStack:
        "Agents שימושיים למשימות רב-שלביות, אבל חייבים מגבלות כדי לא להיתקע בלולאות, עלויות או פעולות לא מאושרות.",
      codeExample:
        "for (const step of allowedSteps) {\n  const decision = await planner.next(state);\n  if (decision.done) break;\n  state = await runApprovedTool(decision);\n}",
      codeExplanation:
        "הלולאה מוגבלת בצעדים ומריצה רק כלים מאושרים.",
      commonMistake:
        "לקרוא לכל רצף tool calls בשם agent בלי לעצור, למדוד ולבדוק הרשאות.",
      prerequisite: "lesson_ai_engineering::tool calling",
    },
    {
      conceptName: "guardrails",
      difficulty: 6,
      simpleExplanation:
        "guardrails הם חוקים ובדיקות שמגבילים קלט, פלט ופעולות כדי לשמור על בטיחות, פרטיות ואיכות.",
      whyFullStack:
        "פיצ'ר AI נוגע בקלט משתמש, נתונים ופעולות שרת. בלי guardrails הוא יכול לחשוף מידע או לתת תשובה מסוכנת.",
      codeExample:
        "if (!user.canAskAi) throw new Error('AI quota exceeded');\nif (containsPrivateData(answer)) return safeFallback;",
      codeExplanation:
        "הקוד בודק quota והרשאות לפני הקריאה, ובודק פלט לפני הצגה.",
      commonMistake:
        "לסמוך על prompt בלבד במקום לאכוף גבולות גם בקוד.",
      prerequisite: "lesson_auth_security::authorization",
    },
    {
      conceptName: "hallucination check",
      difficulty: 6,
      simpleExplanation:
        "hallucination check הוא ניסיון לזהות תשובה שלא נשענת על מקור, סותרת את החומר, או נשמעת בטוחה מדי בלי ראיות.",
      whyFullStack:
        "במערכת לימוד, תשובה שגויה בביטחון גבוה פוגעת באמון ובידע של התלמיד.",
      codeExample:
        "const hasCitation = answer.sources.length > 0;\nconst isAllowed = hasCitation && answer.confidence !== 'unknown';",
      codeExplanation:
        "תשובה רגישה צריכה מקורות או fallback שמודה שאין מספיק מידע.",
      commonMistake:
        "להציג כל פלט של מודל כאמת בלי מקור, confidence או בדיקת סתירות.",
      prerequisite: "lesson_ai_engineering::RAG",
    },
    {
      conceptName: "evaluation",
      difficulty: 6,
      simpleExplanation:
        "evaluation היא בדיקה שיטתית של פיצ'ר AI מול סט שאלות, תשובות צפויות, קריטריונים ומדדי כישלון.",
      whyFullStack:
        "אי אפשר לדעת אם שינוי prompt או model שיפר את המוצר בלי מדידה חוזרת.",
      codeExample:
        "const score = await gradeAnswer({ question, expected, actual, rubric });",
      codeExplanation:
        "כל תשובה נמדדת מול rubric כדי למצוא רגרסיות לפני release.",
      commonMistake:
        "לבדוק רק ידנית שאלה אחת ואז לשנות prompt לכל המשתמשים.",
      prerequisite: "react_blueprint::Testing Strategies",
    },
    {
      conceptName: "fine-tuning boundary",
      difficulty: 7,
      simpleExplanation:
        "fine-tuning boundary הוא ההחלטה מתי לאמן מודל מותאם ומתי מספיק prompt/RAG/tools.",
      whyFullStack:
        "Fine-tuning לא מחליף database או retrieval. הוא מתאים בעיקר לסגנון, פורמט או דפוסי משימה שחוזרים.",
      codeExample:
        "const strategy = needsFreshPrivateKnowledge ? 'RAG' : 'prompt-or-fine-tune';",
      codeExplanation:
        "אם הידע משתנה או פרטי, לרוב שולפים אותו בזמן אמת במקום לאמן אותו לתוך המודל.",
      commonMistake:
        "לנסות fine-tuning כדי להוסיף ידע שמתעדכן כל שבוע, במקום לבנות retrieval נכון.",
      prerequisite: "lesson_ai_engineering::evaluation",
    },
  ],
};

if (typeof window !== "undefined") {
  window.LESSON_AI_ENGINEERING = LESSON_AI_ENGINEERING;
}

if (typeof module !== "undefined") {
  module.exports = { LESSON_AI_ENGINEERING: LESSON_AI_ENGINEERING };
}
