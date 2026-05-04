# Privacy Policy — LumenPortal

_Last updated: 2026-05-04_

LumenPortal is a Hebrew-first web platform for learning Full-Stack JavaScript. This document describes what data we collect, how we use it, and your rights.

## TL;DR

- **All learning data stays on your device.** We use `localStorage` and `sessionStorage` to remember your progress, mistakes, and preferences. **Nothing is sent to our servers.**
- We don't have a backend that collects per-user data. There is no account, no email collection, no behavioural tracking.
- The site loads from a single static-file hosting; the only network requests are for assets (HTML/JS/CSS/images).
- The PWA service worker caches files for offline use. The cache lives on your device.
- We use no analytics service, no advertising network, no third-party tracker.

## Data we store on your device

| What | Where | Why | How long |
|---|---|---|---|
| Concept scores, attempts, last-reviewed | `localStorage` | Adaptive difficulty + spaced repetition | Until you clear it |
| Mistake records | `localStorage` | "Mistake review" feature | Until you clear it |
| Reflection notes | `localStorage` | Daily reflection feature | Until you clear it |
| Profile name (e.g. "tal") | `localStorage` | Display in header | Until you clear it |
| Mock exam history (last 30) | `localStorage` | Show your past attempts | Until you clear it |
| App version cache | Service worker cache | Offline mode | Replaced on app updates |

You can wipe everything from your browser's **DevTools → Application → Storage → Clear site data**, or by deleting the site from your browser.

## Data we do NOT collect

- We do not require an account, email, or password.
- We do not track which lessons you visit on our servers.
- We do not embed third-party scripts (no Google Analytics, no Facebook Pixel, no Cloudflare beacons).
- We do not log your IP address beyond what your browser sends to the static-file host.

## Cookies

LumenPortal does not set HTTP cookies. The Service Worker uses Cache Storage and IndexedDB, which are not cookies but are local-device storage.

## Third-party hosting

The static files are hosted on GitHub Pages (or equivalent static host). GitHub may log standard request metadata (IP, User-Agent, Referrer) under [GitHub's Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement).

## Children

LumenPortal does not knowingly collect data from anyone, including children. The platform itself is suitable for ages 14+ (the curriculum assumes some math/logic background).

## Your rights (GDPR / CCPA)

Since we don't collect personal data on our servers, we have nothing to export, correct, or delete on your behalf. Your local-device data is fully under your control.

## Security

We follow standard web security practices:
- Content Security Policy enforced via meta tag.
- No `Math.random()` for security-critical code (deterministic RNG only).
- Service worker scoped to the origin.
- All scripts are first-party except where explicitly noted.

## Changes to this policy

We will update the "Last updated" date when policy changes. Material changes (e.g. introducing analytics) would be announced in-app first.

## Contact

For privacy questions: open a GitHub issue at the project repository.
