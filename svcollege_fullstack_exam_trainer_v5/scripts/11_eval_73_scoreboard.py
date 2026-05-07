#!/usr/bin/env python3
"""Build a full 73-section SVCollege model scoreboard.

The evaluator produces two grades per section:
- understanding_score: judged by the configured grader model.
- code_execution_score: real Node/Supertest execution where practical, strict
  static verification for frontend/UI answers, and N/A for pure theory/manual
  review sections.

All generated execution fixtures are deterministic and local to outputs/training.
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


SYSTEM = "You are SVCollege Full-Stack Exam Coach. Answer in Hebrew, code in English."
GRADER_SYSTEM = "You are a strict SVCollege full-stack exam grader. Return JSON only."

THEORY_TASKS = {"theory_explanation"}
MANUAL_TASKS = {"manual_review"}
API_TASKS = {"api_get_all", "api_get_filtered", "api_post_create", "api_put_update", "api_delete"}
FRONTEND_TASKS = {
    "client_form_inputs",
    "client_validation_rules",
    "client_navigation",
    "client_list_render",
}
DB_TASKS = {"db_uniqueness", "db_persistence"}
NODE_TASKS = {"node_file_io", "oop_design"}
JS_TASKS = {"js_algorithms"}
META_TASKS = {"question_scope_inherited"}


def read_jsonl(path: Path) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    with path.open("r", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                rows.append(json.loads(line))
    return rows


def write_jsonl(path: Path, rows: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        for row in rows:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")


def extract_json(text: str) -> dict[str, Any] | None:
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


def extract_code(answer: str) -> str:
    block = re.search(
        r"```(?:javascript|js|jsx|tsx|typescript|ts)?\s*(.*?)```",
        answer,
        flags=re.DOTALL | re.IGNORECASE,
    )
    if block:
        return block.group(1).strip()
    return answer.strip()


async def chat(
    client: httpx.AsyncClient,
    base_url: str,
    model: str,
    messages: list[dict[str, str]],
    num_predict: int = 900,
    timeout: int = 240,
    keep_alive: str | None = "0s",
) -> str:
    payload: dict[str, Any] = {
        "model": model,
        "messages": messages,
        "stream": False,
        "options": {
            "temperature": 0,
            "top_p": 0.7,
            "seed": 42,
            "num_ctx": 32768,
            "num_predict": num_predict,
        },
    }
    if keep_alive is not None:
        payload["keep_alive"] = keep_alive

    response = await client.post(
        f"{base_url}/api/chat",
        json=payload,
        timeout=timeout,
    )
    response.raise_for_status()
    return response.json().get("message", {}).get("content", "").strip()


def understanding_prompt(row: dict[str, Any]) -> str:
    return (
        "פתור את סעיף המבחן הבא כתשובת מבחן מלאה.\n"
        "חובה לכסות: הבנת הדרישה, פתרון/קוד אם רלוונטי, למה זה נכון, "
        "מלכודת נפוצה, ובדיקת תקינות קצרה.\n\n"
        f"קובץ: {row['file']}\n"
        f"שאלה/סעיף: {row['question']}/{row['section']}\n"
        f"task_ids: {', '.join(row.get('task_ids', []))}\n"
        f"micro_tasks: {', '.join(row.get('micro_tasks', []))}\n"
        f"נוסח הסעיף:\n{row['section_text']}"
    )


def code_prompt(row: dict[str, Any]) -> str:
    tasks = set(row.get("task_ids", []))
    base = (
        "Return only one code block. No prose outside the code block.\n"
        "Do not use Math.random. Use only deterministic fixture data when a test harness needs data.\n\n"
        f"Exam section:\n{row['section_text']}\n\n"
        f"task_ids: {', '.join(row.get('task_ids', []))}\n"
        f"micro_tasks: {', '.join(row.get('micro_tasks', []))}\n\n"
    )

    if tasks & API_TASKS:
        requirements = [
            "Write a complete CommonJS Express router file.",
            "Use `const express = require('express')` and `module.exports = router`.",
            "Use a deterministic in-file fixture array named `items` only for evaluation.",
            "Each item should have: id, name, value, salary, grade.",
            "Use correct HTTP status codes and JSON responses.",
        ]
        if "api_get_all" in tasks:
            requirements.append("Implement `GET /` returning all items.")
        if "api_get_filtered" in tasks:
            requirements.append("Implement `POST /filter` using `req.body.value` and returning matching items.")
        if "api_post_create" in tasks:
            requirements.append("Implement `POST /` with validation and duplicate prevention.")
        if "api_put_update" in tasks:
            requirements.append("Implement `PUT /:id` with not-found handling.")
        if "api_delete" in tasks:
            requirements.append("Implement `DELETE /:id` with not-found handling.")
        return base + "\n".join(f"- {item}" for item in requirements)

    if tasks & NODE_TASKS:
        return (
            base
            + "Write a complete CommonJS module exporting one class named `FilePackage`.\n"
            + "The class must support constructor(filename), appendContent(content), searchWord(word), "
            + "rename(newFilename), and copy(). Use Node `fs` and deterministic behavior."
        )

    if tasks & JS_TASKS:
        return (
            base
            + "Write a complete CommonJS module exporting `solve` via `module.exports = { solve }`.\n"
            + "The function must solve the section exactly. Include no CLI code."
        )

    if tasks & FRONTEND_TASKS:
        return (
            base
            + "Write a complete React component. Use controlled inputs, validation, rendering, "
            + "navigation, and user-facing errors when relevant."
        )

    if tasks & DB_TASKS:
        return (
            base
            + "Write a complete Node/Mongoose-style implementation. Include schema/model, validation, "
            + "duplicate prevention, and correct error handling."
        )

    return base + "Write the most relevant code for this section."


async def grade_understanding(
    client: httpx.AsyncClient,
    base_url: str,
    grader_model: str,
    row: dict[str, Any],
    answer: str,
    keep_alive: str | None,
) -> tuple[int, list[str], list[str]]:
    prompt = (
        "Return JSON only with keys: score (0-100), critical_missing (array), notes (array).\n"
        "Grade strictly for SVCollege exam readiness.\n"
        "Score 100 only if the answer covers every micro_task, explains the concept, identifies traps, "
        "and gives a valid check.\n\n"
        f"task_ids: {', '.join(row.get('task_ids', []))}\n"
        f"micro_tasks: {', '.join(row.get('micro_tasks', []))}\n"
        f"section_text:\n{row['section_text']}\n\n"
        f"answer:\n{answer}"
    )
    raw = await chat(
        client,
        base_url,
        grader_model,
        [
            {"role": "system", "content": GRADER_SYSTEM},
            {"role": "user", "content": prompt},
        ],
        num_predict=260,
        keep_alive=keep_alive,
    )
    parsed = extract_json(raw) or {}
    score = int(parsed.get("score", 0) or 0)
    missing = parsed.get("critical_missing", [])
    notes = parsed.get("notes", [])
    if not isinstance(missing, list):
        missing = [str(missing)]
    if not isinstance(notes, list):
        notes = [str(notes)]
    return max(0, min(100, score)), [str(x) for x in missing], [str(x) for x in notes]


def check_forbidden(code: str) -> list[dict[str, Any]]:
    return [{"name": "forbidden Math.random", "ok": "Math.random" not in code}]


def check_static(code: str, row: dict[str, Any]) -> list[dict[str, Any]]:
    tasks = set(row.get("task_ids", []))
    text = code.lower()
    checks: list[dict[str, Any]] = []
    checks.extend(check_forbidden(code))

    if "client_form_inputs" in tasks:
        checks.extend(
            [
                {"name": "controlled state", "ok": "usestate" in text or "usereducer" in text},
                {"name": "input value binding", "ok": "value=" in text or "value={" in text},
                {"name": "onChange handler", "ok": "onchange" in text},
                {"name": "submit handler", "ok": "onsubmit" in text or "submit" in text},
            ]
        )
    if "client_validation_rules" in tasks:
        checks.extend(
            [
                {"name": "validation function or branch", "ok": "valid" in text or "error" in text},
                {"name": "length/range/regex check", "ok": any(x in text for x in ["regex", ".test(", "length", ">", "<", "number"])},
                {"name": "blocks invalid submit", "ok": "return" in text and ("error" in text or "alert" in text)},
            ]
        )
    if "client_navigation" in tasks:
        checks.append(
            {"name": "navigation implemented", "ok": any(x in text for x in ["navigate", "redirect", "window.location", "href", "link"])}
        )
    if "client_list_render" in tasks:
        checks.extend(
            [
                {"name": "array render", "ok": ".map(" in text},
                {"name": "stable key", "ok": "key=" in text or "key={" in text},
                {"name": "sort/filter when relevant", "ok": ".sort(" in text or ".filter(" in text or "filtered" in text},
            ]
        )
    if "alerts_error_handling" in tasks:
        checks.extend(
            [
                {"name": "error feedback", "ok": "alert" in text or "error" in text or "message" in text},
                {"name": "try/catch or status branch", "ok": "try" in text or "catch" in text or "status(" in text},
            ]
        )
    if "db_persistence" in tasks:
        checks.extend(
            [
                {"name": "schema/model/persistence", "ok": any(x in text for x in ["schema", "model", "mongoose", ".create", ".save"])},
                {"name": "db error handling", "ok": "catch" in text or "500" in text},
            ]
        )
    if "db_uniqueness" in tasks:
        checks.extend(
            [
                {"name": "duplicate lookup", "ok": any(x in text for x in ["findone", "exists", ".some(", "duplicate", "כבר"])},
                {"name": "duplicate response", "ok": "409" in text or "400" in text or "duplicate" in text or "כבר" in text},
            ]
        )
    return checks


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


def run_express_eval(code: str, row: dict[str, Any], case_dir: Path, verifier_dir: Path) -> list[dict[str, Any]]:
    tasks = set(row.get("task_ids", []))
    case_dir.mkdir(parents=True, exist_ok=True)
    router_code = normalize_commonjs(code)
    router_code = router_code.replace("require('express')", f"require({json.dumps(node_path(verifier_dir, 'express'))})")
    router_code = router_code.replace('require("express")', f"require({json.dumps(node_path(verifier_dir, 'express'))})")

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
      const ok = await fn();
      checks.push({{ name, ok: Boolean(ok) }});
    }} catch (error) {{
      checks.push({{ name, ok: false, error: String(error && error.message ? error.message : error) }});
    }}
  }}

  {'await safe("GET all", async () => { const res = await supertest(app).get("/api/items"); return res.status === 200 && Array.isArray(res.body); });' if 'api_get_all' in tasks else ''}
  {'await safe("POST filter", async () => { const res = await supertest(app).post("/api/items/filter").send({ value: 50, max_salary: 50, threshold: 50 }); return res.status < 500 && Array.isArray(res.body); });' if 'api_get_filtered' in tasks else ''}
  {'await safe("POST create valid", async () => { const res = await supertest(app).post("/api/items").send({ id: "new-1", name: "New Item", value: 42, salary: 42, grade: 90 }); return [200, 201].includes(res.status); });' if 'api_post_create' in tasks else ''}
  {'await safe("POST create invalid", async () => { const res = await supertest(app).post("/api/items").send({}); return [400, 409, 422].includes(res.status); });' if 'api_post_create' in tasks else ''}
  {'await safe("PUT missing", async () => { const res = await supertest(app).put("/api/items/missing").send({ name: "Updated" }); return res.status === 404; });' if 'api_put_update' in tasks else ''}
  {'await safe("DELETE missing", async () => { const res = await supertest(app).delete("/api/items/missing"); return res.status === 404; });' if 'api_delete' in tasks else ''}

  process.stdout.write(JSON.stringify({{ checks }}));
}}

run().catch((error) => {{
  process.stdout.write(JSON.stringify({{
    checks: [{{ name: "router runtime", ok: false, error: String(error && error.stack ? error.stack : error) }}]
  }}));
}});
"""
    (case_dir / "run_express_eval.js").write_text(runner, encoding="utf-8")
    parsed, error = run_node(case_dir / "run_express_eval.js", verifier_dir)
    if error:
        return [{"name": "express runtime", "ok": False, "error": error}]
    return parsed.get("checks", []) if parsed else [{"name": "express runtime", "ok": False}]


