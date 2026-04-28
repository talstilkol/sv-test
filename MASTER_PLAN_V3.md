# LumenPortal — Master Plan V3
## הדרך מ-MVP → "פורטל ההדרכה הטוב בעולם"

תאריך: 2026-04-26 · גרסה: 3.0 · סטטוס: טיוטה לאישור

> **מסמך Legacy:** ה-Master Plan הקנוני עודכן ב-2026-04-28 בתוך [SPEC_AND_MASTER_PLAN.md](SPEC_AND_MASTER_PLAN.md), כולל Re-baseline, Phase 5 Quality Governance, Phase 6 Learning Evidence + Productization, Phase 7 Learning OS + Outcome Scale, DoD קשיח, KPIs, ו-roadmap קדימה. אין להשתמש במסמך זה כמקור סטטוס עדכני.
>
> **PRD ו-spec מלאים:** ראה [PRODUCT_SPEC.md](PRODUCT_SPEC.md)
> **ניתוח תחרותי:** ראה [COMPETITIVE_ANALYSIS.md](COMPETITIVE_ANALYSIS.md)

---

## עדכון Legacy — מוזיאון היסטורי לשפות התכנות

הפרק הקנוני נמצא כעת ב-[SPEC_AND_MASTER_PLAN.md §20](SPEC_AND_MASTER_PLAN.md#20-נספח-מוזיאון-היסטורי-לשפות-התכנות).

החלטת מוצר: להוסיף מסלול היסטורי שמחבר חשמל → ביטים → קוד מכונה → Assembly → שפות גבוהות → C/Java/Python/JavaScript → React/Node/Next. המטרה אינה ללמד עוד שפה, אלא לתת לתלמיד מפת עומק שמסבירה למה שפות נולדו, מה הן מסתירות, ומה המחיר/יתרון שלהן.

DoD ל-MVP: 9 אולמות, 25+ מוצגים, 5 שושלות רעיונות, תפריט צד ענפי, ו-backlog להרחבות compiler/JIT/source cards.

---

## עקרון מנחה

**אנחנו לא בונים פיצ'רים — אנחנו בונים תוצאות.**

כל phase מקודם רק כשהמדדים שלו עומדים ביעד. לא דוחפים את הבא לפני שהקודם מצוין.

---

## גרסאות יעד (Milestones)

| גרסה | יעד מוצרי | יעד עסקי | זמן צפוי |
|:-:|---|---|:-:|
| **v1.0 — Solid** | מוצר עם code execution + mock exams + SRS | 50 משתמשים פעילים | 6 שבועות |
| **v2.0 — Smart** | AI Tutor + Prerequisite Graph + Mobile PWA | 500 משתמשים, ה-100 הראשון משלם | 12 שבועות |
| **v3.0 — Social** | Community + Teacher dashboard + classroom | 2,000 משתמשים, 100 משלמים | 24 שבועות |
| **v4.0 — World-class** | 25+ שיעורים, 5,000+ שאלות curated, mobile native | 10,000 משתמשים, 500 משלמים | 12 חודשים |

---

# Phase 1 — Solid Foundation (שבועות 1-6)

**מטרה:** סגירת ה-gaps הקריטיים שמונעים ציון 100 במבחן + תיקון 79 boilerplate concepts הנותרים.

## 1.1 — שבוע 1-2: Code Execution + Trace + Bug-hunt

### Tasks
- [ ] **C1.1** Embed Sandpack (CodeSandbox technology) — sandbox runtime לקוד JS/React.
  - ספרייה: `@codesandbox/sandpack-react`
  - הטמעה: רכיב חדש `<LiveEditor template="react" />` ב-app.js
  - תמיכה ב-controlled mode (שינוי קוד = בדיקה אוטומטית)
- [ ] **C1.2** Code Trace question type — schema + UI + 35 questions ראשונים.
  - מבנה ב-questions_bank.js: `trace[]` (ראה [PRODUCT_SPEC.md §4.2](PRODUCT_SPEC.md))
  - UI: קוד עם line highlighting, progress bar, שדה קלט, hint button
  - 5 traces לכל שיעור React (21-27) = 35 questions
- [ ] **C1.3** Bug Hunt question type — 28 questions (4/lesson).
  - UI: code עם line numbers clickable, wrap בminus/plus zoom
  - Validation: comparison של ה-fix של המשתמש מול expected
- [ ] **C1.4** Mini Build with auto-tests.
  - Sandpack runs the code, captures output.
  - Tests: regex על הקוד + execution-based (expected output match).
  - 3 builds לשיעור = 21 questions.

### Deliverable
תלמיד יכול: לראות קוד, להריץ אותו, לחזות פלט, למצוא באג, לכתוב פתרון משלו.

### Success metric
85%+ מהמשתמשים שניסו תרגיל-קוד מלא הצליחו ב-3 ניסיונות.

---

## 1.2 — שבוע 3: Mock Exam Mode

### Tasks
- [ ] **M2.1** Tab חדש "🎯 מבחן מדומה".
- [ ] **M2.2** Exam composer: בוחר 30 שאלות ב-deterministic mix.
  - 12 MC (רמות 4-6) + 8 Fill + 6 Trace + 3 Bug + 1 Build
  - מ-lessons 21-27 בלבד (focus React)
- [ ] **M2.3** Timer (45 דקות), no-feedback during exam, lock-down (no concept hints).
- [ ] **M2.4** Result screen: ציון, רשימת שגיאות עם הסבר מלא, מושגים חלשים.
- [ ] **M2.5** History — שמירת כל mock exam עם תאריך, ציון, ניתוח.

### Deliverable
משתמש יכול לקחת mock exam מלא, לראות את התוצאה, ולקבל המלצות שיפור.

### Success metric
תלמיד שעבר 3 mock exams ב-85%+ — סבירות גבוהה לעבור את המבחן האמיתי.

---

## 1.3 — שבוע 4: Per-Distractor Feedback

### Tasks
- [ ] **F3.1** Schema: הוסף `optionFeedback: string[4]` ו-`commonMistake: string` ל-MC.
- [ ] **F3.2** UI: ב-`buildAnswerFeedback`, הצג:
  - אם נכון: feedback של הנכונה + commonMistake.
  - אם שגוי: feedback של הבחירה + feedback של הנכונה + commonMistake.
- [ ] **F3.3** **תוכן** — script שמטריג Claude API לכל 1,316 MC:
  - prompt: "לכל אופציה, הסבר במשפט אחד למה היא נראית סבירה ולמה היא שגויה."
  - שמירת תוצאות ב-`questions_bank.js` עם `_aiAugmented: true`.
  - Batch של 50 שאלות בכל קריאה (חוסך עלויות).
- [ ] **F3.4** Manual review של 10% מהאוגמנטציות (130 שאלות).

### Deliverable
כל MC questions בעלי feedback מלא לכל אופציה.

### Success metric
זמן ממוצע של תלמיד על feedback (אחרי תשובה שגויה) ≥ 30 שניות (קריאה אמיתית).

---

## 1.4 — שבוע 5: SRS (Spaced Repetition Algorithm)

### Tasks
- [ ] **S4.1** Schema: הוסף `srsState: { ease, interval, repetitions, due, lastSeen }` ל-scores.
- [ ] **S4.2** Implement FSRS-4 (Anki החדש) או SM-2 (פשוט יותר):
  - אחרי תשובה: עדכן interval לפי correct/wrong + difficulty.
  - אם נכון: `interval *= ease` (min 1d, max 60d).
  - אם שגוי: reset.
- [ ] **S4.3** Trainer pickConcept: עדיפות למושגים `due <= now`.
- [ ] **S4.4** UI: badge "🔁 חזרה מומלצת" על מושגים due.

### Deliverable
תלמיד שמשתמש 7 ימים — מושגים שלא ראה 5 ימים מופיעים שוב באופן חכם.

### Success metric
Long-term retention (concept mastered, אז שאלה אחרי שבועיים) ≥ 75%.

---

## 1.5 — שבוע 6: Final Content Cleanup + 79 Boilerplate

### Tasks
- [ ] **B5.1** lesson_26 (TypeScript, 30 concepts) — full rewrite.
- [ ] **B5.2** lesson_27 (Budget Manager, 20 concepts) — full rewrite.
- [ ] **B5.3** ai_development.js (12 concepts) — basic rewrite (פחות קריטי).
- [ ] **B5.4** workbook_taskmanager.js (12 concepts) — basic rewrite.
- [ ] **B5.5** react_blueprint.js (10 concepts) — basic rewrite.
- [ ] **B5.6** Run validate_bank.js → 0 boilerplate.

### Deliverable
0 boilerplate. כל המושגים עם תוכן אמיתי.

### Success metric
`node scripts/validate_bank.js` → "✅ No boilerplate detected."

---

# Phase 2 — Smart (שבועות 7-12)

**מטרה:** הפיכת LumenPortal ממוצר טוב למוצר חכם — AI, prerequisites, mobile.

## 2.1 — שבוע 7-8: AI Tutor

### Tasks
- [ ] **A1.1** Backend: Edge function ב-Supabase שקוראת ל-Claude API.
- [ ] **A1.2** Auth: anonymous user_id (uuid) ב-localStorage עד שיש login.
- [ ] **A1.3** Rate limit: 5 שאלות/יום למשתמש לא רשום, 100 ל-Pro.
- [ ] **A1.4** UI: כפתור "💬 שאל" ליד כל מושג. Modal עם chat.
- [ ] **A1.5** Context injection: prompt כולל את concept name + level + question text.
- [ ] **A1.6** Streaming response (UX מצוין).
- [ ] **A1.7** **Coach mode** — AI לא נותן את התשובה ישירות. שואל שאלה מנחה.
- [ ] **A1.8** Code review mode — תלמיד שולח את הפתרון, AI מציע שיפורים (לא עורך).

### Deliverable
תלמיד יכול לשאול AI על כל מושג ולקבל הסבר בעברית, מותאם רמתו.

### Success metric
30%+ מהמשתמשים פעילים השתמשו ב-AI לפחות פעם אחת.

---

## 2.2 — שבוע 9: Prerequisite Graph

### Tasks
- [ ] **P2.1** הגדר prerequisite chain בכל מושג: `prerequisites: ['lesson_22::useState']`.
  - פתח כל המושגים בעץ דרישות (בחומר ישנו, לא הוסיף).
  - מומלץ: יום אחד עם expert (אני) על כל ה-concept_enrichment.
- [ ] **P2.2** UI: בכניסה למושג שלא בשליטה (prerequisite ברמה ≤ 3) — אזהרה ידידותית.
- [ ] **P2.3** Knowledge Map: צבע אדום על concepts שהמשתמש דילג עליהם.
- [ ] **P2.4** Suggested next: אחרי mastery של מושג — הצעה למה ללמוד הבא.

### Deliverable
תלמיד מקבל מסלול מומלץ לפי מה שכבר שלט.

### Success metric
80%+ מהתלמידים שעקבו אחרי "Suggested next" — שלטו בחומר תוך 7 ימים.

---

## 2.3 — שבוע 10: Cross-device Sync (Supabase)

### Tasks
- [ ] **D3.1** Supabase setup: project, tables, RLS policies.
- [ ] **D3.2** Tables: `users`, `progress` (user_id, scores_json, updated_at), `attempts` (audit log).
- [ ] **D3.3** Auth: magic link + Google OAuth.
- [ ] **D3.4** Sync: localStorage → Supabase כל 30 שניות + on visibilityChange.
- [ ] **D3.5** Pull: בעת login, merge בין localStorage (אם קיים) ל-DB. last-write-wins על concept-level.
- [ ] **D3.6** UI: "🔄 סינכרון" indicator + last-synced time.

### Deliverable
תלמיד פותח מטלפון בבוקר → מחשב בערב → אותו state.

### Success metric
0 דיווחי "איבדתי את ההתקדמות שלי".

---

## 2.4 — שבוע 11: Mobile PWA

### Tasks
- [ ] **M4.1** manifest.json עם icons, theme colors, RTL.
- [ ] **M4.2** Service worker (Vite plugin: vite-plugin-pwa).
- [ ] **M4.3** Cache strategy: shell + lessons offline.
- [ ] **M4.4** Mobile UX audit:
  - Concept menu קומפקטי במסך קטן.
  - Trainer UI ידידותי לטאצ'.
  - Code editor — Sandpack עובד מובייל אבל בודק.
- [ ] **M4.5** Install prompt: "📱 התקן את LumenPortal".
- [ ] **M4.6** Push notifications (אופציונלי ל-streaks).

### Deliverable
PWA installable במובייל, עובד אופליין, חוויית טאצ' טובה.

### Success metric
20%+ מהמשתמשים מותקנים את ה-PWA. 30% מהשימוש = mobile.

---

## 2.5 — שבוע 12: Streaks + Daily Quest

### Tasks
- [ ] **G5.1** Schema: `streaks: { current, longest, lastActiveDate, freezes }`.
- [ ] **G5.2** UI: 🔥 widget בכותרת. modal celebratory לכל מילסטון (3, 7, 14, 30 ימים).
- [ ] **G5.3** Streak freeze: 1 חיסכון/חודש לתלמיד Pro.
- [ ] **G5.4** Daily Quest: "5 שאלות על useEffect" — נבחר אוטומטית לפי החולשות.
- [ ] **G5.5** Achievement system: 30 הישגים ראשונים.
- [ ] **G5.6** XP + global level (מעבר לרמות-מושג).

### Deliverable
משתמש פעיל יומית רואה streak, daily quest, achievements.

### Success metric
50%+ מ-DAU עם streak של 3+ ימים.

---

# Phase 3 — Social (שבועות 13-24)

**מטרה:** הפיכת LumenPortal לפלטפורמה — קהילה, מורים, צוותים.

## 3.1 — שבוע 13-15: Community Layer

- [ ] Discussion threads per concept.
- [ ] Upvote/downvote.
- [ ] Reputation system.
- [ ] Reporting + moderation tools.

## 3.2 — שבוע 16-18: Peer Code Review

- [ ] תלמיד שולח פתרון.
- [ ] System matching: peer ברמה דומה, רואה רק 1 פתרון.
- [ ] Review template: 3-4 שאלות ספציפיות.
- [ ] Reviewer XP, reviewee feedback.

## 3.3 — שבוע 19-21: Teacher Dashboard

- [ ] Class creation: מורה יוצר class, מקבל invite link.
- [ ] Student view: רשימת תלמידים + אחוזי שליטה.
- [ ] Concept heatmap.
- [ ] Risk alerts.
- [ ] Assignment system: שלח תרגיל לכיתה, ראה מי הגיש.

## 3.4 — שבוע 22-24: Mentor Matching

- [ ] תלמידים "מאסטר" (level 7 ב-30+ מושגים) זכאים להיות mentors.
- [ ] תלמיד מבקש עזרה — match אוטומטי.
- [ ] Async chat (Supabase realtime).
- [ ] Reputation, rating, ban system.

---

# Phase 4 — World-class (חודשים 7-12)

**מטרה:** להגיע ל-coverage מלא + מובייל native + scale.

## 4.1 — תוכן (חודשים 7-9)

- [ ] **17 → 25 שיעורים**: TypeScript מתקדם, Next.js, Testing, GraphQL, State Management (Zustand/Redux Toolkit), Animation (Framer Motion), Forms (react-hook-form + zod), API patterns.
- [ ] **3,000+ שאלות curated** (מ-117 כיום).
- [ ] **50+ project briefs** עם תוצאה מצופה.
- [ ] **20+ mock exams** מותאמים ל-קורסים שונים.

## 4.2 — Mobile Native (חודש 10-11)

- [ ] React Native rewrite (משותף עם web ל-99%).
- [ ] iOS + Android.
- [ ] iCloud / Google Drive backup.
- [ ] Push notifications מתקדמים.

## 4.3 — Scale & Performance (חודש 12)

- [ ] Edge caching של conent.
- [ ] Lazy load של lessons (כיום הכל JS).
- [ ] Database optimization.
- [ ] WebSocket → realtime updates.

---

## תכנית פיתוח שבועית (עכשיו)

| שבוע | משימה | סטטוס |
|:-:|---|:-:|
| השבוע (W0) | סיום lesson 26+27 + ai_development boilerplate | בעבודה |
| W1-2 | Sandpack + Code Trace + Bug Hunt + Mini Build | מתוכנן |
| W3 | Mock Exam | מתוכנן |
| W4 | Per-distractor feedback (LLM-augmented) | מתוכנן |
| W5 | SRS algorithm | מתוכנן |
| W6 | Polish phase 1 | מתוכנן |

---

## תקציב משאבים

### זמן (מפתח יחיד)
- Phase 1: 6 שבועות × 30 שעות = 180 שעות.
- Phase 2: 6 שבועות × 30 שעות = 180 שעות.
- Phase 3: 12 שבועות × 25 שעות = 300 שעות.
- Phase 4: 24 שבועות × 25 שעות = 600 שעות.
- **סה"כ:** ~1,260 שעות = 9-12 חודשים full-time.

### עלויות (חודשיות)
- Vercel: $0 (free tier מספיק עד 500 משתמשים)
- Supabase: $0 → $25/חודש (אחרי free tier)
- Claude API: $50-200/חודש (תלוי בשימוש; cache helps)
- PostHog: $0 (free 1M events)
- **סה"כ:** $0 ל-MVP, $50-200/חודש ל-active phase, $500+ ב-scale.

### תוכן
- **Curated questions:** 3,000 × 5 דקות = 250 שעות. Fast-track עם Claude (חצי שעה לכל 50 questions, אז 30 שעות + עריכה).
- **Lessons content:** ~150 שעות לסיום 25 lessons.
- **Mock exams:** 20 × 2 שעות = 40 שעות.

---

## איך לזהות שאנחנו מצליחים

### סיגנל מצוין
- תלמיד אחד אמר "זה הציל אותי במבחן".
- 5+ posts ב-r/Israel או linkedin Israel על LumenPortal.
- Bootcamp אחד שילב אותנו רשמית.
- מצטיין מנכ"ל svcollege/john-bryce שותף ב-feedback.

### סיגנל מדאיג
- Churn > 10%/חודש.
- D1 retention < 40%.
- אף תלמיד לא חוזר אחרי mock exam ראשון.

### Pivot triggers
- אם 6 חודשים אין מספר משלמים גדל → re-evaluation של מודל.
- אם מתחרה ישראלי גדול נכנס → focus על niche (TypeScript, Backend, או niche אחר).
- אם תלמידים לא משתמשים ב-AI → להוריד את ה-investment שם.

---

## הערה אחרונה — איך להישאר ממוקדים

**זה ROADMAP לא מחויבות.** עדיף לעצור phase 1 באמצע, לראות שהוא מצוין, ואז להמשיך, מאשר לסיים את כל ה-12 שבועות עם 70% איכות.

**הכלל הזהב:** פיצ'ר נחשב "סוגר" רק כשתלמיד אמיתי השתמש בו ולא דיווח על באג, *ובאותה הזדמנות* — חזר.

ב-LumenPortal לעולם נעדיף:
- 6 שיעורים מצוינים על 17 בינוניים.
- Code Trace שעובד ב-100% על 5 פיצ'רים שעובדים ב-70%.
- 50 משתמשים שאוהבים אותנו על 5,000 שלא חוזרים.

**זה הסטנדרט של "world's best".**
