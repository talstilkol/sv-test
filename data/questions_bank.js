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
var QUESTIONS_BANK_VERSION = "2.1.1";
var QUESTIONS_BANK_LAST_UPDATE = "2026-04-30";
var QUESTIONS_BANK_CHANGELOG = [
  {
    v: "2.0.0",
    date: "2026-04-27",
    changes:
      "Track A: introduce schema versioning, SRS state on scores, deterministic seeded RNG.",
  },
  {
    v: "2.1.0",
    date: "2026-04-30",
    changes:
      "Manual authoring batch for SVCollege release blockers: lesson_25 responsive CSS and ai_development tools.",
  },
  {
    v: "2.1.1",
    date: "2026-04-30",
    changes:
      "Manual QMAN-001 sub-batch: add/delete movie and bg color MC/Fill coverage from lesson_25 source material.",
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
      id: "mc_var_deep_001", topicId: "topic_variables", conceptKey: "lesson_11::let", level: 6,
      question: "מה יודפס?\n\nlet score = 1;\nif (true) {\n  let score = 2;\n}\nconsole.log(score);",
      options: ["1", "2", "undefined", "ReferenceError"],
      correctIndex: 0,
      explanation: "let הוא block scoped. ה-score שבתוך ה-if הוא משתנה נפרד, ולכן מחוץ לבלוק נשאר הערך 1.",
    },
    {
      id: "mc_var_003", topicId: "topic_variables", conceptKey: "lesson_11::boolean", level: 2,
      question: "מה יודפס?\n\nlet isLoggedIn = false;\nif (isLoggedIn) console.log('Welcome');\nelse console.log('Please login');",
      options: ["Welcome", "Please login", "true", "שגיאה"],
      correctIndex: 1,
      explanation: "isLoggedIn הוא false ולכן ה-else מתבצע.",
    },
    {
      id: "mc_var_004", topicId: "topic_variables", conceptKey: "lesson_11::var", level: 3,
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
      id: "mc_if_001", topicId: "topic_conditionals", conceptKey: "lesson_19::switch", level: 2,
      question: "מתי משתמשים ב-switch במקום if?",
      options: [
        "כשבודקים תנאים מורכבים עם AND/OR",
        "כשמשווים ערך אחד מול הרבה ערכים קבועים",
        "כשצריך להריץ לולאת for",
        "כשצריך להמיר string למספר",
      ],
      correctIndex: 1,
      explanation: "switch מתאים כשיש משתנה אחד שנבדק מול ערכים בדידים — קריא יותר מ-if/else if ארוך.",
    },
    {
      id: "mc_if_002", topicId: "topic_conditionals", conceptKey: "lesson_19::if/else", level: 3,
      question: "מה ההבדל בין == ל-===?",
      options: [
        "== בודק טיפוס, === לא בודק",
        "=== בודק גם טיפוס וגם ערך",
        "== מחזיר Promise",
        "=== מיועד רק למערכים",
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
        "מערך חדש עם איברים שעברו תנאי",
        "מספר האיברים שנמחקו",
        "מחזירה רק מספרים",
      ],
      correctIndex: 1,
      explanation: "filter מחזירה מערך חדש המכיל רק את האיברים שלגביהם הקולבק החזיר true. לא משנה את המקור.",
    },
    {
      id: "mc_arr_003", topicId: "topic_arrays", conceptKey: "lesson_11::map", level: 4,
      question: "מה ההבדל המרכזי בין map ל-forEach?",
      options: [
        "map מוחק איברים; forEach מוסיף",
        "map יוצר מערך חדש; forEach רק רץ",
        "forEach מחזיר מערך חדש",
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
      options: ["[1, 2]", "[1, 2, 3]", "a נשאר מערך פנימי", "שגיאה"],
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
      id: "mc_evt_001", topicId: "topic_events", conceptKey: "lesson_19::event", level: 1,
      question: "איזה אירוע מתאים ללחיצה על כפתור?",
      options: ["click", "input", "load", "submit"],
      correctIndex: 0,
      explanation: "click הוא האירוע הסטנדרטי ללחיצת עכבר על כל אלמנט.",
    },
    {
      id: "mc_evt_002", topicId: "topic_events", conceptKey: "lesson_19::event", level: 3,
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
        "שניהם נמחקים בכל refresh",
        "sessionStorage נמחק בסגירת טאב",
        "localStorage עובד רק בשרת",
        "sessionStorage שומר רק number",
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
      id: "mc_async_001", topicId: "topic_async", conceptKey: "lesson_15::setTimeout", level: 3,
      question: "מה יודפס ראשון?\n\nconsole.log('A');\nsetTimeout(() => console.log('B'), 1000);\nconsole.log('C');",
      options: ["A→B→C", "A→C→B", "B→A→C", "C→A→B"],
      correctIndex: 1,
      explanation: "setTimeout נדחה ל-event loop. הקוד הסינכרוני (A,C) רץ קודם, ואז B.",
    },
    {
      id: "mc_async_002", topicId: "topic_async", conceptKey: "lesson_15::Asynchronous", level: 4,
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
      id: "mc_async_003", topicId: "topic_async", conceptKey: "lesson_15::fetch", level: 5,
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
      id: "mc_node_001", topicId: "topic_node", conceptKey: "lesson_16::Node.js", level: 2,
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
      id: "mc_node_002", topicId: "topic_node", conceptKey: "lesson_16::package.json", level: 3,
      question: "מה תפקיד package.json?",
      options: [
        "קובץ עם תמונות",
        "קובץ עם תלויות וסקריפטים",
        "מסד נתונים",
        "קובץ HTML",
      ],
      correctIndex: 1,
      explanation: "package.json מתעד את שם הפרויקט, גרסאות תלויות (dependencies) וסקריפטים שניתן להריץ עם npm.",
    },

    // ===== Topic 12 — Express / HTTP =====
    {
      id: "mc_exp_001", topicId: "topic_express", conceptKey: "lesson_17::POST", level: 3,
      question: "ב-Express, איזה method מתאים ליצירת משאב חדש?",
      options: ["GET", "POST", "DELETE", "PATCH"],
      correctIndex: 1,
      explanation: "POST משמש ליצירה. GET לקריאה, PUT/PATCH לעדכון, DELETE למחיקה.",
    },
    {
      id: "mc_exp_002", topicId: "topic_express", conceptKey: "lesson_17::body-parser", level: 4,
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
      id: "mc_exp_003", topicId: "topic_express", conceptKey: "lesson_17::Status Codes", level: 4,
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
      id: "mc_mongo_001", topicId: "topic_mongo", conceptKey: "lesson_20::Collection", level: 2,
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
      id: "mc_mongo_002", topicId: "topic_mongo", conceptKey: "lesson_20::Mongoose", level: 4,
      question: "מה תפקיד Mongoose?",
      options: [
        "ספרייה לעיצוב",
        "ODM עם Schema ו-Model ל-MongoDB",
        "framework לבדיקות",
        "שרת HTTP",
      ],
      correctIndex: 1,
      explanation: "Mongoose מאפשר להגדיר schema לטיפוסי הנתונים ולקבל מודלים נוחים עם ולידציה.",
    },

    // ===== Topic 14 — React Basics =====
    {
      id: "mc_react_001", topicId: "topic_react", conceptKey: "lesson_21::Component", level: 1,
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
      id: "mc_react_002", topicId: "topic_react", conceptKey: "lesson_21::props", level: 2,
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
      id: "mc_react_003", topicId: "topic_react", conceptKey: "lesson_21::JSX", level: 3,
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
      id: "mc_state_002", topicId: "topic_state", conceptKey: "lesson_22::immutable", level: 3,
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
      id: "mc_pc_001", topicId: "topic_parent_child", conceptKey: "lesson_22::passing function as prop", level: 3,
      question: "איך ילד מעדכן את ההורה?",
      options: [
        "props.parentState = ...",
        "ההורה שולח callback ב-props",
        "הילד משנה state ישירות",
        "לא ניתן",
      ],
      correctIndex: 1,
      explanation: "Lifting state up: ההורה מחזיק את ה-state ושולח פונקציה לילד שמשנה את ה-state כשנקראת.",
    },

    // ===== Topic 17 — React Router =====
    {
      id: "mc_router_001", topicId: "topic_router", conceptKey: "lesson_23::Link", level: 2,
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
      id: "mc_router_002", topicId: "topic_router", conceptKey: "lesson_23::useParams", level: 4,
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
      id: "mc_ctx_001", topicId: "topic_context", conceptKey: "lesson_23::Context API", level: 4,
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
      id: "mc_eff_001", topicId: "topic_effects", conceptKey: "lesson_24::useEffect", level: 4,
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
      id: "mc_eff_002", topicId: "topic_effects", conceptKey: "lesson_24::fetching data", level: 5,
      question: "למה לא לעשות fetch ישירות בגוף הקומפוננטה?",
      options: [
        "כי זה רץ בכל רינדור",
        "כי זה גורם ללולאת רינדורים אינסופית",
        "כי fetch לא עובד בריאקט",
        "כי אסור להביא מידע מ-API",
      ],
      correctIndex: 1,
      explanation: "fetch בגוף הקומפוננטה רץ בכל רינדור → setState → רינדור → fetch... לולאה. useEffect עם dependency ריק רץ פעם אחת.",
    },
    {
      id: "mc_eff_003", topicId: "topic_effects", conceptKey: "lesson_24::useRef", level: 5,
      question: "מה עושה useRef?",
      options: [
        "שומר ref בלי לגרום לרינדור",
        "יוצר Route",
        "מוחק state",
        "מחליף MongoDB",
      ],
      correctIndex: 0,
      explanation: "useRef מחזיר אובייקט { current } שאפשר לשנות בלי לגרום לרינדור — מצוין לאלמנטי DOM ולערכים מתמשכים.",
    },
    {
      id: "mc_eff_004", topicId: "topic_effects", conceptKey: "lesson_24::useMemo", level: 6,
      question: "מתי כדאי להשתמש ב-useMemo?",
      options: [
        "כשצריך state חדש",
        "כשיש חישוב כבד שחוזר ברינדור",
        "כדי ליצור state",
        "רק עם setTimeout",
      ],
      correctIndex: 1,
      explanation: "useMemo מזכיר תוצאת חישוב יקר; מיותר לערכים פשוטים. תלוי ב-dependency array.",
    },

    // ===== Topic 21 — TypeScript =====
    {
      id: "mc_ts_001", topicId: "topic_typescript", conceptKey: "lesson_26::type annotation", level: 2,
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
      id: "mc_ts_002", topicId: "topic_typescript", conceptKey: "lesson_26::void", level: 3,
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
      id: "mc_ts_003", topicId: "topic_typescript", conceptKey: "lesson_26::interface vs type", level: 4,
      question: "מה ההבדל בין interface ל-type?",
      options: [
        "interface הוא רק runtime",
        "interface ניתן להרחבה; type גמיש ל-union",
        "type מהיר יותר ב-runtime",
        "interface עובד רק עם React",
      ],
      correctIndex: 1,
      explanation: "שניהם מתארים מבנה אובייקט. interface תומך ב-merging, type גמיש יותר עם unions וגנריקה מורכבת.",
    },

    // ===== Topic 22 — React + TypeScript =====
    {
      id: "mc_rt_001", topicId: "topic_react_ts", conceptKey: "lesson_26::Typing State", level: 4,
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
      id: "mc_rt_002", topicId: "topic_react_ts", conceptKey: "lesson_26::Function Prop Type", level: 5,
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
        "querySelector מחזיר רק id",
        "querySelector מחזיר ראשון; All מחזיר רשימה",
        "querySelectorAll מוחק אלמנטים",
        "querySelector עובד רק על id",
      ],
      correctIndex: 1,
      explanation: "querySelector מחזיר Element יחיד. querySelectorAll מחזיר NodeList גם אם יש רק אחד או אפס תואמים.",
    },
    {
      id: "mc_inner_001", topicId: "topic_dom", conceptKey: "lesson_13::innerHTML", level: 5,
      question: "למה innerHTML עלול להיות מסוכן עם קלט משתמש?",
      options: [
        "הקלט מפוענח כ-HTML",
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
      id: "mc_throw_001", topicId: "topic_errors", conceptKey: "lesson_15::throw", level: 4,
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
      id: "mc_closure_001", topicId: "topic_functions", conceptKey: "lesson_15::Closure", level: 5,
      question: "מה Closure?",
      options: [
        "פונקציה שזוכרת את הסקופ שבו נוצרה",
        "פונקציה בלי פרמטרים",
        "פונקציה שלא מחזירה ערך",
        "מתודה של Object",
      ],
      correctIndex: 0,
      explanation: "Closure 'זוכר' את הסביבה הלקסיקלית — חיוני ל-private state, partial application, modules.",
    },

    // Lesson 16 — Async deeper
    {
      id: "mc_promise_001", topicId: "topic_async", conceptKey: "lesson_15::Promise", level: 4,
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
      id: "mc_then_001", topicId: "topic_async", conceptKey: "lesson_15::then", level: 4,
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
      id: "mc_status_201", topicId: "topic_express", conceptKey: "lesson_17::Status Codes", level: 5,
      question: "מה משמעות סטטוס 201?",
      options: [
        "OK רגיל",
        "Created — נוצר משאב חדש",
        "שגיאת לקוח",
        "המשאב לא נמצא",
      ],
      correctIndex: 1,
      explanation: "201 Created מציין שהבקשה הצליחה ויצרה משאב חדש — מנהג מקצועי לאחר POST.",
    },
    {
      id: "mc_middleware_001", topicId: "topic_express", conceptKey: "lesson_17::middleware", level: 5,
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
      id: "mc_hook_rules_001", topicId: "topic_state", conceptKey: "lesson_22::Hook", level: 6,
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
      id: "mc_setstate_001", topicId: "topic_state", conceptKey: "lesson_22::setState", level: 5,
      question: "מתי כדאי להשתמש בצורה הפונקציונלית של setState?\n\nsetCount(prev => prev + 1)",
      options: [
        "כשמעדכנים CSS",
        "כשהערך החדש תלוי בערך הקודם",
        "רק בקומפוננטות class",
        "כשרוצים לעדכן state אחר",
      ],
      correctIndex: 1,
      explanation: "צורה פונקציונלית מבטיחה שהעדכון יסתמך על ה-state האחרון, גם אם יש batch של עדכונים.",
    },

    // Lesson 24 — Effects deeper
    {
      id: "mc_dep_001", topicId: "topic_effects", conceptKey: "lesson_24::dependency array", level: 5,
      question: "מה ההבדל בין useEffect(fn) ל-useEffect(fn, [])?",
      options: [
        "שניהם רצים רק ב-mount",
        "בלי deps רץ אחרי כל render; [] פעם אחת",
        "[] מריץ לפני render",
        "ללא מערך — לא רץ בכלל",
      ],
      correctIndex: 1,
      explanation: "[] = run once on mount. [a, b] = run when a or b change. (none) = run after every render.",
    },
    {
      id: "mc_cleanup_001", topicId: "topic_effects", conceptKey: "lesson_24::cleanup", level: 6,
      question: "מתי רץ ה-cleanup function שמוחזר מ-useEffect?",
      options: [
        "אחרי כל console.log",
        "לפני effect הבא או unmount",
        "מיד אחרי הרינדור",
        "רק ב-class components",
      ],
      correctIndex: 1,
      explanation: "Cleanup חיוני להסרת event listeners, ביטול timers, סגירת WebSockets — נמנע מזליגות זיכרון.",
    },

    // Lesson 25 — Router deeper
    {
      id: "mc_dynamic_001", topicId: "topic_router", conceptKey: "lesson_23::dynamic route", level: 4,
      question: 'איך מגדירים נתיב דינמי לפרופיל משתמש?',
      options: [
        '<Route path="/user" />',
        '<Route path="/user/:userId" />',
        'נתיב קבוע: <Route path="/user/userId" />',
        "קריאה ל-useParams('/user') במקום הגדרת Route",
      ],
      correctIndex: 1,
      explanation: ":userId הוא פרמטר דינמי. בקומפוננטה: const { userId } = useParams().",
    },

    // Lesson 26 — Context deeper
    {
      id: "mc_provider_001", topicId: "topic_context", conceptKey: "lesson_23::Provider", level: 5,
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
      id: "mc_optional_001", topicId: "topic_typescript", conceptKey: "lesson_26::optional field", level: 4,
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
      id: "mc_union_001", topicId: "topic_typescript", conceptKey: "lesson_26::union", level: 5,
      question: "איך מגדירים טיפוס שיכול להיות string או number?",
      options: [
        "Intersection: string & number",
        "Union: string | number",
        "string || number — ביטוי לוגי בזמן ריצה",
        "Either<string, number>",
      ],
      correctIndex: 1,
      explanation: "Union Type: type X = string | number. הערך יכול להיות אחד מהשניים.",
    },
    {
      id: "mc_readonly_001", topicId: "topic_typescript", conceptKey: "lesson_26::readonly", level: 5,
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
    {
      id: "mc_html_css_001", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::HTML document", level: 2,
      question: "מה התפקיד של תגית body במסמך HTML?",
      options: [
        "להכיל את התוכן שהמשתמש רואה בדף",
        "להגדיר רק קבצי CSS חיצוניים",
        "לשמור סיסמאות של משתמשים",
        "להחליף את JavaScript",
      ],
      correctIndex: 0,
      explanation: "body מכיל את התוכן המוצג בדף. head מכיל metadata, title וקישורי משאבים.",
    },
    {
      id: "mc_html_css_002", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::semantic HTML", level: 3,
      question: "למה להשתמש ב-nav לתפריט ניווט במקום div רגיל?",
      options: [
        "כי nav גורם לדף להיטען בלי CSS",
        "כי nav נותן משמעות של אזור ניווט לקורא מסך ולדפדפן",
        "כי div אסור בתוך header",
        "כי nav שולח בקשות HTTP",
      ],
      correctIndex: 1,
      explanation: "nav הוא landmark סמנטי. הוא מתאר את תפקיד האזור בלי להוסיף ARIA מיותר.",
    },
    {
      id: "mc_html_css_003", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::HTML form", level: 3,
      question: "מה חייב להיות לשדה input כדי להישלח בצורה ברורה בטופס רגיל?",
      options: [
        "name שמזהה את השדה בשליחה",
        "רקע כחול",
        "class בשם input",
        "display: grid",
      ],
      correctIndex: 0,
      explanation: "name הוא המפתח שנשלח עם הערך. id חשוב לחיבור label, אבל name חשוב לשליחה.",
    },
    {
      id: "mc_html_css_004", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::label", level: 2,
      question: "מה היתרון של label שמחובר ל-input?",
      options: [
        "הוא מונע שימוש ב-CSS",
        "הוא נותן שם נגיש לשדה ומאפשר לחיצה על הטקסט כדי להתמקד בשדה",
        "הוא הופך את השדה למספר",
        "הוא שומר את הערך ב-localStorage",
      ],
      correctIndex: 1,
      explanation: "label מחובר עם for/id. הוא משפר נגישות, שימושיות וניווט טפסים.",
    },
    {
      id: "mc_html_css_005", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::CSS selector", level: 3,
      question: "איזה selector בוחר אלמנט עם class בשם card?",
      options: [
        "tag selector: card",
        "class selector: .card",
        "id selector: #card",
        "attribute selector: [data-card]",
      ],
      correctIndex: 1,
      explanation: "נקודה היא class selector. סולמית היא id selector.",
    },
    {
      id: "mc_html_css_deep_001", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::CSS selector", level: 6,
      question: "איזה selector הכי מדויק לכפתור שמסומן כך: <button id=\"save\" class=\"btn primary\" data-action=\"save\">?",
      options: [
        "button",
        ".primary",
        "[data-action=\"save\"]",
        "#save",
      ],
      correctIndex: 3,
      explanation: "#save הוא id selector ולכן הוא הכי ספציפי מבין האפשרויות. button הוא תגית, .primary הוא class, ו-[data-action=\"save\"] הוא attribute selector.",
    },
    {
      id: "mc_html_css_006", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::cascade and specificity", level: 5,
      question: "אם button, .primary ו-#save מתאימים לאותו כפתור, מי בדרך כלל הכי ספציפי?",
      options: ["button", ".primary", "#save", "כולם שווים"],
      correctIndex: 2,
      explanation: "id selector חזק יותר מ-class ו-tag. אם הכללים מאותו מקור וללא !important, #save ינצח.",
    },
    {
      id: "mc_html_css_deep_002", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::cascade and specificity", level: 6,
      question: "לשני כללי CSS יש אותה specificity. מי ינצח?",
      options: [
        "הכלל שנכתב מאוחר יותר בקובץ",
        "כלל שנמצא בקובץ אחר",
        "הכלל עם שם class קצר יותר",
        "הדפדפן בוחר לפי צבע",
      ],
      correctIndex: 0,
      explanation: "כש-specificity שווה והמקור זהה, cascade בוחר את הכלל המאוחר יותר. לכן סדר הקוד עדיין חשוב.",
    },
    {
      id: "mc_sql_deep_001", topicId: "topic_sql", conceptKey: "lesson_sql_orm::row", level: 6,
      question: "בטבלת users עם עמודות id, email, role — מה היא row?",
      options: [
        "רשומה אחת של משתמש עם ערכים בכל העמודות הרלוונטיות",
        "שם של עמודה בלבד",
        "כל בסיס הנתונים",
        "פקודת SELECT",
      ],
      correctIndex: 0,
      explanation: "row היא רשומה אחת בטבלה. columns מגדירות שדות, row מחזיקה את הערכים של ישות אחת.",
    },
    {
      id: "mc_next_deep_001", topicId: "topic_nextjs", conceptKey: "lesson_nextjs::file-system routing", level: 6,
      question: "איזה קובץ ייצור את הכתובת /dashboard/settings ב-Next.js App Router?",
      options: [
        "app/dashboard/settings/page.jsx",
        "app/dashboard/settings.css",
        "src/settings.json",
        "pages/dashboard/settings.txt",
      ],
      correctIndex: 0,
      explanation: "ב-App Router התיקיות מגדירות URL segments וקובץ page.jsx מגדיר את המסך של ה-route.",
    },
    {
      id: "mc_html_css_007", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::box model", level: 4,
      question: "מה כולל box model של אלמנט?",
      options: [
        "content, padding, border, margin",
        "route, controller, provider",
        "props, state, effect",
        "GET, POST, PUT, DELETE",
      ],
      correctIndex: 0,
      explanation: "כל אלמנט הוא קופסה: התוכן, הרווח הפנימי, הגבול והרווח החיצוני.",
    },
    {
      id: "mc_html_css_deep_003", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::box model", level: 6,
      question: "אם box-sizing הוא border-box ורוחב האלמנט 200px, מה נכלל בתוך ה-200px?",
      options: [
        "content, padding ו-border",
        "רק content",
        "רק margin",
        "רק font-size",
      ],
      correctIndex: 0,
      explanation: "ב-border-box הרוחב שהוגדר כולל content, padding ו-border. margin נשאר מחוץ לרוחב.",
    },
    {
      id: "mc_html_css_008", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::accessibility basics", level: 4,
      question: "מה בדיקה ידנית טובה לנגישות בסיסית?",
      options: [
        "לנווט עם Tab ו-Enter בלבד ולראות שהפוקוס ברור",
        "להריץ npm install",
        "לשנות את צבע הרקע בלבד",
        "למחוק את כל ה-labels",
      ],
      correctIndex: 0,
      explanation: "ניווט מקלדת חושף בעיות focus, כפתורים לא סמנטיים ותפריטים שתלויים בעכבר.",
    },
    {
      id: "mc_tooling_001", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::Git", level: 2,
      question: "מה התפקיד המרכזי של Git בפרויקט קוד?",
      options: [
        "לנהל היסטוריית שינויים ולעזור לחזור לגרסאות קודמות",
        "להחליף את הדפדפן",
        "לכתוב CSS אוטומטית",
        "לשמור סיסמאות משתמשים",
      ],
      correctIndex: 0,
      explanation: "Git מנהל גרסאות: הוא שומר snapshots של הקוד ומאפשר השוואה, חזרה אחורה ועבודה בצוות.",
    },
    {
      id: "mc_tooling_002", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::repository", level: 3,
      question: "מה נכון לגבי repository?",
      options: [
        "תיקיית פרויקט עם היסטוריית Git",
        "זו רק פונקציית JavaScript",
        "זו טבלת SQL בלבד",
        "זו תמונה שנשמרת ב-public",
      ],
      correctIndex: 0,
      explanation: "repository הוא הפרויקט יחד עם הזיכרון של Git. remote הוא עותק/יעד מרוחק כמו GitHub.",
    },
    {
      id: "mc_tooling_003", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::staging area", level: 4,
      question: "למה משתמשים ב-staging area לפני commit?",
      options: [
        "כדי לבחור בדיוק אילו שינויים ייכנסו ל-commit הבא",
        "כדי למחוק את כל הקבצים שלא השתנו",
        "כדי להפעיל React Router",
        "כדי להפוך CSS ל-HTML",
      ],
      correctIndex: 0,
      explanation: "git add מכניס שינויים ל-index. commit לוקח snapshot ממה שנמצא ב-staging area.",
    },
    {
      id: "mc_tooling_deep_001", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::working tree", level: 6,
      question: "git status מציג `M src/App.jsx` ו-`?? notes.md`. מה זה מוכיח על ה-working tree?",
      options: [
        "יש שינוי מקומי בקובץ מוכר וקובץ חדש ש-Git עדיין לא עוקב אחריו",
        "שני הקבצים כבר נכנסו ל-commit האחרון",
        "ה-repository נמחק ואין יותר היסטוריה",
        "הקבצים נמצאים ב-remote בלבד ולא במחשב",
      ],
      correctIndex: 0,
      explanation: "working tree הוא מצב הקבצים עכשיו. M הוא שינוי בקובץ tracked, ו-?? הוא קובץ untracked שעדיין לא נוסף ל-index.",
    },
    {
      id: "mc_tooling_deep_002", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::Git", level: 6,
      question: "למה Git לא נחשב רק 'שמירה של קבצים'?",
      options: [
        "כי הוא שומר snapshots עם היסטוריה, parents, branches והשוואה בין מצבים",
        "כי הוא מריץ את האפליקציה במקום Node.js",
        "כי הוא מחליף database בפרודקשן",
        "כי הוא שומר רק את הקובץ האחרון בלי היסטוריה",
      ],
      correctIndex: 0,
      explanation: "Git בונה גרף היסטוריה של commits. זה מאפשר branching, merge, diff, revert ועבודת צוות מדויקת.",
    },
    {
      id: "mc_tooling_deep_003", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::repository", level: 6,
      question: "מה ההבדל המדויק בין repository מקומי לבין remote repository?",
      options: [
        "מקומי אצלך; remote הוא עותק מרוחק",
        "מקומי הוא DB; remote הוא component",
        "מקומי מכיל רק תמונות ו-remote מכיל רק קוד",
        "אין הבדל; Git לא יודע לעבוד עם יותר ממיקום אחד",
      ],
      correctIndex: 0,
      explanation: "repository מקומי הוא סביבת העבודה והיסטוריית Git במחשב. remote כמו GitHub הוא יעד שיתוף וסנכרון.",
    },
    {
      id: "mc_tooling_deep_004", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::staging area", level: 6,
      question: "שינית שני קבצים, אבל רק אחד קשור לבאג שאתה מתקן. מה הפעולה הנכונה לפני commit?",
      options: [
        "להכניס ל-staging רק את הקובץ הרלוונטי",
        "לעשות commit לכל השינויים יחד",
        "למחוק את הקובץ השני כדי שלא יופיע ב-status",
        "לעבור branch בלי לבדוק status",
      ],
      correctIndex: 0,
      explanation: "staging area מאפשרת לבחור מה ייכנס ל-commit. כך לא מערבבים תיקון באג עם שינוי לא קשור.",
    },
    {
      id: "mc_tooling_004", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::commit", level: 3,
      question: "מה מאפיין commit טוב?",
      options: [
        "שינוי קטן וממוקד עם הודעה שמסבירה כוונה",
        "כל שינוי אפשרי בפרויקט בבת אחת",
        "שם הודעה קבוע: update",
        "קובץ node_modules בתוך ה-commit",
      ],
      correctIndex: 0,
      explanation: "commit טוב קטן וברור. כך קל לעשות review, להבין היסטוריה ולחזור אחורה אם צריך.",
    },
    {
      id: "mc_tooling_deep_005", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::commit", level: 6,
      question: "איזה commit הכי נכון לפני PR שמתקן באג קטן בטופס התחברות?",
      options: [
        "commit אחד ממוקד: fix login form validation",
        "commit ענק עם bug fix, עיצוב, refactor ושינוי DB לא קשור",
        "commit בלי הודעה כדי לחסוך זמן",
        "commit שמכיל גם node_modules",
      ],
      correctIndex: 0,
      explanation: "commit טוב הוא קטן, ממוקד ומתאר שינוי אחד. זה מקל על review, rollback והבנת ההיסטוריה.",
    },
    {
      id: "mc_tooling_005", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::branch", level: 4,
      question: "מה היתרון של branch בעבודת צוות?",
      options: [
        "אפשר לפתח שינוי מבודד בלי לפגוע ב-main",
        "הוא הופך JavaScript ל-TypeScript",
        "הוא מוחק את הצורך בטסטים",
        "הוא משנה אוטומטית את צבע האתר",
      ],
      correctIndex: 0,
      explanation: "branch מבודד את העבודה. אחר כך מחברים דרך PR, review ו-CI.",
    },
    {
      id: "mc_tooling_006", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::pull request", level: 4,
      question: "מה Pull Request מאפשר?",
      options: [
        "להציג diff, להריץ CI ולקבל review לפני merge",
        "לפתוח שרת Express בלי קוד",
        "לכתוב סיסמאות לתוך Git",
        "להחליף את npm install",
      ],
      correctIndex: 0,
      explanation: "PR הוא שער איכות: רואים מה השתנה, דנים, מריצים checks ורק אז ממזגים.",
    },
    {
      id: "mc_tooling_007", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::GitHub workflow", level: 5,
      question: "איזה רצף עבודה הכי בריא לפני merge?",
      options: [
        "branch -> code -> test/build -> commit -> push -> PR -> review -> merge",
        "delete -> main -> guess -> merge",
        "format -> no review -> force push to main",
        "npm install -> screenshot -> skip CI",
      ],
      correctIndex: 0,
      explanation: "workflow בריא שומר על main יציב ומכניס אוטומציה וביקורת לפני merge.",
    },
    {
      id: "mc_tooling_008", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::npm scripts", level: 3,
      question: "איפה מגדירים פקודות כמו npm run dev ו-npm test?",
      options: ["package.json", "index.html", "style.css", ".gitignore"],
      correctIndex: 0,
      explanation: "ב-package.json מגדירים scripts. npm run <name> מפעיל את הפקודה הקבועה.",
    },
    {
      id: "mc_tooling_009", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::ESLint", level: 5,
      question: "מה ההבדל הבסיסי בין ESLint ל-Prettier?",
      options: [
        "ESLint בודק חוקים ובעיות קוד; Prettier מסדר formatting",
        "ESLint מעצב CSS; Prettier שומר ב-GitHub",
        "שניהם עושים רק npm install",
        "Prettier מריץ שרת ו-ESLint יוצר database",
      ],
      correctIndex: 0,
      explanation: "ESLint מזהה בעיות לפי rules. Prettier אחראי לעיצוב עקבי של הקוד.",
    },
    {
      id: "mc_tooling_deep_006", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::ESLint", level: 6,
      question: "איזה מקרה ESLint אמור לתפוס טוב יותר מ-Prettier?",
      options: [
        "משתנה שהוגדר ולא נעשה בו שימוש",
        "רווחים לא אחידים בין מילים",
        "שבירת שורה ארוכה",
        "סדר מרכאות אחיד",
      ],
      correctIndex: 0,
      explanation: "ESLint בודק rules סמנטיים וסטטיים כמו no-unused-vars. Prettier מטפל בעיקר בעיצוב טקסטואלי.",
    },

    // ===== SVCollege Release Blocker — Lesson 25 Responsive CSS =====
    {
      id: "mc_l25_tailwind_001", topicId: "topic_css", conceptKey: "lesson_25::Tailwind CSS", level: 3,
      question: "מה Tailwind CSS משנה בדרך שבה כותבים עיצוב בקומפוננטת React?",
      options: [
        "כותבים utility classes בתוך className במקום ליצור class CSS נפרד לכל רכיב",
        "כותבים את כל העיצוב בתוך style object בלבד",
        "מחליפים את JSX ב-HTML רגיל",
        "מריצים CSS רק בצד השרת",
      ],
      correctIndex: 0,
      explanation: "Tailwind הוא utility-first: מרכיבים עיצוב דרך classes כמו px-4, bg-blue-500 ו-text-white בתוך className.",
    },
    {
      id: "mc_l25_tailwind_002", topicId: "topic_css", conceptKey: "lesson_25::Tailwind CSS", level: 5,
      question: "איזה className מתאים לכפתור Tailwind כחול עם טקסט לבן, padding ופינות מעוגלות?",
      options: [
        "className='px-4 py-2 bg-blue-500 text-white rounded-lg'",
        "className='button-primary'",
        "style='padding:4; color:white'",
        "className='grid-cols-3 flex-row api-route'",
      ],
      correctIndex: 0,
      explanation: "הצירוף px-4 py-2 bg-blue-500 text-white rounded-lg בונה את העיצוב מתוך utilities אמיתיים.",
    },
    {
      id: "mc_l25_tailwind_003", topicId: "topic_css", conceptKey: "lesson_25::Tailwind CSS", level: 6,
      question: "למה Tailwind יכול להשאיר CSS סופי קטן יחסית ב-build?",
      options: [
        "כי JIT/build מכניס בעיקר utilities שנעשה בהם שימוש בפועל",
        "כי הוא מוחק את כל ה-CSS בזמן runtime",
        "כי כל className נשמר ב-localStorage",
        "כי הוא מחייב להשתמש רק בצבע אחד",
      ],
      correctIndex: 0,
      explanation: "Tailwind מייצר/משאיר את ה-utilities שבשימוש, ולכן לא גוררים קובץ CSS ידני גדול ומלא classes מתים.",
    },
    {
      id: "mc_l25_utility_001", topicId: "topic_css", conceptKey: "lesson_25::utility classes", level: 3,
      question: "מהי utility class?",
      options: [
        "class קטנה שמייצגת פעולה עיצובית ממוקדת, למשל p-4 או text-lg",
        "class שמכילה את כל עיצוב האתר",
        "פונקציית JavaScript שמחזירה Promise",
        "שם קובץ CSS שנוצר אוטומטית לכל קומפוננטה",
      ],
      correctIndex: 0,
      explanation: "utility class עושה דבר אחד או קבוצה קטנה מאוד, ואז מרכיבים כמה utilities יחד ב-className.",
    },
    {
      id: "mc_l25_utility_002", topicId: "topic_css", conceptKey: "lesson_25::utility classes", level: 4,
      question: "איזה זוג utilities מתאים ל-padding פנימי ורקע אפור בהיר?",
      options: [
        "p-6 bg-gray-100",
        "useState useEffect",
        "GET POST",
        "schema migration",
      ],
      correctIndex: 0,
      explanation: "p-6 שולט ב-padding ו-bg-gray-100 ברקע. אלה classes עיצוביות אטומיות.",
    },
    {
      id: "mc_l25_utility_003", topicId: "topic_css", conceptKey: "lesson_25::utility classes", level: 6,
      question: "מה היתרון המרכזי של utility classes מול CSS class גדולה כמו .card?",
      options: [
        "פחות מאבקי specificity וקל להרכיב עיצוב צפוי מתוך tokens קיימים",
        "אין צורך להבין layout",
        "הן הופכות כל div לשרת Express",
        "הן שומרות state של React",
      ],
      correctIndex: 0,
      explanation: "utility-first מפחית CSS מת, מגביל לערכי design system ומונע הרבה התנגשויות specificity.",
    },
    {
      id: "mc_l25_responsive_001", topicId: "topic_css", conceptKey: "lesson_25::responsive design", level: 3,
      question: "מה המשמעות של mobile-first ב-Tailwind?",
      options: [
        "classes בלי prefix חלים קודם על mobile, ו-md:/lg: מוסיפים שינוי למסכים גדולים יותר",
        "כל class עם md: חל רק בטלפונים",
        "צריך לכתוב CSS נפרד לכל מכשיר",
        "האתר נטען רק אם יש מסך קטן",
      ],
      correctIndex: 0,
      explanation: "ב-Tailwind ה-class הבסיסי הוא לכל המסכים, וה-prefixes כמו md: הם min-width שמרחיבים התנהגות במסכים גדולים.",
    },
    {
      id: "mc_l25_responsive_002", topicId: "topic_css", conceptKey: "lesson_25::responsive design", level: 5,
      question: "איזה className יוצר עמודה במובייל ושורה מ-md ומעלה?",
      options: [
        "flex flex-col md:flex-row",
        "flex-row md:flex-col",
        "grid-cols-3 md:hidden",
        "responsive=true",
      ],
      correctIndex: 0,
      explanation: "flex-col הוא ברירת המחדל למובייל, ו-md:flex-row משנה לשורה מ-breakpoint בינוני ומעלה.",
    },
    {
      id: "mc_l25_responsive_003", topicId: "topic_css", conceptKey: "lesson_25::responsive design", level: 6,
      question: "מה נכון לגבי breakpoints כמו md: ו-lg: ב-Tailwind?",
      options: [
        "הם min-width מצטברים: md חל מ-768px ומעלה, lg מ-1024px ומעלה",
        "הם max-width ולכן md חל רק מתחת ל-768px",
        "הם מפעילים JavaScript בזמן resize",
        "הם משנים את מסד הנתונים לפי רוחב המסך",
      ],
      correctIndex: 0,
      explanation: "Tailwind משתמש בגישת mobile-first עם media queries מסוג min-width, ולכן השינויים מצטברים למסכים גדולים יותר.",
    },
    {
      id: "mc_l25_grid_001", topicId: "topic_css", conceptKey: "lesson_25::grid", level: 3,
      question: "מתי Grid מתאים יותר מ-Flex?",
      options: [
        "כשצריך פריסה דו-ממדית של שורות ועמודות, למשל גלריית כרטיסים",
        "כשצריך לקרוא API",
        "כשצריך לשמור session",
        "כשיש רק טקסט אחד בתוך כפתור",
      ],
      correctIndex: 0,
      explanation: "CSS Grid מיועד לפריסה דו-ממדית. Flex טוב יותר לציר אחד: שורה או עמודה.",
    },
    {
      id: "mc_l25_grid_002", topicId: "topic_css", conceptKey: "lesson_25::grid", level: 4,
      question: "מה עושה className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'?",
      options: [
        "יוצר רשת עם עמודה אחת במובייל, שתיים ב-md ושלוש ב-lg",
        "יוצר שלושה שרתי Node",
        "מסתיר את כל הכרטיסים במובייל",
        "מחליף את כל הכרטיסים ב-flex row",
      ],
      correctIndex: 0,
      explanation: "grid מפעיל Grid, grid-cols-* קובע עמודות לכל breakpoint, ו-gap-4 מוסיף רווח בין התאים.",
    },
    {
      id: "mc_l25_grid_003", topicId: "topic_css", conceptKey: "lesson_25::grid", level: 6,
      question: "איזו טעות נפוצה ב-Grid תגרום לכרטיסים לא להסתדר בעמודות?",
      options: [
        "לכתוב grid-cols-3 בלי להוסיף גם grid על ה-parent",
        "להוסיף gap-4",
        "להשתמש ב-div לילדים",
        "לכתוב md:grid-cols-2",
      ],
      correctIndex: 0,
      explanation: "grid-cols-* מגדיר מספר עמודות, אבל בלי display: grid על ה-parent הוא לא מפעיל Grid.",
    },
    {
      id: "mc_l25_flex_001", topicId: "topic_css", conceptKey: "lesson_25::flex", level: 3,
      question: "מה עושה display flex על parent?",
      options: [
        "מסדר את הילדים לאורך ציר אחד שנשלט על ידי flex-row או flex-col",
        "יוצר מסד נתונים זמני",
        "מוחק את כל ה-padding",
        "מריץ useEffect אחרי render",
      ],
      correctIndex: 0,
      explanation: "Flexbox הוא layout חד-ממדי: שורה או עמודה, עם שליטה ב-main axis וב-cross axis.",
    },
    {
      id: "mc_l25_flex_002", topicId: "topic_css", conceptKey: "lesson_25::flex", level: 4,
      question: "איזה className מתאים ל-navbar עם לוגו בקצה אחד וקישורים בקצה השני?",
      options: [
        "flex items-center justify-between",
        "grid grid-cols-12",
        "hidden md:block",
        "p-4 rounded-lg",
      ],
      correctIndex: 0,
      explanation: "flex יוצר שורה, items-center ממרכז בציר המשני, ו-justify-between מפזר את הילדים לקצוות.",
    },
    {
      id: "mc_l25_flex_003", topicId: "topic_css", conceptKey: "lesson_25::flex", level: 6,
      question: "ב-flex-col, מה משתנה בהבנת items-center ו-justify-center?",
      options: [
        "ה-main axis הופך לאנכי, ולכן justify שולט באנכי ו-items באופקי",
        "שניהם מפסיקים לעבוד",
        "items-center שולט רק בגובה גם כשה-direction משתנה",
        "justify-center הופך ל-grid-template-columns",
      ],
      correctIndex: 0,
      explanation: "ב-flex-col הצירים מתחלפים: main axis הוא אנכי, cross axis הוא אופקי.",
    },
    {
      id: "mc_l25_add_delete_001", topicId: "topic_css", conceptKey: "lesson_25::add/delete movie", level: 3,
      question: "בפרויקט סרטים ב-React, איזו פעולה מוסיפה סרט ל-state בצורה immutable?",
      options: [
        "setMovies(prev => [...prev, newMovie])",
        "movies.push(newMovie); setMovies(movies)",
        "setMovies(prev => prev.filter(m => m.id !== newMovie.id))",
        "delete movies[newMovie.id]",
      ],
      correctIndex: 0,
      explanation: "הוספה immutable יוצרת מערך חדש עם spread. push משנה את אותו מערך ולכן עלול לא לגרום ל-render צפוי.",
    },
    {
      id: "mc_l25_add_delete_002", topicId: "topic_css", conceptKey: "lesson_25::add/delete movie", level: 5,
      question: "איך מוחקים סרט לפי id בלי לשנות את מערך הסרטים המקורי?",
      options: [
        "setMovies(prev => prev.filter(movie => movie.id !== idToDelete))",
        "movies.splice(idToDelete, 1); setMovies(movies)",
        "setMovies(prev => prev.map(movie => movie.id))",
        "setMovies([]) בכל מחיקה",
      ],
      correctIndex: 0,
      explanation: "filter מחזירה מערך חדש שמכיל רק את הסרטים שלא נמחקו. כך נשמרת immutability וה-render נשאר צפוי.",
    },
    {
      id: "mc_l25_add_delete_003", topicId: "topic_css", conceptKey: "lesson_25::add/delete movie", level: 6,
      question: "מה הבעיה המרכזית בקוד הבא?\n\nmovies.push(newMovie);\nsetMovies(movies);",
      options: [
        "React מקבל את אותה הפניית מערך, ולכן עלול לדלג על re-render",
        "push מחזיר מערך חדש ולכן אין בעיית הפניה",
        "React משכפל את המערך עמוקות לפני ההשוואה",
        "newMovie חייב להגיע מ-localStorage",
      ],
      correctIndex: 0,
      explanation: "push משנה את המערך במקום. React מסתמך על הפניות חדשות כדי לזהות שינוי state בצורה אמינה.",
    },
    {
      id: "mc_l25_bg_color_001", topicId: "topic_css", conceptKey: "lesson_25::bg color", level: 3,
      question: "איזה class של Tailwind מגדיר רקע כחול בעוצמה בינונית?",
      options: [
        "bg-blue-500",
        "text-blue-500",
        "border-blue-500",
        "blue-bg-500",
      ],
      correctIndex: 0,
      explanation: "הסינטקס של צבע רקע ב-Tailwind הוא bg-{color}-{shade}; לכן bg-blue-500 מגדיר רקע כחול בעוצמה 500.",
    },
    {
      id: "mc_l25_bg_color_002", topicId: "topic_css", conceptKey: "lesson_25::bg color", level: 5,
      question: "איזה className יוצר כפתור עם רקע אינדיגו שמתכהה במעבר עכבר?",
      options: [
        "bg-indigo-600 hover:bg-indigo-700 text-white",
        "bg-indigo-600 hover:text-indigo-700 text-white",
        "text-indigo-600 hover:bg-indigo-700 bg-white",
        "border-indigo-600 hover:border-indigo-700 text-white",
      ],
      correctIndex: 0,
      explanation: "bg-indigo-600 קובע את צבע הרקע הבסיסי, ו-hover:bg-indigo-700 משנה את צבע הרקע במצב hover.",
    },
    {
      id: "mc_l25_bg_color_003", topicId: "topic_css", conceptKey: "lesson_25::bg color", level: 6,
      question: "מה חייבים לבדוק כשבוחרים bg color לרכיב קריא?",
      options: [
        "ניגוד מול צבע הטקסט וגם מצב hover או dark mode אם קיימים",
        "רק שהמספר אחרי הצבע יהיה גדול ככל האפשר",
        "שהצבע יופיע גם בשם קובץ ה-component",
        "שכל הילדים ברכיב יקבלו אותו route",
      ],
      correctIndex: 0,
      explanation: "בחירת רקע אינה רק שם צבע; צריך לוודא contrast מול הטקסט ולבדוק states כמו hover או dark:bg כדי שהרכיב יישאר קריא.",
    },

    // ===== SVCollege Release Blocker — AI Development Tools =====
    {
      id: "mc_ai_dev_cursor_001", topicId: "topic_ai_development", conceptKey: "ai_development::Cursor", level: 3,
      question: "מתי נכון להשתמש ב-Cursor Cmd+K?",
      options: [
        "כשיודעים איזה שינוי קטן רוצים לערוך במקום בקובץ הנוכחי",
        "כשצריך למחוק את כל ה-repo",
        "כשצריך להחליף את Git",
        "כשצריך לפרוס production בלי בדיקות",
      ],
      correctIndex: 0,
      explanation: "Cmd+K מתאים לעריכה מקומית וממוקדת. למשימות רב-קבציות משתמשים בצ'אט/Composer וקוראים diff.",
    },
    {
      id: "mc_ai_dev_cursor_002", topicId: "topic_ai_development", conceptKey: "ai_development::Cursor", level: 5,
      question: "מה התפקיד של קובץ .cursorrules בפרויקט?",
      options: [
        "לתת ל-Cursor כללי פרויקט קבועים כמו stack, איסורי תלויות וסגנון בדיקות",
        "להחליף את package.json",
        "לשמור סיסמאות API",
        "להריץ build אוטומטי בכל keypress",
      ],
      correctIndex: 0,
      explanation: ".cursorrules מכוון את הפלט לקונבנציות של הפרויקט. הוא לא מקום לסודות ולא מחליף בדיקות.",
    },
    {
      id: "mc_ai_dev_cursor_003", topicId: "topic_ai_development", conceptKey: "ai_development::Cursor", level: 6,
      question: "מה הסיכון המקצועי בקבלת הצעת Cursor בלי לקרוא diff?",
      options: [
        "ה-AI יכול להכניס שינוי לא קשור, שבירת contract או תלות חדשה בלי שהבנת",
        "הקוד הופך למהיר יותר רק בגלל שה-AI כתב אותו",
        "הדפדפן מפסיק להציג HTML בגלל כל הצעת autocomplete",
        "Git מפסיק לשמור היסטוריה",
      ],
      correctIndex: 0,
      explanation: "Cursor הוא כלי עזר, לא מקור אמת. כל diff חייב review, בדיקות והרצה לפני merge.",
    },
    {
      id: "mc_ai_dev_windsurf_001", topicId: "topic_ai_development", conceptKey: "ai_development::Windsurf", level: 3,
      question: "מה מאפיין את Windsurf Cascade?",
      options: [
        "סוכן IDE שמבצע plan, קורא קבצים, מציע diff, מריץ כלים ומעדכן לפי התוצאות",
        "ספריית CSS ל-grid בלבד",
        "מסד נתונים וקטורי",
        "פקודת git אחת שמחליפה review",
      ],
      correctIndex: 0,
      explanation: "Cascade עובד בלולאת agent: תכנון, tool calls, תצפית ותכנון מחדש עם אישור אנושי בגבולות כתיבה.",
    },
    {
      id: "mc_ai_dev_windsurf_002", topicId: "topic_ai_development", conceptKey: "ai_development::Windsurf", level: 5,
      question: "איזו משימה מתאימה יותר ל-Windsurf מאשר להשלמת שורה בודדת?",
      options: [
        "שינוי חוזר בכמה קבצים ואז הרצת בדיקות",
        "בחירת צבע לכפתור אחד בלבד",
        "בדיקת ערך של משתנה אחד ב-console",
        "כתיבת טקסט סטטי ב-H1",
      ],
      correctIndex: 0,
      explanation: "Windsurf חזק במשימות ארוכות עם קריאת קבצים, עריכות מרובות והרצת commands.",
    },
    {
      id: "mc_ai_dev_windsurf_003", topicId: "topic_ai_development", conceptKey: "ai_development::Windsurf", level: 6,
      question: "למה חשוב לעצור ולאשר גבולות כתיבה ב-agent כמו Windsurf?",
      options: [
        "כי סוכן יכול לערוך קבצים רבים, ולכן צריך לשלוט scope ולבדוק diff לפני שינוי",
        "כי בלי אישור הוא לא יודע עברית",
        "כי כל tool call הוא בהכרח שגוי",
        "כי אסור להריץ בדיקות בתוך IDE",
      ],
      correctIndex: 0,
      explanation: "האוטונומיה של הסוכן מועילה רק כשה-scope ברור ויש human-in-the-loop לפני עריכות מסוכנות.",
    },
    {
      id: "mc_ai_dev_prompt_001", topicId: "topic_ai_development", conceptKey: "ai_development::Prompt Engineering", level: 3,
      question: "מה חסר ב-prompt חלש כמו 'תתקן את זה'?",
      options: [
        "מטרה, context, מגבלות וקריטריון קבלה שאפשר לבדוק",
        "ניסוח רגשי יותר בלי לציין קובץ, מגבלה או בדיקה",
        "בחירת צבע Tailwind בלי קשר לבאג או לדרישת המשימה",
        "מזהה מספרי שרירותי שאינו מוסיף הקשר או קריטריון קבלה",
      ],
      correctIndex: 0,
      explanation: "Prompt טוב מצמצם ניחוש: מה המטרה, באיזה קוד, אילו מגבלות ומה נחשב פתרון שעבר.",
    },
    {
      id: "mc_ai_dev_prompt_002", topicId: "topic_ai_development", conceptKey: "ai_development::Prompt Engineering", level: 5,
      question: "איזה prompt הכי מתאים לבקשת refactor בטוחה?",
      options: [
        "שנה רק את src/auth.js, אל תוסיף תלויות, שמור API קיים, והריץ npm test",
        "שפר את כל הפרויקט בלי לציין קובץ, בדיקה או contract",
        "כתוב קוד יפה בלי להגדיר התנהגות צפויה או בדיקה",
        "תן לסוכן לבחור scope בלי reviewer ובלי גבולות תלות",
      ],
      correctIndex: 0,
      explanation: "האפשרות הראשונה מגדירה scope, גבולות, contract ושער בדיקה. זה מצמצם drift.",
    },
    {
      id: "mc_ai_dev_prompt_003", topicId: "topic_ai_development", conceptKey: "ai_development::Prompt Engineering", level: 6,
      question: "למה כדאי לכלול דוגמאות נגדיות או constraints ב-prompt?",
      options: [
        "כדי למנוע מהמודל לבחור פתרון שנשמע נכון אבל מפר כלל חשוב בפרויקט",
        "כדי להאריך את התשובה בלי סיבה",
        "כדי לגרום למודל לדלג על בדיקות",
        "כדי להחליף manual review",
      ],
      correctIndex: 0,
      explanation: "constraints ודוגמאות נגדיות מבהירים מה אסור, לא רק מה רצוי. זה קריטי בעבודה על repo אמיתי.",
    },
    {
      id: "mc_ai_dev_review_001", topicId: "topic_ai_development", conceptKey: "ai_development::AI Code Review", level: 3,
      question: "מה AI Code Review צריך לבדוק מעבר ל-'הקוד נראה יפה'?",
      options: [
        "לוגיקה, אבטחה, contract, בדיקות, edge cases ושינוי לא קשור",
        "רק מספר השורות בקובץ",
        "רק צבעי Tailwind",
        "רק אם יש emoji בתגובה",
      ],
      correctIndex: 0,
      explanation: "Review איכותי מחפש סיכון התנהגותי, לא רק סגנון. AI יכול לסייע, אבל האדם מאשר.",
    },
    {
      id: "mc_ai_dev_review_002", topicId: "topic_ai_development", conceptKey: "ai_development::AI Code Review", level: 5,
      question: "איזו הוראה ל-AI reviewer הכי שימושית לפני merge?",
      options: [
        "בדוק את diff מול הדרישה, מצא רגרסיות והצע בדיקות חסרות בלי לערוך קבצים",
        "כתוב מחדש את כל הקוד בלי לשאול",
        "אשר כל שינוי אם הבדיקות ירוקות",
        "התעלם מקבצי tests",
      ],
      correctIndex: 0,
      explanation: "Review צריך להיות ממוקד diff ודרישה. לעיתים מבקשים מה-AI רק הערות, לא עריכה.",
    },
    {
      id: "mc_ai_dev_review_003", topicId: "topic_ai_development", conceptKey: "ai_development::AI Code Review", level: 6,
      question: "למה AI review לא מחליף owner אנושי של הקוד?",
      options: [
        "כי המודל לא אחראי ל-production, לא מכיר את כל ההקשר העסקי ועלול לפספס regressions",
        "כי הוא לא מסוגל לקרוא diff",
        "כי הוא עובד רק על formatting ולא קורא בדיקות",
        "כי review אנושי אסור בפרויקטים מודרניים",
      ],
      correctIndex: 0,
      explanation: "AI review הוא שכבת עזר. בעל הקוד עדיין אחראי להבין, לבדוק ולאשר את השינוי.",
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
      id: "fill_fn_001", topicId: "topic_functions", conceptKey: "lesson_11::function", level: 2,
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
      id: "fill_st_002", topicId: "topic_storage", conceptKey: "lesson_13::getItem", level: 3,
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
      id: "fill_async_001", topicId: "topic_async", conceptKey: "lesson_15::Asynchronous", level: 4,
      code: "async function getUsers() {\n  const res = ____ fetch('/api/users');\n  return res.json();\n}",
      answer: "await",
      hint: "מילת מפתח שמחכה ל-Promise בתוך async function.",
      explanation: "await ממתין לפענוח של Promise ומחזיר את הערך.",
    },
    {
      id: "fill_async_002", topicId: "topic_async", conceptKey: "lesson_15::Asynchronous", level: 5,
      code: "____ function loadData() {\n  const r = await fetch('/x');\n  return r.json();\n}",
      answer: "async",
      hint: "מילת מפתח שמסמנת פונקציה כאסינכרונית.",
      explanation: "async הופך את הפונקציה למחזירת Promise ומאפשר await בתוכה.",
    },

    // ===== Express =====
    {
      id: "fill_exp_001", topicId: "topic_express", conceptKey: "lesson_17::app.get", level: 3,
      code: "app.____('/api/users', (req, res) => {\n  res.json(users);\n});",
      answer: "get",
      hint: "method בקריאה לקבלת מידע מהשרת.",
      explanation: "app.get מגדיר Route עבור בקשות GET.",
    },
    {
      id: "fill_exp_002", topicId: "topic_express", conceptKey: "lesson_17::body-parser", level: 4,
      code: "app.use(express.____());\n// מאפשר לקרוא req.body כאובייקט",
      answer: "json",
      hint: "Middleware שמפענח גוף בקשת JSON.",
      explanation: "express.json() מוסיף parsing אוטומטי של גוף JSON ל-req.body.",
    },

    // ===== React Basics =====
    {
      id: "fill_react_001", topicId: "topic_react", conceptKey: "lesson_21::props", level: 2,
      code: "function Header(____) {\n  return <h1>Welcome</h1>;\n}",
      answer: "props",
      hint: "האובייקט שמכיל את כל הפרמטרים שהועברו לקומפוננטה.",
      explanation: "פונקציית קומפוננטה מקבלת props כפרמטר יחיד — אובייקט עם כל המאפיינים שהועברו.",
    },

    // ===== Hooks =====
    {
      id: "fill_hook_001", topicId: "topic_state", conceptKey: "lesson_22::useState", level: 3,
      code: "// imported from react\nconst [count, setCount] = ____(0);",
      answer: "useState",
      hint: "Hook שמחזיר [value, setter].",
      explanation: "useState יוצר state בקומפוננטה פונקציונלית; setter מחליף את הערך.",
    },
    {
      id: "fill_hook_002", topicId: "topic_effects", conceptKey: "lesson_24::useEffect", level: 4,
      code: "// imported from react\n____(() => {\n  console.log('mounted');\n}, []);",
      answer: "useEffect",
      hint: "Hook לפעולות צד (fetch, טיימרים).",
      explanation: "מערך תלויות ריק [] — רץ פעם אחת אחרי הרינדור הראשון.",
    },
    {
      id: "fill_hook_003", topicId: "topic_effects", conceptKey: "lesson_24::useRef", level: 5,
      code: "const inputRef = ____();\nuseEffect(() => inputRef.current.focus(), []);",
      answer: "useRef",
      hint: "Hook שמחזיר אובייקט {current} שלא גורם לרינדור.",
      explanation: "useRef נהדר ל-DOM refs ולערכים שצריך לשמור בין רינדורים בלי לרנדר.",
    },

    // ===== Router =====
    {
      id: "fill_router_001", topicId: "topic_router", conceptKey: "lesson_23::BrowserRouter", level: 3,
      code: "import { ____, Routes, Route } from 'react-router-dom';\n// עטיפת האפליקציה כדי להפעיל ניהול היסטוריה",
      answer: "BrowserRouter",
      hint: "הקומפוננטה העוטפת שמפעילה את ניהול ההיסטוריה.",
      explanation: "BrowserRouter משתמש ב-History API. עוטפים בה את כל האפליקציה.",
    },
    {
      id: "fill_router_002", topicId: "topic_router", conceptKey: "lesson_23::useNavigate", level: 4,
      code: "import { useNavigate } from 'react-router-dom';\nconst navigate = useNavigate();\nnavigate(____);",
      answer: "'/home'",
      hint: "מחרוזת — הנתיב היעד.",
      explanation: "navigate('/home') מנווט פרוגרמטית ללא Link.",
    },

    // ===== TypeScript =====
    {
      id: "fill_ts_001", topicId: "topic_typescript", conceptKey: "lesson_26::type annotation", level: 3,
      code: "function double(x): ____ {\n  return x * 2;\n}",
      answer: "number",
      hint: "טיפוס ההחזרה — מספר כפול 2 הוא תמיד מספר.",
      explanation: "ב-TS אפשר/כדאי לציין את טיפוס ההחזרה במפורש.",
    },
    {
      id: "fill_ts_002", topicId: "topic_typescript", conceptKey: "lesson_26::type alias", level: 4,
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
      id: "fill_arr_009", topicId: "topic_arrays", conceptKey: "lesson_11::reduce", level: 4,
      code: "const total = [3, 5, 7].reduce((sum, n) => sum + n, ____);\nconsole.log(total); // 115",
      answer: "100",
      hint: "ערך התחלתי תלת-ספרתי לסכום.",
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
      id: "fill_obj_003", topicId: "topic_objects", conceptKey: "lesson_13::Object", level: 4,
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
      id: "fill_dom_004", topicId: "topic_events", conceptKey: "lesson_19::event", level: 3,
      code: "btn.____('click', () => {\n  console.log('clicked');\n});",
      answer: "addEventListener",
      hint: "מתודה שמוסיפה האזנה לאירוע.",
      explanation: "addEventListener(type, handler) — מאפשר מספר handlers על אותו אלמנט, בניגוד ל-onclick.",
    },

    // ===== Async =====
    {
      id: "fill_async_003", topicId: "topic_async", conceptKey: "lesson_15::fetch", level: 4,
      code: "fetch('/api')\n  .then(res => res.____())\n  .then(data => console.log(data));",
      answer: "json",
      hint: "מתודה שמפענחת את גוף התגובה כ-JSON.",
      explanation: "res.json() מחזיר Promise שמתפענח לאובייקט/מערך JS.",
    },
    {
      id: "fill_async_004", topicId: "topic_async", conceptKey: "lesson_15::Promise", level: 5,
      code: "const p = new Promise((____, reject) => {\n  setTimeout(() => /* fulfill with 'hello' */, 1000);\n});",
      answer: "resolve",
      hint: "שם הפרמטר הראשון בקולבק של new Promise (קונבנציה).",
      explanation: "הקולבק של new Promise מקבל שני פרמטרים — הראשון (resolve) להצלחה, השני (reject) לכישלון. קוראים ל-resolve(value) כדי להפוך את ה-Promise ל-fulfilled.",
    },

    // ===== Express / Mongo =====
    {
      id: "fill_exp_003", topicId: "topic_express", conceptKey: "lesson_17::app.get", level: 4,
      code: "app.____('/api/users/:id', (req, res) => {\n  const id = req.params.id;\n  res.json(findUser(id));\n});",
      answer: "get",
      hint: "method ל-Read.",
      explanation: "GET /api/users/:id — קורא משאב לפי id דינמי. req.params מכיל את הפרמטרים.",
    },
    {
      id: "fill_mongo_001", topicId: "topic_mongo", conceptKey: "lesson_20::findOne", level: 4,
      code: "const user = await User.____({ email: 'a@b.com' });",
      answer: "findOne",
      hint: "מתודת Mongoose לחיפוש מסמך אחד.",
      explanation: "findOne מחזיר את המסמך הראשון שתואם ל-filter, או null.",
    },
    {
      id: "fill_mongo_002", topicId: "topic_mongo", conceptKey: "lesson_20::Schema", level: 4,
      code: "const Product = new mongoose.____({\n  name: String,\n  price: Number\n});",
      answer: "Schema",
      hint: "מבנה הנתונים של Mongoose.",
      explanation: "mongoose.Schema מגדיר את צורת המסמך — שדות, טיפוסים, ולידציות.",
    },

    // ===== HTML / CSS Foundations =====
    {
      id: "fill_html_css_001", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::semantic HTML", level: 2,
      code: "const centralPageLandmark = \"____\";\n// עוטף את התוכן המרכזי של הדף",
      answer: "main",
      hint: "landmark שמכיל את התוכן המרכזי של הדף.",
      explanation: "main מסמן לקורא מסך ולדפדפן: זה האזור המרכזי של הדף, לא header או footer.",
    },
    {
      id: "fill_html_css_002", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::HTML form", level: 3,
      code: "<form action=\"/login\" method=\"____\">\n  <button type=\"submit\">כניסה</button>\n</form>",
      answer: "post",
      hint: "שיטת שליחה שמתאימה לטופס שמשנה מצב או שולח פרטים רגישים.",
      explanation: "POST שולח נתונים בגוף הבקשה ומתאים להתחברות, הרשמה ופעולות שמשנות מצב בשרת.",
    },
    {
      id: "fill_html_css_003", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::label", level: 3,
      code: "<label ____=\"user-email\">אימייל</label>\n<input id=\"user-email\" name=\"email\" type=\"text\" />",
      answer: "for",
      hint: "המאפיין שמחבר label ל-id של input.",
      explanation: "for/id מחברים בין הטקסט לבין השדה. לחיצה על התווית ממקדת את השדה וקורא מסך יודע מה שם השדה.",
    },
    {
      id: "fill_html_css_004", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::CSS selector", level: 3,
      code: "____ {\n  padding: 16px;\n  border: 1px solid #ddd;\n}",
      answer: ".card",
      hint: "selector למחלקה בשם card מתחיל בנקודה.",
      explanation: ".card בוחר כל אלמנט שיש לו class=\"card\". בלי הנקודה CSS יחפש תגית בשם card.",
    },
    {
      id: "fill_html_css_005", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::box model", level: 4,
      code: "* {\n  box-sizing: ____;\n}",
      answer: "border-box",
      hint: "מצב שבו width כולל גם padding ו-border.",
      explanation: "border-box מקל על חישובי layout: הרוחב שהגדרת הוא הרוחב הסופי של הקופסה, כולל padding ו-border.",
    },
    {
      id: "fill_html_css_006", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::accessibility basics", level: 4,
      code: "<button ____=\"סגור חלון\">\n  <span aria-hidden=\"true\">×</span>\n</button>",
      answer: "aria-label",
      hint: "מאפיין שנותן שם נגיש לכפתור שאין בו טקסט גלוי.",
      explanation: "aria-label נותן לקורא מסך שם ברור לכפתור אייקון. הטקסט הוויזואלי × מוסתר מקוראי מסך עם aria-hidden.",
    },
    {
      id: "fill_html_css_007", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::HTML document", level: 5,
      code: "<!doctype html>\n<html lang=\"he\" dir=\"rtl\">\n  <____>\n    <title>LumenPortal</title>\n  <!-- metadata section closes here -->\n  <body><main>...</main></body>\n</html>",
      answer: "head",
      hint: "החלק שמכיל metadata, title וקישורי CSS/JS, לא את התוכן הגלוי.",
      explanation: "HTML document מתחלק ל-head עבור מידע לדפדפן ול-body עבור מה שהמשתמש רואה. head לא מציג תוכן מרכזי במסך.",
    },
    {
      id: "fill_html_css_008", topicId: "topic_html_css", conceptKey: "lesson_html_css_foundations::HTML form", level: 5,
      code: "<form action=\"/signup\" method=\"post\">\n  <input name=\"email\" type=\"email\" />\n  <button type=\"____\">צור משתמש</button>\n</form>",
      answer: "submit",
      hint: "סוג כפתור שמפעיל שליחת form.",
      explanation: "button type=\"submit\" שולח את ה-form לפי action ו-method. בלי הבנה זו קשה לחבר טפסים לשרת.",
    },
    {
      id: "fill_tooling_001", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::commit", level: 3,
      code: "git ____ -m \"add login form\"",
      answer: "commit",
      hint: "הפקודה שיוצרת snapshot רשמי של השינויים שב-staging area.",
      explanation: "git commit יוצר נקודת היסטוריה חדשה עם הודעה שמסבירה מה השתנה.",
    },
    {
      id: "fill_tooling_002", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::branch", level: 3,
      code: "git switch -c ____",
      answer: "feature/login-form",
      hint: "שם ענף שמתאר שינוי ממוקד.",
      explanation: "git switch -c יוצר ענף חדש ועובר אליו. שם כמו feature/login-form ברור לצוות.",
    },
    {
      id: "fill_tooling_003", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::pull request", level: 4,
      code: "git push -u origin ____",
      answer: "feature/login-form",
      hint: "דוחפים את הענף שעליו עובדים כדי לפתוח PR ב-GitHub.",
      explanation: "push עם -u מחבר את הענף המקומי לענף מרוחק, ואז אפשר לפתוח Pull Request.",
    },
    {
      id: "fill_tooling_004", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::npm scripts", level: 3,
      code: "npm run ____\n# מפעיל בדיקות יחידה בפרויקט",
      answer: "test",
      hint: "שם script נפוץ לבדיקות.",
      explanation: "npm run test מפעיל את פקודת הבדיקות שהוגדרה ב-package.json.",
    },
    {
      id: "fill_tooling_007", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::working tree", level: 5,
      code: "git status --short\n# src/App.jsx is ____\n# notes.txt is untracked",
      answer: "modified",
      hint: "מצב של קובץ tracked שהשתנה ב-working tree.",
      explanation: "modified מציין שקובץ ש-Git כבר עוקב אחריו השתנה ב-working tree. בקיצור של git status זה מופיע כאות M.",
    },
    {
      id: "fill_tooling_008", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::Git", level: 5,
      code: "git ____ --oneline\n# מציג את היסטוריית ה-commits בקיצור",
      answer: "log",
      hint: "הפקודה שמציגה היסטוריית commits.",
      explanation: "git log מציג את גרף ההיסטוריה של Git. --oneline מקצר כל commit לשורה אחת.",
    },
    {
      id: "fill_tooling_009", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::repository", level: 5,
      code: "git ____ https://github.com/team/app.git\ncd app",
      answer: "clone",
      hint: "הפקודה שיוצרת repository מקומי מתוך remote.",
      explanation: "git clone מוריד remote repository ויוצר אצלך תיקייה מקומית עם קבצים והיסטוריית Git.",
    },
    {
      id: "fill_tooling_010", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::staging area", level: 5,
      code: "git add src/App.jsx\ngit diff ____\n# מציג מה ייכנס ל-commit הבא",
      answer: "--staged",
      hint: "הדגל שמציג את השינויים שכבר נמצאים ב-staging area.",
      explanation: "git diff --staged מציג את ה-index, כלומר מה שהוכנס ל-staging area וייכנס ל-commit הבא.",
    },
    {
      id: "fill_auth_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::bcrypt", level: 5,
      code: "const ok = await bcrypt.____(password, user.passwordHash);",
      answer: "compare",
      hint: "המתודה שבודקת סיסמה מול hash קיים.",
      explanation: "bcrypt.compare בודק סיסמה מול hash בלי לחשוף או לפענח את הסיסמה השמורה.",
    },
    {
      id: "fill_auth_002", topicId: "topic_auth", conceptKey: "lesson_auth_security::Firebase Auth", level: 5,
      code: "const user = await firebaseAuth.____(email, password);",
      answer: "signInWithEmailAndPassword",
      hint: "פעולת התחברות email/password בשירות auth.",
      explanation: "Firebase Auth מנהל את תהליך ההתחברות ומחזיר משתמש/credential במקום לשמור סיסמאות ידנית.",
    },
    {
      id: "fill_auth_003", topicId: "topic_auth", conceptKey: "lesson_auth_security::Kinde/Appwrite", level: 5,
      code: "const session = await authProvider.____({ provider: 'google' });",
      answer: "login",
      hint: "פעולה כללית שמתחילה התחברות מול provider.",
      explanation: "שירותי Auth כמו Kinde/Appwrite מספקים login מול provider ומחזירים session במקום לבנות OAuth מלא ידנית.",
    },
    {
      id: "fill_sql_001", topicId: "topic_sql", conceptKey: "lesson_sql_orm::PostgreSQL", level: 5,
      code: "BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n____;",
      answer: "COMMIT",
      hint: "הפקודה שמאשרת transaction אחרי שכל הפעולות הצליחו.",
      explanation: "PostgreSQL transaction מאפשרת לבצע כמה עדכונים כיחידה אחת. COMMIT מאשר אותם יחד.",
    },
    {
      id: "fill_nest_001", topicId: "topic_nestjs", conceptKey: "lesson_nestjs::interceptor", level: 5,
      code: "@UseInterceptors(____)\n@Get()\nfindAll() { return this.tasksService.findAll(); }",
      answer: "ClassSerializerInterceptor",
      hint: "Interceptor מובנה שמסדר serialization של response.",
      explanation: "interceptor עוטף את handler ויכול לשנות את ה-response לפני שהוא חוזר ללקוח.",
    },
    {
      id: "fill_nest_002", topicId: "topic_nestjs", conceptKey: "lesson_nestjs::middleware", level: 5,
      code: "function logger(req, res, next) {\n  console.log(req.method, req.path);\n}\napp.____(logger);",
      answer: "use",
      hint: "המתודה שמחברת middleware לשרת.",
      explanation: "middleware מתחבר ל-pipeline דרך app.use. בתוך middleware שקורא לוג בלבד צריך גם לקרוא next כדי שה-request ימשיך ל-route הבא.",
    },
    {
      id: "fill_ai_001", topicId: "topic_ai_engineering", conceptKey: "lesson_ai_engineering::LangChain", level: 5,
      code: "const chain = prompt.pipe(model).pipe(____);",
      answer: "parser",
      hint: "השלב שממיר פלט מודל למבנה שהקוד יכול להשתמש בו.",
      explanation: "LangChain מחבר שלבים: prompt, model ו-parser. הערך שלו מופיע כשיש רצף פעולות ולא קריאה אחת פשוטה.",
    },
    {
      id: "fill_ai_002", topicId: "topic_ai_engineering", conceptKey: "lesson_ai_engineering::model selection", level: 5,
      code: "const modelName = process.env.____;\nconst result = await runModel(modelName, task);",
      answer: "OPENAI_MODEL",
      hint: "שם משתנה סביבה ששומר בחירת מודל.",
      explanation: "model selection צריך להיות configurable כדי להחליף איכות, latency ועלות בלי לשכתב קוד.",
    },
    {
      id: "fill_next_001", topicId: "topic_nextjs", conceptKey: "lesson_nextjs::layout", level: 5,
      code: "export default function RootLayout({ ____ }) {\n  return <html><body>{/* page content */}</body></html>;\n}",
      answer: "children",
      hint: "ה-prop שמכיל את העמודים שה-layout עוטף.",
      explanation: "layout ב-Next מקבל children ומחזיר שלד משותף סביב העמודים.",
    },
    {
      id: "fill_next_002", topicId: "topic_nextjs", conceptKey: "lesson_nextjs::image optimization", level: 5,
      code: "<Image src=\"/hero.png\" alt=\"Dashboard\" width={1200} height={____} />",
      answer: "630",
      hint: "גובה מספרי שמאפשר לדפדפן לשמור מקום לתמונה.",
      explanation: "width ו-height עוזרים ל-Next ולדפדפן למנוע layout shift ולבחור גודל תמונה מתאים.",
    },
    {
      id: "fill_next_003", topicId: "topic_nextjs", conceptKey: "lesson_nextjs::page", level: 5,
      code: "// app/products/page.jsx\nexport default function ____() {\n  return <ProductsList />;\n}",
      answer: "ProductsPage",
      hint: "קומפוננטת ברירת המחדל שקובץ page מייצא.",
      explanation: "ב-Next.js קובץ page מייצא קומפוננטה שמייצגת את המסך של ה-route. שם הפונקציה חופשי, אבל default export חובה.",
    },
    {
      id: "fill_devops_001", topicId: "topic_devops", conceptKey: "lesson_devops_deploy::preview deployment", level: 5,
      code: "git push origin feature/auth\n# Vercel creates a ____ URL for the pull request before production.",
      answer: "preview",
      hint: "סביבת deploy זמנית ל-PR.",
      explanation: "preview deployment מאפשר לבדוק build ו-UI אמיתיים לכל PR בלי לשנות את production.",
    },
    {
      id: "fill_ai_003", topicId: "topic_ai_engineering", conceptKey: "lesson_ai_engineering::prompt messages", level: 5,
      code: "const messages = [\n  { role: \"system\", content: \"Answer briefly\" },\n  { role: \"____\", content: question }\n];",
      answer: "user",
      hint: "role של הודעת המשתמש שנשלחת למודל.",
      explanation: "prompt messages מסדרים למודל תפקידים: system קובע כללים, user מביא את השאלה, assistant מייצג תשובות קודמות.",
    },
    {
      id: "fill_dom_005", topicId: "topic_dom", conceptKey: "lesson_13::Document Object Model", level: 5,
      code: "const title = document.querySelector('h1');\ntitle.____ = 'ברוך הבא';",
      answer: "textContent",
      hint: "property שמשנה טקסט בלי לפרש HTML.",
      explanation: "Document Object Model מאפשר ל-JS לשנות nodes בזיכרון הדפדפן. textContent משנה טקסט בטוח יותר מ-innerHTML כשלא צריך HTML.",
    },
    {
      id: "fill_node_001", topicId: "topic_node", conceptKey: "lesson_16::File System", level: 5,
      code: "import { readFile } from 'node:fs/promises';\nconst text = await readFile('notes.txt', '____');",
      answer: "utf8",
      hint: "קידוד שמחזיר טקסט במקום Buffer.",
      explanation: "File System מחזיר bytes. כשמבקשים utf8, Node מפענח את הקובץ למחרוזת קריאה.",
    },
    {
      id: "fill_mongo_003", topicId: "topic_mongo", conceptKey: "lesson_20::$eq", level: 5,
      code: "const activeUsers = await User.find({ status: { ____: 'active' } });",
      answer: "$eq",
      hint: "אופרטור MongoDB לשוויון.",
      explanation: "$eq מסנן מסמכים שבהם השדה שווה בדיוק לערך המבוקש.",
    },
    {
      id: "fill_mongo_004", topicId: "topic_mongo", conceptKey: "lesson_20::$gt", level: 5,
      code: "const premium = await User.find({ score: { ____: 90 } });",
      answer: "$gt",
      hint: "אופרטור MongoDB לגדול מ.",
      explanation: "$gt מחזיר מסמכים שבהם הערך גדול מהסף. כאן רק score מעל 90.",
    },
    {
      id: "fill_mongo_005", topicId: "topic_mongo", conceptKey: "lesson_20::$lt", level: 5,
      code: "const cheap = await Product.find({ price: { ____: 100 } });",
      answer: "$lt",
      hint: "אופרטור MongoDB לקטן מ.",
      explanation: "$lt מחזיר מסמכים שבהם הערך קטן מהסף. כאן רק מוצרים מתחת ל-100.",
    },
    {
      id: "fill_auth_004", topicId: "topic_auth", conceptKey: "lesson_auth_security::Supabase Auth", level: 5,
      code: "const { data } = await supabase.auth.____({ email, password });",
      answer: "signInWithPassword",
      hint: "פעולת email/password של Supabase Auth.",
      explanation: "Supabase Auth מנהל session ו-user identity. signInWithPassword מחזיר session במקום לשמור סיסמה בקוד שלך.",
    },
    {
      id: "fill_ai_004", topicId: "topic_ai_engineering", conceptKey: "lesson_ai_engineering::fine-tuning boundary", level: 5,
      code: "const strategy = stableStyleNeeded && manyReviewedExamples ? \"____\" : \"prompt-or-rag\";",
      answer: "fine-tuning",
      hint: "בוחרים בזה רק כשיש הרבה דוגמאות בדוקות ודפוס קבוע.",
      explanation: "fine-tuning מתאים לשינוי התנהגות עקבי של מודל בעזרת דוגמאות רבות. ידע חיצוני ועדכני עדיף לפתור עם RAG.",
    },
    {
      id: "fill_design_001", topicId: "topic_design_systems", conceptKey: "lesson_design_systems::cva", level: 5,
      code: "const button = cva('inline-flex', {\n  variants: { intent: { brand: 'bg-blue-600', danger: 'bg-red-600' } },\n  ____: { intent: 'brand' }\n});",
      answer: "defaultVariants",
      hint: "השדה שמגדיר איזה variant ייבחר כשלא מעבירים props.",
      explanation: "cva מרכז variants של className במקום לפזר תנאים בקומפוננטה. defaultVariants קובע מצב ברירת מחדל; כאן brand הוא מצב הכפתור הרגיל.",
    },
    {
      id: "fill_design_002", topicId: "topic_design_systems", conceptKey: "lesson_design_systems::theme tokens", level: 5,
      code: ":root {\n  --color-brand: #2563eb;\n}\n.button { background: ____(--color-brand); }",
      answer: "var",
      hint: "פונקציית CSS שקוראת ערך מתוך custom property.",
      explanation: "theme tokens נותנים שם יציב לערכי עיצוב. var(--color-brand) קורא את ה-token, ושינוי token אחד מעדכן את כל המקומות שמשתמשים בו.",
    },
    {
      id: "fill_design_003", topicId: "topic_design_systems", conceptKey: "lesson_design_systems::component registry", level: 5,
      code: "const registry = {\n  Button,\n  Card,\n  ____\n};\nconst Component = registry[name];",
      answer: "Input",
      hint: "רכיב נוסף בקטלוג הרכיבים.",
      explanation: "component registry הוא קטלוג שממפה שם לרכיב. הוא שימושי להתקנה, תיעוד או rendering דינמי מבוקר.",
    },
    {
      id: "fill_devops_002", topicId: "topic_devops", conceptKey: "lesson_devops_deploy::Docker", level: 5,
      code: "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD [\"npm\", \"run\", \"____\"]",
      answer: "start",
      hint: "script שמריץ את האפליקציה בתוך container.",
      explanation: "Dockerfile מתאר container קבוע. CMD מגדיר מה ירוץ כשה-container מתחיל.",
    },
    {
      id: "fill_next_004", topicId: "topic_nextjs", conceptKey: "lesson_nextjs::Next.js", level: 5,
      code: "// app/api/health/route.js\nexport function GET() {\n  return Response.____({ ok: true });\n}",
      answer: "json",
      hint: "מתודה שמחזירה JSON response ב-route handler.",
      explanation: "Next.js יכול להכיל גם UI וגם API routes. Response.json מחזיר תשובת JSON מהשרת.",
    },
    {
      id: "fill_nest_003", topicId: "topic_nestjs", conceptKey: "lesson_nestjs::Nest.js", level: 5,
      code: "@Module({\n  controllers: [TasksController],\n  providers: [____]\n})\nexport class TasksModule {}",
      answer: "TasksService",
      hint: "service שמוזרק ל-controller דרך DI.",
      explanation: "Nest.js מארגן backend ל-modules, controllers ו-providers. providers הם השירותים שמכילים לוגיקה.",
    },
    {
      id: "fill_nest_004", topicId: "topic_nestjs", conceptKey: "lesson_nestjs::decorator", level: 5,
      code: "@____('tasks')\nexport class TasksEndpoint {}",
      answer: "Controller",
      hint: "decorator שמגדיר class כ-controller עם prefix ל-route.",
      explanation: "decorator מוסיף metadata. ב-Nest, @Controller('tasks') מחבר class לנתיב /tasks.",
    },
    {
      id: "fill_sql_003", topicId: "topic_sql", conceptKey: "lesson_sql_orm::database", level: 5,
      code: "const dbUrl = process.env.____;\n// למשל postgresql://user:pass@host:5432/app",
      answer: "DATABASE_URL",
      hint: "משתנה סביבה שמחזיק כתובת חיבור לבסיס הנתונים.",
      explanation: "database דורש connection string. שומרים אותו ב-env ולא בקוד כדי להחליף סביבה ולשמור סודות.",
    },
    {
      id: "fill_sql_004", topicId: "topic_sql", conceptKey: "lesson_sql_orm::column", level: 5,
      code: "CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email ____ NOT NULL\n);",
      answer: "TEXT",
      hint: "טיפוס טקסטואלי נפוץ ב-PostgreSQL.",
      explanation: "column מגדירה שם וטיפוס בכל row. כאן email היא עמודת TEXT שאסור להשאיר ריקה.",
    },
    {
      id: "fill_devops_003", topicId: "topic_devops", conceptKey: "lesson_devops_deploy::production readiness", level: 5,
      code: "npm test -- --run\nnpm run build\n# אם שניהם עוברים, מסמנים deploy כ-____ יותר",
      answer: "ready",
      hint: "מוכן יותר לפרודקשן אחרי בדיקות ובנייה.",
      explanation: "production readiness מחייבת בדיקות, build, env תקין, logs ודרך rollback. מעבר build/test הוא רק gate בסיסי.",
    },
    {
      id: "fill_devops_004", topicId: "topic_devops", conceptKey: "lesson_devops_deploy::container", level: 5,
      code: "docker run --rm -p 3000:3000 ____",
      answer: "lumenportal",
      hint: "שם image שממנו מריצים container.",
      explanation: "container הוא מופע רץ של image. docker run יוצר תהליך מבודד עם פורטים, קבצים ותלויות.",
    },
    {
      id: "fill_devops_005", topicId: "topic_devops", conceptKey: "lesson_devops_deploy::Vercel deploy", level: 5,
      code: "vercel --prod\n# deploys the current project to ____",
      answer: "production",
      hint: "סביבת האתר החי.",
      explanation: "Vercel deploy מחבר build לפריסה. --prod מפרסם ל-production, בניגוד ל-preview זמני.",
    },
    {
      id: "fill_design_004", topicId: "topic_design_systems", conceptKey: "lesson_design_systems::accessible primitive", level: 5,
      code: "<Dialog.Trigger asChild>\n  <button type=\"button\">____</button>\n</Dialog.Trigger>",
      answer: "Open",
      hint: "טקסט גלוי לכפתור נגיש.",
      explanation: "accessible primitive נותן התנהגות, focus ו-keyboard. הילד עדיין צריך להיות כפתור סמנטי עם שם ברור.",
    },
    {
      id: "fill_obj_004", topicId: "topic_objects", conceptKey: "lesson_13::inheritance", level: 5,
      code: "class Admin ____ User {\n  canDeleteUsers() { return true; }\n}",
      answer: "extends",
      hint: "מילת המפתח שיוצרת ירושה בין classes.",
      explanation: "inheritance מאפשרת ל-Admin לקבל יכולות מ-User ולהוסיף התנהגות משלה.",
    },
    {
      id: "fill_sql_002", topicId: "topic_sql", conceptKey: "lesson_sql_orm::ORM", level: 5,
      code: "const user = await prisma.user.____({ where: { id } });",
      answer: "findUnique",
      hint: "קריאה ל-ORM שמחזירה רשומה אחת לפי מזהה ייחודי.",
      explanation: "ORM כמו Prisma ממפה טבלה לקוד. findUnique מחליף כתיבת SELECT ידני למקרה של מפתח ייחודי.",
    },
    {
      id: "fill_auth_005", topicId: "topic_auth", conceptKey: "lesson_auth_security::provider auth", level: 5,
      code: "await auth.signInWithOAuth({ provider: '____' });",
      answer: "google",
      hint: "ספק התחברות נפוץ.",
      explanation: "provider auth מעביר את אימות המשתמש לספק כמו Google/GitHub ואז מחזיר session לאפליקציה.",
    },
    {
      id: "fill_auth_006", topicId: "topic_auth", conceptKey: "lesson_auth_security::session", level: 5,
      code: "const session = await auth.getSession();\nif (!session?.____) redirect('/login');",
      answer: "user",
      hint: "הישות שמוכיחה שיש משתמש מחובר בתוך session.",
      explanation: "session מחזיק את מצב ההתחברות. אם אין user בתוך session, המשתמש לא מחובר.",
    },
    {
      id: "fill_tooling_005", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::ESLint", level: 4,
      code: "\"lint\": \"eslint ____\"",
      answer: "src",
      hint: "נתיב תיקיית הקוד שרוצים לבדוק.",
      explanation: "script בשם lint יכול להריץ ESLint על תיקיית המקור כדי לזהות בעיות סטטיות.",
    },
    {
      id: "fill_tooling_006", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::Prettier", level: 4,
      code: "\"format\": \"prettier --write ____\"",
      answer: "src",
      hint: "נתיב תיקיית הקוד שרוצים לעצב.",
      explanation: "Prettier עם --write מעצב את הקבצים במקום. בדרך כלל מריצים על תיקיית המקור או על glob מוגדר.",
    },
    {
      id: "fill_tooling_011", topicId: "topic_tooling", conceptKey: "lesson_tooling_git::Prettier", level: 5,
      code: "\"format:verify\": \"prettier --____ src\"",
      answer: "check",
      hint: "דגל שבודק formatting בלי לשנות קבצים.",
      explanation: "prettier --check מתאים ל-CI כי הוא נכשל אם הקוד לא מעוצב, בלי לערוך קבצים אוטומטית.",
    },

    // ===== React =====
    {
      id: "fill_react_002", topicId: "topic_react", conceptKey: "lesson_21::JSX", level: 3,
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
      id: "fill_ts_003", topicId: "topic_typescript", conceptKey: "lesson_26::type alias", level: 4,
      code: "____ Role = 'admin' | 'guest';\nconst r: Role = 'admin';",
      answer: "type",
      hint: "מילת מפתח ל-alias של union.",
      explanation: "type Role = 'admin' | 'guest' — string literal union. רק שני הערכים האלה מותרים.",
    },
    {
      id: "fill_ts_004", topicId: "topic_typescript", conceptKey: "lesson_26::interface", level: 5,
      code: "interface Greeter {\n  greet(name): ____;\n}",
      answer: "string",
      hint: "טיפוס ההחזרה — פונקציית greet מחזירה ברכה.",
      explanation: "greet מחזירה string (לדוגמה 'Hello, ' + name). ה-interface מחייב את החתימה.",
    },
    {
      id: "fill_exam_by_value_001", topicId: "topic_variables", conceptKey: "lesson_11::By Value", level: 5,
      code: "let a = 5;\nlet b = a;\nb = 9;\nconst result = a === 5 ? '____' : 'changed';",
      answer: "unchanged",
      hint: "העתקת primitive לא משנה את המקור.",
      explanation: "By Value מעתיק את הערך עצמו. שינוי b לא נוגע ב-a, לכן a נשאר 5.",
    },
    {
      id: "fill_exam_spread_001", topicId: "topic_arrays", conceptKey: "lesson_11::spread", level: 5,
      code: "const nums = [1, 2];\nconst copy = [...nums, 3];\nconsole.log(copy.join('-')); // ____",
      answer: "1-2-3",
      hint: "spread פורס את איברי המערך לתוך מערך חדש.",
      explanation: "spread מכניס את 1 ו-2 לתוך copy ואז מוסיף 3. nums המקורי לא משתנה.",
    },
    {
      id: "fill_exam_new_array_from_existing_001", topicId: "topic_arrays", conceptKey: "lesson_12::יצירת מערך חדש מתוך קיים", level: 5,
      code: "const nums = [1, 2, 3];\nconst doubled = nums.map((n) => n * 2);\nconsole.log(doubled.join(',')); // ____",
      answer: "2,4,6",
      hint: "map מחזירה מערך חדש לפי תוצאת callback לכל איבר.",
      explanation: "map לא משנה את nums. היא בונה מערך חדש שבו כל איבר הוכפל.",
    },
    {
      id: "fill_exam_gte_001", topicId: "topic_database", conceptKey: "lesson_20::$gte", level: 5,
      code: "const adults = await User.find({ age: { ____: 18 } });",
      answer: "$gte",
      hint: "Greater than or equal.",
      explanation: "$gte מסנן ערכים שגדולים או שווים לסף. כאן נקבל משתמשים מגיל 18 ומעלה.",
    },
    {
      id: "fill_exam_lte_001", topicId: "topic_database", conceptKey: "lesson_20::$lte", level: 5,
      code: "const cheap = await Product.find({ price: { ____: 100 } });",
      answer: "$lte",
      hint: "Less than or equal.",
      explanation: "$lte מסנן ערכים שקטנים או שווים לסף. כאן נקבל מוצרים עד מחיר 100.",
    },
    {
      id: "fill_exam_side_effect_001", topicId: "topic_effects", conceptKey: "lesson_24::side effect", level: 5,
      code: "useEffect(() => {\n  document.title = pageTitle;\n}, [pageTitle]);\n// The effect updates the ____",
      answer: "documentTitle",
      hint: "שם קצר למה שמשתנה מחוץ ל-React state.",
      explanation: "side effect הוא שינוי מחוץ לחישוב הטהור של render. כאן משנים את כותרת המסמך.",
    },
    {
      id: "fill_exam_var_001", topicId: "topic_variables", conceptKey: "lesson_11::var", level: 5,
      code: "function demo() {\n  if (true) {\n    var flag = 'ok';\n  }\n  return flag === 'ok' ? '____' : 'blockScope';\n}",
      answer: "functionScope",
      hint: "var תחום לפונקציה, לא לבלוק if.",
      explanation: "var היא function-scoped. לכן flag זמין גם אחרי בלוק ה-if בתוך אותה פונקציה.",
    },
    {
      id: "fill_exam_string_001", topicId: "topic_variables", conceptKey: "lesson_11::string", level: 5,
      code: "const label = 'cat';\nconsole.log(typeof label.length); // ____",
      answer: "number",
      hint: "length של מחרוזת הוא מספר.",
      explanation: "string הוא טקסט. המאפיין length מחזיר כמה תווים יש בו, וזה ערך number.",
    },
    {
      id: "fill_exam_export_default_001", topicId: "topic_react", conceptKey: "lesson_21::export default", level: 5,
      code: "____ function App() {\n  return <main />;\n}",
      answer: "export default",
      hint: "ייצוא ברירת מחדל של קומפוננטה אחת מהקובץ.",
      explanation: "export default מאפשר לקובץ אחר לייבא את App בשם שיבחר, למשל import App from './App'.",
    },
    {
      id: "fill_exam_props_001", topicId: "topic_react", conceptKey: "lesson_22::props", level: 5,
      code: "function Card(input) {\n  return <h2>{input.____}</h2>;\n}",
      answer: "title",
      hint: "שם prop שקוראים מתוך אובייקט הקלט.",
      explanation: "props הם נתונים שהורה מעביר לילד. כאן קוראים את title מתוך אובייקט ה-props.",
    },
    {
      id: "fill_exam_fs_001", topicId: "topic_node", conceptKey: "lesson_16::fs", level: 5,
      code: "const fs = require('fs');\nfs.____('notes.txt', 'hello');",
      answer: "writeFileSync",
      hint: "פונקציה סינכרונית שכותבת תוכן לקובץ.",
      explanation: "fs הוא מודול הקבצים של Node. writeFileSync כותבת לקובץ וחוסמת עד שהכתיבה מסתיימת.",
    },
    {
      id: "fill_exam_index_values_001", topicId: "topic_arrays", conceptKey: "lesson_12::עבודה עם ערכים לפי אינדקס", level: 5,
      code: "const colors = ['red', 'green', 'blue'];\nconst result = colors[1] === 'green' ? '____' : 'wrong';",
      answer: "match",
      hint: "אינדקס 1 מצביע על האיבר השני.",
      explanation: "אינדקס הוא מיקום במערך שמתחיל מ-0. לכן colors[1] מחזיר את האיבר השני: green.",
    },
    {
      id: "fill_exam_radix_primitives_001", topicId: "topic_design_systems", conceptKey: "lesson_design_systems::Radix primitives", level: 5,
      code: "const primitive = 'Dialog.Trigger';\nconst role = primitive.includes('Trigger') ? '____' : 'content';",
      answer: "opensDialog",
      hint: "Trigger הוא החלק שפותח את הדיאלוג.",
      explanation: "Radix primitive נותן התנהגות נגישה מוכנה. Dialog.Trigger הוא הטריגר שפותח את Dialog.Content.",
    },
    {
      id: "fill_exam_next_file_routing_001", topicId: "topic_nextjs", conceptKey: "lesson_nextjs::file-system routing", level: 5,
      code: "const file = 'app/profile/page.jsx';\nconst result = file.endsWith('/page.jsx') ? '____' : 'notRoute';",
      answer: "routeFile",
      hint: "ב-App Router, page.jsx מסמן קובץ שיוצר נתיב.",
      explanation: "file-system routing אומר שמבנה הקבצים יוצר routes. קובץ page.jsx בתוך תיקייה תחת app הופך את התיקייה לנתיב.",
    },
    {
      id: "fill_l25_tailwind_001", topicId: "topic_css", conceptKey: "lesson_25::Tailwind CSS", level: 4,
      code: "<button className=\"px-4 py-2 bg-blue-500 ____ rounded-lg\">Save</button>",
      answer: "text-white",
      hint: "utility שמגדירה צבע טקסט לבן.",
      explanation: "Tailwind מרכיב עיצוב דרך className. text-white מגדיר צבע טקסט לבן על הכפתור.",
    },
    {
      id: "fill_l25_tailwind_002", topicId: "topic_css", conceptKey: "lesson_25::Tailwind CSS", level: 5,
      code: "<button className=\"px-4 py-2 bg-blue-500 hover:bg-blue-700 ____\">Save</button>",
      answer: "transition",
      hint: "utility שמחליקה שינויי state כמו hover.",
      explanation: "transition מוסיף מעבר חלק לשינויי CSS כמו hover:bg-blue-700.",
    },
    {
      id: "fill_l25_utility_001", topicId: "topic_css", conceptKey: "lesson_25::utility classes", level: 4,
      code: "<section className=\"m-4 ____ bg-gray-100 rounded-lg\">...</section>",
      answer: "p-6",
      hint: "utility של padding פנימי.",
      explanation: "p-6 היא utility class ממוקדת ל-padding. היא מצטרפת לשאר utilities על אותו אלמנט.",
    },
    {
      id: "fill_l25_utility_002", topicId: "topic_css", conceptKey: "lesson_25::utility classes", level: 4,
      code: "<div className=\"p-6 bg-gray-100 rounded-lg ____\">Card</div>",
      answer: "shadow-md",
      hint: "utility שמוסיפה צל בינוני.",
      explanation: "shadow-md היא utility class אחת שמוסיפה צל. זו דוגמה להרכבת עיצוב אטומי.",
    },
    {
      id: "fill_l25_responsive_001", topicId: "topic_css", conceptKey: "lesson_25::responsive design", level: 5,
      code: "<div className=\"flex flex-col ____ gap-4\">...</div>",
      answer: "md:flex-row",
      hint: "מ-md ומעלה מחליפים עמודה לשורה.",
      explanation: "Tailwind mobile-first: flex-col חל כברירת מחדל, ו-md:flex-row משנה לשורה במסכים בינוניים ומעלה.",
    },
    {
      id: "fill_l25_responsive_002", topicId: "topic_css", conceptKey: "lesson_25::responsive design", level: 5,
      code: "<div className=\"grid grid-cols-1 ____ gap-4\">...</div>",
      answer: "lg:grid-cols-3",
      hint: "במסך גדול עוברים לשלוש עמודות.",
      explanation: "lg:grid-cols-3 מוסיף שלוש עמודות מ-breakpoint גדול ומעלה, בזמן שבמובייל נשארת עמודה אחת.",
    },
    {
      id: "fill_l25_grid_001", topicId: "topic_css", conceptKey: "lesson_25::grid", level: 4,
      code: "<div className=\"grid ____ gap-4\">...</div>",
      answer: "grid-cols-3",
      hint: "utility שמגדירה שלוש עמודות.",
      explanation: "grid מפעיל CSS Grid, ו-grid-cols-3 מגדיר שלוש עמודות.",
    },
    {
      id: "fill_l25_grid_002", topicId: "topic_css", conceptKey: "lesson_25::grid", level: 4,
      code: "<div className=\"grid grid-cols-1 md:grid-cols-2 ____\">...</div>",
      answer: "gap-4",
      hint: "utility שמגדירה רווח בין תאי הרשת.",
      explanation: "gap-4 מוסיף רווח עקבי בין שורות ועמודות ב-Grid.",
    },
    {
      id: "fill_l25_flex_001", topicId: "topic_css", conceptKey: "lesson_25::flex", level: 4,
      code: "<nav className=\"flex items-center ____ p-4\">...</nav>",
      answer: "justify-between",
      hint: "מפזר ילדים לקצוות ה-main axis.",
      explanation: "justify-between מפזר את הילדים על הציר הראשי, דפוס נפוץ ל-navbar עם לוגו וקישורים.",
    },
    {
      id: "fill_l25_flex_002", topicId: "topic_css", conceptKey: "lesson_25::flex", level: 4,
      code: "<main className=\"flex ____ justify-center min-h-screen\">...</main>",
      answer: "items-center",
      hint: "ממרכז על הציר המשני.",
      explanation: "items-center ממרכז את הילדים על ה-cross axis; יחד עם justify-center מקבלים מרכוז מלא.",
    },
    {
      id: "fill_l25_add_delete_001", topicId: "topic_css", conceptKey: "lesson_25::add/delete movie", level: 5,
      code: "const addMovie = (draft) => {\n  setMovies(prev => ____);\n};",
      answer: "[...prev, draft]",
      hint: "ביטוי spread שמחזיר מערך חדש עם כל הקודמים ועוד הפריט החדש.",
      explanation: "הביטוי [...prev, draft] שומר את הסרטים הקיימים ומוסיף את הסרט החדש למערך חדש, בלי לשנות את prev במקום.",
    },
    {
      id: "fill_l25_add_delete_002", topicId: "topic_css", conceptKey: "lesson_25::add/delete movie", level: 5,
      code: "const deleteMovie = (idToDelete) => {\n  setMovies(prev => prev.____(movie => movie.id !== idToDelete));\n};",
      answer: "filter",
      hint: "מתודת מערך שמחזירה רק איברים שעוברים תנאי.",
      explanation: "filter משאירה את כל הסרטים שה-id שלהם שונה מה-id למחיקה, ומחזירה מערך חדש.",
    },
    {
      id: "fill_l25_bg_color_001", topicId: "topic_css", conceptKey: "lesson_25::bg color", level: 4,
      code: "<div className=\"____ text-white p-4 rounded\">כרטיס כחול</div>",
      answer: "bg-blue-500",
      hint: "התחביר הוא bg, שם צבע, ואז עוצמה.",
      explanation: "bg-blue-500 הוא utility שמגדיר צבע רקע כחול בעוצמה 500; text-white מטפל רק בצבע הטקסט.",
    },
    {
      id: "fill_l25_bg_color_002", topicId: "topic_css", conceptKey: "lesson_25::bg color", level: 5,
      code: "<button className=\"bg-indigo-600 ____ text-white px-4 py-2 rounded\">Save</button>",
      answer: "hover:bg-indigo-700",
      hint: "variant של hover שמשנה את צבע הרקע.",
      explanation: "hover:bg-indigo-700 משנה את צבע הרקע רק במעבר עכבר, מעל bg-indigo-600 שמגדיר את מצב הבסיס.",
    },
    {
      id: "fill_ai_dev_cursor_001", topicId: "topic_ai_development", conceptKey: "ai_development::Cursor", level: 5,
      code: "# .cursorrules\n- Use Tailwind.\n- Do not add dependencies without ____.",
      answer: "approval",
      hint: "אישור מפורש לפני שינוי תלות.",
      explanation: ".cursorrules מתאים לכללי פרויקט קבועים. כלל כזה מונע מ-Cursor להוסיף dependency בלי אישור.",
    },
    {
      id: "fill_ai_dev_cursor_002", topicId: "topic_ai_development", conceptKey: "ai_development::Cursor", level: 5,
      code: "const target = '@file';\nconst meaning = target === '@file' ? '____' : 'unknown';",
      answer: "addContext",
      hint: "@file מוסיף קובץ להקשר של הבקשה.",
      explanation: "@file הוא דרך לתת ל-Cursor context מפורש במקום להסתמך על ניחוש מתוך הריפו.",
    },
    {
      id: "fill_ai_dev_windsurf_001", topicId: "topic_ai_development", conceptKey: "ai_development::Windsurf", level: 5,
      code: "const cascade = ['PLAN', 'READ', 'PROPOSE', 'APPLY', '____'];",
      answer: "RUN",
      hint: "אחרי שינוי מריצים בדיקות או פקודה.",
      explanation: "Windsurf Cascade יכול לתכנן, לערוך ואז להריץ פקודות כדי לצפות בתוצאה.",
    },
    {
      id: "fill_ai_dev_windsurf_002", topicId: "topic_ai_development", conceptKey: "ai_development::Windsurf", level: 5,
      code: "const workflow = ['build', 'lint', '____'];",
      answer: "push",
      hint: "צעד Git שמעלה branch ל-remote אחרי בדיקות.",
      explanation: "workflow agentic בריא מריץ build/lint לפני push. עדיין צריך אישור אנושי ל-scope.",
    },
    {
      id: "fill_ai_dev_prompt_001", topicId: "topic_ai_development", conceptKey: "ai_development::Prompt Engineering", level: 5,
      code: "const prompt = { goal: 'fix bug', context: 'login form', constraints: '____' };",
      answer: "noNewDeps",
      hint: "מגבלה שמונעת הוספת תלויות.",
      explanation: "Prompt טוב כולל constraints. noNewDeps מבהיר שהפתרון לא אמור להוסיף package.",
    },
    {
      id: "fill_ai_dev_prompt_002", topicId: "topic_ai_development", conceptKey: "ai_development::Prompt Engineering", level: 5,
      code: "const request = ['role', 'task', 'context', '____'];",
      answer: "acceptanceCriteria",
      hint: "מה חייב להתקיים כדי שנדע שהמשימה עברה.",
      explanation: "acceptanceCriteria הופך prompt מרעיון כללי למשימה שאפשר לבדוק.",
    },
    {
      id: "fill_ai_dev_review_001", topicId: "topic_ai_development", conceptKey: "ai_development::AI Code Review", level: 5,
      code: "const review = ['logic', 'security', 'performance', '____'];",
      answer: "tests",
      hint: "בדיקות חסרות או שבורות הן חלק מ-review.",
      explanation: "AI Code Review טוב לא מסתפק בסגנון; הוא מחפש גם כיסוי בדיקות ורגרסיות.",
    },
    {
      id: "fill_ai_dev_review_002", topicId: "topic_ai_development", conceptKey: "ai_development::AI Code Review", level: 5,
      code: "if (diff.includes('password')) checks.push('____');",
      answer: "secretLeak",
      hint: "סיכון אבטחה כשה-diff כולל סודות.",
      explanation: "AI reviewer צריך לסמן סיכוני secret leakage, אבל האדם אחראי לוודא שאין סוד אמיתי בקוד.",
    },
  ],
};

(function attachCuratedOptionFeedback() {
  if (typeof QUESTIONS_BANK === "undefined" || !Array.isArray(QUESTIONS_BANK.mc)) return;
  QUESTIONS_BANK.mc.forEach((question) => {
    if (!question || !Array.isArray(question.options) || typeof question.correctIndex !== "number") return;
    if (Array.isArray(question.optionFeedback) && question.optionFeedback.length === question.options.length) return;
    const conceptName = String(question.conceptKey || question.topicId || "המושג").split("::").pop();
    const explanation = question.explanation || `התשובה הנכונה קשורה ל-${conceptName}.`;
    question.optionFeedback = question.options.map((option, index) => {
      if (index === question.correctIndex) return `✅ נכון: ${explanation}`;
      return `❌ "${option}" לא מתאים כאן. השאלה בודקת את "${conceptName}", לכן צריך לבחור לפי ההגדרה/הקוד ולא לפי מילה דומה.`;
    });
  });
})();
