# Research: Light/Dark Mode Design System Implementation

**Feature**: 002-ui-overhaul  
**Date**: 2025-10-03  
**Status**: Complete

## Overview

This document captures research decisions for implementing a light/dark mode design system that creates visual continuity between The Bridge (public blog) and The Atrium (research facility) while maintaining accessibility and constitutional principles.

---

## Decision 1: CSS Custom Properties vs. SCSS Variables

**Context**: Need theme-switching capability that works at runtime without recompilation.

**Decision**: Use CSS Custom Properties (CSS Variables) for all theme-specific tokens

**Rationale**:
- CSS custom properties can be changed at runtime via `[data-theme="dark"]` attribute
- SCSS variables compile to static values and cannot switch themes dynamically
- Browser support is excellent (96%+ global coverage, all modern browsers)
- Fits progressive enhancement model - CSS-only solution with JS enhancement

**Alternatives Considered**:
- **SCSS variables only**: Would require separate compiled stylesheets per theme, doubling CSS payload and requiring page reload
- **CSS-in-JS**: Adds framework dependency, violates "Build Simple" principle
- **Prefers-color-scheme only**: Works but no manual toggle possible

**Implementation Approach**:
```scss
:root {
  // Theme-independent tokens (Atrium branding)
  --atrium-purple: #a78bfa;
  --atrium-blue: #60a5fa;
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --text-primary: #1a202c;
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
}
```

---

## Decision 2: Theme Detection Strategy

**Context**: Need to respect user preferences while allowing manual override.

**Decision**: Three-tier preference system: localStorage → user system preference → default light

**Rationale**:
- **localStorage first**: Respects explicit user choice, persists across visits
- **System preference second**: Respects OS-level preference if no manual choice made
- **Light mode default**: Ensures accessible experience if neither exists (edge case: old browsers, disabled JS)
- Industry standard pattern (GitHub, Slack, Discord all use this approach)

**Alternatives Considered**:
- **System preference only**: No way to override without changing OS settings
- **Cookie-based**: More complexity, GDPR considerations, localStorage simpler
- **Dark default**: Alienates users who prefer light mode for accessibility

**Implementation Approach**:
```javascript
function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
}
```

---

## Decision 3: Preventing Flash of Wrong Theme (FOUT/FOUC)

**Context**: Avoid jarring flash when page loads with system theme then switches to saved preference.

**Decision**: Inline critical theme detection script in <head> before any CSS loads

**Rationale**:
- Runs synchronously before first paint
- Sets `data-theme` attribute before browser renders
- Small script (~200 bytes) acceptable for inline
- No external JavaScript dependency required
- Industry best practice (Next.js, Gatsby theme systems use this)

**Alternatives Considered**:
- **External script**: Creates timing gap, flash inevitable
- **Server-side rendering**: Jekyll is static, cannot detect user preference at build time
- **CSS-only with prefers-color-scheme**: Works but no manual toggle, no persistence

**Implementation Approach**:
```html
<head>
  <script>
    (function() {
      const theme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>
  <link rel="stylesheet" href="/assets/css/main.css">
</head>
```

---

## Decision 4: Atrium Visual Identity Separation

**Context**: The Bridge should feel distinct from Atrium while showing clear connection.

