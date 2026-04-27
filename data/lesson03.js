// data/lesson03.js — שיעור 03: CSS Responsive
// עיצוב רספונסיבי. מבחן: 5-7 שאלות צפויות.
var LESSON_03 = {
  id: "lesson_03",
  title: "שיעור 03 — CSS רספונסיבי",
  description:
    "Media queries, mobile-first, fluid typography, viewport units, breakpoints — אתר שעובד בכל גודל מסך.",
  concepts: [
    {
      conceptName: "media query",
      difficulty: 4,
      levels: {
        grandma: "כללי CSS שונים לגדלים שונים של מסך. במובייל קטן, בלפטופ אחר, בטלוויזיה אחרת.",
        child: "בגדים שונים לעונות שונות — חורף = מעיל, קיץ = חולצה. ככה גם CSS לפי גודל.",
        soldier: "@media (min-width: X) — מפעיל CSS רק כשהמסך רחב לפחות X px.",
        student: "@media query מקבל media-feature (min-width, max-width, orientation, prefers-color-scheme). Nested rules apply only when condition matches.",
        junior: "פעם עיצבתי רק לדסקטופ — באייפון נראה זוועה. עכשיו: mobile-first → ברירת מחדל למובייל, @media (min-width) ל-tablet/desktop. שיפר 40% experience.",
        professor: "CSS Media Queries Level 4: range syntax (width >= 500px), media-feature (any-pointer, any-hover, prefers-reduced-motion). Container queries (newer) replace some use-cases.",
      },
      illustration:
        "📱 Breakpoints:\n  ברירת מחדל ← mobile\n  @media (min-width: 768px) ← tablet\n  @media (min-width: 1024px) ← desktop",
      codeExample:
        "/* mobile-first base */\n.card {\n  width: 100%;\n  padding: 1rem;\n  font-size: 14px;\n}\n\n/* tablet */\n@media (min-width: 768px) {\n  .card {\n    width: 50%;\n    padding: 1.5rem;\n    font-size: 16px;\n  }\n}\n\n/* desktop */\n@media (min-width: 1024px) {\n  .card {\n    width: 33%;\n    font-size: 18px;\n  }\n}\n\n/* dark mode */\n@media (prefers-color-scheme: dark) {\n  body { background: #000; color: #fff; }\n}",
      codeExplanation: "ברירת מחדל = מובייל. @media min-width מוסיפים styles לגדלי מסך גדולים יותר. prefers-color-scheme לdark mode אוטומטי.",
    },
    {
      conceptName: "mobile-first",
      difficulty: 5,
      levels: {
        grandma: "כותבים CSS קודם למסך הקטן ביותר, ורק מוסיפים שכבות לגדולים יותר.",
        child: "מתחילים מבית קטן ומוסיפים חדרים — לא מתחילים מארמון ומורידים.",
        soldier: "Mobile-first = base styles ל-mobile, @media (min-width: X) ל-tablet/desktop.",
        student: "Mobile-first vs Desktop-first: ב-mobile-first @media משתמש min-width (גדל). ב-desktop-first max-width (קטן). יתרון mobile-first: ברירת מחדל פועלת ב-old browsers/devices ללא @media.",
        junior: "התחלתי desktop-first — באייפון min-width לא הופעל וקיבלתי גרסת desktop קטנה ושבורה. עברתי ל-mobile-first → ברירת המחדל מתאימה למובייל, mediaqueries מתאימים לגדול.",
        professor: "Mobile-first principle (Luke Wroblewski 2009): design constraints force essential content. Performance: smaller default CSS. Future-proof: works on smartwatches, foldables, etc.",
      },
      illustration: "📐 Mobile-first cascade:\n  base (mobile)\n    ↓ + @media (min-width: 768)\n  tablet additions\n    ↓ + @media (min-width: 1024)\n  desktop enhancements",
      codeExample:
        "/* ❌ Desktop-first (פחות מומלץ) */\n.nav { display: flex; gap: 2rem; }\n@media (max-width: 768px) {\n  .nav { flex-direction: column; gap: 1rem; }\n}\n\n/* ✅ Mobile-first */\n.nav {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n@media (min-width: 768px) {\n  .nav {\n    flex-direction: row;\n    gap: 2rem;\n  }\n}",
      codeExplanation: "Mobile-first: התחל פשוט (column), הוסף complexity (row, gap גדול) במסכים גדולים. min-width טבעי יותר מ-max-width.",
    },
    {
      conceptName: "viewport units",
      difficulty: 5,
      levels: {
        grandma: "אחוזים של גודל המסך — vh = גובה, vw = רוחב. עוזר ליצור layout שגדל עם המסך.",
        child: "במקום 'אורך 200 ס\"מ' — 'חצי אורך החדר'. גמיש לכל חדר.",
        soldier: "vh/vw = 1% מ-viewport height/width. vmin = הקטן מהשניים, vmax = הגדול.",
        student: "Viewport-based units: vh, vw, vmin, vmax. Used for full-screen sections, fluid spacing. Quirk: 100vh on mobile includes URL bar — חדש: 100svh, 100lvh, 100dvh.",
        junior: "פעם 100vh ב-iPhone — אבל URL bar הסתיר 8% התחתון. עברתי ל-100dvh (dynamic) — מתאים לעצמו לפי URL bar showing/hiding.",
        professor: "Viewport units in mobile context: lvh (large), svh (small), dvh (dynamic). Container query units: cqw, cqh, cqi, cqb. Better for component-level responsive.",
      },
      illustration: "📏 Viewport units:\n  100vh = full viewport height\n  100vw = full viewport width\n  50vw = half\n  vmin = min(vh, vw)",
      codeExample:
        "/* Hero מלא מסך */\n.hero {\n  height: 100vh;        /* ישן — בעיה במובייל */\n  height: 100dvh;       /* dynamic — מתאים ל-URL bar */\n}\n\n/* Fluid typography */\nh1 {\n  font-size: clamp(2rem, 5vw, 4rem);\n  /* min 2rem, max 4rem, גדל עם רוחב המסך */\n}\n\n/* Square card */\n.thumb {\n  width: 30vw;\n  height: 30vw;       /* עגול לפי vmin אם רוצים תמיד מרובע */\n}",
      codeExplanation: "100vh בעייתי במובייל. 100dvh חדש — מתאים אוטומטית. clamp מקבל min/preferred/max — fluid scaling.",
    },
    {
      conceptName: "fluid typography",
      difficulty: 6,
      levels: {
        grandma: "טקסט שגדל עם המסך — לא קופץ בפעם אחת אלא נפרס בצורה רציפה.",
        child: "כמו בלון שמתנפח חלק חלק — לא קופץ פתאום לכפול.",
        soldier: "fluid type = font-size שמשתנה ברציפות עם viewport. אין קפיצות בין breakpoints.",
        student: "clamp(min, preferred, max) — מבטיח גם רצף וגם גבולות. preferred עם vw או % יוצר scaling. נוסחה: clamp(16px, 1rem + 1vw, 24px).",
        junior: "פעם h1 קפץ מ-32px ל-48px ב-tablet — ויזואלית מעצבן. עכשיו clamp(2rem, 5vw, 4rem) — חלק מצוין.",
        professor: "Fluid typography reduces breakpoint design overhead. Pattern: clamp(MIN, FLUID, MAX) where FLUID = base + multiplier*vw. Useful for headings; less for body (readability).",
      },
      illustration: "📝 Static vs Fluid:\n  Static:  16px → (jump) → 18px → (jump) → 20px\n  Fluid:   16 → 17 → 17.5 → 18 → 18.7 → 19 → 20 (smooth)",
      codeExample:
        "/* Fluid typography עם clamp */\nh1 { font-size: clamp(2rem, 1rem + 4vw, 4rem); }\nh2 { font-size: clamp(1.5rem, 0.9rem + 2.5vw, 2.5rem); }\np  { font-size: clamp(1rem, 0.875rem + 0.5vw, 1.25rem); }\n\n/* Fluid spacing */\n.section {\n  padding: clamp(2rem, 5vw, 6rem);\n}\n\n/* בעבר (ישן יותר): */\nh1 { font-size: 2rem; }\n@media (min-width: 768px) { h1 { font-size: 3rem; } }\n@media (min-width: 1024px) { h1 { font-size: 4rem; } }",
      codeExplanation: "clamp(min, fluid, max) מחליף 3 media queries בשורה אחת. preferred 1rem+4vw = base + scaling.",
    },
    {
      conceptName: "viewport meta",
      difficulty: 3,
      levels: {
        grandma: "תיוג ב-HTML שאומר לדפדפן 'הצג את הדף בגודל הטבעי שלי' — קריטי למובייל.",
        child: "כמו הוראה למורה 'תקריא את הספר בגודל הטבעי שלו'.",
        soldier: "<meta name='viewport' content='width=device-width, initial-scale=1' /> — חובה לאתר רספונסיבי.",
        student: "Viewport meta tag controls mobile rendering. Without it: browser scales 980px page down (zoom-out feel). With it: 1:1 device pixels.",
        junior: "פעם שכחתי meta viewport — האתר נראה ענקי במובייל וצריך לזום-אאוט. תוספת השורה הקסיקה הכל.",
        professor: "Viewport meta directives: width (device-width or pixels), initial-scale, maximum-scale, user-scalable. Avoid disabling user-scalable=no for accessibility.",
      },
      illustration: "📱 viewport meta:\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  → device-width = רוחב פיזי\n  → initial-scale=1 = 100% zoom",
      codeExample:
        "<!-- חובה ב-<head> -->\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n\n<!-- לעולם אל תכתוב: -->\n<meta name=\"viewport\" content=\"width=device-width, user-scalable=no\" />\n<!-- → חוסם zoom של משתמש = a11y ציון נמוך -->\n\n<!-- מקסימום שכן מותר אבל בזהירות: -->\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=5\" />",
      codeExplanation: "device-width = הרוחב הפיזי של המסך. initial-scale=1 = 100% zoom. user-scalable=no פוגע ב-a11y.",
    },
    {
      conceptName: "responsive image",
      difficulty: 6,
      levels: {
        grandma: "תמונה שמותאמת לגודל המסך — קטנה במובייל, גדולה בלפטופ. חוסך בנדור.",
        child: "כמו לקבל תמונה בגודל המתאים בכל מסך — לא יותר מדי גדולה ולא מטושטשת.",
        soldier: "<img srcset='small.jpg 480w, large.jpg 1024w' sizes='(min-width: 768px) 50vw, 100vw'>",
        student: "srcset = רשימת תמונות עם רוחבים. sizes = למתי איזו. דפדפן בוחר. picture עם source ל-art direction (תמונה שונה למובייל).",
        junior: "פעם הורדתי תמונה 2MB גם למובייל. אחרי srcset — הדפדפן הוריד 200KB במובייל. LCP שיפור 70%.",
        professor: "srcset density (1x, 2x) ל-retina; w descriptor for fluid. <picture> + <source> for art direction. Modern: AVIF/WebP fallbacks via type='image/avif'.",
      },
      illustration: "🖼️ srcset selection:\n  mobile (375w) + sizes 100vw → small.jpg (480w)\n  desktop (1920w) + sizes 50vw → large.jpg (1024w)",
      codeExample:
        "<!-- srcset + sizes -->\n<img\n  src=\"medium.jpg\"\n  srcset=\"\n    small.jpg 480w,\n    medium.jpg 800w,\n    large.jpg 1600w\n  \"\n  sizes=\"(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw\"\n  alt=\"...\"\n/>\n\n<!-- picture עם art direction -->\n<picture>\n  <source media=\"(min-width: 768px)\" srcset=\"wide.jpg\" />\n  <source media=\"(min-width: 480px)\" srcset=\"medium.jpg\" />\n  <img src=\"narrow.jpg\" alt=\"...\" />\n</picture>",
      codeExplanation: "srcset = options. sizes = בוחר. דפדפן יודע gold לפי viewport. picture נותן שליטה מלאה לדיזיינר על כל breakpoint.",
    },
  ],
};
