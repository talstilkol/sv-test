# Qwen3-Coder-Next Detailed Training Plan - 5:1 Cooldown Protocol

## Goal

Turn Qwen3-Coder-Next into a local exam agent that can:
1. predict likely FullStack exam question types with probability bands;
2. test student mastery of the material;
3. write runnable React + Express + MongoDB exam projects under strict validation and runtime checks.

No fine-tuning starts until enough verified data exists. First priority is measured drills, scorecards, static/runtime guards and failure repair.

## Cooling Rule

Every training cycle uses the live ratio requested by the user:

- 1 minute machine rest for every 5 minutes active work.
- If work ends early, cooldown is proportional.
- Example: 2.5 minutes work requires 0.5 minutes cooldown.

During the 5-minute rest:
- stop Ollama generation;
- do not run `npm install`;
- do not run `npm run build`;
- do not run browser/UI smoke;
- do not run multiple agents;
- only read notes or step away.

Recommended cooldown command when Qwen was active:

```bash
ollama stop qwen3-coder-next:latest
```

If a run is still active at minute 20:
- let the current response finish only if it is close to completion;
- otherwise stop after the current safe checkpoint;
- record partial output as `timeout/cooling interruption`;
- resume after cooldown.

## Daily Structure

Each day has 6 cycles. A full 20-minute cycle now has a 4-minute cooldown.

| Cycle | Minutes | Purpose |
|---:|---:|---|
| 1 | 20 work + 4 rest | Forecast or recall drill |
| 2 | 20 work + 4 rest | Backend drill |
| 3 | 20 work + 4 rest | Frontend drill |
| 4 | 20 work + 4 rest | Validation drill |
| 5 | 20 work + 4 rest | JS/TS drill |
| 6 | 20 work + 4 rest | Guard, scorecard, repair prompt |

Total active compute: 120 minutes.
Total cooling at full cycle length: 24 minutes.

Full project simulations use 8-10 cycles, still with 5-minute rest after every 20 minutes.

## Numbered Execution Roadmap

Total plan length: **14 stages**.

Total estimated time including cooldowns: **41 hours 40 minutes**.

Time unit:
- normal stage: 6 cycles x 25 minutes = 150 minutes = 2 hours 30 minutes.
- full simulation stage: 10 cycles x 25 minutes = 250 minutes = 4 hours 10 minutes.

### 1. Stage 1 of 14 - Setup and Rules

Estimated time: 2 hours 30 minutes.

Work:
1. Build probability taxonomy from the materials.
2. Drill allowed vs forbidden prep.
3. Write backend setup from memory.
4. Write frontend setup from memory.
5. Debug env/cors/express.json failures.
6. Write scorecard and weak points.

Progress marker:
- We are at stage **1/14**.
- Time left after this stage: **39 hours 10 minutes**.

### 2. Stage 2 of 14 - Backend CRUD

Estimated time: 2 hours 30 minutes.

Work:
1. Write one Mongoose model.
2. Write GET all / GET by id.
3. Write POST with backend validation.
4. Write PUT with backend validation.
5. Write DELETE and filter/custom route.
6. Run static + syntax checks.

Progress marker:
- We are at stage **2/14**.
- Time left after this stage: **36 hours 40 minutes**.

### 3. Stage 3 of 14 - Frontend Core

Estimated time: 2 hours 30 minutes.

Work:
1. Write BrowserRouter + Routes.
2. Write Login.
3. Write List page with search/toggle.
4. Write Add page.
5. Write Edit page with useParams.
6. Build and repair frontend failures.

Progress marker:
- We are at stage **3/14**.
- Time left after this stage: **34 hours 10 minutes**.

### 4. Stage 4 of 14 - Validation Mastery

Estimated time: 2 hours 30 minutes.

Work:
1. Text/name validations.
2. Enum validations.
3. Number/date validations.
4. Uniqueness checks.
5. Business rules.
6. Critic pass for missing validations.

Progress marker:
- We are at stage **4/14**.
- Time left after this stage: **31 hours 40 minutes**.

