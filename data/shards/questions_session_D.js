window.QUESTIONS_SHARD_D = {
  "mc": [
    {
      "id": "mc_lai_stream_002",
      "topicId": "topic_ai_engineering",
      "conceptKey": "lesson_ai_engineering::streaming response",
      "level": 5,
      "question": "מה הפרוטוקול הנפוץ לstreaming tokens מ-LLM ל-browser?",
      "options": [
        "SSE (Server-Sent Events) — text/event-stream חד-כיווני",
        "WebSocket דו-כיווני",
        "GraphQL subscriptions",
        "long polling"
      ],
      "correctIndex": 0,
      "explanation": "streamText ב-Vercel AI SDK מחזיר ReadableStream. SSE חד-כיווני — מספיק ל-LLM output. toDataStreamResponse().",
      "optionFeedback": [
        "✅ נכון: SSE הוא הפרוטוקול הסטנדרטי לstreaming tokens. text/event-stream.",
        "❌ WebSocket דו-כיווני — מיותר ל-LLM output. SSE מספיק.",
        "❌ GraphQL subscriptions מורכב יותר. SSE הוא הבחירה הפשוטה.",
        "❌ long polling פחות יעיל — SSE שומר connection פתוח."
      ]
    },
    {
      "id": "mc_lai_embed_002",
      "topicId": "topic_ai_engineering",
      "conceptKey": "lesson_ai_engineering::embeddings",
      "level": 5,
      "question": "מה cosine similarity בהקשר של embeddings?",
      "options": [
        "מדד דמיון בין vectors (0-1): 1 = זהה, 0 = ניצב",
        "hash function",
        "distance מוחלטת בלבד",
        "dot product ללא נרמול"
      ],
      "correctIndex": 0,
      "explanation": "cosine sim = dot(a,b) / (||a|| × ||b||). מנרמל לאורך. 1 = זהה, 0 = ניצב, -1 = הפוך. pgvector תומך.",
      "optionFeedback": [
        "✅ נכון: cosine similarity = מדד semantic בין vectors. מנרמל לאורך הvector.",
        "❌ hash לא מודד דמיון semantic — לא reversible.",
        "❌ Euclidean distance פחות מדויק ל-embeddings — cosine עדיף.",
        "❌ dot product לבד תלוי באורך הvector ולא מנרמל."
      ]
    },
    {
      "id": "mc_lai_vstore_002",
      "topicId": "topic_ai_engineering",
      "conceptKey": "lesson_ai_engineering::vector store",
      "level": 5,
      "question": "מה ANN search ב-vector store?",
      "options": [
        "Approximate Nearest Neighbor — מהיר אבל לא exact, tradeoff מקובל",
        "Accurate Neural Network search",
        "All-Node Networked search",
        "Auto-index network"
      ],
      "correctIndex": 0,
      "explanation": "HNSW algorithm נפוץ. recall vs speed tradeoff. Pinecone, Chroma, pgvector משתמשים בANN.",
      "optionFeedback": [
        "✅ נכון: ANN = Approximate Nearest Neighbor. מהיר גם למיליוני vectors.",
        "❌ Accurate Neural Network — לא קיים כמושג זה. ANN = Approximate.",
        "❌ All-Node Networked — לא קשור לvector stores.",
        "❌ Auto-index לא מגדיר את האלגוריתם. ANN הוא ה-algorithm."
      ]
    },
    {
      "id": "mc_lai_chunk_002",
      "topicId": "topic_ai_engineering",
      "conceptKey": "lesson_ai_engineering::chunking",
      "level": 5,
      "question": "מה הבעיה עם chunks גדולים מדי ב-RAG?",
      "options": [
        "precision נמוך — context לא-רלוונטי מוחזר עם הרלוונטי",
        "עלות embedding גבוהה",
        "memory overflow בDB",
        "chunks גדולים תמיד עדיפים"
      ],
      "correctIndex": 0,
      "explanation": "chunks גדולים = recall גבוה, precision נמוך. chunks קטנים = precision גבוה, recall נמוך. overlap פותר חלקית.",
      "optionFeedback": [
        "✅ נכון: chunks גדולים = noise בresults. LLM מקבל context לא-רלוונטי.",
        "❌ עלות אינה הבעיה העיקרית של גדלי chunks.",
        "❌ memory overflow לא הבעיה הסטנדרטית — precision היא.",
        "❌ לא תמיד עדיפים — precision נפגעת."
      ]
    },
    {
      "id": "mc_la_secure_002",
      "topicId": "topic_auth",
      "conceptKey": "lesson_auth_security::secure cookie",
      "level": 5,
      "question": "מה SameSite=Strict ב-cookie עושה?",
      "options": [
        "cookie לא נשלח ב-cross-site requests — CSRF defense מקסימלי",
        "מגביל לHTTPS בלבד",
        "מונע JS access לcookie",
        "משנה את domain של cookie"
      ],
      "correctIndex": 0,
      "explanation": "Strict: לא נשלח גם מ-top-level navigation. Lax: נשלח ב-safe GET. None: תמיד (צריך Secure).",
      "optionFeedback": [
        "✅ נכון: SameSite=Strict = CSRF protection מקסימלי. cookie לא נשלח cross-site.",
        "❌ HTTPS only = Secure flag, לא SameSite.",
        "❌ HttpOnly = מונע JS access. לא SameSite.",
        "❌ SameSite לא משנה domain — מגביל cross-site sending."
      ]
    },
    {
      "id": "mc_la_access_002",
      "topicId": "topic_auth",
      "conceptKey": "lesson_auth_security::access token",
      "level": 5,
      "question": "למה access token קצר-מועד (15-60 דק')?",
      "options": [
        "להגביל נזק אם נגנב — attacker לא יכול להשתמש לאורך זמן",
        "לשיפור performance",
        "להקטנת גודל token",
        "לשיפור UX"
      ],
      "correctIndex": 0,
      "explanation": "refresh token מחדש כשפג. rotation: לאחר שימוש ב-refresh, מחליפים אותו. stateless = לא ניתן לrevoke.",
      "optionFeedback": [
        "✅ נכון: expiry קצר = blast radius קטן אם נגנב. refresh token מחדש.",
        "❌ performance לא הסיבה — token קצר לא מהיר יותר.",
        "❌ גודל token לא קשור למשך expiry.",
        "❌ UX נפגע מexpiry קצר — אבל security מנצח."
      ]
    },
    {
      "id": "mc_la_hash_002",
      "topicId": "topic_auth",
      "conceptKey": "lesson_auth_security::password hashing",
      "level": 5,
      "question": "מה salt ב-password hashing?",
      "options": [
        "ערך random שנוסף לסיסמה לפני hash — מונע rainbow table attacks",
        "encryption key סודי",
        "IV לblock cipher",
        "secret שמשתתף HMAC"
      ],
      "correctIndex": 0,
      "explanation": "bcrypt מייצר salt אוטומטית ושומר בhash output. אין צורך לשמור בנפרד. argon2id מודרני.",
      "optionFeedback": [
        "✅ נכון: salt = random value per-user. מבטיח שאותה סיסמה → hash שונה לכל user.",
        "❌ encryption key = symmetric crypto. לא hash.",
        "❌ IV = Initialization Vector לblock cipher. לא לhashing.",
        "❌ secret key = HMAC. לא bcrypt salt."
      ]
    },
    {
      "id": "mc_la_guard_002",
      "topicId": "topic_auth",
      "conceptKey": "lesson_auth_security::middleware guard",
      "level": 5,
      "question": "מה הסדר הנכון: middleware guard vs route handler?",
      "options": [
        "guard רץ לפני route handler — אם fail, route handler לא רץ",
        "route handler רץ ראשון",
        "שניהם רצים בו-זמנית",
        "guard רץ לאחר route handler"
      ],
      "correctIndex": 0,
      "explanation": "middleware stack: request → guard/middleware → route handler → response. 401 מ-guard = סוף הdeal.",
      "optionFeedback": [
        "✅ נכון: middleware רץ לפני handler. 401 מ-guard מבטל את הroute handler.",
        "❌ route handler ראשון זה הפוך — guard חייב לרוץ לפני.",
        "❌ לא בו-זמנית — middleware pipeline סדרתי.",
        "❌ guard אחרון זה חסר טעם — צריך לאמת לפני הexecution."
      ]
    },
    {
      "id": "mc_ldev_build_002",
      "topicId": "topic_devops",
      "conceptKey": "lesson_devops_deploy::build command",
      "level": 4,
      "question": "מה ה-output של next build?",
      "options": [
        ".next/ folder עם static pages, server chunks, manifests",
        "dist/ folder",
        "build/ folder",
        "out/ folder"
      ],
      "correctIndex": 0,
      "explanation": "next start מגיש מה-.next. output: 'standalone' ב-next.config.js = self-contained Docker image.",
      "optionFeedback": [
        "✅ נכון: next build → .next/ folder. next start מגיש.",
        "❌ dist/ = Vite/Webpack output. לא Next.js.",
        "❌ build/ = Create React App output. לא Next.js.",
        "❌ out/ = next export (static HTML). רק עם output: 'export'."
      ]
    },
    {
      "id": "mc_lnest_ctrl_002",
      "topicId": "topic_nestjs",
      "conceptKey": "lesson_nestjs::controller",
      "level": 4,
      "question": "מה @Param() ב-Nest controller?",
      "options": [
        "מחלץ route params: @Get(':id') + @Param('id') id: string",
        "מחלץ request body",
        "מחלץ query string",
        "מחלץ request headers"
      ],
      "correctIndex": 0,
      "explanation": "@Param('id') מחלץ :id מה-URL. @Body() לrequest body. @Query() לquery params. גם @Headers().",
      "optionFeedback": [
        "✅ נכון: @Param('id') = route param. @Get(':id') מגדיר, @Param מחלץ.",
        "❌ @Body() = request body (POST/PUT). לא route param.",
        "❌ @Query() = ?key=value. לא route param.",
        "❌ @Headers() = request headers. לא route param."
      ]
    },
    {
      "id": "mc_lsql_fk_003",
      "topicId": "topic_sql",
      "conceptKey": "lesson_sql_orm::foreign key",
      "level": 5,
      "question": "מה referential integrity ב-SQL?",
      "options": [
        "FK תמיד מצביע ל-row קיים ב-parent table — DB מאכף אוטומטית",
        "naming convention לFK",
        "index rule לביצועים",
        "backup policy לDB"
      ],
      "correctIndex": 0,
      "explanation": "אם posts.user_id=5 → חייב להיות users.id=5. INSERT/UPDATE/DELETE שיפגעו — נחסמים (RESTRICT) או מדורגים (CASCADE).",
      "optionFeedback": [
        "✅ נכון: referential integrity = FK תמיד תקין. DB מאכף אוטומטית.",
        "❌ naming convention = סגנון קוד. לא referential integrity.",
        "❌ index rule = ביצועים. לא referential integrity.",
        "❌ backup = שחזור. לא referential integrity."
      ]
    }
  ],
  "fill": [
    {
      "id": "fill_lsql_fk_001",
      "topicId": "topic_sql",
      "conceptKey": "lesson_sql_orm::foreign key",
      "level": 5,
      "code": "ALTER TABLE posts ADD CONSTRAINT fk_user\n  FOREIGN KEY (user_id) REFERENCES users(____);\n",
      "answer": "id",
      "hint": "שם העמודה שה-FK מצביע אליה ב-parent table (הprimary key)",
      "explanation": "REFERENCES users(id). user_id ב-posts → id ב-users. מבטיח referential integrity."
    },
    {
      "id": "fill_lnext_server_001",
      "topicId": "topic_nextjs",
      "conceptKey": "lesson_nextjs::server component",
      "level": 5,
      "code": "// app/users/page.tsx — Server Component\nexport default ____ function UsersPage() {\n  const users = await db.users.findMany();\n  return <ul>{users.map(u => <li>{u.name}</li>)}</ul>;\n}",
      "answer": "async",
      "hint": "Server Component יכול להיות async function ולעשות await ישירות",
      "explanation": "Server Component = async by default. fetch/db ישירות. אין useState. SEO-friendly. לא נשלח ל-client."
    },
    {
      "id": "fill_lnext_handler_001",
      "topicId": "topic_nextjs",
      "conceptKey": "lesson_nextjs::route handler",
      "level": 5,
      "code": "// app/api/users/route.ts\nexport async function ____(req: Request) {\n  const body = await req.json();\n  const user = await db.users.create({ data: body });\n  return Response.json(user, { status: 201 });\n}",
      "answer": "POST",
      "hint": "שם הפונקציה ב-route handler = שם ה-HTTP method (יצירת resource)",
      "explanation": "export POST, GET, PUT, DELETE וכו'. Web Standard Request/Response. App Router replacement ל-pages/api."
    },
    {
      "id": "fill_lnest_ctrl_001",
      "topicId": "topic_nestjs",
      "conceptKey": "lesson_nestjs::controller",
      "level": 4,
      "code": "@Controller('users')\nexport class UsersController {\n  @Get(':id')\n  findOne(@____('id') id: string) { ... }\n}",
      "answer": "Param",
      "hint": "הdecorator שמחלץ route parameter מה-URL",
      "explanation": "@Param('id') מחלץ :id מה-URL. @Body() לrequest body. @Query() לquery string params."
    },
    {
      "id": "fill_ldev_build_001",
      "topicId": "topic_devops",
      "conceptKey": "lesson_devops_deploy::build command",
      "level": 4,
      "code": "# Dockerfile\nRUN npm ____ build",
      "answer": "run",
      "hint": "הcommand שמפעיל npm scripts המוגדרים ב-package.json",
      "explanation": "npm run build מריץ את build script מ-package.json. output ב-.next/ (Next) או dist/ (Vite)."
    },
    {
      "id": "fill_lai_stream_001",
      "topicId": "topic_ai_engineering",
      "conceptKey": "lesson_ai_engineering::streaming response",
      "level": 5,
      "code": "// Vercel AI SDK\nimport { ____ } from 'ai';\n\nexport async function POST(req: Request) {\n  const result = await streamText({ model: openai('gpt-4o'), messages });\n  return result.toDataStreamResponse();\n}",
      "answer": "streamText",
      "hint": "פונקציה שמחזירה streaming text response מ-LLM (Vercel AI SDK)",
      "explanation": "streamText = Vercel AI SDK server function. מחזיר ReadableStream. client: useChat() ב-React."
    },
    {
      "id": "fill_lai_embed_001",
      "topicId": "topic_ai_engineering",
      "conceptKey": "lesson_ai_engineering::embeddings",
      "level": 5,
      "code": "const response = await openai.embeddings.create({\n  model: 'text-embedding-3-small',\n  ____: 'The quick brown fox',\n});\nconst vector = response.data[0].embedding;",
      "answer": "input",
      "hint": "ה-parameter שמקבל את הטקסט שצריך להפוך ל-vector",
      "explanation": "input = הטקסט להembed. מחזיר float[] (1536 dims). cosine similarity להשוואת vectors."
    },
    {
      "id": "fill_lai_chunk_001",
      "topicId": "topic_ai_engineering",
      "conceptKey": "lesson_ai_engineering::chunking",
      "level": 5,
      "code": "function chunkText(text: string, size = 500, overlap = 50) {\n  const chunks: string[] = [];\n  for (let i = 0; i < text.length; i += size - ____) {\n    chunks.push(text.slice(i, i + size));\n  }\n  return chunks;\n}",
      "answer": "overlap",
      "hint": "הערך שמופחת מה-stride כדי לשמור context בין chunks",
      "explanation": "overlap = chars/tokens חופפים בין chunks. מונע חיתוך context. טווח נפוץ: 10-20% מגודל chunk."
    },
    {
      "id": "fill_la_secure_001",
      "topicId": "topic_auth",
      "conceptKey": "lesson_auth_security::secure cookie",
      "level": 5,
      "code": "res.cookie('sessionId', token, {\n  ____: true,     // HTTPS only — מונע MITM\n  httpOnly: true, // no JS access — מונע XSS\n  sameSite: 'lax',\n});",
      "answer": "secure",
      "hint": "ה-flag שמגביל את ה-cookie לHTTPS בלבד",
      "explanation": "secure: true = HTTPS only. httpOnly = לא נגיש ל-document.cookie. sameSite = CSRF defense."
    }
  ]
};
if (typeof module !== "undefined") module.exports = window.QUESTIONS_SHARD_D;
