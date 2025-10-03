# Quickstart: Light/Dark Mode Testing Guide

**Feature**: 002-ui-overhaul  
**Purpose**: Manual testing scenarios to verify theme system implementation  
**Time Estimate**: 30-45 minutes for complete test suite

## Prerequisites

- Jekyll site running locally (`bundle exec jekyll serve`)
- Browser with DevTools (Chrome/Firefox/Edge recommended)
- Ability to change system theme preference (OS settings)

---

## Test Scenario 1: Initial Theme Detection

**Objective**: Verify correct theme loads on first visit

### Steps:

1. **Setup**:
   - Clear browser localStorage: DevTools → Application → Local Storage → delete 'theme' key
   - Set OS to light mode

2. **Test**:
   - Navigate to `http://localhost:4000/`
   - Page loads immediately in light mode (white background)

3. **Expected Results**:
   - ✅ Page displays light theme instantly
   - ✅ No flash of dark theme
   - ✅ Moon icon (🌙) visible in theme toggle

4. **Verification**:
   ```javascript
   // In browser console
   localStorage.getItem('theme')  // null (no preference yet)
   document.documentElement.getAttribute('data-theme')  // "light"
   ```

### Repeat with Dark OS Preference:

1. Set OS to dark mode
2. Clear localStorage
3. Reload page
4. Expected: Dark theme loads, sun icon (☀️) visible

---

## Test Scenario 2: Manual Theme Toggle

**Objective**: Verify toggle button switches themes and saves preference

### Steps:

1. **Setup**: Start on light mode (clear localStorage, OS set to light)

2. **Toggle to Dark**:
   - Click theme toggle button in header
   - Theme transitions smoothly to dark mode (~250ms)
   - Toggle button now shows sun icon

3. **Verify Persistence**:
   ```javascript
   localStorage.getItem('theme')  // "dark"
   ```

4. **Reload Page**:
   - Hard refresh (Ctrl/Cmd + Shift + R)
   - Page loads in dark mode immediately
   - No flash of light theme

5. **Toggle to Light**:
   - Click toggle again
   - Transitions back to light mode
   - Moon icon returns

### Expected Results:
- ✅ Smooth 250ms color transition
- ✅ No layout shifts during transition
- ✅ Preference persists across reloads
- ✅ Icons switch correctly

---

## Test Scenario 3: System Preference Change During Browsing

**Objective**: Verify automatic adaptation to OS theme changes (when no manual preference)

### Steps:

1. **Setup**:
   - Clear localStorage
   - Set OS to light mode
   - Load page (light theme)

2. **Change OS Theme**:
   - While page is open, change OS to dark mode
   - Page should automatically switch to dark theme

3. **Verify**:
   ```javascript
   localStorage.getItem('theme')  // still null
   document.documentElement.getAttribute('data-theme')  // "dark"
   ```

### Test with Manual Preference:

1. Clear localStorage, start on light mode
2. Manually toggle to dark (creates localStorage entry)
3. Change OS theme to light
4. **Expected**: Page stays dark (ignores OS change, respects user choice)

---

## Test Scenario 4: Accessibility - Keyboard Navigation

**Objective**: Verify theme toggle works with keyboard only

### Steps:

1. **Navigate to Toggle**:
   - Tab through page navigation
   - Theme toggle button receives focus
   - Purple focus ring visible

2. **Activate with Keyboard**:
   - Press Enter or Space while toggle focused
   - Theme switches
   - Focus remains on toggle button

3. **Verify States**:
   - Focus indicator visible in both themes
   - Focus ring meets 3:1 contrast ratio

### Expected Results:
- ✅ Toggle accessible via Tab key
- ✅ Activates with Enter/Space
- ✅ Focus visible in both themes
- ✅ No keyboard trap

---

## Test Scenario 5: Accessibility - Color Contrast

**Objective**: Verify WCAG AA compliance in both themes

### Light Mode Testing:

1. **Main Text**: #1a202c on #ffffff
   - Use WebAIM Contrast Checker
   - Expected: 16.57:1 (AAA level ✓)

