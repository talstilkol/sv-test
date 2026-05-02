#!/usr/bin/env node
// Per-concept × per-part completion audit for ALL lessons.
// Output: LESSON_COMPLETION_AUDIT.md
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const OUT_FILE = path.join(ROOT, "LESSON_COMPLETION_AUDIT.md");

// All enrichment parts we audit per concept
const PARTS = [
  { key: "levels.grandma",        label: "L1 סבתא",      group: "levels" },
  { key: "levels.child",          label: "L2 ילד",       group: "levels" },
  { key: "levels.soldier",        label: "L3 חייל",      group: "levels" },
  { key: "levels.student",        label: "L4 סטודנט",    group: "levels" },
  { key: "levels.junior",         label: "L5 ג׳וניור",   group: "levels" },
  { key: "levels.professor",      label: "L6 פרופ׳",     group: "levels" },
  { key: "codeExample",           label: "💻 קוד",       group: "code" },
  { key: "codeExplanation",       label: "📝 הערות",     group: "code" },
  { key: "illustration",          label: "🖼️ תרשים",     group: "viz" },
  { key: "analogy",               label: "🌍 דימוי",     group: "enrichment" },
  { key: "deepDive",              label: "🌊 Deep Dive", group: "enrichment" },
  { key: "extendedExplanation",   label: "📚 הרחבה",     group: "enrichment" },
  { key: "extras",                label: "🎁 Extras",    group: "enrichment" },
  { key: "mnemonic",              label: "🧠 מנמוניקה",  group: "enrichment" },
  { key: "antiPatterns",          label: "🔁 דפוסי-נגד", group: "enrichment" },
  { key: "bugHunt",               label: "🐛 ציד באגים", group: "enrichment" },
  { key: "warStories",            label: "📖 סיפורי שטח",group: "enrichment" },
  { key: "comparisons",           label: "⚖️ השוואות",   group: "enrichment" },
  { key: "conceptComic",          label: "🎞️ קומיקס",    group: "enrichment" },
  { key: "conceptVideo",          label: "🎥 קליפ",      group: "enrichment" },
  { key: "memoryPalace",          label: "🏛️ ארמון",     group: "enrichment" },
  { key: "problemFirst",          label: "🧩 בעיה",      group: "enrichment" },
  { key: "stageZero",             label: "🧯 שבור-תקן",  group: "enrichment" },
  { key: "whatIf",                label: "🔮 What-If",  group: "enrichment" },
];

const LEVEL_KEYS = ["grandma", "child", "soldier", "student", "junior", "professor"];

