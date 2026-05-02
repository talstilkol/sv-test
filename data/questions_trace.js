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

  // ============================================================================
  // Lesson 11 — Variables, Arrays, Scope, Functions (5 questions)
  // ============================================================================

  {
    id: "trace_11_01",
    conceptKey: "lesson_11::let",
    level: 2,
    title: "let vs const",
    code: "let a = 5;\nconst b = 10;\na = 20;\nconsole.log(a, b);",
    steps: [
      {
        line: 3,
        prompt: "מה ערך a אחרי שורה 3?",
        answer: "20",
        hint: "let מתיר reassignment.",
      },
      {
        line: 4,
        prompt: "מה יודפס?",
        answer: "20 10",
        hint: "a=20 (עודכן), b=10 (const = לא ניתן לשינוי)",
        acceptable: ["20, 10"],
      },
    ],
    explanation:
      "let = ניתן לassignment מחדש. const = הbinding קבוע (אסור =). שניהם block-scoped.",
  },
  {
    id: "trace_11_02",
    conceptKey: "lesson_11::By Reference",
    level: 4,
    title: "מערך By Reference",
    code: "const arr1 = [1, 2, 3];\nconst arr2 = arr1;\narr2.push(4);\nconsole.log(arr1.length);\nconsole.log(arr1 === arr2);",
    steps: [
      {
        line: 4,
        prompt: "מה יודפס?",
        answer: "4",
        hint: "arr2 מפנה לאותו מערך. push(4) שינה את שניהם.",
      },
      {
        line: 5,
        prompt: "מה יודפס?",
        answer: "true",
        hint: "שניהם מצביעים לאותו אובייקט בזיכרון.",
      },
    ],
    explanation:
      "objects ו-arrays מועברים by reference. arr2 = arr1 לא מעתיק — רק יוצר הפניה נוספת לאותו מערך.",
  },
  {
    id: "trace_11_03",
    conceptKey: "lesson_11::scope",
    level: 3,
    title: "Block scope של let",
    code: "let x = 'חיצוני';\nif (true) {\n  let x = 'פנימי';\n  console.log(x);\n}\nconsole.log(x);",
    steps: [
      {
        line: 4,
        prompt: "מה יודפס בשורה 4?",
        answer: "פנימי",
        hint: "let x פנימי מסתיר את x חיצוני בblock.",
      },
      {
        line: 6,
        prompt: "מה יודפס בשורה 6?",
        answer: "חיצוני",
        hint: "מחוץ לblock, x חיצוני שולט.",
      },
    ],
    explanation:
      "let הוא block-scoped. x פנימי חי רק בתוך ה-if. x חיצוני לא נפגע.",
  },
  {
    id: "trace_11_04",
    conceptKey: "lesson_11::Array",
    level: 2,
    title: "אינדקס מערך",
    code: "const colors = ['red', 'green', 'blue'];\nconsole.log(colors[0]);\nconsole.log(colors[2]);\nconsole.log(colors.length);",
    steps: [
      {
        line: 2,
        prompt: "מה יודפס?",
        answer: "red",
        hint: "אינדקס 0 = פריט ראשון.",
      },
      {
        line: 3,
        prompt: "מה יודפס?",
        answer: "blue",
        hint: "אינדקס 2 = פריט שלישי (0,1,2).",
      },
      {
        line: 4,
        prompt: "מה יודפס?",
        answer: "3",
        hint: "length = כמות הפריטים.",
      },
    ],
    explanation: "מערכים ממוספרים מ-0. length מחזיר את כמות הפריטים.",
  },
  {
    id: "trace_11_05",
    conceptKey: "lesson_11::function",
    level: 3,
    title: "Arrow function עם implicit return",
    code: "const double = x => x * 2;\nconst add = (a, b) => { return a + b; };\nconsole.log(double(5));\nconsole.log(add(3, 7));",
    steps: [
      {
        line: 3,
        prompt: "מה יודפס?",
        answer: "10",
        hint: "double(5) = 5 * 2 = 10. Arrow עם ביטוי = implicit return.",
      },
      {
        line: 4,
        prompt: "מה יודפס?",
        answer: "10",
        hint: "add(3,7) = 3 + 7 = 10. פה יש {} אז צריך return מפורש.",
      },
    ],
    explanation:
      "arrow function עם ביטוי בודד = implicit return. עם {} = חייב return מפורש.",
  },

  // ============================================================================
  // Lesson 12 — Array Methods (5 questions)
  // ============================================================================

  {
    id: "trace_12_01",
    conceptKey: "lesson_12::map",
    level: 3,
    title: "map על מערך מספרים",
    code: "const prices = [10, 20, 30];\nconst withTax = prices.map(p => p * 1.17);\nconsole.log(withTax);\nconsole.log(prices);",
    steps: [
      {
        line: 3,
        prompt: "מה יודפס (מספרים)?",
        answer: "[11.7, 23.4, 35.1]",
        acceptable: ["11.7,23.4,35.1"],
        hint: "map מכפיל כל מחיר ב-1.17.",
      },
      {
        line: 4,
        prompt: "האם prices השתנה?",
        answer: "לא",
        acceptable: ["no", "[10,20,30]"],
        hint: "map לא משנה את המקור.",
      },
    ],
    explanation: "map יוצר מערך חדש. המקור לא נפגע — immutable by design.",
  },
  {
    id: "trace_12_02",
    conceptKey: "lesson_12::filter",
    level: 3,
    title: "filter — סינון לפי תנאי",
    code: "const ages = [15, 22, 8, 30, 12];\nconst adults = ages.filter(a => a >= 18);\nconsole.log(adults);\nconsole.log(adults.length);",
    steps: [
      {
        line: 3,
        prompt: "מה יודפס?",
        answer: "[22, 30]",
        acceptable: ["22,30"],
        hint: "רק 22 ו-30 >= 18.",
      },
      {
        line: 4,
        prompt: "מה יודפס?",
        answer: "2",
        hint: "שני איברים עברו את הפילטר.",
      },
    ],
    explanation: "filter מחזיר מערך חדש עם הפריטים שעמדו בתנאי. הסדר נשמר.",
  },
  {
    id: "trace_12_03",
    conceptKey: "lesson_11::reduce",
    level: 4,
    title: "reduce — סכום",
    code: "const nums = [1, 2, 3, 4, 5];\nconst sum = nums.reduce((acc, n) => acc + n, 0);\nconsole.log(sum);",
    steps: [
      {
        line: 3,
        prompt: "מה יודפס?",
        answer: "15",
        hint: "0+1+2+3+4+5 = 15. initialValue = 0.",
      },
    ],
    explanation: "reduce צובר: acc=0+1=1, 1+2=3, 3+3=6, 6+4=10, 10+5=15.",
  },
  {
    id: "trace_12_04",
    conceptKey: "lesson_12::forEach",
    level: 2,
    title: "forEach לא מחזיר",
    code: "const names = ['דן', 'רחל'];\nconst result = names.forEach(n => console.log(n));\nconsole.log('result:', result);",
    steps: [
      {
        line: 2,
        prompt: "מה יודפס ראשון?",
        answer: "דן",
        hint: "forEach עובר על כל אלמנט בסדר.",
      },
      {
        line: 3,
        prompt: "מה ערך result?",
        answer: "undefined",
        hint: "forEach תמיד מחזיר undefined.",
      },
    ],
    explanation:
      "forEach מבצע side-effects בלבד, לא מחזיר ערך. אם צריך תוצאה — השתמש ב-map.",
  },
  {
    id: "trace_12_05",
    conceptKey: "lesson_12::spread",
    level: 4,
    title: "spread copy vs reference",
    code: "const orig = [1, 2, 3];\nconst copy = [...orig];\ncopy.push(4);\nconsole.log(orig.length);\nconsole.log(copy.length);",
    steps: [
      {
        line: 4,
        prompt: "מה יודפס?",
        answer: "3",
        hint: "spread יצר מערך חדש. orig לא נפגע.",
      },
      {
        line: 5,
        prompt: "מה יודפס?",
        answer: "4",
        hint: "push(4) הוסיף רק ל-copy.",
      },
    ],
    explanation:
      "spread יוצר shallow copy — מערך חדש עם אותם ערכים. שינויים ב-copy לא משפיעים על orig.",
  },

  // ============================================================================
  // Lesson 13 — Objects, Classes, DOM (5 questions)
  // ============================================================================

  {
    id: "trace_13_01",
    conceptKey: "lesson_13::Object",
    level: 2,
    title: "גישה לשדות אובייקט",
    code: "const user = { name: 'דני', age: 25 };\nconsole.log(user.name);\nconsole.log(user['age']);\nuser.age = 26;\nconsole.log(user.age);",
    steps: [
      {
        line: 2,
        prompt: "מה יודפס?",
        answer: "דני",
        hint: "dot notation — user.name",
      },
      {
        line: 3,
        prompt: "מה יודפס?",
        answer: "25",
        hint: "bracket notation — user['age']",
      },
      {
        line: 5,
        prompt: "מה יודפס אחרי העדכון?",
        answer: "26",
        hint: "const אוסר reassignment לuser, אבל שדות פנימיים ניתנים לשינוי.",
      },
    ],
    explanation:
      "const על אובייקט = הbinding קבוע. שדות פנימיים (properties) ניתנים לשינוי.",
  },
  {
    id: "trace_13_02",
    conceptKey: "lesson_13::class",
    level: 3,
    title: "Class עם constructor",
    code: "class Dog {\n  constructor(name) {\n    this.name = name;\n  }\n  bark() { return this.name + ' אומר הב!'; }\n}\nconst d = new Dog('רקס');\nconsole.log(d.bark());",
    steps: [
      {
        line: 7,
        prompt: "מה ערך d.name?",
        answer: "רקס",
        hint: "constructor קיבל 'רקס' ושמר ב-this.name.",
      },
      {
        line: 8,
        prompt: "מה יודפס?",
        answer: "רקס אומר הב!",
        hint: "bark() מחרוזת this.name + טקסט.",
      },
    ],
    explanation:
      "new Dog('רקס') קורא ל-constructor עם name='רקס'. this.name נשמר על ה-instance. bark() גשה ל-this.name.",
  },
  {
    id: "trace_13_03",
    conceptKey: "lesson_13::method",
    level: 5,
    title: "this בmethod vs arrow",
    code: "const obj = {\n  name: 'בית',\n  regular() { return this.name; },\n  arrow: () => typeof this,\n};\nconsole.log(obj.regular());\nconsole.log(obj.arrow());",
    steps: [
      {
        line: 6,
        prompt: "מה יודפס?",
        answer: "בית",
        hint: "regular() נקרא על obj → this = obj.",
      },
      {
        line: 7,
        prompt: "מה יודפס?",
        answer: "undefined",
        acceptable: ["object", "undefined"],
        hint: "arrow function לא מקבלת this משלה — יורשת מ-global/module.",
      },
    ],
    explanation:
      "function declaration — this נקבע לפי מי קורא. arrow — this נקבע בזמן ההגדרה (lexical this). במודול/strict mode — this = undefined.",
  },
  {
    id: "trace_13_04",
    conceptKey: "lesson_13::Object",
    level: 3,
    title: "destructuring",
    code: "const person = { name: 'דני', age: 25, city: 'ת\"א' };\nconst { name, ...rest } = person;\nconsole.log(name);\nconsole.log(rest);",
    steps: [
      {
        line: 3,
        prompt: "מה יודפס?",
        answer: "דני",
        hint: "destructuring שולף name מ-person.",
      },
      {
        line: 4,
        prompt: "מה יודפס?",
        answer: "{ age: 25, city: 'ת\"א' }",
        acceptable: ['{age:25,city:ת"א}'],
        hint: "rest operator אוסף את כל מה שלא נשלף.",
      },
    ],
    explanation:
      "destructuring = שליפת שדות. ...rest = אוסף את השאר לאובייקט חדש.",
  },
  {
    id: "trace_13_05",
    conceptKey: "lesson_13::extends",
    level: 4,
    title: "Class extends",
    code: "class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return this.name + ' מדבר'; }\n}\nclass Dog extends Animal {\n  speak() { return this.name + ' נובח'; }\n}\nconst d = new Dog('רקס');\nconsole.log(d.speak());",
    steps: [
      {
        line: 9,
        prompt: "מה יודפס?",
        answer: "רקס נובח",
        hint: "Dog דורס את speak() של Animal. d הוא Dog → נובח.",
      },
    ],
    explanation:
      "extends = ירושה. Dog יורש מ-Animal. speak() ב-Dog דורס (override) את speak() של Animal.",
  },

  // ============================================================================
  // Lesson 15 — Closures, Async, Promise (5 questions)
  // ============================================================================

  {
    id: "trace_15_01",
    conceptKey: "lesson_15::Closure",
    level: 4,
    title: "closure פשוט",
    code: "function outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  };\n}\nconst fn = outer();\nconsole.log(fn());\nconsole.log(fn());\nconsole.log(fn());",
    steps: [
      {
        line: 9,
        prompt: "מה יודפס?",
        answer: "1",
        hint: "קריאה ראשונה: count 0→1.",
      },
      {
        line: 10,
        prompt: "מה יודפס?",
        answer: "2",
        hint: "count שמור ב-closure — ממשיך מ-1 ל-2.",
      },
      {
        line: 11,
        prompt: "מה יודפס?",
        answer: "3",
        hint: "count ממשיך לגדול — 2→3.",
      },
    ],
    explanation:
      "inner() שומרת reference ל-count דרך closure. כל קריאה ל-fn() מקדמת את אותו count.",
  },
  {
    id: "trace_15_02",
    conceptKey: "lesson_15::Promise",
    level: 4,
    title: "סדר ביצוע — sync vs Promise",
    code: "console.log('A');\nPromise.resolve().then(() => console.log('B'));\nconsole.log('C');",
    steps: [
      {
        line: 1,
        prompt: "מה יודפס ראשון?",
        answer: "A",
        hint: "קוד סינכרוני רץ ראשון.",
      },
      {
        line: 3,
        prompt: "מה יודפס שני?",
        answer: "C",
        hint: "שורה 3 סינכרונית — רצה לפני ה-microtask.",
      },
      {
        line: 2,
        prompt: "מה יודפס שלישי?",
        answer: "B",
        hint: "then() הוא microtask — רץ אחרי שכל הsync נגמר.",
      },
    ],
    explanation:
      "סדר: sync code (A, C) → microtask queue (B). Promise.then רץ תמיד אחרי שכל הקוד הסינכרוני נגמר.",
  },
  {
    id: "trace_15_03",
    conceptKey: "lesson_15::Asynchronous",
    level: 5,
    title: "async/await סדר ביצוע",
    code: "async function go() {\n  console.log('1');\n  await Promise.resolve();\n  console.log('2');\n}\nconsole.log('A');\ngo();\nconsole.log('B');",
    steps: [
      {
        line: 6,
        prompt: "מה יודפס ראשון?",
        answer: "A",
        hint: "sync — לפני go().",
      },
      {
        line: 2,
        prompt: "מה יודפס שני?",
        answer: "1",
        hint: "go() מתחיל — console.log('1') סינכרוני בתוך async.",
      },
      {
        line: 8,
        prompt: "מה יודפס שלישי?",
        answer: "B",
        hint: "await מפסיק את go(). הcontrol חוזר לcaller.",
      },
      {
        line: 4,
        prompt: "מה יודפס אחרון?",
        answer: "2",
        hint: "אחרי שהsync נגמר, microtask ממשיך את go().",
      },
    ],
    explanation:
      "async function רצה סינכרונית עד await ראשון. await שולח continuation ל-microtask queue. הcaller ממשיך.",
  },
  {
    id: "trace_15_04",
    conceptKey: "lesson_15::try",
    level: 3,
    title: "try/catch/finally",
    code: "try {\n  console.log('try');\n  throw new Error('בום');\n  console.log('אחרי throw');\n} catch (e) {\n  console.log('catch:', e.message);\n} finally {\n  console.log('finally');\n}",
    steps: [
      {
        line: 2,
        prompt: "מה יודפס ראשון?",
        answer: "try",
        hint: "try רץ רגיל עד throw.",
      },
      {
        line: 4,
        prompt: "האם שורה 4 תרוץ?",
        answer: "לא",
        acceptable: ["no"],
        hint: "throw קופץ מיד ל-catch.",
      },
      {
        line: 6,
        prompt: "מה יודפס?",
        answer: "catch: בום",
        acceptable: ["catch:בום"],
        hint: "e.message = 'בום'.",
      },
      {
        line: 8,
        prompt: "מה יודפס?",
        answer: "finally",
        hint: "finally רץ תמיד — גם אם היה catch.",
      },
    ],
    explanation:
      "throw קופץ ישירות ל-catch. קוד אחרי throw ב-try לא מתבצע. finally רץ תמיד.",
  },
  {
    id: "trace_15_05",
    conceptKey: "lesson_15::Closure",
    level: 5,
    title: "var בלולאה — closure trap",
    code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// מה יודפס אחרי 100ms?",
    steps: [
      {
        line: 2,
        prompt: "מה יודפס אחרי 100ms?",
        answer: "3 3 3",
        acceptable: ["3,3,3", "333"],
        hint: "var i = function-scoped. כל ה-callbacks חולקים אותו i, שבסוף = 3.",
      },
    ],
    explanation:
      "var i חי ב-function scope. אחרי הלולאה i=3. כל 3 ה-setTimeout-ים רואים את אותו i. הפתרון: let i (block-scoped).",
  },

  // ============================================================================
  // Lesson 16 — Node.js (5 questions)
  // ============================================================================

  {
    id: "trace_16_01",
    conceptKey: "lesson_16::Node.js",
    level: 3,
    title: "require ו-module.exports",
    code: "// math.js\nfunction add(a, b) { return a + b; }\nmodule.exports = { add };\n\n// app.js\nconst math = require('./math');\nconsole.log(math.add(3, 4));",
    steps: [
      {
        line: 7,
        prompt: "מה יודפס?",
        answer: "7",
        hint: "math.add(3,4) = 3 + 4 = 7.",
      },
    ],
    explanation:
      "module.exports מגדיר מה הmodule מייצא. require() מחזיר את מה שexports-ד.",
  },
  {
    id: "trace_16_02",
    conceptKey: "lesson_16::Node.js",
    level: 4,
    title: "process.argv",
    code: "// נריץ: node script.js hello world\nconsole.log(process.argv[0]);\nconsole.log(process.argv[2]);\nconsole.log(process.argv.length);",
    steps: [
      {
        line: 2,
        prompt: "מה ב-argv[0]?",
        answer: "node",
        acceptable: ["/usr/bin/node", "node path"],
        hint: "argv[0] = path ל-node executable.",
      },
      {
        line: 3,
        prompt: "מה ב-argv[2]?",
        answer: "hello",
        hint: "argv[0]=node, argv[1]=script.js, argv[2]=hello.",
      },
      {
        line: 4,
        prompt: "מה יודפס?",
        answer: "4",
        hint: "node, script.js, hello, world = 4 ארגומנטים.",
      },
    ],
    explanation:
      "process.argv: [node path, script path, ...user args]. ארגומנטים של המשתמש מתחילים ב-index 2.",
  },
  {
    id: "trace_16_03",
    conceptKey: "lesson_16::npm",
    level: 3,
    title: "package.json scripts",
    code: '// package.json\n{\n  "scripts": {\n    "start": "node server.js",\n    "dev": "nodemon server.js"\n  }\n}\n// מה רץ כשנכתוב: npm run dev?',
    steps: [
      {
        line: 5,
        prompt: "איזו פקודה תרוץ?",
        answer: "nodemon server.js",
        hint: "npm run dev מחפש את key 'dev' ב-scripts.",
      },
    ],
    explanation:
      "npm run <name> מריץ את הפקודה המוגדרת ב-scripts.<name>. start מיוחד = npm start (ללא run).",
  },
  {
    id: "trace_16_04",
    conceptKey: "lesson_16::Node.js",
    level: 4,
    title: "Event loop — setTimeout(0)",
    code: "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nconsole.log('3');",
    steps: [
      { line: 1, prompt: "מה יודפס ראשון?", answer: "1", hint: "סינכרוני." },
      {
        line: 3,
        prompt: "מה יודפס שני?",
        answer: "3",
        hint: "סינכרוני — רץ לפני setTimeout callback.",
      },
      {
        line: 2,
        prompt: "מה יודפס שלישי?",
        answer: "2",
        hint: "setTimeout(fn, 0) הולך ל-timer queue. רץ אחרי שכל הsync נגמר.",
      },
    ],
    explanation:
      "setTimeout(fn, 0) לא מיידי! ה-callback הולך ל-macrotask queue ורץ רק אחרי שכל הקוד הסינכרוני סיים.",
  },
  {
    id: "trace_16_05",
    conceptKey: "lesson_16::npm",
    level: 3,
    title: "semver — תאימות",
    code: '// package.json\n"dependencies": {\n  "express": "^4.18.2"\n}\n// איזו גרסה תותקן?',
    steps: [
      {
        line: 3,
        prompt: "האם 4.19.0 מותרת?",
        answer: "כן",
        acceptable: ["yes"],
        hint: "^ = minor+patch מותרים.",
      },
      {
        line: 3,
        prompt: "האם 5.0.0 מותרת?",
        answer: "לא",
        acceptable: ["no"],
        hint: "^ = major חייב להישאר 4.",
      },
    ],
    explanation:
      "^4.18.2 = >=4.18.2 <5.0.0. minor ו-patch עולים, major לא. שומר על backward compatibility.",
  },

  // ============================================================================
  // Lesson 17 — HTTP, REST API (5 questions)
  // ============================================================================

  {
    id: "trace_17_01",
    conceptKey: "lesson_17::HTTP",
    level: 3,
    title: "HTTP Status Codes",
    code: "// שרת מחזיר:\nres.status(201).json({ id: 1, name: 'דני' });\n// מה הלקוח יקבל?",
    steps: [
      {
        line: 2,
        prompt: "מה ה-status code?",
        answer: "201",
        hint: "201 = Created — משאב חדש נוצר.",
      },
      {
        line: 2,
        prompt: "מה ה-body?",
        answer: '{"id":1,"name":"דני"}',
        acceptable: ["{id:1,name:דני}"],
        hint: ".json() שולח JSON.",
      },
    ],
    explanation:
      "201 Created = משאב חדש נוצר בהצלחה. .json() מגדיר Content-Type: application/json ומסדרל.",
  },
  {
    id: "trace_17_02",
    conceptKey: "lesson_17::REST API",
    level: 3,
    title: "CRUD ל-REST mapping",
    code: "// GET    /users     = ?\n// POST   /users     = ?\n// PUT    /users/42  = ?\n// DELETE /users/42  = ?",
    steps: [
      {
        line: 1,
        prompt: "GET /users = איזו פעולה?",
        answer: "קריאת כל המשתמשים",
        acceptable: ["read all", "list"],
      },
      {
        line: 2,
        prompt: "POST /users = ?",
        answer: "יצירת משתמש חדש",
        acceptable: ["create"],
      },
      {
        line: 3,
        prompt: "PUT /users/42 = ?",
        answer: "עדכון משתמש 42",
        acceptable: ["update 42", "update"],
      },
      {
        line: 4,
        prompt: "DELETE /users/42 = ?",
        answer: "מחיקת משתמש 42",
        acceptable: ["delete 42", "delete"],
      },
    ],
    explanation:
      "REST: GET=Read, POST=Create, PUT/PATCH=Update, DELETE=Delete. URL = resource, method = action.",
  },
  {
    id: "trace_17_03",
    conceptKey: "lesson_17::HTTP",
    level: 4,
    title: "fetch עם async/await",
    code: "async function getUser() {\n  const res = await fetch('/api/users/1');\n  const data = await res.json();\n  console.log(data.name);\n}\n// נניח שה-API מחזיר { name: 'דני', age: 25 }",
    steps: [
      {
        line: 2,
        prompt: "מה res מכיל?",
        answer: "Response object",
        acceptable: ["response"],
        hint: "fetch מחזיר Response — לא את הנתונים עצמם.",
      },
      {
        line: 3,
        prompt: "למה צריך עוד await?",
        answer: "json() מחזיר Promise",
        acceptable: ["promise"],
        hint: ".json() גם אסינכרוני — צריך await נוסף.",
      },
      {
        line: 4,
        prompt: "מה יודפס?",
        answer: "דני",
        hint: "data = { name: 'דני', age: 25 }. data.name = 'דני'.",
      },
    ],
    explanation:
      "fetch → await → Response object. res.json() → await → parsed JS object. שני await במינימום.",
  },
  {
    id: "trace_17_04",
    conceptKey: "lesson_17::HTTP",
    level: 3,
    title: "query parameters",
    code: "// URL: /api/search?q=react&page=2\n// Express handler:\napp.get('/api/search', (req, res) => {\n  console.log(req.query.q);\n  console.log(req.query.page);\n});",
    steps: [
      {
        line: 4,
        prompt: "מה יודפס?",
        answer: "react",
        hint: "req.query.q שולף את q מה-query string.",
      },
      {
        line: 5,
        prompt: "מה יודפס?",
        answer: "2",
        hint: "req.query.page = '2' (string!).",
      },
    ],
    explanation:
      "query params (?key=value&...) נגישים דרך req.query. כל הערכים הם strings.",
  },
  {
    id: "trace_17_05",
    conceptKey: "lesson_17::JSON",
    level: 2,
    title: "JSON.stringify/parse",
    code: "const obj = { name: 'דני', age: 25 };\nconst json = JSON.stringify(obj);\nconst parsed = JSON.parse(json);\nconsole.log(typeof json);\nconsole.log(parsed.name);",
    steps: [
      {
        line: 4,
        prompt: "מה יודפס?",
        answer: "string",
        hint: "JSON.stringify מחזיר string.",
      },
      {
        line: 5,
        prompt: "מה יודפס?",
        answer: "דני",
        hint: "JSON.parse מחזיר אובייקט JS רגיל.",
      },
    ],
    explanation:
      "stringify: JS object → JSON string. parse: JSON string → JS object. הם הפוכים זה לזה.",
  },

  // ============================================================================
  // Lesson 18 — Express Routes, Middleware (5 questions)
  // ============================================================================

  {
    id: "trace_18_01",
    conceptKey: "lesson_18::route",
    level: 3,
    title: "Express route handler",
    code: "const users = [{ id: 1, name: 'דני' }];\napp.get('/users', (req, res) => {\n  res.json(users);\n});\n// GET /users",
    steps: [
      {
        line: 3,
        prompt: "מה יישלח ללקוח?",
        answer: '[{"id":1,"name":"דני"}]',
        acceptable: ["[{id:1,name:דני}]", "JSON array"],
        hint: "res.json() מסדרל ושולח.",
      },
    ],
    explanation:
      "app.get() מגדיר handler ל-GET request. res.json() = Content-Type: application/json + body.",
  },
  {
    id: "trace_18_02",
    conceptKey: "lesson_18::Express",
    level: 4,
    title: "סדר middleware",
    code: "app.use((req, res, next) => {\n  console.log('MW1');\n  next();\n});\napp.use((req, res, next) => {\n  console.log('MW2');\n  next();\n});\napp.get('/test', (req, res) => {\n  console.log('ROUTE');\n  res.send('ok');\n});\n// GET /test",
    steps: [
      {
        line: 2,
        prompt: "מה יודפס ראשון?",
        answer: "MW1",
        hint: "middleware לפי סדר ההגדרה.",
      },
      {
        line: 6,
        prompt: "מה יודפס שני?",
        answer: "MW2",
        hint: "next() ב-MW1 מעביר ל-MW2.",
      },
      {
        line: 10,
        prompt: "מה יודפס שלישי?",
        answer: "ROUTE",
        hint: "next() ב-MW2 מעביר ל-route handler.",
      },
    ],
    explanation:
      "Express middleware chain: כל MW רץ בסדר שהוגדר. next() מעביר לבא בשרשרת. ללא next() — הבקשה תיתקע.",
  },
  {
    id: "trace_18_03",
    conceptKey: "lesson_18::POST",
    level: 3,
    title: "req.body ב-POST",
    code: 'app.use(express.json());\napp.post(\'/users\', (req, res) => {\n  const { name, email } = req.body;\n  console.log(name, email);\n  res.status(201).json({ id: 1, name, email });\n});\n// POST /users body: {"name":"דני","email":"dan@x.com"}',
    steps: [
      {
        line: 4,
        prompt: "מה יודפס?",
        answer: "דני dan@x.com",
        acceptable: ["דני,dan@x.com"],
        hint: "req.body = parsed JSON body.",
      },
      {
        line: 5,
        prompt: "מה ה-status code?",
        answer: "201",
        hint: ".status(201) = Created.",
      },
    ],
    explanation:
      "express.json() middleware פרסר את ה-body ושם אותו ב-req.body. חובה להגדיר לפני ה-routes.",
  },
  {
    id: "trace_18_04",
    conceptKey: "lesson_18::route",
    level: 4,
    title: "route params",
    code: "app.get('/users/:id', (req, res) => {\n  console.log(req.params.id);\n  console.log(typeof req.params.id);\n});\n// GET /users/42",
    steps: [
      {
        line: 2,
        prompt: "מה יודפס?",
        answer: "42",
        hint: ":id מתאים ל-42 ב-URL.",
      },
      {
        line: 3,
        prompt: "מה יודפס?",
        answer: "string",
        hint: "params תמיד strings! גם אם נראה כמו מספר.",
      },
    ],
    explanation:
      "route params (:id) נגישים דרך req.params. תמיד strings. צריך parseInt() אם רוצים number.",
  },
  {
    id: "trace_18_05",
    conceptKey: "lesson_18::Express",
    level: 4,
    title: "middleware ללא next()",
    code: "app.use((req, res, next) => {\n  console.log('logger');\n  // שכחנו next()!\n});\napp.get('/test', (req, res) => {\n  res.send('ok');\n});\n// GET /test",
    steps: [
      {
        line: 2,
        prompt: "מה יודפס?",
        answer: "logger",
        hint: "ה-MW קורא console.log.",
      },
      {
        line: 5,
        prompt: "האם ה-route handler יגיע?",
        answer: "לא",
        acceptable: ["no"],
        hint: "אין next() → הבקשה תיתקע.",
      },
    ],
    explanation:
      "ללא next(), Express לא ממשיך בchain. הבקשה תיתקע. הלקוח יקבל timeout.",
  },

  // ============================================================================
  // Lesson 19 — EJS / Templates (5 questions)
  // ============================================================================

  {
    id: "trace_19_01",
    conceptKey: "lesson_19::script",
    level: 2,
    title: "EJS template output",
    code: "<h1><%= title %></h1>\n<p>שלום, <%= user.name %>!</p>\n// render data: { title: 'דף הבית', user: { name: 'דני' } }",
    steps: [
      {
        line: 1,
        prompt: "מה יוצג ב-h1?",
        answer: "דף הבית",
        hint: "<%= %> מציב את הערך.",
      },
      {
        line: 2,
        prompt: "מה יוצג ב-p?",
        answer: "שלום, דני!",
        hint: "<%= user.name %> = דני.",
      },
    ],
    explanation:
      "<%= expr %> ב-EJS מציב את ערך הביטוי ב-HTML. הdata מגיע מ-res.render(template, data).",
  },
  {
    id: "trace_19_02",
    conceptKey: "lesson_19::forEach",
    level: 3,
    title: "EJS loop",
    code: "<ul>\n<% items.forEach(item => { %>\n  <li><%= item %></li>\n<% }) %>\n</ul>\n// data: { items: ['א', 'ב', 'ג'] }",
    steps: [
      {
        line: 3,
        prompt: "כמה li ייווצרו?",
        answer: "3",
        hint: "forEach על 3 פריטים.",
      },
      {
        line: 3,
        prompt: "מה ה-li הראשון?",
        answer: "א",
        hint: "item הראשון = 'א'.",
      },
    ],
    explanation:
      "<% %> מריץ JS (ללא פלט). <%= %> מציב ערך. forEach ב-<% %> יוצר HTML דינמי.",
  },
  {
    id: "trace_19_03",
    conceptKey: "lesson_19::if/else",
    level: 3,
    title: "EJS conditional",
    code: "<% if (user.isAdmin) { %>\n  <button>מחק</button>\n<% } else { %>\n  <p>אין הרשאה</p>\n<% } %>\n// data: { user: { isAdmin: false } }",
    steps: [
      {
        line: 2,
        prompt: "האם button יוצג?",
        answer: "לא",
        acceptable: ["no"],
        hint: "isAdmin = false → else.",
      },
      {
        line: 4,
        prompt: "מה יוצג?",
        answer: "אין הרשאה",
        hint: "ה-else מציג את האלמנט.",
      },
    ],
    explanation:
      "if/else ב-EJS שולט בתצוגה. רק הבלוק המתאים לתנאי מוזרק ל-HTML.",
  },
  {
    id: "trace_19_04",
    conceptKey: "lesson_19::function",
    level: 3,
    title: "res.render",
    code: "app.set('view engine', 'ejs');\napp.get('/profile', (req, res) => {\n  res.render('profile', { name: 'דני', age: 25 });\n});\n// views/profile.ejs: <h1><%= name %></h1>",
    steps: [
      {
        line: 3,
        prompt: "איזה קובץ ייטען?",
        answer: "views/profile.ejs",
        acceptable: ["profile.ejs"],
        hint: "Express מחפש ב-views/ לפי שם.",
      },
      {
        line: 5,
        prompt: "מה יוצג ב-h1?",
        answer: "דני",
        hint: "name = 'דני' מועבר דרך render.",
      },
    ],
    explanation:
      "res.render(view, data) = מצא את ה-template, הזרק data, ושלח HTML ללקוח.",
  },
  {
    id: "trace_19_05",
    conceptKey: "lesson_19::script",
    level: 4,
    title: "<%= vs <%- (escape)",
    code: "// data: { html: '<b>מודגש</b>' }\n<p><%= html %></p>\n<p><%- html %></p>",
    steps: [
      {
        line: 2,
        prompt: "מה יוצג עם <%=?",
        answer: "&lt;b&gt;מודגש&lt;/b&gt;",
        acceptable: ["escaped HTML", "טקסט רגיל"],
        hint: "<%= escaped — ה-HTML מוצג כטקסט רגיל.",
      },
      {
        line: 3,
        prompt: "מה יוצג עם <%-?",
        answer: "מודגש",
        acceptable: ["bold text", "<b>מודגש</b>"],
        hint: "<%- unescaped — ה-HTML מרונדר כ-HTML אמיתי.",
      },
    ],
    explanation:
      "<%= escaped (בטוח, מונע XSS). <%- unescaped (מסוכן אם מגיע מuser). תמיד העדף <%=.",
  },

  // ============================================================================
  // Lesson 20 — MongoDB (5 questions)
  // ============================================================================

  {
    id: "trace_20_01",
    conceptKey: "lesson_20::MongoDB",
    level: 3,
    title: "find() — שליפת documents",
    code: "// collection: users\n// { name: 'דני', age: 25 }, { name: 'רחל', age: 30 }, { name: 'אבי', age: 25 }\nconst result = await db.collection('users').find({ age: 25 }).toArray();\nconsole.log(result.length);",
    steps: [
      {
        line: 4,
        prompt: "מה יודפס?",
        answer: "2",
        hint: "שני documents עם age=25: דני ואבי.",
      },
    ],
    explanation:
      "find({ field: value }) מחזיר cursor. toArray() הופך למערך. filter לפי שדה = exact match.",
  },
  {
    id: "trace_20_02",
    conceptKey: "lesson_20::MongoDB",
    level: 3,
    title: "insertOne — הוספה",
    code: "const result = await db.collection('users').insertOne({ name: 'דני', age: 25 });\nconsole.log(result.acknowledged);\nconsole.log(typeof result.insertedId);",
    steps: [
      {
        line: 2,
        prompt: "מה יודפס?",
        answer: "true",
        hint: "acknowledged = ההוספה הצליחה.",
      },
      {
        line: 3,
        prompt: "מה יודפס?",
        answer: "object",
        acceptable: ["ObjectId"],
        hint: "insertedId הוא ObjectId — typeof = object.",
      },
    ],
    explanation:
      "insertOne מוסיף document ומחזיר { acknowledged, insertedId }. MongoDB מייצר _id אוטומטית.",
  },
  {
    id: "trace_20_03",
    conceptKey: "lesson_20::MongoDB",
    level: 4,
    title: "updateOne — עדכון",
    code: "const result = await db.collection('users').updateOne(\n  { name: 'דני' },\n  { $set: { age: 26 } }\n);\nconsole.log(result.modifiedCount);",
    steps: [
      {
        line: 5,
        prompt: "מה יודפס?",
        answer: "1",
        hint: "מצא וירוני document אחד — modifiedCount=1.",
      },
    ],
    explanation:
      "updateOne(filter, update) — $set מעדכן שדות ספציפיים ללא מחיקת שאר השדות.",
  },
  {
    id: "trace_20_04",
    conceptKey: "lesson_20::MongoDB",
    level: 3,
    title: "deleteOne",
    code: "// collection: users — 3 documents\nconst result = await db.collection('users').deleteOne({ name: 'דני' });\nconsole.log(result.deletedCount);\nconst all = await db.collection('users').find({}).toArray();\nconsole.log(all.length);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "1", hint: "מחק document אחד." },
      {
        line: 5,
        prompt: "מה יודפס?",
        answer: "2",
        hint: "3 - 1 = 2 documents נותרו.",
      },
    ],
    explanation:
      "deleteOne(filter) מוחק את ה-document הראשון שמתאים. deletedCount אומר כמה נמחקו.",
  },
  {
    id: "trace_20_05",
    conceptKey: "lesson_20::Mongoose",
    level: 4,
    title: "Mongoose Schema",
    code: "const userSchema = new Schema({\n  name: { type: String, required: true },\n  age: { type: Number, default: 18 },\n});\nconst User = model('User', userSchema);\nconst u = new User({ name: 'דני' });\nconsole.log(u.name);\nconsole.log(u.age);",
    steps: [
      {
        line: 7,
        prompt: "מה יודפס?",
        answer: "דני",
        hint: "name הועבר ב-constructor.",
      },
      {
        line: 8,
        prompt: "מה יודפס?",
        answer: "18",
        hint: "age לא הועבר → default: 18.",
        acceptable: ["18"],
      },
    ],
    explanation:
      "Mongoose Schema מגדיר מבנה + validation + defaults. שדה עם default מקבל ערך אוטומטי כשלא מספקים.",
  },

  // ============================================================================
  // Closures — scope chain, lexical scope, stale closures (5 questions)
  // ============================================================================

  {
    id: "trace_closure_01",
    conceptKey: "lesson_closures::scope chain",
    level: 4,
    title: "scope chain — חיפוש מבפנים החוצה",
    code: "const globalName = 'Global';\nfunction outer() {\n  const outerName = 'Outer';\n  function inner() {\n    const innerName = 'Inner';\n    console.log(innerName);\n    console.log(outerName);\n    console.log(globalName);\n  }\n  inner();\n}\nouter();",
    steps: [
      {
        line: 6,
        prompt: "מה יודפס ראשון?",
        answer: "Inner",
        hint: "המשתנה נמצא בתוך inner — החיפוש נעצר שם.",
      },
      {
        line: 7,
        prompt: "מה יודפס שני?",
        answer: "Outer",
        hint: "outerName לא נמצא ב-inner, אז ה-scope chain עולה ל-outer.",
      },
      {
        line: 8,
        prompt: "מה יודפס שלישי?",
        answer: "Global",
        hint: "globalName נמצא רק ב-scope החיצוני ביותר.",
      },
    ],
    explanation:
      "Scope chain מחפש משתנים לפי סדר קבוע: scope פנימי, אחר כך scope אבא, ובסוף global. הוא לא מחפש לפי המקום שממנו קראו לפונקציה.",
  },
  {
    id: "trace_closure_02",
    conceptKey: "lesson_closures::lexical scope",
    level: 5,
    title: "lexical scope — איפה הפונקציה נכתבה",
    code: "const name = 'גלובלי';\nfunction makePrinter() {\n  const name = 'פנימי';\n  return function printName() {\n    console.log(name);\n  };\n}\nconst printer = makePrinter();\nfunction run(fn) {\n  const name = 'מקומי';\n  fn();\n}\nrun(printer);",
    steps: [
      {
        line: 11,
        prompt: "איזה name הפונקציה printName תראה?",
        answer: "פנימי",
        hint: "הפונקציה הוגדרה בתוך makePrinter, לא בתוך run.",
      },
      {
        line: 13,
        prompt: "מה יודפס בסוף?",
        answer: "פנימי",
        hint: "lexical scope נקבע בזמן כתיבת הפונקציה.",
      },
    ],
    explanation:
      "Lexical scope אומר שפונקציה זוכרת את הסביבה שבה הוגדרה. הקריאה מתוך run לא מעניקה לה גישה ל-name המקומי של run.",
  },
  {
    id: "trace_closure_03",
    conceptKey: "lesson_closures::closure",
    level: 5,
    title: "closure — state פרטי שנשמר",
    code: "function makeCounter() {\n  let count = 0;\n  return function inc() {\n    count += 1;\n    return count;\n  };\n}\nconst a = makeCounter();\nconst b = makeCounter();\nconsole.log(a());\nconsole.log(a());\nconsole.log(b());",
    steps: [
      {
        line: 10,
        prompt: "מה יודפס בקריאה הראשונה ל-a?",
        answer: "1",
        hint: "a מחזיק closure עם count פרטי שמתחיל ב-0.",
      },
      {
        line: 11,
        prompt: "מה יודפס בקריאה השנייה ל-a?",
        answer: "2",
        hint: "אותו closure של a זוכר את count מהקריאה הקודמת.",
      },
      {
        line: 12,
        prompt: "מה יודפס בקריאה הראשונה ל-b?",
        answer: "1",
        hint: "b נוצר מקריאה אחרת ל-makeCounter ולכן יש לו count נפרד.",
      },
    ],
    explanation:
      "כל קריאה ל-makeCounter יוצרת lexical environment חדש. a ו-b הם closures נפרדים, ולכן לכל אחד יש count עצמאי.",
  },
  {
    id: "trace_closure_04",
    conceptKey: "lesson_closures::closure in setTimeout",
    level: 6,
    title: "closure בלולאה — let מול var",
    code: "for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\nfor (var j = 0; j < 3; j++) {\n  setTimeout(() => console.log(j), 0);\n}",
    steps: [
      {
        line: 2,
        prompt: "מה ידפיסו שלושת ה-callbacks הראשונים עם let?",
        answer: "0 1 2",
        acceptable: ["0,1,2", "012"],
        hint: "let יוצר binding חדש לכל איטרציה.",
      },
      {
        line: 5,
        prompt: "מה ידפיסו שלושת ה-callbacks השניים עם var?",
        answer: "3 3 3",
        acceptable: ["3,3,3", "333"],
        hint: "var הוא function-scoped; כל callbacks חולקים את אותו j הסופי.",
      },
    ],
    explanation:
      "זה הבאג הקלאסי של closures בלולאות. let יוצר binding חדש בכל סיבוב; var יוצר binding אחד משותף לכל ה-callbacks.",
  },
  {
    id: "trace_closure_05",
    conceptKey: "lesson_closures::stale closure",
    level: 6,
    title: "stale closure — ערך ישן בתוך callback",
    code: "function createLogger(count) {\n  return function logLater() {\n    console.log('count:', count);\n  };\n}\nlet count = 0;\nconst log = createLogger(count);\ncount = 5;\nlog();",
    steps: [
      {
        line: 7,
        prompt: "איזה ערך הועבר ל-createLogger?",
        answer: "0",
        hint: "בזמן הקריאה count עדיין היה 0.",
      },
      {
        line: 9,
        prompt: "מה יודפס?",
        answer: "count: 0",
        acceptable: ["0"],
        hint: "ה-closure זוכר את הפרמטר count של createLogger, לא את המשתנה החיצוני שהתעדכן אחר כך.",
      },
    ],
    explanation:
      "Stale closure נוצר כש-callback מחזיק snapshot ישן של ערך. ב-React זה מופיע כש-effect או handler נסגר על state ישן בגלל deps חסרים או שימוש לא נכון.",
  },
  {
    id: "trace_html_css_01",
    conceptKey: "lesson_html_css_foundations::semantic HTML",
    level: 3,
    title: "קריאת שלד HTML סמנטי",
    code: "<header>\n  <h1>לוח משימות</h1>\n</header>\n<nav>\n  <a href=\"/tasks\">משימות</a>\n</nav>\n<main>\n  <section>\n    <h2>היום</h2>\n  </section>\n</main>",
    steps: [
      {
        line: 7,
        prompt: "איזה אלמנט מסמן את התוכן המרכזי של הדף?",
        answer: "main",
        acceptable: ["<main>"],
        hint: "חפש את ה-landmark שאינו כותרת עליונה ואינו תפריט.",
      },
      {
        line: 8,
        prompt: "איזה אלמנט מחלק אזור תוכן בתוך התוכן המרכזי?",
        answer: "section",
        acceptable: ["<section>"],
        hint: "האלמנט שעוטף את הכותרת 'היום'.",
      },
      {
        line: 4,
        prompt: "איזה אלמנט מתאים לאזור ניווט?",
        answer: "nav",
        acceptable: ["<nav>"],
        hint: "בתוכו נמצא הקישור למשימות.",
      },
    ],
    explanation:
      "HTML סמנטי הוא מפת תפקידים: header לכותרת עליונה, nav לניווט, main לתוכן המרכזי ו-section לאזור תוכן פנימי.",
  },
  {
    id: "trace_html_css_02",
    conceptKey: "lesson_html_css_foundations::cascade and specificity",
    level: 5,
    title: "מי מנצח ב-CSS specificity",
    code: "button {\n  color: gray;\n}\n.primary {\n  color: blue;\n}\n#save {\n  color: green;\n}",
    steps: [
      {
        line: 1,
        prompt: "איזה צבע מגיע מה-selector הכללי של תגית button?",
        answer: "gray",
        hint: "זה הכלל הראשון והוא הכי פחות ספציפי.",
      },
      {
        line: 4,
        prompt: "איזה selector ספציפי יותר מ-button?",
        answer: ".primary",
        acceptable: ["primary", "class"],
        hint: "class selector חזק יותר מ-tag selector.",
      },
      {
        line: 7,
        prompt: "אם הכפתור הוא <button id=\"save\" class=\"primary\">, איזה צבע ינצח?",
        answer: "green",
        hint: "id selector חזק יותר מ-class ו-tag.",
      },
    ],
    explanation:
      "ב-CSS לא רק הסדר קובע. specificity מדרגת selectors: תגית < class < id. לכן #save מנצח אם כל הכללים חלים על אותו כפתור.",
  },
  {
    id: "trace_tooling_01",
    conceptKey: "lesson_tooling_git::GitHub workflow",
    level: 4,
    title: "רצף עבודה נקי מ-branch ל-PR",
    code: "git pull --ff-only\ngit switch -c feature/search\n# edit src/Search.jsx\nnpm test\ngit add src/Search.jsx\ngit commit -m \"add search box\"\ngit push -u origin feature/search\n# open pull request",
    steps: [
      {
        line: 1,
        prompt: "איזו פקודה מביאה את העדכון האחרון בלי merge מפתיע?",
        answer: "git pull --ff-only",
        acceptable: ["pull --ff-only"],
        hint: "זו הפקודה הראשונה ברצף.",
      },
      {
        line: 2,
        prompt: "מה שם הענף החדש שנוצר?",
        answer: "feature/search",
        hint: "השם מופיע אחרי switch -c.",
      },
      {
        line: 6,
        prompt: "איזה שלב יוצר snapshot רשמי של השינוי?",
        answer: "commit",
        acceptable: ["git commit"],
        hint: "זה השלב עם הודעת השינוי.",
      },
      {
        line: 8,
        prompt: "מה הפעולה הבאה אחרי push כדי לבקש review?",
        answer: "open pull request",
        acceptable: ["pull request", "PR"],
        hint: "ההערה בשורה האחרונה אומרת מה עושים ב-GitHub.",
      },
    ],
    explanation:
      "Workflow בריא מתחיל בעדכון main, יוצר branch מבודד, מריץ בדיקות, עושה commit קטן, דוחף ל-GitHub ואז פותח PR ל-review.",
  },
  {
    id: "trace_tooling_02",
    conceptKey: "lesson_tooling_git::npm scripts",
    level: 4,
    title: "קריאת package.json scripts",
    code: "{\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"test\": \"vitest run\",\n    \"lint\": \"eslint src\"\n  }\n}",
    steps: [
      {
        line: 3,
        prompt: "איזה script מפעיל שרת פיתוח?",
        answer: "dev",
        acceptable: ["npm run dev"],
        hint: "הפקודה שלו היא vite.",
      },
      {
        line: 4,
        prompt: "איזה script בונה גרסת production?",
        answer: "build",
        acceptable: ["npm run build"],
        hint: "הפקודה כוללת vite build.",
      },
      {
        line: 6,
        prompt: "איזה script בודק חוקים סטטיים?",
        answer: "lint",
        acceptable: ["npm run lint"],
        hint: "הפקודה שלו מתחילה ב-eslint.",
      },
    ],
    explanation:
      "package.json scripts נותנים שמות קבועים לפקודות. זה מאפשר לצוות ול-CI להריץ אותה פעולה בלי לזכור פקודות ארוכות.",
  },
  {
    id: "trace_ai_dev_ai_001",
    conceptKey: "ai_development::AI",
    level: 4,
    title: "קריאת פרטי בקשת ה-AI",
    code: "const reply = await client.chat.completions.create({\n  model: 'gpt-4o-mini',\n  messages: [\n    { role: 'system', content: 'You are a concise senior dev.' },\n    { role: 'user', content: 'הסבר במשפט אחד מה זה closure.' },\n  ],\n  temperature: 0.3,\n});",
    steps: [
      {
        line: 1,
        prompt: "כמה message entries נמסרו ל-completion הזה?",
        answer: "2",
        hint: "יש שני אובייקטים במערך messages: system ו-user.",
      },
      {
        line: 2,
        prompt: "איזה מודל שימש ליצירת התשובה?",
        answer: "gpt-4o-mini",
        hint: "השדה model מציין במפורש את שם המודל.",
      },
    ],
    explanation:
      "בקשת chat כוללת שני סוגי הודעות (system/user), מודל מוגדר במפורש, ופרמטר temperature משפיע על יציבות הפלט.",
  },

  // ============================================================================
  // Lesson 19 — JS fundamentals (top-gap manual batch 2026-05-02)
  // ============================================================================
  {
    id: "trace_19_11",
    conceptKey: "lesson_19::var",
    level: 4,
    title: "var hoisting — מה יודפס?",
    code: "console.log(x);\nvar x = 5;\nconsole.log(x);",
    steps: [
      { line: 1, prompt: "מה ההדפסה הראשונה?", answer: "undefined", hint: "var hoisted אבל לא הערך — רק ההצהרה." },
      { line: 3, prompt: "מה ההדפסה השנייה?", answer: "5", hint: "אחרי השמת הערך." },
    ],
    explanation: "var hoisted לראש ה-scope ומאותחל ל-undefined. הערך 5 מוקצה רק כשמגיעים לשורה 2.",
  },
  {
    id: "trace_19_12",
    conceptKey: "lesson_19::let",
    level: 5,
    title: "let TDZ — מה קורה?",
    code: "console.log(y);\nlet y = 10;",
    steps: [
      { line: 1, prompt: "מה התוצאה של console.log(y)?", answer: "ReferenceError", hint: "let ב-TDZ עד ההצהרה.", acceptable: ["ReferenceError: y is not defined", "שגיאה"] },
    ],
    explanation: "let hoisted אבל לא ניתן לגישה לפני ההצהרה — Temporal Dead Zone זורק ReferenceError.",
  },
  {
    id: "trace_19_13",
    conceptKey: "lesson_19::closure",
    level: 5,
    title: "closure בלולאה — var vs let",
    code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
    steps: [
      { line: 2, prompt: "מה יודפס שלוש פעמים?", answer: "3", hint: "var function-scoped, callback רץ אחרי שהלולאה הסתיימה." },
    ],
    explanation: "var = i יחיד לכל הלולאה. עד setTimeout רץ — i כבר 3. עם let → 0,1,2 כי let יוצר binding חדש בכל איטרציה.",
  },
  {
    id: "trace_19_14",
    conceptKey: "lesson_19::event loop",
    level: 6,
    title: "סדר ה-Event Loop",
    code: "console.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');",
    steps: [
      { line: 1, prompt: "מה יודפס ראשון?", answer: "A", hint: "סנכרוני." },
      { line: 4, prompt: "מה יודפס שני?", answer: "D", hint: "סנכרוני." },
      { line: 3, prompt: "מה יודפס שלישי?", answer: "C", hint: "microtask." },
      { line: 2, prompt: "מה יודפס רביעי?", answer: "B", hint: "macrotask." },
    ],
    explanation: "סדר: סינכרוני (A,D), אז microtasks (Promise→C), אז macrotasks (setTimeout→B). microtasks תמיד לפני macrotasks.",
  },
  {
    id: "trace_19_15",
    conceptKey: "lesson_19::spread",
    level: 4,
    title: "Object spread — last write wins",
    code: "const obj = { a: 1, b: 2 };\nconst merged = { ...obj, b: 99 };\nconsole.log(merged.b);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "99", hint: "השמה אחרי spread דורסת." },
    ],
    explanation: "Object spread מעתיק properties משמאל לימין. b: 99 בא אחרי ה-spread של obj.b=2, אז הוא דורס.",
  },
  {
    id: "trace_19_16",
    conceptKey: "lesson_19::try",
    level: 4,
    title: "finally תמיד רץ",
    code: "function f() {\n  try {\n    return 'try';\n  } finally {\n    console.log('finally');\n  }\n}\nconst result = f();\nconsole.log(result);",
    steps: [
      { line: 5, prompt: "מה יודפס מ-finally?", answer: "finally", hint: "finally רץ גם כשיש return." },
      { line: 9, prompt: "מה הערך של result?", answer: "try", hint: "ה-return ב-try מנצח." },
    ],
    explanation: "finally רץ תמיד, גם אחרי return. אבל ה-return ב-try נשמר (אלא אם finally יש בו return משלו, שדורס).",
  },
  {
    id: "trace_19_17",
    conceptKey: "lesson_19::promise",
    level: 5,
    title: "Promise chain",
    code: "Promise.resolve(1)\n  .then(v => v + 1)\n  .then(v => v * 2)\n  .then(v => console.log(v));",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "4", hint: "1 → 2 → 4." },
    ],
    explanation: "כל .then מחזיר Promise חדש עם הערך המוחזר. 1+1=2, 2*2=4.",
  },
  {
    id: "trace_19_18",
    conceptKey: "lesson_19::scope",
    level: 5,
    title: "block scope",
    code: "let x = 'outer';\n{\n  let x = 'inner';\n  console.log(x);\n}\nconsole.log(x);",
    steps: [
      { line: 4, prompt: "מה יודפס בתוך הblock?", answer: "inner", hint: "let ב-block יוצר binding חדש." },
      { line: 6, prompt: "מה יודפס מחוץ?", answer: "outer", hint: "ה-x החיצוני לא הושפע." },
    ],
    explanation: "let block-scoped. ה-x הפנימי מאפיל על החיצוני רק בתוך ה-block. אחרי ה-{} — x החיצוני שוב נראה.",
  },

  // (lesson_17 traces removed from this batch — covered separately in
  // svcollege_traces_lesson17_activity.js with a strict format the
  // svcollege-lesson17-activity-traces test pins to.)
];

// Browser bridge: expose under QUESTIONS_BANK.trace so the trainer's
// pickTraceForConcept and the trace tab both find traces via window.QUESTIONS_BANK.trace.
if (typeof window !== "undefined") {
  window.QUESTIONS_TRACE = QUESTIONS_TRACE;
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = QUESTIONS_TRACE;
  }
}
