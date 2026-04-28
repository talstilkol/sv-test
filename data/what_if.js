// data/what_if.js — What-If Simulator (Sprint 3 §4.15.7)
//
// Interactive "what changes if I change this?" experiments for hard concepts.
// User flips a knob → sees code update + immediate outcome.
//
// Schema:
//   "lesson_X::conceptName": {
//     title: "...",
//     intro: "...",
//     codeTemplate: "// code with {{knob}} placeholder",
//     knob: {
//       name: "label",
//       options: [
//         { label: "...", insert: "...", outcome: "..." },
//         ...
//       ]
//     }
//   }

var WHAT_IF = {

  // ============================================================
  // useEffect — what if you change the deps array?
  // ============================================================
  "lesson_24::useEffect": {
    title: "מה קורה כשאני משנה את ה-deps array?",
    intro: "ה-array השני של useEffect שולט בתדירות שהוא רץ. שנה את הערך וצפה במה שקורה.",
    codeTemplate:
`function App() {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('effect runs!');
    fetch('/api/data').then(setData);
  }{{knob}});

  return <div>{count}</div>;
}`,
    knob: {
      name: "deps array",
      options: [
        {
          label: "❌ אין deps (ללא הפרמטר השני)",
          insert: "",
          outcome: "🌀 **לולאה אינסופית.** האפקט רץ אחרי כל רינדור. setData מפעיל re-render → האפקט רץ שוב → re-render שוב. fetch מתבצע אינסוף פעמים. ⚠️ הדפדפן יקפא.",
        },
        {
          label: "✅ deps = [] (array ריקה)",
          insert: ", []",
          outcome: "✅ **רץ פעם אחת אחרי mount.** זה השימוש הנפוץ ל-fetch ראשוני, listeners, subscriptions. setData → re-render → React משווה deps → אותו [] → לא רץ שוב.",
        },
        {
          label: "🟡 deps = [count]",
          insert: ", [count]",
          outcome: "🟡 **רץ ב-mount + כשcount משתנה.** במקרה הזה — fetch לא תלוי ב-count, אז האפקט יפעיל fetch מיותר כל פעם שcount משתנה. כמעט תמיד באג.",
        },
      ],
    },
  },

  // ============================================================
  // useState vs let — what triggers re-render?
  // ============================================================
  "lesson_22::useState": {
    title: "useState או let — איפה לשמור את הערך?",
    intro: "החלף בין השימוש ב-useState ל-let. שים לב לתוצאה השונה לחלוטין.",
    codeTemplate:
`function Counter() {
  {{knob}}
  return (
    <button onClick={() => count = count + 1}>
      Count: {count}
    </button>
  );
}`,
    knob: {
      name: "הצהרת המשתנה",
      options: [
        {
          label: "❌ let count = 0 (משתנה רגיל)",
          insert: "let count = 0;",
          outcome: "❌ **כפתור 'מת'.** count עולה ב-onClick (מבחינת JS), אבל React לא יודע שצריך לרנדר. בנוסף — בכל רינדור count מאופס שוב ל-0. הדף לעולם לא משתנה.",
        },
        {
          label: "✅ const [count, setCount] = useState(0)",
          insert: "const [count, setCount] = useState(0);",
          outcome: "✅ **עובד כצפוי.** useState 'זוכר' את הערך בין renders. שינוי דרך setCount מפעיל re-render. תקן את ה-onClick ל-setCount(count + 1).",
        },
        {
          label: "🟡 const count = 0 (קבוע)",
          insert: "const count = 0;",
          outcome: "🟡 **שגיאת JS.** count = count + 1 על const זורק TypeError. JS לא ייתן לך אפילו להריץ.",
        },
      ],
    },
  },

  // ============================================================
  // Array mutation — what does setTodos see?
  // ============================================================
  "lesson_22::immutable": {
    title: "push או spread — איך React מגיב?",
    intro: "תוסיף item לרשימה. שתי גרסאות נראות דומות, אבל React מגיב אחרת.",
    codeTemplate:
`const [todos, setTodos] = useState([]);

function addTodo(text) {
  {{knob}}
}`,
    knob: {
      name: "דרך ההוספה",
      options: [
        {
          label: "❌ todos.push(...); setTodos(todos)",
          insert: "todos.push({ id: Date.now(), text });\n  setTodos(todos);",
          outcome: "❌ **אין re-render!** push מעדכן את אותו array → אותה הפניה (===). React משווה הפניות, לא תוכן → לא רואה שינוי. UI לא מתעדכן.",
        },
        {
          label: "✅ setTodos([...todos, newItem])",
          insert: "setTodos([...todos, { id: Date.now(), text }]);",
          outcome: "✅ **re-render תקין.** spread יוצר array חדש (הפניה חדשה). React רואה === false → מרנדר. הדף מתעדכן.",
        },
        {
          label: "🟡 todos = [...todos, newItem]; setTodos(todos)",
          insert: "todos = [...todos, { id: Date.now(), text }];\n  setTodos(todos);",
          outcome: "🟡 **reassignment של const = שגיאה.** todos הוא const מ-useState. ניסיון לשנות ייתן TypeError.",
        },
      ],
    },
  },

  // ============================================================
  // && with 0 — conditional rendering trap
  // ============================================================
  "lesson_21::rendering": {
    title: "&& עם מספר — מה מוצג?",
    intro: "items.length && <p>... — נראה תקין, אבל יש פח. שנה את האורך וצפה.",
    codeTemplate:
`function Cart() {
  const items = [{{knob}}];
  return (
    <div>
      {items.length && <p>יש {items.length} פריטים</p>}
    </div>
  );
}`,
    knob: {
      name: "תוכן ה-array",
      options: [
        {
          label: "🟢 items עם 3 פריטים",
          insert: "1, 2, 3",
          outcome: "✅ **מציג: 'יש 3 פריטים'.** items.length=3 → truthy → React מציג את ה-<p>.",
        },
        {
          label: "❌ items ריק []",
          insert: "",
          outcome: "❌ **מציג: '0' בלבד!** items.length=0 → ב-JS: 0 && X מחזיר 0. React מתייחס ל-0 כתוכן (לא כ-falsy ב-JSX) → מציג את הספרה 0. צפוי היה: 'כלום'.",
        },
        {
          label: "✅ הפתרון: items.length > 0 && ...",
          insert: "1, 2, 3",
          outcome: "✅ **תקין תמיד.** השוואה מפורשת מחזירה boolean. כש-length=0: false && X → false → React לא מציג כלום. אין פח.",
        },
      ],
    },
  },

  // ============================================================
  // controlled input — value+onChange combinations
  // ============================================================
  "lesson_22::controlled input": {
    title: "input מבוקר — מה קורה ללא onChange?",
    intro: "controlled input חייב גם value וגם onChange. נסה הסרה של אחד מהם.",
    codeTemplate:
`function NameForm() {
  const [name, setName] = useState('');
  return (
    <input {{knob}} />
  );
}`,
    knob: {
      name: "תכונות ה-input",
      options: [
        {
          label: "✅ value + onChange (תקין)",
          insert: 'value={name} onChange={(e) => setName(e.target.value)}',
          outcome: "✅ **input מבוקר תקין.** המשתמש מקליד → onChange נורה → setName → re-render עם הערך החדש. State הוא 'מקור האמת'.",
        },
        {
          label: "❌ רק value (חסר onChange)",
          insert: "value={name}",
          outcome: "❌ **input read-only!** React מחזיק ב-value מה-state, ובלי onChange אין דרך לעדכן. הקלדה נחסמת. React גם יזרוק warning ב-console.",
        },
        {
          label: "🟡 רק onChange (חסר value — uncontrolled)",
          insert: "onChange={(e) => setName(e.target.value)}",
          outcome: "🟡 **input הופך ל-uncontrolled.** הקלדה עובדת (DOM-managed), state מתעדכן ברקע, אבל אם תרצה לקבוע ערך התחלתי או לשנות תוכנית — לא תוכל. צריך defaultValue.",
        },
      ],
    },
  },

};

// Export to global scope (no module system in this app)
if (typeof window !== "undefined") {
  window.WHAT_IF = WHAT_IF;
}
