# Data Model - Phase 1 Static Jekyll Blog

**Feature**: Phase 1 Static Jekyll Blog  
**Date**: 2025-10-02  
**Status**: Complete

---

## Overview

Phase 1 uses Jekyll's built-in data model with frontmatter-driven content. There is no database - all data exists as structured markdown files with YAML frontmatter. This document defines the content schema, validation rules, and relationships.

---

## Entity 1: Blog Post

**Represents**: Individual content pieces about AI conversation research

**Storage**: Markdown files in `blog/_posts/` directory with naming convention `YYYY-MM-DD-title-slug.md`

**Frontmatter Schema**:
```yaml
---
layout: post                    # REQUIRED: Template to use (must be 'post')
title: "Title of the Post"      # REQUIRED: Display title (string, 1-100 chars)
date: 2025-01-15                # REQUIRED: Publication date (YYYY-MM-DD format)
author: "Author Name"           # REQUIRED: Post author (string, 1-50 chars)
excerpt: "Brief description"    # OPTIONAL: SEO and card preview (string, 50-200 chars)
tags: [tag1, tag2, tag3]        # OPTIONAL: Post categorization (array of strings)
image: /assets/images/post.jpg  # OPTIONAL: Featured image path (string)
published: true                 # OPTIONAL: Draft status (boolean, defaults to true)
---

Markdown content goes here...
```

**Validation Rules**:
- Filename MUST match pattern: `YYYY-MM-DD-slug.md`
- `layout` MUST be exactly "post"
- `title` REQUIRED, length 1-100 characters
- `date` REQUIRED, must be valid ISO date (YYYY-MM-DD)
- `author` REQUIRED, length 1-50 characters
- `excerpt` if present, length 50-200 characters (auto-generated if missing)
- `tags` if present, array of 1-10 lowercase-hyphenated strings
- `published: false` marks as draft (excluded from production build)

**Jekyll Computed Fields**:
- `post.url` - Generated permalink: `/posts/title-slug/`
- `post.content` - Rendered HTML from markdown
- `post.excerpt` - Auto-extracted from content if not in frontmatter
- `post.id` - Unique identifier derived from path
- `post.categories` - Derived from directory structure (not used in Phase 1)

**Relationships**:
- **Has many** Tags (implicit through tags array)
- **Belongs to** Author (string reference, not normalized in Phase 1)

**Example**:
```yaml
---
layout: post
title: "Welcome to The Bridge"
date: 2025-01-15
author: "Trenton Morgan"
excerpt: "Introducing The Bridge - where AI conversation research meets ordinary humans."
tags: [introduction, atrium, mission]
image: /assets/images/welcome.jpg
---

## The Beginning

Content here with **markdown** formatting...
```

---

## Entity 2: Static Page

**Represents**: Permanent informational pages (About, Atrium overview, Home)

**Storage**: Markdown or HTML files in `blog/pages/` or `blog/` root

**Frontmatter Schema**:
```yaml
---
layout: page                    # REQUIRED: Template to use ('page', 'home', 'default')
title: "Page Title"             # REQUIRED: Display title (string, 1-100 chars)
permalink: /about/              # REQUIRED: URL path (string, must start/end with /)
description: "SEO description"  # OPTIONAL: Meta description (string, 50-160 chars)
---

Page content...
```

**Validation Rules**:
- `layout` REQUIRED, must be one of: page, home, default
- `title` REQUIRED, length 1-100 characters
- `permalink` REQUIRED, format: `/path/` (leading and trailing slashes)
- `description` if present, length 50-160 characters

**Jekyll Computed Fields**:
- `page.url` - Matches permalink
- `page.content` - Rendered HTML

**Relationships**:
- Referenced by navigation (via `_data/navigation.yml`)

**Example**:
```yaml
---
layout: page
title: "About The Bridge"
permalink: /about/
description: "Learn about The Bridge - the public portal to The Atrium research facility."
---

## Who We Are

Content here...
```

---

## Entity 3: Design Token

**Represents**: Reusable design values (colors, typography, spacing, etc.)