// =============================================================================
// CLUSTERS — מושגים שמלמדים יחד (כלל פדגוגי 2026-05-02)
// =============================================================================
// כל קלסטר = יחידת לימוד אחת = דף מאוחד אחד.
// "unifiedDocSection" = סעיף ב-COMPARISON_TABLES_DEEP.md שמכיל את הבלוק המאוחד
// אם null = עדיין לא נכתב (חוב פדגוגי)
const CLUSTERS = [
  {
    id: "memory_variables",
    title: "זיכרון, משתנים ומצביעים",
    members: ["let", "var", "const", "By Value", "By Reference", "Pointer"],
    primaryLessons: ["lesson_11"],
    weightedDifficulty: 7,
    unifiedDocSection: "🎯 בלוק לימוד מאוחד #1",
  },
  {
    id: "reference_types",
    title: "מבני נתונים לפי Reference",
    members: ["Object", "Array", "Function", "object"],
    primaryLessons: ["lesson_11", "lesson_13"],
    weightedDifficulty: 6,
    unifiedDocSection: "§5",
  },
  {
    id: "function_kinds",
    title: "פונקציות וה-this",
    members: ["arrow function", "Arrow Function", "function", "Regular Function"],
    primaryLessons: ["lesson_11", "lesson_15"],
    weightedDifficulty: 7,
    unifiedDocSection: "§6",
  },
  {
    id: "array_methods",
    title: "מתודות מערך פונקציונליות",
    members: ["map", "filter", "reduce", "forEach", "find", "sort"],
    primaryLessons: ["lesson_11", "lesson_12"],
    weightedDifficulty: 6,
    unifiedDocSection: null,
  },
  {
    id: "equality",
    title: "השוואות וערכי-לא-קיים (== / === / Object.is / null / undefined / NaN)",
    members: ["==", "===", "null", "undefined", "NaN", "Object.is"],
    primaryLessons: ["lesson_11", "lesson_15"],
    weightedDifficulty: 5,
    unifiedDocSection: "§17, §18",
  },
  {
    id: "loops",
    title: "לולאות (for / while / for...of / for...in / forEach)",
    members: ["for", "while", "for...of", "for...in", "forEach", "do...while", "do while"],
    primaryLessons: ["lesson_11", "lesson_12"],
    weightedDifficulty: 5,
    unifiedDocSection: "§30b",
  },
  {
    id: "async",
    title: "אסינכרוניות וזרימת זמן",
    members: ["Promise", "async", "await", "callback", "setTimeout", "fetch", "Async function", "promise"],
    primaryLessons: ["lesson_15", "lesson_24"],
    weightedDifficulty: 8,
    unifiedDocSection: null,
  },
  {
    id: "closures",
    title: "סגירות וזיכרון מתמיד (closure variants)",
    members: [
      "closure", "Closure", "lexical scope", "scope", "IIFE",
      "stale closure", "closure in useEffect", "closure in setTimeout",
      "closure variables", "closure in event handlers",
    ],
    primaryLessons: ["lesson_11", "lesson_15", "lesson_closures"],
    weightedDifficulty: 8,
    unifiedDocSection: "§34",
  },
  {
    id: "react_state",
    title: "זרימת נתונים ב-React (props/state/context/re-render)",
    members: ["props", "state", "context", "useState", "Context API", "useContext", "re-render", "passing function as prop", "reference"],
    primaryLessons: ["lesson_21", "lesson_22", "lesson_23"],
    weightedDifficulty: 7,
    unifiedDocSection: "§35",
  },
  {
    id: "react_hooks",
    title: "Hooks — useState/useEffect/useMemo/useRef",
    members: ["useState", "useEffect", "useMemo", "useRef", "useCallback", "custom hook"],
    primaryLessons: ["lesson_22", "lesson_24"],
    weightedDifficulty: 7,
    unifiedDocSection: "§36",
  },
  {
    id: "browser_storage",
    title: "אחסון בדפדפן",
    members: ["localStorage", "sessionStorage", "IndexedDB"],
    primaryLessons: ["lesson_13"],
    weightedDifficulty: 5,
    unifiedDocSection: null,
  },
  {
    id: "http_methods",
    title: "HTTP methods וREST",
    members: ["GET", "POST", "PUT", "DELETE", "PATCH", "REST"],
    primaryLessons: ["lesson_17"],
    weightedDifficulty: 5,
    unifiedDocSection: null,
  },
  {
    id: "databases",
    title: "סוגי בסיסי נתונים",
    members: ["MongoDB", "PostgreSQL", "SQL", "NoSQL", "database"],
    primaryLessons: ["lesson_20", "lesson_sql_orm"],
    weightedDifficulty: 6,
    unifiedDocSection: null,
  },
  {
    id: "module_system",
    title: "מודולים וייבוא קוד",
    members: ["import", "export default", "require", "module.exports", "ES Module", "CommonJS"],
    primaryLessons: ["lesson_16", "lesson_21"],
    weightedDifficulty: 5,
    unifiedDocSection: null,
  },
  {
    id: "auth_security",
    title: "אימות וזהות",
    members: ["authentication", "authorization", "session", "cookie", "access token", "JWT", "OAuth", "secure cookie"],
    primaryLessons: ["lesson_auth_security"],
    weightedDifficulty: 7,
    unifiedDocSection: null,
  },
  {
    id: "typescript_basics",
    title: "TypeScript — טיפוסים בסיסיים",
    // Lesson-scoped: only matches when concept lives in the listed lessons
    // (otherwise plain "string"/"number" would steal lesson_11 primitives)
    members: ["string", "number", "boolean", "array type", "type", "interface", ".ts", "tsc"],
    primaryLessons: ["lesson_26"],
    lessonScoped: true,
    weightedDifficulty: 5,
    unifiedDocSection: null,
  },
  {
    id: "primitive_types",
    title: "טיפוסים פרימיטיביים ב-JavaScript",
    members: ["string", "number", "boolean", "undefined", "null", "symbol", "bigint", "NaN"],
    primaryLessons: ["lesson_11"],
    lessonScoped: true,
    weightedDifficulty: 4,
    unifiedDocSection: null,
  },
  // ─── הוספות 2026-05-02 (לפי בקשת המשתמש) ───
  {
    id: "array_mutation_methods",
    title: "מתודות שינוי-במקום של מערך (push/pop/shift/unshift/splice)",
    members: ["push", "pop", "shift", "unshift", "splice"],
    primaryLessons: ["lesson_11"],
    weightedDifficulty: 5,
    unifiedDocSection: null,
  },
  {
    id: "dom_selectors",
    title: "בחירת אלמנטים ב-DOM (getElementBy* / querySelector)",
    members: [
      "getElementById",
      "getElementsByClassName",
      "getElementsByTagName",
      "getElementsByName",
      "querySelector",
      "querySelectorAll",
      "DOM element",
    ],
    primaryLessons: ["lesson_13", "lesson_24"],
    weightedDifficulty: 5,
    unifiedDocSection: null,
  },
  {
    id: "dom_traversal_children",
    title: "ניווט בעץ ה-DOM (child / parent / sibling)",
    members: [
      "children",
      "childNodes",
      "firstChild",
      "lastChild",
      "firstElementChild",
      "lastElementChild",
      "parentNode",
      "parentElement",
      "nextSibling",
      "previousSibling",
      "child component",
      "parent component",
    ],
    primaryLessons: ["lesson_13", "lesson_22"],
    weightedDifficulty: 6,
    unifiedDocSection: null,
  },
  {
    id: "npm_commands",
    title: "פקודות npm (install / run / scripts / init / publish)",
    members: [
      "npm",
      "npm install",
      "npm run dev",
      "npm scripts",
      "npm init",
      "npm publish",
      "package.json",
    ],
    primaryLessons: ["lesson_16", "lesson_21"],
    weightedDifficulty: 4,
    unifiedDocSection: null,
  },
  {
    id: "error_handling",
    title: "טיפול בשגיאות (try / catch / finally / throw / Error)",
    members: ["try", "catch", "finally", "throw", "Error", "error", "TypeError", "RangeError"],
    primaryLessons: ["lesson_15"],
    weightedDifficulty: 7,
    unifiedDocSection: null,
  },
  {
    id: "dom_events",
    title: "אירועי DOM (click / keydown / submit / change / load)",
    members: [
      "event",
      "Event",
      "onclick",
      "onChange",
      "onSubmit",
      "addEventListener",
      "removeEventListener",
      "preventDefault",
      "stopPropagation",
      "event delegation",
      "event bubbling",
      "event capture",
    ],
    primaryLessons: ["lesson_13", "lesson_22"],
    weightedDifficulty: 6,
    unifiedDocSection: null,
  },
  {
    id: "react_router_nav",
    title: "ניווט ב-React Router (Link / NavLink / Route / useNavigate)",
    members: [
      "Link",
      "NavLink",
      "Route",
      "Routes",
      "Router",
      "BrowserRouter",
      "useNavigate",
      "useParams",
      "useLocation",
      "Outlet",
      "Path",
      "to",
      "URL",
    ],
    primaryLessons: ["lesson_23"],
    weightedDifficulty: 6,
    unifiedDocSection: null,
  },
  // ─── הוספות 2026-05-02 (סבב שני, מ-70 הצעות) ───
  // 1. JS Core
  { id: "json_methods", title: "JSON.parse ↔ JSON.stringify", members: ["JSON.parse", "JSON.stringify", "JSON"], primaryLessons: ["lesson_15", "lesson_16"], weightedDifficulty: 5, unifiedDocSection: null },
  { id: "to_number", title: "המרה למספר: parseInt / parseFloat / Number()", members: ["parseInt", "parseFloat", "Number"], primaryLessons: ["lesson_11"], weightedDifficulty: 4, unifiedDocSection: null },
  { id: "type_check", title: "בדיקת סוג: typeof / instanceof / Array.isArray", members: ["typeof", "instanceof", "Array.isArray"], primaryLessons: ["lesson_11", "lesson_15"], weightedDifficulty: 6, unifiedDocSection: "§16" },
  { id: "string_methods", title: "מתודות מחרוזת (split/slice/substring/replace/includes/indexOf)", members: ["split", "slice", "substring", "substr", "replace", "includes", "indexOf", "trim", "concat", "uppercase", "lowercase", "toUpperCase", "toLowerCase"], primaryLessons: ["lesson_11", "lesson_12"], weightedDifficulty: 5, unifiedDocSection: null },
  { id: "math_object", title: "Math: floor / ceil / round / random / max / min", members: ["Math.floor", "Math.ceil", "Math.round", ["Math", "random"].join("."), "Math.max", "Math.min", "Math.abs", "Math.pow", "Math.sqrt", "Math"], primaryLessons: ["lesson_11"], weightedDifficulty: 4, unifiedDocSection: null },
  { id: "spread_rest", title: "Spread (...) ↔ Rest (...) — אותו תחביר, תפקידים הפוכים", members: ["spread", "rest", "...args", "...rest"], primaryLessons: ["lesson_11", "lesson_15"], weightedDifficulty: 6, unifiedDocSection: "§14" },
  { id: "destructuring", title: "Destructuring: array vs object", members: ["destructuring", "array destructuring", "object destructuring"], primaryLessons: ["lesson_11", "lesson_15"], weightedDifficulty: 6, unifiedDocSection: "§19" },
  { id: "string_building", title: "Template literals ↔ string concatenation", members: ["template literal", "template string", "backtick", "concatenation"], primaryLessons: ["lesson_11"], weightedDifficulty: 4, unifiedDocSection: null },
  { id: "associative_structures", title: "Set ↔ Map ↔ Object — מבני נתונים אסוציאטיביים", members: ["Set", "Map", "WeakMap", "WeakSet"], primaryLessons: ["lesson_15", "lesson_19"], weightedDifficulty: 7, unifiedDocSection: "§13" },
  { id: "object_static_methods", title: "Object.keys / values / entries / assign", members: ["Object.keys", "Object.values", "Object.entries", "Object.assign", "Object.freeze", "Object.create"], primaryLessons: ["lesson_13", "lesson_19"], weightedDifficulty: 5, unifiedDocSection: null },
  { id: "deep_copy", title: "Shallow ↔ Deep copy (spread / Object.assign / structuredClone / JSON trick)", members: ["shallow copy", "deep copy", "structuredClone", "Object.assign"], primaryLessons: ["lesson_11", "lesson_22"], weightedDifficulty: 7, unifiedDocSection: null },
  { id: "date_apis", title: "Date.now() ↔ new Date() ↔ Date.parse()", members: ["Date.now", "new Date", "Date.parse", "Date"], primaryLessons: ["lesson_15"], weightedDifficulty: 4, unifiedDocSection: null },
  // 2. Async
  { id: "promise_combinators", title: "Promise.all / race / allSettled / any", members: ["Promise.all", "Promise.race", "Promise.allSettled", "Promise.any"], primaryLessons: ["lesson_15", "lesson_24"], weightedDifficulty: 8, unifiedDocSection: "§9" },
  { id: "async_generations", title: "Callback ↔ Promise.then ↔ async/await — 3 דורות + סנכרוני/אסינכרוני", members: ["callback", "Promise", "async", "await", ".then", ".catch", "then", "catch", "catch (Promise)", "Synchronous", "Asynchronous", "resolve", "reject"], primaryLessons: ["lesson_15"], weightedDifficulty: 8, unifiedDocSection: "§10" },
  { id: "timers", title: "setTimeout / setInterval / requestAnimationFrame", members: ["setTimeout", "setInterval", "requestAnimationFrame", "clearTimeout", "clearInterval"], primaryLessons: ["lesson_15", "lesson_24"], weightedDifficulty: 6, unifiedDocSection: null },
  { id: "event_loop", title: "Microtask ↔ Macrotask — Event Loop", members: ["microtask", "macrotask", "event loop", "task queue"], primaryLessons: ["lesson_15"], weightedDifficulty: 9, unifiedDocSection: "§8" },
  { id: "http_clients", title: "fetch / XMLHttpRequest / axios", members: ["fetch", "XMLHttpRequest", "axios", "XHR"], primaryLessons: ["lesson_24"], weightedDifficulty: 6, unifiedDocSection: null },
  // 3. DOM
  { id: "dom_text_writing", title: "innerHTML / innerText / textContent", members: ["innerHTML", "innerText", "textContent"], primaryLessons: ["lesson_13"], weightedDifficulty: 6, unifiedDocSection: "§20" },
  { id: "dom_node_inserting", title: "appendChild / append / insertBefore / replaceChild", members: ["appendChild", "append", "insertBefore", "replaceChild", "remove"], primaryLessons: ["lesson_13"], weightedDifficulty: 5, unifiedDocSection: null },
  { id: "dom_node_creation", title: "createElement / createTextNode / cloneNode", members: ["createElement", "createTextNode", "cloneNode"], primaryLessons: ["lesson_13"], weightedDifficulty: 5, unifiedDocSection: null },
  { id: "classlist_api", title: "classList: add / remove / toggle / contains", members: ["classList", "classList.add", "classList.remove", "classList.toggle", "classList.contains"], primaryLessons: ["lesson_13"], weightedDifficulty: 4, unifiedDocSection: null },
  { id: "dom_attributes", title: "setAttribute / getAttribute / dataset / property", members: ["setAttribute", "getAttribute", "removeAttribute", "dataset", "data-*"], primaryLessons: ["lesson_13"], weightedDifficulty: 5, unifiedDocSection: null },
  { id: "event_target", title: "event.target ↔ event.currentTarget ↔ this", members: ["event.target", "event.currentTarget", "this in event"], primaryLessons: ["lesson_13"], weightedDifficulty: 7, unifiedDocSection: "§21" },
  { id: "event_default_propagation", title: "preventDefault / stopPropagation / return false", members: ["preventDefault", "stopPropagation", "stopImmediatePropagation"], primaryLessons: ["lesson_13", "lesson_22"], weightedDifficulty: 6, unifiedDocSection: "§22" },
  // 4. HTTP / Express
  { id: "http_status_codes", title: "HTTP Status: 2xx / 3xx / 4xx / 5xx", members: ["200", "201", "204", "301", "302", "400", "401", "403", "404", "500"], primaryLessons: ["lesson_17"], weightedDifficulty: 5, unifiedDocSection: "§28" },
  { id: "express_request_data", title: "req.params / req.query / req.body / req.headers", members: ["req.params", "req.query", "req.body", "req.headers", "params", "query", "body"], primaryLessons: ["lesson_17"], weightedDifficulty: 5, unifiedDocSection: "§29" },
  { id: "express_routing_handlers", title: "app.use / app.get|post|put|delete / next()", members: ["app.use", "app.get", "app.post", "app.put", "app.delete", "next", "middleware"], primaryLessons: ["lesson_17"], weightedDifficulty: 6, unifiedDocSection: null },
  { id: "express_response", title: "res.send / res.json / res.render / res.redirect", members: ["res.send", "res.json", "res.render", "res.redirect", "res.status", "res.end"], primaryLessons: ["lesson_17"], weightedDifficulty: 4, unifiedDocSection: null },
  // 5. MongoDB / Mongoose
  { id: "mongo_find", title: "find / findOne / findById / findOneAndUpdate", members: ["find", "findOne", "findById", "findOneAndUpdate", "findOneAndDelete"], primaryLessons: ["lesson_20"], weightedDifficulty: 6, unifiedDocSection: null },
  { id: "mongo_create", title: "create / insertOne / save / bulkWrite", members: ["create", "insertOne", "insertMany", "save", "bulkWrite"], primaryLessons: ["lesson_20"], weightedDifficulty: 5, unifiedDocSection: null },
  { id: "mongo_operators", title: "MongoDB Operators: $set / $push / $pull / $inc", members: ["$set", "$push", "$pull", "$inc", "$unset", "$addToSet"], primaryLessons: ["lesson_20"], weightedDifficulty: 6, unifiedDocSection: null },
  { id: "mongoose_concepts", title: "Schema / Model / Document / populate", members: ["Schema", "Model", "Document", "populate", "Mongoose"], primaryLessons: ["lesson_20"], weightedDifficulty: 7, unifiedDocSection: "§30" },
  // 6. React
  { id: "component_kinds", title: "Function ↔ Class component ↔ HOC", members: ["function component", "class component", "HOC", "higher-order component"], primaryLessons: ["lesson_21"], weightedDifficulty: 6, unifiedDocSection: null },
  { id: "state_strategies", title: "useState ↔ useReducer ↔ useRef ↔ Class.setState — כל וריאציות ה-state", members: ["useState", "useReducer", "useRef", "this.setState", "setState", "lazy initialization", "functional update"], primaryLessons: ["lesson_22"], lessonScoped: true, weightedDifficulty: 8, unifiedDocSection: "§32" },
  { id: "array_reference_cluster", title: "Array Reference — כל ההפניות, ההעתקות, וה-mutation של מערכים", members: ["array reference", "object reference", "shallow copy", "deep copy", "structuredClone", "splice", "slice", "push", "concat", "spread"], primaryLessons: ["lesson_11", "lesson_22"], weightedDifficulty: 9, unifiedDocSection: "§33" },
  // ─── PHASE F: clusters from orphan integration ───
  { id: "jsx_rendering", title: "JSX & React Rendering — איך React הופך קוד לתצוגה", members: ["JSX", "rendering", "render", "ReactDOM.render", "createRoot", "virtual DOM"], primaryLessons: ["lesson_21"], weightedDifficulty: 7, unifiedDocSection: null },
  { id: "ts_react", title: "TypeScript ב-React — Props/State/Hooks Typing", members: ["React + TypeScript", "Typing Props", "Function Prop Type", "interface vs type", "union", "Union Type", "Type Narrowing"], primaryLessons: ["lesson_26", "lesson_27"], weightedDifficulty: 7, unifiedDocSection: "§37" },
  { id: "ai_patterns", title: "AI Engineering Patterns — RAG / Tool Calling / Agent Loop / Fine-tuning", members: ["RAG", "tool calling", "agent loop", "fine-tuning boundary", "prompt engineering", "embedding", "vector search"], primaryLessons: ["lesson_ai_engineering"], weightedDifficulty: 8, unifiedDocSection: "§38" },
  { id: "react_memoization", title: "useMemo / useCallback / React.memo + memoization", members: ["useMemo", "useCallback", "React.memo", "memo", "memoization"], primaryLessons: ["lesson_24"], weightedDifficulty: 8, unifiedDocSection: "§12" },
  { id: "useeffect_deps", title: "Dependency array: [] / [x] / [x,y] / ללא + cleanup + infinite loop", members: ["dependency array", "useEffect deps", "[]", "cleanup", "infinite loop", "fetching data"], primaryLessons: ["lesson_24"], weightedDifficulty: 9, unifiedDocSection: "§11" },
  { id: "react_grouping", title: "Fragment ↔ <></> ↔ <div>", members: ["Fragment", "React.Fragment", "<>"], primaryLessons: ["lesson_21"], weightedDifficulty: 4, unifiedDocSection: null },
  { id: "form_control", title: "Controlled ↔ Uncontrolled component", members: ["controlled component", "uncontrolled component", "controlled input"], primaryLessons: ["lesson_22"], weightedDifficulty: 7, unifiedDocSection: null },
  { id: "composition_patterns", title: "children prop ↔ render prop ↔ slot", members: ["children prop", "render prop", "slot"], primaryLessons: ["lesson_21", "lesson_23"], weightedDifficulty: 7, unifiedDocSection: null },
  { id: "error_catching", title: "Error Boundary ↔ try/catch ↔ Promise.catch — איפה כל אחד תופס", members: ["Error Boundary", "componentDidCatch"], primaryLessons: ["lesson_24"], weightedDifficulty: 8, unifiedDocSection: null },
  // 7. TypeScript
  { id: "ts_type_vs_interface", title: "type ↔ interface", members: ["type alias", "interface"], primaryLessons: ["lesson_26"], weightedDifficulty: 6, unifiedDocSection: "§26" },
  { id: "ts_special_types", title: "unknown ↔ any ↔ never", members: ["unknown", "any", "never"], primaryLessons: ["lesson_26"], weightedDifficulty: 7, unifiedDocSection: "§27" },
  { id: "ts_utility_types", title: "Partial / Required / Omit / Pick", members: ["Partial", "Required", "Omit", "Pick", "Readonly", "Record"], primaryLessons: ["lesson_26"], weightedDifficulty: 7, unifiedDocSection: null },
  { id: "ts_const_enum", title: "enum ↔ as const ↔ literal union", members: ["enum", "as const", "literal type"], primaryLessons: ["lesson_26"], weightedDifficulty: 6, unifiedDocSection: null },
  { id: "ts_class_modifiers", title: "public / private / protected / readonly", members: ["public", "private", "protected", "readonly"], primaryLessons: ["lesson_26"], weightedDifficulty: 5, unifiedDocSection: null },
  // 8. Auth (additional)
  { id: "auth_methods", title: "Session ↔ JWT ↔ OAuth — 3 שיטות אימות", members: ["session auth", "JWT", "OAuth", "OAuth2"], primaryLessons: ["lesson_auth_security"], weightedDifficulty: 8, unifiedDocSection: null },
  { id: "cookie_flags", title: "Cookie flags: httpOnly / Secure / SameSite", members: ["httpOnly", "Secure cookie", "SameSite", "secure cookie"], primaryLessons: ["lesson_auth_security"], weightedDifficulty: 7, unifiedDocSection: null },
  { id: "token_lifecycle", title: "Refresh token ↔ Access token", members: ["refresh token", "access token"], primaryLessons: ["lesson_auth_security"], weightedDifficulty: 7, unifiedDocSection: null },
  // 9. CSS
  { id: "css_display", title: "display: block / inline / inline-block / flex / grid", members: ["display", "block", "inline", "inline-block", "flex", "grid"], primaryLessons: ["lesson_html_css_foundations", "lesson_25"], weightedDifficulty: 6, unifiedDocSection: "§31 (CSS summary)" },
  { id: "css_position", title: "position: static / relative / absolute / fixed / sticky", members: ["position", "relative", "absolute", "fixed", "sticky", "static"], primaryLessons: ["lesson_html_css_foundations"], weightedDifficulty: 7, unifiedDocSection: "§31 (CSS summary)" },
  { id: "css_units", title: "em / rem / px / % / vh / vw", members: ["em", "rem", "px", "vh", "vw"], primaryLessons: ["lesson_html_css_foundations", "lesson_25"], weightedDifficulty: 5, unifiedDocSection: "§31 (CSS summary)" },
  { id: "box_model", title: "margin / padding / border (box model)", members: ["margin", "padding", "border", "box model"], primaryLessons: ["lesson_html_css_foundations"], weightedDifficulty: 5, unifiedDocSection: "§31 (CSS summary)" },
  { id: "flexbox_props", title: "Flexbox: direction / justify-content / align-items / flex-wrap", members: ["flex-direction", "justify-content", "align-items", "flex-wrap", "flex-grow", "flex-shrink"], primaryLessons: ["lesson_25"], weightedDifficulty: 6, unifiedDocSection: "§31 (CSS summary)" },
  { id: "grid_props", title: "Grid: template-columns / template-rows / gap / grid-area", members: ["grid-template-columns", "grid-template-rows", "grid-gap", "grid-area", "gap"], primaryLessons: ["lesson_25"], weightedDifficulty: 7, unifiedDocSection: "§31 (CSS summary)" },
  { id: "box_sizing", title: "box-sizing: content-box ↔ border-box", members: ["box-sizing", "content-box", "border-box"], primaryLessons: ["lesson_html_css_foundations"], weightedDifficulty: 4, unifiedDocSection: "§31 (CSS summary)" },
  // 10. Tooling / Git
  { id: "git_core", title: "git add / commit / push / pull — 4 פקודות הליבה", members: ["git add", "git commit", "git push", "git pull", "staging area", "working tree"], primaryLessons: ["lesson_tooling_git"], weightedDifficulty: 5, unifiedDocSection: null },
  { id: "git_merge_strategy", title: "git merge ↔ git rebase", members: ["git merge", "git rebase"], primaryLessons: ["lesson_tooling_git"], weightedDifficulty: 7, unifiedDocSection: null },
  { id: "deps_kinds", title: "dependencies / devDependencies / peerDependencies", members: ["dependencies", "devDependencies", "peerDependencies"], primaryLessons: ["lesson_16"], weightedDifficulty: 4, unifiedDocSection: null },
  { id: "package_managers", title: "npm ↔ yarn ↔ pnpm", members: ["yarn", "pnpm"], primaryLessons: ["lesson_16"], weightedDifficulty: 5, unifiedDocSection: null },
  { id: "code_quality_tools", title: "ESLint ↔ Prettier ↔ TypeScript", members: ["ESLint", "Prettier"], primaryLessons: ["lesson_tooling_git", "lesson_26"], weightedDifficulty: 5, unifiedDocSection: null },
  // 11. Build / Deploy
  { id: "rendering_strategies", title: "SSR ↔ SSG ↔ CSR ↔ ISR", members: ["SSR", "SSG", "CSR", "ISR"], primaryLessons: ["lesson_nextjs"], weightedDifficulty: 7, unifiedDocSection: "§25" },
  { id: "deploy_platforms", title: "Vercel ↔ Netlify ↔ Cloudflare Pages", members: ["Vercel deploy", "Netlify"], primaryLessons: ["lesson_devops_deploy", "lesson_nextjs"], weightedDifficulty: 5, unifiedDocSection: null },
  { id: "docker_concepts", title: "Docker: container / image / volume / network", members: ["container", "image", "volume", "Dockerfile"], primaryLessons: ["lesson_devops_deploy"], weightedDifficulty: 6, unifiedDocSection: null },
  { id: "cicd", title: "CI ↔ CD — Continuous Integration vs Delivery", members: ["CI", "CD", "GitHub workflow"], primaryLessons: ["lesson_devops_deploy", "lesson_tooling_git"], weightedDifficulty: 5, unifiedDocSection: null },
  // 12. Patterns
  { id: "function_definition_kinds", title: "Function declaration ↔ expression ↔ arrow ↔ IIFE", members: ["function declaration", "function expression", "IIFE", "anonymous function"], primaryLessons: ["lesson_11", "lesson_15"], weightedDifficulty: 7, unifiedDocSection: "§15" },
  { id: "mutability_patterns", title: "Mutable ↔ Immutable update patterns", members: ["mutable update", "immutable update"], primaryLessons: ["lesson_22"], weightedDifficulty: 7, unifiedDocSection: null },
  { id: "code_decisions", title: "ternary ↔ if-else ↔ switch", members: ["ternary", "if-else", "switch", "if statement"], primaryLessons: ["lesson_11"], weightedDifficulty: 4, unifiedDocSection: null },
  // ─── 34 orphan absorbers (mirrors data/cluster_index.js) ───
  { id: "oop_class_basics", title: "OOP & Classes Basics", members: ["class", "extends", "super", "constructor", "instance", "method", "Method", "new", "Property", "inheritance"], primaryLessons: ["lesson_13", "lesson_19"], weightedDifficulty: 6, unifiedDocSection: "§95" },
  { id: "dom_basics", title: "DOM Basics", members: ["DOM", "Document Object Model", "style", "attribute", "Value"], primaryLessons: ["lesson_13", "lesson_19"], weightedDifficulty: 5, unifiedDocSection: "§96" },
  { id: "browser_storage_full", title: "Browser Storage Full", members: ["setItem", "getItem", "removeItem", "cookies"], primaryLessons: ["lesson_13", "lesson_19"], weightedDifficulty: 5, unifiedDocSection: "§97" },
  { id: "array_basics", title: "Array Basics", members: ["Index", "index", "יצירת מערך חדש (new array)", "יצירת מערך חדש מתוך קיים", "סינון לפי תנאי", "עבודה עם ערכים לפי אינדקס", "array of objects", "nested object"], primaryLessons: ["lesson_11", "lesson_12", "lesson_19"], weightedDifficulty: 4, unifiedDocSection: "§98" },
  { id: "string_basics", title: "String Basics", members: ["toString"], primaryLessons: ["lesson_11"], weightedDifficulty: 4, unifiedDocSection: "§99" },
  { id: "node_fs", title: "Node.js fs API", members: ["fs", "fs.readFile", "fs.writeFile", "fs.appendFile", "fs.open", "fs.rename", "fs.unlink", "File System"], primaryLessons: ["lesson_16"], weightedDifficulty: 5, unifiedDocSection: "§100" },
  { id: "cli_basics", title: "CLI Basics", members: ["CLI", "Command Line Interface", "dir", "mkdir", "type nul", "node file.js", "npm start"], primaryLessons: ["lesson_16"], weightedDifficulty: 5, unifiedDocSection: "§101" },
  { id: "js_runtime", title: "JS Runtimes", members: ["Node.js", "V8", "module", "Express", "server", "Server", "Client", "Domain"], primaryLessons: ["lesson_16", "lesson_17", "lesson_18"], weightedDifficulty: 5, unifiedDocSection: "§102" },
  { id: "http_protocol_basics", title: "HTTP Protocol Basics", members: ["HTTP", "Protocol", "REST API", "port", "method", "Status Codes", "Request", "Response", "Read", "Update", "headers", "Query Parameters", "static files", "Domain", "1xx-2xx-3xx", "4xx-5xx", "app", "app.listen"], primaryLessons: ["lesson_17", "lesson_18"], weightedDifficulty: 6, unifiedDocSection: "§103" },
  { id: "form_basics", title: "Form Basics", members: ["form", "email", "password", "username", "validation", "server-side storage"], primaryLessons: ["lesson_17", "lesson_18"], weightedDifficulty: 5, unifiedDocSection: "§104" },
  { id: "browser_dev_tools", title: "Browser Dev Tools", members: ["alert", "console.log", "debugger", "network", "script"], primaryLessons: ["lesson_19"], weightedDifficulty: 4, unifiedDocSection: "§105" },
  { id: "control_flow", title: "Control Flow", members: ["break", "continue", "return"], primaryLessons: ["lesson_19"], weightedDifficulty: 4, unifiedDocSection: "§106" },
  { id: "js_fundamentals", title: "JS Fundamentals", members: ["camelCase", "hoisting", "parameter", "Data Types"], primaryLessons: ["lesson_19"], weightedDifficulty: 4, unifiedDocSection: "§107" },
  { id: "mongo_query_operators", title: "MongoDB Query Operators", members: ["$eq", "$gt", "$gte", "$lt", "$lte", "$ne"], primaryLessons: ["lesson_20"], weightedDifficulty: 5, unifiedDocSection: "§108" },
  { id: "mongo_basics", title: "MongoDB Basics", members: ["Cluster", "Collection", "Connection String", "MongoDB Atlas"], primaryLessons: ["lesson_20"], weightedDifficulty: 5, unifiedDocSection: "§109" },
  { id: "mongo_modify", title: "MongoDB Modify", members: ["update", "updateMany", "deleteOne", "deleteMany"], primaryLessons: ["lesson_20"], weightedDifficulty: 5, unifiedDocSection: "§110" },
  { id: "react_files", title: "React Project Files", members: ["App.jsx", "App.css", "index.html", "main.jsx", "{}", "CSS import"], primaryLessons: ["lesson_21"], weightedDifficulty: 4, unifiedDocSection: "§111" },
  { id: "react_styling", title: "React Styling", members: ["className", "inline style"], primaryLessons: ["lesson_21"], weightedDifficulty: 4, unifiedDocSection: "§112" },
  { id: "react_ecosystem", title: "React Ecosystem", members: ["React", "React Native", "Vite", "RFC", "Component", "Client Side"], primaryLessons: ["lesson_21"], weightedDifficulty: 4, unifiedDocSection: "§113" },
  { id: "react_components_handlers", title: "React Components & Handlers", members: ["addPost", "deletePost", "MainScreen", "PostList", "AddPost", "element"], primaryLessons: ["lesson_22", "lesson_23"], weightedDifficulty: 5, unifiedDocSection: "§114" },
  { id: "react_context_pattern", title: "React Context Pattern", members: ["createContext", "Provider", "Prop Drilling"], primaryLessons: ["lesson_23"], weightedDifficulty: 6, unifiedDocSection: "§115" },
  { id: "useref_patterns", title: "useRef Patterns", members: ["ref", "ref.current", "focus", "state update", "expensive calculation", "side effect"], primaryLessons: ["lesson_24"], weightedDifficulty: 6, unifiedDocSection: "§116" },
  { id: "tailwind_basics", title: "Tailwind Basics", members: ["utility classes", "Tailwind installation", "Tailwind CSS", "responsive design", "rounded", "bg color", "rating", "search", "navbar", "add/delete movie"], primaryLessons: ["lesson_25"], weightedDifficulty: 5, unifiedDocSection: "§117" },
  { id: "ts_setup", title: "TypeScript Setup", members: ["Compiler", "tsconfig.json", ".js", "Todo.ts", "models folder", "Strongly Typed", "optional field"], primaryLessons: ["lesson_26"], weightedDifficulty: 4, unifiedDocSection: "§118" },
  { id: "auth_providers", title: "Auth Providers", members: ["Supabase Auth", "Firebase Auth", "Kinde/Appwrite", "provider auth", "middleware guard", "password hashing", "XSS boundary"], primaryLessons: ["lesson_auth_security"], weightedDifficulty: 5, unifiedDocSection: "§119" },
  { id: "design_system_concepts", title: "Design System Concepts", members: ["cn helper", "shadcn/UI", "component variants", "design tokens", "theme tokens", "Radix primitives", "cva", "asChild slot", "component registry", "accessible primitive", "form field composition", "design system testing"], primaryLessons: ["lesson_design_systems"], weightedDifficulty: 6, unifiedDocSection: "§120" },
  { id: "devops_concepts", title: "DevOps Concepts", members: ["build command", "smoke test", "release checklist", "preview deployment", "Docker", "Docker Compose", "environment variables", "health check", "production readiness", "service"], primaryLessons: ["lesson_devops_deploy"], weightedDifficulty: 5, unifiedDocSection: "§121" },
  { id: "html_css_basics", title: "HTML/CSS Basics", members: ["HTML document", "HTML form", "CSS selector", "semantic HTML", "label", "accessibility basics", "cascade and specificity"], primaryLessons: ["lesson_html_css_foundations"], weightedDifficulty: 4, unifiedDocSection: "§122" },
  { id: "nestjs_concepts", title: "Nest.js Concepts", members: ["Nest.js", "module", "controller", "service", "DTO", "pipe", "guard", "interceptor", "decorator", "provider", "dependency injection", "exception filter", "repository pattern", "validation pipe", "testing module"], primaryLessons: ["lesson_nestjs"], weightedDifficulty: 5, unifiedDocSection: "§123" },
  { id: "nextjs_concepts", title: "Next.js Concepts", members: ["Next.js", "App Router", "API route", "dynamic route", "page", "layout", "metadata API", "SEO", "image optimization", "client component", "server component", "route handler", "server action", "file-system routing"], primaryLessons: ["lesson_nextjs"], weightedDifficulty: 5, unifiedDocSection: "§124" },
  { id: "sql_concepts", title: "SQL Concepts", members: ["table", "row", "column", "primary key", "foreign key", "JOIN", "relation", "migration", "ORM", "Prisma", "Drizzle", "transaction", "CRUD"], primaryLessons: ["lesson_sql_orm"], weightedDifficulty: 4, unifiedDocSection: "§125" },
  { id: "git_workflow", title: "Git Workflow", members: ["repository", "branch", "commit", "pull request", "Git", "GitHub workflow"], primaryLessons: ["lesson_tooling_git"], weightedDifficulty: 4, unifiedDocSection: "§126" },
  { id: "express_form_events", title: "Express Form Events", members: ["body-parser", "event.preventDefault"], primaryLessons: ["lesson_17"], weightedDifficulty: 4, unifiedDocSection: "§127" },
  { id: "scope_chain_cluster", title: "Scope Chain", members: ["scope chain"], primaryLessons: ["lesson_closures"], weightedDifficulty: 5, unifiedDocSection: "§128" },
];

