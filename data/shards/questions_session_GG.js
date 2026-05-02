// Sprint 2 batch GG - Browser quirks + JS edge cases + coercion gotchas
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_GG = {
  mc: [
    { id: "mc_quirk_eq_gg_001", topicId: "topic_js", conceptKey: "lesson_15::Synchronous", level: 5,
      question: "מה התוצאה של [] == ![]?",
      options: [
        "true — שני הצדדים מומרים: ![] = false → 0; [] → '' → 0; 0==0 → true. דוגמת loose equality מטעה",
        "false",
        "TypeError",
        "undefined"
      ],
      correctIndex: 0,
      explanation: "ToBoolean([]) = true → ![] = false. left side: [] → primitive '' → 0. 0 == 0 = true.",
      optionFeedback: [
        "✅ נכון. coercion chain.",
        "❌ false לא ייחשב.",
        "❌ אין שגיאה.",
        "❌ ערכים סופיים."
      ]
    },
    { id: "mc_quirk_typeof_null_gg_001", topicId: "topic_js", conceptKey: "lesson_15::Synchronous", level: 5,
      question: "מה typeof null מחזיר?",
      options: [
        "'object' — באג היסטורי שלא תוקן לתאימות לאחור. השוואה: x === null במקום typeof",
        "'null'",
        "'undefined'",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "typeof null === 'object' (חוקי ב-ECMAScript). תיקון יישבור אתרים. השתמש === null.",
      optionFeedback: [
        "✅ נכון. legacy bug.",
        "❌ אין 'null' string return.",
        "❌ זה null לא undefined.",
        "❌ אין שגיאה."
      ]
    },
    { id: "mc_quirk_nan_gg_001", topicId: "topic_js", conceptKey: "lesson_15::Synchronous", level: 5,
      question: "מה NaN === NaN?",
      options: [
        "false — NaN לעולם לא שווה לאף דבר, גם לעצמו. בדיקה: Number.isNaN(x) או Object.is(x, NaN)",
        "true",
        "TypeError",
        "undefined"
      ],
      correctIndex: 0,
      explanation: "IEEE 754 spec. Number.isNaN ספציפי, isNaN ישן עם coercion (גוטחה).",
      optionFeedback: [
        "✅ נכון. ייחודי ל-NaN.",
        "❌ false חד-משמעית.",
        "❌ אין שגיאה.",
        "❌ ערך מוגדר."
      ]
    },
    { id: "mc_quirk_zero_gg_001", topicId: "topic_js", conceptKey: "lesson_15::Synchronous", level: 6,
      question: "מה 0 === -0 ו-Object.is(0, -0)?",
      options: [
        "0 === -0 → true (loose). Object.is(0, -0) → false (מבחין). שונה: 1/0 → Infinity, 1/-0 → -Infinity",
        "שניהם true",
        "שניהם false",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "Object.is עוקב SameValue, מבחין -0 מ-0 ו-NaN שווה לעצמו.",
      optionFeedback: [
        "✅ נכון. הבדל subtle.",
        "❌ Object.is מבחין.",
        "❌ === לא מבחין.",
        "❌ ערכים סופיים."
      ]
    },
    { id: "mc_quirk_hoisting_gg_001", topicId: "topic_js", conceptKey: "lesson_11::Hoisting", level: 5,
      question: "מה ההבדל בין hoisting של var, let, function?",
      options: [
        "function declarations מוצהרות+מאותחלות (callable מהשורה הראשונה). var declared (undefined). let/const ב-TDZ עד הצהרה",
        "כולם זהים",
        "אין hoisting",
        "רק function"
      ],
      correctIndex: 0,
      explanation: "Temporal Dead Zone: גישה ל-let לפני הצהרה זורקת ReferenceError. var → undefined.",
      optionFeedback: [
        "✅ נכון. שלוש סוגי hoisting.",
        "❌ שונים.",
        "❌ יש hoisting.",
        "❌ var גם מוקדם."
      ]
    },
    { id: "mc_quirk_var_loop_gg_001", topicId: "topic_js", conceptKey: "lesson_11::Hoisting", level: 7,
      question: "מה הפלט של: for(var i=0;i<3;i++) setTimeout(()=>console.log(i))?",
      options: [
        "3, 3, 3 — var function-scoped, כל ה-callbacks share אותו i. בסוף הלולאה i=3",
        "0, 1, 2",
        "undefined × 3",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "let במקום var → 0,1,2 כי let block-scoped (binding חדש בכל iteration).",
      optionFeedback: [
        "✅ נכון. var sharing.",
        "❌ זה עם let.",
        "❌ i מוגדר.",
        "❌ אין שגיאה."
      ]
    },
    { id: "mc_quirk_arr_to_str_gg_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      question: "מה [1,2,3] + [4,5,6]?",
      options: [
        "'1,2,34,5,6' — Array.toString = join(',') והמרה למחרוזת. + על strings = concat",
        "[1,2,3,4,5,6]",
        "[5,7,9]",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "+ trigger ToPrimitive על arrays → toString() → '1,2,3' + '4,5,6'. JS לא overload + ל-arrays.",
      optionFeedback: [
        "✅ נכון. concatenation.",
        "❌ צריך concat() או spread.",
        "❌ אין vector add.",
        "❌ אין שגיאה."
      ]
    },
    { id: "mc_quirk_obj_to_str_gg_001", topicId: "topic_js", conceptKey: "lesson_11::object", level: 5,
      question: "מה {} + {}?",
      options: [
        "תלוי context: בדפדפן בכלי console יכול להיות '[object Object][object Object]', ב-script נדרש סוגריים. גוטחה",
        "TypeError תמיד",
        "Object",
        "0"
      ],
      correctIndex: 0,
      explanation: "JS parses {} כ-block בתחילת statement. ({}) + ({}) → '[object Object][object Object]'.",
      optionFeedback: [
        "✅ נכון. context-dependent.",
        "❌ לא תמיד שגיאה.",
        "❌ זה string.",
        "❌ לא NaN/0."
      ]
    },
    { id: "mc_quirk_str_split_gg_001", topicId: "topic_js", conceptKey: "lesson_15::String Methods", level: 5,
      question: "מה ''.split('').length?",
      options: [
        "0 — מחרוזת ריקה לא מייצרת items. שונה מ-'a'.split('') = ['a']",
        "1",
        "undefined",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "split על empty string מחזיר []. ב-comparison: 'abc'.split('') = ['a','b','c'].",
      optionFeedback: [
        "✅ נכון. empty string edge.",
        "❌ לא 1.",
        "❌ array שמ-defined.",
        "❌ אין שגיאה."
      ]
    },
    { id: "mc_quirk_parse_int_gg_001", topicId: "topic_js", conceptKey: "lesson_15::String Methods", level: 6,
      question: "מה ['1','2','3'].map(parseInt) מחזיר?",
      options: [
        "[1, NaN, NaN] — parseInt(value, index, array). parseInt('1',0)=1, parseInt('2',1)=NaN (radix invalid), parseInt('3',2)=NaN",
        "[1,2,3]",
        "[NaN,NaN,NaN]",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "map מעביר 3 args. parseInt לוקח (str, radix). פתרון: .map(x=>parseInt(x,10)) או .map(Number).",
      optionFeedback: [
        "✅ נכון. arity mismatch.",
        "❌ לא map ישיר.",
        "❌ הראשון תקין.",
        "❌ אין שגיאה."
      ]
    },
    { id: "mc_quirk_math_min_gg_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      question: "מה Math.min() מחזיר ללא ארגומנטים?",
      options: [
        "Infinity — ערך התחלתי לקיפול min. Math.max() מחזיר -Infinity. שניהם identity לcomparison",
        "0",
        "NaN",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "ספציפיקציה: identity element. שימוש: Math.min(...arr) או Math.min.apply(null, arr).",
      optionFeedback: [
        "✅ נכון. identity element.",
        "❌ לא 0.",
        "❌ מספר.",
        "❌ אין שגיאה."
      ]
    },
    { id: "mc_quirk_arr_sort_gg_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      question: "מה [10, 1, 20, 2].sort() מחזיר?",
      options: [
        "[1, 10, 2, 20] — sort default lex (toString). תיקון: .sort((a,b)=>a-b) ל-numeric",
        "[1,2,10,20]",
        "[20,10,2,1]",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "default compare: stringifies + lex. '10' < '2' כי '1' < '2'. .sort((a,b)=>a-b) numeric.",
      optionFeedback: [
        "✅ נכון. lex sort.",
        "❌ דורש comparator.",
        "❌ צריך גם comparator.",
        "❌ אין שגיאה."
      ]
    },
    { id: "mc_quirk_array_includes_gg_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      question: "מה [NaN].includes(NaN) ו-[NaN].indexOf(NaN)?",
      options: [
        "includes → true (uses SameValueZero). indexOf → -1 (uses ===, NaN !== NaN). הבדל קריטי",
        "שניהם true",
        "שניהם -1/false",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "ES2016 includes נוסף בעיקר בגלל NaN. indexOf לא יוכל למצוא NaN לעולם.",
      optionFeedback: [
        "✅ נכון.",
        "❌ indexOf לא מוצא NaN.",
        "❌ includes כן.",
        "❌ אין שגיאה."
      ]
    },
    { id: "mc_quirk_for_in_arr_gg_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "למה לא משתמשים ב-for...in על arrays?",
      options: [
        "for...in עוברים על enumerable properties (כולל מ-prototype) ומחזיר string keys, לא מספרים. גם לא מובטח סדר",
        "מהיר מדי",
        "לא קיים",
        "רק node"
      ],
      correctIndex: 0,
      explanation: "for...of עדיף על arrays. for...in נועד ל-objects.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הפוך.",
        "❌ קיים.",
        "❌ עובד תמיד."
      ]
    },
    { id: "mc_quirk_proto_gg_001", topicId: "topic_js", conceptKey: "lesson_11::object", level: 7,
      question: "מה ההבדל בין __proto__ ל-prototype?",
      options: [
        "__proto__ הוא ה-internal prototype של instance. prototype הוא property של function constructor — ממנו נשאב __proto__",
        "זהים",
        "Both on instances",
        "Both on functions"
      ],
      correctIndex: 0,
      explanation: "function F(){}; const o = new F(); o.__proto__ === F.prototype. Object.getPrototypeOf(o) preferred.",
      optionFeedback: [
        "✅ נכון. internal vs constructor.",
        "❌ שונים.",
        "❌ prototype על constructor.",
        "❌ __proto__ על instances."
      ]
    },
    { id: "mc_quirk_this_arrow_gg_001", topicId: "topic_js", conceptKey: "lesson_11::function", level: 6,
      question: "למה arrow function לא מאפשר binding של this?",
      options: [
        "Arrow functions לוקחים את this מ-enclosing lexical scope. אין להם this משלהם, ו-bind/call/apply לא משפיעים",
        "באג",
        "Slower",
        "Sometimes"
      ],
      correctIndex: 0,
      explanation: "Arrow this נקבע בזמן יצירה. const f = ()=>this; f.call(other) → this = original.",
      optionFeedback: [
        "✅ נכון. lexical this.",
        "❌ דווקא designed.",
        "❌ דומה.",
        "❌ דטרמיניסטי."
      ]
    },
    { id: "mc_quirk_strict_gg_001", topicId: "topic_js", conceptKey: "lesson_15::Synchronous", level: 6,
      question: "מה 'use strict' משנה?",
      options: [
        "מונע hoisting של undeclared vars, this הוא undefined ב-functions לא-bound, throws ב-octal/duplicates, שינוי readonly",
        "מהירות",
        "Console output",
        "Module mode"
      ],
      correctIndex: 0,
      explanation: "ES modules אוטומטית strict. מונע bugs נפוצים, פותח optimizations.",
      optionFeedback: [
        "✅ נכון. tightening rules.",
        "❌ לא ביצועים.",
        "❌ console לא מושפע.",
        "❌ זה משהו אחר."
      ]
    },
    { id: "mc_quirk_proxy_gg_001", topicId: "topic_js", conceptKey: "lesson_11::object", level: 8,
      question: "מה Proxy מאפשר ב-JS?",
      options: [
        "מטא-תכנות: trap על get/set/has/delete/apply/construct — דוגמה: validation, logging, virtual props",
        "Caching",
        "DOM",
        "Promise"
      ],
      correctIndex: 0,
      explanation: "new Proxy(target, handler). MobX/Vue 3 reactivity built on Proxy. לא יכול לתפוס primitive ops.",
      optionFeedback: [
        "✅ נכון. meta-programming.",
        "❌ סוג שימוש.",
        "❌ DOM unrelated.",
        "❌ Promise unrelated."
      ]
    },
    { id: "mc_quirk_reflect_gg_001", topicId: "topic_js", conceptKey: "lesson_11::object", level: 8,
      question: "מה Reflect מספק?",
      options: [
        "API למטא-פעולות בצורת function calls: Reflect.get(o,k), Reflect.has, Reflect.construct — מקביל ל-Proxy traps",
        "Reflection metadata",
        "Decorators",
        "TypeScript"
      ],
      correctIndex: 0,
      explanation: "Reflect.get(o,'a') מקביל ל-o.a. שימוש עם Proxy: handler.get(t,k){ return Reflect.get(t,k) }.",
      optionFeedback: [
        "✅ נכון. meta-ops API.",
        "❌ אין metadata API native.",
        "❌ decorators stage 3 נפרד.",
        "❌ TS לא ידע על Reflect."
      ]
    },
    { id: "mc_quirk_symbol_gg_001", topicId: "topic_js", conceptKey: "lesson_11::object", level: 8,
      question: "מה Symbol ב-JS?",
      options: [
        "Primitive type — ייחודי לכל קריאה ל-Symbol(). שימושי ל-keys ייחודיים ב-object שלא יתנגשו",
        "String alias",
        "Number",
        "Class"
      ],
      correctIndex: 0,
      explanation: "Symbol('a') !== Symbol('a'). Symbol.iterator, Symbol.asyncIterator — well-known symbols.",
      optionFeedback: [
        "✅ נכון. unique primitive.",
        "❌ string different.",
        "❌ number different.",
        "❌ זה primitive לא class."
      ]
    },
    { id: "mc_quirk_iterator_gg_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 7,
      question: "מה הופך אובייקט ל-iterable?",
      options: [
        "המתודה [Symbol.iterator]() שמחזירה object עם next() שמחזיר {value, done}. for...of עובד על iterables",
        "method called next",
        "Array prototype",
        "iterable: true"
      ],
      correctIndex: 0,
      explanation: "Generators (function*) יוצרים iterable+iterator אוטומטית. Array/Map/Set built-in iterable.",
      optionFeedback: [
        "✅ נכון. iterator protocol.",
        "❌ רק next לא מספיק.",
        "❌ ירושה לא נדרשת.",
        "❌ אין flag כזה."
      ]
    },
    { id: "mc_quirk_generator_gg_001", topicId: "topic_js", conceptKey: "lesson_11::function", level: 8,
      question: "מה generator function (function*) ?",
      options: [
        "פונקציה שמחזירה iterator. yield מציג ערך ועוצר ביצוע עד next(). שימושי lazy sequences ו-coroutines",
        "Async only",
        "Promise",
        "Symbol"
      ],
      correctIndex: 0,
      explanation: "function* gen(){ yield 1; yield 2; }. לקזוז: const it = gen(); it.next().value === 1.",
      optionFeedback: [
        "✅ נכון. yield/iterator.",
        "❌ async generator שונה.",
        "❌ זה generator לא promise.",
        "❌ Symbol שונה."
      ]
    },
    { id: "mc_quirk_async_iter_gg_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 8,
      question: "מה for await...of עושה?",
      options: [
        "Iterates על async iterable — מחכה לכל value (Promise) לפני מעבר. עובד על async generators ו-streams",
        "Same as await Promise.all",
        "Just await",
        "Sync only"
      ],
      correctIndex: 0,
      explanation: "for await(const x of asyncGen()){...}. מתאים ל-streaming (chunked responses).",
      optionFeedback: [
        "✅ נכון. async sequence.",
        "❌ Promise.all parallel.",
        "❌ נדרש iterable.",
        "❌ אסינכרוני."
      ]
    },
    { id: "mc_quirk_promise_state_gg_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 6,
      question: "מה ה-states של Promise?",
      options: [
        "pending → fulfilled או rejected. אחרי settled לא ניתן לשנות. resolve(promise) ימתין",
        "running/done",
        "open/closed",
        "init/exec"
      ],
      correctIndex: 0,
      explanation: "settled = fulfilled או rejected. .then מחזיר Promise חדש.",
      optionFeedback: [
        "✅ נכון. spec terminology.",
        "❌ לא מדויק.",
        "❌ לא נכון.",
        "❌ לא קיים."
      ]
    },
    { id: "mc_quirk_then_chain_gg_001", topicId: "topic_js", conceptKey: "lesson_15::then", level: 7,
      question: "מה .then(fn) מחזיר אם fn זורק?",
      options: [
        "Promise rejected עם השגיאה — נתפסת ב-.catch הבא בשרשרת. שונה מ-throw ב-callback רגיל",
        "Throws sync",
        "Returns undefined",
        "Resolves null"
      ],
      correctIndex: 0,
      explanation: "Promise קולט throws והופך לrejection אוטומטית. שרשרת promise מבוססת על זה.",
      optionFeedback: [
        "✅ נכון. throw → reject.",
        "❌ לא sync throw.",
        "❌ לא undefined.",
        "❌ לא null."
      ]
    },
    { id: "mc_quirk_promise_unhandled_gg_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 7,
      question: "מה קורה ב-unhandledRejection?",
      options: [
        "Browser/Node מודיע unhandledrejection event. Node 15+ מסיים תהליך by default. דרוש לטפל ב-.catch או try/catch ב-async",
        "Silent",
        "Process continues normally",
        "Browser crashes"
      ],
      correctIndex: 0,
      explanation: "window.addEventListener('unhandledrejection', ...). Node: --unhandled-rejections flag.",
      optionFeedback: [
        "✅ נכון. event/exit.",
        "❌ לא נסתר.",
        "❌ בעייתי.",
        "❌ לא קריסה."
      ]
    },
    { id: "mc_quirk_microtask_gg_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 8,
      question: "מה queueMicrotask vs setTimeout(0)?",
      options: [
        "queueMicrotask נכנס ל-microtask queue (כמו Promise.then). setTimeout = macrotask, נדחה לאחר microtasks",
        "זהים",
        "queueMicrotask = setTimeout",
        "Both macrotasks"
      ],
      correctIndex: 0,
      explanation: "סדר exec: stack → microtasks (queueMicrotask, Promise.then) → render → macrotasks (setTimeout).",
      optionFeedback: [
        "✅ נכון. queue distinction.",
        "❌ שונים.",
        "❌ שונה.",
        "❌ שונים."
      ]
    },
    { id: "mc_quirk_postmessage_gg_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 8,
      question: "מה window.postMessage מאפשר?",
      options: [
        "Cross-origin communication בין windows/iframes — מעקפת SOP בצורה בטוחה. dispatch event 'message'",
        "DOM mutate",
        "Cookies",
        "Network"
      ],
      correctIndex: 0,
      explanation: "iframe.contentWindow.postMessage(data, targetOrigin). תמיד אמת event.origin.",
      optionFeedback: [
        "✅ נכון. structured cross-origin.",
        "❌ DOM שונה.",
        "❌ cookies שונה.",
        "❌ זה client-side."
      ]
    },
    { id: "mc_quirk_eventsource_gg_001", topicId: "topic_browser", conceptKey: "lesson_15::fetch", level: 8,
      question: "מה EventSource (SSE) ב-vs WebSocket?",
      options: [
        "SSE: server→client unidirectional, HTTP-based, auto-reconnect. WebSocket: bidirectional, נפרד protocol",
        "זהים",
        "SSE bidirectional",
        "WS unidirectional"
      ],
      correctIndex: 0,
      explanation: "SSE פשוט יותר, עובד על HTTP/2. WebSocket עדיף ל-chat/games/real-time bi-direction.",
      optionFeedback: [
        "✅ נכון.",
        "❌ שונים מהותית.",
        "❌ הפוך.",
        "❌ הפוך."
      ]
    },
    { id: "mc_quirk_history_api_gg_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 6,
      question: "מה History API מאפשר ב-SPA?",
      options: [
        "history.pushState/replaceState — שינוי URL בלי reload, עם state object. אחורה/קדימה מפעיל popstate event",
        "Cookies",
        "Storage",
        "WebSocket"
      ],
      correctIndex: 0,
      explanation: "React Router/Next.js client routing מבוסס על זה. window.addEventListener('popstate', ...).",
      optionFeedback: [
        "✅ נכון. SPA navigation.",
        "❌ cookies שונה.",
        "❌ storage שונה.",
        "❌ WS שונה."
      ]
    },
    { id: "mc_quirk_blob_gg_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 7,
      question: "מה Blob מאפשר?",
      options: [
        "Binary Large Object — ייצוג של data raw (image/PDF/text). עם URL.createObjectURL ניתן להציג ב-<img/iframe>",
        "Database",
        "JSON only",
        "Encryption"
      ],
      correctIndex: 0,
      explanation: "FileReader, fetch().then(r=>r.blob()), URL.createObjectURL. שימושי ל-downloads ו-uploads.",
      optionFeedback: [
        "✅ נכון. binary container.",
        "❌ לא DB.",
        "❌ כל סוג binary.",
        "❌ אין encryption."
      ]
    },
    { id: "mc_quirk_form_data_gg_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 6,
      question: "מתי FormData נחוץ?",
      options: [
        "Multipart upload (קבצים), שילוב text+binary, fetch עם Content-Type אוטומטי. אלטרנטיבה ל-x-www-form-urlencoded",
        "JSON",
        "GET",
        "Cookies"
      ],
      correctIndex: 0,
      explanation: "const fd = new FormData(); fd.append('file', input.files[0]); fetch('/upload', {body: fd}).",
      optionFeedback: [
        "✅ נכון. multipart.",
        "❌ JSON לא binary.",
        "❌ GET לא תומך body.",
        "❌ cookies שונה."
      ]
    },
    { id: "mc_quirk_url_search_gg_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 5,
      question: "מה URLSearchParams עוזר?",
      options: [
        "פירסור/בנייה של query strings בצורה safe: get/set/append/delete + URI encoding אוטומטי",
        "URL parsing only",
        "Cookies",
        "Headers"
      ],
      correctIndex: 0,
      explanation: "new URLSearchParams('a=1&b=2').get('a') === '1'. fetch('/?'+params).",
      optionFeedback: [
        "✅ נכון. query helper.",
        "❌ URL נפרד.",
        "❌ cookies API נפרד.",
        "❌ headers נפרד."
      ]
    },
    { id: "mc_quirk_clipboard_gg_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 7,
      question: "מה navigator.clipboard.writeText פותר על document.execCommand?",
      options: [
        "Promise-based, async, לא דורש focused selection, עובד עם permissions API. execCommand מיושן",
        "מהיר יותר",
        "פחות secure",
        "Sync"
      ],
      correctIndex: 0,
      explanation: "Clipboard API מודרני. execCommand('copy') deprecated. דורש HTTPS.",
      optionFeedback: [
        "✅ נכון. modern API.",
        "❌ זו לא הסיבה.",
        "❌ דווקא יותר secure.",
        "❌ async."
      ]
    },
    { id: "mc_quirk_visibility_gg_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 7,
      question: "מה document.visibilityState ו-visibilitychange event?",
      options: [
        "מודיע אם הטאב נראה ('visible') או נסתר ('hidden') — להשהות video/polling/timers כשהמשתמש לא רואה",
        "Window resized",
        "Scroll",
        "Focus"
      ],
      correctIndex: 0,
      explanation: "document.addEventListener('visibilitychange', ...). חוסך CPU/battery בטאבים ברקע.",
      optionFeedback: [
        "✅ נכון. visibility tracking.",
        "❌ resize שונה.",
        "❌ scroll שונה.",
        "❌ focus שונה."
      ]
    }
  ],
  fill: [
    { id: "fill_quirk_typeof_null_gg_001", topicId: "topic_js", conceptKey: "lesson_15::Synchronous", level: 5,
      code: "// Historic JS bug\ntypeof null === '____'",
      answer: "object",
      explanation: "typeof null returns 'object' (legacy bug)."
    },
    { id: "fill_quirk_nan_check_gg_001", topicId: "topic_js", conceptKey: "lesson_15::Synchronous", level: 5,
      code: "// Reliable NaN check\nif (Number.____(value)) {\n  console.log('it is NaN');\n}",
      answer: "isNaN",
      explanation: "Number.isNaN strict check (no coercion)."
    },
    { id: "fill_quirk_obj_is_gg_001", topicId: "topic_js", conceptKey: "lesson_11::object", level: 6,
      code: "// Distinguish 0 from -0\nObject.____(0, -0)  // false\nObject.____(NaN, NaN)  // true",
      answer: "is",
      explanation: "Object.is uses SameValue algorithm."
    },
    { id: "fill_quirk_array_includes_gg_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      code: "// Find NaN in array\n[1, NaN, 3].____(NaN)  // true (indexOf would return -1)",
      answer: "includes",
      explanation: "includes uses SameValueZero (handles NaN)."
    },
    { id: "fill_quirk_arr_sort_num_gg_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      code: "// Numeric sort\n[10, 1, 20, 2].sort((a, b) => a ____ b)\n// = [1, 2, 10, 20]",
      answer: "-",
      explanation: "(a-b) ascending; (b-a) descending."
    },
    { id: "fill_quirk_str_pad_gg_001", topicId: "topic_js", conceptKey: "lesson_15::String Methods", level: 5,
      code: "// Left-pad with zeros\n'5'.____Start(3, '0')  // '005'",
      answer: "pad",
      explanation: "padStart/padEnd ES2017."
    },
    { id: "fill_quirk_proto_gg_001", topicId: "topic_js", conceptKey: "lesson_11::object", level: 7,
      code: "// Get prototype safely\nObject.____(obj)  // returns __proto__",
      answer: "getPrototypeOf",
      explanation: "Object.getPrototypeOf preferred over __proto__."
    },
    { id: "fill_quirk_freeze_gg_001", topicId: "topic_js", conceptKey: "lesson_11::object", level: 6,
      code: "// Make object immutable (shallow)\nconst frozen = Object.____(original);\nfrozen.x = 5;  // throws in strict mode",
      answer: "freeze",
      explanation: "Object.freeze shallow immutability."
    },
    { id: "fill_quirk_seal_gg_001", topicId: "topic_js", conceptKey: "lesson_11::object", level: 7,
      code: "// Prevent property add/delete (but allow modify)\nObject.____(obj);",
      answer: "seal",
      explanation: "Object.seal: no add/delete; modify ok."
    },
    { id: "fill_quirk_symbol_gg_001", topicId: "topic_js", conceptKey: "lesson_11::object", level: 7,
      code: "// Unique key\nconst KEY = ____('myKey');\nobj[KEY] = 'value';",
      answer: "Symbol",
      explanation: "Symbol() creates unique primitive."
    },
    { id: "fill_quirk_url_params_gg_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 5,
      code: "// Build query string safely\nconst params = new URLSearch____('a=1&b=2');\nparams.get('a');  // '1'",
      answer: "Params",
      explanation: "URLSearchParams = query string helper."
    },
    { id: "fill_quirk_form_data_gg_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 6,
      code: "// File upload via fetch\nconst fd = new ____();\nfd.append('file', input.files[0]);\nfetch('/upload', { method: 'POST', body: fd });",
      answer: "FormData",
      explanation: "FormData = multipart/form-data builder."
    },
    { id: "fill_quirk_blob_gg_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 7,
      code: "// Show binary as image\nconst blob = await response.blob();\nconst url = ____.createObjectURL(blob);\nimg.src = url;",
      answer: "URL",
      explanation: "URL.createObjectURL for blob URL."
    },
    { id: "fill_quirk_clipboard_gg_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 7,
      code: "// Copy text to clipboard\nawait navigator.____.writeText('hello');",
      answer: "clipboard",
      explanation: "Clipboard API requires HTTPS."
    },
    { id: "fill_quirk_visibility_gg_001", topicId: "topic_browser", conceptKey: "lesson_13::DOM", level: 7,
      code: "// Pause polling when tab hidden\ndocument.addEventListener('____change', () => {\n  if (document.hidden) clearInterval(timer);\n});",
      answer: "visibility",
      explanation: "visibilitychange event = tab visibility tracking."
    }
  ]
};
