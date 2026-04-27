// data/lesson06.js — שיעור 06: ES6+ Advanced
// JS מודרני. מבחן: 6-8 שאלות צפויות.
var LESSON_06 = {
  id: "lesson_06",
  title: "שיעור 06 — ES6+ Advanced — Spread, Destructuring, Modules, Optional Chaining",
  description:
    "תכונות מודרניות של JS: spread/rest, destructuring, modules (import/export), template literals, optional chaining, nullish coalescing.",
  concepts: [
    {
      conceptName: "destructuring",
      difficulty: 5,
      levels: {
        grandma: "פירוק = לקחת ערכים מאובייקט/מערך ולשים במשתנים נפרדים בשורה אחת.",
        child: "כמו לפתוח שקית סוכריות ולחלק ישר לכל אחד את הסוכרייה שלו.",
        soldier: "const { a, b } = obj; const [x, y] = arr; — הצבה מובנית של חלקים.",
        student: "Destructuring: object pattern { a, b }, array pattern [x, y]. Default values, renaming, rest pattern. Works in: const, function params, return.",
        junior: "פעם כתבתי const name = user.name; const age = user.age; const email = user.email; — 3 שורות. עכשיו const { name, age, email } = user; — שורה אחת.",
        professor: "ES2015 destructuring assignment. Pattern matching (limited). Computed property names: { [key]: val } = obj. Iterable destructuring (arrays, sets, maps). Default values evaluated lazily.",
      },
      illustration:
        "📦 Destructuring:\n  const { name, age } = user;\n  const [first, second] = arr;\n  function greet({ name, lang = 'he' }) { ... }",
      codeExample:
        "// Object destructuring\nconst user = { name: 'Tal', age: 30, email: 'tal@x.com' };\nconst { name, age } = user;  // name='Tal', age=30\n\n// With renaming\nconst { name: userName } = user;  // userName='Tal'\n\n// With default\nconst { country = 'IL' } = user;  // country='IL' (לא קיים → default)\n\n// Nested\nconst { address: { city } } = user;  // city מחילק כולל\n\n// Array destructuring\nconst [first, second, ...rest] = [1, 2, 3, 4, 5];\n// first=1, second=2, rest=[3,4,5]\n\n// Function params\nfunction createUser({ name, email, age = 18 }) {\n  return { name, email, age };\n}\ncreateUser({ name: 'X', email: 'x@y.com' });  // age defaults to 18\n\n// Skip elements\nconst [a, , c] = [1, 2, 3];  // c=3, skip 2",
      codeExplanation: "Object: { name } = obj. Array: [a, b]. ניתן עם default, rename, rest, nested. Function params destructuring = clean signature.",
    },
    {
      conceptName: "spread / rest",
      difficulty: 5,
      levels: {
        grandma: "Spread = פתיחה (פיזור איברים). Rest = איסוף (קליטה לתוך מערך).",
        child: "פיזור פאזל לחלקים, או איסוף חלקים לתוך קופסה.",
        soldier: "...arr בקריאה = spread (פיזור). ...arr בהצהרה = rest (איסוף).",
        student: "spread (...): expand iterable into elements. rest (...x): collect remaining args. Same syntax, opposite directions. Used in arrays, objects (ES2018), function args.",
        junior: "פעם השתמשתי ב-arr.concat(other) או Object.assign({}, obj, other). עכשיו: [...arr, ...other] ו-{ ...obj, ...other }. קריא הרבה יותר.",
        professor: "Iteration protocol: spread invokes [Symbol.iterator]. Object spread (ES2018) = own enumerable properties. Order matters: { ...a, ...b } — b overrides a. Shallow, not deep.",
      },
      illustration:
        "🌀 Spread vs Rest:\n  spread (פתיחה):  fn(...arr)         arr → elements\n  rest (איסוף):    fn(...args) {}     elements → args[]",
      codeExample:
        "// Spread — array\nconst arr1 = [1, 2, 3];\nconst arr2 = [...arr1, 4, 5];  // [1,2,3,4,5]\nconst copy = [...arr1];        // shallow copy\n\n// Spread — function call\nMath.max(...arr1);  // = Math.max(1, 2, 3)\n\n// Spread — object (ES2018)\nconst user = { name: 'Tal', age: 30 };\nconst updated = { ...user, age: 31 };  // {name: 'Tal', age: 31}\n\n// Rest — function args\nfunction sum(...nums) {\n  return nums.reduce((s, n) => s + n, 0);\n}\nsum(1, 2, 3, 4);  // 10\n\n// Rest — destructuring\nconst { name, ...rest } = user;\n// name='Tal', rest={age: 30}\n\nconst [head, ...tail] = [1, 2, 3, 4];\n// head=1, tail=[2,3,4]",
      codeExplanation: "spread ב-call/literal = פיזור. rest ב-declaration = איסוף. שילוב הכי פופולרי: [...arr, x] ו-{...obj, key: val}.",
    },
    {
      conceptName: "module (import/export)",
      difficulty: 6,
      levels: {
        grandma: "פיצול קוד לקבצים נפרדים — כל קובץ עם תפקיד. אפשר 'לייבא' פונקציות מקובץ אחד לאחר.",
        child: "כמו ארגז כלים — כל ארגז מכיל כלים שונים, אתה לוקח רק מה שצריך.",
        soldier: "ES Modules: export מ-קובץ, import לקובץ אחר. <script type=\"module\"> בדפדפן.",
        student: "ES Modules (ESM). export named (export const x) או default (export default). import { x } או import x. Static analysis = tree shaking. Top-level await (ES2022).",
        junior: "פעם CommonJS (require/module.exports) ב-Node, script tags ב-browser. עכשיו ESM אחיד — type='module' ב-browser, .mjs או \"type\":\"module\" ב-Node.",
        professor: "ESM (ECMAScript Modules) spec ES2015. Imports hoisted, evaluated once (cached). Static (compile-time analysis enables tree shaking). Cyclic deps handled via live bindings. Dynamic import(): lazy loading.",
      },
      illustration:
        "📦 ES Modules:\n  utils.js: export const sum = ...\n  app.js:   import { sum } from './utils.js';\n            sum(2, 3);",
      codeExample:
        "// utils.js\nexport const PI = 3.14;\nexport function sum(a, b) { return a + b; }\nexport class Calculator { ... }\nexport default function main() { ... }\n\n// app.js — named imports\nimport { PI, sum, Calculator } from './utils.js';\nconsole.log(sum(2, 3));  // 5\n\n// app.js — default import\nimport main from './utils.js';\nmain();\n\n// app.js — namespace import\nimport * as utils from './utils.js';\nutils.PI;\nutils.sum(2, 3);\n\n// app.js — combined\nimport main, { PI, sum } from './utils.js';\n\n// Dynamic import (lazy)\nconst { sum } = await import('./utils.js');\n\n// In HTML\n<script type=\"module\" src=\"app.js\"></script>",
      codeExplanation: "named exports = useful for many. default = main. namespace = ייבוא הכל. dynamic import = lazy. <script type=\"module\"> בדפדפן.",
    },
    {
      conceptName: "template literal",
      difficulty: 3,
      levels: {
        grandma: "מחרוזת עם הכנסת משתנים — בלי לחבר עם +. גם תומך בשורות.",
        child: "כמו לכתוב מסר עם 'שלום ${שם}' במקום 'שלום ' + שם.",
        soldier: "Template literal עם backticks (`) ו-${expression}. תומך ב-multi-line.",
        student: "Backtick strings. ${} for any expression. Tagged templates: tag\\`...\\` calls function. Multi-line natural. Replaces concat + and \\\\n.",
        junior: "פעם כתבתי 'Hello ' + name + ', you are ' + age + ' years old'. עכשיו `Hello ${name}, you are ${age} years old`. קריא 10x.",
        professor: "ES2015 template literals. Tagged templates enable DSLs (styled-components, gql). Raw strings via String.raw. Multi-line preserves whitespace literally.",
      },
      illustration: "📝 Template literal:\n  `Hello ${name}, age ${age}`\n  → backticks + ${expression}\n  → multi-line OK",
      codeExample:
        "// Basic interpolation\nconst name = 'Tal';\nconst greeting = `Hello, ${name}!`;\n\n// Expressions\nconst price = 100;\nconst tax = 0.17;\nconst total = `Total: ₪${price * (1 + tax)}`;\n\n// Multi-line\nconst html = `\n<div class=\"card\">\n  <h2>${title}</h2>\n  <p>${description}</p>\n</div>\n`;\n\n// Tagged templates (advanced)\nfunction sql(strings, ...values) {\n  return strings.reduce((acc, s, i) => acc + s + (i < values.length ? `'${values[i]}'` : ''), '');\n}\nconst userId = 5;\nconst query = sql`SELECT * FROM users WHERE id = ${userId}`;\n// → \"SELECT * FROM users WHERE id = '5'\"",
      codeExplanation: "Backticks (`). ${expression} כולל function calls, math. Multi-line טבעי. Tagged templates ל-DSL (gql, styled).",
    },
    {
      conceptName: "optional chaining",
      difficulty: 5,
      levels: {
        grandma: "במקום לבדוק אם כל שלב קיים — סימן ? אומר 'אם זה לא קיים, החזר undefined'.",
        child: "כמו לשאול 'אם יש מקרר... ויש בו חלב... תן לי' — בלי לקרוס אם אין מקרר.",
        soldier: "obj?.prop = obj.prop אם obj קיים, אחרת undefined (לא error).",
        student: "Optional chaining (?.) ב-ES2020. Variants: obj?.prop, arr?.[0], fn?.(). short-circuits ב-null/undefined → undefined.",
        junior: "פעם user && user.address && user.address.city — נורא. עכשיו user?.address?.city. טעות נפוצה: ?. רק כשבאמת אופציונלי, לא כדפולט.",
        professor: "Optional chaining short-circuits left-to-right. Only checks for null/undefined (not falsy). Common use: API responses, deep object navigation. Combine with ?? for default values.",
      },
      illustration:
        "🔗 Optional chaining (?.):\n  user?.address?.city\n  ↓\n  אם user undefined → undefined\n  אם address undefined → undefined\n  אחרת → city",
      codeExample:
        "// ❌ Old way\nif (user && user.address && user.address.city) {\n  console.log(user.address.city);\n}\n\n// ✅ Optional chaining\nconsole.log(user?.address?.city);  // undefined אם משהו missing\n\n// Method calls\nuser?.greet?.();  // קורא רק אם greet קיים\n\n// Array access\nusers?.[0]?.name;\n\n// עם default value (??)\nconst city = user?.address?.city ?? 'Unknown';\n\n// קלאסיקה: API response\nfetch('/api/user')\n  .then(r => r.json())\n  .then(data => {\n    const street = data?.address?.street ?? 'No address';\n    // עובד גם אם data null או .address חסר\n  });",
      codeExplanation: "?. במקום ((a && a.b && a.b.c)). על methods (?.()), arrays (?.[]). שילוב עם ?? = default אם undefined.",
    },
    {
      conceptName: "nullish coalescing",
      difficulty: 5,
      levels: {
        grandma: "?? נותן ערך ברירת מחדל אם המשתנה null או undefined — אבל לא אם 0 או '' או false.",
        child: "כמו לשאול 'אם אין צבע, השתמש בכחול' — אבל אפס הוא צבע, לא 'אין'.",
        soldier: "a ?? b: אם a הוא null/undefined → b. אחרת → a.",
        student: "?? operator (ES2020). Returns left if not null/undefined, else right. Differs from ||: || is falsy-check (0, '', false, NaN return right).",
        junior: "טעות נפוצה: const port = process.env.PORT || 3000. אבל אם PORT='0' → 3000 בטעות. עם ??: process.env.PORT ?? 3000 — רק אם undefined.",
        professor: "?? operator: nullish (null/undefined) check. ?? cannot be combined with || or && without parens. ??= compound assignment (a ??= b same as a = a ?? b).",
      },
      illustration:
        "🤔 ?? vs ||:\n  0 || 'def'  → 'def' (0 is falsy)\n  0 ?? 'def'  → 0 (0 is not nullish)\n  null ?? 'def' → 'def'\n  undefined ?? 'def' → 'def'",
      codeExample:
        "// || — falsy check (problematic)\nconst count1 = userCount || 100;  // אם userCount=0 → 100 (לא רצוי!)\n\n// ?? — nullish check (better)\nconst count2 = userCount ?? 100;  // 0 הוא valid → count=0\n\n// Combined with optional chaining\nconst city = user?.address?.city ?? 'Unknown';\n\n// Logical assignment\nlet x;\nx ??= 'default';  // x = x ?? 'default'\nconsole.log(x);  // 'default'\n\nx ??= 'other';\nconsole.log(x);  // 'default' (לא משתנה כי כבר defined)\n\n// React: default props\nfunction Button({ label, color }) {\n  const bg = color ?? 'blue';  // '' עדיין '', לא 'blue'\n  // אם היינו עם || — '' היה הופך ל-'blue' (לא רצוי)\n}",
      codeExplanation: "?? בודק רק null/undefined. || בודק כל falsy (כולל 0, '', false). ?? עדיף לdefaults של counters/strings.",
    },
  ],
};
