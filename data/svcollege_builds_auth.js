// data/svcollege_builds_auth.js
// SVCollege Finish Line 1 - Auth/Security Mini Build practice.

var SVCOLLEGE_AUTH_BUILDS = [
  {
    id: "build_svauth_001",
    conceptKey: "lesson_auth_security::middleware guard",
    level: 5,
    title: "Express requireUser guard",
    prompt:
      "כתוב middleware בשם requireUser. הוא צריך לקרוא Bearer token, להחזיר 401 אם אין token, לבצע verifyJwt, להצמיד req.user, ואז לקרוא next.",
    starter:
      "function requireUser(req, res, next) {\n  // read token\n  // verify\n  // assign req.user\n  // continue\n}",
    tests: [
      { regex: "function\\s+requireUser\\s*\\(", description: "מגדיר requireUser", flags: "" },
      { regex: "authorization", description: "קורא authorization header", flags: "i" },
      { regex: "status\\s*\\(\\s*401\\s*\\)", description: "מחזיר 401 כשאין משתמש", flags: "" },
      { regex: "verifyJwt\\s*\\(", description: "מאמת JWT לפני אמון ב-payload", flags: "" },
      { regex: "req\\.user\\s*=", description: "מצמיד user ל-request", flags: "" },
      { regex: "next\\s*\\(", description: "ממשיך ל-route הבא", flags: "" },
    ],
    reference:
      "function requireUser(req, res, next) {\n  const token = readBearerToken(req.headers.authorization);\n  if (!token) return res.status(401).json({ error: 'login required' });\n  const payload = verifyJwt(token, process.env.AUTH_SECRET);\n  req.user = { id: payload.sub, role: payload.role };\n  return next();\n}",
    hint:
      "הסדר חשוב: קודם token, אחר כך verify, אחר כך req.user, ורק אז next.",
    explanation:
      "middleware guard מרכז את גבול authentication לפני routes מוגנים.",
    requiredConcepts: ["lesson_auth_security::middleware guard", "lesson_auth_security::JWT"],
    requiredTerms: ["Bearer", "401", "verifyJwt", "next"],
    sideExplanation:
      "guard מפוזר בכל route גורם לשכחה. middleware אחד הופך את הגבול לברור.",
  },
  {
    id: "build_svauth_002",
    conceptKey: "lesson_auth_security::secure cookie",
    level: 5,
    title: "Cookie בטוחה ל-refresh token",
    prompt:
      "כתוב helper בשם setRefreshCookie(res, token) שמגדיר cookie בשם refresh עם httpOnly, secure, sameSite strict ו-maxAge.",
    starter:
      "function setRefreshCookie(res, token) {\n  // res.cookie(...)\n}",
    tests: [
      { regex: "function\\s+setRefreshCookie\\s*\\(", description: "מגדיר setRefreshCookie", flags: "" },
      { regex: "res\\.cookie\\s*\\(\\s*['\"]refresh['\"]", description: "מגדיר cookie בשם refresh", flags: "" },
      { regex: "httpOnly\\s*:\\s*true", description: "מפעיל httpOnly", flags: "" },
      { regex: "secure\\s*:\\s*true", description: "מפעיל secure", flags: "" },
      { regex: "sameSite\\s*:\\s*['\"]strict['\"]", description: "sameSite strict", flags: "i" },
      { regex: "maxAge\\s*:", description: "מגדיר תפוגה", flags: "" },
    ],
    reference:
      "function setRefreshCookie(res, token) {\n  return res.cookie('refresh', token, {\n    httpOnly: true,\n    secure: true,\n    sameSite: 'strict',\n    maxAge: 1000 * 60 * 60 * 24 * 7,\n  });\n}",
    hint:
      "אל תאפשר JavaScript לקרוא refresh token. הגדר flags בתוך options.",
    explanation:
      "refresh token רגיש יותר ולכן עדיף לשמור אותו בגבול cookie מוגן ככל האפשר.",
    requiredConcepts: ["lesson_auth_security::secure cookie", "lesson_auth_security::refresh token"],
    requiredTerms: ["httpOnly", "secure", "sameSite", "maxAge"],
    sideExplanation:
      "היעילות כאן היא לא מהירות אלא הפחתת שטח תקיפה סביב token ארוך-חיים.",
  },
  {
    id: "build_svauth_003",
    conceptKey: "lesson_auth_security::authorization",
    level: 6,
    title: "Route עם בדיקת בעלות",
    prompt:
      "כתוב route שמעדכן profile רק אם המשתמש המחובר הוא owner. השתמש ב-requireUser, טען profile לפי id, החזר 404 אם לא נמצא, 403 אם ownerId שונה, ורק אז update.",
    starter:
      "app.patch('/api/profiles/:id', requireUser, async (req, res) => {\n  // load profile\n  // check owner\n  // update\n});",
    tests: [
      { regex: "requireUser", description: "משתמש ב-auth guard", flags: "" },
      { regex: "findById\\s*\\(", description: "טוען resource לפני update", flags: "" },
      { regex: "status\\s*\\(\\s*404\\s*\\)", description: "מטפל ב-resource חסר", flags: "" },
      { regex: "ownerId\\s*!==\\s*req\\.user\\.id", description: "בודק בעלות", flags: "" },
      { regex: "status\\s*\\(\\s*403\\s*\\)", description: "מחזיר 403 אם אין הרשאה", flags: "" },
      { regex: "\\.update\\s*\\(", description: "מעדכן רק אחרי בדיקות", flags: "" },
    ],
    reference:
      "app.patch('/api/profiles/:id', requireUser, async (req, res) => {\n  const profile = await profiles.findById(req.params.id);\n  if (!profile) return res.status(404).json({ error: 'not found' });\n  if (profile.ownerId !== req.user.id) return res.status(403).json({ error: 'forbidden' });\n  const updated = await profiles.update(profile.id, { displayName: req.body.displayName });\n  return res.json(updated);\n});",
    hint:
      "אל תעדכן לפי id מהלקוח לפני שבדקת שה-resource שייך למשתמש.",
    explanation:
      "זה ההבדל בין route שמזהה משתמש לבין route שמגן על בעלות הנתונים.",
    requiredConcepts: ["lesson_auth_security::authorization", "lesson_auth_security::middleware guard"],
    requiredTerms: ["ownerId", "403", "404", "update"],
    sideExplanation:
      "בדיקת בעלות צריכה להיות בצד השרת כי UI מוסתר אינו מחסום אבטחה.",
  },
];

function appendAuthBuildsOnce(target, items) {
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
  window.SVCOLLEGE_AUTH_BUILDS = SVCOLLEGE_AUTH_BUILDS;
  if (!window.QUESTIONS_BUILD) window.QUESTIONS_BUILD = [];
  appendAuthBuildsOnce(window.QUESTIONS_BUILD, SVCOLLEGE_AUTH_BUILDS);
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_AUTH_BUILDS: SVCOLLEGE_AUTH_BUILDS };
}
