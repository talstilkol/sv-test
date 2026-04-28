// data/bug_quests.js — W8 Bug Hunt Quests
// 5 narrative quests × 5–6 bugs each

var BUG_QUESTS = [
  {
    id: "quest_01",
    title: "🕵️ משבר בצוות הסטארט-אפ",
    narrative: "קיבלת דוח חרום: האפליקציה של הסטארט-אפ 'TechFlow' נשברת כל הלילה. המנכ\"ל זורק לך את הקוד ואומר 'תמצא את הבאגים — היום'. מוכן?",
    chapter: "React Hooks",
    bugs: [
      {
        id: "bq_01_01",
        code: "const [count, setCount] = useState(0);\nsetCount(count + 1);\nsetCount(count + 1);\n// מצפים ל-2 אבל מקבלים 1",
        question: "למה הספירה עולה רק ב-1 ולא ב-2?",
        options: [
          "useState לא עובד עם מספרים",
          "כל שני קריאות ל-setCount עם אותו count מייצרות אותו ערך חדש",
          "צריך לקרוא ל-setCount פעם אחת בלבד",
          "חסר return בקומפוננטה"
        ],
        correct: 1,
        explanation: "setState עם ערך (לא עם callback) מחשב בהתאם ל-count בזמן הריצה. שתי הקריאות רואות את אותו count=0. פתרון: setCount(c => c + 1)."
      },
      {
        id: "bq_01_02",
        code: "useEffect(() => {\n  fetch('/api/data').then(r => r.json()).then(setData);\n}, [userId]);\n// infinite loop כשuserId הוא אובייקט",
        question: "למה יש infinite loop?",
        options: [
          "fetch לא עובד בתוך useEffect",
          "אובייקטים משתנים בכל render — השוואת reference כושלת",
          "setData גורם ל-render שגורם ל-fetch שוב",
          "צריך useCallback"
        ],
        correct: 1,
        explanation: "React משווה deps בשוואת reference (===). אובייקט חדש נוצר בכל render גם אם התוכן זהה. פתרון: העבר userId.id (primitive) או השתמש ב-useMemo לstabilize הobject."
      },
      {
        id: "bq_01_03",
        code: "function Counter() {\n  if (condition) {\n    const [count, setCount] = useState(0);\n  }\n  return <div>{count}</div>;\n}",
        question: "מה הבעיה בקוד הזה?",
        options: [
          "useState צריך להיות לפני ה-if",
          "לא ניתן לקרוא useState בתנאי — זה מפר את rules of hooks",
          "count לא מוגדר מחוץ ל-if block",
          "שתי התשובות הבאה נכונות"
        ],
        correct: 3,
        explanation: "שתי בעיות: Rules of Hooks אוסרות hooks בתוך conditionals (כי הסדר חייב להיות עקבי בין renders), וגם count לא נגיש מחוץ ל-block. פתרון: הוצא את useState לרמה העליונה."
      },
      {
        id: "bq_01_04",
        code: "useEffect(() => {\n  const id = setInterval(() => setTick(t => t+1), 1000);\n}, []);\n// memory leak אחרי unmount",
        question: "מה חסר כדי למנוע memory leak?",
        options: [
          "צריך להוסיף tick ל-dependencies",
          "צריך להחזיר cleanup function: return () => clearInterval(id)",
          "setInterval לא עובד ב-useEffect",
          "צריך useState לפני useEffect"
        ],
        correct: 1,
        explanation: "ה-interval ממשיך לרוץ גם אחרי unmount הקומפוננטה. useEffect מאפשר להחזיר cleanup function שרצה בunmount: return () => clearInterval(id)."
      },
      {
        id: "bq_01_05",
        code: "const [user, setUser] = useState({name: 'דוד', age: 25});\nsetUser({name: 'מיכל'});\n// age נמחק!",
        question: "למה age נעלם?",
        options: [
          "useState לא שומר אובייקטים",
          "setUser מחליף את כל האובייקט — לא מבצע merge",
          "צריך useReducer לאובייקטים",
          "age צריך להיות string"
        ],
        correct: 1,
        explanation: "בניגוד ל-this.setState ב-class components, setState של hooks מחליף את הערך לחלוטין. פתרון: setUser(prev => ({...prev, name: 'מיכל'})) להשתמש בspread לmerge."
      }
    ]
  },

  {
    id: "quest_02",
    title: "🕵️ ה-API שלא עובד",
    narrative: "לקוח מתקשר בפאניקה: 'כל הבקשות ל-API שלנו נכשלות!' אתה חוקר את הקוד ומוצא 6 בעיות סמויות. הצל את הפרויקט.",
    chapter: "JavaScript Async",
    bugs: [
      {
        id: "bq_02_01",
        code: "async function getUser(id) {\n  const res = fetch(`/api/users/${id}`);\n  const data = res.json();\n  return data;\n}",
        question: "מה הבעיה בקוד הזה?",
        options: [
          "fetch לא מחזיר Promise",
          "חסר await לפני fetch ו-res.json()",
          "async function לא יכולה להחזיר data",
          "template literal לא עובד עם id"
        ],
        correct: 1,
        explanation: "fetch מחזיר Promise — בלי await, res הוא Promise object ולא Response. res.json() גם מחזיר Promise. צריך: const res = await fetch(...); const data = await res.json();"
      },
      {
        id: "bq_02_02",
        code: "async function loadData() {\n  const users = await fetchUsers();\n  const posts = await fetchPosts();\n  const comments = await fetchComments();\n  return {users, posts, comments};\n}\n// לוקח 3 שניות בסדרה",
        question: "איך לשפר את ה-performance?",
        options: [
          "להשתמש ב-fetch במקום functions",
          "לבצע את כל ה-fetches במקביל עם Promise.all()",
          "להסיר async/await ולעבור ל-.then()",
          "להוסיף cache"
        ],
        correct: 1,
        explanation: "הבקשות הן עצמאיות ואפשר להריצן במקביל. Promise.all([fetchUsers(), fetchPosts(), fetchComments()]) מריץ את שלושתן בבת אחת — מוריד זמן ל-max(t1,t2,t3) במקום t1+t2+t3."
      },
      {
        id: "bq_02_03",
        code: "async function getData() {\n  try {\n    const data = await fetch('/api');\n    return data;\n  } catch(e) {\n    console.log('error');\n  }\n}\nconst result = getData();\nresult.map(item => item.id);",
        question: "למה .map() נכשל?",
        options: [
          "async function מחזירה Promise — צריך await או .then()",
          "fetch לא מחזיר מערך",
          "map לא עובד על data",
          "חסר return בcatch"
        ],
        correct: 0,
        explanation: "async function תמיד מחזירה Promise. result הוא Promise, לא המערך. צריך: const result = await getData(); (בתוך async context) או getData().then(result => result.map(...))."
      },
      {
        id: "bq_02_04",
        code: "function handleClick() {\n  fetch('/api/save', {method: 'POST', body: {name: 'דוד'}})\n    .then(r => r.json())\n    .then(d => console.log(d));\n}",
        question: "למה השרת לא מקבל את הנתונים?",
        options: [
          "POST לא נתמך",
          "body צריך להיות JSON.stringify() ו-Content-Type header",
          "fetch לא עובד ב-event handler",
          "חסר await"
        ],
        correct: 1,
        explanation: "body מצפה לstring/FormData/Blob — אובייקט JS נהפך ל-'[object Object]'. צריך: body: JSON.stringify({name: 'דוד'}), headers: {'Content-Type': 'application/json'}."
      },
      {
        id: "bq_02_05",
        code: "const results = [];\n[1,2,3].forEach(async (id) => {\n  const data = await fetchItem(id);\n  results.push(data);\n});\nconsole.log(results); // []",
        question: "למה results ריק?",
        options: [
          "forEach לא מחזיר ערכים",
          "forEach לא מחכה ל-async callbacks — ה-log רץ לפני שה-fetches מסתיימים",
          "push לא עובד עם async",
          "צריך להשתמש ב-map"
        ],
        correct: 1,
        explanation: "forEach מתעלם מהPromise שהcallback מחזיר — הוא לא מחכה. הconsole.log רץ מיד. פתרון: await Promise.all([1,2,3].map(async id => { const d = await fetchItem(id); results.push(d); }))."
      }
    ]
  },

  {
    id: "quest_03",
    title: "🕵️ הרשימה שנעלמת",
    narrative: "קיבלת component של רשימת מוצרים שמתנהג מוזר — כמה items לא מופיעים, כמה כפולים, ו-performance גרוע. זמן לחקור.",
    chapter: "React Component",
    bugs: [
      {
        id: "bq_03_01",
        code: "const items = [{id: 1, name: 'A'}, {id: 2, name: 'B'}];\nreturn (\n  <ul>\n    {items.map((item, index) => <li key={index}>{item.name}</li>)}\n  </ul>\n);",
        question: "מה הבעיה עם key={index}?",
        options: [
          "index לא קיים ב-map",
          "שימוש ב-index כ-key גורם לבעיות כשהרשימה משתנה (reorder/insert)",
          "key חייב להיות string",
          "אין בעיה — זה בסדר"
        ],
        correct: 1,
        explanation: "React משתמש ב-key לזיהוי elements. אם מסדרים מחדש, index משתנה ו-React לא יודע איזה item הוא איזה — גורם לbug בstate ולre-renders מיותרים. פתרון: key={item.id}."
      },
      {
        id: "bq_03_02",
        code: "function List({items}) {\n  const sorted = items.sort((a,b) => a.name.localeCompare(b.name));\n  return <ul>{sorted.map(i => <li key={i.id}>{i.name}</li>)}</ul>;\n}",
        question: "מה הבאג הסמוי?",
        options: [
          "sort לא עובד עם אובייקטים",
          "Array.sort() מ-mutate את המערך המקורי — משנה את props ישירות",
          "localeCompare לא תומך בעברית",
          "חסר key"
        ],
        correct: 1,
        explanation: "sort() משנה את המערך המקורי (in-place). זה מוטיישן של props — דבר שאסור ב-React. פתרון: [...items].sort(...) ליצור עותק לפני המיון."
      },
      {
        id: "bq_03_03",
        code: "function ProductCard({product, onBuy}) {\n  return (\n    <div>\n      <h3>{product.name}</h3>\n      <button onClick={onBuy(product.id)}>קנה</button>\n    </div>\n  );\n}",
        question: "מה הבעיה עם onClick?",
        options: [
          "onClick לא מקבל פונקציות עם ארגומנטים",
          "onBuy(product.id) נקרא מיד בזמן render ולא בלחיצה",
          "צריך event.preventDefault()",
          "product.id יכול להיות undefined"
        ],
        correct: 1,
        explanation: "onClick={onBuy(product.id)} קורא לפונקציה בזמן render (לא בלחיצה). זה גורם לקריאה אינסופית. פתרון: onClick={() => onBuy(product.id)} — עוטפים בarrow function."
      },
      {
        id: "bq_03_04",
        code: "const [items, setItems] = useState([]);\nfunction addItem(newItem) {\n  items.push(newItem);\n  setItems(items);\n}",
        question: "למה ה-UI לא מתעדכן?",
        options: [
          "push לא עובד על state",
          "הmutation של items + העברת אותו reference לא גורם לRender — צריך reference חדש",
          "setItems צריך להיות async",
          "צריך useEffect"
        ],
        correct: 1,
        explanation: "push מוסיף לאותו מערך (reference זהה). React משווה === ולא מזהה שינוי. פתרון: setItems([...items, newItem]) — reference חדש = re-render."
      },
      {
        id: "bq_03_05",
        code: "function App() {\n  const [q, setQ] = useState('');\n  return (\n    <div>\n      <input onChange={(e) => setQ(e.target.value)} />\n      <ExpensiveList query={q} />\n    </div>\n  );\n}\n// ExpensiveList re-renders בכל הקשה",
        question: "איך למנוע re-render מיותר של ExpensiveList?",
        options: [
          "להסיר את onChange",
          "לעטוף ExpensiveList ב-React.memo()",
          "להשתמש ב-useRef במקום useState",
          "להוסיף useMemo ל-query"
        ],
        correct: 1,
        explanation: "כל שינוי ב-q גורם ל-App לrender מחדש, ו-ExpensiveList גם. React.memo(ExpensiveList) יגרום ל-React לדלג על render כשquery לא השתנה."
      }
    ]
  },

  {
    id: "quest_04",
    title: "🕵️ השרת שנפל",
    narrative: "שרת ה-Node.js של החברה נפל ב-3 לילה. בוקר בבוקר אתה מקבל את ה-logs ומגלה 5 בעיות בקוד. תקן לפני שהלקוחות מתעוררים.",
    chapter: "Node.js & Express",
    bugs: [
      {
        id: "bq_04_01",
        code: "app.get('/users', (req, res) => {\n  const users = db.getAll();\n  res.send(users);\n  res.send('done');\n});",
        question: "למה השרת קורס?",
        options: [
          "db.getAll() לא קיים",
          "לא ניתן לשלוח response פעמיים — אחרי res.send() החיבור סגור",
          "GET לא יכול להחזיר data",
          "חסר return"
        ],
        correct: 1,
        explanation: "לאחר res.send() ראשון, Express כבר שלח את ה-response. הניסיון לשלוח שוב זורק שגיאה 'Cannot set headers after they are sent'. פתרון: הסר את השורה השנייה או הוסף return לפניה."
      },
      {
        id: "bq_04_02",
        code: "app.get('/item/:id', (req, res) => {\n  const item = db.find(req.params.id);\n  res.json(item.details);\n});",
        question: "מה עלול לקרוס?",
        options: [
          "params.id תמיד undefined",
          "אם item לא נמצא (null/undefined), גישה ל-item.details תזרוק TypeError",
          "json() לא עובד עם אובייקטים",
          "GET לא מקבל params"
        ],
        correct: 1,
        explanation: "אם db.find() מחזיר null, item.details יזרוק 'Cannot read properties of null'. פתרון: if (!item) return res.status(404).json({error: 'Not found'}); לפני גישה לפרטים."
      },
      {
        id: "bq_04_03",
        code: "app.post('/login', (req, res) => {\n  const {password} = req.body;\n  if (password === process.env.ADMIN_PASS) {\n    res.json({token: 'secret_token_123'});\n  }\n  res.json({error: 'wrong'});\n});",
        question: "מה הבעיה?",
        options: [
          "process.env לא זמין",
          "אין return — שתי תגובות יישלחו: גם בהצלחה וגם שגיאה",
          "password צריך hash",
          "תשובות א' ו-ב' נכונות"
        ],
        correct: 1,
        explanation: "אחרי res.json({token: ...}), הקוד ממשיך ומגיע ל-res.json({error: 'wrong'}) — שגיאת double-send. פתרון: הוסף return לפני ה-res בbranch ההצלחה."
      },
      {
        id: "bq_04_04",
        code: "async function saveUser(data) {\n  await db.insert(data);\n}\napp.post('/users', (req, res) => {\n  saveUser(req.body);\n  res.json({ok: true});\n});",
        question: "מה הבעיה עם error handling?",
        options: [
          "saveUser לא מחזיר ערך",
          "שגיאות ב-saveUser לא נתפסות — השרת עלול לקרוס ב-unhandled rejection",
          "async לא עובד עם Express",
          "res.json נשלח לפני שהDB מסיים"
        ],
        correct: 1,
        explanation: "saveUser מחזיר Promise שלא מחכים לו. אם ה-DB נכשל, ה-Promise נדחה בלי handler → unhandledRejection. פתרון: הפוך את ה-route ל-async ותוסף try/catch."
      },
      {
        id: "bq_04_05",
        code: "app.use((req, res) => {\n  res.status(404).send('Not found');\n});\napp.get('/health', (req, res) => {\n  res.send('ok');\n});",
        question: "למה /health תמיד מחזיר 404?",
        options: [
          "health לא route חוקי",
          "ה-404 middleware מוגדר לפני ה-/health route — כולל את כל הבקשות",
          "חסר next() בmiddleware",
          "צריך router.get"
        ],
        correct: 1,
        explanation: "ב-Express, middleware ורוטים רצים לפי סדר הגדרה. ה-catch-all middleware (ה-404) לוכד את כל הבקשות לפני ש-/health מוגדר. פתרון: הזז את ה-404 middleware לסוף הקובץ."
      }
    ]
  },

  {
    id: "quest_05",
    title: "🕵️ TypeScript — המהדר לא מרוצה",
    narrative: "ה-CI build נכשל. המהדר מזרוק 5 שגיאות TypeScript. הפרויקט לא יוצא לprduction עד שתתקן אותן. בהצלחה.",
    chapter: "TypeScript",
    bugs: [
      {
        id: "bq_05_01",
        code: "function greet(name) {\n  return 'שלום, ' + name.toUpperCase();\n}\n// Error: Parameter 'name' implicitly has an 'any' type",
        question: "איך לתקן?",
        options: [
          "לכתוב function greet(name: string)",
          "להוסיף // @ts-ignore",
          "להוסיף ! אחרי name",
          "להשתמש ב-var"
        ],
        correct: 0,
        explanation: "TypeScript עם strict mode דורש type annotation לפרמטרים. function greet(name: string) פותר את הבעיה ומבטיח שמי שקורא לפונקציה יעביר string."
      },
      {
        id: "bq_05_02",
        code: "interface User {\n  name: string;\n  age: number;\n}\nconst user: User = {name: 'דוד'};\n// Error: Property 'age' is missing",
        question: "מה הפתרון הכי מתאים?",
        options: [
          "להוסיף age: number לאובייקט, או לסמן age? כoptional",
          "להסיר את ה-interface",
          "לשנות ל-type במקום interface",
          "לכתוב age: undefined"
        ],
        correct: 0,
        explanation: "ב-interface כל שדה שלא מסומן כ-optional (?) הוא חובה. אם age אופציונלי: age?: number. אם חובה — יש להוסיפו לאובייקט."
      },
      {
        id: "bq_05_03",
        code: "function getLength(val: string | number): number {\n  return val.length;\n}\n// Error: Property 'length' does not exist on type 'number'",
        question: "איך לתקן?",
        options: [
          "להשתמש ב-as number",
          "לצמצם טיפוס עם typeof לפני גישה ל-length",
          "להוסיף ? אחרי val",
          "לשנות return type ל-any"
        ],
        correct: 1,
        explanation: "number אין לו length. צריך type narrowing: if (typeof val === 'string') return val.length; else return val.toString().length; TypeScript מזהה את הצמצום."
      },
      {
        id: "bq_05_04",
        code: "const items = [1, 2, 3];\nconst first: string = items[0];\n// Error: Type 'number' is not assignable to type 'string'",
        question: "מה הפתרון?",
        options: [
          "לשנות את type annotation ל-number",
          "להוסיף as string casting",
          "לשנות את items ל-string[]",
          "כל התשובות נכונות — תלוי בכוונה"
        ],
        correct: 3,
        explanation: "items הוא number[] — הערך הוא number לא string. שלושת הפתרונות תקינים בהקשרים שונים: שנה annotation ל-number (הגיוני ביותר); כתוב as string אם אתה בטוח (casting); שנה את items אם צריך strings."
      },
      {
        id: "bq_05_05",
        code: "async function fetchUser(id: number): Promise<User> {\n  const res = await fetch(`/api/users/${id}`);\n  return res.json();\n}\n// Type 'Promise<any>' is not assignable to type 'User'",
        question: "מה הפתרון?",
        options: [
          "להסיר את async",
          "לכתוב return res.json() as Promise<User> או return (await res.json()) as User",
          "לשנות return type ל-any",
          "fetch לא תומך ב-TypeScript"
        ],
        correct: 1,
        explanation: "res.json() מחזיר Promise<any>. הפונקציה מצהירה שמחזירה Promise<User> אבל מחזירה Promise<Promise<any>>. פתרון: const data = await res.json(); return data as User; — או הוסף type assertion."
      }
    ]
  }
];
