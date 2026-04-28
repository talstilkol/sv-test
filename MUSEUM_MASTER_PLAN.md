# Master Plan נפרד — מוזיאון LumenPortal

> **עדכון:** 2026-04-28
> **מטרה:** להפוך את המוזיאון לחוויית לימוד מרכזית שמחברת שכבות מחשב, שפות, Full-Stack, מוצר, טעויות, חוזים, AI, סרטונים, תרגול ודרכון תלמיד.
> **כלל עבודה קשיח:** אין `Math.random()`, אין מידע מומצא, אין תאריכים ללא מקור או ניסוח מסויג.

---

## 1. תמונת מצב

### מה כבר קיים

| אזור | סטטוס | מה קיים בפועל |
|---|---:|---|
| שער מוזיאון | ✅ מתקדם | כניסה, ניווט אגפים, מצב standalone, חזרה לפורטל |
| שכבות מחשב | ✅ בסיס חזק | חשמל, ביט/Byte, קוד מכונה, שפה, Framework, אפליקציה |
| שפות תכנות | ✅ מתקדם | שושלות, ערך/פשרה, כרטיסי אולם, ציר התפתחות |
| Full-Stack | ✅ מתקדם | תחומי מקצוע, תתי-אולמות, חוויה ישנה/עתידנית |
| מוצר מרעיון להשקה | ✅ קיים | שלבי מוצר, חלוקת עבודה, שדרוג/החלפה |
| טעויות ו-Debug | ✅ קיים | Root Cause Router וקישורים לשכבות |
| חוזים ונתונים | ✅ קיים | Contract Inspector ומסלול נתון |
| AI | ✅ מתקדם | היסטוריה, מושגים, מודל/סוכן/AI, Product Lab, Model Deep Dive |
| Video Studio | ✅ קיים | חלונות חומר לסרטונים ומסמך NotebookLM |
| דרכון תלמיד | ✅ בסיס | חותמות ביקור ומשימות הבנה |
| מובייל/RTL/Reduced Motion | 🔄 חלקי | קיימת תשתית, צריך QA רוחבי |

### הערכת השלמה

| תחום | הערכה |
|---|---:|
| תשתית UI ו-routing | 80% |
| תוכן לימודי בסיסי | 70% |
| עומק תוכן לכל אולם | 45% |
| קישורים מלאים לשיעורים/שאלות/טעויות | 45% |
| סרטונים ו-NotebookLM | 60% |
| QA מובייל/נגישות/בדיקות נתונים | 35% |
| **הערכת מוזיאון כוללת** | **כ-60%** |

המספר הוא הערכת עבודה, לא מדד בדיקה אוטומטי. כדי להגיע ל-100% צריך שכל אולם יכיל מקור/מטרה/תרשים/סרטון/שאלת בדיקה/קישור לשיעור/קישור לטעות/חותמת דרכון.

---

## 2. חזון המוזיאון

המוזיאון צריך לענות לתלמיד על ארבע שאלות בכל תחנה:

1. **מה זה?** הגדרה קצרה, בלי עומס.
2. **למה זה נוצר?** איזו בעיה אמיתית זה בא לפתור.
3. **מה זה מסתיר ומה המחיר?** כל שכבה מקלה מצד אחד ומסתירה פרטים מצד שני.
4. **איפה זה פוגש אותי בקוד ובמוצר?** שיעור, שגיאה, תרגול, API, DB או UI.

החוויה צריכה להיות מוזיאונית: אולמות, מוצגים, תרשימים, כרטיסי ערך, צירי זמן, סימולטורים קטנים, סרטונים ודרכון תלמיד.

---

## 3. ארכיטקטורת אגפים

