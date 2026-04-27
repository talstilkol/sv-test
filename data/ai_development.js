// data/ai_development.js — שימוש נכון ב-AI בפיתוח
// 12 מושגים מרכזיים לעבודת מפתח עם כלי AI ב-2026.
// כל מושג: difficulty (1–10), 6 רמות הסבר, illustration, codeExample, codeExplanation.
// מושגים בקושי >= 6 כוללים extras: moreExamples, pitfalls, practiceQuestions.

var AI_DEVELOPMENT = {
  id: "ai_development",
  title: "שימוש נכון ב-AI בפיתוח",
  description:
    "כיצד מפתח־ת מודרני־ת משלב/ת מודלים ושירותי AI בעבודה היומיומית — כלי IDE, prompts, code review, ומגבלות.",
  concepts: [
    // ─────────────────────── 1. AI (difficulty 4) ───────────────────────
    {
      conceptName: "AI",
      difficulty: 4,
      levels: {
        grandma:
          "AI הוא 'עוזר חכם' במחשב. מקבל בקשה במילים, מחזיר תשובה במילים. הוא לא 'יודע' באמת — הוא משלים מילים בסבירות גבוהה לפי מה שראה באימון.",
        child:
          "תארי לעצמך תוכי שלמד ספריות שלמות. הוא מצליח לחקות ולהמציא משפטים שנשמעים נכון — אבל הוא לא הולך לבדוק אם המספר באמת נכון בעולם האמיתי.",
        soldier:
          "AI = Large Language Model (LLM). מקבל טקסט (prompt), מנבא את המילה הבאה, וחוזר על זה עד שהפלט מסתיים. אין 'הבנה' — יש סטטיסטיקה.",
        student:
          "AI בפיתוח = מודלים גנרטיביים (GPT-4, Claude, Gemini) שמייצרים קוד/טקסט בהינתן prompt. הפלט הוא הסתברותי, תלוי בהקשר ובאקראיות (temperature).",
        junior:
          "כשהתחלתי, חשבתי ש-AI 'יודע' איך לפתור את הבאג שלי. אחרי כמה ימים הבנתי שהוא מנחש לפי patterns — עליי לבדוק כל פלט, להריץ בדיקות, ולא לסמוך עיוור.",
        professor:
          "Transformer-based LLMs predict token distributions over a learned vocabulary. Outputs are sampled (top-k / top-p / temperature) and lack ground-truth verification. Useful for pattern-completion tasks; unreliable for novel domain reasoning without RAG / tools.",
      },
      illustration:
        "🤖 איך LLM עובד (פשטני):\n\n" +
        "  prompt: 'function sum(a,b) { return '\n" +
        "         |\n" +
        "  [Tokenizer] -> [Transformer] -> token probabilities\n" +
        "         |\n" +
        "  next token: 'a' (87%) | 'a+b' (8%) | 'b' (3%) ...\n" +
        "         |\n" +
        "  output: 'a + b; }'\n\n" +
        "  אין הבנה לוגית — רק חיזוי הסתברותי.",
      codeExample:
        "// שימוש בסיסי ב-OpenAI API (Node.js)\n" +
        "import OpenAI from 'openai';\n" +
        "const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });\n\n" +
        "const reply = await client.chat.completions.create({\n" +
        "  model: 'gpt-4o-mini',\n" +
        "  messages: [\n" +
        "    { role: 'system', content: 'You are a concise senior dev.' },\n" +
        "    { role: 'user', content: 'הסבר במשפט אחד מה זה closure.' }\n" +
        "  ],\n" +
        "  temperature: 0.3,\n" +
        "});\n" +
        "console.log(reply.choices[0].message.content);",
      codeExplanation:
        "אנחנו שולחים שני messages: system (התנהגות) + user (השאלה). temperature=0.3 -> תשובה יציבה ופחות יצירתית. הפלט הוא טקסט שלמודל ניבא token-by-token.",
    },

    // ─────────────────────── 2. Cursor (difficulty 5) ───────────────────────
    {
      conceptName: "Cursor",
      difficulty: 5,
      levels: {
        grandma:
          "Cursor הוא עורך קוד שדומה ל-VS Code, אבל יש לו 'חבר AI' שיושב לידו — אפשר לבקש ממנו 'תכתוב לי פונקציה' והוא יציג שינוי שאתה מאשר.",
        child:
          "כמו לכתוב חיבור ב-Word עם 'בוט' שמציע משפטים. את לוחצת Tab כדי לקבל, או Esc כדי לדחות. הבוט מבין את כל הפרויקט, לא רק את השורה.",
        soldier:
          "Cursor = IDE מבוסס VS Code עם הזרקת AI: Cmd+K לעריכה במקום, Cmd+L לצ'אט, Cmd+I ל-Composer (סוכן רב-קבצי). מאנדקס את כל הריפו ל-context אוטומטי.",
        student:
          "Cursor משתמש ב-LLMs מובילים (Claude, GPT-4) ומעטיף אותם ב-IDE: file indexing, diff preview, multi-file edits, ו-rules per project (.cursorrules). מצוין ל-refactor כללי.",
        junior:
          "בעבודה אני משתמש ב-Cmd+K כשאני יודע מה אני רוצה לכתוב, וב-Composer (Cmd+I) כשהשינוי חוצה 5+ קבצים. לפני אישור — קוראים את ה-diff. אסור לסמוך על Tab עיוור.",
        professor:
          "Cursor implements RAG over the local repo with embedding-based retrieval and ranks chunks by relevance to the active file + cursor position. The Composer mode runs an iterative agent loop with file-system tools and produces atomic, reviewable diffs.",
      },
      illustration:
        "קיצורי המקלדת המרכזיים ב-Cursor:\n\n" +
        "  Cmd+K     -> ערוך/כתוב במקום (inline edit)\n" +
        "  Cmd+L     -> פתח Chat (חלון בצד)\n" +
        "  Cmd+I     -> Composer — סוכן רב-קבצי\n" +
        "  @file     -> הוסף קובץ ל-context\n" +
        "  @docs     -> ייבא תיעוד חיצוני (React, MDN)\n" +
        "  Tab       -> קבל הצעת autocomplete\n",
      codeExample:
        "# .cursorrules — הוראות לפרויקט שלך\n" +
        "# Cursor יקרא את הקובץ הזה לפני כל בקשה.\n\n" +
        "- כתוב TypeScript ולא JavaScript. קומפוננטות = .tsx.\n" +
        "- השתמש ב-Tailwind, אסור inline styles.\n" +
        "- כל פונקציה אסינכרונית חייבת try/catch ו-logger.error.\n" +
        "- אל תוסיף תלויות חדשות בלי לבקש אישור.\n" +
        "- בדיקות עם Vitest, לא Jest.\n",
      codeExplanation:
        "קובץ .cursorrules בשורש הפרויקט מנחה את Cursor להתאים את הפלט לקונבנציות שלך. בלעדיו — Cursor יחזור לדפוסים גנריים. עדכן אותו כשמוסיפים תלות או דפוס חדש.",
    },

    // ─────────────────────── 3. Windsurf (difficulty 5) ───────────────────────
    {
      conceptName: "Windsurf",
      difficulty: 5,
      levels: {
        grandma:
          "Windsurf הוא עורך קוד 'אגנטי' — אומרים לו מה אתם רוצים שיקרה ('בנה לי דף התחברות'), והוא מבצע סדרה של פעולות עד שזה עובד. לא רק כותב — גם בודק.",
        child:
          "כמו רובוט עוזר שלא רק מציע — הוא גם הולך, מוציא ספרים מהמדף, פותח אותם, מעתיק, שומר. אתם רק מאשרים בסוף.",
        soldier:
          "Windsurf = IDE של Codeium עם 'Cascade' — סוכן שמריץ tools (קריאת/כתיבת קבצים, terminal, חיפוש), ומבצע משימות מורכבות בכמה צעדים אוטונומיים.",
        student:
          "Windsurf מתחרה ל-Cursor, מתמקד יותר באוטונומיה: ה-agent יכול להריץ tests, לקרוא logs, לבצע git commit. כולל Memory, Workflows, ו-MCP integrations.",
        junior:
          "אני משתמש ב-Windsurf למשימות חוזרות: 'הוסף i18n לכל הקומפוננטות'. הוא הולך קובץ-קובץ, מסיים, מריץ npm test, ומעדכן אותי. תפקידי — לקרוא את ה-diff בסוף.",
        professor:
          "Windsurf's Cascade uses an agentic loop: plan -> tool invocation -> observation -> re-plan, with human-in-the-loop confirmations at write boundaries. Optimized for long-horizon tasks via persistent memory and explicit checkpointing.",
      },
      illustration:
        "Windsurf Cascade — מחזור סוכן:\n\n" +
        "  user: 'הוסף בדיקת תקינות לטופס'\n" +
        "         |\n" +
        "  [PLAN] -> [READ files] -> [PROPOSE diff]\n" +
        "         | (user approves)\n" +
        "  [APPLY] -> [RUN tests] -> [READ output]\n" +
        "         | (failure?)\n" +
        "  [DEBUG] -> [RE-EDIT] -> [RE-RUN] ...\n" +
        "         | (success)\n" +
        "  [SUMMARY]",
      codeExample:
        "// .windsurf/workflows/deploy.md — workflow מקצר\n" +
        "// Windsurf יוכל להריץ אותו כש-agent מבקש /deploy\n" +
        "---\n" +
        "description: deploy to staging\n" +
        "---\n" +
        "1. Run `npm run build` and verify exit 0.\n" +
        "// turbo\n" +
        "2. Run `npm run lint` and verify exit 0.\n" +
        "3. Run `git push origin staging`.\n" +
        "4. Open browser to https://staging.app.com and check logs.",
      codeExplanation:
        "ה-workflow מאפשר למפתח־ת לחסוך הקלדה חוזרת: סדרת צעדים שה-agent של Windsurf מריץ. // turbo מסמן צעד שמותר להריץ אוטומטית בלי אישור.",
    },

    // ─────────────────────── 4. Claude Code (difficulty 6, extras) ───────────────────────
    {
      conceptName: "Claude Code",
      difficulty: 6,
      levels: {
        grandma:
          "Claude Code הוא 'עוזר AI שגר בתוך הטרמינל'. במקום לפתוח ממשק חיצוני, אתם מדברים איתו דרך שורת הפקודה והוא יכול להריץ פקודות במקומכם.",
        child:
          "כמו לדבר ברדיו עם מפקדה: שולחים בקשה, היא מבצעת בלי שום ממשק גרפי. רק טקסט הולך וחוזר.",
        soldier:
          "Claude Code = CLI של Anthropic שמריץ את Claude כסוכן בטרמינל. יודע לקרוא/לכתוב קבצים, להריץ shell, להשתמש ב-MCP tools. עובד מחוץ ל-IDE.",
        student:
          "Claude Code פועל כ-headless agent: מקבל prompt, מתכנן, מבצע, ומדווח. שילוב עם git, scripts, ו-CI הופך אותו ל'מפעל' אוטומציה — לא רק עוזר אישי.",
        junior:
          "הכלי שלי לעבודות 'יבשות': מיגרציה של 30 קבצים, שדרוג גרסה של ספרייה. אני נותן הוראה מדויקת + plan, מאשר תכנית, ומשאיר אותו לרוץ ברקע.",
        professor:
          "Claude Code embodies the Unix philosophy of small composable tools. It exposes /commands, hooks (pre/post tool-use), and a memory file (CLAUDE.md), letting it integrate with shells, tmux panes, and CI pipelines.",
      },
      illustration:
        "Claude Code workflow:\n\n" +
        "  $ claude\n" +
        "  > /init                       (יוצר CLAUDE.md בשורש)\n" +
        "  > 'בנה לי endpoint /users'\n" +
        "    [reading routes/index.ts]\n" +
        "    [writing routes/users.ts]\n" +
        "    [running npm test]\n" +
        "    14 passed\n" +
        "  > /commit\n" +
        "    git commit -m 'feat: add /users'",
      codeExample:
        "# CLAUDE.md — זיכרון פרויקט שClaude Code יקרא תמיד\n" +
        "## Stack\n" +
        "- Node 20, Express 4, Prisma 5\n" +
        "- בדיקות: Vitest. אל תשתמש ב-Jest.\n" +
        "## Convention\n" +
        "- כל endpoint חייב zod validation\n" +
        "- שגיאות -> next(err), אסור res.status(500)\n" +
        "## Commands\n" +
        "- `npm run dev` — שרת מקומי\n" +
        "- `npm run db:reset` — איפוס מסד\n",
      codeExplanation:
        "CLAUDE.md = 'cursorrules' של Claude. הוא נטען ל-context בכל session. ככל שהקובץ ממוקד ועדכני יותר — איכות הפלט עולה דרמטית.",
      extras: {
        moreExamples: [
          {
            code:
              "$ claude -p 'תקן את הטסטים שנכשלים' --allowedTools 'Bash(npm test),Read,Edit'\n" +
              "# headless mode — ללא REPL, מתאים ל-CI",
            explanation:
              "דגל -p מריץ prompt בודד ויוצא. --allowedTools מצמצם הרשאות. שילוב מצוין לאוטומציות CI.",
          },
          {
            code:
              "// .claude/commands/review.md — slash command מותאם\n" +
              "---\n" +
              "description: review the staged diff\n" +
              "---\n" +
              "1. הרץ `git diff --staged`\n" +
              "2. בדוק כל hunk: שגיאות לוגיקה, ביצועים, אבטחה\n" +
              "3. הצע 3 שיפורים — אל תכתוב, רק תציע",
            explanation:
              "Slash commands מתאימים לתבניות חוזרות. Claude קורא את ההוראות ומבצע בדיוק אותן.",
          },
        ],
        pitfalls: [
          {
            mistake:
              "להשאיר את Claude Code לרוץ עם הרשאות מלאות בלי הקראה (auto-approve)",
            why:
              "Claude עלול לבצע rm -rf, לדחוף קוד שגוי לproduction, או למחוק migrations.",
            fix:
              "השתמש ב---allowedTools, הפעל הרשאות לפי משימה, וב-CI הרץ ב-VM/container.",
          },
          {
            mistake: "להתעלם מ-CLAUDE.md ולכתוב את אותן הוראות בכל prompt",
            why:
              "מבזבז tokens, מקבל קונסיסטנטיות נמוכה, ותחזוקה כפולה כל פעם שכלל משתנה.",
            fix:
              "כל כלל פרויקטלי קבוע -> CLAUDE.md. רק כללי משימה ספציפית -> prompt.",
          },
        ],
        practiceQuestions: [
          {
            question: "מה ההבדל בין Claude Code ב-REPL לבין claude -p (headless)?",
            answer:
              "REPL = שיחה אינטראקטיבית, מתאים לפיתוח. -p = הרצה חד-פעמית עם פלט בודד, מתאים ל-scripts ו-CI.",
          },
          {
            question: "למה כדאי לשמור CLAUDE.md בגיט?",
            answer:
              "כל מי שעובד על הפרויקט (אנושי או AI) רואה את אותם כללים, יש היסטוריה, ו-PRs יכולים לעדכן את ההנחיות בצורה reviewable.",
          },
        ],
      },
    },

    // ─────────────────────── 5. ChatGPT (difficulty 4) ───────────────────────
    {
      conceptName: "ChatGPT",
      difficulty: 4,
      levels: {
        grandma:
          "ChatGPT הוא צ'אט שמדבר בעברית/אנגלית. כותבים שאלה, מקבלים תשובה. הוא לא בתוך העורך — אלא באתר/אפליקציה נפרדת.",
        child:
          "כמו וואטסאפ של מורה פרטי שזמין 24/7. שואלים, מקבלים הסבר, יכולים לבקש 'הסבר יותר פשוט'.",
        soldier:
          "ChatGPT = ממשק web/desktop של OpenAI. עובד stateless בכל chat (זוכר רק תוך חלון השיחה). יש Custom GPTs, plugins, ו-Code Interpreter (Python sandbox).",
        student:
          "מתאים לחקר רעיונות, ניסוח טקסטים, debugging של קוד קצר. פחות מתאים לעריכה במקום (אין integration עם הקבצים שלך אלא דרך העלאה ידנית).",
        junior:
          "השימוש שלי: בודק טסטים, מסביר error messages, מנסח README, מציע שמות לפונקציות. כשצריך לעבוד על repo שלם — אני עובר ל-Cursor/Claude Code.",
        professor:
          "ChatGPT exposes a context window (8k–128k tokens depending on tier) without persistent memory across conversations (unless using Memory feature). Best leveraged for ideation, explanation, and stateless code transforms.",
      },
      illustration:
        "ChatGPT vs IDE-AI:\n\n" +
        "  ChatGPT                       Cursor / Windsurf\n" +
        "  - web ui                       - inside IDE\n" +
        "  - copy-paste קוד               - file context auto\n" +
        "  - Code Interpreter             - multi-file edits\n" +
        "  - plugins                      - diff preview",
      codeExample:
        "// פרומפט יעיל ל-ChatGPT עבור debugging:\n" +
        "/*\n" +
        "Role: You are a senior Node.js engineer.\n\n" +
        "Context:\n" +
        "- Express 4, MongoDB via Mongoose\n" +
        "- Error: 'MongooseError: Operation users.findOne() buffering timed out'\n\n" +
        "Code (server.js):\n" +
        "  mongoose.connect(URI);\n" +
        "  app.get('/u/:id', async (req,res) => {\n" +
        "    const u = await User.findOne({ _id: req.params.id });\n" +
        "    res.json(u);\n" +
        "  });\n\n" +
        "Question: למה השגיאה? תן 3 סיבות אפשריות בסדר עדיפות.\n" +
        "*/",
      codeExplanation:
        "פרומפט טוב = role + context + code + שאלה ספציפית עם פלט מצופה ('3 סיבות'). מונע תשובות גנריות וחוסך iterations.",
    },

    // ─────────────────────── 6. Copilot (difficulty 5) ───────────────────────
    {
      conceptName: "Copilot",
      difficulty: 5,
      levels: {
        grandma:
          "Copilot זה 'השלמה אוטומטית חכמה' בעורך. תוך כדי הקלדה הוא מציע את השורה הבאה — אתם לוחצים Tab לקבל או ממשיכים להקליד.",
        child:
          "כמו תזכורת שמופיעה בנייד כשמקלידים: 'אולי התכוונת ל...?'. רק שכאן זה לא רק מילה — זה קטע קוד שלם.",
        soldier:
          "GitHub Copilot = תוסף ל-VS Code/JetBrains. מציע inline completions בזמן אמת, וגם יש Copilot Chat לשיחה. מבוסס OpenAI Codex / GPT-4.",
        student:
          "Copilot מתמחה ב-completion קצר וביצוע מהיר (autocomplete). הוא יותר reactive מ-Cursor (שעושה edits ארוכים). מצוין לקוד boilerplate ו-tests.",
        junior:
          "עובד אצלי בעיקר על שמות משתנים, import statements, וטסטים פשוטים. כשצריך עריכה רב-קבצית — Copilot Workspace עוזר, אבל Cursor חזק יותר.",
        professor:
          "Copilot uses a smaller, faster model for inline completions (low-latency, high-frequency) and a larger model for chat. Acceptance rate metrics drive ongoing fine-tuning of the suggestion ranker.",
      },
      illustration:
        "Copilot inline flow:\n\n" +
        "  אתה מקליד:  function isEven(n) {\n" +
        "  Copilot:    | return n % 2 === 0;   <- הצעה אפורה\n" +
        "             | }\n" +
        "  Tab -> קבל   |  Esc -> דחה  |  Alt+] -> הצעה הבאה",
      codeExample:
        "// טכניקה: שם פונקציה + קומנט = הצעה מדויקת יותר\n" +
        "// formatPhoneIL: מקבל '0501234567' ומחזיר '050-123-4567'\n" +
        "function formatPhoneIL(raw) {\n" +
        "  // Copilot ימלא כאן את הגוף — שם הפונקציה + הקומנט מספקים context\n" +
        "}",
      codeExplanation:
        "ככל שהקונטקסט (שם הפונקציה + קומנט תיאורי + סוגים אם יש) ברור יותר, ההצעות איכותיות יותר. גישה זו נקראת 'docstring-driven coding'.",
    },

    // ─────────────────────── 7. Prompt Engineering (difficulty 7, extras) ───────────────────────
    {
      conceptName: "Prompt Engineering",
      difficulty: 7,
      levels: {
        grandma:
          "Prompt Engineering = 'ניסוח בקשה'. כמו לבקש מילד לעשות שיעורי בית: 'תכין הכל' לא יעבוד, אבל 'תפתור 5 תרגילים בעמ 12, תכתוב כל פתרון בנפרד' — יעבוד מצוין.",
        child:
          "כמו לתת הוראות במשחק 'שמע פקודה': ככל שההוראה ברורה ומפורטת יותר ('זוז שמאלה 3 צעדים, ואז תקפיץ פעמיים') — ככה התוצאה מדויקת יותר.",
        soldier:
          "Prompt = ההוראה ל-LLM. רכיבים: Role + Context + Examples + Task + Output format. כל אחד שמוסיפים — האיכות עולה משמעותית.",
        student:
          "טכניקות מרכזיות: Chain-of-Thought ('think step by step'), Few-shot ('הנה 2 דוגמאות'), Self-Consistency, ReAct (reason+act). בחר טכניקה לפי מורכבות המשימה.",
        junior:
          "הכלל שלי: prompt לא עובד מהפעם הראשונה? אל תוסיף סתם מילים — חשוב מה חסר במבנה. רוב הפעמים זה output format לא ברור או חסרה דוגמה.",
        professor:
          "Prompt Engineering balances information density vs. context window cost. Effective patterns: explicit schema (XML/JSON), delimiters, role-conditioning, example-based instruction (k-shot), and output-driven anchoring (specify the desired form first).",
      },
      illustration:
        "מבנה prompt 'גבוה-איכות':\n\n" +
        "  [ROLE]      You are a senior code reviewer.\n" +
        "  [CONTEXT]   Codebase: React + TS, max line length 100.\n" +
        "  [EXAMPLES]  Good review: 'L23: rename `x` -> `userId` (clarity)'\n" +
        "  [TASK]      Review this diff:\n" +
        "              <diff>...</diff>\n" +
        "  [FORMAT]    Output: JSON [{line, issue, suggestion}]",
      codeExample:
        "// דוגמה ל-bad vs. good prompt\n\n" +
        "// BAD: גנרי, ללא הקשר\n" +
        "const bad = 'תקן לי את הקוד הזה';\n\n" +
        "// GOOD: role + context + format + constraint\n" +
        "const good = `\n" +
        "אתה bug-hunter ב-Node.js.\n\n" +
        "הקוד:\n" +
        "${userCode}\n\n" +
        "מצא עד 3 באגים. החזר JSON:\n" +
        '[{ "line": 0, "bug": "?", "fix": "?" }]\n\n' +
        "אסור: לתקן בלי לציין שורה. אסור: text מחוץ ל-JSON.\n" +
        "`;",
      codeExplanation:
        "ה-prompt הטוב מגדיר תפקיד, נותן את הקוד בתחימה ברורה, מבקש פלט במבנה JSON, ושם אילוצים מפורשים. הפלט קל ל-parse בקוד.",
      extras: {
        moreExamples: [
          {
            code:
              "// Few-shot prompting — דוגמאות לפני המשימה\n" +
              "const prompt = `\n" +
              "Convert function names to kebab-case.\n\n" +
              "Examples:\n" +
              "getUserName -> get-user-name\n" +
              "fetchAllPosts -> fetch-all-posts\n" +
              "isLoggedIn -> is-logged-in\n\n" +
              "Convert: ${userInput}\n" +
              "Output (one word, no explanation):`;",
            explanation:
              "few-shot עוזר למודל לזהות תבנית מדויקת. שימושי כשיש פורמט ספציפי שקשה להגדיר במילים.",
          },
          {
            code:
              "// Chain-of-Thought — תכריח את המודל 'לחשוב'\n" +
              "const prompt = `\n" +
              "באיזו רמת difficulty בין 1-10 המושג Closure?\n\n" +
              "Think step by step:\n" +
              "1. בכמה שיעורים זה מופיע?\n" +
              "2. כמה pre-requisites יש?\n" +
              "3. כמה pitfalls נפוצים?\n" +
              "4. סיכום: difficulty=N\n" +
              "`;",
            explanation:
              "Chain-of-Thought מעלה דיוק במשימות חישוביות/לוגיות. מאפשר גם debug של ההיגיון של המודל.",
          },
        ],
        pitfalls: [
          {
            mistake: "להגיד למודל 'אל תעשה X' בלי להסביר 'תעשה Y במקום'",
            why:
              "LLMs מתקשים ב-negation. 'אל תכתוב הסברים' לבדו — לא יעבוד באופן אמין. עדיף 'החזר רק קוד, ללא טקסט'.",
            fix: "החלף שלילה בהוראה חיובית מפורשת על output format.",
          },
          {
            mistake: "שילוב כל ההוראות בפסקה אחת ארוכה",
            why: "המודל מאבד עקבות. ההוראה הראשונה שולטת, האחרונות מתעלמות.",
            fix:
              "הפרד עם sections ברורים: ROLE, CONTEXT, TASK, FORMAT — כל אחד בכותרת נפרדת.",
          },
          {
            mistake: "לסמוך שהמודל יזכור הקשר 'מההודעה הקודמת'",
            why:
              "כל בקשה ל-API היא stateless. אם לא העברת ב-messages — המודל לא יודע.",
            fix:
              "בכל בקשה — שלח את כל ההיסטוריה הרלוונטית, או השתמש ב-system message לזיכרון קבוע.",
          },
        ],
        practiceQuestions: [
          {
            question: "למה few-shot prompts לרוב מנצחים zero-shot?",
            answer:
              "דוגמאות מוחשיות מצמצמות אי-ודאות לגבי format ו-style. המודל מחקה תבנית במקום לפרש הוראה מילולית.",
          },
          {
            question: "מתי לא להשתמש ב-temperature=0?",
            answer:
              "כשרוצים מגוון פתרונות (brainstorming, יצירת אפשרויות, content). ל-deterministic outputs (קוד, נוסחאות) — temperature נמוך.",
          },
        ],
      },
    },

    // ─────────────────────── 8. AI Pair Programming (difficulty 6, extras) ───────────────────────
    {
      conceptName: "AI Pair Programming",
      difficulty: 6,
      levels: {
        grandma:
          "כמו 'תכנות בזוג' — שני אנשים מול אותו מסך. רק שכאן 'הזוג' שלך הוא AI. אחד כותב, השני בודק ומציע — מתחלפים בתפקידים.",
        child:
          "כמו לעשות עבודות בית עם חבר: אחד פותר, השני בודק, מתחלפים. ה-AI יכול להיות שני התפקידים בו-זמנית.",
        soldier:
          "AI Pair Programming = workflow של מפתח־ת + AI עוזר. שני מצבים מקובלים: Driver-Navigator (אתה כותב, AI מבקר) או הפוך.",
        student:
          "התרגול המקובל: AI מציע — אתה מבקר ומבצע. כל שורה שאתה מקבל בלי הבנה = חוב טכני. הזרימה הטובה ביותר = micro-cycles של 1–5 שורות.",
        junior:
          "אצלי: כשאני 'driver' — אני מקליד, AI מציע completions (Copilot). כשאני 'navigator' — אני מבקש מ-AI לכתוב פונקציה ואני קורא, מבקר, ומריץ tests.",
        professor:
          "AI pair programming reframes the 'two heads' principle: cognitive load distribution, immediate review, and tight feedback loops. Effective when humans retain final authority on architecture, testing, and merge decisions.",
      },
      illustration:
        "שני מצבי Pair Programming עם AI:\n\n" +
        "  Driver Mode (אתה מקליד):\n" +
        "    אתה  -> כותב קוד\n" +
        "    AI   -> מציע completions, מציין שגיאות\n\n" +
        "  Navigator Mode (אתה מנחה):\n" +
        "    אתה  -> 'תכתוב פונקציה ש...' + ביקורת\n" +
        "    AI   -> כותב, אתה reviewer\n\n" +
        "  הכלל: human always merges, AI never auto-merges.",
      codeExample:
        "// מחזור עבודה אופייני (Navigator mode):\n" +
        "// 1. אתה מבקש משימה ממוקדת:\n" +
        "//    'תכתוב function debounce(fn, ms) ב-TS עם types מלאים'\n" +
        "// 2. AI כותב:\n" +
        "function debounce(fn, ms) {\n" +
        "  let t = null;\n" +
        "  return (...args) => {\n" +
        "    if (t) clearTimeout(t);\n" +
        "    t = setTimeout(() => fn(...args), ms);\n" +
        "  };\n" +
        "}\n" +
        "// 3. אתה מבקר: types נכונים? edge cases? memory leaks?\n" +
        "// 4. אתה כותב tests, מריץ, ממזג.",
      codeExplanation:
        "האחריות שלך כ-navigator: למצוא issues שה-AI לא יראה (security, performance, compliance). Tests תמיד שלך, לא של ה-AI.",
      extras: {
        moreExamples: [
          {
            code:
              "// Anti-pattern: 'ship it' בלי לקרוא\n" +
              "// AI כתב 50 שורות, אתה לוחץ approve ו-merge.\n" +
              "// תוצאה: באג ב-production שאתה לא מבין.\n" +
              "// פתרון: review כמו עם human PR — שורה אחר שורה.",
            explanation:
              "AI = team member ש'מהר מדי' לתחזק. אם אתה לא מבין שורה — אסור ל-merge.",
          },
          {
            code:
              "// Pattern: TDD + AI\n" +
              "// 1. אתה כותב test (red)\n" +
              "test('debounce calls fn once after delay', async () => {\n" +
              "  const fn = vi.fn();\n" +
              "  const d = debounce(fn, 50);\n" +
              "  d(); d(); d();\n" +
              "  await new Promise(r => setTimeout(r, 100));\n" +
              "  expect(fn).toHaveBeenCalledTimes(1);\n" +
              "});\n" +
              "// 2. AI ממלא את הקוד עד שה-test עובר (green)\n" +
              "// 3. אתה refactor (clean)",
            explanation:
              "TDD מצמצם את חופש ה-AI: יש מטרה אובייקטיבית. הקוד נכון אם ה-test עובר.",
          },
        ],
        pitfalls: [
          {
            mistake: "להעביר ל-AI את כל החשיבה — 'תחליט אתה'",
            why:
              "אתה מאבד הבנת המערכת, ה-AI מקבל החלטות ארכיטקטוניות שלא מתאימות לפרויקט.",
            fix: "אתה מחליט architecture/API. AI מבצע implementation מ-spec ברור.",
          },
          {
            mistake: "לא להריץ tests אחרי כל סבב AI",
            why:
              "AI עלול לכתוב קוד שעובד למקרה אחד ולא לאחרים, או לשבור fields קיימים בלי לדעת.",
            fix: "כל cycle: AI generates -> run tests -> if fail -> AI fixes -> repeat.",
          },
        ],
        practiceQuestions: [
          {
            question: "למה pair-programming AI לא זהה ל-pair עם ג'וניור אנושי?",
            answer:
              "AI מהיר מאוד, חסר אינטואיציה ארגונית, לא לומד מה-PRs ההיסטוריים שלכם, ולעולם לא ידאג ל-deadline. אתה צריך להיות יותר מבקר.",
          },
        ],
      },
    },

    // ─────────────────────── 9. AI Code Review (difficulty 7, extras) ───────────────────────
    {
      conceptName: "AI Code Review",
      difficulty: 7,
      levels: {
        grandma:
          "כמו לתת לבוט לקרוא את הקוד שלך לפני שאתה שולח לעבודה. הוא ימצא טעויות הקלדה, אזורים מסוכנים, ויציע שיפורים. אבל לא מבטל את הצורך בעיני אדם.",
        child:
          "כמו מורה שעוברת על שיעורי הבית עם עט אדום. רק שזה אוטומטי, מהיר, ועדיין צריך לבדוק שהמורה לא טעתה.",
        soldier:
          "AI Code Review = שימוש ב-LLM לבדיקת diff/PR. מזהה bugs נפוצים, code smells, security issues, ומציע refactors. לא מחליף review אנושי — משלים אותו.",
        student:
          "כלים: GitHub Copilot for PRs, CodeRabbit, Cursor /review, Claude Code /review. כל אחד שולח את ה-diff ל-LLM ומחזיר תגובות inline.",
        junior:
          "תהליך אצלי: AI עובר ראשון על PR, אני קורא את ההערות; 30% רעיונות טובים, 60% noise, 10% פעולות שצריך לבחון. אני סינון אנושי.",
        professor:
          "AI code review excels at pattern detection (null checks, error handling, naming) but lags on architectural critique and domain-specific correctness. Best deployed as a first-pass linter that flags candidates for human review.",
      },
      illustration:
        "AI Code Review pipeline:\n\n" +
        "  1. PR opened -> webhook -> AI service\n" +
        "  2. AI reads diff + nearby code (context)\n" +
        "  3. AI generates inline comments\n" +
        "  4. Human reviewer:\n" +
        "      - resolves valid points\n" +
        "      - dismisses noise\n" +
        "      - adds his own architectural notes\n" +
        "  5. Merge decision = human only.",
      codeExample:
        "# .github/workflows/ai-review.yml\n" +
        "name: AI Code Review\n" +
        "on: { pull_request: { types: [opened, synchronize] } }\n" +
        "jobs:\n" +
        "  review:\n" +
        "    runs-on: ubuntu-latest\n" +
        "    steps:\n" +
        "      - uses: actions/checkout@v4\n" +
        "      - uses: anthropics/claude-code-action@v1\n" +
        "        with:\n" +
        "          prompt: |\n" +
        "            Review the diff focusing on:\n" +
        "            1. Security (XSS, SQL injection, auth)\n" +
        "            2. Error handling (try/catch coverage)\n" +
        "            3. Performance (N+1 queries, blocking I/O)\n",
      codeExplanation:
        "ה-action מריץ Claude על כל PR אוטומטית, עם prompt ממוקד שמחזיר 3 קטגוריות. אנחנו מגדירים את ה-scope — לא נותנים ל-AI 'review הכל'.",
      extras: {
        moreExamples: [
          {
            code:
              "// פרומפט review מצוין (לעבודה ידנית)\n" +
              "const reviewPrompt = `\n" +
              "אתה reviewer מנוסה. בדוק את ה-diff הבא לפי 3 קטגוריות:\n\n" +
              "BLOCKING — באג, אבטחה, breaking change\n" +
              "SUGGEST — שיפור, אבל לא מעכב merge\n" +
              "NIT — סגנון/קוסמטי\n\n" +
              "הערות: שורה אחת ל-line + label + פירוט קצר.\n" +
              "אם הכול תקין — החזר 'LGTM' בלבד.\n\n" +
              "DIFF:\n" +
              "${gitDiff}\n" +
              "`;",
            explanation:
              "סיווג ההערות לפי חומרה מאפשר לתעדף. 'LGTM' אומר ל-AI שמותר לאשר — מונע noise מאולץ.",
          },
        ],
        pitfalls: [
          {
            mistake: "להסתמך על AI review כ-gate יחיד ל-merge",
            why:
              "AI מפספס באגים תלויי-domain, אינטראקציות עם state, ושיקולי product.",
            fix:
              "AI = first pass. Human review = final gate. אסור ל-merge בלי 1 human approval.",
          },
          {
            mistake: "להסכים אוטומטית עם כל הצעת AI",
            why:
              "AI לעיתים מציע 'best practice' שלא מתאים לקונטקסט (e.g. extracting function שיגרום performance regression).",
            fix:
              "כל הצעה — שאל 'האם הקונטקסט הספציפי של הפרויקט תומך בזה?'.",
          },
        ],
        practiceQuestions: [
          {
            question: "מה ההבדל בין AI Linter ל-AI Code Review?",
            answer:
              "Linter (ESLint וכד׳) — כללים דטרמיניסטיים. AI Review — LLM שמבין סמנטיקה ומציע hand-tailored. Linter מהיר וזול, AI Review רחב יותר אבל יקר ועם false-positives.",
          },
          {
            question: "מתי לא להשתמש ב-AI review?",
            answer:
              "PRs קטנטנים (1-2 שורות), שינויים בתשתית sensitive (auth/payments), או כשה-context window לא מכיל את כל הקבצים הרלוונטיים.",
          },
        ],
      },
    },

    // ─────────────────────── 10. AI Limitations (difficulty 6, extras) ───────────────────────
    {
      conceptName: "AI Limitations",
      difficulty: 6,
      levels: {
        grandma:
          "ל-AI יש דברים שהוא פשוט לא יכול: לא רואה את העתיד, לא יודע מה קרה אתמול, ולפעמים בטוח שהוא צודק כשהוא לא. צריך להכיר את הגבולות.",
        child:
          "כמו חבר שלמד הרבה ספרים אבל לא יצא מהחדר. הוא יכול לדבר על המון נושאים, אבל לא יודע מה השעה עכשיו או איך נראה הרחוב.",
        soldier:
          "מגבלות עיקריות: (1) Knowledge cutoff — לא יודע על אירועים אחרי האימון; (2) Hallucinations; (3) Context window סופי; (4) חוסר וודאות שלא מסומנת; (5) דעתנות (bias).",
        student:
          "AI לא 'מבין' — הוא מתאם דפוסים. ל-domain-specific tasks (legal, medical, niche libraries) — הוא חזק להפליא או חלש להפליא, בלי דרך טובה לחזות איזה.",
        junior:
          "כלל זהב: כל פעם ש-AI אומר 'בוודאות' משהו — בדוק. במיוחד כשמדובר ב-versions של ספריות, syntax חדש, או תיעוד API. הוא ממציא קישורים והעתקות.",
        professor:
          "Fundamental limitations of LLMs include: lack of grounding (no world model), distribution shift on novel tasks, sensitivity to prompt phrasing, and the inverse scaling problem on certain reasoning benchmarks.",
      },
      illustration:
        "AI Limitations — מפת סיכונים:\n\n" +
        "  Strong (אמין):           Risky (זהירות):\n" +
        "  - boilerplate            - niche libraries\n" +
        "  - refactor               - current events\n" +
        "  - tests                  - security edge\n" +
        "  - docs                   - performance OPT\n" +
        "  - naming                 - domain logic",
      codeExample:
        "// סימולציה: בדיקה שתפרידי בין מה ש-AI 'יודע' לבין הזיה\n" +
        "async function verifyAIClaim(libName) {\n" +
        "  // 1. בקש מ-AI לציין גרסה\n" +
        "  const aiVersion = await ask(`What's the current version of ${libName}?`);\n\n" +
        "  // 2. תמיד הצלב מול מקור אמת — npm registry\n" +
        "  const real = await fetch(`https://registry.npmjs.org/${libName}/latest`);\n" +
        "  const realVersion = (await real.json()).version;\n\n" +
        "  return {\n" +
        "    aiVersion,\n" +
        "    realVersion,\n" +
        "    matches: aiVersion === realVersion,\n" +
        "  };\n" +
        "}",
      codeExplanation:
        "אסטרטגיית 'verify-then-trust': כל פעם ש-AI נותן fact עם וודאות גבוהה, הצלב עם מקור אמת. לעיתים קרובות הוא טועה במספרי גרסה ובAPIs.",
      extras: {
        moreExamples: [
          {
            code:
              "// 5 דברים ש-AI כמעט תמיד עושה טוב:\n" +
              "// 1. Refactor קיים -> חדש (אותה לוגיקה)\n" +
              "// 2. הסבר קוד קיים\n" +
              "// 3. כתיבת tests לפונקציה קצרה\n" +
              "// 4. תרגום בין שפות תכנות\n" +
              "// 5. Generate README\n\n" +
              "// 5 דברים שב-AI כמעט תמיד 'נשבר':\n" +
              "// 1. versions של ספריות (3 חודשים אחרי cutoff)\n" +
              "// 2. קישורים אמיתיים\n" +
              "// 3. baseline נומרי בלי calculator\n" +
              "// 4. regex מורכב מאוד\n" +
              "// 5. debug של תקלות concurrency",
            explanation:
              "כשמבינים את המפה הזו — חוסכים הרבה זמן. למשימות 'נשברות' — הוסף verification step.",
          },
        ],
        pitfalls: [
          {
            mistake: "להאמין ל-AI על תיעוד API חדש",
            why:
              "אם הספרייה התעדכנה אחרי ה-knowledge cutoff (~6 חודשים), ה-API שמופיע בפלט לא קיים או השתנה.",
            fix:
              "תמיד הצמד dependency version. לדוגמאות חדשות — תן ל-AI לראות את ה-docs (paste-in או RAG).",
          },
          {
            mistake: "לתת ל-AI חישובים מתמטיים מורכבים",
            why:
              "LLMs טוענים שהם יודעים לחשב — בפועל מקבלים תוצאות לא מדויקות מעבר לפעולות הפשוטות.",
            fix:
              "תן ל-AI לכתוב קוד שמחשב, ולא לחשב בעצמו. או הפעל code-interpreter / tool-use.",
          },
        ],
        practiceQuestions: [
          {
            question: "מה זה 'knowledge cutoff' ולמה זה חשוב למפתח־ת?",
            answer:
              "תאריך סיום נתוני האימון. אחרי תאריך זה — המודל לא יודע על שינויים, ספריות חדשות, גרסאות, חדשות. ספריות web/AI מתעדכנות מהר, צריך להצליב.",
          },
          {
            question: "איך תזהה ש-AI 'לא יודע אבל מתחזה'?",
            answer:
              "סימנים: תשובה גנרית מאוד, ערפול ('בדרך כלל', 'ייתכן'), הסתמכות על מקורות שמתחזים אך לא קיימים, וחוסר עקביות בין שאלות סמוכות.",
          },
        ],
      },
    },

    // ─────────────────────── 11. Hallucinations (difficulty 8, extras) ───────────────────────
    {
      conceptName: "Hallucinations",
      difficulty: 8,
      levels: {
        grandma:
          "Hallucination = AI 'ממציא' דברים. בטוח שהוא יודע, נותן לך תשובה שנשמעת רהוטה — אבל היא לא נכונה. כמו בן-אדם שמתבייש לומר 'אני לא יודע'.",
        child:
          "כמו ילד שמשלים סיפור גם כשלא ראה את ההמשך. הוא לא משקר בכוונה — פשוט ממלא את החללים בנחושה שנשמעת הגיונית.",
        soldier:
          "Hallucination = פלט שגוי שנראה אמין. גורמים: low-resource topics, prompts מעורפלים, temperature גבוה, ולחץ לתת תשובה כשאין מידע.",
        student:
          "סוגים: (1) Factual (תאריכים, ציטוטים), (2) Logical (חישובים), (3) Code (APIs לא קיימים, פרמטרים מומצאים), (4) Reference (קישורים שאינם).",
        junior:
          "אצלי: import { someThing } from 'lib' שלא קיים. AI הפיק את שם הפונקציה כי 'זה הגיוני שיהיה כזה'. הפתרון — לא ל-import בלי לבדוק ב-docs/source.",
        professor:
          "Hallucinations stem from autoregressive generation under uncertainty: models prefer fluent continuations over uncertainty signals. Mitigations include retrieval augmentation (RAG), tool-use, calibrated abstention, and post-hoc fact-checking.",
      },
      illustration:
        "Hallucination — דוגמה קלאסית:\n\n" +
        "  user: 'איך להשתמש ב-React.useTransition_v2?'\n" +
        "  AI:   'בטח! React.useTransition_v2 מקבל config object\n" +
        "         עם priority: high | low וחוזר [pending, start].'\n\n" +
        "  זה לא קיים ב-React. הוזיה מלאה.\n" +
        "  הפתרון: לבדוק ב-react.dev לפני שמיישמים.",
      codeExample:
        "// pattern: ratify-before-use לכל import חדש\n" +
        "async function safeImportCheck(pkg, exportName) {\n" +
        "  // 1. בדוק ש-package קיים ב-npm\n" +
        "  const pkgInfo = await fetch(`https://registry.npmjs.org/${pkg}`);\n" +
        "  if (!pkgInfo.ok) {\n" +
        "    throw new Error(`Hallucinated package: ${pkg}`);\n" +
        "  }\n" +
        "  // 2. בדוק שה-export הספציפי קיים\n" +
        "  const meta = await pkgInfo.json();\n" +
        "  const latest = meta['dist-tags'].latest;\n" +
        "  // ... בדוק ב-d.ts או רץ בדיקת import\n" +
        "  console.log(`${pkg}@${latest}: verifying ${exportName}...`);\n" +
        "}",
      codeExplanation:
        "כל פעם שאתה מקבל מ-AI import שלא ראית קודם — הצלב ב-npm registry. עלות: שורה. תועלת: מונע 30 דקות של 'למה זה לא עובד'.",
      extras: {
        moreExamples: [
          {
            code:
              "// 3 סוגי hallucinations נפוצים בקוד:\n\n" +
              "// 1. Hallucinated API\n" +
              "// AI: const data = await fetch(url).asJson();   // .asJson לא קיים\n" +
              "// REAL: const data = await fetch(url).then(r => r.json());\n\n" +
              "// 2. Hallucinated parameter\n" +
              "// AI: setTimeout(fn, 1000, { repeat: true });   // אין repeat\n" +
              "// REAL: setInterval(fn, 1000);\n\n" +
              "// 3. Hallucinated import\n" +
              "// AI: import { magicalHelper } from 'lodash';   // לא קיים\n" +
              "// REAL: import _ from 'lodash'; _.cloneDeep(...);",
            explanation:
              "כל אחד מאלה ייראה קומפיל-clean ב-IDE עד שתריץ. בדיקה: type-check ו-tests חיוניים אחרי כל AI generation.",
          },
          {
            code:
              "// טכניקה: בקש מהמודל לסמן ספק (calibrated abstention)\n" +
              "const prompt = `\n" +
              "ענה על השאלה הבאה.\n" +
              "אם אינך בטוח — החזר 'UNSURE' במקום לנחש.\n" +
              "אם הנושא מאוחר מ-2024-04 — החזר 'OUT_OF_DATE'.\n\n" +
              "Q: מה ה-API החדש של React 19 ל-Server Actions?\n" +
              "`;",
            explanation:
              "הוראה מפורשת לאמירת 'לא יודע' מצמצמת hallucinations. במיוחד יעיל למודלים גדולים (Claude/GPT-4).",
          },
        ],
        pitfalls: [
          {
            mistake: "להעתיק import statements ישר מ-AI בלי בדיקה",
            why:
              "Imports הם המקום הנפוץ ביותר ל-hallucinations — שמות פונקציות שדומות לקיימות אבל לא קיימות.",
            fix:
              "אחרי כל AI generation: הרץ tsc/eslint, וודא שכל imports נפתרים.",
          },
          {
            mistake: "להאמין לציטוטים/קישורים שAI מספק",
            why:
              "Citations and URLs are among the most-hallucinated outputs. הם נראים אמינים (פורמט תקין) אבל לא קיימים.",
            fix:
              "כל קישור — פתח אותו. כל ציטוט — חפש את המקור. אם מקור לא קיים — אל תשתמש בו.",
          },
          {
            mistake: "להשתמש ב-temperature גבוה למשימות factual",
            why:
              "Temperature גבוה מעלה יצירתיות → מעלה גם hallucinations.",
            fix: "למשימות factual — temperature 0-0.3. למשימות יצירתיות — 0.7-1.0.",
          },
        ],
        practiceQuestions: [
          {
            question: "מה זה Retrieval-Augmented Generation (RAG) ולמה זה מקטין hallucinations?",
            answer:
              "RAG = שליפת מסמכים רלוונטיים מ-DB ושילובם ב-prompt. המודל עונה על בסיס המקור הקיים, לא רק מהזיכרון שלו — קל יותר לאמת ופחות הזיות.",
          },
          {
            question: "אם AI יוצר באג חמור עקב hallucination ב-prod, האחריות של מי?",
            answer:
              "המפתח. AI = כלי. כל מה שעובר merge הוא באחריות המפתח שלחץ approve. אסור להאשים את ה-AI — צריך לתחזק תהליך verification.",
          },
        ],
      },
    },

    // ─────────────────────── 12. Context Window (difficulty 7, extras) ───────────────────────
    {
      conceptName: "Context Window",
      difficulty: 7,
      levels: {
        grandma:
          "Context Window = 'הזיכרון לטווח הקצר' של ה-AI. כמה מילים הוא יכול להחזיק בו זמנית. כל הודעה ארוכה יותר — נחתכת בסוף.",
        child:
          "כמו לוח כיתה: יש לו גודל מוגבל. ככל שכותבים יותר — חייבים למחוק את ההתחלה כדי לכתוב המשך.",
        soldier:
          "Context Window נמדד ב-tokens (1 token ~ 0.75 מילה). GPT-4: 128k, Claude: 200k, Gemini: 1M+. הגדול יותר = יותר קוד מותר ב-prompt אחד.",
        student:
          "Context Window כולל: system prompt + history + current message + הפלט הצפוי. ככל שכל אחד גדל — נשאר פחות מקום לשאר.",
        junior:
          "Bug שלמדתי: הוספתי 50 שורות ל-prompt → הפלט נחתך באמצע. הסיבה: ה-output גם נספר ב-window. עברתי לחלק את המשימה ולקבל תוצאה לפי חלקים.",
        professor:
          "Context length affects model performance non-linearly: at 90%+ utilization, attention quality degrades (lost-in-the-middle effect). Effective utilization requires hierarchical summarization, RAG, and prompt compression.",
      },
      illustration:
        "Context Window budget (Claude 200k):\n\n" +
        "  [system prompt]      ~500\n" +
        "  [tool definitions]   ~2,000\n" +
        "  [recent history]     ~10,000\n" +
        "  [current files]      ~50,000\n" +
        "  [user message]       ~1,000\n" +
        "  --------------------------\n" +
        "  used:                ~63,500 / 200,000\n" +
        "  available output:    136,500 tokens",
      codeExample:
        "// Token counting helper\n" +
        "// (Anthropic: ~3.5 chars/token EN, ~5 chars/token HE)\n" +
        "function estimateTokens(text, lang = 'en') {\n" +
        "  const charsPerToken = lang === 'he' ? 5 : 3.5;\n" +
        "  return Math.ceil(text.length / charsPerToken);\n" +
        "}\n\n" +
        "// בדיקה לפני שליחה\n" +
        "function fitsInContext(messages, maxTokens = 200000) {\n" +
        "  const used = messages\n" +
        "    .map(m => estimateTokens(m.content))\n" +
        "    .reduce((a, b) => a + b, 0);\n" +
        "  return used + 4000 < maxTokens; // 4k headroom for output\n" +
        "}",
      codeExplanation:
        "הערכת tokens לפני שליחה מונעת חיתוכים. הכלל: השאר 4000-8000 tokens חופשיים ל-output. אם לא מספיק — קצר היסטוריה או חלק את המשימה.",
      extras: {
        moreExamples: [
          {
            code:
              "// טכניקה: hierarchical summarization\n" +
              "// במקום לשלוח 10 הודעות אחרונות -> שלח summary שלהן\n\n" +
              "async function compressHistory(messages) {\n" +
              "  if (messages.length < 10) return messages;\n\n" +
              "  // קח את 8 הראשונות, סכם אותן\n" +
              "  const old = messages.slice(0, -2);\n" +
              "  const summary = await summarize(old);\n\n" +
              "  // החזר summary + 2 הודעות אחרונות במלואן\n" +
              "  return [\n" +
              "    { role: 'system', content: `Summary of earlier: ${summary}` },\n" +
              "    ...messages.slice(-2),\n" +
              "  ];\n" +
              "}",
            explanation:
              "Compression שומר על המידע החשוב ומבזבז פחות tokens. שימושי בצ'אטים ארוכים.",
          },
          {
            code:
              "// בעיית 'lost in the middle' — מידע באמצע context מוחמץ\n" +
              "// הצב מידע קריטי בתחילת/סוף ה-prompt\n\n" +
              "const prompt = [\n" +
              "  // התחלה: instructions קריטיות\n" +
              "  'You are a code reviewer. Focus on security only.',\n\n" +
              "  // אמצע: context (יכול להישכח חלקית)\n" +
              "  ...allCodeFiles,\n\n" +
              "  // סוף: ה-task הספציפי + reminders\n" +
              "  'Reminder: focus on security only. Now review:',\n" +
              "  diffToReview,\n" +
              "].join('\\n\\n');",
            explanation:
              "Repeating instructions in beginning + end מחזק את ה-attention עליהן. עוזר במיוחד בקבצים גדולים.",
          },
        ],
        pitfalls: [
          {
            mistake: "לדחוף את כל ה-codebase ל-context",
            why:
              "Context גדול = אטחי, יקר, ומפיל את איכות ה-attention. המודל יחמיץ פרטים.",
            fix:
              "השתמש ב-RAG: שלוף רק את הקבצים הרלוונטיים לפי embedding similarity.",
          },
          {
            mistake: "לא להשאיר מקום ל-output",
            why:
              "אם input ממלא 95% מ-context, ל-output יש רק 5% → תשובה נחתכת באמצע.",
            fix:
              "השאר תמיד 20-30% חופשי ל-output. למשימות עם פלט ארוך (refactor רב-קבצי) — חלק לחלקים.",
          },
        ],
        practiceQuestions: [
          {
            question: "מודל עם 200k context — האם תמיד עדיף ממודל עם 8k?",
            answer:
              "לא. context גדול = יקר יותר וגם איטי יותר. לטסקים פשוטים — מודל קטן זול ומהיר. השתמש בגדול רק כשבאמת צריך.",
          },
          {
            question: "מה זה 'lost in the middle' ואיך מתמודדים?",
            answer:
              "תופעה שבה מידע באמצע context מוחמץ. פתרונות: שים מידע חשוב בתחילה+סוף, חזרה על instructions, או חלוקה לכמה הודעות.",
          },
          {
            question: "איך מחשבים tokens ב-Hebrew?",
            answer:
              "עברית 'יקרה' יותר באנקודינג של רוב המודלים — ~5 chars/token לעומת 3-4 באנגלית. השתמש ב-tiktoken (OpenAI) או anthropic-tokenizer לחישוב מדויק.",
          },
        ],
      },
    },
  ],
  quiz: [
    {
      question: "איזה כלי מתאים ל-edits רב-קבציים אוטונומיים עם הרצת tests באוטומציה?",
      options: [
        "ChatGPT — צ'אט בלבד",
        "Copilot — autocomplete",
        "Windsurf Cascade — agentic IDE",
        "כלי שמתעד הוצאות",
      ],
      correct: 2,
      explanation:
        "Windsurf Cascade בנוי כסוכן אוטונומי שיכול להריץ tools (קריאה/כתיבה/terminal) ולעבוד על משימות רב-קבציות עם human-in-the-loop confirmations.",
    },
    {
      question: "מה הסוג הנפוץ ביותר של hallucination בקוד?",
      options: [
        "פונקציה/import שלא קיימים אבל נשמעים סבירים",
        "מספר גרסה ישן",
        "פורמט קוד שגוי",
        "קומנטים בעברית",
      ],
      correct: 0,
      explanation:
        "Hallucinations של APIs ו-imports הן הנפוצות ביותר — המודל יוצר שמות שנשמעים הגיוניים בהתבסס על patterns מדומים.",
    },
    {
      question: "מה לא יקרה אם תחרוג מהקיבולת של context window?",
      options: [
        "תקבל error מ-API",
        "ה-prompt או ה-output ייחתכו",
        "הביצועים יידרדרו (lost in the middle)",
        "המודל ידע יותר",
      ],
      correct: 3,
      explanation:
        "מילוי context window לא הופך מודל ל'יודע יותר' — ההפך, איכות תשומת הלב יורדת. זה מוביל ל-truncation ו-lost-in-the-middle.",
    },
    {
      question: "איזו טכניקת prompt מתאימה כשרוצים פלט בפורמט מאוד ספציפי?",
      options: [
        "Zero-shot עם הוראה ארוכה",
        "Few-shot עם 2-3 דוגמאות",
        "Temperature גבוה",
        "כל ההיסטוריה האפשרית",
      ],
      correct: 1,
      explanation:
        "Few-shot prompting עם דוגמאות קונקרטיות הוא הטכניקה החזקה ביותר ל'נעילה' של פורמט פלט. המודל מחקה את הדפוס.",
    },
    {
      question: "מה ההבדל המרכזי בין Cursor ל-Claude Code?",
      options: [
        "אין הבדל",
        "Cursor הוא IDE גרפי, Claude Code הוא CLI בטרמינל",
        "Cursor יקר יותר",
        "Claude Code לא יודע לכתוב tests",
      ],
      correct: 1,
      explanation:
        "Cursor = עורך מבוסס VS Code עם UI. Claude Code = CLI להפעלה בטרמינל/CI. שתי גישות שונות עם use-cases משלימים.",
    },
    {
      question: "מתי AI Code Review חלש?",
      options: [
        "באגי null check",
        "באגים תלויי-domain ושיקולי product",
        "שמות משתנים גרועים",
        "חוסר try/catch",
      ],
      correct: 1,
      explanation:
        "AI מצוין בזיהוי patterns אבל חסר הבנת domain — לקוח חשוב, business rule, או memory עבר של החלטות צוות. שם human review הכרחי.",
    },
  ],
};
