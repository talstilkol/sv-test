SYSTEM:
You are Qwen3-Coder-Next acting as a bug-recognition trainer for SVCollege FullStack. Return Hebrew output. Use evidence discipline.

TASK:
Create 20 recognition drills. Each drill gives a short flawed claim, flawed code snippet, or flawed exam decision. The student must identify the bug. Cover: overconfident probability claims, invented requirements, allowed vs forbidden prep, missing BrowserRouter, hardcoded API URL, missing express.json/cors, missing backend validation, missing uniqueness, wrong status code, missing index.html/package.json, weak JS input validation, weak TS typing. For each drill include hidden answer and exact correction.

WEAKNESS POLICY:
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



RUBRIC:
### 📝 **מפתח תשובות וסוכת דירוג מדויקת – SVCollege FullStack Stage 2 (מתקדם)**  
**סוכת ניקוד: 100 נק' | משך המבחן: 60 דקות | דרישה מינימלית לביה"ס: 75 נק' (pass)**  

---

## 🔑 **אקריטריון לניקוד מדויק – לפי קבוצה של 8 שאלות כלשהן**

### 🧪 **חלק 1: Allowed / Forbidden – prep & evidence discipline (שאלות 1–8)**  
#### ✅ **תבנית תשובה מלאה (10 נק' — יש לספק both: תשובה + מקורות)**  
> **[""][האם מותר/לא מותר]** + **[סיבה מדויקת לפי source רשמי]**  
> דוגמה (שאלה 5):  
> ✅ "כן. ב-CORS checklist: `app.use(cors(...))` **לפני** `express.json()` (Checklist Section: Backend Order, Template: `backend/index.js`)".

#### ⚠️ **הסבירות חלקייה (5 נק')**  
- תשובת "כן/לא" נכונה, אך **ההוכחה חלשה או לא מדויקת** (למשל: מציין "ב-CORS checklist" ללא התייחס ל-SV Appointments / Template).  
- תשובה שגויה עם הסבר *חלקי* (למשל: "לא יודע אם יש דרישה סדורה, אבל ב-CORS checklists רואים סדר חשובה").

#### ❌ **אפס נקודות – שגיאות חמורה או אלוצינציה**  
| טריגר | דוגמה | הסבר |
|-------|--------|------|
| **אילוצין** | "/storage מופיע ב-CORS checklist" | CORS checklist לא מזכיר storage |
| **הוכחת שגיאה כנכונה** | "לא חובה – CORS יכול להיות אחרי express.json. ב-Express זה לא חשוב" | **הוכחה חמורה:** שגיאה ב-CORS order פוגעת ב-cors_headers |
| **התייחסות ל-source לא קיים** | "לפי React Template, שומרים ב-`localStorage`" | **אין source כזה – חסימה немידית** |
| **איסור חכם** | "ההסכמה של המרצה קובעת" | **רק source רשמי (Checklist/Template/Simulation) חוסך** |

#### ⚠️ **אילוצין – הוראות חיסכון**  
- **אם המבחן מבקש הוכחה לפי source רשמי – לא מותר להתייחס ל-"נפוץ", "הסכמה", או "elogic" חיצוני**.  
- **אילוצין = 0 נק' – חסימת שאלה מלאה**.

---

### 🧩 **חלק 2: React (שאלות 9–16)**  
#### ✅ **תבנית תשובה מלאה (10 נק' — יש לספק both: תשובה + מקורות)**  
> **[""][תשובה מדויקת] + [source מדויק: section/file/simulation]**  
> דוגמה (שאלה 13):  
> ✅ "`value={form.name} + onChange שמעדכן את ה-state – controlled form. לא `defaultValue`. (Master Source – React Template, Controlled Forms Section)"

#### ⚠️ **הסבירות חלקייה (5 נק')**  
- תשובה נכונה, אך **ההוכחה חלשה**:  
  - "ב-template יש controlled form" (ללא ציון שם קובץ או סעיף).  
  - "נפוץ להתחילcontrolled form" (לא הראה source רשמי).

#### ❌ **אפס נקודות – שגיאות חמורה**  
| טריגר | דוגמה | הסבר |
|-------|--------|------|
| **הסתייגות מ-Controlled Form** | "`defaultValue` מספיקה" | **אסור – Controlled Form דרישה חובה (Checklist)** |
| **תגובה ל-`e.preventDefault()` כלא נחוצה** | "React קובע את זה אוטומטית" | **איסור חמור – `e.preventDefault()` דרישה (Rubric – -5 אם חסר)** |
| **תגובה שגויה ל-`useEffect` dependency** | "[items] – מומלץ לעדכון" | **איסור חמור – לולאה אינסופית – לא ב-template** |

