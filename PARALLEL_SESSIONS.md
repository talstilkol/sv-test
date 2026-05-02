# 4 Sonnet 4.6 Sessions — מקבילים (no conflicts)

> כל סשן עובד ב-branch נפרד. בסוף — `git merge` ידני של 4 הענפים.
> כל סשן עורך **חלק שונה** של `data/questions_bank.js` (IDs unique) **+ קובצי lesson שונים**.

---

## חוקי ברזל (זהים לכל 4 הסשנים)

1. **כתיבה ידנית בלבד.** ניסוח שאלה / options / hint / explanation / optionFeedback — **לא script**. סקריפטים = רק לבדיקה ודיווח.
2. **ID-ים ייחודיים.** Format: `mc_<lesson_short>_<concept>_<NNN>` ו-`fill_<lesson_short>_<concept>_<NNN>`.
3. **אסור** Math.random / Date.now / crypto.randomUUID / api_key / sk- בקבצי data/ או scripts/ (תפיל בדיקות).
4. **חובה** אחרי כל batch: `npm test -- --run` ירוק (774/774).
5. **Branch שונה** לכל סשן — `session-A`, `session-B`, `session-C`, `session-D`. **לא** push לרמוטה.
6. **Cache version** — אל תיגע. הסשן הסופי שמאחד יעשה bump אחד.

---

## SESSION A — lesson_19 + lesson_17 (JS fundamentals + Express)

```
המשך עבודה על LumenPortal ב-/Users/tal/Desktop/חומרים לשיעור.

צור ענף ועבור אליו:
git checkout -b session-A-l19-l17

המשימה: כתוב ידנית 25 MC + 25 Fill חדשות ל-lesson_19 ו-lesson_17.

חוקים מחייבים:
- ניסוח השאלות ידני בלבד. בלי scripts ל-content.
- ID format: mc_l19_<concept>_002 / mc_l19_<concept>_003 / mc_l17_<concept>_002 וכו׳.
- כל MC עם options[4] + correctIndex + explanation + optionFeedback[4].
- כל Fill עם code (עם ____) + answer + hint + explanation.

צעדים:
1. נתח פערים: node -e "const fs=require('fs');const vm=require('vm');const sb={module:{exports:{}}};sb.window=sb;vm.createContext(sb);vm.runInContext(fs.readFileSync('data/questions_bank.js','utf8'),sb,{filename:'b'});const b=sb.QUESTIONS_BANK;const c={};b.mc.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].mc++}});b.fill.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].fill++}});console.log('lesson_19+17 gaps:');Object.entries(c).filter(([k])=>k.startsWith('lesson_19::')||k.startsWith('lesson_17::')).map(([k,v])=>({k,gap:Math.max(0,3-v.mc)+Math.max(0,2-v.fill),mc:v.mc,fill:v.fill})).filter(x=>x.gap>0).sort((a,b)=>b.gap-a.gap).slice(0,30).forEach(x=>console.log('  '+x.k+': mc='+x.mc+' fill='+x.fill+' gap='+x.gap));"

2. הוסף 25 MC חדשות ב-data/questions_bank.js בקטע SESSION-A — חיפוש: `// ----- workbook_taskmanager — 12 missing -----` והוסף לפני זה בלוק חדש:
   // ----- SESSION A: lesson_19 + lesson_17 batch 2026-XX-XX -----

3. הוסף 25 Fill חדשות בקטע fill array — חפש `id: "fill_lsql_tx_001"` והוסף אחריו בלוק:
   // ----- SESSION A FILLS: lesson_19 + lesson_17 batch -----

4. רוץ: npm test -- --run → 774/774 ירוק.

5. commit: git add -A && git commit -m "SESSION-A: 25 MC + 25 Fill for lesson_19 + lesson_17"

6. הצג סיכום של ה-IDs שהוספת.

עצור. אל תמשיך לסשן אחר. אל תעשה push.
```

---

## SESSION B — lesson_20 + lesson_22 + lesson_24 (DOM + State)

```
המשך עבודה על LumenPortal ב-/Users/tal/Desktop/חומרים לשיעור.

צור ענף ועבור אליו:
git checkout -b session-B-dom-state

המשימה: כתוב ידנית 25 MC + 25 Fill חדשות ל-lesson_20 (DOM/Events), lesson_22 (useState), lesson_24 (useEffect/useMemo).

חוקים מחייבים:
- ניסוח השאלות ידני בלבד.
- ID format: mc_l20_<concept>_002 / mc_l22_<concept>_002 / mc_l24_<concept>_002 וכו׳.
- MC: options[4] + correctIndex + explanation + optionFeedback[4].
- Fill: code (עם ____) + answer + hint + explanation.

