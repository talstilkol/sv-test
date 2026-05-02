# QA Testing Plan — Post Coverage Completion

> **Status**: Planned (Execute after questions coverage complete)  
> **Date**: 2026-05-01  
> **Trigger**: `questions:coverage-targets:strict` passes  
> **Goal**: Verify learning experience works end-to-end

## Test Strategy

### Phase 1: Automated Visual Regression

**FWD-5.1 — Desktop/Mobile Visual Smoke**

| Viewport | Device | Tests |
|----------|--------|-------|
| 1920x1080 | Desktop | Layout, navigation, content |
| 1366x768 | Laptop | Layout, navigation, content |
| 768x1024 | iPad | Touch, sidebar, modals |
| 375x812 | iPhone | Mobile menu, scrolling, inputs |

**Tools**: Playwright + Percy (or similar)

```javascript
// tests/visual/smoke.spec.js
test('lesson view renders correctly @desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/?lesson=lesson_11');
  await expect(page).toHaveScreenshot('lesson-11-desktop.png');
});
```

### Phase 2: Manual Lesson Verification

**FWD-5.2 — Per-Module Manual Check**

For each of 15 SVCollege modules:

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Content loads | Visual | All concepts render |
| Questions appear | Click | MC/Fill available |
| Concept navigation | Click | Jump between concepts works |
| Next lesson flow | Click | Progresses correctly |
| Collapse menus | Click | Expand/collapse smooth |
| Scroll rail | Visual | Scroll indicator accurate |

**Module Priority** (test in order):
1. HTML/CSS (lesson_11) — Foundation
2. JS Basics (lesson_12-13) — Core concepts
3. React (lesson_25-27) — Complex framework
4. Advanced (ai_development) — Edge cases

### Phase 3: Keyboard Navigation Tests

**FWD-5.3 — Keyboard-Only Coverage**

| Interaction | Keys | Test Case |
|-------------|------|-----------|
| Escape | `Esc` | Close modals, menus |
| Enter | `Enter` | Submit answers, activate buttons |
| Arrows | `↑↓←→` | Navigate lists, change options |
| Tab | `Tab` | Move between focusable elements |
| Shift+Tab | `Shift+Tab` | Reverse navigation |
| Space | `Space` | Toggle buttons, expand details |

**Test Scenarios**:
```javascript
// tests/a11y/keyboard.spec.js
test('can answer MC question with keyboard only', async ({ page }) => {
  await page.goto('/?lesson=lesson_11');
  await page.press('Tab'); // Focus question
  await page.press('ArrowDown'); // Select option B
  await page.press('Enter'); // Submit
  await expect(page.locator('.feedback')).toBeVisible();
});
```

### Phase 4: Browser Smoke Documentation

**FWD-5.4 / FWD-5.7 — Browser Smoke Evidence**

Create evidence file per browser:

```markdown
## Chrome 120 Desktop
- Date: 2026-XX-XX
- Tester: [name]
- Screenshots: [links]
- Issues: [none | list]

## Safari 17 Mobile
- Date: 2026-XX-XX
- Tester: [name]
- Screenshots: [links]
- Issues: [none | list]
```

## Test Schedule

| Phase | Duration | Team | Deliverable |
|-------|----------|------|-------------|
| 1. Visual auto | 2 days | QA Engineer | Screenshots, diffs |
| 2. Manual per-module | 5 days | Content Team | Sign-off per module |
| 3. Keyboard tests | 2 days | QA + A11y | Test results |
| 4. Browser smoke | 3 days | QA Engineer | Evidence file |

## Entry Criteria

Before starting QA:
- ✅ `questions:coverage-targets:strict` passes
- ✅ `finish-line:pre-release` shows 18/18
- ✅ All 15 modules have complete content

## Exit Criteria

QA complete when:
- ✅ All visual diffs acceptable or ticketed
- ✅ All 15 modules manually verified
- ✅ Keyboard tests pass
- ✅ Browser smoke documented
- ✅ `SVCOLLEGE_BROWSER_SMOKE.md` updated

## Tools & Commands

```bash
# Run visual tests
npm run test:visual

# Run keyboard tests
npm run test:keyboard

# Generate smoke report
npm run qa:browser-smoke:write

# Full QA suite
npm run qa:full-suite
```

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| No time for full QA | Priority: Core modules first |
| Visual tests flaky | Use stable selectors, wait for network idle |
| Browser differences | Focus on Chrome/Safari, document others |

## Dependencies

- Finish Line 1 complete
- Question coverage target met
- Stable build (no UI changes during QA)
