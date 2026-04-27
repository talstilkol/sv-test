// data/lesson27.js — שיעור 27: שיעורי בית TS + Budget Manager
var LESSON_27 = {
  id: "lesson_27",
  title: "שיעור 27 — שיעורי בית TS + Budget Manager",
  description:
    "פרויקט מעשי ב-TypeScript: ניהול תקציב עם types/interfaces, union types, type narrowing, ו-CRUD מלא. שילוב כל כלי TS שלמדנו.",
  concepts: [
    // ─── 1. type (5) ───
    {
      conceptName: "type",
      difficulty: 5,
      levels: {
        grandma: "type = מגדיר שם לטיפוס. type ID = string | number — אומר ש-ID יכול להיות זה או זה.",
        child: "כמו תווית — 'הדבר הזה הוא טקסט או מספר'. במקום לכתוב כל פעם, נותנים שם.",
        soldier: "type Foo = X. שם ידידותי לטיפוס. יכול להיות primitive, union, intersection, generic.",
        student: "type aliases ל-unions, intersections, מבנים מורכבים. עדיף על interface עבור unions ו-primitives.",
        junior: "ב-Budget Manager: type Status = 'pending' | 'approved' | 'rejected'. בעצם איחוד literals.",
        professor: "Type aliases create nominal labels for structural types; semantically transparent.",
      },
      illustration:
        "🏷️ type:\n\n" +
        "  type ID = string | number;\n" +
        "  type Status = 'idle' | 'loading';\n" +
        "  type User = { id: ID; name: string };",
      codeExample:
        "type Currency = 'ILS' | 'USD' | 'EUR';\n" +
        "type Amount = {\n" +
        "  value: number;\n" +
        "  currency: Currency;\n" +
        "};\n\n" +
        "const price: Amount = { value: 100, currency: 'ILS' };\n" +
        "const wrong: Amount = { value: 100, currency: 'JPY' };  // ✗ JPY לא ב-Currency",
      codeExplanation:
        "type Currency הוא union of literals — רק 3 ערכים. type Amount משתמש בו. TS מתריע אם תכניסי ערך לא חוקי.",
    },

    // ─── 2. enum (6) ───
    {
      conceptName: "enum",
      difficulty: 6,
      levels: {
        grandma: "enum = רשימה סגורה של ערכים. enum Genre { Action, Drama, Comedy }.",
        child: "כמו תפריט במסעדה — אפשר רק מתוך הרשימה.",
        soldier: "enum Status { Idle, Loading, Error } — מגדיר 3 קבועים. שימוש: Status.Idle.",
        student: "ב-runtime: אובייקט עם reverse mapping (numeric). string enum בטוח יותר.",
        junior: "ב-Budget: enum TransactionType { Income = 'INCOME', Expense = 'EXPENSE' }. type-safe + readable.",
        professor: "Enums create both type and value; const enum erases at compile-time.",
      },
      illustration:
        "🎴 enum:\n\n" +
        "  enum Category {\n" +
        "    Food = 'FOOD',\n" +
        "    Rent = 'RENT',\n" +
        "    Salary = 'SALARY',\n" +
        "  }",
      codeExample:
        "enum TransactionType {\n" +
        "  Income = 'INCOME',\n" +
        "  Expense = 'EXPENSE',\n" +
        "}\n\n" +
        "interface Transaction {\n" +
        "  id: number;\n" +
        "  type: TransactionType;\n" +
        "  amount: number;\n" +
        "}\n\n" +
        "const tx: Transaction = {\n" +
        "  id: 1,\n" +
        "  type: TransactionType.Income,\n" +
        "  amount: 5000,\n" +
        "};",
      codeExplanation:
        "enum TransactionType מגדיר שני ערכים. השימוש: TransactionType.Income — type-safe. ב-Budget נשתמש ב-types נפרדים בעזרת union במקום enum.",
      extras: {
        moreExamples: [
          {
            code:
              "// alternative: union of literals\n" +
              "type TransactionType = 'INCOME' | 'EXPENSE';\n" +
              "// יותר קומפקטי, אפס runtime overhead",
            explanation: "ב-TS מודרני, union of literals עדיף על enum למקרים פשוטים — אפס bundle size.",
          },
        ],
        pitfalls: [
          {
            mistake: "numeric enum כשרוצים strings",
            why: "enum Status { Idle } → 0, ה-API מחזיר 'Idle' string — אי התאמה.",
            fix: "string enum: enum Status { Idle = 'Idle' } או type Status = 'Idle'.",
          },
        ],
        practiceQuestions: [
          { question: "מתי enum vs union of literals?", answer: "enum כשצריך iteration ב-runtime. union — לכל השאר." },
        ],
      },
    },

    // ─── 3. interface (7) ───
    {
      conceptName: "interface",
      difficulty: 7,
      levels: {
        grandma: "interface = 'חוזה' לאובייקט. אומר אילו שדות חייבים להיות.",
        child: "טופס בנק — שדות שאת חייבת למלא.",
        soldier: "interface User { id: number; name: string; }. הסכם על מבנה האובייקט.",
        student: "interface תומך ב-extends, declaration merging. עדיף ל-objects שעלולים להיות מורחבים.",
        junior: "ב-Budget: interface BaseTransaction. אז Income ו-Expense extends אותה. Composition אלגנטית.",
        professor: "Structural type definition; supports declaration merging, extends, method signatures.",
      },
      illustration:
        "📄 interface:\n\n" +
        "  interface User {\n" +
        "    id: number;\n" +
        "    name: string;\n" +
        "    email?: string;\n" +
        "  }",
      codeExample:
        "interface BaseTransaction {\n" +
        "  id: number;\n" +
        "  amount: number;\n" +
        "  date: Date;\n" +
        "  description: string;\n" +
        "}\n\n" +
        "interface Income extends BaseTransaction {\n" +
        "  type: 'INCOME';\n" +
        "  source: string;\n" +
        "}\n\n" +
        "interface Expense extends BaseTransaction {\n" +
        "  type: 'EXPENSE';\n" +
        "  category: string;\n" +
        "}",
      codeExplanation:
        "BaseTransaction מגדיר את המשותף. Income ו-Expense extends אותה ומוסיפות שדות ספציפיים. Composition נקייה.",
      extras: {
        moreExamples: [
          {
            code:
              "// declaration merging\n" +
              "interface User { id: number; }\n" +
              "interface User { name: string; }\n" +
              "// User עכשיו = { id: number; name: string }",
            explanation: "interface יכול להופיע פעמיים — TS מאחד. ייחודי ל-interface (לא type).",
          },
        ],
        pitfalls: [
          {
            mistake: "interface ל-primitives או unions",
            why: "interface עובד רק על אובייקטים.",
            fix: "type ID = string | number — לא אפשרי עם interface.",
          },
        ],
        practiceQuestions: [
          { question: "איך להגדיר Transaction עם 'INCOME' או 'EXPENSE'?", answer: "interface BaseTransaction + Income/Expense עם type literal" },
        ],
      },
    },

    // ─── 4. extends interface (6) ───
    {
      conceptName: "extends interface",
      difficulty: 6,
      levels: {
        grandma: "extends = 'יורש'. interface חדש מקבל את כל השדות של interface אחר ומוסיף עוד.",
        child: "כמו ש-RegisteredUser הוא User עם עוד שדות. הוא 'משלים' את User.",
        soldier: "interface AdminUser extends User { permissions: string[] }. AdminUser כולל את כל User + permissions.",
        student: "Composition pattern. אפשר extends multiple: interface X extends A, B { ... } — מיזוג.",
        junior: "ב-Budget: GuestUser ו-RegisteredUser שניהם extends BaseUser. סטרוקטורה נקייה.",
        professor: "Subtyping via interface inheritance; structural composition.",
      },
      illustration:
        "🌳 extends:\n\n" +
        "  interface BaseUser { id; name }\n" +
        "       ↓\n" +
        "  interface AdminUser extends BaseUser { permissions }\n" +
        "  // AdminUser = id + name + permissions",
      codeExample:
        "interface BaseUser {\n" +
        "  id: number;\n" +
        "  name: string;\n" +
        "}\n\n" +
        "interface RegisteredUser extends BaseUser {\n" +
        "  email: string;\n" +
        "  joinedAt: Date;\n" +
        "}\n\n" +
        "interface AdminUser extends RegisteredUser {\n" +
        "  permissions: string[];\n" +
        "}\n\n" +
        "const admin: AdminUser = {\n" +
        "  id: 1,\n" +
        "  name: 'Tal',\n" +
        "  email: 'tal@x.com',\n" +
        "  joinedAt: new Date(),\n" +
        "  permissions: ['read', 'write'],\n" +
        "};",
      codeExplanation: "Chain של ירושות: BaseUser → RegisteredUser → AdminUser. כל אחת מוסיפה שדות.",
      extras: {
        moreExamples: [
          {
            code:
              "// extends מרובה\n" +
              "interface Auditable { createdAt: Date; updatedAt: Date; }\n" +
              "interface Identifiable { id: number; }\n\n" +
              "interface Post extends Identifiable, Auditable {\n" +
              "  title: string;\n" +
              "}",
            explanation: "interface יכול לרשת מספר interfaces. Auditable + Identifiable = mixin pattern.",
          },
        ],
        pitfalls: [
          {
            mistake: "override field עם type שונה",
            why: "interface A { x: number }; interface B extends A { x: string } — שגיאה.",
            fix: "השתמש ב-narrowing: x: number & 5 (literal type compatible).",
          },
        ],
        practiceQuestions: [
          { question: "איך RegisteredUser שונה מ-GuestUser?", answer: "extends BaseUser + email + joinedAt; GuestUser לא מצריך email." },
        ],
      },
    },

    // ─── 5. Union Type (7) ───
    {
      conceptName: "Union Type",
      difficulty: 7,
      levels: {
        grandma: "Union Type = 'או X או Y'. type ID = string | number.",
        child: "כמו לבחור גלידה — וניל או שוקולד. הערך הוא אחד מהשניים.",
        soldier: "T | U. הערך יכול להיות בסוג T או בסוג U.",
        student: "Discriminated union — חזק במיוחד: type Result = {ok:true,data:T} | {ok:false,error:string}.",
        junior: "ב-Budget: type Transaction = Income | Expense. type field = 'INCOME' | 'EXPENSE' מאפשר narrowing.",
        professor: "Sum types over union of constituent types; narrowed via discriminating tags.",
      },
      illustration:
        "🔀 Union Type:\n\n" +
        "  type Transaction = Income | Expense;\n" +
        "  // יכול להיות אחד מהשניים — אבל לא ערבוב",
      codeExample:
        "interface Income {\n" +
        "  type: 'INCOME';\n" +
        "  amount: number;\n" +
        "  source: string;\n" +
        "}\n\n" +
        "interface Expense {\n" +
        "  type: 'EXPENSE';\n" +
        "  amount: number;\n" +
        "  category: string;\n" +
        "}\n\n" +
        "type Transaction = Income | Expense;\n\n" +
        "function describe(t: Transaction): string {\n" +
        "  if (t.type === 'INCOME') {\n" +
        "    return `Income from ${t.source}`;  // TS יודע: source זמין\n" +
        "  } else {\n" +
        "    return `Expense for ${t.category}`;  // TS יודע: category זמין\n" +
        "  }\n" +
        "}",
      codeExplanation:
        "Discriminated union: t.type מאפשר ל-TS לדעת איזה מהשניים זה. בכל ענף — TS חושף רק את השדות הרלוונטיים.",
      extras: {
        moreExamples: [
          {
            code:
              "// exhaustive check\n" +
              "function describe(t: Transaction): string {\n" +
              "  switch (t.type) {\n" +
              "    case 'INCOME': return `+${t.amount}`;\n" +
              "    case 'EXPENSE': return `-${t.amount}`;\n" +
              "    default:\n" +
              "      const _: never = t;  // אם נוסיף type חדש — error כאן\n" +
              "      throw new Error('unhandled');\n" +
              "  }\n" +
              "}",
            explanation: "switch + never default — מבטיח כיסוי מלא של כל ה-types ב-union.",
          },
        ],
        pitfalls: [
          {
            mistake: "שכחת לטפל באחד הענפים",
            why: "ב-runtime — undefined behavior. ב-compile time — אם אין discriminator, אין warning.",
            fix: "השתמש ב-discriminator + exhaustive check עם never.",
          },
        ],
        practiceQuestions: [
          { question: "מה היתרון של Discriminated union?", answer: "TS יודע לפי ה-discriminator (type field) איזה sub-type זה — חושף רק את השדות הרלוונטיים." },
        ],
      },
    },

    // ─── 6. Type Narrowing (7) ───
    {
      conceptName: "Type Narrowing",
      difficulty: 7,
      levels: {
        grandma: "Type Narrowing = TS לומד מהקוד מה הtype האמיתי. אחרי if (typeof x === 'string') — TS יודע ש-x הוא string.",
        child: "כמו מסננת — אחרי בדיקה, יש לך פחות אפשרויות, יותר ידע.",
        soldier: "Narrowing techniques: typeof, instanceof, in, equality, custom type guards.",
        student: "Control flow analysis — TS עוקב אחרי if/else ומצמצם את ה-type בכל ענף.",
        junior: "ב-Budget: if (t.type === 'INCOME') — TS יודע ש-t הוא Income, מאפשר t.source.",
        professor: "Type narrowing leverages flow-sensitive type analysis to refine union types within control branches.",
      },
      illustration:
        "🎯 narrowing:\n\n" +
        "  function f(x: string | number) {\n" +
        "    if (typeof x === 'string') {\n" +
        "      // TS יודע: x הוא string\n" +
        "      x.toUpperCase();\n" +
        "    }\n" +
        "  }",
      codeExample:
        "type Transaction = Income | Expense;\n\n" +
        "function format(t: Transaction): string {\n" +
        "  // Narrowing עם discriminator\n" +
        "  if (t.type === 'INCOME') {\n" +
        "    return `+${t.amount} from ${t.source}`;\n" +
        "  }\n" +
        "  // אחרי ה-if, TS יודע: t הוא Expense\n" +
        "  return `-${t.amount} for ${t.category}`;\n" +
        "}\n\n" +
        "// Narrowing עם typeof\n" +
        "function process(value: string | number) {\n" +
        "  if (typeof value === 'string') {\n" +
        "    return value.length;          // TS: value הוא string\n" +
        "  }\n" +
        "  return value.toFixed(2);          // TS: value הוא number\n" +
        "}",
      codeExplanation:
        "TS מבין מבחינות (typeof, ===) ומצמצם את ה-type בכל ענף. כך מקבלים autocomplete + type safety אוטומטיים.",
      extras: {
        moreExamples: [
          {
            code:
              "// custom type guard\n" +
              "function isIncome(t: Transaction): t is Income {\n" +
              "  return t.type === 'INCOME';\n" +
              "}\n\n" +
              "if (isIncome(t)) {\n" +
              "  // TS יודע: t הוא Income\n" +
              "  console.log(t.source);\n" +
              "}",
            explanation: "type predicate `t is Income` מאפשר לכתוב פונקציה שמסננת types. שימושי ל-narrowing מורכב.",
          },
          {
            code:
              "// in operator\n" +
              "function area(s: Circle | Square) {\n" +
              "  if ('radius' in s) {\n" +
              "    return Math.PI * s.radius ** 2;  // TS: s הוא Circle\n" +
              "  }\n" +
              "  return s.side ** 2;                  // TS: s הוא Square\n" +
              "}",
            explanation: "in מסנן לפי קיום property. שימושי כשאין discriminator משותף.",
          },
        ],
        pitfalls: [
          {
            mistake: "to use as without narrowing",
            why: "(value as Income).source עוקף את הבדיקה. אם value הוא Expense — runtime error.",
            fix: "תמיד narrow קודם (isIncome(t)) ואז להשתמש.",
          },
        ],
        practiceQuestions: [
          { question: "איך לבדוק אם t הוא Income?", answer: "if (t.type === 'INCOME') — TS narrowing אוטומטי." },
        ],
      },
    },

    // ─── 7. Book (3) ───
    {
      conceptName: "Book",
      difficulty: 3,
      levels: {
        grandma: "Book = interface שמייצג ספר. id, title, author, genre.",
        child: "תווית 'ספר' — כל ספר חייב את אותם שדות.",
        soldier: "interface Book { id: number; title: string; author: string; genre: Genre; }",
        student: "Book — ישות (entity) במערכת. שילוב עם Genre union לקטלוג.",
        junior: "Pattern: interface + factory function: createBook(data): Book — ולידציה + defaults.",
        professor: "Domain entity; structural type representing a bounded context concept.",
      },
      illustration: "📖 Book:\n\n  interface Book {\n    id: number;\n    title: string;\n    author: string;\n    genre: Genre;\n  }",
      codeExample:
        "type Genre = 'Fiction' | 'Science' | 'History' | 'Biography';\n\n" +
        "interface Book {\n" +
        "  id: number;\n" +
        "  title: string;\n" +
        "  author: string;\n" +
        "  genre: Genre;\n" +
        "  publishedYear: number;\n" +
        "}\n\n" +
        "const b: Book = {\n" +
        "  id: 1,\n" +
        "  title: 'Sapiens',\n" +
        "  author: 'Yuval Noah Harari',\n" +
        "  genre: 'History',\n" +
        "  publishedYear: 2011,\n" +
        "};",
      codeExplanation: "Book כ-interface — שדות מוגדרים. Genre כ-union literals — type-safe. כל ספר חייב לעמוד בחוזה.",
    },

    // ─── 8. Genre (4) ───
    {
      conceptName: "Genre",
      difficulty: 4,
      levels: {
        grandma: "Genre = ז'אנר. Fiction, Science, History — אופציות סגורות.",
        child: "רשימה של ז'אנרים אפשריים. כמו תפריט.",
        soldier: "type Genre = 'Fiction' | 'Science' | 'History' | 'Biography'. union of literals.",
        student: "alternative: enum Genre. Union literals קומפקטי + אפס runtime overhead.",
        junior: "אם הז'אנרים מגיעים מ-DB — אפשר להגדיר const GENRES = [...] as const, ואז type Genre = typeof GENRES[number].",
        professor: "Closed enumeration via string literal union; supports static exhaustiveness.",
      },
      illustration: "🏷️ Genre:\n\n  type Genre = 'Fiction' | 'Science' | 'History' | 'Biography';",
      codeExample:
        "type Genre = 'Fiction' | 'Science' | 'History' | 'Biography';\n\n" +
        "function getColor(g: Genre): string {\n" +
        "  switch (g) {\n" +
        "    case 'Fiction': return 'blue';\n" +
        "    case 'Science': return 'green';\n" +
        "    case 'History': return 'orange';\n" +
        "    case 'Biography': return 'purple';\n" +
        "    default:\n" +
        "      const _: never = g;  // exhaustive\n" +
        "      throw new Error('unknown genre');\n" +
        "  }\n" +
        "}",
      codeExplanation: "Genre כ-union — type-safe. switch עם never default — מבטיח כיסוי מלא.",
    },

    // ─── 9. BaseUser (4) ───
    {
      conceptName: "BaseUser",
      difficulty: 4,
      levels: {
        grandma: "BaseUser = משתמש בסיסי. שדות משותפים לכל סוגי המשתמשים.",
        child: "דברים שכל משתמש חייב — שם, מזהה.",
        soldier: "interface BaseUser { id: number; name: string; }. בסיס שאחרים מרחיבים.",
        student: "Composition pattern. GuestUser ו-RegisteredUser שניהם extends BaseUser.",
        junior: "ב-Budget: BaseUser הוא שם + מזהה. RegisteredUser מוסיף email + password. GuestUser נשאר בסיסי.",
        professor: "Abstract base type for inheritance hierarchies; defines minimal shared contract.",
      },
      illustration: "👤 BaseUser:\n\n  interface BaseUser {\n    id: number;\n    name: string;\n  }",
      codeExample:
        "interface BaseUser {\n" +
        "  id: number;\n" +
        "  name: string;\n" +
        "}\n\n" +
        "interface GuestUser extends BaseUser {\n" +
        "  type: 'GUEST';\n" +
        "}\n\n" +
        "interface RegisteredUser extends BaseUser {\n" +
        "  type: 'REGISTERED';\n" +
        "  email: string;\n" +
        "  password: string;\n" +
        "}",
      codeExplanation: "BaseUser מגדיר את המשותף. GuestUser ו-RegisteredUser extends. ה-type field מאפשר narrowing.",
    },

    // ─── 10. GuestUser (3) ───
    {
      conceptName: "GuestUser",
      difficulty: 3,
      levels: {
        grandma: "GuestUser = משתמש אורח. בלי הרשמה. רק שם.",
        child: "כמו אורח במלון — רושמים רק שם, לא חשבון.",
        soldier: "extends BaseUser, מוסיף type: 'GUEST'. מוגבל ב-features.",
        student: "Subtype of BaseUser. אינו מקבל email/password. שימושי ל-partial signup.",
        junior: "Pattern: GuestUser → upgrade ל-RegisteredUser. שמירת ה-id, הוספת email.",
        professor: "Limited capability subtype representing anonymous interaction.",
      },
      illustration: "👻 GuestUser:\n\n  interface GuestUser extends BaseUser {\n    type: 'GUEST';\n  }",
      codeExample:
        "interface GuestUser extends BaseUser {\n" +
        "  type: 'GUEST';\n" +
        "}\n\n" +
        "const guest: GuestUser = {\n" +
        "  id: 1,\n" +
        "  name: 'Guest',\n" +
        "  type: 'GUEST',\n" +
        "};",
      codeExplanation: "GuestUser הוא BaseUser + type discriminator. בלי email/password.",
    },

    // ─── 11. RegisteredUser (4) ───
    {
      conceptName: "RegisteredUser",
      difficulty: 4,
      levels: {
        grandma: "RegisteredUser = משתמש רשום. עם email וחשבון.",
        child: "כמו לקוח קבוע — פתחו חשבון, יש להם פרטים.",
        soldier: "extends BaseUser, מוסיף email, password, type: 'REGISTERED'.",
        student: "Subtype עם capabilities מוגדלים. גישה ל-personal data, transaction history.",
        junior: "Auth pattern: registered → login → JWT. ב-state: User = GuestUser | RegisteredUser.",
        professor: "Authenticated subtype with expanded capability surface.",
      },
      illustration: "✅ RegisteredUser:\n\n  interface RegisteredUser extends BaseUser {\n    type: 'REGISTERED';\n    email: string;\n    password: string;\n  }",
      codeExample:
        "interface RegisteredUser extends BaseUser {\n" +
        "  type: 'REGISTERED';\n" +
        "  email: string;\n" +
        "  password: string;\n" +
        "  joinedAt: Date;\n" +
        "}\n\n" +
        "const user: RegisteredUser = {\n" +
        "  id: 2,\n" +
        "  name: 'Tal',\n" +
        "  type: 'REGISTERED',\n" +
        "  email: 'tal@example.com',\n" +
        "  password: '...',\n" +
        "  joinedAt: new Date(),\n" +
        "};",
      codeExplanation: "RegisteredUser כולל את כל שדות BaseUser + email, password, joinedAt.",
    },

    // ─── 12. User (5) ───
    {
      conceptName: "User",
      difficulty: 5,
      levels: {
        grandma: "User = type שמאחד את שני הסוגים. user יכול להיות אורח או רשום.",
        child: "type User = GuestUser | RegisteredUser — או זה או זה.",
        soldier: "Union type. type User = GuestUser | RegisteredUser. ה-type field מבדיל.",
        student: "Discriminated union — TS יכול narrow לפי user.type.",
        junior: "ב-state: const [user, setUser] = useState<User | null>(null). null = לא מחובר.",
        professor: "Discriminated union for authenticated/anonymous role separation.",
      },
      illustration: "👥 User:\n\n  type User = GuestUser | RegisteredUser;\n  // ה-type field מבדיל.",
      codeExample:
        "type User = GuestUser | RegisteredUser;\n\n" +
        "function greet(u: User): string {\n" +
        "  if (u.type === 'REGISTERED') {\n" +
        "    return `Welcome back, ${u.email}!`;\n" +
        "  }\n" +
        "  return `Hi, ${u.name} (guest)`;\n" +
        "}",
      codeExplanation: "type User הוא union. narrowing לפי u.type — TS יודע בכל ענף איזה sub-type זה.",
    },

    // ─── 13. Transaction (6) ───
    {
      conceptName: "Transaction",
      difficulty: 6,
      levels: {
        grandma: "Transaction = פעולה כספית. הכנסה או הוצאה.",
        child: "כל פעם שמכניסים או מוציאים כסף — Transaction.",
        soldier: "type Transaction = Income | Expense. discriminated union.",
        student: "Base interface BaseTransaction + Income/Expense extends. union שתיהן.",
        junior: "ה-pattern הקלאסי של Budget Manager. CRUD על מערך של Transactions.",
        professor: "Domain entity with discriminated subtype hierarchy.",
      },
      illustration:
        "💰 Transaction:\n\n" +
        "  type Transaction = Income | Expense;\n" +
        "  // type field מבדיל.",
      codeExample:
        "interface BaseTransaction {\n" +
        "  id: number;\n" +
        "  amount: number;\n" +
        "  date: Date;\n" +
        "  description: string;\n" +
        "}\n\n" +
        "interface Income extends BaseTransaction {\n" +
        "  type: 'INCOME';\n" +
        "  source: string;\n" +
        "}\n\n" +
        "interface Expense extends BaseTransaction {\n" +
        "  type: 'EXPENSE';\n" +
        "  category: Category;\n" +
        "}\n\n" +
        "type Transaction = Income | Expense;\n\n" +
        "function getSign(t: Transaction): string {\n" +
        "  return t.type === 'INCOME' ? '+' : '-';\n" +
        "}",
      codeExplanation:
        "Transaction מאחד Income ו-Expense. ה-type field מאפשר narrowing. שתיהן יורשות מ-BaseTransaction.",
      extras: {
        moreExamples: [
          {
            code:
              "// CRUD על Transactions\n" +
              "interface BudgetState {\n" +
              "  transactions: Transaction[];\n" +
              "}\n\n" +
              "function addTransaction(state: BudgetState, t: Transaction): BudgetState {\n" +
              "  return { ...state, transactions: [...state.transactions, t] };\n" +
              "}\n\n" +
              "function deleteTransaction(state: BudgetState, id: number): BudgetState {\n" +
              "  return { ...state, transactions: state.transactions.filter(t => t.id !== id) };\n" +
              "}",
            explanation: "Pattern נפוץ: state עם array של Transaction. CRUD ב-immutable updates.",
          },
        ],
        pitfalls: [
          {
            mistake: "לטפל ב-Income ו-Expense אותו דבר",
            why: "מאבדים את ה-type safety. ה-narrowing קריטי.",
            fix: "תמיד if (t.type === 'INCOME')...else — TS יבטיח כיסוי.",
          },
        ],
        practiceQuestions: [
          { question: "איך מסננים רק Income?", answer: "transactions.filter(t => t.type === 'INCOME') — TS יודע שזה Income[]." },
        ],
      },
    },

    // ─── 14. Income (5) ───
    {
      conceptName: "Income",
      difficulty: 5,
      levels: {
        grandma: "Income = הכנסה. כסף שנכנס. שכר, מתנה, הקירמת השקעה.",
        child: "כסף בא אלי. plus.",
        soldier: "interface Income extends BaseTransaction { type: 'INCOME'; source: string }.",
        student: "ה-discriminator type: 'INCOME' מבדיל מ-Expense. השדה source ייחודי ל-Income.",
        junior: "Pattern: switch על t.type — בענף 'INCOME', t.source זמין.",
        professor: "Subtype of BaseTransaction with positive cash-flow semantics.",
      },
      illustration: "💵 Income:\n\n  interface Income extends BaseTransaction {\n    type: 'INCOME';\n    source: string;\n  }",
      codeExample:
        "interface Income extends BaseTransaction {\n" +
        "  type: 'INCOME';\n" +
        "  source: string;  // 'Salary', 'Gift', etc.\n" +
        "}\n\n" +
        "const salary: Income = {\n" +
        "  id: 1,\n" +
        "  type: 'INCOME',\n" +
        "  amount: 12000,\n" +
        "  date: new Date(),\n" +
        "  description: 'Monthly salary',\n" +
        "  source: 'Workplace',\n" +
        "};",
      codeExplanation: "Income כולל את כל BaseTransaction + type discriminator + source ייחודי.",
    },

    // ─── 15. Expense (5) ───
    {
      conceptName: "Expense",
      difficulty: 5,
      levels: {
        grandma: "Expense = הוצאה. כסף שיוצא. שכירות, אוכל, בידור.",
        child: "כסף הולך. minus.",
        soldier: "interface Expense extends BaseTransaction { type: 'EXPENSE'; category: Category }.",
        student: "ה-discriminator 'EXPENSE'. השדה category ייחודי ל-Expense.",
        junior: "Filter: transactions.filter(t => t.type === 'EXPENSE'). TS יודע: Expense[].",
        professor: "Subtype of BaseTransaction with negative cash-flow semantics.",
      },
      illustration: "💸 Expense:\n\n  interface Expense extends BaseTransaction {\n    type: 'EXPENSE';\n    category: Category;\n  }",
      codeExample:
        "interface Expense extends BaseTransaction {\n" +
        "  type: 'EXPENSE';\n" +
        "  category: Category;\n" +
        "}\n\n" +
        "const rent: Expense = {\n" +
        "  id: 2,\n" +
        "  type: 'EXPENSE',\n" +
        "  amount: 4500,\n" +
        "  date: new Date(),\n" +
        "  description: 'Monthly rent',\n" +
        "  category: 'Housing',\n" +
        "};",
      codeExplanation: "Expense עם type discriminator + category. category הוא union/enum של קטגוריות.",
    },

    // ─── 16. Category (4) ───
    {
      conceptName: "Category",
      difficulty: 4,
      levels: {
        grandma: "Category = קטגוריה. סוג של הוצאה — מזון, דיור, בידור.",
        child: "תיק לכל סוג הוצאה.",
        soldier: "type Category = 'Food' | 'Housing' | 'Entertainment' | 'Transport'. union literal.",
        student: "Closed set. autocomplete + type safety. אם תוסיף — חייב לעדכן את ה-type.",
        junior: "Pattern: type Category במקום אחד (models/Category.ts). Single source of truth.",
        professor: "Closed enumeration of expense classifications via string literal union.",
      },
      illustration: "🏷️ Category:\n\n  type Category =\n    | 'Food'\n    | 'Housing'\n    | 'Entertainment'\n    | 'Transport';",
      codeExample:
        "type Category =\n" +
        "  | 'Food'\n" +
        "  | 'Housing'\n" +
        "  | 'Transport'\n" +
        "  | 'Entertainment'\n" +
        "  | 'Health'\n" +
        "  | 'Other';\n\n" +
        "function categorize(c: Category): string {\n" +
        "  if (c === 'Food' || c === 'Health') return 'essential';\n" +
        "  if (c === 'Entertainment') return 'leisure';\n" +
        "  return 'other';\n" +
        "}",
      codeExplanation: "Category union — סגור. כל קטגוריה אפשרית מוגדרת. TS יבטיח שלא נכניס ערך לא חוקי.",
    },

    // ─── 17. Amount (3) ───
    {
      conceptName: "Amount",
      difficulty: 3,
      levels: {
        grandma: "Amount = סכום. number ב-TS.",
        child: "מספר — כמות הכסף.",
        soldier: "amount: number. או type Amount = { value: number; currency: Currency } למבנה עשיר.",
        student: "Branded type: type Money = number & { __brand: 'Money' } — מונע ערבוב עם number רגיל.",
        junior: "ב-Budget: amount הוא number. אבל אם רוצים currency support: { value, currency }.",
        professor: "Numeric quantity; refinement types possible via branded types.",
      },
      illustration: "💰 Amount:\n\n  amount: number;\n  // או:\n  amount: { value: number; currency: Currency };",
      codeExample:
        "// פשוט:\n" +
        "interface Transaction { amount: number; }\n\n" +
        "// עם currency:\n" +
        "type Currency = 'ILS' | 'USD' | 'EUR';\n" +
        "interface Money {\n" +
        "  value: number;\n" +
        "  currency: Currency;\n" +
        "}\n" +
        "interface Transaction2 { amount: Money; }",
      codeExplanation: "amount הפשוט הוא number. למערכת בינלאומית — Money עם currency.",
    },

    // ─── 18. CRUD (6) ───
    {
      conceptName: "CRUD",
      difficulty: 6,
      levels: {
        grandma: "CRUD = Create, Read, Update, Delete. ארבע פעולות בסיסיות על נתונים.",
        child: "ליצור, לקרוא, לעדכן, למחוק. כמו ניהול רשימת קניות.",
        soldier: "ב-React: useState עם array + 4 פעולות immutable. addX, getX, updateX, deleteX.",
        student: "Pattern עם types: function add(t: Transaction): void; function update(id: number, t: Partial<Transaction>): void.",
        junior: "ב-Budget Manager: CRUD על Transactions. ה-types מבטיחים שלא תעבירי מבנה שגוי.",
        professor: "Canonical operations on resource collections; foundation of most domain APIs.",
      },
      illustration:
        "🔄 CRUD:\n\n" +
        "  Create: setTxs([...txs, newTx])\n" +
        "  Read:   txs.find(t => t.id === id)\n" +
        "  Update: txs.map(t => t.id === id ? {...t, ...updates} : t)\n" +
        "  Delete: txs.filter(t => t.id !== id)",
      codeExample:
        "function useBudget() {\n" +
        "  const [txs, setTxs] = useState<Transaction[]>([]);\n\n" +
        "  // CREATE\n" +
        "  const add = (t: Omit<Transaction, 'id'>) => {\n" +
        "    setTxs(prev => [...prev, { ...t, id: Date.now() } as Transaction]);\n" +
        "  };\n\n" +
        "  // READ\n" +
        "  const find = (id: number) => txs.find(t => t.id === id);\n\n" +
        "  // UPDATE\n" +
        "  const update = (id: number, updates: Partial<Transaction>) => {\n" +
        "    setTxs(prev => prev.map(t => (t.id === id ? { ...t, ...updates } as Transaction : t)));\n" +
        "  };\n\n" +
        "  // DELETE\n" +
        "  const remove = (id: number) => {\n" +
        "    setTxs(prev => prev.filter(t => t.id !== id));\n" +
        "  };\n\n" +
        "  return { txs, add, find, update, remove };\n" +
        "}",
      codeExplanation:
        "Custom hook עם 4 פעולות. כולם immutable. Omit<T, 'id'> — type שמסיר את id (כי נוצר אוטומטית). Partial<T> — כל השדות אופציונליים.",
      extras: {
        moreExamples: [
          {
            code:
              "// utility types שימושיים\n" +
              "type CreateInput = Omit<Transaction, 'id'>;        // בלי id\n" +
              "type UpdateInput = Partial<Transaction>;            // הכל אופציונלי\n" +
              "type ReadOnly = Readonly<Transaction>;             // immutable\n" +
              "type Keys = keyof Transaction;                     // 'id' | 'type' | ...",
            explanation: "TS מספק utility types: Omit (להסיר), Partial (אופציונלי), Readonly, keyof. שימוש מגוון.",
          },
        ],
        pitfalls: [
          {
            mistake: "mutation על תcrud",
            why: "txs.push(...) → React לא מתרענן.",
            fix: "תמיד setTxs עם spread/filter/map.",
          },
        ],
        practiceQuestions: [
          { question: "איך מטרים פריט עם id=5?", answer: "setTxs(prev => prev.map(t => t.id === 5 ? { ...t, ...updates } : t))" },
        ],
      },
    },

    // ─── 19. Budget Summary (5) ───
    {
      conceptName: "Budget Summary",
      difficulty: 5,
      levels: {
        grandma: "Budget Summary = סיכום תקציב. כמה הכנסות, כמה הוצאות, יתרה.",
        child: "כמה כסף יש לי — בסך הכל, חיובי או שלילי.",
        soldier: "Reduce על transactions: const balance = txs.reduce((sum, t) => t.type === 'INCOME' ? sum + t.amount : sum - t.amount, 0).",
        student: "Computed value מ-transactions. אם משנים — Summary מתעדכן (useMemo).",
        junior: "Pattern: const summary = useMemo(() => computeSummary(txs), [txs]). חוסך re-computation מיותר.",
        professor: "Aggregate computation; memoize for referential stability.",
      },
      illustration:
        "📊 Budget Summary:\n\n" +
        "  Income: 12,000\n" +
        "  Expenses: -7,500\n" +
        "  Balance: 4,500",
      codeExample:
        "interface Summary {\n" +
        "  totalIncome: number;\n" +
        "  totalExpense: number;\n" +
        "  balance: number;\n" +
        "}\n\n" +
        "function computeSummary(txs: Transaction[]): Summary {\n" +
        "  let totalIncome = 0;\n" +
        "  let totalExpense = 0;\n" +
        "  for (const t of txs) {\n" +
        "    if (t.type === 'INCOME') totalIncome += t.amount;\n" +
        "    else totalExpense += t.amount;\n" +
        "  }\n" +
        "  return {\n" +
        "    totalIncome,\n" +
        "    totalExpense,\n" +
        "    balance: totalIncome - totalExpense,\n" +
        "  };\n" +
        "}\n\n" +
        "// בקומפוננטה:\n" +
        "const summary = useMemo(() => computeSummary(txs), [txs]);",
      codeExplanation:
        "computeSummary עובר על כל ה-transactions ומחשב totals. useMemo מבטיח חישוב חדש רק כש-txs משתנה.",
    },

    // ─── 20. Category Breakdown (5) ───
    {
      conceptName: "Category Breakdown",
      difficulty: 5,
      levels: {
        grandma: "Category Breakdown = פירוט לפי קטגוריות. כמה הוצאתי על אוכל, על דיור, וכו'.",
        child: "טבלה — בכל שורה קטגוריה + סכום.",
        soldier: "Group by category. reduce על expenses, צבירה לאובייקט { category: total }.",
        student: "Record<Category, number> — אובייקט עם key מ-Category, value מספר.",
        junior: "Pattern: useMemo + sort by amount. הצגה בגרף עוגה או bar chart.",
        professor: "Grouped aggregation by discriminated subtype field; results in a record indexed by category.",
      },
      illustration:
        "🥧 Category Breakdown:\n\n" +
        "  Food: 1,200\n" +
        "  Housing: 4,500\n" +
        "  Transport: 800\n" +
        "  Entertainment: 1,000",
      codeExample:
        "type Breakdown = Record<Category, number>;\n\n" +
        "function getBreakdown(txs: Transaction[]): Breakdown {\n" +
        "  const result: Breakdown = {\n" +
        "    Food: 0, Housing: 0, Transport: 0,\n" +
        "    Entertainment: 0, Health: 0, Other: 0,\n" +
        "  };\n\n" +
        "  for (const t of txs) {\n" +
        "    if (t.type === 'EXPENSE') {\n" +
        "      result[t.category] += t.amount;\n" +
        "    }\n" +
        "  }\n\n" +
        "  return result;\n" +
        "}\n\n" +
        "// בקומפוננטה:\n" +
        "const breakdown = useMemo(() => getBreakdown(txs), [txs]);\n" +
        "const sorted = Object.entries(breakdown)\n" +
        "  .sort(([, a], [, b]) => b - a);  // מהגדול לקטן",
      codeExplanation:
        "getBreakdown צובר הוצאות לפי קטגוריה. Record<Category, number> מבטיח שכל קטגוריה תהיה במפתח. useMemo + sort להצגה.",
    },
  ],

  quiz: [
    {
      question: "איך מגדירים Transaction = Income | Expense?",
      options: [
        "interface Transaction = Income | Expense",
        "type Transaction = Income | Expense",
        "class Transaction extends Income, Expense",
        "type Transaction { Income, Expense }",
      ],
      correct: 1,
      explanation: "type — לוקח union. interface לא תומך ב-unions של 2+ types.",
    },
    {
      question: "איך לדעת אם t הוא Income?",
      options: [
        "t instanceof Income",
        "if (t.type === 'INCOME') — TS narrowing אוטומטי",
        "Object.keys(t).includes('source')",
        "type guard בלבד",
      ],
      correct: 1,
      explanation: "Discriminated union — TS משתמש בdiscriminator (type field) ל-narrowing.",
    },
    {
      question: "איך לסנן רק הוצאות?",
      options: [
        "txs.filter(t => t.amount < 0)",
        "txs.filter(t => t.type === 'EXPENSE')",
        "txs.filter(t => t.type !== 'INCOME')",
        "txs.where(t => t.expense)",
      ],
      correct: 1,
      explanation: "filter עם type discriminator — TS יודע שהתוצאה היא Expense[].",
    },
    {
      question: "מה Omit<Transaction, 'id'> עושה?",
      options: [
        "מסיר את כל השדות",
        "Type עם כל שדות Transaction חוץ מ-id",
        "מוסיף id",
        "אין כזה type",
      ],
      correct: 1,
      explanation: "Omit<T, K> מסיר את ה-keys ב-K מ-T. שימושי כשיוצרים transaction חדש (id מוקצה אוטומטית).",
    },
    {
      question: "Record<Category, number> זה?",
      options: [
        "מערך",
        "אובייקט עם keys מ-Category, values number",
        "Class",
        "Generic ללא הקשר",
      ],
      correct: 1,
      explanation: "Record<K, V> — אובייקט עם keys מ-K (Category enum/union) ו-values מ-V (number).",
    },
    {
      question: "איך לחשב balance?",
      options: [
        "txs.length",
        "txs.reduce((s, t) => t.type === 'INCOME' ? s + t.amount : s - t.amount, 0)",
        "txs.sum",
        "income - expense",
      ],
      correct: 1,
      explanation: "reduce — צובר. כל Income מוסיף, כל Expense מוריד. התוצאה היא balance.",
    },
  ],
};
