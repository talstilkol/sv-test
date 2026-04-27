# Master Plan — בניית מאגר שאלות מלא לכל 434 המושגים

> **המטרה:** להגיע למצב שבו לכל מושג ב-19 השיעורים יש ✅ **3 שאלות אמריקניות** ו-✅ **2 שאלות השלמת קוד**, כך שהתלמיד יכול להגיע מרמה 1 (סבתא) לרמה 7 (מאסטר) בכל מושג בלי הפסקת שאלות מיוצרות אוטומטית.

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

## נספח — קובץ ייצוא ל-JSON נטו (לצורכי עריכה חיצונית)

הקובץ `data/questions_bank.js` הוא JS module. אם תרצה לערוך ב-VS Code עם תמיכת JSON שלמה, הפק קובץ `.json` נטו:

```bash
node -e "console.log(JSON.stringify(require('./data/questions_bank.js'), null, 2))" > questions_bank.json
```

(כרגע המודול חושף `var QUESTIONS_BANK` שטעון בדפדפן; להפיק JSON נטו תחילה יש להמיר ל-`module.exports`).
