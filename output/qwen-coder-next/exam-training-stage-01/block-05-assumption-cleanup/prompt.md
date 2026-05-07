SYSTEM:
You are Qwen3-Coder-Next acting as a conservative evidence checker. Return Hebrew output. Do not add new claims.

TASK:
Review the Stage 1 outputs. Create a table with: claim, evidence strength, risk of hallucination, should keep/change/remove, corrected wording. Mark unknown/unavailable wherever the source does not justify the claim. Then list the final allowed probability claims for the exam plan.

STAGE 1 OUTPUTS:
## block-01-probability-map
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



## block-02-probability-critic
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



## block-03-drill-plan
### תרגולים 11–22 – תרגול תבניות ובדיקת ביצוע  
*(לפי מפת הסבירות המותאמת + דיווח הביקורת)*  

---

**11. Title:** CORS & Setup Speedrun  
**Probability Band:** 100%  
**Exact Task:** בנה קבצי `server.js` (Express) + `vite.config.js` (React) מ-0. הפעל `GET /test` (backend), הפעל frontend עם `fetch('/api/test')`.  
**Timebox:** 12 דקות  
**Expected Files:** `server.js`, `src/lib/api.js`, `.env` (עם `VITE_API_URL` + `CLIENT_URL`)  
**Scoring Rubric:**  
- 2 נק': `cors({origin: process.env.CLIENT_URL})` לפני `express.json()`  
- 2 נק': `res.json({ok: true})` ב-`GET /test`  
- 2 נק': `fetch()` עם `VITE_API_URL` (לא hardcode)  
- 2 נק': `.env` כשמופיע  
- 2 נק': No `console.log()` ב-cors  
**Pass Condition:** Frontend מקבל `{ok: true}` without CORS error  
**Likely Failure:** `CLIENT_URL` לא מוגדר ב-CORS → error 403  
---

**12. Title:** Controlled Form – Add/Edit Shared Component  
**Probability Band:** 100%  
**Exact Task:** כתוב קומפוננטה `PlayerForm` עם שדות: `name`, `age`, `goals`. התאם `useEffect` לעריכה. שים לב: submit מושך `formData` מ-state (לא DOM).  
**Timebox:** 20 דקות  
**Expected Answer Shape:**  
```tsx
const [formData, setFormData] = useState({name: '', age: '', goals: ''});
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... };
```
**Scoring Rubric:**  
- 3 נק': `value={formData.name}` + `onChange`  
- 3 נק': `setFormData(prev => ({...prev, [e.target.name]: e.target.value}))`  
- 2 נק': `useEffect` עם `params.id` (לא חובה ל-CRUD – רק לאפס)  
- 2 נק': submit בודק `age >= 18 && age <= 60` (frontend)  
**Pass Condition:** Submit משלב את ה-data ל-backend (לא שורת ריקה)  
**Likely Failure:** submit uses `e.target.value` ישירות (בלי state)  
---

**13. Title:** Backend Filter + Validation  
**Probability Band:** 95%  
**Exact Task:** בנה endpoint `POST /filter` – מקבל `{minAge, maxAge, teamName}`. בדוק:  
- `minAge >= 0`, `maxAge <= 100`, `minAge <= maxAge`  
- בדוק `teamName` ריק (backend validation)  
**Timebox:** 25 דקות  
**Expected Files:** `/routes/players.js`, `/models/Player.js`  
**Scoring Rubric:**  
- 3 נק': try/catch מסביב ל-query  
- 2 נק': validation עם throw new Error(msg)  
- 2 נק': `Player.find({...filter})` (לא `findOne`)  
- 2 נק': status codes: 400/200  
**Pass Condition:** `POST /filter` עם `minAge=70, maxAge=10` מозвращает 400  
**Likely Failure:** Validation חסרה → שחקנים מחוץ לגילאים יוחזרו  
---

