# Accessibility Statement — LumenPortal

_Last updated: 2026-05-04_

LumenPortal is committed to making its content usable by as many people as possible, including those who rely on assistive technology.

## Standards we target

- **WCAG 2.1 Level AA** — the W3C accessibility guideline most often cited in legal accessibility frameworks (EU EN 301 549, US Section 508, IL Standard 5568).
- **Best-practice patterns** beyond the formal standard where they help (focus visible on every interactive element, semantic HTML, no reliance on color alone for information).

## What's verified

- ✅ **Color contrast** — every CSS-variable text-on-background pair meets WCAG AA (≥ 4.5:1 normal text). Verified by `npm run contrast:check:strict` on every PR. The LumenPortal logo is a gradient — exempt under WCAG 2.1 SC 1.4.3 (logotypes).
- ✅ **Keyboard navigation** — 1,532 focusable elements covered by 99 `:focus`/`:focus-visible` style rules. Tab order follows DOM order; no tab-traps.
- ✅ **Accessible names** — 923/923 buttons and 64/64 form inputs have accessible names (text content, `aria-label`, `aria-labelledby`, or associated `<label>`).
- ✅ **Document language** — `<html lang="he" dir="rtl">` set; sub-trees that contain English code use `dir="ltr"` where appropriate.
- ✅ **Semantic structure** — single `<h1>`, hierarchical headings (1 `h1`, ~168 total `h1`–`h6`), `<nav>` for navigation, `<main>` for content.
- ✅ **No flashing content** — no animations exceed the 3 Hz limit. Reduced-motion CSS respected.
- ✅ **Form errors** — validation errors are programmatically associated and announced.
- ✅ **Real-browser smoke** — 23-tab walk runs in headless Chromium on every PR (Playwright); 0 console errors.

## What's not verified

- ⚠️ **Manual screen-reader walkthrough** (NVDA / VoiceOver / TalkBack) is **not part of the automated CI gate**. Only programmatic checks run. A human pass through the trainer + mock-exam + result screens is on the roadmap.
- ⚠️ **Touch target sizes on mobile** — 61 of 200 sampled buttons are smaller than 44×44 px on a 320 px viewport (mostly inline icons). Not WCAG-blocking (target sizes are AAA at 44 px) but tracked.
- ⚠️ **Real Lighthouse Accessibility audit** — substituted with the contrast/aria/focus checks above; a true Lighthouse run is queued.

## Where assistive tech may struggle today

- **Code blocks** — RTL flow with embedded LTR JavaScript can confuse some screen readers. We use `unicode-bidi: plaintext` on code blocks but this is heuristic.
- **Trainer dashboard** — high information density (8 stat cards, 7 toolbar buttons). Screen-reader users may prefer the trainer's "compact" mode (toolbar `📊 הצג/הסתר דוח מלא`).
- **Mock exam timer** — audible time updates (e.g., "5 minutes left") are not yet announced. Visible only.

## How to report an issue

Open a GitHub issue at the project repository. Tag with `a11y`. Include:

1. The browser + assistive tech versions you're using (NVDA 2024.1, VoiceOver on macOS 14.x, etc.).
2. The page or flow.
3. What you expected vs. what happened.

## Roadmap items

- 🔄 **Manual NVDA + VoiceOver walkthrough** of the consent → onboarding → trainer → mock-exam → result flow.
- 🔄 **Lighthouse Accessibility audit** in CI alongside the existing contrast gate.
- 🔄 **Skip-to-content link** at the top of the page.
- 🔄 **Live region** for the mock-exam timer warnings.
- 🔄 **High-contrast theme** option (currently dark theme only).
- 🔄 **Adjustable font size** (currently relies on browser zoom).

## Compliance frameworks

LumenPortal is a free educational tool, not regulated under EU Web Accessibility Directive (which targets public-sector bodies) or ADA Title II/III. It is, however, used in classroom settings where instructor-side compliance may apply — see your institution's accessibility policy.

## Contact

For accessibility questions: open a GitHub issue tagged `a11y` at the project repository.

---

This statement is intentionally short and concrete. It does not promise compliance we have not verified.
