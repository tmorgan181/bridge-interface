# Contract: Component Style Requirements

**Feature**: 002-ui-overhaul  
**Files**: `blog/_sass/_components.scss`, `_typography.scss`, `_layout.scss`  
**Purpose**: Define theme-aware component styling requirements

## Core Requirements

### Token Usage Rule

**ALL component styles MUST**:
1. Reference design tokens via `var(--token-name)`
2. Never use hard-coded colors, sizes, or effects
3. Work in both light and dark themes without theme-specific overrides

**Example**:
```scss
// ✅ CORRECT
.post-card {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

// ❌ WRONG
.post-card {
  background: #ffffff;
  color: #1a202c;
  border: 1px solid #e2e8f0;
}
```

---

## Component Contracts

### Theme Toggle Button

**File**: `_components.scss`  
**Class**: `.theme-toggle`

**Requirements**:
- [ ] Circular button with elevated background
- [ ] Contains `.icon-sun` and `.icon-moon` spans
- [ ] Shows moon in light mode, sun in dark mode
- [ ] Purple glow on hover
- [ ] Smooth transitions on all state changes

**States**:
- Default: Subtle border, no shadow
- Hover: Purple border, purple glow shadow
- Focus: Purple border, visible focus ring
- Active: Darker purple border

**CSS Display Logic**:
```scss
.theme-toggle {
  .icon-sun { display: none; }
  .icon-moon { display: block; }
  
  [data-theme="dark"] & {
    .icon-sun { display: block; }
    .icon-moon { display: none; }
  }
}
```

---

### Navigation Links

**File**: `_components.scss`  
**Class**: `.nav-link`, `.atrium-link`

**Requirements**:
- [ ] Secondary text color by default
- [ ] Purple hover color with subtle glow
- [ ] Smooth color transitions
- [ ] Atrium link always purple, semibold weight

**States**:
- Default: `--text-secondary`
- Hover: `--accent-hover` with `--glow-purple` text-shadow
- Focus: Same as hover with focus ring
- Active: `--accent-active`

---

### Post Cards

**File**: `_components.scss`  
**Class**: `.post-card`

**Requirements**:
- [ ] Elevated background with subtle border
- [ ] Rounded corners (`--radius-lg`)
- [ ] Generous padding (`--space-xl`)
- [ ] Lift on hover (transform + enhanced shadow)
- [ ] Smooth transitions on all hover effects

**Sub-elements**:
- `.post-title`: Primary text, large size, bold
- `.post-meta`: Tertiary text, small size
- `.post-excerpt`: Secondary text, relaxed line-height

**Hover Effect**:
```scss
&:hover {
  border-color: var(--accent-hover);
  box-shadow: var(--shadow-glow);
  transform: translateY(-2px);
}
```

---

### Atrium Preview Card

**File**: `_components.scss`  
**Class**: `.atrium-preview .atrium-card`

**Requirements**:
- [ ] Dark navy/indigo gradient background (same in both themes)
- [ ] Animated shimmer effect overlay
- [ ] Purple-blue gradient CTA button
- [ ] Enhanced glow on button hover

**Special**: This component maintains Atrium's dark aesthetic even in light mode

**Structure**:
```scss
.atrium-card {
  background: var(--atrium-card-bg);
  
  h2 {
    color: var(--atrium-card-heading);
  }
  
  p {
    color: var(--atrium-card-text);
  }
  
  .cta-button {
    background: linear-gradient(135deg, var(--atrium-purple) 0%, var(--atrium-blue) 100%);
  }
}
```

---

### Code Blocks

**File**: `_typography.scss`  
**Classes**: `code`, `pre`

**Inline Code Requirements**:
- [ ] Monospace font
- [ ] Tertiary background color
- [ ] Purple text color
- [ ] Small padding and border radius

**Block Code Requirements**:
- [ ] Monospace font
- [ ] Secondary background with border
- [ ] Primary text color (syntax highlight overrides)
- [ ] Horizontal scroll if needed
- [ ] Generous padding

---

### Buttons

**File**: `_components.scss`  
**Class**: `.btn`, `.btn-primary`, `.btn-atrium`

**Base Button Requirements**:
- [ ] Medium padding
- [ ] Medium border radius
- [ ] Medium font weight
- [ ] Smooth transitions

**Primary Button**:
- Background: `--accent-primary`
- Color: `--text-inverse`
- Hover: `--accent-hover` with glow

**Atrium Button**:
- Background: Purple-blue gradient
- Color: white
- Hover: Enhanced shadow, slight transform

---

## Layout Components

### Site Header

**File**: `_layout.scss`  
**Class**: `.site-header`

**Requirements**:
- [ ] Elevated background
- [ ] Bottom border
- [ ] Fixed height (`--header-height`)
- [ ] Sticky positioning
- [ ] Backdrop blur effect

---

### Container

**File**: `_layout.scss`  
**Class**: `.container`

**Requirements**:
- [ ] Max width constraint
- [ ] Horizontal padding
- [ ] Centered with auto margins

---

## Validation Checklist

**Token Compliance**:
- [ ] No hard-coded hex colors in any component
- [ ] No hard-coded rem/px sizes (except where tokens don't apply)
- [ ] All var() references valid tokens

**Theme Compatibility**:
- [ ] All components tested in light mode
- [ ] All components tested in dark mode
- [ ] No component-specific [data-theme] overrides needed

**Accessibility**:
- [ ] All text/background combinations meet contrast ratios
- [ ] Focus states visible in both themes
- [ ] Interactive elements have proper hover/focus states

**Performance**:
- [ ] Transitions only on color/shadow properties
- [ ] No layout shifts during theme changes
- [ ] GPU-accelerated properties only (transform, opacity, box-shadow)

---
