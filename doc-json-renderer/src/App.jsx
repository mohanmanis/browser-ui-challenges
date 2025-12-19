import './App.css'
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx'
import DocumentRenderer from './components/DocumentRenderer.jsx'
import { sampleDocument } from './data/sampleDocument.js'

function AppShell() {
  const { mode, toggle } = useTheme()

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="badge">doc-json-renderer</p>
          <h1>JSON → Document Renderer</h1>
          <p className="subtitle">
            Feed in a tree of component data (type, attributes, children) and render a fully styled document.
          </p>
        </div>
        <button className="theme-toggle" onClick={toggle}>
          Theme: {mode === 'light' ? 'Light' : 'Dark'}
        </button>
      </header>

      <main className="app-main">
        <section className="app-left">
          <h2 className="section-title">Rendered document</h2>
          <DocumentRenderer tree={sampleDocument} />
        </section>
        <section className="app-right">
          <h2 className="section-title">JSON input</h2>
          <pre className="json-viewer">{JSON.stringify(sampleDocument, null, 2)}</pre>
        </section>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  )
}
