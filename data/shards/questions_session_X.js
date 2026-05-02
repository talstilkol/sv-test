// data/shards/questions_session_X.js
// Sprint 2 batch X — Auth/Security
// 50 questions: 35 MC + 15 Fill

window.QUESTIONS_SHARD_X = {
  mc: [
    {
      id: "mc_authn_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::authentication",
      level: 5,
      question: "Authentication:",
      options: [
        "Verify identity — מי אתה? (login, password, MFA)",
        "Verify permissions",
        "Encrypt data",
        "Throttle requests"
      ],
      correctIndex: 0,
      explanation: "AuthN. Distinct from authorization (AuthZ).",
      optionFeedback: [
        "✅ נכון. authn מאמת מי אתה — לא מה מותר לך.",
        "❌ זה authorization — מה מותר לך לעשות.",
        "❌ encryption הוא layer נפרד.",
        "❌ rate limiting הוא protection אחרת."
      ]
    },
    {
      id: "mc_authz_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::authorization",
      level: 5,
      question: "Authorization:",
      options: [
        "Verify permissions — מה מותר לך? (RBAC, ABAC)",
        "Identity check",
        "Encryption",
        "Logging"
      ],
      correctIndex: 0,
      explanation: "After authentication. RBAC: roles. ABAC: attributes.",
      optionFeedback: [
        "✅ נכון. authz בודק הרשאות אחרי אימות.",
        "❌ זה authentication — שלב מקדים.",
        "❌ encryption הוא transport security.",
        "❌ logging הוא audit, לא enforcement."
      ]
    },
    {
      id: "mc_session_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::session",
      level: 6,
      question: "Session-based auth:",
      options: [
        "Server stores session state. Client sends session ID via cookie",
        "Client stores all state",
        "No state",
        "JWT only"
      ],
      correctIndex: 0,
      explanation: "Stateful. Easy to revoke server-side.",
      optionFeedback: [
        "✅ נכון. session = stateful, ID ב-cookie.",
        "❌ זה JWT (stateless).",
        "❌ session state חיוני.",
        "❌ JWT הוא alternative."
      ]
    },
    {
      id: "mc_cookie_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::cookie",
      level: 5,
      question: "HTTP Cookie:",
      options: [
        "Small data (≤4KB) sent automatically with requests to same domain",
        "Large file",
        "JS only",
        "Browser hidden"
      ],
      correctIndex: 0,
      explanation: "Sent in Cookie header.",
      optionFeedback: [
        "✅ נכון. cookies קטנים ונשלחים אוטומטית.",
        "❌ ~4KB מקסימום.",
        "❌ נגישים גם server-side.",
        "❌ visible in DevTools."
      ]
    },
    {
      id: "mc_seccookie_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::secure cookie",
      level: 7,
      question: "Cookie attributes for security:",
      options: [
        "httpOnly + Secure + SameSite=Lax/Strict — XSS+MITM+CSRF protection",
        "httpOnly only",
        "all defaults",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "All three together = defense in depth.",
      optionFeedback: [
        "✅ נכון. שלושת הflags עובדים יחד.",
        "❌ httpOnly בלבד = חסר Secure ו-SameSite.",
        "❌ defaults לא מספקים אבטחה.",
        "❌ standard practice."
      ]
    },
    {
      id: "mc_jwt_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::JWT",
      level: 7,
      question: "JWT structure:",
      options: [
        "header.payload.signature — base64URL encoded, signed not encrypted",
        "Single string",
        "JSON only",
        "binary"
      ],
      correctIndex: 0,
      explanation: "Three parts. Anyone can read payload (base64).",
      optionFeedback: [
        "✅ נכון. JWT = 3 parts מופרדים בנקודות.",
        "❌ זה composite מובנה.",
        "❌ זה encoded, לא raw JSON.",
        "❌ text-based, לא binary."
      ]
    },
    {
      id: "mc_jwt_security_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::JWT",
      level: 8,
      question: "JWT key vulnerability:",
      options: [
        "Hard to revoke — צריך blocklist server-side, או short expiry + refresh tokens",
        "encrypted",
        "browser only",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "Stateless = trade-off.",
      optionFeedback: [
        "✅ נכון. revocation challenge הוא הbottleneck של JWT.",
        "❌ JWT signed לא encrypted — payload קריא.",
        "❌ עובד גם server-to-server.",
        "❌ standard."
      ]
    },
    {
      id: "mc_access_token_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::access token",
      level: 6,
      question: "Access token best practice:",
      options: [
        "Short-lived (15 min). httpOnly cookie or memory.",
        "Long-lived",
        "localStorage",
        "URL"
      ],
      correctIndex: 0,
      explanation: "Reduces blast radius if stolen.",
      optionFeedback: [
        "✅ נכון. קצר + bezopásan-stored = best practice.",
        "❌ long-lived מסוכן.",
        "❌ XSS-vulnerable.",
        "❌ logs leak."
      ]
    },
    {
      id: "mc_refresh_token_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::refresh token",
      level: 7,
      question: "Refresh token role:",
      options: [
        "Long-lived (days/weeks). Used to get new access token without re-login. httpOnly cookie",
        "Same as access",
        "no expiry",
        "URL param"
      ],
      correctIndex: 0,
      explanation: "Enables seamless UX + access rotation.",
      optionFeedback: [
        "✅ נכון. refresh חי יותר מאקסס + nokol httpOnly.",
        "❌ different lifetimes.",
        "❌ always has expiry.",
        "❌ never URL."
      ]
    },
    {
      id: "mc_oauth_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::OAuth",
      level: 7,
      question: "OAuth2:",
      options: [
        "Authorization framework — 'login with Google' delegated. Returns access token",
        "Encryption",
        "Replacement for HTTPS",
        "Database protocol"
      ],
      correctIndex: 0,
      explanation: "OAuth2 + OIDC for authentication.",
      optionFeedback: [
        "✅ נכון. OAuth2 הוא delegation של authz.",
        "❌ אינו encryption.",
        "❌ HTTPS הוא transport.",
        "❌ DB unrelated."
      ]
    },
    {
      id: "mc_provider_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::provider auth",
      level: 6,
      question: "Provider auth (Google/GitHub):",
      options: [
        "OAuth2 redirect flow — user signs in with provider, returns to your app",
        "Same as session",
        "Local only",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Trust the provider, get user identity.",
      optionFeedback: [
        "✅ נכון. provider auth = OAuth2 flow.",
        "❌ session is one strategy.",
        "❌ זה דרך 3rd party.",
        "❌ widely used."
      ]
    },
    {
      id: "mc_pwhash_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::password hashing",
      level: 6,
      question: "Password storage:",
      options: [
        "Hash + salt with bcrypt/argon2/scrypt — never plain text",
        "Plain text",
        "Base64 encoded",
        "Compression"
      ],
      correctIndex: 0,
      explanation: "Slow hash + per-user salt.",
      optionFeedback: [
        "✅ נכון. bcrypt+salt = standard. plain text = security disaster.",
        "❌ זה הdisaster האולטימטיבי.",
        "❌ encoding לא אבטחה — reversible.",
        "❌ compression לא קשור."
      ]
    },
    {
      id: "mc_bcrypt_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::bcrypt",
      level: 7,
      question: "bcrypt cost factor:",
      options: [
        "10-12 typically — exponential time. Increase as hardware speeds up",
        "Always 1",
        "Random",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "2^cost iterations.",
      optionFeedback: [
        "✅ נכון. cost factor כברירת מחדל 10-12.",
        "❌ 1 חלש מדי.",
        "❌ דטרמיניסטי לפי config.",
        "❌ standard library."
      ]
    },
    {
      id: "mc_csrf_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::CSRF",
      level: 7,
      question: "CSRF attack:",
      options: [
        "Cross-Site Request Forgery — מאלץ user מחובר לשלוח request לאתרך מ-3rd-party site",
        "Reading cookies",
        "DDoS",
        "SQL injection"
      ],
      correctIndex: 0,
      explanation: "Defense: SameSite cookies + CSRF tokens.",
      optionFeedback: [
        "✅ נכון. CSRF = forging request via third-party.",
        "❌ זה XSS reading.",
        "❌ DoS שונה.",
        "❌ injection שונה."
      ]
    },
    {
      id: "mc_csrf_defense_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::CSRF",
      level: 8,
      question: "CSRF defenses:",
      options: [
        "SameSite=Lax cookies (modern default) + CSRF token in form/header",
        "Disable cookies",
        "Cache",
        "Compression"
      ],
      correctIndex: 0,
      explanation: "Multiple layers.",
      optionFeedback: [
        "✅ נכון. SameSite + token = layered defense.",
        "❌ פוגע ב-UX.",
        "❌ cache לא מגן.",
        "❌ compression לא קשור."
      ]
    },
    {
      id: "mc_xss_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::XSS boundary",
      level: 7,
      question: "XSS attack:",
      options: [
        "Cross-Site Scripting — inject <script> via user input. Steals cookies, sessions",
        "DDoS",
        "Phishing",
        "SQL injection"
      ],
      correctIndex: 0,
      explanation: "Defense: textContent, DOMPurify, CSP.",
      optionFeedback: [
        "✅ נכון. XSS = inject scripts.",
        "❌ DDoS שונה.",
        "❌ phishing UI-based.",
        "❌ SQLi targets DB."
      ]
    },
    {
      id: "mc_xss_defense_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::XSS boundary",
      level: 8,
      question: "XSS defenses:",
      options: [
        "Sanitize input + encode output (textContent or DOMPurify) + CSP headers",
        "Disable JS",
        "Hash everything",
        "Compress"
      ],
      correctIndex: 0,
      explanation: "Defense in depth.",
      optionFeedback: [
        "✅ נכון. multi-layer defense.",
        "❌ פוגע באתר.",
        "❌ irrelevant.",
        "❌ unrelated."
      ]
    },
    {
      id: "mc_cors_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::CORS",
      level: 6,
      question: "CORS — Cross-Origin Resource Sharing:",
      options: [
        "Browser policy — limits requests to other origins. Server sends Access-Control-* headers to allow.",
        "Encrypts requests",
        "Caches responses",
        "DB security"
      ],
      correctIndex: 0,
      explanation: "Same Origin Policy + CORS exceptions.",
      optionFeedback: [
        "✅ נכון. CORS הוא browser policy לcross-origin requests.",
        "❌ encryption לא קשור.",
        "❌ caching לא קשור.",
        "❌ DB-level שונה."
      ]
    },
    {
      id: "mc_cors_preflight_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::CORS",
      level: 8,
      question: "CORS preflight:",
      options: [
        "OPTIONS request before non-simple methods (DELETE/PUT) — checks if cross-origin allowed",
        "Always sent",
        "Optional",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Browser-initiated. Server must respond.",
      optionFeedback: [
        "✅ נכון. preflight = OPTIONS לnon-simple methods.",
        "❌ רק לnon-simple.",
        "❌ obligatory עבור non-simple.",
        "❌ standard."
      ]
    },
    {
      id: "mc_middleware_guard_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::middleware guard",
      level: 6,
      question: "Auth middleware guard pattern:",
      options: [
        "Express middleware that checks token + req.user = decoded. else 401",
        "Frontend only",
        "Database query",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Cross-cutting concern.",
      optionFeedback: [
        "✅ נכון. middleware guard = backend pattern.",
        "❌ זה backend pattern.",
        "❌ DB layer separate.",
        "❌ standard."
      ]
    },
    {
      id: "mc_supabase_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::Supabase Auth",
      level: 6,
      question: "Supabase Auth:",
      options: [
        "Postgres-based BaaS — email/password, OAuth, magic links + RLS native",
        "AWS service",
        "browser API",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "PostgreSQL + auth + storage + realtime.",
      optionFeedback: [
        "✅ נכון. Supabase = Postgres BaaS עם auth מובנה.",
        "❌ אופציה אחרת. Supabase הוא independent.",
        "❌ זה backend service.",
        "❌ active."
      ]
    },
    {
      id: "mc_firebase_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::Firebase Auth",
      level: 6,
      question: "Firebase Auth:",
      options: [
        "Google's BaaS — email + 20+ social providers + free tier",
        "AWS",
        "deprecated",
        "open source"
      ],
      correctIndex: 0,
      explanation: "Massive provider list.",
      optionFeedback: [
        "✅ נכון. Firebase = Google BaaS.",
        "❌ Google.",
        "❌ active.",
        "❌ proprietary."
      ]
    },
    {
      id: "mc_kinde_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::Kinde/Appwrite",
      level: 6,
      question: "Kinde and Appwrite:",
      options: [
        "Auth-focused BaaS alternatives — focus on dev experience + low overhead",
        "DB only",
        "deprecated",
        "client-only"
      ],
      correctIndex: 0,
      explanation: "Newer alternatives to Auth0/Firebase.",
      optionFeedback: [
        "✅ נכון. עוד אופציות BaaS לauth.",
        "❌ הם BaaS עם auth.",
        "❌ active.",
        "❌ full backend."
      ]
    },
    // ─── Additional auth ───
    {
      id: "mc_pkce_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::OAuth",
      level: 8,
      question: "PKCE (Proof Key for Code Exchange):",
      options: [
        "OAuth2 extension for SPAs — code_verifier + code_challenge prevents code interception",
        "Encryption",
        "Browser API",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Mandatory for SPA OAuth2 flows.",
      optionFeedback: [
        "✅ נכון. PKCE = SPA OAuth security.",
        "❌ encryption הוא TLS.",
        "❌ זה protocol extension.",
        "❌ recommended."
      ]
    },
    {
      id: "mc_mfa_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::authentication",
      level: 7,
      question: "MFA (Multi-Factor Authentication):",
      options: [
        "Multiple factors — something you know (password) + have (phone) + are (biometric)",
        "Multi-step single factor",
        "Single password only",
        "OTP without password"
      ],
      correctIndex: 0,
      explanation: "Defense in depth.",
      optionFeedback: [
        "✅ נכון. MFA = factors שונים.",
        "❌ MFA = factors נפרדים.",
        "❌ standard.",
        "❌ recommended."
      ]
    },
    {
      id: "mc_rbac_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::authorization",
      level: 7,
      question: "RBAC (Role-Based Access Control):",
      options: [
        "Roles → Permissions → Users. Common: admin/user/guest",
        "User has all",
        "ABAC",
        "no control"
      ],
      correctIndex: 0,
      explanation: "Standard authz model.",
      optionFeedback: [
        "✅ נכון. RBAC = roles based.",
        "❌ זה anti-pattern.",
        "❌ ABAC הוא alternative.",
        "❌ זה ה-pattern."
      ]
    },
    {
      id: "mc_session_storage_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::session",
      level: 7,
      question: "Session store:",
      options: [
        "Redis/Memcached/DB. Memory-only loses on restart, doesn't scale",
        "localStorage",
        "URL",
        "cookies"
      ],
      correctIndex: 0,
      explanation: "Sticky session vs distributed store.",
      optionFeedback: [
        "✅ נכון. Redis הוא standard לsessions.",
        "❌ client-side, לא server.",
        "❌ never URL.",
        "❌ cookies הם client-side ID."
      ]
    },
    // ─── More auth ───
    {
      id: "mc_csp_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::XSS boundary",
      level: 8,
      question: "CSP (Content Security Policy):",
      options: [
        "HTTP header restricting where JS can load from — defense against XSS",
        "encryption",
        "compression",
        "auth"
      ],
      correctIndex: 0,
      explanation: "Browser-enforced.",
      optionFeedback: [
        "✅ נכון. CSP = strict source list ל-JS.",
        "❌ TLS שונה.",
        "❌ compression לא קשור.",
        "❌ זה defense layer."
      ]
    },
    {
      id: "mc_helmet_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::middleware guard",
      level: 7,
      question: "Express helmet middleware:",
      options: [
        "Sets multiple security headers — CSP, X-Frame-Options, X-XSS-Protection, etc.",
        "Encrypts",
        "DB",
        "Cache"
      ],
      correctIndex: 0,
      explanation: "Default security baseline.",
      optionFeedback: [
        "✅ נכון. helmet = security headers bundle.",
        "❌ TLS לevel.",
        "❌ unrelated.",
        "❌ unrelated."
      ]
    },
    {
      id: "mc_rate_limit_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::middleware guard",
      level: 7,
      question: "Rate limiting:",
      options: [
        "Limits requests per IP/user — prevents brute force + DoS",
        "Encryption",
        "Logging",
        "Cache"
      ],
      correctIndex: 0,
      explanation: "express-rate-limit middleware.",
      optionFeedback: [
        "✅ נכון. rate limit = DoS+brute defense.",
        "❌ unrelated.",
        "❌ different.",
        "❌ different."
      ]
    },
    {
      id: "mc_secret_storage_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::password hashing",
      level: 7,
      question: "API secrets storage:",
      options: [
        "env vars + secret manager (AWS/Vault). NEVER commit, NEVER ב-frontend",
        "code",
        "frontend",
        "URL"
      ],
      correctIndex: 0,
      explanation: "Critical.",
      optionFeedback: [
        "✅ נכון. secrets = env + manager.",
        "❌ disaster.",
        "❌ disaster.",
        "❌ disaster."
      ]
    },
    {
      id: "mc_https_only_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::secure cookie",
      level: 7,
      question: "HSTS (HTTP Strict Transport Security):",
      options: [
        "Header that forces browser to use HTTPS only for site — even on first visit (preload)",
        "auth",
        "compression",
        "cache"
      ],
      correctIndex: 0,
      explanation: "Browser security policy.",
      optionFeedback: [
        "✅ נכון. HSTS = HTTPS enforcement.",
        "❌ unrelated.",
        "❌ unrelated.",
        "❌ unrelated."
      ]
    },
    {
      id: "mc_session_fix_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::session",
      level: 8,
      question: "Session fixation:",
      options: [
        "Attacker pre-sets session ID for victim, then takes over after login. Defense: rotate ID after login",
        "DDoS",
        "XSS",
        "CSRF"
      ],
      correctIndex: 0,
      explanation: "Specific attack pattern.",
      optionFeedback: [
        "✅ נכון. fixation = pre-set session.",
        "❌ different.",
        "❌ different.",
        "❌ different."
      ]
    },
    {
      id: "mc_token_rotation_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::refresh token",
      level: 8,
      question: "Refresh token rotation:",
      options: [
        "Each refresh issues NEW refresh + access. Old refresh revoked. Detect reuse = compromise.",
        "Static refresh forever",
        "no refresh",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "Best practice for refresh tokens.",
      optionFeedback: [
        "✅ נכון. rotation מזהה compromise.",
        "❌ static = security risk.",
        "❌ refresh נפוצה.",
        "❌ recommended."
      ]
    },
    {
      id: "mc_constant_time_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::password hashing",
      level: 8,
      question: "Constant-time comparison:",
      options: [
        "crypto.timingSafeEqual — לא מסיים מוקדם. מונע timing attacks על hashes",
        "Math.eq",
        "===",
        "Object.is"
      ],
      correctIndex: 0,
      explanation: "Critical for password/token compare.",
      optionFeedback: [
        "✅ נכון. timing-safe חיוני.",
        "❌ אין כזה method.",
        "❌ === early-exits.",
        "❌ Object.is — same problem."
      ]
    },
  ],
  fill: [
    {
      id: "fill_authn_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::authentication",
      level: 6,
      code: "// Verify user identity\nconst user = await ____(email, password);",
      answer: "authenticate",
      explanation: "authentication = verify identity."
    },
    {
      id: "fill_jwt_sign_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::JWT",
      level: 7,
      code: "const token = jwt.____({ userId }, SECRET, { expiresIn: '15m' });",
      answer: "sign",
      explanation: "jwt.sign creates token."
    },
    {
      id: "fill_jwt_verify_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::JWT",
      level: 7,
      code: "const decoded = jwt.____(token, SECRET);",
      answer: "verify",
      explanation: "jwt.verify decodes + validates."
    },
    {
      id: "fill_bcrypt_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::bcrypt",
      level: 7,
      code: "const hash = await bcrypt.____(password, 10);",
      answer: "hash",
      explanation: "bcrypt.hash with cost factor."
    },
    {
      id: "fill_bcrypt_compare_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::bcrypt",
      level: 7,
      code: "const valid = await bcrypt.____(plainText, hash);",
      answer: "compare",
      explanation: "bcrypt.compare verifies password."
    },
    {
      id: "fill_cookie_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::secure cookie",
      level: 7,
      code: "res.cookie('session', id, {\n  httpOnly: true,\n  ____: true,\n  sameSite: 'lax'\n});",
      answer: "secure",
      explanation: "Secure flag = HTTPS only."
    },
    {
      id: "fill_cors_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::CORS",
      level: 6,
      code: "import ____ from 'cors';\napp.use(cors({ origin: 'https://myapp.com' }));",
      answer: "cors",
      explanation: "Express cors middleware."
    },
    {
      id: "fill_csrf_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::CSRF",
      level: 7,
      code: "import ____ from 'csurf';\napp.use(csrf({ cookie: true }));",
      answer: "csurf",
      explanation: "csurf middleware for CSRF protection."
    },
    {
      id: "fill_helmet_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::XSS boundary",
      level: 7,
      code: "import ____ from 'helmet';\napp.use(helmet());",
      answer: "helmet",
      explanation: "helmet sets security headers."
    },
    {
      id: "fill_rate_limit_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::middleware guard",
      level: 7,
      code: "import ____ from 'express-rate-limit';\napp.use('/login', rateLimit({ max: 5 }));",
      answer: "rateLimit",
      explanation: "rate limit middleware."
    },
    {
      id: "fill_supabase_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::Supabase Auth",
      level: 6,
      code: "await supabase.auth.____({ email, password });",
      answer: "signInWithPassword",
      explanation: "Supabase email/password sign-in."
    },
    {
      id: "fill_session_set_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::session",
      level: 6,
      code: "req.session.____= user.id;",
      answer: "userId",
      explanation: "Store userId in session."
    },
    {
      id: "fill_oauth_redirect_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::OAuth",
      level: 7,
      code: "const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${ID}&redirect_uri=${URI}&scope=email&response_type=____`;",
      answer: "code",
      explanation: "OAuth2 authorization code flow."
    },
    {
      id: "fill_token_compare_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::password hashing",
      level: 8,
      code: "const valid = crypto.____(Buffer.from(a), Buffer.from(b));",
      answer: "timingSafeEqual",
      explanation: "Timing-safe comparison for tokens."
    },
    {
      id: "fill_csp_x_001",
      topicId: "topic_auth",
      conceptKey: "lesson_auth_security::XSS boundary",
      level: 8,
      code: "res.setHeader('Content-Security-____', \"default-src 'self'\");",
      answer: "Policy",
      explanation: "CSP header restricts sources."
    },
  ],
};
