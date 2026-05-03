# גרף תלויות בין מושגים

מציג את הסדר הלוגי של למידה — מה צריך ללמוד לפני מה.

## תלויות לפי שיעור

### AI Engineering - OpenAI, Vercel AI SDK, RAG ו-Agents

```mermaid
graph LR
  lesson_ai_engineering_OpenAI_API["OpenAI API"]
  lesson_devops_deploy_environment_variables --> lesson_ai_engineering_OpenAI_API
  lesson_ai_engineering_Vercel_AI_SDK["Vercel AI SDK"]
  lesson_nextjs_route_handler --> lesson_ai_engineering_Vercel_AI_SDK
  lesson_ai_engineering_LangChain["LangChain"]
  lesson_ai_engineering_OpenAI_API --> lesson_ai_engineering_LangChain
  lesson_ai_engineering_model_selection["model selection"]
  lesson_devops_deploy_environment_variables --> lesson_ai_engineering_model_selection
  lesson_ai_engineering_prompt_messages["prompt messages"]
  lesson_ai_engineering_OpenAI_API --> lesson_ai_engineering_prompt_messages
  lesson_ai_engineering_structured_output["structured output"]
  lesson_11_object --> lesson_ai_engineering_structured_output
  lesson_ai_engineering_streaming_response["streaming response"]
  lesson_nextjs_route_handler --> lesson_ai_engineering_streaming_response
  lesson_ai_engineering_token_budget["token budget"]
  lesson_12_array --> lesson_ai_engineering_token_budget
  lesson_ai_engineering_embeddings["embeddings"]
  lesson_sql_orm_database --> lesson_ai_engineering_embeddings
  lesson_ai_engineering_vector_store["vector store"]
  lesson_ai_engineering_embeddings --> lesson_ai_engineering_vector_store
  lesson_ai_engineering_RAG["RAG"]
  lesson_ai_engineering_vector_store --> lesson_ai_engineering_RAG
  lesson_ai_engineering_chunking["chunking"]
  lesson_ai_engineering_token_budget --> lesson_ai_engineering_chunking
  lesson_ai_engineering_retrieval_ranking["retrieval ranking"]
  lesson_ai_engineering_RAG --> lesson_ai_engineering_retrieval_ranking
  lesson_ai_engineering_tool_calling["tool calling"]
  lesson_auth_security_authorization --> lesson_ai_engineering_tool_calling
  lesson_ai_engineering_agent_loop["agent loop"]
  lesson_ai_engineering_tool_calling --> lesson_ai_engineering_agent_loop
  lesson_ai_engineering_guardrails["guardrails"]
  lesson_auth_security_authorization --> lesson_ai_engineering_guardrails
  lesson_ai_engineering_hallucination_check["hallucination check"]
  lesson_ai_engineering_RAG --> lesson_ai_engineering_hallucination_check
  lesson_ai_engineering_evaluation["evaluation"]
  react_blueprint_Testing_Strategies --> lesson_ai_engineering_evaluation
  lesson_ai_engineering_fine_tuning_boundary["fine-tuning boundary"]
  lesson_ai_engineering_evaluation --> lesson_ai_engineering_fine_tuning_boundary
```

### Auth & Security - אימות, הרשאות וגבולות אבטחה

