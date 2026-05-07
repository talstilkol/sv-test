// data/exam_practice_extras.js
// Exam-focused practice extras for SVCollege Full Stack preparation.
// Deterministic, source-bound prompts only: no generated data, no randomness.

var EXAM_PRACTICE_EXTRAS = {};

(function () {
  "use strict";

  var LESSON_FOCUS = {
    lesson_17: "HTTP/Express/REST API: request, response, routes, body, query, status codes",
    lesson_18: "Node/Express homework: forms, server routes, validation and storage",
    lesson_20: "MongoDB/Mongoose: database, collection, document, schema, model and CRUD",
    lesson_21: "React basics: Vite, components, JSX, props, map rendering and CSS",
    lesson_22: "React state: useState, immutable updates, controlled inputs and parent-child data flow",
    lesson_23: "React Router/Context: routes, navigation, params, provider and prop drilling",
    lesson_24: "React Hooks/API: useEffect, fetch, dependency array, useMemo and useRef",
    lesson_25: "Tailwind/Movie project: layout, responsive classes, search, rating, validation and add/delete",
    lesson_26: "TypeScript/React TS: typing values, props, state, models, union and safe code",
    lesson_27: "TS homework/Budget Manager: Book/User/Transaction models, CRUD, narrowing and summaries",
    lesson_nextjs: "Next.js dashboard: App Router, page/layout, client/server components, route handlers and deployment",
  };

  var LESSON_CONCEPTS = {
    lesson_17: ["HTTP", "URL", "Protocol", "Domain", "Path", "Client", "Server", "Request", "Response", "headers", "REST API", "CRUD", "Create", "Read", "Update", "Delete", "method", "body", "Express", "app", "port", "app.get", "app.post", "app.listen", "middleware", "app.use", "static files", "body-parser", "Route", "JSON", "form", "POST", "GET", "event.preventDefault", "Query Parameters", "Status Codes", "1xx-2xx-3xx", "4xx-5xx"],
    lesson_18: ["Node.js", "Express", "server", "route", "GET", "POST", "form", "validation", "username", "email", "password", "server-side storage"],
    lesson_20: ["Database", "SQL", "NoSQL", "MongoDB", "MongoDB Atlas", "Cluster", "Connection String", "Collection", "Document", "Props", "Value", "JSON", "Mongoose", "Schema", "Model", "insertOne", "insertMany", "find", "findOne", "findOneAndUpdate", "update", "updateMany", "deleteOne", "deleteMany", "$eq", "$gt", "$gte", "$lt", "$lte", "$ne"],
    lesson_21: ["React", "Client Side", "React Native", "Vite", "npm create vite@latest", "npm install", "npm run dev", "index.html", "main.jsx", "App.jsx", "App.css", "Component", "RFC", "JSX", "className", "{}", "props", "import", "export default", "inline style", "CSS import", "map", "rendering"],
    lesson_22: ["Hook", "useState", "state", "setState", "re-render", "mutable", "immutable", "reference", "array reference", "object reference", "onChange", "controlled input", "props", "parent component", "child component", "passing function as prop", "addPost", "deletePost"],
    lesson_23: ["Router", "URL", "Route", "Path", "BrowserRouter", "Routes", "element", "Link", "to", "useNavigate", "dynamic route", "useParams", "Context API", "createContext", "Provider", "value", "useContext", "Prop Drilling", "MainScreen", "AddPost", "PostList"],
    lesson_24: ["useEffect", "side effect", "dependency array", "fetching data", "fetch", "state update", "infinite loop", "useMemo", "expensive calculation", "memoization", "useRef", "ref", "ref.current", "DOM element", "focus", "cleanup"],
    lesson_25: ["Tailwind CSS", "utility classes", "responsive design", "flex", "grid", "padding", "bg color", "rounded", "Tailwind installation", "rating", "search", "add/delete movie", "validation", "navbar"],
    lesson_26: ["TypeScript", "Strongly Typed", "Compiler", "tsc", ".ts", ".js", "tsconfig.json", "type annotation", "string", "number", "boolean", "array type", "tuple", "enum", "void", "readonly", "optional field", "type alias", "React + TypeScript", "Type Safety", "Typing Props", "Typing State", "Function Prop Type", "models folder", "Todo.ts", "interface", "interface vs type", "union", "never", "any"],
    lesson_27: ["type", "enum", "interface", "extends interface", "Union Type", "Type Narrowing", "Book", "Genre", "BaseUser", "GuestUser", "RegisteredUser", "User", "Transaction", "Income", "Expense", "Category", "Amount", "CRUD", "Budget Summary", "Category Breakdown"],
    lesson_nextjs: ["Next.js", "App Router", "file-system routing", "dynamic route", "layout", "page", "server component", "client component", "route handler", "API route", "server action", "SSR", "SSG", "ISR", "metadata API", "SEO", "image optimization", "Vercel deploy"],
  };

  var TARGETED = {
    "lesson_24::useEffect": {
      moreExamples: [
        "בנה ProductList שמבצע fetch בתוך useEffect עם dependency array ריק ומעדכן products ב-state.",
        "כתוב useEffect נוסף שמגיב לשינוי category ומסנן/טוען מחדש נתונים רק כשהקטגוריה משתנה.",
      ],
      pitfalls: [
        "לא לבצע fetch ישירות בגוף הקומפוננטה, כי כל render יריץ בקשה מחדש.",
        "לא לשכוח dependency array; זו הסיבה הנפוצה ל-infinite loop בשאלות hooks.",
      ],
      practiceQuestions: [
        "מתי useEffect רץ אם אין dependency array, אם יש [] ואם יש [category]?",
        "כתוב useEffect שמטען מוצרים ומציג loading/error בלי ליצור לולאת render.",
      ],
    },
    "lesson_24::fetch": {
      moreExamples: [
        "שלוף מוצרים מ-dummyjson.com/products והצג title, price ו-category.",
        "הוסף try/catch או then/catch והצג הודעת שגיאה במקום להשאיר מסך ריק.",
      ],
      pitfalls: [
        "לא להניח שהשרת תמיד מחזיר מערך; בדוק את המבנה לפני map.",
        "לא לקרוא setState אחרי כשל בלי לטפל ב-error או loading.",
      ],
      practiceQuestions: [
        "מה השלבים המדויקים מ-fetch עד הצגת map ב-React?",
        "איזה state צריך: data, loading, error, selectedCategory?",
      ],
    },
    "lesson_25::Tailwind CSS": {
      moreExamples: [
        "בנה כרטיס סרט עם p-4, rounded, bg color, text color ו-layout responsive.",
        "המר CSS רגיל של card ל-utility classes בלי לשנות את המבנה.",
      ],
      pitfalls: [
        "לא לכתוב class דינמי שלא קיים בקוד המקור אם Tailwind לא יכול לסרוק אותו.",
        "לא לערבב layout לא עקבי בין flex/grid בלי סיבה.",
      ],
      practiceQuestions: [
        "איזו מחלקת Tailwind תיתן padding ואיזו תשנה צבע רקע?",
        "מתי תבחר flex ומתי grid בפרויקט סרטים?",
      ],
    },
    "lesson_26::TypeScript": {
      moreExamples: [
        "הגדר type Transaction עם id, title, amount, category ו-kind.",
        "העבר props typed לקומפוננטת TransactionRow בלי any.",
      ],
      pitfalls: [
        "לא להשתמש ב-any כדי להשתיק את TypeScript; זה מבטל את רוב הציון של TS.",
        "לא לשכוח להגדיר טיפוס ל-array state כמו Transaction[].",
      ],
      practiceQuestions: [
        "מה ההבדל בין שגיאת compile של TypeScript לבין שגיאת runtime של JavaScript?",
        "כתוב function שמקבלת Transaction[] ומחזירה סכום בלי any.",
      ],
    },
    "lesson_26::interface vs type": {
      moreExamples: [
        "כתוב interface User ו-type UserRole, ואז השתמש בשניהם בקומפוננטת React.",
        "הראה מקרה שבו type union מתאים יותר מ-interface.",
      ],
      pitfalls: [
        "לא להגיד ששניהם תמיד זהים; interface נוח להרחבת object shape, type נוח ל-union/composition.",
        "לא לערבב שמות לא ברורים כמו Data בכל מקום.",
      ],
      practiceQuestions: [
        "מתי תבחר interface עבור props?",
        "מתי type עדיף בגלל union literals?",
      ],
    },
  };

  function copyList(value) {
    return Array.isArray(value) ? value.slice() : [];
  }

  function defaultExtras(lessonId, concept) {
    var focus = LESSON_FOCUS[lessonId] || "Full Stack exam practice";
    return {
      moreExamples: [
        "תרגול מבחן: שלב את `" + concept + "` בתוך משימה קצרה של " + focus + ".",
        "כתוב דוגמת קוד מינימלית שמראה שימוש נכון ב-`" + concept + "` ואז הסבר בעברית מה כל שורה עושה.",
      ],
      pitfalls: [
        "לא להשאיר את `" + concept + "` כהגדרה תאורטית בלבד; במבחן צריך להראות שימוש עובד.",
        "לא לדלג על validation, error handling או state update כש-`" + concept + "` מופיע בתוך flow מעשי.",
      ],
      practiceQuestions: [
        "איפה `" + concept + "` נכנס בפרויקט 70 נקודות, ומה הוא אמור לפתור?",
        "איזו טעות תגרום ל-`" + concept + "` להוריד נקודות במבחן ואיך תבדוק אותה?",
      ],
    };
  }

  function mergeExtras(base, override) {
    var out = {
      moreExamples: copyList(base.moreExamples),
      pitfalls: copyList(base.pitfalls),
      practiceQuestions: copyList(base.practiceQuestions),
    };
    ["moreExamples", "pitfalls", "practiceQuestions"].forEach(function (field) {
      copyList(override[field]).forEach(function (item) {
        if (out[field].indexOf(item) === -1) out[field].push(item);
      });
    });
    return out;
  }

  Object.keys(LESSON_CONCEPTS).forEach(function (lessonId) {
    LESSON_CONCEPTS[lessonId].forEach(function (concept) {
      var key = lessonId + "::" + concept;
      EXAM_PRACTICE_EXTRAS[key] = mergeExtras(defaultExtras(lessonId, concept), TARGETED[key] || {});
    });
  });

  if (typeof window !== "undefined") {
    window.EXAM_PRACTICE_EXTRAS = EXAM_PRACTICE_EXTRAS;
  }
})();
