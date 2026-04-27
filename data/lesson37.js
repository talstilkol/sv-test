// data/lesson37.js — שיעור 37: הנדסת AI מעשית — Vercel AI SDK + OpenAI
// נושא חדש בקורס FullStack & AI — דרישת מבחן צפויה: 8-10 שאלות.
var LESSON_37 = {
  id: "lesson_37",
  title: "שיעור 37 — הנדסת AI: Vercel AI SDK + OpenAI",
  description:
    "שילוב LLM באפליקציה: Vercel AI SDK, OpenAI API, streaming, function calling, structured output.",
  concepts: [
    {
      conceptName: "LLM",
      difficulty: 4,
      levels: {
        grandma:
          "LLM = מודל שפה גדול. AI שלמד לדבר על-ידי קריאת מיליארדי מסמכים. ChatGPT, Claude, Gemini — דוגמאות.",
        child:
          "כמו תוכי חכם מאוד שקרא את כל האינטרנט — הוא יכול לענות, לכתוב, ולהציע רעיונות.",
        soldier:
          "Large Language Model. Neural network עצום שמאומן לחזות את המילה הבאה. תוצאת מינוס: שיחה, סיכום, קוד, ניתוח.",
        student:
          "LLM = transformer architecture עם billions of parameters. אומן על כמויות אדירות של טקסט. Inference: input → tokens → forward pass → next-token probability → sampling → output.",
        junior:
          "התחלתי עם ChatGPT דרך הצ'אט בלבד. אחר כך הבנתי: API (gpt-4 / claude-3.5) מאפשר לי לבנות אפליקציות 'חכמות' — chatbot, summarizer, code reviewer. עלות: $0.001-0.01 לקריאה.",
        professor:
          "Foundation models pre-trained on web-scale text. Variants: instruction-tuned (RLHF), chat-tuned, code-specialized, multimodal. Compute scaling laws (Chinchilla): optimal data:params ratio ~20:1.",
      },
      illustration:
        "🤖 LLM stack:\n\n  Provider (OpenAI/Anthropic/Google)\n    ↓\n  SDK (openai-node, anthropic-sdk, vercel/ai)\n    ↓\n  Application (your code)",
      codeExample:
        "// Direct OpenAI SDK\n" +
        "import OpenAI from 'openai';\n" +
        "const openai = new OpenAI();\n" +
        "const response = await openai.chat.completions.create({\n" +
        "  model: 'gpt-4o-mini',\n" +
        "  messages: [{ role: 'user', content: 'מה הבירה של ישראל?' }]\n" +
        "});\n" +
        "console.log(response.choices[0].message.content);",
      codeExplanation:
        "API client מקבל messages array (system/user/assistant), מחזיר completion. zoom: model, max_tokens, temperature, tools.",
    },
    {
      conceptName: "Vercel AI SDK",
      difficulty: 5,
      levels: {
        grandma:
          "ספרייה שמקלה על שילוב AI באתר. במקום ללמוד API של כל ספק (OpenAI, Anthropic, Google) — ממשק אחד.",
        child: "כמו מתאם חשמל אוניברסלי שעובד עם כל מכשיר.",
        soldier:
          "Vercel AI SDK = TypeScript library למיקום LLM באפליקציה. תמיכה ב-streaming, tools, structured output, multi-provider.",
        student:
          "ai npm package (Vercel). Provides: generateText, streamText, generateObject, useChat (React). Abstraction מעל OpenAI, Anthropic, Google, Mistral. Switch provider בקוד אחד.",
        junior:
          "התחלתי לבנות chatbot עם openai SDK ישירות — קוד מאוד מורכב לstreaming + tools. עברתי ל-Vercel AI SDK — useChat hook, streamText, tools = 50% פחות קוד. גם החלפתי מ-OpenAI ל-Anthropic ב-2 שורות.",
        professor:
          "Vercel AI SDK = unified interface for LLM providers. Built on top of native SDKs. Edge Runtime compatible (Cloudflare Workers, Vercel Edge). Streaming via Web Streams API. Tool calling normalized across providers.",
      },
      illustration:
        "📦 Vercel AI SDK:\n\n  generateText  → one-shot text\n  streamText    → streaming text\n  generateObject → structured (zod)\n  useChat (React) → chat UI\n  tool() → function calling",
      codeExample:
        "import { generateText } from 'ai';\n" +
        "import { openai } from '@ai-sdk/openai';\n\n" +
        "const result = await generateText({\n" +
        "  model: openai('gpt-4o-mini'),\n" +
        "  prompt: 'תכתוב הסבר על useState ב-2 משפטים בעברית',\n" +
        "});\n" +
        "console.log(result.text);\n\n" +
        "// החלף ספק:\n" +
        "import { anthropic } from '@ai-sdk/anthropic';\n" +
        "const result2 = await generateText({\n" +
        "  model: anthropic('claude-3-5-sonnet-latest'),\n" +
        "  prompt: '...',\n" +
        "});",
      codeExplanation:
        "generateText מקבל model + prompt, מחזיר {text, usage, finishReason}. החלפת ספק = שינוי שורה אחת.",
    },
    {
      conceptName: "Streaming",
      difficulty: 6,
      levels: {
        grandma:
          "במקום לחכות שה-AI יסיים לכתוב הכל ואז לקבל — מקבלים מילה-מילה כשהיא נכתבת. כמו לראות מישהו מקליד.",
        child:
          "כמו לראות סרטון מתחיל לפני שהורדת אותו במלואו — ככה ChatGPT עובד.",
        soldier:
          "Streaming = SSE (Server-Sent Events) שמחזיר tokens תוך כדי שהמודל מייצר. UX מצוין: 'אני מתחיל לראות תשובה'.",
        student:
          "TTFB (Time To First Byte) של LLM ~500ms-2s. Total time: 5-20s. Streaming = הצגת tokens תוך כדי. Backend: SSE stream. Frontend: ReadableStream / EventSource / useChat.",
        junior:
          "התחלתי עם generateText (one-shot) — המשתמש חיכה 12 שניות בלי משוב. עברתי ל-streamText — TTFB 800ms, המשתמש רואה התקדמות. Bounce rate ירד מ-40% ל-12%.",
        professor:
          "Streaming patterns: token-by-token (SSE), chunked (WebSocket), full-response. Vercel AI SDK uses ReadableStream + StreamingTextResponse. Edge functions critical for low TTFB globally.",
      },
      illustration:
        "🌊 Streaming UX:\n\n  generateText: [empty................][full text]   (12s wait)\n  streamText:   [The...quick...brown...fox....jumps]   (incremental)",
      codeExample:
        "// Server-side (Next.js Route Handler)\n" +
        "import { streamText } from 'ai';\n" +
        "import { openai } from '@ai-sdk/openai';\n\n" +
        "export async function POST(req: Request) {\n" +
        "  const { messages } = await req.json();\n" +
        "  const result = streamText({\n" +
        "    model: openai('gpt-4o-mini'),\n" +
        "    messages,\n" +
        "  });\n" +
        "  return result.toDataStreamResponse();\n" +
        "}\n\n" +
        "// Client-side (React with useChat)\n" +
        "'use client';\n" +
        "import { useChat } from 'ai/react';\n\n" +
        "export default function Chat() {\n" +
        "  const { messages, input, handleInputChange, handleSubmit } = useChat();\n" +
        "  return (\n" +
        "    <div>\n" +
        "      {messages.map(m => <div key={m.id}>{m.role}: {m.content}</div>)}\n" +
        "      <form onSubmit={handleSubmit}>\n" +
        "        <input value={input} onChange={handleInputChange} />\n" +
        "      </form>\n" +
        "    </div>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "Server: streamText + toDataStreamResponse. Client: useChat — מנהל messages + input + submit + streaming. Hot updates של ה-state.",
    },
    {
      conceptName: "Function Calling",
      difficulty: 7,
      levels: {
        grandma:
          "AI יכול לקרוא לפונקציות שלך — 'בדוק מזג אוויר' או 'שלח אימייל'. ה-AI מחליט מתי לקרוא ומה הפרמטרים.",
        child:
          "כמו לתת ל-AI כפתורים בקופסה — כל כפתור עושה משהו אחר. ה-AI יודע מתי ללחוץ.",
        soldier:
          "Function calling / Tools = LLM מחזיר 'תקרא לפונקציה X עם args Y' במקום טקסט. אנחנו מריצים את הפונקציה ומחזירים תוצאה ל-LLM.",
        student:
          "Tool definition: schema (name, description, parameters via zod/JSONSchema). LLM מחזיר tool_calls אם מחליט להשתמש. Loop: tool call → execute → result back → final answer.",
        junior:
          "פעם בניתי chatbot שצריך לבדוק זמינות בקלנדר. עם function calling — AI שואל את ה-API שלי, מקבל זמינים, מציע ב-natural language. בלי functions: AI היה ממציא שעות.",
        professor:
          "Function calling = structured output for procedure invocation. Models trained on JSON schema following (gpt-4-turbo, claude-3.5, gemini-1.5). ReAct pattern: Reasoning + Action loop. Risks: hallucinated parameters, infinite loops (max iterations).",
      },
      illustration:
        "🛠️ Function calling loop:\n\n  user: 'מזג אוויר בתל אביב?'\n  → LLM: 'tool: getWeather(city: TLV)'\n  → app runs getWeather('TLV')\n  → result: {temp: 25, sunny}\n  → LLM with tool result: 'תל אביב 25°, שמשי'",
      codeExample:
        "import { generateText, tool } from 'ai';\n" +
        "import { openai } from '@ai-sdk/openai';\n" +
        "import { z } from 'zod';\n\n" +
        "const result = await generateText({\n" +
        "  model: openai('gpt-4o'),\n" +
        "  tools: {\n" +
        "    getWeather: tool({\n" +
        "      description: 'Get weather for a city',\n" +
        "      parameters: z.object({\n" +
        "        city: z.string().describe('city name in English')\n" +
        "      }),\n" +
        "      execute: async ({ city }) => {\n" +
        "        const data = await fetch(`https://api.weather.com/${city}`);\n" +
        "        return await data.json();\n" +
        "      }\n" +
        "    })\n" +
        "  },\n" +
        "  prompt: 'מה מזג האוויר בתל אביב?',\n" +
        "  maxSteps: 5,\n" +
        "});",
      codeExplanation:
        "tool עם description (LLM מבין מתי להשתמש), parameters (zod schema), execute (הקוד שירוץ). maxSteps מונע infinite loop.",
    },
    {
      conceptName: "Structured Output",
      difficulty: 6,
      levels: {
        grandma:
          "במקום שה-AI יחזיר טקסט חופשי — מבקשים תבנית מובנית: 'תחזיר אובייקט עם name, age, email'.",
        child:
          "כמו לבקש מ-AI למלא טופס קצר במקום לכתוב חיבור.",
        soldier:
          "Structured output = LLM שמחזיר JSON שתואם schema מסוים. שימושי לחילוץ נתונים מטקסט.",
        student:
          "generateObject + zod schema → typed output guaranteed (matches schema). שימושי ל-extraction, classification, structured tasks.",
        junior:
          "פעם ביקשתי מה-LLM JSON ב-prompt. 90% הצליחו, 10% הוא הוסיף 'הנה ה-JSON' לפני, וה-parse נכשל. עם generateObject — תמיד מחזיר JSON תקני, ה-zod מאמת.",
        professor:
          "Constrained decoding (vendor-specific): grammar-based generation. OpenAI: JSON mode + strict mode (response_format). Anthropic: tool use as substitute. Reliability: 99%+ with strict, 95% with prompt-only.",
      },
      illustration:
        "📋 Structured output:\n\n  Free text: 'הוא אומר שהמחיר 250 שקל ויש 3 בצבע אדום'\n  → schema { price: number, color: string, count: number }\n  → { price: 250, color: 'אדום', count: 3 }",
      codeExample:
        "import { generateObject } from 'ai';\n" +
        "import { openai } from '@ai-sdk/openai';\n" +
        "import { z } from 'zod';\n\n" +
        "const { object } = await generateObject({\n" +
        "  model: openai('gpt-4o-mini'),\n" +
        "  schema: z.object({\n" +
        "    name: z.string(),\n" +
        "    age: z.number().int(),\n" +
        "    skills: z.array(z.string()),\n" +
        "    seniority: z.enum(['junior', 'mid', 'senior']),\n" +
        "  }),\n" +
        "  prompt: 'תחלץ פרטים מ: \"טל בן 30, 5 שנות נסיון React/TS, mid-level\"',\n" +
        "});\n" +
        "console.log(object);  // { name: 'טל', age: 30, skills: ['React', 'TS'], seniority: 'mid' }",
      codeExplanation:
        "schema של zod מגדיר את הצורה. generateObject מבטיח התאמה (typed!). useful ל-extraction, classification, semi-structured tasks.",
    },
    {
      conceptName: "RAG",
      difficulty: 8,
      levels: {
        grandma:
          "RAG = AI עם 'ספרייה'. במקום לזכור הכל — מחפש את המידע הרלוונטי בספרייה לפני שעונה.",
        child:
          "כמו לעשות מבחן עם דף עזר — אתה לא זוכר הכל, אבל יכול לחפש.",
        soldier:
          "Retrieval-Augmented Generation = שילוב של חיפוש + LLM. Pipeline: שאלה → חיפוש (vector DB) → context → LLM עם context → תשובה.",
        student:
          "RAG = הפתרון לידע ספציפי שלא אומן ב-LLM (תיעוד פנימי, לקוחות, מסמכים). 4 שלבים: Index (chunks→embeddings→vector DB), Retrieve (query embedding → similarity search), Augment (top-k chunks → context), Generate.",
        junior:
          "פעם רציתי chatbot על תיעוד פנימי. fine-tuning עלה $5K. RAG עלה $50/חודש (Pinecone) ועבד טוב יותר — מצטט את המקורות. עכשיו RAG = ברירת מחדל לידע ספציפי.",
        professor:
          "RAG components: chunker (recursive, semantic), embedder (text-embedding-3-small/large, BGE), vector store (Pinecone/Weaviate/pgvector), retriever (hybrid: vector+BM25), reranker (Cohere/cross-encoder), generator (LLM). Quality factors: chunk size (300-800 tokens), retrieval count (top-5), prompt template.",
      },
      illustration:
        "📚 RAG architecture:\n\n  Documents → chunks → embeddings → Vector DB\n                                       ↓\n  User Q → embedding → similarity → top-5 chunks\n                                       ↓\n                    LLM(context + Q) → Answer + citations",
      codeExample:
        "// Indexing\n" +
        "import { OpenAIEmbeddings } from '@langchain/openai';\n" +
        "import { PineconeStore } from '@langchain/pinecone';\n\n" +
        "const embeddings = new OpenAIEmbeddings();\n" +
        "const store = await PineconeStore.fromDocuments(docs, embeddings, { pineconeIndex });\n\n" +
        "// Retrieval + Generation\n" +
        "const retriever = store.asRetriever(5);\n" +
        "const docs2 = await retriever.invoke(userQuery);\n" +
        "const context = docs2.map(d => d.pageContent).join('\\n');\n\n" +
        "const result = await generateText({\n" +
        "  model: openai('gpt-4o'),\n" +
        "  system: `Answer based ONLY on this context:\\n${context}`,\n" +
        "  prompt: userQuery,\n" +
        "});",
      codeExplanation:
        "Index: docs→embeddings→Pinecone. Query: userQ → 5 chunks הכי דומים → context ל-LLM. ה-system message מבקש לענות רק לפי context.",
      commonMistakes:
        "1) Chunks גדולים מדי → context window. 2) Chunks קטנים מדי → אובדן הקשר. 3) ללא citations → אי אפשר לבדוק. 4) ללא reranking → ירידה באיכות.",
    },
    {
      conceptName: "Agent",
      difficulty: 9,
      levels: {
        grandma:
          "Agent = AI שיכול לעשות פעולות באופן עצמאי. במקום רק לענות — יכול לחפש, להזמין, לשלוח אימייל.",
        child:
          "כמו רובוט עוזר — אתה מבקש 'תזמין לי טיסה לאיטליה ב-15 לחודש' והוא עושה את כל השלבים לבד.",
        soldier:
          "Agent = LLM + tools + planning loop. Reasoning step → action step → observation → repeat. עוצר כשמשימה בוצעה.",
        student:
          "ReAct pattern (Reasoning + Action): Thought → Action → Observation → repeat. Tools = פונקציות זמינות. Memory = שמירת היסטוריה. Examples: Cursor (code agent), Claude Computer Use (UI agent).",
        junior:
          "בניתי agent ראשון שיוצר PR לפי issue. 5 tools: getIssue, readFile, editFile, runTests, createPR. ה-LLM (Claude 3.5) ניתב ביניהם. הצלחה ב-70% מ-issues פשוטים. complexity = 1 חודש בנייה.",
        professor:
          "Agent architectures: ReAct (linear), Plan-and-Execute (hierarchical), Reflection (self-critique), Multi-agent (specialized roles). Frameworks: LangChain Agents, AutoGen, CrewAI. Risks: cost (10x simple chat), latency, infinite loops, hallucinated actions.",
      },
      illustration:
        "🤖 Agent loop (ReAct):\n\n  while not done:\n    Thought: 'I need to know X'\n    Action: tool_call(X)\n    Observation: result\n    → next iteration\n  Final Answer: ...",
      codeExample:
        "// Vercel AI SDK with maxSteps (multi-step agent)\n" +
        "import { generateText, tool } from 'ai';\n" +
        "import { openai } from '@ai-sdk/openai';\n" +
        "import { z } from 'zod';\n\n" +
        "const result = await generateText({\n" +
        "  model: openai('gpt-4o'),\n" +
        "  tools: {\n" +
        "    searchWeb: tool({\n" +
        "      description: 'Search the web',\n" +
        "      parameters: z.object({ query: z.string() }),\n" +
        "      execute: async ({ query }) => await searchAPI(query),\n" +
        "    }),\n" +
        "    sendEmail: tool({\n" +
        "      description: 'Send an email',\n" +
        "      parameters: z.object({ to: z.string(), subject: z.string(), body: z.string() }),\n" +
        "      execute: async (params) => await emailAPI(params),\n" +
        "    }),\n" +
        "  },\n" +
        "  maxSteps: 10,\n" +
        "  system: 'You are an autonomous assistant. Use tools as needed.',\n" +
        "  prompt: 'מצא את המייל של תמיכת AWS ושלח להם אימייל בעברית עם בקשה לעזרה ב-S3 bucket.',\n" +
        "});",
      codeExplanation:
        "tools = הקטלוג. maxSteps = limit ל-iterations (חוסם infinite loop). LLM מחליט בכל step מה לעשות עד שמשימה הסתיימה.",
    },
    {
      conceptName: "Embeddings",
      difficulty: 7,
      levels: {
        grandma:
          "טקסט הופך ל-וקטור של מספרים שמייצג את ה'משמעות'. שני טקסטים דומים = וקטורים קרובים.",
        child:
          "כמו לתת לכל מילה 'טביעת אצבע' ייחודית. מילים דומות = טביעות דומות.",
        soldier:
          "Embedding = vector (1536 numbers בdefault) שמייצג טקסט. נוצר ע\"י model. דמיון = cosine similarity.",
        student:
          "Embedding model (text-embedding-3-small, 1536 dim) מייצר וקטור per chunk. Cosine similarity → 0 (לא קשור) ל-1 (זהה). Use cases: semantic search, classification, clustering, RAG.",
        junior:
          "פעם השוויתי טקסטים עם string match — איטי ולא מדויק. עברתי ל-embeddings: 'איך לבטל הזמנה' תפס גם 'cancel order' וגם 'reverse purchase'. semantic > syntactic.",
        professor:
          "Embeddings encode semantic meaning in dense vectors. Models: OpenAI text-embedding-3 (small/large), BGE (multilingual), Cohere. Dimensions vs quality tradeoff. Storage: HNSW index (Pinecone), pgvector (Postgres). Distance: cosine (default), euclidean, dot product.",
      },
      illustration:
        "🔢 Embedding example:\n\n  'מלך' → [0.21, -0.05, 0.83, ...]\n  'מלכה' → [0.20, -0.04, 0.81, ...]  ← קרוב!\n  'גזר'  → [0.91, 0.13, -0.22, ...]   ← רחוק",
      codeExample:
        "import { openai } from '@ai-sdk/openai';\n" +
        "import { embed } from 'ai';\n\n" +
        "// Single embedding\n" +
        "const { embedding } = await embed({\n" +
        "  model: openai.embedding('text-embedding-3-small'),\n" +
        "  value: 'איך לבטל הזמנה?',\n" +
        "});\n" +
        "// embedding: number[1536]\n\n" +
        "// Cosine similarity\n" +
        "function cosine(a, b) {\n" +
        "  const dot = a.reduce((s, x, i) => s + x * b[i], 0);\n" +
        "  const magA = Math.sqrt(a.reduce((s, x) => s + x*x, 0));\n" +
        "  const magB = Math.sqrt(b.reduce((s, x) => s + x*x, 0));\n" +
        "  return dot / (magA * magB);\n" +
        "}",
      codeExplanation:
        "embed מחזיר וקטור ל-1536 numbers. cosine מודד דמיון: 1=זהה, 0=ניצב, -1=הפוך. ב-RAG, מחפשים top-k עם cosine הכי גבוה.",
    },
  ],
};
