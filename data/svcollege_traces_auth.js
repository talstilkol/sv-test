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
