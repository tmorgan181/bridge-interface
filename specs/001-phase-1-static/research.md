# Phase 0: Research - Phase 1 Static Jekyll Blog

**Feature**: Phase 1 Static Jekyll Blog  
**Date**: 2025-10-02  
**Status**: Complete

---

## Research Overview

This document captures technical decisions, rationale, and alternatives considered for the Phase 1 static Jekyll blog implementation.

---

## Decision 1: Static Site Generator Choice

**Decision**: Use Jekyll 4.x as the static site generator

**Rationale**:
- **GitHub Pages native support**: Zero-config deployment to GitHub Pages
- **Mature ecosystem**: Extensive documentation, plugins, and community support
- **Markdown-native**: First-class markdown support aligns with content-first approach
- **Liquid templating**: Simple, powerful templating that maps cleanly to component-based thinking
- **Ruby familiarity**: Well-established Ruby ecosystem with Bundler for dependency management
- **Build performance**: Fast builds for content-focused sites (10-100 posts)
- **Constitutional alignment**: Simple to use, powerful enough for future needs

**Alternatives Considered**:
- **Hugo**: Faster builds, but more complex templating (Go templates) and less GitHub Pages integration
- **Eleventy (11ty)**: Modern, flexible, but less mature ecosystem and requires manual deployment setup
- **Gatsby**: Powerful React-based, but excessive complexity for Phase 1 static content (violates "Build Simple" principle)
- **Next.js Static Export**: Future-proof for Phase 3, but overkill for Phase 1 content needs

**Trade-offs Accepted**:
- Ruby dependency (requires Ruby installed for local development)
- Slower builds than Hugo at very large scale (not a concern for Phase 1 scope)

---

## Decision 2: Design Token Strategy

**Decision**: Use CSS custom properties (CSS variables) defined in SCSS partials, with YAML data file for documentation

**Rationale**:
- **Browser native**: CSS custom properties work in all modern browsers, no build-time required
- **Runtime flexibility**: Can be updated dynamically (useful for Phase 2+ features like dark mode)
- **Framework portable**: Easy to extract to JSON/JS for future React/Vue migration
- **Developer experience**: SCSS provides organization and maintainability during Phase 1
- **Documentation**: YAML file in `_data/` provides single source of truth for design system docs

**Implementation Approach**:
```scss
// _sass/_tokens.scss
:root {
  // Colors
  --color-primary: #2E5266;
  --color-accent: #6E8898;
  --color-text: #1A1A1A;
  --color-background: #FFFFFF;
  
  // Typography
  --font-base: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-size-base: 1rem;
  --font-size-scale: 1.25;
  
  // Spacing (4px base)
  --space-xs: 0.25rem;  // 4px
  --space-sm: 0.5rem;   // 8px
  --space-md: 1rem;     // 16px
  --space-lg: 2rem;     // 32px
  --space-xl: 4rem;     // 64px
}
```

**Alternatives Considered**:
- **SCSS variables only**: Not runtime-flexible, harder to migrate
- **Tailwind CSS**: Too opinionated, utility-first conflicts with component thinking
- **JSON config with build-time processing**: Adds complexity without Phase 1 benefit

---

## Decision 3: Component Architecture Pattern

**Decision**: Jekyll includes as pseudo-components with frontmatter-style "props"

**Rationale**:
- **Component thinking**: Trains mental model for future React/Vue migration
- **Reusability**: DRY principle across layouts
- **Maintainability**: Single source of truth for UI patterns
- **Clear mapping**: Include parameters → React props (nearly 1:1 correspondence)

**Implementation Pattern**:
```liquid
<!-- _includes/post-card.html -->
{% comment %}
  Props: post (object)
{% endcomment %}
<article class="post-card">
  <h2 class="post-card__title">
    <a href="{{ post.url }}">{{ post.title }}</a>
  </h2>
  <time class="post-card__date">{{ post.date | date: "%B %d, %Y" }}</time>
  <p class="post-card__excerpt">{{ post.excerpt }}</p>
</article>

<!-- Usage in layout -->
{% for post in site.posts %}
  {% include post-card.html post=post %}
{% endfor %}
```

**Migration Path to React**:
```jsx
// Future: components/PostCard.jsx
export function PostCard({ post }) {
  return (
    <article className="post-card">
      <h2 className="post-card__title">
        <a href={post.url}>{post.title}</a>
      </h2>
      <time className="post-card__date">{formatDate(post.date)}</time>
      <p className="post-card__excerpt">{post.excerpt}</p>
    </article>
  );
}
```

**Alternatives Considered**:
- **Monolithic layouts**: No reusability, hard to migrate
- **Custom Jekyll plugins**: Unnecessary complexity, reduces portability

---

## Decision 4: Accessibility Testing Strategy

**Decision**: Automated testing with axe + lighthouse, manual testing with screen readers

**Rationale**:
- **Automated coverage**: Catch 80% of issues automatically in CI
- **Manual validation**: Screen reader testing catches real user experience issues
- **Performance baseline**: Lighthouse provides measurable targets
- **WCAG compliance**: axe specifically tests against WCAG 2.1 AA criteria

**Testing Workflow**:
1. **Development**: Browser devtools accessibility panel (Chrome/Firefox)
2. **CI/CD**: Lighthouse CI in GitHub Actions (performance + accessibility)
3. **Pre-release**: Manual screen reader testing (NVDA on Windows, VoiceOver on Mac)
4. **Validation tools**: WAVE browser extension, axe DevTools

**Metrics to Track**:
- Lighthouse accessibility score: 100/100 target
- WCAG AA compliance: Zero violations
- Keyboard navigation: All interactive elements reachable
- Color contrast: Minimum 4.5:1 for normal text, 3:1 for large text

