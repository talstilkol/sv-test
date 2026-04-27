// data/questions_trace.js
//
// Code Trace question type — the user "executes" code mentally, step by step,
// predicting the value at each checkpoint. Tests deep understanding.
//
// Schema:
//   {
//     id:         "trace_22_01",
//     conceptKey: "lesson_22::useState",
//     level:      1..6,
//     title:      "מה יוצא בקונסול?",
//     code:       "...multi-line code...",
//     steps: [
//       {
//         line: 3,                           // 1-indexed line to highlight
//         prompt: "מה יודפס בשורה הזאת?",     // what to ask
//         answer: "render: 0",               // expected (case-insensitive trim match)
//         hint:   "useState מתחיל בערך ההתחלתי...",
//         acceptable: ["0", "render:0"]      // (optional) extra accepted answers
//       }
//     ],
//     explanation: "סיכום ההתנהגות במשפט-שניים."
//   }
//
// 35 questions total: 5 per lesson 21–27.
// All answers are normalized: trim + lowercase + collapse whitespace before compare.

var QUESTIONS_TRACE = [

  // ============================================================================
  // Lesson 21 — React Basics, JSX, props, map (5 questions)
  // ============================================================================

  {
    id: "trace_21_01",
    conceptKey: "lesson_21::Component",
    level: 2,
    title: "פלט של קומפוננטה פשוטה",
    code: "function Greeting() {\n  console.log('Greeting body running');\n  return <h1>שלום!</h1>;\n}\n\n// React מציג <Greeting /> פעם אחת",
    steps: [
      {
        line: 2,
        prompt: "מה יודפס בקונסול בעת הרינדור?",
        answer: "Greeting body running",
        hint: "כשReact מציג את הקומפוננטה, הוא מריץ את הפונקציה — וזה כולל כל console.log שבה.",
      },
      {
        line: 3,
        prompt: "איזה אלמנט יוצג בדף בסופו של דבר?",
        answer: "<h1>שלום!</h1>",
        hint: "הערך שמוחזר מהקומפוננטה הוא ה-JSX שיתווסף ל-DOM.",
      },
    ],
    explanation:
      "כשReact מרנדר קומפוננטה, גוף הפונקציה רץ פעם אחת — כל console.log בו יודפס. ה-JSX שמוחזר הופך לאלמנטים אמיתיים בדף.",
  },

  {
    id: "trace_21_02",
    conceptKey: "lesson_21::props",
    level: 3,
    title: "props שעוברים מאב לבן",
    code: "function Hello({ name, greeting }) {\n  return <p>{greeting}, {name}!</p>;\n}\n\nfunction App() {\n  return <Hello name='דני' greeting='שלום' />;\n}",
    steps: [
      {
        line: 2,
        prompt: "אילו ערכים יקבלו name ו-greeting?",
        answer: "name=דני, greeting=שלום",
        acceptable: ["name=דני greeting=שלום", "דני, שלום", "שלום, דני"],
        hint: "בהפעלה <Hello name='דני' greeting='שלום' />, האב מעביר שני props.",
      },
      {
        line: 2,
        prompt: "מה יוצג בדף בסופו של דבר?",
        answer: "שלום, דני!",
        hint: "ה-JSX <p>{greeting}, {name}!</p> מחליף את {greeting} ב-'שלום' ו-{name} ב-'דני'.",
      },
    ],
    explanation:
      "props נשלחים מהאב כאטריבוטים של JSX, מתקבלים בבן באובייקט, ונשלפים עם destructuring. הם read-only.",
  },

  {
    id: "trace_21_03",
    conceptKey: "lesson_21::map",
    level: 3,
    title: "מיפוי מערך לרשימת אלמנטים",
    code: "const fruits = ['תפוח', 'בננה', 'תות'];\n\nfunction List() {\n  return (\n    <ul>\n      {fruits.map((f, i) => <li key={i}>{f}</li>)}\n    </ul>\n  );\n}",
    steps: [
      {
        line: 6,
        prompt: "כמה <li> ייווצרו בסך הכל?",
        answer: "3",
        hint: "fruits.map עוברת על כל איבר במערך — ויוצרת אלמנט אחד לכל איבר.",
      },
      {
        line: 6,
        prompt: "מה יהיה הטקסט של ה-<li> הראשון?",
        answer: "תפוח",
        hint: "האיבר הראשון במערך fruits הוא 'תפוח'.",
      },
      {
        line: 6,
        prompt: "איזה key יקבל ה-<li> השלישי?",
        answer: "2",
        hint: "i הוא האינדקס של map — מתחיל מ-0, אז השלישי הוא 2.",
      },
    ],
    explanation:
      "map יוצרת מערך חדש של JSX אלמנטים — אחד לכל איבר. ה-key חיוני ל-React לזיהוי בין רינדורים. אינדקסים מתחילים מ-0.",
  },

  {
    id: "trace_21_04",
    conceptKey: "lesson_21::JSX",
    level: 3,
    title: "JSX עם ביטוי מותנה",
    code: "function Status({ online }) {\n  return (\n    <div>\n      {online ? '🟢 מחובר' : '🔴 לא מחובר'}\n    </div>\n  );\n}\n\n// <Status online={true} />",
    steps: [
      {
        line: 4,
        prompt: "איזה טקסט יוצג כשonline=true?",
        answer: "🟢 מחובר",
        hint: "ternary: condition ? a : b. כש-online=true, הביטוי מחזיר את a.",
      },
      {
        line: 4,
        prompt: "ואם הקריאה הייתה <Status online={false} />?",
        answer: "🔴 לא מחובר",
        hint: "כש-online=false, ה-ternary מחזיר את b.",
      },
    ],
    explanation:
      "ב-JSX, {} מאפשר embedding של expressions. ternary (cond ? a : b) הוא expression — לכן מותר ב-JSX. אסור statements כמו if/for.",
  },

  {
    id: "trace_21_05",
    conceptKey: "lesson_21::rendering",
    level: 4,
    title: "סדר רינדור של אב ובנים",
    code: "function Child() {\n  console.log('Child render');\n  return <p>בן</p>;\n}\n\nfunction Parent() {\n  console.log('Parent render');\n  return (\n    <div>\n      <Child />\n      <Child />\n    </div>\n  );\n}\n\n// React מציג <Parent />",
    steps: [
      {
        line: 7,
        prompt: "מה יודפס *ראשון* בקונסול?",
        answer: "Parent render",
        hint: "React מתחיל מהאב — מריץ את הגוף שלו לפני שהוא רואה את הבנים.",
      },
      {
        line: 2,
        prompt: "כמה פעמים תרוץ הפונקציה Child?",
        answer: "2",
        hint: "יש שני <Child /> ב-JSX של Parent. כל אחד = רינדור נפרד.",
      },
      {
        line: 2,
        prompt: "מה יודפס *אחרון* בקונסול?",
        answer: "Child render",
        hint: "Parent רץ ראשון, ואז Child רץ פעמיים. הכל בהתחלה — אחר כך React בונה את ה-DOM.",
      },
    ],
    explanation:
      "סדר רינדור: אב לפני בנים, top-down. כל מופע של קומפוננטה מריץ את הפונקציה. אם יש שני <Child /> — הפונקציה Child תרוץ פעמיים.",
  },

  // ============================================================================
  // Lesson 22 — useState, Immutable State (5 questions)
  // ============================================================================

  {
    id: "trace_22_01",
    conceptKey: "lesson_22::useState",
    level: 3,
    title: "ערך התחלתי של state",
    code: "function Counter() {\n  const [count, setCount] = useState(7);\n  console.log('count =', count);\n  return <div>{count}</div>;\n}\n\n// רינדור ראשון",
    steps: [
      {
        line: 3,
        prompt: "מה יודפס בקונסול ברינדור הראשון?",
        answer: "count = 7",
        acceptable: ["count =7", "count=7"],
        hint: "useState(7) — הארגומנט הוא הערך ההתחלתי. ברינדור הראשון, count יקבל אותו.",
      },
      {
        line: 4,
        prompt: "מה יוצג ב-DIV?",
        answer: "7",
        hint: "{count} מציג את הערך הנוכחי של ה-state.",
      },
    ],
    explanation:
      "useState(7) מציב 7 כערך התחלתי. ברינדור הראשון count = 7. הארגומנט של useState משמש *רק* ברינדור הראשון; אחרי זה React מתעלם ממנו.",
  },

  {
    id: "trace_22_02",
    conceptKey: "lesson_22::setState",
    level: 5,
    title: "שני setState עוקבים — stale state",
    code: "function App() {\n  const [count, setCount] = useState(0);\n\n  function handleClick() {\n    setCount(count + 1);\n    setCount(count + 1);\n    setCount(count + 1);\n  }\n\n  return <button onClick={handleClick}>{count}</button>;\n}\n\n// המשתמש לוחץ פעם אחת",
    steps: [
      {
        line: 7,
        prompt: "מה ערך count *בתוך* handleClick אחרי שלושת ה-setCount?",
        answer: "0",
        hint: "count הוא משתנה לוקאלי שנקלט ברינדור הזה. setCount לא משנה אותו — הוא מתזמן רינדור חדש.",
      },
      {
        line: 10,
        prompt: "מה יהיה count ברינדור הבא?",
        answer: "1",
        hint: "כל שלושת ה-setCount(count + 1) משתמשים באותו count=0. כולם מתזמנים את אותו ערך — 1.",
      },
    ],
    explanation:
      "בעיית stale state: count נקלט בערך הרינדור הנוכחי (0). שלושת ה-setCount מתזמנים את 0+1=1. הפתרון: setCount(prev => prev + 1) שמשתמש בערך העדכני.",
  },

  {
    id: "trace_22_03",
    conceptKey: "lesson_22::setState",
    level: 5,
    title: "Functional update — שלושה setState",
    code: "function App() {\n  const [count, setCount] = useState(0);\n\n  function handleClick() {\n    setCount(prev => prev + 1);\n    setCount(prev => prev + 1);\n    setCount(prev => prev + 1);\n  }\n\n  return <button onClick={handleClick}>{count}</button>;\n}\n\n// המשתמש לוחץ פעם אחת",
    steps: [
      {
        line: 10,
        prompt: "מה יהיה count ברינדור הבא?",
        answer: "3",
        hint: "כל setCount(prev => prev + 1) מקבל את הערך העדכני: 0→1, 1→2, 2→3.",
      },
    ],
    explanation:
      "כשמעבירים פונקציה ל-setCount, React מעביר לה את הערך העדכני ביותר (כולל אחרי setState קודם). שלושת הקריאות מצטברות: 0→1→2→3.",
  },

  {
    id: "trace_22_04",
    conceptKey: "lesson_22::immutable",
    level: 4,
    title: "עדכון מערך — push לא עובד!",
    code: "function App() {\n  const [items, setItems] = useState([1, 2, 3]);\n\n  function addItem() {\n    items.push(4);\n    setItems(items);\n    console.log('count:', items.length);\n  }\n\n  return <button onClick={addItem}>add</button>;\n}\n\n// המשתמש לוחץ פעם אחת",
    steps: [
      {
        line: 6,
        prompt: "מה יודפס בקונסול?",
        answer: "count: 4",
        acceptable: ["4"],
        hint: "items.push(4) שינה את המערך ישירות, אז length=4 כבר עכשיו.",
      },
      {
        line: 5,
        prompt: "האם React יבצע re-render?",
        answer: "לא",
        acceptable: ["no", "false"],
        hint: "setItems(items) — אותה הפניה למערך! React משווה עם Object.is, רואה אותו אובייקט, ולא מבצע re-render.",
      },
    ],
    explanation:
      "push משנה את המערך הקיים — אבל React משווה עם Object.is ורואה את אותה הפניה. אין re-render. הפתרון: setItems([...items, 4]) — מערך חדש.",
  },

  {
    id: "trace_22_05",
    conceptKey: "lesson_22::re-render",
    level: 4,
    title: "כמה רינדורים מתבצעים?",
    code: "function Counter() {\n  const [count, setCount] = useState(0);\n  console.log('render', count);\n\n  return (\n    <button onClick={() => {\n      setCount(c => c + 1);\n      setCount(c => c + 1);\n    }}>\n      {count}\n    </button>\n  );\n}\n\n// המשתמש לוחץ פעם אחת",
    steps: [
      {
        line: 3,
        prompt: "כמה פעמים יודפס 'render' בסך הכל (כולל הראשון)?",
        answer: "2",
        hint: "רינדור 1: לפני הלחיצה (count=0). רינדור 2: אחרי הלחיצה — React עושה batching ומעדכן פעם אחת.",
      },
      {
        line: 3,
        prompt: "מה יודפס ברינדור השני?",
        answer: "render 2",
        hint: "React batches את שני ה-setCount. שניהם functional, אז 0→1→2.",
      },
    ],
    explanation:
      "React batches setState calls בתוך handler — שני setState = רינדור אחד. functional updates מצטברות (0→1→2), אז count=2.",
  },

  // ============================================================================
  // Lesson 23 — Router, Context API (5 questions)
  // ============================================================================

  {
    id: "trace_23_01",
    conceptKey: "lesson_23::useContext",
    level: 4,
    title: "ערך מ-Context",
    code: "const ThemeContext = createContext('light');\n\nfunction Toolbar() {\n  const theme = useContext(ThemeContext);\n  console.log('theme:', theme);\n  return <div>{theme}</div>;\n}\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value='dark'>\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}",
    steps: [
      {
        line: 5,
        prompt: "מה יודפס בקונסול?",
        answer: "theme: dark",
        acceptable: ["dark", "theme:dark"],
        hint: "Provider עוטף את Toolbar עם value='dark'. useContext לוקח את הערך מה-Provider הקרוב.",
      },
      {
        line: 6,
        prompt: "מה יוצג ב-DIV?",
        answer: "dark",
        hint: "אותו theme שקיבל מ-useContext.",
      },
    ],
    explanation:
      "useContext מחזיר את ה-value של ה-Provider הקרוב ביותר בעץ. ערך ברירת המחדל ב-createContext (כאן 'light') משמש *רק* כשאין Provider.",
  },

  {
    id: "trace_23_02",
    conceptKey: "lesson_23::useParams",
    level: 4,
    title: "שליפת פרמטרים מ-URL",
    code: "<Routes>\n  <Route path='/users/:id' element={<UserPage />} />\n</Routes>\n\nfunction UserPage() {\n  const { id } = useParams();\n  return <h1>משתמש {id}</h1>;\n}\n\n// המשתמש מבקר ב-/users/42",
    steps: [
      {
        line: 6,
        prompt: "מה ערך id?",
        answer: "42",
        hint: ":id הוא פרמטר דינמי ב-Route. useParams מחזיר אובייקט עם השדות שהוגדרו ב-path.",
      },
      {
        line: 7,
        prompt: "מה יוצג בכותרת?",
        answer: "משתמש 42",
        hint: "JSX מחבר טקסט קבוע + ערך של id.",
      },
    ],
    explanation:
      "useParams() מחזיר את כל הפרמטרים הדינמיים מה-URL, כמחרוזות. אם הוגדר ':id' ב-Route, useParams יחזיר { id: '42' } כאשר URL = /users/42.",
  },

  {
    id: "trace_23_03",
    conceptKey: "lesson_23::Provider",
    level: 5,
    title: "אין Provider — מה קורה?",
    code: "const UserContext = createContext({ name: 'אורח' });\n\nfunction Profile() {\n  const user = useContext(UserContext);\n  return <p>שלום, {user.name}</p>;\n}\n\nfunction App() {\n  return <Profile />;  // אין Provider!\n}",
    steps: [
      {
        line: 5,
        prompt: "מה ערך user.name?",
        answer: "אורח",
        hint: "כשאין Provider — useContext מחזיר את ערך ברירת המחדל שהוגדר ב-createContext.",
      },
      {
        line: 5,
        prompt: "מה יוצג בדף?",
        answer: "שלום, אורח",
        hint: "השם מתוך אובייקט ברירת המחדל.",
      },
    ],
    explanation:
      "createContext(defaultValue) — defaultValue משמש כש-useContext נקרא בלי Provider מעליו בעץ. זה fallback בטוח.",
  },

  {
    id: "trace_23_04",
    conceptKey: "lesson_23::useNavigate",
    level: 5,
    title: "ניווט תוכניתי אחרי submit",
    code: "function LoginForm() {\n  const navigate = useNavigate();\n\n  async function handleSubmit() {\n    const ok = await api.login();\n    if (ok) {\n      navigate('/dashboard');\n    } else {\n      navigate('/error');\n    }\n  }\n\n  return <button onClick={handleSubmit}>התחבר</button>;\n}\n\n// המשתמש לוחץ, api.login מחזיר true",
    steps: [
      {
        line: 7,
        prompt: "לאיזה URL הדפדפן יעבור?",
        answer: "/dashboard",
        hint: "ok=true, אז ה-if נכנס. navigate('/dashboard') מחליף את ה-URL.",
      },
      {
        line: 7,
        prompt: "אם api.login היה מחזיר false — לאן navigate היה מוביל?",
        answer: "/error",
        hint: "אז ה-else היה רץ.",
      },
    ],
    explanation:
      "useNavigate() מחזיר פונקציה לניווט תוכניתי. נפוץ אחרי submit, login, או שגיאה. זה לא מרענן את הדף — רק מחליף את ה-URL ו-Router מציג את הקומפוננטה החדשה.",
  },

  {
    id: "trace_23_05",
    conceptKey: "lesson_23::Prop Drilling",
    level: 4,
    title: "props דרך 3 רמות",
    code: "function App() {\n  const user = { name: 'דני' };\n  return <Layout user={user} />;\n}\n\nfunction Layout({ user }) {\n  return <Page user={user} />;\n}\n\nfunction Page({ user }) {\n  return <h1>שלום {user.name}</h1>;\n}",
    steps: [
      {
        line: 11,
        prompt: "מה יוצג ב-h1?",
        answer: "שלום דני",
        hint: "user מועבר מ-App → Layout → Page. בסוף, Page משתמש ב-user.name.",
      },
      {
        line: 6,
        prompt: "האם Layout משתמש בנתון user?",
        answer: "לא",
        acceptable: ["no", "false"],
        hint: "Layout רק מעביר אותו הלאה — זה prop drilling.",
      },
    ],
    explanation:
      "prop drilling: prop מועבר דרך רמות שלא משתמשות בו. הפתרון הנפוץ: Context API — מספק את הערך לעומק העץ בלי 'דליפה' דרך כל הקומפוננטות.",
  },

  // ============================================================================
  // Lesson 24 — useEffect, useMemo, useRef (5 questions)
  // ============================================================================

  {
    id: "trace_24_01",
    conceptKey: "lesson_24::useEffect",
    level: 4,
    title: "מתי effect רץ?",
    code: "function App() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    console.log('effect:', count);\n  }, [count]);\n\n  console.log('render:', count);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}\n\n// רינדור ראשון",
    steps: [
      {
        line: 8,
        prompt: "מה יודפס *ראשון*?",
        answer: "render: 0",
        acceptable: ["render:0"],
        hint: "ה-render log רץ בתוך הפונקציה — לפני שה-effect מתחיל.",
      },
      {
        line: 5,
        prompt: "מה יודפס מיד אחרי?",
        answer: "effect: 0",
        acceptable: ["effect:0"],
        hint: "אחרי שהקומפוננטה מרונדרת, useEffect רץ.",
      },
    ],
    explanation:
      "סדר: גוף הקומפוננטה רץ → DOM מתעדכן → useEffect רץ. ה-effect *תמיד* רץ אחרי הרינדור, אף פעם לא במהלכו.",
  },

  {
    id: "trace_24_02",
    conceptKey: "lesson_24::dependency array",
    level: 5,
    title: "מערך תלויות ריק",
    code: "function App() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    console.log('effect ran');\n  }, []);  // תלויות ריקות\n\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}\n\n// המשתמש לוחץ 3 פעמים",
    steps: [
      {
        line: 5,
        prompt: "כמה פעמים יודפס 'effect ran' בסך הכל?",
        answer: "1",
        hint: "מערך ריק [] = effect רץ פעם אחת בלבד, אחרי mount הראשון.",
      },
    ],
    explanation:
      "[] = פעם אחת בלבד. אם רוצים שירוץ בכל שינוי — אין מערך. אם רוצים בכל שינוי של ערך מסוים — שמים אותו במערך.",
  },

  {
    id: "trace_24_03",
    conceptKey: "lesson_24::cleanup",
    level: 6,
    title: "Cleanup function — סדר הפעלה",
    code: "function Timer({ name }) {\n  useEffect(() => {\n    console.log('start', name);\n    return () => console.log('cleanup', name);\n  }, [name]);\n  return <div>{name}</div>;\n}\n\n// רינדור 1: <Timer name='A' />\n// רינדור 2: <Timer name='B' />",
    steps: [
      {
        line: 3,
        prompt: "מה יודפס ראשון?",
        answer: "start A",
        acceptable: ["start a"],
        hint: "ברינדור הראשון, name='A'. ה-effect רץ אחרי הרינדור.",
      },
      {
        line: 4,
        prompt: "ברינדור 2 (name='B'), מה יודפס *לפני* ה-start החדש?",
        answer: "cleanup A",
        acceptable: ["cleanup a"],
        hint: "name השתנה → React מריץ את ה-cleanup של ה-effect הקודם, ואז את החדש.",
      },
      {
        line: 3,
        prompt: "ולבסוף, מה יודפס?",
        answer: "start B",
        acceptable: ["start b"],
        hint: "אחרי ה-cleanup הישן, ה-effect החדש רץ עם הערכים החדשים.",
      },
    ],
    explanation:
      "כשתלות משתנה: 1) cleanup של הקודם, 2) effect חדש. הסדר חשוב — ה-cleanup רץ עם הערכים *הישנים*, ה-effect החדש עם החדשים.",
  },

  {
    id: "trace_24_04",
    conceptKey: "lesson_24::useMemo",
    level: 5,
    title: "useMemo מתי מחשב?",
    code: "function App({ list, filter }) {\n  const filtered = useMemo(() => {\n    console.log('computing');\n    return list.filter(x => x.includes(filter));\n  }, [list, filter]);\n\n  return <div>{filtered.length}</div>;\n}\n\n// רינדור 1: list=[a,b], filter='a'\n// רינדור 2: list=[a,b], filter='a' (אותם ערכים!)\n// רינדור 3: list=[a,b], filter='b' (filter השתנה)",
    steps: [
      {
        line: 3,
        prompt: "כמה פעמים יודפס 'computing' בסך כל שלושת הרינדורים?",
        answer: "2",
        hint: "רינדור 1: חישוב ראשוני. רינדור 2: אותם תלויות → useMemo מחזיר cache. רינדור 3: filter השתנה → חישוב מחדש.",
      },
    ],
    explanation:
      "useMemo משווה את התלויות עם Object.is. אותם ערכים = החזרת ה-cache (אין הרצה). תלות שונה = חישוב מחדש.",
  },

  {
    id: "trace_24_05",
    conceptKey: "lesson_24::useRef",
    level: 5,
    title: "ref לא גורם ל-re-render",
    code: "function Counter() {\n  const ref = useRef(0);\n  const [_, setTick] = useState(0);\n\n  function handleClick() {\n    ref.current += 1;\n    console.log('ref:', ref.current);\n  }\n\n  console.log('render');\n  return <button onClick={handleClick}>{ref.current}</button>;\n}\n\n// רינדור ראשון, אז המשתמש לוחץ פעמיים",
    steps: [
      {
        line: 10,
        prompt: "כמה פעמים יודפס 'render' בסך הכל?",
        answer: "1",
        hint: "ref.current השתנה אבל ref לא טריגר ל-re-render. רק setTick היה גורם.",
      },
      {
        line: 7,
        prompt: "מה יודפס בקונסול אחרי הלחיצה השנייה?",
        answer: "ref: 2",
        acceptable: ["2", "ref:2"],
        hint: "ref.current הוא מספר רגיל. כל לחיצה מקדמת אותו ב-1.",
      },
      {
        line: 11,
        prompt: "מה יוצג בכפתור (אחרי שתי הלחיצות)?",
        answer: "0",
        hint: "ה-DOM הציג את ref.current ברינדור הראשון = 0. אין רינדור חדש, אז ה-DOM לא מתעדכן.",
      },
    ],
    explanation:
      "useRef.current אינו state. שינוי שלו לא מטריג re-render, וה-UI לא משתקף. השתמש ב-ref לערכים שלא צריכים להופיע ב-UI (timer ids, DOM refs, previous values).",
  },

  // ============================================================================
  // Lesson 25 — Tailwind CSS (5 questions)
  // ============================================================================

  {
    id: "trace_25_01",
    conceptKey: "lesson_25::utility classes",
    level: 3,
    title: "פיענוח classes של Tailwind",
    code: "<button className='bg-blue-500 text-white px-4 py-2 rounded'>\n  לחץ\n</button>",
    steps: [
      {
        line: 1,
        prompt: "מה צבע הרקע?",
        answer: "כחול",
        acceptable: ["blue"],
        hint: "bg-{color}-{shade}. blue-500 = כחול בעוצמה בינונית.",
      },
      {
        line: 1,
        prompt: "מה צבע הטקסט?",
        answer: "לבן",
        acceptable: ["white"],
        hint: "text-white = טקסט לבן.",
      },
      {
        line: 1,
        prompt: "מה ה-padding האופקי? (יחידות Tailwind)",
        answer: "4",
        hint: "px-4 = padding-left + padding-right של 4 (= 1rem).",
      },
    ],
    explanation:
      "Tailwind utility classes: bg-{color}-{shade} לרקע, text-{color} לטקסט, p-{n} ל-padding. כל מספר = 0.25rem. p-4 = 1rem בכל הצדדים, px-4 = רק אופקי.",
  },

  {
    id: "trace_25_02",
    conceptKey: "lesson_25::flex",
    level: 4,
    title: "פריסת flex עם justify-between",
    code: "<div className='flex justify-between items-center'>\n  <span>שמאל</span>\n  <span>אמצע</span>\n  <span>ימין</span>\n</div>",
    steps: [
      {
        line: 1,
        prompt: "באיזה כיוון יסודרו הילדים? (אופקי/אנכי)",
        answer: "אופקי",
        acceptable: ["horizontal", "row"],
        hint: "flex (=flex-row) מסדר את הילדים בשורה אופקית.",
      },
      {
        line: 1,
        prompt: "איך יתחלקו המרחקים בין הילדים?",
        answer: "אחד בכל קצה, השאר במרכז עם רווח שווה",
        acceptable: ["מרווחים שווים", "spread", "evenly distributed"],
        hint: "justify-between: ילד ראשון בקצה אחד, אחרון בקצה השני, השאר באמצע עם רווחים שווים.",
      },
    ],
    explanation:
      "flex + justify-between = ה-3 ילדים מתפזרים: אחד בקצה ימין (RTL: שמאל), אחד באמצע, אחד בצד השני. items-center = יישור אנכי במרכז.",
  },

  {
    id: "trace_25_03",
    conceptKey: "lesson_25::grid",
    level: 4,
    title: "Grid עם 3 עמודות",
    code: "<div className='grid grid-cols-3 gap-4'>\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n  <div>4</div>\n  <div>5</div>\n</div>",
    steps: [
      {
        line: 1,
        prompt: "כמה עמודות בכל שורה?",
        answer: "3",
        hint: "grid-cols-3 = 3 עמודות שווות.",
      },
      {
        line: 1,
        prompt: "כמה שורות יווצרו?",
        answer: "2",
        hint: "5 ילדים / 3 עמודות = שורה ראשונה מלאה (3), שורה שנייה (2 בלבד).",
      },
    ],
    explanation:
      "grid-cols-N קובע N עמודות. ילדים מסתדרים אוטומטית. 5 ילדים ב-3 עמודות = שורה ראשונה (1,2,3) + שורה שנייה (4,5 + תא ריק).",
  },

  {
    id: "trace_25_04",
    conceptKey: "lesson_25::responsive design",
    level: 5,
    title: "Responsive עם prefixes",
    code: "<div className='text-sm md:text-lg lg:text-2xl'>\n  טקסט responsive\n</div>",
    steps: [
      {
        line: 1,
        prompt: "באיזה גודל יוצג הטקסט במסך נייד (320px)?",
        answer: "text-sm",
        acceptable: ["sm", "small"],
        hint: "ללא prefix = ברירת מחדל לכל הגדלים.",
      },
      {
        line: 1,
        prompt: "באיזה גודל יוצג בטאבלט (768px)?",
        answer: "text-lg",
        acceptable: ["lg", "large"],
        hint: "md: = 768px ומעלה.",
      },
      {
        line: 1,
        prompt: "ובמחשב גדול (1280px)?",
        answer: "text-2xl",
        acceptable: ["2xl"],
        hint: "lg: = 1024px ומעלה. ב-1280px → גם lg וגם המאוחר ביותר. lg:text-2xl ינצח.",
      },
    ],
    explanation:
      "Tailwind mobile-first: ברירת מחדל = הקטן ביותר, prefixes (sm:, md:, lg:, xl:) = breakpoints מינימליים. בכל breakpoint, ה-class המאוחר יותר מנצח.",
  },

  {
    id: "trace_25_05",
    conceptKey: "lesson_25::rounded",
    level: 3,
    title: "תמונה עגולה",
    code: "<img\n  src='avatar.jpg'\n  className='w-12 h-12 rounded-full'\n/>",
    steps: [
      {
        line: 3,
        prompt: "מה הגודל של התמונה? (יחידות Tailwind)",
        answer: "12x12",
        acceptable: ["12", "12x12px", "3rem"],
        hint: "w-12 h-12 = רוחב וגובה זהים = 3rem (=48px).",
      },
      {
        line: 3,
        prompt: "איזו צורה תיראה התמונה?",
        answer: "עיגול",
        acceptable: ["circle", "round"],
        hint: "rounded-full + רוחב=גובה = עיגול מושלם.",
      },
    ],
    explanation:
      "rounded-full = border-radius: 9999px. עם w=h זה הופך לעיגול. שימוש קלאסי לאווטרים, אייקונים עגולים.",
  },

  // ============================================================================
  // Lesson 26 — TypeScript Basics (5 questions)
  // ============================================================================

  {
    id: "trace_26_01",
    conceptKey: "lesson_26::TypeScript",
    level: 3,
    title: "type-safety בפעולה",
    code: "function add(a: number, b: number): number {\n  return a + b;\n}\n\nadd(3, 4);     // (1)\nadd('3', 4);   // (2)\nadd(3);        // (3)",
    steps: [
      {
        line: 5,
        prompt: "(1) האם הקריאה תקפה?",
        answer: "כן",
        acceptable: ["yes", "ok"],
        hint: "שני ארגומנטים number — תואם את החתימה.",
      },
      {
        line: 6,
        prompt: "(2) מה הקומפיילר יגיד?",
        answer: "שגיאה",
        acceptable: ["error", "type error"],
        hint: "'3' הוא string, החתימה דורשת number.",
      },
      {
        line: 7,
        prompt: "(3) מה הקומפיילר יגיד?",
        answer: "שגיאה",
        acceptable: ["error"],
        hint: "ארגומנט אחד בלבד; החתימה דורשת שניים.",
      },
    ],
    explanation:
      "TypeScript בודק טיפוסים בזמן compile: סוג, מספר, וסדר הארגומנטים. שגיאות נתפסות לפני הרצה.",
  },

  {
    id: "trace_26_02",
    conceptKey: "lesson_26::optional field",
    level: 4,
    title: "שדה אופציונלי",
    code: "interface User {\n  name: string;\n  age?: number;\n}\n\nconst u1: User = { name: 'דני' };          // (1)\nconst u2: User = { name: 'X', age: 30 };  // (2)\nconst u3: User = { age: 30 };             // (3)\nconst u4: User = { name: 'Y', extra: 1 }; // (4)",
    steps: [
      {
        line: 5,
        prompt: "(1) האם תקין?",
        answer: "כן",
        acceptable: ["yes", "ok"],
        hint: "name חובה, age אופציונלי. רק name מוצב — תקין.",
      },
      {
        line: 7,
        prompt: "(3) האם תקין?",
        answer: "לא",
        acceptable: ["no", "error"],
        hint: "name חובה — חסר. שגיאת TypeScript.",
      },
      {
        line: 8,
        prompt: "(4) האם תקין?",
        answer: "לא",
        acceptable: ["no", "error"],
        hint: "extra לא קיים ב-interface User. excess property check נכשל.",
      },
    ],
    explanation:
      "? אחרי שם השדה = אופציונלי. שדות שלא הוגדרו ב-interface אסורים (excess property check).",
  },

  {
    id: "trace_26_03",
    conceptKey: "lesson_26::union",
    level: 5,
    title: "Union type",
    code: "type ID = number | string;\n\nlet x: ID = 5;           // (1)\nx = 'abc';               // (2)\nx = true;                // (3)\nx = [1, 2];              // (4)",
    steps: [
      {
        line: 3,
        prompt: "(1) האם תקין?",
        answer: "כן",
        acceptable: ["yes"],
        hint: "5 הוא number, חלק מה-union.",
      },
      {
        line: 4,
        prompt: "(2) האם תקין?",
        answer: "כן",
        acceptable: ["yes"],
        hint: "'abc' הוא string, גם חלק מה-union.",
      },
      {
        line: 5,
        prompt: "(3) האם תקין?",
        answer: "לא",
        acceptable: ["no", "error"],
        hint: "true הוא boolean, לא ב-union.",
      },
    ],
    explanation:
      "Union (A | B) מתיר רק טיפוסים שצוינו. הקומפיילר יבדוק כל הצבה ויסרב לטיפוסים אחרים.",
  },

  {
    id: "trace_26_04",
    conceptKey: "lesson_26::array type",
    level: 4,
    title: "מערך מטופס",
    code: "const ages: number[] = [25, 30, 35];\nages.push(40);     // (1)\nages.push('41');   // (2)\nconst names: string[] = ages;  // (3)",
    steps: [
      {
        line: 2,
        prompt: "(1) תקין?",
        answer: "כן",
        acceptable: ["yes"],
        hint: "40 הוא number, תואם את הטיפוס של המערך.",
      },
      {
        line: 3,
        prompt: "(2) תקין?",
        answer: "לא",
        acceptable: ["no", "error"],
        hint: "'41' הוא string. number[] מקבל רק number.",
      },
      {
        line: 4,
        prompt: "(3) תקין?",
        answer: "לא",
        acceptable: ["no", "error"],
        hint: "המערך הוא number[], לא string[]. הצבה תיכשל.",
      },
    ],
    explanation:
      "T[] מציין מערך שכל איבריו מטיפוס T. push, הצבה, וכל פעולה — TypeScript בודק.",
  },

  {
    id: "trace_26_05",
    conceptKey: "lesson_26::Typing State",
    level: 5,
    title: "useState עם generic",
    code: "const [user, setUser] = useState<User | null>(null);\nsetUser({ name: 'דני' });  // (1)\nsetUser('דני');             // (2)\nsetUser(null);              // (3)",
    steps: [
      {
        line: 2,
        prompt: "(1) תקין?",
        answer: "כן",
        acceptable: ["yes"],
        hint: "{ name: 'דני' } תואם ל-User (interface). חלק מה-union.",
      },
      {
        line: 3,
        prompt: "(2) תקין?",
        answer: "לא",
        acceptable: ["no", "error"],
        hint: "string לא חלק מה-union (User | null).",
      },
      {
        line: 4,
        prompt: "(3) תקין?",
        answer: "כן",
        acceptable: ["yes"],
        hint: "null מותר — הוא חלק מה-union.",
      },
    ],
    explanation:
      "useState<T> מציין explicitly את הטיפוס. useful כשהערך ההתחלתי לא מספיק (null, [], {}). הסטר יבדוק כל הצבה.",
  },

  // ============================================================================
  // Lesson 27 — TypeScript Advanced (5 questions)
  // ============================================================================

  {
    id: "trace_27_01",
    conceptKey: "lesson_27::Type Narrowing",
    level: 6,
    title: "narrowing עם typeof",
    code: "function format(x: string | number): string {\n  if (typeof x === 'string') {\n    return x.toUpperCase();   // (1)\n  }\n  return x.toFixed(2);        // (2)\n}",
    steps: [
      {
        line: 3,
        prompt: "(1) האם x.toUpperCase() תקף בתוך ה-if?",
        answer: "כן",
        acceptable: ["yes"],
        hint: "TS צמצם את הטיפוס ל-string בענף הזה. toUpperCase() של string תקף.",
      },
      {
        line: 5,
        prompt: "(2) למה x.toFixed(2) תקף בענף הזה?",
        answer: "כי TS צמצם ל-number",
        acceptable: ["narrowed to number", "x is number here"],
        hint: "אחרי ה-if עם typeof x === 'string', בענף השני TS יודע ש-x חייב להיות number.",
      },
    ],
    explanation:
      "type narrowing: אחרי בדיקה (typeof, instanceof, in), TS מצמצם את הטיפוס בכל ענף. שימושי עם union types.",
  },

  {
    id: "trace_27_02",
    conceptKey: "lesson_27::extends interface",
    level: 5,
    title: "ירושה של interface",
    code: "interface Animal {\n  name: string;\n}\ninterface Dog extends Animal {\n  breed: string;\n}\n\nconst d: Dog = { name: 'רקסי', breed: 'לברדור' };  // (1)\nconst d2: Dog = { name: 'X' };                      // (2)\nconst a: Animal = d;                                  // (3)",
    steps: [
      {
        line: 7,
        prompt: "(1) תקין?",
        answer: "כן",
        acceptable: ["yes"],
        hint: "Dog יורש name מ-Animal + מוסיף breed. שניהם קיימים.",
      },
      {
        line: 8,
        prompt: "(2) תקין?",
        answer: "לא",
        acceptable: ["no", "error"],
        hint: "Dog דורש גם breed (לא רק name).",
      },
      {
        line: 9,
        prompt: "(3) תקין?",
        answer: "כן",
        acceptable: ["yes"],
        hint: "Dog הוא Animal (יש לו name). הצבת Dog → Animal תקינה.",
      },
    ],
    explanation:
      "extends מרחיב interface. Subtype (Dog) חייב לכלול את כל השדות של ה-Supertype + יכול להוסיף. Subtype → Supertype תמיד תקין (Liskov).",
  },

  {
    id: "trace_27_03",
    conceptKey: "lesson_27::Union Type",
    level: 6,
    title: "Discriminated Union",
    code: "type Shape =\n  | { kind: 'circle'; radius: number }\n  | { kind: 'square'; side: number };\n\nfunction area(s: Shape): number {\n  if (s.kind === 'circle') {\n    return Math.PI * s.radius ** 2;   // (1)\n  }\n  return s.side ** 2;                   // (2)\n}",
    steps: [
      {
        line: 7,
        prompt: "(1) למה אפשר לגשת ל-s.radius כאן?",
        answer: "כי TS צמצם ל-circle",
        acceptable: ["narrowed", "s is circle"],
        hint: "kind === 'circle' → TS יודע שהאובייקט הוא הוריאנט הראשון, שיש לו radius.",
      },
      {
        line: 9,
        prompt: "(2) האם אפשר לגשת ל-s.radius בשורה הזאת?",
        answer: "לא",
        acceptable: ["no"],
        hint: "כאן TS יודע שזה square — אין שדה radius.",
      },
    ],
    explanation:
      "Discriminated union — שדה משותף (kind) שמבחין בין הוריאנטים. אחרי בדיקת kind, TS יודע בדיוק עם איזה אובייקט עובדים. דפוס נפוץ ב-Redux/Reducer.",
  },

  {
    id: "trace_27_04",
    conceptKey: "lesson_27::Transaction",
    level: 5,
    title: "סינון תנועות לפי type",
    code: "type Transaction =\n  | { type: 'income'; amount: number }\n  | { type: 'expense'; amount: number };\n\nconst txs: Transaction[] = [\n  { type: 'income', amount: 1000 },\n  { type: 'expense', amount: 250 },\n  { type: 'income', amount: 500 },\n  { type: 'expense', amount: 100 },\n];\n\nconst income = txs\n  .filter(t => t.type === 'income')\n  .reduce((s, t) => s + t.amount, 0);",
    steps: [
      {
        line: 13,
        prompt: "כמה תנועות יישארו אחרי filter?",
        answer: "2",
        hint: "שתי תנועות עם type='income': 1000 ו-500.",
      },
      {
        line: 14,
        prompt: "מה הערך של income?",
        answer: "1500",
        hint: "0 + 1000 + 500 = 1500.",
      },
    ],
    explanation:
      "filter יוצר מערך חדש לפי תנאי. reduce צובר ערך אחד מ-array. שילוב נפוץ: סנן + סכום, נפוץ באפליקציות תקציב.",
  },

  {
    id: "trace_27_05",
    conceptKey: "lesson_27::CRUD",
    level: 5,
    title: "Update immutable של פריט במערך",
    code: "type Item = { id: number; done: boolean };\n\nconst items: Item[] = [\n  { id: 1, done: false },\n  { id: 2, done: false },\n  { id: 3, done: false },\n];\n\nconst updated = items.map(i =>\n  i.id === 2 ? { ...i, done: true } : i\n);\n\n// (1) updated[0].done?\n// (2) updated[1].done?\n// (3) האם items[1].done השתנה?",
    steps: [
      {
        line: 13,
        prompt: "(1) updated[0].done?",
        answer: "false",
        hint: "id !== 2 → ה-ternary מחזיר את i כמו שהוא (לא משתנה).",
      },
      {
        line: 14,
        prompt: "(2) updated[1].done?",
        answer: "true",
        hint: "id === 2 → spread + done: true → אובייקט חדש עם done=true.",
      },
      {
        line: 15,
        prompt: "(3) האם items[1].done השתנה?",
        answer: "לא",
        acceptable: ["no", "false"],
        hint: "map יצר מערך חדש; items הישן לא נגע. immutable update.",
      },
    ],
    explanation:
      "דפוס Update immutable: map עם ternary. כל פריט שמתאים לתנאי — נוצר עותק עם השינוי; השאר נשארים. items המקורי לא משתנה — חיוני ב-React state.",
  },

];
