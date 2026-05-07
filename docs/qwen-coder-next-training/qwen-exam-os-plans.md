# Qwen Exam OS - Training, Evaluation and Fine-Tuning Plans

## Position

Do not fine-tune immediately. First build a verified training/evaluation loop. Fine-tuning on unverified model answers will teach the model to sound confident, not to pass the exam.

Current strategy:
1. Agent drill + static/runtime guards.
2. Collect verified good answers and verified failure repairs.
3. Train LoRA/DPO adapters only after enough passing examples exist.
4. Keep the base Qwen model intact; use adapters for exam-specific behavior.

The architecture follows the Cabinet AI-OS idea:
- L0: telemetry, scorecards, prompt registry.
- L2: supervisor, complexity gate, tournament only for hard tasks.
- L4: GraphRAG over exam materials and code patterns.
- L6: fail-fast guards: static -> install/build -> API/UI smoke.
- L7: dataset registry, DPO pairs, LoRA, regression eval, canary.

## Program 1 - Exam Question Probability Intelligence

Goal: make Qwen predict what question types are likely, with uncertainty, without inventing exact exam questions.

### Input Sources

- FullStack guide v2.
- FullStack guide v1.
- simulation solutions.
- official allowed-materials document.
- training plan for Claude/Qwen.
- every future simulation result and failure report.

### Taxonomy

Every possible exam item is tagged by:
- area: React, Express, MongoDB, validation, JS, TS, setup/debug.
- task type: build, fix, explain, write function, type function, add route, add page.
- entity type: Book, Player, Member, Appointment, Trip, Volunteer, Travel Log.
- validation type: required, regex, enum, range, uniqueness, business rule.
- expected files: backend model/routes/server, frontend App/pages/components/services, JS utility, TS file.
- risk level: easy to forget, likely runtime failure, likely scoring failure.

### Probability Bands

These are training priors from the supplied material, not guaranteed predictions.

100%:
- React pages: Login, List/Home, Add, Edit.
- Express CRUD routes.
- MongoDB/Mongoose model.
- frontend + backend validation.
- useState/useEffect.
- useNavigate/useParams.
- JS array/function question.
- TS interface/type + typed function.

90%:
- search/filter/toggle in list page.
- duplicate validation.
- enum validation.
- 400/404/500 status codes.
- shared Add/Edit form.
- API base URL through VITE_API_URL.
- controlled forms.

70%:
- custom business route such as borrow/toggle/status route.
- role/status/category aggregations.
- keyof / Partial filters in TS.
- advanced JS pattern: sequence, subarray, matrix, series detection.

40%:
- styling depth.
- register/auth beyond simple login.
- deployment details.
- advanced generic abstractions.

### Output Qwen Must Produce

For every forecast:
- probability band.
- evidence from source material.
- what to practice.
- what files/routes/pages it affects.
- failure modes.
- confidence: high/medium/low.
- unknown/unavailable when evidence is missing.

### Evaluation

Qwen gets weekly forecast tasks. We score:
- no invented exact questions.
- correct probability band.
- covers project/JS/TS.
- turns forecast into drills.
- identifies high-risk validations.

Passing gate: 90/100 on three forecast reports.

## Program 2 - Material Mastery Checker

Goal: test whether the student knows the material deeply enough to build under time pressure.

### Mastery Layers

Layer A - Recall:
- name required pages.
- name required backend routes.
- list status codes.
- explain frontend/backend validation split.
- list JS/TS recurring patterns.

Layer B - Recognition:
- identify missing BrowserRouter.
- identify missing express.json/cors.
- identify hardcoded API URL.
- identify missing backend validation.
- identify route outside contract.

Layer C - Production:
- write a model from requirements.
- write CRUD routes.
- write controlled form.
- write list/search/toggle.
- write JS function with edge cases.
- write TS interface + filter function.

Layer D - Debug:
- read a build error.
- read an API error.
- fix missing dependency.
- fix Vite entry.
- fix CORS.
- fix Mongoose connection.

### Daily Test Format

Each test has 100 points:
- 20: requirements recall.
- 25: backend/API knowledge.
- 25: frontend/validation knowledge.
- 20: JS/TS knowledge.
- 10: debug response.

### Qwen Roles

