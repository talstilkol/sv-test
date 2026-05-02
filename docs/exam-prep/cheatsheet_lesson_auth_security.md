# Auth & Security - אימות, הרשאות וגבולות אבטחה — דף סיכום למבחן

**מודול SVCollege:** אימות ואבטחה - JWT, Cookies, Supabase/Appwrite/Firebase/Kinde

**תיאור:** איך מערכת Full Stack מזהה משתמש, מחליטה מה מותר לו לעשות, שומרת session בטוח, ומחברת provider auth בלי לחשוף secrets בצד הלקוח.

**מספר מושגים:** 19

---

## מושגים בסיכום

### 1. authentication

**רמת קושי:** 3/10

**מה זה:** authentication היא בדיקת זהות: האם האדם שמול המערכת הוא באמת המשתמש שהוא טוען שהוא.

**למה Full Stack:** בלי authentication אי אפשר לדעת מי מבצע בקשה, ולכן אי אפשר לבנות פרופיל, dashboard אישי או פעולות שמורות.

**דוגמה:**
```
const user = await verifyCredentials(email, password);
if (!user) return res.status(401).json({ error: 'invalid credentials' });
```

**הסבר:** השרת בודק פרטי כניסה מול מקור אמין ומחזיר 401 אם הזהות לא אומתה.

⚠️ **טעות נפוצה:** לבלבל authentication עם authorization. קודם מזהים מי המשתמש, ורק אחר כך מחליטים מה מותר לו לעשות.

**תלוי ב:** `lesson_17::Request`

---

### 2. authorization

**רמת קושי:** 4/10

**מה זה:** authorization היא בדיקת הרשאה: אחרי שזיהינו את המשתמש, האם מותר לו לבצע פעולה מסוימת.

**למה Full Stack:** גם משתמש מחובר לא אמור למחוק נתונים של משתמש אחר או להיכנס למסך admin בלי role מתאים.

**דוגמה:**
```
if (request.user.id !== resource.ownerId) {
  return res.status(403).json({ error: 'forbidden' });
}
```

**הסבר:** 403 אומר: הבנו מי אתה, אבל הפעולה לא מותרת עבורך.

⚠️ **טעות נפוצה:** להסתפק בכך שיש token תקין. token מוכיח זהות, לא בהכרח בעלות על המשאב.

**תלוי ב:** `lesson_auth_security::authentication`

---

### 3. session

**רמת קושי:** 3/10

**מה זה:** session היא זיכרון התחברות מתמשך בין בקשות HTTP נפרדות.

**למה Full Stack:** HTTP לא זוכר את הבקשה הקודמת. session מאפשרת לשרת לדעת שהמשתמש כבר התחבר.

**דוגמה:**
```
req.session.userId = user.id;
res.json({ ok: true });
```

**הסבר:** השרת שומר מזהה משתמש בתוך session, והדפדפן מחזיק cookie שמצביע אליה.

⚠️ **טעות נפוצה:** לשמור יותר מדי מידע רגיש בתוך session או לא להגדיר לה תפוגה.

**תלוי ב:** `lesson_17::HTTP`

---

### 4. cookie

**רמת קושי:** 3/10

**מה זה:** cookie היא חתיכת מידע קטנה שהדפדפן שומר ושולח אוטומטית לשרת באותו domain.

**למה Full Stack:** cookies משמשות לעיתים להחזיק session id או refresh token בצורה שהשרת יכול לקרוא בכל בקשה.

**דוגמה:**
```
res.cookie('sid', sessionId, { httpOnly: true, sameSite: 'lax' });
```

**הסבר:** השרת מגדיר cookie, והדפדפן ישלח אותה חזרה בבקשות הבאות לאותו origin.

⚠️ **טעות נפוצה:** לחשוב שכל cookie בטוחה. בלי flags נכונים היא עלולה להיחשף או להישלח בהקשר לא רצוי.

**תלוי ב:** `lesson_auth_security::session`

---

### 5. secure cookie

**רמת קושי:** 4/10

**מה זה:** secure cookie היא cookie עם flags שמקטינים חשיפה: httpOnly, secure, sameSite ותפוגה.

**למה Full Stack:** flags נכונים מקטינים סיכון לגניבת token דרך JavaScript או שליחה אוטומטית בהקשר מסוכן.

**דוגמה:**
```
res.cookie('refresh', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 1000 * 60 * 60 * 24 * 7
});
```

**הסבר:** httpOnly מונע קריאה דרך JavaScript, secure דורש HTTPS, sameSite מצמצם CSRF.

⚠️ **טעות נפוצה:** לשמור token רגיש ב-cookie בלי httpOnly או בלי תאריך תפוגה ברור.

**תלוי ב:** `lesson_auth_security::cookie`

---

### 6. JWT

**רמת קושי:** 5/10

**מה זה:** JWT הוא token חתום שמכיל claims כמו userId ותפוגה. השרת יכול לאמת שהוא לא שונה בדרך.

**למה Full Stack:** JWT נפוץ ב-API auth, אבל חייבים להבין שהוא חתום ולא מוצפן, ולכן לא שמים בו סודות.

