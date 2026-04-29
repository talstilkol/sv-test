# Master Plan — בניית מאגר שאלות מלא לכל 434 המושגים

> **המטרה:** להגיע למצב שבו לכל מושג ב-19 השיעורים יש ✅ **3 שאלות אמריקניות** ו-✅ **2 שאלות השלמת קוד**, כך שהתלמיד יכול להגיע מרמה 1 (סבתא) לרמה 7 (מאסטר) בכל מושג בלי הפסקת שאלות מיוצרות אוטומטית.

> **עדכון 2026-04-28:** מסמך זה הוא תוכנית legacy ממוקדת בנק שאלות. תוכנית האב הפעילה היא [SPEC_AND_MASTER_PLAN.md](SPEC_AND_MASTER_PLAN.md), והביצוע היומי נמצא ב-[EXECUTION_TASKS.md](EXECUTION_TASKS.md). קו הסיום הראשון גובר על המסמך הזה: כיסוי מלא של `SVCollege — קורס AI & Full Stack` בכל הפורטל לפני הרחבות אחרות.

> **עדכון Finish Line 1:** מיפוי מודול×טאב כבר ירוק: `SVCOLLEGE_TAB_MATRIX.md` מדווח `225/225` תאים קשיחים, `0` פערי טאב, ו־`15/15` מודולי SVCollege מכוסים. העבודה שנותרה לפני סגירת קו הסיום היא smoke בדפדפן, הגדלת עומק שאלות למושגים ש-`validate:strict` מסמן, ודרישות קדם/פידבק לכל שאלה קשה.

> **עדכון XP Economy 2026-04-29:** תוכנית החנות והכלכלה החדשה נמצאת ב-[XP_REWARD_STORE_MASTER_PLAN.md](XP_REWARD_STORE_MASTER_PLAN.md). היא מוסיפה 100 רמות XP לא לינאריות, Coins, חנות חוויות, כרטיסים למוזיאון ושער רמה 100 שמחייב שליטה מלאה. היא Priority 2 ואינה חוסמת חומר חובה למבחן.

> **עדכון Forward Plan 2026-04-29:** נוסף כיוון Phase 9 ב-[SPEC_AND_MASTER_PLAN.md](SPEC_AND_MASTER_PLAN.md) וב-[EXECUTION_TASKS.md](EXECUTION_TASKS.md): Exam Intelligence + Reliability Hardening. זה כולל Exam Cockpit, מניעת שאלות כפולות, escalation לשאלות קשות, recovery drills אחרי טעות, mobile/desktop smoke מלא, ושער 100 שלא מאפשר ציון מלא בלי הוכחת עומק וקוד.

> **עדכון Post-Exam Plan 2026-04-29:** נוסף Phase 10: Exam OS v2 + Content Factory. זהו שלב אחרי Exam Edition, לא לפני המבחן הקרוב. הוא מגדיר מפעל שאלות עומק, דוחות Mastery Audit, סימולציות לחץ, daily exam OS, ופיצול עתידי לפורטלים נפרדים לקורסים שאינם SVCollege AI & Full Stack.

> **עדכון Exam Week 2026-04-29:** נוסף [EXAM_WEEK_OPERATING_PLAN.md](EXAM_WEEK_OPERATING_PLAN.md). זהו מסמך הפעלה יומי עד המבחן: בדיקות בוקר, סגירת 10 מושגים חלשים ביום, סימולציית תלמיד בערב, ושער Exam Edition. הוא לא מוסיף scope חדש, אלא מונע סטייה מהיעד הראשון.

> **עדכון Exam Sprint 2026-04-29:** נוסף P-0.3 ב-[EXECUTION_TASKS.md](EXECUTION_TASKS.md): ספרינט 7 ימים לפני מבחן. הוא מתמקד ב-weakest 10, no-repeat simulation, harder-after-correct, wrong-answer repair, smoke מובייל/פוקוס, וגיבוש `Exam Edition RC`.

## 0. עדכון אסטרטגי לתוכנית

לפני הרחבת בנק השאלות לכל המושגים, המיקוד עובר ל-SVCollege:

