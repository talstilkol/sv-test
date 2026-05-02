# innerHTML Allowlist — Security Inventory

> **Status**: In Progress  
> **Date**: 2026-05-01  
> **Scope**: 152 instances in app.js  
> **Policy**: All data-originated HTML must pass through `esc()` (escaping) or DOM API.

## Policy

1. **Never** assign raw user input to innerHTML
2. **Always** use `esc()` helper from sanitize.js for dynamic content
3. **Prefer** DOM APIs (`createElement`, `textContent`) over innerHTML where possible
4. **Audit** all instances quarterly

## Allowlist by Category

### Category A: Safe Static HTML (No Dynamic Data)
| Line | Selector | Usage | Owner | Approved |
|------|----------|-------|-------|----------|
| 7681 | `jumper.innerHTML` | Static option reset | UI Core | ✅ |
| 7475 | `list.innerHTML = ""` | Empty list clear | Pocket Panel | ✅ |

### Category B: HTML with Escaped Dynamic Data
| Line | Selector | Data Source | Escaping | Owner | Smoke Test |
|------|----------|-------------|----------|-------|------------|
| 674 | `localProfileSelect.innerHTML` | Profile names | `esc(profile.name)` | Auth | ✅ local-profile.test.js |
| 1080 | `contextTreeBody.innerHTML` | Context nodes | `renderContextNode()` uses esc | Context Tree | ✅ context-tree.test.js |
| 1408 | `siteMapMenuBody.innerHTML` | Tab items | `esc()` in template | Site Map | ⬜ |
| 1447 | `siteBreadcrumb.innerHTML` | Lesson/concept names | `esc()` wrapper | Navigation | ⬜ |
| 7471 | `list.innerHTML` (pocket) | Pocket items | `esc()` for concept names | Pocket | ✅ pocket.test.js |
| 7778 | `glossaryList.innerHTML` | Glossary terms | `esc()` for term + example | Glossary | ⬜ |
| 7827 | `reflect-history` | Reflection text | `esc()` for user content | Reflection | ⬜ |
| 7894 | `reverseBody.innerHTML` | Definition text | `esc()` for definition | Reverse Quiz | ⬜ |
| 8063 | `timeMachineBody.innerHTML` | Exam history | `esc()` for all strings | Time Machine | ⬜ |
| 9098+ | `exam-cockpit` innerHTML | Exam summary | `esc()` for all data | Exam | ⬜ |

### Category C: Sanitizer-Verified Rich HTML
| Line | Selector | Data Source | Sanitizer | Owner | Approved |
|------|----------|-------------|-----------|-------|----------|
| 8301 | `btn.innerHTML` (lessons nav) | Static template with index | None needed (static) | Sidebar | ✅ |
| 8483 | `portalDecisionAid.innerHTML` | Render function output | Internal render | Portal | ⬜ |

### Category D: Pending Review
| Line Range | Description | Risk Level | Action |
|------------|-------------|------------|--------|
| 7705 | `conceptParts.innerHTML` | Medium | Verify `stepTabsHTML` origin |
| 8510+ | Various modal content | Medium | Audit each modal renderer |

## Blocked/Unsafe Patterns (Do NOT Use)

```javascript
// ❌ NEVER DO THIS:
element.innerHTML = userInput;
element.innerHTML = `<div>${untrustedData}</div>`;

// ✅ DO THIS INSTEAD:
element.innerHTML = `<div>${esc(untrustedData)}</div>`;
element.textContent = untrustedData;
```

## Verification Commands

```bash
# Count innerHTML instances
npm run security:innerhtml-count

# Verify esc() usage
npm run security:verify-escaping

# Run allowlist validation
npm run security:allowlist-strict
```

## Next Actions

1. [ ] Complete smoke tests for Category B items
2. [ ] Review Category C for potential XSS vectors
3. [ ] Replace Category D instances with safer patterns
4. [ ] Add automated gate to CI