2. **Secondary Text**: #4a5568 on #ffffff
   - Expected: 9.09:1 (AAA level ✓)

3. **Link Color**: #4a5568 on #ffffff
   - Expected: 9.09:1 (AAA level ✓)

4. **Focus Border**: #a78bfa on #ffffff
   - Expected: 3.71:1 (AA level ✓)

### Dark Mode Testing:

1. **Main Text**: #f1f5f9 on #0f172a
   - Expected: 16.89:1 (AAA level ✓)

2. **Secondary Text**: #cbd5e0 on #0f172a
   - Expected: 13.08:1 (AAA level ✓)

3. **Link Color**: #94a3b8 on #0f172a
   - Expected: 7.54:1 (AAA level ✓)

4. **Focus Border**: #a78bfa on #0f172a
   - Expected: 5.16:1 (AA level ✓)

### Tool:
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

---

## Test Scenario 6: Component Visual Verification

**Objective**: Verify all components render correctly in both themes

### Light Mode Components:

1. **Site Header**:
   - White elevated background
   - Subtle bottom border
   - Navigation links gray, purple on hover

2. **Post Cards**:
   - White background with gray border
   - Black headings, gray text
   - Purple glow on hover

3. **Atrium Preview Card**:
   - Dark navy/indigo gradient (stays dark!)
   - Light purple heading
   - Light blue text
   - Gradient CTA button

4. **Code Blocks**:
   - Light gray background
   - Purple inline code
   - Syntax highlighting visible

### Dark Mode Components:

1. **Site Header**:
   - Dark slate background
   - Subtle bottom border (darker)
   - Navigation links light gray, bright purple on hover

2. **Post Cards**:
   - Slate background with gray border
   - White headings, light gray text
   - Brighter purple glow on hover

3. **Atrium Preview Card**:
   - Deeper navy/indigo gradient
   - Same purple heading
   - Same light text
   - Same gradient button (more prominent glow)

4. **Code Blocks**:
   - Darker slate background
   - Bright purple inline code
   - Syntax highlighting adapted

---

## Test Scenario 7: Responsive Design

**Objective**: Verify theme system works on all device sizes

### Test Devices:

1. **Mobile (375px)**:
   - Theme toggle in mobile menu or visible
   - All components readable
   - Touch targets minimum 44x44px

2. **Tablet (768px)**:
   - Theme toggle in header
   - Post cards stack appropriately
   - Text remains readable

3. **Desktop (1024px+)**:
   - Theme toggle top-right of header
   - All components at full size
   - Container max-width respected

### Browser DevTools:
- Use Responsive Design Mode
- Test at 375px, 768px, 1024px, 1440px
- Verify theme toggle always accessible

---

## Test Scenario 8: Performance Validation

**Objective**: Verify theme system doesn't harm performance

### Lighthouse Audit:

1. **Open DevTools → Lighthouse**
2. **Run Audit (Desktop)**:
   - Performance: Target 90+
   - Accessibility: Target 90+
   - Best Practices: Target 90+

3. **Test Both Themes**:
   - Run audit in light mode
   - Toggle to dark mode
   - Run audit in dark mode
   - Scores should be similar

### Specific Checks:
- Time to Interactive < 3s
- First Contentful Paint < 1s
- Cumulative Layout Shift < 0.1
- No accessibility violations

---

## Test Scenario 9: Error Handling

**Objective**: Verify graceful degradation when features unavailable

### Disabled JavaScript:

1. **Disable JS in DevTools**
2. **Load Page**:
   - Theme respects system preference (CSS prefers-color-scheme)
   - Toggle button not functional (expected)
   - Site still fully usable

### Disabled localStorage:

1. **Set localStorage quota to 0** (simulate disabled storage)
2. **Load Page and Toggle**:
   - Theme still switches
   - Preference doesn't persist (resets on reload)
   - No console errors

### Invalid localStorage Value:

1. **Set invalid value**:
   ```javascript
   localStorage.setItem('theme', 'blue')
   ```
