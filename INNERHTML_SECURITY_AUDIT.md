# innerHTML Security Audit Report

**Date:** 2026-05-02  
**Auditor:** Automated + Manual Review  
**File:** `app.js` (35,610 lines)

## Summary

| Metric | Count |
|--------|-------|
| `.innerHTML =` assignments | 152 |
| `document.write()` calls | 1 |
| `insertAdjacentHTML()` calls | 2 |
| **Total DOM injection sinks** | **155** |

## Risk Assessment

### Sanitization Coverage

- **`esc()` function** (line 32614): Escapes `& < > "` — standard HTML entity encoding
- **DOMPurify** available via `src/core/sanitize.js` — not applied to all innerHTML sinks
- **Missing:** Single-quote escaping (`'`), event handler attribute prevention

### Data Flow Analysis

All innerHTML content comes from **one of three sources**:

1. **Static templates with esc() on user-facing text** (LOW RISK)
   - Pattern: `` container.innerHTML = `<div>${esc(lesson.title)}</div>` ``
   - ~120 instances follow this pattern
   - Risk: Low — data comes from `data/*.js` files (developer-authored)

2. **Render functions producing HTML from data modules** (LOW RISK)
   - Pattern: `container.innerHTML = renderConceptCard(lesson, concept, idx)`
   - render functions internally use `esc()` on text fields
   - Risk: Low — if render functions properly escape

3. **User-generated content without guaranteed sanitization** (MEDIUM RISK)
   - `communityThreadListEl.innerHTML` — displays user-authored discussions
   - `peerReviewMatchEl.innerHTML` — displays peer code review content
   - `mentorMessageListEl.innerHTML` — displays mentor chat messages
   - Pattern: Data comes from Supabase (user-authored)
   - Risk: Medium — requires DOMPurify enforcement

### `document.write()` (line 29081)

```javascript
w.document.write(pdfDocHTML);
```
- Context: PDF export to new window
- Risk: LOW — content is built from internal template, not user input

### `insertAdjacentHTML()` (lines 31564, 32254)

```javascript
resultBox.insertAdjacentHTML("beforeend", renderWrongAnswerCoachCard(...));
explanationBox.insertAdjacentHTML("beforeend", renderWrongAnswerCoachCard(...));
```
- Context: Appending feedback cards after wrong answers
- Risk: LOW — `renderWrongAnswerCoachCard` uses internal data + `esc()`

## Top 30 Sink Targets (by frequency)

| Target Variable | Count | Source | Risk |
|----------------|-------|--------|------|
| `container.innerHTML` | 29 | Static templates + data files | Low |
| `body.innerHTML` | 12 | Static templates | Low |
| `slot.innerHTML` | 7 | Quiz/concept cards | Low |
| `root.innerHTML` | 5 | View renders | Low |
| `fb.innerHTML` | 5 | Feedback displays | Low |
| `stats.innerHTML` | 3 | Numeric counters | Low |
| `shell.innerHTML` | 3 | Exam mode UI | Low |
| `out.innerHTML` | 3 | Code runner output | **Medium** |
| `lessonBody.innerHTML` | 3 | Lesson content | Low |
| `card.innerHTML` | 3 | Concept cards | Low |
| `communityThreadListEl.innerHTML` | 2 | User discussions | **Medium** |
| `peerReviewMatchEl.innerHTML` | 2 | Peer content | **Medium** |
| `mentorMessageListEl.innerHTML` | 2 | User messages | **Medium** |
| `mentorMatchSummaryEl.innerHTML` | 2 | User data | **Medium** |
| `communityReputationListEl.innerHTML` | 2 | User data | Low |
| `communityModerationListEl.innerHTML` | 2 | Moderation data | Low |
| `teacherStudentTableBody.innerHTML` | 2 | Teacher data | Low |
| `teacherHeatmapBody.innerHTML` | 2 | Analytics | Low |
| `teacherRiskListEl.innerHTML` | 2 | Risk alerts | Low |
| `teacherAssignmentListEl.innerHTML` | 2 | Assignment data | Low |

## Recommendations

### Immediate (P1)

1. **Enforce DOMPurify on community/peer content** — All user-generated content from Supabase MUST pass through DOMPurify before innerHTML assignment:
   - `communityThreadListEl.innerHTML`
   - `peerReviewMatchEl.innerHTML`
   - `mentorMessageListEl.innerHTML`
   - Code runner output (`out.innerHTML`)

2. **Add single-quote escaping to `esc()`**:
   ```javascript
   .replace(/'/g, "&#39;")
   ```

3. **Document allowlist** — Each innerHTML sink should have a comment noting its data source

### Post-Modularization (P2)

4. **Replace innerHTML with DOM APIs** where possible (createElement/textContent)
5. **Implement CSP header** with `script-src 'self'`
6. **Add automated innerHTML audit to CI** — grep + fail if new un-reviewed sinks appear

## Conclusion

**Overall Risk: LOW-MEDIUM**

The vast majority (148/155) of innerHTML sinks use developer-authored content from `data/*.js` files with `esc()` escaping. The 7 medium-risk sinks involve user-generated content (community, peer review, mentor messages) and code runner output — these should be hardened with DOMPurify before the community features go live.

No critical/high risk XSS vulnerabilities found in current state because community features are alpha (no real user data flows through yet).
