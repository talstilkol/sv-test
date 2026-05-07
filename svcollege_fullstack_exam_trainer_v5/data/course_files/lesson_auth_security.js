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
      levels: {
        grandma:
          "authentication זה כמו שומר בכניסה לבניין: 'מה התעודה שלך?' מסתכל בתמונה, מסתכל עלייך — מאשר. בודקים שאת באמת את.",
        child:
          "כמו לבקש סיסמה במועדון: 'אבן וגזר' — אם אומר את זה, חבר. אם לא — לא נכנס. authentication = בדיקה שאתה אתה.",
        soldier:
          "authentication: identity verification. methods: password, OAuth, biometric, magic link, MFA. server checks credentials → issues session/token. status codes: 200 success, 401 unauthorized.",
        student:
          "Auth factors: 1) Knowledge (password, PIN). 2) Possession (phone, hardware key). 3) Inherence (biometric). MFA combines 2+. Modern: passwordless (WebAuthn/passkeys), magic links, OAuth providers. flows: traditional (form), OIDC, SAML (enterprise). storage: bcrypt-hashed passwords, never plaintext.",
        junior:
          "מציאות: 1) Use library — never roll your own (Auth.js/NextAuth, Lucia, Clerk, Supabase Auth). 2) Account enumeration — same response 'invalid credentials' for wrong email vs wrong password. 3) Rate limiting login. 4) Email verification mandatory. 5) Forgot password = reset link, not email password back. 6) Brute force protection: lockout after N attempts. 7) Passwordless trending — better UX + security.",
        professor:
          "Authentication establishes identity assertion via credential verification. Theoretical foundations in cryptography (zero-knowledge proofs, challenge-response). Standards: OAuth 2.1, OIDC (OpenID Connect), WebAuthn (FIDO2). The Authentication-Authorization-Accounting (AAA) framework structures access control. Zero-trust architecture eliminates implicit trust based on network location, requiring continuous authentication.",
      },
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
      levels: {
        grandma:
          "authorization זה כמו שאחרי שהשומר זיהה אותך — הוא בודק אם יש לך מפתח לחדר הזה. גם אם את יושב בבניין, לא נכנסים לחדר של מישהו אחר.",
        child:
          "כמו בקופה: יש לך כסף (זיהוי). אבל יש דברים שאסור לך לקנות (יין). authorization = מה מותר לך לעשות, גם אם זיהינו אותך.",
        soldier:
          "authorization: permission check. answer: can THIS user do THIS action on THIS resource. status codes: 200 allowed, 403 forbidden. models: ACL, RBAC (roles), ABAC (attributes), ReBAC (relationships).",
        student:
          "Models: 1) ACL (Access Control List) — list per resource. 2) RBAC — users have roles, roles have permissions. 3) ABAC — policies based on user/resource/env attributes. 4) ReBAC — relationship-based (Google Zanzibar). 5) Capability-based — possess token = right. Implementations: middleware checks, row-level security (RLS) at DB, policy engines (OPA, Cedar).",
        junior:
          "Real life: 1) ALWAYS check authorization at backend, NOT just hide UI. 2) Resource ownership: req.user.id === resource.ownerId. 3) Roles: admin, user, guest — but real apps have more nuance. 4) RLS in Postgres / Supabase — enforce at DB level (defense in depth). 5) Policy engines (OPA) for complex rules. 6) Audit logs — who did what when. 7) Default deny — explicit allow only.",
        professor:
          "Authorization decides whether a subject may perform an action on a resource (typically: subject + action + resource → allow/deny). Models: Mandatory Access Control (MAC, military), Discretionary (DAC, owner-based), Role-Based (RBAC, NIST), Attribute-Based (ABAC, XACML), Relationship-Based (ReBAC, Zanzibar). Modern systems combine approaches; policy-as-code (OPA Rego, Cedar) externalizes rules from application logic enabling audit and reasoning.",
      },
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
      levels: {
        grandma:
          "session זה כמו צמיד חד-פעמי שנותנים לך בכניסה לפסטיבל: כל שומר רואה את הצמיד — לא צריך להראות תעודה כל פעם. session = הצמיד של המשתמש.",
        child:
          "כמו תעודת כניסה למשחקייה: שילמת פעם — קיבלת חותמת ביד. כל המשחקים רואים את החותמת — לא משלמים שוב. session = החותמת.",
        soldier:
          "session: server stores user state (id, roles, etc.) + sends sessionId to client (cookie). client sends sessionId on each request. server lookups → request.user. session expires after timeout/logout. storage: in-memory, Redis, DB.",
        student:
          "Session strategies: 1) Stateful (server-side store) — Redis/DB lookup per request. 2) Stateless (JWT) — token contains claims, no server lookup. 3) Hybrid — JWT + revocation list. Trade-offs: stateful = revocable but stateful, stateless = scalable but harder to revoke. Cookie-based sessions are simpler for browsers; JWT for cross-domain APIs.",
        junior:
          "Real production: 1) Use battle-tested session middleware (express-session, iron-session for Next). 2) Storage in Redis (not memory) — multi-instance servers. 3) sessionId = unguessable (high entropy). 4) Rotate sessionId on privilege change (login, password change). 5) Idle timeout (30min) + absolute timeout (24h). 6) Concurrent sessions: allow multiple or kick old? business decision. 7) Logout — server-side revocation, not just clear cookie.",
        professor:
          "HTTP being stateless requires explicit session mechanisms for stateful applications. Server-side sessions store state out-of-band, identified by an opaque sessionId in cookies. Stateless sessions (JWT) embed signed claims in the token, eliminating server lookup at the cost of revocation complexity. The session lifecycle (create, refresh, expire, revoke) must consider concurrent access, replay attacks, and fixation. Modern alternatives: token-binding (RFC 8471), DPoP (RFC 9449).",
      },
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
      levels: {
        grandma:
          "cookie זה כמו פתק קטן שאת מחזיקה כל פעם שאת חוזרת לחנות: 'הלקוח הזה אוהב שוקולד'. החנות זוכרת אותך גם אחרי חודש.",
        child:
          "כמו ניירת שאתה משאיר בארון בכיתה: כל יום המורה רואה את אותם הספרים שלך. cookie = מידע ששומר את עצמו בדפדפן וחוזר לשרת.",
        soldier:
          "cookie: small text data (max 4KB) stored in browser. attributes: name, value, domain, path, expires, httpOnly, secure, sameSite. sent automatically with requests to matching domain. set via Set-Cookie header.",
        student:
          "Cookie taxonomy: 1) Session cookies (no expiry — deleted on browser close). 2) Persistent (Max-Age/Expires). 3) First-party (same domain) vs third-party. 4) Secure (HTTPS only). 5) HttpOnly (no JS access). 6) SameSite (Strict/Lax/None). modern restrictions: Chrome dropping third-party cookies, Privacy Sandbox alternatives.",
        junior:
          "Real life: 1) Auth cookies = httpOnly + secure + sameSite=lax (or strict). 2) Don't store sensitive data in cookies — only sessionId or signed JWT. 3) Domain attribute: scope carefully (subdomain leaking). 4) GDPR — consent for non-essential cookies. 5) Banner UI mandatory in EU. 6) localStorage > cookies for non-auth client state. 7) Test in incognito (no third-party).",
        professor:
          "HTTP cookies (RFC 6265) provide stateful HTTP via small key-value pairs. The same-origin policy and SameSite attribute mitigate CSRF. Cookie-based authentication remains widespread for browser apps; tokens-in-headers prevail for APIs. The deprecation of third-party cookies (Privacy Sandbox, ITP, ETP) drives migration to first-party data and partitioned storage (CHIPS). Fingerprinting evolves as alternative tracking — addressed by privacy-preserving APIs (Topics, FedCM).",
      },
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
      levels: {
        grandma:
          "secure cookie זה פתק רגיש בכיס פנימי של מעיל: לא בולט, לא נופל, לא נגיש לכייסים. flags = שכבות הגנה.",
        child:
          "כמו לשים את היומן בכספת ולא על השולחן. secure cookie = cookie עם 'מנעולים' שמונעים מאחרים לקרוא או לזייף.",
        soldier:
          "essential flags: httpOnly (no JS access — XSS protection), secure (HTTPS only), sameSite=strict/lax (CSRF protection), max-age (expiry), domain/path (scope). example: { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 86400000 }.",
        student:
          "Defense layers: 1) Confidentiality — encrypt sensitive content (signed cookie). 2) Integrity — HMAC signature. 3) Lifecycle — short max-age, refresh on activity. 4) Scope — narrow domain/path. 5) Cross-site — sameSite=strict for sensitive, lax for navigation. 6) prefix __Host- or __Secure- enforces flags. iron-session encrypts cookie content client can't read.",
        junior:
          "Production: 1) Auth cookies = httpOnly + secure + sameSite=lax + path=/ + max-age. 2) sameSite=none + secure for cross-site (e.g., embed widgets) — but rare. 3) __Host- prefix = path=/, no domain (subdomain isolation). 4) Encrypt sensitive cookies (iron-session): server stores encrypted state, no DB lookup. 5) Logout = res.clearCookie. 6) Don't use cookies as bearer tokens between domains — different security model.",
        professor:
          "Secure cookie attributes implement defense-in-depth against XSS (HttpOnly), MITM (Secure), CSRF (SameSite), and unauthorized scope (Domain, Path). The __Host- prefix (RFC 6265bis) forces strict scoping. Cookie cryptography: signed (integrity) vs encrypted (confidentiality + integrity); JWT in cookie combines both. Modern threats: cookie theft via session-binding alternatives (DPoP, mTLS), cross-site request forgery via SameSite enforcement.",
      },
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
      levels: {
        grandma:
          "JWT זה כמו שטר חתום מהבנק: 'דנה משלמת 100 ש\"ח'. החתימה מבטיחה שלא זויף — אבל כל אחד יכול לקרוא מה כתוב. אסור לשים בו סודות.",
        child:
          "כמו פתק עם חותמת מנהל: 'הילד הזה יכול לצאת מהכיתה'. חותמת = חתימה מאמתת. הפתק עצמו גלוי, אסור להוסיף סודות.",
        soldier:
          "JWT = header.payload.signature, base64url-encoded. signed (HS256/RS256/ES256), NOT encrypted. payload = claims (sub, iat, exp, custom). verify: signature + exp. NEVER trust unverified token.",
        student:
          "Structure: 1) Header — alg, typ. 2) Payload — registered claims (iss, sub, aud, exp, nbf, iat, jti) + custom. 3) Signature — HMAC or RSA/ECDSA. JWS (signed) vs JWE (encrypted, rare). Algorithms: HS256 (shared secret), RS256 (private key sign + public verify — better for federated). 'none' algorithm = security disaster. always specify allowed algs.",
        junior:
          "Production rules: 1) Short-lived access tokens (15min). 2) Refresh tokens for renewal. 3) Verify signature + expiration EVERY request. 4) Validate issuer (iss), audience (aud) claims. 5) Use library (jsonwebtoken, jose) — don't implement. 6) Asymmetric (RS256) for distributed systems. 7) Token revocation hard — use short expiry + revocation list. 8) Don't store JWT in localStorage — XSS vulnerable. httpOnly cookie better.",
        professor:
          "JWT (RFC 7519) is a compact, URL-safe token format. JWS (RFC 7515) provides signing; JWE (RFC 7516) provides encryption. Cryptographic considerations: algorithm confusion attacks (specifying allowed algorithms strictly), key confusion, weak HMAC keys. Critique: JWT often misused (long-lived, large payloads, in localStorage); alternatives like opaque tokens with introspection (RFC 7662) or PASETO address some concerns. Despite criticism, JWT dominates modern auth.",
      },
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
      levels: {
        grandma:
          "access token זה כמו כרטיס יומי לאוטובוס: תקף יום אחד, מאפשר נסיעות, ואחרי זה צריך כרטיס חדש. אם נגנב — מקסימום שמשתמשים יום.",
        child:
          "כמו צמיד למסיבה: תקף 4 שעות, אז צריך חדש. גם אם נופל — לא נורא, נגמר עוד מעט. access token = אישור קצר.",
        soldier:
          "access token: short-lived (5-30min). Bearer token in Authorization header: 'Authorization: Bearer <token>'. signed JWT or opaque. server verifies on each request. expires → client uses refresh token to get new one.",
        student:
          "Access token characteristics: 1) Short-lived (15min typical). 2) Self-contained (JWT) for stateless APIs OR opaque (DB lookup). 3) Bearer = anyone holding it = authorized (dangerous if leaked). 4) Scope-limited: scopes claim narrows permissions. 5) Audience claim: who can verify (specific service). 6) PoP (Proof-of-Possession) tokens (DPoP, mTLS) bind to client cryptographically.",
        junior:
          "Real-world: 1) Storage: memory (most secure) > httpOnly cookie > localStorage (least). 2) Authorization header: Bearer schema. 3) Refresh on 401 → retry original request. 4) Don't log tokens. 5) Don't include in URLs (logged everywhere). 6) Per-request verification: caching key info, not tokens themselves. 7) JWT introspection vs verification: latter cheaper, former allows revocation check.",
        professor:
          "Access tokens (OAuth 2.0, RFC 6749) authorize bearer to access resources. The bearer token semantics (RFC 6750) treats possession as authorization — a security trade-off chosen for simplicity. Token binding mechanisms (token-binding RFC 8471, DPoP RFC 9449, mTLS) cryptographically bind tokens to clients, mitigating theft. Token lifetimes balance security (short = less window) and UX (long = fewer renewals); refresh tokens decouple these concerns.",
      },
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
      levels: {
        grandma:
          "refresh token זה כמו כרטיס מנוי שנתי לחדר כושר: עם זה את מקבלת כרטיס יומי בכניסה. שומרת היטב — כי איתו אפשר להוציא הרבה כרטיסי יום.",
        child:
          "כמו תעודה שנתית של בית-הספר: עם זה אתה יכול לקבל אישורים לכל סוג אירוע. מי שמחזיק = יכול לקבל גישות. שומר טוב!",
        soldier:
          "refresh token: long-lived (days/weeks). exchanged for new access token at /refresh endpoint. stored httpOnly cookie. rotated on use (one-time-use). revocable on logout/breach.",
        student:
          "Refresh token flow: 1) login → receive access + refresh. 2) access expires → POST /refresh with refresh. 3) server validates → new access (+ rotated refresh). 4) old refresh marked used. detection: if old refresh used again → breach signal, revoke all. families/chains for forensics. storage: DB row with user, expiry, revoked flag, family.",
        junior:
          "Production: 1) httpOnly + secure + sameSite cookie. 2) Refresh token rotation = ALWAYS. 3) Detect reuse → invalidate entire chain → force re-login. 4) Server-side store (Redis/DB) for revocation. 5) Track device/user-agent. 6) Sliding expiration: extend on use. 7) Logout = revoke server-side. 8) Refresh endpoint rate-limited. 9) Don't include refresh in JS-accessible storage — only httpOnly cookie or secure-enclave-like.",
        professor:
          "Refresh tokens (OAuth 2.0) decouple long-term identity from short-term access. The rotation pattern (RFC 6819 §5.2.2.3) detects refresh token theft via reuse detection. Implementation requires server-side state (DB table, Redis) — defeating JWT's stateless promise but enabling revocation. Modern alternatives: silent re-authentication via session cookies (browser SSO), continuous access evaluation (CAE) for real-time policy enforcement.",
      },
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
      levels: {
        grandma:
          "OAuth זה כמו ייפוי כוח לעורך-דין: 'אני מאשרת לעורך הדין לראות את חשבון הבנק שלי'. הבנק מאשר אותו — בלי לתת לו את כרטיס האשראי שלי.",
        child:
          "כמו לתת לחבר לקנות קולה בקיוסק עם שובר: השובר תקף לקולה אחת, לא לכל החנות. OAuth = לתת הרשאה מוגבלת לאפליקציה.",
        soldier:
          "OAuth 2.0 flows: 1) Authorization Code (web apps) — most common. 2) Implicit (deprecated). 3) Client Credentials (server-to-server). 4) Resource Owner Password (legacy). PKCE extension for SPAs/mobile. flow: redirect to provider → user approves → callback with code → exchange code for token.",
        student:
          "OAuth 2.0/2.1 architecture: Resource Owner (user), Client (your app), Authorization Server (provider), Resource Server (API). Standard endpoints: /authorize (browser redirect), /token (token exchange). Scopes limit permissions. State param prevents CSRF. PKCE (RFC 7636) prevents code interception. OIDC adds id_token (JWT) for authentication on top of OAuth's authorization.",
        junior:
          "Real implementation: 1) Use library (Auth.js/NextAuth, Passport) — never implement. 2) PKCE always (even for confidential clients). 3) Validate state on callback (CSRF). 4) Validate id_token (OIDC) — signature, iss, aud, exp, nonce. 5) Store provider tokens server-side, give app session to client. 6) Refresh provider tokens server-side. 7) Multiple providers — link to same user account by verified email.",
        professor:
          "OAuth 2.0 (RFC 6749) defines a delegation framework. OAuth 2.1 (consolidating drafts) tightens security: PKCE mandatory, removed implicit/ROPC flows, refresh token rotation. OIDC layers identity on OAuth's authorization. Security threats: CSRF (state), code interception (PKCE), replay (nonce), confused deputy (audience). Modern extensions: Rich Authorization Requests (RAR), DPoP, Pushed Authorization Requests (PAR) for high-security flows (financial, healthcare).",
      },
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
      levels: {
        grandma:
          "provider auth זה כמו לשכור חברת אבטחה במקום לשכור שומר אישי: הם מטפלים בתעודות, מצלמות, אזעקות. את עוסקת בעסק.",
        child:
          "כמו להזמין משלוח במקום לבשל: יש מי שיודע לעשות את זה טוב. provider מטפל ב-login, password reset, email verification — ואתה בונה את שאר האפליקציה.",
        soldier:
          "provider auth services: Supabase, Firebase Auth, Auth0, Clerk, Kinde, Appwrite, AWS Cognito. provide: signup/login UI, password reset, email verification, OAuth integrations, MFA, session management, user database. you focus on app logic.",
        student:
          "Provider auth value props: 1) Pre-built UI components. 2) OAuth integrations (Google, GitHub, etc.) without each individual setup. 3) Compliance (GDPR, SOC2). 4) MFA, passwordless, biometrics. 5) Email/SMS verification. Trade-offs: vendor lock-in, monthly active user pricing, data residency, customization limits. self-host alternatives: Keycloak, Authelia, Authentik.",
        junior:
          "Real choice: 1) Clerk — best UX, B2C SaaS. 2) Supabase Auth — bundled with Postgres, great for full-stack. 3) Auth0 — enterprise, expensive. 4) Firebase — Google ecosystem. 5) NextAuth/Auth.js — self-hosted, flexible. 6) Costs: $25-200/month typical for small apps. 7) Server-side validation ALWAYS — provider giving session ≠ authorized for resource. 8) RLS at DB level for defense-in-depth.",
        professor:
          "Authentication providers commoditize the auth domain — historically painful and frequently misimplemented. The provider pattern aligns with Software-as-a-Service for cross-cutting concerns. Trade-offs: convenience vs control, cost vs maintenance, vendor risk vs build-it-yourself burden. Modern providers leverage OIDC standardization enabling switching. Self-hosted (Keycloak, Authentik) provide control at operational cost. The decision balances time-to-market with long-term flexibility.",
      },
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
      levels: {
        grandma:
          "password hashing זה כמו לטחון את הסיסמה לקפה: אי אפשר להחזיר את הקפה לפולים. אם הגנבים יקחו את הקפה — הם לא יוכלו ללמוד את הסיסמה המקורית.",
        child:
          "כמו לערבב צבעים: כחול+צהוב=ירוק. מירוק לא יודעים אם זה היה כחול+צהוב או טורקיז+חרדל. hashing = ערבוב חד-כיווני.",
        soldier:
          "hash function: input → fixed output, one-way (no reverse). password hashing: bcrypt, scrypt, argon2 — slow on purpose. flow: signup: hash(password+salt) → store. login: hash(input+salt) → compare. NEVER store plaintext, NEVER reversible encryption.",
        student:
          "Why slow hashing: brute force attack scales with hash speed. fast hash (SHA-256) lets attacker try billions/sec on GPU. slow hash (bcrypt cost=12 = ~250ms) limits to ~4/sec/core. salt: per-user random prefix prevents rainbow tables + same password→different hash. modern: Argon2id (memory-hard, GPU-resistant) preferred. cost factor adjustable as hardware improves.",
        junior:
          "Real production: 1) bcrypt — proven, widely supported. 2) argon2id — newer, recommended by OWASP. 3) cost factor: bcrypt 12-14 (250ms-1s typical). 4) NEVER MD5, SHA-1, SHA-256 alone for passwords. 5) Pepper (server-side secret + per-user salt) extra layer. 6) Hash before sending to DB — even DBA can't see plaintext. 7) Migration path: re-hash on next login if cost factor outdated. 8) Passkeys/WebAuthn = better than passwords entirely.",
        professor:
          "Password hashing requires cryptographic functions designed to resist brute force on modern hardware. Memory-hard functions (scrypt, Argon2) increase cost on GPUs/ASICs by requiring large memory. Argon2 (winner of PHC 2015) offers Argon2i (side-channel resistant), Argon2d (faster), Argon2id (combined). Parameters: time cost, memory cost, parallelism — tuned to hardware budget. Salt prevents rainbow tables; pepper (server-side) adds defense if DB leaks. Future: passkeys eliminate passwords entirely via WebAuthn.",
      },
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
      levels: {
        grandma:
          "bcrypt זה כמו טחנת קפה איטית במכוון: לוקחת 10 שניות לכל פולים. אם תרצה לטחון מיליון סיסמאות במכונה הזו — תיקח שנים. גנבים ייפלו.",
        child:
          "כמו לפתור פאזל קשה לכל סיסמה: 1 פאזל = 1 שנייה. 1000 ניחושים = 1000 שניות. bcrypt קשה במכוון = גנב מתעייף.",
        soldier:
          "bcrypt: based on Blowfish cipher. params: cost (4-31, typical 10-14). slower as cost increases (2x per increment). API: hash(password, cost), compare(password, hash). includes salt automatically. output: $2b$cost$salthash format.",
        student:
          "bcrypt internals: Eksblowfish key schedule with iterative key derivation (2^cost iterations). cost 12 ≈ 250ms on modern hardware. compare uses constant-time comparison preventing timing attacks. limitations: 72-byte input cap (passwords longer truncated). max cost 31 (impractical). modern critique: not memory-hard (GPU advantage). still secure for typical use cases when cost properly tuned.",
        junior:
          "Production: 1) cost=12 default, 14 for high-security. 2) Benchmark on prod hardware — cost = ~250ms target. 3) bcryptjs (pure JS) slower than native bcrypt — use native in Node. 4) WebAuthn > password hashing if possible. 5) Re-hash on login if outdated cost. 6) Don't run with cost=4 in production (default in some libs!). 7) compare() always — never === (timing attack). 8) Argon2id better choice for new projects.",
        professor:
          "bcrypt (Provos & Mazières 1999) was designed for password hashing using the Blowfish cipher's expensive key schedule. The cost parameter is logarithmic — each increment doubles work. Limitations: not memory-hard (GPU/FPGA advantages), 72-byte input limit, no parallelism parameter. PBKDF2 (older) and scrypt/Argon2 (newer) offer alternatives with different trade-offs. OWASP password storage cheat sheet recommends Argon2id, with bcrypt and PBKDF2 as acceptable alternatives.",
      },
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
      levels: {
        grandma:
          "CSRF זה כמו שמישהו זייף ייפוי-כוח שלך וברגע שהבנק רואה את החתימה שלך — הוא מקבל את ייפוי הכוח. הדפדפן שולח cookies שלך אוטומטית — וזאת הבעיה.",
        child:
          "כמו שאמא חתמה על אישור לבית-הספר, ומישהו לקח את האישור הזה ושינה אותו לטיול אחר. הבית-ספר מאמין כי החתימה אמיתית. CSRF = פעולה בשמך בלי הסכמתך.",
        soldier:
          "CSRF (Cross-Site Request Forgery): malicious site triggers request to your-site.com using user's cookies. defense: 1) sameSite cookies. 2) CSRF token (synchronizer). 3) Custom header (X-Requested-With). 4) Origin header check.",
        student:
          "CSRF mechanics: <img src='https://bank.com/transfer?to=attacker'> in malicious page. browser sends bank.com cookies. without defenses, transfer happens. modern defenses: 1) sameSite=lax (default in modern browsers) — blocks cross-site cookies on dangerous methods. 2) sameSite=strict — full block. 3) CSRF token: random per-session/request, validated server-side. 4) Double-submit cookie pattern.",
        junior:
          "Real-world: 1) sameSite=lax sufficient for most apps (modern browsers default). 2) Add CSRF token for sensitive ops as defense in depth (csurf library, NextAuth built-in). 3) GET requests must be safe (no state change) — design principle. 4) JSON APIs: Content-Type required can break CSRF (most attackers can't set custom headers via simple form). 5) WebSocket vulnerable to similar — verify origin.",
        professor:
          "CSRF (OWASP Top 10 historic) exploits browser ambient authority — automatic cookie inclusion. The Same-Origin Policy doesn't prevent cross-origin requests, only cross-origin reads. Defenses partition into: 1) Cookie scoping (SameSite RFC 6265bis). 2) Token-based (synchronizer, double-submit, encrypted) — break cross-origin requests' ability to forge. 3) Origin/Referer header verification. Modern browsers' SameSite=Lax default significantly mitigates the threat without app changes.",
      },
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
      levels: {
        grandma:
          "XSS זה כמו שמישהו מסתיר עט עם דיו רעיל בתוך מכתב לאמא: היא פותחת — והדיו מתפזר. אסור לסמוך שכל מה שנכנס לדף הוא טקסט בלבד.",
        child:
          "כמו אם מישהו ישלח לך שיר עם וירוס בתוך המילים: כל מי שיקרא — המחשב יידבק. XSS = להחביא קוד מסוכן בתוך מה שנראה תמים.",
        soldier:
          "XSS types: 1) Reflected — URL param echoed in page. 2) Stored — DB content displayed. 3) DOM-based — JS reads URL/storage and executes. defense: textContent (NOT innerHTML), escape user input, CSP headers, Content-Type, sanitize (DOMPurify) when HTML needed.",
        student:
          "XSS payloads: <script>, <img onerror>, <svg onload>, javascript: URLs. impact: cookie theft, session hijack, keylogging, phishing, defacement. prevention layers: 1) Output encoding (HTML, attr, JS, URL contexts). 2) CSP (Content-Security-Policy) — restricts script sources. 3) Sanitization libraries for rich text (DOMPurify). 4) HttpOnly cookies prevent JS theft. 5) Trusted Types API (Chrome) enforces.",
        junior:
          "Real production: 1) React/Vue auto-escape — dangerouslySetInnerHTML breaks the safety. 2) Sanitize HTML if user-generated content allowed. 3) CSP strict-dynamic with nonces — modern best practice. 4) Avoid eval, new Function, setTimeout('string'). 5) URL contexts: avoid user-controlled javascript: in href. 6) JSON in HTML: encode JSON properly. 7) X-Content-Type-Options: nosniff. 8) Frame-Options to prevent clickjacking.",
        professor:
          "XSS occurs when an attacker injects executable code into a context where it's interpreted as such (HTML, JS, attribute, URL). The OWASP Cheat Sheet enumerates encoding rules per context. CSP (W3C) provides defense-in-depth via source whitelisting; CSP3 introduces strict-dynamic and Trusted Types. Trusted Types (W3C draft) requires explicit policy creation for dangerous sinks, enforcing safe-by-default. Browser architectural improvements (Site Isolation, Cross-Origin Resource Policy) further reduce blast radius.",
      },
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
      levels: {
        grandma:
          "CORS זה כמו רשימת אורחים במסיבה: 'מי מותר להיכנס?' אם השרת לא ברשימה — לא נכנס. הדפדפן בודק לפני שמראה לך תוצאה.",
        child:
          "כמו שאישור הורים נדרש: בית-הספר שלך — בסדר. אבל אישור מבית-ספר אחר — לא תקף. CORS = רק אתרים מאושרים יכולים לקרוא תשובות מה-API.",
        soldier:
          "CORS = Cross-Origin Resource Sharing. enforced by browser, not server. server sets Access-Control-Allow-Origin header. preflight (OPTIONS) for non-simple requests. methods, headers, credentials must be explicitly allowed.",
        student:
          "CORS flow: 1) browser checks origin matches request origin → if same, no CORS. 2) different origin → check if 'simple' (GET/HEAD/POST + simple headers) → send with Origin header. 3) complex → preflight OPTIONS. 4) server responds with Allow-* headers. 5) browser allows or blocks. credentials (cookies, auth headers) require explicit allow + specific origin (no *).",
        junior:
          "Real CORS pain: 1) Wildcard * + credentials = error (security). 2) Vary: Origin if returning specific origins per request. 3) Don't rely on CORS for security — server-side auth checks ALWAYS. 4) Preflight cache: Access-Control-Max-Age. 5) Errors hard to debug — Network tab + browser console. 6) curl/Postman bypass CORS (not browsers). 7) WebSocket CORS = check Origin in handshake. 8) Public APIs: * fine; private: list explicit origins.",
        professor:
          "CORS (W3C, fetch standard) extends Same-Origin Policy by allowing controlled cross-origin access. The browser enforces the boundary; servers opt-in via headers. CORS is NOT a security mechanism for the server — anyone can make the request via non-browser tools. It's a browser sandbox protecting users from malicious sites reading sensitive cross-origin data. Fetch metadata (Sec-Fetch-*) provides additional context for server-side decisions.",
      },
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
      levels: {
        grandma:
          "middleware guard זה כמו שומר בכל מסדרון: לפני שאתה נכנס לחדר — הוא בודק אישור. במקום לשים שומר בכל חדר — אחד מרכזי.",
        child:
          "כמו מורה שעומדת ליד הדלת ובודקת לפני המבחן: מי שיש לו עט = נכנס. אין עט = יוצא. middleware בודק כל מי שמנסה להיכנס.",
        soldier:
          "middleware guard: function (req, res, next). check auth → if pass: next(); if fail: res.status(401/403). applied per-route or globally. Express: app.use(guard, route). NestJS: @UseGuards(). Next.js: middleware.ts.",
        student:
          "Guard patterns: 1) requireAuth — checks session/token, attaches user. 2) requireRole(role) — RBAC check. 3) requireOwnership — resource owner check. 4) rateLimiter — rate limiting. composition: chain guards (requireAuth → requireRole → handler). early exit on fail. error handling: throw or response. middleware order matters: parser before auth, auth before authorization.",
        junior:
          "Practical: 1) Single source of truth for auth check. 2) Attach user to req.user — handlers trust it exists. 3) Type-safe: TypeScript request augmentation. 4) Test guards in isolation. 5) Don't bury guards — explicit application. 6) Audit log unauthorized attempts. 7) Differentiate 401 (auth missing) vs 403 (auth insufficient). 8) JWT verification in guard, not handler. 9) Refresh token logic in dedicated middleware/route.",
        professor:
          "Middleware guards implement the Chain of Responsibility pattern for cross-cutting concerns. The pattern aligns with AOP (Aspect-Oriented Programming) — separating authentication/authorization from business logic. Modern frameworks express guards via decorators (NestJS @UseGuards), HOCs, or middleware functions. The pattern enables compositional security — combining authentication, authorization, rate limiting, logging declaratively. Cuckoo problem: deciding what's middleware vs handler — typically: cross-cutting → middleware.",
      },
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
      levels: {
        grandma:
          "Supabase Auth זה כמו אבטחה משולבת לבית: גם דלת קדמית (login) וגם מצלמות בכל חדר (RLS). הכל מערכת אחת.",
        child:
          "כמו ערכת אבטחה כל-באחד: מנעולים, אזעקה, מצלמה. במקום להזמין כל אחד מחברה אחרת — חבילה אחת. Supabase = auth + DB + סטורג' ביחד.",
        soldier:
          "Supabase Auth: managed authentication on top of Postgres. providers: email/password, magic link, OAuth (Google, GitHub, Apple, etc.), phone OTP. JWT-based session. RLS (Row-Level Security) at DB level. SDK: @supabase/supabase-js, @supabase/auth-helpers (Next.js).",
        student:
          "Architecture: GoTrue (auth server) + Postgres + RLS. JWT issued by GoTrue, includes user metadata + role. Postgres uses auth.uid() in RLS policies. SSR pattern: server reads cookie → validates JWT → fetches data with user context. New auth helpers (@supabase/ssr) for App Router. Custom claims via service_role.",
        junior:
          "Real production: 1) RLS = MUST enable on all user-facing tables. 2) auth.uid() in policies. 3) Server-side validation always — even if RLS exists (defense in depth). 4) Service role key NEVER in client. 5) Magic links on production = real email service (SendGrid, Postmark). 6) MFA available — enable for admin accounts. 7) Migration: built-in user mgmt vs separate users table — Supabase handles it. 8) Custom auth flows possible via Edge Functions.",
        professor:
          "Supabase Auth integrates GoTrue (Postgres-backed auth) with Postgres RLS, providing end-to-end authorization. The architecture leverages Postgres as the source of truth, with JWT serving as identity assertion. RLS policies in SQL implement fine-grained authorization at the data layer — defense beyond application logic. The pattern aligns with the BaaS (Backend-as-a-Service) trend; Firebase pioneered this, Supabase brings open-source SQL-based alternative. Trade-offs: vendor architecture vs flexibility.",
      },
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
      levels: {
        grandma:
          "Firebase Auth זה כמו חברת אבטחה של גוגל: יש להם תשתית ענקית, פתרונות מוכנים לכניסה דרך Google, Facebook ועוד. את משתמשת בקטלוג המוכן.",
        child:
          "כמו פלטפורמה מוכנה לאתר: בלי לבנות login form עצמו, בלי לזכור איך לאמת — Firebase מטפל בכל. הם מאמתים — אתה משתמש.",
        soldier:
          "Firebase Auth: Google's auth service. providers: email, phone, OAuth (Google, FB, Apple, GitHub, Twitter, MS), anonymous, custom. id_token (JWT) signed by Google, validated via public keys. SDK: client + Admin SDK (server). hosted on Firebase project.",
        student:
          "Firebase architecture: client SDK manages tokens; server uses Admin SDK to verify. id_token JWT contains uid, email, claims. server-side: getAuth().verifyIdToken(token) → user. Custom claims for roles (max 1000 bytes). emulator for local dev. Cloud Functions for triggers (onCreate, onDelete user).",
        junior:
          "Production: 1) ALWAYS verify id_token server-side (Admin SDK) — client can lie. 2) Custom claims for RBAC, set via admin. 3) Token caching — token valid 1h, refresh handled by client SDK. 4) Anonymous auth → upgrade to permanent — UX win. 5) Firebase rules for Firestore/Realtime DB — declarative authorization. 6) Costs: free tier generous, MAU-based pricing. 7) Lock-in moderate — token format standard, but Firestore rules specific.",
        professor:
          "Firebase Auth provides identity infrastructure as part of Google's BaaS ecosystem. Tokens are standard OIDC id_tokens signed with rotating keys (JWKS endpoint). Server verification follows OIDC discovery: fetch JWKS, validate signature, check claims. Architectural strengths: zero-config OAuth providers, mobile-first SDKs, integration with Firebase ecosystem (Firestore Rules). Limitations: vendor coupling, less customization than self-hosted (Keycloak), Google ecosystem lock-in.",
      },
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
      levels: {
        grandma:
          "Kinde ו-Appwrite זה כמו לבחור בין שני שווקים: שניהם מוכרים מצרכים — אבל באירגון אחר, מחיר אחר, סגנון אחר. בוחרים מי מתאים יותר לעסק שלך.",
        child:
          "כמו לבחור בין שתי חברות סלולר: שתיהן עובדות, אבל יש הבדלים בחבילות, במחיר, בכיסוי. אתה בוחר את מה שמתאים לך.",
        soldier:
          "Kinde: B2B/SaaS focused, organizations/permissions built-in. Appwrite: open-source self-host alternative to Firebase. both: REST + SDK, OAuth providers, MFA, user management. Kinde easier setup; Appwrite more control + self-hosting.",
        student:
          "Kinde positioning: feature flags + auth + permissions + organizations — for SaaS quick start. Appwrite positioning: open-source BaaS — auth + DB + storage + functions + messaging. self-host: Docker compose. Both modern alternatives to Auth0 (expensive enterprise) or building from scratch. Comparison axes: pricing, hosting, customization, ecosystem maturity.",
        junior:
          "Choosing: 1) B2B SaaS, multi-tenant, need orgs/permissions → Kinde. 2) Want self-host, full control, open source → Appwrite. 3) Need just auth, fastest setup → Clerk. 4) Building on Postgres → Supabase. 5) Google ecosystem → Firebase. 6) Enterprise SSO needs → Auth0/WorkOS. 7) Self-host all → Keycloak. The decision = team skills + scale + cost + data residency. ALWAYS server-side validation regardless of provider.",
        professor:
          "The auth provider landscape reflects a maturing market: Kinde, Stack Auth, Clerk represent newer B2B/developer-focused entrants; Appwrite, Authelia, Keycloak represent open-source self-hosted alternatives. Differentiation occurs along: pricing model (per-MAU vs per-feature), hosting (managed vs self), specialization (consumer vs enterprise vs B2B). Standards (OIDC, OAuth, SCIM) enable migration; provider-specific features (Auth0 Rules, Clerk Components) create soft lock-in.",
      },
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
