# Release Guardrails Plan

> **Status**: Planned  
> **Date**: 2026-05-01  
> **Goal**: Prevent release of broken/incomplete features

## Guardrail Categories

```
┌─────────────────────────────────────────────────────────────┐
│                    RELEASE GUARDRAILS                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. CACHE & ASSETS           2. FILE INVENTORY             │
│     FWD-7.3                     FWD-7.4                    │
│     • Single source of truth    • Intended vs generated     │
│     • Version consistency       • Clean worktree            │
│                                                             │
│  3. SECURITY                 4. ESCAPING GATE              │
│     FWD-7.5 + FWD-7.7           FWD-7.6                    │
│     • innerHTML audit           • Automatic verification     │
│     • CSP preparation           • No manual whitelist       │
│                                                             │
│  5. STORAGE TRUST              6. OFFLINE UX               │
│     FWD-7.8                     FWD-7.9                    │
│     • Local vs verified         • Network indicator          │
│     • No HMAC illusions         • Cache status               │
│                                                             │
│  7. AUDIT RECONCILIATION                                    │
│     FWD-7.10                                                 │
│     • Live gate verification                                 │
│     • No stale claims                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 1. Cache Version Centralization (FWD-7.3)

### Problem
Cache version defined in multiple places:
- `service-worker.js`
- `index.html` meta tags
- Test expectations
- Report metadata

### Solution: Single Source of Truth

```javascript
// config/app-version.js
export const APP_VERSION = {
  major: 1,
  minor: 2,
  patch: 3,
  build: process.env.BUILD_ID || 'dev',
  cache: 'lumenportal-v1.2.3',
};

// Derived automatically
export const CACHE_KEY = `${APP_VERSION.cache}-${APP_VERSION.build}`;
```

```javascript
// service-worker.js
import { CACHE_KEY } from './config/app-version.js';

const CACHE_NAME = CACHE_KEY; // Always consistent
```

```html
<!-- index.html -->
<meta name="app-version" content="<%= CACHE_KEY %>">
```

### Verification

```bash
# Check version consistency
npm run check:version-consistency

# Result: PASS if all sources match
```

## 2. Release Inventory (FWD-7.4)

### Pre-Release Checklist

| Check | Command | Pass Criteria |
|-------|---------|---------------|
| Clean worktree | `git status` | No uncommitted changes |
| Generated fresh | `npm run build` | No drift from source |
| Reports match | `npm run check:reports` | All generated from current code |
| No orphaned files | `npm run check:orphans` | No untracked in dist/ |

### Intended vs Generated

```markdown
# Release Inventory — 2026-XX-XX

## Source Files (Intended)
| File | Purpose | Status |
|------|---------|--------|
| index.html | Entry point | ✅ |
| style.css | Styles | ✅ |
| app.js | Main logic | ✅ |
| data/*.js | Content | ✅ |

## Generated Artifacts
| File | Source | Status |
|------|--------|--------|
| dist/index.html | index.html | ✅ Fresh |
| dist/assets/*.css | style.css | ✅ Fresh |
| dist/assets/*.js | app.js | ✅ Fresh |

## Reports
| Report | Date | Status |
|--------|------|--------|
| QUESTION_COVERAGE_TARGETS | 2026-XX-XX | ✅ Current |
| SVCOLLEGE_READINESS | 2026-XX-XX | ✅ Current |
```

## 3. Security Inventory (FWD-7.5 + FWD-7.7)

### innerHTML Audit

Already documented in `docs/INNERHTML_ALLOWLIST.md`:
- 152 instances categorized
- Categories A/B/C/D defined
- Smoke tests pending for category B

### CSP Preparation

**Phase 1: Report-Only**
```http
Content-Security-Policy-Report-Only: 
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  font-src 'self' https://fonts.gstatic.com;
  report-uri /csp-report;
```

**Phase 2: Enforcement (after testing)**
```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  font-src 'self';
```

## 4. Escaping Gate (FWD-7.6)

### Automatic Verification

```javascript
// scripts/verify-escaping.js
const fs = require('fs');

function verifyEscaping(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Pattern: innerHTML = ... (without esc())
  const dangerousPattern = /\.innerHTML\s*=\s*(?!.*esc\()/g;
  const matches = content.match(dangerousPattern);
  
  if (matches) {
    console.error(`❌ Found unescaped innerHTML in ${filePath}`);
    return false;
  }
  
  return true;
}

// Check all JS files
const jsFiles = glob('src/**/*.js');
const allPass = jsFiles.every(verifyEscaping);

