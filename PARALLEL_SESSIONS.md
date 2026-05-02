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

## SESSION E — lesson_11 + lesson_12 (Arrays + Array methods practice)

```
המשך עבודה על LumenPortal ב-/Users/tal/Desktop/חומרים לשיעור.

צור ענף ועבור אליו:
git checkout -b session-E-arrays

המשימה: כתוב ידנית 25 MC + 25 Fill חדשות ל-lesson_11 (Arrays/Functions/Scope) ו-lesson_12 (Array methods).

חוקים מחייבים:
- ניסוח ידני בלבד.
- ID format: mc_l11_<concept>_002 / mc_l12_<concept>_002 וכו׳.
- MC: options[4] + correctIndex + explanation + optionFeedback[4].
- Fill: code (עם ____) + answer + hint + explanation.

צעדים:
1. נתח פערים: node -e "const fs=require('fs');const vm=require('vm');const sb={module:{exports:{}}};sb.window=sb;vm.createContext(sb);vm.runInContext(fs.readFileSync('data/questions_bank.js','utf8'),sb,{filename:'b'});const b=sb.QUESTIONS_BANK;const c={};b.mc.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].mc++}});b.fill.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].fill++}});console.log('Session E gaps:');Object.entries(c).filter(([k])=>k.startsWith('lesson_11::')||k.startsWith('lesson_12::')).map(([k,v])=>({k,gap:Math.max(0,3-v.mc)+Math.max(0,2-v.fill),mc:v.mc,fill:v.fill})).filter(x=>x.gap>0).sort((a,b)=>b.gap-a.gap).slice(0,30).forEach(x=>console.log('  '+x.k+': mc='+x.mc+' fill='+x.fill+' gap='+x.gap));"

2. הוסף 25 MC חדשות עם בלוק:
   // ----- SESSION E: lesson_11 + lesson_12 batch -----

3. הוסף 25 Fill חדשות עם בלוק:
   // ----- SESSION E FILLS: Arrays + Array methods -----

4. npm test -- --run → 774/774.

5. git add -A && git commit -m "SESSION-E: 25 MC + 25 Fill for Arrays + Array methods"

עצור. אל push.
```

---

## SESSION F — lesson_13 + lesson_15 (Objects/DOM + Async)

```
המשך עבודה על LumenPortal ב-/Users/tal/Desktop/חומרים לשיעור.

צור ענף ועבור אליו:
git checkout -b session-F-obj-async

המשימה: כתוב ידנית 25 MC + 25 Fill חדשות ל-lesson_13 (Objects/DOM/Classes/Storage) ו-lesson_15 (async/await/Promises).

חוקים מחייבים:
- ניסוח ידני בלבד.
- ID format: mc_l13_<concept>_002 / mc_l15_<concept>_002.
- MC: options[4] + correctIndex + explanation + optionFeedback[4].
- Fill: code + answer + hint + explanation.

צעדים:
1. נתח פערים: node -e "const fs=require('fs');const vm=require('vm');const sb={module:{exports:{}}};sb.window=sb;vm.createContext(sb);vm.runInContext(fs.readFileSync('data/questions_bank.js','utf8'),sb,{filename:'b'});const b=sb.QUESTIONS_BANK;const c={};b.mc.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].mc++}});b.fill.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].fill++}});console.log('Session F gaps:');Object.entries(c).filter(([k])=>k.startsWith('lesson_13::')||k.startsWith('lesson_15::')).map(([k,v])=>({k,gap:Math.max(0,3-v.mc)+Math.max(0,2-v.fill),mc:v.mc,fill:v.fill})).filter(x=>x.gap>0).sort((a,b)=>b.gap-a.gap).slice(0,30).forEach(x=>console.log('  '+x.k+': mc='+x.mc+' fill='+x.fill+' gap='+x.gap));"

2. הוסף 25 MC עם בלוק:
   // ----- SESSION F: lesson_13 + lesson_15 batch -----

3. הוסף 25 Fill עם בלוק:
   // ----- SESSION F FILLS: Objects + Async -----

4. npm test -- --run → 774/774.

5. git add -A && git commit -m "SESSION-F: 25 MC + 25 Fill for Objects + Async"

עצור. אל push.
```

