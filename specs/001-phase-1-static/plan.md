
# Implementation Plan: Phase 1 Static Jekyll Blog

**Branch**: `001-phase-1-static` | **Date**: 2025-10-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-phase-1-static/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary

The Bridge Phase 1 delivers a static Jekyll blog that serves as an accessible public portal to The Atrium research facility. This phase focuses on establishing the content foundation, design system, and future-proof architecture while maintaining constitutional principles of simplicity, accessibility, and progressive enhancement.

**Primary Requirement**: Create a static blog where visitors can read accessible explanations of AI conversation research without gatekeeping jargon, with full functionality without JavaScript, WCAG AA accessibility, and architecture that supports evolution to Phases 2-4.

**Technical Approach**: Jekyll-based static site with component-based templates, centralized design tokens, semantic HTML, and progressive enhancement strategy.

## Technical Context
**Language/Version**: Ruby 3.x (Jekyll 4.x), HTML5, CSS3 (SCSS), vanilla JavaScript (minimal, progressive enhancement)  
**Primary Dependencies**: Jekyll 4.x, jekyll-feed, jekyll-seo-tag, jekyll-sitemap  
**Storage**: Static markdown files (blog posts in `_posts/`, content in pages)  
**Testing**: HTML validation (W3C), accessibility testing (axe, WAVE), Lighthouse performance audits, manual cross-browser testing  
**Target Platform**: Static hosting (GitHub Pages, Netlify, Vercel) - served as static HTML/CSS/JS  
**Project Type**: Single static site (Jekyll monolith in `/blog/` directory)  
**Performance Goals**: <2s initial page load on 3G, Lighthouse score 90+, optimized images, minimal dependencies  
**Constraints**: No JavaScript required for core functionality, WCAG AA compliance, mobile-first responsive design  
**Scale/Scope**: 10-20 initial blog posts, 5 core pages, design system with ~10 reusable components, site supports growth to 100+ posts

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Build Simple, Architect Smart ✅
- **Status**: PASS
- **Rationale**: Phase 1 uses simplest possible static site approach (Jekyll + markdown) while architecting for future phases
- **Evidence**: 
  - Starting with Jekyll static generation (simplest)
  - Component-based templates designed to map to React/Vue later
  - URL structure stable across phases
  - Design tokens separate from implementation
  - Clear separation of content, presentation, behavior

### Principle II: Accessibility Over Jargon (NON-NEGOTIABLE) ✅
- **Status**: PASS
- **Rationale**: Core mission is making AI research accessible to "ordinary folks"
- **Evidence**:
  - WCAG AA compliance required (FR-014, NFR-003)
  - Semantic HTML throughout (FR-015)
  - Plain language content strategy documented
  - No assumed prior AI knowledge

### Principle III: Honest Middle Ground ✅
- **Status**: PASS
- **Rationale**: Content strategy explicitly rejects hype and dismissiveness
- **Evidence**:
  - Mission statement: "bridging gap between AI hype and dismissiveness"
  - Focus on concrete examples from Atrium research
  - Honest about capabilities and limitations

### Principle IV: Progressive Enhancement ✅
- **Status**: PASS
- **Rationale**: Core functionality works without JavaScript, enhancements are bonuses
- **Evidence**:
  - Site fully functional without JavaScript (FR-016)
  - Mobile-first responsive design (FR-017)
  - WCAG AA minimum (FR-014)
  - Fast loads on slow connections (FR-018, NFR-001)

### Principle V: Design System That Scales ✅
- **Status**: PASS
- **Rationale**: Design tokens and components architected for Phase 1-4 evolution
- **Evidence**:
  - Design tokens defined separately (FR-011)
  - Components portable to future frameworks (FR-021, FR-022)
  - Consistent experience required (FR-010)
  - Modular, reusable templates (FR-012)

### Overall Assessment: ✅ PASS
No constitutional violations. This plan fully aligns with all five core principles.

## Project Structure

