// data/lesson26.js — שיעור 26: TypeScript + React+TS
var LESSON_26 = {
  id: "lesson_26",
  title: "שיעור 26 — TypeScript + React+TS",
  description:
    "TypeScript: type annotations, interface, type alias, union, generics, ושילוב React עם TS — Typing Props, State, Functions. Type safety בזמן compile.",
  concepts: [
    // ─── 1. TypeScript (5) ───
    {
      conceptName: "TypeScript",
      difficulty: 5,
      levels: {
        grandma: "TypeScript = JavaScript עם 'תוויות' לכל משתנה. אומרים 'זה מספר', 'זה טקסט', וה-compiler בודק שלא טעית.",
        child: "כמו לסדר צעצועים בקופסאות לפי סוג. אם תכניסי תכשיט לקופסת לגו — TypeScript אומר 'לא, זה לא לגו'.",
        soldier: "TypeScript = שפה מבוססת JavaScript עם מערכת טיפוסים סטטית. בזמן הרצה — JS רגיל. בזמן כתיבה — TypeScript מתריע על שגיאות.",
        student: "Superset של JS עם static type checking. Compiler (tsc) בודק טיפוסים ומפיק JS. תופס שגיאות לפני runtime.",
        junior: "פעם בניתי API ושלחתי `user.nmae` בטעות (typo). TS תפס את זה מיד. בלי TS, הייתי רואה את הבאג רק ב-production.",
        professor: "TypeScript provides structural typing layered on JavaScript. The compiler erases types at emit; runtime is pure JS.",
      },
      illustration: "🏷️ TypeScript:\n\n  let age: number = 30;     ← תווית 'מספר'\n  age = 'thirty';            ← שגיאה: אי אפשר לתת string\n  age = 31;                  ← OK",
      codeExample:
        "// JavaScript — אין הגנה\n" +
        "function greet(name) { return `Hello, ${name.toUpperCase()}!`; }\n" +
        "greet(42);  // runtime error: name.toUpperCase is not a function\n\n" +
        "// TypeScript — תופס מיד\n" +
        "function greet(name: string) { return `Hello, ${name.toUpperCase()}!`; }\n" +
        "greet(42);  // ✗ Argument of type 'number' is not assignable to 'string'",
      codeExplanation:
        "ב-JS השגיאה נחשפת רק כשהקוד רץ. ב-TS — ה-IDE מתריע מיד שכותבים. תופס באגים מוקדם, חוסך זמן.",
    },

    // ─── 2. Strongly Typed (5) ───
    {
      conceptName: "Strongly Typed",
      difficulty: 5,
      levels: {
        grandma: "Strongly typed = השפה לא מאפשרת לערבב סוגים. אי אפשר לחבר מספר עם טקסט בלי המרה מפורשת.",
        child: "כמו במשחק — אדום+אדום=ניצחון, אדום+כחול=שגיאה. השפה מקפידה על הכללים.",
        soldier: "TypeScript הוא strongly typed. JS הוא weakly typed (1 + '2' = '12'). ב-TS צריך המרה ידנית.",
        student: "Strong typing מקטין שגיאות runtime. Weak typing (כמו JS) גמיש יותר אבל סוגרים בלי כיסוי.",
        junior: "המתח: TS מחמיר, אבל מנע מאות שגיאות בקוד שלי. אחרי חודש — לא חוזרים ל-JS.",
        professor: "Strong typing enforces type safety at compile time, preventing implicit coercion bugs prevalent in dynamically typed languages.",
      },
      illustration: "💪 Strong vs Weak typing:\n\n  JS:  1 + '2'  → '12'  (coerce)\n  TS:  1 + '2'  → ✗ error",
      codeExample:
        "let count: number = 5;\n" +
        "count = '10';  // ✗ Type 'string' is not assignable to type 'number'\n\n" +
        "// המרה מפורשת:\n" +
        "count = parseInt('10', 10);  // ✓",
      codeExplanation: "TS לא מאפשר השמה בין טיפוסים שונים. המרה ידנית (parseInt, toString) — חובה.",
    },

    // ─── 3. Compiler (4) ───
    {
      conceptName: "Compiler",
      difficulty: 4,
      levels: {
        grandma: "Compiler = 'מתרגם'. הופך קוד TypeScript לקוד JavaScript שהדפדפן יכול להריץ.",
        child: "כמו מתרגם בין שפות. אתה כותב בעברית, הוא הופך לאנגלית.",
        soldier: "tsc (TypeScript Compiler) ממיר .ts ל-.js. בודק טיפוסים, מסיר annotations, פולט JS.",
        student: "Compilation phases: parse → check → emit. Type errors מונעים emit. Output: ES5/ES6/ESNext לפי tsconfig.",
        junior: "Vite/SWC מהיר יותר מ-tsc. ב-development — Vite מטפל. ב-CI — npm run tsc -- --noEmit לבדיקה.",
        professor: "TypeScript compiler performs static analysis without runtime overhead. Erasure semantics: types disappear post-emit.",
      },
      illustration: "🔄 Compiler:\n\n  app.ts  →  tsc  →  app.js\n  type errors  →  ✗ no emit",
      codeExample:
        "// app.ts\n" +
        "const age: number = 30;\n" +
        "console.log(age);\n\n" +
        "// אחרי tsc:\n" +
        "// app.js\n" +
        "const age = 30;\n" +
        "console.log(age);",
      codeExplanation: "ה-compiler מסיר את ה-annotations (: number) ופולט JS נקי. הטיפוסים אינם בקוד הסופי.",
    },

    // ─── 4. tsc (3) ───
    {
      conceptName: "tsc",
      difficulty: 3,
      levels: {
        grandma: "tsc = הפקודה שמפעילה את ה-compiler.",
        child: "פותחים terminal, כותבים tsc, וזה קורה.",
        soldier: "tsc = TypeScript Compiler CLI. מריץ קומפילציה לפי tsconfig.json.",
        student: "tsc --noEmit לבדיקת טיפוסים בלבד. tsc --watch לעקוב על שינויים. tsc --init יוצר tsconfig.",
        junior: "ב-Vite project: לא משתמשים ב-tsc ל-build. אבל npm run tsc -- --noEmit ב-CI מבטיח שאין type errors.",
        professor: "Type-checker CLI; supports incremental builds, project references, declaration emission.",
      },
      illustration: "⚙️ tsc CLI:\n\n  $ tsc                  ← compile\n  $ tsc --watch          ← rebuild on change\n  $ tsc --noEmit         ← type-check only",
      codeExample:
        "$ npm install --save-dev typescript\n" +
        "$ npx tsc --init             # צור tsconfig.json\n" +
        "$ npx tsc                    # compile\n" +
        "$ npx tsc --noEmit           # רק בדוק טיפוסים",
      codeExplanation: "tsc הוא הCLI. בפרויקט עם Vite/SWC — בעיקר משתמשים בו ל-type-check ולא ל-build.",
    },

    // ─── 5. .ts (3) ───
    {
      conceptName: ".ts",
      difficulty: 3,
      levels: {
        grandma: ".ts = הסיומת של קבצי TypeScript. כמו .doc זה Word.",
        child: "במקום lesson.js, זה lesson.ts.",
        soldier: ".ts לקבצי TS רגילים. .tsx לקבצי TS עם JSX (React).",
        student: "Compiler מזהה את הסיומת ומחיל את הכללים המתאימים. .ts אסור JSX, .tsx מאפשר.",
        junior: "מקובל: components ב-.tsx, utilities ב-.ts. עוזר ל-IDE לדעת מה לצפות.",
        professor: "File extension signals to the parser whether JSX syntax is permitted; affects tokenization.",
      },
      illustration: ".ts vs .tsx:\n\n  utils.ts          ← TS only\n  Button.tsx        ← TS + JSX",
      codeExample:
        "// utils.ts — בלי JSX\n" +
        "export function format(d: Date): string { ... }\n\n" +
        "// Button.tsx — עם JSX\n" +
        "export function Button({ label }: { label: string }) {\n" +
        "  return <button>{label}</button>;\n" +
        "}",
      codeExplanation: "utilities ב-.ts. קומפוננטות React ב-.tsx. הבחנה זו עוזרת ל-tooling.",
    },

    // ─── 6. .js (2) ───
    {
      conceptName: ".js",
      difficulty: 2,
      levels: {
        grandma: ".js = קבצי JavaScript. אחרי קומפילציה של .ts — נוצר .js.",
        child: "הסיומת של JavaScript הרגיל.",
        soldier: ".js הוא ה-output של ה-compiler. הדפדפן יכול להריץ .js, לא .ts.",
        student: "ב-development עם Vite — הדפדפן מקבל .js (Vite מקמפל on-the-fly).",
        junior: "tsc יכול גם לפרסם .js + .d.ts (type declarations) ל-libraries.",
        professor: "Compiled JavaScript output; runtime artifact, types fully erased.",
      },
      illustration: ".ts → .js:\n\n  app.ts (development)\n      ↓ tsc\n  app.js (runtime)",
      codeExample:
        "// המקור (.ts)\n" +
        "const x: number = 5;\n\n" +
        "// אחרי compile (.js)\n" +
        "const x = 5;",
      codeExplanation: ".js הוא הקובץ שרץ בדפדפן. אין בו annotations.",
    },

    // ─── 7. tsconfig.json (4) ───
    {
      conceptName: "tsconfig.json",
      difficulty: 4,
      levels: {
        grandma: "tsconfig.json = ההגדרות של ה-compiler. אומר לו מה לבדוק, איך לקמפל.",
        child: "כמו תפריט הגדרות — איך אני רוצה את הקפה שלי.",
        soldier: "tsconfig.json מגדיר: target (ES5/ES6/...), strict mode, paths, includes, jsx mode.",
        student: "compilerOptions: {target, strict, jsx, module, paths}. include/exclude לקבצים. extends ל-base configs.",
        junior: "strict: true חובה. paths: { '@/*': ['src/*'] } חוסך imports יחסיים. tsconfig של Vite יותר קשוח.",
        professor: "Compiler configuration manifest; controls type-check behavior and emit strategies.",
      },
      illustration: "⚙️ tsconfig.json:\n\n  {\n    compilerOptions: { strict: true, jsx: 'react' },\n    include: ['src/**/*'],\n  }",
      codeExample:
        "{\n" +
        '  "compilerOptions": {\n' +
        '    "target": "ES2020",\n' +
        '    "strict": true,\n' +
        '    "jsx": "react-jsx",\n' +
        '    "moduleResolution": "bundler",\n' +
        '    "paths": { "@/*": ["./src/*"] }\n' +
        "  },\n" +
        '  "include": ["src/**/*"]\n' +
        "}",
      codeExplanation: "strict: true מפעיל את כל הבדיקות החזקות. jsx: react-jsx ל-React 17+. paths ל-import alias.",
    },

    // ─── 8. type annotation (5) ───
    {
      conceptName: "type annotation",
      difficulty: 5,
      levels: {
        grandma: "type annotation = 'תווית טיפוס'. const x: number = 5 — הtype הוא number.",
        child: "כמו תווית על קופסה: 'בגדים', 'מטבח'. אומר מה יש בפנים.",
        soldier: "Syntax: `name: type`. בעבור משתנים, params, return types. מקפה ה-compiler לבדוק.",
        student: "Type inference — לא תמיד צריך annotate. let x = 5 — TS יודע ש-x הוא number. annotate כשלא ברור.",
        junior: "כלל: function params + return type — annotate. local vars — בד\"כ infer מספיק.",
        professor: "Explicit type annotations override inference. Inference uses contextual typing where possible.",
      },
      illustration: "🏷️ annotations:\n\n  const x: number = 5;\n  function add(a: number, b: number): number { return a + b; }\n  let user: { name: string, age: number };",
      codeExample:
        "// משתנים\n" +
        "const age: number = 30;\n" +
        "const name: string = 'Tal';\n" +
        "const isActive: boolean = true;\n\n" +
        "// פונקציה\n" +
        "function greet(name: string, age: number): string {\n" +
        "  return `${name} is ${age}`;\n" +
        "}\n\n" +
        "// אובייקט\n" +
        "const user: { name: string; age: number } = { name: 'Tal', age: 30 };",
      codeExplanation: "annotation אחרי הסימן `:`. למשתנים, params, return type, אובייקטים מקוננים.",
    },

    // ─── 9. string (2) ───
    {
      conceptName: "string",
      difficulty: 2,
      levels: {
        grandma: "string = טקסט. שם, משפט, מילה.",
        child: "כל מה שבמירכאות.",
        soldier: "Primitive type. תומך ב-template literals, methods (toUpperCase, split, includes).",
        student: "string ב-TS = string ב-JS. literal types: const x: 'red' = 'red'. union: 'red' | 'blue'.",
        junior: "string literals חזקים: type Status = 'idle' | 'loading' | 'error'. autocomplete + type safety.",
        professor: "Primitive type with literal subtypes; useful for discriminated unions.",
      },
      illustration: "📝 string:\n\n  const name: string = 'Tal';\n  type Color = 'red' | 'blue';   // string literal types",
      codeExample:
        "let name: string = 'Tal';\n" +
        "name = 42;  // ✗ Type 'number' not assignable to 'string'\n\n" +
        "// String literal type\n" +
        "type Status = 'idle' | 'loading' | 'error';\n" +
        "let s: Status = 'idle';\n" +
        "s = 'invalid';  // ✗ Type '\"invalid\"' not assignable",
      codeExplanation: "string הוא טיפוס בסיסי. literals יוצרים sub-types — autocomplete + type safety.",
    },

    // ─── 10. number (2) ───
    {
      conceptName: "number",
      difficulty: 2,
      levels: {
        grandma: "number = מספר. שלם, עשרוני, חיובי, שלילי.",
        child: "כל המספרים.",
        soldier: "Primitive: integers, floats, hex, binary. NaN, Infinity, -Infinity גם כן number.",
        student: "BigInt הוא טיפוס נפרד. Number literal types: type Roll = 1 | 2 | 3 | 4 | 5 | 6.",
        junior: "אזהרה: NaN, Infinity הם number. typeof NaN === 'number'. צריך isNaN לזיהוי.",
        professor: "IEEE 754 double-precision floats. BigInt for arbitrary precision integers.",
      },
      illustration: "🔢 number:\n\n  let age: number = 30;\n  let pi: number = 3.14;\n  let hex: number = 0xff;",
      codeExample:
        "let count: number = 0;\n" +
        "count = '10';  // ✗\n" +
        "count = parseInt('10', 10);  // ✓\n\n" +
        "// number literal type\n" +
        "type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;\n" +
        "const roll: DiceRoll = 4;",
      codeExplanation: "number כולל הכל — שלם, עשרוני, hex. BigInt נפרד.",
    },

    // ─── 11. boolean (2) ───
    {
      conceptName: "boolean",
      difficulty: 2,
      levels: {
        grandma: "boolean = true או false. כן/לא.",
        child: "התשובה בשאלת כן/לא.",
        soldier: "true | false. שני ערכים אפשריים.",
        student: "ל-condition (if), to express toggles, flags. truthy/falsy ב-JS — שמירה.",
        junior: "המלכודת: בדיקת undefined. flag: boolean = undefined → ✗. השתמש ב-flag?: boolean.",
        professor: "Bivalent type {true, false}. Avoid coercion; use strict equality.",
      },
      illustration: "✅ boolean:\n\n  let isActive: boolean = true;\n  let isAdmin: boolean = false;",
      codeExample:
        "let isLoading: boolean = false;\n" +
        "isLoading = 'yes';  // ✗\n\n" +
        "// אפשר לסדר עם optional\n" +
        "interface User {\n" +
        "  isAdmin?: boolean;  // יכול להיות undefined\n" +
        "}",
      codeExplanation: "boolean = true או false בלבד. optional (?) מאפשר undefined.",
    },

    // ─── 12. array type (4) ───
    {
      conceptName: "array type",
      difficulty: 4,
      levels: {
        grandma: "array type = מערך עם תווית של 'מה יש בפנים'. number[] = מערך של מספרים.",
        child: "קופסה של דברים מאותו סוג.",
        soldier: "שתי צורות: T[] או Array<T>. נפוץ: number[], string[], User[].",
        student: "מערך הומוגני. Mix-types: Array<string | number>. ריק: []. תופס מתודות (push, map, filter).",
        junior: "Readonly array: ReadonlyArray<T> או readonly T[]. למניעת mutation.",
        professor: "Generic Array<T>; covariant on T. ReadonlyArray for immutable contracts.",
      },
      illustration: "📋 array type:\n\n  number[]                ← מערך מספרים\n  string[]                ← מערך מחרוזות\n  Array<User>            ← מערך משתמשים\n  (string | number)[]    ← mixed",
      codeExample:
        "const ages: number[] = [25, 30, 35];\n" +
        "ages.push(40);  // ✓\n" +
        "ages.push('forty');  // ✗\n\n" +
        "const users: User[] = [{ name: 'Tal' }, { name: 'Dana' }];\n\n" +
        "// readonly\n" +
        "const constants: readonly number[] = [3.14, 2.71];\n" +
        "constants.push(1);  // ✗ readonly",
      codeExplanation: "T[] או Array<T> — שתי צורות זהות. readonly למניעת mutation.",
    },

    // ─── 13. tuple (6) ───
    {
      conceptName: "tuple",
      difficulty: 6,
      levels: {
        grandma: "tuple = מערך עם אורך וסוגים קבועים. [string, number] = שם ואז גיל.",
        child: "כמו זוג של דברים — תמיד ראשון מתוך X, שני מתוך Y.",
        soldier: "Tuple = fixed-length array עם types ספציפיים בכל עמדה. const x: [string, number] = ['Tal', 30].",
        student: "השונה מ-array: אורך קבוע, types שונים בעמדות. שימוש: useState (פלט: [value, setter]).",
        junior: "useState הוא הדוגמה הקלאסית: const [count, setCount] = useState(0). count: number, setCount: function.",
        professor: "Tuples enforce positional type structure; variadic tuples introduced in TS 4.0.",
      },
      illustration:
        "🎁 tuple — שני דברים במקום קבוע:\n\n" +
        "  type Pair = [string, number];\n" +
        "  const p: Pair = ['Tal', 30];   ✓\n" +
        "  const q: Pair = [30, 'Tal'];   ✗ wrong order",
      codeExample:
        "// useState משתמש ב-tuple\n" +
        "const [count, setCount] = useState(0);\n" +
        "// count: number, setCount: (n: number) => void\n\n" +
        "// tuple מפורש\n" +
        "type NameAge = [string, number];\n" +
        "const tal: NameAge = ['Tal', 30];\n" +
        "tal[0]  // 'Tal' — string\n" +
        "tal[1]  // 30 — number",
      codeExplanation: "tuple = מערך באורך קבוע עם types שונים בעמדות. useState מחזיר tuple — value + setter.",
      extras: {
        moreExamples: [
          {
            code:
              "// optional in tuple\n" +
              "type Person = [string, number, string?];\n" +
              "const a: Person = ['Tal', 30];\n" +
              "const b: Person = ['Dan', 25, 'TLV'];",
            explanation: "ה-? בעמדה אומר שהיא optional. הפריט יכול להיות שם או לא.",
          },
          {
            code:
              "// rest in tuple\n" +
              "type Args = [string, ...number[]];\n" +
              "const x: Args = ['sum', 1, 2, 3];",
            explanation: "rest tuple — string ראשון, אז כל מה שאחרי = numbers.",
          },
        ],
        pitfalls: [
          {
            mistake: "סדר עמדות שגוי",
            why: "tuple מקפיד על סדר. [string, number] ≠ [number, string].",
            fix: "תמיד שמור על הסדר המוגדר.",
          },
        ],
        practiceQuestions: [
          {
            question: "איך מגדירים tuple של [שם, גיל]?",
            answer: "type NameAge = [string, number]; ואז const x: NameAge = ['Tal', 30];",
          },
        ],
      },
    },

    // ─── 14. enum (6) ───
    {
      conceptName: "enum",
      difficulty: 6,
      levels: {
        grandma: "enum = רשימה מובנית של ערכים אפשריים. enum Color { Red, Green, Blue }.",
        child: "כמו קבוצת קלפים שאת בוחרת מתוכם — 'אדום', 'ירוק', 'כחול'. רק מתוך הרשימה.",
        soldier: "enum = קבוצת constants עם שמות. ב-TS: ערכים יכולים להיות numbers (default) או strings.",
        student: "enum Status { Idle, Loading, Error }. מאפשר Status.Idle, Status.Loading. ב-runtime — אובייקט עם reverse mapping.",
        junior: "Pros: type-safe, autocomplete. Cons: bundle size, runtime overhead. union 'idle'|'loading' לפעמים עדיף.",
        professor: "Enums create both a type and a value. const enum erases at compile-time for performance.",
      },
      illustration:
        "🎴 enum:\n\n" +
        "  enum Status { Idle, Loading, Error }\n" +
        "  let s: Status = Status.Loading;",
      codeExample:
        "enum Direction {\n" +
        "  Up = 'UP',\n" +
        "  Down = 'DOWN',\n" +
        "  Left = 'LEFT',\n" +
        "  Right = 'RIGHT',\n" +
        "}\n\n" +
        "function move(dir: Direction) { ... }\n" +
        "move(Direction.Up);     // ✓\n" +
        "move('UP');             // ✗ string לא Direction",
      codeExplanation: "enum מגדיר רשימה. השימוש: Direction.Up. ב-runtime — אובייקט.",
      extras: {
        moreExamples: [
          {
            code:
              "// numeric enum (default)\n" +
              "enum Level { Beginner, Intermediate, Advanced }\n" +
              "// Beginner = 0, Intermediate = 1, Advanced = 2\n\n" +
              "// string enum (מומלץ)\n" +
              "enum Color {\n" +
              "  Red = 'RED',\n" +
              "  Blue = 'BLUE',\n" +
              "}",
            explanation: "string enums ברורים יותר ב-debugging. numeric — קומפקטיים אבל פחות readable.",
          },
          {
            code:
              "// alternative — union of literals\n" +
              "type Status = 'idle' | 'loading' | 'error';\n" +
              "let s: Status = 'idle';",
            explanation: "union of literals במקום enum — אפס runtime overhead, type-safe.",
          },
        ],
        pitfalls: [
          {
            mistake: "שימוש ב-numeric enum כשרוצים string",
            why: "enum Status { Idle } → Idle = 0, ב-DB יש 'Idle' אז התאמה לא תקינה.",
            fix: "enum Status { Idle = 'Idle' } או type Status = 'Idle'.",
          },
        ],
        practiceQuestions: [
          {
            question: "מתי enum ומתי union of literals?",
            answer: "enum כשצריך iteration על הערכים בזמן runtime. union literals כשרק טייפים — קל יותר.",
          },
        ],
      },
    },

    // ─── 15. void (5) ───
    {
      conceptName: "void",
      difficulty: 5,
      levels: {
        grandma: "void = 'לא מחזיר כלום'. פונקציה שעושה משהו אבל לא מחזירה ערך.",
        child: "כמו לסגור דלת — עשית פעולה, אבל לא קיבלת חזרה ערך.",
        soldier: "Return type של פונקציה שלא מחזירה: function log(msg: string): void { console.log(msg); }",
        student: "void שונה מ-undefined: void מקבל undefined בלבד; לא ניתן להחזיר ערך אחר. ב-callbacks — תפקיד חשוב.",
        junior: "המלכודת: callback עם void return — אפשר להחזיר משהו, TS מתעלם. למשל: arr.forEach(x => arr.push(x))!",
        professor: "void in callback signatures permits implementations returning any value, ignored at the call site.",
      },
      illustration: "🚫 void:\n\n  function log(msg: string): void {\n    console.log(msg);\n    // אין return\n  }",
      codeExample:
        "function logMessage(msg: string): void {\n" +
        "  console.log(msg);\n" +
        "}\n\n" +
        "// פונקציה שמחזירה void בקליק\n" +
        "<button onClick={() => alert('hi')}>...</button>\n" +
        "// onClick: () => void",
      codeExplanation: "void = פונקציה לא מחזירה ערך. event handlers ב-React הם בדרך כלל () => void.",
    },

    // ─── 16. readonly (5) ───
    {
      conceptName: "readonly",
      difficulty: 5,
      levels: {
        grandma: "readonly = 'לקריאה בלבד'. אסור לשנות אחרי האתחול.",
        child: "כמו ספר שאת קוראת אבל אסור לכתוב בו.",
        soldier: "readonly modifier על property — אסור reassignment. גם על arrays: readonly number[].",
        student: "readonly לא משפיע על runtime. רק על type-check. בערכים פנימיים של אובייקט — לא רקורסיבי.",
        junior: "props של React במהותם readonly. דרך: function Foo(props: Readonly<{name: string}>) — ייאסר על הילד לשנות.",
        professor: "readonly is a structural marker for immutability at the type level; no runtime enforcement.",
      },
      illustration: "🔒 readonly:\n\n  interface Point { readonly x: number; }\n  const p: Point = { x: 5 };\n  p.x = 10;  // ✗ readonly",
      codeExample:
        "interface User {\n" +
        "  readonly id: number;\n" +
        "  name: string;\n" +
        "}\n\n" +
        "const u: User = { id: 1, name: 'Tal' };\n" +
        "u.name = 'Dana';  // ✓\n" +
        "u.id = 2;          // ✗ readonly\n\n" +
        "// readonly array\n" +
        "const arr: readonly number[] = [1, 2, 3];\n" +
        "arr.push(4);       // ✗ method missing",
      codeExplanation: "readonly מסמן property או array שאסור לשנות. הגנה רעיונית בטיפוסים.",
    },

    // ─── 17. optional field (5) ───
    {
      conceptName: "optional field",
      difficulty: 5,
      levels: {
        grandma: "optional field = שדה שיכול להיות חסר. interface User { name: string; age?: number }.",
        child: "תווית 'לא חובה'. אפשר עם או בלי.",
        soldier: "ה-? אחרי שם השדה. הופך אותו ל-`type | undefined`.",
        student: "interface User { name: string; age?: number } — age יכול להיות חסר. בקוד: user.age יחזיר undefined אם אין.",
        junior: "Pattern: ?? לערך ברירת מחדל. const ageDisplay = user.age ?? 'לא ידוע'.",
        professor: "Optional properties are equivalent to property: T | undefined. May be absent or explicitly undefined.",
      },
      illustration: "❓ optional:\n\n  interface User {\n    name: string;       ← חובה\n    age?: number;       ← אופציונלי\n  }",
      codeExample:
        "interface Movie {\n" +
        "  title: string;\n" +
        "  director?: string;  // optional\n" +
        "  rating?: number;    // optional\n" +
        "}\n\n" +
        "const m1: Movie = { title: 'Up' };  // ✓\n" +
        "const m2: Movie = { title: 'Up', rating: 9 };  // ✓\n\n" +
        "// בקוד — חייבים לטפל ב-undefined\n" +
        "console.log(m1.director?.toUpperCase());  // optional chaining\n" +
        "console.log(m1.rating ?? 0);  // nullish coalescing",
      codeExplanation: "optional (?) מאפשר חוסר. בקוד — optional chaining (?.) ו-?? לערך ברירת מחדל.",
    },

    // ─── 18. type alias (6) ───
    {
      conceptName: "type alias",
      difficulty: 6,
      levels: {
        grandma: "type alias = לתת שם לטיפוס. במקום לכתוב string | number כל פעם, אומרים type ID = string | number.",
        child: "כמו לתת לחבר כינוי — קצר יותר משמו המלא.",
        soldier: "type Foo = X. שם ידידותי לטיפוס מורכב. מאפשר re-use.",
        student: "type aliases לטיפוסים פרימיטיביים, unions, intersections, generics. ל-objects — interface בד\"כ עדיף.",
        junior: "type vs interface: type יותר גמיש (unions, primitives, mapped). interface — extends, declaration merging.",
        professor: "Type aliases are nominal labels for structural types; semantically transparent.",
      },
      illustration:
        "🏷️ type alias:\n\n" +
        "  type Status = 'idle' | 'loading' | 'error';\n" +
        "  type ID = string | number;\n" +
        "  type Point = { x: number; y: number };",
      codeExample:
        "type ID = string | number;\n" +
        "type Status = 'idle' | 'loading' | 'error';\n" +
        "type User = {\n" +
        "  id: ID;\n" +
        "  status: Status;\n" +
        "  name: string;\n" +
        "};\n\n" +
        "const u: User = { id: 1, status: 'idle', name: 'Tal' };",
      codeExplanation: "type מגדיר שם לטיפוס. שימושי לאיחוד טיפוסים. ל-User נוכל גם interface — שניהם עובדים.",
      extras: {
        moreExamples: [
          {
            code:
              "// generic type alias\n" +
              "type Result<T> = {\n" +
              "  data: T;\n" +
              "  error: string | null;\n" +
              "};\n\n" +
              "const r: Result<User> = { data: { id: 1, ...}, error: null };",
            explanation: "Generics ב-type aliases — Result<T> מקבל כל טיפוס.",
          },
          {
            code:
              "// utility types\n" +
              "type PartialUser = Partial<User>;     // כל השדות אופציונליים\n" +
              "type ReadonlyUser = Readonly<User>;   // כל השדות readonly\n" +
              "type UserKeys = keyof User;           // 'id' | 'status' | 'name'",
            explanation: "TS מספק utility types — Partial, Readonly, Pick, Omit, Record.",
          },
        ],
        pitfalls: [
          {
            mistake: "type alias של primitives — מבולבל עם interface",
            why: "interface עובד רק על objects. type עובד על primitives + unions.",
            fix: "type ID = string. אי אפשר עם interface.",
          },
        ],
        practiceQuestions: [
          {
            question: "מתי type ומתי interface?",
            answer: "type לכל דבר (primitives, unions, generics). interface לאובייקטים שעלולים להיות extended או merge.",
          },
        ],
      },
    },

    // ─── 19. React + TypeScript (7) ───
    {
      conceptName: "React + TypeScript",
      difficulty: 7,
      levels: {
        grandma: "React + TS = React, אבל עם כל היתרונות של TypeScript. קומפוננטות, props, state — כולם typed.",
        child: "כל מה שלמדת ב-React, אבל בטוח יותר. לא תוכל לטעות.",
        soldier: "Vite + React + TS template. קבצים .tsx. props ו-state מקבלים types. event handlers, refs — הכל typed.",
        student: "Setup: npm create vite@latest -- --template react-ts. קומפוננטה: function Counter({count}: {count: number}). useState<number>(0).",
        junior: "המלכודת: לטייפ הכל ידנית. השתמש ב-FC types, React.MouseEvent, ChangeEvent. אקוסיסטם עשיר.",
        professor: "React + TS leverages structural typing for prop validation, generics for reusable components, and discriminated unions for state machines.",
      },
      illustration:
        "⚛️ React + TS:\n\n" +
        "  function Counter({ initial }: { initial: number }) {\n" +
        "    const [count, setCount] = useState<number>(initial);\n" +
        "    return <button>{count}</button>;\n" +
        "  }",
      codeExample:
        "import { useState } from 'react';\n\n" +
        "interface CounterProps {\n" +
        "  initial: number;\n" +
        "  onMax?: () => void;\n" +
        "}\n\n" +
        "function Counter({ initial, onMax }: CounterProps) {\n" +
        "  const [count, setCount] = useState<number>(initial);\n" +
        "  const handleClick = () => {\n" +
        "    const next = count + 1;\n" +
        "    setCount(next);\n" +
        "    if (next >= 10) onMax?.();\n" +
        "  };\n" +
        "  return <button onClick={handleClick}>{count}</button>;\n" +
        "}",
      codeExplanation:
        "Counter מקבל props typed ב-interface. useState עם <number>. event handlers — TS יודע את הטיפוס. כל הקוד type-safe.",
      extras: {
        moreExamples: [
          {
            code:
              "// event types\n" +
              "function Form() {\n" +
              "  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n" +
              "    console.log(e.target.value);\n" +
              "  };\n" +
              "  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {\n" +
              "    e.preventDefault();\n" +
              "  };\n" +
              "  return (\n" +
              "    <>\n" +
              "      <input onChange={handleChange} />\n" +
              "      <button onClick={handleClick}>Click</button>\n" +
              "    </>\n" +
              "  );\n" +
              "}",
            explanation: "React.ChangeEvent, React.MouseEvent — types ספציפיים לאירועי DOM.",
          },
          {
            code:
              "// children prop\n" +
              "import { ReactNode } from 'react';\n\n" +
              "interface CardProps {\n" +
              "  title: string;\n" +
              "  children: ReactNode;\n" +
              "}\n\n" +
              "function Card({ title, children }: CardProps) {\n" +
              "  return <div><h2>{title}</h2>{children}</div>;\n" +
              "}",
            explanation: "ReactNode מהאוסף שמתאים ל-children — JSX, string, number, או null.",
          },
        ],
        pitfalls: [
          {
            mistake: "ניסיון לטייפ אבל React.FC<Props>",
            why: "FC הופך children אוטומטי, יוצר בעיות עם forwardRef וכו'.",
            fix: "function Comp(props: Props) — הצורה הפשוטה והמודרנית.",
          },
          {
            mistake: "any על event handler",
            why: "מבטל את הערך של TS.",
            fix: "React.ChangeEvent<HTMLInputElement> או React.MouseEvent<HTMLButtonElement>.",
          },
        ],
        practiceQuestions: [
          {
            question: "איך לטייפ children prop?",
            answer: "children: ReactNode. או children: JSX.Element אם רוצים רק JSX.",
          },
        ],
      },
    },

    // ─── 20. Type Safety (6) ───
    {
      conceptName: "Type Safety",
      difficulty: 6,
      levels: {
        grandma: "Type Safety = הבטחה שלא יתערבו טיפוסים. אם אמרת string, לא יקבל number.",
        child: "כמו שני שקעים שונים — לא תכניסי תקע 220V לשקע 110V.",
        soldier: "Compile-time guarantee: שגיאות טיפוסים נתפסות לפני runtime. TS מתריע ב-IDE.",
        student: "Type safety ≠ memory safety. רק טיפוסים. JS עדיין יכול לזרוק שגיאות runtime (null reference וכו׳).",
        junior: "strict mode חובה — strictNullChecks, noImplicitAny. בלי זה — TS חצי שקרי.",
        professor: "Type-level invariants enforced at compile time. Erasure at runtime; safety contingent on type-correctness.",
      },
      illustration: "🛡️ Type Safety:\n\n  function divide(a: number, b: number) {\n    return a / b;\n  }\n  divide(10, '2');  // ✗ caught at compile time",
      codeExample:
        "function getUser(id: string): User { ... }\n\n" +
        "// Compile error caught:\n" +
        "getUser(42);                 // ✗\n" +
        "const u = getUser('abc');\n" +
        "u.namee;                     // ✗ typo\n" +
        "u.age = 'thirty';            // ✗ type mismatch",
      codeExplanation: "Type Safety — TS תופס את כל אלה ב-compile time. ב-JS, היו מתגלים רק ב-runtime.",
      extras: {
        moreExamples: [
          {
            code:
              "// strictNullChecks\n" +
              "function findUser(id: number): User | null { ... }\n\n" +
              "const u = findUser(5);\n" +
              "u.name;        // ✗ Object is possibly 'null'\n" +
              "u?.name;       // ✓ optional chaining\n" +
              "if (u) u.name; // ✓ narrowed",
            explanation: "strictNullChecks מחייב לטפל ב-null/undefined. אחת התכונות החזקות של TS.",
          },
        ],
        pitfalls: [
          {
            mistake: "any כדי 'לעקוף' את TS",
            why: "any מבטל את ה-type checking. כמו לחזור ל-JS.",
            fix: "unknown במקום any — דורש narrowing לפני שימוש.",
          },
        ],
        practiceQuestions: [
          {
            question: "מה הבדל בין any ל-unknown?",
            answer: "any מבטל בדיקות. unknown דורש type narrowing (typeof, instanceof) לפני שימוש.",
          },
        ],
      },
    },

    // ─── 21. Typing Props (7) ───
    {
      conceptName: "Typing Props",
      difficulty: 7,
      levels: {
        grandma: "Typing Props = לתת תוויות ל-props של קומפוננטה. קומפוננטה Counter מקבלת 'מספר התחלתי' — typed כ-number.",
        child: "אומרים לקומפוננטה: 'תקבלי name (טקסט) ו-age (מספר)'.",
        soldier: "interface Props { name: string; age: number } + function Comp({name, age}: Props).",
        student: "interface או type. function Comp(props: Props) או destructured. children: ReactNode.",
        junior: "Pattern: interface שלי מקצוע, naming convention CamelCase + 'Props'. e.g. CounterProps, ButtonProps.",
        professor: "Props typing leverages structural typing for component contracts; supports generics for parameterized components.",
      },
      illustration:
        "📦 Typing Props:\n\n" +
        "  interface ButtonProps {\n" +
        "    label: string;\n" +
        "    onClick: () => void;\n" +
        "    disabled?: boolean;\n" +
        "  }\n\n" +
        "  function Button({ label, onClick, disabled }: ButtonProps) {",
      codeExample:
        "interface CardProps {\n" +
        "  title: string;\n" +
        "  description?: string;\n" +
        "  onClick: () => void;\n" +
        "  children: React.ReactNode;\n" +
        "}\n\n" +
        "function Card({ title, description, onClick, children }: CardProps) {\n" +
        "  return (\n" +
        "    <div onClick={onClick}>\n" +
        "      <h2>{title}</h2>\n" +
        "      {description && <p>{description}</p>}\n" +
        "      {children}\n" +
        "    </div>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "interface CardProps מגדיר את ה-API. function destructures. ה-IDE מספק autocomplete + שגיאה אם תעבירי props שגויים.",
      extras: {
        moreExamples: [
          {
            code:
              "// Generic component\n" +
              "interface ListProps<T> {\n" +
              "  items: T[];\n" +
              "  renderItem: (item: T) => React.ReactNode;\n" +
              "}\n\n" +
              "function List<T>({ items, renderItem }: ListProps<T>) {\n" +
              "  return <ul>{items.map(renderItem)}</ul>;\n" +
              "}\n\n" +
              "<List items={users} renderItem={u => <li>{u.name}</li>} />",
            explanation: "Generic component — List<T> מקבל כל סוג. T נסגר לפי השימוש.",
          },
          {
            code:
              "// Discriminated union props\n" +
              "type AlertProps =\n" +
              "  | { type: 'success'; message: string }\n" +
              "  | { type: 'error'; message: string; retry: () => void };\n\n" +
              "function Alert(props: AlertProps) {\n" +
              "  if (props.type === 'error') return <button onClick={props.retry}>...</button>;\n" +
              "  return <div>{props.message}</div>;\n" +
              "}",
            explanation: "Discriminated union — TS יודע ש-retry קיים רק כש-type='error'.",
          },
        ],
        pitfalls: [
          {
            mistake: "any על props",
            why: "מבטל את כל ה-type safety.",
            fix: "תמיד interface או type מפורש.",
          },
          {
            mistake: "lowercase לcomponent",
            why: "React מתייחס לאות קטנה כתג HTML.",
            fix: "תמיד אות גדולה.",
          },
        ],
        practiceQuestions: [
          {
            question: "איך לטייפ component שמקבל title (string) + onClick (function)?",
            answer: "interface Props { title: string; onClick: () => void } + function Comp({title, onClick}: Props)",
          },
        ],
      },
    },

    // ─── 22. Typing State (6) ───
    {
      conceptName: "Typing State",
      difficulty: 6,
      levels: {
        grandma: "Typing State = לתת תווית ל-state. useState יודע מה הסוג.",
        child: "useState<number>(0) — אומרים שזה מספר.",
        soldier: "useState<T>(initial). אם initial הוא primitive — TS infers. ל-objects/arrays — annotate.",
        student: "useState<User | null>(null). useState<Movie[]>([]). useState<'idle' | 'loading'>('idle').",
        junior: "המלכודת: useState({}). TS infers {} ולא מאפשר properties. תמיד annotate object state.",
        professor: "Generic type parameter constrains state shape; default inference from initial value.",
      },
      illustration:
        "📊 Typing State:\n\n" +
        "  const [count, setCount] = useState<number>(0);          ← infer ok\n" +
        "  const [user, setUser] = useState<User | null>(null);     ← annotate\n" +
        "  const [items, setItems] = useState<Movie[]>([]);        ← annotate",
      codeExample:
        "import { useState } from 'react';\n\n" +
        "interface User {\n" +
        "  id: number;\n" +
        "  name: string;\n" +
        "}\n\n" +
        "function App() {\n" +
        "  // Primitive — infer\n" +
        "  const [count, setCount] = useState(0);\n\n" +
        "  // Object — annotate\n" +
        "  const [user, setUser] = useState<User | null>(null);\n\n" +
        "  // Array — annotate\n" +
        "  const [users, setUsers] = useState<User[]>([]);\n\n" +
        "  // Status union\n" +
        "  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');\n" +
        "}",
      codeExplanation:
        "primitive — infer. אובייקטים/מערכים — annotate ידנית. union literals שימושיים ל-status.",
      extras: {
        moreExamples: [
          {
            code:
              "// ❌ שגיאה נפוצה\n" +
              "const [user, setUser] = useState({});\n" +
              "user.name;  // ✗ Property 'name' does not exist on type '{}'\n\n" +
              "// ✅ נכון\n" +
              "const [user, setUser] = useState<User>({ id: 1, name: 'Tal' });",
            explanation: "useState({}) מסיק טייפ {}. תמיד annotate ל-objects.",
          },
        ],
        pitfalls: [
          {
            mistake: "useState({}) ל-object state",
            why: "TS infers {} בלבד — לא מאפשר properties.",
            fix: "useState<User>({ ...initial }) או useState<User | null>(null).",
          },
        ],
        practiceQuestions: [
          {
            question: "איך לטייפ useState שמתחיל ב-null אבל יהיה User?",
            answer: "useState<User | null>(null)",
          },
        ],
      },
    },

    // ─── 23. Function Prop Type (7) ───
    {
      conceptName: "Function Prop Type",
      difficulty: 7,
      levels: {
        grandma: "Function Prop Type = type של פונקציה ש-prop. onClick שמקבל לחיצה — איך לטייפ?",
        child: "onClick: () => void = פונקציה בלי ארגומנטים, לא מחזירה.",
        soldier: "(args: types) => returnType. onClick: () => void. onChange: (value: string) => void.",
        student: "אם הפונקציה מקבלת event — onClick: (e: React.MouseEvent) => void. ל-callback כללי — (id: number) => void.",
        junior: "המלכודת: useCallback בלי טייפ — ה-IDE שגוי. const handleClick = useCallback<(id: number) => void>(...).",
        professor: "Callable signatures express function shape; covariant on return type, contravariant on parameters.",
      },
      illustration:
        "📞 Function Prop Type:\n\n" +
        "  () => void                   ← simple click\n" +
        "  (id: number) => void         ← with arg\n" +
        "  (e: React.MouseEvent) => void  ← event handler\n" +
        "  () => Promise<User>          ← async",
      codeExample:
        "interface ButtonProps {\n" +
        "  label: string;\n" +
        "  onClick: () => void;\n" +
        "  onLongPress?: (duration: number) => void;\n" +
        "}\n\n" +
        "function Button({ label, onClick, onLongPress }: ButtonProps) {\n" +
        "  return (\n" +
        "    <button\n" +
        "      onClick={onClick}\n" +
        "      onMouseDown={() => {\n" +
        "        if (onLongPress) onLongPress(500);\n" +
        "      }}\n" +
        "    >\n" +
        "      {label}\n" +
        "    </button>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "onClick הוא () => void. onLongPress אופציונלי, מקבל duration. ה-IDE מתריע אם נעביר חתימה לא נכונה.",
      extras: {
        moreExamples: [
          {
            code:
              "// async callback\n" +
              "interface FormProps {\n" +
              "  onSubmit: (data: FormData) => Promise<void>;\n" +
              "}\n\n" +
              "function Form({ onSubmit }: FormProps) {\n" +
              "  const handle = async (e: React.FormEvent) => {\n" +
              "    e.preventDefault();\n" +
              "    await onSubmit(new FormData(e.target as HTMLFormElement));\n" +
              "  };\n" +
              "}",
            explanation: "async callback מחזיר Promise<void>. await בקריאה.",
          },
          {
            code:
              "// ✗ שגיאה נפוצה\n" +
              "<button onClick={handler(id)}>...</button>\n" +
              "// → קורא ל-handler מיד! onClick יקבל את הערך המוחזר\n\n" +
              "// ✓ נכון\n" +
              "<button onClick={() => handler(id)}>...</button>",
            explanation: "onClick צריך פונקציה — לא קריאה לפונקציה. עוטפים ב-arrow.",
          },
        ],
        pitfalls: [
          {
            mistake: "onClick={handler(id)}",
            why: "קורא ל-handler מיד ב-render, לא בלחיצה.",
            fix: "onClick={() => handler(id)} — arrow function שמתעכבת עד הלחיצה.",
          },
        ],
        practiceQuestions: [
          {
            question: "איך לטייפ onClick שמקבל id?",
            answer: "onClick: (id: number) => void. בקומפוננטה: <button onClick={() => onClick(myId)}>",
          },
        ],
      },
    },

    // ─── 24. models folder (3) ───
    {
      conceptName: "models folder",
      difficulty: 3,
      levels: {
        grandma: "models folder = תיקייה לכל ה-types. כל interface במקום אחד.",
        child: "כמו ארון עם מגירות — כל מודל במגירה שלו.",
        soldier: "src/models/ — convention לתיקיית types/interfaces. כל ישות (User, Movie, Order) — קובץ נפרד.",
        student: "Pattern: models/User.ts, models/Movie.ts. ייבוא: import { User } from '@/models/User'.",
        junior: "alternative names: types/, schemas/. בעצם זה convention — לא תכונה של TS.",
        professor: "Conventional organization unit for type definitions; aids discoverability and reduces coupling.",
      },
      illustration: "📁 models/:\n\n  src/\n    models/\n      User.ts\n      Movie.ts\n      Order.ts",
      codeExample:
        "// src/models/User.ts\n" +
        "export interface User {\n" +
        "  id: number;\n" +
        "  name: string;\n" +
        "  email: string;\n" +
        "}\n\n" +
        "// src/components/UserCard.tsx\n" +
        "import { User } from '@/models/User';\n\n" +
        "function UserCard({ user }: { user: User }) { ... }",
      codeExplanation: "תיקיית models מרכזת את כל ה-types. ייבוא ממקום אחד — עקבי וברור.",
    },

    // ─── 25. Todo.ts (3) ───
    {
      conceptName: "Todo.ts",
      difficulty: 3,
      levels: {
        grandma: "Todo.ts = הקובץ עם ההגדרה של מה זה Todo. id, text, done.",
        child: "כל מה שצריך לדעת על מטלה — באותו קובץ.",
        soldier: "src/models/Todo.ts: export interface Todo { id: number; text: string; done: boolean; }.",
        student: "Single Source of Truth — אם משנים את Todo, רק קובץ אחד מעודכן.",
        junior: "אפשר לכלול גם type predicates: function isCompleted(t: Todo): t is Todo & { done: true }.",
        professor: "Module-level type definition; encourages cohesion and discoverable APIs.",
      },
      illustration: "📝 Todo.ts:\n\n  export interface Todo {\n    id: number;\n    text: string;\n    done: boolean;\n  }",
      codeExample:
        "// models/Todo.ts\n" +
        "export interface Todo {\n" +
        "  id: number;\n" +
        "  text: string;\n" +
        "  done: boolean;\n" +
        "  createdAt: Date;\n" +
        "}\n\n" +
        "// components/TodoItem.tsx\n" +
        "import { Todo } from '@/models/Todo';\n" +
        "function TodoItem({ todo }: { todo: Todo }) {\n" +
        "  return <li>{todo.text}</li>;\n" +
        "}",
      codeExplanation: "Todo.ts מגדיר את ה-shape של todo. כל הקוד שעובד עם todos מייבא משם.",
    },

    // ─── 26. interface (7) ───
    {
      conceptName: "interface",
      difficulty: 7,
      levels: {
        grandma: "interface = 'חוזה' לאובייקט. אומר אילו שדות חייבים להיות, ובאילו טיפוסים.",
        child: "כמו טופס בנק — שדות שאת חייבת למלא, וכל אחד עם פורמט (תעודת זהות = 9 ספרות).",
        soldier: "interface User { id: number; name: string; }. הסכם על מבנה האובייקט. דומה ל-type alias.",
        student: "interface שונה מ-type: declaration merging (interface יכול להופיע פעמיים, השדות מתאחדים), extends.",
        junior: "Pattern: interface User extends BaseUser. enables composition. type לא תומך ב-merging.",
        professor: "Structural type definition; supports declaration merging, extends, and method signatures.",
      },
      illustration:
        "📄 interface:\n\n" +
        "  interface User {\n" +
        "    id: number;\n" +
        "    name: string;\n" +
        "    email?: string;       ← optional\n" +
        "    readonly created: Date;  ← readonly\n" +
        "  }",
      codeExample:
        "interface User {\n" +
        "  id: number;\n" +
        "  name: string;\n" +
        "  email?: string;\n" +
        "}\n\n" +
        "function greet(u: User) {\n" +
        "  console.log(`Hi ${u.name}!`);\n" +
        "  if (u.email) console.log(`Email: ${u.email}`);\n" +
        "}\n\n" +
        "greet({ id: 1, name: 'Tal' });  // ✓\n" +
        "greet({ name: 'Tal' });          // ✗ id missing",
      codeExplanation:
        "interface מגדיר את ה-shape. function שמקבל User — TS מבטיח שכל ה-required fields קיימים. optional מסומן ב-?.",
      extras: {
        moreExamples: [
          {
            code:
              "// extends\n" +
              "interface BaseUser {\n" +
              "  id: number;\n" +
              "  name: string;\n" +
              "}\n\n" +
              "interface AdminUser extends BaseUser {\n" +
              "  permissions: string[];\n" +
              "}\n\n" +
              "const a: AdminUser = { id: 1, name: 'Tal', permissions: ['admin'] };",
            explanation: "extends מרחיב — AdminUser מקבל את כל השדות של BaseUser + permissions.",
          },
          {
            code:
              "// methods in interface\n" +
              "interface Calculator {\n" +
              "  add(a: number, b: number): number;\n" +
              "  subtract(a: number, b: number): number;\n" +
              "}\n\n" +
              "const calc: Calculator = {\n" +
              "  add: (a, b) => a + b,\n" +
              "  subtract: (a, b) => a - b,\n" +
              "};",
            explanation: "interface יכול להגדיר methods. שימושי ל-classes ולקטעי קוד תפעוליים.",
          },
        ],
        pitfalls: [
          {
            mistake: "interface במקום type לprimitives",
            why: "interface עובד רק על אובייקטים. interface ID = string — שגיאה.",
            fix: "type ID = string — לprimitives.",
          },
        ],
        practiceQuestions: [
          {
            question: "מה ההבדל בין interface ל-type?",
            answer: "type לכל דבר (primitives, unions). interface רק לאובייקטים אבל תומך ב-extends + declaration merging.",
          },
        ],
      },
    },

    // ─── 27. interface vs type (7) ───
    {
      conceptName: "interface vs type",
      difficulty: 7,
      levels: {
        grandma: "interface ו-type: שתיהן עושות דבר דומה — מגדירות שמות לטיפוסים.",
        child: "מתי X ומתי Y? שני סגנונות, רוב הזמן עובדים אותו דבר.",
        soldier: "type גמיש יותר (unions, primitives, mapped). interface מאפשר extends ו-declaration merging.",
        student: "Convention: interface ל-objects שעלולים להיות extended. type לכל השאר.",
        junior: "מי שמתחיל — לבחור אחת ולהיצמד. השוק נחלק. רובם ב-React + TS — interface ל-Props, type ל-domain models.",
        professor: "Performance edge cases: interfaces are cached; type aliases re-evaluate. Marginal in most cases.",
      },
      illustration:
        "⚖️ interface vs type:\n\n" +
        "  interface User { id: number }\n" +
        "  type User = { id: number }\n" +
        "  // שתיהן עובדות דומה — בחירה סגנונית.",
      codeExample:
        "// 99% מהמקרים — שתיהן עובדות:\n" +
        "interface UserI { id: number; name: string; }\n" +
        "type UserT = { id: number; name: string; };\n\n" +
        "// extends — interface מנצח\n" +
        "interface Admin extends UserI { permissions: string[]; }\n" +
        "type AdminT = UserT & { permissions: string[]; };  // עובד גם\n\n" +
        "// unions — type מנצח\n" +
        "type Status = 'idle' | 'loading' | 'error';  // אי אפשר עם interface\n\n" +
        "// declaration merging — interface בלבד\n" +
        "interface Window { customProp: string; }  // מוסיף ל-Window הקיים",
      codeExplanation:
        "ב-99% מהמקרים שתיהן עובדות. interface עדיף ל-extends ו-merging. type עדיף ל-unions ו-primitives.",
      extras: {
        moreExamples: [
          {
            code:
              "// declaration merging — feature ייחודי ל-interface\n" +
              "interface User { id: number; }\n" +
              "interface User { name: string; }  // מוזג!\n" +
              "// User עכשיו: { id: number; name: string }",
            explanation: "interface יכול להופיע פעמיים — TS מאחד. שימושי לExtension של types חיצוניים.",
          },
        ],
        pitfalls: [
          {
            mistake: "ערבוב סגנונות בתוך אותו צוות",
            why: "חוסר עקביות = קוד מסורבל.",
            fix: "החליטו על convention. רוב הצוותים: interface ל-Props, type לdomain models.",
          },
        ],
        practiceQuestions: [
          {
            question: "מתי חובה type ולא interface?",
            answer: "Unions (type Status = 'a' | 'b'), primitives (type ID = string), mapped types.",
          },
        ],
      },
    },

    // ─── 28. union (7) ───
    {
      conceptName: "union",
      difficulty: 7,
      levels: {
        grandma: "union = 'או X או Y'. type ID = string | number — יכול להיות אחד מהם.",
        child: "כמו לבחור גלידה — וניל או שוקולד. union אומר 'אחד מהשניים'.",
        soldier: "T | U. הערך יכול להיות ב-T או ב-U. ניתן לnarrow ב-typeof, instanceof.",
        student: "Narrowing: if (typeof x === 'string') x.toUpperCase(); else x.toFixed(). TS יודע אחרי הבדיקה.",
        junior: "Discriminated unions — הdesign pattern החזק ביותר. type Result = {ok:true, data:X} | {ok:false, err:string}.",
        professor: "Sum types over union of constituent types; narrowed via discriminating tags or type guards.",
      },
      illustration:
        "🔀 union:\n\n" +
        "  type ID = string | number;\n" +
        "  let x: ID = 5;     ✓\n" +
        "  x = 'abc';         ✓\n" +
        "  x = true;          ✗",
      codeExample:
        "type Status = 'idle' | 'loading' | 'success' | 'error';\n\n" +
        "function render(status: Status) {\n" +
        "  if (status === 'loading') return <Spinner />;\n" +
        "  if (status === 'error') return <Error />;\n" +
        "  if (status === 'success') return <Data />;\n" +
        "  return null;  // idle\n" +
        "}\n\n" +
        "// Discriminated union\n" +
        "type Result =\n" +
        "  | { ok: true; data: User }\n" +
        "  | { ok: false; error: string };\n\n" +
        "function handle(r: Result) {\n" +
        "  if (r.ok) console.log(r.data.name);  // TS יודע — data קיים\n" +
        "  else console.log(r.error);          // TS יודע — error קיים\n" +
        "}",
      codeExplanation:
        "Status הוא union of literals. Discriminated union (ok: true/false) מאפשר ל-TS לדעת בכל ענף איזה type בדיוק.",
      extras: {
        moreExamples: [
          {
            code:
              "// narrowing עם typeof\n" +
              "function format(value: string | number): string {\n" +
              "  if (typeof value === 'string') {\n" +
              "    return value.toUpperCase();    // TS: value הוא string\n" +
              "  }\n" +
              "  return value.toFixed(2);          // TS: value הוא number\n" +
              "}",
            explanation: "typeof guard מאפשר ל-TS להבחין בין string ל-number אחרי הבדיקה.",
          },
          {
            code:
              "// optional vs union with undefined\n" +
              "interface User { name: string; age?: number; }       // age: number | undefined\n" +
              "interface User2 { name: string; age: number | undefined; }  // age חייב להופיע",
            explanation: "optional (?) שונה מ-union | undefined. ?: השדה לא חייב; | undefined: חייב אבל יכול להיות undefined.",
          },
        ],
        pitfalls: [
          {
            mistake: "להניח את ה-type בלי narrowing",
            why: "value: string | number — לא יכולים לקרוא ל-toUpperCase ישירות.",
            fix: "if (typeof value === 'string') לפני שימוש.",
          },
        ],
        practiceQuestions: [
          {
            question: "איך מטפלים ב-union string | number?",
            answer: "typeof value === 'string' לפני שימוש בmethods של string. אחרת number.",
          },
        ],
      },
    },

    // ─── 29. never (6) ───
    {
      conceptName: "never",
      difficulty: 6,
      levels: {
        grandma: "never = 'לא אמור לקרות'. פונקציה שזורקת error או רצה לנצח — never.",
        child: "אם בכל הסיפור משהו לעולם לא יכול לקרות — TS אומר never.",
        soldier: "Bottom type. function throwError(): never { throw ... }. אסור להחזיר ערך.",
        student: "Exhaustiveness check: switch על union — ה-default מקבל never. אם מישהו הוסיף case חדש — שגיאה.",
        junior: "השימוש ה-real-world — ב-discriminated union switches. const _exhaustive: never = action; מבטיח כיסוי מלא.",
        professor: "Bottom type, subtype of all types; signals unreachable code or impossible states.",
      },
      illustration:
        "🚫 never:\n\n" +
        "  function throwErr(): never { throw new Error(); }\n" +
        "  function loop(): never { while (true) {} }",
      codeExample:
        "type Status = 'idle' | 'loading' | 'error';\n\n" +
        "function render(status: Status) {\n" +
        "  switch (status) {\n" +
        "    case 'idle': return <Idle />;\n" +
        "    case 'loading': return <Spinner />;\n" +
        "    case 'error': return <Error />;\n" +
        "    default:\n" +
        "      const _exhaustive: never = status;  // אם תוסיף status חדש — error כאן\n" +
        "      return null;\n" +
        "  }\n" +
        "}",
      codeExplanation:
        "Exhaustiveness check: ה-default מקבל never. אם נוסיף 'success' ל-Status — TS יתריע שלא טיפלנו בו.",
      extras: {
        moreExamples: [
          {
            code:
              "// פונקציה שזורקת\n" +
              "function fail(msg: string): never {\n" +
              "  throw new Error(msg);\n" +
              "}\n\n" +
              "function getUser(id: number) {\n" +
              "  if (id < 0) fail('Invalid id');\n" +
              "  // TS יודע: id >= 0 כאן\n" +
              "}",
            explanation: "fail() never — אחריה ה-control flow לעולם לא ממשיך. TS משתמש בזה ל-narrowing.",
          },
        ],
        pitfalls: [
          {
            mistake: "ניסיון להחזיר ערך מ-never",
            why: "never אומר 'לעולם לא מחזיר'. אסור.",
            fix: "אם הפונקציה כן מחזירה, הtype הוא void או type אמיתי.",
          },
        ],
        practiceQuestions: [
          {
            question: "מתי כדאי never?",
            answer: "Exhaustiveness check ב-switch על union. ופונקציות שזורקות exception תמיד.",
          },
        ],
      },
    },

    // ─── 30. any (5) ───
    {
      conceptName: "any",
      difficulty: 5,
      levels: {
        grandma: "any = 'כל דבר'. מבטל את ה-type checking. כמעט תמיד — סימן ל-bug.",
        child: "אם תכתבי any, TS מתעלם. כמו לכתוב JS רגיל. רוב הזמן שגיאה.",
        soldier: "any opts out of type checking. let x: any = 5; x.foo.bar.baz — לא תהיה שגיאה (אבל runtime ייכשל).",
        student: "תחליפים ל-any: unknown (דורש narrowing), generic <T>, ספציפי. any רק כ-temporary escape hatch.",
        junior: "noImplicitAny ב-tsconfig — חובה. any ללא annotation = שגיאה. מאלץ סטנדרט.",
        professor: "any disables type checking; conceptually equivalent to JS. Anti-pattern except in migration scenarios.",
      },
      illustration: "⚠️ any — סימן אזהרה:\n\n  let x: any = 5;\n  x.foo.bar.baz;   ✓ TS allows!\n  // אבל ב-runtime — Error",
      codeExample:
        "// ❌ any — אין הגנה\n" +
        "function process(data: any) {\n" +
        "  return data.user.name.toUpperCase();  // any goes!\n" +
        "}\n" +
        "process(null);  // runtime crash\n\n" +
        "// ✓ unknown — דורש narrowing\n" +
        "function process2(data: unknown) {\n" +
        "  if (typeof data === 'object' && data && 'user' in data) {\n" +
        "    // narrow לפני שימוש\n" +
        "  }\n" +
        "}",
      codeExplanation: "any מבטל הגנה. unknown דורש narrowing — בטוח יותר. ב-99% מהמקרים, השתמש ב-unknown או generic.",
    },
  ],

  quiz: [
    {
      question: "מה ההבדל בין any ל-unknown?",
      options: [
        "אין הבדל",
        "any מבטל בדיקות (אסור!). unknown דורש narrowing לפני שימוש (בטוח)",
        "unknown ישן יותר",
        "any רק בעבודה ב-React",
      ],
      correct: 1,
      explanation: "any מבטל את כל ה-type checking. unknown מחייב לבדוק את ה-type לפני שמשתמשים — בטוח הרבה יותר.",
    },
    {
      question: "איך לטייפ useState שיכול להיות null או User?",
      options: [
        "useState(null)",
        "useState<User | null>(null)",
        "useState<any>(null)",
        "useState<User>(null)",
      ],
      correct: 1,
      explanation: "useState<User | null>(null) — annotate union ל-state שיכול להתחיל ב-null.",
    },
    {
      question: "מה ההבדל בין interface ל-type?",
      options: [
        "אין הבדל",
        "interface רק לאובייקטים, תומך ב-extends ו-merging. type לכל דבר (unions, primitives)",
        "interface חדש יותר",
        "type לא קיים",
      ],
      correct: 1,
      explanation: "ב-99% מהמקרים שתיהן עובדות. interface תומך ב-extends + merging. type לunions ו-primitives.",
    },
    {
      question: "איך מטפלים ב-union string | number?",
      options: [
        "value.toUpperCase()",
        "if (typeof value === 'string') value.toUpperCase(); else value.toFixed()",
        "value as string",
        "value!",
      ],
      correct: 1,
      explanation: "narrowing עם typeof — TS יודע אחרי הבדיקה איזה type בדיוק.",
    },
    {
      question: "איך לטייפ onClick שמקבל id ו-לא מחזיר?",
      options: [
        "onClick: any",
        "onClick: (id: number) => void",
        "onClick: (id) => void",
        "onClick: function",
      ],
      correct: 1,
      explanation: "(id: number) => void — פונקציה שמקבלת number ולא מחזירה ערך.",
    },
    {
      question: "מה useState מחזיר ב-TypeScript?",
      options: [
        "object",
        "tuple — [value, setter]",
        "array",
        "string",
      ],
      correct: 1,
      explanation: "Tuple — fixed-length array עם types שונים. [value, setter] תמיד באותו סדר.",
    },
  ],
};
