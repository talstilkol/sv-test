# Telemetry Policy — Privacy-First Analytics

> **Status**: Active Policy  
> **Date**: 2026-05-01  
> **Version**: 1.0  
> **Principle**: Local-first, privacy-preserving, opt-in external telemetry only.

## Policy Summary

| Component | Status | Data | Notes |
|-------------|--------|------|-------|
| Bug Agent | ✅ Active | Local only | No external transmission |
| Sentry | ⛔ Disabled | N/A | Requires account + privacy notice |
| Plausible | ⛔ Disabled | N/A | Requires account + opt-in |
| Custom Analytics | ⛔ Disabled | N/A | Requires PII policy + approval |

## Current Implementation

### Bug Agent (Local-Only) ✅
```javascript
// core/bug-agent.js — Local-only error logging
export const bugAgent = {
  log: (error, context) => {
    const entry = {
      timestamp: Date.now(),
      error: sanitizeError(error),
      context: sanitizeContext(context),
      // NO user identification
      // NO external transmission
    };
    localStorage.setItem('lumenportal:bugs:v1', 
      JSON.stringify([...getExistingBugs(), entry].slice(-100))
    );
  }
};
```

**Features**:
- Logs to localStorage only
- No PII collection
- No network requests
- Sanitizes all error messages
- Limited to last 100 entries

### Disabled Services ⛔

#### Sentry
**Requirements for activation**:
1. Dedicated Sentry account (not personal)
2. Privacy notice in UI
3. PII handling policy
4. User consent mechanism
5. DSN not committed to repo (env variable)

#### Plausible Analytics
**Requirements for activation**:
1. Plausible account with privacy settings
2. No cookie banner needed (Plausible is cookie-less)
3. Public dashboard or privacy notice
4. Domain configured

#### Custom Analytics
**Requirements for activation**:
1. Backend infrastructure
2. GDPR compliance audit
3. Data retention policy
4. User deletion mechanism
5. Explicit opt-in consent

## Privacy Principles

### 1. Data Minimization
Collect only what's necessary:
- ✅ Page views (anonymous)
- ✅ Feature usage (anonymous)
- ✅ Error rates (sanitized)
- ⛔ Personal identifiers
- ⛔ IP addresses (without consent)
- ⛔ Learning content/answers

### 2. Local-First
- All learning data stays in browser
- No cloud sync without explicit action
- Progress export is manual/opt-in

### 3. Transparency
- Privacy policy linked in settings
- Telemetry status visible in UI
- User can view all stored data
- User can delete all data

### 4. Consent
- No telemetry without explicit opt-in
- Separate consent for each service
- Granular control (error tracking vs analytics)
- Withdraw consent at any time

## PII Policy (If External Telemetry Enabled)

**Never collect**:
- Names, emails, phone numbers
- Precise location (more than country)
- Learning answers/quiz results
- Personal notes/reflections

**May collect with consent**:
- Anonymous session ID
- Country/region
- Device type (mobile/desktop)
- Browser type (for compatibility)

## Data Retention

| Data Type | Storage | Retention | Deletion |
|-----------|---------|-----------|----------|
| Bug logs | localStorage | 100 entries | Manual or on logout |
| Analytics (if enabled) | External service | Per service policy | Per service mechanism |
| Learning progress | localStorage | Until user deletes | Manual in settings |

## Activation Checklist

Before enabling any external telemetry:

- [ ] Account created with proper organization
- [ ] Privacy notice written and reviewed
- [ ] PII policy documented
- [ ] Consent mechanism implemented
- [ ] Data retention configured
- [ ] User deletion mechanism tested
- [ ] Security review completed
- [ ] Legal review (if applicable)

## Verification Commands

```bash
# Check for telemetry calls
npm run security:telemetry-audit

# Verify no external requests in Bug Agent
npm run test:bug-agent:local-only

# Check for Sentry/Plausible snippets
npm run security:external-scripts
```

## Contact

For telemetry policy questions: privacy@lumenportal.local (placeholder)
