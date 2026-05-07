# MASTER EXECUTION PLAN V5 — SVCollege Full‑Stack Exam Only

## Mission

Build a narrow, high‑precision local training and tutoring pipeline for SVCollege Full‑Stack exam preparation.

The target is not general intelligence. The target is exam mastery.

The local model should become excellent at:

- JavaScript fundamentals
- arrays, objects, functions, DOM, events, localStorage/sessionStorage
- errors, closures, async, promises, fetch, event loop
- React components, props, map, useState, immutable updates
- React hooks: useEffect, useRef, useMemo
- React Router, useNavigate, useParams, Context API
- Node.js, npm, modules, fs
- Express, middleware, GET/POST/PUT/DELETE, status codes
- MongoDB, Mongoose, CRUD, operators
- TypeScript, types, enums, tuples, function return types, React props/state typing
- Tailwind basics
- Full‑stack project tasks in SVCollege style

---

## Main Correction vs Previous Plans

Previous plans were too broad. They mixed:

- Cabinet AI‑OS architecture
- autonomous agents
- enterprise observability
- GraphRAG infrastructure
- ML factory design
- production deployment

This version removes anything that does not improve exam performance.

---

## Architecture

```text
Course Files
   ↓
Text Extractor
   ↓
SVCollege Topic Taxonomy
   ↓
RAG Index
   ↓
SFT Dataset Builder
   ↓
DPO Trap Pair Builder
   ↓
Locked Eval
   ↓
Qwen3‑Coder‑Next via Ollama
   ↓
Verifier: JS/React/Express/TS rules
   ↓
MLX LoRA only if it improves locked eval
   ↓
Daily Drill Coach
```

---

## Sprints

### Sprint 0 — Environment & Model Setup

**Goal:** Prepare M4 Max 128GB for local exam training.

Deliverables:

- install script
- Python venv
- Node verifier toolchain
- Ollama model pull
- custom Ollama Modelfile
- state file

Acceptance criteria:

- `ollama run qwen3-coder-next` works
- `python -c "import mlx_lm"` works
- `pnpm --dir verifier/js test` works

---

### Sprint 1 — Course Corpus Extraction

**Goal:** Extract all lesson PDFs, homework PDFs, TXT and Markdown files into clean chunks.

Chunk fields:

```json
{
  "source_path": "...",
  "source_title": "Lesson 22",
  "topic": "react_state",
  "subtopic": "immutable_updates",
  "difficulty": "medium",
  "exam_relevance": 5,
  "text": "...",
  "chunk_hash": "..."
}
```

Rules:

- Do not OCR unless extraction fails.
- Preserve Hebrew text.
- Keep code snippets.
- Never load giant files into memory unnecessarily.

---

### Sprint 2 — Topic Taxonomy & Rubric

**Goal:** Map every chunk to an exam topic.

Core topics:

- `js_variables_types`
- `js_arrays_loops`
- `js_objects_dom_events`
- `js_storage_errors`
- `js_async_fetch_event_loop`
- `react_components_props_map`
- `react_state_immutable`
- `react_hooks_effect_ref_memo`
- `react_router_context`
- `node_npm_fs_modules`
- `express_crud_middleware_status`
- `mongodb_mongoose_crud`
- `typescript_basics`
- `react_typescript_tailwind`
- `fullstack_project_patterns`

---

### Sprint 3 — RAG Baseline

**Goal:** Let Qwen answer using relevant course chunks before any LoRA.

Why:

- RAG reduces hallucinations.
- RAG adapts to the teacher’s style.
- RAG is reversible and safer than training.

Acceptance criteria:

- The model cites which course topic it used.
- The answer follows the exam answer template.
- The answer includes one exam trap.

---

### Sprint 4 — Locked Eval

**Goal:** Build a test set that never enters training.

Minimum locked eval:

```text
40 JavaScript basics
40 Arrays/Objects/DOM
40 Async/Fetch/Errors
50 React basics/state
40 Hooks/Router/Context
40 Express
40 MongoDB
40 TypeScript
40 Full‑stack projects
40 Exam traps
```

Rules:

- Store at `data/eval/locked_eval.jsonl`.
- Never train on this file.
- Keep answer rubric separate from model input.

---

### Sprint 5 — SFT Dataset

**Goal:** Teach answer style and exam structure.

Every SFT answer must include:

1. Simple explanation in Hebrew
2. Correct code in English
3. Why this solves the exam requirement
4. Common trap
5. Short self‑check

---

### Sprint 6 — DPO Trap Pairs

**Goal:** Teach the model to reject wrong patterns.

Examples:

- `items.push()` on React state vs `setItems(prev => [...prev, item])`
- `forEach(async () => ...)` vs `for...of` / `Promise.all`
- `req.body` vs `req.params` vs `req.query`
- missing `express.json()`
- `useEffect` without dependency array when fetching
- direct fetch in component body
- `any` in TypeScript without narrowing
- Mongo `_id` vs `id`

---

### Sprint 7 — Verifier

**Goal:** Automatically catch exam mistakes.

Verifier checks:

- JavaScript syntax
- TypeScript compile
- React state mutation patterns
- Express route structure
- required status codes
- async anti‑patterns
- Mongo/Mongoose CRUD shape
- testable examples

---

### Sprint 8 — MLX LoRA

**Goal:** Train a small LoRA adapter only after RAG + Verifier are working.

Training strategy:

- Small rank
- Short context first
- High quality dataset only
- No locked eval leakage
- Compare before/after

Promotion rule:

```text
Promote only if total score improves >= 3%
and no major topic regresses by more than 2%.
```

---

### Sprint 9 — Daily Drill Coach

**Goal:** Make the system train the student every day.

Daily flow:

1. 10 flash questions
2. 3 code questions
3. 1 full‑stack mini task
4. one “trap question”
5. feedback and weak topic list

---

## Final Success Definition

The system is successful when it consistently gives better SVCollege‑style answers than the base model on the locked eval, and helps the student explain the solution without memorizing blindly.