1. כל שאלה קשה תקבל דרישות קדם והסבר צדדי של המונחים שחייבים לדעת.
2. כל מודול SVCollege חייב להופיע לא רק בשיעור אלא גם בטאבים: מאמן, מבחן מדומה, Gap Matrix, מפת ידע, Flashcards, Code Trace ו-Mini Build; המטריצה האוטומטית כבר מאמתת זאת ב-225/225 תאים.
3. כל חומר גלם בתיקיית `lessons/` יקושר לשיעור ולתוכן האינטראקטיבי שנוצר ממנו.
4. `covered` יוגדר רק כשיש שיעור, תרגול, ניווט, בדיקות וראיית UX בדפדפן.
5. הרחבות כמו מוזיאון, קהילה ו-AI production נשארות Priority 2 עד שדוח SVCollege ירוק.
6. XP/Coins/Store הם שכבת מוטיבציה בלבד: לא קונים ציון, לא קונים מאסטר, ולא נועלים ידע חובה.
7. השיפור הבא לפני פיצ'רי פרימיום: Exam Cockpit + Deep Question Ladder + Full Portal Reliability. מטרתם להעלות סיכוי לציון 100, לא להגדיל את מספר הטאבים.
8. אחרי Exam Edition יציב: Content Factory + Mastery Audit + Final Simulation Lab. המטרה היא להפוך את המערכת למכונה שמייצרת איכות מדידה, לא רק למסך לימוד נוסף.
9. בשבעת ימי ההכנה למבחן: לא מודדים התקדמות לפי מספר פיצ'רים, אלא לפי מספר מושגים מסוכנים שהפכו למוכחים בשאלת עומק וקוד.

---

## 1. תמונת מצב נוכחית

| מודול | מושגים | יעד MC (×3) | יעד Fill (×2) | סטטוס |
|---|---:|---:|---:|---|
| `lesson11` — Arrays/Functions/Scope | 28 | 84 | 56 | 🔄 חלקי |
| `lesson12` — Array Methods | 12 | 36 | 24 | ⏳ |
| `lesson13` — DOM/OOP/Storage | 32 | 96 | 64 | 🔄 חלקי |
| `lesson15` — Errors/Closure/Forms | 18 | 54 | 36 | ⏳ |
| `lesson16` — Async/Fetch/Promises | 27 | 81 | 54 | ⏳ |
| `lesson17` — REST/CRUD/Express בסיסי | 38 | 114 | 76 | ⏳ |
| `lesson18` — Auth/Express מתקדם | 12 | 36 | 24 | ⏳ |
| `lesson19` — Node File System | 50 | 150 | 100 | ⏳ |
| `lesson20` — MongoDB/Mongoose | 30 | 90 | 60 | ⏳ |
| `lesson21` — React Vite | 23 | 69 | 46 | ⏳ |
| `lesson22` — useState/Hooks | 18 | 54 | 36 | 🔄 חלקי |
| `lesson23` — Parent↔Child Comms | 22 | 66 | 44 | ⏳ |
| `lesson24` — useEffect/useRef/useMemo | 16 | 48 | 32 | ⏳ |
| `lesson25` — React Router | 14 | 42 | 28 | ⏳ |
| `lesson26` — Context API | 30 | 90 | 60 | ⏳ |
| `lesson27` — TypeScript & React+TS | 20 | 60 | 40 | ⏳ |
| `workbook_taskmanager` | 12 | 36 | 24 | ⏳ |
| `ai_development` | 12 | 36 | 24 | ⏳ |
| `react_blueprint` | 10 | 30 | 20 | ⏳ |
| **סה"כ** | **434** | **1,302 MC** | **868 Fill** | **2,170 שאלות** |

נקודת התחלה (מוטמעת ב-`data/questions_bank.js`): **44 MC + 17 Fill = 61 שאלות**.
**פער:** 1,258 MC + 851 Fill נוספות.

---

## 2. תבניות שאלות (Templates) — 5 דפוסים שמתאימים לכל מושג

עבור כל מושג `C` בשיעור `L` עם הסברים ברמות `grandma..professor`, ובדרך כלל גם `codeExample`:

### תבנית A — "תיאור" (describe)
> שאלה: *"איזה מהמשפטים מתאר נכון את `<C>` ברמת `<level>`?"*
> נכון: ההסבר של `C` ברמה זו · Distractors: הסברים של 3 מושגים אחרים באותה רמה.

### תבנית B — "התאמת שם" (name-match)
> שאלה: *"איזה מושג מתאים להגדרה הבאה: `<explanation>`?"*
> נכון: שם המושג · Distractors: 3 שמות של מושגים אחרים.

