# Contract: Theme Manager JavaScript API

**Feature**: 002-ui-overhaul  
**File**: `blog/assets/js/progressive.js` (ThemeManager class)  
**Purpose**: Manage theme detection, switching, and persistence

## API Contract

### Class: ThemeManager

```javascript
class ThemeManager {
  constructor()
  getCurrentTheme(): 'light' | 'dark'
  toggleTheme(): void
  setTheme(theme: 'light' | 'dark'): void
  getThemeSource(): 'localStorage' | 'system' | 'default'
  hasUserPreference(): boolean
  clearPreference(): void
}
```

### Method Specifications

#### `constructor()`

**Purpose**: Initialize theme system on page load

**Behavior**:
1. Call `getInitialTheme()` to determine starting theme
2. Set `data-theme` attribute on `document.documentElement`
3. Attach event listener to theme toggle button (if exists)
4. Listen for system preference changes via `matchMedia`

**Postconditions**:
- `currentTheme` property set to 'light' or 'dark'
- DOM has correct `[data-theme]` attribute
- Event listeners active

**Example**:
```javascript
// In DOMContentLoaded handler
const themeManager = new ThemeManager();
// Theme is now initialized, toggle button works
```

---

#### `getCurrentTheme()`

**Purpose**: Get currently active theme

**Returns**: `'light' | 'dark'`

**Behavior**:
- Return value of `this.currentTheme` property

**Example**:
```javascript
const theme = themeManager.getCurrentTheme();
console.log(`Current theme: ${theme}`); // "Current theme: dark"
```

---

#### `toggleTheme()`

**Purpose**: Switch between light and dark modes

**Behavior**:
1. Determine new theme (opposite of current)
2. Call `setTheme(newTheme)`

**Side Effects**:
- Theme changes immediately
- Preference saved to localStorage
- Smooth transition applied

**Example**:
```javascript
// User clicks toggle button
toggleButton.addEventListener('click', () => {
  themeManager.toggleTheme();
});
```

---

#### `setTheme(theme)`

**Parameters**:
- `theme`: `'light' | 'dark'` - Theme to switch to

**Behavior**:
1. Validate theme value (must be 'light' or 'dark')
2. Add `.theme-transitioning` class to html element
3. Update `data-theme` attribute to new theme
4. Save theme to localStorage (try/catch for errors)
5. Update `currentTheme` property
6. Remove `.theme-transitioning` class after 300ms

**Side Effects**:
- DOM `data-theme` attribute changes
- localStorage 'theme' key updated
- CSS transitions triggered

**Error Handling**:
- Wrap localStorage write in try/catch
- If localStorage fails, log warning and continue (session-only theme)

**Example**:
```javascript
// Explicitly set dark mode
themeManager.setTheme('dark');

// Invalid value throws error
try {
  themeManager.setTheme('blue'); // Error
} catch (e) {
  console.error('Invalid theme value');
}
```

---

#### `getThemeSource()`

**Purpose**: Determine how current theme was set

**Returns**: `'localStorage' | 'system' | 'default'`

**Behavior**:
- Return value of `this.themeSource` property

**Source Meanings**:
- `'localStorage'`: User manually set preference
- `'system'`: Detected from OS preference
- `'default'`: Fallback when no preference exists

**Example**:
```javascript
const source = themeManager.getThemeSource();
if (source === 'localStorage') {
  console.log('User has explicit preference');
}
```

---

#### `hasUserPreference()`

**Purpose**: Check if user has manually set theme

**Returns**: `boolean`

**Behavior**:
- Return true if theme source is 'localStorage'
- Return false otherwise

**Example**:
```javascript
if (!themeManager.hasUserPreference()) {
  // Show hint: "Theme matches your system preference"
}
```

---

#### `clearPreference()`

**Purpose**: Remove user preference, revert to system default

**Behavior**:
1. Remove 'theme' key from localStorage
2. Detect system preference via `matchMedia`
3. Call `setTheme()` with system preference
4. Update `themeSource` to 'system'

