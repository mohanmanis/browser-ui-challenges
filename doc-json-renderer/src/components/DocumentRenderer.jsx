import PropTypes from 'prop-types'
import { useTheme } from '../context/ThemeContext.jsx'
import './DocumentRenderer.css'

// Recursive node renderer
function renderNode(node, index) {
  if (!node) return null

  // Handle primitive values (strings, numbers)
  if (typeof node !== 'object') {
    return node
  }

  const { type, attributes = {}, children = [] } = node
  const key = node.id || `${type}-${index}`

  const commonProps = {
    key,
    ...attributes,
  }

  // Handle different types of children
  let childContent
  if (Array.isArray(children)) {
    // Array of children - recursively render each
    childContent = children.map((child, idx) => renderNode(child, idx))
  } else if (typeof children === 'object' && children !== null) {
    // Single object child - recursively render it
    childContent = renderNode(children, 0)
  } else {
    // Primitive value (string, number, etc.)
    childContent = children
  }

  switch (type) {
    case 'h1':
      return <h1 {...commonProps}>{childContent}</h1>
    case 'h2':
      return <h2 {...commonProps}>{childContent}</h2>
    case 'h3':
      return <h3 {...commonProps}>{childContent}</h3>
    case 'h4':
      return <h4 {...commonProps}>{childContent}</h4>
    case 'h5':
      return <h5 {...commonProps}>{childContent}</h5>
    case 'h6':
      return <h6 {...commonProps}>{childContent}</h6>
    case 'p':
      return <p {...commonProps}>{childContent}</p>
    case 'span':
    case 'text':
      return <span {...commonProps}>{childContent}</span>
    case 'strong':
    case 'b':
      return <strong {...commonProps}>{childContent}</strong>
    case 'em':
    case 'i':
      return <em {...commonProps}>{childContent}</em>
    case 'img':
      return <img {...commonProps} />
    case 'ul':
      return <ul {...commonProps}>{childContent}</ul>
    case 'ol':
      return <ol {...commonProps}>{childContent}</ol>
    case 'li':
      return <li {...commonProps}>{childContent}</li>
    case 'a':
      return <a {...commonProps}>{childContent}</a>
    case 'button':
      return <button {...commonProps}>{childContent}</button>
    case 'section':
      return <section {...commonProps}>{childContent}</section>
    case 'article':
      return <article {...commonProps}>{childContent}</article>
    case 'header':
      return <header {...commonProps}>{childContent}</header>
    case 'footer':
      return <footer {...commonProps}>{childContent}</footer>
    case 'div':
    case 'container':
    default:
      return <div {...commonProps}>{childContent}</div>
  }
}

export function DocumentRenderer({ tree }) {
  const { mode } = useTheme()

  const nodes = Array.isArray(tree) ? tree : [tree]

  return (
    <article className={`doc-root doc-root--${mode}`}>
      {nodes.map((node, index) => renderNode(node, index))}
    </article>
  )
}

DocumentRenderer.propTypes = {
  tree: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
}

export default DocumentRenderer
