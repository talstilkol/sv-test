# פקודות עבודה — SVCollege Exam Trainer V5

## התקנה

```bash
chmod +x INSTALL_M4MAX_128GB_EXAM_ONLY.sh
./INSTALL_M4MAX_128GB_EXAM_ONLY.sh
```

## הורדת מודלים

```bash
./scripts/02_pull_models.sh
```

## יצירת מודל Ollama מותאם

```bash
./scripts/09_create_ollama_model.sh
ollama run svcollege-fullstack-exam
```

## הכנסת חומרי קורס

העתק את כל הקבצים לתיקייה:

```text
data/course_files/
```

## חילוץ טקסט

```bash
python scripts/03_extract_course_files.py \
  --input data/course_files \
  --out data/chunks/source_chunks.jsonl
```

## יצירת dataset ראשוני

```bash
python scripts/04_build_exam_datasets.py \
  --chunks data/chunks/source_chunks.jsonl \
  --out data/generated
```

## חלוקה ללא leakage

```bash
python scripts/05_validate_and_split.py \
  --input data/generated/sft_candidates.jsonl \
  --out data/sft
```

## אימון LoRA

```bash
./scripts/06_train_mlx_lora.sh
```

## בדיקה מול eval

```bash
python scripts/07_eval_ollama.py \
  --model svcollege-fullstack-exam \
  --eval data/eval/locked_eval.jsonl
```

## יצירת Drill יומי

```bash
python scripts/08_daily_drill.py
cat outputs/daily_drill_prompt.md
```
