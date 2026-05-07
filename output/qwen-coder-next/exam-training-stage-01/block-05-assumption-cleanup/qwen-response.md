### טבלה: בדיקת טענות וסבירות מהתיאוריות למקור  
(סבירות = הסבירות שהנושא יידרש במבחן, לפי המקורות הרשמיים רק)

| טענה | עוצמת עדות | סיכון האלוצינציה | צריך לשמור/לשנות/להסיר | ניסוח מתוקן |
|------|------------|------------------|----------------------|-------------|
| סבירות 100% ל-`localStorage` | ❌ אין התייחסות ל-`localStorage` באף مصدر | ✅ גבוה – הוספה מוטעית (נראה מטיפוסים אישיים) | **הסר** | *לא מופיע בדרישות – לא נחוץ* |
| סבירות 100% ל-`error boundaries` (React, 40%) | ❌ נושא לא מוזכר כדרישה – רק `error/loading/empty states` | ✅ בינוני-גבוה – confusion בין error handling רגיל ל-`error boundaries` | **שנה ל-20% – bonus Only** | `20%: error boundaries (bonus – לא חובה)` |
| סבירות 100% ל-layout *לפי תמונה* (React, 90% → 85% באשכול הביקורת) | ❌ המקור מציין layout רלבנטי, לא דיוק מוחלט – SV Travel Log נרשמה עם layout פסוקי | ✅ נמוך – דוקא באשכול הביקורת נאמר ש-layout מדויק *לא חובה* | **שמור (85%), עם הערה** | `layout *סדר שדות* חשוב יותר מ-layout מדויק` |
| סבירות 100% ל-`/team/:teamName` (_routing דינמי)_ | ✅ מופיע במבחנים: SV Team Manager, SV Volunteer | ❌ נמוך – لكن לא מבקש routing דינמי *אחר* (כמו `/borrow/:id`) | **שמור (100%), עם הערה גבול** | `100%: `/team/:teamName` (רק这条路 דרור)` |
| סבירות 100% ל-`/borrow/:id` (_routing דינמי אחר)_ | ❌ המסמך מזכיר borrow *logoic* (האם ספר זמין), אבל לא path דינמי כדרישה | ✅ בינוני – confusion בין routing דינמי ל-logic של `/borrow` | **הסר/שנה ל-30%** | `30%: routing דינמי אחר (למשל `/borrow/:id`) – לא נחוץ` |
| סבירות 100% ל-`CLIENT_URL` ב-CORS (Setup) | ✅ מופיע ב-CORS checklist: `origin: process.env.CLIENT_URL` | ❌ נמוך – נאמר ב-source | **שמור (100%)** | `100%: `.env` עם `CLIENT_URL`, `cors` *לפני* `express.json()`` |
| סבירות 100% ל-`try/catch` בתוך filter route (Express) | ✅ נאמר: `try/catch`必须 בכל route (Checklist, Backend validation) | ❌ נמוך – נאמר במפורש | **שמור (100%)** | `100%: try/catch מסביב ל-query, return status 500 ב-catch` |
| סבירות 90% ל-`Confirm Password` (Validation) → 95% באשכול הביקורת | ✅ מופיע ב-SV Team Manager, SV Appointments כדרישה נפוצה וקריטית | ❌ נמוך – נאמר במפורש | **שמור (95%)** | `95%: Confirm Password validation – frontend + backend, message מדויק` |
| סבירות 100% ל-`throw new Error(msg)` (JS) | ✅ דוגמאות מדויקות ב-source: `throw new Error("Must be array")` | ❌ נמוך – נאמר במפורש | **שמור (100%)** | `100%: `throw new Error("Must be array")` – לא `throw Error(...)` בלא `new`` |
| סבירות 100% ל-state mutation validation (Validation section) | ❌ לא מופיע ב-source כ-`validation` – זה דפוס של TypeScript או React, לא validation | ✅ גבוה – הוספה מוטעית | **הסר** | *הוסר מה-validation – מומלץ ב-TypeScript/React sections* |
| סבירות 100% ל-layout order validation (Validation section) | ❌ לא מופיע ב-source – layout ≠ layout order (הערה באשכול הביקורת) | ✅ גבוה – confuse between UI and validation | **הסר** | *הוסר – layout order הוא עניין של UI, לא validation* |
| סבירות 40% ל-paginated, sort אוטומטי (Express) | ❌ Pagination never mentioned; sort only appears at 70% (not automatic) | ✅ בינוני – לא נ erwarten | **שנה ל-20% (bare minimum)** | `20%: pagination (bare minimum – לא נחוץ)` |
| סבירות 100% ל-`localStorage` ב-Modal (React, 70%) | ❌ לא מופיע ב-source – localStorage לא מוזכר כלל | ✅ גבוה – טענת אלוצינציה | **הסר** | *הוסר – localStorage לא נדרש* |
| סבירות 100% ל-`useNavigate` after success (React) | ✅ מופיע במבחנים (SV Team Manager, SV Library): "after success → navigate" | ❌ נמוך – נאמר במפורש באשכול הביקורת | **הוסף ל-100% (כחלק מ-react)** | `100%: `useNavigate` אחרי success (הוספה באשכול הביקורת)` |
| סבירות 100% ל-`type guard` (TS, 85% באשכול הביקורת) | ✅ מופיע ב-SV Appointments, SV Volunteer: `isValidPlayer` נפוץ | ❌ נמוך – נאמר במפורש | **שמור (85%)** | `85%: `type guard` (למשל `isValidPlayer`), לא חובה אבל נפוץ` |

