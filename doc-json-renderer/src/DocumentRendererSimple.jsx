import { useState } from 'react';
import './DocumentRendererSimple.css';

// Sample document data - inline for interview
const sampleDocument = [
  { type: 'h1', children: 'Document Renderer Demo' },
  { type: 'h2', children: 'Render HTML from JSON Structure' },
  { type: 'p', children: 'This component recursively renders HTML elements from a JSON tree structure. It supports nested children and various element types.' },
  {
    type: 'ul',
    children: [
      { type: 'li', children: 'Supports headings (h1-h6)' },
      { type: 'li', children: 'Paragraphs and text' },
      { type: 'li', children: 'Lists (ul, ol, li)' },
      { type: 'li', children: 'Images and divs' },
      { type: 'li', children: 'Nested structures' },
    ],
  },
  {
    type: 'h2',
    children: 'Example: Nested Content',
  },
  {
    type: 'div',
    attributes: { className: 'highlight-box' },
    children: {
      type: 'p',
      children: 'This paragraph is inside a div (single object child)',
    },
  },
  {
    type: 'p',
    children: [
      'This paragraph has ',
      { type: 'strong', children: 'bold text' },
      ' and ',
      { type: 'em', children: 'italic text' },
      ' mixed together.',
    ],
  },
  {
    type: 'img',
    attributes: {
      src: '/vite.svg',
      alt: 'Vite logo',
      className: 'demo-image',
    },
  },
];

// Recursive render function
function renderNode(node, index) {
  if (!node) return null;

  // Handle primitive values (strings, numbers)
  if (typeof node !== 'object') {
    return node;
  }

  const { type, attributes = {}, children } = node;
  const key = node.id || `${type}-${index}`;

  const props = { key, ...attributes };

  // Process children recursively
  let childContent;
  if (Array.isArray(children)) {
    childContent = children.map((child, idx) => renderNode(child, idx));
  } else if (typeof children === 'object' && children !== null) {
    childContent = renderNode(children, 0);
  } else {
    childContent = children;
  }

  // Render based on type
  switch (type) {
    case 'h1':
      return <h1 {...props}>{childContent}</h1>;
    case 'h2':
      return <h2 {...props}>{childContent}</h2>;
    case 'h3':
      return <h3 {...props}>{childContent}</h3>;
    case 'p':
      return <p {...props}>{childContent}</p>;
    case 'strong':
      return <strong {...props}>{childContent}</strong>;
    case 'em':
      return <em {...props}>{childContent}</em>;
    case 'ul':
      return <ul {...props}>{childContent}</ul>;
    case 'ol':
      return <ol {...props}>{childContent}</ol>;
    case 'li':
      return <li {...props}>{childContent}</li>;
    case 'img':
      return <img {...props} />;
    case 'div':
    default:
      return <div {...props}>{childContent}</div>;
  }
}

export default function DocumentRendererSimple() {
  const [theme, setTheme] = useState('light');

  return (
    <div className={`app ${theme}`}>
      <div className="header">
        <h1>📄 Document Renderer</h1>
        <p>Interview-Ready Solution</p>
        <button className="theme-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? '🌙' : '☀️'} {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      <div className="container">
        <div className="section">
          <h2>Rendered Document</h2>
          <div className="document">
            {sampleDocument.map((node, idx) => renderNode(node, idx))}
          </div>
        </div>

        <div className="section">
          <h2>JSON Structure</h2>
          <pre className="json-display">{JSON.stringify(sampleDocument, null, 2)}</pre>
        </div>
      </div>

      <div className="requirements">
        <h3>✅ Requirements Met:</h3>
        <ul>
          <li>✓ Recursive node rendering</li>
          <li>✓ Handles string children</li>
          <li>✓ Handles object children (single)</li>
          <li>✓ Handles array children</li>
          <li>✓ Supports attributes (className, src, etc.)</li>
          <li>✓ Multiple element types (h1-h3, p, ul, li, img, div, strong, em)</li>
          <li>✓ Theme support (light/dark)</li>
        </ul>
      </div>
    </div>
  );
}
