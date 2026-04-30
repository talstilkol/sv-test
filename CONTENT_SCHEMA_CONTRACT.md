# Content Schema Contract

Date: 2026-04-29

This contract defines the canonical learner-content shapes used by the SVCollege portal. The machine-readable source is `src/core/content-schema-contract.js`; strict validation remains in `npm run validate:strict`, `npm run qa:questions:strict`, and `npm run questions:coverage-targets:strict`.

## Entities

| Entity | Identity | Required fields |
|---|---|---|
| Lesson | `id` | `id`, `title`, `concepts` |
| Concept | `lesson.id + conceptName` | `conceptName`, `levels`, `difficulty` |
| MCQuestion | `id` | `id`, `conceptKey`, `question`, `options`, `correctIndex`, `explanation` |
| FillQuestion | `id` | `id`, `conceptKey`, `code`, `answer`, `explanation` |
| TraceQuestion | `id` | `id`, `conceptKey`, `title`, `code`, `steps`, `explanation` |
| BugQuestion | `id` | `id`, `conceptKey`, `title`, `brokenCode`, `options`, `correctIndex`, `fix`, `explanation` |
| BuildQuestion | `id` | `id`, `conceptKey`, `title`, `prompt`, `starter`, `reference`, `tests`, `explanation` |

## Invariants

- Every question-like entity must have a stable `id`; duplicate IDs are invalid.
- Every learner-routed question must carry `conceptKey` in the format `lessonId::conceptName`.
- MC options must contain exactly four entries and `correctIndex` must be `0..3`.
- Fill questions must contain exactly one `____` blank marker.
- Trace questions must contain ordered `steps`; each step is part of the mastery proof route.
- Build questions must use deterministic regex tests; no generated runtime randomness is allowed.
- Hard or complex SVCollege questions must carry prerequisite/term aid through `qa:questions:strict`.
- Live-bank MC coverage requires per-option feedback through the feature coverage gate.

## Current Gates

- `npm run validate:strict` validates bank structure, IDs, option counts, fill blanks, concept keys and density.
- `npm run qa:questions:strict` validates prerequisite metadata for hard/complex SVCollege questions.
- `npm run questions:coverage-targets:strict` validates ≥3 live MC per concept and ≥2 live Fill per code concept.
- `npm run coverage:features:strict` validates full per-distractor feedback coverage.

## Next Runtime Step

P5.4.2 adds loader-time validation with a soft learner-facing error panel. This contract is the stable source that the runtime validator should use.
