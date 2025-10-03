// ==================================================================
// Progressive Enhancement JavaScript - Bridge Interface
// Phase 2: Theme System + Enhancements
// ==================================================================
//
// Site is fully functional without JavaScript:
// - Theme defaults to system preference via CSS prefers-color-scheme
// - All content accessible without JS
//
// JavaScript enhances with:
// - Manual theme toggle
// - Theme persistence via localStorage
// - Smooth scrolling
// - External link indicators
//
// Contract: specs/002-ui-overhaul/contracts/theme-manager.md
// ==================================================================

(function() {
  'use strict';

  // ==================================================================
  // ThemeManager Class
  // Manages theme detection, switching, and persistence
  // ==================================================================

  class ThemeManager {
    constructor() {
      this.currentTheme = null;
      this.themeSource = null;
      this.themeToggle = null;

      // Initialize theme system
      this.init();
    }

    /**
     * Initialize theme system
     * - Detect initial theme (localStorage → system → default)
     * - Set data-theme attribute on document
     * - Attach event listeners
     */
    init() {
      // Get initial theme
      this.currentTheme = this.getInitialTheme();

      // Set theme on document (might already be set by inline script)
      document.documentElement.setAttribute('data-theme', this.currentTheme);

      // Find and attach toggle button
      this.themeToggle = document.querySelector('.theme-toggle');
      if (this.themeToggle) {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
      }

      // Listen for system preference changes (only if no user preference)
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      darkModeQuery.addEventListener('change', (e) => {
        if (!this.hasUserPreference()) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }

    /**
     * Get initial theme following priority:
     * 1. localStorage (user preference)
     * 2. System preference (prefers-color-scheme)
     * 3. Default light mode
     *
     * @returns {'light'|'dark'} Initial theme
     */
    getInitialTheme() {
      // Check localStorage first
      const saved = this.getStoredTheme();
      if (saved === 'light' || saved === 'dark') {
        this.themeSource = 'localStorage';
        return saved;
      }

      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.themeSource = 'system';
        return 'dark';
      }

      // Default to light
      this.themeSource = 'default';
      return 'light';
    }

    /**
     * Get stored theme from localStorage with error handling
     * @returns {string|null} Stored theme or null
     */
    getStoredTheme() {
      try {
        return localStorage.getItem('theme');
      } catch (e) {
        console.warn('localStorage unavailable:', e);
        return null;
      }
    }

    /**
     * Save theme to localStorage with error handling
     * @param {string} theme - Theme to save
     */
    saveTheme(theme) {
      try {
        localStorage.setItem('theme', theme);
      } catch (e) {
        console.warn('localStorage unavailable, theme will not persist:', e);
      }
    }

    /**
     * Get current active theme
     * @returns {'light'|'dark'} Current theme
     */
    getCurrentTheme() {
      return this.currentTheme;
    }

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
      const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      this.setTheme(newTheme);
    }

    /**
     * Set specific theme with smooth transition
     * @param {'light'|'dark'} theme - Theme to set
     */
    setTheme(theme) {
      // Validate theme
      if (theme !== 'light' && theme !== 'dark') {
        console.error('Invalid theme:', theme);
        return;
      }

      // Add transitioning class for smooth color changes
      document.documentElement.classList.add('theme-transitioning');

      // Update data-theme attribute
      document.documentElement.setAttribute('data-theme', theme);

      // Update internal state
      this.currentTheme = theme;
      this.themeSource = 'localStorage';

      // Save to localStorage
      this.saveTheme(theme);

      // Remove transitioning class after animation completes (250ms + 50ms buffer)
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 300);
    }

    /**
     * Get theme source (how it was determined)
     * @returns {'localStorage'|'system'|'default'} Theme source
     */
    getThemeSource() {
      return this.themeSource;
    }

    /**
     * Check if user has manually set theme preference
     * @returns {boolean} True if user has preference
     */
    hasUserPreference() {
      return this.themeSource === 'localStorage';
    }

    /**
     * Clear user preference, revert to system default
     */
    clearPreference() {
      try {
        localStorage.removeItem('theme');
      } catch (e) {
        console.warn('localStorage unavailable:', e);
      }

      // Re-detect theme without localStorage
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const newTheme = systemDark ? 'dark' : 'light';

      this.themeSource = 'system';
      this.setTheme(newTheme);
    }
  }

  // ==================================================================
  // Initialize Theme Manager on DOM Ready
  // ==================================================================

  document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme manager
    const themeManager = new ThemeManager();

    // Expose for debugging (optional)
    window.themeManager = themeManager;

    // Log theme info (remove in production)
    console.log('Theme initialized:', {
      theme: themeManager.getCurrentTheme(),
      source: themeManager.getThemeSource()
    });
  });

  // ==================================================================
  // Progressive Enhancements (Phase 1)
  // ==================================================================

  // Add smooth scrolling for anchor links
  document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip empty anchors or just "#"
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL without jumping
          history.pushState(null, null, href);
        }
      });
    });
  });

  // Add external link indicators (open in new tab)
  document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');

    externalLinks.forEach(function(link) {
      // Only add if not already set
      if (!link.hasAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  });

})();