def js_tests_for_section(section_text: str) -> str:
    text = section_text.lower()
    if "מטריצה" in text and "כמה פעמים" in text:
        return """
const result = mod.solve([[1,1,2,4,1,1,7],[1,1,1,2,1,1,7],[7,7,1,1,1,1,1]]);
const byNum = new Map(result.map((row) => [row.num, row.count ?? row.counter]));
checks.push({ name: 'matrix count 1', ok: byNum.get(1) === 14 });
checks.push({ name: 'matrix count 2', ok: byNum.get(2) === 2 });
checks.push({ name: 'matrix count 4', ok: byNum.get(4) === 1 });
checks.push({ name: 'matrix count 7', ok: byNum.get(7) === 4 });
try { mod.solve([[1, 'x']]); checks.push({ name: 'throws on non-number', ok: false }); } catch (_) { checks.push({ name: 'throws on non-number', ok: true }); }
"""
    if "ממיינת את הספרות" in text or "642531" in text:
        return """
checks.push({ name: 'sort digits number', ok: mod.solve(642531) === 123456 || mod.solve(642531) === '123456' });
checks.push({ name: 'sort digits repeated', ok: mod.solve(55021) === 1255 || mod.solve(55021) === '01255' || mod.solve(55021) === '1255' });
"""
    if "מערך שלם" in text and "מערך חלקי" in text:
        return """
checks.push({ name: 'subsequence true 1,3,4', ok: mod.solve([1,2,3,4], [1,3,4]) === true });
checks.push({ name: 'subsequence true 2,4', ok: mod.solve([1,2,3,4], [2,4]) === true });
checks.push({ name: 'subsequence false missing', ok: mod.solve([1,2,3,4], [1,2,5]) === false });
checks.push({ name: 'subsequence false order', ok: mod.solve([1,2,3,4], [4,2]) === false });
"""
    return """
checks.push({ name: 'exports solve', ok: typeof mod.solve === 'function' });
checks.push({ name: 'does not throw on representative input', ok: (() => { try { mod.solve([1,2,3,4], [1,3]); return true; } catch (_) { return false; } })() });
"""


