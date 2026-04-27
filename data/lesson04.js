// data/lesson04.js — שיעור 04: CSS Grid & Flexbox
// יסודות layout. מבחן: 8-10 שאלות צפויות.
var LESSON_04 = {
  id: "lesson_04",
  title: "שיעור 04 — CSS Grid + Flexbox",
  description:
    "Flexbox לסידור שורה/עמודה, Grid לסידור 2D — שני הכלים המרכזיים ל-layout מודרני.",
  concepts: [
    {
      conceptName: "flexbox",
      difficulty: 5,
      levels: {
        grandma: "Flexbox = דרך לסדר אלמנטים בשורה או עמודה — אוטומטית מחלק שטח, מיישר.",
        child: "כמו ארגון של ילדים בשורה — כולם זוקפים, או צמודים לשמאל, או מפוזרים שווה.",
        soldier: "display: flex על parent → ילדים נסדרים בציר ראשי (default: row). justify-content + align-items שולטים בסידור.",
        student: "Flexbox = 1D layout (שורה או עמודה). Container properties: display, flex-direction, justify-content, align-items, flex-wrap, gap. Item properties: flex-grow, flex-shrink, flex-basis, order.",
        junior: "פעם השתמשתי ב-float ו-margin: auto לסדר navbar — fragile. עברתי ל-flex עם justify-content: space-between — 2 שורות, עובד תמיד.",
        professor: "Flexbox model: main axis (flex-direction) + cross axis. Algorithm: flex factor distribution after content sizing. Modern fallback: gap (Safari 14.1+, others earlier).",
      },
      illustration:
        "📐 Flexbox axes:\n  flex-direction: row\n    ← main axis →\n    [A] [B] [C]\n    ↕ cross axis (vertical when row)",
      codeExample:
        ".container {\n  display: flex;\n  flex-direction: row;            /* row | column | row-reverse */\n  justify-content: space-between; /* start | center | end | space-between | space-around | space-evenly */\n  align-items: center;            /* start | center | end | stretch | baseline */\n  flex-wrap: wrap;                /* nowrap (default) | wrap */\n  gap: 1rem;                      /* spacing בין items */\n}\n\n.item {\n  flex: 1;            /* flex-grow: 1 = שווה */\n  /* או: flex-grow: 2 (כפול), flex-basis: 200px (initial size) */\n}",
      codeExplanation: "flex-direction = ציר ראשי. justify-content = יישור על ציר ראשי. align-items = יישור על cross. gap מחליף margin. flex: 1 על items = חלוקה שווה.",
    },
    {
      conceptName: "justify-content",
      difficulty: 4,
      levels: {
        grandma: "איך לפזר את האלמנטים על הציר הראשי — צמודים לשמאל, מרכז, מפוזרים שווה.",
        child: "ילדים בשורה: דחוסים בצד? במרכז? כולם רחוקים שווה?",
        soldier: "justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly.",
        student: "justify-content distributes items along main axis. space-between: רווח שווה בין (לא בקצוות). space-around: רווח שווה כולל בקצוות (חצי). space-evenly: רווח שווה לחלוטין.",
        junior: "תמיד התבלבלתי between/around/evenly. תרגיל: 3 איברים, 100% רוחב, between → 0/X/Y/X/0; around → X/2A/X/2A/X; evenly → X/X/X/X (כולם שווים).",
        professor: "justify-content algorithm: free space = container - sum of items. Distributes free space per setting. Doesn't affect cross axis (use align-content for multi-line).",
      },
      illustration:
        "📊 justify-content (3 items):\n  flex-start:    [A][B][C]·····\n  center:        ···[A][B][C]···\n  flex-end:      ·····[A][B][C]\n  space-between: [A]···[B]···[C]\n  space-around:  ·[A]·[B]·[C]·\n  space-evenly:  ··[A]··[B]··[C]··",
      codeExample:
        ".navbar {\n  display: flex;\n  justify-content: space-between;\n}\n/* logo בצד אחד, links בשני */\n\n.cards {\n  display: flex;\n  justify-content: space-evenly;\n}\n/* רווח שווה לחלוטין כולל מהקצוות */",
      codeExplanation: "space-between לוגו+nav (בשני הקצוות). space-evenly לאיברים מפוזרים שווה כולל בקצוות.",
    },
    {
      conceptName: "align-items",
      difficulty: 4,
      levels: {
        grandma: "יישור על הציר השני — מעלה, אמצע, מטה (כשציר ראשי הוא שורה).",
        child: "ילדים בשורה — בגובה הראש, בגובה הברך, בגובה הרצפה?",
        soldier: "align-items: flex-start | center | flex-end | stretch | baseline. ניגוד ל-justify-content (שעובד על ציר ראשי).",
        student: "align-items על cross-axis. stretch (default) ממלא גובה container. baseline מיישר על baselines של טקסטים — שימושי לכותרות בגדלים שונים.",
        junior: "פעם רציתי לרכז אנכית — height: 100% + line-height + מתמטיקה. עכשיו: justify-content: center + align-items: center = 2 שורות, חיים יפים.",
        professor: "align-items default = stretch (fills cross axis if no explicit size). For align-self per-item override. baseline aligns on text baselines (typography purposes).",
      },
      illustration:
        "📊 align-items (cross axis):\n  flex-start:  [A] [B] [C]    (top)\n               ──────────────\n  center:      ──────────────\n               [A] [B] [C]    (middle)\n               ──────────────\n  stretch:     [A] [B] [C]    (full height)",
      codeExample:
        ".center-everything {\n  display: flex;\n  justify-content: center;  /* horizontal */\n  align-items: center;      /* vertical */\n  min-height: 100vh;\n}\n\n/* כותרות עם baseline-aligned */\n.heading-row {\n  display: flex;\n  align-items: baseline;\n  gap: 1rem;\n}\n/* טקסטים בגדלים שונים — baselines מתואמים */",
      codeExplanation: "השילוב של justify-content + align-items מרכז completely. baseline ל-typography.",
    },
    {
      conceptName: "CSS Grid",
      difficulty: 6,
      levels: {
        grandma: "Grid = רשת של שורות ועמודות שאתה מצייר. כל אלמנט מקבל מקום שלו ברשת.",
        child: "שולחן עם משבצות — כל ילד שב באחת. אתה קובע כמה שורות וכמה עמודות.",
        soldier: "display: grid + grid-template-columns + rows. תאים אוטומטיים (לפי order של ילדים) או נתוצים (grid-area).",
        student: "Grid = 2D layout. grid-template-columns/rows: 1fr 2fr 1fr / 100px auto. grid-template-areas שמית. gap. align/justify-items + content.",
        junior: "ליצור layout של 3 עמודות עם flexbox = פיזר. Grid: grid-template-columns: 1fr 2fr 1fr; gap: 1rem; — שורה אחת, עובד תמיד.",
        professor: "Grid 2-D layout: explicit (template) + implicit (auto-rows/columns). Track sizing: fr (fraction), minmax(200px, 1fr), auto, content-based. subgrid (newer) for nested alignment.",
      },
      illustration:
        "🔲 Grid 3x2:\n  grid-template-columns: 1fr 2fr 1fr;\n  grid-template-rows: 100px auto;\n  → ┌──┬────┬──┐\n     │  │    │  │\n     ├──┼────┼──┤\n     │  │    │  │\n     └──┴────┴──┘",
      codeExample:
        ".grid {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;     /* 3 עמודות, אמצע פעמיים גדול */\n  grid-template-rows: 100px auto 50px;     /* header / main / footer */\n  gap: 1rem;\n  min-height: 100vh;\n}\n\n/* Layout אוטומטי */\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  /* כל קלף לפחות 200px, ככל שייכנס */\n  gap: 1rem;\n}\n\n/* Named areas */\n.app {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-rows: 60px 1fr 50px;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar main\"\n    \"footer footer\";\n}\n.app > header  { grid-area: header; }\n.app > aside   { grid-area: sidebar; }\n.app > main    { grid-area: main; }\n.app > footer  { grid-area: footer; }",
      codeExplanation: "fr = fraction. repeat(auto-fill, minmax) = responsive grid אוטומטי. grid-template-areas = layout שמי, קל לקרוא.",
    },
    {
      conceptName: "fr unit",
      difficulty: 5,
      levels: {
        grandma: "fr = חלק. '1fr 2fr' = העמודה השנייה כפולה מהראשונה.",
        child: "חלוקה של עוגה — 1 חלק לאחיין הקטן, 2 חלקים לאח הגדול.",
        soldier: "fr (fractional unit) — חלק יחסי של רוחב הזמין אחרי הפחתת fixed columns.",
        student: "fr distributes remaining free space proportionally. Calculation: subtract fixed/auto widths first, then distribute. minmax(min, max) זהיר עם fr.",
        junior: "פעם השתמשתי ב-% — overflow אם sum>100. עכשיו fr — אוטומטי שווה ל-100% של מה שיש.",
        professor: "fr behavior: free-space distribution after fixed sizes resolved. minmax(0, 1fr) prevents overflow when content > track. Implicit width: 1fr = 100% / count.",
      },
      illustration:
        "📊 fr distribution (1000px container):\n  '200px 1fr 1fr' → 200 | 400 | 400\n  '1fr 2fr 1fr'   → 250 | 500 | 250\n  '1fr 1fr 1fr'   → 333 | 333 | 333",
      codeExample:
        ".layout {\n  display: grid;\n  grid-template-columns: 200px 1fr 1fr;\n  /* sidebar 200px קבוע, שאר נחלק שווה */\n}\n\n.three-col-equal {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  /* 3 שווים */\n}\n\n.golden {\n  display: grid;\n  grid-template-columns: 1fr 1.618fr;\n  /* יחס זהב */\n}\n\n.responsive {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));\n  /* responsive — minmax(0,1fr) מונע overflow */\n}",
      codeExplanation: "fr חלוקה יחסית. עירוב עם px (sidebar קבוע + תוכן fr). minmax(0, 1fr) למניעת overflow.",
    },
    {
      conceptName: "auto-fit / auto-fill",
      difficulty: 7,
      levels: {
        grandma: "Grid שמתאים את עצמו אוטומטית — כמה עמודות שאפשר ליצור ברוחב שיש.",
        child: "שולחן שצומח עם הכיתה — תוסיף ילדים ויהיו עוד מקומות.",
        soldier: "repeat(auto-fit, minmax(200px, 1fr)) = כמה עמודות שיכולות להיכנס, כל אחת לפחות 200px.",
        student: "auto-fill: מילוי מקסימלי, גם עם empty tracks. auto-fit: מילוי, אבל מחסל empty tracks ומותח את הקיימים. שניהם dynamic — משתנה עם viewport.",
        junior: "תמיד התבלבלתי בין fit ו-fill. עכשיו אני זוכר: fill = ממלא שטח עם רכיבים גם empty. fit = מתאים את הרכיבים הקיימים — אם יש 3 רכיבים, יחלק ביניהם.",
        professor: "auto-fill creates as many tracks as fit; empty tracks remain. auto-fit collapses empty tracks (treated as zero width), allowing remaining items to expand. Difference visible only when items < tracks.",
      },
      illustration:
        "🎯 auto-fit vs auto-fill (3 items, 1000px wide, minmax 200px):\n  auto-fill: [200][200][200][200][200] (5 tracks, 2 empty)\n  auto-fit:  [333][333][333]·· (3 tracks, items grow)",
      codeExample:
        "/* Responsive grid אוטומטי */\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}\n/* mobile: עמודה אחת. tablet: 2-3. desktop: 4. אין צורך ב-@media! */\n\n/* כשרוצים ש-empty tracks יישמרו (rare): */\n.fixed-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n}\n/* תמיד יש 4 tracks (אם רוחב מאפשר), גם אם רק 2 items */",
      codeExplanation: "auto-fit ל-grid responsive — items נמתחים. auto-fill למבנה קבוע. minmax(250px, 1fr) = מינימום 250, מקסימום שווה.",
    },
    {
      conceptName: "Flexbox vs Grid",
      difficulty: 6,
      levels: {
        grandma: "Flexbox לשורה/עמודה (1D). Grid לטבלה (2D).",
        child: "Flexbox = שורה של ילדים. Grid = שולחן עם שורות ועמודות.",
        soldier: "Flexbox: 1D layout (axis אחד). Grid: 2D layout (אחס + cross). שילוב: Grid לכלל, Flex לפנים של ride.",
        student: "Flexbox: content-first, items distribute on 1 axis. Grid: layout-first, define grid then place items in 2D. Use Grid for page layout, Flex for components.",
        junior: "התחלתי עם flex לכל דבר — page layout עם flex היה כאוס. עברתי ל-Grid לpage + Flex לרכיבים בתוכו (navbar, button group). הקוד הרבה יותר נקי.",
        professor: "Flex = item-driven sizing (content-out). Grid = container-driven sizing (layout-in). Hybrid: Grid for page-level, Flex for component-level. align/justify properties identical (both for sub-axis distribution).",
      },
      illustration:
        "🆚 Flex vs Grid:\n  Flex (1D):  [A] [B] [C]    שורה או עמודה\n  Grid (2D):  ┌─┬─┬─┐\n              ├─┼─┼─┤    שורות + עמודות\n              └─┴─┴─┘",
      codeExample:
        "/* Page layout — Grid */\n.app {\n  display: grid;\n  grid-template-areas:\n    \"header header\"\n    \"nav    main\"\n    \"footer footer\";\n  grid-template-columns: 200px 1fr;\n  grid-template-rows: auto 1fr auto;\n  min-height: 100vh;\n}\n\n/* Navbar item — Flex */\n.app > header {\n  grid-area: header;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n}\n\n/* Cards section — Grid */\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}\n\n/* Card buttons — Flex */\n.card .actions {\n  display: flex;\n  gap: 0.5rem;\n}",
      codeExplanation: "Grid למסגרת הדף. Flex לקומפוננטות בתוכו. שילוב = הדרך הנפוצה.",
    },
  ],
};
