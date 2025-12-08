import { useState, useEffect, useRef } from 'react';
import { fetchTabContent } from '../utils/api';
import './AsyncTabs.css';

/**
 * AsyncTabs - Interview Simplified Version (40-min focused)
 *
 * Key Features:
 * ✅ Lazy loading - fetches content only when tab is clicked
 * ✅ Caching - avoids redundant fetches
 * ✅ Race condition handling - ensures correct content displays
 * ✅ Request cancellation - uses AbortController to cancel stale requests
 * ✅ Basic accessibility - ARIA attributes
 * ✅ URL query string sync - checkbox states reflected in URL
 *
 * @param {Object} props
 * @param {Array<{id: string, label: string}>} props.tabs - Array of tab items
 */
export default function AsyncTabs({ tabs }) {
  // Initialize activeTab from URL if present
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const tabFromUrl = params.get('tab');
    return tabFromUrl && tabs.some(t => t.id === tabFromUrl)
      ? tabFromUrl
      : tabs[0]?.id;
  });

  const [cache, setCache] = useState({}); // { tabId: content }
  const [loadingTabs, setLoadingTabs] = useState(new Set());

  // Track current request to handle race conditions
  const currentRequestRef = useRef(null);

  // AbortController to cancel previous requests
  const abortControllerRef = useRef(null);

  useEffect(() => {
    // 1. If content is cached, skip fetching
    if (cache[activeTab]) {
      return;
    }

    // 2. Cancel any previous in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 3. Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    // 4. Track this request for race condition handling
    const thisRequest = activeTab;
    currentRequestRef.current = thisRequest;

    // 5. Mark this tab as loading (async to avoid cascading renders)
    queueMicrotask(() => {
      setLoadingTabs((prev) => new Set(prev).add(activeTab));
    });

    fetchTabContent(activeTab, abortController.signal)
      .then((data) => {
        // Race condition check: only update if this is still the active tab
        if (currentRequestRef.current === thisRequest) {
          setCache((prev) => ({ ...prev, [activeTab]: data }));
          setLoadingTabs((prev) => {
            const next = new Set(prev);
            next.delete(activeTab);
            return next;
          });
        }
      })
      .catch((error) => {
        // Ignore AbortError (expected when we cancel)
        if (error.name === 'AbortError') {
          console.log(`Request for ${activeTab} was cancelled`);
          return;
        }

        // Handle other errors
        if (currentRequestRef.current === thisRequest) {
          console.error('Error fetching tab content:', error);
          setCache((prev) => ({
            ...prev,
            [activeTab]: { title: 'Error', description: 'Error loading content. Please try again.', options: [] }
          }));
          setLoadingTabs((prev) => {
            const next = new Set(prev);
            next.delete(activeTab);
            return next;
          });
        }
      });

    // 6. Cleanup: abort request if component unmounts or activeTab changes
    return () => {
      abortController.abort();
    };
  }, [activeTab, cache]);

  // Update URL helper - syncs tab and filters to URL
  const updateUrl = (tabId, filterKey) => {
    const params = new URLSearchParams(window.location.search);

    // Always set the active tab
    params.set('tab', tabId);

    // Toggle the filter
    if (params.get(filterKey) === 'true') {
      params.delete(filterKey);
    } else {
      params.set(filterKey, 'true');
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Update URL with new tab
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tabId);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };

  const handleCheckboxChange = (tabId, optionId) => {
    updateUrl(tabId, `${tabId}.${optionId}`);
  };

  if (!tabs || tabs.length === 0) {
    return <div>No tabs provided</div>;
  }

  const currentContent = cache[activeTab];

  return (
    <div className="tabs-container">
      {/* Tab List */}
      <div role="tablist" className="tab-list">
        {tabs.map((tab) => (
          <button
            id={`tab-${tab.id}`}
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => handleTabChange(tab.id)}
            className={activeTab === tab.id ? 'active' : ''}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panel */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="tab-panel"
      >
        {loadingTabs.has(activeTab) && !cache[activeTab] ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : currentContent ? (
          <div className="content">
            <h2>{currentContent.title}</h2>
            <p className="description">{currentContent.description}</p>

            {currentContent.options && currentContent.options.length > 0 && (
              <div className="options-list">
                {currentContent.options.map((option) => {
                  const params = new URLSearchParams(window.location.search);
                  const isChecked = params.get(`${activeTab}.${option.id}`) === 'true';

                  return (
                    <label key={option.id} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(activeTab, option.id)}
                      />
                      <span>{option.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
