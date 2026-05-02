# Payload Optimization Plan — Post Finish Line 1

> **Status**: Planned (Post Finish Line 1)  
> **Date**: 2026-05-01  
> **Current State**: Build passes but produces large bundles  
> **Trigger**: After `questions:coverage-targets:strict` passes

## Current Bundle Sizes

| Asset | Size | Target |
|-------|------|--------|
| `dist/assets/index-*.css` | 465.34 KB | < 200 KB |
| `dist/index.html` | 102.10 KB | < 50 KB |
| `dist/assets/core-*.js` | 141.36 KB | < 100 KB |
| **Total** | ~708 KB | < 350 KB |

## Optimization Strategy

### Phase 1: CSS Code Splitting by Feature

**Current**: Single global stylesheet
**Target**: Feature-based CSS chunks

```
style.css (current 465KB)
  ↓
core.css (30KB) — Reset, variables, utilities
layout.css (40KB) — Grid, flex, chrome, navigation
lesson.css (60KB) — Lesson view, concepts, cards
quiz.css (40KB) — Questions, feedback, scoring
components.css (50KB) — Modals, forms, buttons
views/*.css (per view) — Lazy loaded
```

**Implementation**:
```javascript
// vite.config.js
export default {
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'lesson-styles': ['./src/styles/lesson.css'],
          'quiz-styles': ['./src/styles/quiz.css'],
        }
      }
    }
  }
}
```

### Phase 2: JavaScript Module Splitting

**Current**: `app.js` is 35,611 lines
**Target**: Modular chunks loaded on demand

| Chunk | Size Estimate | Loaded On |
|-------|--------------|-----------|
| `core.js` (existing) | 141 KB | Always |
| `lesson-view.js` | ~80 KB | Opening lesson |
| `quiz-engine.js` | ~60 KB | First question |
| `knowledge-map.js` | ~40 KB | Opening map |
| `trainer.js` | ~50 KB | Opening trainer |
| `exam-mode.js` | ~70 KB | Starting exam |

### Phase 3: HTML Size Reduction

**Current**: 102 KB (inline data/scripts)
**Target**: < 50 KB

**Actions**:
1. Move `LESSONS_DATA` to lazy-loaded JSON
2. Extract inline styles to CSS files
3. Remove unused meta tags
4. Compress inline SVG icons

### Phase 4: Asset Optimization

| Asset Type | Current | Optimization |
|------------|---------|--------------|
| Fonts | Google Fonts | Self-host subset |
| Icons | Inline SVG | Sprite sheet |
| Images | None currently | WebP for any added |

## Implementation Plan

### Week 1: CSS Splitting
- [ ] Identify CSS usage per view
- [ ] Create feature-based CSS files
- [ ] Update Vite config for CSS code split
- [ ] Add smoke test: CSS loads correctly

### Week 2: JS Modularization
- [ ] Extract lesson renderer
- [ ] Extract quiz engine
- [ ] Extract knowledge map
- [ ] Add dynamic imports

### Week 3: HTML Optimization
- [ ] Lazy load LESSONS_DATA
- [ ] Remove inline bloat
- [ ] Test initial load time

### Week 4: Polish & Monitoring
- [ ] Add bundle size monitoring
- [ ] Create performance budget
- [ ] Document chunk strategy

## Performance Budget

| Metric | Current | Target | Enforcement |
|--------|---------|--------|-------------|
| First Contentful Paint | Unknown | < 1.5s | Lighthouse CI |
| Time to Interactive | Unknown | < 3s | Lighthouse CI |
| Total Bundle | ~708 KB | < 350 KB | Build gate |
| CSS (initial) | 465 KB | < 100 KB | Build gate |
| JS (initial) | 141 KB | < 150 KB | Build gate |

## Verification Commands

```bash
# Check bundle sizes
npm run build
npm run analyze:bundle

# Performance audit
npm run lighthouse:ci

# Size gate
npm run test:bundle-size
```

## Dependencies

- Finish Line 1 complete (questions coverage)
- Modularization complete (P3.10.3)
- Vite migration stable (AUDIT-FIX-28)

## Risks

| Risk | Mitigation |
|------|------------|
| Breaking PWA offline | Test service-worker cache strategy |
| Slower view switching | Preload critical chunks |
| Increased complexity | Document chunk dependencies |

## Non-Goals

- Server-side rendering (SSR) — out of scope
- Image optimization — no images currently
- HTTP/3 push — CDN dependent