2. **Reload Page**:
   - Falls back to system preference
   - No errors thrown

---

## Test Scenario 10: Cross-Page Navigation

**Objective**: Verify theme persists across all pages

### Steps:

1. **Start on Home** (`/`):
   - Toggle to dark mode
   - Verify dark theme active

2. **Navigate to Blog** (`/posts/`):
   - Click nav link
   - Page loads in dark theme
   - No flash of light theme

3. **Navigate to Post** (any post URL):
   - Same dark theme
   - All components styled correctly

4. **Navigate to About** (`/about/`):
   - Same dark theme

5. **Navigate to Atrium** (`/atrium/`):
   - Same dark theme
   - Atrium preview card still prominent

### Expected Results:
- ✅ Theme consistent across all pages
- ✅ No flash between page loads
- ✅ localStorage theme value unchanged

---

## Test Scenario 11: Atrium Branding Consistency

**Objective**: Verify Atrium visual identity is consistent

### Purple Color Check:

1. **Atrium Navigation Link**: Always #a78bfa purple
2. **Atrium Preview Card Heading**: #c4b5fd (purple-bright)
3. **CTA Button Gradient**: #a78bfa to #60a5fa
4. **Hover Glows**: Purple rgba(167, 139, 250, 0.4)

### Verify in Both Themes:
- Atrium preview card background stays dark
- Purple signature color unchanged
- Glow effects more prominent in dark mode

---

## Test Scenario 12: Transition Smoothness

**Objective**: Verify theme transitions are smooth and not jarring

### Visual Test:

1. **Toggle Theme While Watching**:
   - Colors should fade smoothly (250ms)
   - No sudden flashes
   - No content jumping

2. **Check Transition Properties**:
   ```javascript
   // In console, inspect during transition
   getComputedStyle(document.documentElement).transition
   ```

### Reduced Motion Test:

1. **Enable Reduced Motion** (OS accessibility settings)
2. **Toggle Theme**:
   - Transition should be instant (no animation)
   - Respects user preference

---

## Test Scenario 13: Browser Compatibility

**Objective**: Verify theme works across modern browsers

### Test Browsers:

1. **Chrome 90+**: Full functionality expected
2. **Firefox 88+**: Full functionality expected
3. **Safari 14+**: Full functionality expected
4. **Edge 90+**: Full functionality expected

### For Each Browser:
- Load page (correct initial theme)
- Toggle theme (smooth transition)
- Reload (preference persists)
- Check console (no errors)

---

## Success Criteria Summary

**Must Pass**:
- ✅ All 13 test scenarios pass
- ✅ Lighthouse Accessibility 90+
- ✅ Lighthouse Performance 90+
- ✅ WCAG AA contrast ratios met
- ✅ No console errors in any scenario
- ✅ Theme persists across page reloads
- ✅ Works with keyboard only
- ✅ Works with JS disabled (basic functionality)

**Documentation**:
- Screenshot each theme for visual reference
- Note any browser-specific quirks
- Document actual Lighthouse scores

---

## Debugging Tips

### Theme Not Loading:

```javascript
// Check localStorage
localStorage.getItem('theme')

// Check DOM attribute
document.documentElement.getAttribute('data-theme')

// Check CSS custom properties
getComputedStyle(document.documentElement).getPropertyValue('--bg-primary')
```

### Toggle Not Working:

```javascript
// Check button exists
document.querySelector('.theme-toggle')

// Check for JS errors
console.log(window.themeManager)
```

### Flash of Wrong Theme:

- Verify theme-script.html is inline in <head>
- Verify script runs BEFORE CSS link
- Check for FOUC (Flash of Unstyled Content)

---

## Time Estimates

- Scenarios 1-3 (Core functionality): 10 minutes
- Scenarios 4-5 (Accessibility): 10 minutes
- Scenario 6 (Visual verification): 10 minutes
- Scenarios 7-13 (Edge cases): 15-20 minutes

**Total**: 30-45 minutes for complete validation

---
