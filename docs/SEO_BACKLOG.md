# SEO Backlog — Post Finish Line 1

> **Status**: Backlog (not blocking Finish Line 1)  
> **Date**: 2026-05-01  
> **Priority**: P2 (post-exam release)  
> **Policy**: SEO improvements only after SVCollege exam prep is complete.

## Goals

- Improve search engine discoverability
- Enable social sharing with rich previews
- Support Hebrew/RTL SEO best practices

## Tasks

### Phase 1: Basic Meta Tags (Must Have)
- [ ] Add `<meta name="description">` to all main views
- [ ] Add `<meta name="keywords">` for lesson/concept pages
- [ ] Add Open Graph (OG) tags: `og:title`, `og:description`, `og:image`
- [ ] Add Twitter Card tags: `twitter:card`, `twitter:title`, `twitter:description`
- [ ] Add canonical URLs for duplicate content prevention

### Phase 2: Structured Data (Should Have)
- [ ] Add JSON-LD for Course schema (schema.org/Course)
- [ ] Add JSON-LD for Lesson schema (schema.org/LearningResource)
- [ ] Add JSON-LD for FAQ schema for common questions
- [ ] Add breadcrumb structured data

### Phase 3: Technical SEO (Nice to Have)
- [ ] Generate sitemap.xml dynamically from LESSONS_DATA
- [ ] Add robots.txt with crawl directives
- [ ] Implement lazy loading for images with proper alt text
- [ ] Add hreflang tags if multi-language support added

## Implementation Notes

### Dynamic Meta Tags
Meta tags should update dynamically based on current view:

```javascript
// Example: Update meta when switching lessons
function updateLessonMeta(lesson) {
  document.title = `${lesson.title} — LumenPortal`;
  
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = lesson.oneLiner || lesson.shortDescription;
  }
  
  // Update OG tags
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', lesson.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', lesson.oneLiner);
}
```

### Hebrew/RTL Considerations
- Ensure OG/Twitter tags handle Hebrew text correctly
- Test social previews on WhatsApp, Facebook, Twitter
- Use UTF-8 encoding consistently

## Verification

```bash
# Test meta tags
npm run seo:validate

# Test structured data
npm run seo:jsonld-validate

# Preview social cards
npm run seo:social-preview
```

## Non-Blocking Policy

This backlog is explicitly marked as **not blocking** Finish Line 1:
- Exam preparation takes priority
- SEO does not affect core learning functionality
- Implementation can be incremental post-release
