// data/zz_questions_trace_phase3.js
//
// Phase 3 closes the last 36 activity gaps (lesson_25 + lesson_27 +
// react_blueprint + workbook_taskmanager). Brings activity-ready concepts
// to 568/568 (100%).

var QUESTIONS_TRACE_PHASE3 = [
  // ============================================================================
  // lesson_25 — Tailwind + movies project (8 concepts)
  // ============================================================================
  {
    id: "trace_l25_tailwind_install_001",
    conceptKey: "lesson_25::Tailwind installation",
    level: 2,
    title: "התקנה של Tailwind ב-Vite",
    code: "// 1. npm install -D tailwindcss postcss autoprefixer\n// 2. npx tailwindcss init -p\n// 3. tailwind.config.js: content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}']\n// 4. src/index.css: @tailwind base; @tailwind components; @tailwind utilities;\nconst steps = 4;\nconsole.log(steps);",
    steps: [
      { line: 6, prompt: "מה יודפס?", answer: "4", hint: "ארבעה שלבי התקנה." },
    ],
    explanation: "Tailwind ב-Vite דורש 4 שלבים: npm install, init, config content paths, ייבוא @tailwind directives.",
  },
  {
    id: "trace_l25_navbar_001",
    conceptKey: "lesson_25::navbar",
    level: 2,
    title: "navbar Tailwind",
    code: "function Navbar() {\n  return (\n    <nav className='bg-blue-600 text-white p-4 flex justify-between'>\n      <span>🎬 Movies</span>\n      <input className='px-2 rounded' placeholder='חיפוש' />\n    </nav>\n  );\n}",
    steps: [
      { line: 3, prompt: "אילו utility classes ב-nav?", answer: "bg-blue-600, text-white, p-4, flex, justify-between", acceptable: ["5 classes", "רקע, טקסט, padding, flex, justify"], hint: "ספור את ה-classes." },
    ],
    explanation: "navbar טיפוסי משתמש ב-flex + justify-between להפרדת סמל וטופס. p-4 = padding 1rem.",
  },
  {
    id: "trace_l25_bg_color_001",
    conceptKey: "lesson_25::bg color",
    level: 1,
    title: "bg color utility",
    code: "<div className='bg-red-500 text-white'>Alert</div>\n<div className='bg-green-500 text-white'>Success</div>\n// bg-{color}-{shade}\nconst shades = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];\nconsole.log(shades.length);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "9", hint: "Tailwind מציע 9 דרגות." },
    ],
    explanation: "Tailwind colors נעים 100..900 (בהיר → כהה). bg-X-500 הוא הברירת מחדל.",
  },
  {
    id: "trace_l25_padding_001",
    conceptKey: "lesson_25::padding",
    level: 1,
    title: "padding scale",
    code: "// p-0 = 0\n// p-1 = 0.25rem (4px)\n// p-2 = 0.5rem (8px)\n// p-4 = 1rem (16px)\n// p-8 = 2rem (32px)\nconst px = (n) => n * 4;\nconsole.log(px(4));",
    steps: [
      { line: 7, prompt: "מה יודפס?", answer: "16", hint: "p-4 = 16px (1rem)." },
    ],
    explanation: "Tailwind spacing scale: p-N → N × 0.25rem. p-x עבור horizontal, p-y עבור vertical.",
  },
  {
    id: "trace_l25_search_001",
    conceptKey: "lesson_25::search",
    level: 3,
    title: "search filter",
    code: "function MovieList({ movies }) {\n  const [q, setQ] = useState('');\n  const filtered = movies.filter(m => m.title.toLowerCase().includes(q.toLowerCase()));\n  return (\n    <>\n      <input value={q} onChange={e => setQ(e.target.value)} className='border p-2' />\n      <ul>{filtered.map(m => <li key={m.id}>{m.title}</li>)}</ul>\n    </>\n  );\n}",
    steps: [
      { line: 3, prompt: "מה filter עושה?", answer: "מחזיר רק סרטים ש-title שלהם מכיל את q (case-insensitive)", acceptable: ["סינון", "מסנן לפי q"], hint: "includes על מחרוזות." },
    ],
    explanation: "case-insensitive search: lowercase שני הצדדים, includes. הסינון רץ בכל render.",
  },
  {
    id: "trace_l25_rating_001",
    conceptKey: "lesson_25::rating",
    level: 3,
    title: "rating renderer",
    code: "function Stars({ rating }) {\n  return <span>{'⭐'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>;\n}\nconst x = <Stars rating={3} />;",
    steps: [
      { line: 4, prompt: "מה יוצג עבור rating=3?", answer: "⭐⭐⭐☆☆", hint: "3 כוכבים מלאים + 2 ריקים." },
    ],
    explanation: "String.repeat(n) חוזר על המחרוזת n פעמים. Pattern נפוץ ל-rating UI.",
  },
  {
    id: "trace_l25_add_delete_001",
    conceptKey: "lesson_25::add/delete movie",
    level: 4,
    title: "add + delete לסרטים",
    code: "function App() {\n  const [movies, setMovies] = useState([]);\n  const add = (m) => setMovies([...movies, m]);\n  const del = (id) => setMovies(movies.filter(m => m.id !== id));\n  add({ id: 1, title: 'A' });\n  // אחרי render: movies = [{id:1, title:'A'}]\n  // del(1) → movies = []\n}",
    steps: [
      { line: 3, prompt: "מה add עושה?", answer: "spread + הוספה לסוף", acceptable: ["מערך חדש עם m"], hint: "spread של הקיים + פריט חדש." },
      { line: 4, prompt: "מה del עושה?", answer: "filter בלי הפריט", acceptable: ["filter החוצה"], hint: "filter מחזיר מערך חדש." },
    ],
    explanation: "Pattern נפוץ ב-React: לעולם לא mutate, תמיד spread/filter ליצירת array חדש.",
  },
  {
    id: "trace_l25_validation_001",
    conceptKey: "lesson_25::validation",
    level: 3,
    title: "form validation",
    code: "function AddMovieForm({ onAdd }) {\n  const [title, setTitle] = useState('');\n  const submit = () => {\n    if (!title.trim()) return alert('שם חובה');\n    onAdd({ id: Date.now(), title });\n    setTitle('');\n  };\n}",
    steps: [
      { line: 4, prompt: "מתי alert מופעל?", answer: "אם title ריק או רווחים בלבד", acceptable: ["title.trim() ריק"], hint: "trim מסיר רווחים." },
    ],
    explanation: "ולידציה לפני submit. trim() מונע שמירה של רווחים בלבד.",
  },

  // ============================================================================
  // lesson_27 — TS domain models (11 concepts)
  // ============================================================================
  {
    id: "trace_l27_book_001",
    conceptKey: "lesson_27::Book",
    level: 3,
    title: "Book interface",
    code: "interface Book {\n  id: number;\n  title: string;\n  author: string;\n  genre: Genre;\n  year?: number;\n}\nconst b: Book = { id: 1, title: 'A', author: 'B', genre: Genre.Fiction };",
    steps: [
      { line: 8, prompt: "מה year ב-b?", answer: "undefined", hint: "year? = optional, לא הועבר." },
    ],
    explanation: "Book.ts מגדיר interface של ספר. year? = optional. genre משתמש ב-enum.",
  },
  {
    id: "trace_l27_genre_001",
    conceptKey: "lesson_27::Genre",
    level: 3,
    title: "Genre enum",
    code: "enum Genre {\n  Fiction = 'fiction',\n  NonFiction = 'non-fiction',\n  Biography = 'biography'\n}\nconst g: Genre = Genre.Fiction;\nconsole.log(g);",
    steps: [
      { line: 7, prompt: "מה יודפס?", answer: "fiction", hint: "string enum מחזיר את הערך, לא את השם." },
    ],
    explanation: "string enum: כל value מוצהר במפורש. console.log מקבל את ה-value, לא את ה-key.",
  },
  {
    id: "trace_l27_user_001",
    conceptKey: "lesson_27::User",
    level: 3,
    title: "User union type",
    code: "type User = GuestUser | RegisteredUser;\nfunction greet(u: User) {\n  if (u.kind === 'guest') return 'שלום אורח';\n  return `שלום ${u.email}`;\n}",
    steps: [
      { line: 3, prompt: "איך TS יודע שזה GuestUser?", answer: "discriminated union — kind=='guest'", acceptable: ["kind property", "discriminated union"], hint: "narrowing על kind field." },
    ],
    explanation: "discriminated union: type field משותף עם value שונה לכל variant. TS יודע לעשות narrowing.",
  },
  {
    id: "trace_l27_baseuser_001",
    conceptKey: "lesson_27::BaseUser",
    level: 3,
    title: "BaseUser + extends",
    code: "interface BaseUser {\n  id: number;\n  name: string;\n}\ninterface RegisteredUser extends BaseUser {\n  email: string;\n  password: string;\n}\nconst u: RegisteredUser = { id: 1, name: 'A', email: 'a@b', password: 'x' };",
    steps: [
      { line: 9, prompt: "כמה שדות ב-u?", answer: "4", hint: "id+name (BaseUser) + email+password (RegisteredUser)." },
    ],
    explanation: "interface inheritance: extends מחבר את השדות. RegisteredUser דורש את כל 4.",
  },
  {
    id: "trace_l27_guestuser_001",
    conceptKey: "lesson_27::GuestUser",
    level: 3,
    title: "GuestUser type",
    code: "interface GuestUser {\n  kind: 'guest';\n  id: string;\n}\nconst g: GuestUser = { kind: 'guest', id: 'session-123' };",
    steps: [
      { line: 5, prompt: "האם אפשר kind: 'admin'?", answer: "לא — TS error", acceptable: ["string literal type"], hint: "literal type." },
    ],
    explanation: "kind: 'guest' הוא string literal type — רק הערך הזה מותר.",
  },
  {
    id: "trace_l27_registereduser_001",
    conceptKey: "lesson_27::RegisteredUser",
    level: 3,
    title: "RegisteredUser",
    code: "interface RegisteredUser {\n  kind: 'registered';\n  id: number;\n  email: string;\n}\nconst u: RegisteredUser = { kind: 'registered', id: 1, email: 'a@b' };",
    steps: [
      { line: 6, prompt: "מה type של u.id?", answer: "number", hint: "מ-interface." },
    ],
    explanation: "RegisteredUser שונה מ-GuestUser: id הוא number, יש email, ו-kind מוצמד ל-'registered'.",
  },
  {
    id: "trace_l27_type_001",
    conceptKey: "lesson_27::type",
    level: 3,
    title: "type vs interface",
    code: "// type - לעיתים יותר גמיש (unions, primitives)\ntype ID = number | string;\n// interface - הרחבה דרך extends + declaration merging\ninterface User { id: number }\ninterface User { name: string }  // merges\nconst u: User = { id: 1, name: 'A' };",
    steps: [
      { line: 6, prompt: "אילו שדות ב-u?", answer: "id, name", hint: "interface merging מחבר את שתי ההצהרות." },
    ],
    explanation: "type alias טוב ל-unions/primitives. interface תומך declaration merging — טוב להרחבת libraries.",
  },
  {
    id: "trace_l27_expense_001",
    conceptKey: "lesson_27::Expense",
    level: 4,
    title: "Expense + Category",
    code: "enum Category { Food, Transport, Entertainment }\ninterface Expense {\n  amount: number;\n  category: Category;\n  date: Date;\n}\nconst e: Expense = { amount: 50, category: Category.Food, date: new Date() };\nconsole.log(e.category);",
    steps: [
      { line: 8, prompt: "מה יודפס?", answer: "0", hint: "Category.Food = 0 (numeric enum)." },
    ],
    explanation: "Numeric enum: ערכים מתחילים מ-0. Category.Food === 0.",
  },
  {
    id: "trace_l27_category_001",
    conceptKey: "lesson_27::Category",
    level: 3,
    title: "Category enum lookup",
    code: "enum Category {\n  Food = 'food',\n  Transport = 'transport'\n}\nconst label = Category.Food;\nconsole.log(label);",
    steps: [
      { line: 6, prompt: "מה יודפס?", answer: "food", hint: "string enum value." },
    ],
    explanation: "string enum נוח ב-DB serialization — הערך עצמו ניתן לאחסון.",
  },
  {
    id: "trace_l27_amount_001",
    conceptKey: "lesson_27::Amount",
    level: 3,
    title: "amount field type",
    code: "interface Income { amount: number }\nconst i: Income = { amount: 1000.5 };\nconsole.log(typeof i.amount);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "number", hint: "כל מספר ב-TS הוא number." },
    ],
    explanation: "TS אין int/float נפרדים. amount: number מקבל גם 1000 וגם 1000.5.",
  },
  {
    id: "trace_l27_income_001",
    conceptKey: "lesson_27::Income",
    level: 3,
    title: "Income tracker",
    code: "interface Income {\n  source: string;\n  amount: number;\n  recurring: boolean;\n}\nconst salary: Income = { source: 'salary', amount: 12000, recurring: true };\nconsole.log(salary.recurring);",
    steps: [
      { line: 7, prompt: "מה יודפס?", answer: "true", hint: "boolean field." },
    ],
    explanation: "Income interface ב-money tracker. recurring מבדיל בין משכורת חודשית למענק חד-פעמי.",
  },
  {
    id: "trace_l27_budget_summary_001",
    conceptKey: "lesson_27::Budget Summary",
    level: 5,
    title: "Budget summary type",
    code: "interface BudgetSummary {\n  totalIncome: number;\n  totalExpenses: number;\n  net: number;\n}\nconst sum: BudgetSummary = { totalIncome: 5000, totalExpenses: 3500, net: 1500 };\nconsole.log(sum.net === sum.totalIncome - sum.totalExpenses);",
    steps: [
      { line: 7, prompt: "מה יודפס?", answer: "true", hint: "5000 - 3500 = 1500." },
    ],
    explanation: "BudgetSummary aggregates income vs expenses. net = income - expenses.",
  },
  {
    id: "trace_l27_category_breakdown_001",
    conceptKey: "lesson_27::Category Breakdown",
    level: 5,
    title: "Category breakdown",
    code: "type CategoryBreakdown = Record<Category, number>;\nconst breakdown: CategoryBreakdown = { Food: 800, Transport: 400, Entertainment: 200 };\nconst total = Object.values(breakdown).reduce((a, b) => a + b, 0);\nconsole.log(total);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "1400", hint: "800+400+200." },
    ],
    explanation: "Record<K, V> = Mapped Type — כל ערך מ-K צריך value מסוג V. שימושי ל-aggregations.",
  },
  {
    id: "trace_l27_enum_001",
    conceptKey: "lesson_27::enum",
    level: 4,
    title: "enum keys",
    code: "enum Status { Pending, Active, Done }\nconst keys = Object.keys(Status).filter(k => isNaN(Number(k)));\nconsole.log(keys);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "['Pending', 'Active', 'Done']", acceptable: ["[Pending,Active,Done]", "Pending,Active,Done"], hint: "מסנן את ה-reverse mapping." },
    ],
    explanation: "numeric enum יוצר reverse mapping — Object.keys מחזיר גם שמות וגם ערכים. סינון isNaN משאיר רק שמות.",
  },

  // ============================================================================
  // react_blueprint — Architectural patterns (7 concepts)
  // ============================================================================
  {
    id: "trace_blueprint_lifting_001",
    conceptKey: "react_blueprint::Lifting State Up",
    level: 5,
    title: "Lifting state up",
    code: "function Parent() {\n  const [shared, setShared] = useState('');\n  return (\n    <>\n      <ChildA value={shared} onChange={setShared} />\n      <ChildB value={shared} />\n    </>\n  );\n}",
    steps: [
      { line: 5, prompt: "למה state ב-Parent ולא ב-ChildA?", answer: "כי ChildB גם צריך גישה אליו", acceptable: ["שיתוף בין siblings"], hint: "מקסימום משותף נמוך ביותר." },
    ],
    explanation: "Lifting state up: כש-2 siblings משתפים state, מעבירים אותו לאב משותף ומורידים כ-props.",
  },
  {
    id: "trace_blueprint_dataflow_001",
    conceptKey: "react_blueprint::Data Flow",
    level: 4,
    title: "One-way data flow",
    code: "// Parent → Child via props (down)\n// Child → Parent via callbacks (up)\nfunction Parent() {\n  const [n, setN] = useState(0);\n  return <Child value={n} onIncr={() => setN(n + 1)} />;\n}",
    steps: [
      { line: 5, prompt: "באיזה כיוון value זורם?", answer: "Parent → Child (down)", acceptable: ["למטה", "down"], hint: "props." },
      { line: 5, prompt: "באיזה כיוון onIncr זורם?", answer: "Child → Parent (up)", acceptable: ["למעלה", "up"], hint: "callback." },
    ],
    explanation: "React = one-way data flow. Data זורם down כ-props, events מסומנים up דרך callbacks.",
  },
  {
    id: "trace_blueprint_container_001",
    conceptKey: "react_blueprint::Container vs Presentational",
    level: 5,
    title: "Container vs Presentational pattern",
    code: "// Presentational - dumb, מציג props בלבד\nfunction UserCard({ name, email }) {\n  return <div><h2>{name}</h2><p>{email}</p></div>;\n}\n// Container - logic + state\nfunction UserCardContainer({ id }) {\n  const user = useUser(id);\n  return user ? <UserCard {...user} /> : <Loading />;\n}",
    steps: [
      { line: 6, prompt: "מי מטפל ב-fetch?", answer: "Container (UserCardContainer)", acceptable: ["Container"], hint: "useUser hook." },
    ],
    explanation: "Container/Presentational: container מטפל ב-data fetching + state, presentational הוא פונקציה טהורה של props.",
  },
  {
    id: "trace_blueprint_composition_001",
    conceptKey: "react_blueprint::Composition vs Inheritance",
    level: 5,
    title: "Composition over inheritance",
    code: "// Bad: class hierarchy\n// Good: composition via children + props\nfunction Card({ title, children }) {\n  return <div className='card'><h3>{title}</h3>{children}</div>;\n}\nfunction App() {\n  return <Card title='Welcome'><p>תוכן כלשהו</p></Card>;\n}",
    steps: [
      { line: 7, prompt: "איך App מתאים את Card?", answer: "דרך children", acceptable: ["composition", "JSX children"], hint: "<Card>...content...</Card>." },
    ],
    explanation: "React מומלץ על composition — children + render-prop במקום class hierarchies.",
  },
  {
    id: "trace_blueprint_components_001",
    conceptKey: "react_blueprint::Component Architecture",
    level: 5,
    title: "Component architecture",
    code: "// Layers:\n// 1. Pages (route-level)\n// 2. Containers (data + state)\n// 3. Presentational (pure UI)\n// 4. Atoms (Button, Input, Badge)\nconst layers = ['Pages', 'Containers', 'Presentational', 'Atoms'];\nconsole.log(layers.length);",
    steps: [
      { line: 7, prompt: "מה יודפס?", answer: "4", hint: "ארבע שכבות." },
    ],
    explanation: "Atomic design: Pages → Containers → Presentational → Atoms. דוגמה ל-component hierarchy מודולרי.",
  },
  {
    id: "trace_blueprint_codesplitting_001",
    conceptKey: "react_blueprint::Code Splitting",
    level: 5,
    title: "Code splitting via React.lazy",
    code: "import { lazy, Suspense } from 'react';\nconst Dashboard = lazy(() => import('./Dashboard'));\nfunction App() {\n  return (\n    <Suspense fallback={<Loading />}>\n      <Dashboard />\n    </Suspense>\n  );\n}",
    steps: [
      { line: 2, prompt: "מתי Dashboard נטען?", answer: "כשהקומפוננטה נדרשת לראשונה", acceptable: ["lazy", "כשהיא render"], hint: "lazy = on-demand." },
    ],
    explanation: "React.lazy + dynamic import = code splitting. Bundle ראשוני קטן יותר, חלקים נטענים on-demand.",
  },
  {
    id: "trace_blueprint_perf_001",
    conceptKey: "react_blueprint::Performance Optimization",
    level: 6,
    title: "Performance — memo + useMemo",
    code: "const ExpensiveList = React.memo(function ExpensiveList({ items }) {\n  const sorted = useMemo(() => items.slice().sort(), [items]);\n  return <ul>{sorted.map(i => <li key={i}>{i}</li>)}</ul>;\n});",
    steps: [
      { line: 1, prompt: "מה React.memo עושה?", answer: "מונע re-render אם props לא השתנו", acceptable: ["shallow compare", "skip render if same props"], hint: "memoization." },
      { line: 2, prompt: "מה useMemo עושה?", answer: "מחזיר אותו array עד ש-items משתנה", acceptable: ["cache תוצאה"], hint: "deps array." },
    ],
    explanation: "React.memo + useMemo משלימים: memo מונע re-render של הקומפוננטה, useMemo מונע חישוב מחדש של ערכים יקרים.",
  },
  {
    id: "trace_blueprint_testing_001",
    conceptKey: "react_blueprint::Testing Strategies",
    level: 5,
    title: "Testing strategies",
    code: "// 1. Unit (atoms) - render + assert\n// 2. Integration (containers) - mock data + assert UI\n// 3. E2E (Playwright/Cypress) - full app + real browser\nconst pyramid = ['unit', 'integration', 'e2e'];\nconsole.log(pyramid.length);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "3", hint: "Test pyramid: unit > integration > e2e." },
    ],
    explanation: "Test pyramid: הרבה unit tests, פחות integration, מעט E2E. שומר על מהירות + אמינות.",
  },

  // ============================================================================
  // workbook_taskmanager (10 concepts)
  // ============================================================================
  {
    id: "trace_workbook_variables_001",
    conceptKey: "workbook_taskmanager::variables",
    level: 1,
    title: "let / const ב-Task Manager",
    code: "let tasks = [];\nconst MAX_TASKS = 100;\ntasks.push({ id: 1, title: 'Buy milk', done: false });\nconsole.log(tasks.length);\nconsole.log(MAX_TASKS);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "1", hint: "אחרי push." },
      { line: 5, prompt: "מה יודפס?", answer: "100", hint: "const lookup." },
    ],
    explanation: "let למשתנים שמשתנים, const לקבועים. const עם array עדיין מאפשר mutation של תוכן.",
  },
  {
    id: "trace_workbook_arrays_001",
    conceptKey: "workbook_taskmanager::arrays",
    level: 2,
    title: "מערך משימות",
    code: "const tasks = [\n  { id: 1, title: 'A', done: false },\n  { id: 2, title: 'B', done: true },\n  { id: 3, title: 'C', done: false }\n];\nconst undone = tasks.filter(t => !t.done).length;\nconsole.log(undone);",
    steps: [
      { line: 7, prompt: "מה יודפס?", answer: "2", hint: "A ו-C עדיין not done." },
    ],
    explanation: "filter עם predicate שלילי לסינון לא-מוקדמים. .length על התוצאה.",
  },
  {
    id: "trace_workbook_objects_001",
    conceptKey: "workbook_taskmanager::objects",
    level: 2,
    title: "task object structure",
    code: "const task = {\n  id: Date.now(),\n  title: 'Learn React',\n  done: false,\n  priority: 'high',\n  createdAt: new Date().toISOString()\n};\nconsole.log(Object.keys(task).length);",
    steps: [
      { line: 8, prompt: "מה יודפס?", answer: "5", hint: "5 fields." },
    ],
    explanation: "task object טיפוסי עם: id, title, done, priority, createdAt. Date.now() נותן ID יחודי לפיתוח.",
  },
  {
    id: "trace_workbook_functions_001",
    conceptKey: "workbook_taskmanager::functions",
    level: 2,
    title: "addTask + toggleDone",
    code: "function addTask(tasks, title) {\n  return [...tasks, { id: Date.now(), title, done: false }];\n}\nfunction toggleDone(tasks, id) {\n  return tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);\n}\nlet tasks = [];\ntasks = addTask(tasks, 'A');\ntasks = toggleDone(tasks, tasks[0].id);\nconsole.log(tasks[0].done);",
    steps: [
      { line: 10, prompt: "מה יודפס?", answer: "true", hint: "טוגל מ-false ל-true." },
    ],
    explanation: "מודל immutable: כל פעולה מחזירה array חדש. Pattern מ-Redux/React.",
  },
  {
    id: "trace_workbook_conditions_001",
    conceptKey: "workbook_taskmanager::conditions",
    level: 2,
    title: "filter by priority",
    code: "function getHighPriority(tasks) {\n  return tasks.filter(t => t.priority === 'high' && !t.done);\n}\nconst result = getHighPriority([\n  { title: 'A', priority: 'high', done: false },\n  { title: 'B', priority: 'low', done: false },\n  { title: 'C', priority: 'high', done: true }\n]);\nconsole.log(result.length);",
    steps: [
      { line: 9, prompt: "מה יודפס?", answer: "1", hint: "רק A מתאים (high + not done)." },
    ],
    explanation: "תנאי && משלב 2 בדיקות. רק A עובר.",
  },
  {
    id: "trace_workbook_dom_001",
    conceptKey: "workbook_taskmanager::DOM",
    level: 3,
    title: "render tasks ל-DOM",
    code: "function render(tasks) {\n  const ul = document.getElementById('task-list');\n  ul.innerHTML = tasks.map(t => \n    `<li>${t.done ? '✅' : '⬜'} ${t.title}</li>`\n  ).join('');\n}\nrender([{ title: 'A', done: false }]);",
    steps: [
      { line: 6, prompt: "מה יוצג?", answer: "<li>⬜ A</li>", hint: "done=false → ⬜." },
    ],
    explanation: "innerHTML = string מ-template literals. נוח לrender אבל לא בטוח עם user input (XSS).",
  },
  {
    id: "trace_workbook_events_001",
    conceptKey: "workbook_taskmanager::events",
    level: 3,
    title: "form submit handler",
    code: "document.getElementById('add-form').addEventListener('submit', (e) => {\n  e.preventDefault();\n  const input = document.getElementById('task-input');\n  if (!input.value.trim()) return;\n  addTask(input.value);\n  input.value = '';\n});",
    steps: [
      { line: 2, prompt: "למה preventDefault?", answer: "כדי לא לטעון מחדש את הדף", acceptable: ["מונע submit ברירת מחדל"], hint: "form submit ברירת מחדל = page reload." },
    ],
    explanation: "preventDefault() חיוני בטפסים ב-SPA. בלי זה הדף יטען מחדש.",
  },
  {
    id: "trace_workbook_localstorage_001",
    conceptKey: "workbook_taskmanager::localStorage",
    level: 3,
    title: "save/load מ-localStorage",
    code: "function save(tasks) {\n  localStorage.setItem('tasks', JSON.stringify(tasks));\n}\nfunction load() {\n  const raw = localStorage.getItem('tasks');\n  return raw ? JSON.parse(raw) : [];\n}\nsave([{ id: 1, title: 'A' }]);\nconst loaded = load();\nconsole.log(loaded[0].title);",
    steps: [
      { line: 10, prompt: "מה יודפס?", answer: "A", hint: "אחרי roundtrip JSON." },
    ],
    explanation: "localStorage מאחסן רק strings. תמיד JSON.stringify/parse. Default ל-[] אם ריק.",
  },
  {
    id: "trace_workbook_fetch_001",
    conceptKey: "workbook_taskmanager::fetch",
    level: 4,
    title: "fetch tasks מהשרת",
    code: "async function loadTasks() {\n  const res = await fetch('/api/tasks');\n  if (!res.ok) throw new Error('Failed');\n  return await res.json();\n}",
    steps: [
      { line: 2, prompt: "מה res מכיל?", answer: "Response object", acceptable: ["Response"], hint: "fetch מחזיר Response." },
      { line: 4, prompt: "מה .json מחזיר?", answer: "Promise של הנתונים", acceptable: ["promise", "object", "data"], hint: "json() מחזיר Promise." },
    ],
    explanation: "fetch async pattern: await fetch → check ok → await json. .json() עצמו async.",
  },
  {
    id: "trace_workbook_trycatch_001",
    conceptKey: "workbook_taskmanager::try/catch",
    level: 4,
    title: "טיפול בשגיאות fetch",
    code: "async function loadTasks() {\n  try {\n    const res = await fetch('/api/tasks');\n    return await res.json();\n  } catch (err) {\n    console.error('Failed to load:', err.message);\n    return [];\n  }\n}",
    steps: [
      { line: 7, prompt: "מתי catch מופעל?", answer: "אם fetch זרק שגיאה (רשת או JSON parse)", acceptable: ["error ב-fetch או json"], hint: "await מעביר rejections ל-catch." },
    ],
    explanation: "try/catch סביב await תופס errors מ-fetch (network) ומ-.json() (invalid JSON). Fallback ל-[]) במקרה שגיאה.",
  },
  {
    id: "trace_workbook_taskmanager_001",
    conceptKey: "workbook_taskmanager::Task Manager",
    level: 4,
    title: "Task Manager — הרכבה מלאה",
    code: "// Task Manager combines:\n// 1. UI (DOM render)\n// 2. State (tasks array)\n// 3. Persistence (localStorage)\n// 4. Server sync (fetch)\n// 5. Events (form submit, click)\nconst layers = 5;\nconsole.log(layers);",
    steps: [
      { line: 8, prompt: "מה יודפס?", answer: "5", hint: "5 layers in Task Manager." },
    ],
    explanation: "Task Manager הוא אינטגרציה: UI + State + Persistence + Server + Events. דוגמה לפרויקט full-stack מינימלי.",
  },
];

if (typeof window !== "undefined") {
  window.QUESTIONS_TRACE_PHASE3 = QUESTIONS_TRACE_PHASE3;
  if (window.QUESTIONS_TRACE && Array.isArray(window.QUESTIONS_TRACE)) {
    window.QUESTIONS_TRACE.push(...QUESTIONS_TRACE_PHASE3);
  } else {
    window.QUESTIONS_TRACE = QUESTIONS_TRACE_PHASE3.slice();
  }
  if (window.QUESTIONS_BANK) {
    if (!window.QUESTIONS_BANK.trace) window.QUESTIONS_BANK.trace = [];
    window.QUESTIONS_BANK.trace.push(...QUESTIONS_TRACE_PHASE3);
  }
}
