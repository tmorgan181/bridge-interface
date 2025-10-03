# Data Model: Light/Dark Mode Design System

**Feature**: 002-ui-overhaul  
**Date**: 2025-10-03  
**Status**: Complete

## Overview

This document defines the data structures and entities for the light/dark mode design system. Unlike traditional data models with databases, this feature's "data" consists of:

1. **Design Tokens** - CSS custom property definitions
2. **Theme State** - Runtime theme preference and detection
3. **Component Styles** - SCSS/CSS organizational structure

---

## Entity 1: Design Tokens

**Description**: Centralized design decisions expressed as CSS custom properties, organized by category and theme applicability.

### Token Categories

#### 1.1 Theme-Independent Tokens (Root Level)

**Scope**: Never change across themes, defined at `:root`

**Atrium Branding**:
```scss
:root {
  // Signature colors - consistent across Bridge and Atrium
  --atrium-purple: #a78bfa;
  --atrium-purple-bright: #c4b5fd;
  --atrium-purple-dark: #8b7fb8;
  --atrium-blue: #60a5fa;
  --atrium-navy: #1a1d2e;
  --atrium-indigo: #312e81;
  
  // Glow effects
  --glow-purple: 0 0 12px rgba(167, 139, 250, 0.4);
  --glow-blue: 0 0 12px rgba(96, 165, 250, 0.4);
}
```

**Typography** (4 properties + 6 sizes + 4 weights + 3 line-heights = 17 tokens):
```scss
:root {
  // Font families
  --font-base: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;
  
  // Font sizes (type scale)
  --font-size-xs: 0.75rem;     // 12px
  --font-size-sm: 0.875rem;    // 14px
  --font-size-base: 1rem;      // 16px
  --font-size-lg: 1.125rem;    // 18px
  --font-size-xl: 1.25rem;     // 20px
  --font-size-2xl: 1.5rem;     // 24px
  --font-size-3xl: 1.875rem;   // 30px
  --font-size-4xl: 2.25rem;    // 36px
  
  // Font weights
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  // Line heights
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}
```

**Spacing** (8 tokens):
```scss
:root {
  // Spacing scale (4px base unit)
  --space-xs: 0.25rem;    // 4px
  --space-sm: 0.5rem;     // 8px
  --space-md: 1rem;       // 16px
  --space-lg: 1.5rem;     // 24px
  --space-xl: 2rem;       // 32px
  --space-2xl: 3rem;      // 48px
  --space-3xl: 4rem;      // 64px
  --space-4xl: 6rem;      // 96px
}
```

**Layout** (7 tokens):
```scss
:root {
  // Container widths
  --container-max-width: 1200px;
  --content-max-width: 65ch;
  --header-height: 64px;
  
  // Breakpoints (for reference in media queries)
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
}
```

**Borders & Radius** (4 tokens):
```scss
:root {
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
}
```

**Transitions** (3 tokens):
```scss
:root {
  --transition-fast: 150ms ease-in-out;
  --transition-base: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
}
```

**Total Theme-Independent Tokens**: 46 tokens

---

#### 1.2 Light Mode Tokens

**Scope**: Applied when `[data-theme="light"]` attribute present

**Backgrounds** (4 tokens):
```scss
[data-theme="light"] {
  --bg-primary: #ffffff;      // Main page background
  --bg-secondary: #f8f9fa;    // Subtle contrast areas
  --bg-tertiary: #e9ecef;     // Deeper contrast (code blocks)
  --bg-elevated: #ffffff;     // Cards, modals (same as primary)
}
```

**Text Colors** (4 tokens):
```scss
[data-theme="light"] {
  --text-primary: #1a202c;    // Headings, main text
  --text-secondary: #4a5568;  // Body text, descriptions
  --text-tertiary: #718096;   // Meta info, captions
  --text-inverse: #ffffff;    // Text on dark backgrounds
}
```

**Borders** (3 tokens):
```scss
[data-theme="light"] {
  --border-primary: #e2e8f0;
  --border-secondary: #cbd5e0;
  --border-focus: var(--atrium-purple);
}
```

**Interactive Elements** (3 tokens):
```scss
[data-theme="light"] {
  --accent-primary: #8b7fb8;           // Muted purple
  --accent-hover: var(--atrium-purple);
  --accent-active: var(--atrium-purple-dark);
}
```

