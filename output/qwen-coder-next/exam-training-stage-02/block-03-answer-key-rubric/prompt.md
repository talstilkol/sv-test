SYSTEM:
You are Qwen3-Coder-Next acting as a strict grading rubric builder. Return Hebrew output. Be strict and evidence-based.

TASK:
Create a strict answer key and grading protocol for the 40-question quiz. For each section define: full-credit answer shape, partial-credit rules, zero-credit traps, and what counts as hallucination. Add a final pass/fail rule and a weakness diagnosis table mapping wrong answers to next drills.

QUIZ:
### 🧪 מבחן הבנה ותפקוד – SVCollege FullStack (Stage 2, מתקדם)  
**הנחיות:**  
- 40 שאלות סה"כ.  
- כל שאלה מכילה: שאלה, תשובה מדויקת, ניקוד, תשובה שגויה נפוצה, וחוק доказательства (Evidence Rule).  
- ניקוד כולל: 100 נק'.  
- **אסור לציין נושא כדרישה חובה אם לא מופיע במפורש ב-source רשמי (Checklist, Template, Simulation).**  
- כל הוכחה חייבת להתייחס **למקור ספציפי** – checklist, template, simulation, או דוגמה מדויקת.

---

## 📌 חלק 1: Allowed / Forbidden – prep & evidence discipline (8 שאלות)

| מס’ | שאלה | תשובה מדויקת | ניקוד | תשובה שגויה נפוצה | Evidence Rule |
|-----|------|----------------|--------|-------------------|----------------|
| 1 | האם מותר להכין trước ב-React routing (_routes_, `useNavigate`, `Link`) לפני המבחן? | ❌ לא. רק `BrowserRouter`, `Routes`, `Route` בסיסיים מותרים. routing מתקדם Forbidden. | 10 | ✅ כן, routing מלא מותר. | *Source: Master Source – "אסור: creating routing ב-fronend. רק מבנה בסיסי: `BrowserRouter, Routes, Route`".* |
| 2 | האם מותר לשים `localStorage` ב-CRUD ב-Frontend? | ❌ לא – לא מופיע באף source. אם נעשה – פסילה. | 10 | ✅ כן, שמירתlogin ב-`localStorage` מומלצת. | *Source: Correction Drill (1): `localStorage` *לא מופיע באף source* – לא נחוץ למבחן.* |
| 3 | האם `error boundaries` נחשבים חובה ב-React according to checklist? | ❌ לא. הם *bonus only* (20%). לא נבדקים אם לא מושלמים. | 10 | ✅ כן – חובה לתמוך ב-`error boundaries`. | *Source: Correction Drill (2): `error boundaries` *לא מופיע כדרישה* – רק `error/loading/empty states`.)* |
| 4 | האם `state mutation` (כגון `items.push()`) נחשב validation? | ❌ לא. לא חלק מ-validation. נוגע ל-TypeScript/React patterns. | 10 | ✅ כן – בדיקת mutation היא validation. | *Source: Correction Drill (1): הוסר מה-validation. לא מופיע ב-section של ולידציות.* |
| 5 | האם `CORS` חייב להופיע **לפני** `express.json()` ב-`index.js`? | ✅ כן. ב-CORS checklist: `app.use(cors(...))` **לפני** `express.json()`. | 10 | ❌ לא – סדר לא חשוב. | *Source: Correction Drill (4), שאלה 8: "האם CORS מופיע כדרישה לפני express.json()? → כן. ב-CORS checklist".* |
| 6 | האם מותר להכין מראש endpoint `POST /api/team/:teamName/addPlayer`? | ❌ לא. מותר רק endpoint `GET` בסיסי (hello world). | 10 | ✅ כן – מותר להכין endpoint POST אם הוא נפוץ. | *Source: Master Source – "אסור: אנדפוינטים מעבר ל-GET בסיסי (hello world)".* |
| 7 | האם `Confirm Password` הוא דרישה זוגית (frontend + backend) ב-SV Appointments? | ✅ כן. מופיע במפורש כדרישה קריטית. | 10 | ❌ לא – רק frontend. | *Source: Correction Drill (4), שאלה 9: "האם Confirm Password מופיע כדרישה זוגית? → כן. ב-SV Appointments".* |
| 8 | האם `type guard` (`isValidPlayer`) הוא דרישה חובה ב-SV Volunteer according to checklist? | ❌ לא. *85% נפוץ* – לא חובה. | 10 | ✅ כן – חובה. | *Source: Correction Drill (4), שאלה 12: "האם `type guard` מופיע כדרישה? → כן, *נפוץ אך לא חובה: 85%*. לא נבדקים אם לא מושלם."* |

