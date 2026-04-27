// data/questions_bug.js
//
// Bug Hunt question type — the user reads broken code, identifies the bug,
// chooses what's wrong from 4 options, and sees the fix + explanation.
//
// Schema:
//   {
//     id:           "bug_22_01",
//     conceptKey:   "lesson_22::useState",
//     level:        1..6,
//     title:        "מצא את הבאג ב-counter",
//     brokenCode:   "function Counter() {\n  let count = 0;\n  ..."  // multi-line
//     bugLine:      2,                                 // 1-indexed line(s) with bug
//     hint:         "מה קורה כש-React מרנדר מחדש?",     // optional first-look hint
//     options: [                                       // 4 multi-choice options
//       "השימוש ב-let במקום useState — שינוי משתנה לא גורם ל-re-render",
//       "...", "...", "..."
//     ],
//     correctIndex: 0,                                 // 0..3
//     fix:          "function Counter() {\n  const [count..."
//     explanation:  "React מרנדר רק כשstate משתנה — let count לא מפעיל..."
//   }
//
// Coverage: 14 questions — 2 per lesson 21-27.
// All bugs are real bugs that students hit in production.

var QUESTIONS_BUG = [

  // ============================================================================
  // Lesson 21 — React Basics, JSX, props
  // ============================================================================

  {
    id: "bug_21_01",
    conceptKey: "lesson_21::map",
    level: 3,
    title: "רשימה ללא key",
    brokenCode:
`function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li>{todo.text}</li>
      ))}
    </ul>
  );
}`,
    bugLine: 5,
    hint: "מה קורה כש-React צריך להבין איזה item השתנה ברשימה?",
    options: [
      "חסר prop key על ה-<li>; React לא יודע לעקוב אחר items בעת רינדור",
      "צריך להחליף את <ul> ב-<div>",
      "todos.map חייב לקבל index בלבד, לא todo",
      "צריך להחזיר <li> בלי ה-(...) הסוגריים"
    ],
    correctIndex: 0,
    fix:
`function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`,
    explanation:
      "כשמרנדרים רשימה, React מאתר items לפי key ייחודי. בלי key, הוא משתמש ב-index — מה שגורם לבאגים בעריכה/מחיקה (state \"זולג\" בין items). הפתרון: key={todo.id} עם מזהה יציב.",
  },

  {
    id: "bug_21_02",
    conceptKey: "lesson_21::props",
    level: 2,
    title: "מנסים לשנות prop",
    brokenCode:
`function Counter({ count }) {
  count = count + 1;
  return <div>{count}</div>;
}`,
    bugLine: 2,
    hint: "מי הבעלים של count? האב או הבן?",
    options: [
      "props הם read-only — הבן לא יכול לשנות אותם; צריך useState או callback לאב",
      "צריך לכתוב this.count במקום count",
      "חסר return לפני count = count + 1",
      "צריך לעטוף את count ב-{}"
    ],
    correctIndex: 0,
    fix:
`function Counter({ count, onIncrement }) {
  return (
    <div>
      {count}
      <button onClick={onIncrement}>+1</button>
    </div>
  );
}`,
    explanation:
      "props הם מתנה מהאב — אסור לשנות אותם בקומפוננטת הבן. או שתוסיף useState מקומי, או שתעלה event לאב (callback) שישנה את ה-state שלו.",
  },

  // ============================================================================
  // Lesson 22 — useState, Immutable State
  // ============================================================================

  {
    id: "bug_22_01",
    conceptKey: "lesson_22::useState",
    level: 2,
    title: "let במקום useState",
    brokenCode:
`function Counter() {
  let count = 0;
  return (
    <button onClick={() => count++}>
      Count: {count}
    </button>
  );
}`,
    bugLine: 2,
    hint: "מה הופעל כש-React מציג קומפוננטה? מה קורה לערך של let בכל הצגה?",
    options: [
      "let count = 0 — בכל רינדור count מאופס; שינוי משתנה לא מפעיל re-render",
      "צריך להחליף את onClick ב-onPress",
      "ה-count++ לא תקין כי הוא צריך להיות count = count + 1",
      "חסר key ל-button"
    ],
    correctIndex: 0,
    fix:
`function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
    explanation:
      "React מרנדר מחדש רק כשstate משתנה דרך setState. let count הוא משתנה רגיל — count++ אכן משנה אותו, אבל React לא יודע שצריך לרנדר מחדש, וברינדור הבא הוא יאופס שוב ל-0.",
  },

  {
    id: "bug_22_02",
    conceptKey: "lesson_22::immutable",
    level: 4,
    title: "מוטציה ישירה של מערך state",
    brokenCode:
`const [todos, setTodos] = useState([]);

function addTodo(text) {
  todos.push({ id: Date.now(), text });
  setTodos(todos);
}`,
    bugLine: 4,
    hint: "מה React משווה כדי להחליט אם לרנדר מחדש?",
    options: [
      "todos.push משנה את אותו array — React משווה לפי הפניה ולא רואה שינוי",
      "Date.now() לא מחזיר מספר תקין כ-id",
      "צריך לקרוא ל-setTodos לפני ה-push",
      "addTodo חייב להיות async"
    ],
    correctIndex: 0,
    fix:
`const [todos, setTodos] = useState([]);

function addTodo(text) {
  setTodos([...todos, { id: Date.now(), text }]);
}`,
    explanation:
      "React משווה הפניות (===), לא תוכן. push מחזיר את אותו array — אין שינוי הפניה, אין re-render. הפתרון: spread + item חדש = array חדש, הפניה חדשה, re-render.",
  },

  // ============================================================================
  // Lesson 23 — Forms, Conditional Rendering, Lists
  // ============================================================================

  {
    id: "bug_23_01",
    conceptKey: "lesson_22::controlled input",
    level: 3,
    title: "input ללא value/onChange",
    brokenCode:
`function NameForm() {
  const [name, setName] = useState('');
  return (
    <input value={name} />
  );
}`,
    bugLine: 4,
    hint: "מה קורה כשמשתמש מנסה להקליד ב-input?",
    options: [
      "input מקבל value מ-state אבל אין onChange — React לא נותן להקליד (read-only)",
      "צריך להחליף value ב-defaultValue",
      "useState צריך לקבל null במקום ''",
      "חסר type='text' ב-input"
    ],
    correctIndex: 0,
    fix:
`function NameForm() {
  const [name, setName] = useState('');
  return (
    <input value={name} onChange={e => setName(e.target.value)} />
  );
}`,
    explanation:
      "controlled input חייב גם value וגם onChange. בלי onChange, React מתעקש על הערך מ-state ומונע הקלדה. הפתרון: setName בכל onChange.",
  },

  {
    id: "bug_23_02",
    conceptKey: "lesson_21::rendering",
    level: 4,
    title: "&& עם מספר אפס",
    brokenCode:
`function Cart({ items }) {
  return (
    <div>
      {items.length && <p>יש {items.length} פריטים</p>}
    </div>
  );
}`,
    bugLine: 4,
    hint: "מה React מציג כשהמערך ריק (length = 0)?",
    options: [
      "כש-items.length === 0, React מציג '0' בדף (0 הוא falsy אבל לא מסונן ב-JSX)",
      "צריך להחליף && ב-||",
      "items.length חייב להיות string",
      "חסר return ב-JSX"
    ],
    correctIndex: 0,
    fix:
`function Cart({ items }) {
  return (
    <div>
      {items.length > 0 && <p>יש {items.length} פריטים</p>}
    </div>
  );
}`,
    explanation:
      "ב-JSX, התבנית `0 && X` מחזירה 0 — וReact מציג '0' בדף. לעומת זאת, `false && X` מציג כלום. הפתרון: השוואה מפורשת: `items.length > 0 &&` או `items.length ? <p/> : null`.",
  },

  // ============================================================================
  // Lesson 24 — useEffect, useMemo, useRef
  // ============================================================================

  {
    id: "bug_24_01",
    conceptKey: "lesson_24::useEffect",
    level: 5,
    title: "useEffect ללא dependency array",
    brokenCode:
`function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('/api/users/' + userId)
      .then(r => r.json())
      .then(setUser);
  });
  return <div>{user?.name}</div>;
}`,
    bugLine: 3,
    hint: "מתי useEffect ירוץ אם לא תיתן לו dependency array?",
    options: [
      "ללא deps array — useEffect רץ אחרי כל רינדור; setUser גורם רינדור → fetch אינסופי",
      "fetch לא תקין — צריך להחליף ב-axios",
      "user?.name לא יכול להיות null",
      "חסר async/await ב-useEffect"
    ],
    correctIndex: 0,
    fix:
`function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('/api/users/' + userId)
      .then(r => r.json())
      .then(setUser);
  }, [userId]);
  return <div>{user?.name}</div>;
}`,
    explanation:
      "ללא deps array, useEffect רץ אחרי כל רינדור. setUser → re-render → useEffect שוב → fetch שוב → אינסופי. עם [userId] — רץ רק כשuserId משתנה. עם [] — רק פעם אחת אחרי mount.",
  },

  {
    id: "bug_24_02",
    conceptKey: "lesson_24::useEffect",
    level: 5,
    title: "Memory leak — חסר cleanup",
    brokenCode:
`function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);
  return <div>{time.toLocaleTimeString()}</div>;
}`,
    bugLine: 4,
    hint: "מה קורה כשהקומפוננטה נמחקת מהדף?",
    options: [
      "אין cleanup — setInterval ממשיך לרוץ לאחר unmount; דליפת זיכרון + warning",
      "צריך לשנות 1000 ל-100",
      "useState צריך לקבל function במקום new Date()",
      "חסר key לקומפוננטה"
    ],
    correctIndex: 0,
    fix:
`function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <div>{time.toLocaleTimeString()}</div>;
}`,
    explanation:
      "useEffect שמייצר side-effect (interval, listener, subscription) חייב cleanup function שמחזירה. אחרת, ה-interval ימשיך לרוץ אחרי unmount, ינסה לעדכן state של קומפוננטה מתה (warning) ויצרוך זיכרון.",
  },

  // ============================================================================
  // Lesson 25 — Tailwind CSS, Production
  // ============================================================================

  {
    id: "bug_25_01",
    conceptKey: "lesson_25::Tailwind CSS",
    level: 4,
    title: "Tailwind class לא נטען (PurgeCSS)",
    brokenCode:
`function Alert({ severity }) {
  const colorClass = 'bg-' + severity + '-500';
  return <div className={colorClass}>שגיאה!</div>;
}

