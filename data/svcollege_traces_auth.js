// data/svcollege_traces_auth.js
// SVCollege Finish Line 1 - Auth/Security Code Trace practice.

var SVCOLLEGE_AUTH_TRACES = [
  {
    id: "trace_svauth_001",
    conceptKey: "lesson_auth_security::middleware guard",
    level: 5,
    title: "מעקב אחרי requireUser middleware",
    code:
      "function requireUser(req, res, next) {\n  const token = readBearerToken(req.headers.authorization);\n  if (!token) return res.status(401).json({ error: 'login required' });\n  const payload = verifyJwt(token, process.env.AUTH_SECRET);\n  req.user = { id: payload.sub, role: payload.role };\n  return next();\n}",
    steps: [
      {
        line: 3,
        prompt: "איזה status חוזר אם אין token?",
        answer: "401",
        hint: "קרא את ה-return בתוך ה-if הראשון.",
      },
      {
        line: 4,
        prompt: "איזו פעולה חייבת לקרות לפני שסומכים על payload?",
        answer: "verifyJwt",
        acceptable: ["verify", "אימות JWT", "verifyJwt"],
        hint: "לא מספיק לקרוא payload; צריך לאמת חתימה ותפוגה.",
      },
      {
        line: 6,
        prompt: "מה next עושה כאן?",
        answer: "ממשיך ל-route הבא",
        acceptable: ["ממשיך", "next middleware", "route הבא"],
        hint: "middleware שלא מחזיר response צריך להעביר שליטה הלאה.",
      },
    ],
    explanation:
      "ה-guard עוצר בקשה לא מזוהה, מאמת JWT, מצמיד user ל-request ואז מעביר ל-route.",
    requiredConcepts: ["lesson_auth_security::middleware guard", "lesson_auth_security::JWT"],
    requiredTerms: ["Bearer", "401", "verifyJwt", "next"],
    sideExplanation:
      "Trace כזה בודק סדר פעולות: קודם token, אחר כך verify, ורק אז user על request.",
  },
  {
    id: "trace_svauth_002",
    conceptKey: "lesson_auth_security::authorization",
    level: 5,
    title: "401 מול 403 ב-route מוגן",
    code:
      "app.patch('/api/tasks/:id', requireUser, async (req, res) => {\n  const task = await tasks.findById(req.params.id);\n  if (!task) return res.status(404).json({ error: 'not found' });\n  if (task.ownerId !== req.user.id) return res.status(403).json({ error: 'forbidden' });\n  await tasks.rename(task.id, req.body.title);\n  return res.json({ ok: true });\n});",
    steps: [
      {
        line: 1,
        prompt: "מי מטפל במצב שבו אין משתמש מחובר?",
        answer: "requireUser",
        hint: "זה middleware שרץ לפני גוף ה-route.",
      },
      {
        line: 4,
        prompt: "איזה status חוזר אם task שייך למשתמש אחר?",
        answer: "403",
        hint: "המשתמש מזוהה אבל לא מורשה למשאב.",
      },
      {
        line: 5,
        prompt: "איזה id נשלח ל-rename אחרי בדיקת הרשאה?",
        answer: "task.id",
        hint: "הקוד לא משתמש ישירות ב-id מהלקוח אחרי שמצא resource.",
      },
    ],
    explanation:
      "ה-route מפריד בין authentication ב-middleware לבין authorization לפי ownerId בתוך הפעולה העסקית.",
    requiredConcepts: ["lesson_auth_security::authorization", "lesson_auth_security::middleware guard"],
    requiredTerms: ["401", "403", "ownerId", "resource"],
    sideExplanation:
      "הבדל מדויק בין לא מחובר לבין לא מורשה עוזר גם לאבטחה וגם ל-debugging.",
  },
  {
    id: "trace_svauth_003",
    conceptKey: "lesson_auth_security::refresh token",
    level: 6,
    title: "Refresh token rotation",
    code:
      "async function refreshSession(refreshToken) {\n  const stored = await sessions.findByRefreshToken(refreshToken);\n  if (!stored || stored.revoked) throw new Error('invalid session');\n  await sessions.revoke(stored.id);\n  const nextRefreshToken = await sessions.createForUser(stored.userId);\n  const nextAccessToken = signAccessToken({ sub: stored.userId });\n  return { nextAccessToken, nextRefreshToken };\n}",
    steps: [
      {
        line: 3,
        prompt: "מתי הפונקציה זורקת invalid session?",
        answer: "כאשר אין session או שהיא revoked",
        acceptable: ["אין stored", "revoked", "אין session"],
        hint: "בדוק את התנאי בתוך ה-if.",
      },
      {
        line: 4,
        prompt: "למה מבטלים את refresh token הישן?",
        answer: "כדי למנוע שימוש חוזר",
        acceptable: ["rotation", "שימוש חוזר", "reuse"],
        hint: "זה עיקרון rotation.",
      },
      {
        line: 7,
        prompt: "אילו שני tokens חוזרים בסוף?",
        answer: "nextAccessToken ו-nextRefreshToken",
        hint: "קרא את האובייקט ב-return.",
      },
    ],
    explanation:
      "rotation מחליפה refresh token ישן בחדש ומנפיקה access token קצר-חיים.",
    requiredConcepts: ["lesson_auth_security::refresh token", "lesson_auth_security::access token"],
    requiredTerms: ["rotation", "revoke", "access token", "refresh token"],
    sideExplanation:
      "אם refresh token ישן ממשיך לעבוד, קשה לזהות דליפה או שימוש חוזר עוין.",
  },
  {
    id: "trace_svauth_access_token_001",
    conceptKey: "lesson_auth_security::access token",
    level: 5,
    title: "Access token קצר חיים בבקשת API",
    code:
      "async function loadProfile(accessToken) {\n  const response = await fetch('/api/profile', {\n    headers: { Authorization: `Bearer ${accessToken}` }\n  });\n  if (response.status === 401) return 'login again';\n  return response.json();\n}",
    steps: [
      {
        line: 3,
        prompt: "באיזו כותרת נשלח ה-access token?",
        answer: "Authorization",
        hint: "ה-token נשלח בתוך headers.",
      },
      {
        line: 3,
        prompt: "איזו מילה מופיעה לפני ה-token עצמו?",
        answer: "Bearer",
        hint: "זה הפורמט הנפוץ ל-access token ב-HTTP.",
      },
      {
        line: 5,
        prompt: "מה מחזירה הפונקציה אם השרת עונה 401?",
        answer: "login again",
        hint: "401 אומר שה-token לא תקף או חסר.",
      },
    ],
    explanation:
      "access token נשלח בכל בקשת API מוגנת ומאומת בשרת. כאשר הוא פג או שגוי, השרת מחזיר 401 והלקוח צריך להתחבר מחדש או לרענן session.",
    requiredConcepts: ["lesson_auth_security::access token", "lesson_auth_security::JWT"],
    requiredTerms: ["Authorization", "Bearer", "401"],
    sideExplanation:
      "הנקודה החשובה היא לא רק איפה שמים את ה-token, אלא לא לסמוך עליו בלי בדיקת השרת.",
  },
  {
    id: "trace_svauth_authentication_001",
    conceptKey: "lesson_auth_security::authentication",
    level: 4,
    title: "Authentication לפני יצירת session",
    code:
      "async function login(email, password, req, res) {\n  const user = await users.findByEmail(email);\n  if (!user) return res.status(401).json({ error: 'invalid credentials' });\n  const ok = await verifyPassword(password, user.passwordHash);\n  if (!ok) return res.status(401).json({ error: 'invalid credentials' });\n  req.session.userId = user.id;\n  return res.json({ ok: true });\n}",
    steps: [
      {
        line: 3,
        prompt: "איזה status חוזר אם לא נמצא user?",
        answer: "401",
        hint: "זה כשל בזיהוי המשתמש.",
      },
      {
        line: 4,
        prompt: "איזו פעולה בודקת את הסיסמה מול ה-hash?",
        answer: "verifyPassword",
        hint: "הפונקציה מקבלת password ו-passwordHash.",
      },
      {
        line: 6,
        prompt: "איזה ערך נשמר ב-session אחרי authentication מוצלח?",
        answer: "user.id",
        hint: "לא שומרים את הסיסמה ב-session.",
      },
    ],
    explanation:
      "authentication מזהה משתמש לפי פרטי כניסה. רק אחרי בדיקת email וסיסמה מול hash מותר ליצור session שמייצג את המשתמש.",
    requiredConcepts: ["lesson_auth_security::authentication", "lesson_auth_security::session"],
    requiredTerms: ["login", "401", "passwordHash", "session"],
    sideExplanation:
      "אותו status לכשל email ולכשל סיסמה מצמצם רמזים לתוקף על אילו חשבונות קיימים.",
  },
  {
    id: "trace_svauth_bcrypt_001",
    conceptKey: "lesson_auth_security::bcrypt",
    level: 5,
    title: "bcrypt compare בלי לחשוף סיסמה",
    code:
      "async function verifyPassword(password, user) {\n  const ok = await bcrypt.compare(password, user.passwordHash);\n  if (!ok) return false;\n  return true;\n}",
    steps: [
      {
        line: 2,
        prompt: "איזו פונקציה משווה password ל-hash?",
        answer: "bcrypt.compare",
        acceptable: ["compare", "bcrypt compare"],
        hint: "לא מפענחים hash, משווים מולו.",
      },
      {
        line: 2,
        prompt: "איזה שדה מכיל את ה-hash השמור?",
        answer: "user.passwordHash",
        hint: "זה לא password רגיל.",
      },
      {
        line: 3,
        prompt: "מה חוזר אם ההשוואה נכשלה?",
        answer: "false",
        hint: "בדוק את ה-if.",
      },
    ],
    explanation:
      "bcrypt מיועד לסיסמאות: הוא שומר hash עם salt ועלות חישוב, והבדיקה נעשית באמצעות compare במקום לפענח את הסיסמה.",
    requiredConcepts: ["lesson_auth_security::bcrypt", "lesson_auth_security::password hashing"],
    requiredTerms: ["bcrypt", "compare", "passwordHash", "salt"],
    sideExplanation:
      "אין דבר כזה לפענח bcrypt חזרה לסיסמה. בודקים אם קלט חדש מייצר התאמה מול ה-hash.",
  },
  {
    id: "trace_svauth_cookie_001",
    conceptKey: "lesson_auth_security::cookie",
    level: 4,
    title: "Cookie שנשלחת אוטומטית לשרת",
    code:
      "app.post('/login', async (req, res) => {\n  const sessionId = await sessions.create(req.user.id);\n  res.cookie('sid', sessionId, { httpOnly: true, sameSite: 'lax' });\n  return res.json({ ok: true });\n});\n\napp.get('/me', (req, res) => {\n  const sid = req.cookies.sid;\n  return res.json({ sessionId: sid });\n});",
    steps: [
      {
        line: 3,
        prompt: "מה שם ה-cookie שנוצרה?",
        answer: "sid",
        hint: "זה הפרמטר הראשון של res.cookie.",
      },
      {
        line: 3,
        prompt: "איזה flag מונע קריאה ישירה דרך JavaScript?",
        answer: "httpOnly",
        hint: "flag אבטחה חשוב ל-cookie רגישה.",
      },
      {
        line: 8,
        prompt: "מאיפה השרת קורא את ה-cookie בבקשה הבאה?",
        answer: "req.cookies.sid",
        hint: "הדפדפן שולח cookie חזרה לפי origin/path.",
      },
    ],
    explanation:
      "cookie היא אחסון דפדפן שנשלח אוטומטית לבקשות מתאימות. ב-auth היא לרוב מצביעה ל-session או refresh token.",
    requiredConcepts: ["lesson_auth_security::cookie", "lesson_auth_security::session"],
    requiredTerms: ["cookie", "sid", "httpOnly", "sameSite"],
    sideExplanation:
      "cookie נוחה ל-session, אבל חייבים flags כדי להקטין גישה מ-XSS ושליחה מסוכנת בין אתרים.",
  },
  {
    id: "trace_svauth_cors_001",
    conceptKey: "lesson_auth_security::CORS",
    level: 5,
    title: "CORS בודק origin לפני credentials",
    code:
      "const allowedOrigin = process.env.FRONTEND_ORIGIN;\n\nfunction cors(req, res, next) {\n  if (req.headers.origin === allowedOrigin) {\n    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);\n    res.setHeader('Access-Control-Allow-Credentials', 'true');\n  }\n  return next();\n}",
    steps: [
      {
        line: 4,
        prompt: "איזה header בבקשה נבדק?",
        answer: "origin",
        acceptable: ["req.headers.origin", "Origin"],
        hint: "CORS קשור ל-origin שממנו הדפדפן קורא response.",
      },
      {
        line: 5,
        prompt: "איזה response header מקבל את allowedOrigin?",
        answer: "Access-Control-Allow-Origin",
        hint: "זה ה-header המרכזי של CORS.",
      },
      {
        line: 6,
        prompt: "איזה header מאפשר שליחת cookies/credentials?",
        answer: "Access-Control-Allow-Credentials",
        hint: "credentials דורשים זהירות נוספת.",
      },
    ],
    explanation:
      "CORS הוא מנגנון דפדפן שמחליט אם קוד מ-origin אחד יכול לקרוא response מ-origin אחר. הוא לא מחליף authorization בשרת.",
    requiredConcepts: ["lesson_auth_security::CORS", "lesson_17::headers"],
    requiredTerms: ["CORS", "Origin", "credentials", "Access-Control-Allow-Origin"],
    sideExplanation:
      "גם אם CORS פתוח ל-origin מסוים, השרת עדיין חייב לבדוק מי המשתמש ומה מותר לו לעשות.",
  },
  {
    id: "trace_svauth_csrf_001",
    conceptKey: "lesson_auth_security::CSRF",
    level: 5,
    title: "CSRF token בפעולה שמשנה מידע",
    code:
      "app.post('/settings/email', requireUser, (req, res) => {\n  const cookieToken = req.cookies.csrf;\n  const bodyToken = req.body.csrf;\n  if (!cookieToken || cookieToken !== bodyToken) {\n    return res.status(403).json({ error: 'bad csrf token' });\n  }\n  return res.json({ ok: true });\n});",
    steps: [
      {
        line: 2,
        prompt: "מאיפה מגיע token אחד?",
        answer: "req.cookies.csrf",
        hint: "token אחד נשמר ב-cookie.",
      },
      {
        line: 3,
        prompt: "מאיפה מגיע token שני?",
        answer: "req.body.csrf",
        hint: "הלקוח שולח אותו כחלק מהטופס/גוף הבקשה.",
      },
      {
        line: 5,
        prompt: "איזה status חוזר אם ה-token לא תואם?",
        answer: "403",
        hint: "המשתמש אולי מחובר, אבל הבקשה אינה מורשית בהקשר הזה.",
      },
    ],
    explanation:
      "CSRF רלוונטי במיוחד כשדפדפן שולח cookies אוטומטית. השוואת token נוסף מוכיחה שהבקשה הגיעה מה-UI הלגיטימי.",
    requiredConcepts: ["lesson_auth_security::CSRF", "lesson_auth_security::cookie"],
    requiredTerms: ["CSRF", "cookie", "POST", "403"],
    sideExplanation:
      "sameSite עוזר, אבל בפעולות רגישות כדאי להבין גם דפוס token מפורש.",
  },
  {
    id: "trace_svauth_firebase_001",
    conceptKey: "lesson_auth_security::Firebase Auth",
    level: 5,
    title: "Firebase Auth מחזיר user identity",
    code:
      "async function signInWithFirebase(auth, email, password) {\n  const result = await signInWithEmailAndPassword(auth, email, password);\n  const idToken = await result.user.getIdToken();\n  return { uid: result.user.uid, idToken };\n}",
    steps: [
      {
        line: 2,
        prompt: "איזו פעולה מבצעת התחברות email/password?",
        answer: "signInWithEmailAndPassword",
        hint: "זו הקריאה המרכזית בשורה 2.",
      },
      {
        line: 3,
        prompt: "איזו פעולה מביאה token מזהה?",
        answer: "getIdToken",
        hint: "קוראים אותה על result.user.",
      },
      {
        line: 4,
        prompt: "איזה מזהה user חוזר לצד ה-token?",
        answer: "uid",
        acceptable: ["result.user.uid"],
        hint: "Firebase משתמש ב-uid לזהות משתמש.",
      },
    ],
    explanation:
      "Firebase Auth מנהל authentication ומספק user identity/token. האפליקציה עדיין צריכה לבדוק הרשאות וגישה לנתונים.",
    requiredConcepts: ["lesson_auth_security::Firebase Auth", "lesson_auth_security::provider auth"],
    requiredTerms: ["Firebase Auth", "idToken", "uid"],
    sideExplanation:
      "provider auth פותר חלק מהכניסה, אבל לא מחליף החלטות authorization באפליקציה שלך.",
  },
  {
    id: "trace_svauth_jwt_001",
    conceptKey: "lesson_auth_security::JWT",
    level: 5,
    title: "JWT חייב verify לפני שימוש ב-claims",
    code:
      "function readUserFromJwt(token) {\n  const payload = verifyJwt(token, process.env.AUTH_SECRET);\n  if (payload.exp < nowInSeconds()) throw new Error('expired');\n  return { id: payload.sub, role: payload.role };\n}",
    steps: [
      {
        line: 2,
        prompt: "איזו פונקציה מאמתת את ה-JWT?",
        answer: "verifyJwt",
        hint: "לא קוראים claims בלי verify.",
      },
      {
        line: 3,
        prompt: "איזה claim נבדק כדי לזהות תפוגה?",
        answer: "exp",
        hint: "exp הוא expiration time.",
      },
      {
        line: 4,
        prompt: "איזה claim הופך ל-id של המשתמש?",
        answer: "sub",
        acceptable: ["payload.sub"],
        hint: "subject הוא בדרך כלל מזהה המשתמש.",
      },
    ],
    explanation:
      "JWT חתום מאפשר לוודא שה-claims לא שונו. עדיין צריך לבדוק חתימה, תפוגה והרשאה לפני פעולה מוגנת.",
    requiredConcepts: ["lesson_auth_security::JWT", "lesson_auth_security::authentication"],
    requiredTerms: ["JWT", "verify", "exp", "sub"],
    sideExplanation:
      "JWT אינו כספת. payload לרוב ניתן לקריאה, לכן לא שמים בו secrets.",
  },
  {
    id: "trace_svauth_kinde_appwrite_001",
    conceptKey: "lesson_auth_security::Kinde/Appwrite",
    level: 5,
    title: "Kinde/Appwrite כ-provider auth חיצוני",
    code:
      "async function handleProviderSession(authClient) {\n  const session = await authClient.getSession();\n  if (!session || !session.user) return { loggedIn: false };\n  return { loggedIn: true, userId: session.user.id };\n}",
    steps: [
      {
        line: 2,
        prompt: "איזו פעולה קוראת session מה-provider?",
        answer: "getSession",
        hint: "ה-client מחזיר session קיימת אם יש.",
      },
      {
        line: 3,
        prompt: "מה חוזר אם אין session או user?",
        answer: "loggedIn: false",
        acceptable: ["false", "{ loggedIn: false }"],
        hint: "הקוד לא ממציא משתמש אם provider לא החזיר user.",
      },
      {
        line: 4,
        prompt: "איזה ערך משמש userId כאשר session קיימת?",
        answer: "session.user.id",
        hint: "זה מזהה המשתמש מה-provider.",
      },
    ],
    explanation:
      "Kinde/Appwrite הם שירותי provider auth. הם עוזרים בניהול session וזהות, אבל האפליקציה עדיין צריכה למפות userId להרשאות ונתונים.",
    requiredConcepts: ["lesson_auth_security::Kinde/Appwrite", "lesson_auth_security::provider auth"],
    requiredTerms: ["provider auth", "session", "userId"],
    sideExplanation:
      "שירות חיצוני לא אומר שמותר לדלג על בדיקות ownership בתוך ה-API שלך.",
  },
  {
    id: "trace_svauth_oauth_001",
    conceptKey: "lesson_auth_security::OAuth",
    level: 5,
    title: "OAuth callback עם code ו-state",
    code:
      "app.get('/auth/callback', async (req, res) => {\n  if (req.query.state !== req.session.oauthState) {\n    return res.status(403).send('bad state');\n  }\n  const tokens = await oauth.exchangeCode(req.query.code);\n  req.session.userId = tokens.userId;\n  return res.redirect('/dashboard');\n});",
    steps: [
      {
        line: 2,
        prompt: "איזה ערך נבדק מול oauthState?",
        answer: "req.query.state",
        hint: "state עוזר לוודא שה-callback שייך להתחלה אמיתית.",
      },
      {
        line: 5,
        prompt: "איזה ערך מוחלף מול provider?",
        answer: "req.query.code",
        acceptable: ["code", "authorization code"],
        hint: "OAuth callback מחזיר code.",
      },
      {
        line: 6,
        prompt: "מה נשמר ב-session אחרי exchange מוצלח?",
        answer: "tokens.userId",
        hint: "המערכת קושרת session למשתמש שזוהה.",
      },
    ],
    explanation:
      "OAuth משתמש ב-callback וב-code exchange כדי שהשרת יקבל tokens בלי לחשוף secret בצד הלקוח. state מגן על זרימת ההתחברות.",
    requiredConcepts: ["lesson_auth_security::OAuth", "lesson_auth_security::provider auth"],
    requiredTerms: ["OAuth", "callback", "state", "code"],
    sideExplanation:
      "OAuth הוא flow, לא הרשאה עסקית. אחרי login עדיין צריך לבדוק access לכל resource.",
  },
  {
    id: "trace_svauth_provider_auth_001",
    conceptKey: "lesson_auth_security::provider auth",
    level: 5,
    title: "Provider auth בלי לחשוף client secret",
    code:
      "function startProviderLogin(req, res) {\n  req.session.oauthState = createStableStateForSession(req.session.id);\n  const url = provider.buildAuthorizeUrl({\n    state: req.session.oauthState,\n    redirectUri: '/auth/callback'\n  });\n  return res.redirect(url);\n}",
    steps: [
      {
        line: 2,
        prompt: "איפה נשמר state לפני redirect?",
        answer: "req.session.oauthState",
        hint: "צריך להשוות אותו ב-callback.",
      },
      {
        line: 4,
        prompt: "איזה field נשלח ל-provider כדי לחזור אליו אחר כך?",
        answer: "state",
        hint: "ה-state חוזר ב-callback.",
      },
      {
        line: 5,
        prompt: "איזה נתיב מוגדר כ-callback?",
        answer: "/auth/callback",
        hint: "redirectUri אומר לאן provider מחזיר את המשתמש.",
      },
    ],
    explanation:
      "provider auth מפנה את המשתמש לשירות זהות חיצוני ושומר state כדי לוודא שה-callback שייך ל-session הנוכחית.",
    requiredConcepts: ["lesson_auth_security::provider auth", "lesson_auth_security::OAuth"],
    requiredTerms: ["provider", "state", "redirectUri", "callback"],
    sideExplanation:
      "client secret לא שייך לקוד frontend. השרת מנהל exchange וסודות מול provider.",
  },
  {
    id: "trace_svauth_session_001",
    conceptKey: "lesson_auth_security::session",
    level: 4,
    title: "Session מחברת כמה בקשות לאותו user",
    code:
      "app.post('/login', requireUser, (req, res) => {\n  req.session.userId = req.user.id;\n  return res.json({ ok: true });\n});\n\napp.get('/dashboard', (req, res) => {\n  if (!req.session.userId) return res.status(401).send('login required');\n  return res.json({ userId: req.session.userId });\n});",
    steps: [
      {
        line: 2,
        prompt: "איזה שדה session נשמר אחרי login?",
        answer: "userId",
        acceptable: ["req.session.userId"],
        hint: "ה-session זוכרת את מזהה המשתמש.",
      },
      {
        line: 7,
        prompt: "איזה status חוזר אם אין userId ב-session?",
        answer: "401",
        hint: "אין authentication מתמשך.",
      },
      {
        line: 8,
        prompt: "איזה ערך מוחזר ב-dashboard אם session קיימת?",
        answer: "req.session.userId",
        hint: "ה-route משתמש באותו userId שנשמר קודם.",
      },
    ],
    explanation:
      "session נותנת לשרת זיכרון בין בקשות HTTP נפרדות. בלי session או token כל בקשה הייתה עומדת לבד.",
    requiredConcepts: ["lesson_auth_security::session", "lesson_17::HTTP"],
    requiredTerms: ["session", "userId", "401", "HTTP"],
    sideExplanation:
      "session אינה אומרת שהכול מותר. היא רק מזהה מי המשתמש הנוכחי.",
  },
  {
    id: "trace_svauth_supabase_001",
    conceptKey: "lesson_auth_security::Supabase Auth",
    level: 5,
    title: "Supabase Auth מזהה, RLS מרשה",
    code:
      "async function loadMyRows(supabase) {\n  const { data: authData } = await supabase.auth.getUser();\n  if (!authData.user) return [];\n  const { data: rows } = await supabase\n    .from('notes')\n    .select('id,title')\n    .eq('owner_id', authData.user.id);\n  return rows;\n}",
    steps: [
      {
        line: 2,
        prompt: "איזו פעולה קוראת את המשתמש המחובר?",
        answer: "supabase.auth.getUser",
        acceptable: ["getUser", "auth.getUser"],
        hint: "Supabase Auth מטפל בזהות.",
      },
      {
        line: 3,
        prompt: "מה חוזר אם אין user?",
        answer: "[]",
        acceptable: ["מערך ריק", "empty array"],
        hint: "אין נתוני user לקריאה.",
      },
      {
        line: 7,
        prompt: "איזה שדה מסנן את ה-rows לפי user?",
        answer: "owner_id",
        hint: "authorization לפי בעלות על row.",
      },
    ],
    explanation:
      "Supabase Auth מספק זהות/session, אבל קריאת נתונים עדיין צריכה להישען על ownership או RLS כדי למנוע דליפת rows.",
    requiredConcepts: ["lesson_auth_security::Supabase Auth", "lesson_auth_security::authorization"],
    requiredTerms: ["Supabase Auth", "getUser", "RLS", "owner_id"],
    sideExplanation:
      "Auth עונה מי המשתמש; authorization/RLS עונים לאילו rows מותר לו לגשת.",
  },
];

function appendAuthTraceItemsOnce(target, items) {
  var existing = {};
  for (var index = 0; index < target.length; index += 1) {
    existing[target[index].id] = true;
  }
  for (var itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    if (!existing[items[itemIndex].id]) {
      target.push(items[itemIndex]);
      existing[items[itemIndex].id] = true;
    }
  }
}

if (typeof window !== "undefined") {
  window.SVCOLLEGE_AUTH_TRACES = SVCOLLEGE_AUTH_TRACES;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  appendAuthTraceItemsOnce(window.QUESTIONS_TRACE, SVCOLLEGE_AUTH_TRACES);
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_AUTH_TRACES: SVCOLLEGE_AUTH_TRACES };
}
