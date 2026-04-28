// data/animations.js — Mental Model Animator (Sprint 2 §4.15.6)
//
// Frame-based mental model animations for hard concepts.
// Each concept has 3-6 frames showing how state/DOM/console evolve over time.
//
// Schema:
//   "lesson_X::conceptName": {
//     title:  "useState — state נשאר בזיכרון בין renders",
//     intro:  "...",
//     frames: [
//       {
//         phase:  "render #1",
//         state:  { count: 0 },
//         dom:    "<button>0</button>",
//         log:    "render: count=0",
//         note:   "useState(0) יוצר slot בזיכרון פנימי של React"
//       }
//     ]
//   }
//
// Used by renderAnimatorPanel(concept) which shows a stepper UI.

var ANIMATIONS = {

  // ============================================================
  // useState — state persists between renders
  // ============================================================
  "lesson_22::useState": {
    title: "useState — state נשאר בזיכרון בין renders",
    intro: "כשReact מרנדר קומפוננטה, הפונקציה רצה מההתחלה. אז איך useState 'זוכר' את הערך? React שומר slot בזיכרון פנימי לכל hook.",
    frames: [
      {
        phase: "Render #1 — Mount",
        state: "{ count: 0 }",
        dom: "<button>Count: 0</button>",
        log: "useState(0) → React allocates slot, returns [0, setCount]",
        note: "הערך הראשוני (0) מוכנס לסלוט. הקומפוננטה מציגה count=0.",
      },
      {
        phase: "User clicks → setCount(count + 1)",
        state: "{ count: 0 → 1 (scheduled) }",
        dom: "<button>Count: 0</button>",
        log: "setCount(1): schedule re-render",
        note: "הסטייט עודכן ב-React אבל הקומפוננטה עוד לא רצה. React מתזמן רינדור.",
      },
      {
        phase: "Render #2",
        state: "{ count: 1 }",
        dom: "<button>Count: 1</button>",
        log: "useState() → returns [1, setCount] (same slot, new value)",
        note: "הפונקציה רצה שוב. React מחזיר את הערך החדש מאותו slot. ה-DOM מתעדכן.",
      },
      {
        phase: "User clicks again → setCount(2)",
        state: "{ count: 1 → 2 }",
        dom: "<button>Count: 2</button>",
        log: "setCount(2): re-render → useState returns [2, setCount]",
        note: "תהליך זהה — ה-slot מחזיק את הערך, React מחזיר אותו בכל רינדור.",
      },
    ],
  },

  // ============================================================
  // useEffect — when does it run?
  // ============================================================
  "lesson_24::useEffect": {
    title: "useEffect — מתי האפקט רץ?",
    intro: "useEffect רץ אחרי ש-React סיים לרנדר את ה-DOM. ה-deps array קובע אם הוא ירוץ שוב בקריאה הבאה.",
    frames: [
      {
        phase: "Render #1 (Mount)",
        state: "{ user: null }",
        dom: "<div></div>",
        log: "1) Component renders 2) DOM commit 3) Effect runs: fetch('/api/...')",
        note: "useEffect תמיד רץ אחרי ה-commit הראשון (mount). DOM כבר על המסך.",
      },
      {
        phase: "fetch resolves → setUser",
        state: "{ user: { name: 'דני' } }",
        dom: "<div></div>",
        log: "setUser: schedules re-render",
        note: "הסטייט עודכן. React יקרא מחדש לקומפוננטה.",
      },
      {
        phase: "Render #2",
        state: "{ user: { name: 'דני' } }",
        dom: "<div>דני</div>",
        log: "Component renders. useEffect deps=[userId] unchanged → SKIP effect",
        note: "ה-deps לא השתנו → React לא קורא ל-useEffect שוב. אם deps היו ריקים [] — אותו דבר.",
      },
      {
        phase: "Parent passes new userId",
        state: "{ user: { name: 'דני' }, userId: 7 }",
        dom: "<div>דני</div>",
        log: "userId changed: 5 → 7 → effect runs again: fetch new user",
        note: "deps השתנה → React קורא לאפקט שוב. אם הייתה cleanup function היא הייתה רצה לפניה.",
      },
    ],
  },

  // ============================================================
  // dependency array — controlling effect frequency
  // ============================================================
  "lesson_24::dependency array": {
    title: "Dependency Array — מתי לרוץ?",
    intro: "ה-array השני של useEffect שולט בתדירות. שלוש אפשרויות: [] (פעם אחת), [x] (כשX משתנה), חסר (אחרי כל רינדור — מסוכן!).",
    frames: [
      {
        phase: "useEffect(fn) — ללא deps",
        state: "render → effect → setState → render → effect ...",
        dom: "(infinite loop)",
        log: "render→effect→render→effect→render... ⚠️",
        note: "ללא deps array — האפקט רץ אחרי כל רינדור. אם הוא קורא ל-setState — לולאה אינסופית.",
      },
      {
        phase: "useEffect(fn, [])",
        state: "render → effect ✓ (once)",
        dom: "<div>...</div>",
        log: "Mount: render → effect runs ONCE",
        note: "deps=[] → רץ פעם אחת אחרי mount. שימושי ל-fetch ראשוני, subscriptions, listeners.",
      },
      {
        phase: "useEffect(fn, [userId])",
        state: "userId: 5 → effect ✓",
        dom: "<div>user 5</div>",
        log: "Mount: render → effect (userId=5)",
        note: "deps=[userId] → רץ ב-mount, ואז שוב כל פעם ש-userId משתנה.",
      },
      {
        phase: "userId changes 5 → 7",
        state: "userId: 5 → 7 → effect ✓",
        dom: "<div>user 7</div>",
        log: "Re-render → cleanup(prev) → effect(new userId=7)",
        note: "React מריץ קודם cleanup של הריצה הקודמת, ואז את האפקט החדש.",
      },
    ],
  },

  // ============================================================
  // infinite loop — what causes it?
  // ============================================================
  "lesson_24::infinite loop": {
    title: "לולאה אינסופית ב-useEffect",
    intro: "התסריט הקלאסי: useEffect קורא ל-setState, אבל deps array ריקה → אינסופי.",
    frames: [
      {
        phase: "Initial render",
        state: "{ data: null }",
        dom: "<div>Loading...</div>",
        log: "render #1, effect about to run",
        note: "הקומפוננטה רינדרה. React הולך להריץ את האפקט.",
      },
      {
        phase: "Effect runs → setData(...)",
        state: "{ data: [...] }",
        dom: "<div>Loading...</div>",
        log: "fetch().then(setData) — but data is fresh object every time",
        note: "fetch סיים → setData נקרא → re-render מתוזמן.",
      },
      {
        phase: "Render #2",
        state: "{ data: [...] }",
        dom: "<div>...</div>",
        log: "Re-render. Now: should effect run again?",
        note: "deps לא הוגדרו (חסר parameter שני) → React מריץ את האפקט שוב.",
      },
      {
        phase: "Effect runs AGAIN",
        state: "fetching... → setData → re-render → ...",
        dom: "(stuck)",
        log: "effect → setData → re-render → effect → ... 🌀",
        note: "כל setData גורם רינדור. כל רינדור מריץ את האפקט. אינסופי. הפתרון: deps=[] או [...שמשתנים מדויקים...].",
      },
    ],
  },

  // ============================================================
  // stale closure — closures capture variables at time of creation
  // ============================================================
  "lesson_closures::stale closure": {
    title: "Stale Closure — סגירה ישנה",
    intro: "פונקציה שנוצרה בתוך closure 'תפסה' את הערכים של הסביבה. אם הסביבה השתנתה — הפונקציה לא ידעה.",
    frames: [
      {
        phase: "Render #1 — useEffect creates interval",
        state: "{ count: 0 }",
        dom: "<div>0</div>",
        log: "setInterval(() => setCount(count + 1), 1000) — captures count=0",
        note: "ה-callback של setInterval 'תפס' את count=0 במהלך רינדור #1.",
      },
      {
        phase: "1 sec later — interval fires",
        state: "{ count: 0 → 1 }",
        dom: "<div>1</div>",
        log: "callback runs: setCount(0 + 1) → setCount(1)",
        note: "ה-callback עוד מחזיק count=0 (closed over). setCount(1) מעדכן.",
      },
      {
        phase: "Re-render — but interval is OLD",
        state: "{ count: 1 }",
        dom: "<div>1</div>",
        log: "interval still references count=0 (stale)",
        note: "ה-interval לא נוצר מחדש (deps=[]). הוא עוד מחזיק count=0.",
      },
      {
        phase: "Next tick — STILL setCount(0+1)=1",
        state: "{ count: 1 → 1 }",
        dom: "<div>1</div>",
        log: "callback runs again: setCount(0 + 1) = 1 (no change!) 🐛",
        note: "תקוע ב-1. הפתרון: setCount(c => c + 1) — functional update מקבל ערך טרי.",
      },
    ],
  },

  // ============================================================
  // re-render — what triggers it?
  // ============================================================
  "lesson_22::re-render": {
    title: "מה מפעיל re-render?",
    intro: "React מציג מחדש קומפוננטה ב-3 מצבים: state השתנה, props השתנו, או הורה רינדר מחדש. כלום אחר.",
    frames: [
      {
        phase: "State change → setCount(1)",
        state: "{ count: 0 → 1 }",
        dom: "<div>1</div>",
        log: "setState → React schedules re-render",
        note: "הדרך השכיחה — שינוי state. React מתזמן רינדור.",
      },
      {
        phase: "Props change",
        state: "{ name: 'דני' → 'יוסי' }",
        dom: "<div>שלום יוסי</div>",
        log: "Parent passed new prop → child re-renders",
        note: "האב העביר prop חדש. הבן מקבל ערכים חדשים ורץ.",
      },
      {
        phase: "Parent re-renders",
        state: "no own state changed",
        dom: "(re-rendered anyway)",
        log: "Parent re-render → all children re-render (unless React.memo)",
        note: "גם בלי שינוי state/props — הבן רץ אם האב רץ. React.memo עוצר את זה.",
      },
      {
        phase: "Mutation (BAD)",
        state: "{ todos: [...] (same ref) }",
        dom: "(no update)",
        log: "todos.push(item); setTodos(todos) — same reference!",
        note: "❌ React משווה ===. אותה הפניה → לא מזהה שינוי → לא מרנדר. תמיד spread/חדש!",
      },
    ],
  },

};

// Export to global scope (no module system in this app)
if (typeof window !== "undefined") {
  window.ANIMATIONS = ANIMATIONS;
}