// usage: <Alert severity="red" />`,
    bugLine: 2,
    hint: "Tailwind מנקה class-ים שלא ראה במקור הקוד. איזה class הוא רואה כאן?",
    options: [
      "Tailwind PurgeCSS לא מזהה bg-red-500 כי הוא נבנה דינמית; הclass נמחק מה-CSS הסופי",
      "צריך לכתוב backgroundColor במקום className",
      "severity חייב להיות number",
      "חסר key לאלמנט div"
    ],
    correctIndex: 0,
    fix:
`function Alert({ severity }) {
  const map = {
    red:    'bg-red-500',
    yellow: 'bg-yellow-500',
    green:  'bg-green-500',
  };
  return <div className={map[severity]}>שגיאה!</div>;
}`,
    explanation:
      "Tailwind v3+ סורק את קבצי הקוד וכולל רק class-ים שהוא רואה בטקסט. concatenation דינמית ('bg-' + x + '-500') לא מופיע במקור — הclass נמחק. הפתרון: map static של class-ים מלאים.",
  },

  {
    id: "bug_25_02",
    conceptKey: "lesson_21::className",
    level: 1,
    title: "class במקום className",
    brokenCode:
`function Header() {
  return (
    <header class="bg-blue-500 p-4">
      Hello
    </header>
  );
}`,
    bugLine: 3,
    hint: "JSX לא HTML טהור — איזה reserved word מתנגש?",
    options: [
      "ב-JSX, 'class' שמור ל-JS classes; צריך לכתוב className",
      "header אינו element חוקי ב-React",
      "צריך לעטוף ב-React.Fragment",
      "חסר type לאלמנט header"
    ],
    correctIndex: 0,
    fix:
`function Header() {
  return (
    <header className="bg-blue-500 p-4">
      Hello
    </header>
  );
}`,
    explanation:
      "ב-JSX, 'class' שמור ל-JavaScript class. השם המתאים ב-JSX הוא className — React ממיר אותו ל-class ב-DOM הסופי. כנ\"ל for→htmlFor.",
  },

  // ============================================================================
  // Lesson 26 — TypeScript
  // ============================================================================

  {
    id: "bug_26_01",
    conceptKey: "lesson_26::TypeScript",
    level: 4,
    title: "any כשצריך type מדויק",
    brokenCode:
`function getUser(id: any) {
  return fetch('/api/users/' + id).then(r => r.json());
}

const user = getUser('abc');`,
    bugLine: 1,
    hint: "any מכבה את כל הבדיקות. למה זה רע?",
    options: [
      "any מבטל בדיקת types; getUser('abc') יעבור גם אם id חייב להיות מספר",
      "fetch לא תקין ב-TypeScript",
      "צריך להחליף return ב-async/await",
      "id חייב להיות const ולא parameter"
    ],
    correctIndex: 0,
    fix:
`function getUser(id: number): Promise<User> {
  return fetch('/api/users/' + id).then(r => r.json());
}

const user = getUser(123); // 'abc' would now error at compile time`,
    explanation:
      "any מבטל את כל ההגנה של TypeScript — קוד יעבור compile אבל יכשל ב-runtime. הפתרון: type ספציפי (number, string, User). אם באמת לא יודעים — unknown (מכריח type-check לפני שימוש).",
  },

  {
    id: "bug_26_02",
    conceptKey: "lesson_26::Strongly Typed",
    level: 3,
    title: "TypeError: Cannot read property",
    brokenCode:
`function UserName({ user }) {
  return <h1>{user.profile.name}</h1>;
}

// usage: <UserName user={null} />`,
    bugLine: 2,
    hint: "מה קורה אם user הוא null או profile חסר?",
    options: [
      "user.profile.name יזרוק TypeError כש-user או profile null/undefined; חסר optional chaining",
      "h1 לא יכול להכיל JSX expression",
      "user חייב להיות string",
      "name חייב להיות מוקף ב-{{}}"
    ],
    correctIndex: 0,
    fix:
`function UserName({ user }) {
  return <h1>{user?.profile?.name ?? 'אורח'}</h1>;
}

// usage: <UserName user={null} /> // יציג "אורח" במקום לקרוס`,
    explanation:
      "?. (optional chaining) מחזיר undefined במקום לזרוק כשהשרשרת נשברת. ?? (nullish coalescing) נותן ערך ברירת מחדל ל-null/undefined. שילוב = קוד עמיד.",
  },

  // ============================================================================
  // Lesson 27 — Custom Hooks, Advanced Patterns
  // ============================================================================

  {
    id: "bug_27_01",
    conceptKey: "lesson_closures::stale closure",
    level: 5,
    title: "Stale closure ב-setInterval",
    brokenCode:
`function useCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return count;
}`,
    bugLine: 5,
    hint: "מה הערך של count בתוך ה-callback של setInterval?",
    options: [
      "Stale closure: setInterval סוגר על count=0 לנצח; setCount(0+1) תמיד; count נתקע ב-1",
      "צריך useCallback סביב setCount",
      "useEffect לא יכול לקבל dependency array ריקה",
      "1000 גדול מדי כ-interval"
    ],
    correctIndex: 0,
    fix:
`function useCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // functional update — תמיד מקבל את הערך הטרי
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return count;
}`,
    explanation:
      "ה-callback של setInterval נוצר פעם אחת (deps=[]) — הוא 'תפס' את count=0. setCount(0+1) רץ כל שניה ומגדיר 1. הפתרון: setCount(c => c + 1) — מקבל את הערך הטרי בכל קריאה, ללא צורך ב-closure.",
  },

  {
    id: "bug_27_02",
    conceptKey: "lesson_24::dependency array",
    level: 6,
    title: "Object reference ב-deps array",
    brokenCode:
`function ProductList() {
  const filter = { active: true, sortBy: 'name' };
  useEffect(() => {
    fetchProducts(filter);
  }, [filter]);
  return null;
}`,
    bugLine: 2,
    hint: "מה ההפניה של filter בכל רינדור?",
    options: [
      "filter נוצר מחדש בכל render — הפניה חדשה — useEffect רץ אינסוף פעמים",
      "fetchProducts אינו פונקציה",
      "useEffect חייב להחזיר משהו",
      "סדר ה-keys ב-filter שגוי"
    ],
    correctIndex: 0,
    fix:
`function ProductList() {
  const filter = useMemo(
    () => ({ active: true, sortBy: 'name' }),
    []
  );
  useEffect(() => {
    fetchProducts(filter);
  }, [filter]);
  return null;
}`,
    explanation:
      "{ active: true } נוצר מחדש בכל render — מבחינת === הוא 'אובייקט חדש'. useEffect משווה לפי === ולא מכיר אותו → רץ שוב → re-render → loop. useMemo מייצב את ההפניה כל עוד deps לא משתנים. (חלופה: להעביר primitives [filter.active, filter.sortBy].)",
  },

];

// Export to global scope (no module system in this app)
if (typeof window !== "undefined") {
  window.QUESTIONS_BUG = QUESTIONS_BUG;
}