### 5. Stage 5 of 14 - JavaScript Patterns

Estimated time: 2 hours 30 minutes.

Work:
1. Stats object.
2. Sequence sum.
3. Series detection.
4. Ordered subarray.
5. Matrix/counts.
6. Edge cases and thrown errors.

Progress marker:
- We are at stage **5/14**.
- Time left after this stage: **29 hours 10 minutes**.

### 6. Stage 6 of 14 - TypeScript Patterns

Estimated time: 2 hours 30 minutes.

Work:
1. interface/type.
2. Partial filters.
3. keyof dynamic access.
4. generics.
5. type guards.
6. React props/events.

Progress marker:
- We are at stage **6/14**.
- Time left after this stage: **26 hours 40 minutes**.

### 7. Stage 7 of 14 - Full Simulation: SV Library

Estimated time: 4 hours 10 minutes.

Work:
1. Requirements extraction.
2. Backend model/routes/server.
3. Backend validation.
4. API checklist.
5. Frontend routing/pages.
6. Frontend validation.
7. JS answer.
8. TS answer.
9. Materialize + static guard.
10. Runtime evaluator + repair.

Progress marker:
- We are at stage **7/14**.
- Time left after this stage: **22 hours 30 minutes**.

### 8. Stage 8 of 14 - Full Simulation: SV Team Manager

Estimated time: 4 hours 10 minutes.

Work:
1. Requirements extraction.
2. Member model.
3. Member routes.
4. role/status/skills validations.
5. React pages.
6. Search/status/toggle.
7. JS statistics.
8. TS filterMembers.
9. Materialize + static guard.
10. Runtime evaluator + repair.

Progress marker:
- We are at stage **8/14**.
- Time left after this stage: **18 hours 20 minutes**.

### 9. Stage 9 of 14 - Full Simulation: SV Appointments

Estimated time: 4 hours 10 minutes.

Work:
1. Requirements extraction.
2. Appointment model.
3. Appointment routes.
4. conflict validation.
5. status/toggle route.
6. React pages.
7. date/time validation.
8. JS/TS answers.
9. Materialize + static guard.
10. Runtime evaluator + repair.

Progress marker:
- We are at stage **9/14**.
- Time left after this stage: **14 hours 10 minutes**.

### 10. Stage 10 of 14 - Failure Repair Day

Estimated time: 2 hours 30 minutes.

Work:
1. Frontend build failure repair.
2. Backend dependency failure repair.
3. API 404/500 repair.
4. Validation repair.
5. Route contract repair.
6. Score before/after comparison.

Progress marker:
- We are at stage **10/14**.
- Time left after this stage: **11 hours 40 minutes**.

### 11. Stage 11 of 14 - Probability Reports

Estimated time: 2 hours 30 minutes.

Work:
1. Build probability report.
2. Run critic pass.
3. Convert report to drills.
4. Convert report to quiz.
5. Mark unknown/unavailable assumptions.
6. Score the forecast.

Progress marker:
- We are at stage **11/14**.
- Time left after this stage: **9 hours 10 minutes**.

### 12. Stage 12 of 14 - Tournament Day

Estimated time: 2 hours 30 minutes.

Work:
1. Run complexity gate.
2. Generate answer A.
3. Generate answer B only if machine is cool.
4. Compare by static/runtime score.
5. Repair winner only.
6. Save DPO pair if one answer is clearly better.

Progress marker:
- We are at stage **12/14**.
- Time left after this stage: **6 hours 40 minutes**.

### 13. Stage 13 of 14 - Timed Mock Exam

Estimated time: 4 hours 10 minutes.

Work:
1. Requirements extraction.
2. Backend.
3. API checks.
4. Frontend routing.
5. Add/Edit forms.
6. Validations.
7. JS.
8. TS.
9. Runtime evaluation.
10. Final repair.

Progress marker:
- We are at stage **13/14**.
- Time left after this stage: **2 hours 30 minutes**.

### 14. Stage 14 of 14 - Final Readiness

Estimated time: 2 hours 30 minutes.

