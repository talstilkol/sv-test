// Sprint 2 batch PP - Bug-spot questions: "what's wrong with this code?"
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_PP = {
  mc: [
    { id: "mc_bug_var_let_pp_001", topicId: "topic_js", conceptKey: "lesson_11::Hoisting", level: 6,
      question: "מה הבאג:\nfor(var i=0; i<3; i++) {\n  setTimeout(() => console.log(i), 100);\n}",
      options: [
        "var function-scoped + closure לוכד reference יחיד → 3,3,3 במקום 0,1,2. תיקון: let",
        "setTimeout לא חוקי בלולאה",
        "i undefined",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "let i creates fresh binding per iteration. var shares one binding.",
      optionFeedback: [
        "✅ נכון.",
        "❌ חוקי לחלוטין.",
        "❌ var hoisted.",
        "❌ יש באג."
      ]
    },
    { id: "mc_bug_async_effect_pp_001", topicId: "topic_react", conceptKey: "lesson_24::useEffect", level: 7,
      question: "מה הבאג:\nuseEffect(async () => {\n  const data = await fetch('/api');\n  setData(data);\n}, []);",
      options: [
        "useEffect callback מצפה לcleanup function או undefined. async מחזיר Promise → React מתבלבל. תיקון: IIFE/async wrapper",
        "fetch לא תקין",
        "setData לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "useEffect(() => { (async () => {...})() }, []). או async fn בפנים.",
      optionFeedback: [
        "✅ נכון.",
        "❌ fetch תקין.",
        "❌ setData תקין.",
        "❌ באג קיים."
      ]
    },
    { id: "mc_bug_missing_dep_pp_001", topicId: "topic_react", conceptKey: "lesson_24::dependency array", level: 7,
      question: "מה הבאג:\nfunction Comp({ id }) {\n  useEffect(() => {\n    fetch(`/api/${id}`);\n  }, []);\n}",
      options: [
        "id לא ב-deps array — stale closure. id ישתנה אך effect לא ירוץ מחדש. תיקון: [id]",
        "fetch לא תקין",
        "props לא תקינים",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "ESLint react-hooks/exhaustive-deps תופס. כל value מ-render שmin dep.",
      optionFeedback: [
        "✅ נכון. stale closure.",
        "❌ fetch תקין.",
        "❌ props standard.",
        "❌ באג ב-deps."
      ]
    },
    { id: "mc_bug_set_state_loop_pp_001", topicId: "topic_react", conceptKey: "lesson_24::useEffect", level: 7,
      question: "מה הבאג:\nfunction Comp() {\n  const [n, setN] = useState(0);\n  useEffect(() => {\n    setN(n + 1);\n  });\n}",
      options: [
        "useEffect בלי deps רץ אחרי כל render. setN גורם render. infinite loop. תיקון: deps array",
        "setN לא תקין",
        "n undefined",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "Effect → state update → render → effect → ...",
      optionFeedback: [
        "✅ נכון. infinite loop.",
        "❌ setN תקין.",
        "❌ initialized 0.",
        "❌ infinite loop קיים."
      ]
    },
    { id: "mc_bug_mutate_state_pp_001", topicId: "topic_react", conceptKey: "lesson_22::immutable", level: 6,
      question: "מה הבאג:\nconst [arr, setArr] = useState([1,2,3]);\nfunction add(x) {\n  arr.push(x);\n  setArr(arr);\n}",
      options: [
        "Mutation של state. React שולל re-render כי reference זהה. תיקון: setArr([...arr, x])",
        "push לא תקין",
        "setArr לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "React משווה ב-Object.is. mutated array עדיין ===.",
      optionFeedback: [
        "✅ נכון. mutation.",
        "❌ push תקין.",
        "❌ setArr תקין.",
        "❌ בעיית re-render."
      ]
    },
    { id: "mc_bug_key_index_pp_001", topicId: "topic_react", conceptKey: "lesson_21::map", level: 6,
      question: "מה הבעיה:\n{items.map((item, i) => <Row key={i} {...item} />)}",
      options: [
        "Index כ-key שביר ב-reorder/insert/delete — React מעבד re-mount של ילדים שונים. תיקון: key={item.id}",
        "key חייב להיות string",
        "map לא תקין",
        "אין בעיה"
      ],
      correctIndex: 0,
      explanation: "Stable IDs עדיפים. index OK רק לlist static.",
      optionFeedback: [
        "✅ נכון.",
        "❌ index = number תקין.",
        "❌ map תקין.",
        "❌ קיים issue."
      ]
    },
    { id: "mc_bug_array_compare_pp_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "מה הבאג:\nif ([1,2] === [1,2]) console.log('equal');",
      options: [
        "Reference comparison של arrays. שני literals חדשים → false. אף פעם לא ידפיס. תיקון: deep equal (lodash, JSON)",
        "[1,2] לא תקין",
        "=== לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "JS לא תומך structural equality native. Object.is גם reference.",
      optionFeedback: [
        "✅ נכון.",
        "❌ array literal תקין.",
        "❌ === תקין.",
        "❌ false תמיד."
      ]
    },
    { id: "mc_bug_this_lost_pp_001", topicId: "topic_js", conceptKey: "lesson_11::function", level: 7,
      question: "מה הבאג:\nclass C { x = 1; getX() { return this.x; } }\nconst c = new C();\nsetTimeout(c.getX, 100);",
      options: [
        "this lost — c.getX detached. setTimeout קורא בלי context. this=undefined. תיקון: c.getX.bind(c) או arrow",
        "setTimeout לא תקין",
        "class לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "Method extraction מאבד this. ב-class fields עם arrow זה לא קורה.",
      optionFeedback: [
        "✅ נכון.",
        "❌ setTimeout תקין.",
        "❌ class תקין.",
        "❌ this lost."
      ]
    },
    { id: "mc_bug_super_missing_pp_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 7,
      question: "מה הבאג:\nclass B extends A {\n  constructor(x) {\n    this.x = x;\n  }\n}",
      options: [
        "ReferenceError — must call super() before this in derived constructor",
        "x לא תקין",
        "extends לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "Derived constructors must invoke super before referencing this.",
      optionFeedback: [
        "✅ נכון.",
        "❌ x תקין.",
        "❌ extends תקין.",
        "❌ באג קיים."
      ]
    },
    { id: "mc_bug_async_no_await_pp_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 7,
      question: "מה הבאג:\nasync function f() {\n  const data = fetch('/api');\n  return data.json();\n}",
      options: [
        "fetch מחזיר Promise — חסר await. data.json() נקרא על Promise → TypeError. תיקון: await fetch()",
        "fetch לא תקין",
        "json() לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "fetch returns Promise<Response>. צריך await או .then.",
      optionFeedback: [
        "✅ נכון.",
        "❌ fetch תקין.",
        "❌ Response.json() תקין.",
        "❌ TypeError בruntime."
      ]
    },
    { id: "mc_bug_promise_swallow_pp_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 8,
      question: "מה הבאג:\ntry {\n  fetchUser();\n} catch(e) {\n  console.error(e);\n}",
      options: [
        "fetchUser async ללא await — Promise rejection לא נתפס ב-try/catch. תיקון: await + async function",
        "try/catch לא תקין",
        "console.error לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "try/catch on sync only. async errors דרך .catch או await + try/catch.",
      optionFeedback: [
        "✅ נכון. swallowed.",
        "❌ try/catch תקין.",
        "❌ console.error תקין.",
        "❌ silent fail."
      ]
    },
    { id: "mc_bug_no_cleanup_pp_001", topicId: "topic_react", conceptKey: "lesson_24::cleanup", level: 7,
      question: "מה הבאג:\nuseEffect(() => {\n  const t = setInterval(tick, 1000);\n}, []);",
      options: [
        "Memory leak — interval ממשיך גם אחרי unmount. תיקון: return () => clearInterval(t)",
        "setInterval לא תקין",
        "useEffect לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "Cleanup חיוני לresource lifecycle (timers, subs, listeners).",
      optionFeedback: [
        "✅ נכון. leak.",
        "❌ setInterval תקין.",
        "❌ useEffect תקין.",
        "❌ leak קיים."
      ]
    },
    { id: "mc_bug_innerhtml_xss_pp_001", topicId: "topic_security", conceptKey: "lesson_auth_security::XSS boundary", level: 7,
      question: "מה הבאג:\nel.innerHTML = userInput;",
      options: [
        "XSS vulnerability — אם userInput מכיל <img onerror=...>, הקוד ירוץ. תיקון: textContent או DOMPurify.sanitize",
        "innerHTML לא תקין",
        "userInput undefined",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "<script> לא רץ אבל onerror/onload כן. textContent בטוח לטקסט.",
      optionFeedback: [
        "✅ נכון. XSS.",
        "❌ innerHTML תקין.",
        "❌ unrelated.",
        "❌ critical security."
      ]
    },
    { id: "mc_bug_sql_inject_pp_001", topicId: "topic_security", conceptKey: "lesson_auth_security::password hashing", level: 7,
      question: "מה הבאג:\ndb.query(`SELECT * FROM users WHERE id = ${userId}`);",
      options: [
        "SQL Injection — string concatenation מאפשר זריקת SQL. תיקון: parameterized query db.query('... ?', [userId])",
        "Template literal לא תקין",
        "db.query לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "userId='1; DROP TABLE users' = catastrophe. ORM/prepared statements פותרים.",
      optionFeedback: [
        "✅ נכון. SQLi.",
        "❌ syntax תקין.",
        "❌ method תקין.",
        "❌ critical."
      ]
    },
    { id: "mc_bug_password_plain_pp_001", topicId: "topic_security", conceptKey: "lesson_auth_security::password hashing", level: 7,
      question: "מה הבאג:\nawait User.create({ email, password: req.body.password });",
      options: [
        "Password ב-plain text. תיקון: bcrypt.hash(pwd, 12) לפני storage. אם DB דלוף — אסון",
        "User.create לא תקין",
        "email לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "GDPR/legal violation. bcrypt/argon2 standard.",
      optionFeedback: [
        "✅ נכון.",
        "❌ ORM תקין.",
        "❌ unrelated.",
        "❌ critical breach."
      ]
    },
    { id: "mc_bug_jwt_secret_pp_001", topicId: "topic_security", conceptKey: "lesson_auth_security::JWT", level: 7,
      question: "מה הבאג:\nconst token = jwt.sign(payload, 'secret123');",
      options: [
        "Hardcoded secret — אסור! .env + process.env.JWT_SECRET. ועדיף secret חזק random",
        "jwt.sign לא תקין",
        "payload לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "כל מי שיש access ל-source יוכל לזייף tokens.",
      optionFeedback: [
        "✅ נכון.",
        "❌ jwt.sign תקין.",
        "❌ payload generic.",
        "❌ security risk."
      ]
    },
    { id: "mc_bug_cors_star_pp_001", topicId: "topic_security", conceptKey: "lesson_auth_security::CORS", level: 7,
      question: "מה הבאג:\napp.use(cors({ origin: '*', credentials: true }));",
      options: [
        "Spec אוסר על origin: '*' עם credentials: true. דפדפנים יחסמו. תיקון: origin: specific או list",
        "cors לא תקין",
        "app.use לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "Access-Control-Allow-Credentials: true requires specific origin.",
      otionFeedback: undefined,
      optionFeedback: [
        "✅ נכון. spec violation.",
        "❌ cors lib תקין.",
        "❌ middleware תקין.",
        "❌ blocked by browser."
      ]
    },
    { id: "mc_bug_dotenv_commit_pp_001", topicId: "topic_security", conceptKey: "lesson_auth_security::JWT", level: 6,
      question: "מה הבאג: git add .env && git commit -m 'config'",
      options: [
        "Committing .env מסכן secrets ב-git history גם אחרי שמיחקו. תיקון: .gitignore + secrets manager",
        "git add לא תקין",
        ".env לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "git history forever. revoke + rotate כל secrets ש-leaked.",
      optionFeedback: [
        "✅ נכון.",
        "❌ git תקין.",
        "❌ .env standard.",
        "❌ security disaster."
      ]
    },
    { id: "mc_bug_no_validation_pp_001", topicId: "topic_express", conceptKey: "lesson_17::Express", level: 7,
      question: "מה הבאג:\napp.post('/users', async (req, res) => {\n  await User.create(req.body);\n  res.json({ ok: true });\n});",
      options: [
        "אין validation על req.body. attacker יכול להעביר כל שדות. תיקון: zod/joi/yup schema validation",
        "User.create לא תקין",
        "res.json לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "MongoDB injection, mass assignment, type confusion. שכבת validation חיונית.",
      optionFeedback: [
        "✅ נכון.",
        "❌ ORM תקין.",
        "❌ res.json תקין.",
        "❌ security risk."
      ]
    },
    { id: "mc_bug_n_plus_one_pp_001", topicId: "topic_db", conceptKey: "lesson_20::Mongoose", level: 8,
      question: "מה הבאג:\nconst posts = await Post.find();\nfor (const p of posts) {\n  p.author = await User.findById(p.authorId);\n}",
      options: [
        "N+1 queries — query אחד ל-posts + N queries ל-users. תיקון: populate/JOIN/IN query",
        "find לא תקין",
        "for...of לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "100 posts = 101 queries. populate('author') עושה 2 queries.",
      optionFeedback: [
        "✅ נכון. classic N+1.",
        "❌ find תקין.",
        "❌ for...of תקין.",
        "❌ perf killer."
      ]
    },
    { id: "mc_bug_missing_index_pp_001", topicId: "topic_db", conceptKey: "lesson_20::Mongoose", level: 7,
      question: "מה הבאג:\nawait User.find({ email: 'x@y.com' });  // 1M users",
      options: [
        "Full collection scan ללא index על email. תיקון: schema { email: { type:String, index:true } }",
        "find לא תקין",
        "filter לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "explain() מראה COLLSCAN. עם index: IXSCAN.",
      optionFeedback: [
        "✅ נכון. perf issue.",
        "❌ find תקין.",
        "❌ filter תקין.",
        "❌ scales badly."
      ]
    },
    { id: "mc_bug_uncaught_promise_pp_001", topicId: "topic_js", conceptKey: "lesson_15::Promise", level: 8,
      question: "מה הבאג:\nfetch('/api').then(r => r.json());",
      options: [
        "אין .catch — rejected promise (network error) לא נתפס. unhandledRejection. תיקון: .catch או try/catch+await",
        "fetch לא תקין",
        ".then לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "Node 15+ exits process on unhandled. Browser warns.",
      optionFeedback: [
        "✅ נכון. unhandled.",
        "❌ fetch תקין.",
        "❌ .then תקין.",
        "❌ silently fails."
      ]
    },
    { id: "mc_bug_array_push_chain_pp_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "מה הבאג:\nconst arr = [];\narr.push(1).push(2);",
      options: [
        "push מחזיר new length (number), לא array. השני יזרוק TypeError. תיקון: arr.push(1, 2)",
        "push לא תקין",
        "[] לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "push returns length. ל-chain: arr.concat(1).concat(2) (returns array).",
      optionFeedback: [
        "✅ נכון.",
        "❌ push תקין.",
        "❌ literal תקין.",
        "❌ TypeError."
      ]
    },
    { id: "mc_bug_for_in_array_pp_001", topicId: "topic_js", conceptKey: "lesson_11::Array", level: 6,
      question: "מה הבעיה:\nfor (const i in [10,20,30]) { console.log(i); }",
      options: [
        "for...in מחזיר string keys ('0','1','2'), לא ערכים. גם enumerable מ-prototype. עדיף for...of או forEach",
        "console.log לא תקין",
        "array לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "for...in נועד ל-objects. arrays → for...of או .forEach.",
      optionFeedback: [
        "✅ נכון.",
        "❌ console תקין.",
        "❌ literal תקין.",
        "❌ misuse."
      ]
    },
    { id: "mc_bug_typeof_null_pp_001", topicId: "topic_js", conceptKey: "lesson_15::Synchronous", level: 6,
      question: "מה הבאג:\nif (typeof obj === 'object') {\n  obj.method();\n}",
      options: [
        "typeof null === 'object' — אם obj===null, יזרוק TypeError. תיקון: && obj !== null או obj?.method()",
        "typeof לא תקין",
        "method לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "typeof null history bug. הגנה: obj && typeof obj === 'object'.",
      optionFeedback: [
        "✅ נכון. null trap.",
        "❌ typeof תקין.",
        "❌ method generic.",
        "❌ null עוקף check."
      ]
    },
    { id: "mc_bug_falsy_check_pp_001", topicId: "topic_js", conceptKey: "lesson_11::boolean", level: 6,
      question: "מה הבאג:\nif (!user.age) { user.age = 18; }",
      options: [
        "0 falsy — אם user.age=0, יוחלף ב-18. תיקון: user.age == null או user.age ?? 18",
        "user.age לא תקין",
        "if לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "!! coerces; כל falsy. ?? רק null/undefined. ב-form data 0 שכיח.",
      optionFeedback: [
        "✅ נכון.",
        "❌ syntax תקין.",
        "❌ if תקין.",
        "❌ logic flaw."
      ]
    },
    { id: "mc_bug_nondet_test_pp_001", topicId: "topic_js", conceptKey: "lesson_15::setTimeout", level: 7,
      question: "מה הבעיה ב-tests של פונקציה שמחזירה ערך מבוסס clock + RNG?",
      options: [
        "Non-deterministic — קשה לבדוק, snapshots ישתנו, race conditions. תיקון: inject clock + RNG",
        "אסור להשתמש בclock בקוד",
        "אסור להשתמש בRNG בקוד",
        "אין בעיה"
      ],
      correctIndex: 0,
      explanation: "Pure functions testable. שיטה: vi.useFakeTimers + spy על generator.",
      optionFeedback: [
        "✅ נכון.",
        "❌ clock תקין functional.",
        "❌ RNG תקין functional.",
        "❌ test issue."
      ]
    },
    { id: "mc_bug_array_index_assign_pp_001", topicId: "topic_react", conceptKey: "lesson_22::immutable", level: 7,
      question: "מה הבאג:\nconst [items, setItems] = useState([]);\nfunction update(i, val) {\n  items[i] = val;\n  setItems(items);\n}",
      options: [
        "Mutation. React לא יראה change. תיקון: setItems(items.map((x, idx) => idx===i ? val : x))",
        "items[i] לא תקין",
        "setItems לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "Immutable update pattern. או Immer: produce(items, draft => { draft[i] = val }).",
      optionFeedback: [
        "✅ נכון.",
        "❌ syntax תקין.",
        "❌ setItems תקין.",
        "❌ no re-render."
      ]
    },
    { id: "mc_bug_obj_spread_shallow_pp_001", topicId: "topic_react", conceptKey: "lesson_22::immutable", level: 7,
      question: "מה הבאג:\nconst next = { ...prev, nested: { ...prev.nested, key: val } };\n// hierarchically: prev.nested.deep.x עדיין משותף",
      options: [
        "Spread shallow. nested.deep עדיין shared reference עם prev. תיקון: spread כל levels או Immer/structuredClone",
        "spread לא תקין",
        "object לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "Deep updates דורשים deep cloning. Immer מקל זאת משמעותית.",
      optionFeedback: [
        "✅ נכון.",
        "❌ spread תקין.",
        "❌ literal תקין.",
        "❌ subtle issue."
      ]
    },
    { id: "mc_bug_localstorage_obj_pp_001", topicId: "topic_browser", conceptKey: "lesson_13::localStorage", level: 6,
      question: "מה הבאג:\nlocalStorage.setItem('user', user);\nconst u = localStorage.getItem('user');\nconsole.log(u.name);",
      options: [
        "localStorage שומר strings. user object → '[object Object]'. תיקון: JSON.stringify לwrite, JSON.parse לread",
        "localStorage לא תקין",
        "user.name לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "Storage API: string only. אובייקטים מומרים ל-toString().",
      optionFeedback: [
        "✅ נכון.",
        "❌ API תקין.",
        "❌ access generic.",
        "❌ data loss."
      ]
    },
    { id: "mc_bug_event_listener_leak_pp_001", topicId: "topic_react", conceptKey: "lesson_24::useEffect", level: 7,
      question: "מה הבאג:\nuseEffect(() => {\n  window.addEventListener('resize', handle);\n}, []);",
      options: [
        "Memory leak — אין removeEventListener ב-cleanup. תיקון: return () => window.removeEventListener('resize', handle)",
        "addEventListener לא תקין",
        "window לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "כל mount מוסיף listener. ב-strict mode כפול. memory grows.",
      optionFeedback: [
        "✅ נכון.",
        "❌ API תקין.",
        "❌ window תקין.",
        "❌ leak grows."
      ]
    },
    { id: "mc_bug_form_submit_pp_001", topicId: "topic_html", conceptKey: "lesson_html_css_foundations::HTML form", level: 6,
      question: "מה הבאג:\n<form onSubmit={handleSubmit}>\n  <button>Submit</button>\n</form>\n// handleSubmit: function() { setData(...) }",
      options: [
        "ברירת מחדל: form יבצע page reload. תיקון: e.preventDefault() ב-handleSubmit",
        "form לא תקין",
        "button לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "<form> default action='current page' עם method='GET'.",
      optionFeedback: [
        "✅ נכון.",
        "❌ HTML תקין.",
        "❌ button תקין.",
        "❌ unwanted reload."
      ]
    },
    { id: "mc_bug_ref_inline_pp_001", topicId: "topic_react", conceptKey: "lesson_24::useRef", level: 8,
      question: "מה הבעיה:\n<div ref={r => measure(r)}>",
      options: [
        "Inline callback ref — נוצר חדש בכל render → React קורא לcleanup+recreate. עדיף useCallback או useRef",
        "syntax לא תקין",
        "div לא תקין",
        "אין בעיה"
      ],
      correctIndex: 0,
      explanation: "useCallback מסביב ל-callback ref מקבע reference.",
      optionFeedback: [
        "✅ נכון.",
        "❌ syntax תקין.",
        "❌ div תקין.",
        "❌ subtle perf."
      ]
    },
    { id: "mc_bug_strict_mode_pp_001", topicId: "topic_react", conceptKey: "lesson_24::useEffect", level: 8,
      question: "ב-DEV mode strict, useEffect רץ פעמיים. מה הסיבה הסבירה לbug?",
      options: [
        "Effect לא idempotent — subscribe×2 / append×2. תיקון: cleanup function שמבטל. או guard עם ref",
        "React bug",
        "DEV slower",
        "Type issue"
      ],
      correctIndex: 0,
      explanation: "Strict mode מכוון לחשוף effects לא-idempotent. cleanup חובה.",
      optionFeedback: [
        "✅ נכון.",
        "❌ design choice.",
        "❌ זה לא הסיבה.",
        "❌ unrelated."
      ]
    },
    { id: "mc_bug_csrf_no_token_pp_001", topicId: "topic_security", conceptKey: "lesson_auth_security::CSRF", level: 8,
      question: "מה הבאג:\napp.post('/transfer', auth, (req, res) => {\n  // cookies set, no CSRF token check\n});",
      options: [
        "CSRF vulnerability — דפדפן שולח cookies אוטומטית. אתר זדוני יכול לבצע transfer. תיקון: SameSite cookie + CSRF token",
        "auth middleware לא תקין",
        "post לא תקין",
        "אין באג"
      ],
      correctIndex: 0,
      explanation: "csurf middleware. SameSite=Strict פותר רוב המקרים.",
      optionFeedback: [
        "✅ נכון.",
        "❌ auth תקין.",
        "❌ method תקין.",
        "❌ critical."
      ]
    }
  ],
  fill: [
    { id: "fill_bug_let_loop_pp_001", topicId: "topic_js", conceptKey: "lesson_11::Hoisting", level: 6,
      code: "// Fix closure capture in loop\nfor (____ i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n// prints: 0, 1, 2",
      answer: "let",
      explanation: "let creates fresh binding per iteration."
    },
    { id: "fill_bug_event_default_pp_001", topicId: "topic_html", conceptKey: "lesson_html_css_foundations::HTML form", level: 5,
      code: "// Prevent form reload\nfunction handleSubmit(e) {\n  e.____();\n  saveData();\n}",
      answer: "preventDefault",
      explanation: "preventDefault stops default behavior."
    },
    { id: "fill_bug_cleanup_pp_001", topicId: "topic_react", conceptKey: "lesson_24::cleanup", level: 7,
      code: "// Avoid memory leak\nuseEffect(() => {\n  const t = setInterval(tick, 1000);\n  return () => clear____(t);\n}, []);",
      answer: "Interval",
      explanation: "clearInterval cleans up setInterval."
    },
    { id: "fill_bug_immutable_array_pp_001", topicId: "topic_react", conceptKey: "lesson_22::immutable", level: 6,
      code: "// Immutable update — replace at index\nsetItems(items.____((x, idx) => idx === i ? newVal : x));",
      answer: "map",
      explanation: "map produces new array (no mutation)."
    },
    { id: "fill_bug_immutable_obj_pp_001", topicId: "topic_react", conceptKey: "lesson_22::immutable", level: 6,
      code: "// Immutable property update\nsetUser({ ____user, name: newName });",
      answer: "...",
      explanation: "Spread copies + override."
    },
    { id: "fill_bug_json_storage_pp_001", topicId: "topic_browser", conceptKey: "lesson_13::localStorage", level: 6,
      code: "// Save object to localStorage\nlocalStorage.setItem('user', JSON.____(user));",
      answer: "stringify",
      explanation: "Storage API stores strings only."
    },
    { id: "fill_bug_async_await_pp_001", topicId: "topic_js", conceptKey: "lesson_15::Asynchronous", level: 6,
      code: "// Don't forget await on async call\nasync function loadUser() {\n  const r = ____ fetch('/api');\n  const data = await r.json();\n  return data;\n}",
      answer: "await",
      explanation: "await unwraps Promise."
    },
    { id: "fill_bug_optional_pp_001", topicId: "topic_js", conceptKey: "lesson_19::nested object", level: 6,
      code: "// Avoid TypeError on null/undefined\nconst city = user____.address?.city;",
      answer: "?",
      explanation: "Optional chaining ?. short-circuits."
    },
    { id: "fill_bug_nullish_pp_001", topicId: "topic_js", conceptKey: "lesson_19::nested object", level: 6,
      code: "// Default only on null/undefined (not 0)\nconst port = config.port ____ 3000;",
      answer: "??",
      explanation: "?? preserves 0/'' (unlike ||)."
    },
    { id: "fill_bug_super_pp_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 7,
      code: "// Required before this in derived constructor\nclass B extends A {\n  constructor(x) {\n    ____();\n    this.x = x;\n  }\n}",
      answer: "super",
      explanation: "super() invokes parent constructor."
    },
    { id: "fill_bug_bind_pp_001", topicId: "topic_js", conceptKey: "lesson_11::function", level: 7,
      code: "// Lock 'this' binding\nsetTimeout(c.getX.____(c), 100);",
      answer: "bind",
      explanation: "bind returns new function with locked this."
    },
    { id: "fill_bug_remove_listener_pp_001", topicId: "topic_react", conceptKey: "lesson_24::cleanup", level: 7,
      code: "// Cleanup window listener\nuseEffect(() => {\n  window.addEventListener('resize', handle);\n  return () => window.____('resize', handle);\n}, []);",
      answer: "removeEventListener",
      explanation: "Symmetric cleanup prevents leak."
    },
    { id: "fill_bug_useState_func_pp_001", topicId: "topic_react", conceptKey: "lesson_22::setState", level: 6,
      code: "// Functional update for derived state\nset____(prev => prev + 1);",
      answer: "Count",
      explanation: "Updater is safe with batching."
    },
    { id: "fill_bug_deps_pp_001", topicId: "topic_react", conceptKey: "lesson_24::dependency array", level: 7,
      code: "// Include all reactive values\nuseEffect(() => {\n  fetch(`/api/${id}`);\n}, [____]);",
      answer: "id",
      explanation: "Missing deps cause stale closure."
    },
    { id: "fill_bug_prepared_pp_001", topicId: "topic_security", conceptKey: "lesson_auth_security::password hashing", level: 7,
      code: "// Parameterized query (SQL injection safe)\ndb.query('SELECT * FROM users WHERE id = ?', [____]);",
      answer: "userId",
      explanation: "Parameterized = no string concat."
    }
  ]
};
