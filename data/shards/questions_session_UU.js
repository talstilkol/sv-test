// Sprint 2 batch UU - Target SPECIFIC concept gaps from coverage report
// 50 questions: 35 MC + 15 Fill targeting concepts with mcReady=false
window.QUESTIONS_SHARD_UU = {
  mc: [
    // ai_development cluster
    { id: "mc_ai_claude_code_uu_001", topicId: "topic_ai", conceptKey: "ai_development::Claude Code", level: 5,
      question: "מה Claude Code?",
      options: [
        "כלי CLI של Anthropic לפיתוח עם Claude — שילוב של agent + editor + terminal לreviews/refactors/tests אוטומטיים",
        "Browser extension only",
        "API library",
        "Code editor"
      ],
      correctIndex: 0,
      explanation: "Claude Code: CLI agent. שונה מ-Claude API שזה raw LLM access.",
      optionFeedback: ["✅ נכון.","❌ זה משהו אחר.","❌ זה SDK.","❌ אינו editor רגיל."]
    },
    { id: "mc_ai_claude_code_uu_002", topicId: "topic_ai", conceptKey: "ai_development::Claude Code", level: 6,
      question: "איזה capabilities ל-Claude Code?",
      options: [
        "Read/write files, run bash, git commits, multi-file edits, agent loops, MCP tools, hooks",
        "Read only",
        "Single file edit",
        "No git"
      ],
      correctIndex: 0,
      explanation: "Claude Code עובד agentic. מקבל permissions per action או אוטומטי.",
      optionFeedback: ["✅ נכון.","❌ ניתן לכתוב.","❌ multi-file.","❌ git native."]
    },
    { id: "mc_ai_claude_code_uu_003", topicId: "topic_ai", conceptKey: "ai_development::Claude Code", level: 7,
      question: "מה MCP (Model Context Protocol) ב-Claude Code?",
      options: [
        "Standard לחיבור tools חיצוניים (browsers, DBs, APIs) ל-LLM agent — open spec, multi-vendor",
        "Proprietary",
        "Just functions",
        "Network protocol"
      ],
      correctIndex: 0,
      explanation: "MCP: client-server, JSON-RPC. ספריות לבניית servers (Python/TS).",
      optionFeedback: ["✅ נכון.","❌ open standard.","❌ structured.","❌ application-level."]
    },
    { id: "mc_ai_chatgpt_uu_001", topicId: "topic_ai", conceptKey: "ai_development::ChatGPT", level: 5,
      question: "מה ההבדל בין ChatGPT ל-API של GPT?",
      options: [
        "ChatGPT: web UI עם RLHF + system prompt קבוע. API: raw access, you control prompts/params",
        "זהים",
        "API ב-browser",
        "ChatGPT free always"
      ],
      correctIndex: 0,
      explanation: "API ל-developers. ChatGPT ל-end-users.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ API server-side.","❌ חלק paid."]
    },
    { id: "mc_ai_chatgpt_uu_002", topicId: "topic_ai", conceptKey: "ai_development::ChatGPT", level: 6,
      question: "איך לגרום ל-ChatGPT לחזור על output structured?",
      options: [
        "System prompt שמגדיר schema/JSON example, או GPT-4 Function Calling, או Structured Output mode",
        "Hope",
        "Random",
        "Cannot"
      ],
      correctIndex: 0,
      explanation: "JSON mode + tool calls = reliable structured output.",
      optionFeedback: ["✅ נכון.","❌ אלוהי.","❌ דטרמיניסטי-ish.","❌ אפשרי."]
    },
    { id: "mc_ai_chatgpt_uu_003", topicId: "topic_ai", conceptKey: "ai_development::ChatGPT", level: 7,
      question: "מה המגבלות של ChatGPT לפיתוח software?",
      options: [
        "Context window מוגבל, hallucinations on rare APIs, training cutoff, no live system access (UI alone)",
        "אין מגבלות",
        "Slow always",
        "Only Python"
      ],
      correctIndex: 0,
      explanation: "Code Interpreter ב-ChatGPT הוסיף execution. אך עדיין מוגבל.",
      optionFeedback: ["✅ נכון.","❌ קיימות.","❌ depends.","❌ multilingual."]
    },
    { id: "mc_ai_copilot_uu_001", topicId: "topic_ai", conceptKey: "ai_development::Copilot", level: 5,
      question: "מה GitHub Copilot?",
      options: [
        "AI code completion ב-IDE (VSCode, JetBrains). מבוסס על Codex/GPT. inline suggestions תוך כדי הקלדה",
        "Standalone IDE",
        "Cloud function",
        "Browser only"
      ],
      correctIndex: 0,
      explanation: "Copilot: extension. Copilot Chat: dialog. Copilot Workspace: agentic.",
      optionFeedback: ["✅ נכון.","❌ extension.","❌ runs in IDE.","❌ desktop."]
    },
    { id: "mc_ai_copilot_uu_002", topicId: "topic_ai", conceptKey: "ai_development::Copilot", level: 6,
      question: "מתי Copilot suggestions לא טובים?",
      options: [
        "Domain-specific code (private libraries), נכונות business logic, security-sensitive (סיסמאות, encryption), recent APIs",
        "Always good",
        "Never good",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Pattern-matching on training corpus. דרושה review.",
      optionFeedback: ["✅ נכון.","❌ overconfident.","❌ usable.","❌ deterministic-ish."]
    },
    { id: "mc_ai_copilot_uu_003", topicId: "topic_ai", conceptKey: "ai_development::Copilot", level: 7,
      question: "מה ההבדל בין Copilot ל-Cursor/Claude Code?",
      options: [
        "Copilot: inline completion. Cursor: AI-first editor with file context. Claude Code: terminal agent. כל אחד optimized להקשר אחר",
        "זהים",
        "Cursor copy",
        "Claude legacy"
      ],
      correctIndex: 0,
      explanation: "Spectrum: completion → chat → agent. בחירה לפי workflow.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ עצמאי.","❌ חדש."]
    },
    { id: "mc_ai_pair_uu_001", topicId: "topic_ai", conceptKey: "ai_development::AI Pair Programming", level: 6,
      question: "מה AI Pair Programming?",
      options: [
        "עבודה עם AI כשותף לקוד — שאלות, רעיונות, refactoring, debugging. אך human נשאר אחראי ל-decisions",
        "AI alone",
        "Human alone",
        "Async only"
      ],
      correctIndex: 0,
      explanation: "Driver-Navigator: AI suggests, human steers. שונה מ-fully autonomous.",
      optionFeedback: ["✅ נכון.","❌ הפוך לpair.","❌ הפוך.","❌ real-time."]
    },
    { id: "mc_ai_pair_uu_002", topicId: "topic_ai", conceptKey: "ai_development::AI Pair Programming", level: 7,
      question: "באילו tasks AI pair-programming הכי מועיל?",
      options: [
        "Boilerplate, tests, docs, refactoring, exploring APIs, naming. פחות: architecture decisions, novel algorithms",
        "Everything equally",
        "Nothing",
        "Just typing"
      ],
      correctIndex: 0,
      explanation: "AI excel ב-pattern-matching. judgment-heavy work עדיין human-driven.",
      optionFeedback: ["✅ נכון.","❌ context-dependent.","❌ broad value.","❌ deeper than typing."]
    },
    { id: "mc_ai_pair_uu_003", topicId: "topic_ai", conceptKey: "ai_development::AI Pair Programming", level: 7,
      question: "מה אסור לעשות ב-AI Pair Programming?",
      options: [
        "Skip review של AI output. Trust security/secrets. Paste sensitive data to public LLMs. בלי tests",
        "Use AI",
        "Ask questions",
        "Review code"
      ],
      correctIndex: 0,
      explanation: "Privacy: keys/PII לא נשלחים ל-LLM ציבורי. Review תמיד.",
      optionFeedback: ["✅ נכון.","❌ tool legitimate.","❌ זה ה-purpose.","❌ זה ה-correct."]
    },
    { id: "mc_ai_limit_uu_001", topicId: "topic_ai", conceptKey: "ai_development::AI Limitations", level: 6,
      question: "מהן מגבלות עיקריות של LLM?",
      options: [
        "Hallucinations, context window finite, no real-time data (cutoff), bias from training, no genuine reasoning (statistical patterns)",
        "אין מגבלות",
        "רק speed",
        "Only English"
      ],
      correctIndex: 0,
      explanation: "Awareness ב-LLM helps avoid blind trust.",
      optionFeedback: ["✅ נכון.","❌ קיימות.","❌ עוד.","❌ multilingual."]
    },
    { id: "mc_ai_limit_uu_002", topicId: "topic_ai", conceptKey: "ai_development::AI Limitations", level: 7,
      question: "מה context window ב-LLM?",
      options: [
        "מקסימום tokens (input + output) שמודל יכול לעבד בו-זמנית. חורג → truncation/summarization. דגמי מודרני: 200K-2M",
        "Memory persistent",
        "RAM size",
        "Network bandwidth"
      ],
      correctIndex: 0,
      explanation: "Claude Sonnet 4.6 = 200K. Opus 4.7 = 1M. GPT-4 Turbo = 128K.",
      optionFeedback: ["✅ נכון.","❌ stateless.","❌ unrelated.","❌ unrelated."]
    },
    { id: "mc_ai_limit_uu_003", topicId: "topic_ai", conceptKey: "ai_development::AI Limitations", level: 8,
      question: "איך להתמודד עם context window limits?",
      options: [
        "Summarization, RAG (retrieve relevant chunks), prompt caching, multi-agent split, scratchpads, hierarchical compression",
        "Ignore",
        "Bigger model only",
        "Split files"
      ],
      correctIndex: 0,
      explanation: "Anthropic prompt caching ל-5min, חוסך עלות + latency. RAG ל-knowledge בלי re-train.",
      optionFeedback: ["✅ נכון.","❌ critical issue.","❌ depends on model.","❌ partial."]
    },
    { id: "mc_ai_hallu_uu_001", topicId: "topic_ai", conceptKey: "ai_development::Hallucinations", level: 6,
      question: "מה hallucination ב-LLM?",
      options: [
        "מודל מייצר מידע שלא קיים — שמות פונקציות, APIs, ספריות, ציטוטים מומצאים. נשמע confident",
        "Bug fix",
        "Random output",
        "Cache miss"
      ],
      correctIndex: 0,
      explanation: "Statistical generation. דורש verification (run code, check docs).",
      optionFeedback: ["✅ נכון.","❌ פגם.","❌ דטרמיניסטי-ish.","❌ unrelated."]
    },
    { id: "mc_ai_hallu_uu_002", topicId: "topic_ai", conceptKey: "ai_development::Hallucinations", level: 7,
      question: "איך למנוע hallucinations בproduction?",
      options: [
        "RAG (ground in real data), function calling (real API), low temperature, citation requirements, output validation",
        "Higher temp",
        "Larger model",
        "Long context"
      ],
      correctIndex: 0,
      explanation: "Temperature 0 = deterministic. Constitutional AI ב-Claude מקטין.",
      optionFeedback: ["✅ נכון.","❌ הפוך.","❌ partial help.","❌ partial."]
    },
    { id: "mc_ai_hallu_uu_003", topicId: "topic_ai", conceptKey: "ai_development::Hallucinations", level: 8,
      question: "איך לזהות hallucination בpracticeה?",
      options: [
        "Cross-check עם docs רשמיים, run the code, ask לcitation, compare two LLMs, automated fact-checking pipelines",
        "Trust",
        "Hope",
        "Vibes"
      ],
      correctIndex: 0,
      explanation: "Verify ב-runtime. אסור push קוד בלי run.",
      optionFeedback: ["✅ נכון.","❌ סכנה.","❌ אינו verification.","❌ אינו verification."]
    },
    { id: "mc_ai_context_uu_001", topicId: "topic_ai", conceptKey: "ai_development::Context Window", level: 6,
      question: "כיצד לבחור model context window ל-task?",
      options: [
        "Codebase קטן: 200K מספיק. Repo גדול עם history: 1M-2M. Chat קצר: 100K. Cost-sensitive: smaller",
        "Always biggest",
        "Always smallest",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Cost ∝ tokens. Latency גם. בחירה pragmatic.",
      optionFeedback: ["✅ נכון.","❌ יקר מיותר.","❌ truncation.","❌ דטרמיניסטי."]
    },
    { id: "mc_ai_context_uu_002", topicId: "topic_ai", conceptKey: "ai_development::Context Window", level: 7,
      question: "מה prompt caching ב-Claude?",
      options: [
        "מסמן חלקים של הprompt כ-static. בקריאות חוזרות (תוך 5min), המודל לא מחשב אותם מחדש → ~90% חיסכון on those tokens",
        "Local cache",
        "Network cache",
        "Slower"
      ],
      correctIndex: 0,
      explanation: "Anthropic prompt caching = cost optimization. system prompts ארוכים = candidate.",
      optionFeedback: ["✅ נכון. server-side cache.","❌ server-side.","❌ different layer.","❌ הפוך — מהיר."]
    },
    { id: "mc_ai_context_uu_003", topicId: "topic_ai", conceptKey: "ai_development::Context Window", level: 8,
      question: "מה ההבדל בין long context ל-RAG?",
      options: [
        "Long context: load הכל ל-prompt (יקר, אבל simple). RAG: retrieve relevant chunks (חסכוני, scalable, אבל retrieval quality חשוב)",
        "זהים",
        "RAG legacy",
        "Long context only"
      ],
      correctIndex: 0,
      explanation: "Hybrid נפוץ: RAG ל-knowledge base + few-shot ב-prompt.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ עדכני.","❌ multiple options."]
    },
    // lesson_16
    { id: "mc_l16_type_nul_uu_001", topicId: "topic_node", conceptKey: "lesson_16::type nul", level: 4,
      question: "מה `type nul > file.txt` ב-Windows?",
      options: [
        "יוצר קובץ ריק. אנלוגי ל-`touch file.txt` ב-Linux",
        "מוחק קובץ",
        "מציג content",
        "Renames"
      ],
      correctIndex: 0,
      explanation: "Windows CMD. `nul` device. PowerShell: New-Item file.txt.",
      optionFeedback: ["✅ נכון.","❌ זה del.","❌ זה type.","❌ rename."]
    },
    { id: "mc_l16_type_nul_uu_002", topicId: "topic_node", conceptKey: "lesson_16::type nul", level: 5,
      question: "מתי משתמשים ב-type nul במקום touch?",
      options: [
        "ב-Windows CMD/PowerShell ישן. ב-Git Bash או PowerShell עם posix tools — touch זמין",
        "Linux",
        "Mac",
        "Always"
      ],
      correctIndex: 0,
      explanation: "Cross-platform: WSL/Git Bash מספקים unix commands.",
      optionFeedback: ["✅ נכון.","❌ touch native.","❌ touch native.","❌ depends."]
    },
    { id: "mc_l16_type_nul_uu_003", topicId: "topic_node", conceptKey: "lesson_16::type nul", level: 5,
      question: "מה אלטרנטיבה ב-PowerShell?",
      options: [
        "New-Item -ItemType File -Name 'file.txt' או echo $null > file.txt",
        "type",
        "ls",
        "del"
      ],
      correctIndex: 0,
      explanation: "PowerShell cmdlets verbose-clear. type nul עובד גם.",
      optionFeedback: ["✅ נכון.","❌ זה display.","❌ זה list.","❌ זה delete."]
    },
    // lesson_17
    { id: "mc_l17_path_uu_001", topicId: "topic_http", conceptKey: "lesson_17::Path", level: 4,
      question: "מה ה-Path ב-URL?",
      options: [
        "החלק אחרי domain — מציין resource specific. דוגמה: /users/42/profile",
        "Domain",
        "Query string",
        "Protocol"
      ],
      correctIndex: 0,
      explanation: "URL: protocol://host/path?query#fragment.",
      optionFeedback: ["✅ נכון.","❌ זה לפני path.","❌ אחרי path.","❌ שונה."]
    },
    { id: "mc_l17_path_uu_002", topicId: "topic_http", conceptKey: "lesson_17::Path", level: 5,
      question: "מה path parameters ב-Express?",
      options: [
        "Dynamic segments: /users/:id → req.params.id. שונה מ-query string",
        "Headers",
        "Body",
        "Cookies"
      ],
      correctIndex: 0,
      explanation: "REST: /users/42. Query: /users?id=42.",
      optionFeedback: ["✅ נכון.","❌ headers נפרדים.","❌ body שונה.","❌ cookies שונה."]
    },
    { id: "mc_l17_server_uu_001", topicId: "topic_http", conceptKey: "lesson_17::Server", level: 4,
      question: "מה Server ב-HTTP?",
      options: [
        "תוכנה שמקבלת requests + מחזירה responses. Node/Python/Go/Java common. רץ על host (cloud or on-prem)",
        "Browser",
        "DB",
        "Cache"
      ],
      correctIndex: 0,
      explanation: "Express הוא Node web framework. Apache/Nginx servers also.",
      optionFeedback: ["✅ נכון.","❌ client.","❌ separate concern.","❌ separate."]
    },
    { id: "mc_l17_request_uu_001", topicId: "topic_http", conceptKey: "lesson_17::Request", level: 4,
      question: "מה req ב-Express?",
      options: [
        "אובייקט שמייצג ה-incoming request: method, url, headers, body, params, query, cookies",
        "Response",
        "Server",
        "Database"
      ],
      correctIndex: 0,
      explanation: "Express מוסיף helpers: req.params, req.query, req.body (עם middleware).",
      optionFeedback: ["✅ נכון.","❌ res שונה.","❌ app שונה.","❌ unrelated."]
    },
    { id: "mc_l17_response_uu_001", topicId: "topic_http", conceptKey: "lesson_17::Response", level: 4,
      question: "מה res.json() ב-Express?",
      options: [
        "מחזיר response עם Content-Type: application/json + מקודד את ה-object לJSON",
        "Just stringify",
        "Same as send",
        "Sets cookie"
      ],
      correctIndex: 0,
      explanation: "res.send() מנחש type. res.json() explicit.",
      optionFeedback: ["✅ נכון.","❌ גם sets header.","❌ דומה אבל explicit.","❌ זה res.cookie."]
    },
    { id: "mc_l17_crud_uu_001", topicId: "topic_rest", conceptKey: "lesson_17::CRUD", level: 5,
      question: "מה CRUD?",
      options: [
        "Create (POST), Read (GET), Update (PUT/PATCH), Delete — 4 פעולות בסיסיות על resources",
        "API name",
        "Database",
        "Library"
      ],
      correctIndex: 0,
      explanation: "REST mapping. PATCH partial, PUT full replacement.",
      optionFeedback: ["✅ נכון.","❌ pattern.","❌ DB has CRUD too.","❌ generic."]
    },
    { id: "mc_l17_crud_uu_002", topicId: "topic_rest", conceptKey: "lesson_17::CRUD", level: 6,
      question: "מה ההבדל בין PUT ל-PATCH ב-REST?",
      options: [
        "PUT: full replacement (idempotent). PATCH: partial update. PATCH יותר נפוץ ב-modern APIs",
        "זהים",
        "PATCH legacy",
        "PUT obsolete"
      ],
      correctIndex: 0,
      explanation: "JSON Patch / JSON Merge Patch standardize PATCH.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ קיים.","❌ קיים."]
    },
    { id: "mc_l17_app_get_uu_001", topicId: "topic_express", conceptKey: "lesson_17::app.get", level: 4,
      question: "מה app.get('/users', handler) עושה?",
      options: [
        "רושם handler ל-GET /users. handler נקרא עם (req, res) כשבא request מתאים",
        "Sends GET",
        "Fetches data",
        "Renders page"
      ],
      correctIndex: 0,
      explanation: "app.get() = route registration. handler runs on match.",
      optionFeedback: ["✅ נכון.","❌ זה client-side.","❌ זה fetch.","❌ depends."]
    },
    { id: "mc_l17_app_listen_uu_001", topicId: "topic_express", conceptKey: "lesson_17::app.listen", level: 4,
      question: "מה app.listen(3000)?",
      options: [
        "מפעיל את השרת על port 3000 — מתחיל לקבל connections. צריך פעם אחת אחרי שלקחו את כל הroutes",
        "Closes",
        "Reloads",
        "Tests"
      ],
      correctIndex: 0,
      explanation: "Returns http.Server instance. callback אופציונלי שירוץ אחרי start.",
      optionFeedback: ["✅ נכון.","❌ הפוך.","❌ אינו reload.","❌ unrelated."]
    },
    { id: "mc_l17_route_uu_001", topicId: "topic_express", conceptKey: "lesson_17::Route", level: 5,
      question: "מה Route ב-Express?",
      options: [
        "Mapping של (method, path, handler). app.get('/x', fn). app.post('/y', fn). matched לפי order",
        "Library",
        "DB query",
        "URL only"
      ],
      correctIndex: 0,
      explanation: "express.Router() ל-modular routing.",
      optionFeedback: ["✅ נכון.","❌ concept.","❌ unrelated.","❌ partial."]
    },
    { id: "mc_l17_form_uu_001", topicId: "topic_html", conceptKey: "lesson_17::form", level: 4,
      question: "מה <form> ב-HTML?",
      options: [
        "Container ל-input controls + submit. method=GET/POST, action=URL. ברירת מחדל submit reloads page",
        "Container general",
        "Input only",
        "Style"
      ],
      correctIndex: 0,
      explanation: "ב-React: e.preventDefault() + handle.",
      optionFeedback: ["✅ נכון.","❌ specific.","❌ multiple.","❌ structural."]
    }
  ],
  fill: [
    { id: "fill_l17_path_uu_001", topicId: "topic_http", conceptKey: "lesson_17::Path", level: 5,
      code: "// Express path parameter\napp.get('/users/____', (req, res) => {\n  const id = req.params.id;\n});",
      answer: ":id",
      explanation: ":id = path parameter."
    },
    { id: "fill_l17_server_uu_001", topicId: "topic_express", conceptKey: "lesson_17::Server", level: 4,
      code: "// Create Express server\nconst express = require('express');\nconst ____ = express();",
      answer: "app",
      explanation: "app = Express application instance."
    },
    { id: "fill_l17_request_uu_001", topicId: "topic_express", conceptKey: "lesson_17::Request", level: 4,
      code: "// Access request body (with body-parser)\napp.post('/users', (req, res) => {\n  const data = req.____;\n});",
      answer: "body",
      explanation: "req.body = parsed POST body."
    },
    { id: "fill_l17_response_uu_001", topicId: "topic_express", conceptKey: "lesson_17::Response", level: 4,
      code: "// Send JSON response\nres.____({ users: [...] });",
      answer: "json",
      explanation: "res.json sets Content-Type + serializes."
    },
    { id: "fill_l17_crud_create_uu_001", topicId: "topic_rest", conceptKey: "lesson_17::Create", level: 5,
      code: "// CRUD - Create\napp.____('/users', (req, res) => {\n  const u = createUser(req.body);\n  res.status(201).json(u);\n});",
      answer: "post",
      explanation: "POST = Create in CRUD."
    },
    { id: "fill_l17_crud_read_uu_001", topicId: "topic_rest", conceptKey: "lesson_17::Read", level: 5,
      code: "// CRUD - Read\napp.____('/users/:id', (req, res) => {\n  res.json(findUser(req.params.id));\n});",
      answer: "get",
      explanation: "GET = Read in CRUD."
    },
    { id: "fill_l17_crud_update_uu_001", topicId: "topic_rest", conceptKey: "lesson_17::Update", level: 5,
      code: "// CRUD - Update\napp.____('/users/:id', (req, res) => {\n  res.json(updateUser(req.params.id, req.body));\n});",
      answer: "put",
      explanation: "PUT = full replacement (PATCH = partial)."
    },
    { id: "fill_l17_crud_delete_uu_001", topicId: "topic_rest", conceptKey: "lesson_17::Delete", level: 5,
      code: "// CRUD - Delete\napp.____('/users/:id', (req, res) => {\n  deleteUser(req.params.id);\n  res.status(204).end();\n});",
      answer: "delete",
      explanation: "DELETE method removes."
    },
    { id: "fill_l17_route_uu_001", topicId: "topic_express", conceptKey: "lesson_17::Route", level: 5,
      code: "// Modular routes\nconst router = express.____();\nrouter.get('/users', listUsers);\napp.use('/api', router);",
      answer: "Router",
      explanation: "express.Router for modular routes."
    },
    { id: "fill_l17_app_listen_uu_001", topicId: "topic_express", conceptKey: "lesson_17::app.listen", level: 4,
      code: "// Start server\napp.____(3000, () => console.log('ready'));",
      answer: "listen",
      explanation: "app.listen starts server on port."
    },
    { id: "fill_l17_event_default_uu_001", topicId: "topic_html", conceptKey: "lesson_17::event.preventDefault", level: 5,
      code: "// Stop form reload\nform.addEventListener('submit', e => {\n  e.____();\n  saveData();\n});",
      answer: "preventDefault",
      explanation: "preventDefault stops default browser action."
    },
    { id: "fill_ai_claude_code_uu_001", topicId: "topic_ai", conceptKey: "ai_development::Claude Code", level: 5,
      code: "# Install Claude Code globally\nnpm install -g @anthropic-ai/____-code",
      answer: "claude",
      explanation: "@anthropic-ai/claude-code = official package."
    },
    { id: "fill_ai_chatgpt_uu_001", topicId: "topic_ai", conceptKey: "ai_development::ChatGPT", level: 5,
      code: "// JSON-mode response (OpenAI)\nawait openai.chat.completions.create({\n  model: 'gpt-4o',\n  response_format: { type: '____' },\n  messages: [...]\n});",
      answer: "json_object",
      explanation: "json_object guarantees valid JSON output."
    },
    { id: "fill_ai_copilot_uu_001", topicId: "topic_ai", conceptKey: "ai_development::Copilot", level: 5,
      code: "// Disable Copilot for sensitive file\n// copilot:____",
      answer: "disable",
      explanation: "// copilot:disable comment turns off suggestions."
    },
    { id: "fill_ai_context_uu_001", topicId: "topic_ai", conceptKey: "ai_development::Context Window", level: 7,
      code: "// Anthropic prompt caching\nawait anthropic.messages.create({\n  model: 'claude-opus-4-7',\n  system: [{ type: 'text', text: bigPrompt, cache_control: { type: '____' } }],\n  messages: [{ role: 'user', content: question }]\n});",
      answer: "ephemeral",
      explanation: "cache_control: ephemeral = 5min cache."
    }
  ]
};
