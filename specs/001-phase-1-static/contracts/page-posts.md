# Contract: Blog Index Page

**Type**: Static Page  
**URL**: `/posts/`  
**Layout**: `page`  
**Status**: Phase 1

---

## Purpose

Display a complete, chronologically ordered list of all published blog posts with filtering and navigation capabilities.

---

## Content Requirements

- **Page Title**: "Blog Posts" or "Latest Research" (h1)
- **Introduction**: 1-2 sentences about content focus
- **Post List**: All published posts in reverse chronological order (newest first)
- **Pagination**: If >20 posts, paginate (Phase 2 enhancement)

---

## Functional Requirements

### FR-POSTS-001: Post Listing
Page MUST display all posts from `site.posts` where `published: true`, ordered by date descending.

### FR-POSTS-002: Post Card Display
Each post MUST be rendered using the `post-card.html` component showing title, date, excerpt.

### FR-POSTS-003: Post Links
Each post card MUST link to the full post at `/posts/:slug/`.

### FR-POSTS-004: Empty State
If no posts exist, display a friendly message (unlikely in production, but handle gracefully).

---

## Accessibility Requirements

### ACC-POSTS-001: Heading Structure
- h1 for page title
- h2 for each post title (within post-card component)

### ACC-POSTS-002: List Semantics
Posts MUST be contained in a `<ul>` or `<div>` with appropriate role for screen readers.

---

## Visual Design

- Posts displayed in single column (mobile) or grid (desktop 2-3 columns)
- Adequate spacing between posts (`var(--space-lg)`)
- Consistent card styling via `post-card` component

---

## Test Scenarios

### Test 1: All Posts Display
**Given** 5 published blog posts exist  
**When** visiting `/posts/`  
**Then** all 5 posts should be visible in reverse chronological order

### Test 2: Post Card Interaction
**Given** viewing the blog index  
**When** clicking a post card title  
**Then** navigate to the full post page

---

## Implementation

**Frontmatter**:
```yaml
---
layout: page
title: "Blog Posts"
permalink: /posts/
description: "Explore AI conversation research made accessible - patterns, examples, and insights from The Atrium."
---
```

**Liquid Template**:
```liquid
<ul class="post-list">
  {% for post in site.posts %}
    <li>
      {% include post-card.html post=post %}
    </li>
  {% endfor %}
</ul>
```

---