**דוגמה:**
```
const payload = verifyJwt(token, process.env.AUTH_SECRET);
req.user = { id: payload.sub, role: payload.role };
```

**הסבר:** השרת מאמת חתימה ותפוגה לפני שהוא סומך על claims שבתוך token.

⚠️ **טעות נפוצה:** לשים ב-JWT מידע סודי או להאמין ל-payload בלי verify.

**תלוי ב:** `lesson_auth_security::authentication`

---

### 7. access token

**רמת קושי:** 4/10

**מה זה:** access token הוא אישור קצר-חיים שמאפשר לבצע בקשות API בשם משתמש מחובר.

**למה Full Stack:** קיצור חיים מגביל נזק אם token דולף, ועדיין מאפשר UX מהיר לבקשות רגילות.

**דוגמה:**
```
Authorization: Bearer <access-token>
```

**הסבר:** הלקוח שולח token בכותרת Authorization, והשרת מאמת אותו לפני route מוגן.

⚠️ **טעות נפוצה:** לתת access token ארוך מדי או לשמור אותו במקום נגיש ל-XSS.

**תלוי ב:** `lesson_auth_security::JWT`

---

### 8. refresh token

**רמת קושי:** 5/10

**מה זה:** refresh token הוא token ארוך יותר שמוציא access token חדש בלי לבקש סיסמה בכל פעם.

**למה Full Stack:** הוא מאזן בין אבטחה ל-UX: access קצר, refresh מוגן יותר ומנוהל בקפדנות.

**דוגמה:**
```
const nextAccessToken = await rotateRefreshToken(refreshToken);
```

**הסבר:** rotation מחליף refresh token ישן בחדש כדי לזהות שימוש חוזר חשוד.

⚠️ **טעות נפוצה:** לשמור refresh token באותו מקום כמו access token או לא לבטל אותו ביציאה.

**תלוי ב:** `lesson_auth_security::access token`

---

### 9. OAuth

**רמת קושי:** 5/10

**מה זה:** OAuth הוא flow הרשאה שבו provider חיצוני מאפשר לאפליקציה לקבל גישה מוגבלת בלי לקבל את הסיסמה של המשתמש.

**למה Full Stack:** Login with provider נפוץ ב-SVCollege ובמוצרים אמיתיים, אבל צריך להבין redirect, callback, state ו-token exchange.

**דוגמה:**
```
GET /auth/provider
GET /auth/callback?code=...&state=...
```

**הסבר:** השרת שולח ל-provider, מקבל code בחזרה, ומחליף אותו בשרת מול provider.

⚠️ **טעות נפוצה:** לדלג על בדיקת state או לבצע token exchange בצד הלקוח עם secret.

**תלוי ב:** `lesson_auth_security::authentication`

---

### 10. provider auth

**רמת קושי:** 4/10

**מה זה:** provider auth הוא שימוש בשירות כמו Supabase, Firebase, Appwrite או Kinde לניהול התחברות.

**למה Full Stack:** provider מקצר עבודה, אבל המפתח עדיין חייב להבין roles, sessions, redirects וגבולות trust.

**דוגמה:**
```
const session = await authProvider.getSession(request);
if (!session) return redirect('/login');
```

**הסבר:** הקוד נשאר רעיוני: קוראים session מה-provider ומחליטים אם לאפשר גישה.

⚠️ **טעות נפוצה:** לחשוב שה-provider פוטר מבדיקת authorization באפליקציה.

**תלוי ב:** `lesson_auth_security::OAuth`

---

### 11. password hashing

**רמת קושי:** 5/10

**מה זה:** password hashing שומר גרסה חד-כיוונית של סיסמה במקום לשמור את הסיסמה עצמה.

**למה Full Stack:** אם database דולף, hash טוב מקשה מאוד על שחזור סיסמאות.

**דוגמה:**
```
const passwordHash = await hashPassword(password);
await users.create({ email, passwordHash });
```

**הסבר:** שומרים passwordHash ולא password. בזמן login משווים password חדש מול hash קיים.

⚠️ **טעות נפוצה:** לשמור סיסמה כטקסט רגיל או להצפין אותה בצורה שאפשר לפענח חזרה.

**תלוי ב:** `lesson_sql_orm::database`

---

### 12. bcrypt

**רמת קושי:** 5/10

**מה זה:** bcrypt הוא אלגוריתם hashing לסיסמאות עם salt ועלות חישוב שמאטה brute force.

**למה Full Stack:** bcrypt מלמד למה password hash צריך להיות איטי יחסית ומותאם לסיסמאות, לא hash כללי מהיר.

**דוגמה:**
```
const ok = await bcrypt.compare(password, user.passwordHash);
```

**הסבר:** compare בודק סיסמה מול hash בלי לחשוף את הסיסמה השמורה.

⚠️ **טעות נפוצה:** להשתמש ב-hash מהיר מדי לסיסמאות או לקבוע cost גבוה שמפיל את השרת.

**תלוי ב:** `lesson_auth_security::password hashing`

---

### 13. CSRF

**רמת קושי:** 5/10

