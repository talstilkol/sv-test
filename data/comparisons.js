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
    relatedConcepts: ["lesson_17::מודולים"],
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

// Browser bridge
if (typeof window !== "undefined") {
  window.COMPARISONS = COMPARISONS;
}
