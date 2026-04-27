// data/lesson35.js — שיעור 35: AI for Devs — Cursor + Windsurf
// AI-Assisted IDEs. מבחן: 4-6 שאלות צפויות.
var LESSON_35 = {
  id: "lesson_35",
  title: "שיעור 35 — AI לכלי פיתוח — Cursor + Windsurf",
  description:
    "Cursor (AI-first IDE), Windsurf (Cascade), Copilot. Prompt engineering, agent mode, code review with AI.",
  concepts: [
    {
      conceptName: "Cursor",
      difficulty: 5,
      levels: {
        grandma: "Cursor = VS Code עם AI מובנה. אתה כותב מה אתה רוצה, הוא כותב את הקוד.",
        child: "כמו עוזר חכם שיושב לידך — אתה אומר 'תוסיף כפתור', הוא מוסיף.",
        soldier: "Cursor = AI-first IDE based on VS Code. Tab autocomplete, Cmd+K (inline edit), Cmd+L (chat), Composer (multi-file).",
        student: "Cursor IDE: AI integration deep. Models: GPT-4, Claude 3.5, custom. Features: tab completion (predict next edit), inline edit (Cmd+K), chat panel (codebase aware), agent mode (multi-file changes).",
        junior: "פעם Copilot autocomplete — שורה-שורה. עברתי ל-Cursor — הוא מבין כל הפרויקט, עושה refactor של 10 קבצים יחד. velocity x3.",
        professor: "Cursor leverages context: open files, semantic search via embeddings, recent edits. Tab predicts multi-line edit including jumps. Agent mode (Composer) executes multi-step plans with tool use.",
      },
      illustration:
        "⚡ Cursor features:\n  Tab → predict next edit\n  Cmd+K → inline edit selection\n  Cmd+L → chat with codebase\n  Composer → multi-file agent",
      codeExample:
        "# Cursor shortcuts\n# Tab → accept AI prediction (or Cmd+→)\n# Cmd+K → 'inline edit'\n#   - select code → Cmd+K → 'extract to function' → done\n# Cmd+L → 'chat'\n#   - 'why does this fail?'\n#   - '@codebase find auth logic'\n#   - '@docs/react useState'\n# Cmd+I → Composer (agent)\n#   - 'add a logout button to navbar that calls /api/logout'\n#   - works across multiple files\n\n# .cursorrules — project-specific instructions\n# - Use TypeScript strict mode\n# - No 'any' types — use unknown then narrow\n# - Functional React components only\n# - Tests with Vitest, not Jest\n# - DB queries via Drizzle ORM\n\n# שימוש in chat: '@codebase' references your code\n# 'where is the user login flow?'  → AI searches your code",
      codeExplanation: ".cursorrules מנחה את ה-AI לסטנדרטים שלך. @codebase, @file, @docs מאפשרים context. Tab/Cmd+K/Cmd+L/Cmd+I = 4 main interaction modes.",
    },
    {
      conceptName: "Windsurf Cascade",
      difficulty: 6,
      levels: {
        grandma: "Windsurf = IDE מתחרה ל-Cursor. Cascade = מצב agent — הוא מבצע משימות מורכבות לבד.",
        child: "כמו לקבל עוזר שעושה כל משימה לבד — 'תכין שיעורים', והוא מכין.",
        soldier: "Windsurf by Codeium. Cascade mode = agentic — multi-step planning, codebase-wide changes, terminal access.",
        student: "Windsurf IDE. Cascade is an autonomous agent mode. Features: real-time codebase awareness, predictive edits, terminal commands, file edits. Multi-step task decomposition.",
        junior: "פעם משימה: 'add user analytics across the app'. במקום לעשות 10 צעדים ידנית — Cascade עושה את הכל: install packages, edit files, run migrations.",
        professor: "Windsurf Cascade uses planning + tool use loop. Tools: file edit, terminal, search, git. Memory: persists across sessions per workspace. Comparable to Cursor Composer + autonomous execution.",
      },
      illustration:
        "🌊 Windsurf Cascade:\n  user: 'add Stripe payment to checkout page'\n   → Cascade plans steps:\n     1. install @stripe/stripe-js\n     2. edit checkout.tsx\n     3. add /api/checkout endpoint\n     4. update env.ts schema\n   → executes each step\n   → reports progress",
      codeExample:
        "# Windsurf usage examples\n\n# Cascade — autonomous task\n# 'Refactor all useState hooks to useReducer for the cart state'\n# → Cascade:\n#   1. Searches codebase for useState matching 'cart'\n#   2. Designs reducer\n#   3. Updates each file\n#   4. Updates tests\n#   5. Runs npm test to verify\n\n# Inline edit — focused\n# Cmd+I (Windsurf) — context: open file\n# 'add error handling with toast'\n\n# Codebase chat\n# 'where is the auth middleware?'\n# 'how does the user profile flow work end-to-end?'\n\n# Memories — per-workspace\n# Cascade remembers: tech stack, conventions, recent decisions\n# Across sessions — saves time on repeated context",
      codeExplanation: "Cascade = agent mode. Inline = focused edits. Codebase chat = exploration. Memories = persistent context. Comparable to Cursor with focus on multi-step.",
    },
    {
      conceptName: "GitHub Copilot",
      difficulty: 4,
      levels: {
        grandma: "Copilot = AI שמשלים שורה הבאה בקוד שלך. הראשון מסוג זה.",
        child: "כמו אוטו-קומפליט חכם של תיאום מילים — אבל לקוד שלם.",
        soldier: "GitHub Copilot = inline AI completion. תיקון shortcut: Tab. תומך ב-VS Code, JetBrains.",
        student: "Copilot suggests inline as you type. Powered by Codex/GPT-4. Chat mode (Copilot Chat). Works in VS Code, JetBrains, Neovim, Visual Studio. Copilot Workspace (preview): full task agent.",
        junior: "Copilot היה first — האטוקומפליט מצוין. אבל קונטקסט מוגבל לקובץ. עברתי ל-Cursor — מבין את כל הפרויקט.",
        professor: "Copilot uses Codex (GPT-derived). Pipeline: cursor context + nearby files → completion. Privacy: code may be sent to model (configurable). Enterprise: code does not train models.",
      },
      illustration: "👨‍✈️ Copilot:\n  type → Tab to accept inline suggestion\n  Cmd+I → Copilot Chat\n  /explain, /fix, /tests — slash commands",
      codeExample:
        "// Copilot inline (you type, AI suggests)\nfunction calculateTax(income, country) {\n  // [GHOST TEXT — Copilot suggests:]\n  if (country === 'IL') return income * 0.17;\n  if (country === 'US') return income * 0.21;\n  // [Tab to accept]\n}\n\n// Copilot Chat\n// /explain — explain selected code\n// /fix — suggest a fix\n// /tests — generate tests\n// /docs — add documentation\n// @workspace — codebase context\n// /new — create new project\n\n// Comments as instructions\n// 'parse a CSV string into objects, headers in row 0'\nfunction parseCsv(input) {\n  // Copilot writes the implementation\n}",
      codeExplanation: "Inline ghost text → Tab. /explain, /fix, /tests slash commands. כותב comment כ-instruction → AI ממש את זה. @workspace ל-codebase context.",
    },
    {
      conceptName: "Prompt Engineering",
      difficulty: 6,
      levels: {
        grandma: "אומנות לשאול את ה-AI נכון — ככל שהשאלה ברורה ומדויקת, התשובה טובה יותר.",
        child: "כמו לבקש מאמא לעוגה — 'עוגת שוקולד עם אגוזים, גודל בינוני' עדיף על 'עוגה'.",
        soldier: "Prompt engineering = composing instructions to LLMs for best output. Specificity, examples, role.",
        student: "Effective prompts: clear role, specific task, examples (few-shot), constraints, output format. Patterns: zero-shot, few-shot, chain-of-thought, ReAct.",
        junior: "פעם שאלתי: 'תיקן את הבאג'. תשובה: כללית. עכשיו: 'התקן TypeScript error TS2339 ב-user.service.ts:42, השתמש ב-strict null check'. תשובה: ספציפית, מדויקת.",
        professor: "Prompt patterns: role priming ('You are X'), structured output (JSON schema), chain-of-thought ('think step by step'), few-shot examples. Anti-patterns: vague requests, leading questions.",
      },
      illustration:
        "🎯 Prompt anatomy:\n  Role: 'You are a senior React developer'\n  Task: 'Refactor this component to use React Query'\n  Constraints: 'Maintain TypeScript types, no any'\n  Format: 'Show only the changed code'",
      codeExample:
        "# ❌ Bad prompt\n'fix this'\n\n# ✅ Good prompt\n'Fix the TypeError on line 42 of user.service.ts.\nThe issue: user object can be null but we access user.email directly.\nUse optional chaining and provide a fallback empty string.\nMaintain existing type signature.'\n\n# ✅ Few-shot example\n'Convert these JS functions to TypeScript with strict types.\n\nExample:\nINPUT: function add(a, b) { return a + b; }\nOUTPUT: function add(a: number, b: number): number { return a + b; }\n\nNow convert:\nfunction multiply(a, b) { return a * b; }\nfunction greet(name) { return `Hello, ${name}!`; }'\n\n# ✅ Chain-of-thought\n'Solve this step by step:\n1. Read the requirements\n2. Identify the data structures needed\n3. Write the function signature\n4. Implement the logic\n5. Add tests\n\nRequirement: Build a function that finds the most frequent word.'",
      codeExplanation: "Specific > vague. Role priming מפעיל context. Few-shot עם examples = הכי אפקטיבי. Chain-of-thought לבעיות מורכבות.",
    },
    {
      conceptName: ".cursorrules / AGENTS.md",
      difficulty: 5,
      levels: {
        grandma: "קובץ הוראות לכלי AI — הוא קורא אותו ומשתמש בסטנדרטים שלך.",
        child: "כמו שפה משותפת עם החבר החדש — אומר לו את הכללים של הבית.",
        soldier: ".cursorrules (Cursor), .windsurfrules (Windsurf), AGENTS.md (universal). מנחה AI לסטנדרטים.",
        student: "Project-level AI instructions. Specifies: tech stack, code style, naming conventions, libraries to use/avoid. Reduces hallucinations + enforces consistency.",
        junior: "פעם AI הציע MUI כש-project כבר ב-Tailwind. שיניתי .cursorrules ל-'Use only Tailwind, no MUI/Chakra'. הצעות עכשיו consistent.",
        professor: "Persistent context for code agents. Best practices: tech stack, anti-patterns, project conventions. Influences in-context reasoning. Future: standard format (AGENTS.md proposal) for cross-tool compatibility.",
      },
      illustration: "📋 .cursorrules:\n  Tech: TS, React, Tailwind, Drizzle\n  Conventions: arrow functions, named exports\n  Avoid: any, default exports, MUI",
      codeExample:
        "# .cursorrules (project root)\n\n# Stack\n- TypeScript strict mode (no 'any', use 'unknown' + narrowing)\n- React 19 functional components only\n- Tailwind CSS for styling (no inline styles, no CSS modules)\n- Drizzle ORM for DB (no Prisma, no TypeORM)\n- Vitest for tests (no Jest)\n\n# Conventions\n- Named exports preferred over default\n- Arrow functions for components and handlers\n- Path aliases: @/components, @/lib, @/hooks\n- Hebrew variable names allowed for domain-specific\n\n# Tests\n- One test file per source file (foo.ts → foo.test.ts)\n- AAA pattern (Arrange, Act, Assert)\n- No mocking unless absolutely needed (prefer InMemory implementations)\n\n# Avoid\n- Default exports (only for Next.js pages)\n- ENUM (use union types: 'admin' | 'user')\n- Class components\n- styled-components (Tailwind only)\n\n# Style\n- Files: kebab-case (user-profile.tsx)\n- Components: PascalCase\n- Hooks: camelCase, prefix 'use'\n- Constants: SCREAMING_SNAKE_CASE",
      codeExplanation: ".cursorrules בroot — Cursor קורא אוטומטית. AGENTS.md universal (Cursor, Windsurf, Aider). מגדיר standards. AI מחיל אוטומטית.",
    },
  ],
};
