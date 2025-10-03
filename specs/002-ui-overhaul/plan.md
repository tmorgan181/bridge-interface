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

**Status**: ✅ COMPLETE

**Design Artifacts Created**:

1. **Data Model** (`data-model.md`):
   - 4 key entities defined (Design Tokens, Theme State, Component Styles, Theme Manager)
   - 95 CSS custom properties documented
   - Token categories and relationships mapped
   - Accessibility validation rules specified

2. **Contracts** (`contracts/`):
   - `theme-tokens.md`: Design token system contract (95 tokens, WCAG AA compliance)
   - `theme-manager.md`: JavaScript API contract (7 public methods, localStorage integration)
   - `component-styles.md`: Component styling requirements (9 component categories)

3. **Quickstart Tests** (`quickstart.md`):
   - 13 comprehensive test scenarios
   - Covers functionality, accessibility, performance, error handling
   - 30-45 minute complete test suite
   - Success criteria defined

**Key Design Decisions**:
- CSS custom properties enable runtime theme switching without recompilation
- Three-tier preference system (localStorage → system → default)
- Inline critical script prevents flash of wrong theme
- Theme-aware components reference tokens, never hard-coded values
- Atrium brand identity consistent across both themes and future portal

**Output**: ✅ Complete design documentation ready for task generation

---

**Post-Design Constitution Re-check**: ✅ PASS - All principles satisfied, no complexity violations introduced

---

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:

### File-Based Task Organization

**SCSS Token System** (Sequential):
1. Create `_tokens.scss` with 95 CSS custom properties
2. Create `_theme-transitions.scss` for smooth transitions
3. Update `main.scss` to import new files

**Component Style Updates** (Parallel after tokens exist):
4. [P] Update `_components.scss` with theme-aware styles
5. [P] Update `_typography.scss` with theme-aware typography
6. [P] Update `_layout.scss` with theme-aware layout

**JavaScript Theme Manager** (Parallel with styles):
7. [P] Create ThemeManager class in `progressive.js`
8. [P] Create inline `theme-script.html` include

**Template Updates** (Sequential after JS exists):
9. Update `default.html` layout with theme initialization
10. Update `header.html` with theme toggle button
11. Create Atrium preview card component (if needed)

**Data Documentation** (Parallel anytime):
12. [P] Update `design-tokens.yml` with extended token documentation

**Testing & Validation** (Sequential, last):
13. Execute quickstart.md test scenarios (manual)
14. Run Lighthouse audits (Performance & Accessibility)
15. Verify WCAG AA contrast ratios

**Estimated Task Count**: 15-18 tasks

**Ordering Rationale**:
- Tokens must exist before components can reference them
- Components and JavaScript can be built in parallel
- Templates require JavaScript to be ready
- Testing happens after all implementation complete

**Parallel Opportunities**:
- Component SCSS files (after tokens)
- JavaScript and SCSS work simultaneously
- Documentation updates anytime

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking

**No complexity violations** - All constitutional principles satisfied without deviation.

This feature enhances the existing Phase 1 structure using standard web technologies (CSS custom properties, vanilla JavaScript) without introducing new frameworks, dependencies, or architectural complexity.

---
## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command) ✅
- [x] Phase 1: Design complete (/plan command) ✅
- [x] Phase 2: Task planning complete (/plan command - describe approach only) ✅
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS ✅
- [x] Post-Design Constitution Check: PASS ✅
- [x] All NEEDS CLARIFICATION resolved ✅
- [x] Complexity deviations documented: N/A (no violations) ✅

**Artifacts Generated**:
- [x] research.md (10 design decisions) ✅
- [x] data-model.md (4 entities, 95 tokens) ✅
- [x] contracts/ (3 contract files) ✅
- [x] quickstart.md (13 test scenarios) ✅

**Ready for**: `/tasks` command to generate implementation task list

---
*Based on Constitution v1.0.0 - See `.specify/memory/constitution.md`*