### תבנית C — "תוצאה / חיזוי" (predict-output)
> שאלה: *"מה יודפס?"* + בלוק קוד
> אופציות: 4 ערכים סבירים. דורש הבנת ביצוע.

### תבנית D — "Why" (rationale)
> שאלה: *"למה לא עושים את זה? / למה משתמשים ב-X?"*
> תשובה נכונה מסבירה את העיקרון. Distractors הם תפיסות שגויות שכיחות.

### תבנית E — "Code Fill" (השלמה)
> מציג את `codeExample` של המושג עם טוקן אחד מוסתר (`____`).
> שלוש שיטות לבחירת הטוקן:
> 1. שם המושג עצמו אם מופיע בקוד (`useState`, `map`, `filter`...)
> 2. מילת מפתח מרשימה לבנה (`async`, `await`, `return`, `const`...)
> 3. מזהה ייחודי (4-18 תווים) שאינו מילה שמורה כללית.

---

## 3. רמת הקושי לפי שאלה (1-6)

| רמה | פרסונה | אופי השאלה | סגנון Distractors |
|---:|---|---|---|
| 1 | 👵 סבתא | "מה זה X בכלליות?" — מטפורה יומיומית | מטפורות מוטעות אחרות |
| 2 | 🧒 ילד | "X משמש ל...?" | תפקידים אחרים מתחום קרוב |
| 3 | 🪖 חייל | זיהוי בקוד פשוט | מתודות דומות באותה משפחה |
| 4 | 🎓 סטודנט | מדוע / איך / מתי | תפיסות שגויות שכיחות |
| 5 | 💻 ג'וניור | חיזוי תוצאה / debug | שגיאות שמתכנת מתחיל עושה |
| 6 | 🔬 פרופ' | פרטים פנימיים (Event Loop, V8, immutability) | פרטים סמויים מוטעים |

לכל מושג צריך לפחות שאלת `MC` אחת בכל אחת מ-6 הרמות → **6 שאלות מינימום**, אבל נסתפק ביעד 3 (אחד לכל זוג רמות 1-2 / 3-4 / 5-6).

---

## 4. תוכנית פאזות

### פאזה 1 — Core Foundation (שבוע 1) · יעד: 100% כיסוי לשיעורים 11+13
המושגים הבסיסיים ביותר. `lesson_11` (Array, map, filter, reduce, push/pop, spread, arrow function...) ו-`lesson_13` (DOM, getElementById, querySelector, addEventListener, localStorage...).
**60 מושגים → 180 MC + 120 Fill = 300 שאלות**.

### פאזה 2 — Async & Backend (שבוע 2) · יעד: 100% ל-15, 16, 17, 18
שגיאות, Promise, fetch, async/await, Express, REST, middleware, MongoDB.
**95 מושגים → 285 MC + 190 Fill**.

### פאזה 3 — React Core (שבוע 3) · יעד: 100% ל-21, 22, 23, 24
JSX, props, useState, immutability, useEffect, useRef, useMemo.
**79 מושגים → 237 MC + 158 Fill**.

### פאזה 4 — Advanced (שבוע 4) · יעד: 100% ל-12, 19, 20, 25, 26, 27
Array methods עומק, Node fs, MongoDB, Router, Context, TypeScript.
**164 מושגים → 492 MC + 328 Fill**.

### פאזה 5 — Workbooks (שבוע 5) · יעד: 100% למודולים הרוחביים
TaskManager, AI Development, React Blueprint.
**34 מושגים → 102 MC + 68 Fill**.

---

## 5. סדר עדיפויות בתוך כל פאזה

לכל מושג יש "ערך לימודי" שמתבטא בכמה הוא:

1. **קשור לעוד מושגים** (למשל `useState` חיוני להבנת `useEffect`)
2. **שכיח בריאיונות עבודה / צה"ל / מבחנים**
3. **טעות נפוצה אצל מתחילים** (immutability, scope, async)

המושגים הבאים מקבלים עדיפות עליונה (📌 priority list):

