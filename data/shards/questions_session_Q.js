// data/shards/questions_session_Q.js
// Sprint 2 batch Q — React Hooks deep coverage
// 50 questions: 35 MC + 15 Fill targeting useState/useEffect/useMemo/useRef/Hook/state/props

window.QUESTIONS_SHARD_Q = {
  mc: [
    // ─── useState patterns ───
    {
      id: "mc_l22_usestate_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::useState",
      level: 5,
      question: "מה useState(0) מחזיר?",
      options: [
        "tuple [value, setter] — מערך עם 2 איברים",
        "object {value, setter}",
        "function רק setter",
        "0 מיד"
      ],
      correctIndex: 0,
      explanation: "Destructuring טיפוסי: const [n, setN] = useState(0).",
      optionFeedback: [
        "✅ נכון. tuple-style return מתפרק ב-destructuring.",
        "❌ זה array, לא object. סדר חשוב.",
        "❌ value נחוץ גם — לא רק setter.",
        "❌ זה הערך ההתחלתי, אבל מוחזר במערך."
      ]
    },
    {
      id: "mc_l22_usestate_q_002",
      topicId: "topic_react",
      conceptKey: "lesson_22::useState",
      level: 7,
      question: "lazy initialization — מתי משתמשים?",
      options: [
        "כשהערך ההתחלתי יקר לחישוב — useState(() => parseHugeJSON()) רץ פעם 1",
        "תמיד עדיף",
        "לא קיים",
        "רק עם class components"
      ],
      correctIndex: 0,
      explanation: "useState מעריך function רק ב-mount. ערך ישיר נבדק בכל render.",
      optionFeedback: [
        "✅ נכון. בלעדיה ה-init רץ בכל render — בזבוז.",
        "❌ ל-primitive פשוט יקר יותר לעטוף.",
        "❌ קיים ב-React מ-16.8.",
        "❌ Hook = function components."
      ]
    },
    {
      id: "mc_l22_usestate_q_003",
      topicId: "topic_react",
      conceptKey: "lesson_22::useState",
      level: 6,
      question: "functional update vs direct set:",
      options: [
        "setN(prev=>prev+1) תמיד מקבל הערך הטרי. setN(n+1) קופא ב-closure",
        "אותו דבר",
        "functional עוצר את הקומפוננטה",
        "direct set מהיר יותר"
      ],
      correctIndex: 0,
      explanation: "Functional update חיוני בasync chains.",
      optionFeedback: [
        "✅ נכון. הבדל קריטי לreentrancy.",
        "❌ direct set יוצר stale closure.",
        "❌ functional update הוא הסטנדרט.",
        "❌ ההבדל בנכונות, לא במהירות."
      ]
    },
    {
      id: "mc_l22_usestate_q_004",
      topicId: "topic_react",
      conceptKey: "lesson_22::setState",
      level: 7,
      question: "Batching ב-React 18+:",
      options: [
        "כל setState ב-event handler ובasync callbacks מאוחדים ל-render אחד",
        "כל setState מבצע render מיידי",
        "רק ב-class components",
        "אסור מספר setState"
      ],
      correctIndex: 0,
      explanation: "React 17 רק batched בevent handlers. 18+ אוטומטי בכל מקום.",
      optionFeedback: [
        "✅ נכון. שיפור ביצועים ב-React 18.",
        "❌ batching מונע multiple renders.",
        "❌ קיים גם ב-Hooks.",
        "❌ אפשר במגבלת הfiber."
      ]
    },
    {
      id: "mc_l22_usestate_q_005",
      topicId: "topic_react",
      conceptKey: "lesson_22::useState",
      level: 7,
      question: "setState(same value) ב-React:",
      options: [
        "Object.is מזהה — bailout, אין re-render",
        "תמיד re-renders",
        "זורק error",
        "ממיר ל-undefined"
      ],
      correctIndex: 0,
      explanation: "React בודק עם Object.is. שווים → skip render.",
      optionFeedback: [
        "✅ נכון. אופטימיזציה אוטומטית.",
        "❌ React חכם מספיק לדלג.",
        "❌ אין שגיאה.",
        "❌ אין coerce."
      ]
    },
    // ─── useEffect patterns ───
    {
      id: "mc_l24_useff_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useEffect",
      level: 6,
      question: "מתי useEffect(fn) (ללא deps) רץ?",
      options: [
        "אחרי כל render — לרוב bug",
        "פעם אחת ב-mount",
        "אף פעם",
        "ב-unmount בלבד"
      ],
      correctIndex: 0,
      explanation: "ללא deps = רץ אחרי כל commit. כמעט תמיד shotgun bug.",
      optionFeedback: [
        "✅ נכון. ללא deps = כל render.",
        "❌ זה useEffect(fn, []).",
        "❌ הוא רץ בכל render אם אין deps.",
        "❌ cleanup ב-unmount, לא ה-effect."
      ]
    },
    {
      id: "mc_l24_useff_q_002",
      topicId: "topic_react",
      conceptKey: "lesson_24::useEffect",
      level: 7,
      question: "Async ב-useEffect:",
      options: [
        "אסור: useEffect callback צריך להיות sync (או void). פתרון: define async inside",
        "מותר ישיר: useEffect(async () => {})",
        "TypeScript מאפשר",
        "Promise אסור"
      ],
      correctIndex: 0,
      explanation: "useEffect callback מצפה ל-cleanup function או undefined. async מחזירה Promise.",
      optionFeedback: [
        "✅ נכון. pattern: async function inside, then call.",
        "❌ React warning + cleanup לא מובן.",
        "❌ TS חוסם זאת ב-strict.",
        "❌ Promise נפוצה ב-useEffect, רק לא ישיר."
      ]
    },
    {
      id: "mc_l24_useff_q_003",
      topicId: "topic_react",
      conceptKey: "lesson_24::useEffect",
      level: 8,
      question: "fetch ב-useEffect — race condition pattern:",
      options: [
        "user מחליף props מהר → תגובה ישנה מגיעה אחרי חדשה. פתרון: ignore flag או AbortController",
        "אין race conditions",
        "React מטפל אוטומטית",
        "fetch לא נתמך"
      ],
      correctIndex: 0,
      explanation: "Cleanup מבטל request הישן או מתעלם מהתגובה.",
      optionFeedback: [
        "✅ נכון. בעיה אמיתית, צריך ידני.",
        "❌ קיימים — בעיה ידועה.",
        "❌ React לא יודע על fetches.",
        "❌ נתמך, רק עם זהירות."
      ]
    },
    {
      id: "mc_l24_useff_q_004",
      topicId: "topic_react",
      conceptKey: "lesson_24::useEffect",
      level: 7,
      question: "useEffect cleanup לאיזה דברים חיוני?",
      options: [
        "subscriptions, timers, event listeners — כל מה שלא מתנקה אוטומטית",
        "רק timers",
        "רק subscribers",
        "אף דבר"
      ],
      correctIndex: 0,
      explanation: "memory leak אם לא מנקים. cleanup מובטח להריץ.",
      optionFeedback: [
        "✅ נכון. כל side effect דורש cleanup.",
        "❌ יש עוד דברים.",
        "❌ יש עוד דברים.",
        "❌ חיוני בהרבה מקרים."
      ]
    },
    {
      id: "mc_l24_useff_q_005",
      topicId: "topic_react",
      conceptKey: "lesson_24::useEffect",
      level: 8,
      question: "useEffect vs useLayoutEffect — מתי useLayoutEffect?",
      options: [
        "כשצריך למדוד DOM סינכרוני לפני paint (מונע flicker)",
        "תמיד עדיף",
        "אסור להשתמש",
        "רק ב-class"
      ],
      correctIndex: 0,
      explanation: "useLayoutEffect blocking. מאט paint. רק כשצריך layout sync.",
      optionFeedback: [
        "✅ נכון. שימוש ספציפי לבעיות layout.",
        "❌ blocking = איטי כברירת מחדל.",
        "❌ יש מקרי-שימוש לגיטימיים.",
        "❌ זה Hook = function only."
      ]
    },
    // ─── useMemo / useCallback ───
    {
      id: "mc_l24_memo_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 7,
      question: "useMemo signature:",
      options: [
        "useMemo(() => expensive(), [deps]) — מחזיר value cached",
        "useMemo(value, [deps])",
        "useMemo(deps, () => value)",
        "useMemo(value)"
      ],
      correctIndex: 0,
      explanation: "פונקציה ראשונה — חישוב. deps שני — שינוי.",
      optionFeedback: [
        "✅ נכון. useMemo cache return value of fn.",
        "❌ סדר הפוך.",
        "❌ סדר הפוך.",
        "❌ deps array חיוני."
      ]
    },
    {
      id: "mc_l24_memo_q_002",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 8,
      question: "useMemo נכון לשמור object/array stable identity:",
      options: [
        "כן — useMemo מבטיח אותו reference אם deps לא השתנו",
        "לא — תמיד יוצר חדש",
        "רק ל-primitives",
        "רק ל-objects"
      ],
      correctIndex: 0,
      explanation: "Use case: object/array prop ל-React.memo child or useEffect dep.",
      optionFeedback: [
        "✅ נכון. שימוש מרכזי של useMemo.",
        "❌ הפוך — useMemo דווקא משמר reference.",
        "❌ עובד לכל ערך.",
        "❌ עובד לכל סוג."
      ]
    },
    {
      id: "mc_l24_callback_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 7,
      question: "useCallback shorthand ל-useMemo:",
      options: [
        "useCallback(fn, deps) ≡ useMemo(()=>fn, deps)",
        "useCallback רק לאסינכרוניות",
        "useCallback מוחק את הפונקציה",
        "אין קשר ביניהם"
      ],
      correctIndex: 0,
      explanation: "useCallback פשוט עוטף useMemo עם פונקציה שמחזירה את ה-fn.",
      optionFeedback: [
        "✅ נכון. שקילות מתועדת ברשמית.",
        "❌ לא קשור לאסינכרוני.",
        "❌ הוא משמר אותה.",
        "❌ קשר ישיר."
      ]
    },
    {
      id: "mc_l24_memo_q_003",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 8,
      question: "Over-memoization בעיות:",
      options: [
        "shallow compare overhead + memory + complicate code. measure first",
        "תמיד שיפור",
        "אין downsides",
        "אסור useMemo"
      ],
      correctIndex: 0,
      explanation: "Profile-driven optimization. רוב הקוד לא צריך memo.",
      optionFeedback: [
        "✅ נכון. premature memoization = pre-optimization.",
        "❌ לא תמיד.",
        "❌ יש cost.",
        "❌ יש שימושים נכונים."
      ]
    },
    // ─── useRef ───
    {
      id: "mc_l24_useref_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useRef",
      level: 6,
      question: "useRef מחזיר:",
      options: [
        "object {current: initialValue} — mutable container",
        "function setter",
        "value ישיר",
        "Promise"
      ],
      correctIndex: 0,
      explanation: "ref.current = mutable. שינוי לא triggers re-render.",
      optionFeedback: [
        "✅ נכון.",
        "❌ אין setter — ישיר mutable.",
        "❌ עטוף ב-{current}.",
        "❌ sync."
      ]
    },
    {
      id: "mc_l24_useref_q_002",
      topicId: "topic_react",
      conceptKey: "lesson_24::useRef",
      level: 7,
      question: "useRef למה (לא DOM):",
      options: [
        "לערכים שצריך לשמר בין renders אבל לא לטריגר render — timer IDs, prev values",
        "תמיד DOM",
        "אסור ללא DOM",
        "רק class"
      ],
      correctIndex: 0,
      explanation: "Use case שני: 'instance variable' equivalent ל-function components.",
      optionFeedback: [
        "✅ נכון. שימוש מרכזי שני.",
        "❌ DOM הוא מקרה אחד.",
        "❌ legitimate.",
        "❌ Hook ל-functions בלבד."
      ]
    },
    {
      id: "mc_l24_useref_q_003",
      topicId: "topic_react",
      conceptKey: "lesson_24::useRef",
      level: 7,
      question: "אסור לעשות עם useRef:",
      options: [
        "לקרוא ref.current ב-render — רק ב-effects/handlers (consistency)",
        "לכתוב ב-event",
        "לאפס ב-cleanup",
        "ל-DOM"
      ],
      correctIndex: 0,
      explanation: "ref לא reactive. קריאה ב-render = inconsistent.",
      optionFeedback: [
        "✅ נכון. anti-pattern.",
        "❌ legitimate.",
        "❌ legitimate.",
        "❌ זה השימוש המרכזי."
      ]
    },
    // ─── props vs state ───
    {
      id: "mc_l22_props_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::props",
      level: 5,
      question: "Props mutation בילד:",
      options: [
        "אסור — props read-only מנקודת מבט הילד. אם רוצים לשנות → state",
        "מותר",
        "רק עם state",
        "רק ב-class"
      ],
      correctIndex: 0,
      explanation: "One-way data flow: parent → child via props.",
      optionFeedback: [
        "✅ נכון. unidirectional flow.",
        "❌ אנטי-pattern.",
        "❌ state פנימי לילד.",
        "❌ זה ב-Hooks וגם ב-class."
      ]
    },
    {
      id: "mc_l22_props_q_002",
      topicId: "topic_react",
      conceptKey: "lesson_22::props",
      level: 6,
      question: "Prop drilling — מה?",
      options: [
        "העברת props דרך מספר רב של רמות — anti-pattern בעומק 3+",
        "API חדש",
        "TypeScript feature",
        "shorthand"
      ],
      correctIndex: 0,
      explanation: "פתרון: Context, composition, או state library.",
      optionFeedback: [
        "✅ נכון. בעיה ידועה.",
        "❌ דפוס שלילי.",
        "❌ JS pattern.",
        "❌ זה anti-pattern."
      ]
    },
    {
      id: "mc_l22_state_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::state",
      level: 6,
      question: "state vs context:",
      options: [
        "state = local. context = passed implicitly to descendants",
        "אותו דבר",
        "context הוא state גלובלי",
        "state רק ב-class"
      ],
      correctIndex: 0,
      explanation: "state ב-component עצמו. context משפיע על subtree.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הבדל קריטי.",
        "❌ context ב-subtree, לא גלובלי.",
        "❌ state ב-Hooks."
      ]
    },
    // ─── Hook rules ───
    {
      id: "mc_l22_hook_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::Hook",
      level: 7,
      question: "Rules of Hooks #1:",
      options: [
        "רק ב-top level — לא בתוך if/loop/nested function",
        "רק ב-async",
        "רק ב-class",
        "אסור עם useState"
      ],
      correctIndex: 0,
      explanation: "React שומר ב-fiber linked list לפי סדר. order matters.",
      optionFeedback: [
        "✅ נכון.",
        "❌ Hooks sync.",
        "❌ class לא תומך.",
        "❌ הם ביחד."
      ]
    },
    {
      id: "mc_l22_hook_q_002",
      topicId: "topic_react",
      conceptKey: "lesson_22::Hook",
      level: 6,
      question: "Rules of Hooks #2:",
      options: [
        "רק ב-React function components או custom hooks",
        "כל מקום",
        "רק ב-async functions",
        "רק ב-events"
      ],
      correctIndex: 0,
      explanation: "ESLint plugin אוכף.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הגבלה ידועה.",
        "❌ Hooks sync.",
        "❌ events הם רק חלק."
      ]
    },
    {
      id: "mc_custom_hook_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::Hook",
      level: 7,
      question: "Custom hook שם:",
      options: [
        "חייב להתחיל ב-use — useToggle, useFetch",
        "כל שם",
        "חייב לסיים ב-Hook",
        "PascalCase"
      ],
      correctIndex: 0,
      explanation: "ESLint plugin בודק את הקונבנציה.",
      optionFeedback: [
        "✅ נכון.",
        "❌ קונבנציה אוכפת.",
        "❌ הפוך.",
        "❌ camelCase."
      ]
    },
    // ─── React.memo ───
    {
      id: "mc_react_memo_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 7,
      question: "React.memo הופך component ל...?",
      options: [
        "memoized — bypass re-render אם props shallow-equal",
        "stateless",
        "async",
        "class component"
      ],
      correctIndex: 0,
      explanation: "shallow comparison של props. equal → bailout.",
      optionFeedback: [
        "✅ נכון.",
        "❌ memo לא משנה state.",
        "❌ memo sync.",
        "❌ memo משמר את הסוג."
      ]
    },
    // ─── More useEffect ───
    {
      id: "mc_l24_useff_q_006",
      topicId: "topic_react",
      conceptKey: "lesson_24::useEffect",
      level: 8,
      question: "Strict Mode + useEffect ב-React 18:",
      options: [
        "ב-dev — useEffect רץ פעמיים. חושף missing cleanup",
        "רק ב-production",
        "Bug ב-React",
        "Hook לא תומך"
      ],
      correctIndex: 0,
      explanation: "Intentional dev behavior. בtיצור — פעם אחת.",
      optionFeedback: [
        "✅ נכון.",
        "❌ ב-dev בלבד.",
        "❌ זו תכונה.",
        "❌ Hook תומך."
      ]
    },
    // ─── More useMemo ───
    {
      id: "mc_l24_memo_q_004",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 7,
      question: "useMemo במקרים שלא צריך:",
      options: [
        "חישוב זול. props פשוטים. אין children memoized",
        "תמיד צריך",
        "אף פעם לא צריך",
        "רק ב-async"
      ],
      correctIndex: 0,
      explanation: "Profile first. אופטימיזציה ניתנת למדידה.",
      optionFeedback: [
        "✅ נכון.",
        "❌ overhead-cost.",
        "❌ יש מקרים נכונים.",
        "❌ sync."
      ]
    },
    // ─── More state patterns ───
    {
      id: "mc_l22_setstate_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::setState",
      level: 6,
      question: "Multiple setState ב-event:",
      options: [
        "Batched — רק render אחד אחרי כל ה-events מטופלים",
        "Render אחד לכל setState",
        "אסור multiple",
        "אסינכרוני בלבד"
      ],
      correctIndex: 0,
      explanation: "React batches בdefault מ-18+.",
      optionFeedback: [
        "✅ נכון.",
        "❌ batching מובנה.",
        "❌ legitimate pattern.",
        "❌ React מטפל sync ב-events."
      ]
    },
    {
      id: "mc_l22_setstate_q_002",
      topicId: "topic_react",
      conceptKey: "lesson_22::setState",
      level: 7,
      question: "setState async — למה לא לקרוא state אחרי?",
      options: [
        "setState scheduling — state עדיין ערך ישן עד הrender הבא",
        "TypeError",
        "state יוצא null",
        "אסור setState"
      ],
      correctIndex: 0,
      explanation: "אם רוצים מחושב — useEffect/functional update.",
      optionFeedback: [
        "✅ נכון. confusing for newcomers.",
        "❌ אין שגיאה.",
        "❌ ערך ישן.",
        "❌ מחויב."
      ]
    },
    // ─── More state ───
    {
      id: "mc_l22_state_lift_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::state",
      level: 7,
      question: "Lifting state up:",
      options: [
        "כשמספר children צריכים אותו state — להעלות לאב המשותף",
        "אסור",
        "תמיד גלובלי",
        "רק ב-class"
      ],
      correctIndex: 0,
      explanation: "Pattern נפוץ. אם 3+ עלית → context.",
      optionFeedback: [
        "✅ נכון.",
        "❌ pattern לגיטימי.",
        "❌ לא תמיד.",
        "❌ Hooks תומכים."
      ]
    },
    // ─── More custom hooks ───
    {
      id: "mc_l22_customhook_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::Hook",
      level: 7,
      question: "useDebounce custom hook — מה הוא משיג?",
      options: [
        "מחזיר value מאוחר ב-N ms — מונע ricochet בעת typing",
        "מהיר יותר",
        "stops execution",
        "TypeScript only"
      ],
      correctIndex: 0,
      explanation: "Pattern קלאסי לsearch boxes.",
      optionFeedback: [
        "✅ נכון.",
        "❌ דחיית triggers.",
        "❌ ממשיך.",
        "❌ JS native."
      ]
    },
    // ─── useMemo vs useState pattern ───
    {
      id: "mc_l24_memo_vs_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 8,
      question: "useMemo vs useState — מה ההבדל הקונספטואלי?",
      options: [
        "useMemo = derived value (מחושב מ-deps). useState = primary value (משתנה ידנית)",
        "אותו דבר",
        "useState רק primitives",
        "useMemo cleanup"
      ],
      correctIndex: 0,
      explanation: "If derivable, prefer useMemo to avoid sync issues.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הבדל מהותי.",
        "❌ useState עובד כל סוג.",
        "❌ אין cleanup ב-useMemo."
      ]
    },
    // ─── useEffect deps subtle ───
    {
      id: "mc_l24_useff_q_007",
      topicId: "topic_react",
      conceptKey: "lesson_24::dependency array",
      level: 9,
      question: "Function ב-deps שיוצר infinite loop:",
      options: [
        "function literal משתנה בכל render. עוטפים ב-useCallback או מוצאים חוץ",
        "אסור function ב-deps",
        "TypeScript warning",
        "אין infinite loop"
      ],
      correctIndex: 0,
      explanation: "כל render → fn חדש → effect runs → state update → render again.",
      optionFeedback: [
        "✅ נכון.",
        "❌ לגיטימי.",
        "❌ לא runtime issue.",
        "❌ זה הbug."
      ]
    },
    {
      id: "mc_l24_useff_q_008",
      topicId: "topic_react",
      conceptKey: "lesson_24::dependency array",
      level: 8,
      question: "primitives ב-deps:",
      options: [
        "stable — Object.is יזהה כשווים. ב-objects/functions צריך useMemo",
        "תמיד re-create",
        "אסור primitives",
        "רק strings"
      ],
      correctIndex: 0,
      explanation: "primitives by-value. references by-pointer.",
      optionFeedback: [
        "✅ נכון.",
        "❌ stable היא הציפייה.",
        "❌ זה השימוש העיקרי.",
        "❌ כל סוג primitive."
      ]
    },
    // ─── useState array/object update ───
    {
      id: "mc_l22_usestate_q_006",
      topicId: "topic_react",
      conceptKey: "lesson_22::useState",
      level: 7,
      question: "Update nested state:",
      options: [
        "Spread כל רמה: ({...s, user: {...s.user, name: 'X'}}). או immer.",
        "ישיר: s.user.name = 'X'",
        "אי אפשר",
        "אוטומטי"
      ],
      correctIndex: 0,
      explanation: "Immutable updates verbose. immer מספק illusion of mutation.",
      optionFeedback: [
        "✅ נכון.",
        "❌ mutation = anti-pattern.",
        "❌ אפשרי, רק verbose.",
        "❌ ידני."
      ]
    },
    // ─── Hook composition ───
    {
      id: "mc_l22_hook_q_003",
      topicId: "topic_react",
      conceptKey: "lesson_22::Hook",
      level: 8,
      question: "useReducer מתי במקום useState?",
      options: [
        "state מורכב עם actions מובחנים — state machines",
        "תמיד עדיף",
        "אסור useReducer",
        "רק primitives"
      ],
      correctIndex: 0,
      explanation: "כש-2+ state vars תלויים אחד בשני.",
      optionFeedback: [
        "✅ נכון.",
        "❌ overkill לפשוט.",
        "❌ Hook לגיטימי.",
        "❌ שניהם תומכים בכל סוג."
      ]
    },
    // ─── Mock state machines ───
    {
      id: "mc_react_state_q_002",
      topicId: "topic_react",
      conceptKey: "lesson_22::state",
      level: 7,
      question: "Discriminated union לstate machine:",
      options: [
        "type State = {kind:'loading'} | {kind:'ok',data:T} | {kind:'err',msg:string}",
        "object רגיל",
        "boolean dirty flag",
        "אסור"
      ],
      correctIndex: 0,
      explanation: "מונע 'imp possibility states'. TS narrowing מצוין.",
      optionFeedback: [
        "✅ נכון.",
        "❌ פחות בטוח.",
        "❌ פחות מבני.",
        "❌ pattern מצוין."
      ]
    },
  ],
  fill: [
    {
      id: "fill_l22_usestate_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::useState",
      level: 5,
      code: "const [count, ____] = useState(0);\n// קוראים ל-setter עם prev => prev + 1",
      answer: "setCount",
      explanation: "useState מחזיר [value, setter]."
    },
    {
      id: "fill_l24_useff_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useEffect",
      level: 6,
      code: "useEffect(() => {\n  fetchData();\n}, [____]);  // ירוץ כש-userId משתנה",
      answer: "userId",
      explanation: "deps array מכיל את המשתנים שעוקבים אחריהם."
    },
    {
      id: "fill_l24_memo_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 7,
      code: "const sorted = ____(\n  () => items.sort((a,b)=>a-b),\n  [items]\n);",
      answer: "useMemo",
      explanation: "useMemo cache תוצאה."
    },
    {
      id: "fill_l24_useref_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useRef",
      level: 6,
      code: "const inputRef = ____(null);\nuseEffect(() => inputRef.current.focus(), []);\nreturn <input ref={inputRef} />;",
      answer: "useRef",
      explanation: "useRef ל-DOM access."
    },
    {
      id: "fill_l22_setstate_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::setState",
      level: 6,
      code: "setItems(prev => [...prev, ____Item]);",
      answer: "new",
      explanation: "Immutable add via spread."
    },
    {
      id: "fill_l24_callback_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 7,
      code: "const handleClick = ____(\n  () => onSelect(id),\n  [id, onSelect]\n);",
      answer: "useCallback",
      explanation: "useCallback מחזיק reference יציב."
    },
    {
      id: "fill_l22_lazy_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::useState",
      level: 7,
      code: "const [data, setData] = useState(____ => parseHugeJSON());\n// runs once on mount",
      answer: "()",
      explanation: "Lazy init: function instead of value."
    },
    {
      id: "fill_l24_useff_cleanup_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useEffect",
      level: 7,
      code: "useEffect(() => {\n  const id = setInterval(tick, 1000);\n  ____ () => clearInterval(id);\n}, []);",
      answer: "return",
      explanation: "Cleanup function returned from effect."
    },
    {
      id: "fill_l22_props_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::props",
      level: 5,
      code: "function Card({ title, ____ }) {\n  return <div>{title} - {description}</div>;\n}",
      answer: "description",
      explanation: "Destructure props by name."
    },
    {
      id: "fill_l22_state_lift_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::state",
      level: 7,
      code: "function Parent() {\n  const [____, setX] = useState(0);\n  return <><A x={x}/><B x={x}/></>;\n}",
      answer: "x",
      explanation: "State lifted to common parent."
    },
    {
      id: "fill_react_hook_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::Hook",
      level: 7,
      code: "function ____Toggle(initial = false) {\n  const [v, setV] = useState(initial);\n  const toggle = () => setV(p => !p);\n  return [v, toggle];\n}",
      answer: "use",
      explanation: "Custom hook prefix convention."
    },
    {
      id: "fill_react_reducer_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::useState",
      level: 7,
      code: "const [state, ____] = useReducer(reducer, initial);\ndispatch({ type: 'INC' });",
      answer: "dispatch",
      explanation: "useReducer returns [state, dispatch]."
    },
    {
      id: "fill_react_memo_wrap_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useMemo",
      level: 7,
      code: "const Memoized = React.____(MyComponent);\n// shallow compare props, bailout if equal",
      answer: "memo",
      explanation: "React.memo HOC wraps component."
    },
    {
      id: "fill_useeffect_async_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_24::useEffect",
      level: 8,
      code: "useEffect(() => {\n  let flag = false;\n  fetchUser(id).then(u => { if (!flag) setUser(u); });\n  return () => { flag = true; };\n}, [____]);",
      answer: "id",
      explanation: "Cancel flag pattern for async effects."
    },
    {
      id: "fill_l22_state_q_001",
      topicId: "topic_react",
      conceptKey: "lesson_22::state",
      level: 6,
      code: "const [user, setUser] = useState({ name: '', age: 0 });\nsetUser(____ => ({ ...prev, name: 'Tal' }));",
      answer: "prev",
      explanation: "Immutable update via spread + functional setter."
    },
  ],
};
