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

