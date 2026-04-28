// data/pair_match.js — W8 Pair-Match games
// 14 games × 6–8 pairs. Drag-and-drop concept matching.

var PAIR_MATCH_GAMES = [
  {
    id: "pm_01",
    title: "React Hooks",
    lesson: "lesson_22",
    pairs: [
      { term: "useState", definition: "שומר מצב בקומפוננטה ומעדכן ב-render" },
      { term: "useEffect", definition: "מריץ קוד לאחר כל render / עם תלויות" },
      { term: "useRef", definition: "שומר ערך בין renders ללא re-render" },
      { term: "useMemo", definition: "שומר תוצאת חישוב כבד במטמון" },
      {
        term: "useCallback",
        definition: "שומר פונקציה במטמון — מונע יצירה מחדש",
      },
      {
        term: "useContext",
        definition: "קורא ערך מ-Context ללא prop drilling",
      },
      {
        term: "useReducer",
        definition: "מנהל state מורכב עם action/reducer pattern",
      },
      {
        term: "useLayoutEffect",
        definition: "כמו useEffect אבל רץ לפני ציור המסך",
      },
    ],
  },
  {
    id: "pm_02",
    title: "Array Methods",
    lesson: "lesson_12",
    pairs: [
      { term: "map()", definition: "מחיל פונקציה ומחזיר מערך חדש באותו גודל" },
      { term: "filter()", definition: "מחזיר מערך עם הפריטים שעמדו בתנאי" },
      { term: "reduce()", definition: "מצמצם מערך לערך יחיד עם צבר" },
      {
        term: "forEach()",
        definition: "עובר על פריטים — side effects בלבד, לא מחזיר",
      },
      { term: "find()", definition: "מחזיר את הפריט הראשון שעמד בתנאי" },
      { term: "some()", definition: "מחזיר true אם לפחות פריט אחד עמד בתנאי" },
      { term: "every()", definition: "מחזיר true רק אם כל הפריטים עמדו בתנאי" },
      { term: "flat()", definition: "מוריד שכבת מערך פנימי לרמה שטוחה יותר" },
    ],
  },
  {
    id: "pm_03",
    title: "React Component Lifecycle",
    lesson: "lesson_21",
    pairs: [
      { term: "mount", definition: "הקומפוננטה נוספה ל-DOM בפעם הראשונה" },
      { term: "render", definition: "React מחשב מחדש מה להציג על המסך" },
      { term: "update", definition: "state או props השתנו → render חוזר" },
      { term: "unmount", definition: "הקומפוננטה הוסרה מה-DOM לחלוטין" },
      {
        term: "cleanup",
        definition: "ה-return של useEffect — מנקה subscriptions",
      },
      {
        term: "reconciliation",
        definition: "React ממשיל Virtual DOM לDOM האמיתי",
      },
      {
        term: "re-render",
        definition: "עדכון מחדש של UI עקב שינוי state/props",
      },
    ],
  },
  {
    id: "pm_04",
    title: "JavaScript Async",
    lesson: "lesson_15",
    pairs: [
      {
        term: "Promise",
        definition:
          "מייצג פעולה אסינכרונית עתידית — pending/fulfilled/rejected",
      },
      { term: "async", definition: "מגדיר פונקציה שמחזירה Promise תמיד" },
      { term: "await", definition: "מחכה ל-Promise ומחזיר את הערך שלו" },
      {
        term: "try/catch",
        definition: "מנגנון תפיסת שגיאות — גם ב-async code",
      },
      { term: ".then()", definition: "מטפל בהצלחת Promise ומחזיר Promise חדש" },
      { term: ".catch()", definition: "מטפל בכשלון Promise" },
      {
        term: "Promise.all()",
        definition: "מחכה שכל ה-Promises יסתיימו, מחזיר מערך",
      },
    ],
  },
  {
    id: "pm_05",
    title: "REST API Verbs",
    lesson: "lesson_17",
    pairs: [
      { term: "GET", definition: "קרא משאב קיים — ללא side effects" },
      { term: "POST", definition: "צור משאב חדש — שלח נתונים ב-body" },
      { term: "PUT", definition: "עדכן משאב שלם (החלפה מלאה)" },
      { term: "PATCH", definition: "עדכן שדות ספציפיים בלבד (עדכון חלקי)" },
      { term: "DELETE", definition: "מחק משאב קיים" },
      { term: "201", definition: "Created — משאב נוצר בהצלחה" },
      { term: "404", definition: "Not Found — משאב לא נמצא" },
      { term: "500", definition: "Internal Server Error — שגיאה בצד השרת" },
    ],
  },
  {
    id: "pm_06",
    title: "TypeScript Types",
    lesson: "lesson_26",
    pairs: [
      { term: "string", definition: "טיפוס לטקסט: 'hello', \"world\"" },
      { term: "number", definition: "טיפוס למספרים: 42, 3.14" },
      { term: "boolean", definition: "טיפוס להגיון: true / false" },
      { term: "interface", definition: "מגדיר חוזה מבנה לאובייקט" },
      { term: "type", definition: "כינוי לטיפוס — כולל union / intersection" },
      { term: "union (|)", definition: "ערך יכול להיות אחד מכמה טיפוסים" },
      { term: "generic <T>", definition: "פרמטר טיפוס — כמו תבנית גמישה" },
      { term: "readonly", definition: "מונע שינוי של שדה לאחר יצירה" },
    ],
  },
  {
    id: "pm_07",
    title: "JavaScript Foundations",
    lesson: "lesson_11",
    pairs: [
      { term: "Array", definition: "רשימה מסודרת של ערכים — index מתחיל ב-0" },
      { term: "const", definition: "הצהרת משתנה שלא ניתן להשמה מחדש" },
      { term: "let", definition: "הצהרת משתנה שניתן לשנות בתוך block scope" },
      {
        term: "By Value",
        definition: "העתקת primitives — שינוי עותק לא משנה מקור",
      },
      {
        term: "By Reference",
        definition: "משיכה למיקום בזיכרון — שינוי משפיע על המקור",
      },
      { term: "Scope", definition: "הגדרת היכן ניתן לגשת למשתנה" },
      { term: "Arrow =>", definition: "תחביר קצר לפונקציה — ורכש this מההקשר" },
      { term: "undefined", definition: "ערך ברירת מחדל של משתנה שלא אותחל" },
    ],
  },
  {
    id: "pm_08",
    title: "Objects, Classes & DOM",
    lesson: "lesson_13",
    pairs: [
      {
        term: "Object literal",
        definition: "{key: value} — יצירת אובייקט ישיר",
      },
      {
        term: "Class",
        definition: "תבנית ליצירת אובייקטים עם constructor ומתודות",
      },
      {
        term: "constructor()",
        definition: "פונקציה הרצה בעת new — מאתחלת instance",
      },
      { term: "this", definition: "הפניה לאובייקט הנוכחי בתוך מתודה" },
      {
        term: "querySelector()",
        definition: "בחירת אלמנט DOM לפי CSS selector",
      },
      {
        term: "addEventListener()",
        definition: "מאזין לאירוע ומפעיל callback",
      },
      { term: "extends", definition: "ירושה — תת-מחלקה מרחיבה מחלקה קיימת" },
      { term: "innerHTML", definition: "קריאה/כתיבה של HTML פנימי של אלמנט" },
    ],
  },
  {
    id: "pm_09",
    title: "Node.js & npm",
    lesson: "lesson_16",
    pairs: [
      { term: "Node.js", definition: "סביבת ריצה ל-JS מחוץ לדפדפן — מבוסס V8" },
      {
        term: "npm install",
        definition: "הורדת package ושמירתו ב-node_modules",
      },
      {
        term: "package.json",
        definition: "קובץ תיאור הפרויקט עם תלויות ופקודות",
      },
      { term: "require()", definition: "ייבוא module ב-CommonJS (Node.js)" },
      {
        term: "module.exports",
        definition: "ייצוא פונקציונליות מ-module ב-CommonJS",
      },
      {
        term: "process.env",
        definition: "גישה למשתני סביבה (environment variables)",
      },
      { term: "nodemon", definition: "כלי שמריץ שוב את השרת כשהקוד משתנה" },
      {
        term: "event loop",
        definition: "מנגנון שמאפשר לNode לטפל בפעולות async",
      },
    ],
  },
  {
    id: "pm_10",
    title: "Express & Forms",
    lesson: "lesson_18",
    pairs: [
      {
        term: "express()",
        definition: "יצירת אפליקציית Express — entry point",
      },
      { term: "app.listen(3000)", definition: "הפעלת השרת והאזנה לפורט" },
      { term: "req.body", definition: "תוכן body של הבקשה (POST data)" },
      { term: "res.json()", definition: "שליחת תשובה כ-JSON ללקוח" },
      { term: "express.urlencoded()", definition: "פרסור נתונים מטפסי HTML" },
      { term: "app.use()", definition: "הוספת middleware לכל הבקשות" },
      { term: "res.status(400)", definition: "הגדרת קוד HTTP לתשובה" },
      {
        term: "express.static('public')",
        definition: "הגשת קבצים סטטיים (HTML/CSS/JS)",
      },
    ],
  },
  {
    id: "pm_11",
    title: "MongoDB & Mongoose",
    lesson: "lesson_20",
    pairs: [
      { term: "Collection", definition: "קבוצת documents — כמו טבלה ב-SQL" },
      { term: "Document", definition: "רשומה בודדת ב-MongoDB — מבנה JSON" },
      { term: "find({})", definition: "שליפת כל ה-documents מ-collection" },
      { term: "insertOne()", definition: "הוספת document בודד ל-collection" },
      {
        term: "updateOne()",
        definition: "עדכון document ראשון שהתנאי עליו מתקיים",
      },
      {
        term: "deleteOne()",
        definition: "מחיקת document ראשון שהתנאי עליו מתקיים",
      },
      { term: "_id", definition: "מזהה ייחודי שמוסף אוטומטית לכל document" },
      {
        term: "Schema",
        definition: "הגדרת מבנה ו-validations ל-Mongoose model",
      },
    ],
  },
  {
    id: "pm_12",
    title: "React Router & Context",
    lesson: "lesson_23",
    pairs: [
      { term: "<Route>", definition: "מגדיר component שיוצג עבור path מסוים" },
      { term: "<Link>", definition: "ניווט ב-SPA ללא reload של הדף" },
      {
        term: "useNavigate()",
        definition: "ניווט תכנותי (programmatic navigation)",
      },
      { term: "useParams()", definition: "קריאת פרמטרים דינמיים מה-URL" },
      {
        term: "createContext()",
        definition: "יצירת Context object לשיתוף state",
      },
      { term: "<Provider>", definition: "עוטף קומפוננטות ומספק context value" },
      { term: "useContext()", definition: "קריאת ערך context בתוך קומפוננטה" },
      {
        term: "Outlet",
        definition: "מקום בquestion route שמציג nested routes",
      },
    ],
  },
  {
    id: "pm_13",
    title: "Closures & Scope",
    lesson: "lesson_15",
    pairs: [
      { term: "Closure", definition: "פונקציה שזוכרת משתנים מהscopeשנוצרה בו" },
      {
        term: "Lexical Scope",
        definition: "scope נקבע בזמן כתיבת הקוד — לא בריצה",
      },
      { term: "IIFE", definition: "פונקציה שמגדירה ומפעילה את עצמה מיד" },
      { term: "Hoisting", definition: "הזזת הצהרות function/var לראש scope" },
      { term: "TDZ", definition: "Temporal Dead Zone — let/const לפני ההצהרה" },
      {
        term: "Factory Function",
        definition: "פונקציה שמחזירה אובייקט/פונקציה חדשים",
      },
      {
        term: "Currying",
        definition: "המרת f(a,b) לf(a)(b) — partial application",
      },
      {
        term: "Memoization",
        definition: "שמירת תוצאת ריצה לשימוש חוזר — closure based",
      },
    ],
  },
  {
    id: "pm_14",
    title: "HTTP Status Codes",
    lesson: "lesson_17",
    pairs: [
      { term: "200 OK", definition: "הבקשה הצליחה — תשובה רגילה" },
      { term: "201 Created", definition: "משאב חדש נוצר בהצלחה (POST)" },
      { term: "204 No Content", definition: "הצליח — אבל אין תוכן לשלוח" },
      { term: "400 Bad Request", definition: "גוף הבקשה לא תקין או חסר שדות" },
      { term: "401 Unauthorized", definition: "לא מזוהה — נדרש כניסה/token" },
      { term: "403 Forbidden", definition: "מזוהה אבל אין הרשאה לפעולה" },
      { term: "404 Not Found", definition: "המשאב המבוקש לא קיים" },
      { term: "500 Internal Server Error", definition: "שגיאה כללית בצד השרת" },
    ],
  },
];
