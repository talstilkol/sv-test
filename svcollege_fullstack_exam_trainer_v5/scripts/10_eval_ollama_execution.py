#!/usr/bin/env python3
"""Execution-based eval for Ollama answers using Express + Supertest.

This script asks the model for a CommonJS books router implementation and
evaluates it by running real HTTP tests against an in-memory Express app.
"""
from __future__ import annotations

import argparse
import asyncio
import json
import os
import re
import subprocess
from pathlib import Path
from typing import Any

import httpx
from rich.console import Console
from rich.table import Table

console = Console()

SYSTEM = "You are SVCollege Full-Stack Exam Coach. Answer in Hebrew, code in English."


def read_jsonl(path: Path) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    with path.open("r", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                records.append(json.loads(line))
    return records


def extract_js_code(answer: str) -> str:
    block = re.search(r"```(?:javascript|js)?\s*(.*?)```", answer, flags=re.DOTALL | re.IGNORECASE)
    if block:
        return block.group(1).strip()
    return answer.strip()


def normalize_router_code(code: str, express_path: str) -> str:
    normalized = code
    normalized = normalized.replace("require('express')", f"require({json.dumps(express_path)})")
    normalized = normalized.replace('require("express")', f"require({json.dumps(express_path)})")
    normalized = normalized.replace("require('../models/Book')", "require('./Book')")
    normalized = normalized.replace('require("../models/Book")', "require('./Book')")
    normalized = normalized.replace("require('./models/Book')", "require('./Book')")
    normalized = normalized.replace('require("./models/Book")', "require('./Book')")
    normalized = normalized.replace("export default router;", "module.exports = router;")

    if "module.exports = router;" not in normalized:
        normalized = normalized.rstrip() + "\n\nmodule.exports = router;\n"
    return normalized


def book_stub_code() -> str:
    return """const store = {
  "1": { _id: "1", title: "A", author: "John Doe", year: 2020, genre: "Fiction", isAvailable: true, borrowedBy: "" },
  "2": { _id: "2", title: "B", author: "Jane Doe", year: 2021, genre: "Science", isAvailable: false, borrowedBy: "Tal" }
};

class BookDoc {
  constructor(data) {
    Object.assign(this, data);
  }

  async save() {
    store[this._id] = { ...this };
    return { ...store[this._id] };
  }
}

module.exports = {
  async findById(id) {
    const row = store[id];
    return row ? new BookDoc({ ...row }) : null;
  },
  async find() {
    return Object.values(store).map((row) => ({ ...row }));
  }
};
"""


def eval_runner_code(supertest_path: str, express_path: str) -> str:
    return f"""const express = require({json.dumps(express_path)});
const supertest = require({json.dumps(supertest_path)});
const router = require('./router.js');

async function run() {{
  const app = express();
  app.use(express.json());
  app.use('/api/books', router);

  const checks = [];

  const res1 = await supertest(app).get('/api/books/1');
  checks.push({{
    name: 'GET existing by id',
    ok: res1.status === 200 && res1.body && res1.body._id === '1'
  }});

  const res2 = await supertest(app).get('/api/books/999');
  checks.push({{
    name: 'GET missing by id',
    ok: res2.status === 404
  }});

  const res3 = await supertest(app).post('/api/books/borrow/1');
  checks.push({{
    name: 'Borrow available book',
    ok: res3.status === 200 && res3.body && res3.body.isAvailable === false
  }});

  const res4 = await supertest(app).post('/api/books/borrow/2');
  checks.push({{
    name: 'Borrow unavailable book',
    ok: res4.status === 400
  }});

  const pass = checks.filter((c) => c.ok).length;
  const total = checks.length;
  process.stdout.write(JSON.stringify({{ pass, total, checks }}));
}}

run().catch((error) => {{
  process.stdout.write(JSON.stringify({{
    pass: 0,
    total: 4,
    checks: [],
    runtimeError: String(error && error.stack ? error.stack : error)
  }}));
  process.exit(1);
}});
"""


async def ask_ollama(client: httpx.AsyncClient, base_url: str, model: str, question: str) -> str:
    prompt = (
        "Return ONLY one complete CommonJS file for `server/routes/books.js`.\n"
        "Use `const express = require('express')`, `const router = express.Router()`, "
        "and `const Book = require('../models/Book')`.\n"
        "Must include:\n"
        "1) GET '/' list books\n"
        "2) GET '/:id' using Book.findById and 404 when not found\n"
        "3) POST '/borrow/:id' that fails with 400 when !isAvailable and sets isAvailable=false on success\n"
        "4) module.exports = router\n"
        "Question context:\n"
        f"{question}"
    )

    response = await client.post(
        f"{base_url}/api/chat",
        json={
            "model": model,
            "messages": [
                {"role": "system", "content": SYSTEM},
                {"role": "user", "content": prompt},
            ],
            "stream": False,
            "options": {"temperature": 0.1, "num_ctx": 32768},
        },
        timeout=180,
    )
    response.raise_for_status()
    data = response.json()
    return data.get("message", {}).get("content", "")


def run_execution_eval_case(
    case_dir: Path, router_code: str, supertest_path: str, express_path: str, workdir: Path
) -> tuple[int, int, list[dict[str, Any]], str | None]:
    case_dir = case_dir.resolve()
    case_dir.mkdir(parents=True, exist_ok=True)
    (case_dir / "Book.js").write_text(book_stub_code(), encoding="utf-8")
    (case_dir / "router.js").write_text(router_code, encoding="utf-8")
    (case_dir / "run_eval.js").write_text(
        eval_runner_code(supertest_path, express_path), encoding="utf-8"
    )

    completed = subprocess.run(
        ["node", str((case_dir / "run_eval.js").resolve())],
        cwd=str(workdir),
        capture_output=True,
        text=True,
        check=False,
    )

    raw = (completed.stdout or "").strip()
    if not raw:
        return 0, 4, [], completed.stderr.strip() or "Empty execution output"

    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError:
        return 0, 4, [], f"Invalid JSON output: {raw[:2000]}"

    return (
        int(parsed.get("pass", 0)),
        int(parsed.get("total", 4)),
        parsed.get("checks", []),
        parsed.get("runtimeError"),
    )


async def main_async() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", default=os.getenv("EXAM_MODEL", "svcollege-fullstack-exam"))
    parser.add_argument("--eval", type=Path, default=Path("data/eval/locked_eval.jsonl"))
    parser.add_argument("--topic", default="fullstack_books_edit_fetch")
    parser.add_argument("--limit", type=int, default=20)
    parser.add_argument("--out", type=Path, default=Path("outputs/eval/execution_eval.jsonl"))
    parser.add_argument("--cases-dir", type=Path, default=Path("outputs/eval/execution_cases"))
    parser.add_argument("--base-url", default=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"))
    parser.add_argument(
        "--verifier-dir",
        type=Path,
        default=Path("verifier/js"),
        help="Directory containing node_modules/supertest",
    )
    args = parser.parse_args()

    records = [r for r in read_jsonl(args.eval) if r.get("topic") == args.topic]
    if args.limit > 0:
        records = records[: args.limit]

    if not records:
        raise SystemExit(f"No eval records found for topic: {args.topic}")

    verifier_dir = args.verifier_dir.resolve()
    supertest_path = str((verifier_dir / "node_modules" / "supertest").resolve())
    express_path = str((verifier_dir / "node_modules" / "express").resolve())
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.cases_dir.mkdir(parents=True, exist_ok=True)

    results: list[dict[str, Any]] = []

    async with httpx.AsyncClient() as client:
        for rec in records:
            answer = await ask_ollama(client, args.base_url, args.model, rec["question"])
            extracted = extract_js_code(answer)
            router_code = normalize_router_code(extracted, express_path=express_path)

            case_id = str(rec.get("id", "case")).replace("/", "_")
            case_dir = args.cases_dir / case_id
            passed, total, checks, runtime_error = run_execution_eval_case(
                case_dir=case_dir,
                router_code=router_code,
                supertest_path=supertest_path,
                express_path=express_path,
                workdir=verifier_dir,
            )
            score = int(round((passed / total) * 100)) if total else 0

            result = {
                "id": rec.get("id"),
                "topic": rec.get("topic"),
                "question": rec.get("question"),
                "score": score,
                "passed": passed,
                "total": total,
                "checks": checks,
                "runtime_error": runtime_error,
                "answer": answer,
            }
            results.append(result)
            console.print(f"{rec.get('id')}: {score} ({passed}/{total})")

    with args.out.open("w", encoding="utf-8") as f:
        for rec in results:
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")

    avg = sum(r["score"] for r in results) / max(1, len(results))
    table = Table(title="SVCollege Execution Eval")
    table.add_column("Metric")
    table.add_column("Value")
    table.add_row("Model", args.model)
    table.add_row("Topic", args.topic)
    table.add_row("Questions", str(len(results)))
    table.add_row("Average", f"{avg:.1f}")
    console.print(table)


def main() -> None:
    asyncio.run(main_async())


if __name__ == "__main__":
    main()
