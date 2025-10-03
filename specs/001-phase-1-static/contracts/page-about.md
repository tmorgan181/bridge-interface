# Contract: About Page

**Type**: Static Page  
**URL**: `/about/`  
**Layout**: `page`  
**Status**: Phase 1

---

## Purpose

Explain The Bridge's mission, approach, and relationship to The Atrium research facility. Establish trust and credibility with visitors.

---

## Content Requirements

### Page Title
- **Heading**: "About The Bridge" (h1)

### Mission Section
- **Heading**: "Our Mission" (h2)
- **Content**: 2-3 paragraphs explaining:
  - Making AI research accessible to ordinary humans
  - The honest middle ground (no hype, no dismissiveness)
  - Practical examples over theoretical claims

### Approach Section
- **Heading**: "How We Work" (h2)
- **Three Core Principles**:
  1. **Accessible** - Plain English, no gatekeeping jargon
  2. **Practical** - Real examples, concrete patterns
  3. **Honest** - Both capabilities and limitations

### The Atrium Connection
- **Heading**: "About The Atrium" (h2)
- **Content**: 2-3 paragraphs:
  - What The Atrium is (private AI conversation research facility)
  - Relationship to The Bridge (public interface)
  - Link to Atrium overview page or GitHub repo

### Team/Contact
- **Heading**: "Who We Are" (h2)
- **Content**: Brief intro to creator/maintainer
- **Contact**: GitHub profile link, email (if appropriate)

### Contributing Section (Optional)
- **Heading**: "Get Involved" (h2)
- **Content**: How others can contribute (blog posts, feedback, etc.)

---

## Functional Requirements

### FR-ABOUT-001: Clear Structure
Page MUST use clear heading hierarchy (h1 → h2 → h3) for scannable content.

### FR-ABOUT-002: Atrium Link
Page MUST include prominent link to Atrium overview (`/atrium/`) or GitHub repository.

### FR-ABOUT-003: Constitutional Alignment
Content MUST explicitly reference the five core principles from the constitution.

---

## Accessibility Requirements

### ACC-ABOUT-001: Heading Hierarchy
Single h1, h2 for major sections, h3 for subsections (if needed).

### ACC-ABOUT-002: Link Context
All links MUST have clear context (no "click here" or "learn more" without explanation).

---

## Content Guidelines

- Use first-person plural ("we") for team voice
- Plain English (explain any technical terms)
- Concrete examples where possible
- Honest tone (no marketing hype)
- 800-1200 words total

---

## Test Scenarios

### Test 1: Mission Clarity
**Given** a visitor wants to understand The Bridge  
**When** they read the About page  
**Then** they should clearly understand the mission and approach

### Test 2: Atrium Connection
**Given** a visitor is curious about The Atrium  
**When** they read the About page  
**Then** they should find a clear explanation and link to learn more

---

## Implementation

**Frontmatter**:
```yaml
---
layout: page
title: "About The Bridge"
permalink: /about/
description: "Learn about The Bridge - making AI conversation research accessible, practical, and honest."
---
```

**Content Structure**:
```markdown
## Our Mission

We bridge the gap between...

## How We Work

### Accessible
Plain English...

### Practical
Real examples...

### Honest
Both capabilities...

## About The Atrium

The Atrium is...
[Learn more about The Atrium](/atrium/)

## Who We Are

Built by...
```

---
