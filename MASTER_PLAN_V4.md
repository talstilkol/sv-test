# LumenPortal — Master Plan V4

> "מסלול 12 חודשים מ-MVP טוב לפורטל הטוב בעולם בעברית — וצוקר שני בעולם באנגלית."

תאריך: 2026-04-27 · גרסה: 4.0 · מחליף את MASTER_PLAN_V3.md
שינויים מ-V3: תוספת Phase 0 (Tech Debt), פירוט מלא של 12 שבועות + שנה 2, KPI מספריים, שינוי סדר עדיפויות.

> **PRD מלא:** ראה [PRODUCT_SPEC_V2.md](PRODUCT_SPEC_V2.md)
> **Scorecard:** ראה [PORTAL_SCORECARD_V2.md](PORTAL_SCORECARD_V2.md)
> **תחרות:** ראה [COMPETITIVE_ANALYSIS.md](COMPETITIVE_ANALYSIS.md)

---

## 🎯 העיקרון המנחה

**אנחנו לא בונים פיצ'רים — אנחנו בונים תוצאות.**
כל phase מקודם רק כשהמדדים שלו עומדים ביעד. לא דוחפים את הבא לפני שהקודם מצוין.

---

## 🗓 גרסאות יעד

| גרסה | יעד מוצרי | יעד עסקי | זמן צפוי | Phases |
|:-:|---|---|:-:|:-:|
| **v0.9 — Stable** | תיקון Tech Debt + 0 boilerplate | 0 (מוצר עובד) | 2 שבועות | 0 |
| **v1.0 — Solid** | Code Execution + Mock Exam + SRS | 50 משתמשים פעילים | 6 שבועות | 1 |
| **v2.0 — Smart** | AI Tutor + Prerequisite Graph + PWA | 500 משתמשים, 100 משלמים | 12 שבועות | 2 |
| **v3.0 — Social** | Community + Teacher dashboard + Mentor | 2,000 משתמשים, 100 משלמים | 24 שבועות | 3 |
| **v4.0 — World-class** | 25+ שיעורים, native mobile, 10K MAU | 10,000 משתמשים, 500 משלמים | 12 חודשים | 4 |

---

# Phase 0 — Tech Debt Sprint (שבועיים)

**מטרה:** תיקון יסודות לפני בנייה נוספת. זה ה-pre-condition לכל ה-phases שיבואו.

## 0.1 — שבוע 1: תוכן ובסיס

### Tasks
- [ ] **D0.1** הוסף `difficulty: 1-10` ל-281 מושגים חסרים
  - אוטומציה: סקריפט שמייצר על בסיס conceptName + level distribution
  - Manual review: 50 דגימות (10% לשפר)
- [ ] **D0.2** החלף 34 boilerplate concepts:
  - ai_development.js (12 concepts)
  - react_blueprint.js (10 concepts)
  - workbook_taskmanager.js (12 concepts)
  - Reference: lesson22.js כדוגמה
- [ ] **D0.3** הוסף GitHub Actions:
  - validate_bank.js בכל PR
  - node --check על כל קבצי data/
  - חוסם merge אם נכשל
- [ ] **D0.4** הוסף Sentry (15 דק) + PostHog (15 דק) — דרך CDN
- [ ] **D0.5** Run validate_bank.js → "✅ 0 boilerplate, 0 missing difficulty"

### Success Metric
- `node scripts/validate_bank.js` → "✅ No errors, 0 boilerplate, 0 missing difficulty."
- כל PR עובר CI אוטומטית

## 0.2 — שבוע 2: ארכיטקטורה

### Tasks
- [ ] **A0.1** State Manager class (modules/state.ts) — מרכז את: scores, proficiency, cb_state, trace_state
  - API: `state.set(path, value)`, `state.get(path)`, `state.subscribe(path, cb)`
  - Auto-save ל-localStorage עם debounce 2s
  - Validation על JSON.parse (shape check)