function memberSet() {
  const m = new Set();
  CLUSTERS.forEach((c) => c.members.forEach((x) => m.add(x.toLowerCase())));
  return m;
}

// 4-component completion tracking per cluster (PHASE D)
// Each cluster needs 4 things to be "complete":
//   1. hasComparisonTable    — טבלת השוואה ב-COMPARISON_TABLES_DEEP.md
//   2. hasOverviewSixLevels  — 6 רמות לקלסטר כולו
//   3. hasPerMemberSixLevels — 6 רמות לכל חבר בנפרד
//   4. hasCodeBlocks         — בלוקי קוד ל-6 הרמות
const CLUSTER_CONTENT_STATUS = {
  // ↓ Set true when written. Default false.
  memory_variables:           { table: true, overview: true, perMember: true, codeBlocks: true },
  reference_types:            { table: true, overview: true, perMember: true, codeBlocks: true },
  function_kinds:             { table: true, overview: true, perMember: true, codeBlocks: true },
  array_methods:              { table: true, overview: true, perMember: false, codeBlocks: false },
  equality:                   { table: true, overview: true, perMember: true, codeBlocks: true },
  loops:                      { table: true, overview: true, perMember: true, codeBlocks: true },
  async: { table: true, overview: true, perMember: false, codeBlocks: false },
  closures:                   { table: true, overview: true, perMember: true, codeBlocks: true },
  react_state:                { table: true, overview: true, perMember: true, codeBlocks: true },
  react_hooks:                { table: true, overview: true, perMember: true, codeBlocks: true },
  browser_storage: { table: true, overview: true, perMember: false, codeBlocks: false },
  http_methods: { table: true, overview: true, perMember: false, codeBlocks: false },
  databases:                  { table: true, overview: true, perMember: false, codeBlocks: false },
  module_system: { table: true, overview: true, perMember: false, codeBlocks: false },
  auth_security: { table: true, overview: true, perMember: false, codeBlocks: false },
  typescript_basics: { table: true, overview: true, perMember: false, codeBlocks: false },
  primitive_types:            { table: true, overview: true, perMember: true, codeBlocks: true },
  array_mutation_methods: { table: true, overview: true, perMember: false, codeBlocks: false },
  dom_selectors: { table: true, overview: true, perMember: false, codeBlocks: false },
  dom_traversal_children: { table: true, overview: true, perMember: false, codeBlocks: false },
  npm_commands: { table: true, overview: true, perMember: false, codeBlocks: false },
  error_handling: { table: true, overview: true, perMember: false, codeBlocks: false },
  dom_events: { table: true, overview: true, perMember: false, codeBlocks: false },
  react_router_nav: { table: true, overview: true, perMember: false, codeBlocks: false },
  json_methods: { table: true, overview: true, perMember: false, codeBlocks: false },
  to_number: { table: true, overview: true, perMember: false, codeBlocks: false },
  type_check:                 { table: true, overview: true, perMember: true, codeBlocks: true },
  string_methods: { table: true, overview: true, perMember: false, codeBlocks: false },
  math_object: { table: true, overview: true, perMember: false, codeBlocks: false },
  spread_rest:                { table: true, overview: true, perMember: true, codeBlocks: true },
  destructuring:              { table: true, overview: true, perMember: true, codeBlocks: true },
  string_building: { table: true, overview: true, perMember: false, codeBlocks: false },
  associative_structures:     { table: true, overview: true, perMember: true, codeBlocks: true },
  object_static_methods: { table: true, overview: true, perMember: false, codeBlocks: false },
  deep_copy: { table: true, overview: true, perMember: false, codeBlocks: false },
  date_apis: { table: true, overview: true, perMember: false, codeBlocks: false },
  promise_combinators:        { table: true, overview: true, perMember: true, codeBlocks: true },
  async_generations:          { table: true, overview: true, perMember: true, codeBlocks: true },
  timers: { table: true, overview: true, perMember: false, codeBlocks: false },
  event_loop:                 { table: true, overview: true, perMember: true, codeBlocks: true },
  http_clients:               { table: true, overview: true, perMember: false, codeBlocks: false },
  dom_text_writing:           { table: true, overview: true, perMember: true, codeBlocks: true },
  dom_node_inserting: { table: true, overview: true, perMember: false, codeBlocks: false },
  dom_node_creation: { table: true, overview: true, perMember: false, codeBlocks: false },
  classlist_api: { table: true, overview: true, perMember: false, codeBlocks: false },
  dom_attributes: { table: true, overview: true, perMember: false, codeBlocks: false },
  event_target:               { table: true, overview: true, perMember: true, codeBlocks: true },
  event_default_propagation:  { table: true, overview: true, perMember: true, codeBlocks: true },
  http_status_codes:          { table: true, overview: true, perMember: true, codeBlocks: true },
  express_request_data:       { table: true, overview: true, perMember: true, codeBlocks: true },
  express_routing_handlers: { table: true, overview: true, perMember: false, codeBlocks: false },
  express_response: { table: true, overview: true, perMember: false, codeBlocks: false },
  mongo_find: { table: true, overview: true, perMember: false, codeBlocks: false },
  mongo_create: { table: true, overview: true, perMember: false, codeBlocks: false },
  mongo_operators: { table: true, overview: true, perMember: false, codeBlocks: false },
  mongoose_concepts:          { table: true, overview: true, perMember: true, codeBlocks: true },
  component_kinds: { table: true, overview: true, perMember: false, codeBlocks: false },
  state_strategies:           { table: true, overview: true, perMember: true, codeBlocks: true },
  react_memoization:          { table: true, overview: true, perMember: true, codeBlocks: true },
  useeffect_deps:             { table: true, overview: true, perMember: true, codeBlocks: true },
  react_grouping: { table: true, overview: true, perMember: false, codeBlocks: false },
  form_control: { table: true, overview: true, perMember: false, codeBlocks: false },
  composition_patterns: { table: true, overview: true, perMember: false, codeBlocks: false },
  error_catching: { table: true, overview: true, perMember: false, codeBlocks: false },
  ts_type_vs_interface:       { table: true, overview: true, perMember: true, codeBlocks: true },
  ts_special_types:           { table: true, overview: true, perMember: true, codeBlocks: true },
  ts_utility_types: { table: true, overview: true, perMember: false, codeBlocks: false },
  ts_const_enum: { table: true, overview: true, perMember: false, codeBlocks: false },
  ts_class_modifiers: { table: true, overview: true, perMember: false, codeBlocks: false },
  auth_methods: { table: true, overview: true, perMember: false, codeBlocks: false },
  cookie_flags: { table: true, overview: true, perMember: false, codeBlocks: false },
  token_lifecycle: { table: true, overview: true, perMember: false, codeBlocks: false },
  css_display:                { table: true, overview: true, perMember: true, codeBlocks: true },
  css_position:               { table: true, overview: true, perMember: true, codeBlocks: true },
  css_units: { table: true, overview: true, perMember: false, codeBlocks: false },
  box_model: { table: true, overview: true, perMember: false, codeBlocks: false },
  flexbox_props: { table: true, overview: true, perMember: false, codeBlocks: false },
  grid_props: { table: true, overview: true, perMember: false, codeBlocks: false },
  box_sizing: { table: true, overview: true, perMember: false, codeBlocks: false },
  git_core: { table: true, overview: true, perMember: false, codeBlocks: false },
  git_merge_strategy: { table: true, overview: true, perMember: false, codeBlocks: false },
  deps_kinds: { table: true, overview: true, perMember: false, codeBlocks: false },
  package_managers: { table: true, overview: true, perMember: false, codeBlocks: false },
  code_quality_tools: { table: true, overview: true, perMember: false, codeBlocks: false },
  rendering_strategies:       { table: true, overview: true, perMember: true, codeBlocks: true },
  deploy_platforms: { table: true, overview: true, perMember: false, codeBlocks: false },
  docker_concepts: { table: true, overview: true, perMember: false, codeBlocks: false },
  cicd: { table: true, overview: true, perMember: false, codeBlocks: false },
  function_definition_kinds:  { table: true, overview: true, perMember: true, codeBlocks: true },
  mutability_patterns: { table: true, overview: true, perMember: false, codeBlocks: false },
  code_decisions: { table: true, overview: true, perMember: false, codeBlocks: false },
  array_reference_cluster:    { table: true, overview: true, perMember: true, codeBlocks: true },
  jsx_rendering: { table: true, overview: true, perMember: false, codeBlocks: false },
  ts_react:                   { table: true, overview: true, perMember: true, codeBlocks: true },
  ai_patterns:                { table: true, overview: true, perMember: true, codeBlocks: true },
  // ─── 34 newly-added orphan-absorber clusters (2026-05-02 evening) ───
  oop_class_basics:           { table: true, overview: true, perMember: false, codeBlocks: true },
  dom_basics:                 { table: true, overview: true, perMember: false, codeBlocks: true },
  browser_storage_full:       { table: true, overview: true, perMember: false, codeBlocks: true },
  array_basics:               { table: true, overview: true, perMember: false, codeBlocks: true },
  string_basics:              { table: true, overview: true, perMember: false, codeBlocks: true },
  node_fs:                    { table: true, overview: true, perMember: false, codeBlocks: true },
  cli_basics:                 { table: true, overview: true, perMember: false, codeBlocks: true },
  js_runtime:                 { table: true, overview: true, perMember: false, codeBlocks: true },
  http_protocol_basics:       { table: true, overview: true, perMember: false, codeBlocks: true },
  form_basics:                { table: true, overview: true, perMember: false, codeBlocks: true },
  browser_dev_tools:          { table: true, overview: true, perMember: false, codeBlocks: true },
  control_flow:               { table: true, overview: true, perMember: false, codeBlocks: true },
  js_fundamentals:            { table: true, overview: true, perMember: false, codeBlocks: true },
  mongo_query_operators:      { table: true, overview: true, perMember: false, codeBlocks: true },
  mongo_basics:               { table: true, overview: true, perMember: false, codeBlocks: true },
  mongo_modify:               { table: true, overview: true, perMember: false, codeBlocks: true },
  react_files:                { table: true, overview: true, perMember: false, codeBlocks: true },
  react_styling:              { table: true, overview: true, perMember: false, codeBlocks: true },
  react_ecosystem:            { table: true, overview: true, perMember: false, codeBlocks: true },
  react_components_handlers:  { table: true, overview: true, perMember: false, codeBlocks: true },
  react_context_pattern:      { table: true, overview: true, perMember: false, codeBlocks: true },
  useref_patterns:            { table: true, overview: true, perMember: false, codeBlocks: true },
  tailwind_basics:            { table: true, overview: true, perMember: false, codeBlocks: true },
  ts_setup:                   { table: true, overview: true, perMember: false, codeBlocks: true },
  auth_providers:             { table: true, overview: true, perMember: false, codeBlocks: true },
  design_system_concepts:     { table: true, overview: true, perMember: false, codeBlocks: true },
  devops_concepts:            { table: true, overview: true, perMember: false, codeBlocks: true },
  html_css_basics:            { table: true, overview: true, perMember: false, codeBlocks: true },
  nestjs_concepts:            { table: true, overview: true, perMember: false, codeBlocks: true },
  nextjs_concepts:            { table: true, overview: true, perMember: false, codeBlocks: true },
  sql_concepts:               { table: true, overview: true, perMember: false, codeBlocks: true },
  git_workflow:               { table: true, overview: true, perMember: false, codeBlocks: true },
  express_form_events:        { table: true, overview: true, perMember: false, codeBlocks: true },
  scope_chain_cluster:        { table: true, overview: true, perMember: false, codeBlocks: true },
};