**Example**:
```javascript
// "Reset to system default" button
resetButton.addEventListener('click', () => {
  themeManager.clearPreference();
});
```

---

## Internal Methods (Private)

### `getInitialTheme()`

**Purpose**: Determine theme on page load

**Returns**: `'light' | 'dark'`

**Priority**:
1. Check `localStorage.getItem('theme')`
   - If exists and valid → return value, set source = 'localStorage'
2. Check `window.matchMedia('(prefers-color-scheme: dark)').matches`
   - If true → return 'dark', set source = 'system'
   - If false → return 'light', set source = 'system'
3. Default → return 'light', set source = 'default'

**Example**:
```javascript
getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    this.themeSource = 'localStorage';
    return saved;
  }
  
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    this.themeSource = 'system';
    return 'dark';
  }
  
  this.themeSource = 'default';
  return 'light';
}
```

---

## DOM Integration

### Theme Toggle Button

**Required HTML**:
```html
<button class="theme-toggle" aria-label="Toggle theme">
  <span class="icon-sun">☀️</span>
  <span class="icon-moon">🌙</span>
</button>
```

**Event Binding**:
```javascript
constructor() {
  this.themeToggle = document.querySelector('.theme-toggle');
  if (this.themeToggle) {
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }
}
```

### System Preference Listener

**Media Query**:
```javascript
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    if (!this.hasUserPreference()) {
      this.setTheme(e.matches ? 'dark' : 'light');
    }
  });
```

**Behavior**:
- Only respond if user has NO manual preference
- If user has toggled manually, ignore system changes

---

## localStorage Contract

### Key

**Name**: `'theme'`

### Values

**Valid**: `'light'` | `'dark'`  
**Invalid**: Any other string (ignored, use default)

### Lifecycle

**Write**: On every manual theme change (toggle/setTheme)  
**Read**: Once on page load  
**Clear**: Via `clearPreference()` method

### Error Handling

```javascript
try {
  localStorage.setItem('theme', theme);
} catch (e) {
  console.warn('localStorage unavailable, theme will not persist');
  // Continue without persistence
}
```

---

## Critical Inline Script

**File**: `blog/_includes/theme-script.html`  
**Purpose**: Prevent flash of wrong theme

**Requirements**:
1. MUST be inlined in <head> before any CSS
2. MUST be synchronous (no async/defer)
3. MUST be minimal (~200 bytes)
4. MUST set `data-theme` attribute before first paint

**Implementation**:
```html
<script>
(function() {
  var theme = localStorage.getItem('theme');
  if (!theme) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);
})();
</script>
```

---

## Validation Criteria

**Functional**:
- [ ] Theme initializes on page load
- [ ] Toggle button switches between light/dark
- [ ] Theme persists across page reloads
- [ ] System preference respected when no manual choice
- [ ] System preference ignored after manual choice

**Accessibility**:
- [ ] Toggle button keyboard accessible
- [ ] Toggle button has proper aria-label
- [ ] Theme change doesn't break keyboard navigation
- [ ] Works without JavaScript (via prefers-color-scheme CSS)

**Performance**:
- [ ] No flash of wrong theme on load
- [ ] Transition completes in <300ms
- [ ] localStorage access doesn't block render

**Error Handling**:
- [ ] Graceful degradation if localStorage disabled
- [ ] No console errors if toggle button missing
- [ ] Invalid localStorage values ignored

---

## Example Usage

```javascript
// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const themeManager = new ThemeManager();
  
  // Optional: Log theme info
  console.log(`Theme: ${themeManager.getCurrentTheme()}`);
  console.log(`Source: ${themeManager.getThemeSource()}`);
  
  // Optional: Expose for debugging
  window.themeManager = themeManager;
});

// User clicks toggle → theme switches automatically
// Preference saved to localStorage → persists on reload
// System theme changes → ignored if user has preference
```

---
