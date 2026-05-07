#!/usr/bin/env python3
"""Analyze what separates successful and weak decomposition sections."""

from __future__ import annotations

import argparse
import json
from collections import Counter, defaultdict
from pathlib import Path
from statistics import mean
from typing import Any


KEYWORDS = [
    "input",
    "select",
    "button",
    "אינפוט",
    "כפתור",
    "ערוץ",
    "route",
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "Mongo",
    "DB",
    "מערך",
    "מטריצה",
    "פונקציה",
    "class",
    "מחלקה",
    "alert",
    "שגיאה",
    "regex",
    "טווח",
]


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def bucket_stats(rows: list[dict[str, Any]]) -> dict[str, Any]:
    if not rows:
        return {}
    keyword_counts: Counter[str] = Counter()
    task_counts: Counter[str] = Counter()
    issue_counts: Counter[str] = Counter()
    for row in rows:
        text = str(row.get("section_text", ""))
        for keyword in KEYWORDS:
            if keyword.lower() in text.lower():
                keyword_counts[keyword] += 1
        for task_id in row.get("task_ids", []):
            task_counts[str(task_id)] += 1
        for issue in row.get("issues", []):
            issue_counts[str(issue)] += 1
    return {
        "count": len(rows),
        "avg_final": round(mean(float(row.get("final_score") or 0) for row in rows), 2),
        "avg_text_length": round(mean(len(str(row.get("section_text", ""))) for row in rows), 2),
        "avg_task_ids": round(mean(len(row.get("task_ids", [])) for row in rows), 2),
        "avg_leaf_average": round(mean(float(row.get("leaf_average_score") or 0) for row in rows), 2),
        "top_keywords": keyword_counts.most_common(12),
        "top_task_ids": task_counts.most_common(12),
        "top_issues": issue_counts.most_common(12),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--scoreboard", type=Path, default=Path("outputs/training/MODEL_DECOMPOSITION_SCOREBOARD.json"))
    parser.add_argument("--out", type=Path, default=Path("outputs/training/DECOMPOSITION_SUCCESS_PATTERN_ANALYSIS.json"))
    args = parser.parse_args()

    sections = read_json(args.scoreboard).get("sections", [])
    successful = [row for row in sections if isinstance(row.get("final_score"), int) and int(row["final_score"]) >= 85]
    weak = [row for row in sections if not isinstance(row.get("final_score"), int) or int(row["final_score"]) < 85]
    payload = {
        "successful_ge85": bucket_stats(successful),
        "weak_lt85": bucket_stats(weak),
        "recommendations": [
            "Use few-shot examples from successful_ge85 with similar text length and task count.",
            "For weak sections with many expected task_ids, run two-stage decomposition before scoring.",
            "For short weak sections, avoid inherited parent tasks unless the text is an explicit heading.",
            "Add rejection sampling for sections with missing task_ids or invalid JSON.",
        ],
    }
    write_json(args.out, payload)
    md = [
        "# Decomposition Success Pattern Analysis",
        "",
        f"- successful_ge85: `{payload['successful_ge85'].get('count', 0)}`",
        f"- weak_lt85: `{payload['weak_lt85'].get('count', 0)}`",
        f"- successful_avg_text_length: `{payload['successful_ge85'].get('avg_text_length', 0)}`",
        f"- weak_avg_text_length: `{payload['weak_lt85'].get('avg_text_length', 0)}`",
        f"- successful_avg_task_ids: `{payload['successful_ge85'].get('avg_task_ids', 0)}`",
        f"- weak_avg_task_ids: `{payload['weak_lt85'].get('avg_task_ids', 0)}`",
        "",
        "## Recommendations",
        "",
        *[f"- {item}" for item in payload["recommendations"]],
    ]
    args.out.with_suffix(".md").write_text("\n".join(md) + "\n", encoding="utf-8")
    print(json.dumps({"successful_ge85": len(successful), "weak_lt85": len(weak)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
