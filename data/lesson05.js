// data/lesson05.js — שיעור 05: DOM + Events
// יסוד JS — אינטראקציה עם הדף. מבחן: 6-8 שאלות צפויות.
var LESSON_05 = {
  id: "lesson_05",
  title: "שיעור 05 — DOM, Events, ואינטראקציה בדפדפן",
  description:
    "DOM API, querySelector, addEventListener, event delegation, bubbling/capturing, preventDefault.",
  concepts: [
    {
      conceptName: "DOM",
      difficulty: 4,
      levels: {
        grandma: "DOM = הייצוג בזיכרון של הדף. עץ של אלמנטים שאפשר לקרוא ולשנות מ-JS.",
        child: "כמו עץ משפחה של כל הדברים בדף — אבא הוא <body>, ילדים הם <h1>, <p>, וכו'.",
        soldier: "Document Object Model — API שמאפשר ל-JS לגשת ולשנות אלמנטים, attributes, וטקסט.",
        student: "DOM = tree representation של HTML document. Each tag = node. JS APIs: document.querySelector, .createElement, .appendChild, .removeChild.",
        junior: "פעם בלבלתי בין HTML למה שיש בזיכרון. עכשיו אני יודע: HTML זה ה-source. הדפדפן parse אותו ויוצר DOM tree. JS משנה את ה-tree, והדפדפן מרנדר מחדש.",
        professor: "DOM = W3C standard tree representation. Nodes: Element, Text, Comment, Document. Mutations trigger reflow + repaint. Modern: Virtual DOM (React) משווה לפני mutation אמיתית.",
      },
      illustration:
        "🌳 DOM tree:\n  document\n    └── html\n         ├── head\n         │    ├── title\n         │    └── meta\n         └── body\n              ├── h1\n              └── p",
      codeExample:
        "// קריאת DOM\nconst h1 = document.querySelector('h1');\nconsole.log(h1.textContent);\n\n// שינוי DOM\nh1.textContent = 'כותרת חדשה';\nh1.style.color = 'red';\nh1.classList.add('highlight');\n\n// יצירת אלמנט חדש\nconst p = document.createElement('p');\np.textContent = 'פסקה חדשה';\ndocument.body.appendChild(p);",
      codeExplanation: "querySelector מקבל CSS selector. textContent קורא/כותב טקסט. classList.add מוסיף class. createElement+appendChild יוצר אלמנט חדש.",
    },
    {
      conceptName: "querySelector",
      difficulty: 3,
      levels: {
        grandma: "בחירת אלמנט בדף לפי 'כתובת' (selector) — id, class, tag.",
        child: "כמו 'מצא לי את הילד עם כובע אדום בקבוצה'.",
        soldier: "document.querySelector(selector) מחזיר את האלמנט הראשון שתואם. querySelectorAll מחזיר את כולם.",
        student: "querySelector(css) → Element|null. Selectors: #id, .class, tag, [attr], [attr=val], parent>child, parent descendant. querySelectorAll → NodeList (לא Array!).",
        junior: "פעם השתמשתי ב-getElementById, getElementsByClassName, getElementsByTagName בלבול! עכשיו רק querySelector ו-querySelectorAll — אחיד עם CSS.",
        professor: "querySelector implements CSS Selectors Level 4. Performance: getElementById יותר מהיר אבל מינימלי. NodeList vs HTMLCollection: Live (getElement*) vs Static (querySelector*).",
      },
      illustration: "🔍 selectors:\n  '#main' → id=main\n  '.btn' → class btn\n  'p' → all <p>\n  'div > p' → direct child\n  'a[href^=http]' → external links",
      codeExample:
        "const header = document.querySelector('#main-header');\nconst buttons = document.querySelectorAll('.btn');\nconst firstParagraph = document.querySelector('article p');\nconst externalLinks = document.querySelectorAll('a[href^=\"http\"]');\n\n// NodeList מאפשר forEach (לא map/filter ישיר)\nbuttons.forEach(btn => btn.classList.add('active'));",
      codeExplanation: "querySelector לאלמנט בודד, querySelectorAll לרשימה. NodeList תומך ב-forEach. להמיר ל-Array: Array.from(buttons) או [...buttons].",
    },
    {
      conceptName: "addEventListener",
      difficulty: 4,
      levels: {
        grandma: "מקשיב לאירועים — 'תקרא לי כשמישהו לוחץ על הכפתור'.",
        child: "תופס שעון מעורר — 'מתי המשתמש לוחץ → תפעיל פונקציה'.",
        soldier: "element.addEventListener('click', callback) — הקוד יורץ בכל פעם שהאירוע מתרחש.",
        student: "addEventListener(type, handler, options). Types: click, submit, change, keydown, mouseover, scroll. Options: { once, passive, capture }.",
        junior: "פעם השתמשתי ב-onclick='...' — מאוד חוסם, רק handler אחד אפשרי. עכשיו addEventListener מאפשר כמה handlers, וגם removeEventListener.",
        professor: "Event handler vs listener: onclick = property (single, overwrite). addEventListener = stack (multiple). passive: true = הצהרה שלא קורא ל-preventDefault → optimizer scrolling.",
      },
      illustration: "👂 Event listener:\n  btn.addEventListener('click', () => alert('!'))\n  btn.addEventListener('mouseover', highlight)\n  btn.addEventListener('focus', showHelp)",
      codeExample:
        "const btn = document.querySelector('#submit');\n\n// Basic\nbtn.addEventListener('click', () => {\n  console.log('clicked!');\n});\n\n// With event object\nbtn.addEventListener('click', (event) => {\n  console.log(event.target);  // האלמנט שהקליק עליו\n  event.preventDefault();      // מבטל ברירת מחדל (כמו submit)\n});\n\n// Once-only\nbtn.addEventListener('click', handleFirstClick, { once: true });\n\n// Removable\nfunction handleClick() { /* ... */ }\nbtn.addEventListener('click', handleClick);\nbtn.removeEventListener('click', handleClick);  // צריך אותה reference!",
      codeExplanation: "callback מקבל event object. preventDefault מבטל form submit / link nav. once: handler מסיר את עצמו אחרי קריאה אחת. remove דורש את אותה function reference.",
    },
    {
      conceptName: "event delegation",
      difficulty: 6,
      levels: {
        grandma: "במקום listener על כל ילד — listener אחד על אבא. כשילד נלחץ, האבא יודע.",
        child: "כמו מחנכת אחת ל-30 ילדים, במקום מורה לכל ילד.",
        soldier: "Event delegation = listener אחד על parent, בודק event.target כדי לדעת מי נלחץ. יעיל לרשימות גדולות / dynamic content.",
        student: "Bubbling מאפשר event delegation: click על li עולה ל-ul → אחד listener על ul, בדיקת e.target.matches('li').",
        junior: "טעות: 1000 li, 1000 listeners — אטי, וכל הוספת li דרשה listener חדש. עכשיו: listener אחד על ul, בודק target. הקוד 95% יותר זריז.",
        professor: "Event delegation pattern: leverage event bubbling for memory efficiency. Critical for dynamic UIs. Modern frameworks (React) use synthetic event delegation על document/root automatically.",
      },
      illustration:
        "🎯 Delegation:\n\n  Without:    ul li li li li li li\n              ↑ each has own listener (slow)\n\n  With:       ul ←listener\n              li li li li li (any click bubbles to ul)",
      codeExample:
        "// ❌ לא יעיל: listener לכל פריט\nconst items = document.querySelectorAll('.item');\nitems.forEach(item => {\n  item.addEventListener('click', () => console.log(item.textContent));\n});\n\n// ✅ Delegation: listener יחיד על parent\nconst list = document.querySelector('#list');\nlist.addEventListener('click', (e) => {\n  if (e.target.matches('.item')) {\n    console.log(e.target.textContent);\n  }\n});\n\n// עובד גם לאלמנטים שנוספו דינמית!\nlist.appendChild(newItem);  // אוטומטית 'מאזין'",
      codeExplanation: "event.target הוא האלמנט המקורי שעליו לחצו. .matches(selector) בודק אם תואם. dynamic items מקבלים listener בחינם.",
    },
    {
      conceptName: "preventDefault",
      difficulty: 4,
      levels: {
        grandma: "מבטל את הפעולה הברירת-מחדל של אירוע — כמו עצירת submit של טופס.",
        child: "כפתור 'בטל' שעוצר משהו לפני שהוא קורה.",
        soldier: "event.preventDefault() — מונע ברירת מחדל: form submit, link navigation, scroll.",
        student: "preventDefault מונע default action בלי לעצור bubble. ל-bubble — stopPropagation. עיקרי ב-form (validation לפני submit), <a> (SPA navigation).",
        junior: "טעות: שכחתי preventDefault על <form onSubmit> ב-React. הדף עשה reload! עכשיו תמיד preventDefault ראשון בכל handler של form.",
        professor: "Cancelable events: form submit, link click, contextmenu, scroll (with passive: false). preventDefault works only on cancelable events. event.defaultPrevented = true after call.",
      },
      illustration: "🛑 preventDefault use cases:\n  form submit → stop reload, do AJAX\n  <a href> → SPA routing\n  contextmenu → custom right-click\n  drag → custom drop zone",
      codeExample:
        "// טופס — מניעת submit + AJAX\nform.addEventListener('submit', async (e) => {\n  e.preventDefault();\n  const data = new FormData(e.target);\n  await fetch('/api', { method: 'POST', body: data });\n});\n\n// קישור — SPA navigation\nlink.addEventListener('click', (e) => {\n  e.preventDefault();\n  history.pushState({}, '', e.target.href);\n  renderPage();\n});",
      codeExplanation: "form: preventDefault → לא reload. link: preventDefault → לא ניווט מלא, אנחנו מנהלים. תמיד ב-handler.",
    },
    {
      conceptName: "bubbling vs capturing",
      difficulty: 7,
      levels: {
        grandma: "אירוע עובר 2 שלבים: יורד מ-document לאלמנט, אז עולה ממנו ל-document.",
        child: "כמו אבן שזורקים — קודם נופלת (capture), אז קופצת (bubble).",
        soldier: "Capturing: document → target (ירידה). Target: על האלמנט. Bubbling: target → document (עליה). addEventListener default = bubbling.",
        student: "3 phases: Capture (down), Target (at element), Bubble (up). addEventListener(type, handler, true) = capture phase. event.stopPropagation() עוצר. .stopImmediatePropagation() עוצר גם handlers אחרים.",
        junior: "פעם 2 listeners על div ועל ילד — שניהם רצו! בלבל אותי. אחרי שלמדתי על bubble: בכל קליק → ילד עוד אז div. לא רציתי כפול → stopPropagation.",
        professor: "Event flow per W3C DOM Level 3: Phase 1 (Capture), Phase 2 (Target), Phase 3 (Bubble). useCapture flag (legacy) או options.capture. Performance: handlers in capture run before target.",
      },
      illustration:
        "📡 Event phases:\n\n  Capture ↓\n    document → html → body → div → button\n  Target  •          (the click)\n  Bubble  ↑\n    button → div → body → html → document",
      codeExample:
        "// Bubbling (default)\ndiv.addEventListener('click', () => console.log('div'));\nbtn.addEventListener('click', () => console.log('btn'));\n// click on btn → 'btn', then 'div'\n\n// Capturing\ndiv.addEventListener('click', () => console.log('div CAPTURE'), true);\nbtn.addEventListener('click', () => console.log('btn'));\n// click on btn → 'div CAPTURE', then 'btn'\n\n// Stop propagation\nbtn.addEventListener('click', (e) => {\n  e.stopPropagation();  // div לא יקבל\n  console.log('only btn');\n});",
      codeExplanation: "Default = bubble (target ראשון, אז למעלה). true בארגומנט שלישי = capture (מלמעלה). stopPropagation עוצר לאחר ה-handler הנוכחי.",
    },
    {
      conceptName: "FormData",
      difficulty: 5,
      levels: {
        grandma: "מבנה שאוסף את כל שדות הטופס יחד — להיות מוכן לשליחה.",
        child: "כמו תיק שמכניסים בו את כל הפתקים מהשיעור.",
        soldier: "FormData = API שאוסף שמות+ערכים מ-form. שולחים ל-fetch כ-body.",
        student: "new FormData(formEl) → iterates all input[name] עם value. Used in fetch with body — server gets multipart/form-data. .append, .get, .has, .entries methods.",
        junior: "פעם בניתי form ידני — כתבתי 20 שורות לאסוף ערכים. עכשיו new FormData(form) ו-זה מחזיר הכל. תומך גם ב-file upload ו-multiple values.",
        professor: "FormData implements multipart encoding. Browser handles boundaries, Content-Type. Iterable (entries, keys, values). For JSON APIs: convert via Object.fromEntries(formData) או manual.",
      },
      illustration: "📋 FormData flow:\n  <form> + new FormData(form)\n  → iterates all <input name='X'>\n  → ready to fetch as body",
      codeExample:
        "form.addEventListener('submit', async (e) => {\n  e.preventDefault();\n  const formData = new FormData(e.target);\n\n  // קריאה ידנית\n  console.log(formData.get('email'));\n  for (const [key, value] of formData.entries()) {\n    console.log(key, value);\n  }\n\n  // שליחה ל-server\n  const res = await fetch('/api/users', {\n    method: 'POST',\n    body: formData,  // multipart/form-data automatic\n  });\n\n  // אם server מצפה ל-JSON:\n  const obj = Object.fromEntries(formData);\n  await fetch('/api', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(obj),\n  });\n});",
      codeExplanation: "FormData אוטומטית קוראת את כל input עם name. שליחה ב-body כ-multipart, או המרה ל-JSON עם Object.fromEntries.",
    },
    {
      conceptName: "DOMContentLoaded",
      difficulty: 3,
      levels: {
        grandma: "אירוע שיורה ברגע שהדף סיים להיטען — אבל לפני תמונות. זמן בטוח להריץ JS.",
        child: "כשהמורה גמרה לסדר את הכיתה — אז אפשר להתחיל את השיעור.",
        soldier: "document.addEventListener('DOMContentLoaded', cb) — קוד שירוץ אחרי ש-DOM נבנה אבל לפני שתמונות/CSS-ים גמרו.",
        student: "DOMContentLoaded fires after parser finishes building the DOM. Earlier than load (waits for images). defer attribute on script tag = same effect (run after DOM).",
        junior: "פעם קוד שלי רץ לפני שה-DOM היה מוכן — querySelector מחזיר null! עכשיו: DOMContentLoaded או script defer בסוף ה-head.",
        professor: "Document readiness: 'loading' (parsing), 'interactive' (DOM ready, no resources), 'complete' (everything loaded). DOMContentLoaded = 'interactive', load = 'complete'.",
      },
      illustration: "⏱ Document loading:\n  parsing... → interactive (DOMContentLoaded) → complete (load)",
      codeExample:
        "document.addEventListener('DOMContentLoaded', () => {\n  // DOM ready — safe to query\n  const btn = document.querySelector('#submit');\n  btn.addEventListener('click', handleClick);\n});\n\n// Modern alternative: script defer in <head>\n// <script src=\"app.js\" defer></script>\n// → אוטומטית רץ אחרי DOM\n\n// Check current state\nif (document.readyState === 'loading') {\n  document.addEventListener('DOMContentLoaded', init);\n} else {\n  init();  // DOM כבר מוכן\n}",
      codeExplanation: "DOMContentLoaded = bezpieczne להריץ JS שצריך DOM. defer attribute עושה את אותו דבר אוטומטית. readyState לבדיקה ידנית.",
    },
  ],
};
