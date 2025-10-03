<!--
Sync Impact Report:
Version change: [INITIAL] → 1.0.0
Modified principles: Initial constitution creation
Added sections: Core Mission, Architectural Principles, Content Principles, Design System, Technical Standards, Future-Proofing Strategy, Scope Management, Quality Standards
Removed sections: None
Templates requiring updates:
  ✅ .specify/templates/plan-template.md - verified alignment
  ✅ .specify/templates/spec-template.md - verified alignment
  ✅ .specify/templates/tasks-template.md - verified alignment
Follow-up TODOs: None
-->

# Bridge Interface Constitution

## Core Mission

**The Bridge serves as the public portal to The Atrium research facility, making AI conversation research accessible, practical, and honest.**

We bridge the gap between hyperspeed AI mystics claiming imminent consciousness and ordinary folks who just use ChatGPT for emails. The middle ground is where real collaboration happens—and that's what we document, explain, and demonstrate.

## Core Principles

### I. Build Simple, Architect Smart

Start with the simplest implementation (Phase 1: static Jekyll blog) but make every architectural decision with future expansion in mind (Phases 2-4: interactive demos → API integration → authenticated portal).

**Rules:**
- Component-based thinking from day one—today's Jekyll templates MUST be designed to become tomorrow's React components
- URL structure MUST remain stable as features evolve across all phases
- Separation of concerns (content, presentation, behavior) MUST be strictly maintained
- Every architectural decision MUST consider impact through Phase 4

**Rationale:** We're building a bridge, not a monument. Start simple so we can ship and learn, but architect smart so we don't rebuild from scratch at each phase.

### II. Accessibility Over Jargon (NON-NEGOTIABLE)

Every piece of content MUST be accessible to "ordinary folks" who have intelligence but not necessarily prior AI knowledge.

**Rules:**
- Plain English MUST be used—technical concepts explained without gatekeeping jargon
- Every piece MUST answer "What does this mean for me?" with practical takeaways
- Assume intelligence, never prior knowledge
- Examples MUST be concrete, not abstract philosophy
- Show, don't just tell—use real conversations, patterns, and outcomes

**Rationale:** The Bridge exists to make research accessible. If ordinary folks can't understand it, we've failed our mission.

### III. Honest Middle Ground

Content MUST neither hype AI capabilities ("consciousness is imminent!") nor dismiss them ("just autocomplete, nothing interesting").

**Rules:**
- Practical demonstrations over theoretical claims
- Honest about both capabilities AND limitations
- "We don't know yet" is a valid and encouraged answer
- Concrete examples from Atrium research, not marketing promises
- Credit sources and collaborators appropriately

**Rationale:** Trust is earned through honesty. The middle ground between hype and dismissiveness is where productive conversation happens.

### IV. Progressive Enhancement

All features MUST work at baseline and improve with capability.

**Rules:**
- Core content MUST work without JavaScript
- Mobile-first responsive design REQUIRED
- Accessibility WCAG AA minimum REQUIRED
- Performance matters—fast loads even on slow connections
- Progressive disclosure: public → demos → authenticated → deep access

**Rationale:** Not everyone has the latest devices or fastest connections. Core content should reach everyone; enhancements are bonuses.

### V. Design System That Scales

Visual language MUST work from Phase 1 static blog through Phase 4 authenticated portal.

**Rules:**
- Design tokens (colors, spacing, typography) MUST be defined in Phase 1 and used through Phase 4
- Components MUST be reusable—Jekyll includes map to React components
- Consistent experience REQUIRED across blog posts, demos, and future interactive features
- Responsive and accessible by default
- Component isolation MUST enable easy framework migration

**Rationale:** We're building for evolution. The design system must scale seamlessly as capabilities expand.

## Architectural Strategy

### Phase Evolution

**Phase 1 (Now):** Static Jekyll blog with foundational design system  
**Phase 2 (Months 2-3):** Client-side interactivity, embedded Atrium demos  
**Phase 3 (Months 4-6):** Bridge API layer, read-only Atrium queries, authentication  
**Phase 4 (Months 6+):** Full authenticated portal with progressive access levels  

### URL Structure (Stable Across All Phases)

- `/` - Home
- `/posts/` - Blog content
- `/posts/[slug]/` - Individual posts
- `/about/` - About the Bridge and The Atrium
- `/demos/` - Interactive demos (Phase 2+)
- `/api/` - API endpoints (Phase 3+)
- `/portal/` - Authenticated Atrium access (Phase 4+)
- `/explore/` - Public Atrium exploration (Phase 3+)

### Integration Architecture

```
Phase 1: Static                    → Just content
Phase 2: Static + Client JS        → Embedded demos
Phase 3: Static + API Layer        → Bridge API ↔ Atrium (read-only)
Phase 4: Web App                   → Full portal with authentication
```

## Scope Management

### Features Requiring Specs (Use Spec-Kit Process)

- ✅ Architectural decisions and system design
- ✅ Design system and component library
- ✅ Reusable interactive features
- ✅ Future API endpoints and integration patterns
- ✅ Authentication and authorization flows

### Features NOT Requiring Specs (Just Build)

- ❌ Individual blog posts (write freely in markdown)
- ❌ One-off content pages
- ❌ Minor CSS adjustments
- ❌ Simple content updates

**Rationale:** Spec overhead should match complexity. Blog posts are content creation, not system architecture.

## Technical Standards

### Code Quality

- Semantic HTML REQUIRED for accessibility and future-proofing
- Clean, well-documented code that welcomes contributors
- Version control best practices—meaningful commits, clear branches
- Security-conscious from Phase 1—no credentials in repo, sanitized examples

### Performance

- Fast loads REQUIRED—optimize images, minimize dependencies
- Progressive enhancement—core works without JavaScript
- Mobile-first responsive design with thoughtful breakpoints

### Accessibility

- WCAG AA minimum compliance REQUIRED
- Keyboard navigation MUST work throughout
- Screen reader friendly markup and ARIA labels where needed
- Color contrast ratios MUST meet standards

## Quality Standards

- Every feature MUST serve the mission: making AI research accessible to ordinary humans
- No feature bloat—solve real communication problems, not imaginary ones
- Test explanations with "ordinary folks" before publishing
- Clear writing ALWAYS beats clever writing
- Show, don't just tell—examples, demos, visualizations over theory
- Honest about limitations—"we don't know yet" is encouraged
- Credit sources and collaborators appropriately

## Governance

### Amendment Process

1. Proposed changes MUST be documented with rationale
2. Version bump follows semantic versioning:
   - MAJOR: Backward incompatible principle changes
   - MINOR: New principles or material expansions
   - PATCH: Clarifications, wording improvements
3. Template synchronization REQUIRED after amendments
4. Commit message format: `docs: amend constitution to vX.Y.Z (summary)`

### Compliance Review

- All feature specs MUST reference relevant constitutional principles
- Pull requests SHOULD verify constitutional alignment
- Complexity MUST be justified against simplicity principle
- Regular audits to ensure principles guide actual development

### Living Document

This constitution guides development but does not ossify it. As we learn through building and user feedback, we amend principles to reflect reality. The goal is useful guidance, not bureaucratic overhead.

**Version**: 1.0.0 | **Ratified**: 2025-10-02 | **Last Amended**: 2025-10-02