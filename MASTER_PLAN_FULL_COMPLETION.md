# Master Plan — השלמה מלאה (0 חוסרים)

> נוצר 2026-05-02. מטרה: כל מושג קשה (difficulty ≥ 4) ימולא בכל 24 החלקים.
> מושגים קלים (difficulty < 4): מקבלים את 8 הליבה, שאר החלקים optional.

## 📊 מצב התחלה

- **26 שיעורים** מ-lesson_11 עד lesson_27 + 10 SVCollege bridges
- **534 מושגים** סה״כ
- **465 מושגים קשים** (difficulty ≥ 4) = 87%
- **69 מושגים קלים** (difficulty < 4)
- **12,816 תאים** סה״כ (24 חלקים × 534 מושגים)
- **4,667 מלאים** (36%)
- **8,149 חסרים** ← העבודה

## ✅ מה כבר מלא (100%)
- 6 רמות (grandma → professor) — לכל המושגים
- codeExample
- codeExplanation

## ❌ מה חסר (לפי חלק)

| חלק | מלא | חסר | % |
|---|---:|---:|---:|
| 🖼️ illustration | 336 | 198 | 63% |
| 🎁 extras | 59 | 475 | 11% |
| 🌍 analogy | 0 | 534 | 0% |
| 🌊 deepDive | 0 | 534 | 0% |
| 📚 extendedExplanation | 0 | 534 | 0% |
| 🧠 mnemonic | 0 | 534 | 0% |
| 🔁 antiPatterns | 0 | 534 | 0% |
| 🐛 bugHunt | 0 | 534 | 0% |
| 📖 warStories | 0 | 534 | 0% |
| ⚖️ comparisons | 0 | 534 | 0% |
| 🎞️ conceptComic | 0 | 534 | 0% |
| 🎥 conceptVideo | 0 | 534 | 0% |
| 🏛️ memoryPalace | 0 | 534 | 0% |
| 🧩 problemFirst | 0 | 534 | 0% |
| 🧯 stageZero | 0 | 534 | 0% |
| 🔮 whatIf | 0 | 534 | 0% |

## 🎯 גישה ממוקדת — מושגים קשים בלבד

**קליל:** מושג קל (difficulty 1-3) מקבל 8 חלקי ליבה + 2 enrichment בסיסיים = "minimal pass".
**קשה:** מושג קשה (difficulty 4+) מקבל את **כל 24 החלקים** ללא שבר.

### חישוב יעד אמיתי
- 465 מושגים קשים × 16 חלקי enrichment חסרים = **7,440 תאים ידניים**
- 69 מושגים קלים × 2 חלקי בסיס = **138 תאים ידניים**
- **סה״כ יעד: ~7,580 תאים ידניים** (~150-220 שעות עבודה ידנית, 20-30 סשנים)

---

## 📋 לוח משימות — סדר ביצוע

### Phase 1: lesson_11 (28 מושגים, 14 קשים)
**יעד:** 14 × 16 = 224 תאים enrichment + 14 × 2 לקלים = 28 → **252 פריטים**

מושגים קשים ב-lesson_11 (לפי difficulty):
- [ ] By Reference (7) — 16 חלקים
- [ ] reduce (6) — 16 חלקים
- [ ] By Value (6) — 16 חלקים
- [ ] Pointer (6) — 16 חלקים
- [ ] object (5) — 16 חלקים
- [ ] scope (5) — 16 חלקים
- [ ] arrow function (5) — 16 חלקים
- [ ] spread (5) — 16 חלקים
- [ ] function (4) — 16 חלקים
- [ ] filter (4) — 16 חלקים
- [ ] map (4) — 16 חלקים
- [ ] find (4) — 16 חלקים
- [ ] sort (4) — 16 חלקים
- [ ] toString (4) — 16 חלקים

מושגים קלים (8 חלקי ליבה כבר מלאים, אין צורך בהוספה):
- Array, Index, undefined, boolean, number, string, let, var, forEach, push, pop, shift, unshift, splice (14 מושגים)

### Phase 2: lesson_15 (18 מושגים, 18 קשים — closures + async)
**יעד:** 18 × 16 = 288 פריטים

