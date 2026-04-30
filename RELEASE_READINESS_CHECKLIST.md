# Phase 6 Release Readiness Checklist

Updated: 2026-04-29

The release checklist is a pre-pilot gate. It records the checks required before learners use the portal in a real class.

## Required Gates

- `npm run validate:strict`
- `npm run qa:questions:strict`
- `npm run svcollege:readiness:release`
- `npm run svcollege:tab-matrix:strict`
- `npm run svcollege:command-center:strict`
- `npm run svcollege:student-export:strict`
- `npm run svcollege:pwa-offline:strict`
- `npm run svcollege:accessibility:strict`
- `npm run exam:accessibility:strict`
- `npm run performance:budget:strict`
- `npm run pilot:readiness:strict`
- `npm test -- --run`
- `npm run build`

## Manual Review

- QA evidence exists for question quality and distractors.
- smoke tests were run for top tabs, critical flows, offline cache and full portal readiness.
- cache version was bumped when app, style or cached data changed.
- rollback path is known: previous build, previous cache version and export backup.
- Documentation is current: pilot plan, teacher kit, privacy policy and support workflow.

## Current Release State

Status: `unknown/unavailable` until the required gates are run in the final release pass.