Work:
1. Oral quiz.
2. Backend from scratch.
3. Frontend from scratch.
4. JS/TS sprint.
5. Debug sprint.
6. Final scorecard.

Progress marker:
- We are at stage **14/14**.
- Time left after this stage: **0 minutes**.

## Live Status Format

At the start of every work block, report status like this:

```text
Current status:
- Stage: X/14
- Block: Y/Z inside this stage
- Current block time: 20 minutes work + 5 minutes cooldown
- Estimated time left in this stage: HH:MM
- Estimated time left in full program: HH:MM
- Next cooldown: at minute 20
```

Example:

```text
Current status:
- Stage: 7/14 - Full Simulation: SV Library
- Block: 3/10
- Current block time: 20 minutes work + 5 minutes cooldown
- Estimated time left in this stage: 3 hours 20 minutes
- Estimated time left in full program: 25 hours 50 minutes
- Next cooldown: at minute 20
```

## Track A - Exam Probability Intelligence

Purpose: teach Qwen to estimate what may appear in the exam, without inventing exact exam questions.

### Cycle A1 - Source Mining

Prompt Qwen:

```text
Based only on the supplied exam materials, extract a taxonomy of likely exam tasks.
Group by React, Express, MongoDB, validations, JavaScript, TypeScript and debugging.
For each item, give probability band: 100%, 90%, 70%, 40%.
Do not invent exact future questions.
Return evidence from the source and what to practice.
```

Expected output:
- `probability-report.md`
- table of topics;
- probability band;
- source evidence;
- practice drill;
- uncertainty.

Score:
- 25 points: no invented exact questions.
- 25 points: covers project/JS/TS.
- 25 points: correct probability bands from source patterns.
- 25 points: actionable drills.

### Cycle A2 - Forecast Critic

Prompt Qwen:

```text
Review your probability report.
Find overconfident claims, missing evidence and invented assumptions.
Rewrite the report with conservative wording.
Use unknown/unavailable where evidence is missing.
```

Pass condition:
- no hallucinated APIs;
- no invented exam questions;
- every high-probability topic has evidence.

### Weekly Forecast Gate

Qwen passes Track A only after 3 reports score 90+.

## Track B - Mastery Checker

Purpose: make Qwen an examiner that checks whether the student really knows the material.

### Cycle B1 - Recall Quiz

Prompt:

```text
Create a 30-question recall quiz for the FullStack exam.
Cover: allowed prep, React pages, Express routes, validations, JS patterns, TS patterns and debug.
Ask one question at a time.
After each answer, grade strictly and explain the missing point in one sentence.
```

Scoring:
- 20: exam structure and allowed prep.
- 20: React.
- 20: Express/Mongo.
- 20: validations.
- 10: JS.
- 10: TS.

### Cycle B2 - Recognition Drill

Prompt:

```text
Give me 10 broken snippets or short descriptions.
I must identify the bug.
Include issues such as missing BrowserRouter, missing express.json, missing cors, missing backend validation, hardcoded API URL, missing status codes and wrong route.
Do not include the answer until I respond.
```

Pass condition:
- 8/10 correct in under 15 minutes.

### Cycle B3 - Production Drill

Prompt:

```text
Give me one entity and requirements.
I will write: Mongoose model, CRUD routes, React list page, shared Add/Edit form, frontend validation and backend validation.
Grade by the 70-point project rubric.
```

Pass condition:
- 60/70 project score before hints.

### Cycle B4 - JS/TS Drill

Prompt:

```text
Give me 5 JavaScript questions and 3 TypeScript questions from the exam patterns.
For JS require input validation and edge cases.
For TS require interface/type, Partial, keyof or generics when relevant.
Grade strictly.
```

Pass condition:
- 18/20 JS.
- 9/10 TS.

### Cycle B5 - Debug Drill

Prompt:

```text
Give me real-looking failure logs from build/API/runtime.
I must identify root cause and smallest fix.
Do not ask for a rewrite.
Grade only by whether the fix addresses the log.
```

Pass condition:
- 8/10 failures fixed correctly.