**14. Title:** TypeScript Interface + Generic Filter  
**Probability Band:** 95%  
**Exact Task:** הכן `interface Book {title: string; year: number; genre: 'SciFi'|'Drama'; isAvailable: boolean}`. כתוב `filterByGenre<T>(items: T[], field: keyof T, value: any): T[]`.  
**Timebox:** 15 דקות  
**Expected Answer Shape:**  
```ts
const filterByGenre = <T>(items: T[], field: keyof T, value: any): T[] => {
  if (!Array.isArray(items)) throw new Error("Must be array");
  return items.filter(item => item[field] === value);
};
```
**Scoring Rubric:**  
- 3 נק': interface מוגדרת (אין `any` בשדות)  
- 3 נק': `keyof T` בשאילתה  
- 2 נק': `Array.isArray(items)` + throw new Error  
- 2 נק': `filter` עם `field` (לא string literal)  
**Pass Condition:** `filterByGenre(books, 'genre', 'SciFi')` עובד  
**Likely Failure:** `item[field]` بدون casting – שגיאת compile  
---

**15. Title:** JS: Sum Sequence + Unique Count  
**Probability Band:** 90%  
**Exact Task:** כתוב פונקציה `analyzeSequence(arr: number[])` שמחזירה `{sum, countUniqueEven, countUniqueOdd}`.  
**Timebox:** 10 דקות  
**Expected Answer Shape:**  
```js
const analyzeSequence = (arr) => {
  if (!Array.isArray(arr)) throw new Error("Must be array");
  const evens = new Set(arr.filter(n => n % 2 === 0));
  const odds = new Set(arr.filter(n => n % 2 !== 0));
  return { sum: arr.reduce((a,b)=>a+b,0), countUniqueEven: evens.size, countUniqueOdd: odds.size };
};
```
**Scoring Rubric:**  
- 2 נק': `Array.isArray` + throw new Error(msg)  
- 2 נק': `Set` ל-unique counting  
- 2 נק': `reduce` לא לחישוב סכום  
- 2 נק': return object עם שלוש השדות  
- 2 נק': edge case – ריק → `{sum:0, countUniqueEven:0, ...}`  
**Pass Condition:** `analyzeSequence([])` מחזיר `{sum:0, countUniqueEven:0, countUniqueOdd:0}`  
**Likely Failure:** חיסור של 1 ב-loop boundary (למשל: `i <= arr.length`)  
---

**16. Title:** React Navigation After Success  
**Probability Band:** 100%  
**Exact Task:** ב-`Login` page, אחרי `POST /api/auth/login` מוצלח – העבר ל-`/team/:teamName` (ה-`teamName` הוא מה-response).  
**Timebox:** 12 דקות  
**Expected Files:** `Login.tsx`  
**Scoring Rubric:**  
- 3 נק': `useNavigate` מ-`react-router-dom`  
- 3 נק': `navigate('/team/' + response.data.teamName)`  
- 3 נק': ניקיון after success (למשל: `resetForm()`)  
- 1 נק': לא שומעים ל-state after `navigate` (למשל: لا מעודכן)  
**Pass Condition:** בדיקה ידנית – after login, URL מסתבה ב-`/team/`  
**Likely Failure:** `window.location.href = ...` (מונע SPA)  
---

**17. Title:** Regex Validation – Password + Username  
**Probability Band:** 95%  
**Exact Task:** תcribe regex ל-username (3-15, lowercase English only) וסיסמה (8+, אحرف + דigits + special char). בדוק frontend + backend.  
**Timebox:** 20 דקות  
**Expected Files:** `validation.ts`, `/routes/auth.js`  
**Scoring Rubric:**  
- 3 נק': regex ב-FE: `/^[a-z]{3,15}$/`  
- 3 נק': regex ב-FE: `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/`  
- 2 נק': `throw new Error("username must be lowercase, 3-15 chars")`  
- 2 נק': validation ב-backend עם אותו regex  
**Pass Condition:** `"Maccabi"` מתקבל ל-username? לא – מודפסת שגיאה.  
**Likely Failure:** regex חסר `^/$` – `"abc123!"` יתקבל despite length.  
---