**מה זה:** CSRF הוא מצב שבו אתר אחר גורם לדפדפן לשלוח בקשה עם cookies של המשתמש בלי שהוא התכוון.

**למה Full Stack:** כאשר auth נשען על cookies, חייבים להבין sameSite, CSRF token ו-methods מסוכנים.

**דוגמה:**
```
if (req.method !== 'GET') verifyCsrfToken(req);
```

**הסבר:** בקשות שמשנות מידע צריכות הוכחה שהן הגיעו מהאפליקציה שלך ולא מטופס חיצוני.

⚠️ **טעות נפוצה:** להגן רק על login ולשכוח פעולות update/delete.

**תלוי ב:** `lesson_auth_security::secure cookie`

---

### 14. XSS boundary

**רמת קושי:** 5/10

**מה זה:** XSS boundary הוא הגבול שמונע מקלט משתמש להפוך לקוד JavaScript שרץ בדפדפן.

**למה Full Stack:** XSS יכול לגנוב tokens, לשנות UI ולשלוח פעולות בשם המשתמש.

**דוגמה:**
```
element.textContent = userInput;
// not: element.innerHTML = userInput
```

**הסבר:** textContent מציג טקסט. innerHTML על קלט לא מסונן עלול להריץ markup מסוכן.

⚠️ **טעות נפוצה:** לפתור auth ואז לחשוף אותו דרך XSS שמאפשר לגנוב session או לבצע פעולות.

**תלוי ב:** `lesson_13::DOM`

---

### 15. CORS

**רמת קושי:** 4/10

**מה זה:** CORS הוא מנגנון דפדפן שמחליט אילו origins רשאים לקרוא responses מה-API.

**למה Full Stack:** Frontend ו-backend לעיתים רצים ב-origins שונים, ו-CORS שגוי חוסם את האפליקציה או פותח יותר מדי.

**דוגמה:**
```
app.use(cors({ origin: allowedOrigin, credentials: true }));
```

**הסבר:** השרת מגדיר origin מותר והאם cookies/credentials יכולים להישלח.

⚠️ **טעות נפוצה:** לשים origin: '*' יחד עם credentials או לפתוח לכל העולם בלי צורך.

**תלוי ב:** `lesson_17::HTTP`

---

### 16. middleware guard

**רמת קושי:** 4/10

**מה זה:** middleware guard הוא קוד שרץ לפני route ומחליט אם הבקשה מורשית להמשיך.

**למה Full Stack:** guard מרכז auth logic ומונע שכפול בדיקות בכל route.

**דוגמה:**
```
function requireUser(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'login required' });
  next();
}
```

**הסבר:** אם אין user מאומת מחזירים 401. אחרת ממשיכים ל-route הבא.

⚠️ **טעות נפוצה:** לשכוח לשים guard על route רגיש כי הבדיקה מפוזרת בקבצים שונים.

**תלוי ב:** `lesson_17::middleware`

---

### 17. Supabase Auth

**רמת קושי:** 4/10

**מה זה:** Supabase Auth הוא provider שמנהל משתמשים, sessions ו-login flows לצד database ו-RLS.

**למה Full Stack:** הוא נפוץ בפרויקטים מהירים, אבל עדיין צריך להבין server-side session checks ו-authorization לפי data.

**דוגמה:**
```
const session = await supabaseAuth.getSession(request);
```

**הסבר:** הקוד רעיוני: בקשת session צריכה להיבדק בצד שרת לפני מידע פרטי.

⚠️ **טעות נפוצה:** להסתמך רק על UI שמסתיר כפתור במקום לאכוף הרשאות בשרת או ב-RLS.

**תלוי ב:** `lesson_auth_security::provider auth`

---

### 18. Firebase Auth

**רמת קושי:** 4/10

**מה זה:** Firebase Auth הוא provider שמנהל login ומשתמשים, בדרך כלל עם token שהשרת צריך לאמת.

**למה Full Stack:** גם כש-Firebase נותן token, backend חייב לאמת אותו ולבדוק הרשאה למשאב.

**דוגמה:**
```
const decoded = await verifyProviderToken(idToken);
```

**הסבר:** השרת מאמת token מול provider לפני שהוא יוצר req.user.

⚠️ **טעות נפוצה:** לסמוך על userId שנשלח מהלקוח בלי verify provider token.

**תלוי ב:** `lesson_auth_security::provider auth`

---

### 19. Kinde/Appwrite

**רמת קושי:** 4/10

**מה זה:** Kinde ו-Appwrite הם provider options שמציעים auth flows מוכנים, user management ו-integration hooks.

**למה Full Stack:** הם יכולים לקצר פיתוח, אבל הבחירה בכלי לא מחליפה הבנת session, roles, redirects ו-server validation.

**דוגמה:**
```
const user = await providerAuth.requireUser(request);
```

**הסבר:** הקוד נשאר generic כדי לא להמציא API. הרעיון הוא guard בצד שרת שמחזיר user מאומת.

⚠️ **טעות נפוצה:** לבנות authorization סביב שם provider במקום סביב rules עסקיים של האפליקציה.

**תלוי ב:** `lesson_auth_security::provider auth`

---
