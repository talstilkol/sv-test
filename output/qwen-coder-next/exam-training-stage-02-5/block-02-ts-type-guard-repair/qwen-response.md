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

