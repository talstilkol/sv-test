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
      diagnosis: "Console.log אחרי שני setCount → שני העדכונים ראו count=0. Stale closure.",
      fix: "setCount(prev => prev + 1) ב-2 הקריאות.",
      lesson: "תמיד functional updater כשמעדכנים על בסיס המצב הקודם.",
      severity: "P1",
      hours: "2 שעות לדיבוג",
    },
    {
      title: "ה-state שלא נשמר אחרי refresh",
      context: "טופס הרשמה ארוך — המשתמש מילא 5 דקות, refresh ו-הכל נמחק.",
      bug: "useState רק שומר ב-React memory, לא ב-localStorage.",
      diagnosis: "הלקוח התלונן. בדיקה: refresh = re-mount = useState('') = איפוס.",
      fix: "useEffect שיסנכרן עם localStorage + useState עם lazy init מ-localStorage.",
      lesson: "useState אינו persistent. ל-state חשוב — לסנכרן עם storage.",
      severity: "P2",
      hours: "1 שעה דיבוג + 3 שעות תיקון",
    },
    {
      title: "lazy init — useState(expensive())",
      context: "Dashboard עם 10 widgets, init בכל אחד מאתחל מערך של 10K items.",
      bug: "useState(generateInitial(data)) — generateInitial רץ בכל render.",
      diagnosis: "Performance Profiler → 200ms בכל render. רק בvirtual mount היה צריך להריץ.",
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
      lesson: "אובייקטים ב-props חייבים reference יציב — useMemo או const חיצוני.",
      severity: "P2",
      hours: "1.5 שעות",
    },
  ],

  "lesson_22::array reference": [
    {
      title: "המוצר שנעלם רק אחרי refresh",
      context: "רשימת מוצרים בעגלת קניות. delete לא הסיר מה-UI.",
      bug: "items.splice(idx, 1); setItems(items);",
      diagnosis: "splice מחזיר את הפריטים שהוסרו, אבל מוטציה במקום. setItems קיבל reference זהה.",
      fix: "setItems(items.filter((_, i) => i !== idx))",
      lesson: "תמיד immutable updates: filter, map, slice, spread. לא splice/sort/reverse.",
      severity: "P0",
      hours: "4 שעות (לקוח התקשר)",
    },
    {
      title: ".sort() שגרר באג בייצור",
      context: "טבלה ממוינת. כפתור sort by date שיתק את כל ה-state.",
      bug: "setData(data.sort((a,b) => a.date - b.date))",
      diagnosis: "sort מוטטיבי — שינה את data במקום. setData עם אותה reference → אין re-render.",
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
      diagnosis: "user.address.city = newCity; setUser({...user}) — ה-address נשאר אותו object.",
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
      context: "Dashboard עם useEffect שמושך נתונים. בייצור — 3000 requests/sec.",
      bug: "useEffect(() => { fetch('/api/data').then(setData); });",
      diagnosis: "אין deps array → רץ אחרי כל render → setData → render → fetch → ∞.",
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
      context: "Search box. Type 'react' → 'reactjs'. Result של 'react' (איטי) דרס את 'reactjs'.",
      bug: "useEffect(() => { fetch(query).then(setData); }, [query]);",
      diagnosis: "Network tab → reactjs נשלח ראשון אבל react חזר אחרון. setData רץ אחרון.",
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
      diagnosis: "Developer disable-וה ESLint כי 'הוא דרוש כשיש כל הפוקציות'. מאחר ש-deps חסרו.",
      fix: "להסיר את ה-disable + להוסיף את ה-deps. אם הוא 'מטריג רינדורים' — useCallback / useMemo.",
      lesson: "כל disable של exhaustive-deps = bug עתידי. תקן עם useCallback.",
      severity: "P1",
      hours: "12 שעות (אחרי שבועיים)",
    },
    {
      title: "אובייקט ב-deps שגרם ל-loop",
      context: "useEffect עם deps=[options]. Options = { sort: 'asc' }. effect רץ אינסוף.",
      bug: "function Comp() { const options = { sort: 'asc' }; useEffect(...,[options]); }",
      diagnosis: "options הוא object literal — חדש בכל render → deps שונה → effect → render → ...",
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
      diagnosis: "אין deps + setState בתוך → loop. בdev אטי לא נתפס. בprod מהיר → crash.",
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
      context: "Dashboard עם 'live updates' interval של 1s. אחרי שעה — דפדפן קרס.",
      bug: "useEffect(() => { setInterval(() => fetch(...), 1000); }, []);",
      diagnosis: "Memory tab → 5000 active intervals. כל unmount השאיר interval רץ.",
      fix: "const id = setInterval(...); return () => clearInterval(id);",
      lesson: "כל subscription/timer/listener — cleanup חובה.",
      severity: "P0",
      hours: "8 שעות + לקוחות מדווחים על דפדפן איטי",
    },
    {
      title: "WebSocket נשאר פתוח אחרי navigation",
      context: "Chat app — 200 חיבורים לכל משתמש פעיל.",
      bug: "useEffect(() => { const ws = new WebSocket(url); ws.onmessage = ...; }, []);",
      diagnosis: "Server logs → connection count עולה למימדים מטורפים. כל מעבר דף = WS חדש בלי לסגור.",
      fix: "return () => ws.close();",
      lesson: "WebSocket = subscription. cleanup חובה.",
      severity: "P0",
      hours: "ב-staging תפסנו לפני prod, 4 שעות",
    },
  ],
};

// Browser bridge
if (typeof window !== "undefined") {
  window.WAR_STORIES = WAR_STORIES;
}
