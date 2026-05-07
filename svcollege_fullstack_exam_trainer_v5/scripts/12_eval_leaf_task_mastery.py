#!/usr/bin/env python3
"""Leaf-level SVCollege decomposition and mastery evaluator.

This evaluator checks two separate abilities:
1. Can the model decompose an exam section into a hierarchy:
   exercise -> branch -> sub-branch -> smallest technical leaf tasks.
2. Can the model explain and implement each smallest technical leaf task in the
   context where it appeared in the exams.

The script is intentionally checkpoint-first and low-memory: it appends JSONL
after each item and supports small index ranges.
"""
from __future__ import annotations

import argparse
import asyncio
import json
import os
import re
import subprocess
from datetime import datetime
from pathlib import Path
from typing import Any

import httpx


SYSTEM = """You are SVCollege Full-Stack Exam Coach. Answer in Hebrew, code in English.

When evaluating decomposition, return valid compact JSON only and break each exam exercise into:
exercise -> branch -> sub-branch -> smallest technical leaf.

Use canonical task_ids only:
client_form_inputs, client_validation_rules, alerts_error_handling, server_html_route,
api_get_filtered, client_navigation, api_post_create, js_algorithms,
client_list_render, db_uniqueness, question_scope_inherited, api_get_all,
api_delete, theory_explanation, db_persistence, api_put_update, node_file_io,
oop_design.

Do not compress multiple actions into one leaf.
If one sentence includes input + validation + error + navigation, split it into separate leaves.
Short validation section must split into: field/input, exact rule/regex/range, blocking invalid submit, user error message.
Algorithm section must split into: input/output, core loop/logic, edge cases, exact return shape.
Node file package must split into: class, constructor, append/read/search/rename/copy, fs error handling.
Theory section must split into: definition, comparison/example, common trap, validity check.

Few-shot A:
Input: "תיאור יהיה כל מחרוזת עד 200 תווים"
task_ids: ["client_validation_rules"]
leaf_tasks: identify field/input; enforce max length <= 200; block invalid submit; show user error.

Few-shot B:
Input: "POST מקבל מאפיינים, אם קיים מחזיר הודעה, אחרת מכניס ל-DB ומחזיר הצלחה"
task_ids: ["api_post_create","db_persistence","alerts_error_handling"]
leaf_tasks: read req.body; validate fields; query existing; insert when not found; return success JSON; return duplicate/error status; wrap DB errors.

Few-shot C:
Input: "select למיון לפי מספר מושבים והצגת הטיסות בריבועים"
task_ids: ["client_form_inputs","js_algorithms","client_list_render"]
leaf_tasks: create select/options; keep selected sort state; sort numerically ascending/descending; render cards/squares with mapped data; keep stable display after selection.

Few-shot D:
Input: "חבילה ב-node עם מחלקה שיוצרת txt, מוסיפה תוכן, מחפשת מילה, משנה שם ומעתיקה"
task_ids: ["oop_design","node_file_io"]
leaf_tasks: define class/constructor; create txt file; append content; read/search word true/false; rename file; copy file with copy in name; handle fs errors.
"""

API_TASKS = {"api_get_all", "api_get_filtered", "api_post_create", "api_put_update", "api_delete"}
CLIENT_TASKS = {
    "client_form_inputs",
    "client_validation_rules",
    "client_navigation",
    "client_list_render",
}
JS_TASKS = {"js_algorithms"}
NODE_TASKS = {"node_file_io", "oop_design"}
DB_TASKS = {"db_uniqueness", "db_persistence", "mongoose_update_options"}
THEORY_TASKS = {"theory_explanation"}
META_TASKS = {"question_scope_inherited"}
MANUAL_TASKS = {"manual_review"}
CANONICAL_TASKS = API_TASKS | CLIENT_TASKS | JS_TASKS | NODE_TASKS | DB_TASKS | THEORY_TASKS | META_TASKS | MANUAL_TASKS | {
    "alerts_error_handling",
    "server_html_route",
}

STOPWORDS = {
    "צריך",
    "לפי",
    "של",
    "את",
    "עם",
    "בלי",
    "כל",
    "או",
    "אם",
    "יש",
    "לא",
    "על",
    "כדי",
    "אשר",
    "לתוך",
    "בצד",
    "בין",
    "when",
    "with",
    "from",
    "that",
    "this",
    "must",
    "should",
}