## Track C - Actual Code Writing Agent

Purpose: make Qwen output runnable project files, not just Markdown that looks correct.

### Mandatory Output Contract

Qwen must output every file in a fenced block with a path:

```text
server/package.json
server/server.js
server/models/Entity.js
server/routes/entity.routes.js
client/package.json
client/index.html
client/src/main.jsx
client/src/App.jsx
client/src/pages/ListPage.jsx
client/src/pages/AddPage.jsx
client/src/pages/EditPage.jsx
client/src/components/EntityForm.jsx
client/src/services/api.js
client/src/utils/stats.js
client/src/types/entity.ts
```

Hard requirements:
- backend before frontend;
- no endpoints outside the contract;
- no seed data;
- no native random API;
- all POST/PUT validations in frontend and backend;
- `VITE_API_URL` in frontend API calls;
- `BrowserRouter` explicitly in frontend;
- `client/index.html` must point to the actual `src/main.jsx`;
- backend must include `server/package.json` if it imports Express/Mongoose/CORS.

### Cycle C1 - Mini Backend

20-minute task:

```text
Build only backend for one entity.
Include package.json, server.js, model, routes, validations, status codes.
No frontend.
```

Then cooldown.

Guard:
- static route contract;
- node --check.

### Cycle C2 - Mini Frontend

20-minute task:

```text
Build only frontend for the same entity.
Include package.json, index.html, main.jsx, App.jsx, pages, shared form, API service.
Use VITE_API_URL.
```

Then cooldown.

Guard:
- materialize;
- npm install/build only inside output folder.

### Cycle C3 - Validation Stress

20-minute task:

```text
List all validations for the current entity.
Write frontend validator and backend guard.
Include duplicate checks and business rules.
```

Then cooldown.

Guard:
- compare required fields to code;
- reject missing frontend/backend validation.

### Cycle C4 - JS/TS

20-minute task:

```text
Write JS stats function and TS filter function for the entity.
Include Array.isArray, throw new Error, interface, Partial<Entity>, keyof if needed.
```

Then cooldown.

Guard:
- syntax check;
- token check;
- edge-case review.

### Cycle C5 - Full Materialization

20-minute task:

```text
Return the complete project as file-bundle Markdown.
No prose-only files. No missing package.json or index.html.
```

Then cooldown.

Run:

```bash
npm run qwen:materialize -- output/qwen-coder-next/<run>/qwen-response.md --summary
npm run qwen:evaluate -- output/qwen-coder-next/<run>/materialized-project --contract docs/qwen-coder-next-training/contracts/<contract>.json --write --summary
```

### Cycle C6 - Runtime Evaluation

20-minute task:

```bash
npm run qwen:evaluate:runtime -- output/qwen-coder-next/<run>/materialized-project --contract docs/qwen-coder-next-training/contracts/<contract>.json
```

Then cooldown.

If runtime fails:
- do not rewrite manually;
- save logs;
- feed logs to repair cycle after cooldown.

### Cycle C7 - Repair

Prompt:

```text
Repair only these failures.
Use the materialized file list.
Return corrected fenced code blocks with exact paths.
If a module is missing, return the required package.json file.
If frontend entry is wrong, use the actual main file from the file list.
Do not answer with install commands only.
```

Then re-materialize and evaluate.

## 14-Day Training Schedule

### Day 1 - Setup and Rules

Cycles:
1. probability taxonomy.
2. allowed/forbidden prep quiz.
3. backend setup from memory.
4. frontend setup from memory.
5. debug missing env/cors/express.json.
6. scorecard and weak points.

Pass goal:
- no confusion about what is allowed before exam.

### Day 2 - Backend CRUD

Entity rotation:
- Book.
- Member.
- Appointment.

Cycles:
1. model only.
2. routes only.
3. validations only.
4. status codes and try/catch.
5. API smoke checklist.
6. repair from logs.

Pass goal:
- backend static + node syntax 90+.

### Day 3 - Frontend Core

