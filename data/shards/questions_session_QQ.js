// Sprint 2 batch QQ - Build-style: complete the function/code
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_QQ = {
  mc: [
    { id: "mc_build_compose_qq_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      question: "איך משלימים את pipe(f, g, h)(x) שיחזיר h(g(f(x)))?",
      options: [
        "(...fns) => x => fns.reduce((acc, fn) => fn(acc), x)",
        "(...fns) => fns.map(fn => fn(x))",
        "(...fns) => x => fns[0](x)",
        "() => null"
      ],
      correctIndex: 0,
      explanation: "reduce עם accumulator שרץ דרך כל הפונקציות. compose הפוך עם reduceRight.",
      optionFeedback: [
        "✅ נכון. left→right reduce.",
        "❌ map מחזיר array.",
        "❌ רק הראשונה.",
        "❌ לא משלים."
      ]
    },
    { id: "mc_build_curry_qq_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      question: "איך לכתוב curry(fn) generic ל-N args?",
      options: [
        "fn => function curried(...args) { return args.length >= fn.length ? fn(...args) : (...next) => curried(...args, ...next); }",
        "fn => () => fn()",
        "fn => fn",
        "fn => (...args) => fn(args)"
      ],
      correctIndex: 0,
      explanation: "Recursion על arity. fn.length = arity של הפונקציה המקורית.",
      optionFeedback: [
        "✅ נכון. recursive curry.",
        "❌ אין arity tracking.",
        "❌ זה identity.",
        "❌ args ב-array, לא spread."
      ]
    },
    { id: "mc_build_debounce_qq_001", topicId: "topic_js", conceptKey: "lesson_15::setTimeout", level: 6,
      question: "איך לכתוב debounce(fn, ms)?",
      options: [
        "(fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }",
        "(fn, ms) => fn",
        "(fn, ms) => () => setTimeout(fn, ms)",
        "(fn, ms) => setInterval(fn, ms)"
      ],
      correctIndex: 0,
      explanation: "Closure על timer. clearTimeout בכל call → רק אחרון רץ.",
      optionFeedback: [
        "✅ נכון. classic debounce.",
        "❌ identity.",
        "❌ אין dedup.",
        "❌ זה repeating timer."
      ]
    },
    { id: "mc_build_throttle_qq_001", topicId: "topic_js", conceptKey: "lesson_15::setTimeout", level: 7,
      question: "איך לכתוב throttle(fn, ms)?",
      options: [
        "(fn, ms) => { let last = 0; return (...a) => { const n = performance.now(); if (n - last >= ms) { last = n; fn(...a); } }; }",
        "(fn, ms) => fn",
        "(fn, ms) => debounce(fn, ms)",
        "(fn, ms) => () => fn()"
      ],
      correctIndex: 0,
      explanation: "Tracker last invocation. שונה מ-debounce: rate limit לעומת dedup.",
      optionFeedback: [
        "✅ נכון.",
        "❌ identity.",
        "❌ debounce שונה.",
        "❌ אין rate limit."
      ]
    },
    { id: "mc_build_unique_qq_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      question: "איך לבנות unique(arr) שמסיר duplicates?",
      options: [
        "arr => [...new Set(arr)]",
        "arr => arr.sort()",
        "arr => arr.map(x => x)",
        "arr => arr.length"
      ],
      correctIndex: 0,
      explanation: "Set dedupes. spread → array. ל-objects: לפי key, צריך filter+seen.",
      optionFeedback: [
        "✅ נכון.",
        "❌ ממיין, לא מסיר.",
        "❌ identity copy.",
        "❌ count, לא array."
      ]
    },
    { id: "mc_build_groupby_qq_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 7,
      question: "איך לבנות groupBy(arr, key)?",
      options: [
        "arr.reduce((m, v) => { (m[v[key]] ??= []).push(v); return m; }, {})",
        "arr.map(v => v[key])",
        "arr.filter(v => v[key])",
        "Object.assign({}, arr)"
      ],
      correctIndex: 0,
      explanation: "reduce בonate accumulator object. ?:= מאתחל אם undefined.",
      optionFeedback: [
        "✅ נכון. reduce groupBy.",
        "❌ רק keys.",
        "❌ filter.",
        "❌ array→object לא נכון."
      ]
    },
    { id: "mc_build_chunk_qq_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 7,
      question: "איך לבנות chunk(arr, size) שיחזיר arrays של size?",
      options: [
        "Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))",
        "arr.slice(0, size)",
        "arr.split(size)",
        "arr.reduce((a, b) => a + b)"
      ],
      correctIndex: 0,
      explanation: "Array.from עם length + mapper יוצר את ה-chunks. אלטרנטיבה: loop עם push.",
      optionFeedback: [
        "✅ נכון.",
        "❌ רק chunk הראשון.",
        "❌ split על strings.",
        "❌ reduce שונה."
      ]
    },
    { id: "mc_build_zip_qq_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 7,
      question: "איך לבנות zip(a, b) שיחזיר [[a[0],b[0]], [a[1],b[1]], ...]?",
      options: [
        "a.map((x, i) => [x, b[i]])",
        "a.concat(b)",
        "[...a, ...b]",
        "a.filter(b)"
      ],
      correctIndex: 0,
      explanation: "map עם index. ל-shortest length: a.slice(0, Math.min(a.length, b.length)).map(...).",
      optionFeedback: [
        "✅ נכון.",
        "❌ flat concat.",
        "❌ flat spread.",
        "❌ filter שונה."
      ]
    },
    { id: "mc_build_partition_qq_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 7,
      question: "איך לבנות partition(arr, pred) ש-מחזיר [matched, rest]?",
      options: [
        "arr.reduce(([m, r], v) => pred(v) ? [[...m, v], r] : [m, [...r, v]], [[], []])",
        "[arr.filter(pred), arr.filter(p => !pred(p))]",
        "arr.split(pred)",
        "arr.map(pred)"
      ],
      correctIndex: 0,
      explanation: "Single-pass reduce. Option B חוקי אבל 2 passes.",
      optionFeedback: [
        "✅ נכון. one pass.",
        "✅ גם תקין (לא optimal).",
        "❌ אין split על arrays.",
        "❌ map שונה."
      ]
    },
    { id: "mc_build_memo_qq_001", topicId: "topic_fp", conceptKey: "lesson_15::Closure", level: 7,
      question: "איך לבנות memoize(fn) פשוט?",
      options: [
        "fn => { const cache = new Map(); return (...args) => { const k = JSON.stringify(args); if (!cache.has(k)) cache.set(k, fn(...args)); return cache.get(k); }; }",
        "fn => fn",
        "fn => () => fn()",
        "fn => async () => fn()"
      ],
      correctIndex: 0,
      explanation: "JSON.stringify ל-key. ל-args מורכבים: עדיף serializer מותאם.",
      optionFeedback: [
        "✅ נכון.",
        "❌ identity.",
        "❌ אין memo.",
        "❌ async unrelated."
      ]
    },
    { id: "mc_build_deepclone_qq_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 7,
      question: "איך לבנות deepClone(obj) ב-modern JS?",
      options: [
        "structuredClone(obj) — native API, תומך Date/Map/Set/RegExp/circular refs. הוסף ל-Node 17+/browsers",
        "JSON.parse(JSON.stringify(obj))",
        "Object.assign({}, obj)",
        "[...obj]"
      ],
      correctIndex: 0,
      explanation: "structuredClone ≫ JSON trick (לא תומך Date/circular/Function).",
      optionFeedback: [
        "✅ נכון.",
        "❌ legacy, מוגבל.",
        "❌ shallow.",
        "❌ array spread שונה."
      ]
    },
    { id: "mc_build_eventemitter_qq_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 7,
      question: "איך לבנות EventEmitter פשוט?",
      options: [
        "class EE { constructor(){this.l={}} on(e,h){(this.l[e]??=[]).push(h)} emit(e,...a){this.l[e]?.forEach(h=>h(...a))} }",
        "class EE { emit() {} }",
        "class EE extends Array {}",
        "class EE { on(e,h){h()} }"
      ],
      correctIndex: 0,
      explanation: "Map of event-name → handlers array. emit מפעיל את כולם.",
      optionFeedback: [
        "✅ נכון. minimal EE.",
        "❌ חסר on.",
        "❌ unrelated.",
        "❌ מפעיל מיד, לא מאוחר."
      ]
    },
    { id: "mc_build_sleep_qq_001", topicId: "topic_js", conceptKey: "lesson_15::setTimeout", level: 6,
      question: "איך לבנות sleep(ms)?",
      options: [
        "ms => new Promise(resolve => setTimeout(resolve, ms))",
        "ms => setTimeout(() => {}, ms)",
        "ms => for(let i=0;i<ms;i++){}",
        "ms => performance.now() + ms"
      ],
      correctIndex: 0,
      explanation: "await sleep(1000) ימתין שנייה. busy loop חוסם UI.",
      optionFeedback: [
        "✅ נכון.",
        "❌ לא מחזיר Promise.",
        "❌ blocking + מהיר מדי.",
        "❌ רק arithmetic."
      ]
    },
    { id: "mc_build_retry_qq_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 8,
      question: "איך לבנות retry(fn, n) שמנסה עד N פעמים?",
      options: [
        "async (fn, n) => { for (let i=0; i<n; i++) try { return await fn(); } catch(e) { if(i===n-1) throw e; } }",
        "async (fn, n) => fn()",
        "(fn, n) => fn().catch(fn)",
        "(fn, n) => Array(n).fill(fn)"
      ],
      correctIndex: 0,
      explanation: "Loop עם try/catch. עם backoff: await sleep(2**i * 100) בין attempts.",
      optionFeedback: [
        "✅ נכון.",
        "❌ אין retry.",
        "❌ אחת בלבד.",
        "❌ אין execution."
      ]
    },
    { id: "mc_build_pick_qq_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 6,
      question: "איך לבנות pick(obj, keys)?",
      options: [
        "(obj, keys) => Object.fromEntries(keys.filter(k => k in obj).map(k => [k, obj[k]]))",
        "(obj, keys) => keys",
        "(obj, keys) => obj",
        "(obj, keys) => Object.assign({}, keys)"
      ],
      correctIndex: 0,
      explanation: "filter ל-existing keys, map ל-pairs, fromEntries ל-object.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה רק keys.",
        "❌ זה הinput.",
        "❌ keys לא תואם."
      ]
    },
    { id: "mc_build_omit_qq_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 6,
      question: "איך לבנות omit(obj, keys)?",
      options: [
        "(obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)))",
        "(obj, keys) => obj",
        "(obj, keys) => keys",
        "(obj, keys) => delete obj[keys]"
      ],
      correctIndex: 0,
      explanation: "Filter על entries. אופן non-mutating.",
      optionFeedback: [
        "✅ נכון.",
        "❌ identity.",
        "❌ זה keys.",
        "❌ mutates."
      ]
    },
    { id: "mc_build_invert_qq_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 7,
      question: "איך להפוך {key: value} ל-{value: key}?",
      options: [
        "Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]))",
        "Object.values(obj)",
        "Object.keys(obj)",
        "obj.reverse()"
      ],
      correctIndex: 0,
      explanation: "swap על pairs. אזהרה: duplicate values יחליפו אחד את השני.",
      optionFeedback: [
        "✅ נכון.",
        "❌ רק values.",
        "❌ רק keys.",
        "❌ אין reverse על object."
      ]
    },
    { id: "mc_build_flatten_qq_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 7,
      question: "איך לעשות flatten עמוק לarrays?",
      options: [
        "arr.flat(Infinity)",
        "arr.flat()",
        "arr.flat(0)",
        "arr.map(x => x)"
      ],
      correctIndex: 0,
      explanation: "flat(Infinity) רקורסיבי. flat() = depth 1.",
      optionFeedback: [
        "✅ נכון.",
        "❌ depth=1 בלבד.",
        "❌ depth=0 = no-op.",
        "❌ identity."
      ]
    },
    { id: "mc_build_range_qq_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "איך לבנות range(start, end)?",
      options: [
        "Array.from({ length: end - start }, (_, i) => start + i)",
        "[start, end]",
        "Array(end - start)",
        "[...Array(end)].slice(start)"
      ],
      correctIndex: 0,
      explanation: "Array.from עם mapper. אלטרנטיבה: [...Array(end-start).keys()].map(i=>i+start).",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה זוג ערכים.",
        "❌ array עם holes.",
        "❌ עובד אבל סבוך."
      ]
    },
    { id: "mc_build_sum_qq_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      question: "איך לסכום array של numbers?",
      options: [
        "arr.reduce((a, b) => a + b, 0)",
        "arr.length",
        "arr.map(x => x)",
        "arr.filter(x => x > 0)"
      ],
      correctIndex: 0,
      explanation: "reduce עם initial 0. אזהרה: arr ריק עם אין initial זורק.",
      optionFeedback: [
        "✅ נכון.",
        "❌ count.",
        "❌ identity.",
        "❌ filter שונה."
      ]
    },
    { id: "mc_build_max_obj_qq_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 7,
      question: "איך למצוא את ה-max ב-array של objects לפי field?",
      options: [
        "arr.reduce((max, x) => x.field > max.field ? x : max)",
        "Math.max(...arr)",
        "arr.sort()[0]",
        "arr.filter(x => x.field)"
      ],
      correctIndex: 0,
      explanation: "Math.max על objects = NaN. reduce עם comparator.",
      optionFeedback: [
        "✅ נכון.",
        "❌ NaN.",
        "❌ ממיין כל הarray.",
        "❌ filter שונה."
      ]
    },
    { id: "mc_build_count_qq_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "איך לספור frequencies ב-array?",
      options: [
        "arr.reduce((m, v) => { m[v] = (m[v] || 0) + 1; return m; }, {})",
        "arr.length",
        "new Set(arr).size",
        "arr.sort()"
      ],
      correctIndex: 0,
      explanation: "reduce ל-object/Map. arr.length = count כללי.",
      optionFeedback: [
        "✅ נכון.",
        "❌ סכום ולא frequency.",
        "❌ unique count.",
        "❌ sort שונה."
      ]
    },
    { id: "mc_build_first_n_qq_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      question: "איך לקחת n הראשונים?",
      options: [
        "arr.slice(0, n)",
        "arr.splice(0, n)",
        "arr.length = n",
        "arr.shift()"
      ],
      correctIndex: 0,
      explanation: "slice non-mutating. splice mutates ומחזיר removed items.",
      optionFeedback: [
        "✅ נכון.",
        "❌ mutates.",
        "❌ mutates.",
        "❌ מסיר 1."
      ]
    },
    { id: "mc_build_last_qq_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      question: "איך לקחת את האלמנט האחרון?",
      options: [
        "arr.at(-1)",
        "arr[arr.length - 1]",
        "arr.pop()",
        "Both A and B (arr.pop is mutating)"
      ],
      correctIndex: 3,
      explanation: "at(-1) ו-arr[arr.length-1] non-mutating. pop גם מחזיר אך מוציא.",
      optionFeedback: [
        "✅ ES2022 nice.",
        "✅ classic.",
        "❌ pop mutates.",
        "✅ נכון לחלוטין."
      ]
    },
    { id: "mc_build_includes_obj_qq_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 7,
      question: "איך לבדוק אם object קיים ב-array לפי id?",
      options: [
        "arr.some(x => x.id === id)",
        "arr.includes({id})",
        "arr === [{id}]",
        "arr.indexOf({id}) !== -1"
      ],
      correctIndex: 0,
      explanation: "includes/indexOf משתמשים ב-===. לא יזהו object literal חדש.",
      optionFeedback: [
        "✅ נכון.",
        "❌ object reference.",
        "❌ array compare.",
        "❌ object reference."
      ]
    },
    { id: "mc_build_async_seq_qq_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 8,
      question: "איך להריץ async fns ברצף (לא parallel)?",
      options: [
        "for (const fn of fns) await fn();",
        "Promise.all(fns.map(fn => fn()))",
        "fns.forEach(async fn => await fn())",
        "fns.map(async fn => fn())"
      ],
      correctIndex: 0,
      explanation: "for-await רץ sequentially. forEach לא ממתין. Promise.all parallel.",
      optionFeedback: [
        "✅ נכון.",
        "❌ parallel.",
        "❌ forEach לא await.",
        "❌ parallel + Promise[]."
      ]
    },
    { id: "mc_build_async_par_qq_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 7,
      question: "איך להריץ async fns ב-parallel ולחכות לכולם?",
      options: [
        "await Promise.all(fns.map(fn => fn()))",
        "fns.forEach(fn => fn())",
        "for (const fn of fns) await fn()",
        "fns.map(fn => fn())"
      ],
      correctIndex: 0,
      explanation: "Promise.all מחכה לכל ה-promises. fail-fast on reject.",
      optionFeedback: [
        "✅ נכון.",
        "❌ אין await.",
        "❌ sequential.",
        "❌ אין await."
      ]
    },
    { id: "mc_build_settled_qq_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 8,
      question: "איך להריץ promises במקבילי + להמתין לכולם גם אם חלק נכשלים?",
      options: [
        "await Promise.allSettled(promises)",
        "await Promise.all(promises)",
        "Promise.race(promises)",
        "promises.forEach(p => p)"
      ],
      correctIndex: 0,
      explanation: "allSettled מחזיר [{status, value/reason}, ...]. all rejects on first.",
      optionFeedback: [
        "✅ נכון.",
        "❌ all = fail-fast.",
        "❌ race = first only.",
        "❌ אין await."
      ]
    },
    { id: "mc_build_class_priv_qq_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 7,
      question: "איך לכתוב Counter עם counter פרטי?",
      options: [
        "class C { #n = 0; inc() { return ++this.#n; } }",
        "class C { let n = 0; inc() {} }",
        "class C { _n = 0; inc() { return ++this._n; } }",
        "function C() { let n = 0; this.inc = () => ++n; }"
      ],
      correctIndex: 0,
      explanation: "# = true private (ES2022). _n = convention only.",
      optionFeedback: [
        "✅ נכון.",
        "❌ syntax לא תקין.",
        "❌ convention, לא enforcement.",
        "✅ closure-based, גם תקין."
      ]
    },
    { id: "mc_build_singleton_qq_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 7,
      question: "איך לבנות Singleton ב-JS?",
      options: [
        "module export: export const instance = new Class(); — modules cached",
        "new ב-loop",
        "class with new",
        "Random"
      ],
      correctIndex: 0,
      explanation: "ESM modules cached. אין צורך ב-pattern מורכב.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הפוך.",
        "❌ multiple instances.",
        "❌ דטרמיניסטי."
      ]
    },
    { id: "mc_build_observable_qq_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 8,
      question: "איך לבנות Observable פשוט עם Proxy?",
      options: [
        "new Proxy(target, { set(t, k, v) { t[k] = v; notify(k, v); return true; } })",
        "Object.assign({}, target)",
        "JSON.parse(JSON.stringify(target))",
        "new Proxy(target, {})"
      ],
      correctIndex: 0,
      explanation: "set trap מתעד שינויים. MobX/Vue 3 reactivity מבוססים על זה.",
      optionFeedback: [
        "✅ נכון. Proxy + notify.",
        "❌ אין observation.",
        "❌ clone, לא observe.",
        "❌ pass-through Proxy."
      ]
    },
    { id: "mc_build_lru_qq_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 9,
      question: "איך לבנות LRU cache עם Map?",
      options: [
        "Map שומר insertion order. ב-get: delete + set (move to end). ב-set מעל size: delete first key (oldest)",
        "Array",
        "Set",
        "Object"
      ],
      correctIndex: 0,
      explanation: "Map.keys().next() = oldest. רישום מחדש = move-to-end pattern.",
      optionFeedback: [
        "✅ נכון.",
        "❌ Array delete O(n).",
        "❌ Set אין values.",
        "❌ Object אין insertion order מובטח."
      ]
    },
    { id: "mc_build_storage_qq_001", topicId: "topic_browser", conceptKey: "lesson_13::localStorage", level: 6,
      question: "איך לכתוב saveJson ו-loadJson ל-localStorage?",
      options: [
        "save: localStorage.setItem(k, JSON.stringify(v)); load: const r = localStorage.getItem(k); return r ? JSON.parse(r) : null",
        "save/load: localStorage.setItem/getItem direct",
        "save/load: cookie.set/get",
        "save: setItem only"
      ],
      correctIndex: 0,
      explanation: "Storage API = strings. JSON wrap ל-objects. null check ל-missing keys.",
      optionFeedback: [
        "✅ נכון.",
        "❌ object→[object Object].",
        "❌ cookies שונה.",
        "❌ אין load."
      ]
    },
    { id: "mc_build_fetch_json_qq_001", topicId: "topic_js", conceptKey: "lesson_15::fetch", level: 6,
      question: "איך לעטוף fetch ב-helper שמחזיר JSON עם error handling?",
      options: [
        "async (url) => { const r = await fetch(url); if(!r.ok) throw new Error(r.statusText); return r.json(); }",
        "async (url) => fetch(url).json()",
        "(url) => fetch(url)",
        "(url) => JSON.parse(url)"
      ],
      correctIndex: 0,
      explanation: "r.ok = false ל-4xx/5xx. fetch לא זורק ב-non-2xx by default.",
      optionFeedback: [
        "✅ נכון.",
        "❌ אין await.",
        "❌ אין error.",
        "❌ url ≠ JSON."
      ]
    }
  ],
  fill: [
    { id: "fill_build_compose_qq_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      code: "// Pipe: data flows left → right\nconst pipe = (...fns) => x =>\n  fns.____((acc, fn) => fn(acc), x);",
      answer: "reduce",
      explanation: "reduce applies functions in order."
    },
    { id: "fill_build_debounce_qq_001", topicId: "topic_js", conceptKey: "lesson_15::setTimeout", level: 6,
      code: "// Debounce: only run after silence\nfunction debounce(fn, ms) {\n  let t;\n  return (...args) => {\n    ____(t);\n    t = setTimeout(() => fn(...args), ms);\n  };\n}",
      answer: "clearTimeout",
      explanation: "Reset timer on each call."
    },
    { id: "fill_build_unique_qq_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 5,
      code: "// Dedupe array\nconst unique = [...new ____(arr)];",
      answer: "Set",
      explanation: "Set removes duplicates."
    },
    { id: "fill_build_clone_qq_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 7,
      code: "// Modern deep clone\nconst copy = ____Clone(original);",
      answer: "structured",
      explanation: "structuredClone is native deep clone."
    },
    { id: "fill_build_sleep_qq_001", topicId: "topic_js", conceptKey: "lesson_15::setTimeout", level: 6,
      code: "// Async sleep\nconst sleep = ms => new ____(r => setTimeout(r, ms));",
      answer: "Promise",
      explanation: "Promise wraps setTimeout."
    },
    { id: "fill_build_range_qq_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      code: "// Build [start, ..., end-1]\nconst range = (start, end) =>\n  Array.____(\n    { length: end - start },\n    (_, i) => start + i\n  );",
      answer: "from",
      explanation: "Array.from with mapper."
    },
    { id: "fill_build_groupby_qq_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 7,
      code: "// groupBy\nconst groupBy = (arr, key) =>\n  arr.____((m, v) => {\n    (m[v[key]] ??= []).push(v);\n    return m;\n  }, {});",
      answer: "reduce",
      explanation: "reduce builds grouped object."
    },
    { id: "fill_build_partition_qq_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 7,
      code: "// Split into [matched, rest]\nconst partition = (arr, pred) =>\n  arr.reduce(([m, r], v) =>\n    ____(v) ? [[...m, v], r] : [m, [...r, v]],\n    [[], []]\n  );",
      answer: "pred",
      explanation: "Predicate decides split."
    },
    { id: "fill_build_pick_qq_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 6,
      code: "// Pick subset of keys\nconst pick = (obj, keys) =>\n  Object.____(keys.map(k => [k, obj[k]]));",
      answer: "fromEntries",
      explanation: "fromEntries builds object from pairs."
    },
    { id: "fill_build_invert_qq_001", topicId: "topic_js", conceptKey: "lesson_19::object", level: 7,
      code: "// Swap keys ↔ values\nconst invert = obj =>\n  Object.fromEntries(\n    Object.____(obj).map(([k, v]) => [v, k])\n  );",
      answer: "entries",
      explanation: "entries → swap → fromEntries."
    },
    { id: "fill_build_chunk_qq_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 7,
      code: "// Chunk array into size-N groups\nconst chunk = (arr, size) =>\n  Array.from({ length: Math.____(arr.length / size) },\n    (_, i) => arr.slice(i * size, (i + 1) * size));",
      answer: "ceil",
      explanation: "ceil rounds up for partial last chunk."
    },
    { id: "fill_build_zip_qq_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 7,
      code: "// Zip two arrays\nconst zip = (a, b) =>\n  a.____((x, i) => [x, b[i]]);",
      answer: "map",
      explanation: "map with index pairs elements."
    },
    { id: "fill_build_async_seq_qq_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 7,
      code: "// Run async fns sequentially\nfor (const fn of fns) {\n  ____ fn();\n}",
      answer: "await",
      explanation: "await inside for awaits each."
    },
    { id: "fill_build_promise_all_qq_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 7,
      code: "// Run promises in parallel\nconst results = await Promise.____([p1, p2, p3]);",
      answer: "all",
      explanation: "Promise.all runs in parallel, fails fast."
    },
    { id: "fill_build_fetch_helper_qq_001", topicId: "topic_js", conceptKey: "lesson_15::fetch", level: 7,
      code: "// Fetch wrapper with error\nasync function fetchJson(url) {\n  const r = await fetch(url);\n  if (!r.____) throw new Error(r.statusText);\n  return r.json();\n}",
      answer: "ok",
      explanation: "r.ok true for 2xx status."
    }
  ]
};
