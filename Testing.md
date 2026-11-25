# Testing Guidelines

## Overview
This document outlines the testing standards, strategies, and best practices for the **Krishi Sadhan** (Team Gryffindor) Smart India Hackathon 2022 project. These guidelines ensure comprehensive test coverage, maintainable test code, and reliable quality assurance processes.

---

## Table of Contents
1. [Testing Philosophy](#testing-philosophy)
2. [Test Pyramid Strategy](#test-pyramid-strategy)
3. [Unit Testing](#unit-testing)
4. [Integration Testing](#integration-testing)
5. [End-to-End Testing](#end-to-end-testing)
6. [Component Testing](#component-testing)
7. [API Testing](#api-testing)
8. [Performance Testing](#performance-testing)
9. [Accessibility Testing](#accessibility-testing)
10. [Test Organization & Structure](#test-organization--structure)
11. [CI/CD Integration](#cicd-integration)
12. [Testing Checklist](#testing-checklist)

---

## Testing Philosophy

### Core Principles
```
┌─────────────────────────────────────────────────────────────────┐
│                    TESTING PRINCIPLES                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. TEST BEHAVIOR, NOT IMPLEMENTATION                          │
│     └─ Focus on what the code does, not how it does it         │
│                                                                 │
│  2. TEST USER SCENARIOS                                        │
│     └─ Write tests from user perspective                       │
│                                                                 │
│  3. FAST, RELIABLE, MAINTAINABLE                               │
│     └─ Tests should run in seconds, not minutes                │
│                                                                 │
│  4. TEST PYRAMID                                               │
│     └─ Many unit, some integration, few E2E                    │
│                                                                 │
│  5. SHIFT LEFT                                                 │
│     └─ Test early, test often, automate everything             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Quality Gates
| Gate | Criteria | Tool |
|------|----------|------|
| **Pre-commit** | Lint + Unit tests (changed files) | Husky + Jest |
| **PR Validation** | Full test suite + Coverage > 80% | GitHub Actions |
| **Pre-deploy** | E2E tests + Performance budgets | Cypress + Lighthouse |
| **Post-deploy** | Smoke tests + Synthetic monitoring | Custom scripts |

---

## Test Pyramid Strategy

### Distribution Target
```
                    ┌─────────────┐
                    │   E2E Tests  │  ← 5-10%  (Critical user journeys)
                    │   (Cypress)  │
                   ┌┴─────────────┴┐
                  ┌┴───────────────┴┐
                 ┌┴─────────────────┴┐
                ┌┴───────────────────┴┐
               ┌┴─────────────────────┴┐
              ┌┴───────────────────────┴┐
             ┌┴─────────────────────────┴┐
            ┌┴───────────────────────────┴┐
           ┌┴─────────────────────────────┴┐
          ┌┴───────────────────────────────┴┐
         ┌┴─────────────────────────────────┴┐
        ┌┴───────────────────────────────────┴┐
       ┌┴─────────────────────────────────────┴┐
      ┌┴───────────────────────────────────────┴┐
     ┌┴─────────────────────────────────────────┴┐
    ┌┴───────────────────────────────────────────┴┐
   ┌┴─────────────────────────────────────────────┴┐
  ┌┴───────────────────────────────────────────────┴┐
 ┌┴─────────────────────────────────────────────────┴┐
┌─────────────────────────────────────────────────────┐
│  Unit Tests (Jest + React Testing Library)          │  ← 70-80% (Business logic, utils, hooks)
│  - Pure functions                                    │
│  - Custom hooks                                      │
│  - Utility functions                                 │
│  - Redux reducers/selectors                          │
│  - Component logic (isolated)                        │
└─────────────────────────────────────────────────────┘
```

### Test Categories by Layer

| Layer | Scope | Tools | Speed | Count Target |
|-------|-------|-------|-------|--------------|
| **Unit** | Single function/class | Jest, RTL | < 10ms | 500+ |
| **Integration** | Multiple units together | Jest, MSW | < 100ms | 100+ |
| **Component** | React components | RTL, Jest | < 50ms | 200+ |
| **API** | Backend endpoints | Supertest, Jest | < 200ms | 100+ |
| **E2E** | Full user flows | Cypress | < 30s | 20-30 |
| **Visual** | UI regression | Chromatic/Percy | < 60s | 50+ |
| **Performance** | Load/stress | k6, Lighthouse | < 5min | 10+ |
| **Accessibility** | a11y compliance | axe, Cypress | < 10s | All pages |

---

## Unit Testing

### Pure Functions & Utilities
```javascript
// utils/__tests__/formatters.test.js
import { 
  formatCurrency, 
  formatDate, 
  formatPhoneNumber,
  calculateBookingTotal,
  validateEmail 
} from '../formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    test('formats positive numbers with INR symbol', () => {
      expect(formatCurrency(1000)).toBe('₹1,000.00');
      expect(formatCurrency(1000.5)).toBe('₹1,000.50');
      expect(formatCurrency(0)).toBe('₹0.00');
    });

    test('handles negative numbers', () => {
      expect(formatCurrency(-500)).toBe('-₹500.00');
    });

    test('handles large numbers', () => {
      expect(formatCurrency(10000000)).toBe('₹1,00,00,000.00');
    });

    test('respects locale parameter', () => {
      expect(formatCurrency(1000, 'en-US')).toBe('$1,000.00');
      expect(formatCurrency(1000, 'hi-IN')).toBe('₹1,000.00');
    });
  });

  describe('calculateBookingTotal', () => {
    const basePrice = 1000; // per day
    
    test('calculates total for single day booking', () => {
      const result = calculateBookingTotal({
        pricePerDay: basePrice,
        startDate: '2024-01-15',
        endDate: '2024-01-16',
      });
      expect(result).toEqual({
        days: 1,
        subtotal: 1000,
        tax: 180, // 18% GST
        total: 1180,
      });
    });

    test('calculates total for multi-day booking', () => {
      const result = calculateBookingTotal({
        pricePerDay: basePrice,
        startDate: '2024-01-15',
        endDate: '2024-01-20', // 5 days
      });
      expect(result.days).toBe(5);
      expect(result.subtotal).toBe(5000);
      expect(result.tax).toBe(900);
      expect(result.total).toBe(5900);
    });

    test('applies discount correctly', () => {
      const result = calculateBookingTotal({
        pricePerDay: basePrice,
        startDate: '2024-01-15',
        endDate: '2024-01-20',
        discount: 10, // 10%
      });
      expect(result.discount).toBe(500);
      expect(result.total).toBe(5400);
    });

    test('throws on invalid dates', () => {
      expect(() => calculateBookingTotal({
        pricePerDay: basePrice,
        startDate: '2024-01-20',
        endDate: '2024-01-15', // End before start
      })).toThrow('End date must be after start date');
    });
  });

  describe('validateEmail', () => {
    const validEmails = [
      'user@example.com',
      'user.name@example.com',
      'user+tag@example.co.in',
      'user@subdomain.example.com',
    ];

    const invalidEmails = [
      'invalid',
      '@example.com',
      'user@',
      'user@.com',
      'user@example',
      'user name@example.com',
    ];

    test.each(validEmails)('accepts valid email: %s', (email) => {
      expect(validateEmail(email)).toBe(true);
    });

    test.each(invalidEmails)('rejects invalid email: %s', (email) => {
      expect(validateEmail(email)).toBe(false);
    });
  });
});
```

### Custom Hooks Testing
```javascript
// hooks/__tests__/useEquipment.test.js
import { renderHook, act, waitFor } from '@testing-library/react';
import { useEquipment } from '../useEquipment';
import { equipmentService } from '../../api/services/equipmentService';

// Mock the service
jest.mock('../../api/services/equipmentService');

describe('useEquipment', () => {
  const mockEquipment = [
    { id: '1', name: 'Tractor', pricePerDay: 1000, category: 'tractor' },
    { id: '2', name: 'Harvester', pricePerDay: 2000, category: 'harvester' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches equipment on mount', async () => {
    equipmentService.getAll.mockResolvedValue({ data: mockEquipment });

    const { result } = renderHook(() => useEquipment());

    expect(result.current.loading).toBe(true);
    expect(result.current.equipment).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.equipment).toEqual(mockEquipment);
    expect(equipmentService.getAll).toHaveBeenCalledTimes(1);
  });

  test('filters equipment by category', async () => {
    equipmentService.getAll.mockResolvedValue({ data: mockEquipment });

    const { result } = renderHook(() => useEquipment({ category: 'tractor' }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.equipment).toHaveLength(1);
    expect(result.current.equipment[0].category).toBe('tractor');
  });

  test('handles fetch error', async () => {
    equipmentService.getAll.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useEquipment());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.equipment).toEqual([]);
  });

  test('refetch triggers new fetch', async () => {
    equipmentService.getAll.mockResolvedValue({ data: mockEquipment });

    const { result } = renderHook(() => useEquipment());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    equipmentService.getAll.mockResolvedValue({ data: [...mockEquipment, { id: '3', name: 'Sprayer' }] });

    await act(async () => {
      await result.current.refetch();
    });

    expect(equipmentService.getAll).toHaveBeenCalledTimes(2);
    expect(result.current.equipment).toHaveLength(3);
  });
});
```

### Redux Reducers & Selectors Testing
```javascript
// redux/reducers/__tests__/equipmentReducer.test.js
import { equipmentReducer } from '../equipmentReducer';
import {
  FETCH_EQUIPMENT_REQUEST,
  FETCH_EQUIPMENT_SUCCESS,
  FETCH_EQUIPMENT_FAILURE,
} from '../../actions/equipmentActions';

describe('equipmentReducer', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null,
    lastUpdated: null,
  };

  test('returns initial state', () => {
    expect(equipmentReducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  describe('FETCH_EQUIPMENT_REQUEST', () => {
    test('sets loading true and clears error', () => {
      const state = { ...initialState, error: 'Previous error' };
      const action = { type: FETCH_EQUIPMENT_REQUEST };
      
      const newState = equipmentReducer(state, action);
      
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
      expect(newState.items).toEqual([]);
    });
  });

  describe('FETCH_EQUIPMENT_SUCCESS', () => {
    test('stores equipment and sets loading false', () => {
      const equipment = [{ id: '1', name: 'Tractor' }];
      const action = { type: FETCH_EQUIPMENT_SUCCESS, payload: equipment };
      
      const newState = equipmentReducer(initialState, action);
      
      expect(newState.loading).toBe(false);
      expect(newState.items).toEqual(equipment);
      expect(newState.error).toBeNull();
      expect(newState.lastUpdated).toBeDefined();
    });
  });

  describe('FETCH_EQUIPMENT_FAILURE', () => {
    test('stores error and sets loading false', () => {
      const error = 'Failed to fetch';
      const action = { type: FETCH_EQUIPMENT_FAILURE, payload: error };
      
      const newState = equipmentReducer(initialState, action);
      
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(error);
      expect(newState.items).toEqual([]);
    });
  });
});
```

```javascript
// redux/selectors/__tests__/equipmentSelectors.test.js
import { 
  selectEquipmentItems, 
  selectFilteredEquipment,
  selectEquipmentByCategory 
} from '../equipmentSelectors';

describe('equipmentSelectors', () => {
  const mockState = {
    equipment: {
      items: [
        { id: '1', name: 'Tractor', category: 'tractor', pricePerDay: 1000 },
        { id: '2', name: 'Harvester', category: 'harvester', pricePerDay: 2000 },
        { id: '3', name: 'Mini Tractor', category: 'tractor', pricePerDay: 800 },
      ],
      loading: false,
      error: null,
    },
  };

  test('selectEquipmentItems returns all equipment', () => {
    const result = selectEquipmentItems(mockState);
    expect(result).toHaveLength(3);
  });

  test('selectFilteredEquipment filters by search term', () => {
    const result = selectFilteredEquipment(mockState, 'tractor');
    expect(result).toHaveLength(2);
    expect(result.every(e => e.name.toLowerCase().includes('tractor'))).toBe(true);
  });

  test('selectFilteredEquipment filters by max price', () => {
    const result = selectFilteredEquipment(mockState, '', 1500);
    expect(result).toHaveLength(2);
    expect(result.every(e => e.pricePerDay <= 1500)).toBe(true);
  });

  test('selectEquipmentByCategory returns correct category', () => {
    const result = selectEquipmentByCategory(mockState, 'tractor');
    expect(result).toHaveLength(2);
    expect(result.every(e => e.category === 'tractor')).toBe(true);
  });

  test('returns empty array for non-existent category', () => {
    const result = selectEquipmentByCategory(mockState, 'sprayer');
    expect(result).toHaveLength(0);
  });
});
```

---

## Integration Testing

### API Integration with MSW (Mock Service Worker)
```javascript
// tests/integration/equipmentApi.test.js
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { equipmentService } from '../../api/services/equipmentService';

// Setup MSW server
const server = setupServer(
  rest.get('/api/equipment', (req, res, ctx) => {
    const category = req.url.searchParams.get('category');
    const search = req.url.searchParams.get('search');
    
    let data = [
      { id: '1', name: 'Tractor', category: 'tractor', pricePerDay: 1000 },
      { id: '2', name: 'Harvester', category: 'harvester', pricePerDay: 2000 },
    ];
    
    if (category) {
      data = data.filter(e => e.category === category);
    }
    if (search) {
      data = data.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
    }
    
    return res(ctx.json({ data, total: data.length }));
  }),
  
  rest.post('/api/equipment', async (req, res, ctx) => {
    const body = await req.json();
    return res(ctx.status(201), ctx.json({ 
      data: { id: '3', ...body },
      message: 'Equipment created successfully'
    }));
  }),
  
  rest.get('/api/equipment/:id', (req, res, ctx) => {
    const { id } = req.params;
    if (id === '1') {
      return res(ctx.json({ 
        data: { id: '1', name: 'Tractor', category: 'tractor', pricePerDay: 1000 } 
      }));
    }
    return res(ctx.status(404), ctx.json({ message: 'Not found' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('equipmentService integration', () => {
  test('fetches all equipment', async () => {
    const response = await equipmentService.getAll();
    expect(response.data).toHaveLength(2);
  });

  test('filters by category', async () => {
    const response = await equipmentService.getAll({ category: 'tractor' });
    expect(response.data).toHaveLength(1);
    expect(response.data[0].category).toBe('tractor');
  });

  test('searches equipment', async () => {
    const response = await equipmentService.getAll({ search: 'harv' });
    expect(response.data).toHaveLength(1);
    expect(response.data[0].name).toBe('Harvester');
  });

  test('creates new equipment', async () => {
    const newEquipment = { name: 'Sprayer', category: 'sprayer', pricePerDay: 500 };
    const response = await equipmentService.create(newEquipment);
    expect(response.data.id).toBe('3');
    expect(response.data.name).toBe('Sprayer');
  });

  test('handles 404 for non-existent equipment', async () => {
    await expect(equipmentService.getById('999')).rejects.toThrow('Not found');
  });
});
```

### Redux Integration Testing
```javascript
// tests/integration/equipmentSlice.test.js
import { configureStore } from '@reduxjs/toolkit';
import equipmentReducer from '../../redux/reducers/equipmentReducer';
import { fetchEquipment, createEquipment } from '../../redux/actions/equipmentActions';
import { equipmentService } from '../../api/services/equipmentService';

jest.mock('../../api/services/equipmentService');

describe('equipment slice integration', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { equipment: equipmentReducer },
    });
    jest.clearAllMocks();
  });

  test('fetchEquipment dispatches correct actions', async () => {
    const mockEquipment = [{ id: '1', name: 'Tractor' }];
    equipmentService.getAll.mockResolvedValue({ data: mockEquipment });

    await store.dispatch(fetchEquipment());

    const actions = store.getState().equipment;
    expect(actions.loading).toBe(false);
    expect(actions.items).toEqual(mockEquipment);
    expect(actions.error).toBeNull();
  });

  test('fetchEquipment handles error', async () => {
    equipmentService.getAll.mockRejectedValue(new Error('Network error'));

    await store.dispatch(fetchEquipment());

    const actions = store.getState().equipment;
    expect(actions.loading).toBe(false);
    expect(actions.error).toBe('Network error');
    expect(actions.items).toEqual([]);
  });

  test('createEquipment adds to list', async () => {
    const newEquipment = { id: '2', name: 'Harvester' };
    equipmentService.create.mockResolvedValue({ data: newEquipment });

    // First fetch existing
    equipmentService.getAll.mockResolvedValue({ data: [{ id: '1', name: 'Tractor' }] });
    await store.dispatch(fetchEquipment());

    // Then create new
    await store.dispatch(createEquipment({ name: 'Harvester', category: 'harvester' }));

    const state = store.getState().equipment;
    expect(state.items).toHaveLength(2);
    expect(state.items.find(e => e.id === '2')).toEqual(newEquipment);
  });
});
```

---

## Component Testing

### React Testing Library Patterns
```javascript
// components/equipment/__tests__/EquipmentCard.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EquipmentCard from '../EquipmentCard';

const mockEquipment = {
  id: '1',
  name: 'John Deere Tractor',
  category: 'tractor',
  pricePerDay: 1500,
  image: 'https://example.com/tractor.jpg',
  owner: { name: 'Farmer John', rating: 4.5 },
};

const defaultProps = {
  equipment: mockEquipment,
  onSelect: jest.fn(),
  onFavorite: jest.fn(),
};

describe('EquipmentCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders equipment details correctly', () => {
    render(<EquipmentCard {...defaultProps} />);

    expect(screen.getByAltText('John Deere Tractor')).toBeInTheDocument();
    expect(screen.getByText('John Deere Tractor')).toBeInTheDocument();
    expect(screen.getByText('Tractor')).toBeInTheDocument();
    expect(screen.getByText('₹1,500.00/day')).toBeInTheDocument();
    expect(screen.getByText('Farmer John')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  test('calls onSelect when card is clicked', async () => {
    const user = userEvent.setup();
    render(<EquipmentCard {...defaultProps} />);

    await user.click(screen.getByRole('article'));

    expect(defaultProps.onSelect).toHaveBeenCalledWith(mockEquipment);
  });

  test('calls onFavorite when favorite button clicked', async () => {
    const user = userEvent.setup();
    render(<EquipmentCard {...defaultProps} />);

    const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
    await user.click(favoriteButton);

    expect(defaultProps.onFavorite).toHaveBeenCalledWith(mockEquipment.id, 'add');
  });

  test('shows favorite state when isFavorite=true', () => {
    render(<EquipmentCard {...defaultProps} isFavorite />);

    const favoriteButton = screen.getByRole('button', { name: /remove from favorites/i });
    expect(favoriteButton).toBeInTheDocument();
  });

  test('displays loading skeleton when loading', () => {
    render(<EquipmentCard {...defaultProps} loading />);

    expect(screen.getByTestId('equipment-card-skeleton')).toBeInTheDocument();
    expect(screen.queryByText('John Deere Tractor')).not.toBeInTheDocument();
  });

  test('is accessible - has proper ARIA labels', () => {
    render(<EquipmentCard {...defaultProps} />);

    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-labelledby', expect.stringContaining('equipment-'));
    
    const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
    expect(favoriteButton).toHaveAttribute('aria-pressed', 'false');
  });
});
```

### Complex Component with Redux
```javascript
// components/equipment/__tests__/EquipmentList.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import EquipmentList from '../EquipmentList';
import equipmentReducer from '../../redux/reducers/equipmentReducer';
import { fetchEquipment } from '../../redux/actions/equipmentActions';

const mockEquipment = [
  { id: '1', name: 'Tractor', category: 'tractor', pricePerDay: 1000 },
  { id: '2', name: 'Harvester', category: 'harvester', pricePerDay: 2000 },
];

const createTestStore = (preloadedState = {}) => 
  configureStore({
    reducer: { equipment: equipmentReducer },
    preloadedState: {
      equipment: {
        items: [],
        loading: false,
        error: null,
        ...preloadedState,
      },
    },
  });

const renderWithStore = (component, store) => 
  render(<Provider store={store}>{component}</Provider>);

describe('EquipmentList', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  test('displays loading state initially', () => {
    store = createTestStore({ loading: true });
    renderWithStore(<EquipmentList />, store);

    expect(screen.getByTestId('equipment-list-skeleton')).toBeInTheDocument();
  });

  test('displays equipment after fetch', async () => {
    // Mock the dispatch to simulate successful fetch
    store.dispatch = jest.fn().mockImplementation((action) => {
      if (action.type === 'equipment/FETCH_SUCCESS') {
        store.getState = () => ({
          equipment: { items: mockEquipment, loading: false, error: null }
        });
      }
      return action;
    });

    renderWithStore(<EquipmentList />, store);

    await waitFor(() => {
      expect(screen.getByText('Tractor')).toBeInTheDocument();
      expect(screen.getByText('Harvester')).toBeInTheDocument();
    });
  });

  test('filters equipment by search', async () => {
    store = createTestStore({ 
      items: mockEquipment, 
      loading: false 
    });

    renderWithStore(<EquipmentList />, store);

    const searchInput = screen.getByPlaceholderText(/search equipment/i);
    await userEvent.type(searchInput, 'tractor');

    expect(screen.getByText('Tractor')).toBeInTheDocument();
    expect(screen.queryByText('Harvester')).not.toBeInTheDocument();
  });

  test('shows empty state when no results', () => {
    store = createTestStore({ 
      items: [], 
      loading: false 
    });

    renderWithStore(<EquipmentList />, store);

    expect(screen.getByText(/no equipment found/i)).toBeInTheDocument();
  });

  test('displays error message on fetch failure', () => {
    store = createTestStore({ 
      loading: false, 
      error: 'Failed to load equipment' 
    });

    renderWithStore(<EquipmentList />, store);

    expect(screen.getByText('Failed to load equipment')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });
});
```

### Testing Custom Hooks with Redux
```javascript
// hooks/__tests__/useBooking.test.js
import { renderHook, act, waitFor } from '@testing-library/react';
import { useBooking } from '../useBooking';
import { bookingService } from '../../api/services/bookingService';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../redux/reducers/authReducer';

jest.mock('../../api/services/bookingService');

const createWrapper = () => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: { user: { id: 'user-1', role: 'farmer' }, isAuthenticated: true }
    }
  });
  return ({ children }) => <Provider store={store}>{children}</Provider>;
};

describe('useBooking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates booking successfully', async () => {
    const newBooking = { 
      id: 'booking-1', 
      equipmentId: 'equip-1', 
      status: 'pending' 
    };
    bookingService.create.mockResolvedValue({ data: newBooking });

    const { result } = renderHook(() => useBooking(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.createBooking({ equipmentId: 'equip-1', startDate: '2024-01-15', endDate: '2024-01-20' });
    });

    expect(result.current.loading).toBe(false);
    expect(bookingService.create).toHaveBeenCalledWith({
      equipmentId: 'equip-1',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      userId: 'user-1',
    });
  });

  test('handles booking creation error', async () => {
    bookingService.create.mockRejectedValue(new Error('Equipment not available'));

    const { result } = renderHook(() => useBooking(), { wrapper: createWrapper() });

    await act(async () => {
      try {
        await result.current.createBooking({ equipmentId: 'equip-1', startDate: '2024-01-15', endDate: '2024-01-20' });
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('Equipment not available');
  });
});
```

---

## End-to-End Testing

### Cypress Configuration
```javascript
// cypress.config.js
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    
    setupNodeEvents(on, config) {
      // Code coverage
      require('@cypress/code-coverage/task')(on, config);
      
      // Custom tasks
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        db: {
          seed: () => { /* seed test database */ },
          cleanup: () => { /* cleanup test database */ },
        },
      });
    },
  },
  
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
  
  retries: {
    runMode: 2,
    openMode: 0,
  },
  
  env: {
    apiUrl: 'http://localhost:8000/api',
    coverage: true,
  },
});
```

### Page Object Model
```javascript
// cypress/support/pageObjects/EquipmentListPage.js
class EquipmentListPage {
  // Selectors
  static selectors = {
    searchInput: '[data-cy=equipment-search]',
    categoryFilter: '[data-cy=category-filter]',
    priceRangeFilter: '[data-cy=price-range-filter]',
    equipmentGrid: '[data-cy=equipment-grid]',
    equipmentCard: '[data-cy=equipment-card]',
    loadMoreButton: '[data-cy=load-more]',
    loadingSkeleton: '[data-cy=equipment-skeleton]',
    emptyState: '[data-cy=empty-state]',
    errorMessage: '[data-cy=error-message]',
    retryButton: '[data-cy=retry-button]',
  };

