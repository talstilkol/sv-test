// Sprint 2 batch SS - Common interview questions
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_SS = {
  mc: [
    { id: "mc_iv_event_loop_ss_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 8,
      question: "באיזה סדר event loop מטפל ב-tasks?",
      options: [
        "Stack drain → microtasks (Promise.then, queueMicrotask) → render → next macrotask (setTimeout/setInterval/I/O)",
        "Macrotasks → microtasks → render",
        "FIFO global",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Microtasks always before next macrotask. שאלה קלאסית בinterview.",
      optionFeedback: ["✅ נכון.","❌ הפוך.","❌ מובנה.","❌ דטרמיניסטי."]
    },
    { id: "mc_iv_closures_ss_001", topicId: "topic_js", conceptKey: "lesson_15::Closure", level: 7,
      question: "מה closure?",
      options: [
        "פונקציה שזוכרת את הscope שלה גם אחרי שהקריאה לה הסתיימה — מאפשר private state, factories",
        "OOP class",
        "Async wrapper",
        "Object spread"
      ],
      correctIndex: 0,
      explanation: "Closure: function + lexical environment.",
      optionFeedback: ["✅ נכון.","❌ pattern אחר.","❌ unrelated.","❌ unrelated."]
    },
    { id: "mc_iv_this_ss_001", topicId: "topic_js", conceptKey: "lesson_11::function", level: 7,
      question: "איך this נקבע ב-JS?",
      options: [
        "Call site: obj.fn() → this=obj. fn() → this=undefined (strict). new C() → this=newInstance. fn.bind(x) → this=x. arrow inherits lexical",
        "Type system",
        "Compile-time",
        "Always undefined"
      ],
      correctIndex: 0,
      explanation: "4 binding rules + arrow exception. ראיון קלאסי.",
      optionFeedback: ["✅ נכון.","❌ JS אין types.","❌ runtime.","❌ תלוי context."]
    },
    { id: "mc_iv_proto_ss_001", topicId: "topic_js", conceptKey: "lesson_11::object", level: 7,
      question: "מה prototypal inheritance?",
      options: [
        "כל object יש __proto__ → לעוד object. lookup של property עולה את ה-chain. אין classes 'אמיתיים' ב-JS",
        "Class-based",
        "Multiple inheritance",
        "Static dispatch"
      ],
      correctIndex: 0,
      explanation: "ES6 class הוא syntactic sugar על prototype.",
      optionFeedback: ["✅ נכון.","❌ JS prototype-based.","❌ אין native MI.","❌ dynamic."]
    },
    { id: "mc_iv_var_let_const_ss_001", topicId: "topic_js", conceptKey: "lesson_11::Variables", level: 6,
      question: "מה ההבדל בין var/let/const?",
      options: [
        "var: function-scoped, hoisted (init undefined). let: block-scoped, TDZ. const: block-scoped, TDZ, no rebind (mutable for objects)",
        "זהים",
        "var modern",
        "const = immutable"
      ],
      correctIndex: 0,
      explanation: "const אינו immutable — רק no rebind. הסבר חיוני.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ legacy.","❌ shallow only."]
    },
    { id: "mc_iv_async_await_ss_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 7,
      question: "מה עדיף: async/await או .then?",
      options: [
        "תלוי. async/await נקי לחזרות sequential + try/catch. .then טוב לchain קצר/composition",
        "Always async/await",
        "Always .then",
        "זהים"
      ],
      correctIndex: 0,
      explanation: "מקצועיים משלבים: await ל-flow, .then ל-pipeline.",
      optionFeedback: ["✅ נכון. context-dependent.","❌ overgeneralization.","❌ overgeneralization.","❌ syntax שונה."]
    },
    { id: "mc_iv_promise_methods_ss_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 7,
      question: "מה ההבדל בין Promise.all, allSettled, race, any?",
      options: [
        "all: כולם הצליחו או fail-fast. allSettled: מחכה לכולם, מחזיר results. race: ראשון להסתיים. any: ראשון להצליח (AggregateError אם כולם נכשלו)",
        "זהים",
        "all is fastest",
        "any is sequential"
      ],
      correctIndex: 0,
      explanation: "4 methods, 4 use cases.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ all parallel.","❌ parallel."]
    },
    { id: "mc_iv_eq_ss_001", topicId: "topic_js", conceptKey: "lesson_11::boolean", level: 6,
      question: "מה ההבדל בין == ל-===?",
      options: [
        "==: type coercion ('5' == 5 → true). ===: strict, אין coercion ('5' === 5 → false). מומלץ === תמיד",
        "זהים",
        "== מהיר",
        "=== legacy"
      ],
      correctIndex: 0,
      explanation: "ESLint 'eqeqeq' rule. ===  by default.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ דומה.","❌ הפוך."]
    },
    { id: "mc_iv_call_apply_bind_ss_001", topicId: "topic_js", conceptKey: "lesson_11::function", level: 7,
      question: "מה ההבדל בין call/apply/bind?",
      options: [
        "call(this, a, b): קורא עם this + args. apply(this, [a,b]): args ב-array. bind(this, a, b): מחזיר function חדשה עם locked this+partial",
        "זהים",
        "bind מאחר",
        "apply async"
      ],
      correctIndex: 0,
      explanation: "ES6 spread החליף apply: fn.apply(null, args) → fn(...args).",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ unrelated.","❌ sync."]
    },
    { id: "mc_iv_event_delegation_ss_001", topicId: "topic_dom", conceptKey: "lesson_13::DOM", level: 7,
      question: "מה event delegation ולמה זה שימושי?",
      options: [
        "Listener על parent במקום על כל child. Bubbling מטפל. חוסך memory + עובד עם dynamic children",
        "Listener בכל child",
        "Capture phase",
        "Async events"
      ],
      correctIndex: 0,
      explanation: "ul.onclick + e.target. classic Vanilla JS pattern.",
      optionFeedback: ["✅ נכון.","❌ הפוך.","❌ phase שונה.","❌ unrelated."]
    },
    { id: "mc_iv_hoisting_ss_001", topicId: "topic_js", conceptKey: "lesson_11::Hoisting", level: 6,
      question: "מה hoisting?",
      options: [
        "JS engine 'מרים' var/function declarations לראש scope לפני exec. var → undefined. let/const ב-TDZ. function declarations fully callable",
        "Async behavior",
        "ES5 only",
        "Compiler optimization"
      ],
      correctIndex: 0,
      explanation: "Engine creates Variable Environment first, then runs.",
      optionFeedback: ["✅ נכון.","❌ unrelated.","❌ JS feature.","❌ זה תוצאה לא הסבר."]
    },
    { id: "mc_iv_rest_spread_ss_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 6,
      question: "מה ההבדל בין rest ל-spread?",
      options: [
        "אותה syntax (...) שונה לפי context. spread: פיזור (call/array/object literal). rest: collect (function params, destructuring)",
        "זהים",
        "rest async",
        "spread sync"
      ],
      correctIndex: 0,
      explanation: "Position-based: function f(...args) — rest. f(...args) — spread.",
      optionFeedback: ["✅ נכון.","❌ אותה syntax shor different role.","❌ unrelated.","❌ unrelated."]
    },
    { id: "mc_iv_modules_ss_001", topicId: "topic_js", conceptKey: "lesson_19::function", level: 6,
      question: "מה ההבדל בין ESM ל-CommonJS?",
      options: [
        "ESM: import/export, async, static analysis (tree shake), browser native. CJS: require/module.exports, sync, dynamic, Node legacy",
        "זהים",
        "CJS modern",
        "ESM Node only"
      ],
      correctIndex: 0,
      explanation: "Node 14+ תומך ESM נטיב. interop דורש .mjs/type:module.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ ESM modern.","❌ עובד גם ב-browser."]
    },
    { id: "mc_iv_arr_methods_ss_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "איזה array method משנה את ה-original (mutating)?",
      options: [
        "push, pop, shift, unshift, splice, sort, reverse, fill, copyWithin",
        "map, filter, slice, concat",
        "every, some, find",
        "כולם immutable"
      ],
      correctIndex: 0,
      explanation: "ES2023 הוסיף toSorted/toReversed/toSpliced — non-mutating versions.",
      optionFeedback: ["✅ נכון.","❌ אלה non-mutating.","❌ predicates.","❌ חלקם mutating."]
    },
    { id: "mc_iv_currying_ss_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      question: "מה currying ולמה זה שימושי?",
      options: [
        "המרת f(a,b,c) → f(a)(b)(c). מאפשר partial application + composition. שימוש ב-FP libraries (Ramda)",
        "Same as bind",
        "OOP pattern",
        "Async only"
      ],
      correctIndex: 0,
      explanation: "const add = a => b => a + b; add(2)(3) = 5.",
      optionFeedback: ["✅ נכון.","❌ bind partial.","❌ FP.","❌ sync."]
    },
    { id: "mc_iv_memoize_ss_001", topicId: "topic_fp", conceptKey: "lesson_15::Closure", level: 7,
      question: "מה memoization?",
      options: [
        "Cache של תוצאות לפי inputs. הקריאה הבאה עם אותם args → מ-cache. closure שומר. שימוש: useMemo, lodash.memoize",
        "Bind",
        "Throttle",
        "Compose"
      ],
      correctIndex: 0,
      explanation: "Trade space for time. נכון לpure functions בלבד.",
      optionFeedback: ["✅ נכון.","❌ pattern אחר.","❌ pattern אחר.","❌ pattern אחר."]
    },
    { id: "mc_iv_react_render_ss_001", topicId: "topic_react", conceptKey: "lesson_21::rendering", level: 7,
      question: "מה גורם re-render ב-React?",
      options: [
        "setState עם value שונה (Object.is). parent מתרענד. context value שינוי. hook dep שינוי. מ-React 18: גם auto-batching",
        "DOM mutation",
        "Network",
        "CSS"
      ],
      correctIndex: 0,
      explanation: "React לא 'reactive' מ-mutation. נדרש state update.",
      optionFeedback: ["✅ נכון.","❌ DOM הוא תוצאה.","❌ unrelated.","❌ unrelated."]
    },
    { id: "mc_iv_react_keys_ss_001", topicId: "topic_react", conceptKey: "lesson_21::map", level: 7,
      question: "למה React דורש key prop ב-list?",
      options: [
        "Stable identity בין renders. ללא keys: reconciliation by index → bugs בreorder. עם key={item.id}: יציב",
        "Performance only",
        "TypeScript",
        "ID required"
      ],
      correctIndex: 0,
      explanation: "Reconciler משווה old vs new. keys = identity.",
      optionFeedback: ["✅ נכון.","❌ correctness too.","❌ unrelated.","❌ generic."]
    },
    { id: "mc_iv_react_lifecycle_ss_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      question: "מה החלפת componentDidMount/Update/Unmount עם hooks?",
      options: [
        "useEffect(fn, []) ≈ DidMount. useEffect(fn, [dep]) ≈ DidUpdate. useEffect(() => () => cleanup(), []) ≈ Unmount",
        "useState",
        "useRef",
        "useMemo"
      ],
      correctIndex: 0,
      explanation: "useEffect משלב לוגיקת lifecycle ב-API אחיד.",
      optionFeedback: ["✅ נכון.","❌ state hook.","❌ ref hook.","❌ memo hook."]
    },
    { id: "mc_iv_react_perf_ss_001", topicId: "topic_react", conceptKey: "lesson_24::useMemo", level: 8,
      question: "כלים לoptimization ב-React?",
      options: [
        "React.memo, useMemo, useCallback, code splitting (lazy/Suspense), virtualization (react-window), state colocation, key stable",
        "Always memo",
        "Single tool",
        "DOM only"
      ],
      correctIndex: 0,
      explanation: "Premature optimization מזיק. profile first.",
      optionFeedback: ["✅ נכון.","❌ overuse.","❌ multiple tools.","❌ unrelated."]
    },
    { id: "mc_iv_redux_pattern_ss_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      question: "Redux core principles?",
      options: [
        "Single source of truth (store), state read-only, changes via pure reducers (state, action) → newState. predictable",
        "Multiple stores",
        "Mutations OK",
        "Async only"
      ],
      correctIndex: 0,
      explanation: "Redux Toolkit (RTK) הוא ה-default מודרני. Immer מאפשר 'mutable-style' immutable.",
      optionFeedback: ["✅ נכון.","❌ single.","❌ אסור.","❌ sync core."]
    },
    { id: "mc_iv_state_lib_ss_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      question: "מתי להשתמש ב-state library (Redux/Zustand/Jotai)?",
      options: [
        "State משותף global, deep prop drilling, complex transitions, time-travel debugging. אחרת: useState/useReducer + Context מספיקים",
        "Always",
        "Never",
        "TypeScript only"
      ],
      correctIndex: 0,
      explanation: "ב-React מודרני: Zustand פשוט יותר מ-Redux לרוב המקרים.",
      optionFeedback: ["✅ נכון.","❌ overkill.","❌ יש מקרים.","❌ unrelated."]
    },
    { id: "mc_iv_rest_api_ss_001", topicId: "topic_rest", conceptKey: "lesson_17::REST API", level: 7,
      question: "REST principles?",
      options: [
        "Client-server, stateless, cacheable, uniform interface, layered, code-on-demand (optional). resource-based URLs + HTTP verbs",
        "Stateful",
        "Single endpoint",
        "RPC only"
      ],
      correctIndex: 0,
      explanation: "Roy Fielding 2000. רוב APIs היום RESTish.",
      optionFeedback: ["✅ נכון.","❌ הפוך.","❌ resource-based.","❌ שונה."]
    },
    { id: "mc_iv_idempotent_ss_001", topicId: "topic_rest", conceptKey: "lesson_17::REST API", level: 7,
      question: "אילו HTTP methods idempotent?",
      options: [
        "GET, PUT, DELETE, HEAD, OPTIONS — אותה תוצאה גם אם מבוצעים פעמיים. POST לא",
        "All",
        "POST only",
        "None"
      ],
      correctIndex: 0,
      explanation: "Safe (no side effects) ⊂ idempotent. POST creates → state diff.",
      optionFeedback: ["✅ נכון.","❌ POST שונה.","❌ הפוך.","❌ idempotent יש."]
    },
    { id: "mc_iv_status_codes_ss_001", topicId: "topic_rest", conceptKey: "lesson_17::REST API", level: 6,
      question: "ההבדל בין 401 ל-403?",
      options: [
        "401 Unauthorized: אין credentials או invalid. 403 Forbidden: יש credentials, אבל אסור",
        "זהים",
        "401 client, 403 server",
        "401 timeout"
      ],
      correctIndex: 0,
      explanation: "401 → login. 403 → no access for this user.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ שניהם 4xx.","❌ זה 408."]
    },
    { id: "mc_iv_jwt_ss_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::JWT", level: 7,
      question: "מה JWT?",
      options: [
        "JSON Web Token: header.payload.signature. self-contained auth. server signs + verifies. stateless",
        "Cookie",
        "Session ID",
        "Encrypted blob"
      ],
      correctIndex: 0,
      explanation: "Base64URL encoded. signature = HMAC או RSA. don't store sensitive in payload.",
      optionFeedback: ["✅ נכון.","❌ delivery mechanism שונה.","❌ stateful.","❌ JWT not encrypted by default."]
    },
    { id: "mc_iv_xss_csrf_ss_001", topicId: "topic_security", conceptKey: "lesson_auth_security::XSS boundary", level: 7,
      question: "מה ההבדל בין XSS ל-CSRF?",
      options: [
        "XSS: malicious script רץ בdomain שלך. CSRF: דפדפן שולח cookie אוטומטית מאתר זדוני. הגנות שונות",
        "זהים",
        "XSS server-side",
        "CSRF client-side"
      ],
      correctIndex: 0,
      explanation: "XSS: sanitize. CSRF: SameSite cookie + tokens.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ XSS client.","❌ שניהם attack על client."]
    },
    { id: "mc_iv_sql_inject_ss_001", topicId: "topic_security", conceptKey: "lesson_auth_security::password hashing", level: 7,
      question: "איך SQL Injection מתבצעת + הגנה?",
      options: [
        "Concatenation של user input ל-SQL. attacker מזריק SQL. הגנה: parameterized queries / prepared statements / ORM",
        "Encryption",
        "HTTPS",
        "JWT"
      ],
      correctIndex: 0,
      explanation: "OWASP top. ORM (Sequelize/Prisma) מונע אוטומטית.",
      optionFeedback: ["✅ נכון.","❌ אינה רלוונטית.","❌ אינה רלוונטית.","❌ אינה רלוונטית."]
    },
    { id: "mc_iv_caching_ss_001", topicId: "topic_perf", conceptKey: "lesson_24::expensive calculation", level: 7,
      question: "אסטרטגיות caching ב-web?",
      options: [
        "Browser cache (HTTP headers: Cache-Control/ETag), CDN, Service Worker, in-memory (lodash memoize), DB query cache (Redis)",
        "One layer",
        "Client only",
        "Server only"
      ],
      correctIndex: 0,
      explanation: "Stale-while-revalidate, cache-first, network-first — אסטרטגיות SW נפוצות.",
      optionFeedback: ["✅ נכון.","❌ multiple.","❌ multi-tier.","❌ multi-tier."]
    },
    { id: "mc_iv_db_index_ss_001", topicId: "topic_db", conceptKey: "lesson_20::Mongoose", level: 7,
      question: "מתי לcreate index ב-DB?",
      options: [
        "Field שמופיע ב-WHERE/SORT/JOIN. compound index ל-multi-field queries. trade-off: write overhead + storage",
        "Every field",
        "Never",
        "Random"
      ],
      correctIndex: 0,
      explanation: "EXPLAIN/explain() show usage. unique constraints יכולים להיות indexes.",
      optionFeedback: ["✅ נכון.","❌ overhead.","❌ critical.","❌ דטרמיניסטי."]
    },
    { id: "mc_iv_n_plus_one_ss_001", topicId: "topic_db", conceptKey: "lesson_20::Mongoose", level: 8,
      question: "מה N+1 query problem?",
      options: [
        "1 query לcollection + N queries לrelated. נפוץ ב-ORM lazy loading. תיקון: JOIN/IN/populate",
        "Performance feature",
        "Index issue",
        "Type error"
      ],
      correctIndex: 0,
      explanation: "Mongoose populate, Sequelize include, GraphQL DataLoader פותרים.",
      optionFeedback: ["✅ נכון.","❌ הפוך — bug.","❌ unrelated.","❌ unrelated."]
    },
    { id: "mc_iv_acid_ss_001", topicId: "topic_db", conceptKey: "lesson_20::Mongoose", level: 8,
      question: "מה ACID?",
      options: [
        "Atomicity, Consistency, Isolation, Durability — תכונות transaction. SQL DBs מבטיחים, NoSQL חלקית",
        "Performance",
        "Indexing",
        "Caching"
      ],
      correctIndex: 0,
      explanation: "BASE: alternative ל-NoSQL (Basically Available, Soft state, Eventually consistent).",
      optionFeedback: ["✅ נכון.","❌ unrelated.","❌ unrelated.","❌ unrelated."]
    },
    { id: "mc_iv_sql_nosql_ss_001", topicId: "topic_db", conceptKey: "lesson_20::Mongoose", level: 8,
      question: "מתי SQL vs NoSQL?",
      options: [
        "SQL: structured data, ACID, complex JOINs (Postgres/MySQL). NoSQL: schema-less, scale, document/KV/graph (Mongo/Redis)",
        "SQL legacy",
        "NoSQL faster",
        "זהים"
      ],
      correctIndex: 0,
      explanation: "Hybrid common: Postgres + Redis cache + Elasticsearch search.",
      optionFeedback: ["✅ נכון.","❌ עדיין relevant.","❌ depends.","❌ different models."]
    },
    { id: "mc_iv_microservices_ss_001", topicId: "topic_arch", conceptKey: "lesson_19::class", level: 9,
      question: "מתי microservices נכון?",
      options: [
        "Large team + clear domain boundaries. Different scaling per service. Tech diversity. אחרת: monolith פשוט יותר",
        "Always",
        "Never",
        "Small projects"
      ],
      correctIndex: 0,
      explanation: "Microservice premium: deployment, monitoring, distributed transactions, network reliability.",
      optionFeedback: ["✅ נכון.","❌ overkill.","❌ valid pattern.","❌ overkill."]
    },
    { id: "mc_iv_cap_ss_001", topicId: "topic_arch", conceptKey: "lesson_19::class", level: 9,
      question: "מה CAP theorem?",
      options: [
        "Distributed system: בחר 2 מתוך 3 - Consistency, Availability, Partition tolerance. בpartition: בוחר C או A",
        "All 3 always",
        "None possible",
        "P optional"
      ],
      correctIndex: 0,
      explanation: "Eric Brewer 2000. בpractice: CP (MongoDB, HBase) או AP (Cassandra, DynamoDB).",
      optionFeedback: ["✅ נכון.","❌ אסור.","❌ אפשרי.","❌ network failures inevitable."]
    }
  ],
  fill: [
    { id: "fill_iv_typeof_ss_001", topicId: "topic_js", conceptKey: "lesson_15::Synchronous", level: 5,
      code: "// Type check\n____ value === 'string'",
      answer: "typeof",
      explanation: "typeof returns type as string."
    },
    { id: "fill_iv_array_isarr_ss_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      code: "// Reliable array check\n____.isArray(value)",
      answer: "Array",
      explanation: "Array.isArray = canonical."
    },
    { id: "fill_iv_promise_ss_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 6,
      code: "// Already-resolved\n____.resolve(42).then(console.log);",
      answer: "Promise",
      explanation: "Promise.resolve creates resolved."
    },
    { id: "fill_iv_async_ss_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 6,
      code: "// Wrap return in Promise\n____ function f() { return 1; }",
      answer: "async",
      explanation: "async marks function as Promise-returning."
    },
    { id: "fill_iv_destruct_ss_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 5,
      code: "// Destructure with default\nconst { name = 'Anon' } = ____;",
      answer: "user",
      explanation: "Destructuring extracts named field."
    },
    { id: "fill_iv_spread_ss_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 5,
      code: "// Merge objects\nconst merged = { ____a, ...b };",
      answer: "...",
      explanation: "Spread copies properties."
    },
    { id: "fill_iv_default_param_ss_001", topicId: "topic_js", conceptKey: "lesson_19::function", level: 5,
      code: "// Default parameter\nfunction greet(name = ____) {\n  return 'Hi ' + name;\n}",
      answer: "'Guest'",
      explanation: "Default kicks on undefined."
    },
    { id: "fill_iv_optional_ss_001", topicId: "topic_js", conceptKey: "lesson_19::nested object", level: 6,
      code: "// Safe access\nconst city = user?.address____.city;",
      answer: "?",
      explanation: "Optional chaining short-circuits."
    },
    { id: "fill_iv_null_coalesce_ss_001", topicId: "topic_js", conceptKey: "lesson_19::nested object", level: 6,
      code: "// Default only on nullish\nconst port = config.port ____ 3000;",
      answer: "??",
      explanation: "?? preserves 0/''."
    },
    { id: "fill_iv_arrow_ss_001", topicId: "topic_js", conceptKey: "lesson_11::function", level: 5,
      code: "// Arrow function\nconst double = x ____ x * 2;",
      answer: "=>",
      explanation: "Arrow shorthand."
    },
    { id: "fill_iv_class_ss_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 6,
      code: "// Inheritance\nclass Dog ____ Animal { bark() {} }",
      answer: "extends",
      explanation: "extends sets prototype chain."
    },
    { id: "fill_iv_super_ss_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 7,
      code: "// Call parent constructor\nclass B extends A {\n  constructor(x) {\n    ____();\n    this.x = x;\n  }\n}",
      answer: "super",
      explanation: "super() invokes parent constructor."
    },
    { id: "fill_iv_useState_ss_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 6,
      code: "// React state hook\nconst [count, setCount] = use____(0);",
      answer: "State",
      explanation: "useState hook."
    },
    { id: "fill_iv_useEffect_ss_001", topicId: "topic_react", conceptKey: "lesson_24::useEffect", level: 6,
      code: "// Run side effect once\nuse____(() => { fetchData(); }, []);",
      answer: "Effect",
      explanation: "useEffect with empty deps = mount once."
    },
    { id: "fill_iv_jwt_secret_ss_001", topicId: "topic_security", conceptKey: "lesson_auth_security::JWT", level: 7,
      code: "// Sign with secret from env\nconst token = jwt.sign(payload, process.env.____);",
      answer: "JWT_SECRET",
      explanation: "Secret from environment, never hardcoded."
    }
  ]
};