def run_js_eval(code: str, row: dict[str, Any], case_dir: Path, verifier_dir: Path) -> list[dict[str, Any]]:
    case_dir.mkdir(parents=True, exist_ok=True)
    module_code = normalize_commonjs(code)
    if "module.exports" not in module_code and "function solve" in module_code:
        module_code += "\nmodule.exports = { solve };\n"
    (case_dir / "solution.js").write_text(module_code, encoding="utf-8")
    runner = f"""
const mod = require('./solution.js');
const checks = [];
try {{
  checks.push({{ name: 'exports solve', ok: typeof mod.solve === 'function' }});
  if (typeof mod.solve === 'function') {{
    {js_tests_for_section(row['section_text'])}
  }}
}} catch (error) {{
  checks.push({{ name: 'js runtime', ok: false, error: String(error && error.stack ? error.stack : error) }});
}}
process.stdout.write(JSON.stringify({{ checks }}));
"""
    (case_dir / "run_js_eval.js").write_text(runner, encoding="utf-8")
    parsed, error = run_node(case_dir / "run_js_eval.js", verifier_dir)
    if error:
        return [{"name": "js runtime", "ok": False, "error": error}]
    return parsed.get("checks", []) if parsed else [{"name": "js runtime", "ok": False}]


def run_node_file_eval(code: str, case_dir: Path, verifier_dir: Path) -> list[dict[str, Any]]:
    case_dir.mkdir(parents=True, exist_ok=True)
    module_code = normalize_commonjs(code)
    if "module.exports" not in module_code:
        module_code += "\nmodule.exports = FilePackage;\n"
    (case_dir / "solution.js").write_text(module_code, encoding="utf-8")
    runner = """
const fs = require('fs');
const path = require('path');
const FilePackage = require('./solution.js');
const checks = [];
try {
  const base = path.join(__dirname, 'case_file.txt');
  const renamed = path.join(__dirname, 'renamed_file.txt');
  const instance = new FilePackage(base);
  checks.push({ name: 'constructor creates file', ok: fs.existsSync(base) });
  if (typeof instance.appendContent === 'function') instance.appendContent('hello world');
  checks.push({ name: 'append writes content', ok: fs.readFileSync(base, 'utf8').includes('hello world') });
  checks.push({ name: 'searchWord true', ok: typeof instance.searchWord === 'function' && instance.searchWord('world') === true });
  if (typeof instance.rename === 'function') instance.rename(renamed);
  checks.push({ name: 'rename creates target', ok: fs.existsSync(renamed) });
  if (typeof instance.copy === 'function') instance.copy();
  const copyCandidates = fs.readdirSync(__dirname).filter((name) => name.includes('copy'));
  checks.push({ name: 'copy creates copy', ok: copyCandidates.length > 0 });
} catch (error) {
  checks.push({ name: 'node file runtime', ok: false, error: String(error && error.stack ? error.stack : error) });
}
process.stdout.write(JSON.stringify({ checks }));
"""
    (case_dir / "run_node_file_eval.js").write_text(runner, encoding="utf-8")
    parsed, error = run_node(case_dir / "run_node_file_eval.js", verifier_dir)
    if error:
        return [{"name": "node file runtime", "ok": False, "error": error}]
    return parsed.get("checks", []) if parsed else [{"name": "node file runtime", "ok": False}]


