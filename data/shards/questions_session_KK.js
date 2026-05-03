// Sprint 2 batch KK - React Hooks edge cases (useReducer, useImperativeHandle, useId, useTransition)
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_KK = {
  mc: [
    { id: "mc_hook_reducer_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      question: "מתי useReducer עדיף על useState?",
      options: [
        "State complex עם sub-fields תלויים, transitions לוגיים, multiple actions, או הצורך לבדוק logic ב-isolation",
        "Always",
        "Simple toggle",
        "DOM only"
      ],
      correctIndex: 0,
      explanation: "Form עם validation, undo/redo, Redux-like flows. reducer נטו, testable.",
      optionFeedback: [
        "✅ נכון.",
        "❌ overkill לרוב.",
        "❌ useState קל יותר.",
        "❌ unrelated."
      ]
    },
    { id: "mc_hook_reducer_dispatch_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      question: "מה החתימה של reducer ב-useReducer?",
      options: [
        "(state, action) => newState — pure function, ללא side effects, מחזיר state חדש (לא mutate)",
        "(action) => state",
        "(state) => action",
        "() => mutate"
      ],
      correctIndex: 0,
      explanation: "switch(action.type) { case 'INC': return {...state, count: state.count+1}; }.",
      optionFeedback: [
        "✅ נכון. pure reducer.",
        "❌ הפוך.",
        "❌ הפוך.",
        "❌ אסור mutate."
      ]
    },
    { id: "mc_hook_imperative_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      question: "מתי useImperativeHandle נחוץ?",
      options: [
        "כשרוצים לחשוף API מותאם ל-parent דרך ref — focus(), scrollTo(), play(). שימוש זהיר ב-React",
        "Always with refs",
        "Never",
        "Only inputs"
      ],
      correctIndex: 0,
      explanation: "forwardRef + useImperativeHandle(ref, ()=>({focus, scrollTo})). React מעדיף props/state אם אפשר.",
      optionFeedback: [
        "✅ נכון.",
        "❌ overuse.",
        "❌ קיים שימוש.",
        "❌ לא רק."
      ]
    },
    { id: "mc_hook_layouteffect_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      question: "מתי useLayoutEffect במקום useEffect?",
      options: [
        "DOM measurement/mutation ש-paint לא יכול להראות (avoid flicker). רץ סינכרוני אחרי DOM update לפני paint",
        "Always",
        "Async work",
        "Network"
      ],
      correctIndex: 0,
      explanation: "useEffect: async, אחרי paint. useLayoutEffect: sync, חוסם paint. עדיפות לuseEffect.",
      optionFeedback: [
        "✅ נכון. layout-critical.",
        "❌ overuse.",
        "❌ async = useEffect.",
        "❌ לא קשור."
      ]
    },
    { id: "mc_hook_useid_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      question: "מה useId (React 18) פותר?",
      options: [
        "ייחודי IDs ל-form elements/aria-attributes שעובדים גם ב-SSR — בלי conflict בין client ל-server",
        "Component name",
        "URL",
        "Random"
      ],
      correctIndex: 0,
      explanation: "id={`${useId()}-name`} — מתאים בין SSR render לhydration.",
      optionFeedback: [
        "✅ נכון. SSR-safe IDs.",
        "❌ לא קשור.",
        "❌ לא URL.",
        "❌ דטרמיניסטי."
      ]
    },
    { id: "mc_hook_transition_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      question: "מה useTransition (React 18) עושה?",
      options: [
        "מסמן updates כ-non-urgent — UI נשאר responsive בזמן rendering יקר. מחזיר isPending + startTransition",
        "Animation",
        "Routing",
        "Suspense"
      ],
      correctIndex: 0,
      explanation: "startTransition(() => setState(big)) — עדכון יקר רץ ברקע. typing מהיר.",
      optionFeedback: [
        "✅ נכון. priority updates.",
        "❌ לא animation.",
        "❌ unrelated.",
        "❌ Suspense משלים."
      ]
    },
    { id: "mc_hook_deferred_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      question: "מה useDeferredValue?",
      options: [
        "מקבל value וגורם ל-rerender שלו לדחוף לnon-urgent. שימושי ל-search box שמסנן רשימה גדולה",
        "Debounce",
        "Throttle",
        "Memoize"
      ],
      correctIndex: 0,
      explanation: "const deferred = useDeferredValue(searchQuery). UI feels snappy.",
      optionFeedback: [
        "✅ נכון. priority defer.",
        "❌ debounce שונה.",
        "❌ throttle שונה.",
        "❌ memo שונה."
      ]
    },
    { id: "mc_hook_sync_extern_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 9,
      question: "מה useSyncExternalStore (React 18)?",
      options: [
        "API לסנכרון state חיצוני (Redux/Zustand/window) עם React במצב concurrent — מונע tearing",
        "WebSocket",
        "DB",
        "URL"
      ],
      correctIndex: 0,
      explanation: "subscribe + getSnapshot. Redux 4.1+ Zustand built on top.",
      optionFeedback: [
        "✅ נכון.",
        "❌ אין קשר ישיר.",
        "❌ ל-state עוטף.",
        "❌ URL hooks אחרים."
      ]
    },
    { id: "mc_hook_context_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      question: "מתי React Context בעייתי לביצועים?",
      options: [
        "כל consumer מתעדכן בכל שינוי של provider value, ללא קשר אם הם ממש משתמשים בפיסה הזו",
        "Never",
        "Only in SSR",
        "TypeScript"
      ],
      correctIndex: 0,
      explanation: "פתרון: split contexts, memo selectors, או Zustand/Jotai עם fine-grained reactivity.",
      optionFeedback: [
        "✅ נכון. broadcast issue.",
        "❌ קיים issue.",
        "❌ עיקר ב-CSR.",
        "❌ TS לא משפיע."
      ]
    },
    { id: "mc_hook_useEffect_async_kk_001", topicId: "topic_react", conceptKey: "lesson_24::useEffect", level: 7,
      question: "למה useEffect callback לא יכול להיות async ישירות?",
      options: [
        "useEffect מצפה ל-cleanup function או undefined כ-return. async function מחזירה Promise — React לא יודע מה לעשות",
        "Slower",
        "TypeScript",
        "Bug"
      ],
      correctIndex: 0,
      explanation: "useEffect(() => { (async () => { ... })(); }, []). או הגדר async fn בפנים.",
      optionFeedback: [
        "✅ נכון. return value mismatch.",
        "❌ זה לא ביצועים.",
        "❌ unrelated.",
        "❌ דווקא feature."
      ]
    },
    { id: "mc_hook_cleanup_kk_001", topicId: "topic_react", conceptKey: "lesson_24::useEffect", level: 7,
      question: "מתי cleanup function ב-useEffect חיוני?",
      options: [
        "Subscriptions, timers, AbortController, event listeners — מונע memory leaks ו-callbacks אחרי unmount",
        "Never",
        "Sync work",
        "Reducers"
      ],
      correctIndex: 0,
      explanation: "useEffect(() => { const sub = api.subscribe(...); return () => sub.unsubscribe(); }, []).",
      optionFeedback: [
        "✅ נכון. resource lifecycle.",
        "❌ נדרש לעיתים.",
        "❌ async הסיבה.",
        "❌ reducer פנימי."
      ]
    },
    { id: "mc_hook_strict_mode_kk_001", topicId: "topic_react", conceptKey: "lesson_24::useEffect", level: 8,
      question: "מה Strict Mode עושה ל-useEffect ב-DEV?",
      options: [
        "Mounts → unmounts → re-mounts פעמיים בכוונה — לחשוף effects שלא cleanup נכון",
        "Faster",
        "Production",
        "Never"
      ],
      correctIndex: 0,
      explanation: "DEV only. אם ה-effect לא idempotent (subscribes×2), תופסים בDEV. ב-PROD רץ פעם אחת.",
      optionFeedback: [
        "✅ נכון. double-invoke.",
        "❌ לא ביצועים.",
        "❌ DEV only.",
        "❌ קורה."
      ]
    },
    { id: "mc_hook_memo_deps_kk_001", topicId: "topic_react", conceptKey: "lesson_24::useMemo", level: 7,
      question: "למה ESLint react-hooks/exhaustive-deps חשוב?",
      options: [
        "מאתר deps חסרים ב-useEffect/useMemo/useCallback — מונע bugs של stale closures",
        "Performance",
        "Style",
        "TS"
      ],
      correctIndex: 0,
      explanation: "useEffect(() => { console.log(x); }, []) — x stale. הrule מציג הזהרה.",
      optionFeedback: [
        "✅ נכון. correctness rule.",
        "❌ רק עקיף.",
        "❌ זה bug-prevention.",
        "❌ JS גם נדרש."
      ]
    },
    { id: "mc_hook_callback_ref_kk_001", topicId: "topic_react", conceptKey: "lesson_24::useRef", level: 8,
      question: "מתי callback ref נחוץ?",
      options: [
        "כשצריך לדעת מתי DOM משתנה (mount/unmount) או לhandle אוסף refs דינמיים. function ref נקרא עם node|null",
        "Always",
        "ID only",
        "Form"
      ],
      correctIndex: 0,
      explanation: "<div ref={node => { if(node) measure(node); }} /> — מקבל את ה-node ב-mount.",
      optionFeedback: [
        "✅ נכון.",
        "❌ overuse.",
        "❌ ID שונה.",
        "❌ unrelated."
      ]
    },
    { id: "mc_hook_forwardRef_kk_001", topicId: "topic_react", conceptKey: "lesson_24::useRef", level: 7,
      question: "מה forwardRef פותר?",
      options: [
        "Component שמקבל ref מ-parent ומעביר אותו ל-DOM/component פנימי — חיוני לFocus, ספריות",
        "TypeScript",
        "Hooks",
        "Server"
      ],
      correctIndex: 0,
      explanation: "const Input = forwardRef((props, ref) => <input ref={ref} {...props} />). React 19: ref כprop רגיל.",
      optionFeedback: [
        "✅ נכון. ref forwarding.",
        "❌ unrelated.",
        "❌ הוא hook function.",
        "❌ unrelated."
      ]
    },
    { id: "mc_hook_state_init_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      question: "מתי useState עם function initializer?",
      options: [
        "חישוב יקר רק פעם אחת בmount: useState(() => parse(largeData)) — אחרת רץ בכל render",
        "Always",
        "Async",
        "Never"
      ],
      correctIndex: 0,
      explanation: "useState(parse(largeData)) — parse רץ בכל render (תוצאה מבוטלת). useState(() => parse(...)) — רק פעם אחת.",
      optionFeedback: [
        "✅ נכון. lazy init.",
        "❌ overhead מיותר.",
        "❌ async שונה.",
        "❌ קיים שימוש."
      ]
    },
    { id: "mc_hook_setstate_func_kk_001", topicId: "topic_react", conceptKey: "lesson_22::setState", level: 6,
      question: "מתי setState עם updater function (prev => ...)?",
      options: [
        "כשהsetState החדש תלוי ב-state קודם — מבטיח עבודה נכונה גם עם batching/concurrent updates",
        "Always",
        "Never",
        "Sync only"
      ],
      correctIndex: 0,
      explanation: "setN(n+1) → אם נקרא פעמיים מהר, יכול להחמיץ. setN(prev => prev+1) — תמיד נכון.",
      optionFeedback: [
        "✅ נכון. derived state.",
        "❌ overuse.",
        "❌ נדרש לעיתים.",
        "❌ עובד בכל מקרה."
      ]
    },
    { id: "mc_hook_batching_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      question: "מה auto-batching ב-React 18?",
      options: [
        "Multiple setStates בtimer/promise/native event מתאחדים ל-render אחד. ב-17 רק event handlers batched",
        "Always single",
        "Never",
        "Class only"
      ],
      correctIndex: 0,
      explanation: "ב-React 18: setN(1); setM(2); setO(3); ב-setTimeout — render אחד. flushSync לעקוף.",
      optionFeedback: [
        "✅ נכון.",
        "❌ לא תמיד.",
        "❌ קורה.",
        "❌ גם hooks."
      ]
    },
    { id: "mc_hook_flushSync_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 9,
      question: "מתי flushSync נדרש?",
      options: [
        "לכפות sync update כדי לקרוא DOM מיד אחרי setState — שימוש זהיר, חוסם batching",
        "Always",
        "Never",
        "Random"
      ],
      correctIndex: 0,
      explanation: "flushSync(() => setState(...)); document.querySelector(...).scrollIntoView();.",
      optionFeedback: [
        "✅ נכון. force sync.",
        "❌ overuse breaks perf.",
        "❌ קיים שימוש.",
        "❌ דטרמיניסטי."
      ]
    },
    { id: "mc_hook_suspense_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      question: "מה Suspense ב-React?",
      options: [
        "מציג fallback בזמן שcomponents 'מחכים' — code splitting (lazy), data fetching (concurrent)",
        "Loading state hook",
        "Error boundary",
        "Routing"
      ],
      correctIndex: 0,
      explanation: "<Suspense fallback={<Spinner/>}><LazyComp/></Suspense>. RSC ו-React Router 6.4+ מנצלים.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה hook אחר.",
        "❌ ErrorBoundary שונה.",
        "❌ unrelated."
      ]
    },
    { id: "mc_hook_error_boundary_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      question: "מה Error Boundary?",
      options: [
        "Class component עם componentDidCatch + getDerivedStateFromError — תופס errors ב-children. חסר ל-async/event handlers",
        "Try/catch",
        "Hook",
        "Suspense"
      ],
      correctIndex: 0,
      explanation: "אין hook equivalent עדיין. ספריות: react-error-boundary.",
      optionFeedback: [
        "✅ נכון.",
        "❌ try/catch לא דרך.",
        "❌ hooks לא תומכים.",
        "❌ Suspense לloading."
      ]
    },
    { id: "mc_hook_portal_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      question: "מה createPortal פותר?",
      options: [
        "Render ל-DOM node מחוץ ל-component tree — חיוני ל-modals/tooltips/popovers שצריכים לחרוג מ-overflow:hidden",
        "Routing",
        "SSR",
        "Network"
      ],
      correctIndex: 0,
      explanation: "createPortal(children, document.body). לוגית עדיין child של component, אבל DOM-wise בחוץ.",
      optionFeedback: [
        "✅ נכון.",
        "❌ unrelated.",
        "❌ unrelated.",
        "❌ unrelated."
      ]
    },
    { id: "mc_hook_concurrent_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 9,
      question: "מה Concurrent Rendering מאפשר?",
      options: [
        "React יכול להפסיק/להמשיך rendering לפי priority. חוסם משלימי גבוה (input) על נמוך (list)",
        "Multi-threading",
        "Worker",
        "Async only"
      ],
      correctIndex: 0,
      explanation: "useTransition/useDeferredValue זה ה-API. React Suspense מנצל את זה.",
      optionFeedback: [
        "✅ נכון.",
        "❌ JS ב-thread אחד.",
        "❌ Worker שונה.",
        "❌ תכונה ייעודית."
      ]
    },
    { id: "mc_hook_render_phase_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      question: "מה אסור לעשות ב-render phase?",
      options: [
        "Side effects (mutations, network, console.log חשוב), setState ב-render — צריך useEffect",
        "Calculations",
        "JSX",
        "Variables"
      ],
      correctIndex: 0,
      explanation: "Render phase חייב להיות pure. side effects ב-useEffect/useLayoutEffect.",
      optionFeedback: [
        "✅ נכון.",
        "❌ pure calc OK.",
        "❌ חובה JSX.",
        "❌ vars OK."
      ]
    },
    { id: "mc_hook_strict_mode_double_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      question: "למה Strict Mode קורא לcomponent body פעמיים?",
      options: [
        "לוודא שhה-render הוא pure — לא תלוי בstate חיצוני, אין side effects, deterministic. רק ב-DEV",
        "Performance",
        "Production",
        "Random"
      ],
      correctIndex: 0,
      explanation: "אם render רץ פעמיים ויוצא שונה — bug. בPROD רץ פעם אחת.",
      optionFeedback: [
        "✅ נכון. purity check.",
        "❌ slower בDEV.",
        "❌ DEV only.",
        "❌ דטרמיניסטי."
      ]
    },
    { id: "mc_hook_keys_list_kk_001", topicId: "topic_react", conceptKey: "lesson_21::map", level: 6,
      question: "למה key חייב להיות יציב + ייחודי?",
      options: [
        "React משתמש ב-keys לזיהוי items בין renders — לא יציב = re-mount של component, איבוד state פנימי",
        "Performance only",
        "Random fine",
        "Index always"
      ],
      correctIndex: 0,
      explanation: "key=randomValue() = re-mount בכל render = איבוד state. key={item.id} עדיף.",
      optionFeedback: [
        "✅ נכון.",
        "❌ correctness gam.",
        "❌ הורס state.",
        "❌ index שביר ב-reorder/insert."
      ]
    },
    { id: "mc_hook_index_key_kk_001", topicId: "topic_react", conceptKey: "lesson_21::map", level: 7,
      question: "מתי index ב-key מקובל?",
      options: [
        "List static שלא משתנה (ללא reorder/add/remove). אחרת bugs קשים: state נשאר על המקום ה-DOM הקודם",
        "Always",
        "Never",
        "Random items"
      ],
      correctIndex: 0,
      explanation: "ב-list דינמית: insert בstart → כל הkeys 'זזים' → React חושב שכל ה-items השתנו.",
      optionFeedback: [
        "✅ נכון. only static.",
        "❌ overuse.",
        "❌ קיים case.",
        "❌ אסור."
      ]
    },
    { id: "mc_hook_uncontrolled_kk_001", topicId: "topic_react", conceptKey: "lesson_22::controlled input", level: 7,
      question: "מתי uncontrolled input?",
      options: [
        "Form פשוט שלא דורש validation בזמן אמת. משתמש ב-defaultValue + ref. מהיר לכתיבה אך פחות שליטה",
        "Always",
        "Validation",
        "Async"
      ],
      correctIndex: 0,
      explanation: "<input defaultValue={x} ref={r} />. ייחוד: ref.current.value בלחיצה. controlled דורש state.",
      optionFeedback: [
        "✅ נכון.",
        "❌ overuse.",
        "❌ controlled עדיף ל-validation.",
        "❌ unrelated."
      ]
    },
    { id: "mc_hook_render_props_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      question: "מה render prop pattern?",
      options: [
        "Component שמקבל function כprop ו-cmoll אותה ב-render: <DataLoader>{({ data }) => <UI />}</DataLoader>",
        "TypeScript",
        "Class",
        "Hook"
      ],
      correctIndex: 0,
      explanation: "Pre-hooks pattern. Hooks החליפו רוב השימושים. עדיין שימושי בספריות.",
      optionFeedback: [
        "✅ נכון.",
        "❌ unrelated.",
        "❌ עובד גם ב-functional.",
        "❌ Hook שונה."
      ]
    },
    { id: "mc_hook_hoc_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      question: "מה HOC (Higher-Order Component)?",
      options: [
        "Function שמקבלת component ומחזירה component חדש עם enhanced behavior. דוגמאות: withAuth, withTracking",
        "Hook",
        "Class",
        "Render prop"
      ],
      correctIndex: 0,
      explanation: "const withAuth = (Comp) => (props) => isAuth ? <Comp {...props} /> : <Login />.",
      optionFeedback: [
        "✅ נכון.",
        "❌ Hook שונה.",
        "❌ פונקציה.",
        "❌ render prop שונה."
      ]
    },
    { id: "mc_hook_compound_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      question: "מה compound component pattern?",
      options: [
        "API דמוית-HTML עם sub-components: <Tabs><Tabs.List>...</Tabs.List></Tabs>. flexible composition",
        "HOC",
        "Hook",
        "Slot"
      ],
      correctIndex: 0,
      explanation: "Headless UI/Radix משתמשים. parent מספק context, children consume.",
      optionFeedback: [
        "✅ נכון.",
        "❌ HOC שונה.",
        "❌ זה structural pattern.",
        "❌ unrelated."
      ]
    },
    { id: "mc_hook_provider_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      question: "למה Provider hell בעייתי?",
      options: [
        "Nesting עמוק של Providers (theme/auth/i18n/...) פוגע ב-readability + ביצועים — שימוש ב-compose, או ב-state libraries",
        "Doesn't exist",
        "Faster",
        "Required"
      ],
      correctIndex: 0,
      explanation: "Compose pattern: <ProviderChain providers={[A,B,C]}><App/></ProviderChain>.",
      optionFeedback: [
        "✅ נכון.",
        "❌ קורה.",
        "❌ הפוך.",
        "❌ ניתן לפתור."
      ]
    },
    { id: "mc_hook_optimistic_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      question: "מה useOptimistic (React 19)?",
      options: [
        "Updates UI מיד תוך כדי async action ברקע — אם נכשל, חוזר. tighter UX",
        "Async hook",
        "useState async",
        "Promise"
      ],
      correctIndex: 0,
      explanation: "useOptimistic(state, updater) → [optimisticState, addOptimistic]. שילוב עם server actions.",
      optionFeedback: [
        "✅ נכון. optimistic UI.",
        "❌ לא generic.",
        "❌ זה אחר.",
        "❌ Promise nadar."
      ]
    },
    { id: "mc_hook_use_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 9,
      question: "מה use() hook ב-React 19?",
      options: [
        "מאפשר await על Promise ב-render — Suspense עוטף. ניתן לקרוא לתנאי, שונה משאר hooks",
        "Custom hook",
        "useState alias",
        "useEffect"
      ],
      correctIndex: 0,
      explanation: "const data = use(promise); — אם not resolved, throws ל-Suspense. גם ל-Context.",
      optionFeedback: [
        "✅ נכון. async render unblocked.",
        "❌ name של API.",
        "❌ שונה.",
        "❌ שונה."
      ]
    },
    { id: "mc_hook_action_state_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 9,
      question: "מה useActionState (React 19)?",
      options: [
        "מנהל state של form actions — מקבל action ומחזיר [state, dispatch, isPending]. מסונכרן עם form submit",
        "Redux",
        "Async only",
        "useState"
      ],
      correctIndex: 0,
      explanation: "Replaces useFormState (renamed). שילוב עם <form action={dispatch}>. SSR-friendly.",
      optionFeedback: [
        "✅ נכון.",
        "❌ Redux שונה.",
        "❌ ספציפי לforms.",
        "❌ wrapper על useState."
      ]
    }
  ],
  fill: [
    { id: "fill_hook_reducer_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      code: "// Complex state\nconst [state, ____] = useReducer(reducer, initial);\ndispatch({ type: 'INC' });",
      answer: "dispatch",
      explanation: "useReducer returns [state, dispatch]."
    },
    { id: "fill_hook_init_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      code: "// Lazy init (expensive computation once)\nconst [state, setState] = useState(____ => parse(largeData));",
      answer: "()",
      explanation: "Function initializer runs only on mount."
    },
    { id: "fill_hook_setN_kk_001", topicId: "topic_react", conceptKey: "lesson_22::setState", level: 6,
      code: "// Updater for derived state\nsetN(____ => prev + 1);",
      answer: "prev",
      explanation: "Updater function safe with batching."
    },
    { id: "fill_hook_layout_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      code: "// Synchronous DOM measurement before paint\nuse____Effect(() => {\n  const rect = ref.current.getBoundingClientRect();\n  setSize(rect.width);\n}, []);",
      answer: "Layout",
      explanation: "useLayoutEffect runs sync after DOM update."
    },
    { id: "fill_hook_id_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      code: "// SSR-safe unique ID\nconst id = use____();\n<input id={id} />\n<label htmlFor={id}>Name</label>",
      answer: "Id",
      explanation: "useId provides stable IDs across SSR/client."
    },
    { id: "fill_hook_transition_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      code: "// Mark update as non-urgent\nconst [isPending, ____] = useTransition();\nstartTransition(() => setLargeList(...));",
      answer: "startTransition",
      explanation: "useTransition returns [isPending, startTransition]."
    },
    { id: "fill_hook_deferred_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 8,
      code: "// Defer expensive prop derivation\nconst deferredQuery = use____Value(query);",
      answer: "Deferred",
      explanation: "useDeferredValue defers value updates."
    },
    { id: "fill_hook_callback_kk_001", topicId: "topic_react", conceptKey: "lesson_24::useMemo", level: 6,
      code: "// Stable function reference\nconst handle = use____(\n  () => doSomething(id),\n  [id]\n);",
      answer: "Callback",
      explanation: "useCallback memoizes function reference."
    },
    { id: "fill_hook_memo_kk_001", topicId: "topic_react", conceptKey: "lesson_24::useMemo", level: 6,
      code: "// Memoized expensive value\nconst result = use____(\n  () => heavyCalc(input),\n  [input]\n);",
      answer: "Memo",
      explanation: "useMemo caches computed value."
    },
    { id: "fill_hook_ref_kk_001", topicId: "topic_react", conceptKey: "lesson_24::useRef", level: 6,
      code: "// DOM access\nconst inputRef = use____(null);\n<input ref={inputRef} />\n// inputRef.current.focus()",
      answer: "Ref",
      explanation: "useRef stores mutable ref to DOM/value."
    },
    { id: "fill_hook_imperative_kk_001", topicId: "topic_react", conceptKey: "lesson_24::useRef", level: 8,
      code: "// Expose custom API to parent\nuseImperative____(ref, () => ({\n  focus: () => inputRef.current.focus()\n}));",
      answer: "Handle",
      explanation: "useImperativeHandle customizes ref API."
    },
    { id: "fill_hook_cleanup_kk_001", topicId: "topic_react", conceptKey: "lesson_24::useEffect", level: 7,
      code: "// Cleanup subscription\nuseEffect(() => {\n  const sub = api.subscribe();\n  return ____ => sub.unsubscribe();\n}, []);",
      answer: "()",
      explanation: "Cleanup function runs before unmount/re-run."
    },
    { id: "fill_hook_provider_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      code: "// Theme context\nconst ThemeContext = ____.createContext('light');\n<ThemeContext.Provider value=\"dark\">\n  <App />\n</ThemeContext.Provider>",
      answer: "React",
      explanation: "createContext + Provider for shared state."
    },
    { id: "fill_hook_use_context_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      code: "// Consume context\nconst theme = use____(ThemeContext);",
      answer: "Context",
      explanation: "useContext reads context value."
    },
    { id: "fill_hook_portal_kk_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      code: "// Render outside parent DOM\nimport { createPortal } from 'react-dom';\nreturn create____(<Modal/>, document.body);",
      answer: "Portal",
      explanation: "createPortal renders to different DOM node."
    }
  ]
};