#### ⚠️ **אילוצין – הוראות חיסכון**  
- אם התשובה היא `[]`, יש לציין: **"ב-template: `useEffect(..., [])`"** – אם לא – חצי ניקוד.  
- כל דרישה ב-React חייבת להתייחס **ל-template רשמי**.

---

### 🗄️ **חלק 3: Express + MongoDB (שאלות 17–24)**  
#### ✅ **תבנית תשובה מלאה (10 נק' — יש לספק both: תשובה + source)**  
> דוגמה (שאלה 21):  
> ✅ "`req.body` זמין רק עם `express.json()` – ב-template: `backend/index.js` (Middleware Setup)".  

#### ⚠️ **הסבירות חלקייה (5 נק')**  
- תשובת "נפוץ" או "במערכת יש" – بدون ציון source רשמי.  
- תשובת "400" (בשאלה 24) – **לא מדויק**: צריך `404 Not Found`, לא `400`.

#### ❌ **אפס נקודות – שגיאות חמורה**  
| טריגר | דוגמה | הסבר |
|-------|--------|------|
| **CORS אחרי `express.json()`** | "ترتيب לא חשוב – works either way" | **איסור חמור – CORS חייב להיות לפני (Checklist, CORS Order)** |
| **תתמוך על unique index בלבד** | "ה-unique index שומט את הכפילויות" | **אסור – דרישה ב-code: `findOne` (Rubric: -10 אם חסר)** |
| **state status שגוי** | "400 ל-not found" | **ההפרעה ל-status codes – 404 ל-not found (Master Source)** |

#### ⚠️ **אילוצין – הוראות חיסכון**  
- אם לא צוין **`app.use(cors())` לפני `express.json()`** – 0 נק'.  
- כל status code חייב להתייחס ל-source (Master Source, section: Status Codes).

---

### 🛡️ **חלק 4: Validations (שאלות 25–32)**  
#### ✅ **תבנית תשובה מלאה (10 נק' — יש לספק both: regex/loop + source)**  
> דוגמה (שאלה 26):  
> ✅ "`req.body.password === req.body.confirmPassword` (SV Appointments Checklist – שורה 14)".  

#### ⚠️ **הסבירות חלקייה (5 נק')**  
- regex שגוי ב-regex (למשל: `/^[A-Z]+$/` instead of `/^[A-Z][a-z]+$/`) – **אך עם הסבר על אורך מינימלי**.  
- תשובת "כן/לא" מדויקת, אך חסרת source (למשל: " חובה – נפוץ במבחנים" – **לא מספיקה**).

#### ❌ **אפס נקודות – שגיאות חמורה**  
| טריגר | דוגמה | הסבר |
|-------|--------|------|
| **hash comparison ל-confirm password** | "hash(password) === confirmPassword" | **איסור חמור – confirm password *לא* מוצפן (Source: SV Appointments)** |
| **frontend validation alone** | "Frontend מספיקה – backend לא נחוץ" | **איסור חמור – דרישה זוגית (Source: Master Source, Validations)** |

#### ⚠️ **אילוצין – הוראות חיסכון**  
- regex חייב להתייחס ל-source: "לפי Master Source – username: `/^[a-z]+$/`".  
- כל תבנית regex חייבת להיווצר **ב-source רשמי** – אם לא, חצי ניקוד.

---

### 🔤 **חלק 5: JavaScript (שאלות 33–36)**  
#### ✅ **תבנית תשובה מלאה (10 נק' — יש לספק both: code + source)**  
> דוגמה (שאלה 33):  
> ✅ "`if (!Array.isArray(arr)) throw new Error(...)` – ב-JS Checklist, Example 1".

#### ⚠️ **הסבירות חלקייה (5 נק')**  
- "typeof !== 'object'" – תשובת שגיאה, אבל עם הסבר על null.  
- תשובת שגיאה ב-template, אבל עם ניסיון להצדיק.

#### ❌ **אפס נקודות – שגיאות חמורה**  
| טריגר | דוגמה | הסבר |
|-------|--------|------|
| **לא זורק שגיאה** | "return false – חוסם את השגיאה" | **איסור חמור – דרישה זורק שגיאה (JS Checklist)** |
| **Array.isArray לא מוזכר** | "typeof arr === 'object'" | **איסור חמור – `Array.isArray` דרישה במפורש** |

#### ⚠️ **אילוצין – הוראות חיסכון**  
- אם לא מוזכר `throw new Error(...)` – **0 נק'**, גם אם הקוד תקין.

---

### 📘 **חלק 6: TypeScript (שאלות 37–40)**  
#### ✅ **תבנית תשובה מלאה (10 נק' — יש לספק both: code + source)**  
> דוגמה (שאלה 38):  
> ✅ "`function filterPlayers(players: Player[], filters: Partial<Player>)` – ב-TypeScript Checklist (Partial for Filters)".

