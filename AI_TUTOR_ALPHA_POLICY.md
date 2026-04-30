# AI Tutor Production Alpha Policy

Date: 2026-04-29

AI Tutor Production Alpha is an optional backend-backed mode for the existing tutor UI.

## Backend Proxy

- Browser code calls `supabase/functions/ai-tutor`.
- No AI provider key is stored in frontend code.
- The Edge Function reads `ANTHROPIC_API_KEY` from server environment variables.

## Guardrails

- The tutor is Socratic-first: hints, decomposition, and short checks before direct answers.
- Requests that ask for answer-only, copy-paste, or exam bypass are blocked with a learning-first response.
- AI Tutor v2 evaluation must include misconception repair: identify the likely misconception, ask one diagnostic follow-up, and route back to prerequisite practice instead of revealing the final answer.
- Missing course/student facts are answered as `unknown/unavailable`, not invented.

## Rate Limits

- Server-side in-memory rate limit is applied per Authorization/IP bucket.
- Default limit: 12 requests per minute.
- `AI_TUTOR_RATE_LIMIT` can tighten the limit per deployment.

## Logs

- The Edge Function emits structured logs for responses, guardrail blocks, and rate-limit blocks.
- Logs never include the full user message.

## Fallback

- If real Supabase credentials are not configured, the UI keeps the local deterministic fallback.
- No fake backend URL or embedded access token is allowed.
