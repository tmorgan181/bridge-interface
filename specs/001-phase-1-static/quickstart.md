# Quickstart - Phase 1 Static Jekyll Blog

**Feature**: Phase 1 Static Jekyll Blog  
**Date**: 2025-10-02  
**Purpose**: Manual testing scenarios to validate Phase 1 implementation

---

## Prerequisites

Before running these tests, ensure:
- [ ] Jekyll site built successfully (`bundle exec jekyll build`)
- [ ] Local server running (`bundle exec jekyll serve`)
- [ ] At least 3 sample blog posts created in `blog/_posts/`
- [ ] All contracts implementation complete

---

## Test Scenario 1: Home Page Validation

**Objective**: Verify home page displays correctly with all required elements

### Steps

1. **Navigate to home page**
   - Open browser to `http://localhost:4000/`
   
2. **Verify hero section**
   - [ ] "The Bridge" heading visible (h1)
   - [ ] Tagline present and readable
   - [ ] Mission statement explains accessible AI research
   - [ ] Primary CTA (link to blog) visible and functional
   
3. **Verify value propositions**
   - [ ] Three value blocks displayed (Accessible, Practical, Honest)
   - [ ] Each has icon/visual, heading, and description
   - [ ] Content matches constitutional principles
   
4. **Verify recent posts**
   - [ ] "Latest from The Bridge" section present
   - [ ] Exactly 3 most recent posts displayed
   - [ ] Each post shows: title, date, excerpt
   - [ ] Post titles link to full post pages
   - [ ] "View All Posts" link goes to `/posts/`
   
5. **Verify Atrium connection**
   - [ ] Atrium section present with heading
   - [ ] Brief description of Atrium
   - [ ] Link to `/atrium/` page

6. **Verify responsive layout**
   - [ ] Resize to mobile width (375px)
   - [ ] Content stacks in single column
   - [ ] No horizontal scroll
   - [ ] Text remains readable

### Expected Results
✅ Home page loads in <2s  
✅ All sections present and functional  
✅ Navigation works  
✅ Responsive design works on mobile and desktop

---

## Test Scenario 2: Blog Index Validation

**Objective**: Verify blog index lists all posts correctly

### Steps

1. **Navigate to blog index**
   - Click "View All Posts" from home OR
   - Navigate directly to `http://localhost:4000/posts/`

2. **Verify page structure**
   - [ ] "Blog Posts" or similar heading (h1)
   - [ ] All published posts visible
   - [ ] Posts ordered by date (newest first)

3. **Verify post cards**
   - [ ] Each post displayed as post-card component
   - [ ] Title, date, and excerpt visible for each
   - [ ] Dates formatted consistently ("Month DD, YYYY")

4. **Test post navigation**
   - [ ] Click a post title
   - [ ] Verify navigation to correct post page

### Expected Results
✅ All posts listed in correct order  
✅ Post cards consistent styling  
✅ Navigation to individual posts works

---

## Test Scenario 3: Individual Post Validation

**Objective**: Verify individual blog post displays correctly with full content

### Steps

1. **Navigate to a blog post**
   - From home page recent posts OR
   - From blog index
   - Navigate to any post (e.g., `/posts/welcome-to-bridge/`)

2. **Verify post header**
   - [ ] Post title displayed (h1)
   - [ ] Publication date visible with proper formatting
   - [ ] Author name displayed
   - [ ] Tags displayed if present in frontmatter

3. **Verify post content**
   - [ ] Full markdown content rendered
   - [ ] Headings (h2-h4) properly styled
   - [ ] Paragraphs, lists, blockquotes display correctly
   - [ ] Code blocks (if present) have syntax highlighting
   - [ ] Images (if present) display with proper sizing

4. **Verify navigation**
   - [ ] "← All Posts" back link present
   - [ ] Back link navigates to `/posts/`

5. **Verify reading experience**
   - [ ] Line length comfortable (50-75 characters)
   - [ ] Adequate line height (1.5-1.8)
   - [ ] Spacing between paragraphs clear
   - [ ] Text readable on mobile and desktop

### Expected Results
✅ Post content fully visible and styled  
✅ Markdown renders correctly  
✅ Navigation back to blog index works  
✅ Reading typography comfortable

---

## Test Scenario 4: About Page Validation

**Objective**: Verify About page content and structure

### Steps

1. **Navigate to About page**
   - Click "About" in navigation OR
   - Navigate to `http://localhost:4000/about/`

