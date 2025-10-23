# Responsive Design Overview - Desktop vs Mobile

## Tailwind Breakpoints Used
- **sm:** 640px+ (Small tablets)
- **md:** 768px+ (Tablets)
- **lg:** 1024px+ (Laptops)
- **xl:** 1280px+ (Desktop)
- **2xl:** 1536px+ (Large desktop)

## Header Component

### Mobile (< 1024px)
- **Hamburger Menu:** Shows menu icon, navigation hidden
- **Top Bar:**
  - Padding: `py-2` (8px)
  - Text: `text-xs` (12px)
  - Icons: `w-3 h-3` (12px)
- **Logo Height:** `h-22` (88px)
- **Layout:** Stacked vertical menu when opened

### Desktop (≥ 1024px)
- **Full Navigation:** Horizontal nav with hover dropdowns
- **Top Bar:**
  - Padding: `py-4` (16px)
  - Text: `text-sm` (14px)
  - Icons: `w-4 h-4` (16px)
- **Logo Height:** `h-35` (140px)
- **Layout:** Horizontal with dropdown menus

---

## Hero Section

### Mobile
- **Title:** `text-3xl` (30px)
- **Description:** `text-base` (16px)
- **CTAs:** `flex-col` (stacked vertically)
- **Image Position:** Can be left/center/right optimized for mobile
- **Padding:** `pt-12` (48px top)

### Desktop
- **Title:** `text-6xl` (60px) at md: breakpoint
- **Description:** `text-xl` (20px) at md: breakpoint
- **CTAs:** `flex-row` at sm: breakpoint (side by side)
- **Image Position:** Optimized for desktop viewing
- **Padding:** `pt-20` (80px top) at md: breakpoint

---

## Content Pages (Services, HIFU, etc.)

### Mobile
- **Page Top Padding:** `pt-40` (160px) - accounts for fixed header
- **Title:** `text-4xl` (36px)
- **Grid Layout:** Single column (stacks content)
- **Images:** Full width with responsive aspect ratio
- **Cards:** Full width, stacked

### Desktop
- **Page Top Padding:** 
  - `pt-44` at sm: (176px)
  - `pt-48` at lg: (192px)
- **Title:** `text-5xl` (48px) at lg: breakpoint
- **Grid Layout:** 
  - `grid-cols-2` at md: (2 columns)
  - `grid-cols-3` at lg: (3 columns)
- **Images:** Constrained with proper aspect ratios
- **Cards:** Side by side with hover effects

---

## Services Carousel (Collection Strip)

### Mobile
- **Width:** 320px per card (`w-80`)
- **Drag:** Enabled with touch support
- **Gap:** 32px between cards (`gap-8`)
- **Text:** Responsive with services clearly visible

### Desktop
- **Width:** Same 320px per card
- **Drag:** Mouse drag with grab cursor
- **Gap:** Same 32px
- **Hover:** Scale effect on cards (1.02x)

---

## Footer

### Mobile
- **Layout:** Stacked sections
- **Font Size:** Smaller, compact
- **Social Icons:** Adjusted size
- **Spacing:** Reduced padding

### Desktop
- **Layout:** Multi-column grid
- **Font Size:** Standard
- **Social Icons:** Full size with hover effects
- **Spacing:** Generous padding

---

## Typography System

### Mobile
```css
.text-display: clamp(2.5rem, 8vw, 6rem)
.text-headline: clamp(1.5rem, 4vw, 3rem)
.text-body-large: 1.125rem
```

### Desktop
- Uses the max values from clamp
- More line height and letter spacing
- Fluid scaling between breakpoints

---

## Container System

### Both Mobile & Desktop
```css
.container-custom {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 3rem);
}
```
- **Mobile:** 1rem (16px) padding
- **Tablet/Desktop:** Scales up to 3rem (48px) padding

---

## Key Responsive Patterns

### 1. Grid Systems
- Mobile: Single column or 2 columns
- Tablet: 2-3 columns (`md:grid-cols-2`)
- Desktop: 3-4 columns (`lg:grid-cols-3`)

### 2. Spacing
- Mobile: Tighter spacing (`gap-4`, `py-8`)
- Desktop: Generous spacing (`gap-8`, `py-20`)

### 3. Text Hierarchy
- Mobile: Smaller font sizes, more compact
- Desktop: Larger, more dramatic typography

### 4. Navigation
- Mobile: Hamburger menu with slide-out
- Desktop: Persistent horizontal nav with dropdowns

### 5. Images
- Mobile: Full width, optimized crop
- Desktop: Contained with aspect ratios, object-fit

---

## Performance Considerations

### Mobile Optimizations
- Lazy loading for images beyond viewport
- Touch-friendly tap targets (44px minimum)
- Reduced animation complexity
- Optimized bundle size

### Desktop Enhancements
- Hover states and transitions
- Parallax effects (where appropriate)
- Larger images with better quality
- More complex animations

---

## Accessibility

### Both Platforms
- Semantic HTML
- ARIA labels for interactive elements
- Focus management
- Color contrast compliance
- Reduced motion support (@prefers-reduced-motion)

---

## Testing Recommendations

### Mobile Viewports to Test
- iPhone SE: 375px
- iPhone 12/13: 390px
- iPhone 14 Pro Max: 430px
- iPad Mini: 768px
- iPad Pro: 1024px

### Desktop Viewports to Test
- Laptop: 1280px
- Desktop: 1440px
- Large Desktop: 1920px
- Ultra-wide: 2560px
