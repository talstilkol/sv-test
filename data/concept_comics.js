// data/concept_comics.js — AUDIT-FIX-8 Concept Comic
// Visual storytelling panels for existing course concepts.

var CONCEPT_COMICS = {
  "lesson_22::useState": {
    title: "useState כסיפור של כפתור שזוכר",
    panels: [
      {
        scene: "המסך עולה",
        caption: "React מפעיל את הקומפוננטה בפעם הראשונה ופותח תא זיכרון פנימי ל-count.",
        visual: ["render", "useState(0)", "count = 0"],
        code: "const [count, setCount] = useState(0);",
      },
      {
        scene: "המשתמש לוחץ",
        caption: "הקוד לא משנה count ביד. הוא מבקש מ-React לעדכן את התא דרך setCount.",
        visual: ["click", "setCount(1)", "rerender queued"],
        code: "onClick={() => setCount(count + 1)}",
      },
      {
        scene: "הרינדור הבא",
        caption: "הפונקציה רצה שוב, אבל React מחזיר מהתא את הערך החדש.",
        visual: ["render #2", "slot = 1", "UI: Count 1"],
        code: "return <button>{count}</button>;",
      },
    ],
  },

  "lesson_24::useEffect": {
    title: "useEffect כאיש תחזוקה אחרי הצביעה",
    panels: [
      {
        scene: "קודם בונים UI",
        caption: "React מסיים render ו-commit לפני שהוא נותן לאפקט לעבוד.",
        visual: ["render", "DOM ready", "effect waits"],
        code: "return <Profile user={user} />;",
      },
      {
        scene: "אחרי שהמסך מוכן",
        caption: "האפקט מפעיל פעולה חיצונית: fetch, listener, timer או subscription.",
        visual: ["commit", "useEffect runs", "external work"],
        code: "useEffect(() => { loadUser(); }, [userId]);",
      },
      {
        scene: "לפני סיבוב חדש",
        caption: "אם deps השתנו, cleanup קודם סוגר את העבודה הישנה ואז האפקט החדש מתחיל.",
        visual: ["cleanup old", "deps changed", "effect again"],
        code: "return () => controller.abort();",
      },
    ],
  },

  "lesson_22::immutable": {
    title: "Immutability כסיפור של קבלה חדשה",
    panels: [
      {
        scene: "אותה קבלה",
        caption: "push משנה את אותו מערך. React מקבל אותה הפניה ולא מבין שמשהו השתנה.",
        visual: ["same array", "push", "same reference"],
        code: "todos.push(item);\nsetTodos(todos);",
      },
      {
        scene: "קבלה חדשה",
        caption: "spread יוצר מערך חדש עם הפריטים הישנים והחדש. ההפניה השתנתה.",
        visual: ["copy", "add item", "new reference"],
        code: "setTodos([...todos, item]);",
      },
      {
        scene: "React מזהה שינוי",
        caption: "הפניה חדשה אומרת ל-React: יש מצב חדש, צריך לצייר מחדש.",
        visual: ["Object.is false", "render", "UI updated"],
        code: "Object.is(oldTodos, newTodos) === false",
      },
    ],
  },

  "lesson_21::JSX": {
    title: "JSX כמתורגמן בין HTML ל-JavaScript",
    panels: [
      {
        scene: "כותבים כמו HTML",
        caption: "העיניים רואות markup, אבל זה עדיין JavaScript.",
        visual: ["<h1>", "{name}", "</h1>"],
        code: "<h1>Hello {name}</h1>",
      },
      {
        scene: "הכלי מתרגם",
        caption: "Vite/Babel הופכים JSX לקריאות יצירת אלמנטים ש-React יודע להבין.",
        visual: ["JSX", "transform", "React element"],
        code: "jsx('h1', { children: ['Hello ', name] })",
      },
      {
        scene: "React מצייר",
        caption: "React משווה את עץ האלמנטים ומעדכן רק את מה שהשתנה במסך.",
        visual: ["element tree", "diff", "DOM update"],
        code: "root.render(<App />);",
      },
    ],
  },

  "lesson_23::Router": {
    title: "Router כמנהל תחנות בתוך SPA",
    panels: [
      {
        scene: "URL משתנה",
        caption: "הדפדפן נשאר באותה אפליקציה, אבל ה-path מסמן איזו תחנה להציג.",
        visual: ["/posts", "history", "same app"],
        code: "<Link to=\"/posts\">Posts</Link>",
      },
      {
        scene: "Routes בודק התאמה",
        caption: "React Router מחפש Route שה-path שלו מתאים ל-URL הנוכחי.",
        visual: ["Routes", "match path", "element"],
        code: "<Route path=\"/posts\" element={<Posts />} />",
      },
      {
        scene: "המסך הנכון נטען",
        caption: "רק הקומפוננטה של התחנה מתחלפת. לא צריך reload מלא.",
        visual: ["no reload", "component swap", "state stays"],
        code: "<BrowserRouter><App /></BrowserRouter>",
      },
    ],
  },

  "lesson_11::map": {
    title: "map כמכונת המרה על פס ייצור",
    panels: [
      {
        scene: "רשימה נכנסת",
        caption: "כל פריט עובר באותה פונקציה, בלי לשנות את המערך המקורי.",
        visual: ["[1,2,3]", "callback", "no mutation"],
        code: "const nums = [1, 2, 3];",
      },
      {
        scene: "כל פריט משתנה",
        caption: "callback מחזיר ערך חדש לכל פריט באותו סדר.",
        visual: ["1→2", "2→4", "3→6"],
        code: "nums.map(n => n * 2);",
      },
      {
        scene: "מערך חדש יוצא",
        caption: "התוצאה היא מערך חדש באותו אורך, עם הערכים שהוחזרו.",
        visual: ["new array", "[2,4,6]", "same length"],
        code: "const doubled = nums.map(n => n * 2);",
      },
    ],
  },

  "lesson_15::Promise": {
    title: "Promise כקבלה על עבודה עתידית",
    panels: [
      {
        scene: "הזמנה נפתחת",
        caption: "Promise מתחיל במצב pending: העבודה התחילה, תוצאה עדיין אין.",
        visual: ["pending", "work starts", "no value yet"],
        code: "const p = fetchData();",
      },
      {
        scene: "העבודה מצליחה",
        caption: "resolve מעביר ערך ל-then. הקוד ממשיך כשהתוצאה מוכנה.",
        visual: ["resolve", "then", "value"],
        code: "p.then(data => render(data));",
      },
      {
        scene: "או נכשלת",
        caption: "reject מעביר שגיאה ל-catch כדי שלא תיעלם בשקט.",
        visual: ["reject", "catch", "handle error"],
        code: "p.catch(error => showError(error));",
      },
    ],
  },

  "lesson_17::REST API": {
    title: "REST API כתפריט פעולות על משאב",
    panels: [
      {
        scene: "יש משאב",
        caption: "URL מייצג אוסף או פריט, למשל posts או post יחיד.",
        visual: ["/posts", "/posts/7", "resource"],
        code: "GET /posts",
      },
      {
        scene: "ה-method אומר פעולה",
        caption: "GET קורא, POST יוצר, PUT/PATCH מעדכן, DELETE מוחק.",
        visual: ["GET", "POST", "DELETE"],
        code: "POST /posts",
      },
      {
        scene: "השרת מחזיר תשובה",
        caption: "status code ו-JSON מסבירים אם הפעולה הצליחה ומה הנתונים.",
        visual: ["201", "JSON", "client updates"],
        code: "res.status(201).json(post);",
      },
    ],
  },
};
