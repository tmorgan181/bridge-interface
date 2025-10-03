# Feature Specification: Light/Dark Mode Design System with Atrium Visual Continuity

**Feature Branch**: `002-ui-overhaul`  
**Created**: 2025-10-03  
**Status**: Draft  
**Input**: User description: "ui-overhaul: Implement comprehensive light/dark mode design system with Atrium visual continuity"

## Execution Flow (main)
```
1. ✅ Parse user description from Input
2. ✅ Extract key concepts from description
   → Identified: light/dark themes, visual design system, Atrium branding connection
3. ✅ No unclear aspects - comprehensive design spec provided in DRAFT
4. ✅ Fill User Scenarios & Testing section
5. ✅ Generate Functional Requirements
6. ✅ Identify Key Entities (design tokens, theme states)
7. ✅ Run Review Checklist
8. ✅ Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

---

## User Scenarios & Testing

### Primary User Story
**As a** visitor to The Bridge  
**I want** to choose between light and dark visual themes  
**So that** I can read content comfortably in my preferred environment while experiencing a cohesive visual connection to The Atrium

### Acceptance Scenarios

1. **Given** a new visitor arrives at The Bridge  
   **When** they view the site  
   **Then** the site displays in their system's preferred color scheme (light or dark)

2. **Given** a visitor prefers a different theme than their system default  
   **When** they click the theme toggle button  
   **Then** the entire site instantly switches between light and dark mode, and their preference is remembered for future visits

3. **Given** a visitor is reading in light mode  
   **When** they view content  
   **Then** text is displayed on clean white backgrounds with professional gray accents and subtle purple hints connecting to Atrium

4. **Given** a visitor is reading in dark mode  
   **When** they view content  
   **Then** text is displayed on dark slate backgrounds (lighter than Atrium's navy) with prominent purple/blue glowing accents

5. **Given** a visitor encounters Atrium-related content (links, preview cards)  
   **When** they view these elements in either mode  
   **Then** Atrium elements use consistent purple (#a78bfa) branding and distinctive dark styling that stands out appropriately

6. **Given** a visitor navigates between pages  
   **When** the page loads  
   **Then** their theme preference persists without flickering or flash of wrong theme

### Edge Cases
- What happens when a user has custom browser high-contrast mode enabled?
- How does the theme toggle behave if JavaScript is disabled?
- What if a user's system preference changes while browsing the site?
- How do code blocks with syntax highlighting adapt between themes?

---

## Requirements

### Visual Design System

**Theme Modes**
- **FR-001**: Site MUST support two distinct color themes: light mode (default) and dark mode
- **FR-002**: Light mode MUST use clean white/gray palette (#ffffff, #f8f9fa, #e9ecef backgrounds) conveying professionalism and accessibility
- **FR-003**: Dark mode MUST use slate backgrounds (#0f172a, #1e293b, #334155) that are lighter than Atrium's deep navy to create visual distinction
- **FR-004**: Both modes MUST use identical Atrium signature colors (purple #a78bfa, blue #60a5fa) that never change

**Theme Selection & Persistence**
- **FR-005**: Site MUST detect user's system color scheme preference (prefers-color-scheme) and display matching theme by default
- **FR-006**: Site MUST provide visible theme toggle button accessible from all pages
- **FR-007**: User's theme selection MUST be persisted across browsing sessions
- **FR-008**: If system preference changes during browsing AND user has not manually selected theme, site MUST adapt to new system preference
- **FR-009**: Theme transitions MUST be smooth without jarring color flashes

**Typography & Readability**
- **FR-010**: Site MUST use professional sans-serif font (Inter or equivalent) for body text
- **FR-011**: Site MUST use monospace font (JetBrains Mono or equivalent) for code
- **FR-012**: Text sizing MUST follow clear hierarchy (12px to 36px range) with consistent scale
- **FR-013**: Line heights MUST optimize readability (tight 1.25 for headings, relaxed 1.75 for body)
- **FR-014**: Text contrast ratios MUST meet WCAG AA standards in both light and dark modes

**Color Accessibility**
- **FR-015**: All text/background combinations MUST achieve minimum 4.5:1 contrast ratio (WCAG AA)
- **FR-016**: Interactive elements MUST achieve minimum 3:1 contrast ratio with surroundings
- **FR-017**: Color MUST NOT be the only means of conveying information or state
- **FR-018**: Focus indicators MUST be clearly visible in both themes

**Brand Identity: The Bridge vs. The Atrium**
- **FR-019**: Light mode MUST feel professional, welcoming, and accessible - positioning Bridge as "public gateway"
- **FR-020**: Dark mode MUST feel like "the entrance hall to The Atrium" with enhanced purple/blue glowing effects
- **FR-021**: Atrium-specific elements (links, preview cards) MUST use distinctive dark navy/indigo backgrounds in BOTH modes
- **FR-022**: All Atrium branding MUST use consistent purple (#a78bfa) across both themes and future Atrium portal
- **FR-023**: Purple/blue gradient effects MUST be more prominent in dark mode than light mode

### Component Styling

**Navigation**
- **FR-024**: Site header MUST have sticky positioning with backdrop blur effect
- **FR-025**: Navigation links MUST have subtle color on default, purple glow on hover
- **FR-026**: Atrium navigation link MUST be visually distinguished with purple color and semibold weight
- **FR-027**: Theme toggle button MUST display sun icon in dark mode, moon icon in light mode

**Content Cards**
- **FR-028**: Post cards MUST have elevated background with subtle borders
- **FR-029**: Card hover state MUST show purple border glow and subtle upward movement
- **FR-030**: Card text hierarchy MUST be clear: bold title, tertiary meta info, secondary excerpt
- **FR-031**: Cards MUST maintain readability and visual appeal in both themes

**Atrium Preview Elements**
- **FR-032**: Atrium preview cards MUST use dark navy/indigo gradient background in both themes
- **FR-033**: Atrium cards MUST have subtle animated gradient shimmer effect
- **FR-034**: Atrium call-to-action buttons MUST use purple-to-blue gradient
- **FR-035**: Atrium elements MUST have enhanced glow effects on hover

**Code Display**
- **FR-036**: Inline code MUST have colored background with purple text highlighting
- **FR-037**: Code blocks MUST have monospace font with appropriate padding and scrolling
- **FR-038**: Code block backgrounds MUST adapt between themes while maintaining readability

**Interactive Elements**
- **FR-039**: All buttons MUST have clear default, hover, focus, and active states
- **FR-040**: Primary buttons MUST use purple accent color
- **FR-041**: Atrium-specific buttons MUST use purple-blue gradient with enhanced hover effects
- **FR-042**: Links MUST have distinguishable hover states without relying solely on color

### Layout & Spacing

- **FR-043**: Site MUST use consistent spacing scale based on 4px increments (4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px)
- **FR-044**: Content MUST have maximum width of 65 characters for optimal readability
- **FR-045**: Site container MUST have maximum width of 1200px
- **FR-046**: Responsive breakpoints MUST accommodate mobile (640px), tablet (768px), desktop (1024px), wide (1280px)

### Performance & Technical

- **FR-047**: Theme switching MUST complete transition within 300ms
- **FR-048**: Site MUST NOT flash wrong theme color during page load
- **FR-049**: Core content MUST be readable even if JavaScript fails to load (defaults to system theme)
- **FR-050**: Design system MUST maintain existing Jekyll structure without framework changes
- **FR-051**: Lighthouse Performance score MUST remain 90+ in both themes
- **FR-052**: Lighthouse Accessibility score MUST be 90+ in both themes

### Design System Architecture

- **FR-053**: All visual decisions MUST be defined as CSS custom properties (design tokens)
- **FR-054**: Design tokens MUST be organized by category: colors, typography, spacing, layout, effects, transitions
- **FR-055**: Theme-specific tokens MUST be scoped to [data-theme="light"] and [data-theme="dark"] attributes
- **FR-056**: Atrium signature colors MUST be defined at root level (theme-independent)
- **FR-057**: Component styles MUST reference design tokens, never hard-coded values
- **FR-058**: Design system MUST support future Phase 2 interactive demos without breaking changes

### Key Entities

**Theme State**
- Represents: Current color mode (light or dark)
- Attributes: Active theme name, user preference vs system default, transition state
- Storage: Browser localStorage for persistence
- Relationships: Controls all theme-specific design tokens

**Design Tokens**
- Represents: Centralized visual design decisions
- Categories: Backgrounds, text colors, borders, accents, shadows, typography, spacing, layout, transitions
- Variants: Theme-specific (light/dark) vs theme-independent (Atrium colors, typography, spacing)
- Relationships: Referenced by all component styles

**Atrium Brand Identity**
- Represents: Visual connection between Bridge and Atrium
- Attributes: Signature colors (purple #a78bfa, blue #60a5fa), navy/indigo gradients, glow effects
- Consistency: Same across both Bridge themes and future Atrium portal
- Relationships: Used in navigation links, preview cards, buttons, accents

**Component Styles**
- Represents: Reusable UI element appearances
- Examples: Header, navigation, post cards, buttons, code blocks, Atrium preview cards
- States: Default, hover, focus, active
- Relationships: Built using design tokens, adapts automatically to theme changes

---

## Review & Acceptance Checklist

### Content Quality
- [x] No implementation details (languages, frameworks, APIs) - focuses on visual outcomes
- [x] Focused on user value and business needs - theme preference, readability, brand identity
- [x] Written for non-technical stakeholders - describes visual experience
- [x] All mandatory sections completed

### Requirement Completeness
- [x] No [NEEDS CLARIFICATION] markers remain - comprehensive design spec provided
- [x] Requirements are testable and unambiguous - specific colors, ratios, behaviors
- [x] Success criteria are measurable - WCAG AA compliance, Lighthouse scores 90+
- [x] Scope is clearly bounded - visual design system only, maintains Jekyll structure
- [x] Dependencies and assumptions identified - builds on Phase 1 structure

---

## Constitutional Alignment

This spec aligns with Bridge Interface Constitution v1.0.0:

- **Principle I - Build Simple, Architect Smart**: Enhances Phase 1 with pure CSS/token system, no framework changes
- **Principle II - Accessibility Over Jargon**: Professional visual design welcomes ordinary folks in both themes
- **Principle III - Honest Middle Ground**: Light mode = accessible/professional, Dark mode = entrance to Atrium depth
- **Principle IV - Progressive Enhancement**: Works with system preference if JS fails, enhanced with toggle
- **Principle V - Design System That Scales**: Token system and Atrium branding ready for Phase 2-4 evolution

---

## Execution Status

- [x] User description parsed
- [x] Key concepts extracted (light/dark themes, Atrium visual continuity, token system)
- [x] Ambiguities marked (none - comprehensive design spec provided)
- [x] User scenarios defined (6 acceptance scenarios, 4 edge cases)
- [x] Requirements generated (58 functional requirements)
- [x] Entities identified (4 key entities: Theme State, Design Tokens, Atrium Brand, Components)
- [x] Review checklist passed

**Status**: ✅ **READY FOR PLANNING** - Comprehensive specification complete, proceed to `/plan`

---