**18. Title:** `try/catch` Inside All Routes  
**Probability Band:** 100%  
**Exact Task:** הוסף `try/catch` ל-all CRUD routes. אם שגיאה – return status 500.  
**Timebox:** 15 דקות  
**Expected Files:** `server.js` – כל route function  
**Scoring Rubric:**  
- 2 נק': try/catch מסביב ל-`await` (למשל: `Player.find`)  
- 2 נק': `res.status(500).json({error: "Internal error"})`  
- 2 נק': לא משאיר שגיאת server גלויה ל-client (למשל: `err.stack`)  
- 2 נק': error ב-catch *לא* מושפע מ-layout (למשל: `res` לא מתאפס)  
**Pass Condition:** `POST /players` עם schema שגוי → 500  
**Likely Failure:** `catch (e) => next(e)` – לא הוגדר `next`, קורס.  
---

**19. Title:** Empty/Loading/Error States in List  
**Probability Band:** 85%  
**Exact Task:** כתוב `PlayerList` שמציג: `Loading...`, `No players found`, list.  
**Timebox:** 15 דקות  
**Expected Files:** `PlayerList.tsx`  
**Scoring Rubric:**  
- 2 נק': `if (loading) return <div>Loading...</div>`  
- 2 נק': `if (!loading && players.length === 0) return <div>No players</div>`  
- 2 נק': error state: `if (error) return <div>Error: {error.message}</div>`  
- 2 נק': `useEffect` מעדכן `loading/error` (לא state חיצוני)  
**Pass Condition:** after `fetch` של שגיאה – מודפס "Error: ..."  
**Likely Failure:** `return []` ב-`players.map` – שגיאת TypeError ב-UI  
---

**20. Title:** Backend `POST` with Uniqueness Check  
**Probability Band:** 100%  
**Exact Task:** ב-`POST /players`, בדוק אם שחקן כבר קיים ב-`teamName` + `name`. אם כן – status 400.  
**Timebox:** 18 דקות  
**Expected Files:** `/routes/players.js`  
**Scoring Rubric:**  
- 3 נק': `Player.findOne({ teamName, name })`  
- 3 נק': `if (found) throw new Error("Player already exists")`  
- 2 נק': status 400 ב-catch  
- 2 נק': לא בודק `email` (איננו חלק מה-model)  
**Pass Condition:** שליחה פעמיים של אותו שחקן → 400  
**Likely Failure:** `Player.create` לפני בדיקה → duplicate in DB  
---

**21. Title:** TypeScript Type Guard for Player  
**Probability Band:** 85%  
**Exact Task:** הכן `isValidPlayer(obj: any): obj is Player` שבודק:  
- `obj.name` is string  
- `obj.age` is number  
- `obj.teamName` is string  
- `obj.goals` and `obj.assists` are numbers or undefined  
**Timebox:** 15 דקות  
**Expected Answer Shape:**  
```ts
const isValidPlayer = (obj: any): obj is Player => {
  return typeof obj.name === 'string' &&
         typeof obj.age === 'number' &&
         typeof obj.teamName === 'string' &&
         (obj.goals === undefined || typeof obj.goals === 'number') &&
         (obj.assists === undefined || typeof obj.assists === 'number');
};
```
**Scoring Rubric:**  
- 2 נק': `obj is Player` type predicate  
- 2 נק': `typeof` לכל שדה חובה  
- 2 נק': `undefined` allowed for `goals/assists`  
- 2 נק': לא משתמש ב-`as`  
**Pass Condition:** `isValidPlayer({name: 123})` → false  
**Likely Failure:** חסר בדיקה ל-`age` (שדה חובה)  
---

**22. Title:** Tailwind Cache Fix (If Needed)  
**Probability Band:** 50%  
**Exact Task:** אם `bg-red-500` לא מופיע – ציין פתרון ב-30 שניות.  
**Timebox:** 10 דקות (המחשה, לא כתיבה)  
**Expected Files:** `vite.config.js` – לא מתעדכן  
**Scoring Rubric:**  
- 2 נק': `Ctrl+Shift+R` (hard reload)  
- 2 נק': `rm -rf node_modules/.vite` (clear cache)  
- 2 נק': `npm run dev` מחדש  
- 2 נק': לא מטפל ב-caching של CSS  
- 2 נק': לא מנסה למחוק node_modules (רק cache)  
**Pass Condition:** After `Ctrl+Shift+R`, `bg-red-500` מופיע  
**Likely Failure:** `npm install tailwindcss` – זה לא פותר את הבעיה של cache ב-cdn  
---  

