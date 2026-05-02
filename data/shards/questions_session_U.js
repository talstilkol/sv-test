// data/shards/questions_session_U.js
// Sprint 2 batch U — CSS coverage
// 50 questions: 35 MC + 15 Fill

window.QUESTIONS_SHARD_U = {
  mc: [
    // ─── HTML Foundations ───
    {
      id: "mc_html_doc_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::HTML document",
      level: 4,
      question: "DOCTYPE declaration:",
      options: [
        "<!DOCTYPE html> — מודיע לדפדפן על HTML5 standards mode",
        "deprecated",
        "browser auto",
        "after body"
      ],
      correctIndex: 0,
      explanation: "First line of every HTML5 doc.",
      optionFeedback: [
        "✅ נכון. חיוני למצב standards.",
        "❌ נדרש.",
        "❌ ידני.",
        "❌ first line."
      ]
    },
    {
      id: "mc_html_semantic_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::semantic HTML",
      level: 5,
      question: "Semantic HTML benefits:",
      options: [
        "SEO + accessibility + maintenance — header/main/article > div soup",
        "מהיר יותר",
        "פחות bytes",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "Tags עם משמעות עוזרות screen readers ומנועי חיפוש.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ זה לא הסיבה.",
        "❌ דומה ב-bytes.",
        "❌ recommended."
      ]
    },
    {
      id: "mc_html_form_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::HTML form",
      level: 5,
      question: "<form> action attribute:",
      options: [
        "URL לpost — אם ריק, posts לאותה page",
        "method",
        "JavaScript only",
        "ignored"
      ],
      correctIndex: 0,
      explanation: "Server-side handler URL.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ method הוא GET/POST.",
        "❌ legitimate HTML.",
        "❌ active."
      ]
    },
    {
      id: "mc_html_label_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::label",
      level: 4,
      question: "<label for='email'>:",
      options: [
        "Associates label עם input id='email'. click on label focuses input. a11y critical.",
        "decorative only",
        "deprecated",
        "JS only"
      ],
      correctIndex: 0,
      explanation: "אחת מהכללים החשובים ב-a11y.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ פונקציונלי.",
        "❌ אפשרות לגיטימית בקונטקסטים אחרים, אבל לא תשובה נכונה כאן.",
        "❌ HTML element."
      ]
    },
    {
      id: "mc_css_selector_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::CSS selector",
      level: 5,
      question: "CSS selector specificity priority:",
      options: [
        "inline style > #id > .class > tag",
        "tag > class > id",
        "alphabetic",
        "no priority"
      ],
      correctIndex: 0,
      explanation: "Specificity numbers: (1,0,0,0)/(0,1,0,0)/(0,0,1,0)/(0,0,0,1).",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ ההפך.",
        "❌ specificity.",
        "❌ priority חיוני."
      ]
    },
    {
      id: "mc_css_cascade_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::cascade and specificity",
      level: 7,
      question: "CSS cascade priority:",
      options: [
        "importance → specificity → source order",
        "alphabetic",
        "first wins",
        "last wins always"
      ],
      correctIndex: 0,
      explanation: "Three-way conflict resolution.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ specific algorithm.",
        "❌ depends.",
        "❌ only with same specificity."
      ]
    },
    {
      id: "mc_css_box_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::box model",
      level: 5,
      question: "Box model layers:",
      options: [
        "content → padding → border → margin (פנים → חוץ)",
        "margin → border → padding → content",
        "all merged",
        "no layers"
      ],
      correctIndex: 0,
      explanation: "Standard W3C box model.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ הפוך.",
        "❌ separate.",
        "❌ structured."
      ]
    },
    {
      id: "mc_css_boxsize_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::box model",
      level: 6,
      question: "box-sizing: border-box:",
      options: [
        "width = content + padding + border (אינטואיטיבי)",
        "width = content (default)",
        "ignore padding",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "Recommended global rule: * { box-sizing: border-box; }.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ זה content-box (default).",
        "❌ padding נכלל.",
        "❌ universally used."
      ]
    },
    {
      id: "mc_css_a11y_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::accessibility basics",
      level: 6,
      question: "Color contrast WCAG AA:",
      options: [
        "≥ 4.5:1 for normal text. ≥ 3:1 for large text",
        "≥ 1:1",
        "any",
        "≥ 10:1"
      ],
      correctIndex: 0,
      explanation: "axe-core/Lighthouse measure this.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ rotation.",
        "❌ matters.",
        "❌ standards-set."
      ]
    },
    // ─── Tailwind CSS ───
    {
      id: "mc_tailwind_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::Tailwind CSS",
      level: 5,
      question: "Tailwind CSS:",
      options: [
        "Utility-first — small classes lieu of custom CSS",
        "Component library",
        "preprocessor",
        "framework"
      ],
      correctIndex: 0,
      explanation: "Atomic CSS approach.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ shadcn = component lib.",
        "❌ Tailwind generates CSS at build.",
        "❌ Tailwind הוא utility-first lib — מספק בסיס CSS מודולרי, לא framework מלא כמו Bootstrap."
      ]
    },
    {
      id: "mc_tw_utility_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::utility classes",
      level: 5,
      question: "Utility classes:",
      options: [
        "Single-purpose CSS classes (e.g., .text-center, .p-4)",
        "Component classes",
        "Animations only",
        "Inline styles"
      ],
      correctIndex: 0,
      explanation: "stack many to compose.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ אפשרות לא רלוונטית — מתייחסת לרעיון שונה ולא ל-utility classes.",
        "❌ זה תת-קבוצה ספציפית, לא ההגדרה המלאה של utility classes.",
        "❌ Tailwind utilities הן CSS classes רגילות עם naming convention ספציפי."
      ]
    },
    {
      id: "mc_tw_responsive_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::responsive design",
      level: 6,
      question: "Tailwind responsive prefixes:",
      options: [
        "sm: (640px+) md: (768px+) lg: (1024px+) — mobile-first",
        "always desktop",
        "fixed sizes",
        "syntax error"
      ],
      correctIndex: 0,
      explanation: "Mobile-first by default.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ Tailwind responsive הוא mobile-first — sm/md/lg מגדירים min-width thresholds.",
        "❌ Tailwind גמיש מאוד — אבל זה לא הסיבה ל-responsive prefixes.",
        "❌ אפשרות לגיטימית בקונטקסטים אחרים, אבל לא תשובה נכונה כאן."
      ]
    },
    {
      id: "mc_tw_dark_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::responsive design",
      level: 6,
      question: "Tailwind dark mode:",
      options: [
        "dark: prefix — `<div class='bg-white dark:bg-gray-900'>`",
        "global toggle",
        "deprecated",
        "JS only"
      ],
      correctIndex: 0,
      explanation: "Variant prefix per element.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ dark mode ב-Tailwind הוא per-element באמצעות variant prefix dark:.",
        "❌ אפשרות לגיטימית בקונטקסטים אחרים, אבל לא תשובה נכונה כאן.",
        "❌ dark mode לא JS-only — Tailwind מטפל ב-CSS via classes."
      ]
    },
    // ─── Flex ───
    {
      id: "mc_css_flex_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::flex",
      level: 5,
      question: "display: flex:",
      options: [
        "1D layout — children align ב-row או column. parent = flex container",
        "2D grid",
        "block",
        "inline"
      ],
      correctIndex: 0,
      explanation: "flexbox = 1D, grid = 2D.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ זה תיאור של display: grid (2D), לא display: flex (1D).",
        "❌ block הוא display ברירת-מחדל ל-div, אבל זה לא flex.",
        "❌ אפשרות שונה ולא קשורה לתפקיד הזה — בחר חלופה מדויקת יותר."
      ]
    },
    {
      id: "mc_css_flex_dir_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::flex",
      level: 5,
      question: "flex-direction values:",
      options: [
        "row, column, row-reverse, column-reverse",
        "horizontal, vertical",
        "left, right, up, down",
        "auto only"
      ],
      correctIndex: 0,
      explanation: "Defines main axis.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ syntax שגוי ל-flex-direction — הערכים הנכונים הם row/column ועוד.",
        "❌ ערכים אלה לא קיימים ב-CSS flex-direction — הערכים הנכונים row/column.",
        "❌ זה תת-קבוצה ספציפית, לא ההגדרה המלאה של utility classes."
      ]
    },
    {
      id: "mc_css_justify_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::flex",
      level: 5,
      question: "justify-content (flex):",
      options: [
        "Aligns items along main axis. Values: center, space-between, space-around, etc.",
        "Cross axis",
        "Vertical only",
        "Sets size"
      ],
      correctIndex: 0,
      explanation: "Main axis alignment.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ זה תיאור של align-items (cross axis), לא של justify-content (main axis).",
        "❌ depends on direction.",
        "❌ אפשרות שונה ולא קשורה לתפקיד הזה — בחר חלופה מדויקת יותר."
      ]
    },
    {
      id: "mc_css_align_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::flex",
      level: 5,
      question: "align-items (flex):",
      options: [
        "Aligns along cross axis. Values: stretch (default), center, flex-start, flex-end, baseline.",
        "Main axis",
        "Sets width",
        "Direction"
      ],
      correctIndex: 0,
      explanation: "Cross axis perpendicular to main.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ זה תיאור של justify-content (main axis), לא של align-items (cross axis).",
        "❌ אפשרות שונה ולא קשורה לתפקיד הזה — בחר חלופה מדויקת יותר.",
        "❌ זה תיאור של flex-direction עצמו, לא של היישור על הצירים."
      ]
    },
    // ─── Grid ───
    {
      id: "mc_css_grid_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::grid",
      level: 6,
      question: "display: grid:",
      options: [
        "2D layout — rows + columns. grid-template-* defines structure",
        "1D",
        "deprecated",
        "block only"
      ],
      correctIndex: 0,
      explanation: "Grid powerful for page layouts.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ זה תיאור של display: flex (1D layout), לא display: grid (2D).",
        "❌ אפשרות לגיטימית בקונטקסטים אחרים, אבל לא תשובה נכונה כאן.",
        "❌ display: grid תומך גם ב-block layout — אך זה לא מוגבל לזה כמו ההגדרה."
      ]
    },
    {
      id: "mc_css_grid_template_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::grid",
      level: 7,
      question: "grid-template-columns: repeat(3, 1fr):",
      options: [
        "3 equal columns. fr = fractional unit (proportional)",
        "3 columns of 1px",
        "3 columns of 1%",
        "syntax error"
      ],
      correctIndex: 0,
      explanation: "fr unit divides remaining space.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ fr הוא יחידה fractional, לא pixels — היא חולקת את השטח החופשי.",
        "❌ fr איננה אחוז — היא יחידה fractional שמתחלקת בין tracks.",
        "❌ אפשרות לגיטימית בקונטקסטים אחרים, אבל לא תשובה נכונה כאן."
      ]
    },
    {
      id: "mc_css_grid_gap_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::grid",
      level: 5,
      question: "gap (in grid/flex):",
      options: [
        "Space between items — replaces margin tricks",
        "Border",
        "Padding",
        "Width"
      ],
      correctIndex: 0,
      explanation: "Modern alternative to margin.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ אפשרות שונה ולא קשורה לתפקיד הזה — בחר חלופה מדויקת יותר.",
        "❌ אפשרות שונה ולא קשורה לתפקיד הזה — בחר חלופה מדויקת יותר.",
        "❌ אפשרות שונה ולא קשורה לתפקיד הזה — בחר חלופה מדויקת יותר."
      ]
    },
    // ─── Padding/Border/Margin ───
    {
      id: "mc_css_padding_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::padding",
      level: 4,
      question: "padding:",
      options: [
        "Inner spacing — between content and border",
        "Outer spacing",
        "Border thickness",
        "Width"
      ],
      correctIndex: 0,
      explanation: "Inside the box.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ זה margin.",
        "❌ זה border.",
        "❌ אפשרות שונה ולא קשורה לתפקיד הזה — בחר חלופה מדויקת יותר."
      ]
    },
    {
      id: "mc_css_margin_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::box model",
      level: 5,
      question: "margin collapse:",
      options: [
        "Vertical margins of adjacent elements collapse to the larger",
        "All margins always sum",
        "no collapse",
        "horizontal too"
      ],
      correctIndex: 0,
      explanation: "Tricky behavior. Disabled in flex/grid.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ collapse.",
        "❌ קיים.",
        "❌ vertical only."
      ]
    },
    // ─── Position ───
    {
      id: "mc_css_position_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::box model",
      level: 6,
      question: "position: relative vs absolute:",
      options: [
        "relative — relative to itself, takes space. absolute — out of flow, relative to nearest positioned ancestor.",
        "אותו דבר",
        "relative = fixed",
        "absolute = static"
      ],
      correctIndex: 0,
      explanation: "Different positioning contexts.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ הבדל מהותי.",
        "❌ אפשרות שונה ולא קשורה לתפקיד הזה — בחר חלופה מדויקת יותר.",
        "❌ אפשרות שונה ולא קשורה לתפקיד הזה — בחר חלופה מדויקת יותר."
      ]
    },
    {
      id: "mc_css_position_fixed_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::box model",
      level: 6,
      question: "position: fixed:",
      options: [
        "Stays in viewport regardless of scroll — modal, sticky header",
        "Same as absolute",
        "Same as relative",
        "Always centered"
      ],
      correctIndex: 0,
      explanation: "Use case: persistent UI elements.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ אפשרות שונה ולא קשורה לתפקיד הזה — בחר חלופה מדויקת יותר.",
        "❌ אפשרות שונה ולא קשורה לתפקיד הזה — בחר חלופה מדויקת יותר.",
        "❌ depends on positioning."
      ]
    },
    {
      id: "mc_css_position_sticky_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::box model",
      level: 7,
      question: "position: sticky:",
      options: [
        "Hybrid — relative until scroll passes top, then fixed",
        "Always sticky",
        "Always relative",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "Modern, requires top/bottom value.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ conditional.",
        "❌ hybrid.",
        "❌ אפשרות לגיטימית בקונטקסטים אחרים, אבל לא תשובה נכונה כאן."
      ]
    },
    // ─── Tailwind specifics ───
    {
      id: "mc_tw_install_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::Tailwind installation",
      level: 5,
      question: "Tailwind setup:",
      options: [
        "npm install + postcss config + content paths in tailwind.config",
        "global CDN",
        "no install",
        "syntax error"
      ],
      correctIndex: 0,
      explanation: "Build-time generation.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ optional CDN.",
        "❌ requires setup.",
        "❌ אפשרות לגיטימית בקונטקסטים אחרים, אבל לא תשובה נכונה כאן."
      ]
    },
    {
      id: "mc_tw_bg_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::bg color",
      level: 4,
      question: "Tailwind bg-blue-500:",
      options: [
        "background-color: blue (50-950 scale of darkness)",
        "border",
        "text",
        "syntax error"
      ],
      correctIndex: 0,
      explanation: "Color scale 50 (lightest) to 950 (darkest).",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ זה border-*.",
        "❌ זה text-*.",
        "❌ standard."
      ]
    },
    {
      id: "mc_tw_rounded_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::rounded",
      level: 4,
      question: "Tailwind rounded-md:",
      options: [
        "border-radius medium (~6px)",
        "Margin",
        "Box shadow",
        "Color"
      ],
      correctIndex: 0,
      explanation: "rounded scale: none/sm/md/lg/xl/2xl/3xl/full.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ אפשרות שונה ולא קשורה לתפקיד הזה — בחר חלופה מדויקת יותר.",
        "❌ אפשרות שונה ולא קשורה לתפקיד הזה — בחר חלופה מדויקת יותר.",
        "❌ אפשרות שונה ולא קשורה לתפקיד הזה — בחר חלופה מדויקת יותר."
      ]
    },
    // ─── Tailwind use cases ───
    {
      id: "mc_tw_navbar_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::navbar",
      level: 6,
      question: "Tailwind navbar pattern:",
      options: [
        "<nav class='flex justify-between p-4 bg-white shadow'>",
        "<div align='right'>",
        "<table>",
        "syntax"
      ],
      correctIndex: 0,
      explanation: "flex container with utilities.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ deprecated.",
        "❌ wrong tool.",
        "❌ valid."
      ]
    },
    {
      id: "mc_tw_validation_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::validation",
      level: 6,
      question: "Form validation feedback ב-Tailwind:",
      options: [
        "red border + red text under: <input class='border-red-500'><p class='text-red-500'>Error",
        "JS only",
        "deprecated",
        "browser default"
      ],
      correctIndex: 0,
      explanation: "Conditional classes via cn() or template.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ CSS handles styling.",
        "❌ אפשרות לגיטימית בקונטקסטים אחרים, אבל לא תשובה נכונה כאן.",
        "❌ supplement."
      ]
    },
    {
      id: "mc_tw_responsive_grid_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::responsive design",
      level: 7,
      question: "Responsive grid Tailwind:",
      options: [
        "grid grid-cols-1 md:grid-cols-3 — 1 col mobile, 3 cols desktop",
        "always 3",
        "always 1",
        "syntax error"
      ],
      correctIndex: 0,
      explanation: "Mobile-first override.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ ב-mobile-first זה גם 1 col, אבל md: דורס ל-3 cols ב-≥768px.",
        "❌ הclass הראשון נדרס על-ידי md: ב-768px+ — זה לא always 1.",
        "❌ אפשרות לגיטימית בקונטקסטים אחרים, אבל לא תשובה נכונה כאן."
      ]
    },
    // ─── Add/Delete UI ───
    {
      id: "mc_tw_add_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::add/delete movie",
      level: 6,
      question: "Add/Delete UI pattern:",
      options: [
        "+ button → modal/form. delete X icon per item — minimal interaction",
        "auto-add",
        "deprecated",
        "form only"
      ],
      correctIndex: 0,
      explanation: "Standard CRUD UI.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ user-driven.",
        "❌ אפשרות לגיטימית בקונטקסטים אחרים, אבל לא תשובה נכונה כאן.",
        "❌ Tailwind גמיש מאוד — אבל זה לא הסיבה ל-responsive prefixes."
      ]
    },
    // ─── Search ───
    {
      id: "mc_tw_search_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::search",
      level: 6,
      question: "Search input pattern:",
      options: [
        "controlled input + filter array on keystroke (debounced for perf)",
        "uncontrolled only",
        "JS not needed",
        "browser default"
      ],
      correctIndex: 0,
      explanation: "useDebounce hook ב-React.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ controlled flexible.",
        "❌ JS handles filter.",
        "❌ supplemented."
      ]
    },
    // ─── Rating UI ───
    {
      id: "mc_tw_rating_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::rating",
      level: 6,
      question: "Star rating UI:",
      options: [
        "5 stars, click sets rating. Conditional fill via class on each star",
        "always 5",
        "deprecated",
        "syntax"
      ],
      correctIndex: 0,
      explanation: "Map stars to array.",
      optionFeedback: [
        "✅ נכון. הסבר מדויק שמבחין מהאפשרויות האחרות.",
        "❌ value varies.",
        "❌ אפשרות לגיטימית בקונטקסטים אחרים, אבל לא תשובה נכונה כאן.",
        "❌ HTML/CSS legal."
      ]
    },
  ],
  fill: [
    {
      id: "fill_html_doctype_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::HTML document",
      level: 4,
      code: "<!____ html>\n<html lang='he' dir='rtl'>\n  <head>...</head>",
      answer: "DOCTYPE",
      explanation: "DOCTYPE declaration first."
    },
    {
      id: "fill_html_label_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::label",
      level: 4,
      code: "<____ for='email'>Email</label>\n<input id='email' type='email'>",
      answer: "label",
      explanation: "label associates with input."
    },
    {
      id: "fill_css_box_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::box model",
      level: 5,
      code: "* {\n  box-____: border-box;\n}",
      answer: "sizing",
      explanation: "border-box includes padding+border in width."
    },
    {
      id: "fill_css_flex_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::flex",
      level: 5,
      code: ".container {\n  display: ____;\n  justify-content: center;\n  align-items: center;\n}",
      answer: "flex",
      explanation: "flex container."
    },
    {
      id: "fill_css_grid_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::grid",
      level: 6,
      code: ".layout {\n  display: ____;\n  grid-template-columns: 1fr 3fr;\n}",
      answer: "grid",
      explanation: "Grid container."
    },
    {
      id: "fill_css_position_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::box model",
      level: 6,
      code: ".tooltip {\n  position: ____;\n  top: 100%;\n  left: 0;\n}\n/* parent has position: relative */",
      answer: "absolute",
      explanation: "Absolute positions to nearest positioned ancestor."
    },
    {
      id: "fill_tw_bg_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::bg color",
      level: 4,
      code: "<button class='____-blue-500 text-white'>",
      answer: "bg",
      explanation: "bg-* for background-color."
    },
    {
      id: "fill_tw_padding_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::padding",
      level: 4,
      code: "<div class='____-4'>...</div>\n/* p-4 = padding 1rem */",
      answer: "p",
      explanation: "p-* for padding all sides."
    },
    {
      id: "fill_tw_responsive_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::responsive design",
      level: 6,
      code: "<div class='grid grid-cols-1 ____:grid-cols-3'>",
      answer: "md",
      explanation: "md: prefix for ≥768px."
    },
    {
      id: "fill_tw_dark_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::responsive design",
      level: 6,
      code: "<div class='bg-white ____:bg-gray-900'>",
      answer: "dark",
      explanation: "dark: variant prefix."
    },
    {
      id: "fill_tw_rounded_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::rounded",
      level: 4,
      code: "<button class='____-md'>",
      answer: "rounded",
      explanation: "rounded-* for border-radius."
    },
    {
      id: "fill_css_color_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::bg color",
      level: 5,
      code: ".error {\n  ____: red;\n  color: white;\n}",
      answer: "background-color",
      explanation: "background-color property."
    },
    {
      id: "fill_css_specificity_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_html_css_foundations::CSS selector",
      level: 6,
      code: "/* Specificity: ____ vs class .btn */\nbutton#submit { color: red; }",
      answer: "id",
      explanation: "id wins over class."
    },
    {
      id: "fill_css_gap_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::flex",
      level: 5,
      code: ".row {\n  display: flex;\n  ____: 16px;\n}",
      answer: "gap",
      explanation: "gap for spacing."
    },
    {
      id: "fill_css_repeat_u_001",
      topicId: "topic_css",
      conceptKey: "lesson_25::grid",
      level: 7,
      code: ".grid {\n  display: grid;\n  grid-template-columns: ____(3, 1fr);\n}",
      answer: "repeat",
      explanation: "repeat() for repeated tracks."
    },
  ],
};
