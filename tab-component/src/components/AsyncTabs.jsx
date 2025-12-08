import { useState, useEffect, useRef } from 'react';
import { fetchTabContent } from '../utils/api';
import './AsyncTabs.css';

/**
 * AsyncTabs Component
 *
 * A reusable tab component that:
 * - Lazy-loads content only when a tab is clicked
 * - Caches fetched content to avoid re-fetching
 * - Handles race conditions when users rapidly switch tabs
 * - Shows loading states during data fetching
 * - Is fully accessible (ARIA attributes, keyboard navigation)
 * - Handles component unmounting gracefully
 *
 * Race Condition Handling:
 * ========================
 * Scenario: User clicks Tab 1 (slow, 5s) then immediately clicks Tab 2 (fast, 1s)
 *
 * Flow:
 * 1. Tab 1 clicked → requestCounterRef.current = 1, fetch starts
 * 2. Tab 2 clicked → requestCounterRef.current = 2, fetch starts
 * 3. Tab 2 finishes (1s) → checks: currentRequestId (2) === requestCounterRef.current (2) ✓
 *    → Updates state with Tab 2 content
 * 4. Tab 1 finishes (5s) → checks: currentRequestId (1) === requestCounterRef.current (2) ✗
 *    → Ignores stale result, Tab 2 content remains displayed
 *
 * @param {Object} props
 * @param {Array<{id: string, label: string}>} props.tabs - Array of tab items
 * @param {string} [props.defaultTabId] - Optional default active tab ID
 */
export default function AsyncTabs({ tabs, defaultTabId }) {
  // Active tab state
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id || '');

  // Content cache: stores fetched content by tab ID
  const [contentCache, setContentCache] = useState({});

  // Loading state: tracks which tab is currently loading
  const [loadingTabId, setLoadingTabId] = useState(null);

  // Request counter to handle race conditions
  // Each fetch gets a unique request ID, only the latest request's result is used
  const requestCounterRef = useRef(0);

  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true);

  // Fetch content for a specific tab
  const fetchContent = async (tabId) => {
    // If content is already cached, don't fetch again
    if (contentCache[tabId]) {
      return;
    }

    // Increment request counter for this fetch
    // This ensures each request has a unique ID
    const currentRequestId = ++requestCounterRef.current;

    // Set loading state (only if still mounted)
    if (isMountedRef.current) {
      setLoadingTabId(tabId);
    }

    try {
      const data = await fetchTabContent(tabId);

      // Race condition check: only update if this is still the latest request
      // AND the component is still mounted
      // AND this request is for the currently active tab (or we still want to cache it)
      if (
        currentRequestId === requestCounterRef.current &&
        isMountedRef.current
      ) {
        setContentCache(prev => ({
          ...prev,
          [tabId]: data,
        }));
        setLoadingTabId(null);
      }
      // If requestCounterRef.current > currentRequestId, a newer request was made
      // and we should ignore this stale result
    } catch (error) {
      // Only handle error if this is still the latest request AND component is mounted
      if (
        currentRequestId === requestCounterRef.current &&
        isMountedRef.current
      ) {
        console.error(`Error fetching content for tab ${tabId}:`, error);
        setContentCache(prev => ({
          ...prev,
          [tabId]: {
            id: tabId,
            content: 'Error loading content. Please try again.',
            error: true
          },
        }));
        setLoadingTabId(null);
      }
    }
  };

  // Handle tab click
  const handleTabClick = (tabId) => {
    setActiveTabId(tabId);

    // Fetch content if not already cached
    if (!contentCache[tabId]) {
      fetchContent(tabId);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event, tabId, index) => {
    let targetIndex = index;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        targetIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        event.preventDefault();
        targetIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        targetIndex = tabs.length - 1;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleTabClick(tabId);
        return;
      default:
        return;
    }

    const targetTab = tabs[targetIndex];
    if (targetTab) {
      handleTabClick(targetTab.id);
      // Focus the new tab button
      const tabButton = event.target.closest('.async-tabs').querySelector(
        `[role="tab"][aria-controls="tabpanel-${targetTab.id}"]`
      );
      if (tabButton) {
        tabButton.focus();
      }
    }
  };

  // Fetch content for the active tab on mount or when active tab changes
  useEffect(() => {
    if (activeTabId && !contentCache[activeTabId]) {
      fetchContent(activeTabId);
    }
    // Note: We intentionally don't include contentCache in dependencies
    // because we only want to fetch when activeTabId changes, not when cache updates
    // The fetchContent function checks the cache internally before fetching
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabId]);

  // Cleanup: mark component as unmounted to prevent state updates
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      // Note: We don't cancel the fetch here because:
      // 1. The race condition check (requestCounterRef) already prevents stale updates
      // 2. The isMountedRef check prevents state updates after unmount
      // 3. In a real app with AbortController, you'd cancel the request here
    };
  }, []);

  if (!tabs || tabs.length === 0) {
    return <div className="async-tabs-empty">No tabs provided</div>;
  }

  const activeTab = tabs.find(tab => tab.id === activeTabId);
  const activeContent = contentCache[activeTabId];
  const isLoading = loadingTabId === activeTabId && !activeContent;

  return (
    <div className="async-tabs">
      <div
        className="async-tabs__list"
        role="tablist"
        aria-label="Tabs"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTabId;
          const isTabLoading = loadingTabId === tab.id && !contentCache[tab.id];

          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              // aria-selected: Indicates whether this tab is currently selected/active
              // Required for screen readers to announce the active tab state
              aria-selected={isActive}
              // aria-controls: Links this tab button to its associated content panel
              // Tells assistive technologies which panel this tab controls
              aria-controls={`tabpanel-${tab.id}`}
              // aria-expanded: Indicates whether the controlled panel is expanded/visible
              // Helps screen readers understand if the tab's content is currently shown
              aria-expanded={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`async-tabs__tab ${isActive ? 'async-tabs__tab--active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, tab.id, index)}
              disabled={isTabLoading}
            >
              <span className="async-tabs__tab-label">{tab.label}</span>
              {isTabLoading && (
                <span className="async-tabs__tab-loader" aria-hidden="true">
                  <span className="spinner"></span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        id={`tabpanel-${activeTabId}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTabId}`}
        className="async-tabs__panel"
        hidden={!activeTab}
      >
        {isLoading ? (
          <div className="async-tabs__loading" role="status" aria-live="polite">
            <div className="spinner spinner--large"></div>
            <p>Loading content...</p>
          </div>
        ) : activeContent ? (
          <div className="async-tabs__content">
            {activeContent.error ? (
              <div className="async-tabs__error" role="alert">
                {activeContent.content}
              </div>
            ) : (
              <div className="async-tabs__content-text">
                {activeContent.content}
              </div>
            )}
            {activeContent.timestamp && (
              <div className="async-tabs__content-meta">
                <small>Loaded at: {new Date(activeContent.timestamp).toLocaleTimeString()}</small>
              </div>
            )}
          </div>
        ) : (
          <div className="async-tabs__empty">
            No content available
          </div>
        )}
      </div>
    </div>
  );
}