**הערה כללית:** כל Drill must finish within timebox – otherwise: `fail`.  
**הערות:**  
- לא לתרגל state mutation validation – לא מופיע ב-source.  
- לא לתרגל layout order validation – לא קשור ל-validate.  
- `localStorage` – *never* required.  
- **לזכור: backend before frontend, validations = grade.**



## block-04-mastery-quiz
### מבחן mastery – נושאיםHIGH-PROBABILITY  
**(30 שאלות, סטנדרט מבחן סופי – SVCollege FullStack)**  

---

#### **React (6 שאלות)**  
1. **שאלה:** ב-`PlayerForm`, איך מבטיחים שה-data שנשלחת ל-backend נובעת מה-state ולא מ-DOM?  
   **תשובה צפויה:** `setFormData(prev => ({...prev, [e.target.name]: e.target.value}))`+ submit קורא `formData` (לא `e.target.value` ישירות).  
   **נקודות:** 4  
   **שגיאה נפוצה:** submit uses `e.target.value` ישירות או שומך `value` על state אבל לא מעדכן ב-`onChange`.  

2. **שאלה:** מה ה-urlที่ ייפתח עם `useNavigate()` אחרי login מוצלח, אם ה-response מחזיר `{teamName: "Hapoel"}`?  
   **תשובה צפויה:** `navigate('/team/Hapoel')` או `navigate(`/team/${response.teamName}`)`.  
   **נקודות:** 4  
   **שגיאה נפוצה:** `window.location.href = ...` (שבור SPA) או `navigate('/team/:teamName')` (הסטיק).  

3. **שאלה:** באיזה סדר.must appear in `PlayerList` ל-display empty/error/loading?  
   **תשובה צפויה:** `if (loading) → if (error) → if (players.length === 0) → map`.  
   **נקודות:** 4  
   **שגיאה נפוצה:** `return []` ב-`map` במקום conditional rendering, או `error` אחרי `map`.  

4. **שאלה:** איך מבטיחים של-`PlayerForm` יש `name` ש-controlled?  
   **תשובה צפויה:** `value={formData.name}` + `onChange={handleChange}`.  
   **נקודות:** 4  
   **שגיאה נפוצה:** `defaultValue` או חוסר `onChange`.  

5. **שאלה:** למה `useEffect` מופעל פעם אחת רק ב-`PlayerForm` עם `params.id`?  
   **asse expected:** לא לאפס את ה-state (לא לשכפל CRUD), אלא *למלא* את ה-state אם יש `params.id`.  
   **נקודות:** 2  
   **שגיאה נפוצה:** `useEffect(() => {}, [])` (לא משתמש ב-`params.id`) או `useEffect(() => {}, [formData])` (loop).  

6. **שאלה:** איך מוגדר `PlayerForm` כקומפוננטה משותפת ל-Add/Edit?  
   **תשובה צפויה:** `props: {initialData?: Player}` → `useState` עם `initialData || defaultForm`.  
   **נקודות:** 4  
   **שגיאה נפוצה:** חוסר ב-prop `initialData`, או חוסר ב-Controlled Form pattern.  

---

#### **Express + MongoDB (6 שאלות)**  
7. **שאלה:** למה `cors({origin: process.env.CLIENT_URL})` חייב להופיע *לפני* `express.json()`?  
   **תשובה צפויה:** CORS middleware must run *before* request parsing – אחרת `req.body` ריק ב-cors error.  
   **נקודות:** 4  
   **שגיאה נפוצה:** `cors` אחרי `app.use(express.json())`, או חוסר ב-CORS כלל.  

8. **שאלה:** איך מבטיחים של-`POST /players` אין כפילות `teamName + name`?  
   **תשובה צפויה:** `Player.findOne({teamName, name})` + `if (found) throw new Error(...)` + status 400.  
   **נקודות:** 4  
   **שגיאה נפוצה:** `Player.create` לפני בדיקה, או בדיקה על `email` (אינו ב-model).  

