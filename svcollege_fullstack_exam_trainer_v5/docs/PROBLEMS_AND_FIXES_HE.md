# כל הבעיות בתוכנית הישנה — והתיקון ב־V5

## 1. הבעיה: ערבוב מטרות

התוכנית הישנה עירבבה בין:

- מערכת Cabinet AI‑OS
- אוטונומיית סוכנים
- תשתית ML כללית
- לימוד למבחן Full‑Stack

### התיקון

V5 היא Exam Only:

```text
מבחן SVCollege Full‑Stack בלבד
```

כל רכיב שלא מעלה ציון במבחן הוסר.

---

## 2. הבעיה: Prompt במקום מערכת אימון

Prompt טוב עוזר רגעית, אבל לא יוצר שיפור מדיד במודל.

### התיקון

V5 כוללת:

- SFT dataset
- DPO trap pairs
- locked eval
- verifier
- leaderboard
- MLX LoRA only after baseline

---

## 3. הבעיה: אין Eval סגור

בלי eval סגור אי אפשר לדעת אם המודל השתפר או שינן.

### התיקון

נוצר קובץ חובה:

```text
data/eval/locked_eval.jsonl
```

אסור לאמן עליו.

---

## 4. הבעיה: אין מנגנון נגד Data Leakage

אם שאלה מופיעה גם באימון וגם בבדיקה, התוצאה מזויפת.

### התיקון

הסקריפט `05_validate_and_split.py` מבצע:

- validation ל־Chat format
- hash לשאלה
- deduplication
- בדיקת overlap בין train/valid/test

---

## 5. הבעיה: התוכנית לא מודדת טעויות מבחן אמיתיות

רוב הטעויות הן לא “קוד לא עובד”, אלא מלכודות:

- React state mutation
- async forEach
- fetch מחוץ ל־useEffect
- חסר express.json
- בלבול params/query/body
- any ב־TS

### התיקון

נוסף verifier JS/TS עם Vitest + ESLint, ורשימת חוקים ב־rubric.

---

## 6. הבעיה: LoRA מוקדם מדי

Fine‑tune מוקדם עלול לקלקל מודל טוב.

### התיקון

סדר חובה:

```text
Prompt baseline → RAG → Verifier → Eval → LoRA
```

---

## 7. הבעיה: אין Drill יומי לתלמיד

גם מודל טוב לא מספיק אם התלמיד לא מתרגל.

### התיקון

נוסף `08_daily_drill.py` שמייצר אימון יומי:

- שאלות קצרות
- שאלות קוד
- מיני פרויקט
- שאלת מלכודת
- remediation לפי נושאים חלשים

---

## 8. הבעיה: שימוש ב־context ענק ללא צורך

256K tokens נשמע חזק, אבל ללמידה יומית זה איטי ומבלבל.

### התיקון

המודל המותאם משתמש ב־32K context כברירת מחדל.

---

## 9. הבעיה: תבנית תשובה לא אחידה

מודל שעונה כל פעם אחרת קשה לבדוק וקשה ללמוד ממנו.

### התיקון

כל תשובה חייבת:

1. הבנת הדרישה
2. פתרון / קוד
3. למה זה נכון למבחן
4. מלכודת נפוצה
5. בדיקת תקינות קצרה

---

## 10. הבעיה: יותר מדי תשתיות שלא קשורות למבחן

Neo4j, Fleet, agents, anti‑fake, canary deploy — לא משרתים את המבחן.

### התיקון

V5 שומרת רק:

```text
course extraction + RAG + SFT + DPO + verifier + eval + MLX LoRA
```
