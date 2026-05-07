# Qwen3-Coder-Next Project Builder Training

מטרת החבילה: להפוך את Qwen3-Coder-Next ל-agent מקומי שמייצר פרויקטי FullStack מלאים למבחן SVCollege במהירות, עם ולידציות מלאות, בלי נתונים מומצאים ובלי קוד לא דטרמיניסטי.

## קבצים

- [qwen-system-prompt.md](/Users/tal/Desktop/חומרים%20לשיעור/docs/qwen-coder-next-training/qwen-system-prompt.md) - ה-system prompt להדבקה ב-Qwen.
- [agent-drill-protocol.md](/Users/tal/Desktop/חומרים%20לשיעור/docs/qwen-coder-next-training/agent-drill-protocol.md) - תוכנית 7 ימים להפעלה מול המודל.
- [prompts/](/Users/tal/Desktop/חומרים%20לשיעור/docs/qwen-coder-next-training/prompts) - prompt מוכן לכל יום אימון.
- [rubric.md](/Users/tal/Desktop/חומרים%20לשיעור/docs/qwen-coder-next-training/rubric.md) - שיטת ציון 70/20/10.
- [scorecard.md](/Users/tal/Desktop/חומרים%20לשיעור/docs/qwen-coder-next-training/scorecard.md) - טבלת מעקב להרצות ולציונים.
- [simulation-sv-library.md](/Users/tal/Desktop/חומרים%20לשיעור/docs/qwen-coder-next-training/simulation-sv-library.md) - סימולציה מלאה ליום 6.
- [runtime-repair-improvement-plan.md](/Users/tal/Desktop/חומרים%20לשיעור/docs/qwen-coder-next-training/runtime-repair-improvement-plan.md) - תוכנית שיפור נוספת אחרי runtime failures.
- [contracts/](/Users/tal/Desktop/חומרים%20לשיעור/docs/qwen-coder-next-training/contracts) - חוזי static guard לסימולציות Library, Team Manager ו-Appointments.

## הפעלה מומלצת

1. טען את Qwen3-Coder-Next מקומית דרך LM Studio, llama.cpp או OpenAI-compatible local server.
2. הדבק את [qwen-system-prompt.md](/Users/tal/Desktop/חומרים%20לשיעור/docs/qwen-coder-next-training/qwen-system-prompt.md) כ-system prompt.
3. בכל יום הדבק למודל את קובץ היום מתוך [prompts/](/Users/tal/Desktop/חומרים%20לשיעור/docs/qwen-coder-next-training/prompts).
4. שמור כל פלט פרויקט של Qwen בתיקייה מקומית, למשל `output/qwen-coder-next/day-06`.
5. הרץ guard על הפלט:

```bash
npm run qwen:guard -- output/qwen-coder-next/day-06 --contract docs/qwen-coder-next-training/contracts/sv-library-contract.json --strict --summary
```
6. תעד את הציון ב-[scorecard.md](/Users/tal/Desktop/חומרים%20לשיעור/docs/qwen-coder-next-training/scorecard.md).

כדי לשמור דוח guard לתיקיית הפלט:

```bash
npm run qwen:guard -- output/qwen-coder-next/day-06 --contract docs/qwen-coder-next-training/contracts/sv-library-contract.json --write
```

## הרצה אוטומטית מול Ollama

המודל המקומי המוגדר כברירת מחדל הוא `qwen3-coder-next:latest`.

בדיקת חיבור קצרה:

```bash
npm run qwen:train:smoke
```

dry-run שמכין prompt בלי לקרוא למודל:

```bash
npm run qwen:train:dry -- --day 6
```

הרצת יום בודד:

```bash
npm run qwen:train -- --day 6
```

הרצת כל המסלול:

```bash
npm run qwen:train -- --days 1-7
```

הרצת שלוש סימולציות מלאות:

```bash
npm run qwen:train -- --simulation all --output output/qwen-coder-next/full-simulations
```

הרצת סימולציה בודדת:

```bash
npm run qwen:train -- --simulation sv-team-manager
```

## Materialization + Runtime Evaluation

המטרה כאן היא לבדוק פרויקט runnable ולא רק תשובת Markdown.

חילוץ קבצים מתוך תשובת Qwen:

```bash
npm run qwen:materialize -- output/qwen-coder-next/rerun-02/day-06/qwen-response.md --summary
```

בדיקה static + syntax על הפרויקט הממומש:

```bash
npm run qwen:evaluate -- output/qwen-coder-next/rerun-02/day-06/materialized-project --contract docs/qwen-coder-next-training/contracts/sv-library-contract.json --write --summary
```

בדיקת runtime מלאה, כולל install/build/smoke רק בתוך תיקיית הפלט:

```bash
npm run qwen:evaluate:runtime -- output/qwen-coder-next/rerun-02/day-06/materialized-project --contract docs/qwen-coder-next-training/contracts/sv-library-contract.json
```

## מדד מעבר

Qwen עובר את האימון רק אחרי שלוש סימולציות רצופות עם:

- ציון 90/100 ומעלה לפי [rubric.md](/Users/tal/Desktop/חומרים%20לשיעור/docs/qwen-coder-next-training/rubric.md).
- `ready=true` ב-static guard.
- runtime score של 90+ אחרי materialization.
- אין שימוש ב-native random API.
- אין fake/demo/sample data.
- אין endpoint שלא מופיע בדרישות.
- אין ולידציה חסרה ב-POST/PUT.
