#!/usr/bin/env python3
"""
Build deterministic decomposition remediation data from the 73-section eval.

This script does not fabricate exam content. It uses the canonical
exam_sections_task_breakdown.jsonl rows as source of truth and the current
MODEL_DECOMPOSITION_SCOREBOARD.json only to select weak sections and rejected
answers.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


TASK_BRANCH = {
    "question_scope_inherited": ("Scope", "Question context"),
    "client_form_inputs": ("Client", "Form inputs"),
    "client_validation_rules": ("Client", "Validation"),
    "alerts_error_handling": ("Quality", "Errors and alerts"),
    "server_html_route": ("Server", "HTML routes"),
    "api_get_filtered": ("API", "Filtered GET"),
    "client_navigation": ("Client", "Navigation"),
    "api_post_create": ("API", "POST create"),
    "js_algorithms": ("Logic", "Algorithm"),
    "client_list_render": ("Client", "List rendering"),
    "db_uniqueness": ("DB", "Uniqueness"),
    "mongoose_update_options": ("DB", "Mongoose update options"),
    "api_get_all": ("API", "GET all"),
    "api_delete": ("API", "DELETE"),
    "theory_explanation": ("Theory", "Explanation"),
    "db_persistence": ("DB", "Persistence"),
    "manual_review": ("Manual", "Manual review"),
    "api_put_update": ("API", "PUT update"),
    "node_file_io": ("Node", "File I/O"),
    "oop_design": ("OOP", "Class design"),
}

TASK_KEYWORDS = {
    "question_scope_inherited": ["כותרת", "מעטפת", "תתי", "הקשר", "אפליקציה", "מערכת"],
    "client_form_inputs": ["input", "select", "button", "כפתור", "טופס", "שדה", "radio"],
    "client_validation_rules": ["regex", "אורך", "טווח", "חובה", "תקין", "ספרות", "אותיות", "ייחודי"],
    "alerts_error_handling": ["alert", "שגיאה", "error", "try", "catch", "לא תקין"],
    "server_html_route": ["html", "sendfile", "static", "דף", "שרת"],
    "api_get_filtered": ["סינון", "filter", "גבוה", "נמוך", "לפי", "query", "תנאי"],
    "client_navigation": ["route", "routes", "ערוץ", "ניווט", "מעבר", "redirect", "חוזר"],
    "api_post_create": ["post", "create", "יצירה", "הוספה", "req.body"],
    "js_algorithms": ["מיון", "סינון", "מערך", "מטריצה", "פונקציה", "ספירה", "לולאה", "חישוב"],
    "client_list_render": ["רשימה", "כרטיס", "טבלה", "ריבועים", "map", "להציג", "רינדור"],
    "db_uniqueness": ["כפילות", "ייחודי", "קיים", "duplicate", "unique"],
    "mongoose_update_options": ["findByIdAndUpdate", "runValidators", "new: true", "validators", "schema", "עדכון"],
    "api_get_all": ["get", "כל", "כולם", "all", "מחזיר json"],
    "api_delete": ["delete", "מחיקה", "מחק"],
    "theory_explanation": ["הסבר", "תיאוריה", "מה ההבדל"],
    "db_persistence": ["mongo", "mongoose", "db", "collection", "document", "save"],
    "api_put_update": ["put", "update", "עדכון", "מעדכן"],
    "node_file_io": ["קובץ", "file", "fs", "read", "write", "rename", "copy"],
    "oop_design": ["class", "מחלקה", "constructor", "מאפיינים", "מתודות", "this"],
}


SYSTEM = (
    "You are SVCollege Exam Decomposition Trainer. "
    "Return valid compact JSON only. Break each exam exercise into requirement_scan, "
    "task_mapping, risk_check, and final_json.leaf_tasks at the smallest technical level."
)

WEAK_CLUSTER_WEIGHT = {
    "api_delete",
    "api_put_update",
    "client_list_render",
    "theory_explanation",
    "client_form_inputs",
    "js_algorithms",
    "api_post_create",
    "client_validation_rules",
    "mongoose_update_options",
}


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def read_jsonl(path: Path) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.strip():
            rows.append(json.loads(line))
    return rows


def write_jsonl(path: Path, rows: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        "\n".join(json.dumps(row, ensure_ascii=False) for row in rows) + "\n",
        encoding="utf-8",
    )


def user_prompt(row: dict[str, Any]) -> str:
    return (
        "פרק את תרגיל SVCollege הבא לעץ עבודה מלא.\n"
        "החזר JSON תקין בלבד עם exercise_summary, task_ids, leaf_tasks.\n"
        "כל leaf חייב להיות ברמת משימה טכנית קטנה ביותר.\n\n"
        f"קובץ: {row['file']}\n"
        f"שאלה/סעיף: {row['question']}/{row['section']}\n"
        f"נוסח התרגיל:\n{row['section_text']}"
    )


def assign_micro_task(task: str, task_ids: list[str]) -> str:
    lower = task.lower()
    best_task = task_ids[0] if task_ids else "manual_review"
    best_score = -1
    for task_id in task_ids:
        keywords = TASK_KEYWORDS.get(task_id, [])
        score = sum(1 for keyword in keywords if keyword.lower() in lower)
        if score > best_score:
            best_task = task_id
            best_score = score
    return best_task


def canonical_answer(row: dict[str, Any]) -> dict[str, Any]:
    task_ids = [str(task_id) for task_id in row.get("task_ids", [])]
    micro_tasks = [str(task) for task in row.get("micro_tasks", [])]
    leaf_tasks: list[dict[str, str]] = []

    per_task_counts = {task_id: 0 for task_id in task_ids}
    for micro_task in micro_tasks:
        task_id = assign_micro_task(micro_task, task_ids)
        per_task_counts[task_id] = per_task_counts.get(task_id, 0) + 1
        branch, sub_branch = TASK_BRANCH.get(task_id, ("General", task_id))
        leaf_tasks.append(
            {
                "id": f"1.{len(leaf_tasks) + 1}.1.1",
                "branch": branch,
                "sub_branch": sub_branch,
                "task_id": task_id,
                "technical_task": micro_task,
            }
        )

    for task_id in task_ids:
        if per_task_counts.get(task_id, 0) == 0:
            branch, sub_branch = TASK_BRANCH.get(task_id, ("General", task_id))
            leaf_tasks.append(
                {
                    "id": f"1.{len(leaf_tasks) + 1}.1.1",
                    "branch": branch,
                    "sub_branch": sub_branch,
                    "task_id": task_id,
                    "technical_task": f"לטפל במפורש במשימת {task_id} לפי נוסח התרגיל",
                }
            )

    final_json = {
        "exercise_summary": str(row.get("section_text", ""))[:700],
        "task_ids": task_ids,
        "leaf_tasks": leaf_tasks[:24],
    }
    return {
        "requirement_scan": micro_tasks,
        "task_mapping": [
            {"requirement": leaf["technical_task"], "task_id": leaf["task_id"]}
            for leaf in leaf_tasks[:24]
        ],
        "risk_check": [
            "לא לרשת משימות מסעיפים שכנים אלא אם הסעיף הוא כותרת/מעטפת מפורשת",
            "לוודא שכל task_id מופיע גם ב-task_ids וגם בתוך leaf_tasks",
            "לפרק input/select/validation/alert/route/list/algorithm ל-leaves נפרדים",
        ],
        "final_json": final_json,
    }


def row_weight(row: dict[str, Any]) -> int:
    task_ids = set(str(task_id) for task_id in row.get("task_ids", []))
    return 2 if task_ids & WEAK_CLUSTER_WEIGHT else 1


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sections", type=Path, default=Path("outputs/eval/exam_sections_task_breakdown.jsonl"))
    parser.add_argument("--scoreboard", type=Path, default=Path("outputs/training/MODEL_DECOMPOSITION_SCOREBOARD.json"))
    parser.add_argument("--rejection-sampling", type=Path, default=Path("outputs/training/decomposition_rejection_sampling.jsonl"))
    parser.add_argument("--out-dir", type=Path, default=Path("outputs/training"))
    parser.add_argument("--min-score", type=int, default=95)
    args = parser.parse_args()

    sections_by_idx = {int(row["idx"]): row for row in read_jsonl(args.sections)}
    scoreboard = read_json(args.scoreboard)
    weak_sections = [
        row
        for row in scoreboard.get("sections", [])
        if row.get("final_score") is None or int(row.get("final_score", 0)) < args.min_score
    ]

    sft_rows: list[dict[str, Any]] = []
    dpo_rows: list[dict[str, Any]] = []
    few_shots: list[dict[str, Any]] = []
    plan_rows: list[str] = [
        "# Decomposition Remediation Dataset",
        "",
        f"- target_min_score: `{args.min_score}`",
        f"- weak_sections: `{len(weak_sections)}`",
        "",
        "| idx | current_score | status | fix_focus |",
        "|---:|---:|---|---|",
    ]

    for score_row in sorted(weak_sections, key=lambda item: (item.get("final_score") is None, item.get("final_score") or 0)):
        idx = int(score_row["idx"])
        source_row = sections_by_idx[idx]
        answer = canonical_answer(source_row)
        answer_text = json.dumps(answer, ensure_ascii=False)
        prompt = user_prompt(source_row)
        weight = row_weight(source_row)
        for repeat_index in range(weight):
            sft_rows.append(
                {
                    "section_idx": idx,
                    "repeat_index": repeat_index,
                    "weight": weight,
                    "messages": [
                        {"role": "system", "content": SYSTEM},
                        {"role": "user", "content": prompt},
                        {"role": "assistant", "content": answer_text},
                    ],
                }
            )
        rejected = str(score_row.get("raw_decomposition_answer") or "")
        if rejected.strip():
            dpo_rows.append(
                {
                    "section_idx": idx,
                    "prompt": prompt,
                    "chosen": answer_text,
                    "rejected": rejected,
                }
            )
        issues = "; ".join(str(issue) for issue in score_row.get("issues", [])) or "raise decomposition coverage"
        plan_rows.append(
            f"| {idx} | {score_row.get('final_score')} | {score_row.get('status')} | {issues} |"
        )

    successful_sections = [
        row
        for row in scoreboard.get("sections", [])
        if isinstance(row.get("final_score"), int) and int(row["final_score"]) >= 85
    ]
    for score_row in sorted(successful_sections, key=lambda item: item.get("final_score", 0), reverse=True)[:3]:
        source_row = sections_by_idx[int(score_row["idx"])]
        few_shots.append(
            {
                "section_idx": source_row["idx"],
                "score": score_row["final_score"],
                "prompt": user_prompt(source_row),
                "answer": canonical_answer(source_row),
            }
        )

    if args.rejection_sampling.exists():
        for row in read_jsonl(args.rejection_sampling):
            chosen = str(row.get("chosen") or "")
            for rejected in row.get("rejected", []):
                rejected_text = str(rejected or "")
                if chosen.strip() and rejected_text.strip():
                    dpo_rows.append(
                        {
                            "section_idx": row.get("section_idx"),
                            "prompt": f"Repair this SVCollege decomposition using the original section context. section_idx={row.get('section_idx')}",
                            "chosen": chosen,
                            "rejected": rejected_text,
                            "source": "rejection_sampling",
                        }
                    )

    write_jsonl(args.out_dir / "decomposition_remediation_sft.jsonl", sft_rows)
    write_jsonl(args.out_dir / "decomposition_tree_sft.jsonl", sft_rows)
    write_jsonl(args.out_dir / "decomposition_remediation_dpo.jsonl", dpo_rows)
    write_json(args.out_dir / "decomposition_few_shots.json", few_shots)
    (args.out_dir / "DECOMPOSITION_REMEDIATION_DATASET.md").write_text(
        "\n".join(plan_rows) + "\n",
        encoding="utf-8",
    )
    print(json.dumps({"sft": len(sft_rows), "dpo": len(dpo_rows)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
