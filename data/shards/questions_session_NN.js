// Sprint 2 batch NN - Final cleanup: gaps in fundamentals, patterns we haven't fully covered
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_NN = {
  mc: [
    { id: "mc_final_const_let_nn_001", topicId: "topic_js", conceptKey: "lesson_11::Variables", level: 5,
      question: "מתי const מספיק גם אם 'value משתנה'?",
      options: [
        "Const מונע re-binding (החלפת ה-reference). אובייקטים/arrays עדיין mutable: const arr = []; arr.push(1) ✓",
        "Never",
        "Always blocks",
        "Only primitives"
      ],
      correctIndex: 0,
      explanation: "const ≠ immutable. arr הוא reference שלא משתנה. ל-immutable צריך Object.freeze.",
      optionFeedback: [
        "✅ נכון.",
        "❌ קיים.",
        "❌ shallow.",
        "❌ עובד גם objects."
      ]
    },
    { id: "mc_final_let_block_nn_001", topicId: "topic_js", conceptKey: "lesson_11::Variables", level: 5,
      question: "למה let block-scoped עדיף על var?",
      options: [
        "Block scope: { let x = 5; } — x לא נגיש מבחוץ. var function-scoped, hoisted, מוביל לבאגים",
        "Faster",
        "TypeScript",
        "Better syntax"
      ],
      correctIndex: 0,
      explanation: "for(let i=0;...) — i חדש בכל iteration. עוקף closure capture issues של var.",
      optionFeedback: [
        "✅ נכון.",
        "❌ ביצועים זהים.",
        "❌ JS-level.",
        "❌ זה התוצאה לא הסיבה."
      ]
    },
    { id: "mc_final_immut_arr_nn_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "איך לתעדכן array immutably?",
      options: [
        "Spread + ערך חדש: [...arr, x] לadd. arr.filter(i=>i!==x) לremove. arr.map(i => i.id===id ? newI : i) לupdate",
        "push/splice",
        "delete",
        "Object.assign"
      ],
      correctIndex: 0,
      explanation: "כל שיטה יוצרת array חדש. splice/push mutate. בRedux/React חיוני.",
      optionFeedback: [
        "✅ נכון. immutable patterns.",
        "❌ mutate.",
        "❌ שובר structure.",
        "❌ object שונה."
      ]
    },
    { id: "mc_final_dom_create_nn_001", topicId: "topic_js", conceptKey: "lesson_13::createElement", level: 5,
      question: "איך ליצור DOM element חדש ב-JS?",
      options: [
        "document.createElement('div'); el.textContent = 'x'; parent.appendChild(el);",
        "innerHTML +=",
        "new HTMLElement",
        "createDiv()"
      ],
      correctIndex: 0,
      explanation: "createElement בטוח מ-XSS לעומת innerHTML שמפרש HTML.",
      optionFeedback: [
        "✅ נכון.",
        "❌ XSS risk.",
        "❌ אין constructor כזה.",
        "❌ אין כזה."
      ]
    },
    { id: "mc_final_innerhtml_nn_001", topicId: "topic_js", conceptKey: "lesson_13::innerHTML", level: 6,
      question: "מתי innerHTML מסוכן?",
      options: [
        "User input → innerHTML = XSS. <script> לא רץ אבל onerror על <img> כן. preferred: textContent ל-text",
        "Always",
        "Never",
        "Slow"
      ],
      correctIndex: 0,
      explanation: "<img src=x onerror=alert(1)> מציג alert. textContent: text בלבד. DOMPurify.sanitize ל-rich HTML.",
      optionFeedback: [
        "✅ נכון. XSS vector.",
        "❌ trusted source OK.",
        "❌ קיים סיכון.",
        "❌ זה לא העניין."
      ]
    },
    { id: "mc_final_event_propagation_nn_001", topicId: "topic_js", conceptKey: "lesson_13::DOM", level: 7,
      question: "מה שלבי event propagation ב-DOM?",
      options: [
        "Capturing (root → target) → target → bubbling (target → root). default: listeners ב-bubbling phase",
        "Bubbling only",
        "Random",
        "Top-down only"
      ],
      correctIndex: 0,
      explanation: "addEventListener(event, handler, true) = capture phase. e.stopPropagation() עוצר.",
      optionFeedback: [
        "✅ נכון. 3 phases.",
        "❌ default אבל לא רק.",
        "❌ דטרמיניסטי.",
        "❌ שני כיוונים."
      ]
    },
    { id: "mc_final_event_delegation_nn_001", topicId: "topic_js", conceptKey: "lesson_13::DOM", level: 7,
      question: "מה event delegation?",
      options: [
        "Listener על parent במקום על כל child — bubbling מעביר את האירוע. חוסך memory + עובד עם dynamic children",
        "Capture",
        "Async",
        "DOM"
      ],
      correctIndex: 0,
      explanation: "ul.addEventListener('click', e => { if(e.target.tagName==='LI') {...} }).",
      optionFeedback: [
        "✅ נכון. delegation pattern.",
        "❌ phase שונה.",
        "❌ unrelated.",
        "❌ generic."
      ]
    },
    { id: "mc_final_aria_nn_001", topicId: "topic_html", conceptKey: "lesson_html_css_foundations::accessibility basics", level: 6,
      question: "מתי aria-label נחוץ?",
      options: [
        "כשאלמנט אינטראקטיבי בלי text content (icon button) — מסביר ל-screen readers את התפקיד",
        "Always",
        "Decorative",
        "Form only"
      ],
      correctIndex: 0,
      explanation: "<button aria-label='Close'><svg>...</svg></button>. עדיף על title (mouse-only).",
      optionFeedback: [
        "✅ נכון.",
        "❌ overuse.",
        "❌ aria-hidden לdecorative.",
        "❌ לא רק forms."
      ]
    },
    { id: "mc_final_semantic_nn_001", topicId: "topic_html", conceptKey: "lesson_html_css_foundations::semantic HTML", level: 6,
      question: "למה <button> עדיף על <div onclick>?",
      options: [
        "Native: keyboard accessible (Enter/Space), tab-order, role='button' אוטומטי, focus visible. ל-div צריך לשחזר הכל",
        "Faster",
        "Smaller",
        "Style"
      ],
      correctIndex: 0,
      explanation: "<button> מקבל onClick + onKeyDown אוטומטית. <div role='button' tabindex=0 onKeyDown={...}> = הרבה boilerplate.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה לא ביצועים.",
        "❌ דומה.",
        "❌ ניתן לcustomize שניהם."
      ]
    },
    { id: "mc_final_css_specificity_nn_001", topicId: "topic_css", conceptKey: "lesson_html_css_foundations::cascade and specificity", level: 7,
      question: "מה הסדר של CSS specificity?",
      options: [
        "Inline > ID > Class/attr/pseudo > element/pseudo-element. !important עוקף הכל. Tied → last wins",
        "Random",
        "First wins",
        "Specificity unrelated"
      ],
      correctIndex: 0,
      explanation: "0,0,0,0 → 1,0,0,0 (inline). #id = 0,1,0,0. .class = 0,0,1,0. div = 0,0,0,1.",
      optionFeedback: [
        "✅ נכון. cascade rules.",
        "❌ דטרמיניסטי.",
        "❌ last במקרה של tie.",
        "❌ קריטי."
      ]
    },
    { id: "mc_final_css_box_nn_001", topicId: "topic_css", conceptKey: "lesson_html_css_foundations::box model", level: 6,
      question: "מה box-sizing: border-box פותר?",
      options: [
        "Width כוללת padding + border (לא רק content). מקל חישובים, מונע שבירת layout בעת הוספת padding",
        "Smaller box",
        "Centering",
        "Float"
      ],
      correctIndex: 0,
      explanation: "* { box-sizing: border-box; } כstandard reset. ברירת מחדל: content-box (legacy).",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה לא קטן.",
        "❌ לא קשור.",
        "❌ float שונה."
      ]
    },
    { id: "mc_final_css_flex_nn_001", topicId: "topic_css", conceptKey: "lesson_html_css_foundations::box model", level: 6,
      question: "מה flex: 1 משמעותו?",
      options: [
        "flex-grow: 1, flex-shrink: 1, flex-basis: 0% — האלמנט יתמתח למלא את הspace הזמין",
        "Width 1%",
        "Hide",
        "Float"
      ],
      correctIndex: 0,
      explanation: "אלמנטים עם flex:1 חולקים שווה. flex:2 מקבל פי 2. בסיס לresponsive layout.",
      optionFeedback: [
        "✅ נכון.",
        "❌ unrelated.",
        "❌ שונה.",
        "❌ unrelated."
      ]
    },
    { id: "mc_final_css_grid_nn_001", topicId: "topic_css", conceptKey: "lesson_html_css_foundations::box model", level: 7,
      question: "מתי Grid עדיף על Flex?",
      options: [
        "2D layouts (rows + columns), templates גלובליים, alignment של ילדים שאינם direct. Flex 1D, Grid 2D",
        "Always",
        "Forms only",
        "Flex deprecated"
      ],
      correctIndex: 0,
      explanation: "Grid: page layout. Flex: components/rows. שילוב נפוץ.",
      optionFeedback: [
        "✅ נכון. 2D vs 1D.",
        "❌ תלוי.",
        "❌ לא רק.",
        "❌ Flex חי וקיים."
      ]
    },
    { id: "mc_final_express_mw_nn_001", topicId: "topic_express", conceptKey: "lesson_17::Express", level: 7,
      question: "מה הסדר של Express middleware?",
      options: [
        "כסדר ה-app.use ב-קוד. 'top down'. error handlers עם 4 params בסוף. next() להעביר",
        "Random",
        "Reverse",
        "Alphabetical"
      ],
      correctIndex: 0,
      explanation: "app.use(logger); app.use(auth); app.get('/api', ...) — לפי הסדר. כל middleware קוראת next().",
      optionFeedback: [
        "✅ נכון. registration order.",
        "❌ דטרמיניסטי.",
        "❌ לא הפוך.",
        "❌ unrelated."
      ]
    },
    { id: "mc_final_express_error_nn_001", topicId: "topic_express", conceptKey: "lesson_17::Express", level: 7,
      question: "מה signature של error middleware ב-Express?",
      options: [
        "(err, req, res, next) — 4 args ייחודי. Express מזהה אוטומטית. שמור ל-app.use אחרון",
        "(req, res, next)",
        "(err, res)",
        "(err, next)"
      ],
      correctIndex: 0,
      explanation: "app.use((err, req, res, next) => { res.status(500).json({error: err.message}); }).",
      optionFeedback: [
        "✅ נכון. 4 args.",
        "❌ זה standard mw.",
        "❌ לא נכון.",
        "❌ לא נכון."
      ]
    },
    { id: "mc_final_express_async_nn_001", topicId: "topic_express", conceptKey: "lesson_17::Express", level: 8,
      question: "מה הבעיה ב-async error ב-Express?",
      options: [
        "Throws ב-async handlers לא מגיעים אוטומטית ל-error middleware. צריך next(err) בbody או wrapper utility",
        "Always works",
        "Crash",
        "TypeScript"
      ],
      correctIndex: 0,
      explanation: "async (req,res,next) => { try { ... } catch(err) { next(err); } }. או express-async-errors lib.",
      optionFeedback: [
        "✅ נכון.",
        "❌ לא עובד אוטומטית.",
        "❌ silently fails.",
        "❌ unrelated."
      ]
    },
    { id: "mc_final_mongoose_index_nn_001", topicId: "topic_mongo", conceptKey: "lesson_18::indexes", level: 7,
      question: "מתי לcreate index ב-MongoDB?",
      options: [
        "Field שמופיע ב-find/sort/match. כל index מוסיף write overhead — לא לכל field",
        "Every field",
        "Never",
        "Random"
      ],
      correctIndex: 0,
      explanation: "explain() מראה אם query משתמש ב-index. compound indexes ל-multi-field queries.",
      optionFeedback: [
        "✅ נכון.",
        "❌ overhead הסעי.",
        "❌ קריטי.",
        "❌ דטרמיניסטי."
      ]
    },
    { id: "mc_final_jwt_secret_nn_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::JWT", level: 7,
      question: "איך לאחסן JWT secret?",
      options: [
        "Environment variables (process.env.JWT_SECRET). אסור committing! .env ב-.gitignore. ב-prod: secrets manager",
        "In code",
        ".env committed",
        "Frontend"
      ],
      correctIndex: 0,
      explanation: "AWS Secrets Manager / Vault / Doppler לprod. .env לdev. החלפה תקופתית.",
      optionFeedback: [
        "✅ נכון.",
        "❌ אסון אבטחה.",
        "❌ אסור git push.",
        "❌ secret = backend only."
      ]
    },
    { id: "mc_final_https_nn_001", topicId: "topic_security", conceptKey: "lesson_auth_security::HTTPS", level: 6,
      question: "מה HTTPS מבטיח?",
      options: [
        "TLS encryption: confidentiality (man-in-middle לא קורא), integrity (לא משתנה), authentication (cert verifies server)",
        "Speed",
        "SEO",
        "DNS"
      ],
      correctIndex: 0,
      explanation: "Lighthouse, browsers מסמנים HTTP-only כ-Not Secure. קריטי ל-PWA.",
      optionFeedback: [
        "✅ נכון. CIA triad.",
        "❌ בעקיפין.",
        "❌ זה תוצאה.",
        "❌ unrelated."
      ]
    },
    { id: "mc_final_cors_nn_001", topicId: "topic_security", conceptKey: "lesson_auth_security::CORS", level: 7,
      question: "מתי preflight OPTIONS request נשלח?",
      options: [
        "Method לא-simple (PUT/DELETE), Content-Type לא-simple (application/json), custom headers, או credentials",
        "Always",
        "GET only",
        "Only POST"
      ],
      correctIndex: 0,
      explanation: "Browser שולח OPTIONS לבדוק. server מגיב עם Access-Control-Allow-* headers.",
      optionFeedback: [
        "✅ נכון. trigger conditions.",
        "❌ לא תמיד.",
        "❌ לא נשלח.",
        "❌ לפי headers."
      ]
    },
    { id: "mc_final_xss_nn_001", topicId: "topic_security", conceptKey: "lesson_auth_security::XSS", level: 7,
      question: "מהן ה-3 סוגי XSS?",
      options: [
        "Stored (DB), Reflected (URL → response), DOM-based (client-side innerHTML). הגנה: escape, CSP, sanitize",
        "Only one type",
        "Network only",
        "Cookie only"
      ],
      correctIndex: 0,
      explanation: "OWASP top 10. הצגה בטוחה: textContent, sanitize, JSX (auto-escapes).",
      optionFeedback: [
        "✅ נכון.",
        "❌ שלושה.",
        "❌ client-side.",
        "❌ multiple vectors."
      ]
    },
    { id: "mc_final_csrf_nn_001", topicId: "topic_security", conceptKey: "lesson_auth_security::CSRF", level: 7,
      question: "מה CSRF attack?",
      options: [
        "Browser שולח cookie-based auth אוטומטית — אתר זדוני יכול לבצע actions בשם משתמש מחובר. הגנה: SameSite cookie + tokens",
        "XSS",
        "SQL",
        "DDoS"
      ],
      correctIndex: 0,
      explanation: "<img src='https://bank.com/transfer?...'> — דפדפן שולח cookie. SameSite=Strict pretty פתרון.",
      optionFeedback: [
        "✅ נכון.",
        "❌ XSS שונה.",
        "❌ SQL injection שונה.",
        "❌ DDoS שונה."
      ]
    },
    { id: "mc_final_sql_inject_nn_001", topicId: "topic_security", conceptKey: "lesson_auth_security::SQL injection", level: 6,
      question: "איך למנוע SQL Injection?",
      options: [
        "Parameterized queries (prepared statements): db.query('SELECT * WHERE id=?', [id]). אסור concatenation",
        "Escape strings",
        "Input length",
        "TypeScript"
      ],
      correctIndex: 0,
      explanation: "Sequelize, Prisma, Knex פותרים אוטומטית. ORMs ל-rescue.",
      optionFeedback: [
        "✅ נכון. parameterized.",
        "❌ פותח קל לbypass.",
        "❌ לא מספיק.",
        "❌ בעקיפין."
      ]
    },
    { id: "mc_final_password_hash_nn_001", topicId: "topic_security", conceptKey: "lesson_auth_security::password", level: 7,
      question: "איך לאחסן passwords נכון?",
      options: [
        "bcrypt/argon2/scrypt — slow hashing עם salt. אסור MD5/SHA-1/plain. cost factor configurable",
        "Plain",
        "MD5",
        "Encrypted"
      ],
      correctIndex: 0,
      explanation: "bcrypt.hash(pwd, 12) — 12 rounds = ~250ms. attacker לא יכול לhcompute hashes מהר.",
      optionFeedback: [
        "✅ נכון. slow + salt.",
        "❌ אסון.",
        "❌ מהיר מדי.",
        "❌ encryption לא להאשמה."
      ]
    },
    { id: "mc_final_rest_nn_001", topicId: "topic_rest", conceptKey: "lesson_17::REST API", level: 6,
      question: "מה ה-principles של REST?",
      options: [
        "Client-server, stateless, cacheable, uniform interface, layered system, HATEOAS (אופציונלי)",
        "Stateful",
        "Tied to HTTP",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Roy Fielding 2000. רוב APIs היום RESTish, לא pure REST.",
      optionFeedback: [
        "✅ נכון.",
        "❌ stateless.",
        "❌ לא חובה.",
        "❌ דטרמיניסטי."
      ]
    },
    { id: "mc_final_status_codes_nn_001", topicId: "topic_rest", conceptKey: "lesson_17::REST API", level: 6,
      question: "מה הסטטוסים נפוצים?",
      options: [
        "2xx success (200/201/204), 3xx redirect (301/302/304), 4xx client error (400/401/403/404), 5xx server error (500/503)",
        "All 200",
        "All 500",
        "Random"
      ],
      correctIndex: 0,
      explanation: "200 OK, 201 Created, 204 No Content, 401 Unauth, 403 Forbidden, 404 Not Found, 500 Server Error.",
      optionFeedback: [
        "✅ נכון.",
        "❌ ניחוש.",
        "❌ ניחוש.",
        "❌ דטרמיניסטי."
      ]
    },
    { id: "mc_final_idempotent_nn_001", topicId: "topic_rest", conceptKey: "lesson_17::REST API", level: 7,
      question: "מה idempotent operations?",
      options: [
        "אותה operation שמבוצעת פעמיים מביאה לאותה תוצאה. GET/PUT/DELETE idempotent. POST לא",
        "Random",
        "All idempotent",
        "Read-only"
      ],
      correctIndex: 0,
      explanation: "DELETE /users/1 שובר idempotency אם לא מוצא — אך תוצאה הסופית זהה.",
      optionFeedback: [
        "✅ נכון.",
        "❌ דטרמיניסטי.",
        "❌ POST שונה.",
        "❌ פעולה לא מצב."
      ]
    },
    { id: "mc_final_pagination_nn_001", topicId: "topic_rest", conceptKey: "lesson_17::REST API", level: 7,
      question: "מה ה-strategies ל-pagination ב-API?",
      options: [
        "Offset/limit (?offset=0&limit=10), cursor-based (?after=token), page/page_size. Cursor יציב יותר ל-large data",
        "Single",
        "Random",
        "JSON"
      ],
      correctIndex: 0,
      explanation: "offset איטי ב-DB ל-pages גבוהים. cursor (id האחרון) מאפשר WHERE id > last AND ...",
      optionFeedback: [
        "✅ נכון.",
        "❌ multiple.",
        "❌ דטרמיניסטי.",
        "❌ unrelated."
      ]
    },
    { id: "mc_final_react_keys_nn_001", topicId: "topic_react", conceptKey: "lesson_21::map", level: 6,
      question: "למה key prop חיוני ב-list rendering?",
      options: [
        "React מזהה items בין renders לפי keys — מאפשר reuse של DOM nodes ושמירת state פנימי של components",
        "Type",
        "Performance only",
        "ID"
      ],
      correctIndex: 0,
      explanation: "ללא keys: React משתמש ב-index → bugs ב-reorder. עם key={id}: stable identity.",
      optionFeedback: [
        "✅ נכון.",
        "❌ לא type.",
        "❌ correctness גם.",
        "❌ generic ID — לא מסביר למה."
      ]
    },
    { id: "mc_final_react_jsx_nn_001", topicId: "topic_react", conceptKey: "lesson_21::JSX", level: 5,
      question: "מה JSX באמת?",
      options: [
        "Syntactic sugar ל-React.createElement(...). babel/swc מקמפל. <div/> → React.createElement('div')",
        "HTML in JS",
        "Template",
        "DOM"
      ],
      correctIndex: 0,
      explanation: "ב-React 17+ jsx-runtime הופך לrequired automatic. JSX ≠ HTML strict (className, htmlFor).",
      optionFeedback: [
        "✅ נכון. compile target.",
        "❌ לא ממש HTML.",
        "❌ template engine שונה.",
        "❌ DOM הוא runtime."
      ]
    },
    { id: "mc_final_react_state_lift_nn_001", topicId: "topic_react", conceptKey: "lesson_22::state", level: 7,
      question: "מתי lift state up?",
      options: [
        "כשמספר children צריכים גישה ל-אותו state. State הולך ל-parent משותף, מועבר כprops",
        "Always",
        "Never",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Single Source of Truth. אלטרנטיבות לdeep trees: Context, Zustand, Redux.",
      optionFeedback: [
        "✅ נכון.",
        "❌ לא תמיד.",
        "❌ קיים.",
        "❌ דטרמיניסטי."
      ]
    },
    { id: "mc_final_react_render_nn_001", topicId: "topic_react", conceptKey: "lesson_21::rendering", level: 7,
      question: "מתי React מבצע re-render?",
      options: [
        "setState עם value שונה (Object.is), parent מתרענד, context value השתנה, hook dependency השתנה",
        "Always",
        "Never",
        "Network"
      ],
      correctIndex: 0,
      explanation: "setState עם אותו value (primitive) → bail out. setState({}) — תמיד reference חדש → renders.",
      optionFeedback: [
        "✅ נכון. trigger conditions.",
        "❌ לא תמיד.",
        "❌ קורה.",
        "❌ unrelated."
      ]
    },
    { id: "mc_final_react_props_drill_nn_001", topicId: "topic_react", conceptKey: "lesson_22::Hook", level: 7,
      question: "מה prop drilling?",
      options: [
        "העברת props דרך כמה layers של components שלא משתמשים בהם — antipattern לdeep trees. פתרון: Context/Zustand",
        "TypeScript",
        "Best practice",
        "Performance"
      ],
      correctIndex: 0,
      explanation: "<App><Layout><Header><User user={user}/></Header></Layout></App> — Layout/Header לא משתמשים.",
      optionFeedback: [
        "✅ נכון.",
        "❌ unrelated.",
        "❌ הפוך.",
        "❌ זה לא הסיבה."
      ]
    },
    { id: "mc_final_typescript_strict_nn_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "למה strict: true ב-tsconfig מומלץ?",
      options: [
        "מפעיל את כל הflags של safety: noImplicitAny, strictNullChecks, strictFunctionTypes — תופס בעיות בcompile time",
        "Slower",
        "Verbose",
        "Required by JS"
      ],
      correctIndex: 0,
      explanation: "פרויקט חדש: strict מההתחלה. legacy: enable gradually (strictNullChecks ראשון).",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה תוצאה.",
        "❌ זה תוצאה.",
        "❌ JS לא חייב TS."
      ]
    },
    { id: "mc_final_eslint_react_nn_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 7,
      question: "מה react-hooks/exhaustive-deps כלל?",
      options: [
        "ESLint מאתר deps חסרים ב-useEffect/useMemo/useCallback — מונע stale closures + bugs",
        "Performance",
        "Style",
        "TS"
      ],
      correctIndex: 0,
      explanation: "useEffect(()=>{ console.log(x) }, []) → warn: x is missing. תיקון: [x] או useRef.",
      optionFeedback: [
        "✅ נכון.",
        "❌ correctness.",
        "❌ זה bug-prevention.",
        "❌ unrelated."
      ]
    }
  ],
  fill: [
    { id: "fill_final_const_nn_001", topicId: "topic_js", conceptKey: "lesson_11::Variables", level: 5,
      code: "// Block-scoped, no re-binding\n____ PI = 3.14;",
      answer: "const",
      explanation: "const = no rebinding (still mutable for objects)."
    },
    { id: "fill_final_let_nn_001", topicId: "topic_js", conceptKey: "lesson_11::Variables", level: 5,
      code: "// Block-scoped, mutable\n____ counter = 0;\ncounter++;",
      answer: "let",
      explanation: "let = block-scoped, reassignable."
    },
    { id: "fill_final_arrow_nn_001", topicId: "topic_js", conceptKey: "lesson_11::function", level: 5,
      code: "// Arrow function\nconst double = x ____ x * 2;",
      answer: "=>",
      explanation: "Arrow fat-arrow = lexical this."
    },
    { id: "fill_final_template_nn_001", topicId: "topic_js", conceptKey: "lesson_19::function", level: 5,
      code: "// Template literal\nconst msg = ____Hello ${name}, you are ${age}____;",
      answer: "`",
      explanation: "Backticks = template literal delimiters."
    },
    { id: "fill_final_dom_query_nn_001", topicId: "topic_dom", conceptKey: "lesson_13::getElementById", level: 5,
      code: "// Get element by ID\nconst btn = document.____('submitBtn');",
      answer: "getElementById",
      explanation: "getElementById = O(1) lookup."
    },
    { id: "fill_final_query_sel_nn_001", topicId: "topic_dom", conceptKey: "lesson_13::DOM", level: 5,
      code: "// CSS selector lookup\nconst el = document.____('.btn-primary');",
      answer: "querySelector",
      explanation: "querySelector accepts any CSS selector."
    },
    { id: "fill_final_event_nn_001", topicId: "topic_dom", conceptKey: "lesson_13::DOM", level: 5,
      code: "// Attach event listener\nbtn.add____('click', handler);",
      answer: "EventListener",
      explanation: "addEventListener = standard event attach."
    },
    { id: "fill_final_class_list_nn_001", topicId: "topic_dom", conceptKey: "lesson_13::DOM", level: 5,
      code: "// Toggle CSS class\nel.____.toggle('active');",
      answer: "classList",
      explanation: "classList = modern class manipulation."
    },
    { id: "fill_final_express_app_nn_001", topicId: "topic_express", conceptKey: "lesson_17::Express", level: 5,
      code: "// Define GET route\napp.____('/users', (req, res) => {\n  res.json(users);\n});",
      answer: "get",
      explanation: "app.get registers GET handler."
    },
    { id: "fill_final_jwt_sign_nn_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::JWT", level: 7,
      code: "// Sign JWT\nconst token = jwt.____({ id: user.id }, process.env.JWT_SECRET, {\n  expiresIn: '1h'\n});",
      answer: "sign",
      explanation: "jwt.sign creates token with payload + secret."
    },
    { id: "fill_final_bcrypt_nn_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::password", level: 7,
      code: "// Hash password (slow, salted)\nconst hash = await bcrypt.____(plainPwd, 12);",
      answer: "hash",
      explanation: "bcrypt.hash uses cost factor 12 (~250ms)."
    },
    { id: "fill_final_react_setstate_nn_001", topicId: "topic_react", conceptKey: "lesson_22::setState", level: 6,
      code: "// Functional update\nset____(prev => prev + 1);",
      answer: "Count",
      explanation: "setState updater = (prev) => next."
    },
    { id: "fill_final_useEffect_nn_001", topicId: "topic_react", conceptKey: "lesson_24::useEffect", level: 6,
      code: "// Run side effect once on mount\nuseEffect(() => {\n  fetchData();\n}, ____);",
      answer: "[]",
      explanation: "Empty deps = run once on mount."
    },
    { id: "fill_final_jsx_attr_nn_001", topicId: "topic_react", conceptKey: "lesson_21::className", level: 5,
      code: "// JSX uses className (not class)\n<div ____={'btn primary'}>Click</div>",
      answer: "className",
      explanation: "class is reserved in JS, JSX uses className."
    },
    { id: "fill_final_export_default_nn_001", topicId: "topic_js", conceptKey: "lesson_19::function", level: 5,
      code: "// Single primary export\n____ default function App() {\n  return <div>Hi</div>;\n}",
      answer: "export",
      explanation: "export default = primary export per module."
    }
  ]
};
