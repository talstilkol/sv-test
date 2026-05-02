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
      what: "interface בדוגמת ספריה: { id: string, title: string, author: string, year: number }.",
      need: "אפשר להוסיף genre, isbn, available — לפי הצרכים של ה-app.",
    },
    "Genre": {
      what: "type union/enum לסיווג סוג ספר: 'fiction' | 'nonfiction' | 'sci-fi'.",
      need: "string union נפוץ יותר מ-enum ב-TS modern.",
    },
    "GuestUser": {
      what: "interface למשתמש אורח (ללא credentials): { id: string, sessionId: string }.",
      need: "discriminated union: type User = GuestUser | RegisteredUser לפי tag.",
    },
    "RegisteredUser": {
      what: "interface למשתמש רשום: { id, email, name, hashedPassword, createdAt }.",
      need: "אסור לשמור password plain — תמיד hash + salt עם bcrypt/argon2.",
    },
    "Amount": {
      what: "מספר המייצג סכום כספי בעסקה. number ב-TS, אבל שמור כ-cents (integer) למניעת floating point bugs.",
      need: "lib כמו decimal.js או big.js לחישובים מדויקים.",
    },
    "Category Breakdown": {
      what: "תצוגת חלוקת הוצאות לפי קטגוריה: { food: 1200, rent: 5000, ... }.",
      need: "expenses.reduce((acc, e) => { acc[e.category] = (acc[e.category]||0) + e.amount; return acc; }, {}).",
    },
    "Method": {
      what: "פונקציה שמוגדרת באובייקט/class. נקראת עם dot notation: obj.method().",
      need: "method shorthand: { greet() { ... } }. בתוכה this מצביע על האובייקט.",
    },
    "Object": {
      what: "מבנה נתונים של key-value pairs ב-JS: { name: 'Tal', age: 30 }.",
      need: "Object.keys/values/entries לעבור על key/value. spread ל-immutability.",
    },
    "Property": {
      what: "key-value pair בתוך object. obj.name או obj['name'].",
      need: "computed property: { [key]: value }. delete obj.key למחיקה.",
    },
  };

  global.CONCISE_CONCEPT_DEFINITIONS = Object.freeze(defs);
})(typeof window !== "undefined" ? window : globalThis);
