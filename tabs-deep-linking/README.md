# Tabs with Deep Linking

A comprehensive React tab component implementation featuring deep linking, lazy loading, config-driven UI, form validation, and document rendering.

## Features

### 🔗 Deep Linking
- **URL Query Parameters**: Active tab is stored in URL (`?tab=tabName`)
- **State Persistence**: Tab selection persists on page reload
- **Browser Navigation**: Supports back/forward button navigation
- **URLSearchParams API**: Uses modern URLSearchParams for URL manipulation

### ⚡ Lazy Loading
- Content loads only when tab panel becomes visible
- Uses Intersection Observer API for efficient detection
- Simulated API calls with loading states
- Error handling and retry functionality

### 🎨 Config-Driven UI
- Renders components from **object of objects** (not arrays)
- Flexible component configuration system
- Supports various element types: headings, paragraphs, buttons, inputs, lists

### ✅ Form Validation
- Real-time validation on blur and change
- Multiple validation rules (required, email format, password strength, etc.)
- Accessible error messages with ARIA attributes
- Form submission with validation checks

### 📄 Document Renderer
- Renders documents from JSON structure
- Supports multiple element types:
  - Titles (h1-h6)
  - Paragraphs
  - Images with captions
  - Ordered and unordered lists
  - Code blocks
  - Blockquotes
  - Links
  - Dividers

## Query Params vs Hash Params

### Query Params (`?tab=home`)
**When to use:**
- Need server-side access to the parameter
- Want better SEO and shareability
- Need bookmarkable URLs
- Building RESTful APIs

**Used in this project** because:
- Better for sharing/bookmarking specific tabs
- Server can read tab state if needed
- More standard for RESTful URLs

### Hash Params (`#tab=home`)
**When to use:**
- Pure client-side routing
- Don't want to trigger page reloads
- Simpler SPA routing
- Don't need server-side access

## Installation

```bash
cd tabs-deep-linking
pnpm install
```

## Development

```bash
pnpm dev
```

## Project Structure

```
tabs-deep-linking/
├── src/
│   ├── components/
│   │   ├── Tabs.jsx              # Main tab component with deep linking
│   │   ├── LazyTabContent.jsx   # Lazy loading wrapper
│   │   ├── ConfigDrivenUI.jsx   # Config-driven component renderer
│   │   ├── FormWithValidation.jsx # Form with validation logic
│   │   └── DocumentRenderer.jsx  # JSON document renderer
│   ├── data/
│   │   └── tabConfig.js         # Tab configuration (object of objects)
│   ├── utils/
│   │   └── api.js               # Mock API functions
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # Entry point
└── package.json
```

## Key Concepts

### URLSearchParams API
```javascript
// Get tab from URL
const params = new URLSearchParams(window.location.search)
const tab = params.get('tab')

// Update URL
const url = new URL(window.location.href)
url.searchParams.set('tab', 'home')
window.history.pushState({}, '', url)
```

### Rendering from Object of Objects
Instead of mapping over arrays, we iterate over object entries:
```javascript
Object.entries(tabs).map(([tabId, tabConfig]) => (
  <Tab key={tabId} {...tabConfig} />
))
```

### Next.js SSR Consideration
When using Next.js, accessing `window` requires checking if it exists:
```javascript
if (typeof window === 'undefined') {
  // Server-side rendering
  return defaultTab
}
```

## Interview Tips

1. **URLSearchParams**: Know how to read and write query parameters
2. **Object Iteration**: Be comfortable with `Object.entries()` and `Object.keys()`
3. **SSR Handling**: Always check `typeof window !== 'undefined'` when accessing browser APIs
4. **Lazy Loading**: Understand Intersection Observer API
5. **Form Validation**: Implement validation rules and error handling
6. **Component Composition**: Build reusable, composable components

## Browser Support

- Modern browsers with ES6+ support
- Intersection Observer API support
- URLSearchParams API support