**Links** (3 tokens):
```scss
[data-theme="light"] {
  --link-color: #4a5568;
  --link-hover: var(--atrium-purple);
  --link-visited: #6d5d9c;
}
```

**Atrium-Specific** (3 tokens):
```scss
[data-theme="light"] {
  --atrium-card-bg: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  --atrium-card-text: #e0e7ff;
  --atrium-card-heading: var(--atrium-purple-bright);
}
```

**Shadows** (4 tokens):
```scss
[data-theme="light"] {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-glow: 0 4px 12px rgba(167, 139, 250, 0.2);
}
```

**Total Light Mode Tokens**: 24 tokens

---

#### 1.3 Dark Mode Tokens

**Scope**: Applied when `[data-theme="dark"]` attribute present

**Backgrounds** (4 tokens):
```scss
[data-theme="dark"] {
  --bg-primary: #0f172a;      // Slate 900 (lighter than Atrium)
  --bg-secondary: #1e293b;    // Slate 800
  --bg-tertiary: #334155;     // Slate 700
  --bg-elevated: #1e293b;     // Cards (slate 800)
}
```

**Text Colors** (4 tokens):
```scss
[data-theme="dark"] {
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e0;
  --text-tertiary: #94a3b8;
  --text-inverse: #0f172a;
}
```

**Borders** (3 tokens):
```scss
[data-theme="dark"] {
  --border-primary: #334155;
  --border-secondary: #475569;
  --border-focus: var(--atrium-purple);
}
```

**Interactive Elements** (3 tokens):
```scss
[data-theme="dark"] {
  --accent-primary: var(--atrium-purple);
  --accent-hover: var(--atrium-purple-bright);
  --accent-active: var(--atrium-purple-dark);
}
```

**Links** (3 tokens):
```scss
[data-theme="dark"] {
  --link-color: #94a3b8;
  --link-hover: var(--atrium-purple-bright);
  --link-visited: var(--atrium-purple-dark);
}
```

**Atrium-Specific** (3 tokens):
```scss
[data-theme="dark"] {
  --atrium-card-bg: linear-gradient(135deg, var(--atrium-navy) 0%, var(--atrium-indigo) 100%);
  --atrium-card-text: #e0e7ff;
  --atrium-card-heading: var(--atrium-purple-bright);
}
```

**Shadows** (4 tokens):
```scss
[data-theme="dark"] {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 4px 16px rgba(167, 139, 250, 0.4);
}
```

**Total Dark Mode Tokens**: 24 tokens

---

### Token Summary

| Category | Theme-Independent | Light Mode | Dark Mode | Total |
|----------|------------------|------------|-----------|-------|
| Atrium Branding | 6 | - | - | 6 |
| Typography | 17 | - | - | 17 |
| Spacing | 8 | - | - | 8 |
| Layout | 7 | - | - | 7 |
| Borders/Radius | 4 | - | - | 4 |
| Transitions | 3 | - | - | 3 |
| Glow Effects | 2 | - | - | 2 |
| Backgrounds | - | 4 | 4 | 8 |
| Text Colors | - | 4 | 4 | 8 |
| Borders (theme) | - | 3 | 3 | 6 |
| Interactive | - | 3 | 3 | 6 |
| Links | - | 3 | 3 | 6 |
| Atrium Cards | - | 3 | 3 | 6 |
| Shadows | - | 4 | 4 | 8 |
| **TOTAL** | **47** | **24** | **24** | **95** |

**Total Design Tokens**: 95 CSS custom properties

---

## Entity 2: Theme State

**Description**: Runtime state representing user's current theme preference and how it was determined.

### Attributes

```typescript
interface ThemeState {
  // Current active theme
  currentTheme: 'light' | 'dark';
  
  // How theme was determined
  source: 'localStorage' | 'system' | 'default';
  
  // Whether user has manually set preference
  userPreference: boolean;
  
  // System's color scheme preference
  systemPreference: 'light' | 'dark' | 'no-preference';
  
  // Whether theme is currently transitioning
  isTransitioning: boolean;
}
```

### State Transitions

