# Tasks: UI Overhaul - Light/Dark Mode Design System

**Feature**: 002-ui-overhaul  
**Input**: Design documents from `/specs/002-ui-overhaul/`  
**Prerequisites**: plan.md, research.md, data-model.md, contracts/, quickstart.md  
**Generated**: 2025-10-03  
**Agent Delegation**: Claude Code (T1-T11), GitHub Copilot (T12-T19)

---

## Overview

This task list implements the light/dark mode design system as specified in the planning documents. Tasks are organized by phase with dependency ordering and parallel execution markers. Work is divided between two AI agents following the delegation protocol established in `.collaboration/002-ui-overhaul/`.

**Total Tasks**: 19 tasks across 5 phases  
**Estimated Parallel Tasks**: 8 tasks can run concurrently  
**Agent Coordination**: Via `.collaboration/002-ui-overhaul/` status files

---

## Format: `[ID] [Agent] [P?] Description`
- **[Claude]**: Task owned by Claude Code
- **[Copilot]**: Task owned by GitHub Copilot
- **[P]**: Can run in parallel (different files, no dependencies)
- **File paths**: All paths relative to repository root
- **Checkboxes**: Mark [X] when task complete

---

## Phase 3.1: SCSS Foundation (Claude Code)

**Objective**: Create design token system and theme infrastructure

- [ ] **T001** [Claude] Create `blog/_sass/_tokens.scss` with 95 CSS custom properties organized as:
  - Theme-independent tokens (47 tokens): Atrium branding, typography, spacing, layout, borders, transitions
  - Light mode tokens (24 tokens): backgrounds, text colors, borders, interactive, links, Atrium cards, shadows
  - Dark mode tokens (24 tokens): same categories as light mode
  - Verify contrast ratios meet WCAG AA (document in comments)
  - **Contract**: `contracts/theme-tokens.md`
  - **Reference**: `data-model.md` sections 1.1-1.3

- [ ] **T002** [Claude] Create `blog/_sass/_theme-transitions.scss` with smooth transition system:
  - `.theme-transitioning` class for 250ms color/border transitions
  - `@media (prefers-reduced-motion: reduce)` overrides for accessibility
  - Transition cleanup after 300ms
  - **Reference**: `research.md` Decision 6

- [ ] **T003** [Claude] Update `blog/assets/css/main.scss` to import new SCSS files:
  - Import `_tokens` as FIRST import (before all others)
  - Import `_theme-transitions` before components
  - Verify Jekyll compilation succeeds with no errors
  - **Checkpoint**: Ready for Copilot validation (T13.5)

**Dependencies**: T001 must complete before T002. T001-T002 must complete before T003.

---

## Phase 3.2: Theme-Aware Components (Claude Code)

**Objective**: Update existing component styles to use design tokens

- [ ] **T004** [Claude] [P] Update `blog/_sass/_components.scss` with theme-aware component styles:
  - `.theme-toggle` button (circular, elevated, hover glow)
  - `.nav-link` and `.atrium-link` (purple on hover, glow effects)
  - `.post-card` (elevated, hover lift, purple glow)
  - `.atrium-preview .atrium-card` (dark gradient, shimmer effect, gradient CTA button)
  - `.btn`, `.btn-primary`, `.btn-atrium` (various button styles)
  - **Replace** all hard-coded colors/sizes with `var(--token-name)` references
  - **Contract**: `contracts/component-styles.md`
  - **Reference**: `data-model.md` section 3

- [ ] **T005** [Claude] [P] Update `blog/_sass/_typography.scss` with theme-aware typography:
  - `code` inline styles (monospace, tertiary bg, purple text)
  - `pre` block styles (secondary bg, border, primary text)
  - Headings, paragraphs, lists using token-based colors
  - **Replace** all hard-coded values with tokens
  - **Contract**: `contracts/component-styles.md`

- [ ] **T006** [Claude] [P] Update `blog/_sass/_layout.scss` with theme-aware layout:
  - `.site-header` (elevated bg, border, sticky, backdrop blur)
  - `.container` (max-width, padding)
  - `.content` (max-width for readability)
  - **Replace** all hard-coded values with tokens
  - **Contract**: `contracts/component-styles.md`

