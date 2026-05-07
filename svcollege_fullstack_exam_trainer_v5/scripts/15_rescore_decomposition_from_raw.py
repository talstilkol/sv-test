#!/usr/bin/env python3
"""Rescore saved decomposition raw answers after scorer/rubric fixes.

This is memory-safe: it does not call Ollama. It rereads the latest saved raw
decomposition answer per section, applies the current scorer, and appends a new
section row so the regular merge step can rebuild the scoreboards.
"""
from __future__ import annotations

import argparse
import importlib.util
import json
from pathlib import Path
from typing import Any


def read_jsonl(path: Path) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    if not path.exists():
        return rows
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.strip():
            rows.append(json.loads(line))
    return rows


def append_jsonl(path: Path, row: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as f:
        f.write(json.dumps(row, ensure_ascii=False) + "\n")


def load_eval_module(script_path: Path) -> Any:
    spec = importlib.util.spec_from_file_location("leaf_eval", script_path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load evaluator module from {script_path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sections", type=Path, default=Path("outputs/eval/exam_sections_task_breakdown.jsonl"))
    parser.add_argument("--scoreboard-jsonl", type=Path, default=Path("outputs/training/MODEL_DECOMPOSITION_SCOREBOARD.jsonl"))
    parser.add_argument("--evaluator", type=Path, default=Path("scripts/12_eval_leaf_task_mastery.py"))
    parser.add_argument("--start-idx", type=int, default=1)
    parser.add_argument("--end-idx", type=int, default=73)
    args = parser.parse_args()

    evaluator = load_eval_module(args.evaluator)
    source_by_idx = {int(row["idx"]): row for row in read_jsonl(args.sections)}
    latest_by_idx: dict[int, dict[str, Any]] = {}
    for row in read_jsonl(args.scoreboard_jsonl):
        idx = int(row.get("idx", 0))
        if args.start_idx <= idx <= args.end_idx:
            latest_by_idx[idx] = row

    rescored = 0
    for idx in sorted(latest_by_idx):
        original = latest_by_idx[idx]
        source = source_by_idx.get(idx, original)
        raw = str(original.get("raw_decomposition_answer", ""))
        parsed = evaluator.extract_json(raw)
        understanding, decomposition, issues = evaluator.score_decomposition(source, parsed, raw)
        leaf_average = original.get("leaf_average_score")
        blocked = any(task in evaluator.MANUAL_TASKS for task in source.get("task_ids", []))
        final_score, status = evaluator.exercise_status(understanding, decomposition, leaf_average, blocked)
        row = {
            "section_key": str(idx),
            "idx": idx,
            "file": source.get("file", original.get("file")),
            "question": source.get("question", original.get("question")),
            "section": source.get("section", original.get("section")),
            "section_text": source.get("section_text", original.get("section_text")),
            "task_ids": source.get("task_ids", original.get("task_ids", [])),
            "exercise_understanding_score": understanding,
            "decomposition_score": decomposition,
            "leaf_average_score": leaf_average,
            "final_score": final_score,
            "status": status,
            "issues": issues,
            "raw_decomposition_answer": raw,
            "rescore_note": "rescored from saved raw decomposition answer with current scorer",
        }
        append_jsonl(args.scoreboard_jsonl, row)
        rescored += 1

    print(f"rescored={rescored}")


if __name__ == "__main__":
    main()
