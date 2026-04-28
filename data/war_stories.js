// data/war_stories.js — War Stories Library (Sprint 2 of creative-explanations plan)
// Real production incidents per hard concept. Each story: title, context, bug,
// diagnosis path, fix, lesson learned, severity, hours wasted.
// Source: junior-level analogies expanded into multi-incident library.
// 8 hard concepts × 3-4 incidents each = ~28 stories.

var WAR_STORIES = {
  // ───────── Lesson 22 ─────────
  "lesson_22::useState": [
    {
      title: "ה-counter שעלה ב-1 במקום ב-2",
      context: "אפליקציית POS — לחיצה על 'הוסף 2 פריטים' הגדילה את הספירה ב-1.",
      bug: "function add() { setCount(count + 1); setCount(count + 1); }",
      diagnosis:
        "Console.log אחרי שני setCount → שני העדכונים ראו count=0. Stale closure.",
      fix: "setCount(prev => prev + 1) ב-2 הקריאות.",
      lesson: "תמיד functional updater כשמעדכנים על בסיס המצב הקודם.",
      severity: "P1",
      hours: "2 שעות לדיבוג",
    },
    {
      title: "ה-state שלא נשמר אחרי refresh",
      context: "טופס הרשמה ארוך — המשתמש מילא 5 דקות, refresh ו-הכל נמחק.",
      bug: "useState רק שומר ב-React memory, לא ב-localStorage.",
      diagnosis:
        "הלקוח התלונן. בדיקה: refresh = re-mount = useState('') = איפוס.",
      fix: "useEffect שיסנכרן עם localStorage + useState עם lazy init מ-localStorage.",
      lesson: "useState אינו persistent. ל-state חשוב — לסנכרן עם storage.",
      severity: "P2",
      hours: "1 שעה דיבוג + 3 שעות תיקון",
    },
    {
      title: "lazy init — useState(expensive())",
      context: "Dashboard עם 10 widgets, init בכל אחד מאתחל מערך של 10K items.",
      bug: "useState(generateInitial(data)) — generateInitial רץ בכל render.",
      diagnosis:
        "Performance Profiler → 200ms בכל render. רק בvirtual mount היה צריך להריץ.",
      fix: "useState(() => generateInitial(data)) — lazy init function.",
      lesson: "useState(value) = ערך מוערך מיד, useState(fn) = lazy.",
      severity: "P1",
      hours: "30 דקות (אחרי שזיהינו)",
    },
  ],

  "lesson_22::re-render": [
    {
      title: "child component מתרענן 60 פעמים בשנייה",
      context: "Game UI עם לוח ניקוד שמתעדכן בכל פריים.",
      bug: "Parent עם useState({score: 0, level: 1}) ובכל update שולח את כל האובייקט.",
      diagnosis: "React DevTools → כל הילדים rerender גם כשרק score השתנה.",
      fix: "פיצול ל-2 useState נפרדים + React.memo על הילדים.",
      lesson: "פיצול state → פחות renders. memo לחסימת propagate.",
      severity: "P2",
      hours: "3 שעות",
    },
    {
      title: "אובייקט inline ב-JSX שגרר לסחרור renders",
      context: "Form עם 20 שדות. על כל הקלדה — כל השדות renders.",
      bug: "<Input style={{ color: 'red' }} /> — אובייקט חדש בכל render.",
      diagnosis: "Why Did You Render → kids re-render בלי שינוי props.",
      fix: "const inputStyle = { color: 'red' } מחוץ לקומפוננטה.",
      lesson:
        "אובייקטים ב-props חייבים reference יציב — useMemo או const חיצוני.",
      severity: "P2",
      hours: "1.5 שעות",
    },
  ],

  "lesson_22::array reference": [
    {
      title: "המוצר שנעלם רק אחרי refresh",
      context: "רשימת מוצרים בעגלת קניות. delete לא הסיר מה-UI.",
      bug: "items.splice(idx, 1); setItems(items);",
      diagnosis:
        "splice מחזיר את הפריטים שהוסרו, אבל מוטציה במקום. setItems קיבל reference זהה.",
      fix: "setItems(items.filter((_, i) => i !== idx))",
      lesson:
        "תמיד immutable updates: filter, map, slice, spread. לא splice/sort/reverse.",
      severity: "P0",
      hours: "4 שעות (לקוח התקשר)",
    },
    {
      title: ".sort() שגרר באג בייצור",
      context: "טבלה ממוינת. כפתור sort by date שיתק את כל ה-state.",
      bug: "setData(data.sort((a,b) => a.date - b.date))",
      diagnosis:
        "sort מוטטיבי — שינה את data במקום. setData עם אותה reference → אין re-render.",
      fix: "setData([...data].sort(...)) — copy ראשון, sort על העותק.",
      lesson: "[...arr].sort(...) — תמיד עם spread.",
      severity: "P0",
      hours: "5 שעות",
    },
  ],

  "lesson_22::object reference": [
    {
      title: "user.name שלא התעדכן ב-UI",
      context: "Settings page — שינוי שם הוסיף לוג ב-DB אבל UI לא התעדכן.",
      bug: "user.name = newName; setUser(user);",
      diagnosis: "אותה reference → React Object.is === true → bail-out.",
      fix: "setUser({...user, name: newName})",
      lesson: "spread לאובייקטים, כמו לarrays. אובייקט חדש = reference חדשה.",
      severity: "P0",
      hours: "3 שעות",
    },
    {
      title: "nested update שלא תפס",
      context: "Profile עם user.address.city. שינוי city לא רינדר.",
      bug: "setUser({...user, address: {...user.address, city: newCity}}) — נכון בפועל אבל...",
      diagnosis:
        "user.address.city = newCity; setUser({...user}) — ה-address נשאר אותו object.",
      fix: "setUser({...user, address: {...user.address, city: newCity}})",
      lesson: "Nested = nested spread. או use Immer / structuredClone.",
      severity: "P1",
      hours: "2 שעות",
    },
  ],

  // ───────── Lesson 24 ─────────
  "lesson_24::useEffect": [
    {
      title: "fetch אינסופי — DDoS עצמית על ה-API",
      context:
        "Dashboard עם useEffect שמושך נתונים. בייצור — 3000 requests/sec.",
      bug: "useEffect(() => { fetch('/api/data').then(setData); });",
      diagnosis:
        "אין deps array → רץ אחרי כל render → setData → render → fetch → ∞.",
      fix: "useEffect(() => { ... }, []); או deps נכונים.",
      lesson: "ESLint react-hooks/exhaustive-deps תופס את זה אוטומטית.",
      severity: "P0",
      hours: "1 שעה דיבוג + crash בייצור",
    },
    {
      title: "stale data — fetch עם userId הישן",
      context: "Switch user — ה-page הראה נתונים של המשתמש הקודם.",
      bug: "useEffect(() => { fetch(`/api/${userId}`).then(setData); }, []);",
      diagnosis: "deps = [] → effect רץ רק במאונט. closure תפס userId המקורי.",
      fix: "useEffect(() => { ... }, [userId]);",
      lesson: "כל משתנה שה-effect משתמש בו — חייב להיות ב-deps.",
      severity: "P0",
      hours: "5 שעות + תלונות לקוחות",
    },
    {
      title: "race condition — two fetches, the slow one wins",
      context:
        "Search box. Type 'react' → 'reactjs'. Result של 'react' (איטי) דרס את 'reactjs'.",
      bug: "useEffect(() => { fetch(query).then(setData); }, [query]);",
      diagnosis:
        "Network tab → reactjs נשלח ראשון אבל react חזר אחרון. setData רץ אחרון.",
      fix: "Cleanup function עם AbortController או flag isCancelled.",
      lesson: "כל async ב-effect → cleanup חובה. או use SWR/React Query.",
      severity: "P1",
      hours: "8 שעות (race condition קשה)",
    },
  ],

  "lesson_24::dependency array": [
    {
      title: "המשתמש לא ראה עדכונים — ESLint כבוי",
      context: "Stale data במסך. הבנו אחרי שבועיים.",
      bug: "// eslint-disable-next-line react-hooks/exhaustive-deps\nuseEffect(() => { ... }, []);",
      diagnosis:
        "Developer disable-וה ESLint כי 'הוא דרוש כשיש כל הפוקציות'. מאחר ש-deps חסרו.",
      fix: "להסיר את ה-disable + להוסיף את ה-deps. אם הוא 'מטריג רינדורים' — useCallback / useMemo.",
      lesson: "כל disable של exhaustive-deps = bug עתידי. תקן עם useCallback.",
      severity: "P1",
      hours: "12 שעות (אחרי שבועיים)",
    },
    {
      title: "אובייקט ב-deps שגרם ל-loop",
      context:
        "useEffect עם deps=[options]. Options = { sort: 'asc' }. effect רץ אינסוף.",
      bug: "function Comp() { const options = { sort: 'asc' }; useEffect(...,[options]); }",
      diagnosis:
        "options הוא object literal — חדש בכל render → deps שונה → effect → render → ...",
      fix: "useMemo(() => ({sort: 'asc'}), []) או move out of component.",
      lesson: "deps של object/array חייבים reference יציב.",
      severity: "P0",
      hours: "3 שעות",
    },
  ],

  "lesson_24::infinite loop": [
    {
      title: "Maximum update depth exceeded — אחרי deploy",
      context: "PR עבר code review. Production crash תוך 10 דקות.",
      bug: "useEffect(() => { setLoaded(true); });",
      diagnosis:
        "אין deps + setState בתוך → loop. בdev אטי לא נתפס. בprod מהיר → crash.",
      fix: "useEffect(() => setLoaded(true), []); — mount only.",
      lesson: "setState בתוך useEffect חייב deps array, גם אם ריק.",
      severity: "P0",
      hours: "20 דקות לreverse + הרבה לקוחות מתוסכלים",
    },
    {
      title: "useEffect → setState → React batching crash",
      context: "Dashboard עם 5 useEffects שמעדכנים אחד את השני.",
      bug: "effect A: setB. effect B: setA. → A B A B...",
      diagnosis: "Cyclic state dependency. React לא יכול להגיע לתוצאה stable.",
      fix: "Refactor: state יחיד עם useReducer + actions, או חישוב ב-render.",
      lesson: "אם 2 effects מעדכנים זה את זה — design smell. לעבור ל-reducer.",
      severity: "P1",
      hours: "16 שעות refactor",
    },
  ],

  "lesson_24::useEffect cleanup": [
    {
      title: "Memory leak — interval שלא נעצר",
      context:
        "Dashboard עם 'live updates' interval של 1s. אחרי שעה — דפדפן קרס.",
      bug: "useEffect(() => { setInterval(() => fetch(...), 1000); }, []);",
      diagnosis:
        "Memory tab → 5000 active intervals. כל unmount השאיר interval רץ.",
      fix: "const id = setInterval(...); return () => clearInterval(id);",
      lesson: "כל subscription/timer/listener — cleanup חובה.",
      severity: "P0",
      hours: "8 שעות + לקוחות מדווחים על דפדפן איטי",
    },
    {
      title: "WebSocket נשאר פתוח אחרי navigation",
      context: "Chat app — 200 חיבורים לכל משתמש פעיל.",
      bug: "useEffect(() => { const ws = new WebSocket(url); ws.onmessage = ...; }, []);",
      diagnosis:
        "Server logs → connection count עולה למימדים מטורפים. כל מעבר דף = WS חדש בלי לסגור.",
      fix: "return () => ws.close();",
      lesson: "WebSocket = subscription. cleanup חובה.",
      severity: "P0",
      hours: "ב-staging תפסנו לפני prod, 4 שעות",
    },
  ],
  // ───────── Lesson 17-18 — Node/Express ─────────
  "lesson_18::route": [
    {
      title: "route לא מגיב — סדר middleware שגוי",
      context: "שרת Express חדש — POST /register תמיד מחזיר 404.",
      bug: "app.post('/register', handler); // הוגדר לפני app.use(express.urlencoded())",
      diagnosis:
        "req.body תמיד undefined. הבנו שexpress.urlencoded() לא הוגדר לפני ה-route.",
      fix: "הזיז את app.use(express.urlencoded({ extended: true })) לפני כל ה-routes.",
      lesson: "middleware חייב לבוא לפני routes. סדר = קריטי ב-Express.",
      severity: "P1",
      hours: "1.5 שעות (ג'וניור ראשון)",
    },
    {
      title: "POST /register קיבל נתונים ריקים בייצור",
      context: "Registration flow עובד ב-localhost, נשבר בייצור.",
      bug: "Content-Type ב-fetch נשלח כ-application/json אבל השרת הגדיר express.urlencoded() בלבד.",
      diagnosis:
        "console.log(req.body) → {}. Postman עם JSON body → {} בייצור. בlocalhost שלחנו מטופס.",
      fix: "הוסיף app.use(express.json()) לפני ה-routes.",
      lesson:
        "תמיד שני middleware: express.json() וexpress.urlencoded(). לא סומכים שהלקוח שולח אחד.",
      severity: "P0",
      hours: "3 שעות + bug בייצור לשעות",
    },
  ],

  "lesson_18::validation": [
    {
      title: "validation רק ב-client — מישהו שלח SQL injection",
      context:
        "טופס הרשמה עם required ב-HTML. משתמש שלח בקשה ישירות ממש Postman ריקה.",
      bug: "אין server-side validation. users.push({ username: '', email: '', password: '' });",
      diagnosis: "DB מלא בrecords ריקים. לקחנו שבוע לשים לב.",
      fix: "הוסיף validateUser() לפני push. client-side = UX בלבד. server-side = security.",
      lesson:
        "validation ב-client ניתנת לעקיפה תמיד. server-side הוא קו ההגנה האמיתי.",
      severity: "P0",
      hours: "4 שעות ניקוי + refactor",
    },
  ],

  "lesson_17::HTTP": [
    {
      title: "GET עם body — נתונים נעלמו",
      context: "API לחיפוש. שלחנו search terms ב-body של GET.",
      bug: "fetch('/api/search', { method: 'GET', body: JSON.stringify({ q: 'react' }) })",
      diagnosis:
        "שרת קיבל req.body = undefined. RFC אוסר body ב-GET. דפדפנים/proxies מסירים אותו.",
      fix: "העבר ל-query params: GET /api/search?q=react, שלוף עם req.query.q.",
      lesson: "GET = query params. POST/PUT = body. לא לשלות body ב-GET.",
      severity: "P1",
      hours: "2 שעות",
    },
    {
      title: "status 200 לשגיאות — monitoring עיוור",
      context: "API שתמיד מחזיר 200. Monitoring לא זיהה כשלים.",
      bug: "res.status(200).json({ error: 'User not found' });",
      diagnosis:
        "Datadog alerts הגדרנו על 4xx. כל השגיאות חמקו כ-200. גילינו דרך לקוח שהתלונן.",
      fix: "השתמש ב-status codes נכונים: 400, 401, 404, 500.",
      lesson:
        "HTTP status codes הם הpAPIית. 200 = success. כל שגיאה = 4xx/5xx.",
      severity: "P1",
      hours: "שבועיים עם monitoring עיוור",
    },
  ],

  // ───────── Lesson 15 — Async/Closures ─────────
  "lesson_15::Promise": [
    {
      title: "Promise שנבלעה — שגיאה שנעלמה",
      context: "API call שנכשלה בשקט. לא ראינו error לוג.",
      bug: "getData().then(setData); // ללא .catch()",
      diagnosis:
        "UnhandledPromiseRejection אחרי Node 15 קורס התהליך. לפני Node 15 — שגיאה נבלעת.",
      fix: "getData().then(setData).catch(err => console.error('Failed:', err));",
      lesson:
        "כל Promise chain חייב .catch() בסוף. או try/catch עם async/await.",
      severity: "P0",
      hours: "6 שעות — crash בייצור לא מוסבר",
    },
    {
      title: "Promise.all נכשל בגלל רשת אחת חלשה",
      context: "Dashboard שטוען 5 APIs במקביל. כשAPI 3 נפל — כל הדשבורד נעלם.",
      bug: "const [a,b,c,d,e] = await Promise.all([api1(), api2(), api3(), api4(), api5()]);",
      diagnosis:
        "Promise.all נכשל אם כל אחד נכשל. api3 timeout → כל ה-dashboard נפל.",
      fix: "await Promise.allSettled([...]) → בדוק כל תוצאה בנפרד. נכשל? הצג placeholder.",
      lesson:
        "Promise.all = all-or-nothing. Promise.allSettled = graceful degradation.",
      severity: "P1",
      hours: "4 שעות + design refactor",
    },
  ],

  "lesson_15::Closure": [
    {
      title: "counter factory שמחזיר אותו ערך לכל instances",
      context: "System עם multiple counters. כולם ספרו יחד.",
      bug: "let count = 0;\nfunction makeCounter() { return () => ++count; }",
      diagnosis:
        "count מחוץ לmakeCounter — shared. כל counter שינה את אותו count.",
      fix: "function makeCounter() { let count = 0; return () => ++count; }",
      lesson: "closure state חייב להיות בתוך factory function — אחרת shared.",
      severity: "P1",
      hours: "3 שעות",
    },
  ],

  // ───────── Lesson 12 — Array Methods ─────────
  "lesson_12::map": [
    {
      title: "map שנתן מערך של undefined",
      context: "Dashboard עם תרגומי טקסט. כל string הפך undefined.",
      bug: "const translated = texts.map(t => { translateText(t); });",
      diagnosis: "שכחנו return. arrow function עם {} חייב return מפורש.",
      fix: "texts.map(t => translateText(t)) // implicit return",
      lesson: "callback ב-map חייב להחזיר ערך. {} גוף = return מפורש חובה.",
      severity: "P0",
      hours: "45 דקות (אחרי שזיהינו)",
    },
  ],

  "lesson_12::reduce": [
    {
      title: "reduce ללא initialValue — קריסה על מערך ריק",
      context: "חישוב סכום orders. פרויקט חדש עם לקוח בלי הזמנות → crash.",
      bug: "const total = orders.reduce((sum, o) => sum + o.price); // ללא initialValue",
      diagnosis:
        "מערך ריק + ללא initialValue → TypeError: Reduce of empty array with no initial value.",
      fix: "orders.reduce((sum, o) => sum + o.price, 0) // + initialValue 0",
      lesson: "תמיד הוסף initialValue ל-reduce. מגן על מקרי קצה (מערך ריק).",
      severity: "P0",
      hours: "1 שעה + prod crash",
    },
  ],

  // ───────── Lesson 16 — Node.js ─────────
  "lesson_16::Node.js": [
    {
      title: "node_modules שהכתיב גרסה שגויה של Node",
      context:
        "Express app עובד לוקלית, נשבר ב-CI בגלל חוסר התאמה בין גרסאות Node.",
      bug: "package.json: 'engines': { 'node': '>=18' } חסר. CI הריץ Node 14.",
      diagnosis:
        "optional chaining (?.) לא נתמך ב-Node 14. SyntaxError בייצור. לוקלי Node 20.",
      fix: "הוסף engines.node >=18 ב-package.json. הוסף .nvmrc עם '20'.",
      lesson:
        "תמיד הגדר engines ב-package.json. השתמש ב-.nvmrc לסנכרון גרסה בצוות.",
      severity: "P1",
      hours: "2 שעות + CI אדום",
    },
    {
      title: "שכחנו npm install אחרי pull — module not found",
      context:
        "עובד חדש, clone, npm start → Error: Cannot find module 'express'.",
      bug: "git pull הוסיף 5 packages ל-package.json, node_modules לא עודכן.",
      diagnosis: "npm install לא רץ אחרי pull. node_modules ישן.",
      fix: "npm install. הרגל: תמיד npm install אחרי pull אם package.json השתנה.",
      lesson:
        "package.json = רשימת קניות. node_modules = הקניות. רשימה השתנתה → קנה שוב.",
      severity: "P2",
      hours: "30 דקות",
    },
  ],

  // ───────── Lesson 11 — Variables & Scope ─────────
  "lesson_11::By Reference": [
    {
      title: "sort() על state ב-React — UI לא התעדכן",
      context: "טבלה ממוינת. לחיצה על header לא שינתה סדר.",
      bug: "const sorted = data.sort(...); setState(sorted);",
      diagnosis:
        "sort() מוטטבי — sorted הוא אותו array reference → React bail-out.",
      fix: "const sorted = [...data].sort(...); setState(sorted);",
      lesson: "sort(), reverse(), splice() = מוטציה. תמיד [...arr] קודם.",
      severity: "P0",
      hours: "2.5 שעות",
    },
  ],
};

// Browser bridge
if (typeof window !== "undefined") {
  window.WAR_STORIES = WAR_STORIES;
}