def score_checks(checks: list[dict[str, Any]]) -> int:
    if not checks:
        return 0
    passed = sum(1 for check in checks if check.get("ok") is True)
    return int(round(100 * passed / len(checks)))


def execution_score(
    code: str,
    row: dict[str, Any],
    case_dir: Path,
    verifier_dir: Path,
) -> tuple[int | None, list[dict[str, Any]], bool]:
    tasks = set(row.get("task_ids", []))
    if tasks & MANUAL_TASKS:
        return None, [{"name": "manual review required", "ok": False}], True
    if tasks and tasks <= THEORY_TASKS:
        return None, [{"name": "theory only", "ok": True}], False

    checks: list[dict[str, Any]] = []
    checks.extend(check_static(code, row))

    if tasks & API_TASKS:
        checks.extend(run_express_eval(code, row, case_dir / "express", verifier_dir))
    if tasks & JS_TASKS and not (tasks & API_TASKS) and not (tasks & FRONTEND_TASKS):
        checks.extend(run_js_eval(code, row, case_dir / "js", verifier_dir))
    if tasks & NODE_TASKS:
        checks.extend(run_node_file_eval(code, case_dir / "node_file", verifier_dir))

    score = score_checks(checks)
    critical_failed = any(
        check.get("ok") is False
        and any(token in str(check.get("name", "")).lower() for token in ["runtime", "math.random", "get", "post", "put", "delete"])
        for check in checks
    )
    return score, checks, critical_failed