```
Initial Load:
  1. Check localStorage.getItem('theme')
     → If exists: currentTheme = stored value, source = 'localStorage', userPreference = true
  2. Else check window.matchMedia('(prefers-color-scheme: dark)').matches
     → If dark: currentTheme = 'dark', source = 'system', userPreference = false
     → If light: currentTheme = 'light', source = 'system', userPreference = false
  3. Else: currentTheme = 'light', source = 'default', userPreference = false

Manual Toggle:
  currentTheme = (currentTheme === 'light' ? 'dark' : 'light')
  source = 'localStorage'
  userPreference = true
  localStorage.setItem('theme', currentTheme)
  document.documentElement.setAttribute('data-theme', currentTheme)

System Preference Change (during browsing):
  IF userPreference === false:
    currentTheme = new system preference
    document.documentElement.setAttribute('data-theme', currentTheme)
  ELSE:
    // Ignore system change, user has explicit preference
```

### Persistence

**Storage**: Browser localStorage
**Key**: `'theme'`
**Value**: `'light'` | `'dark'`
**Lifetime**: Permanent (until cleared by user)

### Accessibility Considerations

- HTML `data-theme` attribute must be set before any CSS loads (prevents flash)
- Theme toggle button must have proper `aria-label="Toggle theme"`
- Theme state change must not break keyboard navigation
- Focus indicator colors must meet 3:1 contrast in both themes

---

## Entity 3: Component Style Contracts

**Description**: SCSS/CSS organizational structure for component styling that references design tokens.

### Component Categories

#### 3.1 Layout Components

**Site Header**:
```scss
.site-header {
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border-primary);
  height: var(--header-height);
  // Uses: --bg-elevated, --border-primary, --header-height
}
```

**Container**:
```scss
.container {
  max-width: var(--container-max-width);
  padding: 0 var(--space-lg);
  // Uses: --container-max-width, --space-lg
}
```

**Content**:
```scss
.content {
  max-width: var(--content-max-width);
  // Uses: --content-max-width
}
```

#### 3.2 Navigation Components

**Nav Links**:
```scss
.nav-link {
  color: var(--text-secondary);
  transition: color var(--transition-base);
  
  &:hover {
    color: var(--accent-hover);
    text-shadow: var(--glow-purple);
  }
  
  &.atrium-link {
    color: var(--atrium-purple);
    font-weight: var(--font-weight-semibold);
  }
  // Uses: --text-secondary, --transition-base, --accent-hover, 
  //       --glow-purple, --atrium-purple, --font-weight-semibold
}
```

**Theme Toggle**:
```scss
.theme-toggle {
  background: var(--bg-elevated);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-full);
  padding: var(--space-sm);
  transition: all var(--transition-base);
  
  &:hover {
    border-color: var(--accent-hover);
    box-shadow: var(--shadow-glow);
  }
  // Uses: --bg-elevated, --border-primary, --radius-full, --space-sm,
  //       --transition-base, --accent-hover, --shadow-glow
}
```

#### 3.3 Content Components

**Post Card**:
```scss
.post-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  transition: all var(--transition-base);
  
  &:hover {
    border-color: var(--accent-hover);
    box-shadow: var(--shadow-glow);
    transform: translateY(-2px);
  }
  
  .post-title {
    color: var(--text-primary);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
  }
  
  .post-meta {
    color: var(--text-tertiary);
    font-size: var(--font-size-sm);
  }
  
  .post-excerpt {
    color: var(--text-secondary);
    line-height: var(--line-height-relaxed);
  }
  // Uses: 14 different tokens
}
```

**Atrium Preview Card**:
```scss
.atrium-preview {
  .atrium-card {
    background: var(--atrium-card-bg);
    border-radius: var(--radius-lg);
    padding: var(--space-3xl);
    
    h2 {
      color: var(--atrium-card-heading);
      font-size: var(--font-size-3xl);
    }
    
    p {
      color: var(--atrium-card-text);
      font-size: var(--font-size-lg);
    }
    
    .cta-button {
      background: linear-gradient(135deg, var(--atrium-purple) 0%, var(--atrium-blue) 100%);
      color: white;
      padding: var(--space-md) var(--space-2xl);
      transition: all var(--transition-base);
      
      &:hover {
        box-shadow: 0 8px 20px rgba(167, 139, 250, 0.4);
      }
    }
  }
  // Uses: 11 different tokens
}
```

#### 3.4 Typography Components

**Code Blocks**:
```scss
code {
  font-family: var(--font-mono);
  background: var(--bg-tertiary);
  color: var(--atrium-purple);
  padding: 0.2em 0.4em;
  border-radius: var(--radius-sm);
}

pre {
  font-family: var(--font-mono);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  padding: var(--space-lg);
  border-radius: var(--radius-sm);
  
  code {
    background: none;
    color: var(--text-primary);
  }
  // Uses: 7 different tokens
}
```