---

## 🧩 חלק 2: React (8 שאלות)

| מס’ | שאלה | תשובה מדויקת | ניקוד | תשובה שגויה נפוצה | Evidence Rule |
|-----|------|----------------|--------|-------------------|----------------|
| 9 | מה ה-`dependency array` הנכון ל-`useEffect` שטוען רשימה מ-`/api/items`? | `[]` (ללא תלויות) – טעינה פעם אחת על render ראשוני. | 10 | `[items]` – לולאה אינסופית. | *Source: Master Source – React Template: `useEffect(() => { ... fetch }, []);`* |
| 10 | איך מציינים `error` ו-`loading` status ב-React? | `useState` בודד לא מספק – יש לשלב בין `loading`, `error`, `data`. לא חובה: `error boundary`. | 10 | `error boundaries` חובה. | *Source: Correction Drill (2): `error/loading/empty states` הם דרישה – לא `error boundaries`.* |
| 11 | האם יש לקבוץ `Add` ו-`Edit` בקומפוננטה משותפת? | ✅ כן – חובה. שיבוט קומפוננטות = -5 נק'. | 10 | ❌ לא – מותר לשכפל. | *Source: Master Source – "קומפוננטה משותפת ל-Add/Edit (לא שכפול)" – דרישה. ב-RUBRIC: -5 על שכפול.* |
| 12 | איך יתכן `navigate("/home")` *אחרי* שליחה מוצלחת? | `useNavigate()` מחוץ ל-`async`, `await handleSubmit`, `if (res.ok) navigate("/home")`. | 10 | `navigate` בתוך `try/catch` (לא אחרי `await`). | *Source: Correction Drill (4), שאלה 11: "האם `useNavigate` אחרי הצלחה מופיע כדרישה? → כן."* |
| 13 | איך מטפלים בערכים ריקים בטופס ב-Controlled Form? | `value={form.name}` + `onChange` שמעדכן state. *לא* `defaultValue`. | 10 | `defaultValue` – לא מתחדש על render. | *Source: Master Source – "controlled forms" – דרישה מפורשת.* |
| 14 | מה תפקידה של `useParams`? | קבלת route param כמו `teamName` מ-`/team/:teamName`. | 10 | קבלת query params (השתמש ב-`useSearchParams`). | *Source: Master Source – React Checklist: `useParams` חובה אם routing דינמי.* |
| 15 | מהו `VITE_API_URL`? | Variable מה-`.env` של ה-Frontend – מוגדר כ-`http://localhost:5000`. | 10 | Environment variable של Backend – שגיאה. | *Source: Master Source – `frontend/.env`: `VITE_API_URL=http://localhost:5000`.* |
| 16 | האם `e.preventDefault()` חובה בטופסSubmit? | ✅ כן – מונע reload דף. חוסר זה = -5 נק'. | 10 | ❌ לא נחוץ – React מטפל בזה. | *Source: RUBRIC: "שכחת `e.preventDefault()` בטופס" → -5.* |

---

## 🗄️ חלק 3: Express + MongoDB (8 שאלות)

