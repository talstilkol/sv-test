// data/course_blueprints.js
//
// W24 — Course blueprint and exam alignment.
// These mappings are based on public syllabus/course pages retrieved on 2026-04-28.
// They are an internal study-alignment aid, not an official endorsement by any school.

var COURSE_BLUEPRINTS = [
  {
    id: "svcollege_fullstack_ai",
    provider: "SVCollege",
    title: "Full Stack AI Development",
    audience: "מסלול Full Stack מודרני עם React, Node, DB, TypeScript, Next ו-AI",
    confidence: "public-source",
    sources: [
      {
        label: "SVCollege — Full Stack AI Development",
        url: "https://svcollege.co.il/full-stack-ai-development/",
        retrieved: "2026-04-28",
      },
    ],
    modules: [
      {
        title: "JavaScript foundations + DOM",
        status: "covered",
        lessonIds: ["lesson_11", "lesson_12", "lesson_13"],
        conceptKeys: ["lesson_11::Array", "lesson_11::function", "lesson_13::DOM"],
        examFocus: "מערכים, פונקציות, DOM, אירועים, localStorage ותרגילי CRUD קטנים.",
      },
      {
        title: "Node.js, npm, Express, REST",
        status: "covered",
        lessonIds: ["lesson_16", "lesson_17", "lesson_18"],
        conceptKeys: ["lesson_16::Node.js", "lesson_17::Express", "lesson_17::REST API", "lesson_18::validation"],
        examFocus: "שרת Express, routes, middleware, validation, status codes ו-JSON responses.",
      },
      {
        title: "Database layer",
        status: "partial",
        lessonIds: ["lesson_20"],
        conceptKeys: [],
        examFocus: "MongoDB/Mongoose קיים בפורטל; PostgreSQL/Prisma/Drizzle מופיעים כמסלול הרחבה עתידי.",
      },
      {
        title: "React client",
        status: "covered",
        lessonIds: ["lesson_21", "lesson_22", "lesson_23", "lesson_24", "lesson_25"],
        conceptKeys: ["lesson_21::React", "lesson_22::useState", "lesson_23::Router", "lesson_24::useEffect", "lesson_25::Tailwind CSS"],
        examFocus: "components, JSX, props, state, router, context, effects, forms ו-responsive UI.",
      },
      {
        title: "TypeScript + React",
        status: "covered",
        lessonIds: ["lesson_26", "lesson_27"],
        conceptKeys: ["lesson_26::TypeScript", "lesson_26::Typing Props", "lesson_27::Union Type", "lesson_27::Type Narrowing"],
        examFocus: "types, interfaces, unions, narrowing, typed props/state ו-models.",
      },
      {
        title: "Next.js, deployment and advanced backend",
        status: "gap",
        lessonIds: [],
        conceptKeys: [],
        examFocus: "Next.js, Nest.js, CI/CD ו-cloud deployment אינם מכוסים כשיעורים מלאים עדיין.",
      },
      {
        title: "AI-assisted development",
        status: "covered",
        lessonIds: ["ai_development"],
        conceptKeys: ["ai_development::Prompt Engineering", "ai_development::AI Code Review"],
        examFocus: "שימוש ב-AI ל-debugging, prompt quality, review וגבולות אמינות.",
      },
    ],
    capstoneLinks: ["capstone_task_manager", "capstone_movie_app", "capstone_auth_crud", "capstone_dashboard"],
    mockExamTags: ["js_foundations", "react_full", "all_full"],
    recommendedNext: [
      "להשלים שיעורי Next.js ו-deployment לפני שמסמנים alignment מלא.",
      "להוסיף תרגילי DB מעבר ל-MongoDB אם רוצים התאמה מלאה למסלול הזה.",
    ],
  },
  {
    id: "john_bryce_fullstack_ai",
    provider: "John Bryce",
    title: "AI Powered Full Stack Developer",
    audience: "מסלול Full Stack עם JavaScript, backend מודרני, React/Redux ו-AI",
    confidence: "public-source",
    sources: [
      {
        label: "John Bryce — AI Powered Full Stack Developer",
        url: "https://www.johnbryce.co.il/catalog/hi-tech-courses/software-and-full-stack-development/ai-powered-full-stack-developer",
        retrieved: "2026-04-28",
      },
      {
        label: "John Bryce syllabus PDF",
        url: "https://www.johnbryce.co.il/wp-content/uploads/2024/08/AI-Powered-Full-Stack-Developer.pdf",
        retrieved: "2026-04-28",
      },
    ],
    modules: [
      {
        title: "JavaScript core and advanced language work",
        status: "covered",
        lessonIds: ["lesson_11", "lesson_12", "lesson_15"],
        conceptKeys: ["lesson_11::function", "lesson_11::scope", "lesson_12::map", "lesson_15::Promise"],
        examFocus: "closures, array methods, async flow, promise chains ו-error handling.",
      },
      {
        title: "Node.js backend and REST services",
        status: "covered",
        lessonIds: ["lesson_16", "lesson_17", "lesson_18"],
        conceptKeys: ["lesson_16::npm", "lesson_17::REST API", "lesson_17::middleware", "lesson_18::server-side storage"],
        examFocus: "Express REST, request/response, validation, storage ו-API behavior.",
      },
      {
        title: "React application development",
        status: "covered",
        lessonIds: ["lesson_21", "lesson_22", "lesson_23", "lesson_24"],
        conceptKeys: ["lesson_21::Component", "lesson_22::state", "lesson_23::Context API", "lesson_24::useEffect"],
        examFocus: "components, props/state, context/router, side effects ו-data fetching.",
      },
      {
        title: "Redux or external state management",
        status: "gap",
        lessonIds: ["react_blueprint"],
        conceptKeys: ["react_blueprint::State Management", "react_blueprint::Data Flow"],
        examFocus: "הפורטל מכסה architecture/data flow, אך Redux Toolkit/Zustand כשיעור מעשי עדיין חסרים.",
      },
      {
        title: "TypeScript and typed frontend",
        status: "covered",
        lessonIds: ["lesson_26", "lesson_27"],
        conceptKeys: ["lesson_26::interface", "lesson_26::React + TypeScript", "lesson_27::CRUD"],
        examFocus: "typed models, props/state, CRUD domain modeling ו-union types.",
      },
      {
        title: "Generative AI in development",
        status: "covered",
        lessonIds: ["ai_development"],
        conceptKeys: ["ai_development::AI Pair Programming", "ai_development::AI Limitations"],
        examFocus: "איך להשתמש ב-AI בלי להעתיק פתרונות שלא מבינים.",
      },
    ],
    capstoneLinks: ["capstone_movie_app", "capstone_auth_crud", "capstone_budget_manager"],
    mockExamTags: ["js_foundations", "react_full", "all_full"],
    recommendedNext: [
      "להוסיף Redux Toolkit/Zustand practice אם המסלול דורש state management חיצוני.",
      "להוסיף interview-prep סביב async, REST ו-React hooks.",
    ],
  },
  {
    id: "sela_react_professional",
    provider: "Sela",
    title: "React professional track",
    audience: "מסלול React מקצועי: components, architecture, state, routing, server communication",
    confidence: "public-source",
    sources: [
      {
        label: "Sela — ReactJS syllabus",
        url: "https://scc.sela.co.il/Syl/Syllabus/info?branchname=165&coursecode=ReactJS",
        retrieved: "2026-04-28",
      },
    ],
    modules: [
      {
        title: "React foundations and development environment",
        status: "covered",
        lessonIds: ["lesson_21"],
        conceptKeys: ["lesson_21::React", "lesson_21::Vite", "lesson_21::Component", "lesson_21::JSX"],
        examFocus: "מה React עושה, איך מקימים פרויקט, JSX, components ו-rendering.",
      },
      {
        title: "Components, props and composition",
        status: "covered",
        lessonIds: ["lesson_21", "lesson_22", "react_blueprint"],
        conceptKeys: ["lesson_21::props", "lesson_22::parent component", "react_blueprint::Composition vs Inheritance"],
        examFocus: "פירוק קומפוננטות, props, composition, lifting state ו-container/presentational.",
      },
      {
        title: "State and forms",
        status: "covered",
        lessonIds: ["lesson_22"],
        conceptKeys: ["lesson_22::useState", "lesson_22::controlled input", "lesson_22::passing function as prop"],
        examFocus: "controlled inputs, immutable updates, callbacks ו-render behavior.",
      },
      {
        title: "Routing and app navigation",
        status: "covered",
        lessonIds: ["lesson_23"],
        conceptKeys: ["lesson_23::Router", "lesson_23::Link", "lesson_23::useNavigate", "lesson_23::useParams"],
        examFocus: "routes, links, dynamic params וניווט בין views.",
      },
      {
        title: "Server communication and effects",
        status: "covered",
        lessonIds: ["lesson_24", "lesson_15"],
        conceptKeys: ["lesson_24::useEffect", "lesson_24::fetching data", "lesson_15::fetch"],
        examFocus: "useEffect, dependency array, fetch, cleanup ו-error states.",
      },
      {
        title: "Redux and advanced ecosystem",
        status: "partial",
        lessonIds: ["react_blueprint"],
        conceptKeys: ["react_blueprint::State Management", "react_blueprint::Performance Optimization"],
        examFocus: "הפורטל נותן יסודות architecture/performance; Redux מעשי יתווסף כ-guided build.",
      },
    ],
    capstoneLinks: ["capstone_movie_app", "capstone_dashboard"],
    mockExamTags: ["react_quick", "react_full"],
    recommendedNext: [
      "להוסיף Redux/Zustand mini-build כדי לסגור ecosystem gap.",
      "להוסיף שאלות ראיון React לפי hooks, render ו-state management.",
    ],
  },
  {
    id: "generic_israeli_bootcamp",
    provider: "Generic Bootcamp",
    title: "Israeli junior full-stack readiness",
    audience: "מיפוי לא רשמי שמאחד את החפיפה בין מסלולי JS/React/Node נפוצים",
    confidence: "internal-archetype",
    sources: [
      {
        label: "Internal LumenPortal curriculum map",
        url: "SPEC_AND_MASTER_PLAN.md",
        retrieved: "2026-04-28",
      },
    ],
    modules: [
      {
        title: "JS foundations",
        status: "covered",
        lessonIds: ["lesson_11", "lesson_12", "lesson_13", "lesson_15"],
        conceptKeys: ["lesson_11::Array", "lesson_11::object", "lesson_12::filter", "lesson_13::localStorage", "lesson_15::Asynchronous"],
        examFocus: "מערכים, אובייקטים, פונקציות, DOM, async וטעויות נפוצות.",
      },
      {
        title: "Frontend with React",
        status: "covered",
        lessonIds: ["lesson_21", "lesson_22", "lesson_23", "lesson_24", "lesson_25"],
        conceptKeys: ["lesson_21::JSX", "lesson_22::immutable", "lesson_23::Context API", "lesson_24::useMemo", "lesson_25::responsive design"],
        examFocus: "מימוש UI, state, routing, effects, performance ו-Tailwind.",
      },
      {
        title: "Backend with Node/Express",
        status: "covered",
        lessonIds: ["lesson_16", "lesson_17", "lesson_18"],
        conceptKeys: ["lesson_16::File System", "lesson_17::app.get", "lesson_17::Status Codes", "lesson_18::POST"],
        examFocus: "npm, files, Express, forms, validation ו-REST CRUD.",
      },
      {
        title: "Data and persistence",
        status: "partial",
        lessonIds: ["lesson_13", "lesson_20"],
        conceptKeys: ["lesson_13::localStorage"],
        examFocus: "localStorage ו-MongoDB קיימים; SQL/ORM מתקדמים עדיין backlog.",
      },
      {
        title: "Typed production habits",
        status: "covered",
        lessonIds: ["lesson_26", "lesson_27", "react_blueprint", "ai_development"],
        conceptKeys: ["lesson_26::Type Safety", "lesson_27::Transaction", "react_blueprint::Testing Strategies", "ai_development::AI Code Review"],
        examFocus: "TypeScript, architecture, testing thinking, code review ו-AI-assisted workflow.",
      },
    ],
    capstoneLinks: ["capstone_task_manager", "capstone_movie_app", "capstone_budget_manager", "capstone_auth_crud", "capstone_dashboard"],
    mockExamTags: ["practice_short", "js_foundations", "react_full", "all_full"],
    recommendedNext: [
      "להוסיף guided builds לכל שכבה: vanilla JS, React, Node, TS.",
      "להוסיף exam blueprint report שמחשב coverage לכל תלמיד לפי יעד.",
    ],
  },
];

if (typeof window !== "undefined") {
  window.COURSE_BLUEPRINTS = COURSE_BLUEPRINTS;
}
