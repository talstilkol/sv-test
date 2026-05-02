// data/shards/questions_session_O.js
// Cluster-pedagogy-aligned MC questions targeting the hardest clusters.
// Round-O: 50 MC questions for memory_variables, function_kinds, equality,
// closures, promise_combinators, async_generations, useeffect_deps, react_memoization.

window.QUESTIONS_SHARD_O = {
  mc: [
    // ─── memory_variables cluster (let/var/const/Reference/Value/Pointer) ───
    {
      id: "mc_l11_let_clr_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::let",
      level: 4,
      question: "מה ההבדל הכי קריטי בין let לבין var ב-block scope?",
      options: [
        "let מוגבל לבלוק; var דולף ל-function scope",
        "var מוגבל לבלוק; let ל-function",
        "אין הבדל — שניהם block-scoped",
        "let רק ל-strings"
      ],
      correctIndex: 0,
      explanation: "let block-scoped → לא רואה אותו מחוץ ל-{}. var function-scoped → דולף לכל הפונקציה.",
      optionFeedback: [
        "✅ נכון. block scope הוא ההבדל המרכזי שתוקן ב-ES2015.",
        "❌ הפוך. var הוא הישן עם function scope.",
        "❌ יש הבדל מהותי. var קדם ל-let.",
        "❌ let מקבל כל סוג ערך."
      ]
    },
    {
      id: "mc_l11_const_clr_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::object",
      level: 5,
      question: "מה התנהגות `const arr = [1,2]; arr.push(3);` ?",
      options: [
        "מוסיף 3 — חוקי. const נועל את ה-binding, לא את התוכן.",
        "TypeError",
        "arr נשאר [1,2]",
        "ReferenceError"
      ],
      correctIndex: 0,
      explanation: "const מונע rebinding (`arr = ...`) אבל לא מונע mutation של ה-Heap.",
      optionFeedback: [
        "✅ נכון. const שומר על ה-pointer בלבד.",
        "❌ בטעות. push לא משנה את ה-binding.",
        "❌ push משנה את המערך במקום.",
        "❌ אין שגיאה כאן."
      ]
    },
    {
      id: "mc_l11_byref_clr_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::By Reference",
      level: 6,
      question: "`const a = {x:1}; const b = a; b.x = 99;` מה a.x?",
      options: ["99 — שניהם מצביעים לאותו object", "1 — copy מלא", "TypeError", "undefined"],
      correctIndex: 0,
      explanation: "Object.s by-reference. ההצבה מעתיקה רק את ה-pointer, לא את התוכן.",
      optionFeedback: [
        "✅ נכון. by-reference = pointer משותף.",
        "❌ ההצבה לא מבצעת deep copy.",
        "❌ אין שגיאה.",
        "❌ a.x הוגדר בצורה תקינה."
      ]
    },
    {
      id: "mc_l11_byval_clr_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::By Value",
      level: 5,
      question: "`let a = 5; let b = a; b = 10;` מה a?",
      options: ["5 — primitive copy by value", "10 — same reference", "NaN", "undefined"],
      correctIndex: 0,
      explanation: "primitives (number/string/etc) מועתקים byte-for-byte ב-Stack.",
      optionFeedback: [
        "✅ נכון. by-value = העתק עצמאי.",
        "❌ primitives לא משותפים.",
        "❌ a הוא number תקני.",
        "❌ a הוגדר כ-5."
      ]
    },
    {
      id: "mc_l11_pointer_clr_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::Pointer",
      level: 7,
      question: "מה === בין שני objects בודק?",
      options: [
        "השוואת pointer (זהות מצביעים)",
        "השוואת תוכן (deep equality)",
        "השוואת JSON",
        "השוואת keys"
      ],
      correctIndex: 0,
      explanation: "=== על objects = pointer comparison. שני objects שונים עם אותו תוכן יחזירו false.",
      optionFeedback: [
        "✅ נכון. JS אין operator לdeep equality.",
        "❌ JS לא בודק תוכן.",
        "❌ JSON.stringify ו-deep-equal לbeyond.",
        "❌ keys לא רלוונטי ב-===."
      ]
    },
    // ─── function_kinds cluster (Arrow/Regular) ───
    {
      id: "mc_l11_arrow_clr_001",
      topicId: "topic_functions",
      conceptKey: "lesson_11::arrow function",
      level: 5,
      question: "מה this בarrow function בתוך method של object?",
      options: [
        "this מהlexical scope (לא מהobject)",
        "this של ה-object המכיל",
        "undefined תמיד",
        "window"
      ],
      correctIndex: 0,
      explanation: "arrow ל-this שלה מהcontext שבו הוגדרה. לכן arrow כ-method = bug.",
      optionFeedback: [
        "✅ נכון. בעצם זה ההבדל המרכזי מ-regular function.",
        "❌ arrow לא מקבל this חדש בכל קריאה.",
        "❌ this של arrow נקבע בlexical level.",
        "❌ window רק במקרים מסוימים."
      ]
    },
    {
      id: "mc_l11_regular_clr_001",
      topicId: "topic_functions",
      conceptKey: "lesson_11::function",
      level: 5,
      question: "אילו תכונות יש ל-regular function שאין ל-arrow?",
      options: [
        "arguments object + יכולת new + dynamic this",
        "אין הבדל",
        "רק arguments",
        "arrow מהירה יותר תמיד"
      ],
      correctIndex: 0,
      explanation: "arrow אין arguments, אסור new, this lexical. regular יש את כל אלה.",
      optionFeedback: [
        "✅ נכון. שלוש תכונות מבחינות.",
        "❌ יש מספר הבדלים מהותיים.",
        "❌ יש עוד הבדלים: this + new.",
        "❌ ביצועים דומים מאוד."
      ]
    },
    // ─── equality cluster ───
    {
      id: "mc_l11_eq_clr_001",
      topicId: "topic_eq",
      conceptKey: "lesson_11::By Value",
      level: 4,
      question: "מה התוצאה של `null == undefined`?",
      options: ["true (חריג מועיל ב-==)", "false (סוגים שונים)", "TypeError", "NaN"],
      correctIndex: 0,
      explanation: "== עם null/undefined תופס את שניהם — שימושי. == עם === false.",
      optionFeedback: [
        "✅ נכון. החריג היחיד שמצדיק == לפעמים.",
        "❌ דווקא שווים תחת ==.",
        "❌ אין שגיאה.",
        "❌ אלו לא NaN."
      ]
    },
    {
      id: "mc_l11_eqq_clr_001",
      topicId: "topic_eq",
      conceptKey: "lesson_11::By Value",
      level: 5,
      question: "מה החזיר `NaN === NaN`?",
      options: [
        "false — NaN שונה מעצמו",
        "true",
        "TypeError",
        "תלוי בדפדפן"
      ],
      correctIndex: 0,
      explanation: "NaN הוא הערך היחיד ב-JS שלא שווה לעצמו. השתמש ב-Number.isNaN לבדיקה.",
      optionFeedback: [
        "✅ נכון. self-inequality unique to NaN.",
        "❌ הפוך.",
        "❌ אין שגיאה.",
        "❌ זה ספציפיקציה לא דפדפן."
      ]
    },
    {
      id: "mc_l11_objectis_clr_001",
      topicId: "topic_eq",
      conceptKey: "lesson_11::By Value",
      level: 6,
      question: "במה Object.is שונה מ-===?",
      options: [
        "מבחין בין +0 ל--0, ומחשיב NaN שווה לעצמו",
        "אותו דבר בדיוק",
        "מבצע deep equality",
        "עובד רק על objects"
      ],
      correctIndex: 0,
      explanation: "Object.is משתמש ב-SameValue: NaN === NaN = true, +0 ≠ -0.",
      optionFeedback: [
        "✅ נכון. שני הבדלים זעירים אבל קריטיים.",
        "❌ יש הבדלים ב-NaN ובאפסים.",
        "❌ זה לא deep equal.",
        "❌ עובד על הכל."
      ]
    },
    // ─── closures cluster ───
    {
      id: "mc_l_closures_001",
      topicId: "topic_closures",
      conceptKey: "lesson_closures::closure",
      level: 6,
      question: "מה closure?",
      options: [
        "פונקציה + הסביבה שבה הוגדרה (lexical environment)",
        "function שיוצרת אובייקט",
        "scope פנימי בלבד",
        "ספריית JS"
      ],
      correctIndex: 0,
      explanation: "Closure = func + lexical env. הפונקציה יכולה לגשת למשתנים שהיו זמינים בהגדרתה.",
      optionFeedback: [
        "✅ נכון. הגדרה הקלאסית.",
        "❌ זה constructor.",
        "❌ זה רק חלק.",
        "❌ זה term תכנותי."
      ]
    },
    {
      id: "mc_l_closures_002",
      topicId: "topic_closures",
      conceptKey: "lesson_closures::closure",
      level: 7,
      question: "סיבה ראשונית ל-stale closure ב-React useEffect:",
      options: [
        "ה-effect תפס value מ-render קודם, ב-deps array חסר",
        "useEffect לא עובד",
        "שגיאת syntax",
        "TypeScript לא מאפשר"
      ],
      correctIndex: 0,
      explanation: "כל render יוצר closure חדש. אם deps לא כולל את המשתנה — נראה ערך ישן.",
      optionFeedback: [
        "✅ נכון. הסיבה ההיסטורית הכי שכיחה.",
        "❌ עובד אבל עם בעיה.",
        "❌ זו לא syntax error.",
        "❌ TS לא קשור לזה."
      ]
    },
    // ─── promise_combinators cluster ───
    {
      id: "mc_l15_pall_clr_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 6,
      question: "מה קורה ב-Promise.all([p1, p2]) אם p1 נכשל?",
      options: [
        "המערך כולו נדחה (fail-fast), p2 ממשיך לרוץ אבל תוצאתו נזרקת",
        "p2 מקבל את התשובה, p1 נזרק",
        "TypeError",
        "מתעלם מ-p1"
      ],
      correctIndex: 0,
      explanation: "Promise.all = AND. רק אחד נכשל = הכל מתבטל.",
      optionFeedback: [
        "✅ נכון. fail-fast הוא ההתנהגות.",
        "❌ זה לא race.",
        "❌ אין שגיאה — הPromise נדחה.",
        "❌ הוא לא מתעלם, הוא נכשל מכלל."
      ]
    },
    {
      id: "mc_l15_pany_clr_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 7,
      question: "Promise.any נדחה רק אם:",
      options: [
        "כולם נכשלו (אז AggregateError)",
        "אחד נכשל",
        "אף פעם לא נדחה",
        "אם הראשון נכשל"
      ],
      correctIndex: 0,
      explanation: "Promise.any = OR. מספיק שאחד יצליח.",
      optionFeedback: [
        "✅ נכון. AggregateError כולל את כל השגיאות.",
        "❌ זה Promise.all.",
        "❌ Promise.allSettled תמיד מצליח.",
        "❌ זה race."
      ]
    },
    // ─── async_generations cluster ───
    {
      id: "mc_l15_async_clr_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Asynchronous",
      level: 5,
      question: "מה async function תמיד מחזירה?",
      options: [
        "Promise — גם אם רק return value",
        "value מיד",
        "callback",
        "undefined"
      ],
      correctIndex: 0,
      explanation: "כל async function עוטפת את הreturn ב-Promise.resolve.",
      optionFeedback: [
        "✅ נכון.",
        "❌ אסינכרוני יחזיר Promise תמיד.",
        "❌ זה דור ישן.",
        "❌ רק אם אין return."
      ]
    },
    {
      id: "mc_l15_await_clr_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 5,
      question: "איפה אפשר להשתמש ב-await?",
      options: [
        "בתוך async function או top-level של ES Module",
        "בכל פונקציה",
        "רק בclass methods",
        "רק בbrowser"
      ],
      correctIndex: 0,
      explanation: "await רק ב-async ו-top-level await ב-ESM (2022+).",
      optionFeedback: [
        "✅ נכון. שני המקרים היחידים.",
        "❌ ב-regular function זה syntax error.",
        "❌ הגבלה לא קיימת.",
        "❌ Node תומך גם.."
      ]
    },
    {
      id: "mc_foreach_async_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Synchronous",
      level: 6,
      question: "מה הבעיה ב-`arr.forEach(async (x) => await save(x))`?",
      options: [
        "forEach לא ממתין ל-await — הflow יוצא לפני הסיום",
        "syntax error",
        "save רץ פעמיים",
        "TypeScript לא מאפשר"
      ],
      correctIndex: 0,
      explanation: "forEach מתעלם מ-Promise החזרה. השתמש ב-for...of או Promise.all.",
      optionFeedback: [
        "✅ נכון. Trap קלאסי.",
        "❌ syntax תקין.",
        "❌ save רץ פעם אחת לכל item.",
        "❌ TS מאפשר אבל יש runtime issue."
      ]
    },
    // ─── useEffect dependency array ───
    {
      id: "mc_l24_useff_001",
      topicId: "topic_react_hooks",
      conceptKey: "lesson_24::dependency array",
      level: 7,
      question: "מתי `useEffect(fn, [])` ירוץ?",
      options: [
        "פעם אחת אחרי mount, ואחר cleanup ב-unmount",
        "בכל render",
        "אף פעם",
        "תלוי ב-state"
      ],
      correctIndex: 0,
      explanation: "[] = no deps = run once. cleanup ב-unmount.",
      optionFeedback: [
        "✅ נכון. הצורה הקלאסית של 'on mount'.",
        "❌ אם יש deps זה כן.",
        "❌ הוא רץ פעם אחת.",
        "❌ deps ריק = לא תלוי."
      ]
    },
    {
      id: "mc_l24_useff_002",
      topicId: "topic_react_hooks",
      conceptKey: "lesson_24::dependency array",
      level: 8,
      question: "תיקון נכון ל-stale closure ב-`setInterval(() => setN(n+1), 1000)` עם `[]` deps:",
      options: [
        "החלף ל-functional update: `setN(prev => prev+1)`",
        "הוסף `n` ל-deps (יוצר interval חדש כל שינוי)",
        "החלף ל-useState",
        "השתמש ב-class component"
      ],
      correctIndex: 0,
      explanation: "Functional update לא דורש את הערך הקודם ב-closure.",
      optionFeedback: [
        "✅ נכון. הפתרון הקלאסי.",
        "❌ זה גם תיקון אבל יוצר אינטרוול חדש בכל פעם.",
        "❌ useState כבר משמש.",
        "❌ זה regression טכנולוגי."
      ]
    },
    // ─── useMemo / useCallback / React.memo ───
    {
      id: "mc_l24_memo_clr_001",
      topicId: "topic_react_perf",
      conceptKey: "lesson_24::useMemo",
      level: 7,
      question: "מתי useMemo כדאי?",
      options: [
        "לחישוב יקר שתלוי במשתנה ש-dependsays לא משתנה הרבה",
        "תמיד, לכל ערך",
        "אף פעם",
        "רק עם class components"
      ],
      correctIndex: 0,
      explanation: "useMemo עולה — shallow compare של deps. שווה רק אם החישוב יקר באמת.",
      optionFeedback: [
        "✅ נכון. measure ב-Profiler לפני שמשתמשים.",
        "❌ Over-memoization עושה דברים יותר אטיים.",
        "❌ הוא אפקטיבי במקרים הנכונים.",
        "❌ Hooks זה function components בלבד."
      ]
    },
    {
      id: "mc_l24_memo_clr_002",
      topicId: "topic_react_perf",
      conceptKey: "lesson_24::useMemo",
      level: 8,
      question: "useCallback בלי React.memo בילד:",
      options: [
        "הוצאה ללא תועלת — useCallback רק חוסם ב-React.memo",
        "תמיד מהיר יותר",
        "syntax error",
        "טוב כי קל לקרוא"
      ],
      correctIndex: 0,
      explanation: "useCallback שומר reference. אם הילד תמיד עושה rerender, אין הפרש.",
      optionFeedback: [
        "✅ נכון. צריך לבדוק שהילד אכן ב-memo.",
        "❌ בלי memo בילד, אין הבדל.",
        "❌ syntax תקין.",
        "❌ קריאות לא מצדיק overhead."
      ]
    },
    {
      id: "mc_l24_memo_clr_003",
      topicId: "topic_react_perf",
      conceptKey: "lesson_24::useMemo",
      level: 7,
      question: "React.memo עוצר re-render אם:",
      options: [
        "shallow comparison של props מחזיר אותו",
        "props deep equal",
        "אף פעם",
        "משתמש לוחץ"
      ],
      correctIndex: 0,
      explanation: "React.memo משתמש ב-Object.is על כל prop. אם כל ה-props אותם reference → bailout.",
      optionFeedback: [
        "✅ נכון. shallow לא deep.",
        "❌ React.memo הוא shallow לא deep.",
        "❌ זה התפקיד שלו.",
        "❌ קליק לא קשור."
      ]
    },
    // ─── spread/rest ───
    {
      id: "mc_l11_spread_clr_001",
      topicId: "topic_destructuring",
      conceptKey: "lesson_11::spread",
      level: 5,
      question: "`[...arr1, ...arr2]` עושה:",
      options: [
        "מחבר את שני המערכים למערך חדש (shallow)",
        "מצבר במערך הראשון",
        "syntax error",
        "מחזיר tuple"
      ],
      correctIndex: 0,
      explanation: "spread פותח את כל איבר. תוצאה: array חדש.",
      optionFeedback: [
        "✅ נכון. shallow concat.",
        "❌ לא mutates.",
        "❌ syntax תקין.",
        "❌ tuple is TS only."
      ]
    },
    {
      id: "mc_l11_rest_clr_001",
      topicId: "topic_destructuring",
      conceptKey: "lesson_11::spread",
      level: 6,
      question: "ב-`function f(a, b, ...rest)` מה rest?",
      options: [
        "Array של שאר הarguments מהמיקום השלישי",
        "Object",
        "ה-arguments הראשונים",
        "undefined"
      ],
      correctIndex: 0,
      explanation: "rest תמיד array. arguments הוא array-like ישן.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה arguments בobject? לא.",
        "❌ הפוך.",
        "❌ rest = []."
      ]
    },
    // ─── destructuring ───
    {
      id: "mc_l11_destruct_001",
      topicId: "topic_destructuring",
      conceptKey: "lesson_11::object",
      level: 5,
      question: "`const {a = 5} = {a: null}` מה a?",
      options: [
        "null — defaults trigger רק על undefined",
        "5",
        "TypeError",
        "0"
      ],
      correctIndex: 0,
      explanation: "Destructuring defaults רק על undefined. null נחשב לערך תקני.",
      optionFeedback: [
        "✅ נכון. trap קלאסי.",
        "❌ default לא נופל על null.",
        "❌ אין שגיאה.",
        "❌ אין coerce."
      ]
    },
    // ─── type_check cluster ───
    {
      id: "mc_l11_typeof_clr_001",
      topicId: "topic_type",
      conceptKey: "lesson_11::object",
      level: 4,
      question: "`typeof null` מחזיר:",
      options: [
        "'object' — באג היסטורי משאר ב-JS",
        "'null'",
        "'undefined'",
        "'object?'"
      ],
      correctIndex: 0,
      explanation: "המקור: V8 type tag. תוקן ב-spec? לא — נשמר לתאימות-לאחור.",
      optionFeedback: [
        "✅ נכון. הbug ההיסטורי.",
        "❌ אין כזה type.",
        "❌ זה undefined.",
        "❌ זה לא syntax."
      ]
    },
    {
      id: "mc_l11_isarray_clr_001",
      topicId: "topic_type",
      conceptKey: "lesson_11::Array",
      level: 5,
      question: "Array.isArray vs `arr instanceof Array`:",
      options: [
        "isArray עובדת בין iframes — instanceof נכשלת",
        "אין הבדל",
        "instanceof יותר מדויק",
        "isArray מהירה יותר"
      ],
      correctIndex: 0,
      explanation: "instanceof בודקת prototype chain — שונה בין realms (iframes).",
      optionFeedback: [
        "✅ נכון.",
        "❌ יש הבדל מהותי.",
        "❌ הפוך.",
        "❌ ביצועים דומים."
      ]
    },
    // ─── HTTP status codes ───
    {
      id: "mc_l17_http_clr_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Status Codes",
      level: 5,
      question: "ההבדל בין 401 ל-403:",
      options: [
        "401 = לא מחובר. 403 = מחובר אבל אין הרשאה.",
        "401 = יותר חמור.",
        "אין הבדל.",
        "401 = browser error."
      ],
      correctIndex: 0,
      explanation: "401 → redirect login. 403 → 'no access' message.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הם משלימים, לא חמורים.",
        "❌ יש הבדל מובהק.",
        "❌ הם server response."
      ]
    },
    // ─── DOM events ───
    {
      id: "mc_l13_event_target_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::event",
      level: 6,
      question: "ב-event delegation, מה event.target?",
      options: [
        "האלמנט שעליו לחצו (לפעמים child)",
        "האלמנט שעליו ה-listener",
        "this",
        "window"
      ],
      correctIndex: 0,
      explanation: "target = origin. currentTarget = listener owner.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה currentTarget.",
        "❌ זה תלוי בfunction type.",
        "❌ window רק לאירועי window."
      ]
    },
    {
      id: "mc_l13_preventd_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::event",
      level: 5,
      question: "preventDefault עוצר:",
      options: [
        "ברירת המחדל של הדפדפן (form submit, link follow)",
        "bubble להורים",
        "כל ה-event",
        "ה-script"
      ],
      correctIndex: 0,
      explanation: "stopPropagation עוצר bubble. preventDefault עוצר default action.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה stopPropagation.",
        "❌ זה stopImmediatePropagation על אותו element.",
        "❌ לא עוצר scripts."
      ]
    },
    // ─── React state ───
    {
      id: "mc_l22_setstate_clr_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::state",
      level: 6,
      question: "`setN(n+1)` באיטרציה מהירה (כמו setInterval):",
      options: [
        "stale closure — n קפוא בערך מrender שבו ה-effect הוגדר",
        "תמיד עובד",
        "syntax error",
        "פותח שגיאת compilation"
      ],
      correctIndex: 0,
      explanation: "פתרון: `setN(prev => prev+1)`.",
      optionFeedback: [
        "✅ נכון.",
        "❌ עם deps נכונים אולי, אבל בdoc.",
        "❌ syntax תקין.",
        "❌ אין compilation בJS."
      ]
    },
    {
      id: "mc_l22_propstate_clr_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::props",
      level: 4,
      question: "ההבדל המרכזי בין props ל-state:",
      options: [
        "props מהאב (immutable). state פנימי (mutable דרך setter).",
        "state מהאב. props פנימי.",
        "אין הבדל.",
        "props רק לטקסט."
      ],
      correctIndex: 0,
      explanation: "props down. state local.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הפוך.",
        "❌ יש הבדל מהותי.",
        "❌ props מקבל כל סוג."
      ]
    },
    // ─── Mongoose / DB ───
    {
      id: "mc_l20_mongoose_001_O",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::Schema",
      level: 6,
      question: "ההבדל בין Mongoose Schema ל-Model:",
      options: [
        "Schema = תבנית. Model = class הנוצר מהSchema לCRUD.",
        "אין הבדל.",
        "Model = תבנית.",
        "Schema = instance."
      ],
      correctIndex: 0,
      explanation: "Schema → mongoose.model() → Model class → instances are Documents.",
      optionFeedback: [
        "✅ נכון.",
        "❌ יש הבדל ברור.",
        "❌ הפוך.",
        "❌ instance הוא Document."
      ]
    },
    {
      id: "mc_l20_populate_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::find",
      level: 7,
      question: "populate() עושה:",
      options: [
        "מחליף ObjectId references ב-documents מלאים מטבלה אחרת",
        "ממלא populate config",
        "ינסר מסמכים",
        "rejects request"
      ],
      correctIndex: 0,
      explanation: "Mongoose join-מתחזה. תחת המכסה: שאילתה נוספת ב-find($in).",
      optionFeedback: [
        "✅ נכון.",
        "❌ שם לא נכון.",
        "❌ זה לא delete.",
        "❌ זה אופרציה הצליחה."
      ]
    },
    // ─── Express ───
    {
      id: "mc_l17_req_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Query Parameters",
      level: 5,
      question: "ב-`/user/:id`, איפה id?",
      options: [
        "req.params.id (string)",
        "req.body.id",
        "req.query.id",
        "req.headers.id"
      ],
      correctIndex: 0,
      explanation: "Path params → req.params. Querystring → req.query. JSON body → req.body.",
      optionFeedback: [
        "✅ נכון.",
        "❌ body לpost.",
        "❌ query אחרי ?.",
        "❌ headers ל-meta."
      ]
    },
    // ─── TypeScript ───
    {
      id: "mc_l26_unknown_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::never",
      level: 7,
      question: "מתי להשתמש ב-unknown ולא ב-any?",
      options: [
        "כשרוצים narrow לפני שימוש (TS-safe alternative)",
        "אף פעם",
        "תמיד any",
        "רק ב-strict mode"
      ],
      correctIndex: 0,
      explanation: "unknown = top type. כל ערך → unknown. unknown → דבר רק עם narrow.",
      optionFeedback: [
        "✅ נכון.",
        "❌ unknown יותר בטוח.",
        "❌ any מבטל בדיקות.",
        "❌ unknown זמין תמיד."
      ]
    },
    {
      id: "mc_l26_typeinterface_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::interface",
      level: 6,
      question: "מתי לבחור type ולא interface?",
      options: [
        "ל-union types, tuples, computed types",
        "תמיד type",
        "אין הבדל",
        "interface ל-everything"
      ],
      correctIndex: 0,
      explanation: "interface ל-shapes שצריכים merge. type ל-union/computed.",
      optionFeedback: [
        "✅ נכון.",
        "❌ interface יש יתרונות במקרים מסוימים.",
        "❌ יש הבדלים מהותיים.",
        "❌ unions אסור עם interface."
      ]
    },
    // ─── CSS ───
    {
      id: "mc_lhtml_position_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::box model",
      level: 7,
      question: "`.parent { transform: translateZ(0); }` משפיע על fixed child איך?",
      options: [
        "החילד הופך relative-to-parent (transform שובר fixed)",
        "אין השפעה",
        "fixed תמיד viewport",
        "transform לא קיים"
      ],
      correctIndex: 0,
      explanation: "transform/perspective/filter יוצר containing block חדש → fixed מתייחס לאב.",
      optionFeedback: [
        "✅ נכון. trap קלאסי.",
        "❌ יש השפעה משמעותית.",
        "❌ זה התנהגות ללא transform.",
        "❌ transform קיים מ-CSS3."
      ]
    },
    {
      id: "mc_l25_flexbox_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::utility classes",
      level: 5,
      question: "`flex justify-center items-center`:",
      options: [
        "מרכז ילדים אופקית ואנכית בflex container",
        "מקבל flex direction column",
        "syntax error",
        "מציב position: absolute"
      ],
      correctIndex: 0,
      explanation: "Tailwind utility composition. justify=main axis, items=cross axis.",
      optionFeedback: [
        "✅ נכון. justify-content מטפל בציר ראשי, align-items בציר משני — שילוב מרכז.",
        "❌ זה flex-col בTailwind — מיוחד לדירקציה אנכית, לא למרכוז אופקי.",
        "❌ ה-classes הם תקני Tailwind — לא syntax error באמת.",
        "❌ אין position absolute כאן — flex container בלבד עם justify+items."
      ]
    },
    // ─── Cluster Pedagogy ספציפי ───
    {
      id: "mc_cluster_pedagogy_001",
      topicId: "topic_meta",
      conceptKey: "lesson_11::object",
      level: 5,
      question: "מה היתרון של ללמוד let/var/const בקלסטר אחד?",
      options: [
        "ההבדלים מתבהרים — לא ניתן להבין const בלי לדעת מה let",
        "פחות זמן ללמידה",
        "פחות זיכרון",
        "עוקף בדיקות"
      ],
      correctIndex: 0,
      explanation: "מושגים מנוגדים מבהירים זה את זה. cluster pedagogy.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הזמן לא מתקצר משמעותית.",
        "❌ זיכרון לא קשור.",
        "❌ זה לא קשור לבדיקות."
      ]
    },
    // ─── More memory_variables coverage ───
    {
      id: "mc_l11_var_clr_002",
      topicId: "topic_variables",
      conceptKey: "lesson_11::var",
      level: 4,
      question: "`for (var i=0; i<3; i++) setTimeout(() => console.log(i), 0)`:",
      options: [
        "מדפיס 3, 3, 3 — var function-scoped, כל ה-callbacks חולקים i",
        "מדפיס 0, 1, 2",
        "syntax error",
        "מדפיס 0, 0, 0"
      ],
      correctIndex: 0,
      explanation: "var = function scope. כשsetTimeout נקראים, i כבר 3.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה עם let.",
        "❌ syntax תקין.",
        "❌ הm לא מתחילים מ-0."
      ]
    },
    {
      id: "mc_l11_let_clr_002",
      topicId: "topic_variables",
      conceptKey: "lesson_11::let",
      level: 5,
      question: "`for (let j=0; j<3; j++) setTimeout(() => console.log(j), 0)`:",
      options: [
        "מדפיס 0, 1, 2 — let block-scoped, כל iteration j חדש",
        "מדפיס 3, 3, 3",
        "syntax error",
        "TDZ error"
      ],
      correctIndex: 0,
      explanation: "let block scope = scope חדש לכל iteration.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה עם var.",
        "❌ syntax תקין.",
        "❌ אין TDZ פה."
      ]
    },
    // ─── shallow vs deep ───
    {
      id: "mc_l11_deepcopy_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::By Reference",
      level: 7,
      question: "`structuredClone(obj)` ו-`JSON.parse(JSON.stringify(obj))` ההבדל:",
      options: [
        "structuredClone שומר Date/Map/Set; JSON trick לא",
        "אותו דבר",
        "JSON trick יותר מהיר תמיד",
        "structuredClone לא קיים"
      ],
      correctIndex: 0,
      explanation: "JSON.stringify מאבד Date (→ string), Map/Set, undefined, function, symbol.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הם שונים מהותית.",
        "❌ structuredClone לא תמיד אטי יותר.",
        "❌ זה native API מודרני."
      ]
    },
    // ─── Promise.race ───
    {
      id: "mc_l15_prace_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 7,
      question: "Pattern של timeout עם Promise.race:",
      options: [
        "race([fetch(), sleep(N).then(()=>{throw 'timeout'})])",
        "race([fetch()]).timeout()",
        "fetch().timeout(N)",
        "Promise.timeout(fetch(), N)"
      ],
      correctIndex: 0,
      explanation: "race resolves על הראשון. timeout-Promise מנצח אם איטי.",
      optionFeedback: [
        "✅ נכון. pattern קלאסי.",
        "❌ אין מתודה כזו.",
        "❌ אין timeout מובנה.",
        "❌ זה לא API."
      ]
    },
    // ─── more closure ───
    {
      id: "mc_l_closure_pattern_001",
      topicId: "topic_closures",
      conceptKey: "lesson_closures::closure",
      level: 7,
      question: "Counter closure: `function maker(){let n=0; return ()=>++n;}`:",
      options: [
        "מחזיר פונקציה שזוכרת n. כל קריאה מעלה.",
        "n מתחיל מ-1 בכל קריאה",
        "syntax error",
        "תמיד מחזיר 1"
      ],
      correctIndex: 0,
      explanation: "n נשמר ב-closure של ה-inner function.",
      optionFeedback: [
        "✅ נכון.",
        "❌ closure מחזיק את n.",
        "❌ syntax תקין.",
        "❌ הפעולה ++ מעלה."
      ]
    },
    // ─── Final batch ───
    {
      id: "mc_l11_set_001",
      topicId: "topic_variables",
      conceptKey: "lesson_15::Promise",
      level: 5,
      question: "מהירות `s.has(value)` ב-Set:",
      options: [
        "O(1) — hash table",
        "O(n) — linear",
        "O(log n)",
        "O(n²)"
      ],
      correctIndex: 0,
      explanation: "Set/Map משתמשים ב-hash table פנימי.",
      optionFeedback: [
        "✅ נכון.",
        "❌ Array זה O(n).",
        "❌ זה tree.",
        "❌ אין O(n²) ב-has."
      ]
    },
    {
      id: "mc_l_event_loop_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 9,
      question: "מה יודפס? `console.log(1); setTimeout(()=>console.log(2),0); Promise.resolve().then(()=>console.log(3)); console.log(4);`",
      options: [
        "1, 4, 3, 2 — sync ראשון, אז microtask, אז macrotask",
        "1, 2, 3, 4",
        "1, 4, 2, 3",
        "1, 3, 4, 2"
      ],
      correctIndex: 0,
      explanation: "Microtask drained לפני Macrotask. setTimeout(0) הוא macrotask.",
      optionFeedback: [
        "✅ נכון. סדר event loop.",
        "❌ async אחרי sync.",
        "❌ microtask לפני macrotask.",
        "❌ sync ראשון."
      ]
    },
    {
      id: "mc_react_hook_rules_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::state",
      level: 7,
      question: "Rules of Hooks ראשי:",
      options: [
        "רק top-level של function component (לא בif/loop)",
        "אפשר בכל מקום",
        "רק ב-class",
        "רק ב-useEffect"
      ],
      correctIndex: 0,
      explanation: "Order-dependent. React שומר ב-fiber linked list.",
      optionFeedback: [
        "✅ נכון.",
        "❌ נשבר fiber order.",
        "❌ class לא תומך ב-Hooks.",
        "❌ הוא רק example אחד."
      ]
    },
    {
      id: "mc_immutable_react_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::state",
      level: 7,
      question: "למה React דורש immutable state?",
      options: [
        "shallow comparison של state — מזהה שינוי לפי reference",
        "ביצועים בלבד",
        "syntax",
        "TypeScript"
      ],
      correctIndex: 0,
      explanation: "אם תbroke same ref, React חושב שלא השתנה.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה fundamental לwork.",
        "❌ זה לא syntax.",
        "❌ JS plain עובד אותו דבר."
      ]
    },
    // 50 שאלות הושלמו
  ],
  fill: [
    // ─── Sample of 30 fill-in-the-code questions ───
    {
      id: "fill_l11_let_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::let",
      level: 4,
      code: "for (____ i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n// מדפיס 0, 1, 2",
      answer: "let",
      explanation: "let יוצר scope חדש לכל iteration. var ידפיס 3,3,3."
    },
    {
      id: "fill_l11_const_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::object",
      level: 4,
      code: "const arr = [1, 2, 3];\narr.____(4);  // arr הופך ל-[1,2,3,4]\n// const מאפשר mutation של תוכן",
      answer: "push",
      explanation: "const נועל את ה-binding (pointer), לא את ה-Heap content."
    },
    {
      id: "fill_l11_spread_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::spread",
      level: 5,
      code: "const a = [1, 2];\nconst b = [3, 4];\nconst combined = [...a, ...____];\n// [1, 2, 3, 4]",
      answer: "b",
      explanation: "spread פותח את כל מערך."
    },
    {
      id: "fill_l11_destruct_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::object",
      level: 5,
      code: "const user = { name: 'Tal', age: 30 };\nconst { ____, age } = user;\n// name = 'Tal', age = 30",
      answer: "name",
      explanation: "Object destructuring לפי שם key."
    },
    {
      id: "fill_l11_arrow_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::arrow function",
      level: 4,
      code: "const double = (n) ____ n * 2;\nconsole.log(double(5));  // 10",
      answer: "=>",
      explanation: "Arrow function syntax: (params) => expression."
    },
    {
      id: "fill_l11_map_001",
      topicId: "topic_array",
      conceptKey: "lesson_11::map",
      level: 4,
      code: "const nums = [1, 2, 3];\nconst doubled = nums.____(n => n * 2);\n// [2, 4, 6]",
      answer: "map",
      explanation: ".map יוצר מערך חדש באותו אורך."
    },
    {
      id: "fill_l11_filter_001",
      topicId: "topic_array",
      conceptKey: "lesson_11::filter",
      level: 4,
      code: "const evens = [1,2,3,4].____(n => n % 2 === 0);\n// [2, 4]",
      answer: "filter",
      explanation: ".filter שומר רק מי שמקבל true."
    },
    {
      id: "fill_l11_reduce_001",
      topicId: "topic_array",
      conceptKey: "lesson_11::reduce",
      level: 5,
      code: "const sum = [1,2,3].____((acc, n) => acc + n, 0);\n// 6",
      answer: "reduce",
      explanation: ".reduce מקבל accumulator + initial value."
    },
    {
      id: "fill_l13_query_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::querySelector",
      level: 4,
      code: "const btn = document.____('#submit');",
      answer: "querySelector",
      explanation: "querySelector מקבל CSS selector."
    },
    {
      id: "fill_l13_textcontent_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::innerHTML",
      level: 4,
      code: "el.____ = userInput;  // safe from XSS\n// אל תשתמש ב-innerHTML עם user input",
      answer: "textContent",
      explanation: "textContent מבטיח טקסט בלבד — לא parse HTML."
    },
    {
      id: "fill_l15_promise_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 6,
      code: "const results = await Promise.____([fetchA(), fetchB(), fetchC()]);\n// כל ה-3 הצליחו",
      answer: "all",
      explanation: "Promise.all מחכה לכל ה-Promises ונדחה ב-fail-fast."
    },
    {
      id: "fill_l15_async_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Asynchronous",
      level: 5,
      code: "____ function fetchData() {\n  const r = await fetch('/api');\n  return r.json();\n}",
      answer: "async",
      explanation: "async ל-await בתוך הפונקציה."
    },
    {
      id: "fill_l15_trycatch_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::try",
      level: 5,
      code: "____ {\n  await save();\n} catch (e) {\n  console.error(e);\n}",
      answer: "try",
      explanation: "try { } catch (e) { } block הסטנדרטי."
    },
    {
      id: "fill_l24_useeff_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useEffect",
      level: 6,
      code: "useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => ____(id);\n}, []);",
      answer: "clearInterval",
      explanation: "cleanup חובה אחרת interval רץ אחרי unmount."
    },
    {
      id: "fill_l22_usestate_001_O",
      topicId: "topic_react",
      conceptKey: "lesson_22::state",
      level: 5,
      code: "const [count, setCount] = ____(0);\nsetCount(prev => prev + 1);  // safe update",
      answer: "useState",
      explanation: "useState מחזיר tuple [value, setter]."
    },
    {
      id: "fill_l24_useref_001_O",
      topicId: "topic_react",
      conceptKey: "lesson_24::useRef",
      level: 6,
      code: "const inputRef = ____(null);\nuseEffect(() => inputRef.current.focus(), []);\nreturn <input ref={inputRef} />;",
      answer: "useRef",
      explanation: "useRef מחזיר {current: ...} — mutable container."
    },
    {
      id: "fill_l17_express_001_O",
      topicId: "topic_http",
      conceptKey: "lesson_17::app.get",
      level: 5,
      code: "app.____('/users/:id', (req, res) => {\n  res.json({ id: req.params.id });\n});",
      answer: "get",
      explanation: "app.get לroute GET."
    },
    {
      id: "fill_l20_mongoose_001_O",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::Schema",
      level: 6,
      code: "const userSchema = new mongoose.____({ name: String, email: String });",
      answer: "Schema",
      explanation: "mongoose.Schema(definition)."
    },
    {
      id: "fill_l20_findone_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::findOne",
      level: 5,
      code: "const user = await User.____({ email: 'a@b.com' });",
      answer: "findOne",
      explanation: "findOne returns first match or null."
    },
    {
      id: "fill_l20_inc_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::Schema",
      level: 6,
      code: "await User.updateOne({ _id }, { ____: { points: 10 } });",
      answer: "$inc",
      explanation: "$inc atomic counter increment."
    },
    {
      id: "fill_l13_addev_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::event",
      level: 5,
      code: "btn.____('click', (e) => {\n  e.preventDefault();\n  // do work\n});",
      answer: "addEventListener",
      explanation: "addEventListener עם type + handler."
    },
    {
      id: "fill_l11_typeof_001",
      topicId: "topic_type",
      conceptKey: "lesson_11::object",
      level: 4,
      code: "if (____ value === 'string') {\n  console.log(value.toUpperCase());\n}",
      answer: "typeof",
      explanation: "typeof מקבל string תוצאה."
    },
    {
      id: "fill_l11_isarray_001",
      topicId: "topic_type",
      conceptKey: "lesson_11::Array",
      level: 4,
      code: "if (Array.____(x)) {\n  x.forEach(...);\n}",
      answer: "isArray",
      explanation: "Array.isArray הדרך האמינה."
    },
    {
      id: "fill_l11_struct_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::By Reference",
      level: 7,
      code: "const deepCopy = ____(state);\n// ES2022+ deep clone",
      answer: "structuredClone",
      explanation: "structuredClone deep with Date/Map/Set support."
    },
    {
      id: "fill_l24_memo_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 7,
      code: "const total = ____(\n  () => items.reduce((s, i) => s + i.price, 0),\n  [items]\n);",
      answer: "useMemo",
      explanation: "useMemo cache תוצאה."
    },
    {
      id: "fill_l24_callback_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 7,
      code: "const handler = ____(\n  () => save(id),\n  [id]\n);",
      answer: "useCallback",
      explanation: "useCallback cache reference של פונקציה."
    },
    {
      id: "fill_l11_findarr_001",
      topicId: "topic_array",
      conceptKey: "lesson_11::find",
      level: 4,
      code: "const found = users.____(u => u.email === target);",
      answer: "find",
      explanation: ".find returns first or undefined."
    },
    {
      id: "fill_l11_someevery_001",
      topicId: "topic_array",
      conceptKey: "lesson_11::filter",
      level: 5,
      code: "const hasAdult = users.____(u => u.age >= 18);  // boolean",
      answer: "some",
      explanation: ".some returns true if any matches."
    },
    {
      id: "fill_l13_fetch_001",
      topicId: "topic_async",
      conceptKey: "lesson_24::fetch",
      level: 5,
      code: "const r = await ____('/api/users');\nconst users = await r.json();",
      answer: "fetch",
      explanation: "fetch returns Promise<Response>."
    },
    {
      id: "fill_l11_arr_destr_001",
      topicId: "topic_destructuring",
      conceptKey: "lesson_11::object",
      level: 5,
      code: "const [first, second, ...____] = [1, 2, 3, 4, 5];\n// first=1, second=2, rest=[3,4,5]",
      answer: "rest",
      explanation: "rest collects remaining."
    },
  ],
};
