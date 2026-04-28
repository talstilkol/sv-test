// data/option_feedback.js — Per-Distractor Feedback (P1.5.2)
//
// Maps MC question IDs → array of 4 hand-written feedback strings.
// When a student picks a wrong answer, the trainer shows the SPECIFIC
// reason that distractor is wrong — addresses the misconception directly.
//
// Schema:
//   "mc_xxx_NNN": [
//     "feedback for option 0",
//     "feedback for option 1",
//     "feedback for option 2",
//     "feedback for option 3",
//   ]
//
// Curated for ~20 high-impact React/JS questions.
// Where missing, trainer falls back to question.explanation.

var OPTION_FEEDBACK = {
  // ============== Variables / Let / Const ==============
  mc_var_001: [
    "❌ 5 הוא הערך ההתחלתי — אבל השורה x = 8 מעדכנת את הערך, ואחר-כך console.log רץ.",
    "✅ נכון! let מאפשר reassignment. בשורה השנייה x מקבל 8, ואז console.log(x) מדפיס 8.",
    "❌ אין שגיאה — let מותר לעדכן (להבדיל מ-const).",
    "❌ x מקבל ערך מפורש (8) — לא יישאר undefined.",
  ],
  mc_var_002: [
    "❌ אין הבחנה לפי טיפוס. let וגם const עובדים עם כל סוג ערך.",
    "✅ נכון! const מצהיר על קישור קבוע — אסור reassignment. אפשר עדיין לשנות תוכן של אובייקט/מערך פנימה.",
    "❌ let עובד גם בסקופ גלובלי וגם בתוך פונקציות (block scope).",
    "❌ יש הבדל מהותי: const אוסר reassignment, let מתיר.",
  ],

  // ============== Arrays — map / spread / immutable ==============
  mc_arr_003: [
    "❌ map לא משנה את המערך המקורי — הוא יוצר חדש.",
    "❌ map לא יכול לחזור על קבוצה ריקה אם המערך לא ריק.",
    "✅ נכון! map לוקח כל איבר, מפעיל עליו את ה-callback, ומחזיר מערך חדש עם התוצאות. אורך זהה.",
    "❌ map תמיד יוצר מערך חדש — לא string, לא object.",
  ],
  mc_arr_006: [
    "❌ spread לא 'מעתיק עמוקות' — הוא מעתיק שכבה אחת בלבד (shallow copy).",
    "❌ spread יוצר אובייקט/מערך חדש — הפניה חדשה.",
    "✅ נכון! spread (...) פותח את התוכן של ה-iterable ויוצר אוסף חדש. שכבה אחת בלבד מועתקת.",
    "❌ spread עובד גם על מערכים וגם על אובייקטים (ES2018+).",
  ],

  // ============== React useState ==============
  mc_state_001: [
    "❌ אסור באופן רעיוני — אבל הסיבה הטכנית היא אחרת.",
    "✅ נכון! React משווה הפניות (===). push מחזיר את אותה הפניה → React חושב שאין שינוי → אין re-render. הפתרון: spread = מערך חדש = הפניה חדשה.",
    "❌ push עובד גם בדפדפן — זה לא העניין. הסיבה היא ההפניה.",
    "❌ setStudents מקבל ערך מכל סוג; אין הגבלה ל-string.",
  ],

  // ============== Variables — boolean ==============
  mc_var_003: [
    "❌ '' (string ריק) הוא falsy ב-JavaScript אבל הוא לא boolean.",
    "❌ 0 הוא falsy אבל הוא number, לא boolean.",
    "✅ נכון! boolean הוא טיפוס דו-ערכי: true/false. כל אחר הוא טיפוס שונה (אם כי 'truthy/falsy' הוא דבר אחר).",
    "❌ null הוא falsy אבל הוא טיפוס נפרד (object ב-typeof).",
  ],

  // ============== Conditionals ==============
  mc_if_001: [
    "❌ if בלבד לא מטפל בענף השני.",
    "✅ נכון! if/else נותן שני ענפים: כשהתנאי true ירוץ ה-if, אחרת ה-else.",
    "❌ switch דורש ערכים ספציפיים; if/else תומך בכל תנאי.",
    "❌ ternary (?:) הוא ביטוי, לא הצהרה — שונה ב-flow.",
  ],

  // ============== Map — common confusions ==============
  mc_arr_002: [
    "❌ filter לא מבטל איברים — הוא בורר אותם לפי תנאי.",
    "❌ filter לא ממיין; הוא בורר.",
    "✅ נכון! filter מקבל פונקציה שמחזירה boolean. כשhas true → האיבר נכלל במערך החדש; false → לא נכלל.",
    "❌ filter שומר את הסדר המקורי; הוא לא מערבב.",
  ],

  // ============== Spread (lesson 11) ==============
  mc_arr_004: [
    "❌ map תמיד מחזיר מערך חדש; לא משנה את המקור.",
    "✅ נכון! map(callback) → מערך חדש שמכיל את התוצאות של ה-callback על כל איבר.",
    "❌ map לא משנה אורך — אם תרצה זה filter או reduce.",
    "❌ map לא משטח רמות — אם תרצה זה flatMap.",
  ],

  // ============== Reduce ==============
  mc_arr_005: [
    "❌ reduce לא דווקא סוכם; הוא יכול לבצע כל אגרגציה.",
    "❌ reduce תמיד מחזיר ערך אחד (לא מערך).",
    "✅ נכון! reduce(callback, initialValue) מצטבר ערכים — accumulator + current → חוזר עד הסוף עם ערך יחיד.",
    "❌ reduce תומך בכל טיפוס ערך (string, object, number, array...).",
  ],

  // ============== Functions ==============
  mc_fn_001: [
    "❌ function declaration אינו hoisted ערך — מוגדרת לפני שהשורה רצה.",
    "✅ נכון! פונקציה מאפשרת קוד שניתן לשימוש חוזר עם פרמטרים שונים — שימוש מרכזי בתכנות.",
    "❌ פונקציה לא חייבת להחזיר ערך (return יכול להיעדר).",
    "❌ פונקציה לא חייבת לקבל פרמטרים.",
  ],

  // ============== Arrow Function ==============
  mc_fn_002: [
    "❌ arrow לא מכריזה על שם פונקציה ב-stack trace (חיסרון לעיתים).",
    "✅ נכון! arrow לא מקבלת this משלה — היא יורשת מהקונטקסט החיצוני. שימושי במיוחד ב-React/closures.",
    "❌ arrow אכן יכולה להיות async (`async () => ...`).",
    "❌ arrow כן יכולה להחזיר ערך — implicit return ב-`(x) => x + 1`.",
  ],

  // ============== Objects ==============
  mc_obj_001: [
    "❌ אובייקט הוא לא רק מספר — הוא אוסף של זוגות מפתח-ערך.",
    "✅ נכון! אובייקט ב-JS הוא אוסף של key-value pairs, מאפשר ייצוג מבני נתונים מורכבים.",
    "❌ אובייקט לא רק מערך — מערך הוא אוסף מסודר אינדקסים.",
    "❌ אובייקט תומך בכל טיפוס ערך, לא רק string.",
  ],

  // ============== DOM ==============
  mc_dom_001: [
    "❌ getElementById מחזיר אלמנט יחיד (לפי id).",
    "✅ נכון! getElementById לוקח id ומחזיר את האלמנט המתאים מה-DOM, או null אם לא קיים.",
    "❌ querySelectorAll מחזיר אוסף, לא יחיד.",
    "❌ getElementsByClassName מחזיר אוסף, לא יחיד.",
  ],

  // ============== React — useEffect ==============
  mc_effect_001: [
    "❌ useEffect לא רץ לפני הרינדור — הוא רץ *אחרי*.",
    "✅ נכון! useEffect רץ אחרי שה-DOM מתעדכן. זה המקום ל- side effects: fetch, timers, subscriptions.",
    "❌ useEffect לא רץ רק פעם אחת בברירת מחדל — ללא deps הוא רץ אחרי *כל* render.",
    "❌ useEffect לא מחליף shouldComponentUpdate — הוא מחליף componentDidMount / componentDidUpdate.",
  ],
  mc_effect_002: [
    "❌ מערך ריק [] לא גורם ל-effect לפעול כל render — ההיפך! הוא מגביל.",
    "✅ נכון! [] = רץ רק אחרי mount. [x] = רץ כשx משתנה. ללא deps = כל render.",
    "❌ הוספת משתנה ל-deps לא מונעת ריצה — היא קובעת *מתי* לרוץ.",
    '❌ cleanup לא קשור ל-deps array — הוא נקבע ע"י return מ-effect.',
  ],
  mc_effect_003: [
    "❌ cleanup לא רץ רק ב-unmount — הוא גם רץ לפני כל re-run של effect.",
    "✅ נכון! ה-return מ-useEffect הוא ה-cleanup. הוא רץ ב-unmount, וגם לפני כל הפעלה חוזרת של ה-effect.",
    "❌ cleanup חייב להיות פונקציה, לא ערך.",
    "❌ ללא cleanup, intervals/listeners ידלפו — זה לא default behavior.",
  ],

  // ============== React — useState ==============
  mc_state_002: [
    "❌ setState לא סינכרוני — הוא מתזמן re-render עתידי.",
    "✅ נכון! setState מתזמן re-render. הערך החדש זמין רק ברינדור הבא — לא מיד אחרי הקריאה.",
    "❌ setState כן עובד עם מערכים — כל ערך תקין.",
    "❌ אין צורך ב-useEffect כדי לעדכן state — setState ישיר דיו.",
  ],
  mc_state_003: [
    "❌ setState(obj) מחליף לחלוטין, לא ממרג'.",
    "✅ נכון! useState setter מחליף את הערך כולו. להבדיל מ-this.setState של classes שמעשה merge.",
    "❌ state ב-React לא מאוחסן ב-DOM — הוא בזיכרון פנימי של React (fiber).",
    "❌ אין קשר ל-localStorage — useState חי רק במהלך session.",
  ],

  // ============== React — useContext ==============
  mc_context_001: [
    "❌ Context לא מהיר יותר מ-props — הוא נוח אבל כל שינוי גורם ל-re-render של כל הconsumers.",
    "✅ נכון! Context מאפשר שיתוף state ללא prop drilling. createContext → Provider → useContext.",
    "❌ Context לא מחליף Redux — הוא מתאים ל-state שנדיר שמשתנה (theme, locale).",
    "❌ Context לא יוצר isolated state — כל הcomponents שמאזינים רואים אותו ערך.",
  ],

  // ============== React — useRef ==============
  mc_ref_001: [
    "❌ useRef כן שומר ערך בין renders — אבל לא גורם re-render.",
    "✅ נכון! useRef מחזיר {current: val} שנשמר בין renders. שינוי .current לא גורם re-render.",
    "❌ ref לא רק ל-DOM — אפשר לשמור כל ערך (timer IDs, previous values).",
    "❌ ref.current לא read-only — ניתן לשנות בחופשיות.",
  ],

  // ============== Express ==============
  mc_express_001: [
    "❌ app.use() לא מגביל ל-GET — הוא פועל על כל method.",
    "✅ נכון! app.use(middleware) מוסיף middleware שרץ על *כל* request. app.get/post מגבילים ל-method ספציפי.",
    "❌ middleware בExpress נקרא בסדר שהוגדר — לא לפי URL.",
    "❌ middleware לא חייב לשלוח תשובה — הוא יכול רק לעבד ולקרוא ל-next().",
  ],
  mc_express_002: [
    "❌ res.send() לא שולח JSON אוטומטית — הוא שולח text/html בברירת מחדל.",
    "✅ נכון! res.json() שולח Content-Type: application/json + JSON.stringify אוטומטי. res.send() שולח text.",
    "❌ res.render() שולח HTML מtemplate — לא JSON.",
    "❌ res.status() לא שולח תשובה — הוא רק מגדיר status code (חייב .send()/.json() אחריו).",
  ],
  mc_express_003: [
    "❌ req.params מכיל רק URL params (:id) — לא query או body.",
    "✅ נכון! req.params = URL params (:id). req.query = ?key=val. req.body = POST body (צריך middleware).",
    "❌ req.query מכיל query string — לא URL params.",
    "❌ req.body ריק בלי middleware (express.json/urlencoded).",
  ],

  // ============== Async / Promise ==============
  mc_async_001: [
    "❌ async function לא מחזירה undefined — היא תמיד מחזירה Promise.",
    "✅ נכון! async function עוטפת את ה-return value ב-Promise.resolve() אוטומטית.",
    "❌ await לא עוצר את כל התוכנית — רק את ה-async function הנוכחית.",
    "❌ try/catch ב-async לא נדרש אבל מומלץ מאוד — ללא catch שגיאות נבלעות.",
  ],
  mc_async_002: [
    "❌ Promise.all לא ממתינה לכולם אם אחד נכשל — היא נכשלת מיד.",
    "✅ נכון! Promise.all = fail-fast. אם אחד rejected — כולו rejected. להמשיך עם הצלחות: Promise.allSettled.",
    "❌ Promise.race לא ממתינה לכולם — היא עובדת לפי הראשון שמסיים.",
    "❌ .catch() לא תופס sync errors — הוא רק ל-Promise rejections.",
  ],
  mc_async_003: [
    "❌ .then() לא מריץ את הcallback מיד — הוא מתזמן ל-microtask queue.",
    "✅ נכון! .then() callbacks רצים ב-microtask queue — אחרי שכל הsync code סיים.",
    "❌ .finally() לא מקבל ארגומנט — הוא רץ ללא ערך הresolved.",
    "❌ Promise.resolve(42) לא יוצר pending promise — הוא מיד fulfilled.",
  ],

  // ============== Closures ==============
  mc_closure_001: [
    "❌ closure לא 'מעתיקה' ערכים — היא שומרת reference לscope.",
    "✅ נכון! closure = פונקציה שזוכרת את ה-lexical scope שבו נוצרה, גם אחרי שהפונקציה החיצונית סיימה.",
    "❌ closure לא פועלת רק על global variables — כל scope עובד.",
    "❌ closure לא קשורה ל-this — this נקבע בזמן קריאה (או lexically באarrow).",
  ],
  mc_closure_002: [
    "❌ var בלולאה לא יוצר closure נפרד לכל iteration — אותו scope.",
    "✅ נכון! let יוצר binding חדש בכל iteration. var חולק binding אחד. לכן var בלולאה + setTimeout = באג קלאסי.",
    "❌ IIFE לא נדרש אם משתמשים ב-let — let פותר את הבעיה.",
    "❌ Arrow function לא פותרת את בעיית var בלולאה — רק let.",
  ],

  // ============== MongoDB ==============
  mc_mongo_001: [
    "❌ find() לא מצריך toArray() תמיד — ב-mongoose מחזיר Promise ישירות.",
    "✅ נכון! ב-native driver, find() מחזיר cursor. צריך toArray() או forEach(). ב-Mongoose, .find() מחזיר Query.",
    "❌ findOne() מחזיר document יחיד — לא cursor.",
    "❌ find({}) לא מחזיר ריק — הוא מחזיר *את כולם* (ללא filter).",
  ],
  mc_mongo_002: [
    "❌ $set לא מחליף את כל ה-document — הוא מעדכן שדות ספציפיים בלבד.",
    "✅ נכון! $set שומר את שאר השדות ומעדכן רק את מה שציינת. בלי $set — MongoDB מחליף את כל ה-document.",
    "❌ updateOne ללא $set = replacement — יש להיזהר!",
    "❌ $push מוסיף לarray בdocument — לא מחליף.",
  ],
  mc_mongo_003: [
    "❌ _id לא אופציונלי — MongoDB מוסיף אוטומטית אם לא ציינת.",
    "✅ נכון! MongoDB מייצר ObjectId ייחודי ל-_id אם לא סופק. הוא כולל timestamp, machine id, counter.",
    "❌ _id לא חייב להיות ObjectId — אפשר כל ערך ייחודי (string, number).",
    "❌ שני documents עם אותו _id = DuplicateKeyError.",
  ],

  // ============== TypeScript ==============
  mc_ts_001: [
    "❌ interface לא מוגבל ל-classes — הוא מגדיר צורת אובייקט.",
    "✅ נכון! interface מגדיר חוזה (contract) — אילו שדות ומתודות חייבים להיות. אפשר להרחיב עם extends.",
    "❌ type יכול להגדיר union/intersection — interface לא.",
    "❌ interface לא מתקמפל ל-JS — הוא נמחק (type erasure).",
  ],
  mc_ts_002: [
    "❌ union type לא אומר ששני הטיפוסים חיים בו-זמנית — רק אחד מהם בכל רגע.",
    "✅ נכון! A | B = הערך יכול להיות A או B. TypeScript ידרוש type narrowing (typeof, in) לפני שימוש ספציפי.",
    "❌ intersection (A & B) = חייב לקיים *שניהם*. union (A | B) = חייב לקיים *אחד*.",
    "❌ generic <T> לא union — הוא פרמטר סוג שנקבע בשימוש.",
  ],

  // ============== CSS / Tailwind ==============
  mc_css_001: [
    "❌ flex-direction: row היא ברירת המחדל — לא צריך להגדיר.",
    "✅ נכון! display: flex הופך את הcontainer ל-flex. ברירת מחדל: row (אופקי), nowrap (ללא שבירה).",
    "❌ justify-content מיישר לאורך ה-main axis (אופקי בrow).",
    "❌ align-items מיישר לאורך ה-cross axis (אנכי בrow).",
  ],
  mc_css_002: [
    "❌ Grid לא מחליף Flex — כל אחד לתרחיש אחר.",
    "✅ נכון! Grid = 2D layout. Flex = 1D layout. Grid מתאים לפריסת עמוד; Flex לרכיבים בשורה/טור.",
    "❌ grid-template-columns מגדיר עמודות — לא שורות.",
    "❌ gap עובד גם ב-Grid וגם ב-Flex (מודרני).",
  ],
  mc_css_003: [
    "❌ mobile-first לא אומר שmobile עם media query — ההיפך.",
    "✅ נכון! Mobile-first = styles בסיסיים למובייל, media queries מוסיפות לdesktop. Tailwind עובד ככה (sm: md: lg:).",
    "❌ min-width בmedia query = mobile-first. max-width = desktop-first.",
    "❌ Tailwind breakpoints הם min-width. sm:=640px+, md:=768px+, lg:=1024px+.",
  ],

  // ============== Scope / Hoisting ==============
  mc_scope_001: [
    "❌ var ב-if לא נשאר בblock — הוא דולף לfunction scope.",
    "✅ נכון! var = function scope. let/const = block scope. var 'דולפת' מלולאות, if-ים, וכו'.",
    "❌ let בfor loop יוצר binding חדש בכל iteration.",
    "❌ var hoisting = ההצהרה עולה, אבל ההשמה נשארת במקום.",
  ],
  mc_scope_002: [
    "❌ Hoisting של var לא מעלה את הערך — רק את ההצהרה.",
    "✅ נכון! var x = 5: ההצהרה (var x) hoisted, ההשמה (x=5) לא. לכן console.log(x) לפני = undefined.",
    "❌ function declarations hoisted מלאים — גם שם וגם גוף.",
    "❌ let/const hoisted אבל ב-TDZ — גישה לפני ההצהרה = ReferenceError.",
  ],

  // ============== HTTP ==============
  mc_http_001: [
    "❌ GET לא שומר נתונים ב-body — הוא שולח ב-URL/query string.",
    "✅ נכון! GET = קריאת משאב. הוא idempotent — לא משנה state בשרת. נתונים נשלחים ב-URL.",
    "❌ POST שולח נתונים ב-body — מתאים ליצירה (create).",
    "❌ PUT מחליף את כל המשאב — PATCH מעדכן חלקית.",
  ],
  mc_http_002: [
    "❌ 404 לא אומר שיש באג — סתם שהresource לא קיים.",
    "✅ נכון! 404 = Not Found. המשאב לא קיים בURL המבוקש. בדוק שהURL נכון ושהresource נוצר.",
    "❌ 401 = לא מזוהה (צריך login/token). 403 = מזוהה אבל אין הרשאה.",
    "❌ 500 = שגיאה בשרת. לא קשור ל-client request.",
  ],

  // ============== Classes ==============
  mc_class_001: [
    "❌ constructor לא חייב — אבל אם אתה רוצה לאתחל שדות, כן.",
    "✅ נכון! constructor() רץ ב-new. this.x שומר שדות על ה-instance. ללא constructor — instance ב default.",
    "❌ extends לא מחליף constructor — הוא יורש + צריך super().",
    "❌ static methods שייכים ל-class, לא ל-instance.",
  ],

  // ============== Imports ==============
  mc_import_001: [
    "❌ require() הוא CommonJS — עובד במודוליות Node.",
    "✅ נכון! import/export = ES Modules. require/module.exports = CommonJS. שניהם עובדים ב-Node, אבל ESM הוא הסטנדרט החדש.",
    "❌ import x from 'y' = default import. import { x } from 'y' = named import.",
    "❌ exports.x = named export ב-CommonJS. module.exports = default.",
  ],
  // ============== EJS / Templates ==============
  mc_ejs_001: [
    "❌ <% %> לא מציב ערך — הוא מריץ JS בלבד (flow control).",
    "✅ נכון! <%= expr %> מציב ערך מ-escaped ב-HTML. <%- expr %> = unescaped (מסוכן). <% %> = JS code בלבד.",
    "❌ <%- %> לא escaped — מסוכן אם input מגיע מuser (XSS).",
    "❌ res.render() שולח HTML מtemplate, לא res.send().",
  ],

  // ============== REST ==============
  mc_rest_001: [
    "❌ PUT לא יוצר — הוא מחליף resource שלם. POST יוצר.",
    "✅ נכון! REST: GET=Read, POST=Create, PUT=Replace, PATCH=Update, DELETE=Delete. URL = resource.",
    "❌ PATCH מעדכן חלקית — לא מחליף את כל ה-resource.",
    "❌ DELETE אסור להחזיר body? שקר — convention להחזיר 204 No Content או JSON.",
  ],
  mc_rest_002: [
    "❌ 201 לא אומר שהמשאב קיים — הוא *נוצר* כרגע.",
    "✅ נכון! 201 Created = POST הצליח ומשאב חדש נוצר. 200 OK = request הצליח. 204 = הצליח בלי body.",
    "❌ 301 = redirect קבוע. 302 = redirect זמני. לא קשור ליצירה.",
    "❌ 400 = bad request (client error). לא קשור ליצירה מוצלחת.",
  ],

  // ============== Events ==============
  mc_event_001: [
    "❌ addEventListener לא מחליף קודמים — הוא מוסיף listener נוסף.",
    "✅ נכון! addEventListener מוסיף listener ללא הסרת קודמים. onclick = מחליף. removeEventListener להסרה.",
    "❌ event.preventDefault() לא עוצר bubbling — הוא מונע ברירת מחדל.",
    "❌ event.stopPropagation() עוצר bubbling — לא ברירת מחדל.",
  ],

  // ============== forEach vs map ==============
  mc_arr_007: [
    "❌ forEach כן עובר על כל האלמנטים — אבל לא מחזיר מערך חדש.",
    "✅ נכון! forEach = side effects (console.log, DOM). map = מחזיר מערך חדש. שניהם עוברים על הכל.",
    "❌ map לא משנה את המקור — הוא immutable.",
    "❌ for...of גם עובד אבל אין לו return value כמו map.",
  ],

  // ============== JSON ==============
  mc_json_001: [
    "❌ JSON.stringify אינו מחזיר אובייקט — הוא מחזיר string.",
    "✅ נכון! stringify: object→string. parse: string→object. הם הפוכים.",
    "❌ JSON לא תומך ב-functions — הם נמחקות ב-stringify.",
    "❌ JSON לא תומך ב-undefined, Date (נהפך לstring), RegExp (נמחק).",
  ],

  // ============== Node.js ==============
  mc_node_001: [
    "❌ require() סינכרוני — הוא חוסם את הthread עד טעינה.",
    "✅ נכון! require() הוא CommonJS, סינכרוני. import הוא ESM, אסינכרוני. Node תומך בשניהם.",
    "❌ module.exports = default export. exports.x = named export.",
    "❌ __dirname לא קיים ב-ESM — צריך import.meta.dirname.",
  ],
};

// Export to global scope
if (typeof window !== "undefined") {
  window.OPTION_FEEDBACK = OPTION_FEEDBACK;
}
