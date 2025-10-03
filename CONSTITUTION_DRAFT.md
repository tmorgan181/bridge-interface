# Bridge Interface Constitution Draft
*Proposed constitution for the `/constitution` command*

---

## Prompt for `/constitution` command:

```
/constitution Create governing principles for the Bridge Interface - a public portal to The Atrium research facility. The Bridge serves as the accessible middle ground between hyperspeed AI mystics and ordinary folks who just use ChatGPT for emails.

CORE MISSION:
Make AI conversation research accessible, practical, and honest. Bridge the gap between hype and dismissiveness with real examples, clear explanations, and progressive access to actual research tools.

ARCHITECTURAL PRINCIPLES:
- Build simple for Phase 1 (static Jekyll blog) but architect for future expansion to full web application
- Component-based thinking from day one - today's Jekyll templates become tomorrow's React components
- Progressive disclosure model: public content → interactive demos → authenticated portal → deep Atrium access
- URL structure designed to remain stable as features evolve across all phases
- Strict separation of concerns: content, presentation, and behavior remain distinct and portable
- API-first thinking even in static phases - prepare integration points early

CONTENT PRINCIPLES:
- Accessibility over jargon - explain technical concepts in plain English that respects reader intelligence
- Practical over theoretical - focus on what people can actually understand, use, and build with
- Honest middle ground - neither AI hype ("consciousness imminent!") nor dismissiveness ("just autocomplete")
- Concrete examples over abstract philosophy - show real conversations, real patterns, real outcomes
- Assume intelligence but not prior knowledge - no gatekeeping through complexity
- Every piece answers "What does this mean for me?" - clear practical takeaways

DESIGN SYSTEM PRINCIPLES:
- Visual language that scales seamlessly from static blog to interactive web application
- Design tokens (colors, spacing, typography, motion) defined in Phase 1, used through Phase 4
- Components designed for reusability - Jekyll includes today, React components tomorrow
- Responsive and accessible by default (WCAG AA minimum, mobile-first)
- Consistent experience across blog posts, interactive demos, and future authenticated features
- Performance-first: fast loads even on slow connections, progressive enhancement always

TECHNICAL STANDARDS:
- Semantic HTML for accessibility and future-proofing
- Progressive enhancement - core content works without JavaScript
- Mobile-first responsive design with thoughtful breakpoints
- Clean, well-documented code that welcomes contributors
- Version control best practices - meaningful commits, clear branches
- Security-conscious from Phase 1 (no credentials in repo, sanitized examples)

FUTURE-PROOFING STRATEGY:
Phase 1 (Now): Static Jekyll blog with foundational design system
Phase 2 (Months 2-3): Client-side interactivity, embedded Atrium demos
Phase 3 (Months 4-6): Bridge API layer, read-only Atrium queries, authentication
Phase 4 (Months 6+): Full authenticated portal with progressive access levels

Every architectural decision in Phase 1 considers Phases 2-4:
- Component isolation enables easy migration to React/Vue
- URL structure accommodates future API routes
- Authentication patterns planned (not implemented) early
- Design system tokens separate from implementation
- Integration points with Atrium architected before needed

SCOPE MANAGEMENT:
What NEEDS specs (use spec-kit process):
- Architectural decisions and system design
- Design system and component library
- Reusable interactive features
- Future API endpoints and integration patterns
- Authentication and authorization flows

What DOESN'T need specs (just write it):
- Individual blog posts (write freely in markdown)
- One-off content pages
- Minor CSS adjustments
- Simple content updates

QUALITY STANDARDS:
- Every feature serves the mission: making AI research accessible to ordinary humans
- No feature bloat - solve real communication problems, not imaginary ones
- Test explanations with "ordinary folks" before publishing
- Clear writing always beats clever writing
- Show, don't just tell - examples, demos, visualizations over theory
- Honest about limitations - "we don't know yet" is a valid answer
- Credit sources and collaborators appropriately

URL STRUCTURE (stable across all phases):
- `/` - Home
- `/posts/` - Blog content
- `/posts/[slug]/` - Individual posts
- `/about/` - About the Bridge and The Atrium
- `/demos/` - Interactive demos (Phase 2+)
- `/api/` - API endpoints (Phase 3+)
- `/portal/` - Authenticated Atrium access (Phase 4+)
- `/explore/` - Public Atrium exploration (Phase 3+)
```

---

## Key Architectural Decisions:

### Component Strategy
- Jekyll templates written with React portability in mind
- Reusable includes map cleanly to future components
- Props-style frontmatter pattern
- Presentational vs container component thinking

### Integration Architecture
```
Phase 1: Static → Just content
Phase 2: Static + Client JS → Embedded demos
Phase 3: Static + API Layer → Bridge API ↔ Atrium (read-only)
Phase 4: Web App → Full portal with authentication
```

### Design Token Strategy
Define in Phase 1, use through Phase 4:
- Color system (brand, semantic, UI states)
- Typography scale (sizes, weights, line heights)
- Spacing system (consistent rhythm)
- Motion/animation patterns
- Component patterns (cards, buttons, forms)

---

Ready to run this `/constitution` command to establish the foundation! 🌉✨
