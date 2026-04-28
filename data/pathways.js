// data/pathways.js — W7 Learning Pathways
// 30 core concepts × 3 explanation levels: grandma / parent / technical
// Keys: lessonId::conceptName (must match conceptKey() in app.js)

var CONCEPT_PATHWAYS = {

  "lesson_11::Array": {
    grandma:   "מערך זה כמו קופסת שוקולדים עם תאים ממוספרים. בתא הראשון יש שוקולד אחד, בשני שוקולד אחר. אתה יכול לקחת שוקולד לפי מספר התא, להוסיף בסוף, או לספור כמה שוקולדים יש בסך הכל.",
    parent:    "מערך הוא רשימה מסודרת של ערכים בזיכרון. לכל ערך יש אינדקס שמתחיל מ-0. ניתן לגשת לפריט לפי האינדקס שלו, להוסיף/להסיר פריטים, ולעבור על כולם בלולאה.",
    technical: "Array הוא אובייקט בגישה רנדומלית O(1) לפי אינדקס, בזיכרון רצוף. ב-JS הוא dynamic ויכול לכלול ערכים מסוגים שונים. מתודות: push/pop (O(1) amortized), shift/unshift (O(n)), splice/slice. בעצם prototype של Array.prototype."
  },

  "lesson_11::Function": {
    grandma:   "פונקציה היא כמו מתכון. אתה כותב אותה פעם אחת — מה נכנס, מה קורה, מה יוצא. אחר כך אתה יכול להשתמש במתכון הזה כמה פעמים שתרצה בלי לכתוב אותו שוב.",
    parent:    "פונקציה היא בלוק קוד עם שם, שמקבל קלט (פרמטרים), מבצע פעולה, ומחזיר פלט. היא מאפשרת שימוש חוזר בקוד ומפחיתה כפילויות. מוגדרת עם function או arrow =>.",
    technical: "Function הוא אובייקט first-class ב-JS (ניתן להעביר כארגומנט, להחזיר כערך, לאחסן במשתנה). יש הבדל ב-this binding בין function declarations לarrow functions. Hoisting חל על declarations אבל לא expressions. Closure נוצר כשפונקציה מצהירה על גישה לscopeהחיצוני."
  },

  "lesson_11::Variable": {
    grandma:   "משתנה הוא כמו קופסה עם תווית. אתה נותן לה שם, שם בפנים ערך כלשהו — מספר, מילה, כל דבר. אחר כך אתה יכול לפתוח את הקופסה לפי התווית ולראות מה בפנים.",
    parent:    "משתנה הוא מיכל בזיכרון המחשב שמחזיק ערך. ב-JS יש שלוש דרכי הצהרה: var (function-scope, hoisted), let (block-scope, mutable), const (block-scope, immutable binding). const עדיף כברירת מחדל.",
    technical: "JS הוא dynamically typed — המשתנה לא מוגדר לסוג. var נוצר ב-execution context ומועלה (hoisted) כ-undefined. let/const חיים ב-TDZ (Temporal Dead Zone) עד השורה שבה מוגדרים. Primitives מועתקים by value; Objects by reference."
  },

  "lesson_11::Scope": {
    grandma:   "סקופ הוא כמו חדרים בבית. משתנה שנוצר בחדר ההורים ניתן לראות מכל חדר. אבל משתנה שנוצר בחדר הילד לא ניתן לראות מחדר ההורים.",
    parent:    "Scope קובע איפה בקוד ניתן לגשת למשתנה. JS יש global scope, function scope, ו-block scope (let/const). פונקציה מחפשת משתנה קודם בscopeהנוכחי ואז עולה בשרשרת — זה נקרא scope chain.",
    technical: "Lexical scoping ב-JS — הscopeנקבע בזמן כתיבת הקוד, לא בזמן ריצה. Scope chain נוצרת ב-execution context. var ממוקם בfunction scope הקרוב; let/const ב-block scope. Module scope (ESM) מוסיף עוד שכבה."
  },

  "lesson_12::map": {
    grandma:   "map הוא כמו מכונת עיפרון — כל עיפרון ארוך שנכנס יוצא מחודד. אתה מכניס רשימה, ולכל פריט ברשימה מתבצעת אותה פעולה, ויוצאת רשימה חדשה באותו גודל.",
    parent:    "map מקבלת פונקציה ומחילה אותה על כל פריט במערך. מחזירה מערך חדש באותו אורך. המערך המקורי לא משתנה. שימוש נפוץ: המרת מבנה נתונים או הוספת שדה.",
    technical: "Array.prototype.map() מבצע callback עם (element, index, array) ומחזיר Array חדש. זמן ריצה O(n). לא משנה את המערך המקורי (pure transformation). ב-React נפוץ לרינדור רשימות: {items.map(item => <Component key={item.id} />)}."
  },

  "lesson_12::filter": {
    grandma:   "filter הוא כמו מסננת. אתה שם בה מיץ עם גרגרים, והגרגרים שמתאימים לחורים עוברים, האחרים נעצרים. מתוך הרשימה יוצאים רק הפריטים שעמדו בתנאי.",
    parent:    "filter מקבלת פונקציה שמחזירה true/false לכל פריט. מחזירה מערך חדש עם הפריטים שהפונקציה החזירה true עבורם. המערך יכול להיות קצר יותר מהמקורי.",
    technical: "Array.prototype.filter() מריץ predicate function (element, index, array) → boolean. O(n). מחזיר shallow copy של הפריטים שהpredicate מחזיר truthy. שימושי בשילוב עם map/reduce ב-pipeline פונקציונלי."
  },

  "lesson_12::reduce": {
    grandma:   "reduce הוא כמו קופת חיסכון. אתה עובר על כל מטבע ברשימה ומוסיף אותו לצבר. בסוף אתה מקבל מספר אחד — הסכום הכולל (אבל הצבר יכול להיות כל דבר, לא רק מספר).",
    parent:    "reduce מקבל פונקציה וערך התחלתי (accumulator), עובר על כל פריט, ומחזיר ערך אחד בסוף. יכול לחשב סכומים, לבנות אובייקטים, לאחד מערכים — כל טרנספורמציה לערך יחיד.",
    technical: "Array.prototype.reduce(callback, initialValue). Callback מקבל (accumulator, currentValue, index, array). ניתן לממש map ו-filter באמצעות reduce. ב-Redux, reducer הוא בדיוק אותו pattern: (state, action) => newState."
  },

  "lesson_12::forEach": {
    grandma:   "forEach הוא כמו לקרוא לכל ילד בתור לאכול — אתה עובר אחד אחד, אבל לא מחזיר כלום. רק עושה משהו עם כל פריט.",
    parent:    "forEach עובר על כל פריט במערך ומריץ פונקציה. בניגוד ל-map, לא מחזיר מערך חדש — מיועד לפעולות side-effect בלבד כמו console.log, DOM update, או שמירה לDB.",
    technical: "Array.prototype.forEach(callback(element, index, array)). מחזיר undefined תמיד. אינו ניתן לעצירה (לא ניתן לשבור עם break — יש להשתמש ב-for...of). גרוע מ-map לטרנספורמציות כי מכריח side-effect thinking."
  },

  "lesson_13::Object": {
    grandma:   "אובייקט הוא כמו טופס. לכל שדה בטופס יש שם (שם, גיל, כתובת) וערך. אתה יכול לגשת לשדה לפי השם שלו ולשנות אותו.",
    parent:    "Object ב-JS הוא אוסף של מפתח-ערך. המפתחות הם strings/symbols, הערכים יכולים להיות כל דבר. ניתן ליצור עם {}, לגשת עם dot notation או brackets. אובייקטים מועברים by reference.",
    technical: "Plain objects ב-JS הם hash maps עם prototype chain. גישה בO(1) ממוצע. ניתן לעבור עליהם עם for...in (כולל prototype), Object.keys/values/entries (own only). Destructuring ו-spread operator מאפשרים עבודה נוחה. Freeze עם Object.freeze לimmutability."
  },

  "lesson_13::Class": {
    grandma:   "Class הוא כמו תבנית לעוגה. אתה מגדיר פעם אחת את הצורה והטעם, ואחר כך יכול לאפות ממנה כמה עוגות שתרצה — כל אחת עצמאית אבל מאותה תבנית.",
    parent:    "Class ב-JS היא תחביר נוח לבניית אובייקטים עם constructor, מתודות, ו-inheritance (extends). ה-constructor רץ כשיוצרים instance עם new. מאפשרת ארגון קוד ב-OOP style.",
    technical: "Class ב-JS היא syntactic sugar על prototypal inheritance. השיטות מוגדרות על הprototype, לא על כל instance. constructor הוא constructor function רגיל. extends משתמשת ב-[[Prototype]] chain. super() חייב לרוץ ב-constructor לפני this. static methods על הclass עצמו."
  },

  "lesson_15::Closure": {
    grandma:   "Closure הוא כמו מגירה בתוך ארון. הפונקציה הפנימית יכולה לזכור את המשתנים של הפונקציה שיצרה אותה, גם אחרי שהפונקציה החיצונית כבר סיימה לרוץ.",
    parent:    "Closure נוצר כשפונקציה 'זוכרת' את הסביבה (scope) שבה נוצרה, גם כשהיא רצה מחוץ לאותו scope. זה מאפשר ליצור פרטיות, factory functions, ולשמור state ללא מחלקות.",
    technical: "Closure הוא combination של פונקציה ולexical environment שלה. הvariables של הscopeהחיצוני נשמרים ב-closure record ולא נמחקים מהזיכרון כל עוד יש reference לפונקציה הפנימית. בסיס ל-module pattern, currying, ו-memoization."
  },

  "lesson_15::Promise": {
    grandma:   "Promise הוא כמו קבלה מהמסעדה — אתה מזמין אוכל ומקבל מספר. האוכל עוד לא מוכן אבל יש לך הבטחה שיגיע. כשהוא מוכן (resolve) אתה מקבל אותו; אם יש בעיה (reject) אתה מקבל הודעה.",
    parent:    "Promise מייצג פעולה אסינכרונית שתסתיים בעתיד. יש לו 3 מצבים: pending (ממתין), fulfilled (הצליח), rejected (נכשל). משתמשים ב-.then() לטיפול בהצלחה ו-.catch() לשגיאות.",
    technical: "Promise הוא thenable object עם state machine: pending → fulfilled|rejected. ה-executor רץ synchronously אבל then/catch callbacks נדחים ל-microtask queue. Promise.all, Promise.race, Promise.allSettled לניהול מרובים. ניתן ל-chain עם return בתוך then."
  },

  "lesson_15::async/await": {
    grandma:   "async/await הוא כמו לחכות לתור בסופר. במקום לעשות עשרה דברים בבת אחת בצורה מבלבלת, אתה פשוט אומר 'חכה' ועומד בתור. הקוד נראה כמו רגיל, אבל לא חוסם.",
    parent:    "async/await הוא תחביר נוח לעבודה עם Promises. async הופך פונקציה לכזו שמחזירה Promise. await בפנים עוצר את ריצת הפונקציה (לא את ה-thread!) עד שה-Promise מסתיים.",
    technical: "async function מחזירה תמיד Promise. await מסיר ריצה מה-call stack ומכניס continuation ל-microtask queue. try/catch עובד כמו סינכרוני על שגיאות אסינכרוניות. await רק בפנים async context. עדיף לexecute concurrently: const [a,b] = await Promise.all([fa(), fb()])."
  },

  "lesson_15::try/catch": {
    grandma:   "try/catch הוא כמו רשת ביטחון לאקרובט. הוא מנסה לעשות משהו (try), ואם נופל — הרשת תופסת אותו (catch) ואפשר לטפל בבעיה בלי שהכל יתרסק.",
    parent:    "try/catch מאפשר לטפל בשגיאות בזמן ריצה. הקוד ב-try רץ; אם נזרקת שגיאה, הריצה קופצת ל-catch עם אובייקט השגיאה. finally רץ תמיד בסוף (גם אם הייתה שגיאה).",
    technical: "try/catch יורט Error objects שנזרקים (throw) synchronously בתוך הblock. לא יתפוס שגיאות אסינכרוניות (callbacks), אלא אם הפונקציה היא async ויש await. Error types: Error, TypeError, RangeError. יצירת custom errors: class AppError extends Error. finally מבטיח cleanup (כמו defer ב-Go)."
  },

  "lesson_16::Node.js": {
    grandma:   "Node.js הוא כמו לקחת את JavaScript שרץ בדפדפן ולשים אותו במחשב שלך — כדי שתוכל לכתוב תוכניות שרצות ישירות, לא רק בעמוד אינטרנט.",
    parent:    "Node.js הוא סביבת ריצה ל-JS מחוץ לדפדפן. מבוסס על V8 engine. מאפשר לכתוב שרתים, scripts, CLI tools. אסינכרוני ומבוסס event loop — מתאים ל-I/O כבד.",
    technical: "Node.js = V8 + libuv + built-in modules. Event loop עם 6 שלבים (timers, pending, idle, poll, check, close). Non-blocking I/O דרך libuv thread pool. CommonJS (require) לעומת ESM (import). Process object חושף args, env, stdin/stdout."
  },

  "lesson_16::npm": {
    grandma:   "npm הוא כמו חנות ספרים — אתה מחפש ספר (חבילה) שמישהו כבר כתב, לוחץ 'הוסף לסל' ומוריד אותו. זה חוסך לך לכתוב הכל מאפס.",
    parent:    "npm (Node Package Manager) מנהל תלויות פרויקט. package.json מגדיר את שם הפרויקט וכל החבילות שהוא צריך. npm install מוריד הכל ל-node_modules. scripts מגדיר פקודות נוחות.",
    technical: "npm registry הוא largest JS package registry. package.json defines dependencies (runtime) vs devDependencies (build/test). Semantic versioning: ^1.2.3 (minor updates), ~1.2.3 (patch only). package-lock.json נועל גרסאות exact. npm audit לscanning ידוע vulnerabilities."
  },

  "lesson_17::HTTP": {
    grandma:   "HTTP הוא שפת התקשורת של האינטרנט. כשאתה פותח אתר, הדפדפן שולח בקשה ('תן לי את העמוד הזה'), והשרת עונה ('הנה!'). כמו מכתבים קדימה וחזרה.",
    parent:    "HTTP (HyperText Transfer Protocol) הוא פרוטוקול request-response. הלקוח שולח request עם method (GET/POST/PUT/DELETE), URL, headers, ו-body. השרת מחזיר response עם status code, headers, ו-body.",
    technical: "HTTP/1.1 הוא text-based protocol. HTTP/2 מוסיף multiplexing, header compression, server push. Status codes: 2xx success, 3xx redirect, 4xx client error, 5xx server error. Headers חשובים: Content-Type, Authorization, Cache-Control, CORS. HTTPS = HTTP + TLS."
  },

  "lesson_17::REST API": {
    grandma:   "REST API הוא כמו תפריט של מסעדה עם כתובות. כדי להזמין אוכל שולחים 'GET /pizza' וחוזר הפיצה. כדי להוסיף הזמנה — 'POST /orders'. כל כתובת מתאימה לפעולה אחת.",
    parent:    "REST API הוא ארכיטקטורה לתקשורת בין לקוח לשרת. כל resource מיוצג ב-URL. HTTP methods מגדירים מה עושים: GET=קרא, POST=צור, PUT=עדכן, DELETE=מחק. התגובה בד\"כ ב-JSON.",
    technical: "REST (Representational State Transfer) הוא architectural style עם 6 constraints: stateless, client-server, cacheable, layered, uniform interface, optional code-on-demand. Resource-based URLs, HTTP verbs לactions, status codes לsemantic responses. OpenAPI/Swagger לdocumentation. גרסיונות: /v1/, /v2/."
  },

  "lesson_20::MongoDB": {
    grandma:   "MongoDB הוא ארגז קופסאות. כל קופסה (document) יכולה לכלול מה שתרצה — כמו טופס שאין לו תבנית קבועה. לא צריך להגדיר מראש אילו שדות יהיו.",
    parent:    "MongoDB הוא מסד נתונים NoSQL שמאחסן document-ים ב-JSON format. בניגוד ל-SQL אין schema קשיח. אוספים (collections) מחזיקים document-ים. Queries עם find(), שינויים עם updateOne/Many.",
    technical: "MongoDB מאחסן BSON (Binary JSON). כל document מקבל _id אוטומטי (ObjectId). Aggregation pipeline לשאילתות מורכבות. Indexes (B-tree) לביצועים. Replica sets לHA. Mongoose הוא ODM שמוסיף schemas, validation, ו-hooks על גבי native driver."
  },

  "lesson_21::Component": {
    grandma:   "קומפוננטה ב-React היא כמו לגו — בלוק קטן שאפשר להרכיב איתו דברים גדולים. כל בלוק אחראי על חלק אחד של המסך: כפתור, כרטיס, תפריט.",
    parent:    "Component ב-React הוא פונקציה שמקבלת props ומחזירה JSX (HTML-like). ניתן להרכיב קומפוננטות בתוך אחרות. כל קומפוננטה מנהלת את עצמה — state, styling, ולוגיקה.",
    technical: "React component הוא pure function (props) → ReactElement. React.createElement() קומפייל מ-JSX. Virtual DOM diffing (reconciliation) מחשב מינימום שינויים. Component lifecycle: mount → update → unmount. Controlled vs uncontrolled components. Lifting state up לsharing בין siblings."
  },

  "lesson_21::JSX": {
    grandma:   "JSX הוא כמו HTML בתוך JavaScript. במקום לכתוב HTML בנפרד, אתה כותב אותו ישר בתוך הקוד, עם קישוריות לנתונים. זה לא HTML אמיתי — זה קוד שנהפך ל-HTML.",
    parent:    "JSX הוא תחביר מיוחד שמאפשר לכתוב HTML-like code בתוך JavaScript. Babel מתרגם אותו ל-React.createElement() calls. ניתן להטמיע JavaScript בתוך {} בJSX. className במקום class.",
    technical: "JSX הוא syntactic sugar ל-React.createElement(type, props, ...children). ב-React 17+ אין צורך ב-import React בכל קובץ (new JSX transform). Fragments (<></>) מונעים wrapper div. כל attribute מקבל camelCase (onClick, htmlFor). Conditional rendering: {condition && <El/>} או ternary."
  },

  "lesson_21::Props": {
    grandma:   "Props הם כמו הוראות שאתה נותן לטבח. אתה אומר 'הכן לי פיצה עם עגבניות' — הפיצה היא הקומפוננטה, 'עגבניות' הוא ה-prop. כל פעם שמזמינים אפשר לשנות את הטופינג.",
    parent:    "Props הם המידע שמועבר מקומפוננטה אב לקומפוננטה בן. הם read-only — הבן לא יכול לשנות אותם. ניתן להעביר כל ערך: מחרוזות, מספרים, פונקציות, component-ים אחרים.",
    technical: "Props הם immutable objects שמועברים top-down (unidirectional data flow). children prop הוא תוכן בין opening ל-closing tag. defaultProps (או default params) לערכי ברירת מחדל. PropTypes לruntime validation (או TypeScript לstatic). Prop drilling בעיה: Context API/Redux כפתרון."
  },

  "lesson_22::useState": {
    grandma:   "useState הוא כמו לוח מחיק בתוך הקומפוננטה. אתה כותב עליו ערך, ואפשר לשנות אותו. בכל פעם שהערך משתנה, הקומפוננטה 'צובעת' את עצמה מחדש.",
    parent:    "useState הוא hook שמוסיף state לקומפוננטה פונקציונלית. מחזיר [ערך_הנוכחי, פונקציית_עדכון]. כשקוראים לפונקציית העדכון — React מרנדר מחדש את הקומפוננטה עם הערך החדש.",
    technical: "useState הוא hook שמשמר state בין renders. מאחורי הקלעים React שומר state ב-fiber node לפי סדר קריאת ה-hooks (אסור להשתמש ב-hooks בלולאות/conditionals). Batching: React 18 מאחד setState calls ב-event handlers. לstate מורכב: useReducer עדיף."
  },

  "lesson_22::Immutable State": {
    grandma:   "Immutable State הוא כאילו אסור לך לשנות את הדף — צריך לכתוב דף חדש. אם יש לך רשימה ב-state, לא מוסיפים בסוף — יוצרים רשימה חדשה עם הפריט הנוסף.",
    parent:    "ב-React אסור לשנות state ישירות (mutation). במקום זה יוצרים ערך חדש. למערכים: spread [...arr, newItem] במקום arr.push(). לאובייקטים: {...obj, field: newVal} במקום obj.field=. זה מאפשר ל-React לזהות שינויים.",
    technical: "React משווה state/props reference equality (===) להחלטה על re-render. Mutation לא תגרום לre-render כי הreference לא משתנה. Immutable updates: Object.assign, spread, immer library. ב-Redux זה גם קריטי לtime-travel debugging ולpure reducers."
  },

  "lesson_24::useEffect": {
    grandma:   "useEffect הוא כמו לגיד לקומפוננטה: 'בכל פעם שמשהו מסוים משתנה, תעשה את הפעולה הזו'. כמו שעון מעורר — אתה מגדיר מה לעשות ומתי.",
    parent:    "useEffect מריץ קוד לאחר render — לטיפול ב-side effects כמו fetch, subscriptions, DOM manipulation. מקבל dependency array: אם ריק ([]) רץ פעם אחת עם mount. אם יש תלויות — רץ בכל שינוי שלהן.",
    technical: "useEffect(effect, deps) — effect רץ בtask queue לאחר paint. ה-deps array משווה shallow equality. Return של cleanup function מריצה לפני effect הבא ולפני unmount. useLayoutEffect רץ synchronously לאחר DOM mutations אבל לפני paint — לDOM measurements. React 18 Strict Mode מריץ effects פעמיים ב-dev."
  },

  "lesson_24::useMemo": {
    grandma:   "useMemo הוא כמו מחשבון שזוכר תשובות. אם כבר חישבת '123 * 456', בפעם הבאה שתשאל אותה שאלה — הוא פשוט זוכר את התשובה ולא חושב מחדש.",
    parent:    "useMemo מזכיר (cache) תוצאה של חישוב כבד. מחשב מחדש רק כשהtependencies משתנות. משפר ביצועים כשיש חישוב יקר שלא צריך לרוץ בכל render. לא להשתמש לכל דבר — זה overhead.",
    technical: "useMemo(factory, deps) מחזיר memoized value. React שומר last value וdeps; אם deps לא השתנו (shallow equal) מחזיר cached. גרסה של referential stability לobjects/arrays כדי למנוע re-renders מיותרים בילדים. useCallback הוא shorthand ל-useMemo(() => fn, deps)."
  },

  "lesson_24::useRef": {
    grandma:   "useRef הוא כמו sticky note שדבוק לקומפוננטה. אתה כותב עליה ערך, משנה אותה — ולא גורם לציור מחדש. גם יכולה להצביע על אלמנט בעמוד.",
    parent:    "useRef מחזיר object עם .current שמשתמר בין renders. שינוי של .current לא גורם לre-render. שתי שימושים: 1) גישה ישירה ל-DOM element (ref={myRef}). 2) שמירת ערך שצריך לשמר בין renders בלי לגרום לrender.",
    technical: "useRef(init) מחזיר mutable ref object {current: init}. DOM refs: React שם את הDOM node ב-.current לאחר mount ומנקה בunmount. לעומת state: לא גורם לre-render, מיידי (sync), ניתן ל-mutation. פרק ForwardRef/useImperativeHandle לחשיפת refs להורה."
  },

  "lesson_23::React Router": {
    grandma:   "React Router הוא כמו שלטי כביש לאתר שלך. כשמישהו עובר ל-'/אודות' — הוא רואה עמוד אחד. כשהוא ב-'/בית' — עמוד אחר. הכל בלי לטעון מחדש את העמוד.",
    parent:    "React Router מנהל ניווט ב-SPA. מאפשר להגדיר Routes: כל path מוביל לComponent אחר. useNavigate לניווט programmatic. useParams לקריאת dynamic params מה-URL. Link/NavLink במקום <a> כדי לא לרענן.",
    technical: "React Router v6 משתמש ב-History API (pushState/replaceState). BrowserRouter עוטף את האפליקציה בRouter context. <Routes> ו-<Route path=\"/x\" element={<X/>}> ל-declarative routing. Nested routes עם <Outlet>. Loaders/Actions ב-v6.4+ לdata fetching בתוך router."
  },

  "lesson_23::Context API": {
    grandma:   "Context הוא כמו רדיו בתחנה. המשדר (Provider) שולח מוזיקה, וכל מי שיש לו מקלט (useContext) יכול לשמוע — בלי שצריך להעביר כבל מקומפוננטה לקומפוננטה.",
    parent:    "Context מאפשר שיתוף state בין קומפוננטות ללא prop drilling. יוצרים context עם createContext, עוטפים עם Provider, קוראים עם useContext. שימושי ל-theme, שפה, user authentication.",
    technical: "React.createContext(defaultValue) יוצר Context object עם Provider ו-Consumer. כל קומפוננטה שמשתמשת ב-useContext(MyCtx) תre-render כשvalue של Provider משתנה. בעיית ביצועים: כל שינוי בvalue גורם לre-render לכל subscribers. פתרון: פיצול contexts, memo, Zustand/Jotai."
  },

  "lesson_26::TypeScript": {
    grandma:   "TypeScript הוא JavaScript עם תוויות על הקופסאות. כשאתה שם ערך בקופסה, אתה גם כותב על התווית מה מותר לשים שם — מספר? מחרוזת? זה עוזר להימנע מטעויות לפני שהתוכנית בכלל רצה.",
    parent:    "TypeScript הוא superset של JavaScript שמוסיף type annotations. הדפדפן לא מריץ TypeScript ישירות — ה-compiler מתרגם ל-JS תוך בדיקת types. עוזר לתפוס bugs מוקדם ומשפר IntelliSense ב-IDE.",
    technical: "TypeScript compiler (tsc) עם tsconfig.json. Type system structural (duck typing): אובייקט עם השדות הנכונים מקבל סוג גם בלי להצהיר. Type inference ממזער verbosity. Generics, Union/Intersection types, Mapped types, Conditional types. strict mode מפעיל noImplicitAny, strictNullChecks. Declaration files (.d.ts) לtype-only exports."
  }
};
