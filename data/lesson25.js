// data/lesson25.js — שיעור 25: Tailwind CSS + פרויקט סרטים
var LESSON_25 = {
  id: "lesson_25",
  title: "שיעור 25 — Tailwind CSS + פרויקט סרטים",
  description:
    "Tailwind CSS לעיצוב מהיר עם utility classes; flex/grid לפריסה; פרויקט מעשי של אפליקציית סרטים עם search, rating, ו-CRUD.",
  concepts: [
    // ─── 1. Tailwind CSS (difficulty 5) ───
    {
      conceptName: "Tailwind CSS",
      difficulty: 5,
      levels: {
        grandma:
          "Tailwind זה ספריית עיצוב — מערך של 'מילים קצרות' שמייצגות סטיילים. במקום לכתוב CSS — את כותבת קלאסים בתוך JSX.",
        child:
          "במקום לפתוח קובץ CSS ולכתוב חוקים, את כותבת ישר על האלמנט: bg-blue-500 = רקע כחול. text-white = טקסט לבן.",
        soldier:
          "Tailwind = utility-first CSS framework. כל class הוא 'מילה אטומית' (px-4, bg-red-500, flex). מרכיבים את העיצוב ב-className.",
        student:
          "Tailwind מבטל את הצורך בשמות classes משלך. במקום .btn-primary { ... } — כותבים className='px-4 py-2 bg-blue-500 hover:bg-blue-700'.",
        junior:
          "התחלתי ספקני (HTML מתפוצץ עם classes), אבל אחרי שבוע — לא חוזרים. ה-IDE מראה autocomplete. הקובץ הסופי קטן (purge מסיר לא בשימוש).",
        professor:
          "Utility-first CSS framework with atomic single-purpose classes. JIT (Just-In-Time) compiler generates only used classes; PurgeCSS removes unused at build.",
      },
      illustration:
        "🎨 Tailwind — עיצוב inline עם utilities:\n\n" +
        "  className='\n" +
        "    px-4 py-2          ← padding\n" +
        "    bg-blue-500        ← רקע כחול\n" +
        "    text-white         ← טקסט לבן\n" +
        "    rounded-lg         ← פינות מעוגלות\n" +
        "    hover:bg-blue-700  ← על hover, כחול כהה\n" +
        "  '",
      codeExample:
        "function Button({ children }) {\n" +
        "  return (\n" +
        "    <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition'>\n" +
        "      {children}\n" +
        "    </button>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "כל class הוא 'מילה' של עיצוב. הצרוף שלהם בונה את ה-look. transition מוסיף אנימציה חלקה ל-hover.",
    },

    // ─── 2. utility classes (difficulty 4) ───
    {
      conceptName: "utility classes",
      difficulty: 4,
      levels: {
        grandma:
          "utility classes זה classes קטנים שכל אחד עושה דבר אחד. כמו p-4 = padding 4. text-red-500 = טקסט אדום.",
        child:
          "במקום class גדולה שכוללת הכל, את משתמשת בהרבה classes קטנות שכל אחת עושה משהו אחד.",
        soldier:
          "Utility class = class עם מטרה יחידה (single-purpose). דוגמה: m-2 (margin), p-4 (padding), text-lg (font-size).",
        student:
          "Atomic CSS approach. כל class עוטף property יחיד. הרכבה דרך className. יתרונות: ללא duplications, predictable.",
        junior:
          "מאוד צפוף בהתחלה (אך מאוד יעיל אחרי שמתרגלים). responsive variants: sm:, md:, lg:. state variants: hover:, focus:, active:.",
        professor:
          "Composition over inheritance for styling. Avoids specificity battles, eliminates dead CSS, enables design-system constraints via Tailwind config.",
      },
      illustration: "🧱 utility classes — בלוקים:\n\n  m-2     → margin: 0.5rem\n  p-4     → padding: 1rem\n  text-lg → font-size: 1.125rem\n  bg-red  → background: red",
      codeExample:
        "// כל class יחידני — משלבים\n" +
        "<div className='\n" +
        "  m-4              // margin\n" +
        "  p-6              // padding\n" +
        "  bg-gray-100      // רקע אפור\n" +
        "  rounded-lg       // פינות\n" +
        "  shadow-md        // צל\n" +
        "  hover:shadow-xl  // צל גדול ב-hover\n" +
        "'>",
      codeExplanation:
        "כל class — property בודד או קבוצה קטנה. מצרפים בנדיבות. Tailwind מטמיע רק את מה שבשימוש בעת build.",
    },

    // ─── 3. responsive design (difficulty 6) ───
    {
      conceptName: "responsive design",
      difficulty: 6,
      levels: {
        grandma:
          "responsive design = האתר נראה טוב גם במחשב, גם בטאבלט, גם בטלפון. מתאים את עצמו לגודל המסך.",
        child:
          "כשפותחים את האתר בטלפון — הוא מראה אחרת (יותר צר). במחשב — רחב יותר. ה-design 'מגיב' לגודל.",
        soldier:
          "ב-Tailwind: prefixed classes לפי breakpoint. md:flex = רק במסך בינוני ומעלה יהיה flex. mobile-first by default.",
        student:
          "Breakpoints (Tailwind defaults): sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px. ללא prefix = mobile (כל המסכים).",
        junior:
          "המלכודת השכיחה: לחשוב 'desktop-first'. ב-Tailwind זה הפוך — ברירת מחדל = mobile, ה-prefix מוסיף שיפורים למסך גדול.",
        professor:
          "Mobile-first responsive design via screen-size variant prefixes. Each prefix represents min-width media query, cumulative.",
      },
      illustration:
        "📱💻 responsive — Tailwind breakpoints:\n\n" +
        "  className='\n" +
        "    text-sm       ← mobile (default)\n" +
        "    md:text-base  ← מ-768px ומעלה\n" +
        "    lg:text-lg    ← מ-1024px ומעלה\n" +
        "  '",
      codeExample:
        "<div className='\n" +
        "  flex flex-col           // ב-mobile: עמודה\n" +
        "  md:flex-row            // ב-md ומעלה: שורה\n" +
        "  gap-2 md:gap-6         // gap קטן ב-mobile, גדול בדסקטופ\n" +
        "  p-2 md:p-4 lg:p-8      // padding מתגדל\n" +
        "'>\n" +
        "  ...\n" +
        "</div>",
      codeExplanation:
        "ה-classes ללא prefix = mobile. md:, lg: = מסך גדול יותר. הפריסה מתאימה את עצמה אוטומטית.",
      extras: {
        moreExamples: [
          {
            code:
              "// Hide on mobile, show on desktop\n" +
              "<div className='hidden md:block'>רק במסך גדול</div>\n\n" +
              "// Reverse — show on mobile, hide on desktop\n" +
              "<div className='block md:hidden'>רק ב-mobile</div>",
            explanation:
              "hidden = display: none. md:block = display: block ב-md ומעלה. שילוב נפוץ להיברולה responsive.",
          },
          {
            code:
              "// Grid responsive\n" +
              "<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>\n" +
              "  {items.map(it => <Card key={it.id} {...it} />)}\n" +
              "</div>",
            explanation:
              "ב-mobile עמודה אחת, ב-md שתיים, ב-lg שלוש. דפוס סטנדרטי לרשתות גלריה.",
          },
        ],
        pitfalls: [
          {
            mistake: "ניסיון להפריד desktop ל-classes נפרדים",
            why: "Tailwind mobile-first — ה-classes ללא prefix חלים על הכל. אם רוצים desktop only, השתמש ב-md:",
            fix: "text-base md:text-lg = small במ-mobile, large ב-desktop. לא: md:text-base lg:text-lg (text base לא יחול ב-mobile).",
          },
          {
            mistake: "ערכים שונים לכל breakpoint",
            why: "כותבים text-sm md:text-base lg:text-lg — הופך מסורבל בקלות.",
            fix: "השתמש בקבועים (text-base) ושנה רק במקרה הצורך. אל תקפיד על אופטימיזציה מוקדמת.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "איך עושים grid עם 1 עמודה ב-mobile, 3 ב-desktop?",
            answer:
              "<div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>",
          },
        ],
      },
    },

    // ─── 4. flex (difficulty 6) ───
    {
      conceptName: "flex",
      difficulty: 6,
      levels: {
        grandma:
          "flex = 'תארגן את הילדים בשורה (או עמודה)'. עם flexbox, מסדרים אלמנטים בקלות.",
        child:
          "כמו לסדר חיילים בשורה. flex אומר ל-CSS איך לארגן.",
        soldier:
          "display: flex על parent — הילדים נסדרים ברצף. ב-Tailwind: className='flex'. flex-row (default) או flex-col.",
        student:
          "Flexbox: container עם direction (row/column), justify-content (ראשי), align-items (משני), gap. שולט גם ב-grow/shrink/basis של כל ילד.",
        junior:
          "המתכון הזהב: flex items-center justify-between gap-4. מסדר הכל בקרוב ב-90% מהמקרים. שאר ה-options: justify-start/end/center/around/evenly.",
        professor:
          "CSS Flexible Box Layout. One-dimensional layout system optimized for distribution along a single axis (main + cross).",
      },
      illustration:
        "📐 flex — סידור בשורה/עמודה:\n\n" +
        "  flex                           ← display: flex\n" +
        "  flex-row (default)             ← שורה →\n" +
        "  flex-col                       ← עמודה ↓\n" +
        "  justify-between                ← פיזור על main axis\n" +
        "  items-center                   ← align על cross axis",
      codeExample:
        "// navbar שכיח\n" +
        "<nav className='flex items-center justify-between p-4 bg-gray-800'>\n" +
        "  <h1 className='text-white text-xl'>Logo</h1>\n" +
        "  <div className='flex gap-4'>\n" +
        "    <a className='text-gray-300'>בית</a>\n" +
        "    <a className='text-gray-300'>אודות</a>\n" +
        "  </div>\n" +
        "</nav>",
      codeExplanation:
        "flex — הילדים בשורה. items-center — ממורכזים אנכית. justify-between — Logo בקצה אחד, links בקצה שני. דפוס navbar קלאסי.",
      extras: {
        moreExamples: [
          {
            code:
              "// אנכי, ממורכז\n" +
              "<div className='flex flex-col items-center gap-4'>\n" +
              "  <img src='avatar.jpg' />\n" +
              "  <h2>שם משתמש</h2>\n" +
              "  <p>תיאור</p>\n" +
              "</div>",
            explanation:
              "flex-col = עמודה. items-center = מרכוז אופקי (cross axis בעמודה). gap-4 = רווח בין elements.",
          },
          {
            code:
              "// flex grow — חלוקת מקום\n" +
              "<div className='flex'>\n" +
              "  <Sidebar className='w-64' />            // קבוע\n" +
              "  <Main className='flex-1' />            // ממלא את השאר\n" +
              "</div>",
            explanation:
              "flex-1 = flex: 1 = ה-Main ימלא את כל המקום הנותר. Sidebar בעל w-64 — רוחב קבוע.",
          },
        ],
        pitfalls: [
          {
            mistake: "שכחת items-center / justify-* על parent",
            why: "ה-defaults של flex לא תמיד מה שרוצים. אלמנטים יישבו בתחילת ה-axis.",
            fix: "תמיד תוסיף items-center + justify-* לפי הצורך.",
          },
          {
            mistake: "נסיון להסביר items-center ל-flex-col",
            why: "ב-flex-col, items שולט ב-cross axis (אופקי). מתבלבלים.",
            fix: "items-center מרכז על cross axis. justify-* על main axis. flex-col הופך את הצירים.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "איך מרכזים תוכן אופקית ואנכית?",
            answer:
              "flex items-center justify-center על ה-parent.",
          },
          {
            question:
              "איך עושים sidebar 256px + main שממלא שאר המקום?",
            answer:
              "<div className='flex'><aside className='w-64'>...</aside><main className='flex-1'>...</main></div>",
          },
        ],
      },
    },

    // ─── 5. grid (difficulty 6) ───
    {
      conceptName: "grid",
      difficulty: 6,
      levels: {
        grandma:
          "grid = 'תארגן ברשת'. כמו שולחן עם שורות ועמודות. כל ילד מוצב בתא.",
        child:
          "כמו לוח שח-מט. כל קוביה היא תא. grid מסדר אלמנטים בתאים.",
        soldier:
          "display: grid יוצר רשת דו-מימדית. grid-cols-3 = 3 עמודות. grid-rows-2 = 2 שורות. gap-4 = רווח בין תאים.",
        student:
          "CSS Grid Layout. שולט בשורות, בעמודות, וב-spanning של אלמנטים. עוצמתי יותר מ-flex — אבל מעט מורכב יותר.",
        junior:
          "הכלל: flex לציר אחד, grid לשני צירים. גלריה של תמונות, dashboard, table layout — grid. nav, button row — flex.",
        professor:
          "CSS Grid — two-dimensional layout system. Tracks (rows/cols), spanning, line-based positioning. Powerful for complex layouts.",
      },
      illustration:
        "🔲 grid — רשת דו-מימדית:\n\n" +
        "  grid-cols-3 gap-4\n" +
        "  ┌──┬──┬──┐\n" +
        "  │1 │2 │3 │\n" +
        "  ├──┼──┼──┤\n" +
        "  │4 │5 │6 │\n" +
        "  └──┴──┴──┘",
      codeExample:
        "// גלריית סרטים\n" +
        "<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>\n" +
        "  {movies.map(movie => (\n" +
        "    <MovieCard key={movie.id} {...movie} />\n" +
        "  ))}\n" +
        "</div>",
      codeExplanation:
        "ב-mobile 2 עמודות, ב-md שלוש, ב-lg ארבע. ה-grid מסדר אוטומטית את ה-cards. gap-4 רווח בין כל אחד.",
      extras: {
        moreExamples: [
          {
            code:
              "// span — אלמנט שלוקח 2 עמודות\n" +
              "<div className='grid grid-cols-3 gap-4'>\n" +
              "  <div className='col-span-2 bg-blue-100'>רוחב כפול</div>\n" +
              "  <div className='bg-gray-100'>רגיל</div>\n" +
              "  <div className='bg-gray-100'>רגיל</div>\n" +
              "  <div className='bg-gray-100'>רגיל</div>\n" +
              "</div>",
            explanation:
              "col-span-2 = ה-element תופס 2 עמודות במקום אחת. שימושי לכותרות, hero sections.",
          },
        ],
        pitfalls: [
          {
            mistake: "להשתמש ב-grid לציר אחד",
            why: "Overkill. flex פשוט יותר וקל לעבוד.",
            fix: "grid לדו-מימדי (גלריה, dashboard). flex לציר אחד (navbar, button row).",
          },
        ],
        practiceQuestions: [
          {
            question:
              "איך יוצרים grid של 4 עמודות עם רווח?",
            answer:
              "<div className='grid grid-cols-4 gap-4'>...</div>",
          },
        ],
      },
    },

    // ─── 6. padding (difficulty 3) ───
    {
      conceptName: "padding",
      difficulty: 3,
      levels: {
        grandma:
          "padding זה רווח פנימי — בין הגבול של הקופסה לתוכן. כמו ריפוד בקופסת קרטון.",
        child:
          "אם תכתוב טקסט בלי padding, הוא יידבק לקצה. עם padding — יש 'אוויר' מסביב.",
        soldier:
          "Tailwind: p-4 = padding בכל הצדדים. px-* = horizontal (left+right). py-* = vertical. pt/pr/pb/pl לכיוון בודד.",
        student:
          "מערכת מספרים אחידה: 1 = 0.25rem (4px), 2 = 0.5rem, 4 = 1rem, 8 = 2rem. ערכים מ-0 עד 96. גם value מותאם: p-[17px].",
        junior:
          "הכלל הזהב: p-4 (1rem) הוא ברירת מחדל בריאה. לכפתורים — px-4 py-2. לכרטיסים — p-6.",
        professor:
          "Spacing scale based on rem (browser font size). Default: 0.25rem step. Configurable via tailwind.config.",
      },
      illustration:
        "📦 padding — רווח פנימי:\n\n" +
        "  p-4 = כל הצדדים\n" +
        "  px-4 = שמאל וימין\n" +
        "  py-2 = למעלה ולמטה\n" +
        "  pt-8 = רק למעלה",
      codeExample:
        "<button className='\n" +
        "  px-4 py-2          // padding\n" +
        "  bg-blue-500\n" +
        "  text-white\n" +
        "  rounded\n" +
        "'>\n" +
        "  לחץ\n" +
        "</button>",
      codeExplanation:
        "px-4 = padding-left + padding-right של 1rem. py-2 = padding-top + padding-bottom של 0.5rem. דפוס סטנדרטי לכפתורים.",
    },

    // ─── 7. bg color (difficulty 3) ───
    {
      conceptName: "bg color",
      difficulty: 3,
      levels: {
        grandma:
          "bg = background = רקע. bg-blue-500 = רקע כחול בעוצמה 500.",
        child:
          "bg-red-300 = רקע ורוד-אדום. bg-red-700 = אדום כהה. המספרים = עוצמה.",
        soldier:
          "Tailwind colors: bg-{color}-{shade}. shade: 50, 100, 200, ..., 900. 500 = ה-shade הראשי.",
        student:
          "Palette מובנית: red, blue, green, gray, yellow, orange, pink, purple, indigo, teal. עם 11 shades לכל אחד.",
        junior:
          "המלצות: רקעי buttons primary = blue-500/600, secondary = gray-200. text על רקעים כהים = white. hover: בד\"כ +100 (bg-blue-600 → 700).",
        professor:
          "Color tokens defined in tailwind.config.js theme. Customizable; supports CSS color functions, RGB/RGBA, HSL.",
      },
      illustration: "🎨 bg color — צבעי רקע:\n\n  bg-red-100  → ורוד מאוד בהיר\n  bg-red-500  → אדום סטנדרטי\n  bg-red-900  → אדום כהה",
      codeExample:
        "<div className='bg-blue-500 text-white p-4 rounded'>\n" +
        "  כרטיס כחול\n" +
        "</div>\n\n" +
        "<button className='bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded'>\n" +
        "  שמירה\n" +
        "</button>",
      codeExplanation:
        "bg-blue-500 = רקע כחול. text-white = טקסט לבן. בכפתור: hover:bg-green-700 = כהה ב-hover. דפוס נפוץ.",
    },

    // ─── 8. rounded (difficulty 2) ───
    {
      conceptName: "rounded",
      difficulty: 2,
      levels: {
        grandma:
          "rounded = פינות מעוגלות. במקום ריבוע חד — פינות עגולות.",
        child:
          "rounded-full = עיגול מלא. rounded = פינות קטנות. rounded-lg = פינות גדולות.",
        soldier:
          "border-radius. ערכים: none, sm, default, md, lg, xl, 2xl, 3xl, full.",
        student:
          "rounded-{value} מקבע border-radius. rounded-full = 9999px (עיגול). rounded-r-lg = רק ימין.",
        junior:
          "כפתורים: rounded או rounded-lg. Avatar: rounded-full. כרטיסים: rounded-xl או rounded-2xl למודרני.",
        professor:
          "border-radius utility scaled to design system. Per-corner variants (rounded-tl-, rounded-tr-, etc).",
      },
      illustration: "🔵 rounded:\n\n  rounded-none = ריבוע חד\n  rounded-md   = פינות בינוניות\n  rounded-full = עיגול מלא",
      codeExample:
        "<button className='px-4 py-2 bg-blue-500 rounded-lg'>סטנדרטי</button>\n" +
        "<img className='w-16 h-16 rounded-full' src='avatar.jpg' />\n" +
        "<div className='p-4 bg-white rounded-2xl shadow'>כרטיס מודרני</div>",
      codeExplanation:
        "rounded-lg לכפתורים, rounded-full לאווטרים, rounded-2xl לכרטיסים — כללי אצבע.",
    },

    // ─── 9. Tailwind installation (difficulty 4) ───
    {
      conceptName: "Tailwind installation",
      difficulty: 4,
      levels: {
        grandma:
          "התקנת Tailwind = להוסיף את הספרייה לפרויקט. כמה פקודות, וזה מוכן לשימוש.",
        child:
          "אחרי ההתקנה, אפשר לכתוב className='bg-blue-500' וזה עובד.",
        soldier:
          "ב-Vite: npm install -D tailwindcss postcss autoprefixer + npx tailwindcss init -p. עורכים tailwind.config.js, מוסיפים @tailwind ל-CSS.",
        student:
          "התהליך: 1) install. 2) tailwind.config + postcss.config. 3) הגדרת content paths. 4) @tailwind base/components/utilities ב-index.css. 5) import './index.css' ב-main.jsx.",
        junior:
          "המלכודות: לשכוח לעדכן content array → ה-classes לא נטמעים. שכחת @tailwind directives → CSS ריק. always check tailwind.config.js content path matches your src.",
        professor:
          "PostCSS plugin pipeline + JIT compiler. Content paths required for tree-shaking; only used classes ship to production.",
      },
      illustration: "📥 התקנת Tailwind ב-Vite:\n\n  1. npm install -D tailwindcss postcss autoprefixer\n  2. npx tailwindcss init -p\n  3. עדכון tailwind.config.js (content paths)\n  4. @tailwind ב-index.css\n  5. import index.css ב-main.jsx",
      codeExample:
        "// tailwind.config.js\n" +
        "export default {\n" +
        "  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],\n" +
        "  theme: { extend: {} },\n" +
        "  plugins: [],\n" +
        "};\n\n" +
        "// index.css\n" +
        "@tailwind base;\n" +
        "@tailwind components;\n" +
        "@tailwind utilities;",
      codeExplanation:
        "content מצביע על הקבצים שיש לסרוק לחיפוש classes. ה-@tailwind directives מציבים את הסטיילים ב-CSS הסופי.",
    },

    // ─── 10. rating (difficulty 5) ───
    {
      conceptName: "rating",
      difficulty: 5,
      levels: {
        grandma:
          "rating = דירוג. בפרויקט הסרטים, כל סרט מקבל ציון (כוכבים, מ-1 עד 5).",
        child:
          "כפתורי כוכב — לוחצים, וזה מציין את הדירוג שלך.",
        soldier:
          "ב-React: useState({rating}) + map ליצירת כוכבים + onClick מעדכן. כל כוכב = button או div עם onClick.",
        student:
          "Component יכולה להחזיק את הדירוג כ-state, או לקבל אותו כ-prop ולקרוא ל-onChange. הדפוס controlled component.",
        junior:
          "מימוש שכיח: 5 כוכבים, hover מציג preview, click שומר. שימוש ב-conditional rendering לכוכב מלא/ריק.",
        professor:
          "Stateful interactive component encapsulating rating UX. Common patterns: half-star precision, hover preview, accessible (aria-label).",
      },
      illustration: "⭐ rating component:\n\n  ⭐⭐⭐☆☆  (3/5)\n  כל כוכב = button\n  onClick → setRating(idx + 1)",
      codeExample:
        "function StarRating({ value, onChange }) {\n" +
        "  return (\n" +
        "    <div className='flex gap-1'>\n" +
        "      {[1,2,3,4,5].map(n => (\n" +
        "        <button\n" +
        "          key={n}\n" +
        "          onClick={() => onChange(n)}\n" +
        "          className={n <= value ? 'text-yellow-500' : 'text-gray-300'}\n" +
        "        >★</button>\n" +
        "      ))}\n" +
        "    </div>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "5 כפתורים, כל אחד עם מספר 1-5. אם מספר הכוכב <= value — צבע צהוב. אחרת — אפור. לחיצה מטריגה onChange עם הציון.",
    },

    // ─── 11. search (difficulty 5) ───
    {
      conceptName: "search",
      difficulty: 5,
      levels: {
        grandma:
          "search = חיפוש. שדה טקסט שכשמקלידים — הרשימה מתסננת ומציגה רק תואמים.",
        child:
          "כותבים 'הארי' בשדה — הרשימה מסננת רק סרטים עם 'הארי'.",
        soldier:
          "useState ל-query + filter על המערך לפי includes(query). כל שינוי ב-input מעדכן את ה-state ומסנן מחדש.",
        student:
          "Real-time filtering בלולאה: input → state → filter → render. נפוץ עם debounce ל-API search כדי לא להפציץ את השרת.",
        junior:
          "case-insensitive חשוב: title.toLowerCase().includes(query.toLowerCase()). לארזרים גדולים — useMemo על הסינון.",
        professor:
          "Filter pattern with controlled input. For large datasets, debounce/throttle, server-side search, or virtualization.",
      },
      illustration: "🔍 search — סינון:\n\n  query='הארי'\n  movies.filter(m => m.title.includes(query))\n      ↓\n  רשימה מסוננת",
      codeExample:
        "function MovieList({ movies }) {\n" +
        "  const [query, setQuery] = useState('');\n" +
        "  const filtered = movies.filter(m =>\n" +
        "    m.title.toLowerCase().includes(query.toLowerCase())\n" +
        "  );\n" +
        "  return (\n" +
        "    <>\n" +
        "      <input\n" +
        "        value={query}\n" +
        "        onChange={e => setQuery(e.target.value)}\n" +
        "        placeholder='חיפוש...'\n" +
        "      />\n" +
        "      <ul>{filtered.map(m => <li key={m.id}>{m.title}</li>)}</ul>\n" +
        "    </>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "input מעדכן state, filter מסנן את הסרטים, ה-list מציג רק את התואמים. כל הקלדה — סינון מיידי.",
    },

    // ─── 12. add/delete movie (difficulty 6) ───
    {
      conceptName: "add/delete movie",
      difficulty: 6,
      levels: {
        grandma:
          "להוסיף סרט = לכפתור 'הוסף' שיוצר סרט חדש ברשימה. למחוק = כפתור 'מחק' לכל סרט שמסיר אותו.",
        child:
          "פעולות בסיסיות של CRUD: Create (הוסף), Delete (מחק). כל אחת — פונקציה שמעדכנת את ה-state.",
        soldier:
          "addMovie: setMovies(prev => [...prev, newMovie]). deleteMovie: setMovies(prev => prev.filter(m => m.id !== id)). תמיד immutable!",
        student:
          "Pattern of immutable list ops. spread להוספה, filter למחיקה, map לעדכון. ID יציב חיוני לזיהוי.",
        junior:
          "המלכודות: לעשות movies.push(...) ו-setMovies(movies) — לא ירונדר. תמיד spread/filter יוצרים מערך חדש.",
        professor:
          "CRUD operations on state arrays via immutable transformations: append (concat/spread), remove (filter), update (map).",
      },
      illustration: "➕➖ add/delete:\n\n  add: setMovies([...prev, newMovie])\n  del: setMovies(prev.filter(m => m.id !== id))",
      codeExample:
        "function MovieApp() {\n" +
        "  const [movies, setMovies] = useState([]);\n" +
        "  const addMovie = (title) => {\n" +
        "    setMovies(prev => [...prev, { id: Date.now(), title }]);\n" +
        "  };\n" +
        "  const deleteMovie = (id) => {\n" +
        "    setMovies(prev => prev.filter(m => m.id !== id));\n" +
        "  };\n" +
        "  return movies.map(m => (\n" +
        "    <div key={m.id}>\n" +
        "      {m.title}\n" +
        "      <button onClick={() => deleteMovie(m.id)}>🗑</button>\n" +
        "    </div>\n" +
        "  ));\n" +
        "}",
      codeExplanation:
        "addMovie מוסיף ל-state עם id ייחודי. deleteMovie מסנן את ה-id. שני המקרים — immutable updates.",
      extras: {
        moreExamples: [
          {
            code:
              "// edit (update)\n" +
              "const editMovie = (id, newTitle) => {\n" +
              "  setMovies(prev => prev.map(m =>\n" +
              "    m.id === id ? { ...m, title: newTitle } : m\n" +
              "  ));\n" +
              "};",
            explanation:
              "map יוצר מערך חדש. הסרט עם ה-id המתאים — אובייקט חדש עם title מעודכן. שאר הסרטים — בלי שינוי.",
          },
        ],
        pitfalls: [
          {
            mistake: "movies.push(newMovie); setMovies(movies)",
            why: "אותה הפניה למערך — React מדלג על re-render.",
            fix: "setMovies(prev => [...prev, newMovie])",
          },
        ],
        practiceQuestions: [
          {
            question:
              "איך מוחקים סרט לפי id?",
            answer:
              "setMovies(prev => prev.filter(m => m.id !== idToDelete))",
          },
        ],
      },
    },

    // ─── 13. validation (difficulty 5) ───
    {
      conceptName: "validation",
      difficulty: 5,
      levels: {
        grandma:
          "validation = בדיקה. לפני שמוסיפים סרט, בודקים שהשדה לא ריק, השם לא קצר מדי, וכו'.",
        child:
          "אם הקלדת שם של סרט קצר מדי — האפליקציה מתריעה במקום לאפשר.",
        soldier:
          "Validation על הקלט. אם תקין — מוסיפים. אם לא — מציגים error message. בד\"כ ב-onSubmit / onClick של 'הוסף'.",
        student:
          "Client-side validation: trimmed length, regex, type checks. הצגת errors ב-state נפרד. גם server-side validation חיוני (למניעת bypass).",
        junior:
          "ספריות עזר: react-hook-form + zod. או yup. מקצרות בוילרפלייט עצום. לפרויקט קטן — בדיקה ידנית מספיקה.",
        professor:
          "Form validation strategies: synchronous (regex/length), async (server check), schema-based (zod/yup). UX: inline errors, disabled submit.",
      },
      illustration: "✅ validation — בדיקה לפני שמירה:\n\n  user input → validate → error או submit\n                ↓\n              {error && <span className='text-red'>...</span>}",
      codeExample:
        "function AddMovie({ onAdd }) {\n" +
        "  const [title, setTitle] = useState('');\n" +
        "  const [error, setError] = useState('');\n" +
        "  const submit = () => {\n" +
        "    if (!title.trim()) {\n" +
        "      setError('שם הסרט חובה');\n" +
        "      return;\n" +
        "    }\n" +
        "    if (title.length < 2) {\n" +
        "      setError('שם קצר מדי');\n" +
        "      return;\n" +
        "    }\n" +
        "    onAdd(title);\n" +
        "    setTitle('');\n" +
        "    setError('');\n" +
        "  };\n" +
        "  return (\n" +
        "    <div>\n" +
        "      <input value={title} onChange={e => setTitle(e.target.value)} />\n" +
        "      {error && <span className='text-red-500'>{error}</span>}\n" +
        "      <button onClick={submit}>הוסף</button>\n" +
        "    </div>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "הפונקציה submit בודקת תקינות. אם שגוי — שומרת error ל-state ומציגה. אם תקין — מוסיפה ומאפסת.",
    },

    // ─── 14. navbar (difficulty 4) ───
    {
      conceptName: "navbar",
      difficulty: 4,
      levels: {
        grandma:
          "navbar = פס ניווט. הסרגל שמופיע למעלה באתר עם הקישורים והלוגו.",
        child:
          "הפס העליון בכל אתר — שם הלוגו, ויש לחצנים לעמודים שונים.",
        soldier:
          "Navbar הוא קומפוננטה. בד\"כ flex container עם logo + links. responsive — burger menu ב-mobile.",
        student:
          "דפוס סטנדרטי: <nav> עם flex justify-between. שמאל — logo/title. ימין — links + actions. ב-mobile — burger.",
        junior:
          "ב-Tailwind: <nav className='flex items-center justify-between p-4 bg-gray-900 text-white'>. עם react-router: <Link to='/'>Home</Link>.",
        professor:
          "Common UI pattern; semantic <nav> element with appropriate ARIA. Responsive design via flex + hidden/visible breakpoint utilities.",
      },
      illustration:
        "🧭 navbar — מבנה:\n\n" +
        "  ┌──────────────────────┐\n" +
        "  │ Logo  | Home Movies  │\n" +
        "  └──────────────────────┘\n" +
        "  flex justify-between",
      codeExample:
        "function Navbar() {\n" +
        "  return (\n" +
        "    <nav className='flex items-center justify-between p-4 bg-gray-900 text-white'>\n" +
        "      <h1 className='text-xl font-bold'>🎬 MovieApp</h1>\n" +
        "      <div className='flex gap-4'>\n" +
        "        <Link to='/'>בית</Link>\n" +
        "        <Link to='/movies'>סרטים</Link>\n" +
        "        <Link to='/about'>אודות</Link>\n" +
        "      </div>\n" +
        "    </nav>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "nav semantic + flex לפריסה. items-center אנכי, justify-between — לוגו בקצה, links בקצה השני. Link מ-react-router.",
    },
  ],

  quiz: [
    {
      question: "מה ההבדל בין flex ל-grid?",
      options: [
        "אין הבדל",
        "flex לציר אחד (שורה/עמודה). grid לדו-מימדי (שורות+עמודות). grid עוצמתי יותר אבל מורכב יותר",
        "grid מהיר יותר",
        "flex רק לטקסט",
      ],
      correct: 1,
      explanation:
        "flex = layout חד-מימדי (navbar, button row). grid = דו-מימדי (גלריה, dashboard). שניהם CSS standards.",
    },
    {
      question: "מה הסדר הנכון להוספת פריט למערך state?",
      options: [
        "items.push(x); setItems(items)",
        "setItems([...items, x])",
        "items[items.length] = x",
        "setItems(x)",
      ],
      correct: 1,
      explanation:
        "spread יוצר מערך חדש = הפניה חדשה → React מתרענן. push משנה במקום ולא יעבוד.",
    },
    {
      question: "מה Tailwind בקיצור?",
      options: [
        "ספריית React",
        "Utility-first CSS framework — utility classes לכל property",
        "מסד נתונים",
        "linter",
      ],
      correct: 1,
      explanation:
        "Tailwind = atomic CSS. כל class הוא 'מילה' שמטפלת ב-property יחיד. מרכיבים את הסגנון ב-className.",
    },
    {
      question: "ב-Tailwind, מה משמעות md:flex?",
      options: [
        "תמיד flex",
        "flex רק ב-mobile",
        "flex רק במסך בינוני (768px+) ומעלה — mobile-first",
        "flex רק ב-desktop גדול",
      ],
      correct: 2,
      explanation:
        "Tailwind mobile-first. ה-prefix md: מחיל את ה-class ממסך 768px ומעלה. ללא prefix = mobile + הכל.",
    },
    {
      question: "איך מסננים רק סרטים שהכותרת מכילה את ה-query?",
      options: [
        "movies.search(query)",
        "movies.filter(m => m.title.includes(query))",
        "movies.find(query)",
        "אין דרך",
      ],
      correct: 1,
      explanation:
        "filter מחזיר מערך חדש עם פריטים שמתאימים לתנאי. עם case-insensitive: .toLowerCase() על שניהם.",
    },
  ],
};