| מס’ | שאלה | תשובה מדויקת | ניקוד | תשובה שגויה נפוצה | Evidence Rule |
|-----|------|----------------|--------|-------------------|----------------|
| 17 | היכן ממקמים `app.use(cors())`? | *לפני* כל routes, ו*לפני* `express.json()`. | 10 | אחרי `express.json()`. | *Source: Correction Drill (4), שאלה 8 + Master Source – סדר חובה.* |
| 18 | מה הסטטוס קוד הנכון ל-validation error ב-`POST`? | `400 Bad Request`. | 10 | `200 OK` עם `success: false`. | *Source: Master Source – "status codes: 400 validation, 404 not found, 500 server error".* |
| 19 | האם חובה לאתחל `mongoose.connect` עם `.then/.catch`? | ✅ כן – ב-template מופיע `.then(() => app.listen(...)).catch(err => console.log(err))`. | 10 | `await mongoose.connect(...)` – תקין אך לא ב-template. | *Source: Master Source – `backend/index.js`: `mongoose.connect(...).then(...).catch(...)`.* |
| 20 | איך בודקים uniqueness **ב-code** (לא רק unique index)? | `await Model.findOne({ field })` – אם קיים, `return res.status(400).json(...)`. | 10 | הסתמכות על `unique: true` ב-Schema alone. | *Source: RUBRIC: "בדיקות כפילויות **בקוד** (לא רק unique)" → -10 אם חסר.* |
| 21 | מה התפקید של `express.json()`? | גישה ל-`req.body` ב-JSON. Without it – `req.body` הוא `undefined`. | 10 | הפעלת CORS – שגיאה. | *Source: Master Source – "express.json() - מותקן", "בליו – POST לא עובד".* |
| 22 | מה הסדר הנכון ב-Routes ל-`POST /items/filter`? | `router.post("/filter", ...)` **לא** `router.post("/:id/filter", ...)`. | 10 | `/:id/filter` – routing דינמי שגוי. | *Source: Master Source – Template: `router.post("/filter", ...)`.* |
| 23 | האם יש לשלוח `Content-Type: application/json` ב-fetch? | ✅ כן – חובה ב-POST. | 10 | לא נחוץ – Express מ לזהה אוטומטית. | *Source: RUBRIC: "לא שולח `JSON.stringify` + headers → -5".* |
| 24 | מה ה-status code הנכון ל-`PUT` שמשנה שדה לא קיים? | `404 Not Found`. | 10 | `400` – שגיאת validation. | *Source: Master Source – status codes: `404` for not found.* |

---

## 🛡️ חלק 4: Validations (8 שאלות)

| מס’ | שאלה | תשובה מדויקת | ניקוד | תשובה שגויה נפוצה | Evidence Rule |
|-----|------|----------------|--------|-------------------|----------------|
| 25 | מה regex ל-`username` (אותיות קטנות בלבד)? | `/^[a-z]+$/`. | 10 | `/^[a-zA-Z]+$/` – לא מדויק. | *Source: Master Source – "Username - אותיות קטנות בלבד: `/^[a-z]+$/`".* |
| 26 | איך בודקים `Confirm Password` ב-backend? | בודקים `req.body.password === req.body.confirmPassword`. | 10 | בודקים `hash(password) === confirmPassword`. | *Source: Correction Drill (4), שאלה 9 + SV Appointments Checklist.* |
| 27 | האם validation ב-frontend מספיקה? | ❌ לא – חובה גם ב-backend (דרישה זוגית). | 10 | ✅ כן –Frontend מספיקה. | *Source: Master Source – "כל validation должна להופיע גם בפרונט וגם בבק".* |
| 28 | איך בודקים `name` מ composed of 2 capital words? | `/^[A-Z][a-z]+ [A-Z][a-z]+$/` (למשל "John Doe"). | 10 | `/^[A-Z]+ [A-Z]+$/` – לא בודק אורך מינימלי. | *Source: Master Source – "שם עם שתי מילים ובכל מילה אות גדולה".* |
| 29 | מה validation ל-`year` (1900-2025)? | `year >= 1900 && year <= 2025`. | 10 | `typeof year === "number"` alone – לא מספיק. | *Source: Master Source – דוגמה ל-age range.* |
| 30 | האם `enum` (כגון `genre`) חייב validation ב-backend? | ✅ כן – חובה. | 10 | ❌ לא – רק ב-Frontend. | *Source: Master Source – "Enum מוגדר" – דרישה זוגית.* |
| 31 | איך בודקים `isNumeric` (למשל age)? | `/^\d+$/.test(value)` או `!isNaN(Number(value))`. | 10 | `typeof value === "number"` alone – לא מספק for string input. | *Source: Master Source – "מספרי فقط: `/^\d+$/`".* |
| 32 | מה validation ל-`password` (8-20, uppercase, digit, special char)? | `length >= 8 && length <= 20 && /[A-Z]/.test() && /[0-9]/.test() && /[!@#$%^&*]/.test()`. | 10 | בדיקה ל-`!isNaN` alone – שגיאה. | *Source: Master Source – דוגמה מדויקת ל-password.* |

