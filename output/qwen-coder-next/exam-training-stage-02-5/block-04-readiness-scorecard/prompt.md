SYSTEM:
You are Qwen3-Coder-Next acting as a strict remediation scorekeeper. Return Hebrew output. Be conservative.

TASK:
Evaluate whether the Stage 2 weaknesses are now repaired enough to start Stage 3 Backend CRUD. Test yourself with 15 short questions: 5 regex, 5 TypeScript type guards, 5 evidence discipline. Answer and grade yourself. Then produce: score out of 100, pass/fail, remaining risks, mandatory carry-forward rules for Stage 3, and exact first Backend CRUD drill.

REGEX REPAIR:
הנה תרגול מומלץ ל**Stage 2 – Repair of Regex Weakness**, מותאם ל-SVCollege FullStack, ** conforme למדיניות הקשיחות של Stage 2** (ללא תבניות מומצאות, רק מהמקור הרשמי).

---

## ✅ **1. שדות שדורשים regex או pattern validation – מקורות רשמיים**

| שדה | דרישת Regex/Pattern | מקור ב-RUBRIC | נא לשים לב |
|-----|---------------------|---------------|------------|
| username | /^[a-z]+$/ – אותיות קטנות בלבד | ✅ Master Source – "Validation Regex Examples" | **strict regex** – לא משנים |
| password | 8–20 תווים, uppercase, digit, special char | ✅ Master Source – "Validation Regex Examples" | לא regex בודד – סדרת בדיקות |
| confirmPassword | `===` (not regex) | ✅ SV Appointments Checklist – "Dual-side validation" | **not pattern-based** – שווון פשוט |
| name (team name, player name) | /^[a-zA-Z]+( [a-zA-Z]+)*$/ – אנגלית, רווח *בין מילים* (אך לא כפול) | ✅ Source – "Validation Regex Examples", ✅ Mailing list example | **אסור לבלות**: לא `{2,}` – רק *בין מילים* |
| email | *not regex in source* | ❌ *not found in source* | **0% on regex claim** – בדוק ב-backend רק format generic (e.g., includes `@`) |
| year | `1900–2025` – **not regex** | ✅ JS/TS Drill – "Range validation" | בדיקת טווח → **type guard: `Number()` + comparison** |
| role/enum (e.g., department) | *enum check* – not regex | ✅ Master Source – "Enum validation" | **backend: `if (!["A","B"].includes(role))`** |
| phone / car number | *not specified* | ❌ *not found in source* | **0% on regex claim** – אם נדרש במתן, רשם "pattern: digits only" |

> 📌 **Policy – לא לומדים regex אקראי – רק זה שרשום!**  
> אם אין regex במصدر – **אסור לרשום regex מומצא**. יש לרשום ב-backend: `"Digits only"` or `"Alphabet + spaces"` + בדיקת regex *אם* יש ב-source.

---

## ✅ **2. Source-backed vs Inferred Validation**

| סוג validation | Source-backed? | הוכחה | הערות |
|----------------|----------------|--------|--------|
| `username: /^[a-z]+$/` | ✅ | Master Source – "Validation Regex Examples" | **must use exactly this regex** |
| `password` validation | ✅ (not regex-only) | Master Source – "8–20 chars, uppercase, digit, special char" | **4 separate checks**, no single regex |
| `name` (composed) | ✅ | Same source + examples like `"Maccabi tel Aviv"` ✅, `"haPoel  Jerusalem"` ❌ | **single space only** – regex מדויק: `^[a-zA-Z]+( [a-zA-Z]+)*$` |
| `email` format | ❌ | *not found* | must **not** claim regex |
| `enum` field | ✅ | Master Source + SV Appointments Checklist | **not regex – `includes()` check** |
| `year range` | ✅ | JS Drill – "Range validation" | **no regex – `type Number() && min/max`** |

> 📌 **Rule:**  
> *אם הדרישה מפרטת את התנאי מילולית (למשל: "שם עם שתי מילים, כל מילה באות גדולה") – **אסור להמציא regex** אלא רק לממש את התנאי. אם המ出处 מפרט regex במדויק – יש לאמץ אותו.*

---

## ✅ **3. Frontend Validation Helper Shape**

```ts
// validationHelpers.ts (לפי TypeScript Checklist – "Validation Utilities")
// Only regex patterns **explicitly in source** are exported.
export const regexes = {
  username: /^[a-z]+$/,                         // Master Source
  name: /^[a-zA-Z]+( [a-zA-Z]+)*$/,             // Master Source + SV Team examples
};

export const validators = {
  // Not regex – dual-side
  password: (val: string): string => {
    if (val.length < 8 || val.length > 20) return "8–20 chars";
    if (!/[A-Z]/.test(val)) return "Must include uppercase";
    if (!/[0-9]/.test(val)) return "Must include digit";
    if (!/[!@#$%^&*]/.test(val)) return "Must include special char";
    return "";
  },
  
  confirmPassword: (pwd: string, confirm: string): string => {
    return pwd === confirm ? "" : "Passwords do not match";
  },

  // range, not regex
  year: (val: string): string => {
    const num = Number(val);
    if (isNaN(num)) return "Must be a number";
    if (num < 1900 || num > 2025) return "Year must be 1900–2025";
    return "";
  },

  // enum, not regex
  role: (val: string): string => {
    const validRoles = ["admin", "volunteer", "member"] as const;
    return validRoles.includes(val as const) ? "" : "Invalid role";
  },
};
```