  // Actions
  visit() {
    cy.visit('/equipment');
    return this;
  }

  search(query) {
    cy.get(this.selectors.searchInput).clear().type(query);
    return this;
  }

  filterByCategory(category) {
    cy.get(this.selectors.categoryFilter).select(category);
    return this;
  }

  setPriceRange(min, max) {
    cy.get(this.selectors.priceRangeFilter).invoke('val', [min, max]).trigger('change');
    return this;
  }

  // Assertions
  shouldShowEquipment(count) {
    cy.get(this.selectors.equipmentCard).should('have.length', count);
    return this;
  }

  shouldShowLoading() {
    cy.get(this.selectors.loadingSkeleton).should('be.visible');
    return this;
  }

  shouldShowEmptyState(message) {
    cy.get(this.selectors.emptyState).should('contain', message);
    return this;
  }

  shouldShowError(message) {
    cy.get(this.selectors.errorMessage).should('contain', message);
    return this;
  }

  clickEquipment(index = 0) {
    cy.get(this.selectors.equipmentCard).eq(index).click();
    return this;
  }

  loadMore() {
    cy.get(this.selectors.loadMoreButton).click();
    return this;
  }
}

export default EquipmentListPage;
```

### E2E Test Scenarios
```javascript
// cypress/e2e/equipment/equipment-flow.cy.js
import EquipmentListPage from '../../support/pageObjects/EquipmentListPage';
import EquipmentDetailPage from '../../support/pageObjects/EquipmentDetailPage';
import BookingPage from '../../support/pageObjects/BookingPage';

