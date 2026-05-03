# AI Engineering - OpenAI, Vercel AI SDK, RAG ו-Agents — דף סיכום למבחן

**מודול SVCollege:** הנדסת AI מעשית - Vercel AI SDK, OpenAI, LangChain, RAG, Agents, Fine-tuning

**תיאור:** איך בונים פיצ'ר AI אמיתי באפליקציית Full Stack: בחירת מודל, prompt, streaming, structured output, embeddings, RAG, tools, agents, guardrails ו-evaluation.

**מספר מושגים:** 19

---

## מושגים בסיכום

### 1. OpenAI API

**רמת קושי:** 5/10

**מה זה:** OpenAI API הוא שירות backend שמקבל בקשה עם הוראות וקלט, מריץ מודל, ומחזיר טקסט, JSON, embeddings או קריאה לכלי.

**למה Full Stack:** מפתח Full Stack צריך לדעת לשים את הקריאה בצד שרת, לשמור את המפתח ב-env, ולהחזיר ללקוח רק את התוצאה המותרת.

**דוגמה:**
```
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const result = await client.responses.create({
  model: process.env.OPENAI_MODEL,
  input: 'סכם את ההודעה לתלמיד בשורה אחת'
});
```

**הסבר:** הלקוח נוצר בשרת עם API key מהסביבה. הבקשה שולחת model ו-input ומקבלת response מהמודל.

⚠️ **טעות נפוצה:** לקרוא ל-API ישירות מהדפדפן ולחשוף את OPENAI_API_KEY למשתמשים.

**תלוי ב:** `lesson_devops_deploy::environment variables`

---

### 2. Vercel AI SDK

**רמת קושי:** 5/10

**מה זה:** Vercel AI SDK היא שכבת עזר ל-Next/Node שמפשטת generate, stream, tool calls ו-structured output מול ספקי AI.

**למה Full Stack:** היא נותנת API נוח ל-route handlers ול-React UI, במיוחד כשצריך streaming chat בלי לכתוב plumbing ידני.

**דוגמה:**
```
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(request) {
  const { messages } = await request.json();
  const result = streamText({ model: openai(process.env.OPENAI_MODEL), messages });
  return result.toDataStreamResponse();
}
```

**הסבר:** route handler מקבל messages, מפעיל streamText ומחזיר response זורם ללקוח.

⚠️ **טעות נפוצה:** להשתמש ב-SDK בצד לקוח במקום בצד שרת, או לשכוח לטפל בשגיאות ובמגבלות קצב.

**תלוי ב:** `lesson_nextjs::route handler`

---

### 3. LangChain

**רמת קושי:** 6/10

**מה זה:** LangChain היא ספריית orchestration שמחברת prompt, model, parser, retrieval ו-tools לשרשראות עבודה.

**למה Full Stack:** כשפיצ'ר AI גדל מעבר לקריאה אחת למודל, צריך דרך מסודרת להרכיב שלבים, להחליף רכיבים ולבדוק אותם.

**דוגמה:**
```
const chain = prompt.pipe(model).pipe(parser);
const answer = await chain.invoke({ question: userQuestion });
```

**הסבר:** ה-chain מעביר את הקלט דרך prompt, אחר כך model, ואז parser שמחזיר מבנה נוח לקוד.

⚠️ **טעות נפוצה:** להוסיף orchestration כבדה בשביל פעולה פשוטה שאפשר לבצע בקריאה אחת ברורה.

**תלוי ב:** `lesson_ai_engineering::OpenAI API`

---

### 4. model selection

**רמת קושי:** 5/10

**מה זה:** model selection היא החלטה איזה מודל מתאים למשימה לפי איכות, latency, עלות, context window ויכולת tool/JSON.

**למה Full Stack:** בחירת מודל לא נכונה יכולה להפוך מוצר לאיטי, יקר או לא מדויק, גם אם הקוד תקין.

**דוגמה:**
```
const modelForTask = task.kind === 'fast-summary'
  ? process.env.OPENAI_FAST_MODEL
  : process.env.OPENAI_REASONING_MODEL;
```

**הסבר:** הקוד בוחר מודל לפי סוג משימה במקום לקבע מודל אחד לכל המערכת.

⚠️ **טעות נפוצה:** להשתמש תמיד במודל החזק ביותר גם למשימות פשוטות, ואז לשלם ב-latency ועלות.

