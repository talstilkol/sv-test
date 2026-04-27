// data/lesson02.js — שיעור 02: CSS Intro — Selectors + Box Model + Position
// יסוד עיצוב web. מבחן: 6-8 שאלות צפויות.
var LESSON_02 = {
  id: "lesson_02",
  title: "שיעור 02 — CSS — Selectors, Box Model, Position",
  description:
    "CSS yesodot: selectors, box model, position, display, specificity, cascade — מה שמכריע איך הדף נראה.",
  concepts: [
    {
      conceptName: "CSS",
      difficulty: 2,
      levels: {
        grandma: "CSS = שפה לעיצוב הדף — צבעים, גודל, מיקום. בלעדיה הדף נראה כמו טקסט בלי שום פורמט.",
        child: "כמו לצייר על דף מצוייר — בוחר את הצבעים, הגדלים, איפה הולכים.",
        soldier: "Cascading Style Sheets. כל rule = selector + properties. property: value;",
        student: "CSS = declarative styling language. Rules: selector { property: value; }. הדפדפן מחיל לפי cascade order, specificity, source order.",
        junior: "פעם CSS היה כאוס אצלי — !important בכל מקום. אחרי שלמדתי specificity ו-cascade — הקוד מסודר ובלי !important.",
        professor: "CSS3+ specs: layout (Flex, Grid), animations, custom properties (--var), CSS-in-JS interop. Browser engines: Blink (Chrome), Gecko (FF), WebKit (Safari).",
      },
      illustration: "🎨 CSS rule:\n  selector { property: value; }\n  h1       { color: red;       }",
      codeExample:
        "/* External stylesheet (style.css) */\nh1 {\n  color: red;\n  font-size: 2rem;\n  margin: 0;\n}\n\n.btn {\n  background: blue;\n  padding: 0.5rem 1rem;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\n/* Inline (לא מומלץ אלא ל-overrides) */\n<h1 style=\"color: blue\">Hi</h1>\n\n/* HTML link */\n<link rel=\"stylesheet\" href=\"style.css\">",
      codeExplanation: "Rule = selector + {properties}. External stylesheet = ניהול נכון. Inline = רק overrides.",
    },
    {
      conceptName: "selector",
      difficulty: 4,
      levels: {
        grandma: "מצביע איזה אלמנט לעצב — 'כל ה-h1', 'הכפתור עם class submit', 'הראשון בתוך nav'.",
        child: "כמו לכוון את הצבע: 'תצבע את כל הילדים', 'תצבע את דני', 'תצבע את הצעיר ביותר'.",
        soldier: "Selector types: tag (h1), class (.btn), id (#main), attribute ([type=text]), pseudo (:hover, :first-child).",
        student: "Selectors: type, class, id, attribute, pseudo-class (:hover, :focus, :nth-child), pseudo-element (::before, ::after). Combinators: descendant (space), child (>), adjacent (+), sibling (~).",
        junior: "פעם השתמשתי ב-id לעיצוב — specificity גבוה מדי, קשה ל-override. עכשיו: רק class. Tailwind/BEM. id רק ל-JS hooks.",
        professor: "CSS Selectors Level 4 spec. Specificity calc: inline=1000, id=100, class/attr/pseudo=10, type=1. !important overrides cascade. Universal selector (*) lowest specificity.",
      },
      illustration:
        "🎯 Selector types:\n  h1          → all <h1>\n  .btn        → class=btn\n  #header     → id=header\n  a:hover     → pseudo-class\n  div > p     → direct child\n  ul li       → descendant",
      codeExample:
        "/* Type */\nh1 { color: red; }\n\n/* Class */\n.btn { padding: 1rem; }\n\n/* ID (low usage today) */\n#main-header { ... }\n\n/* Attribute */\ninput[type=\"email\"] { border: 1px solid #ccc; }\na[href^=\"https\"] { color: green; }  /* starts with */\na[href$=\".pdf\"] { color: red; }      /* ends with */\n\n/* Pseudo-class */\nbutton:hover { background: blue; }\ninput:focus { outline: 2px solid blue; }\nli:nth-child(odd) { background: #eee; }\n\n/* Pseudo-element */\np::first-line { font-weight: bold; }\nh1::before { content: '★ '; }\n\n/* Combinators */\nnav > ul { ... }      /* direct child */\nh1 + p { ... }        /* adjacent sibling */\nh1 ~ p { ... }        /* general sibling */",
      codeExplanation: "Type/class/id basic. Attribute לקלטים. Pseudo-class למצבים (hover/focus). Pseudo-element לחלקי טקסט. Combinators ליחסי DOM.",
    },
    {
      conceptName: "box model",
      difficulty: 5,
      levels: {
        grandma: "כל אלמנט = קופסה עם 4 שכבות: תוכן, padding, border, margin.",
        child: "כמו מתנה: תוכן בפנים, גליפ סביב (padding), קופסה (border), נייר אריזה (margin).",
        soldier: "Box model: content + padding + border + margin. רוחב כולל = sum.",
        student: "box-sizing: content-box (default) — width/height = content בלבד, padding+border מתווספים. box-sizing: border-box — width = content+padding+border (הגיוני יותר).",
        junior: "פעם width: 200px + padding: 20px = 240px בפועל. הופכל ה-layout. עכשיו: * { box-sizing: border-box; } תמיד. עכשיו 200px = 200px.",
        professor: "CSS Box Model (CSS2). box-sizing in CSS3 changed the game. visual formatting model: each element generates 0 or more boxes. Margin collapse: vertical margins between siblings/parent collapse to max.",
      },
      illustration:
        "📦 Box model:\n  ┌─ margin ─────────┐\n  │ ┌─ border ─────┐ │\n  │ │ ┌─ padding ┐ │ │\n  │ │ │ content  │ │ │\n  │ │ └──────────┘ │ │\n  │ └──────────────┘ │\n  └──────────────────┘",
      codeExample:
        "/* Default — content-box (counter-intuitive) */\n.card {\n  width: 200px;     /* רק ה-content */\n  padding: 20px;\n  border: 5px solid;\n  /* בפועל: 200 + 40 + 10 = 250px */\n}\n\n/* ✅ Modern: border-box */\n* {\n  box-sizing: border-box;\n}\n.card {\n  width: 200px;     /* כולל padding + border */\n  padding: 20px;\n  border: 5px solid;\n  /* בפועל: 200px בדיוק */\n}\n\n/* Margin shortcuts */\nmargin: 10px;              /* כל הצדדים */\nmargin: 10px 20px;         /* top/bottom, left/right */\nmargin: 10px 20px 30px;    /* top, left/right, bottom */\nmargin: 10px 20px 30px 40px; /* TRBL — top right bottom left */",
      codeExplanation: "border-box = width כולל. תמיד עם * { box-sizing: border-box; }. margin shortcuts: 1=all, 2=v/h, 4=trbl.",
    },
    {
      conceptName: "position",
      difficulty: 6,
      levels: {
        grandma: "איך אלמנט ממוקם בדף — בזרימה הרגילה, לחוף, צף מעל, נצמד למסך.",
        child: "איפה הילד יושב — באמצע השורה (static), על השולחן (relative), צף באוויר (absolute), נצמד לחלון (fixed).",
        soldier: "position: static (default), relative, absolute, fixed, sticky. עם top/right/bottom/left.",
        student: "static = normal flow. relative = ביחס לעצמו (top/left יזיזו, אבל המקום נשמר). absolute = ביחס ל-relative parent. fixed = ביחס ל-viewport. sticky = relative עד threshold, אז fixed.",
        junior: "התבלבלתי בין absolute ו-fixed. עכשיו: absolute = יחסית ל-relative parent (אם אין — ל-html). fixed = יחסית למסך (לא זז ב-scroll). sticky = magic — מתחיל relative, נדבק כשמגיע ל-top.",
        professor: "Containing block: per spec. Position: static (no offset effect), relative (offset, normal flow space kept), absolute (removed from flow, positioned by containing block), fixed (viewport), sticky (containment + offset trigger).",
      },
      illustration:
        "📍 Position types:\n  static:   זרימה רגילה (default)\n  relative: ביחס לעצמו, נשאר ב-flow\n  absolute: יוצא מ-flow, ביחס ל-relative parent\n  fixed:    יוצא מ-flow, ביחס ל-viewport (תפריט סקירה)\n  sticky:   relative עד scroll-threshold",
      codeExample:
        "/* Modal centered with absolute */\n.parent {\n  position: relative;  /* anchor for absolute child */\n  height: 400px;\n}\n.child {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  /* מרכוז מושלם */\n}\n\n/* Fixed header */\nheader {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  background: white;\n  z-index: 100;\n}\n\n/* Sticky sidebar */\n.sidebar {\n  position: sticky;\n  top: 80px;  /* מתחת ל-header fixed */\n}",
      codeExplanation: "absolute + relative parent + transform = מרכוז. fixed לheader/footer צף. sticky = scroll-triggered.",
    },
    {
      conceptName: "display",
      difficulty: 4,
      levels: {
        grandma: "איך האלמנט מוצג: בלוק שלם, בתוך שורה, או חבוי לגמרי.",
        child: "סוג ההצגה — שולחן (block), חברים (inline), מוסתר (none).",
        soldier: "display: block | inline | inline-block | none | flex | grid.",
        student: "block = full width, ב-flow. inline = רק רוחב התוכן, ללא רוחב/גובה. inline-block = inline + accept dimensions. none = הוצא מ-DOM render.",
        junior: "פעם בלבלתי inline ו-inline-block. inline = <span>, לא יכול לקבל width. inline-block = כן יכול. block = <div>. ב-2026: בעיקר flex/grid.",
        professor: "CSS Display Module Level 3. Outside (block/inline) + Inside (flow/flex/grid/table) syntax. Modern: display: flex split into 'flex flex' (outer flex, inner flex layout).",
      },
      illustration:
        "📺 display types:\n  block:        ███████████ (full width)\n  inline:       ██ (only content)\n  inline-block: ██ but can have width/height\n  flex:         ██ ██ ██ (flex container)\n  none:         (hidden, no space)",
      codeExample:
        "/* Default behavior */\ndiv  { display: block; }     /* default */\nspan { display: inline; }    /* default */\n\n/* Inline-block: שילוב */\n.tag {\n  display: inline-block;\n  padding: 0.5rem;\n  margin: 0.2rem;\n  /* בתוך שורה אבל יכול לקבל גודל */\n}\n\n/* Hide */\n.hidden { display: none; }   /* removed from layout */\n.invisible { visibility: hidden; } /* takes space */\n\n/* Flex/Grid (modern) */\n.row { display: flex; }\n.grid { display: grid; }",
      codeExplanation: "block לקופסאות. inline לטקסט. inline-block לתוויות. none = יוצא מ-layout. visibility: hidden נשאר במקום.",
    },
    {
      conceptName: "specificity",
      difficulty: 7,
      levels: {
        grandma: "כשיש כמה rules סותרים — מי מנצח? לפי 'חוזק' של ה-selector.",
        child: "כמו אבן-נייר-מספריים: id חזק יותר מ-class, class חזק יותר מ-tag.",
        soldier: "Specificity: inline=1000, id=100, class/attr/pseudo-class=10, tag/pseudo-element=1. !important מנצח הכל.",
        student: "Specificity calculated per rule. Higher specificity wins. Equal: source order (later wins). !important — last resort, מסבך הkode.",
        junior: "פעם בלבלתי ב-CSS שלא הופעל. הבנתי: inline style ב-HTML דרס class. גם id דרס class. עכשיו אני יודע: לחשב specificity.",
        professor: "Specificity vector (a, b, c, d): inline, ids, classes/attrs/pseudo-classes, types/pseudo-elements. Compare lexicographically. Universal (*), :where() = 0 specificity. :is() takes max of arg list.",
      },
      illustration:
        "⚖️ Specificity:\n  inline    = (1,0,0,0)  → strongest\n  #header   = (0,1,0,0)\n  .btn      = (0,0,1,0)\n  div       = (0,0,0,1)  → weakest\n  !important → ULTIMATE override",
      codeExample:
        "/* (0,0,0,1) — type */\np { color: blue; }\n\n/* (0,0,1,0) — class. wins over type */\n.intro { color: red; }\n\n/* (0,1,0,0) — id. wins over class */\n#hero { color: green; }\n\n/* (1,0,0,0) — inline. wins over id */\n<p style=\"color: yellow\">...</p>\n\n/* (0,0,2,1) — class + type. wins over class alone */\np.intro { color: orange; }\n\n/* !important — last resort */\np { color: pink !important; }\n\n/* Modern: no !important — refactor instead */",
      codeExplanation: "specificity מנצח. סדר: inline > id > class > type. שני זהים = source order (מאוחר). !important — הימנע.",
    },
  ],
};
