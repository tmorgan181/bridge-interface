# Contract: Atrium Overview Page

**Type**: Static Page  
**URL**: `/atrium/`  
**Layout**: `page`  
**Status**: Phase 1

---

## Purpose

Introduce visitors to The Atrium research facility, explain its purpose, and set expectations for future integration (Phases 2-4).

---

## Content Requirements

### Page Title
- **Heading**: "The Atrium Research Facility" (h1)

### What is The Atrium
- **Heading**: "What is The Atrium?" (h2)
- **Content**: 2-3 paragraphs:
  - Private AI conversation research facility
  - Focus on human-AI collaboration patterns
  - Exploration of conversation structures and effectiveness

### Research Focus
- **Heading**: "What We Study" (h2)
- **Content**: List or paragraphs covering:
  - Conversation patterns and structures
  - Context management techniques
  - Collaboration effectiveness metrics
  - Real-world application examples

### Bridge Connection
- **Heading**: "How The Bridge Connects" (h2)
- **Content**: 2-3 paragraphs:
  - The Bridge serves as public interface to Atrium research
  - Research findings translated to accessible content
  - Concrete examples without proprietary details

### Future Access (Phase 2-4)
- **Heading**: "Coming Soon" (h2)
- **Content**: Brief overview of future features:
  - Phase 2: Interactive demos
  - Phase 3: Read-only query access
  - Phase 4: Authenticated portal for deeper exploration

### Links & Resources
- **GitHub Repository**: Link to Atrium repo (if public)
- **Contact**: How to inquire about research participation

---

## Functional Requirements

### FR-ATRIUM-001: Clear Positioning
Page MUST clearly distinguish The Atrium (research) from The Bridge (public interface).

### FR-ATRIUM-002: Future Roadmap
Page MUST set clear expectations about future feature phases without overpromising.

### FR-ATRIUM-003: External Links
Links to Atrium GitHub or external resources MUST open in new tab with appropriate rel attributes.

---

## Content Guidelines

- Explain research focus without jargon
- Set realistic expectations for future features
- Balance transparency with research privacy
- 600-1000 words total

---

## Test Scenarios

### Test 1: Atrium Understanding
**Given** a visitor is curious about The Atrium  
**When** they read the overview page  
**Then** they should understand what it is, what's studied, and how it relates to The Bridge

### Test 2: Future Expectations
**Given** a visitor wants to know about future features  
**When** they read the Coming Soon section  
**Then** they should have clear, realistic expectations for Phases 2-4

---

## Implementation

**Frontmatter**:
```yaml
---
layout: page
title: "The Atrium Research Facility"
permalink: /atrium/
description: "Learn about The Atrium - a private AI conversation research facility exploring human-AI collaboration patterns."
---
```

**Content Structure**:
```markdown
## What is The Atrium?

The Atrium is a private research facility...

## What We Study

- Conversation patterns...
- Context management...
- Effectiveness metrics...

## How The Bridge Connects

The Bridge serves as...

## Coming Soon

### Phase 2: Interactive Demos
Explore conversation patterns...

### Phase 3: Query Access
Read-only access...

### Phase 4: Authenticated Portal
Deeper exploration...

## Resources

- [The Atrium on GitHub](https://github.com/...)
- Contact: ...
```

---
