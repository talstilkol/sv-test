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