| אגף | Route | תפקיד |
|---|---|---|
| בית המוזיאון | `?standalone=museum&wing=home` | שער כניסה, מסלולים וסטטוס ביקור |
| שכבות המחשב | `?standalone=museum&wing=stack&stackLayer=...` | להבין איך פעולה יורדת עד חומרה ועולה חזרה לאפליקציה |
| שפות התכנות | `?standalone=museum&wing=languages` | להבין שושלות, פשרות והיסטוריה של שפות |
| Full-Stack | `?standalone=museum&wing=fullstack&domain=...` | להבין תחומי מקצוע ומה עושים בהם |
| מוצר | `?standalone=museum&wing=product` | רעיון → פיתוח → השקה → שיפור |
| טעויות | `?standalone=museum&wing=errors` | אבחון שורש לפי שכבה |
| חוזים ונתונים | `?standalone=museum&wing=contracts` | input/output, props, API, schema, validation |
| AI | `?standalone=museum&wing=ai` | AI, מודלים, סוכנים, אימון, LoRA, מוצר AI |
| סרטונים | `?standalone=museum&wing=videos` | חומרי NotebookLM לכל סרטון |
| דרכון תלמיד | `?standalone=museum&wing=passport` | חותמות, משימות, מסלולי ביקור |

---

## 4. Definition of Done לכל אולם

אולם נחשב גמור רק אם יש בו:

1. כותרת, מטרה וידע מקדים.
2. "למה נוצר" ו"מה פתר".
3. "מה המחיר" או "מה זה מסתיר".
4. תרשים או זרימה.
5. דוגמת קוד או דוגמת מוצר.
6. טעות נפוצה ומה בודקים קודם.
7. קישור לשיעור/מושג/שאלה בפורטל.
8. חומר לסרטון NotebookLM.
9. שאלת בדיקה לתלמיד.
10. חותמת דרכון.
11. תמיכה במובייל, RTL, מקלדת ו-reduced motion.
12. בדיקת נתונים שאין שדות קריטיים ריקים.

---

## 5. Backlog חומרים חסרים לפי אגף

### 5.1 אגף שכבות המחשב

| שכבה | חסר להשלים | תוצר סופי |
|---|---|---|
| חשמל | טרנזיסטור, שערים לוגיים, אות, מתח/זרם | סימולטור מתג שמראה איך 0/1 נוצר |
| ביט / Byte | encoding, מספרים, תווים, overflow בסיסי | ממיר ביטים דטרמיניסטי עם הסבר |
| קוד מכונה | opcode, register, memory, instruction cycle | X-Ray של פקודה אחת |
| שפה | syntax, compiler/interpreter, runtime, GC | תרשים מהקוד עד הרצה |
| Framework | מה framework מסתיר ומה הוא כופה | השוואת vanilla מול framework |
| אפליקציה | state, data, action, persistence | פעולה אחת מה-UI עד DB וחזרה |

### 5.2 אגף שפות התכנות

1. להשלים כרטיס לכל תחנה בשושלות: בעיה, פתרון, מחיר, התפתחות.
2. להוסיף חדר פשרות: מהירות, שליטה, בטיחות, קריאות, ניידות, פרודוקטיביות.
3. להוסיף השוואות:
   - `C` מול `Rust`
   - `JavaScript` מול `TypeScript`
   - `React` מול DOM ישיר
   - `SQL` מול Document DB
4. להוסיף דוגמת קוד קצרה לכל משפחה.
5. להוסיף מסלול "איך שפה הופכת ל-framework ואז למוצר".

### 5.3 אגף Full-Stack

| תחום | חומרים חסרים |
|---|---|
| UI / HTML / CSS | semantic HTML, layout, responsive, accessibility, visual states |
| Browser Runtime | DOM update, event loop, storage, rendering |
| Async / Network | promise, fetch, HTTP lifecycle, loading/error |
| Node / npm / modules | package, module, filesystem, environment |
| API / HTTP / Express | route, middleware, status, validation, auth boundary |
| Database / MongoDB / Mongoose | schema, collection, document, query, index |
| React Product | component, props, state, hooks, router, context |
| Quality / Tests / AI Review | unit, integration, smoke, regression, AI review |

לכל תחום צריך: מה עושים בו, למה התחום נוצר, מה נשבר כשלא מבינים אותו, תרשים זרימה, סרטון, שאלה, תרגול וקישור לשיעורים.

### 5.4 אגף מוצר