- [ ] **A0.2** העבר 5 globals מ-app.js ל-State Manager (POC)
  - scores, proficiency, cbState, traceState, trainerStats
- [ ] **A0.3** הוסף Vite + TypeScript (התחלתי)
  - vite.config.ts עם code splitting
  - tsconfig.json עם strict: true
  - app.js → app.ts (initial pass)
- [ ] **A0.4** Lazy-load `questions_bank_seeded.js` (1.4MB)
  - רק כשנכנסים ל-Trainer או Mock Exam
  - Loading indicator

### Success Metric
- `npm run build` יוצר bundle < 500KB
- `npm run dev` עם HMR
- 5 globals עוברים דרך State Manager
- Lighthouse Performance > 75

---

# Phase 1 — Solid Foundation (שבועות 3-8)

**מטרה:** סגירת ה-gaps הקריטיים שמונעים ציון 100 במבחן.

## 1.1 — שבוע 3-4: Code Execution + Trace + Bug-hunt + Mini Build (מקבילי)

### 4 Sessions במקביל:

#### Session A: C1.1 + C1.4 — Sandpack + Mini Build
- [ ] **C1.1** Embed Sandpack (`@codesandbox/sandpack-react`)
  - `<LiveEditor template="react" />` ב-app.js
  - Controlled mode (שינוי קוד = בדיקה אוטומטית)
- [ ] **C1.4** Mini Build with auto-tests
  - Sandpack runs the code, captures output
  - Tests: regex על הקוד + execution-based (expected output match)
  - 3 builds לשיעור = 21 questions

#### Session B: ✅ C1.2 — Code Trace (הושלם!)
- [x] schema + UI + 35 questions

#### Session C: C1.3 — Bug Hunt
- [ ] UI: code עם line numbers clickable
- [ ] Validation: comparison של ה-fix של המשתמש מול expected
- [ ] 28 questions (4/lesson)

#### Session D: D1.1 — Concept Link (קישור בין מושגים)
- [ ] שאלה שמשלבת 2-3 מושגים (e.g. "מה ההבדל בין useState ל-useReducer?")
- [ ] 200 questions

### Deliverable Phase 1.1
תלמיד יכול: לראות קוד, להריץ אותו, לחזות פלט (✅), למצוא באג, לכתוב פתרון משלו.

### Success Metric
85%+ מהמשתמשים שניסו תרגיל-קוד מלא הצליחו ב-3 ניסיונות.

## 1.2 — שבוע 5: Mock Exam Mode

### Tasks
- [ ] **M2.1** Tab חדש "🎯 מבחן מדומה"
- [ ] **M2.2** Exam composer: 30 שאלות ב-deterministic mix
  - 12 MC (רמות 4-6) + 8 Fill + 6 Trace + 3 Bug + 1 Build
  - מ-lessons 21-27 בלבד (focus React)
- [ ] **M2.3** Timer (45 דקות), no-feedback during exam, lock-down
- [ ] **M2.4** Result screen: ציון, רשימת שגיאות, מושגים חלשים, המלצה
- [ ] **M2.5** History — שמירת כל mock exam

### Deliverable
משתמש יכול לקחת mock exam מלא, לראות תוצאה, לקבל המלצות שיפור.

### Success Metric
תלמיד שעבר 3 mock exams ב-85%+ → סבירות גבוהה (>80%) לעבור את המבחן האמיתי.

## 1.3 — שבוע 6: Per-Distractor Feedback

### Tasks
- [ ] **F3.1** Schema: הוסף `optionFeedback: string[4]` ו-`commonMistake` ל-MC
- [ ] **F3.2** UI: ב-`buildAnswerFeedback`:
  - אם נכון: feedback של הנכונה + commonMistake
  - אם שגוי: feedback של הבחירה + feedback של הנכונה + commonMistake
