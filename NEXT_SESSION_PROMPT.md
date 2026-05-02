# Prompt לסשן הבא — ביצוע ברצף ללא עצירה

> העתק/הדבק את הטקסט מתחת לתחילת הסשן הבא של Claude Code.
> כל הסשן ירוץ אוטונומית עד סיום ה-batch של היום.

---

## הוראות לסשן הבא

המשך את העבודה על LumenPortal — פורטל למידה אישי לקראת מבחן SVCollege Full-Stack.

**קונטקסט קצר:**
- הפרויקט ב-`/Users/tal/Desktop/חומרים לשיעור`
- 774/774 tests עוברים (אל תשבור)
- Bank עכשיו: 936 MC + 514 Fill = 1,450 שאלות ידניות
- 118/118 מושגי SVCollege מכוסים ב-6 רמות מלאות (grandma→professor)
- Cache version אחרון: `top-bar-perf-v96`
- כל ה-UX overhauls בוצעו (סרגל הישגים, left-action-bar, פוקט עם רמות, צבעי מושגים, % שיעורים, חזרה/בית, וכו')

**כללי ברזל בסשן הזה:**

1. **אסור** Math.random / Date.now / crypto.randomUUID בקבצי data/lesson_*.js או scripts יצירת תוכן (תפיל בדיקות).
2. **אסור** לחשוב/לכתוב/לזייף את ניסוח השאלות ע״י script — **כל שאלה כתובה ידנית עם options/answer/hint/explanation/optionFeedback.**
3. **מותר** sankripts ל: ספירת פערים, וידוא ID-ים ייחודיים, validate, report.
4. **חובה** אחרי כל batch: cache bump (vXX→vXX+1) ב-7 קבצים: `index.html`, `service-worker.js`, `scripts/report_museum_access_smoke.js`, `scripts/report_svcollege_pwa_offline_smoke.js`, `tests/service-worker-cache.test.js`, `tests/svcollege-pwa-offline-smoke.test.js` (וב-`SHELL_ASSETS` ב-service-worker).
5. **חובה** אחרי כל batch: `npm test -- --run` ירוק (774/774).
6. **חובה** commit מקומי בלבד (לא push).
7. סדר בקש מבדיקה אוטומטית: `npm run report:source-of-truth:write` אם קיימת בדיקת date-mismatch.

**המשימות בסדר ביצוע — בצע ברצף ללא עצירה:**

### Batch A — שאלות ידניות (60-90 דקות)

1. הרץ ניתוח פערים:
   ```bash
   node -e "
   const fs=require('fs');const vm=require('vm');
   const sb={module:{exports:{}}};sb.window=sb;vm.createContext(sb);
   vm.runInContext(fs.readFileSync('data/questions_bank.js','utf8'),sb,{filename:'b.js'});
   const bank=sb.QUESTIONS_BANK;
   const counts={};
   bank.mc.forEach(q=>{if(q.conceptKey){counts[q.conceptKey]=counts[q.conceptKey]||{mc:0,fill:0};counts[q.conceptKey].mc++}});
   bank.fill.forEach(q=>{if(q.conceptKey){counts[q.conceptKey]=counts[q.conceptKey]||{mc:0,fill:0};counts[q.conceptKey].fill++}});
   console.log('Top 30 concepts needing more questions:');
   Object.entries(counts).map(([k,v])=>({k,gap:Math.max(0,3-v.mc)+Math.max(0,2-v.fill),mc:v.mc,fill:v.fill})).filter(c=>c.gap>0).sort((a,b)=>b.gap-a.gap).slice(0,30).forEach(c=>console.log('  '+c.k+': mc='+c.mc+' fill='+c.fill));
   "
   ```

2. **כתוב ידנית** 20 MC חדשות + 20 Fill חדשות עבור 20 המושגים שהכי חסרים:
   - כל MC: id ייחודי `mc_<lesson>_<concept>_002`/`_003`, topicId, conceptKey, level, question (Hebrew), options[4] עם הסבר טכני אמיתי, correctIndex, explanation, optionFeedback[4] — אחד לכל option (✅ נכון/❌ סיבה ספציפית).
   - כל Fill: id ייחודי `fill_<lesson>_<concept>_001`, conceptKey, level, code עם `____`, answer (string מדויק), hint (Hebrew), explanation.
   - הוסף לפני הקטע `// ----- workbook_taskmanager — 12 missing -----` ב-`data/questions_bank.js` (שורה ~448).
   - Fills מתווספים ליד `fill_lsql_tx_001` סביב שורה ~11258.

3. הרץ `node -e "..."` שוב לוודא שהפערים קטנו ב-40.

### Batch B — 6 רמות אמיתיות לעוד 5-10 מושגים (45-60 דקות)

מושגים שעדיין אין להם `levels` object (rich):
- שאר 450 המושגים שאינם SVCollege.
- בחר 5-10 מושגים מליבת JS (lesson_19) — כל אחד דורש 6 פסקאות (grandma/child/soldier/student/junior/professor).
- **אל תעתיק** מ-simpleExplanation. כתוב ידנית הסבר אמיתי לכל רמה.
- כל פסקה ~2-4 משפטים, מדויקת לרמה (סבתא = analogy מוחשי, פרופ׳ = formal CS terminology).

### Batch C — Trace/Build/Bug — 30-40 פערים (60-90 דקות)

הרץ ניתוח Trace gaps:
```bash
npm run questions:activity-authoring-plan -- --strict 2>&1 | head -40
```

הוסף ידנית 10-15 trace tasks + 5-10 build tasks + 5-10 bug-hunt tasks בקבצי `data/svcollege_traces_*.js` / `data/svcollege_builds_*.js` / `data/svcollege_questions_*.js` לפי הקבצים שמצביעים על פער.

### Batch D — Verification + Commit (15 דקות)

1. `npm run validate:strict` — ירוק
2. `npm test -- --run` — 774/774 ירוק
3. `npm run quality:questions:strict` — 0 blockers
4. cache bump v96→v97 בכל 7 הקבצים (ראה למעלה)
5. commit עם הודעה: `Manual content batch: <X> MC + <Y> Fill + <Z> Trace`

### Batch E — Browser bug-hunt (15 דקות)

```bash
# הפעל preview server אם לא פועל
# נווט localhost:8765 ובדוק:
- [ ] עמוד בית — Resume button מופיע אם יש lastOpenedLesson
- [ ] לחיצה על שיעור → רנדור concept-card (מצב "📚 מלא")
- [ ] level pill קליקבילי → גוללת לשאלות
- [ ] pocket toggle 📌 → נשמר במקום אחד ובסרגל הישגים
- [ ] הכיס: 6 רמות עם +/- + "✅ הבנתי" + "🔍 פתח מושג"
- [ ] מצב מושג: ירוק=V, אדום=נכשל, רגיל=נייטרלי
- [ ] חזרה/בית בסרגל עליון עובדים
- [ ] left-action-bar: הגדרות פותח התקן+תצוגה כהה; תצוגה פותח PDF+קפלים; כיס פותח פאנל
- [ ] סרגל ביצועים מציג: שם + XP + ביצועים% + עברתי + בקיא + בכיס
- [ ] sidebar ימני: tree פשוט בלי search/header
- [ ] תיקון אוטומטי לכל שגיאה שמופיעה ב-console
```

---

## בקרת איכות

- **Be brutally honest.** אל תסמן V למשהו שלא בוצע אמיתית.
- **אל תיצור scripts** שמייצרים ניסוח שאלות / אפשרויות / הסברים. סקריפטים = רק לבדיקה ולדיווח.
- **אל תדחוף לרמוטה** (`git push`). רק commit מקומי.
- **לפני סיום הסשן:** עדכן `TASKS_NUMBERED.md` עם המספרים החדשים (MC count, Fill count).

## מטרות לסיום
- 950+ MC ו-540+ Fill ידניות במאגר
- 0 שגיאות ב-DevTools console
- 774/774 tests עוברים
- Quality Index 100% warning-free

תתחיל. אל תעצור עד שכל ה-batches A-E הסתיימו או tests נשברו (במקרה זה — תקן ותמשיך).
