// data/questions_bank.js
// Hand-crafted question bank — organized by topicId, conceptKey, level, type.
// type: "mc" (multiple choice) or "fill" (free-text code completion)
// level: 1=grandma, 2=child, 3=soldier, 4=student, 5=junior, 6=professor
// Bank grows freely — every question that's added here is automatically picked up
// by the Trainer (when matching a concept) and by the Quick Guide (when matching a topic).
//
// ┌──────────────── Versioning ────────────────────────────────────────────┐
// │ _version       — semver of the question bank schema/contents          │
// │ _lastUpdate    — ISO date string of the most recent bump              │
// │ _changelog     — list of releases (newest last)                       │
// │ Bumped by Track A (Foundation). Track B/C add changelog entries when  │
// │ they fix boilerplate, add concepts, or rewrite ambiguous questions.   │
// │ app.js reads these on load and prompts the user to refresh progress   │
// │ when the version stored in localStorage no longer matches.            │
// └────────────────────────────────────────────────────────────────────────┘
var QUESTIONS_BANK_VERSION = "2.0.0";
var QUESTIONS_BANK_LAST_UPDATE = "2026-04-27";
var QUESTIONS_BANK_CHANGELOG = [
  {
    v: "2.0.0",
    date: "2026-04-27",
    changes:
      "Track A: introduce schema versioning, SRS state on scores, deterministic seeded RNG.",
  },
];
var QUESTIONS_BANK = {
  _version: QUESTIONS_BANK_VERSION,
  _lastUpdate: QUESTIONS_BANK_LAST_UPDATE,
  _changelog: QUESTIONS_BANK_CHANGELOG,
  mc: [
    // ===== Topic 1 — Variables & Data Types =====
    {
      id: "mc_var_001", topicId: "topic_variables", conceptKey: "lesson_11::let", level: 1,
      question: "מה יודפס?\n\nlet x = 5;\nx = 8;\nconsole.log(x);",
      options: ["5", "8", "שגיאה", "undefined"],
      correctIndex: 1,
      explanation: "let מאפשר הצבה מחדש; הערך החדש (8) הוא זה שיודפס.",
    },
    {
      id: "mc_var_002", topicId: "topic_variables", conceptKey: "lesson_11::let", level: 2,
      question: "מה ההבדל העיקרי בין let ל-const?",
      options: [
        "let למספרים ו-const לטקסט",
        "const לא מאפשר הצבה מחדש של ערך",
        "let עובד רק בתוך פונקציות",
        "אין הבדל",
      ],
      correctIndex: 1,
      explanation: "const קושר את המשתנה לערך בודד — אי אפשר להציב לו ערך חדש (אפשר עדיין לשנות תוכן של אובייקט/מערך).",
    },
    {
      id: "mc_var_003", topicId: "topic_variables", conceptKey: "lesson_11::boolean", level: 2,
      question: "מה יודפס?\n\nlet isLoggedIn = false;\nif (isLoggedIn) console.log('Welcome');\nelse console.log('Please login');",
      options: ["Welcome", "Please login", "true", "שגיאה"],
      correctIndex: 1,
      explanation: "isLoggedIn הוא false ולכן ה-else מתבצע.",
    },
    {
      id: "mc_var_004", topicId: "topic_variables", level: 3,
      question: "איזה משפט נכון לגבי var?",
      options: [
        "var הוא הצורה המומלצת ביותר ב-2020+",
        "var הוא בעל function-scope ולא block-scope, לכן פחות מומלץ",
        "var עובד רק עם מספרים",
        "var הוא טיפוס נתונים",
      ],
      correctIndex: 1,
      explanation: "var נכלל ב-scope של פונקציה ולא בלוק — נחשב למיושן. let/const עדיפים.",
    },

    // ===== Topic 2 — Conditionals =====
    {
      id: "mc_if_001", topicId: "topic_conditionals", level: 2,
      question: "מתי משתמשים ב-switch במקום if?",
      options: [
        "כשבודקים תנאים מורכבים עם AND/OR",
        "כשמשווים ערך אחד מול הרבה ערכים קבועים",
        "תמיד עדיף switch",
        "switch תמיד מהיר יותר",
      ],
      correctIndex: 1,
      explanation: "switch מתאים כשיש משתנה אחד שנבדק מול ערכים בדידים — קריא יותר מ-if/else if ארוך.",
    },
    {
      id: "mc_if_002", topicId: "topic_conditionals", level: 3,
      question: "מה ההבדל בין == ל-===?",
      options: [
        "אין הבדל",
        "=== בודק גם טיפוס וגם ערך, == עושה type coercion",
        "== מהיר יותר",
        "=== עובד רק על מספרים",
      ],
      correctIndex: 1,
      explanation: "=== הוא strict equality — לא ממיר טיפוסים. תמיד עדיף.",
    },

    // ===== Topic 3 — Arrays =====
    {
      id: "mc_arr_001", topicId: "topic_arrays", conceptKey: "lesson_11::Array", level: 1,
      question: "מה יודפס?\n\nconst arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr);",
      options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4, 1, 2, 3]", "4"],
      correctIndex: 1,
      explanation: "push מוסיפה לסוף המערך ומשנה את המקור.",
    },
    {
      id: "mc_arr_002", topicId: "topic_arrays", conceptKey: "lesson_11::filter", level: 3,
      question: "מה מחזירה filter?",
      options: [
        "איבר אחד בלבד",
        "מערך חדש עם איברים שעומדים בתנאי",
        "משנה את המערך המקורי תמיד",
        "מחזירה רק מספרים",
      ],
      correctIndex: 1,
      explanation: "filter מחזירה מערך חדש המכיל רק את האיברים שלגביהם הקולבק החזיר true. לא משנה את המקור.",
    },
    {
      id: "mc_arr_003", topicId: "topic_arrays", conceptKey: "lesson_11::map", level: 4,
      question: "מה ההבדל המרכזי בין map ל-forEach?",
      options: [
        "אין הבדל",
        "map מחזיר מערך חדש; forEach רץ ולא מחזיר ערך",
        "forEach מהיר יותר תמיד",
        "map עובד רק עם מספרים",
      ],
      correctIndex: 1,
      explanation: "map בונה מערך חדש מהתוצאות של הקולבק. forEach רק מבצע פעולה לכל איבר ומחזיר undefined.",
    },
    {
      id: "mc_arr_004", topicId: "topic_arrays", conceptKey: "lesson_11::map", level: 3,
      question: "מה התוצאה?\n\nconst nums = [1, 2, 3];\nconst result = nums.map(n => n * 2);\nconsole.log(result);",
      options: ["[1, 2, 3]", "[2, 4, 6]", "6", "[1, 4, 9]"],
      correctIndex: 1,
      explanation: "map יוצר מערך חדש [2, 4, 6] ע\"י הכפלת כל איבר ב-2.",
    },
    {
      id: "mc_arr_005", topicId: "topic_arrays", conceptKey: "lesson_11::reduce", level: 5,
      question: "מה התוצאה?\n\nconst sum = [1, 2, 3, 4].reduce((acc, n) => acc + n, 0);",
      options: ["0", "10", "[1, 2, 3, 4]", "4"],
      correctIndex: 1,
      explanation: "reduce מצמצם את המערך לערך אחד — סכום כל האיברים החל מ-0.",
    },
    {
      id: "mc_arr_006", topicId: "topic_arrays", conceptKey: "lesson_11::spread", level: 4,
      question: "מה יודפס?\n\nconst a = [1, 2];\nconst b = [...a, 3];\nconsole.log(b);",
      options: ["[1, 2]", "[1, 2, 3]", "[[1,2],3]", "שגיאה"],
      correctIndex: 1,
      explanation: "spread (...) פורש את a לתוך b ויוצר מערך חדש [1, 2, 3].",
    },

    // ===== Topic 4 — Functions =====
    {
      id: "mc_fn_001", topicId: "topic_functions", conceptKey: "lesson_11::function", level: 2,
      question: "מה חסר בפונקציה הזאת כדי שתחזיר סכום?\n\nfunction sum(a, b) { a + b; }",
      options: ["console.log", "return", "if", "let"],
      correctIndex: 1,
      explanation: "ללא return הפונקציה מחזירה undefined. צריך לכתוב 'return a + b;'.",
    },
    {
      id: "mc_fn_002", topicId: "topic_functions", conceptKey: "lesson_11::arrow function", level: 3,
      question: "איזו מהבאות היא Arrow Function תקינה שמחזירה x*3?",
      options: [
        "function (x) => x * 3",
        "const triple = (x) => x * 3;",
        "x => return x * 3",
        "arrow triple(x) { x * 3 }",
      ],
      correctIndex: 1,
      explanation: "Arrow function בקיצור — בלי גוף, מחזירה אוטומטית את הביטוי.",
    },

    // ===== Topic 5 — Objects =====
    {
      id: "mc_obj_001", topicId: "topic_objects", conceptKey: "lesson_13::Object", level: 1,
      question: "איך ניגשים לשם של המשתמש?\n\nconst user = { name: 'Dana', age: 22 };",
      options: ["user[0]", "user.name", "name.user", "user->name"],
      correctIndex: 1,
      explanation: "באובייקט ניגשים לפי שם המאפיין: user.name או user['name'].",
    },
    {
      id: "mc_obj_002", topicId: "topic_objects", conceptKey: "lesson_13::Property", level: 2,
      question: "מה יודפס?\n\nconst u = { a: 1 };\nu.a = 5;\nconsole.log(u.a);",
      options: ["1", "5", "undefined", "שגיאה"],
      correctIndex: 1,
      explanation: "אפשר לשנות מאפיינים גם של אובייקט שהוגדר עם const, רק לא להציב לו אובייקט אחר.",
    },

    // ===== Topic 6 — DOM =====
    {
      id: "mc_dom_001", topicId: "topic_dom", conceptKey: "lesson_13::getElementById", level: 2,
      question: "מה עושה הקוד?\n\ndocument.getElementById('title').innerHTML = 'Hello';",
      options: [
        "יוצר אלמנט חדש",
        "מוחק אלמנט",
        "משנה את התוכן של אלמנט עם id בשם title",
        "שומר מידע ב-localStorage",
      ],
      correctIndex: 2,
      explanation: "getElementById מאתר את האלמנט; innerHTML מציב לו תוכן חדש.",
    },
    {
      id: "mc_dom_002", topicId: "topic_dom", conceptKey: "lesson_13::createElement", level: 3,
      question: "מה הסדר הנכון ליצירת ושיוך אלמנט חדש?",
      options: [
        "appendChild → createElement → innerHTML",
        "createElement → innerHTML → appendChild",
        "innerHTML → appendChild → createElement",
        "createElement → appendChild → removeChild",
      ],
      correctIndex: 1,
      explanation: "קודם יוצרים, אז קובעים תוכן, ולבסוף מצרפים ל-DOM.",
    },

    // ===== Topic 7 — Events =====
    {
      id: "mc_evt_001", topicId: "topic_events", level: 1,
      question: "איזה אירוע מתאים ללחיצה על כפתור?",
      options: ["click", "input", "load", "submit"],
      correctIndex: 0,
      explanation: "click הוא האירוע הסטנדרטי ללחיצת עכבר על כל אלמנט.",
    },
    {
      id: "mc_evt_002", topicId: "topic_events", level: 3,
      question: "איזה אירוע מתאים לכל הקלדה בשדה טקסט?",
      options: ["click", "input", "submit", "load"],
      correctIndex: 1,
      explanation: "input נורה כל פעם שערך השדה משתנה — מצוין לחיפוש חי.",
    },

    // ===== Topic 8 — Storage =====
    {
      id: "mc_st_001", topicId: "topic_storage", conceptKey: "lesson_13::localStorage", level: 3,
      question: "למה משתמשים ב-JSON.stringify כששומרים מערך ב-localStorage?",
      options: [
        "כי localStorage שומר רק strings",
        "כי זה מוסיף CSS",
        "כי זה מפעיל React",
        "כי זה מוחק את המערך",
      ],
      correctIndex: 0,
      explanation: "localStorage מאחסן רק מחרוזות. צריך JSON.stringify בכניסה ו-JSON.parse בקריאה.",
    },
    {
      id: "mc_st_002", topicId: "topic_storage", conceptKey: "lesson_13::sessionStorage", level: 4,
      question: "מה ההבדל בין localStorage ל-sessionStorage?",
      options: [
        "אין הבדל",
        "sessionStorage נמחק כשסוגרים את הטאב; localStorage נשאר",
        "localStorage מהיר יותר",
        "sessionStorage שומר רק מספרים",
      ],
      correctIndex: 1,
      explanation: "sessionStorage חי רק לאורך הסשן (סגירת טאב מנקה). localStorage נשמר בין סשנים.",
    },

    // ===== Topic 9 — Errors =====
    {
      id: "mc_err_001", topicId: "topic_errors", conceptKey: "lesson_15::try", level: 2,
      question: "מה התפקיד של try/catch?",
      options: [
        "ליצור קומפוננטה",
        "לטפל בשגיאות בלי לקרוס",
        "להריץ לולאה",
        "לשמור מידע בדפדפן",
      ],
      correctIndex: 1,
      explanation: "try מריץ קוד שיכול להיכשל; catch תופס את השגיאה ומאפשר טיפול ידידותי.",
    },

    // ===== Topic 10 — Async / Promise / Fetch =====
    {
      id: "mc_async_001", topicId: "topic_async", level: 3,
      question: "מה יודפס ראשון?\n\nconsole.log('A');\nsetTimeout(() => console.log('B'), 1000);\nconsole.log('C');",
      options: ["A→B→C", "A→C→B", "B→A→C", "C→A→B"],
      correctIndex: 1,
      explanation: "setTimeout נדחה ל-event loop. הקוד הסינכרוני (A,C) רץ קודם, ואז B.",
    },
    {
      id: "mc_async_002", topicId: "topic_async", level: 4,
      question: "למה משתמשים ב-await?",
      options: [
        "כדי לחכות לתוצאה של פעולה אסינכרונית",
        "כדי ליצור מערך",
        "כדי למחוק state",
        "כדי לעצב כפתור",
      ],
      correctIndex: 0,
      explanation: "await ממתין ל-Promise להיפתר ומחזיר את הערך — אפשר רק בתוך async function.",
    },
    {
      id: "mc_async_003", topicId: "topic_async", level: 5,
      question: "איזו מהבאות נכונה לטיפול בשגיאת fetch ב-async/await?",
      options: [
        "if (fetch.error) ...",
        "try { await fetch(url) } catch (err) { ... }",
        "fetch(url).onerror = ...",
        "אי אפשר לתפוס שגיאות מ-fetch",
      ],
      correctIndex: 1,
      explanation: "ב-async/await תמיד עוטפים ב-try/catch כדי לתפוס דחיות של ה-Promise.",
    },

    // ===== Topic 11 — Node.js =====
    {
      id: "mc_node_001", topicId: "topic_node", level: 2,
      question: "מה Node.js מאפשר לעשות?",
      options: [
        "להריץ JavaScript מחוץ לדפדפן",
        "לעצב HTML",
        "ליצור רק מערכים",
        "להחליף את CSS",
      ],
      correctIndex: 0,
      explanation: "Node.js הוא runtime מבוסס V8 שמריץ JS גם מחוץ לדפדפן — מתאים לשרתים ו-CLI.",
    },
    {
      id: "mc_node_002", topicId: "topic_node", level: 3,
      question: "מה תפקיד package.json?",
      options: [
        "קובץ עם תמונות",
        "קובץ הגדרות פרויקט עם תלויות וסקריפטים",
        "מסד נתונים",
        "קובץ HTML",
      ],
      correctIndex: 1,
      explanation: "package.json מתעד את שם הפרויקט, גרסאות תלויות (dependencies) וסקריפטים שניתן להריץ עם npm.",
    },

    // ===== Topic 12 — Express / HTTP =====
    {
      id: "mc_exp_001", topicId: "topic_express", level: 3,
      question: "ב-Express, איזה method מתאים ליצירת משאב חדש?",
      options: ["GET", "POST", "DELETE", "PATCH"],
      correctIndex: 1,
      explanation: "POST משמש ליצירה. GET לקריאה, PUT/PATCH לעדכון, DELETE למחיקה.",
    },
    {
      id: "mc_exp_002", topicId: "topic_express", level: 4,
      question: "מה תפקיד express.json()?",
      options: [
        "מעצב את הדף",
        "Middleware שמפענח גוף JSON של בקשות",
        "מתחבר ל-MongoDB",
        "יוצר Route חדש",
      ],
      correctIndex: 1,
      explanation: "express.json() מפענח את req.body כשהלקוח שולח Content-Type: application/json.",
    },
    {
      id: "mc_exp_003", topicId: "topic_express", level: 4,
      question: "מה משמעות סטטוס 404?",
      options: [
        "הצלחה",
        "המשאב לא נמצא",
        "שגיאת שרת",
        "אין הרשאה",
      ],
      correctIndex: 1,
      explanation: "404 Not Found — הבקשה תקינה אך המשאב המבוקש לא קיים.",
    },

    // ===== Topic 13 — MongoDB =====
    {
      id: "mc_mongo_001", topicId: "topic_mongo", level: 2,
      question: "ב-MongoDB, מה זה Collection?",
      options: [
        "קובץ CSS",
        "אוסף של Documents (כמו טבלה)",
        "פונקציה בריאקט",
        "Route בשרת",
      ],
      correctIndex: 1,
      explanation: "Collection היא אוסף של documents (אובייקטי JSON-like) בתוך database.",
    },
    {
      id: "mc_mongo_002", topicId: "topic_mongo", level: 4,
      question: "מה תפקיד Mongoose?",
      options: [
        "ספרייה לעיצוב",
        "ODM שמספק Schema/Model מעל MongoDB",
        "framework לבדיקות",
        "שרת HTTP",
      ],
      correctIndex: 1,
      explanation: "Mongoose מאפשר להגדיר schema לטיפוסי הנתונים ולקבל מודלים נוחים עם ולידציה.",
    },

    // ===== Topic 14 — React Basics =====
    {
      id: "mc_react_001", topicId: "topic_react", level: 1,
      question: "מה זה Component?",
      options: [
        "פונקציה/רכיב שמחזיר JSX",
        "בסיס נתונים",
        "משתנה מסוג string",
        "קובץ JSON",
      ],
      correctIndex: 0,
      explanation: "ב-React קומפוננטה היא פונקציה שמחזירה JSX (תיאור UI).",
    },
    {
      id: "mc_react_002", topicId: "topic_react", level: 2,
      question: "מה זה Props?",
      options: [
        "מידע שנשלח מקומפוננטה הורה לילד",
        "מידע שנשמר ב-localStorage",
        "פונקציה של MongoDB",
        "שגיאה בשרת",
      ],
      correctIndex: 0,
      explanation: "Props הוא ה-API של הקומפוננטה — דרך ההורה להעביר מידע לילד.",
    },
    {
      id: "mc_react_003", topicId: "topic_react", level: 3,
      question: "למה ב-JSX כותבים className ולא class?",
      options: [
        "כי class היא מילה שמורה ב-JS",
        "כי React רוצה לבלבל",
        "כי className מהיר יותר",
        "אין הבדל",
      ],
      correctIndex: 0,
      explanation: "class שמורה ב-JS להגדרת מחלקה. JSX מתורגם ל-JS ולכן צריך className.",
    },

    // ===== Topic 15 — useState / Immutable =====
    {
      id: "mc_state_001", topicId: "topic_state", conceptKey: "lesson_22::useState", level: 3,
      question: "למה לא עושים את זה?\n\nstudents.push(newStudent);\nsetStudents(students);",
      options: [
        "כי אסור להשתמש במערכים",
        "כי React משווה מצביעים — צריך עותק חדש כדי לזהות שינוי",
        "כי push עובד רק ב-Node",
        "כי setStudents חייב string",
      ],
      correctIndex: 1,
      explanation: "React משווה reference. שינוי במקום (mutation) משאיר את ה-reference זהה ולכן הקומפוננטה לא מתרנדרת.",
    },
    {
      id: "mc_state_002", topicId: "topic_state", level: 3,
      question: "מה הדרך הנכונה להוסיף איבר למערך ב-state?",
      options: [
        "students.push(s); setStudents(students)",
        "setStudents([...students, s])",
        "students = newStudent",
        "delete students",
      ],
      correctIndex: 1,
      explanation: "spread יוצר מערך חדש עם כל הקיים + החדש — reference שונה → React מרנדר.",
    },

    // ===== Topic 16 — Parent ↔ Child Communication =====
    {
      id: "mc_pc_001", topicId: "topic_parent_child", level: 3,
      question: "איך ילד מעדכן את ההורה?",
      options: [
        "props.parentState = ...",
        "ההורה שולח callback ב-props; הילד מפעיל אותו",
        "useEffect במיוחד",
        "לא ניתן",
      ],
      correctIndex: 1,
      explanation: "Lifting state up: ההורה מחזיק את ה-state ושולח פונקציה לילד שמשנה את ה-state כשנקראת.",
    },

    // ===== Topic 17 — React Router =====
    {
      id: "mc_router_001", topicId: "topic_router", level: 2,
      question: "מה תפקיד <Link to='/about'>?",
      options: [
        "טוען מחדש את הדף",
        "מנווט ללא רענון (SPA)",
        "מבצע fetch",
        "יוצר Route חדש",
      ],
      correctIndex: 1,
      explanation: "Link מבצע ניווט פנים-אפליקציה (history API) בלי לטעון מחדש את כל הדף.",
    },
    {
      id: "mc_router_002", topicId: "topic_router", level: 4,
      question: "מתי משתמשים ב-useParams?",
      options: [
        "לקרוא פרמטר דינמי מתוך URL",
        "לשמור ב-localStorage",
        "לסנן מערך",
        "ליצור enum",
      ],
      correctIndex: 0,
      explanation: "ב-Route עם /user/:userId — useParams() מחזיר { userId: '...' }.",
    },

    // ===== Topic 18 — Context =====
    {
      id: "mc_ctx_001", topicId: "topic_context", level: 4,
      question: "איזו בעיה Context API פותר?",
      options: [
        "העברת props דרך הרבה קומפוננטות ביניים",
        "שגיאות ב-CSS",
        "מחיקת קבצים ב-Node",
        "שמירה ב-MongoDB",
      ],
      correctIndex: 0,
      explanation: "Context מספק ערך גלובלי לעץ קומפוננטות, חוסך 'prop drilling'.",
    },

    // ===== Topic 19 — useEffect / useRef / useMemo =====
    {
      id: "mc_eff_001", topicId: "topic_effects", level: 4,
      question: "מתי נשתמש ב-useEffect?",
      options: [
        "כשצריך לבצע פעולה בזמן טעינה או בעקבות שינוי",
        "כשצריך להגדיר enum",
        "כשצריך ליצור Collection",
        "רק לכתיבת CSS",
      ],
      correctIndex: 0,
      explanation: "useEffect מיועד לתופעות לוואי: fetch, טיימרים, האזנות. רץ אחרי הרינדור.",
    },
    {
      id: "mc_eff_002", topicId: "topic_effects", level: 5,
      question: "למה לא לעשות fetch ישירות בגוף הקומפוננטה?",
      options: [
        "כי תמיד מחזיר undefined",
        "כי זה גורם ללולאת רינדורים אינסופית",
        "כי fetch לא עובד בריאקט",
        "כי אסור להביא מידע מ-API",
      ],
      correctIndex: 1,
      explanation: "fetch בגוף הקומפוננטה רץ בכל רינדור → setState → רינדור → fetch... לולאה. useEffect עם dependency ריק רץ פעם אחת.",
    },
    {
      id: "mc_eff_003", topicId: "topic_effects", level: 5,
      question: "מה עושה useRef?",
      options: [
        "שומר reference לאלמנט/ערך mutable שלא גורם לרינדור",
        "יוצר Route",
        "מוחק state",
        "מחליף MongoDB",
      ],
      correctIndex: 0,
      explanation: "useRef מחזיר אובייקט { current } שאפשר לשנות בלי לגרום לרינדור — מצוין לאלמנטי DOM ולערכים מתמשכים.",
    },
    {
      id: "mc_eff_004", topicId: "topic_effects", level: 6,
      question: "מתי כדאי להשתמש ב-useMemo?",
      options: [
        "תמיד, לכל ערך",
        "כשיש חישוב כבד שלא צריך לחזור על עצמו בכל רינדור",
        "כדי ליצור state",
        "רק עם setTimeout",
      ],
      correctIndex: 1,
      explanation: "useMemo מזכיר תוצאת חישוב יקר; מיותר לערכים פשוטים. תלוי ב-dependency array.",
    },

    // ===== Topic 21 — TypeScript =====
    {
      id: "mc_ts_001", topicId: "topic_typescript", level: 2,
      question: "מה הבעיה כאן?\n\nlet age: number = '25';",
      options: [
        "אין בעיה",
        "'25' הוא string ולא number",
        "אסור להשתמש ב-let",
        "TS לא תומך במספרים",
      ],
      correctIndex: 1,
      explanation: "type annotation דורש number, אבל הוצב string — TS יסרב לקמפל.",
    },
    {
      id: "mc_ts_002", topicId: "topic_typescript", level: 3,
      question: "מה המשמעות של void בפונקציה?",
      options: [
        "מחזירה string",
        "לא מחזירה ערך",
        "מחזירה מערך",
        "היא async",
      ],
      correctIndex: 1,
      explanation: "void מציין שהפונקציה לא מחזירה דבר משמעותי — בדומה לפונקציה ללא return.",
    },
    {
      id: "mc_ts_003", topicId: "topic_typescript", level: 4,
      question: "מה ההבדל בין interface ל-type?",
      options: [
        "אין הבדל בכלל",
        "interface ניתן להרחבה (extends/declaration merging); type מאפשר union/intersection",
        "type מהיר יותר ב-runtime",
        "interface עובד רק עם React",
      ],
      correctIndex: 1,
      explanation: "שניהם מתארים מבנה אובייקט. interface תומך ב-merging, type גמיש יותר עם unions וגנריקה מורכבת.",
    },

    // ===== Topic 22 — React + TypeScript =====
    {
      id: "mc_rt_001", topicId: "topic_react_ts", level: 4,
      question: "איך מגדירים state של מערך משימות {id:number,title:string,completed:boolean}?",
      options: [
        "useState([])",
        "useState<Todo[]>([])",
        "useState<any>(null)",
        "useState({ items: [] })",
      ],
      correctIndex: 1,
      explanation: "useState<Todo[]>([]) קובע במפורש שזה מערך של Todo — הקומפיילר יזהה טעויות.",
    },
    {
      id: "mc_rt_002", topicId: "topic_react_ts", level: 5,
      question: "איך מטפסים פונקציה שמועברת ב-props?\n\ntype Props = { addTodo: ??? }",
      options: [
        "any",
        "(title: string) => void",
        "string => string",
        "Function",
      ],
      correctIndex: 1,
      explanation: "תיאור מפורש: מקבלת string ומחזירה void. עדיף תמיד על any או Function.",
    },

    // ===== Phase 1 expansion — Core JS deeper =====
    // Index, By Reference / By Value, Pointer (lesson 11)
    {
      id: "mc_idx_001", topicId: "topic_arrays", conceptKey: "lesson_11::Index", level: 1,
      question: "מהו האינדקס של האיבר הראשון במערך?",
      options: ["1", "0", "-1", "תלוי באורך"],
      correctIndex: 1,
      explanation: "מערכים ב-JS הם 0-based — האיבר הראשון הוא בסיס 0.",
    },
    {
      id: "mc_idx_002", topicId: "topic_arrays", conceptKey: "lesson_11::Index", level: 4,
      question: "מה יודפס?\n\nconst arr = [10, 20, 30];\nconsole.log(arr[arr.length]);",
      options: ["30", "undefined", "0", "שגיאה"],
      correctIndex: 1,
      explanation: "arr.length = 3, אבל האינדקס המקסימלי הוא 2. arr[3] לא קיים → undefined.",
    },
    {
      id: "mc_byval_001", topicId: "topic_variables", conceptKey: "lesson_11::By Value", level: 4,
      question: "מה יודפס?\n\nlet a = 5;\nlet b = a;\na = 10;\nconsole.log(b);",
      options: ["5", "10", "undefined", "NaN"],
      correctIndex: 0,
      explanation: "ערכים פרימיטיביים מועתקים By Value. שינוי a לא משפיע על b.",
    },
    {
      id: "mc_byref_001", topicId: "topic_objects", conceptKey: "lesson_11::By Reference", level: 5,
      question: "מה יודפס?\n\nconst a = { v: 1 };\nconst b = a;\nb.v = 99;\nconsole.log(a.v);",
      options: ["1", "99", "undefined", "{ v: 1 }"],
      correctIndex: 1,
      explanation: "אובייקטים מועתקים By Reference. b מצביע על אותו אובייקט כמו a.",
    },
    {
      id: "mc_scope_001", topicId: "topic_functions", conceptKey: "lesson_11::scope", level: 4,
      question: "מה יודפס?\n\n{ let x = 1; }\nconsole.log(typeof x);",
      options: ["'number'", "'undefined'", "'1'", "ReferenceError"],
      correctIndex: 1,
      explanation: "let הוא block-scoped — מחוץ לבלוק x לא קיים, ולכן typeof מחזיר 'undefined'.",
    },
    {
      id: "mc_undef_001", topicId: "topic_variables", conceptKey: "lesson_11::undefined", level: 1,
      question: "מתי משתנה ב-JS מקבל את הערך undefined?",
      options: [
        "כשמכריזים עליו בלי לתת לו ערך",
        "כשהוא מכיל מספר 0",
        "כשהוא מכיל מחרוזת ריקה",
        "כשהוא boolean",
      ],
      correctIndex: 0,
      explanation: "בלי הצבה — הערך הוא undefined. זה שונה מ-null שמציין במפורש 'אין ערך'.",
    },

    // Lesson 13 — DOM / Storage / OOP deeper
    {
      id: "mc_qsel_001", topicId: "topic_dom", conceptKey: "lesson_13::querySelector", level: 3,
      question: "מה ההבדל בין querySelector ל-querySelectorAll?",
      options: [
        "אין הבדל",
        "querySelector מחזיר את הראשון; querySelectorAll מחזיר NodeList של כולם",
        "querySelectorAll מחזיר אובייקט",
        "querySelector עובד רק על id",
      ],
      correctIndex: 1,
      explanation: "querySelector מחזיר Element יחיד. querySelectorAll מחזיר NodeList גם אם יש רק אחד או אפס תואמים.",
    },
    {
      id: "mc_inner_001", topicId: "topic_dom", conceptKey: "lesson_13::innerHTML", level: 5,
      question: "למה innerHTML עלול להיות מסוכן עם קלט משתמש?",
      options: [
        "זה תמיד בטוח",
        "Cross-Site Scripting (XSS) — קוד זדוני בקלט יורץ",
        "זה עובד רק עם מספרים",
        "innerHTML מאט את הדפדפן",
      ],
      correctIndex: 1,
      explanation: "innerHTML מפענח HTML. אם משתמש מכניס <script>... זה ירוץ. עדיף textContent לתוכן בטוח.",
    },
    {
      id: "mc_class_001", topicId: "topic_objects", conceptKey: "lesson_13::class", level: 4,
      question: "מהי המטרה של constructor במחלקה?",
      options: [
        "להגדיר את השם של המחלקה",
        "פונקציה מיוחדת שרצה כשיוצרים מופע חדש (new)",
        "להגדיר את הירושה",
        "פונקציה סטטית",
      ],
      correctIndex: 1,
      explanation: "constructor רץ אוטומטית כשעושים `new MyClass(...)` ומאתחל את המופע.",
    },
    {
      id: "mc_extends_001", topicId: "topic_objects", conceptKey: "lesson_13::extends", level: 5,
      question: "מה תפקיד extends?",
      options: [
        "ירושה — מחלקה אחת מורישה תכונות לאחרת",
        "מאריכה את הזיכרון של המחלקה",
        "מוסיפה מתודות חדשות",
        "אין כזה דבר ב-JS",
      ],
      correctIndex: 0,
      explanation: "class Dog extends Animal — Dog מקבלת את כל המתודות של Animal.",
    },

    // Lesson 15 — Errors / Closure
    {
      id: "mc_throw_001", topicId: "topic_errors", level: 4,
      question: "מה קורה אם זורקים שגיאה (throw) בלי try/catch?",
      options: [
        "הקוד ממשיך כרגיל",
        "התוכנית נעצרת ומדפיסה Uncaught Error",
        "השגיאה נעלמת",
        "הדפדפן קורס",
      ],
      correctIndex: 1,
      explanation: "שגיאה לא-מטופלת מפסיקה את ביצוע הסקריפט הנוכחי ונרשמת לקונסול כ-Uncaught.",
    },
    {
      id: "mc_closure_001", topicId: "topic_functions", level: 5,
      question: "מה Closure?",
      options: [
        "פונקציה שיש לה גישה למשתנים מהסקופ שבו נוצרה — גם אחרי שהסקופ הסתיים",
        "פונקציה שלא מקבלת פרמטרים",
        "פונקציה שלא מחזירה ערך",
        "מתודה של Object",
      ],
      correctIndex: 0,
      explanation: "Closure 'זוכר' את הסביבה הלקסיקלית — חיוני ל-private state, partial application, modules.",
    },

    // Lesson 16 — Async deeper
    {
      id: "mc_promise_001", topicId: "topic_async", level: 4,
      question: "מהו Promise?",
      options: [
        "אובייקט שמייצג ערך עתידי — pending / fulfilled / rejected",
        "פונקציה רגילה",
        "מערך של ערכים",
        "מילת מפתח חדשה",
      ],
      correctIndex: 0,
      explanation: "Promise הוא placeholder לתוצאת פעולה אסינכרונית. שלושה מצבים: pending, fulfilled, rejected.",
    },
    {
      id: "mc_then_001", topicId: "topic_async", level: 4,
      question: "מה יעשה .then(handler)?",
      options: [
        "יקרא ל-handler מיד",
        "ירשום handler שייקרא כשה-Promise נפתר בהצלחה",
        "ימחק את ה-Promise",
        "יחזיר string",
      ],
      correctIndex: 1,
      explanation: ".then רושם callback להפעלה כשה-Promise מקבל fulfilled (עם הערך המוחזר).",
    },

    // Lesson 17 — Express / REST deeper
    {
      id: "mc_status_201", topicId: "topic_express", level: 5,
      question: "מה משמעות סטטוס 201?",
      options: [
        "OK רגיל",
        "Created — המשאב נוצר בהצלחה (בדרך כלל בעקבות POST)",
        "שגיאת לקוח",
        "המשאב לא נמצא",
      ],
      correctIndex: 1,
      explanation: "201 Created מציין שהבקשה הצליחה ויצרה משאב חדש — מנהג מקצועי לאחר POST.",
    },
    {
      id: "mc_middleware_001", topicId: "topic_express", level: 5,
      question: "מה תפקיד הפרמטר next ב-middleware?",
      options: [
        "פונקציה שצריך לקרוא לה כדי להעביר ל-middleware הבא",
        "אובייקט הבקשה הבאה",
        "כתובת ה-URL הבאה",
        "אין לו תפקיד",
      ],
      correctIndex: 0,
      explanation: "middleware ב-Express חייב לקרוא ל-next() כדי שה-pipeline ימשיך, אחרת הבקשה תיתקע.",
    },

    // Lesson 22 — useState deeper
    {
      id: "mc_hook_rules_001", topicId: "topic_state", level: 6,
      question: "איזה מהבאים מפר את 'Rules of Hooks'?",
      options: [
        "useState בתוך פונקציית קומפוננטה",
        "useState בתוך if (condition) { useState(0); }",
        "useState בראש הקומפוננטה",
        "כל ה-Hooks באותה רמה",
      ],
      correctIndex: 1,
      explanation: "Hooks חייבים להיקרא באותו סדר בכל רינדור. שימוש בתוך תנאי שובר את האינדקס הפנימי של React.",
    },
    {
      id: "mc_setstate_001", topicId: "topic_state", level: 5,
      question: "מתי כדאי להשתמש בצורה הפונקציונלית של setState?\n\nsetCount(prev => prev + 1)",
      options: [
        "תמיד",
        "כשהערך החדש תלוי בערך הקודם — מבטיח עקביות בעת רינדורים מרובים",
        "רק בקומפוננטות class",
        "כשרוצים לעדכן state אחר",
      ],
      correctIndex: 1,
      explanation: "צורה פונקציונלית מבטיחה שהעדכון יסתמך על ה-state האחרון, גם אם יש batch של עדכונים.",
    },

    // Lesson 24 — Effects deeper
    {
      id: "mc_dep_001", topicId: "topic_effects", level: 5,
      question: "מה ההבדל בין useEffect(fn) ל-useEffect(fn, [])?",
      options: [
        "אין הבדל",
        "ללא מערך תלויות — רץ אחרי כל רינדור; עם [] — רץ רק פעם אחת אחרי mount",
        "[] גורם ללולאה",
        "ללא מערך — לא רץ בכלל",
      ],
      correctIndex: 1,
      explanation: "[] = run once on mount. [a, b] = run when a or b change. (none) = run after every render.",
    },
    {
      id: "mc_cleanup_001", topicId: "topic_effects", level: 6,
      question: "מתי רץ ה-cleanup function שמוחזר מ-useEffect?",
      options: [
        "אף פעם",
        "לפני שה-effect הבא רץ או כשהקומפוננטה מתפרקת (unmount)",
        "מיד אחרי הרינדור",
        "רק ב-class components",
      ],
      correctIndex: 1,
      explanation: "Cleanup חיוני להסרת event listeners, ביטול timers, סגירת WebSockets — נמנע מזליגות זיכרון.",
    },

    // Lesson 25 — Router deeper
    {
      id: "mc_dynamic_001", topicId: "topic_router", level: 4,
      question: 'איך מגדירים נתיב דינמי לפרופיל משתמש?',
      options: [
        '<Route path="/user" />',
        '<Route path="/user/:userId" />',
        '<Route path="user.userId" />',
        '<Route path="/:user" />',
      ],
      correctIndex: 1,
      explanation: ":userId הוא פרמטר דינמי. בקומפוננטה: const { userId } = useParams().",
    },

    // Lesson 26 — Context deeper
    {
      id: "mc_provider_001", topicId: "topic_context", level: 5,
      question: "איזו קומפוננטה צריכה להיות בתוך ה-Provider?",
      options: [
        "רק האחרונה בעץ",
        "כל קומפוננטה שצריכה גישה לערך — כולל הצאצאות שלהן",
        "רק קומפוננטות class",
        "אין צורך בעטיפה",
      ],
      correctIndex: 1,
      explanation: "Provider יוצר Context Boundary — כל הקומפוננטות שבתוכו (ועץ הצאצאים שלהן) יכולות לקרוא ל-useContext.",
    },

    // Lesson 27 — TypeScript deeper
    {
      id: "mc_optional_001", topicId: "topic_typescript", level: 4,
      question: "מה המשמעות של ? בטיפוס?\n\ntype User = { name: string; age?: number; }",
      options: [
        "age חייב להיות מסוג number",
        "age הוא optional — אפשר להשמיט אותו",
        "age יכול להיות string",
        "שגיאת תחביר",
      ],
      correctIndex: 1,
      explanation: "name: string חובה. age?: number — מותר להשמיט. הטיפוס הסופי: number | undefined.",
    },
    {
      id: "mc_union_001", topicId: "topic_typescript", level: 5,
      question: "איך מגדירים טיפוס שיכול להיות string או number?",
      options: [
        "string && number",
        "string | number",
        "string || number",
        "Either<string, number>",
      ],
      correctIndex: 1,
      explanation: "Union Type: type X = string | number. הערך יכול להיות אחד מהשניים.",
    },
    {
      id: "mc_readonly_001", topicId: "topic_typescript", level: 5,
      question: "מה עושה readonly בשדה של אובייקט?",
      options: [
        "השדה אופציונלי",
        "אסור להציב לו ערך חדש אחרי האתחול",
        "השדה לא מופיע ב-runtime",
        "השדה ציבורי",
      ],
      correctIndex: 1,
      explanation: "readonly מונע הצבה מחדש (compile-time). חיוני ל-immutability ב-TS.",
    },
  ],

  fill: [
    // ===== Arrays =====
    {
      id: "fill_arr_001", topicId: "topic_arrays", conceptKey: "lesson_11::map", level: 3,
      code: "const nums = [1, 2, 3];\nconst doubled = nums.____(n => n * 2);\nconsole.log(doubled); // [2, 4, 6]",
      answer: "map",
      hint: "מתודה שיוצרת מערך חדש מטרנספורמציה.",
      explanation: "map מחזיר מערך חדש עם תוצאת הפונקציה לכל איבר.",
    },
    {
      id: "fill_arr_002", topicId: "topic_arrays", conceptKey: "lesson_11::filter", level: 3,
      code: "const nums = [1, 2, 3, 4];\nconst even = nums.____(n => n % 2 === 0);\n// [2, 4]",
      answer: "filter",
      hint: "מתודה שמסננת איברים לפי תנאי boolean.",
      explanation: "filter מחזיר מערך חדש עם איברים שהקולבק החזיר עליהם true.",
    },
    {
      id: "fill_arr_003", topicId: "topic_arrays", conceptKey: "lesson_11::reduce", level: 5,
      code: "const sum = [1, 2, 3, 4].____((acc, n) => acc + n, 0); // 10",
      answer: "reduce",
      hint: "מצמצמת מערך לערך אחד.",
      explanation: "reduce מקבלת accumulator וערך התחלתי, ובונה תוצאה צוברת.",
    },
    {
      id: "fill_arr_004", topicId: "topic_arrays", conceptKey: "lesson_11::find", level: 4,
      code: "const users = [{id:1, name:'A'}, {id:2, name:'B'}];\nconst u = users.____(u => u.id === 2);\nconsole.log(u.name); // 'B'",
      answer: "find",
      hint: "מחזירה את האיבר הראשון שעומד בתנאי.",
      explanation: "find מחזיר את האיבר הראשון או undefined.",
    },
    {
      id: "fill_arr_005", topicId: "topic_arrays", conceptKey: "lesson_11::push", level: 1,
      code: "const arr = [1, 2];\narr.____(3);\nconsole.log(arr); // [1, 2, 3]",
      answer: "push",
      hint: "מוסיפה איבר לסוף המערך.",
      explanation: "push משנה את המערך במקום ומחזירה את האורך החדש.",
    },

    // ===== Functions =====
    {
      id: "fill_fn_001", topicId: "topic_functions", level: 2,
      code: "function greet(name) {\n  ____ 'Hello ' + name;\n}",
      answer: "return",
      hint: "מילת המפתח שמחזירה ערך מהפונקציה.",
      explanation: "ללא return הפונקציה מחזירה undefined.",
    },

    // ===== DOM =====
    {
      id: "fill_dom_001", topicId: "topic_dom", conceptKey: "lesson_13::getElementById", level: 2,
      code: "const el = document.____('title');\nel.innerHTML = 'Hello';",
      answer: "getElementById",
      hint: "פונקציה לאיתור אלמנט לפי id.",
      explanation: "getElementById מחזיר את האלמנט עם ה-id המבוקש או null.",
    },
    {
      id: "fill_dom_002", topicId: "topic_dom", conceptKey: "lesson_13::querySelector", level: 4,
      code: "const item = document.____('.task.active');",
      answer: "querySelector",
      hint: "פונקציה שמקבלת CSS selector ומחזירה את הראשון שתואם.",
      explanation: "querySelector מחזיר את ההתאמה הראשונה. querySelectorAll מחזיר את כולן.",
    },

    // ===== Storage =====
    {
      id: "fill_st_001", topicId: "topic_storage", conceptKey: "lesson_13::localStorage", level: 3,
      code: "const tasks = [{id:1}];\nlocalStorage.setItem('tasks', JSON.____(tasks));",
      answer: "stringify",
      hint: "ממיר אובייקט/מערך למחרוזת JSON.",
      explanation: "localStorage שומר רק מחרוזות; חייבים stringify לפני שמירה ו-parse בקריאה.",
    },
    {
      id: "fill_st_002", topicId: "topic_storage", level: 3,
      code: "const raw = localStorage.getItem('tasks');\nconst tasks = JSON.____(raw);",
      answer: "parse",
      hint: "ממיר מחרוזת JSON חזרה לערך JS.",
      explanation: "JSON.parse הופך מחרוזת חוקית לאובייקט/מערך. שגיאה אם המחרוזת לא תקינה.",
    },

    // ===== Errors =====
    {
      id: "fill_err_001", topicId: "topic_errors", conceptKey: "lesson_15::try", level: 3,
      code: "____ {\n  riskyCall();\n} catch (err) {\n  console.error(err.message);\n}",
      answer: "try",
      hint: "מילת מפתח שפותחת בלוק שעלול לזרוק שגיאה.",
      explanation: "try/catch — try מנסה, catch תופס. ניתן להוסיף finally שתמיד רץ.",
    },

    // ===== Async =====
    {
      id: "fill_async_001", topicId: "topic_async", level: 4,
      code: "async function getUsers() {\n  const res = ____ fetch('/api/users');\n  return res.json();\n}",
      answer: "await",
      hint: "מילת מפתח שמחכה ל-Promise בתוך async function.",
      explanation: "await ממתין לפענוח של Promise ומחזיר את הערך.",
    },
    {
      id: "fill_async_002", topicId: "topic_async", level: 5,
      code: "____ function loadData() {\n  const r = await fetch('/x');\n  return r.json();\n}",
      answer: "async",
      hint: "מילת מפתח שמסמנת פונקציה כאסינכרונית.",
      explanation: "async הופך את הפונקציה למחזירת Promise ומאפשר await בתוכה.",
    },

    // ===== Express =====
    {
      id: "fill_exp_001", topicId: "topic_express", level: 3,
      code: "app.____('/api/users', (req, res) => {\n  res.json(users);\n});",
      answer: "get",
      hint: "method בקריאה לקבלת מידע מהשרת.",
      explanation: "app.get מגדיר Route עבור בקשות GET.",
    },
    {
      id: "fill_exp_002", topicId: "topic_express", level: 4,
      code: "app.use(express.____());\n// מאפשר לקרוא req.body כ-JSON",
      answer: "json",
      hint: "Middleware שמפענח גוף בקשת JSON.",
      explanation: "express.json() מוסיף parsing אוטומטי של גוף JSON ל-req.body.",
    },

    // ===== React Basics =====
    {
      id: "fill_react_001", topicId: "topic_react", level: 2,
      code: "function Header(____) {\n  return <h1>{props.title}</h1>;\n}",
      answer: "props",
      hint: "האובייקט שמכיל את כל ה-props שהועברו לקומפוננטה.",
      explanation: "פונקציית קומפוננטה מקבלת props כפרמטר יחיד.",
    },

    // ===== Hooks =====
    {
      id: "fill_hook_001", topicId: "topic_state", conceptKey: "lesson_22::useState", level: 3,
      code: "import { useState } from 'react';\nconst [count, setCount] = ____(0);",
      answer: "useState",
      hint: "Hook שמחזיר [value, setter].",
      explanation: "useState יוצר state בקומפוננטה פונקציונלית; setter מחליף את הערך.",
    },
    {
      id: "fill_hook_002", topicId: "topic_effects", level: 4,
      code: "import { useEffect } from 'react';\n____(() => {\n  console.log('mounted');\n}, []);",
      answer: "useEffect",
      hint: "Hook לפעולות צד (fetch, טיימרים).",
      explanation: "מערך תלויות ריק [] — רץ פעם אחת אחרי הרינדור הראשון.",
    },
    {
      id: "fill_hook_003", topicId: "topic_effects", level: 5,
      code: "const inputRef = ____();\nuseEffect(() => inputRef.current.focus(), []);",
      answer: "useRef",
      hint: "Hook שמחזיר אובייקט {current} שלא גורם לרינדור.",
      explanation: "useRef נהדר ל-DOM refs ולערכים שצריך לשמור בין רינדורים בלי לרנדר.",
    },

    // ===== Router =====
    {
      id: "fill_router_001", topicId: "topic_router", level: 3,
      code: "import { ____, Routes, Route } from 'react-router-dom';\n<BrowserRouter>...</BrowserRouter>",
      answer: "BrowserRouter",
      hint: "הקומפוננטה העוטפת שמפעילה את ניהול ההיסטוריה.",
      explanation: "BrowserRouter משתמש ב-History API. עוטפים בה את כל האפליקציה.",
    },
    {
      id: "fill_router_002", topicId: "topic_router", level: 4,
      code: "import { useNavigate } from 'react-router-dom';\nconst navigate = useNavigate();\nnavigate(____);",
      answer: "'/home'",
      hint: "מחרוזת — הנתיב היעד.",
      explanation: "navigate('/home') מנווט פרוגרמטית ללא Link.",
    },

    // ===== TypeScript =====
    {
      id: "fill_ts_001", topicId: "topic_typescript", level: 3,
      code: "function sum(a: number, b: number): ____ {\n  return a + b;\n}",
      answer: "number",
      hint: "טיפוס ההחזרה — שניהם מספרים, גם הסכום.",
      explanation: "ב-TS אפשר/כדאי לציין את טיפוס ההחזרה במפורש.",
    },
    {
      id: "fill_ts_002", topicId: "topic_typescript", level: 4,
      code: "____ Book = {\n  title: string;\n  available: boolean;\n};",
      answer: "type",
      hint: "מילת מפתח להגדרת alias של טיפוס.",
      explanation: "type Book = {...} יוצר alias. interface Book {...} חלופה דומה.",
    },

    // ===== Phase 1 expansion — additional fill questions =====
    {
      id: "fill_arr_006", topicId: "topic_arrays", conceptKey: "lesson_11::pop", level: 1,
      code: "const arr = [1, 2, 3];\nconst last = arr.____();\nconsole.log(last); // 3\nconsole.log(arr); // [1, 2]",
      answer: "pop",
      hint: "מסירה ומחזירה את האיבר האחרון.",
      explanation: "pop משנה את המערך במקום ומחזירה את האיבר שהוסר.",
    },
    {
      id: "fill_arr_007", topicId: "topic_arrays", conceptKey: "lesson_11::shift", level: 2,
      code: "const arr = [1, 2, 3];\nconst first = arr.____();\nconsole.log(first); // 1",
      answer: "shift",
      hint: "מסירה ומחזירה את האיבר הראשון.",
      explanation: "shift מסיר את [0]. unshift מוסיף ל-[0].",
    },
    {
      id: "fill_arr_008", topicId: "topic_arrays", conceptKey: "lesson_11::sort", level: 4,
      code: "const nums = [3, 1, 4, 1, 5];\nnums.____((a, b) => a - b);\nconsole.log(nums); // [1, 1, 3, 4, 5]",
      answer: "sort",
      hint: "ממיינת את המערך במקום עם פונקציית השוואה.",
      explanation: "ללא comparator — sort ממיינת לפי מחרוזות. עם (a,b)=>a-b — מיון מספרי עולה.",
    },
    {
      id: "fill_arr_009", topicId: "topic_arrays", level: 4,
      code: "const total = [10, 20, 30].reduce((sum, n) => sum + n, ____);\nconsole.log(total); // 60",
      answer: "0",
      hint: "ערך התחלתי לסכום.",
      explanation: "הפרמטר השני של reduce הוא הערך ההתחלתי של ה-accumulator.",
    },

    // ===== Objects / OOP =====
    {
      id: "fill_obj_001", topicId: "topic_objects", conceptKey: "lesson_13::class", level: 4,
      code: "class Person {\n  ____(name) {\n    this.name = name;\n  }\n}",
      answer: "constructor",
      hint: "המתודה המיוחדת שרצה ב-new.",
      explanation: "constructor מאתחל מאפיינים על this — הוא רץ אוטומטית כשמשתמשים ב-new.",
    },
    {
      id: "fill_obj_002", topicId: "topic_objects", conceptKey: "lesson_13::extends", level: 5,
      code: "class Dog ____ Animal {\n  bark() { return 'woof'; }\n}",
      answer: "extends",
      hint: "מילת מפתח לירושה.",
      explanation: "Dog יורשת את כל המתודות והשדות של Animal.",
    },
    {
      id: "fill_obj_003", topicId: "topic_objects", level: 4,
      code: "const user = { name: 'Tal' };\nuser.age = 25;\nconsole.log(Object.____(user));\n// ['name', 'age']",
      answer: "keys",
      hint: "מתודת Object שמחזירה מערך של שמות המאפיינים.",
      explanation: "Object.keys / Object.values / Object.entries — שלושת הכלים העיקריים לעבור על אובייקט.",
    },

    // ===== DOM extra =====
    {
      id: "fill_dom_003", topicId: "topic_dom", conceptKey: "lesson_13::createElement", level: 3,
      code: "const li = document.____('li');\nli.textContent = 'New task';\nlist.appendChild(li);",
      answer: "createElement",
      hint: "יוצר אלמנט HTML חדש בזיכרון.",
      explanation: "createElement מחזיר Element חדש שלא מחובר ל-DOM. צריך לקרוא ל-appendChild להוסיף.",
    },
    {
      id: "fill_dom_004", topicId: "topic_events", level: 3,
      code: "btn.____('click', () => {\n  console.log('clicked');\n});",
      answer: "addEventListener",
      hint: "מתודה שמוסיפה האזנה לאירוע.",
      explanation: "addEventListener(type, handler) — מאפשר מספר handlers על אותו אלמנט, בניגוד ל-onclick.",
    },

    // ===== Async =====
    {
      id: "fill_async_003", topicId: "topic_async", level: 4,
      code: "fetch('/api')\n  .then(res => res.____())\n  .then(data => console.log(data));",
      answer: "json",
      hint: "מתודה שמפענחת את גוף התגובה כ-JSON.",
      explanation: "res.json() מחזיר Promise שמתפענח לאובייקט/מערך JS.",
    },
    {
      id: "fill_async_004", topicId: "topic_async", level: 5,
      code: "const result = await new Promise((resolve, reject) => {\n  setTimeout(() => ____('done'), 1000);\n});",
      answer: "resolve",
      hint: "פונקציה שפותרת את ה-Promise בהצלחה.",
      explanation: "resolve(value) הופך את ה-Promise ל-fulfilled עם הערך. reject משמש לדחייה (כישלון).",
    },

    // ===== Express / Mongo =====
    {
      id: "fill_exp_003", topicId: "topic_express", level: 4,
      code: "app.____('/api/users/:id', (req, res) => {\n  const id = req.params.id;\n  res.json(getUser(id));\n});",
      answer: "get",
      hint: "method ל-Read.",
      explanation: "GET /api/users/:id — קורא משאב לפי id דינמי. req.params מכיל את הפרמטרים.",
    },
    {
      id: "fill_mongo_001", topicId: "topic_mongo", level: 4,
      code: "const user = await User.____({ email: 'a@b.com' });",
      answer: "findOne",
      hint: "מתודת Mongoose לחיפוש מסמך אחד.",
      explanation: "findOne מחזיר את המסמך הראשון שתואם ל-filter, או null.",
    },
    {
      id: "fill_mongo_002", topicId: "topic_mongo", level: 4,
      code: "const ProductSchema = new mongoose.____({\n  name: String,\n  price: Number\n});",
      answer: "Schema",
      hint: "מבנה הנתונים של Mongoose.",
      explanation: "mongoose.Schema מגדיר את צורת המסמך — שדות, טיפוסים, ולידציות.",
    },

    // ===== React =====
    {
      id: "fill_react_002", topicId: "topic_react", level: 3,
      code: "// JSX:\n<div ____='container'>Hello</div>",
      answer: "className",
      hint: "התכונה שמחליפה את class ב-JSX.",
      explanation: "class שמורה ב-JS. ב-JSX משתמשים ב-className שמתורגמת ל-class ב-HTML.",
    },
    {
      id: "fill_state_001", topicId: "topic_state", conceptKey: "lesson_22::useState", level: 4,
      code: "// הוספת איבר למערך ב-state:\nsetItems([____, newItem]);",
      answer: "...items",
      hint: "spread של המערך הקיים.",
      explanation: "spread יוצר מערך חדש עם reference שונה — חיוני כדי ש-React יזהה שינוי.",
    },

    // ===== TypeScript =====
    {
      id: "fill_ts_003", topicId: "topic_typescript", level: 4,
      code: "____ Role = 'admin' | 'guest';\nconst r: Role = 'admin';",
      answer: "type",
      hint: "מילת מפתח ל-alias של union.",
      explanation: "type Role = 'admin' | 'guest' — string literal union. רק שני הערכים האלה מותרים.",
    },
    {
      id: "fill_ts_004", topicId: "topic_typescript", level: 5,
      code: "interface Greeter {\n  greet(name: string): ____;\n}",
      answer: "string",
      hint: "טיפוס ההחזרה — פונקציית greet מחזירה ברכה.",
      explanation: "greet מחזירה string (לדוגמה 'Hello, ' + name). ה-interface מחייב את החתימה.",
    },
  ],
};
