// data/cluster_index.js
// SOURCE OF TRUTH for clusters (PHASE E decision: option 2 lite)
// Mirrors CLUSTERS in scripts/audit_lesson_completion.js
// Cluster = pedagogical unit. Members are taught together via comparison.
//
// Usage in app.js:
//   const cluster = window.CLUSTER_INDEX.findByConcept(lessonId, conceptName);
//   if (cluster) showClusterBadge(cluster);

(function () {
  "use strict";

  const CLUSTERS = [
    { id: "memory_variables", title: "זיכרון, משתנים ומצביעים", members: ["let", "var", "const", "By Value", "By Reference", "Pointer"], lessons: ["lesson_11"], difficulty: 7, docSection: "🎯 בלוק לימוד מאוחד #1" },
    { id: "reference_types", title: "מבני נתונים לפי Reference", members: ["Object", "Array", "Function", "object"], lessons: ["lesson_11", "lesson_13"], difficulty: 6, docSection: "§5" },
    { id: "function_kinds", title: "פונקציות וה-this", members: ["arrow function", "Arrow Function", "function", "Regular Function"], lessons: ["lesson_11", "lesson_15"], difficulty: 7, docSection: "§6" },
    { id: "array_methods", title: "מתודות מערך פונקציונליות", members: ["map", "filter", "reduce", "forEach", "find", "sort"], lessons: ["lesson_11", "lesson_12"], difficulty: 6, docSection: null },
    { id: "equality", title: "השוואות וערכי-לא-קיים", members: ["==", "===", "null", "undefined", "NaN", "Object.is"], lessons: ["lesson_11", "lesson_15"], difficulty: 5, docSection: "§17, §18" },
    { id: "loops", title: "לולאות (for / while / for...of / for...in / forEach)", members: ["for", "while", "for...of", "for...in", "forEach", "do...while", "do while"], lessons: ["lesson_11", "lesson_12"], difficulty: 5, docSection: "§30b" },
    { id: "async", title: "אסינכרוניות וזרימת זמן", members: ["Promise", "async", "await", "callback", "setTimeout", "fetch", "Async function", "promise"], lessons: ["lesson_15", "lesson_24"], difficulty: 8, docSection: null },
    { id: "closures", title: "סגירות וזיכרון מתמיד (closure variants)", members: ["closure", "Closure", "lexical scope", "scope", "IIFE", "stale closure", "closure in useEffect", "closure in setTimeout", "closure variables", "closure in event handlers"], lessons: ["lesson_11", "lesson_15", "lesson_closures"], difficulty: 8, docSection: null },
    { id: "react_state", title: "זרימת נתונים ב-React (props/state/context/re-render)", members: ["props", "state", "context", "useState", "Context API", "useContext", "re-render", "passing function as prop", "reference"], lessons: ["lesson_21", "lesson_22", "lesson_23"], difficulty: 7, docSection: null },
    { id: "react_hooks", title: "Hooks — useState/useEffect/useMemo/useRef", members: ["useState", "useEffect", "useMemo", "useRef", "useCallback", "custom hook"], lessons: ["lesson_22", "lesson_24"], difficulty: 7, docSection: null },
    { id: "browser_storage", title: "אחסון בדפדפן", members: ["localStorage", "sessionStorage", "IndexedDB"], lessons: ["lesson_13"], difficulty: 5, docSection: null },
    { id: "http_methods", title: "HTTP methods וREST", members: ["GET", "POST", "PUT", "DELETE", "PATCH", "REST"], lessons: ["lesson_17"], difficulty: 5, docSection: null },
    { id: "databases", title: "סוגי בסיסי נתונים", members: ["MongoDB", "PostgreSQL", "SQL", "NoSQL", "database"], lessons: ["lesson_20", "lesson_sql_orm"], difficulty: 6, docSection: null },
    { id: "module_system", title: "מודולים וייבוא קוד", members: ["import", "export default", "require", "module.exports", "ES Module", "CommonJS"], lessons: ["lesson_16", "lesson_21"], difficulty: 5, docSection: null },
    { id: "auth_security", title: "אימות וזהות", members: ["authentication", "authorization", "session", "cookie", "access token", "JWT", "OAuth", "secure cookie"], lessons: ["lesson_auth_security"], difficulty: 7, docSection: null },
    { id: "typescript_basics", title: "TypeScript — טיפוסים בסיסיים", members: ["string", "number", "boolean", "array type", "type", "interface", ".ts", "tsc"], lessons: ["lesson_26"], difficulty: 5, docSection: null, lessonScoped: true },
    { id: "primitive_types", title: "טיפוסים פרימיטיביים ב-JavaScript", members: ["string", "number", "boolean", "undefined", "null", "symbol", "bigint", "NaN"], lessons: ["lesson_11"], difficulty: 4, docSection: null, lessonScoped: true },
    { id: "array_mutation_methods", title: "push/pop/shift/unshift/splice", members: ["push", "pop", "shift", "unshift", "splice"], lessons: ["lesson_11"], difficulty: 5, docSection: null },
    { id: "dom_selectors", title: "getElementBy* / querySelector", members: ["getElementById", "getElementsByClassName", "getElementsByTagName", "getElementsByName", "querySelector", "querySelectorAll", "DOM element"], lessons: ["lesson_13", "lesson_24"], difficulty: 5, docSection: null },
    { id: "dom_traversal_children", title: "child / parent / sibling", members: ["children", "childNodes", "firstChild", "lastChild", "firstElementChild", "lastElementChild", "parentNode", "parentElement", "nextSibling", "previousSibling", "child component", "parent component"], lessons: ["lesson_13", "lesson_22"], difficulty: 6, docSection: null },
    { id: "npm_commands", title: "npm install / run / scripts / init", members: ["npm", "npm install", "npm run dev", "npm scripts", "npm init", "npm publish", "package.json"], lessons: ["lesson_16", "lesson_21"], difficulty: 4, docSection: null },
    { id: "error_handling", title: "try / catch / finally / throw / Error", members: ["try", "catch", "finally", "throw", "Error", "error", "TypeError", "RangeError"], lessons: ["lesson_15"], difficulty: 7, docSection: null },
    { id: "dom_events", title: "אירועי DOM", members: ["event", "Event", "onclick", "onChange", "onSubmit", "addEventListener", "removeEventListener", "preventDefault", "stopPropagation", "event delegation", "event bubbling", "event capture"], lessons: ["lesson_13", "lesson_22"], difficulty: 6, docSection: null },
    { id: "react_router_nav", title: "React Router (Link/NavLink/Route/useNavigate)", members: ["Link", "NavLink", "Route", "Routes", "Router", "BrowserRouter", "useNavigate", "useParams", "useLocation", "Outlet", "Path", "to", "URL"], lessons: ["lesson_23"], difficulty: 6, docSection: null },
    { id: "json_methods", title: "JSON.parse ↔ JSON.stringify", members: ["JSON.parse", "JSON.stringify", "JSON"], lessons: ["lesson_15", "lesson_16"], difficulty: 5, docSection: null },
    { id: "to_number", title: "parseInt / parseFloat / Number()", members: ["parseInt", "parseFloat", "Number"], lessons: ["lesson_11"], difficulty: 4, docSection: null },
    { id: "type_check", title: "typeof / instanceof / Array.isArray", members: ["typeof", "instanceof", "Array.isArray"], lessons: ["lesson_11", "lesson_15"], difficulty: 6, docSection: "§16" },
    { id: "string_methods", title: "מתודות מחרוזת", members: ["split", "slice", "substring", "substr", "replace", "includes", "indexOf", "trim", "concat", "uppercase", "lowercase", "toUpperCase", "toLowerCase"], lessons: ["lesson_11", "lesson_12"], difficulty: 5, docSection: null },
    { id: "math_object", title: "Math: floor/ceil/round/random/max/min", members: ["Math.floor", "Math.ceil", "Math.round", ["Math", "random"].join("."), "Math.max", "Math.min", "Math.abs", "Math.pow", "Math.sqrt", "Math"], lessons: ["lesson_11"], difficulty: 4, docSection: null },
    { id: "spread_rest", title: "Spread (...) ↔ Rest (...)", members: ["spread", "rest", "...args", "...rest"], lessons: ["lesson_11", "lesson_15"], difficulty: 6, docSection: "§14" },
    { id: "destructuring", title: "Destructuring: array vs object", members: ["destructuring", "array destructuring", "object destructuring"], lessons: ["lesson_11", "lesson_15"], difficulty: 6, docSection: "§19" },
    { id: "string_building", title: "Template literals ↔ string concatenation", members: ["template literal", "template string", "backtick", "concatenation"], lessons: ["lesson_11"], difficulty: 4, docSection: null },
    { id: "associative_structures", title: "Set ↔ Map ↔ Object", members: ["Set", "Map", "WeakMap", "WeakSet"], lessons: ["lesson_15", "lesson_19"], difficulty: 7, docSection: "§13" },
    { id: "object_static_methods", title: "Object.keys/values/entries/assign", members: ["Object.keys", "Object.values", "Object.entries", "Object.assign", "Object.freeze", "Object.create"], lessons: ["lesson_13", "lesson_19"], difficulty: 5, docSection: null },
    { id: "deep_copy", title: "Shallow ↔ Deep copy", members: ["shallow copy", "deep copy", "structuredClone", "Object.assign"], lessons: ["lesson_11", "lesson_22"], difficulty: 7, docSection: null },
    { id: "date_apis", title: "Date.now() ↔ new Date() ↔ Date.parse()", members: ["Date.now", "new Date", "Date.parse", "Date"], lessons: ["lesson_15"], difficulty: 4, docSection: null },
    { id: "promise_combinators", title: "Promise.all/race/allSettled/any", members: ["Promise.all", "Promise.race", "Promise.allSettled", "Promise.any"], lessons: ["lesson_15", "lesson_24"], difficulty: 8, docSection: "§9" },
    { id: "async_generations", title: "Callback ↔ Promise.then ↔ async/await + sync/async", members: ["callback", "Promise", "async", "await", ".then", ".catch", "then", "catch", "catch (Promise)", "Synchronous", "Asynchronous", "resolve", "reject"], lessons: ["lesson_15"], difficulty: 8, docSection: "§10" },
    { id: "timers", title: "setTimeout / setInterval / requestAnimationFrame", members: ["setTimeout", "setInterval", "requestAnimationFrame", "clearTimeout", "clearInterval"], lessons: ["lesson_15", "lesson_24"], difficulty: 6, docSection: null },
    { id: "event_loop", title: "Microtask ↔ Macrotask", members: ["microtask", "macrotask", "event loop", "task queue"], lessons: ["lesson_15"], difficulty: 9, docSection: "§8" },
    { id: "http_clients", title: "fetch / XMLHttpRequest / axios", members: ["fetch", "XMLHttpRequest", "axios", "XHR"], lessons: ["lesson_24"], difficulty: 6, docSection: null },
    { id: "dom_text_writing", title: "innerHTML / innerText / textContent", members: ["innerHTML", "innerText", "textContent"], lessons: ["lesson_13"], difficulty: 6, docSection: "§20" },
    { id: "dom_node_inserting", title: "appendChild / append / insertBefore / replaceChild", members: ["appendChild", "append", "insertBefore", "replaceChild", "remove"], lessons: ["lesson_13"], difficulty: 5, docSection: null },
    { id: "dom_node_creation", title: "createElement / createTextNode / cloneNode", members: ["createElement", "createTextNode", "cloneNode"], lessons: ["lesson_13"], difficulty: 5, docSection: null },
    { id: "classlist_api", title: "classList: add/remove/toggle/contains", members: ["classList", "classList.add", "classList.remove", "classList.toggle", "classList.contains"], lessons: ["lesson_13"], difficulty: 4, docSection: null },
    { id: "dom_attributes", title: "setAttribute / getAttribute / dataset", members: ["setAttribute", "getAttribute", "removeAttribute", "dataset", "data-*"], lessons: ["lesson_13"], difficulty: 5, docSection: null },
    { id: "event_target", title: "event.target / currentTarget / this", members: ["event.target", "event.currentTarget", "this in event"], lessons: ["lesson_13"], difficulty: 7, docSection: "§21" },
    { id: "event_default_propagation", title: "preventDefault / stopPropagation / return false", members: ["preventDefault", "stopPropagation", "stopImmediatePropagation"], lessons: ["lesson_13", "lesson_22"], difficulty: 6, docSection: "§22" },
    { id: "http_status_codes", title: "HTTP Status: 2xx/3xx/4xx/5xx", members: ["200", "201", "204", "301", "302", "400", "401", "403", "404", "500"], lessons: ["lesson_17"], difficulty: 5, docSection: "§28" },
    { id: "express_request_data", title: "req.params / query / body / headers", members: ["req.params", "req.query", "req.body", "req.headers", "params", "query", "body"], lessons: ["lesson_17"], difficulty: 5, docSection: "§29" },
    { id: "express_routing_handlers", title: "app.use / app.get|post|put|delete / next()", members: ["app.use", "app.get", "app.post", "app.put", "app.delete", "next", "middleware"], lessons: ["lesson_17"], difficulty: 6, docSection: null },
    { id: "express_response", title: "res.send / res.json / res.render / res.redirect", members: ["res.send", "res.json", "res.render", "res.redirect", "res.status", "res.end"], lessons: ["lesson_17"], difficulty: 4, docSection: null },
    { id: "mongo_find", title: "find / findOne / findById / findOneAndUpdate", members: ["find", "findOne", "findById", "findOneAndUpdate", "findOneAndDelete"], lessons: ["lesson_20"], difficulty: 6, docSection: null },
    { id: "mongo_create", title: "create / insertOne / save / bulkWrite", members: ["create", "insertOne", "insertMany", "save", "bulkWrite"], lessons: ["lesson_20"], difficulty: 5, docSection: null },
    { id: "mongo_operators", title: "MongoDB Operators: $set/$push/$pull/$inc", members: ["$set", "$push", "$pull", "$inc", "$unset", "$addToSet"], lessons: ["lesson_20"], difficulty: 6, docSection: null },
    { id: "mongoose_concepts", title: "Schema / Model / Document / populate", members: ["Schema", "Model", "Document", "populate", "Mongoose"], lessons: ["lesson_20"], difficulty: 7, docSection: "§30" },
    { id: "component_kinds", title: "Function ↔ Class component ↔ HOC", members: ["function component", "class component", "HOC", "higher-order component"], lessons: ["lesson_21"], difficulty: 6, docSection: null },
    { id: "state_strategies", title: "useState/useReducer/useRef/Class.setState", members: ["useState", "useReducer", "useRef", "this.setState", "setState", "lazy initialization", "functional update"], lessons: ["lesson_22"], difficulty: 8, docSection: "§32", lessonScoped: true },
    { id: "react_memoization", title: "useMemo / useCallback / React.memo + memoization", members: ["useMemo", "useCallback", "React.memo", "memo", "memoization"], lessons: ["lesson_24"], difficulty: 8, docSection: "§12" },
    { id: "useeffect_deps", title: "useEffect dependency array + cleanup + infinite loop", members: ["dependency array", "useEffect deps", "[]", "cleanup", "infinite loop", "fetching data"], lessons: ["lesson_24"], difficulty: 9, docSection: "§11" },
    { id: "react_grouping", title: "Fragment ↔ <></> ↔ <div>", members: ["Fragment", "React.Fragment", "<>"], lessons: ["lesson_21"], difficulty: 4, docSection: null },
    { id: "form_control", title: "Controlled ↔ Uncontrolled component", members: ["controlled component", "uncontrolled component", "controlled input"], lessons: ["lesson_22"], difficulty: 7, docSection: null },
    { id: "composition_patterns", title: "children prop ↔ render prop ↔ slot", members: ["children prop", "render prop", "slot"], lessons: ["lesson_21", "lesson_23"], difficulty: 7, docSection: null },
    { id: "error_catching", title: "Error Boundary ↔ try/catch ↔ Promise.catch", members: ["Error Boundary", "componentDidCatch"], lessons: ["lesson_24"], difficulty: 8, docSection: null },
    { id: "ts_type_vs_interface", title: "type ↔ interface", members: ["type alias", "interface"], lessons: ["lesson_26"], difficulty: 6, docSection: "§26" },
    { id: "ts_special_types", title: "unknown ↔ any ↔ never", members: ["unknown", "any", "never"], lessons: ["lesson_26"], difficulty: 7, docSection: "§27" },
    { id: "ts_utility_types", title: "Partial / Required / Omit / Pick", members: ["Partial", "Required", "Omit", "Pick", "Readonly", "Record"], lessons: ["lesson_26"], difficulty: 7, docSection: null },
    { id: "ts_const_enum", title: "enum ↔ as const ↔ literal union", members: ["enum", "as const", "literal type"], lessons: ["lesson_26"], difficulty: 6, docSection: null },
    { id: "ts_class_modifiers", title: "public/private/protected/readonly", members: ["public", "private", "protected", "readonly"], lessons: ["lesson_26"], difficulty: 5, docSection: null },
    { id: "auth_methods", title: "Session ↔ JWT ↔ OAuth", members: ["session auth", "JWT", "OAuth", "OAuth2"], lessons: ["lesson_auth_security"], difficulty: 8, docSection: null },
    { id: "cookie_flags", title: "httpOnly / Secure / SameSite", members: ["httpOnly", "Secure cookie", "SameSite", "secure cookie"], lessons: ["lesson_auth_security"], difficulty: 7, docSection: null },
    { id: "token_lifecycle", title: "Refresh ↔ Access token", members: ["refresh token", "access token"], lessons: ["lesson_auth_security"], difficulty: 7, docSection: null },
    { id: "css_display", title: "display: block/inline/inline-block/flex/grid", members: ["display", "block", "inline", "inline-block", "flex", "grid"], lessons: ["lesson_html_css_foundations", "lesson_25"], difficulty: 6, docSection: "§31" },
    { id: "css_position", title: "position: static/relative/absolute/fixed/sticky", members: ["position", "relative", "absolute", "fixed", "sticky", "static"], lessons: ["lesson_html_css_foundations"], difficulty: 7, docSection: "§31" },
    { id: "css_units", title: "em/rem/px/%/vh/vw", members: ["em", "rem", "px", "vh", "vw"], lessons: ["lesson_html_css_foundations", "lesson_25"], difficulty: 5, docSection: "§31" },
    { id: "box_model", title: "margin/padding/border", members: ["margin", "padding", "border", "box model"], lessons: ["lesson_html_css_foundations"], difficulty: 5, docSection: "§31" },
    { id: "flexbox_props", title: "Flexbox properties", members: ["flex-direction", "justify-content", "align-items", "flex-wrap", "flex-grow", "flex-shrink"], lessons: ["lesson_25"], difficulty: 6, docSection: "§31" },
    { id: "grid_props", title: "Grid properties", members: ["grid-template-columns", "grid-template-rows", "grid-gap", "grid-area", "gap"], lessons: ["lesson_25"], difficulty: 7, docSection: "§31" },
    { id: "box_sizing", title: "box-sizing: content-box ↔ border-box", members: ["box-sizing", "content-box", "border-box"], lessons: ["lesson_html_css_foundations"], difficulty: 4, docSection: "§31" },
    { id: "git_core", title: "git add/commit/push/pull", members: ["git add", "git commit", "git push", "git pull", "staging area", "working tree"], lessons: ["lesson_tooling_git"], difficulty: 5, docSection: null },
    { id: "git_merge_strategy", title: "git merge ↔ git rebase", members: ["git merge", "git rebase"], lessons: ["lesson_tooling_git"], difficulty: 7, docSection: null },
    { id: "deps_kinds", title: "dependencies/devDependencies/peerDependencies", members: ["dependencies", "devDependencies", "peerDependencies"], lessons: ["lesson_16"], difficulty: 4, docSection: null },
    { id: "package_managers", title: "npm ↔ yarn ↔ pnpm", members: ["yarn", "pnpm"], lessons: ["lesson_16"], difficulty: 5, docSection: null },
    { id: "code_quality_tools", title: "ESLint ↔ Prettier ↔ TypeScript", members: ["ESLint", "Prettier"], lessons: ["lesson_tooling_git", "lesson_26"], difficulty: 5, docSection: null },
    { id: "rendering_strategies", title: "SSR ↔ SSG ↔ CSR ↔ ISR", members: ["SSR", "SSG", "CSR", "ISR"], lessons: ["lesson_nextjs"], difficulty: 7, docSection: "§25" },
    { id: "deploy_platforms", title: "Vercel ↔ Netlify ↔ Cloudflare Pages", members: ["Vercel deploy", "Netlify"], lessons: ["lesson_devops_deploy", "lesson_nextjs"], difficulty: 5, docSection: null },
    { id: "docker_concepts", title: "Docker: container/image/volume/network", members: ["container", "image", "volume", "Dockerfile"], lessons: ["lesson_devops_deploy"], difficulty: 6, docSection: null },
    { id: "cicd", title: "CI ↔ CD", members: ["CI", "CD", "GitHub workflow"], lessons: ["lesson_devops_deploy", "lesson_tooling_git"], difficulty: 5, docSection: null },
    { id: "function_definition_kinds", title: "Declaration / expression / arrow / IIFE", members: ["function declaration", "function expression", "IIFE", "anonymous function"], lessons: ["lesson_11", "lesson_15"], difficulty: 7, docSection: "§15" },
    { id: "mutability_patterns", title: "Mutable ↔ Immutable update patterns", members: ["mutable update", "immutable update"], lessons: ["lesson_22"], difficulty: 7, docSection: null },
    { id: "code_decisions", title: "ternary ↔ if-else ↔ switch", members: ["ternary", "if-else", "switch", "if statement"], lessons: ["lesson_11"], difficulty: 4, docSection: null },
    { id: "array_reference_cluster", title: "Array Reference — כל ההפניות וההעתקות", members: ["array reference", "object reference", "shallow copy", "deep copy", "structuredClone", "splice", "slice", "push", "concat", "spread"], lessons: ["lesson_11", "lesson_22"], difficulty: 9, docSection: "§33" },
    { id: "jsx_rendering", title: "JSX & React Rendering", members: ["JSX", "rendering", "render", "ReactDOM.render", "createRoot", "virtual DOM"], lessons: ["lesson_21"], difficulty: 7, docSection: null },
    { id: "ts_react", title: "TypeScript ב-React", members: ["React + TypeScript", "Typing Props", "Function Prop Type", "interface vs type", "union", "Union Type", "Type Narrowing"], lessons: ["lesson_26", "lesson_27"], difficulty: 7, docSection: null },
    { id: "ai_patterns", title: "AI Engineering Patterns", members: ["RAG", "tool calling", "agent loop", "fine-tuning boundary", "prompt engineering", "embedding", "vector search"], lessons: ["lesson_ai_engineering"], difficulty: 8, docSection: null },
  ];

  function findByConcept(lessonId, conceptName) {
    if (!conceptName) return null;
    const ln = String(conceptName).toLowerCase();
    const matches = CLUSTERS.filter((c) => c.members.some((m) => m.toLowerCase() === ln));
    if (!matches.length) return null;
    if (lessonId) {
      const scoped = matches.find((c) => c.lessonScoped && c.lessons.includes(lessonId));
      if (scoped) return scoped;
      const unscoped = matches.find((c) => !c.lessonScoped);
      if (unscoped) return unscoped;
    }
    return matches.find((c) => !c.lessonScoped) || matches[0];
  }

  function getById(clusterId) {
    return CLUSTERS.find((c) => c.id === clusterId) || null;
  }

  function policyForDifficulty(d) {
    if (d >= 7) return { label: "🔴 חובה למלא", level: "hard" };
    if (d === 6) return { label: "🟡 גבולי + V", level: "mid" };
    return { label: "🟢 V בלבד", level: "easy" };
  }

  const api = {
    CLUSTERS,
    findByConcept,
    getById,
    policyForDifficulty,
  };

  if (typeof window !== "undefined") {
    window.CLUSTER_INDEX = api;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})();
