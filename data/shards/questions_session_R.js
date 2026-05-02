// data/shards/questions_session_R.js
// Sprint 2 batch R — Async / Promise / fetch / try-catch coverage
// 50 questions: 35 MC + 15 Fill

window.QUESTIONS_SHARD_R = {
  mc: [
    // ─── Promise basics ───
    {
      id: "mc_l15_promise_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 5,
      question: "Promise — מה זה?",
      options: [
        "object שמייצג תוצאה עתידית של פעולה אסינכרונית",
        "callback function",
        "synchronous wrapper",
        "TypeScript type"
      ],
      correctIndex: 0,
      explanation: "3 מצבים: pending, fulfilled, rejected.",
      optionFeedback: [
        "✅ נכון. הגדרה רשמית.",
        "❌ Promise החליף callbacks.",
        "❌ Promise אסינכרוני.",
        "❌ זה JS native."
      ]
    },
    {
      id: "mc_l15_promise_r_002",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 6,
      question: "Promise states:",
      options: [
        "pending → fulfilled או rejected. אחרי settle לא משתנה",
        "running → done → cleanup",
        "open → close",
        "תמיד pending"
      ],
      correctIndex: 0,
      explanation: "Settled state immutable.",
      optionFeedback: [
        "✅ נכון. שלוש מצבים מוגדרים.",
        "❌ אלה לא states של Promise.",
        "❌ זה לא file handle.",
        "❌ Promise תמיד settles."
      ]
    },
    {
      id: "mc_l15_resolve_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::resolve",
      level: 5,
      question: "Promise.resolve(5):",
      options: [
        "מחזיר Promise שכבר fulfilled עם value=5",
        "Promise pending",
        "מספר 5",
        "Error"
      ],
      correctIndex: 0,
      explanation: "Promise.resolve שימושי לעטיפת ערך לחוט async.",
      optionFeedback: [
        "✅ נכון.",
        "❌ resolve = settled.",
        "❌ עטוף ב-Promise.",
        "❌ אין שגיאה."
      ]
    },
    {
      id: "mc_l15_reject_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::reject",
      level: 6,
      question: "Promise.reject('msg') ללא .catch:",
      options: [
        "Unhandled rejection — warning בbrowser/Node, אולי crash",
        "מתעלם בשקט",
        "ממיר ל-resolve",
        "TypeScript error"
      ],
      correctIndex: 0,
      explanation: "אחרי microtask checkpoint — unhandledrejection event.",
      optionFeedback: [
        "✅ נכון. חייבים לטפל ב-rejections.",
        "❌ אזהרה רועשת.",
        "❌ rejection נשאר.",
        "❌ זה runtime."
      ]
    },
    // ─── Promise.then chain ───
    {
      id: "mc_l15_then_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::then",
      level: 6,
      question: ".then(fn) מחזיר:",
      options: [
        "Promise חדש שמתפלג ל-fn return value",
        "אותו Promise",
        "value ישיר",
        "undefined"
      ],
      correctIndex: 0,
      explanation: "כך chain עובד — כל .then מייצר Promise חדש.",
      optionFeedback: [
        "✅ נכון. enables chaining.",
        "❌ Promise חדש בכל קריאה.",
        "❌ עטוף ב-Promise.",
        "❌ undefined מוחזר אם fn לא מחזיר."
      ]
    },
    {
      id: "mc_l15_then_r_002",
      topicId: "topic_async",
      conceptKey: "lesson_15::then",
      level: 7,
      question: ".then(fn) שמחזירה Promise אחר:",
      options: [
        "ה-chain מחכה לPromise החדש (auto-flattening)",
        "מחזיר Promise<Promise>",
        "Error",
        "מתעלם"
      ],
      correctIndex: 0,
      explanation: "Promise auto-flattening = no nested Promises.",
      optionFeedback: [
        "✅ נכון. .then יודע לחכות.",
        "❌ אוטו-flatten.",
        "❌ אין שגיאה.",
        "❌ הוא חוכה."
      ]
    },
    // ─── catch (Promise) ───
    {
      id: "mc_l15_catchprom_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::catch (Promise)",
      level: 6,
      question: ".catch(fn) במקום ב-chain:",
      options: [
        "תופס rejection בכל ה-then לפניו (אחד או יותר)",
        "תופס רק את ה-then הקודם",
        "תופס מ-async outer scope",
        "אסור מספר .catch"
      ],
      correctIndex: 0,
      explanation: ".catch בסוף chain תופס כל error בדרך.",
      optionFeedback: [
        "✅ נכון. ניהול שגיאות מרוכז.",
        "❌ זה לא scope-specific.",
        "❌ Promise scope.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l15_catchprom_r_002",
      topicId: "topic_async",
      conceptKey: "lesson_15::catch (Promise)",
      level: 7,
      question: ".catch מחזיר value ולא throw:",
      options: [
        "ה-chain ממשיך כאילו לא היה error — חוזר ל-fulfilled state",
        "Promise נשבר",
        "תמיד rejected",
        "אסור"
      ],
      correctIndex: 0,
      explanation: "catch handler יכול 'לרפא' rejection.",
      optionFeedback: [
        "✅ נכון. recovery pattern.",
        "❌ זה הסבר מוצלח.",
        "❌ catch מתקן.",
        "❌ legitimate pattern."
      ]
    },
    // ─── Synchronous vs Asynchronous ───
    {
      id: "mc_l15_sync_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Synchronous",
      level: 4,
      question: "Synchronous code:",
      options: [
        "רץ ברצף — שורה אחר שורה. בלי המתנה לI/O.",
        "תמיד רץ in worker thread",
        "מהיר יותר תמיד",
        "רק ב-Node"
      ],
      correctIndex: 0,
      explanation: "JS sync ברירת מחדל. async דורש opt-in.",
      optionFeedback: [
        "✅ נכון.",
        "❌ JS single-thread.",
        "❌ תלוי במשימה.",
        "❌ גם ב-browser."
      ]
    },
    {
      id: "mc_l15_async_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Asynchronous",
      level: 5,
      question: "Asynchronous code ב-JS:",
      options: [
        "I/O דרך event loop — לא חוסם thread עיקרי",
        "thread נפרד",
        "אסור ב-browser",
        "רק callbacks"
      ],
      correctIndex: 0,
      explanation: "JS async via event loop, microtasks, macrotasks.",
      optionFeedback: [
        "✅ נכון.",
        "❌ JS single-thread עם event loop.",
        "❌ זה הליבה של dispatching.",
        "❌ Promise + async/await שדרגו."
      ]
    },
    // ─── async/await ───
    {
      id: "mc_l15_asyncfn_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Asynchronous",
      level: 6,
      question: "async function תמיד מחזירה:",
      options: [
        "Promise — גם אם רק `return 5`",
        "value מיידית",
        "callback",
        "void"
      ],
      correctIndex: 0,
      explanation: "async עוטפת return ב-Promise.resolve.",
      optionFeedback: [
        "✅ נכון.",
        "❌ async עוטפת.",
        "❌ זה דור ישן.",
        "❌ אם יש return — Promise."
      ]
    },
    {
      id: "mc_l15_asyncfn_r_002",
      topicId: "topic_async",
      conceptKey: "lesson_15::Asynchronous",
      level: 7,
      question: "await בתוך non-async function:",
      options: [
        "SyntaxError — חייב async או top-level ESM",
        "עובד",
        "ממיר ל-callback",
        "TypeScript only"
      ],
      correctIndex: 0,
      explanation: "Top-level await ב-ESM modules (ES2022).",
      optionFeedback: [
        "✅ נכון.",
        "❌ syntax error.",
        "❌ אין coerce.",
        "❌ JS native feature."
      ]
    },
    {
      id: "mc_l15_await_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Asynchronous",
      level: 7,
      question: "`await fn()` כש-fn לא Promise:",
      options: [
        "ערך עטוף ב-Promise.resolve. ממשיך אחרי microtask",
        "TypeError",
        "מתעלם מ-await",
        "מחזיר undefined"
      ],
      correctIndex: 0,
      explanation: "await על non-Promise = Promise.resolve(value) → next microtask.",
      optionFeedback: [
        "✅ נכון.",
        "❌ legitimate.",
        "❌ await תמיד עוצר.",
        "❌ ערך נשמר."
      ]
    },
    // ─── setTimeout ───
    {
      id: "mc_l15_setto_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::setTimeout",
      level: 6,
      question: "setTimeout returns:",
      options: [
        "ID — passable to clearTimeout",
        "Promise",
        "void",
        "callback"
      ],
      correctIndex: 0,
      explanation: "ID is opaque handle in browser/Node.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה לא Promise.",
        "❌ ID נחוץ ל-clear.",
        "❌ callback הוא input."
      ]
    },
    {
      id: "mc_l15_setto_r_002",
      topicId: "topic_async",
      conceptKey: "lesson_15::setTimeout",
      level: 7,
      question: "setTimeout vs queueMicrotask:",
      options: [
        "setTimeout = macrotask. queueMicrotask = microtask (יותר מהר)",
        "אותו דבר",
        "queueMicrotask לא קיים",
        "setTimeout async, queueMicrotask sync"
      ],
      correctIndex: 0,
      explanation: "Microtask drained לפני כל macrotask.",
      optionFeedback: [
        "✅ נכון. עדיפות שונה.",
        "❌ הבדל קריטי.",
        "❌ קיים מ-2018.",
        "❌ שניהם async."
      ]
    },
    // ─── fetch ───
    {
      id: "mc_l24_fetch_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_24::fetch",
      level: 5,
      question: "fetch מחזיר:",
      options: [
        "Promise<Response> — דורש .json() נוסף לחילוץ body",
        "Promise<json>",
        "Promise<string>",
        "Response sync"
      ],
      correctIndex: 0,
      explanation: "Two-step: response → response.json() → data.",
      optionFeedback: [
        "✅ נכון.",
        "❌ צעד נוסף נחוץ.",
        "❌ Response object.",
        "❌ async."
      ]
    },
    {
      id: "mc_l24_fetch_r_002",
      topicId: "topic_async",
      conceptKey: "lesson_24::fetch",
      level: 6,
      question: "fetch ב-error 4xx/5xx:",
      options: [
        "Promise נשאר fulfilled — צריך לבדוק response.ok",
        "Promise rejected",
        "TypeError",
        "תמיד מצליח"
      ],
      correctIndex: 0,
      explanation: "Network error → reject. HTTP error → fulfilled עם status non-2xx.",
      optionFeedback: [
        "✅ נכון. trap קלאסי.",
        "❌ HTTP error לא = network error.",
        "❌ אין שגיאת syntax.",
        "❌ status != ok ≠ failed."
      ]
    },
    {
      id: "mc_l24_fetch_r_003",
      topicId: "topic_async",
      conceptKey: "lesson_24::fetch",
      level: 7,
      question: "fetch + AbortController:",
      options: [
        "fetch(url, {signal: ctrl.signal}); ctrl.abort() מבטל",
        "אסור לבטל fetch",
        "fetch.cancel()",
        "AbortController לא קיים"
      ],
      correctIndex: 0,
      explanation: "Native cancellation since 2017.",
      optionFeedback: [
        "✅ נכון. mechanism סטנדרטי.",
        "❌ אפשרי.",
        "❌ אין כזה method.",
        "❌ זה web API."
      ]
    },
    {
      id: "mc_l24_fetch_r_004",
      topicId: "topic_async",
      conceptKey: "lesson_24::fetch",
      level: 6,
      question: "fetch POST עם JSON body:",
      options: [
        "method: 'POST', body: JSON.stringify(data), headers: {'Content-Type':'application/json'}",
        "body: data",
        "params: data",
        "POST(url, data)"
      ],
      correctIndex: 0,
      explanation: "JSON.stringify + Content-Type header חובה.",
      optionFeedback: [
        "✅ נכון.",
        "❌ צריך stringify.",
        "❌ אין params.",
        "❌ אין shortcut."
      ]
    },
    // ─── try / catch / throw ───
    {
      id: "mc_l15_try_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::try",
      level: 5,
      question: "try block בלי catch:",
      options: [
        "חוקי רק עם finally — try{}finally{}",
        "תמיד SyntaxError",
        "תופס סביב",
        "מחויב catch"
      ],
      correctIndex: 0,
      explanation: "צריך catch או finally (או שניהם).",
      optionFeedback: [
        "✅ נכון.",
        "❌ עם finally תקין.",
        "❌ try לא תופס בלי clauses.",
        "❌ catch + finally שניהם opt."
      ]
    },
    {
      id: "mc_l15_catch_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::catch",
      level: 6,
      question: "try/catch ב-async function:",
      options: [
        "תופס throw של await — סטנדרט מודרני",
        "לא תופס async errors",
        "רק throw sync",
        "אסור try ב-async"
      ],
      correctIndex: 0,
      explanation: "await throws → catch אם async.",
      optionFeedback: [
        "✅ נכון.",
        "❌ דווקא תופס.",
        "❌ async + try/catch standard.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l15_catch_r_002",
      topicId: "topic_async",
      conceptKey: "lesson_15::catch",
      level: 7,
      question: "catch (e) ב-strict mode TypeScript:",
      options: [
        "e: unknown (TS 4.4+) — צריך narrow לפני שימוש",
        "e: any תמיד",
        "e: Error תמיד",
        "אסור catch"
      ],
      correctIndex: 0,
      explanation: "Safer typing — מאלץ לבדוק את ה-error.",
      optionFeedback: [
        "✅ נכון.",
        "❌ ב-strict זה unknown.",
        "❌ e יכול להיות כל דבר נזרק.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l15_throw_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::throw",
      level: 5,
      question: "throw 'string' vs throw new Error():",
      options: [
        "throw new Error מומלץ — שומר stack trace + message",
        "אותו דבר",
        "throw string מהיר יותר",
        "throw אסור עם class"
      ],
      correctIndex: 0,
      explanation: "Stack חיוני לdebug.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הבדל מהותי.",
        "❌ שניהם זריקה.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l15_throw_r_002",
      topicId: "topic_async",
      conceptKey: "lesson_15::throw",
      level: 7,
      question: "Custom Error class:",
      options: [
        "class ValidationError extends Error { ... } — שומר instanceof check",
        "אסור extends Error",
        "JS לא תומך",
        "TypeScript only"
      ],
      correctIndex: 0,
      explanation: "Custom errors allow specific catch handling.",
      optionFeedback: [
        "✅ נכון.",
        "❌ pattern רשמי.",
        "❌ ES6+ לגמרי.",
        "❌ JS native."
      ]
    },
    // ─── Error Object ───
    {
      id: "mc_l15_errobj_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Error Object",
      level: 5,
      question: "Error.message:",
      options: [
        "string description שניתן ב-constructor",
        "stack trace",
        "error code",
        "function"
      ],
      correctIndex: 0,
      explanation: "Constructor: new Error('description').",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה .stack.",
        "❌ אין code property native.",
        "❌ זו string."
      ]
    },
    {
      id: "mc_l15_errobj_r_002",
      topicId: "topic_async",
      conceptKey: "lesson_15::Error Object",
      level: 6,
      question: "Error.cause (ES2022):",
      options: [
        "throw new Error('outer', { cause: original }) — error chaining",
        "API חדש לbrowser",
        "TS only",
        "אסור"
      ],
      correctIndex: 0,
      explanation: "Standardized error chains.",
      optionFeedback: [
        "✅ נכון.",
        "❌ JS native.",
        "❌ runtime.",
        "❌ legitimate."
      ]
    },
    // ─── Closure ב-async ───
    {
      id: "mc_l15_closure_async_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Closure",
      level: 7,
      question: "closure ב-setTimeout שתופס loop var עם let:",
      options: [
        "כל iteration scope חדש — כל setTimeout רואה את ה-i שלו",
        "כולם רואים את ה-i האחרון",
        "syntax error",
        "דפוס אקראי"
      ],
      correctIndex: 0,
      explanation: "let block-scoped per iteration. var function-scoped (משותף).",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה var. let scope-per-iter.",
        "❌ syntax תקין.",
        "❌ דטרמיניסטי."
      ]
    },
    {
      id: "mc_l15_scope_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Scope",
      level: 6,
      question: "Lexical scope:",
      options: [
        "scope נקבע במיקום ההגדרה (compile-time), לא בקריאה",
        "scope דינמי בrun-time",
        "global בלבד",
        "function-only"
      ],
      correctIndex: 0,
      explanation: "JS וכמעט כל השפות המודרניות = lexical.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה dynamic scope (Bash, Perl).",
        "❌ JS תומך ב-block scope.",
        "❌ block + function."
      ]
    },
    // ─── Promise.all ───
    {
      id: "mc_l15_pall_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 7,
      question: "Promise.all([p1, p2, p3]):",
      options: [
        "Promise<[r1, r2, r3]> — fulfilled כשכולם הסתיימו, fail-fast",
        "Promise<r1>",
        "Promise<{first, second, third}>",
        "Promise<void>"
      ],
      correctIndex: 0,
      explanation: "מחזיר array של תוצאות באותו סדר.",
      optionFeedback: [
        "✅ נכון. preserves order.",
        "❌ array של 3.",
        "❌ זה לא object.",
        "❌ array, לא void."
      ]
    },
    {
      id: "mc_l15_pall_r_002",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 8,
      question: "Promise.all + 1 reject:",
      options: [
        "ה-Promise כולל נדחה מיידית. שאר ה-Promises ממשיכים אבל תוצאתם נזרקת",
        "ממתין לכולם",
        "ממיר ל-resolved",
        "throws sync"
      ],
      correctIndex: 0,
      explanation: "Fail-fast = behaviour של AND.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הוא לא ממתין.",
        "❌ rejection נשמרת.",
        "❌ async."
      ]
    },
    // ─── More fetch ───
    {
      id: "mc_l24_fetch_r_005",
      topicId: "topic_async",
      conceptKey: "lesson_24::fetch",
      level: 7,
      question: "Streaming response:",
      options: [
        "response.body.getReader() — לקרוא chunks",
        "fetch.stream()",
        "אסור streaming",
        "callback per chunk"
      ],
      correctIndex: 0,
      explanation: "ReadableStream ו-Reader API.",
      optionFeedback: [
        "✅ נכון.",
        "❌ אין כזה method.",
        "❌ legitimate.",
        "❌ Promise-based."
      ]
    },
    // ─── More try/catch ───
    {
      id: "mc_l15_finally_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::try",
      level: 6,
      question: "finally ב-try:",
      options: [
        "רץ תמיד — גם ב-success, גם ב-throw, גם ב-return",
        "רק אם error",
        "רק ב-success",
        "אסור עם catch"
      ],
      correctIndex: 0,
      explanation: "Cleanup חיוני — close connections, clear timers.",
      optionFeedback: [
        "✅ נכון.",
        "❌ תמיד רץ.",
        "❌ גם ב-success.",
        "❌ יחד שניהם."
      ]
    },
    {
      id: "mc_l15_finally_r_002",
      topicId: "topic_async",
      conceptKey: "lesson_15::try",
      level: 7,
      question: "finally ב-async function:",
      options: [
        "רץ אחרי await + תמיד אחרי try/catch — אפילו ב-rejection",
        "רק אם resolve",
        "Promise leak",
        "אסור"
      ],
      correctIndex: 0,
      explanation: "finally ב-async = cleanup async-aware.",
      optionFeedback: [
        "✅ נכון.",
        "❌ תמיד.",
        "❌ JS מטפל.",
        "❌ legitimate."
      ]
    },
    // ─── Concurrent vs Parallel ───
    {
      id: "mc_l15_concurrent_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Asynchronous",
      level: 8,
      question: "Concurrent vs parallel ב-JS:",
      options: [
        "Concurrent = הרבה משימות בthread אחד, מתחלפות. Parallel = thread-multiple",
        "אותו דבר",
        "JS תמיד parallel",
        "concurrent רק ב-Node"
      ],
      correctIndex: 0,
      explanation: "JS = single-thread → concurrent only. workers/cluster = parallel.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הבדל קריטי.",
        "❌ single-thread.",
        "❌ concurrent ב-browser."
      ]
    },
  ],
  fill: [
    {
      id: "fill_l15_promise_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 5,
      code: "const p = new Promise((resolve, ____) => {\n  if (success) resolve('OK');\n  else reject('FAIL');\n});",
      answer: "reject",
      explanation: "Promise constructor receives (resolve, reject)."
    },
    {
      id: "fill_l15_then_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::then",
      level: 6,
      code: "fetch('/api')\n  .____(r => r.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));",
      answer: "then",
      explanation: ".then handles fulfilled."
    },
    {
      id: "fill_l15_catchprom_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::catch (Promise)",
      level: 6,
      code: "fetch('/api')\n  .then(r => r.json())\n  .____(err => console.error(err));",
      answer: "catch",
      explanation: ".catch handles rejection."
    },
    {
      id: "fill_l15_async_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Asynchronous",
      level: 5,
      code: "____ function fetchData() {\n  const r = await fetch('/api');\n  return r.json();\n}",
      answer: "async",
      explanation: "async enables await inside."
    },
    {
      id: "fill_l15_await_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Asynchronous",
      level: 5,
      code: "async function load() {\n  const data = ____ fetch('/api');\n  return data.json();\n}",
      answer: "await",
      explanation: "await pauses for Promise."
    },
    {
      id: "fill_l15_pall_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 6,
      code: "const [a, b, c] = await Promise.____(\n  [fetchA(), fetchB(), fetchC()]\n);",
      answer: "all",
      explanation: "Promise.all returns array of results."
    },
    {
      id: "fill_l15_settimeout_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::setTimeout",
      level: 4,
      code: "____(() => console.log('1s later'), 1000);",
      answer: "setTimeout",
      explanation: "setTimeout schedules callback."
    },
    {
      id: "fill_l24_fetch_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_24::fetch",
      level: 5,
      code: "const res = await ____('/api/users');\nconst users = await res.json();",
      answer: "fetch",
      explanation: "fetch returns Promise<Response>."
    },
    {
      id: "fill_l15_try_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::try",
      level: 5,
      code: "____ {\n  await save();\n} catch (e) {\n  console.error(e);\n}",
      answer: "try",
      explanation: "try block wraps protected code."
    },
    {
      id: "fill_l15_throw_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::throw",
      level: 5,
      code: "if (!user) {\n  ____ new Error('Not found');\n}",
      answer: "throw",
      explanation: "throw raises an exception."
    },
    {
      id: "fill_l15_resolve_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::resolve",
      level: 5,
      code: "// Wrap value in already-fulfilled Promise\nconst p = Promise.____(42);",
      answer: "resolve",
      explanation: "Promise.resolve creates fulfilled Promise."
    },
    {
      id: "fill_l15_reject_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::reject",
      level: 6,
      code: "function deny() {\n  return Promise.____(new Error('Forbidden'));\n}",
      answer: "reject",
      explanation: "Promise.reject creates rejected Promise."
    },
    {
      id: "fill_l15_finally_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::try",
      level: 6,
      code: "try {\n  await save();\n} catch (e) {\n  log(e);\n} ____ {\n  setLoading(false);\n}",
      answer: "finally",
      explanation: "finally always runs."
    },
    {
      id: "fill_l24_fetch_post_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_24::fetch",
      level: 7,
      code: "fetch('/api', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.____(data)\n});",
      answer: "stringify",
      explanation: "JSON.stringify body for fetch."
    },
    {
      id: "fill_l15_closure_r_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Closure",
      level: 6,
      code: "for (let i = 0; i < 3; i++) {\n  ____(() => console.log(i), 0);\n}\n// 0, 1, 2",
      answer: "setTimeout",
      explanation: "let creates new scope per iteration."
    },
  ],
};