**Dependencies**: T001 (tokens) must complete before T004-T006. T004-T006 can run in parallel (different sections/files).

---

## Phase 3.3: JavaScript Theme Manager (Claude Code)

**Objective**: Implement theme detection, switching, and persistence

- [ ] **T007** [Claude] Create ThemeManager class in `blog/assets/js/progressive.js`:
  - `constructor()` - Initialize theme system, set data-theme attribute, attach listeners
  - `getCurrentTheme()` - Return current theme ('light' | 'dark')
  - `toggleTheme()` - Switch between themes
  - `setTheme(theme)` - Set specific theme with smooth transition
  - `getThemeSource()` - Return how theme was determined
  - `hasUserPreference()` - Check if user has manual preference
  - `clearPreference()` - Remove saved preference, revert to system
  - Private `getInitialTheme()` - Three-tier detection (localStorage → system → default)
  - System preference change listener (only if no user preference)
  - Try/catch around localStorage access for error handling
  - **Contract**: `contracts/theme-manager.md`
  - **Reference**: `research.md` Decisions 2, 3
  - **Checkpoint**: Ready for Copilot testing (T13.5)

**Dependencies**: T007 independent, can start anytime after T003 (for testing against styles).

---

## Phase 3.4: Template Integration (Claude Code)

**Objective**: Integrate theme system into Jekyll templates

- [ ] **T008** [Claude] Create `blog/_includes/theme-script.html` with inline critical script:
  - Synchronous IIFE that runs before CSS loads
  - Reads localStorage.getItem('theme')
  - Falls back to `prefers-color-scheme` media query
  - Sets `document.documentElement.setAttribute('data-theme', theme)`
  - ~15 lines, must be minimal for inline
  - **Contract**: `contracts/theme-manager.md` section "Critical Inline Script"
  - **Reference**: `research.md` Decision 3

- [ ] **T009** [Claude] Update `blog/_layouts/default.html` to integrate theme system:
  - Include `{% include theme-script.html %}` in <head> BEFORE CSS link
  - Add `data-theme` attribute to <html> element (will be set by script)
  - Include theme-manager script at end of <body>: `<script src="{{ '/assets/js/progressive.js' | relative_url }}"></script>`
  - Verify no flash of wrong theme on page load
  - **Checkpoint**: Ready for Copilot initialization testing (T13.5)

- [ ] **T010** [Claude] Update `blog/_includes/header.html` to add theme toggle button:
  - Add button markup: `<button class="theme-toggle" aria-label="Toggle theme">`
  - Include sun/moon icons: `<span class="icon-sun">☀️</span>` and `<span class="icon-moon">🌙</span>`
  - Position in navigation (right side of header)
  - Ensure keyboard accessible (part of tab order)
  - ThemeManager will attach click listener automatically
  - **Contract**: `contracts/component-styles.md` section "Theme Toggle Button"

- [ ] **T011** [Claude] Create or enhance Atrium preview card component:
  - **IF** `blog/_includes/atrium-card.html` doesn't exist: Create it
  - **ELSE**: Update existing component
  - Dark navy/indigo gradient background (uses `--atrium-card-bg`)
  - Shimmer animation overlay
  - Purple-blue gradient CTA button
  - Use in `blog/pages/atrium.md` or homepage
  - **Required** (not optional - key for Atrium visual identity)
  - **Contract**: `contracts/component-styles.md` section "Atrium Preview Card"
  - **Reference**: `data-model.md` section 3.3

**Dependencies**: T008 must exist before T009. T007 (ThemeManager) should be complete before T009-T010 for full functionality. T011 can be done anytime after T004 (component styles exist).

---

## Phase 3.5: Content & Documentation (GitHub Copilot)

**Objective**: Document design system and create demonstration content

