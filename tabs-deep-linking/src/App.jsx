import { useState, useEffect } from 'react'
import Tabs from './components/Tabs'
import { tabsConfig } from './data/tabConfig'
import './App.css'

function App() {
  const [currentUrl, setCurrentUrl] = useState('')

  // Update displayed URL when it changes (for demo purposes)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
      
      const handleLocationChange = () => {
        setCurrentUrl(window.location.href)
      }
      
      // Listen for URL changes
      window.addEventListener('popstate', handleLocationChange)
      
      return () => {
        window.removeEventListener('popstate', handleLocationChange)
      }
    }
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tabs with Deep Linking</h1>
        <p>
          A comprehensive tab component with URL query params, lazy loading, 
          config-driven UI, form validation, and document rendering
        </p>
      </header>

      <div className="app-content">
        <div className="info-section">
          <h3>🔗 Deep Linking</h3>
          <p>
            The active tab is stored in the URL query parameter (<code>?tab=tabName</code>). 
            Try changing tabs and refreshing the page - your selected tab will be restored!
          </p>
          <p>
            <strong>Current URL:</strong> <code>{currentUrl}</code>
          </p>
          <p>
            <strong>Query Params vs Hash Params:</strong>
          </p>
          <ul className="features-list">
            <li>
              <strong>Query Params (?tab=home):</strong> Better for SEO, server-side accessible, 
              can be bookmarked and shared. Used in this project.
            </li>
            <li>
              <strong>Hash Params (#tab=home):</strong> Client-side only, doesn't trigger page reload, 
              simpler for SPAs, but not accessible server-side.
            </li>
          </ul>
        </div>

        <div className="info-section">
          <h3>✨ Features</h3>
          <ul className="features-list">
            <li>Deep linking via URL query parameters using URLSearchParams API</li>
            <li>Tab state persists on page reload</li>
            <li>Lazy loading content when tab panel becomes visible</li>
            <li>Config-driven UI rendering from object of objects (not arrays)</li>
            <li>Form validation with real-time error messages</li>
            <li>Document renderer that renders JSON structure (images, titles, lists, etc.)</li>
            <li>Browser back/forward button support</li>
            <li>Accessible with ARIA attributes</li>
          </ul>
        </div>

        <Tabs tabs={tabsConfig} defaultTab="home" />
      </div>
    </div>
  )
}

export default App