const equipmentList = new EquipmentListPage();
const equipmentDetail = new EquipmentDetailPage();
const bookingPage = new BookingPage();

describe('Equipment Booking Flow', () => {
  beforeEach(() => {
    // Login as farmer
    cy.login('farmer@test.com', 'password123');
    cy.intercept('GET', '/api/equipment*', { fixture: 'equipment-list.json' }).as('getEquipment');
  });

  it('should allow farmer to search and book equipment', () => {
    // Visit equipment list
    equipmentList.visit();
    cy.wait('@getEquipment');
    
    // Verify equipment loaded
    equipmentList.shouldShowEquipment(10);
    
    // Search for tractor
    equipmentList.search('tractor');
    cy.wait('@getEquipment');
    equipmentList.shouldShowEquipment(3);
    
    // Filter by category
    equipmentList.filterByCategory('tractor');
    cy.wait('@getEquipment');
    equipmentList.shouldShowEquipment(3);
    
    // Click on first equipment
    equipmentList.clickEquipment(0);
    
    // Verify detail page
    equipmentDetail.shouldShowEquipmentName('John Deere 5050D');
    equipmentDetail.shouldShowPrice('₹1,500/day');
    equipmentDetail.shouldShowAvailability(true);
    
    // Book equipment
    equipmentDetail.clickBookNow();
    
    // Fill booking form
    bookingPage.selectDates('2024-02-15', '2024-02-20');
    bookingPage.fillContactInfo('9876543210', 'farmer@test.com');
    bookingPage.submitBooking();
    
    // Verify booking confirmation
    bookingPage.shouldShowConfirmation('Booking request sent successfully');
    bookingPage.shouldShowBookingId();
  });

  it('should handle equipment not available', () => {
    cy.intercept('GET', '/api/equipment/1', { 
      fixture: 'equipment-unavailable.json' 
    }).as('getUnavailableEquipment');
    
    equipmentList.visit();
    cy.wait('@getEquipment');
    equipmentList.clickEquipment(0);
    cy.wait('@getUnavailableEquipment');
    
    equipmentDetail.shouldShowAvailability(false);
    equipmentDetail.shouldShowMessage('Equipment not available for selected dates');
    equipmentDetail.bookButtonShouldBeDisabled();
  });
});

