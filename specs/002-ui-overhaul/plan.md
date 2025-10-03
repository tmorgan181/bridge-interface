# Implementation Plan: Light/Dark Mode Design System

**Branch**: `002-ui-overhaul` | **Date**: 2025-10-03 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-ui-overhaul/spec.md`

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

Implement a comprehensive light/dark mode design system for The Bridge blog that creates visual continuity with The Atrium while maintaining accessibility and constitutional principles. The system will:

- Support automatic system-preference detection and manual theme toggle with localStorage persistence
- Define complete design token system (colors, typography, spacing, effects) using CSS custom properties
- Implement theme-specific styling for light mode (professional, accessible) and dark mode (entrance to Atrium aesthetic)
- Maintain Atrium brand identity (purple #a78bfa) across both themes
- Ensure WCAG AA accessibility compliance in both themes
- Provide smooth transitions without flash-of-wrong-theme
- Work without JavaScript (defaults to system preference) with progressive enhancement for toggle

## Technical Context
**Language/Version**: Jekyll 4.x (Ruby), HTML5, CSS3 (SCSS), JavaScript ES6+  
**Primary Dependencies**: jekyll-feed, jekyll-seo-tag, jekyll-sitemap (existing Phase 1 plugins)  
**Storage**: Browser localStorage for theme preference persistence  
**Testing**: Manual visual testing, Lighthouse accessibility/performance audits, WCAG AA compliance verification  
**Target Platform**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+) with graceful degradation  
**Project Type**: Single project (Jekyll static site with progressive JavaScript enhancement)  
**Performance Goals**: Lighthouse Performance 90+, Lighthouse Accessibility 90+, theme transition <300ms  
**Constraints**: No framework dependencies, maintain existing Jekyll structure, CSS-only core with JS enhancement, WCAG AA minimum compliance  
**Scale/Scope**: ~10 Jekyll templates, ~15 SCSS component files, 1 theme manager JS module, 2 complete color themes

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Principle I - Build Simple, Architect Smart**:
- ✅ PASS: Enhances Phase 1 structure without rebuilding
- ✅ PASS: Uses CSS custom properties (design tokens) that scale to future frameworks
- ✅ PASS: Component styles remain modular and framework-agnostic
- ✅ PASS: Theme system works with Jekyll today, React/Vue tomorrow

**Principle II - Accessibility Over Jargon**:
- ✅ PASS: Visual design welcomes ordinary folks in both themes
- ✅ PASS: WCAG AA compliance ensures accessible color contrasts
- ✅ PASS: No technical jargon in user-facing theme experience

**Principle III - Honest Middle Ground**:
- ✅ PASS: Light mode = professional/trustworthy, Dark mode = entrance to Atrium depth
- ✅ PASS: Neither overly casual nor sterile corporate
- ✅ PASS: Atrium branding honest about research connection

**Principle IV - Progressive Enhancement**:
- ✅ PASS: Core theme selection works via system preference (CSS prefers-color-scheme)
- ✅ PASS: Site fully functional without JavaScript
- ✅ PASS: Toggle button enhances experience for manual control
- ✅ PASS: LocalStorage persistence is bonus, not requirement

**Principle V - Design System That Scales**:
- ✅ PASS: Design tokens defined once, used everywhere
- ✅ PASS: Component styles modular and reusable
- ✅ PASS: Atrium branding consistent for future portal integration
- ✅ PASS: Token system supports Phase 2-4 evolution

**Result**: ✅ ALL CONSTITUTIONAL PRINCIPLES SATISFIED - No complexity violations

## Project Structure

### Documentation (this feature)
```
specs/002-ui-overhaul/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
│   ├── theme-tokens.md  # Design token contract
│   ├── component-styles.md  # Component styling contract
│   └── theme-manager.md     # JavaScript API contract
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
blog/
├── _sass/
│   ├── _tokens.scss         # ENHANCED: Complete design token system
│   ├── _reset.scss          # UNCHANGED: CSS reset
│   ├── _typography.scss     # ENHANCED: Theme-aware typography
│   ├── _layout.scss         # ENHANCED: Theme-aware layout
│   ├── _components.scss     # ENHANCED: Theme-aware components
│   └── _theme-transitions.scss  # NEW: Smooth theme transition styles
├── _data/
│   └── design-tokens.yml    # ENHANCED: Extended token documentation
├── _includes/
│   ├── header.html          # ENHANCED: Add theme toggle button
│   ├── footer.html          # UNCHANGED
│   ├── meta.html            # ENHANCED: Add theme meta tags
│   └── theme-script.html    # NEW: Inline critical theme JS
├── _layouts/
│   ├── default.html         # ENHANCED: Add data-theme attribute, theme script
│   ├── home.html            # ENHANCED: Atrium preview card styling
│   ├── page.html            # UNCHANGED: Inherits theme from default
│   └── post.html            # UNCHANGED: Inherits theme from default
├── assets/
│   ├── css/
│   │   └── main.scss        # ENHANCED: Import new theme-transitions partial
│   └── js/
│       ├── progressive.js   # ENHANCED: Add theme manager module
│       └── theme-manager.js # NEW: Standalone theme management (optional split)
└── pages/
    └── atrium.md            # ENHANCED: Use Atrium preview card component
```

**Structure Decision**: Single Jekyll project with enhanced SCSS system and minimal JavaScript module. Maintains Phase 1 structure while adding theme capabilities through:
1. Extended `_tokens.scss` with theme-specific CSS custom properties
2. Theme-aware component styles in existing SCSS files  
3. New `theme-manager.js` module for toggle/persistence (progressive enhancement)
4. Template enhancements for theme toggle UI and initialization

## Phase 0: Outline & Research

**Status**: ✅ COMPLETE

**Research Questions Addressed**:
1. CSS Custom Properties vs SCSS Variables → CSS custom properties for runtime switching
2. Theme Detection Strategy → Three-tier: localStorage → system → default light
3. Flash Prevention → Inline critical script in <head>
4. Atrium Visual Identity → Shared purple, lighter slate for Bridge dark mode
5. Accessibility Compliance → Token values meet WCAG AA 4.5:1 minimum
6. Animation Strategy → 250ms color transitions, respects prefers-reduced-motion
7. Glow Effects → Subtle purple shadows, stronger in dark mode
8. Typography → Inter + JetBrains Mono with system font fallbacks
9. Syntax Highlighting → Rouge (existing) with theme-aware CSS
10. Toggle UI Placement → Header navigation, right side

**Key Findings**:
- No new dependencies required - pure CSS + vanilla JS enhancement
- Browser support excellent (96%+ for CSS custom properties)
- Performance impact minimal (~8KB CSS, ~1KB JS)
- Constitutional compliance verified - enhances Phase 1 without rebuilding

**Output**: ✅ [research.md](./research.md) complete with 10 design decisions documented

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
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [ ] Phase 0: Research complete (/plan command)
- [ ] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [ ] Initial Constitution Check: PASS
- [ ] Post-Design Constitution Check: PASS
- [ ] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
