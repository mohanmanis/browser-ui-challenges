import { useState, useEffect, useRef, useCallback } from 'react'
import './LazyTabContent.css'

/**
 * LazyTabContent Component
 * 
 * Lazy loads content only when the tab panel becomes visible.
 * Uses Intersection Observer API for efficient lazy loading.
 */
export default function LazyTabContent({ tabId, fetchData, children }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const panelRef = useRef(null)
  const hasLoadedRef = useRef(false)

  const loadData = useCallback(async () => {
    if (!fetchData) return

    setLoading(true)
    setError(null)

    try {
      const result = await fetchData(tabId)
      setData(result)
    } catch (err) {
      setError(err.message || 'Failed to load content')
    } finally {
      setLoading(false)
    }
  }, [tabId, fetchData])

  useEffect(() => {
    // Reset state when tab changes
    setData(null)
    setError(null)
    hasLoadedRef.current = false

    // panelRef.current is guaranteed to be set at this point because:
    // 1. React sets refs synchronously during render
    // 2. useEffect runs after render, so the ref is already attached
    if (!panelRef.current) {
      console.warn('panelRef.current is null - this should not happen')
      return
    }

    // Use Intersection Observer to detect when tab panel is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only load once when panel becomes visible
          if (entry.isIntersecting && !hasLoadedRef.current && fetchData) {
            hasLoadedRef.current = true
            loadData()
          }
        })
      },
      { threshold: 0.1 } // Trigger when 10% visible
    )

    observer.observe(panelRef.current)

    return () => {
      observer.disconnect()
    }
  }, [tabId, fetchData, loadData])

  // If no fetchData provided, render children immediately
  if (!fetchData) {
    return <div ref={panelRef}>{children}</div>
  }

  return (
    <div ref={panelRef} className="lazy-tab-content">
      {loading && (
        <div className="lazy-tab-content__loading">
          <div className="spinner"></div>
          <p>Loading content...</p>
        </div>
      )}
      
      {error && (
        <div className="lazy-tab-content__error" role="alert">
          <p>Error: {error}</p>
          <button onClick={loadData} className="retry-button">
            Retry
          </button>
        </div>
      )}
      
      {data && !loading && (
        <div className="lazy-tab-content__data">
          {typeof data === 'string' ? (
            <p>{data}</p>
          ) : (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )}
        </div>
      )}
      
      {!data && !loading && !error && children}
    </div>
  )
}
