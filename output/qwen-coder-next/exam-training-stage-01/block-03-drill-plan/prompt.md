SYSTEM:
You are Qwen3-Coder-Next acting as a strict SVCollege FullStack drill planner. Use only the probability map and critic report. Return Hebrew output.

TASK:
Create the next 12 training drills from the corrected probability map. Each drill must include: title, probability band it trains, exact task, timebox, expected files or answer shape, scoring rubric, pass condition, and likely failure. Include drills for React, Express, MongoDB, validations, JS, TS and debugging. Do not include long explanations.

PROBABILITY MAP:
### מפת הסתברות לשאלות במבחן FullStack SVCollege  
*(לפי המסמך המקור: חלוקה 70/20/10 – 70 נק' פרויקט, 20 JS, 10 TS)*  
**ההסתברויות נקבעו על סמך שיאי חזרות ב-7 מבחנים קודמים**  

---

#### 📦 React  
| סבירות | מה לתרגל | מקורות באסמך |影响 | מה ייכשל | ביטחון |
|--------|-----------|----------------|-----|----------|--------|
| **100%** | `BrowserRouter`, `Routes`, `useNavigate`, `useParams`, `useState`, `useEffect`, controlled form, קומפוננטה משותפת ל-Add/Edit | Source: "React שחייב לשבת בראש", "תבניות CRUD", "דפוסי React שחייבים בעיניים עצומות" | Core – חוסר זה מונע מבחן | אין תיאטרון, טופס לא מודפס, עידכון UI לא מופעל | ✅ |
| **90%** | search + toggle, layout לפי תמונה, error/loading/empty states | Source: "דפוסי React מתקדם", " Checklistיום_before" | Critical – גורם להפחתת ציון ניכרת | Toggle לא עובד, חיפוש לא מסנן, דף ריק ב-GET | ✅ |
| **70%** | Modal/popup, select dropdown מואלס, localStorage (אם נדרש) | Source: "סבירות 70%", "BONUS: What to add for full score" |_bonus – רק אם נשאר זמן_ | Modal לא נפתח/סגור, select לא נבחר | ⚠️ |
| **40%** | React Router דינמי (`/team/:teamName`), error boundaries, animations | Source: "סבירות 40%", "בונוס – מה להוסיף לציון מלא" | Rare – לא יכשל אם חסר | Layout לא מעודכן, קובץ CSS חסר | ❓ |

---

#### ⚙️ Express + MongoDB  
| סבירות | מה לתרגל | מקורות באסמך |影响 | מה ייכשל | ביטחון |
|--------|-----------|----------------|-----|----------|--------|
| **100%** | `express.json()`, `cors`, `mongoose.connect`, GET/POST/PUT/DELETE, status codes (200/400/500), try/catch, validate uniqueness בקוד | Source: "Express + MongoDB שחייב לשבת בראש", "Express - Endpoints מלאים", "טעויות שמורידות נקודות" | Core – backend לא יעבוד بدون זה | POST לא עובד, אין CORS, 500 דה-פקטו | ✅ |
| **90%** | POST /filter, validation ב-backend, בדיקת limit (למשל 11 שחקנים), status codes ספציפיים | Source: "Routes - CRUD מלא", "Backend validation", "SV Team Manager Backend" | Critical – בדיקת גבולות מובילה להפחתה | מותר להזין 12 שחקנים ב-lineup, אין בדיקת כפילות | ✅ |
| **70%** | Custom routes (למשל `/borrow/:id`, `/filter`), validation regex ב-backend | Source: "Routes", "Validation patterns", "SV Library Backend" |_bonus – רק אם נותר זמן_ | validation לא מופעל ב-backend | ⚠️ |
| **40%** | pagination, sort אוטומטי, transaction | Source: "סבירות 40%", "בונוס – מה להוסיף" | Rare – לא נצרכה במבחנים קודמים | API איטי, שגיאה באתחול | ❓ |

---

#### 🔍 ולידציות (החלק שנותן/מוריד הכי הרבה!)  
| סבירות | מה לתרגל | מקורות באסמך |影响 | מה ייכשל | ביטחון |
|--------|-----------|----------------|-----|----------|--------|
| **100%** | frontend + backend זוגיות, type-check, required, min/max length, min/max range (גיל 18-60), unique checking בקוד | Source: "ולידציות – חלק הכי מרים/ מוריד", "Checklist כלול", "SV Team Manager Backend" | Critical – חוסר של ולידציה אחת = -5 עד -15 | submit עובד עם נתונים שגויים, אין בדיקת ריק | ✅ |
| **90%** | validation regex (אנגלית בלבד, username lowercase, capitalize words), Confirm Password, password strength | Source: "ולידציות נפוצות", "SV Team Manager Backend", "JS/TS validations" | Critical – regex שגוי = שדות שגויים יתקבלו | "Maccabi Tel Aviv" יידחה, סיסמה חלשה תתקבל | ✅ |
| **70%** | validation enum (genre, department), validation regex מתקדמת (car number 8 digits) | Source: "Validation examples", "SV Appointments" |_bonus – אם נותר זמן_ | שדה לא תקין יתקבל (למשל Genre לא from enum) | ⚠️ |
| **40%** | validation של state mutation, validation של layout order | Source: "שגיאות שמורידות", "Checklist UI" | Rare – לא נצרכה במבחנים | כפתור submit מופעל גם כששדות לא תקינים | ❓ |

---

#### ⚡ JavaScript (20 נק')  
| סבירות | מה לתרגל | מקורות באסמך |影响 | מה ייכשל | ביטחון |
|--------|-----------|----------------|-----|----------|--------|
| **100%** | `Array.isArray`, `typeof === "number"`, `throw new Error`, return type נקוי (object/array), edge cases (empty, single) | Source: "Checklist לכל פונקציית JS", "JS Patterns", "SV Library JS" | Critical – חוסר = היעדר תוצאת ה考试 | פונקציה לא זורקת שגיאה, מחזירה `NaN` | ✅ |
| **90%** | search in array (filter), sum sequences, counting to object, ordered subset, unique counting | Source: "JS Questions", "5 Solutions for JS Patterns", "SV Team Manager JS" | Core – 4 שאלות נפוצות + אחת לא מוכנה | חישוב טעות ב-1 (loop boundary) | ✅ |
| **70%** | matrix counting, binary palindrome, Fibonacci variant | Source: "5 Missing JS Solutions", "JS Patterns" |_bonus – רק אם נותר זמן_ | loop אינסופי, טעות ב-iteration | ⚠️ |
| **40%** | recursion, sorting without `sort`, advanced reduce | Source: "סבירות 40%", "JS Advanced" | Rare – לא נצרכה | stack overflow | ❓ |

---

#### 🛠 TypeScript (10 נק')  
| סבירות | מה לתרגל | מקורות באסמך |effect | מה ייכשל | ביטחון |
|--------|-----------|----------------|-----|----------|--------|
| **100%** | `interface`, `type`, טיפוסים על params/return, `Partial<Entity>`, `keyof`, avoid `any` | Source: "TypeScript - 10 נק'", "TS Patterns", "SV Appointments TS" | Core – בדיקה רכה – חוסר גורם להפסד ניכר | `any` מופיעה, interface לא מוגדרת | ✅ |
| **90%** | `React.FC<Props>`, event types (`React.ChangeEvent`), `generics` basics | Source: "React + TS", "SV Volunteer TS" | Core – לא מותר לשכוח את זה | type-safe error ב-IDE, build failure | ✅ |
| **70%** | `type guard` (`isValidPlayer`), `interface extends` | Source: "TS Patterns", "Day 2 Training" |_bonus – לא חובה_ | `as` replacement לא הושתל | ⚠️ |
| **40%** | `namespace`, decorators, mapped types | Source: "סבירות 40%" | Very rare – לא נצרכה | build error לא קשור ל核心 | ❓ |

---

#### 🧪 Setup & Debug  
| סבירות | מה לתרגל | מקורות באסמך |effect | מה ייכשל | ביטחון |
|--------|-----------|----------------|-----|----------|--------|
| **100%** | `.env`, `VITE_API_URL`, `CORS before routes`, `express.json()` | Source: "Setup before exam", "Templates", "CORS checklist" | Critical – חוסר = אפס נק' ב-backend | `fetch` מחזיר CORS error, `POST` לא מקובל | ✅ |
| **90%** | `npm install react-router-dom`, `npm install cors`, `mongoose.connect` error handling | Source: "Packages you must install", "Setup v2" | Core – אם לא עובד – לא מתקדם | `TypeError: Cannot read property 'connect'` | ✅ |
| **70%** | Tailwind not working? Cache busting (`Ctrl+Shift+R`), node_modules clean | Source: "Last-minute Fixes", "Command line fixes" |_bonus – יושם רק אם נותר זמן_ | `bg-red-500` לא מופיע, `dev` server stuck | ⚠️ |
| **40%** | React DevTools, Postman/curl debugging | Source: "Debug tools", "Command line" | Rare – לא נחוץ | אובדן זמן ב-dump | ❓ |

---

#### 🧪 Full Project Simulations  
| סבירות | סימולציה | מקורות באasmך |effect | מה ייכשל | ביטחון |
|--------|-----------|----------------|-----|----------|--------|
| **100%** | **SV Team Manager**: Team, Add/Player, Login, Filter (18–60 age) | Source: "Simulation 1", "Team Manager Backend", "Full project" | Core – נפתח 7 פעמים | לא בודק גבולות גיל, no frontend validation | ✅ |
| **100%** | **SV Appointments**: Department enum, isActive flag, unique username | Source: "Simulation 2", "Appointments Backend", "SV College Exam" | Core – patterns חזרו פעמיים | לא בודק status `isActive`, חזרה על اسم | ✅ |
| **90%** | **SV Volunteer**: city filter, maxPeople count, search | Source: "Simulation 3", "Volunteer Backend", "Full Stack v2" | Core – נפוץ | search לא case-insensitive | ✅ |
| **70%** | **SV Travel Log**: days range, partners list, validation | Source: "Simulation 4", "Travel Log TS", "Full Stack v2" |_bonus – נפוץ但 לא תמיד_ | validation of days not applied in backend | ⚠️ |
| **70%** | **SV Library**: borrow logic, isAvailable toggle, genre enum | Source: "SV Library Backend", "Exam v3", "JS/TS Simulation" | Core – נפוץ | allow to borrow unavailable book | ✅ |

---

### 🔥 10 תרגולים בוטים לעדכון ביצוע בטרם המבחן  
*(לפי סדר ביצוע יומי)*  

1. **Setup speedrun – 15 דקות**  
   - קום מ-0: `vite+react+tailwind`, `express+mongoose`  
   - הפעל `GET /` (backend), `VITE_API_URL`, `react-router`  
   - *מטרה: 15 דקות – מעבר → דגל אדום ב-20 דקות*

2. **Login+Register without validation – 30 דקות**  
   - Two pages: login + register  
   - POST to `/api/auth/login`, `/api/auth/register`  
   - *מטרה: Login עוקב ל-Register → דף הבית*  

3. **Login+Register – עם ולידציות מלאות – 45 דקות**  
   - username: 3-15, lowercase, english only  
   - password: 8+, upper, digit, special char  
   - backend + frontend validate, unique check בקוד  
   - *מטרה: submit fails עם alert מדויק על כל שגיאה*  

4. **Backend CRUD – SV Team Manager – 60 דקות**  
   - Model: `Player {name, age, goals, assists, inLineup, teamName}`  
   - GET `/players/:teamName`, POST `/players`, PUT, DELETE  
   - POST `/filter`, check max 11 in-lineup  
   - *מטרה: כל endpoint עובד ב-curl/Postman*  

5. **Frontend: Login → Home → Add/Edit – 90 דקות**  
   - login → `/team/:teamName`  
   - Home: list + search + toggle (show only lineup)  
   - Add/Edit: **קומפוננטה משותפת** `BookForm`  
   - *מטרה: submit מועבר ל-backend, UIמעודכן*  

6. **5 JS drills – 30 דקות**  
   - countUnique (even/odd), sum sequences, identify sequence (A/B/C/D), ordered subset, matrix count  
   - *כל שאלה: Array.isArray + typeof + throw Error*  

7. **4 TS drills – 30 דקות**  
   - interface Player + function `getTopScorer(players: Player[]): Player | null`  
   - `filterByField<T>(items: T[], field: keyof T, value: any): T[]`  
   - type guard, React component with `Props` + `ChangeEvent`  
   - *ללא `any` – לא קיים例外*  

8. **SV Library Full Simulation – 3 שעות**  
   - Login (admin/1234), /books (list+search+available toggle), add/edit  
   - Backend: validation, genre enum, borrow logic  
   - JS: {totalBooks, oldestYear, newestYear, mostCommonGenre}  
   - TS: `filterBooks(books: Book[], filters: Partial<Book>): Book[]`  
   - *מטרה: סיום ב-2.5 שעות – buffer לבדיקות*  

9. **Debrief & Fix – 30 דקות**  
   - תקן רק את 3 הטעויות הגדלות ביותר  
   - בדוק `CORS`, `express.json()`, validation double (FE+BE)  

10. **Confidence ritual – 10 דקות**  
   - חזור על שלושת הכללים:  
     1. תשתית מוכנה = 30 דקות מרוויח  
     2. backend before frontend  
     3. validations = הציון  
   - *תתמקד בקושי – לא ב aesthetics*  

---

### 🎯 סיכום ביטחון  
- **Backend + Frontend + Validation = 95% ביטחון**  
- **JS + TS = 90% ביטחון (אם לא לשכוח את `Array.isArray`)**  
- **Setup/Debug = 100% (אם תזכור `cors`_before` routes)**  

> **זכרו: זה לא מבחן ידע – זה מבחן מהירות ותבניות. תכתבו קוד מלוכלך אבל עובד.**  
> **הציון של 100 הוא של דרישות שמולאו – לא של קוד יפה.**



CRITIC REPORT:
**_critique of previous probability map (Hebrew only):**

### 🔴 ריחוק מהמקור / טענות מופרזות (Overconfident claims)
- **סבירות 100% ל-`search + toggle, layout לפי תמונה, error/loading/empty states` (React)** –  
  המקור לא מתייחס ל-layout *לפי תמונה* כדרישה חובה; הוא מציין layout רלבנטי, לא חובה לדיוק.  
  **האם זה מונע מבחן? לא – נרשמנו במבחנים עם layout פסוקי (למשל SV Travel Log)**.  
  → **שנה לסבירות 85%** + הוספת הערה: *layout מדויק ≠ חובה; סדר שדות חשוב יותר מ-layout מדויק*.

- **סבירות 100% ל-`React Router דינמי` ב-40%** –  
  המסמך המקורי מציין `/team/:teamName` כנפוץ (SV Team Manager, SV Volunteer), אך לא מבקש routing דינמי *ממשי* (مثل `/borrow/:id`) – רק `/team/:teamName`.  
  → **שנה לסבירות 80% ל-`/team/:teamName` + סבירות 30% ל-routing דינמי אחר**.

- **סבירות 100% ל-`localStorage (אם נדרש)`** –  
  המקור *לא מזכיר localStorage כלל* כדרישה או כלול ב-Checklist.  
  → **הסר תאריך; סבירות 0% unless explicitly required – and it's not.**

- **סבירות 100% ל-`error boundaries` ב-40%** –  
  המקור מציין `error/loading/empty states` כ-Critical, אבל לא *error boundaries* כרץ'.  
  → **שנה לסבירות 20% – נפוץ כ-bonus, לא כהיתר לexam**.

---

### 🟠 חוסר נימוק במקור / הימנעות ממקורות
- **`localStorage (אם נדרש)`** – אין איזה מקורות שמנצין localStorage.  
  → **סומנה כ-Unknown/Unavailable**.

- **`React Router דינמי (הנ"ל)`** – המקור מציין فقط `/team/:teamName`, לא `/borrow/:id` וכו'.  
  → **סומנה כ-80% ל-`/team/:teamName`, 30% לRouting אחר – עם הערת גבול**.

- **`type guard (TS, 70%)`** – המקור כולל `type guard` כ דפוס נפוץ (SV Appointments, SV Volunteer).  
  → **שנה לסבירות 85%**.

- **`navigation after success (frontend)`** – שוכחה ב mapa; but explicitly required in multiple checkpoints (SV Team Manager, SV Library).  
  → **הוספה ל-React 100% ( sotto "useNavigate after success" )**.

---

### 🟡 פערים ניכרים – נושאים חסרים
- **ב-Express: חוסר בדיקה ל-`try/catch` בתוך filter route** –  
  המסמך המוגדר מפרט בדיקת try/catch בכל route. חוסר בהכרח יגרום ל-500.  
  → **הוספה ל-Express 100%**.

- **ב-Validation: חוסר דגש על `confirm password` כ-100%** –  
  המסמך מציין `Confirm Password` כדרישה נפוצה+ קריטית (SV Team Manager, SV Appointments).  
  → **שנה לסבירות 95% (ולא 90%)**.

- **ב-JS: חוסר דגש על `throw new Error` עם string מדויק – לא רק `throw Error()`** –  
  המסמך מפרט דוגמאות עם `throw new Error("Must be array")`.  
  → **הוספה ל-JS 100% under "throw new Error with specific message"**.

- **ב-Setup: חוסר בדיקת `CLIENT_URL` ב-CORS** –  
  המסמך מחייב `origin: process.env.CLIENT_URL` ב-CORS. חוסר = CORS error.  
  → **הוספה ל-Setup 100%**.

---

### 🟢 פסוקי ביטחון / פסיקות רעות
- **"`Modal not opening/closing` = warning" – אבל ב-Source לא מופיע modal כדרישה חובה** –  
 -modal מופיע רק כ-bonus (SV Library: confirm dialog).  
  → **שנה לסבירות 50% ל-modal/confirm dialog**.

- **"`pagination` ב-40% – אך המסמך never mentions pagination. לא נחוץ.**  
  → **שנה לסבירות 20%** (bare minimum).

- **"`sort automatic` ב-40% – רק `sort` מופיע כ-70%, לא אוטומטי.**  
  → **הסר "sort אוטומטי" – שים "sort ידני: 70%" (SV Library: sort by year/price)**.

---

### 🟠 טענות מהוליציניאציה
- **"`State mutation validation` – source לא מתייחס למגדר זה; זה דוגמה ל-TypeScript או React Patterns, לא ל-validation כחלק של הציון."**  
  → **הסר מ-Validation; מוקמה ב-JS/TS באשכולים של pattern validation (mutation checks – לא validation per se)**.

- **"`Validation of layout order` – source never mentions layout order validation. layout ≠ layout order."**  
  → **הסר מ-Validation; layout order הוא עניין של UI, לא validation.**

---

## ✅ מפת הסתברות מותאמת (Compacted, Hebrew only):

### 📦 React  
| סבירות | מה לתרגל | מקורות | מה ייכשל |
|--------|------|-------|---------|
| **100%** | `BrowserRouter`, `Routes`, `useNavigate`, `useParams`, `useState`, `useEffect`, controlled form, קומפוננטה משותפת Add/Edit, `useNavigate` אחרי success | React שחייב לשבת בראש, Checklist, Simulations | טופס לא מודפס, UI לא מעודכן |
| **85%** | search + toggle, layout *סדר שדות* (לפי דרישות), error/loading/empty states | Duplicates, Checklist, Simulations | Toggle לא עובד, חיפוש לא מסנן |
| **60%** | Modal/Confirm dialog (אם נדרש בדרישה), select dropdown מואLES | BONUS, SV Library Backend | Modal לא נפתח/סגור |
| **30%** | React Router דינמי אחר (`/borrow/:id`) | SV Library Backend (borrow logic) | API לא מתאם ל-frontend |

### ⚙️ Express + MongoDB  
| סבירות | מה לתרגל | מקורות | מה ייכשל |
|--------|------|-------|---------|
| **100%** | `express.json()`, `cors`, `mongoose.connect`, GET/POST/PUT/DELETE, status codes, try/catch, validation בקוד + ב-backend, בדיקת כפילות בקוד | Express + MongoDB שחייב, Checklist, SV Team Manager Backend | POST לא עובד, CORS, 500 |
| **95%** | POST /filter, validation ב-backend, בדיקת limit (11 שחקנים), status codes ספציפיים | Routes - CRUD מלא, Backend validation | מותר להזין 12 שחקנים |
| **60%** | Custom routes (למשל `/borrow/:id`, `/filter`) | SV Library Backend, Exam v3 | validation לא מופעל |
| **20%** | pagination, sort אוטומטי | — | API איטי |

### 🔍 ולידציות  
| סבירות | מה לתרגל | מקורות | מה ייכשל |
|--------|------|-------|---------|
| **100%** | frontend + backend זוגיות, type-check, required, min/max, unique checking בקוד | Validation – חלק מרים, Checklist, SV Team Manager Backend | submit עם נתונים שגויים, אין בדיקת ריק |
| **95%** | regex (אנגלית, lowercase, capitalize), Confirm Password, password strength | Validation examples, SV Team Manager Backend | "Maccabi" יידחה |
| **50%** | validation enum (genre, department), validation regex מתקדמת (car number) | Validation examples, SV Appointments | שדה לא תקין יתקבל |
| **Unknown** | validation של state mutation, layout order | ❌ לא מופיע ב-source | — |

### ⚡ JavaScript (20 נק')  
| סבירות | מה לתרגל | מקורות | מה ייכשל |
|--------|------|-------|---------|
| **100%** | `Array.isArray`, `typeof === "number"`, `throw new Error(msg)`, return type נקוי, edge cases | JS Patterns, Checklist, JS Questions | פונקציה לא זורקת שגיאה |
| **90%** | search in array, sum sequences, counting to object, ordered subset, unique counting | JS Questions, 5 Solutions, SV Team Manager JS | חישוב טעות ב-1 |
| **60%** | matrix counting, binary palindrome, Fibonacci variant | Missing JS Solutions | loop אינסופי |
| **20%** | recursion, sorting without `sort`, advanced reduce | Advanced JS | stack overflow |

### 🛠 TypeScript (10 נק')  
| סבירות | מה לתרגל | מקורות | מה ייכשל |
|--------|------|-------|---------|
| **100%** | `interface`, `type`, טיפוסים, `Partial<Entity>`, `keyof`, avoid `any` | TypeScript - 10 נק', TS Patterns, SV Appointments TS | `any` מופיעה |
| **95%** | `React.FC<Props>`, event types (`React.ChangeEvent`), `generics` basics | React + TS, SV Volunteer TS | type-safe error |
| **85%** | `type guard` (`isValidPlayer`), `interface extends` | TS Patterns, Day 2 Training | `as` replacement לא הושתל |
| **20%** | `namespace`, decorators, mapped types | — | build error לא קשור |

### 🧪 Setup & Debug  
| סבירות | מה לתרגל | מקורות | מה ייכשל |
|--------|------|-------|---------|
| **100%** | `.env`, `VITE_API_URL`, `cors before routes`, `express.json()`, `CLIENT_URL` ב-CORS | Setup before exam, Templates, CORS checklist | `fetch` מחזיר CORS error |
| **90%** | `npm install react-router-dom`, `npm install cors`, mongoose.connect error handling | Packages you must install, Setup v2 | `TypeError: Cannot read property 'connect'` |
| **50%** | Tailwind not working? Cache busting | Last-minute Fixes | `bg-red-500` לא מופיע |
| **Unknown** | React DevTools, Postman/curl debugging | — | — |

### 🧪 Full Project Simulations  
| סבירות | סימולציה | מקורות | מה ייכשל |
|--------|------|-------|---------|
| **100%** | **SV Team Manager**: Team, Add/Player, Login, Filter (18–60) | Simulation 1, Team Manager Backend | לא בודק גבולות גיל |
| **100%** | **SV Appointments**: Department enum, isActive flag, unique username | Simulation 2, Appointments Backend | לא בודק `isActive` |
| **90%** | **SV Volunteer**: city filter, maxPeople count, search | Simulation 3, Volunteer Backend | search לא case-insensitive |
| **60%** | **SV Travel Log**: days range, partners list, validation | Simulation 4, Travel Log TS | validation של days לא ב-backend |
| **60%** | **SV Library**: borrow logic, isAvailable toggle, genre enum | SV Library Backend, Exam v3 | allow to borrow unavailable book |

---

### 📊 ציוןprevious report: **67/100**  
- ✅ תבניות CRUD, סדר עבודה, דגש על ולידציות – מדויקים  
- ❌ חוסר בדיקה למקורות – טענות מופרזות, פסוקי ביטחון לא מוצדקים, חוסר נימוק  
- ❌ השתקלות על טענות "האם ייכשל" ללא נימוק מהמקור  
- ❌ חוסר עדכון לעדכון התוספת הטריוויאלית של TypeScript (10 נק')

---

## 🛠️ 5 שיפורים עיקריים למפה הבאה:  
1. **כל טענה ≠ חובה Unless מפורט ב-Checklist/Source**:  
   → כל סבירות >80% חייבת מرجع ספציפי ב-source (הפרק, השם, השורה).

2. **הסר/שנה סבירות על נושאים שלא מופיעים בכלל ב-source** (למשל: localStorage, state mutation validation, pagination, decorators).  
   → סומנה כ-`Unknown/Unavailable`.

3. **הוסף הערות גבול**:  
   - ל-layout – "סדר שדות חשוב יותר מ-layout מדויק".  
   - ל-caching – "tailwind cache busting: רק אם נותר זמן".  
   - ל-routing – "רק `/team/:teamName` דרור, לא `/borrow/:id`".

4. **הוסף סעיף ל"תחום פער"**:  
   → נושאים ש"נראים" רלוונטיים אבל לא נמצאים ב-source (למשל: error boundaries, decorators, pagination).

5. **הוספת הערה מרכזית**:  
   > **"הסבירות נקבעה על סמך חזרות במבחנים, אך רק מה שרשום ב-source רשמי (Checklist, Templates) הוא חובה – остא שאר הוא bonus."**  

---  
**End of critique.**

