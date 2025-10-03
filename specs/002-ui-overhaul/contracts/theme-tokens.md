# Contract: Design Token System

**Feature**: 002-ui-overhaul  
**File**: `blog/_sass/_tokens.scss`  
**Purpose**: Define all design tokens as CSS custom properties for theme system

## Contract Specification

### File Structure

```scss
// ==================================================================
// Theme-Independent Tokens (never change across themes)
// ==================================================================
:root {
  // Atrium Branding
  // Typography
  // Spacing
  // Layout
  // Borders & Radius
  // Transitions
  // Glow Effects
}

// ==================================================================
// Light Mode Tokens
// ==================================================================
[data-theme="light"] {
  // Backgrounds
  // Text Colors
  // Borders
  // Interactive Elements
  // Links
  // Atrium-Specific
  // Shadows
}

// ==================================================================
// Dark Mode Tokens
// ==================================================================
[data-theme="dark"] {
  // Backgrounds
  // Text Colors
  // Borders
  // Interactive Elements
  // Links
  // Atrium-Specific
  // Shadows
}
```

### Required Token Definitions

**Total**: 95 CSS custom properties

**Theme-Independent (47 tokens)**:
- 6 Atrium branding colors
- 17 typography tokens (fonts, sizes, weights, line-heights)
- 8 spacing scale values
- 7 layout dimensions
- 4 border radius values
- 3 transition durations
- 2 glow effect shadows

**Light Mode (24 tokens)**:
- 4 background colors (#ffffff, #f8f9fa, #e9ecef, #ffffff)
- 4 text colors (#1a202c, #4a5568, #718096, #ffffff)
- 3 border colors
- 3 interactive element colors
- 3 link colors
- 3 Atrium card colors
- 4 shadow definitions

**Dark Mode (24 tokens)**:
- 4 background colors (#0f172a, #1e293b, #334155, #1e293b)
- 4 text colors (#f1f5f9, #cbd5e0, #94a3b8, #0f172a)
- 3 border colors
- 3 interactive element colors
- 3 link colors
- 3 Atrium card colors
- 4 shadow definitions

### Accessibility Requirements

1. **Contrast Ratios**:
   - `--text-primary` / `--bg-primary` MUST achieve 4.5:1 minimum (WCAG AA)
   - `--text-secondary` / `--bg-primary` MUST achieve 4.5:1 minimum
   - `--link-color` / `--bg-primary` MUST achieve 4.5:1 minimum
   - Border colors MUST achieve 3:1 minimum against backgrounds

2. **Verification**:
   - Test with WebAIM Contrast Checker
   - Document ratios in comments

3. **Focus Indicators**:
   - `--border-focus` (purple #a78bfa) MUST be visible on both themes
   - Minimum 3:1 contrast against backgrounds

### Token Usage Rules

1. **Components MUST**:
   - Reference tokens via `var(--token-name)`
   - Never use hard-coded color/size values
   - Fall back gracefully if token undefined

2. **Tokens MUST NOT**:
   - Reference each other circularly
   - Use `!important` flag
   - Include browser-specific prefixes (handled by autoprefixer)

3. **Token Values MUST**:
   - Use consistent units (rem for sizes, px for shadows)
   - Include fallback values where appropriate
   - Be documented with usage comments

### Validation Criteria

**File Creation**:
- [ ] File exists at `blog/_sass/_tokens.scss`
- [ ] File has 3 main sections (root, light, dark)
- [ ] File defines exactly 95 tokens

**Token Completeness**:
- [ ] All 47 theme-independent tokens defined
- [ ] All 24 light mode tokens defined
- [ ] All 24 dark mode tokens defined

**Accessibility**:
- [ ] Light mode text/bg contrast ≥ 4.5:1
- [ ] Dark mode text/bg contrast ≥ 4.5:1
- [ ] Focus indicator contrast ≥ 3:1

**Integration**:
- [ ] Imported in `blog/assets/css/main.scss` as first import
- [ ] No SCSS compilation errors
- [ ] Tokens accessible to all other SCSS files

### Example Token Definitions

```scss
:root {
  // Atrium Branding - Consistent across Bridge and Atrium
  --atrium-purple: #a78bfa;
  --atrium-purple-bright: #c4b5fd;
  --atrium-purple-dark: #8b7fb8;
  
  // Typography - 16px base, 1.125 scale
  --font-base: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
}

[data-theme="light"] {
  // Backgrounds - Clean, professional white/gray
  --bg-primary: #ffffff;           // Main page bg
  --text-primary: #1a202c;         // Main text (16.57:1 contrast ✓)
  --accent-primary: #8b7fb8;       // Muted purple for light mode
}

[data-theme="dark"] {
  // Backgrounds - Lighter than Atrium to differentiate
  --bg-primary: #0f172a;           // Slate 900
  --text-primary: #f1f5f9;         // Light text (16.89:1 contrast ✓)
  --accent-primary: var(--atrium-purple);  // Full purple for dark mode
}
```

### Dependencies

**Consumed By**:
- `_components.scss`
- `_typography.scss`
- `_layout.scss`
- All component styles

**Requires**:
- None (first file in import chain)

---
