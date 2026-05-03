// Sprint 2 batch II - Functional programming patterns
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_II = {
  mc: [
    { id: "mc_fp_pure_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 5,
      question: "מה pure function?",
      options: [
        "פונקציה שתלויה רק ב-inputs ולא יוצרת side effects (אין mutate, אין I/O, אין random) — אותו input → אותו output",
        "Function that's small",
        "Async function",
        "Arrow function"
      ],
      correctIndex: 0,
      explanation: "(a,b)=>a+b pure. fetch/console.log/random calls — לא pure. testable, memoizable.",
      optionFeedback: [
        "✅ נכון. determinism + no SE.",
        "❌ size לא קשור.",
        "❌ async יכול לא להיות pure.",
        "❌ arrow syntax בלבד."
      ]
    },
    { id: "mc_fp_immutable_ii_001", topicId: "topic_fp", conceptKey: "lesson_22::immutable", level: 5,
      question: "למה immutability חשוב ב-React?",
      options: [
        "React עוקב אחרי שינויים על-ידי reference comparison — מוטציה ב-state לא תזהה change ולא תרענד",
        "מהירות",
        "Memory",
        "Bundle size"
      ],
      correctIndex: 0,
      explanation: "setState(arr.push(x)) שובר. setState([...arr, x]) עובד.",
      optionFeedback: [
        "✅ נכון. ref equality.",
        "❌ זה לא הסיבה הראשונה.",
        "❌ דווקא יכול להיות יותר memory.",
        "❌ לא קשור."
      ]
    },
    { id: "mc_fp_higher_order_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 6,
      question: "מה higher-order function?",
      options: [
        "פונקציה שמקבלת/מחזירה פונקציה אחרת. דוגמאות: map, filter, reduce, debounce, useEffect callback",
        "Recursive",
        "Async",
        "Pure"
      ],
      correctIndex: 0,
      explanation: "ב-FP יסוד. ב-JS: arr.map(x=>x*2). f(g) where g is function. f returns function.",
      optionFeedback: [
        "✅ נכון. function as data.",
        "❌ recursion שונה.",
        "❌ async שונה.",
        "❌ pure שונה."
      ]
    },
    { id: "mc_fp_curry_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      question: "מה currying?",
      options: [
        "המרת פונקציה רב-ארגומנטית לשרשרת פונקציות חד-ארגומנטיות: (a,b,c)=>... → (a)=>(b)=>(c)=>...",
        "Composition",
        "Memoization",
        "Recursion"
      ],
      correctIndex: 0,
      explanation: "const add = a => b => a + b; add(2)(3) === 5. שימושי לpartial application.",
      optionFeedback: [
        "✅ נכון. arity reduction.",
        "❌ composition שונה.",
        "❌ memo שונה.",
        "❌ recursion שונה."
      ]
    },
    { id: "mc_fp_partial_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      question: "מה partial application?",
      options: [
        "לקבע חלק מהארגומנטים מראש ולקבל פונקציה שמצפה לשאר. דומה ל-curry אך לא מחייב חד-ארגומנטיות",
        "Bind",
        "Curry",
        "Compose"
      ],
      correctIndex: 0,
      explanation: "const add5 = add.bind(null, 5). f.bind = partial. shortcut: const greet = name => `Hi ${name}`.",
      optionFeedback: [
        "✅ נכון. fix some args.",
        "❌ bind = פעולה ספציפית של partial.",
        "❌ curry יותר נוקשה.",
        "❌ compose שונה."
      ]
    },
    { id: "mc_fp_compose_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      question: "מה function composition?",
      options: [
        "compose(f, g)(x) = f(g(x)) — חיבור פונקציות מימין לשמאל. עזר לבניית pipelines",
        "OOP inheritance",
        "Spread",
        "Async"
      ],
      correctIndex: 0,
      explanation: "compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x). בRamda/lodash/fp.",
      optionFeedback: [
        "✅ נכון. f ∘ g.",
        "❌ inheritance שונה.",
        "❌ spread שונה.",
        "❌ async שונה."
      ]
    },
    { id: "mc_fp_pipe_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      question: "מה ההבדל בין compose ל-pipe?",
      options: [
        "pipe מימין לשמאל (טבעי לקריאה): pipe(f, g)(x) = g(f(x)). compose הפוך: compose(f, g)(x) = f(g(x))",
        "זהים",
        "compose async",
        "pipe sync"
      ],
      correctIndex: 0,
      explanation: "Lodash/fp ו-Ramda מציעים שניהם. pipe נוח ל-data → step1 → step2 → step3.",
      optionFeedback: [
        "✅ נכון. order of execution.",
        "❌ שונים.",
        "❌ אין הבדל async.",
        "❌ שניהם sync."
      ]
    },
    { id: "mc_fp_reduce_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 6,
      question: "מה reduce עושה ב-FP terms?",
      options: [
        "Catamorphism — קיפול of a list לערך יחיד באמצעות accumulator + binary function. בסיס לbuild map/filter",
        "Iteration",
        "Sort",
        "Map"
      ],
      correctIndex: 0,
      explanation: "reduce הוא הכי general. map = reduce עם push. filter = reduce conditional.",
      optionFeedback: [
        "✅ נכון. fold/catamorphism.",
        "❌ iteration גנרי.",
        "❌ sort שונה.",
        "❌ map הוא special case."
      ]
    },
    { id: "mc_fp_filter_map_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 5,
      question: "למה .filter().map() נחשב anti-pattern בbig data?",
      options: [
        "שני מעברים על הarray (O(2n)). אלטרנטיבה: reduce שמסנן+ממיר במעבר אחד O(n)",
        "מהיר יותר",
        "API",
        "Bundle"
      ],
      correctIndex: 0,
      explanation: "ל-arrays קטנים זניח. ל-millions: בעיה. .reduce(...) או .flatMap(...).",
      optionFeedback: [
        "✅ נכון. two-pass.",
        "❌ דווקא איטי יותר.",
        "❌ זה JS native.",
        "❌ לא קשור."
      ]
    },
    { id: "mc_fp_lodash_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 6,
      question: "מה lodash מציע על native array methods?",
      options: [
        "Helpers נוספים (groupBy, chunk, debounce, get, cloneDeep), ו-chaining lazy. אך bundle גדול אם לא tree-shake",
        "מהיר יותר",
        "TS only",
        "ES5 only"
      ],
      correctIndex: 0,
      explanation: "lodash-es לtree shake. ב-modern JS חלק מהפיצ'רים native. _.cloneDeep עדיין שימושי.",
      optionFeedback: [
        "✅ נכון. utilities + chain.",
        "❌ דומה ל-native.",
        "❌ JS גם.",
        "❌ ES6+."
      ]
    },
    { id: "mc_fp_ramda_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 7,
      question: "מה ההבדל בין Ramda ל-lodash?",
      options: [
        "Ramda הכל curried by default + data-last (R.map(fn, list)). lodash data-first. Ramda מתאים יותר ל-FP-style composition",
        "זהים",
        "Lodash FP",
        "Ramda OOP"
      ],
      correctIndex: 0,
      explanation: "lodash/fp מספק גם curry/data-last. Ramda 'נקי' יותר ל-FP.",
      optionFeedback: [
        "✅ נכון. style differences.",
        "❌ שונים.",
        "❌ קיים variant.",
        "❌ FP."
      ]
    },
    { id: "mc_fp_immer_ii_001", topicId: "topic_fp", conceptKey: "lesson_22::immutable", level: 7,
      question: "מה Immer פותר?",
      options: [
        "כתיבת mutable-style code שיוצר immutable copies — produce(state, draft => { draft.x = 5 }) מחזיר state חדש",
        "Mutates state",
        "Slower",
        "TypeScript"
      ],
      correctIndex: 0,
      explanation: "Proxy-based. נפוץ ב-Redux Toolkit. נקי משמעותית מ-spread עמוק.",
      optionFeedback: [
        "✅ נכון. immutable from mutable code.",
        "❌ דווקא immutable result.",
        "❌ דומה.",
        "❌ עובד גם ב-JS."
      ]
    },
    { id: "mc_fp_immutable_struct_ii_001", topicId: "topic_fp", conceptKey: "lesson_22::immutable", level: 8,
      question: "מה Immutable.js מציע?",
      options: [
        "Persistent data structures — Map/List/Set שכל פעולה מחזירה מבנה חדש עם structural sharing. יעיל ב-large data",
        "Same as plain JS",
        "Smaller",
        "Mutable"
      ],
      correctIndex: 0,
      explanation: "Hash array mapped tries. אך יורד בשימוש כי Immer + native ES6 הוו פתרון פשוט יותר.",
      optionFeedback: [
        "✅ נכון. persistent DS.",
        "❌ structurally optimized.",
        "❌ overhead למבנים.",
        "❌ הפוך."
      ]
    },
    { id: "mc_fp_destructure_ii_001", topicId: "topic_fp", conceptKey: "lesson_19::destructuring", level: 5,
      question: "מה destructuring מאפשר?",
      options: [
        "חילוץ values מ-object/array למשתנים: const {a, b} = obj. תמיכה ב-defaults, rename, nested, rest",
        "Mutate",
        "Type",
        "Async"
      ],
      correctIndex: 0,
      explanation: "const { a: x = 1, ...rest } = obj. function f({ a, b }) {...}.",
      optionFeedback: [
        "✅ נכון.",
        "❌ לא mutate.",
        "❌ זה syntax לא types.",
        "❌ לא async."
      ]
    },
    { id: "mc_fp_spread_ii_001", topicId: "topic_fp", conceptKey: "lesson_19::destructuring", level: 5,
      question: "מה spread מאפשר?",
      options: [
        "פיזור פריטים מ-iterable: [...arr], {...obj}, fn(...args). שימושי ל-clone/merge/concat",
        "Type def",
        "Async",
        "Iterator only"
      ],
      correctIndex: 0,
      explanation: "[...a, ...b] = concat. {...a, ...b} = merge (later wins). f(...args) = call with array.",
      optionFeedback: [
        "✅ נכון.",
        "❌ סינטקס.",
        "❌ sync.",
        "❌ עובד על arrays/objects."
      ]
    },
    { id: "mc_fp_rest_ii_001", topicId: "topic_fp", conceptKey: "lesson_19::destructuring", level: 5,
      question: "מה ההבדל בין spread ל-rest?",
      options: [
        "Spread באמצעי שימוש (פיזור): const a = [...b]. Rest בקבלה (אגרגציה): const [first, ...rest] = arr",
        "זהים",
        "Spread async",
        "Rest sync"
      ],
      correctIndex: 0,
      explanation: "אותה syntax (...) שונה לפי context. function f(...args) — args is array.",
      optionFeedback: [
        "✅ נכון. context.",
        "❌ שונים.",
        "❌ דומים.",
        "❌ דומים."
      ]
    },
    { id: "mc_fp_iife_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      question: "מה IIFE?",
      options: [
        "(function(){})() — Immediately Invoked Function Expression. נפוץ ב-pre-ES6 ל-modules ו-private scope",
        "Async pattern",
        "Recursion",
        "Generator"
      ],
      correctIndex: 0,
      explanation: "ES6 modules החליפו רוב השימושים. עדיין שימושי לסקופ פרטי וtop-level await.",
      optionFeedback: [
        "✅ נכון. IIFE pattern.",
        "❌ async שונה.",
        "❌ recursion שונה.",
        "❌ generator שונה."
      ]
    },
    { id: "mc_fp_closure_ii_001", topicId: "topic_fp", conceptKey: "lesson_15::Closure", level: 7,
      question: "מה closure מאפשר ב-FP?",
      options: [
        "Encapsulation של state פרטי, factory functions, currying, memoization — function זוכר scope שלו גם אחרי החזרה",
        "Class only",
        "Async only",
        "Memory leak"
      ],
      correctIndex: 0,
      explanation: "function counter() { let n=0; return ()=>++n; } — n פרטי, נשמר בין קריאות.",
      optionFeedback: [
        "✅ נכון. private state.",
        "❌ closures predate classes.",
        "❌ sync גם.",
        "❌ leak רק במקרים מסוימים."
      ]
    },
    { id: "mc_fp_lazy_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 8,
      question: "מה lazy evaluation?",
      options: [
        "חישוב on-demand במקום מראש — generators, JS streams, infinite sequences. חוסך זיכרון/זמן",
        "Sync",
        "Eager",
        "Caching"
      ],
      correctIndex: 0,
      explanation: "function* nat(){ let n=1; while(true) yield n++; } — אינסופי, lazy.",
      optionFeedback: [
        "✅ נכון. defer evaluation.",
        "❌ sync לא קשור.",
        "❌ eager הפוך.",
        "❌ cache שונה."
      ]
    },
    { id: "mc_fp_eager_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      question: "מה eager evaluation?",
      options: [
        "חישוב מיידי של הביטויים — JS native arr.map() eager: יוצר array שלם. שונה מ-Java Stream lazy",
        "Lazy",
        "Async",
        "Cached"
      ],
      correctIndex: 0,
      explanation: "JS arr.filter().map() = שני arrays חדשים. lazy: chain ב-generator.",
      optionFeedback: [
        "✅ נכון. immediate.",
        "❌ הפוך.",
        "❌ async שונה.",
        "❌ cache שונה."
      ]
    },
    { id: "mc_fp_first_class_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 6,
      question: "מה 'first-class functions' ב-JS?",
      options: [
        "Functions הם values: ניתן לאחסן ב-var, להעביר כ-args, להחזיר מ-fns. בסיס ל-callbacks ול-FP",
        "Class only",
        "Static",
        "Method"
      ],
      correctIndex: 0,
      explanation: "const f = x => x*2; setTimeout(f, 100); arr.map(f); — function as value.",
      optionFeedback: [
        "✅ נכון. functions as values.",
        "❌ classes שונה.",
        "❌ static method שונה.",
        "❌ method ב-class שונה."
      ]
    },
    { id: "mc_fp_unary_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      question: "למה arr.map(parseInt) בעייתי?",
      options: [
        "map מעביר 3 args (item, index, array). parseInt לוקח (string, radix) → index הופך ל-radix → NaN",
        "parseInt slow",
        "TypeError",
        "מהיר"
      ],
      correctIndex: 0,
      explanation: "arr.map(x=>parseInt(x,10)) או arr.map(Number). פתרון: unary wrapper.",
      optionFeedback: [
        "✅ נכון. arity mismatch.",
        "❌ זה לא ביצועים.",
        "❌ לא error, NaN.",
        "❌ לא רלוונטי."
      ]
    },
    { id: "mc_fp_point_free_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 8,
      question: "מה point-free style?",
      options: [
        "כתיבת פונקציה בלי לציין במפורש את הארגומנט. למשל: const inc = add(1) במקום const inc = x => add(1, x)",
        "OOP",
        "Async",
        "Curry"
      ],
      correctIndex: 0,
      explanation: "Tacit programming. שימושי בRamda. compact אך לעיתים מקטין readability.",
      optionFeedback: [
        "✅ נכון.",
        "❌ FP style.",
        "❌ unrelated.",
        "❌ curry קשור אך שונה."
      ]
    },
    { id: "mc_fp_monad_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 8,
      question: "מה Promise כ-monad?",
      options: [
        "Promise הוא monad (חלקית): of=Promise.resolve, chain=then. מאפשר חיבור async ops בלי nested .then",
        "OOP",
        "Class",
        "Generator"
      ],
      correctIndex: 0,
      explanation: "p.then(x=>fetch(...)) = chain. await מסתיר את ה-then. דומה ל-Optional/Either.",
      optionFeedback: [
        "✅ נכון. async monad.",
        "❌ Promise instance של class but it's a monad.",
        "❌ class הוא syntax.",
        "❌ generator שונה."
      ]
    },
    { id: "mc_fp_either_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 8,
      question: "מה ה-Either monad pattern (Left/Right)?",
      options: [
        "ייצוג של result/error ב-2 ערוצים: Right=success, Left=failure. שונה מthrow — error מטופל explicit",
        "Boolean",
        "Promise",
        "Try/catch"
      ],
      correctIndex: 0,
      explanation: "fp-ts/Effect. function safeDiv(a,b): Either<Error,number>. לא throws.",
      optionFeedback: [
        "✅ נכון. typed errors.",
        "❌ boolean פשוט.",
        "❌ promise שונה.",
        "❌ throw שונה."
      ]
    },
    { id: "mc_fp_referential_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 8,
      question: "מה referential transparency?",
      options: [
        "ניתן להחליף ביטוי בערכו בלי לשנות תוצאה — pure functions בעלי תכונה זו. בסיס לoptimizations",
        "Loop",
        "Mutable",
        "Async"
      ],
      correctIndex: 0,
      explanation: "x = add(2,3); → x = 5; שווי ערך אם add pure. compiler יכול לבצע inline/CSE.",
      optionFeedback: [
        "✅ נכון. equational reasoning.",
        "❌ אין קשר.",
        "❌ mutability שובר.",
        "❌ async לא pure."
      ]
    },
    { id: "mc_fp_recursion_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      question: "למה ב-FP מועדפת recursion על loop?",
      options: [
        "Loops דורשים mutation של counter. recursion יותר declarative + מתאים ל-immutable thinking",
        "מהיר יותר",
        "Less code always",
        "JS limit"
      ],
      correctIndex: 0,
      explanation: "ב-FP טהור (Haskell) אין loops כלל. ב-JS שילוב מקובל — performance > טוהר.",
      optionFeedback: [
        "✅ נכון. immutable consistency.",
        "❌ דווקא loop מהיר ב-JS.",
        "❌ לא תמיד.",
        "❌ stack limit שובר."
      ]
    },
    { id: "mc_fp_redux_pure_ii_001", topicId: "topic_fp", conceptKey: "lesson_22::immutable", level: 7,
      question: "למה Redux reducer חייב להיות pure?",
      options: [
        "DevTools time travel + replay state changes דורשים פונקציה דטרמיניסטית. mutation שובר את ההיסטוריה",
        "מהירות",
        "TypeScript",
        "TS only"
      ],
      correctIndex: 0,
      explanation: "(state, action) => newState. ללא side effects. side effects ב-thunks/sagas/middleware.",
      optionFeedback: [
        "✅ נכון. determinism for time travel.",
        "❌ pure ≠ מהיר.",
        "❌ שניהם תקפים.",
        "❌ JS גם."
      ]
    },
    { id: "mc_fp_thunk_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      question: "מה thunk?",
      options: [
        "Function שדוחה ביצוע: () => expression. שימושי ב-Redux Thunk כ-action שיש לה side effects (fetch)",
        "Promise",
        "Generator",
        "Curried"
      ],
      correctIndex: 0,
      explanation: "const t = () => 1+2; t(); // 3. Redux thunk = action שמחזיר function (dispatch, getState)=>...",
      optionFeedback: [
        "✅ נכון. deferred computation.",
        "❌ Promise אחר.",
        "❌ generator שונה.",
        "❌ curried שונה."
      ]
    },
    { id: "mc_fp_array_chain_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 6,
      question: "למה chaining methods ב-array (.filter().map().reduce()) מקובל?",
      options: [
        "כל method מחזיר array חדש (immutable) → chain שקול ל-pipeline. קל לקריאה. trade-off: passes",
        "Mutates",
        "Slow",
        "Lazy"
      ],
      correctIndex: 0,
      explanation: "filter→map→reduce: 3 passes על n. ב-millions: reduce ב-pass יחיד.",
      optionFeedback: [
        "✅ נכון. pipeline.",
        "❌ לא mutate.",
        "❌ לא בהכרח.",
        "❌ JS array methods eager."
      ]
    },
    { id: "mc_fp_array_methods_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 6,
      question: "מי ב-Array.prototype הם FP-friendly?",
      options: [
        "map/filter/reduce/some/every/find/flatMap — pure (לא משנים את הarray). sort/reverse/splice — לא pure",
        "כולם pure",
        "כולם mutate",
        "אקראי"
      ],
      correctIndex: 0,
      explanation: "ES2023 הוסיף toSorted/toReversed/toSpliced — non-mutating versions.",
      optionFeedback: [
        "✅ נכון. שניים סוגים.",
        "❌ sort כן mutate.",
        "❌ filter לא mutate.",
        "❌ דטרמיניסטי."
      ]
    },
    { id: "mc_fp_to_sorted_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 7,
      question: "מה Array.prototype.toSorted (ES2023)?",
      options: [
        "Non-mutating sort — מחזיר array חדש ממוין. שונה מ-sort() שmutates. דומה: toReversed, toSpliced, with",
        "Faster",
        "TS only",
        "Same as sort"
      ],
      correctIndex: 0,
      explanation: "ES2023 Change Array by copy proposal. ['b','a'].toSorted() === ['a','b'], original unchanged.",
      optionFeedback: [
        "✅ נכון. immutable variant.",
        "❌ דומה performance.",
        "❌ JS native.",
        "❌ שונה — לא mutate."
      ]
    },
    { id: "mc_fp_compose_pipe_lib_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      question: "מה ה-pattern ל-pipe ב-vanilla JS?",
      options: [
        "const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x); — שילוב reduce + spread",
        "Native",
        "Reflect",
        "Promise"
      ],
      correctIndex: 0,
      explanation: "TC39 proposal Pipe operator |> כבר stage 2. בינתיים, libraries.",
      optionFeedback: [
        "✅ נכון. simple impl.",
        "❌ אין native (עדיין).",
        "❌ Reflect שונה.",
        "❌ Promise שונה."
      ]
    },
    { id: "mc_fp_recursion_iter_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 8,
      question: "למה ל-deep recursion ב-JS, iterative בטוח יותר?",
      options: [
        "Stack overflow ב-V8 ב-~10K-15K frames. Iterative עם stack מפורש לא חסום ב-call stack size",
        "Iterative slower",
        "Recursive cleaner always",
        "RAM limit"
      ],
      correctIndex: 0,
      explanation: "JS מגביל call stack. trampoline / explicit stack לdeep trees.",
      optionFeedback: [
        "✅ נכון. stack limit.",
        "❌ overhead לעיתים יותר.",
        "❌ לא תמיד.",
        "❌ stack ≠ RAM."
      ]
    },
    { id: "mc_fp_obj_freeze_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::object", level: 7,
      question: "מה Object.freeze + spread אומר?",
      options: [
        "Object.freeze לבד = shallow immutable. עם spread (...obj) = create new copy. שניהם דרושים ל-immutable updates בטוחים",
        "Deep freeze",
        "Mutate",
        "Same"
      ],
      correctIndex: 0,
      explanation: "deepFreeze recursive. ב-React/Redux: spread טוב לרוב המקרים בלי freeze מפורש (הפעלה נדירה).",
      optionFeedback: [
        "✅ נכון. shallow immut + copy.",
        "❌ freeze לא רקורסיבי.",
        "❌ ההיפך.",
        "❌ אסטרטגיות שונות."
      ]
    }
  ],
  fill: [
    { id: "fill_fp_pure_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 5,
      code: "// Pure function (no side effects, deterministic)\nconst add = (a, b) => a ____ b;",
      answer: "+",
      explanation: "Pure: same inputs → same output, no I/O."
    },
    { id: "fill_fp_curry_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      code: "// Curried add\nconst add = a => ____ => a + b;\nadd(2)(3);  // 5",
      answer: "b",
      explanation: "Currying: chain of single-arg functions."
    },
    { id: "fill_fp_compose_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      code: "// Pipe: data flows left → right\nconst pipe = (...fns) => x =>\n  fns.____((acc, fn) => fn(acc), x);",
      answer: "reduce",
      explanation: "reduce applies functions in order."
    },
    { id: "fill_fp_immutable_arr_ii_001", topicId: "topic_fp", conceptKey: "lesson_22::immutable", level: 5,
      code: "// Immutable add to array\nconst next = [...arr, ____];   // new array",
      answer: "x",
      explanation: "Spread creates new array; original untouched."
    },
    { id: "fill_fp_immutable_obj_ii_001", topicId: "topic_fp", conceptKey: "lesson_22::immutable", level: 5,
      code: "// Immutable property update\nconst next = { ...obj, ____: newValue };",
      answer: "key",
      explanation: "Spread merges; later property wins."
    },
    { id: "fill_fp_destructure_ii_001", topicId: "topic_fp", conceptKey: "lesson_19::destructuring", level: 5,
      code: "// Destructure with default\nconst { name = 'Anonymous', age } = ____;",
      answer: "user",
      explanation: "Destructuring with default value."
    },
    { id: "fill_fp_rest_args_ii_001", topicId: "topic_fp", conceptKey: "lesson_19::destructuring", level: 5,
      code: "// Variadic function\nfunction sum(...____) {\n  return nums.reduce((a, b) => a + b, 0);\n}",
      answer: "nums",
      explanation: "Rest parameters collect args into array."
    },
    { id: "fill_fp_freeze_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::object", level: 6,
      code: "// Make object immutable (shallow)\nconst frozen = Object.____(obj);",
      answer: "freeze",
      explanation: "Object.freeze prevents top-level mutation."
    },
    { id: "fill_fp_higher_order_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 6,
      code: "// HOF that returns a function\nconst multiplier = factor => x => x ____ factor;\nconst double = multiplier(2);  // double(5) = 10",
      answer: "*",
      explanation: "Closure over factor."
    },
    { id: "fill_fp_iife_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 7,
      code: "// IIFE: invoke immediately\nconst result = (function() {\n  return 'private ' + 'scope';\n})____;",
      answer: "()",
      explanation: "Immediately Invoked Function Expression."
    },
    { id: "fill_fp_to_sorted_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 7,
      code: "// Non-mutating sort (ES2023)\nconst sorted = arr.to____();",
      answer: "Sorted",
      explanation: "toSorted = immutable variant of sort."
    },
    { id: "fill_fp_flatmap_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 6,
      code: "// Map then flatten depth 1\nconst tags = posts.____(p => p.tags);",
      answer: "flatMap",
      explanation: "flatMap = map + flat(1)."
    },
    { id: "fill_fp_compose_curry_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::function", level: 8,
      code: "// Compose 2 functions\nconst compose = (f, g) => x => f(____);",
      answer: "g(x)",
      explanation: "compose(f,g)(x) = f(g(x))."
    },
    { id: "fill_fp_some_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 5,
      code: "// At least one match\nconst hasAdmin = users.____(u => u.role === 'admin');",
      answer: "some",
      explanation: "some returns true if any element matches."
    },
    { id: "fill_fp_every_ii_001", topicId: "topic_fp", conceptKey: "lesson_11::Array", level: 5,
      code: "// All match\nconst allValid = items.____(i => i.valid);",
      answer: "every",
      explanation: "every returns true if all match."
    }
  ]
};