### Phase 3: lesson_closures (8 מושגים, 8 קשים)
**יעד:** 8 × 16 = 128 פריטים

### Phase 4: lesson_19 (50 מושגים, 45 קשים)
**יעד:** 45 × 16 = 720 פריטים

### Phase 5-26: שאר השיעורים
לפי סדר difficulty * concept-count

---

## ⚙️ אסטרטגיה — איך נכתוב

### לכל מושג קשה אכתוב במכה אחת את 16 הchunks:

```js
// 1. analogy: { hebrew: "...", concrete: "..." }
analogy: { hebrew: "כמו XXX בחיים", concrete: "דוגמה ספציפית" },

// 2. deepDive: { purpose, problem, withoutIt, useWhen }
deepDive: {
  purpose: "למה הוא קיים — הצורך הטכני",
  problem: "הבעיה שהוא פותר",
  withoutIt: "מה היה בלעדיו",
  useWhen: "מתי משתמשים בפועל",
},

// 3. extendedExplanation: { intro, mechanics, edge_cases, performance }
extendedExplanation: {
  intro: "...", mechanics: "...", edgeCases: "...", performance: "...",
},

// 4. extras: [ {title, body}, ... ]  // analogies, anecdotes
extras: [
  { title: "אנלוגיה", body: "..." },
  { title: "טיפ", body: "..." },
],

// 5. mnemonic: { phrase, decoded }
mnemonic: { phrase: "...", decoded: "..." },

// 6. antiPatterns: [ {bad, good, reason}, ... ]
antiPatterns: [
  { bad: "...", good: "...", reason: "..." },
],

// 7. bugHunt: { code, bug, fix }
bugHunt: { code: "...", bug: "...", fix: "..." },

// 8. warStories: [ "סיפור 1...", "סיפור 2..." ]
warStories: [ "...", "..." ],

// 9. comparisons: [ {topic, vs, when_a, when_b}, ... ]
comparisons: [ { topic: "...", vs: "...", when_a: "...", when_b: "..." } ],

// 10. conceptComic: { panels: [{frame, caption}, ...] }
conceptComic: { panels: [
  { frame: "...", caption: "..." },
] },

// 11. conceptVideo: { script, duration_sec }
conceptVideo: { script: "...", durationSec: 60 },

// 12. memoryPalace: { rooms: [{room, image, anchor}, ...] }
memoryPalace: { rooms: [
  { room: "מטבח", image: "...", anchor: "..." },
] },

// 13. problemFirst: { problem, naive_solution, refined }
problemFirst: { problem: "...", naive: "...", refined: "..." },

// 14. stageZero: { broken_code, what_breaks, fixed_code }
stageZero: { broken: "...", whatBreaks: "...", fixed: "..." },

// 15. whatIf: { scenario, change, outcome }
whatIf: { scenario: "...", change: "...", outcome: "..." },

// 16. illustration (אם חסר): "..."
```

---

## 📊 קצב משוער (אמת)

- מושג קשה אחד = 16 פריטים מלאים = ~10-15 דקות עבודה ידנית מרוכזת
- 50 מושגים קשים בסשן = 8-12 שעות
- **לסיים את כל 465 הקשים: ~8-10 סשנים** (אם רצים מקסימלית)

---

## 🚦 חוקי איכות

1. כל פריט הוא **טקסט אמיתי בעברית** (לא TODO).
2. קוד דוגמה רץ — אסור syntax error.
3. אסור Math.random / Date.now / sk- / api_key (מפיל בדיקות).
4. אחרי כל מושג: הרץ `node scripts/audit_lesson_completion.js` לוודא הציון עולה.
5. אחרי כל 5 מושגים: `npm test -- --run` להבטיח 781/781.
6. **אסור שבר אחד** — אם התחלת מושג, סיים את כל 16 החלקים.

---

## 🎬 התחלה — מושג ראשון: lesson_11 → By Reference (difficulty 7)

זהו המושג הקשה ביותר ב-lesson_11. נכתוב לו ידנית את כל 16 החלקים החסרים, ונראה דוגמה מלאה למבנה הסופי. אז נמשיך ל-reduce (6), By Value (6), וכו׳.
