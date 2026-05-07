// data/comparisons.js — Side-by-Side Comparator
// X vs Y for commonly-confused concept pairs.
// Each entry: pairKey → { a, b, rows: [{ dim, a, b }], when }
// 16 pairs covering JS, Node/Express, React concepts.

var COMPARISONS = {
  useState_vs_useReducer: {
    pairKey: "useState_vs_useReducer",
    relatedConcepts: ["lesson_22::useState", "lesson_22::setState"],
    a: { name: "useState", icon: "🪝", tagline: "state פשוט" },
    b: { name: "useReducer", icon: "🎛️", tagline: "state מורכב עם actions" },
    rows: [
      { dim: "מתי להשתמש", a: "1-3 שדות בודדים", b: "5+ שדות או logic מורכב" },
      { dim: "API", a: "[value, setValue]", b: "[state, dispatch]" },
      { dim: "עדכון", a: "setValue(newValue)", b: "dispatch({ type: 'X' })" },
      { dim: "סיבוכיות", a: "פשוט מאוד", b: "actions/reducer/types" },
      { dim: "Test", a: "בדיקת הקומפוננטה", b: "בדיקת reducer בנפרד" },
      {
        dim: "DevTools",
        a: "React DevTools",
        b: "Redux-like time travel possible",
      },
    ],
    when: "useState ברוב המקרים. useReducer רק כשיש state machine ברור עם 3+ actions שונות.",
  },

  useMemo_vs_useCallback: {
    pairKey: "useMemo_vs_useCallback",
    relatedConcepts: ["lesson_24::useMemo"],
    a: { name: "useMemo", icon: "🧠", tagline: "memoize ערך" },
    b: { name: "useCallback", icon: "🔁", tagline: "memoize פונקציה" },
    rows: [
      { dim: "מה memoize", a: "ערך שמחושב", b: "פונקציה (callback)" },
      {
        dim: "API",
        a: "useMemo(() => computed, deps)",
        b: "useCallback(fn, deps)",
      },
      {
        dim: "מתי",
        a: "חישוב יקר (filter/sort גדול)",
        b: "function שמועברת ל-child עם React.memo",
      },
      {
        dim: "שקולים",
        a: "useMemo(() => fn, deps)",
        b: "useCallback(fn, deps) — אותו דבר!",
      },
      {
        dim: "Anti-pattern",
        a: "memoize של חישוב זול",
        b: "useCallback בלי React.memo בילד",
      },
    ],
    when: "useMemo לערכים, useCallback לפונקציות. שניהם רק כשיש בעיית performance מדודה.",
  },

  useEffect_vs_useLayoutEffect: {
    pairKey: "useEffect_vs_useLayoutEffect",
    relatedConcepts: ["lesson_24::useEffect"],
    a: { name: "useEffect", icon: "⚙️", tagline: "אחרי paint (default)" },
    b: { name: "useLayoutEffect", icon: "📐", tagline: "לפני paint (sync)" },
    rows: [
      {
        dim: "מתי רץ",
        a: "אחרי הרינדור והציור למסך",
        b: "אחרי DOM mutation, לפני paint",
      },
      {
        dim: "Block UI?",
        a: "לא — async-like",
        b: "כן — blocking. אם אטי = jank",
      },
      {
        dim: "Use case",
        a: "fetch, subscriptions, timers",
        b: "מדידת DOM (height/width), prevent flicker",
      },
      { dim: "SSR", a: "בטוח — לא רץ ב-server", b: "אזהרה ב-server (אין DOM)" },
      { dim: "Default", a: "✅ ברוב המקרים", b: "רק כש-flicker visible" },
    ],
    when: "תמיד useEffect, אלא אם יש flicker שצריך למדוד DOM ולשנות לפני paint.",
  },

  props_vs_state: {
    pairKey: "props_vs_state",
    relatedConcepts: ["lesson_22::props", "lesson_22::state"],
    a: { name: "props", icon: "📨", tagline: "מאב לבן" },
    b: { name: "state", icon: "📦", tagline: "פנימי לקומפוננטה" },
    rows: [
      { dim: "מקור", a: "קומפוננטת אב", b: "useState/useReducer בקומפוננטה" },
      { dim: "Mutability", a: "Read-only — אל תשנה!", b: "Mutable דרך setter" },
      {
        dim: "טריגר re-render",
        a: "כשאב שולח props חדשים",
        b: "כש-setState נקרא",
      },
      { dim: "כיוון זרימה", a: "אב → בן (מטה בלבד)", b: "בתוך אותה קומפוננטה" },
      { dim: "Testing", a: "pass mock props", b: "render + interact" },
    ],
    when: "props לתקשורת מאב, state לליבה פנימית. אם state ב-2 ילדים — להעלות ל-parent (lifting).",
  },

  controlled_vs_uncontrolled: {
    pairKey: "controlled_vs_uncontrolled",
    relatedConcepts: ["lesson_22::controlled input"],
    a: { name: "Controlled", icon: "🎮", tagline: "React מנהל" },
    b: { name: "Uncontrolled", icon: "🤝", tagline: "DOM מנהל" },
    rows: [
      { dim: "value", a: "value={state}", b: "defaultValue + ref" },
      {
        dim: "onChange",
        a: "חובה, מעדכן state",
        b: "אופציונלי, ערך נשלף עם ref",
      },
      { dim: "Validation", a: "בכל קלדה", b: "ב-submit בלבד" },
      {
        dim: "Performance",
        a: "render בכל אות",
        b: "DOM-native, אפס re-renders",
      },
      {
        dim: "Best for",
        a: "validation, formatting, conditional UI",
        b: "טפסים פשוטים, file inputs",
      },
    ],
    when: "Controlled = standard ב-React. Uncontrolled רק לטפסי file גדולים שעובדים בלי validation.",
  },

  css_grid_vs_flexbox: {
    pairKey: "css_grid_vs_flexbox",
    relatedConcepts: ["lesson_04::CSS Grid", "lesson_04::flexbox"],
    a: { name: "Flexbox", icon: "📏", tagline: "1D layout" },
    b: { name: "CSS Grid", icon: "🔲", tagline: "2D layout" },
    rows: [
      {
        dim: "ממדים",
        a: "ציר אחד (row או column)",
        b: "שני ממדים (rows + columns)",
      },
      {
        dim: "גודל",
        a: "content-driven (גודל לפי תוכן)",
        b: "container-driven (גודל לפי grid)",
      },
      {
        dim: "Use case",
        a: "Navbar, button group, רשימה",
        b: "Page layout, dashboard, gallery",
      },
      {
        dim: "Properties",
        a: "flex-direction, justify-content, align-items",
        b: "grid-template-columns/rows, grid-area",
      },
      { dim: "אופטימלי ל", a: "אלמנטים בשורה/עמודה", b: "Layout דו-ממדי שלם" },
    ],
    when: "Grid לpage layout. Flex לרכיבים בתוכו. שילוב = הדרך הנפוצה.",
  },

  promise_vs_asyncawait: {
    pairKey: "promise_vs_asyncawait",
    relatedConcepts: ["lesson_15::Promise", "lesson_15::Async"],
    a: { name: "Promise .then()", icon: "🤝", tagline: "שרשרת callbacks" },
    b: { name: "async/await", icon: "⏳", tagline: "קוד סינכרוני-נראה" },
    rows: [
      {
        dim: "תחביר",
        a: ".then(res => ...).catch(err => ...)",
        b: "await בתוך async + try/catch",
      },
      { dim: "קריאות", a: "chain ארוך נעשה מסובך", b: "נקרא כמו קוד סינכרוני" },
      { dim: "שגיאות", a: ".catch() בסוף השרשרת", b: "try/catch סטנדרטי" },
      {
        dim: "מקביליות",
        a: "Promise.all([p1,p2]) — נוח",
        b: "await Promise.all([...]) — אפשרי",
      },
      {
        dim: "Debugging",
        a: "stack trace פחות נוח",
        b: "stack trace ברור יותר",
      },
      { dim: "עבור מי", a: "ES6+, promises ישנים", b: "ES2017+, כל קוד חדש" },
    ],
    when: "async/await ברירת מחדל. Promise.all() כשמקבילים מספר בקשות (לא await בלולאה!).",
  },

  localStorage_vs_sessionStorage: {
    pairKey: "localStorage_vs_sessionStorage",
    relatedConcepts: ["lesson_14::localStorage"],
    a: { name: "localStorage", icon: "💾", tagline: "נשמר לצמיתות" },
    b: { name: "sessionStorage", icon: "🗂️", tagline: "נמחק עם הטאב" },
    rows: [
      { dim: "משך שמירה", a: "עד מחיקה ידנית", b: "עד סגירת הטאב/חלון" },
      { dim: "גישה", a: "כל הטאבים של אותו origin", b: "רק הטאב שיצר" },
      { dim: "גודל", a: "~5MB", b: "~5MB" },
      {
        dim: "Use case",
        a: "העדפות משתמש, token, ניגון",
        b: "מצב זמני, wizard steps, ניווט",
      },
      {
        dim: "API",
        a: "localStorage.setItem/getItem",
        b: "sessionStorage.setItem/getItem",
      },
    ],
    when: "localStorage לנתונים שצריכים להתמיד בין סשנים. sessionStorage לנתונים זמניים בלבד.",
  },

  get_vs_post: {
    pairKey: "get_vs_post",
    relatedConcepts: [
      "lesson_17::GET",
      "lesson_17::POST",
      "lesson_18::GET",
      "lesson_18::POST",
    ],
    a: { name: "GET", icon: "📥", tagline: "בקש מידע" },
    b: { name: "POST", icon: "📤", tagline: "שלח נתונים" },
    rows: [
      {
        dim: "גוף (Body)",
        a: "אין — פרמטרים ב-URL",
        b: "יש — נתונים מוסתרים ב-body",
      },
      {
        dim: "Idempotent?",
        a: "✅ כן — אפשר לשלוח שוב",
        b: "❌ לא — כל שליחה עלולה ליצור רשומה",
      },
      { dim: "Cacheable?", a: "✅ כן", b: "❌ לא" },
      { dim: "אורך נתונים", a: "מוגבל (~2048 תווים)", b: "כמעט ללא הגבלה" },
      { dim: "אבטחה", a: "נתונים גלויים ב-URL", b: "נתונים לא גלויים ב-URL" },
      { dim: "שימוש", a: "קריאת עמוד, חיפוש", b: "הרשמה, סיסמה, העלאת קובץ" },
    ],
    when: "GET לכל בקשת קריאה. POST לכל שליחת נתונים — במיוחד כשמדובר בנתונים רגישים.",
  },

  require_vs_import: {
    pairKey: "require_vs_import",
    relatedConcepts: ["lesson_17::Express"],
    a: { name: "require()", icon: "📦", tagline: "CommonJS (Node)" },
    b: { name: "import", icon: "📥", tagline: "ES Modules (עדכני)" },
    rows: [
      {
        dim: "סביבה",
        a: "Node.js (ברירת מחדל)",
        b: "Browser + Node עם type:module",
      },
      { dim: "זמן טעינה", a: "Runtime (דינמי)", b: "Static — ידוע בזמן הידור" },
      { dim: "Treeshaking", a: "❌ לא נתמך", b: "✅ נתמך — קוד מת מוסר" },
      {
        dim: "תחביר ייצוא",
        a: "module.exports = { ... }",
        b: "export default / export const",
      },
      {
        dim: "Named imports",
        a: "const { x } = require('mod')",
        b: "import { x } from 'mod'",
      },
      { dim: "Top-level await", a: "❌", b: "✅ ב-ESM" },
    ],
    when: "require() בפרויקטי Node ישנים. import בפרויקטי Vite/React/ESM חדשים. אל תערבב!",
  },

  callback_vs_promise: {
    pairKey: "callback_vs_promise",
    relatedConcepts: ["lesson_15::Promise", "lesson_15::Fetch"],
    a: { name: "Callback", icon: "📞", tagline: "פונקציה שמועברת" },
    b: { name: "Promise", icon: "🤝", tagline: "ערך עתידי" },
    rows: [
      {
        dim: "קריאות",
        a: "Callback Hell כשמשרשרים",
        b: ".then() chain — קריא יותר",
      },
      {
        dim: "שגיאות",
        a: "בכל callback בנפרד (if err)",
        b: "catch() אחד בסוף",
      },
      {
        dim: "הרכב מקביל",
        a: "קשה — nested callbacks",
        b: "קל — Promise.all/race/any",
      },
      {
        dim: "Standard APIs",
        a: "fs.readFile, setTimeout (ישנים)",
        b: "fetch, axios (חדשים)",
      },
      { dim: "Debugging", a: "stack trace עמוק", b: "stack trace נוח יותר" },
    ],
    when: "Promises (ובעיקר async/await) לכל קוד חדש. Callback רק עם APIs ישנים שלא מחזירים Promise.",
  },

  let_vs_const: {
    pairKey: "let_vs_const",
    relatedConcepts: ["lesson_11::let", "lesson_11::const"],
    a: { name: "let", icon: "✏️", tagline: "ניתן לשינוי" },
    b: { name: "const", icon: "🔒", tagline: "לא ניתן להשמה מחדש" },
    rows: [
      { dim: "השמה מחדש", a: "✅ x = 5 — עובד", b: "❌ x = 5 — שגיאה!" },
      {
        dim: "Mutate object/array",
        a: "✅ obj.x = 1",
        b: "✅ obj.x = 1 — רק הסימוכין קבוע",
      },
      { dim: "Scope", a: "Block scope", b: "Block scope" },
      { dim: "ברירת מחדל", a: "כשהערך ישתנה", b: "כמעט תמיד — מונע bugs" },
      {
        dim: "Best practice",
        a: "לולאות, ערכים שמתעדכנים",
        b: "כברירת מחדל — קוד פרדיקטיבי",
      },
    ],
    when: "const ברירת מחדל. let רק כשאתה יודע שהערך ישתנה (לולאה, accumulator).",
  },

  map_vs_forEach: {
    pairKey: "map_vs_forEach",
    relatedConcepts: ["lesson_11::map", "lesson_12::forEach"],
    a: { name: "map()", icon: "🗺️", tagline: "מחזיר מערך חדש" },
    b: { name: "forEach()", icon: "🔄", tagline: "לא מחזיר כלום" },
    rows: [
      { dim: "ערך מוחזר", a: "מערך חדש (transformed)", b: "undefined תמיד" },
      {
        dim: "שימוש",
        a: "arr.map(x => x*2) — נתונים חדשים",
        b: "side effects: log, DOM, setState",
      },
      {
        dim: "Chaining",
        a: ".map().filter().reduce() — אפשרי",
        b: "❌ אי אפשר לשרשר",
      },
      { dim: "Immutability", a: "לא משנה את המקור", b: "לא משנה את המקור" },
      {
        dim: "ב-React JSX",
        a: "✅ { arr.map(x => <Item />) }",
        b: "❌ לא מחזיר JSX לרינדור",
      },
    ],
    when: "map() כשצריך מערך חדש. forEach() רק לside effects (log, DOM). בReact — תמיד map().",
  },

  middleware_vs_route: {
    pairKey: "middleware_vs_route",
    relatedConcepts: ["lesson_17::middleware", "lesson_18::route"],
    a: { name: "Middleware", icon: "🔗", tagline: "פועל על כל בקשה" },
    b: { name: "Route", icon: "🛤️", tagline: "path ספציפי" },
    rows: [
      { dim: "הגדרה", a: "app.use(fn) — ללא path", b: "app.get('/path', fn)" },
      {
        dim: "מתי רץ",
        a: "לכל בקשה (אלא אם use('/path'))",
        b: "רק כש-method + path תואמים",
      },
      {
        dim: "next()",
        a: "חובה להמשיך בשרשרת",
        b: "אופציונלי (רק לerror handler)",
      },
      {
        dim: "דוגמאות",
        a: "express.json(), cors(), logger, auth",
        b: "app.post('/login'), app.get('/users')",
      },
      {
        dim: "סדר",
        a: "חשוב! middleware לפני routes",
        b: "pattern matching שורה שורה",
      },
    ],
    when: "middleware ללוגיקה חוצת-בקשות (auth, parsing, logging). route לביצוע עסקאות ספציפיות.",
  },

  ref_vs_state_react: {
    pairKey: "ref_vs_state_react",
    relatedConcepts: ["lesson_24::useRef", "lesson_22::useState"],
    a: { name: "useRef", icon: "📌", tagline: "ללא re-render" },
    b: { name: "useState", icon: "🪝", tagline: "עם re-render" },
    rows: [
      { dim: "שינוי גורם re-render?", a: "❌ לא", b: "✅ כן" },
      {
        dim: "גישה לDOM",
        a: "✅ ref.current = DOM element",
        b: "❌ לא מיועד לכך",
      },
      { dim: "ערך נמשך בין renders?", a: "✅ כן", b: "✅ כן" },
      {
        dim: "מתי",
        a: "timer ID, focus, previous value, DOM",
        b: "כל UI שצריך לחידוש",
      },
      { dim: "עדכון", a: "ref.current = newVal (ישיר)", b: "setState(newVal)" },
    ],
    when: "useState כשהUI צריך להתעדכן. useRef כשצריך לזכור ערך בין renders בלי לגרום לרינדור.",
  },

  json_vs_urlencoded: {
    pairKey: "json_vs_urlencoded",
    relatedConcepts: ["lesson_18::POST", "lesson_17::JSON"],
    a: { name: "application/json", icon: "📋", tagline: "fetch / axios" },
    b: { name: "urlencoded", icon: "📝", tagline: "טופס HTML" },
    rows: [
      {
        dim: "Content-Type",
        a: "application/json",
        b: "application/x-www-form-urlencoded",
      },
      {
        dim: "גוף הבקשה",
        a: "JSON.stringify({ key: val })",
        b: "key=val&key2=val2",
      },
      { dim: "נשלח מ", a: "fetch/axios עם JS", b: "<form method='POST'> HTML" },
      {
        dim: "Express parse",
        a: "express.json()",
        b: "express.urlencoded({ extended: true })",
      },
      {
        dim: "מבנה",
        a: "כל מבנה — מערכים, nested objects",
        b: "flat בלבד (מפתח=ערך)",
      },
      {
        dim: "נפוץ ב",
        a: "REST APIs, SPA apps",
        b: "טפסי HTML ישנים / פשוטים",
      },
    ],
    when: "express.json() עבור fetch/axios. express.urlencoded() עבור טפסי HTML. אפשר שניהם ביחד!",
  },
};