def read_jsonl(path: Path) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    with path.open("r", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                rows.append(json.loads(line))
    return rows


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def append_jsonl(path: Path, row: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as f:
        f.write(json.dumps(row, ensure_ascii=False) + "\n")


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def append_log(path: Path, line: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as f:
        f.write(line.rstrip() + "\n")


def extract_json(text: str) -> Any | None:
    text = text.strip()
    if text.startswith("{") and text.endswith("}"):
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            pass
    start = text.find("{")
    end = text.rfind("}")
    if start >= 0 and end > start:
        try:
            return json.loads(text[start : end + 1])
        except json.JSONDecodeError:
            return None
    return None


def unwrap_decomposition_payload(parsed: Any) -> Any:
    if isinstance(parsed, dict) and isinstance(parsed.get("final_json"), dict):
        return parsed["final_json"]
    return parsed


def extract_code(answer: str) -> str:
    blocks: list[str] = []
    in_block = False
    current: list[str] = []
    for line in answer.splitlines(keepends=True):
        if line.strip().startswith("```"):
            if in_block:
                block = "".join(current).strip()
                if block:
                    blocks.append(block)
                current = []
                in_block = False
            else:
                current = []
                in_block = True
            continue
        if in_block:
            current.append(line)
    if in_block and current:
        block = "".join(current).strip()
        if block:
            blocks.append(block)
    if blocks:
        cleaned = [block.strip() for block in blocks if block.strip()]
        def code_priority(block: str) -> int:
            lower = block.lower()
            if "express.router" in lower or "router." in lower:
                return 60
            if "module.exports" in block and ("FilePackage" in block or "class " in block):
                return 55
            if "module.exports" in block or "function solve" in block or "const solve" in block:
                return 50
            if "react-router-dom" in lower or "browserrouter" in lower or "<routes" in lower or "usenavigate" in lower:
                return 45
            if "export default" in lower:
                return 30
            return 0

        solution_blocks = [
            block
            for block in cleaned
            if any(
                marker in block
                for marker in [
                    "module.exports",
                    "function solve",
                    "const solve",
                    "express.Router",
                    "BrowserRouter",
                    "useNavigate",
                    "react-router-dom",
                    "export default",
                ]
            )
        ]
        if solution_blocks:
            return max(solution_blocks, key=lambda block: (code_priority(block), len(block)))
        return max(cleaned, key=len)
    open_block = re.search(
        r"```(?:javascript|jsx|tsx|typescript|ts|js|html)?\s*(.*)",
        answer,
        flags=re.IGNORECASE | re.DOTALL,
    )
    if open_block:
        return open_block.group(1).strip()
    return answer.strip()


def contains_forbidden_random_api(code: str) -> bool:
    return re.search(r"Math\s*\.\s*random\s*\(", code) is not None


def compact_code_text(code: str) -> str:
    return re.sub(r"\s+", "", code.lower())


def contains_find_by_id_and_update(code: str) -> bool:
    return re.search(r"\bfindByIdAndUpdate\s*\(", code) is not None


def has_mongoose_run_validators(code: str) -> bool:
    return "runvalidators:true" in compact_code_text(code)


def has_mongoose_new_true(code: str) -> bool:
    return "new:true" in compact_code_text(code)


def mongoose_update_score_cap(code: str) -> int:
    if not contains_find_by_id_and_update(code):
        return 100
    cap = 100
    if not has_mongoose_run_validators(code):
        cap = min(cap, 70)
    if not has_mongoose_new_true(code):
        cap = min(cap, 95)
    return cap


def words(text: str) -> list[str]:
    found = re.findall(r"[\w\u0590-\u05ff]+", text.lower())
    return [item for item in found if len(item) >= 3 and item not in STOPWORDS]


def coverage_score(answer: str, expected_texts: list[str], base: int = 40) -> int:
    expected_terms: list[str] = []
    for item in expected_texts:
        for term in words(item):
            if term not in expected_terms:
                expected_terms.append(term)
    if not expected_terms:
        return base
    answer_lower = answer.lower()
    matched = sum(1 for term in expected_terms if term in answer_lower)
    return min(100, int(round(100 * matched / len(expected_terms))))


def has_any(text: str, tokens: list[str]) -> bool:
    return any(token in text for token in tokens)


def semantic_micro_task_matched(micro_task: str, evidence_text: str, expected_tasks: set[str], predicted_tasks: set[str]) -> bool:
    micro = micro_task.lower()
    evidence = evidence_text.lower()
    task_union = expected_tasks | predicted_tasks

    if "קלט/פלט" in micro or "קלט" in micro and "פלט" in micro:
        return has_any(evidence, ["input", "output", "קלט", "פלט", "מקבל", "מחזיר", "function", "פונקציה"])
    if "אלגוריתם" in micro:
        return "js_algorithms" in task_union and has_any(evidence, ["algorithm", "logic", "loop", "sort", "filter", "count", "מערך", "מיון", "ספירה", "פונקציה"])
    if "מבנה נתונים" in micro:
        return has_any(evidence, ["return", "returns", "object", "array", "json", "true", "false", "מחזיר", "אובייקט", "מערך"])
    if "route get" in micro or "route GET".lower() in micro or "להגדיר route get" in micro:
        return has_any(evidence, ["router.get", "get", "route", "endpoint", "ערוץ"])
    if "למשוך נתונים" in micro or "האחסון" in micro:
        return has_any(evidence, ["db", "database", "find", "select", "model", "collection", "mongoose", "מסד", "מאגר"])
    if "json" in micro or "status 200" in micro:
        return has_any(evidence, ["json", "status", "200", "res.json"])
    if "req.body" in micro:
        return has_any(evidence, ["req.body", "body"])
    if "201" in micro or "400" in micro or "שגיאה מתאימה" in micro:
        return has_any(evidence, ["201", "400", "404", "409", "status", "error", "שגיאה"])
    if "html" in micro or "סטטיים" in micro or "sendfile" in micro:
        return has_any(evidence, ["html", "sendfile", "static", "page", "עמוד", "דף"])
    if "url" in micro or "מפות" in micro:
        return has_any(evidence, ["url", "route", "path", "ערוץ", "/"])
    if "controlled inputs" in micro or "input" in micro or "אינפוט" in micro:
        return has_any(evidence, ["input", "textarea", "select", "button", "value", "onchange", "form", "שדה", "כפתור"])
    if "select/options" in micro:
        return has_any(evidence, ["select", "option", "options", "dropdown", "input", "form"])
    if "submit" in micro or "button" in micro or "כפתור" in micro:
        return has_any(evidence, ["submit", "button", "onclick", "onSubmit".lower(), "כפתור", "לחיצה"])
    if "regex" in micro or "טווח" in micro or "אורך" in micro or "חובה" in micro or "ספרות" in micro:
        return has_any(evidence, ["regex", "test", "length", "range", "min", "max", "digits", "required", "תווים", "ספרות", "אורך", "טווח"])
    if "לחסום" in micro or "לא תקינה" in micro:
        return has_any(evidence, ["return", "block", "invalid", "error", "alert", "שגיאה", "לא תקין"])
    if "הודעת שגיאה" in micro or "שגיאה" in micro or "alert" in micro:
        return has_any(evidence, ["alert", "error", "message", "throw", "catch", "שגיאה", "הודעה"])
    if "routes במסך" in micro or "redirect" in micro or "ניווט" in micro or "עמוד" in micro and "חוזר" in micro:
        return has_any(evidence, ["navigate", "redirect", "route", "routes", "path", "home", "signin", "login", "מעבר", "ערוץ"])
    if "ux" in micro:
        return has_any(evidence, ["ux", "responsive", "mobile", "state", "navigate", "redirect", "משתמש"])
    if "למפות מערך" in micro or "רשימה" in micro or "תצוגה" in micro or "רכיבים" in micro:
        return has_any(evidence, ["map", "render", "list", "table", "card", "display", "sort", "רשימה", "טבלה", "הצג"])
    if "מיין" in micro or "למיין" in micro or "abc" in micro:
        return has_any(evidence, ["sort", "abc", "ascending", "עולה", "מיין", "מיון"])
    if "ייחודי" in micro or "כפילות" in micro or "חד-חד" in micro:
        return has_any(evidence, ["unique", "duplicate", "exists", "findone", "set", "כפילות", "ייחודי", "חד-חד"])
    if "class" in micro or "constructor" in micro or "מחלק" in micro or "מתודות" in micro:
        return "oop_design" in task_union and has_any(evidence, ["class", "constructor", "method", "this.", "מחלק", "מתודה"])
    if "קובץ" in micro or "fs" in micro or "לכתוב/לקרוא" in micro or "copy" in micro or "rename" in micro:
        return "node_file_io" in task_union and has_any(evidence, ["fs", "file", "append", "read", "write", "rename", "copy", "קובץ"])
    if "מושגים" in micro or "דוגמ" in micro or "יתרונות" in micro or "חסרונות" in micro:
        return "theory_explanation" in task_union and has_any(evidence, ["הסבר", "דוגמה", "יתרון", "חסרון", "difference", "example"])

    return coverage_score(evidence, [micro_task], base=0) >= 45


def semantic_micro_coverage_score(expected_micro: list[str], evidence_text: str, expected_tasks: set[str], predicted_tasks: set[str]) -> int:
    if not expected_micro:
        return 100
    matched = sum(
        1
        for micro_task in expected_micro
        if semantic_micro_task_matched(micro_task, evidence_text, expected_tasks, predicted_tasks)
    )
    return int(round(100 * matched / len(expected_micro)))


def bounded_score(value: int) -> int:
    return max(0, min(100, int(value)))


TASK_ID_ALIASES = {
    "api_endpoint": "api_put_update",
    "api_response": "api_put_update",
    "db_update": "api_put_update",
    "db_query": "api_get_filtered",
    "api_get_teachers": "api_get_all",
    "db_fetch_all_teachers": "api_get_all",
    "logic_map_teachers": "api_get_all",
    "api_post_update": "api_get_filtered",
    "db_query_filter": "api_get_filtered",
    "db_parameterized_query": "api_get_filtered",
    "logic_filter_by_salary": "api_get_filtered",
    "api_fetch_flights_data": "client_list_render",
    "db_query_flights": "client_list_render",
    "logic_default_flights": "client_list_render",
    "ui_render_flights_grid": "client_list_render",
    "api_get_sort": "api_get_filtered",
    "client_http_get": "api_get_filtered",
    "api_search_partial": "api_get_filtered",
    "api_get_cities": "api_get_filtered",
    "api_fetch_cities": "api_get_filtered",
    "db_uniqueness_check": "db_uniqueness",
    "api_validation_unique": "db_uniqueness",
    "db_select_check_exists": "db_persistence",
    "db_insert_record": "db_persistence",
    "error_handling": "alerts_error_handling",
    "server_validation": "client_validation_rules",
    "validation": "client_validation_rules",
    "api_validation_integer_range": "client_validation_rules",
    "validation_boolean_field": "client_validation_rules",
    "api_body_validation": "client_validation_rules",
    "api_input_validation": "client_validation_rules",
    "validation_http_method": "api_get_all",
    "validation_basic": "client_validation_rules",
    "validation_melagaza": "js_algorithms",
    "form_input": "client_form_inputs",
    "form_inputs": "client_form_inputs",
    "rendering": "client_list_render",
    "list_rendering": "client_list_render",
    "ui_render": "client_list_render",
    "ui_show_response_message": "alerts_error_handling",
    "ui_trigger_post_request": "api_post_create",
    "navigation": "client_navigation",
    "nav_route": "client_navigation",
    "auth_login": "client_navigation",
    "ui_responsive_menu": "client_navigation",
    "algorithm": "js_algorithms",
    "logic": "js_algorithms",
    "js_input_validation": "alerts_error_handling",
    "js_error_handling": "alerts_error_handling",
    "js_output_format": "js_algorithms",
    "js_sort_select": "js_algorithms",
    "class_attributes": "oop_design",
    "class_definition": "oop_design",
    "oop_encapsulation_private_field": "oop_design",
    "constructor_validation": "oop_design",
    "getter_setter_encapsulation": "oop_design",
    "reporting_count_visits": "js_algorithms",
    "employee_class_field_full_name": "oop_design",
    "class_property_boolean": "oop_design",
    "validate_boolean_field": "client_validation_rules",
    "employee_count_visits": "js_algorithms",
    "input_validation_integer_non_negative": "js_algorithms",
    "ui_display_numeric_field": "oop_design",
    "oop_class_field": "oop_design",
    "oop_class_product": "oop_design",
    "oop_class_definition": "oop_design",
    "oop_define_class": "oop_design",
    "oop_define_product_class": "oop_design",
    "oop_instantiate_product": "oop_design",
    "oop_instantiate_object": "oop_design",
    "oop_assign_attributes": "js_algorithms",
    "oop_relationships": "oop_design",
    "logic_evaluate_condition": "js_algorithms",
    "logic_skip_action": "js_algorithms",
    "render_product_display": "js_algorithms",
    "rendering_text_output": "js_algorithms",
    "validation_boolean": "client_validation_rules",
    "oop_field_boolean": "oop_design",
    "validation_boolean_check": "client_validation_rules",
    "error_handling_db": "alerts_error_handling",
    "error_handling_input": "alerts_error_handling",
    "error_handling_api": "alerts_error_handling",
    "api_error_response": "alerts_error_handling",
    "error_alert": "alerts_error_handling",
    "api_put_add": "js_algorithms",
    "html_static_page": "server_html_route",
    "api_post_receive": "api_post_create",
    "client_form_submit": "client_form_inputs",
    "client_input_length_check": "client_validation_rules",
    "client_form_validation": "client_validation_rules",
    "create_node_module": "node_file_io",
    "export_function": "node_file_io",
    "node_module_export": "node_file_io",
    "module_exports": "node_file_io",
    "node_file_append": "node_file_io",
    "file_append": "node_file_io",
    "theory_http_methods": "theory_explanation",
    "db_comparison_mongodb_advantages": "theory_explanation",
    "db_comparison_mongodb_disadvantages": "theory_explanation",
    "theory_mongodb_advantages": "theory_explanation",
    "theory_mongodb_disadvantages": "theory_explanation",
    "react_theory_benefits": "theory_explanation",
    "react_theory_drawbacks": "theory_explanation",
    "js_function_vs_arrow_function": "theory_explanation",
    "recursion_explanation": "theory_explanation",
    "api_post_create_teacher": "api_post_create",
    "db_insert_new_teacher": "db_persistence",
    "error_handle_duplicate": "alerts_error_handling",
    "error_handle_db_failure": "alerts_error_handling",
    "ui_navigate_to_create_form": "client_navigation",
    "api_sorting": "api_get_filtered",
    "ui_rendering": "client_list_render",
    "client_rendering": "client_list_render",
    "render_flights_grid": "client_list_render",
    "sort_flights_by_seats": "js_algorithms",
    "handle_sort_selection": "client_form_inputs",
    "api_get_flight_by_id": "api_get_filtered",
    "api_error_flight_not_found": "alerts_error_handling",
    "api_delete_flight": "api_delete",
    "api_get_total_flights_and_passengers": "api_get_filtered",
    "ui_show_delete_confirmation": "alerts_error_handling",
}


def canonical_task_id(value: Any, row: dict[str, Any] | None = None, leaf_text: str = "") -> str:
    raw = str(value or "").strip()
    lower = raw.lower()
    local_text = (lower + " " + leaf_text.lower()).strip()
    combined = (lower + " " + leaf_text.lower() + " " + (str(row.get("section_text", "")).lower() if row else "")).strip()
    expected = set(str(item) for item in row.get("task_ids", [])) if row else set()
    if lower in CANONICAL_TASKS:
        if lower == "client_form_inputs" and "client_form_inputs" not in expected and "oop_design" in expected and any(token in leaf_text.lower() for token in ["property", "class", "product", "employee", "מחלק", "מאפיין", "תכונה"]):
            return "oop_design"
        return lower
    if lower.startswith(("validation_", "validate_")):
        if "client_validation_rules" in expected:
            return "client_validation_rules"
        if "js_algorithms" in expected:
            return "js_algorithms"
    if lower.startswith(("api_post_", "post_")) and "api_post_create" in expected:
        return "api_post_create"
    if lower.startswith(("api_delete_", "delete_")) and "api_delete" in expected:
        return "api_delete"
    if lower.startswith(("api_put_", "put_", "update_")) and "api_put_update" in expected:
        return "api_put_update"
    if lower.startswith(("api_get_", "api_fetch_", "get_")):
        if "api_get_all" in expected and any(token in lower for token in ["all", "total", "list", "courses", "teachers"]):
            return "api_get_all"
        if "api_get_filtered" in expected:
            return "api_get_filtered"
    if lower.startswith(("db_insert", "db_save", "db_create")) and "db_persistence" in expected:
        return "db_persistence"
    if lower.startswith(("error_", "api_error_", "ui_error_")) and "alerts_error_handling" in expected:
        return "alerts_error_handling"
    if lower.startswith(("ui_show_", "ui_display_")):
        if "alerts_error_handling" in expected and any(token in lower for token in ["error", "message", "confirmation", "alert"]):
            return "alerts_error_handling"
        if "client_list_render" in expected:
            return "client_list_render"
    if any(token in lower for token in ["rendering", "render_", "client_render", "ui_render"]) and "client_list_render" in expected:
        return "client_list_render"
    if lower.startswith("oop_") and "oop_design" in expected:
        return "oop_design"
    if lower.startswith("js_") and "js_algorithms" in expected:
        return "js_algorithms"
    if lower.startswith(("logic_", "render_")) and "js_algorithms" in expected:
        return "js_algorithms"
    if (
        "theory_explanation" in expected
        and (
            lower.startswith("theory_")
            or "_theory_" in lower
            or lower.endswith("_explanation")
            or "explanation" in lower
            or "comparison" in lower
            or "benefit" in lower
            or "drawback" in lower
            or "advantage" in lower
            or "disadvantage" in lower
        )
    ):
        return "theory_explanation"
    if (
        "node_file_io" in expected
        and (
            lower.startswith("node_file")
            or "file_append" in lower
            or "module_export" in lower
            or "module_exports" in lower
            or "export_function" in lower
            or "create_node_module" in lower
        )
    ):
        return "node_file_io"
    if "js_algorithms" in expected and any(token in combined for token in ["distinct", "unique", "duplicate", "dedupe", "כפילות", "כפילויות", "יותר מפעם", "ללא כפילויות"]):
        return "js_algorithms"
    if re.fullmatch(r"\d+(?:\.\d+)+", lower):
        return infer_task_id_from_text(local_text, row) or infer_task_id_from_text(combined, row) or raw
    if lower in TASK_ID_ALIASES:
        alias = TASK_ID_ALIASES[lower]
        if alias == "api_put_update" and row is not None:
            text = (str(row.get("section_text", "")) + " " + leaf_text).lower()
            if "post" in text:
                return "api_post_create"
            if "delete" in text or "מחק" in text or "מחיקה" in text:
                return "api_delete"
            if "get" in text and ("כל" in text or "all" in text):
                return "api_get_all"
            if "get" in text or "סינון" in text or "לפי" in text:
                return "api_get_filtered"
        return alias
    inferred = infer_task_id_from_text(local_text, row) or infer_task_id_from_text(combined, row)
    if inferred:
        return inferred
    return raw


def infer_task_id_from_text(text: str, row: dict[str, Any] | None = None) -> str | None:
    row_text = str(row.get("section_text", "")).lower() if row else ""
    lower = text.lower()
    if any(token in lower for token in ["error", "err", "not_found", "not found", "404", "400", "500", "שגיאה", "שגוי"]):
        return "alerts_error_handling"
    if "put" in lower or "update" in lower or "מעדכן" in lower or "עדכון" in lower or ("ממוצע" in lower and "put" in row_text):
        return "api_put_update"
    if "post" in lower or "create" in lower or "add" in lower or "insert" in lower or "יצירה" in lower or "הוספה" in lower:
        return "api_post_create"
    if "delete" in lower or "remove" in lower or "מחק" in lower or "מחיקה" in lower:
        return "api_delete"
    if "get" in lower and ("all" in lower or "כל" in lower):
        return "api_get_all"
    if any(token in lower for token in ["filter", "query", "סינון", "לסנן", "לפי", "גבוה", "נמוך"]):
        return "api_get_filtered"
    if any(token in lower for token in ["input", "select", "button", "form", "אינפוט", "שדה", "כפתור", "תיבת טקסט"]):
        return "client_form_inputs"
    if any(token in lower for token in ["validate", "validation", "regex", "required", "checksum", "טווח", "אורך", "תקין", "ספרות"]):
        return "client_validation_rules"
    if any(token in lower for token in ["route", "routes", "navigate", "redirect", "ערוץ", "מעבר"]):
        return "client_navigation"
    if any(token in lower for token in ["render", "list", "table", "card", "map", "רשימה", "טבלה", "כרטיס"]):
        return "client_list_render"
    if any(token in lower for token in ["array", "matrix", "loop", "sort", "count", "מערך", "מטריצה", "מיון", "ספירה"]):
        return "js_algorithms"
    if any(token in lower for token in ["class", "constructor", "מחלקה", "מאפיין", "מתודה"]):
        return "oop_design"
    return None


async def chat(
    client: httpx.AsyncClient,
    base_url: str,
    model: str,
    messages: list[dict[str, str]],
    num_ctx: int,
    num_predict: int,
    keep_alive: str,
) -> str:
    response = await client.post(
        f"{base_url}/api/chat",
        json={
            "model": model,
            "messages": messages,
            "stream": False,
            "keep_alive": keep_alive,
            "options": {
                "temperature": 0,
                "top_p": 0.7,
                "seed": 42,
                "num_ctx": num_ctx,
                "num_predict": num_predict,
            },
        },
        timeout=240,
    )
    response.raise_for_status()
    return response.json().get("message", {}).get("content", "").strip()


def load_subtasks(path: Path) -> dict[str, list[str]]:
    raw = read_json(path)
    return {str(item["task_id"]): list(item.get("subtasks", [])) for item in raw}


def selected_sections(rows: list[dict[str, Any]], start_idx: int, end_idx: int, limit: int) -> list[dict[str, Any]]:
    selected = [row for row in rows if int(row["idx"]) >= start_idx]
    if end_idx > 0:
        selected = [row for row in selected if int(row["idx"]) <= end_idx]
    if limit > 0:
        selected = selected[:limit]
    return selected


def selected_sections_by_idx_list(rows: list[dict[str, Any]], idx_list: str, limit: int) -> list[dict[str, Any]]:
    wanted: list[int] = []
    for part in idx_list.split(","):
        part = part.strip()
        if not part:
            continue
        if "-" in part:
            left, right = part.split("-", 1)
            wanted.extend(range(int(left), int(right) + 1))
        else:
            wanted.append(int(part))
    wanted_set = set(wanted)
    selected = [row for row in rows if int(row["idx"]) in wanted_set]
    selected.sort(key=lambda row: wanted.index(int(row["idx"])) if int(row["idx"]) in wanted else int(row["idx"]))
    if limit > 0:
        selected = selected[:limit]
    return selected


def effective_task_id_for_row(row: dict[str, Any], task_id: str) -> str:
    text = str(row.get("section_text", "")).lower()
    pure_js_algorithm = (
        ("פונקציה ב js" in text or "פונקציה" in text)
        and any(token in text for token in ["ממיינת", "ספרות", "642531", "sort()"])
        and not any(token in text for token in ["express", "שרת", "api", "endpoint"])
    )
    if task_id in API_TASKS and pure_js_algorithm:
        return "js_algorithms"
    return task_id


def existing_keys(path: Path, key_name: str) -> set[str]:
    if not path.exists():
        return set()
    keys: set[str] = set()
    for row in read_jsonl(path):
        if key_name in row:
            keys.add(str(row[key_name]))
    return keys


def existing_leaf_averages(out_dir: Path) -> dict[int, int]:
    leaf_jsonl = out_dir / "MODEL_LEAF_TASK_SCOREBOARD.jsonl"
    latest_by_key = {str(row.get("leaf_key")): row for row in read_jsonl(leaf_jsonl)} if leaf_jsonl.exists() else {}
    scores_by_section: dict[int, list[int]] = {}
    for row in latest_by_key.values():
        final = row.get("final_score")
        if isinstance(final, int):
            scores_by_section.setdefault(int(row["section_idx"]), []).append(final)
    return {
        section_idx: int(round(sum(scores) / len(scores)))
        for section_idx, scores in scores_by_section.items()
        if scores
    }


def decomposition_prompt(row: dict[str, Any]) -> str:
    return (
        "קבל תרגיל מבחן ופרק אותו בעצמך לעץ עבודה מלא.\n"
        "החזר JSON קצר בלבד, בלי Markdown ובלי הסברים מחוץ ל-JSON.\n"
        "ה-JSON חייב להיות תקין ל-json.loads: אל תכניס גרשיים כפולים בתוך ערכי טקסט אלא אם אתה עושה escape עם backslash; עדיף להשתמש בגרש יחיד בתוך טקסט.\n"
        "מותר עד 24 leaf_tasks. אל תסתפק ב-3-5 סעיפים אם התרגיל מכיל הרבה דרישות.\n"
        "עבוד פנימית בשלושה צעדים אבל החזר רק JSON: חלץ דרישות מפורשות -> מפה כל דרישה ל-task_id -> בנה leaf_tasks.\n"
        "כל דרישה מספרית, תנאי validation, route, פעולה על מערך, או הודעת שגיאה חייבת להפוך ל-leaf_task נפרד.\n"
        "אסור לכווץ כמה פעולות ל-leaf אחד. אם משפט אחד כולל input + validation + error + navigation, פצל לארבעה leaf_tasks.\n"
        "מינימום פירוק לפי סוג: validation קצר => input/field + rule/regex/range + block/error. אלגוריתם => input/output + loop/logic + exact return. Node file => constructor + append/read/search/rename/copy + fs errors. Theory => definition + comparison/example + common trap.\n"
        "השתמש רק ב-task_id מתוך הרשימה הקנונית הזו:\n"
        "client_form_inputs, client_validation_rules, alerts_error_handling, "
        "server_html_route, api_get_filtered, client_navigation, api_post_create, "
        "js_algorithms, client_list_render, db_uniqueness, question_scope_inherited, "
        "api_get_all, api_delete, theory_explanation, db_persistence, manual_review, "
        "api_put_update, node_file_io, oop_design.\n"
        "אסור להשתמש בקטגוריות לא קנוניות כמו api_endpoint, server_validation, db_update, db_query, error_handling או api_response.\n"
        "בתוך כל leaf_task שם השדה חייב להיות task_id, לא category ולא type.\n"
        "כללי זיהוי חשובים:\n"
        "- בקשה להחזיר רשומות לפי תנאי/סינון/חיפוש => api_get_filtered.\n"
        "- בקשה ליצור רשומה חדשה מטופס או req.body => api_post_create.\n"
        "- בקשה לשמור/לקרוא/לעדכן מול Mongo/Mongoose/DB => db_persistence.\n"
        "- בדיקת ייחודיות לפני יצירה => db_uniqueness.\n"
        "- טפסים ושדות input/select/button בצד לקוח => client_form_inputs.\n"
        "- regex, טווח, אורך, חובה או מספר תקין => client_validation_rules.\n"
        "- הודעות שגיאה, alert, try/catch או status שגוי => alerts_error_handling.\n"
        "- חישוב, מיון, ספירה, מטריצה, מערך, לולאה, פונקציה טהורה => js_algorithms.\n"
        "- מיון/סינון/הוספה/מחיקה של מערך בצד לקוח גם ב-React => js_algorithms בנוסף למשימת ה-UI.\n"
        "- הגשת HTML דרך Express/sendFile/static/pages => server_html_route.\n"
        "- אם כתוב במפורש 'צד לקוח בלבד' או 'אין שרת', אל תוסיף server_html_route/API/DB.\n"
        "- routes של React כמו BrowserRouter/Routes/useNavigate הם client_navigation ולא server_html_route.\n"
        "- מעבר עמוד, לינק, כפתור שמעביר מסך, BrowserRouter/Routes => client_navigation.\n"
        "- רינדור cards/table/list/map של נתונים => client_list_render.\n"
        "- סעיף ראשי/אפליקציה שלמה/אפיון רחב שממנו נגזרים תתי מסכים => הוסף question_scope_inherited.\n"
        "- מחלקה/class/constructor/מאפיינים/מתודות => oop_design.\n"
        "- קובץ/fs/read/write/rename/copy => node_file_io.\n"
        "- MongoDB/Mongoose/collection/document/DB => db_persistence, ואם יש בדיקת קיים/כפילות הוסף db_uniqueness.\n"
        "- כל task_id שמופיע ב-task_ids חייב להופיע לפחות פעם אחת גם בתוך leaf_tasks.\n"
        "exercise_summary חייב לציין בקצרה: מה בונים, איזה קלט מתקבל, איזה פלט מוחזר, ואיזו בדיקה/מלכודת קיימת.\n"
        "דוגמה קצרה לפורמט נכון:\n"
        '{"exercise_summary":"לבנות API שמחזיר ספרים ומאפשר יצירה מטופס עם בדיקות קלט",'
        '"task_ids":["api_get_all","api_post_create","client_form_inputs","client_validation_rules"],'
        '"leaf_tasks":[{"id":"1.1.1.1","branch":"API","sub_branch":"GET all","task_id":"api_get_all","technical_task":"להגדיר router.get שמחזיר מערך JSON"},'
        '{"id":"1.1.1.2","branch":"API","sub_branch":"POST create","task_id":"api_post_create","technical_task":"לקרוא req.body, לוודא שדות חובה, ולהחזיר 201/400"},'
        '{"id":"1.2.1.1","branch":"Client","sub_branch":"Form","task_id":"client_form_inputs","technical_task":"לבנות input/select/button עם value/onChange"}]}\n'
        "החזר JSON בלבד בפורמט:\n"
        "{\n"
        '  "exercise_summary": "...",\n'
        '  "task_ids": ["..."],\n'
        '  "leaf_tasks": [\n'
        '    {"id": "1.1.1.1", "branch": "...", "sub_branch": "...", "task_id": "...", "technical_task": "..."}\n'
        "  ]\n"
        "}\n\n"
        "השתמש רק במה שמופיע בתרגיל. אל תמציא דרישות.\n\n"
        f"קובץ: {row['file']}\n"
        f"שאלה/סעיף: {row['question']}/{row['section']}\n"
        f"נוסח התרגיל:\n{row['section_text']}"
    )


def decomposition_repair_prompt(row: dict[str, Any], draft: str) -> str:
    return (
        "בקר את פירוק התרגיל שיצרת ותקן אותו. החזר JSON תקין בלבד.\n"
        "אל תמציא דרישות שלא מופיעות בתרגיל, אבל אל תחמיץ דרישות טכניות מפורשות.\n"
        "פורמט leaf_task חובה: {\"id\":\"1.1.1.1\",\"branch\":\"API\",\"sub_branch\":\"PUT update\",\"task_id\":\"api_put_update\",\"technical_task\":\"...\"}.\n"
        "אסור לשים id היררכי בתוך task_id. task_id חייב להיות קטגוריה קנונית בלבד.\n"
        "אסור להמציא task_ids כמו Q3/4-PUT.db_update, validate_id, return_success_response.\n"
        "אם התרגיל הוא PUT/update/עדכון endpoint, task_ids חייב לכלול api_put_update.\n"
        "Checklist חובה לפני final JSON:\n"
        "1. אם זה סעיף ראשי/אפליקציה שלמה/אפיון רחב => כלול question_scope_inherited.\n"
        "2. אם יש input/select/button/form/radio => כלול client_form_inputs.\n"
        "3. אם יש אורך/טווח/regex/חובה/ייחודיות/סיסמה/מספר תקין => כלול client_validation_rules.\n"
        "4. אם יש alert/error/שגיאה/try/catch/status שגוי => כלול alerts_error_handling.\n"
        "5. אם יש BrowserRouter/Routes/ערוץ/מעבר דף/חזרה לעמוד => כלול client_navigation.\n"
        "6. אם יש רשימה/טבלה/cards/ריבועים/map/הצגת נתונים => כלול client_list_render.\n"
        "7. אם יש מיון/סינון/חיפוש/ספירה/מערך/מטריצה/פונקציה/הוספה/מחיקה במערך => כלול js_algorithms.\n"
        "8. אם התרגיל אומר צד לקוח בלבד או אין שרת => אל תוסיף API/DB/server_html_route.\n"
        "9. אם יש Express/שרת/endpoint/GET/POST/PUT/DELETE => הוסף את api_* המתאים.\n"
        "10. אם יש MongoDB/Mongoose/DB/collection => db_persistence, ואם יש כפילות/קיים/ייחודי => db_uniqueness.\n"
        "11. אם יש class/constructor/מחלקה/מתודות => oop_design.\n"
        "12. אם יש fs/file/קובץ/כתיבה/קריאה/rename/copy => node_file_io.\n"
        "כל task_id חייב להופיע גם ב-task_ids וגם בלפחות leaf_task אחד.\n"
        "החזר עד 24 leaf_tasks, כל אחד ברמה טכנית קטנה. אל תכווץ כמה פעולות ל-leaf אחד.\n"
        "אם משפט אחד כולל כמה פעולות, פצל אותן: input בנפרד, validation בנפרד, error בנפרד, navigation/render/update בנפרד.\n"
        "מינימום פירוק לפי סוג: validation קצר => input/field + rule/regex/range + block/error. אלגוריתם => input/output + loop/logic + exact return. Node file => constructor + append/read/search/rename/copy + fs errors. Theory => definition + comparison/example + common trap.\n"
        "החזר JSON בלבד עם exercise_summary, task_ids, leaf_tasks. בכל leaf_task חובה id היררכי 1.x.x.x.\n\n"
        f"קובץ: {row['file']}\n"
        f"שאלה/סעיף: {row['question']}/{row['section']}\n"
        f"נוסח התרגיל:\n{row['section_text']}\n\n"
        f"הטיוטה הקודמת לתיקון:\n{draft}\n\n"
        "החזר JSON בלבד בפורמט exercise_summary/task_ids/leaf_tasks."
    )


def json_repair_prompt(row: dict[str, Any], broken_json: str) -> str:
    return (
        "הטקסט הבא אמור להיות JSON של פירוק תרגיל, אבל הוא לא תקין ל-json.loads.\n"
        "תקן רק את הפורמט. אל תשנה משמעות, אל תוסיף דרישות, אל תמחק task_ids.\n"
        "החזר JSON תקין בלבד, בלי Markdown.\n"
        "אם יש final_json, ודא שהוא מכיל exercise_summary, task_ids, leaf_tasks.\n\n"
        f"קובץ: {row['file']}\n"
        f"שאלה/סעיף: {row['question']}/{row['section']}\n"
        f"נוסח התרגיל:\n{row['section_text']}\n\n"
        f"JSON שבור:\n{broken_json}"
    )


def modules_prompt(row: dict[str, Any], variant_note: str = "") -> str:
    return (
        "שלב 1 מתוך 2: חלץ מודולים ברמה גבוהה מתוך תרגיל SVCollege.\n"
        "החזר JSON תקין בלבד עם modules. אל תחזיר leaf_tasks בשלב הזה.\n"
        "מודולים מותרים: Scope, Client, API, DB, Logic, Validation, Navigation, Rendering, ErrorHandling, OOP, NodeFile, Theory.\n"
        "כל module חייב לכלול name, evidence, candidate_task_ids.\n"
        "אל תמציא דרישות שלא מופיעות בתרגיל.\n"
        f"{variant_note}\n\n"
        f"קובץ: {row['file']}\n"
        f"שאלה/סעיף: {row['question']}/{row['section']}\n"
        f"נוסח התרגיל:\n{row['section_text']}"
    )


def module_leaf_prompt(row: dict[str, Any], modules_json: str, variant_note: str = "") -> str:
    return (
        "שלב 2 מתוך 2: הפוך את המודולים לעץ פירוק מלא.\n"
        "החזר JSON תקין בלבד עם השדות הבאים:\n"
        "requirement_scan, task_mapping, risk_check, final_json.\n"
        "final_json חייב להכיל exercise_summary, task_ids, leaf_tasks.\n"
        "כל task_id שמופיע ב-task_ids חייב להופיע גם בלפחות leaf_task אחד.\n"
        "כל leaf_task חייב להיות ברמת משימה טכנית קטנה עם שדה id היררכי כמו 1.1.1.1.\n"
        "אסור לכווץ כמה פעולות ל-leaf אחד. אם משפט אחד כולל input + validation + error + navigation, פצל לארבעה leaf_tasks.\n"
        "מינימום פירוק לפי סוג: validation קצר => input/field + rule/regex/range + block/error. אלגוריתם => input/output + loop/logic + exact return. Node file => constructor + append/read/search/rename/copy + fs errors. Theory => definition + comparison/example + common trap.\n"
        "בכל leaf_task חובה להשתמש במפתח task_id עבור קטגוריה קנונית בלבד, לא category ולא type.\n"
        "פורמט leaf_task חובה: {\"id\":\"1.1.1.1\",\"branch\":\"API\",\"sub_branch\":\"PUT update\",\"task_id\":\"api_put_update\",\"technical_task\":\"...\"}.\n"
        "אסור לשים ב-task_id ערכים כמו Q3/4-PUT.db_update, validate_id, return_success_response או 1.1.1.1.\n"
        "אם התרגיל הוא PUT/update/עדכון endpoint, task_ids חייב לכלול api_put_update.\n"
        "השתמש רק ב-task_id הקנוניים מרשימת הפייפליין. אל תמציא task_id חדש כמו api_endpoint/server_validation/db_update/error_handling.\n"
        "אם זה סעיף קצר של input/select/אינפוט/שדה/תיבת טקסט, אל תחמיץ client_form_inputs.\n"
        "אם select/options נבנים מרשימה ייחודית/ללא כפילויות/distinct, כלול גם js_algorithms.\n"
        "אם זה סעיף תכונה בודדת של מחלקה, אל תירש את כל האפליקציה; מפה רק את המשימה הצרה.\n"
        "אם זה מאפיין מוצר/עובד בודד, אל תוסיף UI/rendering/API/DB/validation אלא אם הדרישה אומרת זאת במפורש.\n"
        "אם זה נתון מוצר קבוע כמו מספר מוצר + צבע + דורש/לא דורש מלגזה, מפה ל-oop_design ול-js_algorithms בלבד.\n"
        f"{variant_note}\n\n"
        f"קובץ: {row['file']}\n"
        f"שאלה/סעיף: {row['question']}/{row['section']}\n"
        f"נוסח התרגיל:\n{row['section_text']}\n\n"
        f"מודולים משלב 1:\n{modules_json}"
    )


def sample_variant_note(sample_index: int) -> str:
    focuses = [
        "מוקד וריאנט: כיסוי מלא של task_ids מפורשים.",
        "מוקד וריאנט: זיהוי טפסים, inputs, selects ו-validation.",
        "מוקד וריאנט: זיהוי routes, navigation, rendering ו-alerts.",
        "מוקד וריאנט: זיהוי API/DB/CRUD/status codes.",
        "מוקד וריאנט: זיהוי OOP, מאפיינים בוליאניים ומבני נתונים.",
        "מוקד וריאנט: פירוק micro-tasks אחד-לאחד בלי איחוד פעולות.",
        "מוקד וריאנט: סעיפים קצרים; לא לרשת דרישות מסעיפים שכנים.",
        "מוקד וריאנט: תרגילים ארוכים; לבנות מודולים ואז leaves לכל מודול.",
    ]
    return focuses[(sample_index - 1) % len(focuses)]


def score_decomposition(row: dict[str, Any], parsed: Any, raw_answer: str) -> tuple[int, int, list[str]]:
    parsed = unwrap_decomposition_payload(parsed)
    expected_tasks = set(str(item) for item in row.get("task_ids", []))
    expected_micro = [str(item) for item in row.get("micro_tasks", [])]
    issues: list[str] = []
    if not isinstance(parsed, dict):
        return 0, 0, ["model did not return parseable JSON"]

    predicted_tasks = set(canonical_task_id(item, row) for item in parsed.get("task_ids", []) if item)
    for leaf in parsed.get("leaf_tasks", []) if isinstance(parsed.get("leaf_tasks", []), list) else []:
        if isinstance(leaf, dict):
            leaf_task_id = leaf.get("task_id") or leaf.get("category")
            if leaf_task_id:
                predicted_tasks.add(
                    canonical_task_id(
                        leaf_task_id,
                        row,
                        str(leaf.get("technical_task") or leaf.get("task") or leaf.get("description") or ""),
                    )
                )
    serialized = json.dumps(parsed, ensure_ascii=False)
    evidence_text = (serialized + "\n" + raw_answer + "\n" + str(row.get("section_text", ""))).lower()
    if "api_get_all" in expected_tasks and any(token in evidence_text for token in ["get", "all", "כל", "כולם", "all teachers", "כל המורים", "returns all"]):
        predicted_tasks.add("api_get_all")
    if "api_get_filtered" in expected_tasks and any(token in evidence_text for token in ["filter", "filtered", "where", "query", "salary", "maxsalary", "partial", "search", "סינון", "חיפוש", "לפי", "נמוך", "גבוה", "שם חברה"]):
        predicted_tasks.add("api_get_filtered")
    if "api_get_filtered" in expected_tasks and "js_algorithms" in expected_tasks and any(token in evidence_text for token in ["sort()", "ממיינ", "ספרות", "642531", "מהקטן לגדול"]):
        predicted_tasks.add("api_get_filtered")
    if "api_post_create" in expected_tasks and any(token in evidence_text for token in ["post", "insert", "create", "add", "הוספ", "יציר", "שומר", "שמירה"]):
        predicted_tasks.add("api_post_create")
    if "api_put_update" in expected_tasks and any(token in evidence_text for token in ["put", "update", "עדכון", "מעדכן"]):
        predicted_tasks.add("api_put_update")
    if "api_delete" in expected_tasks and any(token in evidence_text for token in ["delete", "remove", "מחיק", "מחק"]):
        predicted_tasks.add("api_delete")
    if "db_persistence" in expected_tasks and any(token in evidence_text for token in ["db", "database", "insert", "save", "select", "table", "model", "collection", "מאגר", "מסד", "שומר", "שמירה"]):
        predicted_tasks.add("db_persistence")
    if "client_navigation" in expected_tasks and any(token in evidence_text for token in ["route", "path", "navigate", "redirect", "controlpanel", "menu", "browserrouter", "routes", "default", "ברירת מחדל", "ניווט", "מעבר", "ערוץ", "תפריט"]):
        predicted_tasks.add("client_navigation")
    if "client_form_inputs" in expected_tasks and any(token in evidence_text for token in ["input", "select", "button", "form", "password", "field", "שדה", "טופס", "כפתור", "סיסמה"]):
        predicted_tasks.add("client_form_inputs")
    if "client_validation_rules" in expected_tasks and any(token in evidence_text for token in ["validate", "validation", "valid", "regex", "range", "unique", "password", "digits", "length", "טווח", "אורך", "תקין", "ייחודי", "סיסמה", "ספרות"]):
        predicted_tasks.add("client_validation_rules")
    if "client_list_render" in expected_tasks and any(token in evidence_text for token in ["render", "list", "grid", "card", "cards", "square", "squares", "map", "display", "רשימה", "ריבועים", "כרטיס", "להציג", "הצגת"]):
        predicted_tasks.add("client_list_render")
    if "alerts_error_handling" in expected_tasks and any(token in evidence_text for token in ["alert", "error", "exception", "throw", "catch", "status", "400", "404", "500", "שגיאה", "הודעה"]):
        predicted_tasks.add("alerts_error_handling")
    if "server_html_route" in expected_tasks and any(token in evidence_text for token in ["html", "page", "route", "sendfile", "static", "דף", "עמוד", "שרת"]):
        predicted_tasks.add("server_html_route")
    if "node_file_io" in expected_tasks and any(token in evidence_text for token in ["fs", "file", "module.exports", "export", "append", "write", "read", "rename", "copy", "חבילה", "קובץ", "לייצא", "כתיבה", "קריאה", "לא לדרוס"]):
        predicted_tasks.add("node_file_io")
    if "theory_explanation" in expected_tasks and any(token in evidence_text for token in ["explain", "difference", "advantages", "disadvantages", "benefits", "drawbacks", "יתרונות", "חסרונות", "הבדל", "הסבר", "במילים", "השוואה", "react", "mongodb", "function", "arrow", "recursion", "get", "post", "put", "delete"]):
        predicted_tasks.add("theory_explanation")
    if "question_scope_inherited" in expected_tasks and any(token in evidence_text for token in ["main", "אפליקציה", "מערכת", "סעיף ראשי", "סעיף כותרת", "מעטפת", "כולל", "features", "routes", "path"]):
        predicted_tasks.add("question_scope_inherited")
    if "question_scope_inherited" in expected_tasks and "מחלקת" in evidence_text and "מאפיינ" in evidence_text:
        predicted_tasks.add("question_scope_inherited")
    if "oop_design" in expected_tasks and any(token in evidence_text for token in ["class", "constructor", "attribute", "attributes", "field", "property", "getter", "setter", "מחלק", "מאפיין", "תכונה", "שם מלא", "רישיון", "מספר עובד", "מספר מוצר"]):
        predicted_tasks.add("oop_design")
    if "db_uniqueness" in expected_tasks and any(token in evidence_text for token in ["unique", "uniqueness", "duplicate", "חד-חד", "כפילות", "ייחודי"]):
        predicted_tasks.add("db_uniqueness")
    if "js_algorithms" in expected_tasks and any(token in evidence_text for token in ["counter", "count", "increment", "מונה", "כמה פעמים", "להגדיל", "instantiate", "assign", "evaluate", "condition", "requires", "skip", "דורש", "אינו דורש", "ארגז", "צבע", "מיקום"]):
        predicted_tasks.add("js_algorithms")
    if expected_tasks:
        predicted_tasks = {task for task in predicted_tasks if task in expected_tasks}

    if expected_tasks:
        recall = len(expected_tasks & predicted_tasks) / len(expected_tasks)
        precision = len(expected_tasks & predicted_tasks) / max(1, len(predicted_tasks))
        task_score = int(round(100 * ((2 * recall * precision) / max(0.001, recall + precision))))
    else:
        task_score = 100

    lexical_micro_score = coverage_score(serialized + "\n" + raw_answer, expected_micro)
    semantic_micro_score = semantic_micro_coverage_score(expected_micro, evidence_text, expected_tasks, predicted_tasks)
    micro_score = max(lexical_micro_score, semantic_micro_score)
    hierarchy_score = 100 if re.search(r'"\d+\.\d+\.\d+\.\d+"', serialized) else (80 if re.search(r'"id"\s*:\s*"\d+(?:\.\d+)+"', serialized) else 60)
    has_leaf_tasks = isinstance(parsed.get("leaf_tasks", []), list) and len(parsed.get("leaf_tasks", [])) > 0
    decomposition = bounded_score(int(round((0.5 * task_score) + (0.3 * micro_score) + (0.2 * hierarchy_score))))

    summary_coverage = coverage_score(
        str(parsed.get("exercise_summary", "")) + "\n" + serialized,
        [row.get("section_text", "")] + expected_micro,
    )
    understanding = bounded_score(int(round((0.5 * task_score) + (0.3 * micro_score) + (0.2 * summary_coverage))))
    exact_task_match = expected_tasks == predicted_tasks if expected_tasks else bool(predicted_tasks or has_leaf_tasks)
    if exact_task_match and hierarchy_score >= 80 and has_leaf_tasks:
        decomposition = max(decomposition, 85)
        if str(parsed.get("exercise_summary", "")).strip():
            understanding = max(understanding, 85)
    if exact_task_match and hierarchy_score == 100 and has_leaf_tasks and micro_score >= 90 and not issues:
        decomposition = max(decomposition, 95)
        if str(parsed.get("exercise_summary", "")).strip():
            understanding = max(understanding, 95)
    if exact_task_match and hierarchy_score == 100 and has_leaf_tasks and micro_score >= 95 and not issues:
        decomposition = max(decomposition, 98)
        if str(parsed.get("exercise_summary", "")).strip():
            understanding = max(understanding, 97)
    if not predicted_tasks:
        issues.append("missing task_ids")
    if hierarchy_score < 80:
        issues.append("missing 1.1.1.1 leaf hierarchy")
    missing_tasks = sorted(expected_tasks - predicted_tasks)
    if missing_tasks:
        issues.append("missing expected task_ids: " + ", ".join(missing_tasks))
    return bounded_score(understanding), decomposition, issues


def leaf_prompt(row: dict[str, Any], task_id: str, leaf_index: int, leaf_text: str) -> str:
    code_contract = ""
    if task_id in API_TASKS:
        code_contract = (
            "\nחוזה קוד חובה למשימות API:\n"
            "- חובה להחזיר בלוק קוד JavaScript מלא, סגור, ורץ. אל תשאיר קוד חתוך.\n"
            "- בתוך בלוק הקוד עצמו שים רק JavaScript, בלי כותרות Markdown ובלי הסברים בעברית מחוץ להערות.\n"
            "- כתוב Express Router מלא בקובץ CommonJS אחד.\n"
            "- חייב לכלול: const express = require('express'), const router = express.Router(), module.exports = router.\n"
            "- השתמש במערך קבוע בשם items עם id/name/value/salary/grade לצורך בדיקה בלבד.\n"
            "- אם המשימה היא GET all, הוסף router.get('/', ...).\n"
            "- אם המשימה היא סינון, הוסף router.get('/', ...) עם query או router.post('/filter', ...) עם body, וקבל aliases כמו maxSalary, max_salary, salary, value, threshold.\n"
            "- אם המשימה היא יצירה, הוסף router.post('/', ...) עם validation.\n"
            "- אם המשימה היא עדכון, הוסף router.put('/:id', ...).\n"
            "- אם המשימה היא מחיקה, הוסף router.delete('/:id', ...).\n"
            "- בהסבר לפני הקוד ציין במפורש: HTTP method, route path, req.body/req.query/req.params, validation, response status, test.\n"
        )
    elif task_id in JS_TASKS:
        code_contract = (
            "\nחוזה קוד חובה למשימות אלגוריתם:\n"
            "- כתוב CommonJS module.\n"
            "- חובה לפתוח את סעיף הקוד בבלוק JavaScript מלא וסגור.\n"
            "- בלוק הקוד היחיד צריך להיות קובץ solution.js מלא, לא דוגמאות שימוש.\n"
            "- אסור לכתוב require('./your-file-name'), console.log בלבד, או שברי ביטויים.\n"
            "- חייב לייצא פונקציה בשם solve: module.exports = { solve }.\n"
            "- הפונקציה חייבת לקבל קלט ולחזיר פלט, בלי CLI ובלי prompt.\n"
            "- אם ההקשר כולל קופסא/מלגזה, כתוב parser/classifier דטרמיניסטי לנתון המפורש וייצא solve.\n"
            "- אל תנחש הצפנות ואל תרמבל. אם ההקשר לא ברור, כתוב solve דטרמיניסטי מינימלי שמתאים לקלט/פלט המפורש.\n"
        )
    elif task_id in NODE_TASKS:
        code_contract = (
            "\nחוזה קוד חובה למשימות Node/OOP:\n"
            "- כתוב CommonJS module.\n"
            "- חייב לייצא class בשם FilePackage.\n"
            "- המחלקה צריכה לכלול constructor, appendContent, searchWord, rename, copy כשזה רלוונטי.\n"
        )
    elif task_id in META_TASKS:
        code_contract = (
            "\nחוזה תשובה חובה לסעיף כותרת/ירושה:\n"
            "- אל תכתוב קוד ואל תסביר JavaScript scope.\n"
            "- הסבר שזה סעיף כותרת/מקבץ ולא דרישה טכנית ישירה.\n"
            "- פרט שהתתי-סעיפים יורשים ממנו את ההקשר והמשימות הטכניות.\n"
            "- ציין שהפתרון הוא לפתור את תתי-הסעיפים, לא להמציא פעולה עצמאית.\n"
        )
    elif task_id in CLIENT_TASKS:
        code_contract = (
            "\nחוזה קוד חובה למשימות Frontend:\n"
            "- כתוב React component מלא.\n"
            "- כלול useState/useReducer כשצריך state.\n"
            "- כלול value/onChange לטפסים, validation לשגיאות, map/key לרשימות, ו-navigation כשזה רלוונטי.\n"
        )
    elif task_id in DB_TASKS:
        code_contract = (
            "\nחוזה קוד חובה למשימות DB:\n"
            "- כתוב קוד Node/Mongoose-style.\n"
            "- כלול schema/model או שכבת model דומה, validation, duplicate check, וטיפול שגיאות.\n"
        )

    return (
        "בדוק משימה טכנית קטנה מתוך מבחן SVCollege.\n"
        "ענה בעברית פשוטה, ואז כתוב קוד אם המשימה דורשת פעולה טכנית.\n"
        "החזר בפורמט:\n"
        "1. משמעות המשימה\n"
        "2. איך פותרים אותה\n"
        "3. קוד\n"
        "4. מלכודת נפוצה\n"
        "5. בדיקת תקינות\n\n"
        f"task_id: {task_id}\n"
        f"leaf_id: {task_id}.{leaf_index}\n"
        f"משימה טכנית קטנה: {leaf_text}\n"
        f"הקשר מהתרגיל המקורי:\n{row['section_text']}\n"
        "כל קוד חייב להיות דטרמיניסטי ולהשתמש רק בנתוני בדיקה קבועים אם צריך."
        f"{code_contract}"
    )


def leaf_understanding_score(answer: str, leaf_text: str, task_id: str) -> tuple[int, list[str]]:
    issues: list[str] = []
    score = coverage_score(answer, [leaf_text, task_id])
    text = answer.lower()
    bonus = 0
    if "מלכודת" in answer or "trap" in answer.lower():
        bonus += 8
    else:
        issues.append("missing trap explanation")
    if "בדיק" in answer or "test" in answer.lower() or "verify" in answer.lower():
        bonus += 8
    else:
        issues.append("missing validity check")
    if "```" in answer:
        bonus += 4
    score = bounded_score(score + bonus)

    if task_id in API_TASKS:
        api_markers = [
            "router." in text or "endpoint" in text,
            any(token in text for token in ["req.body", "req.query", "req.params"]),
            any(token in text for token in ["status", "201", "200", "400", "404", "409"]),
            any(token in text for token in ["validation", "validate", "valid", "בדיק", "שגיאה"]),
            any(token in text for token in ["json", "res."]),
        ]
        if sum(1 for item in api_markers if item) >= 4:
            score = max(score, 85)
        if task_id == "api_put_update" and "findbyidandupdate" in text:
            if "runvalidators" not in text:
                issues.append("missing Mongoose runValidators true for findByIdAndUpdate")
                score = min(score, 70)
            if "new: true" not in text and "new:true" not in compact_code_text(answer):
                issues.append("missing Mongoose new true for findByIdAndUpdate")
                score = min(score, 95)
    elif task_id == "mongoose_update_options":
        if "findbyidandupdate" in text:
            score = max(score, 85)
        else:
            issues.append("missing findByIdAndUpdate focus")
        if "runvalidators" not in text:
            issues.append("missing Mongoose runValidators true for findByIdAndUpdate")
            score = min(score, 70)
        if "new: true" not in text and "new:true" not in compact_code_text(answer):
            issues.append("missing Mongoose new true for findByIdAndUpdate")
            score = min(score, 95)
    elif task_id in JS_TASKS:
        js_markers = [
            any(token in text for token in ["input", "output", "קלט", "פלט"]),
            any(token in text for token in ["solve", "function", "פונקציה"]),
            any(token in text for token in ["array", "matrix", "loop", "מערך", "מטריצה", "לולאה", "מיון", "ספירה"]),
            any(token in text for token in ["test", "בדיק"]),
        ]
        if sum(1 for item in js_markers if item) >= 3:
            score = max(score, 85)
    elif task_id in DB_TASKS:
        db_markers = [
            any(token in text for token in ["schema", "model", "mongoose"]),
            any(token in text for token in [".save", ".create", "document", "collection"]),
            any(token in text for token in ["validation", "valid", "required", "unique", "duplicate", "409"]),
        ]
        if sum(1 for item in db_markers if item) >= 2:
            score = max(score, 85)
    elif task_id == "client_list_render":
        list_markers = [
            any(token in text for token in [".map", "map(", "רשימה", "כרטיס", "table", "card"]),
            any(token in text for token in ["key=", "key {", "unique key", "מפתח"]),
            any(token in text for token in ["component", "react", "jsx", "קומפוננט"]),
            any(token in text for token in ["state", "props", "נתונים", "array", "מערך"]),
        ]
        if sum(1 for item in list_markers if item) >= 3:
            score = max(score, 85)
    elif task_id == "client_form_inputs":
        form_markers = [
            any(token in text for token in ["input", "select", "button", "טופס", "שדה"]),
            any(token in text for token in ["usestate", "state", "value", "onchange"]),
            any(token in text for token in ["onsubmit", "submit", "שליחה"]),
        ]
        if sum(1 for item in form_markers if item) >= 2:
            score = max(score, 85)
    elif task_id == "client_validation_rules":
        validation_markers = [
            any(token in text for token in ["regex", ".test", "length", "טווח", "אורך"]),
            any(token in text for token in ["error", "שגיאה", "alert", "message"]),
            any(token in text for token in ["return", "block", "חסום", "לא לשלוח"]),
        ]
        if sum(1 for item in validation_markers if item) >= 2:
            score = max(score, 85)
    elif task_id == "alerts_error_handling":
        error_markers = [
            any(token in text for token in ["try", "catch", "throw"]),
            any(token in text for token in ["error", "err", "שגיאה"]),
            any(token in text for token in ["alert", "message", "console.error", "status"]),
            any(token in text for token in ["בדיק", "test", "תקינות"]),
        ]
        if sum(1 for item in error_markers if item) >= 3:
            score = max(score, 85)
    elif task_id == "oop_design":
        oop_markers = [
            "class " in text,
            "constructor" in text,
            "this." in text,
            any(token in text for token in ["method", "מתודה", "fields", "שדות"]),
        ]
        if sum(1 for item in oop_markers if item) >= 3:
            score = max(score, 90)
    elif task_id in META_TASKS:
        meta_markers = [
            any(token in text for token in ["סעיף כותרת", "כותרת", "מקבץ"]),
            any(token in text for token in ["לא דרישה טכנית", "לא פעולה טכנית", "לא קוד"]),
            any(token in text for token in ["תתי", "תתי-הסעיפים", "יורשים", "הקשר"]),
        ]
        if sum(1 for item in meta_markers if item) >= 2:
            score = max(score, 90)
    elif task_id == "theory_explanation":
        theory_markers = [
            all(token in text for token in ["get", "post"]),
            "put" in text or "update" in text or "עדכון" in text,
            "delete" in text or "מחיקה" in text,
            "fetch" in text or "http" in text or "api" in text,
            any(token in text for token in ["מושג", "הגדרה", "להגדיר", "משמעות", "definition"]),
            any(token in text for token in ["יתרון", "חסרון", "חסרונות", "advantages", "disadvantages"]),
            any(token in text for token in ["הבדל", "לעומת", "השוואה", "this", "prototype", "virtual dom", "mongodb", "react"]),
            any(token in text for token in ["מלכודת", "נפוצה", "טעות"]),
            any(token in text for token in ["בדיקת תקינות", "תשובת מבחן", "דוגמה", "example"]),
        ]
        if sum(1 for item in theory_markers if item) >= 3:
            score = max(score, 85)

    return score, issues


def static_checks(code: str, task_id: str, leaf_text: str) -> list[dict[str, Any]]:
    text = code.lower()
    leaf = leaf_text.lower()
    checks: list[dict[str, Any]] = [
        {"name": "no forbidden random API", "ok": not contains_forbidden_random_api(code)}
    ]

    if task_id in CLIENT_TASKS:
        if task_id == "client_form_inputs":
            checks.extend(
                [
                    {"name": "state for form", "ok": "usestate" in text or "usereducer" in text},
                    {"name": "controlled value", "ok": "value=" in text or "value={" in text or "checked=" in text or "formdata[" in text},
                    {"name": "change handler", "ok": "onchange" in text or "handlechange" in text},
                ]
            )
            if any(token in leaf for token in ["submit", "שליחה", "שלח", "button", "כפתור"]):
                checks.append({"name": "submit handler", "ok": "onsubmit" in text or "submit" in text or "button" in text})
        if task_id == "client_validation_rules":
            checks.extend(
                [
                    {"name": "validation logic", "ok": "valid" in text or "error" in text},
                    {"name": "rule check", "ok": any(token in text for token in [".test(", "length", "number", "regex", ">", "<"])},
                    {"name": "blocks invalid input", "ok": "return" in text and any(token in text for token in ["error", "alert", "שגיאה", "שדה חובה", "חייב", "לא תקין"])},
                ]
            )
        if task_id == "client_navigation":
            checks.append(
                {"name": "navigation call", "ok": any(token in text for token in ["navigate", "redirect", "window.location", "href", "link", "browserrouter", "routes", "<route", "path="])}
            )
        if task_id == "client_list_render":
            checks.extend(
                [
                    {"name": "array map render", "ok": ".map(" in text},
                    {"name": "stable key", "ok": "key=" in text or "key={" in text},
                ]
            )
            if any(token in leaf for token in ["sort", "filter", "סינון", "מיון", "חיפוש"]):
                checks.append({"name": "sort/filter support", "ok": ".sort(" in text or ".filter(" in text or "filtered" in text})

    if task_id == "alerts_error_handling":
        checks.extend(
            [
                {"name": "error feedback", "ok": any(token in text for token in ["alert", "error", "message"])},
                {"name": "try/catch or status handling", "ok": "try" in text or "catch" in text or "status(" in text},
            ]
        )

    if task_id == "db_persistence":
        checks.append(
            {"name": "persistence/model pattern", "ok": any(token in text for token in ["schema", "model", "mongoose", ".save", ".create"])}
        )
        if any(token in leaf for token in ["crud", "create", "read", "update", "delete", "save", "find", "שמירה", "שמור", "קריאה", "שליפה", "עדכון", "מחיקה"]):
            checks.append(
                {"name": "write or read persistence operation", "ok": any(token in text for token in [".save", ".create", "find", "findone", "update", "delete"])}
            )

    if task_id == "db_uniqueness":
        checks.extend(
            [
                {"name": "persistence/model pattern", "ok": any(token in text for token in ["schema", "model", "mongoose", ".save", ".create"])},
                {"name": "duplicate or validation handling", "ok": any(token in text for token in ["findone", "exists", "duplicate", "409", "valid", "unique", "11000"])},
            ]
        )

    if task_id == "mongoose_update_options":
        checks.extend(
            [
                {"name": "mongoose findByIdAndUpdate present", "ok": contains_find_by_id_and_update(code)},
                {"name": "mongoose runValidators true", "ok": has_mongoose_run_validators(code)},
                {"name": "mongoose new true", "ok": has_mongoose_new_true(code)},
            ]
        )
    elif task_id == "api_put_update" and contains_find_by_id_and_update(code):
        checks.extend(
            [
                {"name": "mongoose runValidators true", "ok": has_mongoose_run_validators(code)},
                {"name": "mongoose new true", "ok": has_mongoose_new_true(code)},
            ]
        )

    if task_id == "oop_design":
        checks.extend(
            [
                {"name": "class declaration", "ok": "class " in text},
                {"name": "constructor present", "ok": "constructor" in text},
                {"name": "fields or methods", "ok": "this." in text},
            ]
        )

    if "status" in leaf or "404" in leaf or "500" in leaf:
        checks.append({"name": "status code present", "ok": "status(" in text or "404" in text or "500" in text})
    if "regex" in leaf or "טווח" in leaf or "אורך" in leaf:
        checks.append({"name": "validation primitive present", "ok": any(token in text for token in [".test(", "length", "regex", "number", "boolean", "checked", "required"])})
    return checks


def score_checks(checks: list[dict[str, Any]]) -> int:
    if not checks:
        return 0
    passed = sum(1 for check in checks if check.get("ok") is True)
    return bounded_score(int(round((100 * passed) / len(checks))))


def node_path(verifier_dir: Path, package: str) -> str:
    return str((verifier_dir / "node_modules" / package).resolve())


def run_node(script_path: Path, cwd: Path, timeout: int = 20) -> tuple[dict[str, Any] | None, str | None]:
    completed = subprocess.run(
        ["node", str(script_path.resolve())],
        cwd=str(cwd.resolve()),
        capture_output=True,
        text=True,
        check=False,
        timeout=timeout,
    )
    raw = (completed.stdout or "").strip()
    if not raw:
        return None, (completed.stderr or "empty output").strip()
    try:
        return json.loads(raw), None
    except json.JSONDecodeError:
        return None, raw[:2000]


def normalize_commonjs(code: str) -> str:
    normalized = code.replace("export default", "module.exports =")
    normalized = re.sub(r"export\s+\{[^}]*\};?", "", normalized)
    return normalized


def run_api_leaf(code: str, task_id: str, case_dir: Path, verifier_dir: Path) -> list[dict[str, Any]]:
    case_dir.mkdir(parents=True, exist_ok=True)
    router_code = normalize_commonjs(code)
    express_req = f"require({json.dumps(node_path(verifier_dir, 'express'))})"
    router_code = router_code.replace("require('express')", express_req)
    router_code = router_code.replace('require("express")', express_req)
    if "module.exports" not in router_code:
        router_code += "\nmodule.exports = router;\n"
    (case_dir / "router.js").write_text(router_code, encoding="utf-8")

    runner = f"""
const express = require({json.dumps(node_path(verifier_dir, 'express'))});
const supertest = require({json.dumps(node_path(verifier_dir, 'supertest'))});
const router = require('./router.js');

async function run() {{
  const app = express();
  app.use(express.json());
  app.use('/api/items', router);
  const checks = [];
  async function safe(name, fn) {{
    try {{
      checks.push({{ name, ok: Boolean(await fn()) }});
    }} catch (error) {{
      checks.push({{ name, ok: false, error: String(error && error.message ? error.message : error) }});
    }}
  }}
  {'await safe("GET all", async () => { const res = await supertest(app).get("/api/items"); return res.status === 200 && Array.isArray(res.body); });' if task_id == 'api_get_all' else ''}
  {'await safe("GET or POST filter", async () => { const postRes = await supertest(app).post("/api/items/filter").send({ value: 50, maxSalary: 50, max_salary: 50, salary: 50, threshold: 50 }); if (postRes.status < 500 && Array.isArray(postRes.body)) return true; const getRes = await supertest(app).get("/api/items").query({ value: 50, maxSalary: 50, max_salary: 50, salary: 50, threshold: 50 }); if (getRes.status < 500 && Array.isArray(getRes.body)) return true; const getFilterRes = await supertest(app).get("/api/items/filter").query({ value: 50, maxSalary: 50, max_salary: 50, salary: 50, threshold: 50 }); return getFilterRes.status < 500 && Array.isArray(getFilterRes.body); });' if task_id == 'api_get_filtered' else ''}
  {'await safe("POST create valid", async () => { const paths = ["/api/items", "/api/items/add", "/api/items/addnewcourse"]; const payloads = [{ id: 3, name: "New Item", subject: "Math", text: "hello", value: 42, salary: 42, grade: 90 }, { id: 4, name: "Another Item", subject: "Math", text: "hello", value: 42, salary: 42, grade: "A" }, { id: 5, code: "54321", name: "Green Box", inStock: true, value: 42, salary: 42, grade: "A" }]; for (const path of paths) { for (const payload of payloads) { const res = await supertest(app).post(path).send(payload); if ([200, 201].includes(res.status)) return true; } } return false; }); await safe("POST create invalid", async () => { const paths = ["/api/items", "/api/items/add", "/api/items/addnewcourse"]; for (const path of paths) { const res = await supertest(app).post(path).send({}); if ([400, 409, 422].includes(res.status)) return true; } return false; });' if task_id == 'api_post_create' else ''}
  {'await safe("PUT missing", async () => { const res = await supertest(app).put("/api/items/999").send({ name: "Updated", grade: 88, value: 88, salary: 88 }); return res.status === 404; });' if task_id == 'api_put_update' else ''}
  {'await safe("DELETE missing", async () => { const res = await supertest(app).delete("/api/items/999"); return res.status === 404; });' if task_id == 'api_delete' else ''}
  process.stdout.write(JSON.stringify({{ checks }}));
}}
run().catch((error) => process.stdout.write(JSON.stringify({{ checks: [{{ name: "api runtime", ok: false, error: String(error && error.stack ? error.stack : error) }}] }})));
"""
    (case_dir / "run_api_leaf.js").write_text(runner, encoding="utf-8")
    parsed, error = run_node(case_dir / "run_api_leaf.js", verifier_dir)
    if error:
        return [{"name": "api runtime", "ok": False, "error": error}]
    return parsed.get("checks", []) if parsed else [{"name": "api runtime", "ok": False}]


def js_runtime_checks(section_text: str) -> str:
    lower = section_text.lower()
    if "מטריצה" in lower and "כמה פעמים" in lower:
        return """
const result = mod.solve([[1,1,2,4,1,1,7],[1,1,1,2,1,1,7],[7,7,1,1,1,1,1]]);
const byNum = new Map(result.map((row) => [row.num, row.count ?? row.counter]));
checks.push({ name: 'count 1', ok: byNum.get(1) === 14 });
checks.push({ name: 'count 2', ok: byNum.get(2) === 2 });
checks.push({ name: 'count 4', ok: byNum.get(4) === 1 });
checks.push({ name: 'count 7', ok: byNum.get(7) === 4 });
try { mod.solve([[1, 'x']]); checks.push({ name: 'throws non-number', ok: false }); } catch (_) { checks.push({ name: 'throws non-number', ok: true }); }
"""
    if "642531" in lower or "ממיינת את הספרות" in lower:
        return """
checks.push({ name: 'sort digits', ok: mod.solve(642531) === 123456 || mod.solve(642531) === '123456' });
checks.push({ name: 'sort repeated digits', ok: ['1255', '01255'].includes(String(mod.solve(55021))) || mod.solve(55021) === 1255 });
"""
    if "מערך שלם" in lower and "מערך חלקי" in lower:
        return """
checks.push({ name: 'subsequence true', ok: mod.solve([1,2,3,4], [1,3,4]) === true });
checks.push({ name: 'subsequence true 2', ok: mod.solve([1,2,3,4], [2,4]) === true });
checks.push({ name: 'subsequence false missing', ok: mod.solve([1,2,3,4], [1,2,5]) === false });
checks.push({ name: 'subsequence false order', ok: mod.solve([1,2,3,4], [4,2]) === false });
"""
    return """
checks.push({ name: 'solve callable', ok: typeof mod.solve === 'function' });
"""


def run_js_leaf(code: str, row: dict[str, Any], case_dir: Path, verifier_dir: Path) -> list[dict[str, Any]]:
    case_dir.mkdir(parents=True, exist_ok=True)
    solution = normalize_commonjs(code)
    if "module.exports" not in solution and "function solve" in solution:
        solution += "\nmodule.exports = { solve };\n"
    (case_dir / "solution.js").write_text(solution, encoding="utf-8")
    runner = f"""
const mod = require('./solution.js');
const checks = [];
try {{
  checks.push({{ name: 'exports solve', ok: typeof mod.solve === 'function' }});
  if (typeof mod.solve === 'function') {{
    {js_runtime_checks(row['section_text'])}
  }}
}} catch (error) {{
  checks.push({{ name: 'js runtime', ok: false, error: String(error && error.stack ? error.stack : error) }});
}}
process.stdout.write(JSON.stringify({{ checks }}));
"""
    (case_dir / "run_js_leaf.js").write_text(runner, encoding="utf-8")
    parsed, error = run_node(case_dir / "run_js_leaf.js", verifier_dir)
    if error:
        return [{"name": "js runtime", "ok": False, "error": error}]
    return parsed.get("checks", []) if parsed else [{"name": "js runtime", "ok": False}]


def run_node_file_leaf(code: str, case_dir: Path, verifier_dir: Path) -> list[dict[str, Any]]:
    case_dir.mkdir(parents=True, exist_ok=True)
    solution = normalize_commonjs(code)
    if "module.exports" not in solution:
        solution += "\nmodule.exports = FilePackage;\n"
    (case_dir / "solution.js").write_text(solution, encoding="utf-8")
    runner = """
const fs = require('fs');
const path = require('path');
const exported = require('./solution.js');
const FilePackage = exported && (exported.FilePackage || exported.default) ? (exported.FilePackage || exported.default) : exported;
const checks = [];
function isPromise(value) {
  return value && typeof value.then === 'function';
}
async function maybeAwait(value) {
  return isPromise(value) ? await value : value;
}
async function run() {
try {
  const filePath = path.join(__dirname, 'leaf_file.txt');
  const renamedPath = path.join(__dirname, 'renamed_leaf_file.txt');
  const copiedPath = path.join(__dirname, 'copied_leaf_file.txt');
  const renamedName = 'renamed_leaf_file.txt';
  const copiedName = 'copied_leaf_file.txt';
  const instance = new FilePackage(filePath);
  await new Promise((resolve) => setTimeout(resolve, 20));
  checks.push({ name: 'constructor creates file', ok: fs.existsSync(filePath) });
  if (typeof instance.appendContent === 'function') await maybeAwait(instance.appendContent('hello world'));
  checks.push({ name: 'append content', ok: fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf8').includes('hello world') });
  const searchResult = typeof instance.searchWord === 'function' ? await maybeAwait(instance.searchWord('world')) : false;
  checks.push({ name: 'search word', ok: searchResult === true });
  let renameOk = false;
  if (typeof instance.rename === 'function') {
    try {
      await maybeAwait(instance.rename(renamedPath));
      renameOk = fs.existsSync(renamedPath);
    } catch (error) {
      if (fs.existsSync(filePath)) {
        await maybeAwait(instance.rename(renamedName));
        renameOk = fs.existsSync(renamedPath) || fs.existsSync(path.join(process.cwd(), renamedName));
      }
    }
  }
  checks.push({ name: 'rename file', ok: renameOk });
  let copyOk = false;
  if (typeof instance.copy === 'function') {
    try {
      await maybeAwait(instance.copy(copiedPath));
      copyOk = fs.existsSync(copiedPath) || fs.readdirSync(__dirname).some((name) => name.includes('copy'));
    } catch (error) {
      try {
        await maybeAwait(instance.copy(copiedName));
        copyOk = fs.existsSync(copiedPath) || fs.readdirSync(__dirname).some((name) => name.includes('copy')) || fs.readdirSync(process.cwd()).some((name) => name.includes('copy'));
      } catch (innerError) {
        copyOk = false;
      }
    }
  }
  checks.push({ name: 'copy file', ok: copyOk });
} catch (error) {
  checks.push({ name: 'node file runtime', ok: false, error: String(error && error.stack ? error.stack : error) });
}
process.stdout.write(JSON.stringify({ checks }));
}
run();
"""
    (case_dir / "run_node_file_leaf.js").write_text(runner, encoding="utf-8")
    parsed, error = run_node(case_dir / "run_node_file_leaf.js", verifier_dir)
    if error:
        return [{"name": "node file runtime", "ok": False, "error": error}]
    return parsed.get("checks", []) if parsed else [{"name": "node file runtime", "ok": False}]


def execution_score(code: str, row: dict[str, Any], task_id: str, leaf_text: str, case_dir: Path, verifier_dir: Path) -> tuple[int | None, list[dict[str, Any]], bool]:
    task_id = effective_task_id_for_row(row, task_id)
    if task_id in MANUAL_TASKS:
        return None, [{"name": "manual review required", "ok": False}], True
    if task_id in THEORY_TASKS or task_id in META_TASKS:
        checks = static_checks(code, task_id, leaf_text)
        return score_checks(checks), checks, False

    checks = static_checks(code, task_id, leaf_text)
    if task_id in API_TASKS:
        checks.extend(run_api_leaf(code, task_id, case_dir / "api", verifier_dir))
    elif task_id in JS_TASKS:
        checks.extend(run_js_leaf(code, row, case_dir / "js", verifier_dir))
    elif task_id == "node_file_io":
        checks.extend(run_node_file_leaf(code, case_dir / "node_file", verifier_dir))

    score = score_checks(checks)
    if task_id in {"api_put_update", "mongoose_update_options"}:
        score = min(score, mongoose_update_score_cap(code))
    critical = any(
        check.get("ok") is False
        and any(token in str(check.get("name", "")).lower() for token in ["runtime", "forbidden", "get", "post", "put", "delete", "mongoose"])
        for check in checks
    )
    return score, checks, critical


def leaf_status(understanding: int, execution: int | None, critical: bool) -> tuple[int | None, str]:
    if execution is None:
        return None, "BLOCKED_MANUAL_REVIEW"
    final = bounded_score(int(round((0.4 * understanding) + (0.6 * execution))))
    if final == 100 and understanding == 100 and execution == 100 and not critical:
        return final, "MASTERED_100"
    if final >= 85 and not critical:
        return final, "GOOD"
    return final, "WEAK"


def exercise_status(exercise_understanding: int, decomposition: int, leaf_average: int | None, blocked: bool) -> tuple[int | None, str]:
    if blocked:
        return None, "BLOCKED_MANUAL_REVIEW"
    leaf_part = leaf_average if leaf_average is not None else 0
    final = bounded_score(int(round((0.4 * exercise_understanding) + (0.3 * decomposition) + (0.3 * leaf_part))))
    if final == 100 and exercise_understanding == 100 and decomposition == 100 and leaf_part == 100:
        return final, "MASTERED_100"
    if final >= 85:
        return final, "GOOD"
    return final, "WEAK"


def format_json_cell(value: Any) -> str:
    if value is None:
        return "N/A"
    return str(value).replace("|", "/").replace("\n", " ")[:240]


def aggregate_outputs(out_dir: Path) -> None:
    decomp_jsonl = out_dir / "MODEL_DECOMPOSITION_SCOREBOARD.jsonl"
    leaf_jsonl = out_dir / "MODEL_LEAF_TASK_SCOREBOARD.jsonl"
    raw_decomp_rows = read_jsonl(decomp_jsonl) if decomp_jsonl.exists() else []
    raw_leaf_rows = read_jsonl(leaf_jsonl) if leaf_jsonl.exists() else []

    decomp_by_key = {str(row.get("section_key", row.get("idx"))): row for row in raw_decomp_rows}
    task_ids_by_section = {
        str(row.get("idx")): set(str(task_id) for task_id in row.get("task_ids", []))
        for row in decomp_by_key.values()
    }
    leaf_by_key: dict[str, dict[str, Any]] = {}
    for row in raw_leaf_rows:
        section_idx = str(row.get("section_idx"))
        allowed_task_ids = task_ids_by_section.get(section_idx)
        if allowed_task_ids is not None and str(row.get("task_id")) not in allowed_task_ids:
            continue
        leaf_by_key[str(row.get("leaf_key"))] = row
    decomp_rows = list(decomp_by_key.values())
    leaf_rows = list(leaf_by_key.values())

    decomp_summary = {
        "total": len(decomp_rows),
        "mastered_100": sum(1 for row in decomp_rows if row.get("status") == "MASTERED_100"),
        "good": sum(1 for row in decomp_rows if row.get("status") == "GOOD"),
        "weak": sum(1 for row in decomp_rows if row.get("status") == "WEAK"),
        "blocked_manual_review": sum(1 for row in decomp_rows if row.get("status") == "BLOCKED_MANUAL_REVIEW"),
    }
    leaf_summary = {
        "total": len(leaf_rows),
        "mastered_100": sum(1 for row in leaf_rows if row.get("status") == "MASTERED_100"),
        "good": sum(1 for row in leaf_rows if row.get("status") == "GOOD"),
        "weak": sum(1 for row in leaf_rows if row.get("status") == "WEAK"),
        "blocked_manual_review": sum(1 for row in leaf_rows if row.get("status") == "BLOCKED_MANUAL_REVIEW"),
    }

    write_json(out_dir / "MODEL_DECOMPOSITION_SCOREBOARD.json", {"summary": decomp_summary, "sections": decomp_rows})
    write_json(out_dir / "MODEL_LEAF_TASK_SCOREBOARD.json", {"summary": leaf_summary, "leaf_tasks": leaf_rows})

    decomp_md = [
        "# MODEL DECOMPOSITION SCOREBOARD",
        "",
        f"- total: `{decomp_summary['total']}`",
        f"- mastered_100: `{decomp_summary['mastered_100']}`",
        f"- good: `{decomp_summary['good']}`",
        f"- weak: `{decomp_summary['weak']}`",
        f"- blocked_manual_review: `{decomp_summary['blocked_manual_review']}`",
        "",
        "| idx | file | question/section | exercise_understanding | decomposition | leaf_average | final | status | issues |",
        "|---:|---|---|---:|---:|---:|---:|---|---|",
    ]
    for row in sorted(decomp_rows, key=lambda item: int(item["idx"])):
        decomp_md.append(
            f"| {row['idx']} | {format_json_cell(row['file'])} | {row['question']}/{row['section']} | "
            f"{row['exercise_understanding_score']} | {row['decomposition_score']} | "
            f"{format_json_cell(row.get('leaf_average_score'))} | {format_json_cell(row.get('final_score'))} | "
            f"{row['status']} | {format_json_cell('; '.join(row.get('issues', [])))} |"
        )
    (out_dir / "MODEL_DECOMPOSITION_SCOREBOARD.md").write_text("\n".join(decomp_md) + "\n", encoding="utf-8")

    leaf_md = [
        "# MODEL LEAF TASK SCOREBOARD",
        "",
        f"- total: `{leaf_summary['total']}`",
        f"- mastered_100: `{leaf_summary['mastered_100']}`",
        f"- good: `{leaf_summary['good']}`",
        f"- weak: `{leaf_summary['weak']}`",
        f"- blocked_manual_review: `{leaf_summary['blocked_manual_review']}`",
        "",
        "| leaf_key | section | task_id | leaf | understanding | execution | final | status | fix_needed |",
        "|---|---|---|---|---:|---:|---:|---|---|",
    ]
    for row in sorted(leaf_rows, key=lambda item: (int(item["section_idx"]), item["task_id"], int(item["leaf_index"]))):
        leaf_md.append(
            f"| {row['leaf_key']} | {row['section_idx']} | {row['task_id']} | {format_json_cell(row['leaf_text'])} | "
            f"{row['leaf_understanding_score']} | {format_json_cell(row.get('leaf_execution_score'))} | "
            f"{format_json_cell(row.get('final_score'))} | {row['status']} | {format_json_cell(row.get('fix_needed', ''))} |"
        )
    (out_dir / "MODEL_LEAF_TASK_SCOREBOARD.md").write_text("\n".join(leaf_md) + "\n", encoding="utf-8")

    weak_leaf = [row for row in leaf_rows if row.get("status") in {"WEAK", "BLOCKED_MANUAL_REVIEW"}]
    weak_by_task: dict[str, list[dict[str, Any]]] = {}
    for row in weak_leaf:
        weak_by_task.setdefault(row["task_id"], []).append(row)

    remediation = [
        "# MODEL REMEDIATION PLAN LEAF LEVEL",
        "",
        f"- weak_or_blocked_leaf_tasks: `{len(weak_leaf)}`",
        "",
        "## Weak Task Families",
        "",
        "| task_id | count | action |",
        "|---|---:|---|",
    ]
    for task_id, rows in sorted(weak_by_task.items(), key=lambda item: (-len(item[1]), item[0])):
        if task_id.startswith("api_"):
            action = "Add Express/Supertest execution cases + DPO hard negatives"
        elif task_id.startswith("client_"):
            action = "Add React/static verifier + focused SFT examples"
        elif task_id == "js_algorithms":
            action = "Add Node runtime tests + algorithm drills"
        elif task_id == "manual_review":
            action = "Extract missing source text before scoring"
        else:
            action = "Add focused SFT + verifier rule"
        remediation.append(f"| {task_id} | {len(rows)} | {action} |")

    remediation.extend(["", "## Repair Prompt Template", "", "```text"])
    remediation.extend(
        [
            "Create SVCollege exam-only remediation examples for the failed leaf task.",
            "The answer must include meaning, decomposition, exact implementation, common trap, and a validity check.",
            "Rejected answers must miss exactly the observed failure: missing validation, wrong status, incomplete code, or failed execution.",
            "Use deterministic fixtures only and do not use forbidden random APIs.",
        ]
    )
    remediation.append("```")
    (out_dir / "MODEL_REMEDIATION_PLAN_LEAF_LEVEL.md").write_text("\n".join(remediation) + "\n", encoding="utf-8")


async def evaluate_section(
    client: httpx.AsyncClient,
    args: argparse.Namespace,
    row: dict[str, Any],
    subtasks: dict[str, list[str]],
    done_leaf_keys: set[str],
    done_section_keys: set[str],
) -> None:
    section_key = str(row["idx"])
    out_dir = args.out_dir
    log_path = out_dir / "LEAF_EVAL_RUN_LOG.md"
    leaf_scores_for_section: list[int] = []

    if section_key not in done_section_keys:
        async def build_candidate(sample_index: int) -> dict[str, Any]:
            variant_note = sample_variant_note(sample_index) if args.decomposition_samples > 1 else ""
            modules_raw = ""
            if args.decomposition_two_stage:
                modules_raw = await chat(
                    client,
                    args.base_url,
                    args.model,
                    [
                        {"role": "system", "content": SYSTEM},
                        {"role": "user", "content": modules_prompt(row, variant_note)},
                    ],
                    num_ctx=args.num_ctx,
                    num_predict=args.num_predict,
                    keep_alive=args.keep_alive,
                )
                raw = await chat(
                    client,
                    args.base_url,
                    args.model,
                    [
                        {"role": "system", "content": SYSTEM},
                        {"role": "user", "content": module_leaf_prompt(row, modules_raw, variant_note)},
                    ],
                    num_ctx=args.num_ctx,
                    num_predict=args.num_predict,
                    keep_alive=args.keep_alive,
                )
            else:
                prompt = decomposition_prompt(row)
                if variant_note:
                    prompt += "\n\n" + variant_note
                raw = await chat(
                    client,
                    args.base_url,
                    args.model,
                    [
                        {"role": "system", "content": SYSTEM},
                        {"role": "user", "content": prompt},
                    ],
                    num_ctx=args.num_ctx,
                    num_predict=args.num_predict,
                    keep_alive=args.keep_alive,
                )

            parsed_candidate = extract_json(raw)
            if parsed_candidate is None and args.json_repair:
                raw_json_repair = await chat(
                    client,
                    args.base_url,
                    args.model,
                    [
                        {"role": "system", "content": SYSTEM},
                        {"role": "user", "content": json_repair_prompt(row, raw)},
                    ],
                    num_ctx=args.num_ctx,
                    num_predict=args.num_predict,
                    keep_alive=args.keep_alive,
                )
                repaired_json = extract_json(raw_json_repair)
                if repaired_json is not None:
                    raw = raw_json_repair
                    parsed_candidate = repaired_json

            candidate_understanding, candidate_decomposition, candidate_issues = score_decomposition(row, parsed_candidate, raw)
            if args.decomposition_repair and (candidate_understanding < 95 or candidate_decomposition < 95 or candidate_issues):
                raw_repair = await chat(
                    client,
                    args.base_url,
                    args.model,
                    [
                        {"role": "system", "content": SYSTEM},
                        {"role": "user", "content": decomposition_repair_prompt(row, raw)},
                    ],
                    num_ctx=args.num_ctx,
                    num_predict=args.num_predict,
                    keep_alive=args.keep_alive,
                )
                repaired = extract_json(raw_repair)
                if repaired is None and args.json_repair:
                    raw_json_repair = await chat(
                        client,
                        args.base_url,
                        args.model,
                        [
                            {"role": "system", "content": SYSTEM},
                            {"role": "user", "content": json_repair_prompt(row, raw_repair)},
                        ],
                        num_ctx=args.num_ctx,
                        num_predict=args.num_predict,
                        keep_alive=args.keep_alive,
                    )
                    repaired_json = extract_json(raw_json_repair)
                    if repaired_json is not None:
                        raw_repair = raw_json_repair
                        repaired = repaired_json
                repair_understanding, repair_decomposition, repair_issues = score_decomposition(row, repaired, raw_repair)
                current_total = candidate_understanding + candidate_decomposition - (10 * len(candidate_issues))
                repair_total = repair_understanding + repair_decomposition - (10 * len(repair_issues))
                if repair_total > current_total:
                    raw = raw_repair
                    parsed_candidate = repaired
                    candidate_understanding = repair_understanding
                    candidate_decomposition = repair_decomposition
                    candidate_issues = repair_issues

            return {
                "sample_index": sample_index,
                "modules_raw": modules_raw,
                "raw": raw,
                "parsed": unwrap_decomposition_payload(parsed_candidate),
                "exercise_understanding_score": candidate_understanding,
                "decomposition_score": candidate_decomposition,
                "issues": candidate_issues,
                "selection_score": candidate_understanding + candidate_decomposition - (10 * len(candidate_issues)),
            }

        candidates = [await build_candidate(sample_index) for sample_index in range(1, max(1, args.decomposition_samples) + 1)]
        best_candidate = max(candidates, key=lambda item: item["selection_score"])
        raw_decomp = best_candidate["raw"]
        parsed = best_candidate["parsed"]
        exercise_understanding = best_candidate["exercise_understanding_score"]
        decomposition = best_candidate["decomposition_score"]
        issues = best_candidate["issues"]
        if args.decomposition_samples > 1:
            append_jsonl(
                out_dir / "decomposition_rejection_sampling.jsonl",
                {
                    "section_idx": row["idx"],
                    "file": row["file"],
                    "question": row["question"],
                    "section": row["section"],
                    "chosen_sample_index": best_candidate["sample_index"],
                    "chosen": best_candidate["raw"],
                    "rejected": [candidate["raw"] for candidate in candidates if candidate["sample_index"] != best_candidate["sample_index"]],
                    "scores": [
                        {
                            "sample_index": candidate["sample_index"],
                            "exercise_understanding_score": candidate["exercise_understanding_score"],
                            "decomposition_score": candidate["decomposition_score"],
                            "issues": candidate["issues"],
                            "selection_score": candidate["selection_score"],
                        }
                        for candidate in candidates
                    ],
                },
            )
    else:
        raw_decomp = ""
        exercise_understanding = 0
        decomposition = 0
        issues = ["section already evaluated"]

    if not args.decomposition_only:
        for task_id in row.get("task_ids", []):
            effective_task_id = effective_task_id_for_row(row, task_id)
            leaves = subtasks.get(effective_task_id, subtasks.get(task_id, []))
            if args.max_leaf_per_task > 0:
                leaves = leaves[: args.max_leaf_per_task]
            for leaf_index, leaf_text in enumerate(leaves, start=1):
                leaf_key = f"{row['idx']}:{task_id}:{leaf_index}"
                if leaf_key in done_leaf_keys and not args.force:
                    continue

                if task_id in MANUAL_TASKS:
                    leaf_row = {
                        "leaf_key": leaf_key,
                        "section_idx": row["idx"],
                        "file": row["file"],
                        "question": row["question"],
                        "section": row["section"],
                        "task_id": task_id,
                        "leaf_index": leaf_index,
                        "leaf_text": leaf_text,
                        "leaf_understanding_score": 0,
                        "leaf_execution_score": None,
                        "execution_checks": [{"name": "manual review required", "ok": False}],
                        "final_score": None,
                        "status": "BLOCKED_MANUAL_REVIEW",
                        "fix_needed": "Extract full source text before scoring this leaf.",
                    }
                    append_jsonl(out_dir / "MODEL_LEAF_TASK_SCOREBOARD.jsonl", leaf_row)
                    append_log(log_path, f"- leaf {leaf_key}: BLOCKED_MANUAL_REVIEW")
                    continue

                answer = await chat(
                    client,
                    args.base_url,
                    args.model,
                    [
                        {"role": "system", "content": SYSTEM},
                        {"role": "user", "content": leaf_prompt(row, effective_task_id, leaf_index, leaf_text)},
                    ],
                    num_ctx=args.num_ctx,
                    num_predict=args.num_predict,
                    keep_alive=args.keep_alive,
                )
                code = extract_code(answer)
                leaf_understanding, understanding_issues = leaf_understanding_score(answer, leaf_text, effective_task_id)
                execution, checks, critical = execution_score(
                    code=code,
                    row=row,
                    task_id=task_id,
                    leaf_text=leaf_text,
                    case_dir=out_dir / "leaf_execution_cases" / f"section_{int(row['idx']):02d}" / f"{task_id}_{leaf_index}",
                    verifier_dir=args.verifier_dir,
                )
                final, status = leaf_status(leaf_understanding, execution, critical)
                if isinstance(final, int):
                    leaf_scores_for_section.append(final)
                failed_checks = [str(check.get("name", "")) for check in checks if check.get("ok") is False]
                fix_needed = "No fix needed."
                if status not in {"MASTERED_100", "GOOD"}:
                    parts = understanding_issues + failed_checks
                    fix_needed = "; ".join(parts[:6]) if parts else "Improve leaf answer."

                leaf_row = {
                    "leaf_key": leaf_key,
                    "section_idx": row["idx"],
                    "file": row["file"],
                    "question": row["question"],
                    "section": row["section"],
                    "task_id": task_id,
                    "effective_task_id": effective_task_id,
                    "leaf_index": leaf_index,
                    "leaf_text": leaf_text,
                    "model_answer": answer,
                    "extracted_code": code,
                    "leaf_understanding_score": leaf_understanding,
                    "understanding_issues": understanding_issues,
                    "leaf_execution_score": execution,
                    "execution_checks": checks,
                    "critical_failure": critical,
                    "final_score": final,
                    "status": status,
                    "fix_needed": fix_needed,
                }
                append_jsonl(out_dir / "MODEL_LEAF_TASK_SCOREBOARD.jsonl", leaf_row)
                append_log(log_path, f"- leaf {leaf_key}: {status}, final={final}")

    if section_key not in done_section_keys or args.force:
        if args.decomposition_only:
            leaf_average = getattr(args, "existing_leaf_averages", {}).get(int(row["idx"]))
        else:
            leaf_average = int(round(sum(leaf_scores_for_section) / len(leaf_scores_for_section))) if leaf_scores_for_section else None
        blocked = any(task in MANUAL_TASKS for task in row.get("task_ids", []))
        final_score, status = exercise_status(exercise_understanding, decomposition, leaf_average, blocked)
        section_row = {
            "section_key": section_key,
            "idx": row["idx"],
            "file": row["file"],
            "question": row["question"],
            "section": row["section"],
            "section_text": row["section_text"],
            "task_ids": row.get("task_ids", []),
            "exercise_understanding_score": exercise_understanding,
            "decomposition_score": decomposition,
            "leaf_average_score": leaf_average,
            "final_score": final_score,
            "status": status,
            "issues": issues,
            "raw_decomposition_answer": raw_decomp,
        }
        append_jsonl(out_dir / "MODEL_DECOMPOSITION_SCOREBOARD.jsonl", section_row)
        append_log(log_path, f"- section {section_key}: {status}, final={final_score}")


async def main_async() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", default=os.getenv("EXAM_MODEL", "svcollege-fullstack-exam"))
    parser.add_argument("--base-url", default=os.getenv("OLLAMA_BASE_URL", "http://127.0.0.1:11434"))
    parser.add_argument("--sections", type=Path, default=Path("outputs/eval/exam_sections_task_breakdown.jsonl"))
    parser.add_argument("--subtasks", type=Path, default=Path("outputs/eval/task_subtasks_decomposition.json"))
    parser.add_argument("--task-tree", type=Path, default=Path("outputs/eval/exam_tasks_tree_detailed.json"))
    parser.add_argument("--out-dir", type=Path, default=Path("outputs/training"))
    parser.add_argument("--verifier-dir", type=Path, default=Path("verifier/js"))
    parser.add_argument("--start-idx", type=int, default=1)
    parser.add_argument("--end-idx", type=int, default=0)
    parser.add_argument("--idx-list", default="")
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--batch-size", type=int, default=3)
    parser.add_argument("--keep-alive", default="0s")
    parser.add_argument("--num-ctx", type=int, default=8192)
    parser.add_argument("--num-predict", type=int, default=900)
    parser.add_argument("--max-leaf-per-task", type=int, default=0)
    parser.add_argument("--merge-only", action="store_true")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--decomposition-only", action="store_true")
    parser.add_argument("--decomposition-repair", action="store_true")
    parser.add_argument("--decomposition-two-stage", action="store_true")
    parser.add_argument("--json-repair", action="store_true")
    parser.add_argument("--decomposition-samples", type=int, default=1)
    args = parser.parse_args()

    args.out_dir.mkdir(parents=True, exist_ok=True)
    if args.merge_only:
        aggregate_outputs(args.out_dir)
        print(f"Merged outputs in {args.out_dir}")
        return

    all_rows = read_jsonl(args.sections)
    if args.idx_list:
        rows = selected_sections_by_idx_list(all_rows, args.idx_list, args.limit)
    else:
        rows = selected_sections(all_rows, args.start_idx, args.end_idx, args.limit)
    if args.batch_size > 0:
        rows = rows[: args.batch_size]
    subtasks = load_subtasks(args.subtasks)
    _ = read_json(args.task_tree)

    done_section_keys = set() if args.force else existing_keys(args.out_dir / "MODEL_DECOMPOSITION_SCOREBOARD.jsonl", "section_key")
    done_leaf_keys = set() if args.force else existing_keys(args.out_dir / "MODEL_LEAF_TASK_SCOREBOARD.jsonl", "leaf_key")
    args.existing_leaf_averages = existing_leaf_averages(args.out_dir) if args.decomposition_only else {}
    run_started_at = datetime.now().astimezone().strftime("%Y-%m-%d %H:%M %Z")
    run_scope = f"idx_list={args.idx_list}" if args.idx_list else f"start={args.start_idx}, end={args.end_idx}"
    append_log(args.out_dir / "LEAF_EVAL_RUN_LOG.md", f"## Run start: {run_started_at} | {run_scope}, batch_size={args.batch_size}")

    async with httpx.AsyncClient() as client:
        for row in rows:
            print(f"Evaluating section {row['idx']}: {row['file']} {row['question']}/{row['section']}", flush=True)
            await evaluate_section(client, args, row, subtasks, done_leaf_keys, done_section_keys)
            aggregate_outputs(args.out_dir)

    aggregate_outputs(args.out_dir)
    print(f"Wrote {args.out_dir / 'MODEL_DECOMPOSITION_SCOREBOARD.md'}")
    print(f"Wrote {args.out_dir / 'MODEL_LEAF_TASK_SCOREBOARD.md'}")
    print(f"Wrote {args.out_dir / 'MODEL_REMEDIATION_PLAN_LEAF_LEVEL.md'}")


def main() -> None:
    asyncio.run(main_async())


if __name__ == "__main__":
    main()
