// data/svcollege_traces_lesson17_activity.js
// P6.3.1 — real Trace activity coverage for SVCollege lesson 17 gaps.

function makeLesson17Trace(id, conceptKey, title, code, checks, explanation, requiredTerms) {
  return {
    id,
    conceptKey,
    level: 4,
    title,
    code,
    steps: checks.map((check, index) => ({
      line: check.line || index + 1,
      prompt: check.prompt,
      answer: check.answer,
      acceptable: check.acceptable || [check.answer],
      hint: check.hint,
    })),
    explanation,
    requiredConcepts: [conceptKey],
    requiredTerms,
  };
}

var SVCOLLEGE_LESSON17_ACTIVITY_TRACES = [
  makeLesson17Trace(
    "trace_l17_1xx_2xx_3xx_001",
    "lesson_17::1xx-2xx-3xx",
    "Status code families 1xx/2xx/3xx",
    "const status = 302;\nconst family = Math.floor(status / 100);\nconsole.log(family);\nconsole.log(family === 3 ? 'redirect' : 'not redirect');",
    [
      { line: 2, prompt: "לאיזו משפחה שייך 302?", answer: "3", hint: "מחלקים ב-100 ולוקחים floor." },
      { line: 4, prompt: "מה יודפס עבור המשמעות?", answer: "redirect", hint: "3xx מסמן redirect." },
    ],
    "קודי 1xx הם מידע, 2xx הצלחה, ו-3xx הפניה. החלוקה למשפחות עוזרת להבין תגובת HTTP לפני קריאת הגוף.",
    ["status code", "2xx", "3xx"],
  ),
  makeLesson17Trace(
    "trace_l17_4xx_5xx_001",
    "lesson_17::4xx-5xx",
    "4xx מול 5xx",
    "const status = 404;\nconst family = Math.floor(status / 100);\nconsole.log(family);\nconsole.log(family === 4 ? 'client error' : 'server error');",
    [
      { line: 2, prompt: "לאיזו משפחה שייך 404?", answer: "4", hint: "404 / 100 מתחיל ב-4." },
      { line: 4, prompt: "איזה סוג שגיאה זו?", answer: "client error", hint: "4xx מצביע על בעיה בצד הבקשה/הלקוח." },
    ],
    "4xx מסמן שהבקשה בעייתית מצד הלקוח, ו-5xx מסמן שהשרת נכשל למרות שקיבל בקשה.",
    ["4xx", "5xx", "client error"],
  ),
  makeLesson17Trace(
    "trace_l17_app_001",
    "lesson_17::app",
    "app הוא מופע Express",
    "const app = { routes: [] };\napp.routes.push({ method: 'GET', path: '/' });\nconsole.log(app.routes.length);\nconsole.log(app.routes[0].path);",
    [
      { line: 2, prompt: "מה נוסף ל-app?", answer: "route", acceptable: ["route", "routes"], hint: "routes.push מוסיף route." },
      { line: 4, prompt: "מה הנתיב הראשון?", answer: "/", hint: "path של ה-route הראשון." },
    ],
    "ב-Express, app הוא האובייקט שעליו מגדירים routes, middleware והאזנה לפורט.",
    ["Express app", "route"],
  ),
  makeLesson17Trace(
    "trace_l17_app_get_001",
    "lesson_17::app.get",
    "app.get מטפל בבקשות GET",
    "const route = { method: 'GET', path: '/users' };\nconsole.log(route.method);\nconsole.log(route.path);\nconsole.log(route.method === 'GET');",
    [
      { line: 2, prompt: "איזה method הוגדר?", answer: "GET", hint: "app.get מייצר route מסוג GET." },
      { line: 3, prompt: "מה הנתיב?", answer: "/users", hint: "path של ה-route." },
    ],
    "app.get(path, handler) מגדיר handler לבקשת GET. משתמשים בו לשליפת משאבים בלי לשנות מצב שרת.",
    ["app.get", "GET", "handler"],
  ),
  makeLesson17Trace(
    "trace_l17_app_listen_001",
    "lesson_17::app.listen",
    "app.listen פותח שרת בפורט",
    "const port = 3000;\nconst message = `server listening on ${port}`;\nconsole.log(port);\nconsole.log(message.includes('3000'));",
    [
      { line: 1, prompt: "באיזה port מאזינים?", answer: "3000", hint: "המשתנה port." },
      { line: 4, prompt: "האם ההודעה מכילה את הפורט?", answer: "true", hint: "includes מחפש 3000 במחרוזת." },
    ],
    "app.listen מפעיל את שרת Express ומחבר אותו לפורט TCP כדי לקבל בקשות HTTP.",
    ["app.listen", "port", "server"],
  ),
  makeLesson17Trace(
    "trace_l17_app_post_001",
    "lesson_17::app.post",
    "app.post מקבל יצירת מידע",
    "const route = { method: 'POST', path: '/users', body: { name: 'Tal' } };\nconsole.log(route.method);\nconsole.log(route.body.name);",
    [
      { line: 1, prompt: "איזה HTTP method משמש כאן?", answer: "POST", hint: "method מוגדר כ-POST." },
      { line: 3, prompt: "איזה שם נשלח בגוף?", answer: "Tal", hint: "route.body.name." },
    ],
    "app.post מגדיר handler לבקשות POST, בדרך כלל ליצירת משאב חדש לפי נתונים שמגיעים ב-request body.",
    ["app.post", "POST", "body"],
  ),
  makeLesson17Trace(
    "trace_l17_app_use_001",
    "lesson_17::app.use",
    "app.use מוסיף middleware",
    "const pipeline = [];\npipeline.push('logger middleware');\npipeline.push('route handler');\nconsole.log(pipeline[0]);\nconsole.log(pipeline.length);",
    [
      { line: 2, prompt: "מה נכנס ראשון ל-pipeline?", answer: "logger middleware", hint: "middleware נרשם לפני route handler." },
      { line: 5, prompt: "כמה שלבים יש?", answer: "2", hint: "שני push." },
    ],
    "app.use מחבר middleware לשרשרת הטיפול בבקשה. הסדר חשוב כי Express מריץ middleware לפי סדר הרישום.",
    ["app.use", "middleware", "pipeline"],
  ),
  makeLesson17Trace(
    "trace_l17_body_001",
    "lesson_17::body",
    "body מחזיק נתוני בקשה",
    "const req = { body: { title: 'Learn REST' } };\nconsole.log(req.body.title);\nconsole.log(Object.keys(req.body).length);",
    [
      { line: 2, prompt: "מה הערך של title?", answer: "Learn REST", hint: "req.body.title." },
      { line: 3, prompt: "כמה שדות יש ב-body?", answer: "1", hint: "רק title." },
    ],
    "body הוא החלק בבקשת HTTP שמכיל נתונים, למשל JSON שנשלח ב-POST או PUT.",
    ["request body", "JSON", "POST"],
  ),
  makeLesson17Trace(
    "trace_l17_body_parser_001",
    "lesson_17::body-parser",
    "body-parser מפענח JSON ל-req.body",
    "const rawBody = '{\"name\":\"Tal\"}';\nconst req = { body: JSON.parse(rawBody) };\nconsole.log(req.body.name);\nconsole.log(typeof req.body);",
    [
      { line: 2, prompt: "מה נוצר אחרי parse?", answer: "object", acceptable: ["object", "אובייקט"], hint: "JSON.parse מחזיר אובייקט." },
      { line: 3, prompt: "מה name?", answer: "Tal", hint: "הערך מתוך JSON." },
    ],
    "body-parser או express.json מפענחים גוף JSON גולמי ומכניסים אותו ל-req.body כדי שה-handler יקרא אותו כאובייקט.",
    ["body-parser", "express.json", "req.body"],
  ),
  makeLesson17Trace(
    "trace_l17_client_001",
    "lesson_17::Client",
    "Client יוזם בקשה",
    "const request = { from: 'browser', to: 'server', method: 'GET' };\nconsole.log(request.from);\nconsole.log(request.method);",
    [
      { line: 1, prompt: "מי יוזם את הבקשה?", answer: "browser", acceptable: ["browser", "client"], hint: "from מציין את הצד השולח." },
      { line: 3, prompt: "איזה method נשלח?", answer: "GET", hint: "request.method." },
    ],
    "Client הוא הצד שיוזם בקשת HTTP: דפדפן, אפליקציה, Postman או שרת אחר שפונה לשירות.",
    ["Client", "Request", "GET"],
  ),
  makeLesson17Trace(
    "trace_l17_create_001",
    "lesson_17::Create",
    "Create ב-CRUD יוצר משאב",
    "const users = [];\nconst newUser = { id: 1, name: 'Tal' };\nusers.push(newUser);\nconsole.log(users.length);\nconsole.log(users[0].name);",
    [
      { line: 3, prompt: "איזו פעולה יוצרת רשומה במערך?", answer: "push", hint: "push מוסיף משתמש חדש." },
      { line: 4, prompt: "כמה משתמשים יש אחרי Create?", answer: "1", hint: "המערך התחיל ריק." },
    ],
    "Create הוא שלב CRUD שיוצר משאב חדש, לרוב דרך POST /resource.",
    ["Create", "CRUD", "POST"],
  ),
  makeLesson17Trace(
    "trace_l17_crud_001",
    "lesson_17::CRUD",
    "CRUD ממפה פעולות למשאבים",
    "const crud = ['Create', 'Read', 'Update', 'Delete'];\nconsole.log(crud[0]);\nconsole.log(crud.at(-1));",
    [
      { line: 2, prompt: "מה הפעולה הראשונה?", answer: "Create", hint: "crud[0]." },
      { line: 3, prompt: "מה הפעולה האחרונה?", answer: "Delete", hint: "at(-1)." },
    ],
    "CRUD הוא מודל בסיסי לניהול משאבים: יצירה, קריאה, עדכון ומחיקה. REST API בדרך כלל ממפה אותו ל-HTTP methods.",
    ["CRUD", "Create", "Delete"],
  ),
  makeLesson17Trace(
    "trace_l17_delete_001",
    "lesson_17::Delete",
    "Delete מסיר משאב",
    "const users = [{ id: 1 }, { id: 2 }];\nconst afterDelete = users.filter((user) => user.id !== 1);\nconsole.log(afterDelete.length);\nconsole.log(afterDelete[0].id);",
    [
      { line: 2, prompt: "איזה id נמחק?", answer: "1", hint: "filter משאיר רק id שאינו 1." },
      { line: 4, prompt: "איזה id נשאר?", answer: "2", hint: "המשתמש השני נשאר." },
    ],
    "Delete ב-CRUD מוחק משאב קיים, לרוב דרך DELETE /resource/:id.",
    ["Delete", "CRUD", "DELETE"],
  ),
  makeLesson17Trace(
    "trace_l17_domain_001",
    "lesson_17::Domain",
    "Domain הוא שם השרת",
    "const url = new URL('https://api.example.com/users');\nconsole.log(url.hostname);\nconsole.log(url.pathname);",
    [
      { line: 2, prompt: "מה הדומיין?", answer: "api.example.com", hint: "hostname." },
      { line: 3, prompt: "מה ה-path?", answer: "/users", hint: "pathname." },
    ],
    "Domain הוא השם האנושי של השרת, שמערכת DNS מתרגמת לכתובת IP.",
    ["Domain", "URL", "DNS"],
  ),
  makeLesson17Trace(
    "trace_l17_event_preventdefault_001",
    "lesson_17::event.preventDefault",
    "preventDefault עוצר שליחת form רגילה",
    "const event = { defaultPrevented: false };\nevent.defaultPrevented = true;\nconsole.log(event.defaultPrevented);\nconsole.log('send fetch instead');",
    [
      { line: 2, prompt: "האם ברירת המחדל נעצרה?", answer: "true", hint: "הקוד מסמן defaultPrevented." },
      { line: 4, prompt: "מה עושים במקום reload?", answer: "send fetch instead", hint: "שולחים בקשה ידנית." },
    ],
    "event.preventDefault מונע מהטופס לבצע reload רגיל, כדי שהקוד ישלח fetch ויטפל בתגובה בלי לאבד מצב מסך.",
    ["event.preventDefault", "form", "fetch"],
  ),
  makeLesson17Trace(
    "trace_l17_express_001",
    "lesson_17::Express",
    "Express מגדיר API ב-Node",
    "const expressApp = { framework: 'Express', routes: ['GET /health'] };\nconsole.log(expressApp.framework);\nconsole.log(expressApp.routes[0]);",
    [
      { line: 2, prompt: "איזו framework?", answer: "Express", hint: "framework." },
      { line: 3, prompt: "איזה route קיים?", answer: "GET /health", hint: "routes[0]." },
    ],
    "Express היא ספריית Node.js לבניית שרתי HTTP ו-API באמצעות routes ו-middleware.",
    ["Express", "Node.js", "route"],
  ),
  makeLesson17Trace(
    "trace_l17_form_001",
    "lesson_17::form",
    "form אוסף קלט משתמש",
    "const formData = { email: 'tal@example.com', password: 'secret' };\nconsole.log(Object.keys(formData).length);\nconsole.log(formData.email.includes('@'));",
    [
      { line: 2, prompt: "כמה שדות יש בטופס?", answer: "2", hint: "email ו-password." },
      { line: 3, prompt: "האם email נראה כמו כתובת?", answer: "true", hint: "יש @." },
    ],
    "form הוא ממשק קלט שממנו שולחים נתונים לשרת, בדרך כלל כ-body בבקשת POST.",
    ["form", "body", "POST"],
  ),
  makeLesson17Trace(
    "trace_l17_get_001",
    "lesson_17::GET",
    "GET שולף משאב",
    "const request = { method: 'GET', path: '/products' };\nconsole.log(request.method);\nconsole.log(request.path);",
    [
      { line: 1, prompt: "איזה method?", answer: "GET", hint: "method." },
      { line: 3, prompt: "איזה משאב מבקשים?", answer: "/products", hint: "path." },
    ],
    "GET מיועד לקריאת משאבים. הוא אמור להיות safe ולא לשנות מידע בשרת.",
    ["GET", "Read", "HTTP method"],
  ),
  makeLesson17Trace(
    "trace_l17_headers_001",
    "lesson_17::headers",
    "headers מוסיפים מטא-דאטה לבקשה",
    "const headers = { 'content-type': 'application/json', authorization: 'Bearer token' };\nconsole.log(headers['content-type']);\nconsole.log(Boolean(headers.authorization));",
    [
      { line: 2, prompt: "מה content-type?", answer: "application/json", hint: "השדה content-type." },
      { line: 3, prompt: "האם יש authorization?", answer: "true", hint: "Boolean על string." },
    ],
    "headers הם שדות מטא-דאטה של HTTP: סוג תוכן, הרשאה, cache, שפה ועוד.",
    ["headers", "content-type", "authorization"],
  ),
  makeLesson17Trace(
    "trace_l17_method_001",
    "lesson_17::method",
    "method מתאר כוונת HTTP",
    "const methods = { read: 'GET', create: 'POST', update: 'PUT', remove: 'DELETE' };\nconsole.log(methods.read);\nconsole.log(methods.create);",
    [
      { line: 2, prompt: "איזה method לקריאה?", answer: "GET", hint: "read." },
      { line: 3, prompt: "איזה method ליצירה?", answer: "POST", hint: "create." },
    ],
    "HTTP method אומר לשרת מה הכוונה: GET לקרוא, POST ליצור, PUT/PATCH לעדכן, DELETE למחוק.",
    ["method", "GET", "POST"],
  ),
  makeLesson17Trace(
    "trace_l17_middleware_001",
    "lesson_17::middleware",
    "middleware רץ לפני ה-route",
    "const calls = [];\nfunction middleware(next) { calls.push('middleware'); next(); }\nfunction route() { calls.push('route'); }\nmiddleware(route);\nconsole.log(calls.join('>'));",
    [
      { line: 4, prompt: "מה רץ ראשון?", answer: "middleware", hint: "middleware קורא ל-next אחר כך." },
      { line: 5, prompt: "מה הסדר המלא?", answer: "middleware>route", hint: "join עם >." },
    ],
    "middleware הוא פונקציה שמקבלת בקשה לפני ה-route, יכולה לבדוק/לשנות אותה, ואז לקרוא next כדי להמשיך.",
    ["middleware", "next", "route"],
  ),
  makeLesson17Trace(
    "trace_l17_path_001",
    "lesson_17::Path",
    "Path ב-URL בוחר resource",
    "const url = new URL('https://shop.example/products/7');\nconsole.log(url.pathname);\nconsole.log(url.pathname.split('/')[1]);",
    [
      { line: 2, prompt: "מה ה-path המלא?", answer: "/products/7", hint: "pathname." },
      { line: 3, prompt: "מה שם המשאב?", answer: "products", hint: "החלק אחרי slash ראשון." },
    ],
    "Path הוא החלק ב-URL שמצביע על resource מסוים בתוך הדומיין.",
    ["Path", "URL", "resource"],
  ),
  makeLesson17Trace(
    "trace_l17_port_001",
    "lesson_17::port",
    "port מזהה תהליך מאזין",
    "const origin = 'http://localhost:3000';\nconst url = new URL(origin);\nconsole.log(url.hostname);\nconsole.log(url.port);",
    [
      { line: 3, prompt: "מה ה-host?", answer: "localhost", hint: "hostname." },
      { line: 4, prompt: "מה ה-port?", answer: "3000", hint: "url.port." },
    ],
    "port הוא מספר שמזהה שירות מאזין על מכונה. Express מקומי נפוץ רץ על 3000 או 5173.",
    ["port", "localhost", "server"],
  ),
  makeLesson17Trace(
    "trace_l17_post_001",
    "lesson_17::POST",
    "POST שולח נתונים ליצירה",
    "const request = { method: 'POST', body: { title: 'New task' } };\nconsole.log(request.method);\nconsole.log(request.body.title);",
    [
      { line: 1, prompt: "איזה method?", answer: "POST", hint: "method." },
      { line: 3, prompt: "מה title שנשלח?", answer: "New task", hint: "request.body.title." },
    ],
    "POST שולח body לשרת, בדרך כלל כדי ליצור משאב חדש או לבצע פעולה שמשנה מצב.",
    ["POST", "body", "Create"],
  ),
  makeLesson17Trace(
    "trace_l17_protocol_001",
    "lesson_17::Protocol",
    "Protocol הוא תחילת ה-URL",
    "const url = new URL('https://api.example.com');\nconsole.log(url.protocol);\nconsole.log(url.protocol === 'https:');",
    [
      { line: 2, prompt: "מה הפרוטוקול?", answer: "https:", acceptable: ["https:", "https"], hint: "url.protocol כולל נקודתיים." },
      { line: 3, prompt: "האם זה HTTPS?", answer: "true", hint: "השוואה ל-https:." },
    ],
    "Protocol מגדיר את כללי התקשורת. ב-URL של אתרים נראה בדרך כלל http או https.",
    ["Protocol", "URL", "HTTPS"],
  ),
  makeLesson17Trace(
    "trace_l17_query_parameters_001",
    "lesson_17::Query Parameters",
    "Query Parameters מסננים בקשה",
    "const url = new URL('https://api.example.com/search?q=react&page=2');\nconsole.log(url.searchParams.get('q'));\nconsole.log(url.searchParams.get('page'));",
    [
      { line: 2, prompt: "מה ערך q?", answer: "react", hint: "searchParams.get('q')." },
      { line: 3, prompt: "איזה page נשלח?", answer: "2", hint: "query params הם strings." },
    ],
    "Query Parameters הם זוגות key=value אחרי סימן שאלה ב-URL. הם נפוצים לסינון, חיפוש ו-pagination.",
    ["Query Parameters", "URL", "searchParams"],
  ),
  makeLesson17Trace(
    "trace_l17_read_001",
    "lesson_17::Read",
    "Read ב-CRUD שולף נתונים",
    "const users = [{ id: 1, name: 'Tal' }];\nconst found = users.find((user) => user.id === 1);\nconsole.log(found.name);\nconsole.log(users.length);",
    [
      { line: 2, prompt: "איזו פעולה קוראת נתון?", answer: "find", hint: "find מאתר משתמש קיים." },
      { line: 3, prompt: "מה שם המשתמש שנקרא?", answer: "Tal", hint: "found.name." },
    ],
    "Read הוא שלב CRUD שקורא משאב בלי לשנות אותו, לרוב דרך GET.",
    ["Read", "CRUD", "GET"],
  ),
  makeLesson17Trace(
    "trace_l17_request_001",
    "lesson_17::Request",
    "Request הוא ההודעה מהלקוח",
    "const req = { method: 'GET', path: '/health', headers: { accept: 'application/json' } };\nconsole.log(req.method);\nconsole.log(req.headers.accept);",
    [
      { line: 1, prompt: "איזה method בבקשה?", answer: "GET", hint: "req.method." },
      { line: 3, prompt: "איזה accept header?", answer: "application/json", hint: "headers.accept." },
    ],
    "Request הוא אובייקט הבקשה שמגיע מהלקוח לשרת: method, path, headers, query, params ו-body.",
    ["Request", "headers", "method"],
  ),
  makeLesson17Trace(
    "trace_l17_response_001",
    "lesson_17::Response",
    "Response היא תשובת השרת",
    "const res = { statusCode: 200, body: { ok: true } };\nconsole.log(res.statusCode);\nconsole.log(res.body.ok);",
    [
      { line: 1, prompt: "מה statusCode?", answer: "200", hint: "statusCode." },
      { line: 3, prompt: "האם body.ok אמיתי?", answer: "true", hint: "res.body.ok." },
    ],
    "Response היא התשובה שהשרת מחזיר ללקוח: status code, headers וגוף התגובה.",
    ["Response", "statusCode", "body"],
  ),
  makeLesson17Trace(
    "trace_l17_route_001",
    "lesson_17::Route",
    "Route מחבר method ו-path ל-handler",
    "const route = { method: 'GET', path: '/users/:id', handler: 'showUser' };\nconsole.log(`${route.method} ${route.path}`);\nconsole.log(route.handler);",
    [
      { line: 2, prompt: "מה חתימת ה-route?", answer: "GET /users/:id", hint: "method + path." },
      { line: 3, prompt: "איזה handler?", answer: "showUser", hint: "route.handler." },
    ],
    "Route הוא כלל שמחבר method ו-path לפונקציה שמטפלת בבקשה.",
    ["Route", "handler", "path"],
  ),
  makeLesson17Trace(
    "trace_l17_server_001",
    "lesson_17::Server",
    "Server מאזין ומחזיר Response",
    "const server = { listening: true, port: 3000 };\nconsole.log(server.listening);\nconsole.log(server.port);",
    [
      { line: 2, prompt: "האם השרת מאזין?", answer: "true", hint: "listening." },
      { line: 3, prompt: "באיזה port?", answer: "3000", hint: "server.port." },
    ],
    "Server הוא התהליך שמאזין לבקשות ומחזיר תגובות. ב-Express מפעילים אותו עם app.listen.",
    ["Server", "app.listen", "port"],
  ),
  makeLesson17Trace(
    "trace_l17_static_files_001",
    "lesson_17::static files",
    "static files נשלחים כמו שהם",
    "const requestPath = '/public/style.css';\nconst fileType = requestPath.endsWith('.css') ? 'stylesheet' : 'asset';\nconsole.log(fileType);\nconsole.log(requestPath.startsWith('/public'));",
    [
      { line: 2, prompt: "איזה סוג קובץ?", answer: "stylesheet", hint: "הנתיב מסתיים ב-.css." },
      { line: 4, prompt: "האם הקובץ תחת public?", answer: "true", hint: "startsWith('/public')." },
    ],
    "static files הם קבצים שהשרת מגיש כפי שהם: CSS, תמונות, JS client-side וקבצי assets.",
    ["static files", "public", "asset"],
  ),
  makeLesson17Trace(
    "trace_l17_status_codes_001",
    "lesson_17::Status Codes",
    "Status Codes מסכמים תוצאה",
    "const response = { status: 201 };\nconsole.log(response.status);\nconsole.log(response.status === 201 ? 'created' : 'other');",
    [
      { line: 2, prompt: "מה status code?", answer: "201", hint: "response.status." },
      { line: 3, prompt: "מה המשמעות בקוד?", answer: "created", hint: "201 = Created." },
    ],
    "Status Codes הם מספרים שמסכמים את תוצאת הבקשה: הצלחה, הפניה, שגיאת לקוח או שגיאת שרת.",
    ["Status Codes", "201", "HTTP"],
  ),
  makeLesson17Trace(
    "trace_l17_update_001",
    "lesson_17::Update",
    "Update משנה משאב קיים",
    "const user = { id: 1, name: 'Tal' };\nconst updated = { ...user, name: 'Tal Cohen' };\nconsole.log(updated.id);\nconsole.log(updated.name);",
    [
      { line: 2, prompt: "איזה שדה השתנה?", answer: "name", hint: "id נשאר, name הוחלף." },
      { line: 4, prompt: "מה השם החדש?", answer: "Tal Cohen", hint: "updated.name." },
    ],
    "Update ב-CRUD משנה משאב קיים, לרוב דרך PUT או PATCH.",
    ["Update", "PUT", "PATCH"],
  ),
  makeLesson17Trace(
    "trace_l17_url_001",
    "lesson_17::URL",
    "URL מתפרק לפרוטוקול, דומיין ונתיב",
    "const url = new URL('https://api.example.com/users?active=true');\nconsole.log(url.protocol);\nconsole.log(url.hostname);\nconsole.log(url.pathname);",
    [
      { line: 2, prompt: "מה הפרוטוקול?", answer: "https:", acceptable: ["https:", "https"], hint: "url.protocol." },
      { line: 3, prompt: "מה הדומיין?", answer: "api.example.com", hint: "url.hostname." },
      { line: 4, prompt: "מה ה-path?", answer: "/users", hint: "url.pathname." },
    ],
    "URL הוא כתובת מלאה למשאב ברשת, וכולל protocol, domain, path ולעיתים query parameters.",
    ["URL", "protocol", "domain", "path"],
  ),
];

(function appendLesson17ActivityTraces() {
  if (typeof window === "undefined") return;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  const existing = new Set(window.QUESTIONS_TRACE.map((item) => item && item.id).filter(Boolean));
  SVCOLLEGE_LESSON17_ACTIVITY_TRACES.forEach((item) => {
    if (!existing.has(item.id)) window.QUESTIONS_TRACE.push(item);
  });
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
})();
