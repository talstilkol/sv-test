// data/shards/questions_session_CC.js
// Sprint 2 batch CC — JS Misc patterns + lesson 19 review
// 50 questions: 35 MC + 15 Fill

window.QUESTIONS_SHARD_CC = {
  mc: [
    {
      id: "mc_l19_switch_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::switch",
      level: 5,
      question: "switch statement key risk:",
      options: [
        "Fall-through בלי break — אחד case רץ ואחריו ממשיך לבא",
        "switch תמיד עוצר",
        "deprecated",
        "syntax error"
      ],
      correctIndex: 0,
      explanation: "Always include break or return.",
      optionFeedback: [
        "✅ נכון. fall-through הוא ה-trap.",
        "❌ הוא דווקא לא עוצר אלא אם יש break.",
        "❌ active.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l19_switch_cc_002",
      topicId: "topic_js",
      conceptKey: "lesson_19::switch",
      level: 6,
      question: "switch alternatives:",
      options: [
        "Object lookup — handlers[type]() נקי יותר עבור 3+ cases",
        "Always switch",
        "Deprecated",
        "if/else only"
      ],
      correctIndex: 0,
      explanation: "More extensible.",
      optionFeedback: [
        "✅ נכון. object lookup pattern.",
        "❌ alternatives טובות יותר לפעמים.",
        "❌ legitimate.",
        "❌ partial."
      ]
    },
    {
      id: "mc_l19_function_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::function",
      level: 4,
      question: "Function declaration vs expression:",
      options: [
        "Declaration hoisted with body. Expression assigned to var → not hoisted",
        "Same",
        "Different syntax only",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Critical for TDZ.",
      optionFeedback: [
        "✅ נכון. הבדל קריטי ב-hoisting.",
        "❌ הבדל מהותי.",
        "❌ הבדל סמנטי, לא רק syntactic.",
        "❌ active."
      ]
    },
    {
      id: "mc_l19_parameter_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::parameter",
      level: 5,
      question: "Default parameters:",
      options: [
        "function f(a, b = 10) — b mặc định 10 אם undefined",
        "Always required",
        "Deprecated",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Cleaner than || trick.",
      optionFeedback: [
        "✅ נכון. ES6 default params.",
        "❌ עם default — אופציונלי.",
        "❌ standard.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_l19_return_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::return",
      level: 4,
      question: "return without value:",
      options: [
        "Returns undefined — exits function",
        "Returns null",
        "Throws",
        "Returns 0"
      ],
      correctIndex: 0,
      explanation: "Same as no return statement.",
      optionFeedback: [
        "✅ נכון. undefined default.",
        "❌ null only if explicit.",
        "❌ no error.",
        "❌ no coerce."
      ]
    },
    {
      id: "mc_l19_arrow_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::arrow function",
      level: 5,
      question: "Arrow function implicit return:",
      options: [
        "(a, b) => a + b — single expression auto-returned. With { } need explicit",
        "Always need return",
        "Never returns",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Concise vs block body.",
      optionFeedback: [
        "✅ נכון. shortcuts.",
        "❌ implicit option exists.",
        "❌ legitimate.",
        "❌ active."
      ]
    },
    {
      id: "mc_l19_while_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::while",
      level: 4,
      question: "while loop check:",
      options: [
        "Pre-test — condition checked before each iteration. May not run at all.",
        "Always runs",
        "Post-test",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "do...while is post-test.",
      optionFeedback: [
        "✅ נכון. pre-test = may skip.",
        "❌ depends on condition.",
        "❌ זה do...while.",
        "❌ active."
      ]
    },
    {
      id: "mc_l19_for_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::for",
      level: 5,
      question: "for vs for...of:",
      options: [
        "for: numeric counter (i). for...of: iterable values directly",
        "Same",
        "for...of slower always",
        "for deprecated"
      ],
      correctIndex: 0,
      explanation: "Different paradigms.",
      optionFeedback: [
        "✅ נכון. הבדל בין index ל-iteration.",
        "❌ הבדל קונספטואלי.",
        "❌ tradeoffs.",
        "❌ active."
      ]
    },
    {
      id: "mc_l19_break_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::break",
      level: 4,
      question: "break ב-loop:",
      options: [
        "Exits innermost loop. Labels for breaking outer",
        "Exits function",
        "Deprecated",
        "Continues"
      ],
      correctIndex: 0,
      explanation: "Default scope = nearest loop.",
      optionFeedback: [
        "✅ נכון. break exits innermost.",
        "❌ זה return.",
        "❌ standard.",
        "❌ זה continue."
      ]
    },
    {
      id: "mc_l19_continue_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::continue",
      level: 4,
      question: "continue:",
      options: [
        "Skips to next iteration — doesn't exit loop",
        "Exits loop",
        "Throws",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Skip current, continue with next.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה break.",
        "❌ no error.",
        "❌ active."
      ]
    },
    {
      id: "mc_l19_dowhile_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::do while",
      level: 5,
      question: "do...while characteristics:",
      options: [
        "Post-test — body runs at least once before condition checked",
        "Pre-test",
        "Deprecated",
        "Same as while"
      ],
      correctIndex: 0,
      explanation: "Use case: input prompts.",
      optionFeedback: [
        "✅ נכון. always-run-once.",
        "❌ זה while.",
        "❌ active.",
        "❌ הבדל מהותי."
      ]
    },
    {
      id: "mc_l19_array_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::array",
      level: 4,
      question: "Array iteration choices:",
      options: [
        "for...of, forEach, map, filter, reduce, for, while — different semantics",
        "Only for",
        "Only forEach",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Choose by need.",
      optionFeedback: [
        "✅ נכון. multiple options.",
        "❌ many alternatives.",
        "❌ many.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_l19_foreach_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::forEach",
      level: 4,
      question: "forEach key trait:",
      options: [
        "Cannot break — runs callback for ALL elements",
        "Can break",
        "Returns array",
        "Async by default"
      ],
      correctIndex: 0,
      explanation: "Use for...of if break needed.",
      optionFeedback: [
        "✅ נכון. forEach לא תומך ב-break.",
        "❌ זה limitation.",
        "❌ undefined.",
        "❌ sync."
      ]
    },
    {
      id: "mc_l19_filter_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::filter",
      level: 4,
      question: "filter return:",
      options: [
        "New array with elements that pass test (boolean)",
        "Single element",
        "Original mutated",
        "Object"
      ],
      correctIndex: 0,
      explanation: "Non-mutating.",
      optionFeedback: [
        "✅ נכון. filter creates new.",
        "❌ זה find.",
        "❌ filter is non-mutating.",
        "❌ array."
      ]
    },
    {
      id: "mc_l19_object_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::object literal",
      level: 4,
      question: "Object literal property shorthand:",
      options: [
        "{ name } ≡ { name: name } — when var name matches key",
        "Syntax error",
        "Deprecated",
        "Random"
      ],
      correctIndex: 0,
      explanation: "ES6 shorthand.",
      optionFeedback: [
        "✅ נכון. shorthand syntax.",
        "❌ valid ES6+.",
        "❌ active.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_l19_data_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::Data Types",
      level: 4,
      question: "JS primitive types count:",
      options: [
        "7: string, number, boolean, null, undefined, symbol, bigint",
        "5",
        "3",
        "Unlimited"
      ],
      correctIndex: 0,
      explanation: "Plus Object reference type.",
      optionFeedback: [
        "✅ נכון. 7 primitives.",
        "❌ count is 7.",
        "❌ count is 7.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_l19_camelcase_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::camelCase",
      level: 4,
      question: "camelCase example:",
      options: [
        "myVariableName — first lowercase, rest capitalized words",
        "MyVariableName",
        "my_variable_name",
        "my-variable-name"
      ],
      correctIndex: 0,
      explanation: "JS convention.",
      optionFeedback: [
        "✅ נכון. JS standard.",
        "❌ זה PascalCase (classes).",
        "❌ snake_case (Python).",
        "❌ kebab-case (CSS)."
      ]
    },
    {
      id: "mc_l19_alert_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::alert",
      level: 3,
      question: "alert() characteristics:",
      options: [
        "Blocks main thread — modal popup. Bad UX, debug only",
        "Non-blocking",
        "Deprecated",
        "Server-side"
      ],
      correctIndex: 0,
      explanation: "Use console.log for debug.",
      optionFeedback: [
        "✅ נכון. blocking modal.",
        "❌ blocking.",
        "❌ active but discouraged.",
        "❌ browser."
      ]
    },
    {
      id: "mc_l19_consolelog_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::console.log",
      level: 3,
      question: "console.log methods:",
      options: [
        ".log .error .warn .info .table .time .group — multiple debug aids",
        ".log only",
        "Deprecated",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Rich console API.",
      optionFeedback: [
        "✅ נכון. multiple methods.",
        "❌ many more.",
        "❌ active.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_l19_debugger_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::debugger",
      level: 4,
      question: "debugger statement:",
      options: [
        "Pauses execution if DevTools open — programmatic breakpoint",
        "Always pauses",
        "Throws",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "DevTools required.",
      optionFeedback: [
        "✅ נכון. conditional pause.",
        "❌ requires DevTools.",
        "❌ no error.",
        "❌ active."
      ]
    },
    {
      id: "mc_l19_network_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::network",
      level: 4,
      question: "Network tab uses:",
      options: [
        "Inspect HTTP requests/responses, timing, payloads, headers",
        "View DOM",
        "Run JS",
        "Edit code"
      ],
      correctIndex: 0,
      explanation: "DevTools network panel.",
      optionFeedback: [
        "✅ נכון. network = HTTP debug.",
        "❌ זה Elements.",
        "❌ זה Console.",
        "❌ זה Sources."
      ]
    },
    {
      id: "mc_l19_script_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::script",
      level: 3,
      question: "<script src=> attributes:",
      options: [
        "async / defer / type='module' — control loading + execution timing",
        "Only src",
        "Deprecated",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Critical for performance.",
      optionFeedback: [
        "✅ נכון. multiple attributes.",
        "❌ many available.",
        "❌ active.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_l19_dom_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::DOM",
      level: 4,
      question: "DOM manipulation main APIs:",
      options: [
        "querySelector + textContent + addEventListener + classList",
        "innerHTML only",
        "Deprecated",
        "Single API"
      ],
      correctIndex: 0,
      explanation: "Modern DOM is large.",
      optionFeedback: [
        "✅ נכון. multiple modern APIs.",
        "❌ XSS-prone.",
        "❌ active.",
        "❌ many."
      ]
    },
    {
      id: "mc_l19_event_object_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::event object",
      level: 5,
      question: "Event object properties:",
      options: [
        "type, target, currentTarget, timeStamp, preventDefault(), stopPropagation()",
        "Only target",
        "Deprecated",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Rich Event interface.",
      optionFeedback: [
        "✅ נכון. multiple properties.",
        "❌ many more.",
        "❌ standard.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_l19_method_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::method",
      level: 4,
      question: "Object method shorthand:",
      options: [
        "{ greet() {} } ≡ { greet: function() {} }",
        "Syntax error",
        "Deprecated",
        "Different semantics"
      ],
      correctIndex: 0,
      explanation: "ES6 method shorthand.",
      optionFeedback: [
        "✅ נכון. equivalent.",
        "❌ valid syntax.",
        "❌ active.",
        "❌ same."
      ]
    },
    {
      id: "mc_l19_class_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::class",
      level: 6,
      question: "JS class is:",
      options: [
        "Syntactic sugar over prototype chain — same mechanism underneath",
        "Real class",
        "Deprecated",
        "Java equivalent"
      ],
      correctIndex: 0,
      explanation: "Prototype-based inheritance.",
      optionFeedback: [
        "✅ נכון. prototype-based.",
        "❌ underlying mechanism prototype.",
        "❌ active.",
        "❌ different model."
      ]
    },
    {
      id: "mc_l19_inheritance_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::inheritance",
      level: 6,
      question: "JS inheritance via:",
      options: [
        "Prototype chain — extends sets parent prototype, super() calls parent constructor",
        "Multiple inheritance",
        "Composition only",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Single inheritance via __proto__.",
      optionFeedback: [
        "✅ נכון. single proto chain.",
        "❌ JS supports single only.",
        "❌ inheritance available too.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_l19_nested_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::nested object",
      level: 5,
      question: "Nested object access safety:",
      options: [
        "Optional chaining ?. — obj?.a?.b skips if undefined",
        "Always errors",
        "Deprecated",
        "Manual checks"
      ],
      correctIndex: 0,
      explanation: "ES2020 feature.",
      optionFeedback: [
        "✅ נכון. ?. safe access.",
        "❌ אין שגיאה.",
        "❌ active.",
        "❌ ?. modern."
      ]
    },
    {
      id: "mc_l19_arrofobjs_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::array of objects",
      level: 5,
      question: "Array of objects iteration:",
      options: [
        "users.map(u => u.name) — extract field. .filter for subset",
        "for loop required",
        "Deprecated",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Functional array methods.",
      optionFeedback: [
        "✅ נכון. functional methods.",
        "❌ functional preferred.",
        "❌ active.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_l19_cookies_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::cookies",
      level: 5,
      question: "document.cookie behavior:",
      options: [
        "All cookies as string — manual parsing needed. Tough API",
        "Object",
        "Array",
        "Map"
      ],
      correctIndex: 0,
      explanation: "Old API. Use libraries.",
      optionFeedback: [
        "✅ נכון. string-based legacy API.",
        "❌ זה לא object.",
        "❌ זה לא array.",
        "❌ זה לא Map."
      ]
    },
    // ─── More patterns ───
    {
      id: "mc_l19_optional_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::nested object",
      level: 6,
      question: "Optional chaining + nullish coalescing:",
      options: [
        "obj?.a ?? 'default' — ?. for safe access, ?? for null/undefined fallback",
        "obj.a || 'default'",
        "Random",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Modern combo.",
      optionFeedback: [
        "✅ נכון. modern pattern.",
        "❌ || catches falsy too (0, '').",
        "❌ deterministic.",
        "❌ active."
      ]
    },
    {
      id: "mc_l19_template_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::function",
      level: 5,
      question: "Template literal use cases:",
      options: [
        "Multiline strings + interpolation `${var}` + tagged for sanitization",
        "Single-line only",
        "Deprecated",
        "Random"
      ],
      correctIndex: 0,
      explanation: "ES6.",
      optionFeedback: [
        "✅ נכון. multiple use cases.",
        "❌ multiline supported.",
        "❌ active.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_l19_strict_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::function",
      level: 6,
      question: "'use strict' effects:",
      options: [
        "No implicit globals + this is undefined (not window) + duplicate params error",
        "No effect",
        "Deprecated",
        "Slower"
      ],
      correctIndex: 0,
      explanation: "Modules strict by default.",
      optionFeedback: [
        "✅ נכון. multiple effects.",
        "❌ has effects.",
        "❌ active.",
        "❌ same speed."
      ]
    },
    {
      id: "mc_l19_global_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::script",
      level: 7,
      question: "globalThis:",
      options: [
        "Universal global — window in browser, global in Node, self in worker",
        "browser only",
        "Node only",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "ES2020 standard.",
      optionFeedback: [
        "✅ נכון. globalThis universal.",
        "❌ universal.",
        "❌ universal.",
        "❌ active."
      ]
    },
    {
      id: "mc_l19_iife_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::function",
      level: 7,
      question: "IIFE pattern:",
      options: [
        "(function() { ... })() — pre-ES6 module, isolated scope",
        "Class",
        "Deprecated entirely",
        "Async"
      ],
      correctIndex: 0,
      explanation: "ES6 modules replaced most uses.",
      optionFeedback: [
        "✅ נכון. legacy pattern.",
        "❌ different.",
        "❌ pattern still appears.",
        "❌ sync."
      ]
    },
  ],
  fill: [
    {
      id: "fill_l19_switch_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::switch",
      level: 5,
      code: "switch (status) {\n  case 'ok': return 1;\n  case 'fail': ____;\n  default: return 0;\n}",
      answer: "return -1",
      explanation: "Need explicit return or break per case."
    },
    {
      id: "fill_l19_arrow_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::arrow function",
      level: 4,
      code: "const sum = (a, b) ____ a + b;",
      answer: "=>",
      explanation: "Arrow function syntax."
    },
    {
      id: "fill_l19_default_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::parameter",
      level: 5,
      code: "function greet(name = ____) { return `Hi ${name}`; }\ngreet(); // 'Hi Guest'",
      answer: "'Guest'",
      explanation: "Default parameter value."
    },
    {
      id: "fill_l19_break_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::break",
      level: 4,
      code: "for (let i = 0; i < 100; i++) {\n  if (i === 5) ____;\n  console.log(i);\n}",
      answer: "break",
      explanation: "break exits loop."
    },
    {
      id: "fill_l19_continue_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::continue",
      level: 4,
      code: "for (let i = 0; i < 5; i++) {\n  if (i % 2 === 0) ____;\n  console.log(i);  // 1, 3\n}",
      answer: "continue",
      explanation: "continue skips iteration."
    },
    {
      id: "fill_l19_dowhile_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::do while",
      level: 5,
      code: "let i = 0;\n____ {\n  console.log(i);\n  i++;\n} while (i < 3);",
      answer: "do",
      explanation: "do...while runs body first."
    },
    {
      id: "fill_l19_optional_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::nested object",
      level: 6,
      code: "const city = user____.address?.city ?? 'Unknown';",
      answer: "?",
      explanation: "Optional chaining ?. safe access."
    },
    {
      id: "fill_l19_template_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::function",
      level: 4,
      code: "const greeting = ____Hello ${name}, today is ${day}____;",
      answer: "`",
      explanation: "Backticks for template literals."
    },
    {
      id: "fill_l19_strict_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::function",
      level: 6,
      code: "'use ____';\n// strict mode enabled",
      answer: "strict",
      explanation: "use strict directive."
    },
    {
      id: "fill_l19_class_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::class",
      level: 6,
      code: "____ Animal {\n  constructor(name) { this.name = name; }\n}",
      answer: "class",
      explanation: "class keyword."
    },
    {
      id: "fill_l19_extends_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::inheritance",
      level: 7,
      code: "class Dog ____ Animal {\n  bark() { return 'woof'; }\n}",
      answer: "extends",
      explanation: "extends for inheritance."
    },
    {
      id: "fill_l19_super_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::inheritance",
      level: 7,
      code: "class Dog extends Animal {\n  constructor(name, breed) {\n    ____(name);\n    this.breed = breed;\n  }\n}",
      answer: "super",
      explanation: "super() calls parent constructor."
    },
    {
      id: "fill_l19_method_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::method",
      level: 5,
      code: "const obj = {\n  ____() { return 'hi'; }  // method shorthand\n};",
      answer: "greet",
      explanation: "ES6 method shorthand."
    },
    {
      id: "fill_l19_obj_short_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::object literal",
      level: 5,
      code: "const name = 'Tal';\nconst user = { ____ };  // shorthand for { name: name }",
      answer: "name",
      explanation: "Property shorthand."
    },
    {
      id: "fill_l19_globalthis_cc_001",
      topicId: "topic_js",
      conceptKey: "lesson_19::script",
      level: 7,
      code: "// Universal global access\n____.myApp = { version: '1.0' };",
      answer: "globalThis",
      explanation: "globalThis universal global."
    },
  ],
};
