// data/lesson_ai_engineering.js
// SVCollege Finish Line 1 - Practical AI Engineering bridge lesson.

var LESSON_AI_ENGINEERING = {
  id: "lesson_ai_engineering",
  title: "AI Engineering - OpenAI, Vercel AI SDK, RAG ו-Agents",
  description:
    "איך בונים פיצ'ר AI אמיתי באפליקציית Full Stack: בחירת מודל, prompt, streaming, structured output, embeddings, RAG, tools, agents, guardrails ו-evaluation.",
  svcollegeModule: "הנדסת AI מעשית - Vercel AI SDK, OpenAI, LangChain, RAG, Agents, Fine-tuning",
  sourceAssets: [],
  sourceCoverageNote:
    "מודול SVCollege דורש בניית יכולות AI בתוך מוצר Full Stack. מקור שיעור AI Engineering מקומי ייעודי הוא unknown/unavailable, לכן זהו bridge עצמאי שמכסה את פער הקוריקולום.",
  concepts: [
    {
      conceptName: "OpenAI API",
      difficulty: 5,
      simpleExplanation:
        "OpenAI API הוא שירות backend שמקבל בקשה עם הוראות וקלט, מריץ מודל, ומחזיר טקסט, JSON, embeddings או קריאה לכלי.",
      levels: {
        grandma:
          "OpenAI API זה כמו לטלפן למומחה ולשאול אותו: 'תסביר לי את זה'. הוא מקבל את השאלה — ועונה. אבל אסור לתת לאחרים את מספר הטלפון שלו (API key).",
        child:
          "כמו לשלוח מכתב למורה החכם בעולם — הוא קורא, חושב, ושולח תשובה. ה-API key הוא הכתובת שלך; אם הולכים לאיבוד, מישהו אחר יכול לשלם בשמך.",
        soldier:
          "OpenAI API: HTTPS endpoint. POST + JSON body, Authorization: Bearer KEY. endpoints: /chat/completions, /responses, /embeddings, /moderation. SDK: openai npm package. ALWAYS server-side.",
        student:
          "API surface: Responses API (modern), Chat Completions (legacy), Assistants (stateful), Realtime (WebRTC voice). Streaming via SSE. Rate limits per org/key. Pricing per 1M input/output tokens. Models: gpt-4o, gpt-4o-mini, o1, o3 — different cost/latency/quality.",
        junior:
          "Production rules: 1) Server-only — never expose key to browser. 2) Backend proxy עם rate limiting (Upstash/Redis). 3) Per-user budgets בDB. 4) Retry on 429 (exponential backoff). 5) Timeout (60s default — adjust). 6) Fallback model if primary fails. 7) Audit log all calls. 8) Sanitize user input before sending.",
        professor:
          "OpenAI API exposes large language models via REST/SSE protocols. Authentication uses bearer tokens; rate limiting employs leaky-bucket algorithms. The provider abstraction (OpenAI, Anthropic, Google) drives multi-provider strategies; portability requires shared interfaces (AI SDK, LangChain). Cost optimization involves prompt caching, response caching, and intelligent model routing based on task complexity.",
      },
      whyFullStack:
        "מפתח Full Stack צריך לדעת לשים את הקריאה בצד שרת, לשמור את המפתח ב-env, ולהחזיר ללקוח רק את התוצאה המותרת.",
      codeExample:
        "import OpenAI from 'openai';\n\nconst client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\nconst result = await client.responses.create({\n  model: process.env.OPENAI_MODEL,\n  input: 'סכם את ההודעה לתלמיד בשורה אחת'\n});",
      codeExplanation:
        "הלקוח נוצר בשרת עם API key מהסביבה. הבקשה שולחת model ו-input ומקבלת response מהמודל.",
      commonMistake:
        "לקרוא ל-API ישירות מהדפדפן ולחשוף את OPENAI_API_KEY למשתמשים.",
      prerequisite: "lesson_devops_deploy::environment variables",
    },
    {
      conceptName: "Vercel AI SDK",
      difficulty: 5,
      simpleExplanation:
        "Vercel AI SDK היא שכבת עזר ל-Next/Node שמפשטת generate, stream, tool calls ו-structured output מול ספקי AI.",
      levels: {
        grandma:
          "Vercel AI SDK זה כמו מתאם תקעים אוניברסלי: לא חשוב לאיזה ספק AI אתה מתחבר — אותו תקע. במקום ללמוד כל ספק בנפרד, יש interface משותף.",
        child:
          "כמו שלט עם כפתורים שעובדים לכל טלוויזיה — לא חשוב Sony או LG. AI SDK מדבר עם OpenAI, Anthropic, Google דרך אותו קוד.",
        soldier:
          "Vercel AI SDK (@vercel/ai): functions generateText, streamText, generateObject, streamObject, tool. providers: @ai-sdk/openai, @ai-sdk/anthropic, @ai-sdk/google. UI hooks: useChat, useCompletion. integrates with React Server Components.",
        student:
          "AI SDK = provider-agnostic abstraction. core/UI split: ai (server) + ai/react (hooks). Streaming via Server-Sent Events + native streams. Tool calling unified across providers. structured output via Zod schemas. observability via OpenTelemetry hooks.",
        junior:
          "Real life: 1) useChat hook מטפל בstate management של chat — saves hours. 2) toolInvocation rendering: render tool calls בUI. 3) generateObject + zod schema = guaranteed shape. 4) provider switching trivial — אבל models אחרים = behaviors שונים, test! 5) onFinish callback ל-DB save + analytics. 6) streamText backpressure: don't drop chunks.",
        professor:
          "The Vercel AI SDK abstracts LLM provider APIs behind a unified TypeScript interface, reducing vendor lock-in at the SDK layer. The streaming abstraction multiplexes tool calls, text deltas, and metadata over a single stream — implementing the AI SDK Protocol (ASP). Comparable to LangChain in scope but more opinionated and React-integrated; trade-offs around extensibility vs ergonomics.",
      },
      whyFullStack:
        "היא נותנת API נוח ל-route handlers ול-React UI, במיוחד כשצריך streaming chat בלי לכתוב plumbing ידני.",
      codeExample:
        "import { streamText } from 'ai';\nimport { openai } from '@ai-sdk/openai';\n\nexport async function POST(request) {\n  const { messages } = await request.json();\n  const result = streamText({ model: openai(process.env.OPENAI_MODEL), messages });\n  return result.toDataStreamResponse();\n}",
      codeExplanation:
        "route handler מקבל messages, מפעיל streamText ומחזיר response זורם ללקוח.",
      commonMistake:
        "להשתמש ב-SDK בצד לקוח במקום בצד שרת, או לשכוח לטפל בשגיאות ובמגבלות קצב.",
      prerequisite: "lesson_nextjs::route handler",
    },
    {
      conceptName: "LangChain",
      difficulty: 6,
      simpleExplanation:
        "LangChain היא ספריית orchestration שמחברת prompt, model, parser, retrieval ו-tools לשרשראות עבודה.",
      levels: {
        grandma:
          "LangChain זה כמו פס ייצור: התחלה — חומר גלם, בסוף — מוצר מוגמר. בכל שלב משהו מתבצע. אם רוצים לשנות שלב — לא צריך לבנות פס מחדש.",
        child:
          "כמו שרשרת בייצור עוגה: ערבוב, אפייה, קישוט, אריזה. כל אחד יודע מה לעשות. LangChain שרשר שלבים בעבודה עם AI.",
        soldier:
          "LangChain.js: Runnables (composable units), pipe operator. components: PromptTemplate, ChatModel, OutputParser, Retriever, Tool, AgentExecutor. integrations רבים: Pinecone, Weaviate, Pgvector, Redis. LangSmith לobservability.",
        student:
          "LangChain abstractions: LCEL (LangChain Expression Language) — declarative chains via .pipe(). Runnable interface unified. RunnableSequence, RunnableParallel, RunnableBranch לcomposition. Memory: BufferMemory, SummaryMemory, VectorStoreMemory. Agents: ReAct, OpenAIFunctions, Plan-and-Execute.",
        junior:
          "מהשטח: 1) LangChain heavy — vs Vercel AI SDK lighter. בחר לפי scope. 2) LangSmith debugging הציל בעיות nondeterministic. 3) Tool definition ב-Zod schema → typed args. 4) Memory in production = DB-backed, NOT in-process. 5) Agents = unpredictable cost — set max_iterations + budget. 6) Output parsers → fallback if model deviates.",
        professor:
          "LangChain implements composition patterns over LLM operations: chains (sequential), agents (cyclic with planning), and graphs (LangGraph for stateful workflows). The framework abstracts prompt engineering, retrieval, memory, and tool use. Critique: high abstraction overhead vs direct API; LangGraph's state machine model addresses agent reliability concerns. Alternatives: Haystack, LlamaIndex (RAG-focused), DSPy (declarative).",
      },
      whyFullStack:
        "כשפיצ'ר AI גדל מעבר לקריאה אחת למודל, צריך דרך מסודרת להרכיב שלבים, להחליף רכיבים ולבדוק אותם.",
      codeExample:
        "const chain = prompt.pipe(model).pipe(parser);\nconst answer = await chain.invoke({ question: userQuestion });",
      codeExplanation:
        "ה-chain מעביר את הקלט דרך prompt, אחר כך model, ואז parser שמחזיר מבנה נוח לקוד.",
      commonMistake:
        "להוסיף orchestration כבדה בשביל פעולה פשוטה שאפשר לבצע בקריאה אחת ברורה.",
      prerequisite: "lesson_ai_engineering::OpenAI API",
    },
    {
      conceptName: "model selection",
      difficulty: 5,
      simpleExplanation:
        "model selection היא החלטה איזה מודל מתאים למשימה לפי איכות, latency, עלות, context window ויכולת tool/JSON.",
      levels: {
        grandma:
          "model selection זה כמו לבחור כלי לעבודה: לדפוק מסמר — פטיש. לחתוך עץ — מסור. לא משתמשים בפטיש לכל דבר. לכל משימה יש מודל מתאים.",
        child:
          "כמו לבחור עפרון: עפרון רגיל לכתיבה, צבע לציור, מחק לתיקון. כל אחד טוב במשהו אחר. אם משלמים על עפרון יוקרתי לציור פשוט — בזבוז.",
        soldier:
          "Tiers: 1) Light/cheap (gpt-4o-mini, claude-haiku, gemini-flash) — quick tasks. 2) Mid (gpt-4o, claude-sonnet, gemini-pro) — most cases. 3) Heavy/reasoning (o1, o3, claude-opus) — complex reasoning. choice based on: latency, cost, quality, capabilities (vision, JSON, tools).",
        student:
          "Selection criteria: 1) Task type — classification (cheap), generation (mid), reasoning (heavy). 2) Latency budget — Realtime needs < 1s. 3) Token cost × volume. 4) Context window — 128K-2M depending on model. 5) Capabilities — vision, audio, function calling, JSON mode. 6) Region/data residency. 7) Open-source: Llama, Mistral, Qwen — self-host trade-offs.",
        junior:
          "Real decisions: 1) Default to mini/haiku — escalate if quality insufficient. 2) Eval on real prompts before commit. 3) Routing — classify task, route to suitable model. 4) Latency vs quality — UI streams hides slowness. 5) Reasoning models (o1) — slower, no streaming, costlier. 6) Provider redundancy — Anthropic + OpenAI fallback. 7) Track per-task cost in observability.",
        professor:
          "Model selection involves multi-objective optimization across cost, latency, quality, and capability dimensions. Pareto frontier defines the trade-off surface. Routing strategies: static (per-task), dynamic (classifier-based), or learned (RouterLLM). Mixture-of-experts at deployment level: cheap model proposes, expensive model verifies. Cost-aware routing reduces production spend by 60-80% in typical workloads.",
      },
      whyFullStack:
        "בחירת מודל לא נכונה יכולה להפוך מוצר לאיטי, יקר או לא מדויק, גם אם הקוד תקין.",
      codeExample:
        "const modelForTask = task.kind === 'fast-summary'\n  ? process.env.OPENAI_FAST_MODEL\n  : process.env.OPENAI_REASONING_MODEL;",
      codeExplanation:
        "הקוד בוחר מודל לפי סוג משימה במקום לקבע מודל אחד לכל המערכת.",
      commonMistake:
        "להשתמש תמיד במודל החזק ביותר גם למשימות פשוטות, ואז לשלם ב-latency ועלות.",
      prerequisite: "lesson_devops_deploy::environment variables",
    },
    {
      conceptName: "prompt messages",
      difficulty: 4,
      simpleExplanation:
        "prompt messages הם ההוראות והקלט שנשלחים למודל: תפקיד, כללים, הקשר, שאלה ופורמט תשובה.",
      levels: {
        grandma:
          "prompt messages זה כמו לתת הוראות לאחות: 'תהיה סבלנית, תדברי בעברית פשוטה, ואל תיתני שמות תרופות מסוכנות'. ככה היא יודעת איך לענות לחולים.",
        child:
          "כמו להגיד לחבר לפני משחק: 'אני שחקן, אתה מאמן, ואסור להעיף את הכדור החוצה'. כללים ברורים = משחק טוב. prompt = הוראות למודל.",
        soldier:
          "Roles: system (rules, persona), user (question/input), assistant (previous answers — conversation history), tool (tool call results). order matters. system first. multiple user/assistant for multi-turn.",
        student:
          "Anatomy: 1) Role/persona ('You are a helpful Hebrew tutor'). 2) Constraints ('Answer in 2 sentences max'). 3) Format ('Return JSON: { answer, sources }'). 4) Examples (few-shot). 5) Context (relevant info). 6) Question. Order from least to most variable. Prompt versioning = code; track changes.",
        junior:
          "מציאות: 1) ALWAYS separate system from user — security (prompt injection mitigation). 2) Test prompts on edge cases — empty, hostile, multilingual. 3) Few-shot beats zero-shot for structured tasks. 4) XML-like tags עוזרים: <context>, <question>. 5) Don't mix instructions with data — escape user input. 6) A/B test prompts in production with metrics.",
        professor:
          "Prompt engineering operates on the principle of in-context learning (Brown et al., 2020). The prompt provides the model with task framing without parameter updates. Patterns: zero-shot, few-shot, chain-of-thought (Wei 2022), tree-of-thoughts. Prompt injection is a security concern (OWASP LLM01); mitigation requires layered defenses: input sanitization, system prompt isolation, output validation.",
      },
      whyFullStack:
        "Prompt הוא חלק מהקוד. הוא צריך להיות עקבי, ניתן לבדיקה, ולא לערבב נתוני משתמש עם הוראות מערכת בלי גבולות.",
      codeExample:
        "const messages = [\n  { role: 'system', content: 'ענה בעברית קצרה וברורה.' },\n  { role: 'user', content: userQuestion }\n];",
      codeExplanation:
        "system מגדיר התנהגות כללית, user מכיל את בקשת המשתמש.",
      commonMistake:
        "לשים את כל הכללים בתוך הודעת user ולא להפריד בין הוראות מערכת לקלט משתמש.",
      prerequisite: "lesson_ai_engineering::OpenAI API",
    },
    {
      conceptName: "structured output",
      difficulty: 6,
      simpleExplanation:
        "structured output הוא מצב שבו מבקשים מהמודל להחזיר JSON לפי schema במקום טקסט חופשי.",
      levels: {
        grandma:
          "structured output זה כמו לבקש שיענו לך בטופס מסודר ולא בסיפור: שם, גיל, טלפון. ככה את יכולה להעתיק לטבלה בלי לקרוא חמש פסקאות.",
        child:
          "כמו טופס בבית-הספר: שורה לשם, שורה לכתובת. אסור לכתוב 'קוראים לי דנה ואני גרה' באמצע. structured output = תשובה בטופס, לא בכתב חופשי.",
        soldier:
          "structured output methods: 1) JSON mode (OpenAI: response_format: json_object). 2) Function calling (schema-defined). 3) Strict structured output (response_format: json_schema with strict). 4) AI SDK generateObject + Zod. validates client-side too.",
        student:
          "JSON Schema validation: model receives schema + must conform. Strict mode (OpenAI 2024): grammar-constrained decoding — guaranteed valid output. Pre-strict era: validate + retry. Zod → JSON Schema conversion automatic in AI SDK. Errors: schema mismatch = retry with feedback. Type safety end-to-end via Zod inference.",
        junior:
          "Real wins: 1) generateObject + Zod = no parsing errors. 2) Strict mode prevents hallucinated fields. 3) Discriminated unions לbranching: { type: 'success' | 'error', ... }. 4) Optional fields with defaults. 5) Refinements: z.string().email() — validation beyond shape. 6) Don't trust model on date strings — parse + validate. 7) Failure handling: schema validation fail → retry with error message in prompt.",
        professor:
          "Structured outputs constrain decoding via grammar-based methods (e.g., outlines, jsonformer) or schema-aware fine-tuning (OpenAI's strict mode). The constraint reduces hallucination at the structural level, ensuring parser compatibility. Trade-offs: latency increase (constrained sampling), potential quality reduction in heavily constrained outputs. The pattern enables type-safe LLM integration into typed languages, bridging probabilistic generation and deterministic systems.",
      },
      whyFullStack:
        "קוד צריך נתונים צפויים. JSON לפי schema מאפשר validation, שמירה ב-DB והצגה ב-UI בלי parsing שביר.",
      codeExample:
        "const expectedShape = {\n  title: 'string',\n  weakConcepts: ['string'],\n  nextAction: 'string'\n};",
      codeExplanation:
        "ה-shape מתאר מה הקוד מצפה לקבל, ואז אפשר לבדוק שכל שדה קיים לפני שימוש.",
      commonMistake:
        "לבקש 'תחזיר JSON' אבל לא לאמת את התוצאה לפני שמשתמשים בה.",
      prerequisite: "lesson_11::object",
    },
    {
      conceptName: "streaming response",
      difficulty: 5,
      simpleExplanation:
        "streaming response מחזיר תשובה בהדרגה במקום לחכות שכל הטקסט יהיה מוכן.",
      levels: {
        grandma:
          "streaming זה כמו לראות סדרה פרק-פרק במקום לחכות שכל הסדרה תיגמר. רואים מתחילים — ממשיך כל הזמן. לא מחכים שעה ריקה.",
        child:
          "כמו שמורה כותבת את התשובה על הלוח אות-אות — ולא מסתירה עד שגומרת. streaming = רואים את התשובה בונה-על-עצמה.",
        soldier:
          "streaming via SSE (Server-Sent Events) או chunked transfer encoding. AI SDK: streamText, useChat. each chunk = delta. accumulate בclient. UI: render כסטטוס loading + text growing.",
        student:
          "SSE protocol: text/event-stream Content-Type, data: chunks separated by \\n\\n. Browser EventSource API. AI SDK abstraction: Data Stream protocol multiplexes text + tool calls + metadata. Backpressure: control flow. Cancellation: AbortController. ReadableStream API native.",
        junior:
          "Production: 1) Edge runtime לlow-latency streams. 2) Don't buffer entire stream server-side. 3) Token-by-token UI = perceived speed. 4) Handle disconnect — save partial response if needed. 5) Throttle UI updates (60fps cap) — too-frequent setState lags. 6) Final message stored complete in DB, not chunks. 7) onChunk callback ל-token counting.",
        professor:
          "Streaming HTTP responses leverage chunked transfer encoding (HTTP/1.1) or HTTP/2 framing. SSE provides automatic reconnection and event IDs. The pattern decouples generation latency from time-to-first-token. Modern bidirectional alternatives: WebSocket, WebTransport, HTTP/3. The Vercel AI SDK's Data Stream Protocol multiplexes structured events (text deltas, tool calls, errors) over the stream, enabling rich client UIs.",
      },
      whyFullStack:
        "ב-chat או tutor, streaming מוריד תחושת המתנה ומאפשר UI שמגיב מהר.",
      codeExample:
        "const result = streamText({ model, messages });\nreturn result.toDataStreamResponse();",
      codeExplanation:
        "השרת פותח response זורם, והלקוח מציג chunks כשהם מגיעים.",
      commonMistake:
        "לערבב streaming עם פעולות שחייבות JSON מלא וסופי בלי parser מתאים.",
      prerequisite: "lesson_nextjs::route handler",
    },
    {
      conceptName: "token budget",
      difficulty: 5,
      simpleExplanation:
        "token budget הוא ניהול כמות הקלט והפלט שהמודל מעבד, כי כל הודעה, מסמך ותשובה צורכים tokens.",
      levels: {
        grandma:
          "token budget זה כמו תקציב חשמל: אסור להשאיר את כל האורות דולקים תמיד. כל מילה במודל עולה כסף. צריך לבחור מה חשוב לכלול.",
        child:
          "כמו ארנק עם דמי כיס: יש סכום, ואם תוציא יותר — נגמר. tokens זה הכסף של ה-AI; כל מילה עולה. אסור לבזבז.",
        soldier:
          "tokens ≈ 4 chars (English), ≈2 chars (Hebrew/code). pricing per 1M input/output tokens. context window = max input+output. count: tiktoken (OpenAI), tokenizers per model. budget = context_window - max_output - safety_margin.",
        student:
          "Token economics: input tokens cheaper than output. cached input even cheaper (OpenAI prompt caching, Anthropic prefix caching). Strategies: 1) compress context (summarization). 2) RAG — retrieve only relevant chunks. 3) prompt caching for repeated system prompts. 4) max_tokens limit on output. 5) tokenize before sending to verify fit.",
        junior:
          "מהשטח: 1) prompt caching = 50-90% savings on repeated prefixes. 2) Output max_tokens prevents runaway generation. 3) Hebrew tokenizes inefficiently — שיקול עלות. 4) Tools schema counts as input — minimize. 5) System prompt = stable = cache. 6) Track tokens per request in observability — anomalies = bug. 7) User budget DB column → enforce quotas.",
        professor:
          "Tokens are the fundamental unit of LLM input/output, defined by the model's tokenizer (BPE for GPT, SentencePiece for some others). Token economics drive cost optimization: prompt caching exploits temporal locality of system prompts; retrieval-augmented generation amortizes context across queries. Context windows scale to millions but with degraded recall (lost-in-the-middle, Liu et al. 2023); active retrieval often outperforms long-context.",
      },
      whyFullStack:
        "בלי תקציב tokens, פיצ'ר AI נהיה יקר, איטי, או נכשל כשעוברים את context window.",
      codeExample:
        "const compactContext = relevantChunks.slice(0, 4).join('\\n---\\n');",
      codeExplanation:
        "לא שולחים את כל המסמכים; בוחרים רק chunks רלוונטיים כדי להישאר בתקציב.",
      commonMistake:
        "להדביק את כל הידע לפרומפט במקום לבצע retrieval וסינון.",
      prerequisite: "lesson_12::array",
    },
    {
      conceptName: "embeddings",
      difficulty: 6,
      simpleExplanation:
        "embeddings הם וקטורים מספריים שמייצגים משמעות של טקסט כך שאפשר להשוות דמיון בין טקסטים.",
      levels: {
        grandma:
          "embeddings זה לתת לכל מילה 'קואורדינטות' במפה: 'כלב' ו'חתול' קרובים זה לזה. 'כלב' ו'מטוס' רחוקים. ככה המחשב יודע מה דומה למה — לפי מרחק.",
        child:
          "כמו לסדר את הצעצועים לפי דמיון: כל הבובות במגירה אחת, כל המכוניות באחרת. embedding נותן 'מיקום' לכל טקסט — דברים דומים יושבים ליד אחרים.",
        soldier:
          "embedding = vector of floats (typically 768-3072 dim). model: text-embedding-3-small/large. similarity: cosine, dot product, Euclidean. usage: store vectors per chunk → query embedding → kNN search → relevant chunks.",
        student:
          "Embedding spaces: high-dim representations where semantic similarity ≈ geometric proximity. Models: OpenAI text-embedding-3-large (3072d), Cohere embed-multilingual, BGE, E5. Dimensions: smaller = faster + cheaper, larger = more nuanced. Normalization (L2) for cosine similarity. Asymmetric models: query vs doc encoders (better for retrieval).",
        junior:
          "Practical: 1) cache embeddings — cost adds up fast. 2) batch API: 50-100 texts per call. 3) Hebrew embeddings — multilingual models (text-embedding-3, BGE-multi). 4) re-embed on model upgrade — version your store. 5) hybrid search: BM25 + embedding for best retrieval. 6) MMR (Maximal Marginal Relevance) for diversity in top-K. 7) dimension reduction (Matryoshka) — same model, fewer dims for speed.",
        professor:
          "Embeddings are dense vector representations learned via self-supervised objectives (contrastive, masked language modeling). They capture distributional semantics (Harris 1954). Modern embedding models leverage transformer architectures with pooling (CLS, mean) over contextualized token representations. Limitations: anisotropy (embeddings cluster in narrow cones — addressed via whitening), polysemy collapse, domain shift requiring fine-tuning.",
      },
      whyFullStack:
        "Embeddings מאפשרים חיפוש סמנטי: למצוא מסמך רלוונטי גם אם המשתמש לא השתמש באותן מילים.",
      codeExample:
        "const vector = await createEmbedding('איך עובד JWT?');\nconst matches = await vectorStore.search(vector, { topK: 5 });",
      codeExplanation:
        "הטקסט הופך לווקטור, ואז משווים אותו לווקטורים שמורים במסד נתונים או vector store.",
      commonMistake:
        "לחשוב ש-embedding הוא תשובה. הוא רק ייצוג לחיפוש והשוואה.",
      prerequisite: "lesson_sql_orm::database",
    },
    {
      conceptName: "vector store",
      difficulty: 6,
      simpleExplanation:
        "vector store הוא אחסון שמחזיק vectors ומאפשר similarity search מהיר.",
      levels: {
        grandma:
          "vector store זה כמו ספרייה ענקית עם מערכת חיפוש סמנטית: לא לפי שם הספר, אלא לפי 'מה הספר מדבר עליו'. את שואלת על 'גידול ילדים' — והיא מוצאת ספרים גם אם לא בשם הזה.",
        child:
          "כמו לסדר תמונות לפי 'מה דומה': כל החתולים יחד, כל הכלבים. גם אם לא נכתב על הצילום מה זה — הוא יידע למצוא לפי הדמיון.",
        soldier:
          "vector store options: 1) Pinecone (managed). 2) Weaviate (open + managed). 3) Qdrant (Rust, fast). 4) Chroma (embedded). 5) pgvector (Postgres extension). 6) Redis vector. APIs: upsert(id, vector, metadata), search(query_vector, topK).",
        student:
          "Indexing algorithms: 1) Flat — exact, slow on large. 2) HNSW — graph-based ANN, fast + accurate. 3) IVF — partition-based. 4) PQ — quantization for memory. trade-off: accuracy vs speed vs memory. Filtering: pre-filter (faster but skip valid) vs post-filter. Metadata indexing for hybrid queries.",
        junior:
          "Production: 1) pgvector great for < 1M vectors + already use Postgres. 2) Pinecone for scale > 10M. 3) ALWAYS upsert (idempotent) — never just insert. 4) metadata: chunk source, lesson id, chunk index, version. 5) namespace per tenant — isolation. 6) backup — vector loss = re-embedding cost. 7) re-index periodically — drift over time.",
        professor:
          "Vector databases implement Approximate Nearest Neighbor (ANN) search over high-dimensional spaces. Algorithms: HNSW (Malkov & Yashunin 2018) — hierarchical small-world graphs. IVF (inverted file) — coarse quantization + reranking. PQ (product quantization) — sub-vector compression. The curse of dimensionality affects exact NN; ANN methods accept controlled error for sub-linear time. Hybrid retrieval combining dense (vector) + sparse (BM25) outperforms either alone.",
      },
      whyFullStack:
        "RAG מעשי צריך מקום לשמור embeddings של מסמכים, שיעורים, snippets או תשובות מאושרות.",
      codeExample:
        "await vectorStore.upsert({ id: conceptKey, vector, metadata: { lessonId } });",
      codeExplanation:
        "שומרים vector עם id ו-metadata כדי לדעת מאיזה מושג או מסמך הגיע match.",
      commonMistake:
        "לשמור vector בלי metadata ואז לא לדעת להסביר למשתמש מאיפה התשובה הגיעה.",
      prerequisite: "lesson_ai_engineering::embeddings",
    },
    {
      conceptName: "RAG",
      difficulty: 7,
      simpleExplanation:
        "RAG הוא Retrieval-Augmented Generation: קודם שולפים ידע רלוונטי, ואז נותנים אותו למודל כדי לענות על בסיס מקור.",
      levels: {
        grandma:
          "RAG זה כמו לבקש מהפקיד 'תביא לי את הקלסר הנכון לפני שעניתי לך'. במקום שיהמר על תשובה, הוא קודם מוצא את המסמך, ואז עונה לפיו.",
        child:
          "כמו במבחן עם פתוח-ספר: רוצה לענות על שאלה? לפני שאתה כותב — מוצא את הפרק הנכון בספר, קורא, ואז עונה. RAG = למצוא ואז לענות.",
        soldier:
          "RAG flow: 1) embed user question. 2) similarity search vector store → top-K chunks. 3) construct prompt: question + retrieved context. 4) LLM generates with grounding. citations from chunk metadata.",
        student:
          "RAG architecture: indexing pipeline (load, chunk, embed, store) + query pipeline (embed query, retrieve, rerank, augment, generate). Variants: naive RAG, advanced RAG (query rewriting, HyDE, multi-vector), agentic RAG (iterative retrieval). Evaluation: faithfulness, context relevance, answer relevance (RAGAS framework).",
        junior:
          "מהשטח: 1) Bad chunking = bad retrieval = bad answer. invest in chunking quality. 2) Hybrid search (BM25 + vector) outperforms vector alone. 3) Reranker (Cohere Rerank, BGE-reranker) — top-50 → top-5 with cross-encoder. 4) Query rewriting — user question may differ from doc language. 5) HyDE — generate hypothetical answer, embed it, retrieve. 6) Citations in UI — trust + verifiability. 7) Negative examples — 'I don't know' if retrieval weak.",
        professor:
          "RAG (Lewis et al. 2020) decouples knowledge from parametric model weights. The retriever is a search component (sparse, dense, or hybrid); the generator conditions on retrieved evidence. Trade-offs: latency (retrieval step), cost (storage + retrieval API), accuracy (depends on retrieval quality). Advanced patterns: GraphRAG (Microsoft) builds knowledge graphs from corpora; Self-RAG learns when to retrieve.",
      },
      whyFullStack:
        "RAG מחבר AI לידע של המוצר בלי fine-tuning מלא, ומקטין תשובות מנותקות מהחומר.",
      codeExample:
        "const chunks = await retrieveRelevantChunks(question);\nconst answer = await askModel({ question, context: chunks });",
      codeExplanation:
        "המודל לא מקבל רק שאלה; הוא מקבל גם context שנשלף מהחומר הרלוונטי.",
      commonMistake:
        "להניח ש-RAG תמיד נכון. אם retrieval גרוע, התשובה עדיין תהיה גרועה.",
      prerequisite: "lesson_ai_engineering::vector store",
    },
    {
      conceptName: "chunking",
      difficulty: 6,
      simpleExplanation:
        "chunking הוא פירוק מסמך ליחידות קטנות מספיק לחיפוש, אבל גדולות מספיק כדי לשמור הקשר.",
      levels: {
        grandma:
          "chunking זה לחתוך עוגה לחתיכות בגודל הנכון: לא חתיכה ענקית שלא נכנסת בפה, ולא חתיכה קטנה שמתפוררת. בדיוק לסעודה.",
        child:
          "כמו לחלק ספר לפרקים: כל פרק חלק עצמאי שאפשר לקרוא לבד. אם תחתוך באמצע משפט — אין הגיון. chunk טוב = רעיון שלם, לא שבר.",
        soldier:
          "chunking strategies: 1) Fixed-size (chars/tokens) + overlap. 2) Sentence-based. 3) Paragraph/heading-based. 4) Semantic (embedding distance). 5) Code-aware (function/class). chunk size: 200-1500 tokens typical. overlap: 10-20%.",
        student:
          "Chunking trade-offs: small chunks = better precision, weaker context; large chunks = more context, dilution. Overlap preserves cross-chunk references. Hierarchical chunks: sentence + paragraph + section embeddings. Parent-child retrieval: search small, return large. Document-aware chunkers (Unstructured, LlamaParse) understand structure.",
        junior:
          "Real wins: 1) Markdown-aware chunking — split on headings, preserve structure. 2) Code: function/class boundaries. 3) Tables: keep intact (table-as-chunk). 4) Add summaries to chunks (parent context propagation). 5) Metadata enrichment: chunk title, date, author. 6) Test retrieval quality after chunk strategy change. 7) Hebrew: chunk by sentence (period detection) — be careful with abbreviations.",
        professor:
          "Chunking determines retrieval granularity, fundamentally constraining RAG quality. Theoretical considerations: chunk size affects recall (larger = more context but more noise) and precision (smaller = focused but may miss relevant info). Semantic chunking (Greg Kamradt 2024) uses embedding similarity to detect topic boundaries. Hierarchical retrieval (small-to-big) optimizes by querying fine-grained representations and returning coarse-grained context for generation.",
      },
      whyFullStack:
        "אם chunk גדול מדי הוא מבזבז tokens; אם הוא קטן מדי הוא מאבד משמעות.",
      codeExample:
        "const chunks = splitByHeadings(markdown).filter((chunk) => chunk.text.length > 120);",
      codeExplanation:
        "מפרקים לפי כותרות או גבולות לוגיים במקום לחתוך טקסט באמצע רעיון.",
      commonMistake:
        "לחתוך כל 500 תווים בלי להתחשב בכותרות, קוד או הקשר.",
      prerequisite: "lesson_ai_engineering::token budget",
    },
    {
      conceptName: "retrieval ranking",
      difficulty: 6,
      simpleExplanation:
        "retrieval ranking הוא דירוג תוצאות החיפוש לפי רלוונטיות לפני ששולחים אותן למודל.",
      levels: {
        grandma:
          "retrieval ranking זה כמו לסדר את החנות לפי 'מה הכי חשוב': החלב והלחם בקדמה, התבלינים מאחור. תוצאות חזקות לפני חלשות.",
        child:
          "כמו תחרות שירה: 10 ילדים שרים, 3 הכי טובים עוברים לחצי גמר. ranking בוחר את המתאימים מתוך הרבה אפשרויות.",
        soldier:
          "ranking pipeline: 1) coarse retrieval (vector search, top-50). 2) reranker (cross-encoder, top-5). 3) optional MMR for diversity. 4) threshold filter (score >= X). 5) inject top-K לprompt.",
        student:
          "Reranking models: cross-encoders (BERT-style) — score (query, doc) pair, more accurate but slower. Bi-encoders (embedding) faster, less accurate. Two-stage: bi-encoder retrieval + cross-encoder reranking. Cohere Rerank, BGE-reranker, Jina Reranker. RRF (Reciprocal Rank Fusion) merges multiple rankings.",
        junior:
          "Real life: 1) reranker = often biggest quality lift. test before/after. 2) thresholds: empirical — try 0.5-0.8, measure. 3) MMR balances relevance + diversity (avoid 5 redundant chunks). 4) Hebrew rerankers: multilingual BGE, Cohere multilingual. 5) Caching reranker scores per (query, doc) saves API calls. 6) ranking diagnostics in observability — tail latency on slow queries.",
        professor:
          "Multi-stage ranking architectures separate recall and precision concerns. First-stage retrieval (efficient, recall-focused) employs sparse or dense retrieval. Second-stage rerankers (expensive, precision-focused) use cross-encoders that jointly attend to query and document. The cost-quality trade-off is governed by the reranker's input size (top-K). Listwise vs pointwise rerankers differ in objective; listwise (e.g., LambdaMART) optimize the ranking metric directly.",
      },
      whyFullStack:
        "המודל עונה לפי מה שנתת לו. דירוג טוב מעלה את הסיכוי שהתשובה נשענת על החומר הנכון.",
      codeExample:
        "const selected = matches\n  .filter((match) => match.score >= 0.72)\n  .slice(0, 4);",
      codeExplanation:
        "מסננים matches חלשים ובוחרים מספר קטן של תוצאות חזקות.",
      commonMistake:
        "לשלוח את כל matches למודל בלי threshold ובלי סדר עדיפויות.",
      prerequisite: "lesson_ai_engineering::RAG",
    },
    {
      conceptName: "tool calling",
      difficulty: 7,
      simpleExplanation:
        "tool calling מאפשר למודל לבקש מקוד חיצוני לבצע פעולה מוגדרת, למשל חיפוש, חישוב או קריאת database.",
      levels: {
        grandma:
          "tool calling זה כמו עוזר מטבח שיודע לבקש 'בבקשה תבדוק לי כמה ביצים יש במקרר'. הוא לא הולך בעצמו — הוא מבקש, ומישהו מאושר עושה.",
        child:
          "כמו ילד שצריך לבקש רשות לפני שיוצא: 'אמא, אפשר לקפוץ לחבר?' אמא בודקת ועונה כן/לא. tool calling = ה-AI מבקש לבצע משהו, הקוד מחליט.",
        soldier:
          "tool definition: name, description, parameters (JSON schema). model decides when to call: returns tool_call message with args. code executes, returns result, model continues. multi-turn: tool result → next response.",
        student:
          "Tool calling protocol: model emits structured call (name + args). framework executes tool, injects result into conversation. Provider implementations: OpenAI (functions), Anthropic (tool_use), Google (function_declarations). Multiple tools per call (parallel). nested calls (tool calls another tool). validation: zod schema → JSON Schema for tool params.",
        junior:
          "Production: 1) ALWAYS validate tool args + auth before execution. 2) idempotent tools when possible. 3) timeout per tool. 4) tool budget — max N calls per conversation. 5) tool naming — descriptive (search_courses, NOT search). 6) tool description = part of prompt; tune for selection accuracy. 7) error in tool → return error message; model can retry. 8) audit log all tool calls.",
        professor:
          "Tool calling (function calling) extends LLMs beyond text generation to action invocation, formalized by OpenAI 2023. The model implicitly performs intent classification + slot filling. Recent research: Toolformer (Schick 2023) self-supervised tool use; ToolLLM (Qin 2023) tool-use fine-tuning. Security concerns: tool injection, prompt injection driving tool misuse — mitigated via authorization at execution layer, not relying on prompt-level guardrails.",
      },
      whyFullStack:
        "כך AI לא רק כותב טקסט, אלא משתמש בפונקציות backend שנשלטות על ידי הקוד שלך.",
      codeExample:
        "const tools = {\n  getProgress: async ({ userId }) => progressRepo.findByUser(userId)\n};",
      codeExplanation:
        "המודל לא מקבל גישה חופשית למערכת; הוא יכול לבקש כלי שהקוד הגדיר ומאשר.",
      commonMistake:
        "לתת לכלי לבצע פעולה מסוכנת בלי validation, permissions ו-audit log.",
      prerequisite: "lesson_auth_security::authorization",
    },
    {
      conceptName: "agent loop",
      difficulty: 7,
      simpleExplanation:
        "agent loop הוא מחזור שבו המערכת מתכננת, קוראת לכלים, בודקת תוצאה ומחליטה אם להמשיך או לעצור.",
      levels: {
        grandma:
          "agent loop זה כמו עוזרת בית עם רשימה: בודקת מה צריך, עושה צעד אחד, רואה אם עזר, ואם לא — מנסה אחרת. כל הזמן חוזרת ובוחנת.",
        child:
          "כמו לפתור פאזל: שמים חתיכה, מסתכלים, אם לא מתאים — מסירים. מנסים אחרת. agent עושה את אותו דבר עם משימות: ניסיון, בדיקה, ניסיון נוסף.",
        soldier:
          "agent loop: 1) plan — decide next step. 2) act — call tool. 3) observe — read result. 4) reflect — was that helpful? 5) repeat OR done. patterns: ReAct (Reason+Act), Plan-and-Execute, ReWOO. limits: max_steps, time, cost.",
        student:
          "Agent architectures: ReAct (Yao 2022) — interleave reasoning + action. Plan-and-Execute — plan upfront, then execute. Reflection — self-critique loop. LangGraph state machine — explicit transitions. Memory: short-term (context) + long-term (vector store of past trajectories). Multi-agent: orchestrator + specialists.",
        junior:
          "מציאות: 1) agents = unpredictable cost. ALWAYS budget. 2) max_iterations 10-20 typical. 3) state schema explicit (LangGraph) = debuggable. 4) human-in-the-loop for risky steps (approve_email_send). 5) tool selection accuracy = bottleneck. 6) test on real scenarios — agents fail in subtle ways. 7) trace via LangSmith / Langfuse / OpenTelemetry. 8) Anthropic Claude > GPT for tool use in many benchmarks.",
        professor:
          "Agent loops formalize iterative LLM-driven control flow. The control loop's stability depends on: (1) reasoning quality (avoid infinite loops or premature termination); (2) tool reliability; (3) state representation (Markovian vs full history). Compositional architectures (multi-agent, hierarchical) parallel multi-agent reinforcement learning. Open challenges: long-horizon planning, error recovery, calibrated confidence — agents remain brittle in production beyond narrow domains.",
      },
      whyFullStack:
        "Agents שימושיים למשימות רב-שלביות, אבל חייבים מגבלות כדי לא להיתקע בלולאות, עלויות או פעולות לא מאושרות.",
      codeExample:
        "for (const step of allowedSteps) {\n  const decision = await planner.next(state);\n  if (decision.done) break;\n  state = await runApprovedTool(decision);\n}",
      codeExplanation:
        "הלולאה מוגבלת בצעדים ומריצה רק כלים מאושרים.",
      commonMistake:
        "לקרוא לכל רצף tool calls בשם agent בלי לעצור, למדוד ולבדוק הרשאות.",
      prerequisite: "lesson_ai_engineering::tool calling",
    },
    {
      conceptName: "guardrails",
      difficulty: 6,
      simpleExplanation:
        "guardrails הם חוקים ובדיקות שמגבילים קלט, פלט ופעולות כדי לשמור על בטיחות, פרטיות ואיכות.",
      levels: {
        grandma:
          "guardrails זה כמו מעקות בטיחות בכביש: גם אם מישהו טועה — לא נופל מהצוק. כללים שמונעים אסונות לפני שקורים.",
        child:
          "כמו גדר סביב הבריכה: גם אם מישהו לא יודע לשחות — לא נכנס. אצלנו, גם אם המודל טועה — guardrails מונעים נזק.",
        soldier:
          "guardrails layers: 1) input — sanitize, length limit, block PII. 2) prompt — system instructions. 3) output — filter, validate schema, redact. 4) action — auth, quota, dry-run mode. tools: Guardrails AI, NeMo Guardrails, custom logic.",
        student:
          "Categories: 1) Safety — toxicity, hate, NSFW filters. 2) Privacy — PII detection, data redaction. 3) Compliance — regulatory (GDPR, HIPAA, COPPA). 4) Quality — hallucination check, factuality, on-topic. 5) Operational — quota, rate limit, budget. 6) Brand — tone, prohibited topics. Implementation: rule-based + classifier-based.",
        junior:
          "Real production: 1) ALWAYS validate inputs server-side. 2) Output classifier — moderation API (OpenAI free). 3) PII detection: Presidio, Datasaur. 4) Custom classifier on domain-specific bad outputs. 5) Test with adversarial prompts (red-teaming). 6) Logging filtered events — patterns of attack. 7) Different guardrails per user tier (admin vs anonymous). 8) Don't break legitimate use — calibrate thresholds.",
        professor:
          "Guardrails implement defense-in-depth for LLM systems. The OWASP LLM Top 10 (2023) identifies primary risks: prompt injection, insecure output handling, training data poisoning, model DoS, supply chain, sensitive info disclosure, insecure plugin design, excessive agency, overreliance, model theft. Mitigations span technical (classifiers, validators), operational (monitoring, rate limiting), and policy layers (terms, audits). Holistic AI safety requires socio-technical co-design.",
      },
      whyFullStack:
        "פיצ'ר AI נוגע בקלט משתמש, נתונים ופעולות שרת. בלי guardrails הוא יכול לחשוף מידע או לתת תשובה מסוכנת.",
      codeExample:
        "if (!user.canAskAi) throw new Error('AI quota exceeded');\nif (containsPrivateData(answer)) return safeFallback;",
      codeExplanation:
        "הקוד בודק quota והרשאות לפני הקריאה, ובודק פלט לפני הצגה.",
      commonMistake:
        "לסמוך על prompt בלבד במקום לאכוף גבולות גם בקוד.",
      prerequisite: "lesson_auth_security::authorization",
    },
    {
      conceptName: "hallucination check",
      difficulty: 6,
      simpleExplanation:
        "hallucination check הוא ניסיון לזהות תשובה שלא נשענת על מקור, סותרת את החומר, או נשמעת בטוחה מדי בלי ראיות.",
      levels: {
        grandma:
          "hallucination check זה כמו בדיקת עובדות בעיתון: 'אמרת שהילד הוא בן 8 — אבל בתעודה כתוב 6'. בודקים שאומרים אמת, לא ממציאים.",
        child:
          "כמו לבדוק תשובה במבחן: כתבת 'בירת צרפת — לונדון'. המורה תבדוק עם הספר ותאמר 'לא, פריז'. hallucination check בודק אם התשובה אמיתית.",
        soldier:
          "hallucination check techniques: 1) require citations from RAG. 2) self-consistency — generate N answers, vote. 3) verifier model — check answer matches sources. 4) factuality classifier. 5) NLI (Natural Language Inference) — answer entailed by context?",
        student:
          "Detection methods: 1) Citation grounding — every claim → source span. 2) Cross-checking — different prompts/models, agreement = stronger signal. 3) Probing — ask 'are you sure?' multiple times. 4) Calibration — model confidence vs accuracy. 5) Trapdoor questions — known-false to detect overconfidence. SelfCheckGPT, FactScore, RAGAS faithfulness metric.",
        junior:
          "Practical: 1) RAG + citations = #1 mitigation. 2) NLI model (deberta-v3-mnli): answer + context → entailment. 3) Human review for high-stakes domains. 4) 'I don't know' as valid answer — train/prompt for it. 5) Confidence calibration: model says 80% sure → actually right ~80%? 6) Domain-specific facts DB — verify claims. 7) UI shows sources prominently — user verifies.",
        professor:
          "Hallucination — generation of plausible but unsupported content — is intrinsic to autoregressive LMs trained on noisy data. Taxonomy (Ji et al. 2023): intrinsic (contradicts source) vs extrinsic (unsupported). Causes: training data errors, exposure bias, calibration miscalibration, prompt ambiguity. Mitigations: retrieval grounding, RLHF for honesty, verifier models, decoding strategies (constrained generation). The honesty-helpfulness trade-off remains open.",
      },
      whyFullStack:
        "במערכת לימוד, תשובה שגויה בביטחון גבוה פוגעת באמון ובידע של התלמיד.",
      codeExample:
        "const hasCitation = answer.sources.length > 0;\nconst isAllowed = hasCitation && answer.confidence !== 'unknown';",
      codeExplanation:
        "תשובה רגישה צריכה מקורות או fallback שמודה שאין מספיק מידע.",
      commonMistake:
        "להציג כל פלט של מודל כאמת בלי מקור, confidence או בדיקת סתירות.",
      prerequisite: "lesson_ai_engineering::RAG",
    },
    {
      conceptName: "evaluation",
      difficulty: 6,
      simpleExplanation:
        "evaluation היא בדיקה שיטתית של פיצ'ר AI מול סט שאלות, תשובות צפויות, קריטריונים ומדדי כישלון.",
      levels: {
        grandma:
          "evaluation זה כמו לבדוק תלמידים עם מבחן קבוע: לא מסתכלים על תלמיד אחד פעם אחת. עושים מבחן עם הרבה שאלות וזה אותו מבחן לכל הכיתה — כדי שאפשר להשוות.",
        child:
          "כמו טעימות עיוורות בתחרות בישול: 10 שופטים טועמים את אותן 5 מנות, נותנים ציונים. אז יודעים מי באמת הכי טעים. eval = לבדוק AI על אותן שאלות, לקבל ציונים.",
        soldier:
          "eval set: list of (input, expected_output, criteria). metrics: exact match, BLEU/ROUGE, embedding similarity, LLM-as-judge. tools: Promptfoo, OpenAI Evals, Braintrust, LangSmith. CI integration — block deploy if eval regresses.",
        student:
          "Evaluation taxonomy: 1) Reference-based (BLEU, ROUGE, BERTScore) — compare to gold. 2) Reference-free (perplexity, coherence) — model-based scoring. 3) LLM-as-judge — strong model grades weaker. 4) Human eval — gold standard, expensive. 5) RAGAS — RAG-specific (faithfulness, relevance, context precision). regression testing = key.",
        junior:
          "מהשטח: 1) Build eval set from real production logs (sampled). 2) LLM-as-judge cheap but biased — calibrate. 3) Diverse eval — happy path + edge cases + adversarial. 4) Track metrics over time — detect regressions. 5) A/B test in production with real users (statistical power). 6) Don't optimize for metric alone — Goodhart's Law. 7) Pareto front — quality vs cost vs latency.",
        professor:
          "LLM evaluation faces fundamental challenges: subjectivity (no single ground truth for generation), context dependence (correctness varies by use case), and metric inadequacy (BLEU/ROUGE poorly correlate with human judgment for open-ended tasks). LLM-as-judge introduces evaluator bias (Zheng et al. 2023). Constitutional AI evaluation (Anthropic) uses rubrics. The evaluation problem is essentially the alignment problem at smaller scale — measuring 'good' is the central difficulty.",
      },
      whyFullStack:
        "אי אפשר לדעת אם שינוי prompt או model שיפר את המוצר בלי מדידה חוזרת.",
      codeExample:
        "const score = await gradeAnswer({ question, expected, actual, rubric });",
      codeExplanation:
        "כל תשובה נמדדת מול rubric כדי למצוא רגרסיות לפני release.",
      commonMistake:
        "לבדוק רק ידנית שאלה אחת ואז לשנות prompt לכל המשתמשים.",
      prerequisite: "react_blueprint::Testing Strategies",
    },
    {
      conceptName: "fine-tuning boundary",
      difficulty: 7,
      simpleExplanation:
        "fine-tuning boundary הוא ההחלטה מתי לאמן מודל מותאם ומתי מספיק prompt/RAG/tools.",
      levels: {
        grandma:
          "fine-tuning זה כמו ללמד את הכלב טריקים חדשים: לוקח זמן, עולה כסף, ולא תמיד שווה. לעיתים יותר פשוט להראות לו תמונה (prompt) או לתת לו ספר (RAG).",
        child:
          "כמו ללמוד שפה חדשה לעומק (fine-tune) או להשתמש בגוגל-תרגם (RAG). הראשון לוקח שנים — השני מיידי. אם זו פעם בחיים — תרגם. אם תהיה שם הרבה — תלמד.",
        soldier:
          "fine-tuning options: 1) full fine-tune (rare, expensive). 2) LoRA (parameter-efficient — most common). 3) DPO (preference optimization). 4) RLHF. data: 100s-1000s of examples. cost: $$$ training + slower inference. result: custom model checkpoint.",
        student:
          "Decision matrix: 1) Need fresh/changing knowledge → RAG. 2) Need consistent style/format → prompting + few-shot, then maybe fine-tune. 3) Need new task model can't do → fine-tune. 4) Need low latency → distill (fine-tune small model on big model outputs). modern: LoRA, QLoRA, DoRA — adapt minimal params. costs: $50-$5000 typical. evaluation crucial — fine-tune can degrade base capabilities.",
        junior:
          "Reality check: 1) 90% of cases — prompt + RAG sufficient. 2) Fine-tuning rarely needed for most apps. 3) When yes: customer-specific tone, structured output enforcement, narrow task. 4) Synthetic data via larger model = quick start. 5) Eval BEFORE + AFTER — measure delta. 6) Hosting costs — Together AI, Modal, Replicate — vs OpenAI fine-tuned (more expensive than base). 7) Rebuild on new base model versions.",
        professor:
          "The fine-tuning vs RAG vs prompting decision reflects the parametric (in-weights) vs non-parametric (in-context) knowledge spectrum. Fine-tuning embeds knowledge in weights — efficient inference, hard to update. RAG keeps knowledge external — easy update, retrieval cost. Hybrid: fine-tune for behavior + RAG for knowledge. Modern PEFT (LoRA, AdaLoRA, IA3) reduces fine-tuning cost by orders of magnitude. The choice integrates considerations of data freshness, latency budget, training cost, and maintenance burden.",
      },
      whyFullStack:
        "Fine-tuning לא מחליף database או retrieval. הוא מתאים בעיקר לסגנון, פורמט או דפוסי משימה שחוזרים.",
      codeExample:
        "const strategy = needsFreshPrivateKnowledge ? 'RAG' : 'prompt-or-fine-tune';",
      codeExplanation:
        "אם הידע משתנה או פרטי, לרוב שולפים אותו בזמן אמת במקום לאמן אותו לתוך המודל.",
      commonMistake:
        "לנסות fine-tuning כדי להוסיף ידע שמתעדכן כל שבוע, במקום לבנות retrieval נכון.",
      prerequisite: "lesson_ai_engineering::evaluation",
    },
  ],
};

if (typeof window !== "undefined") {
  window.LESSON_AI_ENGINEERING = LESSON_AI_ENGINEERING;
}

if (typeof module !== "undefined") {
  module.exports = { LESSON_AI_ENGINEERING: LESSON_AI_ENGINEERING };
}
