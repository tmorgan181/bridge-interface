# Contract: Individual Blog Post Page

**Type**: Blog Post  
**URL**: `/posts/:slug/`  
**Layout**: `post`  
**Status**: Phase 1

---

## Purpose

Display a single blog post with full content, metadata, and navigation to related posts.

---

## Content Requirements

### Post Header
- **Post Title**: From frontmatter `title` (h1)
- **Publication Date**: Formatted as "Month DD, YYYY" with semantic `<time>` element
- **Author Name**: From frontmatter `author`
- **Tags**: Optional tag list if present in frontmatter

### Post Content
- **Markdown Content**: Rendered HTML from post markdown
- **Proper Typography**: Headings (h2-h4), paragraphs, lists, blockquotes, code blocks
- **Featured Image**: If `image` in frontmatter, display at top

### Post Footer
- **Share Links**: (Phase 2 - placeholder only in Phase 1)
- **Related Posts**: (Phase 2 - placeholder only in Phase 1)

---

## Functional Requirements

### FR-POST-001: Content Rendering
Post markdown MUST be rendered as semantic HTML with:
- Proper heading hierarchy (h2-h4 in content)
- Syntax highlighting for code blocks
- Responsive images
- Accessible tables (if present)

### FR-POST-002: Metadata Display
Post MUST display publication date in human-readable format with machine-readable datetime attribute.

### FR-POST-003: Navigation
Post MUST include navigation back to blog index ("← All Posts" link).

### FR-POST-004: SEO Meta Tags
Post MUST include proper meta tags (via `meta.html` component):
- Title tag
- Meta description (from excerpt or auto-generated)
- Open Graph tags for social sharing
- Canonical URL

---

## Accessibility Requirements

### ACC-POST-001: Heading Hierarchy
- h1 for post title
- h2-h4 for content headings (author-controlled in markdown)
- No skipped levels

### ACC-POST-002: Time Element
Publication date MUST use semantic `<time>` with `datetime` attribute.

### ACC-POST-003: Code Blocks
Code blocks MUST have proper language annotation and be keyboard accessible.

### ACC-POST-004: Images
All images in content MUST have descriptive alt text.

---

## Performance Requirements

### PERF-POST-001: Content Images
Images in post content MUST be:
- Optimized (WebP with fallback)
- Lazy loaded (below the fold)
- Properly sized for responsive viewports

### PERF-POST-002: Reading Experience
Typography MUST be optimized for readability:
- Line length: 50-75 characters
- Line height: 1.5-1.8
- Adequate paragraph spacing

---

## Test Scenarios

### Test 1: Post Display
**Given** a published blog post exists  
**When** visiting `/posts/post-slug/`  
**Then** the full post content should be displayed with title, date, author, and formatted content

### Test 2: Markdown Rendering
**Given** post content includes headings, lists, code blocks, and images  
**When** the post renders  
**Then** all markdown should convert to proper semantic HTML

### Test 3: Back Navigation
**Given** viewing a blog post  
**When** clicking the back link  
**Then** navigate to `/posts/` blog index

### Test 4: Reading Experience
**Given** post content of 1000+ words  
**When** reading on mobile and desktop  
**Then** typography should be comfortable and accessible

---

## Implementation

**Layout Structure** (`_layouts/post.html`):
```liquid
---
layout: default
---
<article class="post">
  <header class="post-header">
    <h1 class="post-title">{{ page.title }}</h1>
    <div class="post-meta">
      <time datetime="{{ page.date | date_to_xmlschema }}">
        {{ page.date | date: "%B %d, %Y" }}
      </time>
      <span class="post-author">by {{ page.author }}</span>
    </div>
    {% if page.tags %}
      <ul class="post-tags">
        {% for tag in page.tags %}
          <li>{{ tag }}</li>
        {% endfor %}
      </ul>
    {% endif %}
  </header>
  
  <div class="post-content">
    {{ content }}
  </div>
  
  <footer class="post-footer">
    <a href="/posts/" class="back-link">← All Posts</a>
  </footer>
</article>
```

**Frontmatter Example**:
```yaml
---
layout: post
title: "Understanding AI Collaboration Patterns"
date: 2025-01-20
author: "Trenton Morgan"
excerpt: "Real examples from The Atrium showing how humans and AI collaborate effectively."
tags: [patterns, collaboration, atrium]
---
```

---