// SVCollege exam gap closure — comparison tables attached to real lesson keys.
// The goal is practical exam distinction: when to use X, when to use Y, and what loses points.
function addExamComparison(cmp) {
  if (!cmp || !cmp.pairKey || COMPARISONS[cmp.pairKey]) return;
  COMPARISONS[cmp.pairKey] = cmp;
}

[
  {
    pairKey: "exam_l17_http_address_vs_payload",
    relatedConcepts: ["lesson_17::HTTP", "lesson_17::URL", "lesson_17::Protocol", "lesson_17::Domain", "lesson_17::Path", "lesson_17::headers"],
    a: { name: "URL/Headers", icon: "🌐", tagline: "כתובת ומטא־מידע" },
    b: { name: "Body", icon: "📦", tagline: "תוכן הבקשה" },
    rows: [
      { dim: "מיקום", a: "URL/path/query/header", b: "request body" },
      { dim: "משמש ל", a: "לאן לשלוח ואיך לפרש", b: "איזה נתונים ליצור/לעדכן" },
      { dim: "במבחן", a: "route ו-query נכונים", b: "express.json() ו-validation" },
    ],
    when: "כתובת ב-URL/route. נתונים של טופס או יצירה ב-body.",
  },
  {
    pairKey: "exam_l17_client_vs_server_flow",
    relatedConcepts: ["lesson_17::Client", "lesson_17::Server", "lesson_17::Request", "lesson_17::Response", "lesson_17::Status Codes", "lesson_17::1xx-2xx-3xx", "lesson_17::4xx-5xx"],
    a: { name: "Client Request", icon: "📤", tagline: "הדפדפן מבקש" },
    b: { name: "Server Response", icon: "📥", tagline: "השרת עונה" },
    rows: [
      { dim: "כיוון", a: "frontend -> backend", b: "backend -> frontend" },
      { dim: "כולל", a: "method, url, headers, body", b: "status, headers, json/html" },
      { dim: "בדיקה", a: "fetch/axios נשלח נכון", b: "status + body תואמים לשאלה" },
    ],
    when: "בכל API flow: קודם מזהים request, אחר כך response ו-status.",
  },
  {
    pairKey: "exam_l17_rest_crud_mapping",
    relatedConcepts: ["lesson_17::REST API", "lesson_17::CRUD", "lesson_17::Create", "lesson_17::Read", "lesson_17::Update", "lesson_17::Delete", "lesson_17::method", "lesson_17::POST", "lesson_17::GET"],
    a: { name: "CRUD פעולה", icon: "🧩", tagline: "מה רוצים לעשות" },
    b: { name: "HTTP Method", icon: "🛣️", tagline: "איך קוראים לשרת" },
    rows: [
      { dim: "Create", a: "הוספת רשומה", b: "POST" },
      { dim: "Read", a: "קריאת רשומות", b: "GET" },
      { dim: "Update/Delete", a: "שינוי או מחיקה", b: "PUT/PATCH/DELETE או POST אם כך נדרש בשאלה" },
    ],
    when: "מתחילים מהפעולה העסקית, ואז ממפים ל-method וה-route שהשאלה דורשת.",
  },
  {
    pairKey: "exam_l17_express_route_vs_app_setup",
    relatedConcepts: ["lesson_17::Express", "lesson_17::app", "lesson_17::port", "lesson_17::app.get", "lesson_17::app.post", "lesson_17::app.listen", "lesson_17::Route"],
    a: { name: "App setup", icon: "⚙️", tagline: "השרת עולה" },
    b: { name: "Route handler", icon: "🛤️", tagline: "בקשה ספציפית" },
    rows: [
      { dim: "קוד", a: "express(), app.use(), app.listen()", b: "app.get/post('/path', handler)" },
      { dim: "אחריות", a: "הגדרות כלליות", b: "לוגיקת endpoint" },
      { dim: "טעות נפוצה", a: "listen חסר", b: "path/method לא תואמים ל-fetch" },
    ],
    when: "Setup פעם אחת בתחילת server.js; routes לפי דרישות המבחן.",
  },
  {
    pairKey: "exam_l17_middleware_vs_request_data",
    relatedConcepts: ["lesson_17::middleware", "lesson_17::app.use", "lesson_17::static files", "lesson_17::body-parser", "lesson_17::JSON", "lesson_17::form", "lesson_17::event.preventDefault", "lesson_17::Query Parameters", "lesson_17::body"],
    a: { name: "Middleware", icon: "🔗", tagline: "מכין את הבקשה" },
    b: { name: "Request data", icon: "🧾", tagline: "הנתונים בפועל" },
    rows: [
      { dim: "תפקיד", a: "parsing, cors, static", b: "req.body / req.query / req.params" },
      { dim: "סדר", a: "לפני routes", b: "נקרא בתוך handler" },
      { dim: "במבחן", a: "express.json() לפני POST", b: "validation על הנתונים" },
    ],
    when: "אם req.body ריק, קודם בודקים middleware וסדר טעינה.",
  },
  {
    pairKey: "exam_l18_frontend_vs_backend_validation",
    relatedConcepts: ["lesson_18::Node.js", "lesson_18::Express", "lesson_18::server", "lesson_18::route", "lesson_18::validation", "lesson_18::server-side storage"],
    a: { name: "Frontend validation", icon: "🧪", tagline: "מהיר למשתמש" },
    b: { name: "Backend validation", icon: "🛡️", tagline: "שומר על הנתונים" },
    rows: [
      { dim: "מיקום", a: "לפני fetch/submit", b: "בתוך route לפני save" },
      { dim: "סמכות", a: "נוחות וחיווי", b: "חובה אבטחתית" },
      { dim: "טעות", a: "שולח למרות error", b: "שומר נתונים לא תקינים" },
    ],
    when: "עושים שניהם. במבחן לא מסתפקים בצד אחד.",
  },
  {
    pairKey: "exam_l18_form_identity_fields",
    relatedConcepts: ["lesson_18::GET", "lesson_18::POST", "lesson_18::form", "lesson_18::username", "lesson_18::email", "lesson_18::password"],
    a: { name: "Identity fields", icon: "👤", tagline: "username/email/password" },
    b: { name: "Submit route", icon: "📨", tagline: "GET/POST" },
    rows: [
      { dim: "שדות", a: "נבדקים לפי חוקים", b: "נשלחים ל-route" },
      { dim: "GET", a: "מציג טופס/עמוד", b: "לא יוצר משתמש" },
      { dim: "POST", a: "בודק ושומר", b: "מחזיר success/error" },
    ],
    when: "GET למסך, POST לפעולה. שדות זהות חייבים validation ספציפי.",
  },
  {
    pairKey: "exam_l20_sql_vs_nosql",
    relatedConcepts: ["lesson_20::Database", "lesson_20::SQL", "lesson_20::NoSQL", "lesson_20::MongoDB", "lesson_20::MongoDB Atlas", "lesson_20::Cluster", "lesson_20::Connection String"],
    a: { name: "SQL", icon: "🧮", tagline: "טבלאות וקשרים" },
    b: { name: "MongoDB/NoSQL", icon: "🍃", tagline: "מסמכים גמישים" },
    rows: [
      { dim: "מבנה", a: "tables/rows", b: "collections/documents" },
      { dim: "Schema", a: "קשיח בדאטהבייס", b: "גמיש, לרוב נאכף דרך Mongoose" },
      { dim: "במבחן", a: "פחות צפוי בפרויקט הזה", b: "Schema/Model/CRUD צפויים מאוד" },
    ],
    when: "למבחן SVCollege הנוכחי מתמקדים ב-MongoDB + Mongoose.",
  },
  {
    pairKey: "exam_l20_collection_document_json",
    relatedConcepts: ["lesson_20::Collection", "lesson_20::Document", "lesson_20::Props", "lesson_20::Value", "lesson_20::JSON"],
    a: { name: "Collection", icon: "🗂️", tagline: "קבוצה" },
    b: { name: "Document", icon: "📄", tagline: "רשומה אחת" },
    rows: [
      { dim: "מקביל", a: "טבלה", b: "שורה/אובייקט JSON" },
      { dim: "כולל", a: "הרבה documents", b: "props + values" },
      { dim: "דוגמת מבחן", a: "tasks/employees", b: "{ title, done } או { name, age }" },
    ],
    when: "Schema מגדיר איך document אמור להיראות בתוך collection.",
  },
  {
    pairKey: "exam_l20_schema_vs_model",
    relatedConcepts: ["lesson_20::Mongoose", "lesson_20::Schema", "lesson_20::Model"],
    a: { name: "Schema", icon: "📐", tagline: "מבנה שדות" },
    b: { name: "Model", icon: "🏭", tagline: "API לעבודה מול Mongo" },
    rows: [
      { dim: "תפקיד", a: "name/type/required/default", b: "find/create/update/delete" },
      { dim: "נוצר עם", a: "new mongoose.Schema(...)", b: "mongoose.model('Name', schema)" },
      { dim: "טעות נפוצה", a: "שדה חסר/טיפוס שגוי", b: "קוראים ל-find על schema במקום model" },
    ],
    when: "Schema מתאר; Model מבצע פעולות.",
  },
  {
    pairKey: "exam_l20_insert_find_update_delete",
    relatedConcepts: ["lesson_20::insertOne", "lesson_20::insertMany", "lesson_20::find", "lesson_20::findOne", "lesson_20::findOneAndUpdate", "lesson_20::update", "lesson_20::updateMany", "lesson_20::deleteOne", "lesson_20::deleteMany"],
    a: { name: "Single document", icon: "1️⃣", tagline: "אחד" },
    b: { name: "Many documents", icon: "🔢", tagline: "כמה" },
    rows: [
      { dim: "Create", a: "insertOne/create", b: "insertMany" },
      { dim: "Read", a: "findOne", b: "find" },
      { dim: "Update/Delete", a: "findOneAndUpdate/deleteOne", b: "updateMany/deleteMany" },
    ],
    when: "אם השאלה אומרת כל העובדים/כל המשימות, צריך many. אם מזהה אחד, single.",
  },
  {
    pairKey: "exam_l20_query_operators",
    relatedConcepts: ["lesson_20::$eq", "lesson_20::$gt", "lesson_20::$gte", "lesson_20::$lt", "lesson_20::$lte", "lesson_20::$ne"],
    a: { name: "Equality", icon: "=", tagline: "$eq / $ne" },
    b: { name: "Range", icon: "↔️", tagline: "$gt/$gte/$lt/$lte" },
    rows: [
      { dim: "שימוש", a: "ערך שווה או לא שווה", b: "טווח מספרי/תאריך" },
      { dim: "דוגמה", a: "{ status: { $eq: 'open' } }", b: "{ age: { $gte: 18, $lte: 60 } }" },
      { dim: "מבחן", a: "duplicate/status", b: "גיל, מחיר, כמות" },
    ],
    when: "בכל filter ב-Mongo בוחרים operator לפי הדרישה המדויקת.",
  },
  {
    pairKey: "exam_l21_react_vs_runtime_setup",
    relatedConcepts: ["lesson_21::React", "lesson_21::Client Side", "lesson_21::React Native", "lesson_21::Vite", "lesson_21::npm create vite@latest", "lesson_21::npm install", "lesson_21::npm run dev"],
    a: { name: "React app", icon: "⚛️", tagline: "UI בדפדפן" },
    b: { name: "Project setup", icon: "🧰", tagline: "Vite/npm" },
    rows: [
      { dim: "מה זה", a: "קומפוננטות ו-render", b: "יצירה והרצה של הפרויקט" },
      { dim: "פקודות", a: "לא פקודה", b: "npm create/install/run dev" },
      { dim: "מבחן", a: "לבנות UI", b: "להרים סביבת עבודה מהר" },
    ],
    when: "ביום מבחן: setup עד 30 דקות, ואז להתמקד בקומפוננטות.",
  },
  {
    pairKey: "exam_l21_entry_files_vs_components",
    relatedConcepts: ["lesson_21::index.html", "lesson_21::main.jsx", "lesson_21::App.jsx", "lesson_21::App.css", "lesson_21::Component", "lesson_21::RFC"],
    a: { name: "Entry files", icon: "🚪", tagline: "איפה React מתחיל" },
    b: { name: "Components", icon: "🧱", tagline: "מה בונים" },
    rows: [
      { dim: "תפקיד", a: "index/main מחברים ל-root", b: "Header, Dashboard, Footer, forms" },
      { dim: "עריכה במבחן", a: "מעט מאוד", b: "רוב העבודה" },
      { dim: "טעות", a: "root לא מחובר", b: "קומפוננטה לא מיוצאת/מיובאת" },
    ],
    when: "לא מבזבזים זמן על main.jsx אחרי שהוא עובד; עוברים למסכים.",
  },
  {
    pairKey: "exam_l21_jsx_style_data",
    relatedConcepts: ["lesson_21::JSX", "lesson_21::className", "lesson_21::{}", "lesson_21::props", "lesson_21::inline style", "lesson_21::CSS import", "lesson_21::map", "lesson_21::rendering", "lesson_21::import", "lesson_21::export default"],
    a: { name: "JSX/Data", icon: "🧬", tagline: "props, {}, map" },
    b: { name: "Style/Module", icon: "🎨", tagline: "className/CSS/import" },
    rows: [
      { dim: "JSX", a: "מציג data ומפעיל map", b: "מקבל className/style" },
      { dim: "קבצים", a: "component props", b: "CSS import או inline style" },
      { dim: "מבחן", a: "רשימות וטפסים", b: "layout לפי תמונה" },
    ],
    when: "JSX פותר מבנה ונתונים; style פותר התאמה לתמונה.",
  },
  {
    pairKey: "exam_l22_state_mutation_flow",
    relatedConcepts: ["lesson_22::Hook", "lesson_22::useState", "lesson_22::state", "lesson_22::setState", "lesson_22::re-render", "lesson_22::mutable", "lesson_22::immutable", "lesson_22::reference", "lesson_22::array reference", "lesson_22::object reference"],
    a: { name: "Mutable update", icon: "⚠️", tagline: "משנה את המקור" },
    b: { name: "Immutable update", icon: "✅", tagline: "יוצר reference חדש" },
    rows: [
      { dim: "React מזהה?", a: "לפעמים לא", b: "כן, reference חדש" },
      { dim: "מערך", a: "push/splice על המקור", b: "map/filter/spread" },
      { dim: "מבחן", a: "עלול לא לרנדר", b: "הדרך הנכונה ל-add/delete/edit" },
    ],
    when: "כל state בפרויקט React מתעדכן immutable.",
  },
  {
    pairKey: "exam_l22_forms_parent_child",
    relatedConcepts: ["lesson_22::onChange", "lesson_22::controlled input", "lesson_22::props", "lesson_22::parent component", "lesson_22::child component", "lesson_22::passing function as prop", "lesson_22::addPost", "lesson_22::deletePost"],
    a: { name: "Form state", icon: "📝", tagline: "input נשלט" },
    b: { name: "Parent action", icon: "⬆️", tagline: "פונקציה כ-prop" },
    rows: [
      { dim: "מיקום", a: "בתוך הטופס", b: "ב-parent שמחזיק list" },
      { dim: "זרימה", a: "onChange -> state", b: "onSubmit -> onAdd/onDelete" },
      { dim: "טעות", a: "input בלי value/onChange", b: "child משנה list לבד" },
    ],
    when: "טופס מנהל שדות; parent מנהל רשימה ופעולות CRUD.",
  },
  {
    pairKey: "exam_l23_route_building_blocks",
    relatedConcepts: ["lesson_23::Router", "lesson_23::URL", "lesson_23::Route", "lesson_23::Path", "lesson_23::BrowserRouter", "lesson_23::Routes", "lesson_23::element", "lesson_23::Link", "lesson_23::to", "lesson_23::useNavigate"],
    a: { name: "Route config", icon: "🧭", tagline: "Routes/Route/path/element" },
    b: { name: "Navigation", icon: "➡️", tagline: "Link/useNavigate/to" },
    rows: [
      { dim: "תפקיד", a: "מגדיר איזה מסך לנתיב", b: "מעביר משתמש לנתיב" },
      { dim: "Declarative", a: "<Route />", b: "<Link to='...' />" },
      { dim: "Programmatic", a: "לא", b: "useNavigate()" },
    ],
    when: "קודם מגדירים routes, אחר כך מחברים כפתורים וקישורים.",
  },
  {
    pairKey: "exam_l23_dynamic_vs_context",
    relatedConcepts: ["lesson_23::dynamic route", "lesson_23::useParams", "lesson_23::Context API", "lesson_23::createContext", "lesson_23::Provider", "lesson_23::value", "lesson_23::useContext", "lesson_23::Prop Drilling", "lesson_23::MainScreen", "lesson_23::AddPost", "lesson_23::PostList"],
    a: { name: "Dynamic route", icon: "🧷", tagline: "נתון מתוך URL" },
    b: { name: "Context", icon: "🌐", tagline: "state משותף" },
    rows: [
      { dim: "מקור נתון", a: "params מתוך path", b: "Provider value" },
      { dim: "מתאים ל", a: "id/name של מסך", b: "user/theme/list actions" },
      { dim: "טעות", a: "שכחת useParams", b: "Provider לא עוטף את הילדים" },
    ],
    when: "URL לזהות מסך; Context לשיתוף נתונים בלי prop drilling.",
  },
  {
    pairKey: "exam_l24_effect_vs_render_body",
    relatedConcepts: ["lesson_24::useEffect", "lesson_24::side effect", "lesson_24::state update"],
    a: { name: "Render body", icon: "🔁", tagline: "חישוב תצוגה" },
    b: { name: "useEffect", icon: "⚙️", tagline: "side effect אחרי render" },
    rows: [
      { dim: "מותר", a: "חישוב JSX/derived data קל", b: "fetch, timer, DOM subscription" },
      { dim: "סיכון", a: "setState/fetch יגרמו loop", b: "deps לא נכונים יגרמו loop" },
      { dim: "מבחן", a: "לא מבצעים בקשות כאן", b: "מקום נכון לטעינת API" },
    ],
    when: "כל פעולה שמשפיעה מחוץ לרינדור עוברת ל-useEffect.",
  },
  {
    pairKey: "exam_l24_dependency_modes",
    relatedConcepts: ["lesson_24::dependency array", "lesson_24::infinite loop", "lesson_24::cleanup"],
    a: { name: "ללא deps", icon: "♾️", tagline: "רץ בכל render" },
    b: { name: "deps מוגדרים", icon: "🎯", tagline: "[] או [value]" },
    rows: [
      { dim: "תדירות", a: "כל render", b: "פעם אחת או כש-value משתנה" },
      { dim: "סיכון", a: "loop אם יש setState", b: "stale data אם חסר dependency" },
      { dim: "cleanup", a: "קשה לשלוט", b: "return cleanup לפי effect" },
    ],
    when: "במבחן כמעט תמיד מגדירים deps מפורשים.",
  },
  {
    pairKey: "exam_l24_fetch_flow_vs_render_flow",
    relatedConcepts: ["lesson_24::fetching data", "lesson_24::fetch", "lesson_24::state update", "lesson_24::cleanup"],
    a: { name: "Fetch flow", icon: "🌍", tagline: "API -> state" },
    b: { name: "Render flow", icon: "🖼️", tagline: "state -> UI" },
    rows: [
      { dim: "סדר", a: "loading -> fetch -> json -> setState", b: "state משתנה -> map/filter -> JSX" },
      { dim: "שגיאות", a: "catch/error state", b: "empty/loading/error state" },
      { dim: "במבחן", a: "dummyjson/API אמיתי", b: "לא להשאיר מסך ריק" },
    ],
    when: "קודם מביאים נתונים בבטחה, אחר כך מרנדרים לפי state.",
  },
  {
    pairKey: "exam_l24_memo_vs_plain_calculation",
    relatedConcepts: ["lesson_24::useMemo", "lesson_24::expensive calculation", "lesson_24::memoization"],
    a: { name: "Plain calculation", icon: "🧮", tagline: "כל render" },
    b: { name: "useMemo", icon: "🧠", tagline: "רק כשה-deps משתנים" },
    rows: [
      { dim: "עלות", a: "טוב לחישוב זול", b: "טוב ל-filter/sort יקר" },
      { dim: "API", a: "const x = calc()", b: "useMemo(() => calc(), [deps])" },
      { dim: "טעות", a: "חישוב יקר בכל render", b: "memoization בלי צורך" },
    ],
    when: "useMemo רק לחישוב מורגש או רשימה גדולה.",
  },
  {
    pairKey: "exam_l24_ref_dom_focus",
    relatedConcepts: ["lesson_24::useRef", "lesson_24::ref", "lesson_24::ref.current", "lesson_24::DOM element", "lesson_24::focus"],
    a: { name: "DOM ref", icon: "📌", tagline: "ref.current" },
    b: { name: "State value", icon: "🪝", tagline: "value/setValue" },
    rows: [
      { dim: "re-render", a: "לא", b: "כן" },
      { dim: "DOM", a: "inputRef.current.focus()", b: "לא נועד לגישה ישירה ל-DOM" },
      { dim: "מבחן", a: "auto focus לשדה", b: "input value ו-validation" },
    ],
    when: "ref ל-DOM/focus; state לערך שמוצג ב-UI.",
  },
  {
    pairKey: "exam_l25_tailwind_vs_css",
    relatedConcepts: ["lesson_25::Tailwind CSS", "lesson_25::utility classes", "lesson_25::Tailwind installation"],
    a: { name: "Tailwind utilities", icon: "⚡", tagline: "class קצר ב-JSX" },
    b: { name: "CSS רגיל", icon: "🎨", tagline: "קובץ style נפרד" },
    rows: [
      { dim: "מיקום", a: "className", b: ".css" },
      { dim: "מהירות מבחן", a: "גבוהה", b: "יותר הקשר וקבצים" },
      { dim: "טעות", a: "class דינמי לא נסרק", b: "selector לא מחובר" },
    ],
    when: "במבחן Tailwind עדיף כשנדרש layout מהיר לפי תמונה.",
  },
  {
    pairKey: "exam_l25_flex_vs_grid_layout",
    relatedConcepts: ["lesson_25::flex", "lesson_25::grid", "lesson_25::navbar", "lesson_25::responsive design"],
    a: { name: "flex", icon: "📏", tagline: "ציר אחד" },
    b: { name: "grid", icon: "🔲", tagline: "שני ממדים" },
    rows: [
      { dim: "מתאים ל", a: "navbar, buttons, row/column", b: "cards gallery/dashboard" },
      { dim: "responsive", a: "flex-wrap / direction", b: "grid-cols-1 md:grid-cols-3" },
      { dim: "מבחן סרטים", a: "סרגל ניווט", b: "רשימת כרטיסי סרטים" },
    ],
    when: "flex לרכיב פנימי; grid לפריסה של כרטיסים.",
  },
  {
    pairKey: "exam_l25_spacing_color_shape",
    relatedConcepts: ["lesson_25::padding", "lesson_25::bg color", "lesson_25::rounded", "lesson_25::utility classes"],
    a: { name: "Spacing", icon: "↔️", tagline: "p/m/gap" },
    b: { name: "Visual style", icon: "🎛️", tagline: "bg/text/border/rounded" },
    rows: [
      { dim: "משנה", a: "מרחקים וגודל פנימי", b: "צבע וצורה" },
      { dim: "דוגמא", a: "p-4 gap-3", b: "bg-blue-500 rounded" },
      { dim: "טעות", a: "הכול צפוף", b: "אין התאמה לתמונה" },
    ],
    when: "קודם layout/spacing, אחר כך צבעים וצורות.",
  },
  {
    pairKey: "exam_l25_movie_interactions",
    relatedConcepts: ["lesson_25::rating", "lesson_25::search", "lesson_25::add/delete movie", "lesson_25::validation"],
    a: { name: "Derived list", icon: "🔍", tagline: "search/filter/rating view" },
    b: { name: "CRUD action", icon: "🧩", tagline: "add/delete" },
    rows: [
      { dim: "משנה data?", a: "לא, רק מציג subset/sort", b: "כן, מוסיף או מוחק" },
      { dim: "state", a: "query/rating display", b: "movies array" },
      { dim: "validation", a: "query יכול להיות ריק", b: "שם/דירוג חייבים תקינים" },
    ],
    when: "search/rating הם תצוגה; add/delete הם שינוי נתונים.",
  },
  {
    pairKey: "exam_l26_ts_vs_js_toolchain",
    relatedConcepts: ["lesson_26::TypeScript", "lesson_26::Strongly Typed", "lesson_26::Compiler", "lesson_26::tsc", "lesson_26::.ts", "lesson_26::.js", "lesson_26::tsconfig.json"],
    a: { name: "JavaScript", icon: "🟨", tagline: "runtime" },
    b: { name: "TypeScript", icon: "🟦", tagline: "compile-time types" },
    rows: [
      { dim: "בדיקות", a: "שגיאות בזמן ריצה", b: "חלק מהשגיאות לפני ריצה" },
      { dim: "קבצים", a: ".js", b: ".ts/.tsx + tsconfig" },
      { dim: "מבחן", a: "JS algorithm", b: "TS question 10 נקודות" },
    ],
    when: "JS לפונקציות; TS לטיפוסים שמונעים טעויות בפרויקט.",
  },
  {
    pairKey: "exam_l26_primitives_collections",
    relatedConcepts: ["lesson_26::type annotation", "lesson_26::string", "lesson_26::number", "lesson_26::boolean", "lesson_26::array type", "lesson_26::tuple"],
    a: { name: "Primitive", icon: "🔤", tagline: "string/number/boolean" },
    b: { name: "Collection", icon: "📚", tagline: "array/tuple" },
    rows: [
      { dim: "ערך", a: "יחיד", b: "כמה ערכים" },
      { dim: "תחביר", a: "name: string", b: "items: string[] / [string, number]" },
      { dim: "טעות", a: "טיפוס לא מתאים לשדה", b: "מערך בלי טיפוס" },
    ],
    when: "כל input ו-state מקבלים טיפוס לפי הערך האמיתי.",
  },
  {
    pairKey: "exam_l26_type_interface_union_enum",
    relatedConcepts: ["lesson_26::type alias", "lesson_26::interface", "lesson_26::interface vs type", "lesson_26::enum", "lesson_26::union"],
    a: { name: "Object shape", icon: "📐", tagline: "interface/type object" },
    b: { name: "Allowed values", icon: "🎚️", tagline: "enum/union" },
    rows: [
      { dim: "מתאר", a: "שדות של אובייקט", b: "סט ערכים מותר" },
      { dim: "דוגמא", a: "interface User { name: string }", b: "'income' | 'expense'" },
      { dim: "מבחן", a: "props/models", b: "category/status/type narrowing" },
    ],
    when: "shape לנתונים; union/enum לבחירה מוגבלת.",
  },
  {
    pairKey: "exam_l26_safety_modifiers",
    relatedConcepts: ["lesson_26::void", "lesson_26::readonly", "lesson_26::optional field", "lesson_26::never", "lesson_26::any", "lesson_26::Type Safety"],
    a: { name: "Safe typing", icon: "🛡️", tagline: "מדויק ומוגבל" },
    b: { name: "Unsafe escape", icon: "⚠️", tagline: "any/התעלמות" },
    rows: [
      { dim: "any", a: "נמנעים ממנו", b: "מבטל בדיקות" },
      { dim: "optional/readonly", a: "מתאר חוזה מדויק", b: "בלי חוזה קל לשבור state" },
      { dim: "never/void", a: "מסמן return או מצב בלתי אפשרי", b: "לא להשאיר अस्पष्ट" },
    ],
    when: "ב-TS 10 נקודות עדיף טיפוס פשוט ומדויק על any.",
  },
  {
    pairKey: "exam_l26_react_ts_files",
    relatedConcepts: ["lesson_26::React + TypeScript", "lesson_26::Typing Props", "lesson_26::Typing State", "lesson_26::Function Prop Type", "lesson_26::models folder", "lesson_26::Todo.ts"],
    a: { name: "Component typing", icon: "⚛️", tagline: "props/state/functions" },
    b: { name: "Model file", icon: "📁", tagline: "types shared" },
    rows: [
      { dim: "מיקום", a: "Component.tsx", b: "models/Todo.ts" },
      { dim: "תפקיד", a: "איך הקומפוננטה מקבלת ומשנה data", b: "חוזה הנתונים" },
      { dim: "מבחן", a: "Props + state בלי any", b: "Transaction/Book/User reusable" },
    ],
    when: "מודלים משותפים בקובץ models; שימוש בפועל בתוך קומפוננטות.",
  },
  {
    pairKey: "exam_l27_core_ts_models",
    relatedConcepts: ["lesson_27::type", "lesson_27::enum", "lesson_27::interface", "lesson_27::extends interface", "lesson_27::Union Type", "lesson_27::Type Narrowing", "lesson_27::Book", "lesson_27::Genre", "lesson_27::BaseUser", "lesson_27::GuestUser", "lesson_27::RegisteredUser", "lesson_27::User"],
    a: { name: "Model definitions", icon: "📘", tagline: "Book/User/Genre" },
    b: { name: "Narrowing logic", icon: "🔎", tagline: "Union + checks" },
    rows: [
      { dim: "תפקיד", a: "מגדיר shape וערכים", b: "מזהה איזה variant קיבלנו" },
      { dim: "כלים", a: "type/interface/enum/extends", b: "in או discriminant field" },
      { dim: "מבחן", a: "לכתוב טיפוסים", b: "להשתמש בהם בפונקציות" },
    ],
    when: "TS לא נגמר בהגדרה; חייבים להשתמש בטיפוס בקוד.",
  },
  {
    pairKey: "exam_l27_budget_crud_summary",
    relatedConcepts: ["lesson_27::Transaction", "lesson_27::Income", "lesson_27::Expense", "lesson_27::Category", "lesson_27::Amount", "lesson_27::CRUD", "lesson_27::Budget Summary", "lesson_27::Category Breakdown"],
    a: { name: "CRUD", icon: "🧩", tagline: "הוספה/עריכה/מחיקה" },
    b: { name: "Summary", icon: "📊", tagline: "חישוב מתוך transactions" },
    rows: [
      { dim: "משנה data", a: "כן", b: "לא, נגזר מה-data" },
      { dim: "כולל", a: "Transaction, amount, category", b: "income, expense, savings, breakdown" },
      { dim: "טעות", a: "mutation או id כפול", b: "חישוב לא מתעדכן אחרי edit/delete" },
    ],
    when: "קודם CRUD עובד, אחר כך totals ו-category breakdown.",
  },
  {
    pairKey: "exam_next_router_vs_react_router",
    relatedConcepts: ["lesson_nextjs::Next.js", "lesson_nextjs::App Router", "lesson_nextjs::file-system routing", "lesson_nextjs::dynamic route", "lesson_nextjs::layout", "lesson_nextjs::page"],
    a: { name: "React Router", icon: "🧭", tagline: "Routes בקוד" },
    b: { name: "Next App Router", icon: "📁", tagline: "תיקיות app/" },
    rows: [
      { dim: "הגדרת route", a: "<Route path=...>", b: "app/path/page.tsx" },
      { dim: "layout", a: "קומפוננטה רגילה", b: "layout.tsx עוטף children" },
      { dim: "dynamic", a: ":id", b: "[id]" },
    ],
    when: "Next.js משתמש במבנה תיקיות במקום Routes ידניים.",
  },
  {
    pairKey: "exam_next_server_client_api_rendering",
    relatedConcepts: ["lesson_nextjs::server component", "lesson_nextjs::client component", "lesson_nextjs::route handler", "lesson_nextjs::API route", "lesson_nextjs::server action", "lesson_nextjs::SSR", "lesson_nextjs::SSG", "lesson_nextjs::ISR", "lesson_nextjs::metadata API", "lesson_nextjs::SEO", "lesson_nextjs::image optimization", "lesson_nextjs::Vercel deploy"],
    a: { name: "Server side", icon: "🖥️", tagline: "data/render/API" },
    b: { name: "Client side", icon: "🖱️", tagline: "interaction" },
    rows: [
      { dim: "קומפוננטה", a: "server component כברירת מחדל", b: "'use client' ל-state/events" },
      { dim: "API", a: "route handler / API route", b: "fetch מה-client כשצריך" },
      { dim: "SEO/deploy", a: "metadata/rendering/Vercel", b: "אינטראקציה אחרי טעינה" },
    ],
    when: "Server למה שאפשר; Client רק כשצריך hooks או event handlers.",
  },
].forEach(addExamComparison);

// Browser bridge
if (typeof window !== "undefined") {
  window.COMPARISONS = COMPARISONS;
}
