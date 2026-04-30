# Sync Alpha Policy

Date: 2026-04-29

Sync Alpha is optional and credential-gated. The portal remains local-first unless the learner explicitly configures real Supabase credentials.

## What Sync Stores

- One progress snapshot row in Supabase table `user_progress`.
- Row keys: `lesson_id = "__lumenportal__"` and `concept = "progress_snapshot_v2"`.
- Payload: exported local progress snapshot, profile id, app version, updatedAt, and deterministic fingerprint.

## Auth And Credentials

- Sync requires Supabase project URL, anon key, and authenticated access token.
- The access token must contain a UUID `sub`.
- Access token is kept in `sessionStorage`; it is not embedded in the repository.
- Missing credentials block sync instead of falling back to fake data.

## Conflict Policy

- Conflict policy is deterministic last-write-wins.
- Newer `updatedAt` wins.
- Equal fingerprints produce no write.
- Same timestamp with different fingerprints keeps local as the tie-breaker.

## Privacy Boundary

- Sync is opt-in.
- Local export/import remains available without cloud sync.
- No placeholder Supabase project, no bundled access token, and no default remote user are allowed.
