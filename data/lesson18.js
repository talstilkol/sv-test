// data/lesson18.js
var LESSON_18 = {
  id: "lesson_18",
  title: "שיעור 18 - שיעורי בית Node/Express: טפסים, ולידציה ואחסון",
  description:
    "תרגול מעשי של בניית שרת Express מלא עם טיפול בטפסי הרשמה, ולידציה בצד שרת, ואחסון נתונים. מחברים את כל החלקים שלמדנו לאפליקציה עובדת.",
  concepts: [
    // 1. Node.js (חזרה בהקשר מעשי)
    {
      conceptName: "Node.js",
      difficulty: 6,
      levels: {
        grandma:
          "המנוע שמריץ את הקוד שלנו מחוץ לדפדפן. כמו מפעל שמייצר תשובות — המחשב שלנו הופך לשרת פעיל.",
        child:
          "הכוח שגורם למחשב שלך להפוך לשרת אמיתי! בלי Node, ה-JavaScript שלך יכול לרוץ רק בדפדפן.",
        soldier:
          "סביבת ההרצה החיצונית. מאפשרת לקוד JS לפעול מחוץ לגבולות הדפדפן עם גישה למערכת קבצים ורשת.",
        student:
          "סביבת ריצה מבוססת V8 שמאפשרת הרצת JS בצד שרת. בשיעורי בית נשתמש בה להקמת שרת Express שמקבל נתונים מטפסים.",
        junior:
          "בפרויקט הזה Node הוא הבסיס — מריץ את שרת Express שמטפל בטפסי הרשמה. כל ה-backend בנוי עליו.",
        professor:
          "V8-based runtime עם libuv event loop. בהקשר של שיעורי הבית — משמש כ-HTTP server runtime שמנהל incoming connections ומעבד form submissions באופן אסינכרוני.",
      },
      illustration:
        "🚀 Node.js בפרויקט:\n\n" +
        "  📝 טופס HTML (Client)\n" +
        "       ↓ POST\n" +
        "  🖧 Node.js + Express (Server)\n" +
        "       ↓\n" +
        "  💾 שמירת נתונים",
      codeExample:
        "// הרצת הפרויקט:\n// $ npm init -y\n// $ npm install express\n// $ node server.js\n\nconsole.log('Node.js version:', process.version);",
      codeExplanation:
        "הפרויקט מתחיל ב-npm init ליצירת package.json, התקנת Express, והרצת הקובץ הראשי עם node.",
    },

    // 2. Express
    {
      conceptName: "Express",
      difficulty: 6,
      levels: {
        grandma:
          "המלצר החכם שמקבל הזמנות (בקשות) ומנתב אותן למטבח הנכון (פונקציה נכונה).",
        child:
          "הדוור שיודע בדיוק לאן לשלוח כל מכתב שמגיע! הוא מסדר את כל התנועה בשרת.",
        soldier: "מוקדן הקשר שמנתב כל בקשה לערוץ הטיפול הנכון.",
        student:
          "Framework שמקל על בניית שרתי Web. בפרויקט הזה נגדיר routes לדפי HTML ול-API endpoint שמקבל נתוני טופס.",
        junior:
          "Express הופך בניית שרת ל-3 שורות. בפרויקט הזה יש לנו route ל-GET (הצגת טופס) ו-POST (קבלת נתונים).",
        professor:
          "Middleware-based framework. בפרויקט: express.static() להגשת HTML, express.urlencoded() לפרסור form data, ו-custom routes ל-CRUD operations.",
      },
      illustration:
        "🚂 Express בפרויקט:\n\n" +
        "  app.use(express.static('public')) → טפסי HTML\n" +
        "  app.use(express.urlencoded())     → פרסור טפסים\n" +
        "  app.post('/register', handler)    → קבלת נתונים",
      codeExample:
        "const express = require('express');\nconst app = express();\n\napp.use(express.static('public'));\napp.use(express.urlencoded({ extended: true }));\napp.use(express.json());\n\napp.listen(3000, () => console.log('Server on port 3000'));",
      codeExplanation:
        "שלד הפרויקט: Express עם middleware להגשת קבצים סטטיים (HTML/CSS) ופרסור של body מטפסים ומ-JSON.",
    },

    // 3. server
    {
      conceptName: "server",
      difficulty: 6,
      levels: {
        grandma:
          "המחשב שמחכה שמישהו יבקש ממנו משהו ואז עונה. כמו מרכזנית בטלפון.",
        child: "המחשב העוצמתי שיושב ומחכה! כשנשלחת בקשה — הוא מחפש ועונה.",
        soldier: "המפקדה שמקבלת דיווחים ומחזירה הוראות.",
        student:
          "תהליך שמאזין בפורט מסוים ומטפל בבקשות HTTP. בפרויקט — server.js הוא הקובץ המרכזי שמריץ את כל הלוגיקה.",
        junior:
          "server.js הוא ה-entry point. הוא מגדיר את כל ה-routes ומפעיל את ה-listening. כל שינוי בקוד דורש restart (או nodemon).",
        professor:
          "HTTP server instance שנוצר על ידי Express. bind() על port, מקבל TCP connections, ומפעיל middleware pipeline על כל incoming request.",
      },
      illustration:
        "🖧 Server — הלב של הפרויקט:\n\n" +
        "  server.js\n" +
        "  ├── middleware setup\n" +
        "  ├── GET /          → שולח טופס HTML\n" +
        "  ├── POST /register → מקבל נתוני הרשמה\n" +
        "  └── app.listen(3000)",
      codeExample:
        "// server.js — קובץ השרת המרכזי\nconst express = require('express');\nconst app = express();\n\n// middleware & routes here...\n\napp.listen(3000, () => {\n  console.log('Server running at http://localhost:3000');\n});",
      codeExplanation:
        "server.js הוא ליבת הפרויקט. כל ה-middleware, routes, ו-logic מוגדרים בו, וה-listen בסוף מפעיל הכל.",
    },

    // 4. route
    {
      conceptName: "route",
      difficulty: 6,
      levels: {
        grandma: "שלט ניווט שאומר: 'בקשות מסוג כזה — טפלו ככה'.",
        child: "מסלול! כל בקשה הולכת במסלול שלה לתחנה הנכונה.",
        soldier: "נתיב ניווט — כל פנייה מנותבת ל-handler המתאים.",
        student:
          "צמד method + path שמגדיר endpoint. GET / מציג טופס, POST /register מעבד נתונים. כל route מקבל callback עם req, res.",
        junior:
          "בפרויקט יש לפחות 2 routes: אחד להצגת הטופס ואחד לקבלת הנתונים. חשוב שה-action בטופס תתאים ל-route בשרת.",
        professor:
          "Route layer ב-Express router stack. Pattern matching מתבצע sequentially. Parameterized routes (:id) ו-regex patterns נתמכים.",
      },
      illustration:
        "🛤️ Routes בפרויקט:\n\n" +
        "  GET  /           → הצגת דף הרשמה\n" +
        "  POST /register   → עיבוד טופס הרשמה\n" +
        "  GET  /users      → הצגת כל המשתמשים",
      codeExample:
        "// Route להצגת טופס\napp.get('/', (req, res) => {\n  res.sendFile(__dirname + '/public/register.html');\n});\n\n// Route לעיבוד טופס\napp.post('/register', (req, res) => {\n  const { username, email, password } = req.body;\n  // validation + storage\n});",
      codeExplanation:
        "כל route מגדיר 'מה לעשות כשמגיעה בקשה מסוג X לנתיב Y'. GET / מציג טופס, POST /register מעבד את הנתונים שנשלחו.",
    },

    // 5. GET
    {
      conceptName: "GET",
      difficulty: 6,
      levels: {
        grandma: "בקשה לראות. כמו להסתכל על תפריט בלי להזמין.",
        child: "כפתור 'הראה לי'! GET רק מביא — לא שולח, לא מוחק.",
        soldier: "פקודת תצפית ללא שינוי בשטח.",
        student:
          "Method שמביא מידע מהשרת. בפרויקט — GET / מביא את דף ההרשמה, GET /users מביא רשימת משתמשים.",
        junior:
          "כל כניסה לדף בדפדפן היא GET. הטופס מוצג ב-GET, הנתונים נשלחים ב-POST.",
        professor:
          "Safe, idempotent, cacheable. ב-form context, GET מעביר פרמטרים ב-URL query string — לא מתאים לנתונים רגישים.",
      },
      illustration:
        "📥 GET בפרויקט:\n\n  דפדפן → GET / → שרת שולח טופס HTML\n  דפדפן → GET /users → שרת שולח רשימת משתמשים",
      codeExample:
        "app.get('/users', (req, res) => {\n  res.json(users); // מחזיר את כל המשתמשים הרשומים\n});",
      codeExplanation:
        "GET /users מחזיר את מערך המשתמשים כ-JSON. אין שינוי בנתונים — רק קריאה.",
    },

    // 6. POST
    {
      conceptName: "POST",
      difficulty: 6,
      levels: {
        grandma: "שליחת טופס מלא. כמו להגיש טופס הרשמה עם כל הפרטים.",
        child: "כפתור 'שלח'! POST לוקח את מה שמילאת ושולח לשרת.",
        soldier: "שליחת דיווח מהשטח עם נתונים בגוף ההודעה.",
        student:
          "Method שנושא נתונים ב-Body. בפרויקט — טופס ההרשמה שולח POST עם username, email, password.",
        junior:
          "POST הוא ה-method לטפסי הרשמה. הנתונים מוסתרים ב-Body ולא ב-URL — חשוב לסיסמאות.",
        professor:
          "Non-idempotent method. Content-Type: application/x-www-form-urlencoded (HTML forms) או application/json (fetch). Express parses both עם middleware מתאים.",
      },
      illustration:
        "📤 POST בפרויקט:\n\n  טופס הרשמה → POST /register\n  Body: { username: 'tal', email: 'tal@mail.com', password: '***' }\n       ↓\n  שרת מעבד → ולידציה → שמירה → תשובה",
      codeExample:
        "app.post('/register', (req, res) => {\n  const { username, email, password } = req.body;\n  \n  // ולידציה\n  if (!username || !email || !password) {\n    return res.status(400).json({ error: 'כל השדות חובה' });\n  }\n  \n  // שמירה\n  users.push({ username, email, password });\n  res.status(201).json({ message: 'נרשמת בהצלחה!' });\n});",
      codeExplanation:
        "POST /register מקבל נתונים מטופס, מבצע ולידציה בסיסית, שומר למערך, ומחזיר תשובה מתאימה.",
    },

    // 7. form
    {
      conceptName: "form",
      difficulty: 6,
      levels: {
        grandma: "טופס שממלאים ומגישים. שם, מייל, סיסמה — ולוחצים 'שלח'.",
        child: "דף עם שדות למילוי כמו מבחן! ממלאים ולוחצים 'הרשמה'.",
        soldier: "טופס דיווח עם שדות מוגדרים מראש למילוי תקני.",
        student:
          "אלמנט <form> ב-HTML עם input fields. ה-action מפנה ל-route בשרת, ה-method קובע GET או POST. ה-name attribute הוא המפתח ב-req.body.",
        junior:
          "חובה לשים name לכל input — בלי זה req.body לא יכיל את השדה. action='/register' + method='POST' → שולח ל-POST /register בשרת.",
        professor:
          "HTML form submission מייצר HTTP request עם Content-Type: application/x-www-form-urlencoded. FormData API מאפשר JS-based submission עם file upload support (multipart/form-data).",
      },
      illustration:
        "📋 Form — טופס הרשמה:\n\n  <form action='/register' method='POST'>\n    [username] [email] [password]\n    [הרשמה]\n  </form>\n       ↓ POST /register\n  req.body = { username, email, password }",
      codeExample:
        '<!-- public/register.html -->\n<form action="/register" method="POST">\n  <input name="username" placeholder="שם משתמש" required />\n  <input name="email" type="email" placeholder="אימייל" required />\n  <input name="password" type="password" placeholder="סיסמה" required />\n  <button type="submit">הרשמה</button>\n</form>',
      codeExplanation:
        "כל input חייב name — זה מה שמופיע ב-req.body בשרת. action='/register' קובע לאן לשלוח. method='POST' מסתיר נתונים ב-Body.",
    },

    // 8. validation
    {
      conceptName: "validation",
      difficulty: 6,
      levels: {
        grandma:
          "לבדוק שהמצרכים טריים לפני שמתחילים לבשל. אם חסר ביצה או שהחלב מקולקל — לא מתחילים!",
        child: "מורה שבודקת שהשם שלך כתוב נכון לפני שמקבלת את המבחן!",
        soldier: "בדיקת ציוד לפני יציאה. אם חסר משהו — לא יוצאים למבצע.",
        student:
          "בדיקת תקינות של קלט לפני עיבוד. Client-side (HTML required, pattern) ו-Server-side (בדיקת req.body). תמיד לעשות validation בשרת — ה-Client אפשר לעקוף!",
        junior:
          "למדתי בדרך הקשה: validation רק ב-Client אינו מספיק. כל אחד יכול לשלוח POST ישירות ולעקוף את הטופס. ולידציה בשרת היא חובה.",
        professor:
          "Defense-in-depth: client-side validation ל-UX (immediate feedback), server-side validation ל-security (cannot be bypassed). Libraries: Joi, Yup, express-validator. Sanitization against XSS/injection.",
      },
      illustration:
        "✅ Validation — בדיקת תקינות:\n\n  Client-side: <input required type='email' />\n  ↓ (ניתן לעקוף!)\n  Server-side: if(!email.includes('@')) error!\n  ↓ (לא ניתן לעקוף ✅)\n\n  ⚠️ תמיד לעשות validation בשרת!",
      codeExample:
        "function validateUser(body) {\n  const errors = [];\n  if (!body.username || body.username.length < 2)\n    errors.push('שם משתמש חייב להכיל לפחות 2 תווים');\n  if (!body.email || !body.email.includes('@'))\n    errors.push('אימייל לא תקין');\n  if (!body.password || body.password.length < 6)\n    errors.push('סיסמה חייבת להכיל לפחות 6 תווים');\n  return errors;\n}",
      codeExplanation:
        "פונקציית ולידציה בודקת כל שדה ומחזירה מערך שגיאות. אם המערך ריק — הכל תקין. אם לא — מחזירים 400 עם השגיאות.",
    },

    // 9. username
    {
      conceptName: "username",
      difficulty: 6,
      levels: {
        grandma:
          "השם שבוחרים לעצמנו באתר. כמו כינוי — לא השם האמיתי, אלא איך שאנחנו רוצים שיקראו לנו.",
        child: "השם שלך במשחק! כמו 'NinjaKid123' — זה מה שכולם רואים.",
        soldier: "שם קוד. מזהה ייחודי שמשמש לזיהוי בלי לחשוף פרטים אישיים.",
        student:
          "מזהה טקסטואלי ייחודי למשתמש. בולידציה נבדוק: לא ריק, אורך מינימלי, ולפעמים — שלא קיים כבר במערכת (uniqueness).",
        junior:
          "חשוב לוודא שה-username ייחודי. אם שני משתמשים עם אותו שם — יהיה בלאגן. users.find(u => u.username === newName) לפני שמירה.",
        professor:
          "String identifier שדורש sanitization (strip HTML/scripts), uniqueness constraint (case-insensitive comparison), ו-character validation (regex whitelist). בפרודקשן — indexed field ב-DB.",
      },
      illustration:
        "👤 Username — בדיקות נדרשות:\n\n  ✅ אורך מינימלי (2+ תווים)\n  ✅ לא ריק\n  ✅ ייחודי (לא קיים כבר)\n  ✅ ללא תווים מיוחדים",
      codeExample:
        "// בדיקת username\nif (!username || username.length < 2) {\n  return res.status(400).json({ error: 'שם משתמש קצר מדי' });\n}\nif (users.find(u => u.username === username)) {\n  return res.status(409).json({ error: 'שם משתמש תפוס' });\n}",
      codeExplanation:
        "בודקים שה-username לא ריק, באורך מינימלי, וייחודי (לא קיים כבר). 409 Conflict = כבר תפוס.",
    },

    // 10. email
    {
      conceptName: "email",
      difficulty: 6,
      levels: {
        grandma:
          "כתובת הדואר האלקטרוני. כמו כתובת דואר — חייבת להיות עם @ ונקודה.",
        child:
          "הכתובת הדיגיטלית שלך! חייבת להיות עם @ ונקודה כמו tal@gmail.com.",
        soldier:
          "ערוץ תקשורת מזוהה. כתובת מייל תקנית משמשת לזיהוי ולשחזור סיסמאות.",
        student:
          "שדה שדורש ולידציה מיוחדת: פורמט עם @, לפחות נקודה אחת. HTML type='email' עושה ולידציה בסיסית, אבל בשרת חייבים לבדוק שוב.",
        junior:
          "regex פשוט למייל: /.+@.+\\..+/ מספיק לרוב המקרים. ב-production משתמשים בספריות ולידציה מקצועיות.",
        professor:
          "RFC 5322 מגדיר email format (local-part@domain). Validation מושלמת היא כמעט בלתי אפשרית ב-regex. Best practice: basic format check + confirmation email.",
      },
      illustration:
        "📧 Email — בדיקת פורמט:\n\n  ✅ tal@gmail.com\n  ✅ user123@company.co.il\n  ❌ talgmail.com (חסר @)\n  ❌ tal@gmail (חסרה נקודה)",
      codeExample:
        "// ולידציה בסיסית למייל:\nfunction isValidEmail(email) {\n  return email && email.includes('@') && email.includes('.');\n}\n\n// או regex פשוט:\nconst emailRegex = /.+@.+\\..+/;\nif (!emailRegex.test(email)) {\n  return res.status(400).json({ error: 'אימייל לא תקין' });\n}",
      codeExplanation:
        "בדיקה שהמייל מכיל @ ונקודה. לא צריך regex מסובך — בדיקה בסיסית + מייל אישור בפרודקשן.",
    },

    // 11. password
    {
      conceptName: "password",
      difficulty: 6,
      levels: {
        grandma:
          "המנעול על הדלת. סיסמה טובה היא כמו מנעול חזק — ארוכה ומורכבת.",
        child:
          "הקוד הסודי! רק אתה אמור לדעת אותו. ככל שהוא ארוך יותר — הוא חזק יותר.",
        soldier: "קוד כניסה לבסיס. חייב להיות חזק, לא לחלוק, ולהחליף כל תקופה.",
        student:
          "שדה רגיש שדורש: אורך מינימלי (6+), לעולם לא לשמור כטקסט פתוח (plaintext)! ב-production חייבים hashing עם bcrypt.",
        junior:
          "הטעות הכי גדולה: לשמור סיסמאות כ-plaintext. גם בפרויקט תרגול — טוב להתרגל ל-hash. בשיעורי בית — לפחות אורך מינימלי.",
        professor:
          "Password security: bcrypt/scrypt hashing עם salt, cost factor Adaptive, timing-safe comparison. NIST 800-63B: minimum 8 chars, no composition rules, check against breached databases.",
      },
      illustration:
        "🔒 Password — אבטחה:\n\n  ❌ שמירה כטקסט: password = '123456'\n  ✅ שמירה כ-hash:  password = '$2b$10$X8k...'\n\n  בשיעורי בית: לפחות ולידציה על אורך!\n  בפרודקשן: bcrypt.hash() חובה!",
      codeExample:
        "// ולידציה בסיסית (שיעורי בית):\nif (!password || password.length < 6) {\n  return res.status(400).json({ error: 'סיסמה חייבת 6+ תווים' });\n}\n\n// בפרודקשן:\n// const bcrypt = require('bcrypt');\n// const hashed = await bcrypt.hash(password, 10);\n// users.push({ username, email, password: hashed });",
      codeExplanation:
        "בשיעורי בית — בודקים אורך מינימלי. בפרודקשן — חובה hash עם bcrypt. לעולם לא לשמור סיסמה כטקסט גלוי!",
    },

    // 12. server-side storage
    {
      conceptName: "server-side storage",
      difficulty: 6,
      levels: {
        grandma:
          "להכניס את הכרטיסיות למגירה. אחרי שמילאו טופס — שומרים את הפרטים במקום בטוח בשרת.",
        child:
          "הקופסה שבה שומרים את כל הכרטיסים! כל מי שנרשם מקבל כרטיס בקופסה.",
        soldier: "ארכיון המפקדה. כל הדיווחים נשמרים במאגר מרכזי.",
        student:
          "אחסון נתונים בצד שרת. בפרויקט זה — מערך JavaScript בזיכרון (let users = []). בפרויקטים אמיתיים — מסד נתונים (MongoDB, PostgreSQL).",
        junior:
          "מערך בזיכרון נמחק כשהשרת נכבה! זה מספיק לתרגול, אבל בפרודקשן חייבים DB. אפשר גם לשמור לקובץ JSON זמנית.",
        professor:
          "In-memory storage (Array/Map) לפרוטוטייפ. Persistent storage: file-based (JSON), embedded DB (SQLite, nedb), או managed DB (MongoDB Atlas, PostgreSQL). ב-production: ACID compliance, connection pooling, migrations.",
      },
      illustration:
        "💾 Server-side Storage:\n\n  שיעורי בית:  let users = [] (זיכרון)\n                ⚠️ נמחק בכיבוי שרת!\n\n  פרודקשן:     MongoDB / PostgreSQL (דיסק)\n                ✅ נשמר לנצח!",
      codeExample:
        "// אחסון בזיכרון (שיעורי בית)\nlet users = [];\n\napp.post('/register', (req, res) => {\n  const { username, email, password } = req.body;\n  users.push({ id: Date.now(), username, email, password });\n  res.status(201).json({ message: 'נרשמת!' });\n});\n\napp.get('/users', (req, res) => {\n  // מחזירים בלי סיסמאות!\n  const safe = users.map(({ password, ...u }) => u);\n  res.json(safe);\n});",
      codeExplanation:
        "שומרים למערך בזיכרון. חשוב: ב-GET /users מחזירים ללא סיסמאות (spread + destructuring). בפרודקשן — MongoDB.",
    },
  ],

  quiz: [
    {
      question: "למה חשוב לעשות ולידציה בצד שרת ולא רק בצד Client?",
      options: [
        "כי ב-Client אין JavaScript",
        "כי ולידציה בצד Client ניתנת לעקיפה — כל אחד יכול לשלוח POST ישירות ולדלג על הטופס",
        "כי הדפדפן לא תומך בולידציה",
        "אין סיבה, מספיק ולידציה ב-Client",
      ],
      correct: 1,
      explanation:
        "ולידציה ב-Client טובה ל-UX (משוב מיידי), אבל ניתנת לעקיפה. ולידציה בשרת היא קו ההגנה האמיתי — אי אפשר לדלג עליה.",
    },
    {
      question: "מהו route ב-Express?",
      options: [
        "קובץ HTML",
        "צמד של HTTP method + path שמגדיר endpoint עם handler function",
        "מסד נתונים",
        "סוג של middleware",
      ],
      correct: 1,
      explanation:
        "Route הוא הגדרה שאומרת: 'כשמגיעה בקשת METHOD ל-PATH — הרץ את הפונקציה הזו'. למשל app.post('/register', handler).",
    },
    {
      question: "מה ההבדל בין POST ל-GET בהקשר של טפסים?",
      options: [
        "POST מציג דף, GET שולח נתונים",
        "GET שולח נתונים ב-URL (גלויים), POST שולח ב-Body (מוסתרים) — מתאים לנתונים רגישים",
        "שניהם שולחים נתונים באותו אופן",
        "POST מהיר יותר מ-GET",
      ],
      correct: 1,
      explanation:
        "GET שם פרמטרים ב-URL (ניתן לראות סיסמאות!). POST שם אותם ב-Body שמוסתר — חיוני לטפסי הרשמה והתחברות.",
    },
    {
      question: "מה קורה לנתונים שנשמרים ב-let users = [] כשמכבים את השרת?",
      options: [
        "הם נשמרים לנצח",
        "הם נשמרים בדפדפן",
        "הם נמחקים — אחסון בזיכרון לא שורד כיבוי",
        "הם עוברים אוטומטית למסד נתונים",
      ],
      correct: 2,
      explanation:
        "מערך בזיכרון (RAM) נמחק כשהתהליך מסתיים. לשמירה קבועה צריך מסד נתונים או לפחות קובץ JSON בדיסק.",
    },
    {
      question: "מהם שלושת הדברים שחשוב לבדוק בולידציה של סיסמה?",
      options: [
        "צבע, גופן, ומיקום",
        "שהיא לא ריקה, אורך מינימלי (6+), ובפרודקשן — lhash עם bcrypt",
        "שהיא מכילה רק מספרים",
        "שהיא זהה לשם המשתמש",
      ],
      correct: 1,
      explanation:
        "סיסמה חייבת להיות לא ריקה ובאורך סביר. והכי חשוב — לעולם לא לשמור כ-plaintext! ב-production חובה hash עם bcrypt.",
    },
    {
      question: "מה עושה express.urlencoded({ extended: true })?",
      options: [
        "מצפין את ה-URL",
        "מפרסר נתוני טופס HTML מהבקשה ומכניס ל-req.body",
        "יוצר URL חדש",
        "מוחק פרמטרים מה-URL",
      ],
      correct: 1,
      explanation:
        "טפסי HTML שולחים נתונים בפורמט urlencoded. ה-middleware הזה מפרסר אותם לאובייקט JS שנגיש דרך req.body.",
    },
  ],
};
