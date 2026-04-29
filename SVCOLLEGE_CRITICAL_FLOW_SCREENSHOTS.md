# SVCollege Critical Flow Screenshots

Date: 2026-04-29  
Target: Finish Line 1 — SVCollege AI & Full Stack  
Browser surface: Codex Browser plugin Playwright API  
Local URL: `http://127.0.0.1:5173/`

## Summary

| Evidence | Result |
|---|---:|
| Top-tab browser smoke | 22/22 tabs pass |
| Console errors during top-tab smoke | 0 |
| Desktop screenshots | 6/6 |
| Mobile viewport screenshots | 6/6 |
| Screenshot gate | `svcollege:screenshot-evidence:strict` pass |

## Screenshot Files

| Flow | Desktop | Mobile |
|---|---|---|
| Trainer | `output/playwright/svcollege-critical-flows/desktop-trainer.png` | `output/playwright/svcollege-critical-flows/mobile-trainer.png` |
| Study | `output/playwright/svcollege-critical-flows/desktop-study.png` | `output/playwright/svcollege-critical-flows/mobile-study.png` |
| Mock Exam | `output/playwright/svcollege-critical-flows/desktop-mock-exam.png` | `output/playwright/svcollege-critical-flows/mobile-mock-exam.png` |
| Code Trace | `output/playwright/svcollege-critical-flows/desktop-code-trace.png` | `output/playwright/svcollege-critical-flows/mobile-code-trace.png` |
| Code Blocks / Build / Bug Evidence | `output/playwright/svcollege-critical-flows/desktop-codeblocks-build-bug.png` | `output/playwright/svcollege-critical-flows/mobile-codeblocks-build-bug.png` |
| SVCollege Command Center | `output/playwright/svcollege-critical-flows/desktop-svcollege-command-center.png` | `output/playwright/svcollege-critical-flows/mobile-svcollege-command-center.png` |

## Automation Evidence

- Top-tab evidence JSON: `output/playwright/svcollege-critical-flows/top-tab-browser-smoke.json`
- Mobile viewport harness: `output/playwright/svcollege-critical-flows/mobile-flow-frame.html`
- Top-tab harness: `output/playwright/svcollege-critical-flows/top-tab-smoke-harness.html`

The mobile screenshots use a same-origin `390px × 844px` iframe wrapper so the portal runs with its mobile media queries while the Codex browser remains in its desktop window.
