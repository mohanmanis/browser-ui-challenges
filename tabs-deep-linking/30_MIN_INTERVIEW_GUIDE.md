# 30-Minute Interview Guide: Tab Component

## Exact Requirements (From Real Interview)

1. ✅ Make three tab buttons, display content based on tabs
2. ✅ Get tab name from URL/query params, make active tab/display content
3. ✅ Lazy loading content when Tab Panel is visible (scale-up)

## Time Breakdown (30 minutes)

| Time | Task | Details |
|------|------|---------|
| 0-5 min | Setup & Basic UI | Three buttons, click handler, basic state |
| 5-15 min | URL Integration | URLSearchParams, read/write URL, popstate |
| 15-25 min | Lazy Loading | Fetch data on tab click, cache loaded data |
| 25-30 min | Testing & Polish | Test all features, handle edge cases |

## Step-by-Step Implementation

### Step 1: Basic Tab UI (5 min)

```javascript
import { useState } from 'react';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('home');
  const tabs = ['home', 'profile', 'settings'];

  return (
    <div>
      {/* Buttons */}
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={activeTab === tab ? 'active' : ''}
        >
          {tab}
        </button>
      ))}
      
      {/* Content */}
      <div>Content for {activeTab}</div>
    </div>
  );
}
```

**Interview Tip:** Start simple. Get the basic functionality working first!

### Step 2: URL Integration (10 min)

**2a. Read from URL (3 min)**

```javascript
const getTabFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('tab') || 'home';
};

const [activeTab, setActiveTab] = useState(getTabFromUrl);
```

**2b. Write to URL (3 min)**

```javascript
const updateUrl = (tabName) => {
  const url = new URL(window.location.href);
  url.searchParams.set('tab', tabName);
  window.history.pushState({}, '', url);
};

const handleTabClick = (tabName) => {
  setActiveTab(tabName);
  updateUrl(tabName);
};
```

**2c. Handle Back/Forward (4 min)**

```javascript
useEffect(() => {
  const handlePopState = () => {
    setActiveTab(getTabFromUrl());
  };
  window.addEventListener('popstate', handlePopState);
  return () => window.removeEventListener('popstate', handlePopState);
}, []);
```

**Interview Tip:** Explain URLSearchParams clearly. This is a key API to know!

### Step 3: Lazy Loading (10 min)

**3a. Mock API (2 min)**

```javascript
const fetchTabData = async (tabName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        home: 'Home content',
        profile: 'Profile content',
        settings: 'Settings content',
      };
      resolve(data[tabName]);
    }, 500);
  });
};
```

**3b. State for Data & Loading (2 min)**

```javascript
const [tabData, setTabData] = useState({});
const [loading, setLoading] = useState(false);
```

**3c. Fetch on Tab Change (6 min)**

```javascript
useEffect(() => {
  // Only fetch if we don't have the data
  if (!tabData[activeTab]) {
    setLoading(true);
    fetchTabData(activeTab).then(data => {
      setTabData(prev => ({ ...prev, [activeTab]: data }));
      setLoading(false);
    });
  }
}, [activeTab]);
```

**Interview Tip:** Explain why you cache in an object. Show performance awareness!

### Step 4: Display Content (remainder)

```javascript
<div className="tab-content">
  {loading ? (
    <div>Loading...</div>
  ) : (
    <div>{tabData[activeTab]}</div>
  )}
</div>
```

## Complete Solution (~80 lines)

```javascript
import { useState, useEffect } from 'react';

const fetchTabData = async (tabName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        home: 'Home content from API',
        profile: 'Profile content from API',
        settings: 'Settings content from API',
      };
      resolve(data[tabName]);
    }, 500);
  });
};

export default function Tabs() {
  const getTabFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'home';
  };

  const [activeTab, setActiveTab] = useState(getTabFromUrl);
  const [tabData, setTabData] = useState({});
  const [loading, setLoading] = useState(false);

  const updateUrl = (tabName) => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabName);
    window.history.pushState({}, '', url);
  };

  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getTabFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!tabData[activeTab]) {
      setLoading(true);
      fetchTabData(activeTab).then(data => {
        setTabData(prev => ({ ...prev, [activeTab]: data }));
        setLoading(false);
      });
    }
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    updateUrl(tabName);
  };

  const tabs = ['home', 'profile', 'settings'];

  return (
    <div>
      <div className="tab-buttons">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={activeTab === tab ? 'active' : ''}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {loading ? <div>Loading...</div> : <div>{tabData[activeTab]}</div>}
      </div>
    </div>
  );
}
```

