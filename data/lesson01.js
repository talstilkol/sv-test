// data/lesson01.js — שיעור 01: HTML בסיסי + Semantic HTML
// יסוד מבני של כל אתר. מבחן: צפויות 5-10 שאלות על תגיות, מבנה, accessibility.
var LESSON_01 = {
  id: "lesson_01",
  title: "שיעור 01 — HTML בסיסי",
  description:
    "יסודות HTML: מבנה דף, תגיות, attributes, semantic elements, forms, tables, accessibility.",
  concepts: [
    {
      conceptName: "HTML",
      difficulty: 1,
      levels: {
        grandma:
          "HTML זה כמו שלד של בית — קובע איפה החדרים, איפה הדלת, איפה החלון. הדפדפן מסתכל על השלד הזה ומציג לפיו את הדף.",
        child:
          "כמו לבנות עם לגו — כל קובייה היא חלק קטן (כותרת, תמונה, כפתור), והדף הוא ההרכבה של כולם יחד.",
        soldier:
          "תוויות (tags) שמציינות מה כל אזור בדף — כותרת ראשית, פסקה, רשימה, תמונה. הדפדפן יודע איך להציג כל סוג.",
        student:
          "HyperText Markup Language. שפת תיוג שמתארת מבנה ותוכן של דף web. כל אלמנט נפתח בתג <name> ונסגר ב-</name>, ויכול להכיל תוכן או אלמנטים אחרים.",
        junior:
          "הקובץ index.html הוא נקודת הכניסה של כל אתר. הדפדפן קורא אותו, בונה את ה-DOM Tree, ולפי זה מציג את הדף. המבנה שלך משפיע על SEO, accessibility וביצועים.",
        professor:
          "HTML5 (W3C standard) מגדיר Document Object Model semantics. ה-DOM tree נוצר מה-source דרך parser tokenization → tree construction. מבנה לא תקין מטופל ב-error recovery, אבל פוגע בביצועי הרינדור.",
      },
      illustration:
        "🏠 HTML — שלד של דף web:\n\n" +
        "  <html>\n" +
        "    <head> ← מטא-נתונים (title, meta, links)\n" +
        "    <body> ← תוכן הדף\n" +
        "      <header>, <main>, <footer>\n" +
        "      <h1>, <p>, <img>, <a>, <button>\n",
      codeExample:
        "<!DOCTYPE html>\n" +
        '<html lang="he" dir="rtl">\n' +
        "  <head>\n" +
        '    <meta charset="UTF-8" />\n' +
        '    <title>הדף שלי</title>\n' +
        "  </head>\n" +
        "  <body>\n" +
        "    <h1>שלום!</h1>\n" +
        "    <p>זה דף ראשון.</p>\n" +
        "  </body>\n" +
        "</html>",
      codeExplanation:
        "DOCTYPE מודיע לדפדפן שזו HTML5. lang ו-dir מגדירים שפה וכיווניות. head מכיל מטא-נתונים שלא מוצגים, body מכיל את התוכן הנראה.",
    },
    {
      conceptName: "Tag",
      difficulty: 1,
      levels: {
        grandma:
          "תווית (tag) זו 'קופסה' שעוטפת תוכן. היא אומרת לדפדפן 'מה שבפנים זו כותרת' או 'תמונה' או 'קישור'.",
        child:
          'כמו לכתוב פתק "זו כותרת:" לפני המילה "החייל". הדפדפן רואה את הפתק ויודע איך להציג את המילה.',
        soldier:
          "תיוג בצורת <NAME>תוכן</NAME>. תג הפתיחה אומר 'מתחיל', תג הסגירה 'מסתיים'. ביניהם — התוכן.",
        student:
          "Element = open tag + content + close tag. דוגמאות: <h1>כותרת</h1>, <p>פסקה</p>. תגי void כמו <img /> ו-<br /> אינם דורשים תג סגירה.",
        junior:
          "טעות נפוצה: שכחתי לסגור <div> ובלתי-מובן למה הדף 'נשבר'. עכשיו אני תמיד פותח+סוגר באותה הקלדה. VS Code עוזר עם auto-close.",
        professor:
          "HTML element vs tag: tag הוא ה-syntax (<div>), element הוא ה-מבנה (open+content+close). Self-closing void elements (img, br, hr, input) לא מקבלים מצב open/close מלא.",
      },
      illustration:
        "🏷️ מבנה Tag:\n\n" +
        "  <p>זה תוכן</p>\n" +
        "  ↑       ↑      ↑\n" +
        " פתיחה תוכן סגירה",
      codeExample:
        "<h1>כותרת ראשית</h1>\n" +
        "<p>פסקה רגילה.</p>\n" +
        '<a href="https://example.com">קישור</a>\n' +
        '<img src="cat.jpg" alt="חתול" />',
      codeExplanation:
        "h1 לכותרת ראשית, p לפסקה, a לקישור (עם href), img לתמונה (void element, attribute alt חובה לנגישות).",
    },
    {
      conceptName: "attribute",
      difficulty: 2,
      levels: {
        grandma:
          "תכונה (attribute) זה כמו תווית פנימית על קופסה — 'הצבע: כחול', 'הגודל: גדול'. נותן מידע נוסף על האלמנט.",
        child:
          "כמו לכתוב על תיק 'צבע=אדום, גודל=גדול'. ככה כל תיק יודע על עצמו דברים נוספים.",
        soldier:
          "מאפיין נוסף בתוך תג הפתיחה — name=\"value\". מציין מאפיינים מיוחדים: כתובת, מזהה, סגנון.",
        student:
          'Attribute = name=\"value\" pair בתוך open tag. דוגמאות: id, class, src, href, alt, type, value.',
        junior:
          'תמיד תכתוב attribute ב-quotes כפולים: id="main" ולא id=main. בלי quotes זה עובד אבל פוגע ב-validation ועלול להפיל ב-edge cases (רווחים).',
        professor:
          "Global attributes (id, class, lang, dir, hidden, tabindex, style, data-*) פעילים בכל אלמנט. tag-specific attributes (href ב-a, src ב-img) פעילים רק שם.",
      },
      illustration:
        "🏷️ Attribute = name=\"value\":\n\n" +
        '  <a href="https://example.com" target="_blank">לחץ</a>\n' +
        "       ↑              ↑\n" +
        "  attribute1     attribute2",
      codeExample:
        '<a href="/about" title="עמוד אודות">אודות</a>\n' +
        '<img src="logo.png" alt="לוגו" width="200" height="100" />\n' +
        '<input type="email" required placeholder="כתובת אימייל" />',
      codeExplanation:
        "a עם href (יעד) ו-title (tooltip). img עם src, alt, width, height. input עם type, required ו-placeholder.",
    },
    {
      conceptName: "Semantic HTML",
      difficulty: 4,
      levels: {
        grandma:
          "זה כמו לקרוא לחלקי הבית בשמות נכונים — 'מטבח' במקום 'חדר 3'. ככה כולם מבינים על מה מדובר.",
        child:
          "במקום להגיד 'כיתה ראשונה, שתי, שלישית' — אומרים 'כיתת מורים', 'כיתת מדעים', 'חדר ספורט'. ה-שם מספר לך מה יש שם.",
        soldier:
          "תגיות עם משמעות סמנטית: <header>, <main>, <article>, <nav>, <footer>. במקום <div> סתם.",
        student:
          "Semantic HTML משתמש בתגיות שמתארות את המשמעות של התוכן (לא רק את המראה). דפדפן + screen reader + Google מבינים את המבנה טוב יותר.",
        junior:
          "כשעברתי מ-<div class='header'> ל-<header> שלי, הציון של Lighthouse a11y קפץ ב-15 נקודות. צוות SEO ראה שיפור ב-impressions תוך שבוע.",
        professor:
          "Semantic markup מעביר אינפורמציה ל-Accessibility Tree. ARIA attributes משלימים כשאין אלמנט סמנטי. Google's algorithm נותן עדיפות מובנית ל-<article>, <section> מובנים נכון.",
      },
      illustration:
        "📰 Semantic vs Generic:\n\n" +
        "  ❌ <div class=\"header\">\n" +
        "      <div class=\"nav\">...\n" +
        "  ✅ <header>\n" +
        "      <nav>...\n",
      codeExample:
        "<header>\n" +
        "  <h1>אתר שלי</h1>\n" +
        "  <nav><a href=\"/\">בית</a></nav>\n" +
        "</header>\n" +
        "<main>\n" +
        "  <article>\n" +
        "    <h2>כותרת המאמר</h2>\n" +
        "    <p>תוכן...</p>\n" +
        "  </article>\n" +
        "</main>\n" +
        "<footer>© 2026</footer>",
      codeExplanation:
        "header/main/article/footer מתארים את המשמעות. screen readers וגוגל מבינים את המבנה ונותנים experience טוב יותר.",
      commonMistakes:
        "1) שימוש ב-<div> במקום <button> — אין keyboard accessibility. 2) כותרת h1 פעמיים בדף. 3) <a> לפעולה במקום <button>.",
    },
    {
      conceptName: "form",
      difficulty: 3,
      levels: {
        grandma:
          "כמו לטופס במשרד — שורות לכתיבה, תיבות סימון, וכפתור 'שלח' בסוף. כשממלאים — נשלח למשרד.",
        child:
          "טופס הרשמה לקייטנה — שם, גיל, כפתור שלח. אחרי הלחיצה — המידע הולך למקום מסוים.",
        soldier:
          "<form> שמכיל input, textarea, select, button. כשהמשתמש לוחץ Submit — הנתונים נשלחים לשרת.",
        student:
          "<form action=\"/api\" method=\"POST\"> + inputs בתוכו = הקופסה הסטנדרטית של קלט. action מציין URL, method מציין HTTP verb.",
        junior:
          "טעות שעשיתי: שכחתי name='email' על input → הנתונים לא נשלחו עם FormData! עכשיו אני תמיד בודק ש-name קיים.",
        professor:
          "Form submission מבוצע ב-application/x-www-form-urlencoded או multipart/form-data (file upload). FormData API ב-JS מאפשר שליחה async דרך fetch.",
      },
      illustration:
        "📝 Form structure:\n\n" +
        "  <form>\n" +
        "    <input> ← שדה קלט\n" +
        "    <textarea> ← שדה ארוך\n" +
        "    <select> ← בחירה\n" +
        "    <button>שלח</button>\n" +
        "  </form>",
      codeExample:
        '<form action="/login" method="POST">\n' +
        '  <label for="email">אימייל</label>\n' +
        '  <input type="email" id="email" name="email" required />\n' +
        "\n" +
        '  <label for="pw">סיסמה</label>\n' +
        '  <input type="password" id="pw" name="pw" minlength="8" required />\n' +
        "\n" +
        '  <button type="submit">התחבר</button>\n' +
        "</form>",
      codeExplanation:
        "label עם for לקישור לשדה (חובה ל-a11y). input עם type, id, name, required ו-minlength לוולידציה בסיסית. button type='submit' שולח את הטופס.",
      commonMistakes:
        "1) שכחת name= → לא נשלח. 2) שכחת type='submit' → לפעמים לא משדר. 3) חסר label → screen reader לא מקריא.",
    },
    {
      conceptName: "input",
      difficulty: 2,
      levels: {
        grandma: "תיבת קלט ריקה שאפשר לכתוב בה — אימייל, שם, מספר טלפון.",
        child: "כמו ריבוע ריק במחברת שאתה ממלא בעיפרון.",
        soldier:
          "<input> void element עם type שקובע מה הוא — text, email, password, number, checkbox, radio, file.",
        student:
          "Input element עם 22+ types. כל type מספק UI ו-validation שונה. type='email' בודק פורמט, type='number' מציע מקלדת ספרות בנייד.",
        junior:
          "כשבניתי את הטופס הראשון, השתמשתי תמיד ב-type='text' — בנייד המשתמשים סבלו. עכשיו תמיד type='email' לאימייל, type='tel' לטלפון, type='number' למספר. UX משופר משמעותית.",
        professor:
          "Input types נחלקים ל-text-based, choice-based, date/time, file, color, range, search. Each maps to different IDL attributes ו-validation rules ב-Constraint Validation API.",
      },
      illustration:
        "🔘 Input types נפוצים:\n\n" +
        '  text     | email     | password\n' +
        '  number   | tel       | url\n' +
        '  date     | checkbox  | radio\n' +
        '  file     | range     | color',
      codeExample:
        '<input type="text" placeholder="שם מלא" />\n' +
        '<input type="email" required />\n' +
        '<input type="number" min="0" max="120" step="1" />\n' +
        '<input type="checkbox" id="agree" />\n' +
        '<input type="radio" name="gender" value="m" />\n' +
        '<input type="file" accept="image/*" multiple />',
      codeExplanation:
        "type מגדיר את ההתנהגות. attributes מתאימים לסוג: min/max ל-number, accept ל-file, name ל-radio (לקבץ אופציות).",
    },
    {
      conceptName: "button",
      difficulty: 1,
      levels: {
        grandma: "כפתור ללחיצה — מבצע פעולה. כמו 'שלח', 'אישור', 'בטל'.",
        child: "כפתור — לוחצים וקורה משהו. כמו במשחק.",
        soldier:
          "<button> שמפעיל פעולה: שליחת טופס, פתיחת תפריט, ניווט.",
        student:
          "<button type='submit'> בתוך form שולח אותו. <button type='button'> רק מפעיל onClick. type='reset' מאפס את הטופס.",
        junior:
          "טעות: כתבתי <button> בלי type — בתוך form זה default 'submit' וגרם לשליחה לא רצויה! עכשיו תמיד type='button' לפעולה רגילה.",
        professor:
          "<button> מקבל focus, מגיב ל-Enter ו-Space, יש לו role='button' מובנה. <div onclick=...> אינו נגיש בלי tabindex+role+keyboard handler.",
      },
      illustration: "🔘 Button vs Div:\n\n  ✅ <button>פעולה</button>\n  ❌ <div onclick=\"...\">פעולה</div>",
      codeExample:
        '<button type="submit">שלח</button>\n' +
        '<button type="button" onclick="alert(\'היי\')">לחץ</button>\n' +
        '<button type="reset">נקה טופס</button>',
      codeExplanation:
        "type='submit' (default ב-form) שולח. type='button' לפעולה. type='reset' מאפס.",
      commonMistakes:
        "1) שכחת type='button' → submit לא רצוי. 2) <div onclick> במקום <button> → לא keyboard accessible. 3) onClick רק ב-mouse → לא עובד במקלדת.",
    },
    {
      conceptName: "alt",
      difficulty: 3,
      levels: {
        grandma:
          "טקסט חלופי לתמונה — מתי שלא רואים אותה (אינטרנט איטי, עיוור), קוראים את התיאור.",
        child:
          "תיאור התמונה במילים — 'חתול שחור על ספה' — כדי שגם מי שלא רואה ידע מה יש שם.",
        soldier:
          "alt attribute חובה על <img> — תיאור התמונה ל-accessibility ולמקרה שהתמונה לא נטענת.",
        student:
          "alt='[תיאור]' — חובה ל-WCAG. screen readers קוראים אותו. אם התמונה דקורטיבית — alt='' (ריק) כדי שיתעלמו.",
        junior:
          "פעם כתבתי alt='image' לכל התמונות — חסר תועלת. עכשיו: alt='לוגו של החברה' או alt='גרף מכירות חודש 11/2025: עליה של 30%'.",
        professor:
          'WCAG 2.1 SC 1.1.1 (Non-text Content): כל non-text content צריך text alternative. img/area/input type="image" — חובה. Decorative images: alt="" (סמנטית null).',
      },
      illustration:
        "🖼️ alt for accessibility:\n\n" +
        '  <img src="dog.jpg" alt="כלב גולדן רטריבר חום על דשא ירוק" />\n\n' +
        "  עיוור שומע: 'כלב גולדן רטריבר חום על דשא ירוק'",
      codeExample:
        '<img src="logo.png" alt="LumenPortal — לוגו" />\n' +
        '<img src="decoration.svg" alt="" />\n' +
        '<img src="chart.png" alt="גרף הכנסות 2025: גידול של 25% ברבעון 4" />',
      codeExplanation:
        "alt חובה. תוכן משמעותי → תיאור ספציפי. דקורטיבי → alt='' ריק.",
      commonMistakes:
        '1) alt="image" / alt="picture" — חסר תועלת. 2) חסר alt → SEO + a11y נפגעים. 3) alt על תמונה מורכבת → להוסיף longdesc או aria-describedby.',
    },
    {
      conceptName: "table",
      difficulty: 3,
      levels: {
        grandma: "טבלה כמו ב-Excel — שורות ועמודות.",
        child: "ריבועים מסודרים בשורות — לוח הכיתה.",
        soldier:
          "<table> עם <tr> שורות, <th> כותרות, <td> תאים. למידע מובנה (לא לעיצוב).",
        student:
          "<table> מבני: <thead>, <tbody>, <tfoot>. שורה <tr>, תא header <th>, תא נתונים <td>. ל-data tabular בלבד.",
        junior:
          "פעם השתמשתי ב-table לעיצוב layout — היום זה anti-pattern! לעיצוב — Flexbox/Grid. ל-נתונים מובנים (כמו לוח שעות, מחירון) — table.",
        professor:
          "<table> מבנה semantic לדאטה דו-ממדי. <th scope='col|row'> מציין כיוון הקבץ הסמנטי. screen readers משתמשים ב-table-mode לניווט בשורה ועמודה.",
      },
      illustration:
        "📊 Table structure:\n\n" +
        "  thead\n" +
        "    tr → th | th | th\n" +
        "  tbody\n" +
        "    tr → td | td | td",
      codeExample:
        "<table>\n" +
        "  <thead>\n" +
        "    <tr><th>שם</th><th>גיל</th></tr>\n" +
        "  </thead>\n" +
        "  <tbody>\n" +
        "    <tr><td>טל</td><td>30</td></tr>\n" +
        "    <tr><td>רוני</td><td>25</td></tr>\n" +
        "  </tbody>\n" +
        "</table>",
      codeExplanation:
        "thead לכותרות, tbody לנתונים. th לתא כותרת (bold + center), td לתא רגיל.",
    },
    {
      conceptName: "DOCTYPE",
      difficulty: 2,
      levels: {
        grandma:
          "ההכרזה הראשונה בכל דף — 'אני HTML5'. אומרת לדפדפן איזו שפת תיוג לצפות.",
        child: "כמו לכתוב 'זה ספר באנגלית' בעמוד הראשון.",
        soldier:
          "<!DOCTYPE html> — שורה ראשונה במסמך. בלעדיה הדפדפן עובר ל-Quirks Mode (תאימות לאחור).",
        student:
          'Document Type Declaration. <!DOCTYPE html> מציין HTML5. בלי זה: Quirks Mode — דפדפן מתנהג כמו 1995, וכל ה-CSS משתבש.',
        junior:
          "השארתי פעם דף בלי DOCTYPE — ה-margin של body התנהג מוזר ב-IE. הוספת DOCTYPE פתרה הכל. עכשיו זה הדבר הראשון שאני בודק כשמשהו 'מוזר'.",
        professor:
          "Standards Mode (with DOCTYPE) vs Quirks Mode (without). Quirks renders per legacy IE bugs (box-model, colspan in width calc, image alignment). Almost-Standards Mode ל-DOCTYPEs ישנים.",
      },
      illustration: "📋 Always first line:\n\n  <!DOCTYPE html>\n  <html>...",
      codeExample:
        "<!DOCTYPE html>\n" +
        '<html lang="he">\n' +
        "  <head>...</head>\n" +
        "  <body>...</body>\n" +
        "</html>",
      codeExplanation:
        "DOCTYPE קודם לכל. בלעדיו: Quirks Mode וכאוס.",
    },
    {
      conceptName: "meta",
      difficulty: 3,
      levels: {
        grandma: "מידע על הדף שלא רואים — כותרת ל-Google, תאור.",
        child:
          "תווית מאחורי הספר עם המספרים והברקוד — לא לקוראים, לחנות.",
        soldier:
          "<meta> ב-<head>: charset, viewport, description, og:* ל-social, theme-color.",
        student:
          'Meta tags ב-head מספקים מטא-נתונים: meta charset (UTF-8), meta viewport (mobile responsive), meta description (SEO), meta property="og:*" (social sharing).',
        junior:
          "פעם שכחתי meta viewport — האתר נראה זעיר במובייל. עכשיו זה השורה השנייה אחרי charset, תמיד.",
        professor:
          "Meta hierarchy: charset (חובה לפני 1024 byte), viewport (mobile UX), description (SEO), keywords (deprecated), Open Graph (Facebook/LinkedIn), Twitter Cards (Twitter), apple-touch-icon (iOS).",
      },
      illustration:
        "📱 Meta essentials:\n\n" +
        '  charset → "UTF-8"\n' +
        '  viewport → "width=device-width, initial-scale=1"\n' +
        '  description → SEO snippet\n' +
        '  og:image → social preview',
      codeExample:
        '<meta charset="UTF-8" />\n' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
        '<meta name="description" content="LumenPortal — פורטל לימוד עברית" />\n' +
        '<meta property="og:title" content="LumenPortal" />\n' +
        '<meta property="og:image" content="https://example.com/og.png" />\n' +
        '<meta name="theme-color" content="#6366f1" />',
      codeExplanation:
        "charset → UTF-8 חובה. viewport → mobile responsive. description → SEO. og:* → social. theme-color → mobile address bar color.",
    },
    {
      conceptName: "link (rel)",
      difficulty: 3,
      levels: {
        grandma:
          "קישור לקובץ עזר — לרוב מסמך עיצוב (CSS) שמלמד את הדפדפן איך להציג את הדף.",
        child:
          "תיבת ציוד נוספת — 'תוסיף את הצבעים מהקובץ הזה'.",
        soldier:
          "<link> ב-head מקשר משאבים חיצוניים: stylesheet (CSS), icon (favicon), manifest (PWA), preload.",
        student:
          'rel="stylesheet" טוען CSS, rel="icon" — favicon, rel="manifest" — PWA, rel="preload" — אופטימיזציה.',
        junior:
          "טעות: <link rel='stylesheet'> אחרי <script> — ה-CSS נטען מאוחר וה-FOUC (Flash Of Unstyled Content) זועק. עכשיו תמיד CSS לפני JS.",
        professor:
          "Resource hints: preload (טען עכשיו), prefetch (טען לעתיד), preconnect (פתח חיבור), dns-prefetch. עוזרים בביצועי טעינה ראשוניים.",
      },
      illustration: "🔗 Common link rel values:\n  stylesheet | icon | manifest | preload | prefetch",
      codeExample:
        '<link rel="stylesheet" href="style.css" />\n' +
        '<link rel="icon" href="/favicon.ico" />\n' +
        '<link rel="manifest" href="/manifest.json" />\n' +
        '<link rel="preload" href="/font.woff2" as="font" type="font/woff2" crossorigin />',
      codeExplanation:
        "stylesheet טוען CSS. icon = favicon. manifest = PWA. preload לאופטימיזציה.",
    },
    {
      conceptName: "div",
      difficulty: 1,
      levels: {
        grandma:
          "קופסה ריקה כללית — סתם להחזיק קבוצה של דברים יחד. בלי משמעות מיוחדת.",
        child:
          "אם semantic tags הם 'מטבח', 'חדר', 'מקלחת' — div זה 'איזושהי מחיצה'. לא מספרת על מה.",
        soldier:
          "<div> = generic block container. בלי משמעות סמנטית. רק לקיבוץ + עיצוב.",
        student:
          "<div> generic block-level container. שימוש: כשאין semantic tag מתאים. בעידן modern: עדיף תמיד תג סמנטי, ואם אין — div + role= ARIA.",
        junior:
          "נכנסתי לקוד ישן: 800 div ב-20 לוגיקות. כתבתי semantic ועכשיו 200 div בלבד עם 600 semantic tags. הקוד יותר קריא, a11y עלה ב-25 נקודות.",
        professor:
          "<div> displays as block by default, no implicit semantics. Use only when no semantic alternative exists. Common smell: 'div soup' = excessive nesting without structural meaning.",
      },
      illustration: "📦 div = קופסה כללית\n  vs <header>, <main>, <article>, <section>",
      codeExample:
        '<div class="card">\n' +
        '  <h3>כותרת</h3>\n' +
        '  <p>תיאור</p>\n' +
        "</div>\n\n" +
        "// ✅ עדיף:\n" +
        "<article>\n" +
        '  <h3>כותרת</h3>\n' +
        '  <p>תיאור</p>\n' +
        "</article>",
      codeExplanation:
        "div ללא משמעות. article סמנטי = כרטיס תוכן עצמאי.",
    },
    {
      conceptName: "span",
      difficulty: 2,
      levels: {
        grandma: "כמו div — אבל קטן יותר. בתוך משפט. לסימון מילה אחת.",
        child:
          "לסמן מילה במשפט — 'אני אוהב <span>פיצה</span> וגלידה'. לתת לה צבע אחר.",
        soldier:
          "<span> = generic inline container. כמו div אבל inline (בתוך שורה).",
        student:
          "<span> inline-level. שימוש: לעטוף טקסט בתוך פסקה כדי להחיל style/script ספציפי. <em>/<strong> סמנטיים יותר אם יש משמעות.",
        junior:
          "תמיד שאלתי 'מתי span ומתי em?'. עכשיו: span = רק עיצוב. em = הדגשה משמעותית. strong = חשיבות חזקה.",
        professor:
          "<span> ו-<div> = neutral generic containers. <em>, <strong>, <mark>, <abbr> = semantic inline. עדיפות semantic לטוב a11y + SEO.",
      },
      illustration: "📝 span = inline div, em/strong = semantic inline",
      codeExample:
        '<p>המחיר: <span class="price">99₪</span></p>\n' +
        "<p>זה <em>חשוב מאוד</em>!</p>\n" +
        "<p>אסור לעשות זאת — <strong>אסור!</strong></p>",
      codeExplanation:
        "span לעיצוב נטרלי. em להדגשה. strong לחשיבות חזקה.",
    },
    {
      conceptName: "list (ul/ol)",
      difficulty: 2,
      levels: {
        grandma:
          "רשימה — כמו רשימת קניות (לא משנה הסדר) או הוראות הכנת עוגה (חייב סדר).",
        child:
          "ul = רשימת פריטים (בולטים). ol = רשימה ממוספרת (1, 2, 3).",
        soldier:
          "<ul> Unordered List. <ol> Ordered List. <li> List Item בתוך שניהם.",
        student:
          "ul לרשימה לא-מסודרת (bullets). ol לרשימה מסודרת (numbers). לכל רשימה — <li> לכל פריט. ניתן לקנן רשימות.",
        junior:
          "כתבתי תפריט ניווט בלי <ul> סביב <a>-ים. screen reader קרא אותם כ-'links' רגילים. עברתי ל-<ul><li><a> — עכשיו זה 'navigation, 5 items, 1 of 5'.",
        professor:
          "<ul>/<ol> מבני ל-list semantics. <dl>/<dt>/<dd> ל-description list. CSS list-style-type שולט בעיצוב. role='list' עוזר כשscreen readers מסירים semantics לאחר styling.",
      },
      illustration:
        "📋 List types:\n  ul → • • •\n  ol → 1. 2. 3.\n  dl → key: value",
      codeExample:
        "<ul>\n  <li>חלב</li>\n  <li>לחם</li>\n  <li>ביצים</li>\n</ul>\n\n" +
        "<ol>\n  <li>פתח את התנור</li>\n  <li>חמם ל-180°</li>\n  <li>הכנס</li>\n</ol>",
      codeExplanation:
        "ul לרשימה ללא סדר. ol לסדר. li לכל פריט.",
    },
    {
      conceptName: "anchor (a)",
      difficulty: 2,
      levels: {
        grandma: "קישור — מילה שכשלוחצים עוברים לדף אחר.",
        child: "כפתור עם מילים — לוחצים, אתה במקום אחר.",
        soldier:
          "<a href='URL'>טקסט</a> — קישור. href = יעד, target='_blank' = כרטיסייה חדשה.",
        student:
          "<a> = anchor element. href = יעד. target='_blank' פותח בחדש. rel='noopener noreferrer' — אבטחה ב-_blank.",
        junior:
          "טעות אבטחה: <a target='_blank'> בלי rel='noopener'. הדף שנפתח יכול לגשת ל-window.opener ולפנות אותך ל-phishing. עכשיו תמיד rel='noopener noreferrer'.",
        professor:
          "Anchor + href עוקב ל-URL: absolute, relative, fragment (#id), mailto:, tel:, javascript:. target=_blank דורש rel=noopener למניעת tabnabbing.",
      },
      illustration: "🔗 a href:\n  /about → relative\n  https://x.com → absolute\n  #section → fragment\n  mailto:x@y.com → email",
      codeExample:
        '<a href="/about">אודות</a>\n' +
        '<a href="https://google.com" target="_blank" rel="noopener noreferrer">Google</a>\n' +
        '<a href="#section1">קפוץ לאזור</a>\n' +
        '<a href="mailto:hi@example.com">שלח אימייל</a>',
      codeExplanation:
        "href שולט ביעד. target='_blank' חייב rel='noopener noreferrer' לאבטחה.",
      commonMistakes:
        "1) target='_blank' בלי rel='noopener' → tabnabbing. 2) <a onclick=...> בלי href → לא נגיש. 3) <a> לפעולה (לא ניווט) → צריך <button>.",
    },
  ],
};
