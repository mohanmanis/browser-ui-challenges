# Async Tabs - Interview Simplified Version ⏱️

A **40-minute interview-focused** implementation of async tabs with lazy loading, caching, race condition handling, and **AbortController-based request cancellation**.

## 🎯 Interview Context

This is a **streamlined version** designed to be built in a real coding interview. It includes all core features while staying within time constraints.

---

## ✨ Features

### Core Functionality (Must-Have)
✅ **Lazy Loading** - Content fetched only when a tab is clicked  
✅ **Caching** - Previously loaded content cached and shown instantly  
✅ **Race Condition Handling** - Rapid tab switching always shows correct content  
✅ **Request Cancellation** - Uses `AbortController` to cancel stale requests  
✅ **Basic Accessibility** - ARIA roles and attributes  

---

## 🏗️ Implementation Strategy (40-min Timeline)

### Phase 1: Core Structure (15 min)
```jsx
// Basic tab switching + state management
const [activeTab, setActiveTab] = useState(tabs[0]?.id);
const [cache, setCache] = useState({});
const [loading, setLoading] = useState(false);
```

### Phase 2: Async Fetching + Caching (10 min)
```jsx
useEffect(() => {
  // Check cache first
  if (cache[activeTab]) return;
  
  // Fetch if not cached
  setLoading(true);
  fetchTabContent(activeTab).then(data => {
    setCache(prev => ({ ...prev, [activeTab]: data }));
    setLoading(false);
  });
}, [activeTab]);
```

### Phase 3: Race Condition + Cancellation (10 min)
```jsx
// Track current request
const currentRequestRef = useRef(null);
const abortControllerRef = useRef(null);

useEffect(() => {
  // Cancel previous request
  abortControllerRef.current?.abort();
  
  // Create new abort controller
  const controller = new AbortController();
  abortControllerRef.current = controller;
  
  // Track this request
  const thisRequest = activeTab;
  currentRequestRef.current = thisRequest;
  
  fetchTabContent(activeTab, controller.signal)
    .then(data => {
      // Only update if still current
      if (currentRequestRef.current === thisRequest) {
        setCache(prev => ({ ...prev, [activeTab]: data }));
      }
    })
    .catch(error => {
      if (error.name !== 'AbortError') {
        // Handle real errors
      }
    });
  
  return () => controller.abort();
}, [activeTab]);
```

### Phase 4: Polish (5 min)
- Basic ARIA attributes
- Loading spinner
- Minimal styling

---

## 🔑 Key Interview Talking Points

### 1. **Why AbortController?**
> "When a user rapidly switches tabs, we want to cancel the previous request to save bandwidth and ensure we don't process stale data. `AbortController` is the modern way to cancel fetch requests."

### 2. **Why the Ref for Race Conditions?**
> "Even with `AbortController`, the promise might still resolve before being cancelled. The `currentRequestRef` ensures we only update state if this request is still relevant. It's a defensive check."

### 3. **Why Check Cache in useEffect?**
> "We check cache inside `useEffect` to avoid unnecessary fetches. If data exists, we return early. This keeps the logic simple and ensures we only fetch when needed."

### 4. **Cleanup Function**
> "The `return` in `useEffect` runs when the component unmounts OR when dependencies change. We abort the request here to prevent memory leaks and wasted network calls."

---

## 🧪 Testing Race Conditions

### Manual Test:
1. Open **DevTools** → **Network tab**
2. Throttle network to **"Slow 3G"**
3. Click "Home" tab (starts loading slowly)
4. Immediately click "About" tab
5. **Expected:** "About" content displays, "Home" request is cancelled
6. **Check console:** Should see "Request for home was cancelled"

### What to Look For:
- ✅ No flash of wrong content
- ✅ Console logs showing cancellation
- ✅ Only the latest tab's content displays
- ✅ Previous requests shown as "cancelled" in Network tab

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AsyncTabs.jsx       # Main component (~100 lines)
│   └── AsyncTabs.css       # Minimal styling
├── utils/
│   └── api.js              # Mock API with AbortController support
├── App.jsx                 # Example usage
└── main.jsx                # Entry point
```

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

---

## 🎤 Interview Script

### When Starting:
> "I'll build this incrementally: first basic tabs, then async fetching with caching, then race condition handling with AbortController, and finally accessibility. Should take about 30-35 minutes with time for questions."

### While Coding:
- **Explain as you type:** "Now I'm adding the abort controller to cancel previous requests..."
- **Acknowledge trade-offs:** "I'm keeping styling minimal for now, but in production I'd add loading states per tab."
- **Show awareness:** "This handles the common race condition where fast responses overtake slow ones."

### At 35 Minutes (If Time Runs Out):
> "The core is done and working. Given more time, I'd add:
> - Full keyboard navigation (Arrow keys, Home/End)
> - Error boundaries
> - Loading indicators per tab button
> - Retry logic
> - Unit tests for race condition scenarios"

---

## 🎯 What Makes This Interview-Ready

### ✅ Good Practices:
- Clean, readable code
- Inline comments explaining "why"
- Proper hooks usage
- Modern patterns (AbortController)
- Basic accessibility
- Error handling

### ❌ Intentionally Omitted (Time Constraints):
- Full keyboard navigation (Arrow keys)
- Per-tab loading indicators
- Comprehensive error UI
- TypeScript
- Unit tests
- Complex styling

### 💡 Shows You Understand:
- Async operations
- Race conditions
- Request cancellation
- React hooks lifecycle
- Memory leak prevention
- Caching strategies

---

## 📊 Comparison: Interview vs Production

| Feature | Interview Version | Production Version |
|---------|------------------|-------------------|
| **Race Conditions** | ✅ Handled | ✅ Handled |
| **Request Cancellation** | ✅ AbortController | ✅ AbortController |
| **Lazy Loading** | ✅ Yes | ✅ Yes |
| **Caching** | ✅ Basic | ✅ Advanced (TTL, invalidation) |
| **Keyboard Nav** | ⚠️ Basic | ✅ Full (Arrow keys, Home/End) |
| **Loading States** | ⚠️ Global | ✅ Per-tab indicators |
| **Error Handling** | ⚠️ Basic | ✅ Retry, error boundaries |
| **Tests** | ❌ None | ✅ Unit + E2E |
| **TypeScript** | ❌ No | ✅ Yes |
| **Styling** | ⚠️ Minimal | ✅ Polished |

---

## 🧠 Key Takeaways

1. **Scope Management:** Know what to build vs what to discuss
2. **Communication:** Explain your thinking while coding
3. **Pragmatism:** Perfect is the enemy of done (in interviews)
4. **Fundamentals:** Nail the core features first
5. **Awareness:** Show you know what's missing and why

---

## 📝 License

MIT

---

## 🙋 Questions Interviewers Might Ask

### Q: "What if the user clicks the same tab twice?"
**A:** The cache check prevents redundant fetches. `if (cache[activeTab]) return;`

### Q: "What happens if the component unmounts during a fetch?"
**A:** The cleanup function in `useEffect` calls `abort()`, cancelling the request. The catch block ignores `AbortError`.

### Q: "Why not use a library like React Query?"
**A:** For this scope, local state is sufficient. In a real app with complex data needs, React Query would be great for caching, refetching, and background updates.

### Q: "How would you test this?"
**A:** Unit tests for race conditions (mock fetch, verify state), integration tests for user interactions, accessibility tests with axe-core or jest-axe.

---

**Built for speed. Designed for interviews. Ready to impress.** 🚀