def final_status(
    row: dict[str, Any],
    understanding: int,
    execution: int | None,
    critical: bool,
) -> tuple[int | None, str]:
    tasks = set(row.get("task_ids", []))
    if tasks & MANUAL_TASKS:
        return None, "MANUAL_REVIEW"
    if execution is None:
        final = understanding
    elif tasks and tasks <= THEORY_TASKS:
        final = understanding
    else:
        final = int(round((0.6 * execution) + (0.4 * understanding)))

    if final == 100 and (execution in (None, 100)) and understanding == 100 and not critical:
        return final, "PASS_100"
    if final >= 85 and not critical:
        return final, "PASS"
    return final, "FAIL"


def remediation_for(row: dict[str, Any], understanding_missing: list[str], checks: list[dict[str, Any]]) -> str:
    failures = [str(check.get("name", "")) for check in checks if check.get("ok") is False]
    parts: list[str] = []
    if understanding_missing:
        parts.append("Improve explanation coverage: " + "; ".join(understanding_missing[:3]))
    if failures:
        parts.append("Fix execution/static checks: " + "; ".join(failures[:5]))
    if not parts:
        return "No fix needed."
    return " | ".join(parts)


def markdown_report(summary: dict[str, Any], rows: list[dict[str, Any]]) -> str:
    lines = [
        "# MODEL FULL 73 SECTION SCOREBOARD",
        "",
        f"- Model: `{summary['model']}`",
        f"- Sections: `{summary['total_sections']}`",
        f"- PASS_100: `{summary['pass_100']}`",
        f"- PASS: `{summary['pass']}`",
        f"- FAIL: `{summary['fail']}`",
        f"- MANUAL_REVIEW: `{summary['manual_review']}`",
        f"- Average final score: `{summary['average_final_score']}`",
        "",
        "| idx | file | question/section | task_ids | understanding_score | code_execution_score | final_score | status | fix_needed |",
        "|---:|---|---|---|---:|---:|---:|---|---|",
    ]
    for row in rows:
        exec_score = "N/A" if row["code_execution_score"] is None else str(row["code_execution_score"])
        final_score = "N/A" if row["final_score"] is None else str(row["final_score"])
        lines.append(
            "| {idx} | {file} | {qs} | {tasks} | {understanding} | {execution} | {final} | {status} | {fix} |".format(
                idx=row["idx"],
                file=str(row["file"]).replace("|", "\\|"),
                qs=f"{row['question']}/{row['section']}",
                tasks=", ".join(row["task_ids"]).replace("|", "\\|"),
                understanding=row["understanding_score"],
                execution=exec_score,
                final=final_score,
                status=row["status"],
                fix=str(row["fix_needed"]).replace("|", "/").replace("\n", " ")[:280],
            )
        )
    return "\n".join(lines) + "\n"