---

## 🔤 חלק 5: JavaScript (4 שאלות)

| מס’ | שאלה | תשובה מדויקת | ניקוד | תשובה שגויה נפוצה | Evidence Rule |
|-----|------|----------------|--------|-------------------|----------------|
| 33 | מה התנאי המוקדם להחזרת שגיאה ב-JS אם `{}` הוא לא מערך? | `if (!Array.isArray(arr)) throw new Error("Must be array");`. | 10 | `if (typeof arr !== "object")` – גם `null` ייחשב לא מערך. | *Source: Master Source – "Array.isArray" – דרישה במומלץ, Checklist.* |
| 34 | מה return של פונקציה שמקבלת מערך ומחזירה `{even, odd, total}`? | `{ even: number, odd: number, total: number }`. | 10 | `{ even: true, odd: false }` – טיפוס שגוי. | *Source: Master Source – דוגמה 1 (even/odd/total).* |
| 35 | איך מזהים סדרה הנדסית (ratio)? | `arr.every((v, i) => i === 0 || v / arr[i-1] === ratio)`. | 10 | `arr[i] / arr[i-1] === ratio` רק ל-i=1. | *Source: Master Source – identifySequence pattern.* |
| 36 | מה validation לביטוי `Array.isArray(full) && Array.isArray(partial)`? | `throw new Error("Both must be arrays");`. | 10 | `return false` – חסימת שגיאה, לא זורקת. | *Source: Master Source – "throw new Error" – דרישה במומלץ.* |

---

## 📘 חלק 6: TypeScript (4 שאלות)

| מס’ | שאלה | תשובה מדויקת | ניקוד | תשובה שגויה נפוצה | Evidence Rule |
|-----|------|----------------|--------|-------------------|----------------|
| 37 | איך מגדירים interface ל-`Player`? | `interface Player { name: string; age: number; goals: number; inLineup: boolean }`. | 10 | `type Player = any` – לא בטוח. | *Source: Master Source – TypeScript section: interface examples.* |
| 38 | איך מגדירים function שמחזירה `Partial<Player>`? | `function filterPlayers(players: Player[], filters: Partial<Player>): Player[]`. | 10 | `filters: any` – לא בטוח. | *Source: Master Source – "Partial<Entity> für filters/update".* |
| 39 | איך כותבים type guard ל-`Player`? | `function isValidPlayer(obj: unknown): obj is Player { ... }`. | 10 | `function isValidPlayer(obj: Player)`, חסר guard. | *Source: Correction Drill (4), שאלה 12: `85%: type guard (non-mandatory but common)`.* |
| 40 | איך מגדירים `React.FC` עם props interface? | `const Card: React.FC<{ name: string }> = ({ name }) => <div>{name}</div>`. | 10 | `const Card = (props: Props) => <div>{props.name}</div>` – לא מקומץ. | *Source: Master Source – React + TypeScript: props with destructuring.* |

---

## 📝 rubrikת דירוג (out of 100):

| ניקוד | רמת הבנה | הערות |
|-------|-----------|--------|
| **95–100** | **.master** | כל התשובות מדויקות. מקורות מוזכרים מפורשים. ניקיון ב-corrections. |
| **85–94** | **Expert** | שגיאה קטנה (1 שגיאה לא קריטית, לא לפי source). |
| **75–84** | **Proficient** | 2–3 שגיאות. תובנות על validation/CRUD but missing source-based justification. |
| **65–74** | **Developing** | 4–5 שגיאות. סימני הבנה (but not evidence-based). |
| **<65** | **Emerging** | שגיאות חמורות (למשל: `localStorage = required`, `error boundaries = must`). |

