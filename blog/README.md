# The Bridge - Jekyll Site

This directory contains the Jekyll static site for The Bridge blog.

## Setup

### Prerequisites

- Ruby 3.x or later
- Bundler gem

### Installation

```bash
# Install dependencies
bundle install

# Build the site
bundle exec jekyll build

# Serve locally (with live reload)
bundle exec jekyll serve

# Serve with drafts visible
bundle exec jekyll serve --drafts
```

The site will be available at `http://localhost:4000`

## Project Structure

```
blog/
├── _config.yml          # Jekyll configuration
├── _data/              # Data files (navigation, design tokens)
├── _includes/          # Reusable components
├── _layouts/           # Page templates
├── _posts/             # Blog posts (YYYY-MM-DD-title.md)
├── _sass/              # SCSS partials
├── assets/             # Static assets (CSS, JS, images)
├── pages/              # Static pages
├── index.html          # Home page
└── posts.html          # Blog index
```

## Creating Blog Posts

Create a new file in `_posts/` with the naming convention:

```
YYYY-MM-DD-post-title-slug.md
```

### Required Frontmatter

```yaml
---
layout: post
title: "Your Post Title"
date: 2025-01-15
author: "Author Name"
excerpt: "Brief description for cards and SEO"
tags: [tag1, tag2, tag3]
---

Your content here...
```

### Optional Frontmatter Fields

- `image: /assets/images/post-image.jpg` - Featured image
- `published: false` - Mark as draft (excluded from production)

## Creating Static Pages

Create markdown files in `pages/` with frontmatter:

```yaml
---
layout: page
title: "Page Title"
permalink: /page-url/
description: "SEO description"
---

Your content here...
```

## Design System

### Using Design Tokens

Design tokens are defined in `_sass/_tokens.scss` as CSS custom properties:

```scss
// Use in SCSS
.my-element {
  color: var(--color-primary);
  padding: var(--space-md);
  font-size: var(--font-size-lg);
}
```

Token documentation is in `_data/design-tokens.yml`.

### Component Styles

Component styles are in `_sass/_components.scss`. Use BEM naming:

```scss
.component-name {
  // Base component styles
  
  &__element {
    // Element styles
  }
  
  &--modifier {
    // Modifier styles
  }
}
```

## Deployment

The site is automatically deployed via GitHub Actions when pushing to the `main` branch.

### Manual Build

```bash
# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Output will be in _site/ directory
```

## Configuration

Key settings in `_config.yml`:

- `title` - Site title
- `description` - Site description
- `url` - Production URL
- `baseurl` - Base URL path (usually empty for root domain)
- `permalink` - URL structure for posts

## Plugins

Installed Jekyll plugins:

- `jekyll-feed` - RSS feed generation
- `jekyll-seo-tag` - SEO meta tags
- `jekyll-sitemap` - sitemap.xml generation

## Performance

- SCSS compiled and minified in production
- Images should be optimized before adding
- No JavaScript required for core functionality
- Responsive images with proper sizing

## Accessibility

- WCAG AA compliance target
- Semantic HTML throughout
- Proper heading hierarchy
- Alt text on all images
- Keyboard navigation support
- Focus indicators on interactive elements

## Development Tips

### Live Reload

Jekyll serve includes live reload by default - save any file and browser refreshes automatically.

### Viewing Drafts

```bash
# Show posts with published: false
bundle exec jekyll serve --drafts
```

### Incremental Builds

```bash
# Faster builds during development
bundle exec jekyll serve --incremental
```

### Troubleshooting

**Port already in use:**
```bash
# Use different port
bundle exec jekyll serve --port 4001
```

**SCSS not compiling:**
- Check main.scss has front matter (triple dashes at top)
- Verify import order in main.scss
- Look for syntax errors in SCSS files

**Changes not appearing:**
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- Check if file is in exclude list (_config.yml)
- Restart Jekyll server

## Contributing

For architectural changes, use the spec-driven development process in the repo root.

For blog posts or content updates, just create the markdown file and submit a PR.

---

**The Bridge**: Where AI research meets ordinary humans 🌉