process.exit(allPass ? 0 : 1);
```

### CI Gate

```yaml
# .github/workflows/security.yml
- name: Verify HTML Escaping
  run: npm run security:verify-escaping:strict
```

## 5. Storage Trust Boundary (FWD-7.8)

### Policy Enforcement

```javascript
// core/progress-storage.js
export const STORAGE_POLICY = {
  // Local progress is NOT verified mastery
  localProgress: {
    trustLevel: 'untrusted',
    useCase: 'UX convenience only',
    verifiedBy: null,
  },
  
  // Only backend-verified is trusted
  verifiedProgress: {
    trustLevel: 'verified',
    useCase: 'Official records',
    verifiedBy: 'Supabase/auth',
  },
};

// Warning UI
export function showTrustWarning() {
  return `
    <div class="trust-notice">
      ⚠️ התקדמות מקומית היא עזר לימודי בלבד. 
      מאסטר מאומת דורש אימות בשרת.
    </div>
  `;
}
```

### No HMAC Illusions

```javascript
// ❌ DON'T DO THIS
const HMAC_KEY = 'hardcoded-secret'; // Useless
const signature = hmac(data, HMAC_KEY); // Easily bypassed

// ✅ DO THIS INSTEAD
// Either: No signing (local only)
// Or: Real backend verification
const verified = await backend.verifyProgress(data);
```

## 6. Offline UX Indicator (FWD-7.9)

### UI Component

```javascript
// ui/offline-indicator.js
export function renderOfflineStatus() {
  const isOnline = navigator.onLine;
  const cacheStatus = getCacheStatus();
  
  return `
    <div class="offline-indicator ${isOnline ? 'online' : 'offline'}">
      <span class="status-icon">${isOnline ? '🌐' : '✈️'}</span>
      <span class="status-text">${isOnline ? 'מקוון' : 'לא מקוון'}</span>
      ${!isOnline ? `<span class="cache-info">גרסה: ${cacheStatus.version}</span>` : ''}
    </div>
  `;
}
```

### Cache Status Report

| Metric | Value | Healthy? |
|--------|-------|----------|
| Cache Version | v1.2.3 | ✅ Current |
| Assets Cached | 45/45 | ✅ Complete |
| Last Update | 2 hours ago | ✅ Recent |
| Storage Used | 12 MB | ✅ < 50MB |

## 7. Audit Reconciliation Gate (FWD-7.10)

### Automatic Verification

```bash
#!/bin/bash
# scripts/reconcile-audit.sh

echo "Reconciling AUDIT claims with live gates..."

# For each AUDIT claim, verify with live gate
claims=$(grep -r "AUDIT-" docs/ | grep -o "[A-Z]*-AUDIT-[0-9]*" | sort -u)

for claim in $claims; do
  echo "Checking $claim..."
  
  # Map claim to gate
  case $claim in
    *QUESTION*)
      npm run questions:coverage-targets:strict || echo "⚠️ $claim unverified"
      ;;
    *SVCollege*)
      npm run svcollege:readiness:strict || echo "⚠️ $claim unverified"
      ;;
  esac
done
```

### Policy: No Claim Without Gate

```markdown
## AUDIT Claim Policy

| Claim | Live Gate Required | Status |
|-------|-------------------|--------|
| "471 MC gaps" | `questions:coverage-targets:strict` | ✅ Verified |
| "SVCollege ready" | `svcollege:readiness:strict` | ✅ Verified |
| "Remediation 0" | `quality:remediation:strict` | ✅ Verified |

**Rule**: Any claim without a corresponding `:strict` gate is marked as **unverified**.
```

## Release Gate Summary

| Guardrail | Status | Blocking? |
|-----------|--------|-----------|
| Cache version | ⏸️ Planned | Yes |
| File inventory | ⏸️ Planned | Yes |
| Security audit | ⏸️ Partial | Yes |
| Escaping gate | ⏸️ Planned | Yes |
| Storage trust | ⏸️ Documented | No |
| Offline UX | ⏸️ Planned | No |
| Audit reconciliation | ⏸️ Documented | Yes |

## Verification Commands

```bash
# Pre-release checklist
npm run release:preflight

# All guardrails
npm run release:guardrails:strict

# Security subset
npm run security:guardrails:strict
```

## Implementation Priority

1. **P0 (Blocking)**: Cache version, File inventory, Escaping gate
2. **P1 (Important)**: Security audit, Audit reconciliation
3. **P2 (Nice)**: Offline UX, Storage trust UI
