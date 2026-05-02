// data/shards/questions_session_P.js
// Sprint 2 batch P — hardest clusters (diff 8-9)
// Targets: useEffect deps, event_loop, array_reference, closures, react_memoization
// 50 questions: 35 MC + 15 Fill

window.QUESTIONS_SHARD_P = {
  mc: [
    // ─── useEffect dependency array (diff 9) ───
    {
      id: "mc_l24_useff_p_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::dependency array",
      level: 8,
      question: "`useEffect(() => doSomething(x), [])` — מה הבעיה אם x משתנה?",
      options: [
        "stale closure: doSomething תמיד יראה את x מ-render הראשון",
        "אין בעיה — useEffect רץ בכל שינוי",
        "TypeError",
        "React מזהה ומריץ שוב"
      ],
      correctIndex: 0,
      explanation: "[] = no deps. ה-effect לא מורץ מחדש גם כש-x משתנה.",
      optionFeedback: [
        "✅ נכון. בעיית stale closure הקלאסית — ה-effect קופא בערך הראשוני.",
        "❌ הפוך: עם [] ה-effect רץ פעם 1 בלבד, לא בכל שינוי.",
        "❌ אין שגיאת syntax כאן — הבעיה לוגית/דאטה.",
        "❌ React לא מזהה אוטומטית, ה-deps array הוא חוזה מפורש."
      ]
    },
    {
      id: "mc_l24_useff_p_002",
      topicId: "topic_react",
      conceptKey: "lesson_24::dependency array",
      level: 9,
      question: "מה החוק של exhaustive-deps?",
      options: [
        "כל משתנה שה-effect משתמש בו חייב להיות ב-deps array",
        "אסור deps array",
        "deps רק עם state, לא props",
        "תמיד []"
      ],
      correctIndex: 0,
      explanation: "ESLint plugin react-hooks/exhaustive-deps אוכף זאת. מונע stale closures.",
      optionFeedback: [
        "✅ נכון. כך מבטיחים שה-effect תמיד ירוץ מחדש כשמה שהוא משתמש בו השתנה.",
        "❌ deps array היא חלק מהותי של ה-API, לא אסורה.",
        "❌ אין הבחנה בין state ו-props ב-deps — שניהם מטופלים אותו דבר.",
        "❌ [] גורם ל-stale closures במקרים רבים — לא ברירת המחדל."
      ]
    },
    {
      id: "mc_l24_useff_p_003",
      topicId: "topic_react",
      conceptKey: "lesson_24::dependency array",
      level: 8,
      question: "useEffect עם cleanup — מתי ה-cleanup רץ?",
      options: [
        "לפני ה-effect הבא + ב-unmount של הקומפוננטה",
        "רק ב-unmount",
        "אף פעם לא רץ",
        "בכל render"
      ],
      correctIndex: 0,
      explanation: "Cleanup מבטיח שאין side effects דולפים בין renderים.",
      optionFeedback: [
        "✅ נכון. שני המקרים — לפני ריצה חדשה ובsuית סופית.",
        "❌ זה רק חצי. cleanup רץ גם בין renderים.",
        "❌ cleanup רץ אם הוחזר function מה-effect.",
        "❌ ב-render עצמו אין cleanup, רק אחרי commit."
      ]
    },
    {
      id: "mc_l24_useff_p_004",
      topicId: "topic_react",
      conceptKey: "lesson_24::dependency array",
      level: 9,
      question: "object ב-deps array שיוצר infinite loop:",
      options: [
        "object literal `{}` נוצר חדש בכל render — Object.is מזהה כשונה",
        "אין infinite loop",
        "syntax error",
        "React חוסמת אוטומטית"
      ],
      correctIndex: 0,
      explanation: "פתרון: useMemo את ה-object או הוצא אותו חוץ.",
      optionFeedback: [
        "✅ נכון. ה-bug הקלאסי — reference שונה בכל render.",
        "❌ ההיפך — זה בדיוק הסבר ל-infinite loop ב-useEffect.",
        "❌ syntax תקין — הבעיה בלוגיקה.",
        "❌ React לא חוסמת — מסתמכת על המתכנת."
      ]
    },
    // ─── event_loop / microtask (diff 9) ───
    {
      id: "mc_eventloop_p_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 9,
      question: "סדר ההדפסה: `Promise.resolve().then(()=>console.log('A')); console.log('B'); setTimeout(()=>console.log('C'),0); Promise.resolve().then(()=>console.log('D'))`?",
      options: [
        "B, A, D, C — sync ראשון, אז כל microtasks, אז macrotask",
        "A, B, C, D — לפי סדר הקוד",
        "B, C, A, D — setTimeout ראשון",
        "A, D, B, C"
      ],
      correctIndex: 0,
      explanation: "Sync code → microtasks (A, D) → first macrotask (C).",
      optionFeedback: [
        "✅ נכון. event loop priorities ברורים.",
        "❌ async code אף פעם לא רץ לפני sync.",
        "❌ setTimeout(0) הוא macrotask — האטי בין השלושה.",
        "❌ B (sync) חייב להיות לפני async."
      ]
    },
    {
      id: "mc_eventloop_p_002",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 8,
      question: "מהו microtask?",
      options: [
        "callback שרץ אחרי הסיום של ה-task הנוכחי, לפני ה-task הבא — Promise.then בקטגוריה זו",
        "callback ארוך",
        "macrotask synonym",
        "function רגילה"
      ],
      correctIndex: 0,
      explanation: "microtask queue מתרוקן לחלוטין בין macrotasks.",
      optionFeedback: [
        "✅ נכון. תור עדיפות בין macrotasks.",
        "❌ לא קשור לאורך — זה תור עדיפות.",
        "❌ ההפך — microtask עדיפות גבוהה יותר.",
        "❌ function רגילה sync — microtask זה תזמון."
      ]
    },
    {
      id: "mc_eventloop_p_003",
      topicId: "topic_async",
      conceptKey: "lesson_15::setTimeout",
      level: 7,
      question: "`setTimeout(fn, 0)` — מתי fn יקרא בפועל?",
      options: [
        "אחרי שהמיקרו-תור התרוקן + מינימום 4ms (clamping)",
        "מיד — 0 פירושו עכשיו",
        "אף פעם לא רץ",
        "תלוי ברנדומיות"
      ],
      correctIndex: 0,
      explanation: "HTML spec: nesting > 5 → 4ms minimum. אבל לפני זה — microtasks.",
      optionFeedback: [
        "✅ נכון. כללי clamping של ספציפיקציית HTML.",
        "❌ 0 הוא בקשה — לא הבטחה. clamping ל-4ms.",
        "❌ הוא רץ, רק לא מיד.",
        "❌ הזמן דטרמיניסטי, לא random."
      ]
    },
    // ─── array_reference cluster (diff 9) ───
    {
      id: "mc_l22_arrayref_p_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::state",
      level: 8,
      question: "`state.items.push(newItem); setState(state);` ב-React — מה הבעיה?",
      options: [
        "shallow comparison לא מזהה שינוי כי ה-reference של state זהה",
        "TypeError",
        "אין בעיה",
        "Items מתחלפים מקום"
      ],
      correctIndex: 0,
      explanation: "React שומר על referenceיוילדים. mutation in-place + same ref = no rerender.",
      optionFeedback: [
        "✅ נכון. mutation in-place הוא האנטי-pattern הקלאסי.",
        "❌ אין שגיאת syntax — הבעיה לוגית.",
        "❌ ה-UI לא יתעדכן — זו הבעיה.",
        "❌ items נשארים באותו סדר אבל UI לא ירנדר."
      ]
    },
    {
      id: "mc_l22_arrayref_p_002",
      topicId: "topic_react",
      conceptKey: "lesson_22::state",
      level: 8,
      question: "תיקון נכון ל-`state.items.push(x)`:",
      options: [
        "`setState({...state, items: [...state.items, x]})` — immutable update",
        "`state.items.push(x)` — שום שינוי נדרש",
        "`state.items = [...state.items, x]`",
        "כל אחד מהאפשרויות"
      ],
      correctIndex: 0,
      explanation: "Spread יוצר reference חדש שReact יזהה.",
      optionFeedback: [
        "✅ נכון. immutable update בכל הרמות.",
        "❌ זה בדיוק ה-bug. mutation לא יוצר re-render.",
        "❌ זה עדיין mutation — `=` משנה.items.",
        "❌ רק (1) נכון."
      ]
    },
    {
      id: "mc_l22_arrayref_p_003",
      topicId: "topic_variables",
      conceptKey: "lesson_11::By Reference",
      level: 7,
      question: "shallow copy של array עם objects — ההשפעה על ה-objects פנימה:",
      options: [
        "ה-objects פנימה משותפים בין המקור והעותק (לא נסגרים)",
        "deep copy — כולם עצמאיים",
        "copy מתבצע עם errors",
        "אסור spread על מערכים"
      ],
      correctIndex: 0,
      explanation: "shallow = רק רמה 1 חדשה. structuredClone לdeep.",
      optionFeedback: [
        "✅ נכון. trap קלאסי של React state עם nested.",
        "❌ shallow לא deep. nested משותפים.",
        "❌ אין שגיאות עם spread על arrays.",
        "❌ spread ב-arrays לגמרי תקין."
      ]
    },
    // ─── closures (diff 8) ───
    {
      id: "mc_closure_p_001",
      topicId: "topic_closures",
      conceptKey: "lesson_closures::closure",
      level: 7,
      question: "Counter via closure: `function make(){let c=0; return ()=>++c;}`. שני calls ל-make() יחזירו:",
      options: [
        "שני counters עצמאיים — כל אחד עם c משלו",
        "אותו counter — c משותף",
        "TypeError",
        "תמיד מחזיר 1"
      ],
      correctIndex: 0,
      explanation: "כל קריאה ל-make יוצרת execution context חדש = closure חדש.",
      optionFeedback: [
        "✅ נכון. כל make() = scope חדש.",
        "❌ הפוך. אם היו משותפים — לא היה counter.",
        "❌ syntax תקין.",
        "❌ הוא מעלה."
      ]
    },
    {
      id: "mc_closure_p_002",
      topicId: "topic_closures",
      conceptKey: "lesson_closures::closure",
      level: 7,
      question: "`for (var i=0; i<3; i++) setTimeout(()=>console.log(i), 0)`:",
      options: [
        "3, 3, 3 — var function-scoped, callbacks חולקים את אותו i",
        "0, 1, 2",
        "syntax error",
        "ערכים אקראיים"
      ],
      correctIndex: 0,
      explanation: "כל callbacks תופסים את ה-i הסופי. let block-scoped היה נותן 0,1,2.",
      optionFeedback: [
        "✅ נכון. trap קלאסי של closures + var.",
        "❌ עם let. var משתף.",
        "❌ syntax תקין.",
        "❌ זה דטרמיניסטי לחלוטין."
      ]
    },
    {
      id: "mc_closure_p_003",
      topicId: "topic_closures",
      conceptKey: "lesson_closures::closure",
      level: 8,
      question: "Module pattern via IIFE:",
      options: [
        "(()=>{const _x=1; return {get:()=>_x};})() — _x פרטי לחלוטין",
        "אין דרך לעשות פרטיות ב-JS",
        "רק ES6 modules עושים זאת",
        "syntax error"
      ],
      correctIndex: 0,
      explanation: "Pre-ES6 דרך לעשות encapsulation. תוצאת ה-IIFE היא ה-API הציבורי.",
      optionFeedback: [
        "✅ נכון. classic module pattern.",
        "❌ closures מאפשרים זאת.",
        "❌ closures היו לפני ES6 modules.",
        "❌ IIFE syntax תקין."
      ]
    },
    {
      id: "mc_closure_stale_p_001",
      topicId: "topic_react",
      conceptKey: "lesson_closures::closure",
      level: 8,
      question: "stale closure ב-React: למה זה קורה?",
      options: [
        "כל render יוצר closure חדש שתופס ערכים. אם deps לא נכונים — closure ישן רץ עם ערכים ישנים",
        "React באג",
        "JS אינו תומך ב-closures",
        "TypeScript מונע"
      ],
      correctIndex: 0,
      explanation: "פתרון: functional updates או deps מלא.",
      optionFeedback: [
        "✅ נכון. הסבר עומק על המנגנון.",
        "❌ זו תכונה של JS, לא bug.",
        "❌ JS תומך מאז 1995.",
        "❌ TS לא קשור לזמן ריצה."
      ]
    },
    // ─── react memoization (diff 8) ───
    {
      id: "mc_l24_memo_p_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 7,
      question: "useMemo cache:",
      options: [
        "ערך החישוב נשמר עד deps משתנים — לא מחשב מחדש",
        "כל render מחשב",
        "לא קיים ב-React",
        "רק ב-class components"
      ],
      correctIndex: 0,
      explanation: "useMemo רואה Object.is על deps. אם זהה — מחזיר ערך cached.",
      optionFeedback: [
        "✅ נכון. caching רק כש-deps שווים.",
        "❌ אם deps זהים, לא מחשב מחדש.",
        "❌ קיים מ-React 16.8.",
        "❌ Hook = function components."
      ]
    },
    {
      id: "mc_l24_memo_p_002",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 8,
      question: "Over-memoization של useMemo על חישובים זולים:",
      options: [
        "מאט — overhead של shallow comparison + memory > החישוב עצמו",
        "תמיד מואץ",
        "אין השפעה",
        "Performance perfect"
      ],
      correctIndex: 0,
      explanation: "Profile-first. memoize רק חישובים יקרים.",
      optionFeedback: [
        "✅ נכון. measure לפני שמסתעפים.",
        "❌ memo עולה — overhead על deps comparison.",
        "❌ יש overhead בכל קריאה.",
        "❌ memoization = trade-off, לא silver bullet."
      ]
    },
    {
      id: "mc_l24_memo_p_003",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 7,
      question: "useCallback בלי React.memo בילד:",
      options: [
        "אפס תועלת — הילד תמיד יבצע re-render אם ההורה כן",
        "תמיד שיפור ביצועים",
        "syntax error",
        "TypeScript לא מאפשר"
      ],
      correctIndex: 0,
      explanation: "useCallback רק עוזר אם הילד עוצר re-render לפי props comparison.",
      optionFeedback: [
        "✅ נכון. שניהם צריכים לעבוד יחד.",
        "❌ useCallback בלבד = רק overhead.",
        "❌ syntax תקין.",
        "❌ TS תומך ב-Hook."
      ]
    },
    // ─── async generations (diff 8) ───
    {
      id: "mc_async_p_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 7,
      question: "Promise.all vs Promise.allSettled — ההבדל הקריטי:",
      options: [
        "all = fail-fast (אחד נכשל → הכל נדחה). allSettled = ממתין לכולם, מחזיר state לכל",
        "אותו דבר",
        "all = sequential, allSettled = parallel",
        "allSettled לא קיים"
      ],
      correctIndex: 0,
      explanation: "כשרוצים reporting עם נכשלים — allSettled. כשהכל-או-כלום — all.",
      optionFeedback: [
        "✅ נכון. ההבדל הקריטי בבחירה.",
        "❌ יש הבדל מהותי.",
        "❌ שתיהן מקבילות.",
        "❌ קיים מ-ES2020."
      ]
    },
    {
      id: "mc_async_p_002",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 8,
      question: "`async function f(){throw new Error('x')}` — קריאה ל-f():",
      options: [
        "מחזירה Promise נדחה — ניתן לתפוס ב-.catch או try/await",
        "זורקת מיד שגיאה sync",
        "מחזירה undefined",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "async עוטפת throw ב-Promise rejection.",
      optionFeedback: [
        "✅ נכון. async תמיד מחזירה Promise.",
        "❌ async עוטפת — לא sync throw.",
        "❌ Promise נדחה, לא undefined.",
        "❌ אין TypeError."
      ]
    },
    {
      id: "mc_async_p_003",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 7,
      question: "Sequential vs parallel async — איך לבצע 5 fetch במקביל?",
      options: [
        "`await Promise.all(urls.map(u => fetch(u)))`",
        "`for (const u of urls) await fetch(u)`",
        "`urls.forEach(async u => await fetch(u))`",
        "`urls.map(u => await fetch(u))`"
      ],
      correctIndex: 0,
      explanation: "map יוצר 5 Promises שכבר רצים. all מחכה לכולם.",
      optionFeedback: [
        "✅ נכון. parallel — חוסך ~80% זמן.",
        "❌ זה sequential — חכמה ל-1 בכל פעם.",
        "❌ forEach לא ממתין.",
        "❌ syntax error — await רק ב-async."
      ]
    },
    // ─── More memory_variables ───
    {
      id: "mc_l11_byref_p_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::By Reference",
      level: 7,
      question: "function f(o){o.x=1; o=null;} const a={}; f(a); a — מה?",
      options: [
        "{x:1} — ה-mutation דרך o השפיע על a; o=null משנה רק העתק מקומי",
        "null — o=null השפיע",
        "{} — שום שינוי",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "param o הוא pointer copy. mutation דרך pointer = שינוי משותף. reassignment של pointer = לוקלי.",
      optionFeedback: [
        "✅ נכון. הבחנה בין mutation ל-reassignment.",
        "❌ o=null מחליף רק את ה-pointer המקומי.",
        "❌ ה-mutation דרך o.x=1 משפיע.",
        "❌ אין שגיאה."
      ]
    },
    {
      id: "mc_l11_pointer_p_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::Pointer",
      level: 7,
      question: "[1,2] === [1,2] — מה?",
      options: [
        "false — שני arrays שונים בHeap, pointers שונים",
        "true — אותו תוכן",
        "TypeError",
        "[]"
      ],
      correctIndex: 0,
      explanation: "=== על objects = pointer compare. דורש lodash isEqual ל-deep.",
      optionFeedback: [
        "✅ נכון. JS אין deep equality מובנה.",
        "❌ זה לא בדיקת תוכן.",
        "❌ אין שגיאה.",
        "❌ זה לא array literal."
      ]
    },
    // ─── more useEffect ───
    {
      id: "mc_l24_useff_p_005",
      topicId: "topic_react",
      conceptKey: "lesson_24::useEffect",
      level: 8,
      question: "useEffect מפלת ב-StrictMode (dev) — לא כי יש bug, אלא כי:",
      options: [
        "React 18+ מריץ effect פעמיים בdev כדי לחשוף bugs של missing cleanup",
        "Bug ב-React",
        "סיומת לא תקינה",
        "TS חסום"
      ],
      correctIndex: 0,
      explanation: "Strict Mode dev-only behavior. בייצור — פעם אחת.",
      optionFeedback: [
        "✅ נכון. dev-only feature.",
        "❌ זו תכונת dev מכוונת.",
        "❌ syntax תקין.",
        "❌ זה JS pure."
      ]
    },
    {
      id: "mc_l24_useff_p_006",
      topicId: "topic_react",
      conceptKey: "lesson_24::useEffect",
      level: 7,
      question: "מתי useLayoutEffect במקום useEffect?",
      options: [
        "כשצריך למדוד DOM סינכרוני לפני paint (הימנעות מflicker)",
        "תמיד — מהיר יותר",
        "רק ב-class components",
        "אף פעם"
      ],
      correctIndex: 0,
      explanation: "useLayoutEffect blocking. useEffect after-paint async.",
      optionFeedback: [
        "✅ נכון. רק כשmust-sync.",
        "❌ blocking = איטי יותר באופן עקבי.",
        "❌ זה Hook.",
        "❌ יש לו role ספציפי."
      ]
    },
    // ─── More useEffect cleanup ───
    {
      id: "mc_l24_useff_cleanup_p_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useEffect",
      level: 7,
      question: "מה החזיר ה-effect כדי שcleanup ירוץ?",
      options: [
        "function — `return () => clearInterval(id)`",
        "Promise",
        "object",
        "string"
      ],
      correctIndex: 0,
      explanation: "Cleanup חייב להיות פונקציה. כל אחר נזרק ב-warning.",
      optionFeedback: [
        "✅ נכון. function fire on cleanup.",
        "❌ async effect לא נתמך — חייב function.",
        "❌ object לא טריגר cleanup.",
        "❌ string לא תקני."
      ]
    },
    // ─── more closures ───
    {
      id: "mc_closure_useeffect_p_001",
      topicId: "topic_closures",
      conceptKey: "lesson_closures::closure",
      level: 8,
      question: "`useEffect(() => setInterval(() => setN(n+1), 1000), [])` — בעיה?",
      options: [
        "stale closure: n קפוא ב-render הראשון. גם — leak (אין cleanup)",
        "אין בעיה",
        "syntax error",
        "JS לא תומך"
      ],
      correctIndex: 0,
      explanation: "פתרון: functional update (setN(prev=>prev+1)) + return cleanup.",
      optionFeedback: [
        "✅ נכון. שני באגים בקטע אחד.",
        "❌ זה classic problem.",
        "❌ syntax תקין.",
        "❌ JS תומך מצוין."
      ]
    },
    // ─── async generations more ───
    {
      id: "mc_async_p_004",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 7,
      question: "Promise.race vs Promise.any:",
      options: [
        "race = ראשון שsettled (success או fail). any = ראשון שsuccess",
        "אותו דבר",
        "any לא קיים",
        "race רק ל-success"
      ],
      correctIndex: 0,
      explanation: "any = OR (מספיק אחד). race = first.",
      optionFeedback: [
        "✅ נכון. הבדל ראשי בערך הכישלון.",
        "❌ הם שונים מהותית.",
        "❌ קיים מ-2021.",
        "❌ race תופס גם כישלון ראשון."
      ]
    },
    // ─── DOM events / array ref ───
    {
      id: "mc_l13_event_p_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::event",
      level: 6,
      question: "Event delegation — היתרון:",
      options: [
        "listener אחד על parent במקום N על children — חוסך זיכרון + עובד עם dynamic children",
        "מהיר יותר תמיד",
        "syntax error",
        "browser-specific"
      ],
      correctIndex: 0,
      explanation: "click bubble → parent. e.target זה הילד שעליו לחצו.",
      optionFeedback: [
        "✅ נכון. שני יתרונות חזקים.",
        "❌ זה לא תמיד מהיר — תלוי במקרה.",
        "❌ syntax תקין.",
        "❌ עובד בכל הדפדפנים המודרניים."
      ]
    },
    // ─── Memory variables ───
    {
      id: "mc_l11_let_p_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::let",
      level: 5,
      question: "TDZ של let:",
      options: [
        "Temporal Dead Zone — ReferenceError אם ניגשים ללפני ההצהרה",
        "אין TDZ",
        "var גם בTDZ",
        "מספר שגיאות מותר"
      ],
      correctIndex: 0,
      explanation: "Hoisted אבל לא ניתן לגישה. שונה מ-var שמקבל undefined.",
      optionFeedback: [
        "✅ נכון. let/const לא var.",
        "❌ TDZ קיים.",
        "❌ var hoisted עם undefined — לא TDZ.",
        "❌ TDZ זריקה ברורה."
      ]
    },
    {
      id: "mc_l11_const_p_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::const",
      level: 5,
      question: "`const x;` — מה קורה?",
      options: [
        "SyntaxError — const חייב initializer",
        "x = undefined",
        "x = null",
        "x = 0"
      ],
      correctIndex: 0,
      explanation: "const חייב ערך התחלתי. let אופציונלי.",
      optionFeedback: [
        "✅ נכון. compile-time שגיאה.",
        "❌ const = חובה.",
        "❌ אין ברירת מחדל ל-null.",
        "❌ אין coerce ל-0."
      ]
    },
    // ─── more closures ───
    {
      id: "mc_closure_p_004",
      topicId: "topic_closures",
      conceptKey: "lesson_closures::closure",
      level: 7,
      question: "Closure גורם memory leak כש:",
      options: [
        "ה-closure מחזיק references ל-DOM elements שכבר הוסרו, ואין dispose",
        "אף פעם — GC עובד תמיד",
        "תמיד",
        "רק ב-Node"
      ],
      correctIndex: 0,
      explanation: "GC עוקב אחר reachability. closure שחי = references שלו חיים.",
      optionFeedback: [
        "✅ נכון. סוג ה-leak הקלאסי.",
        "❌ GC לא יכול לאסוף ערכים שעדיין reachable.",
        "❌ closure לרוב לא מדליפ — רק במקרי edge.",
        "❌ Node ו-Browser שניהם."
      ]
    },
    // Memory variables continuation
    {
      id: "mc_l11_byval_p_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::By Value",
      level: 6,
      question: "`function double(n) { n *= 2; return n; }` — האם משנה את המקור?",
      options: [
        "לא — primitive copy by value, n פנימי הוא העתק",
        "כן — מכפיל את הarg",
        "TypeError",
        "לפעמים"
      ],
      correctIndex: 0,
      explanation: "primitives by-value בpassing.",
      optionFeedback: [
        "✅ נכון. by-value = העתק מקומי.",
        "❌ ההיפך — לא משפיע.",
        "❌ אין שגיאה.",
        "❌ דטרמיניסטי."
      ]
    },
  ],
  fill: [
    {
      id: "fill_l24_useff_p_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useEffect",
      level: 7,
      code: "useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => ____(id);\n}, []);",
      answer: "clearInterval",
      explanation: "cleanup חיוני — אחרת interval ימשיך אחרי unmount."
    },
    {
      id: "fill_l24_useff_p_002",
      topicId: "topic_react",
      conceptKey: "lesson_24::dependency array",
      level: 8,
      code: "useEffect(() => {\n  setN(____ => prev + 1);\n}, []);  // functional update — no stale closure",
      answer: "prev",
      explanation: "Functional update תמיד מקבל את הערך הטרי."
    },
    {
      id: "fill_l11_byref_p_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::By Reference",
      level: 7,
      code: "const a = { x: 1 };\nconst b = ____(a);  // deep copy modern\nb.x = 99;\nconsole.log(a.x);  // still 1",
      answer: "structuredClone",
      explanation: "structuredClone deep clone שעובד עם Date/Map/Set."
    },
    {
      id: "fill_closure_p_001",
      topicId: "topic_closures",
      conceptKey: "lesson_closures::closure",
      level: 7,
      code: "function makeCounter() {\n  let count = 0;\n  return () => ____count;\n}\nconst inc = makeCounter();\ninc(); inc(); inc();  // 3",
      answer: "++",
      explanation: "++ before increments and returns new value."
    },
    {
      id: "fill_async_p_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 7,
      code: "// Run all in parallel\nconst results = await Promise.____(\n  urls.map(u => fetch(u))\n);",
      answer: "all",
      explanation: "Promise.all — fail-fast, returns array."
    },
    {
      id: "fill_async_p_002",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 8,
      code: "// Get first successful, allow others to fail\nconst result = await Promise.____(\n  cdns.map(cdn => fetch(cdn))\n);",
      answer: "any",
      explanation: "Promise.any — first fulfilled wins, AggregateError if all reject."
    },
    {
      id: "fill_l24_memo_p_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 7,
      code: "const sorted = ____(\n  () => items.sort((a,b) => a-b),\n  [items]\n);",
      answer: "useMemo",
      explanation: "useMemo cache result of expensive computation."
    },
    {
      id: "fill_l11_let_p_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::let",
      level: 4,
      code: "for (____ i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n// 0, 1, 2",
      answer: "let",
      explanation: "let block-scoped per iteration."
    },
    {
      id: "fill_l22_setstate_p_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::state",
      level: 6,
      code: "// Add item without mutation\nsetItems(prev => [____prev, newItem]);",
      answer: "...",
      explanation: "Spread for immutable update."
    },
    {
      id: "fill_l11_destr_p_001",
      topicId: "topic_variables",
      conceptKey: "lesson_11::object",
      level: 5,
      code: "const { name, ...____ } = user;\n// rest = all other props",
      answer: "rest",
      explanation: "Object rest in destructuring."
    },
    {
      id: "fill_closure_modular_p_001",
      topicId: "topic_closures",
      conceptKey: "lesson_closures::closure",
      level: 7,
      code: "// IIFE module pattern\nconst counter = ____() {\n  let n = 0;\n  return { inc: () => ++n, get: () => n };\n})();",
      answer: "(function",
      explanation: "IIFE wraps function to invoke immediately."
    },
    {
      id: "fill_l13_event_p_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::event",
      level: 6,
      code: "// Stop click from reaching parent\nbtn.addEventListener('click', e => {\n  e.____();\n});",
      answer: "stopPropagation",
      explanation: "stopPropagation halts bubble."
    },
    {
      id: "fill_eventloop_p_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::setTimeout",
      level: 7,
      code: "// Schedule after sync code, before next macrotask\nqueue____(() => updateUI());",
      answer: "Microtask",
      explanation: "queueMicrotask schedules to microtask queue."
    },
    {
      id: "fill_l24_callback_p_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 7,
      code: "// Stable callback for memo'd child\nconst onClick = ____(\n  () => fn(id),\n  [id]\n);",
      answer: "useCallback",
      explanation: "useCallback caches function reference."
    },
    {
      id: "fill_promise_then_p_001",
      topicId: "topic_async",
      conceptKey: "lesson_15::Promise",
      level: 6,
      code: "fetch('/api')\n  .then(r => r.json())\n  .____(err => console.error(err));",
      answer: "catch",
      explanation: "Promise.catch handles rejections."
    },
  ],
};
