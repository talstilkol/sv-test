# Session Integration - Next.js

## Scope

Finish Line 1 module: `פיתוח Full-Stack עם Next.js - SSR, API Routes, SEO`.

Canonical lesson id: `lesson_nextjs`.

Global lesson: `LESSON_NEXTJS`.

## Files

- `data/lesson_nextjs.js`
- `data/svcollege_questions_nextjs.js`
- `data/svcollege_traces_nextjs.js`
- `data/svcollege_builds_nextjs.js`
- `data/svcollege_prerequisites_nextjs.js`
- `tests/svcollege-nextjs-content.test.js`

## Coverage

- 18 concepts: Next.js, App Router, file-system routing, dynamic route, layout, page, server component, client component, route handler, API route, server action, SSR, SSG, ISR, metadata API, SEO, image optimization, Vercel deploy.
- 28 MC questions.
- 10 Fill questions.
- 3 Code Trace activities.
- 3 Mini Build activities.
- 3 Bug Hunt activities.
- Prerequisite bridge for every concept.
- Every practice item includes `conceptKey`, `requiredConcepts`, `requiredTerms` and `sideExplanation`.

## Required Script Order

Add lesson after Auth and before React lessons:

```html
<script src="data/lesson_nextjs.js?v=svcollege-nextjs-v1"></script>
```

Add traces after Auth traces:

```html
<script src="data/svcollege_traces_nextjs.js?v=svcollege-nextjs-v1"></script>
```

Add MC/Fill/Bug after Auth questions:

```html
<script src="data/svcollege_questions_nextjs.js?v=svcollege-nextjs-v1"></script>
```

Add Mini Build after Auth builds:

```html
<script src="data/svcollege_builds_nextjs.js?v=svcollege-nextjs-v1"></script>
```

Add prerequisites after Auth prerequisites:

```html
<script src="data/svcollege_prerequisites_nextjs.js?v=svcollege-nextjs-v1"></script>
```

## Validation

```bash
node --check data/lesson_nextjs.js
node --check data/svcollege_questions_nextjs.js
node --check data/svcollege_traces_nextjs.js
node --check data/svcollege_builds_nextjs.js
node --check data/svcollege_prerequisites_nextjs.js
node --check tests/svcollege-nextjs-content.test.js
npm test -- --run tests/svcollege-nextjs-content.test.js tests/no-native-random.test.js
npm run svcollege:readiness:write
npm run build
```

## Coordinator Notes

- Mark the Next.js module `covered` only after `lesson_nextjs` is wired into `index.html`, `content-loader.js`, offline cache, readiness, command center and `COURSE_BLUEPRINTS`.
- Keep the active portal scoped to `SVCollege — קורס AI & Full Stack` only.
- Do not move any non-SVCollege course mapping into the active portal.