**Alternatives Considered**:
- **Manual only**: Not scalable, misses regressions
- **Automated only**: Misses real user experience issues
- **Third-party services** (like Pa11y): Adds cost and complexity for Phase 1

---

## Decision 5: Performance Optimization Strategy

**Decision**: Image optimization + minimal CSS/JS + static asset caching

**Rationale**:
- **Biggest impact**: Images typically 80%+ of page weight
- **Low complexity**: Jekyll plugins handle optimization automatically
- **Progressive enhancement**: Core content loads first, enhancements deferred
- **Caching strategy**: Long-lived static assets with content-based hashing

**Implementation**:
- **Images**: jekyll-compress-images plugin, WebP with fallbacks, lazy loading
- **CSS**: SCSS minification, critical CSS inline, rest deferred
- **JS**: Minimal vanilla JS, async loading, no blocking scripts
- **Fonts**: System font stack (no web fonts in Phase 1)
- **CDN**: GitHub Pages/Netlify built-in CDN

**Performance Targets**:
- First Contentful Paint: <1s
- Time to Interactive: <2s on 3G
- Lighthouse Performance: 90+
- Total page size: <500KB (including images)

**Alternatives Considered**:
- **Web fonts**: Adds 100-200KB and render blocking (defer to Phase 2 if needed)
- **Custom CDN**: Unnecessary complexity for Phase 1 traffic
- **Service worker**: Overkill for static content, adds complexity

---

## Decision 6: Deployment Strategy

**Decision**: GitHub Actions → GitHub Pages with custom domain support

**Rationale**:
- **Zero cost**: GitHub Pages free for public repos
- **Simple workflow**: Push to main → auto-deploy
- **Custom domain**: Support for bridge.atrium.dev or similar
- **HTTPS by default**: GitHub Pages provides free SSL
- **Rollback capability**: Git history enables easy rollback

**Workflow**:
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: ruby/setup-ruby@v1
      - run: bundle install
      - run: bundle exec jekyll build
      - uses: peaceiris/actions-gh-pages@v3
```

**Alternatives Considered**:
- **Netlify**: More flexible, but GitHub Pages simpler for Phase 1
- **Vercel**: Excellent, but optimized for Next.js (future phase)
- **AWS S3 + CloudFront**: Enterprise-grade, but unnecessary complexity and cost

---

## Decision 7: Content Strategy for Sample Posts

**Decision**: Create 3 sample posts demonstrating different content patterns

**Sample Post Topics**:
1. **Welcome to The Bridge** - Introduces mission, explains Atrium connection, sets tone
2. **The Honest Middle Ground** - Demonstrates "neither hype nor dismissiveness" principle
3. **AI Collaboration Patterns from The Atrium** - Shows concrete example with real conversation excerpts

**Rationale**:
- Demonstrates full content rendering capabilities
- Tests different markdown features (code blocks, images, blockquotes)
- Validates design system with real content
- Provides content model for future posts

**Frontmatter Template**:
```yaml
---
layout: post
title: "Post Title"
date: 2025-01-15
author: "Author Name"
tags: [ai-research, patterns, atrium]
excerpt: "Brief description for post cards and SEO"
---
```

---

## Decision 8: URL Structure Implementation

**Decision**: Jekyll permalink configuration with future-proof routing

**Permalink Strategy**:
- Posts: `/posts/:year/:month/:day/:title/` → redirect to `/posts/:slug/` (Phase 2)
- Phase 1 simple: `/posts/:title/` (slug from filename)
- Pages: `/about/`, `/atrium/`, etc. (clean URLs)
- Reserved: `/demos/`, `/api/`, `/portal/`, `/explore/` (empty directories with placeholder)

**Configuration**:
```yaml
# _config.yml
permalink: /posts/:title/
collections_dir: blog
```

**Rationale**:
- Clean, readable URLs
- No file extensions (.html)
- Stable across phases (no breaking changes)
- Reserved paths prevent future conflicts

---

## Technical Stack Summary

**Core Technologies**:
- Jekyll 4.3+ (static site generator)
- Ruby 3.x (Jekyll runtime)
- Liquid (templating)
- SCSS (styling)
- Markdown (content format)
- HTML5 (semantic markup)
- CSS custom properties (design tokens)
- Vanilla JavaScript (minimal, progressive)

**Jekyll Plugins**:
- jekyll-feed (RSS feed generation)
- jekyll-seo-tag (SEO meta tags)
- jekyll-sitemap (sitemap.xml generation)
- jekyll-compress-images (image optimization)

**Development Tools**:
- Bundler (Ruby dependency management)
- GitHub Actions (CI/CD)
- Lighthouse CI (performance + accessibility testing)
- axe DevTools (accessibility validation)

**Hosting**:
- GitHub Pages (primary)
- Netlify (alternative fallback)

---

## Open Questions / Future Research

**For Phase 2**:
- Comment system integration options (GitHub Discussions? Disqus alternatives?)
- Search implementation (Lunr.js? Algolia?)
- Interactive demo embedding strategy

**For Phase 3**:
- Bridge API architecture (GraphQL vs REST?)
- Authentication provider (Auth0? Firebase? Custom?)
- Framework migration path (Next.js? Astro? Remix?)

**Deferred to Later**:
- Analytics provider choice (defer until traffic warrants)
- Newsletter integration (defer until audience established)
- Multi-language support (defer until content volume justifies)

---

## Research Status

✅ All Technical Context items resolved (no NEEDS CLARIFICATION remaining)  
✅ Tech stack decisions documented with rationale  
✅ Alternatives evaluated and trade-offs understood  
✅ Performance and accessibility strategies defined  
✅ Deployment pipeline designed  
✅ Ready for Phase 1 (Design & Contracts)

---
