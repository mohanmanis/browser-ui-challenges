import './ConfigDrivenUI.css'

/**
 * ConfigDrivenUI Component
 * 
 * Renders UI elements based on a configuration object.
 * This demonstrates rendering React components from an object of objects
 * (not arrays with map).
 */
export default function ConfigDrivenUI({ config }) {
  if (!config || typeof config !== 'object') {
    return <div className="config-error">Invalid configuration provided</div>
  }

  // Render components from object of objects
  const renderFromConfig = () => {
    return Object.entries(config).map(([key, componentConfig]) => {
      const { type, props, children } = componentConfig

      switch (type) {
        case 'heading':
          const HeadingTag = `h${props?.level || 2}`
          return (
            <HeadingTag key={key} className="config-heading" {...props}>
              {children || props?.text}
            </HeadingTag>
          )

        case 'paragraph':
          return (
            <p key={key} className="config-paragraph" {...props}>
              {children || props?.text}
            </p>
          )

        case 'button':
          return (
            <button
              key={key}
              className="config-button"
              onClick={props?.onClick}
              {...props}
            >
              {children || props?.text}
            </button>
          )

        case 'input':
          return (
            <div key={key} className="config-input-wrapper">
              {props?.label && (
                <label htmlFor={key} className="config-label">
                  {props.label}
                </label>
              )}
              <input
                id={key}
                className="config-input"
                {...props}
              />
            </div>
          )

        case 'div':
          return (
            <div key={key} className="config-div" {...props}>
              {children}
            </div>
          )

        case 'list':
          return (
            <ul key={key} className="config-list" {...props}>
              {Array.isArray(children)
                ? children.map((item, idx) => (
                    <li key={idx} className="config-list-item">
                      {item}
                    </li>
                  ))
                : null}
            </ul>
          )

        case 'custom':
          // Allow custom components to be passed
          if (componentConfig.component) {
            const CustomComponent = componentConfig.component
            return <CustomComponent key={key} {...props}>{children}</CustomComponent>
          }
          return null

        default:
          return (
            <div key={key} className="config-unknown">
              Unknown component type: {type}
            </div>
          )
      }
    })
  }

  return <div className="config-driven-ui">{renderFromConfig()}</div>
}
