// data/lesson10.js — שיעור 10: Auth Providers — Supabase, Auth0, Firebase
// אימות מודרני דרך ספקים. מבחן: 5-7 שאלות צפויות.
var LESSON_10 = {
  id: "lesson_10",
  title: "שיעור 10 — Auth Providers — Supabase / Auth0 / Firebase",
  description:
    "ספקי אימות חיצוניים: Supabase Auth, Auth0, Firebase Auth. Magic Link, OAuth, RLS.",
  concepts: [
    {
      conceptName: "Supabase Auth",
      difficulty: 5,
      levels: {
        grandma: "Supabase = שרת מוכן עם אימות, DB, ועוד. אתה לא צריך לבנות login מאפס.",
        child: "כמו לקבל בית מוכן עם דלת ושומר — אתה רק נכנס ומתחיל לשחק.",
        soldier: "Supabase Auth = ספק auth opensource. תומך ב-magic link, OAuth (Google/GitHub/...), email/password.",
        student: "Supabase = Postgres + Auth + Storage + Edge Functions + Realtime. Auth integrated עם RLS (Row Level Security). createClient() → auth API.",
        junior: "פעם בניתי auth מאפס — bcrypt, JWT, refresh tokens, email verification. שבועיים. עם Supabase: 5 דקות. ה-RLS אחראי על authorization.",
        professor: "Supabase Auth = GoTrue (open source). Stores users in Postgres auth schema. Sessions via JWT. Integration with PostgREST (auto API). RLS policies use auth.uid().",
      },
      illustration: "🔐 Supabase stack:\n  Auth (GoTrue) → JWT\n   ↓\n  Postgres (RLS) → user can see only own data\n   ↓\n  Auto REST/GraphQL API",
      codeExample:
        "// התקנה\nnpm i @supabase/supabase-js\n\n// יצירה\nimport { createClient } from '@supabase/supabase-js';\nconst supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);\n\n// Sign up\nconst { data, error } = await supabase.auth.signUp({\n  email: 'tal@example.com',\n  password: 'strong-password-123',\n});\n\n// Sign in\nconst { data, error } = await supabase.auth.signInWithPassword({\n  email: 'tal@example.com',\n  password: 'strong-password-123',\n});\n\n// Get current user\nconst { data: { user } } = await supabase.auth.getUser();\n\n// Sign out\nawait supabase.auth.signOut();\n\n// Listen to auth changes\nsupabase.auth.onAuthStateChange((event, session) => {\n  console.log(event); // SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED\n});",
      codeExplanation: "createClient עם URL+anonKey. signUp/signIn/signOut. getUser/onAuthStateChange לreactive UI. session מוחזק אוטומטית ב-localStorage.",
    },
    {
      conceptName: "Magic Link",
      difficulty: 4,
      levels: {
        grandma: "אימייל עם קישור — לוחצים ונכנסים. בלי סיסמה.",
        child: "כמו תווית כניסה למוזיאון שמגיעה למייל.",
        soldier: "Magic link = אימות passwordless. שולחים אימייל עם token, הקליק מאמת.",
        student: "Magic link flow: user enters email → server sends link with token → user clicks → token verified → session created. No password storage. Better UX, less attack surface.",
        junior: "אהבתי שאין סיסמאות — אבל באתר שלי משתמשים מבולבלים: 'איך אני נכנס?'. הוספתי גם password fallback. עכשיו טוב משני העולמות.",
        professor: "Passwordless auth via signed tokens (typically JWT or opaque). Eliminates password reuse, phishing of passwords. Drawbacks: email security becomes critical. Consider WebAuthn for higher security.",
      },
      illustration: "✉️ Magic Link:\n  user enters email\n   → server sends email with /verify?token=XXX\n   → click → token verified\n   → session created",
      codeExample:
        "// Supabase Magic Link\nconst { data, error } = await supabase.auth.signInWithOtp({\n  email: 'tal@example.com',\n  options: {\n    emailRedirectTo: 'https://example.com/welcome',\n  },\n});\n// → אימייל נשלח. המשתמש לוחץ → מחובר.\n\n// Auth0 Magic Link\nimport { Auth0Client } from '@auth0/auth0-spa-js';\nconst auth0 = new Auth0Client({ ... });\nawait auth0.loginWithRedirect({\n  authorizationParams: { connection: 'email' },\n});\n\n// Firebase Email Link\nimport { sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';\n\nawait sendSignInLinkToEmail(auth, email, {\n  url: 'https://example.com/finishSignIn',\n  handleCodeInApp: true,\n});\n// אחרי קליק:\nawait signInWithEmailLink(auth, email, window.location.href);",
      codeExplanation: "Supabase: signInWithOtp. Auth0: loginWithRedirect. Firebase: sendSignInLinkToEmail + signInWithEmailLink. כל אחד עם קצת syntax אחר.",
    },
    {
      conceptName: "Google OAuth",
      difficulty: 5,
      levels: {
        grandma: "התחבר עם Google — הזיהוי שלך מ-Google מועבר לאתר. בלי ליצור משתמש חדש.",
        child: "כמו להראות תעודת זהות — האתר מאמין ל-Google.",
        soldier: "OAuth 2.0 דרך ספק (Supabase/Auth0/Firebase) שמטפל ב-flow מול Google.",
        student: "OAuth Authorization Code flow + PKCE. ספק auth מטפל ב-redirect, code exchange, token storage. אנחנו רק קוראים signInWithOAuth({ provider: 'google' }).",
        junior: "פעם implementing OAuth ידני — כתבתי 200 שורות (callback handler, state validation, token exchange). עם Supabase: שורה אחת. provider abstraction = bliss.",
        professor: "OAuth 2.0 + OIDC. Auth providers handle: redirect URIs, client_id/secret, scopes, code exchange, token validation. Modern: PKCE for SPAs (no client secret).",
      },
      illustration:
        "🔗 Google OAuth flow:\n  1. user clicks 'Sign in with Google'\n  2. redirect to accounts.google.com\n  3. user approves\n  4. Google redirects with code\n  5. provider exchanges code → token\n  6. user signed in",
      codeExample:
        "// Supabase\nconst { data, error } = await supabase.auth.signInWithOAuth({\n  provider: 'google',\n  options: {\n    redirectTo: 'https://example.com/auth/callback',\n    scopes: 'profile email',\n  },\n});\n\n// Auth0\nawait auth0.loginWithRedirect({\n  authorizationParams: { connection: 'google-oauth2' },\n});\n\n// Firebase\nimport { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';\nconst provider = new GoogleAuthProvider();\nconst result = await signInWithPopup(auth, provider);\nconst user = result.user;\n\n// Other providers (Supabase): github, gitlab, bitbucket, azure, apple, facebook\nawait supabase.auth.signInWithOAuth({ provider: 'github' });",
      codeExplanation: "Supabase: provider name. Firebase: GoogleAuthProvider class. Auth0: connection name. כולם providers — Github, Apple, Facebook, etc.",
    },
    {
      conceptName: "Row Level Security (RLS)",
      difficulty: 8,
      levels: {
        grandma: "DB יודע מי כל משתמש — וכל אחד רואה רק את הנתונים שלו, גם דרך API ישירה.",
        child: "כמו לוקר אישי — כל אחד רואה רק את הלוקר שלו, גם אם יודע איפה האחרים.",
        soldier: "RLS = policies ב-DB level. גם אם משתמש פותח endpoint, DB מסנן עבורו.",
        student: "PostgreSQL Row Level Security. Policies define who can SELECT/INSERT/UPDATE/DELETE which rows. With Supabase, auth.uid() returns current user JWT id — used in policies.",
        junior: "פעם שכחתי auth check ב-endpoint — IDOR. גנב הציג נתונים של אחרים. עכשיו: RLS = שכבת הגנה שנייה ב-DB, גם אם backend טעות.",
        professor: "RLS in PostgreSQL: ALTER TABLE ENABLE ROW LEVEL SECURITY + CREATE POLICY. Policies are SQL expressions evaluated per row. Bypass: ROLE postgres (superuser). Service-role keys can bypass — care needed.",
      },
      illustration:
        "🔒 RLS:\n  user A queries SELECT * FROM posts\n   → DB applies policy: WHERE user_id = auth.uid()\n   → only user A's posts returned\n   → user A cannot see user B's data, EVEN IF code has bug",
      codeExample:
        "-- Enable RLS\nALTER TABLE posts ENABLE ROW LEVEL SECURITY;\n\n-- Policy: users see only their posts\nCREATE POLICY \"users see own posts\" ON posts\n  FOR SELECT\n  USING (auth.uid() = user_id);\n\n-- Policy: insert allowed if user_id = caller\nCREATE POLICY \"users insert own posts\" ON posts\n  FOR INSERT\n  WITH CHECK (auth.uid() = user_id);\n\n-- Policy: update only own\nCREATE POLICY \"users update own posts\" ON posts\n  FOR UPDATE\n  USING (auth.uid() = user_id);\n\n-- Policy: delete only own\nCREATE POLICY \"users delete own posts\" ON posts\n  FOR DELETE\n  USING (auth.uid() = user_id);\n\n-- public read example\nCREATE POLICY \"public read\" ON profiles\n  FOR SELECT\n  USING (true);",
      codeExplanation: "ENABLE RLS על הטבלה. POLICY עם USING (filter rows) או WITH CHECK (validate inserts). auth.uid() = JWT user id. שכבת הגנה שנייה.",
    },
    {
      conceptName: "Session Management",
      difficulty: 6,
      levels: {
        grandma: "המערכת זוכרת שאתה מחובר עד שתצא — גם אם תסגור ותחזור לעמוד.",
        child: "כמו תווית 'אני נכנסתי' שנשמרת על דש החולצה כל הזמן.",
        soldier: "Session = JWT tokens (access + refresh) ב-localStorage/cookie. Provider מנהל refresh אוטומטי.",
        student: "Supabase: persistent session ב-localStorage. Auto-refresh access token לפני שפג. onAuthStateChange listener ל-events. SSR: pass session via cookies.",
        junior: "פעם משתמש התנתק כל 15 דקות — לא חידשתי refresh tokens. עכשיו Supabase עושה את זה אוטומטית. user happy.",
        professor: "Session lifecycle: sign-in → persist (localStorage/cookie) → auto-refresh near expiry → sign-out (revoke). SSR considerations: cookie-based sessions for server-side rendering.",
      },
      illustration:
        "🔄 Session lifecycle:\n  Sign-in → tokens (access + refresh)\n   → stored in localStorage/cookie\n   → auto-refresh every ~14m (access pgs at 15m)\n   → sign-out → revoked + cleared",
      codeExample:
        "// Supabase — session persists automatically\nconst { data: { session } } = await supabase.auth.getSession();\nif (session) {\n  console.log('User logged in:', session.user);\n}\n\n// React hook (with @supabase/auth-helpers-react)\nimport { useSession } from '@supabase/auth-helpers-react';\n\nfunction App() {\n  const session = useSession();\n  return session ? <Dashboard /> : <Login />;\n}\n\n// Listen to changes\nuseEffect(() => {\n  const { data: subscription } = supabase.auth.onAuthStateChange(\n    (event, session) => {\n      if (event === 'SIGNED_IN') console.log('logged in!');\n      if (event === 'TOKEN_REFRESHED') console.log('token renewed');\n      if (event === 'SIGNED_OUT') console.log('logged out');\n    }\n  );\n  return () => subscription.unsubscribe();\n}, []);",
      codeExplanation: "getSession() — current state. useSession() — reactive hook. onAuthStateChange — events. auto-refresh handled. always cleanup subscription.",
    },
  ],
};
