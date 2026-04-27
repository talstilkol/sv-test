// data/anti_patterns.js — Anti-Pattern Gallery (Sprint 1, P2.S1.1)
// 8 hard concepts × 2-3 patterns = ~22 anti-patterns.
// Each pattern: bad code → damage description → good code → diff.
// Source content: derived from concept.commonMistakes + lib/junior stories.

var ANTI_PATTERNS = {
  // ───────── Lesson 22 — useState / Immutability ─────────
  "lesson_22::re-render": [
    {
      title: "מוטציה ישירה של state — React לא ירנדר",
      bad: { code: "items.push(newItem);\nsetItems(items);", lang: "js" },
      damage:
        "אותה הפניה למערך — React משווה לפי reference (Object.is) ומדלג על rerender. ה-UI לא מתעדכן למרות שהמערך שונה.",
      good: { code: "setItems([...items, newItem]);", lang: "js" },
      diff: ["items.push(newItem) → [...items, newItem]"],
      severity: "P0",
    },
    {
      title: "object literal כ-prop גורם ל-rerender אינסופי",
      bad: {
        code: "function Parent() {\n  return <Child config={{ url: '/api' }} />;\n}",
        lang: "jsx",
      },
      damage:
        "אובייקט חדש בכל render → child עם React.memo עדיין מתרענן (props.config !== props.config). אם useEffect ב-child תלוי ב-config — loop.",
      good: {
        code: "const config = useMemo(() => ({ url: '/api' }), []);\nreturn <Child config={config} />;",
        lang: "jsx",
      },
      diff: ["+ useMemo() wrap"],
      severity: "P1",
    },
  ],

  "lesson_22::array reference": [
    {
      title: "splice/sort/reverse משנים במקום — אסור על state",
      bad: { code: "items.splice(0, 1);\nsetItems(items);", lang: "js" },
      damage:
        "splice משנה את המערך המקורי. אותה הפניה → React לא מתרענן. גם אם תכתוב setItems([...items]) אחרי, הפריט הראשון כבר חסר.",
      good: { code: "setItems(items.filter((_, i) => i !== 0));", lang: "js" },
      diff: ["splice(0,1) → filter((_,i) => i !== 0)"],
      severity: "P0",
    },
    {
      title: "השמה לאינדקס לא מתרעננת",
      bad: { code: "items[0] = newValue;\nsetItems(items);", lang: "js" },
      damage:
        "מוטציה ישירה. כל פעם שתנסה למפות — רואה את הערך החדש פנימית, אבל React לא מקבל הודעה.",
      good: {
        code: "setItems(items.map((v, i) => i === 0 ? newValue : v));",
        lang: "js",
      },
      diff: ["items[0] = X → map((v,i) => i===0 ? X : v)"],
      severity: "P0",
    },
  ],

  "lesson_22::object reference": [
    {
      title: "שינוי שדה ישירות ב-state object",
      bad: { code: "user.age = 31;\nsetUser(user);", lang: "js" },
      damage:
        "user הוא אותו אובייקט בזיכרון. שינוי .age לא משנה את הreference. setUser(user) לא יגרום ל-rerender.",
      good: { code: "setUser({ ...user, age: 31 });", lang: "js" },
      diff: ["user.age = 31 → { ...user, age: 31 }"],
      severity: "P0",
    },
    {
      title: "spread רדוד על אובייקט מקונן",
      bad: {
        code: "setUser({ ...user, address: { city: 'Haifa' } });",
        lang: "js",
      },
      damage:
        "ה-address המקורי כלל שדות נוספים (street, zip). spread רדוד החליף את כולו — שדות אבדו.",
      good: {
        code: "setUser({ ...user, address: { ...user.address, city: 'Haifa' } });",
        lang: "js",
      },
      diff: ["+ ...user.address spread"],
      severity: "P1",
    },
  ],

  "lesson_22::passing function as prop": [
    {
      title: "inline arrow כל render — React.memo ב-child לא עוזר",
      bad: {
        code: "function Parent() {\n  return <Child onClick={() => doSomething(id)} />;\n}",
        lang: "jsx",
      },
      damage:
        "פונקציה חדשה בכל render → אם Child עטוף ב-React.memo, הוא עדיין מתרענן (props.onClick שונה).",
      good: {
        code: "const handleClick = useCallback(() => doSomething(id), [id]);\nreturn <Child onClick={handleClick} />;",
        lang: "jsx",
      },
      diff: ["+ useCallback() wrap"],
      severity: "P1",
    },
  ],

  // ───────── Lesson 24 — useEffect ─────────
  "lesson_24::useEffect": [
    {
      title: "async function ישירות ב-useEffect",
      bad: {
        code: "useEffect(async () => {\n  const data = await fetch('/api');\n  setData(await data.json());\n}, []);",
        lang: "jsx",
      },
      damage:
        "async function מחזיר Promise. React מצפה ל-undefined או cleanup function. תקבל warning + cleanup לא יעבוד.",
      good: {
        code: "useEffect(() => {\n  (async () => {\n    const data = await fetch('/api');\n    setData(await data.json());\n  })();\n}, []);",
        lang: "jsx",
      },
      diff: ["wrap with IIFE"],
      severity: "P1",
    },
  ],

  "lesson_24::dependency array": [
    {
      title: "object dep גורם ל-loop אינסופי",
      bad: {
        code: "const filter = { type: 'all' };\nuseEffect(() => fetchData(filter), [filter]);",
        lang: "jsx",
      },
      damage:
        "filter הוא literal — אובייקט חדש בכל render → deps רואה 'שינוי' → effect רץ → rerender → object חדש → ... loop.",
      good: {
        code: "const filter = useMemo(() => ({ type: 'all' }), []);\nuseEffect(() => fetchData(filter), [filter]);",
        lang: "jsx",
      },
      diff: ["+ useMemo wrap on filter"],
      severity: "P0",
    },
    {
      title: "missing dep — stale closure",
      bad: {
        code: "useEffect(() => {\n  const id = setInterval(() => setCount(count + 1), 1000);\n  return () => clearInterval(id);\n}, []);",
        lang: "jsx",
      },
      damage:
        "count נתפס כ-0 ב-mount. כל setCount(count+1) מציב 1 שוב ושוב — counter תקוע על 1.",
      good: {
        code: "useEffect(() => {\n  const id = setInterval(() => setCount(c => c + 1), 1000);\n  return () => clearInterval(id);\n}, []);",
        lang: "jsx",
      },
      diff: ["count + 1 → c => c + 1 (functional update)"],
      severity: "P0",
    },
  ],

  "lesson_24::infinite loop": [
    {
      title: "useEffect ללא deps + setState בתוכו",
      bad: {
        code: "function App() {\n  const [n, setN] = useState(0);\n  useEffect(() => { setN(n + 1); });\n  return <div>{n}</div>;\n}",
        lang: "jsx",
      },
      damage:
        "אין deps array → effect רץ אחרי כל render → setN → render → effect שוב → ∞. React יזרוק 'Too many re-renders' אחרי ~5000.",
      good: {
        code: "useEffect(() => { setN(n + 1); }, []); // mount only",
        lang: "jsx",
      },
      diff: ["+ , [] (deps array)"],
      severity: "P0",
    },
    {
      title: "deps שכוללים את ה-state שהאפקט משנה",
      bad: {
        code: "useEffect(() => { setN(n + 1); }, [n]);",
        lang: "jsx",
      },
      damage:
        "האפקט משנה את n. n משתנה → deps שונים → effect רץ → setN(n+1) → ∞.",
      good: {
        code: "// אם n התחזות פעם אחת:\nuseEffect(() => { setN(1); }, []); // mount only\n// אם n מתחזות לפי משהו אחר:\nuseEffect(() => { setN(computeFrom(other)); }, [other]);",
        lang: "jsx",
      },
      diff: ["[n] → [] or [other]"],
      severity: "P0",
    },
  ],

  "lesson_24::cleanup": [
    {
      title: "setInterval ללא clearInterval — memory leak",
      bad: {
        code: "useEffect(() => {\n  setInterval(tick, 1000);\n}, []);",
        lang: "jsx",
      },
      damage:
        "ה-interval ממשיך לרוץ אחרי unmount. אם הוא קורא ל-setState — 'Can't perform state update on unmounted component'. גם memory leak.",
      good: {
        code: "useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);",
        lang: "jsx",
      },
      diff: ["+ return () => clearInterval(id)"],
      severity: "P0",
    },
    {
      title: "addEventListener ללא remove — listeners מצטברים",
      bad: {
        code: "useEffect(() => {\n  window.addEventListener('scroll', handler);\n}, []);",
        lang: "jsx",
      },
      damage:
        "כל פעם שהקומפוננטה mount-ed → listener חדש. אחרי כמה ניווטים — אותו handler רץ פי 5 ב-scroll. ביצועים, באגים.",
      good: {
        code: "useEffect(() => {\n  window.addEventListener('scroll', handler);\n  return () => window.removeEventListener('scroll', handler);\n}, []);",
        lang: "jsx",
      },
      diff: ["+ removeEventListener cleanup"],
      severity: "P0",
    },
  ],
};

if (typeof window !== "undefined") {
  window.ANTI_PATTERNS = ANTI_PATTERNS;
}
