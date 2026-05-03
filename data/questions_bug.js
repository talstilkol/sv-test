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
    conceptKey: "lesson_24::cleanup",
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

  // ============================================================================
  // Lesson 19 — JS fundamentals bugs (top-gap manual batch 2026-05-02)
  // ============================================================================
  {
    id: "bug_19_01",
    conceptKey: "lesson_19::var",
    level: 5,
    title: "מסך setTimeout בלולאה מציג רק 5",
    brokenCode:
`for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}`,
    bugLine: 1,
    hint: "מתי הפונקציה ב-setTimeout באמת קוראת ל-i?",
    options: [
      "var function-scoped — כל ה-callbacks חולקים את אותו i, ועד שהם רצים i כבר 5",
      "setTimeout שגוי — חייב 0 במקום 100",
      "console.log לא תומך במספרים",
      "i צריך להיות מוגדר מחוץ לולאה"
    ],
    correctIndex: 0,
    fix:
`for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}`,
    explanation: "let block-scoped — יוצר binding חדש בכל איטרציה. ה-callbacks 'תופסים' i שונה לכל אחד. var function-scoped — i יחיד שמשתנה.",
  },
  {
    id: "bug_19_02",
    conceptKey: "lesson_19::fetch",
    level: 5,
    title: "API שמחזיר 404 לא תופס שגיאה",
    brokenCode:
`async function loadUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('failed:', err);
  }
}`,
    bugLine: 4,
    hint: "מתי fetch דוחה את ה-Promise?",
    options: [
      "fetch לא דוחה על HTTP errors (404/500) — חייב לבדוק res.ok ידנית",
      "await לא עובד עם fetch",
      "res.json() תמיד מחזיר null",
      "צריך להוסיף .then אחרי fetch"
    ],
    correctIndex: 0,
    fix:
`async function loadUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('failed:', err);
  }
}`,
    explanation: "fetch דוחה רק על network errors. 4xx/5xx נחשבים success (קיבלנו response). אם רוצים לתפוס אותם — בדוק res.ok ו-throw ידנית.",
  },
  {
    id: "bug_19_03",
    conceptKey: "lesson_19::nested object",
    level: 4,
    title: "TypeError על user undefined",
    brokenCode:
`function showCity(user) {
  return user.address.city;
}
console.log(showCity(undefined));`,
    bugLine: 2,
    hint: "מה קורה כשuser הוא undefined?",
    options: [
      "אין הגנה — צריך optional chaining: user?.address?.city",
      "city לא קיים אוטומטית",
      "address צריך להיות array",
      "user חייב להיות string"
    ],
    correctIndex: 0,
    fix:
`function showCity(user) {
  return user?.address?.city ?? 'unknown';
}
console.log(showCity(undefined));`,
    explanation: "user.address זורק TypeError כשuser undefined. ?. מחזיר undefined בבטחה. ?? מספק default אם undefined/null.",
  },
  {
    id: "bug_19_04",
    conceptKey: "lesson_19::throw",
    level: 4,
    title: "throw של string לא נותן stack trace",
    brokenCode:
`function validateAge(age) {
  if (age < 0) throw 'age must be positive';
  return age;
}`,
    bugLine: 2,
    hint: "מה ההבדל בין throw 'string' ל-throw new Error()?",
    options: [
      "throw של string לא יוצר stack trace — קשה לאתר את המקור",
      "throw לא תומך ב-strings בכלל",
      "צריך להחזיר error לא לזרוק",
      "validateAge חייב להיות async"
    ],
    correctIndex: 0,
    fix:
`function validateAge(age) {
  if (age < 0) throw new Error('age must be positive');
  return age;
}`,
    explanation: "Error object מספק name + message + stack trace. catch(e => e.message) — עובד גם עם string וגם עם Error. אבל debugging דורש stack trace.",
  },
  {
    id: "bug_19_05",
    conceptKey: "lesson_19::localStorage",
    level: 4,
    title: "localStorage שומר '[object Object]'",
    brokenCode:
`const settings = { theme: 'dark', lang: 'he' };
localStorage.setItem('settings', settings);
const back = localStorage.getItem('settings');
console.log(back); // "[object Object]"`,
    bugLine: 2,
    hint: "אילו ערכים localStorage יודע לשמור?",
    options: [
      "localStorage שומר strings בלבד — חייב JSON.stringify לפני, JSON.parse אחרי",
      "settings צריך להיות string מראש",
      "localStorage לא תומך באובייקטים",
      "צריך setObject במקום setItem"
    ],
    correctIndex: 0,
    fix:
`const settings = { theme: 'dark', lang: 'he' };
localStorage.setItem('settings', JSON.stringify(settings));
const raw = localStorage.getItem('settings');
const back = raw ? JSON.parse(raw) : {};`,
    explanation: "localStorage עושה String(value) על כל ערך → אובייקט נהיה '[object Object]'. JSON serialize/parse מתחזק את המבנה.",
  },
  {
    id: "bug_19_06",
    conceptKey: "lesson_19::promise",
    level: 5,
    title: "unhandled promise rejection",
    brokenCode:
`async function save(data) {
  await fetch('/api/save', { method: 'POST', body: JSON.stringify(data) });
}
save({ name: 'X' });`,
    bugLine: 4,
    hint: "מה קורה אם fetch נכשל?",
    options: [
      "אם save() דוחה — אין catch, מקבלים UnhandledPromiseRejection",
      "save חייב להחזיר ערך",
      "fetch לא תואם async",
      "JSON.stringify יזרוק שגיאה"
    ],
    correctIndex: 0,
    fix:
`async function save(data) {
  await fetch('/api/save', { method: 'POST', body: JSON.stringify(data) });
}
save({ name: 'X' }).catch(err => console.error('save failed:', err));`,
    explanation: "כל async function שלא מטופלת בexcution צריכה .catch או try/await/catch. Unhandled rejections גורמים ל-warning או crash ב-Node.",
  },

  // ============================================================================
  // Lesson 17 — Express bugs (top-gap manual batch 2026-05-02)
  // ============================================================================
  {
    id: "bug_17_01",
    conceptKey: "lesson_17::app.post",
    level: 4,
    title: "req.body undefined ב-POST",
    brokenCode:
`const app = express();
app.post('/users', (req, res) => {
  console.log(req.body); // undefined
  res.json({ id: 1 });
});`,
    bugLine: 3,
    hint: "מה Express צריך כדי לפרסר את ה-body?",
    options: [
      "חסר middleware — חייב app.use(express.json()) לפני ה-routes",
      "POST לא תומך בbody",
      "req.body צריך להיות req.params",
      "JSON לא נתמך"
    ],
    correctIndex: 0,
    fix:
`const app = express();
app.use(express.json());
app.post('/users', (req, res) => {
  console.log(req.body);
  res.json({ id: 1 });
});`,
    explanation: "Express ב-default לא קורא את ה-request body. express.json() middleware קורא ומפרסר JSON ל-req.body. חייב לפני ה-routes.",
  },
  {
    id: "bug_17_02",
    conceptKey: "lesson_17::Path",
    level: 4,
    title: "path parameter כstring במקום number",
    brokenCode:
`app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  if (id === 1) res.send('admin');
  else res.send('user');
});
// GET /users/1 → 'user'?!`,
    bugLine: 3,
    hint: "מה הtype של req.params.id?",
    options: [
      "req.params.id תמיד string — צריך parseInt או ===  '1'",
      "Express בעיה בparsing",
      "צריך :id להיות :int",
      "req.body במקום req.params"
    ],
    correctIndex: 0,
    fix:
`app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id === 1) res.send('admin');
  else res.send('user');
});`,
    explanation: "URL הוא string מטבעו. כל path/query parameters הם strings. השוואה === 1 (number) תמיד false. parseInt או String comparison.",
  },

  // ============================================================================
  // Phase 2.C batch — high-impact bugs across React/async/closures (10)
  // ============================================================================

  {
    id: "bug_useeffect_async",
    conceptKey: "lesson_24::side effect",
    level: 6,
    title: "useEffect שמחזיר Promise",
    brokenCode:
`function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const data = await fetch('/api/user/' + userId).then(r => r.json());
    setUser(data);
  }, [userId]);
  return <div>{user?.name}</div>;
}`,
    bugLine: 3,
    hint: "האם useEffect callback יכולה להיות async function?",
    options: [
      "useEffect callback לא צריכה להחזיר Promise — async function תמיד מחזירה Promise. cleanup לא יעבוד נכון.",
      "fetch לא מחזיר Promise",
      "userId לא ב-deps array",
      "אין שגיאה"
    ],
    correctIndex: 0,
    fix:
`function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let cancelled = false;
    fetch('/api/user/' + userId)
      .then(r => r.json())
      .then(data => { if (!cancelled) setUser(data); });
    return () => { cancelled = true; };
  }, [userId]);
  return <div>{user?.name}</div>;
}`,
    explanation: "useEffect מצפה לreturn או undefined או cleanup function. async תמיד מחזירה Promise — React לא יקרא לזה כ-cleanup. עוטפים async בתוך non-async, או בwrapping function.",
  },

  {
    id: "bug_setstate_object_mutation",
    conceptKey: "lesson_22::immutable",
    level: 6,
    title: "מוטציה של state object",
    brokenCode:
`function UserCard() {
  const [user, setUser] = useState({ name: 'Tal', age: 30 });
  function birthday() {
    user.age += 1;
    setUser(user);
  }
  return <button onClick={birthday}>{user.age}</button>;
}`,
    bugLine: 5,
    hint: "האם React מזהה ש-user השתנה?",
    options: [
      "user.age += 1 משנה את ה-object במקום, ו-setUser(user) מקבל את אותה הפניה — React חושב ששום דבר לא השתנה",
      "useState לא תומך ב-objects",
      "user לא מוגדר",
      "שגיאת syntax"
    ],
    correctIndex: 0,
    fix:
`function UserCard() {
  const [user, setUser] = useState({ name: 'Tal', age: 30 });
  function birthday() {
    setUser({ ...user, age: user.age + 1 });
  }
  return <button onClick={birthday}>{user.age}</button>;
}`,
    explanation: "React משתמש ב-Object.is לזיהוי שינוי state. שינוי במקום שומר על אותה הפניה — Object.is מחזיר true, אין re-render. spread יוצר object חדש = הפניה חדשה = re-render.",
  },

  {
    id: "bug_map_no_key",
    conceptKey: "lesson_21::map",
    level: 4,
    title: "key=index ב-list ניתן לשינוי",
    brokenCode:
`function TodoList() {
  const [todos, setTodos] = useState([]);
  function addToTop() {
    setTodos([{ id: Date.now(), text: 'new' }, ...todos]);
  }
  return (
    <ul>
      {todos.map((todo, i) => <li key={i}>{todo.text}</li>)}
    </ul>
  );
}`,
    bugLine: 8,
    hint: "מה קורה ל-keys כשמוסיפים item לראש הרשימה?",
    options: [
      "key={i} שובר state פנימי כשהסדר משתנה — React חושב שכל ה-items שונו, מאבד inputs",
      "todos.map לא תומך ב-2 פרמטרים",
      "todo.text לא קיים",
      "אין שגיאה"
    ],
    correctIndex: 0,
    fix:
`function TodoList() {
  const [todos, setTodos] = useState([]);
  function addToTop() {
    setTodos([{ id: Date.now(), text: 'new' }, ...todos]);
  }
  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
}`,
    explanation: "key חיוני לזיהוי items בין renders. index משתנה כשהסדר משתנה (insert, delete, sort) — React חושב שכל ה-items שונו. id יציב הוא הפתרון.",
  },

  {
    id: "bug_stale_closure_setinterval",
    conceptKey: "lesson_closures::stale closure",
    level: 6,
    title: "stale closure ב-setInterval",
    brokenCode:
`function Timer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <div>{count}</div>;
}`,
    bugLine: 5,
    hint: "המונה תקוע על 1. למה?",
    options: [
      "ה-effect רץ פעם אחת ([] deps) — count תפוס ב-closure על 0 לתמיד. setCount(0+1) שוב ושוב = 1.",
      "setInterval לא עובד ב-React",
      "useState לא מאתחל ל-0",
      "clearInterval חוסם את setCount"
    ],
    correctIndex: 0,
    fix:
`function Timer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <div>{count}</div>;
}`,
    explanation: "Stale closure קלאסי: callback קלט את count מ-render ראשון. functional update setCount(prev => ...) לא תופס count ב-closure — מקבל את הערך העדכני בכל קריאה.",
  },

  {
    id: "bug_async_loop_var",
    conceptKey: "lesson_closures::closure in setTimeout",
    level: 5,
    title: "for עם var ו-callbacks",
    brokenCode:
`for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('i =', i), 100);
}`,
    bugLine: 1,
    hint: "מה הערך של i כשה-callbacks רצים?",
    options: [
      "var function-scoped — כל ה-callbacks קוראים את אותו i, שהוא 3 בסוף הלולאה. הפלט: 3, 3, 3.",
      "setTimeout לא רץ ב-loops",
      "console.log לא מקבל 2 args",
      "אין שגיאה — מדפיס 0, 1, 2"
    ],
    correctIndex: 0,
    fix:
`for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log('i =', i), 100);
}`,
    explanation: "var משותף לכל ה-callbacks. let block-scoped יוצר binding חדש לכל איטרציה — כל callback סגור על i משלו. תיקון של מילה אחת = 0, 1, 2.",
  },

  {
    id: "bug_promise_unhandled",
    conceptKey: "lesson_15::Promise",
    level: 5,
    title: "Promise בלי catch",
    brokenCode:
`function loadData() {
  fetch('/api/data')
    .then(r => r.json())
    .then(data => updateUI(data));
}
loadData();`,
    bugLine: 4,
    hint: "מה קורה אם ה-fetch נכשל או JSON parse נכשל?",
    options: [
      "אין catch — שגיאות הופכות ל-UnhandledPromiseRejection. ה-app לא יידע על הכשל.",
      "fetch לא מחזיר Promise",
      "updateUI לא תופס שגיאה",
      "אין שגיאה"
    ],
    correctIndex: 0,
    fix:
`function loadData() {
  fetch('/api/data')
    .then(r => {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(data => updateUI(data))
    .catch(err => showError(err));
}
loadData();`,
    explanation: "כל Promise chain חייב catch. גם אם fetch מצליח, r.ok יכול להיות false (4xx/5xx) — צריך לבדוק. unhandled rejections גורמות בעיות בייצור.",
  },

  {
    id: "bug_event_handler_invocation",
    conceptKey: "lesson_21::Component",
    level: 4,
    title: "קריאה מיידית במקום reference",
    brokenCode:
`function App() {
  function handleClick() {
    console.log('clicked');
  }
  return <button onClick={handleClick()}>Click</button>;
}`,
    bugLine: 5,
    hint: "מה קורה ב-render?",
    options: [
      "handleClick() נקרא בזמן render — מדפיס מיד ומחזיר undefined. onClick={undefined} = אין handler.",
      "handleClick לא מוגדר",
      "console.log לא עובד ב-React",
      "אין שגיאה — כפתור עובד"
    ],
    correctIndex: 0,
    fix:
`function App() {
  function handleClick() {
    console.log('clicked');
  }
  return <button onClick={handleClick}>Click</button>;
}`,
    explanation: "JSX onClick מצפה ל-function reference, לא לקריאה. handleClick() מבצע מיד; handleClick (ללא סוגריים) מעביר את ה-function. עם args: () => handleClick(arg).",
  },

  {
    id: "bug_object_compare",
    conceptKey: "lesson_11::By Reference",
    level: 5,
    title: "השוואת objects עם ===",
    brokenCode:
`const a = { x: 1 };
const b = { x: 1 };
if (a === b) {
  console.log('shouldn't print');
} else {
  console.log('different');
}`,
    bugLine: 3,
    hint: "מה === מבצע על objects?",
    options: [
      "=== על objects = השוואת reference, לא תוכן. שני objects עם אותם values עדיין שונים.",
      "=== לא עובד עם objects",
      "x: 1 שונה",
      "אין שגיאה — מדפיס 'shouldn't print'"
    ],
    correctIndex: 0,
    fix:
`const a = { x: 1 };
const b = { x: 1 };
if (JSON.stringify(a) === JSON.stringify(b)) {
  console.log('same content');
}\n// או lodash _.isEqual, או deep-equal manual`,
    explanation: "JS אין operator ל-deep equality. === על objects = pointer comparison. Lodash isEqual, או JSON.stringify (אם אין functions/Dates), או manual recursive.",
  },

  {
    id: "bug_useeffect_no_deps",
    conceptKey: "lesson_24::infinite loop",
    level: 6,
    title: "useEffect בלי deps + setState = infinite loop",
    brokenCode:
`function Counter() {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(n + 1);
  });
  return <div>{n}</div>;
}`,
    bugLine: 5,
    hint: "כמה פעמים ה-effect ירוץ?",
    options: [
      "אין deps array — effect רץ אחרי כל render. setN מטריגר render → effect → setN → infinite.",
      "useEffect לא תומך ב-setState",
      "n לא מוגדר",
      "אין שגיאה — n מתעדכן ל-1"
    ],
    correctIndex: 0,
    fix:
`function Counter() {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(n + 1);
  }, []); // [] = run once
  return <div>{n}</div>;
}`,
    explanation: "אנטי-pattern קלאסי. בלי deps array, ה-effect רץ אחרי כל render. setState בתוך = render אינסופי. תמיד צריך לחשוב על deps.",
  },

  {
    id: "bug_jwt_localstorage",
    conceptKey: "lesson_auth_security::XSS boundary",
    level: 7,
    title: "אחסון JWT ב-localStorage",
    brokenCode:
`async function login(email, password) {
  const res = await fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  const { token } = await res.json();
  localStorage.setItem('jwt', token);
}`,
    bugLine: 7,
    hint: "מה הסיכון של JWT ב-localStorage?",
    options: [
      "localStorage נגיש לכל JS — כל XSS גונב את ה-token. עדיף httpOnly cookie מ-server.",
      "localStorage לא תומך ב-strings",
      "token לא מוחזר",
      "אין סיכון"
    ],
    correctIndex: 0,
    fix:
`// Server-side:
// res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'strict' });

async function login(email, password) {
  await fetch('/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  // No client-side token handling - browser sends cookie automatically
}`,
    explanation: "JWT ב-localStorage = vulnerable ל-XSS. httpOnly cookie לא נגיש ל-JS. בנוסף secure (HTTPS only) ו-sameSite=strict (anti-CSRF).",
  },

  // ============================================================================
  // Phase 2.C batch 2 — more Bug Hunts (10)
  // ============================================================================

  {
    id: "bug_async_forEach",
    conceptKey: "lesson_15::Promise",
    level: 6,
    title: "await בתוך forEach לא ממתין",
    brokenCode:
`async function processAll(items) {
  items.forEach(async item => {
    await processItem(item);
  });
  console.log('done');
}`,
    bugLine: 6,
    hint: "מתי 'done' מודפס?",
    options: [
      "forEach לא ממתין ל-Promises שה-callback מחזיר. 'done' מודפס מיד, לפני שה-items עובדו.",
      "async function לא יכולה להיות בתוך forEach",
      "processItem לא מוגדר",
      "אין שגיאה"
    ],
    correctIndex: 0,
    fix:
`async function processAll(items) {
  for (const item of items) {
    await processItem(item);
  }
  console.log('done');
}
// או מקבילי: await Promise.all(items.map(item => processItem(item)))`,
    explanation: "forEach מתעלם מ-Promises המוחזרות. for-of עם await מבצע סדרתית. Promise.all עם map מבצע מקבילית.",
  },

  {
    id: "bug_useMemo_no_deps",
    conceptKey: "lesson_24::useMemo",
    level: 7,
    title: "useMemo בלי deps array",
    brokenCode:
`function Stats({ data }) {
  const sum = useMemo(() => {
    return data.reduce((s, x) => s + x, 0);
  });
  return <div>{sum}</div>;
}`,
    bugLine: 4,
    hint: "מה useMemo עושה כשאין deps?",
    options: [
      "בלי deps array, useMemo מחשב מחדש בכל render — לא חוסך כלום (אותו דבר כמו לקרוא לפונקציה ישירות).",
      "useMemo לא צריך deps",
      "data.reduce זורק שגיאה",
      "אין שגיאה"
    ],
    correctIndex: 0,
    fix:
`function Stats({ data }) {
  const sum = useMemo(() => {
    return data.reduce((s, x) => s + x, 0);
  }, [data]);
  return <div>{sum}</div>;
}`,
    explanation: "useMemo דורש deps array. בלעדיו = recalc בכל render. עם [data] = recalc רק כש-data משתנה.",
  },

  {
    id: "bug_form_no_preventDefault",
    conceptKey: "lesson_18::form",
    level: 4,
    title: "form ללא preventDefault",
    brokenCode:
`function SearchForm({ onSearch }) {
  const [q, setQ] = useState('');
  function handleSubmit() {
    onSearch(q);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={q} onChange={e => setQ(e.target.value)} />
      <button>Search</button>
    </form>
  );
}`,
    bugLine: 3,
    hint: "מה קורה בdefault על form submit?",
    options: [
      "form submit ברירת מחדל מטעין את הדף מחדש (GET לאותה URL). state אובד וה-callback לא קורה כראוי.",
      "useState לא עובד ב-form",
      "onSearch לא מוגדר",
      "אין שגיאה"
    ],
    correctIndex: 0,
    fix:
`function SearchForm({ onSearch }) {
  const [q, setQ] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    onSearch(q);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={q} onChange={e => setQ(e.target.value)} />
      <button>Search</button>
    </form>
  );
}`,
    explanation: "form submit ברירת מחדל = navigation. ב-SPA חיוני להוסיף e.preventDefault() ב-handler.",
  },

  {
    id: "bug_useState_object_partial",
    conceptKey: "lesson_22::useState",
    level: 5,
    title: "setState עם object רק חלק מהשדות",
    brokenCode:
`function Profile() {
  const [user, setUser] = useState({ name: 'Tal', age: 30, email: 'a@b.com' });
  function birthday() {
    setUser({ age: user.age + 1 });
  }
  return <div>{user.name}, {user.age}, {user.email}</div>;
}`,
    bugLine: 4,
    hint: "useState דומה ל-setState של class? לא...",
    options: [
      "useState לא ממזג — setUser({ age: ... }) מחליף את כל ה-object. name ו-email נעלמים.",
      "user.age + 1 לא מתחשב",
      "setUser לא קיים",
      "אין שגיאה"
    ],
    correctIndex: 0,
    fix:
`function Profile() {
  const [user, setUser] = useState({ name: 'Tal', age: 30, email: 'a@b.com' });
  function birthday() {
    setUser({ ...user, age: user.age + 1 });
  }
  return <div>{user.name}, {user.age}, {user.email}</div>;
}`,
    explanation: "useState != this.setState (class). הוא לא ממזג shallowly — מחליף לחלוטין. spread (...user) שומר על שאר השדות.",
  },

  {
    id: "bug_event_handler_arg",
    conceptKey: "lesson_21::Component",
    level: 5,
    title: "callback עם args בvjsx",
    brokenCode:
`function ItemList({ items, onClick }) {
  return items.map(item => (
    <button key={item.id} onClick={onClick(item.id)}>
      {item.name}
    </button>
  ));
}`,
    bugLine: 3,
    hint: "מה onClick={onClick(item.id)} עושה?",
    options: [
      "onClick(item.id) קורה בזמן render לכל item — מבצע את ה-callback מיד, לא ב-click. result (undefined) הופך ל-handler.",
      "onClick לא תומך ב-args",
      "items.map לא מחזיר JSX",
      "אין שגיאה"
    ],
    correctIndex: 0,
    fix:
`function ItemList({ items, onClick }) {
  return items.map(item => (
    <button key={item.id} onClick={() => onClick(item.id)}>
      {item.name}
    </button>
  ));
}`,
    explanation: "כדי לעטוף callback עם arg ל-event: () => onClick(arg). זה reference לפונקציה חדשה, לא קריאה מיידית.",
  },

  {
    id: "bug_useEffect_cleanup_missing",
    conceptKey: "lesson_24::side effect",
    level: 6,
    title: "subscription ללא cleanup",
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
    bugLine: 7,
    hint: "מה קורה כש-Clock unmounts?",
    options: [
      "אין cleanup — ה-interval ממשיך לרוץ אחרי unmount. setTime זורק warning ('updating state on unmounted component'). memory leak.",
      "setInterval לא עובד",
      "new Date() לא עובד",
      "אין שגיאה"
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
    explanation: "useEffect cleanup חיוני ל-subscriptions/intervals/listeners. הקפד תמיד לחזור עם cleanup function. clearInterval ב-unmount.",
  },

  {
    id: "bug_typescript_any",
    conceptKey: "lesson_26::any",
    level: 5,
    title: "any מכבה type-safety",
    brokenCode:
`function fetchUser(id: string): any {
  // returns user data
}
const user = fetchUser('123');
console.log(user.namee.toUpperCase()); // typo!`,
    bugLine: 5,
    hint: "האם TS תופס את ה-typo?",
    options: [
      "any מכבה את כל בדיקות ה-types. typo כמו .namee (במקום .name) לא נתפס בcompile — הקוד מקרס בruntime.",
      "TS תופס את הtypo",
      "fetchUser לא מוגדר",
      "אין שגיאה"
    ],
    correctIndex: 0,
    fix:
`interface User { id: string; name: string; }
function fetchUser(id: string): User {
  // returns user data with proper type
  return { id, name: '' } as User; // example
}
const user = fetchUser('123');
console.log(user.name.toUpperCase()); // TS catches typos`,
    explanation: "any = פתח אחורי. תמיד עדיף unknown (דורש narrow), או interface ספציפית. גם generic <T> טוב.",
  },

  {
    id: "bug_express_async_error",
    conceptKey: "lesson_17::middleware",
    level: 7,
    title: "async middleware בלי error handling",
    brokenCode:
`app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});`,
    bugLine: 3,
    hint: "מה קורה אם findById זורק?",
    options: [
      "Express 4 לא תופס async errors אוטומטית — Promise rejection unhandled. השרת קורס או תקוע.",
      "findById לא תומך ב-await",
      "req.params לא קיים",
      "אין שגיאה"
    ],
    correctIndex: 0,
    fix:
`app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});
// או express-async-errors module שמטפל אוטומטית`,
    explanation: "Express 4 לא תופס Promise rejections. תמיד try/catch + next(err) ב-async routes. Express 5 (beta) עושה זאת אוטומטית.",
  },

  {
    id: "bug_dependency_array_object",
    conceptKey: "lesson_24::dependency array",
    level: 7,
    title: "object ב-deps array",
    brokenCode:
`function User({ id }) {
  const [user, setUser] = useState(null);
  const config = { id, retries: 3 };
  useEffect(() => {
    fetch('/api/user/' + id, { retries: config.retries })
      .then(r => r.json()).then(setUser);
  }, [config]);
  return <div>{user?.name}</div>;
}`,
    bugLine: 4,
    hint: "מה קורה ל-config בכל render?",
    options: [
      "config = object literal חדש בכל render → reference חדש → useEffect חושב שהוא השתנה → infinite refetch.",
      "config לא יכול להיות בdeps",
      "fetch לא מקבל retries",
      "אין שגיאה"
    ],
    correctIndex: 0,
    fix:
`function User({ id }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('/api/user/' + id, { retries: 3 })
      .then(r => r.json()).then(setUser);
  }, [id]); // primitive dep only
  return <div>{user?.name}</div>;
}`,
    explanation: "useEffect משווה deps עם Object.is (reference). object literal חדש כל render = שונה. השתמש ב-primitives, או useMemo על ה-object.",
  },

  {
    id: "bug_react_state_in_callback",
    conceptKey: "lesson_closures::stale closure",
    level: 7,
    title: "stale state ב-event listener",
    brokenCode:
`function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    function handle() {
      console.log('current:', count);
    }
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
    bugLine: 5,
    hint: "המשתמש לוחץ על הכפתור 5 פעמים, אז keydown. מה count מודפס?",
    options: [
      "0 — handle נסגר על count=0 מ-effect הראשון. effect לא רץ שוב כי deps=[].",
      "5 — current value",
      "undefined",
      "throws error"
    ],
    correctIndex: 0,
    fix:
`function Counter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  useEffect(() => { countRef.current = count; });
  useEffect(() => {
    function handle() {
      console.log('current:', countRef.current);
    }
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`,
    explanation: "Listener מ-effect [] תפס count=0 ב-closure. useRef + sync ב-effect שני פותר. אלטרנטיבה: הוסף count ל-deps (יסיר ויוסיף listener בכל שינוי).",
  },
];

// Export to global scope (no module system in this app)
if (typeof window !== "undefined") {
  window.QUESTIONS_BUG = QUESTIONS_BUG;
}
