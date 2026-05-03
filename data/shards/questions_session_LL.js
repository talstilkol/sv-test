// Sprint 2 batch LL - ES6+ syntax tricks (destructuring patterns, optional chaining, nullish coalescing, etc)
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_LL = {
  mc: [
    { id: "mc_es_optional_chain_ll_001", topicId: "topic_js", conceptKey: "lesson_19::nested object", level: 6,
      question: "מה user?.address?.city מחזיר אם user==null?",
      options: [
        "undefined — Optional chaining מקטיע ומחזיר undefined מבלי לזרוק TypeError על property access ב-null",
        "null",
        "TypeError",
        "''"
      ],
      correctIndex: 0,
      explanation: "?. בודק אם הצד השמאלי null/undefined → מחזיר undefined ועוצר השרשרת.",
      optionFeedback: [
        "✅ נכון. short-circuit.",
        "❌ undefined ספציפית.",
        "❌ זה ה-fix לזה.",
        "❌ לא string."
      ]
    },
    { id: "mc_es_nullish_ll_001", topicId: "topic_js", conceptKey: "lesson_19::nested object", level: 6,
      question: "מה ההבדל בין || ל-??",
      options: [
        "|| חוזר ל-rhs על כל falsy (0, '', false, null, undefined). ?? רק על null/undefined — שומר 0/''",
        "זהים",
        "?? מהיר",
        "|| ל-strings"
      ],
      correctIndex: 0,
      explanation: "const port = config.port ?? 3000; — port=0 נשמר. עם || port=0 → 3000.",
      optionFeedback: [
        "✅ נכון. nullish only.",
        "❌ שונים.",
        "❌ דומה.",
        "❌ universal."
      ]
    },
    { id: "mc_es_logical_assign_ll_001", topicId: "topic_js", conceptKey: "lesson_19::nested object", level: 7,
      question: "מה x ??= 5 עושה?",
      options: [
        "השמה רק אם x null/undefined: x = x ?? 5. גם ||= ו-&&= אנלוגיים. ES2021",
        "x = 5",
        "Always",
        "Throws"
      ],
      correctIndex: 0,
      explanation: "x ??= 5 ⇔ x ?? (x = 5). שונה מ-x ||= 5 שכותב גם על 0.",
      optionFeedback: [
        "✅ נכון. logical assignment.",
        "❌ תנאי.",
        "❌ תנאי.",
        "❌ אין error."
      ]
    },
    { id: "mc_es_destruct_default_ll_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 6,
      question: "מה const { a = 1 } = obj עושה אם obj.a undefined?",
      options: [
        "a = 1 — default kicks in רק על undefined (לא על null/0/'/'). דומה ל-?? semantically",
        "a = obj.a",
        "TypeError",
        "a = null"
      ],
      correctIndex: 0,
      explanation: "{a=1} = {a: null} → a = null. {a=1} = {} → a = 1. כמו ?? בתוך destructuring.",
      optionFeedback: [
        "✅ נכון.",
        "❌ undefined.",
        "❌ אין error.",
        "❌ אם obj.a==null → null."
      ]
    },
    { id: "mc_es_destruct_rename_ll_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 6,
      question: "מה const { a: b } = obj?",
      options: [
        "מחלץ obj.a ל-משתנה b. שימושי כשהשם הקיים מתנגש או לא תיאורי",
        "Type assertion",
        "Spread",
        "Default"
      ],
      correctIndex: 0,
      explanation: "const { name: userName, age: userAge = 0 } = user; — rename + default.",
      optionFeedback: [
        "✅ נכון. rename pattern.",
        "❌ TS שונה.",
        "❌ spread שונה.",
        "❌ default שונה."
      ]
    },
    { id: "mc_es_destruct_nested_ll_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 7,
      question: "מה const { a: { b } } = obj?",
      options: [
        "מחלץ obj.a.b ל-משתנה b. שימוש זהיר: זורק TypeError אם obj.a==null. עדיף עם default {a:{}}",
        "obj.a obj.b",
        "Object",
        "Class"
      ],
      correctIndex: 0,
      explanation: "{a:{b}={}} = obj — default object אם a undefined. או a:{b}={} ש-{} default.",
      optionFeedback: [
        "✅ נכון. nested.",
        "❌ separate properties.",
        "❌ לא class.",
        "❌ לא object new."
      ]
    },
    { id: "mc_es_destruct_array_ll_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 5,
      question: "מה const [a, b, ...rest] = [1,2,3,4,5]?",
      options: [
        "a=1, b=2, rest=[3,4,5] — array destructuring + rest. שימושי לראש+זנב",
        "TypeError",
        "All in rest",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Skip elements: const [, , third] = arr → רק arr[2].",
      optionFeedback: [
        "✅ נכון.",
        "❌ אין error.",
        "❌ a/b ראשונים.",
        "❌ דטרמיניסטי."
      ]
    },
    { id: "mc_es_destruct_swap_ll_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 6,
      question: "איך swap שתי variables ב-ES6?",
      options: [
        "[a, b] = [b, a] — temp variable לא נדרש. iconic ES6 trick",
        "Math.swap",
        "destructure object",
        "Object.assign"
      ],
      correctIndex: 0,
      explanation: "ב-ES5 צריך temp. ES6: array destructuring על RHS.",
      optionFeedback: [
        "✅ נכון.",
        "❌ אין כזה.",
        "❌ מורכב יותר.",
        "❌ overkill."
      ]
    },
    { id: "mc_es_template_lit_ll_001", topicId: "topic_js", conceptKey: "lesson_19::function", level: 5,
      question: "מה template literal מאפשר על strings רגילים?",
      options: [
        "Multi-line, interpolation עם ${expr}, tagged templates: html`<div>${x}</div>`",
        "Faster",
        "Type",
        "Async"
      ],
      correctIndex: 0,
      explanation: "tagged templates נפוצים ב-styled-components, gql, html. cooked + raw arrays.",
      optionFeedback: [
        "✅ נכון.",
        "❌ אין הבדל perf משמעותי.",
        "❌ syntax לא types.",
        "❌ async unrelated."
      ]
    },
    { id: "mc_es_short_obj_ll_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 5,
      question: "מה const obj = { name, age } כש-name ו-age קיימים?",
      options: [
        "Property shorthand: ⇔ { name: name, age: age }. מקצר כשהvar שם זהה ל-key",
        "Computed key",
        "Spread",
        "Class"
      ],
      correctIndex: 0,
      explanation: "ES6 shorthand. עובד רק כשהשם זהה. לא ל-renames.",
      optionFeedback: [
        "✅ נכון.",
        "❌ computed = [k]:v.",
        "❌ spread שונה.",
        "❌ unrelated."
      ]
    },
    { id: "mc_es_computed_key_ll_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 6,
      question: "מה const obj = { [key]: value }?",
      options: [
        "Computed property key — שם property מתאר ב-runtime. שימושי ל-keys דינמיים, Symbols",
        "Type",
        "Static",
        "Const"
      ],
      correctIndex: 0,
      explanation: "const k = 'name'; const o = {[k]: 'Tal'}; → o.name === 'Tal'.",
      optionFeedback: [
        "✅ נכון.",
        "❌ JS לא TS.",
        "❌ runtime לא static.",
        "❌ const שונה."
      ]
    },
    { id: "mc_es_method_short_ll_001", topicId: "topic_js", conceptKey: "lesson_19::method shorthand", level: 5,
      question: "מה const obj = { greet() {...} } שונה מ-greet: function() {}?",
      options: [
        "Method shorthand — קצר יותר וגם מאפשר super() (לא קיים ב-function expression). ES6",
        "Faster",
        "Async",
        "Same"
      ],
      correctIndex: 0,
      explanation: "Object methods: { foo() {}, async bar() {}, *gen() {} } — shorthand תומך גם async/generator.",
      optionFeedback: [
        "✅ נכון.",
        "❌ דומה.",
        "❌ optional.",
        "❌ נכון יש הבדל."
      ]
    },
    { id: "mc_es_arrow_no_args_ll_001", topicId: "topic_js", conceptKey: "lesson_11::function", level: 6,
      question: "מה ההבדל בין function() ל-() => ב-arguments?",
      options: [
        "function() יש אובייקט arguments. arrow אין — עליו להשתמש ב-rest (...args)",
        "זהים",
        "Arrow has",
        "Different naming"
      ],
      correctIndex: 0,
      explanation: "function() { return arguments[0]; } ✓. () => arguments → reference למסוגר.",
      optionFeedback: [
        "✅ נכון.",
        "❌ שונים.",
        "❌ הפוך.",
        "❌ אין כזה."
      ]
    },
    { id: "mc_es_default_param_ll_001", topicId: "topic_js", conceptKey: "lesson_19::function", level: 5,
      question: "מה function f(x = 5) שונה מ-x = x || 5 בגוף?",
      options: [
        "Default param רק על undefined (לא על 0/false). x = x || 5 על כל falsy. ES6 default מדויק",
        "זהים",
        "Faster",
        "Type"
      ],
      correctIndex: 0,
      explanation: "f(0) → x = 0 (default).  f() → x = 5.",
      optionFeedback: [
        "✅ נכון. nullish-like.",
        "❌ שונים.",
        "❌ דומה.",
        "❌ syntax."
      ]
    },
    { id: "mc_es_class_ll_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 6,
      question: "מה class ב-ES6 באמת?",
      options: [
        "Syntactic sugar על prototypal inheritance — מתחת compile ל-function constructor + prototype methods",
        "OOP class",
        "Different model",
        "Static only"
      ],
      correctIndex: 0,
      explanation: "class A {} ⇔ function A() {} עם A.prototype.method = .... אך עם differences (constructor, super).",
      optionFeedback: [
        "✅ נכון. sugar.",
        "❌ JS prototype-based.",
        "❌ אותה מודל.",
        "❌ static בלבד שונה."
      ]
    },
    { id: "mc_es_class_static_ll_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 6,
      question: "מה static method ב-class?",
      options: [
        "Method על ה-class עצמה, לא על instances. Math.max דוגמה native. גישה: ClassName.staticMethod()",
        "Instance",
        "Private",
        "Constructor"
      ],
      correctIndex: 0,
      explanation: "class A { static create() {} }. const a = new A(); a.create() ❌. A.create() ✓.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הפוך.",
        "❌ private שונה (#).",
        "❌ constructor שונה."
      ]
    },
    { id: "mc_es_class_private_ll_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 7,
      question: "מה # ב-class fields/methods?",
      options: [
        "Private — נגיש רק בתוך הclass. גישה מבחוץ זורקת SyntaxError. ES2022",
        "Protected",
        "Comment",
        "Static"
      ],
      correctIndex: 0,
      explanation: "class C { #x = 0; getX() { return this.#x; } }. אמיתי מאז 2022.",
      optionFeedback: [
        "✅ נכון. true private.",
        "❌ אין protected ב-JS.",
        "❌ # syntax.",
        "❌ static = static."
      ]
    },
    { id: "mc_es_class_extends_ll_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 6,
      question: "מה class B extends A מאפשר?",
      options: [
        "B יורש מ-A — B.prototype.__proto__ = A.prototype, B.__proto__ = A. super() נגיש בconstructor",
        "Composition",
        "Mixin",
        "Static only"
      ],
      correctIndex: 0,
      explanation: "constructor חייב לקרוא super(args) לפני שימוש ב-this.",
      optionFeedback: [
        "✅ נכון. inheritance.",
        "❌ קומפוזיציה pattern אחר.",
        "❌ mixin שונה.",
        "❌ כולל instances."
      ]
    },
    { id: "mc_es_super_ll_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 7,
      question: "מתי super.method() לעומת super()?",
      options: [
        "super() = call ל-parent constructor (חובה ב-derived). super.method() = call ל-parent method מתוך method של child",
        "זהים",
        "super() ב-method",
        "super.method() ב-constructor"
      ],
      correctIndex: 0,
      explanation: "class B extends A { constructor() { super(); } speak() { super.speak(); console.log('also'); } }.",
      optionFeedback: [
        "✅ נכון. context-dependent.",
        "❌ שונים.",
        "❌ הפוך.",
        "❌ הפוך."
      ]
    },
    { id: "mc_es_modules_ll_001", topicId: "topic_js", conceptKey: "lesson_19::function", level: 5,
      question: "מה default export שונה מ-named?",
      options: [
        "Default: export default x. Import: import anyName from '...'. רק אחד per module. Named: export const a; import { a }",
        "זהים",
        "Default async",
        "Named static"
      ],
      correctIndex: 0,
      explanation: "import C from './C' (default). import { x, y } from './module' (named). ניתן לערבב.",
      optionFeedback: [
        "✅ נכון.",
        "❌ שונים.",
        "❌ unrelated.",
        "❌ דומה."
      ]
    },
    { id: "mc_es_modules_dynamic_ll_001", topicId: "topic_js", conceptKey: "lesson_19::function", level: 7,
      question: "מה import() (dynamic)?",
      options: [
        "Function-call-like syntax שמחזיר Promise של module. שימושי ל-code splitting, conditional load",
        "Sync only",
        "Static",
        "Same as import"
      ],
      correctIndex: 0,
      explanation: "const m = await import('./heavy.js'); m.default. תומך ב-React.lazy.",
      optionFeedback: [
        "✅ נכון.",
        "❌ async.",
        "❌ הפוך.",
        "❌ async דינמי."
      ]
    },
    { id: "mc_es_async_ll_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 6,
      question: "מה async function מחזיר תמיד?",
      options: [
        "Promise — גם אם ה-body מחזיר ערך 'רגיל'. wrap אוטומטי ב-Promise.resolve",
        "Value",
        "Generator",
        "Iterator"
      ],
      correctIndex: 0,
      explanation: "async () => 1; ⇔ () => Promise.resolve(1). throws → rejected promise.",
      optionFeedback: [
        "✅ נכון.",
        "❌ wrapped.",
        "❌ generator שונה.",
        "❌ iterator שונה."
      ]
    },
    { id: "mc_es_await_ll_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 6,
      question: "מתי await שווה ל-.then?",
      options: [
        "סמנטית: await p ⇔ p.then(value => continue) — אך אסון לקריאות sequential נראה כ-sync code",
        "Faster",
        "Different",
        "Always different"
      ],
      correctIndex: 0,
      explanation: "await מגרסת error handling (try/catch), פחות nesting. .then ל-chains קצרים.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זהה ב-runtime.",
        "❌ זהים.",
        "❌ זהים."
      ]
    },
    { id: "mc_es_promise_all_ll_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 7,
      question: "מה Promise.all vs Promise.allSettled?",
      options: [
        "all מסתיים ב-rejected אם אחד נכשל. allSettled מחכה לכל המסתיים. שניהם ל-parallel",
        "זהים",
        "all sequential",
        "allSettled async"
      ],
      correctIndex: 0,
      explanation: "all → רק אם כולם הצליחו. allSettled → מחזיר [{status,value/reason}, ...] עבור כל אחד.",
      optionFeedback: [
        "✅ נכון.",
        "❌ שונים.",
        "❌ parallel.",
        "❌ שניהם async."
      ]
    },
    { id: "mc_es_promise_race_ll_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 7,
      question: "מה Promise.race?",
      options: [
        "מחזיר את ה-Promise הראשון שיסתיים (resolve או reject). שימוש: timeout patterns",
        "Slowest",
        "All",
        "Any successful"
      ],
      correctIndex: 0,
      explanation: "Promise.any ב-2021 ל-first success (מתעלם מ-rejects אם יש success).",
      optionFeedback: [
        "✅ נכון.",
        "❌ הפוך.",
        "❌ שונה.",
        "❌ זה Promise.any."
      ]
    },
    { id: "mc_es_promise_any_ll_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 7,
      question: "מה Promise.any?",
      options: [
        "מחזיר את הראשון שsuccess. Rejects רק אם כל ה-promises rejected (AggregateError)",
        "race",
        "all",
        "First only"
      ],
      correctIndex: 0,
      explanation: "any ≠ race. race יקבל reject ראשון. any מחפש success.",
      optionFeedback: [
        "✅ נכון.",
        "❌ race שונה.",
        "❌ all שונה.",
        "❌ הראשון שsuccess."
      ]
    },
    { id: "mc_es_top_await_ll_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 8,
      question: "מה top-level await?",
      options: [
        "ב-ES modules, await ב-top level בלי async wrapper. דורש module type. רק modules, לא scripts",
        "All files",
        "Browsers only",
        "Sync"
      ],
      correctIndex: 0,
      explanation: "{ \"type\": \"module\" } ב-package.json. await fetch(...).",
      optionFeedback: [
        "✅ נכון.",
        "❌ רק ESM.",
        "❌ Node 14+.",
        "❌ async."
      ]
    },
    { id: "mc_es_for_of_ll_001", topicId: "topic_js", conceptKey: "lesson_19::for", level: 5,
      question: "מה for...of עובד עליו?",
      options: [
        "Iterables: Array, Map, Set, String, NodeList, generators. לא Object רגיל (יש להמיר עם Object.entries)",
        "Objects",
        "Numbers",
        "Promises"
      ],
      correctIndex: 0,
      explanation: "for(const x of arr) — iterator protocol. for...in על keys שונה.",
      optionFeedback: [
        "✅ נכון.",
        "❌ object לא iterable.",
        "❌ לא iterable.",
        "❌ promise אחר."
      ]
    },
    { id: "mc_es_for_in_ll_001", topicId: "topic_js", conceptKey: "lesson_19::for", level: 5,
      question: "מתי for...in שמיש?",
      options: [
        "Object enumerable keys — string keys בלבד, גם מ-prototype. לא מומלץ ל-arrays",
        "Arrays",
        "Iterables",
        "Numbers"
      ],
      correctIndex: 0,
      explanation: "for(const key in obj) — string keys. hasOwnProperty לסינון מ-prototype.",
      optionFeedback: [
        "✅ נכון.",
        "❌ for...of עדיף.",
        "❌ for...of שונה.",
        "❌ unrelated."
      ]
    },
    { id: "mc_es_object_entries_ll_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 6,
      question: "מה Object.entries מחזיר?",
      options: [
        "[[key, value], ...] — array של [key, value] pairs. שימושי ל-iteration / map / לdiv ל-Map",
        "Object",
        "Keys only",
        "Values only"
      ],
      correctIndex: 0,
      explanation: "Object.fromEntries הפוך. Object.keys, Object.values משלימים.",
      optionFeedback: [
        "✅ נכון.",
        "❌ array.",
        "❌ זה Object.keys.",
        "❌ זה Object.values."
      ]
    },
    { id: "mc_es_object_freeze_seal_ll_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 7,
      question: "מה ההבדל בין Object.freeze ל-Object.seal?",
      options: [
        "freeze: אסור add/delete/modify. seal: אסור add/delete, מותר modify של ערכים קיימים",
        "זהים",
        "freeze recursive",
        "seal mutable"
      ],
      correctIndex: 0,
      explanation: "preventExtensions: רק add. שלושת רמות restriction.",
      optionFeedback: [
        "✅ נכון.",
        "❌ שונים.",
        "❌ shallow.",
        "❌ seal partial."
      ]
    },
    { id: "mc_es_proxy_intercept_ll_001", topicId: "topic_js", conceptKey: "lesson_11::object", level: 8,
      question: "מה traps ב-Proxy עוצרים?",
      options: [
        "Property access (get/set), function call (apply), construct (new), has, ownKeys, deleteProperty, defineProperty",
        "Network",
        "DOM",
        "Async"
      ],
      correctIndex: 0,
      explanation: "13 traps ב-spec. שימוש: validation, observer pattern, virtual props.",
      optionFeedback: [
        "✅ נכון.",
        "❌ unrelated.",
        "❌ unrelated.",
        "❌ async hooks אחרים."
      ]
    },
    { id: "mc_es_string_repeat_ll_001", topicId: "topic_js", conceptKey: "lesson_11::string", level: 5,
      question: "מה 'ab'.repeat(3)?",
      options: [
        "'ababab' — חזרה N פעמים. שימושי ל-padding וindentation",
        "['ab','ab','ab']",
        "'ab'",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "'-'.repeat(80) ל-separator. ' '.repeat(indent).",
      optionFeedback: [
        "✅ נכון.",
        "❌ string לא array.",
        "❌ x3 reps.",
        "❌ אין error."
      ]
    },
    { id: "mc_es_string_methods_ll_001", topicId: "topic_js", conceptKey: "lesson_11::string", level: 6,
      question: "מה includes/startsWith/endsWith?",
      options: [
        "Methods של String שמחזירים boolean — נקיים מ-indexOf trick. ES6",
        "Same",
        "Array only",
        "Type"
      ],
      correctIndex: 0,
      explanation: "'hello'.startsWith('he') === true. 'world'.endsWith('rld') === true. נקיים יותר מ-indexOf===0.",
      optionFeedback: [
        "✅ נכון.",
        "❌ שונים.",
        "❌ עובד גם array.",
        "❌ syntax."
      ]
    },
    { id: "mc_es_at_method_ll_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "מה arr.at(-1) מחזיר?",
      options: [
        "Last element — תמיכה ב-negative index. ES2022. נקי מ-arr[arr.length-1]",
        "First",
        "TypeError",
        "Same as [-1]"
      ],
      correctIndex: 0,
      explanation: "[1,2,3].at(-1) === 3. arr[-1] = undefined ב-array (זה property).",
      optionFeedback: [
        "✅ נכון.",
        "❌ first hat.",
        "❌ אין error.",
        "❌ [-1] שונה."
      ]
    }
  ],
  fill: [
    { id: "fill_es_optional_ll_001", topicId: "topic_js", conceptKey: "lesson_19::nested object", level: 6,
      code: "// Safe nested access\nconst city = user____.address?.city ?? 'Unknown';",
      answer: "?",
      explanation: "Optional chaining ?. short-circuits."
    },
    { id: "fill_es_nullish_ll_001", topicId: "topic_js", conceptKey: "lesson_19::nested object", level: 6,
      code: "// Default only on null/undefined\nconst port = config.port ____ 3000;",
      answer: "??",
      explanation: "?? = nullish coalescing (preserves 0/'')."
    },
    { id: "fill_es_logical_assign_ll_001", topicId: "topic_js", conceptKey: "lesson_19::nested object", level: 7,
      code: "// Assign only if null/undefined\nconfig.timeout ____= 5000;",
      answer: "?",
      explanation: "??= = logical nullish assignment."
    },
    { id: "fill_es_swap_ll_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 6,
      code: "// Swap variables\n[a, ____] = [b, a];",
      answer: "b",
      explanation: "Array destructuring swaps without temp."
    },
    { id: "fill_es_rest_ll_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 5,
      code: "// First + rest\nconst [first, ...____] = arr;",
      answer: "rest",
      explanation: "Rest collects remaining."
    },
    { id: "fill_es_template_ll_001", topicId: "topic_js", conceptKey: "lesson_19::function", level: 5,
      code: "// String interpolation\nconst greeting = `Hello, ${____}!`;",
      answer: "name",
      explanation: "${expr} embeds value in template literal."
    },
    { id: "fill_es_short_obj_ll_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 5,
      code: "// Property shorthand\nconst name = 'Tal';\nconst user = { ____ };  // { name: 'Tal' }",
      answer: "name",
      explanation: "Shorthand: {name} ⇔ {name: name}."
    },
    { id: "fill_es_computed_ll_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 6,
      code: "// Dynamic key\nconst k = 'role';\nconst obj = { ____: 'admin' };",
      answer: "[k]",
      explanation: "Computed property key syntax."
    },
    { id: "fill_es_default_param_ll_001", topicId: "topic_js", conceptKey: "lesson_19::function", level: 5,
      code: "// Default value if undefined\nfunction greet(name = ____) {\n  return `Hello ${name}`;\n}",
      answer: "'Guest'",
      explanation: "Default parameter applies on undefined only."
    },
    { id: "fill_es_class_extends_ll_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 6,
      code: "// Inheritance\nclass Dog ____ Animal {\n  bark() { return 'Woof'; }\n}",
      answer: "extends",
      explanation: "extends sets prototype chain."
    },
    { id: "fill_es_super_ll_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 7,
      code: "// Call parent constructor\nclass B extends A {\n  constructor(x) {\n    ____();\n    this.x = x;\n  }\n}",
      answer: "super",
      explanation: "super() invokes parent constructor."
    },
    { id: "fill_es_private_ll_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 7,
      code: "// Private field (ES2022)\nclass Counter {\n  ____count = 0;\n  inc() { return ++this.#count; }\n}",
      answer: "#",
      explanation: "# prefix = true private field."
    },
    { id: "fill_es_async_ll_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 6,
      code: "// Async function\n____ function fetchData() {\n  const r = await fetch(url);\n  return r.json();\n}",
      answer: "async",
      explanation: "async wraps return value in Promise."
    },
    { id: "fill_es_promise_all_ll_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 7,
      code: "// Run promises in parallel\nconst results = await Promise.____([p1, p2, p3]);\n// fail-fast on any reject",
      answer: "all",
      explanation: "Promise.all rejects on first failure."
    },
    { id: "fill_es_for_of_ll_001", topicId: "topic_js", conceptKey: "lesson_19::for", level: 5,
      code: "// Iterate over values\nfor (const item ____ items) {\n  console.log(item);\n}",
      answer: "of",
      explanation: "for...of works on iterables (arrays/Map/Set)."
    }
  ]
};