**Storage**: 
- **Definition**: `blog/_sass/_tokens.scss` (CSS custom properties)
- **Documentation**: `blog/_data/design-tokens.yml` (human-readable reference)

**SCSS Schema** (`_tokens.scss`):
```scss
:root {
  // Token format: --{category}-{name}: {value};
  --color-primary: #2E5266;
  --font-size-base: 1rem;
  --space-md: 1rem;
}
```

**YAML Documentation Schema** (`design-tokens.yml`):
```yaml
colors:
  primary:
    token: --color-primary
    value: "#2E5266"
    usage: "Primary brand color, links, CTAs"
  
typography:
  base-size:
    token: --font-size-base
    value: "1rem"
    usage: "Body text base size (16px)"
    
spacing:
  md:
    token: --space-md
    value: "1rem"
    usage: "Medium spacing (16px)"
```

**Categories**:
- **Colors**: primary, accent, text, background, borders, states
- **Typography**: font-family, font-size-*, line-height-*, font-weight-*
- **Spacing**: space-xs, space-sm, space-md, space-lg, space-xl
- **Layout**: breakpoint-*, container-max-width
- **Effects**: shadow-*, radius-*, transition-*

**Validation Rules**:
- Token names MUST follow format: `--{category}-{name}`
- Values MUST be valid CSS values
- YAML documentation MUST match SCSS definitions

**Relationships**:
- Used by all component styles
- Referenced in design system documentation

---

## Entity 4: Template Component

**Represents**: Reusable UI patterns (navigation, footer, post card, etc.)

**Storage**: Liquid templates in `blog/_includes/`

**File Structure**:
```
_includes/
├── header.html          # Site header with navigation
├── footer.html          # Site footer
├── post-card.html       # Blog post preview card
├── meta.html            # SEO and meta tags
└── analytics.html       # Analytics scripts (progressive)
```

**Component Schema** (Liquid template with pseudo-props):
```liquid
{% comment %}
Component: post-card
Props:
  - post (object): Jekyll post object with .title, .url, .date, .excerpt
Usage:
  {% include post-card.html post=post %}
{% endcomment %}

<article class="post-card">
  <h2 class="post-card__title">
    <a href="{{ post.url }}">{{ post.title }}</a>
  </h2>
  <time class="post-card__date" datetime="{{ post.date | date_to_xmlschema }}">
    {{ post.date | date: "%B %d, %Y" }}
  </time>
  <p class="post-card__excerpt">{{ post.excerpt | strip_html | truncate: 150 }}</p>
</article>
```

**Validation Rules**:
- Each component MUST have a comment block documenting props and usage
- Props passed via Liquid's `include` parameter syntax
- Component class names MUST follow BEM naming: `.component__element--modifier`

**Standard Components** (Phase 1):
1. **header.html** - Props: none (uses site.data.navigation)
2. **footer.html** - Props: none (uses site config)
3. **post-card.html** - Props: post (post object)
4. **meta.html** - Props: title, description, image (strings)
5. **analytics.html** - Props: none (conditional on environment)

**Relationships**:
- Used by layouts (`_layouts/*.html`)
- Styled by component partials (`_sass/_components.scss`)

---

## Navigation Configuration

**Storage**: `blog/_data/navigation.yml`

**Schema**:
```yaml
main:
  - title: "Home"
    url: /
  - title: "Blog"
    url: /posts/
  - title: "About"
    url: /about/
  - title: "The Atrium"
    url: /atrium/

footer:
  - title: "GitHub"
    url: https://github.com/tmorgan181/Atrium
    external: true
```

**Validation Rules**:
- Each item MUST have `title` (string, 1-20 chars) and `url` (string, valid URL or path)
- `external: true` marks links that open in new tab
- Array order determines display order

---

## Jekyll Configuration

**Storage**: `blog/_config.yml`