---

## SESSION G — lesson_16 + lesson_18 + lesson_21 (Node + Express + React basics)

```
המשך עבודה על LumenPortal ב-/Users/tal/Desktop/חומרים לשיעור.

צור ענף ועבור אליו:
git checkout -b session-G-node-react

המשימה: כתוב ידנית 25 MC + 25 Fill חדשות ל-lesson_16 (Node.js), lesson_18 (Express forms), lesson_21 (React basics).

חוקים מחייבים:
- ניסוח ידני בלבד.
- ID format: mc_l16_<concept>_002 / mc_l18_<concept>_002 / mc_l21_<concept>_002.
- MC: options[4] + correctIndex + explanation + optionFeedback[4].
- Fill: code + answer + hint + explanation.

צעדים:
1. נתח פערים: node -e "const fs=require('fs');const vm=require('vm');const sb={module:{exports:{}}};sb.window=sb;vm.createContext(sb);vm.runInContext(fs.readFileSync('data/questions_bank.js','utf8'),sb,{filename:'b'});const b=sb.QUESTIONS_BANK;const c={};b.mc.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].mc++}});b.fill.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].fill++}});const targets=['lesson_16::','lesson_18::','lesson_21::'];console.log('Session G gaps:');Object.entries(c).filter(([k])=>targets.some(t=>k.startsWith(t))).map(([k,v])=>({k,gap:Math.max(0,3-v.mc)+Math.max(0,2-v.fill),mc:v.mc,fill:v.fill})).filter(x=>x.gap>0).sort((a,b)=>b.gap-a.gap).slice(0,40).forEach(x=>console.log('  '+x.k+': mc='+x.mc+' fill='+x.fill+' gap='+x.gap));"

2. הוסף 25 MC עם בלוק:
   // ----- SESSION G: lesson_16 + lesson_18 + lesson_21 batch -----

3. הוסף 25 Fill עם בלוק:
   // ----- SESSION G FILLS: Node + Express + React basics -----

4. npm test -- --run → 774/774.

5. git add -A && git commit -m "SESSION-G: 25 MC + 25 Fill for Node + Express + React basics"

עצור. אל push.
```

---

## SESSION H — lesson_23 + lesson_25 + lesson_closures + ai_development

```
המשך עבודה על LumenPortal ב-/Users/tal/Desktop/חומרים לשיעור.

צור ענף ועבור אליו:
git checkout -b session-H-router-tw-closures

המשימה: כתוב ידנית 25 MC + 25 Fill חדשות ל-lesson_23 (Router/Context), lesson_25 (Tailwind), lesson_closures, ai_development.

חוקים מחייבים:
- ניסוח ידני בלבד.
- ID format: mc_l23_<concept>_002 / mc_l25_<concept>_002 / mc_lc_<concept>_002 / mc_aidev_<concept>_002.
- MC: options[4] + correctIndex + explanation + optionFeedback[4].
- Fill: code + answer + hint + explanation.

צעדים:
1. נתח פערים: node -e "const fs=require('fs');const vm=require('vm');const sb={module:{exports:{}}};sb.window=sb;vm.createContext(sb);vm.runInContext(fs.readFileSync('data/questions_bank.js','utf8'),sb,{filename:'b'});const b=sb.QUESTIONS_BANK;const c={};b.mc.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].mc++}});b.fill.forEach(q=>{if(q.conceptKey){c[q.conceptKey]=c[q.conceptKey]||{mc:0,fill:0};c[q.conceptKey].fill++}});const targets=['lesson_23::','lesson_25::','lesson_closures::','ai_development::'];console.log('Session H gaps:');Object.entries(c).filter(([k])=>targets.some(t=>k.startsWith(t))).map(([k,v])=>({k,gap:Math.max(0,3-v.mc)+Math.max(0,2-v.fill),mc:v.mc,fill:v.fill})).filter(x=>x.gap>0).sort((a,b)=>b.gap-a.gap).slice(0,40).forEach(x=>console.log('  '+x.k+': mc='+x.mc+' fill='+x.fill+' gap='+x.gap));"

2. הוסף 25 MC עם בלוק:
   // ----- SESSION H: lesson_23 + lesson_25 + closures + ai_dev batch -----

3. הוסף 25 Fill עם בלוק:
   // ----- SESSION H FILLS: Router + Tailwind + Closures + AI dev -----

4. npm test -- --run → 774/774.

5. git add -A && git commit -m "SESSION-H: 25 MC + 25 Fill for Router + Tailwind + Closures + AI dev"

עצור. אל push.
```

