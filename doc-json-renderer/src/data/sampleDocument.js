export const sampleDocument = [
  {
    type: 'h1',
    children: 'Document Renderer - Comprehensive Demo',
  },
  {
    type: 'h2',
    children: 'Testing Various Nested Structures',
  },
  {
    type: 'p',
    children: 'This is a paragraph with some descriptive text about the document renderer. It demonstrates how we can render different HTML elements from a JSON structure.',
  },
  // Test case 1: Simple list with string children
  {
    type: 'h2',
    children: '1. Simple List',
  },
  {
    type: 'ul',
    children: [
      { type: 'li', children: 'Option 1' },
      { type: 'li', children: 'Option 2' },
      { type: 'li', children: 'Option 3' },
    ],
  },
  // Test case 2: Nested divs with single object child
  {
    type: 'h2',
    children: '2. Nested Containers',
  },
  {
    type: 'div',
    attributes: {
      className: 'nested-container',
      style: { padding: '16px', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', marginBottom: '16px' }
    },
    children: {
      type: 'div',
      attributes: {
        style: { padding: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '6px' }
      },
      children: {
        type: 'p',
        children: 'This is a deeply nested paragraph inside two divs (single object child test)',
      },
    },
  },
  // Test case 3: List with nested elements in list items
  {
    type: 'h2',
    children: '3. Complex List Items',
  },
  {
    type: 'ul',
    children: [
      {
        type: 'li',
        children: [
          { type: 'text', children: 'List item with ' },
          { type: 'text', attributes: { style: { fontWeight: 'bold', color: '#3b82f6' } }, children: 'styled text' },
          { type: 'text', children: ' inline' },
        ]
      },
      {
        type: 'li',
        children: {
          type: 'div',
          children: 'List item with a div child (single object)',
        }
      },
      {
        type: 'li',
        children: 'Simple string child'
      },
    ],
  },
  // Test case 4: Mixed content with arrays
  {
    type: 'h2',
    children: '4. Mixed Content Types',
  },
  {
    type: 'p',
    children: [
      'This paragraph contains ',
      { type: 'text', attributes: { style: { fontWeight: 'bold' } }, children: 'bold text' },
      ', ',
      { type: 'text', attributes: { style: { fontStyle: 'italic', color: '#8b5cf6' } }, children: 'italic colored text' },
      ', and regular text all mixed together.',
    ],
  },
  // Test case 5: Image in container
  {
    type: 'h2',
    children: '5. Image Component',
  },
  {
    type: 'div',
    attributes: { className: 'doc-logo' },
    children: [
      {
        type: 'img',
        attributes: {
          src: '/vite.svg',
          alt: 'Vite logo',
        },
      },
    ],
  },
]