- [ ] **F3.3** **תוכן** — script שמטריג Claude API לכל 1316 MC
  - prompt: "לכל אופציה — משפט אחד למה היא נראית סבירה ולמה היא שגויה"
  - שמירת תוצאות ב-`questions_bank.js` עם `_aiAugmented: true`
  - Batch של 50 שאלות בקריאה (חוסך עלויות)
  - עלות: ~$5-10 לכל הבנק
- [ ] **F3.4** Manual review של 10% (130 שאלות)

### Success Metric
זמן ממוצע על feedback (אחרי תשובה שגויה) ≥ 30 שניות = קריאה אמיתית.

## 1.4 — שבוע 7: SRS (Spaced Repetition)

### Tasks
- [ ] **S4.1** Schema: `srsState: { ease, interval, repetitions, due, lastSeen }`
- [ ] **S4.2** Implement FSRS-4:
  - אחרי תשובה: עדכן interval לפי correct/wrong + difficulty
  - נכון: `interval *= ease` (min 1d, max 60d)
  - שגוי: reset interval ל-1d
- [ ] **S4.3** Trainer pickConcept: עדיפות ל-`due <= now`
- [ ] **S4.4** UI: badge "🔁 חזרה מומלצת" על מושגים due

### Success Metric
Long-term retention ≥ 75% (concept mastered, שאלה אחרי שבועיים)

## 1.5 — שבוע 8: Polish + Tests

### Tasks
- [ ] Visual polish לכל הטאבים החדשים (Sandpack, BugHunt, Build, Mock)
- [ ] Mobile UX audit לפיצ'רים החדשים
- [ ] Add Jest + Vitest setup, 30 tests עיקריים (state, applyAnswer, validate_bank)
- [ ] E2E test ב-Playwright: 1 שיעור full → 1 mock exam

### Success Metric
- Lighthouse 80+ ב-4 קטגוריות
- 30 tests passing
- 1 E2E flow passing

---

# Phase 2 — Smart (שבועות 9-14)

**מטרה:** הפיכת LumenPortal ממוצר טוב למוצר חכם.

## 2.1 — שבוע 9-10: AI Tutor

### Tasks
- [ ] **A1.1** Backend: Edge function ב-Supabase שקוראת ל-Claude API
- [ ] **A1.2** Auth: anonymous user_id (uuid) ב-localStorage עד login
- [ ] **A1.3** Rate limit: 5/day anonymous, 100/day Pro
- [ ] **A1.4** UI: כפתור "💬 שאל" ליד כל מושג + Modal עם chat
- [ ] **A1.5** Context injection: prompt כולל concept name + level + question text
- [ ] **A1.6** Streaming response (UX מצוין)
- [ ] **A1.7** **Coach mode** — AI שואל שאלה מנחה במקום לתת תשובה
- [ ] **A1.8** Code review mode — AI מציע שיפורים (לא עורך)

### Success Metric
30%+ מהמשתמשים פעילים השתמשו ב-AI לפחות פעם אחת.

## 2.2 — שבוע 11: Prerequisite Graph

### Tasks
- [ ] **P2.1** הגדר prerequisite chain בכל מושג
  - יום אחד עם expert על כל ה-concept_enrichment
- [ ] **P2.2** UI: בכניסה למושג שה-prerequisite ברמה ≤ 3 — אזהרה
- [ ] **P2.3** Knowledge Map: אדום על concepts שדולגו עליהם
- [ ] **P2.4** Suggested next: אחרי mastery → הצעה למה ללמוד הבא

### Success Metric
80%+ מהתלמידים שעקבו אחרי "Suggested next" — שלטו תוך 7 ימים.

## 2.3 — שבוע 12: Cross-device Sync (Supabase)