### Documentation (this feature)
```
specs/001-phase-1-static/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
│   ├── page-home.md     # Home page content contract
│   ├── page-posts.md    # Blog index page contract
│   ├── page-post.md     # Individual post page contract
│   ├── page-about.md    # About page contract
│   └── page-atrium.md   # Atrium overview page contract
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
blog/                         # Jekyll site root
├── _config.yml              # Jekyll configuration
├── _data/                   # Data files
│   ├── navigation.yml       # Navigation structure
│   └── design-tokens.yml    # Design system tokens
├── _includes/               # Reusable components (Jekyll includes)
│   ├── header.html          # Site header with navigation
│   ├── footer.html          # Site footer
│   ├── post-card.html       # Blog post preview card
│   ├── meta.html            # SEO and meta tags
│   └── analytics.html       # Analytics (optional, progressive)
├── _layouts/                # Page templates
│   ├── default.html         # Base layout
│   ├── page.html            # Static page layout
│   ├── post.html            # Blog post layout
│   └── home.html            # Home page layout
├── _posts/                  # Blog posts (markdown)
│   ├── 2025-01-01-welcome.md
│   ├── 2025-01-15-first-patterns.md
│   └── 2025-02-01-honest-middle-ground.md
├── _sass/                   # SCSS partials
│   ├── _tokens.scss         # Design tokens (colors, typography, spacing)
│   ├── _reset.scss          # CSS reset
│   ├── _typography.scss     # Typography styles
│   ├── _layout.scss         # Layout utilities
│   └── _components.scss     # Component styles
├── assets/                  # Static assets
│   ├── css/
│   │   └── main.scss        # Main stylesheet (imports partials)
│   ├── js/
│   │   └── progressive.js   # Optional progressive enhancements
│   └── images/              # Site images
├── pages/                   # Static pages
│   ├── about.md             # About page
│   └── atrium.md            # Atrium overview page
├── posts.html               # Blog index page
├── index.html               # Home page
├── Gemfile                  # Ruby dependencies
└── README.md                # Jekyll site documentation

docs/                         # Project documentation (repo root)
└── design-system.md         # Design system documentation

.github/
└── workflows/
    └── deploy.yml           # GitHub Actions deployment workflow
```

**Structure Decision**: Single static site project. All content and templates in `/blog/` directory as a standard Jekyll site. This maintains simplicity while providing clear organization for components, content, and design system. The modular structure (includes, layouts, sass partials) enables clean migration to component-based frameworks in future phases.

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract → contract test task [P]
- Each entity → model creation task [P] 
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:
- TDD order: Tests before implementation 
- Dependency order: Models before services before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking

**Status**: No constitutional violations requiring justification.

All architectural decisions align with the five core principles. The Jekyll static site approach maintains simplicity while architecting for future growth.

---

## Progress Tracking

**Phase Status**:
- [x] Phase 0: Research complete (/plan command) - ✅ research.md created
- [x] Phase 1: Design complete (/plan command) - ✅ data-model.md, contracts/, quickstart.md, .github/copilot-instructions.md created
- [x] Phase 2: Task planning complete (/plan command - describe approach only) - ✅ Strategy documented below
- [ ] Phase 3: Tasks generated (/tasks command) - **NEXT STEP**
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS - All 5 principles aligned
- [x] Post-Design Constitution Check: PASS - Design artifacts maintain constitutional alignment
- [x] All NEEDS CLARIFICATION resolved - Technical context fully specified
- [x] Complexity deviations documented - None required

---

## Phase 2 Task Generation Strategy

**For /tasks Command** (DO NOT execute now - this is the plan):

### Task Categories

**Setup Tasks** (Sequential):
1. Initialize Jekyll project structure in `/blog/` directory
2. Configure Gemfile with dependencies (Jekyll 4.x, plugins)
3. Create `_config.yml` with site configuration
4. Set up SCSS architecture (`_sass/` directory with partials)
5. Define design tokens in `_sass/_tokens.scss` and `_data/design-tokens.yml`

