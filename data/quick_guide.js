// data/quick_guide.js
// "מדריך מקוצר" — 22 הנושאים החשובים. כל נושא מתאר את עצמו עם בלוקי תוכן
// (paragraph / list / table / code) ומקושר ל-questionsBank דרך topicId.
var QUICK_GUIDE = {
  intro: {
    title: "מפת החומר — כל העקרונות החשובים",
    subtitle:
      "הסדר ההגיוני: JavaScript בסיסי → DOM → אסינכרוניות → Node/Express → MongoDB → React → Hooks → Router → TypeScript → React+TS.",
  },
  topics: [
    {
      id: "topic_variables",
      number: 1,
      title: "JavaScript בסיסי — משתנים ו-Data Types",
      icon: "🧮",
      blocks: [
        { type: "p", text: "משתנה הוא מקום בזיכרון ששומר ערך. ב-JavaScript יש טיפוסים בסיסיים." },
        {
          type: "code",
          code:
            "let userName = \"David\"; // string\n" +
            "let age = 25;           // number\n" +
            "let isLoggedIn = true;  // boolean\n" +
            "let tasks = [];         // array\n" +
            "let user = {};          // object",
        },
        {
          type: "table",
          header: ["מושג", "הסבר קצר"],
          rows: [
            ["let", "משתנה שאפשר לשנות"],
            ["const", "משתנה שאי אפשר להציב לו ערך חדש"],
            ["var", "ישן יותר, פחות מומלץ"],
            ["string", "טקסט"],
            ["number", "מספר"],
            ["boolean", "אמת / שקר"],
            ["array", "רשימה"],
            ["object", "אובייקט עם מאפיינים"],
          ],
        },
        { type: "p", text: "תרגלים: יצירת משתנים, שינוי ערכים, הדפסה לקונסול ושימוש ב-boolean כדי להחליט איזו הודעה להציג." },
      ],
    },
    {
      id: "topic_conditionals",
      number: 2,
      title: "תנאים — if / else / switch",
      icon: "🔀",
      blocks: [
        { type: "p", text: "תנאים מאפשרים לקוד לקבל החלטות." },
        {
          type: "code",
          code:
            "if (tasksCount === 0) {\n" +
            "  console.log(\"No tasks yet\");\n" +
            "} else if (tasksCount < 5) {\n" +
            "  console.log(\"Few tasks\");\n" +
            "} else {\n" +
            "  console.log(\"Many tasks\");\n" +
            "}",
        },
        {
          type: "table",
          header: ["כלי", "מתי משתמשים"],
          rows: [
            ["if", "תנאי אחד או כמה תנאים"],
            ["else if", "כמה אפשרויות"],
            ["else", "ברירת מחדל"],
            ["switch", "בודקים הרבה ערכים קבועים"],
          ],
        },
      ],
    },
    {
      id: "topic_arrays",
      number: 3,
      title: "מערכים ומתודות חשובות",
      icon: "📚",
      blocks: [
        { type: "p", text: "מערך הוא רשימה של ערכים. גישה לאיבר נעשית לפי אינדקס (0-based)." },
        { type: "code", code: "let numbers = [1, 5, 2, 9];\nconsole.log(numbers[0]); // 1" },
        {
          type: "table",
          header: ["מתודה", "מה עושה"],
          rows: [
            ["push", "מוסיפה לסוף"],
            ["pop", "מוציאה מהסוף"],
            ["shift", "מוציאה מההתחלה"],
            ["unshift", "מוסיפה להתחלה"],
            ["sort", "ממיינת"],
            ["splice", "מוסיפה / מוחקת / מחליפה"],
            ["forEach", "רצה על כל איבר"],
            ["map", "יוצרת מערך חדש אחרי שינוי"],
            ["filter", "יוצרת מערך חדש אחרי סינון"],
            ["find", "מחזירה את האיבר הראשון שמתאים"],
            ["reduce", "מצמצמת מערך לערך אחד"],
            ["spread", "מעתיקה/מרחיבה"],
          ],
        },
        {
          type: "code",
          code:
            "const nums = [1, 2, 3, 4];\n" +
            "const doubled = nums.map(n => n * 2); // [2, 4, 6, 8]\n" +
            "const even = nums.filter(n => n % 2 === 0); // [2, 4]",
        },
      ],
    },
    {
      id: "topic_functions",
      number: 4,
      title: "פונקציות ו-Arrow Functions",
      icon: "🛠️",
      blocks: [
        { type: "p", text: "פונקציה היא קטע קוד שניתן להשתמש בו שוב." },
        {
          type: "code",
          code:
            "function add(a, b) {\n" +
            "  return a + b;\n" +
            "}\n\n" +
            "// Arrow function\n" +
            "const add2 = (a, b) => a + b;",
        },
        {
          type: "table",
          header: ["מושג", "הסבר"],
          rows: [
            ["פרמטרים", "ערכים שהפונקציה מקבלת"],
            ["return", "הערך שהפונקציה מחזירה"],
            ["void function", "מבצעת פעולה בלבד, לא מחזירה"],
            ["Arrow function", "כתיבה מודרנית וקצרה יותר"],
          ],
        },
      ],
    },
    {
      id: "topic_objects",
      number: 5,
      title: "Objects — אובייקטים",
      icon: "📦",
      blocks: [
        { type: "p", text: "אובייקט שומר מידע כ-key/value. מאוד נפוץ ב-React, שרתים ו-MongoDB." },
        {
          type: "code",
          code:
            "const student = {\n" +
            "  firstName: \"Dor\",\n" +
            "  lastName: \"Levi\",\n" +
            "  city: \"Tel Aviv\"\n" +
            "};\n\n" +
            "console.log(student.firstName);\n" +
            "student.city = \"Haifa\"; // שינוי ערך",
        },
        {
          type: "code",
          code:
            "// מערך של אובייקטים — דפוס נפוץ:\n" +
            "const students = [\n" +
            "  { name: \"Avi\", grade: 90 },\n" +
            "  { name: \"Dana\", grade: 85 }\n" +
            "];",
        },
      ],
    },
    {
      id: "topic_dom",
      number: 6,
      title: "DOM — גישה ל-HTML מ-JavaScript",
      icon: "🌳",
      blocks: [
        { type: "p", text: "DOM מאפשר ל-JS לקרוא, לשנות וליצור אלמנטים בדף." },
        { type: "code", code: "const title = document.getElementById(\"title\");\ntitle.innerHTML = \"Hello\";" },
        {
          type: "table",
          header: ["פעולה", "דוגמה"],
          rows: [
            ["מציאת אלמנט", "getElementById"],
            ["בחירה כללית", "querySelector / querySelectorAll"],
            ["שינוי תוכן", "innerHTML"],
            ["שינוי עיצוב", "element.style.color = 'red'"],
            ["יצירת אלמנט", "document.createElement('li')"],
            ["הוספה למסך", "appendChild"],
            ["מחיקה", "removeChild"],
          ],
        },
      ],
    },
    {
      id: "topic_events",
      number: 7,
      title: "Events — אירועים",
      icon: "🖱️",
      blocks: [
        { type: "p", text: "Event הוא אירוע של משתמש: לחיצה, הקלדה, שינוי input ועוד." },
        {
          type: "code",
          code:
            "button.addEventListener(\"click\", () => {\n" +
            "  console.log(\"Clicked\");\n" +
            "});\n\n" +
            "input.addEventListener(\"input\", (event) => {\n" +
            "  console.log(event.target.value);\n" +
            "});",
        },
        {
          type: "table",
          header: ["אירוע", "מתי קורה"],
          rows: [
            ["click", "בלחיצה"],
            ["input", "בכל שינוי טקסט"],
            ["change", "בשינוי בחירה"],
            ["submit", "שליחת טופס"],
          ],
        },
      ],
    },
    {
      id: "topic_storage",
      number: 8,
      title: "Storage — localStorage & sessionStorage",
      icon: "💾",
      blocks: [
        {
          type: "table",
          header: ["Storage", "נשמר אחרי סגירת דפדפן?"],
          rows: [
            ["localStorage", "כן"],
            ["sessionStorage", "לא"],
          ],
        },
        {
          type: "code",
          code:
            "localStorage.setItem(\"name\", \"David\");\n" +
            "const name = localStorage.getItem(\"name\");\n\n" +
            "// שמירת מערך/אובייקט דרך JSON:\n" +
            "localStorage.setItem(\"tasks\", JSON.stringify(tasks));\n" +
            "const saved = JSON.parse(localStorage.getItem(\"tasks\"));",
        },
      ],
    },
    {
      id: "topic_errors",
      number: 9,
      title: "Errors ו-Debugging",
      icon: "⚠️",
      blocks: [
        { type: "p", text: "טיפול בשגיאות מונע קריסה של התוכנית ומאפשר חוויה ידידותית." },
        {
          type: "code",
          code:
            "try {\n" +
            "  throw new Error(\"Task name is empty\");\n" +
            "} catch (error) {\n" +
            "  console.log(error.message);\n" +
            "}",
        },
        {
          type: "table",
          header: ["מושג", "הסבר"],
          rows: [
            ["try", "הקוד שמנסים להריץ"],
            ["catch", "מה עושים אם הייתה שגיאה"],
            ["throw", "זריקת שגיאה בעצמנו"],
            ["error.message", "הודעת השגיאה"],
          ],
        },
      ],
    },
    {
      id: "topic_async",
      number: 10,
      title: "אסינכרוניות, Promise, Fetch, Async/Await",
      icon: "⏱️",
      blocks: [
        { type: "p", text: "קוד סינכרוני רץ שורה אחרי שורה. אסינכרוני ממתין לפעולה בלי לעצור הכל." },
        {
          type: "code",
          code:
            "console.log(\"start\");\n" +
            "setTimeout(() => console.log(\"after 2s\"), 2000);\n" +
            "console.log(\"finish\");\n" +
            "// Output: start → finish → after 2s",
        },
        {
          type: "code",
          code:
            "fetch(\"https://jsonplaceholder.typicode.com/todos\")\n" +
            "  .then(res => res.json())\n" +
            "  .then(data => console.log(data))\n" +
            "  .catch(err => console.log(err));",
        },
        {
          type: "code",
          code:
            "async function getTasks() {\n" +
            "  try {\n" +
            "    const res = await fetch(\"/api/tasks\");\n" +
            "    const data = await res.json();\n" +
            "    console.log(data);\n" +
            "  } catch (error) {\n" +
            "    console.log(\"Error loading tasks\");\n" +
            "  }\n" +
            "}",
        },
      ],
    },
    {
      id: "topic_node",
      number: 11,
      title: "Node.js",
      icon: "🟢",
      blocks: [
        { type: "p", text: "Node.js מאפשר להריץ JavaScript מחוץ לדפדפן, בעיקר בצד שרת." },
        {
          type: "table",
          header: ["נושא", "הסבר"],
          rows: [
            ["node file.js", "הרצת קובץ"],
            ["npm", "ניהול חבילות"],
            ["package.json", "הגדרות פרויקט"],
            ["require", "ייבוא מודולים (CommonJS)"],
            ["module.exports", "ייצוא מודולים"],
            ["fs", "עבודה עם קבצים"],
          ],
        },
        {
          type: "code",
          code:
            "const fs = require(\"fs\");\n" +
            "fs.writeFile(\"about.txt\", \"Hello\", (err) => {\n" +
            "  if (err) console.log(err);\n" +
            "});",
        },
      ],
    },
    {
      id: "topic_express",
      number: 12,
      title: "Express ו-HTTP",
      icon: "🛣️",
      blocks: [
        { type: "p", text: "HTTP — לקוח שולח Request, שרת מחזיר Response. Express היא ספריית שרתים פופולרית ל-Node." },
        {
          type: "code",
          code:
            "const express = require(\"express\");\n" +
            "const app = express();\n\n" +
            "app.get(\"/\", (req, res) => {\n" +
            "  res.send(\"Hello world\");\n" +
            "});\n\n" +
            "app.listen(3000);",
        },
        {
          type: "table",
          header: ["Method", "שימוש"],
          rows: [
            ["GET", "קבלת מידע"],
            ["POST", "יצירת מידע חדש"],
            ["PUT/PATCH", "עדכון"],
            ["DELETE", "מחיקה"],
          ],
        },
        {
          type: "table",
          header: ["מושג", "הסבר"],
          rows: [
            ["Route", "נתיב בשרת"],
            ["Middleware", "פונקציה שעוברת בין request ל-response"],
            ["express.json()", "מאפשר לקבל JSON"],
            ["Status Code", "200/404/500 וכו'"],
          ],
        },
      ],
    },
    {
      id: "topic_mongo",
      number: 13,
      title: "MongoDB ו-NoSQL",
      icon: "🍃",
      blocks: [
        { type: "p", text: "MongoDB הוא בסיס נתונים NoSQL: Database → Collection → Document." },
        {
          type: "code",
          code:
            "// Document לדוגמה:\n" +
            "{\n  name: \"Bamba\",\n  price: 5\n}",
        },
        {
          type: "table",
          header: ["פעולה", "Mongo"],
          rows: [
            ["Create", "insertOne / insertMany"],
            ["Read", "find / findOne"],
            ["Update", "findOneAndUpdate / updateMany"],
            ["Delete", "deleteOne / deleteMany"],
          ],
        },
        {
          type: "code",
          code:
            "const mongoose = require(\"mongoose\");\n\n" +
            "const ProductSchema = new mongoose.Schema({\n" +
            "  name: String,\n" +
            "  price: Number\n" +
            "});\n\n" +
            "const Product = mongoose.model(\"Product\", ProductSchema);",
        },
      ],
    },
    {
      id: "topic_react",
      number: 14,
      title: "React בסיסי — Components, JSX, Props",
      icon: "⚛️",
      blocks: [
        { type: "p", text: "React היא ספריית צד-לקוח לבניית ממשקים באמצעות קומפוננטות." },
        {
          type: "code",
          code:
            "export default function Header() {\n" +
            "  return (\n" +
            "    <div>\n" +
            "      <h1>Hello</h1>\n" +
            "    </div>\n" +
            "  );\n" +
            "}",
        },
        {
          type: "table",
          header: ["מושג", "הסבר"],
          rows: [
            ["Component", "חלק עצמאי במסך"],
            ["JSX", "כתיבת HTML בתוך JS"],
            ["Props", "מידע שנשלח מהורה לילד"],
            ["map", "הצגת רשימות"],
            ["className", "במקום class"],
            ["Single root", "קומפוננטה מחזירה אלמנט אחד (או Fragment)"],
          ],
        },
        {
          type: "code",
          code:
            "function Student(props) {\n" +
            "  return <h2>{props.name}</h2>;\n" +
            "}",
        },
      ],
    },
    {
      id: "topic_state",
      number: 15,
      title: "useState ו-Immutable",
      icon: "🔄",
      blocks: [
        { type: "p", text: "useState שומר ערך שיכול להשתנות ולגרום לרינדור." },
        { type: "code", code: "const [count, setCount] = useState(0);\nsetCount(count + 1);" },
        { type: "p", text: "❌ לא משנים state ישירות:" },
        { type: "code", code: "// רע — mutation:\nstudents.push(newStudent);\nsetStudents(students);\n\n// טוב — עותק חדש:\nsetStudents([...students, newStudent]);" },
        { type: "p", text: "React משווה reference. שינוי במקום משאיר reference זהה ולכן הקומפוננטה לא מתרנדרת." },
      ],
    },
    {
      id: "topic_parent_child",
      number: 16,
      title: "העברת מידע בין קומפוננטות",
      icon: "🔗",
      blocks: [
        { type: "p", text: "מהורה לילד — props. מילד להורה — ההורה שולח callback לילד שמפעיל אותו עם המידע." },
        {
          type: "code",
          code:
            "// הורה:\n" +
            "<AddStudent onAddStudent={addStudent} />\n\n" +
            "// ילד:\n" +
            "props.onAddStudent(newStudent);",
        },
      ],
    },
    {
      id: "topic_router",
      number: 17,
      title: "React Router",
      icon: "🧭",
      blocks: [
        { type: "p", text: "Router מאפשר לבנות כמה עמודים באפליקציה ללא רענון." },
        {
          type: "code",
          code:
            "import { BrowserRouter, Routes, Route } from \"react-router-dom\";\n\n" +
            "<BrowserRouter>\n" +
            "  <Routes>\n" +
            "    <Route path=\"/\" element={<Home />} />\n" +
            "    <Route path=\"/about\" element={<About />} />\n" +
            "    <Route path=\"/user/:userId\" element={<User />} />\n" +
            "  </Routes>\n" +
            "</BrowserRouter>",
        },
        {
          type: "code",
          code:
            "<Link to=\"/about\">About</Link>\n\n" +
            "// ניווט פרוגרמטי:\n" +
            "const navigate = useNavigate();\n" +
            "navigate(\"/home\");\n\n" +
            "// קריאת פרמטר:\n" +
            "const { userId } = useParams();",
        },
      ],
    },
    {
      id: "topic_context",
      number: 18,
      title: "Context API",
      icon: "🌐",
      blocks: [
        { type: "p", text: "Context מעביר מידע בין קומפוננטות בלי 'prop drilling' דרך כל הדרך." },
        {
          type: "code",
          code:
            "export const AppContext = createContext();\n\n" +
            "<AppContext.Provider value={{ addPost }}>\n" +
            "  <MainScreen />\n" +
            "</AppContext.Provider>\n\n" +
            "// בקומפוננטה:\n" +
            "const { addPost } = useContext(AppContext);",
        },
      ],
    },
    {
      id: "topic_effects",
      number: 19,
      title: "useEffect, useRef, useMemo",
      icon: "🪝",
      blocks: [
        { type: "p", text: "useEffect — פעולות צד (fetch, טיימרים, האזנה ל-DOM, פעולות על mount)." },
        {
          type: "code",
          code:
            "useEffect(() => {\n" +
            "  console.log(\"component loaded\");\n" +
            "}, []);  // [] = רץ פעם אחת",
        },
        { type: "p", text: "❗ אם עושים fetch ישירות בגוף הקומפוננטה — לולאת רינדורים. לכן עוטפים ב-useEffect." },
        { type: "p", text: "useRef — שמירת reference לאלמנט/ערך שלא גורם לרינדור." },
        {
          type: "code",
          code:
            "const inputRef = useRef();\n" +
            "useEffect(() => inputRef.current.focus(), []);",
        },
        { type: "p", text: "useMemo — שומר תוצאת חישוב כבד כדי לא לחשב מחדש בכל רינדור." },
        {
          type: "code",
          code:
            "const total = useMemo(() => \n" +
            "  numbers.reduce((s, n) => s + n, 0)\n" +
            ", [numbers]);",
        },
      ],
    },
    {
      id: "topic_tailwind",
      number: 20,
      title: "Tailwind CSS",
      icon: "🎨",
      blocks: [
        { type: "p", text: "Tailwind היא ספריית עיצוב שמשתמשת ב-utility classes — מהיר, נוח ורספונסיבי." },
        {
          type: "code",
          code: "<div className=\"bg-blue-500 text-white p-4 rounded\">\n  Hello\n</div>",
        },
      ],
    },
    {
      id: "topic_typescript",
      number: 21,
      title: "TypeScript",
      icon: "🅃",
      blocks: [
        { type: "p", text: "TypeScript מוסיף טיפוסים סטטיים ל-JavaScript." },
        {
          type: "code",
          code:
            "let userName: string = \"David\";\n" +
            "let age: number = 25;\n" +
            "let isActive: boolean = true;\n\n" +
            "function sum(a: number, b: number): number {\n" +
            "  return a + b;\n" +
            "}",
        },
        {
          type: "code",
          code:
            "type Book = {\n" +
            "  title: string;\n" +
            "  author: string;\n" +
            "  available: boolean;\n" +
            "};\n\n" +
            "interface BaseUser {\n" +
            "  id: number;\n" +
            "  username: string;\n" +
            "  email: string;\n" +
            "}\n\n" +
            "enum Genre { Fiction, NonFiction, Fantasy }",
        },
      ],
    },
    {
      id: "topic_react_ts",
      number: 22,
      title: "React + TypeScript",
      icon: "⚛️🅃",
      blocks: [
        { type: "p", text: "ב-React עם TypeScript מגדירים טיפוסים ל-props ול-state." },
        {
          type: "code",
          code:
            "type StudentProps = {\n" +
            "  name: string;\n" +
            "  age: number;\n" +
            "};\n\n" +
            "function Student({ name, age }: StudentProps) {\n" +
            "  return <h2>{name} - {age}</h2>;\n" +
            "}",
        },
        {
          type: "code",
          code:
            "type Todo = {\n" +
            "  id: number;\n" +
            "  title: string;\n" +
            "  completed: boolean;\n" +
            "};\n\n" +
            "const [todos, setTodos] = useState<Todo[]>([]);",
        },
      ],
    },
  ],
};