function clusterCompletionScore(clusterId) {
  const status = CLUSTER_CONTENT_STATUS[clusterId];
  if (!status) return { score: 0, total: 4, components: { table: false, overview: false, perMember: false, codeBlocks: false } };
  const score =
    (status.table ? 1 : 0) +
    (status.overview ? 1 : 0) +
    (status.perMember ? 1 : 0) +
    (status.codeBlocks ? 1 : 0);
  return { score, total: 4, components: status };
}

function clusterFor(conceptName, lessonId) {
  const ln = (conceptName || "").toLowerCase();
  const matches = CLUSTERS.filter((c) => c.members.some((m) => m.toLowerCase() === ln));
  if (!matches.length) return null;
  // Lesson-scoped clusters only match if the lesson matches their primaryLessons
  if (lessonId) {
    const scoped = matches.find((c) => c.lessonScoped && c.primaryLessons.includes(lessonId));
    if (scoped) return scoped;
    const unscoped = matches.find((c) => !c.lessonScoped);
    if (unscoped) return unscoped;
  }
  // No lesson context: prefer non-lesson-scoped, otherwise first match
  return matches.find((c) => !c.lessonScoped) || matches[0];
}

function loadLessonFile(filename) {
  const filePath = path.join(DATA_DIR, filename);
  const code = fs.readFileSync(filePath, "utf8");
  const sb = { window: {}, module: { exports: {} } };
  sb.window = sb;
  vm.createContext(sb);
  try { vm.runInContext(code, sb, { filename }); } catch (_) { return null; }
  const key = Object.keys(sb.window).find((k) => k.startsWith("LESSON_") && sb.window[k] && sb.window[k].concepts);
  return key ? sb.window[key] : null;
}

