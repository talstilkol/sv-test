# DOM + Storage Trust Boundary Audit

> **Historical / Superseded**: this artifact is older than the current source-of-truth run.
> Captured on: 2026-05-06
> Source-of-truth refresh date: 2026-05-07
> Use `npm run report:source-of-truth:write` to regenerate current artifacts before making live claims.


- Date: 2026-05-06
- Target: app.js, src/views/homework-exam-mode-view.js
- Report Version: dom-storage-trust-boundary-audit-v1

## Summary

- DOM sinks: 118 total (innerHTML 116, insertAdjacentHTML 2, document.write 0)
- DOM review status: 118 safe / 0 requires review
- Critical exam DOM review: ready (0 sinks)
- Storage calls: 178 total (176 localStorage, 2 sessionStorage)
- Trust-ready: Yes
- Policy: Trust boundary is explicit only when owner + data origin + sanitization are documented.

## Data Origin Distribution

- state-derived DOM writes: 73
- static template DOM writes: 40
- storage domains: 17 learning-progress, 19 ui-settings, 142 feature-state

## Top DOM Sinks Requiring Allowlist

- None

## Storage Trust Boundary

| File | Owner | Storage | Line | Key | Domain |
|---|---|---|---|---|---|
| app.js | global | localStorage.getItem | 10 | "lumenportal:autosave:lastSavedAt" | feature-state |
| app.js | global | localStorage.setItem | 13 | "lumenportal:profiles:v1" | feature-state |
| app.js | global | localStorage.setItem | 19 | "lumenportal:userId:v1" | feature-state |
| app.js | global | localStorage.setItem | 20 | "lumenportal:activeProfile:v1" | feature-state |
| app.js | restoreSection | localStorage.setItem | 26 | physicalKey | feature-state |
| app.js | restoreSection | localStorage.setItem | 33 | "lumenportal:autosave:lastSavedAt" | feature-state |
| app.js | renderLocalProfileControls | localStorage.getItem | 338 | PROF_STORAGE_KEY | feature-state |
| app.js | saveProficiency | localStorage.setItem | 341 | PROF_STORAGE_KEY | feature-state |
| app.js | setLearningFocusTopCollapsed | localStorage.setItem | 6879 | FOCUS_TOP_COLLAPSED_KEY | ui-settings |
| app.js | setTopChromeCollapsed | localStorage.setItem | 6896 | TOP_CHROME_COLLAPSED_KEY | ui-settings |
| app.js | setRightSidebarCollapsed | localStorage.setItem | 6917 | RIGHT_SIDEBAR_COLLAPSED_KEY | ui-settings |
| app.js | setLearningFocusMode | localStorage.getItem | 6937 | FOCUS_TOP_COLLAPSED_KEY | ui-settings |
| app.js | setLearningFocusMode | localStorage.setItem | 6943 | FOCUS_MODE_KEY | ui-settings |
| app.js | setLearningFocusMode | localStorage.getItem | 6947 | FOCUS_MODE_KEY | ui-settings |
| app.js | setLearningFocusMode | localStorage.getItem | 6948 | TOP_CHROME_COLLAPSED_KEY | ui-settings |
| app.js | setLearningFocusMode | localStorage.getItem | 6949 | RIGHT_SIDEBAR_COLLAPSED_KEY | ui-settings |
| app.js | applyTheme | localStorage.getItem | 7060 | THEME_KEY | ui-settings |
| app.js | applyTheme | localStorage.setItem | 7069 | THEME_KEY | ui-settings |
| app.js | load | localStorage.getItem | 7221 | POCKET_KEY | feature-state |
| app.js | save | localStorage.setItem | 7224 | POCKET_KEY | feature-state |
| app.js | loadPocketLevels | localStorage.getItem | 7231 | POCKET_LEVEL_KEY | learning-progress |
| app.js | savePocketLevels | localStorage.setItem | 7234 | POCKET_LEVEL_KEY | learning-progress |
| app.js | closePocketPanel | localStorage.getItem | 7462 | VM_KEY | learning-progress |
| app.js | applyState | localStorage.setItem | 7475 | VM_KEY | learning-progress |
| app.js | renderConceptParts | localStorage.getItem | 7568 | A11Y_KEY | feature-state |
| app.js | applyA11y | localStorage.setItem | 7579 | A11Y_KEY | feature-state |
| app.js | loadReflections | localStorage.getItem | 7799 | REFLECT_KEY | feature-state |
| app.js | saveReflectionRecord | localStorage.setItem | 7804 | REFLECT_KEY | feature-state |
| app.js | loadTimeMachineReflections | localStorage.getItem | 7951 | "lumenportal:reflections:v1" | feature-state |
| app.js | readJson | localStorage.getItem | 8158 | key | feature-state |
| app.js | refreshSettingsControls | localStorage.getItem | 8176 | THEME_KEY | ui-settings |
| app.js | refreshSettingsControls | localStorage.getItem | 8180 | LESSON_MODE_KEY | ui-settings |
| app.js | refreshSettingsControls | localStorage.getItem | 8185 | chromeToggleMap[key] | feature-state |
| app.js | refreshSettingsControls | localStorage.setItem | 8201 | THEME_KEY | ui-settings |
| app.js | refreshSettingsControls | localStorage.setItem | 8210 | LESSON_MODE_KEY | ui-settings |
| app.js | refreshSettingsControls | localStorage.getItem | 8220 | storageKey | feature-state |
| app.js | refreshSettingsControls | localStorage.setItem | 8225 | storageKey | feature-state |
| app.js | refreshSettingsControls | localStorage.setItem | 8242 | VM_KEY | learning-progress |
| app.js | refreshSettingsControls | localStorage.setItem | 8259 | A11Y_KEY | feature-state |
| app.js | initSidebar | localStorage.getItem | 8347 | "lumenportal:lastOpenedLesson:v1" | feature-state |