**תלוי ב:** `lesson_devops_deploy::environment variables`

---

### 5. prompt messages

**רמת קושי:** 4/10

**מה זה:** prompt messages הם ההוראות והקלט שנשלחים למודל: תפקיד, כללים, הקשר, שאלה ופורמט תשובה.

**למה Full Stack:** Prompt הוא חלק מהקוד. הוא צריך להיות עקבי, ניתן לבדיקה, ולא לערבב נתוני משתמש עם הוראות מערכת בלי גבולות.

**דוגמה:**
```
const messages = [
  { role: 'system', content: 'ענה בעברית קצרה וברורה.' },
  { role: 'user', content: userQuestion }
];
```

**הסבר:** system מגדיר התנהגות כללית, user מכיל את בקשת המשתמש.

⚠️ **טעות נפוצה:** לשים את כל הכללים בתוך הודעת user ולא להפריד בין הוראות מערכת לקלט משתמש.

**תלוי ב:** `lesson_ai_engineering::OpenAI API`

---

### 6. structured output

**רמת קושי:** 6/10

**מה זה:** structured output הוא מצב שבו מבקשים מהמודל להחזיר JSON לפי schema במקום טקסט חופשי.

**למה Full Stack:** קוד צריך נתונים צפויים. JSON לפי schema מאפשר validation, שמירה ב-DB והצגה ב-UI בלי parsing שביר.

**דוגמה:**
```
const expectedShape = {
  title: 'string',
  weakConcepts: ['string'],
  nextAction: 'string'
};
```

**הסבר:** ה-shape מתאר מה הקוד מצפה לקבל, ואז אפשר לבדוק שכל שדה קיים לפני שימוש.

⚠️ **טעות נפוצה:** לבקש 'תחזיר JSON' אבל לא לאמת את התוצאה לפני שמשתמשים בה.

**תלוי ב:** `lesson_11::object`

---

### 7. streaming response

**רמת קושי:** 5/10

**מה זה:** streaming response מחזיר תשובה בהדרגה במקום לחכות שכל הטקסט יהיה מוכן.

**למה Full Stack:** ב-chat או tutor, streaming מוריד תחושת המתנה ומאפשר UI שמגיב מהר.

**דוגמה:**
```
const result = streamText({ model, messages });
return result.toDataStreamResponse();
```

**הסבר:** השרת פותח response זורם, והלקוח מציג chunks כשהם מגיעים.

⚠️ **טעות נפוצה:** לערבב streaming עם פעולות שחייבות JSON מלא וסופי בלי parser מתאים.

**תלוי ב:** `lesson_nextjs::route handler`

---

### 8. token budget

**רמת קושי:** 5/10

**מה זה:** token budget הוא ניהול כמות הקלט והפלט שהמודל מעבד, כי כל הודעה, מסמך ותשובה צורכים tokens.

**למה Full Stack:** בלי תקציב tokens, פיצ'ר AI נהיה יקר, איטי, או נכשל כשעוברים את context window.

**דוגמה:**
```
const compactContext = relevantChunks.slice(0, 4).join('\n---\n');
```

**הסבר:** לא שולחים את כל המסמכים; בוחרים רק chunks רלוונטיים כדי להישאר בתקציב.

⚠️ **טעות נפוצה:** להדביק את כל הידע לפרומפט במקום לבצע retrieval וסינון.

**תלוי ב:** `lesson_12::array`

---

### 9. embeddings

**רמת קושי:** 6/10

**מה זה:** embeddings הם וקטורים מספריים שמייצגים משמעות של טקסט כך שאפשר להשוות דמיון בין טקסטים.

**למה Full Stack:** Embeddings מאפשרים חיפוש סמנטי: למצוא מסמך רלוונטי גם אם המשתמש לא השתמש באותן מילים.

**דוגמה:**
```
const vector = await createEmbedding('איך עובד JWT?');
const matches = await vectorStore.search(vector, { topK: 5 });
```

**הסבר:** הטקסט הופך לווקטור, ואז משווים אותו לווקטורים שמורים במסד נתונים או vector store.

⚠️ **טעות נפוצה:** לחשוב ש-embedding הוא תשובה. הוא רק ייצוג לחיפוש והשוואה.