### Tasks
- [ ] **D3.1** Supabase setup: project, tables, RLS policies
- [ ] **D3.2** Tables: users, progress, attempts, mock_exams
- [ ] **D3.3** Auth: magic link + Google OAuth
- [ ] **D3.4** Sync: localStorage → Supabase כל 30s + on visibilityChange
- [ ] **D3.5** Pull on login: merge בין localStorage (אם קיים) ל-DB. last-write-wins
- [ ] **D3.6** UI: "🔄 סינכרון" indicator + last-synced time

### Success Metric
0 דיווחי "איבדתי את ההתקדמות שלי".

## 2.4 — שבוע 13: Mobile PWA

### Tasks
- [ ] **M4.1** manifest.json עם icons, theme colors, RTL
- [ ] **M4.2** Service worker (vite-plugin-pwa)
- [ ] **M4.3** Cache strategy: shell + lessons offline
- [ ] **M4.4** Mobile UX audit: concept menu, trainer, sandpack
- [ ] **M4.5** Install prompt: "📱 התקן את LumenPortal"
- [ ] **M4.6** Push notifications לסטריקים (אופציונלי)

### Success Metric
20%+ מהמשתמשים מותקנים PWA. 30% מהשימוש = mobile.

## 2.5 — שבוע 14: Streaks + Daily Quest

### Tasks
- [ ] **G5.1** Schema: `streaks: { current, longest, lastActiveDate, freezes }`
- [ ] **G5.2** UI: 🔥 widget בכותרת + modal celebratory ב-3,7,14,30,100 ימים
- [ ] **G5.3** Streak freeze: 1/חודש ל-Pro
- [ ] **G5.4** Daily Quest: "5 שאלות על useEffect" — לפי החולשות
- [ ] **G5.5** Achievement system: 30 הישגים ראשונים
- [ ] **G5.6** XP + global level

### Success Metric
50%+ מ-DAU עם streak של 3+ ימים.

---

# Phase 3 — Social (שבועות 15-26)

**מטרה:** הפיכת LumenPortal לפלטפורמה — קהילה, מורים, צוותים.

## 3.1 — שבוע 15-17: Community Layer
- [ ] Discussion threads per concept
- [ ] Upvote/downvote, reputation system
- [ ] Reporting + moderation tools

## 3.2 — שבוע 18-20: Peer Code Review
- [ ] תלמיד שולח פתרון Mini Build → matching לעמית ברמה דומה
- [ ] Reviewer רואה רק 1 פתרון, נותן feedback (3-4 שאלות)
- [ ] Reviewer XP, reviewee feedback

## 3.3 — שבוע 21-23: Teacher Dashboard
- [ ] Class creation + invite link
- [ ] Student view: רשימה + אחוזי שליטה + last_active
- [ ] Concept heatmap (איזה מושגים בעייתיים)
- [ ] Risk alerts (מי בסיכון לכשל)
- [ ] Assignment system: שלח תרגיל לכיתה, ראה מי הגיש

## 3.4 — שבוע 24-26: Mentor Matching
- [ ] Eligibility: level 7 ב-30+ מושגים → "Master" badge
- [ ] תלמיד מבקש עזרה → match אוטומטי
- [ ] Async chat (Supabase realtime)
- [ ] Reputation, rating, ban system

---

# Phase 4 — World-class (חודשים 7-12)

**מטרה:** Coverage מלא + מובייל native + scale.

## 4.1 — תוכן (חודשים 7-9)
- [ ] **17 → 25 שיעורים**:
  - Lesson 14: Async JS — Callbacks, Events, Promises (intermediate)
  - Lesson 28: Testing — Jest, Vitest, RTL
  - Lesson 29: Forms — react-hook-form + zod
  - Lesson 30: State Mgmt — Zustand + Redux Toolkit
  - Lesson 31: Animation — Framer Motion
  - Lesson 32: Next.js — App Router
  - Lesson 33: GraphQL + Apollo
  - Lesson 34: API Design Patterns
  - Lesson 35: Performance & Optimization
