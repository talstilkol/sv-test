// data/lesson24.js — שיעור 24: useEffect, useMemo, useRef
// כל מושג כולל: difficulty (1-10), 6 רמות הסבר, illustration, codeExample, codeExplanation.
// מושגים קשים (difficulty >= 6) כוללים גם extras עם moreExamples, pitfalls, practiceQuestions.

var LESSON_24 = {
  id: "lesson_24",
  title: "שיעור 24 — useEffect, useMemo, useRef",
  description:
    "Hooks מתקדמים: useEffect לתופעות לוואי, useMemo למטמון חישובים יקרים, ו-useRef לגישה ישירה ל-DOM ולשמירת ערכים בלי לגרום ל-re-render.",
  concepts: [
    // ─────────────────────────── 1. useEffect (difficulty 8) ───────────────────────────
    {
      conceptName: "useEffect",
      difficulty: 8,
      levels: {
        grandma:
          "useEffect זה כמו 'מה לעשות אחרי שגמרתי לצייר'. ראית פעם הוראה: 'אחרי שתסיימי לצייר את הדף — תתלי אותו על הקיר'? useEffect הוא ההוראה הזו ל-React.",
        child:
          "כמו במשחק: רק אחרי שהמסך מופיע, רוצים להפעיל מוזיקה. useEffect מאפשר את זה — הוא רץ רק אחרי שהקומפוננטה הוצגה למסך.",
        soldier:
          "useEffect(fn, deps) מריץ את fn אחרי שהקומפוננטה רונדרה ל-DOM. deps שולט מתי: [] = פעם אחת בלבד; [x] = כשx משתנה; ללא deps = בכל רינדור.",
        student:
          "useEffect הוא Hook לתופעות לוואי (side effects) — fetching, subscriptions, timers, DOM manipulation. רץ אחרי commit phase של React, אחרי שה-DOM כבר עודכן.",
        junior:
          "פעם בניתי קומפוננטה שעשתה fetch בכל רינדור — היא הציפה את השרת בבקשות. הוספתי [] ל-deps והבעיה נפתרה. עכשיו אני תמיד שואל: 'מתי האפקט הזה צריך לרוץ?'",
        professor:
          "useEffect schedules effect functions after render commit. Dependencies are tracked via Object.is reference equality on each item in the deps array; missing deps cause stale closures, while unstable references (new objects/functions) cause unnecessary reruns.",
      },
      illustration:
        "🪝 useEffect — מתי האפקט רץ:\n\n" +
        "  useEffect(() => { ... }, deps)\n" +
        "                          ↓\n" +
        "  ─────────────────────────────────\n" +
        "  deps = []           פעם אחת (mount)\n" +
        "  deps = [x]          כש-x משתנה\n" +
        "  deps = [x, y]       כש-x או y משתנים\n" +
        "  בלי deps             בכל רינדור (סכנה!)\n" +
        "  ─────────────────────────────────\n" +
        "  return () => {...}  cleanup לפני הריצה הבאה",
      codeExample:
        "function User({ id }) {\n" +
        "  const [user, setUser] = useState(null);\n" +
        "  useEffect(() => {\n" +
        "    fetch(`/api/users/${id}`)\n" +
        "      .then(r => r.json())\n" +
        "      .then(setUser);\n" +
        "  }, [id]);  // רץ בכל פעם ש-id משתנה\n" +
        "  return user ? <div>{user.name}</div> : <div>Loading...</div>;\n" +
        "}",
      codeExplanation:
        "useEffect מריץ את ה-fetch אחרי שהקומפוננטה רונדרה. ה-deps [id] מבטיח שהאפקט יחזור רק כש-id משתנה — לא בכל רינדור.",
      extras: {
        moreExamples: [
          {
            code:
              "// 3 צורות של deps\n" +
              "useEffect(() => {\n" +
              "  console.log('every render');\n" +
              "});  // ❌ ללא deps — בכל רינדור (כמעט תמיד באג)\n\n" +
              "useEffect(() => {\n" +
              "  console.log('once on mount');\n" +
              "}, []);  // ✅ פעם אחת\n\n" +
              "useEffect(() => {\n" +
              "  console.log('when count changes');\n" +
              "}, [count]);  // ✅ כש-count משתנה",
            explanation:
              "הבחירה במערך ה-deps היא ההחלטה הקריטית. ברוב המקרים תהיה רשימה של משתנים שהאפקט תלוי בהם.",
          },
          {
            code:
              "// אזהרה: stale closure\n" +
              "function Timer() {\n" +
              "  const [count, setCount] = useState(0);\n" +
              "  useEffect(() => {\n" +
              "    const id = setInterval(() => {\n" +
              "      setCount(count + 1);  // ❌ count תמיד 0!\n" +
              "    }, 1000);\n" +
              "    return () => clearInterval(id);\n" +
              "  }, []);\n" +
              "  return <div>{count}</div>;\n" +
              "}",
            explanation:
              "האפקט נסגר על count=0 (mount). setInterval משתמש בערך הזה לנצח. תיקון: setCount(c => c + 1) או הוסף count ל-deps.",
          },
          {
            code:
              "// המהפתרון לבעיה מעלה\n" +
              "useEffect(() => {\n" +
              "  const id = setInterval(() => {\n" +
              "    setCount(c => c + 1);  // ✅ functional — תמיד הערך העדכני\n" +
              "  }, 1000);\n" +
              "  return () => clearInterval(id);\n" +
              "}, []);",
            explanation:
              "functional update פותר stale closure. לחלופין: useRef + ref.current לערכים שמשתנים.",
          },
        ],
        pitfalls: [
          {
            mistake: "useEffect בלי deps array",
            why: "האפקט רץ אחרי כל רינדור — אם הוא משנה state, נוצר loop אינסופי.",
            fix: "תמיד הוסף deps array. לרוב []  או רשימה של ערכים שהאפקט תלוי בהם.",
          },
          {
            mistake: "missing dependencies",
            why: "האפקט קורא משתנים מה-scope (state, props), אבל הם לא ב-deps. נוצר stale closure.",
            fix: "הוסף את כל המשתנים שהאפקט קורא ל-deps. ה-eslint-plugin-react-hooks מתריע אוטומטית.",
          },
          {
            mistake: "אובייקט/מערך/פונקציה ב-deps",
            why: "כל רינדור יוצר הפניה חדשה — ה-deps נחשב 'שונה' תמיד → loop אינסופי.",
            fix: "השתמש ב-useMemo/useCallback ליציבות הפניה, או העבר primitives.",
          },
          {
            mistake: "async function כ-callback של useEffect",
            why: "useEffect(async () => ...) — async function מחזיר Promise. React מצפה ל-cleanup function או undefined.",
            fix: "הגדר async בפנים: useEffect(() => { (async () => { ... })(); }, [])",
          },
        ],
        practiceQuestions: [
          {
            question:
              "מה יקרה?\n  function App() {\n    const [n, setN] = useState(0);\n    useEffect(() => { setN(n + 1); });\n    return <div>{n}</div>;\n  }",
            answer:
              "Loop אינסופי. אין deps → רץ בכל רינדור → setN → re-render → רץ שוב. תיקון: deps = [] או הסר את האפקט.",
          },
          {
            question:
              "מה ההבדל בין deps=[] לבין אין deps?",
            answer:
              "deps=[] → האפקט רץ פעם אחת בלבד (mount). אין deps → האפקט רץ אחרי כל רינדור.",
          },
          {
            question:
              "useEffect(fn, [user]) — user הוא אובייקט state. מתי האפקט רץ?",
            answer:
              "כש-user מקבל הפניה חדשה (setUser({...user})). אם אתה קורא לזה בכל רינדור עם אובייקט חדש — loop אינסופי.",
          },
        ],
      },
    },

    // ─────────────────────────── 2. side effect (difficulty 6) ───────────────────────────
    {
      conceptName: "side effect",
      difficulty: 6,
      levels: {
        grandma:
          "side effect זה 'תופעת לוואי' — משהו שהפונקציה עושה מעבר להחזיר ערך. כמו תרופה שגם מרפאת (אפקט עיקרי) וגם מעייפת (תופעת לוואי).",
        child:
          "כשאת מצליחה במשחק — מקבלת ניקוד (האפקט). אבל גם נשמע צליל (side effect). הצליל 'נוסף' — לא קשור לתוצאה, אבל קורה.",
        soldier:
          "side effect = פעולה שמשפיעה על משהו מחוץ לפונקציה: HTTP request, localStorage, console.log, DOM manipulation, timers. ב-React, side effects צריכים לקרות בתוך useEffect.",
        student:
          "Side effect = כל פעולה שאינה pure (לא מחזירה רק ערך לפי קלט). בקומפוננטות React, אסור לבצע side effect בגוף הפונקציה — הוא ירוץ בכל רינדור. במקום זאת — useEffect.",
        junior:
          "פעם הוספתי console.log בתחילת קומפוננטה — וגיליתי שהוא רץ 50 פעם בדקה. הבנתי שהקומפוננטה צריכה להיות 'pure' — מחזירה JSX לפי props/state, ללא side effects בגוף.",
        professor:
          "Side effects breach referential transparency. React's render phase must remain pure to enable concurrent rendering and time-slicing; effects are deferred to the commit phase via useEffect.",
      },
      illustration:
        "💊 side effect — מה זה ומה לא:\n\n" +
        "  pure                    side effect\n" +
        "  ─────────────────       ──────────────\n" +
        "  return x + 1            console.log(x)\n" +
        "  arr.map(...)            fetch('/api')\n" +
        "  לחישוב פלט              localStorage.set()\n" +
        "                          document.title = '...'\n" +
        "                          element.focus()",
      codeExample:
        "// ❌ side effect בגוף הקומפוננטה — רץ בכל רינדור!\n" +
        "function App() {\n" +
        '  document.title = "ברוכים";\n' +
        "  return <div>...</div>;\n" +
        "}\n\n" +
        "// ✅ side effect ב-useEffect\n" +
        "function App() {\n" +
        "  useEffect(() => {\n" +
        '    document.title = "ברוכים";\n' +
        "  }, []);\n" +
        "  return <div>...</div>;\n" +
        "}",
      codeExplanation:
        "שינוי document.title הוא side effect — הוא משפיע על הדפדפן מחוץ לקומפוננטה. ב-React, חובה להוציא אותו ל-useEffect, אחרת ירוץ בכל רינדור.",
      extras: {
        moreExamples: [
          {
            code:
              "// side effects נפוצים\n" +
              "useEffect(() => {\n" +
              "  // 1. fetch\n" +
              "  fetch('/api/data').then(...);\n" +
              "  // 2. event listener\n" +
              "  window.addEventListener('scroll', handler);\n" +
              "  // 3. timer\n" +
              "  const id = setInterval(tick, 1000);\n" +
              "  // 4. localStorage\n" +
              "  localStorage.setItem('user', JSON.stringify(user));\n" +
              "  // cleanup\n" +
              "  return () => {\n" +
              "    window.removeEventListener('scroll', handler);\n" +
              "    clearInterval(id);\n" +
              "  };\n" +
              "}, []);",
            explanation:
              "כל side effect צריך כתובת חוץ ל-useEffect, ובדרך כלל cleanup function שמסיר אותו ב-unmount.",
          },
        ],
        pitfalls: [
          {
            mistake: "side effect בגוף הקומפוננטה",
            why: "ירוץ בכל רינדור — לא רק כשצריך.",
            fix: "תמיד עטוף ב-useEffect עם deps מתאימים.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "אילו מהבאים הם side effects? (1) return arr.length, (2) localStorage.set, (3) x = y + 1, (4) fetch('/'), (5) console.log",
            answer:
              "2, 4, 5 — כולן משפיעות על משהו מחוץ לפונקציה. 1 ו-3 הם pure.",
          },
        ],
      },
    },

    // ─────────────────────────── 3. dependency array (difficulty 9) ───────────────────────────
    {
      conceptName: "dependency array",
      difficulty: 9,
      levels: {
        grandma:
          "dependency array זה 'רשימת השמות' שלפי הם קובעים מתי לעשות פעולה. ב-React: 'תעשה fetch כש-id משתנה' — אז [id] זה ה-dependency array.",
        child:
          "כמו לאמא: 'תקראי לי כשאני מסיים שיעור' — האירוע שבו צריך פעולה. ה-deps אומרים 'מתי' לאפקט לפעול.",
        soldier:
          "dependency array (הפרמטר השני של useEffect) מגדיר מתי האפקט יחזור: אם איזה ערך ב-array השתנה (לפי Object.is). ריק = פעם אחת. חסר = בכל רינדור.",
        student:
          "Deps array הוא 'רשימת התלות' של האפקט. כל ערך שהאפקט קורא מה-scope (state, props, vars) — חייב להיות שם, אחרת stale closure. אובייקטים/פונקציות יוצרים reruns מיותרים.",
        junior:
          "פעם בנתי קומפוננטה עם useEffect(fn, [user]). user היה אובייקט. בכל רינדור user היה אובייקט חדש (parent יצר אותו) → האפקט רץ אינסופית. השתמשתי ב-useMemo על user כדי לייצב.",
        professor:
          "Dependency array enforces effect coherence: missing deps cause stale closure bugs; extra deps cause superfluous reruns. Object.is is used for shallow comparison; reference identity matters more than value equality.",
      },
      illustration:
        "📋 dependency array — מתי האפקט רץ:\n\n" +
        "  useEffect(fn, deps)\n" +
        "                ↓\n" +
        "  React משווה כל ערך ל-deps של הריצה הקודמת:\n" +
        "    Object.is(prevDeps[i], deps[i])\n" +
        "  אם ערך אחד שונה → האפקט רץ\n\n" +
        "  ⚠️ אובייקט/מערך/פונקציה חדשים = 'שונה' תמיד\n" +
        "     → loop אינסופי",
      codeExample:
        "function Profile({ userId }) {\n" +
        "  const [user, setUser] = useState(null);\n" +
        "  useEffect(() => {\n" +
        "    fetch(`/api/users/${userId}`)\n" +
        "      .then(r => r.json())\n" +
        "      .then(setUser);\n" +
        "  }, [userId]);  // רק כש-userId משתנה\n" +
        "  return user && <div>{user.name}</div>;\n" +
        "}",
      codeExplanation:
        "ה-deps [userId] מבטיח שה-fetch יחזור רק כשהמשתמש הנוכחי משתנה. אם נכתוב [] — ה-fetch ירוץ פעם אחת ולא יתעדכן. אם נשמיט deps — הוא ירוץ אינסופית (כי הוא משנה state).",
      extras: {
        moreExamples: [
          {
            code:
              "// ❌ missing dep — stale closure\n" +
              "function Search({ query }) {\n" +
              "  const [results, setResults] = useState([]);\n" +
              "  useEffect(() => {\n" +
              "    fetch(`/api/search?q=${query}`)\n" +
              "      .then(r => r.json())\n" +
              "      .then(setResults);\n" +
              "  }, []);  // query לא ב-deps!\n" +
              "  // ⤷ Search תמיד יחפש את ה-query הראשון\n" +
              "}",
            explanation:
              "ה-effect 'נסגר' על query הראשון. כשquery משתנה, האפקט לא רץ → תוצאות עומדות במקום. תיקון: הוסף [query].",
          },
          {
            code:
              "// ❌ object dep — loop אינסופי\n" +
              "function App() {\n" +
              "  const [data, setData] = useState({});\n" +
              "  const config = { url: '/api' };  // אובייקט חדש בכל רינדור!\n" +
              "  useEffect(() => {\n" +
              "    fetch(config.url).then(r => r.json()).then(setData);\n" +
              "  }, [config]);  // config 'משתנה' תמיד → loop\n" +
              "}",
            explanation:
              "config הוא object literal — בכל רינדור מקבל הפניה חדשה. ה-deps רואה 'שונה' → אפקט רץ → setData → re-render → loop.",
          },
          {
            code:
              "// ✅ פתרון 1: useMemo\n" +
              "const config = useMemo(() => ({ url: '/api' }), []);\n\n" +
              "// ✅ פתרון 2: primitive במקום object\n" +
              "const url = '/api';\n" +
              "useEffect(() => {\n" +
              "  fetch(url).then(...);\n" +
              "}, [url]);  // string יציב",
            explanation:
              "primitive (string, number) משווה לפי ערך. אובייקט/מערך משווים לפי הפניה — ולכן צריך useMemo או reorganization.",
          },
          {
            code:
              "// ❌ function dep גם זה loop\n" +
              "function App({ onLoad }) {\n" +
              "  useEffect(() => {\n" +
              "    onLoad();\n" +
              "  }, [onLoad]);  // onLoad חדש בכל רינדור של parent → loop\n" +
              "}\n\n" +
              "// ✅ ההורה ב-useCallback\n" +
              "const onLoad = useCallback(() => {...}, []);",
            explanation:
              "פונקציה inline יוצרת הפניה חדשה. useCallback נותנת אותה הפניה כל עוד deps לא השתנו.",
          },
        ],
        pitfalls: [
          {
            mistake: "[] חסר deps שהאפקט קורא",
            why: "Stale closure — האפקט תמיד יראה את הערכים הראשונים.",
            fix: "הוסף את כל המשתנים החיצוניים ל-deps. eslint-plugin-react-hooks מתריע.",
          },
          {
            mistake: "אובייקט/מערך/פונקציה ב-deps",
            why: "הפניה חדשה בכל רינדור → loop אינסופי.",
            fix: "useMemo/useCallback להפניה יציבה, או חלץ primitives.",
          },
          {
            mistake: "deps שמופיעים פעמיים",
            why: "לא שגיאה אך מבלבל. אין צורך לחזור על אותו משתנה.",
            fix: "כל משתנה רק פעם אחת ב-deps.",
          },
          {
            mistake: "לדכא את האזהרה של eslint על deps",
            why: "ה-warning כמעט תמיד מצביע על באג אמיתי.",
            fix: "תקן את ה-deps. אם אתה בטוח שהאפקט צריך לרוץ פעם אחת — הקפא את הערך עם useRef.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "useEffect(fn, []) — מתי הוא רץ?",
            answer:
              "פעם אחת בלבד, אחרי הרינדור הראשון (mount). לא רץ שוב.",
          },
          {
            question:
              "useEffect(fn, [count, name]) — מתי הוא רץ?",
            answer:
              "כש-count או name (לפי Object.is) השתנו לעומת הריצה הקודמת.",
          },
          {
            question:
              "האפקט קורא ל-x ול-setX. מה צריך להיות ב-deps?",
            answer:
              "x בלבד. setX (מ-useState) הוא referentially stable — לא צריך אותו ב-deps.",
          },
          {
            question:
              "מה הבעיה?\n  const opts = { limit: 10 };\n  useEffect(() => fetch('/api', opts), [opts]);",
            answer:
              "opts הוא אובייקט שנוצר חדש בכל רינדור. deps רואה 'שונה' → loop. תיקון: useMemo או חלץ primitives.",
          },
        ],
      },
    },

    // ─────────────────────────── 4. fetching data (difficulty 7) ───────────────────────────
    {
      conceptName: "fetching data",
      difficulty: 7,
      levels: {
        grandma:
          "fetching data זה 'להוריד מידע מהשרת'. כמו ללכת לסניף הדואר ולהביא חבילה — היא לא מגיעה אלייך לבד, צריך ללכת לבקש.",
        child:
          "כמו לבקש מהמורה דף הוראות. אתה מבקש (request), ממתין שהיא תיתן (response), ואז קוראים את הדף.",
        soldier:
          "Fetching data ב-React = הפעלת fetch בתוך useEffect, חיכוי לתשובה (await או .then), ואחסון התוצאה ב-state. הפלטה: loading, success, error.",
        student:
          "דפוס סטנדרטי: useEffect(() => { fetch().then(setData); }, [deps]) — בדרך כלל עם 3 states: data, loading, error. הקריטריון מתי לרענן: ה-deps array.",
        junior:
          "פעם בניתי טבלת משתמשים שכל לחיצה על משתמש הציגה את פרטיו. שכחתי [userId] ב-deps → תמיד הציגה את המשתמש הראשון. הוספתי [userId] והכל עבד. עכשיו אני תמיד שואל: 'מה משנה את הבקשה?'",
        professor:
          "Data fetching in React combines effects, async I/O, and state. Modern alternatives like React Query / SWR abstract loading/error/cache concerns. Server Components in Next.js shift fetching to server, eliminating client-side waterfall.",
      },
      illustration:
        "📥 fetching data — הזרימה:\n\n" +
        "  Component mounts\n" +
        "         ↓\n" +
        "  useEffect runs\n" +
        "         ↓\n" +
        "  fetch('/api/...')\n" +
        "         ↓ (async)\n" +
        "  res.json()\n" +
        "         ↓\n" +
        "  setData(result)\n" +
        "         ↓\n" +
        "  re-render עם הנתונים",
      codeExample:
        "function Posts() {\n" +
        "  const [posts, setPosts] = useState([]);\n" +
        "  const [loading, setLoading] = useState(true);\n" +
        "  useEffect(() => {\n" +
        "    fetch('/api/posts')\n" +
        "      .then(r => r.json())\n" +
        "      .then(data => {\n" +
        "        setPosts(data);\n" +
        "        setLoading(false);\n" +
        "      });\n" +
        "  }, []);\n" +
        "  if (loading) return <Spinner />;\n" +
        "  return posts.map(p => <Post key={p.id} {...p} />);\n" +
        "}",
      codeExplanation:
        "הקומפוננטה מתחילה ב-loading=true. בעת mount, useEffect מטריג fetch. כשהתשובה מגיעה, posts מתעדכן ו-loading עובר ל-false — והרשימה מוצגת.",
      extras: {
        moreExamples: [
          {
            code:
              "// async/await בתוך useEffect\n" +
              "useEffect(() => {\n" +
              "  const load = async () => {\n" +
              "    try {\n" +
              "      const res = await fetch('/api/posts');\n" +
              "      const data = await res.json();\n" +
              "      setPosts(data);\n" +
              "    } catch (e) {\n" +
              "      setError(e.message);\n" +
              "    } finally {\n" +
              "      setLoading(false);\n" +
              "    }\n" +
              "  };\n" +
              "  load();\n" +
              "}, []);",
            explanation:
              "אסור useEffect(async () => ...) — async מחזיר Promise. במקום זה, מגדירים async function בפנים וקוראים לה.",
          },
          {
            code:
              "// race condition guard עם cleanup\n" +
              "useEffect(() => {\n" +
              "  let cancelled = false;\n" +
              "  fetch(`/api/users/${id}`)\n" +
              "    .then(r => r.json())\n" +
              "    .then(data => {\n" +
              "      if (!cancelled) setUser(data);\n" +
              "    });\n" +
              "  return () => { cancelled = true; };\n" +
              "}, [id]);",
            explanation:
              "אם המשתמש מחליף id מהר, יכול להיות ש-fetch ישן יחזור אחרי החדש. ה-flag cancelled מבטל עדכון של תוצאה ישנה.",
          },
          {
            code:
              "// AbortController לביטול fetch בפועל\n" +
              "useEffect(() => {\n" +
              "  const ctrl = new AbortController();\n" +
              "  fetch('/api/data', { signal: ctrl.signal })\n" +
              "    .then(r => r.json())\n" +
              "    .then(setData)\n" +
              "    .catch(e => {\n" +
              "      if (e.name !== 'AbortError') console.error(e);\n" +
              "    });\n" +
              "  return () => ctrl.abort();\n" +
              "}, []);",
            explanation:
              "AbortController מבטל את ה-network request עצמו. עדיף על cancelled flag כי גם משחרר קישור רשת.",
          },
        ],
        pitfalls: [
          {
            mistake: "useEffect(async () => {...})",
            why: "async function מחזיר Promise. React מצפה ל-undefined או cleanup function.",
            fix: "useEffect(() => { (async () => {...})(); }, [])",
          },
          {
            mistake: "race condition — תשובה ישנה דורסת חדשה",
            why: "המשתמש החליף id, fetch ישן עוד בדרך, ופתאום מחזיר תשובה ומעדכן state.",
            fix: "cancelled flag או AbortController. cleanup function מוודאת שהמשתמש רואה רק את הנתונים העדכניים.",
          },
          {
            mistake: "fetch בלי טיפול בשגיאות",
            why: "כשהשרת נופל / חוסם / איטי — המשתמש מקבל מסך ריק.",
            fix: "תמיד try/catch (async) או .catch (promise) + state של error להצגה.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "מה צריך להיות ב-deps של useEffect שמבצע fetch ל-`/api/users/${userId}`?",
            answer:
              "[userId] — כדי שהאפקט יחזור רק כשהמזהה משתנה.",
          },
          {
            question:
              "מה הסכנה של race condition ב-fetching, ואיך מונעים?",
            answer:
              "כשבקשות חופפות, הישנה יכולה להגיע אחרי החדשה ולדרוס. פתרון: cancelled flag ב-cleanup, או AbortController.",
          },
        ],
      },
    },

    // ─────────────────────────── 5. fetch (difficulty 4) ───────────────────────────
    {
      conceptName: "fetch",
      difficulty: 4,
      levels: {
        grandma:
          "fetch זה 'לך תביא את זה' — הפקודה ב-JavaScript להוריד נתונים מהאינטרנט. כמו לקרוא לכלב 'לך תביא את הכדור!'.",
        child:
          "כמו לשלוח שליח לחנות. שליח הולך, חוזר עם המוצר. fetch שולח 'שליח' ל-server וחוזר עם נתונים.",
        soldier:
          "fetch(url, options) הוא Web API לבקשות HTTP. מחזיר Promise של Response. כדי לקבל את הגוף — res.json() או res.text(). מחזיר גם הוא Promise.",
        student:
          "fetch הוא ה-API המודרני להחלפת XMLHttpRequest. תומך ב-Promises, ב-streams, ב-CORS. response.ok מציין סטטוס 2xx; אחרת צריך לטפל ידנית.",
        junior:
          "פעם שכחתי res.json() וקיבלתי ב-state את ה-Response object עצמו במקום הנתונים. הוספתי .then(r => r.json()) והכל עבד. עכשיו אני זוכר: fetch מחזיר Response, לא הנתונים.",
        professor:
          "fetch is a low-level HTTP client. It does not reject on HTTP errors (4xx, 5xx) — only on network failures. Always check res.ok or res.status. Streaming via res.body for large payloads.",
      },
      illustration:
        "🌐 fetch — שני שלבים:\n\n" +
        "  fetch('/api/x')\n" +
        "         ↓ Promise<Response>\n" +
        "  res.json()\n" +
        "         ↓ Promise<Data>\n" +
        "  setData(data)",
      codeExample:
        "fetch('/api/users/1')\n" +
        "  .then(res => {\n" +
        "    if (!res.ok) throw new Error(`HTTP ${res.status}`);\n" +
        "    return res.json();\n" +
        "  })\n" +
        "  .then(user => console.log(user.name))\n" +
        "  .catch(err => console.error(err));",
      codeExplanation:
        "fetch מחזיר Promise של Response. res.json() מחזיר Promise של הנתונים. בדיקת res.ok חיונית — fetch לא נופל על 404/500 בעצמו.",
    },

    // ─────────────────────────── 6. state update (difficulty 5) ───────────────────────────
    {
      conceptName: "state update",
      difficulty: 5,
      levels: {
        grandma:
          "state update זה 'לעדכן את הזיכרון של הקומפוננטה' — לתת לה ערך חדש כדי שתציג אותו במסך.",
        child:
          "כמו לחדש מספר על לוח. הילדים בכיתה רואים את החדש מיד.",
        soldier:
          "state update = קריאה ל-setter (setX). React מתזמן את העדכון, מטריג re-render. בעת ה-render הבא, useState מחזיר את הערך החדש.",
        student:
          "Updates נחשבים asynchronous בתוך event handler — הם batched. בתוך useEffect וב-async — ב-React 18 גם batched. מחוץ לזה (timer callbacks ישנים) — לא תמיד.",
        junior:
          "פעם הוספתי setState 5 פעמים ברצף וציפיתי ל-5 רינדורים. ראיתי רק אחד — React אגרגט אותם. עכשיו אני יודע: batched = יעיל.",
        professor:
          "React batches multiple setState calls within an event handler into a single render. As of React 18, automatic batching extends to async callbacks. Functional updates ensure correctness when multiple updates depend on prior state.",
      },
      illustration:
        "🔄 state update — הזרימה:\n\n" +
        "  setX(5)\n" +
        "    ↓\n" +
        "  React mark dirty\n" +
        "    ↓ (אחרי כל ה-event handler)\n" +
        "  re-render\n" +
        "    ↓\n" +
        "  useState מחזיר 5",
      codeExample:
        "function Counter() {\n" +
        "  const [count, setCount] = useState(0);\n" +
        "  const increment = () => {\n" +
        "    setCount(count + 1);  // mark dirty\n" +
        "    // count עדיין 0 כאן!\n" +
        "    console.log(count);   // 0\n" +
        "  };\n" +
        "  return <button onClick={increment}>{count}</button>;\n" +
        "}",
      codeExplanation:
        "setCount מתזמן עדכון אבל לא משנה את count מיידית. בתוך אותה פונקציה count נשאר עם הערך הישן. הערך החדש זמין רק ברינדור הבא.",
    },

    // ─────────────────────────── 7. infinite loop (difficulty 9) ───────────────────────────
    {
      conceptName: "infinite loop",
      difficulty: 9,
      levels: {
        grandma:
          "infinite loop זה 'לולאה אינסופית' — דבר חוזר על עצמו בלי לעצור. ב-React: useEffect שמשנה state, וזה גורם ל-re-render שמטריג שוב את ה-effect, וכך הלאה.",
        child:
          "כמו במשחק 'איש מקיש על דלת'. הילד לוחץ — נפתחת. נפתחת — הילד לוחץ. אם אין מי שעוצר — לעולם לא נגמר.",
        soldier:
          "Infinite loop ב-useEffect: האפקט משנה state → state טריגר re-render → רינדור מריץ אפקט (אם deps השתנו) → state חדש → re-render → ... עד שהדפדפן קורס או מתריע.",
        student:
          "סיבות נפוצות: (1) useEffect בלי deps שמשנה state. (2) deps עם אובייקט/מערך/פונקציה שנוצרים חדשים בכל רינדור. (3) state ב-deps שהאפקט עצמו משנה.",
        junior:
          "בניתי טופס שעדכן state אחרי כל הקלקה. ה-keyboard נחסם, הדף קפא. הבנתי שיש לי useEffect(setX, [x]) — עדכן state ש-deps שלו. הצלחתי רק כשהוצאתי את האפקט.",
        professor:
          "Infinite loops manifest as repeated state mutations without convergence. React 18 dev mode warns after ~25 re-renders ('Maximum update depth exceeded'). Diagnose by inspecting which state mutations occur in effects and what triggers their deps.",
      },
      illustration:
        "♾️ infinite loop — הזרימה:\n\n" +
        "  useEffect(() => {\n" +
        "    setX(x + 1);     ← משנה state\n" +
        "  });   ← אין deps → רץ בכל רינדור\n\n" +
        "  זרימה: render → effect → setX → render → effect → ...",
      codeExample:
        "// ❌ Infinite loop\n" +
        "function Bad() {\n" +
        "  const [count, setCount] = useState(0);\n" +
        "  useEffect(() => {\n" +
        "    setCount(count + 1);  // משנה state\n" +
        "  });  // ⚠️ אין deps → רץ אחרי כל רינדור!\n" +
        "  return <div>{count}</div>;\n" +
        "}\n" +
        "// React: 'Maximum update depth exceeded'",
      codeExplanation:
        "האפקט רץ אחרי כל רינדור, משנה state, ומטריג רינדור חדש. אין תנאי עצירה. Dev mode מתריע אחרי 25+ רינדורים. כדי לתקן: הוסף [] ל-deps, או הסר את ה-setCount.",
      extras: {
        moreExamples: [
          {
            code:
              "// סיבה 1: missing deps\n" +
              "useEffect(() => {\n" +
              "  setData(transform(props));\n" +
              "});  // ⚠️ אין deps\n" +
              "// פתרון: useEffect(() => {...}, [props]) או [props.x] על השדה הספציפי",
            explanation:
              "האפקט רץ בכל רינדור ומשנה state — לולאה. תיקון: deps array עם הערכים שהאפקט תלוי בהם.",
          },
          {
            code:
              "// סיבה 2: object dep\n" +
              "function App() {\n" +
              "  const [data, setData] = useState(null);\n" +
              "  const config = { url: '/api' };  // אובייקט חדש בכל render\n" +
              "  useEffect(() => {\n" +
              "    fetch(config.url).then(setData);\n" +
              "  }, [config]);  // ⚠️ config 'משתנה' תמיד\n" +
              "}\n" +
              "// פתרון:\n" +
              "// const config = useMemo(() => ({ url: '/api' }), []);",
            explanation:
              "config הוא literal — בכל רינדור הפניה חדשה. deps רואה 'שונה' → אפקט רץ → setData → re-render → loop.",
          },
          {
            code:
              "// סיבה 3: function dep\n" +
              "function Parent() {\n" +
              "  const handler = () => {...};  // פונקציה חדשה כל render\n" +
              "  return <Child onClick={handler} />;\n" +
              "}\n" +
              "function Child({ onClick }) {\n" +
              "  useEffect(() => onClick(), [onClick]);  // ⚠️ onClick תמיד חדש\n" +
              "}\n" +
              "// פתרון: useCallback בהורה.",
            explanation:
              "פונקציה inline יוצרת הפניה חדשה. useCallback(handler, []) שומרת אותה הפניה.",
          },
          {
            code:
              "// סיבה 4: state ב-deps שהאפקט משנה\n" +
              "useEffect(() => {\n" +
              "  setCount(count + 1);\n" +
              "}, [count]);  // ⚠️ קורא לשינוי count כש-count משתנה — loop!\n" +
              "// פתרון: שקול אם באמת צריך אפקט. בד\"כ עדיף derived state.",
            explanation:
              "האפקט משתנה כתוצאה מ-deps שהאפקט עצמו משנה. בד\"כ סימן שאולי לא צריך useEffect בכלל.",
          },
        ],
        pitfalls: [
          {
            mistake: "useEffect בלי deps שמשנה state",
            why: "רץ בכל רינדור → משנה state → רינדור חדש → loop.",
            fix: "הוסף deps array. ברוב המקרים [] (mount-only) או רשימה ספציפית.",
          },
          {
            mistake: "object/array/function ב-deps",
            why: "הפניה חדשה בכל רינדור — deps תמיד 'שונה' → loop.",
            fix: "useMemo/useCallback ליצירת הפניה יציבה. או חלץ primitive.",
          },
          {
            mistake: "state שהאפקט משנה גם נמצא ב-deps",
            why: "האפקט יוצר את התנאי לחזרה של עצמו.",
            fix: "השתמש ב-functional update: setX(prev => ...). או שקול אם האפקט נחוץ.",
          },
          {
            mistake: "התעלמות מ'Maximum update depth exceeded'",
            why: "React מתריע — סימן בטוח לבעיה. אם מתעלמים, מאוחר יותר זה יקפיא דפדפן ב-prod.",
            fix: "פתח את הקומפוננטה, הסתכל על ה-effects, אתר איזה state משתנה ומחיה את הלולאה.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "מה יקרה?\n  useEffect(() => setN(n+1));\n  // ללא deps",
            answer:
              "Infinite loop — האפקט רץ בכל רינדור, משנה n, מטריג רינדור חדש. דפדפן קופא.",
          },
          {
            question:
              "useEffect(fn, [user]) — user הוא object literal של parent. מה הבעיה?",
            answer:
              "user נוצר חדש בכל רינדור של parent — deps רואה 'שונה' תמיד → loop. תיקון: useMemo בהורה או pass primitive.",
          },
          {
            question:
              "איך לאתר infinite loop בקוד שלי?",
            answer:
              "1. הוסף console.log בתחילת הקומפוננטה. 2. אם רץ אינסופית, חפש useEffect שמשנה state. 3. בדוק deps: אם יש object/function/missing dep — סיבה צפויה.",
          },
        ],
      },
    },

    // ─────────────────────────── 8. useMemo (difficulty 7) ───────────────────────────
    {
      conceptName: "useMemo",
      difficulty: 7,
      levels: {
        grandma:
          "useMemo זה 'תזכור את החישוב'. כמו שאת מבשלת מרק ומחזיקה אותו במקפיא — לא צריך לבשל מההתחלה כל פעם שרוצים לאכול.",
        child:
          "כמו לפתור בעיה במחברת ולכתוב את התשובה. אם שאלה דומה חוזרת — את מסתכלת ולא פותרת מההתחלה.",
        soldier:
          "useMemo(fn, deps) שומר את התוצאה של fn ומחזיר אותה כל עוד deps לא השתנו. שימושי לחישובים יקרים שלא רוצים להריץ בכל רינדור.",
        student:
          "useMemo מבצע memoization על תוצאה. שימוש לדוגמה: סינון רשימה גדולה, חישובים מתמטיים יקרים, יצירת אובייקטים יציבים שעוברים כ-prop.",
        junior:
          "השתמשתי ב-useMemo על סינון רשימה של 10,000 פריטים — וביצועים השתפרו פלאים. אבל בקטן (5 פריטים) — useMemo עצמו עולה יותר. החוק: השתמש רק כשיש בעיית ביצועים מדידה.",
        professor:
          "useMemo memoizes computation results based on referential dep equality (Object.is). Effective for expensive calculations or stabilizing props for memoized children. Has overhead — premature use is anti-pattern.",
      },
      illustration:
        "🧠 useMemo — מטמון לחישובים:\n\n" +
        "  const result = useMemo(() => {\n" +
        "    return expensiveCalc(a, b);\n" +
        "  }, [a, b]);\n\n" +
        "  ─────────────────────────────────\n" +
        "  אם a או b השתנו → רץ מחדש\n" +
        "  אחרת → מחזיר את התוצאה הישנה\n" +
        "  ─────────────────────────────────",
      codeExample:
        "function Filter({ items, query }) {\n" +
        "  const filtered = useMemo(() => {\n" +
        "    return items.filter(it =>\n" +
        "      it.name.toLowerCase().includes(query.toLowerCase())\n" +
        "    );\n" +
        "  }, [items, query]);\n" +
        "  return filtered.map(it => <Item key={it.id} {...it} />);\n" +
        "}",
      codeExplanation:
        "filter רץ רק כש-items או query משתנים. בכל רינדור אחר (שגרם state אחר), filtered נשאר אותו ערך — חוסך עבודה.",
      extras: {
        moreExamples: [
          {
            code:
              "// יציבות הפניה לאובייקט שעובר כ-prop\n" +
              "const config = useMemo(() => ({\n" +
              "  endpoint: '/api',\n" +
              "  retries: 3,\n" +
              "}), []);\n" +
              "<Child config={config} />",
            explanation:
              "אובייקט inline יוצר הפניה חדשה כל render. useMemo שומר אותה הפניה — Child עטוף ב-React.memo לא יתרענן.",
          },
          {
            code:
              "// ❌ overuse — overhead ללא הצדקה\n" +
              "const sum = useMemo(() => a + b, [a, b]);\n" +
              "// תאוריטית 'יעיל' — בפועל a+b מהיר יותר מאשר ה-Hook עצמו",
            explanation:
              "useMemo עצמו עולה (השוואת deps, שמירת cache). שווה רק לחישובים יקרים אמיתיים.",
          },
          {
            code:
              "// כש-deps כוללים אובייקט — בעיה כמו ב-useEffect\n" +
              "function App({ filter }) {\n" +
              "  const result = useMemo(() => compute(filter), [filter]);\n" +
              "  // אם filter object literal של parent — useMemo חסר תועלת\n" +
              "}",
            explanation:
              "אם deps של useMemo משתנים בכל רינדור (object/array reference), אין שמירה במטמון.",
          },
        ],
        pitfalls: [
          {
            mistake: "useMemo על חישוב זול",
            why: "ה-Hook עצמו עולה — לחישובים פשוטים זה הפסד.",
            fix: "השתמש רק כשיש בעיית ביצועים מוכחת (DevTools Profiler).",
          },
          {
            mistake: "deps עם object/array — זהה לבעיה ב-useEffect",
            why: "deps תמיד נחשבים 'שונים' — useMemo חוסר תועלת.",
            fix: "useMemo נוסף לדוקסטינציה, או חלץ primitives.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "מתי useMemo מחזיר תוצאה ישנה?",
            answer:
              "כשכל ה-deps זהים (לפי Object.is) לריצה הקודמת. אז fn לא רץ בכלל.",
          },
          {
            question:
              "האם כדאי לעטוף כל חישוב ב-useMemo?",
            answer:
              "לא. ל-useMemo עצמו יש overhead. השתמש רק לחישובים יקרים מדידים, או ליציבות הפניה ל-prop של ילד עטוף ב-React.memo.",
          },
        ],
      },
    },

    // ─────────────────────────── 9. expensive calculation (difficulty 5) ───────────────────────────
    {
      conceptName: "expensive calculation",
      difficulty: 5,
      levels: {
        grandma:
          "expensive calculation זה חישוב 'יקר' — שלוקח הרבה זמן או משאבים. כמו לאפות עוגה: לוקח שעה. אם תאפי עוגה חדשה כל פעם שבא לך פרוסה — זו בזבוז.",
        child:
          "כמו לפתור תרגיל מתמטי קשה. אם פתרת אותו — תזכרי את התשובה. אל תפתרי שוב כל פעם.",
        soldier:
          "Expensive calculation = פעולה שלוקחת זמן (לולאות גדולות, מיון, חישובים, סינון רשימות ארוכות). ב-React — כל מה שיכול להאט את ה-render.",
        student:
          "באפליקציות react, חישובים יקרים הם הסיבה השכיחה לחוויית משתמש איטית. הפתרונות: useMemo, virtualization, web workers, lazy loading.",
        junior:
          "פעם בניתי טבלה של 5000 שורות עם סינון real-time. כל הקלקה הקפיאה את הדפדפן. עטפתי את הסינון ב-useMemo עם deps נכונים — וזה הפך מהיר.",
        professor:
          "Expensive calculations may dominate render time. Profile with React DevTools' Flamegraph; tools: useMemo for memoization, useDeferredValue/useTransition for non-urgent updates, react-window for virtualization.",
      },
      illustration:
        "🐌 expensive calculation — דוגמאות:\n\n" +
        "  סינון של 10,000 פריטים\n" +
        "  מיון של מערך גדול\n" +
        "  חישוב סטטיסטי / אגרגציה\n" +
        "  פירוק/הרכבה של JSON גדול\n" +
        "  עיבוד תמונה / קנבס",
      codeExample:
        "function Stats({ records }) {\n" +
        "  // חישוב יקר על 10,000 records\n" +
        "  const stats = useMemo(() => {\n" +
        "    return records.reduce((acc, r) => {\n" +
        "      acc.total += r.value;\n" +
        "      acc.count += 1;\n" +
        "      return acc;\n" +
        "    }, { total: 0, count: 0 });\n" +
        "  }, [records]);\n" +
        "  return <div>ממוצע: {stats.total / stats.count}</div>;\n" +
        "}",
      codeExplanation:
        "reduce על 10,000 רשומות הוא חישוב יקר. useMemo מבטיח שהוא ירוץ רק כש-records משתנה — לא בכל רינדור (כשparent משתנה ממה שלא קשור).",
    },

    // ─────────────────────────── 10. memoization (difficulty 7) ───────────────────────────
    {
      conceptName: "memoization",
      difficulty: 7,
      levels: {
        grandma:
          "memoization זה 'לזכור תוצאה' — שמירת תוצאה של חישוב כדי לא לעשות אותו שוב. כמו לרשום בפנקס: '5+5=10'. בפעם הבאה — לא צריך לחשב.",
        child:
          "כמו ללמוד טבלת כפל. במקום לחשב 7×8 כל פעם, אתה זוכר '56'. memoization עושה אותו דבר לקוד.",
        soldier:
          "Memoization = שמירת תוצאות פונקציה לפי הקלט. אם אותו קלט חוזר → מחזירים את התוצאה השמורה. ב-React: useMemo, useCallback, React.memo.",
        student:
          "Memoization היא טכניקה מ-CS שמעדיפה זיכרון על זמן. ב-React היא מאפשרת בילימת re-renders מיותרים ושמירת ערכי חישוב יקרים. אבל יש לה overhead משלה.",
        junior:
          "שגיאת מתחילים: לעטוף הכל ב-useMemo בלי הוכחה שיש בעיית ביצועים. לעיתים קרובות זה מאט את הקוד! עכשיו אני תמיד מודד עם React Profiler לפני אופטימיזציה.",
        professor:
          "Memoization in React decomposes into three primitives: useMemo (values), useCallback (functions), React.memo (components). Each adds bookkeeping cost; benefits accrue when bypassed renders dominate the saved cost.",
      },
      illustration:
        "🧠 memoization — שלושת ה-Hooks:\n\n" +
        "  useMemo(fn, deps)        ← זוכר ערך\n" +
        "  useCallback(fn, deps)    ← זוכר פונקציה (זהות)\n" +
        "  React.memo(Component)    ← זוכר את ה-render של רכיב",
      codeExample:
        "// useMemo — זיכרון ערך\n" +
        "const total = useMemo(() => sum(items), [items]);\n\n" +
        "// useCallback — זיכרון פונקציה\n" +
        "const handler = useCallback(() => doX(id), [id]);\n\n" +
        "// React.memo — זיכרון render\n" +
        "const Row = React.memo(function Row({ data }) {\n" +
        "  return <li>{data.name}</li>;\n" +
        "});",
      codeExplanation:
        "כל הכלי משרת מטרה: useMemo שומר ערך, useCallback שומר זהות פונקציה (חיוני ל-Child עטוף ב-React.memo), ו-React.memo בעצמו מונע re-render כשprops לא השתנו.",
      extras: {
        moreExamples: [
          {
            code:
              "// טריילוגיית memoization יחד\n" +
              "const Parent = () => {\n" +
              "  const [count, setCount] = useState(0);\n" +
              "  const items = useMemo(() => makeItems(), []);  // יציבות\n" +
              "  const onClick = useCallback((id) => {...}, []);\n" +
              "  return (\n" +
              "    <>\n" +
              "      <button onClick={() => setCount(c=>c+1)}>{count}</button>\n" +
              "      <Child items={items} onClick={onClick} />\n" +
              "    </>\n" +
              "  );\n" +
              "};\n" +
              "const Child = React.memo(({ items, onClick }) => {\n" +
              "  return items.map(it => <Item key={it.id} onClick={onClick} />);\n" +
              "});",
            explanation:
              "Parent מתרענן בכל count++. Child לא יתרענן כי props שלו (items + onClick) הם הפניות יציבות בזכות useMemo + useCallback.",
          },
        ],
        pitfalls: [
          {
            mistake: "memoization בלי React.memo בילד",
            why: "useCallback ב-parent בלי React.memo בילד — חסר תועלת. הילד יתרענן בכל מקרה.",
            fix: "useCallback + React.memo עובדים ביחד. אחד בלי השני בד\"כ ללא ערך.",
          },
          {
            mistake: "premature memoization",
            why: "Overhead בלי תועלת מדידה. לפעמים מאט את הקוד.",
            fix: "מדוד עם React Profiler לפני שמאפטימים. רוב הקומפוננטות לא צריכות.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "useCallback בלי React.memo בילד — האם זה מועיל?",
            answer:
              "לא, או כמעט לא. useCallback שומר את ההפניה — אבל אם הילד מתרענן בכל מקרה (אין React.memo) — אין מי שיבדוק את ההפניה.",
          },
          {
            question:
              "מה ההבדל בין useMemo ל-useCallback?",
            answer:
              "useMemo שומר ערך (תוצאה של fn). useCallback שומר פונקציה (אותה הפניה). useCallback(fn, deps) ≡ useMemo(() => fn, deps).",
          },
        ],
      },
    },

    // ─────────────────────────── 11. useRef (difficulty 6) ───────────────────────────
    {
      conceptName: "useRef",
      difficulty: 6,
      levels: {
        grandma:
          "useRef זה כמו 'תיק שאת מחזיקה ביד' — תוכן יכול להשתנות אבל את לא צריכה לקרוא לכולם 'הביטו, השתנה!'. ב-React: שינוי ב-ref לא גורם ל-re-render.",
        child:
          "כמו קופסה עם מחיק שאת לוקחת לכיתה. מתי שתרצי תיקני אותו, אבל לא חייבים לעדכן את כל הכיתה כל שינוי.",
        soldier:
          "useRef(initial) מחזיר אובייקט עם .current. שינוי .current לא מטריג re-render. שני שימושים נפוצים: 1) הפניה ל-DOM element. 2) שמירת ערך בין רינדורים.",
        student:
          "useRef שונה מ-useState בכך ששינוי לא גורם ל-render. שימושים: DOM access (input focus), interval IDs, previous value tracking, mutable counters.",
        junior:
          "פעם השתמשתי ב-useState עבור counter פנימי שלא צריך להופיע ב-UI — וכל שינוי גרם רינדור מיותר. עברתי ל-useRef וזה הפך ליעיל.",
        professor:
          "useRef returns a stable mutable object across renders, avoiding the reactivity overhead of useState. It's the 'escape hatch' for imperative DOM access and for values that need to persist without triggering renders.",
      },
      illustration:
        "🪤 useRef — שני שימושים:\n\n" +
        "  1. גישה ל-DOM\n" +
        "  const ref = useRef(null);\n" +
        "  <input ref={ref} />\n" +
        "  ref.current.focus();\n\n" +
        "  2. שמירת ערך בלי re-render\n" +
        "  const intervalId = useRef(null);\n" +
        "  intervalId.current = setInterval(...);",
      codeExample:
        "function FocusInput() {\n" +
        "  const inputRef = useRef(null);\n" +
        "  return (\n" +
        "    <>\n" +
        "      <input ref={inputRef} />\n" +
        "      <button onClick={() => inputRef.current.focus()}>\n" +
        "        Focus\n" +
        "      </button>\n" +
        "    </>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "useRef(null) יוצר קופסה. React מציב את ה-input element ב-inputRef.current אחרי mount. הלחיצה קוראת ל-focus() דרך ההפניה.",
      extras: {
        moreExamples: [
          {
            code:
              "// שמירת previous value\n" +
              "function Counter({ count }) {\n" +
              "  const prevCount = useRef();\n" +
              "  useEffect(() => {\n" +
              "    prevCount.current = count;\n" +
              "  }, [count]);\n" +
              "  return <div>עכשיו {count}, היה {prevCount.current}</div>;\n" +
              "}",
            explanation:
              "useRef שומר את הערך הקודם של count. useEffect מעדכן את ה-ref אחרי כל רינדור.",
          },
          {
            code:
              "// אחסון ID של setInterval\n" +
              "function Timer() {\n" +
              "  const idRef = useRef();\n" +
              "  const start = () => {\n" +
              "    idRef.current = setInterval(() => console.log('tick'), 1000);\n" +
              "  };\n" +
              "  const stop = () => clearInterval(idRef.current);\n" +
              "  return <><button onClick={start}>start</button>\n" +
              "         <button onClick={stop}>stop</button></>;\n" +
              "}",
            explanation:
              "ה-ID לא צריך להופיע ב-UI — useRef חוסך re-renders שלא נחוצים.",
          },
        ],
        pitfalls: [
          {
            mistake: "ציפייה ש-ref.current יעדכן UI",
            why: "שינוי ל-.current לא מטריג re-render — UI נשאר עם הערך הישן.",
            fix: "אם הערך צריך להשפיע על UI, השתמש ב-useState. useRef למה ש'מאחורי הקלעים'.",
          },
          {
            mistake: "שינוי ref בגוף הקומפוננטה",
            why: "הקומפוננטה צריכה להיות pure בעת render. שינוי ref ב-render הוא side effect.",
            fix: "שנה רק בתוך event handler או useEffect.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "האם שינוי ל-ref.current מטריג re-render?",
            answer:
              "לא. זה ההבדל המרכזי מ-useState. useRef שמיש לערכים שלא צריכים להשפיע על UI.",
          },
          {
            question:
              "מתי תשתמש ב-useRef ולא ב-useState?",
            answer:
              "(1) הפניה ל-DOM. (2) שמירת timer/interval IDs. (3) ערך שמשתנה אבל לא צריך לגרום לrender (כמו 'first render?' flag, previous value).",
          },
        ],
      },
    },

    // ─────────────────────────── 12. ref (difficulty 5) ───────────────────────────
    {
      conceptName: "ref",
      difficulty: 5,
      levels: {
        grandma:
          "ref זה 'מחזיק' — מקום שאת שומרת בו דבר ויכולה להגיע אליו ישירות. ב-React: דרך לתפוס element במסך כדי לבצע עליו פעולות.",
        child:
          "כמו לאחוז בידית הדלת. את יודעת איפה היא, את יכולה לפתוח/לסגור.",
        soldier:
          "ref ב-React הוא prop מיוחד. כשמצמידים ref ל-DOM element (כמו input), React מציב את ה-element עצמו ב-ref.current.",
        student:
          "Refs הם 'escape hatch' מהמודל הדקלרטיבי. שימוש לפעולות אימפרטיביות: focus, scroll, measure, integrate libraries (D3, Chart.js).",
        junior:
          "פעם רציתי לקרוא לפונקציה על אלמנט (focus). לא ידעתי איך — ניסיתי document.querySelector. עברתי ל-ref וזה הפך נקי וקריא.",
        professor:
          "Refs decouple component logic from imperative DOM operations. forwardRef + useImperativeHandle expose limited APIs from child to parent without full DOM exposure.",
      },
      illustration:
        "🔗 ref — חיבור לאלמנט:\n\n" +
        "  const ref = useRef(null);\n" +
        "  return <input ref={ref} />;\n\n" +
        "  אחרי mount: ref.current = ה-input DOM element\n" +
        "  ref.current.focus();   ✓\n" +
        "  ref.current.value;     ✓",
      codeExample:
        "function MyInput() {\n" +
        "  const inputRef = useRef(null);\n" +
        "  return <input ref={inputRef} placeholder='הקלד...' />;\n" +
        "}",
      codeExplanation:
        "ה-prop ref מצמיד את ה-input DOM element ל-inputRef.current. אפשר לגשת אליו דרך ה-ref ולהריץ פונקציות מובנות.",
    },

    // ─────────────────────────── 13. ref.current (difficulty 6) ───────────────────────────
    {
      conceptName: "ref.current",
      difficulty: 6,
      levels: {
        grandma:
          "ref.current זה 'מה שיש בקופסה עכשיו'. הקופסה (ref) קבועה, אבל מה שבתוכה (current) יכול להשתנות.",
        child:
          "כמו תיק עם תוכן משתנה. התיק נשאר אותו תיק. את שמה דברים פנימה ומוציאה — אבל התיק קבוע.",
        soldier:
          "ref.current מצביע על הערך הנוכחי. ל-DOM ref: ה-element אחרי mount, null לפני. לערך-ref: הערך שהגדרת ב-useRef(initial), משתנה לכל ההצבה.",
        student:
          "ref.current הוא mutable property באובייקט שיציב בין רינדורים. שינוי שלו לא מטריג re-render. חשוב: אסור לקרוא או להגדיר אותו בגוף הקומפוננטה (render phase).",
        junior:
          "בהתחלה לא הבנתי למה ref.current = null. הבנתי שזה 'לפני mount'. בעת mount, React מציב את ה-element. עכשיו אני בודק אם ref.current לפני שאני קורא לפונקציה.",
        professor:
          "ref.current is a mutable holder. For DOM refs, React assigns it during commit phase, post-render. Reading or writing it during render breaks purity. Stable across renders — does not trigger re-render on mutation.",
      },
      illustration:
        "📦 ref.current — מה שיש בקופסה:\n\n" +
        "  const ref = useRef('שלום');\n" +
        "  ref.current     →  'שלום'\n" +
        "  ref.current = 'עולם';\n" +
        "  ref.current     →  'עולם'\n" +
        "  // אין re-render!",
      codeExample:
        "function Component() {\n" +
        "  const inputRef = useRef(null);\n" +
        "  useEffect(() => {\n" +
        "    if (inputRef.current) {\n" +
        "      inputRef.current.focus();  // קריא ל-element\n" +
        "    }\n" +
        "  }, []);\n" +
        "  return <input ref={inputRef} />;\n" +
        "}",
      codeExplanation:
        "ה-input בעת mount מקבל focus. לפני mount, ref.current=null. אחרי, הוא ה-DOM element. ה-if למניעת שגיאה.",
      extras: {
        moreExamples: [
          {
            code:
              "// בדיקת mount הראשון\n" +
              "function App() {\n" +
              "  const isFirstMount = useRef(true);\n" +
              "  useEffect(() => {\n" +
              "    if (isFirstMount.current) {\n" +
              "      isFirstMount.current = false;\n" +
              "      return;  // לא רץ ב-mount הראשון\n" +
              "    }\n" +
              "    console.log('updated');\n" +
              "  });\n" +
              "}",
            explanation:
              "useRef מאפשר לדעת 'האם זה הרינדור הראשון'. שינוי ל-.current לא משפיע על הרינדור עצמו.",
          },
        ],
        pitfalls: [
          {
            mistake: "קריאה ל-ref.current בגוף הקומפוננטה (render)",
            why: "הקומפוננטה צריכה להיות pure בעת render. קריאה ל-ref היא side effect לא צפוי.",
            fix: "קרא רק בתוך event handler או useEffect.",
          },
          {
            mistake: "שינוי ref.current ב-render — וצפייה ל-re-render",
            why: "useRef לא reactive. שינוי לא מתריע React.",
            fix: "אם צריך re-render, השתמש ב-useState.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "מתי ref.current של DOM ref יהיה null?",
            answer:
              "(1) לפני mount הראשון. (2) אחרי unmount. (3) אם ה-element לא מורנדר (תנאי).",
          },
        ],
      },
    },

    // ─────────────────────────── 14. DOM element (difficulty 4) ───────────────────────────
    {
      conceptName: "DOM element",
      difficulty: 4,
      levels: {
        grandma:
          "DOM element זה 'אלמנט במסך' — כל פיסה ויזואלית של דף האינטרנט: כפתור, תמונה, טקסט. הדפדפן מציג אותם, ו-JavaScript יכול לתפעל אותם.",
        child:
          "כל דבר שאת רואה בדף הוא element. הכפתור, התמונה, השורה הזו — כל אחד הוא element נפרד.",
        soldier:
          "DOM element הוא ייצוג ב-JavaScript של תג HTML (<div>, <button>, וכו'). Document Object Model = עץ של elements. ל-React יש Virtual DOM שמייצג את אותו עץ ביעילות.",
        student:
          "DOM elements הם interface בין HTML ל-JS. לכל element תכונות (innerHTML, value, classList) ושיטות (focus, click, scrollIntoView). React שומר על ה-DOM מסונכרן עם state.",
        junior:
          "לפני React, עבדתי הרבה עם document.querySelector. עם React, ב-99% מהמקרים אני לא נוגע ב-DOM ישירות — React מנהל. רק במקרים נדירים: focus, scroll, integrate ספריות.",
        professor:
          "DOM elements are host-environment objects exposed to JS. React abstracts via Virtual DOM and reconciliation; direct DOM manipulation should be limited to escape-hatch scenarios via refs.",
      },
      illustration:
        "🌳 DOM tree — דוגמה:\n\n" +
        "  <html>\n" +
        "    <body>\n" +
        "      <div>            ← element\n" +
        "        <h1>Hello</h1>  ← element\n" +
        "        <button />     ← element\n" +
        "      </div>\n" +
        "    </body>\n" +
        "  </html>",
      codeExample:
        "function Card() {\n" +
        "  const ref = useRef(null);\n" +
        "  useEffect(() => {\n" +
        "    console.log(ref.current.tagName);  // 'DIV'\n" +
        "    console.log(ref.current.children.length);  // 2\n" +
        "  }, []);\n" +
        "  return (\n" +
        "    <div ref={ref}>\n" +
        "      <h2>כותרת</h2>\n" +
        "      <p>תוכן</p>\n" +
        "    </div>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "ה-ref נותן גישה ישירה ל-DOM element (div). אפשר לקרוא תכונות שלו (tagName, children) או להריץ פונקציות (focus, scrollTo).",
    },

    // ─────────────────────────── 15. focus (difficulty 4) ───────────────────────────
    {
      conceptName: "focus",
      difficulty: 4,
      levels: {
        grandma:
          "focus זה 'תפקודית הסמן'. כשהסמן בתוך שדה — אפשר להקליד. focus() מצמיד את הסמן לשדה ספציפי.",
        child:
          "כמו לכוון את הזרקור על מישהו במופע. אותו אדם בולט עכשיו. focus עושה את אותו דבר לשדה במסך.",
        soldier:
          "element.focus() מציב את הסמן ב-element אם הוא input/textarea/button/contenteditable. מאפשר הקלדה מיידית בלי שהמשתמש צריך ללחוץ.",
        student:
          "Focus management חשוב לחוויית משתמש: כש-modal נפתח, focus עובר אליו. אחרי שגיאה — focus לשדה. שיפור גדול לנגישות (keyboard navigation, screen readers).",
        junior:
          "פעם בניתי טופס שאחרי שגיאה לא היה מקפיץ למשתמש לאן לתקן. הוספתי focus() אוטומטי לשדה הבעייתי — וחוויית המשתמש השתפרה משמעותית.",
        professor:
          "focus() is a DOM method that moves keyboard input focus. ARIA + focus management are core to a11y. Focus traps in modals prevent keyboard navigation outside. Tabbing order via tabindex.",
      },
      illustration:
        "👁️ focus — הסמן עובר ל-element:\n\n" +
        "  <input ref={inputRef} />\n" +
        "  inputRef.current.focus();\n\n" +
        "  → הסמן בשדה, המשתמש יכול להקליד מיד",
      codeExample:
        "function AutoFocusInput() {\n" +
        "  const ref = useRef(null);\n" +
        "  useEffect(() => {\n" +
        "    ref.current?.focus();  // focus אוטומטי ב-mount\n" +
        "  }, []);\n" +
        "  return <input ref={ref} placeholder='הקלד...' />;\n" +
        "}",
      codeExplanation:
        "אחרי שהקומפוננטה מורנדרת, useEffect רץ ומקפיץ focus ל-input. המשתמש יכול להקליד מיד בלי ללחוץ.",
    },

    // ─────────────────────────── 16. cleanup (difficulty 8) ───────────────────────────
    {
      conceptName: "cleanup",
      difficulty: 8,
      levels: {
        grandma:
          "cleanup זה 'ניקוי' — לסגור אחרי עצמך. אם פתחת חלון — תסגרי. אם הפעלת תנור — תכבי. ב-React: אם הוספת listener — תסיר אותו.",
        child:
          "במשחק 'תורנות': הילד שגומר משתמש בכלי, מנקה אחריו, ואז ילד חדש יכול להשתמש. cleanup הוא הניקוי הזה.",
        soldier:
          "Cleanup function = הפונקציה שמחזירים מ-useEffect. רצה לפני האפקט הבא ובעת unmount. שימושים: clearInterval, removeEventListener, abort fetch, unsubscribe.",
        student:
          "useEffect מאפשר return של cleanup function — נקראת בעת התרענון או unmount. בלעדיה, listeners ו-timers נוצרים בכל רינדור ולא משוחררים → memory leak.",
        junior:
          "פעם בניתי קומפוננטה שהוסיפה scroll listener ב-mount. שכחתי cleanup — וכל פתיחה של הקומפוננטה הוסיפה listener נוסף. הדף הפך איטי. תיקון: return () => removeEventListener.",
        professor:
          "Cleanup functions are called before the next effect run and at unmount. They prevent memory leaks, race conditions, and stale subscriptions. Critical for production-grade apps with long-lived components.",
      },
      illustration:
        "🧹 cleanup — מתי רץ:\n\n" +
        "  useEffect(() => {\n" +
        "    const id = setInterval(...);\n" +
        "    return () => {\n" +
        "      clearInterval(id);   ← cleanup\n" +
        "    };\n" +
        "  }, []);\n\n" +
        "  cleanup רץ:\n" +
        "    1. לפני האפקט הבא (אם deps השתנו)\n" +
        "    2. בעת unmount של הקומפוננטה",
      codeExample:
        "function Clock() {\n" +
        "  const [time, setTime] = useState(new Date());\n" +
        "  useEffect(() => {\n" +
        "    const id = setInterval(() => setTime(new Date()), 1000);\n" +
        "    return () => clearInterval(id);  // cleanup\n" +
        "  }, []);\n" +
        "  return <div>{time.toLocaleTimeString()}</div>;\n" +
        "}",
      codeExplanation:
        "setInterval מתחיל ב-mount. ה-cleanup מעצור אותו ב-unmount. בלי ה-cleanup, השעון ימשיך לרוץ גם אחרי שהקומפוננטה הוסרה — דליפת זיכרון.",
      extras: {
        moreExamples: [
          {
            code:
              "// event listeners עם cleanup\n" +
              "useEffect(() => {\n" +
              "  const onScroll = () => console.log(window.scrollY);\n" +
              "  window.addEventListener('scroll', onScroll);\n" +
              "  return () => window.removeEventListener('scroll', onScroll);\n" +
              "}, []);",
            explanation:
              "ה-listener מתווסף ב-mount, מוסר ב-unmount. בלי cleanup → לכל mount listener חדש, גם הישן עדיין רץ.",
          },
          {
            code:
              "// race condition cleanup\n" +
              "useEffect(() => {\n" +
              "  let cancelled = false;\n" +
              "  fetch('/api').then(r => r.json()).then(data => {\n" +
              "    if (!cancelled) setData(data);\n" +
              "  });\n" +
              "  return () => { cancelled = true; };\n" +
              "}, [id]);",
            explanation:
              "אם המשתמש משנה id מהר — fetch ישן עוד בדרך. cleanup מסמן 'התעלם מהתשובה הזו'.",
          },
          {
            code:
              "// AbortController למניעת fetch בפועל\n" +
              "useEffect(() => {\n" +
              "  const ctrl = new AbortController();\n" +
              "  fetch('/api', { signal: ctrl.signal })\n" +
              "    .then(r => r.json()).then(setData)\n" +
              "    .catch(e => e.name !== 'AbortError' && console.error(e));\n" +
              "  return () => ctrl.abort();\n" +
              "}, [id]);",
            explanation:
              "AbortController מבטל את ה-network request. עדיף על cancelled flag כי גם משחרר רוחב פס.",
          },
          {
            code:
              "// subscribe/unsubscribe\n" +
              "useEffect(() => {\n" +
              "  const sub = pubsub.subscribe('event', handler);\n" +
              "  return () => sub.unsubscribe();\n" +
              "}, []);",
            explanation:
              "כל subscription צריך unsubscribe. בלי cleanup → memory leak ו-handlers שלא נמחקים.",
          },
        ],
        pitfalls: [
          {
            mistake: "useEffect עם setInterval/setTimeout בלי cleanup",
            why: "ה-timer ממשיך לרוץ גם אחרי unmount → memory leak + שגיאות.",
            fix: "תמיד return () => clearInterval/clearTimeout(id).",
          },
          {
            mistake: "addEventListener בלי removeEventListener",
            why: "כל mount מוסיף listener. אחרי כמה mounts — מספר listeners זהים, כולם רצים.",
            fix: "return () => element.removeEventListener('event', sameFn).",
          },
          {
            mistake: "fetch בלי cancellation",
            why: "race condition — תשובה ישנה דורסת חדשה. או setState על קומפוננטה שכבר unmount.",
            fix: "cancelled flag או AbortController ב-cleanup.",
          },
          {
            mistake: "cleanup function ש-references משתנים שלא ב-deps",
            why: "stale closure — cleanup רואה ערכים ישנים.",
            fix: "וודא שכל המשתנים הרלוונטיים ב-deps של ה-effect.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "מתי רץ ה-cleanup function?",
            answer:
              "(1) לפני שהאפקט רץ שוב (כש-deps משתנים). (2) בעת unmount של הקומפוננטה.",
          },
          {
            question:
              "מה קורה אם שוכחים cleanup ב-setInterval?",
            answer:
              "ה-interval ממשיך לרוץ גם אחרי unmount. אם הוא קורא ל-setState — שגיאה 'Can't perform state update on unmounted component'. גם memory leak.",
          },
          {
            question:
              "useEffect עם dep [user]. מתי ה-cleanup רץ ביחס לאפקט?",
            answer:
              "ה-cleanup של הריצה הקודמת רץ לפני שהאפקט החדש רץ. בעת unmount — ה-cleanup האחרון רץ לבדו.",
          },
          {
            question:
              "כתוב cleanup ל-window.addEventListener('resize', handler).",
            answer:
              "return () => window.removeEventListener('resize', handler); — חייב להעביר את אותה הפניה לפונקציה.",
          },
        ],
      },
    },
  ],

  // Lesson-level quiz — meaningful questions on key useEffect concepts
  quiz: [
    {
      question:
        "מה יקרה?\n  function App() {\n    const [n, setN] = useState(0);\n    useEffect(() => { setN(n + 1); });\n    return <div>{n}</div>;\n  }",
      options: [
        "n יוגדל ב-1 פעם אחת",
        "Infinite loop ('Maximum update depth exceeded')",
        "useEffect לא ירוץ כי deps חסר",
        "n יישאר 0",
      ],
      correct: 1,
      explanation:
        "ללא deps, useEffect רץ אחרי כל רינדור. הוא משנה state → רינדור חדש → useEffect רץ שוב → loop.",
    },
    {
      question:
        "מה ההבדל בין useEffect(fn) לבין useEffect(fn, [])?",
      options: [
        "אין הבדל",
        "useEffect(fn) רץ פעם אחת, useEffect(fn, []) רץ בכל רינדור",
        "useEffect(fn) רץ בכל רינדור, useEffect(fn, []) רץ פעם אחת (mount)",
        "שניהם רצים פעם אחת",
      ],
      correct: 2,
      explanation:
        "ללא deps → רץ אחרי כל רינדור. עם deps=[] → רץ פעם אחת ב-mount.",
    },
    {
      question:
        "מה הבעיה?\n  const config = { url: '/api' };\n  useEffect(() => fetch(config.url), [config]);",
      options: [
        "אין בעיה",
        "config הוא אובייקט חדש בכל רינדור — deps תמיד 'שונה' → loop אינסופי",
        "config צריך להיות const, אבל הוא לא",
        "צריך להחזיר Promise",
      ],
      correct: 1,
      explanation:
        "object literal יוצר הפניה חדשה כל render. deps משווה ב-Object.is — תמיד 'שונה' → אפקט רץ → state מתעדכן → loop. תיקון: useMemo או חלץ primitives.",
    },
    {
      question:
        "באיזה Hook משתמשים לשמור הפניה ל-DOM element כדי לקרוא ל-focus?",
      options: ["useState", "useEffect", "useRef", "useMemo"],
      correct: 2,
      explanation:
        "useRef מחזיר אובייקט {current: null}. בעת mount, React מציב את ה-element ב-.current. שינוי לא מטריג re-render.",
    },
    {
      question:
        "מה תפקיד ה-cleanup function ב-useEffect?",
      options: [
        "להריץ קוד אחרי שהאפקט מסתיים",
        "להריץ קוד לפני האפקט הבא ובעת unmount — חיוני לסגירת timers, listeners, subscriptions",
        "לתקן שגיאות",
        "לתעד את הריצה",
      ],
      correct: 1,
      explanation:
        "cleanup מתרחש לפני האפקט הבא (כש-deps משתנים) ובעת unmount. בלעדיה — memory leaks, listeners כפולים, race conditions.",
    },
    {
      question:
        "מתי כדאי להשתמש ב-useMemo?",
      options: [
        "לכל חישוב, תמיד",
        "רק לחישובים יקרים מדידים, או ליציבות הפניה ל-prop של ילד עטוף ב-React.memo",
        "רק לחישובים מהירים",
        "useMemo מיותר ב-React 18",
      ],
      correct: 1,
      explanation:
        "useMemo עולה משלו (השוואת deps + שמירת cache). שימוש פופולרי בלי הצדקה מאט. השתמש כשיש בעיית ביצועים מוכחת.",
    },
  ],
};
