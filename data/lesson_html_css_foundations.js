// data/lesson_html_css_foundations.js
// SVCollege Finish Line 1 — HTML/CSS foundations.

var LESSON_HTML_CSS_FOUNDATIONS = {
  id: "lesson_html_css_foundations",
  title: "HTML/CSS Foundations — יסודות HTML ו-CSS",
  description:
    "השכבה הראשונה של כל אתר: מבנה HTML סמנטי, טפסים, בחירת אלמנטים עם CSS, מודל הקופסה, והנגשה בסיסית לפני React או Tailwind.",
  sourceAssets: [
    {
      path: "lessons/Lesson 25.pptx.pdf",
      role: "responsive-css-and-tailwind-continuation",
      coverage: "partial",
    },
    {
      path: "lessons/פרוייקט 25.docx.pdf",
      role: "project-ui-context",
      coverage: "partial",
    },
  ],
  generatedSummaries: [
    "SVCOLLEGE_LESSON_INVENTORY.md",
    "SVCOLLEGE_COVERAGE_REPORT.md",
    "SVCOLLEGE_READINESS_REPORT.md",
  ],
  sourceCoverageNote:
    "SVCollege readiness required a dedicated HTML/CSS foundations bridge. Current raw assets provide responsive/project continuation; a dedicated HTML basics source is still unknown/unavailable.",
  concepts: [
    {
      conceptName: "HTML document",
      difficulty: 2,
      levels: {
        grandma:
          "מסמך HTML הוא שלד הדף. כמו טופס נייר עם כותרת, גוף, סעיפים ושדות — הדפדפן קורא אותו ומבין מה צריך להציג.",
        child:
          "HTML אומר לדפדפן מה יש בדף: כותרת, פסקה, תמונה, כפתור או טופס. הוא לא אומר בעיקר איך זה נראה.",
        soldier:
          "HTML document מורכב מ-doctype, html, head ו-body. head מכיל מידע לדפדפן; body מכיל את מה שהמשתמש רואה.",
        student:
          "HTML הוא שפת סימון. תגיות יוצרות עץ אלמנטים שהדפדפן הופך ל-DOM. CSS מעצב את העץ, ו-JavaScript משנה אותו.",
        junior:
          "כשמשהו בדף לא עובד, בדוק קודם אם ה-HTML תקין: תגיות סגורות, מבנה nesting הגיוני, ואלמנטים במקום הנכון.",
        professor:
          "HTML is parsed into a DOM tree. The browser combines DOM + CSSOM into a render tree, lays it out, paints it, and then JS can mutate it.",
      },
      illustration:
        "דף בסיסי:\n<!doctype html>\n<html>\n  <head><title>App</title></head>\n  <body><h1>Hello</h1></body>\n</html>",
      codeExample:
        "<!doctype html>\n<html lang=\"he\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <title>Task App</title>\n  </head>\n  <body>\n    <main>\n      <h1>המשימות שלי</h1>\n    </main>\n  </body>\n</html>",
      codeExplanation:
        "doctype מפעיל מצב תקני. html מגדיר שפה וכיוון. head מגדיר metadata. body מכיל את התוכן האמיתי.",
    },
    {
      conceptName: "semantic HTML",
      difficulty: 3,
      levels: {
        grandma:
          "HTML סמנטי אומר להשתמש בשם שמתאר את התפקיד: כותרת היא h1, תפריט הוא nav, תוכן מרכזי הוא main.",
        child:
          "במקום שכל דבר יהיה div, נותנים לדברים שם אמיתי. כך גם הדפדפן וגם קורא מסך מבינים את הדף.",
        soldier:
          "Semantic tags כמו header, nav, main, section, article, footer נותנים משמעות מבנית ולא רק קופסה ויזואלית.",
        student:
          "סמנטיקה משפרת נגישות, SEO ותחזוקה. div הוא fallback; תגית סמנטית היא חוזה על התפקיד של התוכן.",
        junior:
          "אם אתה בונה navbar עם div בלבד, אתה מאבד מידע. <nav> אומר לדפדפן ולקורא מסך: כאן יש ניווט.",
        professor:
          "Semantic HTML exposes document landmarks and content roles to assistive technologies and search engines without extra ARIA.",
      },
      illustration:
        "מבנה דף:\n<header>לוגו</header>\n<nav>קישורים</nav>\n<main><section>תוכן</section></main>\n<footer>סיום</footer>",
      codeExample:
        "<header>\n  <h1>Movie App</h1>\n  <nav aria-label=\"ניווט ראשי\">\n    <a href=\"/\">בית</a>\n    <a href=\"/movies\">סרטים</a>\n  </nav>\n</header>\n<main>\n  <section aria-labelledby=\"movies-title\">\n    <h2 id=\"movies-title\">סרטים מומלצים</h2>\n  </section>\n</main>",
      codeExplanation:
        "header/nav/main/section מתארים תפקיד. aria-labelledby מחבר section לכותרת שלה בלי להמציא תיאור כפול.",
    },
    {
      conceptName: "HTML form",
      difficulty: 4,
      levels: {
        grandma:
          "טופס הוא הדרך של המשתמש למסור מידע: שם, אימייל, סיסמה, חיפוש או בחירה.",
        child:
          "form הוא קופסה עם input וכפתור. המשתמש מקליד, ואז לוחץ שליחה.",
        soldier:
          "form עוטף שדות וקובע submit. input מקבל name/type/value. button type=submit מפעיל שליחה.",
        student:
          "טופס תקין כולל label לכל input, type מתאים, name לשליחה, validation בסיסי, וטיפול ב-submit.",
        junior:
          "ב-React עדיין כדאי להבין form רגיל: onSubmit, event.preventDefault, state לשדות, ושמות ברורים.",
        professor:
          "Native forms provide keyboard behavior, validation primitives, submit semantics, and accessibility affordances before JavaScript enhancement.",
      },
      illustration:
        "form -> label + input -> submit\nה-label אומר מה השדה; ה-name אומר איך השרת יקבל אותו.",
      codeExample:
        "<form action=\"/login\" method=\"post\">\n  <label for=\"email\">אימייל</label>\n  <input id=\"email\" name=\"email\" type=\"email\" required />\n  <label for=\"password\">סיסמה</label>\n  <input id=\"password\" name=\"password\" type=\"password\" required />\n  <button type=\"submit\">כניסה</button>\n</form>",
      codeExplanation:
        "label מחובר ל-input דרך for/id. type=email נותן מקלדת/ולידציה מתאימה. name הוא המפתח שנשלח לשרת.",
    },
    {
      conceptName: "label",
      difficulty: 3,
      levels: {
        grandma:
          "label הוא הפתק שליד השדה. הוא אומר למשתמש מה צריך למלא.",
        child:
          "אם יש תיבה ריקה בלי שם, לא יודעים מה לכתוב. label נותן לה שם.",
        soldier:
          "label for='email' מתחבר ל-input id='email'. לחיצה על ה-label ממקדת את השדה.",
        student:
          "label הוא חובה בנגישות. placeholder אינו תחליף כי הוא נעלם כשמקלידים ולא תמיד נקרא נכון.",
        junior:
          "טעות נפוצה: input עם placeholder בלבד. הפתרון: label גלוי או label נגיש אם העיצוב דורש.",
        professor:
          "Accessible name computation uses associated labels. Correct labeling is the foundation for screen reader form navigation.",
      },
      illustration:
        "<label for=\"search\">חיפוש</label>\n<input id=\"search\" name=\"q\" />",
      codeExample:
        "<label for=\"task-title\">שם משימה</label>\n<input id=\"task-title\" name=\"title\" type=\"text\" autocomplete=\"off\" />",
      codeExplanation:
        "for ו-id חייבים להתאים. name יכול להיות שונה, אבל לרוב נשאר ברור וקצר.",
    },
    {
      conceptName: "CSS selector",
      difficulty: 4,
      levels: {
        grandma:
          "selector הוא הדרך להגיד ל-CSS: תעצב את הדבר הזה. כמו לבחור חולצה מהארון לפי שם או סימן.",
        child:
          "p בוחר פסקאות. .card בוחר class בשם card. #menu בוחר id בשם menu.",
        soldier:
          "Selector בוחר אלמנטים לפי tag, class, id, attribute או מצב כמו :hover.",
        student:
          "CSS selector מגדיר על מי חלים החוקים. עדיף class יציב על פני selector ארוך ושביר.",
        junior:
          "אם אתה כותב main div ul li a span, כנראה שקשרת CSS למבנה עמוק מדי. class קצר יותר עמיד לשינויים.",
        professor:
          "Selectors feed the cascade. Specificity and source order decide which declaration wins when multiple selectors match the same element.",
      },
      illustration:
        "button     -> כל הכפתורים\n.primary  -> class\n#search   -> id\n[type=text] -> attribute",
      codeExample:
        ".card {\n  padding: 16px;\n  border: 1px solid #ddd;\n}\n.card:hover {\n  border-color: #2563eb;\n}\ninput[required] {\n  border-inline-start: 4px solid #f59e0b;\n}",
      codeExplanation:
        ".card בוחר class, :hover בוחר מצב, attribute selector בוחר input לפי תכונה.",
    },
    {
      conceptName: "cascade and specificity",
      difficulty: 6,
      levels: {
        grandma:
          "אם שני אנשים נותנים הוראות שונות, צריך כלל מי קובע. ב-CSS זה נקרא cascade וספציפיות.",
        child:
          "אם כתוב צבע כחול ואז אחר כך צבע אדום לאותו דבר, בדרך כלל האחרון מנצח. אבל id חזק יותר מ-class.",
        soldier:
          "Cascade בודק חשיבות, specificity ואז סדר הופעה. inline/id/class/tag נותנים משקל שונה.",
        student:
          "ספציפיות: id חזק מ-class, class חזק מ-tag. אם המשקל שווה, החוק שמופיע מאוחר יותר מנצח.",
        junior:
          "אל תנצח CSS עם !important מתוך לחץ. לרוב צריך selector פשוט יותר, סדר קבצים נכון, או class מפורש.",
        professor:
          "The cascade resolves competing declarations by origin, importance, specificity and order. Low-specificity systems are easier to scale.",
      },
      illustration:
        "button { color: blue; }\n.primary { color: red; }\n#save { color: green; }\n#save מנצח.",
      codeExample:
        "button { color: blue; }\n.primary { color: red; }\n#save-button { color: green; }\n\n<button id=\"save-button\" class=\"primary\">שמור</button>",
      codeExplanation:
        "שלושת החוקים מתאימים לאותו כפתור. id הוא הספציפי ביותר ולכן הצבע יהיה ירוק.",
    },
    {
      conceptName: "box model",
      difficulty: 4,
      levels: {
        grandma:
          "כל דבר בדף הוא קופסה: התוכן באמצע, סביבו padding, סביבו border, ומחוץ לו margin.",
        child:
          "כמו מתנה: המתנה היא content, הנייר הוא padding, הסרט הוא border, והרווח מהמתנות האחרות הוא margin.",
        soldier:
          "Box model: content, padding, border, margin. box-sizing:border-box גורם לרוחב לכלול padding+border.",
        student:
          "כשאלמנט יוצא מהרוחב, בדוק width, padding, border ו-box-sizing. זו סיבת layout bug נפוצה.",
        junior:
          "הגדרה גלובלית מומלצת: *, *::before, *::after { box-sizing: border-box; } כדי לחשב גדלים בצורה צפויה.",
        professor:
          "The CSS box model determines used dimensions before layout. border-box reduces mental overhead in component systems.",
      },
      illustration:
        "margin -> border -> padding -> content",
      codeExample:
        "*, *::before, *::after {\n  box-sizing: border-box;\n}\n.card {\n  width: 300px;\n  padding: 24px;\n  border: 1px solid #ddd;\n  margin-block: 16px;\n}",
      codeExplanation:
        "עם border-box, ה-300px כולל content+padding+border. margin עדיין מחוץ לקופסה.",
    },
    {
      conceptName: "accessibility basics",
      difficulty: 5,
      levels: {
        grandma:
          "נגישות אומרת שגם מי שלא רואה טוב, לא משתמש בעכבר, או קורא עם תוכנה — עדיין יכול להשתמש באתר.",
        child:
          "אתר טוב עובד גם עם מקלדת, גם עם קורא מסך, וגם כשמגדילים טקסט.",
        soldier:
          "בסיס נגישות: HTML סמנטי, labels לטפסים, alt לתמונות משמעותיות, focus גלוי, contrast טוב ומקלדת.",
        student:
          "ARIA לא מחליף HTML נכון. קודם משתמשים בתגיות semantic, ורק כשאין תגית מתאימה מוסיפים aria.",
        junior:
          "בדיקה מהירה: נווט עם Tab בלבד. אם לא רואים איפה הפוקוס, או אי אפשר להפעיל כפתור, יש בעיית נגישות.",
        professor:
          "Accessibility is a product constraint, not a decoration. Correct semantics and keyboard operability are prerequisites for reliable UI.",
      },
      illustration:
        "בדיקה בסיסית: Tab -> Enter -> Esc -> contrast -> label -> alt",
      codeExample:
        "<button type=\"button\" aria-label=\"סגור חלון\">\n  <span aria-hidden=\"true\">×</span>\n</button>\n<img src=\"chart.png\" alt=\"גרף התקדמות שבועי\" />",
      codeExplanation:
        "כפתור אייקון צריך שם נגיש. span דקורטיבי מוסתר מקורא מסך. alt מתאר תמונה משמעותית.",
    },
  ],

  quiz: [
    {
      question: "למה עדיף להשתמש ב-<main> במקום div רגיל לתוכן המרכזי?",
      options: [
        "כי main מהיר יותר",
        "כי main נותן משמעות מבנית ונגישות טובה יותר",
        "כי div לא עובד בדפדפן",
        "כי main מחליף CSS",
      ],
      correct: 1,
      explanation:
        "main הוא landmark סמנטי. הוא עוזר לקורא מסך ולמנועי חיפוש להבין איפה התוכן המרכזי.",
    },
    {
      question: "מה חסר כאן?\n\n<input id=\"email\" type=\"email\" />",
      options: [
        "label שמחובר ל-input",
        "חובה להשתמש ב-div",
        "אסור להשתמש ב-type=email",
        "צריך למחוק את id",
      ],
      correct: 0,
      explanation:
        "input צריך שם נגיש. label עם for='email' הוא הדרך הבסיסית והנכונה.",
    },
    {
      question: "איזה selector בוחר class בשם card?",
      options: ["card", ".card", "#card", "<card>"],
      correct: 1,
      explanation:
        "נקודה לפני שם היא class selector. סולמית היא id selector.",
    },
    {
      question: "ב-CSS, מה בדרך כלל חזק יותר?",
      options: ["tag selector", "class selector", "comment", "margin"],
      correct: 1,
      explanation:
        "class ספציפי יותר מ-tag. id חזק יותר משניהם.",
    },
    {
      question: "מה עושה box-sizing: border-box?",
      options: [
        "מוחק padding",
        "גורם לרוחב לכלול padding ו-border",
        "מוסיף margin אוטומטי",
        "מחליף flex",
      ],
      correct: 1,
      explanation:
        "border-box מקל על חישוב רוחב: width כולל את התוכן, ה-padding וה-border.",
    },
    {
      question: "מה בדיקת הנגישות הכי מהירה שאפשר לעשות ידנית?",
      options: [
        "לשנות שם קובץ",
        "לנווט באתר עם Tab ו-Enter בלבד",
        "להקטין את מסך הדפדפן",
        "למחוק את כל ה-CSS",
      ],
      correct: 1,
      explanation:
        "ניווט מקלדת חושף מהר בעיות focus, כפתורים לא סמנטיים, ותפריטים שאי אפשר לפתוח בלי עכבר.",
    },
  ],
};
