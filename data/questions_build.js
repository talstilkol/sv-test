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
// 21 builds covering JS foundations, Node/Express, and React 21-24 fundamentals.

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
    starter: `function Greeting({ name }) {
  // הקוד שלך כאן
}`,
    tests: [
      {
        regex: "function\\s+Greeting",
        description: "הגדר function בשם Greeting",
        flags: "",
      },
      { regex: "name", description: "השתמש ב-prop 'name'", flags: "" },
      { regex: "<h1", description: "החזר <h1>", flags: "i" },
      { regex: "return", description: "החזר את ה-JSX (return)", flags: "" },
      {
        regex: "\\{\\s*name\\s*\\}",
        description: "הצג את {name} בתוך ה-JSX",
        flags: "",
      },
    ],
    reference: `function Greeting({ name }) {
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
    starter: `function TodoList({ items }) {
  // הקוד שלך כאן
}`,
    tests: [
      {
        regex: "function\\s+TodoList",
        description: "Define TodoList",
        flags: "",
      },
      { regex: "<ul", description: "השתמש ב-<ul>", flags: "i" },
      { regex: "<li", description: "השתמש ב-<li>", flags: "i" },
      {
        regex: "\\.map\\(",
        description: "השתמש ב-.map() כדי לעבור על items",
        flags: "",
      },
      { regex: "key\\s*=", description: "כל <li> חייב key", flags: "" },
      { regex: "\\.id", description: "השתמש ב-todo.id כ-key", flags: "" },
    ],
    reference: `function TodoList({ items }) {
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
    prompt: "כתוב קומפוננטת Counter שמתחילה ב-0 ומוסיפה 1 בכל לחיצה על הכפתור.",
    starter: `function Counter() {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "useState", description: "השתמש ב-useState", flags: "" },
      { regex: "useState\\(\\s*0\\s*\\)", description: "התחל מ-0", flags: "" },
      { regex: "<button", description: "הצג <button>", flags: "i" },
      { regex: "onClick", description: "טפל ב-onClick", flags: "" },
      {
        regex: "set[A-Z]\\w*\\(|set\\(",
        description: "קרא ל-setter (לדוגמה setCount)",
        flags: "",
      },
    ],
    reference: `function Counter() {
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
    starter: `function Toggle() {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "useState", description: "השתמש ב-useState", flags: "" },
      {
        regex: "useState\\(\\s*false\\s*\\)",
        description: "התחל מ-false",
        flags: "",
      },
      { regex: "<button", description: "הצג <button>", flags: "i" },
      { regex: "!", description: "השתמש ב-! לflip", flags: "" },
      { regex: "מופעל|כבוי|on|off", description: "הצג טקסט סטטוס", flags: "i" },
    ],
    reference: `function Toggle() {
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
    starter: `function App() {
  const [todos, setTodos] = useState([]);
  function addTodo(text) {
    // הקוד שלך כאן (בלי .push!)
  }
  return null; // ignore for this exercise
}`,
    tests: [
      { regex: "setTodos", description: "קרא ל-setTodos", flags: "" },
      {
        regex: "\\.\\.\\.todos",
        description: "השתמש ב-...todos (spread)",
        flags: "",
      },
      { regex: "text", description: "השתמש ב-text הנכנס", flags: "" },
      { regex: "id", description: "תן id (Date.now() או דומה)", flags: "i" },
      {
        regex: "\\.push",
        description: "אסור: .push משנה את המערך הקיים — הסר!",
        flags: "",
        mustNotMatch: true,
      },
    ],
    reference: `function App() {
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
    starter: `function NameForm() {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "useState", description: "השתמש ב-useState", flags: "" },
      { regex: "<input", description: "הצג <input>", flags: "i" },
      {
        regex: "value\\s*=\\s*\\{",
        description: "קשור value={name}",
        flags: "",
      },
      { regex: "onChange", description: "טפל ב-onChange", flags: "" },
      {
        regex: "e\\.target\\.value|event\\.target\\.value",
        description: "השתמש ב-e.target.value",
        flags: "",
      },
    ],
    reference: `function NameForm() {
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
    starter: `function UserList() {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "useState", description: "useState למערך users", flags: "" },
      { regex: "useEffect", description: "useEffect ל-fetch", flags: "" },
      { regex: "fetch\\s*\\(", description: "השתמש ב-fetch", flags: "" },
      { regex: "\\.then|await", description: "טפל בתגובה", flags: "" },
      {
        regex: "\\}\\s*,\\s*\\[\\s*\\]\\s*\\)",
        description: "deps array ריק [] (רק ב-mount)",
        flags: "",
      },
      { regex: "<ul", description: "הצג <ul>", flags: "i" },
      { regex: "\\.map\\(", description: "map על המערך", flags: "" },
    ],
    reference: `function UserList() {
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
    starter: `function Clock() {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "useState", description: "useState", flags: "" },
      { regex: "useEffect", description: "useEffect", flags: "" },
      { regex: "setInterval", description: "setInterval", flags: "" },
      { regex: "1000", description: "interval 1000ms", flags: "" },
      {
        regex: "clearInterval",
        description: "cleanup: clearInterval",
        flags: "",
      },
      {
        regex: "return\\s*\\(?\\s*\\(?\\s*\\)\\s*=>",
        description: "החזר cleanup function מ-useEffect",
        flags: "",
      },
    ],
    reference: `function Clock() {
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

  // ============================================================================
  // Lesson 11 — JS Foundations
  // ============================================================================

  {
    id: "build_11_01",
    conceptKey: "lesson_11::Array",
    level: 2,
    title: "סכום מספרים עם reduce",
    prompt:
      "כתוב פונקציה sumArray(nums) שמקבלת מערך של מספרים ומחזירה את סכומם עם .reduce().",
    starter: `function sumArray(nums) {
  // הקוד שלך כאן — השתמש ב-.reduce()
}`,
    tests: [
      { regex: "\\.reduce\\(", description: "השתמש ב-.reduce()", flags: "" },
      { regex: "return", description: "החזר את הסכום", flags: "" },
      { regex: ",\\s*0", description: "הוסף initialValue 0", flags: "" },
    ],
    reference: `function sumArray(nums) {
  return nums.reduce((sum, n) => sum + n, 0);
}`,
    hint: "reduce((accumulator, current) => accumulator + current, 0) — initialValue מגן על מערך ריק.",
    explanation:
      "reduce = מצמצם מערך לערך אחד. accumulator = הצבר. כל iteration מוסיף לצבר. initialValue מגדיר את ערך הפתיחה.",
  },

  {
    id: "build_11_02",
    conceptKey: "lesson_11::function",
    level: 3,
    title: "makeCounter — closure factory",
    prompt:
      "כתוב makeCounter() שמחזיר פונקציה. בכל קריאה לאותה פונקציה, עלה ב-1 ותחזיר את הערך הנוכחי.",
    starter: `function makeCounter() {
  // הקוד שלך כאן
}
const counter = makeCounter();
// counter() → 1, counter() → 2, counter() → 3`,
    tests: [
      {
        regex: "function\\s+makeCounter",
        description: "הגדר makeCounter",
        flags: "",
      },
      {
        regex: "let|var",
        description: "השתמש במשתנה פנימי (closure state)",
        flags: "",
      },
      {
        regex: "return.*function|return.*=>",
        description: "החזר פונקציה",
        flags: "",
      },
    ],
    reference: `function makeCounter() {
  let count = 0;
  return () => ++count;
}`,
    hint: "הגדר count בתוך makeCounter (לא בחוץ!) ואז החזר פונקציה שמגדילה ומחזירה אותו.",
    explanation:
      "Closure = פונקציה פנימית זוכרת את ה-scope של הפונקציה שיצרה אותה. count שמוגדר בתוך makeCounter חי כל עוד יש reference לפונקציה הפנימית.",
  },

  {
    id: "build_11_03",
    conceptKey: "lesson_11::By Reference",
    level: 4,
    title: "שכפול עמוק של מערך אובייקטים",
    prompt:
      "כתוב cloneUsers(users) שמחזירה עותק חדש של מערך אובייקטי user ({id, name}) — כל אובייקט חדש (שינוי בעותק לא ישפיע על המקור).",
    starter: `function cloneUsers(users) {
  // הקוד שלך כאן — spread לא מספיק!
}`,
    tests: [
      {
        regex: "\\.map\\(",
        description: "השתמש ב-.map() לאובייקט חדש לכל user",
        flags: "",
      },
      {
        regex: "\\.\\.\\.u|Object\\.assign|structuredClone",
        description: "שכפל כל אובייקט",
        flags: "",
      },
      { regex: "return", description: "החזר את המערך החדש", flags: "" },
    ],
    reference: `function cloneUsers(users) {
  return users.map(u => ({ ...u }));
}`,
    hint: "users.map(u => ({...u})) — spread יוצר object חדש. שינוי בעותק לא יפגע במקור.",
    explanation:
      "By Reference = מערכים ואובייקטים מועברים כ-pointer. [...arr] עושה shallow copy של המערך, אבל אובייקטים בפנים עדיין shared. {...obj} על כל אחד עושה shallow copy של כל אובייקט.",
  },

  // ============================================================================
  // Lesson 13 — Classes & OOP
  // ============================================================================

  {
    id: "build_13_01",
    conceptKey: "lesson_13::class",
    level: 3,
    title: "מחלקת Animal",
    prompt:
      "כתוב מחלקת Animal עם constructor(name, sound). הוסף מתודה speak() שמחזירה '{name} אומר {sound}'.",
    starter: `class Animal {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "class\\s+Animal", description: "הגדר class Animal", flags: "" },
      { regex: "constructor", description: "הגדר constructor", flags: "" },
      {
        regex: "this\\.name|this\\.sound",
        description: "שמור name ו-sound ב-this",
        flags: "",
      },
      { regex: "speak\\s*\\(", description: "הגדר מתודת speak()", flags: "" },
      {
        regex: "return|`|\\+",
        description: "החזר string עם name ו-sound",
        flags: "",
      },
    ],
    reference: `class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }
  speak() {
    return \`\${this.name} אומר \${this.sound}\`;
  }
}`,
    hint: "constructor() מקבל ושומר ב-this. מתודות מוגדרות ישירות בגוף ה-class (לא ב-constructor).",
    explanation:
      "class = תבנית לאובייקטים. constructor = רץ ב-new. this.x = שדה של ה-instance. מתודות = פונקציות שכל ה-instances חולקים (דרך prototype).",
  },

  // ============================================================================
  // Lesson 17-18 — Node/Express
  // ============================================================================

  {
    id: "build_17_01",
    conceptKey: "lesson_17::REST API",
    level: 3,
    title: "Express GET /users",
    prompt:
      "כתוב route ב-Express שמגיב ל-GET /users ומחזיר JSON של מערך users במצב. הניח ש-app ו-users הוגדרו.",
    starter: `// app ו-users הוגדרו
app.get('/users', (req, res) => {
  // הקוד שלך כאן
});`,
    tests: [
      {
        regex: "app\\.get\\s*\\(\\s*['\"]?\\/users",
        description: "Route: GET /users",
        flags: "",
      },
      { regex: "res\\.json\\(", description: "השב עם res.json()", flags: "" },
      { regex: "users", description: "שלח את מערך users", flags: "" },
    ],
    reference: `app.get('/users', (req, res) => {
  res.json(users);
});`,
    hint: "res.json() שולח application/json אוטומטית + status 200.",
    explanation:
      "GET /users = endpoint לקריאת collection. res.json() מסדרל אוטומטית לJSON. המערכת RESTful: resource ב-URL, method = פעולה.",
  },

  {
    id: "build_17_02",
    conceptKey: "lesson_17::REST API",
    level: 4,
    title: "Express POST /users עם validation",
    prompt:
      "כתוב route POST /users. קרא name מ-req.body. אם חסר — החזר 400. אחרת הוסף {id: Date.now(), name} ל-users והחזר 201 עם האובייקט החדש.",
    starter: `app.post('/users', (req, res) => {
  // הקוד שלך כאן
});`,
    tests: [
      { regex: "req\\.body", description: "קרא מ-req.body", flags: "" },
      { regex: "400", description: "החזר 400 אם name חסר", flags: "" },
      {
        regex: "Date\\.now\\(\\)",
        description: "צור id עם Date.now()",
        flags: "",
      },
      { regex: "201", description: "החזר status 201", flags: "" },
      {
        regex: "users\\.push|users\\.\\[",
        description: "הוסף ל-users",
        flags: "",
      },
    ],
    reference: `app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const user = { id: Date.now(), name };
  users.push(user);
  res.status(201).json(user);
});`,
    hint: "res.status(400).json({error}) לשגיאה. res.status(201).json(newUser) להצלחה.",
    explanation:
      "POST = יצירה. 201 Created = resource חדש נוצר. server-side validation חייבת, גם אם ה-client שלח — ניתן לעקוף.",
  },

  {
    id: "build_18_01",
    conceptKey: "lesson_18::route",
    level: 4,
    title: "Express DELETE /users/:id",
    prompt:
      "כתוב route שמגיב ל-DELETE /users/:id. מחק את ה-user עם ה-id המבוקש מ-users. אם לא נמצא — 404. אחרת — 200.",
    starter: `app.delete('/users/:id', (req, res) => {
  // הקוד שלך כאן
});`,
    tests: [
      {
        regex: "req\\.params\\.id",
        description: "קרא id מ-req.params.id",
        flags: "",
      },
      { regex: "findIndex|find\\b", description: "חפש את ה-user", flags: "" },
      { regex: "404", description: "החזר 404 אם לא נמצא", flags: "" },
      { regex: "splice|filter", description: "הסר מה-array", flags: "" },
      { regex: "200|json\\(", description: "החזר 200 בהצלחה", flags: "" },
    ],
    reference: `app.delete('/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  users.splice(idx, 1);
  res.json({ ok: true });
});`,
    hint: "req.params.id = string! השתמש ב-== (loose equality) לhמרה עם number, או parseInt().",
    explanation:
      "DELETE /resource/:id = מחיקת item ספציפי. params מגיעים כ-string תמיד. findIndex + splice = מחיקה ממערך.",
  },

  // ============================================================================
  // Lesson 15 — Async
  // ============================================================================

  {
    id: "build_15_01",
    conceptKey: "lesson_15::Asynchronous",
    level: 3,
    title: "fetchUser async function",
    prompt:
      "כתוב async function fetchUser(id) שמושכת /api/users/{id}, ממירה ל-JSON ומחזירה את האובייקט. אם כשלון — החזר null.",
    starter: `async function fetchUser(id) {
  // הקוד שלך כאן
}`,
    tests: [
      {
        regex: "async\\s+function\\s+fetchUser",
        description: "async function",
        flags: "",
      },
      { regex: "await\\s+fetch", description: "await fetch()", flags: "" },
      { regex: "\\.json\\(", description: "המר ל-JSON", flags: "" },
      { regex: "try|catch", description: "try/catch לשגיאות", flags: "" },
      { regex: "return\\s+null", description: "החזר null בכשלון", flags: "" },
    ],
    reference: `async function fetchUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    return await res.json();
  } catch {
    return null;
  }
}`,
    hint: "await fetch() → await res.json(). try/catch לפי שגיאת רשת.",
    explanation:
      "async function תמיד מחזירה Promise. await מחכה לPromise. fetch() מחזיר Response — צריך עוד await על .json().",
  },

  // ============================================================================
  // Lesson 24 — Advanced Hooks
  // ============================================================================

  {
    id: "build_24_03",
    conceptKey: "lesson_24::useRef",
    level: 4,
    title: "useRef — focus על input",
    prompt:
      "כתוב קומפוננטה עם input ו-button 'Focus'. לחיצה על הכפתור תעביר focus ל-input עם useRef.",
    starter: `function FocusInput() {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "useRef", description: "השתמש ב-useRef", flags: "" },
      { regex: "ref\\s*=\\s*\\{", description: "קשור ref ל-input", flags: "" },
      {
        regex: "\\.current\\.focus",
        description: "קרא ל-.current.focus()",
        flags: "",
      },
      { regex: "<button", description: "הצג button", flags: "i" },
      { regex: "onClick", description: "טפל ב-onClick", flags: "" },
    ],
    reference: `function FocusInput() {
  const inputRef = useRef(null);
  return (
    <>
      <input ref={inputRef} placeholder="הקלד..." />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  );
}`,
    hint: "const inputRef = useRef(null). על הinput: ref={inputRef}. בhandler: inputRef.current.focus()",
    explanation:
      "useRef מחזיר {current: ...}. כשמוסיפים ref={inputRef} ל-DOM element, React שם את ה-node ב-current. focus() = focus native.",
  },

  {
    id: "build_24_04",
    conceptKey: "lesson_24::useMemo",
    level: 5,
    title: "useMemo — חישוב כבד",
    prompt:
      "כתוב קומפוננטה עם state 'numbers' (מערך) ו-state 'name'. חשב sum עם useMemo — מחשב מחדש רק כש-numbers משתנה.",
    starter: `function Calculator({ numbers }) {
  const [name, setName] = useState('');
  // חשב sum כאן עם useMemo
  // הצג sum ו-input לname
}`,
    tests: [
      { regex: "useMemo", description: "השתמש ב-useMemo", flags: "" },
      {
        regex: "\\[numbers\\]|\\[numbers,",
        description: "deps: [numbers]",
        flags: "",
      },
      { regex: "\\.reduce\\(", description: "חשב sum עם reduce", flags: "" },
      { regex: "useState", description: "useState לname", flags: "" },
    ],
    reference: `function Calculator({ numbers }) {
  const [name, setName] = useState('');
  const sum = useMemo(() => numbers.reduce((s, n) => s + n, 0), [numbers]);
  return (
    <>
      <p>Total: {sum}</p>
      <input value={name} onChange={e => setName(e.target.value)} />
    </>
  );
}`,
    hint: "useMemo(() => compute, [deps]). הקלדה ב-name input לא תגרום לחישוב מחדש של sum.",
    explanation:
      "useMemo שומר תוצאת חישוב. רק כש-numbers משתנה — sum מחושב שוב. שינוי name לא נוגע ל-numbers → sum נשאר מהcache.",
  },

  // ============================================================================
  // Lesson 23 — Router & Context
  // ============================================================================

  {
    id: "build_23_01",
    conceptKey: "lesson_23::Context API",
    level: 5,
    title: "ThemeContext",
    prompt:
      "צור ThemeContext. כתוב ThemeProvider שמספק value={theme, toggleTheme} (theme = 'light'|'dark'). כתוב hook useTheme() שמחזיר את הcontext.",
    starter: `// הקוד שלך כאן
// ThemeContext, ThemeProvider, useTheme`,
    tests: [
      { regex: "createContext", description: "createContext()", flags: "" },
      {
        regex: "ThemeProvider|Provider",
        description: "הגדר Provider component",
        flags: "",
      },
      { regex: "useState", description: "useState לtheme", flags: "" },
      { regex: "useContext", description: "useContext בuseTheme", flags: "" },
      {
        regex: "toggleTheme|!.*theme|setTheme",
        description: "toggleTheme מחליף בין light/dark",
        flags: "",
      },
    ],
    reference: `const ThemeContext = createContext(null);
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
function useTheme() { return useContext(ThemeContext); }`,
    hint: "createContext → Provider עם value → useContext בילדים.",
    explanation:
      "Context = שידור מerkatit. createContext יוצר הchannel. Provider שולח value. useContext קורא בכל נקודה בעץ.",
  },

  {
    id: "build_23_02",
    conceptKey: "lesson_23::Router",
    level: 4,
    title: "App עם 2 Routes",
    prompt:
      "כתוב App עם React Router. Route '/' → <Home/>, Route '/about' → <About/>. הוסף <Link> לניווט.",
    starter: `function App() {
  // הקוד שלך כאן — import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
}
function Home() { return <h1>בית</h1>; }
function About() { return <h1>אודות</h1>; }`,
    tests: [
      {
        regex: "BrowserRouter|Router",
        description: "עטוף ב-BrowserRouter",
        flags: "i",
      },
      {
        regex: "<Routes>|<Route\\b",
        description: "הגדר Routes ו-Route",
        flags: "i",
      },
      {
        regex: "path\\s*=\\s*['\"]\\s*\\/\\s*['\"]",
        description: "Route path='/'",
        flags: "",
      },
      { regex: "about", description: "Route path='/about'", flags: "i" },
      { regex: "<Link", description: "הוסף Link לניווט", flags: "i" },
    ],
    reference: `function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">בית</Link> | <Link to="/about">אודות</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`,
    hint: "<BrowserRouter> → <Routes> → <Route path='/' element={<Comp/>}> → <Link to='/'>",
    explanation:
      "React Router v6: Routes = container. Route = mapping URL→component. Link = ניווט ללא reload.",
  },

  {
    id: "build_22_05",
    conceptKey: "lesson_22::useState",
    level: 3,
    title: "deleteTodo — מחיקה immutable",
    prompt:
      "תינתן state todos (מערך {id, text}). כתוב פונקציה deleteTodo(id) שמסירה todo לפי id — בלי mutation של המערך המקורי.",
    starter: `function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'למד React' },
    { id: 2, text: 'כתוב תרגיל' },
  ]);

  function deleteTodo(id) {
    // הקוד שלך כאן — immutable בלבד
  }

  return null;
}`,
    tests: [
      { regex: "setTodos", description: "קרא ל-setTodos", flags: "" },
      {
        regex: "\\.filter\\(",
        description: "השתמש ב-.filter() להסרה",
        flags: "",
      },
      {
        regex: "\\.id\\s*!==\\s*id|\\.id\\s*!=\\s*id",
        description: "סנן לפי id !== id",
        flags: "",
      },
      {
        regex: "\\.splice|todos\\[",
        description: "אסור: mutation ישיר",
        flags: "",
        mustNotMatch: true,
      },
    ],
    reference: `function deleteTodo(id) {
  setTodos(todos.filter(t => t.id !== id));
}`,
    hint: "filter() מחזיר מערך חדש ללא הפריט שהתנאי לא בא. ===לא מוטציה.",
    explanation:
      "מחיקה immutable = filter שמשאיר את כולם חוץ מזה שמחקנו. React מקבל reference חדשה → re-render.",
  },
  {
    id: "build_html_css_01",
    conceptKey: "lesson_html_css_foundations::HTML form",
    level: 3,
    title: "טופס התחברות נגיש",
    prompt:
      "בנה טופס התחברות קטן ונגיש: form עם method מתאים, label מחובר ל-input של אימייל, label מחובר ל-input של סיסמה, וכפתור submit.",
    starter: `<form>
  <!-- הוסף כאן label + input לאימייל -->
  <!-- הוסף כאן label + input לסיסמה -->
  <!-- הוסף כאן כפתור שליחה -->
</form>`,
    tests: [
      { regex: "<form\\b", description: "קיים אלמנט form", flags: "i" },
      {
        regex: "method\\s*=\\s*['\"]post['\"]",
        description: "הטופס משתמש ב-method='post'",
        flags: "i",
      },
      { regex: "<label\\b", description: "יש לפחות label אחד", flags: "i" },
      { regex: "for\\s*=", description: "label מחובר בעזרת for", flags: "i" },
      { regex: "id\\s*=", description: "input מקבל id לחיבור label", flags: "i" },
      {
        regex: "type\\s*=\\s*['\"]email['\"]",
        description: "שדה האימייל משתמש ב-type='email'",
        flags: "i",
      },
      {
        regex: "type\\s*=\\s*['\"]password['\"]",
        description: "שדה הסיסמה משתמש ב-type='password'",
        flags: "i",
      },
      {
        regex: "type\\s*=\\s*['\"]submit['\"]|<button[^>]*type\\s*=\\s*['\"]submit['\"]",
        description: "יש כפתור שליחה סמנטי",
        flags: "i",
      },
    ],
    reference: `<form method="post" action="/login">
  <label for="login-email">אימייל</label>
  <input id="login-email" name="email" type="email" autocomplete="email" />

  <label for="login-password">סיסמה</label>
  <input id="login-password" name="password" type="password" autocomplete="current-password" />

  <button type="submit">כניסה</button>
</form>`,
    hint: "החיבור החשוב הוא label[for] אל input[id]. לטופס התחברות השתמש ב-post וב-type מתאים לכל שדה.",
    explanation:
      "טופס בסיסי טוב אינו רק נראה נכון. הוא שולח נתונים עם name, מחבר labels לשדות כדי לשפר נגישות, ומשתמש ב-type מתאים כדי שהדפדפן יעזור למשתמש.",
  },
  {
    id: "build_tooling_01",
    conceptKey: "lesson_tooling_git::npm scripts",
    level: 4,
    title: "package.json עם scripts לצוות",
    prompt:
      "כתוב קטע package.json שמגדיר scripts לצוות: dev, build, test, lint ו-format. lint צריך להשתמש ב-ESLint, ו-format צריך להשתמש ב-Prettier.",
    starter: `{
  "scripts": {
    "dev": "",
    "build": "",
    "test": "",
    "lint": "",
    "format": ""
  }
}`,
    tests: [
      { regex: "\"dev\"\\s*:", description: "קיים script בשם dev", flags: "" },
      { regex: "\"build\"\\s*:", description: "קיים script בשם build", flags: "" },
      { regex: "\"test\"\\s*:", description: "קיים script בשם test", flags: "" },
      { regex: "\"lint\"\\s*:", description: "קיים script בשם lint", flags: "" },
      { regex: "\"format\"\\s*:", description: "קיים script בשם format", flags: "" },
      { regex: "eslint", description: "lint משתמש ב-ESLint", flags: "i" },
      { regex: "prettier", description: "format משתמש ב-Prettier", flags: "i" },
      { regex: "vite\\s+build|next\\s+build", description: "build מפעיל בניית production מוכרת", flags: "i" },
      { regex: "Math\\.random", description: "אסור להכניס randomness ל-tooling", flags: "", mustNotMatch: true },
    ],
    reference: `{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest run",
    "lint": "eslint src",
    "format": "prettier --write src"
  }
}`,
    hint: "scripts הם aliases. שמור שמות קצרים וצוותיים: dev/build/test/lint/format.",
    explanation:
      "package.json טוב הופך פעולות חוזרות לפקודות קבועות. כך מפתח חדש ו-CI מריצים בדיוק את אותם scripts בלי ידע נסתר.",
  },

  // ============================================================================
  // Lesson 19 — JS fundamentals builds (top-gap manual batch 2026-05-02)
  // ============================================================================
  {
    id: "build_19_01",
    conceptKey: "lesson_19::function",
    level: 3,
    title: "פונקציה sum",
    prompt: "כתוב פונקציה sum שמקבלת array של מספרים ומחזירה את הסכום שלהם.",
    starter: "function sum(nums) {\n  // הקוד שלך\n}",
    tests: [
      { regex: "function\\s+sum", description: "הגדר function בשם sum", flags: "" },
      { regex: "reduce|for|forEach|\\+=", description: "השתמש ב-reduce/for/forEach לחישוב", flags: "i" },
      { regex: "return", description: "החזר ערך", flags: "" },
    ],
    reference: "function sum(nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}",
    hint: "reduce נוח לסכום. גם for רגיל עם accumulator עובד.",
    explanation: "reduce עוטף את הpattern של accumulator. starting value 0 חשוב כדי שmempty array יחזיר 0 ולא TypeError.",
  },
  {
    id: "build_19_02",
    conceptKey: "lesson_19::filter",
    level: 4,
    title: "סנן רק positives",
    prompt: "כתוב פונקציה onlyPositive שמקבלת array ומחזירה רק את האיברים החיוביים (>0).",
    starter: "function onlyPositive(nums) {\n  // הקוד שלך\n}",
    tests: [
      { regex: "function\\s+onlyPositive", description: "function בשם onlyPositive", flags: "" },
      { regex: "filter", description: "השתמש ב-filter", flags: "" },
      { regex: ">\\s*0", description: "תנאי >0", flags: "" },
    ],
    reference: "function onlyPositive(nums) {\n  return nums.filter(n => n > 0);\n}",
    hint: "filter עם predicate function שמחזיר boolean.",
    explanation: "filter יוצר array חדש עם רק האיברים שעוברים predicate. immutable — המקור לא משתנה.",
  },
  {
    id: "build_19_03",
    conceptKey: "lesson_19::closure",
    level: 5,
    title: "factory: makeCounter",
    prompt: "כתוב makeCounter שמחזיר פונקציה חדשה. כל קריאה מחזירה את הערך הבא: 1, 2, 3, ...",
    starter: "function makeCounter() {\n  // הקוד שלך\n}",
    tests: [
      { regex: "function\\s+makeCounter", description: "function בשם makeCounter", flags: "" },
      { regex: "let|var", description: "משתנה פנימי שומר state", flags: "" },
      { regex: "return", description: "מחזיר את הפונקציה הפנימית", flags: "" },
      { regex: "\\+\\+|=\\s*\\w+\\s*\\+\\s*1", description: "increment", flags: "" },
    ],
    reference: "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}",
    hint: "closure! הפונקציה הפנימית זוכרת את count מ-makeCounter גם אחרי שהיא הסתיימה.",
    explanation: "Counter pattern קלאסי. כל קריאה ל-makeCounter יוצרת state פרטי משלה. שתי קריאות = שני counters עצמאיים.",
  },
  {
    id: "build_19_04",
    conceptKey: "lesson_19::fetch",
    level: 5,
    title: "fetch + parse עם error handling",
    prompt: "כתוב async function loadData(url) שעושה fetch, בודק res.ok, ומחזיר את הJSON. אם לא ok — זרוק Error.",
    starter: "async function loadData(url) {\n  // הקוד שלך\n}",
    tests: [
      { regex: "async\\s+function", description: "async function", flags: "" },
      { regex: "await\\s+fetch", description: "await fetch", flags: "" },
      { regex: "res\\.ok|response\\.ok", description: "בדוק res.ok", flags: "" },
      { regex: "throw", description: "throw על failure", flags: "" },
      { regex: "\\.json\\(\\)", description: "פרסר ל-JSON", flags: "" },
    ],
    reference: "async function loadData(url) {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(`HTTP ${res.status}`);\n  return res.json();\n}",
    hint: "fetch לא דוחה על 4xx/5xx — חייב לבדוק res.ok ידנית.",
    explanation: "Pattern סטנדרטי. ה-throw מאפשר ל-caller לתפוס עם try/catch. החזרת res.json() מתאים — הוא Promise<data>.",
  },
  {
    id: "build_19_05",
    conceptKey: "lesson_19::object",
    level: 4,
    title: "merge defaults",
    prompt: "כתוב פונקציה withDefaults(options) שממזגת את options עם defaults = { theme: 'light', lang: 'en' }. options דורס את defaults.",
    starter: "function withDefaults(options) {\n  // הקוד שלך\n}",
    tests: [
      { regex: "function\\s+withDefaults", description: "function בשם withDefaults", flags: "" },
      { regex: "\\.\\.\\.", description: "השתמש ב-spread", flags: "" },
      { regex: "theme", description: "הזכר theme", flags: "" },
      { regex: "lang", description: "הזכר lang", flags: "" },
      { regex: "return", description: "החזר merged", flags: "" },
    ],
    reference: "function withDefaults(options) {\n  return { theme: 'light', lang: 'en', ...options };\n}",
    hint: "Object spread: { ...defaults, ...options } — ימני דורס שמאלי.",
    explanation: "Pattern נפוץ ב-React לhandling props. defaults ראשון, ואז spread של options מעליהם — מה שהמשתמש סיפק דורס.",
  },
  {
    id: "build_19_06",
    conceptKey: "lesson_19::localStorage",
    level: 4,
    title: "wrapper לlocalStorage עם JSON",
    prompt: "כתוב saveJSON(key, value) ו-loadJSON(key) שעובדים עם objects (לא רק strings). loadJSON מחזיר null אם לא קיים.",
    starter: "function saveJSON(key, value) {\n  // הקוד שלך\n}\nfunction loadJSON(key) {\n  // הקוד שלך\n}",
    tests: [
      { regex: "function\\s+saveJSON", description: "function saveJSON", flags: "" },
      { regex: "function\\s+loadJSON", description: "function loadJSON", flags: "" },
      { regex: "localStorage\\.setItem", description: "setItem ב-saveJSON", flags: "" },
      { regex: "localStorage\\.getItem", description: "getItem ב-loadJSON", flags: "" },
      { regex: "JSON\\.stringify", description: "stringify לפני set", flags: "" },
      { regex: "JSON\\.parse", description: "parse אחרי get", flags: "" },
    ],
    reference: "function saveJSON(key, value) {\n  localStorage.setItem(key, JSON.stringify(value));\n}\nfunction loadJSON(key) {\n  const raw = localStorage.getItem(key);\n  return raw ? JSON.parse(raw) : null;\n}",
    hint: "stringify לפני שמירה, parse אחרי קריאה. ובדוק שהערך לא null לפני parse.",
    explanation: "wrapper שכזה מבטל בקוד את ה-boilerplate בכל מקום שצריך לשמור object. Pattern נפוץ — לעיתים נוסיף גם try/catch סביב parse.",
  },

  // ============================================================================
  // Lesson 17 — Express builds (top-gap manual batch 2026-05-02)
  // ============================================================================
  {
    id: "build_17_11",
    conceptKey: "lesson_17::app.get",
    level: 4,
    title: "Express GET route",
    prompt: "כתוב route GET /api/users שמחזיר JSON עם array של 2 משתמשים: [{id:1, name:'A'}, {id:2, name:'B'}].",
    starter: "const express = require('express');\nconst app = express();\n// הקוד שלך\napp.listen(3000);",
    tests: [
      { regex: "app\\.get", description: "app.get", flags: "" },
      { regex: "/api/users", description: "path /api/users", flags: "" },
      { regex: "res\\.json", description: "res.json להחזרת JSON", flags: "" },
      { regex: "id:\\s*1", description: "user 1", flags: "" },
      { regex: "id:\\s*2", description: "user 2", flags: "" },
    ],
    reference: "app.get('/api/users', (req, res) => {\n  res.json([{ id: 1, name: 'A' }, { id: 2, name: 'B' }]);\n});",
    hint: "res.json() אוטומטית sets Content-Type: application/json ועושה stringify.",
    explanation: "API endpoint בסיסי. ב-production: לקרוא ממסד נתונים במקום hardcode. כאן רק להבין את הroute structure.",
  },
  {
    id: "build_17_12",
    conceptKey: "lesson_17::Path",
    level: 5,
    title: "GET עם path parameter",
    prompt: "כתוב route GET /api/users/:id שמחזיר {id, name} כש-name = 'User '+id. id צריך להיות number ב-JSON (parseInt).",
    starter: "// הקוד שלך",
    tests: [
      { regex: "app\\.get", description: "app.get", flags: "" },
      { regex: ":id", description: "path parameter :id", flags: "" },
      { regex: "req\\.params", description: "req.params", flags: "" },
      { regex: "parseInt", description: "parseInt ל-number", flags: "" },
      { regex: "res\\.json", description: "res.json", flags: "" },
    ],
    reference: "app.get('/api/users/:id', (req, res) => {\n  const id = parseInt(req.params.id, 10);\n  res.json({ id, name: `User ${id}` });\n});",
    hint: "req.params.id הוא string. parseInt(..., 10) להמרה ל-number.",
    explanation: "URL params תמיד strings. אם הclient מצפה ל-number ב-response — חייב המרה. תמיד עם radix 10.",
  },
  {
    id: "build_17_13",
    conceptKey: "lesson_17::4xx-5xx",
    level: 5,
    title: "POST עם validation",
    prompt: "כתוב POST /api/users שמקבל body = {name}. אם name חסר/ריק — החזר 400 עם {error:'name required'}. אחרת 201 עם {id:1, name}.",
    starter: "app.use(express.json());\n// הקוד שלך",
    tests: [
      { regex: "app\\.post", description: "app.post", flags: "" },
      { regex: "/api/users", description: "path", flags: "" },
      { regex: "req\\.body", description: "req.body", flags: "" },
      { regex: "status\\(400\\)", description: "400 על validation fail", flags: "" },
      { regex: "status\\(201\\)", description: "201 על success", flags: "" },
    ],
    reference: "app.post('/api/users', (req, res) => {\n  const { name } = req.body;\n  if (!name) return res.status(400).json({ error: 'name required' });\n  res.status(201).json({ id: 1, name });\n});",
    hint: "201 = Created (לא 200). 400 = Bad Request. status() chained לפני json().",
    explanation: "REST conventions: 201 ליצירה, 400 לvalidation error. json() אחרי status() — שניהם chainable.",
  },

  // ============================================================================
  // Phase 2.B batch — high-impact Build exercises (8)
  // ============================================================================

  {
    id: "build_useeffect_fetch",
    conceptKey: "lesson_24::fetching data",
    level: 6,
    title: "Component שמעלה data ב-mount",
    prompt: "כתוב UserList שמטעין משתמשים מ-/api/users דרך useEffect. הצג ul של names. השתמש ב-useState ל-state.",
    starter: `function UserList() {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "useState", description: "useState ל-state", flags: "" },
      { regex: "useEffect", description: "useEffect ל-fetch", flags: "" },
      { regex: "fetch", description: "fetch /api/users", flags: "" },
      { regex: "\\.then|await", description: "טפל ב-Promise", flags: "" },
      { regex: "<ul", description: "הצג <ul>", flags: "i" },
      { regex: "\\.map", description: "map על ה-array", flags: "" },
    ],
    reference: `function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(setUsers);
  }, []);
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
    hint: "useEffect עם [] = run once. fetch מחזיר Promise. setUsers ב-then.",
    explanation: "Pattern קלאסי: useState ל-data, useEffect עם fetch, render conditional. בproduction להוסיף AbortController ב-cleanup.",
  },

  {
    id: "build_form_controlled",
    conceptKey: "lesson_22::controlled input",
    level: 5,
    title: "Login form controlled",
    prompt: "כתוב LoginForm עם email + password inputs. שני State משלהם. onSubmit מעביר { email, password } לonLogin prop.",
    starter: `function LoginForm({ onLogin }) {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "useState", description: "useState ל-fields", flags: "" },
      { regex: "value=", description: "value מ-state", flags: "" },
      { regex: "onChange", description: "onChange handler", flags: "" },
      { regex: "onSubmit|handleSubmit", description: "submit handler", flags: "" },
      { regex: "onLogin", description: "קריאה ל-onLogin", flags: "" },
      { regex: "preventDefault", description: "preventDefault", flags: "" },
    ],
    reference: `function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <button>Login</button>
    </form>
  );
}`,
    hint: "controlled input: value + onChange. event.preventDefault ב-submit לעצור default reload.",
    explanation: "controlled forms: state מקבל value, onChange מעדכן. submit עוצר default ושולח ל-callback.",
  },

  {
    id: "build_ts_interface_user",
    conceptKey: "lesson_27::interface",
    level: 5,
    title: "TS interface User",
    prompt: "הגדר interface User עם id (string), email (string), age (number אופציונלי), kind ('admin' | 'guest').",
    starter: `// הגדר את User כאן`,
    tests: [
      { regex: "interface\\s+User", description: "interface User", flags: "" },
      { regex: "id:\\s*string", description: "id: string", flags: "" },
      { regex: "email:\\s*string", description: "email: string", flags: "" },
      { regex: "age\\?:\\s*number", description: "age?: number (optional)", flags: "" },
      { regex: "kind:\\s*['\"]admin['\"]\\s*\\|\\s*['\"]guest['\"]", description: "kind union", flags: "" },
    ],
    reference: `interface User {
  id: string;
  email: string;
  age?: number;
  kind: 'admin' | 'guest';
}`,
    hint: "?: ל-optional fields. literal union: 'a' | 'b'.",
    explanation: "interface = shape ב-TS. ? ל-optional. union לערכים סגורים — IDE autocomplete + type-safe.",
  },

  {
    id: "build_async_promise_chain",
    conceptKey: "lesson_15::Asynchronous",
    level: 6,
    title: "async function with try/catch",
    prompt: "כתוב fetchUser(id) שעושה fetch ל-/api/user/{id}. החזר את ה-data. ב-error: log + throw.",
    starter: `async function fetchUser(id) {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "async\\s+function", description: "async function", flags: "" },
      { regex: "try", description: "try block", flags: "" },
      { regex: "catch", description: "catch block", flags: "" },
      { regex: "await\\s+fetch", description: "await fetch", flags: "" },
      { regex: "console\\.error|console\\.log", description: "log ב-catch", flags: "" },
      { regex: "throw", description: "throw מחדש", flags: "" },
    ],
    reference: `async function fetchUser(id) {
  try {
    const res = await fetch('/api/user/' + id);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (err) {
    console.error('fetchUser failed:', err);
    throw err;
  }
}`,
    hint: "try/catch סביב await. log ל-debugging, throw כדי שה-caller יידע.",
    explanation: "async/await + try/catch = error handling קריא יותר מ-Promise.then.catch. throw מחדש מאפשר ל-caller להחליט.",
  },

  {
    id: "build_express_crud_users",
    conceptKey: "lesson_17::Express",
    level: 6,
    title: "Express CRUD endpoints",
    prompt: "כתוב 4 endpoints לCRUD על users (in-memory array): GET /users, GET /users/:id, POST /users, DELETE /users/:id.",
    starter: `const users = [];
let nextId = 1;
// הוסף endpoints כאן`,
    tests: [
      { regex: "app\\.get\\(['\"]\\/users['\"]", description: "GET /users", flags: "" },
      { regex: "app\\.get\\(['\"]\\/users\\/:id", description: "GET /users/:id", flags: "" },
      { regex: "app\\.post\\(['\"]\\/users['\"]", description: "POST /users", flags: "" },
      { regex: "app\\.delete\\(['\"]\\/users\\/:id", description: "DELETE /users/:id", flags: "" },
      { regex: "req\\.params\\.id", description: "req.params.id", flags: "" },
      { regex: "req\\.body", description: "req.body", flags: "" },
      { regex: "status\\(404\\)", description: "404 לא נמצא", flags: "" },
    ],
    reference: `const users = [];
let nextId = 1;
app.get('/users', (req, res) => res.json(users));
app.get('/users/:id', (req, res) => {
  const u = users.find(x => x.id === parseInt(req.params.id, 10));
  if (!u) return res.status(404).json({ error: 'not found' });
  res.json(u);
});
app.post('/users', (req, res) => {
  const u = { id: nextId++, ...req.body };
  users.push(u);
  res.status(201).json(u);
});
app.delete('/users/:id', (req, res) => {
  const i = users.findIndex(x => x.id === parseInt(req.params.id, 10));
  if (i === -1) return res.status(404).end();
  users.splice(i, 1);
  res.status(204).end();
});`,
    hint: "params לdynamic id, body לdata. status 404 בlostings, 201 בcreated, 204 בdeleted (no body).",
    explanation: "REST CRUD: GET (idempotent), POST (create + 201), DELETE (idempotent + 204). הקפד על status codes.",
  },

  {
    id: "build_useReducer_counter",
    conceptKey: "lesson_24::state update",
    level: 6,
    title: "Counter עם useReducer",
    prompt: "כתוב Counter עם useReducer. תומך ב-INCREMENT, DECREMENT, RESET. הצג button לכל action.",
    starter: `function Counter() {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "useReducer", description: "useReducer", flags: "" },
      { regex: "INCREMENT", description: "INCREMENT action", flags: "" },
      { regex: "DECREMENT", description: "DECREMENT action", flags: "" },
      { regex: "RESET", description: "RESET action", flags: "" },
      { regex: "dispatch", description: "dispatch", flags: "" },
      { regex: "switch|action\\.type", description: "switch על type", flags: "" },
    ],
    reference: `function Counter() {
  function reducer(state, action) {
    switch (action.type) {
      case 'INCREMENT': return state + 1;
      case 'DECREMENT': return state - 1;
      case 'RESET': return 0;
      default: return state;
    }
  }
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}`,
    hint: "useReducer(reducer, initialState) → [state, dispatch]. reducer = (state, action) => newState.",
    explanation: "useReducer עדיף על useState למצבים מורכבים עם logic — ה-reducer מרכז את כל המעברים. דומה ל-Redux בקטן.",
  },

  {
    id: "build_mongoose_user_model",
    conceptKey: "lesson_20::Schema",
    level: 6,
    title: "Mongoose User model",
    prompt: "הגדר Mongoose Schema + Model ל-User: email (required, unique), passwordHash (required), createdAt (default: Date.now).",
    starter: `// import mongoose from 'mongoose';
// הגדר Schema + Model כאן`,
    tests: [
      { regex: "new\\s+(mongoose\\.)?Schema", description: "new Schema", flags: "" },
      { regex: "email", description: "email field", flags: "" },
      { regex: "required:\\s*true", description: "required: true", flags: "" },
      { regex: "unique:\\s*true", description: "unique: true", flags: "" },
      { regex: "passwordHash", description: "passwordHash field", flags: "" },
      { regex: "default:\\s*Date\\.now", description: "default: Date.now", flags: "" },
      { regex: "mongoose\\.model|model\\(", description: "model()", flags: "" },
    ],
    reference: `import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('User', userSchema);`,
    hint: "Schema fields = { type, required, unique, default }. mongoose.model('Name', schema) ל-export.",
    explanation: "Schema מגדיר shape + validation + indexes. Model = class לעבודה עם documents. unique: true יוצר MongoDB index אוטומטי.",
  },

  {
    id: "build_bcrypt_signup",
    conceptKey: "lesson_auth_security::password hashing",
    level: 7,
    title: "Sign-up עם bcrypt",
    prompt: "כתוב async signup(email, password) שעושה: bcrypt.hash(password, 10), שמירת user ב-DB עם passwordHash, החזרת user (בלי הסיסמה).",
    starter: `async function signup(email, password) {
  // הקוד שלך כאן
}`,
    tests: [
      { regex: "async", description: "async function", flags: "" },
      { regex: "bcrypt\\.hash", description: "bcrypt.hash", flags: "" },
      { regex: "10", description: "salt rounds 10", flags: "" },
      { regex: "User\\.create|new\\s+User", description: "DB insert", flags: "" },
      { regex: "passwordHash", description: "passwordHash field", flags: "" },
      { regex: "return", description: "return user", flags: "" },
    ],
    reference: `async function signup(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash });
  const { passwordHash: _, ...safe } = user.toObject();
  return safe;
}`,
    hint: "bcrypt.hash async. salt rounds 10 = balance בין מהירות לבטיחות. אל תחזיר את ה-hash ל-client.",
    explanation: "אף פעם לא לאחסן passwords plain. bcrypt עם salt = standard. החזרת user ל-client חייב להיות בלי passwordHash.",
  },

  // ============================================================================
  // Phase 2.B batch 2 — more Build exercises (10)
  // ============================================================================

  {
    id: "build_jwt_sign_verify",
    conceptKey: "lesson_auth_security::JWT",
    level: 6,
    title: "JWT sign + verify",
    prompt: "כתוב signToken(userId) שמייצר JWT עם payload { userId } + expiresIn 1h. כתוב verifyToken(token) שמחזיר את ה-payload או null על שגיאה.",
    starter: `// import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET;
function signToken(userId) {
  // הקוד שלך
}
function verifyToken(token) {
  // הקוד שלך
}`,
    tests: [
      { regex: "jwt\\.sign", description: "jwt.sign", flags: "" },
      { regex: "jwt\\.verify", description: "jwt.verify", flags: "" },
      { regex: "userId", description: "payload userId", flags: "" },
      { regex: "expiresIn", description: "expiresIn", flags: "" },
      { regex: "try", description: "try ב-verify", flags: "" },
      { regex: "catch", description: "catch מחזיר null", flags: "" },
    ],
    reference: `function signToken(userId) {
  return jwt.sign({ userId }, SECRET, { expiresIn: '1h' });
}
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}`,
    hint: "jwt.sign(payload, secret, options). jwt.verify זורק error — try/catch.",
    explanation: "JWT = self-contained tokens. expiresIn קצר ל-access (15m-1h), refresh ארוך יותר. SECRET ב-env בלבד.",
  },

  {
    id: "build_react_context_theme",
    conceptKey: "lesson_23::Context API",
    level: 6,
    title: "Theme Context",
    prompt: "כתוב ThemeContext עם value 'light'/'dark', ThemeProvider שמספק toggle, ו-useTheme hook לקריאת ה-context.",
    starter: `// import { createContext, useContext, useState } from 'react';
// כתוב את הקוד כאן`,
    tests: [
      { regex: "createContext", description: "createContext", flags: "" },
      { regex: "useState", description: "useState ל-theme", flags: "" },
      { regex: "Provider", description: "Provider component", flags: "" },
      { regex: "useContext", description: "useContext", flags: "" },
      { regex: "function\\s+useTheme|const\\s+useTheme", description: "useTheme hook", flags: "" },
      { regex: "'light'|\"light\"", description: "default 'light'", flags: "" },
      { regex: "'dark'|\"dark\"", description: "value 'dark'", flags: "" },
    ],
    reference: `const ThemeContext = createContext({ theme: 'light', toggle: () => {} });
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
function useTheme() {
  return useContext(ThemeContext);
}`,
    hint: "createContext עם default. Provider עוטף children. custom hook לעטיפה נקייה של useContext.",
    explanation: "Context = data sharing דרך עץ. custom hook (useTheme) = better DX, מקפל את useContext + ה-Context object.",
  },

  {
    id: "build_useMemo_filter",
    conceptKey: "lesson_24::useMemo",
    level: 6,
    title: "Filtered list עם useMemo",
    prompt: "כתוב SearchableList שמקבל items + query, מסנן items.filter(x => x.name.includes(query)), ומrenders <ul>. השתמש ב-useMemo.",
    starter: `function SearchableList({ items, query }) {
  // הקוד שלך
}`,
    tests: [
      { regex: "useMemo", description: "useMemo", flags: "" },
      { regex: "items", description: "items prop", flags: "" },
      { regex: "query", description: "query prop", flags: "" },
      { regex: "\\.filter", description: ".filter", flags: "" },
      { regex: "\\.includes", description: ".includes", flags: "" },
      { regex: "<ul", description: "<ul>", flags: "i" },
      { regex: "\\.map", description: ".map", flags: "" },
    ],
    reference: `function SearchableList({ items, query }) {
  const filtered = useMemo(
    () => items.filter(x => x.name.includes(query)),
    [items, query]
  );
  return (
    <ul>
      {filtered.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}`,
    hint: "useMemo(fn, deps). deps = [items, query] — recalc רק כשמשתנים.",
    explanation: "useMemo מתאים לחישובים יקרים. כאן filter על מערך גדול — הימנעות מrecalc ב-renders שלא קשורים.",
  },

  {
    id: "build_zod_schema",
    conceptKey: "lesson_27::interface",
    level: 6,
    title: "Zod schema לvalidation",
    prompt: "הגדר Zod schema ל-User: email (valid email), age (number ≥18), name (string min 2).",
    starter: `// import { z } from 'zod';
const UserSchema = // הקוד שלך`,
    tests: [
      { regex: "z\\.object", description: "z.object", flags: "" },
      { regex: "email:\\s*z\\.string\\(\\)\\.email", description: "email validator", flags: "" },
      { regex: "age:\\s*z\\.number", description: "age: z.number", flags: "" },
      { regex: "\\.min\\(18\\)", description: "min(18) על age", flags: "" },
      { regex: "name:\\s*z\\.string", description: "name: z.string", flags: "" },
      { regex: "\\.min\\(2\\)", description: "min(2) על name", flags: "" },
    ],
    reference: `const UserSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
  name: z.string().min(2),
});`,
    hint: "z.object({...}) ל-shape. z.string().email() לemail. z.number().min(N) לrange.",
    explanation: "Zod = runtime validation עם type inference. UserSchema.parse(data) זורק על invalid; safeParse מחזיר { success, data | error }.",
  },

  {
    id: "build_express_middleware_auth",
    conceptKey: "lesson_17::middleware",
    level: 7,
    title: "Auth middleware",
    prompt: "כתוב middleware authMiddleware שבודק Authorization header עם 'Bearer X', מאמת JWT, ושומר user ב-req.user. אם לא תקין: 401.",
    starter: `function authMiddleware(req, res, next) {
  // הקוד שלך
}`,
    tests: [
      { regex: "req\\.headers", description: "req.headers", flags: "" },
      { regex: "Authorization|authorization", description: "Authorization header", flags: "" },
      { regex: "Bearer", description: "Bearer scheme", flags: "" },
      { regex: "jwt\\.verify", description: "jwt.verify", flags: "" },
      { regex: "401", description: "401 על fail", flags: "" },
      { regex: "next\\(\\)", description: "next() על success", flags: "" },
      { regex: "req\\.user", description: "req.user = payload", flags: "" },
    ],
    reference: `function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' });
  }
  const token = auth.slice(7);
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}`,
    hint: "Bearer scheme: 'Bearer <token>'. slice(7) להסיר prefix. next() ממשיך, אחרת res עם 401.",
    explanation: "auth middleware נפוץ. שמור user ב-req למסלולים הבאים. החזרה ב-401 (לא 403) כשאין token תקין.",
  },

  {
    id: "build_react_form_validation",
    conceptKey: "lesson_22::form basics",
    level: 6,
    title: "Form עם validation בסיסי",
    prompt: "כתוב EmailForm: input + submit. validation: email חייב @. אם invalid, הצג שגיאה. אם valid, קרא ל-onSubmit prop.",
    starter: `function EmailForm({ onSubmit }) {
  // הקוד שלך
}`,
    tests: [
      { regex: "useState", description: "useState ל-email + error", flags: "" },
      { regex: "value=", description: "controlled input", flags: "" },
      { regex: "onChange", description: "onChange handler", flags: "" },
      { regex: "@", description: "בדיקת @", flags: "" },
      { regex: "preventDefault", description: "preventDefault", flags: "" },
      { regex: "onSubmit", description: "onSubmit prop", flags: "" },
      { regex: "error|שגיאה", description: "הצגת error", flags: "" },
    ],
    reference: `function EmailForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('אימייל לא תקין');
      return;
    }
    setError('');
    onSubmit(email);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      {error && <span>{error}</span>}
      <button>שלח</button>
    </form>
  );
}`,
    hint: "validation ב-handleSubmit לפני setError. preventDefault עוצר reload.",
    explanation: "Client validation = UX מהיר. תמיד גם server validation כי client יכול להיעקף. error UI נסתר עד שיש שגיאה.",
  },

  {
    id: "build_localStorage_hook",
    conceptKey: "lesson_24::useState",
    level: 6,
    title: "useLocalStorage hook",
    prompt: "כתוב custom hook useLocalStorage(key, initialValue) שמתנהג כמו useState אבל מסנכרן עם localStorage.",
    starter: `function useLocalStorage(key, initialValue) {
  // הקוד שלך
}`,
    tests: [
      { regex: "useState", description: "useState פנימי", flags: "" },
      { regex: "localStorage", description: "localStorage", flags: "" },
      { regex: "getItem", description: "getItem", flags: "" },
      { regex: "setItem", description: "setItem", flags: "" },
      { regex: "JSON\\.parse", description: "JSON.parse לpercifying", flags: "" },
      { regex: "JSON\\.stringify", description: "JSON.stringify לכתיבה", flags: "" },
      { regex: "return\\s*\\[", description: "return [value, setter]", flags: "" },
    ],
    reference: `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  function update(newValue) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }
  return [value, update];
}`,
    hint: "useState עם lazy initializer לקריאה מ-localStorage. החזרה: [value, custom setter שכותב גם ל-storage].",
    explanation: "Custom hooks = הרכבת hooks לAPI שימושית. Pattern: same shape כ-useState אבל עם side effect של persistence.",
  },

  {
    id: "build_nextjs_route_handler",
    conceptKey: "lesson_nextjs::API route",
    level: 6,
    title: "Next.js route handler",
    prompt: "כתוב app/api/users/route.ts: GET = מחזיר {users}; POST = מקבל {name} ב-body, מחזיר 201 + new user.",
    starter: `// app/api/users/route.ts
// import { NextRequest } from 'next/server';
// הקוד שלך`,
    tests: [
      { regex: "export\\s+(async\\s+)?function\\s+GET", description: "export GET", flags: "" },
      { regex: "export\\s+(async\\s+)?function\\s+POST", description: "export POST", flags: "" },
      { regex: "NextResponse\\.json|Response\\.json", description: "Response.json", flags: "" },
      { regex: "await\\s+req\\.json|request\\.json", description: "req.json()", flags: "" },
      { regex: "201", description: "status 201 ל-POST", flags: "" },
    ],
    reference: `let users = [];
let nextId = 1;
export async function GET() {
  return Response.json({ users });
}
export async function POST(request) {
  const { name } = await request.json();
  const user = { id: nextId++, name };
  users.push(user);
  return Response.json(user, { status: 201 });
}`,
    hint: "Next.js 13+ App Router: export function per HTTP method. await request.json() ל-body. Response.json(data, { status }) להחזרה.",
    explanation: "Route handlers ב-Next.js 13+: file-based, async functions per method. החליף את pages/api מהגרסאות הישנות.",
  },

  {
    id: "build_useReducer_todo",
    conceptKey: "lesson_24::useReducer",
    level: 7,
    title: "Todo עם useReducer",
    prompt: "כתוב TodoApp עם useReducer: state = todos[]; actions: ADD (text), TOGGLE (id), REMOVE (id). רנדר רשימה + form להוספה.",
    starter: `function TodoApp() {
  // הקוד שלך
}`,
    tests: [
      { regex: "useReducer", description: "useReducer", flags: "" },
      { regex: "ADD", description: "action ADD", flags: "" },
      { regex: "TOGGLE", description: "action TOGGLE", flags: "" },
      { regex: "REMOVE", description: "action REMOVE", flags: "" },
      { regex: "dispatch", description: "dispatch", flags: "" },
      { regex: "switch|action\\.type", description: "switch על type", flags: "" },
      { regex: "\\.\\.\\.", description: "spread (immutable)", flags: "" },
      { regex: "<form|<input", description: "form/input", flags: "i" },
    ],
    reference: `function TodoApp() {
  function reducer(state, action) {
    switch (action.type) {
      case 'ADD': return [...state, { id: Date.now(), text: action.text, done: false }];
      case 'TOGGLE': return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t);
      case 'REMOVE': return state.filter(t => t.id !== action.id);
      default: return state;
    }
  }
  const [todos, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState('');
  return (
    <div>
      <form onSubmit={e => { e.preventDefault(); dispatch({ type: 'ADD', text }); setText(''); }}>
        <input value={text} onChange={e => setText(e.target.value)} />
        <button>+</button>
      </form>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <input type="checkbox" checked={t.done} onChange={() => dispatch({ type: 'TOGGLE', id: t.id })} />
            {t.text}
            <button onClick={() => dispatch({ type: 'REMOVE', id: t.id })}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    hint: "useReducer לstate מורכב יותר. action = { type, payload }. reducer מחזיר state חדש (immutable).",
    explanation: "useReducer לטענות עם logic מורכב או הרבה actions. spread/map/filter ל-immutable updates.",
  },

  {
    id: "build_debounce_hook",
    conceptKey: "lesson_24::useEffect",
    level: 7,
    title: "useDebounce hook",
    prompt: "כתוב useDebounce(value, delay) שמחזיר את value אחרי delay ms של 'דממה' (אין שינוי). שימושי לחיפוש live.",
    starter: `function useDebounce(value, delay) {
  // הקוד שלך
}`,
    tests: [
      { regex: "useState", description: "useState ל-debounced", flags: "" },
      { regex: "useEffect", description: "useEffect", flags: "" },
      { regex: "setTimeout", description: "setTimeout", flags: "" },
      { regex: "clearTimeout", description: "clearTimeout בcleanup", flags: "" },
      { regex: "return", description: "return debounced value", flags: "" },
    ],
    reference: `function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}`,
    hint: "כל שינוי של value מאתחל timer חדש. cleanup = clearTimeout של הקודם.",
    explanation: "Debounce = השהיית עדכון עד שמשתמש מפסיק לדפדף. שימושי ב-search inputs כדי לא לעמוס על השרת בכל הקלדה.",
  },
];

// Export to global scope (no module system in this app)
if (typeof window !== "undefined") {
  window.QUESTIONS_BUILD = QUESTIONS_BUILD;
}