```
lesson_11: Array, Index, map, filter, reduce, spread, arrow function, scope, By Reference, By Value
lesson_13: DOM, getElementById, querySelector, addEventListener, innerHTML, localStorage, JSON.stringify
lesson_15: try, catch, throw, Closure
lesson_16: Promise, async, await, fetch, then, catch
lesson_17: GET, POST, PUT, DELETE, Route, Middleware, Status Code, REST
lesson_20: Schema, Model, find, insertOne, Document, Collection
lesson_22: useState, Hook, immutability
lesson_24: useEffect, dependency array, useRef, useMemo
lesson_25: BrowserRouter, Routes, Route, Link, useNavigate, useParams
lesson_26: createContext, Provider, useContext
lesson_27: type, interface, enum, string, number, boolean, void
```

---

## 6. כללי עבודה (Conventions)

### מבנה רשומה ב-`data/questions_bank.js`

```js
// MC
{
  id: "mc_<topicShort>_<NNN>",      // מזהה ייחודי
  topicId: "topic_<topicShort>",     // לקישור למדריך מקוצר
  conceptKey: "lesson_X::ConceptName", // ⚠ חובה למפות לרמה
  level: 1..6,                        // קושי
  question: "...",                    // טקסט עם \n אם צריך
  options: ["...", "...", "...", "..."],  // 4 אופציות
  correctIndex: 0..3,
  explanation: "..."                  // יוצג בפידבק
}

// Fill
{
  id: "fill_<topicShort>_<NNN>",
  topicId: "topic_<topicShort>",
  conceptKey: "lesson_X::ConceptName",
  level: 1..6,
  code: "...____...",                 // השתמש ב-____ למקום שצריך להשלים
  answer: "map",                      // צריך להיות ייחודי בקוד
  hint: "מתודה ש...",
  explanation: "..."
}
```

### `conceptKey` חייב להיות תואם בדיוק
מפתח התוצאה הוא `${lesson.id}::${concept.conceptName}` כמו שמופיע בקובץ הנתונים (case-sensitive, רווחים נכללים). דוגמה: `"lesson_11::arrow function"`.