---

## SESSION I — 6-level explanations: lesson_11.js (Arrays/Functions/Scope) [קובץ ייעודי, אפס conflicts]

```
המשך עבודה על LumenPortal ב-/Users/tal/Desktop/חומרים לשיעור.

צור ענף ועבור אליו:
git checkout -b session-I-l11-levels

המשימה: הוסף ידנית שדה `levels` עם 6 רמות (grandma/child/soldier/student/junior/professor) ל-15 מושגים מרכזיים ב-data/lesson_11.js. כל רמה — 2-4 משפטים מדויקים לרמה.

חוקים מחייבים:
- כתיבה ידנית בלבד. אסור להעתיק מ-simpleExplanation.
- כל רמה אמיתית: סבתא = analogy מוחשי, ילד = משחק יומיומי, חייל = הוראה פונקציונלית, סטודנט = מבנה טכני, ג'וניור = wisdom + trade-offs, פרופ׳ = formal CS terminology באנגלית.
- אסור Math.random / Date.now / sk- / api_key.
- ערוך **רק** את data/lesson_11.js — קובץ אחר אסור (אפס conflict עם סשנים אחרים).

צעדים:
1. קרא את data/lesson_11.js כדי לראות את ה-concepts ולבחור 15 (כולל: array, length, index, push, pop, function, parameter, return, scope, block, closure, declaration, expression, arrow, IIFE).

2. ערוך data/lesson_11.js והוסף לכל אחד מ-15 המושגים שדה `levels: { grandma: "...", child: "...", soldier: "...", student: "...", junior: "...", professor: "..." }` ליד simpleExplanation.

3. וודא: node -e "const m=require('./data/lesson_11.js');const c=m.LESSON_11.concepts;const ok=c.filter(x=>x.levels&&x.levels.grandma&&x.levels.child&&x.levels.soldier&&x.levels.student&&x.levels.junior&&x.levels.professor).length;console.log('with levels:',ok+'/'+c.length);"

4. npm test -- --run → 774/774.

5. git add -A && git commit -m "SESSION-I: 6-level explanations for 15 lesson_11 concepts"

עצור. אל push.
```

---

## SESSION J — 6-level explanations: lesson_13.js (Objects/DOM/Classes/Storage) [קובץ ייעודי]

```
המשך עבודה על LumenPortal ב-/Users/tal/Desktop/חומרים לשיעור.

צור ענף ועבור אליו:
git checkout -b session-J-l13-levels

המשימה: הוסף ידנית שדה `levels` עם 6 רמות ל-15 מושגים מרכזיים ב-data/lesson_13.js.

חוקים מחייבים:
- ניסוח ידני, אסור להעתיק מ-simpleExplanation.
- כל רמה 2-4 משפטים, מדויקת לרמה.
- אסור Math.random / Date.now.
- ערוך **רק** את data/lesson_13.js (אפס conflict).

צעדים:
1. קרא data/lesson_13.js — בחר 15 מושגים מרכזיים: object, property, method, this, class, constructor, prototype, inheritance, DOM, querySelector, addEventListener, localStorage, sessionStorage, JSON.parse, JSON.stringify.

2. הוסף שדה `levels: { grandma, child, soldier, student, junior, professor }` לכל אחד.

3. וודא: node -e "const m=require('./data/lesson_13.js');const c=Object.values(m)[0].concepts;const ok=c.filter(x=>x.levels&&x.levels.grandma).length;console.log('with levels:',ok+'/'+c.length);"

4. npm test -- --run → 774/774.

5. git add -A && git commit -m "SESSION-J: 6-level explanations for 15 lesson_13 concepts"

עצור. אל push.
```