9. **שאלה:** איך מחזירים 400 אם `minAge > maxAge` ב-`POST /filter`?  
   **תשובה צפויה:** `if (minAge > maxAge) throw new Error('minAge > maxAge')` ב-inner `try`.  
   **נקודות:** 4  
   **שגיאה נפוצה:** בדיקה אחרי ה-query (לא מונע запрос לא רלוונטי).  

10. **שאלה:** למה `try/catch` *בכל* route?  
    **תשובה צפויה:** כדי לשלוח status 500 *בלי* expose stack trace (למשל `res.status(500).json({error: "Internal error"})`).  
    **נקודות:** 4  
    **שגיאה נפוצה:** `catch (e) => next(e)` בלי `next` מוגדר, או `console.log(e)` ב-client.  

11. **שאלה:** איך מוגדר `mongoose.connect` ב-`server.js`?  
    **תשובה צפויה:** `await mongoose.connect(process.env.MONGO_URI)` + error handling (try/catch או `.catch`).  
    **נקודות:** 4  
    **שגיאה נפוצה:** חוסר `await`, או חוסר ב-env (hardcoded URI).  

12. **שאלה:** מה ה-status code when `POST /players` מנסה להוסיף שחקן עם `age = 15` (אלא אם backend מозвיל)?  
    **תשובה צפויה:** 400 (frontend validation), או 200+backend validation (throw 400).  
    **נקודות:** 4  
    **שגיאה נפוצה:** 201 עם שחקן לא רלוונטי, או חוסר ב-backend validation.  

---

#### **Validations (8 שאלות)**  
13. **שאלה:** איך מבטיחים frontend+backend ש-`username` הוא lowercase 3-15 תווים?  
    **תשובה צפויה:** regex `/^[a-z]{3,15}$/` frontend + backend.  
    **נקודות:** 4  
    **שגיאה נפוצה:** חוסר `^/$`, או `/[a-z]{3,15}/` (מאפשר `"abc123"` כ-valid).  

14. **שאלה:** איך בודקים `confirm password` (frontend+backend)?  
    **תשובה צפויה:** `password === confirmPassword` + throw error עם message מדויק.  
    **נקודות:** 4  
    **שגיאה נפוצה:** בדיקה רק ב-client (למשל לא ב-backend), או חוסר message מדויק.  

15. **שאלה:** מה ה-status code when `POST /filter` מקבל `minAge=70, maxAge=10`?  
    **תשובה צפויה:** 400 ( backend validation).  
    **נקודות:** 2  
    **שגיאה נפוצה:** 200 עם filtered list ריק, או 500.  

16. **שאלה:** איך בודקים `teamName` ריק backend?  
    **תשובה צפויה:** `if (!teamName) throw new Error("teamName is required")`.  
    **נקודות:** 4  
    **שגיאה נפוצה:** בדיקה רק frontend, או חוסר message מדויק.  

17. **שאלה:** איך בודקים ש-`password` includes uppercase, lowercase, digit, special char?  
    **תשובה צפויה:** regex `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/`.  
    **נקודות:** 4  
    **שגיאה נפוצה:** regex חסר `(?=...)` או `<8` ב-length.  

18. **שאלה:** למה `required` validation必须 be frontend+backend?  
    **תשובה צפויה:** frontend for UX, backend for security (no bypassing).  
    **נקודות:** 2  
    **שגיאה נפוצה:** רק ב-backend (bad UX), או רק ב-client (בypass 가능).  

19. **שאלה:** איך בודקים `minAge >= 0`?  
    **תשובה צפויה:** `if (minAge < 0) throw new Error("minAge must be >= 0")`.  
    **נקודות:** 2  
    **שגיאה נפוצה:** בדיקה רק backend *אחרי* query (לא מונע request).  

20. **שאלה:** איך מונעים `age=120` ב-backend?  
    **תשובה צפויה:** `if (maxAge > 100) throw new Error("maxAge must be <= 100")`.  
    **נקודות:** 2  
    **שגיאה נפuada:** חוסר validation, או בדיקה frontend בלבד.  

---

