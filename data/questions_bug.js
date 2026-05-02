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

];

// Export to global scope (no module system in this app)
if (typeof window !== "undefined") {
  window.QUESTIONS_BUG = QUESTIONS_BUG;
}
