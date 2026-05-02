# AI Tutor Alpha Report — 2026-04-29

> **Historical / Superseded**: this artifact is older than the current source-of-truth run.
> Captured on: 2026-04-29
> Source-of-truth refresh date: 2026-05-01
> Use `npm run report:source-of-truth:write` to regenerate current artifacts before making live claims.


- Target: AI Tutor Production Alpha
- Policy: AI Tutor Alpha requires backend proxy, guardrails, server-side rate limits, structured logs, and credential-gated frontend calls.
- Ready: Yes
- Checks: 7/7

| Check | Status | Detail |
|---|---|---|
| Backend proxy exists without frontend AI key | pass | AI provider key must stay in Supabase Edge Function env only. |
| Socratic guardrails block answer leakage | pass | Tutor must block copy-paste / answer-only bypass prompts. |
| Server-side rate limit exists | pass | Edge Function must rate-limit requests before model calls. |
| Structured tutor logs exist | pass | Logs must cover response, guardrail and rate-limit events without raw message logging. |
| UI calls production only with real sync credentials | pass | Frontend must fall back locally when credentials are unavailable. |
| Production Alpha note is visible | pass | Learner-facing UI must explain backend-backed alpha and fallback. |
| AI Tutor Alpha policy exists | pass | AI_TUTOR_ALPHA_POLICY.md must document backend, guardrails, rate limits and logs. |