#### **JavaScript (5 שאלות)**  
21. **שאלה:** איך כותבים `analyzeSequence([])` כדי לחזור `{sum:0, countUniqueEven:0, countUniqueOdd:0}`?  
    **תשובה צפויה:** `Set()` ריק + `reduce` עם אסילו 0.  
    **נקודות:** 4  
    **שגיאה נפוצה:** חוסר `Array.isArray`, או `filter` עם boundary error (`i <= arr.length`).  

22. **שאלה:** איך כותבים `throw new Error("Must be array")` ב-function שמקבל `arr: any`?  
    **תשובה צפויה:** `if (!Array.isArray(arr)) throw new Error("Must be array")`.  
    **נקודות:** 4  
    **שגיאה נפוצה:** `throw Error(...)` (לא new), או חוסר ב-message מדויק.  

23. **שאלה:** איך בודקים `typeof num === "number"`?  
    **תשובה צפויה:** `typeof n === "number" && !isNaN(n)`.  
    **נקודות:** 2  
    **שגיאה נפוצה:** חוסר ב-`isNaN`, או `Number.isInteger` ללא בדיקה של NaN.  

24. **שאלה:** איך מחזירים `sum` של array?  
    **תשובה צפויה:** `arr.reduce((a,b) => a+b, 0)`.  
    **נקודות:** 2  
    **שגיאה נפוצה:** loop עם `i <= arr.length`, או חוסר seed 0.  

25. **שאלה:** איך בודקים `unique count` של zugi/짝?  
    **תשובה צפויה:** `new Set(arr.filter(n => n%2===0)).size`.  
    **נקודות:** 2  
    **שגיאה נפוצה:** loop עם `if (visited.includes(...))`, או חוסר ב-Set.  

---

#### **TypeScript (3 שאלות)**  
26. **שאלה:** איך כותבים `interface Book` בלי `any`?  
    **תשובה צפויה:** `genre: 'SciFi'|'Drama'` (not string).  
    **נקודות:** 4  
    **שגיאה נפוצה:** `genre: string`, או `isAvailable: any`.  

27. **שאלה:** איך כותבים `filterByGenre<T>` עם `keyof T`?  
    **תשובה צפויה:** `items.filter(item => item[field] === value)`.  
    **نقודות:** 4  
    **שגיאה נפוצה:** `item[field as keyof T]` (בלי casting), או string literal.  

28. **שאלה:** איך מגדירים `type guard` `isValidPlayer`?  
    **תשובה צפויה:** `obj is Player` + typeof לכל שדה + undefined allowed for optional.  
    **נקודות:** 4  
    **שגיאה נפuada:** `obj as Player`, או חוסר ב-`undefined` check.  

---

#### **Debug & Setup (2 שאלות)**  
29. **שאלה:** איך מטפלים ב-CORS error אם `CLIENT_URL` לא מוגדר ב-backend?  
    **תשובה צפויה:** `cors({origin: process.env.CLIENT_URL})` – צריך להגדיר `CLIENT_URL=http://localhost:5173` ב-.env.  
    **נקודות:** 4  
    **שגיאה נפuada:** חוסר ב-env, או `origin: '*'` (安全? לא ב-checklist).  

30. **שאלה:** איך מטפלים ב-CSS that Tailwind `bg-red-500` לא מופיע?  
    **תשובה צפויה:** `Ctrl+Shift+R` + `rm -rf node_modules/.vite` + `npm run dev`.  
    **נקודות:** 4  
    **שגיאה נפuada:** `npm install tailwindcss` (לא פותר cache), או חוסר ב-cache busting.  

---

### ✅ מסקנות:  
- **שיטות ניקוד:** כל שאלות ה-pointing מותאמות לרובריקה המפורטת (2–4 נק' לפי מפת הסבירות המותאמת).  
- **שגיאות נפוצות:** נבחרו לפי דיווח הביקורת (למשל: `window.location.href`, `e.target.value` ישירות, חוסר ב-`new Error`, `origin: '*'`).  
- **הערות:**  
  - כל תשובה должна להתחיל ב-`expected answer` – לא בהגדרות.  
  - כל שאלה должна להימתך ב-timebox המפורט.  
  - **למשל:** אם student משתמש ב-`console.log()` ב-CORS – פסילה ל-0 נק'.  

**בהצלחה – תזכרו: backend before frontend, validations = grade.**