**Key Schema**:
```yaml
# Site Metadata
title: "The Bridge"
description: "Public portal to The Atrium research facility"
url: "https://bridge.atrium.dev"
baseurl: ""

# Build Settings
markdown: kramdown
permalink: /posts/:title/
timezone: America/Chicago

# Collections
collections_dir: blog

# Plugins
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-compress-images

# Exclude from build
exclude:
  - Gemfile
  - Gemfile.lock
  - README.md
  - node_modules/

# Defaults (frontmatter defaults)
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      published: true
```

---

## Data Model Relationships Diagram

```
┌─────────────────┐
│  Blog Post      │
│  (_posts/*.md)  │
│  - title        │
│  - date         │
│  - author       │
│  - tags []      │
│  - content      │
└────────┬────────┘
         │
         │ rendered in
         ▼
┌─────────────────┐      uses      ┌──────────────────┐
│ Template        │◄─────────────────┤ Design Token     │
│ Component       │                 │ (_sass/_tokens)  │
│ (_includes/*.html)                │ - colors         │
│ - header        │                 │ - typography     │
│ - footer        │                 │ - spacing        │
│ - post-card     │                 └──────────────────┘
└────────┬────────┘
         │
         │ used by
         ▼
┌─────────────────┐      uses      ┌──────────────────┐
│ Layout          │◄─────────────────┤ Navigation       │
│ (_layouts/*.html)                 │ (_data/nav.yml)  │
│ - default       │                 │ - main []        │
│ - page          │                 │ - footer []      │
│ - post          │                 └──────────────────┘
│ - home          │
└─────────────────┘
         │
         │ renders
         ▼
┌─────────────────┐
│ Static Page     │
│ (pages/*.md)    │
│ - about         │
│ - atrium        │
└─────────────────┘
```

---

## File Naming Conventions

**Blog Posts**: `YYYY-MM-DD-title-slug.md`
- Example: `2025-01-15-welcome-to-bridge.md`
- Date prefix enables chronological sorting
- Slug becomes URL: `/posts/welcome-to-bridge/`

**Static Pages**: `page-name.md` or `page-name.html`
- Example: `about.md` → `/about/`
- Use markdown for content-heavy pages
- Use HTML for complex layouts

**Components**: `component-name.html`
- Example: `post-card.html`, `header.html`
- Kebab-case naming
- HTML extension (Liquid templates)

**Stylesheets**: `_partial-name.scss`
- Example: `_tokens.scss`, `_components.scss`
- Underscore prefix for SCSS partials
- Kebab-case naming

**Layouts**: `layout-name.html`
- Example: `post.html`, `page.html`, `default.html`
- No underscore (not partials)

---

## Content Guidelines

**Blog Post Content**:
- Use semantic markdown (headings h2-h4, lists, blockquotes, code blocks)
- First paragraph becomes excerpt if not specified in frontmatter
- Aim for 800-2000 words per post
- Include concrete examples from Atrium research
- Use "ordinary folks" language (no jargon without explanation)

**Page Content**:
- Clear hierarchy (h2 for sections, h3 for subsections)
- Scannable (bullet points, short paragraphs)
- Actionable (clear next steps or takeaways)

**Design Token Usage**:
- Always use tokens instead of hardcoded values
- Reference format: `var(--color-primary)` in CSS
- Document token usage in component comments

---

## Validation & Quality Gates

**Content Validation**:
- All frontmatter required fields present
- Valid YAML syntax
- Dates in ISO format
- File naming conventions followed

**Semantic HTML**:
- Proper heading hierarchy (no skipped levels)
- Alt text on all images
- Semantic elements (article, nav, footer, etc.)
- ARIA labels where needed

**Accessibility**:
- Color contrast ratios meet WCAG AA (4.5:1 normal, 3:1 large)
- Keyboard navigation works
- Screen reader friendly markup

**Performance**:
- Images optimized (WebP with fallbacks)
- Total page size <500KB
- No render-blocking scripts

---

## Data Model Status

✅ All entities defined with schemas  
✅ Validation rules documented  
✅ Relationships mapped  
✅ File naming conventions established  
✅ Content guidelines provided  
✅ Ready for contract generation (Phase 1 next step)

---