צעדים:
1. נתח פערים: node -e "const fs=require('fs');const vm=require('vm');const sb={module:{exports:{}}};sb.window=sb;vm.createContext(sb);vm.runInContext(fs.readFileSync('data/questions_bank.js','utf8'),sb,{filename:'b'});const b=sb.QUESTIONS_BANK;const c={};b.mc.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].mc++}});b.fill.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].fill++}});const targets=['lesson_20::','lesson_22::','lesson_24::'];console.log('Session B gaps:');Object.entries(c).filter(([k])=>targets.some(t=>k.startsWith(t))).map(([k,v])=>({k,gap:Math.max(0,3-v.mc)+Math.max(0,2-v.fill),mc:v.mc,fill:v.fill})).filter(x=>x.gap>0).sort((a,b)=>b.gap-a.gap).slice(0,30).forEach(x=>console.log('  '+x.k+': mc='+x.mc+' fill='+x.fill+' gap='+x.gap));"

2. הוסף 25 MC חדשות עם בלוק:
   // ----- SESSION B: lesson_20 + lesson_22 + lesson_24 batch -----

3. הוסף 25 Fill חדשות עם בלוק:
   // ----- SESSION B FILLS: DOM + State -----

4. npm test -- --run → 774/774.

5. git add -A && git commit -m "SESSION-B: 25 MC + 25 Fill for DOM + useState + useEffect"

6. סיכום IDs.

עצור. אל push. אל תעבור לסשן אחר.
```

---

## SESSION C — lesson_26 + lesson_27 + react_blueprint (TypeScript + React advanced)

```
המשך עבודה על LumenPortal ב-/Users/tal/Desktop/חומרים לשיעור.

צור ענף ועבור אליו:
git checkout -b session-C-ts-react

המשימה: כתוב ידנית 25 MC + 25 Fill חדשות ל-lesson_26 (TypeScript), lesson_27 (TS+React+Budget), react_blueprint.

חוקים מחייבים:
- ניסוח ידני.
- ID format: mc_l26_<concept>_002 / mc_l27_<concept>_002 / mc_rblue_<concept>_002.
- MC: options[4] + correctIndex + explanation + optionFeedback[4].
- Fill: code + answer + hint + explanation.

צעדים:
1. נתח פערים: node -e "const fs=require('fs');const vm=require('vm');const sb={module:{exports:{}}};sb.window=sb;vm.createContext(sb);vm.runInContext(fs.readFileSync('data/questions_bank.js','utf8'),sb,{filename:'b'});const b=sb.QUESTIONS_BANK;const c={};b.mc.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].mc++}});b.fill.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].fill++}});const targets=['lesson_26::','lesson_27::','react_blueprint::'];console.log('Session C gaps:');Object.entries(c).filter(([k])=>targets.some(t=>k.startsWith(t))).map(([k,v])=>({k,gap:Math.max(0,3-v.mc)+Math.max(0,2-v.fill),mc:v.mc,fill:v.fill})).filter(x=>x.gap>0).sort((a,b)=>b.gap-a.gap).slice(0,30).forEach(x=>console.log('  '+x.k+': mc='+x.mc+' fill='+x.fill+' gap='+x.gap));"

2. הוסף 25 MC חדשות עם בלוק:
   // ----- SESSION C: lesson_26 + lesson_27 + react_blueprint batch -----

3. הוסף 25 Fill חדשות עם בלוק:
   // ----- SESSION C FILLS: TypeScript + React advanced -----

4. npm test -- --run → 774/774.

5. git add -A && git commit -m "SESSION-C: 25 MC + 25 Fill for TS + React advanced"

6. סיכום IDs.

עצור. אל push. אל תעבור לסשן אחר.
```

---

## SESSION D — SVCollege bridges (sql_orm, nextjs, nestjs, devops, design, ai)

```
המשך עבודה על LumenPortal ב-/Users/tal/Desktop/חומרים לשיעור.

צור ענף ועבור אליו:
git checkout -b session-D-svcollege

המשימה: כתוב ידנית 25 MC + 25 Fill חדשות עבור 6 קבצי SVCollege bridge:
lesson_sql_orm, lesson_nextjs, lesson_nestjs, lesson_devops_deploy, lesson_design_systems, lesson_ai_engineering, lesson_auth_security.

חוקים מחייבים:
- ניסוח ידני בלבד.
- ID format: mc_lsql_<concept>_002 / mc_lnext_<concept>_002 / mc_lnest_<concept>_002 / mc_ldev_<concept>_002 / mc_lds_<concept>_002 / mc_lai_<concept>_002 / mc_la_<concept>_002.
- MC: options[4] + correctIndex + explanation + optionFeedback[4].
- Fill: code + answer + hint + explanation.