**תלוי ב:** `lesson_sql_orm::database`

---

### 10. vector store

**רמת קושי:** 6/10

**מה זה:** vector store הוא אחסון שמחזיק vectors ומאפשר similarity search מהיר.

**למה Full Stack:** RAG מעשי צריך מקום לשמור embeddings של מסמכים, שיעורים, snippets או תשובות מאושרות.

**דוגמה:**
```
await vectorStore.upsert({ id: conceptKey, vector, metadata: { lessonId } });
```

**הסבר:** שומרים vector עם id ו-metadata כדי לדעת מאיזה מושג או מסמך הגיע match.

⚠️ **טעות נפוצה:** לשמור vector בלי metadata ואז לא לדעת להסביר למשתמש מאיפה התשובה הגיעה.

**תלוי ב:** `lesson_ai_engineering::embeddings`

---

### 11. RAG

**רמת קושי:** 7/10

**מה זה:** RAG הוא Retrieval-Augmented Generation: קודם שולפים ידע רלוונטי, ואז נותנים אותו למודל כדי לענות על בסיס מקור.

**למה Full Stack:** RAG מחבר AI לידע של המוצר בלי fine-tuning מלא, ומקטין תשובות מנותקות מהחומר.

**דוגמה:**
```
const chunks = await retrieveRelevantChunks(question);
const answer = await askModel({ question, context: chunks });
```

**הסבר:** המודל לא מקבל רק שאלה; הוא מקבל גם context שנשלף מהחומר הרלוונטי.

⚠️ **טעות נפוצה:** להניח ש-RAG תמיד נכון. אם retrieval גרוע, התשובה עדיין תהיה גרועה.

**תלוי ב:** `lesson_ai_engineering::vector store`

---

### 12. chunking

**רמת קושי:** 6/10

**מה זה:** chunking הוא פירוק מסמך ליחידות קטנות מספיק לחיפוש, אבל גדולות מספיק כדי לשמור הקשר.

**למה Full Stack:** אם chunk גדול מדי הוא מבזבז tokens; אם הוא קטן מדי הוא מאבד משמעות.

**דוגמה:**
```
const chunks = splitByHeadings(markdown).filter((chunk) => chunk.text.length > 120);
```

**הסבר:** מפרקים לפי כותרות או גבולות לוגיים במקום לחתוך טקסט באמצע רעיון.

⚠️ **טעות נפוצה:** לחתוך כל 500 תווים בלי להתחשב בכותרות, קוד או הקשר.

**תלוי ב:** `lesson_ai_engineering::token budget`

---

### 13. retrieval ranking

**רמת קושי:** 6/10

**מה זה:** retrieval ranking הוא דירוג תוצאות החיפוש לפי רלוונטיות לפני ששולחים אותן למודל.

**למה Full Stack:** המודל עונה לפי מה שנתת לו. דירוג טוב מעלה את הסיכוי שהתשובה נשענת על החומר הנכון.

**דוגמה:**
```
const selected = matches
  .filter((match) => match.score >= 0.72)
  .slice(0, 4);
```

**הסבר:** מסננים matches חלשים ובוחרים מספר קטן של תוצאות חזקות.

⚠️ **טעות נפוצה:** לשלוח את כל matches למודל בלי threshold ובלי סדר עדיפויות.

**תלוי ב:** `lesson_ai_engineering::RAG`

---

### 14. tool calling

**רמת קושי:** 7/10

**מה זה:** tool calling מאפשר למודל לבקש מקוד חיצוני לבצע פעולה מוגדרת, למשל חיפוש, חישוב או קריאת database.

**למה Full Stack:** כך AI לא רק כותב טקסט, אלא משתמש בפונקציות backend שנשלטות על ידי הקוד שלך.

**דוגמה:**
```
const tools = {
  getProgress: async ({ userId }) => progressRepo.findByUser(userId)
};
```

**הסבר:** המודל לא מקבל גישה חופשית למערכת; הוא יכול לבקש כלי שהקוד הגדיר ומאשר.

⚠️ **טעות נפוצה:** לתת לכלי לבצע פעולה מסוכנת בלי validation, permissions ו-audit log.

**תלוי ב:** `lesson_auth_security::authorization`

---

### 15. agent loop

**רמת קושי:** 7/10