2. **Verify page structure**
   - [ ] "About The Bridge" heading (h1)
   - [ ] Mission section present
   - [ ] Approach/principles section present
   - [ ] Atrium connection section present
   - [ ] Team/contact section present

3. **Verify content quality**
   - [ ] Mission clearly explains accessible AI research
   - [ ] Three core principles (Accessible, Practical, Honest) explained
   - [ ] Atrium connection clearly described
   - [ ] Link to `/atrium/` or Atrium GitHub present

4. **Verify tone**
   - [ ] Content uses plain English (no jargon)
   - [ ] Honest, non-hype tone
   - [ ] Constitutional principles evident

### Expected Results
✅ All required sections present  
✅ Content clear and accessible  
✅ Links functional  
✅ Tone matches constitutional principles

---

## Test Scenario 5: Atrium Page Validation

**Objective**: Verify Atrium overview page content

### Steps

1. **Navigate to Atrium page**
   - Click "The Atrium" in navigation OR
   - Click link from About page OR
   - Navigate to `http://localhost:4000/atrium/`

2. **Verify page structure**
   - [ ] "The Atrium Research Facility" or similar heading (h1)
   - [ ] "What is The Atrium" section
   - [ ] Research focus section
   - [ ] Bridge connection section
   - [ ] Future phases overview

3. **Verify content**
   - [ ] Clear explanation of Atrium purpose
   - [ ] Research areas explained in plain English
   - [ ] Relationship to The Bridge clear
   - [ ] Future features (Phases 2-4) mentioned realistically

4. **Verify external links**
   - [ ] GitHub repo link present (if applicable)
   - [ ] External links open in new tab
   - [ ] Links have appropriate `rel` attributes

### Expected Results
✅ Atrium clearly explained  
✅ Research focus understandable  
✅ Future features set realistic expectations  
✅ Links functional

---

## Test Scenario 6: Navigation Validation

**Objective**: Verify site navigation works consistently

### Steps

1. **Test header navigation**
   - [ ] Visit each page via header navigation
   - [ ] Verify active page indicated (if styling implemented)
   - [ ] Navigation present on all pages

2. **Test logo/home link**
   - [ ] Click site logo/title
   - [ ] Verify returns to home page

3. **Test keyboard navigation**
   - [ ] Tab through header navigation
   - [ ] Verify focus indicators visible
   - [ ] Verify all links reachable
   - [ ] Press Enter on focused link works

4. **Test mobile navigation**
   - [ ] Resize to mobile width (375px)
   - [ ] Verify navigation accessible (hamburger menu or stacked)
   - [ ] Verify all links functional on mobile

### Expected Results
✅ Navigation consistent across pages  
✅ Keyboard navigation works  
✅ Mobile navigation accessible  
✅ Active state indicated

---

## Test Scenario 7: Accessibility Validation

**Objective**: Verify WCAG AA compliance and accessibility features

### Steps

1. **Automated testing**
   - [ ] Run Lighthouse audit in Chrome DevTools
   - [ ] Verify accessibility score 90+ (target: 100)
   - [ ] Run axe DevTools extension
   - [ ] Verify zero violations

2. **Keyboard navigation**
   - [ ] Navigate entire site using only keyboard
   - [ ] Verify all interactive elements reachable
   - [ ] Verify focus indicators visible throughout
   - [ ] Verify logical tab order

3. **Screen reader testing** (if available)
   - [ ] Enable screen reader (NVDA, VoiceOver, etc.)
   - [ ] Navigate through pages
   - [ ] Verify headings announced correctly
   - [ ] Verify links have clear context
   - [ ] Verify landmarks (header, main, footer) present

4. **Color contrast**
   - [ ] Use browser DevTools contrast checker
   - [ ] Verify all text meets WCAG AA ratios
   - [ ] Normal text: 4.5:1 minimum
   - [ ] Large text: 3:1 minimum

5. **Skip link**
   - [ ] Tab to first element on any page
   - [ ] Verify "Skip to main content" link visible on focus
   - [ ] Press Enter, verify jump to main content

### Expected Results
✅ Lighthouse accessibility score 100/100  
✅ Zero axe violations  
✅ Full keyboard navigation  
✅ Screen reader friendly  
✅ Color contrast compliant

---

## Test Scenario 8: Performance Validation

**Objective**: Verify performance targets met

### Steps

1. **Lighthouse performance audit**
   - [ ] Open Chrome DevTools
   - [ ] Run Lighthouse audit (simulated 3G throttling)
   - [ ] Verify performance score 90+
   - [ ] Verify First Contentful Paint <1.5s
   - [ ] Verify Time to Interactive <2.5s

