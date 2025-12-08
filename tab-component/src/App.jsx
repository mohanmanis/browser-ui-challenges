import AsyncTabs from './components/AsyncTabs'
import './App.css'

function App() {
  // Example tab data
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
    { id: 'blog', label: 'Blog' },
    { id: 'portfolio', label: 'Portfolio' },
  ]

  return (
    <div className="app">
      <header className="app-header">
        <h1>Async Tabs Component</h1>
        <p className="app-description">
          A reusable tab component with lazy loading, caching, and race condition handling.
          Click on tabs to see content load asynchronously. Try rapidly switching tabs to test race condition handling.
        </p>
      </header>
      
      <div className="app-content">
        <AsyncTabs tabs={tabs} defaultTabId="home" />
      </div>
      
      <footer className="app-footer">
        <div className="app-features">
          <h3>Features:</h3>
          <ul>
            <li>✅ Lazy loading - Content fetched only when tab is clicked</li>
            <li>✅ Caching - Previously loaded content is cached and shown instantly</li>
            <li>✅ Race condition handling - Rapid tab switching shows correct content</li>
            <li>✅ Loading states - Visual feedback during data fetching</li>
            <li>✅ Accessibility - Full keyboard navigation and ARIA support</li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default App