---

## אחרי שכל 10 הסשנים סיימו — סשן מאחד (11)

```
המשך עבודה על LumenPortal ב-/Users/tal/Desktop/חומרים לשיעור.

המשימה: למזג את כל 10 הענפים, להריץ tests, ל-bump cache, ול-commit סופי.

צעדים:
1. git checkout main

2. למזג בסדר הזה (8 סשנים תוכן + 2 levels):
   git merge session-A-l19-l17 -m "Merge SESSION-A"
   git merge session-B-dom-state -m "Merge SESSION-B"
   git merge session-C-ts-react -m "Merge SESSION-C"
   git merge session-D-svcollege -m "Merge SESSION-D"
   git merge session-E-arrays -m "Merge SESSION-E"
   git merge session-F-obj-async -m "Merge SESSION-F"
   git merge session-G-node-react -m "Merge SESSION-G"
   git merge session-H-router-tw-closures -m "Merge SESSION-H"
   git merge session-I-l11-levels -m "Merge SESSION-I"
   git merge session-J-l13-levels -m "Merge SESSION-J"

3. אם יש merge conflict ב-data/questions_bank.js — כל בלוק SESSION-X הוא עצמאי; שמור את שניהם לפי הסדר. ה-IDs ייחודיים → אין דריסה.

4. סשנים I+J עורכים lesson_11.js / lesson_13.js — קבצים ייעודיים, אפס conflicts.

5. cache bump v96→v97 ב-7 קבצים:
   - index.html (app.js?v=parallel10-merged-v97)
   - service-worker.js (SHELL_ASSETS)
   - scripts/report_museum_access_smoke.js
   - scripts/report_svcollege_pwa_offline_smoke.js
   - tests/service-worker-cache.test.js
   - tests/svcollege-pwa-offline-smoke.test.js

6. npm run report:source-of-truth:write

7. npm test -- --run → 774/774 (תקן אם נשבר)

8. git add -A && git commit -m "Merge 10 parallel sessions: 200 MC + 200 Fill + 30 6-level explanations"

9. הצג סיכום סופי: סך MC + Fill עכשיו, ומספר מושגים עם 6 רמות.

תבצע ברצף ללא עצירה. אם בדיקה נופלת — תקן ותמשיך.
```

---

## Throughput משוער

| סשן | זמן | תוצר | קובץ |
|-----|-----|------|------|
| A | ~90 דק׳ | 50 שאלות | data/questions_bank.js |
| B | ~90 דק׳ | 50 שאלות | data/questions_bank.js |
| C | ~90 דק׳ | 50 שאלות | data/questions_bank.js |
| D | ~90 דק׳ | 50 שאלות | data/questions_bank.js |
| E | ~90 דק׳ | 50 שאלות | data/questions_bank.js |
| F | ~90 דק׳ | 50 שאלות | data/questions_bank.js |
| G | ~90 דק׳ | 50 שאלות | data/questions_bank.js |
| H | ~90 דק׳ | 50 שאלות | data/questions_bank.js |
| **I** | ~90 דק׳ | 15 × 6 רמות | **data/lesson_11.js** (ייעודי) |
| **J** | ~90 דק׳ | 15 × 6 רמות | **data/lesson_13.js** (ייעודי) |
| 11 (merge) | ~30 דק׳ | merge + verify + cache bump | — |

