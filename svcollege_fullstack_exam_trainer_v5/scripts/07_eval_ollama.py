#!/usr/bin/env python3
"""Evaluate an Ollama model on locked SVCollege eval JSONL."""
from __future__ import annotations

import argparse
import asyncio
import json
import os
from pathlib import Path
from typing import Any

import httpx
from rich.console import Console
from rich.table import Table

console = Console()

SYSTEM = "You are SVCollege Full-Stack Exam Coach. Answer in Hebrew, code in English."


def read_jsonl(path: Path) -> list[dict[str, Any]]:
    records = []
    with path.open("r", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                records.append(json.loads(line))
    return records


async def ask_ollama(
    client: httpx.AsyncClient, base_url: str, model: str, question: str, topic: str
) -> str:
    system = SYSTEM
    if topic == "fullstack_books_edit_fetch":
        system = (
            f"{SYSTEM} "
            "For library edit-flow answers explicitly include: "
            "GET /api/books/:id, router.get('/:id'), Book.findById(req.params.id), "
            "404, 500, err.message, CORS, proxy."
        )
    response = await client.post(
        f"{base_url}/api/chat",
        json={
            "model": model,
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": question},
            ],
            "stream": False,
            "options": {"temperature": 0, "top_p": 0.7, "seed": 42, "num_ctx": 32768},
        },
        timeout=180,
    )
    response.raise_for_status()
    data = response.json()
    return data.get("message", {}).get("content", "")


def simple_score(answer: str, rubric: dict[str, Any]) -> tuple[int, list[str], list[str]]:
    answer_lower = answer.lower()
    must_include = rubric.get("must_include", [])
    must_not_include = rubric.get("must_not_include", [])
    missing = [x for x in must_include if str(x).lower() not in answer_lower]
    forbidden = [x for x in must_not_include if str(x).lower() in answer_lower]
    score = 100
    score -= len(missing) * 15
    score -= len(forbidden) * 25
    if "מלכודת" not in answer and "trap" not in answer_lower:
        score -= 10
    if "```" not in answer and any(word in answer_lower for word in ["code", "קוד", "function", "const", "react"]):
        score -= 10
    return max(0, min(100, score)), missing, forbidden


async def main_async() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", default=os.getenv("EXAM_MODEL", "svcollege-fullstack-exam"))
    parser.add_argument("--eval", type=Path, default=Path("data/eval/locked_eval.jsonl"))
    parser.add_argument("--out", type=Path, default=Path("outputs/eval/latest_predictions.jsonl"))
    parser.add_argument("--base-url", default=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"))
    args = parser.parse_args()

    records = read_jsonl(args.eval)
    args.out.parent.mkdir(parents=True, exist_ok=True)

    results: list[dict[str, Any]] = []
    async with httpx.AsyncClient() as client:
        for rec in records:
            question = rec["question"]
            answer = await ask_ollama(
                client, args.base_url, args.model, question, rec.get("topic", "")
            )
            score, missing, forbidden = simple_score(answer, rec.get("rubric", {}))
            results.append({
                "id": rec.get("id"),
                "topic": rec.get("topic"),
                "score": score,
                "missing": missing,
                "forbidden": forbidden,
                "question": question,
                "answer": answer,
            })
            console.print(f"{rec.get('id')}: {score}")

    with args.out.open("w", encoding="utf-8") as f:
        for r in results:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")

    avg = sum(r["score"] for r in results) / max(1, len(results))
    table = Table(title="SVCollege Eval")
    table.add_column("Metric")
    table.add_column("Value")
    table.add_row("Model", args.model)
    table.add_row("Questions", str(len(results)))
    table.add_row("Average", f"{avg:.1f}")
    console.print(table)


def main() -> None:
    asyncio.run(main_async())


if __name__ == "__main__":
    main()
