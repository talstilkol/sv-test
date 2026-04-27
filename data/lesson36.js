// data/lesson36.js — שיעור 36: Bolt + AI Helpers (docs, tests)
// AI tools למפתחים. מבחן: 4-5 שאלות צפויות.
var LESSON_36 = {
  id: "lesson_36",
  title: "שיעור 36 — Bolt + AI Helpers — Prototyping, Docs, Tests",
  description:
    "Bolt.new לפרוטוטיפים, AI לתיעוד, AI ליצירת tests, hallucination control.",
  concepts: [
    {
      conceptName: "Bolt.new",
      difficulty: 5,
      levels: {
        grandma: "Bolt.new = אתר שיוצר אפליקציה שלמה מתיאור טקסט. אתה כותב 'אתר טופס יצירת קשר', מקבל קוד מוכן.",
        child: "כמו לבקש 'תכין לי פיצה' ולקבל אותה מוכנה — אבל זה אפליקציה.",
        soldier: "Bolt.new by StackBlitz. Browser-based AI coding. Full project scaffolding from prompt. Live preview, deploy.",
        student: "Bolt.new = AI codegen + WebContainers (browser-side Node.js). Prompt → full repo. Includes: package.json, source files, tests, deployment. Edit live in browser.",
        junior: "הצורך בpoc 24 שעות לטיפול ב-MVP חדש. Bolt: 'react app with login + dashboard'. תוך דקות — POC עובד. שיפצתי שם — saved 4 hours.",
        professor: "Bolt.new uses Claude/GPT for codegen + WebContainers (in-browser Node runtime by StackBlitz). No server-side execution. Limitations: not for backend-heavy apps, complex DB.",
      },
      illustration:
        "⚡ Bolt.new flow:\n  prompt: 'todo app with React + Tailwind'\n   → Claude generates full project\n   → opens in browser editor\n   → live preview\n   → deploy to Netlify/Vercel",
      codeExample:
        "# Usage examples\n\n# Prompt 1 — initial scaffolding\n'Create a React + TypeScript todo app with:\n- Tailwind for styling\n- localStorage persistence\n- add/edit/delete/complete actions\n- filter by status (all/active/completed)\n- mobile-friendly'\n\n# → Bolt creates: 8 files, runs npm install, shows preview\n\n# Prompt 2 — iterative\n'add a dark mode toggle in the header'\n# → Bolt edits relevant files, preserves rest\n\n# Prompt 3 — deploy\n'deploy this to Netlify'\n# → Bolt runs build, deploys, shows URL\n\n# Best for:\n# - Quick prototypes\n# - Frontend-heavy apps\n# - Demo to stakeholders\n# - Boilerplate generation\n\n# Not great for:\n# - Backend-heavy (limited Node features in browser)\n# - DB-driven apps\n# - Production-ready code (review essential)",
      codeExplanation: "Bolt.new = prompt → working app. WebContainers מאפשר Node בדפדפן. Iterative prompting. מצוין ל-prototypes, weak ל-production.",
    },
    {
      conceptName: "AI for documentation",
      difficulty: 4,
      levels: {
        grandma: "AI כותב לך תיעוד לקוד — מסביר מה כל פונקציה עושה, איך להשתמש.",
        child: "כמו עוזר שכותב 'הוראות שימוש' למה שבנית.",
        soldier: "AI מייצר JSDoc, README, API docs מהקוד. מהיר ויסודי.",
        student: "AI for docs: function docstrings, README, API reference, architecture diagrams. Tools: Cursor /docs, Copilot Chat /docs, Mintlify, Cody.",
        junior: "פעם פרויקטים שלי = קוד בלבד, README ריק. עם AI: 5 דקות = README מקצועי. JSDoc על כל פונקציה. onboarding של מפתחים חדשים = קל.",
        professor: "AI-generated docs face accuracy challenges. Best practice: AI suggests, human reviews. Continuous: integrate into CI (e.g., LLM checks docstring quality). Tools: Mintlify Doc Writer, Swimm, Cody.",
      },
      illustration:
        "📝 AI docs workflow:\n  code → AI analyzes → JSDoc/README/API ref\n   → human reviews\n   → commit\n   → repeat per change",
      codeExample:
        "// ❌ Without AI — minimal docs\nexport function calculateTax(income, country) {\n  if (country === 'IL') return income * 0.17;\n  return income * 0.21;\n}\n\n// ✅ With AI assistance — JSDoc\n/**\n * Calculates the income tax based on country.\n *\n * @param income - The gross income amount in local currency.\n * @param country - ISO country code ('IL' or 'US').\n * @returns The calculated tax amount.\n *\n * @example\n * calculateTax(100000, 'IL'); // 17000\n * calculateTax(50000, 'US');  // 10500\n *\n * @throws {Error} If country is not supported.\n */\nexport function calculateTax(income: number, country: 'IL' | 'US'): number {\n  if (country === 'IL') return income * 0.17;\n  if (country === 'US') return income * 0.21;\n  throw new Error(`Unsupported country: ${country}`);\n}\n\n// Cursor: select function, Cmd+K → 'add JSDoc'\n// Copilot Chat: /docs\n// Mintlify VS Code extension: highlight → write doc",
      codeExplanation: "AI מייצר JSDoc מקיף עם @param, @returns, @example, @throws. Cursor /docs, Copilot /docs, Mintlify — כלים פופולריים.",
    },
    {
      conceptName: "AI for tests",
      difficulty: 5,
      levels: {
        grandma: "AI מייצר בדיקות לקוד שלך — חוסך שעות.",
        child: "כמו שמייצר חידות אוטומטית לתוצאה — וגם פותר אותם בעצמו.",
        soldier: "AI מייצר test cases — happy path, edge cases, error cases.",
        student: "AI test generation: from function/component → unit tests, integration tests. Coverage: edge cases AI לא תמיד תופס. Best as starting point.",
        junior: "פעם 30% test coverage. עם AI: select function → /tests → 5-10 tests. coverage קפץ ל-80%. גם edge cases שלא חשבתי עליהם.",
        professor: "AI-generated tests should be reviewed: may miss domain-specific edge cases, may invent assertions. Mutation testing helps validate test quality. AI is amplifier, not replacement.",
      },
      illustration:
        "🧪 AI tests flow:\n  function code → AI →\n    happy path tests\n    edge cases (null, empty, boundary)\n    error cases (throws, rejects)\n   → human review + add domain-specific",
      codeExample:
        "// Source: userService.ts\nexport function calculateDiscount(price: number, isVIP: boolean): number {\n  if (price < 0) throw new Error('Negative price');\n  if (price === 0) return 0;\n  const baseDiscount = isVIP ? 0.2 : 0.1;\n  return price * baseDiscount;\n}\n\n// AI generated tests (Cmd+K → 'add tests' or Copilot /tests)\nimport { describe, it, expect } from 'vitest';\nimport { calculateDiscount } from './userService';\n\ndescribe('calculateDiscount', () => {\n  it('gives 10% to regular users', () => {\n    expect(calculateDiscount(100, false)).toBe(10);\n  });\n\n  it('gives 20% to VIP users', () => {\n    expect(calculateDiscount(100, true)).toBe(20);\n  });\n\n  it('returns 0 for free items', () => {\n    expect(calculateDiscount(0, true)).toBe(0);\n  });\n\n  it('throws on negative price', () => {\n    expect(() => calculateDiscount(-10, false)).toThrow('Negative price');\n  });\n\n  it('handles decimal prices', () => {\n    expect(calculateDiscount(99.99, false)).toBeCloseTo(9.999);\n  });\n});\n\n// Human review: add domain-specific tests\nit('rounds to 2 decimals (business requirement)', () => {\n  expect(calculateDiscount(99.99, false)).toBe(10);\n});",
      codeExplanation: "AI מייצר happy path + edge + errors. תמיד review — domain knowledge חסר. שילוב: AI = 70%, human = 30%.",
    },
    {
      conceptName: "Hallucination control",
      difficulty: 7,
      levels: {
        grandma: "AI לפעמים ממציא דברים שלא קיימים — פונקציה דמיונית, ספרייה לא אמיתית. צריך לבדוק.",
        child: "כמו ילד שממציא סיפור שלא קרה — נשמע אמין, אבל לא נכון.",
        soldier: "Hallucination = AI מייצר מידע לא נכון בטון בטוח. תיקון: verify, ground in real docs.",
        student: "LLM hallucinations: invent functions, libraries, APIs. Solutions: RAG (ground in real docs), structured output (zod), TS strict (compile catches), code execution (verify), human review.",
        junior: "פעם AI הציע const fs = require('fs-extra-pro') — ספרייה לא קיימת. הסכמתי, npm install נכשל, בזבזתי שעה. עכשיו: בדיקה בכל suggestion חיצוני (npm view).",
        professor: "Hallucinations = LLMs generate plausible-but-false outputs. Mitigations: RAG (retrieval before generation), grounding ('only use these docs'), self-consistency (multiple samples), tool use (verify via search/execute), constrained decoding (JSON schema).",
      },
      illustration:
        "🚨 Hallucination detection:\n  AI suggests: import { magic } from 'fake-lib'\n   → npm view fake-lib? doesn't exist\n   → AI hallucinated\n  AI suggests: array.flat() in IE11\n   → MDN check? Not supported pre-ES2019\n   → AI hallucinated context",
      codeExample:
        "# Strategies to control hallucinations\n\n# 1. TypeScript strict — compile catches\nimport { foo } from 'lib';   # if 'foo' doesn't exist → TS error\n\n# 2. Run code immediately\n# AI generated: pkg.someMethod()\n# Run → 'pkg.someMethod is not a function'\n# → Hallucinated\n\n# 3. RAG — ground in real docs\n# 'Use the official Next.js 14 docs to answer:\n#  How do I create a server action?'\n# → AI uses retrieved docs only, not memory\n\n# 4. Structured output (zod)\nconst schema = z.object({ packageName: z.string() });\nconst result = schema.parse(aiOutput);\n// AI must conform to schema\n\n# 5. Verification step\n'Generate code, then verify each import exists in package.json'\n\n# 6. Cross-reference\n'Show me the actual Next.js docs URL for this API'\n# → If can't provide URL → likely hallucinated\n\n# 7. Human review\n# Especially for security, data manipulation, prod code",
      codeExplanation: "Hallucinations = AI ממציא בטון בטוח. Mitigations: TS strict, run code, RAG, structured output, verification, human review. Critical ל-prod.",
    },
    {
      conceptName: "AI Code Review",
      difficulty: 6,
      levels: {
        grandma: "AI עובר על הקוד שלך ומציע שיפורים — לפני שאתה דוחף ל-prod.",
        child: "כמו מורה שמתקנת את החיבור לפני שאתה מגיש.",
        soldier: "AI כ-pair reviewer — bugs, security, performance, conventions. השלמה ל-human review.",
        student: "AI code review: pre-PR check (CodiumAI, GitHub Copilot Reviews), GitHub PR bots (Cursor, Greptile). Identifies: bugs, security issues, style violations. Best as first-pass.",
        junior: "פעם review ידני = שעה לכל PR. עם CodiumAI: 30 שניות first-pass — מוצא bugs פשוטים. הreviewer האנושי focused על architecture/business logic.",
        professor: "AI code review augments not replaces human. Catches: surface bugs, common security (SQLi, XSS), naming issues. Misses: business logic correctness, architectural fit. Best in CI as first gate.",
      },
      illustration:
        "🔍 AI Code Review:\n  PR opened\n   → AI bot comments:\n     - line 42: SQL injection risk\n     - line 89: missing null check\n     - line 120: better naming\n   → human reviewer focused on architecture",
      codeExample:
        "# Tools\n# - CodiumAI / Codium PR Reviewer\n# - GitHub Copilot Code Reviews (preview)\n# - Cursor Bug Bot\n# - Greptile\n# - Cubic AI\n\n# Cursor command\n# Cmd+K → 'review this code for bugs and improvements'\n\n# In Cursor chat:\n# 'review my last commit. Look for: bugs, security, performance, naming'\n\n# Self-review prompt:\n'You are a senior reviewer. Review this code:\n[paste code]\n\nCheck for:\n1. Bugs and edge cases\n2. Security issues (SQL injection, XSS, CSRF)\n3. Performance (N+1 queries, unnecessary loops)\n4. Code smells (long functions, duplicated logic)\n5. Naming and clarity\n6. Test coverage gaps\n\nFormat: list each issue with severity (P0/P1/P2) and suggested fix.'\n\n# CI integration (e.g., CodiumAI)\n# .github/workflows/pr-review.yml\nname: AI Review\non: pull_request\njobs:\n  review:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: Codium-ai/pr-agent@main\n        with:\n          openai_key: ${{ secrets.OPENAI_KEY }}\n          github_token: ${{ secrets.GITHUB_TOKEN }}",
      codeExplanation: "AI review = first-pass automated. Tools: CodiumAI, Greptile, Copilot Reviews. Self-review prompts גם עובדים. CI integration לכל PR. תמיד עם human review.",
    },
  ],
};