- [ ] **T012** [Copilot] [P] Update `blog/_data/design-tokens.yml` with comprehensive token documentation:
  - Document all 95 tokens with human-readable descriptions
  - Organize by category (branding, typography, spacing, colors, etc.)
  - Include usage notes and examples for contributors
  - Reference actual token names from `_tokens.scss`
  - **Reference**: `data-model.md` section 1

- [ ] **T013** [Copilot] [P] Create sample blog post demonstrating all themed components:
  - Create `blog/_posts/2025-10-03-theme-system-showcase.md`
  - Include examples of: headings, paragraphs, lists, links, code blocks (inline and block)
  - Include multiple sections to show content card styling
  - Reference Atrium with styled links/cards
  - Demonstrate accessibility features
  - **Reference**: `quickstart.md` scenario 6 (component verification)

**Dependencies**: T012 should reference T001 (tokens exist). T013 requires T004-T011 complete for full effect.

---

## Phase 3.6: Build Verification Checkpoints (GitHub Copilot)

**Objective**: Verify Jekyll builds successfully after each major phase

- [ ] **T013.5** [Copilot] [P] Execute build verification at checkpoints:
  - **Checkpoint 1** (after T003): Run `bundle exec jekyll build` from blog/ directory
    - Verify: No SCSS compilation errors, _site/ generates successfully
  - **Checkpoint 2** (after T007): Test ThemeManager in browser console
    - Verify: Theme functions work, no JS errors in console
  - **Checkpoint 3** (after T009): Check theme initialization
    - Verify: Correct theme loads on page load, no flash
  - **Checkpoint 4** (after T011): Visual component verification
    - Verify: All components render correctly in both themes
  - Document any issues found in `.collaboration/002-ui-overhaul/copilot-checkpoint-results.md`

**Dependencies**: Runs after T003, T007, T009, T011 respectively. Can run in parallel with Claude's next phase if checking previous work.

---

## Phase 3.7: Testing & Validation (GitHub Copilot)

**Objective**: Execute comprehensive test scenarios and validate implementation

- [ ] **T014** [Copilot] Execute quickstart.md test scenarios 1-7:
  - **Scenario 1**: Initial theme detection (light/dark OS preference)
  - **Scenario 2**: Manual theme toggle and persistence
  - **Scenario 3**: System preference change during browsing
  - **Scenario 4**: Keyboard navigation (Tab to toggle, Enter/Space to activate)
  - **Scenario 5**: Color contrast verification (WCAG AA)
  - **Scenario 6**: Component visual verification (all components in both themes)
  - **Scenario 7**: Responsive design (375px, 768px, 1024px)
  - Document results in `.collaboration/002-ui-overhaul/copilot-quickstart-results.md`
  - **Reference**: `quickstart.md` scenarios 1-7

- [ ] **T015** [Copilot] Execute quickstart.md test scenarios 8-13:
  - **Scenario 8**: Performance validation (Lighthouse audits)
  - **Scenario 9**: Error handling (disabled JS, disabled localStorage, invalid values)
  - **Scenario 10**: Cross-page navigation (theme persistence)
  - **Scenario 11**: Atrium branding consistency (purple across both themes)
  - **Scenario 12**: Transition smoothness (250ms fades, reduced-motion)
  - **Scenario 13**: Browser compatibility (Chrome, Firefox, Safari, Edge)
  - Document results in same file as T014
  - **Reference**: `quickstart.md` scenarios 8-13

- [ ] **T016** [Copilot] Run Lighthouse audits in both themes:
  - **Light Mode Audit**: DevTools → Lighthouse → Run audit
    - Performance: Target 90+
    - Accessibility: Target 90+
    - Best Practices: Target 90+
  - **Dark Mode Audit**: Toggle theme, run audit again
    - Same targets as light mode
  - Compare scores, investigate any regressions
  - Document scores in `.collaboration/002-ui-overhaul/copilot-lighthouse-scores.md`
  - **Reference**: `quickstart.md` scenario 8

