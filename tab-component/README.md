# Async Tabs Component

A production-ready, interview-focused React component that implements async data fetching with lazy loading, caching, race condition handling, and full accessibility support.

## Features

✅ **Lazy Loading** - Content is fetched only when a tab is clicked, not on mount  
✅ **Caching** - Previously loaded content is cached and shown instantly on revisit  
✅ **Race Condition Handling** - Rapid tab switching always shows the correct content  
✅ **Loading States** - Visual feedback with spinners during data fetching  
✅ **Error Handling** - Graceful error states with user-friendly messages  
✅ **Accessibility (A11y)** - Full ARIA support and keyboard navigation  
✅ **Unmount Safety** - Prevents state updates after component unmounts  

## Problem Statement

Build a reusable Tab component that:
- Renders a list of tabs from props
- Fetches content asynchronously when a tab is clicked
- Only fetches content when needed (lazy loading)
- Caches fetched content (no re-fetch if already loaded)
- Handles race conditions when users rapidly switch tabs

## Key Implementation Details

### 1. Race Condition Handling

**The Problem:**
If a user clicks Tab 1 (slow, 5s) and immediately clicks Tab 2 (fast, 1s), without protection, Tab 1's response might arrive after Tab 2 is displayed and overwrite it.

**The Solution:**
We use a `requestCounterRef` that increments for each fetch request. Each request captures its ID, and only updates state if its ID matches the current counter value.

```
Timeline:
t=0s:  User clicks Tab 1 → requestCounterRef = 1, fetch starts
t=0.1s: User clicks Tab 2 → requestCounterRef = 2, fetch starts
t=1s:   Tab 2 finishes → checks: 2 === 2 ✓ → Updates with Tab 2 content
t=5s:   Tab 1 finishes → checks: 1 === 2 ✗ → Ignores stale result
```

**Code:**
```javascript
const requestCounterRef = useRef(0);

const fetchContent = async (tabId) => {
  const currentRequestId = ++requestCounterRef.current;
  
  try {
    const data = await fetchTabContent(tabId);
    
    // Only update if this is still the latest request
    if (currentRequestId === requestCounterRef.current) {
      setContentCache(prev => ({ ...prev, [tabId]: data }));
    }
  } catch (error) {
    // Same check for errors
    if (currentRequestId === requestCounterRef.current) {
      // Handle error
    }
  }
};
```

### 2. Accessibility (A11y)

Full ARIA implementation following WAI-ARIA Authoring Practices:

- `role="tablist"` on container
- `role="tab"` on tab buttons
- `role="tabpanel"` on content area
- `aria-selected` indicates active tab
- `aria-controls` links tabs to panels
- `aria-labelledby` links panels to tabs
- `aria-live="polite"` for loading announcements
- `role="alert"` for error messages

**Keyboard Navigation:**
- `ArrowRight` / `ArrowLeft` - Navigate between tabs
- `Home` / `End` - Jump to first/last tab
- `Enter` / `Space` - Activate tab
- `Tab` - Standard tab navigation

### 3. Unmounting/Cleanup

Prevents state updates after component unmounts:

```javascript
const isMountedRef = useRef(true);

useEffect(() => {
  isMountedRef.current = true;
  return () => {
    isMountedRef.current = false;
  };
}, []);

// In fetchContent:
if (currentRequestId === requestCounterRef.current && isMountedRef.current) {
  setContentCache(prev => ({ ...prev, [tabId]: data }));
}
```

**Note:** In production, you'd also use `AbortController` to cancel pending requests:
```javascript
const abortControllerRef = useRef(null);

// In fetchContent:
abortControllerRef.current = new AbortController();
const response = await fetch(url, { signal: abortControllerRef.current.signal });

// In cleanup:
useEffect(() => {
  return () => {
    abortControllerRef.current?.abort();
  };
}, []);
```

### 4. Error Handling

Comprehensive error states:
- Network errors are caught and displayed
- Error state is cached (prevents infinite retry loops)
- User-friendly error messages
- Visual error indicators with `role="alert"`

## Usage

```jsx
import AsyncTabs from './components/AsyncTabs';

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
];

function App() {
  return <AsyncTabs tabs={tabs} defaultTabId="home" />;
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tabs` | `Array<{id: string, label: string}>` | Yes | - | Array of tab items |
| `defaultTabId` | `string` | No | First tab's ID | Initial active tab |

## Interview Talking Points

### Race Conditions
**Q: "If I click Tab 1 (5s) and immediately click Tab 2 (1s), what happens?"**

**A:** Each fetch gets a unique request ID from an incrementing counter. When responses arrive, we check if the request ID matches the current counter. If Tab 2 finishes first, it updates (ID 2 === 2). When Tab 1 finishes later, it's ignored (ID 1 !== 2), preventing stale data from overwriting the correct content.

### Accessibility
**Q: "How do you ensure this is accessible?"**

**A:** Full ARIA implementation with proper roles, states, and properties. Keyboard navigation follows WAI-ARIA patterns (Arrow keys, Home/End). Screen readers get proper announcements via `aria-live` regions. Focus management ensures logical tab order.

### State Management
**Q: "Why not use a library like Redux or Zustand?"**

**A:** For this component, local state with `useState` is sufficient. The component is self-contained and doesn't need shared state. If multiple components needed the same tab data, we'd consider lifting state or using a context/library.

### Performance
**Q: "How do you optimize performance?"**

**A:** 
- Lazy loading: Only fetch when needed
- Caching: Avoid redundant network calls
- Race condition handling: Prevents unnecessary re-renders
- Memoization: Could add `useMemo` for expensive computations if needed

## Testing Race Conditions

To test race condition handling:
1. Open browser DevTools → Network tab (throttle to "Slow 3G")
2. Click a tab that will load slowly
3. Immediately click another tab
4. Verify the second tab's content displays, and the first tab's content doesn't overwrite it

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## File Structure

```
src/
├── components/
│   ├── AsyncTabs.jsx      # Main component
│   └── AsyncTabs.css      # Component styles
├── utils/
│   └── api.js             # Mock API utility
├── App.jsx                # Example usage
└── main.jsx               # Entry point
```

## License

MIT