| שלב | חסר להשלים |
|---|---|
| לפני פיתוח | בעיה, משתמש, KPI, scope, wireframe, data model, risk list |
| בזמן פיתוח | חלוקת עבודה Product/UX/Frontend/Backend/Data/QA |
| לפני השקה | build, accessibility, performance, content, errors, security |
| בזמן השקה | rollout, monitoring, support, analytics, feedback |
| אחרי השקה | bug triage, version planning, debt, telemetry, UX improvements |
| שדרוג/החלפה | כרטיסי החלטה עם קריטריונים ברורים |

### 5.5 אגף טעויות ו-Debug

| סוג טעות | חסר להשלים |
|---|---|
| Syntax | סימני זיהוי ודוגמאות JS/React |
| Runtime | `undefined`, null, reference, type mismatch |
| Scope / Closure | משתנה לא קיים במקום הצפוי |
| Async | missing await, race, promise rejection, loading state |
| React State | mutation, stale state, dependency array |
| API | 400/401/404/500, CORS, body חסר |
| Database | schema mismatch, missing field, query ריק |
| Release | build failure, env חסר, regression, performance |

### 5.6 אגף חוזים ונתונים

1. חוזה לכל שכבה: function, component props, API body/response, DB schema, validation.
2. דוגמה של חוזה שנשבר ומה הסימפטום.
3. טבלת בעלות: מי אחראי על החוזה.
4. מסלול נתון אחד: input → state → JSON → API → DB → response → render.
5. בדיקות חוזה: unit, integration, schema validation, smoke.

### 5.7 אגף AI

כבר נוספו היסטוריה, Product Lab ו-Model Deep Dive. חסר להשלים:

1. חדר `RAG`: embeddings, chunking, retrieval, citations, failure modes.
2. חדר `LLM Internals`: tokens, context window, attention, inference, hallucination.
3. חדר `AI Feature`: prompt, sources, tools, policy, logs, evals.
4. טבלה: local model, open weights, open source, hosted API, commercial product.
5. חדר סיכונים: privacy, permission, cost, latency, bias, wrong answer.
6. דוגמאות מהקורס: debug, סיכום שיעור, שאלות, בדיקת פתרון, יצירת prompt.

### 5.8 Video Studio ו-NotebookLM

1. לוודא שכל 63 הסרטונים כוללים:
   - חומר רקע
   - ידע מקדים
   - סקריפט
   - prompt
   - הוראות בחירה ב-NotebookLM
2. לוודא שכל כפתור "פתח חומר לסרטון" מציג את החומר הנכון.
3. להוסיף מסלולים מסכמים:
   - לפני מבחן
   - Full-Stack end-to-end
   - Debug
   - AI במוצר
4. להוסיף שאלה אחרי צפייה לכל סרטון.
5. לבצע QA שאין תאריכים או טענות לא מבוססות.

### 5.9 דרכון תלמיד ומסלולי ביקור

| מסלול | חסר להשלים |
|---|---|
| מתחילים | סדר ביקור: שכבות → שפה → UI → API → DB |
| לפני מבחן | מושגים, טעויות, שאלות בדיקה, סרטונים קצרים |
| בניית מוצר | רעיון → UI → API → DB → Tests → Launch |
| Debug | symptom → layer → contract → fix → test |
| React / Full-Stack | state → component → router → API → DB → release |
| AI במוצר | use case → data → model/RAG/agent → guardrails → eval |

---

## 6. מערכת קשרים מושלמת

כל פריט במוזיאון צריך להיות מחובר כך:

| מקור | צריך לקשר אל |
|---|---|
| אולם | שיעור, שאלה, סרטון, דרכון, טעות |
| טעות | שכבת שורש, חוזה שנשבר, בדיקה ראשונה |
| מושג | איפה בקוד, איפה בשיעור, לאן מוביל |
| סרטון | ידע מקדים, פרומפט, שאלת בדיקה |
| תחום Full-Stack | תפקיד בצוות, שלב מוצר, חוזה טכני |
| AI Feature | מקור מידע, כלי, מודל, eval, סיכון |

---

