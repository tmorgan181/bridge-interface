# Contract: Home Page

**Type**: Static Page  
**URL**: `/`  
**Layout**: `home`  
**Status**: Phase 1

---

## Purpose

The home page introduces visitors to The Bridge, explains the mission, and provides clear navigation to blog content, about information, and Atrium overview.

---

## Content Requirements

### Hero Section
- **Heading**: "The Bridge" (h1)
- **Tagline**: "Where AI conversation research meets ordinary humans" or similar accessible language
- **Mission statement**: 2-3 sentences explaining the honest middle ground between AI hype and dismissiveness
- **Primary CTA**: Link to latest blog posts ("Read the Blog" or "Explore Research")
- **Secondary CTA**: Link to About page ("Learn More About The Bridge")

### Value Propositions (3 blocks)
1. **Accessible**
   - Icon or visual indicator
   - Heading: "Plain English, No Jargon"
   - Description: Brief explanation of accessibility-first approach
   
2. **Practical**
   - Icon or visual indicator
   - Heading: "Real Examples, Real Patterns"
   - Description: Brief explanation of concrete examples from Atrium
   
3. **Honest**
   - Icon or visual indicator
   - Heading: "The Middle Ground"
   - Description: Brief explanation of balanced perspective

### Recent Posts Section
- **Heading**: "Latest from The Bridge" (h2)
- **Post list**: Display 3 most recent blog posts using `post-card` component
- **CTA**: "View All Posts" link to `/posts/`

### Atrium Connection
- **Heading**: "About The Atrium" (h2)
- **Description**: 2-3 sentences introducing The Atrium research facility
- **CTA**: "Learn More" link to `/atrium/`

---

## Functional Requirements

### FR-HOME-001: Page Structure
The home page MUST use semantic HTML with proper landmark roles:
- `<header>` with site navigation
- `<main>` with page content
- `<footer>` with site footer

### FR-HOME-002: Hero Visibility
The hero section MUST be visible above the fold on desktop (1920x1080) and mobile (375x667) viewports.

### FR-HOME-003: Recent Posts
The page MUST display the 3 most recent published blog posts from `site.posts` collection, ordered by date descending.

### FR-HOME-004: Navigation
All CTAs and links MUST use clear, actionable text (no "Click here" or "Learn more" without context).

### FR-HOME-005: Responsive Layout
Content MUST adapt to viewport:
- Mobile: Single column, stacked sections
- Tablet: 2-column value propositions
- Desktop: 3-column value propositions

---

## Accessibility Requirements

### ACC-HOME-001: Heading Hierarchy
- Single h1 ("The Bridge")
- h2 for major sections (Latest Posts, About Atrium)
- h3 for value proposition headings
- No skipped heading levels

### ACC-HOME-002: Skip Link
Page MUST include a skip link to main content (`<a href="#main">Skip to main content</a>`) as first focusable element.

### ACC-HOME-003: Keyboard Navigation
All interactive elements (links, buttons) MUST be reachable via keyboard Tab navigation in logical order.

### ACC-HOME-004: Focus Indicators
All focusable elements MUST have visible focus indicators meeting WCAG contrast requirements.

---

## Performance Requirements

### PERF-HOME-001: Above-the-Fold Content
Critical CSS for above-the-fold content MUST be inlined or loaded synchronously.

### PERF-HOME-002: Images
All images MUST have:
- Appropriate size/resolution for viewport
- WebP format with JPEG/PNG fallback
- Lazy loading for below-the-fold images
- Explicit width/height attributes to prevent layout shift

### PERF-HOME-003: Page Weight
Total page size MUST be <300KB (HTML + CSS + critical JS + above-fold images).

---

## Visual Design Requirements

### DESIGN-HOME-001: Design Tokens
All colors, typography, and spacing MUST use design tokens from `_tokens.scss`.

### DESIGN-HOME-002: Mobile-First
Layout MUST be designed mobile-first, with progressive enhancement for larger viewports.

### DESIGN-HOME-003: Whitespace
Sections MUST have adequate spacing (minimum `var(--space-lg)` between major sections).

---

## Content Validation

**Required Elements**:
- [ ] Hero section with h1, tagline, mission statement
- [ ] 3 value proposition blocks
- [ ] 3 recent posts displayed with post-card component
- [ ] Atrium connection section
- [ ] Clear CTAs throughout

**Quality Checks**:
- [ ] All text uses plain English (no unexplained jargon)
- [ ] Mission statement aligns with constitutional principles
- [ ] CTAs are actionable and specific
- [ ] Responsive layout works on mobile, tablet, desktop

---

## Test Scenarios

### Test 1: First Visit Experience
**Given** a visitor arrives at `/` for the first time  
**When** the page loads  
**Then** they should see:
- Clear site branding ("The Bridge")
- Understandable mission statement
- Path to recent content (blog posts)
- Way to learn more (About link)

### Test 2: Recent Posts Display
**Given** there are at least 3 published blog posts  
**When** the home page renders  
**Then** the 3 most recent posts should be displayed with title, date, and excerpt

### Test 3: Navigation Clarity
**Given** a visitor wants to explore the site  
**When** they view the home page  
**Then** clear navigation options should be available (header nav + CTAs)

### Test 4: Mobile Responsiveness
**Given** a visitor on mobile device (375px width)  
**When** they view the home page  
**Then** content should be readable, tap targets >=44px, no horizontal scroll

### Test 5: Keyboard Navigation
**Given** a keyboard-only user  
**When** they navigate the home page  
**Then** all links and interactive elements should be reachable via Tab, with visible focus

---

## Implementation Notes

**Frontmatter**:
```yaml
---
layout: home
title: "The Bridge - AI Research for Ordinary Humans"
description: "The Bridge makes AI conversation research accessible, practical, and honest. Explore patterns from The Atrium research facility."
permalink: /
---
```

**Components to Use**:
- `{% include header.html %}`
- `{% include post-card.html post=post %}` (loop over `site.posts | limit: 3`)
- `{% include footer.html %}`

**Liquid Logic**:
```liquid
{% for post in site.posts limit:3 %}
  {% include post-card.html post=post %}
{% endfor %}
```

---

## Success Criteria

✅ Page loads in <2s on 3G  
✅ Lighthouse accessibility score 100/100  
✅ All content visible without JavaScript  
✅ Mobile and desktop layouts work correctly  
✅ Recent posts display dynamically  
✅ Clear path to blog content and About page  

---
