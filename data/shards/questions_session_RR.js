// Sprint 2 batch RR - Output prediction MC: "what's the value of expression"
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_RR = {
  mc: [
    { id: "mc_pred_array_methods_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "מה הערך: [1,2,3].slice(1, -1)",
      options: [
        "[2] — slice(start, end). end negative = arr.length+end. slice(1, 2) → index 1 only",
        "[2, 3]",
        "[1, 2]",
        "[]"
      ],
      correctIndex: 0,
      explanation: "slice(1,-1) → indices 1 to (3-1)=2 exclusive → [arr[1]] = [2].",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה slice(1).",
        "❌ זה slice(0,2).",
        "❌ יש item."
      ]
    },
    { id: "mc_pred_array_concat_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      question: "מה הערך: [1,2].concat([3], [[4,5]])",
      options: [
        "[1, 2, 3, [4, 5]] — concat flattens 1 level. nested array stays nested",
        "[1, 2, 3, 4, 5]",
        "[[1,2], [3], [[4,5]]]",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "concat depth=1. ל-deeper: flat(Infinity).",
      optionFeedback: [
        "✅ נכון.",
        "❌ flat נמוך מדי.",
        "❌ אין nesting.",
        "❌ אין error."
      ]
    },
    { id: "mc_pred_array_flat_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "מה הערך: [1, [2, [3, [4]]]].flat(2)",
      options: [
        "[1, 2, 3, [4]] — flat(2) משטיח 2 רמות",
        "[1, 2, 3, 4]",
        "[1, [2, [3, [4]]]]",
        "[1, [2], [3], [4]]"
      ],
      correctIndex: 0,
      explanation: "flat(Infinity) ל-deep flatten. flat() = flat(1).",
      optionFeedback: [
        "✅ נכון. depth 2.",
        "❌ זה Infinity.",
        "❌ flat(0) = no-op.",
        "❌ לא נכון."
      ]
    },
    { id: "mc_pred_string_split_rr_001", topicId: "topic_js", conceptKey: "lesson_11::string", level: 5,
      question: "מה הערך: 'a,b,,c'.split(',')",
      options: [
        "['a', 'b', '', 'c'] — split משאיר empty strings על delimiters רצופים",
        "['a', 'b', 'c']",
        "['a', 'b', null, 'c']",
        "['a,b,,c']"
      ],
      correctIndex: 0,
      explanation: "split אינו מסנן. .filter(Boolean) להסרת empties.",
      optionFeedback: [
        "✅ נכון.",
        "❌ אינו מסנן.",
        "❌ '' לא null.",
        "❌ אינו copy."
      ]
    },
    { id: "mc_pred_string_replace_rr_001", topicId: "topic_js", conceptKey: "lesson_11::string", level: 6,
      question: "מה הערך: 'foo bar foo'.replace('foo', 'baz')",
      options: [
        "'baz bar foo' — replace רק על occurrence ראשון. ל-all: replaceAll או //g",
        "'baz bar baz'",
        "'foo bar baz'",
        "'foo bar foo'"
      ],
      correctIndex: 0,
      explanation: "replace + string = first match only. replaceAll(.../...) או .replace(/foo/g,...) לכל.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה replaceAll.",
        "❌ זה לא מקור.",
        "❌ replace קרה."
      ]
    },
    { id: "mc_pred_string_replace_all_rr_001", topicId: "topic_js", conceptKey: "lesson_11::string", level: 6,
      question: "מה הערך: 'aaa'.replaceAll('a', 'b')",
      options: [
        "'bbb' — replaceAll מחליף את כל ה-occurrences. ES2021",
        "'baa'",
        "'aaa'",
        "'b'"
      ],
      correctIndex: 0,
      explanation: "replaceAll. ES2021. תמיכה רחבה.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה replace.",
        "❌ אינו טכנית.",
        "❌ אין דחיסה."
      ]
    },
    { id: "mc_pred_obj_keys_rr_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 6,
      question: "מה הערך: Object.keys({2: 'b', 1: 'a'})",
      options: [
        "['1', '2'] — numeric-like keys ממוינים עולה. אחרים בinsertion order. תמיד strings",
        "['2', '1']",
        "[1, 2]",
        "[2, 1]"
      ],
      correctIndex: 0,
      explanation: "Object property order spec: integer keys first ascending, then strings/symbols by insertion.",
      optionFeedback: [
        "✅ נכון. spec ordering.",
        "❌ insertion לא ל-integers.",
        "❌ strings תמיד.",
        "❌ ממוין."
      ]
    },
    { id: "mc_pred_obj_spread_rr_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 6,
      question: "מה הערך: { a: 1, ...{ a: 2, b: 3 }, a: 4 }",
      options: [
        "{ a: 4, b: 3 } — spread שווה ערך ל-set פעולות. last assignment wins",
        "{ a: 1, b: 3 }",
        "{ a: 2, b: 3 }",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "Order: a=1 → spread overrides a=2 → explicit a=4. b מ-spread.",
      optionFeedback: [
        "✅ נכון.",
        "❌ overridden later.",
        "❌ overridden later.",
        "❌ אין error."
      ]
    },
    { id: "mc_pred_destruct_arr_rr_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 6,
      question: "מה הערך של b: const [a, , b, , c] = [1,2,3,4,5]",
      options: [
        "3 — empty slots מדלגים. a=1, _, b=3, _, c=5",
        "2",
        "4",
        "undefined"
      ],
      correctIndex: 0,
      explanation: "Pattern position מסונכרן. holes חוסכים variable.",
      optionFeedback: [
        "✅ נכון.",
        "❌ skipped.",
        "❌ skipped.",
        "❌ מספיק values."
      ]
    },
    { id: "mc_pred_destruct_default_rr_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 7,
      question: "מה הערך של y: const { x = 10, y = x * 2 } = { x: 5 }",
      options: [
        "10 — x=5 (overridden), y default = x * 2 = 10. defaults יכולים לפנות לקודמים",
        "20",
        "undefined",
        "5"
      ],
      correctIndex: 0,
      explanation: "Defaults evaluated left-to-right with binding to current scope.",
      optionFeedback: [
        "✅ נכון. left-to-right defaults.",
        "❌ זה ב-original x=10.",
        "❌ default kicks.",
        "❌ זה x."
      ]
    },
    { id: "mc_pred_truthy_rr_001", topicId: "topic_js", conceptKey: "lesson_11::boolean", level: 6,
      question: "מה הערך: !!'0'",
      options: [
        "true — '0' is non-empty string, truthy. !! coerces ל-boolean. שונה מ-!!0",
        "false",
        "0",
        "'0'"
      ],
      correctIndex: 0,
      explanation: "Falsy strings: ''. כל אחר truthy.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה !!0.",
        "❌ boolean coerce.",
        "❌ coerced."
      ]
    },
    { id: "mc_pred_eq_chain_rr_001", topicId: "topic_js", conceptKey: "lesson_11::boolean", level: 7,
      question: "מה הערך: 1 < 2 < 3",
      options: [
        "true — חשוב: (1<2) → true → true<3 → 1<3 → true. מקרי. JS אינו תומך chain comparison",
        "false",
        "TypeError",
        "1"
      ],
      correctIndex: 0,
      explanation: "Left-to-right. (1<2) gives true → coerced 1. 3 < 2 < 1 = (true)<1 = 1<1 = false. מטעה.",
      optionFeedback: [
        "✅ נכון מקרי.",
        "❌ במקרה שנכון.",
        "❌ אין error.",
        "❌ זה boolean."
      ]
    },
    { id: "mc_pred_eq_chain_false_rr_001", topicId: "topic_js", conceptKey: "lesson_11::boolean", level: 7,
      question: "מה הערך: 3 > 2 > 1",
      options: [
        "false — (3>2) → true → true>1 → 1>1 → false. JS chain אינו מתפקד כצפוי",
        "true",
        "1",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "true coerces ל-1, לא ל-3.",
      optionFeedback: [
        "✅ נכון. coercion gotcha.",
        "❌ זה לא הצפוי.",
        "❌ זה (1).",
        "❌ אין error."
      ]
    },
    { id: "mc_pred_typeof_rr_001", topicId: "topic_js", conceptKey: "lesson_15::Synchronous", level: 6,
      question: "מה הערך: typeof typeof 5",
      options: [
        "'string' — typeof 5 → 'number' (string). typeof 'number' → 'string'",
        "'number'",
        "'function'",
        "'object'"
      ],
      correctIndex: 0,
      explanation: "typeof תמיד מחזיר string. type של string הוא 'string'.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה הfirst typeof.",
        "❌ unrelated.",
        "❌ string לא object."
      ]
    },
    { id: "mc_pred_array_some_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      question: "מה הערך: [].some(x => true)",
      options: [
        "false — empty array, callback never runs. some דורש לפחות אחד עם true",
        "true",
        "undefined",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "some() על empty = false. every() על empty = true (vacuously).",
      optionFeedback: [
        "✅ נכון.",
        "❌ אין items.",
        "❌ boolean.",
        "❌ valid array."
      ]
    },
    { id: "mc_pred_array_every_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "מה הערך: [].every(x => false)",
      options: [
        "true — vacuous truth. כל item ב-empty set מקיים את ה-condition (אין items)",
        "false",
        "undefined",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "Vacuous: ∀ x ∈ ∅, P(x) = true. שונה מ-some על empty.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה some.",
        "❌ boolean.",
        "❌ valid."
      ]
    },
    { id: "mc_pred_array_find_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      question: "מה הערך: [1,2,3].find(x => x > 5)",
      options: [
        "undefined — find לא מוצא, מחזיר undefined. שונה מ-filter שמחזיר []",
        "-1",
        "[]",
        "null"
      ],
      correctIndex: 0,
      explanation: "find: first match או undefined. findIndex: index או -1.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה findIndex.",
        "❌ זה filter.",
        "❌ undefined."
      ]
    },
    { id: "mc_pred_array_findIndex_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      question: "מה הערך: [1,2,3].findIndex(x => x > 5)",
      options: [
        "-1 — לא נמצא. שונה מ-find שמחזיר undefined",
        "undefined",
        "0",
        "null"
      ],
      correctIndex: 0,
      explanation: "indexOf, findIndex: -1 ל-not found. find/some/etc: מתאימים אחרים.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה find.",
        "❌ זה ב-found.",
        "❌ -1."
      ]
    },
    { id: "mc_pred_promise_then_rr_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 7,
      question: "מה מודפס:\nPromise.resolve('A').then(() => 'B').then(console.log);",
      options: [
        "B — chain: resolve(A) → then returns 'B' → next then logs 'B'",
        "A",
        "undefined",
        "Promise"
      ],
      correctIndex: 0,
      explanation: "Each .then מחזיר Promise חדש. value = הreturn מ-prev callback.",
      optionFeedback: [
        "✅ נכון.",
        "❌ overridden by next then.",
        "❌ value מוגדר.",
        "❌ console.log gets value."
      ]
    },
    { id: "mc_pred_promise_throw_rr_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 8,
      question: "מה מודפס:\nPromise.resolve('A')\n  .then(() => { throw 'E'; })\n  .catch(e => 'C')\n  .then(console.log);",
      options: [
        "C — throw → rejected promise → .catch מחזיר 'C' → next .then logs 'C'",
        "E",
        "A",
        "undefined"
      ],
      correctIndex: 0,
      explanation: ".catch הוא .then(undefined, fn). value = return מ-error handler.",
      optionFeedback: [
        "✅ נכון.",
        "❌ caught.",
        "❌ replaced.",
        "❌ value מוגדר."
      ]
    },
    { id: "mc_pred_async_await_rr_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 7,
      question: "מה מודפס:\nasync function f() {\n  return await 5;\n}\nf().then(console.log);",
      options: [
        "5 — await על non-promise = identity. async wraps ב-Promise. then מקבל את 5",
        "Promise",
        "undefined",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "await x ⇔ await Promise.resolve(x). הvalue זורם.",
      optionFeedback: [
        "✅ נכון.",
        "❌ unwrapped by then.",
        "❌ valid.",
        "❌ אין error."
      ]
    },
    { id: "mc_pred_setTimeout_async_rr_001", topicId: "topic_js", conceptKey: "lesson_15::setTimeout", level: 8,
      question: "מה הסדר?\nasync function main() {\n  console.log('1');\n  await Promise.resolve();\n  console.log('2');\n}\nmain();\nconsole.log('3');",
      options: [
        "1 3 2 — sync part of main, then sync top-level, then microtask resumes main",
        "1 2 3",
        "3 1 2",
        "1 3 then nothing"
      ],
      correctIndex: 0,
      explanation: "main() runs sync until await. Yields. main() resumes as microtask after sync stack.",
      optionFeedback: [
        "✅ נכון.",
        "❌ await yields.",
        "❌ main runs first.",
        "❌ resumes."
      ]
    },
    { id: "mc_pred_arr_includes_nan_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "מה הערך: [NaN].includes(NaN)",
      options: [
        "true — includes משתמש ב-SameValueZero, מזהה NaN",
        "false",
        "undefined",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "indexOf(NaN) → -1 (uses ===). includes uses SameValueZero (NaN===NaN).",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה indexOf.",
        "❌ boolean.",
        "❌ valid."
      ]
    },
    { id: "mc_pred_obj_is_rr_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 7,
      question: "מה הערך: Object.is(0, -0)",
      options: [
        "false — Object.is מבחין 0 מ-(-0). שונה מ-=== שלא מבחין",
        "true",
        "TypeError",
        "0"
      ],
      correctIndex: 0,
      explanation: "Object.is uses SameValue. 0 !== -0 spec-wise.",
      optionFeedback: [
        "✅ נכון.",
        "❌ === נותן true.",
        "❌ boolean.",
        "❌ boolean."
      ]
    },
    { id: "mc_pred_obj_is_nan_rr_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 7,
      question: "מה הערך: Object.is(NaN, NaN)",
      options: [
        "true — Object.is מזהה NaN שווה לעצמו (שונה מ-=== שלא)",
        "false",
        "undefined",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "NaN === NaN → false. Object.is(NaN, NaN) → true.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה ===.",
        "❌ boolean.",
        "❌ valid."
      ]
    },
    { id: "mc_pred_string_to_number_rr_001", topicId: "topic_js", conceptKey: "lesson_11::number", level: 6,
      question: "מה הערך: Number('  ')",
      options: [
        "0 — whitespace strings → 0. שונה מ-Number('') = 0 וגם Number(null) = 0",
        "NaN",
        "undefined",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "ToNumber spec: empty/whitespace → 0. Non-numeric strings → NaN.",
      optionFeedback: [
        "✅ נכון. spec.",
        "❌ זה Number('abc').",
        "❌ valid.",
        "❌ אין error."
      ]
    },
    { id: "mc_pred_parse_int_rr_001", topicId: "topic_js", conceptKey: "lesson_11::number", level: 6,
      question: "מה הערך: parseInt('10.5px')",
      options: [
        "10 — parseInt עוצר ב-non-digit. '.' אינו part of integer",
        "10.5",
        "NaN",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "parseInt: leading digits. parseFloat לדצימלי. Number strict — מחזיר NaN על ה-string הזה.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה parseFloat.",
        "❌ valid digits start.",
        "❌ אין error."
      ]
    },
    { id: "mc_pred_parse_float_rr_001", topicId: "topic_js", conceptKey: "lesson_11::number", level: 6,
      question: "מה הערך: parseFloat('10.5px')",
      options: [
        "10.5 — parseFloat קורא integer + decimal לפני non-numeric",
        "10",
        "NaN",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "parseFloat. שונה מ-Number שmust כל ה-string תקין.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה parseInt.",
        "❌ valid prefix.",
        "❌ אין error."
      ]
    },
    { id: "mc_pred_array_length_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "מה הערך:\nconst a = [1,2,3];\na.length = 1;\nconsole.log(a)",
      options: [
        "[1] — setting length truncates array. opposite אם גדל: יוצר holes",
        "[1, 2, 3]",
        "[1, 2]",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "Array.length writable. truncate נפוץ ל-clear: a.length = 0.",
      optionFeedback: [
        "✅ נכון.",
        "❌ length שונה.",
        "❌ truncated to 1.",
        "❌ valid."
      ]
    },
    { id: "mc_pred_object_freeze_rr_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 7,
      question: "מה קורה:\nconst o = Object.freeze({ a: 1 });\no.a = 5;\nconsole.log(o.a)",
      options: [
        "1 — freeze prevents mutation. בstrict mode זורק; ב-loose silent fail. value נשאר",
        "5",
        "TypeError always",
        "undefined"
      ],
      correctIndex: 0,
      explanation: "freeze shallow. nested objects עדיין mutable.",
      optionFeedback: [
        "✅ נכון.",
        "❌ blocked.",
        "❌ רק בstrict.",
        "❌ valid."
      ]
    },
    { id: "mc_pred_array_iter_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "מה מודפס:\nconst a = [10, 20, 30];\nfor (const i in a) console.log(typeof i);",
      options: [
        "'string' × 3 — for...in על array מחזיר string keys ('0','1','2'), לא numbers",
        "'number' × 3",
        "TypeError",
        "'object' × 3"
      ],
      correctIndex: 0,
      explanation: "for...in על arrays = strings. for...of על values.",
      optionFeedback: [
        "✅ נכון.",
        "❌ string.",
        "❌ valid.",
        "❌ string."
      ]
    },
    { id: "mc_pred_short_circuit_rr_001", topicId: "topic_js", conceptKey: "lesson_11::boolean", level: 6,
      question: "מה הערך: 0 || 'default'",
      options: [
        "'default' — || returns first truthy. 0 falsy → fallback",
        "0",
        "true",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "|| short-circuit. ?? מבחין null/undefined בלבד.",
      optionFeedback: [
        "✅ נכון.",
        "❌ falsy.",
        "❌ value, not bool.",
        "❌ valid."
      ]
    },
    { id: "mc_pred_nullish_rr_001", topicId: "topic_js", conceptKey: "lesson_19::nested object", level: 6,
      question: "מה הערך: 0 ?? 'default'",
      options: [
        "0 — ?? רק על null/undefined. 0 לא ניצמא",
        "'default'",
        "true",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "?? שונה מ-||. 0 ו-'' נשמרים.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה ||.",
        "❌ value.",
        "❌ valid."
      ]
    },
    { id: "mc_pred_optional_chain_call_rr_001", topicId: "topic_js", conceptKey: "lesson_19::nested object", level: 7,
      question: "מה הערך: const f = null; f?.()",
      options: [
        "undefined — optional call ?.() עוצר אם f null/undefined",
        "TypeError",
        "null",
        "function"
      ],
      correctIndex: 0,
      explanation: "?.() ל-call. ?.[k] ל-bracket. כולם short-circuit על null/undefined.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה הפתרון.",
        "❌ undefined.",
        "❌ אין fn."
      ]
    },
    { id: "mc_pred_array_map_promise_rr_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 8,
      question: "מה הtype של ret: const ret = [1,2,3].map(async x => x * 2)",
      options: [
        "Array of Promise<number> — map סינכרוני, async wraps each. אין auto-await",
        "Promise<number[]>",
        "[2, 4, 6]",
        "Async iterable"
      ],
      correctIndex: 0,
      explanation: "ל-resolved values: await Promise.all([...].map(...)).",
      optionFeedback: [
        "✅ נכון.",
        "❌ map לא wraps.",
        "❌ Promise pending.",
        "❌ רגיל array."
      ]
    }
  ],
  fill: [
    { id: "fill_pred_slice_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      code: "// slice with negative end\n[1,2,3,4,5].slice(1, ____);  // [2, 3, 4]",
      answer: "-1",
      explanation: "slice(1, -1) excludes last element."
    },
    { id: "fill_pred_replace_all_rr_001", topicId: "topic_js", conceptKey: "lesson_11::string", level: 6,
      code: "// Replace all occurrences (ES2021)\n'aaa'.replace____('a', 'b');  // 'bbb'",
      answer: "All",
      explanation: "replaceAll replaces every match."
    },
    { id: "fill_pred_array_at_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      code: "// Last element (negative index)\n[1,2,3].____(-1);  // 3",
      answer: "at",
      explanation: "Array.at supports negative indexes."
    },
    { id: "fill_pred_obj_keys_rr_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 5,
      code: "// All own enumerable keys\nObject.____({a:1, b:2});  // ['a', 'b']",
      answer: "keys",
      explanation: "Object.keys returns own enumerable strings."
    },
    { id: "fill_pred_obj_values_rr_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 5,
      code: "// All own enumerable values\nObject.____({a:1, b:2});  // [1, 2]",
      answer: "values",
      explanation: "Object.values returns own values."
    },
    { id: "fill_pred_obj_entries_rr_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 5,
      code: "// [key, value] pairs\nObject.____({a:1, b:2});  // [['a',1], ['b',2]]",
      answer: "entries",
      explanation: "Object.entries pairs."
    },
    { id: "fill_pred_array_some_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      code: "// At least one\n[1,2,3].____(x => x > 2);  // true",
      answer: "some",
      explanation: "some: any matches predicate."
    },
    { id: "fill_pred_array_every_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      code: "// All match\n[1,2,3].____(x => x > 0);  // true",
      answer: "every",
      explanation: "every: all match predicate."
    },
    { id: "fill_pred_array_find_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      code: "// First match (or undefined)\n[1,2,3].____(x => x > 2);  // 3",
      answer: "find",
      explanation: "find returns first match value."
    },
    { id: "fill_pred_array_includes_nan_rr_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      code: "// includes handles NaN; indexOf doesn't\n[NaN].____(NaN);  // true",
      answer: "includes",
      explanation: "includes uses SameValueZero (NaN===NaN)."
    },
    { id: "fill_pred_short_circuit_rr_001", topicId: "topic_js", conceptKey: "lesson_11::boolean", level: 6,
      code: "// Default on falsy\nconst port = userPort ____ 3000;",
      answer: "||",
      explanation: "|| falls back on any falsy."
    },
    { id: "fill_pred_nullish_rr_001", topicId: "topic_js", conceptKey: "lesson_19::nested object", level: 6,
      code: "// Default only on null/undefined (preserves 0)\nconst port = userPort ____ 3000;",
      answer: "??",
      explanation: "?? preserves 0 and ''."
    },
    { id: "fill_pred_typeof_typeof_rr_001", topicId: "topic_js", conceptKey: "lesson_15::Synchronous", level: 6,
      code: "// typeof always returns string\ntypeof typeof 5;  // '____'",
      answer: "string",
      explanation: "typeof returns string; typeof of string = 'string'."
    },
    { id: "fill_pred_promise_chain_rr_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 7,
      code: "// Each .then transforms\nPromise.resolve(1).then(x => x + 1).then(x => x * 2);\n// Final: ____",
      answer: "4",
      explanation: "1 → 2 → 4."
    },
    { id: "fill_pred_arr_map_async_rr_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 8,
      code: "// Wait for all promises from map\nconst results = await Promise.____([1,2,3].map(asyncFn));",
      answer: "all",
      explanation: "Promise.all awaits all in parallel."
    }
  ]
};