**Component Tasks** (Parallel - different files):
6. [P] Create `_includes/header.html` component
7. [P] Create `_includes/footer.html` component  
8. [P] Create `_includes/post-card.html` component
9. [P] Create `_includes/meta.html` component

**Layout Tasks** (Sequential - depend on components):
10. Create `_layouts/default.html` base layout
11. Create `_layouts/page.html` extending default
12. Create `_layouts/post.html` extending default
13. Create `_layouts/home.html` extending default

**Page Tasks** (Parallel - different files):
14. [P] Create `index.html` home page (contract: page-home.md)
15. [P] Create `posts.html` blog index (contract: page-posts.md)
16. [P] Create `pages/about.md` (contract: page-about.md)
17. [P] Create `pages/atrium.md` (contract: page-atrium.md)

**Content Tasks** (Parallel - different files):
18. [P] Create sample post: "Welcome to The Bridge"
19. [P] Create sample post: "The Honest Middle Ground"
20. [P] Create sample post: "AI Collaboration Patterns from The Atrium"

**Styling Tasks** (Sequential - integration):
21. Create `_sass/_reset.scss` CSS reset
22. Create `_sass/_typography.scss` typography styles
23. Create `_sass/_layout.scss` layout utilities
24. Create `_sass/_components.scss` component styles
25. Create `assets/css/main.scss` main stylesheet (imports all partials)

**Assets Tasks** (Parallel):
26. [P] Add placeholder images to `assets/images/`
27. [P] Create minimal `assets/js/progressive.js` for progressive enhancements

**Configuration Tasks**:
28. Create `_data/navigation.yml` navigation configuration
29. Create `Gemfile` and `Gemfile.lock` (via bundle install)
30. Create `.github/workflows/deploy.yml` GitHub Actions deployment

**Documentation Tasks** (Parallel):
31. [P] Create `blog/README.md` Jekyll site documentation
32. [P] Create `docs/design-system.md` design system documentation

**Validation Tasks** (Sequential - final phase):
33. Run Lighthouse audit on all pages
34. Run axe accessibility audit
35. Verify all quickstart.md test scenarios
36. Build production site and verify deployment

### Estimated Task Count
**36 tasks total** across 6 phases:
- Setup: 5 tasks
- Components: 4 tasks (parallel)
- Layouts: 4 tasks (sequential)
- Pages: 4 tasks (parallel)
- Content: 3 tasks (parallel)
- Styling: 5 tasks (sequential)
- Assets: 2 tasks (parallel)
- Configuration: 3 tasks
- Documentation: 2 tasks (parallel)
- Validation: 4 tasks (sequential)

### Parallelization Strategy
Tasks marked [P] can run concurrently:
- All component includes (different files)
- All static pages (different files)
- All sample posts (different files)
- Asset creation (different files)
- Documentation files (different files)

Sequential dependencies:
- Setup must complete before components
- Components must exist before layouts reference them
- Layouts must exist before pages use them
- Styling partials can be created anytime but main.scss must import them last

---

## Ready for Next Phase

✅ **All Phase 0 and Phase 1 artifacts complete**

**Artifacts Generated**:
- `specs/001-phase-1-static/plan.md` (this file)
- `specs/001-phase-1-static/research.md` (8 technical decisions documented)
- `specs/001-phase-1-static/data-model.md` (4 entities with schemas)
- `specs/001-phase-1-static/contracts/` (5 page contracts)
  - page-home.md
  - page-posts.md
  - page-post.md
  - page-about.md
  - page-atrium.md
- `specs/001-phase-1-static/quickstart.md` (10 test scenarios)
- `.github/copilot-instructions.md` (agent context file)

**Next Command**: `/tasks` to generate tasks.md with 36 numbered, ordered tasks

---

*Plan based on Constitution v1.0.0 - See `.specify/memory/constitution.md`*  
*Ready for task generation phase*
