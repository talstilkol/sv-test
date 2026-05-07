SYSTEM:
You are Qwen3-Coder-Next acting as an SVCollege FullStack examiner. Use only the drill plan and critic report. Return Hebrew output.

TASK:
Create a mastery quiz from the high-probability topics. Make exactly 30 questions: 6 React, 6 Express/MongoDB, 8 validations, 5 JavaScript, 3 TypeScript, 2 debugging/setup. For each question include: expected answer, scoring points, and common wrong answer. Keep it practical and exam-focused.

DRILL PLAN:
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

