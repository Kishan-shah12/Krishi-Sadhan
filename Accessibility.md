# Accessibility Guidelines

## Overview
This document outlines the accessibility standards, implementation guidelines, and best practices for the **Krishi Sadhan** project. These guidelines ensure the platform is usable by farmers with diverse abilities, including those with visual, auditory, motor, and cognitive impairments.

---

## Table of Contents
1. [Accessibility Principles](#accessibility-principles)
2. [WCAG 2.1 Compliance](#wcag-21-compliance)
3. [Semantic HTML & Structure](#semantic-html--structure)
4. [Keyboard Navigation](#keyboard-navigation)
5. [Screen Reader Support](#screen-reader-support)
6. [Visual Design & Color](#visual-design--color)
7. [Forms & Input Accessibility](#forms--input-accessibility)
8. [Images & Media](#images--media)
9. [Responsive & Mobile Accessibility](#responsive--mobile-accessibility)
10. [Testing & Validation](#testing--validation)
11. [Accessibility Checklist](#accessibility-checklist)

---

## Accessibility Principles

### POUR Principles (WCAG)
```
┌─────────────────────────────────────────────────────────────────┐
│                    POUR PRINCIPLES                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  P - PERCEIVABLE                                                │
│  ├─ Text alternatives for non-text content                     │
│  ├─ Captions for multimedia                                    │
│  ├─ Adaptable content (responsive)                             │
│  └─ Distinguishable (color, contrast, size)                    │
│                                                                 │
│  O - OPERABLE                                                   │
│  ├─ Keyboard accessible                                        │
│  ├─ Enough time (no time limits)                               │
│  ├─ No seizures (no flashing)                                  │
│  ├─ Navigable (headings, landmarks, skip links)                │
│  └─ Input modalities (touch, voice, keyboard)                  │
│                                                                 │
│  U - UNDERSTANDABLE                                             │
│  ├─ Readable text (language, abbreviations)                    │
│  ├─ Predictable navigation                                     │
│  ├─ Input assistance (labels, errors, suggestions)             │
│  └─ Consistent identification                                  │
│                                                                 │
│  R - ROBUST                                                     │
│  ├─ Compatible with current/future tools                       │
│  ├─ Valid HTML/CSS                                             │
│  ├─ ARIA used correctly                                        │
│  └─ Graceful degradation                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Target Compliance Level
| Level | Criteria | Our Target |
|-------|----------|------------|
| **A** | Minimum accessibility | ✅ Required |
| **AA** | Standard accessibility | ✅ **Target** |
| **AAA** | Enhanced accessibility | 🎯 Aspirational |

---

## WCAG 2.1 Compliance

### Level A Requirements (Must Have)
```markdown
✅ 1.1.1 Non-text Content - All images have alt text
✅ 1.2.1 Audio-only/Video-only - Transcripts provided
✅ 1.3.1 Info and Relationships - Semantic HTML used
✅ 1.3.2 Meaningful Sequence - Logical reading order
✅ 1.3.3 Sensory Characteristics - Not shape/size/color only
✅ 1.4.1 Use of Color - Color not only visual means
✅ 1.4.2 Audio Control - Auto-play audio can be paused
✅ 2.1.1 Keyboard - All functionality keyboard accessible
✅ 2.1.2 No Keyboard Trap - Focus can move away
✅ 2.2.1 Timing Adjustable - No time limits or extendable
✅ 2.2.2 Pause, Stop, Hide - Moving content controllable
✅ 2.3.1 Three Flashes - No content flashes >3x/sec
✅ 2.4.1 Bypass Blocks - Skip to main content link
✅ 2.4.2 Page Titled - Descriptive page titles
✅ 2.4.3 Focus Order - Logical focus sequence
✅ 2.4.4 Link Purpose - Link text describes destination
✅ 3.1.1 Language of Page - HTML lang attribute
✅ 3.2.1 On Focus - No unexpected changes on focus
✅ 3.2.2 On Input - No unexpected changes on input
✅ 3.3.1 Error Identification - Errors described in text
✅ 3.3.2 Labels or Instructions - Form fields labeled
✅ 4.1.1 Parsing - Valid HTML, unique IDs
✅ 4.1.2 Name, Role, Value - ARIA for custom components
```

### Level AA Requirements (Should Have)
```markdown
✅ 1.2.4 Captions (Live) - Live video has captions
✅ 1.2.5 Audio Description - Video has audio description
✅ 1.3.4 Orientation - Content works in portrait/landscape
✅ 1.3.5 Identify Input Purpose - Autocomplete attributes
✅ 1.4.3 Contrast (Minimum) - 4.5:1 text, 3:1 large text
✅ 1.4.4 Resize Text - 200% zoom without loss
✅ 1.4.5 Images of Text - Text used instead of images
✅ 1.4.10 Reflow - 320px width without horizontal scroll
✅ 1.4.11 Non-text Contrast - 3:1 for UI components
✅ 1.4.12 Text Spacing - Custom spacing supported
✅ 1.4.13 Content on Hover/Focus - Dismissible, hoverable
✅ 2.4.5 Multiple Ways - Multiple navigation methods
✅ 2.4.6 Headings and Labels - Descriptive headings/labels
✅ 2.4.7 Focus Visible - Visible focus indicators
✅ 3.1.2 Language of Parts - Language changes marked
✅ 3.2.3 Consistent Navigation - Consistent nav order
✅ 3.2.4 Consistent Identification - Consistent icons/labels
✅ 3.3.3 Error Suggestion - Error correction suggestions
✅ 3.3.4 Error Prevention - Legal/financial data confirmed
✅ 4.1.3 Status Messages - Announced to screen readers
```

---

## Semantic HTML & Structure

### Page Structure Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Equipment List - Krishi Sadhan</title>
  <!-- Skip link styles -->
  <style>
    .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: #000;
      color: #fff;
      padding: 8px 16px;
      z-index: 100;
      transition: top 0.3s;
    }
    .skip-link:focus {
      top: 0;
    }
  </style>
</head>
<body>
  <!-- Skip to main content -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <!-- Header / Navigation -->
  <header role="banner">
    <nav role="navigation" aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/equipment" aria-current="page">Equipment</a></li>
        <li><a href="/bookings">My Bookings</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
    </nav>
  </header>

  <!-- Main Content -->
  <main id="main-content" role="main">
    <h1>Farming Equipment</h1>
    
    <!-- Search & Filters -->
    <section aria-labelledby="filters-heading">
      <h2 id="filters-heading">Filters</h2>
      <form>
        <!-- Filter controls -->
      </form>
    </section>
    
    <!-- Equipment List -->
    <section aria-labelledby="results-heading">
      <h2 id="results-heading">Available Equipment (<span id="count">12</span>)</h2>
      <ul role="list" aria-label="Equipment listings">
        <li><article>...</article></li>
      </ul>
    </section>
  </main>

  <!-- Footer -->
  <footer role="contentinfo">
    <nav aria-label="Footer navigation">
      <ul>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
      </ul>
    </nav>
    <p>&copy; 2024 Krishi Sadhan. All rights reserved.</p>
  </footer>
</body>
</html>
```

### Heading Hierarchy
```jsx
// ✅ Good: Logical heading structure
<main>
  <h1>Equipment Listings</h1>
  
  <section aria-labelledby="filters-heading">
    <h2 id="filters-heading">Filters</h2>
    <form>...</form>
  </section>
  
  <section aria-labelledby="results-heading">
    <h2 id="results-heading">Results (12)</h2>
    
    <article>
      <h3>John Deere 5050D Tractor</h3>
      <h4>Specifications</h4>
      <h5>Engine</h5>
      <h5>Transmission</h5>
      <h4>Pricing</h4>
    </article>
  </section>
</main>

// ❌ Bad: Skipped heading levels
<main>
  <h1>Equipment Listings</h1>
  <h3>Filters</h3>  {/* Missing h2 */}
  <h4>Results</h4>  {/* Missing h2, h3 */}
</main>
```

### Landmark Regions
```jsx
// Proper ARIA landmarks
<div className="app">
  <header role="banner">
    <nav role="navigation" aria-label="Main navigation">...</nav>
  </header>
  
  <nav role="navigation" aria-label="Breadcrumb">
    <ol>
      <li><a href="/">Home</a></li>
      <li><a href="/equipment">Equipment</a></li>
      <li aria-current="page">Tractors</li>
    </ol>
  </nav>
  
  <main role="main" id="main-content">
    <section aria-labelledby="search-heading">
      <h2 id="search-heading">Search Equipment</h2>
      <form role="search">...</form>
    </section>
    
    <section aria-labelledby="listings-heading">
      <h2 id="listings-heading">Listings</h2>
      <ul role="list">...</ul>
    </section>
  </main>
  
  <aside role="complementary" aria-label="Related equipment">
    <h2>You may also like</h2>
    ...
  </aside>
  
  <footer role="contentinfo">
    <nav role="navigation" aria-label="Footer links">...</nav>
  </footer>
</div>
```

---

## Keyboard Navigation

### Focus Management
```jsx
// hooks/useFocusManagement.js
import { useEffect, useRef } from 'react';

export const useFocusTrap = (isActive, containerRef) => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    container.addEventListener('keydown', handleTab);
    firstElement?.focus();
    
    return () => {
      container.removeEventListener('keydown', handleTab);
    };
  }, [isActive, containerRef]);
};

export const useFocusRestore = (triggerRef) => {
  const previousFocusRef = useRef(null);
  
  const saveFocus = () => {
    previousFocusRef.current = document.activeElement;
  };
  
  const restoreFocus = () => {
    previousFocusRef.current?.focus();
  };
  
  return { saveFocus, restoreFocus };
};
```

### Skip Links
```jsx
// components/common/SkipLinks.jsx
import React from 'react';

const SkipLinks = () => (
  <ul className="skip-links" role="list" aria-label="Skip links">
    <li>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
    </li>
    <li>
      <a href="#main-navigation" className="skip-link">
        Skip to navigation
      </a>
    </li>
    <li>
      <a href="#search" className="skip-link">
        Skip to search
      </a>
    </li>
  </ul>
);

// CSS
/*
.skip-links {
  position: absolute;
  top: -100%;
  left: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 9999;
}

.skip-link {
  display: block;
  padding: 12px 24px;
  background: #1a1a2e;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition: top 0.3s ease;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid #ffd700;
  outline-offset: 2px;
}
*/

export default SkipLinks;
```

### Focus Indicators
```css
/* Global focus styles */
:focus-visible {
  outline: 3px solid #0066cc;
  outline-offset: 2px;
  box-shadow: 0 0 0 5px rgba(0, 102, 204, 0.3);
}

/* Custom focus for specific elements */
.btn:focus-visible,
.card:focus-visible,
.input:focus-visible {
  outline: 3px solid #0066cc;
  outline-offset: 2px;
}

/* Remove outline for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}

/* High contrast focus for dark mode */
@media (prefers-contrast: high) {
  :focus-visible {
    outline: 3px solid #fff;
    outline-offset: 2px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  :focus-visible {
    transition: none;
  }
}
```

### Keyboard Interaction Patterns
```jsx
// components/common/AccessibleButton.jsx
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const AccessibleButton = forwardRef((
  { 
    children, 
    onClick, 
    onKeyDown,
    disabled,
    loading,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    ...props 
  }, 
  ref
) => {
  const handleKeyDown = (e) => {
    // Handle Enter and Space for button activation
    if (e.key === 'Enter' || e.key === ' ') {
      if (!disabled && !loading) {
        e.preventDefault();
        onClick?.(e);
      }
    }
    onKeyDown?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      className={`btn ${disabled ? 'btn--disabled' : ''} ${loading ? 'btn--loading' : ''}`}
      {...props}
    >
      {loading && <span aria-hidden="true" className="spinner" />}
      <span className="btn__text">{children}</span>
    </button>
  );
});

AccessibleButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  'aria-label': PropTypes.string,
  'aria-describedby': PropTypes.string,
};

export default AccessibleButton;
```

```jsx
// components/common/AccessibleMenu.jsx
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const AccessibleMenu = ({ 
  trigger, 
  items, 
  position = 'bottom',
  onClose 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const focusedIndexRef = useRef(-1);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"]');
      if (!menuItems?.length) return;
      
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          closeMenu();
          triggerRef.current?.focus();
          break;
        case 'Tab':
          e.preventDefault();
          closeMenu();
          break;
        case 'ArrowDown':
          e.preventDefault();
          focusedIndexRef.current = (focusedIndexRef.current + 1) % menuItems.length;
          menuItems[focusedIndexRef.current].focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          focusedIndexRef.current = (focusedIndexRef.current - 1 + menuItems.length) % menuItems.length;
          menuItems[focusedIndexRef.current].focus();
          break;
        case 'Home':
          e.preventDefault();
          focusedIndexRef.current = 0;
          menuItems[0].focus();
          break;
        case 'End':
          e.preventDefault();
          focusedIndexRef.current = menuItems.length - 1;
          menuItems[menuItems.length - 1].focus();
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          menuItems[focusedIndexRef.current]?.click();
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const openMenu = () => {
    setIsOpen(true);
    focusedIndexRef.current = -1;
  };

  const closeMenu = () => {
    setIsOpen(false);
    focusedIndexRef.current = -1;
    onClose?.();
  };

  const handleItemClick = (item, index) => {
    item.onClick?.();
    closeMenu();
  };

  return (
    <div className="menu-container" role="menu" ref={menuRef}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="menu-list"
        onClick={isOpen ? closeMenu : openMenu}
        className="menu-trigger"
      >
        {trigger}
      </button>
      
      {isOpen && (
        <ul 
          id="menu-list" 
          role="menu" 
          className={`menu-list menu-list--${position}`}
        >
          {items.map((item, index) => (
            <li key={item.id || index} role="none">
              <button
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
                onClick={() => handleItemClick(item, index)}
                className="menu-item"
                disabled={item.disabled}
              >
                {item.icon && <span aria-hidden="true">{item.icon}</span>}
                <span>{item.label}</span>
                {item.shortcut && <span className="menu-shortcut">{item.shortcut}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AccessibleMenu;
```

---

## Screen Reader Support

### ARIA Live Regions
```jsx
// components/common/LiveRegion.jsx
import React from 'react';

const LiveRegion = ({ 
  message, 
  politeness = 'polite', // 'polite' | 'assertive' | 'off'
  atomic = true 
}) => {
  if (!message) return null;
  
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic={atomic}
      className="sr-only"
      aria-busy="false"
    >
      {message}
    </div>
  );
};

// Usage examples
// Polite - for non-urgent updates (search results, filters applied)
<LiveRegion message="12 equipment found" politeness="polite" />

// Assertive - for urgent updates (errors, confirmations)
<LiveRegion message="Booking confirmed successfully" politeness="assertive" />

// Off - for decorative content
<LiveRegion message="" politeness="off" />
```

```css
/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only:focus {
  position: absolute;
  width: auto;
  height: auto;
  padding: 8px 16px;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
  background: #fff;
  color: #000;
  z-index: 9999;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
```

### Descriptive Labels & Instructions
```jsx
// components/equipment/EquipmentCard.jsx
import React from 'react';
import PropTypes from 'prop-types';

const EquipmentCard = ({ 
  equipment, 
  onSelect, 
  onFavorite,
  isFavorite = false 
}) => {
  const equipmentId = `equipment-${equipment.id}`;
  const favoriteId = `favorite-${equipment.id}`;
  const priceId = `price-${equipment.id}`;
  const specsId = `specs-${equipment.id}`;

  return (
    <article 
      id={equipmentId}
      className="equipment-card"
      aria-labelledby={`${equipmentId}-name`}
      aria-describedby={`${equipmentId}-desc`}
    >
      <div className="equipment-card__image">
        <img 
          src={equipment.image} 
          alt="" 
          aria-hidden="true"
          loading="lazy"
        />
        {equipment.status === 'unavailable' && (
          <span className="badge badge--unavailable" aria-label="Currently unavailable">
            Unavailable
          </span>
        )}
      </div>
      
      <div className="equipment-card__content">
        <h3 id={`${equipmentId}-name`} className="equipment-card__name">
          {equipment.name}
        </h3>
        
        <p id={`${equipmentId}-desc`} className="equipment-card__description">
          {equipment.description}
        </p>
        
        <dl className="equipment-card__specs" id={specsId}>
          <dt>Category</dt>
          <dd>{equipment.category}</dd>
          
          <dt>Owner</dt>
          <dd>{equipment.owner.name} (Rating: {equipment.owner.rating}/5)</dd>
          
          <dt id={`${priceId}-label`}>Price per day</dt>
          <dd id={priceId} className="price">
            ₹{equipment.pricePerDay.toLocaleString()}/day
          </dd>
        </dl>
        
        <div className="equipment-card__actions">
          <button
            id={favoriteId}
            type="button"
            className={`btn btn--icon ${isFavorite ? 'btn--favorited' : ''}`}
            onClick={() => onFavorite(equipment.id)}
            aria-pressed={isFavorite}
            aria-label={isFavorite 
              ? `Remove ${equipment.name} from favorites` 
              : `Add ${equipment.name} to favorites`}
          >
            <svg aria-hidden="true" className="icon-heart">
              <use href="#icon-heart" />
            </svg>
            <span className="sr-only">
              {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </span>
          </button>
          
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => onSelect(equipment)}
            aria-describedby={`${priceId}-label ${priceId}`}
          >
            View Details & Book
          </button>
        </div>
      </div>
    </article>
  );
};

export default EquipmentCard;
```

### Status Announcements
```jsx
// hooks/useAnnouncer.js
import { useCallback, useRef } from 'react';

export const useAnnouncer = () => {
  const announceRef = useRef(null);
  
  const announce = useCallback((message, politeness = 'polite') => {
    if (!announceRef.current) {
      announceRef.current = document.createElement('div');
      announceRef.current.setAttribute('role', 'status');
      announceRef.current.setAttribute('aria-live', politeness);
      announceRef.current.setAttribute('aria-atomic', 'true');
      announceRef.current.className = 'sr-only';
      document.body.appendChild(announceRef.current);
    }
    
    announceRef.current.setAttribute('aria-live', politeness);
    announceRef.current.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      if (announceRef.current) {
        announceRef.current.textContent = '';
      }
    }, 1000);
  }, []);
  
  return { announce };
};

// Usage in components
const BookingForm = () => {
  const { announce } = useAnnouncer();
  
  const handleSubmit = async (data) => {
    try {
      await createBooking(data);
      announce('Booking request submitted successfully', 'assertive');
    } catch (error) {
      announce(`Booking failed: ${error.message}`, 'assertive');
    }
  };
  
  // ...
};
```

---

## Visual Design & Color

### Color Contrast Requirements
```css
/* Color palette meeting WCAG AA */
:root {
  /* Primary colors - 4.5:1 on white */
  --color-primary: #0066cc;      /* 5.9:1 on white */
  --color-primary-dark: #004499; /* 8.6:1 on white */
  --color-primary-light: #3399ff; /* 3.1:1 on white - use for large text only */
  
  /* Secondary colors */
  --color-secondary: #28a745;    /* 4.5:1 on white */
  --color-warning: #ffc107;      /* 3.0:1 on black - use for large text only */
  --color-danger: #dc3545;       /* 5.5:1 on white */
  
  /* Neutral colors */
  --color-text: #1a1a2e;         /* 15.3:1 on white */
  --color-text-muted: #495057;   /* 7.3:1 on white */
  --color-text-light: #6c757d;   /* 4.6:1 on white */
  --color-background: #ffffff;   /* 1:1 on white */
  --color-surface: #f8f9fa;      /* 1.1:1 on white */
  --color-border: #dee2e6;       /* 1.4:1 on white */
  
  /* Focus */
  --color-focus: #0066cc;
  --color-focus-ring: rgba(0, 102, 204, 0.3);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #f8f9fa;
    --color-text-muted: #adb5bd;
    --color-text-light: #ced4da;
    --color-background: #1a1a2e;
    --color-surface: #16213e;
    --color-border: #2d3a5e;
    --color-primary: #66b3ff;
    --color-primary-dark: #3399ff;
    --color-primary-light: #99ccff;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --color-primary: #00ffff;
    --color-secondary: #00ff00;
    --color-warning: #ffff00;
    --color-danger: #ff00ff;
    --color-text: #ffffff;
    --color-background: #000000;
    --color-border: #ffffff;
  }
}
```

### Text Spacing & Typography
```css
/* Base typography meeting WCAG 1.4.12 */
html {
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.02em;
  word-spacing: 0.16em;
}

/* Allow user to override spacing */
@media (prefers-reduced-motion: no-preference) {
  :root {
    --line-height: 1.5;
    --letter-spacing: 0.02em;
    --word-spacing: 0.16em;
  }
}

/* Responsive text sizing */
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
}

/* Minimum 200% zoom support */
@media screen and (max-width: 320px) {
  html {
    font-size: 14px;
  }
}

/* Text spacing override support */
.text-spacing-override {
  line-height: var(--line-height, 1.5) !important;
  letter-spacing: var(--letter-spacing, 0.02em) !important;
  word-spacing: var(--word-spacing, 0.16em) !important;
}
```

### Non-Text Contrast (UI Components)
```css
/* Buttons - 3:1 minimum */
.btn {
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.btn:focus-visible {
  border-color: var(--color-focus);
  box-shadow: 0 0 0 3px var(--color-focus-ring);
}

.btn--primary {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* Form inputs - 3:1 minimum */
.input {
  border: 2px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-text);
}

.input:focus {
  border-color: var(--color-focus);
  box-shadow: 0 0 0 3px var(--color-focus-ring);
}

.input::placeholder {
  color: var(--color-text-light);
  opacity: 1;
}

/* Focus indicators for interactive elements */
.card:focus-within,
.dropdown:focus-within,
.tabs:focus-within {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

/* SVG icons */
.icon {
  fill: currentColor;
  width: 1.25em;
  height: 1.25em;
}

.icon--interactive {
  color: var(--color-text);
  transition: color 0.2s;
}

.icon--interactive:hover,
.icon--interactive:focus {
  color: var(--color-primary);
}
```

---

## Forms & Input Accessibility

### Accessible Form Components
```jsx
// components/common/AccessibleInput.jsx
import React, { forwardRef, useId } from 'react';
import PropTypes from 'prop-types';

const AccessibleInput = forwardRef((
  {
    label,
    type = 'text',
    required,
    disabled,
    readOnly,
    error,
    hint,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref
) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  
  const describedBy = [
    ariaDescribedBy,
    error && errorId,
    hint && hintId,
  ].filter(Boolean).join(' ') || undefined;

  return (
    <div className="form-field">
      <label htmlFor={inputId} className="form-field__label">
        {label}
        {required && (
          <span className="form-field__required" aria-hidden="true">*</span>
        )}
        {required && <span className="sr-only">(required)</span>}
      </label>
      
      <input
        ref={ref}
        id={inputId}
        type={type}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={!!error}
        aria-required={required}
        aria-disabled={disabled}
        aria-readonly={readOnly}
        aria-describedby={describedBy}
        className={`form-field__input ${error ? 'form-field__input--error' : ''}`}
        {...props}
      />
      
      {hint && (
        <span id={hintId} className="form-field__hint">
          {hint}
        </span>
      )}
      
      {error && (
        <span id={errorId} className="form-field__error" role="alert">
          <svg aria-hidden="true" className="icon-error">
            <use href="#icon-alert" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
});

AccessibleInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'tel', 'password', 'number', 'date']),
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  'aria-describedby': PropTypes.string,
};

export default AccessibleInput;
```

```jsx
// components/common/AccessibleSelect.jsx
import React, { forwardRef, useId } from 'react';
import PropTypes from 'prop-types';

const AccessibleSelect = forwardRef((
  {
    label,
    options,
    required,
    disabled,
    error,
    hint,
    placeholder,
    ...props
  },
  ref
) => {
  const selectId = useId();
  const errorId = `${selectId}-error`;
  const hintId = `${selectId}-hint`;
  
  const describedBy = [
    error && errorId,
    hint && hintId,
  ].filter(Boolean).join(' ') || undefined;

  return (
    <div className="form-field">
      <label htmlFor={selectId} className="form-field__label">
        {label}
        {required && <span className="form-field__required" aria-hidden="true">*</span>}
        {required && <span className="sr-only">(required)</span>}
      </label>
      
      <select
        ref={ref}
        id={selectId}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        aria-required={required}
        aria-disabled={disabled}
        aria-describedby={describedBy}
        className={`form-field__select ${error ? 'form-field__select--error' : ''}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {hint && <span id={hintId} className="form-field__hint">{hint}</span>}
      {error && (
        <span id={errorId} className="form-field__error" role="alert">
          <svg aria-hidden="true" className="icon-error"><use href="#icon-alert" /></svg>
          {error}
        </span>
      )}
    </div>
  );
});

export default AccessibleSelect;
```

### Form Validation & Error Handling
```jsx
// components/booking/BookingForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AccessibleInput from '../common/AccessibleInput';
import AccessibleSelect from '../common/AccessibleSelect';
import AccessibleButton from '../common/AccessibleButton';
import { useAnnouncer } from '../../hooks/useAnnouncer';

const bookingSchema = yup.object().shape({
  startDate: yup
    .date()
    .required('Start date is required')
    .min(new Date(), 'Start date must be today or future'),
  endDate: yup
    .date()
    .required('End date is required')
    .min(yup.ref('startDate'), 'End date must be after start date'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: yup
    .string()
    .email('Enter a valid email address')
    .required('Email is required'),
  address: yup.string().required('Delivery address is required'),
});

const BookingForm = ({ equipment }) => {
  const { announce } = useAnnouncer();
  const [submitError, setSubmitError] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(bookingSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    try {
      await createBooking({ ...data, equipmentId: equipment.id });
      announce('Booking request submitted successfully', 'assertive');
      // Redirect or show success
    } catch (error) {
      setSubmitError(error.message);
      announce(`Booking failed: ${error.message}`, 'assertive');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>Book {equipment.name}</h2>
      
      {submitError && (
        <div className="alert alert--error" role="alert">
          <svg aria-hidden="true"><use href="#icon-alert" /></svg>
          {submitError}
        </div>
      )}
      
      <fieldset>
        <legend>Booking Dates</legend>
        <div className="form-row">
          <AccessibleInput
            label="Start Date"
            type="date"
            error={errors.startDate?.message}
            hint="Select the start date for your booking"
            {...register('startDate')}
          />
          <AccessibleInput
            label="End Date"
            type="date"
            error={errors.endDate?.message}
            hint="Select the end date for your booking"
            {...register('endDate')}
          />
        </div>
      </fieldset>
      
      <fieldset>
        <legend>Contact Information</legend>
        <AccessibleInput
          label="Phone Number"
          type="tel"
          placeholder="9876543210"
          error={errors.phone?.message}
          hint="10-digit mobile number for booking updates"
          {...register('phone')}
        />
        <AccessibleInput
          label="Email Address"
          type="email"
          placeholder="farmer@example.com"
          error={errors.email?.message}
          hint="Email for booking confirmation"
          {...register('email')}
        />
      </fieldset>
      
      <AccessibleInput
        label="Delivery Address"
        type="text"
        multiline
        rows={3}
        error={errors.address?.message}
        hint="Full address where equipment should be delivered"
        {...register('address')}
        as="textarea"
      />
      
      <AccessibleButton
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        Submit Booking Request
      </AccessibleButton>
    </form>
  );
};

export default BookingForm;
```

---

## Images & Media

### Image Accessibility Patterns
```jsx
// components/common/AccessibleImage.jsx
import React from 'react';
import PropTypes from 'prop-types';

const AccessibleImage = ({ 
  src, 
  alt, 
  width, 
  height,
  loading = 'lazy',
  decorative = false,
  caption,
  ...props 
}) => {
  // Decorative images should have empty alt and aria-hidden
  if (decorative) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        loading={loading}
        {...props}
      />
    );
  }

  // Complex images need detailed alt text
  const isComplex = alt && alt.length > 150;
  
  return (
    <figure className="accessible-image">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        {...props}
      />
      {caption && (
        <figcaption className="image-caption">
          {caption}
        </figcaption>
      )}
      {isComplex && (
        <details className="image-description">
          <summary>View detailed description</summary>
          <div className="image-description__content">
            {alt}
          </div>
        </details>
      )}
    </figure>
  );
};

AccessibleImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  loading: PropTypes.oneOf(['lazy', 'eager']),
  decorative: PropTypes.bool,
  caption: PropTypes.string,
};

export default AccessibleImage;
```

### Icon Accessibility
```jsx
// components/common/Icon.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ 
  name, 
  size = 'md',
  decorative = false,
  label,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  // Decorative icons
  if (decorative) {
    return (
      <svg 
        className={`icon icon--${sizeClasses[size]} ${props.className || ''}`}
        aria-hidden="true"
        {...props}
      >
        <use href={`#icon-${name}`} />
      </svg>
    );
  }

  // Semantic icons need accessible labels
  return (
    <svg
      className={`icon icon--${sizeClasses[size]} ${props.className || ''}`}
      role="img"
      aria-label={label}
      {...props}
    >
      <title>{label}</title>
      <use href={`#icon-${name}`} />
    </svg>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  decorative: PropTypes.bool,
  label: PropTypes.string,
};

export default Icon;
```

### Video & Audio Accessibility
```jsx
// components/common/AccessibleVideo.jsx
import React from 'react';
import PropTypes from 'prop-types';

const AccessibleVideo = ({ 
  src, 
  poster,
  title,
  description,
  captionsSrc,
  audioDescriptionSrc,
  transcripts,
  ...props 
}) => {
  return (
    <div className="accessible-video">
      <video
        controls
        poster={poster}
        aria-label={title}
        aria-describedby={description ? 'video-desc' : undefined}
        {...props}
      >
        <source src={src} type="video/mp4" />
        {captionsSrc && (
          <track
            kind="captions"
            src={captionsSrc}
            srclang="en"
            label="English Captions"
            default
          />
        )}
        {audioDescriptionSrc && (
          <track
            kind="descriptions"
            src={audioDescriptionSrc}
            srclang="en"
            label="English Audio Description"
          />
        )}
        <p>Your browser doesn't support HTML5 video.</p>
      </video>
      
      {description && (
        <p id="video-desc" className="sr-only">{description}</p>
      )}
      
      {transcripts && (
        <details className="video-transcript">
          <summary>View Transcript</summary>
          <div className="video-transcript__content">
            {transcripts}
          </div>
        </details>
      )}
    </div>
  );
};

export default AccessibleVideo;
```

---

## Responsive & Mobile Accessibility

### Touch Target Sizes
```css
/* Minimum 44x44px touch targets (WCAG 2.5.5) */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Larger for primary actions */
.touch-target--primary {
  min-height: 48px;
  min-width: 48px;
}

/* Spacing between touch targets */
.touch-target + .touch-target {
  margin-left: 8px;
}

@media (pointer: coarse) {
  /* Increase touch targets on touch devices */
  .btn,
  .input,
  .select,
  .checkbox,
  .radio,
  .tab,
  .menu-item {
    min-height: 48px;
    min-width: 48px;
  }
  
  /* Increase spacing */
  .form-field + .form-field {
    margin-top: 24px;
  }
}
```

### Viewport & Zoom Support
```html
<!-- Viewport meta tag for accessibility -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
```

```css
/* Support up to 500% zoom */
html {
  /* Allow text scaling */
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

/* Prevent horizontal scroll at 320px (WCAG 1.4.10) */
@media screen and (max-width: 320px) {
  .container {
    padding: 0 16px;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
  
  .flex {
    flex-direction: column;
  }
}
```

### Orientation Support
```css
/* Support both portrait and landscape (WCAG 1.3.4) */
@media (orientation: portrait) {
  .sidebar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50vh;
    transform: translateY(100%);
    transition: transform 0.3s;
  }
  
  .sidebar--open {
    transform: translateY(0);
  }
}

@media (orientation: landscape) {
  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    transform: translateX(100%);
    transition: transform 0.3s;
  }
  
  .sidebar--open {
    transform: translateX(0);
  }
}
```

### Mobile-Specific Patterns
```jsx
// components/common/BottomSheet.jsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../hooks/useFocusManagement';

const BottomSheet = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  snapPoints = ['50%', '90%'] 
}) => {
  const sheetRef = useRef(null);
  const { saveFocus, restoreFocus } = useFocusRestore();
  
  useFocusTrap(isOpen, sheetRef);
  
  useEffect(() => {
    if (isOpen) {
      saveFocus();
      document.body.style.overflow = 'hidden';
    } else {
      restoreFocus();
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, saveFocus, restoreFocus]);
  
  if (!isOpen) return null;
  
  return createPortal(
    <div className="bottom-sheet-overlay" onClick={onClose}>
      <div
        ref={sheetRef}
        className="bottom-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bottom-sheet-title"
      >
        <header className="bottom-sheet__header">
          <h2 id="bottom-sheet-title">{title}</h2>
          <button
            type="button"
            className="bottom-sheet__close"
            onClick={onClose}
            aria-label="Close bottom sheet"
          >
            <Icon name="x" decorative />
          </button>
        </header>
        <div className="bottom-sheet__content">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BottomSheet;
```

---

## Testing & Validation

### Automated Testing
```javascript
// tests/accessibility/a11y.test.js
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import EquipmentList from '../../components/equipment/EquipmentList';
import BookingForm from '../../components/booking/BookingForm';
import Navigation from '../../components/layout/Navigation';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  test('EquipmentList has no violations', async () => {
    const { container } = render(<EquipmentList />);
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
        'keyboard': { enabled: true },
        'aria-roles': { enabled: true },
      }
    });
    expect(results).toHaveNoViolations();
  });

  test('BookingForm has no violations', async () => {
    const { container } = render(<BookingForm equipment={mockEquipment} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Navigation has no violations', async () => {
    const { container } = render(<Navigation />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Cypress Accessibility Testing
```javascript
// cypress/support/commands.js
import 'cypress-axe';

Cypress.Commands.add('checkA11y', (context, options = {}) => {
  cy.injectAxe();
  cy.checkA11y(context, {
    includedImpacts: ['critical', 'serious', 'moderate', 'minor'],
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
    },
    ...options,
  }, (violations) => {
    violations.forEach(violation => {
      cy.log(`**${violation.id}** (${violation.impact}): ${violation.description}`);
      violation.nodes.forEach(node => {
        cy.log(`  Element: ${node.html}`);
        cy.log(`  Target: ${node.target.join(', ')}`);
      });
    });
  });
});

// cypress/e2e/accessibility/a11y.cy.js
describe('Accessibility E2E', () => {
  const pages = [
    { path: '/', name: 'Home' },
    { path: '/equipment', name: 'Equipment List' },
    { path: '/equipment/1', name: 'Equipment Detail' },
    { path: '/login', name: 'Login' },
    { path: '/register', name: 'Register' },
    { path: '/booking/1', name: 'Booking Form' },
    { path: '/profile', name: 'Profile' },
  ];

  pages.forEach(page => {
    it(`should have no a11y violations on ${page.name}`, () => {
      cy.visit(page.path);
      cy.checkA11y();
    });
  });

  it('should have no a11y violations after interactions', () => {
    cy.visit('/equipment');
    cy.get('[data-cy=search]').type('tractor');
    cy.checkA11y();
    
    cy.get('[data-cy=category-filter]').select('tractor');
    cy.checkA11y();
    
    cy.get('[data-cy=equipment-card]').first().click();
    cy.checkA11y();
  });

  it('should have no a11y violations in modals', () => {
    cy.visit('/equipment');
    cy.get('[data-cy=book-now]').click();
    cy.checkA11y('[role="dialog"]');
  });
});
```

### Manual Testing Checklist
```markdown
## Manual Accessibility Testing Checklist

### Keyboard Navigation
- [ ] Tab through entire page - all interactive elements reachable
- [ ] Shift+Tab works in reverse order
- [ ] Enter/Space activates buttons and links
- [ ] Arrow keys navigate menus, tabs, carousels
- [ ] Escape closes modals, dropdowns, menus
- [ ] Focus visible on all interactive elements
- [ ] Focus order matches visual order
- [ ] No keyboard traps
- [ ] Skip links work and are visible on focus

### Screen Reader (NVDA/JAWS/VoiceOver)
- [ ] Page title announced
- [ ] Headings hierarchy logical (h1-h6)
- [ ] Landmarks announced (nav, main, aside, footer)
- [ ] Images have appropriate alt text
- [ ] Form labels associated with inputs
- [ ] Error messages announced
- [ ] Status updates announced (live regions)
- [ ] Tables have headers and captions
- [ ] Dynamic content announced

### Visual
- [ ] Color contrast 4.5:1 (text), 3:1 (UI)
- [ ] Text resizes to 200% without loss
- [ ] No horizontal scroll at 320px width
- [ ] Focus indicators visible
- [ ] Color not sole means of conveying info
- [ ] Animations respect prefers-reduced-motion

### Mobile
- [ ] Touch targets 44x44px minimum
- [ ] Touch targets 48x48px for primary actions
- [ ] 8px spacing between touch targets
- [ ] Works in portrait and landscape
- [ ] Pinch zoom works (not disabled)
- [ ] Virtual keyboard doesn't obscure inputs

### Forms
- [ ] Required fields marked
- [ ] Error messages specific and helpful
- [ ] Error suggestions provided
- [ ] Autocomplete attributes present
- [ ] Input purpose identified
```

---

## Accessibility Checklist

### Component-Level Checklist
```markdown
## Per Component Accessibility Review

### Buttons
- [ ] Semantic `<button>` element used
- [ ] Accessible name (text content or aria-label)
- [ ] Disabled state: aria-disabled, visually distinct
- [ ] Loading state: aria-busy, spinner hidden from SR
- [ ] Focus indicator visible
- [ ] Keyboard activatable (Enter/Space)

### Links
- [ ] Semantic `<a>` with href
- [ ] Descriptive link text (not "click here")
- [ ] External links identified
- [ ] Download links identified
- [ ] Focus indicator visible

### Form Inputs
- [ ] Associated `<label>` (for/id or wrapping)
- [ ] Required: aria-required, visual indicator
- [ ] Error: aria-invalid, aria-describedby error
- [ ] Hint: aria-describedby hint
- [ ] Autocomplete attributes
- [ ] Type appropriate (email, tel, date, etc.)

### Images
- [ ] Informative: descriptive alt text
- [ ] Decorative: alt="", aria-hidden="true"
- [ ] Complex: long description available
- [ ] Icons: aria-hidden or aria-label

### Navigation
- [ ] Semantic `<nav>` with aria-label
- [ ] Current page: aria-current="page"
- [ ] Dropdowns: aria-haspopup, aria-expanded
- [ ] Mobile menu: aria-controls, focus trap

### Modals/Dialogs
- [ ] role="dialog" or role="alertdialog"
- [ ] aria-modal="true"
- [ ] aria-labelledby title
- [ ] Focus trapped
- [ ] Focus restored on close
- [ ] Escape closes
- [ ] Background inert

### Tables
- [ ] `<caption>` for description
- [ ] `<th scope="col|row">` for headers
- [ ] Complex: headers/id attributes
- [ ] Responsive: horizontal scroll or stack

### Lists
- [ ] `<ul>`, `<ol>`, `<dl>` semantic
- [ ] `<li>` direct children
- [ ] Description lists for key-value

### Live Regions
- [ ] aria-live="polite" for updates
- [ ] aria-live="assertive" for alerts
- [ ] aria-atomic="true" for complete messages
- [ ] role="status" or role="alert"
```

### Page-Level Checklist
```markdown
## Per Page Accessibility Review

### Structure
- [ ] Single `<h1>` matching page title
- [ ] Heading hierarchy logical (no skipped levels)
- [ ] Landmarks: banner, nav, main, aside, contentinfo
- [ ] Skip links present and functional
- [ ] Language declared: `<html lang="en">`

### Content
- [ ] Page title unique and descriptive
- [ ] Text alternatives for all non-text content
- [ ] Meaningful sequence (reading order)
- [ ] Instructions not sensory-only
- [ ] Color not sole indicator
- [ ] Audio auto-play controllable

### Interaction
- [ ] All functionality keyboard accessible
- [ ] No keyboard traps
- [ ] Timing adjustable (if any limits)
- [ ] Moving content pausable
- [ ] No flashing >3x/sec
- [ ] Focus order logical
- [ ] Focus visible
- [ ] Link purpose clear from context

### Forms
- [ ] Labels for all inputs
- [ ] Required fields indicated
- [ ] Error identification in text
- [ ] Error suggestions provided
- [ ] Error prevention (legal/financial)
- [ ] Consistent identification

### Compatibility
- [ ] Valid HTML (no parsing errors)
- [ ] ARIA used correctly
- [ ] Name, role, value for custom components
- [ ] Status messages announced
```

---

## Quick Reference: Accessibility Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use semantic HTML elements | Use `<div>` for everything |
| Provide descriptive alt text | Use "image", "photo", or filename |
| Associate labels with inputs | Use placeholder as label |
| Ensure 4.5:1 color contrast | Use light gray on white |
| Make focus visible | Remove outline with `outline: none` |
| Test with keyboard only | Assume mouse/touch only |
| Test with screen readers | Skip screen reader testing |
| Use ARIA when HTML insufficient | Use ARIA instead of semantic HTML |
| Respect prefers-reduced-motion | Force animations |
| Allow 200% zoom | Disable zoom with viewport meta |
| Provide skip links | Force tab through navigation |
| Use live regions for updates | Update UI silently |
| Test on mobile with touch | Only test on desktop |

---

## Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Checklist](https://webaim.org/standards/wcag/checklist)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

---

*Last Updated: November 2026* 