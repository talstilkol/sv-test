// data/lesson39.js — שיעור 39: Agents + Fine-tuning
// AI מתקדם. מבחן: 4-6 שאלות צפויות.
var LESSON_39 = {
  id: "lesson_39",
  title: "שיעור 39 — AI Agents + Fine-tuning",
  description:
    "AI Agents (autonomous), tool use, ReAct pattern, multi-agent, fine-tuning vs prompting, evaluations.",
  concepts: [
    {
      conceptName: "AI Agent",
      difficulty: 8,
      levels: {
        grandma: "Agent = AI שמבצע משימות לבד — חוקר, מחליט, פועל. כמו עוזר אנושי שמטפל במשימה מורכבת.",
        child: "כמו רובוט עוזר — אתה אומר 'תכין שיעורים', והוא עושה את כל הצעדים בעצמו.",
        soldier: "Agent = LLM + tools + planning loop. Reasoning → Action → Observation → repeat. Goal-oriented.",
        student: "Agent loop: Thought → Action → Observation → repeat until goal. Tools = function definitions LLM can call. Memory = conversation history. Examples: Cursor, Claude Computer Use, AutoGen.",
        junior: "פעם בניתי chat — שאלה ותשובה. ניסיתי agent: 'מצא package.json, בדוק deps, עדכן outdated, צור PR'. עבד! אבל לקח 5 iterations + tool calls. 10x יקר משאלה רגילה.",
        professor: "Agent architectures: ReAct (Reasoning+Action), Plan-and-Execute, Reflection (self-critique), Multi-agent. Frameworks: LangChain Agents, AutoGen, CrewAI, OpenAI Assistants. Risks: cost, latency, infinite loops, hallucinated actions.",
      },
      illustration:
        "🤖 Agent loop:\n  Goal: 'find Python projects with most stars'\n   → Thought: 'I need GitHub API'\n   → Action: search_github(language='Python', sort='stars')\n   → Observation: [list of repos]\n   → Thought: 'Got results'\n   → Final Answer: top 10 repos",
      codeExample:
        "import { generateText, tool } from 'ai';\nimport { openai } from '@ai-sdk/openai';\nimport { z } from 'zod';\n\nconst result = await generateText({\n  model: openai('gpt-4o'),\n  system: 'You are an autonomous research assistant. Use tools to find info.',\n  prompt: 'Find the 3 most starred Python ML libraries on GitHub from 2024.',\n  tools: {\n    searchGithub: tool({\n      description: 'Search GitHub repos',\n      parameters: z.object({\n        query: z.string(),\n        sort: z.enum(['stars', 'forks', 'updated']).optional(),\n        language: z.string().optional(),\n      }),\n      execute: async ({ query, sort, language }) => {\n        const params = new URLSearchParams({ q: query, sort: sort ?? 'stars', language: language ?? '' });\n        const res = await fetch(`https://api.github.com/search/repositories?${params}`);\n        const data = await res.json();\n        return data.items.slice(0, 5).map(r => ({\n          name: r.full_name,\n          stars: r.stargazers_count,\n          description: r.description,\n        }));\n      },\n    }),\n    fetchWebpage: tool({\n      description: 'Fetch a webpage and return text',\n      parameters: z.object({ url: z.string().url() }),\n      execute: async ({ url }) => {\n        const res = await fetch(url);\n        return await res.text();\n      },\n    }),\n  },\n  maxSteps: 10,  // limit iterations\n});\n\nconsole.log(result.text);",
      codeExplanation: "tools array of {description, parameters (zod), execute}. LLM יחליט מתי להשתמש. maxSteps חוסם infinite loops. שילוב tools = capabilities.",
    },
    {
      conceptName: "ReAct pattern",
      difficulty: 8,
      levels: {
        grandma: "תבנית חשיבה ל-AI: לחשוב, לפעול, לראות תוצאה, לחשוב שוב. כמו אדם שפותר תעלומה.",
        child: "צעד-אחר-צעד — חושבים מה לעשות, עושים, רואים מה קרה, אז ממשיכים.",
        soldier: "ReAct = Reasoning + Acting. Thought, Action, Observation cycles. Originally from Princeton paper (2022).",
        student: "ReAct prompt format: 'Thought: ... Action: ... Observation: ...' repeated. LLM generates next step at each turn. Stops on Final Answer or max iterations.",
        junior: "פעם agents שלי לא ידעו 'למה' לפעול. הוספתי 'Thought:' לפני כל Action — quality קפץ. ה-LLM 'מסביר לעצמו' מה הוא עושה.",
        professor: "ReAct (Yao et al., 2022) interleaves Reasoning traces with task-specific actions. Improves over Chain-of-Thought (no actions) and Action-only (no reasoning). Modern LLMs internalize ReAct via tool-use training.",
      },
      illustration:
        "🧠 ReAct cycle:\n  Question: 'capital of France?'\n   Thought: I should search.\n   Action: search('France capital')\n   Observation: 'Paris'\n   Final Answer: Paris",
      codeExample:
        "// ReAct prompt template (manual implementation)\nconst systemPrompt = `\nYou solve problems step by step using this format:\n\nThought: [reasoning about what to do]\nAction: [tool to use, from: search, calculate, lookup]\nAction Input: [input to the tool]\nObservation: [result will be filled in]\n... (repeat as needed)\nThought: [final reasoning]\nFinal Answer: [your answer]\n\nAvailable tools:\n- search(query): web search\n- calculate(expr): math\n- lookup(term): dictionary\n`;\n\n// Modern: AI SDK / LangChain handle ReAct internally\n// You just provide tools — LLM does the loop\nconst result = await generateText({\n  model: openai('gpt-4o'),\n  system: systemPrompt,\n  prompt: 'How many seconds in a leap year?',\n  tools: { calculate: tool({\n    description: 'Math expression',\n    parameters: z.object({ expression: z.string() }),\n    execute: async ({ expression }) => eval(expression),\n  })},\n  maxSteps: 5,\n});\n\n// Output (internal):\n// Thought: A leap year has 366 days. Multiply by 24*60*60.\n// Action: calculate({ expression: '366 * 24 * 60 * 60' })\n// Observation: 31622400\n// Thought: That's the answer.\n// Final Answer: 31,622,400 seconds in a leap year.",
      codeExplanation: "ReAct = Thought→Action→Observation. Modern frameworks ימצאו את זה automatic. בעבר היה צורך לכתוב prompt template ידנית.",
    },
    {
      conceptName: "Multi-agent",
      difficulty: 9,
      levels: {
        grandma: "כמה AI עוזרים שעובדים יחד — אחד חוקר, אחד כותב, אחד עורך. צוות.",
        child: "כמו כיתה של ילדים — אחד מצייר, אחד צובע, אחד מסגרת.",
        soldier: "Multi-agent = several specialized LLMs collaborating. Roles: planner, researcher, writer, critic.",
        student: "Multi-agent systems (CrewAI, AutoGen, LangGraph): specialized agents with distinct roles. Communication patterns: hierarchical (manager → workers), sequential, debate. Better for complex tasks via division of labor.",
        junior: "פעם agent יחיד לכל משימה — מבולבל בקלות. עברתי ל-multi-agent: planner מתכנן, coder כותב, reviewer בודק. quality x2, אבל cost x3.",
        professor: "Multi-agent benefits: specialization, parallel work, explicit roles. Challenges: communication overhead, coordination, cost (N× LLM calls). Frameworks: CrewAI (high-level roles), AutoGen (conversational), LangGraph (graph-based).",
      },
      illustration:
        "👥 Multi-agent team:\n  Manager → Researcher (web search)\n         → Writer (draft article)\n         → Editor (review + improve)\n  Manager assembles final output",
      codeExample:
        "// CrewAI-style (pseudocode)\nimport { Agent, Task, Crew } from 'crewai';\n\nconst researcher = new Agent({\n  role: 'Senior Research Analyst',\n  goal: 'Discover cutting-edge AI developments',\n  backstory: 'You are an expert at web research.',\n  tools: [webSearchTool, scraperTool],\n});\n\nconst writer = new Agent({\n  role: 'Technical Writer',\n  goal: 'Write engaging articles',\n  backstory: 'You craft clear, compelling tech articles.',\n  tools: [],\n});\n\nconst researchTask = new Task({\n  description: 'Research the latest AI developments in 2026',\n  agent: researcher,\n});\n\nconst writeTask = new Task({\n  description: 'Write a 500-word article based on research',\n  agent: writer,\n  context: [researchTask],  // depends on previous\n});\n\nconst crew = new Crew({\n  agents: [researcher, writer],\n  tasks: [researchTask, writeTask],\n  process: 'sequential',\n});\n\nconst result = await crew.kickoff();\n\n// Alternative — LangGraph (state-machine based)\nimport { StateGraph } from '@langchain/langgraph';\nconst workflow = new StateGraph({...});\nworkflow.addNode('research', researchNode);\nworkflow.addNode('write', writeNode);\nworkflow.addNode('review', reviewNode);\nworkflow.addEdge('research', 'write');\nworkflow.addConditionalEdges('write', shouldReview, { yes: 'review', no: END });",
      codeExplanation: "CrewAI = role-based agents + tasks. LangGraph = graph of nodes with conditional edges. multi-agent מתאים למשימות מורכבות, יקר יותר.",
    },
    {
      conceptName: "Fine-tuning",
      difficulty: 8,
      levels: {
        grandma: "אימון מחדש של AI על הנתונים שלך — הוא לומד את הסגנון/ידע הספציפי שלך.",
        child: "כמו ללמד תוכי שירים חדשים — ייקח זמן, אבל בסוף ידע אותם בעל-פה.",
        soldier: "Fine-tuning = continued training on your data. Modifies model weights. Cost + complexity. Alternative: prompting + RAG.",
        student: "Fine-tuning trains on (input, output) pairs. Use cases: domain language, response style, structured output. Cost: $50-5000+ per training. Latency: same as base. NEW Decision: prompt vs RAG vs fine-tune.",
        junior: "רציתי AI שעונה ב-style של החברה. ניסיתי fine-tuning ($500). תוצאה: סבירה, אבל RAG עם few-shot examples נתן 80% של הכא bonus באפס $. אז: prompt+RAG קודם, fine-tune אחרון.",
        professor: "Fine-tuning techniques: LoRA (Low-Rank Adaptation, efficient), Full fine-tuning (expensive). Modern: instruction-tuning, RLHF, DPO. Trade-offs: latency similar, quality up, but maintenance cost high. Prompt engineering + RAG often sufficient.",
      },
      illustration:
        "🎯 Decision tree:\n  Need domain knowledge? → RAG (cheap, accurate)\n  Need specific style/format? → Few-shot prompting first\n  Tried both, still not enough? → Fine-tune (expensive)",
      codeExample:
        "# OpenAI Fine-tuning\nopenai api fine_tunes.create -t training.jsonl -m gpt-4o-mini\n\n# Format: training.jsonl\n{\"messages\": [{\"role\": \"system\", \"content\": \"You are X\"}, {\"role\": \"user\", \"content\": \"Q\"}, {\"role\": \"assistant\", \"content\": \"A\"}]}\n{\"messages\": [...]}\n\n# Use fine-tuned model\nimport OpenAI from 'openai';\nconst openai = new OpenAI();\nconst response = await openai.chat.completions.create({\n  model: 'ft:gpt-4o-mini:my-org:my-fine-tune:abc123',  // your model\n  messages: [{ role: 'user', content: 'Hello' }],\n});\n\n# Decision tree (when to fine-tune):\n# 1. Try few-shot prompting → if works, stop\n# 2. Try RAG with relevant docs → if works, stop\n# 3. Combine prompt+RAG → if works, stop\n# 4. Fine-tune ONLY if:\n#    - Specific style/format hard to instruct\n#    - Latency-sensitive (no time for RAG)\n#    - High volume (RAG retrieval costs add up)\n#    - Have 100+ high-quality training examples\n\n# Cost (rough):\n# - Prompt engineering: $0\n# - RAG: ~$50/month + LLM costs\n# - Fine-tuning: $50-5000 once + slightly higher inference",
      codeExplanation: "Fine-tuning = train on jsonl ofConversations. Format: messages array. ft:model-name לזיהוי. החלטה: prompt → RAG → fine-tune (סדר עלות).",
    },
    {
      conceptName: "Evaluation",
      difficulty: 7,
      levels: {
        grandma: "איך יודעים שה-AI שלך עובד טוב? בודקים על דוגמאות אמיתיות עם נתוני אמת.",
        child: "כמו מבחן בית-ספר — נותנים שאלות, רואים אם התשובות נכונות.",
        soldier: "Evaluation = measure quality. Metrics: accuracy, faithfulness, latency, cost. Eval set = test cases.",
        student: "Eval methodology: (1) build eval set (Q+expected). (2) run model on each. (3) score (auto or human). (4) iterate. Metrics: exact match, semantic similarity, LLM-as-judge, BLEU/ROUGE for summaries, faithfulness for RAG.",
        junior: "פעם 'התחושה היא שזה עובד'. אז גילית באטחה bug ייצור. עכשיו: eval set 50 שאלות עם ground truth. בכל שינוי: run eval. רק עוברים אם score לא ירד.",
        professor: "Evaluation frameworks: LangSmith, Promptfoo, OpenAI evals, ragas (RAG). Metrics: deterministic (exact match), heuristic (BLEU/ROUGE), LLM-judged (faithfulness, relevance, correctness). A/B testing in production.",
      },
      illustration:
        "📊 Eval workflow:\n  build eval set (50 Q+A)\n   ↓\n  run model on each Q\n   ↓\n  score: exact / LLM-judge / human\n   ↓\n  iterate prompts/RAG/fine-tune\n   ↓\n  rerun until quality target",
      codeExample:
        "// Simple eval — exact match\nconst evalSet = [\n  { question: 'What is useState?', expected: 'a hook for managing state' },\n  { question: 'When does useEffect run?', expected: 'after render, with deps' },\n  // ... 48 more\n];\n\nlet correct = 0;\nfor (const test of evalSet) {\n  const answer = await ragChain.invoke(test.question);\n  if (answer.toLowerCase().includes(test.expected.toLowerCase())) {\n    correct++;\n  }\n}\nconsole.log(`Score: ${correct}/${evalSet.length}`);\n\n// LLM-as-judge (more flexible)\nconst judgePrompt = `Compare the answer to the expected.\nQuestion: {question}\nExpected: {expected}\nAnswer: {answer}\n\nIs the answer correct? Reply with: YES, PARTIAL, NO`;\n\nfor (const test of evalSet) {\n  const answer = await ragChain.invoke(test.question);\n  const verdict = await judge.invoke({ ...test, answer });\n  // count YES/PARTIAL/NO\n}\n\n// LangSmith / Promptfoo — production tools\n// promptfoo:\n// promptfoo eval --providers openai:gpt-4o-mini --tests tests.yaml\n\n// LangSmith client\nimport { Client } from 'langsmith';\nconst client = new Client();\nawait client.evaluate(myChain, {\n  data: 'eval-set-v1',\n  evaluators: [llmJudge, exactMatch, latency],\n});",
      codeExplanation: "Eval set = ground truth. Exact match סימפלסטי. LLM-as-judge מאוד גמיש. Promptfoo + LangSmith = professional tools. Track score across iterations.",
    },
  ],
};
