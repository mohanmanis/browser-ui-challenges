import PropTypes from 'prop-types'
import { useTheme } from '../context/ThemeContext.jsx'
import './DocumentRenderer.css'

// Recursive node renderer
function renderNode(node, index) {
  if (!node) return null

  const { type, attributes = {}, children = [] } = node
  const key = node.id || `${type}-${index}`

  const commonProps = {
    key,
    ...attributes,
  }

  const childContent = Array.isArray(children)
    ? children.map((child, idx) => renderNode(child, idx))
    : children

  switch (type) {
    case 'h1':
      return <h1 {...commonProps}>{childContent}</h1>
    case 'h2':
      return <h2 {...commonProps}>{childContent}</h2>
    case 'p':
      return <p {...commonProps}>{childContent}</p>
    case 'img':
      return <img {...commonProps} />
    case 'ul':
      return <ul {...commonProps}>{childContent}</ul>
    case 'li':
      return <li {...commonProps}>{childContent}</li>
    case 'text':
      return <span {...commonProps}>{childContent}</span>
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
