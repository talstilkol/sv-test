// data/lesson23.js — שיעור 23: Router + Context API
var LESSON_23 = {
  id: "lesson_23",
  title: "שיעור 23 — Router, Context API",
  description:
    "ניווט ב-React Router (Routes, Link, useNavigate, useParams), וניהול state גלובלי עם Context API (createContext, Provider, useContext). הימנעות מ-prop drilling.",
  concepts: [
    // ─── 1. Router (difficulty 5) ───
    {
      conceptName: "Router",
      difficulty: 5,
      levels: {
        grandma:
          "Router = 'ניווט'. מאפשר מסכים שונים באפליקציה (בית, אודות, פרופיל) — ולחיצה על קישור מעבירה ביניהם בלי לטעון מחדש את האתר.",
        child:
          "כמו ספר עם דפים — לוחצים על הקישור ועוברים לדף אחר. ה-URL משתנה אבל האתר לא נסגר.",
        soldier:
          "react-router-dom = ספרייה לניווט ב-React SPA. מעניקה Routes, Link, useNavigate, useParams.",
        student:
          "Router מטפל ב-history של הדפדפן (URL → component). אפשרויות: BrowserRouter (HTML5 history), HashRouter (לhost ללא server config), MemoryRouter (testing).",
        junior:
          "react-router v6 מאוד שונה מ-v5. Routes במקום Switch, element prop במקום component. השאר את עצמך מודעת לגרסה.",
        professor:
          "Client-side routing maps URLs to components without server roundtrips. Built on the History API; declarative route configuration via JSX.",
      },
      illustration:
        "🧭 Router — ניווט פנימי:\n\n" +
        "  / → Home\n" +
        "  /about → About\n" +
        "  /movies/:id → MovieDetail\n\n" +
        "  כל ניווט מחליף component — בלי refresh!",
      codeExample:
        "import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\n\n" +
        "function App() {\n" +
        "  return (\n" +
        "    <BrowserRouter>\n" +
        "      <nav>\n" +
        "        <Link to='/'>בית</Link>\n" +
        "        <Link to='/about'>אודות</Link>\n" +
        "      </nav>\n" +
        "      <Routes>\n" +
        "        <Route path='/' element={<Home />} />\n" +
        "        <Route path='/about' element={<About />} />\n" +
        "      </Routes>\n" +
        "    </BrowserRouter>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "BrowserRouter עוטף את האפליקציה. Link יוצר ניווט (לא <a>!), Routes + Route מגדירים איזה component להציג לכל URL.",
    },

    // ─── 2. URL (difficulty 3) ───
    {
      conceptName: "URL",
      difficulty: 3,
      levels: {
        grandma: "URL = הכתובת של הדף. כמו http://example.com/about — הכתובת משתנה לפי איפה אתה.",
        child: "כמו מספר בית. כל דף = URL שונה.",
        soldier: "Uniform Resource Locator. ב-SPA: ה-path קובע איזה component יוצג.",
        student: "URL parts: pathname (/about), search (?id=5), hash (#section). React Router מנתח את ה-pathname.",
        junior: "ב-DevTools: window.location מחזיר את כל החלקים. useLocation מ-react-router מספק access ב-React.",
        professor: "URL is the canonical state of the app's view. Routing libraries derive component tree from URL.",
      },
      illustration: "🔗 URL — מבנה:\n\n  https://example.com/movies/42?sort=title#top\n         protocol  domain   path     query    fragment",
      codeExample:
        "// URL: /movies/42 → מתאים ל:\n" +
        "<Route path='/movies/:id' element={<Movie />} />\n" +
        "// id = 42 זמין דרך useParams()",
      codeExplanation: "react-router משווה את ה-pathname מול ה-routes. ה-:id הוא parameter דינמי.",
    },

    // ─── 3. Route (difficulty 5) ───
    {
      conceptName: "Route",
      difficulty: 5,
      levels: {
        grandma: "Route = 'הגדרת מסלול'. אומר ל-React: 'אם ה-URL הוא X — הצג את הקומפוננטה Y'.",
        child: "כמו מפה: 'אם אתה ב-/about — הצג את About'.",
        soldier: "<Route path='/x' element={<X />} /> — הגדרה של נתיב ל-component.",
        student: "Route component של react-router. מאפיינים: path, element, index, children.",
        junior: "Pattern matching: '/users/:id' תופס /users/5, /users/abc. exact match אוטומטי ב-v6.",
        professor: "Declarative route config. v6 introduced relative paths and nested routes.",
      },
      illustration: "🗺️ Route — מפה לקומפוננטה:\n\n  <Route path='/' element={<Home />} />\n  <Route path='/movies/:id' element={<Movie />} />",
      codeExample:
        "<Routes>\n" +
        "  <Route path='/' element={<Home />} />\n" +
        "  <Route path='/about' element={<About />} />\n" +
        "  <Route path='/movies/:id' element={<MovieDetail />} />\n" +
        "  <Route path='*' element={<NotFound />} />\n" +
        "</Routes>",
      codeExplanation: "Routes מכיל את כל ה-Routes. path='*' תופס כל שאר ה-URLs (404 page).",
    },

    // ─── 4. Path (difficulty 3) ───
    {
      conceptName: "Path",
      difficulty: 3,
      levels: {
        grandma: "Path = החלק של ה-URL אחרי הדומיין. ב-/about — ה-path הוא /about.",
        child: "ה-'מסלול' לדף.",
        soldier: "URL pathname. /, /about, /movies/42. ה-path הוא מה ש-Route בודק.",
        student: "ב-react-router, path יכול להכיל פרמטרים: /users/:id.",
        junior: "Routes nesting: /users/:id → User עם id=5.",
        professor: "Path is the pathname segment of a URL. Pattern syntax includes parameters.",
      },
      illustration: "📍 Path:\n\n  https://x.com/movies/42\n               ───── path ─────",
      codeExample:
        "<Route path='/' element={<Home />} />            // exact /\n" +
        "<Route path='/movies' element={<Movies />} />    // /movies\n" +
        "<Route path='/movies/:id' element={<Movie />} /> // /movies/42",
      codeExplanation: "path יכול להיות סטטי (/about) או דינמי עם פרמטר (:id).",
    },

    // ─── 5. BrowserRouter (difficulty 5) ───
    {
      conceptName: "BrowserRouter",
      difficulty: 5,
      levels: {
        grandma: "BrowserRouter = ה-router הסטנדרטי. עוטף את האפליקציה ומאפשר ניווט בלי refresh.",
        child: "תעטוף את כל ה-App ב-<BrowserRouter>.",
        soldier: "Provider של ה-router context. משתמש ב-HTML5 History API.",
        student: "פותח את ה-history API ושולט בו. שאר ה-components של react-router צורכים ממנו.",
        junior: "צריך רק BrowserRouter אחד באפליקציה — לרוב סביב <App /> ב-main.jsx.",
        professor: "Wraps the app and provides routing context via React Context.",
      },
      illustration: "🌳 BrowserRouter:\n\n  <BrowserRouter>\n    <App />\n  </BrowserRouter>",
      codeExample:
        "// main.jsx\n" +
        "import { BrowserRouter } from 'react-router-dom';\n\n" +
        "ReactDOM.createRoot(document.getElementById('root')).render(\n" +
        "  <BrowserRouter>\n" +
        "    <App />\n" +
        "  </BrowserRouter>\n" +
        ");",
      codeExplanation: "BrowserRouter עוטף את <App />. עכשיו כל קומפוננטה ב-App יכולה להשתמש ב-Link, Routes, useNavigate.",
    },

    // ─── 6. Routes (difficulty 5) ───
    {
      conceptName: "Routes",
      difficulty: 5,
      levels: {
        grandma: "Routes = הקופסה שמכילה את כל ההגדרות של 'איזה URL → איזה component'.",
        child: "אומרים ל-React: 'הנה רשימת המסלולים שלי'.",
        soldier: "Routes (v6) = container ל-Route. מחליף את Switch של v5.",
        student: "Routes מבצע exact match אוטומטית. תמיד מציג רק route אחד מתאים בכל פעם.",
        junior: "אפשר nested Routes: /users/5 → ה-nested מופעל.",
        professor: "Routes is a routing decision tree. Exact match by default; supports nested routes.",
      },
      illustration: "📋 Routes:\n\n  <Routes>\n    <Route path='/' element={<Home />} />\n    <Route path='/x' element={<X />} />\n  </Routes>",
      codeExample:
        "<Routes>\n" +
        "  <Route path='/' element={<Home />} />\n" +
        "  <Route path='/about' element={<About />} />\n" +
        "  <Route path='/login' element={<Login />} />\n" +
        "</Routes>",
      codeExplanation: "Routes בודק את ה-URL הנוכחי, ומציג רק את ה-Route המתאים.",
    },

    // ─── 7. element (difficulty 4) ───
    {
      conceptName: "element",
      difficulty: 4,
      levels: {
        grandma: "element = ה-prop שמקבל את הקומפוננטה להציג.",
        child: "אומר ל-Route: 'תציג את <Home />'.",
        soldier: "ב-Route, element={<Component />} מקבל JSX (לא reference!).",
        student: "<Route element={<Comp />} /> — JSX expression. מאפשר להעביר props: element={<Comp foo='bar' />}.",
        junior: "ההבדל מ-v5: שם element={<Comp />} (JSX) לא component={Comp} (reference).",
        professor: "Route element prop accepts a JSX expression, allowing prop pre-binding.",
      },
      illustration: "🎭 element:\n\n  ✅ element={<Home />}\n  ❌ element={Home}     ← v5 syntax",
      codeExample:
        "<Route path='/' element={<Home />} />\n" +
        "<Route path='/admin' element={<Page title='Admin' />} />",
      codeExplanation: "element מקבל JSX. אפשר להעביר props ישירות.",
    },

    // ─── 8. Link (difficulty 4) ───
    {
      conceptName: "Link",
      difficulty: 4,
      levels: {
        grandma: "Link = הקישור של React Router. במקום <a>, משתמשים ב-<Link to='/about'>.",
        child: "<Link to='/about'>אודות</Link> — לחיצה מנווטת בלי refresh.",
        soldier: "מציג <a> ב-DOM, אבל מטפל ב-click כדי לעדכן history.",
        student: "Link.to = pathname. אפשר גם object: { pathname, search, hash }.",
        junior: "המלכודת: שימוש ב-<a href='/about'> במקום Link. גורם לרענון מלא ולאיבוד state.",
        professor: "Wraps an <a> tag, intercepting clicks to invoke history.push.",
      },
      illustration: "🔗 Link — בלי refresh:\n\n  <Link to='/about'>אודות</Link>",
      codeExample:
        "import { Link } from 'react-router-dom';\n\n" +
        "function Nav() {\n" +
        "  return (\n" +
        "    <nav>\n" +
        "      <Link to='/'>בית</Link>\n" +
        "      <Link to='/about'>אודות</Link>\n" +
        "      <Link to='/movies/42'>סרט 42</Link>\n" +
        "    </nav>\n" +
        "  );\n" +
        "}",
      codeExplanation: "Link יוצר <a> ב-DOM, אבל מעדכן history של הדפדפן ו-React Router מחליף component.",
    },

    // ─── 9. to (difficulty 3) ───
    {
      conceptName: "to",
      difficulty: 3,
      levels: {
        grandma: "to = ה-URL של ה-Link.",
        child: "ה-prop שאומר לאן ללכת.",
        soldier: "Link.to = string או object.",
        student: "Relative paths: to='movies'. Absolute: to='/movies'. State: to={{pathname, state}}.",
        junior: "useNavigate הוא ה-equivalent הפרוגרמטי של Link.",
        professor: "to prop accepts a Path representation.",
      },
      illustration: "📍 to:\n\n  <Link to='/movies/42'>צפה</Link>",
      codeExample:
        "<Link to='/'>בית</Link>\n" +
        "<Link to='/about'>אודות</Link>\n" +
        "<Link to={`/movies/${movie.id}`}>{movie.title}</Link>",
      codeExplanation: "to יכול להיות סטטי, דינמי עם template literal, או object עם state.",
    },

    // ─── 10. useNavigate (difficulty 6) ───
    {
      conceptName: "useNavigate",
      difficulty: 6,
      levels: {
        grandma: "useNavigate = פונקציה לניווט מתוך קוד.",
        child: "הקוד עצמו עובר לדף — אחרי שמירה, התחברות.",
        soldier: "const navigate = useNavigate(); navigate('/dashboard'). ניווט פרוגרמטי.",
        student: "Hook שמחזיר פונקציית navigate. תומכת ב: -1 (אחורה), '/path' (יעד), {state} (נתונים).",
        junior: "אחרי form submit: navigate('/success'). replace: true למניעת back-button.",
        professor: "Imperative navigation API. Programmatic counterpart to declarative Link.",
      },
      illustration: "🚀 useNavigate:\n\n  navigate('/dashboard');\n  navigate(-1);          // חזור אחורה",
      codeExample:
        "import { useNavigate } from 'react-router-dom';\n\n" +
        "function LoginForm() {\n" +
        "  const navigate = useNavigate();\n" +
        "  const handleSubmit = async () => {\n" +
        "    const ok = await login();\n" +
        "    if (ok) navigate('/dashboard');\n" +
        "  };\n" +
        "  return <button onClick={handleSubmit}>התחבר</button>;\n" +
        "}",
      codeExplanation: "useNavigate מחזיר פונקציה לניווט. אחרי login הצלחת — navigate מעביר ל-/dashboard.",
      extras: {
        moreExamples: [
          {
            code:
              "navigate('/x');                    // עבור ל-/x\n" +
              "navigate('/x', { replace: true }); // החלף, לא הוסף ל-history\n" +
              "navigate(-1);                      // חזור (Back button)\n" +
              "navigate('/x', { state: { id: 5 } }); // עם data",
            explanation: "ארבע צורות שכיחות. replace חשוב ב-redirect after login.",
          },
        ],
        pitfalls: [
          {
            mistake: "navigate בתוך render phase",
            why: "ניווט הוא side effect. ב-render — באג.",
            fix: "navigate בתוך useEffect או event handler.",
          },
        ],
        practiceQuestions: [
          { question: "איך מנווטים אחורה (Back button) בקוד?", answer: "navigate(-1)" },
        ],
      },
    },

    // ─── 11. dynamic route (difficulty 6) ───
    {
      conceptName: "dynamic route",
      difficulty: 6,
      levels: {
        grandma: "dynamic route = נתיב משתנה. /movies/1, /movies/2, /movies/abc — כולם אותו Route.",
        child: "במקום לכתוב Route לכל סרט — :id מקבל את הערך מה-URL.",
        soldier: "<Route path='/movies/:id' element={<Movie />} />. ה-:id placeholder.",
        student: "Route parameters: /:id. הערך זמין דרך useParams() — מחזיר { id: '...' }.",
        junior: "מהרשימה לפרט: Link to={`/movies/${m.id}`}. דפוס סטנדרטי.",
        professor: "Parameterized URL patterns. Parameters extracted via useParams; values are strings.",
      },
      illustration: "🔢 dynamic route:\n\n  /movies/1   → :id = '1'\n  /movies/42  → :id = '42'\n       ↓\n  useParams() → { id: '...' }",
      codeExample:
        "// הגדרה\n" +
        "<Route path='/movies/:id' element={<MovieDetail />} />\n\n" +
        "// MovieDetail.jsx\n" +
        "import { useParams } from 'react-router-dom';\n\n" +
        "function MovieDetail() {\n" +
        "  const { id } = useParams();\n" +
        "  return <h1>סרט מספר {id}</h1>;\n" +
        "}",
      codeExplanation: ":id ב-path הוא placeholder. useParams() מחזיר { id: '42' } אם ה-URL הוא /movies/42.",
      extras: {
        moreExamples: [
          {
            code:
              "// מספר parameters\n" +
              "<Route path='/users/:userId/posts/:postId' element={<Post />} />\n\n" +
              "const { userId, postId } = useParams();",
            explanation: "אפשר parameters מרובים. כל אחד הופך ל-key באובייקט.",
          },
          {
            code:
              "// ⚠️ הערך תמיד string\n" +
              "const { id } = useParams();\n" +
              "// id הוא '42' (string), לא 42 (number)\n" +
              "const idNum = parseInt(id, 10);",
            explanation: "useParams מחזיר strings. אם צריך number — parseInt.",
          },
        ],
        pitfalls: [
          {
            mistake: "ציפייה ש-id יהיה number",
            why: "URL הוא string. parameter תמיד string.",
            fix: "המר ידנית: const id = Number(useParams().id);",
          },
        ],
        practiceQuestions: [
          {
            question: "איך מגדירים Route ל-/users/:id?",
            answer: "<Route path='/users/:id' element={<User />} /> + const { id } = useParams();",
          },
        ],
      },
    },

    // ─── 12. useParams (difficulty 5) ───
    {
      conceptName: "useParams",
      difficulty: 5,
      levels: {
        grandma: "useParams = פונקציה ששולפת את ה-:id מה-URL.",
        child: "מאפשר לקומפוננטה לדעת איזה id היא צריכה להציג.",
        soldier: "const { id } = useParams(). מחזיר אובייקט עם כל ה-params.",
        student: "Hook שצורך מה-router context. הערכים strings.",
        junior: "fetch לפי id: useEffect עם [id] — reload בעת שינוי URL.",
        professor: "URL parameter accessor hook. Returns string-typed params.",
      },
      illustration: "🔑 useParams:\n\n  Route: /movies/:id\n  URL: /movies/42\n  useParams() → { id: '42' }",
      codeExample:
        "function MovieDetail() {\n" +
        "  const { id } = useParams();\n" +
        "  const [movie, setMovie] = useState(null);\n" +
        "  useEffect(() => {\n" +
        "    fetch(`/api/movies/${id}`).then(r => r.json()).then(setMovie);\n" +
        "  }, [id]);\n" +
        "  return movie ? <h1>{movie.title}</h1> : <p>טוען...</p>;\n" +
        "}",
      codeExplanation: "useParams נותן את id מה-URL. useEffect עם [id] — בעת שינוי URL, ה-fetch חוזר עם id חדש.",
    },

    // ─── 13. Context API (difficulty 7) ───
    {
      conceptName: "Context API",
      difficulty: 7,
      levels: {
        grandma:
          "Context = ערוץ נתונים גלובלי. במקום להעביר נתון מקומפוננטה לקומפוננטה — שמים אותו ב-Context וכל מי שצריך — ניגש.",
        child: "כמו רדיו — האב משדר, וכל הילדים שמכוונים לתדר — מקבלים. בלי לעבור פתק מאחד לשני.",
        soldier: "Context = state גלובלי לסניף עץ. createContext + Provider עוטף + useContext צורכים.",
        student: "createContext, Provider עוטף את ה-tree, useContext בקומפוננטות שצריכות. שינוי = re-render לכל הצרכנים.",
        junior: "מתאים ל-theme, user, language. לא לכל state — re-renders. ל-data ספציפי — Redux/Zustand.",
        professor: "Context provides DI through React's tree. Triggers re-renders for all consumers on value change.",
      },
      illustration:
        "📡 Context — ערוץ גלובלי:\n\n" +
        "  Provider value={user}\n" +
        "       ↓ (כל ה-tree)\n" +
        "  Header  → useContext(UserContext)\n" +
        "  Profile → useContext(UserContext)",
      codeExample:
        "const UserContext = createContext(null);\n\n" +
        "function App() {\n" +
        "  const [user, setUser] = useState({ name: 'Tal' });\n" +
        "  return (\n" +
        "    <UserContext.Provider value={user}>\n" +
        "      <Header />\n" +
        "      <Profile />\n" +
        "    </UserContext.Provider>\n" +
        "  );\n" +
        "}\n\n" +
        "function Profile() {\n" +
        "  const user = useContext(UserContext);\n" +
        "  return <h1>שלום {user.name}</h1>;\n" +
        "}",
      codeExplanation:
        "createContext יוצר ערוץ. Provider מוסר ערך לכל הצאצאים. useContext בכל קומפוננטה — שולפים את הערך בלי props.",
      extras: {
        moreExamples: [
          {
            code:
              "// Context עם state + setter\n" +
              "const ThemeContext = createContext(null);\n\n" +
              "function App() {\n" +
              "  const [theme, setTheme] = useState('light');\n" +
              "  return (\n" +
              "    <ThemeContext.Provider value={{ theme, setTheme }}>\n" +
              "      <Layout />\n" +
              "    </ThemeContext.Provider>\n" +
              "  );\n" +
              "}\n\n" +
              "function ToggleBtn() {\n" +
              "  const { theme, setTheme } = useContext(ThemeContext);\n" +
              "  return <button onClick={() => setTheme(t => t==='light'?'dark':'light')}>{theme}</button>;\n" +
              "}",
            explanation: "Provider value יכול להכיל state + setter. דפוס נפוץ ל-theme/auth.",
          },
        ],
        pitfalls: [
          {
            mistake: "Provider value = object literal — re-render בכל פעם",
            why: "value={{theme, setTheme}} יוצר אובייקט חדש בכל render → useContext consumers חוזרים.",
            fix: "useMemo: const value = useMemo(() => ({theme, setTheme}), [theme]);",
          },
          {
            mistake: "Context לכל מצב",
            why: "כל שינוי ב-context = re-render לכל הצרכנים. עומס.",
            fix: "Context ל-data גלובלי בלבד. state מקומי = useState/Redux/Zustand.",
          },
        ],
        practiceQuestions: [
          {
            question: "מה הצעדים ל-Context?",
            answer: "1) createContext. 2) <Provider value={...}> עוטף. 3) useContext(C) בצרכנים.",
          },
        ],
      },
    },

    // ─── 14. createContext (difficulty 5) ───
    {
      conceptName: "createContext",
      difficulty: 5,
      levels: {
        grandma: "createContext = יצירת ערוץ חדש.",
        child: "פעם אחת בקובץ: const MyContext = createContext().",
        soldier: "const MyContext = createContext(defaultValue). מחזיר אובייקט עם Provider ו-Consumer.",
        student: "createContext מחזיר { Provider, Consumer }. עם hooks — useContext מחליף את Consumer.",
        junior: "Pattern: קובץ ייעודי (UserContext.jsx) שמייצא context + provider + custom hook.",
        professor: "Factory function creating a Context object with Provider/Consumer pair.",
      },
      illustration: "🏗️ createContext:\n\n  const C = createContext(null);\n  // C.Provider — לעטיפה\n  // useContext(C) — לקריאה",
      codeExample:
        "// UserContext.jsx\n" +
        "import { createContext, useContext, useState } from 'react';\n\n" +
        "const UserContext = createContext(null);\n\n" +
        "export function UserProvider({ children }) {\n" +
        "  const [user, setUser] = useState(null);\n" +
        "  return (\n" +
        "    <UserContext.Provider value={{ user, setUser }}>\n" +
        "      {children}\n" +
        "    </UserContext.Provider>\n" +
        "  );\n" +
        "}\n\n" +
        "export const useUser = () => useContext(UserContext);",
      codeExplanation: "Pattern: קובץ אחד מכיל את הכל. UserProvider עטיפה. useUser hook נוח.",
    },

    // ─── 15. Provider (difficulty 6) ───
    {
      conceptName: "Provider",
      difficulty: 6,
      levels: {
        grandma: "Provider = משדר. עוטף את העץ ומספק ערך לכל הצאצאים.",
        child: "<Provider value={X}> — אומר 'כל מי שבתוכי, יכול לקבל את X'.",
        soldier: "<Context.Provider value={...}> עוטף קומפוננטות. הצאצאים — useContext.",
        student: "value יכול להיות object, function, primitive. שינוי → re-render לכל הצרכנים.",
        junior: "המלכודת: value={{a, b}} בכל render = object חדש = re-render מיותר.",
        professor: "Provider injects value into the context. Reference equality on value triggers re-renders.",
      },
      illustration:
        "📡 Provider:\n\n" +
        "  <UserContext.Provider value={user}>\n" +
        "    <App />\n" +
        "  </UserContext.Provider>",
      codeExample:
        "function App() {\n" +
        "  const [user, setUser] = useState(null);\n" +
        "  const value = useMemo(() => ({ user, setUser }), [user]);\n" +
        "  return (\n" +
        "    <UserContext.Provider value={value}>\n" +
        "      <Header />\n" +
        "      <MainContent />\n" +
        "    </UserContext.Provider>\n" +
        "  );\n" +
        "}",
      codeExplanation: "Provider עוטף את ה-children. useMemo על ה-value — חשוב למניעת re-renders.",
      extras: {
        moreExamples: [
          {
            code:
              "// ❌ object חדש בכל render\n" +
              "<Context.Provider value={{ user, setUser }}>\n\n" +
              "// ✅ useMemo\n" +
              "const value = useMemo(() => ({ user, setUser }), [user]);\n" +
              "<Context.Provider value={value}>",
            explanation: "object literal → הפניה חדשה כל render → כל הצרכנים מתרעננים.",
          },
        ],
        pitfalls: [
          {
            mistake: "object literal ב-value בלי useMemo",
            why: "כל הצרכנים מתרעננים בכל render — אפילו אם הערכים זהים.",
            fix: "useMemo עם deps נכונים.",
          },
        ],
        practiceQuestions: [
          {
            question: "למה צריך useMemo על Provider value?",
            answer: "object literal יוצר הפניה חדשה כל render → consumers מתרעננים מיותר.",
          },
        ],
      },
    },

    // ─── 16. value (difficulty 4) ───
    {
      conceptName: "value",
      difficulty: 4,
      levels: {
        grandma: "value = ה-prop ב-Provider. ה-data שמועבר.",
        child: "<Provider value={user}> — user הוא ה-value.",
        soldier: "Provider.value = הערך שיוחזר מ-useContext.",
        student: "value הוא single source of truth. שינוי = trigger re-render.",
        junior: "שכיח: value={{ data, setData, ...actions }}.",
        professor: "Provider value defines the context's payload.",
      },
      illustration: "📦 value:\n\n  <Provider value={...}>\n                ↓\n  useContext() מחזיר את הזה",
      codeExample:
        "<Context.Provider value='hello'>           // string\n" +
        "<Context.Provider value={42}>              // number\n" +
        "<Context.Provider value={user}>           // object\n" +
        "<Context.Provider value={{ a, b, c }}>   // multiple",
      codeExplanation: "value הוא כל data. בצרכנים — useContext(Context) מחזיר אותו.",
    },

    // ─── 17. useContext (difficulty 5) ───
    {
      conceptName: "useContext",
      difficulty: 5,
      levels: {
        grandma: "useContext = פונקציה לקבלת הערך מ-Provider.",
        child: "const x = useContext(C). מקבלים את ה-value.",
        soldier: "const value = useContext(MyContext). מחזיר ערך מ-Provider הקרוב ביותר.",
        student: "Hook לקבלת context value. Subscribes לשינויים.",
        junior: "המלכודת: useContext מחוץ ל-Provider — מחזיר defaultValue.",
        professor: "Hook to consume a context's current value.",
      },
      illustration:
        "🎧 useContext:\n\n" +
        "  function Profile() {\n" +
        "    const user = useContext(UserContext);\n" +
        "    return <h1>{user.name}</h1>;\n" +
        "  }",
      codeExample:
        "import { useContext } from 'react';\n" +
        "import { UserContext } from './UserContext';\n\n" +
        "function Profile() {\n" +
        "  const { user, setUser } = useContext(UserContext);\n" +
        "  if (!user) return <Login />;\n" +
        "  return (\n" +
        "    <div>\n" +
        "      <h1>שלום {user.name}</h1>\n" +
        "      <button onClick={() => setUser(null)}>התנתק</button>\n" +
        "    </div>\n" +
        "  );\n" +
        "}",
      codeExplanation: "useContext שולף את ה-{user, setUser}. בכל שינוי — הקומפוננטה מתרעננת.",
    },

    // ─── 18. Prop Drilling (difficulty 6) ───
    {
      conceptName: "Prop Drilling",
      difficulty: 6,
      levels: {
        grandma: "Prop Drilling = להעביר prop דרך הרבה רמות. סבא לאבא לבן לנכד.",
        child: "כשצריך להעביר נתון 5 קומפוננטות מטה — מסורבל. Context פותר.",
        soldier: "Anti-pattern. props עוברים דרך קומפוננטות שלא משתמשות. נפתר עם Context.",
        student: "Prop drilling סימן ש-state ברמה לא נכונה. אופציות: Lift state, Context, composition.",
        junior: "החוק: 1-2 רמות OK. 3+ = Context.",
        professor: "Indicates poor data flow. Solutions: state lifting, context, composition.",
      },
      illustration:
        "🕳️ Prop Drilling:\n\n" +
        "  App (יש user)\n" +
        "    └─ Header (לא משתמש)\n" +
        "        └─ Nav (לא משתמש)\n" +
        "            └─ UserBadge (משתמש!)",
      codeExample:
        "// ❌ Prop drilling\n" +
        "<App>           {/* user state */}\n" +
        "  <Layout user={user}>\n" +
        "    <Sidebar user={user}>\n" +
        "      <UserMenu user={user}>     {/* רק כאן משתמשים */}\n\n" +
        "// ✅ Context\n" +
        "<UserProvider>\n" +
        "  <Layout>\n" +
        "    <Sidebar>\n" +
        "      <UserMenu />              {/* useContext */}",
      codeExplanation: "ב-prop drilling, כל קומפוננטה מקבלת user רק כדי להעביר. עם Context — UserMenu שולף ישירות.",
      extras: {
        moreExamples: [
          {
            code:
              "// פתרון אחר: composition\n" +
              "<Layout>\n" +
              "  <UserMenu user={user} />  {/* App מעביר ישירות */}\n" +
              "</Layout>\n\n" +
              "function Layout({ children }) {\n" +
              "  return <div>{children}</div>;\n" +
              "}",
            explanation: "Layout מקבל children. App מציב את UserMenu עם user ישירות. אלגנטי.",
          },
        ],
        pitfalls: [
          {
            mistake: "Context לכל data שעובר 2 רמות",
            why: "Context overhead. למקרים פשוטים — props עדיף.",
            fix: "כלל אצבע: 3+ רמות או 5+ צרכנים = Context.",
          },
        ],
        practiceQuestions: [
          {
            question: "מתי כדאי לעבור מ-props ל-Context?",
            answer: "3+ רמות, או הרבה קומפוננטות צרכניות (theme, user, language).",
          },
        ],
      },
    },

    // ─── 19. MainScreen (difficulty 4) ───
    {
      conceptName: "MainScreen",
      difficulty: 4,
      levels: {
        grandma: "MainScreen = המסך הראשי. בפרויקט — מציג את הפוסטים.",
        child: "הקומפוננטה הגדולה שכוללת הכל.",
        soldier: "Container component. בד\"כ מחזיק state.",
        student: "Pattern: container עוטף children קטנים. כל child עצמאי.",
        junior: "טוב לשמור על containers דקים — בעיקר state ו-orchestration.",
        professor: "Container/presentational separation pattern.",
      },
      illustration: "🖼️ MainScreen:\n\n  MainScreen (state)\n    ├─ AddPost\n    ├─ PostList\n    └─ Footer",
      codeExample:
        "function MainScreen() {\n" +
        "  const [posts, setPosts] = useState([]);\n" +
        "  const addPost = (text) =>\n" +
        "    setPosts(prev => [...prev, { id: Date.now(), text }]);\n" +
        "  const deletePost = (id) =>\n" +
        "    setPosts(prev => prev.filter(p => p.id !== id));\n" +
        "  return (\n" +
        "    <div>\n" +
        "      <h1>הפוסטים שלי</h1>\n" +
        "      <AddPost onAdd={addPost} />\n" +
        "      <PostList posts={posts} onDelete={deletePost} />\n" +
        "    </div>\n" +
        "  );\n" +
        "}",
      codeExplanation: "MainScreen מחזיק state + actions. AddPost ו-PostList — children מטופלים.",
    },

    // ─── 20. AddPost (difficulty 4) ───
    {
      conceptName: "AddPost",
      difficulty: 4,
      levels: {
        grandma: "AddPost = קומפוננטה להוספת פוסט. שדה + כפתור.",
        child: "כותבים, ולוחצים — ופוסט חדש מתווסף.",
        soldier: "Form component עם input + button. ב-onClick: validation + onAdd callback.",
        student: "מקבל onAdd כ-prop, שולט מקומית ב-input state. אחרי הוספה — מאפס.",
        junior: "Pattern: useState ל-input + onChange + validation + ניקוי.",
        professor: "Controlled form with local state and callback prop.",
      },
      illustration:
        "📝 AddPost:\n\n" +
        "  ┌─────────────────────┐\n" +
        "  │ [text input]  [+]   │\n" +
        "  └─────────────────────┘",
      codeExample:
        "function AddPost({ onAdd }) {\n" +
        "  const [text, setText] = useState('');\n" +
        "  const submit = () => {\n" +
        "    if (!text.trim()) return;\n" +
        "    onAdd(text);\n" +
        "    setText('');\n" +
        "  };\n" +
        "  return (\n" +
        "    <div className='flex gap-2'>\n" +
        "      <input value={text} onChange={e => setText(e.target.value)} />\n" +
        "      <button onClick={submit}>הוסף</button>\n" +
        "    </div>\n" +
        "  );\n" +
        "}",
      codeExplanation: "input controlled. בלחיצה — בדיקה, onAdd, איפוס. ה-parent מטפל בהוספה.",
    },

    // ─── 21. PostList (difficulty 4) ───
    {
      conceptName: "PostList",
      difficulty: 4,
      levels: {
        grandma: "PostList = מציג את כל הפוסטים. מקבל רשימה — מציג.",
        child: "כל פוסט = שורה.",
        soldier: ".map ליצירת PostItem לכל פוסט. onDelete callback.",
        student: "Stateless presentational. כל פעולה דרך callback.",
        junior: "key prop חיוני. key={post.id}. בלי id יציב, React מתבלבל.",
        professor: "Pure render of props. Stable keys for reconciliation.",
      },
      illustration: "📋 PostList:\n\n  posts.map(p =>\n    <PostItem key={p.id} {...p} onDelete={onDelete} />\n  )",
      codeExample:
        "function PostList({ posts, onDelete }) {\n" +
        "  if (posts.length === 0) {\n" +
        "    return <p>אין פוסטים. הוסף אחד!</p>;\n" +
        "  }\n" +
        "  return (\n" +
        "    <ul>\n" +
        "      {posts.map(post => (\n" +
        "        <li key={post.id}>\n" +
        "          {post.text}\n" +
        "          <button onClick={() => onDelete(post.id)}>🗑</button>\n" +
        "        </li>\n" +
        "      ))}\n" +
        "    </ul>\n" +
        "  );\n" +
        "}",
      codeExplanation: "אם ריק — מסר. אחרת — map עם key. כל li עם כפתור מחיקה.",
    },

    // ─── 22. PostItem placeholder (just to keep 22) ───
    // already covered above with PostList
  ],

  quiz: [
    {
      question: "מה ההבדל בין <a href='/about'> ל-<Link to='/about'>?",
      options: [
        "אין הבדל",
        "<a> מבצע page reload (איטי). <Link> מעדכן URL בלי reload (מהיר, שומר state)",
        "<Link> רק לאתרים פנימיים",
        "<a> מהיר יותר",
      ],
      correct: 1,
      explanation: "Link הוא הפתרון של React Router — ניווט פנימי בלי refresh.",
    },
    {
      question: "איך מקבלים את ה-:id מ-URL כמו /movies/42?",
      options: [
        "useParams() — מחזיר { id: '42' }",
        "useState",
        "props.id",
        "window.location.id",
      ],
      correct: 0,
      explanation: "useParams hook של react-router שולף את ה-:placeholders. הערך תמיד string.",
    },
    {
      question: "מתי כדאי להשתמש ב-Context API?",
      options: [
        "תמיד, לכל state",
        "כש-data צריך לעבור דרך 3+ רמות, או הרבה קומפוננטות צריכות (theme, user, language)",
        "רק לרשימות",
        "רק ב-class components",
      ],
      correct: 1,
      explanation: "Context פותר prop drilling. אבל יש overhead. רק ל-data גלובלי שעובר עמוק.",
    },
    {
      question: "מה הבעיה ב-<Provider value={{ a, b }}>?",
      options: [
        "אין בעיה",
        "object literal יוצר הפניה חדשה כל render → כל הצרכנים מתרעננים מיותר. תיקון: useMemo",
        "צריך parentheses",
        "value צריך להיות string",
      ],
      correct: 1,
      explanation: "כל render — value חדש → consumers מתרעננים. useMemo נותן יציבות.",
    },
    {
      question: "מה navigate(-1) עושה?",
      options: [
        "מנווט ל-/-1",
        "חזרה אחורה (כמו Back button)",
        "מבטל ניווט",
        "שגיאה",
      ],
      correct: 1,
      explanation: "useNavigate מקבל מספר שלילי = חזרה ב-history.",
    },
    {
      question: "איך מגדירים route עם פרמטר id?",
      options: [
        "<Route path='/movies/{id}'>",
        "<Route path='/movies/:id' element={<Movie />} />",
        "<Route id='/movies'>",
        "<Route path='/movies?id'>",
      ],
      correct: 1,
      explanation: "ב-react-router הסינטקס הוא :param. ב-Movie: const { id } = useParams();",
    },
  ],
};