---

### נושאים שסומנו כ-`Unknown/Unavailable` (אין עדות במקור):
| טענה | סיבתי | הסבר |
|------|-------|--------|
| `localStorage` (בכל המקומות) | ❌ לא מופיע באף源头 | לא מופיע ב-checklist, templates, או simulations |
| `state mutation validation` (ב-validation section) | ❌ לא מוגדר כחלק מ-validation | נוגע ל-TypeScript / React patterns – לא ל-validation כחלק מהציון |
| `layout order validation` | ❌ לא מופיע ב-source | לא קשור ל-validation; לא מוזכר ב-checklist |
| `decorators`, `namespace`, `mapped types` (TS) | ❌ לא מופיע ב-source | לא מוזכר באף מקום – רק `"סבירות 40%"` ללא נימוק |
| `pagination`, `sort automatic` | ❌ לא מופיע ב-source | לא מוזכר באף מקורות; pagination מופיעה רק באשכול הביקורת כ-20% |

---

### ✅ סיכום: נושאים **לא מותרים** בהגדרת המבחן הסופי (בהתאם למקור הרשמי)  
*לא מופיעים ב-source רשמי (checklist, templates, simulations), או נגזרו מטעות האלוצינציה*

- `localStorage` – **הוסר**
- `error boundaries` – **שונה ל-20% (bonus only)**
- `state mutation validation` – **הוסר**
- `layout order validation` – **הוסר**
- `decorators`, `namespace`, `mapped types` – **הוסרו**
- `pagination`, `sort automatic` – **שונו ל-20% (bare minimum – לא נחוץ)**

---

### ✅ סיכום: נושאים **מותרים** (הנוגעים ב-source רשמי) – לexam plan  
*הנושאים שנשארו ב-90%+ סבירות, או עם הערת גבול ברורה, לפי המקור*

#### 📦 React  
- `BrowserRouter`, `Routes`, `useNavigate`, `useParams`, `useState`, `useEffect`, controlled form, קומפוננטה משותפת Add/Edit  
- `search + toggle`, layout *סדר שדות*, error/loading/empty states (85%)  
- `useNavigate` אחרי success (100%)  
- Modal/Confirm dialog (60% – bonus)  

#### ⚙️ Express + MongoDB  
- `express.json()`, `cors` *לפני routes*, `CLIENT_URL`, `mongoose.connect`  
- GET/POST/PUT/DELETE, status codes, try/catch, validation backend+frontend  
- POST /filter + validation (95%)  
- בדיקת כפילות ב-code (teamName + name)  

#### 🔍 ולידציות  
- frontend + backend זוגיות  
- `required`, min/max, unique checking ב-code  
- regex (username lowercase, password strength), Confirm Password (95%)  
- validation enum (50%)  

#### ⚡ JavaScript  
- `Array.isArray`, `typeof === "number"`, `throw new Error(msg)`  
- search in array (filter), sum, unique counting  
- edge cases (empty, single)  

#### 🛠 TypeScript  
- `interface`, `type`, `Partial<Entity>`, `keyof`, avoid `any`  
- `React.FC<Props>`, `React.ChangeEvent`, generics basics  
- `type guard` (`isValidPlayer`) (85%)  

#### 🧪 Setup & Debug  
- `CORS` before routes, `CLIENT_URL`, `.env`, `express.json()`  
- Error handling ב-catch (status 500, no exposure)  
- Tailwind cache busting (50% – bonus)  

---

> **הערה סופית:**  
> כל נושא שסבירותו <50% (בלי הערת "bonus") **לא ייבדק במבחן** – לפי המסמך:  
> *"הסבירות נקבעה על סמך חזרות במבחנים, אך רק מה שרשום ב-source רשמי (Checklist, Templates) הוא חובה – остا שאר הוא bonus."*

