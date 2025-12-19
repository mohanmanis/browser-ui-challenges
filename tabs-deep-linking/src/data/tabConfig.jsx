// This file demonstrates how tabsConfig would look when coming from an API
// It's plain data (no JSX/React components) - the Tabs component handles wrapping with LazyTabContent

import ConfigDrivenUI from '../components/ConfigDrivenUI'
import FormWithValidation from '../components/FormWithValidation'
import DocumentRenderer from '../components/DocumentRenderer'

// Example document JSON structure
const sampleDocument = [
  {
    id: 'doc-title',
    type: 'title',
    level: 1,
    content: 'Welcome to Document Renderer',
  },
  {
    id: 'doc-intro',
    type: 'paragraph',
    content: 'This document demonstrates rendering various elements from a JSON structure. You can create complex documents by defining elements in JSON format.',
  },
  {
    id: 'doc-image',
    type: 'image',
    src: 'https://via.placeholder.com/600x300/667eea/ffffff?text=Sample+Image',
    alt: 'Sample placeholder image',
    caption: 'This is a sample image rendered from JSON',
  },
  {
    id: 'doc-list-title',
    type: 'title',
    level: 2,
    content: 'Features',
  },
  {
    id: 'doc-list',
    type: 'unorderedList',
    items: [
      'Render images with captions',
      'Create headings of different levels',
      'Display ordered and unordered lists',
      'Add paragraphs and formatted text',
      'Include code blocks',
      'Create blockquotes',
    ],
  },
  {
    id: 'doc-code-title',
    type: 'title',
    level: 2,
    content: 'Example Code',
  },
  {
    id: 'doc-code',
    type: 'code',
    content: `const document = [
  {
    type: 'title',
    level: 1,
    content: 'My Document'
  },
  {
    type: 'paragraph',
    content: 'This is a paragraph.'
  }
]`,
  },
  {
    id: 'doc-quote',
    type: 'blockquote',
    content: 'The best way to predict the future is to invent it.',
    author: 'Alan Kay',
  },
  {
    id: 'doc-link',
    type: 'link',
    href: 'https://example.com',
    content: 'Visit our website',
    target: '_blank',
  },
]

// Config-driven UI example (object of objects, not array)
const configDrivenConfig = {
  heading1: {
    type: 'heading',
    props: {
      level: 2,
      text: 'Config-Driven UI Example',
    },
  },
  paragraph1: {
    type: 'paragraph',
    props: {
      text: 'This UI is rendered from an object of objects configuration. Each key represents a component, and the value contains its type, props, and children.',
    },
  },
  input1: {
    type: 'input',
    props: {
      label: 'Your Name',
      type: 'text',
      placeholder: 'Enter your name',
    },
  },
  button1: {
    type: 'button',
    props: {
      text: 'Click Me',
      onClick: () => alert('Button clicked!'),
    },
  },
  list1: {
    type: 'list',
    children: [
      'Component 1',
      'Component 2',
      'Component 3',
    ],
  },
}

/**
 * Tab configuration object (object of objects, not array)
 * 
 * When coming from an API, the structure would be plain JSON like:
 * {
 *   "home": {
 *     "label": "Home",
 *     "lazyLoad": true,
 *     "content": "FormWithValidation"  // Component name as string
 *   },
 *   "about": {
 *     "label": "About",
 *     "lazyLoad": false,
 *     "content": "ConfigDrivenUI",
 *     "props": { "config": {...} }
 *   }
 * }
 * 
 * The Tabs component handles:
 * 1. Wrapping with LazyTabContent when lazyLoad is true
 * 2. Resolving component names (strings) from componentRegistry
 * 3. Rendering components with props
 */
export const tabsConfig = {
  home: {
    label: 'Home',
    lazyLoad: true, // This tells Tabs component to wrap with LazyTabContent
    // fetchData can be provided per tab, or defaults to fetchTabContent
    content: (
      <div>
        <h2>Home Tab</h2>
        <p>This content will be lazy loaded when the tab becomes visible.</p>
      </div>
    ),
  },
  about: {
    label: 'About',
    lazyLoad: true,
    content: (
      <div>
        <h2>About Tab</h2>
        <p>Lazy loading content for the About tab.</p>
      </div>
    ),
  },
  services: {
    label: 'Services',
    lazyLoad: true,
    content: (
      <div>
        <h2>Services Tab</h2>
        <p>Lazy loading content for the Services tab.</p>
      </div>
    ),
  },
  config: {
    label: 'Config UI',
    lazyLoad: false, // No lazy loading for this tab
    content: (
      <div>
        <h2>Config-Driven UI</h2>
        <p>This tab demonstrates rendering UI components from an object of objects configuration.</p>
        <ConfigDrivenUI config={configDrivenConfig} />
      </div>
    ),
  },
  form: {
    label: 'Form',
    lazyLoad: false,
    // Can pass component as a function reference
    content: FormWithValidation,
  },
  document: {
    label: 'Document',
    lazyLoad: false,
    content: (
      <div>
        <h2>Document Renderer</h2>
        <p>This tab demonstrates rendering a document structure from JSON.</p>
        <DocumentRenderer document={sampleDocument} />
      </div>
    ),
  },
}