2. **Page weight check**
   - [ ] Open Network tab in DevTools
   - [ ] Hard refresh home page
   - [ ] Verify total transfer size <500KB
   - [ ] Verify image sizes optimized

3. **JavaScript-free test**
   - [ ] Disable JavaScript in browser
   - [ ] Navigate through entire site
   - [ ] Verify all content visible
   - [ ] Verify all navigation works
   - [ ] Verify forms work (if any)

4. **Mobile performance**
   - [ ] Test on actual mobile device (if available) OR
   - [ ] Use Chrome DevTools device emulation
   - [ ] Verify page loads quickly
   - [ ] Verify no layout shift during load

### Expected Results
✅ Lighthouse performance 90+  
✅ Page weight <500KB  
✅ Site fully functional without JavaScript  
✅ Fast load on mobile

---

## Test Scenario 9: Responsive Design Validation

**Objective**: Verify responsive layout works across viewports

### Viewport Tests

1. **Mobile (375px)**
   - [ ] Content readable without zoom
   - [ ] No horizontal scroll
   - [ ] Tap targets >=44px
   - [ ] Navigation accessible
   - [ ] Images scale properly

2. **Tablet (768px)**
   - [ ] Layout adapts appropriately
   - [ ] Content readable
   - [ ] Navigation works
   - [ ] Images scale properly

3. **Desktop (1920px)**
   - [ ] Content not excessively wide
   - [ ] Comfortable line length
   - [ ] Spacing adequate
   - [ ] Images scale properly

4. **Orientation test**
   - [ ] Test mobile landscape
   - [ ] Test tablet portrait/landscape
   - [ ] Verify layouts adapt correctly

### Expected Results
✅ Responsive on all viewport sizes  
✅ No horizontal scroll  
✅ Content readable at all sizes  
✅ Images adapt properly

---

## Test Scenario 10: Content Creation Workflow

**Objective**: Verify blog post creation workflow works

### Steps

1. **Create new blog post**
   - [ ] Create file `blog/_posts/2025-10-02-test-post.md`
   - [ ] Add required frontmatter (layout, title, date, author)
   - [ ] Add sample content with headings, lists, code blocks
   - [ ] Save file

2. **Build and verify**
   - [ ] Rebuild Jekyll site
   - [ ] Verify no build errors
   - [ ] Navigate to new post
   - [ ] Verify post displays correctly

3. **Test draft status**
   - [ ] Add `published: false` to frontmatter
   - [ ] Rebuild site
   - [ ] Verify post NOT in production list
   - [ ] Rebuild with `--drafts` flag
   - [ ] Verify post visible in draft mode

4. **Test frontmatter variations**
   - [ ] Post with tags
   - [ ] Post with featured image
   - [ ] Post with custom excerpt
   - [ ] Verify all render correctly

### Expected Results
✅ New posts can be created easily  
✅ Frontmatter parsed correctly  
✅ Draft status works  
✅ All frontmatter fields supported

---

## Validation Checklist

After completing all test scenarios, verify:

### Content
- [ ] Home page complete and functional
- [ ] Blog index lists all posts
- [ ] Individual posts render correctly
- [ ] About page content clear
- [ ] Atrium page content clear
- [ ] At least 3 sample posts created

### Design System
- [ ] Design tokens defined in `_sass/_tokens.scss`
- [ ] Design tokens documented in `_data/design-tokens.yml`
- [ ] Consistent styling across pages
- [ ] Component-based templates used

### Accessibility
- [ ] WCAG AA compliance verified
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Skip link functional
- [ ] Semantic HTML throughout
- [ ] Color contrast meets standards

### Performance
- [ ] Lighthouse score 90+ (all pages)
- [ ] Page weight <500KB
- [ ] Fast load on 3G simulation
- [ ] Images optimized
- [ ] No render-blocking resources

### Progressive Enhancement
- [ ] Site functional without JavaScript
- [ ] Content accessible on all devices
- [ ] Mobile-first design implemented

### Future-Proofing
- [ ] URL structure stable for future phases
- [ ] Components map to future React/Vue
- [ ] Design tokens portable
- [ ] Reserved paths documented

---

## Success Criteria

✅ All test scenarios pass  
✅ All validation checklist items complete  
✅ Zero critical issues  
✅ Performance targets met  
✅ Accessibility standards met  
✅ Constitutional principles evident  

**Status**: Ready for Phase 2 (/tasks command)

---
