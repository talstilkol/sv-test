// SESSION K — workbook_taskmanager + ai_development gap-filling (manual)
// Each concept needs 2 more MC + 2 Fill. Adding 1 MC + 1 Fill for top 12 concepts.
window.QUESTIONS_SHARD_K = {
  "mc": [
    {
      "id": "mc_wb_taskmgr_002",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::Task Manager",
      "level": 4,
      "question": "מה הסכנה בתכנון Task Manager בלי persistence?",
      "options": [
        "כל refresh של הדף מאפס את כל המשימות — UX רע",
        "JavaScript לא תומך בlocalStorage",
        "DOM לא רינדר",
        "Task Manager לא קיים"
      ],
      "correctIndex": 0,
      "explanation": "ללא persistence (localStorage/IndexedDB/server) — refresh = איבוד נתונים. UX רע ודאי. localStorage הוא הפתרון הפשוט ביותר.",
      "optionFeedback": [
        "✅ נכון. ללא persistence — refresh מוחק. localStorage הוא ברירת המחדל.",
        "❌ localStorage נתמך בכל הדפדפנים המודרניים מאז 2010.",
        "❌ DOM render לא קשור לpersistence.",
        "❌ Task Manager הוא pattern נפוץ — שני tutorials מלמדים אותו."
      ]
    },
    {
      "id": "mc_wb_vars_002",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::variables",
      "level": 3,
      "question": "באיזה משתנה כדאי לשמור את רשימת המשימות הנוכחית?",
      "options": [
        "let tasks = [] — מאפשר reassignment לאחרי טעינה מ-localStorage",
        "const tasks = [] — לא ניתן לשנות אחרי הצהרה",
        "var tasks — function-scoped, לא מומלץ ב-2024+",
        "אין צורך במשתנה — DOM הוא הסטייט"
      ],
      "correctIndex": 0,
      "explanation": "let מאפשר reassignment (tasks = JSON.parse(localStorage...)). const נכשל אם תנסה להחליף את הreference. DOM-as-state מקשה על debug ועל immutable updates.",
      "optionFeedback": [
        "✅ נכון. let עם reassignment ל-tasks אחרי load.",
        "❌ const מונע tasks = [...] — חוסם את ה-reload-from-storage flow.",
        "❌ var legacy + function-scoped + hoisted = bug-prone.",
        "❌ DOM-as-state מקשה לdebug + רינדור־מחדש לא־יעיל."
      ]
    },
    {
      "id": "mc_wb_dom_002",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::DOM",
      "level": 4,
      "question": "מה הדרך הנכונה לרנדר רשימת משימות מחדש כל פעם שהמערך משתנה?",
      "options": [
        "function render() { taskList.innerHTML = ''; tasks.forEach(t => taskList.appendChild(createTaskEl(t))); }",
        "להוסיף appendChild ולא למחוק — DOM יזהה duplicates",
        "להעתיק את כל ה-HTML עם innerText",
        "אין צורך — JavaScript עושה rerender אוטומטי"
      ],
      "correctIndex": 0,
      "explanation": "Pattern נפוץ: clear + rebuild. למורכב יותר — diff/keys (כמו React). createElement + textContent בטוח מ-XSS לעומת innerHTML עם user content.",
      "optionFeedback": [
        "✅ נכון. clear + rebuild + textContent = פשוט ובטוח.",
        "❌ ה-DOM לא מזהה duplicates — תקבל פריטים כפולים בכל הוספה.",
        "❌ innerText אינו רינדור — והוא נמחק בכל refresh.",
        "❌ JavaScript לא עושה rerender אוטומטי — אתה צריך לקרוא ל-render."
      ]
    },
    {
      "id": "mc_wb_events_002",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::events",
      "level": 4,
      "question": "איך מטפלים ב-clicks על delete-button של כל משימה ברשימה דינמית?",
      "options": [
        "Event delegation — listener על ה-parent + e.target בודק class",
        "addEventListener על כל li בנפרד אחרי כל render",
        "onclick attribute ב-HTML של כל li",
        "MutationObserver"
      ],
      "correctIndex": 0,
      "explanation": "Event delegation = listener אחד על parent. e.target.closest('.delete') לבדיקה. שורד re-renders ולא דולף memory. הוספה ידנית של listeners תדרוש cleanup ולא scalable.",
      "optionFeedback": [
        "✅ נכון. delegation = יעיל וscalable.",
        "❌ דולף memory + צריך cleanup בכל render.",
        "❌ inline onclick = mixing of concerns + לא יציב עם CSP.",
        "❌ MutationObserver לדבר אחר (זיהוי שינויי DOM)."
      ]
    },
    {
      "id": "mc_wb_ls_002",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::localStorage",
      "level": 4,
      "question": "איך שומרים מערך משימות ב-localStorage?",
      "options": [
        "localStorage.setItem('tasks', JSON.stringify(tasks))",
        "localStorage.tasks = tasks  // מקבל reference למערך",
        "localStorage.save(tasks)",
        "localStorage = tasks  // assignment ישיר"
      ],
      "correctIndex": 0,
      "explanation": "localStorage שומר רק strings. תמיד JSON.stringify לכתיבה + JSON.parse לקריאה. Try/catch על parse — JSON ישן עלול להיות corrupted.",
      "optionFeedback": [
        "✅ נכון. setItem + JSON.stringify הוא הpattern.",
        "❌ assignment ישיר ימיר את המערך לstring '[object Array]' — איבוד נתונים.",
        "❌ אין מתודה .save ב-localStorage.",
        "❌ localStorage עצמו הוא object, לא ניתן להציב לו ערך."
      ]
    },
    {
      "id": "mc_wb_async_002",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::async/await",
      "level": 5,
      "question": "מתי async/await שימושי ב-Task Manager?",
      "options": [
        "כשטוענים משימות מ-API מרוחק או נקראים ל-IndexedDB",
        "תמיד — async מהיר יותר",
        "רק ב-Node.js, לא בדפדפן",
        "לא שימושי — Task Manager הוא local"
      ],
      "correctIndex": 0,
      "explanation": "async/await נחוץ לכל I/O: fetch מ-server, IndexedDB, file API. localStorage עצמו synchronous (אבל איטי לreads גדולים — שקול IndexedDB).",
      "optionFeedback": [
        "✅ נכון. fetch + IndexedDB דורשים async.",
        "❌ async לא מהיר יותר — הוא non-blocking.",
        "❌ async/await נתמך בכל הדפדפנים מ-2017.",
        "❌ אם משלבים API/sync — נחוץ async."
      ]
    },
    {
      "id": "mc_aidev_claude_002",
      "topicId": "topic_ai_dev",
      "conceptKey": "ai_development::Claude Code",
      "level": 5,
      "question": "מה ייחודי ב-Claude Code לעומת ChatGPT לצורכי פיתוח?",
      "options": [
        "Agent loop עם tool use + עריכת קבצים בפרויקט + git workflows",
        "מודל גדול יותר",
        "קוד פתוח חופשי",
        "אין הבדל"
      ],
      "correctIndex": 0,
      "explanation": "Claude Code = agentic CLI שיודע לערוך קבצים, להריץ tests, לעבוד ב-git. ChatGPT = ממשק chat. שניהם מעל מודלים דומים אבל use-case שונה.",
      "optionFeedback": [
        "✅ נכון. agent flow = ההבדל המרכזי.",
        "❌ הם משתמשים במודלים דומים (Sonnet/GPT-4 family).",
        "❌ Claude Code סגור — Anthropic.",
        "❌ ההבדל מהותי: tool use + filesystem."
      ]
    },
    {
      "id": "mc_aidev_chatgpt_002",
      "topicId": "topic_ai_dev",
      "conceptKey": "ai_development::ChatGPT",
      "level": 4,
      "question": "מה הסיכון העיקרי בהדבקת קוד לתוך ChatGPT לdebug?",
      "options": [
        "חשיפת secrets/API keys/data רגיש לצד שלישי",
        "ChatGPT לא יבין את הקוד",
        "הקוד יישבר",
        "אין סיכון"
      ],
      "correctIndex": 0,
      "explanation": "ChatGPT שולח את הקוד ל-OpenAI servers. אם יש secrets בinline — דליפה. תמיד לסנן/scrub לפני הדבקה. או להשתמש ב-API עם data retention policies.",
      "optionFeedback": [
        "✅ נכון. data leakage הוא הסיכון העיקרי.",
        "❌ ChatGPT מבין קוד באופן יחסי טוב.",
        "❌ הדבקה לchat לא משנה את הקוד שלך.",
        "❌ סיכון אמיתי וחשוב."
      ]
    },
    {
      "id": "mc_aidev_copilot_002",
      "topicId": "topic_ai_dev",
      "conceptKey": "ai_development::Copilot",
      "level": 4,
      "question": "מה היתרון של Copilot לעומת בקשות ChatGPT ידניות?",
      "options": [
        "השלמה אוטומטית בקונטקסט של הקובץ הפתוח — flow רציף",
        "Copilot חכם יותר",
        "Copilot חינמי",
        "Copilot לא דורש internet"
      ],
      "correctIndex": 0,
      "explanation": "Copilot = inline + context-aware. אין הפסקת flow. ChatGPT = ממשק chat נפרד. שניהם משתמשים במודלים דומים. Copilot Pro $10/חודש.",
      "optionFeedback": [
        "✅ נכון. flow רציף בלי context-switch.",
        "❌ הם דומים באיכות (תלוי במודל).",
        "❌ Copilot $10/חודש (יש Free tier מוגבל).",
        "❌ Copilot דורש חיבור ל-GitHub Copilot service."
      ]
    },
    {
      "id": "mc_aidev_pair_002",
      "topicId": "topic_ai_dev",
      "conceptKey": "ai_development::AI Pair Programming",
      "level": 5,
      "question": "מה ההבדל בין AI Pair Programming ל-AI auto-completion?",
      "options": [
        "Pair = שיחה דו-כיוונית עם AI על architecture/decisions; Auto = השלמת tokens",
        "אין הבדל",
        "Pair Programming דורש שני אנשים",
        "Auto-completion רק ב-IDE"
      ],
      "correctIndex": 0,
      "explanation": "Pair = high-level discussion (Claude/ChatGPT). Auto = low-level inline (Copilot/Cursor tab). שני שימושים שונים, משלימים.",
      "optionFeedback": [
        "✅ נכון. שיחה vs השלמה.",
        "❌ הם תפקידים שונים בתהליך.",
        "❌ AI Pair = AI הוא ה-pair, אין צורך באדם שני.",
        "❌ Auto-completion יכול גם בCLI/web."
      ]
    },
    {
      "id": "mc_aidev_limits_002",
      "topicId": "topic_ai_dev",
      "conceptKey": "ai_development::AI Limitations",
      "level": 6,
      "question": "מה החולשה הבולטת ב-LLMs ל-coding ב-2024?",
      "options": [
        "Hallucinations של APIs/methods שלא קיימים — דורש verification",
        "LLMs לא יכולים לכתוב קוד",
        "LLMs מהירים מאוד",
        "אין חולשה"
      ],
      "correctIndex": 0,
      "explanation": "Hallucination הוא הסיכון. LLM יכול להמציא method/library/syntax. תמיד לrun + לבדוק ב-docs. RAG עם docs רשמיים מקטין hallucinations.",
      "optionFeedback": [
        "✅ נכון. hallucinations + cutoff date = הסיכונים העיקריים.",
        "❌ LLMs כותבים קוד תקין ברוב המקרים.",
        "❌ מהירות אינה חולשה.",
        "❌ יש חולשות אמיתיות."
      ]
    }
  ],
  "fill": [
    {
      "id": "fill_wb_taskmgr_001",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::Task Manager",
      "level": 3,
      "code": "// טעינת משימות מ-localStorage\nconst saved = localStorage.getItem('tasks');\nconst tasks = saved ? JSON.____(saved) : [];",
      "answer": "parse",
      "hint": "המתודה שממירה JSON string לאובייקט/מערך JS.",
      "explanation": "JSON.parse → object/array. JSON.stringify → string. תמיד try/catch סביב parse כי data ישן יכול להיות corrupted."
    },
    {
      "id": "fill_wb_vars_001",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::variables",
      "level": 3,
      "code": "// מאפשר reassignment בעת load מ-storage\n____ tasks = [];\ntasks = JSON.parse(localStorage.getItem('tasks') || '[]');",
      "answer": "let",
      "hint": "מילת מפתח שמכריזה משתנה block-scoped עם reassignment.",
      "explanation": "let מאפשר tasks = [...]. const חוסם reassignment של ה-binding (אבל מאפשר mutation של המערך עצמו)."
    },
    {
      "id": "fill_wb_arrays_001",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::arrays",
      "level": 3,
      "code": "// הוסף משימה חדשה ב-immutable\ntasks = [____tasks, { id: nextId(), text: input.value, done: false }];",
      "answer": "...",
      "hint": "ספרייה אופרטור שפותח את כל איברי המערך הקיים.",
      "explanation": "Spread יוצר מערך חדש = immutability. push() mutates. עדיף immutable ל-React/state."
    },
    {
      "id": "fill_wb_dom_001",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::DOM",
      "level": 4,
      "code": "// בטוח מ-XSS\nconst li = document.createElement('li');\nli.____ = task.text;",
      "answer": "textContent",
      "hint": "property שמכניס טקסט בלבד — בלי לפענח HTML.",
      "explanation": "textContent בטוח לקלט משתמש. innerHTML עם user content = XSS injection."
    },
    {
      "id": "fill_wb_events_001",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::events",
      "level": 4,
      "code": "// event delegation על parent\ntaskList.____('click', (e) => {\n  if (e.target.classList.contains('delete')) deleteTask(e.target.dataset.id);\n});",
      "answer": "addEventListener",
      "hint": "מתודה שמרשמת listener לאירוע ב-DOM.",
      "explanation": "addEventListener מאפשר multiple listeners + capture/bubble control. עדיף מ-onclick=."
    },
    {
      "id": "fill_wb_ls_001",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::localStorage",
      "level": 4,
      "code": "// שמירה אחרי כל שינוי\nlocalStorage.____('tasks', JSON.stringify(tasks));",
      "answer": "setItem",
      "hint": "מתודה ב-localStorage לכתיבת ערך עם key.",
      "explanation": "setItem(key, valueString). תמיד stringify קודם — localStorage שומר רק strings."
    },
    {
      "id": "fill_wb_objects_001",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::objects",
      "level": 3,
      "code": "// יצירת משימה — object literal\nconst task = { id: 1, text: 'תרגול', ____: false };",
      "answer": "done",
      "hint": "Property בוליאני שמסמן אם המשימה הושלמה.",
      "explanation": "מבנה object: { id, text, done }. ניתן להוסיף createdAt, dueDate וכו׳ לפי הצורך."
    },
    {
      "id": "fill_wb_trycatch_001",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::try/catch",
      "level": 4,
      "code": "// טעינה בטוחה — corrupted JSON לא יקרוס\n____ {\n  tasks = JSON.parse(localStorage.getItem('tasks'));\n} catch (e) {\n  tasks = [];\n}",
      "answer": "try",
      "hint": "מילת מפתח שפותחת בלוק שתופס שגיאות.",
      "explanation": "try/catch עוטף קוד שעלול לזרוק שגיאה. JSON.parse(invalid) זורק SyntaxError."
    },
    {
      "id": "fill_wb_fetch_001",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::fetch",
      "level": 5,
      "code": "// טעינה מ-API\nasync function loadFromServer() {\n  const res = await ____('/api/tasks');\n  return res.json();\n}",
      "answer": "fetch",
      "hint": "פונקציית browser ל-HTTP requests מודרנית.",
      "explanation": "fetch() מחזיר Promise<Response>. .json() עוד Promise. תמיד try/catch + check res.ok."
    },
    {
      "id": "fill_wb_async_001",
      "topicId": "topic_workbook",
      "conceptKey": "workbook_taskmanager::async/await",
      "level": 5,
      "code": "____ function syncTasks() {\n  const remote = await fetch('/api/tasks').then(r => r.json());\n  tasks = remote;\n  render();\n}",
      "answer": "async",
      "hint": "מילת מפתח שמסמנת פונקציה אסינכרונית — ניתן להשתמש בה ב-await.",
      "explanation": "async function מחזירה Promise. await רק בתוך async (מ-2024 גם top-level await ב-modules)."
    },
    {
      "id": "fill_aidev_claude_001",
      "topicId": "topic_ai_dev",
      "conceptKey": "ai_development::Claude Code",
      "level": 5,
      "code": "// Claude Code יכול להריץ scripts ב-shell\n# In Claude Code session:\n!____ test -- --run",
      "answer": "npm",
      "hint": "package manager של Node — Claude Code מריץ אותו דרך Bash tool.",
      "explanation": "Claude Code שילוב של LLM + Bash + filesystem tools. npm/git/node — כל אחד נגיש."
    },
    {
      "id": "fill_aidev_chatgpt_001",
      "topicId": "topic_ai_dev",
      "conceptKey": "ai_development::ChatGPT",
      "level": 4,
      "code": "// לפני הדבקה ל-ChatGPT — סנן secrets\nconst safeCode = code.____(/api[-_]?key[-_]?[A-Za-z0-9]+/gi, 'REDACTED');",
      "answer": "replace",
      "hint": "מתודת string שמחליפה pattern בערך אחר.",
      "explanation": "replace(regex, replacement) — sanitize secrets לפני שיתוף עם LLM/log/screenshot."
    }
  ]
};
if (typeof module !== "undefined") module.exports = window.QUESTIONS_SHARD_K;
