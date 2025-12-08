# Document JSON Renderer

A React component that renders HTML documents from JSON structure with support for nested components, design tokens, and dark/light themes.

## Features

- ✅ **Recursive rendering** - Handles deeply nested component structures
- ✅ **Multiple children types** - Supports string, object, and array children
- ✅ **Theme support** - Dark/Light mode with CSS design tokens
- ✅ **Comprehensive HTML elements** - h1-h6, p, ul, ol, li, img, div, span, strong, em, a, button, and more
- ✅ **Custom attributes** - Pass any HTML attributes (className, style, src, alt, etc.)

## JSON Structure

Each node in the tree has the following structure:

```javascript
{
  type: 'element-type',      // Required: HTML element type
  children: '...' | {...} | [...], // Optional: content (string, object, or array)
  attributes: {...},         // Optional: HTML attributes
  id: 'unique-id'           // Optional: unique identifier for keys
}
```

## Supported Children Types

### 1. String Children (Simple Text)
```javascript
{
  type: 'p',
  children: 'This is a simple paragraph'
}
```

### 2. Single Object Child (Nested Component)
```javascript
{
  type: 'div',
  children: {
    type: 'p',
    children: 'Nested paragraph'
  }
}
```

### 3. Array Children (Multiple Elements)
```javascript
{
  type: 'ul',
  children: [
    { type: 'li', children: 'Item 1' },
    { type: 'li', children: 'Item 2' },
    { type: 'li', children: 'Item 3' }
  ]
}
```

### 4. Mixed Content (Text + Components)
```javascript
{
  type: 'p',
  children: [
    'This is ',
    { type: 'strong', children: 'bold text' },
    ' in a paragraph'
  ]
}
```

### 5. Deeply Nested Structures
```javascript
{
  type: 'div',
  children: {
    type: 'div',
    children: {
      type: 'p',
      children: 'Deeply nested content'
    }
  }
}
```

## Supported HTML Elements

- **Headings**: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- **Text**: `p`, `span`, `text`, `strong`, `b`, `em`, `i`
- **Lists**: `ul`, `ol`, `li`
- **Media**: `img`
- **Links**: `a`
- **Interactive**: `button`
- **Containers**: `div`, `section`, `article`, `header`, `footer`, `container`

## Attributes

Pass any HTML attributes through the `attributes` object:

```javascript
{
  type: 'img',
  attributes: {
    src: '/image.png',
    alt: 'Description',
    className: 'my-image',
    style: { width: '100px', height: '100px' }
  }
}
```

## Theme System

The renderer uses a context-based theme system with CSS design tokens:

### Design Tokens

**Light Mode:**
- `--ds-surface-background`: #ffffff
- `--ds-surface-elevated`: #f4f5f7
- `--ds-text`: #172b4d
- `--ds-heading`: #091e42
- `--ds-subheading`: #253858

**Dark Mode:**
- `--ds-surface-background`: #0f172a
- `--ds-surface-elevated`: #111827
- `--ds-text`: #e5e7eb
- `--ds-heading`: #f9fafb
- `--ds-subheading`: #e5e7eb

### Usage

```javascript
import { ThemeProvider } from './context/ThemeContext'
import DocumentRenderer from './components/DocumentRenderer'

function App() {
  return (
    <ThemeProvider>
      <DocumentRenderer tree={myDocument} />
    </ThemeProvider>
  )
}
```

## Example

```javascript
const document = [
  {
    type: 'h1',
    children: 'Welcome to My Document'
  },
  {
    type: 'p',
    children: 'This is an introduction paragraph.'
  },
  {
    type: 'ul',
    children: [
      { type: 'li', children: 'First item' },
      {
        type: 'li',
        children: [
          'Item with ',
          { type: 'strong', children: 'bold text' }
        ]
      }
    ]
  },
  {
    type: 'div',
    attributes: { className: 'image-container' },
    children: {
      type: 'img',
      attributes: {
        src: '/logo.png',
        alt: 'Logo'
      }
    }
  }
]
```

## Running the Project

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build
```

## Implementation Details

- **Recursive rendering**: The `renderNode` function recursively processes the tree structure
- **Type checking**: Handles primitive values, objects, and arrays appropriately
- **Key generation**: Automatically generates keys using `id` or `type-index`
- **Theme context**: Uses React Context API for global theme state
- **CSS variables**: Design tokens are applied as CSS custom properties on the document root
