# SVCollege Browser Smoke Evidence

> Date: 2026-04-28  
> Target: Finish Line 1 — SVCollege AI & Full Stack  
> URL tested: `http://localhost:4173/?verify-basics=2`  
> Browser surface: Codex in-app browser  

## Summary

| Area | Result |
|---|---:|
| Top-tab desktop smoke | Pass |
| Console error logs | 0 |
| Logo home navigation | Pass |
| Lesson side tree | Pass |
| Lesson concept tree | Pass |
| Mobile smoke | Pass |
| Focus mode mobile smoke | Pass |

## Top Tabs Tested

All checks verified that the tab button was uniquely resolvable, the tab opened, expected content appeared inside `main`, and no console error was logged.

| Tab | Result |
|---|---:|
| יישור SVCollege | Pass |
| מפת ידע | Pass |
| פערים | Pass |
| מבחן מדומה | Pass |
| Code Trace | Pass |
| בלוקי קוד | Pass |
| אבני בסיס | Pass |
| עקרונות יסוד | Pass |
| מוזיאון | Pass |
| שיעורים / בית | Pass |
| מדריך מקוצר | Pass |
| ידע מורחב ברמת סבתא | Pass |
| כרטיסיות | Pass |
| ראיות למידה | Pass |
| פרויקטים | Pass |
| השוואות | Pass |
| מאמן ידע + דוח | Pass |
| לימוד מותאם | Pass |
| פירוק קוד | Pass |

## Navigation Checks

| Flow | Result |
|---|---:|
| Click LumenPortal logo → home screen | Pass |
| Click lesson 11 in right lesson tree | Pass |
| Lesson concept tree appears after lesson open | Pass |
| Mobile 390×844: all 22 top tabs open with populated `main` content | Pass |
| Mobile 390×844: context tree remains active while switching tabs | Pass |
| Mobile 390×844: focus mode hides top tabs and uses side context tree | Pass |

## 2026-04-29 Mobile Smoke

| Check | Evidence |
|---|---|
| Viewport | `390×844` via Playwright CLI |
| URL | `http://127.0.0.1:4183/?v=exam-smoke` |
| Top tabs | `22/22` opened; `0` empty-content failures |
| Focus mode | `body.learning-focus-mode`; top tabs hidden |
| Console | `0` errors, `0` warnings |
| Question flow evidence | `npm run exam:flows:strict` passed: no-repeat, harder-after-correct, wrong-answer repair |

## 2026-04-29 Prerequisite Panel Smoke

| Flow | Evidence | Result |
|---|---|---:|
| Lesson quiz | Opened `lesson_11`; found `10` `.quiz-question .q-prereq-panel` panels | Pass |
| Knowledge trainer | Opened `#open-trainer`; first trainer card showed `דרישות קדם לשאלה` with `8 מושגים · 5 מונחים` | Pass |
| Mock exam | Opened SVCollege mock exam, accepted start dialog; `#mx-question .q-prereq-panel` showed `6 מושגים · 4 מונחים` | Pass |

## Remaining Work

- Add automated Playwright/browser smoke command when the project gets a stable browser-test dependency.
- Keep `npm run svcollege:tab-matrix:strict`, `npm run svcollege:readiness:release`, and `npm run svcollege:command-center:strict` green after every content change.
