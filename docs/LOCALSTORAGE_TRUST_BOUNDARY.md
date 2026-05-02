# localStorage/sessionStorage Trust Boundary

> **Status**: Defined  
> **Date**: 2026-05-01  
> **Scope**: 140 instances in app.js  
> **Policy**: Local progress is NOT verified mastery; auth/backend required for trusted records.

## Trust Levels

| Level | Storage | Verified By | Use Case |
|-------|---------|-------------|----------|
| 🔴 **Untrusted** | localStorage | N/A (client-only) | UX preferences, draft state |
| 🟡 **Signed** | localStorage + HMAC | Client-side key | Tamper-evident local progress |
| 🟢 **Verified** | Supabase/Backend | Auth + Server | Official records, certificates |

## Policy Statements

1. **localStorage progress** represents **user experience state**, not verified learning outcomes
2. **XP/Coins** in localStorage are **local rewards**, not blockchain or monetary value
3. **Mastery claims** from localStorage alone are **provisional** until backend verification
4. **Exam scores** from local-only mode are **practice results**, not certified credentials

## Storage Categories

### Category A: UX Preferences (Safe, No Trust Impact)
| Key Pattern | Purpose | Example |
|-------------|---------|---------|
| `lumenportal:theme:*` | Dark/light mode | `THEME_KEY` |
| `lumenportal:learning-focus:*` | View state | `FOCUS_MODE_KEY` |
| `lumenportal:top-chrome-collapsed:*` | UI collapse | `TOP_CHROME_COLLAPSED_KEY` |
| `lumenportal:right-sidebar-collapsed:*` | Sidebar state | `RIGHT_SIDEBAR_COLLAPSED_KEY` |
| `lumenportal:view-mode:*` | Display toggles | `VM_KEY` |
| `lumenportal:a11y:*` | Accessibility settings | `A11Y_KEY` |
| `lumenportal:lesson-mode:*` | Lesson display mode | `LESSON_MODE_KEY` |

**Trust Status**: ✅ Safe — UI state only, no learning claims

### Category B: Local Progress (Provisional, Client-Only)
| Key Pattern | Purpose | Verification Needed |
|-------------|---------|---------------------|
| `lumenportal:proficiency:v1` | Concept scores | Backend sync for official record |
| `lumenportal:progress:*` | Lesson completion | Backend sync for official record |
| `lumenportal:reflections:v1` | User reflections | Export only, not verified |
| `lumenportal:pocket:v1` | Saved concepts | UX feature, not mastery proof |
| `lumenportal:time-machine:*` | Study history | Analytics only |
| `lumenportal:profiles:*` | Local profiles | Export/import for transfer |

**Trust Status**: ⚠️ Provisional — Sync to backend for verification

### Category C: Ephemeral/Temporary
| Key Pattern | Purpose | TTL |
|-------------|---------|-----|
| `lumenportal:console-gate:*` | Session warnings | Session |
| `lumenportal:sync:*` | Sync timestamps | 24h |

**Trust Status**: ✅ Safe — Temporary session data

## Security Model

```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER / CLIENT                          │
│  ┌──────────────┐      ┌──────────────┐                   │
│  │ localStorage │      │   IndexedDB  │                   │
│  │  (untrusted) │      │   (untrusted)│                   │
│  └──────┬───────┘      └──────┬───────┘                   │
│         │                     │                            │
│         └──────────┬──────────┘                            │
│                    │                                        │
│              ┌─────▼─────┐                                 │
│              │  Sync Layer │ ←─ Export/Import/Supabase      │
│              │  (signing)  │                                 │
│              └─────┬───────┘                                 │
└──────────────────┼──────────────────────────────────────────┘
                   │
                   │ HTTPS + JWT
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE / BACKEND                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Verified Progress Table                              │  │
│  │  - user_id (auth)                                   │  │
│  │  - profile_id                                       │  │
│  │  - lesson_id                                        │  │
│  │  - concept                                          │  │
│  │  - score_snapshot (signed)                          │  │
│  │  - verified_at (server timestamp)                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Implementation Notes

### Current State (app.js)
- All localStorage access wrapped in try/catch
- No sensitive data (passwords, PII) in localStorage
- Keys are namespaced with `lumenportal:` prefix
- Progress exports now include client-side HMAC metadata (`integrity`) and `btn-import-progress` validates signature before import (with explicit warning when missing/unsupported and hard fail on mismatch).

### Implementation Status
1. Client-side signing for progress exports: implemented
2. Integrity checks on progress import: implemented (missing/unsupported signature triggers explicit warning)
3. Tamper detection UI: implemented (`alert` + `confirm` flow in import path)
4. Sync queue for offline-first to verified backend

## Code Examples

```javascript
// ✅ Safe: UX preference
localStorage.setItem(`${NS}:theme`, theme);

// ⚠️ Provisional: Progress (needs sync)
localStorage.setItem(`${NS}:proficiency`, JSON.stringify(scores));
// Must sync to backend for verification

// ❌ NEVER: Sensitive data
localStorage.setItem('password', pwd); // FORBIDDEN
```

## Compliance

- ✅ No PII in localStorage
- ✅ No authentication tokens in localStorage (use httpOnly cookies)
- ✅ No financial data in localStorage
- ⚠️ Progress data clearly marked as "local practice mode"

## Verification Commands

```bash
# Audit localStorage keys
npm run security:storage-audit

# Check for PII patterns
npm run security:pii-scan

# Validate trust boundaries
npm run security:trust-boundary-strict
```
