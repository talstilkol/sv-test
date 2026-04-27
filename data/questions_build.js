// data/questions_build.js
//
// Mini Build question type — student writes code from scratch.
// Auto-graded by regex tests (each pattern must appear → test passes).
//
// Schema:
//   {
//     id:           "build_22_01",
//     conceptKey:   "lesson_22::useState",
//     level:        1..6,
//     title:        "כתוב Counter עם useState",
//     prompt:       "צור קומפוננטה...",
//     starter:      "function Counter() {\n  // your code\n}",
//     tests: [
//       { regex: "useState",  description: "השתמש ב-useState", flags: "i" },
//       { regex: "<button",   description: "הצג <button>",     flags: "i" },
//     ],
//     reference:    "function Counter() { const [c, setC] = useState(0); ... }",
//     hint:         "useState מחזיר [value, setter]",
//     explanation:  "..."
//   }
//
// 8 builds covering React 21-24 fundamentals.

var QUESTIONS_BUILD = [

  // ============================================================================
  // Lesson 21 — React Basics
  // ============================================================================

  {
    id: "build_21_01",
    conceptKey: "lesson_21::props",
    level: 2,
    title: "Greeting עם props",
    prompt:
      "כתוב קומפוננטת Greeting שמקבלת prop 'name' ומציגה <h1>שלום, {name}!</h1>.\nדוגמה: <Greeting name='דני' /> ייתן 'שלום, דני!'",
    starter:
`function Greeting({ name }) {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "function\\s+Greeting", description: "הגדר function בשם Greeting", flags: "" },
      { regex: "name", description: "השתמש ב-prop 'name'", flags: "" },
      { regex: "<h1", description: "החזר <h1>", flags: "i" },
      { regex: "return", description: "החזר את ה-JSX (return)", flags: "" },
      { regex: "\\{\\s*name\\s*\\}", description: "הצג את {name} בתוך ה-JSX", flags: "" },
    ],
    reference:
`function Greeting({ name }) {
  return <h1>שלום, {name}!</h1>;
}`,
    hint: "destructuring ב-props: function Greeting({ name }) — ואז השתמש ב-{name} בתוך ה-JSX.",
    explanation:
      "props נשלחים מהאב כאטריבוטים, מתקבלים בבן באובייקט, ונשלפים עם destructuring. הם read-only בבן.",
  },

  {
    id: "build_21_02",
    conceptKey: "lesson_21::map",
    level: 3,
    title: "TodoList — רשימה עם key",
    prompt:
      "כתוב קומפוננטת TodoList שמקבלת prop 'items' (מערך אובייקטים {id, text}) ומציגה <ul> עם <li> לכל todo.\nכל <li> חייב key={todo.id}.",
    starter:
`function TodoList({ items }) {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "function\\s+TodoList", description: "Define TodoList", flags: "" },
      { regex: "<ul", description: "השתמש ב-<ul>", flags: "i" },
      { regex: "<li", description: "השתמש ב-<li>", flags: "i" },
      { regex: "\\.map\\(", description: "השתמש ב-.map() כדי לעבור על items", flags: "" },
      { regex: "key\\s*=", description: "כל <li> חייב key", flags: "" },
      { regex: "\\.id", description: "השתמש ב-todo.id כ-key", flags: "" },
    ],
    reference:
`function TodoList({ items }) {
  return (
    <ul>
      {items.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`,
    hint: "items.map(todo => <li key={todo.id}>...</li>) — תמיד key על האלמנט החזרון.",
    explanation:
      "React מאתר items לפי key ייחודי. ללא key, הוא משתמש ב-index → באגים בעריכה/מחיקה. תמיד id יציב.",
  },

  // ============================================================================
  // Lesson 22 — useState, Immutable State
  // ============================================================================

  {
    id: "build_22_01",
    conceptKey: "lesson_22::useState",
    level: 2,
    title: "Counter פשוט",
    prompt:
      "כתוב קומפוננטת Counter שמתחילה ב-0 ומוסיפה 1 בכל לחיצה על הכפתור.",
    starter:
`function Counter() {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "useState", description: "השתמש ב-useState", flags: "" },
      { regex: "useState\\(\\s*0\\s*\\)", description: "התחל מ-0", flags: "" },
      { regex: "<button", description: "הצג <button>", flags: "i" },
      { regex: "onClick", description: "טפל ב-onClick", flags: "" },
      { regex: "set[A-Z]\\w*\\(|set\\(", description: "קרא ל-setter (לדוגמה setCount)", flags: "" },
    ],
    reference:
`function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
    hint: "const [count, setCount] = useState(0); ואז onClick={() => setCount(count + 1)}",
    explanation:
      "useState מחזיר זוג: [ערך נוכחי, setter]. ה-setter מפעיל re-render. בכל רינדור React קורא לקומפוננטה מחדש — useState 'זוכר' את הערך בזיכרון פנימי.",
  },

  {
    id: "build_22_02",
    conceptKey: "lesson_22::useState",
    level: 3,
    title: "Toggle (on/off)",
    prompt:
      "כתוב קומפוננטת Toggle עם state בוליאני isOn (התחל false). הצג כפתור שלוחץ עליו → flip של isOn. הצג טקסט: 'מופעל' / 'כבוי'.",
    starter:
`function Toggle() {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "useState", description: "השתמש ב-useState", flags: "" },
      { regex: "useState\\(\\s*false\\s*\\)", description: "התחל מ-false", flags: "" },
      { regex: "<button", description: "הצג <button>", flags: "i" },
      { regex: "!", description: "השתמש ב-! לflip", flags: "" },
      { regex: "מופעל|כבוי|on|off", description: "הצג טקסט סטטוס", flags: "i" },
    ],
    reference:
`function Toggle() {
  const [isOn, setIsOn] = useState(false);
  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? "מופעל" : "כבוי"}
    </button>
  );
}`,
    hint: "setIsOn(!isOn) הופך את הערך. ב-JSX השתמש ב-ternary: {isOn ? 'מופעל' : 'כבוי'}",
    explanation:
      "Toggle = שינוי בוליאני. הפעלת re-render עם הערך ההפוך. ternary ב-JSX מאפשר תצוגה מותנית.",
  },

  {
    id: "build_22_03",
    conceptKey: "lesson_22::immutable",
    level: 4,
    title: "addTodo (אימוטבילי)",
    prompt:
      "תינתן state של מערך todos (התחל []). כתוב פונקציה addTodo(text) שמוסיפה todo חדש בלי mutation. הקפד על spread.",
    starter:
`function App() {
  const [todos, setTodos] = useState([]);
  function addTodo(text) {
    // הקוד שלך כאן (בלי .push!)
  }
  return null; // ignore for this exercise
}`,
    tests: [
      { regex: "setTodos", description: "קרא ל-setTodos", flags: "" },
      { regex: "\\.\\.\\.todos", description: "השתמש ב-...todos (spread)", flags: "" },
      { regex: "text", description: "השתמש ב-text הנכנס", flags: "" },
      { regex: "id", description: "תן id (Date.now() או דומה)", flags: "i" },
      { regex: "\\.push", description: "אסור: .push משנה את המערך הקיים — הסר!", flags: "", mustNotMatch: true },
    ],
    reference:
`function App() {
  const [todos, setTodos] = useState([]);
  function addTodo(text) {
    setTodos([...todos, { id: Date.now(), text }]);
  }
  return null;
}`,
    hint: "setTodos([...todos, newItem]) — spread יוצר array חדש (הפניה חדשה) → React רואה שינוי → re-render.",
    explanation:
      "React משווה הפניות (===), לא תוכן. .push משנה את אותו array → אין הפניה חדשה → אין re-render. spread יוצר array חדש.",
  },

  // ============================================================================
  // Lesson 23 — Controlled Input (sits on lesson 22 concepts)
  // ============================================================================

  {
    id: "build_22_04",
    conceptKey: "lesson_22::controlled input",
    level: 3,
    title: "Controlled Input — NameForm",
    prompt:
      "כתוב קומפוננטה עם <input> מבוקר. State בשם name (התחל ''). ה-input חייב value + onChange.",
    starter:
`function NameForm() {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "useState", description: "השתמש ב-useState", flags: "" },
      { regex: "<input", description: "הצג <input>", flags: "i" },
      { regex: "value\\s*=\\s*\\{", description: "קשור value={name}", flags: "" },
      { regex: "onChange", description: "טפל ב-onChange", flags: "" },
      { regex: "e\\.target\\.value|event\\.target\\.value", description: "השתמש ב-e.target.value", flags: "" },
    ],
    reference:
`function NameForm() {
  const [name, setName] = useState('');
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="הכנס שם"
    />
  );
}`,
    hint: "controlled input חייב value (מ-state) + onChange (שמעדכן state עם e.target.value).",
    explanation:
      "input מבוקר = React הוא הסמכות. ה-state הוא 'מקור האמת' — onChange מסנכרן בכל הקלדה. בלי onChange — ה-input יהפוך read-only.",
  },

  // ============================================================================
  // Lesson 24 — useEffect, useMemo, useRef
  // ============================================================================

  {
    id: "build_24_01",
    conceptKey: "lesson_24::useEffect",
    level: 4,
    title: "useEffect — fetch בעת mount",
    prompt:
      "כתוב קומפוננטת UserList שמושכת משתמשים מ-/api/users פעם אחת בעת mount. שמור ב-state ויצג <ul> של שמות.",
    starter:
`function UserList() {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "useState", description: "useState למערך users", flags: "" },
      { regex: "useEffect", description: "useEffect ל-fetch", flags: "" },
      { regex: "fetch\\s*\\(", description: "השתמש ב-fetch", flags: "" },
      { regex: "\\.then|await", description: "טפל בתגובה", flags: "" },
      { regex: "\\}\\s*,\\s*\\[\\s*\\]\\s*\\)", description: "deps array ריק [] (רק ב-mount)", flags: "" },
      { regex: "<ul", description: "הצג <ul>", flags: "i" },
      { regex: "\\.map\\(", description: "map על המערך", flags: "" },
    ],
    reference:
`function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(setUsers);
  }, []);
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}`,
    hint: "deps=[] → רץ פעם אחת אחרי mount. בלי deps → loop אינסופי.",
    explanation:
      "useEffect עם [] רץ פעם אחת. עם [x] רץ כשx משתנה. ללא deps — אחרי כל רינדור (לרוב לא רצוי).",
  },

  {
    id: "build_24_02",
    conceptKey: "lesson_24::cleanup",
    level: 5,
    title: "Clock עם cleanup",
    prompt:
      "כתוב Clock שמציג שעה נוכחית. השתמש ב-setInterval לעדכון כל שניה. אסור! נא לבצע cleanup.",
    starter:
`function Clock() {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "useState", description: "useState", flags: "" },
      { regex: "useEffect", description: "useEffect", flags: "" },
      { regex: "setInterval", description: "setInterval", flags: "" },
      { regex: "1000", description: "interval 1000ms", flags: "" },
      { regex: "clearInterval", description: "cleanup: clearInterval", flags: "" },
      { regex: "return\\s*\\(?\\s*\\(?\\s*\\)\\s*=>", description: "החזר cleanup function מ-useEffect", flags: "" },
    ],
    reference:
`function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return <div>{time.toLocaleTimeString()}</div>;
}`,
    hint: "useEffect מחזיר פונקציה — היא תרוץ ב-unmount (וגם לפני re-run). שם תקרא ל-clearInterval.",
    explanation:
      "useEffect שמייצר side-effect (interval, listener, subscription) חייב cleanup. אחרת זליגת זיכרון + warning של React.",
  },

];

// Export to global scope (no module system in this app)
if (typeof window !== "undefined") {
  window.QUESTIONS_BUILD = QUESTIONS_BUILD;
}