Cycles:
1. BrowserRouter/App routes.
2. Login.
3. List/search/toggle.
4. Add/Edit shared form.
5. API service through VITE_API_URL.
6. build failure repair.

Pass goal:
- frontend build succeeds after materialization.

### Day 4 - Validation Mastery

Cycles:
1. text/name validations.
2. enum validations.
3. numeric/date validations.
4. uniqueness.
5. business rules.
6. critic finds missing validation.

Pass goal:
- no missing frontend/backend validation in 3 drills.

### Day 5 - JavaScript

Cycles:
1. stats object.
2. sequence sum.
3. series detection.
4. ordered subarray.
5. matrix/counts.
6. edge cases and thrown errors.

Pass goal:
- 18/20 or higher.

### Day 6 - TypeScript

Cycles:
1. interface/type.
2. Partial filters.
3. keyof dynamic access.
4. generics.
5. type guards.
6. React props/events.

Pass goal:
- 9/10 or higher.

### Day 7 - Full Simulation: SV Library

8-10 cycles with cooldown:
1. requirements extraction.
2. backend.
3. backend validation.
4. API checklist.
5. frontend routing/pages.
6. frontend validation.
7. JS/TS.
8. materialize + static guard.
9. runtime evaluator.
10. repair.

Pass goal:
- runtime score 90+.

### Day 8 - Full Simulation: SV Team Manager

Same structure.

Pass goal:
- no invented endpoints.
- skills/status/role validations complete.

### Day 9 - Full Simulation: SV Appointments

Same structure.

Pass goal:
- conflict rule and toggle/status route correct.

### Day 10 - Failure Repair Day

Use only actual logs from Days 7-9.

Cycles:
1. frontend build failure.
2. backend dependency failure.
3. API 404/500 failure.
4. validation failure.
5. route contract failure.
6. final repair comparison.

Pass goal:
- repair improves score in 80% of failures.

### Day 11 - Probability Reports

Cycles:
1. probability report from all sources.
2. critic pass.
3. drill plan from report.
4. student quiz from report.
5. unknown/unavailable cleanup.
6. score.

Pass goal:
- 90+ forecast report.

### Day 12 - Tournament Day

If machine temperature is stable:
- run two shorter Qwen outputs for same task, not three.
- choose by guard score.
- repair only winner.

If machine is hot:
- skip tournament and do one output only.

Pass goal:
- compare quality without overloading hardware.

### Day 13 - Mock Exam

Full timed mock.
Use cooldown every 20 minutes.

Pass goal:
- 90+ runtime score.
- JS 18+.
- TS 9+.

### Day 14 - Final Readiness

Cycles:
1. oral quiz.
2. backend from scratch.
3. frontend from scratch.
4. JS/TS sprint.
5. debug sprint.
6. final scorecard.

Pass goal:
- 90+ in three consecutive full simulations.

## Fine-Tuning Data Collection

After each run, save:
- prompt.md
- qwen-response.md
- materialized-project
- static guard report
- runtime evaluation report
- repair prompt
- repair response
- score before/after

Only add to training dataset if:
- static guard passes;
- runtime score is 90+;
- repair improves score;
- no invented endpoints;
- no missing validation.

Fine-tuning begins only after:
- 200 verified full answers;
- 100 verified repair examples;
- 100 chosen/rejected DPO pairs;
- 50 probability reports;
- 50 critic reports.

## Hardware Protection Policy

Stop immediately if:
- fans stay high after cooldown;
- response latency rises sharply;
- npm install/build hangs repeatedly;
- model run exceeds planned cycle by more than 10 minutes;
- machine feels too hot to continue.

Recovery:
1. stop Ollama;
2. close dev servers;
3. wait 10-15 minutes;
4. resume with a lighter drill, not full simulation.

## Daily Scorecard Template

```text
Date:
Day:
Cycles completed:
Cooling breaks completed:
Model runs:

Track A forecast score:
Track B mastery score:
Track C runtime score:

Static guard:
Materialized files:
Build:
Backend smoke:
UI/manual:

Top 3 failures:
1.
2.
3.

Next session focus:
1.
2.
3.
```