#### 3.5 Interactive Components

**Buttons**:
```scss
.btn {
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-base);
  
  &.btn-primary {
    background: var(--accent-primary);
    color: var(--text-inverse);
    
    &:hover {
      background: var(--accent-hover);
      box-shadow: var(--shadow-glow);
    }
  }
  
  &.btn-atrium {
    background: linear-gradient(135deg, var(--atrium-purple) 0%, var(--atrium-blue) 100%);
    color: white;
    
    &:hover {
      box-shadow: 0 8px 20px rgba(167, 139, 250, 0.4);
    }
  }
  // Uses: 10 different tokens
}
```

---

## Entity 4: Theme Manager API

**Description**: JavaScript module API for theme detection, switching, and persistence.

### Public Methods

```typescript
class ThemeManager {
  // Initialize theme system
  constructor(): ThemeManager
  
  // Get current active theme
  getCurrentTheme(): 'light' | 'dark'
  
  // Toggle between light and dark
  toggleTheme(): void
  
  // Set specific theme
  setTheme(theme: 'light' | 'dark'): void
  
  // Get theme source (how it was determined)
  getThemeSource(): 'localStorage' | 'system' | 'default'
  
  // Check if user has manual preference
  hasUserPreference(): boolean
  
  // Clear user preference (revert to system)
  clearPreference(): void
}
```

### Implementation Contract

**Initialization**:
1. Read localStorage for saved preference
2. If no saved preference, check system preference
3. If no system preference, default to light
4. Set `data-theme` attribute on document element
5. Set up event listeners (toggle button, system change)

**Toggle Theme**:
1. Determine new theme (opposite of current)
2. Add `.theme-transitioning` class to html element
3. Set `data-theme` attribute to new theme
4. Save preference to localStorage
5. Remove `.theme-transitioning` class after 300ms

**System Preference Change**:
1. Listen for `(prefers-color-scheme: dark)` media query change
2. If user has manual preference, ignore change
3. If no manual preference, update theme to match system

**Error Handling**:
- Try/catch around localStorage access (may be disabled/quota exceeded)
- Fallback to session-only theme if localStorage fails
- Graceful degradation if JavaScript doesn't load

---

## File Organization

### SCSS Files

**blog/_sass/_tokens.scss** (NEW CONTENT):
- All 95 design tokens defined
- Organized by theme-independent → light → dark
- Comments indicating usage and relationships

**blog/_sass/_theme-transitions.scss** (NEW FILE):
- `.theme-transitioning` class for smooth transitions
- `@media (prefers-reduced-motion)` overrides
- Transition timing and properties

**blog/_sass/_components.scss** (ENHANCED):
- All existing components updated to use tokens
- New `.theme-toggle` button styles
- Enhanced `.atrium-preview` card styles

**blog/_sass/_typography.scss** (ENHANCED):
- Typography styles updated to use tokens
- Code block theme-aware colors

**blog/_sass/_layout.scss** (ENHANCED):
- Layout components updated to use tokens

### JavaScript Files

**blog/assets/js/theme-manager.js** (NEW):
- ThemeManager class implementation
- ~100 lines
- Vanilla ES6+, no dependencies

**blog/assets/js/progressive.js** (ENHANCED):
- Import and initialize ThemeManager
- Connect to toggle button

### Data Files

**blog/_data/design-tokens.yml** (ENHANCED):
- Human-readable token documentation
- Categories, values, usage notes
- References for contributors

### Template Files

**blog/_layouts/default.html** (ENHANCED):
- Include theme initialization script in <head>
- Add `data-theme` attribute to html element
- Include theme-manager.js at end of body

**blog/_includes/theme-script.html** (NEW):
- Inline critical theme detection
- ~15 lines, must run before CSS loads

**blog/_includes/header.html** (ENHANCED):
- Add theme toggle button to navigation
- Sun/moon icons with appropriate display logic

---

## Validation Rules

### Token Validation

**Color Tokens**:
- All text/background combinations MUST meet 4.5:1 contrast ratio (WCAG AA)
- All interactive element borders MUST meet 3:1 contrast ratio
- Test with WebAIM Contrast Checker

