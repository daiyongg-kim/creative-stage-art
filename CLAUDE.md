# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML demo website for "Creative Stage" - a children's art education center. The project consists of a comprehensive design specification (JSON) and a complete multi-page HTML/CSS/JavaScript implementation showcasing a magical, kid-friendly art education website.

## Architecture

### File Structure
```
├── creativestage-design.json    # Complete design specification and content model
└── design/                      # Complete website implementation  
    ├── index.html              # Main homepage
    ├── preschool.html          # Preschool programs (ages 3-5)
    ├── classes.html            # Art classes (ages 5-17) 
    ├── before-after-school.html # Care programs
    ├── birthday-party.html     # Party packages
    ├── styles/main.css         # Complete CSS with animations & responsive design
    ├── scripts/main.js         # Interactive JavaScript features
    └── assets/icons/favicon.svg # Custom favicon
```

### Design System
- **Color Palette**: Coral Pink (#FF6B6B), Turquoise (#4ECDC4), Sunny Yellow (#FFE66D)
- **Typography**: Fredoka One (headings), Open Sans (body), Pacifico (accent)
- **Responsive**: Mobile-first with breakpoints at 480px, 768px, 1024px, 1440px
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation

### Key Technical Components
- **CSS Custom Properties**: Centralized color/spacing variables in `:root`
- **Animation System**: Hardware-accelerated CSS animations with paint splash effects
- **Interactive Features**: Paint cursor effects, smooth scrolling, mobile menu, dynamic counters
- **Form Validation**: Client-side validation with visual feedback
- **Performance**: Event delegation, Intersection Observer API, optimized DOM manipulation

## Development Commands

### Local Development Server
```bash
# Using Python 3 (recommended)
cd design
python3 -m http.server 8080

# Using Node.js alternative  
cd design
npx http-server -p 8080

# Access at: http://localhost:8080
```

### Navigation Structure
- All program pages (`preschool.html`, `classes.html`, etc.) are standalone files
- Navigation menu in `index.html` links directly to HTML files (not anchor links)
- Each program page should link back to `index.html` for proper navigation flow

## Content Management

### Design Specification
- `creativestage-design.json` contains the complete design system, content model, and program details
- This JSON serves as the single source of truth for colors, typography, program pricing, and content structure
- When making design changes, update the JSON first, then implement in HTML/CSS

### Program Pages Content
- **Preschool**: Ages 3-5, $55 CAD, 45 minutes, sensory-focused activities
- **Classes**: Ages 5-17, $65+ CAD, 60-90 minutes, skill-building programs  
- **Before/After School**: Care programs with art activities and school partnerships
- **Birthday Parties**: $299-649 packages, 2-3 hours, custom themes

## JavaScript Architecture

### Main Initialization (main.js)
- Event-driven architecture with modular function organization
- Key modules: animations, counters, mobile menu, scroll effects, paint cursor
- Uses modern ES6+ features: event delegation, Intersection Observer, Promise-based animations
- Performance-optimized with requestAnimationFrame for smooth animations

### Interactive Features
- **Paint Cursor**: Mouse-following paint drops in hero section
- **Smooth Scrolling**: Navigation with offset calculations for fixed header
- **Dynamic Counters**: Animated statistics with real-time updates
- **Mobile Menu**: Hamburger menu with focus management and accessibility

## Responsive Design Patterns

### Mobile-First Approach
- Base styles target mobile (320px+)
- Progressive enhancement through media queries
- Touch-friendly interactive elements (44px minimum touch targets)
- Optimized typography scaling with `clamp()` functions

### Layout Systems
- CSS Grid for main page layouts and program cards
- Flexbox for component alignment and distribution
- Container queries ready (using CSS custom properties for breakpoint management)

## Common Tasks

### Adding New Program Pages
1. Create new HTML file in `design/` directory
2. Use existing program page structure as template
3. Update navigation links in `index.html` header menu
4. Add program details to `creativestage-design.json`
5. Test navigation flow between pages

### Modifying Design System
1. Update color/typography values in `creativestage-design.json`
2. Apply changes to CSS custom properties in `styles/main.css`
3. Verify responsive behavior across all breakpoints
4. Test accessibility compliance (color contrast, keyboard navigation)

### Performance Optimization
- Images should be placed in `assets/images/` directory
- Use modern image formats (WebP with fallbacks)
- Lazy loading already implemented for performance
- CSS animations use `transform` and `opacity` for hardware acceleration