### Frontend form shape (React):
```tsx
// e.g., AddUserForm.tsx
import { validators, regexes } from "../validationHelpers";

function AddUserForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function validateName() {
    if (!regexes.name.test(name)) {
      return "Name must be letters only, max 2 words (space between)";
    }
    return "";
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validateName() || validators.confirmPassword(...);
    if (err) { setError(err); return; }
    // submit...
  }

  return (
    <form onSubmit={onSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      {error && <p className="text-red">{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

> ✅ **Frontend rule:**  
> - כל regex ישמש *רק* אם מופיע במصدر.  
> - כל validation אחר (enum, range, match) → **not regex**.

---

## ✅ **4. Backend Guard Shape**

```js
// middlewares/validateUser.js
import { validators, regexes } from "../validationHelpers.js";

const validateUserInput = (req, res, next) => {
  const { name, password, confirmPassword, role } = req.body;

  // username/name – strict regex match
  if (!regexes.name.test(name)) {
    return res.status(400).json({ error: "Invalid name format" });
  }

  // password – full check (no single regex)
  const pwdErr = validators.password(password);
  if (pwdErr) {
    return res.status(400).json({ error: pwdErr });
  }

  // confirmPassword – string equality
  if (confirmPassword !== password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // role – enum (not regex!)
  const validRoles = ["admin", "volunteer", "member"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  next();
};

export default validateUserInput;
```

> ✅ **Backend rule:**  
> - **never trust frontend regex alone**  
> - all regex checks must be duplicated **exactly** in backend  
> - for non-regex validations (enum, range) – use direct JS checks

---

## ✅ **5. 12 Drill Questions + Answers**

### ⚙️ **Regex & Patterns – Source-backed only**

| # | שאלה | תשובה | ניקוד / הסבר |
|---|------|-------|-------------|
| 1 | Write the *exact* regex for a **lowercase-only username**, per SVCollege source. | `/^[a-z]+$/` | ✅ 100% – matches source verbatim |
| 2 | Write the *exact* regex for a **two-word team name in English**, space-only *between* words. | `/^[a-zA-Z]+( [a-zA-Z]+)*$/` | ✅ – matches `"Maccabi tel Aviv"` ✅, `"haPoel  Jerusalem"` ❌ |
| 3 | Can you use `email` regex from the source? | ❌ No – *not found in source*. Use generic `includes("@")` or no pattern. | ⚠️ 0% – do not invent |
| 4 | Write a regex to validate a **numeric car number with exactly 8 digits**. | ❌ *not found in source*. Do not use regex. Use `/^\d{8}$/` only *if* required explicitly. | ⚠️ 0% – no source |
| 5 | Is `password` validated with a *single* regex? | ❌ No – 4 checks (length, uppercase, digit, special char). | ✅ 100% – matches source wording |
| 6 | Which validation is **not regex-based**: `role`, `year`, `confirmPassword`? | All three: `role` → enum, `year` → range, `confirmPassword` → `===` | ✅ 100% – no regex here |
| 7 | Must frontend regex match backend *exactly*? | ✅ Yes – both must use *same pattern*. | ✅ 100% – dual-side validation requirement |
| 8 | What regex validates `"John Doe"` but rejects `"John  Doe"` (2 spaces)? | `/^[a-zA-Z]+( [a-zA-Z]+)*$/` | ✅ – exactly the source example |
| 9 | Can you use `/^[a-zA-Z]+$/` for `username`? | ❌ No – source requires *lowercase only*. | ✅ – matches source precision |
| 10 | What is the validation rule for `year` field? | Must be a number in range `1900`–`2025` (no regex). | ✅ – JS Drill – "Range validation" |
| 11 | If source says `name: /^[a-zA-Z]+( [a-zA-Z]+)*$/`, is `/^[a-z]+$/` acceptable? | ❌ No – case sensitivity mismatch. | ✅ – source enforces case |
| 12 | Is there a regex for `Confirm Password`? | ❌ No – it’s a string equality check. | ✅ – dual-side validation rule |

> ✅ **Grading note:**  
> - אם השובע לא מצוין במصدر – תן 0%.  
> - אם הושג `0%`, תרשום: `not found in source`.

---

## ✅ **6. Zero-Credit Traps (⚠️ avoid)**

| Trap | ניסוח לא מותר | ניסוח מותר | הערה |
|------|----------------|------------|-------|
| Regex invention | `"Use regex like /^[a-z0-9]+$/"` | `*not specified in source* – use generic validation only` | ⚠️ 0% |
| Unclear regex | `"name: /^[a-zA-Z ]+/$"` | `name: /^[a-zA-Z]+( [a-zA-Z]+)*$/` (exactly as source) | ⚠️ 0% |
| Mixed validation | `"Validate email with regex"` | `"Email: no regex – validate presence & '@' in backend"` | ✅ – no regex claim |
| Inferred rules | `"Should use camelCase"` | `*not required by source* – only field validations are specified` | ⚠️ 0% |
| Overengineering | `"Use zod/schema"` | `*not required* – use manual validation per source` | ⚠️ 0% |
| Ambiguous words | `"must validate username"` | `username: /^[a-z]+$/ – per Master Source, Section 8` | ✅ – source-backed |

> 📌 **Policy:**  
> *Every regex must be explicitly quoted from the source.*  
> *If not quoted – say: `pattern not specified in source → use manual validation`.*

---

## ✅ **7. Policy to Avoid Inventing Regex**

### 🔒 **Stage 2 – Regex Compliance Rulebook**

| # | Rule | Source | Penalty for Violation |
|---|------|--------|-----------------------|
| 1 | Only use regex *explicitly quoted* in Master Source | ✅ Master Source, "Validation Regex Examples" | `0%` – **no partial credit** |
| 2 | Never use `*` or `+` in regex unless quoted | ✅ Same | `0%` |
| 3 | If a field doesn’t have a regex, *do not write one* – use manual validation | ✅ SV Appointments Checklist, "Dual-side validation" | `0%` – **invention = zero credit** |
| 4 | `confirmPassword`, `enum`, `range` – never regex | ✅ JS Drill, "Validation Patterns" | `0%` |
| 5 | If source says `"English only"`, *do not assume lowercase* – use `/^[a-zA-Z]+$/` | ✅ Examples: `"Maccabi tel Aviv"` | `0%` |
| 6 | Never assume `email` has a regex | ✅ Not found in source | `0%` – no claim allowed |
| 7 | For composed names (e.g., `"John Doe"`), use **exactly** `/^[a-zA-Z]+( [a-zA-Z]+)*$/` | ✅ Master Source + examples | `+5%` if perfect match |

### 🛡️ **Enforcement Policy**
- **All regex must be copied *exactly* from source.**
- **If unsure – mark `pattern not found in source`.**
- **Do not use AI to generate regexes – violates Stage 2 strictness.**

> ✅ **Final Note:**  
> **"אין regex חסר – אין שום regex."**  
> **אם זה לא מופיע ב-source – לא רושמים, לא מתרגלים, לא מזכירים.**  
> — SVCollege FullStack Exam NotebookLM Source, Section 0.1

---

## 🏁 **Summary – Stage 2 Regex Repair**

| Field | Regex | Source | Status |
|-------|-------|--------|--------|
| `username` | `/^[a-z]+$/` | ✅ | ✅ Exact match |
| `name` | `/^[a-zA-Z]+( [a-zA-Z]+)*$/` | ✅ | ✅ Exact match |
| `password` | (4 checks) | ✅ | ✅ Not regex |
| `confirmPassword` | `===` | ✅ | ✅ No regex |
| `email` | ❌ | ❌ | ⚠️ *not found* – no regex |
| `year` | (range) | ✅ | ✅ Not regex |
| `role` | (enum) | ✅ | ✅ Not regex |

✅ **Stage 2 regex weakness repaired.**  
✅ **All validations are now source-backed.**  
✅ **Regex inventing fully prohibited.**  
✅ **Ready for Stage 3 (only after mastery drills).**

> 📌 **Next step:**  
> Perform **JS Drill 4 – Regex Patterns** and **TS Drill 2 – Type Utilities**  
> before proceeding to Stage 3 backend.

--- 

**👨‍🏫 Qwen3-Coder-Next – Regex Mastery Drill (Stage 2) complete.**  
**🔒 All regex claims are source-backed. No inventions. Zero-credit traps documented.**



TS REPAIR:
```typescript
// ✅ TS Drill 2 – Type Utilities & Type Guards Mastery (Stage 2 Repair)
// source-backed strictly – per Master Source, "TypeScript - דפוסי שאלות", ו-TypeScript Checklist – "Type Guards for Filters"

// ------------------------------------------------------------
// 📦 PART 1: INTERFACES, TYPES, Partial<Entity>, keyof – Source-Backed
// ------------------------------------------------------------

// ✅ Source-backed interfaces – exactly per Master Source examples:
interface Book {
  _id: string;
  title: string;
  author: string;
  year: number;
  genre: "Fiction" | "Science" | "History" | "Biography";
  isAvailable: boolean;
  borrowedBy?: string;
}

interface Member {
  _id: string;
  name: string;
  email: string;
  joinDate: string; // ISO string
  isActive: boolean;
  membershipType: "basic" | "premium";
}

interface Appointment {
  _id: string;
  doctorName: string;
  date: string; // ISO string
  memberName: string;
  department: "Family" | "Children" | "Orthopedics" | "Eyes";
  status: "confirmed" | "cancelled" | "completed";
  price: number;
}

// ✅ Partial<Entity> – per Master Source, Section 7: "TypeScript – דפוסי שאלות"
// used for filters and updates
type BookFilter = Partial<Pick<Book, "title" | "author" | "year" | "genre" | "isAvailable">>;
type MemberFilter = Partial<Pick<Member, "name" | "email" | "isActive" | "membershipType">>;
type AppointmentFilter = Partial<Pick<Appointment, "doctorName" | "date" | "memberName" | "department" | "status">>;

// ✅ keyof – source-backed usage per TypeScript Checklist – "Type Guards for Filters"
type BookKey = keyof Book; // "_id" | "title" | "author" | "year" | "genre" | "isAvailable" | "borrowedBy"
type MemberKey = keyof Member; // "_id" | "name" | "email" | "joinDate" | "isActive" | "membershipType"
type AppointmentKey = keyof Appointment; // "_id" | "doctorName" | "date" | "memberName" | "department" | "status" | "price"

// ✅ Generic filter helper – per TypeScript Checklist & Master Source examples
function filterByPartial<T extends Record<string, unknown>>(
  items: T[],
  filters: Partial<T>
): T[] {
  if (!Array.isArray(items)) throw new Error("Must be array");
  return items.filter((item) => {
    for (const key in filters) {
      if (filters[key] !== undefined) {
        if (item[key] !== filters[key]) return false;
      }
    }
    return true;
  });
}

// ------------------------------------------------------------
// 📦 PART 2: TYPE GUARDS – obj is T – source-backed syntax
// ------------------------------------------------------------
// ✅ Type Guard for Book – per TypeScript Checklist – "Type Guards for Filters"
function isBook(obj: unknown): obj is Book {
  if (typeof obj !== "object" || obj === null) return false;
  const book = obj as Book;
  return (
    typeof book._id === "string" &&
    typeof book.title === "string" &&
    typeof book.author === "string" &&
    typeof book.year === "number" &&
    ["Fiction", "Science", "History", "Biography"].includes(book.genre) &&
    typeof book.isAvailable === "boolean"
  );
}

// ✅ Type Guard for Member – per TypeScript Checklist – "Type Guards for Filters"
function isMember(obj: unknown): obj is Member {
  if (typeof obj !== "object" || obj === null) return false;
  const member = obj as Member;
  return (
    typeof member._id === "string" &&
    typeof member.name === "string" &&
    typeof member.email === "string" &&
    typeof member.joinDate === "string" &&
    typeof member.isActive === "boolean" &&
    ["basic", "premium"].includes(member.membershipType)
  );
}

// ✅ Type Guard for Appointment – per TypeScript Checklist – "Type Guards for Filters"
function isAppointment(obj: unknown): obj is Appointment {
  if (typeof obj !== "object" || obj === null) return false;
  const appt = obj as Appointment;
  return (
    typeof appt._id === "string" &&
    typeof appt.doctorName === "string" &&
    typeof appt.date === "string" &&
    typeof appt.memberName === "string" &&
    ["Family", "Children", "Orthopedics", "Eyes"].includes(appt.department) &&
    ["confirmed", "cancelled", "completed"].includes(appt.status) &&
    typeof appt.price === "number"
  );
}

// ------------------------------------------------------------
// 📦 PART 3: TYPE GUARD USAGE IN FILTERS – source-backed
// ------------------------------------------------------------
// ✅ Type guard + keyof in filter – per TypeScript Checklist – "Type Guards for Filters"
type ValidKey<T> = keyof T;
function safeFilterBy<T extends Record<string, unknown>>(
  items: T[],
  key: ValidKey<T>,
  value: unknown
): T[] {
  if (!Array.isArray(items)) throw new Error("Must be array");
  return items.filter((item) => item[key] === value);
}

// ✅ Filter with type guard – per Master Source examples
function filterBooksByGenre(books: Book[], genre: Book["genre"]): Book[] {
  if (!Array.isArray(books)) throw new Error("Must be array");
  return books.filter(isBook).filter((book) => book.genre === genre);
}

// ------------------------------------------------------------
// 📦 PART 4: ERROR HANDLING – Array.isArray + throw Error – per JS Checklist
// ------------------------------------------------------------
// ✅ Type guard + validation – per JS Checklist – "Validation Patterns"
function getMemberById(members: unknown[], id: string): Member | undefined {
  if (!Array.isArray(members)) throw new Error("Must be array");
  for (const m of members) {
    if (!isMember(m)) continue;
    if (m._id === id) return m;
  }
  return undefined;
}

function getAppointmentByDoctor(appointments: unknown[], doctor: string): Appointment[] {
  if (!Array.isArray(appointments)) throw new Error("Must be array");
  return appointments.filter(isAppointment).filter((appt) => appt.doctorName === doctor);
}

// ------------------------------------------------------------
// 📦 PART 5: 10 QUESTIONS + ANSWERS + TRAPS (TypeScript – 10 נק')
// ------------------------------------------------------------
// * Policy: כל תשובה חייבת להיעזר במקור. אם אין – 0% + הערה *not found in source*.

const questions: {
  question: string;
  correctAnswer: string;
  trap: string;
  sourceRef: string;
  points: number;
}[] = [
  {
    question: "הצג interface for Book לפי המنشأ (Master Source – Section 7).",
    correctAnswer:
      "interface Book {\n  _id: string;\n  title: string;\n  author: string;\n  year: number;\n  genre: 'Fiction' | 'Science' | 'History' | 'Biography';\n  isAvailable: boolean;\n  borrowedBy?: string;\n}",
    trap: "השתמש ב-type במקום interface.",
    sourceRef: "Master Source – TypeScript – דפוסי שאלות, Section 7",
    points: 1,
  },
  {
    question: "מה הסינטкс ל-Type Guard שמאפשר ל-`items.filter()` לדייק את הטיפוס ל-Book?",
    correctAnswer:
      "function isBook(obj: unknown): obj is Book { ... }",
    trap: "הצג `function isBook(obj: Book): boolean`.",
    sourceRef: "TypeScript Checklist – Type Guards for Filters",
    points: 1,
  },
  {
    question: "כתוב את ה-Type Guard `isMember` according to the source-backed interface.",
    correctAnswer:
      "function isMember(obj: unknown): obj is Member {\n  if (typeof obj !== 'object' || obj === null) return false;\n  const member = obj as Member;\n  return typeof member._id === 'string' && typeof member.isActive === 'boolean';\n  // …其余 fields\n}",
    trap: "אין בדיקת typeof对 `obj`.",
    sourceRef: "TypeScript Checklist – Type Guards for Filters",
    points: 1,
  },
  {
    question: "הצג את ה-Type Utility לשימוש ב-`filter` עם Partial של `Appointment`.",
    correctAnswer: "type AppointmentFilter = Partial<Appointment>;",
    trap: "Use `Partial<Appointment>` directly in function signature.",
    sourceRef: "Master Source – TypeScript – דפוסי שאלות, Section 7",
    points: 1,
  },
  {
    question: "מה ה-Type של `keyof Book`?",
    correctAnswer: `" _id" | "title" | "author" | "year" | "genre" | "isAvailable" | "borrowedBy"`,
    trap: "הצג `string`.",
    sourceRef: "TypeScript Checklist – keyof",
    points: 1,
  },
  {
    question: "הצג generic function `filterByPartial<T>` According to source-backed usage.",
    correctAnswer:
      "function filterByPartial<T extends Record<string, unknown>>(items: T[], filters: Partial<T>): T[] { ... }",
    trap: "Use `any` instead of `Record<string, unknown>`.",
    sourceRef: "TypeScript Checklist – Generics",
    points: 1,
  },
  {
    question: "הצג פונקציה שמקבלת `members: unknown[]` ומחזירה `Member | undefined` עם throw Error.",
    correctAnswer:
      "function getMemberById(members: unknown[], id: string): Member | undefined { if (!Array.isArray(members)) throw new Error('Must be array'); ... }",
    trap: "הצג `members: Member[]` directly.",
    sourceRef: "JS Checklist – Validation Patterns",
    points: 1,
  },
  {
    question: "האם `Partial<Entity>` מייצר טיפוס קבוצתי של כל השדות האופציונליים?",
    correctAnswer: "כן – כל השדות הופכים לאופציונליים.",
    trap: "הצג 'לא – רק שדה אחד'.",
    sourceRef: "Master Source – TypeScript – דפוסי שאלות",
    points: 1,
  },
  {
    question: "הצג type guard ל-`Appointment.status` עם enum values from source.",
    correctAnswer: "function isValidStatus(s: unknown): s is Appointment['status'] { return ['confirmed', 'cancelled', 'completed'].includes(s as string); }",
    trap: "הצג `status: 'confirmed' | 'cancelled' | 'completed'` כ-Type guard.",
    sourceRef: "SV Appointments Checklist – Enum validation",
    points: 1,
  },
  {
    question: "מה ה-Type של `year: keyof Book`?",
    correctAnswer: `"year": Book['year'] // number`,
    trap: "הצג `string`.",
    sourceRef: "TypeScript Checklist – keyof",
    points: 1,
  },
];

// ------------------------------------------------------------
// 📦 PART 6: ZERO-CREDIT TRAPS (Policy: 0% for un-backed claims)
// ------------------------------------------------------------
const zeroCreditTraps: {
  trap: string;
  correctResponse: string;
  sourceRef: string;
}[] = [
  {
    trap: "השתמש ב-Type Guard `obj: Book` – לא `obj is Book`.",
    correctResponse: "אסור – ה-Type Guard חייב להיות `obj is Book` (not `obj: Book`).",
    sourceRef: "TypeScript Checklist – Type Guards for Filters",
  },
  {
    trap: "השתמש ב-`Partial<Book>` עם `isAvailable: true` כ-boolean directly – לא ניקוד.",
    correctResponse: "אסור – `Partial<Book>` הופך את כל השדות לאופציונליים, אך לא מבטיח את הערך הנכון – יש להשתמש ב-Type Guard.",
    sourceRef: "TypeScript Checklist – Partial<Entity>",
  },
  {
    trap: "השתמש ב-`any` ב-filters.",
    correctResponse: "אסור – מחייב `T extends Record<string, unknown>`.",
    sourceRef: "TypeScript Checklist – Generics",
  },
  {
    trap: "השתמש ב-Type Guard בלי Array.isArray + throw Error.",
    correctResponse: "אסור – חובה: בדיקת מערך + throw Error.",
    sourceRef: "JS Checklist – Validation Patterns",
  },
  {
    trap: "השתמש ב-Type Guard עם `keyof` בלי `Record<string, unknown>`.",
    correctResponse: "אסור – `keyof` מחייב `Record<string, unknown>`.",
    sourceRef: "TypeScript Checklist – keyof",
  },
  {
    trap: "השתמש ב-Type Guard בלי בדיקת null/undefined.",
    correctResponse: "אסור – חובה: `if (typeof obj !== 'object' || obj === null)`.",
    sourceRef: "TypeScript Checklist – Type Guards for Filters",
  },
  {
    trap: "השתמש ב-Type Guard עם enum כ-Type ולא כ-Type Guard.",
    correctResponse: "אסור – enum validation חייבת Type Guard (not just Type alias).",
    sourceRef: "SV Appointments Checklist – Enum validation",
  },
  {
    trap: "השתמש ב-`interface Book = ...`.",
    correctResponse: "אסור – interface must be declared with `interface` keyword.",
    sourceRef: "Master Source – TypeScript – דפוסי שאלות",
  },
  {
    trap: "השתמש ב-`Partial<Member>` בלי Type Guard.",
    correctResponse: "אסור – `Partial<Member>` alone doesn’t validate types at runtime.",
    sourceRef: "TypeScript Checklist – Partial<Entity>",
  },
  {
    trap: "השתמש ב-Type Guard בלי throw Error.",
    correctResponse: "אסור – חובה: throw new Error() for invalid input.",
    sourceRef: "JS Checklist – Validation Patterns",
  },
];

// ------------------------------------------------------------
// 📦 PART 7: POLICY (Mandatory for Stage 2)
// ------------------------------------------------------------
const policy = {
  name: "TypeScript Type Guard Policy – Stage 2",
  rules: [
    {
      rule: "1. כל Type Guard חייב להיות `obj is T` (not `obj: T`).",
      penalty: "0% – un-backed syntax",
      sourceRef: "TypeScript Checklist – Type Guards for Filters",
    },
    {
      rule: "2. כל Type Guard חייב בדיקת `typeof obj !== 'object' || obj === null`.",
      penalty: "0% – un-backed guard",
      sourceRef: "TypeScript Checklist – Type Guards for Filters",
    },
    {
      rule: "3. כל פונקציה שמקבלת `unknown[]` חייבת `Array.isArray` + `throw Error`.",
      penalty: "0% – un-backed validation",
      sourceRef: "JS Checklist – Validation Patterns",
    },
    {
      rule: "4. כל Type Utility (`Partial<T>`, `keyof`, `Record<string, unknown>`) חייב_source-backed usage.",
      penalty: "0% – un-backed utility",
      sourceRef: "Master Source – TypeScript – דפוסי שאלות",
    },
    {
      rule: "5. אם הדרישה לא מפרטת Type Guard – אין להשתמש בו.",
      penalty: "0% – un-backed pattern",
      sourceRef: "TypeScript Checklist – Type Guards for Filters",
    },
  ],
  enforcement: "Policy enforced strictly. Violation = 0% + note: *not found in source*.",
};

// ------------------------------------------------------------
// 📦 PART 8: SUMMARY – Stage 2 Repair – TypeScript
// ------------------------------------------------------------
const summary = {
  status: "✅ TypeScript Type Guard Weakness Repaired",
  keyPoints: [
    "✅ All interfaces, types, and guards are source-backed (Master Source, TypeScript Checklist).",
    "✅ Type guards use `obj is T` (not `obj: T`).",
    "✅ `Partial<Entity>` used for filters (source-backed per Master Source).",
    "✅ `keyof` used with `T extends Record<string, unknown>` (source-backed per TypeScript Checklist).",
    "✅ `Array.isArray` + `throw Error` for validation (source-backed per JS Checklist).",
    "✅ 10 Questions + 10 Zero-Credit Traps with source-backed answers.",
    "✅ Policy enforced: every claim must reference source.",
  ],
  nextStep: "Perform TypeScript Mastery Drill (10 questions) before Stage 3.",
  finalNote: "TypeScript is not optional – 10 points. Source-backed only.",
};

// Export for use in drills
export {
  Book,
  Member,
  Appointment,
  BookFilter,
  MemberFilter,
  AppointmentFilter,
  BookKey,
  MemberKey,
  AppointmentKey,
  filterByPartial,
  isBook,
  isMember,
  isAppointment,
  safeFilterBy,
  getMemberById,
  getAppointmentByDoctor,
  questions,
  zeroCreditTraps,
  policy,
  summary,
};
```



EVIDENCE DISCIPLINE:
```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>תרגול אכיפת הוכחות - Stage 3</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      direction: rtl;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
      color: #333;
    }
    h1, h2 {
      text-align: center;
      color: #2c3e50;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      background-color: white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: right;
    }
    th {
      background-color: #34495e;
      color: white;
      position: sticky;
      top: 0;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    .source-backed { background-color: #d4edda; color: #155724; }
    .inferred { background-color: #fff3cd; color: #856404; }
    .weak { background-color: #fce4ec; color: #721c24; }
    .false { background-color: #f8d7da; color: #721c24; }
    .unknown { background-color: #e2e3e5; color: #383d41; }
    .qwen-safe {
      font-style: italic;
      font-size: 0.9em;
      color: #555;
    }
    .policy-box {
      background-color: #e7f3fe;
      border-left: 5px solid #2196F3;
      padding: 15px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1>תרגול אכיפת הוכחות: תיקון טענות מוטות סמוך</h1>
  <p>תרגול זה בודק יכולת זיהוי של טענות לא מושענות או חסרות הוכחה. כל טענה מוקלדת כ-<code>claim</code> ואחריה דירוג לפי הסדר: <strong>מושען ממקור</strong>, <strong>הסקה</strong>, <strong>הוכחה חלשה</strong>, <strong>שגוי</strong>, או <strong>לא ידוע/לא זמין</strong>.</p>
  
  <table>
    <thead>
      <tr>
        <th>מזהה</th>
        <th>claim</th>
        <th>דירוג הוכחות</th>
        <th>ניסוח בטוח ל-Qwen (עתיד)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><code>cors()</code> חייב להופיע לפני <code>express.json()</code> ב-Express</td>
        <td class="source-backed">מושען ממקור</td>
        <td class="qwen-safe">" согласно התבנית הרשמית (Backend Template, lines 3-4), `cors()` חייב להיות *לפני* `express.json()`."</td>
      </tr>
      <tr>
        <td>2</td>
        <td><code>localStorage</code> מומלץ לשימור tokens ב-SPA</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">"*not found in source* - לא מוזכר בחומר המותר (Allowed Prep). אסורה כל אominion להצעה זו."</td>
      </tr>
      <tr>
        <td>3</td>
        <td><code>BrowserRouter</code> הוא ה-routing היחידי אפשרי ב-React Router</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">"*not found in source* - השם המדויק הוא `BrowserRouter` (אינו מוחלף). לא מומלץ על alternatives."</td>
      </tr>
      <tr>
        <td>4</td>
        <td><code>VITE_API_URL</code> הוא משתנה environment שחייב להיות מוגדר</td>
        <td class="inferred">הסקה</td>
        <td class="qwen-safe">"`import.meta.env.VITE_API_URL` מוזכר ב-frontend template. אם חסר - ניחא ב-[not found in source]."</td>
      </tr>
      <tr>
        <td>5</td>
        <td>ה-validation של confirm Password יכול להתבצע רק ב-frontend</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" согласно SV Appointments Checklist – 'Dual-side validation', Validation *חייב* להיות גם ב-backend."</td>
      </tr>
      <tr>
        <td>6</td>
        <td>ה-status code 404 מוצג כשאובדן אובייקט ב-MongoDB</td>
        <td class="source-backed">מושען ממקור</td>
        <td class="qwen-safe">" согласno Master Source – Status Codes, `404` הוא ל-[not found], `400` ל-[validation]."</td>
      </tr>
      <tr>
        <td>7</td>
        <td>regex ל-username הוא /^[a-zA-Z]+$/
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Source מציין `/^[a-z]+$/` (אותיות קטנות *רק*). כל other regex שגוי."</td>
      </tr>
      <tr>
        <td>8</td>
        <td><code>type guard</code> ב-TypeScript חייב להשתמש ב-syntax <code>obj is T</code></td>
        <td class="source-backed">מושען ממקור</td>
        <td class="qwen-safe">" TypeScript Checklist – 'Type Guards for Filters' מחייב `obj is T` (אסור `obj: T`)."</td>
      </tr>
      <tr>
        <td>9</td>
        <td>ה-spinner (loading) הוא חובה לחוית משתמש</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">"*not found in source* - לא חובה (לפי RUBRIC, עדיפות ל-[functionality] על [UX])."</td>
      </tr>
      <tr>
        <td>10</td>
        <td>ה-cors middleware מוצב אחרי ה-routes</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Backend Template מראה את `app.use(cors())` *לפני* ה-[routes]."</td>
      </tr>
      <tr>
        <td>11</td>
        <td>ה-state mutation מותרת אם היא פנימית לקומפוננטה</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Cleanup Notes ממחיש: *אסור* mutation of state. תמיד `setItems([...items, item])`."</td>
      </tr>
      <tr>
        <td>12</td>
        <td><code>Array.isArray</code> היא דרך מומלצת לבדוק קלט ב-JS</td>
        <td class="source-backed">מושען ממקור</td>
        <td class="qwen-safe">" JS Checklist – 'Validation Patterns' מחייב `Array.isArray`_before processing."</td>
      </tr>
      <tr>
        <td>13</td>
        <td>ה-email validation חייב regex מתקדם</td>
        <td class="unknown">לא ידוע/לא זמין</td>
        <td class="qwen-safe">"*not found in source* - email validation *אינה* regex. ב-backend: `includes('@')`."</td>
      </tr>
      <tr>
        <td>14</td>
        <td>ה-backend חייב לספק 201 ל-POST מוצלח</td>
        <td class="source-backed">מושען ממקור</td>
        <td class="qwen-safe">" Master Source – Status Codes: `201` ל-[created], `200` ל-[success]."</td>
      </tr>
      <tr>
        <td>15</td>
        <td><code>Partial<Entity></code> הופך את כל השדות לאופציונליים</td>
        <td class="source-backed">מושען ממקור</td>
        <td class="qwen-safe">" Master Source – TypeScript, Section 7: `Partial<Entity>` → כל השדות become optional."</td>
      </tr>
      <tr>
        <td>16</td>
        <td>ה-regex ל-name הוא /^[a-z]+$/</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Source מציין `/^[a-zA-Z]+( [a-zA-Z]+)*$/` (uppercase * Allowed, space * between words)."</td>
      </tr>
      <tr>
        <td>17</td>
        <td>ה-enum validation יכול להתבצע רק ב-frontend</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Master Source + SV Appointments Checklist: enum validation *חייב* backend."</td>
      </tr>
      <tr>
        <td>18</td>
        <td><code>useParams</code> משמש לאחזור ערכים מה-query string</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Source ממחיש `useParams` ל-[route params] (למשל /:id). ל-[query string] יש `URLSearchParams`."</td>
      </tr>
      <tr>
        <td>19</td>
        <td>ה-type guard ב-TypeScript יכול להיות פשוט <code>typeof</code></td>
        <td class="unknown">לא ידוע/לא זמין</td>
        <td class="qwen-safe">"*not found in source* - Type Guard (obj is T) ≠ Type Assertion (obj as T)."</td>
      </tr>
      <tr>
        <td>20</td>
        <td>ה-cors middleware מוצב אחרי express.static()</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Backend Template order: cors → express.json() → express.static() → routes."</td>
      </tr>
      <tr>
        <td>21</td>
        <td>ה-validation של username כולל בדיקת אורך מינימלי</td>
        <td class="inferred">הסקה</td>
        <td class="qwen-safe">" Source מציין `/^[a-z]+$/` (אורך 1+). אם דרישה מפרטת 3+ - זה *bonus*."</td>
      </tr>
      <tr>
        <td>22</td>
        <td>ה-error handling ב-backend חייב להחזיר 500 בכל מקרה</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Source מחלק: `400` ל-[validation error], `500` ל-[server error]."</td>
      </tr>
      <tr>
        <td>23</td>
        <td>ה-regex ל-password הוא /^[a-zA-Z0-9!@#$%^&*]+$/
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Source לא מציין regex בודד. מפורט: `8-20 chars`, uppercase, digit, special char."</td>
      </tr>
      <tr>
        <td>24</td>
        <td>ה-backend יכול לסמוך על ה-validation של ה-frontend</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Dual-side validation *חייבת* – backend חייב לאמת *בכל* מקרה."</td>
      </tr>
      <tr>
        <td>25</td>
        <td>ה-routes ב-express doivent להיות מוצבים לפני express.json()</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Backend Template: middleware order is `cors` → `json` → `static` → `routes`."</td>
      </tr>
    </tbody>
  </table>

  <div class="policy-box">
    <h2>מדיניות מעבר - Stage 3 Backend CRUD</h2>
    <p><strong>Policy Qwen must enforce for all Stage 3 tasks:</strong></p>
    <ul>
      <li><strong>1. Source-backed only:</strong> כל claim חייב להופיע במصدر (Checklist, Template, Simulation). אם לא – `not found in source`.</li>
      <li><strong>2. Validation order:</strong> validation *תמיד* ב-backend. אסורה אמונה ב-frontend.</li>
      <li><strong>3. Regex:</strong> רק regex *מפורש* במصدر. אם לא מופיע – `not found in source`.</li>
      <li><strong>4. Type guards:</strong> syntax * חייב* להיות `obj is T`.</li>
      <li><strong>5. Status codes:</strong> `400` validation, `404` not found, `201` created. שגיאה.</li>
      <li><strong>6. Forbidden:</strong> לא מומלץ `localStorage`, `error boundaries`, `state mutation`.</li>
      <li><strong>7. No overconfidence:</strong> אם לא מודגם במבחנים – לא ניסוח.</li>
    </ul>
    <p><strong>Policy violation penalty:</strong> `0%` + הערה: *not found in source*.</p>
  </div>

  <p style="text-align: center; margin-top: 30px; color: #666;">
    Qwen3-Coder-Next – Evidence Discipline Drill complete. Stage 3 ready.
  </p>
</body>
</html>
```

