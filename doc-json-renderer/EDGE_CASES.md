# Edge Cases Handled

This document outlines all the edge cases that the DocumentRenderer component handles correctly.

## 1. Children Type Variations

### ✅ String Children
```javascript
{ type: 'p', children: 'Simple text' }
```
**Handling**: Directly rendered as text content.

### ✅ Number Children
```javascript
{ type: 'span', children: 42 }
```
**Handling**: Primitive values are passed through and rendered by React.

### ✅ Single Object Child
```javascript
{
  type: 'div',
  children: {
    type: 'p',
    children: 'Nested paragraph'
  }
}
```
**Handling**: Detects object type and recursively calls `renderNode()`.

### ✅ Array of Children
```javascript
{
  type: 'div',
  children: [
    { type: 'p', children: 'First' },
    { type: 'p', children: 'Second' }
  ]
}
```
**Handling**: Maps over array and recursively renders each child.

### ✅ Empty Children
```javascript
{ type: 'div', children: [] }
// or
{ type: 'div' } // children defaults to []
```
**Handling**: Renders empty element without errors.

### ✅ Null/Undefined Children
```javascript
{ type: 'div', children: null }
```
**Handling**: Guard clause at start returns null if node is falsy.

## 2. Deeply Nested Structures

### ✅ Multiple Levels Deep
```javascript
{
  type: 'div',
  children: {
    type: 'div',
    children: {
      type: 'div',
      children: {
        type: 'p',
        children: 'Four levels deep'
      }
    }
  }
}
```
**Handling**: Recursive function handles unlimited nesting depth.

### ✅ Mixed Nesting (Arrays + Objects)
```javascript
{
  type: 'div',
  children: [
    {
      type: 'div',
      children: {
        type: 'p',
        children: 'Mixed nesting'
      }
    }
  ]
}
```
**Handling**: Each level checks type and handles accordingly.

## 3. Mixed Content

### ✅ Text + Components in Array
```javascript
{
  type: 'p',
  children: [
    'Regular text ',
    { type: 'strong', children: 'bold' },
    ' more text'
  ]
}
```
**Handling**: Primitive strings in arrays are handled by the recursive check.

### ✅ Complex List Items
```javascript
{
  type: 'ul',
  children: [
    { type: 'li', children: 'Simple' },
    {
      type: 'li',
      children: [
        'Text with ',
        { type: 'em', children: 'emphasis' }
      ]
    },
    {
      type: 'li',
      children: {
        type: 'div',
        children: 'Div in list item'
      }
    }
  ]
}
```
**Handling**: Each list item's children are processed independently with full recursion.

## 4. Attributes Handling

### ✅ No Attributes
```javascript
{ type: 'p', children: 'Text' }
```
**Handling**: Defaults to empty object `{}`.

### ✅ className
```javascript
{
  type: 'div',
  attributes: { className: 'my-class' }
}
```
**Handling**: Spread into props.

### ✅ Inline Styles
```javascript
{
  type: 'div',
  attributes: {
    style: { backgroundColor: 'red', padding: '10px' }
  }
}
```
**Handling**: Style object spread into props.

### ✅ Custom Data Attributes
```javascript
{
  type: 'div',
  attributes: {
    'data-test-id': 'my-component',
    'aria-label': 'Description'
  }
}
```
**Handling**: All attributes spread into element props.

### ✅ Self-Closing Elements (img)
```javascript
{
  type: 'img',
  attributes: {
    src: '/image.png',
    alt: 'Description'
  }
}
```
**Handling**: Rendered without children.

## 5. Key Generation

### ✅ With ID
```javascript
{
  type: 'div',
  id: 'unique-123',
  children: 'Content'
}
```
**Handling**: Uses `node.id` as key.

### ✅ Without ID
```javascript
{ type: 'div', children: 'Content' }
```
**Handling**: Generates key as `${type}-${index}` (e.g., "div-0").

## 6. Tree Input Variations

### ✅ Single Object Tree
```javascript
const tree = { type: 'div', children: 'Single root' }
<DocumentRenderer tree={tree} />
```
**Handling**: Wrapped in array `[tree]` before rendering.

### ✅ Array Tree
```javascript
const tree = [
  { type: 'h1', children: 'Title' },
  { type: 'p', children: 'Paragraph' }
]
<DocumentRenderer tree={tree} />
```
**Handling**: Directly mapped over.

## 7. Unknown Element Types

### ✅ Unsupported Type
```javascript
{ type: 'custom-element', children: 'Content' }
```
**Handling**: Falls through to default case, renders as `<div>`.

### ✅ Undefined Type
```javascript
{ children: 'Content' }
```
**Handling**: Type defaults to undefined, renders as `<div>`.

## 8. Primitive Values at Root

### ✅ Primitive Node in Tree
```javascript
function renderNode(node, index) {
  if (typeof node !== 'object') {
    return node  // Handles strings, numbers directly
  }
  // ...
}
```
**Example**:
```javascript
{
  type: 'div',
  children: ['Text', 123, 'More text']
}
```
**Handling**: When recursing, primitives are returned as-is.

## 9. Theme Context

### ✅ Light Mode
Applies light theme design tokens via CSS variables.

### ✅ Dark Mode
Applies dark theme design tokens via CSS variables.

### ✅ Theme Toggle
Re-renders with updated theme class and CSS variables.

## 10. Performance Considerations

### ✅ Key Uniqueness
- Uses `id` if provided
- Falls back to `${type}-${index}` for stable keys
- Prevents unnecessary re-renders

### ✅ Memoization in Context
```javascript
const value = useMemo(() => {
  // ... theme logic
}, [mode])
```
Prevents unnecessary theme provider re-renders.

## Summary

The DocumentRenderer handles:
- ✅ All children types (string, number, object, array, null/undefined)
- ✅ Unlimited nesting depth
- ✅ Mixed content (text + components)
- ✅ All standard HTML attributes
- ✅ Custom attributes and data attributes
- ✅ Self-closing elements
- ✅ Flexible tree input (object or array)
- ✅ Unknown element types (fallback to div)
- ✅ Theme context integration
- ✅ Proper key generation for React reconciliation

No edge cases should break the renderer!