**סה״כ wall-clock:** ~90+30 = **120 דקות** במקום 10×90 = 900 דקות סדרתיים.

**תוצר משולב:**
- **200 MC + 200 Fill = 400 שאלות חדשות** (1,450 → **1,850**)
- **30 מושגים נוספים עם 6 רמות אמיתיות** (148/568 כיסוי 6-רמות, מ-118)

## הוראת שימוש

1. פתח **10 חלונות Sonnet 4.6** — אחד לכל סשן.
2. הדבק את הפרומפט המתאים לכל חלון (A-J מהקובץ הזה).
3. הפעל את כולם במקביל.
4. כשכולם מסיימים — פתח חלון 11 עם פרומפט המיזוג.

## אסטרטגיית Conflict-avoidance

### A-H (כל אחד עורך data/questions_bank.js):
- ✅ כל סשן יוצר **בלוק section-comment ייחודי** (`// ----- SESSION X: ... -----`).
- ✅ כל ID **ייחודי** עם prefix שונה (`mc_l19_*_002`, `mc_l13_*_002`, וכו׳).
- ⚠️ הסיכון היחיד: 2 סשנים מנסים לערוך את אותה שורה (insertion point). כדי למזער — בקשת המיזוג שומרת את שני הבלוקים בסדר sequential.
- 🔧 פתרון merge conflict: "keep both" — שני הבלוקים נשמרים, IDs ייחודיים → אין דריסה.

### I-J (קבצים נפרדים):
- ✅ Session I עורך **רק** `data/lesson_11.js`.
- ✅ Session J עורך **רק** `data/lesson_13.js`.
- 🟢 **אפס conflicts** — קבצים שונים לחלוטין.

## הרחבות עתידיות אפשריות (K, L, M ...)

ניתן להוסיף עוד סשני 6-levels (כל אחד על קובץ ייעודי, אפס conflicts):
- **K:** lesson_15.js (async/await/Promises) — 15 מושגים × 6 רמות
- **L:** lesson_16.js (Node.js) — 15 מושגים × 6 רמות
- **M:** lesson_17.js (HTTP/Express/REST) — 15 מושגים × 6 רמות
- **N:** lesson_19.js (JS fundamentals) — כבר חלקי, להשלים ל-30
- **O:** lesson_20.js (DOM advanced) — 15 מושגים × 6 רמות
- **P:** lesson_21.js (React) — 15 מושגים × 6 רמות
- **Q:** lesson_22.js (useState) — 15 מושגים × 6 רמות
- **R:** lesson_24.js (useEffect/useMemo) — 15 מושגים × 6 רמות
- **S:** lesson_25.js (Tailwind) — 12 מושגים × 6 רמות
- **T:** lesson_26.js (TypeScript) — 15 מושגים × 6 רמות

**עם 20 סשנים מקבילים:** 400 שאלות + 150 מושגים × 6 רמות, סה״כ ~120 דקות wall-clock.

## אזהרת merge conflicts (חשוב!)

Sessions A-H **כולם עורכים את אותו קובץ** `data/questions_bank.js`. גם עם בלוקים נפרדים — git merge יראה זאת כ"both modified" וצריך resolve ידני.

**3 אפשרויות לטפל בזה:**

1. **גישה מקבילית מלאה (קצת merge work):** הרץ את כל 10 סשנים במקביל. בסשן 11 — פתור conflicts ידני (הם פשוטים: שני בלוקים סמוכים, "keep both").

2. **גישה semi-parallel (פחות merge):** הרץ בקבוצות של 3-4. אחרי כל קבוצה — merge מיד ואז קבוצה הבאה.

3. **גישה safe (no conflicts):** רק I, J, K, L, M ... (כל 6-levels) במקביל — אלו עורכים קבצים נפרדים. ה-questions sessions A-H — sequential. wall-clock ~6 שעות במקום 1.5.

**מומלץ: גישה 1.** Conflict resolution הוא 5-10 דקות לכל מיזוג, וה-throughput ענק.
