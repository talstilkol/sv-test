// data/lesson38.js — שיעור 38: LangChain + RAG Deep
// AI Engineering מתקדם. מבחן: 5-7 שאלות צפויות.
var LESSON_38 = {
  id: "lesson_38",
  title: "שיעור 38 — LangChain + RAG מתקדם",
  description:
    "LangChain framework, document loaders, splitters, vector stores, retrievers, RAG patterns.",
  concepts: [
    {
      conceptName: "LangChain",
      difficulty: 7,
      levels: {
        grandma: "LangChain = ארגז כלים ל-AI applications. מחבר LLM, DB, APIs, חיפוש — ביחד.",
        child: "כמו לגו ל-AI — חיבור חתיכות שונות יחד לבניית משהו מורכב.",
        soldier: "LangChain = framework לLLM apps. Components: chains, agents, tools, memory, retrievers.",
        student: "LangChain = orchestration framework. Models (LLM/Chat), Prompts (templates), Output Parsers (structured), Chains (sequence), Retrievers (RAG), Agents (tool use), Memory (chat history).",
        junior: "התחלתי עם OpenAI SDK ישירות. הסתבכתי ב-RAG: chunking, embeddings, retrieval, prompt assembly. עברתי ל-LangChain — abstraction נכון, פחות boilerplate.",
        professor: "LangChain by Harrison Chase. Modular composition via LCEL (LangChain Expression Language). Streaming, batching, async built-in. JS + Python parity. Alternatives: LlamaIndex (RAG-focused), Haystack.",
      },
      illustration:
        "🔗 LangChain stack:\n  Documents → Loaders → Splitters → Embeddings → Vector Store\n              ↓\n  Query → Retriever → Prompt Template → LLM → Parser → Output",
      codeExample:
        "# Install\nnpm i langchain @langchain/openai @langchain/community\n\n// Basic chain\nimport { ChatOpenAI } from '@langchain/openai';\nimport { ChatPromptTemplate } from '@langchain/core/prompts';\nimport { StringOutputParser } from '@langchain/core/output_parsers';\n\nconst model = new ChatOpenAI({ model: 'gpt-4o-mini' });\nconst prompt = ChatPromptTemplate.fromMessages([\n  ['system', 'You are a helpful Hebrew tutor.'],\n  ['user', '{question}'],\n]);\n\n// LCEL — pipe components\nconst chain = prompt.pipe(model).pipe(new StringOutputParser());\n\nconst result = await chain.invoke({ question: 'מה זה useState?' });\nconsole.log(result);\n\n// Streaming\nfor await (const chunk of await chain.stream({ question: '...' })) {\n  process.stdout.write(chunk);\n}",
      codeExplanation: "ChatOpenAI = wrapper. PromptTemplate = reusable prompts. .pipe() = LCEL composition. Parser מ-message ל-string. invoke/stream/batch.",
    },
    {
      conceptName: "Document Loaders",
      difficulty: 6,
      levels: {
        grandma: "כלים שטוענים מסמכים מסוגים שונים — PDF, Word, web, GitHub.",
        child: "כמו לקרוא ספר מ-iPad, מקלטות, או מודפס — אותו תוכן.",
        soldier: "Loaders: PDF, Word, CSV, Notion, GitHub, web URLs. כולם → Document objects.",
        student: "@langchain/community/document_loaders. Loaders return Document[] with pageContent + metadata. Common: PDFLoader, GithubRepoLoader, NotionLoader, RecursiveUrlLoader, S3Loader.",
        junior: "פעם parse לי PDF ידני — 50 שורות + edge cases. עם PDFLoader: 3 שורות. גם metadata (page number, source).",
        professor: "Loader abstraction: source-specific parsing. Returns Document[] (pageContent: string, metadata: object). Async. Some support lazy loading for large datasets. Deduplication essential when re-indexing.",
      },
      illustration:
        "📚 Document Loaders:\n  PDF → PDFLoader\n  GitHub → GithubRepoLoader\n  Notion → NotionLoader\n  Web → RecursiveUrlLoader\n   → all output: Document[]",
      codeExample:
        "import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';\nimport { GithubRepoLoader } from '@langchain/community/document_loaders/web/github';\nimport { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';\n\n// PDF\nconst pdfLoader = new PDFLoader('./manual.pdf');\nconst pdfDocs = await pdfLoader.load();\n// pdfDocs[0] = { pageContent: '...', metadata: { source: './manual.pdf', loc: { pageNumber: 1 } } }\n\n// GitHub repo\nconst githubLoader = new GithubRepoLoader(\n  'https://github.com/langchain-ai/langchain',\n  { branch: 'main', recursive: true, accessToken: process.env.GITHUB_TOKEN }\n);\nconst githubDocs = await githubLoader.load();\n\n// Web page\nconst webLoader = new CheerioWebBaseLoader('https://example.com/article');\nconst webDocs = await webLoader.load();\n\n// JSON\nimport { JSONLoader } from 'langchain/document_loaders/fs/json';\nconst jsonLoader = new JSONLoader('./data.json', '/items/*/description');\nconst jsonDocs = await jsonLoader.load();",
      codeExplanation: "כל loader עם constructor שונה. .load() מחזיר Document[]. metadata.source, .loc, .pageNumber. שימוש סטנדרטי לפני splitter+embeddings.",
    },
    {
      conceptName: "Text Splitters",
      difficulty: 7,
      levels: {
        grandma: "מסמך גדול → נחתך לחלקים קטנים שיכנסו בתוך context window של ה-LLM.",
        child: "ספר ארוך → מחלקים לפרקים קצרים — קל יותר לקרוא.",
        soldier: "Text splitter — חיתוך טקסט ל-chunks. Recursive (פסקה→משפט→מילה), TokenSplitter, MarkdownSplitter.",
        student: "RecursiveCharacterTextSplitter (default). Splits hierarchically: \\n\\n, \\n, ' ', ''. Configure chunkSize (chars/tokens), chunkOverlap (50-200 chars). Preserves semantics.",
        junior: "פעם חתכתי ב-1000 תווים flat — איבר באמצע משפט. עברתי ל-RecursiveCharacterTextSplitter — חיתוך ב-paragraph boundary. retrieval quality x2.",
        professor: "Splitter strategies: character-based, token-based (tiktoken), semantic (embedding-based). Trade-off: chunk size vs context coherence. Overlap = redundancy for cross-chunk concepts. Markdown/code splitters preserve structure.",
      },
      illustration:
        "✂️ Text Splitter:\n  long doc (10,000 chars)\n   → RecursiveCharacterTextSplitter(chunkSize=800, overlap=100)\n   → 12 chunks of ~800 chars\n   → each chunk = 1 vector\n   → store in vector DB",
      codeExample:
        "import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';\n\nconst splitter = new RecursiveCharacterTextSplitter({\n  chunkSize: 800,        // ~200 tokens\n  chunkOverlap: 100,     // continuity between chunks\n});\n\nconst chunks = await splitter.splitDocuments(pdfDocs);\n// chunks: Document[] with metadata preserved\n\n// Markdown-aware\nimport { MarkdownTextSplitter } from '@langchain/textsplitters';\nconst mdSplitter = new MarkdownTextSplitter({ chunkSize: 800 });\n\n// Code-aware\nimport { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';\nconst codeSplitter = RecursiveCharacterTextSplitter.fromLanguage('typescript', {\n  chunkSize: 1500,\n});\nconst codeChunks = await codeSplitter.createDocuments([sourceCode]);\n\n// Token-based\nimport { TokenTextSplitter } from '@langchain/textsplitters';\nconst tokenSplitter = new TokenTextSplitter({\n  encodingName: 'cl100k_base',  // GPT-4\n  chunkSize: 256,\n});",
      codeExplanation: "RecursiveCharacterTextSplitter = default ומצוין. Markdown/code splitters שומרים על structure. TokenTextSplitter ל-budget management של tokens.",
    },
    {
      conceptName: "Vector Store",
      difficulty: 8,
      levels: {
        grandma: "ספרייה של embeddings — וקטורים שמייצגים טקסט. חיפוש מהיר לפי דמיון משמעותי.",
        child: "קופסת אחסון מיוחדת — שואלים שאלה, מקבלים את ה-3 פתקים הכי דומים.",
        soldier: "Vector DB: Pinecone, Weaviate, Qdrant, Chroma, pgvector. Index for approximate nearest neighbor (ANN).",
        student: "Vector stores: store embeddings + metadata. Index for similarity search (cosine, dot, euclidean). HNSW = best ANN algorithm. Hosted (Pinecone), self-hosted (Qdrant), embedded (Chroma), Postgres (pgvector).",
        junior: "התחלתי עם in-memory store — 10K docs, OK. הגעתי ל-1M docs → out of memory. עברתי ל-Pinecone — managed, scalable, serverless option.",
        professor: "Vector DBs implement HNSW (Hierarchical Navigable Small World) for sub-linear ANN. Trade-offs: recall vs latency. Hybrid search: combine vector + BM25. Filtering by metadata pre/post search. Hosted vs self-hosted: cost, operational burden.",
      },
      illustration:
        "🗄️ Vector Store:\n  embeddings + metadata\n   → HNSW index\n   → query embedding\n   → top-K nearest (cosine similarity)",
      codeExample:
        "# הGemini\nnpm i @langchain/community @pinecone-database/pinecone\n\nimport { PineconeStore } from '@langchain/pinecone';\nimport { Pinecone } from '@pinecone-database/pinecone';\nimport { OpenAIEmbeddings } from '@langchain/openai';\n\nconst pc = new Pinecone({ apiKey: process.env.PINECONE_KEY });\nconst index = pc.index('my-index');\n\nconst embeddings = new OpenAIEmbeddings({ model: 'text-embedding-3-small' });\n\n// Index documents\nconst store = await PineconeStore.fromDocuments(\n  chunks,\n  embeddings,\n  { pineconeIndex: index }\n);\n\n// Query\nconst results = await store.similaritySearch('how to use useState?', 5);\n// results: top-5 most similar chunks\n\n// With metadata filter\nconst filtered = await store.similaritySearch('useState', 5, {\n  filter: { category: 'react' },\n});\n\n// Alternatives:\n// pgvector (Postgres extension)\nimport { PGVectorStore } from '@langchain/community/vectorstores/pgvector';\n\n// Chroma (embedded)\nimport { Chroma } from '@langchain/community/vectorstores/chroma';\n\n// Qdrant\nimport { QdrantVectorStore } from '@langchain/community/vectorstores/qdrant';",
      codeExplanation: "PineconeStore.fromDocuments מקדדים + מאחסן. similaritySearch(query, k) מחזיר top-k. metadata filter מצמצם מראש. Alternatives: pgvector, Chroma, Qdrant.",
    },
    {
      conceptName: "RAG Pattern",
      difficulty: 8,
      levels: {
        grandma: "RAG = AI עם 'ספרייה'. שואלים → AI קודם מחפש בספרייה → אז עונה לפי מה שמצא.",
        child: "כמו מבחן עם דף עזר — אתה לא זוכר הכל, אבל יודע איפה לחפש.",
        soldier: "RAG = Retrieval Augmented Generation. Query → embed → search vector store → top-k chunks → context → LLM → answer.",
        student: "RAG architecture: (1) Index — load+split+embed+store. (2) Retrieve — query embedding → similarity search → top-k. (3) Augment — inject chunks into prompt. (4) Generate — LLM with context.",
        junior: "פעם בניתי chatbot על תיעוד שלי. fine-tuning עלה $5K. RAG עם Pinecone + GPT — $50/חודש, accuracy גבוה יותר, גם מצטט מקורות.",
        professor: "RAG variants: Naive RAG, Advanced (re-ranking, query rewriting), Modular RAG. Quality factors: chunk size, retrieval count, hybrid search, reranking (Cohere Rerank), prompt template. Evaluation: faithfulness, answer relevance.",
      },
      illustration:
        "🎯 RAG flow:\n  user query\n   → embed query\n   → vector search → top-5 chunks\n   → inject as context into prompt\n   → LLM answers grounded in context\n   → cite sources",
      codeExample:
        "import { ChatOpenAI } from '@langchain/openai';\nimport { ChatPromptTemplate } from '@langchain/core/prompts';\nimport { StringOutputParser } from '@langchain/core/output_parsers';\nimport { RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables';\n\n// 1. Vector store with indexed docs (from previous example)\nconst retriever = store.asRetriever({ k: 5 });\n\n// 2. Prompt template — context injection\nconst template = `Answer the question based ONLY on the context below.\nIf you don't know, say 'I don't have information about that'.\n\nContext:\n{context}\n\nQuestion: {question}\n\nAnswer:`;\nconst prompt = ChatPromptTemplate.fromTemplate(template);\n\n// 3. Chain — RAG pipeline\nconst model = new ChatOpenAI({ model: 'gpt-4o-mini' });\n\nconst ragChain = RunnableSequence.from([\n  {\n    context: retriever.pipe(formatDocsAsString),\n    question: new RunnablePassthrough(),\n  },\n  prompt,\n  model,\n  new StringOutputParser(),\n]);\n\nfunction formatDocsAsString(docs) {\n  return docs.map((d, i) => `[${i+1}] ${d.pageContent}`).join('\\n\\n');\n}\n\n// 4. Use\nconst answer = await ragChain.invoke('How does useState handle async updates?');\nconsole.log(answer);\n\n// With sources\nconst withSources = await retriever.invoke('useState async');\nfor (const doc of withSources) {\n  console.log(doc.metadata.source);\n}",
      codeExplanation: "Retriever = vector store search. RunnableSequence = pipeline. Context injected via template. השאלה מקבלת context-aware answer. Sources accessible via metadata.",
    },
  ],
};
