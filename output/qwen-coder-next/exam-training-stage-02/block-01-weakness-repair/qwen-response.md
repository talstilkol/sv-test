### 🔍Correction Drill – Stage 1 Overconfidence Fixes  
**היעוד:** לתקן טענות מופרזות, לשלב הגבלות מדויקות, ולשפר את הבנת גבולות ההוכחה.

---

#### **(1) רשימת טענות חזקות ממה שהמקור תומך בו**  
| מס’ | טענה באשכול (Stage 1) | מקורות רשמיים מתייחסים? |
|-----|------------------------|------------------------|
| 1 | סבירות 100% ל-`localStorage` (בכל המקומות) | ❌ לא מופיע באף مصدر – נמחק ב-Cleanup |
| 2 | סבירות 100% ל-`error boundaries` (React) | ❌ לא מוזכר כדרישה – רק `error/loading/empty states` מופיע |
| 3 | סבירות 100% ל-`state mutation validation` | ❌ לא מוגדר כחלק מ-validation; נמחק |
| 4 | סבירות 100% ל-`layout order validation` | ❌ לא מופיע; layout order הוא UI, לא validation |
| 5 | סבירות 100% ל-`/borrow/:id` (routing דינמי) | ❌ routing דינמי מופיע אך לא כדרישה מפורשת – רק `100%: /team/:teamName` מומלץ |
| 6 | סבירות 100% ל-`localStorage` ב-Modal (React, 70%) | ❌ localStorage לא מופיע באף مصدر – אלוצינציה |

---

#### **(2) ניסוח מתוקן – גבולות בהוכחות**  
| טענה מקורנת | ניסוח מתוקן |
|--------------|--------------|
| `localStorage` תכופת usage | *איננו מופיע בדרישות – לא נחוץ למבחן. אם используется: פסילה.* |
| `error boundaries` | `20%: error boundaries (bonus – לא חובה). לא נבדקים אם לא מושלם.` |
| `state mutation validation` | *הוסר – לא חלק מ-validation. נוגע ל-TypeScript/React patterns.* |
| `layout order validation` | *הוסר – layout order הוא עניין של UI, לא validation.* |
| `/borrow/:id` routing | `30%: routing דינמי אחר (למשל `/borrow/:id`) – לא נחוץ.` |
| `localStorage` ב-Modal | *הוסר – לא נחוץ. localStorage לא מופיע באף مصدر.* |

---

#### **(3) כלל מונע שגיאות עתידיות**  
**הכלל הזהב:**  
> **"אם אינני רואה את הביטוי במפורש ב-checklist, template, או simulation רשמי – לא מגדירים סבירות 100%, לא כותבים 'חייב'/'היא חובה', ולא מציינים כדרישה – אלא כ-'בנושאי bonus' או 'לא מופיע ב-source'."**

**הנחיות יישום:**  
- כל טענה על נושא must reference **specific source** (checklist, template, simulation)  
- אם אין פסוקית מפורשת:  
  - ✅ "נפוץ" → `60%`  
  - ✅ "zikuy be-reshimta" (במבחנים קודמים) → `50%`  
  - ❌ "ללא תיעוד" → `0%`, עם הערת *לא מופיע ב-source*  
- מונע את המילה **"חייב"** – מחליפים ב-`จำเปוני` או `מומלץ`  
- מונע אמירה על `localStorage`, `error boundaries`, `state mutation` – אלא אם מופיע במפורש ב-source

---

#### **(4) 12 שאלות אוטו-בידוק – כופפות הוכחה**  
שאלה – תשובת "כן/לא" – עם **הסיבה לפי המקור**.  
1. האם `localStorage` מופיע ב-checklist של החומר המותר למבחן?  
   → **לא**. אם התשובה היא "כן" – שגיאה.  
2. האם `error boundaries` מופיע כדרישה חובה ב-checklist של React?  
   → **לא**. רק `error/loading/empty states` נידון כדרישה.  