**מה זה:** agent loop הוא מחזור שבו המערכת מתכננת, קוראת לכלים, בודקת תוצאה ומחליטה אם להמשיך או לעצור.

**למה Full Stack:** Agents שימושיים למשימות רב-שלביות, אבל חייבים מגבלות כדי לא להיתקע בלולאות, עלויות או פעולות לא מאושרות.

**דוגמה:**
```
for (const step of allowedSteps) {
  const decision = await planner.next(state);
  if (decision.done) break;
  state = await runApprovedTool(decision);
}
```

**הסבר:** הלולאה מוגבלת בצעדים ומריצה רק כלים מאושרים.

⚠️ **טעות נפוצה:** לקרוא לכל רצף tool calls בשם agent בלי לעצור, למדוד ולבדוק הרשאות.

**תלוי ב:** `lesson_ai_engineering::tool calling`

---

### 16. guardrails

**רמת קושי:** 6/10

**מה זה:** guardrails הם חוקים ובדיקות שמגבילים קלט, פלט ופעולות כדי לשמור על בטיחות, פרטיות ואיכות.

**למה Full Stack:** פיצ'ר AI נוגע בקלט משתמש, נתונים ופעולות שרת. בלי guardrails הוא יכול לחשוף מידע או לתת תשובה מסוכנת.

**דוגמה:**
```
if (!user.canAskAi) throw new Error('AI quota exceeded');
if (containsPrivateData(answer)) return safeFallback;
```

**הסבר:** הקוד בודק quota והרשאות לפני הקריאה, ובודק פלט לפני הצגה.

⚠️ **טעות נפוצה:** לסמוך על prompt בלבד במקום לאכוף גבולות גם בקוד.

**תלוי ב:** `lesson_auth_security::authorization`

---

### 17. hallucination check

**רמת קושי:** 6/10

**מה זה:** hallucination check הוא ניסיון לזהות תשובה שלא נשענת על מקור, סותרת את החומר, או נשמעת בטוחה מדי בלי ראיות.

**למה Full Stack:** במערכת לימוד, תשובה שגויה בביטחון גבוה פוגעת באמון ובידע של התלמיד.

**דוגמה:**
```
const hasCitation = answer.sources.length > 0;
const isAllowed = hasCitation && answer.confidence !== 'unknown';
```

**הסבר:** תשובה רגישה צריכה מקורות או fallback שמודה שאין מספיק מידע.

⚠️ **טעות נפוצה:** להציג כל פלט של מודל כאמת בלי מקור, confidence או בדיקת סתירות.

**תלוי ב:** `lesson_ai_engineering::RAG`

---

### 18. evaluation

**רמת קושי:** 6/10

**מה זה:** evaluation היא בדיקה שיטתית של פיצ'ר AI מול סט שאלות, תשובות צפויות, קריטריונים ומדדי כישלון.

**למה Full Stack:** אי אפשר לדעת אם שינוי prompt או model שיפר את המוצר בלי מדידה חוזרת.

**דוגמה:**
```
const score = await gradeAnswer({ question, expected, actual, rubric });
```

**הסבר:** כל תשובה נמדדת מול rubric כדי למצוא רגרסיות לפני release.

⚠️ **טעות נפוצה:** לבדוק רק ידנית שאלה אחת ואז לשנות prompt לכל המשתמשים.

**תלוי ב:** `react_blueprint::Testing Strategies`

---

### 19. fine-tuning boundary

**רמת קושי:** 7/10

**מה זה:** fine-tuning boundary הוא ההחלטה מתי לאמן מודל מותאם ומתי מספיק prompt/RAG/tools.

**למה Full Stack:** Fine-tuning לא מחליף database או retrieval. הוא מתאים בעיקר לסגנון, פורמט או דפוסי משימה שחוזרים.

**דוגמה:**
```
const strategy = needsFreshPrivateKnowledge ? 'RAG' : 'prompt-or-fine-tune';
```

**הסבר:** אם הידע משתנה או פרטי, לרוב שולפים אותו בזמן אמת במקום לאמן אותו לתוך המודל.

⚠️ **טעות נפוצה:** לנסות fine-tuning כדי להוסיף ידע שמתעדכן כל שבוע, במקום לבנות retrieval נכון.

**תלוי ב:** `lesson_ai_engineering::evaluation`

---
