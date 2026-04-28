// data/lesson_auth_security.js
// SVCollege Finish Line 1 - Auth and security boundaries bridge lesson.

var LESSON_AUTH_SECURITY = {
  id: "lesson_auth_security",
  title: "Auth & Security - אימות, הרשאות וגבולות אבטחה",
  description:
    "איך מערכת Full Stack מזהה משתמש, מחליטה מה מותר לו לעשות, שומרת session בטוח, ומחברת provider auth בלי לחשוף secrets בצד הלקוח.",
  svcollegeModule:
    "אימות ואבטחה - JWT, Cookies, Supabase/Appwrite/Firebase/Kinde",
  sourceAssets: [],
  sourceCoverageNote:
    "המודול הציבורי של SVCollege דורש Auth/JWT/Cookies/provider auth. מקור שיעור Auth מקומי ייעודי הוא unknown/unavailable, לכן זהו bridge עצמאי שמכסה את פער הקוריקולום בלי להמציא keys או endpoints.",
  concepts: [
    {
      conceptName: "authentication",
      difficulty: 3,
      simpleExplanation:
        "authentication היא בדיקת זהות: האם האדם שמול המערכת הוא באמת המשתמש שהוא טוען שהוא.",
      whyFullStack:
        "בלי authentication אי אפשר לדעת מי מבצע בקשה, ולכן אי אפשר לבנות פרופיל, dashboard אישי או פעולות שמורות.",
      codeExample:
        "const user = await verifyCredentials(email, password);\nif (!user) return res.status(401).json({ error: 'invalid credentials' });",
      codeExplanation:
        "השרת בודק פרטי כניסה מול מקור אמין ומחזיר 401 אם הזהות לא אומתה.",
      commonMistake:
        "לבלבל authentication עם authorization. קודם מזהים מי המשתמש, ורק אחר כך מחליטים מה מותר לו לעשות.",
      prerequisite: "lesson_17::Request",
    },
    {
      conceptName: "authorization",
      difficulty: 4,
      simpleExplanation:
        "authorization היא בדיקת הרשאה: אחרי שזיהינו את המשתמש, האם מותר לו לבצע פעולה מסוימת.",
      whyFullStack:
        "גם משתמש מחובר לא אמור למחוק נתונים של משתמש אחר או להיכנס למסך admin בלי role מתאים.",
      codeExample:
        "if (request.user.id !== resource.ownerId) {\n  return res.status(403).json({ error: 'forbidden' });\n}",
      codeExplanation:
        "403 אומר: הבנו מי אתה, אבל הפעולה לא מותרת עבורך.",
      commonMistake:
        "להסתפק בכך שיש token תקין. token מוכיח זהות, לא בהכרח בעלות על המשאב.",
      prerequisite: "lesson_auth_security::authentication",
    },
    {
      conceptName: "session",
      difficulty: 3,
      simpleExplanation:
        "session היא זיכרון התחברות מתמשך בין בקשות HTTP נפרדות.",
      whyFullStack:
        "HTTP לא זוכר את הבקשה הקודמת. session מאפשרת לשרת לדעת שהמשתמש כבר התחבר.",
      codeExample:
        "req.session.userId = user.id;\nres.json({ ok: true });",
      codeExplanation:
        "השרת שומר מזהה משתמש בתוך session, והדפדפן מחזיק cookie שמצביע אליה.",
      commonMistake:
        "לשמור יותר מדי מידע רגיש בתוך session או לא להגדיר לה תפוגה.",
      prerequisite: "lesson_17::HTTP",
    },
    {
      conceptName: "cookie",
      difficulty: 3,
      simpleExplanation:
        "cookie היא חתיכת מידע קטנה שהדפדפן שומר ושולח אוטומטית לשרת באותו domain.",
      whyFullStack:
        "cookies משמשות לעיתים להחזיק session id או refresh token בצורה שהשרת יכול לקרוא בכל בקשה.",
      codeExample:
        "res.cookie('sid', sessionId, { httpOnly: true, sameSite: 'lax' });",
      codeExplanation:
        "השרת מגדיר cookie, והדפדפן ישלח אותה חזרה בבקשות הבאות לאותו origin.",
      commonMistake:
        "לחשוב שכל cookie בטוחה. בלי flags נכונים היא עלולה להיחשף או להישלח בהקשר לא רצוי.",
      prerequisite: "lesson_auth_security::session",
    },
    {
      conceptName: "secure cookie",
      difficulty: 4,
      simpleExplanation:
        "secure cookie היא cookie עם flags שמקטינים חשיפה: httpOnly, secure, sameSite ותפוגה.",
      whyFullStack:
        "flags נכונים מקטינים סיכון לגניבת token דרך JavaScript או שליחה אוטומטית בהקשר מסוכן.",
      codeExample:
        "res.cookie('refresh', token, {\n  httpOnly: true,\n  secure: true,\n  sameSite: 'strict',\n  maxAge: 1000 * 60 * 60 * 24 * 7\n});",
      codeExplanation:
        "httpOnly מונע קריאה דרך JavaScript, secure דורש HTTPS, sameSite מצמצם CSRF.",
      commonMistake:
        "לשמור token רגיש ב-cookie בלי httpOnly או בלי תאריך תפוגה ברור.",
      prerequisite: "lesson_auth_security::cookie",
    },
    {
      conceptName: "JWT",
      difficulty: 5,
      simpleExplanation:
        "JWT הוא token חתום שמכיל claims כמו userId ותפוגה. השרת יכול לאמת שהוא לא שונה בדרך.",
      whyFullStack:
        "JWT נפוץ ב-API auth, אבל חייבים להבין שהוא חתום ולא מוצפן, ולכן לא שמים בו סודות.",
      codeExample:
        "const payload = verifyJwt(token, process.env.AUTH_SECRET);\nreq.user = { id: payload.sub, role: payload.role };",
      codeExplanation:
        "השרת מאמת חתימה ותפוגה לפני שהוא סומך על claims שבתוך token.",
      commonMistake:
        "לשים ב-JWT מידע סודי או להאמין ל-payload בלי verify.",
      prerequisite: "lesson_auth_security::authentication",
    },
    {
      conceptName: "access token",
      difficulty: 4,
      simpleExplanation:
        "access token הוא אישור קצר-חיים שמאפשר לבצע בקשות API בשם משתמש מחובר.",
      whyFullStack:
        "קיצור חיים מגביל נזק אם token דולף, ועדיין מאפשר UX מהיר לבקשות רגילות.",
      codeExample:
        "Authorization: Bearer <access-token>",
      codeExplanation:
        "הלקוח שולח token בכותרת Authorization, והשרת מאמת אותו לפני route מוגן.",
      commonMistake:
        "לתת access token ארוך מדי או לשמור אותו במקום נגיש ל-XSS.",
      prerequisite: "lesson_auth_security::JWT",
    },
    {
      conceptName: "refresh token",
      difficulty: 5,
      simpleExplanation:
        "refresh token הוא token ארוך יותר שמוציא access token חדש בלי לבקש סיסמה בכל פעם.",
      whyFullStack:
        "הוא מאזן בין אבטחה ל-UX: access קצר, refresh מוגן יותר ומנוהל בקפדנות.",
      codeExample:
        "const nextAccessToken = await rotateRefreshToken(refreshToken);",
      codeExplanation:
        "rotation מחליף refresh token ישן בחדש כדי לזהות שימוש חוזר חשוד.",
      commonMistake:
        "לשמור refresh token באותו מקום כמו access token או לא לבטל אותו ביציאה.",
      prerequisite: "lesson_auth_security::access token",
    },
    {
      conceptName: "OAuth",
      difficulty: 5,
      simpleExplanation:
        "OAuth הוא flow הרשאה שבו provider חיצוני מאפשר לאפליקציה לקבל גישה מוגבלת בלי לקבל את הסיסמה של המשתמש.",
      whyFullStack:
        "Login with provider נפוץ ב-SVCollege ובמוצרים אמיתיים, אבל צריך להבין redirect, callback, state ו-token exchange.",
      codeExample:
        "GET /auth/provider\nGET /auth/callback?code=...&state=...",
      codeExplanation:
        "השרת שולח ל-provider, מקבל code בחזרה, ומחליף אותו בשרת מול provider.",
      commonMistake:
        "לדלג על בדיקת state או לבצע token exchange בצד הלקוח עם secret.",
      prerequisite: "lesson_auth_security::authentication",
    },
    {
      conceptName: "provider auth",
      difficulty: 4,
      simpleExplanation:
        "provider auth הוא שימוש בשירות כמו Supabase, Firebase, Appwrite או Kinde לניהול התחברות.",
      whyFullStack:
        "provider מקצר עבודה, אבל המפתח עדיין חייב להבין roles, sessions, redirects וגבולות trust.",
      codeExample:
        "const session = await authProvider.getSession(request);\nif (!session) return redirect('/login');",
      codeExplanation:
        "הקוד נשאר רעיוני: קוראים session מה-provider ומחליטים אם לאפשר גישה.",
      commonMistake:
        "לחשוב שה-provider פוטר מבדיקת authorization באפליקציה.",
      prerequisite: "lesson_auth_security::OAuth",
    },
    {
      conceptName: "password hashing",
      difficulty: 5,
      simpleExplanation:
        "password hashing שומר גרסה חד-כיוונית של סיסמה במקום לשמור את הסיסמה עצמה.",
      whyFullStack:
        "אם database דולף, hash טוב מקשה מאוד על שחזור סיסמאות.",
      codeExample:
        "const passwordHash = await hashPassword(password);\nawait users.create({ email, passwordHash });",
      codeExplanation:
        "שומרים passwordHash ולא password. בזמן login משווים password חדש מול hash קיים.",
      commonMistake:
        "לשמור סיסמה כטקסט רגיל או להצפין אותה בצורה שאפשר לפענח חזרה.",
      prerequisite: "lesson_sql_orm::database",
    },
    {
      conceptName: "bcrypt",
      difficulty: 5,
      simpleExplanation:
        "bcrypt הוא אלגוריתם hashing לסיסמאות עם salt ועלות חישוב שמאטה brute force.",
      whyFullStack:
        "bcrypt מלמד למה password hash צריך להיות איטי יחסית ומותאם לסיסמאות, לא hash כללי מהיר.",
      codeExample:
        "const ok = await bcrypt.compare(password, user.passwordHash);",
      codeExplanation:
        "compare בודק סיסמה מול hash בלי לחשוף את הסיסמה השמורה.",
      commonMistake:
        "להשתמש ב-hash מהיר מדי לסיסמאות או לקבוע cost גבוה שמפיל את השרת.",
      prerequisite: "lesson_auth_security::password hashing",
    },
    {
      conceptName: "CSRF",
      difficulty: 5,
      simpleExplanation:
        "CSRF הוא מצב שבו אתר אחר גורם לדפדפן לשלוח בקשה עם cookies של המשתמש בלי שהוא התכוון.",
      whyFullStack:
        "כאשר auth נשען על cookies, חייבים להבין sameSite, CSRF token ו-methods מסוכנים.",
      codeExample:
        "if (req.method !== 'GET') verifyCsrfToken(req);",
      codeExplanation:
        "בקשות שמשנות מידע צריכות הוכחה שהן הגיעו מהאפליקציה שלך ולא מטופס חיצוני.",
      commonMistake:
        "להגן רק על login ולשכוח פעולות update/delete.",
      prerequisite: "lesson_auth_security::secure cookie",
    },
    {
      conceptName: "XSS boundary",
      difficulty: 5,
      simpleExplanation:
        "XSS boundary הוא הגבול שמונע מקלט משתמש להפוך לקוד JavaScript שרץ בדפדפן.",
      whyFullStack:
        "XSS יכול לגנוב tokens, לשנות UI ולשלוח פעולות בשם המשתמש.",
      codeExample:
        "element.textContent = userInput;\n// not: element.innerHTML = userInput",
      codeExplanation:
        "textContent מציג טקסט. innerHTML על קלט לא מסונן עלול להריץ markup מסוכן.",
      commonMistake:
        "לפתור auth ואז לחשוף אותו דרך XSS שמאפשר לגנוב session או לבצע פעולות.",
      prerequisite: "lesson_13::DOM",
    },
    {
      conceptName: "CORS",
      difficulty: 4,
      simpleExplanation:
        "CORS הוא מנגנון דפדפן שמחליט אילו origins רשאים לקרוא responses מה-API.",
      whyFullStack:
        "Frontend ו-backend לעיתים רצים ב-origins שונים, ו-CORS שגוי חוסם את האפליקציה או פותח יותר מדי.",
      codeExample:
        "app.use(cors({ origin: allowedOrigin, credentials: true }));",
      codeExplanation:
        "השרת מגדיר origin מותר והאם cookies/credentials יכולים להישלח.",
      commonMistake:
        "לשים origin: '*' יחד עם credentials או לפתוח לכל העולם בלי צורך.",
      prerequisite: "lesson_17::HTTP",
    },
    {
      conceptName: "middleware guard",
      difficulty: 4,
      simpleExplanation:
        "middleware guard הוא קוד שרץ לפני route ומחליט אם הבקשה מורשית להמשיך.",
      whyFullStack:
        "guard מרכז auth logic ומונע שכפול בדיקות בכל route.",
      codeExample:
        "function requireUser(req, res, next) {\n  if (!req.user) return res.status(401).json({ error: 'login required' });\n  next();\n}",
      codeExplanation:
        "אם אין user מאומת מחזירים 401. אחרת ממשיכים ל-route הבא.",
      commonMistake:
        "לשכוח לשים guard על route רגיש כי הבדיקה מפוזרת בקבצים שונים.",
      prerequisite: "lesson_17::middleware",
    },
    {
      conceptName: "Supabase Auth",
      difficulty: 4,
      simpleExplanation:
        "Supabase Auth הוא provider שמנהל משתמשים, sessions ו-login flows לצד database ו-RLS.",
      whyFullStack:
        "הוא נפוץ בפרויקטים מהירים, אבל עדיין צריך להבין server-side session checks ו-authorization לפי data.",
      codeExample:
        "const session = await supabaseAuth.getSession(request);",
      codeExplanation:
        "הקוד רעיוני: בקשת session צריכה להיבדק בצד שרת לפני מידע פרטי.",
      commonMistake:
        "להסתמך רק על UI שמסתיר כפתור במקום לאכוף הרשאות בשרת או ב-RLS.",
      prerequisite: "lesson_auth_security::provider auth",
    },
    {
      conceptName: "Firebase Auth",
      difficulty: 4,
      simpleExplanation:
        "Firebase Auth הוא provider שמנהל login ומשתמשים, בדרך כלל עם token שהשרת צריך לאמת.",
      whyFullStack:
        "גם כש-Firebase נותן token, backend חייב לאמת אותו ולבדוק הרשאה למשאב.",
      codeExample:
        "const decoded = await verifyProviderToken(idToken);",
      codeExplanation:
        "השרת מאמת token מול provider לפני שהוא יוצר req.user.",
      commonMistake:
        "לסמוך על userId שנשלח מהלקוח בלי verify provider token.",
      prerequisite: "lesson_auth_security::provider auth",
    },
    {
      conceptName: "Kinde/Appwrite",
      difficulty: 4,
      simpleExplanation:
        "Kinde ו-Appwrite הם provider options שמציעים auth flows מוכנים, user management ו-integration hooks.",
      whyFullStack:
        "הם יכולים לקצר פיתוח, אבל הבחירה בכלי לא מחליפה הבנת session, roles, redirects ו-server validation.",
      codeExample:
        "const user = await providerAuth.requireUser(request);",
      codeExplanation:
        "הקוד נשאר generic כדי לא להמציא API. הרעיון הוא guard בצד שרת שמחזיר user מאומת.",
      commonMistake:
        "לבנות authorization סביב שם provider במקום סביב rules עסקיים של האפליקציה.",
      prerequisite: "lesson_auth_security::provider auth",
    },
  ],
};

if (typeof window !== "undefined") {
  window.LESSON_AUTH_SECURITY = LESSON_AUTH_SECURITY;
}

if (typeof module !== "undefined") {
  module.exports = { LESSON_AUTH_SECURITY: LESSON_AUTH_SECURITY };
}
