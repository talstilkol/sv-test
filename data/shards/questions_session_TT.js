// Sprint 2 batch TT - Final cleanup + edge cases (rounding off)
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_TT = {
  mc: [
    { id: "mc_edge_arr_holes_tt_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 7,
      question: "מה הערך: const a = [,,,]; a.length",
      options: [
        "3 — trailing comma אחד מותר. holes הם elisions: a[0..2] = undefined sparse",
        "4",
        "0",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "Sparse arrays. forEach מדלג על holes (לא ב-undefined explicit).",
      optionFeedback: ["✅ נכון. 3 holes.","❌ trailing זמני.","❌ length=3.","❌ valid."]
    },
    { id: "mc_edge_arr_sparse_tt_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 7,
      question: "מה ההבדל בין [,,,] ל-[undefined, undefined, undefined]?",
      options: [
        "Sparse vs dense. forEach/map מדלגים על holes ([,,,]) אך לא על undefined explicit",
        "זהים",
        "[,,,] ארוך יותר",
        "[undefined, ...] sparse"
      ],
      correctIndex: 0,
      explanation: "Spread/Array.from ממירים holes ל-undefined. הבדל סובטילי.",
      optionFeedback: ["✅ נכון.","❌ שונים semantically.","❌ length זהה.","❌ הפוך."]
    },
    { id: "mc_edge_obj_proto_pollution_tt_001", topicId: "topic_security", conceptKey: "lesson_auth_security::XSS boundary", level: 9,
      question: "מה Prototype Pollution attack?",
      options: [
        "Attacker מזריק __proto__ → משפיע על Object.prototype → כל object באתר. הגנה: Object.create(null), JSON.parse safely, validation",
        "DOM injection",
        "SQL",
        "Performance"
      ],
      correctIndex: 0,
      explanation: "lodash, Express had CVEs. modern libraries מסננים.",
      optionFeedback: ["✅ נכון. critical.","❌ XSS שונה.","❌ DB.","❌ unrelated."]
    },
    { id: "mc_edge_iframe_sandbox_tt_001", topicId: "topic_security", conceptKey: "lesson_auth_security::secure cookie", level: 8,
      question: "מה <iframe sandbox> מאפשר?",
      options: [
        "מגביל יכולות של iframe: אין forms, scripts, popups by default. מוסיפים allow-* per need",
        "Mobile only",
        "Disables iframe",
        "Faster"
      ],
      correctIndex: 0,
      explanation: "Defense-in-depth להטמעת תוכן זר. עם sandbox=\"allow-scripts allow-same-origin\" — הכי לא בטוח.",
      optionFeedback: ["✅ נכון. capability restriction.","❌ unrelated.","❌ עובד עם limits.","❌ לא ביצועים."]
    },
    { id: "mc_edge_clickjacking_tt_001", topicId: "topic_security", conceptKey: "lesson_auth_security::CSRF", level: 8,
      question: "מה Clickjacking + הגנה?",
      options: [
        "Iframe shel האתר שלך מוטמן באתר זדוני, משתמש לוחץ על UI לא רואה. הגנה: X-Frame-Options: DENY או CSP frame-ancestors",
        "XSS",
        "CSRF",
        "DDoS"
      ],
      correctIndex: 0,
      explanation: "UI redress attack. Modern CSP frame-ancestors החליף X-Frame-Options.",
      optionFeedback: ["✅ נכון.","❌ pattern אחר.","❌ pattern אחר.","❌ availability."]
    },
    { id: "mc_edge_css_z_index_tt_001", topicId: "topic_css", conceptKey: "lesson_html_css_foundations::cascade and specificity", level: 7,
      question: "למה z-index לפעמים לא 'עובד'?",
      options: [
        "z-index אפקטיבי רק על elements עם position שונה מ-static. גם תלוי ב-stacking context (transform/opacity יוצרים חדש)",
        "Browser bug",
        "TypeScript",
        "Always works"
      ],
      correctIndex: 0,
      explanation: "Stacking context — מקור confusion. parent עם opacity<1 בולעת ילדים.",
      optionFeedback: ["✅ נכון. context.","❌ deterministic.","❌ unrelated.","❌ קיימת תלות."]
    },
    { id: "mc_edge_css_collapse_tt_001", topicId: "topic_css", conceptKey: "lesson_html_css_foundations::box model", level: 8,
      question: "מה margin collapse?",
      options: [
        "Vertical margins של block elements שכנים — ה-larger 'מנצח'. רק vertical, רק ב-block flow. לא ב-flex/grid",
        "Horizontal too",
        "Always sums",
        "Doesn't exist"
      ],
      correctIndex: 0,
      explanation: "Surprises חדשים. flex/grid מבטלים את הבעיה.",
      optionFeedback: ["✅ נכון.","❌ vertical only.","❌ collapse, לא sum.","❌ קיים."]
    },
    { id: "mc_edge_css_em_rem_tt_001", topicId: "topic_css", conceptKey: "lesson_html_css_foundations::box model", level: 7,
      question: "מה ההבדל בין em ל-rem?",
      options: [
        "em: יחסי לfont-size של ה-parent. rem: יחסי לroot (html). em compounds, rem stable",
        "זהים",
        "em pixels",
        "rem deprecated"
      ],
      correctIndex: 0,
      explanation: "rem עדיף ל-typography scale עקבי. em נוח ל-spacing local-context.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ relative units.","❌ standard."]
    },
    { id: "mc_edge_css_calc_tt_001", topicId: "topic_css", conceptKey: "lesson_html_css_foundations::box model", level: 7,
      question: "מה calc() ב-CSS מאפשר?",
      options: [
        "Math expressions עם units מעורבים: calc(100% - 20px). שימושי לdynamic sizing",
        "JS calculation",
        "Animation",
        "Variables"
      ],
      correctIndex: 0,
      explanation: "Native browser. אין צורך ב-JS לחישובים פשוטים.",
      optionFeedback: ["✅ נכון.","❌ pure CSS.","❌ unrelated.","❌ זה var(--x)."]
    },
    { id: "mc_edge_css_var_tt_001", topicId: "topic_css", conceptKey: "lesson_html_css_foundations::cascade and specificity", level: 7,
      question: "מה היתרון של CSS Custom Properties (variables)?",
      options: [
        "Cascade-aware (override בילד). dynamic ב-runtime (JS getProperty/setProperty). theme switching ללא bundler",
        "SASS replacement",
        "Static",
        "Browser-only"
      ],
      correctIndex: 0,
      explanation: ":root { --primary: blue }. element { color: var(--primary) }.",
      optionFeedback: ["✅ נכון.","❌ דומה אבל native.","❌ דווקא dynamic.","❌ עובד גם ב-Node CSS-in-JS."]
    },
    { id: "mc_edge_grid_auto_fit_tt_001", topicId: "topic_css", conceptKey: "lesson_html_css_foundations::box model", level: 8,
      question: "מה ההבדל בין auto-fit ל-auto-fill ב-Grid?",
      options: [
        "auto-fill: יוצר 'phantom' tracks ריקות לrow ארוך. auto-fit: collapse tracks ריקות → tracks קיימים מתפשטים",
        "זהים",
        "auto-fill modern",
        "auto-fit legacy"
      ],
      correctIndex: 0,
      explanation: "repeat(auto-fit, minmax(200px, 1fr)) — pattern נפוץ ל-responsive grid.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ שניהם valid.","❌ שניהם current."]
    },
    { id: "mc_edge_dom_node_types_tt_001", topicId: "topic_dom", conceptKey: "lesson_13::DOM", level: 7,
      question: "מה nodeType values עיקריים?",
      options: [
        "1: ELEMENT, 3: TEXT, 8: COMMENT, 9: DOCUMENT, 11: DOCUMENT_FRAGMENT",
        "Random",
        "Strings",
        "Boolean"
      ],
      correctIndex: 0,
      explanation: "node.nodeType. שימושי לbtraversal עם sub-types.",
      optionFeedback: ["✅ נכון.","❌ דטרמיניסטי.","❌ numbers.","❌ numbers."]
    },
    { id: "mc_edge_input_types_tt_001", topicId: "topic_html", conceptKey: "lesson_html_css_foundations::HTML form", level: 6,
      question: "מתי <input type=\"date\"> טוב?",
      options: [
        "Native date picker בדפדפן + accessibility built-in. limited styling. ל-UX richer: libraries (react-datepicker)",
        "Always",
        "Never",
        "Mobile only"
      ],
      correctIndex: 0,
      explanation: "iOS/Android מציגים native picker. styling minimal.",
      optionFeedback: ["✅ נכון. simple cases.","❌ depends.","❌ valid.","❌ desktop גם."]
    },
    { id: "mc_edge_form_action_tt_001", topicId: "topic_html", conceptKey: "lesson_html_css_foundations::HTML form", level: 6,
      question: "מה <form> default action?",
      options: [
        "Submit ל-current URL עם method=GET, query params מ-fields. דורש e.preventDefault() ב-JS apps",
        "Stays in place",
        "Logs",
        "Errors"
      ],
      correctIndex: 0,
      explanation: "ביטול חיוני ב-SPA. React/Vue forms תמיד preventDefault.",
      optionFeedback: ["✅ נכון.","❌ submits.","❌ unrelated.","❌ valid."]
    },
    { id: "mc_edge_websocket_tt_001", topicId: "topic_browser", conceptKey: "lesson_15::fetch", level: 8,
      question: "מתי WebSocket מתאים?",
      options: [
        "Bidirectional real-time (chat, games, collab). low latency. שונה מ-SSE (server→client only) ו-polling",
        "REST API",
        "File upload",
        "Static content"
      ],
      correctIndex: 0,
      explanation: "ws:// or wss:// (TLS). socket.io מספק fallback ל-polling.",
      optionFeedback: ["✅ נכון.","❌ עדיף REST.","❌ HTTP.","❌ HTTP cache."]
    },
    { id: "mc_edge_sse_tt_001", topicId: "topic_browser", conceptKey: "lesson_15::fetch", level: 8,
      question: "מתי SSE עדיף על WebSocket?",
      options: [
        "Server→client בלבד (notifications, live feed). HTTP-based, easier proxy/firewall. auto-reconnect built-in",
        "Bidirectional",
        "Same",
        "Slower"
      ],
      correctIndex: 0,
      explanation: "EventSource API. text/event-stream. lightweight.",
      optionFeedback: ["✅ נכון.","❌ unidirectional.","❌ שונים.","❌ comparable."]
    },
    { id: "mc_edge_intersection_tt_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 7,
      question: "למה IntersectionObserver עדיף על scroll listener?",
      options: [
        "Async, off-main-thread, batched. lazy load/infinite scroll/animations efficient. scroll listener רץ סינכרוני, יקר",
        "Same",
        "Scroll modern",
        "IO legacy"
      ],
      correctIndex: 0,
      explanation: "Browser optimizes IntersectionObserver. scroll requires raf throttle.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ הפוך.","❌ הפוך."]
    },
    { id: "mc_edge_resize_obs_tt_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 8,
      question: "מתי ResizeObserver?",
      options: [
        "אלמנט עצמו משתנה גודל (לא רק window). דוגמה: container query polyfill, responsive components per size",
        "Window only",
        "Same as scroll",
        "Always"
      ],
      correctIndex: 0,
      explanation: "Modern API. נטיב פותר problem של 'size-based' responsive בלי MutationObserver hacks.",
      optionFeedback: ["✅ נכון.","❌ זה window.onresize.","❌ unrelated.","❌ overuse."]
    },
    { id: "mc_edge_mutation_obs_tt_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 8,
      question: "מתי MutationObserver?",
      options: [
        "תופס DOM changes (children, attributes). שימושי ל-3rd party DOM, framework-less reactivity. דורש זהירות מ-loops",
        "Window resize",
        "Network",
        "Storage"
      ],
      correctIndex: 0,
      explanation: "Vue 1.x השתמש. modern frameworks מנהלים DOM ישירות.",
      optionFeedback: ["✅ נכון.","❌ זה ResizeObserver.","❌ unrelated.","❌ unrelated."]
    },
    { id: "mc_edge_promise_finally_tt_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 7,
      question: "מתי .finally() ב-Promise?",
      options: [
        "רץ אחרי settle (success או fail). שימוש: cleanup (loader.hide()). לא משנה את ה-value/error",
        "Replaces catch",
        "Synchronous",
        "Optional"
      ],
      correctIndex: 0,
      explanation: "finally(fn) מקבל no args. לא יכול לשנות resolved value.",
      optionFeedback: ["✅ נכון.","❌ catch + finally יכול.","❌ async.","❌ valid use case."]
    },
    { id: "mc_edge_async_iter_tt_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 8,
      question: "מתי async iterator?",
      options: [
        "Streams (chunked HTTP, file lines, paged API). for-await-of צורך אותם naturally",
        "Sync data",
        "Single value",
        "Promises only"
      ],
      correctIndex: 0,
      explanation: "Symbol.asyncIterator. Node streams support.",
      optionFeedback: ["✅ נכון.","❌ זה sync iterator.","❌ זה promise.","❌ broader."]
    },
    { id: "mc_edge_generator_tt_001", topicId: "topic_js", conceptKey: "lesson_11::function", level: 8,
      question: "מתי generator function*?",
      options: [
        "Lazy sequences (infinite, on-demand), state machines, custom iterables, coroutine patterns",
        "Async only",
        "Replace promise",
        "Inheritance"
      ],
      correctIndex: 0,
      explanation: "function* gen() { yield 1; yield 2; }. Redux-saga משתמש.",
      optionFeedback: ["✅ נכון.","❌ async generators קיימים.","❌ ל-async generator.","❌ unrelated."]
    },
    { id: "mc_edge_proxy_handler_tt_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 9,
      question: "מה Proxy traps נפוצים?",
      options: [
        "get(t, k), set(t, k, v), has(t, k), deleteProperty(t, k), apply(t, this, args), construct(t, args), ownKeys(t), getOwnPropertyDescriptor",
        "Just get",
        "DOM events",
        "Promise"
      ],
      correctIndex: 0,
      explanation: "13 traps total. MobX/Vue 3 reactivity מבוסס Proxy.",
      optionFeedback: ["✅ נכון.","❌ multiple.","❌ unrelated.","❌ unrelated."]
    },
    { id: "mc_edge_array_buffer_tt_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 9,
      question: "מתי ArrayBuffer / TypedArray?",
      options: [
        "Binary data (audio/video/network protocols/WebGL). fixed-length, performant. wrappers: Uint8Array, Float32Array, etc",
        "JSON",
        "Strings",
        "DOM"
      ],
      correctIndex: 0,
      explanation: "Low-level. WebSockets binary, Canvas, file uploads.",
      optionFeedback: ["✅ נכון.","❌ JSON שונה.","❌ שונה.","❌ unrelated."]
    },
    { id: "mc_edge_struct_clone_tt_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 8,
      question: "מה structuredClone יכול שאינו ב-JSON.parse(JSON.stringify)?",
      options: [
        "Date, Map, Set, RegExp, ArrayBuffer, circular refs, Blob, File. JSON trick fails on those",
        "Same",
        "Slower",
        "JSON only"
      ],
      correctIndex: 0,
      explanation: "structuredClone (Node 17+, all browsers). תמיכה רחבה.",
      optionFeedback: ["✅ נכון.","❌ שונה משמעותית.","❌ דומה.","❌ much more."]
    },
    { id: "mc_edge_well_known_sym_tt_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 9,
      question: "מה well-known Symbols?",
      options: [
        "Symbol.iterator, Symbol.asyncIterator, Symbol.toPrimitive, Symbol.hasInstance — מאפשרים customization של JS internals",
        "Random IDs",
        "ES5 only",
        "DOM events"
      ],
      correctIndex: 0,
      explanation: "Symbol.iterator → for-of. Symbol.toPrimitive → coercion. powerful.",
      optionFeedback: ["✅ נכון.","❌ purposeful.","❌ ES6+.","❌ unrelated."]
    },
    { id: "mc_edge_weakmap_tt_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 8,
      question: "מתי WeakMap?",
      options: [
        "Keys = objects (not primitives). entries מסולקים אוטומטית כשה-key garbage collected. שימושי למטא-data בלי leak",
        "Smaller than Map",
        "Faster",
        "Sorted"
      ],
      correctIndex: 0,
      explanation: "private fields על instances בלי leak. אין iteration.",
      optionFeedback: ["✅ נכון.","❌ שונה purpose.","❌ דומה speed.","❌ אינה sorted."]
    },
    { id: "mc_edge_finalization_tt_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 9,
      question: "מה FinalizationRegistry?",
      options: [
        "Cleanup callback כשobject מוסר ע\"י GC. שימוש מתקדם, לא חוקי לסמוך עליו לזמן אמת",
        "Promise.finally",
        "afterEach",
        "Decorator"
      ],
      correctIndex: 0,
      explanation: "ES2021. דקדוק: GC timing אינו דטרמיניסטי.",
      optionFeedback: ["✅ נכון.","❌ Promise feature.","❌ test feature.","❌ unrelated."]
    },
    { id: "mc_edge_atomics_tt_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 9,
      question: "מתי Atomics + SharedArrayBuffer?",
      options: [
        "Multi-threading עם Workers — shared memory + atomic operations. דורש COOP/COEP headers",
        "DOM",
        "REST",
        "Single thread"
      ],
      correctIndex: 0,
      explanation: "Spectre mitigation: דורש cross-origin isolation.",
      optionFeedback: ["✅ נכון. SAB use.","❌ unrelated.","❌ unrelated.","❌ הפוך."]
    },
    { id: "mc_edge_fetch_signal_tt_001", topicId: "topic_js", conceptKey: "lesson_15::fetch", level: 8,
      question: "איך לבטל fetch באמצע?",
      options: [
        "AbortController + signal: const c = new AbortController(); fetch(url, { signal: c.signal }); c.abort()",
        "fetch.cancel()",
        "clearTimeout",
        "Throw"
      ],
      correctIndex: 0,
      explanation: "AbortSignal API. תומך גם ב-other async APIs.",
      optionFeedback: ["✅ נכון.","❌ אין כזה.","❌ unrelated.","❌ לא יבטל מבחוץ."]
    },
    { id: "mc_edge_credentials_tt_001", topicId: "topic_js", conceptKey: "lesson_15::fetch", level: 8,
      question: "מה credentials ב-fetch?",
      options: [
        "'omit' (no cookies), 'same-origin' (default for relative), 'include' (cross-origin too — דורש server CORS allow-credentials)",
        "Auth token",
        "Required",
        "Cookie path"
      ],
      correctIndex: 0,
      explanation: "ב-fetch credentials default ='same-origin'. cross-origin: 'include' + server allow.",
      optionFeedback: ["✅ נכון.","❌ shorter than cookies.","❌ optional.","❌ scope לא path."]
    },
    { id: "mc_edge_cors_simple_tt_001", topicId: "topic_security", conceptKey: "lesson_auth_security::CORS", level: 8,
      question: "מתי CORS preflight (OPTIONS) NOT נשלח?",
      options: [
        "Simple request: GET/HEAD/POST + simple Content-Type (text/plain, multipart/form-data, application/x-www-form-urlencoded) + no custom headers",
        "Always sent",
        "Same-origin only",
        "Production"
      ],
      correctIndex: 0,
      explanation: "JSON content-type → preflight. headers like Authorization → preflight.",
      optionFeedback: ["✅ נכון.","❌ לא תמיד.","❌ same origin אין CORS.","❌ unrelated."]
    },
    { id: "mc_edge_pwa_manifest_tt_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 7,
      question: "מה web app manifest?",
      options: [
        "JSON file שמתאר את ה-PWA: name, icons, theme, display, start_url. מאפשר 'Install to home screen'",
        "TypeScript",
        "Service worker",
        "CSS"
      ],
      correctIndex: 0,
      explanation: "<link rel='manifest' href='/manifest.json'>. נדרש ל-PWA installable.",
      optionFeedback: ["✅ נכון.","❌ unrelated.","❌ שונה.","❌ unrelated."]
    },
    { id: "mc_edge_sw_lifecycle_tt_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 8,
      question: "מה Service Worker lifecycle?",
      options: [
        "register → install (cache assets) → activate (cleanup old) → idle/fetch handler. update: skipWaiting + clients.claim ל-immediate",
        "Single phase",
        "Synchronous",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Workbox מקל. lifecycle יוצר UX challenges (stale clients).",
      optionFeedback: ["✅ נכון.","❌ multiple.","❌ async.","❌ deterministic."]
    },
    { id: "mc_edge_idb_async_tt_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 8,
      question: "מה ההבדל בין IndexedDB ל-localStorage?",
      options: [
        "IDB: async, transactions, indexes, blob support, large quota (~50%-60% disk). localStorage: sync, string only, ~5-10MB",
        "Same",
        "IDB sync",
        "localStorage modern"
      ],
      correctIndex: 0,
      explanation: "ל-large datasets/queries: IDB. ל-key-value קטן: localStorage.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ async.","❌ same era."]
    }
  ],
  fill: [
    { id: "fill_edge_ab_signal_tt_001", topicId: "topic_js", conceptKey: "lesson_15::fetch", level: 8,
      code: "// Cancel fetch\nconst ctrl = new ____Controller();\nfetch(url, { signal: ctrl.signal });\nctrl.abort();",
      answer: "Abort",
      explanation: "AbortController + signal."
    },
    { id: "fill_edge_struct_clone_tt_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 7,
      code: "// Modern deep clone\nconst copy = ____(original);",
      answer: "structuredClone",
      explanation: "structuredClone is native + handles Date/Map/circular."
    },
    { id: "fill_edge_intersect_tt_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 7,
      code: "// Lazy load on visible\nconst io = new ____Observer((entries) => {\n  if (entries[0].isIntersecting) loadImage();\n});",
      answer: "Intersection",
      explanation: "IntersectionObserver = visibility API."
    },
    { id: "fill_edge_resize_tt_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 8,
      code: "// Watch element size\nconst ro = new ____Observer((entries) => {\n  // entries[0].contentRect\n});\nro.observe(el);",
      answer: "Resize",
      explanation: "ResizeObserver = element-level resize."
    },
    { id: "fill_edge_mutation_tt_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 8,
      code: "// Watch DOM changes\nconst mo = new ____Observer((muts) => {\n  // muts.forEach(...)\n});\nmo.observe(el, { childList: true });",
      answer: "Mutation",
      explanation: "MutationObserver = DOM tree changes."
    },
    { id: "fill_edge_promise_finally_tt_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 7,
      code: "// Cleanup regardless of outcome\nfetch(url)\n  .then(handle)\n  .catch(err)\n  .____(() => loader.hide());",
      answer: "finally",
      explanation: "finally runs after settle, doesn't change value."
    },
    { id: "fill_edge_for_await_tt_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 8,
      code: "// Async iteration\nfor ____ (const chunk of stream) {\n  process(chunk);\n}",
      answer: "await",
      explanation: "for-await-of consumes async iterables."
    },
    { id: "fill_edge_generator_tt_001", topicId: "topic_js", conceptKey: "lesson_11::function", level: 8,
      code: "// Generator with yield\nfunction* gen() {\n  ____ 1;\n  ____ 2;\n}",
      answer: "yield",
      explanation: "yield emits value, pauses generator."
    },
    { id: "fill_edge_proxy_set_tt_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 9,
      code: "// Reactive set trap\nnew Proxy(target, {\n  ____(t, k, v) {\n    t[k] = v;\n    notify(k, v);\n    return true;\n  }\n});",
      answer: "set",
      explanation: "set trap intercepts property assignment."
    },
    { id: "fill_edge_weakmap_tt_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 8,
      code: "// Side-table without leak\nconst meta = new ____Map();\nmeta.set(obj, { tag: 1 });\n// when obj GC'd, entry auto-removed",
      answer: "Weak",
      explanation: "WeakMap allows GC of unreferenced keys."
    },
    { id: "fill_edge_idb_open_tt_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 8,
      code: "// Open IndexedDB\nconst req = ____.open('myDB', 1);",
      answer: "indexedDB",
      explanation: "indexedDB.open creates/opens database."
    },
    { id: "fill_edge_z_index_tt_001", topicId: "topic_css", conceptKey: "lesson_html_css_foundations::cascade and specificity", level: 7,
      code: "/* z-index requires non-static position */\n.modal {\n  ____: fixed;\n  z-index: 1000;\n}",
      answer: "position",
      explanation: "z-index works only with position != static."
    },
    { id: "fill_edge_will_change_tt_001", topicId: "topic_css", conceptKey: "lesson_html_css_foundations::cascade and specificity", level: 8,
      code: "/* Promote to compositing layer */\n.animated {\n  ____-change: transform;\n}",
      answer: "will",
      explanation: "will-change hints browser to optimize."
    },
    { id: "fill_edge_calc_tt_001", topicId: "topic_css", conceptKey: "lesson_html_css_foundations::box model", level: 7,
      code: "/* CSS math */\n.col {\n  width: ____(100% - 40px);\n}",
      answer: "calc",
      explanation: "calc() supports math with mixed units."
    },
    { id: "fill_edge_grid_repeat_tt_001", topicId: "topic_css", conceptKey: "lesson_html_css_foundations::box model", level: 8,
      code: "/* Responsive grid */\n.grid {\n  display: grid;\n  grid-template-columns: ____(auto-fit, minmax(200px, 1fr));\n}",
      answer: "repeat",
      explanation: "repeat(auto-fit, minmax) = responsive grid."
    }
  ]
};
