import './DocumentRenderer.css'

/**
 * DocumentRenderer Component
 * 
 * Renders a document structure from a JSON configuration.
 * Supports various document elements: image, title, unordered list, etc.
 */
export default function DocumentRenderer({ document }) {
  if (!document || typeof document !== 'object') {
    return <div className="document-error">Invalid document structure</div>
  }

  const renderElement = (element, index) => {
    if (!element || !element.type) {
      return null
    }

    const key = element.id || `element-${index}`

    switch (element.type) {
      case 'title':
        const HeadingTag = `h${element.level || 1}`
        return (
          <HeadingTag key={key} className="document-title" style={element.style}>
            {element.content}
          </HeadingTag>
        )

      case 'paragraph':
        return (
          <p key={key} className="document-paragraph" style={element.style}>
            {element.content}
          </p>
        )

      case 'image':
        return (
          <div key={key} className="document-image-wrapper">
            <img
              src={element.src}
              alt={element.alt || ''}
              className="document-image"
              style={element.style}
            />
            {element.caption && (
              <p className="document-image-caption">{element.caption}</p>
            )}
          </div>
        )

      case 'unorderedList':
      case 'ul':
        return (
          <ul key={key} className="document-list" style={element.style}>
            {Array.isArray(element.items)
              ? element.items.map((item, idx) => (
                  <li key={idx} className="document-list-item">
                    {item}
                  </li>
                ))
              : null}
          </ul>
        )

      case 'orderedList':
      case 'ol':
        return (
          <ol key={key} className="document-list document-list--ordered" style={element.style}>
            {Array.isArray(element.items)
              ? element.items.map((item, idx) => (
                  <li key={idx} className="document-list-item">
                    {item}
                  </li>
                ))
              : null}
          </ol>
        )

      case 'divider':
      case 'hr':
        return <hr key={key} className="document-divider" style={element.style} />

      case 'link':
        return (
          <a
            key={key}
            href={element.href}
            target={element.target || '_self'}
            rel={element.rel || ''}
            className="document-link"
            style={element.style}
          >
            {element.content || element.href}
          </a>
        )

      case 'code':
        return (
          <pre key={key} className="document-code">
            <code>{element.content}</code>
          </pre>
        )

      case 'blockquote':
        return (
          <blockquote key={key} className="document-blockquote" style={element.style}>
            {element.content}
            {element.author && (
              <cite className="document-blockquote-author">— {element.author}</cite>
            )}
          </blockquote>
        )

      case 'container':
      case 'div':
        return (
          <div key={key} className="document-container" style={element.style}>
            {Array.isArray(element.children)
              ? element.children.map((child, idx) => renderElement(child, idx))
              : null}
          </div>
        )

      default:
        return (
          <div key={key} className="document-unknown">
            Unknown element type: {element.type}
          </div>
        )
    }
  }

  // Handle both array and object structures
  const elements = Array.isArray(document) 
    ? document 
    : document.elements || [document]

  return (
    <article className="document-renderer">
      {elements.map((element, index) => renderElement(element, index))}
    </article>
  )
}
