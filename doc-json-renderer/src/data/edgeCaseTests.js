// Edge case test examples for DocumentRenderer
// Uncomment and import these in App.jsx to test specific scenarios

// Test 1: Single object child (not array)
export const singleObjectChild = {
  type: 'div',
  attributes: { style: { padding: '20px', border: '2px solid blue' } },
  children: {
    type: 'p',
    children: 'This is a single object child, not an array!'
  }
}

// Test 2: Deeply nested single objects
export const deeplyNestedSingleObjects = {
  type: 'div',
  attributes: { style: { padding: '10px', border: '1px solid red' } },
  children: {
    type: 'div',
    attributes: { style: { padding: '10px', border: '1px solid green' } },
    children: {
      type: 'div',
      attributes: { style: { padding: '10px', border: '1px solid blue' } },
      children: {
        type: 'p',
        children: 'Four levels of single object nesting!'
      }
    }
  }
}

// Test 3: Mixed primitives and objects in array
export const mixedContent = {
  type: 'p',
  children: [
    'This is plain text, ',
    { type: 'strong', children: 'this is bold' },
    ', ',
    { type: 'em', children: 'this is italic' },
    ', and this is plain again. ',
    42,
    ' is a number.'
  ]
}

// Test 4: Empty children variations
export const emptyChildren = [
  { type: 'div', children: [] },
  { type: 'p', children: '' },
  { type: 'ul', children: [] }
]

// Test 5: Complex nested list
export const complexNestedList = {
  type: 'ul',
  children: [
    { type: 'li', children: 'Simple string child' },
    {
      type: 'li',
      children: [
        'Array with ',
        { type: 'strong', children: 'mixed' },
        ' content'
      ]
    },
    {
      type: 'li',
      children: {
        type: 'div',
        attributes: { style: { backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '8px' } },
        children: 'Single object child in list item'
      }
    },
    {
      type: 'li',
      children: [
        'Nested list:',
        {
          type: 'ul',
          children: [
            { type: 'li', children: 'Nested item 1' },
            { type: 'li', children: 'Nested item 2' }
          ]
        }
      ]
    }
  ]
}

// Test 6: All heading levels
export const allHeadings = [
  { type: 'h1', children: 'Heading 1' },
  { type: 'h2', children: 'Heading 2' },
  { type: 'h3', children: 'Heading 3' },
  { type: 'h4', children: 'Heading 4' },
  { type: 'h5', children: 'Heading 5' },
  { type: 'h6', children: 'Heading 6' }
]

// Test 7: Attributes variations
export const attributeVariations = [
  {
    type: 'div',
    attributes: {
      className: 'custom-class',
      id: 'custom-id',
      'data-test': 'test-value',
      style: { color: 'red', fontSize: '20px' }
    },
    children: 'Div with multiple attributes'
  },
  {
    type: 'a',
    attributes: {
      href: 'https://example.com',
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    children: 'Link with attributes'
  }
]

// Test 8: Unknown element type (should fallback to div)
export const unknownElement = {
  type: 'custom-unknown-element',
  children: 'This should render as a div (fallback)'
}

// Test 9: Comprehensive real-world example
export const comprehensiveExample = [
  {
    type: 'header',
    children: {
      type: 'h1',
      children: 'Blog Post Title'
    }
  },
  {
    type: 'section',
    children: [
      {
        type: 'p',
        children: [
          'Written by ',
          { type: 'strong', children: 'John Doe' },
          ' on ',
          { type: 'em', children: 'December 19, 2025' }
        ]
      },
      {
        type: 'div',
        attributes: { style: { margin: '20px 0' } },
        children: {
          type: 'img',
          attributes: {
            src: '/vite.svg',
            alt: 'Article featured image',
            style: { maxWidth: '100%', height: 'auto' }
          }
        }
      },
      {
        type: 'p',
        children: 'This is the introduction paragraph with some important information about the topic.'
      },
      {
        type: 'h2',
        children: 'Key Points'
      },
      {
        type: 'ul',
        children: [
          { type: 'li', children: 'First key point' },
          {
            type: 'li',
            children: [
              'Second point with ',
              { type: 'strong', children: 'emphasis' }
            ]
          },
          {
            type: 'li',
            children: {
              type: 'p',
              children: 'Third point with nested paragraph'
            }
          }
        ]
      }
    ]
  },
  {
    type: 'footer',
    children: {
      type: 'p',
      attributes: { style: { fontSize: '0.875rem', color: '#666' } },
      children: '© 2025 All rights reserved'
    }
  }
]

// Test 10: Stress test with deep recursion
export const deepRecursion = {
  type: 'div',
  children: {
    type: 'div',
    children: {
      type: 'div',
      children: {
        type: 'div',
        children: {
          type: 'div',
          children: {
            type: 'div',
            children: {
              type: 'div',
              children: {
                type: 'div',
                children: {
                  type: 'div',
                  children: {
                    type: 'div',
                    children: 'Ten levels deep!'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