> **הערה סופית:**  
> *"הסבירות נקבעה על סמך חזרות במבחנים, אך רק מה שרשום ב-source רשמי (Checklist, Templates, Simulations) הוא חובה – ост ост הוא bonus."*  
> — SVCollege FullStack Exam NotebookLM Source, Section 0.1

**✅ Stage 1 fully corrected. Stage 2 ready.**  
**⏰ Quiz duration: 60 minutes.**  
**📌 מומלץ: שים לב ל-Correction Drill – הוא הבסיס ל-evidence discipline.**



WEAKNESS REPAIR POLICY:
### 🔍Correction Drill – Stage 1 Overconfidence Fixes  
**היעוד:** לתקן טענות מופרזות, לשלב הגבלות מדויקות, ולשפר את הבנת גבולות ההוכחה.

---

#### **(1) רשימת טענות חזקות ממה שהמקור תומך בו**  
| מס’ | טענה באשכול (Stage 1) | מקורות רשמיים מתייחסים? |
|-----|------------------------|------------------------|
| 1 | סבירות 100% ל-`localStorage` (בכל המקומות) | ❌ לא מופיע באף مصدر – נמחק ב-Cleanup |
| 2 | סבירות 100% ל-`error boundaries` (React) | ❌ לא מוזכר כדרישה – רק `error/loading/empty states` מופיע |
| 3 | סבירות 100% ל-`state mutation validation` | ❌ לא מוגדר כחלק מ-validation; נמחק |
| 4 | סבירות 100% ל-`layout order validation` | ❌ לא מופיע; layout order הוא UI, לא validation |
| 5 | סבירות 100% ל-`/borrow/:id` (routing דינמי) | ❌ routing דינמי מופיע אך לא כדרישה מפורשת – רק `100%: /team/:teamName` מומלץ |
| 6 | סבירות 100% ל-`localStorage` ב-Modal (React, 70%) | ❌ localStorage לא מופיע באף مصدر – אלוצינציה |

---

#### **(2) ניסוח מתוקן – גבולות בהוכחות**  
| טענה מקורנת | ניסוח מתוקן |
|--------------|--------------|
| `localStorage` תכופת usage | *איננו מופיע בדרישות – לא נחוץ למבחן. אם используется: פסילה.* |
| `error boundaries` | `20%: error boundaries (bonus – לא חובה). לא נבדקים אם לא מושלם.` |
| `state mutation validation` | *הוסר – לא חלק מ-validation. נוגע ל-TypeScript/React patterns.* |
| `layout order validation` | *הוסר – layout order הוא עניין של UI, לא validation.* |
| `/borrow/:id` routing | `30%: routing דינמי אחר (למשל `/borrow/:id`) – לא נחוץ.` |
| `localStorage` ב-Modal | *הוסר – לא נחוץ. localStorage לא מופיע באף مصدر.* |

---

#### **(3) כלל מונע שגיאות עתידיות**  
**הכלל הזהב:**  
> **"אם אינני רואה את הביטוי במפורש ב-checklist, template, או simulation רשמי – לא מגדירים סבירות 100%, לא כותבים 'חייב'/'היא חובה', ולא מציינים כדרישה – אלא כ-'בנושאי bonus' או 'לא מופיע ב-source'."**

**הנחיות יישום:**  
- כל טענה על נושא must reference **specific source** (checklist, template, simulation)  
- אם אין פסוקית מפורשת:  
  - ✅ "נפוץ" → `60%`  
  - ✅ "zikuy be-reshimta" (במבחנים קודמים) → `50%`  
  - ❌ "ללא תיעוד" → `0%`, עם הערת *לא מופיע ב-source*  
- מונע את המילה **"חייב"** – מחליפים ב-`จำเปוני` או `מומלץ`  
- מונע אמירה על `localStorage`, `error boundaries`, `state mutation` – אלא אם מופיע במפורש ב-source

---

#### **(4) 12 שאלות אוטו-בידוק – כופפות הוכחה**  
שאלה – תשובת "כן/לא" – עם **הסיבה לפי המקור**.  
1. האם `localStorage` מופיע ב-checklist של החומר המותר למבחן?  
   → **לא**. אם התשובה היא "כן" – שגיאה.  