- [ ] **3,000+ שאלות curated** (היום: 1,818)
- [ ] **50+ project briefs** (Counter, TodoList, Movie App, Notes, Chat, etc.)
- [ ] **20+ mock exams** מותאמים לתוכניות לימוד שונות (svcollege, Sela, John Bryce)

## 4.2 — Mobile Native (חודש 10-11)
- [ ] React Native rewrite (משותף עם web ל-99% דרך React Native Web)
- [ ] iOS + Android stores
- [ ] iCloud / Google Drive backup
- [ ] Push notifications מתקדמים

## 4.3 — Scale & Performance (חודש 12)
- [ ] Edge caching של content (Vercel Edge / Cloudflare)
- [ ] Lazy load של lessons (כיום הכל JS)
- [ ] Database optimization (indexes, materialized views)
- [ ] WebSocket → realtime updates

---

# 📊 KPIs — מסלול 12 חודשים

| מדד | חודש 1 | חודש 3 | חודש 6 | חודש 9 | חודש 12 |
|---|:-:|:-:|:-:|:-:|:-:|
| **MAU** | 10 | 200 | 1,000 | 3,000 | 10,000 |
| **D7 retention** | 30% | 45% | 50% | 55% | 60% |
| **Lighthouse score** | 75 | 80 | 85 | 90 | 95 |
| **Mock exam completion** | 0 | 20% | 40% | 60% | 70% |
| **AI Tutor adoption** | - | 30% | 50% | 60% | 65% |
| **Pro conversion** | - | 1% | 3% | 6% | 10% |
| **NPS** | - | 40 | 50 | 55 | 60 |
| **Test coverage** | 0% | 30% | 60% | 75% | 85% |
| **Boilerplate concepts** | 34 | 0 | 0 | 0 | 0 |

---

# 💰 תקציב משאבים

## זמן (מפתח יחיד)
| Phase | זמן | שעות |
|---|:-:|:-:|
| 0 — Tech Debt | 2 שבועות | 60 |
| 1 — Solid | 6 שבועות | 180 |
| 2 — Smart | 6 שבועות | 180 |
| 3 — Social | 12 שבועות | 300 |
| 4 — World-class | 24 שבועות | 600 |
| **סה"כ** | **50 שבועות** | **1,320 שעות** |

= 9-12 חודשים full-time, או 18 חודשים part-time (25 שעות/שבוע)

## עלויות (חודשיות)
| שלב | Vercel | Supabase | Claude API | PostHog | Sentry | סה"כ |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| MVP (חודש 1-3) | $0 | $0 | $0-50 | $0 | $0 | **$0-50** |
| Active (חודש 4-9) | $0 | $25 | $50-200 | $0 | $0 | **$75-225** |
| Scale (חודש 10-12) | $20 | $50 | $300 | $200 | $26 | **$596** |

## תוכן
- **Curated questions:** 3,000 × 5 דקות = 250 שעות. Fast-track עם Claude (30 שעות + עריכה)
- **Lessons content:** ~150 שעות לסיום 25 lessons
- **Mock exams:** 20 × 2 שעות = 40 שעות

---

# 🎯 איך להישאר ממוקדים

**זה ROADMAP, לא מחויבות.** עדיף לעצור phase 1 באמצע ולראות שמצוין, מאשר לסיים את כל ה-12 שבועות עם 70% איכות.

## הכלל הזהב
פיצ'ר נחשב "סוגר" רק כש:
1. תלמיד אמיתי השתמש בו
2. לא דיווח על באג
3. **באותה הזדמנות** — חזר

ב-LumenPortal לעולם נעדיף:
- 6 שיעורים מצוינים על 17 בינוניים
- Code Trace שעובד ב-100% על 5 פיצ'רים שעובדים ב-70%
- 50 משתמשים שאוהבים אותנו על 5,000 שלא חוזרים

---

# 🚦 סיגנלי הצלחה (לפי שלב)