צעדים:
1. נתח פערים: node -e "const fs=require('fs');const vm=require('vm');const sb={module:{exports:{}}};sb.window=sb;vm.createContext(sb);vm.runInContext(fs.readFileSync('data/questions_bank.js','utf8'),sb,{filename:'b'});const b=sb.QUESTIONS_BANK;const c={};b.mc.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].mc++}});b.fill.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].fill++}});const targets=['lesson_sql_orm::','lesson_nextjs::','lesson_nestjs::','lesson_devops_deploy::','lesson_design_systems::','lesson_ai_engineering::','lesson_auth_security::'];console.log('Session D gaps:');Object.entries(c).filter(([k])=>targets.some(t=>k.startsWith(t))).map(([k,v])=>({k,gap:Math.max(0,3-v.mc)+Math.max(0,2-v.fill),mc:v.mc,fill:v.fill})).filter(x=>x.gap>0).sort((a,b)=>b.gap-a.gap).slice(0,40).forEach(x=>console.log('  '+x.k+': mc='+x.mc+' fill='+x.fill+' gap='+x.gap));"

2. הוסף 25 MC חדשות עם בלוק:
   // ----- SESSION D: SVCollege bridges batch -----

3. הוסף 25 Fill חדשות עם בלוק:
   // ----- SESSION D FILLS: SVCollege bridges -----

4. npm test -- --run → 774/774.

5. git add -A && git commit -m "SESSION-D: 25 MC + 25 Fill for SVCollege bridges"

6. סיכום IDs.

עצור. אל push. אל תעבור לסשן אחר.
```

---

## אחרי שכל 4 הסשנים סיימו — סשן מאחד (5)

```
המשך עבודה על LumenPortal ב-/Users/tal/Desktop/חומרים לשיעור.

המשימה: למזג את כל 4 הענפים, להריץ tests, ל-bump cache, ול-commit סופי.

צעדים:
1. git checkout main
2. git merge session-A-l19-l17 -m "Merge SESSION-A"
3. אם יש merge conflict ב-data/questions_bank.js — פתור ידנית (כל 4 הסשנים כתבו לאיזורים שונים, אבל אם 2 עורכים את אותה שורה — שמור את שתי התוספות).
4. git merge session-B-dom-state
5. git merge session-C-ts-react
6. git merge session-D-svcollege
7. npm test -- --run → 774/774 (לתקן אם צריך).
8. cache bump v96→v97 ב-7 קבצים:
   - index.html (`app.js?v=parallel-merged-v97`)
   - service-worker.js (SHELL_ASSETS)
   - scripts/report_museum_access_smoke.js
   - scripts/report_svcollege_pwa_offline_smoke.js
   - tests/service-worker-cache.test.js
   - tests/svcollege-pwa-offline-smoke.test.js
9. npm run report:source-of-truth:write
10. npm test -- --run → 774/774
11. git add -A && git commit -m "Merge 4 parallel sessions: 100 MC + 100 Fill new manual questions"

12. הצג סיכום סופי: כמה MC + Fill מצטברות עכשיו במאגר, ואיזה מושגים עדיין צריכים יותר שאלות.

תבצע ברצף ללא עצירה. אם בדיקה נופלת — תקן ותמשיך.
```

---

## Throughput משוער

| סשן | זמן | תוצר |
|-----|-----|------|
| A (parallel) | ~90 דק׳ | 50 שאלות |
| B (parallel) | ~90 דק׳ | 50 שאלות |
| C (parallel) | ~90 דק׳ | 50 שאלות |
| D (parallel) | ~90 דק׳ | 50 שאלות |
| 5 (merge) | ~15 דק׳ | merge + verify |

**סה״כ wall-clock:** ~90+15 = 105 דק׳ במקום 4×90=360 דק׳ סדרתיים.
**תוצר:** 100 MC + 100 Fill = **200 שאלות חדשות**, מ-1,450 → **1,650**.

## הוראת שימוש

1. פתח 4 חלונות Sonnet 4.6 — אחד לכל סשן.
2. הדבק את הפרומפט המתאים לכל חלון.
3. השאר את כל 4 רצים במקביל.
4. כשכולם מסיימים — פתח חלון 5 והדבק את הפרומפט המאחד.

**אזהרה:** אם 2 סשנים מנסים לערוך את אותה שורה ב-`data/questions_bank.js` — תהיה merge conflict בסשן 5. כדי למזער: כל סשן מכניס את ה-MC שלו אחרי בלוק שונה (A — אחרי `lesson_19 fundamentals batch`, B — אחרי A's block וכו׳). אם רוצים סדרתי אבל מהיר — להריץ B אחרי A מסתיים.
