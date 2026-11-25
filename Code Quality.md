# Code Quality Guidelines

## Overview
This document outlines the code quality standards, best practices, and guidelines for the **Krishi Sadhan** project. These guidelines ensure maintainable, readable, and scalable code across the entire codebase.

---

## Table of Contents
1. [General Principles](#general-principles)
2. [React Component Standards](#react-component-standards)
3. [Redux State Management](#redux-state-management)
4. [Code Organization](#code-organization)
5. [Naming Conventions](#naming-conventions)
6. [Error Handling](#error-handling)
7. [Performance Optimization](#performance-optimization)
8. [Code Review Checklist](#code-review-checklist)
9. [Tools & Automation](#tools--automation)

---

## General Principles

### 1. Clean Code Philosophy
- **Readability over cleverness** - Code should be self-documenting
- **Single Responsibility** - Each function/component does one thing well
- **DRY (Don't Repeat Yourself)** - Extract common logic into reusable utilities
- **KISS (Keep It Simple, Stupid)** - Prefer simple solutions over complex ones

### 2. Consistency
- Follow established patterns in the codebase
- Use consistent formatting (enforced by Prettier)
- Maintain consistent naming across files and components

### 3. Type Safety
- Use PropTypes for component prop validation
- Leverage TypeScript-like JSDoc comments for complex types
- Validate API responses before using them

---

## React Component Standards

### Component Structure
```jsx
// ✅ Good: Functional component with clear structure
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEquipment } from '../../redux/actions/equipmentActions';

const EquipmentList = ({ category, onEquipmentSelect }) => {
  // 1. Hooks at the top
  const dispatch = useDispatch();
  const { equipment, loading, error } = useSelector(state => state.equipment);
  const [localFilter, setLocalFilter] = useState('');

  // 2. Effects
  useEffect(() => {
    dispatch(fetchEquipment(category));
  }, [dispatch, category]);

  // 3. Event handlers (useCallback for stability)
  const handleFilterChange = useCallback((value) => {
    setLocalFilter(value);
  }, []);

  const handleItemClick = useCallback((equipment) => {
    onEquipmentSelect?.(equipment);
  }, [onEquipmentSelect]);

  // 4. Render helpers
  const filteredEquipment = equipment.filter(item => 
    item.name.toLowerCase().includes(localFilter.toLowerCase())
  );

  // 5. Early returns for loading/error states
  if (loading) return <EquipmentSkeleton />;
  if (error) return <ErrorMessage message={error} onRetry={() => dispatch(fetchEquipment(category))} />;

  // 6. Main render
  return (
    <div className="equipment-list">
      <SearchInput value={localFilter} onChange={handleFilterChange} />
      <EquipmentGrid items={filteredEquipment} onItemClick={handleItemClick} />
    </div>
  );
};

EquipmentList.propTypes = {
  category: PropTypes.string.isRequired,
  onEquipmentSelect: PropTypes.func,
};

EquipmentList.defaultProps = {
  onEquipmentSelect: null,
};

export default EquipmentList;
```

### Component Composition Patterns

#### 1. Container/Presentational Pattern
```jsx
// Container Component (Smart) - Handles logic, data fetching
const EquipmentContainer = () => {
  const dispatch = useDispatch();
  const equipment = useSelector(state => state.equipment.items);
  
  useEffect(() => {
    dispatch(fetchAllEquipment());
  }, [dispatch]);

  return <EquipmentPresentation equipment={equipment} />;
};

// Presentational Component (Dumb) - Only renders UI
const EquipmentPresentation = ({ equipment }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {equipment.map(item => (
      <EquipmentCard key={item.id} equipment={item} />
    ))}
  </div>
);
```

#### 2. Custom Hooks for Logic Reuse
```jsx
// hooks/useEquipment.js
export const useEquipment = (category) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.equipment);
  
  const fetchData = useCallback(() => {
    dispatch(fetchEquipment(category));
  }, [dispatch, category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { equipment: items, loading, error, refetch: fetchData };
};

// Usage in component
const EquipmentList = ({ category }) => {
  const { equipment, loading, error, refetch } = useEquipment(category);
  // ... render logic
};
```

---

## Redux State Management

### Action Structure
```javascript
// redux/actions/equipmentActions.js
export const FETCH_EQUIPMENT_REQUEST = 'equipment/FETCH_REQUEST';
export const FETCH_EQUIPMENT_SUCCESS = 'equipment/FETCH_SUCCESS';
export const FETCH_EQUIPMENT_FAILURE = 'equipment/FETCH_FAILURE';

// Action creators
export const fetchEquipmentRequest = () => ({
  type: FETCH_EQUIPMENT_REQUEST,
});

export const fetchEquipmentSuccess = (equipment) => ({
  type: FETCH_EQUIPMENT_SUCCESS,
  payload: equipment,
});

export const fetchEquipmentFailure = (error) => ({
  type: FETCH_EQUIPMENT_FAILURE,
  payload: error,
  error: true, // For redux-toolkit compatibility
});

// Async thunk
export const fetchEquipment = (category) => async (dispatch) => {
  dispatch(fetchEquipmentRequest());
  try {
    const response = await api.get(`/equipment?category=${category}`);
    dispatch(fetchEquipmentSuccess(response.data));
  } catch (error) {
    dispatch(fetchEquipmentFailure(error.message));
  }
};
```

### Reducer Pattern
```javascript
// redux/reducers/equipmentReducer.js
import {
  FETCH_EQUIPMENT_REQUEST,
  FETCH_EQUIPMENT_SUCCESS,
  FETCH_EQUIPMENT_FAILURE,
} from '../actions/equipmentActions';

const initialState = {
  items: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

export const equipmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EQUIPMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
        lastUpdated: Date.now(),
      };
    case FETCH_EQUIPMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
```

### Selector Patterns
```javascript
// redux/selectors/equipmentSelectors.js
export const selectEquipment = (state) => state.equipment.items;
export const selectEquipmentLoading = (state) => state.equipment.loading;
export const selectEquipmentError = (state) => state.equipment.error;

// Memoized selectors for expensive computations
import { createSelector } from 'reselect';

export const selectFilteredEquipment = createSelector(
  [selectEquipment, (state, filter) => filter],
  (equipment, filter) => equipment.filter(item => 
    item.name.toLowerCase().includes(filter.toLowerCase())
  )
);

export const selectEquipmentByCategory = createSelector(
  [selectEquipment, (state, category) => category],
  (equipment, category) => equipment.filter(item => item.category === category)
);
```

---

## Code Organization

### Directory Structure
```
src/
├── api/                    # API layer
│   ├── index.js           # Axios instance & interceptors
│   ├── endpoints.js       # API endpoint constants
│   └── services/          # Service modules
│       ├── authService.js
│       ├── equipmentService.js
│       └── bookingService.js
├── components/            # Reusable UI components
│   ├── common/           # Generic components (Button, Input, Modal)
│   ├── layout/           # Layout components (Header, Footer, Sidebar)
│   ├── equipment/        # Equipment-specific components
│   └── booking/          # Booking-specific components
├── pages/                # Page-level components
│   ├── Home/
│   ├── EquipmentList/
│   ├── EquipmentDetail/
│   ├── Booking/
│   └── Profile/
├── redux/                # Redux store
│   ├── actions/          # Action creators
│   ├── reducers/         # Reducers
│   ├── selectors/        # Memoized selectors
│   ├── store.js          # Store configuration
│   └── rootReducer.js    # Combined reducers
├── hooks/                # Custom React hooks
│   ├── useAuth.js
│   ├── useEquipment.js
│   └── useBooking.js
├── utils/                # Utility functions
│   ├── constants.js
│   ├── helpers.js
│   ├── validators.js
│   └── formatters.js
├── styles/               # Global styles
│   ├── globals.css
│   └── variables.css
└── assets/               # Static assets
    ├── images/
    └── icons/
```

### Import Order Convention
```jsx
// 1. React & external libraries
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// 2. Internal - absolute imports (configured in jsconfig.json)
import { fetchEquipment } from 'redux/actions/equipmentActions';
import { selectEquipment } from 'redux/selectors/equipmentSelectors';
import { useEquipment } from 'hooks/useEquipment';

// 3. Components
import { Button, Input } from 'components/common';
import EquipmentCard from 'components/equipment/EquipmentCard';

// 4. Styles
import './EquipmentList.css';

// 5. Types/Constants
import { EQUIPMENT_CATEGORIES } from 'utils/constants';
```

---

## Naming Conventions

### Files & Directories
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `EquipmentCard.jsx` |
| Hooks | camelCase with `use` prefix | `useEquipment.js` |
| Utilities | camelCase | `formatCurrency.js` |
| Constants | UPPER_SNAKE_CASE | `API_ENDPOINTS.js` |
| Redux actions | camelCase with domain prefix | `fetchEquipment.js` |
| Redux reducers | camelCase with `Reducer` suffix | `equipmentReducer.js` |
| Pages | PascalCase with `Page` suffix | `EquipmentListPage.jsx` |

### Code Elements
```javascript
// Variables & Functions: camelCase
const equipmentList = [];
const fetchUserBookings = () => {};

// Constants: UPPER_SNAKE_CASE
const MAX_EQUIPMENT_PER_PAGE = 20;
const API_BASE_URL = 'https://api.krishi-sadhan.com';

// Components: PascalCase
const EquipmentCard = () => {};
const BookingConfirmationModal = () => {};

// Custom Hooks: camelCase with 'use' prefix
const useEquipmentFilters = () => {};
const useAuthState = () => {};

// Redux Action Types: UPPER_SNAKE_CASE with domain prefix
const FETCH_EQUIPMENT_SUCCESS = 'equipment/FETCH_SUCCESS';
const BOOKING_CREATE_REQUEST = 'booking/CREATE_REQUEST';

// CSS Classes: kebab-case (Tailwind utility classes preferred)
<div className="equipment-card">
<div className="booking-form-container">
```

---

## Error Handling

### API Error Handling
```javascript
// api/index.js - Centralized error handling
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors globally
    if (error.response?.status === 401) {
      // Token expired - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    // Normalize error format
    const normalizedError = {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      code: error.response?.data?.code,
    };
    
    return Promise.reject(normalizedError);
  }
);

export default api;
```

### Component Error Boundaries
```jsx
// components/common/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // Log to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## Performance Optimization

### 1. React.memo for Component Memoization
```jsx
// ✅ Good: Memoize pure presentational components
const EquipmentCard = React.memo(({ equipment, onSelect }) => {
  return (
    <div className="equipment-card" onClick={() => onSelect(equipment)}>
      <img src={equipment.image} alt={equipment.name} />
      <h3>{equipment.name}</h3>
      <p>{equipment.category}</p>
      <span className="price">₹{equipment.pricePerDay}/day</span>
    </div>
  );
});

EquipmentCard.propTypes = {
  equipment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    category: PropTypes.string,
    pricePerDay: PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};
```

### 2. useMemo & useCallback
```jsx
const EquipmentList = ({ category, filters }) => {
  const equipment = useSelector(selectEquipment);
  
  // Memoize expensive filtering
  const filteredEquipment = useMemo(() => {
    return equipment.filter(item => {
      const matchesCategory = !category || item.category === category;
      const matchesPrice = !filters.maxPrice || item.pricePerDay <= filters.maxPrice;
      const matchesSearch = !filters.search || 
        item.name.toLowerCase().includes(filters.search.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [equipment, category, filters]);

  // Stable callback reference
  const handleBook = useCallback((equipmentId) => {
    dispatch(createBooking({ equipmentId, userId: currentUser.id }));
  }, [dispatch, currentUser.id]);

  return (
    <div>
      {filteredEquipment.map(item => (
        <EquipmentCard 
          key={item.id} 
          equipment={item} 
          onSelect={handleBook} 
        />
      ))}
    </div>
  );
};
```

### 3. Code Splitting & Lazy Loading
```jsx
// App.js - Route-based code splitting
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load page components
const EquipmentListPage = lazy(() => import('./pages/EquipmentListPage'));
const EquipmentDetailPage = lazy(() => import('./pages/EquipmentDetailPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

const LoadingFallback = () => <PageSkeleton />;

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/equipment" element={<EquipmentListPage />} />
        <Route path="/equipment/:id" element={<EquipmentDetailPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Suspense>
  );
}
```

### 4. Virtualization for Large Lists
```jsx
// For equipment lists with 100+ items
import { FixedSizeList as List } from 'react-window';

const VirtualizedEquipmentList = ({ equipment }) => (
  <List
    height={600}
    itemCount={equipment.length}
    itemSize={200}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>
        <EquipmentCard equipment={equipment[index]} />
      </div>
    )}
  </List>
);
```

---

## Code Review Checklist

### Before Submitting PR
- [ ] **Functionality**: Code works as intended, all acceptance criteria met
- [ ] **Tests**: Unit tests added/updated, all tests passing
- [ ] **Types**: PropTypes defined for all component props
- [ ] **Performance**: No unnecessary re-renders, proper memoization
- [ ] **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- [ ] **Error Handling**: Graceful error states, user-friendly messages
- [ ] **Security**: No exposed secrets, input validation, XSS prevention
- [ ] **Documentation**: Complex logic commented, README updated if needed

### During Review
- [ ] **Logic**: Business logic is correct and handles edge cases
- [ ] **Architecture**: Follows established patterns, no circular dependencies
- [ ] **Naming**: Clear, descriptive names for variables, functions, components
- [ ] **Complexity**: Functions/components are small and focused
- [ ] **Dependencies**: No unnecessary dependencies added
- [ ] **Bundle Size**: No significant bundle size increase without justification

---

## Tools & Automation

### ESLint Configuration
```json
// .eslintrc.json
{
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  "rules": {
    "react/jsx-props-no-spreading": "warn",
    "react/require-default-props": "warn",
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/no-noninteractive-element-interactions": "warn",
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "prefer-const": "error",
    "no-var": "error"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### Prettier Configuration
```json
// .prettierrc.json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### Git Hooks (Husky)
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm test -- --watchAll=false"
    }
  },
  "lint-staged": {
    "*.{js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,md,json}": [
      "prettier --write"
    ]
  }
}
```

### CI/CD Quality Gates
```yaml
# .github/workflows/quality.yml
name: Code Quality

on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check
      - run: npm test -- --watchAll=false --coverage
      - run: npm run build
```

---

## Quick Reference: Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use functional components with hooks | Use class components (unless necessary) |
| Extract custom hooks for reusable logic | Duplicate logic across components |
| Use `React.memo` for pure components | Memoize everything blindly |
| Centralize API calls in services | Make API calls directly in components |
| Use Redux selectors for derived state | Compute derived state in render |
| Handle loading/error states | Assume API calls always succeed |
| Write meaningful commit messages | Commit with "fix", "update", "wip" |
| Keep components under 200 lines | Create giant "god" components |
| Use TypeScript-style JSDoc for complex types | Use `any` type or skip documentation |

---

## Resources
- [React Best Practices](https://react.dev/learn)
- [Redux Style Guide](https://redux.js.org/style-guide/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [OWASP React Security Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/React_Security_Cheat_Sheet.html)

---