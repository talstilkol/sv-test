// data/shards/questions_session_V.js
// Sprint 2 batch V — Express/HTTP coverage
// 50 questions: 35 MC + 15 Fill

window.QUESTIONS_SHARD_V = {
  mc: [
    {
      id: "mc_l17_http_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::HTTP",
      level: 5,
      question: "HTTP — מה זה?",
      options: [
        "HyperText Transfer Protocol — protocol of the web",
        "JS framework",
        "browser only",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "Application-layer protocol over TCP/IP.",
      optionFeedback: [
        "✅ נכון. הסבר רשמי של ה-protocol הבסיסי של ה-web.",
        "❌ זה protocol, לא framework.",
        "❌ HTTP עובד גם server-side ו-mobile.",
        "❌ HTTP/2 + HTTP/3 חיים ובועטים."
      ]
    },
    {
      id: "mc_l17_url_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::URL",
      level: 4,
      question: "URL components:",
      options: [
        "protocol://domain:port/path?query#fragment",
        "only domain",
        "JSON",
        "single string"
      ],
      correctIndex: 0,
      explanation: "Standard URL anatomy (RFC 3986).",
      optionFeedback: [
        "✅ נכון. URL פורמט מפורט עם מספר חלקים.",
        "❌ domain הוא רק חלק מ-URL מלא.",
        "❌ URL הוא טקסט מובנה, לא JSON.",
        "❌ זה composite מובנה."
      ]
    },
    {
      id: "mc_l17_protocol_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Protocol",
      level: 4,
      question: "Protocol — מה?",
      options: [
        "Set of rules — איך client/server מתקשרים",
        "library",
        "data format",
        "compiler"
      ],
      correctIndex: 0,
      explanation: "HTTP, FTP, SMTP all are protocols.",
      optionFeedback: [
        "✅ נכון. Protocol מגדיר חוזה תקשורת בין צדדים.",
        "❌ Protocol הוא יותר בסיסי מ-library — הוא standard.",
        "❌ Protocol מגדיר תקשורת, לא format הנתונים בלבד.",
        "❌ Protocol הוא תקן, לא compiler."
      ]
    },
    {
      id: "mc_l17_domain_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Domain",
      level: 4,
      question: "Domain ב-URL:",
      options: [
        "Human-readable address — example.com → resolved to IP via DNS",
        "IP only",
        "path",
        "session"
      ],
      correctIndex: 0,
      explanation: "DNS resolves domain → IP.",
      optionFeedback: [
        "✅ נכון. domain הוא alias אנושי שמתורגם ל-IP דרך DNS.",
        "❌ Domain הוא שם, IP הוא הכתובת המספרית בפועל.",
        "❌ path הוא מה אחרי הdomain, לא הוא עצמו.",
        "❌ session unrelated to URL anatomy."
      ]
    },
    {
      id: "mc_l17_client_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Client",
      level: 4,
      question: "Client ב-HTTP:",
      options: [
        "Sends requests — browser, mobile app, fetch script, curl",
        "Server",
        "DB",
        "log"
      ],
      correctIndex: 0,
      explanation: "Initiates communication.",
      optionFeedback: [
        "✅ נכון. Client הוא הצד שיוזם את הבקשה ב-HTTP.",
        "❌ Server עונה — הצד השני של התקשורת.",
        "❌ DB הוא שכבת אחסון, לא צד תקשורת.",
        "❌ log אינו קשור לארכיטקטורה client-server."
      ]
    },
    {
      id: "mc_l17_server_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Server",
      level: 4,
      question: "Server ב-HTTP:",
      options: [
        "Listens on port, responds to requests",
        "Always idle",
        "client only",
        "browser plugin"
      ],
      correctIndex: 0,
      explanation: "Long-running process.",
      optionFeedback: [
        "✅ נכון. Server מאזין ועונה לבקשות client על port מוגדר.",
        "❌ Server עובד באופן פעיל — מאזין כל הזמן.",
        "❌ Server הוא הצד המקבל, לא הצד הפותח.",
        "❌ Server הוא תהליך, לא browser plugin."
      ]
    },
    {
      id: "mc_l17_request_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Request",
      level: 5,
      question: "HTTP Request parts:",
      options: [
        "method + path + headers + (optional) body",
        "headers only",
        "body only",
        "free string"
      ],
      correctIndex: 0,
      explanation: "Standard request line + headers + body.",
      optionFeedback: [
        "✅ נכון. כל בקשה כוללת method+path+headers ולפעמים body.",
        "❌ headers הוא חלק אחד מהבקשה, לא הכל.",
        "❌ body אופציונלי — לא קיים ב-GET תמיד.",
        "❌ HTTP מובנה לפי spec, לא טקסט חופשי."
      ]
    },
    {
      id: "mc_l17_response_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Response",
      level: 5,
      question: "HTTP Response parts:",
      options: [
        "status line + headers + body",
        "body only",
        "method",
        "request"
      ],
      correctIndex: 0,
      explanation: "Status code + headers + payload.",
      optionFeedback: [
        "✅ נכון. response כולל status, headers, ו-body.",
        "❌ body הוא חלק — אבל גם status חיוני להבנה.",
        "❌ method הוא ב-Request, לא Response.",
        "❌ request הוא הצד השני."
      ]
    },
    {
      id: "mc_l17_headers_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::headers",
      level: 5,
      question: "HTTP headers:",
      options: [
        "Key-value metadata — Content-Type, Authorization, Accept, etc.",
        "Body",
        "URL",
        "Browser only"
      ],
      correctIndex: 0,
      explanation: "Both request and response have headers.",
      optionFeedback: [
        "✅ נכון. headers הם metadata בצורת key-value pairs.",
        "❌ body הוא ה-payload, headers הם meta.",
        "❌ URL ב-request line, headers נפרדים.",
        "❌ headers נשלחים ב-server-to-server גם."
      ]
    },
    {
      id: "mc_l17_rest_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::REST API",
      level: 5,
      question: "REST API:",
      options: [
        "Resource-oriented — nouns in URLs (/users), verbs as HTTP methods",
        "actions in URLs",
        "GraphQL",
        "SOAP"
      ],
      correctIndex: 0,
      explanation: "Roy Fielding's PhD thesis. Constraints-based.",
      optionFeedback: [
        "✅ נכון. REST מבוסס על משאבים בURLs ופעולות במתודות.",
        "❌ זה anti-pattern — REST דורש nouns לא verbs.",
        "❌ GraphQL הוא alternative ל-REST, לא REST עצמו.",
        "❌ SOAP הוא protocol שונה לחלוטין."
      ]
    },
    {
      id: "mc_l17_crud_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::CRUD",
      level: 4,
      question: "CRUD acronym:",
      options: [
        "Create / Read / Update / Delete — DB operations",
        "Cookie / Request / URL / Domain",
        "Computer / Random / User / Data",
        "Class / Resource / Update / Database"
      ],
      correctIndex: 0,
      explanation: "Maps to POST/GET/PUT/DELETE in REST.",
      optionFeedback: [
        "✅ נכון. CRUD הם 4 הפעולות הבסיסיות עם נתונים.",
        "❌ זה לא acronym מוכר — סתם מילים שמתחילות אותן אותיות.",
        "❌ זה לא ה-acronym הסטנדרטי של CRUD.",
        "❌ Class+Resource לא חלק מהקצב הזה."
      ]
    },
    {
      id: "mc_l17_create_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Create",
      level: 5,
      question: "Create ב-REST:",
      options: [
        "POST /resources — server returns 201 Created with Location",
        "GET",
        "DELETE",
        "PATCH"
      ],
      correctIndex: 0,
      explanation: "201 Created + Location: /resources/123.",
      optionFeedback: [
        "✅ נכון. POST הוא יצירה עם 201 Created.",
        "❌ GET הוא Read, לא Create.",
        "❌ DELETE הוא הסרה, לא יצירה.",
        "❌ PATCH הוא עדכון חלקי, לא יצירה."
      ]
    },
    {
      id: "mc_l17_read_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Read",
      level: 4,
      question: "Read ב-REST:",
      options: [
        "GET /resources or /resources/:id",
        "POST",
        "DELETE",
        "PUT"
      ],
      correctIndex: 0,
      explanation: "GET is safe + idempotent.",
      optionFeedback: [
        "✅ נכון. GET לקריאת משאבים — safe ו-idempotent.",
        "❌ POST הוא Create.",
        "❌ DELETE הוא Delete.",
        "❌ PUT הוא Replace/Update."
      ]
    },
    {
      id: "mc_l17_update_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Update",
      level: 5,
      question: "Update ב-REST:",
      options: [
        "PUT (full replace) או PATCH (partial)",
        "GET",
        "DELETE",
        "POST"
      ],
      correctIndex: 0,
      explanation: "Different semantics: PUT replaces, PATCH merges.",
      optionFeedback: [
        "✅ נכון. PUT replaces, PATCH partial — שניהם updates.",
        "❌ GET לא משנה — read-only.",
        "❌ DELETE מסיר.",
        "❌ POST הוא Create (לרוב)."
      ]
    },
    {
      id: "mc_l17_delete_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Delete",
      level: 4,
      question: "Delete ב-REST:",
      options: [
        "DELETE /resource/:id — typically returns 204 No Content",
        "GET",
        "POST",
        "PATCH"
      ],
      correctIndex: 0,
      explanation: "Idempotent — repeating doesn't hurt.",
      optionFeedback: [
        "✅ נכון. DELETE עם 204 No Content הוא הסטנדרט.",
        "❌ GET לא מוחק.",
        "❌ POST הוא Create.",
        "❌ PATCH לעדכון חלקי."
      ]
    },
    {
      id: "mc_l17_method_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::method",
      level: 5,
      question: "HTTP method (verb):",
      options: [
        "Defines the action — GET/POST/PUT/PATCH/DELETE/OPTIONS",
        "URL path",
        "headers",
        "body"
      ],
      correctIndex: 0,
      explanation: "Semantically defines what the request does.",
      optionFeedback: [
        "✅ נכון. method מגדיר את הפעולה הסמנטית.",
        "❌ path הוא מה אחרי domain, לא method.",
        "❌ headers הם metadata, לא verb.",
        "❌ body הוא payload, לא verb."
      ]
    },
    {
      id: "mc_l17_body_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::body",
      level: 5,
      question: "Request body:",
      options: [
        "Payload data — usually JSON in modern APIs. POST/PUT/PATCH use it",
        "URL params",
        "headers",
        "GET only"
      ],
      correctIndex: 0,
      explanation: "Express needs middleware (json/urlencoded) to parse.",
      optionFeedback: [
        "✅ נכון. body הוא payload בפועלות שמשנות נתונים.",
        "❌ params/query נפרדים מ-body.",
        "❌ headers הם metadata.",
        "❌ GET לרוב לא משתמש ב-body — POST/PUT/PATCH כן."
      ]
    },
    {
      id: "mc_l17_express_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Express",
      level: 5,
      question: "Express:",
      options: [
        "Minimal HTTP framework for Node.js — middleware-driven routing",
        "JS replacement",
        "DB",
        "browser API"
      ],
      correctIndex: 0,
      explanation: "Minimal core, plugin ecosystem.",
      optionFeedback: [
        "✅ נכון. Express הוא minimal HTTP framework עבור Node.js.",
        "❌ Express רץ על JS, לא מחליף אותו.",
        "❌ Express הוא web framework, לא DB.",
        "❌ Express רץ ב-Node.js, לא דפדפן."
      ]
    },
    {
      id: "mc_l17_app_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::app",
      level: 5,
      question: "Express app object:",
      options: [
        "const app = express() — main entry, has .get/.post/.listen methods",
        "global var",
        "deprecated",
        "string"
      ],
      correctIndex: 0,
      explanation: "Created via express() factory.",
      optionFeedback: [
        "✅ נכון. app נוצר דרך express() ומחזיק את כל ה-routes ו-middleware.",
        "❌ app הוא local variable שיוצרים מ-express().",
        "❌ Express חי וקיקיק.",
        "❌ app הוא Application object, לא string."
      ]
    },
    {
      id: "mc_l17_port_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::port",
      level: 4,
      question: "Port number:",
      options: [
        "16-bit address — 80 (HTTP), 443 (HTTPS), 3000 (dev common)",
        "URL path",
        "DNS",
        "Domain"
      ],
      correctIndex: 0,
      explanation: "Reserved <1024.",
      optionFeedback: [
        "✅ נכון. port הוא 0-65535, עם reserved נמוכים ל-system.",
        "❌ path הוא חלק אחר ב-URL.",
        "❌ DNS מתרגם domain ל-IP, לא קשור ל-port.",
        "❌ Domain הוא ה-host, port מספר אחריו."
      ]
    },
    {
      id: "mc_l17_appget_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::app.get",
      level: 5,
      question: "app.get('/users', handler):",
      options: [
        "Registers handler for GET /users requests",
        "Sends GET",
        "Reads file",
        "DB query"
      ],
      correctIndex: 0,
      explanation: "Method-specific route registration.",
      optionFeedback: [
        "✅ נכון. app.get רושם handler ל-GET requests על path מסוים.",
        "❌ app.get הוא רישום, לא ביצוע בקשה.",
        "❌ app.get לא קשור ל-fs operations.",
        "❌ app.get הוא routing, לא DB query."
      ]
    },
    {
      id: "mc_l17_apppost_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::app.post",
      level: 5,
      question: "app.post('/users', handler):",
      options: [
        "Registers handler for POST /users — typically creates resource",
        "Sends POST",
        "DB insert",
        "404"
      ],
      correctIndex: 0,
      explanation: "REST convention: POST creates.",
      optionFeedback: [
        "✅ נכון. POST handler רושם ליצירת משאב.",
        "❌ זה רישום של handler, לא שליחת בקשה.",
        "❌ זו רק שכבת routing, ה-DB מנותק.",
        "❌ 404 הוא response, לא registration."
      ]
    },
    {
      id: "mc_l17_applisten_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::app.listen",
      level: 5,
      question: "app.listen(3000):",
      options: [
        "Starts server listening on port 3000",
        "Stops server",
        "Sends request",
        "DB connect"
      ],
      correctIndex: 0,
      explanation: "Binds to port + accepts connections.",
      optionFeedback: [
        "✅ נכון. app.listen מאתחל את ה-server על port נתון.",
        "❌ זה ההפך — listen פותח, לא סוגר.",
        "❌ Express הוא server, לא client.",
        "❌ DB הוא layer נפרד."
      ]
    },
    {
      id: "mc_l17_middleware_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::middleware",
      level: 6,
      question: "Express middleware:",
      options: [
        "function (req, res, next) — runs before route handler. Chained via next()",
        "DB plugin",
        "TypeScript only",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "Pipeline of functions — auth, logging, parsing, etc.",
      optionFeedback: [
        "✅ נכון. middleware הוא function (req, res, next) שרצה ב-pipeline.",
        "❌ middleware הוא Express concept, לא DB plugin.",
        "❌ middleware הוא JS native ב-Express, לא TS only.",
        "❌ middleware הוא הליבה של Express היום."
      ]
    },
    {
      id: "mc_l17_query_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Query Parameters",
      level: 5,
      question: "Query parameters:",
      options: [
        "?key=value&another=val — accessed via req.query.key",
        "URL path segments",
        "headers",
        "body"
      ],
      correctIndex: 0,
      explanation: "After ? in URL.",
      optionFeedback: [
        "✅ נכון. query parameters אחרי ?, נגישים דרך req.query.",
        "❌ path segments הם חלק שונה של ה-URL.",
        "❌ headers הם metadata, לא query.",
        "❌ body הוא payload נפרד."
      ]
    },
    {
      id: "mc_l17_status_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Status Codes",
      level: 5,
      question: "201 Created vs 200 OK:",
      options: [
        "201 = resource created with Location header. 200 = generic success.",
        "אותו דבר",
        "201 deprecated",
        "200 deprecated"
      ],
      correctIndex: 0,
      explanation: "201 specifically for POST that creates.",
      optionFeedback: [
        "✅ נכון. 201 ספציפי ליצירה — 200 generic success.",
        "❌ הבדלים סמנטיים מהותיים.",
        "❌ 201 הוא standard ועדכני.",
        "❌ 200 הוא ה-default success."
      ]
    },
    {
      id: "mc_l17_static_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::static files",
      level: 5,
      question: "Express static files:",
      options: [
        "app.use(express.static('public')) — serves files from public/ folder",
        "Manual fs.readFile",
        "Per-file route",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "Built-in middleware for static assets.",
      optionFeedback: [
        "✅ נכון. express.static הוא middleware לקבצים סטטיים.",
        "❌ אפשר אבל אנטי-pattern — express.static עדיף.",
        "❌ over-engineering — middleware מטפל אוטומטית.",
        "❌ static middleware הוא standard ב-Express."
      ]
    },
    {
      id: "mc_l17_status1xx_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::1xx-2xx-3xx",
      level: 5,
      question: "1xx-2xx-3xx categories:",
      options: [
        "1xx informational, 2xx success, 3xx redirect",
        "all errors",
        "all success",
        "no meaning"
      ],
      correctIndex: 0,
      explanation: "Status code class.",
      optionFeedback: [
        "✅ נכון. הקטגוריות הראשונות בHTTP status codes.",
        "❌ 4xx ו-5xx הם errors. 1xx-3xx לא.",
        "❌ רק 2xx success — 1xx info, 3xx redirect.",
        "❌ status codes מובנים בקטגוריות."
      ]
    },
    {
      id: "mc_l17_status4xx_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::4xx-5xx",
      level: 5,
      question: "4xx vs 5xx:",
      options: [
        "4xx client error (your request bad). 5xx server error (server crashed)",
        "אותו דבר",
        "5xx success",
        "4xx server"
      ],
      correctIndex: 0,
      explanation: "Different responsibility.",
      optionFeedback: [
        "✅ נכון. 4xx = client. 5xx = server.",
        "❌ הם sites שונים של אחריות.",
        "❌ 5xx הוא error.",
        "❌ הפוך."
      ]
    },
    {
      id: "mc_l17_405_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Status Codes",
      level: 7,
      question: "405 Method Not Allowed:",
      options: [
        "Method (GET/POST/etc) not supported on this resource — server should send Allow header",
        "404",
        "401",
        "500"
      ],
      correctIndex: 0,
      explanation: "Specific to method mismatch.",
      optionFeedback: [
        "✅ נכון. 405 ספציפי לmethod שלא נתמך על ה-route.",
        "❌ 404 הוא לא נמצא.",
        "❌ 401 הוא auth.",
        "❌ 500 הוא server error generic."
      ]
    },
    {
      id: "mc_l17_429_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Status Codes",
      level: 7,
      question: "429 Too Many Requests:",
      options: [
        "Rate limit hit — server sends Retry-After header (seconds)",
        "404",
        "Service down",
        "auth fail"
      ],
      correctIndex: 0,
      explanation: "Throttling response.",
      optionFeedback: [
        "✅ נכון. rate limiting response עם Retry-After header.",
        "❌ 404 הוא resource not found.",
        "❌ 503 הוא service unavailable.",
        "❌ 401 הוא auth fail."
      ]
    },
    {
      id: "mc_l17_options_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::method",
      level: 7,
      question: "OPTIONS method:",
      options: [
        "Pre-flight request for CORS — browser checks if cross-origin allowed",
        "regular GET",
        "deprecated",
        "DELETE"
      ],
      correctIndex: 0,
      explanation: "Triggered for non-simple cross-origin requests.",
      optionFeedback: [
        "✅ נכון. OPTIONS pre-flight ב-CORS.",
        "❌ OPTIONS שונה מ-GET.",
        "❌ legitimate.",
        "❌ DELETE שונה."
      ]
    },
    {
      id: "mc_l17_keepalive_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::HTTP",
      level: 7,
      question: "HTTP keep-alive:",
      options: [
        "Reuse TCP connection for multiple requests — חוסך handshake",
        "no connection",
        "deprecated",
        "WebSocket"
      ],
      correctIndex: 0,
      explanation: "Default in HTTP/1.1+.",
      optionFeedback: [
        "✅ נכון. keep-alive חוסך TCP handshakes.",
        "❌ קיים TCP.",
        "❌ default behavior.",
        "❌ WebSocket שונה."
      ]
    },
    {
      id: "mc_l17_https_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::HTTP",
      level: 6,
      question: "HTTPS vs HTTP:",
      options: [
        "HTTPS = HTTP over TLS — encrypted + authenticated. Mandatory in modern web.",
        "אותו דבר",
        "HTTPS slower always",
        "HTTPS deprecated"
      ],
      correctIndex: 0,
      explanation: "TLS handshake adds latency but provides security.",
      optionFeedback: [
        "✅ נכון. HTTPS = HTTP+TLS. חובה בייצור.",
        "❌ הבדלים מהותיים.",
        "❌ TLS 1.3 כמעט ללא overhead.",
        "❌ HTTPS חובה היום."
      ]
    },
  ],
  fill: [
    {
      id: "fill_l17_get_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::app.get",
      level: 5,
      code: "app.____('/users', (req, res) => {\n  res.json(users);\n});",
      answer: "get",
      explanation: "app.get for GET routes."
    },
    {
      id: "fill_l17_post_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::app.post",
      level: 5,
      code: "app.____('/users', (req, res) => {\n  res.status(201).json(newUser);\n});",
      answer: "post",
      explanation: "app.post for POST routes."
    },
    {
      id: "fill_l17_listen_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::app.listen",
      level: 5,
      code: "app.____(3000, () => console.log('Listening'));",
      answer: "listen",
      explanation: "app.listen starts server."
    },
    {
      id: "fill_l17_json_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::middleware",
      level: 5,
      code: "app.use(express.____());\n// Parses JSON bodies",
      answer: "json",
      explanation: "express.json() middleware parses JSON."
    },
    {
      id: "fill_l17_params_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::method",
      level: 5,
      code: "app.get('/users/:id', (req, res) => {\n  const id = req.____.id;\n});",
      answer: "params",
      explanation: "Path params via req.params."
    },
    {
      id: "fill_l17_query_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Query Parameters",
      level: 5,
      code: "// /search?q=foo\nconst q = req.____.q;",
      answer: "query",
      explanation: "Query string via req.query."
    },
    {
      id: "fill_l17_body_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::body",
      level: 5,
      code: "app.post('/users', (req, res) => {\n  const { email } = req.____;\n});",
      answer: "body",
      explanation: "Request body via req.body."
    },
    {
      id: "fill_l17_status_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Status Codes",
      level: 5,
      code: "res.____(404).json({ error: 'Not found' });",
      answer: "status",
      explanation: "res.status sets status code."
    },
    {
      id: "fill_l17_jsonres_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Response",
      level: 5,
      code: "res.____({ user, posts });",
      answer: "json",
      explanation: "res.json sends JSON response."
    },
    {
      id: "fill_l17_send_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Response",
      level: 4,
      code: "res.____('Hello World');",
      answer: "send",
      explanation: "res.send for plain response."
    },
    {
      id: "fill_l17_use_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::middleware",
      level: 5,
      code: "app.____(cors());\napp.use(helmet());",
      answer: "use",
      explanation: "app.use registers middleware."
    },
    {
      id: "fill_l17_next_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::middleware",
      level: 6,
      code: "app.use((req, res, ____) => {\n  console.log(req.url);\n  next();\n});",
      answer: "next",
      explanation: "next() passes to next middleware."
    },
    {
      id: "fill_l17_redirect_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::Response",
      level: 5,
      code: "res.____('/login');",
      answer: "redirect",
      explanation: "res.redirect sends 302 by default."
    },
    {
      id: "fill_l17_static_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::static files",
      level: 5,
      code: "app.use(express.____('public'));",
      answer: "static",
      explanation: "express.static serves files."
    },
    {
      id: "fill_l17_listen_port_v_001",
      topicId: "topic_http",
      conceptKey: "lesson_17::port",
      level: 5,
      code: "const PORT = process.env.____|| 3000;\napp.listen(PORT);",
      answer: "PORT",
      explanation: "Read port from env, fall back to 3000."
    },
  ],
};
