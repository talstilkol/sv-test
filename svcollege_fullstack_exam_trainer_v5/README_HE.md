# SVCollege Full‑Stack Exam Trainer V5 — Exam Only

המטרה של החבילה הזאת היא אחת בלבד:

> להפוך את Qwen3‑Coder‑Next המקומי למאמן אישי ומדויק למבחן Full‑Stack של SVCollege.

לא לבנות Cabinet AI‑OS.  
לא לבנות מערכת Enterprise.  
לא לאמן מודל כללי.  
רק: JavaScript, React, Hooks, Router, Express, MongoDB, TypeScript, Tailwind, ושאלות פרויקט בסגנון הקורס.

---

## 1. התקנה מלאה על M4 Max 128GB

```bash
cd svcollege_fullstack_exam_trainer_v5
chmod +x INSTALL_M4MAX_128GB_EXAM_ONLY.sh
./INSTALL_M4MAX_128GB_EXAM_ONLY.sh
```

הסקריפט יתקין/יוודא:

- Python 3.12
- Node.js
- pnpm
- git-lfs
- Ollama
- MLX‑LM לאימון LoRA על Apple Silicon
- ChromaDB ל־RAG מקומי
- PyMuPDF / pypdf / python-docx לחילוץ חומרי קורס
- FastAPI / Uvicorn אם תרצה להריץ ממשק
- Vitest / jsdom / React Testing Library / ESLint לבדיקת פתרונות JS/React/Express

---

## 2. הורדת מודלים

```bash
./scripts/02_pull_models.sh
```

המודל הראשי:

```bash
ollama pull qwen3-coder-next
```

מודל קטן ומהיר לתרגול יומי אופציונלי:

```bash
ollama pull qwen3:8b
```

---

## 3. יצירת מודל Ollama מותאם למבחן

```bash
./scripts/09_create_ollama_model.sh
ollama run svcollege-fullstack-exam
```

המודל משתמש ב־system prompt שמכריח אותו לענות בפורמט מבחן:

1. הבנת הדרישה
2. פתרון / קוד
3. הסבר קצר בעברית
4. מלכודת מבחן
5. בדיקת תקינות

---

## 4. איך משתמשים ב־GPT‑5.5

פתח את הקובץ:

```text
GPT55_MASTER_PROMPT_SVCOLLEGE_EXAM_ONLY.md
```

הדבק אותו כ־System Prompt או כהודעה ראשונה ל־GPT‑5.5 Pro.

אחר כך שלח:

```text
Execute Sprint 0
```

GPT‑5.5 לא אמור “לפתור את המבחן במקומך”. התפקיד שלו כאן הוא:

- לבנות dataset איכותי.
- לבנות שאלות אימון.
- לבנות DPO trap pairs.
- לבדוק דליפת דאטה.
- לבנות eval סגור.
- לשפר את Qwen המקומי כמאמן מבחן.

---

## 5. סדר הרצה מומלץ

```bash
# 0. יצירת תיקיות
./scripts/01_prepare_dirs.sh

# 1. העתק את כל קבצי הקורס לתיקייה:
# data/course_files/

# 2. חילוץ טקסט מהקבצים
python scripts/03_extract_course_files.py --input data/course_files --out data/chunks/source_chunks.jsonl

# 3. בניית seed dataset בסיסי
python scripts/04_build_exam_datasets.py --chunks data/chunks/source_chunks.jsonl --out data/generated

# 4. ולידציה וחלוקה ללא leakage
python scripts/05_validate_and_split.py --input data/generated/sft_candidates.jsonl --out data/sft

# 5. אימון LoRA עם MLX
./scripts/06_train_mlx_lora.sh

# 6. Evaluation מול Ollama
python scripts/07_eval_ollama.py --model svcollege-fullstack-exam --eval data/eval/locked_eval.jsonl
```

---

## 6. כלל הזהב

לפני LoRA, חובה למדוד:

```text
Qwen base + system prompt
Qwen + RAG
Qwen + RAG + verifier
Qwen + RAG + verifier + LoRA
```

מקדמים LoRA רק אם הוא משפר את ה־locked eval לפחות ב־3% ולא פוגע בנושא מרכזי.

---

## 7. מה לא להכניס לתוכנית הזאת

לא להכניס:

- Neo4j
- Fleet Manager
- Anti‑Fake
- Agent tournament
- Cabinet AI‑OS layers
- Canary deploy
- פרודקשן ארגוני

כל אלה מחוץ למטרה. המטרה היא ציון במבחן Full‑Stack.