- [ ] **T017** [Copilot] Verify WCAG AA contrast ratios using WebAIM Contrast Checker:
  - **Light Mode**:
    - Text primary (#1a202c) on bg primary (#ffffff) - expect 16.57:1 ✓
    - Text secondary (#4a5568) on bg primary (#ffffff) - expect 9.09:1 ✓
    - Link color (#4a5568) on bg primary (#ffffff) - expect 9.09:1 ✓
    - Focus border (#a78bfa) on bg primary (#ffffff) - expect 3.71:1 ✓
  - **Dark Mode**:
    - Text primary (#f1f5f9) on bg primary (#0f172a) - expect 16.89:1 ✓
    - Text secondary (#cbd5e0) on bg primary (#0f172a) - expect 13.08:1 ✓
    - Link color (#94a3b8) on bg primary (#0f172a) - expect 7.54:1 ✓
    - Focus border (#a78bfa) on bg primary (#0f172a) - expect 5.16:1 ✓
  - Document ratios in `.collaboration/002-ui-overhaul/copilot-contrast-results.md`
  - **Reference**: `quickstart.md` scenario 5

- [ ] **T018** [Copilot] [P] Document browser compatibility testing results:
  - Test in: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
  - Verify: Theme loads correctly, toggle works, transitions smooth, no console errors
  - Note any browser-specific quirks or issues
  - Create `.collaboration/002-ui-overhaul/copilot-browser-compatibility.md`
  - **Reference**: `quickstart.md` scenario 13

**Dependencies**: T014-T018 require T001-T011 complete. T014-T015 sequential (quickstart scenarios in order). T016-T018 can run in parallel.

---

## Phase 3.8: Final Documentation (GitHub Copilot)

**Objective**: Capture implementation process and create meta-documentation

- [ ] **T019** [Copilot] Create "dual-wielding implementation" documentation:
  - Create `blog/_posts/2025-10-04-dual-wielding-ai-agents.md` blog post
  - Document the multi-agent spec-driven development process
  - Include the `dual-wielding.png` screenshot
  - Explain delegation protocol, coordination via `.collaboration/` directory
  - Highlight how spec-kit enabled parallel agent workflow
  - Show git log demonstrating [Claude] and [Copilot] commits
  - Constitutional alignment: Principle I (Build Simple, Architect Smart)
  - **Reference**: `.collaboration/002-ui-overhaul/` files

**Dependencies**: T019 should be last - captures the complete implementation story.

---

## Dependency Graph

```
T001 (tokens) ─────────┬─→ T002 (transitions) ─→ T003 (imports)
                       │                            │
                       │                            ├─→ T013.5-CP1 (build check)
                       │                            │
                       └─→ T004 [P] (components) ───┤
                       └─→ T005 [P] (typography) ───┼─→ T013 (blog post)
                       └─→ T006 [P] (layout) ───────┤
                                                     │
T007 (ThemeManager) ────────────────────────────────┼─→ T013.5-CP2 (JS test)
                                                     │
T008 (inline script) ─→ T009 (default.html) ────────┼─→ T013.5-CP3 (init check)
                                                     │
T009 ─→ T010 (header.html toggle) ──────────────────┤
                                                     │
T004 ─→ T011 (Atrium card) ─────────────────────────┼─→ T013.5-CP4 (visual check)
                                                     │
T001 ─→ T012 [P] (token docs) ──────────────────────┤
                                                     │
All above ───────────────────────────────────────────┼─→ T014 (quickstart 1-7)
                                                     │  ├─→ T015 (quickstart 8-13)
                                                     │  ├─→ T016 (Lighthouse)
                                                     │  ├─→ T017 (contrast)
                                                     │  └─→ T018 [P] (browsers)
                                                     │
All validation complete ─────────────────────────────┴─→ T019 (meta-docs)
```

---

## Parallel Execution Examples

### Batch 1: Component Styles (after T001 tokens exist)
```bash
# T004, T005, T006 - Different files, all need tokens
[Claude] feat(002): update components.scss with theme-aware styles
[Claude] feat(002): update typography.scss with theme-aware styles
[Claude] feat(002): update layout.scss with theme-aware styles
```

### Batch 2: Documentation (Claude working on templates)
```bash
# T012, T013 - Different files, Copilot can work independently
[Copilot] docs(002): update design-tokens.yml with comprehensive documentation
[Copilot] feat(002): create theme system showcase blog post
```

### Batch 3: Final Validation (all implementation complete)
```bash
# T016, T017, T018 - Different validation tasks
[Copilot] test(002): run Lighthouse audits in both themes
[Copilot] test(002): verify WCAG AA contrast ratios
[Copilot] test(002): document browser compatibility results
```

---

## Task Execution Notes

### Sequential Task Groups (must be done in order)
1. **SCSS Foundation**: T001 → T002 → T003
2. **Template Integration**: T008 → T009 → T010
3. **Quickstart Scenarios**: T014 → T015 (scenarios in sequence)

### Independent Tasks (can be done anytime)
- T007 (ThemeManager) - after T003 for testing
- T011 (Atrium card) - after T004 for styles
- T012 (token docs) - after T001 exists
- T013 (blog post) - after T004-T011 for full effect

### Agent Handoff Points
- **After T003**: Claude announces "SCSS foundation complete" → Copilot runs T013.5-CP1
- **After T007**: Claude announces "ThemeManager complete" → Copilot runs T013.5-CP2
- **After T009**: Claude announces "Template integration done" → Copilot runs T013.5-CP3
- **After T011**: Claude announces "Implementation complete" → Copilot starts T014-T019

### File Conflict Avoidance
- Claude owns: `_sass/*.scss`, `assets/js/*.js`, `_layouts/*.html`, `_includes/*.html` (except Atrium card if exists)
- Copilot owns: `_data/*.yml`, `_posts/*.md`, test results in `.collaboration/`
- No tasks modify the same file except T013.5 (read-only verification)

### Testing Strategy
- **T013.5**: Checkpoint testing after each major phase (early issue detection)
- **T014-T015**: Manual quickstart scenario execution (user acceptance testing)
- **T016-T018**: Automated validation (Lighthouse, contrast checker, browser testing)
- **T019**: Meta-documentation (capture the dual-wielding process)

---

## Progress Tracking

**Phase Completion**:
- [ ] Phase 3.1: SCSS Foundation (T001-T003) - 3 tasks
- [ ] Phase 3.2: Theme-Aware Components (T004-T006) - 3 tasks
- [ ] Phase 3.3: JavaScript Theme Manager (T007) - 1 task
- [ ] Phase 3.4: Template Integration (T008-T011) - 4 tasks
- [ ] Phase 3.5: Content & Documentation (T012-T013) - 2 tasks
- [ ] Phase 3.6: Build Verification (T013.5) - 1 task (4 checkpoints)
- [ ] Phase 3.7: Testing & Validation (T014-T018) - 5 tasks
- [ ] Phase 3.8: Final Documentation (T019) - 1 task

**Current Status**: Ready to begin implementation

**Agent Status Files**:
- Claude Code: `.collaboration/002-ui-overhaul/claude-status.md` (progress updates)
- GitHub Copilot: `.collaboration/002-ui-overhaul/copilot-status.md` (validation results)

---

## Success Criteria

✅ All 19 tasks completed  
✅ Jekyll site builds without errors  
✅ All quickstart scenarios pass (13 scenarios)  
✅ Lighthouse scores: Performance 90+, Accessibility 90+ (both themes)  
✅ WCAG AA contrast ratios verified (all text/bg combinations)  
✅ Theme persists across page reloads  
✅ Works without JavaScript (system preference)  
✅ Smooth transitions (250ms, respects reduced-motion)  
✅ No flash of wrong theme on page load  
✅ Atrium branding consistent across both themes  
✅ Browser compatibility verified (Chrome, Firefox, Safari, Edge)  
✅ Meta-documentation complete (dual-wielding blog post)

---

## Ready for Implementation

**Next Command**: Begin execution following agent delegation protocol

**Communication**: Via `.collaboration/002-ui-overhaul/` status files

**Coordination**: [Claude] and [Copilot] commit prefixes in git messages

---
