import { useState, useEffect, useCallback } from 'react'
import LazyTabContent from './LazyTabContent'
import { fetchTabContent } from '../utils/api'
import { componentRegistry } from '../data/componentRegistry'
import './Tabs.css'

/**
 * Tabs Component with Deep Linking
 * 
 * Features:
 * - Deep linking via URL query parameters (?tab=tabName)
 * - Restores active tab on page reload
 * - Uses URLSearchParams API
 * - Renders tabs from object of objects (not arrays)
 * 
 * Query Params vs Hash Params:
 * - Query params (?tab=home): Better for SEO, server-side accessible, can be bookmarked
 * - Hash params (#tab=home): Client-side only, doesn't trigger page reload, simpler for SPAs
 * 
 * We use query params here because:
 * 1. Better for sharing/bookmarking specific tabs
 * 2. Server can read the tab state if needed
 * 3. More standard for RESTful URLs
 */
export default function Tabs({ tabs, defaultTab, children }) {
  // Get initial tab from URL or use default
  const getInitialTab = () => {
    // Check if we're in browser environment (handles Next.js SSR)
    if (typeof window === 'undefined') {
      return defaultTab || Object.keys(tabs)[0]
    }

    const params = new URLSearchParams(window.location.search)
    const tabFromUrl = params.get('tab')
    
    // Validate that the tab exists in our tabs object
    if (tabFromUrl && tabs[tabFromUrl]) {
      return tabFromUrl
    }
    
    return defaultTab || Object.keys(tabs)[0]
  }

  const [activeTab, setActiveTab] = useState(getInitialTab)

  // Update URL when tab changes (without page reload)
  const updateUrl = useCallback((tabId) => {
    if (typeof window === 'undefined') return

    const url = new URL(window.location.href)
    url.searchParams.set('tab', tabId)
    window.history.pushState({}, '', url)
  }, [])

  // Handle browser back/forward buttons
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const tabFromUrl = params.get('tab')
      if (tabFromUrl && tabs[tabFromUrl]) {
        setActiveTab(tabFromUrl)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [tabs])

  // Sync URL on mount if no tab param exists
  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    if (!params.get('tab')) {
      updateUrl(activeTab)
    }
  }, [activeTab, updateUrl])

  const handleTabClick = useCallback((tabId) => {
    setActiveTab(tabId)
    updateUrl(tabId)
  }, [updateUrl])

  // Render tabs from object of objects
  const renderTabs = () => {
    return Object.entries(tabs).map(([tabId, tabConfig]) => (
      <button
        key={tabId}
        className={`tabs__button ${activeTab === tabId ? 'tabs__button--active' : ''}`}
        onClick={() => handleTabClick(tabId)}
        role="tab"
        aria-selected={activeTab === tabId}
        aria-controls={`tabpanel-${tabId}`}
        id={`tab-${tabId}`}
      >
        {tabConfig.label}
      </button>
    ))
  }

  // Render content for active tab
  const renderContent = () => {
    const activeTabConfig = tabs[activeTab]
    if (!activeTabConfig) return null

    // Determine what content to render
    let content = null

    // If lazyLoad is true, wrap content with LazyTabContent
    if (activeTabConfig.lazyLoad) {
      // Get the actual content (could be JSX, component name string, or component reference)
      let tabContent = activeTabConfig.content || activeTabConfig.children
      
      // If content is a string (component name from API), resolve it from registry
      if (typeof tabContent === 'string' && componentRegistry[tabContent]) {
        const Component = componentRegistry[tabContent]
        tabContent = <Component {...(activeTabConfig.props || {})} />
      }
      // If content is a component function/class
      else if (typeof tabContent === 'function') {
        const Component = tabContent
        tabContent = <Component {...(activeTabConfig.props || {})} />
      }

      content = (
        <LazyTabContent
          tabId={activeTab}
          fetchData={activeTabConfig.fetchData || fetchTabContent}
        >
          {tabContent || null}
        </LazyTabContent>
      )
    } 
    // Not lazy loaded - render directly
    else {
      // If content is a string (component name from API), resolve it from registry
      if (typeof activeTabConfig.content === 'string' && componentRegistry[activeTabConfig.content]) {
        const Component = componentRegistry[activeTabConfig.content]
        content = <Component {...(activeTabConfig.props || {})} />
      }
      // If content is a React component (function/class)
      else if (typeof activeTabConfig.content === 'function') {
        const ContentComponent = activeTabConfig.content
        content = <ContentComponent {...(activeTabConfig.props || {})} />
      }
      // If content is JSX element or other
      else {
        content = activeTabConfig.content || activeTabConfig.children || null
      }
    }

    return (
      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="tabs__panel"
      >
        {content || children}
      </div>
    )
  }

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist">
        {renderTabs()}
      </div>
      {renderContent()}
    </div>
  )
}
