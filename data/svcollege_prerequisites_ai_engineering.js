// data/svcollege_prerequisites_ai_engineering.js
// SVCollege Finish Line 1 - Practical AI Engineering prerequisite bridge.

var SVCOLLEGE_AI_ENGINEERING_PREREQUISITES = {
  "lesson_ai_engineering::OpenAI API": ["lesson_devops_deploy::environment variables", "lesson_nextjs::route handler"],
  "lesson_ai_engineering::Vercel AI SDK": ["lesson_ai_engineering::OpenAI API", "lesson_nextjs::route handler"],
  "lesson_ai_engineering::LangChain": ["lesson_ai_engineering::OpenAI API", "lesson_ai_engineering::structured output"],
  "lesson_ai_engineering::model selection": ["lesson_ai_engineering::OpenAI API", "lesson_devops_deploy::environment variables"],
  "lesson_ai_engineering::prompt messages": ["lesson_ai_engineering::OpenAI API"],
  "lesson_ai_engineering::structured output": ["lesson_11::object", "lesson_sql_orm::schema"],
  "lesson_ai_engineering::streaming response": ["lesson_ai_engineering::Vercel AI SDK", "lesson_nextjs::route handler"],
  "lesson_ai_engineering::token budget": ["lesson_12::array", "lesson_ai_engineering::prompt messages"],
  "lesson_ai_engineering::embeddings": ["lesson_11::Array", "lesson_sql_orm::database"],
  "lesson_ai_engineering::vector store": ["lesson_ai_engineering::embeddings", "lesson_sql_orm::database"],
  "lesson_ai_engineering::RAG": ["lesson_ai_engineering::vector store", "lesson_ai_engineering::chunking"],
  "lesson_ai_engineering::chunking": ["lesson_ai_engineering::token budget"],
  "lesson_ai_engineering::retrieval ranking": ["lesson_ai_engineering::RAG", "lesson_12::filter"],
  "lesson_ai_engineering::tool calling": ["lesson_ai_engineering::structured output", "lesson_auth_security::authorization"],
  "lesson_ai_engineering::agent loop": ["lesson_ai_engineering::tool calling", "lesson_ai_engineering::guardrails"],
  "lesson_ai_engineering::guardrails": ["lesson_auth_security::authorization", "lesson_ai_engineering::structured output"],
  "lesson_ai_engineering::hallucination check": ["lesson_ai_engineering::RAG", "lesson_ai_engineering::guardrails"],
  "lesson_ai_engineering::evaluation": ["react_blueprint::Testing Strategies", "lesson_ai_engineering::hallucination check"],
  "lesson_ai_engineering::fine-tuning boundary": ["lesson_ai_engineering::evaluation", "lesson_ai_engineering::RAG"],
};

if (typeof window !== "undefined") {
  window.SVCOLLEGE_AI_ENGINEERING_PREREQUISITES = SVCOLLEGE_AI_ENGINEERING_PREREQUISITES;
  if (window.CONCEPT_PREREQUISITES) {
    Object.keys(SVCOLLEGE_AI_ENGINEERING_PREREQUISITES).forEach(function assignAiEngineeringPrerequisite(key) {
      window.CONCEPT_PREREQUISITES[key] = SVCOLLEGE_AI_ENGINEERING_PREREQUISITES[key];
    });
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_AI_ENGINEERING_PREREQUISITES: SVCOLLEGE_AI_ENGINEERING_PREREQUISITES };
}