def remediation_report(summary: dict[str, Any], rows: list[dict[str, Any]]) -> str:
    failed = [row for row in rows if row["status"] in {"FAIL", "MANUAL_REVIEW"}]
    weak_tasks: dict[str, list[int]] = {}
    for row in failed:
        for task in row["task_ids"]:
            weak_tasks.setdefault(task, []).append(row["idx"])

    lines = [
        "# MODEL REMEDIATION PLAN FROM 73 SECTIONS",
        "",
        f"- Failed or manual sections: `{len(failed)}`",
        f"- Average final score: `{summary['average_final_score']}`",
        "",
        "## Weak Task Families",
        "",
        "| task_id | affected_sections | remediation_type |",
        "|---|---|---|",
    ]
    for task, ids in sorted(weak_tasks.items(), key=lambda item: (-len(item[1]), item[0])):
        remediation_type = "verifier + SFT"
        if task in API_TASKS:
            remediation_type = "execution case + DPO hard negatives"
        elif task in FRONTEND_TASKS:
            remediation_type = "static verifier + focused SFT"
        elif task in JS_TASKS:
            remediation_type = "Node execution tests + algorithm drills"
        elif task in MANUAL_TASKS:
            remediation_type = "manual source extraction"
        lines.append(f"| {task} | {', '.join(map(str, ids))} | {remediation_type} |")

    lines.extend(["", "## Failed Sections", ""])
    if not failed:
        lines.append("- None")
    for row in failed:
        lines.append(
            f"- #{row['idx']} `{row['file']}` {row['question']}/{row['section']} "
            f"status={row['status']} final={row['final_score']} fix={row['fix_needed']}"
        )

    lines.extend(
        [
            "",
            "## Prompt Template For Repair",
            "",
            "```text",
            "Train the SVCollege exam model on the failed task_id only.",
            "Use the original section text, require both explanation and runnable code,",
            "reject answers that miss validation/status/error handling or fail execution.",
            "Never use Math.random and never fabricate data outside deterministic fixtures.",
            "```",
        ]
    )
    return "\n".join(lines) + "\n"


def build_summary(model: str, grader_model: str, results: list[dict[str, Any]]) -> dict[str, Any]:
    numeric_scores = [row["final_score"] for row in results if isinstance(row["final_score"], int)]
    return {
        "model": model,
        "grader_model": grader_model,
        "total_sections": len(results),
        "pass_100": sum(1 for row in results if row["status"] == "PASS_100"),
        "pass": sum(1 for row in results if row["status"] == "PASS"),
        "fail": sum(1 for row in results if row["status"] == "FAIL"),
        "manual_review": sum(1 for row in results if row["status"] == "MANUAL_REVIEW"),
        "average_final_score": round(sum(numeric_scores) / max(1, len(numeric_scores)), 1),
    }


def write_checkpoint(
    model: str,
    grader_model: str,
    results: list[dict[str, Any]],
    scoreboard_json_path: Path,
    scoreboard_md_path: Path,
    remediation_path: Path,
) -> dict[str, Any]:
    summary = build_summary(model, grader_model, results)
    payload = {"summary": summary, "sections": results}
    scoreboard_json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    scoreboard_md_path.write_text(markdown_report(summary, results), encoding="utf-8")
    remediation_path.write_text(remediation_report(summary, results), encoding="utf-8")
    return summary