### Distractors איכותיים
- **3** distractors בכל MC (סה"כ 4 אופציות)
- כל distractor חייב להיות *סביר* — תפיסה שגויה אופיינית ולא נונסנס
- אסור distractor שזהה תוכנית לתשובה הנכונה
- אסור שני אופציות שאומרות אותו דבר במילים שונות

### Code Fill — בחירת הטוקן
- מומלץ שהטוקן יהיה השם של המושג (אם מופיע בקוד)
- אורך התשובה: **2-18 תווים**
- חייב להופיע פעם אחת בלבד בקוד (אחרת השוואה לא חד-משמעית)

---

## 7. אוטומציה — איך מייצרים מהר

### שלב A — סקריפט המייצר seed שאלות אוטומטית
ב-`app.js` כבר קיים מנוע `buildQuestion` שמייצר MC ו-fill דינמית. אפשר להריץ אותו offline על כל מושג, להציל את התוצאה ל-JSON, ולעבור עליה ידנית לליטוש איכות.

### שלב B — שימוש ב-LLM בעקבות תבנית קבועה
פרומפט מומלץ למודל:
```
Generate 3 multiple-choice questions and 2 code-completion questions for the JavaScript/React concept "<conceptName>".
Use the following definition: "<level-junior explanation>".
Code example: <codeExample>
For each MC: 4 options, level 1-6, plausible distractors.
For each fill: blank one meaningful token (the concept name itself if possible).
Output as a JS object matching the bank schema.
```

### שלב C — סקריפט וולידציה
לפני merge — לוודא:
- כל `conceptKey` קיים בנתונים
- `correctIndex` בין 0-3
- `answer` של fill מופיע בדיוק פעם אחת ב-`code`
- אין IDs כפולים

### שלב D — Coverage Dashboard
מצב הכיסוי כבר נחשף ב-UI: במפת הידע, ליד כל מושג, יש תגי `🅰️ N` ו-`✍️ M`. **הסטטוס "0" צבוע אפור** — סימן ויזואלי שזהו מושג שעוד לא כוסה. אפשר לסנן לפי "❓ לא נבחנו" כדי לראות בדיוק את החסרים.

---

## 8. KPIs להצלחה

| KPI | יעד | מדידה |
|---|---|---|
| כיסוי MC | ≥ 3 לכל מושג | `bankCountsFor` ≥ 3 בכל 434 |
| כיסוי Fill | ≥ 2 לכל מושג שיש לו `codeExample` | `bankCountsFor` ≥ 2 |
| איכות (False positives) | ≤ 2% | המושג עולה רמה למרות שהמשתמש לא הבין |
| מגוון רמות | ≥ 1 שאלה ברמה 1, 1 ברמה 3-4, 1 ברמה 5-6 | scan ידני |
| זמן תגובה ממוצע | < 30 שניות לשאלה | metric בעתיד |

---

## 9. Definition of Done לכל פאזה

✅ כל המושגים בפאזה מקבלים ≥3 MC ו-≥2 Fill
✅ ריצת סקריפט הוולידציה ללא שגיאות
✅ סבב QA ידני: עברתי על 10% מהשאלות והן הגיוניות
✅ הוספת הפאזה ל-`questions_bank.js` ו-בדיקה שאין שבירת JSON
✅ צילום מסך ממפת הידע — אין יותר מושגים עם 🅰️ 0 ✍️ 0 בתוך הפאזה

---

## 10. Roadmap זמני (אופציונלי)

| חודש | פאזות | תוצר |
|---|---|---|
| חודש 1 | פאזה 1+2 | 600 שאלות, JS+Backend מכוסים |
| חודש 2 | פאזה 3+4 | +730 שאלות, React+TS מכוסים |
| חודש 3 | פאזה 5 + פוליש | +170 שאלות, וולידציה מלאה |

**יעד סופי:** מאגר של **2,170 שאלות איכותיות**, שמכסות 100% מהמושגים, ומאפשרות לתלמיד להגיע לרמה 7 (מאסטר) בכל מושג בלי שאלות שנוצרות אוטומטית.

---

## 11. נספח מוזיאון — חומרים חסרים להשלמה

> **סטטוס סוף יום 2026-04-28:** המוזיאון כבר קיבל שערים, אגפים, דפי שכבות, Full-Stack, מוצר, טעויות, חוזים, Video Studio, דרכון תלמיד, ואגף AI מורחב. הרשימה כאן היא backlog תוכן/חוויה להשלמה בהמשך, בלי להוסיף עובדות לא מבוססות ובלי שימוש ב-`Math.random()`.

### 11.1 חומרים חסרים ברמת תוכן ומקורות

| עדיפות | חומר חסר | מה צריך להשלים | למה זה חשוב |
|---|---|---|---|
| P0 | מקור לכל טענה היסטורית | לכל שנה/ראשון/התפתחות להוסיף מקור או ניסוח מסויג | לא לנעול במוזיאון עובדות לא מדויקות |
| P0 | הבחנה בין "ראשון" לפי הקשר | AI, מודל מסחרי, מודל מקומי, שפה, framework, runtime | למנוע בלבול בין קטגוריות שונות |
| P0 | מילון מושגים אחיד | אותו ניסוח ל-model, agent, workflow, RAG, runtime, framework, API, schema | לשמור עקביות בין אגפים |
| P1 | מפת מקורות גלויה | אזור Sources לכל אגף, לא רק אגף AI | תלמיד צריך להבין על מה החומר נשען |
| P1 | שאלות בדיקה לכל אולם | 1-3 שאלות הבנה קצרות לכל אולם ותת-אולם | להפוך צפייה ללמידה פעילה |
| P2 | גרסאות "לפני מבחן" | תקציר קצר לכל אולם: מה לזכור, מה מבלבל, טעות נפוצה | שימוש מהיר לפני בחינה |

### 11.2 אגף שכבות המחשב — חסרים לפי בלוק

| בלוק | חסר להשלים | חוויה חסרה |
|---|---|---|
| חשמל | הרחבת טרנזיסטור, שערים לוגיים, מתח/זרם/אות | סימולטור מתג שמראה 0/1 ו-flow לפעולה |
| ביט / Byte | ייצוג מספרים, תווים, encoding, overflow בסיסי | ממיר ביטים דטרמיניסטי עם מצב "מה השתנה" |
| קוד מכונה | opcode, register, memory, instruction cycle | X-Ray של פקודה אחת עד שינוי בזיכרון |
| שפה | syntax, compiler/interpreter, runtime, GC | תרשים "מה קורה ל-JS לפני שהוא רץ" |
| Framework | למה נוצר framework ומה הוא מסתיר | השוואת vanilla JS מול React/Node/Next באותה פעולה |
| אפליקציה | מסך, נתונים, פעולה, state, persistence | מסלול לחיצה אחת מה-UI עד DB וחזרה |

### 11.3 מוזיאון שפות התכנות — חומרים חסרים

1. להשלים כרטיס לכל שפה/תחנה בשושלות: מה הבעיה שפתרה, מה המחיר, לאן התפתחה, ומה נשאר ממנה היום.
2. להוסיף השוואות קצרות: `C` מול `Rust`, `JavaScript` מול `TypeScript`, `React` מול vanilla DOM, `SQL` מול document DB.
3. להוסיף "חדר פשרות": מהירות, שליטה, בטיחות, קריאות, ניידות ופרודוקטיביות.
4. להוסיף דוגמאות קוד קטנות לכל משפחת שפות, רק מתוך חומר שמאומת או חומר קורס.
5. להוסיף מסלול "איך שפה הופכת ל-framework ואז למוצר".

### 11.4 אגף Full-Stack — חומרים חסרים לפי תחום מקצועי

| תחום | חומרים חסרים | תוצר נדרש |
|---|---|---|
| UI / HTML / CSS | semantic HTML, layout, responsive, accessibility, states | אולם UI עם before/after ותרשים DOM |
| Browser Runtime | event loop, DOM update, storage, rendering | סימולטור פעולה בדפדפן |
| Async / Network | promise, fetch, HTTP lifecycle, loading/error states | תרשים request/response מלא |
| Node / npm / modules | package, module, filesystem, environment | אולם "מה קורה כשמריצים npm" |
| API / HTTP / Express | route, middleware, status code, validation, auth boundary | Contract map בין client ל-server |
| Database / MongoDB / Mongoose | schema, collection, document, query, index | תצוגת נתון מה-input עד document |
| React Product | component, props, state, hooks, router, context | מפה של product state לפי feature |
| Quality / Tests / AI Review | unit, integration, smoke, regression, review | מסלול "מה נשבר לפני release" |

### 11.5 אגף מוצר מרעיון להשקה — חומרים חסרים

1. **לפני פיתוח:** תבניות לבעיה, קהל יעד, KPI, scope, wireframe, data model, risk list.
2. **בזמן פיתוח:** פירוט חלוקת עבודה בין Product, UX, Frontend, Backend, Data, QA.
3. **לפני השקה:** checklist ל-build, נגישות, performance, תוכן, שגיאות, security בסיסי.
4. **בזמן השקה:** rollout, ניטור, support, error budget, analytics, feedback loop.
5. **אחרי השקה:** triage באגים, החלטת גרסה, debt, telemetry, שיפור UX.
6. **שדרוג/החלפה:** להפוך את הקריטריונים לכרטיסי החלטה עם דוגמאות מוצריות.

### 11.6 אגף טעויות ו-Debug — חומרים חסרים

| סוג טעות | חסר להשלים |
|---|---|
| Syntax | דוגמאות נפוצות לפי JS/React + סימן זיהוי |
| Runtime | `undefined`, null, reference, type mismatch |
| Scope / Closure | דוגמאות קצרות של משתנה שלא קיים במקום הצפוי |
| Async | race, missing await, promise rejection, loading state |
| React State | mutation, stale state, derived state, dependency array |
| API | 400/401/404/500, CORS, body חסר, endpoint לא נכון |
| Database | schema mismatch, missing field, query לא מחזיר, persistence |
| Release | build failure, env חסר, regression, performance |

### 11.7 אגף חוזים ונתונים — חומרים חסרים

1. להשלים "חוזה" לכל שכבה: function input/output, component props, API body/response, DB schema, validation rules.
2. להוסיף דוגמאות של חוזה שנשבר ומה הסימפטום.
3. להוסיף טבלת "מי הבעלים של החוזה": Frontend, Backend, Database, Product, QA.
4. להוסיף מסלול נתון אחד: input → validation → state → JSON → API → DB → response → render.
5. להוסיף בדיקות חוזה: unit, integration, schema validation, smoke.

### 11.8 אגף AI — חומרים חסרים להמשך

1. להרחיב את גרף ההתפתחות גם ל-RAG, embeddings, vector DB, multimodal, evals ו-guardrails.
2. להוסיף חדר "איך LLM עונה": tokens, context window, attention, inference, hallucination.
3. להוסיף חדר "איך בונים פיצ'ר AI במוצר": prompt, sources, policy, tools, logs, evals.
4. להוסיף הבחנה בין local model, open weights, open source, hosted API ו-commercial product.
5. להוסיף דוגמאות שימוש בקורס: סיכום שיעור, debug, שאלות, בדיקת פתרון, יצירת פרומפט.
6. להשלים טבלת סיכונים: מידע שגוי, פרטיות, הרשאות, עלות, latency, bias.

### 11.9 Video Studio ו-NotebookLM — חומרים חסרים

1. לעבור על כל 63 הסרטונים ולוודא שלכל אחד יש חומר רקע, ידע מקדים, סקריפט, פרומפט והוראות NotebookLM.
2. לוודא שכל כפתור "פתח חומר לסרטון" פותח חלון מתאים באולם הנכון.
3. להוסיף מסלולי סרטונים מסכמים: "לפני מבחן", "Full-Stack end-to-end", "Debug", "AI במוצר".
4. להוסיף שדה "מה התלמיד צריך לענות אחרי הצפייה".
5. להוסיף QA שאין במסמכי הסרטונים תאריכים או טענות שלא מופיעים בקוד/מקורות.

### 11.10 דרכון תלמיד ומסלולי ביקור — חומרים חסרים

| רכיב | חסר להשלים |
|---|---|
| חותמות ביקור | לכל אולם: משימת הבנה + שאלה + תוצר קצר |
| מסלול מתחילים | סדר ביקור פשוט: שכבות → שפה → UI → API → DB |
| מסלול לפני מבחן | רק מושגים, טעויות, שאלות בדיקה וסרטונים קצרים |
| מסלול בניית מוצר | רעיון → UI → API → DB → Tests → Launch |
| מסלול Debug | symptom → layer → contract → fix → test |
| React / Full-Stack | state → component → router → API → DB → release |

### 11.11 חיבורים חסרים בין כל חלקי הפורטל

1. מכל אולם לשיעורים הרלוונטיים.
2. מכל טעות לאולם השורש שמסביר אותה.
3. מכל מושג לבלוק קוד, שאלה, סרטון, ותרגול.
4. מכל תחום Full-Stack לשלב מוצר ולבעל תפקיד בצוות.
5. מכל סרטון לידע מקדים, שאלת בדיקה ותעודת דרכון.
6. מכל חוזה טכני לטעות שנוצרת כשהוא נשבר.

### 11.12 QA ונגישות שחסרים לפני סגירת המוזיאון

| תחום | בדיקה חסרה |
|---|---|
| RTL | כל הכותרות, הטבלאות והתרשימים במובייל |
| Mobile | אין טקסט חורג ואין כרטיסים שנמעכים |
| Keyboard | טאבים, מודלים, כפתורים ומסלולי ביקור נגישים במקלדת |
| Reduced motion | כל animation נעצרת או מצטמצמת |
| Data tests | לכל אגף route, goal, video, diagram ושדות לא ריקים |
| Visual QA | screenshot ידני לכל אגף מרכזי |
| Build/Test | `node --check app.js`, `npm run build`, בדיקת מוזיאון ממוקדת, ואחר כך `npm test` |

### 11.13 סדר עבודה מומלץ להמשך

1. **P0 — Content Safety:** מקור לכל טענה היסטורית וניסוח מסויג לכל "ראשון".
2. **P0 — Cross Links:** לחבר כל אולם לשיעור, שאלה, סרטון ודרכון.
3. **P1 — Full-Stack Depth:** להשלים אולמות עומק לכל תחום מקצועי.
4. **P1 — Debug + Contracts:** להפוך טעויות וחוזים למערכת ניווט אחת.
5. **P1 — Video QA:** לוודא שכל 63 הסרטונים שלמים ומחוברים לחלונות במוזיאון.
6. **P2 — Simulators:** להוסיף סימולטור קטן ודטרמיניסטי לכל שכבה.
7. **P2 — Polish:** בדיקות מובייל, RTL, reduced motion וצילומי מסך.
8. **P2 — Release:** לעדכן גרסה, changelog, ולסגור בדיקות.

---

## נספח — קובץ ייצוא ל-JSON נטו (לצורכי עריכה חיצונית)

הקובץ `data/questions_bank.js` הוא JS module. אם תרצה לערוך ב-VS Code עם תמיכת JSON שלמה, הפק קובץ `.json` נטו:

```bash
node -e "console.log(JSON.stringify(require('./data/questions_bank.js'), null, 2))" > questions_bank.json
```

(כרגע המודול חושף `var QUESTIONS_BANK` שטעון בדפדפן; להפיק JSON נטו תחילה יש להמיר ל-`module.exports`).