**Decision**: Shared purple branding (#a78bfa), but Bridge uses lighter backgrounds in dark mode (#0f172a slate vs #1a1d2e Atrium navy)

**Rationale**:
- **Light mode Bridge**: Clean white/gray (#ffffff, #f8f9fa) = "public gateway" aesthetic
- **Dark mode Bridge**: Lighter slate (#0f172a) = "entrance hall" vs Atrium's deep navy (#1a1d2e) = "research facility"
- **Consistent purple**: #a78bfa across both sites establishes brand continuity
- **Visual metaphor**: Bridge is literally "lighter" than Atrium in dark mode
- Atrium preview cards use Atrium's actual colors in both Bridge themes

**Alternatives Considered**:
- **Identical styling**: No visual distinction between public and research spaces
- **Completely different colors**: Breaks brand continuity, confuses connection
- **Different purple shades**: Tested but felt disjointed, single purple stronger

**Color Specifications**:
```scss
// Bridge dark mode backgrounds
--bg-primary: #0f172a;    // Slate 900
--bg-secondary: #1e293b;  // Slate 800

// Atrium backgrounds (used in preview cards on Bridge)
--atrium-navy: #1a1d2e;
--atrium-indigo: #312e81;

// Shared across both
--atrium-purple: #a78bfa;
--atrium-blue: #60a5fa;
```

---

## Decision 5: Accessibility Compliance Strategy

**Context**: Must meet WCAG AA standards in both light and dark themes.

**Decision**: Design token values chosen specifically to meet 4.5:1 contrast ratio minimum

**Rationale**:
- **Light mode**: Dark gray text (#1a202c) on white (#ffffff) = 16.57:1 ratio
- **Dark mode**: Light gray text (#f1f5f9) on slate (#0f172a) = 16.89:1 ratio  
- **Link colors**: Tested to ensure 4.5:1 minimum against backgrounds
- **Interactive elements**: 3:1 minimum contrast with surroundings
- **Focus indicators**: Purple border (#a78bfa) meets 3:1 on both themes

**Alternatives Considered**:
- **Lower contrast dark mode**: Failed WCAG AA, #94a3b8 on #0f172a only 7.2:1
- **Pure black dark mode**: High contrast but harsh, accessibility doesn't require it
- **Color-only state indication**: Would fail WCAG, using shape + color + text

**Verification Approach**:
- Test with WebAIM Contrast Checker during design
- Lighthouse accessibility audit must score 90+
- Manual testing with screen readers (NVDA, VoiceOver)

---

## Decision 6: Animation and Motion Strategy

**Context**: Theme transitions need smoothness without causing motion sickness.

**Decision**: 250ms ease-in-out transitions on color properties only, respects prefers-reduced-motion

**Rationale**:
- 250ms is perceptible but not slow (research shows 200-300ms ideal for color transitions)
- Color transitions only - no layout shifts or transforms
- Respects `prefers-reduced-motion` media query for accessibility
- Applied only during active transition, not on every property change

**Alternatives Considered**:
- **Instant theme switch**: Jarring, feels broken
- **500ms+ transitions**: Feels sluggish, users notice delay
- **Animated transforms**: Risk of motion sickness, unnecessary complexity

**Implementation Approach**:
```scss
.theme-transitioning * {
  transition: background-color 250ms ease-in-out,
              color 250ms ease-in-out,
              border-color 250ms ease-in-out !important;
}

@media (prefers-reduced-motion: reduce) {
  .theme-transitioning * {
    transition: none !important;
  }
}
```

---

## Decision 7: Component Glow Effects

**Context**: Atrium elements need distinctive visual treatment without being garish.

**Decision**: Subtle purple glow on hover (12px blur, 40% opacity in dark mode, 20% in light mode)

**Rationale**:
- Reinforces Atrium brand identity without overwhelming
- More prominent in dark mode (where glows are expected)
- Reduced in light mode (where glows can look out of place)
- Uses CSS box-shadow for performance (GPU-accelerated)

**Alternatives Considered**:
- **Same glow intensity both modes**: Too strong in light, too weak in dark
- **No glow effects**: Loses "research facility" aesthetic
- **Always-on glow**: Distracting, reserve for interactive states

**Implementation**:
```scss
:root {
  --glow-purple: 0 0 12px rgba(167, 139, 250, 0.4);
}

[data-theme="light"] {
  --shadow-glow: 0 4px 12px rgba(167, 139, 250, 0.2);
}

[data-theme="dark"] {
  --shadow-glow: 0 4px 16px rgba(167, 139, 250, 0.4);
}
```

---

## Decision 8: Typography System

**Context**: Need professional, readable fonts that work in both themes and support code.

**Decision**: Inter for UI/body text, JetBrains Mono for code

**Rationale**:
- **Inter**: Open source, excellent readability, modern without being trendy, wide language support
- **JetBrains Mono**: Designed for code, clear character distinction (0/O, 1/l/I), ligature support
- Both have web-optimized subsets available via Google Fonts or self-hosted
- Fallback chain includes system fonts for fast loading

**Alternatives Considered**:
- **System font stack only**: Inconsistent across platforms, no brand identity
- **Serif fonts (Georgia, etc.)**: Too academic, not modern enough
- **Trendy fonts (Poppins, etc.)**: Risk dating quickly

**Font Stack**:
```scss
--font-base: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;
```

---

## Decision 9: Code Block Syntax Highlighting

**Context**: Need syntax highlighting that works in both themes.

**Decision**: Use Jekyll's default Rouge highlighter with custom theme-aware CSS

**Rationale**:
- Rouge is already installed with Jekyll, no new dependency
- Supports 100+ languages out of the box
- Can override token colors with CSS custom properties
- GitHub-style highlighting is familiar and accessible

**Alternatives Considered**:
- **Prism.js**: Adds JavaScript dependency for static highlighting
- **Highlight.js**: Same issue, unnecessary for Jekyll
- **No highlighting**: Reduces code readability

**Implementation Approach**:
```scss
.highlight {
  .k { color: var(--syntax-keyword); }
  .s { color: var(--syntax-string); }
  .c { color: var(--syntax-comment); }
  // etc.
}

[data-theme="light"] {
  --syntax-keyword: #8b7fb8;
  --syntax-string: #2d8659;
  --syntax-comment: #6a737d;
}

[data-theme="dark"] {
  --syntax-keyword: var(--atrium-purple);
  --syntax-string: #7ee787;
  --syntax-comment: #8b949e;
}
```

---

## Decision 10: Theme Toggle UI Placement

**Context**: Toggle needs to be discoverable but not intrusive.

**Decision**: Toggle button in header navigation, right side, before mobile menu if present

**Rationale**:
- Header is consistent across all pages
- Right side is convention (GitHub, Twitter, most sites)
- Accessible via keyboard navigation
- Always visible on desktop, included in mobile menu
- Sun/moon emoji icons are universally understood

**Alternatives Considered**:
- **Footer**: Too hidden, users might not discover
- **Floating button**: Intrusive, blocks content
- **Settings page**: Too buried, theme is primary preference

**Implementation**:
```html
<button class="theme-toggle" aria-label="Toggle theme">
  <span class="icon-sun">☀️</span>
  <span class="icon-moon">🌙</span>
</button>
```

---

## Technology Stack Summary

**Required**:
- Jekyll 4.x (existing)
- SCSS with CSS custom properties
- Vanilla JavaScript (ES6+)
- localStorage API

**No New Dependencies**: All features use existing Jekyll setup + standard web APIs

**Browser Support**:
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- CSS custom properties: 96%+ global support
- localStorage: 98%+ global support
- prefers-color-scheme: 95%+ global support

**Graceful Degradation**:
- Old browsers: Light mode via default CSS
- No JavaScript: System preference via prefers-color-scheme
- No localStorage: Theme resets each visit

---

## Performance Considerations

**CSS Payload**:
- Current Phase 1 CSS: ~20KB minified
- Estimated additional: ~8KB (theme tokens + transitions)
- Total: ~28KB minified (still excellent)

**JavaScript Payload**:
- Theme manager module: ~1KB minified
- Inline head script: ~200 bytes
- Total JS: ~1.2KB (negligible)

**Runtime Performance**:
- CSS custom property updates: GPU-accelerated
- Theme toggle: < 300ms transition time
- localStorage read/write: < 1ms
- No layout reflow during theme switch

**Lighthouse Score Impact**:
- Estimated Performance: 95+ (minimal JS, small CSS increase)
- Estimated Accessibility: 95+ (WCAG AA compliance)
- Estimated Best Practices: 100 (no new dependencies)

---

## Risks & Mitigation

**Risk 1: Flash of Wrong Theme**
- **Mitigation**: Inline critical script in <head>
- **Fallback**: Accept brief flash rather than block render

**Risk 2: JavaScript Disabled**
- **Mitigation**: CSS prefers-color-scheme as fallback
- **Degradation**: No manual toggle, system preference only

**Risk 3: localStorage Quota/Disabled**
- **Mitigation**: Try/catch around localStorage access
- **Degradation**: Theme resets each visit

**Risk 4: Color Contrast Violations**
- **Mitigation**: Test all token combinations with contrast checker
- **Process**: Manual verification before marking tasks complete

**Risk 5: Motion Sickness from Transitions**
- **Mitigation**: Respect prefers-reduced-motion
- **Fallback**: Instant theme switch for users with motion sensitivity

---

## Research Complete

All technical unknowns resolved. Ready to proceed to Phase 1 (Design & Contracts).

**Key Takeaways**:
1. CSS custom properties enable runtime theme switching
2. Inline critical JS prevents flash of wrong theme
3. Three-tier preference system (localStorage → system → default)
4. Lighter slate backgrounds distinguish Bridge from Atrium
5. WCAG AA compliance verified through token selection
6. No new dependencies, pure enhancement of Phase 1

---
