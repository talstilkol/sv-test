// data/concise_definitions.js
// One-line, no-fluff definitions for prerequisite panels and weak-answer repair.
(function (global) {
  const defs = {
    "script": {
      what: "קובץ או תגית שמריצים JavaScript.",
      need: "בדפדפן מחברים אותו עם <script>; ב-Node מריצים קובץ JS.",
    },
    "console.log": {
      what: "פקודה שמדפיסה ערך לקונסול.",
      need: "משתמשים בה לדיבוג; היא לא משנה את הערך עצמו.",
    },
    "alert": {
      what: "חלון הודעה פשוט בדפדפן.",
      need: "הוא עוצר את המשתמש עד שלוחצים אישור.",
    },
    "dom": {
      what: "עץ ה-HTML שהדפדפן נותן ל-JS לקרוא ולשנות.",
      need: "document.querySelector מוצא אלמנטים; events מפעילים קוד.",
    },
    "document": {
      what: "document הוא האובייקט שמייצג את דף ה-HTML בדפדפן.",
      need: "דרכו JS מוצא, יוצר ומשנה אלמנטים.",
    },
    "document object model": {
      what: "Document Object Model הוא עץ ה-HTML בזיכרון הדפדפן.",
      need: "JS משנה דרכו טקסט, מחלקות, אלמנטים ואירועים.",
    },
    "html document": {
      what: "HTML document הוא קובץ שמגדיר את מבנה העמוד.",
      need: "הדפדפן קורא אותו ובונה ממנו DOM.",
    },
    "html form": {
      what: "HTML form הוא טופס ששולח שדות לשרת.",
      need: "משתמשים בו להתחברות, הרשמה, חיפוש ושליחת מידע.",
    },
    "css selector": {
      what: "CSS selector הוא ביטוי שבוחר אלמנטים לעיצוב.",
      need: "נקודה בוחרת class, סולמית בוחרת id, ושם תגית בוחר תגיות.",
    },
    "box model": {
      what: "box model הוא מבנה הקופסה של כל אלמנט.",
      need: "הוא כולל content, padding, border ו-margin.",
    },
    "cascade and specificity": {
      what: "cascade and specificity קובעים איזה כלל CSS מנצח.",
      need: "id חזק מ-class, ו-class חזק מתגית כשאין כלל חזק יותר.",
    },
    "data types": {
      what: "סוג הערך: string, number, boolean, object ועוד.",
      need: "הטיפוס קובע אילו פעולות מותר לעשות על הערך.",
    },
    "let": {
      what: "משתנה שאפשר להציב לו ערך חדש.",
      need: "הוא תקף רק בתוך הבלוק שבו נכתב.",
    },
    "github workflow": {
      what: "GitHub workflow הוא רצף עבודה עם branch, PR, review ו-merge.",
      need: "הוא שומר על main נקי ומאפשר בדיקות לפני איחוד.",
    },
    "var": {
      what: "דרך ישנה להצהיר משתנה.",
      need: "עדיף let/const כי var תקף ברמת פונקציה ויוצר בלבול.",
    },
    "const": {
      what: "שם לערך שאי אפשר להקצות מחדש.",
      need: "באובייקט או מערך אפשר לשנות תוכן, אבל לא להציב ערך אחר לשם.",
    },
    "camelcase": {
      what: "כתיבת שם בלי רווחים: מילה ראשונה קטנה וכל מילה אחריה באות גדולה.",
      need: "מקובל לשמות משתנים ופונקציות ב-JavaScript.",
    },
    "if/else": {
      what: "מבנה שמריץ קוד לפי תנאי.",
      need: "if רץ כשהתנאי true; else רץ כשהוא false.",
    },
    "switch": {
      what: "בדיקת ערך אחד מול כמה אפשרויות.",
      need: "מתאים להרבה cases קבועים; צריך break כדי לא להמשיך ל-case הבא.",
    },
    "debugger": {
      what: "פקודה שעוצרת את הקוד בכלי הפיתוח.",
      need: "משתמשים בה כדי לבדוק ערכים שורה-שורה.",
    },
    "network": {
      what: "תעבורת בקשות ותשובות בין הדפדפן לשרת.",
      need: "בודקים שם URL, method, status ו-response.",
    },
    "function": {
      what: "בלוק קוד שנותנים לו שם וקוראים לו כשצריך.",
      need: "פרמטרים נכנסים פנימה; return מחזיר תוצאה החוצה.",
    },
    "parameter": {
      what: "שם לערך שפונקציה מקבלת.",
      need: "argument הוא הערך שנשלח בפועל בזמן הקריאה.",
    },
    "return": {
      what: "פקודה שמחזירה ערך מפונקציה ומסיימת אותה.",
      need: "בלי return מפורש הפונקציה מחזירה undefined.",
    },
    "arrow function": {
      what: "תחביר קצר לפונקציה: () => value.",
      need: "this נלקח מההקשר החיצוני, לא מהקריאה.",
    },
    "while": {
      what: "לולאה שרצה כל עוד תנאי הוא true.",
      need: "חייבים לשנות משהו בתנאי כדי לא ליצור לולאה אינסופית.",
    },
    "for": {
      what: "לולאה עם התחלה, תנאי וקידום.",
      need: "מתאימה כשידוע כמה פעמים בערך צריך לרוץ.",
    },
    "break": {
      what: "יוצא מיד מלולאה או switch.",
      need: "הקוד ממשיך אחרי הבלוק שנשבר.",
    },
    "continue": {
      what: "מדלג לשלב הבא בלולאה.",
      need: "הוא לא יוצא מהלולאה, רק מהסיבוב הנוכחי.",
    },
    "do while": {
      what: "לולאה שרצה פעם אחת לפני בדיקת התנאי.",
      need: "משתמשים כשצריך לבצע פעולה לפחות פעם אחת.",
    },
    "array": {
      what: "מערך הוא רשימה מסודרת של ערכים.",
      need: "ניגשים לערך לפי index שמתחיל ב-0.",
    },
    "foreach": {
      what: "מתודת מערך שמריצה פונקציה לכל פריט.",
      need: "היא לא מחזירה מערך חדש; בשביל זה משתמשים ב-map.",
    },
    "filter": {
      what: "מתודת מערך שמחזירה רק פריטים שעוברים תנאי.",
      need: "הפונקציה חייבת להחזיר true או false לכל פריט.",
    },
    "map": {
      what: "מתודת מערך שיוצרת מערך חדש מכל פריט.",
      need: "הגודל נשאר זהה; כל פריט הופך לערך חדש.",
    },
    "find": {
      what: "מתודת מערך שמחזירה את הפריט הראשון שמתאים לתנאי.",
      need: "אם אין התאמה היא מחזירה undefined.",
    },
    "reduce": {
      what: "מתודת מערך שמצמצמת רשימה לערך אחד.",
      need: "צריך accumulator וערך התחלתי ברור.",
    },
    "spread": {
      what: "שלוש נקודות שמפרקות מערך או אובייקט לתוך מבנה חדש.",
      need: "ב-React משתמשים בו ליצירת עותק בלי mutation.",
    },
    "object": {
      what: "אובייקט הוא אוסף של key/value.",
      need: "ניגשים לערך עם dot או brackets: user.name או user['name'].",
    },
    "property": {
      what: "property הוא שדה בתוך אובייקט.",
      need: "קוראים וכותבים אותו עם dot או brackets.",
    },
    "key": {
      what: "מפתח הוא שם שמצביע לערך בתוך אובייקט או מזהה פריט ברשימה.",
      need: "ב-React key חייב להיות יציב כדי לעדכן רשימות נכון.",
    },
    "value": {
      what: "ערך הוא המידע עצמו שהקוד שומר, מעביר או מחזיר.",
      need: "הטיפוס של הערך קובע אילו פעולות אפשר לבצע עליו.",
    },
    "variable": {
      what: "משתנה הוא שם שמחזיק ערך בקוד.",
      need: "let מתאים לערך שמשתנה; const מתאים לשם שלא מקצים מחדש.",
    },
    "primitive": {
      what: "primitive הוא ערך בסיסי כמו string, number או boolean.",
      need: "משווים אותו לפי value ולא לפי reference.",
    },
    "bit": {
      what: "bit הוא יחידת מידע אחת: 0 או 1.",
      need: "רצף bits מרכיב מספרים, תווים וקבצים.",
    },
    "byte": {
      what: "byte הוא 8 bits.",
      need: "משתמשים בו למדידת גודל מידע בזיכרון, קבצים ורשת.",
    },
    "nested object": {
      what: "אובייקט שבתוכו יש אובייקט נוסף.",
      need: "ניגשים בשלבים: user.address.city.",
    },
    "array of objects": {
      what: "מערך שבו כל פריט הוא אובייקט.",
      need: "נפוץ לרשימות משתמשים, מוצרים או משימות.",
    },
    "destructuring": {
      what: "חילוץ ערכים מאובייקט או מערך למשתנים.",
      need: "ב-React משתמשים בזה הרבה ל-props ול-useState.",
    },
    "class": {
      what: "תבנית ליצירת אובייקטים עם constructor ומתודות.",
      need: "ב-JS זו עטיפה נוחה מעל prototype.",
    },
    "method": {
      what: "פונקציה שנמצאת בתוך אובייקט או class.",
      need: "קוראים לה דרך האובייקט: user.save().",
    },
    "inheritance": {
      what: "מחלקה או אובייקט שמקבלים יכולות ממקור אחר.",
      need: "ב-JS זה קורה דרך prototype או extends.",
    },
    "extends": {
      what: "extends יוצר מחלקה שיורשת ממחלקה אחרת.",
      need: "משתמשים בו כשמחלקה חדשה צריכה יכולות בסיס קיימות.",
    },
    "super": {
      what: "super קורא למחלקת האב מתוך מחלקת בן.",
      need: "ב-constructor של class יורש חייבים לקרוא super לפני this.",
    },
    "try": {
      what: "בלוק שמריץ קוד שעלול להיכשל.",
      need: "אם נזרקת שגיאה, catch מטפל בה.",
    },
    "catch": {
      what: "בלוק שתופס שגיאה שנזרקה ב-try.",
      need: "שם מחליטים מה להציג או איך להתאושש.",
    },
    "throw": {
      what: "פקודה שזורקת שגיאה ועוצרת את הזרימה הרגילה.",
      need: "בדרך כלל זורקים Error עם הודעה ברורה.",
    },
    "localstorage": {
      what: "אחסון key/value בדפדפן שנשאר אחרי סגירת הטאב.",
      need: "שומר מחרוזות; לא לשמור בו סודות.",
    },
    "file system": {
      what: "File System הוא מנגנון הקבצים והתיקיות של המחשב.",
      need: "Node משתמש בו דרך fs לקריאה, כתיבה ומחיקה של קבצים.",
    },
    "sessionstorage": {
      what: "אחסון key/value שנמחק כשהטאב נסגר.",
      need: "מתאים למידע זמני של סשן אחד.",
    },
    "cookies": {
      what: "פיסות מידע קטנות שהדפדפן שולח לשרת עם בקשות.",
      need: "משמשות בעיקר session/auth; צריך להגדיר אבטחה.",
    },
    "closure": {
      what: "פונקציה שזוכרת משתנים מהסקופ שבו נוצרה.",
      need: "גם אחרי שהפונקציה החיצונית הסתיימה, הזיכרון נשאר נגיש.",
    },
    "promise": {
      what: "אובייקט שמייצג תוצאה שתגיע בעתיד.",
      need: "מטפלים בו עם then/catch או async/await.",
    },
    "synchronous": {
      what: "Synchronous הוא קוד שרץ שורה אחרי שורה וחוסם עד סיום.",
      need: "הוא פשוט להבנה אבל פעולה איטית יכולה לעצור את המשך הקוד.",
    },
    "asynchronous": {
      what: "Asynchronous הוא קוד שממשיך לרוץ בזמן שממתינים לתוצאה.",
      need: "משתמשים בו לרשת, קבצים, timers ופעולות איטיות.",
    },
    "settimeout": {
      what: "setTimeout מריץ פונקציה אחרי זמן המתנה.",
      need: "הוא מוסיף משימה לתור ולא עוצר את הקוד הסינכרוני.",
    },
    "anonymous function": {
      what: "anonymous function היא פונקציה בלי שם.",
      need: "משתמשים בה כ-callback קצר, למשל באירוע או Promise.",
    },
    "resolve": {
      what: "resolve מסיים Promise בהצלחה עם ערך.",
      need: "then או await יקבלו את הערך שנשלח ל-resolve.",
    },
    "reject": {
      what: "reject מסיים Promise בכישלון עם שגיאה.",
      need: "catch או try/catch סביב await יטפלו בשגיאה.",
    },
    "then": {
      what: "then מריץ callback אחרי ש-Promise הצליח.",
      need: "הוא מקבל את ערך ה-resolve ומחזיר Promise חדש.",
    },
    "error": {
      what: "Error הוא אובייקט שמתאר תקלה בקוד.",
      need: "זורקים אותו עם throw ותופסים אותו עם catch.",
    },
    "exception": {
      what: "Exception היא שגיאה שנזרקת ושוברת את הזרימה הרגילה.",
      need: "מטפלים בה עם try/catch כדי שהאפליקציה לא תקרוס.",
    },
    "catch (promise)": {
      what: "catch תופס כישלון של Promise.",
      need: "משתמשים בו לטיפול שגיאות בשרשרת then.",
    },
    "async": {
      what: "async מסמן פונקציה שמחזירה Promise.",
      need: "בתוך פונקציה כזו אפשר להשתמש ב-await.",
    },
    "await": {
      what: "await ממתין לתוצאה של Promise בתוך פונקציה async.",
      need: "הקוד נראה רציף, אבל בזמן ההמתנה הדפדפן לא נחסם.",
    },
    "callback": {
      what: "callback היא פונקציה שמעבירים כדי שתיקרא מאוחר יותר.",
      need: "נפוץ באירועים, timers ומתודות מערך.",
    },
    "reference": {
      what: "reference הוא מצביע לאובייקט או מערך בזיכרון.",
      need: "שני משתנים עם אותו reference רואים את אותו אובייקט.",
    },
    "by reference": {
      what: "By Reference אומר שמשתנה מחזיק כתובת לאובייקט.",
      need: "שינוי דרך משתנה אחד נראה גם דרך משתנה אחר לאותו object.",
    },
    "by value": {
      what: "By Value אומר שהערך עצמו מועתק למשתנה אחר.",
      need: "שינוי במשתנה החדש לא משנה את הערך המקורי.",
    },
    "pointer": {
      what: "pointer הוא מצביע למיקום של ערך בזיכרון.",
      need: "ב-JS רואים את הרעיון דרך references לאובייקטים ומערכים.",
    },
    "array reference": {
      what: "array reference הוא מצביע לאותו מערך בזיכרון.",
      need: "ב-React יוצרים מערך חדש כדי ש-state יתעדכן.",
    },
    "object reference": {
      what: "object reference הוא מצביע לאותו אובייקט בזיכרון.",
      need: "שינוי פנימי לא מחליף reference ולכן React עלול לא לזהות שינוי.",
    },
    "stack": {
      what: "stack הוא מבנה שבו האחרון שנכנס יוצא ראשון.",
      need: "call stack עוקב אחרי פונקציות שרצות כרגע.",
    },
    "heap": {
      what: "heap הוא אזור זיכרון לאובייקטים ומערכים בזמן ריצה.",
      need: "משתנים שומרים reference לערכים שנמצאים שם.",
    },
    "fetch": {
      what: "API לשליחת בקשת HTTP מהדפדפן או מ-JS.",
      need: "מחזיר Promise; לרוב קוראים response.json().",
    },
    "http": {
      what: "HTTP הוא הפרוטוקול שבו דפדפן ושרת מחליפים בקשות ותשובות.",
      need: "הוא משתמש ב-method, URL, headers, body ו-status.",
    },
    "url": {
      what: "URL היא כתובת של משאב ברשת.",
      need: "היא כוללת protocol, domain, path ולעיתים query.",
    },
    "protocol": {
      what: "protocol הוא כלל התקשורת בתחילת URL.",
      need: "למשל https אומר איך הדפדפן מדבר עם השרת.",
    },
    "path": {
      what: "path הוא החלק ב-URL שמצביע על משאב באתר.",
      need: "בשרת הוא עוזר לבחור route מתאים.",
    },
    "client": {
      what: "client הוא הצד שמבקש מידע או פעולה.",
      need: "בדפדפן client שולח request לשרת.",
    },
    "server": {
      what: "server הוא הצד שמקבל request ומחזיר response.",
      need: "הוא מריץ לוגיקה, ניגש ל-DB ומחזיר נתונים או HTML.",
    },
    "request": {
      what: "request היא בקשה שנשלחת מה-client ל-server.",
      need: "היא כוללת method, URL, headers ולעיתים body.",
    },
    "response": {
      what: "response היא תשובה שה-server מחזיר ל-client.",
      need: "היא כוללת status, headers ו-body.",
    },
    "headers": {
      what: "headers הם metadata של request או response.",
      need: "משתמשים בהם ל-content-type, auth, cache ועוד.",
    },
    "rest api": {
      what: "REST API הוא API שמנהל משאבים דרך HTTP routes.",
      need: "נפוץ להשתמש ב-GET, POST, PUT/PATCH ו-DELETE.",
    },
    "create": {
      what: "Create היא פעולת יצירת משאב חדש.",
      need: "ב-REST משתמשים לרוב ב-POST.",
    },
    "read": {
      what: "Read היא פעולת קריאת מידע קיים.",
      need: "ב-REST משתמשים לרוב ב-GET.",
    },
    "update": {
      what: "Update היא פעולת עדכון משאב קיים.",
      need: "ב-REST משתמשים לרוב ב-PUT או PATCH.",
    },
    "body": {
      what: "body הוא גוף הבקשה או התשובה.",
      need: "ב-POST/PATCH שולחים בו לרוב JSON.",
    },
    "express": {
      what: "Express הוא framework קל לבניית שרת HTTP ב-Node.js.",
      need: "משתמשים בו להגדרת routes, middleware ו-API.",
    },
    "app": {
      what: "app הוא מופע Express שמגדירים עליו routes ו-middleware.",
      need: "דרכו קוראים app.get, app.post ו-app.listen.",
    },
    "port": {
      what: "port הוא מספר שער שבו שרת מקשיב לבקשות.",
      need: "בדפדפן ניגשים למשל ל-localhost:3000.",
    },
    "app.get": {
      what: "app.get מגדיר route לבקשות GET.",
      need: "משתמשים בו לקריאת מידע בלי לשנות מצב.",
    },
    "app.post": {
      what: "app.post מגדיר route לבקשות POST.",
      need: "משתמשים בו ליצירה או שליחת מידע לשרת.",
    },
    "app.listen": {
      what: "app.listen מפעיל שרת Express על port.",
      need: "בלעדיו האפליקציה לא מתחילה להקשיב לבקשות.",
    },
    "app.use": {
      what: "app.use מחבר middleware לשרת Express.",
      need: "משתמשים בו ל-json parsing, static files, auth ו-logging.",
    },
    "static files": {
      what: "static files הם קבצים שהשרת מגיש כמו שהם.",
      need: "למשל CSS, תמונות, JS client וקבצי public.",
    },
    "query parameters": {
      what: "Query Parameters הם זוגות key=value אחרי ? ב-URL.",
      need: "משתמשים בהם לחיפוש, סינון, מיון ודפדוף.",
    },
    "status codes": {
      what: "Status Codes הם מספרים שמסבירים תוצאת HTTP response.",
      need: "למשל 200 הצלחה, 404 לא נמצא, 500 תקלה בשרת.",
    },
    "1xx-2xx-3xx": {
      what: "1xx/2xx/3xx הן משפחות status להמשך, הצלחה והפניה.",
      need: "2xx אומר שהבקשה הצליחה; 3xx אומר redirect.",
    },
    "4xx-5xx": {
      what: "4xx/5xx הן משפחות status לשגיאות client ו-server.",
      need: "4xx אומר בעיית בקשה; 5xx אומר תקלה בצד שרת.",
    },
    "scope": {
      what: "האזור בקוד שבו שם משתנה זמין.",
      need: "let/const הם block scope; var הוא function scope.",
    },
    "event": {
      what: "פעולה שקרתה בדפדפן, כמו click או submit.",
      need: "מאזינים לה עם addEventListener.",
    },
    "event object": {
      what: "האובייקט שמכיל מידע על האירוע שקרה.",
      need: "למשל target, preventDefault ו-key.",
    },
    "getelementbyid": {
      what: "getElementById מוצא אלמנט אחד לפי id.",
      need: "מחזיר Element או null אם אין התאמה.",
    },
    "getelementsbytagname": {
      what: "getElementsByTagName מוצא אלמנטים לפי שם תגית.",
      need: "מחזיר אוסף חי של אלמנטים מאותו tag.",
    },
    "getelementsbyclassname": {
      what: "getElementsByClassName מוצא אלמנטים לפי class.",
      need: "מחזיר אוסף חי של אלמנטים עם אותה מחלקה.",
    },
    "innerhtml": {
      what: "innerHTML קורא או מחליף HTML בתוך אלמנט.",
      need: "לא מכניסים אליו קלט משתמש בלי סינון בגלל XSS.",
    },
    "attribute": {
      what: "attribute הוא מאפיין HTML על תגית.",
      need: "למשל id, class, href, src או aria-label.",
    },
    "setattribute": {
      what: "setAttribute מגדיר attribute על אלמנט.",
      need: "משתמשים בו כשצריך לעדכן HTML attribute דרך JS.",
    },
    "style": {
      what: "style הוא אובייקט JS לשינוי CSS inline של אלמנט.",
      need: "עדיף classים לעיצוב קבוע, style לשינוי נקודתי.",
    },
    "createelement": {
      what: "createElement יוצר אלמנט HTML חדש בזיכרון.",
      need: "צריך append/appendChild כדי להכניס אותו למסמך.",
    },
    "appendchild": {
      what: "appendChild מוסיף אלמנט ילד לתוך אלמנט הורה.",
      need: "משתמשים בו כדי להכניס אלמנט שנוצר ל-DOM.",
    },
    "removechild": {
      what: "removeChild מסיר אלמנט ילד מתוך הורה.",
      need: "צריך להחזיק reference לילד ולהורה לפני ההסרה.",
    },
    "replacechild": {
      what: "replaceChild מחליף ילד קיים בילד חדש.",
      need: "משתמשים בו כשצריך לשנות node שלם ולא רק תוכן.",
    },
    "constructor": {
      what: "constructor היא פונקציה שרצה כשנוצר אובייקט מ-class.",
      need: "מאתחלים בה שדות התחלתיים על this.",
    },
    "instance": {
      what: "instance הוא אובייקט שנוצר מ-class.",
      need: "כל instance מחזיק state משלו לפי התבנית של המחלקה.",
    },
    "new": {
      what: "new יוצר instance חדש מ-constructor או class.",
      need: "הוא מקשר prototype ומריץ את constructor.",
    },
    "setitem": {
      what: "setItem שומר ערך ב-localStorage או sessionStorage.",
      need: "הוא שומר key/value כמחרוזות.",
    },
    "getitem": {
      what: "getItem קורא ערך מ-localStorage או sessionStorage.",
      need: "אם אין key כזה הוא מחזיר null.",
    },
    "queryselector": {
      what: "querySelector מחזיר את האלמנט הראשון שמתאים ל-CSS selector.",
      need: "מתאים לבחירה גמישה לפי class, id, tag או attribute.",
    },
    "queryselectorall": {
      what: "querySelectorAll מחזיר את כל האלמנטים שמתאימים ל-selector.",
      need: "מקבלים NodeList שאפשר לעבור עליו עם forEach.",
    },
    "hoisting": {
      what: "התנהגות שבה JS מכיר הצהרות לפני שורת ההרצה שלהן.",
      need: "var ופונקציות רגילות מושפעים מזה; let/const נמצאים ב-TDZ.",
    },
    "component": {
      what: "קומפוננטה היא יחידת UI עצמאית שמחזירה תצוגה.",
      need: "ב-React היא מקבלת props ומחזירה JSX.",
    },
    "jsx": {
      what: "JSX הוא תחביר שנראה כמו HTML בתוך JavaScript.",
      need: "React ממיר אותו לקריאות שמייצרות UI.",
    },
    "rendering": {
      what: "rendering הוא תהליך יצירת UI מה-state וה-props.",
      need: "React מרנדר מחדש כשמידע שמשפיע על המסך משתנה.",
    },
    "container vs presentational": {
      what: "Container vs Presentational מפריד לוגיקה מתצוגה.",
      need: "container מביא state/data; presentational מציג UI לפי props.",
    },
    "lifting state up": {
      what: "Lifting State Up הוא העברת state להורה משותף.",
      need: "עושים זאת כשכמה ילדים צריכים לקרוא או לשנות אותו מידע.",
    },
    "prop": {
      what: "prop הוא ערך שהורה מעביר לקומפוננטת ילד.",
      need: "הילד קורא אותו, אבל לא משנה אותו ישירות.",
    },
    "state": {
      what: "state הוא מידע פנימי ש-React עוקב אחריו.",
      need: "שינוי state גורם ל-UI להתעדכן.",
    },
    "setstate": {
      what: "setState היא פעולה שמבקשת מ-React לעדכן state.",
      need: "אחריה React מרנדר מחדש את החלקים שצריכים להתעדכן.",
    },
    "controlled input": {
      what: "controlled input הוא שדה שהערך שלו נשלט על ידי state.",
      need: "כל שינוי עובר דרך onChange ו-setState.",
    },
    "re-render": {
      what: "re-render הוא ציור מחדש של קומפוננטה לפי state/props חדשים.",
      need: "הוא קורה אחרי setState או שינוי props מהורה.",
    },
    "passing function as prop": {
      what: "passing function as prop הוא העברת callback לילד.",
      need: "כך ילד יכול לבקש מהורה לשנות state בלי להחזיק אותו בעצמו.",
    },
    "hook": {
      what: "hook הוא פונקציה שמחברת קומפוננטה ליכולת של React.",
      need: "useState, useEffect ו-useContext הם hooks נפוצים.",
    },
    "useeffect": {
      what: "useEffect מריץ קוד אחרי render לפי תלות.",
      need: "משתמשים בו ל-fetch, subscriptions, timers וסנכרון חיצוני.",
    },
    "cleanup": {
      what: "cleanup היא פונקציה שמנקה effect לפני ריצה חוזרת או unmount.",
      need: "מנקים timers, listeners ו-subscriptions כדי למנוע דליפות.",
    },
    "fetching data": {
      what: "fetching data הוא טעינת מידע ממקור חיצוני.",
      need: "ב-React עושים זאת לרוב ב-useEffect או server component.",
    },
    "usememo": {
      what: "useMemo שומר תוצאת חישוב בין renders.",
      need: "משתמשים בו רק לחישוב יקר שתלוי בערכים מוגדרים.",
    },
    "dependency array": {
      what: "dependency array הוא מערך שקובע מתי hook ירוץ שוב.",
      need: "ב-useEffect שמים בו את הערכים שה-effect תלוי בהם.",
    },
    "infinite loop": {
      what: "infinite loop היא לולאה או effect שרצים בלי סוף.",
      need: "ב-React זה קורה כש-effect משנה state שמפעיל אותו שוב.",
    },
    "file-system routing": {
      what: "file-system routing יוצר routes לפי מיקום קבצים ותיקיות.",
      need: "ב-Next.js תיקיות וקבצי page/route קובעים URL.",
    },
    "server component": {
      what: "server component היא קומפוננטת React שרצה בשרת.",
      need: "משתמשים בה להבאת נתונים בלי לשלוח JS מיותר לדפדפן.",
    },
    "seo": {
      what: "SEO הוא שיפור דף כדי שמנועי חיפוש יבינו אותו.",
      need: "משתמשים ב-title, description, semantic HTML וטעינה מהירה.",
    },
    "route": {
      what: "route הוא נתיב שמחליט איזה קוד מטפל בבקשה או במסך.",
      need: "בשרת הוא מחבר method ו-path; בפרונט הוא מחבר URL למסך.",
    },
    "page": {
      what: "page הוא קובץ שמציג מסך בנתיב מסוים.",
      need: "ב-Next.js קובץ page בתוך תיקייה יוצר את מסך ה-route.",
    },
    "layout": {
      what: "layout הוא שלד UI שעוטף כמה עמודים.",
      need: "ב-Next.js משתמשים בו לניווט, header ותבנית קבועה.",
    },
    "image optimization": {
      what: "image optimization היא התאמת תמונה לגודל, פורמט וטעינה.",
      need: "היא משפרת ביצועים בלי לשלוח תמונה כבדה מדי.",
    },
    "middleware": {
      what: "middleware היא פונקציה שרצה באמצע טיפול בבקשה.",
      need: "משתמשים בה לאימות, parsing, logging וטיפול שגיאות.",
    },
    "token": {
      what: "token הוא מחרוזת שמייצגת זהות או הרשאה.",
      need: "צריך לשמור עליו בזהירות ולהגדיר תוקף.",
    },
    "access token": {
      what: "access token הוא token קצר-חיים לגישה ל-API.",
      need: "שולחים אותו בבקשות כדי להוכיח הרשאה.",
    },
    "refresh token": {
      what: "refresh token מחדש access token אחרי שפג תוקפו.",
      need: "שומרים אותו בזהירות כי הוא יכול להאריך session.",
    },
    "bcrypt": {
      what: "bcrypt הוא hash איטי לסיסמאות עם salt.",
      need: "שומרים hash של סיסמה, לא את הסיסמה עצמה.",
    },
    "firebase auth": {
      what: "Firebase Auth הוא שירות התחברות מוכן של Firebase.",
      need: "הוא מטפל במשתמשים, providers ו-session בלי לבנות הכל לבד.",
    },
    "provider auth": {
      what: "provider auth הוא התחברות דרך ספק כמו Google או GitHub.",
      need: "הספק מאמת את המשתמש והאפליקציה מקבלת session/token.",
    },
    "supabase auth": {
      what: "Supabase Auth הוא שירות התחברות שמגיע עם Supabase.",
      need: "הוא מנהל משתמשים, sessions ו-providers ליד בסיס הנתונים.",
    },
    "kinde/appwrite": {
      what: "Kinde/Appwrite הם שירותים שמנהלים משתמשים והתחברות.",
      need: "משתמשים בהם כשלא רוצים לבנות auth מלא מאפס.",
    },
    "cookie": {
      what: "cookie היא מחרוזת קטנה שנשמרת בדפדפן ונשלחת לשרת.",
      need: "משמשת בעיקר session/auth וצריכה הגדרות אבטחה.",
    },
    "session": {
      what: "session הוא מצב התחברות שנשמר בין בקשות.",
      need: "בדרך כלל cookie מחזיקה מזהה והשרת מחזיק את נתוני הסשן.",
    },
    "sql": {
      what: "SQL היא שפה לקריאה ושינוי מידע בבסיס נתונים רלציוני.",
      need: "היא הבסיס ל-SELECT, INSERT, UPDATE, DELETE ו-JOIN.",
    },
    "database": {
      what: "database הוא מקום מסודר לשמירת מידע שניתן לשאול ולעדכן.",
      need: "משתמשים בו כשמידע צריך להישמר מעבר לריצה אחת של התוכנה.",
    },
    "row": {
      what: "row היא רשומה אחת בתוך טבלה.",
      need: "כל row מייצגת ישות אחת, למשל משתמש או מוצר.",
    },
    "column": {
      what: "column היא שדה קבוע בטבלה.",
      need: "היא מגדירה איזה סוג מידע כל row שומרת במקום הזה.",
    },
    "postgresql": {
      what: "PostgreSQL הוא בסיס נתונים רלציוני שמריץ SQL.",
      need: "הוא שומר טבלאות, קשרים, constraints ו-transactions.",
    },
    "prisma": {
      what: "Prisma הוא ORM שמייצר client טיפוסי לבסיס הנתונים.",
      need: "משתמשים בו ל-CRUD ו-migrations בלי לכתוב כל SQL ידנית.",
    },
    "drizzle": {
      what: "Drizzle הוא ORM קל שמגדיר SQL schema בקוד TypeScript.",
      need: "הוא מתאים כשרוצים שליטה קרובה ל-SQL עם טיפוסים.",
    },
    "mongoose": {
      what: "Mongoose הוא ODM שמחבר MongoDB לקוד JavaScript.",
      need: "הוא מוסיף schemas, models, validation ו-query helpers.",
    },
    "schema": {
      what: "Schema מגדיר את צורת הנתונים והשדות.",
      need: "ב-Mongoose הוא קובע טיפוסים, ולידציות וברירות מחדל.",
    },
    "model": {
      what: "Model הוא אובייקט עבודה מול collection בבסיס הנתונים.",
      need: "דרכו יוצרים, קוראים, מעדכנים ומוחקים מסמכים.",
    },
    "findoneandupdate": {
      what: "findOneAndUpdate מוצא מסמך אחד ומעדכן אותו.",
      need: "משתמשים בו לעדכון אטומי לפי תנאי חיפוש.",
    },
    "orm": {
      what: "ORM הוא כלי שממפה טבלאות וקשרים לקוד ואובייקטים.",
      need: "הוא מקצר CRUD אבל לא מחליף הבנת SQL.",
    },
    "repository pattern": {
      what: "repository pattern מרכז גישה לנתונים במקום אחד.",
      need: "הוא מפריד בין לוגיקת app לבין DB/ORM.",
    },
    "migration": {
      what: "migration היא שינוי מבוקר ב-schema של בסיס הנתונים.",
      need: "משתמשים בה כדי להעביר שינויי DB בין סביבות בצורה עקבית.",
    },
    "transaction": {
      what: "transaction היא קבוצת פעולות DB שמצליחות או מתבטלות יחד.",
      need: "היא מונעת מצב חלקי כשכמה עדכונים תלויים זה בזה.",
    },
    "$eq": {
      what: "$eq הוא תנאי MongoDB שבודק שוויון.",
      need: "משתמשים בו כששדה חייב להיות בדיוק ערך מסוים.",
    },
    "$gt": {
      what: "$gt הוא תנאי MongoDB שבודק גדול מ.",
      need: "משתמשים בו לסינון מספרים או תאריכים מעל ערך נתון.",
    },
    "$lt": {
      what: "$lt הוא תנאי MongoDB שבודק קטן מ.",
      need: "משתמשים בו לסינון מספרים או תאריכים מתחת לערך נתון.",
    },
    "ssr": {
      what: "SSR הוא יצירת HTML בשרת לפני שהדפדפן מקבל את העמוד.",
      need: "משתמשים בו לשיפור טעינה ראשונית, SEO וגישה לנתוני שרת.",
    },
    "api route": {
      what: "API route הוא נתיב שמחזיר JSON או status במקום דף UI.",
      need: "הוא מתאים ללוגיקת שרת קטנה בתוך פרויקט web.",
    },
    "di": {
      what: "DI היא הזרקת תלויות מבחוץ במקום יצירה בתוך הקוד.",
      need: "זה מקל על בדיקות והחלפת מימושים.",
    },
    "interceptor": {
      what: "interceptor הוא קוד שעוטף request או response.",
      need: "משתמשים בו ללוגים, caching, serialization ושינוי response.",
    },
    "docker": {
      what: "Docker מריץ אפליקציה בתוך container עם סביבה קבועה.",
      need: "משתמשים בו כדי לצמצם פערים בין מחשב פיתוח, CI ושרת.",
    },
    "eslint": {
      what: "ESLint הוא כלי שמזהה בעיות וחוקים בקוד JS/TS.",
      need: "הוא תופס שגיאות והרגלים מסוכנים לפני runtime.",
    },
    "container": {
      what: "container הוא תהליך שרץ עם קבצים ותלויות מבודדים.",
      need: "הוא מאפשר להריץ אותה אפליקציה באותה סביבה בכל מקום.",
    },
    "service": {
      what: "service הוא תהליך או רכיב שרץ ומספק יכולת קבועה.",
      need: "ב-Docker Compose service מגדיר app, db או worker.",
    },
    "production readiness": {
      what: "production readiness היא מוכנות אמיתית להרצה למשתמשים.",
      need: "בודקים build, env, logs, errors, security ו-rollback.",
    },
    "release checklist": {
      what: "release checklist היא רשימת בדיקות לפני פרסום גרסה.",
      need: "כוללת tests, build, env, migrations, rollback ו-smoke test.",
    },
    "vercel deploy": {
      what: "Vercel deploy הוא פרסום אפליקציית web לשרתים של Vercel.",
      need: "הוא מחבר Git ל-build, preview ו-production.",
    },
    "prettier": {
      what: "Prettier הוא כלי שמסדר formatting של קוד.",
      need: "הוא שומר על סגנון כתיבה אחיד בלי ויכוחים ידניים.",
    },
    "preview deployment": {
      what: "preview deployment הוא deploy זמני לבדיקה לפני production.",
      need: "משתמשים בו כדי לבדוק PR אמיתי בלי לפגוע באתר החי.",
    },
    "ci/cd": {
      what: "CI/CD היא אוטומציה לבדיקת, בניית ולעיתים פריסת קוד.",
      need: "היא תופסת שגיאות לפני merge או production.",
    },
    "rag": {
      what: "RAG היא שיטה שבה AI עונה בעזרת מסמכים שנשלפו בזמן השאלה.",
      need: "היא מצמצמת ניחושים כשצריך ידע חיצוני או עדכני.",
    },
    "vercel ai sdk": {
      what: "Vercel AI SDK היא ספרייה לבניית זרימות AI באפליקציות web.",
      need: "משתמשים בה ל-streaming, messages וחיבור מודלים ל-UI.",
    },
    "agent loop": {
      what: "agent loop הוא מחזור שבו AI בוחר פעולה, מריץ כלי ובודק תוצאה.",
      need: "משתמשים בו למשימות רב-שלביות עם החלטות בדרך.",
    },
    "retrieval ranking": {
      what: "retrieval ranking הוא דירוג המסמכים שנשלפו לפני תשובת AI.",
      need: "הוא מעלה למעלה את המקורות הכי רלוונטיים לשאלה.",
    },
    "guardrails": {
      what: "guardrails הם כללים שמגבילים ומכוונים פלט AI.",
      need: "משתמשים בהם כדי להפחית טעויות, דליפת מידע ופעולות מסוכנות.",
    },
    "langchain": {
      what: "LangChain היא ספרייה לחיבור מודלים, prompts, כלים ו-RAG.",
      need: "משתמשים בה כשזרימת AI מורכבת מכמה שלבים וכלים.",
    },
    "prompt messages": {
      what: "prompt messages הן ההודעות שנשלחות למודל.",
      need: "הן מגדירות system, user, assistant והקשר לתשובה.",
    },
    "fine-tuning boundary": {
      what: "fine-tuning boundary הוא הגבול שבו אימון מודל עדיף על prompt/RAG.",
      need: "ברוב האפליקציות מתחילים ב-prompt/RAG לפני fine-tuning.",
    },
    "cva": {
      what: "cva הוא helper לבניית variants של className.",
      need: "הוא מרכז גדלים, צבעים ומצבים של קומפוננטה במקום תנאים מפוזרים.",
    },
    "accessible primitive": {
      what: "accessible primitive הוא רכיב בסיסי עם נגישות מובנית.",
      need: "הוא חוסך בניית keyboard, focus ו-ARIA מאפס.",
    },
    "aschild slot": {
      what: "asChild slot מאפשר לרכיב להעביר התנהגות לילד שלו.",
      need: "כך שומרים semantic HTML בלי לעטוף בעוד כפתור או div.",
    },
    "aschild": {
      what: "asChild מאפשר לרכיב להשתמש באלמנט הילד כבסיס.",
      need: "זה מונע HTML לא תקין כמו button בתוך button.",
    },
    "design system testing": {
      what: "design system testing בודק שרכיבי UI עובדים ונגישים.",
      need: "בודקים variants, keyboard, focus, states ו-contrast.",
    },
    "theme tokens": {
      what: "theme tokens הם שמות לערכי עיצוב קבועים.",
      need: "משתמשים בהם לצבעים, מרווחים ופונטים עקביים.",
    },
    "component registry": {
      what: "component registry הוא קטלוג רכיבים שאפשר להתקין או לשתף.",
      need: "הוא עוזר לשמור על UI עקבי בין מסכים ופרויקטים.",
    },
    "error boundaries": {
      what: "Error Boundaries הן קומפוננטות שתופסות קריסות UI ב-React.",
      need: "הן מציגות fallback במקום להפיל את כל המסך.",
    },
    "error object": {
      what: "Error Object הוא אובייקט שגיאה עם message ולעיתים stack.",
      need: "משתמשים בו כדי להעביר מידע ברור ל-catch וללוגים.",
    },
    "performance optimization": {
      what: "Performance Optimization היא הקטנת זמן טעינה והרצה.",
      need: "בודקים bundle, renders, network, images ו-cache.",
    },
    "composition vs inheritance": {
      what: "Composition vs Inheritance היא בחירה בין הרכבה לירושה.",
      need: "ב-React לרוב מרכיבים קומפוננטות במקום לרשת מהן.",
    },
    "code splitting": {
      what: "Code Splitting הוא פיצול הקוד לקבצים שנטענים לפי צורך.",
      need: "הוא מקטין bundle ראשוני ומשפר טעינה.",
    },
    "state management": {
      what: "State Management הוא ניהול המידע שמשנה את ה-UI.",
      need: "בוחרים local state, context או store לפי טווח השימוש.",
    },
    "context api": {
      what: "Context API מעביר מידע לעץ קומפוננטות בלי prop drilling.",
      need: "מתאים למידע רחב כמו theme, user או locale.",
    },
    "testing strategies": {
      what: "Testing Strategies הן בחירת בדיקות לפי סיכון.",
      need: "משלבים unit, integration ו-E2E כדי לתפוס רגרסיות.",
    },
    "data flow": {
      what: "Data Flow הוא הכיוון שבו מידע עובר בין רכיבי האפליקציה.",
      need: "ב-React מידע יורד דרך props ואירועים עולים דרך callbacks.",
    },
    "responsive design": {
      what: "responsive design הוא UI שמתאים את עצמו לגודל המסך.",
      need: "משתמשים בו כדי שהאתר יעבוד טוב במובייל ובדסקטופ.",
    },
    "tailwind css": {
      what: "Tailwind CSS הוא framework של utility classes לעיצוב.",
      need: "כותבים classים קטנים ב-HTML/JSX במקום CSS גדול.",
    },
    "utility classes": {
      what: "utility classes הן classים קטנים שעושים פעולה עיצובית אחת.",
      need: "למשל flex, p-4, text-sm או bg-blue-600.",
    },
    "tailwind installation": {
      what: "Tailwind installation היא חיבור Tailwind לפרויקט.",
      need: "מגדירים package, config, import CSS וסריקת קבצי content.",
    },
    "navbar": {
      what: "navbar הוא אזור ניווט ראשי באתר.",
      need: "שמים בו קישורים מרכזיים, מצב נוכחי ותמיכה במקלדת.",
    },
    "add/delete movie": {
      what: "add/delete movie הוא CRUD בסיסי לרשימת סרטים.",
      need: "הוא מתרגל state, forms, validation ועדכון רשימה.",
    },
    "flex": {
      what: "flex הוא כלי CSS לסידור פריטים בשורה או עמודה.",
      need: "הוא מתאים ל-navbar, כפתורים, cards ושורות פשוטות.",
    },
    "grid": {
      what: "grid הוא כלי CSS לסידור אזור דו-ממדי.",
      need: "הוא מתאים לפריסות עם שורות ועמודות יחד.",
    },
    "rating": {
      what: "rating הוא ציון או דירוג שמייצג איכות או העדפה.",
      need: "ב-UI שומרים אותו כ-number ומציגים אותו בכוכבים או תווית.",
    },
    "search": {
      what: "search הוא סינון או איתור פריטים לפי טקסט.",
      need: "משלבים input, state ו-filter כדי להציג תוצאות מתאימות.",
    },
    "validation": {
      what: "validation היא בדיקה שערך עומד בכללים לפני שימוש.",
      need: "בודקים טפסים בצד לקוח וגם בשרת.",
    },
    "accessibility basics": {
      what: "accessibility basics הם כללים שמאפשרים שימוש גם בלי עכבר או ראייה מלאה.",
      need: "בודקים semantic HTML, labels, focus, keyboard ו-contrast.",
    },
    "commit": {
      what: "commit הוא צילום רשמי של מצב הקוד ב-Git.",
      need: "משתמשים בו כדי לשמור שינוי קטן וברור בהיסטוריה.",
    },
    "branch": {
      what: "branch הוא קו עבודה נפרד ב-Git.",
      need: "משתמשים בו כדי לפתח שינוי בלי לפגוע ב-main.",
    },
    "next.js": {
      what: "Next.js הוא framework שמוסיף ל-React routing, שרת ו-build.",
      need: "משתמשים בו לבניית אפליקציות Full Stack עם pages, API ו-deploy.",
    },
    "nest.js": {
      what: "Nest.js הוא framework צד-שרת מעל Node/Express.",
      need: "הוא מארגן backend בעזרת modules, controllers, providers ו-DI.",
    },
    "decorator": {
      what: "decorator הוא סימון שמוסיף metadata ל-class או method.",
      need: "ב-Nest הוא מחבר routes, injection, guards ועוד.",
    },
    "git": {
      what: "Git היא מערכת שמירת גרסאות לקוד.",
      need: "היא מאפשרת לחזור אחורה, לעבוד בענפים ולמזג שינויים.",
    },
    "repository": {
      what: "repository הוא פרויקט ש-Git מנהל עם היסטוריית שינויים.",
      need: "הוא כולל את הקבצים ואת תיקיית .git.",
    },
    "working tree": {
      what: "working tree הוא מצב הקבצים בתיקייה עכשיו.",
      need: "git status מראה מה השתנה בו לפני staging או commit.",
    },
    "staging area": {
      what: "staging area הוא אזור ההכנה ל-commit הבא.",
      need: "git add מכניס לשם רק את השינויים שרוצים לשמור.",
    },
    "join": {
      what: "JOIN מחבר שורות מטבלאות לפי קשר ביניהן.",
      need: "משתמשים בו כשמידע מפוצל לטבלאות כמו users ו-orders.",
    },
    "primary key": {
      what: "primary key הוא מזהה ייחודי לכל שורה בטבלה.",
      need: "הוא מאפשר למצוא שורה אחת ולקשר אליה מטבלאות אחרות.",
    },
    "foreign key": {
      what: "foreign key הוא שדה שמצביע ל-primary key בטבלה אחרת.",
      need: "הוא יוצר קשר תקין בין טבלאות ומונע נתונים יתומים.",
    },
    "relation": {
      what: "relation היא קשר בין טבלאות או בין מודלים של נתונים.",
      need: "קשרים מאפשרים JOIN ושליפת מידע משותף בלי שכפול.",
    },
    "table": {
      what: "table היא אוסף שורות ועמודות במסד נתונים רלציוני.",
      need: "כל טבלה מייצגת סוג מידע אחד, למשל users או posts.",
    },
    "authentication": {
      what: "authentication היא בדיקה מי המשתמש.",
      need: "לרוב עושים אותה עם סיסמה, provider, cookie או token.",
    },
    "authorization": {
      what: "authorization היא בדיקה מה מותר למשתמש לעשות.",
      need: "אחרי login בודקים הרשאות לפני פעולה רגישה.",
    },
    "jwt": {
      what: "JWT הוא token חתום שמכיל מידע על המשתמש.",
      need: "השרת מאמת את החתימה ולא סומך על תוכן שלא נבדק.",
    },
    "oauth": {
      what: "OAuth הוא פרוטוקול התחברות דרך ספק חיצוני.",
      need: "משתמשים בו ל-Google/GitHub login בלי לשמור סיסמה אצלך.",
    },
    "password hashing": {
      what: "password hashing הוא שמירת טביעת סיסמה במקום הסיסמה עצמה.",
      need: "גם אם DB דולף, לא מקבלים את הסיסמה המקורית.",
    },
    "csrf": {
      what: "CSRF היא תקיפה שמנצלת cookie כדי לשלוח פעולה בשם המשתמש.",
      need: "מונעים אותה עם SameSite, CSRF token ובדיקת origin.",
    },
    "xss boundary": {
      what: "XSS boundary הוא גבול שמונע מהרצת קוד משתמש בתוך הדף.",
      need: "לא מכניסים HTML לא מסונן ל-innerHTML.",
    },
    "secure cookie": {
      what: "secure cookie היא cookie שנשלחת רק ב-HTTPS.",
      need: "משלבים Secure, HttpOnly ו-SameSite לאבטחת session.",
    },
    "cors": {
      what: "CORS הוא מנגנון שמחליט אילו אתרים רשאים לקרוא API בדפדפן.",
      need: "מגדירים origin מורשה ולא פותחים '*' עם credentials.",
    },
    "middleware guard": {
      what: "middleware guard הוא בדיקת הרשאה לפני שה-route רץ.",
      need: "אם המשתמש לא מורשה, מחזירים 401 או 403.",
    },
    "app router": {
      what: "App Router הוא מנגנון ה-routing החדש של Next.js בתיקיית app.",
      need: "הוא משתמש ב-page, layout, server components ו-route handlers.",
    },
    "client component": {
      what: "client component היא קומפוננטת Next שרצה בדפדפן.",
      need: "צריך 'use client' כשמשתמשים ב-state, effects או אירועי UI.",
    },
    "server action": {
      what: "server action היא פונקציה שרצה בשרת ונקראת מה-UI.",
      need: "מתאימה לשליחת טפסים ושינוי DB בלי API route ידני.",
    },
    "route handler": {
      what: "route handler הוא endpoint API בתוך Next.js.",
      need: "כותבים בו GET/POST כדי להחזיר JSON או לטפל בבקשות.",
    },
    "ssg": {
      what: "SSG הוא יצירת HTML בזמן build.",
      need: "מתאים לעמודים שלא משתנים בכל בקשה.",
    },
    "isr": {
      what: "ISR הוא עדכון עמוד סטטי אחרי זמן מוגדר.",
      need: "מקבלים מהירות של static עם רענון תוכן ברקע.",
    },
    "metadata api": {
      what: "metadata API מגדיר title, description ותגיות SEO ב-Next.",
      need: "משתמשים בו כדי לשלוט במה שמנועי חיפוש ורשתות רואים.",
    },
    "shadcn/ui": {
      what: "shadcn/UI הוא אוסף קומפוננטות שמעתיקים לקוד שלך.",
      need: "הוא בנוי על Radix ו-Tailwind וניתן לעריכה מלאה.",
    },
    "radix primitives": {
      what: "Radix primitives הם רכיבי UI נגישים בלי עיצוב קשיח.",
      need: "הם נותנים התנהגות נכונה ל-dialog, dropdown, tabs ועוד.",
    },
    "design tokens": {
      what: "design tokens הם שמות קבועים לערכי עיצוב.",
      need: "למשל צבע, spacing, radius ו-font במקום מספרים מפוזרים.",
    },
    "component variants": {
      what: "component variants הן גרסאות מוגדרות של אותו רכיב.",
      need: "למשל button מסוג primary, danger או ghost.",
    },
    "form field composition": {
      what: "form field composition היא הרכבת label, input, error ו-help יחד.",
      need: "כך כל שדה מקבל מבנה נגיש ועקבי.",
    },
    "cn helper": {
      what: "cn helper מחבר class names בצורה נקייה.",
      need: "משתמשים בו לשילוב תנאים, Tailwind ו-override בטוח.",
    },
    "dockerfile": {
      what: "Dockerfile הוא מתכון לבניית image של אפליקציה.",
      need: "מגדירים בו base image, התקנות, build ופקודת הרצה.",
    },
    "docker compose": {
      what: "Docker Compose מריץ כמה containers יחד.",
      need: "מתאים לאפליקציה עם server, database ושירותים נוספים.",
    },
    "environment variables": {
      what: "environment variables הם ערכי config מחוץ לקוד.",
      need: "שומרים בהם URLs, מצבי סביבה וסודות בצד שרת.",
    },
    "image": {
      what: "Docker image היא תבנית קפואה שממנה מריצים container.",
      need: "בונים אותה פעם ומריצים אותה בסביבות שונות.",
    },
    "volume": {
      what: "volume הוא אחסון חיצוני שנשאר גם אחרי מחיקת container.",
      need: "משתמשים בו ל-DB files, uploads וקבצי פיתוח.",
    },
    "health check": {
      what: "health check היא בדיקה שהשירות חי ועונה נכון.",
      need: "CI או deploy משתמשים בה כדי לזהות שרת תקול.",
    },
    "ci": {
      what: "CI הוא הרצת בדיקות ובנייה אוטומטית על כל שינוי.",
      need: "הוא מונע מיזוג קוד ששובר build או tests.",
    },
    "cd": {
      what: "cd משנה תיקייה בטרמינל; ב-DevOps CD הוא פרסום אוטומטי.",
      need: "בודקים לפי ההקשר: פקודת ניווט או Continuous Deployment.",
    },
    "build command": {
      what: "build command היא פקודה שמייצרת גרסת production.",
      need: "ב-Vite זה לרוב npm run build.",
    },
    "smoke test": {
      what: "smoke test היא בדיקה קצרה שהזרימה המרכזית לא שבורה.",
      need: "מריצים אותה אחרי build או deploy לפני בדיקות עמוקות.",
    },
    "controller": {
      what: "controller ב-Nest מקבל HTTP requests ומחזיר responses.",
      need: "הוא מפנה ל-service במקום לשים בו לוגיקה כבדה.",
    },
    "dependency injection": {
      what: "dependency injection מזריקה תלות במקום ליצור אותה ידנית.",
      need: "זה מקל בדיקות, החלפת שירותים והפרדת אחריות.",
    },
    "dto": {
      what: "DTO הוא אובייקט שמתאר נתונים שנכנסים או יוצאים מ-API.",
      need: "ב-Nest משתמשים בו ל-validation ולטיפוס ברור של בקשות.",
    },
    "pipe": {
      what: "pipe ב-Nest משנה או בודק ערך לפני שהוא מגיע ל-controller.",
      need: "ValidationPipe בודק body/query/params לפי DTO.",
    },
    "validation pipe": {
      what: "validation pipe בודק שהקלט מתאים ל-DTO.",
      need: "הוא מחזיר שגיאה מוקדמת במקום להכניס נתונים שבורים למערכת.",
    },
    "guard": {
      what: "guard ב-Nest מחליט אם request רשאי להמשיך.",
      need: "משתמשים בו ל-auth, roles והרשאות.",
    },
    "exception filter": {
      what: "exception filter מעצב טיפול בשגיאות ב-Nest.",
      need: "הוא הופך חריגות לתשובת HTTP עקבית.",
    },
    "testing module": {
      what: "testing module הוא סביבת בדיקה לשירותי Nest.",
      need: "דרכו מזריקים dependencies אמיתיות או mocks.",
    },
    "openai api": {
      what: "OpenAI API הוא שירות לשליחת prompts וקבלת תשובות ממודלים.",
      need: "קוראים לו מהשרת, לא עם API key חשוף בדפדפן.",
    },
    "model selection": {
      what: "model selection היא בחירת מודל לפי עלות, מהירות ואיכות.",
      need: "משימה קשה צריכה מודל חזק; משימה פשוטה יכולה מודל זול.",
    },
    "streaming response": {
      what: "streaming response מחזיר תשובה בחלקים בזמן שהיא נוצרת.",
      need: "זה משפר תחושת מהירות בצ'אט וב-AI tutor.",
    },
    "token budget": {
      what: "token budget הוא מגבלת הטקסט שנשלח ומתקבל ממודל.",
      need: "צריך לבחור קונטקסט קצר ומדויק כדי לא לבזבז מקום.",
    },
    "tool calling": {
      what: "tool calling מאפשר למודל לבקש פעולה מכלי חיצוני.",
      need: "משתמשים בו לקריאת DB, חיפוש, חישוב או פעולה באפליקציה.",
    },
    "structured output": {
      what: "structured output הוא מענה במבנה קבוע כמו JSON.",
      need: "כך הקוד יכול לקרוא את התשובה בלי לנחש טקסט חופשי.",
    },
    "embeddings": {
      what: "embeddings הם מספרים שמייצגים משמעות של טקסט.",
      need: "משתמשים בהם לחיפוש דומה ב-RAG.",
    },
    "vector store": {
      what: "vector store הוא מאגר שמחפש embeddings דומים.",
      need: "הוא מחזיר קטעים רלוונטיים לפני ששואלים מודל.",
    },
    "chunking": {
      what: "chunking הוא חלוקת מסמך לקטעי טקסט קטנים.",
      need: "RAG עובד טוב יותר כשהקטעים קצרים וממוקדים.",
    },
    "hallucination check": {
      what: "hallucination check בודק שהתשובה נשענת על מקור אמיתי.",
      need: "בלי זה מודל עלול להמציא מידע שנשמע נכון.",
    },
    "evaluation": {
      what: "evaluation היא בדיקה שיטתית של איכות תשובות או מערכת.",
      need: "מודדים דיוק, כיסוי, שגיאות ועלות לפני release.",
    },
    "event loop": {
      what: "המנגנון שמריץ משימות אסינכרוניות אחרי שהקוד הסינכרוני נגמר.",
      need: "Promises רצים לפני setTimeout בגלל microtasks.",
    },
    "Node.js": {
      what: "סביבת ריצה ל-JavaScript מחוץ לדפדפן, מבוססת על מנוע V8.",
      need: "מריצים קוד JS בשרת/CLI; יש גישה ל-fs, http, ו-process.",
    },
    "username": {
      what: "שדה זיהוי המשתמש בטופס/בקשה (שם משתמש).",
      need: "צריך validation: אורך מינימלי, ייחודיות, וסניטיזציה לפני שמירה.",
    },
    "email": {
      what: "שדה דואר אלקטרוני, משמש לזיהוי וקשר עם המשתמש.",
      need: "validation מובנית עם type='email' ו-regex/בדיקת domain.",
    },
    ".ts": {
      what: "סיומת קובץ של TypeScript — קוד עם type annotations.",
      need: ".tsx ל-React+JSX; tsc מקמפל ל-.js לפני הרצה.",
    },
    "Type Safety": {
      what: "ב-TypeScript: בדיקת טיפוסים בזמן compile. שגיאות נתפסות לפני runtime.",
      need: "תוסיף annotations ל-functions ו-state כדי שהcompiler יזהה ניסיונות העברת string ל-number.",
    },
    "{}": {
      what: "סוגריים מסולסלים ב-JSX מאפשרים להזריק JS expression: <h1>{name}</h1>.",
      need: "כל ביטוי JS מתאים: משתנה, חישוב, condition && <Item />, או arr.map(...).",
    },
    "Income": {
      what: "interface ל-הכנסה ב-Budget Manager: { amount: number, source: string, date: Date }.",
      need: "בדרך כלל בא עם type discriminator: 'income' | 'expense' לסיווג בעיבוד.",
    },
    "Expense": {
      what: "interface להוצאה ב-Budget Manager: { amount: number, category: Category, date: Date }.",
      need: "category לרוב string union או enum כדי שאפשר יהיה לסכם לפי קטגוריה.",
    },
    "Budget Summary": {
      what: "סיכום התקציב: סך הכנסות, סך הוצאות, ומאזן (income - expense) על תקופה נתונה.",
      need: "מחושב ב-filter+reduce על מערך Transactions, מוצג כ-dashboard עם 3 כרטיסים.",
    },
    "BaseUser": {
      what: "interface משותף לכל סוגי משתמש (Guest/Registered) — מחזיק שדות בסיס: id, name, type.",
      need: "extension via interface extends או intersection types ל-RegisteredUser/GuestUser.",
    },
    "GuestUser": {
      what: "משתמש לא רשום — extends BaseUser עם type: 'guest'. גישה מוגבלת לתכונות ציבוריות.",
      need: "discriminated union עם RegisteredUser; type narrowing לפני גישה ל-fields ייחודיים.",
    },
    "RegisteredUser": {
      what: "משתמש רשום — extends BaseUser עם type: 'registered', email, profile, history.",
      need: "discriminated union; אפשר type guards (isRegistered) לcheck ב-runtime.",
    },
    "AI Pair Programming": {
      what: "עבודה עם AI כשותף שני בכתיבת קוד — driver/navigator במצב ש-AI מציע, human מחליט.",
      need: "Cursor/Copilot/Claude Code; שמירה על review human, אין trust עיוור באוטוקומפליישנים.",
    },
    "AI Limitations": {
      what: "מגבלות LLM: hallucinations, context window finite, training cutoff, no real-time, statistical not reasoning.",
      need: "אזהרה קבועה — verify עם docs, run code, RAG/citation ל-knowledge base אמיתי.",
    },
    "Category Breakdown": {
      what: "פירוט הוצאות לפי קטגוריה (food/rent/fun/...) עם סכום ואחוז מהסך הכל.",
      need: "groupBy על category + reduce sum. נפוץ ל-pie chart / bar chart.",
    },
    "Transaction": {
      what: "רישום כספי בודד: סכום, סוג (income/expense), קטגוריה, תאריך.",
      need: "structure בסיסי ב-Budget Manager — type discriminator לזיהוי income vs expense.",
    },
    "Amount": {
      what: "ערך מספרי של תנועה (positive number). תמיד נשמר כ-number, לא string.",
      need: "validation: > 0, parsing מ-input string לפני שמירה.",
    },
    "Strongly Typed": {
      what: "שפה שדורשת התאמת טיפוסים ולא עושה implicit conversion ב-runtime.",
      need: "ב-TypeScript: 'foo' + 1 → compile error. ב-JS: '\"foo\" + 1' → 'foo1'.",
    },
    "Cluster": {
      what: "ב-MongoDB Atlas: קבוצת replicas/shards שמספקים HA + scale.",
      need: "Free tier (M0) מתאים לפיתוח. Production צריך תכנון shard keys.",
    },
    "Connection String": {
      what: "URL שמכיל פרטי התחברות ל-DB: mongodb+srv://user:pass@host/dbname.",
      need: "תמיד שמור ב-env var (.env), אף פעם לא הצמד לקוד.",
    },
    "Props": {
      what: "ב-React: data שמועבר מ-parent ל-child component.",
      need: "props read-only בילד. שינוי דורש callback מההורה (lifting state up).",
    },
    "Value": {
      what: "ב-MongoDB document: הערך של field, נגיש דרך dot notation: doc.fieldName.",
      need: "ב-Mongoose שווה גם doc.get('fieldName'). doc.toObject() להמרה ל-plain JS.",
    },
    "Book": {
      what: "data type שמייצג ספר — id, title, author, וקטגוריה.",
      need: "interface או type עם שדות. לא class — אין בו behavior.",
    },
    "npm install": {
      what: "פקודה שמתקינה את התלויות מ-package.json לתיקיית node_modules.",
      need: "מומלץ לרוץ אחרי clone או אחרי הוספת dependency חדש; משתמש ב-package-lock.json לעקביות.",
    },
    "npm run dev": {
      what: "סקריפט בdev mode — מריץ את ה-dev server של Vite/Next/Webpack.",
      need: "מספק hot reload, source maps, ולא מאמת production build; עוצרים עם Ctrl+C.",
    },
    "User": {
      what: "type של משתמש — בד״כ discriminated union: Guest | Registered.",
      need: "kind כ-tag לזיהוי הסוג, ואז narrowing ב-if לפני גישה לשדות ייחודיים.",
    },
    "interface vs type": {
      what: "interface = declaration merging + extends; type alias = unions/primitives.",
      need: "interface ל-public API שמתרחב; type ל-utility ו-discriminated unions.",
    },
    "boolean": {
      what: "primitive טיפוס ל-true/false — שלוש דרכים לקבל: literal, השוואה, !!val.",
      need: "ב-TS להעדיף boolean אמיתי, לא 0/1 או null/undefined כ-truthy proxy.",
    },
    "Data Types": {
      what: "סוגי ערכים בJS: string, number, boolean, null, undefined, object, symbol, bigint.",
      need: "typeof יכול לסווג; null נחשב 'object' (באג היסטורי).",
    },
    "camelCase": {
      what: "כתיבת שם בלי רווחים — מילה ראשונה קטנה, מילים שאחריה גדולות. dog וpetName.",
      need: "קונבנציה ל-JS variables ו-functions; PascalCase לClasses.",
    },
    "forEach": {
      what: "מתודת מערך שמריצה callback לכל איבר, ללא ערך החזרה.",
      need: "לא תומך ב-break/continue. אם צריך לעצור, switch ל-for-of.",
    },
    "localStorage": {
      what: "אחסון key-value מתמשך בדפדפן (~5MB).",
      need: "string בלבד; השתמש JSON.stringify/parse לאובייקטים.",
    },
    "sessionStorage": {
      what: "כמו localStorage אבל נמחק בסוף הסשן (סגירת הטאב).",
      need: "מתאים לdata זמני שלא צריך להחזיק בין ביקורים.",
    },
    "Protocol": {
      what: "החלק הראשון ב-URL: http://, https://, ftp://.",
      need: "https = מוצפן. ב-production תמיד https.",
    },
    "Domain": {
      what: "השם של השרת ב-URL: example.com.",
      need: "DNS ממפה ל-IP. subdomain.example.com הוא דומיין משני.",
    },
    "Path": {
      what: "הנתיב אחרי הדומיין: /api/users/42.",
      need: "Router תופס לפי path; query string (?x=1) הוא בנפרד.",
    },
    "Query Parameters": {
      what: "פרמטרים אחרי ?: /search?q=js&page=2.",
      need: "ב-Express: req.query.q. ב-React Router: useSearchParams.",
    },
    "form": {
      what: "אלמנט HTML לשליחת קלט: <form action='/api' method='POST'>.",
      need: "כל input חייב name. submit שולח לserver אם לא event.preventDefault().",
    },
    "event.preventDefault": {
      what: "עוצר את ברירת המחדל של אירוע — submit לא ינווט, anchor לא יעקוב.",
      need: "חיוני בtoplogy של SPA forms ו-link clicks.",
    },
    "GET": {
      what: "HTTP method לקריאה — לא משנה state.",
      need: "צריך להיות idempotent וללא body. params דרך query.",
    },
    "POST": {
      what: "HTTP method ליצירה. שולח body.",
      need: "לא idempotent. החזרה שיגרתית 201 + Location header.",
    },
    "Create": {
      what: "C ב-CRUD: יצירת רשומה חדשה.",
      need: "HTTP POST + INSERT ב-SQL / insertOne ב-Mongo.",
    },
    "Read": {
      what: "R ב-CRUD: קריאת רשומה/רשומות.",
      need: "HTTP GET + SELECT ב-SQL / find ב-Mongo.",
    },
    "Update": {
      what: "U ב-CRUD: עדכון רשומה קיימת.",
      need: "HTTP PUT (החלפה) או PATCH (חלקי) + UPDATE ב-SQL.",
    },
    "Delete": {
      what: "D ב-CRUD: מחיקת רשומה.",
      need: "HTTP DELETE + DELETE ב-SQL / deleteOne ב-Mongo.",
    },
    "CRUD": {
      what: "Create, Read, Update, Delete — ארבע פעולות ה-DB הבסיסיות.",
      need: "מתאים לרוב לישויות data; ניתן למיפוי ישיר ל-HTTP methods.",
    },
    "RFC": {
      what: "Request For Comments — מסמכי תקן של האינטרנט (HTTP, JSON, OAuth).",
      need: "מקור אמת לפרוטוקולים. דוגמה: RFC 7231 על HTTP.",
    },
    "Status Codes": {
      what: "מספרי תוצאה ב-HTTP: 2xx success, 3xx redirect, 4xx client error, 5xx server error.",
      need: "200 OK, 201 Created, 400 Bad Request, 401 Auth, 404 Not Found, 500 Server Error.",
    },
    "Client": {
      what: "התוכנה שמבקשת מהשרת — דפדפן, אפליקציה, curl.",
      need: "בdev — ה-React app בדפדפן הוא ה-Client.",
    },
    "Server": {
      what: "התוכנה שמאזינה לבקשות ומחזירה תשובות.",
      need: "ב-Node: Express app שעולה על port (e.g. 3000).",
    },
    "Request": {
      what: "הבקשה מ-Client ל-Server: method + URL + headers + body.",
      need: "ב-Express: req.method, req.url, req.headers, req.body.",
    },
    "Response": {
      what: "התשובה מ-Server ל-Client: status + headers + body.",
      need: "ב-Express: res.status(200).json(data).",
    },
    "URL": {
      what: "כתובת אחידה למשאב ברשת: protocol://domain:port/path?query#hash.",
      need: "URLSearchParams לקריאת query בJS.",
    },
    "HTTP": {
      what: "פרוטוקול תקשורת לאתרים — request/response stateless.",
      need: "https מוצפן. HTTP/2 ו-HTTP/3 מהירים יותר.",
    },
    "REST API": {
      what: "API שמשתמש ב-HTTP methods ובURLs לתיאור resources.",
      need: "GET /users, POST /users, GET /users/42, PUT /users/42, DELETE /users/42.",
    },
    "Express": {
      what: "framework רזה ל-Node ל-HTTP servers.",
      need: "app.get/post/put/delete + middleware + req/res + app.listen.",
    },
    "body-parser": {
      what: "middleware שפרסר JSON/form body של request.",
      need: "express.json() מובנה היום. ב-Express 4+ אין צורך ב-body-parser external.",
    },
    "JSON": {
      what: "JavaScript Object Notation — פורמט data חליפי ל-XML.",
      need: "JSON.stringify ו-JSON.parse. אובייקטים, arrays, primitives — לא functions/Date.",
    },
    "Route": {
      what: "מיפוי path → component ב-React Router.",
      need: "<Route path='/about' element={<About/>} />",
    },
    "Router": {
      what: "ה-context של React Router — עוטף את כל ה-app.",
      need: "<BrowserRouter> ב-main.tsx.",
    },
    "Routes": {
      what: "מעטפת ל-Route — מציגה רק אחד שמתאים.",
      need: "<Routes><Route path='/' element={<Home/>} /></Routes>",
    },
    "BrowserRouter": {
      what: "Router שמשתמש ב-History API: /about (URL נקי).",
      need: "דורש server שמחזיר index.html לכל path.",
    },
    "useNavigate": {
      what: "hook להניווט פרוגרמטי: navigate('/about').",
      need: "navigate(-1) חוזר אחורה.",
    },
    "useParams": {
      what: "hook לקבלת dynamic params: useParams() returns { id }.",
      need: "Route path='/user/:id' → useParams = { id }.",
    },
    "Link": {
      what: "תחליף ל-<a> — לא טוען מחדש את הדף.",
      need: "<Link to='/about'>About</Link>",
    },
    "to": {
      what: "prop של Link — מציין יעד.",
      need: "<Link to='/contact'>Contact</Link>",
    },
    "element": {
      what: "prop של Route — JSX של הקומפוננטה.",
      need: "<Route element={<About/>} />",
    },
    "insertOne": {
      what: "Collection.insertOne(doc) — מוסיף document בודד.",
      need: "מחזיר { acknowledged, insertedId }.",
    },
    "insertMany": {
      what: "Collection.insertMany([docs]) — מוסיף מספר.",
      need: "אם אחד נכשל, הכל מתבטל (אלא אם ordered: false).",
    },
    "findOneAndUpdate": {
      what: "מוצא + מעדכן באטומיות. מחזיר את הdocument.",
      need: "{ new: true } ל-return של הגרסה החדשה.",
    },
    "updateMany": {
      what: "מעדכן את כל ה-documents שעונים על filter.",
      need: "filter ריק = updateMany לכל הcollection — שמור.",
    },
    "deleteOne": {
      what: "מוחק document בודד שעונה על filter.",
      need: "filter ריק = מוחק ראשון. ב-production רק עם filter ספציפי.",
    },
    "deleteMany": {
      what: "מוחק את כל ה-documents שעונים על filter.",
      need: "filter={} = drop של ה-collection. CAUTION.",
    },
    "$ne": {
      what: "Mongo operator: not equal. { age: { $ne: 18 } }.",
      need: "מתאים לסינון 'הכל חוץ מ'.",
    },
    "$gte": {
      what: "Mongo operator: greater than or equal. { age: { $gte: 18 } }.",
      need: "$gt ל-greater מחמיר; $lt/$lte לקטן.",
    },
    "$lte": {
      what: "Mongo operator: less than or equal.",
      need: "מתאים לטווחים: { age: { $gte: 18, $lte: 65 } }.",
    },
    "Database": {
      what: "מערכת לאחסון data מובנה.",
      need: "SQL (Postgres) ו-NoSQL (Mongo) — שני הסגנונות הנפוצים.",
    },
    "NoSQL": {
      what: "DB ללא schema קבוע — JSON-like documents.",
      need: "Mongo, DynamoDB, Firestore. גמיש לשינויים תכופים.",
    },
    "MongoDB": {
      what: "NoSQL document DB — JSON-like documents בcollections.",
      need: "Atlas (cloud) או localhost. דרייבר Node: 'mongodb' או Mongoose.",
    },
    "MongoDB Atlas": {
      what: "MongoDB cloud-managed (M0 free tier זמין).",
      need: "connection string דרך .env, אף פעם לא ב-git.",
    },
    "Collection": {
      what: "אנלוגי לטבלה ב-SQL — קבוצת documents.",
      need: "ב-Mongo collection נוצרת אוטומטית בעת insertOne ראשון.",
    },
    "Document": {
      what: "רשומה ב-Mongo — JSON object עם _id ייחודי.",
      need: "_id נוצר אוטומטית כ-ObjectId אם לא סופק.",
    },
    "Mongoose": {
      what: "ODM ל-Mongo: Schema → Model → Document.",
      need: "מוסיף type checks, validation, hooks, populate.",
    },
    "Model": {
      what: "ב-Mongoose: class שיוצא מ-Schema. User.create / User.find.",
      need: "instances הם documents שאפשר .save().",
    },
    "Schema": {
      what: "הגדרת shape של document ב-Mongoose.",
      need: "{ name: { type: String, required: true } }. type, default, validate, ref.",
    },
    "findOne": {
      what: "Mongo find שמחזיר document ראשון או null.",
      need: "חיפוש לפי שדה ייחודי: User.findOne({ email }).",
    },
    "JWT": {
      what: "JSON Web Token — token חתום עם payload + signature.",
      need: "stateless auth. אחסון ב-httpOnly cookie. expiresIn קצר.",
    },
    "OAuth": {
      what: "פרוטוקול ל-third-party auth (login with Google).",
      need: "OAuth 2.0 flow: redirect → code → token. PKCE ל-SPAs.",
    },
    "CSRF": {
      what: "Cross-Site Request Forgery — הסחה של דפדפן לשלוח request בשמך.",
      need: "הגנה: CSRF token, SameSite cookie, ו-double-submit pattern.",
    },
    "XSS boundary": {
      what: "הגבול בין user input ל-DOM — חייב escape.",
      need: "DOMPurify לסניטיזציה; React escape אוטומטית ב-{value}.",
    },
    "CORS": {
      what: "Cross-Origin Resource Sharing — מנגנון לשתף resources בין domains.",
      need: "ב-Express: cors() middleware. allowed origins מוגדרים בשרת.",
    },
    "shadcn/UI": {
      what: "ספריית primitives copy-paste (לא npm).",
      need: "npx shadcn-ui add button. הקוד עובר אליך — תוכל לעדכן.",
    },
    "asChild slot": {
      what: "Radix prop שמעביר behavior ל-child element במקום wrapper.",
      need: "<Trigger asChild><Link>Open</Link></Trigger> — Link מקבל behavior של Trigger.",
    },
    "Radix primitives": {
      what: "primitives נגישים unstyled (Dialog, Dropdown, Tabs).",
      need: "מטפלים ב-focus management, ARIA, keyboard. אתה מוסיף סגנון.",
    },
    "Tailwind CSS": {
      what: "framework של utility classes — px-4, bg-red-500.",
      need: "tailwind.config ל-theme tokens. PurgeCSS מוציא רק utilities שבשימוש.",
    },
    "Tailwind installation": {
      what: "Tailwind 4: npm i tailwindcss + @tailwindcss/vite.",
      need: "הוסף 'tailwindcss' ל-vite plugins. ייבא style.css ב-main.",
    },
    "padding": {
      what: "מרווח פנימי בין content ל-border.",
      need: "p-4 = padding 1rem בכל הצדדים. px-2 horizontal, py-3 vertical.",
    },
    "bg color": {
      what: "צבע רקע. bg-blue-500, bg-red-100.",
      need: "Tailwind מספק palette של 50-950 לכל צבע.",
    },
    "rounded": {
      what: "border-radius. rounded-md, rounded-lg, rounded-full.",
      need: "rounded-full לעיגולים מלאים.",
    },
    "Dockerfile": {
      what: "קובץ הוראות לבניית Docker image.",
      need: "FROM, WORKDIR, COPY, RUN, CMD. multi-stage builds לproduction.",
    },
    "Docker": {
      what: "container platform — תכניות מבודדות עם FS+deps שלהן.",
      need: "אותה תוצאה בכל host. docker run, docker build, docker compose.",
    },
    "Docker Compose": {
      what: "הרצת multi-container apps עם yaml.",
      need: "services: web, db, redis. docker-compose up.",
    },
    "CI": {
      what: "Continuous Integration — בנייה+טסטים אוטומטיים בכל push.",
      need: "GitHub Actions, GitLab CI, CircleCI.",
    },
    "CD": {
      what: "Continuous Delivery/Deployment — push → staging/prod אוטומטי.",
      need: "Delivery: ready to deploy. Deployment: actually auto-deploys.",
    },
    "Vercel deploy": {
      what: "Vercel CLI: vercel deploy [--prod].",
      need: "preview ל-PR, prod ל-main. zero-config ל-Next.js.",
    },
    "Next.js": {
      what: "React framework עם SSR/SSG/ISR + file-system routing.",
      need: "App Router ב-13+. Server Components ברירת מחדל.",
    },
    "App Router": {
      what: "Next.js 13+ router בתוך app/. layouts, server components.",
      need: "page.tsx = route. layout.tsx עוטף. loading.tsx ל-Suspense.",
    },
    "dynamic route": {
      what: "param בנתיב: app/user/[id]/page.tsx.",
      need: "page מקבל { params: { id } }. generateStaticParams ל-SSG.",
    },
    "API route": {
      what: "endpoint בתוך Next: app/api/users/route.ts.",
      need: "export async function GET/POST. Response.json().",
    },
    "SSR": {
      what: "Server-Side Rendering — HTML נבנה לכל request.",
      need: "default ב-Server Components. SEO + first paint מהיר.",
    },
    "SSG": {
      what: "Static Site Generation — HTML נבנה ב-build.",
      need: "מהיר מאוד; לא מתאים לdata משתנה. generateStaticParams.",
    },
    "ISR": {
      what: "Incremental Static Regeneration — SSG עם revalidate ב-background.",
      need: "fetch(url, { next: { revalidate: 60 } }).",
    },
    "metadata API": {
      what: "Next.js: export const metadata = { title, description }.",
      need: "מייצר meta tags ב-<head>. תומך ב-dynamic via generateMetadata.",
    },
    "SEO": {
      what: "Search Engine Optimization — להופיע גבוה בגוגל.",
      need: "title, description, structured data, sitemap, fast paint.",
    },
    "Nest.js": {
      what: "framework backend מבוסס TS עם DI ו-decorators.",
      need: "@Module, @Controller, @Injectable. נראה כמו Angular בbackend.",
    },
    "module": {
      what: "ב-Nest: יחידת קוד עם controllers + providers.",
      need: "@Module({ controllers: [...], providers: [...] })",
    },
    "provider": {
      what: "ב-Nest: class שניתן ל-inject (services, repositories).",
      need: "@Injectable() + הוספה ל-providers של module.",
    },
    "DTO": {
      what: "Data Transfer Object — shape של request body + validation.",
      need: "class-validator decorators (@IsEmail, @MinLength) + ValidationPipe.",
    },
    "SQL": {
      what: "Structured Query Language — שפת שאילתות לDB רלציונים.",
      need: "SELECT, INSERT, UPDATE, DELETE + JOIN, WHERE, GROUP BY.",
    },
    "PostgreSQL": {
      what: "DB רלציוני open-source חזק (JSON, full-text, GIS).",
      need: "האלטרנטיבה המודרנית ל-MySQL בfull-stack apps.",
    },
    "JOIN": {
      what: "שילוב טבלאות לפי key משותף.",
      need: "INNER, LEFT, RIGHT, FULL. ON clause לתנאי.",
    },
    "ORM": {
      what: "Object-Relational Mapper — ממפה objects ל-rows ב-SQL.",
      need: "Prisma, Drizzle, TypeORM, Sequelize. type-safety + migrations.",
    },
    "Prisma": {
      what: "ORM TS-first עם schema.prisma + auto-generated client.",
      need: "prisma migrate, prisma.user.findUnique({ where: { email } }).",
    },
    "Drizzle": {
      what: "ORM TS-native עם light runtime, SQL-near syntax.",
      need: "schema as code, db.select().from(users).where(eq(users.id, 1)).",
    },
    "OpenAI API": {
      what: "REST API לגישה ל-GPT, Whisper, DALL-E.",
      need: "Bearer token, /chat/completions. SDK רשמי מומלץ.",
    },
    "Vercel AI SDK": {
      what: "SDK ל-streaming + tool-calling ב-React/Next.",
      need: "useChat hook, streamText, structured output, multi-provider.",
    },
    "RAG": {
      what: "Retrieval-Augmented Generation — fetch context לפני LLM call.",
      need: "embeddings + vector DB (Pinecone, Chroma) + top-K retrieval.",
    },
    "LangChain": {
      what: "framework לchains + memory + tools + agents מעל LLMs.",
      need: "LCEL syntax (prompt.pipe(model).pipe(parser)). React לAgents.",
    },
    "AI Code Review": {
      what: "AI שעובר על code change ומציע שיפורים.",
      need: "GitHub Copilot Reviews, Cursor, Sourcery. לא תחליף ל-human review.",
    },
    "Hallucinations": {
      what: "LLM מייצר תוכן שנשמע נכון אבל לא קיים/שגוי.",
      need: "verify מול docs, fact-check, RAG מצמצם.",
    },
    "Context Window": {
      what: "כמות tokens שהמודל רואה בבת אחת.",
      need: "Claude 4.7: 200K-1M. עובר → forgets ראשי השיחה.",
    },
    "Cursor": {
      what: "IDE מבוסס VS Code עם AI עמוק (Composer, Cmd+K).",
      need: "מצוין ל-multi-file edits. Cmd+L ל-chat, Cmd+I ל-Composer.",
    },
    "Windsurf": {
      what: "IDE AI מבוסס VS Code עם Cascade agent.",
      need: "Cascade עם memory לקבצים, מתאים לrefactors.",
    },
    "Prompt Engineering": {
      what: "אומנות לכתוב prompts יעילים.",
      need: "specific > general, examples (few-shot), role + format constraints.",
    },
    "AI": {
      what: "Artificial Intelligence — system שמחקה אינטליגנציה אנושית.",
      need: "LLMs (GPT, Claude) ל-text. Diffusion ל-images.",
    },
    "Claude Code": {
      what: "CLI של Anthropic לסוכן AI שמתפעל קוד.",
      need: "claude command, slash commands, sub-agents, tool use.",
    },
    "ChatGPT": {
      what: "ממשק שיחה של OpenAI מעל GPT.",
      need: "מהיר לbrainstorm, אבל verify code/facts לפני השימוש.",
    },
    "Copilot": {
      what: "GitHub AI שמשלים קוד ב-IDE.",
      need: "מבוסס context של הקובץ הפתוח. ברוב המקרים מציע סבירות גבוהה.",
    },
    "Vite": {
      what: "build tool מהיר עם dev server + HMR + ESM.",
      need: "npm create vite@latest. החליף את webpack לרוב פרויקטים חדשים.",
    },
    "npm create vite@latest": {
      what: "פקודה ליצירת פרויקט Vite חדש.",
      need: "בוחר template (react/vue/svelte) + JS/TS.",
    },
    "index.html": {
      what: "ה-HTML root של Vite/SPA.",
      need: "div#root + script src='/src/main.tsx'. Vite מטפל בtransform.",
    },
    "main.jsx": {
      what: "entry point של React app.",
      need: "ReactDOM.createRoot(root).render(<App/>)",
    },
    "App.jsx": {
      what: "Root component של React app.",
      need: "מכיל Router/Provider/App layout. בד\"כ סטייט בסיסי וRoutes.",
    },
    "App.css": {
      what: "Stylesheet של App component.",
      need: "ב-Vite מיובא עם import './App.css'.",
    },
    "inline style": {
      what: "סטייל JSX ישיר: style={{ color: 'red', padding: 8 }}.",
      need: "מהיר לדוגמאות; לא מומלץ לתחזוקה. עדיף Tailwind/className.",
    },
    "CSS import": {
      what: "import './style.css' ב-JS.",
      need: "Vite/webpack בonderstand מטפלים. מסדרים specificity.",
    },
    "parent component": {
      what: "קומפוננטה שמכילה אחרת ומעבירה props.",
      need: "<Parent><Child prop={x}/></Parent>",
    },
    "child component": {
      what: "קומפוננטה שמקבלת props מההורה.",
      need: "function Child({ prop }) { return <div>{prop}</div> }",
    },
    "MainScreen": {
      what: "Container component שמרכז state ומעביר ל-children.",
      need: "ב-React Router לרוב ב-path '/'.",
    },
    "AddPost": {
      what: "form component להוספת פוסט.",
      need: "state פנימי לinput + onSubmit שקורא ל-parent callback.",
    },
    "PostList": {
      what: "presentational component שמרנדר רשימה.",
      need: "props.posts.map(p => <Post key={p.id}/>)",
    },
    "props": {
      what: "data שעובר מ-parent ל-child component.",
      need: "read-only בילד. שינוי דורש callback מההורה.",
    },
    "Component": {
      what: "פונקציה (או class) שמחזירה JSX.",
      need: "PascalCase שם. <Greeting name='שיר' />",
    },
    "JSX": {
      what: "syntax extension ל-JS שמראה כמו HTML.",
      need: "transpiles ל-React.createElement. תומך ב-{expression}.",
    },
    "React": {
      what: "ספריית UI declarative — components + state + virtual DOM.",
      need: "ReactDOM.createRoot + render. hooks ב-function components.",
    },
    "React + TypeScript": {
      what: "React עם type-safety ל-props/state/refs.",
      need: "interface Props + function Comp({ prop }: Props).",
    },
    "React Native": {
      what: "React לmobile native (iOS/Android).",
      need: "components: View, Text, Image. Expo לdev מהיר.",
    },
    "useState": {
      what: "hook ל-state פנימי בקומפוננטה.",
      need: "const [count, setCount] = useState(0). re-render בכל setX.",
    },
    "setState": {
      what: "function שמעדכן state.",
      need: "functional update setX(prev => prev+1) בטוח ב-stale closures.",
    },
    "useEffect": {
      what: "hook ל-side effects (fetch, subscriptions, DOM).",
      need: "[] = mount only, [a] = כש-a משתנה. return cleanup.",
    },
    "useRef": {
      what: "hook ל-mutable container ללא re-render.",
      need: "useRef(null). ref.current = value. ל-DOM: <input ref={r}/>.",
    },
    "useMemo": {
      what: "hook ל-memoize ערך מחושב.",
      need: "useMemo(() => expensiveCalc(x), [x]). measure לפני.",
    },
    "useContext": {
      what: "hook לקריאת ערך מ-Context Provider.",
      need: "useContext(MyCtx) — value מ-Provider קרוב או default.",
    },
    "createContext": {
      what: "function ליצירת Context object.",
      need: "const Ctx = createContext(default). { Provider, Consumer }.",
    },
    "Hook": {
      what: "function שמחילה ב-use* (useState, useEffect).",
      need: "רק ב-top-level של function component, בסדר עקבי.",
    },
    "Provider": {
      what: "<Ctx.Provider value={...}> — מספק ערך לעץ.",
      need: "children קוראים דרך useContext(Ctx).",
    },
    "Context API": {
      what: "מנגנון React לpassing data דרך עץ ללא props.",
      need: "createContext + Provider + useContext. לא רחב מדי (re-renders).",
    },
    "Prop Drilling": {
      what: "העברת prop דרך רכיבים שלא משתמשים בו.",
      need: "Context או state library פותרים.",
    },
    "state update": {
      what: "setX(newValue) — async, מתזמן re-render.",
      need: "אל תקרא ל-x מיד אחרי setX — תקבל את הערך הישן.",
    },
    "expensive calculation": {
      what: "חישוב כבד שירוץ בכל render אם לא memoized.",
      need: "useMemo כשתלוי ב-state. measure בProfiler ראשון.",
    },
    "ref": {
      what: "object עם .current — לא מטריגר re-render.",
      need: "ל-DOM access או mutable values שלא צריכים render.",
    },
    "ref.current": {
      what: "השדה של ref שמחזיק את הערך.",
      need: "useRef מחזיר { current }. שינוי לא triggers re-render.",
    },
    "DOM element": {
      what: "אלמנט בDOM, נגיש דרך ref.",
      need: "useRef + ref={r} → r.current = HTMLElement.",
    },
    "focus": {
      what: "השמת cursor על element (input).",
      need: "useEffect + ref.current?.focus() אחרי mount.",
    },
    "side effect": {
      what: "פעולה מחוץ ל-component (fetch, DOM, timer).",
      need: "ב-useEffect, לא ב-render body.",
    },
    "immutable": {
      what: "לא משנים את האובייקט — יוצרים חדש.",
      need: "ב-React: setItems([...items, newItem]), לא items.push.",
    },
    "mutable": {
      what: "ניתן לשינוי במקום.",
      need: "JS arrays ו-objects mutable by default. State צריך immutable.",
    },
    "onChange": {
      what: "event handler לשינוי input.",
      need: "<input onChange={(e) => setX(e.target.value)} />",
    },
    "addPost": {
      what: "callback להוספת פוסט מ-parent.",
      need: "מועבר ל-AddPost כ-prop, נקרא בonSubmit.",
    },
    "deletePost": {
      what: "callback למחיקת פוסט.",
      need: "מועבר ל-PostList → לכל Post — ע\"י id.",
    },
    "TypeScript": {
      what: "JavaScript + static types בזמן compile.",
      need: "תופס bugs לפני runtime. tsc compiles ל-JS.",
    },
    "tsc": {
      what: "TypeScript compiler CLI.",
      need: "tsc app.ts → app.js. tsc -p tsconfig.json לproject.",
    },
    "Compiler": {
      what: "תוכנה שמתרגמת קוד source ל-output (JS, machine code).",
      need: "TS: tsc. Babel: לJS modern → ES5.",
    },
    "tsconfig.json": {
      what: "config של TS compiler.",
      need: "strict: true מומלץ. target, module, lib, paths.",
    },
    "string": {
      what: "primitive type ל-טקסט.",
      need: "'hello', \"hi\", `template ${x}`. immutable.",
    },
    "number": {
      what: "primitive type למספרים (float64).",
      need: "כולל NaN, Infinity. Number.isInteger() לבדיקה.",
    },
    "tuple": {
      what: "TS array עם ordered fixed types: [string, number].",
      need: "useState החזרה הוא tuple: [value, setter].",
    },
    "enum": {
      what: "TS construct לקבוצת ערכים בעלי שם.",
      need: "enum Color { Red, Blue }. string enum מומלץ: Red = 'red'.",
    },
    "void": {
      what: "return type לפונקציה שלא מחזירה ערך.",
      need: "function log(): void { console.log() }",
    },
    "never": {
      what: "type שלעולם לא מקבל ערך — לפונקציה שזורקת/לופ אינסופי.",
      need: "exhaustiveness checks ב-switch על union.",
    },
    "readonly": {
      what: "modifier למנוע שינוי שדה.",
      need: "readonly id: string. ב-array: ReadonlyArray<T>.",
    },
    "optional field": {
      what: "field שלא חובה: name?: string.",
      need: "אז name יכול להיות string או undefined.",
    },
    "type alias": {
      what: "type X = ... — שם חלופי לtype.",
      need: "תומך ב-union, primitives, mapped, conditional.",
    },
    "type": {
      what: "type alias — keyword ב-TS.",
      need: "type ID = string | number.",
    },
    "interface": {
      what: "TS construct ל-shape של object.",
      need: "interface User { id: string }. תומך ב-extends ו-merging.",
    },
    "extends interface": {
      what: "interface יורש מ-interface אחר.",
      need: "interface Admin extends User { role: 'admin' }",
    },
    "Union Type": {
      what: "X | Y — ערך מאחד הטיפוסים.",
      need: "narrow לפני שימוש דרך typeof, in, או discriminator.",
    },
    "Type Narrowing": {
      what: "צמצום union לטיפוס ספציפי דרך בדיקות runtime.",
      need: "if (typeof x === 'string') { /* x: string */ }",
    },
    "any": {
      what: "TS escape — כל פעולה מותרת, אין safety.",
      need: "להימנע. unknown בטוח יותר — דורש narrowing.",
    },
    "type annotation": {
      what: "ציון סוג מפורש: let x: number = 5.",
      need: "TS מסיק (infer) ברוב המקרים — חובה רק כשנדרש.",
    },
    "Typing Props": {
      what: "interface ל-React component props.",
      need: "function Btn({ label }: { label: string }) {}",
    },
    "Typing State": {
      what: "generic ל-useState: useState<string|null>(null).",
      need: "נחוץ כש-initial value הוא subset של ה-state.",
    },
    "Function Prop Type": {
      what: "type לcallback prop: onSave: (id: string) => void.",
      need: "void = no return; אפשר לcheain async.",
    },
    "models folder": {
      what: "src/models/ — מקום קונבנציונלי לטיפוסים משותפים.",
      need: "Todo.ts, User.ts. interfaces וtypes פנימיים.",
    },
    "Todo.ts": {
      what: "interface Todo { id, title, completed }.",
      need: "מקור אמת ל-shape של todo בכל הapp.",
    },
    "Genre": {
      what: "type לקטגוריות ספרים: 'fiction' | 'science'.",
      need: "literal union סגור — IDE autocomplete + type-safe.",
    },
    ".js": {
      what: "סיומת JavaScript.",
      need: "תמיד executable בדפדפן ו-Node. תוצר של tsc/build.",
    },
    "array type": {
      what: "T[] או Array<T> — מערך של T.",
      need: "number[] = מערך של מספרים. ReadonlyArray<T> ל-immutable.",
    },
    "DOM": {
      what: "Document Object Model — עץ HTML שניתן לתפעל ב-JS.",
      need: "document.querySelector, getElementById, innerHTML.",
    },
    "querySelector": {
      what: "document.querySelector(css) — ראשון תואם.",
      need: "מקבל CSS selector. .class, #id, tag, [attr].",
    },
    "querySelectorAll": {
      what: "document.querySelectorAll(css) — NodeList של תואמים.",
      need: "Array.from() ל-array אמיתי.",
    },
    "getElementById": {
      what: "document.getElementById('id') — element או null.",
      need: "מהיר יותר מ-querySelector. unique לפי id.",
    },
    "innerHTML": {
      what: "string של HTML בתוך element. גם read וגם write.",
      need: "מסוכן עם user input — XSS! עדיף textContent או DOMPurify.",
    },
    "setAttribute": {
      what: "element.setAttribute('name', value).",
      need: "ל-attributes שאין להם property: data-*, aria-*.",
    },
    "createElement": {
      what: "document.createElement('div') — אלמנט חדש.",
      need: "צריך appendChild ל-DOM כדי שיופיע.",
    },
    "appendChild": {
      what: "parent.appendChild(child) — מוסיף ב-end.",
      need: "מתאים ל-list rendering. modern: parent.append(child) (תומך multiple).",
    },
    "removeChild": {
      what: "parent.removeChild(child).",
      need: "modern: child.remove() (אין צורך ב-parent ref).",
    },
    "replaceChild": {
      what: "parent.replaceChild(newChild, oldChild).",
      need: "modern: oldChild.replaceWith(newChild).",
    },
    "getElementsByTagName": {
      what: "document.getElementsByTagName('div') — HTMLCollection.",
      need: "live collection — מתעדכנת אוטומטית.",
    },
    "getElementsByClassName": {
      what: "document.getElementsByClassName('btn').",
      need: "live HTMLCollection. לרוב querySelectorAll עדיף.",
    },
    "Document Object Model": {
      what: "המודל של HTML בזיכרון של הדפדפן — ניתן לתפעל ב-JS.",
      need: "document API. כל element הוא node בעץ.",
    },
    "semantic HTML": {
      what: "תגים שאומרים מה הם: <header>, <nav>, <main>, <article>.",
      need: "בטוח ל-a11y ו-SEO. מחליף <div> כשהמשמעות ברורה.",
    },
    "HTML document": {
      what: "קובץ .html שהדפדפן קורא.",
      need: "<!DOCTYPE html><html><head/><body/></html>",
    },
    "HTML form": {
      what: "<form> עם inputs לשליחה ל-server.",
      need: "method='POST' action='/api'. כל input חייב name.",
    },
    "label": {
      what: "<label for='id'> — קושר ל-input.",
      need: "click על label = focus על input. חיוני ל-a11y.",
    },
    "CSS selector": {
      what: "ביטוי שבוחר elements לעיצוב.",
      need: ".class, #id, tag, [attr], parent > child.",
    },
    "client side": {
      what: "Code שרץ בדפדפן.",
      need: "JS, React, DOM. ה-server לא רואה ב-runtime.",
    },
    "Client Side": {
      what: "Code שרץ בדפדפן.",
      need: "JS, React, DOM. ה-server לא רואה ב-runtime.",
    },
    "Closure": {
      what: "function שזוכרת variables מ-scope שבו נוצרה.",
      need: "use case: data privacy, partial application, factory functions.",
    },
    "Scope": {
      what: "טווח נראות של variables.",
      need: "function scope (var), block scope (let/const), module scope, global.",
    },
    "lexical scope": {
      what: "scope נקבע לפי איפה הקוד נכתב, לא איפה רץ.",
      need: "JS משתמש ב-lexical (closure-based).",
    },
    "scope chain": {
      what: "סדר חיפוש של variables — local → outer → global.",
      need: "מה שמאפשר closures לעבוד.",
    },
    "closure variables": {
      what: "variables שה-inner function זוכרת מ-outer.",
      need: "כל קריאה ל-outer יוצרת closure חדש.",
    },
    "closure in setTimeout": {
      what: "setTimeout(() => use(x), N) זוכר את x.",
      need: "באג קלאסי: for(var i=0;i<3;i++) setTimeout(() => log(i)) → 3,3,3.",
    },
    "stale closure": {
      what: "closure תופס value מ-render קודם — ערך ישן.",
      need: "פתרון: useRef או functional setState.",
    },
    "closure in event handlers": {
      what: "handler זוכר state בזמן הbind, לא תמיד עדכני.",
      need: "ב-React: deps array של useEffect. או useRef.",
    },
    "closure in useEffect": {
      what: "effect זוכר variables מ-render הספציפי.",
      need: "כל הvariables שconsumes חייבים להיות ב-deps.",
    },
    "Promise": {
      what: "object שמייצג async operation עם resolve/reject.",
      need: "then, catch, finally. await מחכה ל-resolve.",
    },
    "Asynchronous": {
      what: "פעולה שלא חוסמת — חוזרת מיד עם Promise.",
      need: "fetch, setTimeout, fs.readFile.",
    },
    "Synchronous": {
      what: "פעולה שחוסמת עד שמסיימת.",
      need: "JSON.parse, Date.now, JSON.stringify.",
    },
    "async/await": {
      what: "syntax sugar מעל Promises.",
      need: "async function f() { const x = await p; }. נראה sync.",
    },
    "catch (Promise)": {
      what: "promise.catch(err => ...) או try/catch עם await.",
      need: "כל async דורש error handling — אחרת unhandled rejection.",
    },
    "Error Object": {
      what: "instance של Error/TypeError/RangeError.",
      need: "throw new Error('msg'). ב-catch: err.message, err.stack.",
    },
    "Error": {
      what: "constructor base ל-exceptions.",
      need: "throw new Error(msg). subclass לcustom errors.",
    },
    "Exception": {
      what: "אירוע שמתרחש כשמשהו לא צפוי.",
      need: "throw + try/catch. לא לצוד את כולם — רק הצפויים.",
    },
    "try/catch": {
      what: "block לתפיסת exceptions.",
      need: "finally תמיד רץ. async דורש try/catch סביב await.",
    },
    "Task Manager": {
      what: "אפליקציה לניהול משימות (CRUD).",
      need: "פרויקט בסיסי לתרגול state, events, localStorage.",
    },
    "variables": {
      what: "שמות שמחזיקים ערכים.",
      need: "let/const. let משתנה, const קבוע (binding).",
    },
    "events": {
      what: "פעולות משתמש שאפשר להאזין להן: click, submit, keypress.",
      need: "addEventListener('event', handler).",
    },
    "objects": {
      what: "אוסף key-value pairs.",
      need: "{ name: 'Tal', age: 30 }. ניגשים: obj.name או obj['name'].",
    },
    "conditions": {
      what: "if/else, switch, ternary.",
      need: "מבצע קוד שונה לפי תנאי. boolean expressions.",
    },
    "arrays": {
      what: "רשימות של ערכים מסודרים.",
      need: "[1,2,3]. arr[0], arr.length, arr.push, arr.map.",
    },
    "functions": {
      what: "בלוקים של קוד עם שם — לקריאה חוזרת.",
      need: "function f(a,b) { return a+b }. arrow: (a,b) => a+b.",
    },
    "Mongoose validation": {
      what: "schema-level rules: required, min, max, enum, validate.",
      need: "כל .save() מריץ validation. catch ב-error.errors.",
    },
    "Supabase Auth": {
      what: "auth as a service: email/oauth/magic links.",
      need: "supabase.auth.signInWithPassword. session ב-cookie.",
    },
    "Firebase Auth": {
      what: "Google's auth — קל אבל vendor lock-in.",
      need: "signInWithEmailAndPassword. תומך ב-many providers.",
    },
    "Kinde/Appwrite": {
      what: "BaaS אלטרנטיבי ל-Firebase/Supabase.",
      need: "Kinde מתמקד ב-auth+billing. Appwrite open-source.",
    },
    "password": {
      what: "סיסמה — חייב לבצע hash לפני אחסון.",
      need: "bcrypt עם salt rounds 10. אף פעם לא plain text!",
    },
    "server-side storage": {
      what: "אחסון על השרת (DB) ולא על הclient.",
      need: "sensitive data: passwords (hashed), tokens, PII.",
    },
    "Git": {
      what: "VCS — version control להיסטוריה של קוד.",
      need: "branches, commits, merges, push/pull. github.com למה לעלות.",
    },
    "pull request": {
      what: "PR — בקשה למיזוג branch. כולל review.",
      need: "תיאור + tests + screenshots. CI מריץ לפני merge.",
    },
    "npm scripts": {
      what: "package.json scripts: build, test, dev.",
      need: "npm run X. לרוב dev עם Vite, build ל-production.",
    },
    "ESLint": {
      what: "linter ל-JS/TS — תופס bugs פוטנציאליים.",
      need: ".eslintrc + npm run lint. אינטגרציה ב-IDE.",
    },
    "Prettier": {
      what: "code formatter — opinionated.",
      need: ".prettierrc + npm run format. מתאים לconfig + .editorconfig.",
    },
    "package.json": {
      what: "מטא של פרויקט: deps, scripts, version.",
      need: "npm install קורא dependencies, devDependencies.",
    },
    "npm": {
      what: "Node Package Manager — מנהל packages של JS.",
      need: "npm install pkg, npm run script. lockfile: package-lock.json.",
    },
    "npm init": {
      what: "יוצר package.json חדש.",
      need: "npm init -y לdefault. הראשון בכל פרויקט חדש.",
    },
    "npm start": {
      what: "npm run start — מריץ סקריפט start.",
      need: "לרוב production-like. dev עם npm run dev.",
    },
    "dependencies": {
      what: "packages שהקוד צריך ב-runtime.",
      need: "package.json.dependencies. devDependencies לbuild only.",
    },
    "require": {
      what: "CommonJS import — Node legacy.",
      need: "const x = require('fs'). modern: import x from 'fs'.",
    },
    "module.exports": {
      what: "CommonJS export — Node legacy.",
      need: "module.exports = { x, y }. modern: export.",
    },
    "V8": {
      what: "JS engine של Chrome ו-Node — מבצע JS.",
      need: "אופטימיזציות: JIT, hidden classes. Node מריץ V8 ב-server.",
    },
    "CLI": {
      what: "Command Line Interface — תוכנה שמופעלת ב-shell.",
      need: "כלים: git, npm, tsc, eslint.",
    },
    "Command Line Interface": {
      what: "ממשק טקסטואלי לפעולות (terminal/cmd).",
      need: "מהיר יותר מ-GUI לdevelopers. scriptable.",
    },
    "node file.js": {
      what: "מריץ קובץ JS עם Node runtime.",
      need: "Node קורא, מפרסר, מריץ. console.log ל-stdout.",
    },
    "File System": {
      what: "API של Node לקרוא/לכתוב קבצים.",
      need: "fs module. ב-modern: fs/promises ל-async.",
    },
    "fs": {
      what: "Node module ל-filesystem.",
      need: "import fs from 'fs'. fs.readFile, fs.writeFile.",
    },
    "fs.readFile": {
      what: "קוראת תוכן קובץ.",
      need: "fs.readFile(path, 'utf8', (err, data) => {}) — או promise.",
    },
    "fs.writeFile": {
      what: "כותבת תוכן לקובץ (overwrite).",
      need: "fs.writeFile(path, content, cb). Promise: await.",
    },
    "fs.appendFile": {
      what: "מוסיפה תוכן לסוף קובץ.",
      need: "logger pattern. ייוצר אם לא קיים.",
    },
    "fs.rename": {
      what: "מחליף שם / מזיז קובץ.",
      need: "fs.rename(old, new, cb). atomic ב-same FS.",
    },
    "fs.unlink": {
      what: "מוחק קובץ.",
      need: "אין undelete! ב-prod עדיף move-to-trash.",
    },
    "fs.open": {
      what: "פתיחת file descriptor — low-level.",
      need: "fs.openSync ב-rare cases. רוב הזמן readFile/writeFile.",
    },
    "dir": {
      what: "תיקייה (directory).",
      need: "fs.readdir, fs.mkdir, fs.rmdir.",
    },
    "mkdir": {
      what: "יצירת תיקייה: fs.mkdir.",
      need: "{ recursive: true } ליצור nested paths.",
    },
    "type nul": {
      what: "Windows command ליצירת קובץ ריק.",
      need: "Linux/Mac: touch file.txt. PowerShell: New-Item.",
    },
    "Pointer": {
      what: "reference — שני משתנים מצביעים על אותו object.",
      need: "JS objects מועברים by-reference. primitives by-value.",
    },
    "By Reference": {
      what: "מעבר של reference (pointer) — שינוי משפיע על שני המקומות.",
      need: "JS: objects, arrays, functions. שינוי בfunction → משנה outside.",
    },
    "By Value": {
      what: "מעבר עותק של ה-value.",
      need: "JS: primitives (number, string, boolean). שינוי לא משפיע.",
    },
    "Composition vs Inheritance": {
      what: "Composition: build by combining; Inheritance: extend.",
      need: "React מעדיף composition (children, render props).",
    },
    "Container vs Presentational": {
      what: "Container: state+logic. Presentational: pure UI.",
      need: "פרק: <UserListContainer/> wraps <UserList items={...}/>.",
    },
    "Lifting State Up": {
      what: "העברת state ל-ancestor משותף.",
      need: "כשכמה siblings צריכים אותו data.",
    },
    "State Management": {
      what: "ניהול state חוצה-קומפוננטות.",
      need: "useState (local), Context (medium), Redux/Zustand (global).",
    },
    "Data Flow": {
      what: "כיוון העברת data — ב-React: top-down (props).",
      need: "events bubbling up דרך callbacks. unidirectional.",
    },
    "Code Splitting": {
      what: "פיצול bundle לchunks קטנים.",
      need: "React.lazy + Suspense. dynamic import('...').",
    },
    "Performance Optimization": {
      what: "מהירות UI — memoization, virtualization, lazy loading.",
      need: "measure ראשון (Profiler). over-optimize מזיק.",
    },
    "Error Boundaries": {
      what: "React component שתופס errors מ-children.",
      need: "componentDidCatch + getDerivedStateFromError. או ספרייה.",
    },
    "Testing Strategies": {
      what: "unit (Vitest), integration (Testing Library), E2E (Playwright).",
      need: "פירמידה: הרבה unit, פחות integration, מעט E2E.",
    },
    "Component Architecture": {
      what: "ארגון components: presentational, container, smart, dumb.",
      need: "כיום React Server Components מוסיפים שכבה.",
    },
    "Index": {
      what: "מיקום ב-array (0-based) או DB index.",
      need: "DB index = מבנה data לחיפוש מהיר על column.",
    },
    "index": {
      what: "ב-Mongoose: createIndex או schema.index().",
      need: "{ email: 1 }. unique: true. compound indexes.",
    },
    "pop": {
      what: "arr.pop() — מוציא איבר אחרון, מחזיר אותו.",
      need: "מוטטיבי. arr ריק → undefined.",
    },
    "push": {
      what: "arr.push(x) — מוסיף בסוף, מחזיר length חדש.",
      need: "מוטטיבי. push(a,b,c) מוסיף כמה.",
    },
    "shift": {
      what: "arr.shift() — מוציא ראשון.",
      need: "אטי על arrays גדולים — O(n).",
    },
    "unshift": {
      what: "arr.unshift(x) — מוסיף לראש.",
      need: "אטי O(n). spread עדיף ל-immutable.",
    },
    "splice": {
      what: "arr.splice(start, count, ...items) — מוסיף/מסיר במקום.",
      need: "מוטטיבי. ל-immutable: slice + spread.",
    },
    "sort": {
      what: "arr.sort(compareFn) — ממיין במקום.",
      need: "default = string sort. compareFn(a,b) לnumeric: a-b.",
    },
    "undefined": {
      what: "ערך לintialized/missing.",
      need: "typeof undefined === 'undefined'. void 0 = undefined.",
    },
    "uppercase": {
      what: "אותיות גדולות. str.toUpperCase().",
      need: "Locale-aware: toLocaleUpperCase ל-Hebrew/Turkish.",
    },
    "lowercase": {
      what: "אותיות קטנות. str.toLowerCase().",
      need: "case-insensitive comparison: a.toLowerCase() === b.toLowerCase().",
    },
    "Array": {
      what: "מבנה data רשימתי ב-JS.",
      need: "Array.from, Array.isArray, ...spread.",
    },
    "Object": {
      what: "key-value collection ב-JS.",
      need: "Object.keys/values/entries. spread, freeze, assign.",
    },
    "Property": {
      what: "key-value זוג ב-object או DOM.",
      need: "obj.key, obj['key']. delete obj.key למחיקה.",
    },
    "Method": {
      what: "function שהיא property של object.",
      need: "obj.greet = function() {}. arrow לא מקבל own this.",
    },
    "import": {
      what: "ESM import: import x from 'mod'.",
      need: "type=\"module\" או .mjs. שונה מ-require.",
    },
    "export default": {
      what: "ESM default export — אחד לקובץ.",
      need: "export default function App() {}. import App from './App'.",
    },
    "className": {
      what: "ב-JSX: replacement ל-class (reserved word).",
      need: "<div className='btn'>. תבנית: cn('a', cond && 'b').",
    },
    "yצירת מערך חדש (new array)": {
      what: "[...oldArr, x] או arr.concat(x).",
      need: "ב-React: state חדש = הפניה חדשה.",
    },
    "יצירת מערך חדש (new array)": {
      what: "[...oldArr, x] או arr.concat(x).",
      need: "ב-React: state חדש = הפניה חדשה.",
    },
    "יצירת מערך חדש מתוך קיים": {
      what: "map או filter — מחזירים מערך חדש.",
      need: "items.map(x => x*2). items.filter(x => x>0).",
    },
    "סינון לפי תנאי": {
      what: "filter — מחזיר רק איברים שעוברים תנאי.",
      need: "items.filter(x => x.active).",
    },
    "עבודה עם ערכים לפי אינדקס": {
      what: "arr[i] לקריאה. forEach((x,i) => ...) ל-iterate.",
      need: "i מתחיל מ-0. arr.length-1 הוא האחרון.",
    },
    "getItem": {
      what: "localStorage/sessionStorage.getItem(key).",
      need: "מחזיר string או null. JSON.parse לאובייקטים.",
    },
    "setItem": {
      what: "storage.setItem(key, value).",
      need: "value הופך אוטומטית ל-string. JSON.stringify לאובייקטים.",
    },
    "setTimeout": {
      what: "schedules a callback after delay (ms): setTimeout(fn, 1000).",
      need: "Returns id; clearTimeout(id) cancels. 0ms = next tick (after current sync code).",
    },
    "GitHub workflow": {
      what: "GitHub Actions yaml בקובץ .github/workflows/.",
      need: "name, on (triggers), jobs (runs-on, steps with uses/run).",
    },
    "union": {
      what: "TS A | B — value either A or B.",
      need: "narrow before accessing variant-specific fields (typeof, in, discriminator).",
    },
    "Category": {
      what: "literal union לקטגוריות הוצאה: food | rent | other.",
      need: "סגור — IDE autocomplete + type-safe לעומת string פתוח.",
    },
    "memoization": {
      what: "שמירת תוצאת חישוב לקלטים חוזרים.",
      need: "useMemo לערך, useCallback לfunction. measure לפני.",
    },


  };

  global.CONCISE_CONCEPT_DEFINITIONS = Object.freeze(defs);
})(typeof window !== "undefined" ? window : globalThis);
