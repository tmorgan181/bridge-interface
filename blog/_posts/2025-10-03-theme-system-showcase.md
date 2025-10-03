---
layout: post
title: "Theme System Showcase: Light & Dark Mode"
date: 2025-10-03
author: "The Bridge Team"
excerpt: "Demonstrating all components of The Bridge's new light/dark theme system - from typography to code blocks to the Atrium connection."
tags: [design-system, themes, accessibility, atrium]
---

# Theme System Showcase

Welcome to The Bridge's new theme system! This post demonstrates all themed components working together in both light and dark modes. **Try the theme toggle** in the header to see the magic happen.

## What's New?

We've implemented a comprehensive light/dark mode system with:
- 🎨 **95 design tokens** for consistent styling
- 🌓 **Smooth transitions** between themes (250ms)
- ♿ **WCAG AA accessibility** in both modes
- 💾 **localStorage persistence** of your choice
- 🔮 **Atrium branding** consistent across themes

---

## Typography Hierarchy

### This is an H3 Heading
Body text uses optimized line-height for readability. The typography scale is carefully crafted to maintain hierarchy while ensuring accessibility. We use Inter for UI text and JetBrains Mono for code.

#### This is an H4 Heading
Secondary text has slightly reduced opacity for visual hierarchy without sacrificing contrast ratios. All text meets WCAG AA standards (4.5:1 minimum).

##### This is an H5 Heading
Even at smaller sizes, text remains crisp and readable with appropriate font weights.

###### This is an H6 Heading
The smallest heading size, still maintaining clear distinction from body text.

---

## Text Styling

This is **bold text** for emphasis. This is *italic text* for subtle emphasis. This is ***bold italic*** for maximum emphasis.

Here's a [link to The Atrium](/atrium/) showing our purple branding. Links are underlined for accessibility and turn purple on hover to reinforce the connection.

~~Strikethrough text~~ shows deleted or deprecated content.

> This is a blockquote. It's styled with subtle indentation and a left border. Perfect for highlighting important passages or quotes from AI conversations.
> 
> Blockquotes can span multiple paragraphs and maintain consistent styling throughout.

---

## Lists

### Unordered List
- First item with clear bullet points
- Second item showing list styling
- Third item demonstrating hierarchy
  - Nested item level 1
  - Nested item level 2
    - Deeply nested item
- Back to top level

### Ordered List
1. First numbered item
2. Second numbered item showing clear ordering
3. Third item maintaining visual hierarchy
   1. Nested numbered item
   2. Another nested item
      1. Deeply nested numbered item
4. Back to top level

### Mixed Lists
- Unordered parent
  1. Ordered child
  2. Another ordered child
- Another unordered item
  - Nested unordered
    1. Mixed nested ordered

---

## Code Examples

### Inline Code

Use `inline code` for short code references like variable names, function calls like `toggleTheme()`, or CSS tokens like `--atrium-purple`.

The theme system uses `localStorage.getItem('theme')` to persist your preference and `window.matchMedia('(prefers-color-scheme: dark)')` to detect system preferences.

### Code Blocks

Here's a JavaScript example showing the theme toggle logic:

```javascript
class ThemeManager {
  constructor() {
    this.currentTheme = this.getInitialTheme();
    this.init();
  }
  
  getInitialTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }
  
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
```

And here's the SCSS showing how components use design tokens:

```scss
.post-card {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  transition: all var(--transition-base);
  
  &:hover {
    border-color: var(--accent-hover);
    box-shadow: var(--shadow-glow);
    transform: translateY(-2px);
  }
}
```

CSS custom properties example:

```css
:root {
  --atrium-purple: #a78bfa;
  --font-base: 'Inter', sans-serif;
  --space-lg: 1.5rem;
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

## The Atrium Connection

The Bridge serves as the public portal to **The Atrium** - our AI conversation research facility. The visual design creates continuity between both spaces:

### Atrium Branding Elements

- 🟣 **Purple (#a78bfa)**: Our signature color, consistent across both sites
- 🔵 **Blue (#60a5fa)**: Secondary color for gradients and accents  
- ⚡ **Glow effects**: Subtle purple shadows on hover states
- 🌌 **Dark gradients**: Atrium preview cards use navy/indigo even in light mode

### Visual Metaphor

- **Light Mode**: Clean, professional, welcoming - "the public bridge"
- **Dark Mode**: Deeper tones, prominent glows - "entrance hall to The Atrium"
- **Atrium Cards**: Always dark with purple accents - "windows into the research facility"

Try hovering over Atrium-related links and buttons to see the purple glow effect in action!

---

## Interactive Elements

### Buttons

Here are some button examples (visual only in this markdown):

**Primary Button**: Uses muted purple in light mode, full purple in dark mode  
**Atrium Button**: Purple-blue gradient with enhanced glow on hover  
**Outline Button**: Transparent with border, purple on hover

### Theme Toggle

The theme toggle button in the header:
- 🌙 Moon icon in light mode
- ☀️ Sun icon in dark mode
- Circular design with purple glow on hover
- Keyboard accessible (Tab + Enter/Space)

---

## Accessibility Features

### Color Contrast

All text/background combinations meet WCAG AA standards:

- **Light Mode**: 16.57:1 contrast (AAA level!)
- **Dark Mode**: 16.89:1 contrast (AAA level!)
- **Links**: 9.09:1 in light, 7.54:1 in dark
- **Focus States**: 3.71:1 minimum (AA level)

### Keyboard Navigation

- Tab through all interactive elements
- Enter/Space activates buttons
- Purple focus rings visible in both themes
- No keyboard traps

### Screen Readers

- Semantic HTML throughout
- Proper ARIA labels on theme toggle
- Alt text on all images
- Descriptive link text

### Motion Sensitivity

Respects `prefers-reduced-motion`:
- Theme transitions instant if motion reduced
- Animations disabled for sensitive users
- Core functionality unchanged

---

## Design Token System

The entire theme is built on **95 CSS custom properties**:

### Token Categories

1. **Theme-Independent** (47 tokens):
   - Atrium branding (6)
   - Typography (17)
   - Spacing (8)
   - Layout (7)
   - Borders & radius (4)
   - Transitions (3)
   - Glow effects (2)

2. **Light Mode** (24 tokens):
   - Backgrounds, text, borders, interactive, links, shadows

3. **Dark Mode** (24 tokens):
   - Same categories, optimized for dark

### Benefits

- **Consistency**: Single source of truth for all visual decisions
- **Maintainability**: Change once, update everywhere
- **Scalability**: Easy to extend for future features
- **Accessibility**: Ensures standards are met systematically

---

## Technical Details

### How It Works

1. **Detection**: Check localStorage → system preference → default light
2. **Initialization**: Inline script in `<head>` prevents flash
3. **Toggle**: Button in header switches themes instantly
4. **Persistence**: localStorage saves your choice
5. **Transitions**: 250ms smooth color changes

### Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- 96%+ global support for CSS custom properties

### Progressive Enhancement

- **No JavaScript**: Falls back to system preference via CSS
- **No localStorage**: Theme resets each visit (still works!)
- **Old browsers**: Defaults to light mode

---

## Try It Out!

**Go ahead, toggle the theme!** Notice how:

1. All text remains readable
2. Colors transition smoothly
3. Atrium elements maintain identity
4. Code blocks adapt appropriately
5. No layout shifts or flashes

The theme persists across page navigation and returns when you revisit The Bridge.

---

## What's Next?

This theme system is Phase 2 of The Bridge Interface project. Future phases include:

- **Phase 3**: Interactive demos with theme-aware visualizations
- **Phase 4**: Full Atrium portal integration
- **Phase 5**: Advanced features and enhancements

Built with ❤️ using Jekyll, SCSS, and vanilla JavaScript. No frameworks required!

---

## Questions?

Check out:
- [Design token documentation](/data/design-tokens.yml)
- [The Atrium](/atrium/) - our research facility
- [About The Bridge](/about/) - our mission

**Happy theme switching!** 🌓✨
