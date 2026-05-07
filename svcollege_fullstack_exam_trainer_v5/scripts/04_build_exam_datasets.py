#!/usr/bin/env python3
"""Create initial SFT/DPO/eval seed examples from extracted course chunks.

This does not replace GPT-generated high-quality examples. It creates a safe,
deterministic starting point so the pipeline is testable before calling any LLM.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any, Iterator

SYSTEM = "You are SVCollege Full-Stack Exam Coach. Answer in Hebrew, code in English."

TOPIC_HINTS: dict[str, tuple[str, str, str]] = {
    "react_state_immutable": (
        "כתוב דוגמת React להוספת איבר למערך state בלי mutation.",
        "נשתמש ב-functional update כדי לשמור על immutable state.\n\n```jsx\nsetItems(prev => [...prev, newItem]);\n```\n\nמלכודת מבחן: אסור לעשות `items.push(newItem); setItems(items);` כי ריאקט עלול לא לזהות שינוי נכון.",
        "React state mutation",
    ),
    "react_hooks_effect_ref_memo": (
        "הסבר איפה נכון לבצע fetch ב-React ולמה.",
        "את ה-fetch נשים בתוך `useEffect` כדי למנוע רינדור אינסופי.\n\n```jsx\nuseEffect(() => {\n  async function loadData() {\n    const res = await fetch(url);\n    const data = await res.json();\n    setItems(data);\n  }\n  loadData();\n}, []);\n```\n\nמלכודת מבחן: fetch בגוף הקומפוננטה יכול לגרום לעדכון state ואז רינדור חוזר שוב ושוב.",
        "React fetch/useEffect loop",
    ),
    "express_crud_middleware_status": (
        "כתוב Route בסיסי ב-Express שמוסיף פריט חדש ומחזיר status code נכון.",
        "ב-POST שמייצר משאב חדש נחזיר `201 Created`. צריך גם `express.json()` באפליקציה כדי לקרוא `req.body`.\n\n```js\nrouter.post('/items', async (req, res) => {\n  try {\n    const item = await Item.create(req.body);\n    res.status(201).json(item);\n  } catch (error) {\n    res.status(400).json({ message: error.message });\n  }\n});\n```\n\nמלכודת מבחן: בלי `app.use(express.json())`, ה-body עלול להיות undefined.",
        "Express JSON body/status",
    ),
    "mongodb_mongoose_crud": (
        "הסבר בקצרה מה ההבדל בין Database, Collection ו-Document ב-MongoDB.",
        "Database הוא המאגר הגדול, Collection היא קבוצה של מסמכים, ו-Document הוא אובייקט JSON-like יחיד.\n\n```js\nconst studentSchema = new mongoose.Schema({\n  name: String,\n  age: Number\n});\n```\n\nמלכודת מבחן: לא לבלבל בין collection לבין document; collection מכילה documents.",
        "MongoDB concepts",
    ),
    "typescript_basics": (
        "כתוב type בסיסי ופונקציה TypeScript שמקבלת מערך ומחזירה מספר.",
        "נגדיר טיפוסים מפורשים לפרמטר ולערך החזרה.\n\n```ts\ntype Student = {\n  name: string;\n  grade: number;\n};\n\nfunction averageGrade(students: Student[]): number {\n  const total = students.reduce((sum, student) => sum + student.grade, 0);\n  return total / students.length;\n}\n```\n\nמלכודת מבחן: לא להשתמש ב-`any` כשאפשר להגדיר type ברור.",
        "TypeScript explicit types",
    ),
    "fullstack_books_edit_fetch": (
        "בפרויקט ספרייה Full-Stack, למה עמוד עריכה נטען ריק ואיך מתקנים?",
        "אם עמוד עריכה נטען ריק, בדרך כלל חסר endpoint לשליפת רשומה בודדת. צריך להוסיף Route ייעודי `GET /api/books/:id` ולצרוך אותו בצד הלקוח.\n\n```js\nrouter.get('/:id', async (req, res) => {\n  try {\n    const book = await Book.findById(req.params.id);\n    if (!book) return res.status(404).json({ message: 'Book not found' });\n    res.json(book);\n  } catch (err) {\n    res.status(500).json({ message: err.message });\n  }\n});\n```\n\nבנוסף ל-production readiness:\n- להגדיר `cors({ origin: 'http://localhost:3000' })`\n- להגדיר `\"proxy\": \"http://localhost:5000\"` ב-React\n- לא להציג כפתור Return אם אין Route תואם\n- Borrow צריך להיקרא רק כשספר זמין (`isAvailable === true`)",
        "Missing GET by id for edit flow",
    ),
}

BOOKS_EDIT_QUESTIONS: list[str] = [
    "עמוד EditBookPage נטען ריק. כתוב תיקון Backend+Frontend מלא.",
    "מה ה-Route החסר ב-Express שבלעדיו עריכת ספר לא עובדת?",
    "כתוב בדיקת תקינות קצרה שמוודאת ש-GET /api/books/:id עובד לעריכה.",
    "איך מונעים mismatch בין כפתורי Borrow/Return לבין ה-routes בפועל?",
    "תן דוגמת CORS נכונה לפרויקט ספרייה עם frontend על פורט 3000.",
    "מתי צריך proxy ב-React ואיך להגדיר אותו נכון בפרויקט ספרייה?",
    "כתוב תשובת מבחן שמתקנת עמוד עריכה ריק עם Book.findById.",
    "יש Route לרשימה אבל אין Route ל-item בודד. מה ההשלכות ומה התיקון?",
    "כתוב פתרון שמוודא 404 אם ספר לא קיים בעריכה, ו-500 עם err.message בשגיאה.",
    "איך משלבים axios בעמוד עריכה בלי לשבור את זרימת ה-Save?",
    "בנה checklist production קצר ל-MERN ספרייה: edit-flow, CORS, proxy, borrow.",
    "כתוב קוד Route מדויק ל-GET /api/books/:id והסבר מלכודת נפוצה.",
]

BOOKS_EDIT_CHOSEN = (
    "עמוד עריכה ריק נגרם בדרך כלל כי חסר endpoint לשליפת רשומה בודדת. "
    "מוסיפים Route ייעודי בבקאנד וצורכים אותו ב-frontend.\n\n"
    "```js\n"
    "router.get('/:id', async (req, res) => {\n"
    "  try {\n"
    "    const book = await Book.findById(req.params.id);\n"
    "    if (!book) return res.status(404).json({ message: 'Book not found' });\n"
    "    res.json(book);\n"
    "  } catch (err) {\n"
    "    res.status(500).json({ message: err.message });\n"
    "  }\n"
    "});\n"
    "```\n\n"
    "בנוסף:\n"
    "- CORS צריך לאפשר `http://localhost:3000`\n"
    "- ב-React להגדיר `\"proxy\": \"http://localhost:5000\"`\n"
    "- לא להציג `Return` בלי Route תואם\n"
    "- `Borrow` מותר רק כאשר `isAvailable === true`"
)

BOOKS_EDIT_HARD_NEGATIVES: list[str] = [
    "נוסיף רק GET /api/books ונשתמש בו גם לעריכה. אין צורך ב-/:id.",
    "נרנדר כפתור Return גם בלי backend, אפשר לחבר אחר כך.",
    "ב-500 נחזיר הודעה קבועה בלבד ולא err.message.",
    "אין צורך ב-CORS אם הכל localhost.",
    "נעדכן state ידנית עם push ואז נשלח לשרת.",
    "נוסיף Route עם Math.random() לבדיקת זמינות.",
]

EVAL_VARIANTS_PER_TOPIC = 7
BOOKS_EDIT_SYNTHETIC_DPO_TARGET = 520
BOOKS_EDIT_SYNTHETIC_SFT_TARGET = 140


def generate_books_edit_synthetic_questions(limit: int) -> list[str]:
    scopes = [
        "EditBookPage",
        "BookForm",
        "BooksList",
        "routes/books.js",
        "server/server.js",
        "client package.json",
    ]
    failures = [
        "עמוד עריכה נטען ריק",
        "404 בעריכה לפי מזהה",
        "500 בזמן Book.findById",
        "כפתור Return ללא Route",
        "Borrow נקרא על ספר לא זמין",
        "CORS נחסם בדפדפן",
        "proxy לא מוגדר ב-React",
        "עריכת ספר לא מעדכנת UI",
    ]
    constraints = [
        "תן פתרון עם קוד backend ו-frontend",
        "תן פתרון backend בלבד",
        "תן פתרון frontend בלבד",
        "הדגש HTTP status codes מדויקים",
        "הדגש בדיקות תקינות קצרות",
        "הדגש מניעת מלכודות מבחן",
    ]
    deployment_checks = [
        "ודא CORS ל-http://localhost:3000",
        "ודא proxy ל-http://localhost:5000",
        "ודא GET /api/books/:id קיים",
        "ודא שאין Return ללא route",
    ]

    questions: list[str] = []
    for scope in scopes:
        for failure in failures:
            for constraint in constraints:
                for deploy in deployment_checks:
                    questions.append(
                        f"בפרויקט ספרייה, ב-{scope}, יש תקלה: {failure}. {constraint}. {deploy}."
                    )
                    if len(questions) >= limit:
                        return questions
    return questions


def read_jsonl(path: Path) -> Iterator[dict[str, Any]]:
    with path.open("r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                yield json.loads(line)


def write_jsonl(path: Path, records: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        for rec in records:
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--chunks", type=Path, required=True)
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args()

    seen_topics: set[str] = set()
    sft: list[dict[str, Any]] = []
    dpo: list[dict[str, Any]] = []
    eval_records: list[dict[str, Any]] = []

    for chunk in read_jsonl(args.chunks):
        topic = chunk.get("topic", "unknown")
        if topic in seen_topics or topic not in TOPIC_HINTS:
            continue
        seen_topics.add(topic)
        question, answer, trap = TOPIC_HINTS[topic]
        sft.append({
            "messages": [
                {"role": "system", "content": SYSTEM},
                {"role": "user", "content": question},
                {"role": "assistant", "content": f"1. הבנת הדרישה\n{question}\n\n2. פתרון / קוד\n{answer}\n\n3. למה זה נכון למבחן\nזה עונה לפי חוקי SVCollege ומדגיש את המלכודת.\n\n4. מלכודת נפוצה\n{trap}\n\n5. בדיקת תקינות קצרה\nבדוק שהקוד רץ ושה-state/response מתעדכנים כמצופה."},
            ],
            "meta": {
                "topic": topic,
                "difficulty": "medium",
                "source_hashes": [chunk.get("chunk_hash", "")],
                "exam_traps": [trap],
            },
        })
        dpo.append({
            "prompt": question,
            "chosen": answer,
            "rejected": "פתרון קצר אך שגוי שמדלג על חוקי המבחן או משתמש בדפוס בעייתי.",
            "meta": {"topic": topic, "trap_type": trap, "source_hashes": [chunk.get("chunk_hash", "")]},
        })
        base_rubric = {
            "must_include": [trap.split()[0] if trap else topic],
            "must_not_include": ["direct mutation", "any without reason"],
            "points": 100,
        }
        if topic == "fullstack_books_edit_fetch":
            base_rubric = {
                "must_include": ["router.get('/:id')", "Book.findById", "CORS", "proxy"],
                "must_not_include": ["Math.random()", "Return button without route"],
                "points": 100,
            }

        eval_records.append({
            "id": f"eval_{topic}",
            "topic": topic,
            "difficulty": "medium",
            "question": question,
            "rubric": base_rubric,
            "locked": True,
        })

        if topic == "fullstack_books_edit_fetch":
            for idx, question_variant in enumerate(BOOKS_EDIT_QUESTIONS, start=1):
                trap_variant = "Missing GET by id for edit flow"
                sft.append({
                    "messages": [
                        {"role": "system", "content": SYSTEM},
                        {"role": "user", "content": question_variant},
                        {"role": "assistant", "content": f"1. הבנת הדרישה\n{question_variant}\n\n2. פתרון / קוד\n{BOOKS_EDIT_CHOSEN}\n\n3. למה זה נכון למבחן\nהפתרון מכסה CRUD אמיתי ו-Edit flow תקין ל-SVCollege.\n\n4. מלכודת נפוצה\n{trap_variant}\n\n5. בדיקת תקינות קצרה\nוודא `GET /api/books/:id` מחזיר 200 לספר קיים, ו-404 ללא קיום ספר."},
                    ],
                    "meta": {
                        "topic": topic,
                        "difficulty": "medium",
                        "source_hashes": [chunk.get("chunk_hash", "")],
                        "exam_traps": [trap_variant],
                        "remediation_pack": "books_edit_flow",
                    },
                })
                dpo.append({
                    "prompt": question_variant,
                    "chosen": BOOKS_EDIT_CHOSEN,
                    "rejected": BOOKS_EDIT_HARD_NEGATIVES[(idx - 1) % len(BOOKS_EDIT_HARD_NEGATIVES)],
                    "meta": {
                        "topic": topic,
                        "trap_type": trap_variant,
                        "source_hashes": [chunk.get("chunk_hash", "")],
                        "hard_negative": True,
                        "remediation_pack": "books_edit_flow",
                    },
                })
                eval_records.append({
                    "id": f"eval_{topic}_remediation_{idx:02d}",
                    "topic": topic,
                    "difficulty": "medium",
                    "question": question_variant,
                    "rubric": {
                        "must_include": ["router.get('/:id')", "Book.findById", "CORS", "proxy"],
                        "must_not_include": ["Math.random()", "Return button without route"],
                        "points": 100,
                    },
                    "locked": True,
                })

            synthetic_questions = generate_books_edit_synthetic_questions(
                BOOKS_EDIT_SYNTHETIC_DPO_TARGET
            )
            for idx, question_variant in enumerate(synthetic_questions, start=1):
                trap_variant = "Missing GET by id for edit flow"
                dpo.append({
                    "prompt": question_variant,
                    "chosen": BOOKS_EDIT_CHOSEN,
                    "rejected": BOOKS_EDIT_HARD_NEGATIVES[(idx - 1) % len(BOOKS_EDIT_HARD_NEGATIVES)],
                    "meta": {
                        "topic": topic,
                        "trap_type": trap_variant,
                        "source_hashes": [chunk.get("chunk_hash", "")],
                        "hard_negative": True,
                        "synthetic": True,
                        "synthetic_index": idx,
                        "remediation_pack": "books_edit_flow",
                    },
                })
                if idx <= BOOKS_EDIT_SYNTHETIC_SFT_TARGET:
                    sft.append({
                        "messages": [
                            {"role": "system", "content": SYSTEM},
                            {"role": "user", "content": question_variant},
                            {"role": "assistant", "content": f"1. הבנת הדרישה\n{question_variant}\n\n2. פתרון / קוד\n{BOOKS_EDIT_CHOSEN}\n\n3. למה זה נכון למבחן\nהפתרון מחייב edit-flow תקין ויישור backend/frontend.\n\n4. מלכודת נפוצה\n{trap_variant}\n\n5. בדיקת תקינות קצרה\nבדוק GET לפי מזהה + התאמת CORS/proxy + Borrow/Return consistency."},
                        ],
                        "meta": {
                            "topic": topic,
                            "difficulty": "medium",
                            "source_hashes": [chunk.get("chunk_hash", "")],
                            "exam_traps": [trap_variant],
                            "synthetic": True,
                            "synthetic_index": idx,
                            "remediation_pack": "books_edit_flow",
                        },
                    })

    base_eval = list(eval_records)
    for rec in base_eval:
        for v in range(2, EVAL_VARIANTS_PER_TOPIC + 1):
            eval_records.append({
                "id": f"{rec['id']}_v{v}",
                "topic": rec["topic"],
                "difficulty": rec.get("difficulty", "medium"),
                "question": f"{rec['question']} (variant {v})",
                "rubric": rec["rubric"],
                "locked": True,
            })

    write_jsonl(args.out / "sft_candidates.jsonl", sft)
    write_jsonl(args.out / "dpo_candidates.jsonl", dpo)
    write_jsonl(args.out / "locked_eval_seed.jsonl", eval_records)
    print(f"Wrote {len(sft)} SFT, {len(dpo)} DPO, {len(eval_records)} eval seed records.")


if __name__ == "__main__":
    main()