## 7. שלבי ביצוע

### שלב 1 — Content Safety

- למפות כל שנה, ראשון וטענה היסטורית למקור.
- לסמן טענות לא ודאיות בניסוח מסויג.
- לוודא שאין תאריכים חדשים בלי מקור.

### שלב 2 — Cross-Linking

- להוסיף לכל אולם קישורים לשיעורים.
- להוסיף לכל טעות קישור לאולם שורש.
- להוסיף לכל סרטון קישור לאולם ולשאלת בדיקה.
- להוסיף לכל חותמת דרכון יעד לימודי.

### שלב 3 — Full-Stack Depth

- לפתוח כל תחום מקצועי לעומק.
- להוסיף תרשימי זרימה וסימולטורים קטנים.
- להשלים "מה עושים בו" ו"מה נשבר".

### שלב 4 — Debug + Contracts

- לאחד אבחון טעות עם חוזים.
- להוסיף Contract Journey מלא לנתון.
- להוסיף בדיקות לכל סוג חוזה.

### שלב 5 — AI Expansion

- להשלים RAG, LLM internals, evals, guardrails וסיכונים.
- לחבר AI לשיעורים ולתרגול.
- להוסיף גרף AI מורחב.

### שלב 6 — Video QA

- לעבור על 63 הסרטונים.
- לוודא שכל חלון סרטון שלם.
- להוסיף שאלת בדיקה לכל סרטון.

### שלב 7 — Student Experience

- להשלים דרכון תלמיד.
- להשלים מסלולי ביקור.
- לשמור סטטוס ביקור ב-`localStorage` עם מפתח גרסה דטרמיניסטי.

### שלב 8 — Polish + Accessibility

- QA מובייל ו-RTL.
- reduced motion מלא.
- מקלדת וטאבים.
- בדיקת טקסטים שלא חורגים מכרטיסים.

### שלב 9 — Verification

- `node --check app.js`
- `npm run build`
- בדיקת מוזיאון ממוקדת
- `rg -n "Math\\.random" --glob '*.js' --glob '*.html' --glob '*.css' --glob '*.test.js'`
- בדיקת דפדפן לכל אגף
- `npm test` אחרי ייצוב שינויים מקבילים

---

## 8. סדר עדיפויות להמשך

| עדיפות | משימה | סיבה |
|---|---|---|
| P0 | מקורות וניסוחים מסויגים | אמינות המוזיאון |
| P0 | קישורים בין אולם→שיעור→טעות→סרטון | להפוך את המוזיאון למפת למידה |
| P1 | עומק Full-Stack | זה ליבת המקצוע |
| P1 | Debug + Contracts | זה פותר טעויות תלמידים בפועל |
| P1 | QA ל-63 סרטונים | החומר כבר קיים וצריך סגירה |
| P2 | סימולטורים קטנים | משדרג חוויה והבנה |
| P2 | מובייל/נגישות/פוליש | הכנה לשימוש יומי |

---

## 9. Definition of Done למוזיאון כולו

המוזיאון ייחשב גמור כאשר:

1. כל אגף פתוח ב-route עצמאי.
2. כל אולם עומד ב-Definition of Done.
3. כל סרטון מחובר לאולם, ידע מקדים ושאלת בדיקה.
4. כל טעות מובילה לאולם שורש ולבדיקה ראשונה.
5. כל מושג מרכזי מחובר לשיעור ולדוגמת קוד.
6. כל תחום Full-Stack מחובר לתפקיד, מוצר וחוזה.
7. כל טענה היסטורית מגובה מקור או מסויגת.
8. אין שימוש ב-`Math.random()` בקוד.
9. `npm run build` עובר.
10. בדיקת דפדפן עוברת ב-desktop וב-mobile.

---

## 10. Stop Point להיום

סוף יום העבודה:

- תוכנית מוזיאון נפרדת נוצרה.
- רשימת חומרים חסרים מסודרת לפי אגפים.
- סדר עדיפויות להמשך ברור.
- אין צורך להמשיך היום בפיתוח נוסף עד פתיחת סבב העבודה הבא.