describe('Equipment Owner Flow', () => {
  beforeEach(() => {
    cy.login('owner@test.com', 'password123');
  });

  it('should allow owner to add new equipment', () => {
    cy.visit('/owner/equipment/add');
    
    // Fill equipment form
    cy.get('[data-cy=equipment-name]').type('Mahindra Tractor 575');
    cy.get('[data-cy=equipment-category]').select('tractor');
    cy.get('[data-cy=equipment-price]').type('1200');
    cy.get('[data-cy=equipment-description]').type('Well maintained tractor');
    
    // Upload images
    cy.get('[data-cy=image-upload]').attachFile('tractor.jpg');
    
    // Submit
    cy.get('[data-cy=submit-equipment]').click();
    
    // Verify success
    cy.get('[data-cy=success-message]').should('contain', 'Equipment added successfully');
    cy.url().should('include', '/owner/equipment');
  });
});
```

### API Testing with Cypress
```javascript
// cypress/e2e/api/booking-api.cy.js
describe('Booking API', () => {
  beforeEach(() => {
    cy.login('farmer@test.com', 'password123');
  });

  it('should create booking via API', () => {
    cy.request({
      method: 'POST',
      url: '/api/bookings',
      body: {
        equipmentId: 'equip-1',
        startDate: '2024-02-15',
        endDate: '2024-02-20',
      },
    }).then((response) => {
      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.status).toBe('pending');
      expect(response.body.data.totalAmount).toBeGreaterThan(0);
    });
  });

  it('should reject booking for unavailable dates', () => {
    cy.request({
      method: 'POST',
      url: '/api/bookings',
      body: {
        equipmentId: 'equip-1',
        startDate: '2024-01-15', // Already booked
        endDate: '2024-01-20',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).toBe(409);
      expect(response.body.message).toContain('not available');
    });
  });

  it('should list user bookings', () => {
    cy.request('/api/bookings/my').then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      response.body.data.forEach(booking => {
        expect(booking).toHaveProperty('id');
        expect(booking).toHaveProperty('equipment');
        expect(booking).toHaveProperty('status');
      });
    });
  });
});
```

---

## API Testing

### Backend API Tests (Django)
```python
# backend/equipment/tests/test_views.py
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from equipment.models import Equipment, Category

