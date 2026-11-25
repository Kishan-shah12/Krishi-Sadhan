# Efficiency & Performance Guidelines

## Overview
This document outlines the performance standards, optimization strategies, and efficiency best practices for the **Krishi Sadhan**. These guidelines ensure fast, responsive, and resource-efficient application delivery for farmers with varying network conditions.

---

## Table of Contents
1. [Performance Principles](#performance-principles)
2. [Core Web Vitals](#core-web-vitals)
3. [Bundle Optimization](#bundle-optimization)
4. [Runtime Performance](#runtime-performance)
5. [Network Optimization](#network-optimization)
6. [Caching Strategy](#caching-strategy)
7. [Database & API Efficiency](#database--api-efficiency)
8. [Mobile & Low-End Device Optimization](#mobile--low-end-device-optimization)
9. [Monitoring & Measurement](#monitoring--measurement)
10. [Performance Checklist](#performance-checklist)

---

## Performance Principles

### Core Philosophy
```
┌─────────────────────────────────────────────────────────────────┐
│                    PERFORMANCE PYRAMID                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│    🎯 USER PERCEIVED PERFORMANCE                                │
│    ┌─────────────────────────────────────┐                     │
│    │  Load Fast → Respond Fast → Run Fast │                     │
│    └─────────────────────────────────────┘                     │
│                    │                                            │
│    ┌───────────────┼───────────────┐                           │
│    ▼               ▼               ▼                           │
│  NETWORK         RENDERING       JAVASCRIPT                    │
│  OPTIMIZATION    OPTIMIZATION    OPTIMIZATION                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Target Metrics (Core Web Vitals)
| Metric | Good | Needs Improvement | Poor | Our Target |
|--------|------|-------------------|------|------------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | 2.5s - 4s | > 4s | **< 2.0s** |
| **FID** (First Input Delay) | ≤ 100ms | 100ms - 300ms | > 300ms | **< 50ms** |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 0.1 - 0.25 | > 0.25 | **< 0.05** |
| **FCP** (First Contentful Paint) | ≤ 1.8s | 1.8s - 3s | > 3s | **< 1.5s** |
| **TTI** (Time to Interactive) | ≤ 3.8s | 3.8s - 7.3s | > 7.3s | **< 3.0s** |
| **TBT** (Total Blocking Time) | ≤ 200ms | 200ms - 600ms | > 600ms | **< 100ms** |

---

## Bundle Optimization

### Code Splitting Strategy
```javascript
// webpack.config.js / react-scripts customization
// Route-based splitting (automatic with React.lazy)
const routes = {
  // High priority - load immediately
  '/': { chunk: 'home', priority: 'high' },
  '/equipment': { chunk: 'equipment-list', priority: 'high' },
  
  // Medium priority - prefetch on hover
  '/equipment/:id': { chunk: 'equipment-detail', priority: 'medium' },
  '/booking/:id': { chunk: 'booking', priority: 'medium' },
  
  // Low priority - load on demand
  '/profile': { chunk: 'profile', priority: 'low' },
  '/settings': { chunk: 'settings', priority: 'low' },
  '/support': { chunk: 'support', priority: 'low' },
};

// Component-based splitting for heavy components
const HeavyComponents = {
  ChatWidget: () => import('./components/chat/ChatWidget'),
  MapView: () => import('./components/map/MapView'),
  AnalyticsDashboard: () => import('./components/analytics/AnalyticsDashboard'),
  ImageCropper: () => import('./components/common/ImageCropper'),
};
```

### Bundle Analysis & Optimization
```bash
# Analyze bundle size
npm run build -- --stats
npx webpack-bundle-analyzer build/bundle-stats.json

# Key metrics to track
# - Total JS bundle: < 200KB gzipped
# - CSS bundle: < 50KB gzipped
# - Largest chunk: < 100KB gzipped
# - Number of requests: < 30 for initial load
```

### Tree Shaking & Dead Code Elimination
```javascript
// ✅ Good: Named imports enable tree shaking
import { debounce, throttle } from 'lodash-es';
import { format, parseISO } from 'date-fns';
import { Button, Input } from '@mui/material';

// ❌ Bad: Default imports prevent tree shaking
import _ from 'lodash';
import * as dateFns from 'date-fns';
import MaterialUI from '@mui/material';

// ✅ Good: Side-effect free imports
import 'date-fns/locale/en-US';

// ❌ Bad: Side effects prevent tree shaking
import 'moment'; // Mutates global Date.prototype
```

### Dependency Optimization
```json
// package.json - Optimize dependencies
{
  "dependencies": {
    // ✅ Lightweight alternatives
    "date-fns": "^2.28.0",           // vs moment.js (67KB → 12KB)
    "lodash-es": "^4.17.21",         // vs lodash (71KB → 24KB tree-shaken)
    "axios": "^0.26.0",              // vs fetch + polyfills
    "react-window": "^1.8.7",        // For virtualized lists
    
    // ⚠️ Heavy - consider alternatives
    // "chart.js": "^3.7.1",          // 60KB → consider uPlot (15KB)
    // "react-chartjs-2": "^4.0.1",
    
    // 🔄 Replace with native
    // "classnames": "^2.3.1",        // → use template literals
    // "prop-types": "^15.8.1",       // → TypeScript or JSDoc
  }
}
```

### Dynamic Imports with Prefetching
```jsx
// hooks/usePrefetch.js
import { useCallback, useEffect } from 'react';

export const usePrefetch = () => {
  const prefetchRoute = useCallback((routePath) => {
    // Prefetch on hover/focus
    const link = document.querySelector(`a[href="${routePath}"]`);
    if (link) {
      link.addEventListener('mouseenter', () => {
        import(`../pages/${routePath}Page`).catch(() => {});
      }, { once: true });
    }
  }, []);

  const prefetchOnIdle = useCallback((routes) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        routes.forEach(route => {
          import(`../pages/${route}Page`).catch(() => {});
        });
      });
    } else {
      setTimeout(() => {
        routes.forEach(route => {
          import(`../pages/${route}Page`).catch(() => {});
        });
      }, 2000);
    }
  }, []);

  return { prefetchRoute, prefetchOnIdle };
};

// Usage in navigation
const Navigation = () => {
  const { prefetchRoute, prefetchOnIdle } = usePrefetch();
  
  useEffect(() => {
    // Prefetch likely next pages after initial load
    prefetchOnIdle(['equipment-detail', 'booking', 'profile']);
  }, [prefetchOnIdle]);

  return (
    <nav>
      <Link 
        to="/equipment" 
        onMouseEnter={() => prefetchRoute('/equipment')}
      >
        Equipment
      </Link>
    </nav>
  );
};
```

---

## Runtime Performance

### React Rendering Optimization
```jsx
// ✅ Good: Memoize components to prevent unnecessary re-renders
const EquipmentCard = React.memo(({ equipment, onSelect, isFavorite }) => {
  return (
    <article className="equipment-card">
      <EquipmentImage src={equipment.image} alt={equipment.name} />
      <div className="card-content">
        <h3>{equipment.name}</h3>
        <CategoryBadge category={equipment.category} />
        <PriceDisplay price={equipment.pricePerDay} />
        <FavoriteButton 
          isFavorite={isFavorite} 
          onToggle={() => onSelect(equipment.id, 'favorite')} 
        />
      </div>
    </article>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for complex props
  return (
    prevProps.equipment.id === nextProps.equipment.id &&
    prevProps.equipment.pricePerDay === nextProps.equipment.pricePerDay &&
    prevProps.isFavorite === nextProps.isFavorite
  );
});

// ✅ Good: Use useMemo for expensive computations
const EquipmentList = ({ equipment, filters, sortBy }) => {
  const processedEquipment = useMemo(() => {
    return equipment
      .filter(item => {
        if (filters.category && item.category !== filters.category) return false;
        if (filters.maxPrice && item.pricePerDay > filters.maxPrice) return false;
        if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc': return a.pricePerDay - b.pricePerDay;
          case 'price-desc': return b.pricePerDay - a.pricePerDay;
          case 'name': return a.name.localeCompare(b.name);
          case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
          default: return 0;
        }
      });
  }, [equipment, filters, sortBy]);

  // ✅ Good: Stable callbacks with useCallback
  const handleBook = useCallback((equipmentId) => {
    dispatch(createBooking({ equipmentId }));
  }, [dispatch]);

  const handleFavorite = useCallback((equipmentId, action) => {
    dispatch(toggleFavorite({ equipmentId, action }));
  }, [dispatch]);

  return (
    <VirtualizedList
      items={processedEquipment}
      renderItem={({ item }) => (
        <EquipmentCard
          key={item.id}
          equipment={item}
          onSelect={handleBook}
          isFavorite={userFavorites.includes(item.id)}
        />
      )}
    />
  );
};
```

### State Management Optimization
```javascript
// redux/selectors/optimizedSelectors.js
import { createSelector } from 'reselect';

// ❌ Bad: Creates new object every time
export const selectEquipmentData = (state) => ({
  items: state.equipment.items,
  loading: state.equipment.loading,
  error: state.equipment.error,
});

// ✅ Good: Memoized selectors return stable references
export const selectEquipmentItems = (state) => state.equipment.items;
export const selectEquipmentLoading = (state) => state.equipment.loading;
export const selectEquipmentError = (state) => state.equipment.error;

// ✅ Good: Composed selectors for derived data
export const selectFilteredEquipment = createSelector(
  [selectEquipmentItems, selectFilters, selectSort],
  (items, filters, sort) => {
    // Expensive filtering/sorting only runs when inputs change
    return items.filter(/* ... */).sort(/* ... */);
  }
);

export const selectEquipmentById = createSelector(
  [selectEquipmentItems, (state, id) => id],
  (items, id) => items.find(item => item.id === id)
);

// ✅ Good: Aggregated selectors for dashboard
export const selectDashboardStats = createSelector(
  [selectEquipmentItems, selectBookings, selectUser],
  (equipment, bookings, user) => ({
    totalEquipment: equipment.length,
    activeBookings: bookings.filter(b => b.status === 'active').length,
    totalEarnings: bookings
      .filter(b => b.ownerId === user.id && b.status === 'completed')
      .reduce((sum, b) => sum + b.totalAmount, 0),
    utilizationRate: calculateUtilization(equipment, bookings),
  })
);
```

### Virtualized Lists for Large Data
```jsx
// components/common/VirtualizedList.jsx
import { FixedSizeList as List } from 'react-window';
import { useMemo } from 'react';
import PropTypes from 'prop-types';

const VirtualizedList = ({ 
  items, 
  renderItem, 
  itemHeight = 200, 
  windowHeight = 600,
  overscanCount = 5 
}) => {
  // Memoize row renderer to prevent recreation
  const Row = useMemo(() => ({ index, style }) => (
    <div style={style}>
      {renderItem(items[index], index)}
    </div>
  ), [items, renderItem]);

  if (!items.length) {
    return <EmptyState message="No items found" />;
  }

  return (
    <div className="virtualized-list" style={{ height: windowHeight }}>
      <List
        height={windowHeight}
        itemCount={items.length}
        itemSize={itemHeight}
        overscanCount={overscanCount}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

VirtualizedList.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  itemHeight: PropTypes.number,
  windowHeight: PropTypes.number,
  overscanCount: PropTypes.number,
};

export default VirtualizedList;
```

### Image Optimization
```jsx
// components/common/OptimizedImage.jsx
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  placeholder = 'blur',
  className = '',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '100px', threshold: 0.1 }
    );
    
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  // Generate blur placeholder
  const blurDataUrl = useMemo(() => {
    if (!src) return '';
    // In production, generate this at build time
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Cfilter id='b'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23b)' fill='%23e5e7eb'/%3E%3C/svg%3E`;
  }, [src, width, height]);

  if (hasError) {
    return (
      <div className={`image-error ${className}`} style={{ width, height }}>
        <ImageFallback alt={alt} />
      </div>
    );
  }

  return (
    <div className={`image-container ${className}`} style={{ width, height }}>
      {!isLoaded && placeholder === 'blur' && (
        <img
          src={blurDataUrl}
          alt=""
          className="image-blur"
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(20px)', transform: 'scale(1.1)' }}
        />
      )}
      
      <img
        ref={imgRef}
        src={priority ? src : undefined}
        data-src={priority ? undefined : src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`image-main ${isLoaded ? 'loaded' : ''}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        {...props}
      />
    </div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  priority: PropTypes.bool,
  placeholder: PropTypes.oneOf(['blur', 'color', 'none']),
  className: PropTypes.string,
};

export default OptimizedImage;
```

---

## Network Optimization

### API Request Optimization
```javascript
// api/optimizedClient.js
import axios from 'axios';

class OptimizedApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    // Request deduplication cache
    this.pendingRequests = new Map();
    
    // Response cache with TTL
    this.responseCache = new Map();
    this.cacheTTL = 5 * 60 * 1000; // 5 minutes
  }

  // Deduplicate simultaneous identical requests
  async deduplicate(key, requestFn) {
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }
    
    const promise = requestFn().finally(() => {
      this.pendingRequests.delete(key);
    });
    
    this.pendingRequests.set(key, promise);
    return promise;
  }

  // Cache GET requests
  async cachedGet(url, params = {}, options = {}) {
    const cacheKey = `${url}?${new URLSearchParams(params).toString()}`;
    const cached = this.responseCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTTL && !options.forceRefresh) {
      return cached.data;
    }
    
    const response = await this.deduplicate(cacheKey, () => 
      this.client.get(url, { params })
    );
    
    this.responseCache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now(),
    });
    
    return response.data;
  }

  // Batch multiple requests
  async batch(requests) {
    // Combine into single request if backend supports it
    if (requests.length > 1) {
      return this.client.post('/batch', { requests });
    }
    return this.client(requests[0]);
  }

  // Prefetch data for next likely actions
  prefetch(url, params) {
    const cacheKey = `${url}?${new URLSearchParams(params).toString()}`;
    if (!this.responseCache.has(cacheKey)) {
      this.client.get(url, { params }).then(response => {
        this.responseCache.set(cacheKey, {
          data: response.data,
          timestamp: Date.now(),
        });
      }).catch(() => {}); // Silently fail
    }
  }

  // Clear cache for mutations
  invalidateCache(pattern) {
    for (const key of this.responseCache.keys()) {
      if (key.includes(pattern)) {
        this.responseCache.delete(key);
      }
    }
  }
}

export const api = new OptimizedApiClient();
```

### Request Prioritization
```javascript
// utils/requestPriority.js
export const RequestPriority = {
  CRITICAL: 'critical',    // User-blocking (auth, payments)
  HIGH: 'high',            // Primary content (equipment list, booking)
  NORMAL: 'normal',        // Secondary content (reviews, recommendations)
  LOW: 'low',              // Background (analytics, prefetch)
  IDLE: 'idle',            // Non-essential (logging, telemetry)
};

class PriorityQueue {
  constructor() {
    this.queues = {
      [RequestPriority.CRITICAL]: [],
      [RequestPriority.HIGH]: [],
      [RequestPriority.NORMAL]: [],
      [RequestPriority.LOW]: [],
      [RequestPriority.IDLE]: [],
    };
    this.processing = false;
    this.maxConcurrent = 6; // Browser limit
    this.activeCount = 0;
  }

  enqueue(request, priority = RequestPriority.NORMAL) {
    return new Promise((resolve, reject) => {
      this.queues[priority].push({ request, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.processing || this.activeCount >= this.maxConcurrent) return;
    
    this.processing = true;
    
    // Process in priority order
    const priorities = [
      RequestPriority.CRITICAL,
      RequestPriority.HIGH,
      RequestPriority.NORMAL,
      RequestPriority.LOW,
      RequestPriority.IDLE,
    ];
    
    for (const priority of priorities) {
      while (this.queues[priority].length && this.activeCount < this.maxConcurrent) {
        const { request, resolve, reject } = this.queues[priority].shift();
        this.activeCount++;
        
        try {
          const result = await request();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.activeCount--;
        }
      }
    }
    
    this.processing = false;
    
    // Continue processing if more requests
    if (this.hasPending()) {
      setTimeout(() => this.process(), 0);
    }
  }

  hasPending() {
    return Object.values(this.queues).some(q => q.length > 0);
  }
}

export const requestQueue = new PriorityQueue();

// Usage
const fetchEquipment = (params) => 
  requestQueue.enqueue(
    () => api.get('/equipment', { params }),
    RequestPriority.HIGH
  );

const fetchAnalytics = () => 
  requestQueue.enqueue(
    () => api.get('/analytics'),
    RequestPriority.IDLE
  );
```

---

## Caching Strategy

### Multi-Layer Caching Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                    CACHING LAYERS                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  BROWSER CACHE (HTTP Headers)                                   │
│  ├─ Static Assets: Cache-Control: public, max-age=31536000, immutable │
│  ├─ API Responses: Cache-Control: public, max-age=300, stale-while-revalidate=60 │
│  └─ HTML: Cache-Control: no-cache, must-revalidate              │
│                                                                 │
│  SERVICE WORKER (Workbox)                                       │
│  ├─ Precache: App shell, critical CSS/JS                        │
│  ├─ Runtime: API responses, images, fonts                       │
│  └─ Strategies: NetworkFirst, CacheFirst, StaleWhileRevalidate  │
│                                                                 │
│  APPLICATION CACHE (In-Memory)                                  │
│  ├─ Redux Store: Normalized entities, derived data              │
│  ├─ React Query / SWR: Server state with deduplication          │
│  └─ Custom: Request deduplication, optimistic updates           │
│                                                                 │
│  BACKEND CACHE (Redis/CDN)                                      │
│  ├─ CDN: Static assets, images, fonts                           │
│  ├─ Redis: API responses, sessions, rate limits                 │
│  └─ Database: Query result cache, materialized views            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Service Worker Configuration
```javascript
// public/sw.js - Workbox configuration
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// Precache manifest (auto-generated by workbox-webpack-plugin)
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// Navigation requests - Network first with offline fallback
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 }),
    ],
  })
);

// API requests - Stale while revalidate
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new StaleWhileRevalidate({
    cacheName: 'api-responses',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 5 * 60 }),
    ],
  })
);

// Images - Cache first
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 }),
    ],
  })
);

// Fonts - Cache first with long expiration
registerRoute(
  ({ url }) => url.pathname.match(/\.(woff|woff2|ttf|otf)$/),
  new CacheFirst({
    cacheName: 'fonts',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 20, maxAgeSeconds: 365 * 24 * 60 * 60 }),
    ],
  })
);

// Offline fallback
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
```

### HTTP Cache Headers (Backend)
```nginx
# nginx.conf - Cache headers
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Vary "Accept-Encoding";
    access_log off;
}

location /api/ {
    # Dynamic API responses - short cache with revalidation
    add_header Cache-Control "public, max-age=300, stale-while-revalidate=60, stale-if-error=86400";
    add_header Vary "Authorization, Accept-Encoding";
    
    proxy_pass http://backend;
    proxy_cache api_cache;
    proxy_cache_valid 200 5m;
    proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
    proxy_cache_lock on;
}

location /api/auth/ {
    # Auth endpoints - no caching
    add_header Cache-Control "no-store, private, must-revalidate";
    proxy_pass http://backend;
}
```

---

## Database & API Efficiency

### Query Optimization
```python
# backend/equipment/queries.py
from django.db.models import Prefetch, Count, Q, Avg
from django.core.cache import cache

class EquipmentQuerySet(models.QuerySet):
    def with_annotations(self):
        """Optimize with annotations to avoid N+1 queries"""
        return self.annotate(
            booking_count=Count('bookings', filter=Q(bookings__status='completed')),
            avg_rating=Avg('reviews__rating'),
            owner_name=F('owner__name'),
            owner_rating=F('owner__rating'),
        )
    
    def available_between(self, start_date, end_date):
        """Find equipment available in date range"""
        return self.exclude(
            bookings__status__in=['confirmed', 'active'],
            bookings__start_date__lt=end_date,
            bookings__end_date__gt=start_date,
        )
    
    def with_owner_prefetch(self):
        """Prefetch owner data to avoid N+1"""
        return self.select_related('owner').prefetch_related(
            Prefetch('images', queryset=EquipmentImage.objects.order_by('order')),
            Prefetch('reviews', queryset=Review.objects.select_related('user').order_by('-created_at')[:5]),
        )

# Usage in views
class EquipmentListView(ListAPIView):
    def get_queryset(self):
        queryset = Equipment.objects.with_annotations().with_owner_prefetch()
        
        # Apply filters
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        
        # Date availability
        start = self.request.query_params.get('start_date')
        end = self.request.query_params.get('end_date')
        if start and end:
            queryset = queryset.available_between(start, end)
        
        return queryset
```

### Pagination & Cursor-Based Loading
```javascript
// api/pagination.js
export const pagination = {
  // Cursor-based pagination (better for large datasets)
  cursor: {
    encode: (cursor) => btoa(JSON.stringify(cursor)),
    decode: (encoded) => JSON.parse(atob(encoded)),
    
    getNextCursor: (items, limit) => {
      if (items.length < limit) return null;
      const lastItem = items[items.length - 1];
      return pagination.cursor.encode({
        id: lastItem.id,
        createdAt: lastItem.createdAt,
      });
    },
  },
  
  // Offset-based (for small datasets)
  offset: {
    getParams: (page, limit) => ({
      offset: (page - 1) * limit,
      limit,
    }),
    
    getNextPage: (currentPage, hasMore) => 
      hasMore ? currentPage + 1 : null,
  },
  
  // Infinite scroll helper
  infinite: {
    createLoader: (fetchFn, options = {}) => {
      let cursor = null;
      let loading = false;
      let hasMore = true;
      
      return {
        loadMore: async () => {
          if (loading || !hasMore) return { items: [], hasMore: false };
          
          loading = true;
          try {
            const { items, nextCursor } = await fetchFn({ 
              cursor, 
              limit: options.limit || 20 
            });
            
            cursor = nextCursor;
            hasMore = !!nextCursor;
            
            return { items, hasMore };
          } finally {
            loading = false;
          }
        },
        
        reset: () => {
          cursor = null;
          hasMore = true;
        },
      };
    },
  },
};

// Usage in component
const useInfiniteEquipment = (filters) => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const loader = useMemo(() => 
    pagination.infinite.createLoader(
      (params) => api.get('/equipment', { params: { ...filters, ...params } })
    ), [filters]
  );
  
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    
    try {
      const { items, hasMore: more } = await loader.loadMore();
      setEquipment(prev => [...prev, ...items]);
      setHasMore(more);
    } finally {
      setLoading(false);
    }
  }, [loader, loading, hasMore]);
  
  return { equipment, loading, hasMore, loadMore };
};
```

---

## Mobile & Low-End Device Optimization

### Adaptive Loading
```javascript
// utils/adaptiveLoading.js
export const adaptiveLoading = {
  // Detect device capabilities
  getDeviceCapabilities: () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const memory = navigator.deviceMemory || 4; // GB
    const cores = navigator.hardwareConcurrency || 4;
    
    return {
      // Network
      effectiveType: connection?.effectiveType || '4g', // 'slow-2g', '2g', '3g', '4g'
      downlink: connection?.downlink || 10, // Mbps
      rtt: connection?.rtt || 50, // ms
      saveData: connection?.saveData || false,
      
      // Device
      memory, // GB
      cores, // CPU cores
      isLowEnd: memory <= 2 || cores <= 2,
      isMobile: /Mobi|Android/i.test(navigator.userAgent),
    };
  },
  
  // Adapt quality based on capabilities
  getQualitySettings: (capabilities) => {
    if (capabilities.saveData || capabilities.effectiveType === 'slow-2g') {
      return {
        imageQuality: 'low',
        enableAnimations: false,
        enableVirtualization: true,
        prefetchEnabled: false,
        batchRequests: true,
        cacheAggressively: true,
      };
    }
    
    if (capabilities.effectiveType === '2g' || capabilities.isLowEnd) {
      return {
        imageQuality: 'medium',
        enableAnimations: false,
        enableVirtualization: true,
        prefetchEnabled: false,
        batchRequests: true,
        cacheAggressively: true,
      };
    }
    
    if (capabilities.effectiveType === '3g') {
      return {
        imageQuality: 'high',
        enableAnimations: true,
        enableVirtualization: true,
        prefetchEnabled: true,
        batchRequests: false,
        cacheAggressively: false,
      };
    }
    
    // 4g+ and capable devices
    return {
      imageQuality: 'original',
      enableAnimations: true,
      enableVirtualization: false,
      prefetchEnabled: true,
      batchRequests: false,
      cacheAggressively: false,
    };
  },
  
  // Apply settings globally
  applySettings: (settings) => {
    // Set CSS custom properties for image quality
    document.documentElement.style.setProperty(
      '--image-quality', 
      settings.imageQuality
    );
    
    // Disable animations globally
    if (!settings.enableAnimations) {
      document.documentElement.classList.add('reduce-motion');
    }
    
    // Store for components to use
    window.__ADAPTIVE_SETTINGS__ = settings;
  },
};

// Initialize on app start
const capabilities = adaptiveLoading.getDeviceCapabilities();
const settings = adaptiveLoading.getQualitySettings(capabilities);
adaptiveLoading.applySettings(settings);

// Listen for connection changes
if (navigator.connection) {
  navigator.connection.addEventListener('change', () => {
    const newCaps = adaptiveLoading.getDeviceCapabilities();
    const newSettings = adaptiveLoading.getQualitySettings(newCaps);
    adaptiveLoading.applySettings(newSettings);
    
    // Notify components of change
    window.dispatchEvent(new CustomEvent('adaptive-settings-change', { 
      detail: newSettings 
    }));
  });
}
```

### Reduced Motion & Data Saver
```css
/* styles/adaptive.css */
@media (prefers-reduced-motion: reduce) {
  .reduce-motion *,
  .reduce-motion *::before,
  .reduce-motion *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Low quality images */
.reduce-quality img[data-src] {
  filter: blur(10px);
  transform: scale(1.05);
}

/* Data saver mode */
@media (prefers-reduced-data: reduce) {
  .data-saver .high-res-image {
    display: none;
  }
  
  .data-saver .low-res-image {
    display: block;
  }
  
  .data-saver .video-background {
    display: none;
  }
}
```

### Progressive Enhancement
```jsx
// components/common/ProgressiveImage.jsx
import React, { useState, useEffect } from 'react';

const ProgressiveImage = ({ 
  src, 
  srcSet, 
  alt, 
  width, 
  height,
  priority = false 
}) => {
  const [currentSrc, setCurrentSrc] = useState(null);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Start with lowest quality
    const qualities = ['low', 'medium', 'high', 'original'];
    const settings = window.__ADAPTIVE_SETTINGS__ || { imageQuality: 'high' };
    const targetQuality = settings.imageQuality;
    const targetIndex = qualities.indexOf(targetQuality);
    
    // Load progressively
    let currentIndex = priority ? targetIndex : 0;
    
    const loadNext = () => {
      if (currentIndex > targetIndex) return;
      
      const quality = qualities[currentIndex];
      const qualitySrc = srcSet?.[quality] || src;
      
      const img = new Image();
      img.onload = () => {
        setCurrentSrc(qualitySrc);
        currentIndex++;
        // Small delay to show progression
        setTimeout(loadNext, currentIndex <= targetIndex ? 100 : 0);
      };
      img.src = qualitySrc;
    };
    
    loadNext();
  }, [src, srcSet, priority]);
  
  return (
    <div className="progressive-image" style={{ width, height }}>
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          onLoad={() => setLoaded(true)}
        />
      )}
      {!currentSrc && (
        <div className="image-placeholder" style={{ width, height }}>
          <SkeletonLoader />
        </div>
      )}
    </div>
  );
};
```

---

## Monitoring & Measurement

### Performance Monitoring Setup
```javascript
// utils/performanceMonitoring.js
export const performanceMonitoring = {
  // Initialize web vitals tracking
  init: () => {
    if (typeof window === 'undefined') return;
    
    // Track Core Web Vitals
    import('web-vitals').then(({ 
      onCLS, onFID, onFCP, onLCP, onTTFB, onINP 
    }) => {
      onCLS(performanceMonitoring.sendToAnalytics);
      onFID(performanceMonitoring.sendToAnalytics);
      onFCP(performanceMonitoring.sendToAnalytics);
      onLCP(performanceMonitoring.sendToAnalytics);
      onTTFB(performanceMonitoring.sendToAnalytics);
      onINP(performanceMonitoring.sendToAnalytics);
    });
    
    // Custom metrics
    performanceMonitoring.trackCustomMetrics();
  },
  
  // Send metrics to analytics
  sendToAnalytics: (metric) => {
    const data = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      entries: metric.entries,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      connection: navigator.connection?.effectiveType,
    };
    
    // Send to analytics endpoint
    fetch('/api/analytics/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      keepalive: true,
    }).catch(() => {});
    
    // Also log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric.rating);
    }
  },
  
  // Track custom business metrics
  trackCustomMetrics: () => {
    // Time to first equipment load
    const equipmentLoadStart = performance.now();
    
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const start = performance.now();
      const response = await originalFetch(...args);
      const duration = performance.now() - start;
      
      // Track API performance
      if (args[0]?.includes('/api/equipment')) {
        performanceMonitoring.recordMetric('api.equipment.load', duration);
      }
      
      return response;
    };
    
    // Track interaction latency
    ['click', 'touchstart', 'keydown'].forEach(eventType => {
      document.addEventListener(eventType, (e) => {
        const start = performance.now();
        requestAnimationFrame(() => {
          const latency = performance.now() - start;
          if (latency > 50) {
            performanceMonitoring.recordMetric('interaction.latency', latency, {
              target: e.target.tagName,
              type: eventType,
            });
          }
        });
      }, { passive: true });
    });
  },
  
  // Record custom metric
  recordMetric: (name, value, metadata = {}) => {
    fetch('/api/analytics/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, value, metadata, timestamp: Date.now() }),
      keepalive: true,
    }).catch(() => {});
  },
  
  // Measure component render time
  measureRender: (componentName, renderFn) => {
    const start = performance.now();
    const result = renderFn();
    const duration = performance.now() - start;
    
    if (duration > 16.67) { // > 1 frame
      performanceMonitoring.recordMetric('render.slow', duration, {
        component: componentName,
      });
    }
    
    return result;
  },
};

// React Profiler integration
export const ProfilerWrapper = ({ id, children }) => {
  const onRender = (id, phase, actualDuration) => {
    if (actualDuration > 16.67) {
      performanceMonitoring.recordMetric('react.render.slow', actualDuration, {
        component: id,
        phase,
      });
    }
  };
  
  return (
    <React.Profiler id={id} onRender={onRender}>
      {children}
    </React.Profiler>
  );
};
```

### Performance Budgets
```javascript
// performance-budget.json
{
  "budgets": [
    {
      "resourceType": "total",
      "budget": 300
    },
    {
      "resourceType": "script",
      "budget": 150
    },
    {
      "resourceType": "css",
      "budget": 50
    },
    {
      "resourceType": "image",
      "budget": 100
    },
    {
      "resourceType": "font",
      "budget": 30
    },
    {
      "resourceType": "third-party",
      "budget": 50
    }
  ],
  "thresholds": {
    "LCP": 2000,
    "FID": 50,
    "CLS": 0.05,
    "FCP": 1500,
    "TTI": 3000,
    "TBT": 100
  }
}
```

```yaml
# .github/workflows/performance.yml
name: Performance Budget

on: [pull_request]

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      # Lighthouse CI
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/equipment
            http://localhost:3000/booking/123
          budgetPath: ./performance-budget.json
          uploadArtifacts: true
      
      # Bundle size check
      - name: Check bundle size
        run: |
          npx bundlesize
      
      # Custom performance tests
      - name: Run performance tests
        run: npm run test:performance
```

---

## Performance Checklist

### Pre-Release Performance Audit
- [ ] **Bundle Size**
  - [ ] Total JS < 200KB gzipped
  - [ ] Total CSS < 50KB gzipped
  - [ ] Largest chunk < 100KB gzipped
  - [ ] No duplicate dependencies
  - [ ] Tree shaking working (check bundle analyzer)

- [ ] **Loading Performance**
  - [ ] LCP < 2.0s on 3G
  - [ ] FCP < 1.5s on 3G
  - [ ] Critical CSS inlined
  - [ ] Fonts preloaded (woff2)
  - [ ] Hero images prioritized
  - [ ] Service worker precaching app shell

- [ ] **Runtime Performance**
  - [ ] No unnecessary re-renders (React DevTools Profiler)
  - [ ] Virtualized lists for > 50 items
  - [ ] Memoized expensive computations
  - [ ] Stable callback references
  - [ ] No memory leaks (check heap snapshots)

- [ ] **Network Efficiency**
  - [ ] API responses cached appropriately
  - [ ] Request deduplication implemented
  - [ ] Batch requests for related data
  - [ ] Compression enabled (gzip/brotli)
  - [ ] HTTP/2 or HTTP/3 enabled
  - [ ] CDN for static assets

- [ ] **Mobile Optimization**
  - [ ] Tested on low-end devices
  - [ ] Adaptive loading implemented
  - [ ] Reduced motion respected
  - [ ] Data saver mode supported
  - [ ] Touch targets ≥ 48x48px
  - [ ] No viewport scaling issues

- [ ] **Caching**
  - [ ] Static assets: 1 year + immutable
  - [ ] API responses: 5 min + stale-while-revalidate
  - [ ] Service worker offline support
  - [ ] Cache invalidation on mutations
  - [ ] ETags/Last-Modified for validation

- [ ] **Monitoring**
  - [ ] Web Vitals tracking in production
  - [ ] Custom business metrics tracked
  - [ ] Performance budgets in CI/CD
  - [ ] Alerting for regressions
  - [ ] Regular performance audits scheduled

---

## Quick Reference: Performance Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use React.lazy + Suspense for code splitting | Import everything upfront |
| Memoize with React.memo, useMemo, useCallback | Memoize everything blindly |
| Virtualize long lists (react-window) | Render 100+ items in DOM |
| Optimize images (WebP, responsive, lazy) | Use unoptimized large images |
| Cache API responses with SWR/React Query | Fetch same data repeatedly |
| Use cursor-based pagination | Use offset pagination for large data |
| Prefetch on hover/idle | Prefetch everything on load |
| Monitor Core Web Vitals in production | Assume fast on dev machine |
| Test on real devices & throttled networks | Only test on high-end desktop |
| Set performance budgets in CI | Ignore bundle size growth |

---

## Resources
- [Web Vitals](https://web.dev/vitals/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Lighthouse CI](https://github.com/treosh/lighthouse-ci)
- [Workbox](https://developers.google.com/web/tools/workbox)
- [HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [Resource Hints](https://www.w3.org/TR/resource-hints/)

---

*Last Updated: November 2026*