```mermaid
graph LR
  lesson_auth_security_authentication["authentication"]
  lesson_17_Request --> lesson_auth_security_authentication
  lesson_auth_security_authorization["authorization"]
  lesson_auth_security_authentication --> lesson_auth_security_authorization
  lesson_auth_security_session["session"]
  lesson_17_HTTP --> lesson_auth_security_session
  lesson_auth_security_cookie["cookie"]
  lesson_auth_security_session --> lesson_auth_security_cookie
  lesson_auth_security_secure_cookie["secure cookie"]
  lesson_auth_security_cookie --> lesson_auth_security_secure_cookie
  lesson_auth_security_JWT["JWT"]
  lesson_auth_security_authentication --> lesson_auth_security_JWT
  lesson_auth_security_access_token["access token"]
  lesson_auth_security_JWT --> lesson_auth_security_access_token
  lesson_auth_security_refresh_token["refresh token"]
  lesson_auth_security_access_token --> lesson_auth_security_refresh_token
  lesson_auth_security_OAuth["OAuth"]
  lesson_auth_security_authentication --> lesson_auth_security_OAuth
  lesson_auth_security_provider_auth["provider auth"]
  lesson_auth_security_OAuth --> lesson_auth_security_provider_auth
  lesson_auth_security_password_hashing["password hashing"]
  lesson_sql_orm_database --> lesson_auth_security_password_hashing
  lesson_auth_security_bcrypt["bcrypt"]
  lesson_auth_security_password_hashing --> lesson_auth_security_bcrypt
  lesson_auth_security_CSRF["CSRF"]
  lesson_auth_security_secure_cookie --> lesson_auth_security_CSRF
  lesson_auth_security_XSS_boundary["XSS boundary"]
  lesson_13_DOM --> lesson_auth_security_XSS_boundary
  lesson_auth_security_CORS["CORS"]
  lesson_17_HTTP --> lesson_auth_security_CORS
  lesson_auth_security_middleware_guard["middleware guard"]
  lesson_17_middleware --> lesson_auth_security_middleware_guard
  lesson_auth_security_Supabase_Auth["Supabase Auth"]
  lesson_auth_security_provider_auth --> lesson_auth_security_Supabase_Auth
  lesson_auth_security_Firebase_Auth["Firebase Auth"]
  lesson_auth_security_provider_auth --> lesson_auth_security_Firebase_Auth
  lesson_auth_security_Kinde_Appwrite["Kinde/Appwrite"]
  lesson_auth_security_provider_auth --> lesson_auth_security_Kinde_Appwrite
```

### Closures — סגירות (הגורם השכיח לבאגים ב-React)

```mermaid
graph LR
  lesson_closures_scope_chain["scope chain"]
  lesson_closures_lexical_scope["lexical scope"]
  lesson_closures_closure["closure"]
  lesson_closures_closure_variables["closure variables"]
  lesson_closures_stale_closure["stale closure"]
  lesson_closures_closure_in_event_handlers["closure in event handlers"]
  lesson_closures_closure_in_useEffect["closure in useEffect"]
  lesson_closures_closure_in_setTimeout["closure in setTimeout"]
```

### Design Systems - Tailwind, shadcn/UI ו-Accessible Primitives

```mermaid
graph LR
  lesson_design_systems_shadcn_UI["shadcn/UI"]
  lesson_25_Tailwind_CSS --> lesson_design_systems_shadcn_UI
  lesson_design_systems_Radix_primitives["Radix primitives"]
  lesson_html_css_foundations_accessibility_basics --> lesson_design_systems_Radix_primitives
  lesson_design_systems_accessible_primitive["accessible primitive"]
  lesson_html_css_foundations_accessibility_basics --> lesson_design_systems_accessible_primitive
  lesson_design_systems_design_tokens["design tokens"]
  lesson_25_utility_classes --> lesson_design_systems_design_tokens
  lesson_design_systems_component_variants["component variants"]
  react_blueprint_Component_Architecture --> lesson_design_systems_component_variants
  lesson_design_systems_cn_helper["cn helper"]
  lesson_25_utility_classes --> lesson_design_systems_cn_helper
  lesson_design_systems_cva["cva"]
  lesson_design_systems_component_variants --> lesson_design_systems_cva
  lesson_design_systems_asChild_slot["asChild slot"]
  lesson_html_css_foundations_semantic_HTML --> lesson_design_systems_asChild_slot
  lesson_design_systems_form_field_composition["form field composition"]
  lesson_html_css_foundations_label --> lesson_design_systems_form_field_composition
  lesson_design_systems_theme_tokens["theme tokens"]
  lesson_design_systems_design_tokens --> lesson_design_systems_theme_tokens
  lesson_design_systems_component_registry["component registry"]
  react_blueprint_Component_Architecture --> lesson_design_systems_component_registry
  lesson_design_systems_design_system_testing["design system testing"]
  react_blueprint_Testing_Strategies --> lesson_design_systems_design_system_testing
```

