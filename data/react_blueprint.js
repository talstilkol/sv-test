// data/react_blueprint.js — React Architect Blueprint
// 10 דפוסי-על שכל ארכיטקט React חייב להפנים.
// כל מושג: difficulty 6-9, 6 רמות הסבר, illustration, codeExample, codeExplanation, extras.

var REACT_BLUEPRINT = {
  id: "react_blueprint",
  title: "React Architect Blueprint",
  description:
    "ארכיטקטורה של אפליקציות React גדולות — איך לפרק מערכת לרכיבים, לנהל state, לזרום נתונים, ולשמור על ביצועים.",
  concepts: [
    // ─────────── 1. Component Architecture (difficulty 7, extras) ───────────
    {
      conceptName: "Component Architecture",
      difficulty: 7,
      levels: {
        grandma:
          "ארכיטקטורת רכיבים = איך לפרק את האפליקציה ל'לבנים' קטנות. כל לבנה אחראית על דבר אחד. כשמרכיבים אותן יחד מקבלים אפליקציה שלמה.",
        child:
          "כמו לבנות עם LEGO: כל חלק קטן ועצמאי, ויש חלקים גדולים שמכילים חלקים קטנים. אם חלק שובר — מחליפים רק אותו, לא את כל הבניין.",
        soldier:
          "ארכיטקטורת רכיבים = חלוקה היררכית של UI ל-components. עקרונות: Single Responsibility, גודל סביר (50-150 שורות), ממשק ברור (props), ועומק לא יותר מ-5 רמות.",
        student:
          "ארכיטקטורה טובה כוללת: (1) Atomic Design (atoms/molecules/organisms), (2) Smart vs Dumb separation, (3) feature-based folders ולא type-based, (4) reusability ע\"י props ולא duplication.",
        junior:
          "אצלי בפרויקט: התחלתי עם 1 קומפוננטה של 800 שורות. אחרי refactor — 12 קומפוננטות של 60 שורות. תוצאה: tests מהירים פי 5, באגים יורדים.",
        professor:
          "Component architecture treats UI as a tree of pure functions of state. Key invariants: composition over inheritance, props as the only public API, and clear ownership boundaries that align with team boundaries (Conway's Law).",
      },
      illustration:
        "פירמידת רכיבים (Atomic Design):\n\n" +
        "  Pages       <- HomePage, ProductPage\n" +
        "  Templates   <- DashboardLayout\n" +
        "  Organisms   <- Header, ProductGrid\n" +
        "  Molecules   <- SearchBar, ProductCard\n" +
        "  Atoms       <- Button, Input, Icon\n\n" +
        "  גובה הפירמידה <-> מספר ה-instances:\n" +
        "  Atoms: ~30 רכיבים, מופעל 1000+ פעמים\n" +
        "  Pages: ~20 רכיבים, מופעל 1 פעם",
      codeExample:
        "// feature-based folder structure (מומלץ)\n" +
        "src/\n" +
        "  features/\n" +
        "    products/\n" +
        "      ProductCard.tsx       // dumb\n" +
        "      ProductList.tsx       // dumb\n" +
        "      ProductsPage.tsx      // smart (uses hooks)\n" +
        "      useProducts.ts        // data hook\n" +
        "      products.api.ts       // fetch logic\n" +
        "    cart/\n" +
        "      CartItem.tsx\n" +
        "      CartDrawer.tsx\n" +
        "      useCart.ts\n" +
        "  shared/\n" +
        "    ui/                     // atoms (Button, Input)\n" +
        "    hooks/                  // generic hooks\n" +
        "    utils/                  // pure utils",
      codeExplanation:
        "Feature folders שמים יחד את כל מה ששייך לתכונה (UI + state + API + tests). קל למצוא ולמחוק. Type folders (כל ה-components ביחד) מתפרקים ב-50+ קבצים.",
      extras: {
        moreExamples: [
          {
            code:
              "// דוגמה: שבירת component של 200 שורות לחלקים\n\n" +
              "// לפני:\n" +
              "function ProductPage() {\n" +
              "  // 50 שורות של state\n" +
              "  // 80 שורות של JSX\n" +
              "  // 70 שורות של handlers\n" +
              "}\n\n" +
              "// אחרי:\n" +
              "function ProductPage() {\n" +
              "  const { product, isLoading } = useProduct(id);\n" +
              "  if (isLoading) return <Spinner />;\n" +
              "  return (\n" +
              "    <Layout>\n" +
              "      <ProductHero product={product} />\n" +
              "      <ProductSpecs specs={product.specs} />\n" +
              "      <RelatedProducts categoryId={product.category} />\n" +
              "    </Layout>\n" +
              "  );\n" +
              "}",
            explanation:
              "כל child אחראי על אזור 1. ה-page = orchestrator בלבד. כל child ניתן לשימוש חוזר ולבדיקה עצמאית.",
          },
        ],
        pitfalls: [
          {
            mistake: "להכניס לוגיקת fetch בתוך קומפוננטות UI",
            why:
              "מערבב responsibilities, מקשה על testing (צריך mock fetch), ושוברה reusability.",
            fix:
              "Extract ל-custom hook (useProduct, useCart). הקומפוננטה מקבלת את הנתונים מוכנים.",
          },
          {
            mistake: "קומפוננטות ענק (300+ שורות)",
            why:
              "קושי בהבנה, prop drilling פנימי, וקושי לעקוב אחרי state changes.",
            fix:
              "כלל: מעל 150 שורות = שבור. מעל 5 useState ב-component אחד = שבור או עבור ל-useReducer.",
          },
          {
            mistake: "Folders by type (components/, hooks/, utils/) ולא by feature",
            why:
              "קוד שייך ביחד מתפרק. למחוק feature = ללכת ל-5 תיקיות שונות.",
            fix:
              "Feature folders. בכל פיצ'ר: UI + hooks + API + tests + types ביחד.",
          },
        ],
        practiceQuestions: [
          {
            question: "מהי המטרה של 'shared/ui' folder?",
            answer:
              "Atoms generic ל-design system (Button, Input, Modal) שמשמשים בכל הפיצ'רים. אסור שיהיו תלויים בפיצ'ר ספציפי — אחרת הם לא 'shared'.",
          },
          {
            question: "מתי קומפוננטה היא 'too small' לחלץ?",
            answer:
              "אם היא מכילה <10 שורות JSX והיא בשימוש פעם 1 בלבד. אם רואים אותה תמיד באותו מקום — השאר אותה inline.",
          },
        ],
      },
    },

    // ─────────── 2. State Management (difficulty 8, extras) ───────────
    {
      conceptName: "State Management",
      difficulty: 8,
      levels: {
        grandma:
          "ניהול state = החלטה איפה לשמור 'מה משתנה'. כמו לבחור איפה לשים את המפתחות בבית: ליד הדלת? בכיס? בכספת? כל בחירה משפיעה על הזמינות.",
        child:
          "כמו במשחק לוח: יש לוח אחד שכולם רואים (state גלובלי), ויש קלפים בודדים בידיים (state פנימי). ההחלטה מה איפה — קריטית למשחק.",
        soldier:
          "ניהול state = החלטה היכן לשמור כל משתנה. רמות: (1) local (useState), (2) lifted (parent), (3) URL (query params), (4) context, (5) global store (Redux/Zustand), (6) server (React Query).",
        student:
          "כל state יש לו 'בית טבעי'. שאלה: מי קורא? מי כותב? כמה רחוקים? אם 1 קומפוננטה — local. אם 2-3 רחוקים — lift up. אם הרבה — context. אם server-derived — React Query.",
        junior:
          "טעות שלי: דחפתי הכל ל-Redux. תוצאה: 80% מה-state היה דרוש רק ב-component אחד. עברתי ל'state אקולוגית' — useState first, רק אם אין ברירה אחרת — store.",
        professor:
          "Effective state management is hierarchy-aware: co-locate state with its readers, lift only when necessary, and treat server-cached data distinctly from client-only state. Misplacement causes either prop drilling or unnecessary re-renders.",
      },
      illustration:
        "סולם החלטה ל-state:\n\n" +
        "  שאלה: כמה קומפוננטות זקוקות ל-state הזה?\n\n" +
        "  1            -> useState (local)\n" +
        "  2-3 קרובות   -> lift up to common parent\n" +
        "  3+ רחוקות    -> Context\n" +
        "  global       -> Zustand/Redux\n" +
        "  derived API  -> TanStack Query / SWR\n" +
        "  shareable URL-> useSearchParams",
      codeExample:
        "// הבחנה קריטית: server state vs client state\n\n" +
        "// ❌ לא נכון — לערבב\n" +
        "function ProductList() {\n" +
        "  const [products, setProducts] = useState([]);\n" +
        "  const [filter, setFilter] = useState('all');\n" +
        "  useEffect(() => { fetch('/api').then(r => r.json()).then(setProducts); }, []);\n" +
        "}\n\n" +
        "// ✅ נכון — הפרדה\n" +
        "function ProductList() {\n" +
        "  // server state — TanStack Query (cache, refetch, invalidation)\n" +
        "  const { data: products } = useQuery({\n" +
        "    queryKey: ['products'],\n" +
        "    queryFn: () => fetch('/api').then(r => r.json()),\n" +
        "  });\n" +
        "  // client state — useState (UI only)\n" +
        "  const [filter, setFilter] = useState('all');\n" +
        "}",
      codeExplanation:
        "Server state יש לו life-cycle משלו (cache, stale, refetch). Client state הוא ephemeral. כלי ה-state הנכון = פתרון 80% מבעיות 'reload עיקש'.",
      extras: {
        moreExamples: [
          {
            code:
              "// 4 כלי state פופולריים והתאמתם:\n\n" +
              "// 1. useState — local UI state\n" +
              "const [isOpen, setIsOpen] = useState(false);\n\n" +
              "// 2. Context — auth/theme/language (rare updates)\n" +
              "const { user } = useContext(AuthContext);\n\n" +
              "// 3. Zustand — global client state (frequent updates)\n" +
              "const cart = useCartStore((s) => s.items);\n\n" +
              "// 4. TanStack Query — server data with cache\n" +
              "const { data, isLoading } = useQuery(['todos'], fetchTodos);",
            explanation:
              "אין כלי 'אחד טוב' לכל מצב. Context לעדכונים נדירים, Zustand/Redux לעדכונים תכופים, Query לנתוני server.",
          },
        ],
        pitfalls: [
          {
            mistake: "לשים הכל ב-Context",
            why:
              "כל update ל-context מעורר re-render לכל הצרכנים, גם אם לא נגעו בערך הספציפי.",
            fix:
              "Context = ערכים נדירי-עדכון. לעדכונים תכופים — Zustand/Redux עם selectors.",
          },
          {
            mistake: "לחזיק server data ב-useState ולנהל refetch ידנית",
            why:
              "אתה כותב מחדש cache, retry, dedupe, stale — בערך 200 שורות שספרייה תעשה ב-1.",
            fix: "השתמש ב-TanStack Query או SWR — הם פותרים את כל הבעיות הללו.",
          },
          {
            mistake: "Redux לכל state",
            why:
              "Boilerplate של reducer + action + selector ל-state שמשמש ב-component אחד = bloat.",
            fix:
              "התחל מ-useState. Lift אם צריך. Context אם רחב יותר. Redux רק לגלובלי באמת.",
          },
        ],
        practiceQuestions: [
          {
            question: "מה ההבדל בין client state ל-server state, ולמה זה חשוב?",
            answer:
              "Client state = UI mode/inputs (אינו נשמר). Server state = נתונים מ-API (נשמר ב-cache, יכול להתישן). הם דורשים כלים שונים.",
          },
          {
            question: "מתי URL params הם 'state' טוב יותר מ-useState?",
            answer:
              "כשרוצים שה-state יישרד reload, יהיה shareable, או יופיע בהיסטוריה (back button). דוגמאות: filters, page number, search query.",
          },
          {
            question: "למה Context לא תמיד טוב עבור state גלובלי?",
            answer:
              "כל update עושה re-render לכל המשתמשים בו, גם אם משתמשים רק בחלק קטן. Zustand/Redux עם selectors מאפשרים subscribe ל-slice ספציפי.",
          },
        ],
      },
    },

    // ─────────── 3. Data Flow (difficulty 6, extras) ───────────
    {
      conceptName: "Data Flow",
      difficulty: 6,
      levels: {
        grandma:
          "Data Flow = איך מידע זורם בין רכיבים. ב-React: כיוון אחד בלבד — מלמעלה למטה. כמו מים בנהר: לא יכולים לזרום למעלה.",
        child:
          "כמו פירמידת קליעה: ההורה זורק את הכדור ל-child. ה-child לא זורק חזרה — הוא קורא לפונקציה שההורה נתן לו.",
        soldier:
          "Data Flow ב-React הוא חד-כיווני (one-way binding). Props זורמים down, callbacks (events) עולים up. אסור לעדכן props ישירות — חייב דרך setter.",
        student:
          "Unidirectional data flow מקל הבנה: מקור האמת אחד, השינוי דרך setter ידוע. לעומת two-way binding (Angular ישן) שיכול להוביל ל-loops.",
        junior:
          "כשהתחלתי, ניסיתי לעדכן props מתוך ה-child. React התעלם. הבנתי: child לא יכול לעדכן מה שהוא מקבל. רק ההורה יכול. ה-child שולח callback.",
        professor:
          "Unidirectional data flow ensures predictable rendering: state is owned by one component, derived values propagate downward as props, and changes occur via callbacks lifted to the owner.",
      },
      illustration:
        "Data Flow ב-React (חד-כיווני):\n\n" +
        "  [App]   <- state owner\n" +
        "    | props (down)\n" +
        "    v\n" +
        "  [Header]  <- callbacks (up)  ^\n" +
        "    | onClick / onChange         |\n" +
        "    v                            |\n" +
        "  [SearchBar] -----> setQuery() --+",
      codeExample:
        "function App() {\n" +
        "  const [query, setQuery] = useState('');\n" +
        "  // 1. Props זורמים DOWN\n" +
        "  return <Header query={query} onSearch={setQuery} />;\n" +
        "}\n\n" +
        "function Header({ query, onSearch }) {\n" +
        "  // 2. Child מציג props (read-only)\n" +
        "  return <SearchBar value={query} onChange={onSearch} />;\n" +
        "}\n\n" +
        "function SearchBar({ value, onChange }) {\n" +
        "  // 3. Callback עולה UP — לא משנה value ישירות\n" +
        "  return <input value={value} onChange={(e) => onChange(e.target.value)} />;\n" +
        "}",
      codeExplanation:
        "ה-state ב-App. Props (query) זורמים down. Callback (onSearch) שעולה up עם הערך החדש — App מעדכן, ושוב הערך זורם down. מעגל סגור, מקור אמת אחד.",
      extras: {
        moreExamples: [
          {
            code:
              "// כיוון 'אסור' — לעדכן prop ישירות\n" +
              "function Bad({ count }) {\n" +
              "  count = count + 1;     // אסור! props read-only\n" +
              "  return <div>{count}</div>;\n" +
              "}\n\n" +
              "// כיוון 'נכון' — derive עם useState או useMemo\n" +
              "function Good({ count }) {\n" +
              "  const display = useMemo(() => count + 1, [count]);\n" +
              "  return <div>{display}</div>;\n" +
              "}",
            explanation:
              "Props הם immutable ב-component. אם צריך derived value — חשב אותו מהם, אל תשנה אותם.",
          },
        ],
        pitfalls: [
          {
            mistake: "להשתמש ב-state בתוך child עם copy של props",
            why:
              "Out-of-sync — ה-prop משתנה אבל ה-state נשאר על הערך הישן.",
            fix:
              "אם זה derived — useMemo. אם זה לעריכה — שתי קומפוננטות, או lift state up.",
          },
          {
            mistake: "Prop drilling דרך 5 רמות",
            why:
              "כל קומפוננטה אמצעית חייבת לקבל ולהעביר את ה-prop גם אם לא משתמשת בו.",
            fix: "Context API לערכים שצריכים בעומק. או composition עם children.",
          },
        ],
        practiceQuestions: [
          {
            question: "למה React בחר ב-unidirectional flow?",
            answer:
              "מקור אמת יחיד, צפיות גבוהה, debugging קל יותר (אפשר לעקוב אחרי כל שינוי לקומפוננטה אחת), ו-render predictable.",
          },
        ],
      },
    },

    // ─────────── 4. Composition vs Inheritance (difficulty 7, extras) ───────────
    {
      conceptName: "Composition vs Inheritance",
      difficulty: 7,
      levels: {
        grandma:
          "Composition = להרכיב פונקציונליות מחלקים קטנים. Inheritance = לרשת מ'אבא'. ב-React: composition תמיד מנצח. אין צורך בירושה.",
        child:
          "כמו פיצה: composition זה לבחור מה לשים על הבסיס (גבינה, פטריות). Inheritance זה לקבל מאמא 'פיצה גבינה' וחייב להיות גבינה תמיד.",
        soldier:
          "Composition = רכיב מקבל children או props ומייצר מהם UI. Inheritance = רכיב יורש מאחר. React ממליץ ב-99% על composition — קל יותר לבדיקה והרחבה.",
        student:
          "Composition מקבילה ל-'has-a' (יש לי button בפנים). Inheritance מקבילה ל-'is-a' (אני סוג של button). ב-UI היחסים כמעט תמיד 'has-a', אז composition מתאימה יותר.",
        junior:
          "פעם בניתי class מודאל וירש ממנה class לטופס. אחרי 3 חודשים — ירושה הפכה לקבר. עברתי ל-Modal עם children — קוד קצר ב-50%, לא נשבר.",
        professor:
          "Favor composition over inheritance is a software-engineering principle (Gang of Four, Effective Java). In React it's near-universal: hierarchical UI tracks ownership, not class hierarchy. Inheritance ties components rigidly; composition keeps them orthogonal.",
      },
      illustration:
        "Composition (composition נכון):\n\n" +
        "  <Modal>                <- generic shell\n" +
        "    <Modal.Header>...    <- slot 1\n" +
        "    <Modal.Body>...      <- slot 2\n" +
        "    <Modal.Footer>...    <- slot 3\n" +
        "  </Modal>\n\n" +
        "Inheritance (לא מומלץ):\n\n" +
        "  class FormModal extends Modal { ... }\n" +
        "  class ConfirmModal extends Modal { ... }\n" +
        "  -> צמוד מדי, קשה לשנות Modal\n" +
        "  -> child לא ניתן לשימוש מחוץ ל-class chain",
      codeExample:
        "// Composition pattern (recommended)\n" +
        "function Card({ children, footer }) {\n" +
        "  return (\n" +
        "    <div className='card'>\n" +
        "      <div className='card-body'>{children}</div>\n" +
        "      {footer && <div className='card-footer'>{footer}</div>}\n" +
        "    </div>\n" +
        "  );\n" +
        "}\n\n" +
        "// usage:\n" +
        "<Card footer={<Button>שמור</Button>}>\n" +
        "  <h2>פרופיל משתמש</h2>\n" +
        "  <UserDetails user={user} />\n" +
        "</Card>",
      codeExplanation:
        "Card לא יודע מה ייכנס לתוכו. הוא מספק מבנה (body + optional footer) ומאפשר חופש מלא לתוכן. ניתן לשימוש חוזר בכל הקשר.",
      extras: {
        moreExamples: [
          {
            code:
              "// Compound Components — composition מתקדם\n" +
              "function Tabs({ children, defaultIndex = 0 }) {\n" +
              "  const [active, setActive] = useState(defaultIndex);\n" +
              "  return (\n" +
              "    <TabsContext.Provider value={{ active, setActive }}>\n" +
              "      {children}\n" +
              "    </TabsContext.Provider>\n" +
              "  );\n" +
              "}\n" +
              "Tabs.List = TabList;\n" +
              "Tabs.Tab = Tab;\n" +
              "Tabs.Panel = Panel;\n\n" +
              "// usage נקייה ומבטאת\n" +
              "<Tabs>\n" +
              "  <Tabs.List>\n" +
              "    <Tabs.Tab>Profile</Tabs.Tab>\n" +
              "    <Tabs.Tab>Settings</Tabs.Tab>\n" +
              "  </Tabs.List>\n" +
              "  <Tabs.Panel>...</Tabs.Panel>\n" +
              "  <Tabs.Panel>...</Tabs.Panel>\n" +
              "</Tabs>",
            explanation:
              "Compound Components (Tabs.Tab) מאפשרים API גמיש בלי props מסובכים. הסטייט נחלק דרך Context בתוך Tabs.",
          },
        ],
        pitfalls: [
          {
            mistake: "להעתיק קוד בין שני components 'דומים'",
            why:
              "duplication = שני מקומות לתחזוקה, שתי פעמים באגים אפשריים.",
            fix:
              "Extract common shell ל-component עם children/render-prop. הבדלים נכנסים כ-props.",
          },
          {
            mistake: "להגדיר בסיס class ולרשת ל-React",
            why:
              "Inheritance ב-React שובר reusability ויוצר תלויות סבוכות. גם class components עברו זמנם.",
            fix:
              "Composition + custom hooks. רוצה לחלוק logic? -> custom hook. רוצה לחלוק UI? -> shell component.",
          },
        ],
        practiceQuestions: [
          {
            question: "איך תחליף inheritance ב-React לחלוקת לוגיקה?",
            answer:
              "Custom Hook. במקום class A extends Base, יוצרים useBase() שמחזיר את הלוגיקה, וכל קומפוננטה שצריכה אותו קוראת ל-Hook.",
          },
          {
            question: "מהי יתרון של 'render props' על HOCs?",
            answer:
              "Render props מפורשים יותר (רואים מה נכנס ויוצא), קלים ל-debug, ולא נכנסים ל-props של ה-component הסופי בלי הסבר.",
          },
        ],
      },
    },

    // ─────────── 5. Container vs Presentational (difficulty 6, extras) ───────────
    {
      conceptName: "Container vs Presentational",
      difficulty: 6,
      levels: {
        grandma:
          "Container = 'המוח' (יודע מה לעשות עם נתונים). Presentational = 'הפרצוף' (רק מציג מה שנותנים לו). הפרדה ביניהם = קוד יותר מסודר.",
        child:
          "כמו במשרד: יש מנהל שמחליט (container) ויש מציג שאומר את הקריאה לקהל (presentational). המציג לא מחליט — רק מבצע.",
        soldier:
          "Container = יש לו hooks/state/data fetching. Presentational = pure function של props -> JSX. הפרדה: container יודע 'מה', presentational יודע 'איך נראה'.",
        student:
          "הדפוס המקורי (Dan Abramov, 2015) פחות נפוץ עם hooks אבל ההבחנה חיה: components שמושכים נתונים מ-React Query/Redux שונים מ-components של pure UI.",
        junior:
          "אצלי: ProductsContainer קורא ל-useQuery, מעביר ל-ProductsList שמציג. אם ה-API משתנה — אני נוגע ב-Container בלבד. אם העיצוב משתנה — בPresentational.",
        professor:
          "The pattern enforces separation of concerns: data acquisition (impure, async) vs. data rendering (pure, deterministic). Modern variants leverage hooks: container is the hook, presentational is the consumer.",
      },
      illustration:
        "Container vs Presentational:\n\n" +
        "  <ProductsPage>             <- Container\n" +
        "    | useQuery / useStore\n" +
        "    | filtering, sorting\n" +
        "    v\n" +
        "  <ProductsList items={...}>  <- Presentational\n" +
        "    | pure: props -> JSX\n" +
        "    | no fetch, no global state\n" +
        "    v\n" +
        "  <ProductCard product={...}> <- Presentational",
      codeExample:
        "// Container — knows about API\n" +
        "function ProductsPage() {\n" +
        "  const { data: products, isLoading } = useQuery({\n" +
        "    queryKey: ['products'],\n" +
        "    queryFn: fetchProducts,\n" +
        "  });\n" +
        "  if (isLoading) return <Spinner />;\n" +
        "  return <ProductsList items={products} />;\n" +
        "}\n\n" +
        "// Presentational — pure function of props\n" +
        "function ProductsList({ items }) {\n" +
        "  return (\n" +
        "    <ul>\n" +
        "      {items.map((p) => (\n" +
        "        <ProductCard key={p.id} product={p} />\n" +
        "      ))}\n" +
        "    </ul>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "ProductsList לא יודע מאיפה הנתונים הגיעו. אפשר ל-test אותו עם props קבועים, או להשתמש ב-Storybook בלי mock-API. ProductsPage = השכבה ה'מלוכלכת'.",
      extras: {
        moreExamples: [
          {
            code:
              "// בדיקה: presentational הוא pure?\n" +
              "// ✅ אם הקלט קבוע -> הפלט קבוע\n" +
              "// ✅ אין fetch / setTimeout / useEffect\n" +
              "// ✅ אין גישה לglobal state (Redux, Context)\n" +
              "// ✅ אפשר ל-Storybook בלי providers\n\n" +
              "// אם אחד מאלה false -> זה container.\n\n" +
              "// דוגמה ל-presentational pure:\n" +
              "function PriceTag({ price, currency = '₪' }) {\n" +
              "  return (\n" +
              "    <span className='price-tag'>\n" +
              "      {currency}{price.toFixed(2)}\n" +
              "    </span>\n" +
              "  );\n" +
              "}",
            explanation:
              "Presentational pure → קל לבדוק עם snapshot/visual regression. Storybook + Chromatic = QA אוטומטי לעיצוב.",
          },
        ],
        pitfalls: [
          {
            mistake: "להכניס fetch ל-presentational component",
            why:
              "מאבד את היתרון — לא ניתן ל-Storybook, mock דורש משוכלל יותר.",
            fix:
              "אם תפסת את עצמך עושה useEffect+fetch ב-component של 'card' — הוצא ל-container בחוץ.",
          },
          {
            mistake: "Container עם הרבה JSX",
            why: "Container צריך להיות 'rapper' דק, לא חצי-עמוד של JSX.",
            fix:
              "Container <30 שורות. כל logic של תצוגה -> presentational. Container = orchestration only.",
          },
        ],
        practiceQuestions: [
          {
            question: "האם דפוס Container/Presentational תקף ב-2026 עם hooks?",
            answer:
              "תקף, אבל לא נוקשה. Hooks מטשטשים גבולות. הכלל המעשי: data-fetching יושב בשכבה גבוהה, presentational pure לתצוגה.",
          },
          {
            question: "איך זה משפיע על Storybook?",
            answer:
              "Presentational pure -> Storybook קל (props ב-args). Container -> דורש mocks או wrappers (QueryClient, Store).",
          },
        ],
      },
    },

    // ─────────── 6. Lifting State Up (difficulty 6, extras) ───────────
    {
      conceptName: "Lifting State Up",
      difficulty: 6,
      levels: {
        grandma:
          "Lifting = להעביר את ה'מצב' (state) להורה משותף, כך שכמה ילדים יוכלו לחלוק אותו. כמו לשים את שלט הטלוויזיה על השולחן — כולם יכולים להגיע.",
        child:
          "כמו במשפחה: אם שני ילדים רבים על מי יחזיק את השלט — אבא לוקח אותו. שניהם מבקשים ממנו. אבא = ההורה המשותף.",
        soldier:
          "Lifting State Up = העברת state מ-component ל-parent הקרוב ביותר שלשני הצרכנים. Parent מחזיק את ה-state ומעביר במורד דרך props + callbacks.",
        student:
          "כשרוצים שני components לסנכרן ערך, ה-state חייב לחיות באב משותף. אחרת כל אחד יחזיק עותק וייצא out-of-sync.",
        junior:
          "אצלי: Search bar ו-Results בשני components. כל אחד עם state נפרד = לא הסתנכרנו. הרמתי ל-App, וקיבלתי מקור אמת אחד.",
        professor:
          "Lifting state up establishes a single source of truth at the lowest common ancestor. This is foundational for predictable rendering and is the React-native way to share mutable data without external stores.",
      },
      illustration:
        "Lifting State Up:\n\n" +
        "  לפני (out of sync):\n" +
        "    [Search]   [Results]\n" +
        "    state:q     state:q   <- שני עותקים, לא מסונכרנים!\n\n" +
        "  אחרי (single source of truth):\n" +
        "    [App]\n" +
        "      state:q\n" +
        "        |\n" +
        "        +--> [Search]    (props.q + onChange)\n" +
        "        +--> [Results]   (props.q)",
      codeExample:
        "// לפני: שני components לא מסונכרנים\n" +
        "function Search() {\n" +
        "  const [q, setQ] = useState('');\n" +
        "  return <input value={q} onChange={(e) => setQ(e.target.value)} />;\n" +
        "}\n" +
        "function Results() {\n" +
        "  const [q] = useState(''); // עותק נפרד! לא יסונכרן.\n" +
        "  return <div>Searching: {q}</div>;\n" +
        "}\n\n" +
        "// אחרי: state ב-parent\n" +
        "function App() {\n" +
        "  const [q, setQ] = useState('');\n" +
        "  return (\n" +
        "    <>\n" +
        "      <Search value={q} onChange={setQ} />\n" +
        "      <Results query={q} />\n" +
        "    </>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "App = single source of truth. Search מקבל את ה-value וקריאת update. Results מקבל את ה-value בלבד. כל שינוי ב-Search -> App מתעדכן -> Results מתעדכן.",
      extras: {
        moreExamples: [
          {
            code:
              "// כשהעלינו יותר מדי -> lifting too high\n" +
              "// סימן: את ה-state אף parent בקרבת מקום משתמש\n" +
              "// הוא רק מעביר אותו דרך 5 רמות (prop drilling)\n\n" +
              "// פתרון: Context API\n" +
              "const ThemeContext = createContext();\n\n" +
              "function App() {\n" +
              "  const [theme, setTheme] = useState('dark');\n" +
              "  return (\n" +
              "    <ThemeContext.Provider value={{ theme, setTheme }}>\n" +
              "      <Layout />\n" +
              "    </ThemeContext.Provider>\n" +
              "  );\n" +
              "}\n\n" +
              "// any descendant can read/write\n" +
              "function ThemeToggle() {\n" +
              "  const { theme, setTheme } = useContext(ThemeContext);\n" +
              "  return <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>{theme}</button>;\n" +
              "}",
            explanation:
              "Lifting State Up מוגבל לעומק 2-3 רמות. עמוק יותר = החלף ל-Context. אחרת prop drilling.",
          },
        ],
        pitfalls: [
          {
            mistake: "לא להרים את ה-state אף שצריך",
            why:
              "שני components מנסים לתחזק 'אותו' ערך עצמאית — תתי-עץ נכשלים בסנכרון.",
            fix:
              "אם 2+ components צריכים את אותו ערך -> lift up. הכלל: 'single source of truth'.",
          },
          {
            mistake: "להרים יותר מדי גבוה",
            why:
              "Re-render של App = re-render של כל הילדים. אם השינוי משפיע רק על subtree קטן — שם ה-state.",
            fix:
              "Lift to lowest common ancestor (LCA), לא ל-App אלא אם זה באמת global.",
          },
        ],
        practiceQuestions: [
          {
            question: "מתי Lifting State Up הופך ל-anti-pattern?",
            answer:
              "כשמרימים מעבר ל-3 רמות -> prop drilling. אז עוברים ל-Context או store. הסימן: components אמצעיים מקבלים props שלא משתמשים בהם.",
          },
        ],
      },
    },

    // ─────────── 7. Code Splitting (difficulty 7, extras) ───────────
    {
      conceptName: "Code Splitting",
      difficulty: 7,
      levels: {
        grandma:
          "Code Splitting = לחלק את הקוד לחלקים, לטעון רק מה שצריך עכשיו. כמו ספר עם פרקים — לא קוראים את כולו לפני שמתחילים.",
        child:
          "כמו לטעון משחק: לא טוענים את כל השלבים בהתחלה. רק שלב 1, ואז כשמגיעים לשלב 2 — טוענים אותו. ככה לא ממתינים שעה.",
        soldier:
          "Code Splitting = פיצול ה-bundle ל-chunks קטנים שנטענים on-demand. ב-React: React.lazy() + Suspense, או dynamic import(). תוצאה: First Paint מהיר.",
        student:
          "ב-SPA קלאסי, כל ה-app נטען בבת אחת -> bundle ענק. Code splitting מאפשר split לפי route, feature, או component. כל chunk נטען רק כשנדרש.",
        junior:
          "אצלי: bundle של 2MB -> First Paint 4 שניות. אחרי React.lazy על 4 routes -> 600KB initial, 1.8 שניות. שיפור 55% בלי לשנות לוגיקה.",
        professor:
          "Code splitting at the route or feature boundary leverages dynamic imports to defer non-critical code. Modern bundlers (Vite, Webpack 5) handle chunk graphs and prefetch hints; combined with HTTP/2 multiplexing, granular splitting can outperform monolithic bundles.",
      },
      illustration:
        "Without Code Splitting:\n\n" +
        "  bundle.js (2 MB)  -> downloaded once on first visit\n" +
        "    | every page, every feature\n" +
        "    | even features the user never uses\n\n" +
        "With Code Splitting:\n\n" +
        "  main.js     (200 KB) -> always\n" +
        "  home.js     (100 KB) -> on /home\n" +
        "  admin.js    (400 KB) -> only for admins\n" +
        "  charts.js   (300 KB) -> only when chart opens",
      codeExample:
        "// React.lazy + Suspense — route-based splitting\n" +
        "import { lazy, Suspense } from 'react';\n" +
        "import { Routes, Route } from 'react-router-dom';\n\n" +
        "const Home = lazy(() => import('./pages/Home'));\n" +
        "const Admin = lazy(() => import('./pages/Admin'));\n" +
        "const Reports = lazy(() => import('./pages/Reports'));\n\n" +
        "function App() {\n" +
        "  return (\n" +
        "    <Suspense fallback={<Spinner />}>\n" +
        "      <Routes>\n" +
        "        <Route path='/' element={<Home />} />\n" +
        "        <Route path='/admin' element={<Admin />} />\n" +
        "        <Route path='/reports' element={<Reports />} />\n" +
        "      </Routes>\n" +
        "    </Suspense>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "כל page נטען רק כשמגיעים אליו. Suspense מציג Spinner בזמן הטעינה. ה-bundle הראשי נשאר רזה — רק App + הnavigation.",
      extras: {
        moreExamples: [
          {
            code:
              "// Component-level splitting — לטעון 'on demand'\n" +
              "function ProductPage({ id }) {\n" +
              "  const [showChart, setShowChart] = useState(false);\n" +
              "  // chart heavy library — נטען רק כשהמשתמש לוחץ\n" +
              "  const Chart = useMemo(\n" +
              "    () => lazy(() => import('./PriceChart')),\n" +
              "    []\n" +
              "  );\n" +
              "  return (\n" +
              "    <div>\n" +
              "      <button onClick={() => setShowChart(true)}>הצג גרף</button>\n" +
              "      {showChart && (\n" +
              "        <Suspense fallback='טוען גרף...'>\n" +
              "          <Chart productId={id} />\n" +
              "        </Suspense>\n" +
              "      )}\n" +
              "    </div>\n" +
              "  );\n" +
              "}",
            explanation:
              "ספריות כבדות (chart libs, rich-text editors) — split אגרסיבי. רוב המשתמשים לא יראו -> חוסך להם הורדה של 300KB.",
          },
          {
            code:
              "// Prefetch — לטעון ברקע לפני שצריך\n" +
              "<Link\n" +
              "  to='/reports'\n" +
              "  onMouseEnter={() => import('./pages/Reports')}\n" +
              ">\n" +
              "  Reports\n" +
              "</Link>",
            explanation:
              "כשמשתמש hovering על link, מתחילים לטעון את ה-chunk. כשהוא לוחץ — כבר מוכן. UX מצוין בלי overhead.",
          },
        ],
        pitfalls: [
          {
            mistake: "לעשות split לכל component",
            why:
              "כל chunk = HTTP request. יותר מדי chunks קטנים = waterfall איטי, גרוע מ-bundle אחד.",
            fix:
              "Split ב-route boundaries וב-features כבדים בלבד. אסור לשבר button או card.",
          },
          {
            mistake: "לשכוח Suspense fallback",
            why:
              "בלי fallback, React זורק שגיאה כשנטען chunk. UX נשבר.",
            fix:
              "כל lazy() חייב להיעטף ב-Suspense עם fallback. גם אם זה רק null או skeleton.",
          },
        ],
        practiceQuestions: [
          {
            question: "מה היחס בין Code Splitting ל-Tree Shaking?",
            answer:
              "Tree Shaking = הסרת קוד לא בשימוש (dead code). Code Splitting = פיצול קוד שכן בשימוש לחלקים. שניהם מקטינים את ה-bundle הראשוני אבל בדרכים שונות.",
          },
          {
            question: "למה לא ל-split כל route ב-default?",
            answer:
              "Routes שמשתמשים בהם ב-100% מהזמן (כמו Dashboard) — split יוסיף latency ללא תועלת. Split מתאים ל-routes שלא כולם רואים.",
          },
        ],
      },
    },

    // ─────────── 8. Performance Optimization (difficulty 9, extras) ───────────
    {
      conceptName: "Performance Optimization",
      difficulty: 9,
      levels: {
        grandma:
          "Performance Optimization = לשפר את המהירות. צמצום עבודה מיותרת ('למה לחשב פעמיים?'), טעינה רק של הדרוש, וכיבוד תקציב הזמן של המשתמש.",
        child:
          "כמו לשמור על מטבח: אם אמא כבר קצצה בצל — אל תקצצי שוב. אם לא צריך תפוז עכשיו — אל תוציאי מהמקרר. עבדי חכם.",
        soldier:
          "Performance Optimization ב-React: (1) Profile -> מדוד; (2) Identify bottleneck; (3) Apply targeted fix (memo, virtualization, code split). אסור 'אופטימיזציה מוקדמת'.",
        student:
          "כלים: React DevTools Profiler, Lighthouse, Web Vitals (LCP, FID, CLS). תיקונים: React.memo, useMemo, useCallback, virtualization (react-window), suspense streaming.",
        junior:
          "טעות נפוצה: עוטף הכל ב-React.memo. אצלי הוסיף 200ms של overhead בלי שיפור. הכלל: profile first. אופטם רק מה שמדדת ש-slow.",
        professor:
          "Performance optimization in React requires understanding the reconciliation algorithm: avoid unnecessary re-renders via stable references (useMemo, useCallback), virtualize large lists, leverage React 18 concurrent features (transitions, deferred values, streaming SSR).",
      },
      illustration:
        "Performance Optimization Pyramid:\n\n" +
        "  Profile First (חובה!)\n" +
        "       |\n" +
        "  Cheap Fixes:\n" +
        "    - Move state down (re-render less)\n" +
        "    - useMemo for expensive calc\n" +
        "    - Code splitting (smaller bundles)\n" +
        "       |\n" +
        "  Targeted Fixes:\n" +
        "    - React.memo for frequently re-rendering components\n" +
        "    - useCallback for callbacks passed to memoized children\n" +
        "    - Virtualization for long lists (1000+)\n" +
        "       |\n" +
        "  Architectural:\n" +
        "    - SSR / streaming SSR\n" +
        "    - Edge rendering\n" +
        "    - Web Workers for heavy CPU",
      codeExample:
        "// Common pattern: memoize expensive derived data + callback\n" +
        "function ProductsList({ products, filter, onPick }) {\n" +
        "  // 1. ✅ useMemo — חישוב יקר רק כש-deps משתנים\n" +
        "  const filtered = useMemo(\n" +
        "    () => products.filter((p) => p.category === filter),\n" +
        "    [products, filter]\n" +
        "  );\n\n" +
        "  // 2. ✅ useCallback — reference יציב לצורך React.memo\n" +
        "  const handlePick = useCallback(\n" +
        "    (id) => onPick(id),\n" +
        "    [onPick]\n" +
        "  );\n\n" +
        "  return (\n" +
        "    <ul>\n" +
        "      {filtered.map((p) => (\n" +
        "        <ProductCard key={p.id} product={p} onPick={handlePick} />\n" +
        "      ))}\n" +
        "    </ul>\n" +
        "  );\n" +
        "}\n" +
        "// ProductCard עטוף ב-React.memo — לא יעשה re-render אם props שווים\n" +
        "const ProductCard = React.memo(function ProductCard({ product, onPick }) {\n" +
        "  return <li onClick={() => onPick(product.id)}>{product.name}</li>;\n" +
        "});",
      codeExplanation:
        "useMemo מונע recompute של filter. useCallback שומר reference. React.memo משתמש ב-shallow compare של props. שלושתם יחד מונעים re-render של 1000 cards כשרק 1 משתנה.",
      extras: {
        moreExamples: [
          {
            code:
              "// Virtualization — רק שורות שנראות במסך\n" +
              "import { FixedSizeList } from 'react-window';\n\n" +
              "function HugeList({ items }) {\n" +
              "  // 10,000 items, רק ~30 ב-DOM בכל רגע\n" +
              "  return (\n" +
              "    <FixedSizeList\n" +
              "      height={600}\n" +
              "      itemCount={items.length}\n" +
              "      itemSize={50}\n" +
              "      width='100%'\n" +
              "    >\n" +
              "      {({ index, style }) => (\n" +
              "        <div style={style}>{items[index].name}</div>\n" +
              "      )}\n" +
              "    </FixedSizeList>\n" +
              "  );\n" +
              "}",
            explanation:
              "ל-1000+ items במסך — virtualization חיוני. בלי זה, 5000 DOM nodes יקפיאו את הדפדפן.",
          },
          {
            code:
              "// React 18: useTransition לעדכונים 'לא דחופים'\n" +
              "function Search() {\n" +
              "  const [query, setQuery] = useState('');\n" +
              "  const [results, setResults] = useState([]);\n" +
              "  const [isPending, startTransition] = useTransition();\n\n" +
              "  function onChange(e) {\n" +
              "    setQuery(e.target.value); // urgent — input משאיר חלק\n" +
              "    startTransition(() => {\n" +
              "      // non-urgent — חיפוש כבד\n" +
              "      setResults(filterHugeList(e.target.value));\n" +
              "    });\n" +
              "  }\n\n" +
              "  return (\n" +
              "    <>\n" +
              "      <input value={query} onChange={onChange} />\n" +
              "      {isPending ? <Spinner /> : <Results items={results} />}\n" +
              "    </>\n" +
              "  );\n" +
              "}",
            explanation:
              "startTransition מסמן עדכון 'לא דחוף'. React יכול להפסיק אותו אם משתמש ממשיך להקליד. UX זרימה.",
          },
        ],
        pitfalls: [
          {
            mistake: "אופטימיזציה מוקדמת בלי profile",
            why:
              "אתה מסבך קוד בלי תועלת מדידה. לפעמים אפילו פוגע (overhead של memo).",
            fix:
              "תמיד הפעל React DevTools Profiler. מצא bottleneck אמיתי. תקן רק אותו.",
          },
          {
            mistake: "useCallback סביב כל פונקציה",
            why:
              "אם הפונקציה לא מועברת ל-memoized child — useCallback רק מבזבז זיכרון ו-CPU.",
            fix:
              "useCallback רק כשהפונקציה props של child עטוף ב-React.memo, או ב-deps של hook.",
          },
          {
            mistake: "לחשוב ש-useMemo מאיץ הכל",
            why:
              "useMemo גם הוא עולה (memory + reference equality). לחישובים זולים — מבזבז.",
            fix:
              "השתמש ב-useMemo כשהחישוב >5ms או יוצר reference חדש שמעורר re-render.",
          },
        ],
        practiceQuestions: [
          {
            question: "מה Web Vitals ולמה הם חשובים?",
            answer:
              "LCP (largest content), FID (input delay), CLS (layout shift). מדדים שגוגל בודק — משפיעים על SEO וחוויית משתמש.",
          },
          {
            question: "מתי לא להשתמש ב-React.memo?",
            answer:
              "כשcomponent קל (render <1ms), כשprops משתנים בכל render בכל מקרה (לא קומפרבל), או כשהוא תמיד מועבר children חדשים.",
          },
        ],
      },
    },

    // ─────────── 9. Error Boundaries (difficulty 7, extras) ───────────
    {
      conceptName: "Error Boundaries",
      difficulty: 7,
      levels: {
        grandma:
          "Error Boundary = 'רשת ביטחון' לקוד. אם משהו נשבר — במקום שהאפליקציה כולה תקרוס, רק החלק הזה מציג 'משהו השתבש' והשאר ממשיך לעבוד.",
        child:
          "כמו פיוז בחשמל בבית: מקצר -> רק חלק מהבית כבה, לא הכול. ככה גם בקוד: שגיאה ב-component אחד לא מפיל את כל האפליקציה.",
        soldier:
          "Error Boundary = component שעוטף children ו-catch לכל שגיאה שזרקה ב-render. ב-React חייבים class component (componentDidCatch) או library כמו react-error-boundary.",
        student:
          "Error Boundary לא תופס: (1) שגיאות ב-event handlers, (2) שגיאות אסינכרוניות, (3) שגיאות ב-SSR, (4) שגיאות ב-EB עצמה. לאלה — try/catch או onError.",
        junior:
          "פיצ'ר חשוב: אצלי, EB גלובלי + EB סביב כל route + EB סביב widgets שלישיים. אם widget של ספק זרק שגיאה — שאר האפליקציה ממשיכה.",
        professor:
          "Error Boundaries implement fail-soft semantics in component trees. Place at logical isolation points (routes, third-party widgets, lazy-loaded sections) to prevent localized faults from cascading to a full app crash.",
      },
      illustration:
        "Error Boundary topology:\n\n" +
        "  <App>\n" +
        "    <ErrorBoundary fallback={<GlobalCrashScreen />}>  <- top-level\n" +
        "      <Header />\n" +
        "      <ErrorBoundary fallback={<RouteError />}>       <- per route\n" +
        "        <CurrentRoute />\n" +
        "        <ErrorBoundary fallback={<WidgetError />}>    <- per widget\n" +
        "          <ThirdPartyChart />\n" +
        "        </ErrorBoundary>\n" +
        "      </ErrorBoundary>\n" +
        "    </ErrorBoundary>",
      codeExample:
        "// react-error-boundary (recommended library)\n" +
        "import { ErrorBoundary } from 'react-error-boundary';\n\n" +
        "function ErrorFallback({ error, resetErrorBoundary }) {\n" +
        "  return (\n" +
        "    <div role='alert' className='error-card'>\n" +
        "      <h2>אופס, משהו השתבש</h2>\n" +
        "      <pre>{error.message}</pre>\n" +
        "      <button onClick={resetErrorBoundary}>נסה שוב</button>\n" +
        "    </div>\n" +
        "  );\n" +
        "}\n\n" +
        "function ProductsPage() {\n" +
        "  return (\n" +
        "    <ErrorBoundary\n" +
        "      FallbackComponent={ErrorFallback}\n" +
        "      onError={(error, info) => logToService(error, info)}\n" +
        "      onReset={() => refetchProducts()}\n" +
        "    >\n" +
        "      <ProductsList />\n" +
        "    </ErrorBoundary>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "בכל שגיאה ב-ProductsList, ה-EB יציג ErrorFallback ויקרא ל-onError ל-logging. resetErrorBoundary מאפשר retry. UX: שגיאה מנוהלת במקום white screen.",
      extras: {
        moreExamples: [
          {
            code:
              "// EB ידני (class component) — אם אסור library\n" +
              "class ErrorBoundary extends React.Component {\n" +
              "  state = { hasError: false, error: null };\n\n" +
              "  static getDerivedStateFromError(error) {\n" +
              "    return { hasError: true, error };\n" +
              "  }\n\n" +
              "  componentDidCatch(error, errorInfo) {\n" +
              "    console.error('Uncaught error:', error, errorInfo);\n" +
              "    // log to Sentry/etc\n" +
              "  }\n\n" +
              "  render() {\n" +
              "    if (this.state.hasError) {\n" +
              "      return this.props.fallback || <div>Error</div>;\n" +
              "    }\n" +
              "    return this.props.children;\n" +
              "  }\n" +
              "}",
            explanation:
              "Class component הוא היחיד שיכול להיות EB. Hooks עוד לא תומכים בזה. הספרייה react-error-boundary עוטפת את זה ב-API נוח.",
          },
          {
            code:
              "// EB לא תופס שגיאות אסינכרוניות -> צריך wrapper\n" +
              "function useAsyncError() {\n" +
              "  const [, setError] = useState();\n" +
              "  return useCallback((e) => setError(() => { throw e; }), []);\n" +
              "}\n\n" +
              "function MyComponent() {\n" +
              "  const throwAsync = useAsyncError();\n" +
              "  useEffect(() => {\n" +
              "    fetch('/api').catch((err) => throwAsync(err));\n" +
              "  }, [throwAsync]);\n" +
              "}",
            explanation:
              "טריק: מעלים את השגיאה ל-render phase, שם EB יתפוס אותה. אחרת היא נופלת ל-window.onerror בלבד.",
          },
        ],
        pitfalls: [
          {
            mistake: "EB אחד גלובלי בלבד",
            why:
              "כל שגיאה -> כל המסך הופך ל-fallback. UX קשה.",
            fix:
              "Granular EBs: per route + per widget. רק בעיה גלובלית באמת -> top EB.",
          },
          {
            mistake: "לסמוך ש-EB יתפוס async errors",
            why:
              "EBs מקושרים ל-render bound. fetch().then() לא רץ ב-render -> EB עיוור לזה.",
            fix:
              "השתמש ב-React Query/SWR (יש להם error states), או useAsyncError pattern.",
          },
        ],
        practiceQuestions: [
          {
            question: "למה חשוב לקרוא ל-onError ב-EB?",
            answer:
              "ל-logging (Sentry, Datadog). בלעדיו אתה לא יודע שהמשתמש ראה שגיאה. כל EB חייב logging — אחרת עיוור.",
          },
          {
            question: "מתי EB מתחיל מחדש את ה-component?",
            answer:
              "כשקוראים ל-resetErrorBoundary() (מה-fallback). React מעבד מחדש את ה-children. אם השגיאה חוזרת -> שוב ל-fallback.",
          },
        ],
      },
    },

    // ─────────── 10. Testing Strategies (difficulty 8, extras) ───────────
    {
      conceptName: "Testing Strategies",
      difficulty: 8,
      levels: {
        grandma:
          "Testing Strategies = איך לוודא שהקוד שלך עובד. כמו ביקורות ברפרורות: כמה מהירות (unit), כמה אפשר לראות (integration), כמה אפשר להריץ הכל יחד (E2E).",
        child:
          "כמו במשחק: בודקים שכל כללי המשחק עובדים נכון לפני שמשחקים באמת. אם משהו לא תקין — לא משחקים.",
        soldier:
          "Testing pyramid: (1) Unit (פונקציה, hook); (2) Integration (component עם תלויות); (3) E2E (כל המערכת). הרבה unit, פחות integration, מעט E2E.",
        student:
          "כלים: Vitest/Jest (runner), React Testing Library (DOM testing), Playwright/Cypress (E2E), MSW (mock API). בדיקות מבחינת user behavior, לא implementation.",
        junior:
          "אצלי: 200 unit tests (3 שניות), 30 integration (15 שניות), 5 E2E critical paths (2 דקות). E2E רץ ב-CI על PR, integration ו-unit ב-watch ל-dev.",
        professor:
          "Testing strategy balances cost (writing/maintaining), value (defect prevention), and feedback time. Testing Library's philosophy — 'test what users see, not what code does' — produces resilient suites that survive refactors.",
      },
      illustration:
        "Testing Pyramid (and budget):\n\n" +
        "                /\\\n" +
        "               /E2E\\          5-10 tests, slow\n" +
        "              /------\\\n" +
        "             /Integ.  \\        20-50 tests, medium\n" +
        "            /----------\\\n" +
        "           /   Unit     \\      100-500 tests, fast\n" +
        "          /--------------\\\n\n" +
        "  Trade-off: slower and broader as you go up.\n" +
        "  Goal: catch most bugs at the cheapest layer.",
      codeExample:
        "// Unit test of a hook (Vitest + React Testing Library)\n" +
        "import { renderHook, act } from '@testing-library/react';\n" +
        "import { useCounter } from './useCounter';\n\n" +
        "test('useCounter increments by 1', () => {\n" +
        "  const { result } = renderHook(() => useCounter(0));\n" +
        "  expect(result.current.count).toBe(0);\n" +
        "  act(() => result.current.inc());\n" +
        "  expect(result.current.count).toBe(1);\n" +
        "});\n\n" +
        "// Integration test of a component\n" +
        "import { render, screen } from '@testing-library/react';\n" +
        "import userEvent from '@testing-library/user-event';\n\n" +
        "test('login form submits credentials', async () => {\n" +
        "  const onSubmit = vi.fn();\n" +
        "  render(<LoginForm onSubmit={onSubmit} />);\n" +
        "  await userEvent.type(screen.getByLabelText('Email'), 'a@b.com');\n" +
        "  await userEvent.type(screen.getByLabelText('Password'), 's3cret');\n" +
        "  await userEvent.click(screen.getByRole('button', { name: /login/i }));\n" +
        "  expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.com', password: 's3cret' });\n" +
        "});",
      codeExplanation:
        "ה-test מתנהג כמו משתמש: מקליד ולוחץ. לא בודק state פנימי. אם תשנה implementation אבל ההתנהגות נשארה — ה-test עובר. resilient לhe-refactor.",
      extras: {
        moreExamples: [
          {
            code:
              "// MSW — mock API ב-test\n" +
              "import { setupServer } from 'msw/node';\n" +
              "import { http, HttpResponse } from 'msw';\n\n" +
              "const server = setupServer(\n" +
              "  http.get('/api/products', () =>\n" +
              "    HttpResponse.json([{ id: 1, name: 'Item' }])\n" +
              "  )\n" +
              ");\n" +
              "beforeAll(() => server.listen());\n" +
              "afterAll(() => server.close());\n\n" +
              "test('renders products from API', async () => {\n" +
              "  render(<ProductsPage />);\n" +
              "  expect(await screen.findByText('Item')).toBeInTheDocument();\n" +
              "});",
            explanation:
              "MSW יורט בקשות network ברמת ה-fetch. הקוד שלך לא יודע שזה mock — בדיוק כמו בproduction.",
          },
          {
            code:
              "// E2E — Playwright דוגמה\n" +
              "import { test, expect } from '@playwright/test';\n\n" +
              "test('user can complete checkout', async ({ page }) => {\n" +
              "  await page.goto('/');\n" +
              "  await page.click('text=Add to cart');\n" +
              "  await page.click('text=Cart');\n" +
              "  await page.fill('input[name=email]', 'a@b.com');\n" +
              "  await page.click('text=Pay');\n" +
              "  await expect(page).toHaveURL(/success/);\n" +
              "  await expect(page.locator('text=Thank you')).toBeVisible();\n" +
              "});",
            explanation:
              "E2E בודק את ה-flow המלא בדפדפן אמיתי. יקר אבל הכרחי ל-critical paths (checkout, login, signup).",
          },
        ],
        pitfalls: [
          {
            mistake: "לבדוק implementation במקום behavior",
            why:
              "Tests של 'state פנימי' שובר ב-refactor גם אם ההתנהגות זהה.",
            fix:
              "השתמש ב-Testing Library: getByRole, getByLabelText, getByText. אל תיגע ב-state.",
          },
          {
            mistake: "100% E2E coverage",
            why:
              "E2E איטי, שביר (network, animations), ויקר לתחזוקה.",
            fix:
              "Pyramid: רוב ה-coverage ב-unit/integration, רק 5-10 E2E ל-flows קריטיים.",
          },
          {
            mistake: "Tests תלויים זה בזה",
            why:
              "אם test 5 מסתמך על test 4 — שינוי ב-4 שובר 5. סדר חשוב = bad.",
            fix:
              "כל test עצמאי: setup -> action -> assert. tear down ב-afterEach.",
          },
        ],
        practiceQuestions: [
          {
            question: "מה ההבדל בין Testing Library ל-Enzyme?",
            answer:
              "Enzyme בודק implementation (state, props של children). Testing Library בודק output (DOM, accessibility). Enzyme לא נתמך מ-React 18; Testing Library הוא הסטנדרט.",
          },
          {
            question: "כמה zE2E tests מספיקים?",
            answer:
              "Cover the 'happy path' של כל user journey קריטי (login, checkout, primary feature). 5-15 tests בדרך כלל. עוד מזה -> איטי, פחות מזה -> מסכן.",
          },
          {
            question: "מתי לא לכתוב tests?",
            answer:
              "Throwaway scripts, prototypes שלא יעלו ל-prod. כל קוד שמגיע ל-production -> tests חובה (לפחות critical path).",
          },
        ],
      },
    },
  ],
  quiz: [
    {
      question: "איזה ארגון תיקיות מומלץ לאפליקציית React גדולה?",
      options: [
        "type-based (components/, hooks/, utils/)",
        "feature-based (products/, cart/, shared/)",
        "alphabetical",
        "תיקייה אחת ל-200 קבצים",
      ],
      correct: 1,
      explanation:
        "Feature folders שמים כל מה ששייך לפיצ'ר ביחד (UI, state, API, tests). מקלים על מציאה, מחיקה, ו-onboarding של מפתחים חדשים.",
    },
    {
      question: "מתי כדאי להעלות (lift) state להורה משותף?",
      options: [
        "תמיד — state גלובלי תמיד עדיף",
        "אף פעם — state חייב להיות local",
        "כששני components זקוקים לאותו ערך מסונכרן",
        "כשרוצים יותר re-renders",
      ],
      correct: 2,
      explanation:
        "Lifting State Up = single source of truth כשיותר מ-component אחד צריך את אותו ערך. אם רק 1 קומפוננטה צריכה — local. אם רחוקים — Context.",
    },
    {
      question: "איזה כלי מתאים ל-server data (API responses) ב-2026?",
      options: [
        "useState + useEffect ידני",
        "Redux עם thunks",
        "TanStack Query / SWR",
        "Context API",
      ],
      correct: 2,
      explanation:
        "TanStack Query/SWR מנהלים cache, refetch, dedupe, ו-stale states אוטומטית. useState ידני = 200 שורות boilerplate שמתפוגגות.",
    },
    {
      question: "מה אסור ב-Error Boundary לתפוס?",
      options: [
        "שגיאות ב-render של children",
        "שגיאות ב-event handlers",
        "שגיאות ב-componentDidMount",
        "שגיאות ב-constructor",
      ],
      correct: 1,
      explanation:
        "EB תופס שגיאות בtree של ה-component (render-time). Event handlers ו-async code לא נכללים — אלה דורשים try/catch או error states אחרים.",
    },
    {
      question: "מה הצעד הראשון באופטימיזציה של ביצועים?",
      options: [
        "להוסיף React.memo לכל component",
        "להוסיף useCallback לכל פונקציה",
        "Profile עם React DevTools",
        "לעבור ל-Vue",
      ],
      correct: 2,
      explanation:
        "Profile First. אופטימיזציה מוקדמת בלי מדידה מסבכת קוד בלי תועלת. אחרי profile, מטפלים ב-bottleneck האמיתי.",
    },
    {
      question: "מה ההבדל בין Code Splitting ל-Tree Shaking?",
      options: [
        "אין הבדל",
        "Tree Shaking מסיר קוד לא בשימוש; Code Splitting מפצל קוד בשימוש לחלקים",
        "שניהם רק ב-Vite",
        "Code Splitting מאיט את האפליקציה",
      ],
      correct: 1,
      explanation:
        "Tree Shaking = הסרת dead code (imports שאינם בשימוש). Code Splitting = פיצול הקוד הנשאר ל-chunks שנטענים on-demand.",
    },
  ],
};