**Spacing Tokens**:
- Must follow 4px base unit (multiples of 0.25rem)
- Touch targets must be minimum 44x44px (mobile)

**Typography Tokens**:
- Font sizes must maintain readable scale (1.125-1.25 ratio between sizes)
- Line heights must be appropriate for font size (tighter for headings, relaxed for body)

### Theme State Validation

**Persistence**:
- localStorage theme value must be 'light' or 'dark' exactly
- Invalid values should default to light mode
- Missing localStorage should not throw errors

**Accessibility**:
- Theme change must not move focus
- Theme toggle must be keyboard accessible
- Theme must work without JavaScript (via prefers-color-scheme)

### Component Validation

**Token Usage**:
- Components must ONLY reference design tokens, never hard-coded values
- Token references must be valid (defined in _tokens.scss)
- Components must work in both light and dark themes

**Performance**:
- Transition classes must be temporary (removed after transition)
- Theme changes must not cause layout reflow
- CSS custom property updates must be GPU-accelerated

---

## Data Model Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Design Token System                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Theme-Independent Tokens (47 tokens)                │  │
│  │  - Atrium Branding (6)                                │  │
│  │  - Typography (17)                                     │  │
│  │  - Spacing (8)                                         │  │
│  │  - Layout (7)                                          │  │
│  │  - Borders/Radius (4)                                  │  │
│  │  - Transitions (3)                                     │  │
│  │  - Glow Effects (2)                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                    │
│                          │ Referenced by                     │
│                          ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  [data-theme="light"] Tokens (24 tokens)             │  │
│  │  - Backgrounds (4)                                     │  │
│  │  - Text Colors (4)                                     │  │
│  │  - Borders (3)                                         │  │
│  │  - Interactive (3)                                     │  │
│  │  - Links (3)                                           │  │
│  │  - Atrium Cards (3)                                    │  │
│  │  - Shadows (4)                                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  [data-theme="dark"] Tokens (24 tokens)              │  │
│  │  - Backgrounds (4)                                     │  │
│  │  - Text Colors (4)                                     │  │
│  │  - Borders (3)                                         │  │
│  │  - Interactive (3)                                     │  │
│  │  - Links (3)                                           │  │
│  │  - Atrium Cards (3)                                    │  │
│  │  - Shadows (4)                                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
└───────────────────────────┬───────────────────────────────────┘
                            │ Used by
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Component Styles                          │
├─────────────────────────────────────────────────────────────┤
│  - Layout (header, container, content)                      │
│  - Navigation (links, theme toggle)                         │
│  - Content (post cards, Atrium preview)                     │
│  - Typography (headings, code blocks)                       │
│  - Interactive (buttons, links)                             │
└───────────────────────────┬───────────────────────────────────┘
                            │ Controlled by
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Theme State                            │
├─────────────────────────────────────────────────────────────┤
│  currentTheme: 'light' | 'dark'                             │
│  source: 'localStorage' | 'system' | 'default'              │
│  userPreference: boolean                                     │
│  systemPreference: 'light' | 'dark' | 'no-preference'       │
│  isTransitioning: boolean                                    │
└───────────────────────────┬───────────────────────────────────┘
                            │ Managed by
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Theme Manager API                         │
├─────────────────────────────────────────────────────────────┤
│  + constructor()                                             │
│  + getCurrentTheme(): string                                 │
│  + toggleTheme(): void                                       │
│  + setTheme(theme): void                                     │
│  + getThemeSource(): string                                  │
│  + hasUserPreference(): boolean                              │
│  + clearPreference(): void                                   │
└───────────────────────────┬───────────────────────────────────┘
                            │ Persists to
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    localStorage                             │
├─────────────────────────────────────────────────────────────┤
│  key: 'theme'                                                │
│  value: 'light' | 'dark'                                     │
│  lifetime: permanent                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Summary

**Total Entities**: 4 (Design Tokens, Theme State, Component Styles, Theme Manager)  
**Total Tokens**: 95 CSS custom properties  
**Total Files Modified**: 9 SCSS files, 4 HTML templates, 2 JS files, 1 YAML file  
**Total Files Created**: 2 new files (theme-transitions.scss, theme-script.html)

**Key Relationships**:
- Theme State determines which token set is active ([data-theme] attribute)
- Components reference tokens, never hard-coded values
- Theme Manager controls Theme State based on user/system preferences
- Design Tokens provide single source of truth for all visual decisions

---