### DevOps Foundations - Vercel, Docker, CI/CD ו-Testing

```mermaid
graph LR
  lesson_devops_deploy_production_readiness["production readiness"]
  lesson_tooling_git_npm_scripts --> lesson_devops_deploy_production_readiness
  lesson_devops_deploy_environment_variables["environment variables"]
  lesson_auth_security_secure_cookie --> lesson_devops_deploy_environment_variables
  lesson_devops_deploy_Vercel_deploy["Vercel deploy"]
  lesson_tooling_git_GitHub_workflow --> lesson_devops_deploy_Vercel_deploy
  lesson_devops_deploy_preview_deployment["preview deployment"]
  lesson_tooling_git_pull_request --> lesson_devops_deploy_preview_deployment
  lesson_devops_deploy_build_command["build command"]
  lesson_tooling_git_npm_scripts --> lesson_devops_deploy_build_command
  lesson_devops_deploy_Docker["Docker"]
  lesson_16_Node_js --> lesson_devops_deploy_Docker
  lesson_devops_deploy_Dockerfile["Dockerfile"]
  lesson_devops_deploy_Docker --> lesson_devops_deploy_Dockerfile
  lesson_devops_deploy_image["image"]
  lesson_devops_deploy_Dockerfile --> lesson_devops_deploy_image
  lesson_devops_deploy_container["container"]
  lesson_devops_deploy_image --> lesson_devops_deploy_container
  lesson_devops_deploy_Docker_Compose["Docker Compose"]
  lesson_devops_deploy_container --> lesson_devops_deploy_Docker_Compose
  lesson_devops_deploy_service["service"]
  lesson_devops_deploy_Docker_Compose --> lesson_devops_deploy_service
  lesson_devops_deploy_volume["volume"]
  lesson_devops_deploy_service --> lesson_devops_deploy_volume
  lesson_devops_deploy_health_check["health check"]
  lesson_17_Status_Codes --> lesson_devops_deploy_health_check
  lesson_devops_deploy_CI["CI"]
  lesson_tooling_git_GitHub_workflow --> lesson_devops_deploy_CI
  lesson_devops_deploy_CD["CD"]
  lesson_devops_deploy_CI --> lesson_devops_deploy_CD
  lesson_devops_deploy_smoke_test["smoke test"]
  react_blueprint_Testing_Strategies --> lesson_devops_deploy_smoke_test
  lesson_devops_deploy_release_checklist["release checklist"]
  lesson_devops_deploy_production_readiness --> lesson_devops_deploy_release_checklist
```

### HTML/CSS Foundations — יסודות HTML ו-CSS

```mermaid
graph LR
  lesson_html_css_foundations_HTML_document["HTML document"]
  lesson_html_css_foundations_semantic_HTML["semantic HTML"]
  lesson_html_css_foundations_HTML_form["HTML form"]
  lesson_html_css_foundations_label["label"]
  lesson_html_css_foundations_CSS_selector["CSS selector"]
  lesson_html_css_foundations_cascade_and_specificity["cascade and specificity"]
  lesson_html_css_foundations_box_model["box model"]
  lesson_html_css_foundations_accessibility_basics["accessibility basics"]
```

### Nest.js Bridge - Modules, Controllers, Providers ו-DI