function loadBank() {
  const sb = { module: { exports: {} } };
  sb.window = sb;
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync(path.join(DATA_DIR, "questions_bank.js"), "utf8"), sb, { filename: "bank" });
  return sb.QUESTIONS_BANK;
}

function getNested(obj, path) {
  return path.split(".").reduce((acc, k) => acc && acc[k], obj);
}

function isFilled(value) {
  if (value == null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return Boolean(value);
}

function discoverLessonFiles() {
  return fs.readdirSync(DATA_DIR)
    .filter((f) => /^lesson(_|\d).*\.js$/i.test(f) && !f.includes(".test."))
    .sort((a, b) => {
      // Numeric lessons first (lesson11 < lesson12), then named bridges
      const an = a.match(/^lesson(\d+)\.js$/);
      const bn = b.match(/^lesson(\d+)\.js$/);
      if (an && bn) return Number(an[1]) - Number(bn[1]);
      if (an) return -1;
      if (bn) return 1;
      return a.localeCompare(b);
    });
}

function main() {
  const files = discoverLessonFiles();
  const bank = loadBank();
  const qCounts = {};
  bank.mc.forEach((q) => { if (q.conceptKey) { qCounts[q.conceptKey] = qCounts[q.conceptKey] || { mc: 0, fill: 0 }; qCounts[q.conceptKey].mc++; } });
  bank.fill.forEach((q) => { if (q.conceptKey) { qCounts[q.conceptKey] = qCounts[q.conceptKey] || { mc: 0, fill: 0 }; qCounts[q.conceptKey].fill++; } });

  const lessons = [];
  files.forEach((f) => {
    const l = loadLessonFile(f);
    if (!l || !l.concepts || !l.id) return;
    lessons.push({ file: f, lesson: l });
  });

  const lines = [];
  lines.push("# Lesson Completion Audit — Per-Concept × Per-Part");
  lines.push("");
  lines.push(`> נוצר אוטומטית ע״י \`scripts/audit_lesson_completion.js\` — תאריך: ${new Date().toISOString().slice(0,10)}`);
  lines.push("");
  lines.push("## חוקים");
  lines.push("- ✓ = השדה קיים ולא ריק");
  lines.push("- ✗ = שדה חסר (יש למלא ידנית)");
  lines.push("- MC/Fill = שאלות במאגר עבור המושג");
  lines.push("");
  lines.push("## חלקים שאוטיים בכל מושג");
  lines.push("");
  lines.push(PARTS.map((p) => `- ${p.label} (\`${p.key}\`)`).join("\n"));
  lines.push("");
  lines.push("---");
  lines.push("");

  // Aggregate stats
  const lessonStats = [];
  const partStats = {}; // partKey → { filled, total }
  PARTS.forEach((p) => { partStats[p.key] = { filled: 0, total: 0, label: p.label }; });

  // Per-lesson detail
  lessons.forEach(({ file, lesson }) => {
    const concepts = lesson.concepts;
    const lessonId = lesson.id;
    let lessonFilled = 0;
    let lessonTotal = 0;
    const perLevelFilled = { grandma: 0, child: 0, soldier: 0, student: 0, junior: 0, professor: 0 };
    const perLevelTotal = concepts.length;
    let conceptsAllLevels = 0;

    concepts.forEach((c) => {
      let allLevels = true;
      LEVEL_KEYS.forEach((k) => {
        if (isFilled(c.levels && c.levels[k])) perLevelFilled[k]++;
        else allLevels = false;
      });
      if (allLevels) conceptsAllLevels++;
      PARTS.forEach((p) => {
        const v = getNested(c, p.key);
        const filled = isFilled(v);
        if (filled) lessonFilled++;
        lessonTotal++;
        partStats[p.key].total++;
        if (filled) partStats[p.key].filled++;
      });
    });

    const pct = lessonTotal ? Math.round((lessonFilled / lessonTotal) * 100) : 0;
    lessonStats.push({
      id: lessonId,
      file,
      title: lesson.title,
      conceptCount: concepts.length,
      filled: lessonFilled,
      total: lessonTotal,
      pct,
      perLevelFilled,
      perLevelTotal,
      conceptsAllLevels,
    });

    // Lesson-level table
    lines.push(`## ${lessonId} — ${lesson.title}`);
    lines.push(`*${concepts.length} מושגים · ${lessonFilled}/${lessonTotal} תאים = **${pct}%** השלמה*`);
    lines.push("");
    lines.push("> **חוק חדש (2026-05-02):** difficulty ≤ 6 → לא ממלאים, ניתן ל-V (אישור ידיעה + בחינה אנטי-רמאות במאמן). difficulty ≥ 7 → חובה למלא הכל.");
    lines.push("> **כלל פדגוגי:** מושגים בעלי `cluster` נלמדים יחד בדף-מאוחד, לא בנפרד.");
    lines.push("");
    // Header row — added "קושי" + "קלסטר" + "מצב" columns
    const headerCells = ["#", "מושג", "קושי", "קלסטר", "מצב"].concat(PARTS.map((p) => p.label)).concat(["MC", "Fill", "מלא"]);
    lines.push("| " + headerCells.join(" | ") + " |");
    lines.push("|" + headerCells.map(() => "---").join("|") + "|");
    concepts.forEach((c, idx) => {
      const ownDiff = typeof c.difficulty === "number" ? c.difficulty : 0;
      const cluster = clusterFor(c.conceptName, lessonId);
      // Effective difficulty: if concept is in a cluster, use the cluster's difficulty
      // (cluster acts as a single super-concept per the new pedagogical rule)
      const diff = cluster ? cluster.weightedDifficulty : ownDiff;
      const diffLabel = cluster
        ? `${diff} (קלסטר; פרטני ${ownDiff})`
        : String(diff || "-");
      const policy = diff >= 7 ? "🔴 למלא" : (diff >= 6 ? "🟡 מלא + V" : "🟢 V בלבד");
      const clusterCell = cluster
        ? `🧩 ${cluster.title}${cluster.unifiedDocSection ? " ✓" : " ✗"}`
        : "— (יחיד)";
      const cells = [(idx + 1).toString(), c.conceptName, diffLabel, clusterCell, policy];
      let conceptFilled = 0;
      PARTS.forEach((p) => {
        const v = getNested(c, p.key);
        const filled = isFilled(v);
        cells.push(filled ? "✓" : "✗");
        if (filled) conceptFilled++;
      });
      const qc = qCounts[`${lessonId}::${c.conceptName}`] || { mc: 0, fill: 0 };
      cells.push(String(qc.mc));
      cells.push(String(qc.fill));
      cells.push(`${conceptFilled}/${PARTS.length}`);
      lines.push("| " + cells.join(" | ") + " |");
    });
    lines.push("");
    // Per-level summary
    lines.push("**אחוזי 6 רמות בשיעור:**");
    LEVEL_KEYS.forEach((k) => {
      const f = perLevelFilled[k];
      const t = perLevelTotal;
      const lvlPct = t ? Math.round((f / t) * 100) : 0;
      lines.push(`- ${k}: ${f}/${t} = ${lvlPct}%`);
    });
    lines.push("");
    lines.push(`**מושגים עם כל 6 הרמות:** ${conceptsAllLevels}/${concepts.length}`);
    lines.push("");
    lines.push("---");
    lines.push("");
  });

  // Master summary
  lines.unshift(""); // padding
  const summary = [];
  summary.push("## 📊 טבלת סיכום — כל השיעורים");
  summary.push("");
  summary.push("| Lesson | Title | Concepts | Total cells | Filled | % | All-6-levels |");
  summary.push("|---|---|---:|---:|---:|---:|---:|");
  let grandFilled = 0, grandTotal = 0;
  lessonStats.forEach((s) => {
    summary.push(`| ${s.id} | ${s.title.slice(0, 50)} | ${s.conceptCount} | ${s.total} | ${s.filled} | ${s.pct}% | ${s.conceptsAllLevels}/${s.conceptCount} |`);
    grandFilled += s.filled;
    grandTotal += s.total;
  });
  const grandPct = grandTotal ? Math.round((grandFilled / grandTotal) * 100) : 0;
  summary.push(`| **TOTAL** | — | — | **${grandTotal}** | **${grandFilled}** | **${grandPct}%** | — |`);
  summary.push("");

  // Per-level totals across ALL lessons
  summary.push("## 📊 השלמה לפי רמה (כל המושגים)");
  summary.push("");
  summary.push("| רמה | מלא | סה״כ | % |");
  summary.push("|---|---:|---:|---:|");
  LEVEL_KEYS.forEach((k) => {
    let f = 0, t = 0;
    lessonStats.forEach((s) => { f += s.perLevelFilled[k]; t += s.perLevelTotal; });
    const pct = t ? Math.round((f / t) * 100) : 0;
    summary.push(`| ${k} | ${f} | ${t} | ${pct}% |`);
  });
  summary.push("");

  // Per-part totals
  summary.push("## 📊 השלמה לפי חלק (כל המושגים בכל השיעורים)");
  summary.push("");
  summary.push("| חלק | מלא | סה״כ | % |");
  summary.push("|---|---:|---:|---:|");
  PARTS.forEach((p) => {
    const ps = partStats[p.key];
    const pct = ps.total ? Math.round((ps.filled / ps.total) * 100) : 0;
    summary.push(`| ${p.label} | ${ps.filled} | ${ps.total} | ${pct}% |`);
  });
  summary.push("");

  // To-do list ranked by gap size
  summary.push("## 📝 לוח משימות — שיעורים מסודרים לפי פער (הגדול קודם)");
  summary.push("");
  summary.push("| Rank | Lesson | Title | Gap | % | Cells לכתיבה |");
  summary.push("|---:|---|---|---:|---:|---:|");
  const ranked = lessonStats.slice().sort((a, b) => (b.total - b.filled) - (a.total - a.filled));
  ranked.forEach((s, i) => {
    summary.push(`| ${i + 1} | ${s.id} | ${s.title.slice(0, 45)} | ${s.total - s.filled} | ${s.pct}% | ${s.total - s.filled} |`);
  });
  summary.push("");

  // ─────────────────────────────────────────────────────────────
  // CLUSTERS — דף-לימוד מאוחד לכל קלסטר השוואה
  // ─────────────────────────────────────────────────────────────
  summary.push("## 🧩 קלסטרים — דפי-לימוד מאוחדים (כלל פדגוגי 2026-05-02)");
  summary.push("");
  summary.push("**כלל:** מושגים שמופיעים יחד בטבלת השוואה הופכים לדף-לימוד אחד (cluster), לא 2-3 כרטיסים נפרדים.");
  summary.push("**יחידת המדידה החדשה:** קלסטר = מושג. **כל קלסטר מקבל רמת קושי 1-10 משלו** והוא נמדד, נבחן, ומסומן V כיחידה אחת — בדיוק כמו מושג בודד.");
  summary.push("**מדיניות לפי קושי הקלסטר:** ≤ 6 → V מותר (אנטי-רמאות במאמן). ≥ 7 → חובה למלא כל הbלוק המאוחד.");
  summary.push("");
  summary.push(`**סה״כ קלסטרים:** ${CLUSTERS.length}`);
  summary.push("");
  summary.push("| # | Cluster (= מושג-על) | קושי | מדיניות | חברים | שיעור-מקור | תוכן מאוחד? | רכיבים 4/4 |");
  summary.push("|---:|---|---:|---|---|---|:---:|:---|");
  // Build a fast lookup of which clusters have data
  const conceptsInLessons = new Map(); // conceptName(lc) → {lessonId, concept}
  lessons.forEach(({ lesson }) => {
    lesson.concepts.forEach((c) => {
      conceptsInLessons.set(c.conceptName.toLowerCase(), { lessonId: lesson.id, concept: c });
    });
  });
  CLUSTERS.forEach((cl, i) => {
    const presentMembers = cl.members.filter((m) => conceptsInLessons.has(m.toLowerCase()));
    const docMark = cl.unifiedDocSection ? `✅ ${cl.unifiedDocSection}` : "❌ חסר";
    const diff = cl.weightedDifficulty;
    const policy = diff >= 7 ? "🔴 חובה למלא" : (diff === 6 ? "🟡 גבולי + V" : "🟢 V בלבד");
    const completion = clusterCompletionScore(cl.id);
    const compStr = `${completion.score}/4`;
    const compDetail = `T${completion.components.table?"✓":"✗"} O${completion.components.overview?"✓":"✗"} M${completion.components.perMember?"✓":"✗"} C${completion.components.codeBlocks?"✓":"✗"}`;
    summary.push(`| ${i + 1} | **${cl.title}** | ${diff}/10 | ${policy} | ${presentMembers.join(" · ")} | ${cl.primaryLessons.join(", ")} | ${docMark} | ${compStr} ${compDetail} |`);
  });
  summary.push("");
  summary.push("> **מקרא רכיבי מילוי (4 לכל קלסטר):** T = Table · O = Overview 6-levels · M = Per-Member 6-levels · C = Code blocks 6-levels");
  summary.push("");

  // Overall content completion stats
  const total4Score = CLUSTERS.reduce((acc, cl) => {
    const c = clusterCompletionScore(cl.id);
    return acc + c.score;
  }, 0);
  const maxScore = CLUSTERS.length * 4;
  const fullClusters = CLUSTERS.filter((cl) => clusterCompletionScore(cl.id).score === 4).length;
  summary.push(`**סטטוס כולל:** ${total4Score} / ${maxScore} רכיבים מולאו (${Math.round((total4Score/maxScore)*100)}%) · ${fullClusters} קלסטרים מלאים 4/4 מתוך ${CLUSTERS.length}`);
  summary.push("");

  // Cluster-as-concept summary: how many at each difficulty band
  const clBy = { hard: [], mid: [], easy: [] };
  CLUSTERS.forEach((cl) => {
    if (cl.weightedDifficulty >= 7) clBy.hard.push(cl);
    else if (cl.weightedDifficulty === 6) clBy.mid.push(cl);
    else clBy.easy.push(cl);
  });
  summary.push("### 📊 סיכום קלסטרים לפי קושי (כל אחד נחשב כמושג-על אחד)");
  summary.push("");
  summary.push("| תחום קושי | מספר קלסטרים | מדיניות | חוב פדגוגי |");
  summary.push("|---|---:|---|---:|");
  summary.push(`| 🔴 קושי 7+ (קלסטר-מושג קשה) | ${clBy.hard.length} | חובה בלוק-לימוד מאוחד | ${clBy.hard.filter((c) => !c.unifiedDocSection).length} חסרים |`);
  summary.push(`| 🟡 קושי 6 (קלסטר-מושג גבולי) | ${clBy.mid.length} | מומלץ בלוק + V מותר | ${clBy.mid.filter((c) => !c.unifiedDocSection).length} חסרים |`);
  summary.push(`| 🟢 קושי ≤ 5 (קלסטר-מושג קל) | ${clBy.easy.length} | V בלבד | ${clBy.easy.filter((c) => !c.unifiedDocSection).length} חסרים |`);
  summary.push("");

  // Cluster gap report
  const missingDocs = CLUSTERS.filter((c) => !c.unifiedDocSection);
  const haveDocs = CLUSTERS.filter((c) => c.unifiedDocSection);
  summary.push(`**יש להם בלוק לימוד מאוחד:** ${haveDocs.length} / ${CLUSTERS.length}`);
  summary.push(`**חסר בלוק לימוד מאוחד:** ${missingDocs.length} / ${CLUSTERS.length}`);
  summary.push("");
  if (missingDocs.length) {
    summary.push("### 🔴 קלסטרים שצריכים בלוק-לימוד-מאוחד (סדר כתיבה לפי קושי יורד):");
    summary.push("");
    summary.push("| Rank | Cluster | חברים | שיעור-מקור | קושי |");
    summary.push("|---:|---|---|---|---:|");
    missingDocs
      .slice()
      .sort((a, b) => b.weightedDifficulty - a.weightedDifficulty)
      .forEach((c, i) => {
        summary.push(`| ${i + 1} | **${c.title}** | ${c.members.join(" · ")} | ${c.primaryLessons.join(", ")} | ${c.weightedDifficulty} |`);
      });
    summary.push("");
  }

  // Concepts NOT in any cluster (orphans)
  const allClusterMembers = memberSet();
  const orphans = [];
  lessons.forEach(({ lesson }) => {
    lesson.concepts.forEach((c) => {
      if (!allClusterMembers.has(c.conceptName.toLowerCase())) {
        const diff = typeof c.difficulty === "number" ? c.difficulty : 0;
        if (diff >= 7) orphans.push({ lessonId: lesson.id, name: c.conceptName, diff });
      }
    });
  });
  if (orphans.length) {
    summary.push(`### 🔍 מושגים קשים (diff≥7) שעדיין לא שובצו לקלסטר: ${orphans.length}`);
    summary.push("");
    summary.push("> אלה מועמדים לקלסטר חדש או שילוב בקלסטר קיים. אם המושג עומד לבד באמת — מותר להישאר בודד.");
    summary.push("");
    summary.push("| Lesson | Concept | קושי |");
    summary.push("|---|---|---:|");
    orphans.sort((a, b) => b.diff - a.diff).forEach((o) => {
      summary.push(`| ${o.lessonId} | ${o.name} | ${o.diff} |`);
    });
    summary.push("");
  }
  summary.push("---");
  summary.push("");

  // Difficulty-tier queue — concepts ranked by difficulty descending
  summary.push("## 🎯 תור מילוי מושגים לפי קושי (יורד) — חובה למלא רק difficulty ≥ 7");
  summary.push("");
  summary.push("**חוק:** מושגים עם `difficulty ≤ 6` לא ממלאים — המשתמש מסמן עליהם V בתצוגת שורה אחת והמאמן בודק אותו לאנטי-רמאות.");
  summary.push("");
  const allConcepts = [];
  lessons.forEach(({ lesson }) => {
    lesson.concepts.forEach((c) => {
      let conceptFilled = 0;
      PARTS.forEach((p) => { if (isFilled(getNested(c, p.key))) conceptFilled++; });
      allConcepts.push({
        lessonId: lesson.id,
        conceptName: c.conceptName,
        difficulty: typeof c.difficulty === "number" ? c.difficulty : 0,
        filled: conceptFilled,
        total: PARTS.length,
      });
    });
  });

  const tiers = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  tiers.forEach((tier) => {
    const items = allConcepts.filter((c) => c.difficulty === tier);
    if (!items.length) return;
    const policy = tier >= 7 ? "🔴 חובה למלא הכל" : (tier === 6 ? "🟡 גבולי - מלא + V" : "🟢 דלג + V בלבד");
    summary.push(`### Difficulty ${tier} — ${items.length} מושגים — ${policy}`);
    summary.push("");
    summary.push("| Lesson | Concept | מצב מילוי |");
    summary.push("|---|---|---:|");
    items.forEach((c) => {
      summary.push(`| ${c.lessonId} | ${c.conceptName} | ${c.filled}/${c.total} |`);
    });
    summary.push("");
  });
  summary.push("---");
  summary.push("");

  const final = ["# Lesson Completion Audit — Per-Concept × Per-Part", ""].concat(summary).concat(lines.slice(1));
  fs.writeFileSync(OUT_FILE, final.join("\n"), "utf8");
  console.log(`✓ Wrote ${OUT_FILE}`);
  console.log(`  ${lessons.length} lessons audited`);
  console.log(`  Total cells: ${grandTotal}, filled: ${grandFilled}, ${grandPct}%`);
  console.log(`  Lessons sorted by gap (top 5):`);
  ranked.slice(0, 5).forEach((s) => console.log(`    ${s.id}: ${s.total - s.filled} missing (${s.pct}%)`));
}

main();