2. האם `error boundaries` מופיע כדרישה חובה ב-checklist של React?  
   → **לא**. רק `error/loading/empty states` נידון כדרישה.  
3. האם `state mutation validation` מופיע ב-section של ולידציות?  
   → **לא**. מופrece ב-TypeScript/React patterns – לא ב-validation.  
4. האם `layout order` מופיע כחלק מדרישות ולידציות?  
   → **לא**. layout order הוא UI – לא validation.  
5. האם `/borrow/:id` מופיע כ-routing דינמי נדרש ב-checklist?  
   → **לא**. רק `/team/:teamName` מופיע כנדרש.  
6. האם `localStorage` מופיע באף אחד מה-templates של Frontend/Backend?  
   → **לא**. אם מופיע – שגיאה.  
7. האם `throw new Error()` מופיע במפורש ב-Checklist של JS?  
   → **כן**. דוגמה מדויקת: `throw new Error("Must be array")`.  
8. האם CORS מופיע כדרישה *לפני* `express.json()` ב-Template?  
   → **כן**. ב-CORS checklist: `app.use(cors({ origin: ... }))` **לפני** `express.json()`.  
9. האם `Confirm Password` מופיע כדרישה זוגית (frontend + backend) ב-SV Appointments?  
   → **כן**. מופיע במפורש כדרישה קריטית.  
10. האם `try/catch` מופיע כדרישה בכל route ב-Checklist?  
    → **כן**. "try/catch must wrap all routes" – מופיע במפורש.  
11. האם `useNavigate` אחרי הצלחה מופיע כדרישה ב-checklist?  
    → **כן**. באשכול הביקורת: "after success → navigate".  
12. האם `type guard` (`isValidPlayer`) מופיע כדרישה ב-SV Volunteer?  
    → **כן** – מופיע כנפוץ, אבל לא חובה: `85%`.  

---

#### **(5) מדיניות קשיחה לעתיד – Qwen-Coder-Next**  
**_policy for future probability reports & mastery checks:_**  
> **1. כל טענה על סבירות ≥90% חייבת להיות מוצגת ב-**  
> - ✅ Checklist רשמי (SV Checklist)  
> - ✅ Template (backend/frontend)  
> - ✅ Simulation (SV Team Manager / SV Library / etc.)  
> **אם לא – הסבירות ≤50% או *unknown/unavailable*.**  
>  
> **2. לא מותר לציין נושא כ-**`*required*`** אלא אם מופיע במפורש ב-**`required`** או** `**must**` **ב-source.**  
>  
> **3. כל הערה על נושא ביטחוני (CORS, localStorage, error boundaries) חייבת לכלול:**  
> - ✔️ האם הוא *מופיע ב-checklist*?  
> - ✔️ האם הוא *נמצא ב-template*?  
> - ✔️ האם הוא *ב-Simulation רשמי*?  
>  
> **4. אם לא נמצאה הוכחת נושא – תכתוב:**  
> `*not found in source – unknown/unavailable.*`  
> **ولا תffa`ה**.  
>  
> **5. ב-mastery quiz: כל שאלה צריכה含**  
> - ✔️ מקצוע מדויק (שם section, שם file, דף simulation)  
> - ✔️ ציטוט מ-source (אם אפשר)  
>  
> **6. לא מותר להשתמש במילים כמו:**  
> `should`, `might`, `could`, `often`, `usually`, `likely`, **אלא אם נמuka באשכול הביקורת**.  
> **במקום – תשתמש:**  
> ` מופיע במפורש`, ` נדרש לפי checklist`, ` מומלץ`, `_bonus only_`.  

---

**הערה סופית:**  
> **"הסבירות נקבעה על סמך חזרות במבחנים, אך רק מה שרשום ב-source רשמי (Checklist, Templates, Simulations) הוא חובה – ост ост הוא bonus."**  
> — SVCollege FullStack Exam NotebookLM Source, Section 0.1  

**Stage 1 fully corrected. Ready for Stage 2.**