```mermaid
graph LR
  lesson_nestjs_Nest_js["Nest.js"]
  lesson_17_Express --> lesson_nestjs_Nest_js
  lesson_nestjs_module["module"]
  lesson_nestjs_Nest_js --> lesson_nestjs_module
  lesson_nestjs_controller["controller"]
  lesson_17_Route --> lesson_nestjs_controller
  lesson_nestjs_provider["provider"]
  lesson_nestjs_dependency_injection --> lesson_nestjs_provider
  lesson_nestjs_service["service"]
  lesson_nestjs_provider --> lesson_nestjs_service
  lesson_nestjs_dependency_injection["dependency injection"]
  lesson_13_class --> lesson_nestjs_dependency_injection
  lesson_nestjs_decorator["decorator"]
  lesson_26_TypeScript --> lesson_nestjs_decorator
  lesson_nestjs_DTO["DTO"]
  lesson_26_interface --> lesson_nestjs_DTO
  lesson_nestjs_validation_pipe["validation pipe"]
  lesson_18_validation --> lesson_nestjs_validation_pipe
  lesson_nestjs_guard["guard"]
  lesson_auth_security_authorization --> lesson_nestjs_guard
  lesson_nestjs_pipe["pipe"]
  lesson_17_Query_Parameters --> lesson_nestjs_pipe
  lesson_nestjs_middleware["middleware"]
  lesson_17_middleware --> lesson_nestjs_middleware
  lesson_nestjs_interceptor["interceptor"]
  lesson_nestjs_controller --> lesson_nestjs_interceptor
  lesson_nestjs_exception_filter["exception filter"]
  lesson_15_Error --> lesson_nestjs_exception_filter
  lesson_nestjs_repository_pattern["repository pattern"]
  lesson_sql_orm_ORM --> lesson_nestjs_repository_pattern
  lesson_nestjs_testing_module["testing module"]
  react_blueprint_Testing_Strategies --> lesson_nestjs_testing_module
```

### Next.js Full-Stack - Routing, SSR, API ו-SEO

```mermaid
graph LR
  lesson_nextjs_Next_js["Next.js"]
  lesson_21_React --> lesson_nextjs_Next_js
  lesson_nextjs_App_Router["App Router"]
  lesson_nextjs_Next_js --> lesson_nextjs_App_Router
  lesson_nextjs_file_system_routing["file-system routing"]
  lesson_nextjs_App_Router --> lesson_nextjs_file_system_routing
  lesson_nextjs_dynamic_route["dynamic route"]
  lesson_17_Request --> lesson_nextjs_dynamic_route
  lesson_nextjs_layout["layout"]
  lesson_21_props --> lesson_nextjs_layout
  lesson_nextjs_page["page"]
  lesson_nextjs_file_system_routing --> lesson_nextjs_page
  lesson_nextjs_server_component["server component"]
  lesson_sql_orm_database --> lesson_nextjs_server_component
  lesson_nextjs_client_component["client component"]
  lesson_22_useState --> lesson_nextjs_client_component
  lesson_nextjs_route_handler["route handler"]
  lesson_17_REST_API --> lesson_nextjs_route_handler
  lesson_nextjs_API_route["API route"]
  lesson_auth_security_authorization --> lesson_nextjs_API_route
  lesson_nextjs_server_action["server action"]
  lesson_auth_security_middleware_guard --> lesson_nextjs_server_action
  lesson_nextjs_SSR["SSR"]
  lesson_17_HTTP --> lesson_nextjs_SSR
  lesson_nextjs_SSG["SSG"]
  lesson_nextjs_dynamic_route --> lesson_nextjs_SSG
  lesson_nextjs_ISR["ISR"]
  lesson_nextjs_SSG --> lesson_nextjs_ISR
  lesson_nextjs_metadata_API["metadata API"]
  lesson_html_css_foundations_HTML_document --> lesson_nextjs_metadata_API
  lesson_nextjs_SEO["SEO"]
  lesson_nextjs_metadata_API --> lesson_nextjs_SEO
  lesson_nextjs_image_optimization["image optimization"]
  lesson_html_css_foundations_accessibility_basics --> lesson_nextjs_image_optimization
  lesson_nextjs_Vercel_deploy["Vercel deploy"]
  lesson_tooling_git_GitHub_workflow --> lesson_nextjs_Vercel_deploy
```

### SQL/PostgreSQL/ORM - בסיסי נתונים רלציוניים

