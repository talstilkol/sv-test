// data/lesson21.js — שיעור 21: React בסיסי
// כל מושג כולל: difficulty (1-10), 6 רמות הסבר, codeExample, codeExplanation.
// מושגים קשים (difficulty >= 6) כוללים גם extras עם moreExamples, pitfalls, practiceQuestions.

var LESSON_21 = {
  id: "lesson_21",
  title: "שיעור 21 — React בסיסי",
  description:
    "מבוא ל-React: יצירת פרויקט עם Vite, מבנה הקבצים, קומפוננטות פונקציונליות, JSX, props, ועיבוד רשימות. הבסיס לכל אפליקציית React.",
  concepts: [
    // ─── 1. React (difficulty 3) ───
    {
      conceptName: "React",
      difficulty: 3,
      levels: {
        grandma:
          "React זה כמו ערכת לגו — נותנים לך חתיכות מוכנות (כפתורים, טפסים, רשימות) ואת מרכיבה אותן לאפליקציה.",
        child:
          "React זה הכלי שעוזר לבנות אתרים אינטראקטיביים — דפים שמשתנים בלחיצה, בלי לרענן.",
        soldier:
          "React היא ספרייה (library) של JavaScript לבניית UI. פותחה בפייסבוק (2013), בנויה סביב קומפוננטות.",
        student:
          "React מאפשרת לבנות UI דקלרטיבי באמצעות קומפוננטות — פונקציות שמחזירות JSX. ה-VDOM מתאם בין קוד למה שמופיע במסך.",
        junior:
          "React היא הסטנדרט בתעשייה לאפליקציות SPA. אקוסיסטם עשיר: React Router, Redux, Next.js, Tailwind.",
        professor:
          "React is a declarative, component-based UI library leveraging a virtual DOM and reconciliation algorithm to efficiently update the DOM in response to state changes.",
      },
      illustration:
        "⚛️ React = ערכת לבנים ל-UI:\n\n" +
        "  components → composition → application\n" +
        "  state → re-render → updated UI",
      codeExample:
        "import React from 'react';\n\n" +
        "function Hello() {\n" +
        "  return <h1>שלום, React!</h1>;\n" +
        "}\n\n" +
        "export default Hello;",
      codeExplanation:
        "קומפוננטה פשוטה שמחזירה JSX. בעת רינדור, React הופך את ה-JSX ל-DOM אמיתי במסך.",
    },

    // ─── 2. Client Side (difficulty 4) ───
    {
      conceptName: "Client Side",
      difficulty: 4,
      levels: {
        grandma:
          "Client Side = 'הצד של המשתמש'. הקוד רץ בדפדפן שלך, לא בשרת. כמו לבשל בבית במקום במסעדה.",
        child:
          "כשאת לוחצת על כפתור באתר וזה משנה משהו מיד — זה Client Side. בלי לחכות שהשרת ישלח דף חדש.",
        soldier:
          "Client Side Rendering (CSR) = הדפדפן מקבל JS ומריץ אותו ליצירת ה-UI. השרת רק מחזיר HTML ריק + bundle.js.",
        student:
          "ב-CSR, ה-rendering הראשון איטי (חיכוי ל-bundle), אבל interactions מהירים (אין rountrip). חלופות: SSR, SSG, Server Components.",
        junior:
          "React הוא CSR ברירת מחדל. ל-SEO ולמהירות initial load — Next.js עם SSR/SSG. לרוב מספיק CSR.",
        professor:
          "CSR shifts rendering responsibility to the browser; trade-offs include slower TTI but richer interactivity and offline capabilities.",
      },
      illustration:
        "🖥️ Client Side vs Server Side:\n\n" +
        "  Server Side: שרת מרכיב HTML מלא → דפדפן מציג\n" +
        "  Client Side: שרת שולח JS → דפדפן מריץ → UI נבנה",
      codeExample:
        "// index.html (אחרי build)\n" +
        "<div id='root'></div>\n" +
        "<script src='/bundle.js'></script>\n\n" +
        "// bundle.js מריץ את React, ממלא את ה-#root",
      codeExplanation:
        "השרת שולח HTML ריק עם מקום ל-React. ה-JS מתבצע בדפדפן ובונה את ה-UI דינמית. כל הלוגיקה רצה ב-client.",
    },

    // ─── 3. React Native (difficulty 3) ───
    {
      conceptName: "React Native",
      difficulty: 3,
      levels: {
        grandma:
          "React Native = React לאפליקציות נייד (אנדרואיד / iOS). אותם רעיונות, אבל המסך הוא טלפון.",
        child:
          "כמו React, אבל את בונה אפליקציה לטלפון (כמו אינסטגרם, פייסבוק).",
        soldier:
          "React Native = framework לבניית native apps עם React. לא משתמש ב-DOM אלא ב-native components (UIView, View).",
        student:
          "React Native מתרגם קוד React ל-native UI דרך bridge ל-iOS/Android. יתרון: codebase משותף לשתי המערכות.",
        junior:
          "Expo מקצר משמעותית את ה-setup. Performance טוב לרוב האפליקציות, אבל לאיזורים קריטיים — native code.",
        professor:
          "React Native uses a JavaScript-to-native bridge; rendering targets platform widgets rather than DOM, with shared component model.",
      },
      illustration: "📱 React Native — אותו רעיון, פלטפורמה אחרת:\n\n  React → DOM (web)\n  React Native → UIView/View (mobile)",
      codeExample:
        "import { View, Text } from 'react-native';\n\n" +
        "function App() {\n" +
        "  return (\n" +
        "    <View>\n" +
        "      <Text>שלום מהטלפון!</Text>\n" +
        "    </View>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "במקום <div>/<h1> משתמשים ב-View/Text מ-react-native. הסינטקס דומה, אבל הרכיבים הפיזיים שונים.",
    },

    // ─── 4. Vite (difficulty 3) ───
    {
      conceptName: "Vite",
      difficulty: 3,
      levels: {
        grandma:
          "Vite זה כלי שעוזר להתחיל פרויקט React מהר. כמו תבנית עוגה — מכין הכל מראש.",
        child:
          "Vite יוצר את כל הקבצים שצריך כדי להתחיל. אין צורך לכתוב הכל מאפס.",
        soldier:
          "Vite = build tool מהיר ל-frontend. תחליף ל-CRA (Create React App). dev server מהיר עם ESM, build מבוסס Rollup.",
        student:
          "Vite משתמש ב-native ES modules בפיתוח (אין bundling) → start time מיידי. ב-build משתמש ב-Rollup לאופטימיזציה.",
        junior:
          "Vite הפך לסטנדרט. CRA נטוש. HMR (Hot Module Replacement) ב-Vite מהיר במיוחד — שינויים נראים מיד.",
        professor:
          "Vite leverages native ESM during development to eliminate bundling overhead, switching to Rollup for production builds. Significant DX improvement over Webpack-based tooling.",
      },
      illustration: "⚡ Vite — מהיר במיוחד:\n\n  npm create vite@latest my-app\n  cd my-app\n  npm install\n  npm run dev  ← פתיחה מיידית בדפדפן",
      codeExample:
        "// package.json (נוצר אוטומטית)\n" +
        "{\n" +
        "  \"scripts\": {\n" +
        "    \"dev\": \"vite\",\n" +
        "    \"build\": \"vite build\",\n" +
        "    \"preview\": \"vite preview\"\n" +
        "  }\n" +
        "}",
      codeExplanation:
        "Vite מספק 3 פקודות: dev (פיתוח), build (production), preview (לבדוק build מקומי).",
    },

    // ─── 5. npm create vite@latest (difficulty 2) ───
    {
      conceptName: "npm create vite@latest",
      difficulty: 2,
      levels: {
        grandma:
          "פקודה שיוצרת פרויקט חדש מתבנית של Vite. כמו לבחור עיצוב באתר ויקיעור.",
        child:
          "פקודה אחת והתיקייה מלאה בקבצים מוכנים לעבודה.",
        soldier:
          "Scaffold command. שואל שם תבנית ושפה (React/Vue/Vanilla, JS/TS), מוריד תבנית מוכנה.",
        student:
          "create-vite (ישנה: npm init vite) יוצר פרויקט מתבנית. תומך ב-React, Vue, Svelte, Solid, ועוד.",
        junior:
          "ה-flag --template מאפשר לבחור ישירות (npm create vite@latest -- --template react). חוסך אינטראקציה.",
        professor:
          "Bootstrap CLI that downloads and applies project templates from the create-vite registry.",
      },
      illustration: "📦 הקמה ב-3 שלבים:\n\n  1. npm create vite@latest my-app\n  2. cd my-app\n  3. npm install && npm run dev",
      codeExample:
        "$ npm create vite@latest my-react-app\n" +
        "✔ Select a framework: › React\n" +
        "✔ Select a variant: › JavaScript\n" +
        "$ cd my-react-app\n" +
        "$ npm install",
      codeExplanation:
        "אחרי הרצה, התיקייה תכיל את כל מה שצריך: package.json, src/, index.html, ועוד.",
    },

    // ─── 6. npm install (difficulty 2) ───
    {
      conceptName: "npm install",
      difficulty: 2,
      levels: {
        grandma:
          "פקודה שמורידה את כל הספריות שהפרויקט צריך. כמו להזמין את כל המצרכים לפני בישול.",
        child:
          "תיקיית node_modules נוצרת — מלאה בכל הספריות שהפרויקט תלוי בהן.",
        soldier:
          "npm install קורא את package.json ומוריד dependencies + devDependencies לתיקיית node_modules.",
        student:
          "Resolves the dependency tree, fetches packages from npm registry, populates node_modules. Updates package-lock.json with locked versions.",
        junior:
          "אם package-lock קיים, npm ci מהיר יותר ומתחייב לגרסאות בדיוק. שווה להשתמש ב-CI/CD.",
        professor:
          "npm install performs dependency resolution via deterministic algorithm; lock files capture the resolved tree for reproducibility.",
      },
      illustration: "📥 npm install — הזרימה:\n\n  package.json → npm registry → node_modules/",
      codeExample:
        "// בתוך תיקיית הפרויקט:\n" +
        "$ npm install\n" +
        "// או להוסיף חבילה ספציפית:\n" +
        "$ npm install react-router-dom\n" +
        "// dev only:\n" +
        "$ npm install --save-dev vitest",
      codeExplanation:
        "npm install מוריד את כל מה שמופיע ב-package.json. הוספת חבילה גם מעדכנת את הקובץ.",
    },

    // ─── 7. npm run dev (difficulty 2) ───
    {
      conceptName: "npm run dev",
      difficulty: 2,
      levels: {
        grandma:
          "פקודה שמפעילה את האתר במחשב שלך כדי שתוכלי לראות אותו ולעבוד עליו.",
        child:
          "אחרי הפקודה — נפתח אתר בדפדפן ב-localhost. כל שינוי בקוד מתעדכן מיד.",
        soldier:
          "מריץ את ה-script שכתוב ב-package.json תחת dev (בד\"כ vite). פותח dev server בפורט 5173 או דומה.",
        student:
          "Dev server עם HMR (Hot Module Replacement) — שינויים בקוד מתעדכנים בדפדפן בלי refresh מלא.",
        junior:
          "ה-port ניתן לכוונון: vite --port 3000. או דרך vite.config.js.",
        professor:
          "Starts a development server with module-level hot reload, source maps, and build-on-demand for ESM-native development.",
      },
      illustration: "🚀 dev server — חי:\n\n  $ npm run dev\n  → פתח את http://localhost:5173\n  → כל שינוי בקוד מתעדכן מיד",
      codeExample:
        "$ npm run dev\n" +
        "VITE v5.0.0  ready in 312 ms\n" +
        "➜  Local:   http://localhost:5173/\n" +
        "// ערוך src/App.jsx — תראה את השינוי מיד",
      codeExplanation:
        "ה-dev server כולל HMR. שינוי באמצע הקוד — הקומפוננטה מתעדכנת בדפדפן בלי לאבד state. חוויית פיתוח מצוינת.",
    },

    // ─── 8. index.html (difficulty 4) ───
    {
      conceptName: "index.html",
      difficulty: 4,
      levels: {
        grandma:
          "index.html זה הקובץ הראשי של האתר. הדפדפן פותח אותו ראשון.",
        child:
          "כמו השער של הבית — הדבר הראשון שרואים. ב-React, הוא ריק כמעט לגמרי, ו-React ממלא אותו.",
        soldier:
          "index.html ב-React הוא minimal — בעיקר <div id='root'></div> + script לקוד הראשי. React מטמיע את ה-UI ב-#root.",
        student:
          "ה-entry point של האפליקציה. ב-Vite יושב ברמת-root של הפרויקט (לא ב-public/). מותר להוסיף meta tags, favicon, fonts.",
        junior:
          "מקובל לשנות את <title>, להוסיף Open Graph meta tags ל-social sharing, ולקשר ל-fonts/CSS חיצוניים.",
        professor:
          "The HTML shell into which the React app mounts. Build tools inject the bundled JS via script tags during production.",
      },
      illustration: "🏠 index.html — שלד מינימלי:\n\n  <html>\n    <body>\n      <div id='root'></div>  ← React ימלא כאן\n      <script src='/main.jsx'></script>\n    </body>\n  </html>",
      codeExample:
        "<!doctype html>\n" +
        "<html lang=\"he\" dir=\"rtl\">\n" +
        "  <head>\n" +
        "    <meta charset=\"UTF-8\" />\n" +
        "    <title>האפליקציה שלי</title>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    <div id=\"root\"></div>\n" +
        "    <script type=\"module\" src=\"/src/main.jsx\"></script>\n" +
        "  </body>\n" +
        "</html>",
      codeExplanation:
        "<div id='root'> הוא היעד ש-React ימלא. ה-script טוען את main.jsx — נקודת הכניסה ל-React.",
    },

    // ─── 9. main.jsx (difficulty 5) ───
    {
      conceptName: "main.jsx",
      difficulty: 5,
      levels: {
        grandma:
          "main.jsx זה ה'מנוע' של האפליקציה — הקובץ שמתחיל את הכל. מחבר את React ל-index.html.",
        child:
          "כמו הכפתור הגדול שמתחיל את המכונה. main.jsx מתחיל את כל ה-React.",
        soldier:
          "main.jsx (או main.tsx) הוא ה-entry — קורא ל-ReactDOM.createRoot ומרכיב את <App /> בתוך #root.",
        student:
          "Hookup point: createRoot מקבל DOM element ומחזיר root.render() להצבת ה-component tree. StrictMode עוטף לצורך בדיקה.",
        junior:
          "אם רוצים BrowserRouter / Provider של context — עוטפים את <App /> במאין-jsx, לפני השליחה ל-render.",
        professor:
          "Entry module that bootstraps the React tree via ReactDOM.createRoot, the React 18+ concurrent root API.",
      },
      illustration: "🎬 main.jsx — מתחיל את הסרט:\n\n  index.html → <script src='main.jsx'>\n                  ↓\n               main.jsx מצבע <App /> ב-#root",
      codeExample:
        "import React from 'react';\n" +
        "import ReactDOM from 'react-dom/client';\n" +
        "import App from './App.jsx';\n" +
        "import './index.css';\n\n" +
        "ReactDOM.createRoot(document.getElementById('root')).render(\n" +
        "  <React.StrictMode>\n" +
        "    <App />\n" +
        "  </React.StrictMode>\n" +
        ");",
      codeExplanation:
        "createRoot מבצע 'mount' — לוקח את <App /> ומציב אותו ב-#root של ה-HTML. StrictMode מפעיל בדיקות נוספות בפיתוח.",
    },

    // ─── 10. App.jsx (difficulty 4) ───
    {
      conceptName: "App.jsx",
      difficulty: 4,
      levels: {
        grandma:
          "App.jsx זה הקומפוננטה הראשית — הסלון של הבית. כל שאר הקומפוננטות יושבות בתוכה.",
        child:
          "App.jsx מכיל את כל מה שיופיע במסך — הוא העץ הראשי.",
        soldier:
          "App.jsx (או App.tsx) הוא ה-root component של האפליקציה. main.jsx מציב אותו ב-#root.",
        student:
          "Top-level component. בד\"כ מכיל Routes, Layout, Providers (Context, Theme, ReactQuery).",
        junior:
          "ככל שהאפליקציה גדלה, App.jsx הופך ל-'composition root' — מקום מרכזי ל-providers וניתוב, ולא לוגיקה.",
        professor:
          "Conventional root component aggregating providers and routes for the application's component graph.",
      },
      illustration: "🏛️ App.jsx — הקומפוננטה הראשית:\n\n  App\n  ├─ Header\n  ├─ Main\n  │   ├─ Sidebar\n  │   └─ Content\n  └─ Footer",
      codeExample:
        "import './App.css';\n" +
        "import Header from './Header.jsx';\n" +
        "import Footer from './Footer.jsx';\n\n" +
        "function App() {\n" +
        "  return (\n" +
        "    <div>\n" +
        "      <Header />\n" +
        "      <main>תוכן ראשי</main>\n" +
        "      <Footer />\n" +
        "    </div>\n" +
        "  );\n" +
        "}\n\n" +
        "export default App;",
      codeExplanation:
        "App מאחדת את הקומפוננטות הראשיות — Header, Main, Footer. main.jsx ייקח את App וירכיב אותה ב-#root.",
    },

    // ─── 11. App.css (difficulty 3) ───
    {
      conceptName: "App.css",
      difficulty: 3,
      levels: {
        grandma:
          "App.css זה הקובץ של העיצוב — צבעים, גופנים, גדלים. כמו הצבע על הקירות בבית.",
        child:
          "כל מה שגורם לאתר להיראות יפה נמצא ב-CSS. כתב נורמלי של אינטרנט.",
        soldier:
          "CSS file ייעודי לקומפוננטה App. נטען ב-import './App.css' מתוך App.jsx.",
        student:
          "CSS Modules או Tailwind הם חלופות מודרניות. App.css הוא scope גלובלי — הסלקטורים פעילים בכל האפליקציה.",
        junior:
          "ב-CSS גלובלי, conflicts בין קומפוננטות נפוצים. CSS Modules / Styled-components / Tailwind מציעים scoping.",
        professor:
          "Global stylesheet imported into the JS module graph; alternatives include CSS-in-JS, CSS Modules, or utility-first frameworks.",
      },
      illustration: "🎨 App.css — סגנון גלובלי:\n\n  App.jsx → import './App.css'\n         ↓\n  CSS חל על כל האפליקציה",
      codeExample:
        ".app {\n" +
        "  font-family: sans-serif;\n" +
        "  padding: 1rem;\n" +
        "}\n\n" +
        ".btn-primary {\n" +
        "  background: blue;\n" +
        "  color: white;\n" +
        "  border: none;\n" +
        "}",
      codeExplanation:
        "CSS רגיל. ה-classes זמינים בכל ה-JSX ב-className (לא class!).",
    },

    // ─── 12. Component (difficulty 6) ───
    {
      conceptName: "Component",
      difficulty: 6,
      levels: {
        grandma:
          "קומפוננטה היא 'חתיכה' של אפליקציה — כפתור, כרטיס, טופס. אפשר להשתמש בה שוב ושוב, כמו לבנת לגו.",
        child:
          "כל פיסה במסך — כפתור, תמונה, רשימה — היא קומפוננטה. בונים אפליקציה כשמרכיבים אותן.",
        soldier:
          "קומפוננטה ב-React היא פונקציה שמחזירה JSX. שמה חייב להתחיל באות גדולה (Counter, Header) — אחרת React לא מזהה.",
        student:
          "Functional component (FC) הוא הסטנדרט החדש. מקבל props כפרמטר, מחזיר JSX. יכול להחזיק state עם useState. מכווץ + reusable.",
        junior:
          "כללי הזהב: 1) שם באות גדולה. 2) פונקציה pure ככל האפשר. 3) קטן ומרוכז (Single Responsibility).",
        professor:
          "Components encapsulate UI logic and presentation. Function components leverage hooks for state and side-effects, replacing class-based lifecycle.",
      },
      illustration:
        "🧱 קומפוננטה — לבנה ב-UI:\n\n" +
        "  function Card({ title, body }) {\n" +
        "    return (\n" +
        "      <div className='card'>\n" +
        "        <h2>{title}</h2>\n" +
        "        <p>{body}</p>\n" +
        "      </div>\n" +
        "    );\n" +
        "  }",
      codeExample:
        "function Greeting({ name }) {\n" +
        "  return <h1>שלום, {name}!</h1>;\n" +
        "}\n\n" +
        "function App() {\n" +
        "  return (\n" +
        "    <>\n" +
        "      <Greeting name='Tal' />\n" +
        "      <Greeting name='Dana' />\n" +
        "      <Greeting name='Ron' />\n" +
        "    </>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "Greeting היא קומפוננטה reusable. App משתמש בה 3 פעמים עם props שונים — וכל אחת מציגה ברכה ייחודית.",
      extras: {
        moreExamples: [
          {
            code:
              "// ❌ שם באות קטנה — React לא מזהה כקומפוננטה!\n" +
              "function greeting() { return <h1>Hi</h1>; }\n" +
              "// React יחשוב ש-<greeting /> זה תג HTML\n\n" +
              "// ✅ שם באות גדולה\n" +
              "function Greeting() { return <h1>Hi</h1>; }",
            explanation:
              "ה-convention של React: שם באות גדולה = קומפוננטה. אות קטנה = HTML element. זה לא רק סגנון — זה פונקציונלי.",
          },
          {
            code:
              "// קומפוננטה עם children\n" +
              "function Card({ title, children }) {\n" +
              "  return (\n" +
              "    <div className='card'>\n" +
              "      <h2>{title}</h2>\n" +
              "      <div className='card-body'>{children}</div>\n" +
              "    </div>\n" +
              "  );\n" +
              "}\n\n" +
              "// שימוש:\n" +
              "<Card title='ברוכים הבאים'>\n" +
              "  <p>תוכן הכרטיס</p>\n" +
              "</Card>",
            explanation:
              "props.children מכיל כל מה שעטוף בין תגי הקומפוננטה. דפוס שימושי לקומפוננטות 'wrapper' כמו Card, Layout, Modal.",
          },
        ],
        pitfalls: [
          {
            mistake: "שם קומפוננטה באות קטנה",
            why: "React מתייחס לאות קטנה כתג HTML. <greeting /> ייצור element ריק לא תקני.",
            fix: "תמיד אות גדולה: function Greeting().",
          },
          {
            mistake: "רנדור קומפוננטה כפונקציה רגילה — Greeting() במקום <Greeting />",
            why: "Greeting() קוראת לפונקציה ידנית — מבטל את ניהול המחזור של React (state, hooks).",
            fix: "תמיד JSX: <Greeting />. כך React רושם את הקומפוננטה ב-tree.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "מה ההבדל בין <Hello /> לבין Hello()?",
            answer:
              "<Hello /> — React רושם את הקומפוננטה, ניהול state ו-hooks עובדים. Hello() — קריאה ישירה, ללא ניהול.",
          },
        ],
      },
    },

    // ─── 13. RFC (difficulty 6) ───
    {
      conceptName: "RFC",
      difficulty: 6,
      levels: {
        grandma:
          "RFC = React Function Component — קומפוננטה שהיא פונקציה. הצורה המודרנית והפשוטה.",
        child:
          "במקום class מסובכת, את כותבת פונקציה רגילה. הרבה יותר נקי.",
        soldier:
          "RFC = const Foo = () => { return <jsx /> } או function Foo() { return <jsx /> }. עם hooks (useState, useEffect) יש להן state ו-lifecycle.",
        student:
          "Functional components החליפו class components ב-React 16.8+. יתרונות: less boilerplate, קל יותר לבדוק, hooks API משותף.",
        junior:
          "כל הפרויקטים החדשים — RFC בלבד. class components נשארים רק בתחזוקת legacy.",
        professor:
          "Function components paired with hooks superseded class components, simplifying the API and removing this binding pitfalls.",
      },
      illustration:
        "🔄 RFC — שני סגנונות:\n\n" +
        "  // function declaration\n" +
        "  function MyComp() { return <div /> }\n\n" +
        "  // arrow function\n" +
        "  const MyComp = () => <div />;",
      codeExample:
        "// סגנון 1: function declaration\n" +
        "function Counter() {\n" +
        "  const [count, setCount] = useState(0);\n" +
        "  return <button onClick={() => setCount(c => c+1)}>{count}</button>;\n" +
        "}\n\n" +
        "// סגנון 2: arrow function\n" +
        "const Counter = () => {\n" +
        "  const [count, setCount] = useState(0);\n" +
        "  return <button onClick={() => setCount(c => c+1)}>{count}</button>;\n" +
        "};",
      codeExplanation:
        "שני הסגנונות תקפים. function declaration נחשב 'קלאסי' יותר; arrow function קצר יותר. בחירה אישית או של הצוות.",
      extras: {
        moreExamples: [
          {
            code:
              "// class component (legacy — לא לכתוב חדש כך!)\n" +
              "class Counter extends React.Component {\n" +
              "  constructor(props) {\n" +
              "    super(props);\n" +
              "    this.state = { count: 0 };\n" +
              "    this.handleClick = this.handleClick.bind(this);\n" +
              "  }\n" +
              "  handleClick() {\n" +
              "    this.setState({ count: this.state.count + 1 });\n" +
              "  }\n" +
              "  render() {\n" +
              "    return <button onClick={this.handleClick}>{this.state.count}</button>;\n" +
              "  }\n" +
              "}",
            explanation:
              "class component מסורבל: constructor, this.state, this binding, render method. ה-RFC עם useState עושה אותו דבר ב-3 שורות.",
          },
        ],
        pitfalls: [
          {
            mistake: "שימוש ב-this בקומפוננטה פונקציונלית",
            why: "RFC לא משתמשת ב-this. אין constructor, אין this.state.",
            fix: "useState ל-state, useEffect ל-lifecycle, פונקציות מקומיות במקום methods.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "מה ההבדל המרכזי בין class component ל-function component?",
            answer:
              "Class: מבוסס class עם this, constructor, lifecycle methods. Function: פונקציה עם hooks (useState, useEffect). RFC הוא הסטנדרט החדש.",
          },
        ],
      },
    },

    // ─── 14. JSX (difficulty 7) ───
    {
      conceptName: "JSX",
      difficulty: 7,
      levels: {
        grandma:
          "JSX זה תחביר שמערבב HTML עם JavaScript. כותבים <div>שלום</div> בתוך קוד JS — זה עובד.",
        child:
          "במקום לכתוב 'תיצור div', כותבים ישר <div> כמו ב-HTML. הקוד הופך נקי ויפה.",
        soldier:
          "JSX = JavaScript XML. מתורגם ל-React.createElement('div', props, children) ע\"י Babel. אפשר לערבב {expression} בתוך ה-JSX.",
        student:
          "JSX לא חוקי ב-JS רגיל — חייב transpiler (Babel, swc). מאפשר composition declarative וקריא. לכל element יש סוג (string לתגי HTML, function לקומפוננטות).",
        junior:
          "כללי המפתח: רק element אחד ברמה עליונה (השתמש ב-Fragment <>). className במקום class. {} לביטויי JS.",
        professor:
          "JSX is syntactic sugar over React.createElement; the JSX transformer (or modern automatic runtime) emits createElement calls. Treated as expressions, not statements.",
      },
      illustration:
        "📝 JSX — מערבב HTML ו-JS:\n\n" +
        "  const name = 'Tal';\n" +
        "  const el = (\n" +
        "    <div className='hello'>\n" +
        "      <h1>שלום, {name}!</h1>\n" +
        "      <p>{1 + 1}</p>  ← מציג 2\n" +
        "    </div>\n" +
        "  );",
      codeExample:
        "function App() {\n" +
        "  const user = { name: 'Tal', age: 30 };\n" +
        "  const isAdult = user.age >= 18;\n" +
        "  return (\n" +
        "    <div>\n" +
        "      <h1>שלום, {user.name}!</h1>\n" +
        "      <p>גיל: {user.age}</p>\n" +
        "      {isAdult && <p>בוגר ✓</p>}\n" +
        "      <button onClick={() => alert('Hi')}>לחץ</button>\n" +
        "    </div>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "JSX מערבב HTML, ביטויי JS ב-{}, מפעילי בוליאני (&&) ל-conditional rendering, ופונקציות ב-event handlers.",
      extras: {
        moreExamples: [
          {
            code:
              "// JSX → createElement (אחרי Babel)\n" +
              "// JSX:\n" +
              "<h1 className='title'>שלום</h1>\n\n" +
              "// React.createElement (קוד אמיתי שרץ):\n" +
              "React.createElement('h1', { className: 'title' }, 'שלום');",
            explanation:
              "Babel הופך כל תג JSX לקריאת createElement. זה הקוד שבאמת רץ. הבנת זה עוזרת להבין למה {} עובד ולמה תכונות הן 'props'.",
          },
          {
            code:
              "// ❌ שני elements ברמה עליונה\n" +
              "function App() {\n" +
              "  return (\n" +
              "    <h1>כותרת</h1>\n" +
              "    <p>פסקה</p>\n" +
              "  );\n" +
              "}\n" +
              "// שגיאה: Adjacent JSX elements must be wrapped\n\n" +
              "// ✅ פתרון 1: עטיפה ב-div\n" +
              "return (<div><h1>...</h1><p>...</p></div>);\n\n" +
              "// ✅ פתרון 2: Fragment\n" +
              "return (<><h1>...</h1><p>...</p></>);",
            explanation:
              "JSX חייב element root יחיד. Fragment (<>) הוא 'אריזה ללא תג' — מאפשר להחזיר מספר elements בלי div מיותר.",
          },
          {
            code:
              "// תכונות מיוחדות\n" +
              "<div\n" +
              "  className='card'      // לא 'class'!\n" +
              "  htmlFor='input'        // לא 'for'!\n" +
              "  tabIndex={0}           // camelCase\n" +
              "  data-test='ok'         // data-* נשאר כמו ב-HTML\n" +
              "  style={{color: 'red'}} // אובייקט, לא string\n" +
              ">",
            explanation:
              "רוב התכונות הן camelCase (tabIndex, onClick). class → className כי class שמורה ב-JS. for → htmlFor. style מקבל אובייקט.",
          },
        ],
        pitfalls: [
          {
            mistake: "class= במקום className=",
            why: "class היא מילה שמורה ב-JS — אסור לתת לתכונה את אותו שם.",
            fix: "תמיד className. ה-IDE יתריע.",
          },
          {
            mistake: "מספר elements ברמה עליונה בלי wrapper",
            why: "JSX = expression יחיד. חייב root element אחד.",
            fix: "עטוף ב-<>...</> (Fragment) או ב-<div>.",
          },
          {
            mistake: "סוגריים מסביב ל-multi-line JSX חסרים",
            why: "JS automatic semicolon insertion יכול להוסיף ; אחרי return, ולשבור את ה-JSX.",
            fix: "תמיד עטוף JSX רב-שורתי בסוגריים: return ( <div>...</div> );",
          },
        ],
        practiceQuestions: [
          {
            question:
              "למה משתמשים ב-className במקום class?",
            answer:
              "class היא מילה שמורה ב-JavaScript (להגדרת מחלקה). React משתמש ב-className כתחליף.",
          },
          {
            question:
              "מה ההבדל בין <></> לבין <div></div>?",
            answer:
              "Fragment (<></>) לא מוסיף element ל-DOM — רק 'עוטף' אבסטרקטית. <div> מוסיף element אמיתי. Fragment שימושי כשרוצים להחזיר רשימה בלי div מיותר.",
          },
          {
            question:
              "מה הפלט של JSX אחרי Babel transformation?",
            answer:
              "קריאות ל-React.createElement(type, props, ...children). זה הקוד שבאמת רץ ב-runtime.",
          },
        ],
      },
    },

    // ─── 15. className (difficulty 4) ───
    {
      conceptName: "className",
      difficulty: 4,
      levels: {
        grandma:
          "className זה כמו class ב-HTML — שם של עיצוב שמחילים על element. ב-React כותבים className במקום class.",
        child:
          "כדי לקבוע איך משהו ייראה, מסמנים אותו עם className='red-button'.",
        soldier:
          "className = שם class CSS על element JSX. שווה ל-class ב-HTML, אבל class שמורה ב-JS — לכן className.",
        student:
          "ניתן לחבר מספר classes: className='btn primary'. או דינמי: className={isActive ? 'btn active' : 'btn'}. ספריות כמו clsx מקלות.",
        junior:
          "ב-Tailwind: className='px-4 py-2 bg-blue-500 text-white'. מספר classes כברירת מחדל. clsx/classnames לתנאים.",
        professor:
          "className maps to the DOM class attribute; React uses 'className' to avoid conflict with the JS reserved 'class' keyword.",
      },
      illustration: "🎨 className — חיבור class ב-JSX:\n\n  <div className='card'>...</div>\n  <button className={isOn ? 'on' : 'off'}>",
      codeExample:
        "function Button({ primary, children }) {\n" +
        "  const classes = primary ? 'btn btn-primary' : 'btn';\n" +
        "  return <button className={classes}>{children}</button>;\n" +
        "}",
      codeExplanation:
        "className מקבל string. אפשר ליצור אותו דינמית עם תנאי או template literals.",
    },

    // ─── 16. {} (difficulty 5) ───
    {
      conceptName: "{}",
      difficulty: 5,
      levels: {
        grandma:
          "סוגריים מסולסלים {} ב-JSX = 'הכנס כאן ביטוי JS'. <p>שלום, {name}</p> — name הוא ערך מתוך JS.",
        child:
          "הסוגריים פותחים 'חלון' בתוך ה-HTML שדרכו אפשר להכניס משתנים, חישובים, או פונקציות.",
        soldier:
          "ב-JSX, {} הוא expression slot. ניתן לשים שם משתנים, חישובים (1+1), קריאות לפונקציות, ביטויים בוליאניים, או JSX אחר.",
        student:
          "Only expressions, not statements. אסור: if/for/while/let. כן מותר: ternary (a ? b : c), &&, ||, פונקציות, מערכים.",
        junior:
          "טריקים: רנדור מותנה: {isLoggedIn && <Welcome />}. ברירת מחדל: {name || 'אורח'}. ערך כפול: {`${count} פריטים`}.",
        professor:
          "JSX expression containers accept any JS expression; rendered output depends on the expression's result type (string, number, JSX, array, falsy → ignored).",
      },
      illustration:
        "🪟 {} — חלון מ-JSX ל-JS:\n\n" +
        "  <p>שלום {name}</p>           ← משתנה\n" +
        "  <p>{1 + 2}</p>                 ← חישוב\n" +
        "  <p>{user.age >= 18 ? 'בוגר' : 'קטין'}</p>   ← ternary",
      codeExample:
        "function Profile() {\n" +
        "  const user = { name: 'Tal', age: 30 };\n" +
        "  const items = [1, 2, 3];\n" +
        "  return (\n" +
        "    <div>\n" +
        "      <h1>שלום, {user.name}</h1>\n" +
        "      <p>גיל × 2: {user.age * 2}</p>\n" +
        "      <p>{user.age >= 18 ? 'בוגר' : 'קטין'}</p>\n" +
        "      <ul>{items.map(n => <li key={n}>{n}</li>)}</ul>\n" +
        "    </div>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "{} מאפשר לערבב JS לתוך JSX: משתנים, חישובים, conditionals (ternary), ומערכים (.map). זה ה'דבק' בין הלוגיקה לתצוגה.",
    },

    // ─── 17. props (difficulty 4) ───
    {
      conceptName: "props",
      difficulty: 4,
      levels: {
        grandma:
          "props זה הנתונים שאמא שולחת לילד. ב-React, קומפוננטה אב נותנת לקומפוננטה בן ערכים שיציגו במסך.",
        child:
          "כשאת כותבת <Greeting name='Tal' />, props.name = 'Tal' מגיע לקומפוננטה Greeting. היא יכולה להשתמש בערך הזה.",
        soldier:
          "props = הפרמטרים של הקומפוננטה. קומפוננטה היא פונקציה: function Foo(props) { ... }. ה-attributes ב-JSX הופכים לשדות ב-props.",
        student:
          "props הם read-only — הילד לא יכול לשנות אותם. כדי 'לשנות' — צריך callback (פונקציה כ-prop) שמאפשר לבן לבקש שינוי מהאב.",
        junior:
          "Destructuring נפוץ: function Greeting({ name, age }). מאפשר default values: { name = 'אורח' }. וכל שאר ה-rest: { name, ...rest }.",
        professor:
          "Props are immutable inputs to a component, defining the unidirectional data flow. Mutation breaks reactivity guarantees.",
      },
      illustration:
        "📦 props — נתונים מאב לבן:\n\n" +
        "  // אבא:\n" +
        "  <Greeting name='Tal' age={30} />\n\n" +
        "  // בן:\n" +
        "  function Greeting({ name, age }) {\n" +
        "    return <h1>{name}, גילך {age}</h1>;\n" +
        "  }",
      codeExample:
        "function Card({ title, body, onClose }) {\n" +
        "  return (\n" +
        "    <div className='card'>\n" +
        "      <h2>{title}</h2>\n" +
        "      <p>{body}</p>\n" +
        "      <button onClick={onClose}>סגור</button>\n" +
        "    </div>\n" +
        "  );\n" +
        "}\n\n" +
        "<Card\n" +
        "  title='ברוכים הבאים'\n" +
        "  body='תודה שנכנסת'\n" +
        "  onClose={() => alert('סגור')}\n" +
        "/>",
      codeExplanation:
        "Card מקבלת 3 props: title, body, onClose. כל אחד עובר מהאב כ-attribute ב-JSX. הילד משתמש בהם להצגה ולתגובה לאירועים.",
    },

    // ─── 18. import (difficulty 4) ───
    {
      conceptName: "import",
      difficulty: 4,
      levels: {
        grandma:
          "import זה 'הבא לי את זה' — להביא קוד מקובץ אחר כדי להשתמש בו פה.",
        child:
          "כמו לבקש מהמורה את הספר. import מביא את הקוד שאת צריכה.",
        soldier:
          "import { X } from './file' — מביא ערכים שיוצאו ב-export. import X from './file' — מביא את ה-default export.",
        student:
          "ES Modules. ייבוא יכול להיות named ({ a, b }), default (X), או namespace (* as X). הנתיב יחסי (./) או חבילה (react).",
        junior:
          "טריק: import path mapping ב-tsconfig/vite.config: import X from '@/components' במקום '../../../components'. נקי יותר.",
        professor:
          "ES module imports establish a static module graph at build time, enabling tree-shaking and bundler optimizations.",
      },
      illustration:
        "📥 import — שלוש צורות:\n\n" +
        "  import X from 'pkg'           ← default\n" +
        "  import { a, b } from 'pkg'   ← named\n" +
        "  import * as P from 'pkg'      ← namespace",
      codeExample:
        "// מחבילה (npm):\n" +
        "import React from 'react';\n" +
        "import { useState, useEffect } from 'react';\n\n" +
        "// מקובץ פנימי (.js/.jsx):\n" +
        "import App from './App.jsx';\n" +
        "import { Header, Footer } from './components';\n\n" +
        "// CSS:\n" +
        "import './App.css';",
      codeExplanation:
        "import מקובץ יחסי (./App.jsx) או מחבילה (react). default import — שם חופשי. named import — חייב להתאים לשם המיוצא.",
    },

    // ─── 19. export default (difficulty 4) ───
    {
      conceptName: "export default",
      difficulty: 4,
      levels: {
        grandma:
          "export default = 'תן לאחרים להשתמש בזה'. מסמן את הדבר העיקרי שהקובץ הזה מייצא.",
        child:
          "אם import הוא 'הבא לי' — export default הוא 'הנה תיקח'.",
        soldier:
          "export default <X> מייצא ערך אחד 'ראשי' מהקובץ. בייבוא: import X from './file' — השם חופשי.",
        student:
          "כל קובץ יכול להיות לו default יחיד + ל-named exports נוספים. default נוח לקומפוננטה ראשית; named ל-utilities.",
        junior:
          "סגנון של רוב הקבצים: default export לקומפוננטה הראשית. אם קומפוננטה מייצאת מספר utilities — named exports.",
        professor:
          "Default exports are syntactic sugar for the special 'default' export name; named exports preserve identifier-based imports for tree-shaking.",
      },
      illustration: "📤 export default — היצוא הראשי:\n\n  function App() {...}\n  export default App;\n\n  // אצל הצרכן:\n  import App from './App.jsx';   ← שם חופשי",
      codeExample:
        "// App.jsx\n" +
        "function App() {\n" +
        "  return <div>שלום</div>;\n" +
        "}\n" +
        "export default App;\n\n" +
        "// או בקיצור:\n" +
        "export default function App() {\n" +
        "  return <div>שלום</div>;\n" +
        "}",
      codeExplanation:
        "אפשר לכתוב את ה-export בנפרד או ישירות לפני הפונקציה. אצל ה-importer: import App from './App.jsx' — השם חופשי.",
    },

    // ─── 20. inline style (difficulty 5) ───
    {
      conceptName: "inline style",
      difficulty: 5,
      levels: {
        grandma:
          "inline style זה לכתוב את הצבע/הגודל ישירות על האלמנט, בלי לקבוע ב-CSS.",
        child:
          "במקום לכתוב class בעיצוב ולהפנות אליו, את כותבת ישר על המקום: 'תהיה אדום!'.",
        soldier:
          "ב-JSX, style מקבל אובייקט (לא string!): style={{ color: 'red', fontSize: '20px' }}. סוגריים כפולים: חיצוני ל-JSX, פנימי לאובייקט.",
        student:
          "Property names ב-camelCase (backgroundColor, לא background-color). ערכים בעיקר strings; numbers נחשבים px ב-properties רלוונטיות.",
        junior:
          "inline style טוב לערכים דינמיים (style={{ width: progress + '%' }}). לעיצוב סטטי — עדיף className עם CSS חיצוני.",
        professor:
          "Inline styles bypass the cascade; useful for runtime-computed values. Static styling is better expressed in stylesheets for performance and maintainability.",
      },
      illustration:
        "🎨 inline style vs className:\n\n" +
        "  // dynamic\n" +
        "  <div style={{ width: progress + '%' }} />\n\n" +
        "  // static\n" +
        "  <div className='progress-bar' />",
      codeExample:
        "function ColorBox({ color, size }) {\n" +
        "  return (\n" +
        "    <div\n" +
        "      style={{\n" +
        "        backgroundColor: color,\n" +
        "        width: size,\n" +
        "        height: size,\n" +
        "        borderRadius: 8,  // נחשב 8px\n" +
        "      }}\n" +
        "    />\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "style={{...}} — סוגריים חיצוניים = JSX expression, פנימיים = object literal. תכונות ב-camelCase. מספרים נחשבים px בתכונות-גודל.",
    },

    // ─── 21. CSS import (difficulty 3) ───
    {
      conceptName: "CSS import",
      difficulty: 3,
      levels: {
        grandma:
          "CSS import = להביא את קובץ העיצוב לתוך הקומפוננטה. אחרי import — כל הסטיילים זמינים.",
        child:
          "import './style.css' — הקובץ נטען, והעיצוב חל על הדף.",
        soldier:
          "import './X.css' מבצע side effect — מטמיע את ה-CSS בעמוד. ה-classes זמינים בכל ה-DOM.",
        student:
          "ב-Vite/Webpack, CSS imports עוברים processing (minification, autoprefix). אפשר גם CSS Modules: import s from './X.module.css' → s.btn.",
        junior:
          "CSS גלובלי = scope גלובלי. CSS Modules = scope לקובץ (s.btn = btn_xyz). Tailwind = utility classes inline.",
        professor:
          "CSS imports are processed by the build pipeline; treated as side-effectful modules that inject styles into the document head.",
      },
      illustration: "📁 CSS import — מקשר עיצוב:\n\n  App.jsx → import './App.css'\n  → הסטיילים נטענים ל-DOM",
      codeExample:
        "// App.jsx\n" +
        "import './App.css';\n\n" +
        "function App() {\n" +
        "  return <div className='app'>שלום</div>;\n" +
        "}\n\n" +
        "// App.css\n" +
        ".app {\n" +
        "  font-family: sans-serif;\n" +
        "  padding: 1rem;\n" +
        "}",
      codeExplanation:
        "ה-import טוען את ה-CSS לתוך ה-bundle. הסטיילים חלים גלובלית — כל ה-classes זמינים בכל קומפוננטה.",
    },

    // ─── 22. map (difficulty 6) ───
    {
      conceptName: "map",
      difficulty: 6,
      levels: {
        grandma:
          "map ב-React = 'לכל אחד ברשימה — תיצור element'. רשימת שמות → רשימת <li>.",
        child:
          "כמו לחזור על משהו לכל ילד בכיתה: 'לכל ילד — צור כרטיס'. map עושה את זה.",
        soldier:
          "items.map(it => <Item key={it.id} {...it} />) — מכל איבר במערך, מייצר element. שימוש נפוץ: רשימות, טבלאות, גלריות.",
        student:
          "key prop חובה — מאפשר ל-React לזהות שורות בין רינדורים. השתמש ב-id יציב, לא באינדקס (אם הסדר משתנה).",
        junior:
          "אזהרה 'each child should have a unique key prop' = שכחת key. תקן: key={item.id}. אם אין id — אינדקס רק כשהסדר קבוע.",
        professor:
          "Mapping arrays to elements is React's way to render lists. Stable keys enable efficient reconciliation by uniquely identifying list items across renders.",
      },
      illustration:
        "🔁 map — רשימה ל-elements:\n\n" +
        "  ['א', 'ב', 'ג']\n" +
        "        ↓\n" +
        "  [<li key='א'>א</li>,\n" +
        "   <li key='ב'>ב</li>,\n" +
        "   <li key='ג'>ג</li>]",
      codeExample:
        "function TodoList({ todos }) {\n" +
        "  return (\n" +
        "    <ul>\n" +
        "      {todos.map(todo => (\n" +
        "        <li key={todo.id}>\n" +
        "          {todo.text}\n" +
        "        </li>\n" +
        "      ))}\n" +
        "    </ul>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "map מסובב את המערך — כל פריט הופך ל-<li>. ה-key נדרש כדי ש-React יוכל לזהות שורות בעת re-render. מומלץ id יציב.",
      extras: {
        moreExamples: [
          {
            code:
              "// ❌ שכחת key — אזהרה ב-console\n" +
              "{items.map(it => <li>{it.name}</li>)}\n\n" +
              "// ✅ עם id יציב\n" +
              "{items.map(it => <li key={it.id}>{it.name}</li>)}\n\n" +
              "// ⚠️ index רק אם הסדר לא משתנה ואין הוספות/מחיקות\n" +
              "{items.map((it, i) => <li key={i}>{it.name}</li>)}",
            explanation:
              "key חיוני ל-reconciliation. אם הסדר משתנה ואתה משתמש באינדקס — React יבלבל, באגים בעדכון UI.",
          },
          {
            code:
              "// map עם destructuring + spread\n" +
              "{users.map(({ id, ...user }) => (\n" +
              "  <UserCard key={id} {...user} />\n" +
              "))}",
            explanation:
              "מחלצים id (ל-key), ושאר ה-fields עוברים כ-props ל-UserCard. סינטקס נקי לרשימות אובייקטים.",
          },
          {
            code:
              "// סינון + map משולבים\n" +
              "{items\n" +
              "  .filter(it => it.active)\n" +
              "  .map(it => <Item key={it.id} {...it} />)}",
            explanation:
              "filter קודם → map. שרשור נפוץ ויעיל. בודק התנאי ומציג רק את הרלוונטיים.",
          },
        ],
        pitfalls: [
          {
            mistake: "חסר key prop",
            why: "React לא יכול לזהות שורות בין רינדורים → reconciliation לא יעיל, באגים בעדכון UI.",
            fix: "תמיד key={item.id}. אם אין id יציב, צור אחד (uuid) או השתמש באינדקס בזהירות.",
          },
          {
            mistake: "key={index} עם רשימה שמשתנה",
            why: "כשפריט נוסף בהתחלה, כל האינדקסים זזים. React חושב שכל הפריטים השתנו.",
            fix: "השתמש ב-id יציב. index בסדר רק לרשימה immutable.",
          },
          {
            mistake: "key={Math.random()}",
            why: "key חדש בכל רינדור → React מחזיר את הקומפוננטות מאפס → איבוד state, ביצועים גרועים.",
            fix: "key חייב להיות יציב — id מהמידע, לא ערך אקראי.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "מה נכון לגבי key ב-map?",
            answer:
              "key חייב להיות ייחודי בתוך אותה רשימה ויציב בין רינדורים. עדיף id מהמידע. אם אין — אינדקס רק לרשימה לא משתנה.",
          },
          {
            question:
              "איך מציגים רק todos פעילים?",
            answer:
              "{todos.filter(t => t.active).map(t => <Todo key={t.id} {...t} />)}",
          },
        ],
      },
    },

    // ─── 23. rendering (difficulty 7) ───
    {
      conceptName: "rendering",
      difficulty: 7,
      levels: {
        grandma:
          "rendering = 'לצייר על המסך'. React מצייר את הקומפוננטה — והמשתמש רואה את התוצאה.",
        child:
          "כשמבקשים מ-React 'תראה את הקומפוננטה' — הוא לוקח את הקוד ומצייר. שינוי ב-state = ציור מחדש.",
        soldier:
          "Rendering ב-React = הרצת הקומפוננטה (פונקציה) → JSX → Virtual DOM → סנכרון עם DOM אמיתי. קורה בעת mount, ובכל שינוי state/props.",
        student:
          "מחזור rendering: trigger (state/props change) → render phase (build VDOM) → commit phase (update DOM). React 18 הוסיף concurrent rendering.",
        junior:
          "המלכודות: re-renders מיותרים, infinite loops, stale closures. כלים: React DevTools Profiler לזיהוי, React.memo + useMemo + useCallback לאופטימיזציה.",
        professor:
          "Rendering decomposes into render phase (pure VDOM construction) and commit phase (effectful DOM mutations). Concurrent mode allows interruption and prioritization.",
      },
      illustration:
        "🖌️ rendering — שני שלבים:\n\n" +
        "  state changes\n" +
        "       ↓\n" +
        "  Render phase: function() → VDOM\n" +
        "       ↓\n" +
        "  Diff: VDOM new vs old\n" +
        "       ↓\n" +
        "  Commit phase: עדכון DOM אמיתי",
      codeExample:
        "function Counter() {\n" +
        '  console.log("rendering!");  // יודפס בכל רינדור\n' +
        "  const [count, setCount] = useState(0);\n" +
        "  return (\n" +
        "    <button onClick={() => setCount(c => c+1)}>\n" +
        "      {count}\n" +
        "    </button>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "כל לחיצה מטריגה rendering — הפונקציה רצה מחדש, console.log מודפס, JSX חדש נוצר, React מסנכרן עם DOM.",
      extras: {
        moreExamples: [
          {
            code:
              "// סיבות ל-rendering:\n" +
              "// 1. setState\n" +
              "setCount(5);  // מטריג re-render\n\n" +
              "// 2. props חדשים\n" +
              "<Child name={newName} />  // re-render של Child\n\n" +
              "// 3. context שמשנה\n" +
              "const value = useContext(MyContext);  // re-render כש-Provider משנה\n\n" +
              "// 4. parent re-renders\n" +
              "// כל ילד מתרענן (אלא אם React.memo)",
            explanation:
              "ארבעה טריגרים עיקריים. הכרתם עוזרת לאתר re-renders מיותרים ולמטב.",
          },
          {
            code:
              "// בדיקת re-renders עם React.memo\n" +
              "const Child = React.memo(({ name }) => {\n" +
              "  console.log('Child render');\n" +
              "  return <div>{name}</div>;\n" +
              "});\n\n" +
              "// אם props.name לא משתנה — Child לא מתרענן\n" +
              "// (גם אם parent כן)",
            explanation:
              "React.memo עוצרת re-render כש-props רדודים שווים. שימושי לקומפוננטות 'pure' שאת ה-props שלהן יציבים.",
          },
        ],
        pitfalls: [
          {
            mistake: "ציפייה ש-rendering יקרה אוטומטית כש-state רגיל משתנה",
            why: "React מאזין רק ל-state שלו (useState). שינוי משתנה רגיל לא מטריג rendering.",
            fix: "תמיד דרך useState/setter. למשתנים בלי UI — useRef.",
          },
          {
            mistake: "ביצוע side effect ב-render phase",
            why: "render חייב להיות pure. side effects (fetch, console.log לזמן ארוך) ב-render = באגים, double-renders ב-StrictMode.",
            fix: "side effects ב-useEffect.",
          },
          {
            mistake: "infinite re-renders",
            why: "useEffect שמשנה state בלי deps נכונים, או setState בגוף הקומפוננטה.",
            fix: "deps array מתאים, או הוצאה של הלוגיקה ל-event handler.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "מתי קומפוננטה מתרעננת (re-render)?",
            answer:
              "1) state משתנה (setState). 2) props משתנים. 3) parent מתרענן. 4) context שצורכים השתנה.",
          },
          {
            question:
              "מה יודפס?\n  function App() {\n    console.log('hi');\n    const [n, setN] = useState(0);\n    return <button onClick={() => setN(1)}>{n}</button>;\n  }\n  // לחיצה אחת",
            answer:
              "'hi' יודפס פעמיים: ראשון ב-mount, שני אחרי setN(1). אם בלחיצה לחצנו ל-1 והיינו ב-0 — re-render.",
          },
          {
            question:
              "איך למנוע re-render של ילד שכל ה-props שלו לא השתנו?",
            answer:
              "React.memo(ChildComp) — בודק props רדודים. אם אותו ערך לפי Object.is — מדלג על re-render.",
          },
        ],
      },
    },
  ],

  // Lesson-level quiz — meaningful questions
  quiz: [
    {
      question: "מה היתרון העיקרי של Vite על פני CRA?",
      options: [
        "Vite יותר ישן",
        "Vite משתמש ב-native ES modules בפיתוח — start time מיידי, HMR מהיר",
        "Vite דורש פחות זיכרון",
        "אין הבדל",
      ],
      correct: 1,
      explanation:
        "Vite מנצל ESM של הדפדפן בפיתוח (אין bundling), דבר שמקצר משמעותית את זמני הפתיחה והעדכון. CRA (Webpack) מבצע bundling מלא בכל שינוי.",
    },
    {
      question: "למה משתמשים ב-className ולא ב-class ב-JSX?",
      options: [
        "אין הבדל, שתיהן עובדות",
        "class היא מילה שמורה ב-JavaScript — לא ניתן להגדיר תכונה בשם הזה",
        "className הוא יותר חדש",
        "class לא עובד ב-React",
      ],
      correct: 1,
      explanation:
        "class שמורה ב-JS להגדרת מחלקה. React משתמש ב-className כתחליף. ב-DOM אמיתי זה הופך ל-class.",
    },
    {
      question:
        "מה נכון לגבי key ב-map?\n  {items.map(it => <li>{it.name}</li>)}",
      options: [
        "אין צורך ב-key",
        "key חייב להיות ייחודי ויציב בתוך הרשימה — חוסך באגים ב-reconciliation",
        "key חייב להיות מספר",
        "key הוא רק המלצה",
      ],
      correct: 1,
      explanation:
        "key נדרש לזיהוי שורות בין רינדורים. בלעדיו React מתריע ועלול ליצור באגים בעדכון UI. id יציב מועדף על אינדקס.",
    },
    {
      question: "כמה elements ברמה עליונה מותרים ב-JSX?",
      options: [
        "לא מוגבל",
        "תמיד אחד בלבד — אחרת חובה לעטוף ב-Fragment (<>) או ב-div",
        "שניים מקסימום",
        "רק במחזירים",
      ],
      correct: 1,
      explanation:
        "JSX = expression יחיד, חייב root element אחד. Fragment (<></>) מאפשר עטיפה בלי div מיותר.",
    },
    {
      question: "מתי קומפוננטה מתרעננת?",
      options: [
        "רק בלחיצה",
        "כש-state משתנה, props משתנים, parent מתרענן, או context שצורכים השתנה",
        "כל שניה",
        "רק ב-mount",
      ],
      correct: 1,
      explanation:
        "ארבעה טריגרים. הכרת רביעיית הסיבות עוזרת לאתר re-renders מיותרים.",
    },
    {
      question: "מה ההבדל בין <Hello /> לבין Hello()?",
      options: [
        "אין הבדל",
        "<Hello /> רושם קומפוננטה ב-React tree (state, hooks עובדים). Hello() = קריאה ידנית, מאבד את ניהול React",
        "Hello() מהיר יותר",
        "<Hello /> רק ל-class components",
      ],
      correct: 1,
      explanation:
        "JSX רושם את הקומפוננטה אצל React; קריאה ישירה לפונקציה לא — hooks ו-state לא יעבדו תקין.",
    },
  ],
};