User = get_user_model()

class EquipmentAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create users
        self.farmer = User.objects.create_user(
            username='farmer1',
            email='farmer@test.com',
            password='testpass123',
            role='farmer'
        )
        self.owner = User.objects.create_user(
            username='owner1',
            email='owner@test.com',
            password='testpass123',
            role='equipment_owner'
        )
        
        # Create category
        self.category = Category.objects.create(name='tractor', display_name='Tractor')
        
        # Create equipment
        self.equipment = Equipment.objects.create(
            name='John Deere 5050D',
            category=self.category,
            price_per_day=1500,
            description='Well maintained tractor',
            owner=self.owner,
            status='available'
        )
        
        # Authenticate
        self.client.force_authenticate(user=self.farmer)

    def test_list_equipment(self):
        url = reverse('equipment-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'John Deere 5050D')

    def test_filter_equipment_by_category(self):
        url = reverse('equipment-list')
        response = self.client.get(url, {'category': 'tractor'})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_search_equipment(self):
        url = reverse('equipment-list')
        response = self.client.get(url, {'search': 'john'})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_create_equipment_as_owner(self):
        self.client.force_authenticate(user=self.owner)
        url = reverse('equipment-list')
        data = {
            'name': 'Mahindra 575',
            'category': self.category.id,
            'price_per_day': 1200,
            'description': 'Good condition',
        }
        response = self.client.post(url, data)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Mahindra 575')
        self.assertEqual(response.data['owner'], self.owner.id)

    def test_create_equipment_as_farmer_forbidden(self):
        url = reverse('equipment-list')
        data = {'name': 'Test', 'category': self.category.id, 'price_per_day': 100}
        response = self.client.post(url, data)
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_booking_availability_check(self):
        # Create booking
        from booking.models import Booking
        from datetime import date, timedelta
        
        Booking.objects.create(
            equipment=self.equipment,
            farmer=self.farmer,
            start_date=date.today() + timedelta(days=5),
            end_date=date.today() + timedelta(days=10),
            status='confirmed'
        )
        
        # Check availability
        url = reverse('equipment-check-availability', kwargs={'pk': self.equipment.id})
        response = self.client.get(url, {
            'start_date': date.today() + timedelta(days=3),
            'end_date': date.today() + timedelta(days=7)
        })
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data['available'])

    def test_unauthorized_access(self):
        self.client.logout()
        url = reverse('equipment-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
```

---

## Performance Testing

### Load Testing with k6
```javascript
// tests/performance/load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const equipmentLoadTime = new Trend('equipment_load_time');
const bookingCreateTime = new Trend('booking_create_time');

export const options = {
  stages: [
    { duration: '2m', target: 10 },   // Ramp up
    { duration: '5m', target: 50 },   // Stay at 50 users
    { duration: '2m', target: 100 },  // Ramp to 100
    { duration: '5m', target: 100 },  // Stay at 100
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests < 500ms
    http_req_failed: ['rate<0.01'],   // Error rate < 1%
    errors: ['rate<0.05'],            // Custom error rate < 5%
    equipment_load_time: ['p(95)<1000'],
    booking_create_time: ['p(95)<2000'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://api.krishi-sadhan.com';
const AUTH_TOKEN = __ENV.AUTH_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${AUTH_TOKEN}`,
};

export default function () {
  // Test 1: Load equipment list
  const equipmentStart = new Date();
  const equipmentRes = http.get(`${BASE_URL}/equipment?limit=20`, { headers });
  equipmentLoadTime.add(new Date() - equipmentStart);
  
  check(equipmentRes, {
    'equipment list status 200': (r) => r.status === 200,
    'equipment list has data': (r) => r.json().data.length > 0,
  }) || errorRate.add(1);

  sleep(1);

  // Test 2: View equipment detail
  const equipment = equipmentRes.json().data[0];
  const detailRes = http.get(`${BASE_URL}/equipment/${equipment.id}`, { headers });
  
  check(detailRes, {
    'equipment detail status 200': (r) => r.status === 200,
  }) || errorRate.add(1);

  sleep(1);

  // Test 3: Create booking (10% of users)
  if (Math.random() < 0.1) {
    const bookingStart = new Date();
    const bookingRes = http.post(`${BASE_URL}/bookings`, JSON.stringify({
      equipmentId: equipment.id,
      startDate: '2024-03-15',
      endDate: '2024-03-20',
    }), { headers });
    bookingCreateTime.add(new Date() - bookingStart);
    
    check(bookingRes, {
      'booking created': (r) => r.status === 201,
    }) || errorRate.add(1);
  }

  sleep(2);
}

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    'summary.json': JSON.stringify(data),
    'summary.html': htmlReport(data),
  };
}
```

### Frontend Performance Testing
```javascript
// tests/performance/lighthouse.cy.js
import { lighthouse, prepareAudit } from 'cypress-lighthouse';

describe('Lighthouse Performance Audits', () => {
  beforeEach(() => {
    cy.visit('/');
    prepareAudit();
  });

  it('should pass performance budget on home page', () => {
    lighthouse({
      performance: 90,
      accessibility: 95,
      'best-practices': 90,
      seo: 85,
      pwa: 70,
    });
  });

  it('should pass performance budget on equipment list', () => {
    cy.visit('/equipment');
    prepareAudit();
    lighthouse({
      performance: 85,
      accessibility: 95,
    });
  });

  it('should pass performance budget on booking page', () => {
    cy.login('farmer@test.com', 'password123');
    cy.visit('/booking/equip-1');
    prepareAudit();
    lighthouse({
      performance: 80,
      accessibility: 95,
    });
  });
});
```

---

## Accessibility Testing

### Automated a11y Testing
```javascript
// tests/accessibility/a11y.test.js
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import EquipmentList from '../../components/equipment/EquipmentList';
import EquipmentCard from '../../components/equipment/EquipmentCard';
import BookingForm from '../../components/booking/BookingForm';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  test('EquipmentList has no a11y violations', async () => {
    const { container } = render(<EquipmentList />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('EquipmentCard has no a11y violations', async () => {
    const { container } = render(
      <EquipmentCard 
        equipment={{ id: '1', name: 'Tractor', pricePerDay: 1000 }}
        onSelect={jest.fn()}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('BookingForm has no a11y violations', async () => {
    const { container } = render(<BookingForm equipmentId="1" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Cypress a11y Testing
```javascript
// cypress/support/commands.js
import 'cypress-axe';

Cypress.Commands.add('checkA11y', (context, options) => {
  cy.injectAxe();
  cy.checkA11y(context, options, (violations) => {
    violations.forEach(violation => {
      const nodes = violation.nodes.map(node => node.html).join('\n');
      cy.log(`**${violation.id}**: ${violation.description}`);
      cy.log(`Impact: ${violation.impact}`);
      cy.log(`Nodes: ${nodes}`);
    });
  });
});

// cypress/e2e/accessibility/a11y.cy.js
describe('Accessibility E2E Tests', () => {
  const pages = [
    { path: '/', name: 'Home' },
    { path: '/equipment', name: 'Equipment List' },
    { path: '/equipment/1', name: 'Equipment Detail' },
    { path: '/login', name: 'Login' },
    { path: '/register', name: 'Register' },
    { path: '/profile', name: 'Profile' },
    { path: '/booking/1', name: 'Booking' },
  ];

  pages.forEach(page => {
    it(`should have no a11y violations on ${page.name}`, () => {
      cy.visit(page.path);
      cy.checkA11y();
    });
  });

  it('should have no a11y violations after search', () => {
    cy.visit('/equipment');
    cy.get('[data-cy=equipment-search]').type('tractor');
    cy.checkA11y();
  });

  it('should have no a11y violations in modal', () => {
    cy.visit('/equipment');
    cy.get('[data-cy=equipment-card]').first().click();
    cy.get('[data-cy=book-now]').click();
    cy.checkA11y('[role="dialog"]');
  });
});
```

---

## Test Organization & Structure

### Directory Structure
```
tests/
├── unit/
│   ├── utils/
│   │   ├── formatters.test.js
│   │   ├── validators.test.js
│   │   └── helpers.test.js
│   ├── hooks/
│   │   ├── useEquipment.test.js
│   │   ├── useAuth.test.js
│   │   └── useBooking.test.js
│   ├── redux/
│   │   ├── reducers/
│   │   │   ├── equipmentReducer.test.js
│   │   │   └── authReducer.test.js
│   │   ├── selectors/
│   │   │   └── equipmentSelectors.test.js
│   │   └── actions/
│   │       └── equipmentActions.test.js
│   └── components/
│       ├── common/
│       │   ├── Button.test.jsx
│       │   └── Input.test.jsx
│       └── equipment/
│           └── EquipmentCard.test.jsx
├── integration/
│   ├── api/
│   │   ├── equipmentApi.test.js
│   │   └── bookingApi.test.js
│   ├── redux/
│   │   └── equipmentSlice.test.js
│   └── components/
│       └── EquipmentList.test.jsx
├── e2e/
│   ├── equipment/
│   │   ├── equipment-flow.cy.js
│   │   └── equipment-owner.cy.js
│   ├── booking/
│   │   └── booking-flow.cy.js
│   ├── auth/
│   │   ├── login.cy.js
│   │   └── register.cy.js
│   └── api/
│       └── booking-api.cy.js
├── performance/
│   ├── load-test.js
│   └── lighthouse.cy.js
├── accessibility/
│   ├── a11y.test.js
│   └── a11y.cy.js
├── visual/
│   └── chromatic.test.js
├── fixtures/
│   ├── equipment-list.json
│   ├── equipment-detail.json
│   ├── equipment-unavailable.json
│   └── user-bookings.json
├── utils/
│   ├── testUtils.js
│   ├── mockData.js
│   └── renderWithProviders.jsx
└── setup/
    ├── jest.setup.js
    └── cypress.setup.js
```

### Test Utilities
```javascript
// tests/utils/renderWithProviders.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import equipmentReducer from '../../redux/reducers/equipmentReducer';
import authReducer from '../../redux/reducers/authReducer';
import bookingReducer from '../../redux/reducers/bookingReducer';
import theme from '../../styles/theme';

const createStore = (preloadedState = {}) => 
  configureStore({
    reducer: {
      equipment: equipmentReducer,
      auth: authReducer,
      booking: bookingReducer,
    },
    preloadedState,
  });

const AllProviders = ({ children, store, initialEntries }) => (
  <Provider store={store}>
    <BrowserRouter initialEntries={initialEntries}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

export const renderWithProviders = (ui, options = {}) => {
  const { 
    preloadedState = {}, 
    initialEntries = ['/'],
    ...renderOptions 
  } = options;
  
  const store = createStore(preloadedState);
  
  const wrapper = ({ children }) => (
    <AllProviders store={store} initialEntries={initialEntries}>
      {children}
    </AllProviders>
  );
  
  return { 
    ...render(ui, { wrapper, ...renderOptions }), 
    store 
  };
};

// Re-export everything from RTL
export * from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';
```

```javascript
// tests/utils/mockData.js
export const mockUser = {
  id: 'user-1',
  name: 'Test Farmer',
  email: 'farmer@test.com',
  phone: '9876543210',
  role: 'farmer',
  avatar: 'https://example.com/avatar.jpg',
};

export const mockOwner = {
  ...mockUser,
  id: 'owner-1',
  name: 'Test Owner',
  email: 'owner@test.com',
  role: 'equipment_owner',
};

export const mockEquipment = [
  {
    id: 'equip-1',
    name: 'John Deere 5050D',
    category: 'tractor',
    pricePerDay: 1500,
    description: 'Well maintained tractor with AC cabin',
    images: ['https://example.com/tractor1.jpg'],
    owner: mockOwner,
    status: 'available',
    specifications: {
      horsepower: 50,
      fuelType: 'diesel',
      transmission: 'manual',
    },
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'equip-2',
    name: 'Mahindra 575 DI',
    category: 'tractor',
    pricePerDay: 1200,
    description: 'Efficient tractor for small farms',
    images: ['https://example.com/tractor2.jpg'],
    owner: mockOwner,
    status: 'available',
    specifications: {
      horsepower: 45,
      fuelType: 'diesel',
      transmission: 'manual',
    },
    createdAt: '2024-01-20T10:00:00Z',
  },
];

export const mockBooking = {
  id: 'booking-1',
  equipment: mockEquipment[0],
  farmer: mockUser,
  startDate: '2024-02-15',
  endDate: '2024-02-20',
  status: 'confirmed',
  totalAmount: 8850, // 5 days * 1500 + 18% GST
  createdAt: '2024-01-25T10:00:00Z',
};

export const mockApiResponses = {
  equipmentList: { data: mockEquipment, total: 2 },
  equipmentDetail: { data: mockEquipment[0] },
  bookingCreate: { data: mockBooking },
  userBookings: { data: [mockBooking], total: 1 },
};
```

---

## CI/CD Integration

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '18'
  CYPRESS_VERSION: '13'

jobs:
  # Unit & Integration Tests
  unit-tests:
    name: Unit & Integration Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Run unit tests
        run: npm run test:unit -- --coverage --watchAll=false
      
      - name: Run integration tests
        run: npm run test:integration -- --watchAll=false
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: true

  # Component Tests
  component-tests:
    name: Component Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - name: Run component tests
        run: npm run test:component -- --watchAll=false

  # E2E Tests
  e2e-tests:
    name: E2E Tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: krishi_test
        ports: 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - name: Build application
        run: npm run build
      - name: Start application
        run: npm run start:ci &
      - name: Wait for application
        run: sleep 10 && curl -f http://localhost:3000
      - name: Run Cypress E2E
        uses: cypress-io/github-action@v6
        with:
          build: npm run build
          start: npm run start:ci
          wait-on: 'http://localhost:3000'
          wait-on-timeout: 120
          browser: chrome
        env:
          CYPRESS_BASE_URL: http://localhost:3000
          CYPRESS_API_URL: http://localhost:8000/api
      - name: Upload Cypress artifacts
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: cypress-screenshots
          path: cypress/screenshots
      - name: Upload Cypress videos
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: cypress-videos
          path: cypress/videos

  # Performance Tests
  performance-tests:
    name: Performance Tests
    runs-on: ubuntu-latest
    if: github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            https://staging.krishi-sadhan.com
            https://staging.krishi-sadhan.com/equipment
          budgetPath: ./performance-budget.json
          uploadArtifacts: true

  # Accessibility Tests
  accessibility-tests:
    name: Accessibility Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - name: Run a11y tests
        run: npm run test:a11y -- --watchAll=false

  # Visual Regression Tests
  visual-tests:
    name: Visual Regression Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - name: Run Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          buildScriptName: build
          exitOnceUploaded: true

  # Summary
  test-summary:
    name: Test Summary
    needs: [unit-tests, component-tests, e2e-tests, accessibility-tests]
    runs-on: ubuntu-latest
    if: always()
    steps:
      - name: Check test results
        run: |
          if [ "${{ needs.unit-tests.result }}" != "success" ] || \
             [ "${{ needs.component-tests.result }}" != "success" ] || \
             [ "${{ needs.e2e-tests.result }}" != "success" ] || \
             [ "${{ needs.accessibility-tests.result }}" != "success" ]; then
            echo "Some tests failed"
            exit 1
          fi
          echo "All tests passed!"
```

---

## Testing Checklist

### Pre-Commit Checklist
- [ ] **Unit Tests**
  - [ ] All new functions have tests
  - [ ] Edge cases covered (empty, null, boundary values)
  - [ ] Error paths tested
  - [ ] Tests are fast (< 10ms each)
  - [ ] No flaky tests

- [ ] **Component Tests**
  - [ ] Component renders without crashing
  - [ ] Props validation tested
  - [ ] User interactions tested (click, input, keyboard)
  - [ ] Accessibility tested (axe)
  - [ ] Loading/error/empty states tested

- [ ] **Hook Tests**
  - [ ] State changes tested
  - [ ] Effect cleanup tested
  - [ ] Error handling tested
  - [ ] Return values tested

### PR Validation Checklist
- [ ] **Coverage Thresholds Met**
  - [ ] Statements > 80%
  - [ ] Branches > 75%
  - [ ] Functions > 80%
  - [ ] Lines > 80%

- [ ] **Integration Tests Pass**
  - [ ] API contracts validated
  - [ ] Redux flow tested
  - [ ] Service integrations work

- [ ] **E2E Tests Pass**
  - [ ] Critical user journeys work
  - [ ] Cross-browser tested (Chrome, Firefox)
  - [ ] Mobile viewport tested

- [ ] **Performance Budgets Met**
  - [ ] LCP < 2.5s
  - [ ] Bundle size within limits
  - [ ] No performance regressions

- [ ] **Accessibility Standards Met**
  - [ ] WCAG 2.1 AA compliance
  - [ ] No axe violations
  - [ ] Keyboard navigation works
  - [ ] Screen reader compatible

### Release Checklist
- [ ] **Full Test Suite Passes**
- [ ] **Visual Regression Tests Pass**
- [ ] **Load Testing Passes**
- [ ] **Security Scan Passes**
- [ ] **Smoke Tests on Staging Pass**
- [ ] **Rollback Plan Tested**

---

## Quick Reference: Testing Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Test behavior, not implementation | Test internal state/private methods |
| Use descriptive test names | Name tests "test1", "should work" |
| Test one thing per test | Multiple assertions for different things |
| Use `data-cy` attributes for E2E | Use CSS classes/IDs for selection |
| Mock at the boundary (API) | Mock internal functions |
| Test error states | Only test happy path |
| Keep tests independent | Share state between tests |
| Use factories for test data | Hardcode test data everywhere |
| Run tests in CI on every PR | Run tests only locally |
| Measure and enforce coverage | Ignore coverage reports |

---

## Resources
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress Documentation](https://docs.cypress.io/)
- [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
- [MSW - Mock Service Worker](https://mswjs.io/)
- [axe-core](https://github.com/dequelabs/axe-core)
- [k6 Load Testing](https://k6.io/docs/)
- [Lighthouse CI](https://github.com/treosh/lighthouse-ci-action)

---

*Last Updated: November 2026 | Team Gryffindor - SIH 2022*