```mermaid
graph LR
  lesson_sql_orm_SQL["SQL"]
  lesson_17_CRUD --> lesson_sql_orm_SQL
  lesson_sql_orm_PostgreSQL["PostgreSQL"]
  lesson_sql_orm_SQL --> lesson_sql_orm_PostgreSQL
  lesson_sql_orm_database["database"]
  lesson_16_Node_js --> lesson_sql_orm_database
  lesson_sql_orm_table["table"]
  lesson_sql_orm_database --> lesson_sql_orm_table
  lesson_sql_orm_row["row"]
  lesson_sql_orm_table --> lesson_sql_orm_row
  lesson_sql_orm_column["column"]
  lesson_sql_orm_table --> lesson_sql_orm_column
  lesson_sql_orm_primary_key["primary key"]
  lesson_sql_orm_column --> lesson_sql_orm_primary_key
  lesson_sql_orm_foreign_key["foreign key"]
  lesson_sql_orm_primary_key --> lesson_sql_orm_foreign_key
  lesson_sql_orm_relation["relation"]
  lesson_sql_orm_foreign_key --> lesson_sql_orm_relation
  lesson_sql_orm_JOIN["JOIN"]
  lesson_sql_orm_relation --> lesson_sql_orm_JOIN
  lesson_sql_orm_schema["schema"]
  lesson_sql_orm_table --> lesson_sql_orm_schema
  lesson_sql_orm_migration["migration"]
  lesson_sql_orm_schema --> lesson_sql_orm_migration
  lesson_sql_orm_ORM["ORM"]
  lesson_sql_orm_SQL --> lesson_sql_orm_ORM
  lesson_sql_orm_Prisma["Prisma"]
  lesson_sql_orm_ORM --> lesson_sql_orm_Prisma
  lesson_sql_orm_Drizzle["Drizzle"]
  lesson_sql_orm_ORM --> lesson_sql_orm_Drizzle
  lesson_sql_orm_CRUD["CRUD"]
  lesson_17_REST_API --> lesson_sql_orm_CRUD
  lesson_sql_orm_transaction["transaction"]
  lesson_sql_orm_CRUD --> lesson_sql_orm_transaction
```

### Tooling & Git — כלי פיתוח, Git וזרימת עבודה

```mermaid
graph LR
  lesson_tooling_git_Git["Git"]
  lesson_tooling_git_repository["repository"]
  lesson_tooling_git_working_tree["working tree"]
  lesson_tooling_git_staging_area["staging area"]
  lesson_tooling_git_commit["commit"]
  lesson_tooling_git_branch["branch"]
  lesson_tooling_git_pull_request["pull request"]
  lesson_tooling_git_GitHub_workflow["GitHub workflow"]
  lesson_tooling_git_npm_scripts["npm scripts"]
  lesson_tooling_git_ESLint["ESLint"]
  lesson_tooling_git_Prettier["Prettier"]
```

---

## סדר לימוד מומלץ

Topological order — מושגים שלא תלויים באף אחד מופיעים ראשונים.

**AI Engineering - OpenAI, Vercel AI SDK, RAG ו-Agents** — מושגי בסיס:
- evaluation

**Closures — סגירות (הגורם השכיח לבאגים ב-React)** — מושגי בסיס:
- scope chain
- lexical scope
- closure
- closure variables
- stale closure
- closure in event handlers
- closure in useEffect
- closure in setTimeout

**Design Systems - Tailwind, shadcn/UI ו-Accessible Primitives** — מושגי בסיס:
- component variants
- component registry
- design system testing

**DevOps Foundations - Vercel, Docker, CI/CD ו-Testing** — מושגי בסיס:
- smoke test

**HTML/CSS Foundations — יסודות HTML ו-CSS** — מושגי בסיס:
- HTML document
- semantic HTML
- HTML form
- label
- CSS selector
- cascade and specificity
- box model
- accessibility basics

**Nest.js Bridge - Modules, Controllers, Providers ו-DI** — מושגי בסיס:
- testing module

**Tooling & Git — כלי פיתוח, Git וזרימת עבודה** — מושגי בסיס:
- Git
- repository
- working tree
- staging area
- commit
- branch
- pull request
- GitHub workflow
- npm scripts
- ESLint
- Prettier

---

**סה"כ:** 145 מושגים · 118 תלויות · 10 שיעורים

**עודכן אוטומטית:** 2026-05-02T13:11:27.312Z