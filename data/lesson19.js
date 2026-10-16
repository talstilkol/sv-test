// data/lesson19.js
var LESSON_19 = {
  "id": "lesson_19",
  "title": "חזרה וסיכום JavaScript",
  "description": "חזרה אינטגרטיבית על מושגים מרכזיים של JavaScript עם דגש על הבנה מעשית וביצוע קונספטואלי.",
  "concepts": [
    {
      "conceptName": "script",
      "difficulty": 4,
      "levels": {
        "grandma": "תג script הוא כמו לחבר מנוע לאוטו — ה-HTML זה הגוף, ו-script מחבר את הקוד שגורם לכל לזוז. בלי script, הדף עומד ולא מגיב.",
        "child": "כשכותבים `<script src=\"app.js\">` ב-HTML, הדפדפן הולך להביא את הקובץ app.js ומריץ אותו. בלי זה, הקוד שכתבת פשוט לא קיים לדף.",
        "soldier": "תג `<script>` טוען ומריץ JS. defer רץ אחרי שה-HTML נפרס (עדיף לרוב), async רץ ברקע ברצף שרירותי. type=\"module\" מאפשר ES modules ונותן defer אוטומטי.",
        "student": "ה-HTML parser נעצר בכל `<script>` רגיל כדי לטעון ולהריץ — לכן defer עדיף. CDN scripts צריכים crossorigin=\"anonymous\" להגנה על error reporting. integrity hash מונע tampering.",
        "junior": "ב-Vite/CRA אתה לא כותב script tags ידנית — ה-bundler מזריק אותם. הבנה חשובה כשמוסיפים third-party scripts ל-index.html (analytics, chatbot, fonts) — defer לעומת async משפיע ישירות על TTI.",
        "professor": "defer scripts רצים לפי סדר ויחסית ל-DOMContentLoaded; async רצים ב-network-arrival order ללא guarantee. script type=\"module\" הוא defer כברירת מחדל, ויש לו own lexical scope. modulepreload מאפשר preload של graph שלם."
      },
      "codeExample": "<!-- defer: הורד ברקע, רץ אחרי HTML, שומר סדר -->\n<script defer src=\"app.js\"></script>\n<!-- async: הורד ברקע, רץ ברגע מוכן — סדר לא מובטח -->\n<script async src=\"analytics.js\"></script>",
      "codeExplanation": "defer מאפשר לדפדפן להמשיך לפרס HTML תוך כדי הורדת ה-script. הוא ירוץ רק אחרי שה-HTML כולו נפרס — אין סיכון שה-JS ינסה לגשת לאלמנט שעוד לא נוצר."
    },
    {
      "conceptName": "console.log",
      "difficulty": 4,
      "levels": {
        "grandma": "console.log זה כמו לרשום פתק לעצמך תוך כדי עבודה — 'הגעתי לכאן, וזה הערך'. אתה לא רואה אותו בדף עצמו, רק בחלון הפנימי של הדפדפן (DevTools).",
        "child": "כשכותבים console.log(name), הדפדפן מדפיס את הערך של name בחלון ה-DevTools (F12). זה הכלי הראשון לבדוק אם הקוד עושה מה שחשבת.",
        "soldier": "console.log שולח output ל-console. מקבל ארגומנטים מרובים: console.log('val:', x, 'type:', typeof x). עוד שיטות: console.error (אדום), console.warn (צהוב), console.table (טבלה), console.group.",
        "student": "console.log סינכרוני ו-eager: מעריך ביטויים ב-call time. הזהרה: log של object מציג reference, לא snapshot — עדכון לאחר הlog יופיע ב-devtools collapsed tooltip. console.dir מציג DOM node כ-object.",
        "junior": "אל תשאיר console.log ב-production — eslint rule: no-console. להדפסה מותנית, השתמש ב-DEBUG flag או ב-logger כמו pino/winston שניתן לשתוק ב-prod. ב-Node.js בvolume גבוה — process.stdout.write מהיר יותר.",
        "professor": "ב-V8, console.log לוקח reference ל-object ועלול למנוע GC. ב-Node.js, console.log כותב synchronously ל-process.stdout (writable stream). ב-browser, log objects גדולים עלולים לגרום ל-memory leaks ב-DevTools sessions ארוכות."
      },
      "codeExample": "const user = { name: 'Dana', score: 95 };\nconsole.log('user:', user);       // label + object\nconsole.error('Failed:', err.message); // אדום\nconsole.table([user]);             // טבלה קריאה",
      "codeExplanation": "העברת label לפני הערך ('user:', user) הופכת את ה-log לקריא הרבה יותר. console.table שימושי במיוחד לmassages של arrays/objects. console.error מבדל שגיאות מlog רגיל."
    },
    {
      "conceptName": "alert",
      "difficulty": 4,
      "levels": {
        "grandma": "alert זה כמו לחץ פעמון בדלת — הכל עוצר, חלון קטן קופץ עם הודעה, ועד שלוחצים OK שום דבר לא יקרה. הדפדפן ממש קפוא.",
        "child": "כשכותבים alert('שלום!'), הדפדפן עוצר הכל ומציג חלון עם ההודעה. לא רץ שום קוד אחר עד שלוחצים OK. אין עיצוב, אין CSS — רק הודעה גולמית.",
        "soldier": "alert() חוסם את ה-event loop עד לסגירה. שלושה dialogs מובנים: alert (הודעה, ללא ערך חזרה), confirm (כן/לא → boolean), prompt (קלט → string|null אם ביטלו).",
        "student": "alert היא Web API של window. synchronous-blocking — JS engine עוצר לחלוטין. לא קיימת ב-Node.js, Web Workers, או iframes cross-origin. ב-testing עם Playwright/Cypress — page.on('dialog', d => d.accept()) מטפל בה.",
        "junior": "alert לעולם לא ב-production — חוסם UX, לא סטייליזבל, לא accessible ל-screen readers, נחסמת ב-popup blockers בחלק מהמקרים. בפיתוח שימושית לzero-setup debugging מהיר לפני שמגדירים DevTools.",
        "professor": "alert() מוציאה את ה-JS engine מה-event loop עד לsettlement. sandboxed iframe ב-allow-modals חוסם אותה. ב-browsers מסוימים, tabs ברקע מקבלים 'suppress dialogs' flag — alert נשמטת בשקט."
      },
      "codeExample": "const name = prompt('מה שמך?');     // string | null\nif (confirm('להמשיך?')) {           // true | false\n  alert('ברוך הבא, ' + name + '!');\n}",
      "codeExplanation": "שלושת ה-dialog functions עובדות יחד: prompt לקלט, confirm לאישור, alert להודעה. בפרודקשן מחליפים ב-modal component עם state — אחרת חוסמים את הממשק."
    },
    {
      "conceptName": "DOM",
      "difficulty": 5,
      "levels": {
        "grandma": "DOM זה כמו תוכן העניינים החי של הדף. הדפדפן קרא את ה-HTML ויצר עץ של כל האלמנטים בזיכרון — JavaScript יכול לשנות את העץ הזה בזמן אמת, בלי לטעון מחדש.",
        "child": "כשהדפדפן קורא `<button id=\"ok\">אישור</button>`, הוא יוצר אובייקט בזיכרון שמייצג את הbutton. JavaScript מגיע ל-button הזה דרך getElementById ויכול לשנות טקסט, צבע, גודל — הכל.",
        "soldier": "DOM = Document Object Model. גישה: document.getElementById, querySelector, querySelectorAll. שינוי: element.textContent, classList, style. יצירה: createElement, appendChild. הסרה: element.remove().",
        "student": "DOM הוא W3C API שמייצג HTML כעץ nodes. כל node הוא instance של Element/HTMLElement/EventTarget. reflow (layout recalc) ו-repaint נגרמים משינויי DOM — הסיבה ל-virtual DOM ב-React.",
        "junior": "DOM manipulation ישיר מהיר לפרויקטים קטנים, קשה לנהל ב-scale — לא declarative, לא predictable state. React/Vue/Svelte פותרים את זה. לperformance, batch DOM changes ב-DocumentFragment לפני שמוסיפים ל-DOM האמיתי.",
        "professor": "DOM tree מורכב מ-ELEMENT_NODE, TEXT_NODE ועוד. ה-browser מחזיק render tree נפרד שנגזר מ-DOM + CSSOM. DOM mutations שיכולות לגרום ל-forced synchronous layout (getBoundingClientRect, offsetWidth) — יקרות ב-hot path."
      },
      "codeExample": "const btn = document.querySelector('#submit-btn');\nbtn.textContent = 'שמור';           // שינוי טקסט\nbtn.classList.add('active');        // הוספת class\nbtn.style.display = 'none';        // הסתרה",
      "codeExplanation": "querySelector מחזיר אלמנט אחד לפי CSS selector. מכאן שינוי תוכן (textContent), class-ים (classList.add/remove/toggle), ו-style ישיר. כל שינוי מתבצע מיידית ב-DOM החי."
    },
    {
      "conceptName": "Data Types",
      "difficulty": 4,
      "levels": {
        "grandma": "JavaScript יודע מה אתה שמרת — מספר, טקסט, כן/לא, או 'כלום'. לכל קופסה כללים אחרים: בקופסת מספרים אפשר לחשב; בקופסת טקסט אפשר להדביק ולחתוך.",
        "child": "לכל ערך ב-JS יש סוג. 5 הוא number, 'שלום' הוא string, true הוא boolean. כשמנסים לחבר מספר עם טקסט — JS עושה coercion, לפעמים בדרכים מפתיעות: '5' + 3 === '53'.",
        "soldier": "7 primitive types: number, string, boolean, null, undefined, symbol, bigint. + reference type: object (כולל arrays ופונקציות). typeof מחזיר string — הזהרה: typeof null === 'object' (legacy bug).",
        "student": "JS dynamically-typed: אותו identifier יכול להחזיק types שונים. coercion אוטומטי: '5' + 3 === '53' אבל '5' - 3 === 2. בדיקה בטוחה עם === (strict, ללא coercion) לעומת == (loose, עם coercion).",
        "junior": "TypeScript נותן static types ומונע רוב ה-coercion bugs ב-compile time. ב-JS טהור, הגן עם typeof x === 'string' לפני שניגשים ל-string methods. מAPI responses — תמיד validate: Number(req.body.age) לפני שמשתמשים כמספר.",
        "professor": "V8 מייצג values כ-tagged pointers: Smi (31-bit integer ישיר), HeapObject (pointer ל-heap). type coercion שיצא מה-shape הצפוי גורם ל-IC miss ו-deoptimization. ב-TypeScript, literal types ו-discriminated unions מבטיחים correctness ב-compile time."
      },
      "codeExample": "typeof 42           // 'number'\ntypeof 'hello'      // 'string'\ntypeof true         // 'boolean'\ntypeof undefined    // 'undefined'\ntypeof null         // 'object'  ← legacy bug!\ntypeof []           // 'object' — משתמשים ב-Array.isArray()\ntypeof function(){} // 'function'",
      "codeExplanation": "typeof הוא הדרך לבדוק סוג ב-runtime. שתי הפתעות: typeof null === 'object' (שגיאה היסטורית ב-JS), ו-typeof [] === 'object' — לבדוק מערך ספציפית משתמשים ב-Array.isArray()."
    },
    {
      "conceptName": "let",
      "difficulty": 3,
      "levels": {
        "grandma": "\"let\" זה כמו תווית על מגירה במטבח — שמת תפוח, אחר כך לקחת אותו והכנסת תפוז, ושמרת על אותה תווית. הערך משתנה, השם נשאר.",
        "child": "let אומר ל-JavaScript: 'תיצור לי משבצת ששמה counter, ובתוכה תשמור עכשיו 0. אחר כך אני אבקש לעדכן את הערך'. השם נשאר, הערך מתחלף.",
        "soldier": "let מצהיר משתנה block-scoped — חי רק בתוך ה-{} שהכי קרוב אליו. אפשר להחליף ערך ב-counter = 5; אבל אסור להגדיר את השם counter פעמיים באותו block.",
        "student": "let הוצג ב-ES2015 כתחליף ל-var. שני הבדלים מרכזיים: (1) block scope במקום function scope, (2) Temporal Dead Zone — גישה ל-let לפני ההצהרה זורקת ReferenceError, לא מחזירה undefined.",
        "junior": "ב-React/Next מודרני, רוב המשתנים שלך יהיו const. let בא לתפקיד רק כשבאמת צריך reassignment — counter בלולאה, accumulator, swap. דגל אדום בקוד-ריוויו: let שמוגדר ולעולם לא משתנה צריך להיות const.",
        "professor": "let יוצר binding חדש בכל איטרציה של for loop — זה הבסיס לפתרון ה-classic closure-over-loop bug של var. ב-engine, let משתמש ב-LexicalEnvironment שונה לכל block, מה שמאפשר GC לשחרר משתנים מוקדם יותר."
      },
      "codeExample": "let counter = 0;\ncounter += 1;\n// counter עכשיו 1",
      "codeExplanation": "let מתאים בדיוק כשהערך משתנה לאורך זמן — counter בלולאה, accumulator, או משתנה שמוקצה בתוך if/else. אם הערך לעולם לא משתנה — תמיד const."
    },
    {
      "conceptName": "var",
      "difficulty": 3,
      "levels": {
        "grandma": "\"var\" זה הסבא של let — מילה ישנה ל-JavaScript שעדיין עובדת, אבל הצעירים כבר לא משתמשים בה. כמו רדיו טרנזיסטור: עובד, אבל יש דברים יותר טובים.",
        "child": "var זה כמו let, רק שזה היה הראשון. הוא יותר 'גמיש' — לפעמים מאפשר דברים שיוצרים באגים שקטים, ולכן עברנו ל-let ול-const.",
        "soldier": "var function-scoped: חי בכל הפונקציה שמכילה אותו, גם אם הוצהר בתוך if. יש לו גם hoisting — אפשר 'להשתמש' בו לפני שהוצהר ולקבל undefined במקום שגיאה.",
        "student": "var קיים ב-JavaScript מלפני ES2015. הבעיות שלו: (1) function-scope — דולף החוצה מ-blocks, (2) hoisted as undefined — מסתיר טעויות, (3) ניתן להגדיר פעמיים באותו scope. ESLint עם no-var מסמן כל var כטעות.",
        "junior": "ב-codebase של 2025 לא תכתוב var. אבל תפגוש אותו ב-legacy code, ב-pre-ES2015 examples, וב-package-ים ישנים. תדע לזהות את הבאגים שהוא יוצר: closures בלולאות, משתנים שדולפים, hoisting confusion.",
        "professor": "var attaches ל-VariableEnvironment של הפונקציה (או ל-globalThis ב-top-level). hoisting הוא תוצר של 2-pass evaluation — הbindings נוצרים בכל ה-VariableEnvironment בpass הראשון, אז ה-execution pass מאתחל אותם. זה גם הסיבה ש-`var x` ב-global מייצר prop על globalThis אבל `let x` לא."
      },
      "codeExample": "// legacy — אל תכתוב var בקוד חדש\nvar oldMode = true;",
      "codeExplanation": "var נוצר לפני ES2015 ויש לו התנהגות שמובילה לבאגים: function-scope (דולף מ-blocks), hoisting כ-undefined, ו-redeclaration שקטה. השתמש ב-let/const במקום."
    },
    {
      "conceptName": "const",
      "difficulty": 3,
      "levels": {
        "grandma": "\"const\" זה כמו לכתוב את שם הילד שלך על תעודת הזהות — אחרי שכתבת, אי אפשר לשנות. אבל אם זה אובייקט (תיק עם דברים), אפשר עדיין להוציא ולהכניס פריטים בתוכו.",
        "child": "const אומר ל-JavaScript: 'תיצור משבצת ששמה PI ובתוכה 3.14, ותסגור אותה — אסור לשים בה ערך אחר אחר כך'. אם תנסה const PI = 3; PI = 4; — תקבל TypeError.",
        "soldier": "const block-scoped כמו let, אבל ה-binding immutable — אסור reassignment. אבל אם הערך הוא object/array, ה-properties בתוכו עדיין mutable: const arr = [1,2]; arr.push(3) עובד.",
        "student": "const מצהיר על binding immutable, לא ערך immutable. const obj = {x:1}; obj.x=2 חוקי. const obj = {x:1}; obj = {} זורק. ל-immutability אמיתי משתמשים ב-Object.freeze או בספריות כמו Immer.",
        "junior": "כלל אצבע: התחל כל משתנה כ-const. שדרג ל-let רק כשהקומפיילר/ה-IDE מתלונן שאתה מנסה reassignment. זה מקטין את הfootprint של המוטציות בקוד שלך, מקל על קריאות ועל debugging — אם משתנה const עם אותו שם, אתה יודע שהערך לא השתנה.",
        "professor": "const יוצר binding ב-LexicalEnvironment עם immutable record flag. הניסיון לreassign נתפס בשלב syntactic לפעמים (assignment to const) או runtime ב-strict mode. ל-React: const גם רומז ל-React שהvalue לא יזוז ב-renders, ועל כן מתאים יותר ל-useMemo/useCallback dependencies."
      },
      "codeExample": "const APP_NAME = 'LumenPortal';\n// APP_NAME = 'X'; // TypeError: Assignment to constant\nconst settings = { theme: 'dark' };\nsettings.theme = 'light'; // OK — properties עדיין mutable",
      "codeExplanation": "const אוסר reassignment של ה-binding, אבל לא מקפיא את הערך עצמו. אובייקטים/מערכים עדיין ניתנים לשינוי פנימי — זה הבדל קריטי שמבלבל מתחילים."
    },
    {
      "conceptName": "camelCase",
      "difficulty": 4,
      "levels": {
        "grandma": "camelCase זו שיטת כתיבה שמשמשת בתכנות לשמות מורכבים — כל מילה חדשה מתחילה באות גדולה, כמו גמל עם קוצים: firstName, totalAmount, getUserById.",
        "child": "ב-JavaScript, שמות משתנים ופונקציות נכתבים ב-camelCase: המילה הראשונה קטנה, כל מילה נוספת מתחילה באות גדולה. total_price הוא Python-style, ב-JS כותבים totalPrice.",
        "soldier": "camelCase למשתנים ופונקציות (getUserName). PascalCase לclass-ים וReact components (UserCard). SCREAMING_SNAKE_CASE לקבועים (MAX_RETRIES). kebab-case לCSS classes ו-HTML attributes.",
        "student": "מוסכמות naming הן חלק מ-style guide — Airbnb, Google, לintern. camelCase ב-JS הוא de-facto standard לפי ECMAScript spec. ESLint + prettier אוכפים אותו אוטומטית בCI.",
        "junior": "consistency בnaming חשובה יותר מהבחירה הספציפית — codebase שמערבב snake_case ו-camelCase קשה לקריאה. IDE rename refactoring (F2) מחליף את כל ה-occurrences בטוח.",
        "professor": "naming הוא חלק מ-cognitive load management — consistent conventions מאפשרות לquickly pattern-match ב-code review. ב-large monorepos, linters כמו @typescript-eslint/naming-convention אוכפים camelCase ל-variables, PascalCase ל-types/classes."
      },
      "codeExample": "const myUserName = 'Dana';",
      "codeExplanation": "camelCase משמש בתוך מבני קוד אמיתיים כדי להציג/לבצע פעולה ברורה, במקום לזכור רק הגדרה מילולית."
    },
    {
      "conceptName": "if/else",
      "difficulty": 4,
      "levels": {
        "grandma": "if/else זה כמו הכוס של יפת — אם הגשם יבוא, יצא לשדה; אם לא, ישאר בבית. הקוד מסתכל על תנאי ובוחר איזו מסלול לרוץ.",
        "child": "if אומר 'אם התנאי נכון, תעשה את זה'. else אומר 'אחרת, תעשה את זה'. if (score >= 60) אומר: אם הציון גבוה מ-60, הצג 'עבר', אחרת הצג 'נכשל'.",
        "soldier": "if בודק תנאי (truthy/falsy). else if מוסיף branch נוסף. else תופס הכל. אפשר גם ternary קצר: const result = score >= 60 ? 'pass' : 'fail'. falsy values: false, 0, '', null, undefined, NaN.",
        "student": "if/else מעריך expression כ-boolean. JS משתמש ב-type coercion לממיר ל-truthy/falsy. הזהרה: if (obj) לא מספיק לבדוק שobj תקין — {} וגם [] הם truthy. לבדיקה מלאה: if (obj && obj.name).",
        "junior": "early return pattern עדיף על nested if/else עמוק: if (!isValid) return; במקום if (isValid) { כל הלוגיקה }. מקטין indentation ומקל על קריאה. guard clauses בתחילת פונקציה מונעות לוגיקה מסובכת.",
        "professor": "JS engine מבצע branch prediction. nested ternary עמוק פוגע בקריאות — TypeScript discriminated unions + exhaustive switch עדיפים לlarge branching logic. early return מפחית cyclomatic complexity."
      },
      "codeExample": "const score = 75;\nif (score >= 90) {\n  console.log('מצוין');\n} else if (score >= 60) {\n  console.log('עבר');\n} else {\n  console.log('נכשל');\n}",
      "codeExplanation": "else if מאפשר לבדוק תנאים נוספים בסדר — JS בודק מלמעלה למטה ועוצר בראשון שמתקיים. חשוב לסדר את ה-cases מהספציפי לכללי."
    },
    {
      "conceptName": "switch",
      "difficulty": 4,
      "levels": {
        "grandma": "switch זה כמו לוח מפתחות: בודקים איזה ערך הגיע, ומצביעים על הדלת המתאימה. הרבה אפשרויות — כל case הוא דלת אחרת.",
        "child": "switch לוקח ערך ובודק אם הוא שווה לאחד מה-cases. אם status === 200 — עושה את הקוד ב-case 200. אם לא מצא אף case — הולך ל-default.",
        "soldier": "switch משווה בstrict equality (===). חובה לשים break בסוף כל case — בלי break, ה-code נופל ל-case הבא (fallthrough). default מטפל בכל ערך שלא match לשום case.",
        "student": "switch ו-if/else שקולים מבחינת לוגיקה, אבל switch קריא יותר כשיש הרבה cases על אותה משתנה. intentional fallthrough (ללא break) מסוכן — תמיד הוסף comment // fallthrough לציין כוונה.",
        "junior": "ב-Redux reducers, switch הוא pattern קלאסי: switch(action.type) { case 'INCREMENT': ... }. TypeScript exhaustive check: הוסף default: const _exhaustive: never = action שיתריע אם הוספת action type חדש בלי לטפל בו.",
        "professor": "JS engine יכול לייעל switch על strings/integers לjump table — מהיר יותר מ-if/else chain ארוכה. fallthrough ב-spec הוא intentional (C heritage), אבל ESLint no-fallthrough אוכף break כברירת מחדל."
      },
      "codeExample": "switch (action) {\n  case 'start':\n    startGame();\n    break;\n  case 'pause':\n  case 'stop':          // fallthrough מכוון\n    endGame();\n    break;\n  default:\n    console.warn('Unknown action:', action);\n}",
      "codeExplanation": "שני cases ברצף ללא break ביניהם (pause/stop) הוא fallthrough מכוון — שניהם יריצו את אותו קוד. default תמיד בסוף לתפוס ערכים לא מוכרים."
    },
    {
      "conceptName": "debugger",
      "difficulty": 4,
      "levels": {
        "grandma": "debugger זה כמו לשים יד על השולחן ולהגיד 'עצור!' לקוד — הדפדפן קופא בדיוק בנקודה הזו ומאפשר לך להסתכל על כל ערך, צעד אחרי צעד.",
        "child": "כשכותבים debugger; בקוד ופותחים DevTools (F12), הקוד עוצר בשורה הזו. אתה יכול לראות מה הערך של כל משתנה, ולהמשיך צעד-צעד.",
        "soldier": "debugger; שקול ל-breakpoint ידני. עובד רק אם DevTools פתוח. מהDevTools: F10 = step over, F11 = step into, F8 = continue. אפשר גם לשים breakpoints ישירות ב-DevTools Sources panel.",
        "student": "debugger; הוא keyword ב-JS spec — לא פונקציה. אם DevTools סגור, הוא מתעלם ממנו ולא עוצר. ב-Node.js: node --inspect app.js מפעיל debugger mode, מתחבר דרך chrome://inspect.",
        "junior": "breakpoints ב-DevTools Sources panel עדיפים על debugger בקוד — אין שכחה להסיר. conditional breakpoints (click-right על breakpoint) מפסיקים רק כשתנאי מתקיים — שימושי ב-loops ארוכות. logpoints (הוסף log בלי לעצור) שימושיים ל-production debugging.",
        "professor": "debugger; מפעיל ה-statement שקול ל-breakpoint ב-DevTools. ב-V8, --inspect-brk עוצר בשורה הראשונה לפני כל execution. Chrome DevTools Protocol (CDP) הוא ה-wire protocol שמאחורי הכל — Puppeteer/Playwright משתמשים בו לautomation."
      },
      "codeExample": "function calculateTotal(items) {\n  debugger; // הקוד יעצור כאן אם DevTools פתוח\n  const total = items.reduce((sum, item) => sum + item.price, 0);\n  return total;\n}",
      "codeExplanation": "debugger; מניח breakpoint בקוד עצמו. כשפותחים DevTools ומריצים — הביצוע עוצר כאן ואפשר לבדוק את items ו-sum בכל שלב. לזכור: להסיר לפני commit!"
    },
    {
      "conceptName": "network",
      "difficulty": 4,
      "levels": {
        "grandma": "network הוא מה שמאפשר לדפדפן לדבר עם שרתים — כמו מערכת דואר: אתה שולח בקשה, השרת שולח חזרה תשובה. כל פעם שטוענים דף או שולחים form — הנטוורק עובד.",
        "child": "כשאתה פותח אתר, הדפדפן שולח request לשרת: 'תן לי את הדף הזה'. השרת עונה בHTML/CSS/JS. כל תמונה, קובץ CSS, קובץ JS — request נפרד דרך ה-network.",
        "soldier": "HTTP request כולל: method (GET/POST/PUT/DELETE), URL, headers, ו-body (ב-POST/PUT). response כולל: status code (200/404/500), headers, ו-body. בDevTools: Network tab מציג את כל הrequests.",
        "student": "HTTP/1.1 סינכרוני: connection per request. HTTP/2 multiplexing: כמה requests על connection אחד. HTTPS מוסיף TLS encryption. CORS נדרש כשdomain שונה בין frontend ל-API.",
        "junior": "ב-Network tab ב-DevTools: בדוק status codes, response times, payload size. 404 = resource לא קיים, 401 = לא מאומת, 403 = מאומת אבל אין הרשאה, 500 = שגיאת שרת. הOpenssl ב-certificate chain חשוב לhttps.",
        "professor": "TCP handshake + TLS negotiation מוסיפים latency לכל חיבור חדש. HTTP/2 Keep-Alive מחסך זאת. Critical rendering path: HTML → CSS → CSSOM → render tree. Resource hints: preload, prefetch, preconnect מקדימים network requests לנכסים חשובים."
      },
      "codeExample": "// Network tab ב-DevTools מראה:\n// GET https://api.example.com/users  200 OK  45ms\n// POST https://api.example.com/login  401 Unauthorized\n\n// בJS: fetch שולח HTTP request\nfetch('/api/users').then(res => res.json());",
      "codeExplanation": "כל fetch() שולח HTTP request ל-network. ה-Network tab ב-DevTools (F12) מציג כל request: URL, method, status code, זמן תגובה, וגודל הנתונים — כלי הדיבוג החשוב ביותר לאפליקציות web."
    },
    {
      "conceptName": "function",
      "difficulty": 4,
      "levels": {
        "grandma": "\"function\" זה כמו מתכון בארון: כתוב פעם אחת איך מכינים עוגה, ועכשיו כל פעם שרוצים עוגה — ניגשים למתכון, נותנים מצרכים (קמח, סוכר), ומקבלים תוצאה. המתכון לא משתנה.",
        "child": "function זה מכונה קטנה: היא מקבלת קלט, עושה משהו, ומחזירה תוצאה. function add(a, b) מקבלת שני מספרים ומחזירה את הסכום שלהם. אפשר להריץ את אותה מכונה מאות פעמים עם קלטים שונים.",
        "soldier": "function היא יחידה של קוד שניתן לקרוא לה (call) שוב ושוב. function declaration: function foo() {}. function expression: const foo = function() {} או const foo = () => {}. ההבדל העיקרי: declarations hoisted לחלוטין; expressions לא.",
        "student": "ב-JavaScript פונקציות הן first-class: ניתן להעביר אותן כארגומנטים, להחזיר מפונקציה, ולשמור במשתנים. זה הבסיס ל-callbacks, higher-order functions (map/filter/reduce), ו-functional programming patterns.",
        "junior": "פונקציות טובות הן: שם פעולה ברור (createUser, getUserById), אחריות יחידה (Single Responsibility), input ידוע ו-output ידוע, ללא side effects אם אפשר. פונקציה ארוכה מ-30 שורות = ירוק לrefactor. פונקציה עם 5+ params = איתות לrefactor ל-options object.",
        "professor": "כל function ב-JS היא Object של type 'function' עם prototype, length, name. בעת call, נוצר Execution Context חדש עם LexicalEnvironment חדש שיורש מ-outer environment — זה הבסיס ל-closures. arrow functions לא יוצרות this/arguments חדשים — הן יורשות מהouter, מה שעושה אותן בחירה טבעית בתוך methods שמשתמשים ב-callbacks (כי this נשאר נכון)."
      },
      "codeExample": "function add(a, b) {\n  return a + b;\n}\nconsole.log(add(3, 4)); // 7\n\n// arrow equivalent\nconst addArrow = (a, b) => a + b;",
      "codeExplanation": "function declaration וarrow function עושים אותו דבר כאן (מחבר שני מספרים), אבל יש הבדלים עדינים: declaration hoisted, יש this/arguments משלו, מתאים למתודות; arrow קצר, יורש this מהouter scope, מתאים לcallbacks."
    },
    {
      "conceptName": "parameter",
      "difficulty": 4,
      "levels": {
        "grandma": "parameter זה כמו שם של תא ריק במתכון — הפונקציה כותבת 'מצרך ראשון' ו'מצרך שני', ובפועל אתה שם קמח ומלח. הparam מחזיק את מה שנשלח.",
        "child": "כשכותבים function greet(name) — name הוא parameter, כמו חסכון מקום לערך. כשקוראים greet('דנה'), הערך 'דנה' נכנס לname ומשם הפונקציה יכולה להשתמש בו.",
        "soldier": "parameter הוא השם בהגדרת הפונקציה; argument הוא הערך שנשלח בפועל בזמן call. default param: function greet(name = 'אורח'). rest params: function sum(...nums) מכניס הכל למערך.",
        "student": "JS לא מאמת כמות ו-type של arguments בruntime. פחות args → undefined. יותר args → מתעלם (אם לא משתמשים ב-arguments object). TypeScript מוסיף type checking ב-compile time.",
        "junior": "פונקציה עם 5+ parameters היא red flag — עדיף options object: function createUser({ name, email, role = 'user' }). יותר קריא, אין תלות בסדר, קל להוסיף param ללא שבירת callers.",
        "professor": "parameters נכנסים ל-LexicalEnvironment של ה-call frame. ב-V8, inline caches (ICs) מייעלים calls חוזרים עם אותם parameter types. rest params (...args) נוצרים כ-Array על heap, שונה מ-arguments object שהוא array-like מהעידן הישן."
      },
      "codeExample": "// parameter = שם בהגדרה, argument = ערך בפועל\nfunction greet(name, greeting = 'שלום') {\n  return `${greeting}, ${name}!`;\n}\ngreet('דנה');           // 'שלום, דנה!'\ngreet('אבי', 'היי');   // 'היי, אבי!'",
      "codeExplanation": "greeting = 'שלום' הוא default parameter — אם לא שלחו ערך, מקבל 'שלום' אוטומטית. זה מחליף את הבדיקה הישנה if (greeting === undefined) greeting = 'שלום'."
    },
    {
      "conceptName": "return",
      "difficulty": 4,
      "levels": {
        "grandma": "return זה כמו לענות לשאלה — שאלת 'כמה כוסות יש?', ואני עונה '5'. הפונקציה מחזירה את התשובה. בלי return, הפונקציה עושה משהו אבל לא עונה.",
        "child": "return שולח ערך חזרה למי שקרא לפונקציה. function double(n) { return n * 2; } — כשקוראים double(5), מקבלים בחזרה 10. בלי return, מקבלים undefined.",
        "soldier": "return עוצר ביצוע הפונקציה מיד ומחזיר ערך. ניתן להשתמש לearly return: if (!valid) return null; כ-guard clause. פונקציה ללא return מחזירה undefined אוטומטית.",
        "student": "כל function call יש לו return value. constructor call (עם new) מחזיר this אם לא return מפורש. arrow function עם body בלי {} מחזיר implicit: const double = x => x * 2 (ללא return מילה).",
        "junior": "early return pattern מפחית nesting: if (!user) return res.status(404).json({err:'not found'}); ואז הלוגיקה הראשית ללא else. מקטין cyclomatic complexity ומקל על code review.",
        "professor": "return מוציא execution מ-stack frame הנוכחי. ב-tail call optimization (TCO, ES2015 strict), recursive call בpositon של return יכול לreusestack frame — V8 לא מיישם TCO בפועל, אבל SpiderMonkey כן בחלק מהcases."
      },
      "codeExample": "function divide(a, b) {\n  if (b === 0) return null;  // early return = guard\n  return a / b;              // return ערך רגיל\n}\nconst result = divide(10, 2); // result === 5",
      "codeExplanation": "early return בtחילת הפונקציה (guard clause) מטפל במקרי קצה לפני הלוגיקה הראשית. זה מונע nesting עמוק ועושה את ה-happy path קריא יותר."
    },
    {
      "conceptName": "arrow function",
      "difficulty": 5,
      "levels": {
        "grandma": "arrow function זה גרסה קצרה של פונקציה — במקום לכתוב function add(a,b) { return a+b; } כותבים (a,b) => a+b. חץ קטן במקום הרבה מילים.",
        "child": "arrow function כותבים עם חץ: const double = x => x * 2. קוראים אותה double(5) ומקבלים 10. כשיש פעולה אחת בלי {}, ה-return אוטומטי.",
        "soldier": "תחביר: const fn = (params) => expression. עם body: const fn = (p) => { ...code; return value; }. פרמטר בודד: x => x. ללא params: () => value. ה-this של arrow יורש מה-outer scope — לא יוצרת this משלה.",
        "student": "arrow functions הוצגו ב-ES2015. הבדלים מfunction: (1) אין this/arguments משלה — יורשת מouter, (2) לא ניתן להשתמש כconstructor (new), (3) אין prototype property, (4) implicit return ב-concise body.",
        "junior": "arrow מושלמת לcallbacks: array.map(x => x * 2), array.filter(x => x > 0). ב-React: onClick={() => setCount(c => c+1)}. הימנע משימוש ב-arrow ל-object methods כשצריך this — function keyword עדיף שם.",
        "professor": "arrow functions הן lexically-bound this — נוצרות עם [[ThisValue]] מה-enclosing lexical environment. זה פותר את הבעיה הקלאסית של this binding ב-callbacks. ב-V8, arrow functions אינן optimizable כ-constructors ולא מקבלות arguments object."
      },
      "codeExample": "const numbers = [1, 2, 3, 4, 5];\n\n// concise body — return אוטומטי\nconst doubled = numbers.map(n => n * 2);      // [2,4,6,8,10]\nconst evens   = numbers.filter(n => n % 2 === 0); // [2,4]\n\n// block body — return מפורש\nconst describe = n => {\n  return n > 3 ? 'גדול' : 'קטן';\n};",
      "codeExplanation": "ב-concise body (ללא {}), הביטוי מוחזר אוטומטית — אידיאלי לmap/filter. ב-block body (עם {}), חייבים return מפורש. שני הצורות שימושיות בהקשרים שונים."
    },
    {
      "conceptName": "while",
      "difficulty": 4,
      "levels": {
        "grandma": "while זה כמו להגיד 'כל עוד הסיר לא רותח — המשך לחכות'. הקוד ממשיך לרוץ שוב ושוב כל עוד התנאי נכון, ועוצר ברגע שהתנאי נהיה שקר.",
        "child": "while בודק תנאי לפני כל ריצה. כל עוד התנאי נכון — הלולאה ממשיכה. while (count > 0) { count--; } רץ עד שcount מגיע ל-0.",
        "soldier": "while (condition) { body } — condition נבדק לפני כל iteration. אם condition שקר מלכתחילה — הגוף לא ירוץ בכלל. חשוב לוודא שהcondition ישתנה בתוך הלולאה אחרת infinite loop.",
        "student": "while מתאים כשמספר הiterations לא ידוע מראש — קריאת input עד EOF, polling עד תוצאה, עיבוד תור. for מתאים כשמספר הiterations ידוע. infinite loop מכוון: while(true) { ... break; } לloop עם exit condition אמצע.",
        "junior": "ב-async/server code, while loop סינכרוני יחסום את ה-event loop. לpolling async: setTimeout רקורסיבי, setInterval, או async/await עם await בתוך הלולאה. infinite loop ב-production = process crash.",
        "professor": "while מקמפל לtest-then-jump בassembly. V8 מייעל loops חוזרים עם loop invariant code motion (LICM): קוד שלא משתנה בין iterations מועבר החוצה. ה-JIT compiler מזהה loop patterns ומייצר optimized machine code."
      },
      "codeExample": "let attempts = 0;\nconst MAX = 3;\nwhile (attempts < MAX) {\n  const ok = tryConnect();\n  if (ok) break;    // יצא אם הצליח\n  attempts++;\n}\nconsole.log('tries:', attempts);",
      "codeExplanation": "while מתאים כשמספר הריצות לא ידוע — כאן מנסים עד MAX פעמים או עד הצלחה. break מאפשר לצאת מוקדם אם הצלחנו לפני המקסימום."
    },
    {
      "conceptName": "for",
      "difficulty": 4,
      "levels": {
        "grandma": "for זה כמו לספור כוסות על השולחן: 'התחל מ-0, כל עוד לא הגעת ל-5 — בדוק, ואז קדם ב-1'. שלושה חלקים: התחל, בדוק, קדם.",
        "child": "for (let i = 0; i < 5; i++) — i מתחיל ב-0, כל עוד i < 5 הלולאה ממשיכה, ואחרי כל ריצה i עולה ב-1. סה\"כ 5 ריצות (0,1,2,3,4).",
        "soldier": "for (init; condition; update). init רץ פעם אחת. condition נבדקת לפני כל iteration. update רץ אחרי כל iteration. for...of לiterable (מערך/string). for...in לkeys של object.",
        "student": "for classic מתאים כשיש index. for...of עדיף לiteration על ערכים. for...in מתאים לobjects (אבל שים לב ל-inherited properties). forEach לא ניתן לbreak — for/for...of כן.",
        "junior": "ב-React, כדי לrender list: array.map(item => <div key={item.id}>{item.name}</div>). key חייב להיות unique ויציב (לא index!). ב-performance-critical loops: for classic מהיר יותר מforEach בV8.",
        "professor": "V8 מייצג for loop כ-LoopStatement ב-AST. ה-JIT מייצר optimized loop עם induction variable analysis. for...of על arrays משתמש ב-iterator protocol (Symbol.iterator). for...in פחות מייעל כי בודק prototype chain."
      },
      "codeExample": "const fruits = ['תפוח', 'בננה', 'ענב'];\n\n// for classic — כשצריך index\nfor (let i = 0; i < fruits.length; i++) {\n  console.log(i, fruits[i]);\n}\n\n// for...of — כשצריך רק ערכים\nfor (const fruit of fruits) {\n  console.log(fruit);\n}",
      "codeExplanation": "for classic נותן גישה ל-index (i) ולערך (fruits[i]) — שימושי כשצריך את המיקום. for...of נקי יותר כשצריך רק את הערכים. שניהם ניתנים לbreak ו-continue."
    },
    {
      "conceptName": "break",
      "difficulty": 4,
      "levels": {
        "grandma": "break זה כמו לצאת מהחנות כשמצאת את מה שחיפשת — לא ממשיכים לעבור על כל המדפים. מוצאים, עוצרים, יוצאים.",
        "child": "break עוצר לולאה לפני שהיא גמרה. אם מחפשים מספר במערך ומצאנו — break! אין טעם להמשיך לבדוק את שאר האלמנטים.",
        "soldier": "break יוצא מה-loop הכי פנימי שמכיל אותו (for/while/switch). אם יש loops מקוננות, break יוצא רק מה-loop הנוכחי, לא מכולם. לabeled break: outer: for(...) { for(...) { break outer; } }.",
        "student": "break ב-switch מונע fallthrough לcase הבא. ב-loops, break עוצר iteration וממשיך בקוד אחרי הloop. Array.prototype.find() שימושית כחלופה לloop עם break — מחזירה ערך ראשון שעומד בתנאי.",
        "junior": "forEach לא תומכת ב-break — להשתמש ב-for...of או find/some/every. Array.prototype.some() מחזיר true ועוצרת בפנים; every() מחזיר false ועוצרת. עדיפות הקריאות: מתודות מערך > loops עם break.",
        "professor": "break מייצר jump instruction ב-bytecode. ב-labeled breaks, ה-label יוצר boundary ב-control flow graph. ב-generators, yield* מאפשר break מ-nested generator. JSC ו-V8 מייצגים break כ-unconditional branch."
      },
      "codeExample": "const users = [\n  { id: 1, name: 'אבי' },\n  { id: 2, name: 'דנה' },\n  { id: 3, name: 'רון' }\n];\n\nlet found = null;\nfor (const user of users) {\n  if (user.id === 2) {\n    found = user;\n    break;  // מצאנו — לא ממשיכים\n  }\n}\nconsole.log(found?.name); // 'דנה'",
      "codeExplanation": "break יוצא מה-loop ברגע שמצאנו את user.id === 2, במקום להמשיך לעבור על כל המערך. חלופה נקייה: users.find(u => u.id === 2) — עושה בדיוק אותו דבר."
    },
    {
      "conceptName": "continue",
      "difficulty": 4,
      "levels": {
        "grandma": "continue זה כמו לדלג על פריט בתור שלא מתאים — לא יוצאים מהתור, רק עוברים לפריט הבא. ממשיכים, לא עוצרים.",
        "child": "continue דולג על ה-iteration הנוכחי וממשיך לבאה. for (let i=0; i<5; i++) { if (i===2) continue; } ידלג על i=2 וימשיך ל-3,4.",
        "soldier": "continue קופץ ישירות לסוף ה-iteration הנוכחי — בfor, הupdate (i++) רץ ואז condition נבדקת. שונה מbreak שיוצא לחלוטין. עובד גם ב-while וב-for...of.",
        "student": "continue שימושי כ-guard clause בloop: אם פריט לא תקין — continue. מפחית nesting עמוק. filter() לעיתים קריאה יותר: במקום loop עם continue, filter מסנן לפני ה-forEach.",
        "junior": "continue ב-forEach לא עובד — forEach לא ניתן להפסיק. אפשרות: return בתוך forEach callback דולג על iteration הנוכחי (אבל לא עוצר הforEach). עדיף לעשות filter().forEach() לקריאות.",
        "professor": "continue מייצר conditional branch ב-bytecode שמדלג ל-loop header. ב-loop optimization, continue ב-hot path עלול למנוע vectorization. filter().forEach() chain עדיף מcontinue ב-pers code ל-declarative style."
      },
      "codeExample": "const scores = [85, -1, 92, 0, 78];\nconst validScores = [];\nfor (const score of scores) {\n  if (score <= 0) continue;  // דלג על ערכים לא חוקיים\n  validScores.push(score);\n}\n// [85, 92, 78]\n// חלופה: scores.filter(s => s > 0)",
      "codeExplanation": "continue מדלג על score <= 0 וממשיך לפריט הבא בלי לצאת מהלולאה. חלופה קריאה יותר: scores.filter(s => s > 0) עושה בדיוק אותו הדבר בשורה אחת."
    },
    {
      "conceptName": "do while",
      "difficulty": 4,
      "levels": {
        "grandma": "do while זה כמו לנסות אוכל חדש לפחות פעם אחת לפני שמחליטים — קודם טועמים, ורק אחר כך בודקים אם להמשיך. הגוף רץ לפחות פעם אחת.",
        "child": "do while שונה מwhile: הגוף רץ לפחות פעם אחת לפני שבודקים את התנאי. do { ... } while (condition). אם condition שקר מלכתחילה — ב-while הגוף לא ירוץ, ב-do while ירוץ פעם.",
        "soldier": "do { body } while (condition) — body רץ תמיד לפחות פעם. condition נבדקת בסוף כל iteration. שימושי כשצריך לאסוף input לפחות פעם: קרא input, בדוק אם חוקי, אחרת חזור.",
        "student": "do while שימושי לvalidation loop: do { input = getInput(); } while (!isValid(input)). ב-while רגיל, צריך לקרוא input לפני הלולאה ושוב בסוף — כפילות. do while מונעת זאת.",
        "junior": "do while נדיר בJS מודרני — לרוב אפשר לעשות while(true) { ... break; } שקריא יותר. בReact ו-Node.js עם async, do while עם await שימושי לretry loops: do { res = await fetch(); } while (!res.ok && retries-- > 0).",
        "professor": "do while מקמפל ל-body then conditional-jump. הבדל מwhile: הtest בסוף במקום בתחילה. ב-spec: do Statement while ( Expression ) — ExpressionStatement חייב להסתיים ב-; לאחר הסגריים. ב-bytecode: branch to body header ללא initial test."
      },
      "codeExample": "// validation loop — חייבים לשאול לפחות פעם\nlet userInput;\ndo {\n  userInput = prompt('הכנס מספר בין 1-10:');\n} while (userInput < 1 || userInput > 10);\nconsole.log('הכנסת:', userInput);",
      "codeExplanation": "do while מתאים כשחייבים לבצע פעולה לפחות פעם אחת ואז לבדוק תנאי. לvalidation loop של input זה הפתרון הטבעי — תמיד שואלים לפחות פעם, וממשיכים עד שהקלט תקין."
    },
    {
      "conceptName": "array",
      "difficulty": 3,
      "levels": {
        "grandma": "array זה כמו רשימת קניות — כמה פריטים בסדר קבוע. פריט ראשון, שני, שלישי. אפשר להוסיף בסוף, למחוק, למצוא לפי מיקום.",
        "child": "array הוא קופסה עם מספרי מקומות: [10, 20, 30]. ל-10 יש מיקום 0, ל-20 מיקום 1, ל-30 מיקום 2. items[0] מחזיר 10, items[1] מחזיר 20.",
        "soldier": "array נוצר עם [] או Array.from(). מיקום מתחיל ב-0. length נותן גודל. push/pop בסוף, shift/unshift בהתחלה. splice ל-insert/delete בכל מיקום. slice ליצירת תת-מערך.",
        "student": "array ב-JS הוא object עם keys מספריים ו-length property. ניתן לשמור types שונים באותו array. methods חלוקה: mutating (push, pop, splice, sort) ו-non-mutating (map, filter, slice — מחזירים חדש).",
        "junior": "ב-React state: לעולם לא לשנות array ישירות — setItems(prev => [...prev, newItem]). sort() ו-reverse() הם mutating — תמיד clone לפני: [...arr].sort(). TypeScript: const items: string[] = [] לtypes בטוחים.",
        "professor": "V8 מייצג arrays בשתי צורות: PACKED (כל indexes רצופים) ו-HOLEY (יש חורים). PACKED מהיר יותר — הימנע מarray של גודל מוצהר ריק (new Array(100)). typed arrays (Float32Array) מייצגים block memory רציף לperformance."
      },
      "codeExample": "const fruits = ['תפוח', 'בננה', 'ענב'];\nconsole.log(fruits[0]);       // 'תפוח'\nconsole.log(fruits.length);   // 3\nfruits.push('מנגו');           // הוסף בסוף\nconst last = fruits.pop();    // הוצא מסוף → 'מנגו'\nconst sliced = fruits.slice(0, 2); // ['תפוח', 'בננה']",
      "codeExplanation": "גישה לפי index מתחילה ב-0. push/pop פועלים בסוף המערך. slice(start, end) מחזיר תת-מערך חדש ללא שינוי המקורי — שתי הפונקציות מנגד לsplice שmutates."
    },
    {
      "conceptName": "forEach",
      "difficulty": 3,
      "levels": {
        "grandma": "forEach זה כמו לעבור על כל פריט ברשימת קניות ולשים אותו בסל — עובר על כל אחד בתור ועושה פעולה. לא מחזיר כלום בסוף.",
        "child": "forEach עובר על כל אלמנט במערך ומריץ פונקציה. items.forEach(item => console.log(item)) ידפיס כל אלמנט בתורו. לא מחזיר מערך חדש.",
        "soldier": "forEach(callback) קורא ל-callback עם (currentValue, index, array) לכל אלמנט. מחזיר undefined. לא ניתן ל-break או continue. אם צריך לעצור — for...of עדיף.",
        "student": "forEach מריץ callback ל-side effects: console.log, DOM mutation, שמירה במשתנה חיצוני. לא מחזיר ערך (undefined). אם רוצים מערך חדש — map. אם רוצים לסנן — filter. אם רוצים לעצור — for...of.",
        "junior": "forEach vs for...of: forEach לא ניתן לbreak/continue. forEach לא עובד עם async/await כראוי — await בתוך forEach callback לא ממתין. לasync iteration: for...of עם await, או Promise.all(array.map(async fn)).",
        "professor": "forEach על sparse array דולג על חורים (holes). בV8, forEach מייצר callback invocation per element — תקורה קטנה יחסית לfor loop. ב-spec: forEach הוא internal iteration בניגוד לfor...of שמשתמש ב-Iterator protocol."
      },
      "codeExample": "const users = [\n  { name: 'דנה', score: 90 },\n  { name: 'אבי', score: 75 }\n];\n\nusers.forEach((user, index) => {\n  console.log(`${index + 1}. ${user.name}: ${user.score}`);\n});\n// 1. דנה: 90\n// 2. אבי: 75",
      "codeExplanation": "ה-callback מקבל גם index (מיקום) וגם הערך. שימושי להצגת רשימה ממוספרת. forEach מתאים לside effects (הדפסה, DOM, שמירה) — לא להמרת המערך (שם map עדיף)."
    },
    {
      "conceptName": "filter",
      "difficulty": 4,
      "levels": {
        "grandma": "filter זה כמו מסננת — עוברים על כל הפריטים ורק מה שעובר את הבדיקה נשאר. מהמערך המקורי יוצא מערך קטן יותר עם רק מה שרצינו.",
        "child": "filter יוצר מערך חדש עם רק האלמנטים שהפונקציה אמרה עליהם 'כן' (true). [1,2,3,4].filter(n => n > 2) מחזיר [3,4] — רק אלה שעברו את הבדיקה.",
        "soldier": "filter(callback) קורא לcallback לכל אלמנט. אם callback מחזיר truthy — האלמנט נכנס למערך החדש. אם falsy — הוא מושמט. המערך המקורי לא משתנה.",
        "student": "filter מחזיר מערך חדש — non-mutating. המערך החדש יכול להיות ריק (אם אף אלמנט לא עמד בתנאי). ניתן לשרשר: arr.filter(fn).map(fn).sort(). שימושי מאוד עם Reactive data.",
        "junior": "ב-React: להציג רשימה מסוננת: const visible = items.filter(item => item.active). לא לשנות state ישירות. לclear filter: setFilter('') ולא לstore את ה-filtered array — לחשב מ-source. performance: memo עם useMemo לרשימות גדולות.",
        "professor": "filter יוצר array חדש ב-heap — O(n) זמן וspace. לרשימות גדולות עם chain ארוך (filter().map().reduce()), generator/lazy evaluation יכולים לחסוך allocations. Array.prototype.filter מגדיר iteration דרך length ו-[[Get]] — עובד גם על sparse arrays."
      },
      "codeExample": "const products = [\n  { name: 'A', price: 50, active: true },\n  { name: 'B', price: 200, active: false },\n  { name: 'C', price: 80, active: true }\n];\n\nconst affordable = products\n  .filter(p => p.active)         // רק פעילים\n  .filter(p => p.price < 100);  // רק זולים\n// [{ name:'A', price:50, active:true }]",
      "codeExplanation": "שרשור שני filters — ראשון סינן רק active, שני סינן רק מחיר < 100. אפשר לשרשר כמה filters ברצף. filter לעולם לא משנה את products המקורי."
    },
    {
      "conceptName": "map",
      "difficulty": 4,
      "levels": {
        "grandma": "map זה כמו מכונה שמעבירים דרכה כל פריט ברשימה ומקבלים אותו שונה. הכנסת רשימת מחירים, יצאה רשימת מחירים עם מע\"מ. כל פריט עובר המרה.",
        "child": "map עובר על כל אלמנט, עושה לו טרנספורמציה, ומחזיר מערך חדש באותו גודל. [1,2,3].map(n => n * 2) מחזיר [2,4,6] — כל אלמנט הוכפל.",
        "soldier": "map(callback) מחזיר מערך חדש באותו length, שבו כל אלמנט הוא return value של callback על האלמנט המקביל. המקור לא משתנה. callback מקבל (value, index, array).",
        "student": "map הוא functor — ממפה את ה-array על ידי החלת פונקציה. Non-mutating: מחזיר array חדש. שימוש שגוי נפוץ: map רק ל-side effects (console.log) במקום forEach — map מיועד לטרנספורמציה.",
        "junior": "ב-React: map הכרחי לrender lists: return users.map(u => <UserCard key={u.id} user={u} />). חשוב: key prop ייחודי ויציב — id, לא index (שגורם ל-rerender מיותר). לmap אסינכרוני: await Promise.all(arr.map(async fn)).",
        "professor": "map יוצר array חדש מ-[[Get]] על כל index. V8 מייעל map על dense arrays עם known element type — hidden class consistency חשובה. flatMap(fn) משלב map + flat(1) — שימושי כשה-callback מחזיר array."
      },
      "codeExample": "const users = [\n  { name: 'דנה', score: 90 },\n  { name: 'אבי', score: 60 }\n];\n\n// המר אובייקטים לstring\nconst labels = users.map(u => `${u.name}: ${u.score}`);\n// ['דנה: 90', 'אבי: 60']\n\n// חלץ רק שמות\nconst names = users.map(u => u.name);\n// ['דנה', 'אבי']",
      "codeExplanation": "map מחזיר מערך חדש באותו גודל — שימושי לחילוץ field ספציפי מmassage של אובייקטים, או להמרת data לstring לתצוגה. המקור (users) לא משתנה."
    },
    {
      "conceptName": "find",
      "difficulty": 4,
      "levels": {
        "grandma": "find זה כמו לחפש בארון בגדים את החולצה האדומה הראשונה. ברגע שמצאנו — עוצרים. לא ממשיכים לחפש את כל שאר האדומות.",
        "child": "find מחזיר את האלמנט הראשון שעמד בתנאי. [5, 12, 8, 130].find(n => n > 10) מחזיר 12 — ולא ממשיך. אם לא נמצא — מחזיר undefined.",
        "soldier": "find(callback) עוצר בראשון שcallback מחזיר truthy עליו ומחזיר את האלמנט עצמו. findIndex מחזיר index. findLast מחזיר מהסוף. אם לא נמצא: find → undefined, findIndex → -1.",
        "student": "find שימושי לחיפוש אובייקט לפי id: users.find(u => u.id === targetId). שונה מfilter שמחזיר כל ה-matches; find מחזיר רק הראשון ועוצר. לבדוק שנמצא: if (!user) return null.",
        "junior": "pattern נפוץ: const product = cart.find(p => p.id === id); if (!product) return; / throw new Error. ב-TS: find מחזיר T | undefined — חייבים לטפל בundefined. optional chaining: user?.name.",
        "professor": "find הוא short-circuit: עוצר בראשון שcallback מחזיר truthy, ולא ממשיך לסרוק. מימוש פנימי: for loop עם early return. בdisjoint search, includes() מהיר יותר לvalues פרימיטיביים. עבור ביצועים קריטיים — Map לookup O(1)."
      },
      "codeExample": "const users = [\n  { id: 1, name: 'דנה', role: 'admin' },\n  { id: 2, name: 'אבי', role: 'user' },\n  { id: 3, name: 'רון', role: 'user' }\n];\n\nconst admin = users.find(u => u.role === 'admin');\nconsole.log(admin?.name); // 'דנה'\n\nconst noMatch = users.find(u => u.role === 'guest');\nconsole.log(noMatch);     // undefined",
      "codeExplanation": "find מחזיר האלמנט הראשון שעמד בתנאי (role === 'admin'). optional chaining (?.) מגן מpanderer אם find מחזיר undefined. בהיעדר match — undefined."
    },
    {
      "conceptName": "reduce",
      "difficulty": 6,
      "levels": {
        "grandma": "reduce זה כמו לחשב סכום בקבלה: מתחילים מ-0, עוברים על כל מחיר, ומוסיפים לסכום. בסוף יש לנו מספר אחד שמייצג את כל הרשימה.",
        "child": "reduce 'מקפל' מערך לערך אחד. מתחיל מ-initialValue, ולכל אלמנט קורא לfunction: (accumulator, currentValue). [1,2,3].reduce((acc, n) => acc + n, 0) מחשב 1+2+3=6.",
        "soldier": "reduce(callback, initialValue). callback מקבל (accumulator, currentValue, index, array). מחזיר הaccumulator הבא. ללא initialValue, מתחיל מאלמנט ראשון. reduceRight עובר מהסוף.",
        "student": "reduce גמיש מאוד: sum, product, groupBy, flattening, counting. initialValue חשוב — בלעדיו על array ריק: TypeError. reduce יכול לייצג map וfilter, אבל פחות קריא — עדיף להשתמש בהם ישירות.",
        "junior": "reduce לaggregation: const total = cart.reduce((sum, item) => sum + item.price, 0). לgroupBy: items.reduce((acc, item) => { (acc[item.category] ??= []).push(item); return acc; }, {}). ב-TS: reduce<T>(fn, init: T) לtype safety.",
        "professor": "reduce הוא left fold (foldl). ב-functional programming, reduce מספיק לממש map, filter, flatMap. ב-V8, reduce לא מקבל JIT optimization מיוחדת כמו map/filter — V8 מתייחס אליו כcallback loop. Object.groupBy (ES2024) מחליף את reduce-for-groupBy pattern."
      },
      "codeExample": "const orders = [\n  { product: 'A', qty: 2, price: 50 },\n  { product: 'B', qty: 1, price: 200 },\n  { product: 'C', qty: 3, price: 30 }\n];\n\n// סכום כולל\nconst total = orders.reduce((sum, o) => sum + o.qty * o.price, 0);\nconsole.log(total); // 2*50 + 1*200 + 3*30 = 490",
      "codeExplanation": "reduce מתחיל מ-0 (initialValue), ולכל order מוסיף qty*price לaccumulator. acc מתעדכן בכל iteration: 100 → 300 → 390 → 490. אידיאלי לaggregate calculations."
    },
    {
      "conceptName": "spread",
      "difficulty": 5,
      "levels": {
        "grandma": "spread זה כמו לפזר קלפים מחפיסה על השולחן — במקום לתת את כל החפיסה כגוש, פותחים אותה ומפזרים כל קלף בנפרד. שלוש נקודות (...) מפזרות את הרשימה.",
        "child": "שלוש נקודות ... לפני מערך מפזרות את האלמנטים שלו. [...a, ...b] יוצר מערך חדש שמכיל את כל מה שב-a ואחריו כל מה שב-b.",
        "soldier": "spread operator (...) ב-3 שימושים: (1) שרשור arrays: [...a, ...b], (2) clone shallow: [...original], (3) spread לarguments: Math.max(...nums). עם objects: {...obj, key: val} לmerge ו-override.",
        "student": "spread מבצע shallow copy — nested objects עדיין נשארים references משותפות. {...user, name: 'חדש'} יוצר object חדש עם כל שדות user, אבל name מוחלף. שימושי ב-immutable updates.",
        "junior": "ב-React state: לעולם לא לmutate — setUser(prev => ({...prev, name: 'חדש'})). לmassages ארוכות: setCart(prev => [...prev, newItem]). shallow copy — אם item הוא object, לעדכן nested: {...prev, address: {...prev.address, city}}.",
        "professor": "spread מייצג iteration over iterable (Symbol.iterator). ב-arrays: O(n) time. ב-objects: Object.assign semantics — ownEnumerable properties בלבד. spread של string: [...'hello'] = ['h','e','l','l','o']. structuredClone() לdeep copy."
      },
      "codeExample": "// clone array ללא mutation\nconst original = [1, 2, 3];\nconst copy = [...original, 4]; // [1,2,3,4] — original לא השתנה\n\n// merge objects\nconst defaults = { theme: 'dark', lang: 'he' };\nconst userPrefs = { lang: 'en' };\nconst settings = { ...defaults, ...userPrefs };\n// { theme: 'dark', lang: 'en' } — userPrefs override ל-lang",
      "codeExplanation": "שרשור עם spread יוצר array/object חדש — original לא מושפע. בmerge objects, הסדר קובע: נכסים מאוחרים מחליפים מוקדמים. שימוש קריטי ב-React לimmutable state updates."
    },
    {
      "conceptName": "object",
      "difficulty": 5,
      "levels": {
        "grandma": "object זה כמו תעודת זהות — יש בה שמות שדות (שם, גיל, עיר) ולכל שדה ערך. במקום מספרים כמו במערך, פה משתמשים בשמות משמעותיים.",
        "child": "object הוא אוסף של מפתחות וערכים. const user = { name: 'דנה', age: 20 } — הkey הוא name, הvalue הוא 'דנה'. גישה: user.name מחזיר 'דנה'.",
        "soldier": "object נוצר עם {} ומכיל key:value pairs. גישה: dot notation (obj.key) או bracket notation (obj['key']). הוספת key: obj.newKey = val. מחיקה: delete obj.key. בדיקת קיום: 'key' in obj.",
        "student": "objects הם reference type: כשמשמים object למשתנה חדש, שני המשתנים מצביעים לאותו object בheap. לclone: {...obj} (shallow). Object.keys/values/entries מחזירים arrays של keys/values/pairs.",
        "junior": "ב-API responses, objects הם הפורמט הנפוץ. תמיד validate: if (!user || !user.id) return. optional chaining: user?.address?.city. ב-TypeScript: interface User { name: string; age: number } לtypes בטוחים.",
        "professor": "objects ב-V8 מיוצגים כHidden Classes (shapes). כשכל instance נוצר עם אותם fields באותו סדר, V8 יכול לoptimize גישה לfields כ-offset ישיר. הוספת fields לאחר יצירה גורמת ל-shape transition — פוגע ב-JIT optimization."
      },
      "codeExample": "const user = {\n  name: 'דנה',\n  age: 25,\n  isAdmin: false\n};\n\nconsole.log(user.name);         // 'דנה' — dot notation\nconsole.log(user['age']);       // 25 — bracket notation\nuser.email = 'dana@example.com'; // הוספת key חדש\nconsole.log(Object.keys(user)); // ['name','age','isAdmin','email']",
      "codeExplanation": "dot notation (user.name) קריא יותר. bracket notation (user['key']) שימושי כשהmkey הוא משתנה. Object.keys מחזיר מערך של כל השמות — שימושי לiteration."
    },
    {
      "conceptName": "nested object",
      "difficulty": 5,
      "levels": {
        "grandma": "nested object ��ה אובייקט שבתוכו יש אובייקט נוסף — כמו תעודת זהות שיש בה שדה 'כתובת' שעצמו מכיל עיר, רחוב, מספר. מבנה בתוך מבנה.",
        "child": "object יכול להכיל object אחר בתוכו. user.address.city עובר שני שלבים: קודם מגיע ל-address (שהוא עצמו object), ואז מגיע ל-city שבתוכו.",
        "soldier": "גישה: obj.level1.level2.level3. אם level1 הוא undefined — TypeError: Cannot read property. הגנה: optional chaining: obj?.level1?.level2 מחזיר undefined בלי לקרוס.",
        "student": "JSON מAPI בדרך כלל nested: { user: { profile: { avatar: url } } }. גישה לdata עמוק עם optional chaining. לעדכן nested property ב-immutable way: {...state, user: {...state.user, name: 'new'}}.",
        "junior": "ב-React state: לעדכן nested object בצורה immutable: setState(prev => ({...prev, address: {...prev.address, city: 'תל אביב'}}). Immer מפשט זאת: produce(state, draft => { draft.address.city = 'תל אביב'; }).",
        "professor": "deeply nested objects גורמים לshape transitions ב-V8 כשנוצרים בסדר שונה. optional chaining (?.) מוסיף conditional null-check לכל property access — מקמפל לbytecode יעיל יחסית. structuredClone מבצע deep clone של nested objects."
      },
      "codeExample": "const user = {\n  name: 'דנה',\n  address: {\n    city: 'תל אביב',\n    zip: '6100000'\n  }\n};\n\nconsole.log(user.address.city); // 'תל אביב'\n\n// optional chaining — בטוח אם address לא קיים\nconsole.log(user?.address?.zip); // '6100000'",
      "codeExplanation": "גישה לnested: user.address.city. optional chaining (?.) מגן מ-TypeError אם address לא קיים — מחזיר undefined במקום לקרוס. חיוני בעבודה עם data שמגיע מAPI."
    },
    {
      "conceptName": "array of objects",
      "difficulty": 5,
      "levels": {
        "grandma": "array of objects זה כמו ספר כתובות — כל שורה היא כרטיס עם שם, טלפון, עיר. יש מספר שורות (array) וכל שורה היא מבנה עם שדות (object).",
        "child": "array of objects הוא מערך שכל אלמנט שלו הוא object. [{ name:'דנה' }, { name:'אבי' }]. גישה: users[0].name מחזיר 'דנה'. זה הפורמט הנפוץ ביותר לdata מAPI.",
        "soldier": "array of objects = הפורמט הסטנדרטי לresults מAPI/DB. לחיפוש: find. לסינון: filter. להמרה: map. למיון: sort. לסיכום: reduce. כל שיטות המערך עובדות כרגיל.",
        "student": "מה שמגיע מServer בדרך כלל: { users: [{id,name,role}, ...] }. לaccess: data.users.find(u => u.id === targetId). בTs: User[] לtypes. לperformance: המר ל-Map<id, User> אחרי fetch לlookup O(1).",
        "junior": "ב-React: רשימה מAPI → useState([]). useEffect עם fetch → setUsers(data). render: users.map(u => <UserRow key={u.id} {...u} />). לא לשכוח loading/error states. data נמחק בrealod — שמור בlocalStorage אם צריך.",
        "professor": "V8 מייעל array of objects כשכולם עם אותה shape (hidden class). להבטחת shape uniformity: צור objects עם constructor ולא עם object literals שצומחים. BSON (MongoDB) הוא binary encoding של array of objects — מהיר לparse מJSON."
      },
      "codeExample": "const users = [\n  { id: 1, name: 'דנה', score: 90 },\n  { id: 2, name: 'אבי', score: 65 },\n  { id: 3, name: 'רון', score: 80 }\n];\n\nconst topStudents = users\n  .filter(u => u.score >= 80)\n  .map(u => u.name);\n\nconsole.log(topStudents); // ['דנה', 'רון']",
      "codeExplanation": "filter().map() chain — ראשית מסנן רק אלה עם score >= 80, אחר כך מחלץ רק שמות. זה הpattern הנפוץ ביותר לעבוד עם data שמגיע מserver."
    },
    {
      "conceptName": "destructuring",
      "difficulty": 5,
      "levels": {
        "grandma": "destructuring זה כמו לפתוח מזוודה ולהוציא כל פריט למקומו — במקום לכתוב user.name, user.age כמה פעמים, פורקים הכל בשורה אחת: { name, age } = user.",
        "child": "destructuring מאפשר לחלץ ערכים מobject/array לתוך משתנים נפרדים בשורה אחת. const { name, age } = user — זה קיצור של const name = user.name; const age = user.age;",
        "soldier": "object destructuring: const { a, b } = obj. array destructuring: const [first, second] = arr. rename: const { name: userName } = user. default: const { age = 25 } = user. nested: const { address: { city } } = user.",
        "student": "destructuring הוא syntactic sugar — מקמפל לפשוטות property access. שימושי בfunction params: function greet({ name, age }) {...}. ב-React: const { data, error } = useQuery(). swap: [a, b] = [b, a].",
        "junior": "ב-React hooks: const [count, setCount] = useState(0) — array destructuring. בimport: import { useState, useEffect } from 'react' — named exports. function(req, res): const { body, params, query } = req — נפוץ ב-Express.",
        "professor": "destructuring הוא ES2015 feature שמקמפל ל-property access בבabel. ב-V8, destructuring עם ידועה shape מייעל לproperty reads ישירים. nested destructuring עמוק עלול לפגוע בקריאות — לשקול לשמור reference ביניים."
      },
      "codeExample": "const user = { name: 'דנה', age: 25, city: 'תל אביב' };\n\n// object destructuring\nconst { name, age } = user;\nconsole.log(name); // 'דנה'\n\n// עם rename ו-default\nconst { name: fullName, role = 'user' } = user;\n\n// array destructuring\nconst [first, , third] = [10, 20, 30];\nconsole.log(first, third); // 10  30",
      "codeExplanation": "object destructuring חולץ name ו-age ישירות. rename (name: fullName) שימושי כשיש collision. default value כשfield לא קיים. array destructuring: פסיק כפול ,, מדלג על אלמנט (דילוג על 20)."
    },
    {
      "conceptName": "class",
      "difficulty": 6,
      "levels": {
        "grandma": "class זה כמו תבנית לייצור עוגיות — מגדירים פעם אחת איך נראית עוגייה (class), ואחר כך יוצרים כמה שרוצים (new). כל עוגייה יכולה להיות שונה קצת (name שונה), אבל הצורה אותה.",
        "child": "class הוא תבנית ליצירת objects. מגדירים constructor שרץ כשיוצרים instance חדש עם new. class User { constructor(name) { this.name = name; } } יוצר תבנית לusers.",
        "soldier": "class { constructor() — מה שרץ ב-new. methods — פונקציות על כל instance. static methods — שייכות לclass עצמו, לא לinstance. private fields: #name. getter/setter: get fullName() / set fullName(v).",
        "student": "class ב-JS הוא syntactic sugar על prototype-based inheritance. כל instance מצביע ל-prototype של ה-class עם property lookup chain. כשcall method — JS מחפש ב-instance, אז ב-prototype, אז בproto chain.",
        "junior": "ב-Node.js OOP: models לdb, services לlogic. class UserService { constructor(db) { this.db = db; } }. ב-React, function components עם hooks החליפו class components. בtest: new MyClass() ו-jest.fn() למocking methods.",
        "professor": "class declaration יוצר Function object + prototype. methods מוגדרות כnon-enumerable props על prototype. ב-V8, instances מקבלים shared hidden class עם inline property slots. #private fields מיושמים כ-WeakMap-like structure ב-spec."
      },
      "codeExample": "class Animal {\n  #name; // private field\n  constructor(name) {\n    this.#name = name;\n  }\n  speak() {\n    return `${this.#name} עושה רעש`;\n  }\n  get name() { return this.#name; }\n}\n\nconst cat = new Animal('חתול');\nconsole.log(cat.speak()); // 'חתול עושה רעש'\nconsole.log(cat.name);    // 'חתול'",
      "codeExplanation": "#name הוא private field — לא נגיש מחוץ לclass. speak() הוא method על כל instance. get name() הוא getter שמאפשר קריאה של name. new Animal('חתול') יוצר instance חדש ומריץ constructor."
    },
    {
      "conceptName": "method",
      "difficulty": 4,
      "levels": {
        "grandma": "method זה פונקציה שחיה בתוך object או class — בדיוק כמו שלמכונית יש פעולות: נסיעה, עצירה, פנייה. הפעולות שייכות למכונית ואפשר לקרוא להן עליה.",
        "child": "method הוא פונקציה שמוגדרת בתוך object. user.greet() קורא למethod greet שנמצא בתוך user. בתוך ה-method, this מצביע לobject עצמו.",
        "soldier": "method מוגדר ב-class body ללא function keyword: speak() { return this.name; }. this בתוך method רגיל מצביע לinstance. arrow function ב-class לא תיצור this משלה — תירש מouter.",
        "student": "methods מוגדרות על prototype — כל instances חולקים אותה הגדרה. static method: שייכת לclass, לא לinstance. getter/setter: מוגדרים עם get/set keyword. method chaining: methods שמחזירות this.",
        "junior": "method naming: camelCase, verb-noun. getUser, createOrder, deleteItem. methods ב-class צריכות להיות short ולעשות דבר אחד (SRP). ב-Express router: router.get('/path', handler) — handler הוא function, לא method.",
        "professor": "methods על prototype נשמרות פעם אחת ב-heap — לא כfull copy לכל instance. method lookup: JS מחפש ב-instance, אז ב-prototype chain. bound methods: const fn = obj.method.bind(obj) ליצירת function עם fixed this."
      },
      "codeExample": "class User {\n  constructor(name, score) {\n    this.name = name;\n    this.score = score;\n  }\n  greet() {\n    return `שלום, אני ${this.name}`;\n  }\n  isPassing() {\n    return this.score >= 60;\n  }\n  static create(name) {  // static — ללא instance\n    return new User(name, 0);\n  }\n}\n\nconst u = new User('דנה', 85);\nconsole.log(u.greet());     // 'שלום, אני דנה'\nconsole.log(u.isPassing()); // true\nconst guest = User.create('אורח');",
      "codeExplanation": "greet() ו-isPassing() הם instance methods — נקראים על instance (u.greet()). static create() שייכת לclass עצמו ונקראת User.create(). this בתוך method מצביע לinstance הנוכחי."
    },
    {
      "conceptName": "inheritance",
      "difficulty": 6,
      "levels": {
        "grandma": "ירושה זה כמו שסבתא מלמדת את הנכדה לאפות עוגה. הנכדה לא מתחילה מאפס — היא מקבלת את כל המתכון, ויכולה להוסיף ממרח שוקולד מעל. ב-JavaScript, class אחד 'יורש' מclass אחר וקיבל את כל הfunctionality שלו.",
        "child": "תאר/תארי inheritance כמו תפקידים בכיתה: יש 'תלמיד' שיכול לשבת, לכתוב, ולדבר. 'נשיא הכיתה' הוא גם תלמיד, אבל יכול גם לעשות הכרזות. הוא ירש הכל מ'תלמיד' ופשוט הוסיף יכולות נוספות.",
        "soldier": "extends מאפשר לclass לרשת properties ומethods מclass אחר. super() קורא ל-constructor של האב. אתה לא מעתיק קוד — הclass הבן נגיש ל-prototype של האב דרך ה-prototype chain.",
        "student": "Inheritance ב-JS מבוסס על prototype chain. class Admin extends User יוצר Admin.prototype שמצביע ל-User.prototype. super() חובה ב-constructor לפני this. שיטות override: פשוט הגדר שוב בclass הבן — JS יחפש בבן לפני האב. Mixin pattern כאלטרנטיבה לmultiple inheritance.",
        "junior": "בפרויקט אמיתי, תהיה זהיר עם ירושה עמוקה (>2 שכבות) — קשה לתחזק. העדף composition over inheritance: במקום AdminUser extends User, צור User ותן לו role object. ב-React לא משתמשים בירושה כלל — components הם composition בלבד. TypeScript מוסיף interface לצד extends.",
        "professor": "JavaScript עובד עם prototypal inheritance, לא classical. class הוא syntactic sugar על גבי Object.create(). Proto chain lookup: כשקוראים לmethod, JS מחפש ב-instance → prototype → prototype.prototype → Object.prototype → null. Object.getPrototypeOf() חושף את ה-chain. Multiple inheritance דרך mixins: Object.assign(Target.prototype, MixinA, MixinB). Symbol.hasInstance מאפשר לcustomize instanceof."
      },
      "codeExample": "class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return `${this.name} makes a sound`; }\n}\nclass Dog extends Animal {\n  speak() { return `${this.name} barks`; }\n  fetch() { return `${this.name} fetches!`; }\n}\nconst d = new Dog('Rex');\nd.speak();  // 'Rex barks' — override\nd.fetch();  // 'Rex fetches!' — הרחבה",
      "codeExplanation": "Dog יורש מAnimal — מקבל name מה-constructor, ומ-speak(). Dog דורס את speak() (override) ומוסיף fetch() חדש. d instanceof Animal יחזיר true כי Dog.prototype יורש מAnimal.prototype."
    },
    {
      "conceptName": "try",
      "difficulty": 4,
      "levels": {
        "grandma": "try זה כמו לשים רשת ביטחון מתחת לאקרובט. אתה אומר: 'נסה לעשות את הפעולה הזו — ואם משהו נפל, תפוס ותטפל'. בלי try, שגיאה אחת יכולה לקרוס את כל הדף.",
        "child": "try זה כמו לנסות לפתוח דלת: 'תנסה לפתוח. אם היא נעולה — אל תשבור אותה, פשוט תבוא תגיד לי'. בלי try, שגיאה פשוט תקרוס את הכל. עם try, אתה שולט על מה קורה כשמשהו משתבש.",
        "soldier": "try { ... } catch (e) { ... } עוטף קוד שעלול לזרוק שגיאה. אם הקוד בתוך try זורק — הריצה עוצרת, הcontrol עובר ל-catch עם ה-Error object. finally רץ תמיד בסוף — עם שגיאה ובלי.",
        "student": "try/catch מנגנון ל-exception handling. אפשר catch ספציפי: if (e instanceof TypeError). כדאי לתפוס רק מה שאתה יכול לטפל בו — אל תבלע שגיאות לא צפויות. finally מתאים לניקוי משאבים (סגירת חיבור, הסרת spinner). ניתן לשרשר: try { try {} catch {} } catch {}.",
        "junior": "בפרויקט: try/catch על כל IO (fetch, fs.readFile, JSON.parse, DB queries). אל תשתמש ב-catch ריק — תמיד לפחות console.error. ב-async/await: try { await fetch(...) } catch (e) {...} — ה-catch תופס גם שגיאות רשת וגם rejected promises. Promise.allSettled במקום Promise.all אם אתה רוצה להמשיך גם בכישלון חלקי.",
        "professor": "try/catch ב-JS תופס כל throw — לא רק Error instances. throw 'string' חוקי אך נחשב anti-pattern. Error.cause (ES2022) מאפשר wrapping: throw new Error('fetch failed', { cause: originalError }). ב-V8, try/catch עלול לבטל JIT optimizations — בריצה חמה יש לקרוא לפונקציות מחוץ לtry. AggregateError מאגד מספר errors (שימוש ב-Promise.any)."
      },
      "codeExample": "async function loadData(url) {\n  try {\n    const res = await fetch(url);\n    if (!res.ok) throw new Error(`HTTP ${res.status}`);\n    return await res.json();\n  } catch (e) {\n    console.error('failed to load:', e.message);\n    return null;\n  } finally {\n    console.log('request done');\n  }\n}",
      "codeExplanation": "try עוטף את ה-fetch והjson parsing. אם res.ok=false, throw יזרוק Error שתיתפס ב-catch. catch מדפיס את השגיאה ומחזיר null (fallback). finally רץ תמיד — מתאים לסגירת loading state."
    },
    {
      "conceptName": "catch",
      "difficulty": 4,
      "levels": {
        "grandma": "catch זה כמו הרשת שתופסת כשמשהו נפל. אחרי שניסית לעשות משהו (try) ומשהו השתבש — catch זה החלק שאומר: 'בסדר, קרתה שגיאה — הנה מה אנחנו עושים עכשיו'. בלעדיו, השגיאה קורסת הכל.",
        "child": "catch זה הגיבוי: 'אם try נכשל — בוא לכאן'. תוך catch יש לך את השגיאה עצמה כobject — אתה יכול לראות מה קרה (error.message) ולהחליט מה לעשות: להדפיס הודעה, לנסות שוב, או לחזור לערך ברירת מחדל.",
        "soldier": "catch (error) מקבל את ה-Error object שנזרק ב-try. error.message — תיאור השגיאה. error.name — סוג השגיאה (TypeError, RangeError, SyntaxError...). error.stack — stack trace מלא. תוך catch ניתן לזרוק שוב: throw error.",
        "student": "catch יכול לבדוק סוג השגיאה ולהתנהג בהתאם: if (e instanceof TypeError) vs if (e instanceof NetworkError). Optional catch binding (ES2019): catch { ... } ללא משתנה אם לא צריך. catch על Promise: promise.catch(err => ...) מקביל ל-.then(null, err => ...).",
        "junior": "בפרויקט: הגדר Error types משלך (class NotFoundError extends Error {}). catch יכול לבדוק instanceof ולהחליט — אם זה NotFound, תחזיר 404; אם זה Unknown, תשלח לmonitoring (Sentry/DataDog). אל תבלע שגיאות שלא ציפית להן — לפחות console.error(e) כדי שיופיע ב-logs.",
        "professor": "catch clause מקבל כל throw — Error, string, number, null. TypeScript מסמן catch (e: unknown) — חייב לבדוק type לפני שימוש. Error subclasses יכולות להוסיף fields: class HttpError extends Error { constructor(status) { super(); this.status = status; } }. ב-Node.js, process.on('uncaughtException') ו-'unhandledRejection' הם safety nets אחרונים — לא תחליף לcatch מפורש."
      },
      "codeExample": "try {\n  const data = JSON.parse(userInput);\n  process(data);\n} catch (e) {\n  if (e instanceof SyntaxError) {\n    showError('קלט לא תקין — בדוק פסיקים ומרכאות');\n  } else {\n    console.error('unexpected error', e);\n    throw e; // זרוק שוב — לא ידענו לטפל\n  }\n}",
      "codeExplanation": "catch מקבל את e — ה-Error שנזרק. בדיקת instanceof SyntaxError מאפשרת טיפול ספציפי: הצגת הודעה ידידותית. שגיאה לא מוכרת נזרקת שוב (re-throw) — לא 'בולעים' שגיאות שלא מובנות לנו."
    },
    {
      "conceptName": "throw",
      "difficulty": 6,
      "levels": {
        "grandma": "throw זה כמו לצלצל בפעמון חירום. הקוד אומר: 'קרה משהו שאני לא יכול להמשיך איתו — אני מפסיק ומכריז על שגיאה'. מי שקרא לקוד יכול לתפוס את הפעמון הזה ולהחליט מה לעשות.",
        "child": "throw אומר: 'אני מוותר ומשליך שגיאה'. הקוד עוצר מיד, ומחפש catch בקוד שקרא לך. אם אין catch — הדפדפן מציג שגיאה אדומה. כשתמיד תשתמש ב-new Error() עם הסבר ברור.",
        "soldier": "throw new Error('message') עוצר ריצה ומעביר שגיאה למעלה ב-call stack עד שimatch catch. ניתן לזרוק כל ערך, אבל throw new Error(...) הוא הסטנדרט — מכיל message ו-stack trace אוטומטי.",
        "student": "throw משמש לvalidation ולחוזה ה-API: 'אם לא קיבלת את מה שציפית — זרוק'. בgenerators ניתן לשלוח שגיאה מבחוץ: gen.throw(new Error()). async functions שזורקות הופכות ל-rejected promise אוטומטית — throw בתוך async = reject.",
        "junior": "בפרויקט: הגדר Error hierarchy: class AppError extends Error { constructor(message, code) {...} }. throw new AppError('not found', 404). בexpress: next(error) במקום throw — מעביר ל-error handler middleware. ב-React: throw בתוך render טריגר Error Boundary. בcomponents, throw promise טריגר Suspense.",
        "professor": "throw בJS הוא flow control — לא רק לשגיאות. Generators משתמשים ב-throw לביטול: iterator.throw(err). throw ב-catch: re-throw pattern — תפוס, בדוק אם אתה יכול לטפל, אחרת throw e. Cause chaining (ES2022): throw new Error('outer', { cause: originalErr }) — שומר על stack trace מלא. Promise reject ≡ throw ב-async context."
      },
      "codeExample": "function getUser(id) {\n  if (typeof id !== 'number') {\n    throw new TypeError(`id חייב להיות מספר, קיבלנו: ${typeof id}`);\n  }\n  if (id <= 0) {\n    throw new RangeError(`id חייב להיות חיובי, קיבלנו: ${id}`);\n  }\n  return db.find(id);\n}\n\ntry {\n  getUser('abc');\n} catch (e) {\n  console.error(e.name, e.message);\n}",
      "codeExplanation": "throw מעצור ריצה כשהקלט לא תקין — לפני שנגיע ל-db.find. TypeError ו-RangeError הם Error subtypes מובנים. ה-catch תופס ומדפיס e.name ('TypeError') ו-e.message. בלי ה-throw, db.find היה מקבל ערך לא תקין ויוצר באג שקשה לאתר."
    },
    {
      "conceptName": "localStorage",
      "difficulty": 4,
      "levels": {
        "grandma": "localStorage זה כמו מגירה בבית שלא נסגרת לעולם — גם אחרי שסוגרים את הדפדפן, הדברים שם עדיין קיימים. כתבת את שם המשתמש? הוא יהיה שם גם מחר. זה המקום של הדפדפן לשמור מידע על המחשב שלך.",
        "child": "localStorage זה כמו פתקית שדוביקת על המחשב: 'שמור פה את הצבע שהמשתמש בחר'. כל פעם שהדף נטען — הוא קורא את הפתקית ומשחזר. אם הקוד לא מוחק — הפתקית שם לנצח.",
        "soldier": "localStorage.setItem(key, value) שומר string. getItem(key) קורא. removeItem(key) מוחק. clear() מוחק הכל. כל ה-values הם strings — כדי לשמור object, צריך JSON.stringify בשמירה ו-JSON.parse בקריאה.",
        "student": "localStorage synchronous, ~5MB, domain-specific. לא עובר בין tabs לreal-time (storage event קיים אבל לא זמין ב-tab שכתב). לעולם לא לשמור sensitive data (passwords, tokens) — גלוי ל-JavaScript ו-XSS attacks. שימוש: preferences, draft, cached data שלא קריטי.",
        "junior": "בפרויקט: עטוף localStorage בwrapper שמטפל ב-QuotaExceededError ו-SecurityError (private mode). שמור version לschema: { v: 2, data: {...} } — קל לinvalidate בשינוי מבנה. React: state init מlocalStorage + useEffect שכותב בכל שינוי. אלטרנטיבה: IndexedDB לכמויות גדולות.",
        "professor": "localStorage מבוסס על Web Storage spec. Synchronous I/O — בthread הראשי, שמירה גדולה חוסמת rendering. Storage event מוצא בtabs אחרים לאותו origin. origin = protocol+host+port. Private/Incognito mode: localStorage זמין בsession אבל נמחק בסגירה. Alternative: Cache API (async, SW-controlled) לblob data. IndexedDB לquerying מורכב."
      },
      "codeExample": "// שמירה\nconst prefs = { theme: 'dark', lang: 'he' };\nlocalStorage.setItem('prefs', JSON.stringify(prefs));\n\n// קריאה בטוחה\nfunction getPrefs() {\n  try {\n    const raw = localStorage.getItem('prefs');\n    return raw ? JSON.parse(raw) : { theme: 'light', lang: 'he' };\n  } catch {\n    return { theme: 'light', lang: 'he' };\n  }\n}",
      "codeExplanation": "JSON.stringify הכרחי כי localStorage מאחסן רק strings. הקריאה עטופה ב-try/catch — JSON.parse יכול להיכשל אם הערך פגום. ברירת מחדל מוחזרת אם הkey לא קיים (null) — הגנה נגד crash בload ראשון."
    },
    {
      "conceptName": "sessionStorage",
      "difficulty": 4,
      "levels": {
        "grandma": "sessionStorage זה כמו פתק שמחתימים בכניסה למוזיאון: כל עוד אתה בפנים — הפתק תקף. ברגע שיצאת וסגרת את הדלת — הפתק נעלם. הדפדפן עובד אותו דבר: הנתונים קיימים עד שסוגרים את הtab.",
        "child": "sessionStorage זה כזיכרון קצר: 'תזכור את הדף הזה רק עד שאסגור את הtab'. שימושי לדברים זמניים — מה היה בסל הקניות לפני שניגשתי לקופה, או איפה הייתי בפרוצדורה עם כמה שלבים.",
        "soldier": "sessionStorage זהה ל-localStorage בAPI: setItem, getItem, removeItem, clear. ההבדל: נמחק אוטומטית כשהtab נסגר. לא משותף בין tabs — כל tab מקבל sessionStorage נפרד משלו, גם לאותו URL.",
        "student": "sessionStorage מתאים ל: wizard/multi-step forms (שמור שלב נוכחי), search drafts, scroll position בעמוד ארוך. לא מתאים ל: login state, user preferences (עדיף localStorage). מכיל רק strings כמו localStorage — JSON.stringify/parse.",
        "junior": "בפרויקט: sessionStorage לstate זמני של flow — checkoutStep, searchFilters, activeTab. עוזר כשהמשתמש מרענן באמצע flow ולא רוצה שיאבד את מיקומו. כשמשתמש מסיים flow, removeItem לנקות. לmulti-tab apps: sessionStorage מבודד לכל tab — לא תראה updates בין tabs.",
        "professor": "sessionStorage scope הוא browsing context — כל tab/window חדש מקבל context נפרד, גם עם אותו URL. window.open מיישר sessionStorage מה-opener לחלון החדש (once, לא live sync). session = עד סגירת tab, לא סגירת browser. ב-bfcache (back-forward cache), sessionStorage נשמר — הדף לא נטען מחדש. Service Workers לא ניגשים לsessionStorage — רק לmain thread."
      },
      "codeExample": "// שמירת שלב בwizard\nfunction saveStep(step, data) {\n  sessionStorage.setItem('wizard-step', step);\n  sessionStorage.setItem('wizard-data', JSON.stringify(data));\n}\n\nfunction resumeWizard() {\n  const step = sessionStorage.getItem('wizard-step');\n  const raw = sessionStorage.getItem('wizard-data');\n  return step ? { step: +step, data: JSON.parse(raw) } : { step: 1, data: {} };\n}",
      "codeExplanation": "sessionStorage שומר את שלב ה-wizard בין refreshes — כדי שמשתמש שרענן לא יחזור להתחלה. resumeWizard קורא ומחזיר step מספרי (+step ממיר מstring). אם הtab ייסגר — sessionStorage יימחק ו-resumeWizard יחזיר { step: 1 }."
    },
    {
      "conceptName": "cookies",
      "difficulty": 4,
      "levels": {
        "grandma": "Cookies הם כמו תג שם שהדפדפן מדביק לעצמו: 'אני הייתי כבר פה ובחרתי עוגת שוקולד'. בכל ביקור חוזר — הדפדפן מציג את תג השם לשרת, והשרת מזהה מי זה. ככה זוכרים שאתה מחובר.",
        "child": "cookie זה כמו חותמת ביד: 'כן, שילמת כניסה'. בכל בקשה לשרת — הדפדפן שולח את כל ה-cookies אוטומטית. השרת רואה אותם וכבר יודע: 'אה, זה דנה, היא מחוברת'.",
        "soldier": "document.cookie = 'key=value; path=/; expires=...' מגדיר cookie. קריאה: document.cookie מחזיר string של כל ה-cookies. cookies נשלחים עם כל HTTP request לdomain. HttpOnly cookies (שנכתבו ע\"י השרת) לא נגישים ל-JavaScript — הגנה נגד XSS.",
        "student": "Cookies נשלחים אוטומטית ב-HTTP headers — לכן מתאימים לauth. Attributes: expires/max-age (תפוגה), path (איזה URL), domain, Secure (HTTPS בלבד), HttpOnly (JS לא יכול לגשת), SameSite (הגנה CSRF). Session cookie = ללא expires — נמחק בסגירת browser. Max ~4KB.",
        "junior": "בפרויקט: אל תכתוב auth tokens ל-document.cookie מה-frontend — השרת צריך לכתוב HttpOnly cookies. SameSite=Strict מגן מCSRF אבל שובר OAuth redirects — Lax הוא compromise. ב-Express: res.cookie('sessionId', id, { httpOnly: true, secure: true, sameSite: 'lax' }). למחוק cookie: maxAge=0.",
        "professor": "Cookies מוגדרים ב-RFC 6265. Same-site vs same-origin: site = scheme+registrable domain (לא port). SameSite=None; Secure חובה לthird-party cookies. Partitioned cookies (CHIPS) מאפשרים cross-site cookies מבודדים לכל top-level site. Priority attribute (Chrome). Cookie prefixes: __Secure- ו-__Host- מגנים מdowngrade attacks. 180 cookies per domain, 3000 total ב-Chrome."
      },
      "codeExample": "// קריאת cookie ספציפי\nfunction getCookie(name) {\n  return document.cookie\n    .split('; ')\n    .find(row => row.startsWith(name + '='))\n    ?.split('=')[1];\n}\n\n// כתיבה עם תפוגה\ndocument.cookie = `theme=dark; path=/; max-age=${60 * 60 * 24 * 30}`;\n\nconst theme = getCookie('theme'); // 'dark'",
      "codeExplanation": "document.cookie מחזיר string עם כל ה-cookies — צריך לפרסר ידנית. getCookie מפצל ב-'; ', מחפש prefix עם startsWith, ומחלץ את הvalue. max-age=2592000 = 30 יום בשניות. HttpOnly cookies שנכתבו ע\"י השרת לא יופיעו ב-document.cookie."
    },
    {
      "conceptName": "closure",
      "difficulty": 8,
      "levels": {
        "grandma": "\"closure\" זה כמו ילד שיוצא מהבית עם תרמיל קטן: גם כשהוא רחוק, הוא נושא איתו את הכלים שאמא שמה. הפונקציה 'יוצאת' מהמקום שנוצרה, אבל ממשיכה לזכור מה היה שם.",
        "child": "תיק שיוצרת פונקציה שזוכרת משתנים מבחוץ. דמיין שאתה כותב פתק עם המספר שלך, נותן לחבר. החבר רץ הביתה ושכח אותך — אבל הפתק עדיין יודע מה המספר. הפתק = closure, המספר = משתנה שהיה ב-scope.",
        "soldier": "פונקציה שיש לה גישה למשתנים של ה-scope שבו היא נוצרה, גם אחרי שה-scope ההוא הסתיים. JavaScript לא משחרר את המשתנים של פונקציה אם יש פונקציה פנימית שעדיין משתמשת בהם.",
        "student": "Closure = function + reference ל-LexicalEnvironment שלה. כל arrow function או function שמתייחסת למשתנה חיצוני יוצרת closure. שימושים נפוצים: counter פרטי, currying, partial application, factory functions, event handlers.",
        "junior": "ב-React כל hook שיוצר callback (onClick, useEffect, useCallback) הוא closure. בעיה נפוצה: stale closure — useEffect שמתייחס ל-state ישן כי הוא נוצר ב-render קודם. הפתרון: הוספה של ה-state ל-dependencies array, או שימוש ב-functional updater (setState(prev => ...)).",
        "professor": "Closure ב-spec הוא function object שמחזיק [[Environment]] internal slot שמצביע ל-LexicalEnvironment. ה-engine אופטימיזטור closures: רק משתנים שבאמת בשימוש ב-inner function נשמרים (escape analysis). יש closure leaks: event listener שלא הוסר, או cache שגדל ללא הגבלה — שני הclosures שומרים על משתנים בזיכרון."
      },
      "codeExample": "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst counter = makeCounter();\ncounter(); // 1\ncounter(); // 2\n// count לא נגיש מבחוץ — encapsulation דרך closure",
      "codeExplanation": "ה-arrow function ש-makeCounter מחזיר זוכר את count גם אחרי ש-makeCounter הסתיימה. כל קריאה לcounter() עובדת על אותו count. זה pattern של private state עם closure במקום class."
    },
    {
      "conceptName": "promise",
      "difficulty": 7,
      "levels": {
        "grandma": "\"promise\" זה כמו טופס שאתה מקבל בדואר במקום החבילה עצמה: 'החבילה תגיע. אם הכל בסדר, היא תופיע בדלת. אם משהו השתבש, נשלח לך הודעה'. זו הבטחה לערך שעוד לא קיים.",
        "child": "Promise אומר: 'אני עובד על משהו שיקח זמן. כשאסיים — אקרא לך עם התוצאה (.then). אם אכשל — אקרא לך עם השגיאה (.catch)'. עד אז, אתה לא תקוע מחכה — אתה ממשיך לעבוד.",
        "soldier": "Promise מצב יחיד מתוך שלושה: pending (ממתין), fulfilled (הצליח עם value), rejected (נכשל עם reason). אחרי שעבר ל-fulfilled או rejected — לא משנה יותר. .then רץ ב-fulfilled, .catch ב-rejected, .finally בשניהם.",
        "student": "Promises פותרים callback hell ב-async code. resolve(value) ו-reject(reason) במקום callback(err, val). שרשור עם .then מאפשר composition לינארית. async/await הוא syntactic sugar מעל Promises — async function תמיד מחזירה Promise.",
        "junior": "טעויות נפוצות: לא להחזיר Promise מתוך .then (שובר את ה-chain), לשכוח .catch (unhandled rejection → לוגים זוועה), Promise.all שמכשיל הכל אם אחד נופל (השתמש ב-allSettled אם רוצים partial success). תמיד או .catch או try/await/catch — לא מערבבים.",
        "professor": "Promise A+ spec מגדיר את המעבר ב-microtask queue. resolve(otherPromise) יוצר 'thenable assimilation' — ממתין ל-otherPromise. await של non-Promise עוטף אוטומטית עם Promise.resolve. ב-V8, allocation של Promise קורית ב-young generation, ועם זמן עוברים ל-old. Excessive Promise creation בלולאות חמות = pressure על GC."
      },
      "codeExample": "const fetchUser = (id) => {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (id > 0) resolve({ id, name: 'Tal' });\n      else reject(new Error('invalid id'));\n    }, 500);\n  });\n};\nfetchUser(1).then(u => console.log(u)).catch(e => console.error(e));",
      "codeExplanation": "Promise mediates async operation. resolve מסמן הצלחה (.then רץ), reject מסמן כשלון (.catch רץ). פונקציה מחוץ ממתינה במקביל לעבודה המתבצעת בתוך — לא חוסם את ה-thread."
    },
    {
      "conceptName": "fetch",
      "difficulty": 6,
      "levels": {
        "grandma": "\"fetch\" זה כמו לשלוח מכתב לחבר ולחכות לתשובה. אתה כותב 'תוכל לשלוח לי את המתכון לעוגה?', ומחכה — אולי הוא יענה היום, אולי מחר. בינתיים אתה ממשיך לבשל. כשהמכתב מגיע — אתה קורא.",
        "child": "fetch אומר לדפדפן: 'לך לשרת הזה ותביא לי משהו'. הדפדפן יוצא, מחכה לתשובה, וחוזר עם הPromise. אתה לא נשאר תקוע — הקוד ממשיך לרוץ. כשהתשובה מגיעה — fetch מסיים את ה-Promise.",
        "soldier": "fetch(url) שולח HTTP request, מחזיר Promise<Response>. await fetch מקבל את ה-Response — זה רק ה-headers, לא ה-body. await res.json() קורא את ה-body כ-JSON. fetch לא דוחה על 4xx/5xx — חייב לבדוק res.ok ידנית.",
        "student": "fetch הוא ה-API הסטנדרטי החליף את XMLHttpRequest. אופציות נפוצות: { method, headers, body, credentials, signal }. credentials: 'include' שולח cookies cross-origin. AbortController + signal מאפשר ביטול. body יכול להיות string, FormData, Blob, ReadableStream.",
        "junior": "ב-production תעטוף fetch בwrapper פנימי: timeout, retries with exponential backoff, error mapping, JSON parsing, types. ספריות כמו axios או ky עושות את זה כברירת מחדל. ב-React, השתמש ב-React Query / SWR במקום fetch ישיר — מטפל ב-caching, dedup, refetch automatically.",
        "professor": "fetch מבוסס על ה-Fetch standard של WHATWG. ה-Response object מבוסס על streams — ניתן לקרוא chunk-by-chunk עם res.body.getReader() במקום לחכות לכל הbody. CORS preflight מתבצע ב-browser רק לrequests שאינם 'simple' (custom headers, methods שאינם GET/POST/HEAD, או content-type שאינו form-data/text). ב-server-side (Node 18+) fetch זמין מובנה."
      },
      "codeExample": "async function loadUser(id) {\n  const res = await fetch(`/api/users/${id}`, {\n    headers: { 'Accept': 'application/json' },\n    signal: AbortSignal.timeout(5000)\n  });\n  if (!res.ok) throw new Error(`HTTP ${res.status}`);\n  return res.json();\n}",
      "codeExplanation": "fetch קורא ל-API, AbortSignal.timeout מבטיח שלא ניתקע יותר מ-5 שניות. בדיקת res.ok חיונית כי fetch לא דוחה על HTTP errors. await res.json() ממיר את ה-body מ-stream ל-object."
    },
    {
      "conceptName": "scope",
      "difficulty": 5,
      "levels": {
        "grandma": "scope זה כמו חדרים בבית: מה שנמצא בחדר השינה — לא נגיש למטבח. משתנה שהגדרת בתוך פונקציה — לא קיים מחוצה לה. זה scope: הגבולות של איפה משתנה 'רואה' ומה הוא 'רואה'.",
        "child": "scope זה מי יכול לראות מה. אם כתבת let x = 5 בתוך if { } — רק בתוך הסוגריים x קיים. מחוץ לסוגריים — x לא קיים בכלל. זה מונע מהקוד להסתבך עם משתנים שלא אמורים להגיע אליו.",
        "soldier": "JS יש שלושה סוגי scope: global (כל הקוד), function (בתוך function), block (בתוך { } עם let/const). var מתעלם מblock scope — חי בfunction scope. let/const מכבדים block scope. Scope chain: אם משתנה לא נמצא — JS מחפש ב-outer scope.",
        "student": "Lexical scope: scope נקבע בזמן כתיבת הקוד, לא בזמן ריצה. פונקציה 'רואה' את ה-scope שבו היא הוגדרה — לא שבו נקראת. IIFE (Immediately Invoked Function Expression): (function(){})() יוצר scope מבודד — שימוש היסטורי לפני let/const. Module scope: ב-ESModules כל קובץ הוא scope נפרד.",
        "junior": "בפרויקט: scope bugs נפוצים עם closures ב-loops. הבעיה הקלאסית: for (var i=0; ...) { setTimeout(() => console.log(i)) } — כל callback מדפיס את ה-i הסופי כי var לא בblock scope. הפתרון: for (let i=...) — let יוצר scope חדש לכל iteration. React hooks יש להם closure על state של הrender שבו נוצרו.",
        "professor": "Scope ב-spec הוא LexicalEnvironment — record של bindings + pointer לouter environment. Function scope creates new LexicalEnvironment. Block scope ב-let/const: temporal dead zone (TDZ) — משתנה קיים ב-binding record אבל לא initialized עד לשורת ההגדרה. var declarations hoisted ל-function scope, initialized ל-undefined. eval יוצר scope חדש שיכול לפגוע בoptimizations — V8 לא יכול לסיים analysis על scopes שיש בהם eval."
      },
      "codeExample": "let globalX = 'global';\n\nfunction outer() {\n  let outerX = 'outer';\n\n  function inner() {\n    let innerX = 'inner';\n    console.log(globalX);  // ✅ scope chain\n    console.log(outerX);   // ✅ closure\n    console.log(innerX);   // ✅ local\n  }\n\n  inner();\n  // console.log(innerX);  // ❌ ReferenceError\n}\n\n{\n  let blockVar = 'block';\n}\n// console.log(blockVar); // ❌ ReferenceError",
      "codeExplanation": "inner() יכולה לגשת ל-outerX ו-globalX דרך scope chain — בדיקה מבפנים החוצה. innerX נגיש רק בתוך inner(). blockVar נגיש רק בתוך ה-{ } שלה. הconsole.log המוחרגים היו גורמים ל-ReferenceError."
    },
    {
      "conceptName": "event",
      "difficulty": 5,
      "levels": {
        "grandma": "event זה כמו פעמון דלת: הדפדפן מצלצל כשמשהו קורה — 'לחצו על כפתור', 'הדף נטען', 'זוזו עם העכבר'. אתה כותב: 'כשהפעמון מצלצל — תבצע את הפעולה הזו'. הדפדפן זוכר את זה ויודע מה לעשות.",
        "child": "event זה כמו לחכות שמישהו יגע בכפתור ואז לעשות משהו. הדפדפן שומר רשימה: 'אם ילחצו על הכפתור הזה — תריץ את הפונקציה הזו'. זה נקרא event listener — מאזין לאירועים.",
        "soldier": "addEventListener(type, handler) רושם handler שירוץ כשevent מסוג type מתרחש על element. types נפוצים: click, submit, input, keydown, mouseover, scroll, load, DOMContentLoaded. removeEventListener מסיר. option { once: true } — מסיר אוטומטית לאחר פעם ראשונה.",
        "student": "Events עוברים ב-DOM בשני שלבים: capture (מlroot לelement) ו-bubble (מelement לroot). ברירת מחדל: bubble phase. { capture: true } מאזין בcapture phase. Event delegation: הוסף listener על parent — תפוס events מchildren. stopPropagation() עוצר bubble. preventDefault() מבטל ברירת מחדל (כמו submit של form).",
        "junior": "בפרויקט: event delegation חוסך listeners רבים. במקום listener על כל item ברשימה — listener אחד על ה-list שבודק event.target. ב-React: synthetic events — wrapper שמנרמל בין browsers; לא צריך removeEventListener כי React מנהל זאת. Clean up ב-useEffect: return () => element.removeEventListener(...).",
        "professor": "Event dispatch מוגדר ב-DOM Events spec. Custom events: new CustomEvent('my-event', { bubbles: true, detail: data }). Event loop: macrotask (setTimeout, I/O) vs microtask (Promise, queueMicrotask). Event listeners קוראים ב-microtask queue לאחר script גמר, לפני paint. Passive listeners ({ passive: true }) — מסמנים שלא תקרא preventDefault, מאפשר לbrowser לscroll בthread נפרד."
      },
      "codeExample": "const btn = document.getElementById('save-btn');\n\nfunction handleSave(event) {\n  event.preventDefault(); // מונע reload בform submit\n  const name = document.getElementById('name').value;\n  console.log('שמירה:', name);\n}\n\nbtn.addEventListener('click', handleSave);\n\n// ניקוי (חשוב ב-SPA)\n// btn.removeEventListener('click', handleSave);",
      "codeExplanation": "addEventListener קושר handleSave ל-click event על הכפתור. event.preventDefault() מונע submit של form אם הכפתור הוא type=submit. שמירה של reference לfunctionhandler (handleSave) מאפשרת removeEventListener מאוחר יותר — לא ניתן להסיר anonymous function."
    },
    {
      "conceptName": "event object",
      "difficulty": 5,
      "levels": {
        "grandma": "ה-event object זה כמו הדוח שמגיע עם ה'פעמון': הוא לא רק אומר 'לחצו' — הוא מספר גם איפה לחצו, על מה לחצו, ומה עוד קרה. בתוך הhandler שלך, event הוא החבילת מידע המלאה על מה שקרה.",
        "child": "כשמישהו לוחץ, הדפדפן שולח חבילת מידע: 'לחצו על הכפתור הזה, בנקודה (x:150, y:300), בזמן הזה'. החבילה הזו נקראת event object. אתה מקבל אותה בparam הראשון של הhandler: (event) => {...}.",
        "soldier": "event object מועבר אוטומטית ל-handler כparam ראשון. שדות נפוצים: event.type ('click'), event.target (ה-element שעליו לחצו), event.currentTarget (ה-element שיש לו הlistener), event.preventDefault(), event.stopPropagation().",
        "student": "כל סוג event מוסיף properties ייחודיות: MouseEvent: clientX/Y, pageX/Y, button, ctrlKey. KeyboardEvent: key, code, altKey, shiftKey. InputEvent: data, inputType. FormEvent: target.value. event.target vs currentTarget: target = מי ש'יצר' את ה-event; currentTarget = מי שמאזין.",
        "junior": "בפרויקט: event delegation — parent listener שבודק event.target: if (event.target.matches('.delete-btn')). ב-React: SyntheticEvent עוטף events עם pooling (בעבר) — אל תקרא event.persist() בReact 17+. onSubmit: event.preventDefault() חובה. TypeScript: (event: React.MouseEvent<HTMLButtonElement>) — typing מדויק.",
        "professor": "Event interface: timeStamp, isTrusted (user-generated vs programmatic). eventPhase: 1=capture, 2=target, 3=bubble. composed ו-composedPath: עוזרים עם Shadow DOM. Event pooling הוסר ב-React 17 — SyntheticEvent כבר לא recycled. Pointer events מאחדים mouse/touch/stylus: pointerType, pressure, tiltX/Y. Custom events: new CustomEvent('name', { detail: {}, bubbles: true, cancelable: true })."
      },
      "codeExample": "document.querySelector('#my-form').addEventListener('submit', (event) => {\n  event.preventDefault(); // מונע reload\n\n  const form = event.currentTarget; // ה-form עם הlistener\n  const clicked = event.target;    // מי השיק את ה-submit\n\n  const name = form.querySelector('[name=username]').value;\n  console.log('submitted by:', clicked.type, 'name:', name);\n});",
      "codeExplanation": "event הוא הobject שמועבר לhandler. event.preventDefault() מונע reload. event.currentTarget הוא ה-form (מי שמאזין). event.target הוא ה-element שהשיק את ה-submit (כפתור). form.querySelector מחלץ את הinput value."
    },
    {
      "conceptName": "hoisting",
      "difficulty": 4,
      "levels": {
        "grandma": "hoisting זה כמו שעוזרת הבית מסדרת את הבית לפני שאתה קם: כל ה-var ופונקציות 'מועלות' למעלה לפני שהקוד רץ. כלומר, אתה יכול לקרוא לפונקציה לפני שהגדרת אותה — והיא כבר שם.",
        "child": "hoisting זה כשהדפדפן 'מקדים' כמה דברים לפני שמריץ את הקוד. function declarations מועלות כולן למעלה — אפשר לקרוא להן לפני שכתבת אותן. var מועלה בלי ערך — תקבל undefined ולא שגיאה.",
        "soldier": "JS קורא את הקוד פעמיים: pass ראשון — אוסף function declarations ו-var declarations. Pass שני — מריץ. function declarations מועלות עם גוף שלם. var מועלה כhoist אבל ה-value נשאר undefined עד השורה. let/const לא מועלות (TDZ — Temporal Dead Zone).",
        "student": "Hoisting types: Function declaration: מועלה עם גוף — ניתן לקרוא לפני ההגדרה. Function expression (var f = function(){}): var מועלה, הfunction לא. Arrow function: לא מועלה. Class declaration: מועלה לTDZ — לא ניתן לשימוש לפני ההגדרה. var: מועלה ל-undefined. let/const: TDZ — ReferenceError אם ניגשים לפני ההגדרה.",
        "junior": "בפרויקט: הוספת 'use strict' מונעת accidental globals. עם let/const — כמעט אין hoisting surprises. function declarations ב-blocks (\\'function foo(){}\' בתוך if) — התנהגות שונה בין strict/non-strict ובין browsers. Arrow functions בmethods של class — חשוב לdeclare לפני שימוש כי הן expressions ולא declarations.",
        "professor": "Hoisting הוא תוצר של compilation phase ב-V8 (parsing). var declarations ב-function scope: initializer ב-undefined. Function declarations: FunctionDeclarationInstantiation לפני כל ריצה. let/const: binding נוצר בparsing אבל ב-TDZ עד לשורת ההגדרה בריצה — ניגוש גורם ל-ReferenceError ולא ל-undefined. class body: implicit strict mode. eval מחדש מבצע hoisting בסביבה הנוכחית."
      },
      "codeExample": "// ✅ function declaration — ניתן לקרוא לפני ההגדרה\ngreet('Dana');  // 'Hello Dana' — עובד!\n\nfunction greet(name) {\n  return `Hello ${name}`;\n}\n\n// ❌ function expression — var מועלה, function לא\nconsole.log(sayHi);  // undefined — לא שגיאה\n// sayHi();           // TypeError: sayHi is not a function\nvar sayHi = function(name) { return `Hi ${name}`; };\n\n// ❌ let/const — TDZ\n// console.log(age);  // ReferenceError\nconst age = 25;",
      "codeExplanation": "greet() ניתן לקריאה לפני ההגדרה כי function declaration מועלה עם הגוף. sayHi ה-var מועלה כundefined — לכן console.log(sayHi) מדפיס undefined ולא שגיאה. age ב-const היה גורם ל-ReferenceError אם ניגשים לפני השורה — TDZ."
    },
    {
      "conceptName": "event loop",
      "difficulty": 8,
      "levels": {
        "grandma": "event loop זה כמו שמלצר מסעדה שתמיד עסוק: הוא מגיש צלחת, ואז מסתכל על הרשימה — מה הבא? click event? setTimeout? fetch הסתיים? הוא מטפל ברשימה אחד אחד. JavaScript עובד אותו דבר — thread אחד, רשימת משימות.",
        "child": "JavaScript לא יכול לעשות שני דברים בו-זמנית. לכן יש לו תור: כשמשימה מסתיימת — event loop בודק אם יש עוד משימות בתור ומתחיל את הבאה. setTimeout(fn, 0) אומר: 'תוסיף אותי לתור, אחרי שהמשימה הנוכחית תסתיים'.",
        "soldier": "JavaScript single-threaded — thread אחד בלבד. event loop מנהל: call stack (קוד רץ עכשיו) + task queue (macrotasks: setTimeout, setInterval, I/O) + microtask queue (Promises, queueMicrotask). סדר: stack מתרוקן → כל microtasks → macrotask אחד → repaint → חזרה.",
        "student": "Macrotasks (task queue): setTimeout, setInterval, setImmediate(Node), I/O events. Microtasks: Promise.then/catch, async/await, queueMicrotask, MutationObserver. חשוב: כל microtasks מרוקנות לפני macrotask הבא. גם לפני שה-browser מצייר מחדש. לכן Promise.resolve().then() רץ לפני setTimeout(fn, 0).",
        "junior": "בפרויקט: הבנת event loop חיונית ל-async bugs. 'למה ה-state ישן בה-handler?': closure תפסה state ישן (microtask רץ אחרי render). 'למה ה-UI לא מתעדכן?': קוד חוסם את ה-call stack ומונע repaint — שבור לחתיכות עם setTimeout(0) או requestAnimationFrame. 'למה console.log מסודר בצורה לא צפויה?': הבן macrotask vs microtask order.",
        "professor": "Event loop מוגדר ב-HTML Living Standard (לא ECMAScript). rendering steps: style → layout → paint — בין macrotasks. requestAnimationFrame callbacks רצים לפני paint, אחרי microtasks. Worker threads יש event loop נפרד — postMessage חוצה עם structured clone. Node.js event loop: 6 phases (timers, pending callbacks, idle/prepare, poll, check, close) — שונה מ-browser. libuv מנהל I/O async; Promise microtasks רצים בין כל phase."
      },
      "codeExample": "console.log('1 — sync');\n\nsetTimeout(() => console.log('4 — macrotask'), 0);\n\nPromise.resolve().then(() => console.log('3 — microtask'));\n\nconsole.log('2 — sync');\n\n// סדר פלט: 1, 2, 3, 4",
      "codeExplanation": "קוד sync רץ ישר: 1, 2. setTimeout נדחה לmacrotask queue. Promise.then נדחה למicrotask queue. כשה-call stack מתרוקן: כל microtasks ראשונות (3), אחר כך macrotask (4). לכן setTimeout(fn, 0) לא רץ 'מיד' — רק אחרי כל Promises."
    }
  ],
  "quiz": [
    {
      "question": "שיעור 19 — חזרה וסיכום JavaScript: מה נכון לגבי המושג \"script\"?",
      "options": [
        "script הוא מושג מרכזי בשיעור 19 ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שלמושג \"script\" יש תפקיד מעשי ומתועד בהקשר של השיעור."
    },
    {
      "question": "שיעור 19 — חזרה וסיכום JavaScript: מה נכון לגבי המושג \"console.log\"?",
      "options": [
        "console.log הוא מושג מרכזי בשיעור 19 ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שלמושג \"console.log\" יש תפקיד מעשי ומתועד בהקשר של השיעור."
    },
    {
      "question": "שיעור 19 — חזרה וסיכום JavaScript: מה נכון לגבי המושג \"alert\"?",
      "options": [
        "alert הוא מושג מרכזי בשיעור 19 ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שלמושג \"alert\" יש תפקיד מעשי ומתועד בהקשר של השיעור."
    },
    {
      "question": "שיעור 19 — חזרה וסיכום JavaScript: מה נכון לגבי המושג \"DOM\"?",
      "options": [
        "DOM הוא מושג מרכזי בשיעור 19 ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שלמושג \"DOM\" יש תפקיד מעשי ומתועד בהקשר של השיעור."
    },
    {
      "question": "שיעור 19 — חזרה וסיכום JavaScript: מה נכון לגבי המושג \"Data Types\"?",
      "options": [
        "Data Types הוא מושג מרכזי בשיעור 19 ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שלמושג \"Data Types\" יש תפקיד מעשי ומתועד בהקשר של השיעור."
    },
    {
      "question": "שיעור 19 — חזרה וסיכום JavaScript: מה נכון לגבי המושג \"let\"?",
      "options": [
        "let הוא מושג מרכזי בשיעור 19 ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שלמושג \"let\" יש תפקיד מעשי ומתועד בהקשר של השיעור."
    },
    {
      "question": "שיעור 19 — חזרה וסיכום JavaScript: מה נכון לגבי המושג \"var\"?",
      "options": [
        "var הוא מושג מרכזי בשיעור 19 ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שלמושג \"var\" יש תפקיד מעשי ומתועד בהקשר של השיעור."
    },
    {
      "question": "שיעור 19 — חזרה וסיכום JavaScript: מה נכון לגבי המושג \"const\"?",
      "options": [
        "const הוא מושג מרכזי בשיעור 19 ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שלמושג \"const\" יש תפקיד מעשי ומתועד בהקשר של השיעור."
    },
    {
      "question": "שיעור 19 — חזרה וסיכום JavaScript: מה נכון לגבי המושג \"camelCase\"?",
      "options": [
        "camelCase הוא מושג מרכזי בשיעור 19 ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שלמושג \"camelCase\" יש תפקיד מעשי ומתועד בהקשר של השיעור."
    },
    {
      "question": "שיעור 19 — חזרה וסיכום JavaScript: מה נכון לגבי המושג \"if/else\"?",
      "options": [
        "if/else הוא מושג מרכזי בשיעור 19 ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שלמושג \"if/else\" יש תפקיד מעשי ומתועד בהקשר של השיעור."
    },
    {
      "question": "שיעור 19 — חזרה וסיכום JavaScript: מה נכון לגבי המושג \"switch\"?",
      "options": [
        "switch הוא מושג מרכזי בשיעור 19 ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שלמושג \"switch\" יש תפקיד מעשי ומתועד בהקשר של השיעור."
    },
    {
      "question": "שיעור 19 — חזרה וסיכום JavaScript: מה נכון לגבי המושג \"debugger\"?",
      "options": [
        "debugger הוא מושג מרכזי בשיעור 19 ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שלמושג \"debugger\" יש תפקיד מעשי ומתועד בהקשר של השיעור."
    }
  ]
};