## Phase 0 — Tech Debt
✅ `validate_bank.js` → "0 errors, 0 boilerplate"
✅ Lighthouse Performance > 75
✅ CI runs on every PR

## Phase 1 — Solid
✅ 5 משתמשים אמיתיים (לא חברים) משתמשים שבועי
✅ 1 mock exam שונה לכל 7 שיעורים
✅ Trainer פעיל יומי ל-3+ משתמשים

## Phase 2 — Smart
✅ "AI Tutor הציל אותי" — 1+ tweet
✅ 100 משתמשים מסונכרנים בין מובייל ודסקטופ
✅ Streak >= 7 days ל-30+ משתמשים

## Phase 3 — Social
✅ 10+ threads פעילים
✅ 1 בוטקאמפ משתמש ב-Teacher Dashboard
✅ 5+ mentors נרשמו

## Phase 4 — World-class
✅ 1 חברת hi-tech שכרה בוגר ופרסמה ב-LinkedIn
✅ ציון Lighthouse 95+ בכל הקטגוריות
✅ Apple App Store rating 4.5+

---

# ⚠️ סיגנלי כישלון — Pivot Triggers

## אם אחרי 3 חודשים:
- MAU < 50 → לעדכן strategy תוכן
- Mock exam completion < 10% → לבדוק UX
- D7 retention < 30% → onboarding גרוע

## אם אחרי 6 חודשים:
- Pro conversion < 1% → לבחון תמחור / ערך מוצע
- 0 בוטקאמפים מתעניינים → תמחור B2B שגוי
- מתחרה ישראלי גדול נכנס → focus על niche (TS, Backend, etc.)

## אם אחרי 9 חודשים:
- אין NPS חיובי (>30) → לבחון core value
- AI Tutor adoption < 20% → להוריד investment שם
- ביקוש למובייל native = 0 → לא לבנות Phase 4.2

---

# 🎊 מה קורה בשנה השנייה?

(אם year 1 הצליח)

## V5 — Internationalization (חודשים 13-15)
- תרגום מלא לאנגלית (English first market)
- אנלוגיות גלובליות במקום ישראליות
- Pricing באירו/דולר
- Stripe + PayPal integration

## V6 — Advanced Topics (חודשים 16-18)
- Lesson 36-45: Advanced React (Server Components, Streaming, Suspense)
- DevOps: Docker, Kubernetes, CI/CD
- System Design (interview prep)
- Algorithms & Data Structures (LeetCode-style)

## V7 — AI-First Learning (חודשים 19-21)
- AI יוצר שאלות אישיות עבורך
- AI מסביר ברמה שלך אוטומטית
- Voice mode (תלמיד מדבר עם AI)
- Adaptive learning paths פר-משתמש

## V8 — Career Platform (חודשים 22-24)
- Job board עם חברות hi-tech
- Interview prep mode (mock interviews)
- Portfolio builder
- LinkedIn integration
- Salary insights

---

# 🤝 איך הצוות גדל?

| חודש | תפקיד | סיבה |
|---|---|---|
| 0-3 | Solo founder + Claude AI | MVP ובסיס |
| 4-6 | + Content writer (part-time) | תוכן 3K שאלות |
| 7-9 | + Designer (freelance) | Polish + mobile |
| 10-12 | + DevOps/Infra (freelance) | Scale to 10K |
| 13+ | + Community manager | Phase 3 social |
| 16+ | + 2nd engineer | Velocity |

---

# 📌 הערה אחרונה

הסטנדרט של "world's best" אינו "פיצ'רים רבים יותר ממתחרים", אלא:

> **תלמיד מקבל ראיון בחברת hi-tech ובמהלך הראיון המראיין שואל: 'איך התכוננת?' והתלמיד עונה: 'דרך LumenPortal — היה הציל אותי'.**

זה היעד. כל החלטה במסמך הזה מתקבלת בשירות שלו.
