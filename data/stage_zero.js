// data/stage_zero.js — AUDIT-FIX-9 Stage-Zero broken-first flow
// Each entry starts from a real beginner failure, then repairs it.

var STAGE_ZERO = {
  "lesson_22::useState": {
    title: "הכפתור לא מתעדכן",
    brokenCode: "function Counter() {\n  let count = 0;\n  return <button onClick={() => count++}>{count}</button>;\n}",
    symptom: "לחיצה משנה את המשתנה בזיכרון של אותה הרצה, אבל המסך נשאר 0.",
    rootCause: "let לא מודיע ל-React שצריך render חדש, וגם מתאפס בכל render.",
    repairSteps: [
      "העבר את הערך ל-useState.",
      "שנה את הערך רק דרך setCount.",
      "תן ל-React לבצע render חדש עם הערך המעודכן.",
    ],
    fixedCode: "function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}",
    checkpoint: "אם כל לחיצה מעלה את המספר על המסך, התיקון נכון.",
  },

  "lesson_24::useEffect": {
    title: "ה-fetch רץ בלי סוף",
    brokenCode: "useEffect(() => {\n  fetchUsers().then(setUsers);\n});",
    symptom: "המסך מרנדר, האפקט רץ, setUsers מרנדר שוב, וה-fetch חוזר שוב ושוב.",
    rootCause: "אין dependency array, לכן האפקט רץ אחרי כל render.",
    repairSteps: [
      "החלט מתי האפקט אמור לרוץ.",
      "אם זה טעינה ראשונית, הוסף deps ריקים.",
      "אם יש פרמטר, הכנס אותו ל-deps.",
    ],
    fixedCode: "useEffect(() => {\n  fetchUsers().then(setUsers);\n}, []);",
    checkpoint: "ברענון המסך רואים קריאת טעינה אחת, לא רצף קריאות.",
  },

  "lesson_22::immutable": {
    title: "הרשימה לא מציגה item חדש",
    brokenCode: "function addTodo(text) {\n  todos.push({ text });\n  setTodos(todos);\n}",
    symptom: "הפריט נכנס למערך, אבל React לא מצייר אותו.",
    rootCause: "push שומר את אותה הפניה למערך. React רואה אותו object ומדלג.",
    repairSteps: [
      "אל תשנה את המערך המקורי.",
      "צור מערך חדש עם spread.",
      "שלח את ההפניה החדשה ל-setTodos.",
    ],
    fixedCode: "function addTodo(text) {\n  setTodos([...todos, { text }]);\n}",
    checkpoint: "React מקבל הפניה חדשה והרשימה מתעדכנת מיד.",
  },

  "lesson_21::JSX": {
    title: "class לא מפעיל CSS ב-JSX",
    brokenCode: "function Card() {\n  return <div class=\"card\">Hello</div>;\n}",
    symptom: "הקוד יכול להזהיר או לא להתנהג כמו שמצפים ב-React.",
    rootCause: "JSX משתמש ב-className כי class היא מילה שמורה ב-JavaScript.",
    repairSteps: [
      "החלף class ב-className.",
      "השאר את שם המחלקה עצמו כמו בקובץ CSS.",
      "בדוק שה-CSS מיובא למסך.",
    ],
    fixedCode: "function Card() {\n  return <div className=\"card\">Hello</div>;\n}",
    checkpoint: "המחלקה מופיעה ב-DOM והעיצוב מופעל.",
  },

  "lesson_23::Router": {
    title: "לחיצה על קישור מרעננת את כל הדף",
    brokenCode: "<a href=\"/posts\">Posts</a>",
    symptom: "האפליקציה נטענת מחדש, state מקומי נעלם והחוויה לא מרגישה SPA.",
    rootCause: "תגית a מפעילה ניווט דפדפן רגיל. ב-React Router צריך Link.",
    repairSteps: [
      "ודא שהאפליקציה עטופה ב-BrowserRouter.",
      "החלף a ב-Link.",
      "העבר את היעד דרך prop בשם to.",
    ],
    fixedCode: "<Link to=\"/posts\">Posts</Link>",
    checkpoint: "ה-URL משתנה בלי reload מלא וה-state נשמר.",
  },

  "lesson_11::map": {
    title: "map לא מחזיר נתונים",
    brokenCode: "const names = users.map(user => {\n  user.name;\n});",
    symptom: "התוצאה היא מערך של undefined.",
    rootCause: "כשמשתמשים בבלוק עם סוגריים מסולסלים, חייבים return מפורש.",
    repairSteps: [
      "או הסר את הסוגריים המסולסלים.",
      "או הוסף return בתוך הבלוק.",
      "בדוק שה-callback מחזיר ערך לכל פריט.",
    ],
    fixedCode: "const names = users.map(user => user.name);",
    checkpoint: "המערך החדש מכיל שמות, לא undefined.",
  },

  "lesson_15::Promise": {
    title: "שגיאות async נעלמות",
    brokenCode: "loadData().then(data => {\n  render(data);\n});",
    symptom: "כש-loadData נכשל, המשתמש לא רואה הודעה וה-console מתמלא בשגיאה לא מטופלת.",
    rootCause: "Promise rejection צריך catch או try/catch עם await.",
    repairSteps: [
      "הוסף catch לשרשרת.",
      "הצג הודעת שגיאה ברורה.",
      "אל תמשיך לצייר UI כאילו יש נתונים.",
    ],
    fixedCode: "loadData()\n  .then(data => render(data))\n  .catch(error => showError(error.message));",
    checkpoint: "כשל בטעינה מוצג במסך ולא נשאר כשגיאה שקטה.",
  },

  "lesson_17::REST API": {
    title: "POST מגיע בלי body",
    brokenCode: "app.post('/posts', (req, res) => {\n  posts.push(req.body);\n  res.json(posts);\n});",
    symptom: "req.body הוא undefined או object ריק.",
    rootCause: "Express לא מפענח JSON בלי middleware מתאים לפני ה-route.",
    repairSteps: [
      "הוסף app.use(express.json()) לפני routes.",
      "ודא שהלקוח שולח Content-Type מתאים.",
      "החזר status שמתאים ליצירה.",
    ],
    fixedCode: "app.use(express.json());\n\napp.post('/posts', (req, res) => {\n  posts.push(req.body);\n  res.status(201).json(req.body);\n});",
    checkpoint: "בקשת POST עם JSON יוצרת פריט ומחזירה 201.",
  },
};
