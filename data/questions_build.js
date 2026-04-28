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
];

// Export to global scope (no module system in this app)
if (typeof window !== "undefined") {
  window.QUESTIONS_BUILD = QUESTIONS_BUILD;
}