1. Examiner: asks questions and grades only by rubric.
2. Drill Coach: gives focused drills for weak areas.
3. Critic: finds missing validations/routes/pages.
4. Repair Coach: gives failure logs and asks for minimal fixes only.

### Required Artifacts

For every session:
- quiz.md
- answers.md
- score.json
- weak-points.md
- next-drills.md

### Promotion Gate

Student is ready only after:
- 95+ in recall.
- 90+ in production.
- 90+ in debug.
- no repeated validation failures across three sessions.

## Program 3 - Actual Exam Code Writing Agent

Goal: make Qwen write runnable exam answers in file-bundle format, under strict contract and runtime checks.

### Operating Protocol

1. Read requirements.
2. Extract entity, fields, validations, pages, routes.
3. Backend first.
4. API routes with status codes and try/catch.
5. Frontend routing and pages.
6. Shared form for Add/Edit.
7. JS answer.
8. TS answer.
9. Run commands and manual checklist.

### Mandatory Output Format

Every source file must be a fenced code block with a path:
- server/package.json
- server/server.js
- server/models/Entity.js
- server/routes/entity.routes.js
- client/package.json
- client/index.html
- client/src/main.jsx
- client/src/App.jsx
- client/src/pages/*.jsx
- client/src/components/*.jsx
- client/src/services/api.js
- client/src/utils/*.js
- client/src/types/*.ts

### Fail-Fast Guard Chain

1. Static contract guard:
   - no native random API.
   - no fabricated data markers.
   - no invented endpoints.
   - all required tokens/routes/status codes exist.

2. Materializer:
   - extracts Markdown into a real project.
   - rejects unsafe paths.
   - writes materialization report.

3. Runtime evaluator:
   - node --check for backend/scripts.
   - npm install only inside generated output.
   - npm run build for frontend.
   - backend smoke for GET endpoints.

4. Repair loop:
   - Qwen receives only failure logs and materialized file list.
   - Qwen returns corrected files, not prose only.
   - re-materialize and rerun evaluator.

### Complexity Gate

Simple task:
- one direct answer from Qwen.

Medium task:
- Qwen answer + critic pass.

Hard full project:
- tournament of 2 answers if compute allows.
- select by static/runtime score.
- repair only the winning output.

### Exam Legality Rule

Use Qwen in the actual exam only where the exam rules allow AI/tool assistance. If AI is not allowed in a section, Qwen is for preparation, drills and allowed materials only.

## Fine-Tuning / LoRA Plan

### Do Not Train On

- unverified Qwen answers.
- answers that only pass Markdown/static checks.
- repair answers that do not improve runtime score.
- code with missing validations.
- code with invented endpoints.

### Dataset Types

1. Instruction dataset:
   - prompt: exam requirement.
   - answer: full file-bundle project.
   - label: static pass, runtime pass, score.

2. Repair dataset:
   - prompt: failure logs + file list.
   - answer: minimal corrected files.
   - label: score before/after.

3. DPO preference dataset:
   - chosen: answer that passes build/API/validation.
   - rejected: answer with missing route, missing validation, wrong file path, or invented endpoint.

4. Critic dataset:
   - input: generated project.
   - output: missing route/page/validation/runtime risk.

5. Probability dataset:
   - input: source materials.
   - output: probability bands with evidence and uncertainty.

### Adapter Plan

Adapter A - Exam Forecaster:
- predicts probability band and drill plan.

Adapter B - Validation Critic:
- finds missing frontend/backend validations.

Adapter C - Project Builder:
- produces strict file-bundle project.

Adapter D - Runtime Repair:
- fixes build/API errors from logs.

### Minimum Data Before Training

- 200 verified instruction examples.
- 100 verified repair examples.
- 100 DPO pairs.
- 50 probability reports.
- 50 critic reports.

### Quality Gate

No adapter is promoted unless:
- baseline Qwen score improves by 5+ points.
- three full simulations are 90+.
- no regression in no-invented-endpoints.
- no regression in validation coverage.
- runtime repair improves score on at least 80% of held-out failures.

## Next Implementation Steps

1. Build probability taxonomy JSON.
2. Build mastery quiz runner.
3. Add file-completeness contract for client/index.html and server/package.json.
4. Add repair prompt with file tree and exact failure logs.
5. Collect 30 verified simulations before any LoRA.
6. Start DPO pair collection from failed vs fixed Qwen outputs.
