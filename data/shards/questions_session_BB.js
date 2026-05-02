// data/shards/questions_session_BB.js
// Sprint 2 batch BB — AI Engineering
// 50 questions: 35 MC + 15 Fill

window.QUESTIONS_SHARD_BB = {
  mc: [
    {
      id: "mc_openai_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::OpenAI API",
      level: 5,
      question: "OpenAI API:",
      options: [
        "REST API for GPT models — chat completions, embeddings, streaming",
        "Free models",
        "Browser library",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Standard interface to GPT.",
      optionFeedback: [
        "✅ נכון. OpenAI API = REST endpoints ל-GPT.",
        "❌ paid API.",
        "❌ server-side primarily.",
        "❌ active."
      ]
    },
    {
      id: "mc_aisdk_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::Vercel AI SDK",
      level: 6,
      question: "Vercel AI SDK:",
      options: [
        "Multi-provider TS SDK — generateText, streamText, generateObject with zod",
        "OpenAI only",
        "Deprecated",
        "Frontend"
      ],
      correctIndex: 0,
      explanation: "Provider-agnostic TS-first.",
      optionFeedback: [
        "✅ נכון. Vercel AI SDK = multi-provider.",
        "❌ Anthropic, Google, etc.",
        "❌ active.",
        "❌ both."
      ]
    },
    {
      id: "mc_langchain_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::LangChain",
      level: 6,
      question: "LangChain:",
      options: [
        "AI framework — chains, agents, memory, tool calling. Verbose but feature-rich",
        "DB",
        "Deprecated",
        "Frontend"
      ],
      correctIndex: 0,
      explanation: "Popular framework. LCEL syntax.",
      optionFeedback: [
        "✅ נכון. LangChain = AI framework.",
        "❌ זה lib.",
        "❌ active.",
        "❌ multi-platform."
      ]
    },
    {
      id: "mc_modelsel_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::model selection",
      level: 6,
      question: "Model selection trade-offs:",
      options: [
        "Capability vs cost vs latency. Larger models smarter, slower, expensive",
        "Always largest",
        "Always cheapest",
        "Random"
      ],
      correctIndex: 0,
      explanation: "GPT-4 ↔ GPT-3.5 trade-off.",
      optionFeedback: [
        "✅ נכון. trade-offs ידועים.",
        "❌ overkill לרוב.",
        "❌ potentially worse output.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_promptmsg_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::prompt messages",
      level: 6,
      question: "Prompt messages roles:",
      options: [
        "system / user / assistant — system sets behavior, user is input, assistant is response",
        "Only user",
        "Only system",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Chat completion API standard.",
      optionFeedback: [
        "✅ נכון. 3 roles סטנדרטיים.",
        "❌ system חיוני להגדרה.",
        "❌ user חיוני לprompt.",
        "❌ structured."
      ]
    },
    {
      id: "mc_structured_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::structured output",
      level: 7,
      question: "Structured output:",
      options: [
        "Force LLM to return JSON matching zod schema — type-safe, parseable",
        "Plain text",
        "Random",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "generateObject with schema.",
      optionFeedback: [
        "✅ נכון. structured output = typed JSON.",
        "❌ זה default — structured הוא enhancement.",
        "❌ deterministic.",
        "❌ active."
      ]
    },
    {
      id: "mc_streaming_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::streaming response",
      level: 6,
      question: "Streaming response:",
      options: [
        "Token-by-token output via SSE/stream — better UX for long responses",
        "Wait for full response",
        "Deprecated",
        "Manual"
      ],
      correctIndex: 0,
      explanation: "User sees progress immediately.",
      optionFeedback: [
        "✅ נכון. streaming = progressive output.",
        "❌ זה הblocking ההפוך.",
        "❌ standard.",
        "❌ built into SDK."
      ]
    },
    {
      id: "mc_tokens_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::token budget",
      level: 7,
      question: "Token budget:",
      options: [
        "Max tokens per call — input + output. GPT-4: ~128k context window",
        "Words count",
        "Bytes",
        "Random"
      ],
      correctIndex: 0,
      explanation: "BPE tokenization. Track usage.",
      optionFeedback: [
        "✅ נכון. tokens = ~4 chars לרוב.",
        "❌ זה different unit.",
        "❌ different.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_embeddings_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::embeddings",
      level: 7,
      question: "Embeddings:",
      options: [
        "Numeric vector representations of text — similar text → similar vectors (cosine)",
        "Plain text",
        "Compression",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "OpenAI text-embedding-3-large = 3072 dims.",
      optionFeedback: [
        "✅ נכון. embeddings = vectors.",
        "❌ זה ההפך.",
        "❌ unrelated.",
        "❌ active."
      ]
    },
    {
      id: "mc_vectorstore_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::vector store",
      level: 7,
      question: "Vector store:",
      options: [
        "DB for embeddings — pgvector, Pinecone, Weaviate. ANN similarity search",
        "Cache",
        "GUI",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Approximate Nearest Neighbor (HNSW index).",
      optionFeedback: [
        "✅ נכון. vector store = embeddings DB.",
        "❌ persistent.",
        "❌ unrelated.",
        "❌ active."
      ]
    },
    {
      id: "mc_rag_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::RAG",
      level: 7,
      question: "RAG (Retrieval-Augmented Generation):",
      options: [
        "Embed user query → search vectors → inject relevant docs into prompt → LLM answers",
        "Pre-train on docs",
        "Manual",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Standard pattern for knowledge bases.",
      optionFeedback: [
        "✅ נכון. RAG = retrieve + generate.",
        "❌ זה fine-tuning.",
        "❌ אוטומטי.",
        "❌ דומיננטי."
      ]
    },
    {
      id: "mc_chunking_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::chunking",
      level: 7,
      question: "Chunking strategy:",
      options: [
        "Split docs to ~500 token chunks with overlap — fits in context, preserves meaning",
        "Single chunk",
        "Random",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Semantic chunks (paragraphs/headings) > arbitrary.",
      optionFeedback: [
        "✅ נכון. chunking = split docs.",
        "❌ won't fit.",
        "❌ deterministic.",
        "❌ standard."
      ]
    },
    {
      id: "mc_retrieval_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::retrieval ranking",
      level: 8,
      question: "Retrieval ranking:",
      options: [
        "Score chunks by similarity. Hybrid: semantic (vector) + keyword (BM25)",
        "Random",
        "All same",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Improve recall.",
      optionFeedback: [
        "✅ נכון. hybrid retrieval = better.",
        "❌ deterministic.",
        "❌ ranking matters.",
        "❌ active."
      ]
    },
    {
      id: "mc_tool_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::tool calling",
      level: 7,
      question: "Tool calling:",
      options: [
        "LLM returns structured request to call function — your code executes, returns result",
        "Direct function execution",
        "Deprecated",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Enables agents to act.",
      optionFeedback: [
        "✅ נכון. tool calling = function invocation pattern.",
        "❌ זה anti-pattern (security).",
        "❌ active.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_agent_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::agent loop",
      level: 8,
      question: "Agent loop:",
      options: [
        "While not done: LLM thinks → calls tools → reads results → repeats. Until goal achieved",
        "Single call",
        "Deprecated",
        "Frontend"
      ],
      correctIndex: 0,
      explanation: "Multi-step reasoning.",
      optionFeedback: [
        "✅ נכון. agent loop = iterative.",
        "❌ זה לא agent.",
        "❌ active.",
        "❌ backend."
      ]
    },
    {
      id: "mc_guardrails_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::guardrails",
      level: 7,
      question: "Guardrails:",
      options: [
        "Input/output validation — block toxic, validate JSON schema, prompt injection defense",
        "Optional",
        "Deprecated",
        "Frontend"
      ],
      correctIndex: 0,
      explanation: "Critical for production.",
      optionFeedback: [
        "✅ נכון. guardrails = safety boundaries.",
        "❌ critical.",
        "❌ active.",
        "❌ multi-layer."
      ]
    },
    {
      id: "mc_hallucination_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::hallucination check",
      level: 8,
      question: "Hallucination defenses:",
      options: [
        "RAG grounding + citation requirement + LLM-as-judge verification",
        "Retrain",
        "Manual review",
        "None"
      ],
      correctIndex: 0,
      explanation: "Ground responses in sources.",
      optionFeedback: [
        "✅ נכון. multi-layer.",
        "❌ slow + expensive.",
        "❌ doesn't scale.",
        "❌ critical issue."
      ]
    },
    {
      id: "mc_eval_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::evaluation",
      level: 8,
      question: "AI evaluation:",
      options: [
        "Golden test set + LLM-as-judge / embeddings similarity — score outputs",
        "Manual only",
        "No eval",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Regression tests for AI.",
      optionFeedback: [
        "✅ נכון. eval = automated quality check.",
        "❌ doesn't scale.",
        "❌ critical.",
        "❌ active."
      ]
    },
    {
      id: "mc_finetune_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::fine-tuning boundary",
      level: 8,
      question: "When to fine-tune:",
      options: [
        "Strict format, latency-critical, high-volume — when prompting can't reach quality",
        "Always first",
        "Never",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Prompting cheaper + faster iteration.",
      optionFeedback: [
        "✅ נכון. fine-tune is last resort.",
        "❌ try prompting first.",
        "❌ has its place.",
        "❌ deterministic."
      ]
    },
    // ─── More AI ───
    {
      id: "mc_temperature_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::model selection",
      level: 7,
      question: "Temperature parameter:",
      options: [
        "0 = deterministic (factual). 1 = creative. Choose by task",
        "Always 1",
        "Random",
        "Heat"
      ],
      correctIndex: 0,
      explanation: "Sampling randomness.",
      optionFeedback: [
        "✅ נכון. temperature controls randomness.",
        "❌ depends on task.",
        "❌ deterministic — depends on temp.",
        "❌ unrelated."
      ]
    },
    {
      id: "mc_systemprompt_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::prompt messages",
      level: 7,
      question: "System prompt purpose:",
      options: [
        "Set persona, rules, format, tone for entire conversation",
        "User input",
        "Output",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "First message in chat.",
      optionFeedback: [
        "✅ נכון. system = setup.",
        "❌ user message שונה.",
        "❌ זה assistant role.",
        "❌ active."
      ]
    },
    {
      id: "mc_zerocost_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::prompt messages",
      level: 7,
      question: "Few-shot prompting:",
      options: [
        "Include examples in prompt — model learns format/pattern from samples",
        "Single example",
        "No examples",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "In-context learning.",
      optionFeedback: [
        "✅ נכון. few-shot = examples.",
        "❌ one-shot.",
        "❌ zero-shot — sometimes works.",
        "❌ active."
      ]
    },
    {
      id: "mc_cot_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::prompt messages",
      level: 7,
      question: "Chain-of-Thought (CoT):",
      options: [
        "Ask model to think step-by-step — improves reasoning on complex tasks",
        "Single shot",
        "Deprecated",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Often via 'let's think step by step'.",
      optionFeedback: [
        "✅ נכון. CoT = step-by-step.",
        "❌ זה anti-pattern לcomplex.",
        "❌ active.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_costopt_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::token budget",
      level: 7,
      question: "Cost optimization:",
      options: [
        "Cache responses + smaller models for simple + summarize long context",
        "Always large model",
        "No optimization",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Major operational concern.",
      optionFeedback: [
        "✅ נכון. multiple cost levers.",
        "❌ expensive.",
        "❌ critical for prod.",
        "❌ deterministic strategy."
      ]
    },
    {
      id: "mc_promptinject_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::guardrails",
      level: 8,
      question: "Prompt injection:",
      options: [
        "Malicious user input that overrides system prompt — main LLM security risk",
        "Optimization",
        "Deprecated",
        "Frontend"
      ],
      correctIndex: 0,
      explanation: "OWASP LLM Top 1.",
      optionFeedback: [
        "✅ נכון. injection = #1 LLM risk.",
        "❌ זה anti-optimization.",
        "❌ active threat.",
        "❌ multi-layer."
      ]
    },
    {
      id: "mc_function_calling_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::tool calling",
      level: 7,
      question: "Tool/function calling format:",
      options: [
        "JSON Schema describing function — model returns structured call",
        "free text",
        "deprecated",
        "browser"
      ],
      correctIndex: 0,
      explanation: "Standard since GPT-4 Function Calling.",
      optionFeedback: [
        "✅ נכון. JSON Schema standard.",
        "❌ structured.",
        "❌ active.",
        "❌ server."
      ]
    },
    {
      id: "mc_context_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::token budget",
      level: 8,
      question: "Context window management:",
      options: [
        "Truncate, summarize, or RAG-retrieve relevant. Don't exceed limit",
        "Always full",
        "Random",
        "Manual"
      ],
      correctIndex: 0,
      explanation: "Strategies to fit in limits.",
      optionFeedback: [
        "✅ נכון. multiple strategies.",
        "❌ exceeds limit.",
        "❌ deterministic.",
        "❌ smart."
      ]
    },
    {
      id: "mc_pricing_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::OpenAI API",
      level: 7,
      question: "OpenAI pricing model:",
      options: [
        "Per 1M tokens — separate input vs output rates. Free tier limited",
        "Per request",
        "Per second",
        "Free always"
      ],
      correctIndex: 0,
      explanation: "Tokens-based.",
      optionFeedback: [
        "✅ נכון. tokens billing.",
        "❌ tokens.",
        "❌ tokens.",
        "❌ paid."
      ]
    },
    {
      id: "mc_quality_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::evaluation",
      level: 8,
      question: "AI quality metrics:",
      options: [
        "Relevance, faithfulness, harmlessness — per-task metrics + LLM-judge",
        "Speed only",
        "Cost only",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Multi-dimensional.",
      optionFeedback: [
        "✅ נכון. multiple dimensions.",
        "❌ partial.",
        "❌ partial.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_latency_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::streaming response",
      level: 7,
      question: "Latency optimization:",
      options: [
        "Streaming + smaller model + caching + prompt-optimization",
        "Bigger model",
        "More tokens",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Multiple levers.",
      optionFeedback: [
        "✅ נכון. multiple optimizations.",
        "❌ slower.",
        "❌ slower.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_jsonmode_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::structured output",
      level: 7,
      question: "JSON mode:",
      options: [
        "OpenAI parameter forcing JSON output — pair with system prompt 'respond with JSON'",
        "Default",
        "Deprecated",
        "Frontend"
      ],
      correctIndex: 0,
      explanation: "Reliable JSON.",
      optionFeedback: [
        "✅ נכון. JSON mode = forced.",
        "❌ standard mode = text.",
        "❌ active.",
        "❌ both."
      ]
    },
    {
      id: "mc_anthropic_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::OpenAI API",
      level: 6,
      question: "Anthropic API (Claude):",
      options: [
        "Similar to OpenAI — messages API, tool use, large context (200k+ Claude 3+)",
        "Same",
        "Smaller",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Major OpenAI alternative.",
      optionFeedback: [
        "✅ נכון. Anthropic = OpenAI alternative.",
        "❌ slight differences.",
        "❌ usually larger context.",
        "❌ active."
      ]
    },
    {
      id: "mc_caching_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::token budget",
      level: 8,
      question: "Prompt caching:",
      options: [
        "Anthropic/OpenAI feature — long system prompt cached, reduces cost+latency for repeated calls",
        "Random",
        "Always free",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Provider-specific feature.",
      optionFeedback: [
        "✅ נכון. prompt caching = cost saver.",
        "❌ deterministic.",
        "❌ paid feature.",
        "❌ active."
      ]
    },
    {
      id: "mc_maximizeai_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::evaluation",
      level: 8,
      question: "Best AI engineering principle:",
      options: [
        "Iterate quickly: prompt → eval → adjust. Don't fine-tune until prompting plateaus",
        "Fine-tune first",
        "No iteration",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Promptops over MLOps.",
      optionFeedback: [
        "✅ נכון. iterate via prompts first.",
        "❌ slow + expensive.",
        "❌ critical.",
        "❌ deterministic."
      ]
    },
    {
      id: "mc_sse_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::streaming response",
      level: 7,
      question: "SSE (Server-Sent Events):",
      options: [
        "One-way HTTP streaming — server pushes chunks. Used by AI SDKs for streaming",
        "WebSocket",
        "Polling",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Simpler than WebSocket for one-way.",
      optionFeedback: [
        "✅ נכון. SSE = one-way streaming.",
        "❌ different.",
        "❌ pull-based.",
        "❌ active."
      ]
    },
  ],
  fill: [
    {
      id: "fill_openai_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::OpenAI API",
      level: 5,
      code: "import { ____ } from 'openai';\nconst openai = new OpenAI();\nconst r = await openai.chat.completions.create({ messages, model: 'gpt-4' });",
      answer: "OpenAI",
      explanation: "Default export of openai package."
    },
    {
      id: "fill_aisdk_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::Vercel AI SDK",
      level: 6,
      code: "import { generateText } from 'ai';\nconst { ____ } = await generateText({ model, prompt });",
      answer: "text",
      explanation: "generateText returns { text } and metadata."
    },
    {
      id: "fill_streaming_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::streaming response",
      level: 7,
      code: "const { textStream } = await streamText({ model, prompt });\nfor ____ (const chunk of textStream) console.log(chunk);",
      answer: "await",
      explanation: "for await...of consumes async iterable."
    },
    {
      id: "fill_messages_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::prompt messages",
      level: 6,
      code: "const messages = [\n  { role: '____', content: 'You are a helpful assistant.' },\n  { role: 'user', content: 'Hello' }\n];",
      answer: "system",
      explanation: "system role sets behavior."
    },
    {
      id: "fill_zod_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::structured output",
      level: 7,
      code: "import { z } from 'zod';\nconst schema = ____.object({ name: z.string() });",
      answer: "z",
      explanation: "Zod schema builder."
    },
    {
      id: "fill_embed_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::embeddings",
      level: 7,
      code: "const { embedding } = await ____({ model, value: 'text' });",
      answer: "embed",
      explanation: "Vercel AI SDK embed function."
    },
    {
      id: "fill_rag_query_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::RAG",
      level: 7,
      code: "const queryVec = await embed(userQuery);\nconst relevant = await vectorDB.____(queryVec, { k: 5 });",
      answer: "search",
      explanation: "Vector similarity search."
    },
    {
      id: "fill_chunk_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::chunking",
      level: 7,
      code: "const chunks = splitText(longDoc, {\n  size: ____,\n  overlap: 50\n});",
      answer: "500",
      explanation: "~500 tokens per chunk standard."
    },
    {
      id: "fill_tools_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::tool calling",
      level: 7,
      code: "const tools = [{\n  ____: 'get_weather',\n  parameters: { city: 'string' }\n}];",
      answer: "name",
      explanation: "Tool definition with name."
    },
    {
      id: "fill_temperature_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::model selection",
      level: 6,
      code: "const result = await generateText({\n  model,\n  ____: 0,  // deterministic\n  prompt\n});",
      answer: "temperature",
      explanation: "temperature: 0 = factual, deterministic."
    },
    {
      id: "fill_max_tokens_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::token budget",
      level: 7,
      code: "const r = await generateText({\n  model,\n  prompt,\n  ____Tokens: 1000\n});",
      answer: "max",
      explanation: "maxTokens limits output."
    },
    {
      id: "fill_stream_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::streaming response",
      level: 7,
      code: "const { ____ } = await streamText({ model, prompt });\nfor await (const chunk of textStream) ...",
      answer: "textStream",
      explanation: "streamText returns textStream."
    },
    {
      id: "fill_structured_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::structured output",
      level: 7,
      code: "const { ____ } = await generateObject({ model, schema, prompt });\n// typed by zod",
      answer: "object",
      explanation: "generateObject returns typed object."
    },
    {
      id: "fill_anthropic_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::OpenAI API",
      level: 7,
      code: "import { ____ } from '@anthropic-ai/sdk';\nconst client = new Anthropic();",
      answer: "Anthropic",
      explanation: "Anthropic SDK default export."
    },
    {
      id: "fill_messages_create_bb_001",
      topicId: "topic_ai",
      conceptKey: "lesson_ai_engineering::OpenAI API",
      level: 7,
      code: "const r = await client.messages.____({\n  model: 'claude-opus-4-7',\n  messages: [...],\n  max_tokens: 1000\n});",
      answer: "create",
      explanation: "messages.create for Claude API."
    },
  ],
};