## Key Interview Questions & Answers

### Q: "Why query params over hash params?"

**Answer:**
"I use query params (`?tab=home`) instead of hash params (`#tab=home`) because:

1. **SEO** - Search engines can index query params
2. **Server Access** - Server can read query params (important for SSR)
3. **Shareable** - Better for sharing specific states
4. **Next.js Compatibility** - Works better with SSR

Hash params are simpler for pure client-side SPAs, but query params are production-ready."

### Q: "How do you handle Next.js window object?"

**Answer:**
```javascript
const getTabFromUrl = () => {
  // Check if window exists (client-side)
  if (typeof window === 'undefined') {
    return 'home'; // Server-side default
  }
  
  const params = new URLSearchParams(window.location.search);
  return params.get('tab') || 'home';
};
```

"In Next.js, I check if `window` is defined before using it. During SSR, `window` is undefined, so I return a default value."

### Q: "Why cache loaded data?"

**Answer:**
"I cache loaded tab data in an object to:
1. **Avoid re-fetching** - Don't reload data when switching back to a tab
2. **Better UX** - Instant content display for visited tabs
3. **Performance** - Reduces API calls
4. **Bandwidth** - Saves user data

This is a common pattern in production apps."

### Q: "How would you render from object of objects?"

**Answer:**
```javascript
// Instead of array: ['home', 'profile', 'settings']
const tabs = {
  home: { label: 'Home', icon: '🏠' },
  profile: { label: 'Profile', icon: '👤' },
  settings: { label: 'Settings', icon: '⚙️' }
};

// Render using Object.entries()
Object.entries(tabs).map(([key, config]) => (
  <button key={key} onClick={() => handleTabClick(key)}>
    {config.icon} {config.label}
  </button>
));
```

"Use `Object.entries()` to get key-value pairs, then map over them."

## Common Mistakes to Avoid

❌ **Forgetting popstate listener** → Back button won't work  
❌ **Not caching data** → Re-fetches every time  
❌ **Using array.find for tabs** → Use object for O(1) lookup  
❌ **Forgetting cleanup in useEffect** → Memory leaks  
❌ **Not handling loading state** → Poor UX  

## What Interviewers Look For

✅ **URLSearchParams knowledge** - Modern API usage  
✅ **window.history.pushState** - Knows how to update URL without reload  
✅ **popstate event** - Understands browser navigation  
✅ **Caching strategy** - Performance awareness  
✅ **Clean code** - Readable, organized  
✅ **Error handling** - Considers edge cases  

## Next.js Specific (If Asked)

```javascript
// pages/tabs.js or app/tabs/page.js
'use client'; // For App Router

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function TabsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') || 'home'
  );

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    router.push(`?tab=${tabName}`, { scroll: false });
  };

  // ... rest of implementation
}
```

## Production Enhancements (If Time Allows)

1. **TypeScript** - Add type safety
2. **Error Handling** - Try/catch on API calls
3. **Accessibility** - ARIA attributes, keyboard navigation
4. **Testing** - Unit tests for URL logic
5. **Prefetching** - Load next tab on hover

## Final Checklist

- [ ] Three tab buttons render
- [ ] Click tab → content changes
- [ ] Click tab → URL updates
- [ ] Refresh page → correct tab active
- [ ] Back button → goes to previous tab
- [ ] Forward button → goes forward
- [ ] Content loads lazily (API call)
- [ ] Loaded content cached
- [ ] Loading state shown
- [ ] Code is clean and readable

## Time Saved Tips

1. **Start simple** - Get basic UI working first
2. **Copy URLSearchParams syntax** - It's okay to reference docs
3. **Use object for caching** - Simpler than array operations
4. **Don't over-engineer** - Three tabs is enough
5. **Test as you go** - Catch bugs early

---

**Goal:** Working solution in 25-30 minutes with time for questions!

**Success Criteria:**
- ✅ All core requirements met
- ✅ Code is explainable
- ✅ Modern React patterns used
- ✅ Demonstrates API knowledge

Good luck! 🚀