3. האם `state mutation validation` מופיע ב-section של ולידציות?  
   → **לא**. מופrece ב-TypeScript/React patterns – לא ב-validation.  
4. האם `layout order` מופיע כחלק מדרישות ולידציות?  
   → **לא**. layout order הוא UI – לא validation.  
5. האם `/borrow/:id` מופיע כ-routing דינמי נדרש ב-checklist?  
   → **לא**. רק `/team/:teamName` מופיע כנדרש.  
6. האם `localStorage` מופיע באף אחד מה-templates של Frontend/Backend?  
   → **לא**. אם מופיע – שגיאה.  
7. האם `throw new Error()` מופיע במפורש ב-Checklist של JS?  
   → **כן**. דוגמה מדויקת: `throw new Error("Must be array")`.  
8. האם CORS מופיע כדרישה *לפני* `express.json()` ב-Template?  
   → **כן**. ב-CORS checklist: `app.use(cors({ origin: ... }))` **לפני** `express.json()`.  
9. האם `Confirm Password` מופיע כדרישה זוגית (frontend + backend) ב-SV Appointments?  
   → **כן**. מופיע במפורש כדרישה קריטית.  
10. האם `try/catch` מופיע כדרישה בכל route ב-Checklist?  
    → **כן**. "try/catch must wrap all routes" – מופיע במפורש.  
11. האם `useNavigate` אחרי הצלחה מופיע כדרישה ב-checklist?  
    → **כן**. באשכול הביקורת: "after success → navigate".  
12. האם `type guard` (`isValidPlayer`) מופיע כדרישה ב-SV Volunteer?  
    → **כן** – מופיע כנפוץ, אבל לא חובה: `85%`.  

---

#### **(5) מדיניות קשיחה לעתיד – Qwen-Coder-Next**  
**_policy for future probability reports & mastery checks:_**  
> **1. כל טענה על סבירות ≥90% חייבת להיות מוצגת ב-**  
> - ✅ Checklist רשמי (SV Checklist)  
> - ✅ Template (backend/frontend)  
> - ✅ Simulation (SV Team Manager / SV Library / etc.)  
> **אם לא – הסבירות ≤50% או *unknown/unavailable*.**  
>  
> **2. לא מותר לציין נושא כ-**`*required*`** אלא אם מופיע במפורש ב-**`required`** או** `**must**` **ב-source.**  
>  
> **3. כל הערה על נושא ביטחוני (CORS, localStorage, error boundaries) חייבת לכלול:**  
> - ✔️ האם הוא *מופיע ב-checklist*?  
> - ✔️ האם הוא *נמצא ב-template*?  
> - ✔️ האם הוא *ב-Simulation רשמי*?  
>  
> **4. אם לא נמצאה הוכחת נושא – תכתוב:**  
> `*not found in source – unknown/unavailable.*`  
> **ولا תffa`ה**.  
>  
> **5. ב-mastery quiz: כל שאלה צריכה含**  
> - ✔️ מקצוע מדויק (שם section, שם file, דף simulation)  
> - ✔️ ציטוט מ-source (אם אפשר)  
>  
> **6. לא מותר להשתמש במילים כמו:**  
> `should`, `might`, `could`, `often`, `usually`, `likely`, **אלא אם נמuka באשכול הביקורת**.  
> **במקום – תשתמש:**  
> ` מופיע במפורש`, ` נדרש לפי checklist`, ` מומלץ`, `_bonus only_`.  

---

**הערה סופית:**  
> **"הסבירות נקבעה על סמך חזרות במבחנים, אך רק מה שרשום ב-source רשמי (Checklist, Templates, Simulations) הוא חובה – ост ост הוא bonus."**  
> — SVCollege FullStack Exam NotebookLM Source, Section 0.1  

**Stage 1 fully corrected. Ready for Stage 2.**

