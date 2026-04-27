// data/lesson17.js
var LESSON_17 = {
  id: "lesson_17",
  title: "שיעור 17 - HTTP, Express, REST API",
  description:
    "הצעד הגדול לעולם הרשת! נבין איך דפדפנים ושרתים מדברים זה עם זה דרך פרוטוקול HTTP, נבנה שרת ראשון עם Express, ונלמד לתכנן API מסודר לפי עקרונות REST.",
  concepts: [
    //  ─── A. HTTP & Web ─────────────────────────────────────────────────

    // 1. HTTP
    {
      conceptName: "HTTP",
      levels: {
        grandma:
          "זו השפה בה הטלפון שלך מדבר עם האינטרנט. כשאת מקלידה כתובת אתר, המכשיר שולח מכתב מנומס בשפה מיוחדת ומקבל תשובה באותה שפה — ככה דפים מופיעים על המסך.",
        child:
          "כשאתה רוצה לראות סרטון ביוטיוב, המחשב שלך שולח שאלה מנומסת לשרת גדול: 'אפשר את הסרטון הזה בבקשה?' — והשרת עונה ושולח בחזרה. כל השיחה הזו נקראת HTTP!",
        soldier:
          "פרוטוקול תקשורת סטנדרטי בין עמדות — כמו נוהל שיחה ברדיו. כל הודעה יוצאת בפורמט קבוע: מי שולח, מה רוצים, באיזה ערוץ. התשובה חוזרת באותו נוהל עם קוד סטטוס.",
        student:
          "HyperText Transfer Protocol — פרוטוקול שכבת האפליקציה שמגדיר איך הודעות מועברות ברשת. חסר מצב (Stateless), מבוסס טקסט, ופועל בשיטת Request-Response מעל TCP/IP.",
        junior:
          "בהתחלה חשבתי שהדפדפן 'פשוט מציג דפים'. רק כשפתחתי את כלי המפתחים וראיתי שכל קליק שולח Request עם Headers ומקבל Response עם Status Code — הבנתי שזו שיחה מלאה מתחת לפני השטח.",
        professor:
          "Application-layer protocol (RFC 7230-7235) שפועל מעל TCP. Stateless בארכיטקטורה, תומך ב-persistent connections (Keep-Alive), Content Negotiation עם Accept headers, ו-HTTP/2 מוסיף multiplexing על חיבור בודד עם binary framing.",
      },
      illustration:
        "🌐 HTTP — השיחה בין דפדפן לשרת:\n\n" +
        "  🖥️ דפדפן (Client)\n" +
        "     │\n" +
        "     ├──→ 📨 Request: 'תן לי את דף הבית'\n" +
        "     │\n" +
        "  🖧 שרת (Server)\n" +
        "     │\n" +
        "     └──→ 📬 Response: '<html>הנה הדף!</html>'",
      codeExample:
        "// הדפדפן שולח בקשת HTTP (בצורה אוטומטית כשנכנסים לאתר)\n// GET /index.html HTTP/1.1\n// Host: www.example.com\n\n// השרת מחזיר תשובה:\n// HTTP/1.1 200 OK\n// Content-Type: text/html\n// <html>Hello World!</html>",
      codeExplanation:
        "כל פעם שנכנסים לאתר — הדפדפן שולח בקשת GET ומקבל בחזרה תשובה עם סטטוס (200 = הכל בסדר) ותוכן הדף עצמו. זה קורה מאות פעמים ביום מבלי שנשים לב.",
    },

    // 2. URL
    {
      conceptName: "URL",
      levels: {
        grandma:
          "זה הכתובת המלאה של הבית ברשת. כמו שלבית יש רחוב, מספר וקומה — לכל דף באינטרנט יש כתובת ייחודית שמכוונת אליו בדיוק.",
        child:
          "זה ה-GPS של האינטרנט! כותבים כתובת בשורה למעלה בדפדפן והוא יודע בדיוק לאן לנסוע — כל אתר בעולם נמצא בכתובת אחרת.",
        soldier:
          "נקודת ציון מדויקת ברשת. כמו קואורדינטות — מכילה את הפרוטוקול (איך להגיע), הדומיין (לאן להגיע), והנתיב (מה בדיוק לחפש שם).",
        student:
          "Uniform Resource Locator — מחרוזת מובנית שמזהה משאב ברשת. מורכבת מ-Protocol (https://), Domain (www.site.com), Path (/page), ואופציונלית Query (?key=val) ו-Fragment (#section).",
        junior:
          "הייתי שולח לחברים לינקים ארוכים בלי להבין מה כל חלק אומר. כשפירקתי URL לחלקיו — protocol, domain, path, query — פתאום הבנתי למה לפעמים לינקים נשברים כשמוחקים חלק.",
        professor:
          "מוגדר ב-RFC 3986 כ-URI scheme המשלב scheme, authority (host:port), path, query string, ו-fragment. הדפדפן מבצע DNS resolution על ה-host, פותח TCP connection, ושולח HTTP request לפי ה-path.",
      },
      illustration:
        "🔗 URL — הכתובת המלאה:\n\n" +
        "  https://www.shop.com/products?category=shoes#sale\n" +
        "  ───┬── ────┬──────── ───┬──── ──────┬────── ─┬──\n" +
        " Protocol  Domain     Path     Query     Fragment",
      codeExample:
        "// כתובת URL מלאה:\n// https://api.weather.com/forecast?city=TelAviv&days=7\n\n// בקוד JS אפשר לפרק URL לחלקים:\nconst url = new URL('https://api.weather.com/forecast?city=TelAviv');\nconsole.log(url.hostname); // 'api.weather.com'\nconsole.log(url.pathname); // '/forecast'\nconsole.log(url.searchParams.get('city')); // 'TelAviv'",
      codeExplanation:
        "אובייקט URL ב-JavaScript מאפשר לפרק כתובת לחלקיה — הדומיין, הנתיב, והפרמטרים — במקום לנסות לחתוך מחרוזות ידנית עם split.",
    },

    // 3. Protocol
    {
      conceptName: "Protocol",
      levels: {
        grandma:
          "זה 'נוהל השיחה'. כמו שיש כללי נימוס בטלפון (אומרים שלום, מחכים לתשובה, אומרים להתראות) — יש כללי שיחה גם בין מחשבים.",
        child:
          "כללי המשחק! כמו שבכדורגל יש חוקים שכולם חייבים לשמור — גם מחשבים צריכים לדבר לפי חוקים מוסכמים כדי שלא יהיה בלאגן.",
        soldier:
          "נוהל תקשורת. משהו כמו 'ניב שידורים' — כללים ברורים שקובעים את סדר הדיבור, מבנה ההודעות, ואישורי הקבלה כדי שהתקשורת תהיה ללא רעשים.",
        student:
          "סט חוקים וקונבנציות שמגדיר את אופן התקשורת בין שתי מערכות. HTTP ו-HTTPS הם פרוטוקולים של שכבת האפליקציה, TCP ו-IP של שכבות נמוכות יותר.",
        junior:
          "הבנתי את זה כשניסיתי לגשת לאתר עם http:// במקום https:// וקיבלתי אזהרת אבטחה. הפרוטוקול קובע לא רק 'איך מדברים' אלא גם 'כמה בטוח הדיבור'.",
        professor:
          "Formal specification של syntax, semantics ו-synchronization של תקשורת. מודל OSI מגדיר 7 שכבות פרוטוקולים מ-Physical (L1) עד Application (L7). HTTP פועל ב-L7 מעל TCP (L4) שמעל IP (L3).",
      },
      illustration:
        "📜 Protocol — חוקי המשחק:\n\n" +
        "  📱 ←──[HTTP]──→ 🖧\n" +
        "  כללים: 1. שלח Request\n" +
        "         2. המתן ל-Response\n" +
        "         3. סגור חיבור\n\n" +
        "  HTTPS = אותם כללים + 🔒 הצפנה",
      codeExample:
        "// ה-Protocol מופיע בתחילת כל URL:\n// http://  ← לא מוצפן\n// https:// ← מוצפן עם SSL/TLS\n// ftp://   ← להעברת קבצים\n// ws://    ← WebSocket לתקשורת דו-כיוונית",
      codeExplanation:
        "הפרוטוקול הוא החלק הראשון ב-URL ומגדיר את 'שפת השיחה'. HTTPS הוא למעשה HTTP עם שכבת הצפנה SSL/TLS שמגנה על הנתונים בדרך.",
    },

    // 4. Domain
    {
      conceptName: "Domain",
      levels: {
        grandma:
          "זה השם הידידותי של האתר. במקום לזכור מספר טלפון ארוך (כתובת IP), את פשוט אומרת 'תחייגי לגוגל' — והמערכת יודעת לפי השם למי להתחבר.",
        child:
          "כינוי של מחשב באינטרנט! כמו שלחבר שלך קוראים 'דני' ולא '045-7382910' — לשרת קוראים 'google.com' ולא '142.250.185.78'.",
        soldier:
          "שם הקוד של הבסיס. במקום לתת לכל יחידה קואורדינטות מדויקות (IP), נותנים שם-קוד קצר שכל אחד יכול לזכור ולהשתמש בו בשטח.",
        student:
          "שם טקסטואלי ייחודי שממופה לכתובת IP דרך מערכת DNS. הדומיין מחולק לתת-דומיין (www), שם (google), וסיומת TLD (.com). כל דומיין רשום אצל Registrar.",
        junior:
          "קניתי דומיין ראשון ולא הבנתי למה צריך לחכות 48 שעות עד שהוא 'יעבוד'. התברר שמערכת ה-DNS צריכה זמן לעדכן את כל השרתים בעולם שהשם החדש מצביע ל-IP שלי.",
        professor:
          "Domain Name System (RFC 1035) — מערכת היררכית מבוזרת שממפה שמות ל-IP addresses. Resolution עובר דרך Recursive resolvers, Root servers, TLD servers, ו-Authoritative nameservers עם TTL caching.",
      },
      illustration:
        "🏠 Domain — שם ידידותי לכתובת מספרית:\n\n" +
        "  google.com  ──DNS──→  142.250.185.78\n" +
        "  (שם קל לזכירה)        (כתובת IP אמיתית)\n\n" +
        "  🧠 DNS = ספר הטלפונים של האינטרנט",
      codeExample:
        "// הדומיין הוא החלק ב-URL שאומר 'לאן ללכת':\n// https://www.facebook.com/profile\n//         ─────────────── ← זה הדומיין\n\n// ב-Node.js אפשר לגלות את ה-IP מאחורי דומיין:\nconst dns = require('dns');\ndns.lookup('google.com', (err, address) => {\n  console.log('IP:', address); // '142.250.185.78'\n});",
      codeExplanation:
        "הדומיין הוא 'שם ידידותי' שמסתיר מאחוריו כתובת IP מספרית. מערכת DNS מתרגמת את השם לכתובת כדי שהמחשב ידע לאן לפנות בפועל.",
    },

    // 5. Path
    {
      conceptName: "Path",
      levels: {
        grandma:
          "זה הנתיב הספציפי בתוך הבית. אחרי שהגעת לכתובת הנכונה (דומיין), את צריכה לדעת לאיזה חדר ללכת — לסלון, למטבח, או לחדר שינה.",
        child:
          "המפה בתוך הטירה! אחרי שהגעת לטירה (האתר), אתה צריך שלט שאומר 'לך ימינה למבצר הצעצועים' — זה הנתיב שמוביל למקום הנכון.",
        soldier:
          "נתיב הניווט בתוך הבסיס. הגעת לבסיס (דומיין), עכשיו צריך לנווט: מפקדה/חדר-תדריכים/מסמך-42. כל / מפריד רמה נוספת של ניווט.",
        student:
          "החלק ב-URL שבא אחרי הדומיין ומגדיר את המשאב הספציפי. /users מוביל לרשימת משתמשים, /users/5 למשתמש ספציפי. ב-Express זה ה-Route שמוגדר ב-app.get('/path').",
        junior:
          "בפעם הראשונה שבניתי API, שמתי הכל ב-route אחד (/api). רק כשהבנתי את מבנה הנתיבים — /api/users, /api/products — API נהיה מסודר ואינטואיטיבי.",
        professor:
          "Component של URI שמזהה משאב ספציפי בשרת. ב-REST, הנתיב מייצג resource hierarchy: /collection/{id}/sub-collection. Express מבצע pattern matching עם route parameters (:id) ו-regex support.",
      },
      illustration:
        "🛤️ Path — הנתיב בתוך האתר:\n\n" +
        "  https://shop.com / products / shoes / nike-air\n" +
        "                    ─────────────────────────\n" +
        "                           זה ה-Path!\n\n" +
        "  /           → דף הבית\n" +
        "  /products   → כל המוצרים\n" +
        "  /products/5 → מוצר מספר 5",
      codeExample:
        "// ב-Express, ה-Path הוא מה שמגדיר את ה-Route:\napp.get('/', (req, res) => {\n  res.send('דף הבית');\n});\napp.get('/about', (req, res) => {\n  res.send('אודות');\n});\napp.get('/users/:id', (req, res) => {\n  res.send(`משתמש מספר ${req.params.id}`);\n});",
      codeExplanation:
        "כל Path מוגדר כ-Route ב-Express. הסימן :id הוא פרמטר דינמי — המערכת תתפוס כל ערך שיבוא שם ותכניס אותו ל-req.params.id.",
    },

    // 6. Client
    {
      conceptName: "Client",
      levels: {
        grandma:
          "את הלקוחה. כשנכנסת לחנות ומבקשת עוגה — את הצד ששואל. המחשב שלך הוא הלקוח שמבקש דפים מהשרת.",
        child:
          "זה 'מי ששואל'. כשנכנסים לאתר — המחשב שלנו הוא הילד שמרים את היד ושואל שאלה, והשרת הוא המורה שעונה.",
        soldier:
          "היחידה המבקשת שירות. כמו חייל ששולח בקשת אספקה למפקדה — הוא הצד שיוזם את הפנייה וממתין לתגובה.",
        student:
          "הצד שיוזם בקשת HTTP. בדרך כלל הדפדפן, אך יכול להיות גם אפליקציה, סקריפט Node עם fetch, או כלי כמו Postman. Client שולח Request ומקבל Response.",
        junior:
          "בהתחלה חשבתי שרק דפדפן הוא Client. כשכתבתי סקריפט ב-Node ששולח fetch לשרת אחר — הבנתי שגם שרת יכול להיות Client של שרת אחר.",
        professor:
          "ב-Client-Server architecture, הצד שיוזם TCP handshake ושולח HTTP request. בהקשר רחב יותר, כל process שצורך שירות הוא client — כולל microservice שפונה ל-microservice אחר.",
      },
      illustration:
        "👤 Client — הצד ששואל:\n\n" +
        "  🖥️ Client (דפדפן/אפליקציה)\n" +
        "     │\n" +
        "     ├──→ 'אני רוצה את דף /products'\n" +
        "     │\n" +
        "     └──← 'הנה הדף עם כל המוצרים'\n" +
        "                                    🖧 Server",
      codeExample:
        "// הדפדפן כ-Client:\nfetch('https://api.example.com/users')\n  .then(res => res.json())\n  .then(data => console.log(data));\n\n// גם Node.js יכול להיות Client:\nconst axios = require('axios');\naxios.get('https://api.example.com/users');",
      codeExplanation:
        "כל מי שיוזם בקשה הוא Client. הדפדפן הוא ה-Client הנפוץ ביותר, אבל גם שרת Node.js יכול לשמש כ-Client כשהוא שולח בקשות לשרתים אחרים.",
    },

    // 7. Server
    {
      conceptName: "Server",
      levels: {
        grandma:
          "המלצר! הלקוח (Client) מבקש, והשרת מגיש. הוא יושב ומחכה שמישהו יבקש ממנו משהו, ואז הוא קם ומביא את מה שביקשו.",
        child:
          "המחשב העוצמתי שיושב ומחכה בצד ויודע הכל! כשהדפדפן שלך שואל שאלה, השרת מחפש במאגר שלו ושולח תשובה בחזרה.",
        soldier:
          "המפקדה. כל הבקשות מגיעות לנקודה המרכזית הזו, והיא מחלקת משימות, שולפת מידע ומחזירה תשובות מסודרות לכל שואל.",
        student:
          "תוכנה שמאזינה לבקשות בפורט מסוים ומחזירה תשובות. ב-Node.js נבנה שרת עם Express שמאזין בפורט (למשל 3000) ומגדיר Routes שמטפלים בבקשות שונות.",
        junior:
          "הרגע שהרצתי app.listen(3000) ונכנסתי ב-localhost:3000 וראיתי תשובה — היה הרגע שהבנתי שהמחשב שלי עכשיו משמש כשרת. זה היה מדהים.",
        professor:
          "Process שמבצע bind() ו-listen() על socket ב-TCP port, מקבל connections ומעבד requests. ב-Node, ה-HTTP server בנוי על event-driven architecture עם single-threaded event loop ו-non-blocking I/O.",
      },
      illustration:
        "🖧 Server — הצד שמגיש:\n\n" +
        "  📨 Request מ-Client #1 ──→ ┌──────────┐\n" +
        "  📨 Request מ-Client #2 ──→ │  🖧 Server │ ──→ 📬 Responses\n" +
        "  📨 Request מ-Client #3 ──→ └──────────┘\n\n" +
        "  השרת מטפל בכולם ומחזיר תשובות!",
      codeExample:
        "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('שלום! אני השרת, ואני עונה לך.');\n});\n\napp.listen(3000, () => {\n  console.log('השרת מאזין בפורט 3000!');\n});",
      codeExplanation:
        "שלוש שורות שהופכות את המחשב שלנו לשרת: יוצרים אפליקציית Express, מגדירים Route שעונה לבקשות, ומפעילים האזנה בפורט 3000.",
    },

    // 8. Request
    {
      conceptName: "Request",
      levels: {
        grandma:
          "הבקשה שאת שולחת. כשנכנסת לאתר — את בעצם שולחת מכתב מנומס שאומר 'היי, אני רוצה לראות את הדף הזה בבקשה'. זו הבקשה.",
        child:
          "השאלה ששואלים! כשלוחצים על לינק, המחשב שולח שאלה: 'אפשר את הדף הזה?' — זו הבקשה שטסה מהמחשב שלך לשרת.",
        soldier:
          "דוח ביקוש. יחידה שמזמינה ציוד שולחת טופס רשמי עם: מה רוצים (Method), מאיפה (URL), ופרטים נוספים (Headers). הבקשה עוברת ערוצים עד המפקדה.",
        student:
          "אובייקט HTTP שה-Client שולח לשרת. מכיל Method (GET/POST/PUT/DELETE), URL, Headers (מטא-דאטה), ואופציונלית Body (תוכן). ב-Express נגיש אליו דרך הפרמטר req.",
        junior:
          "כשהתחלתי לעבוד עם Express, ה-req היה סתם 'פרמטר מסתורי'. רק כשעשיתי console.log(req.headers) ו-console.log(req.body) — ראיתי כמה מידע עשיר מגיע עם כל בקשה.",
        professor:
          "HTTP Request message מורכב מ-Request Line (method SP request-target SP HTTP-version), Header fields, ו-optional message body. Express עוטף את ה-IncomingMessage של Node עם sugar methods כמו req.params, req.query, req.body.",
      },
      illustration:
        "📨 Request — ההודעה שנשלחת לשרת:\n\n" +
        "  ┌─────────────────────────────────┐\n" +
        "  │  Method:  GET                   │\n" +
        "  │  URL:     /api/users/42         │\n" +
        "  │  Headers: Accept: application/json │\n" +
        "  │  Body:    (ריק ב-GET)           │\n" +
        "  └─────────────────────────────────┘",
      codeExample:
        "// ב-Express, ה-Request נגיש דרך הפרמטר req:\napp.get('/users/:id', (req, res) => {\n  console.log(req.method);       // 'GET'\n  console.log(req.params.id);    // '42'\n  console.log(req.query.sort);   // מ-URL: ?sort=name\n  console.log(req.headers.host); // 'localhost:3000'\n});",
      codeExplanation:
        "אובייקט req מכיל את כל המידע שה-Client שלח: Method, פרמטרים מה-URL, Query string, Headers, ובבקשות POST גם Body עם נתונים.",
    },

    // 9. Response
    {
      conceptName: "Response",
      levels: {
        grandma:
          "התשובה שחוזרת אלייך. שלחת בקשה — עכשיו המלצר חוזר עם המנה על מגש, או לפעמים עם הודעה 'סליחה, המנה נגמרה'.",
        child:
          "התשובה מהשרת! שלחת שאלה — ועכשיו חוזרת תשובה: או הדף שביקשת, או הודעת שגיאה 'לא מצאתי'. התשובה תמיד מגיעה עם מספר (כמו ציון) שאומר אם הצליח.",
        soldier:
          'רשום החזרה מהמפקדה. חוזר עם קוד סטטוס (הצלחה/כשלון) ותוכן המשימה. כמו תשובה ל"דוח ביקוש" — עם חותמת אישור ותוכן הציוד.',
        student:
          "אובייקט HTTP שהשרת מחזיר ל-Client. מכיל Status Code (200, 404, 500...), Headers (Content-Type וכו'), ו-Body (התוכן עצמו — HTML, JSON, תמונה). ב-Express נבנה אותו עם res.send() או res.json().",
        junior:
          "בהתחלה שלחתי תמיד res.send('ok'). אחר כך למדתי לשלוח res.status(201).json({ id: newUser.id }) — כלומר סטטוס מדויק + JSON מסודר. API מקצועי חייב Response מובנה.",
        professor:
          "HTTP Response message: Status-Line (HTTP-version SP status-code SP reason-phrase), Header fields, ו-Message body. Express עוטף את ServerResponse של Node ומוסיף chainable methods: res.status().set().json().",
      },
      illustration:
        "📬 Response — התשובה מהשרת:\n\n" +
        "  ┌─────────────────────────────────┐\n" +
        "  │  Status:  200 OK                │\n" +
        "  │  Headers: Content-Type: application/json │\n" +
        '  │  Body:    { "name": "Tal" }      │\n' +
        "  └─────────────────────────────────┘\n\n" +
        "  200 = הצלחה  |  404 = לא נמצא  |  500 = שגיאת שרת",
      codeExample:
        "// ב-Express, ה-Response נשלח דרך res:\napp.get('/api/user', (req, res) => {\n  res.status(200).json({ name: 'Tal', age: 25 });\n});\n\napp.get('/api/missing', (req, res) => {\n  res.status(404).json({ error: 'לא נמצא' });\n});",
      codeExplanation:
        "res.status() קובע את קוד הסטטוס, ו-res.json() שולח אובייקט כ-JSON. שילוב השניים יוצר תשובה מקצועית שה-Client יודע לפרש.",
    },

    // 10. headers
    {
      conceptName: "headers",
      levels: {
        grandma:
          "ה-Headers הם כמו מעטפה של מכתב. לפני שפותחים את המכתב עצמו (Body), רואים על המעטפה: מי שלח, מתי, ובאיזו שפה כתוב.",
        child:
          "המדבקה על החבילה! לפני שפותחים מתנה, רואים על הקופסה: 'מ: סבתא', 'ל: דני', 'שברירי!'. ה-Headers אומרים מידע חשוב על ההודעה בלי לפתוח אותה.",
        soldier:
          "הכותרות המסווגות שנמצאות בתחילת כל מסמך רשמי — סיווג, תאריך, שולח, יעד. בלי לקרוא את גוף המסמך אפשר לדעת על מה מדובר ואיך לטפל.",
        student:
          "מטא-דאטה שנשלח עם כל Request ו-Response בפורמט key:value. דוגמאות: Content-Type (סוג התוכן), Authorization (הרשאות), Accept (מה ה-Client מצפה לקבל).",
        junior:
          "לא הבנתי למה ה-API מחזיר לי טקסט מוזר במקום JSON. התברר שחסר לי Header של Content-Type: application/json בבקשה — השרת לא ידע באיזה פורמט לענות.",
        professor:
          "HTTP Header fields (RFC 7231) נחלקים ל-Request headers, Response headers, Representation headers, ו-Payload headers. הם שולטים ב-content negotiation, caching (Cache-Control, ETag), authentication, ו-CORS policy enforcement.",
      },
      illustration:
        "📋 Headers — מידע על ההודעה:\n\n" +
        "  ┌── Request Headers ──────────────┐\n" +
        "  │ Host: api.example.com           │\n" +
        "  │ Accept: application/json        │\n" +
        "  │ Authorization: Bearer xyz...    │\n" +
        "  └────────────────────────────────┘\n\n" +
        "  ┌── Response Headers ─────────────┐\n" +
        "  │ Content-Type: application/json  │\n" +
        "  │ Content-Length: 245             │\n" +
        "  └────────────────────────────────┘",
      codeExample:
        "// קריאת Headers מבקשה נכנסת:\napp.get('/api/data', (req, res) => {\n  console.log(req.headers['content-type']);\n  console.log(req.headers['authorization']);\n});\n\n// הגדרת Headers בתשובה:\napp.get('/api/data', (req, res) => {\n  res.set('X-Custom-Header', 'MyValue');\n  res.json({ data: 'hello' });\n});",
      codeExplanation:
        "Headers הם מידע נוסף שעובר 'על המעטפה' של כל בקשה ותשובה. הם קובעים את סוג התוכן, הרשאות, קשינג, ועוד — בלי שהם חלק מהתוכן עצמו.",
    },

    //  ─── B. REST & CRUD ────────────────────────────────────────────────

    // 11. REST API
    {
      conceptName: "REST API",
      levels: {
        grandma:
          "תפריט מסעדה מסודר. במקום לקרוא למלצר ולבקש בכל פעם דבר שונה בשפה אחרת, יש תפריט אחיד עם מספרים: מנה 1, מנה 2. REST API זה תפריט אחיד לשרתים.",
        child:
          "חוקי המשחק של האינטרנט! REST אומר: 'אם רוצים לקבל מידע — תשתמשו ב-GET, אם רוצים לשלוח — POST'. ככה כל אחד יודע מה לעשות.",
        soldier:
          "נהלי תקשורת סטנדרטיים בין מערכות. כמו נהלי דיווח אחידים — כל בסיס שולח ומקבל נתונים באותו פורמט, בלי צורך בתרגום או התאמה.",
        student:
          "REpresentational State Transfer — סגנון ארכיטקטוני לתכנון API. עקרונות: שימוש ב-HTTP methods (GET/POST/PUT/DELETE), URL שמייצג משאבים, ותקשורת Stateless.",
        junior:
          "בהתחלה בניתי routes כמו /getUsers, /deleteUser/5. כשלמדתי REST הבנתי שה-method קובע את הפעולה: GET /users, DELETE /users/5 — הרבה יותר נקי.",
        professor:
          "Architectural style (Roy Fielding, 2000) עם constraints: Client-Server, Stateless, Cacheable, Uniform Interface, Layered System. HATEOAS מגדיר self-descriptive resources עם hypermedia links.",
      },
      illustration:
        "🍽️ REST API — תפריט אחיד:\n\n" +
        "  GET    /users     → קבל את כל המשתמשים\n" +
        "  GET    /users/5   → קבל משתמש מספר 5\n" +
        "  POST   /users     → צור משתמש חדש\n" +
        "  PUT    /users/5   → עדכן משתמש 5\n" +
        "  DELETE /users/5   → מחק משתמש 5",
      codeExample:
        "// REST API ב-Express:\napp.get('/api/users', (req, res) => { /* קבל הכל */ });\napp.get('/api/users/:id', (req, res) => { /* קבל אחד */ });\napp.post('/api/users', (req, res) => { /* צור חדש */ });\napp.put('/api/users/:id', (req, res) => { /* עדכן */ });\napp.delete('/api/users/:id', (req, res) => { /* מחק */ });",
      codeExplanation:
        "ה-URL (/api/users) מייצג את המשאב, וה-Method (GET/POST/PUT/DELETE) מגדיר את הפעולה. זה העיקרון המרכזי של REST — הפרדה ברורה בין 'מה' ל'איך'.",
    },

    // 12. CRUD
    {
      conceptName: "CRUD",
      levels: {
        grandma:
          "ארבע פעולות בסיסיות שאנחנו עושים עם כל דבר: יוצרים (Create), קוראים (Read), מעדכנים (Update), מוחקים (Delete). בדיוק כמו מתכון — כתוב, קרא, תקן, זרוק.",
        child:
          "ארבעת הכוחות! Create = בנה לגו חדש, Read = תסתכל עליו, Update = שנה חלק, Delete = פרק הכל. כל דבר במחשב סובב סביב ארבע הפעולות האלה!",
        soldier:
          "ארבע פקודות תפעוליות בסיסיות: הקמה, תצפית, עדכון, פירוק. כל מערכת מידע, מטובלת אקסל ועד מסד נתונים ענק, בנויה על ארבע הפעולות האלה.",
        student:
          "Create-Read-Update-Delete — ארבע פעולות היסוד לניהול נתונים. ב-REST ממופות ל-HTTP methods: POST=Create, GET=Read, PUT/PATCH=Update, DELETE=Delete.",
        junior:
          "כל פרויקט שבניתי מסתכם ב-CRUD. מערכת משתמשים? CRUD. בלוג? CRUD. חנות? CRUD. ברגע שהבנתי את התבנית, כל פרויקט חדש נהיה פחות מפחיד.",
        professor:
          "אבסטרקציה של פעולות DML (Data Manipulation Language) במסדי נתונים. ב-SQL: INSERT, SELECT, UPDATE, DELETE. ב-REST: POST, GET, PUT/PATCH, DELETE. מהווה את הבסיס ל-CQRS patterns.",
      },
      illustration:
        "🔄 CRUD — 4 פעולות היסוד:\n\n" +
        "  C = Create  (POST)   → ✨ יצירת נתון חדש\n" +
        "  R = Read    (GET)    → 👀 קריאת נתון קיים\n" +
        "  U = Update  (PUT)    → ✏️ עדכון נתון קיים\n" +
        "  D = Delete  (DELETE) → 🗑️ מחיקת נתון",
      codeExample:
        "let users = [];\n// Create\nusers.push({ id: 1, name: 'Tal' });\n// Read\nconsole.log(users[0]);\n// Update\nusers[0].name = 'Dana';\n// Delete\nusers.splice(0, 1);",
      codeExplanation:
        "CRUD הוא לא ספריה — הוא רעיון. ארבע פעולות שחוזרות בכל מערכת, בין אם זה מערך פשוט, מסד נתונים, או API מלא.",
    },

    // 13. Create
    {
      conceptName: "Create",
      levels: {
        grandma:
          "ליצור דבר חדש. להוסיף מתכון חדש לספר המתכונים — דבר שלא היה קודם, עכשיו קיים.",
        child:
          "לבנות משהו חדש! כמו לצייר ציור חדש ולתלות אותו על הקיר. Create = להביא לעולם דבר שלא היה.",
        soldier:
          "הקמת יחידה חדשה. מגייסים חייל חדש למערכת, פותחים לו תיק אישי ורושמים אותו ברשומות.",
        student:
          "פעולת הוספת רשומה חדשה למסד הנתונים. ב-REST ממופה ל-POST method, הנתונים נשלחים ב-Body של הבקשה, והשרת מחזיר 201 Created.",
        junior:
          "בפעם הראשונה ששלחתי POST עם body ולא קיבלתי שגיאה אלא 201 + האובייקט שנוצר עם id — הרגשתי שהבנתי איך האינטרנט עובד.",
        professor:
          "INSERT operation שמייצרת רשומה חדשה. ב-REST, POST request ל-collection endpoint. Idempotency לא מובטחת — שני POST זהים ייצרו שני resources שונים עם unique identifiers.",
      },
      illustration:
        "✨ Create — יצירת משהו חדש:\n\n" +
        "  POST /api/users\n" +
        "  Body: { name: 'Tal', age: 25 }\n" +
        "       ↓\n" +
        "  Response: 201 Created\n" +
        "  { id: 7, name: 'Tal', age: 25 }",
      codeExample:
        "app.post('/api/users', (req, res) => {\n  const newUser = { id: users.length + 1, ...req.body };\n  users.push(newUser);\n  res.status(201).json(newUser);\n});",
      codeExplanation:
        "ה-Client שולח POST עם הנתונים ב-body. השרת יוצר אובייקט חדש עם id, שומר אותו, ומחזיר 201 Created עם האובייקט שנוצר.",
    },

    // 14. Read
    {
      conceptName: "Read",
      levels: {
        grandma:
          "לקרוא מידע שכבר קיים. לפתוח את ספר המתכונים ולקרוא מתכון — לא משנים כלום, רק מסתכלים.",
        child:
          "להציץ! כמו לפתוח אלבום תמונות ולהסתכל — לא מוחקים ולא משנים, רק צופים במה שיש.",
        soldier:
          "תצפית ואיסוף מודיעין. קוראים את הדוחות, מסתכלים על המפה — בלי לשנות שום דבר בשטח.",
        student:
          "שליפת נתונים קיימים. ב-REST ממופה ל-GET. אפשר לקרוא אוסף שלם (GET /users) או פריט בודד (GET /users/5). לא משנה את המצב בשרת.",
        junior:
          "GET הוא ה-method הכי בטוח — הוא לא משנה כלום בשרת, רק מחזיר מידע. לכן אפשר לקרוא לו שוב ושוב בלי חשש.",
        professor:
          "Safe ו-Idempotent operation. GET request לא אמור לגרום ל-side effects (RFC 7231). Cacheable by default, תומך ב-conditional requests עם ETag/If-Modified-Since.",
      },
      illustration:
        "👀 Read — צפייה בנתונים:\n\n" +
        "  GET /api/users → כל הרשימה\n" +
        "  GET /api/users/5 → משתמש ספציפי\n" +
        "       ↓\n" +
        "  Response: 200 OK + הנתונים",
      codeExample:
        "app.get('/api/users', (req, res) => {\n  res.json(users); // מחזיר את כל המשתמשים\n});\napp.get('/api/users/:id', (req, res) => {\n  const user = users.find(u => u.id === +req.params.id);\n  if (!user) return res.status(404).json({ error: 'לא נמצא' });\n  res.json(user);\n});",
      codeExplanation:
        "GET לקולקציה מחזיר מערך שלם, GET עם :id מחזיר פריט בודד. אם הפריט לא נמצא — מחזירים 404.",
    },

    // 15. Update
    {
      conceptName: "Update",
      levels: {
        grandma:
          "לתקן מתכון קיים. לא כותבים מתכון חדש ולא זורקים — רק מחליפים 'כוס סוכר' ב'חצי כוס סוכר' בדף שכבר קיים.",
        child:
          "לשפר! כמו לשנות את הצבע של דמות במשחק — הדמות נשארת אותה דמות, רק עם בגדים חדשים.",
        soldier:
          "עדכון נתונים במערכת. החייל שינה כתובת מגורים — מעדכנים את הרשומה הקיימת בלי לפתוח תיק חדש.",
        student:
          "שינוי רשומה קיימת. ב-REST ממופה ל-PUT (החלפה מלאה) או PATCH (עדכון חלקי). הנתונים המעודכנים נשלחים ב-Body, השרת מחזיר 200 OK.",
        junior:
          "בהתחלה השתמשתי רק ב-PUT. אחר כך הבנתי ש-PATCH מעדכן רק שדות ספציפיים ולא דורס הכל — וזה חסך לי באגים בפרודקשן.",
        professor:
          "PUT מחליף את ה-resource במלואו (idempotent). PATCH מבצע partial modification (RFC 5789), לא בהכרח idempotent. שניהם דורשים resource identifier ב-URL.",
      },
      illustration:
        "✏️ Update — עדכון נתונים:\n\n" +
        "  PUT /api/users/5\n" +
        "  Body: { name: 'Dana', age: 30 }\n" +
        "       ↓\n" +
        "  לפני: { id:5, name:'Tal', age:25 }\n" +
        "  אחרי: { id:5, name:'Dana', age:30 }",
      codeExample:
        "app.put('/api/users/:id', (req, res) => {\n  const user = users.find(u => u.id === +req.params.id);\n  if (!user) return res.status(404).json({ error: 'לא נמצא' });\n  Object.assign(user, req.body);\n  res.json(user);\n});",
      codeExplanation:
        "מוצאים את המשתמש לפי id, מעדכנים את השדות שלו עם Object.assign, ומחזירים את הגרסה המעודכנת.",
    },

    // 16. Delete
    {
      conceptName: "Delete",
      levels: {
        grandma:
          "למחוק לגמרי. לקרוע מתכון מהספר ולזרוק אותו לפח. אחרי זה הוא לא קיים יותר.",
        child:
          "למחוק! כמו למחוק ציור מהלוח. היה — ואיננו. Delete הוא הכפתור האדום והמפחיד.",
        soldier:
          "פירוק ומחיקה מהרישומות. החייל שוחרר — מוחקים את הרשומה מהמערכת. לא ארכיון, מחיקה.",
        student:
          "הסרת רשומה קיימת מהמאגר. ב-REST ממופה ל-DELETE method עם ה-id ב-URL. השרת מחזיר 200 OK או 204 No Content.",
        junior:
          "תמיד שמתי confirm dialog לפני DELETE כי פעם מחקתי בטעות את כל הנתונים בפרויקט. ב-production — מחיקה חייבת להיות עם אבטחה.",
        professor:
          "Idempotent operation — DELETE שני על אותו resource מחזיר 404 בפעם השנייה. Soft delete (flagging) מועדף על Hard delete ברוב ה-production systems למניעת data loss.",
      },
      illustration:
        "🗑️ Delete — מחיקת נתון:\n\n" +
        "  DELETE /api/users/5\n" +
        "       ↓\n" +
        "  לפני: [user1, user2, user5, user8]\n" +
        "  אחרי: [user1, user2, user8]\n" +
        "  Response: 200 OK",
      codeExample:
        "app.delete('/api/users/:id', (req, res) => {\n  const index = users.findIndex(u => u.id === +req.params.id);\n  if (index === -1) return res.status(404).json({ error: 'לא נמצא' });\n  const deleted = users.splice(index, 1);\n  res.json(deleted[0]);\n});",
      codeExplanation:
        "מוצאים את האינדקס של המשתמש, מוחקים אותו מהמערך עם splice, ומחזירים את האובייקט שנמחק כאישור.",
    },

    // 17. method
    {
      conceptName: "method",
      levels: {
        grandma:
          "סוג הבקשה. כמו שאפשר לשלוח מכתב רגיל, חבילה, או דואר רשום — כל אחד מסוג אחר. ה-method אומר 'איזה סוג פנייה זו'.",
        child:
          "מילת הקסם שאומרת מה רוצים! GET = 'תן לי', POST = 'קח ממני', PUT = 'תחליף', DELETE = 'תמחק'. כל פנייה מתחילה במילת קסם.",
        soldier:
          "סוג הפקודה. כמו סוגי הוראות — פקודת קדימה, נסיגה, ירי, עצור. ה-method מגדיר את סוג הפעולה שהמערכת צריכה לבצע.",
        student:
          "HTTP Method (Verb) שמגדיר את סוג הפעולה: GET (קריאה), POST (יצירה), PUT (החלפה), PATCH (עדכון חלקי), DELETE (מחיקה). ה-method נשלח כחלק מה-Request Line.",
        junior:
          "בהתחלה השתמשתי רק ב-GET ו-POST. כשהתחלתי להשתמש גם ב-PUT ו-DELETE — ה-API שלי נהיה RESTful אמיתי וקריא הרבה יותר.",
        professor:
          "HTTP/1.1 מגדיר 9 methods (RFC 7231). GET ו-HEAD הם safe. GET, HEAD, PUT, DELETE הם idempotent. OPTIONS משמש ל-CORS preflight. CONNECT ו-TRACE נדירים בשימוש.",
      },
      illustration:
        "🏷️ HTTP Methods — פעלים של הרשת:\n\n" +
        "  GET    → 📖 קרא (תביא לי מידע)\n" +
        "  POST   → 📝 צור (קח נתונים חדשים)\n" +
        "  PUT    → 🔄 החלף (עדכן הכל)\n" +
        "  PATCH  → ✏️ תקן (עדכן חלק)\n" +
        "  DELETE → 🗑️ מחק",
      codeExample:
        "// כל method מקבל handler משלו ב-Express:\napp.get('/items', handler);    // קריאה\napp.post('/items', handler);   // יצירה\napp.put('/items/:id', handler); // עדכון מלא\napp.delete('/items/:id', handler); // מחיקה",
      codeExplanation:
        "Express מספק פונקציה נפרדת לכל HTTP method. אותו URL יכול לטפל בפעולות שונות לפי ה-method — זה הלב של REST.",
    },

    // 18. body
    {
      conceptName: "body",
      levels: {
        grandma:
          "תוכן המכתב. אחרי המעטפה (Headers) יש את המכתב עצמו — מה שרצית לכתוב ולשלוח. ב-POST זה הנתונים שאנחנו שולחים לשרת.",
        child:
          "מה שבתוך החבילה! ה-Headers הם המדבקה על החבילה, אבל ה-Body הוא מה שבפנים — המתנה עצמה, הנתונים האמיתיים.",
        soldier:
          "תוכן המשלוח. מעטפת ההגנה (Headers) מספרת על החבילה, אבל ה-Body הוא העומס הצבאי (Payload) — המידע שצריך להגיע ליעד.",
        student:
          "חלק ה-payload של בקשת HTTP. בבקשות POST ו-PUT ה-Body מכיל את הנתונים (בפורמט JSON, form-data, וכו'). בבקשות GET אין Body. ב-Express ניגש דרך req.body.",
        junior:
          "שעות ניסיתי לקרוא req.body וקיבלתי undefined. התברר שחייבים middleware שיפרסר את ה-JSON: app.use(express.json()). בלי זה Express לא יודע לקרוא את ה-Body.",
        professor:
          "Message body (RFC 7230) מועבר אחרי Header section, מופרד ב-CRLF. Content-Type header מגדיר את ה-MIME type לפרסור. Transfer-Encoding: chunked מאפשר streaming של body בגודל לא ידוע.",
      },
      illustration:
        "📦 Body — התוכן של הבקשה:\n\n" +
        "  POST /api/users\n" +
        "  Headers: Content-Type: application/json\n" +
        "  ─────────────────────────────────────\n" +
        "  Body: {\n" +
        '    "name": "Tal",\n' +
        '    "email": "tal@mail.com"\n' +
        "  }\n" +
        "  (↑ זה מה שהשרת באמת מקבל!)",
      codeExample:
        "// חובה להפעיל middleware לפרסור JSON:\napp.use(express.json());\n\napp.post('/api/users', (req, res) => {\n  console.log(req.body.name);  // 'Tal'\n  console.log(req.body.email); // 'tal@mail.com'\n  // ... שמירת המשתמש\n});",
      codeExplanation:
        "express.json() הוא middleware שמפענח את ה-JSON מה-Body לאובייקט JavaScript רגיל. בלעדיו, req.body יהיה undefined.",
    },

    //  ─── C. Express ────────────────────────────────────────────────────

    // 19. Express
    {
      conceptName: "Express",
      levels: {
        grandma:
          "מלצר חכם שיושב בשרת ומנתב הזמנות. כשבקשה מגיעה הוא בודק מה ביקשו ושולח למטבח הנכון להכנת התשובה.",
        child:
          "הדוור החכם! כשמישהו שולח מכתב (בקשה), Express קורא את הכתובת ויודע בדיוק לאיפה לשלוח — הוא מסדר את כל התנועה.",
        soldier:
          "מוקדן הקשר. כל שיחה שנכנסת (Request) מנותבת על ידו לערוץ הנכון (Route), עם יכולת לבצע בדיקות ביניים (middleware) לפני העברה.",
        student:
          "Framework מינימליסטי ל-Node.js שמקל על בניית שרתי Web ו-API. מספק routing פשוט, middleware chain, ושיטות נוחות לטיפול ב-Request/Response.",
        junior:
          "לפני Express ניסיתי לבנות שרת עם http.createServer של Node ולפרסר URLs ידנית. Express הפך את הכל לשורה אחת: app.get('/path', handler).",
        professor:
          "Minimalist web framework שבנוי על Connect middleware stack. מממש את pattern של Middleware pipeline (onion model), תומך ב-sub-applications (Router), template engines, ו-configurable request pipeline.",
      },
      illustration:
        "🚂 Express — הפריימוורק שמניע את השרת:\n\n" +
        "  npm install express\n" +
        "       ↓\n" +
        "  const app = express();\n" +
        "  app.get('/', handler);\n" +
        "  app.listen(3000);\n" +
        "       ↓\n" +
        "  🖧 שרת חי ומוכן בפורט 3000!",
      codeExample:
        "const express = require('express');\nconst app = express();\n\napp.use(express.json());\n\napp.get('/', (req, res) => {\n  res.send('Welcome to my API!');\n});\n\napp.listen(3000);",
      codeExplanation:
        "ארבע שורות שהופכות מחשב לשרת: ייבוא Express, יצירת app, הגדרת route, והתחלת האזנה. זה כל מה שצריך.",
    },

    // 20. app
    {
      conceptName: "app",
      levels: {
        grandma:
          "ה-app הוא האפליקציה עצמה — הדלפק המרכזי שדרכו כל הפעולות עוברות. כל הזמנה חייבת לעבור דרכו.",
        child:
          "הבוס! הוא אחראי על הכל — הוא קובע מי עונה למה, מתי מפעילים סינונים, ומתי הכל מתחיל.",
        soldier:
          "מפקדת השטח. כל ההוראות נרשמות עליו, כל ערוצי הקשר עוברים דרכו, וכל פעולות הליבה מתקיימות תחתיו.",
        student:
          "האובייקט המרכזי ב-Express שמחזיק את כל ה-routes, middleware ו-settings. נוצר על ידי express() ומשמש להגדרת כל ההתנהגות של השרת.",
        junior:
          "כל דבר ב-Express מתחיל ב-app. — app.get, app.post, app.use, app.listen. הוא האובייקט שמרכז הכל.",
        professor:
          "Express application instance שמממש את EventEmitter. מבצע lazy initialization של Router, תומך ב-sub-apps עם app.use('/prefix', subApp), ומנהל settings ב-internal Map.",
      },
      illustration:
        "🏢 app — המרכז שמנהל הכל:\n\n" +
        "  const app = express();\n" +
        "  ┌────────────────────────┐\n" +
        "  │ app.use() → middleware │\n" +
        "  │ app.get() → routes    │\n" +
        "  │ app.listen() → start! │\n" +
        "  └────────────────────────┘",
      codeExample:
        "const express = require('express');\nconst app = express(); // ← נולד האובייקט המרכזי\n\n// עכשיו אפשר להגדיר עליו הכל:\napp.use(express.json()); // middleware\napp.get('/api', handler); // route\napp.listen(3000);         // הפעלה",
      codeExplanation:
        "express() מחזיר אובייקט app שמשמש כנקודת המוצא להכל. כל הגדרות השרת — routes, middleware, הפעלה — מתקיימות דרכו.",
    },

    // 21. port
    {
      conceptName: "port",
      levels: {
        grandma:
          "מספר הדלת בבניין. הבניין הוא המחשב, וכל תוכנה שרצה תופסת דלת אחרת. דלת 3000 שלנו, דלת 80 של האינטרנט.",
        child:
          "מספר הערוץ! כמו ערוצי טלוויזיה — ערוץ 3000 שלנו, ערוץ 80 של אתרי אינטרנט. צריך לדעת את המספר כדי לצפות.",
        soldier:
          "תדר שידור. כל שירות משדר על תדר אחר כדי שלא יהיו הפרעות. פורט 3000 הוא ה'תדר' המקומי של השרת שלנו.",
        student:
          "מספר (0-65535) שמזהה תהליך ספציפי במחשב. שני שרתים לא יכולים להאזין לאותו פורט. HTTP רץ על 80, HTTPS על 443, ואנחנו בפיתוח על 3000.",
        junior:
          "פעם קיבלתי EADDRINUSE. התברר ששרת ישן עדיין תופס את פורט 3000. למדתי לסגור תהליכים או לשנות פורט.",
        professor:
          "16-bit unsigned integer ב-TCP/UDP header. Well-known ports (0-1023) שמורים ל-system services. Ephemeral ports (49152-65535) מוקצים דינאמית. Binding דורש permissions ל-ports < 1024.",
      },
      illustration:
        "🚪 Port — מספר הדלת:\n\n" +
        "  מחשב אחד, הרבה שירותים:\n" +
        "  [Port 80]   → אתר (HTTP)\n" +
        "  [Port 443]  → אתר מוצפן (HTTPS)\n" +
        "  [Port 3000] → השרת שלנו!\n" +
        "  [Port 5432] → מסד נתונים",
      codeExample:
        "const PORT = process.env.PORT || 3000;\n\napp.listen(PORT, () => {\n  console.log(`Server running on port ${PORT}`);\n});",
      codeExplanation:
        "process.env.PORT מאפשר לשרת hosting לקבוע פורט. אם לא קיים — ברירת מחדל 3000. זה pattern סטנדרטי בפרויקטי Node.",
    },

    // 22. app.get
    {
      conceptName: "app.get",
      levels: {
        grandma:
          "הוראה למלצר: 'כשמישהו מבקש את התפריט — תביא לו אותו'. app.get אומר לשרת מה לעשות כשמישהו מבקש לצפות במשהו.",
        child:
          "כפתור 'הצג'! כשמישהו לוחץ על לינק, app.get יודע להראות לו את הדף הנכון.",
        soldier:
          "פקודת תצפית. הוראה שאומרת: 'כשמגיעה בקשת תצפית לנקודה X — השב כך וכך'.",
        student:
          "מגדיר route שמטפל בבקשות GET לנתיב מסוים. מקבל path ו-callback function עם (req, res). משמש לקריאת/הצגת נתונים.",
        junior:
          "app.get הוא הראשון שלמדתי ב-Express. פשוט ואלגנטי — נתיב + פונקציה שמחזירה תשובה. בזה בניתי את ה-API הראשון שלי.",
        professor:
          "מגדיר GET route handler ב-Express Router. תומך ב-multiple callbacks, route chaining, ו-parameterized paths. Express מבצע linear search על registered routes לפי סדר ההגדרה.",
      },
      illustration:
        "📖 app.get — הגדרת מה קורה כש'מבקשים לראות':\n\n" +
        "  app.get('/products', handler)\n" +
        "       ↕\n" +
        "  Client: GET /products\n" +
        "  Server: מפעיל את handler → שולח תשובה",
      codeExample:
        "app.get('/api/products', (req, res) => {\n  const products = [\n    { id: 1, name: 'Laptop', price: 999 },\n    { id: 2, name: 'Phone', price: 699 }\n  ];\n  res.json(products);\n});",
      codeExplanation:
        "כשדפדפן או Client שולח GET ל-/api/products, הפונקציה רצה ומחזירה JSON עם רשימת מוצרים.",
    },

    // 23. app.post
    {
      conceptName: "app.post",
      levels: {
        grandma:
          "הוראה למלצר: 'כשמישהו מביא הזמנה חדשה — תרשום אותה'. app.post מטפל בנתונים שנשלחים אלינו.",
        child:
          "כפתור 'שלח'! כשממלאים טופס ולוחצים 'שלח', app.post מקבל את מה ששלחו ושומר אותו.",
        soldier:
          "פקודת קליטה. כשמגיע דיווח חדש מהשטח (נתונים), app.post קולט אותו ומעבד.",
        student:
          "מגדיר route שמטפל בבקשות POST. המידע מגיע ב-req.body (צריך middleware כמו express.json()). משמש ליצירת משאבים חדשים.",
        junior:
          "הפעם הראשונה שקלטתי POST עם req.body ויצרתי משתמש חדש — הרגשתי שאני בונה backend אמיתי לראשונה.",
        professor:
          "POST handler ב-Express. בניגוד ל-GET, POST request מכיל body שדורש parsing. Express 4.16+ כולל express.json() built-in (מבוסס על body-parser).",
      },
      illustration:
        "📝 app.post — קבלת נתונים חדשים:\n\n" +
        "  Client שולח:\n" +
        "  POST /api/users { name:'Tal' }\n" +
        "       ↓\n" +
        "  app.post('/api/users', handler)\n" +
        "       ↓\n" +
        "  שרת יוצר משתמש חדש ← 201 Created",
      codeExample:
        "app.post('/api/users', (req, res) => {\n  const { name, email } = req.body;\n  const newUser = { id: Date.now(), name, email };\n  users.push(newUser);\n  res.status(201).json(newUser);\n});",
      codeExplanation:
        "מפרקים את req.body לשדות, יוצרים אובייקט חדש עם id ייחודי, שומרים, ומחזירים 201 + האובייקט שנוצר.",
    },

    // 24. app.listen
    {
      conceptName: "app.listen",
      levels: {
        grandma:
          "לפתוח את החנות! אחרי שהכנו הכל — עכשיו פותחים דלת ואומרים 'אפשר להיכנס'. app.listen מפעיל את השרת.",
        child:
          "כפתור ההפעלה! כמו להדליק את הטלוויזיה — בלי listen השרת לא מוכן לקבל אף אחד.",
        soldier:
          "פקודת 'כוננות!' — רק אחרי listen השרת מתחיל להאזין ולקבל בקשות. לפני כן הוא כבוי.",
        student:
          "מפעיל את השרת ומתחיל להאזין בפורט. מקבל מספר פורט ואופציונלית callback שרץ כשהשרת מוכן. זו תמיד השורה האחרונה בקוד.",
        junior:
          "app.listen(3000) → 'Server is running'. הרגע הראשון שראיתי את ההודעה הזו בטרמינל — הבנתי שבניתי שרת אמיתי.",
        professor:
          "Wrapper סביב http.createServer(app).listen(). מחזיר http.Server instance שתומך ב-close(), address() ו-upgrade events לתמיכה ב-WebSockets.",
      },
      illustration:
        "🏁 app.listen — הדלקת השרת:\n\n" +
        "  הכנות:      app.use(), app.get()...\n" +
        "  הפעלה:      app.listen(3000)\n" +
        "                   ↓\n" +
        "  🟢 'Server listening on port 3000'\n" +
        "  ✅ מוכן לקבל בקשות!",
      codeExample:
        "app.listen(3000, () => {\n  console.log('Server is running on http://localhost:3000');\n});",
      codeExplanation:
        "app.listen מפעיל את השרת על פורט 3000. ה-callback Option רץ ברגע שהשרת מוכן — שימושי להדפסת הודעת סטטוס.",
    },

    // 25. middleware
    {
      conceptName: "middleware",
      levels: {
        grandma:
          "שומר בכניסה למסעדה. לפני שהמלצר מגיש — השומר בודק שיש הזמנה, שמותר להיכנס, ורק אז נותן לעבור פנימה.",
        child:
          "מורה תורנית! לפני שנכנסים לכיתה היא בודקת: 'יש לך תעודה? לבוש נכון? אוקיי — אפשר להיכנס'. היא לא המורה עצמה, אלא הבדיקה לפני.",
        soldier:
          "בקרת כניסה. כל בקשה חייבת לעבור נקודות ביקורת לפני שמגיעה לטיפול. בדיקת הרשאות, פרסור נתונים, רישום ביומן.",
        student:
          "פונקציה שמקבלת (req, res, next) ורצה בין קבלת הבקשה לבין הטיפול ב-route. יכולה לשנות req/res, לסיים את התהליך, או לקרוא ל-next() כדי להמשיך.",
        junior:
          "הרגע שהבנתי middleware שינה הכל: אני יכול להוסיף logging, authentication, error handling — הכל בלי לגעת ב-routes עצמם.",
        professor:
          "מימוש של Chain of Responsibility pattern. פונקציות middleware נערמות ב-stack לפי סדר הגדרה. next() מפעיל את הבא בתור. Error middleware מקבל 4 פרמטרים (err, req, res, next).",
      },
      illustration:
        "🔗 Middleware — שרשרת בדיקות:\n\n" +
        "  Request ──→ [Logger] ──→ [Auth] ──→ [Parser] ──→ Route\n" +
        "              next()      next()     next()      res.send()\n\n" +
        "  כל middleware קורא next() כדי להעביר הלאה",
      codeExample:
        "// middleware פשוט ל-logging:\nconst logger = (req, res, next) => {\n  console.log(`${req.method} ${req.url}`);\n  next(); // חובה! בלי זה הבקשה תיתקע\n};\n\napp.use(logger); // מפעיל על כל הבקשות",
      codeExplanation:
        "Middleware רץ על כל בקשה (או על נתיבים ספציפיים). חובה לקרוא next() כדי להעביר את הבקשה הלאה — אחרת היא תיתקע לנצח.",
    },

    // 26. app.use
    {
      conceptName: "app.use",
      levels: {
        grandma:
          "להכריז: 'מעכשיו כל מי שנכנס חייב לעבור את הבדיקה הזו'. app.use מפעיל כלל גורף על כל הבקשות.",
        child:
          "הכלל הגדול! כמו שלט בכניסה לספרייה: 'כולם חייבים לשמור שקט'. app.use שם חוק שחל על כולם.",
        soldier:
          "פקודת כלל כוחות. הוראה שחלה על כל בקשה שנכנסת, ללא הבדלה. כמו פקודת מגן שכולם חייבים לעמוד בה.",
        student:
          "מגדיר middleware שירוץ על כל בקשה (או על prefix ספציפי). app.use(express.json()) — מפעיל parser על כל הבקשות. app.use('/api', router) — רק על /api.",
        junior:
          "app.use שם middleware 'ברמה גבוהה'. שמתי שם את express.json(), cors(), morgan() — וכל בקשה עוברת דרכם אוטומטית.",
        professor:
          "מוסיף middleware/sub-app ל-application stack. ללא path — חל על כל request. עם path — בודק prefix match (לא exact). סדר ההגדרה קריטי — Express מריץ middleware לפי סדר רישום.",
      },
      illustration:
        "⚙️ app.use — הפעלת כלל גורף:\n\n" +
        "  app.use(express.json())  → כל בקשה תפורסר\n" +
        "  app.use(cors())          → כל בקשה עם CORS\n" +
        "  app.use('/api', router)  → רק בקשות /api/*",
      codeExample:
        "// middleware גלובלי — רץ על כל בקשה:\napp.use(express.json());\napp.use(express.static('public'));\n\n// middleware לנתיב ספציפי:\napp.use('/api', (req, res, next) => {\n  console.log('API request received');\n  next();\n});",
      codeExplanation:
        "app.use בלי path רץ על הכל. עם path — רק על בקשות שמתחילות בנתיב הזה. זה הכלי לארגון middleware בצורה מסודרת.",
    },

    // 27. static files
    {
      conceptName: "static files",
      levels: {
        grandma:
          "המדף הפתוח בחנות. במקום שהמלצר יביא כל פעם — שמים את הלחם, הריבה והחמאה על מדף שכל אחד יכול לגשת אליו ישירות.",
        child:
          "תמונות, CSS, וקבצים שפשוט שוכבים שם ומחכים. לא צריך לבשל אותם — פשוט מגישים כמו שהם!",
        soldier:
          "ציוד חד-פעמי שלא צריך עיבוד — מסמכים, מפות, תמונות. מוגש ישירות מהמחסן ללא צורך בטיפול מיוחד.",
        student:
          "קבצים שהשרת מגיש ישירות ללקוח ללא עיבוד: HTML, CSS, JS, תמונות. Express מגיש אותם עם express.static('folder') שממפה תיקייה לגישה ציבורית.",
        junior:
          "ניסיתי לטעון CSS מהדפדפן וקיבלתי 404. רק כשהוספתי app.use(express.static('public')) — כל הקבצים בתיקיית public נהיו נגישים.",
        professor:
          "Built-in middleware שמבצע filesystem lookup ו-streaming של קבצים סטטיים. תומך ב-ETag, Last-Modified, Cache-Control headers. בפרודקשן מועדף CDN או Nginx לביצועים.",
      },
      illustration:
        "📁 Static Files — הגשה ישירה:\n\n" +
        "  תיקיית public/:\n" +
        "  ├── index.html\n" +
        "  ├── style.css\n" +
        "  └── logo.png\n" +
        "       ↓\n" +
        "  app.use(express.static('public'))\n" +
        "       ↓\n" +
        "  http://localhost:3000/style.css ← עובד!",
      codeExample:
        "// כל מה שבתיקיית 'public' יהיה נגיש מהדפדפן:\napp.use(express.static('public'));\n\n// עכשיו אפשר לגשת ישירות מהדפדפן:\n// http://localhost:3000/index.html\n// http://localhost:3000/style.css",
      codeExplanation:
        "express.static ממפה תיקייה פיזית לנגישות מהדפדפן. קבצים בתוך 'public' מוגשים כמו שהם — בלי route ובלי handler.",
    },

    // 28. body-parser
    {
      conceptName: "body-parser",
      levels: {
        grandma:
          "מתורגמן שפותח חבילות. כשמגיע Body — הוא פורס אותו מטקסט מוזר לאובייקט שאפשר לעבוד איתו.",
        child:
          "מפענח הצפנה! הנתונים מגיעים עטופים בחבילה — body-parser פותח את החבילה והופך את התוכן למשהו שאפשר לקרוא.",
        soldier:
          "יחידת פיענוח שיודעת לפתוח מטענים מוצפנים ולהפוך אותם למסמך קריא לטיפול.",
        student:
          "Middleware שמפרסר את ה-Body של בקשות HTTP. בגרסאות Express ישנות היה חבילה נפרדת, כיום מובנה: express.json() ל-JSON, express.urlencoded() לטפסים.",
        junior:
          "הייתי מתקין body-parser כחבילה נפרדת עד שגיליתי ש-Express 4.16+ כולל את זה built-in. פשוט express.json() ודי.",
        professor:
          "Content-Type aware parsing middleware. express.json() משתמש ב-JSON.parse. express.urlencoded({extended: true}) משתמש ב-qs library לפרסור nested objects מ-form submissions.",
      },
      illustration:
        "🔓 body-parser — פיענוח הנתונים:\n\n" +
        '  Raw Body: \'{"name":"Tal","age":25}\'\n' +
        "       ↓  (express.json())\n" +
        "  req.body: { name: 'Tal', age: 25 }\n" +
        "  ✅ עכשיו אפשר לגשת ל-req.body.name!",
      codeExample:
        "// דרך מודרנית (Express 4.16+):\napp.use(express.json()); // פרסור JSON\napp.use(express.urlencoded({ extended: true })); // פרסור טפסים\n\n// דרך ישנה (לא נדרשת יותר):\n// const bodyParser = require('body-parser');\n// app.use(bodyParser.json());",
      codeExplanation:
        "express.json() הוא ה-body-parser המובנה. בלעדיו, req.body יהיה undefined. extended: true מאפשר פרסור של אובייקטים מורכבים מטפסי HTML.",
    },

    // 29. Route
    {
      conceptName: "Route",
      levels: {
        grandma:
          "שלט ניווט. כמו שלט בכביש שאומר 'לירושלים — ימינה'. Route אומר לשרת: 'בקשות ל-/users — תטפל ככה'.",
        child:
          "מסלול! כמו מסלול רכבת — כל רכבת (בקשה) הולכת במסלול (route) שלה ומגיעה לתחנה הנכונה.",
        soldier:
          "נקודת ניתוב. כמו צומת עם שלט שמכוון לכיוונים שונים — כל בקשה מנותבת ל-handler הנכון.",
        student:
          "צמד של HTTP method + URL path שמגדיר endpoint ספציפי. GET /users ו-POST /users הם שני routes שונים באותו path. ב-Express מוגדר עם app.method(path, handler).",
        junior:
          "בהתחלה שמתי הכל ב-app.js. אחר כך למדתי לארגן routes בקבצים נפרדים עם express.Router() — הקוד נהיה נקי ומסודר.",
        professor:
          "Route מוגדר ב-Express כ-Layer object ב-Router stack עם path pattern, method mask, ו-handler function. Route matching מתבצע sequential — first match wins.",
      },
      illustration:
        "🛤️ Route — ניתוב בקשות:\n\n" +
        "  GET /users    → Route A → מחזיר רשימת משתמשים\n" +
        "  POST /users   → Route B → יוצר משתמש חדש\n" +
        "  GET /products → Route C → מחזיר מוצרים\n\n" +
        "  ⚠️ אותו path, method שונה = route שונה!",
      codeExample:
        "// routes מאורגנים:\napp.route('/api/users')\n  .get((req, res) => { res.json(users); })\n  .post((req, res) => { /* create */ });\n\n// או עם Router נפרד:\nconst router = express.Router();\nrouter.get('/', (req, res) => { /* ... */ });\napp.use('/api/users', router);",
      codeExplanation:
        "app.route מאפשר לשרשר methods על אותו path. express.Router() מאפשר לפצל routes לקבצים נפרדים — חיוני לפרויקטים גדולים.",
    },

    // 30. JSON (בהקשר Express)
    {
      conceptName: "JSON",
      levels: {
        grandma:
          "שפה אחידה להעברת מידע. כמו מילון אחיד שכל מדינה מבינה — ככה מחשבים שונים מעבירים נתונים ביניהם.",
        child:
          "הפורמט שבו מחשבים שולחים אחד לשני הודעות! כמו SMS עם חוקים ברורים: שם, ערך, שם, ערך.",
        soldier:
          "פורמט תקשורת סטנדרטי. כל צד שולח ומקבל נתונים באותה מתכונת — ללא צורך בתרגום או התאמה.",
        student:
          "JavaScript Object Notation — הפורמט הנפוץ ביותר ב-REST API. res.json() שולח אובייקט כ-JSON, express.json() קורא JSON מ-request body. קל לקריאה ולעיבוד.",
        junior:
          "כשהתחלתי ב-Express שלחתי res.send() עם strings. ברגע שעברתי ל-res.json() — ה-Content-Type נקבע אוטומטית ו-Client ידע לפרסר.",
        professor:
          "MIME type application/json. res.json() מבצע JSON.stringify עם replacer support, קובע Content-Type header, ותומך ב-JSONP callback. פרסור עם express.json() מגביל payload size (default 100kb).",
      },
      illustration:
        "📋 JSON ב-Express API:\n\n" +
        "  Request:\n" +
        '  POST /api/users  Body: {"name":"Tal"}\n' +
        "       ↓\n" +
        "  Response:\n" +
        '  res.json({ id: 1, name: "Tal" })\n' +
        "  → Content-Type: application/json",
      codeExample:
        "// שליחת JSON בתשובה:\napp.get('/api/status', (req, res) => {\n  res.json({\n    status: 'online',\n    users: 42,\n    version: '1.0.0'\n  });\n});\n// Content-Type: application/json נקבע אוטומטית",
      codeExplanation:
        "res.json() עושה שני דברים: ממיר אובייקט ל-JSON string ומגדיר את Content-Type ל-application/json. זה הפורמט הסטנדרטי ל-REST API.",
    },

    //  ─── D. Forms & Fetch ──────────────────────────────────────────────

    // 31. form
    {
      conceptName: "form",
      levels: {
        grandma:
          "טופס דיגיטלי. כמו טופס בבנק שממלאים שם, טלפון ותעודת זהות — רק שהוא על המסך ונשלח ללחיצת כפתור.",
        child:
          "דף עם שדות למילוי! כמו מבחן בבית ספר — ממלאים תשובות ולוחצים 'שלח'. הנתונים טסים לשרת.",
        soldier:
          "טופס דיווח. שדות מוגדרים מראש שהחייל ממלא ומגיש למפקדה. הפורמט אחיד כדי שהמערכת תדע לעבד.",
        student:
          "אלמנט HTML (<form>) שמאגד שדות קלט (input) ומאפשר שליחת נתונים לשרת. ה-action מגדיר לאן לשלוח, ה-method מגדיר GET או POST.",
        junior:
          "הפעם הראשונה שטופס שלח נתונים לשרת Express שלי ועשיתי req.body — הרגשתי שיש חיבור אמיתי בין הדפדפן לשרת.",
        professor:
          "HTML form element שמבצע HTTP submission עם Content-Type של application/x-www-form-urlencoded (default) או multipart/form-data (לקבצים). JS interceptors עם preventDefault() מאפשרים AJAX submission.",
      },
      illustration:
        "📋 Form — טופס HTML:\n\n" +
        '  <form action="/api/register" method="POST">\n' +
        '    <input name="username" />\n' +
        '    <input name="email" />\n' +
        "    <button>הרשמה</button>\n" +
        "  </form>\n" +
        "       ↓ לחיצה\n" +
        "  POST /api/register + body: { username, email }",
      codeExample:
        '<!-- HTML -->\n<form id="loginForm">\n  <input name="email" type="email" />\n  <input name="password" type="password" />\n  <button type="submit">התחבר</button>\n</form>',
      codeExplanation:
        "Form אוסף את כל ערכי ה-input ושולח אותם כ-body של HTTP request. ה-name attribute של כל input הופך למפתח באובייקט הנתונים.",
    },

    // 32. POST (method)
    {
      conceptName: "POST",
      levels: {
        grandma:
          "שליחת חבילה. כשרוצים לשלוח מידע חדש — משתמשים ב-POST. זה כמו לשלוח מכתב עם תוכן חשוב בתוכו.",
        child:
          "כפתור 'שלח'! POST לוקח את מה שמילאת בטופס ועוטף את זה בחבילה שטסה לשרת.",
        soldier:
          "שליחת דיווח מהשטח. הנתונים נשלחים בתוך גוף ההודעה (Body), לא בכתובת — כך שהם מוגנים יותר.",
        student:
          "HTTP Method לשליחת נתונים לשרת. הנתונים נשלחים ב-Body ולא ב-URL (בניגוד ל-GET). משמש ליצירת משאבים חדשים, שליחת טפסים, ו-login.",
        junior:
          "POST הוא ה-method שמשתמשים בו בטפסי login וregistration. הנתונים לא נראים ב-URL — חשוב לסיסמאות!",
        professor:
          "Non-idempotent method שנושא payload ב-message body. Content-Type header מגדיר את הפורמט (JSON, form-data, multipart). POST לא cacheable by default ולרוב מייצר side effects.",
      },
      illustration:
        "📤 POST — שליחת נתונים בגוף ההודעה:\n\n" +
        "  GET  /login?user=tal&pass=123 ← ⚠️ חשוף ב-URL!\n" +
        "  POST /login  Body: {user,pass} ← ✅ מוסתר\n\n" +
        "  POST = שליחת נתונים רגישים בצורה בטוחה",
      codeExample:
        "// שליחת POST מהדפדפן:\nfetch('/api/login', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ email: 'tal@mail.com', password: '1234' })\n});",
      codeExplanation:
        "ב-fetch צריך לציין method: 'POST', להגדיר Content-Type, ולהמיר את האובייקט ל-JSON string עם stringify. הנתונים עוברים ב-Body ולא ב-URL.",
    },

    // 33. GET (method)
    {
      conceptName: "GET",
      levels: {
        grandma:
          "בקשה לקבל. כמו לבקש מהספרן להביא ספר — לא משנים כלום, רק מבקשים לראות.",
        child:
          "כפתור 'הראה לי'! GET רק מביא מידע — הוא לא שולח, לא מוחק, לא משנה. רק צופה.",
        soldier: "פקודת תצפית. שואבים מידע מהמפקדה בלי לשנות כלום בשטח.",
        student:
          "ברירת המחדל של HTTP. כל כניסה לאתר היא GET. הפרמטרים מועברים ב-URL (query string). GET הוא safe ו-idempotent — לא משנה את מצב השרת.",
        junior:
          "GET הוא ה-method הכי פשוט — פשוט נכנסים לכתובת והדפדפן שולח GET אוטומטית. לא צריך fetch מיוחד.",
        professor:
          "Safe, idempotent, cacheable method. הדפדפן שומר GET responses ב-cache. Query parameters מוגבלים ב-URL length (~2048 chars). Conditional GET עם If-None-Match/If-Modified-Since מחזיר 304.",
      },
      illustration:
        "📥 GET — בקשה לקבלת מידע:\n\n" +
        "  הדפדפן שולח GET אוטומטית כש:\n" +
        "  🔗 לוחצים על לינק\n" +
        "  📝 כותבים URL בשורת הכתובת\n" +
        "  🔄 מרעננים דף\n\n" +
        "  GET = 'תן לי לראות, בלי לשנות'",
      codeExample:
        "// GET עם Query Parameters:\n// URL: /api/products?category=shoes&sort=price\n\napp.get('/api/products', (req, res) => {\n  const { category, sort } = req.query;\n  console.log(category); // 'shoes'\n  console.log(sort);     // 'price'\n});",
      codeExplanation:
        "ב-GET, הפרמטרים מועברים ב-URL אחרי סימן ?. Express חושף אותם דרך req.query כאובייקט מפורסר.",
    },

    // 34. event.preventDefault
    {
      conceptName: "event.preventDefault",
      levels: {
        grandma:
          "לעצור את הרובוט מלעשות מה שהוא רגיל. כשלוחצים 'שלח' בטופס — הדפדפן רוצה לרענן את הדף. preventDefault אומר לו: 'עצור! אני אטפל בעצמי'.",
        child:
          "כפתור 'המתן!' שעוצר את הדפדפן לפני שהוא עושה משהו אוטומטי. כמו לתפוס את הכדור לפני שהוא נופל.",
        soldier:
          "ביטול פקודת ברירת מחדל. המערכת רוצה לבצע פעולה אוטומטית — אנחנו עוצרים ומחליפים בפקודה שלנו.",
        student:
          "מתודה על אובייקט Event שמבטלת את ההתנהגות הדיפולטית. בטפסים — מונעת page refresh. בלינקים — מונעת ניווט. חיוני לשליחת טפסים עם fetch/AJAX.",
        junior:
          "כל פעם שהטופס נשלח הדף התרענן ואיבדתי את ה-state. preventDefault היה הפתרון — הטופס נשלח ב-AJAX בלי refresh.",
        professor:
          "Cancels the default action of a DOM event (submit, click, keypress). Does not stop propagation — for that use stopPropagation(). ב-passive event listeners (scroll) — preventDefault() ignored לביצועים.",
      },
      illustration:
        "🛑 preventDefault — עצור את ברירת המחדל:\n\n" +
        "  בלי preventDefault:\n" +
        "  [Submit] → דף מתרענן → 😱 הכל נעלם!\n\n" +
        "  עם preventDefault:\n" +
        "  [Submit] → fetch שולח AJAX → 😊 הדף נשאר!",
      codeExample:
        "document.getElementById('loginForm')\n  .addEventListener('submit', (event) => {\n    event.preventDefault(); // ← עוצר refresh!\n    \n    const formData = new FormData(event.target);\n    fetch('/api/login', {\n      method: 'POST',\n      body: JSON.stringify(Object.fromEntries(formData)),\n      headers: { 'Content-Type': 'application/json' }\n    });\n  });",
      codeExplanation:
        "preventDefault() מונע מהדפדפן לרענן את הדף כשהטופס נשלח. ככה אפשר לשלוח את הנתונים ב-fetch בלי לאבד את מצב הדף.",
    },

    // 35. Query Parameters
    {
      conceptName: "Query Parameters",
      levels: {
        grandma:
          "הערות קטנות שמוסיפים בסוף הכתובת. כמו להוסיף 'בלי סוכר' לסוף ההזמנה — פרטים נוספים שמדייקים את מה שביקשת.",
        child:
          "סינונים! כמו לחפש ביוטיוב 'חתולים' ואז לסנן רק 'היום' — ה-Query הוא הסינון הנוסף בסוף הכתובת.",
        soldier:
          "פרמטרי דיוק. לא משנים את היעד (Path) אלא מוסיפים תנאים: 'תביא רשימה, אבל רק מהיום, ורק חמישה'.",
        student:
          "זוגות key=value שמתווספים ל-URL אחרי ?. מופרדים ב-&. דוגמה: /search?q=express&page=2. ב-Express נגישים דרך req.query.",
        junior:
          "Query Parameters שימושיים לחיפוש, סינון, דפדוף ומיון. הם לא חלק מה-route עצמו — הם 'הערות שוליים'.",
        professor:
          "RFC 3986 מגדיר query component כ-?key=value&key2=value2. Express משתמש ב-qs library לפרסור (תומך nested objects). URLSearchParams API מודרני לטיפול client-side.",
      },
      illustration:
        "🔎 Query Parameters — סינון ב-URL:\n\n" +
        "  /api/products?category=shoes&sort=price&limit=10\n" +
        "                ─────────── ────────── ────────\n" +
        "                   key=val    key=val    key=val\n\n" +
        "  req.query = { category:'shoes', sort:'price', limit:'10' }",
      codeExample:
        "// URL: /api/search?q=javascript&page=2&limit=10\n\napp.get('/api/search', (req, res) => {\n  const { q, page, limit } = req.query;\n  console.log(q);     // 'javascript'\n  console.log(page);  // '2' (string!)\n  console.log(limit); // '10' (string!)\n  // ⚠️ תמיד מגיע כ-string, צריך להמיר למספר\n});",
      codeExplanation:
        "Query Parameters מגיעים תמיד כ-strings ב-req.query. אם צריכים מספר — חייבים להמיר: parseInt(req.query.page). שימושי לחיפוש, סינון ודפדוף.",
    },

    //  ─── E. Status Codes ───────────────────────────────────────────────

    // 36. Status Codes
    {
      conceptName: "Status Codes",
      levels: {
        grandma:
          "קוד תשובה. כמו שהמלצר אומר 'מוכן!' (200), 'אין לנו את זה' (404), או 'המטבח בוער' (500). מספר שמסכם מה קרה.",
        child:
          "ציון! כמו ציון במבחן — 200 = מעולה, 404 = לא מצאת, 500 = שגיאה גדולה. כל תשובה מהשרת מגיעה עם מספר.",
        soldier:
          "קוד מצב מבצעי. כל דיווח חוזר עם קוד: ירוק (2xx הצלחה), צהוב (3xx הפנייה), אדום (4xx/5xx שגיאה).",
        student:
          "מספר בן 3 ספרות שהשרת מחזיר עם כל Response. 1xx=Info, 2xx=הצלחה, 3xx=הפניה, 4xx=שגיאת Client, 5xx=שגיאת Server.",
        junior:
          "בהתחלה שלחתי תמיד 200. אחר כך למדתי להחזיר 201 ליצירה, 204 למחיקה, 400 לבקשה לא תקינה, 404 ללא נמצא.",
        professor:
          "HTTP Status Codes (RFC 7231) בנויים ב-5 classes. 2xx מייצג successful completion, 3xx redirection (301 Permanent, 302 Temporary), 4xx client errors, 5xx server errors. Custom error handlers ב-Express שולחים status codes מותאמים.",
      },
      illustration:
        "🚦 Status Codes — סיכום בשלושה מספרים:\n\n" +
        "  2xx 🟢 הצלחה:  200 OK, 201 Created, 204 No Content\n" +
        "  3xx 🟡 הפניה:  301 Moved, 302 Found\n" +
        "  4xx 🔴 שגיאת Client: 400 Bad Request, 404 Not Found\n" +
        "  5xx 💀 שגיאת Server: 500 Internal Error",
      codeExample:
        "// שימוש נכון ב-Status Codes:\napp.post('/api/users', (req, res) => {\n  if (!req.body.name) return res.status(400).json({ error: 'חסר שם' });\n  // ... create user\n  res.status(201).json(newUser); // Created!\n});\n\napp.get('/api/users/:id', (req, res) => {\n  const user = findUser(req.params.id);\n  if (!user) return res.status(404).json({ error: 'לא נמצא' });\n  res.json(user); // 200 by default\n});",
      codeExplanation:
        "כל סיטואציה דורשת status code מתאים: 201 ליצירה, 400 לקלט לא תקין, 404 כשלא נמצא. שימוש נכון הופך API לקריא ואמין.",
    },

    // 37. 1xx-2xx-3xx
    {
      conceptName: "1xx-2xx-3xx",
      levels: {
        grandma:
          "קודים 'חיוביים'. 1xx = 'רגע, אני עובד על זה', 2xx = 'הצלחה! הנה', 3xx = 'עברנו כתובת, בוא לפה'.",
        child:
          "הציונים הטובים! 200 = הכל בסדר!, 201 = יצרנו משהו חדש!, 301 = 'עברנו דירה, בוא לכתובת החדשה'.",
        soldier:
          "קודים ירוקים-צהובים. 2xx = משימה הושלמה בהצלחה. 3xx = הפניה ליעד חדש (המפקדה עברה מקום).",
        student:
          "100 Continue (המשך לשלוח), 200 OK (הצלחה), 201 Created (נוצר), 204 No Content (הצלחה בלי body), 301 Moved Permanently (הפניה קבועה), 304 Not Modified (cache תקף).",
        junior:
          "200 הוא ברירת המחדל. למדתי ש-201 חשוב ל-POST (Created), ו-204 ל-DELETE (הצלחה בלי תוכן). כל קוד מספר סיפור.",
        professor:
          "1xx Informational: 100 Continue (expect header), 101 Switching Protocols (WebSocket upgrade). 2xx Success: 200 OK, 201 Created (Location header), 204 No Content. 3xx Redirection: 301/308 Permanent, 302/307 Temporary, 304 Not Modified (conditional GET).",
      },
      illustration:
        "🟢 קודים חיוביים (1xx-3xx):\n\n" +
        "  200 OK          → 'הנה המידע שביקשת'\n" +
        "  201 Created     → 'יצרתי משהו חדש בשבילך'\n" +
        "  204 No Content  → 'עשיתי מה שביקשת, אין מה להחזיר'\n" +
        "  301 Moved       → 'עברנו! לך לכתובת החדשה'\n" +
        "  304 Not Modified→ 'לא השתנה, השתמש ב-cache'",
      codeExample:
        "// 200 - OK (ברירת מחדל)\nres.json(data);\n\n// 201 - Created (אחרי POST)\nres.status(201).json(newItem);\n\n// 204 - No Content (אחרי DELETE)\nres.status(204).send();\n\n// 301 - Redirect (הפניה)\nres.redirect(301, '/new-address');",
      codeExplanation:
        "200 הוא ברירת המחדל של res.json(). 201 חשוב אחרי יצירה, 204 אחרי מחיקה מוצלחת, ו-301 להפניה קבועה לכתובת חדשה.",
    },

    // 38. 4xx-5xx
    {
      conceptName: "4xx-5xx",
      levels: {
        grandma:
          "קודים 'שליליים'. 4xx = 'אתה עשית משהו לא נכון' (שלחת כתובת לא נכונה). 5xx = 'אני (השרת) התקלקלתי'.",
        child:
          "הציונים הרעים! 400 = 'שלחת משהו לא נכון', 404 = 'מה שחיפשת לא קיים', 500 = 'המחשב התרסק'.",
        soldier:
          "קודים אדומים. 4xx = שגיאה של השולח (בקשה פגומה). 5xx = שגיאה של המפקדה (השרת נפל).",
        student:
          "400 Bad Request (קלט לא תקין), 401 Unauthorized (לא מזוהה), 403 Forbidden (אין הרשאה), 404 Not Found (לא קיים), 500 Internal Server Error (באג בשרת).",
        junior:
          "400 vs 404 בלבל אותי. 400 = 'שלחת בקשה שבורה'. 404 = 'הנתיב או המשאב לא קיים'. 500 = באג שלי בקוד השרת.",
        professor:
          "4xx Client Error: 400 validation failure, 401 missing/invalid authentication, 403 authenticated but not authorized, 404 resource doesn't exist, 409 Conflict, 429 Rate Limited. 5xx Server Error: 500 unhandled exception, 502 Bad Gateway (reverse proxy), 503 Service Unavailable (overload/maintenance).",
      },
      illustration:
        "🔴 קודים שליליים (4xx-5xx):\n\n" +
        "  400 Bad Request  → 'הבקשה שלך שבורה'\n" +
        "  401 Unauthorized → 'מי אתה? תתחבר קודם'\n" +
        "  403 Forbidden    → 'אני יודע מי אתה, אבל אין לך הרשאה'\n" +
        "  404 Not Found    → 'מה שביקשת לא קיים'\n" +
        "  500 Server Error → 'אני (השרת) התרסקתי'",
      codeExample:
        "// 400 - Bad Request (קלט שגוי)\nif (!req.body.email) return res.status(400).json({ error: 'חסר email' });\n\n// 401 - Unauthorized (לא מחובר)\nif (!req.headers.authorization) return res.status(401).json({ error: 'נדרשת התחברות' });\n\n// 404 - Not Found\nif (!user) return res.status(404).json({ error: 'משתמש לא נמצא' });\n\n// 500 - Server Error (נתפס ב-catch)\napp.use((err, req, res, next) => {\n  res.status(500).json({ error: 'שגיאת שרת פנימית' });\n});",
      codeExplanation:
        "כל שגיאה דורשת קוד מתאים: 400 לקלט רע, 401 ל-auth חסר, 404 למשאב לא קיים, 500 לבאגים. error middleware עם 4 פרמטרים תופס שגיאות לא צפויות.",
    },
  ],

  // ─── שאלון (10 שאלות) ────────────────────────────────────────────────
  quiz: [
    {
      question: "מה ההבדל העיקרי בין GET ל-POST?",
      options: [
        "GET שולח נתונים ב-Body ו-POST ב-URL",
        "GET מביא מידע מהשרת ו-POST שולח מידע לשרת (ב-Body)",
        "GET הוא מהיר יותר ו-POST איטי יותר",
        "אין הבדל, שניהם עושים את אותו הדבר",
      ],
      correct: 1,
      explanation:
        "GET משמש לקריאת מידע (הפרמטרים ב-URL), ואילו POST משמש לשליחת מידע חדש לשרת (הנתונים ב-Body, מוגנים יותר).",
    },
    {
      question: "מה זה REST API?",
      options: [
        "ספריית JavaScript לבניית אתרים",
        "מסד נתונים שמנהל משתמשים",
        "סגנון ארכיטקטוני לתכנון API שמשתמש ב-HTTP methods לביצוע פעולות CRUD על משאבים",
        "שפת תכנות חדשה לפיתוח שרתים",
      ],
      correct: 2,
      explanation:
        "REST הוא סגנון עיצובי שבו URL מייצג משאב (כמו /users), וה-HTTP method (GET/POST/PUT/DELETE) מגדיר את הפעולה — תפריט אחיד ומסודר.",
    },
    {
      question: "מה עושה middleware ב-Express?",
      options: [
        "מייצר HTML דינמי מהנתונים",
        "פונקציה שרצה בין קבלת הבקשה לטיפול ב-Route, יכולה לבדוק, לשנות או לעצור",
        "מתחבר למסד נתונים אוטומטית",
        "מצפין את התקשורת בין Client ל-Server",
      ],
      correct: 1,
      explanation:
        "Middleware הוא פונקציה (req, res, next) שרצה לפני ה-Route handler. היא יכולה לבצע logging, authentication, parsing ועוד — וחייבת לקרוא next() כדי להעביר הלאה.",
    },
    {
      question: "מה מייצג Status Code 404?",
      options: [
        "הבקשה הצליחה",
        "השרת התרסק",
        "המשאב המבוקש לא נמצא בשרת",
        "הלקוח לא מורשה לגשת",
      ],
      correct: 2,
      explanation:
        "404 Not Found אומר שה-URL שביקשת לא מוביל לשום דבר — המשאב לא קיים. זה שגיאת Client (4xx) כי הלקוח ביקש משהו שלא קיים.",
    },
    {
      question: "מה עושה הפקודה app.listen() ב-Express?",
      options: [
        "מגדירה Route חדש",
        "מפעילה את השרת ומתחילה להאזין לבקשות בפורט מסוים",
        "מתחברת למסד נתונים",
        "יוצרת קובץ HTML חדש",
      ],
      correct: 1,
      explanation:
        "app.listen(3000) מפעיל את השרת ומתחיל להאזין בפורט 3000. בלי listen — השרת לא פעיל ולא עונה לאף בקשה. זו תמיד השורה האחרונה.",
    },
    {
      question: "מה עושה express.json() (body-parser)?",
      options: [
        "שולח JSON ל-Client",
        "יוצר קבצי JSON על השרת",
        "Middleware שמפרסר את ה-Body של בקשות HTTP מ-JSON לאובייקט JavaScript",
        "ממיר HTML ל-JSON",
      ],
      correct: 2,
      explanation:
        "express.json() הוא middleware שמפענח את ה-Body שמגיע כ-JSON string לאובייקט JS בתוך req.body. בלעדיו, req.body יהיה undefined.",
    },
    {
      question: "מה ההבדל בין PUT ל-DELETE ב-REST API?",
      options: [
        "PUT מוחק ו-DELETE מעדכן",
        "PUT מעדכן/מחליף משאב קיים, DELETE מוחק משאב",
        "שניהם מוחקים נתונים",
        "PUT יוצר נתון חדש ו-DELETE מרענן",
      ],
      correct: 1,
      explanation:
        "PUT משמש לעדכון/החלפה של משאב קיים (שולח את הגרסה החדשה ב-Body). DELETE מסיר משאב לחלוטין. שניהם דורשים id ב-URL.",
    },
    {
      question: "מה זה Query Parameters ואיך הם נראים?",
      options: [
        "נתונים שנשלחים ב-Body של POST",
        "פרמטרים שמופיעים ב-URL אחרי סימן ? בפורמט key=value&key2=value2",
        "Headers מיוחדים שנשלחים עם כל בקשה",
        "שם אחר ל-Route Parameters",
      ],
      correct: 1,
      explanation:
        "Query Parameters מצורפים ל-URL: /search?q=express&page=2. ב-Express נגישים דרך req.query. הם שימושיים לחיפוש, סינון ומיון.",
    },
    {
      question: "מה עושה event.preventDefault() בטפסים?",
      options: [
        "מונע מהדפדפן לרענן את הדף כשטופס נשלח, כדי שנוכל לשלוח ב-AJAX",
        "מוחק את כל הנתונים מהטופס",
        "מונע מהמשתמש להקליד בשדות",
        "סוגר את הדפדפן",
      ],
      correct: 0,
      explanation:
        "ברירת המחדל של form submit היא לרענן את הדף. preventDefault() מבטל את זה כדי שנוכל לשלוח את הנתונים ב-fetch/AJAX בלי לאבד את מצב הדף.",
    },
    {
      question: "מה ההבדל בין Route ל-URL?",
      options: [
        "אין הבדל, הם אותו דבר",
        "URL הוא הכתובת המלאה, Route הוא הגדרת הניתוב בשרת (method + path + handler)",
        "Route הוא הכתובת ו-URL הוא פונקציה",
        "URL משמש רק בדפדפן ו-Route רק בוואטסאפ",
      ],
      correct: 1,
      explanation:
        "URL הוא כתובת שה-Client שולח (https://site.com/api/users). Route הוא ההגדרה בשרת שאומרת: 'כשמגיע GET ל-/api/users — הריצי את הפונקציה הזו'.",
    },
  ],
};