async def main_async() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", default=os.getenv("EXAM_MODEL", "svcollege-fullstack-exam"))
    parser.add_argument("--grader-model", default=os.getenv("EXAM_GRADER_MODEL", "sv-college-quiz-grader"))
    parser.add_argument("--base-url", default=os.getenv("OLLAMA_BASE_URL", "http://127.0.0.1:11434"))
    parser.add_argument("--sections", type=Path, default=Path("outputs/eval/exam_sections_task_breakdown.jsonl"))
    parser.add_argument("--out-dir", type=Path, default=Path("outputs/training"))
    parser.add_argument("--verifier-dir", type=Path, default=Path("verifier/js"))
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--start-idx", type=int, default=1)
    parser.add_argument("--end-idx", type=int, default=0)
    parser.add_argument(
        "--keep-alive",
        default="0s",
        help="Ollama keep_alive value. Use 0s for low-memory chunked runs.",
    )
    args = parser.parse_args()

    sections = read_jsonl(args.sections)
    sections = [row for row in sections if int(row["idx"]) >= args.start_idx]
    if args.end_idx > 0:
        sections = [row for row in sections if int(row["idx"]) <= args.end_idx]
    if args.limit > 0:
        sections = sections[: args.limit]

    args.out_dir.mkdir(parents=True, exist_ok=True)
    cases_dir = args.out_dir / "execution_cases_73"
    raw_answers_path = args.out_dir / "MODEL_FULL_73_SECTION_RAW_ANSWERS.jsonl"
    scoreboard_json_path = args.out_dir / "MODEL_FULL_73_SECTION_SCOREBOARD.json"
    scoreboard_md_path = args.out_dir / "MODEL_FULL_73_SECTION_SCOREBOARD.md"
    remediation_path = args.out_dir / "MODEL_REMEDIATION_PLAN_FROM_73_SECTIONS.md"

    results: list[dict[str, Any]] = []
    raw_answers: list[dict[str, Any]] = []

    async with httpx.AsyncClient() as client:
        for row in sections:
            idx = int(row["idx"])
            print(f"Evaluating section {idx}/{len(sections)}: {row['file']} {row['question']}/{row['section']}", flush=True)

            explain_answer = await chat(
                client,
                args.base_url,
                args.model,
                [
                    {"role": "system", "content": SYSTEM},
                    {"role": "user", "content": understanding_prompt(row)},
                ],
                num_predict=950,
                keep_alive=args.keep_alive,
            )
            understanding, missing, notes = await grade_understanding(
                client, args.base_url, args.grader_model, row, explain_answer, args.keep_alive
            )

            code_answer = ""
            code = ""
            execution: int | None = None
            execution_checks: list[dict[str, Any]] = []
            critical = False

            if set(row.get("task_ids", [])) & MANUAL_TASKS:
                execution, execution_checks, critical = None, [{"name": "manual review required", "ok": False}], True
            elif set(row.get("task_ids", [])) <= THEORY_TASKS:
                execution, execution_checks, critical = None, [{"name": "theory only", "ok": True}], False
            else:
                code_answer = await chat(
                    client,
                    args.base_url,
                    args.model,
                    [
                        {"role": "system", "content": SYSTEM},
                        {"role": "user", "content": code_prompt(row)},
                    ],
                    num_predict=1100,
                    keep_alive=args.keep_alive,
                )
                code = extract_code(code_answer)
                execution, execution_checks, critical = execution_score(
                    code=code,
                    row=row,
                    case_dir=cases_dir / f"section_{idx:02d}",
                    verifier_dir=args.verifier_dir,
                )

            final, status = final_status(row, understanding, execution, critical)
            fix_needed = remediation_for(row, missing, execution_checks)

            result = {
                "idx": idx,
                "file": row["file"],
                "question": row["question"],
                "section": row["section"],
                "section_text": row["section_text"],
                "task_ids": row.get("task_ids", []),
                "micro_tasks": row.get("micro_tasks", []),
                "understanding_score": understanding,
                "understanding_missing": missing,
                "understanding_notes": notes,
                "code_execution_score": execution,
                "execution_checks": execution_checks,
                "critical_failure": critical,
                "final_score": final,
                "status": status,
                "fix_needed": fix_needed,
            }
            results.append(result)
            raw_answers.append(
                {
                    "idx": idx,
                    "understanding_answer": explain_answer,
                    "code_answer": code_answer,
                    "extracted_code": code,
                }
            )

            write_jsonl(raw_answers_path, raw_answers)
            write_checkpoint(
                args.model,
                args.grader_model,
                results,
                scoreboard_json_path,
                scoreboard_md_path,
                remediation_path,
            )

    summary = write_checkpoint(
        args.model,
        args.grader_model,
        results,
        scoreboard_json_path,
        scoreboard_md_path,
        remediation_path,
    )

    print(json.dumps(summary, ensure_ascii=False, indent=2), flush=True)
    print(f"Wrote {scoreboard_md_path}", flush=True)
    print(f"Wrote {scoreboard_json_path}", flush=True)
    print(f"Wrote {remediation_path}", flush=True)


def main() -> None:
    asyncio.run(main_async())


if __name__ == "__main__":
    main()
