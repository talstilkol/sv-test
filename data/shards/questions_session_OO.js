// Sprint 2 batch OO - Trace-style questions: "what does this code print?"
// 50 questions: 35 MC + 15 Fill — phrased as code output prediction
window.QUESTIONS_SHARD_OO = {
  mc: [
    { id: "mc_trace_var_hoist_oo_001", topicId: "topic_js", conceptKey: "lesson_11::Hoisting", level: 6,
      question: "מה מודפס: console.log(x); var x = 5;",
      options: [
        "undefined — var hoisted אך לא מאותחל. ההצהרה רץ ראשונה (x=undefined), אז console, אז assignment",
        "5",
        "ReferenceError",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "Hoisting: var x מועבר לראש scope (initialized undefined). הassignment נשאר במקום.",
      optionFeedback: [
        "✅ נכון. var hoisting → undefined.",
        "❌ assignment עדיין לא רץ.",
        "❌ var לא TDZ.",
        "❌ אין error."
      ]
    },
    { id: "mc_trace_let_tdz_oo_001", topicId: "topic_js", conceptKey: "lesson_11::Hoisting", level: 6,
      question: "מה מודפס: console.log(x); let x = 5;",
      options: [
        "ReferenceError — let ב-Temporal Dead Zone לפני ההצהרה. גישה זורקת",
        "undefined",
        "5",
        "null"
      ],
      correctIndex: 0,
      explanation: "TDZ: מהתחלת הblock עד ההצהרה. let/const אינם נגישים.",
      optionFeedback: [
        "✅ נכון. TDZ throws.",
        "❌ זה var.",
        "❌ assignment לא רץ.",
        "❌ לא null."
      ]
    },
    { id: "mc_trace_closure_oo_001", topicId: "topic_js", conceptKey: "lesson_15::Closure", level: 7,
      question: "מה מודפס:\nfor(var i=0; i<3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
      options: [
        "3 3 3 — var function-scoped, כל ה-callbacks share אותו i. בסוף הלולאה i=3, אז כל console רץ עם i=3",
        "0 1 2",
        "undefined × 3",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "var = single binding. let i = 3 separate bindings → 0 1 2. classic closure quiz.",
      optionFeedback: [
        "✅ נכון. var hoisting + closure.",
        "❌ זה עם let.",
        "❌ i מוגדר.",
        "❌ אין error."
      ]
    },
    { id: "mc_trace_let_loop_oo_001", topicId: "topic_js", conceptKey: "lesson_15::Closure", level: 7,
      question: "מה מודפס:\nfor(let i=0; i<3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
      options: [
        "0 1 2 — let creates new binding per iteration. כל closure לוכד את ה-i של אותו iteration",
        "3 3 3",
        "undefined × 3",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "let block-scoped. spec במפורש קובע fresh binding לכל iteration ב-for-let.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה var.",
        "❌ i מוגדר.",
        "❌ אין error."
      ]
    },
    { id: "mc_trace_async_order_oo_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 8,
      question: "מה הסדר של ה-prints?\nconsole.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');",
      options: [
        "1 4 3 2 — sync ראשונים. Promise.then microtask, רץ לפני setTimeout (macrotask)",
        "1 2 3 4",
        "1 4 2 3",
        "1 3 4 2"
      ],
      correctIndex: 0,
      explanation: "Microtasks (Promise) drain לפני macrotasks (setTimeout) אחרי כל sync.",
      optionFeedback: [
        "✅ נכון. event loop priorities.",
        "❌ async לא בסדר טבעי.",
        "❌ Promise לפני setTimeout.",
        "❌ sync לפני microtask."
      ]
    },
    { id: "mc_trace_truthy_oo_001", topicId: "topic_js", conceptKey: "lesson_11::boolean", level: 6,
      question: "מה הערך של: Boolean('false')",
      options: [
        "true — non-empty string תמיד truthy. 'false' is a string, not the boolean false",
        "false",
        "TypeError",
        "undefined"
      ],
      correctIndex: 0,
      explanation: "Falsy values: false, 0, '', null, undefined, NaN. כל שאר truthy.",
      optionFeedback: [
        "✅ נכון. string ≠ boolean.",
        "❌ string ריק → false.",
        "❌ אין error.",
        "❌ ערך מוגדר."
      ]
    },
    { id: "mc_trace_eq_oo_001", topicId: "topic_js", conceptKey: "lesson_11::boolean", level: 6,
      question: "מה הערך של: '0' == false",
      options: [
        "true — coercion: false → 0, '0' → 0, 0 == 0 → true. שני הצדדים לnumber",
        "false",
        "TypeError",
        "ReferenceError"
      ],
      correctIndex: 0,
      explanation: "ECMAScript abstract equality: שני הצדדים מומרים לnumber. '0' === false → false (no coercion).",
      optionFeedback: [
        "✅ נכון. coercion.",
        "❌ עם ==, true.",
        "❌ אין error.",
        "❌ אין error."
      ]
    },
    { id: "mc_trace_arr_eq_oo_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "מה הערך של: [1] == [1]",
      options: [
        "false — שני arrays שונים ב-memory. == על objects = reference equality. גם === false",
        "true",
        "[1, 1]",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "Reference comparison. ל-deep equality: JSON.stringify או lodash.isEqual.",
      optionFeedback: [
        "✅ נכון. reference compare.",
        "❌ instances שונים.",
        "❌ אין concat.",
        "❌ אין error."
      ]
    },
    { id: "mc_trace_str_concat_oo_001", topicId: "topic_js", conceptKey: "lesson_11::string", level: 5,
      question: "מה הערך של: '5' + 3",
      options: [
        "'53' — + עם string מבצע concat. number → string conversion",
        "8",
        "53",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "+ הוא overloaded. string + anything = concat. ל-numeric: Number('5') + 3 = 8.",
      optionFeedback: [
        "✅ נכון. string concat.",
        "❌ זה ב-Number coercion.",
        "❌ זה string לא number.",
        "❌ אין error."
      ]
    },
    { id: "mc_trace_str_minus_oo_001", topicId: "topic_js", conceptKey: "lesson_11::string", level: 5,
      question: "מה הערך של: '5' - 3",
      options: [
        "2 — - מחייב numeric. '5' → 5, 5-3 = 2. שונה מ-+",
        "'53'",
        "53",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "- אינו overloaded. string מומר ל-number ע\"י coercion.",
      optionFeedback: [
        "✅ נכון. numeric subtract.",
        "❌ זה +.",
        "❌ זה +.",
        "❌ אין error."
      ]
    },
    { id: "mc_trace_obj_prop_oo_001", topicId: "topic_js", conceptKey: "lesson_11::object", level: 6,
      question: "מה הערך של: const o = {a: 1}; o.b",
      options: [
        "undefined — property שלא הוגדרה. JS לא זורק על access של undefined property",
        "null",
        "ReferenceError",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "Object access על undefined property → undefined. רק על null/undefined קוראים method → TypeError.",
      optionFeedback: [
        "✅ נכון.",
        "❌ undefined ≠ null.",
        "❌ אין error.",
        "❌ אין error בproperty access."
      ]
    },
    { id: "mc_trace_obj_method_oo_001", topicId: "topic_js", conceptKey: "lesson_11::object", level: 6,
      question: "מה קורה: const o = {a: 1}; o.b.c",
      options: [
        "TypeError — o.b הוא undefined, אי אפשר לקרוא property של undefined",
        "undefined",
        "null",
        "ReferenceError"
      ],
      correctIndex: 0,
      explanation: "Cannot read property 'c' of undefined. תיקון: o.b?.c → undefined.",
      optionFeedback: [
        "✅ נכון. nested undefined.",
        "❌ throws.",
        "❌ throws.",
        "❌ זה לא ReferenceError."
      ]
    },
    { id: "mc_trace_optional_chain_oo_001", topicId: "topic_js", conceptKey: "lesson_19::nested object", level: 6,
      question: "מה הערך של: const o = {a: 1}; o.b?.c",
      options: [
        "undefined — optional chaining ?. עוצר את השרשרת ב-undefined ומחזיר undefined בלי error",
        "null",
        "TypeError",
        "1"
      ],
      correctIndex: 0,
      explanation: "?. בודק null/undefined — אם כן, short-circuit. ES2020.",
      optionFeedback: [
        "✅ נכון. safe access.",
        "❌ undefined.",
        "❌ זה הפתרון.",
        "❌ a שונה."
      ]
    },
    { id: "mc_trace_spread_arr_oo_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 5,
      question: "מה הערך של: [...[1,2], ...[3,4]]",
      options: [
        "[1, 2, 3, 4] — spread מפזר items. concat-like",
        "[[1,2], [3,4]]",
        "[1, [2,3,4]]",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "Spread על array בליטרל → flatten 1 level. שונה מ-[a, b] שמשאיר nested.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה ללא spread.",
        "❌ לא נכון.",
        "❌ אין error."
      ]
    },
    { id: "mc_trace_spread_obj_oo_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 6,
      question: "מה הערך של: {...{a:1, b:2}, b:3}",
      options: [
        "{a: 1, b: 3} — spread מעתיק properties. duplicate key: last wins",
        "{a:1, b:2, b:3}",
        "{a:1, b:[2,3]}",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "Object spread merges. duplicate b: 3 ביצוע.",
      optionFeedback: [
        "✅ נכון. last wins.",
        "❌ object אין duplicates.",
        "❌ לא array.",
        "❌ אין error."
      ]
    },
    { id: "mc_trace_destruct_default_oo_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 6,
      question: "מה הערך של a: const {a = 1} = {a: undefined}",
      options: [
        "1 — default פעיל רק על undefined (לא על null/0)",
        "undefined",
        "null",
        "0"
      ],
      correctIndex: 0,
      explanation: "{a:null} → a = null (לא default). {a:undefined} → a = 1 (default).",
      optionFeedback: [
        "✅ נכון.",
        "❌ default kicks in.",
        "❌ זה null case.",
        "❌ זה 0 case."
      ]
    },
    { id: "mc_trace_arr_destruct_oo_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 6,
      question: "מה הערך של b: const [a, b = 5] = [1]",
      options: [
        "5 — b לא מקבל value מהarray (length=1), default kicks in",
        "undefined",
        "1",
        "null"
      ],
      correctIndex: 0,
      explanation: "Array destructuring: position-based. b lacks value → default.",
      optionFeedback: [
        "✅ נכון.",
        "❌ default kicks.",
        "❌ זה a.",
        "❌ לא null."
      ]
    },
    { id: "mc_trace_arrow_this_oo_001", topicId: "topic_js", conceptKey: "lesson_11::function", level: 7,
      question: "מה הערך של this:\nconst obj = {\n  x: 1,\n  arrow: () => this.x,\n  regular() { return this.x; }\n};\nobj.arrow();",
      options: [
        "undefined — arrow לוקח this מ-lexical scope (גלובלי). regular פעיל obj.regular() עם this=obj",
        "1",
        "TypeError",
        "obj"
      ],
      correctIndex: 0,
      explanation: "Arrow מוגדר במודול → this = undefined (strict) או globalThis. obj.arrow() לא משנה.",
      optionFeedback: [
        "✅ נכון. arrow lexical this.",
        "❌ זה regular method.",
        "❌ אין error.",
        "❌ obj לא the answer."
      ]
    },
    { id: "mc_trace_method_this_oo_001", topicId: "topic_js", conceptKey: "lesson_11::function", level: 7,
      question: "מה התוצאה:\nconst obj = { x: 1, get: function() { return this.x; } };\nconst f = obj.get;\nf();",
      options: [
        "undefined — f נקרא בלי context, this = undefined (strict). obj.get() היה מחזיר 1",
        "1",
        "obj",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "Method ראיה: this נקבע ב-call site. detached call → loose this. fix: f.bind(obj).",
      optionFeedback: [
        "✅ נכון. lost this.",
        "❌ זה obj.get().",
        "❌ this != obj.",
        "❌ undefined.x = TypeError. אבל strict throws."
      ]
    },
    { id: "mc_trace_promise_chain_oo_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 7,
      question: "מה מודפס:\nPromise.resolve(1)\n  .then(x => x + 1)\n  .then(x => console.log(x));",
      options: [
        "2 — chain: 1 → 2 → log",
        "1",
        "3",
        "undefined"
      ],
      correctIndex: 0,
      explanation: "Each .then מחזיר Promise חדש עם value החדש. async, אך after sync.",
      optionFeedback: [
        "✅ נכון.",
        "❌ +1 קרה.",
        "❌ +2 פעמיים.",
        "❌ value מוגדר."
      ]
    },
    { id: "mc_trace_promise_throw_oo_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 8,
      question: "מה מודפס:\nPromise.resolve(1)\n  .then(x => { throw 'err'; })\n  .catch(e => console.log(e));",
      options: [
        "'err' — throw בתוך .then הופך לrejected promise. .catch תופס",
        "1",
        "Error",
        "Nothing (silent)"
      ],
      correctIndex: 0,
      explanation: "Promise wraps throw אוטומטית. .catch הוא שווה ערך ל-.then(undefined, fn).",
      optionFeedback: [
        "✅ נכון.",
        "❌ throw flowed to catch.",
        "❌ הtype הוא string.",
        "❌ caught."
      ]
    },
    { id: "mc_trace_async_await_oo_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 8,
      question: "מה מודפס:\nasync function f() {\n  return 1;\n}\nf().then(x => console.log(x));",
      options: [
        "1 — async function תמיד מחזיר Promise. return 1 → Promise.resolve(1)",
        "Promise<1>",
        "undefined",
        "1 (sync)"
      ],
      correctIndex: 0,
      explanation: ".then unwraps. await f() גם מחזיר 1.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה לפני then.",
        "❌ value מוגדר.",
        "❌ then async."
      ]
    },
    { id: "mc_trace_array_methods_oo_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      question: "מה הערך:\n[1, 2, 3].map(x => x * 2).filter(x => x > 2)",
      options: [
        "[4, 6] — map מכפיל ל-[2,4,6], filter שומר >2",
        "[1, 2, 3]",
        "[2, 4, 6]",
        "[6]"
      ],
      correctIndex: 0,
      explanation: "Chain: map first, then filter. 4>2, 6>2, 2 not.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה לפני chain.",
        "❌ זה רק map.",
        "❌ filter רחב יותר."
      ]
    },
    { id: "mc_trace_reduce_oo_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "מה הערך: [1,2,3,4].reduce((acc, v) => acc + v, 0)",
      options: [
        "10 — reduce מקבץ: 0+1=1, 1+2=3, 3+3=6, 6+4=10",
        "0",
        "4",
        "[1,2,3,4]"
      ],
      correctIndex: 0,
      explanation: "reduce(fn, initial). bez initial: arr[0] הוא initial.",
      optionFeedback: [
        "✅ נכון. sum.",
        "❌ initial.",
        "❌ זה count.",
        "❌ זה הinput."
      ]
    },
    { id: "mc_trace_reduce_no_init_oo_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 7,
      question: "מה הערך: [].reduce((acc, v) => acc + v)",
      options: [
        "TypeError — reduce on empty array בלי initial → throw",
        "0",
        "undefined",
        "NaN"
      ],
      correctIndex: 0,
      explanation: "TypeError: Reduce of empty array with no initial value. עם initial → initial.",
      optionFeedback: [
        "✅ נכון. spec.",
        "❌ אין initial.",
        "❌ throws.",
        "❌ throws."
      ]
    },
    { id: "mc_trace_map_async_oo_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 8,
      question: "מה הערך של ret:\nconst ret = [1,2,3].map(async x => x * 2);",
      options: [
        "[Promise, Promise, Promise] — map ב-array של async functions לא מחכה. ret = arr of Promises",
        "[2, 4, 6]",
        "Promise<[2,4,6]>",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "ל-array של values: await Promise.all([...].map(...)).",
      optionFeedback: [
        "✅ נכון.",
        "❌ async wraps.",
        "❌ map לא wraps.",
        "❌ אין error."
      ]
    },
    { id: "mc_trace_typeof_oo_001", topicId: "topic_js", conceptKey: "lesson_15::Synchronous", level: 5,
      question: "מה הערך: typeof []",
      options: [
        "'object' — arrays הם objects ב-JS. בדיקה: Array.isArray(arr)",
        "'array'",
        "'list'",
        "'object'[]"
      ],
      correctIndex: 0,
      explanation: "Array extends Object. ל-distinguish: Array.isArray.",
      optionFeedback: [
        "✅ נכון. arrays = objects.",
        "❌ אין כזה type.",
        "❌ אין כזה.",
        "❌ string."
      ]
    },
    { id: "mc_trace_typeof_func_oo_001", topicId: "topic_js", conceptKey: "lesson_15::Synchronous", level: 5,
      question: "מה הערך: typeof function(){}",
      options: [
        "'function' — JS מבחין functions מ-objects (גם אם technicaly הם objects callable)",
        "'object'",
        "'callable'",
        "'undefined'"
      ],
      correctIndex: 0,
      explanation: "Functions = first-class objects אבל typeof ייחודי.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה special case.",
        "❌ אין כזה.",
        "❌ defined."
      ]
    },
    { id: "mc_trace_default_oo_001", topicId: "topic_js", conceptKey: "lesson_19::function", level: 5,
      question: "מה הערך: function f(x=5) { return x; }; f()",
      options: [
        "5 — default param על undefined (אין arg)",
        "undefined",
        "0",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "function f(x=5){...}; f(undefined) === 5; f(null) === null.",
      optionFeedback: [
        "✅ נכון.",
        "❌ default kicks.",
        "❌ default = 5.",
        "❌ אין error."
      ]
    },
    { id: "mc_trace_iife_oo_001", topicId: "topic_js", conceptKey: "lesson_11::function", level: 7,
      question: "מה הערך:\nconst x = (function() { return 5; })();",
      options: [
        "5 — IIFE: function expression נקראת מיד. x מקבל את ה-return value",
        "function {...}",
        "undefined",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "(function(){...})() pattern. שימושי ל-private scope ב-pre-ES6.",
      optionFeedback: [
        "✅ נכון.",
        "❌ נקראה.",
        "❌ value מוגדר.",
        "❌ אין error."
      ]
    },
    { id: "mc_trace_setTimeout_oo_001", topicId: "topic_js", conceptKey: "lesson_15::setTimeout", level: 6,
      question: "מה מודפס:\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nconsole.log('C');",
      options: [
        "A C B — setTimeout נדחה ל-task queue, גם עם delay 0. sync ראשונים",
        "A B C",
        "B A C",
        "C B A"
      ],
      correctIndex: 0,
      explanation: "Macrotask queue. event loop: stack→microtasks→render→macrotask.",
      optionFeedback: [
        "✅ נכון.",
        "❌ async לא בסדר טבעי.",
        "❌ הראשון.",
        "❌ דטרמיניסטי."
      ]
    },
    { id: "mc_trace_array_index_oo_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      question: "מה הערך: const a = [1,2,3]; a[5]",
      options: [
        "undefined — out-of-bounds access. JS לא זורק, מחזיר undefined",
        "0",
        "null",
        "RangeError"
      ],
      correctIndex: 0,
      explanation: "JS sparse arrays. a[5] = 'x' יוצר holes. length משתנה ל-6.",
      optionFeedback: [
        "✅ נכון. lenient access.",
        "❌ undefined.",
        "❌ undefined.",
        "❌ אין error."
      ]
    },
    { id: "mc_trace_arr_length_oo_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "מה הערך:\nconst a = [];\na[10] = 'x';\na.length",
      options: [
        "11 — JS מתאים length אוטומטית. holes 0-9 = undefined",
        "1",
        "0",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "Sparse array. forEach מדלג על holes. for...in גם.",
      optionFeedback: [
        "✅ נכון.",
        "❌ length גדל.",
        "❌ הוסיף item.",
        "❌ אין error."
      ]
    },
    { id: "mc_trace_obj_keys_oo_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 6,
      question: "מה הערך: Object.keys({a:1, b:2})",
      options: [
        "['a', 'b'] — array של own enumerable string keys",
        "['a:1', 'b:2']",
        "[1, 2]",
        "{'a','b'}"
      ],
      correctIndex: 0,
      explanation: "Object.values מחזיר ערכים. Object.entries מחזיר [key, value] pairs.",
      optionFeedback: [
        "✅ נכון.",
        "❌ keys בלבד.",
        "❌ זה Object.values.",
        "❌ Set ≠ array."
      ]
    },
    { id: "mc_trace_json_oo_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 6,
      question: "מה הערך: JSON.stringify({a: undefined, b: 1})",
      options: [
        "'{\"b\":1}' — JSON.stringify מסיר properties עם undefined value",
        "'{\"a\":undefined,\"b\":1}'",
        "'{\"a\":null,\"b\":1}'",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "undefined → omitted. null → \"null\". Functions גם dropped.",
      optionFeedback: [
        "✅ נכון.",
        "❌ JSON אינו valid עם undefined.",
        "❌ זה null behavior.",
        "❌ אין error."
      ]
    }
  ],
  fill: [
    { id: "fill_trace_log_oo_001", topicId: "topic_js", conceptKey: "lesson_15::Synchronous", level: 5,
      code: "// Print to console\n____.log('hello');",
      answer: "console",
      explanation: "console.log = standard output."
    },
    { id: "fill_trace_typeof_oo_001", topicId: "topic_js", conceptKey: "lesson_15::Synchronous", level: 5,
      code: "// Type check\nconst t = ____ value;\n// 'string', 'number', 'object', etc.",
      answer: "typeof",
      explanation: "typeof returns type as string."
    },
    { id: "fill_trace_array_isarr_oo_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      code: "// Reliable array check\nif (____.isArray(value)) {\n  console.log('array');\n}",
      answer: "Array",
      explanation: "Array.isArray = canonical array check."
    },
    { id: "fill_trace_json_parse_oo_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 5,
      code: "// String to object\nconst obj = JSON.____('{\"a\":1}');",
      answer: "parse",
      explanation: "JSON.parse converts string to object."
    },
    { id: "fill_trace_json_stringify_oo_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 5,
      code: "// Object to string\nconst str = JSON.____({a: 1});",
      answer: "stringify",
      explanation: "JSON.stringify converts object to string."
    },
    { id: "fill_trace_obj_assign_oo_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 6,
      code: "// Merge objects\nconst merged = Object.____({}, a, b);",
      answer: "assign",
      explanation: "Object.assign(target, ...sources) merges."
    },
    { id: "fill_trace_obj_entries_oo_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 6,
      code: "// [key, value] pairs\nfor (const [k, v] of Object.____(obj)) {\n  console.log(k, v);\n}",
      answer: "entries",
      explanation: "Object.entries returns [k,v] pairs."
    },
    { id: "fill_trace_obj_from_entries_oo_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 7,
      code: "// Build object from pairs\nconst obj = Object.____([['a',1],['b',2]]);",
      answer: "fromEntries",
      explanation: "Object.fromEntries inverse of entries."
    },
    { id: "fill_trace_array_to_set_oo_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      code: "// Dedupe array\nconst unique = [...new ____(arr)];",
      answer: "Set",
      explanation: "Set dedupes; spread converts back to array."
    },
    { id: "fill_trace_str_split_oo_001", topicId: "topic_js", conceptKey: "lesson_11::string", level: 5,
      code: "// CSV to array\n'a,b,c'.____(',');  // ['a','b','c']",
      answer: "split",
      explanation: "split(sep) breaks string into array."
    },
    { id: "fill_trace_arr_join_oo_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      code: "// Array to CSV\n['a','b','c'].____(',');  // 'a,b,c'",
      answer: "join",
      explanation: "join(sep) creates delimited string."
    },
    { id: "fill_trace_str_repeat_oo_001", topicId: "topic_js", conceptKey: "lesson_11::string", level: 5,
      code: "// Repeat string\n'-'.____(10);  // '----------'",
      answer: "repeat",
      explanation: "String.repeat(n) repeats n times."
    },
    { id: "fill_trace_arr_at_oo_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      code: "// Last element (negative index)\nconst last = arr.____(-1);",
      answer: "at",
      explanation: "Array.at(-1) supports negative index."
    },
    { id: "fill_trace_str_at_oo_001", topicId: "topic_js", conceptKey: "lesson_11::string", level: 6,
      code: "// Last char\n'hello'.____(-1);  // 'o'",
      answer: "at",
      explanation: "String.at supports negative index."
    },
    { id: "fill_trace_promise_resolve_oo_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 6,
      code: "// Already-resolved Promise\nconst p = Promise.____(42);\np.then(v => console.log(v));  // 42",
      answer: "resolve",
      explanation: "Promise.resolve creates resolved promise."
    }
  ]
};