#### ⚠️ **הסבירות חלקייה (5 נק')**  
- interface Without `inLineup: boolean` – **חוסר דוגמה מדויקת**.  
- `type guard` بدون `obj is Player` – תשובת חלקייה.

#### ❌ **אפס נקודות – שגיאות חמורה**  
| טריגר | דוגמה | הסבר |
|-------|--------|------|
| `type Player = any` | "type Player = any" | **איסור חמור – אובדן typesafety – לא מופיע באף source** |
| `React.FC` לא מקומץ | "const Card = (props: Props) => ..." | **איסור חמור – דרישה ל-properties destructuring (Source: React + TS Checklist)** |

#### ⚠️ **אילוצין – הוראות חיסכון**  
- כל interface חייב להתייחס ל-source (Master Source – TypeScript Section).  
- אם לא נמצאה דוגמה מדויקת – **0 נק'**.

---

## 🧾 **-policy סופית: Pass/Fail + דיאגnostics**

### ✅ **העקרונות לPass/Fail (לפי ניקוד סופי)**  
| ניקוד | מעבר | הערות |
|-------|------|--------|
| **≥75** | **Pass** | מודל הבנה ב-85%+, הוכחות מדויקות. |
| **65–74** | **Conditional Pass** | 2–3 שגיאות קלות, אך יש הבנה. |
| **<65** | **Fail** | 4+ שגיאות, אלוצינציות, חוסר הוכחות. |

> **הערה חשובה:**  
> **כל אלוצינציה (העתקת מקורות לא קיימים) → 0 נק' על השאלה + ניקוד שלילית על השאלה הבאה.**  
> **כל שגיאה חמורה (כגון `localStorage required`) → -5 נק' סה"כ.**

---

### 🔍 **טבלת تشخيص_weaknesses (mapping wrong answers to drills)**  
| מס' שאלה | תשובה שגויה נפוצה | weakness מודדת | drill מומלץ |根源 source |
|---------|------------------|----------------|-------------|-------------|
| 1, 2, 4, 6, 7, 8 | `localStorage required`, `error boundaries required`, `state mutation validation` | **Overconfidence bias** – חוסר הבחנה בין *bonus* ו-*required* | **Correction Drill (1)** – תבנית: *לא מופיע ב-source = forbidden* | Master Source – Cleanup Notes |
| 11, 14 | שכפול קומפוננטות, `useSearchParams` במקום `useParams` | **Pattern confusion** – חוסר הבנת דרישה להחלפת קומפוננטות | **React Drill 2 – Component Refactoring** | React Checklist – "No duplication" |
| 20 | הסתמכות על `unique: true` alone | **Overreliance on DB indexes** – חוסר בדיקה ב-code | **Express Drill 3 – Uniqueness Validation** | RUBRIC – "must validate in code" |
| 28, 31 | regex לא מדויק | **Regex weakness** – חוסר הבנת depth של regex | **JS Drill 4 – Regex Patterns** | Master Source – Validation Regex Examples |
| 34, 36 | חוסר הבנה של type guard / Partial | **TypeScript pattern confusion** – חוסר הבנת Partial/Type Guard | **TS Drill 2 – Type Utilities** | TypeScript Checklist – "Partial<Entity> for filters" |
| 33, 35 | חוסר `throw new Error` | **Error handling weakness** – חוסר הבנת תבנית של JS validation | **JS Drill 1 – Validation Patterns** | JS Checklist – "throw Error for invalid input" |
| 25, 26, 29, 30 | validation frontend alone | **Validation misunderstanding** – חוסר הבנת דרישה זוגית | **Validation Drill 1 – Dual-Side Validation** | SV Appointments Checklist – "confirm password: frontend + backend" |

---

## 📌 **הנחיות סופיות לממ"ן / מרצה**  
- **כל תשובה עלולה לפסול את כל המבחן אם יש בה אלוצינציה.**  
- **לכל תשובה יש להicky source – Checklist, Template, Simulation, RUBRIC.**  
- **אם אין source רשמי – לא לכתוב "חובה", "חייב", אלא: *non-mandatory*, *bonus*, או *not found in source*.**  
- **אסור לשלב "נפוץ", "נראה", "הסכמה" – רק source רשמי.**

> **"הסבירות נקבעה על סמך חזרות במבחנים, אך רק מה שרשום ב-source רשמי (Checklist, Templates, Simulations) הוא חובה – ост ост הוא bonus."**  
> — SVCollege FullStack Exam NotebookLM Source, Section 0.1  
> ✅ **Stage 1 fully corrected. Stage 2 ready.**

---  
**👨‍🏫 Qwen3-Coder-Next – strict grading protocol, stage 2 v1.0**

