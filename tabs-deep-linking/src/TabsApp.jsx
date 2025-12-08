import { useState, useEffect } from 'react';
import './TabsApp.css';

// Mock API function - simulates lazy loading content
const fetchTabContent = (tabId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const content = {
        home: { title: 'Home', description: 'Welcome to the home tab! This content was loaded lazily.' },
        about: { title: 'About', description: 'Learn about our company and mission. Loaded on demand!' },
        services: { title: 'Services', description: 'Explore our services. This tab loads content when first clicked.' },
        contact: { title: 'Contact', description: 'Get in touch with us. Content loaded dynamically!' },
      };
      resolve(content[tabId] || { title: 'Not Found', description: 'Content not available' });
    }, 800); // Simulate network delay
  });
};

export default function TabsApp() {
  // Get initial tab from URL query params
  const getInitialTab = () => {
    const params = new URLSearchParams(window.location.search);
    const tabFromUrl = params.get('tab');
    return tabFromUrl || 'home';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [tabContent, setTabContent] = useState({});
  const [loading, setLoading] = useState({});

  // Tab configuration
  const tabs = {
    home: { label: 'Home', icon: '🏠' },
    about: { label: 'About', icon: '📖' },
    services: { label: 'Services', icon: '⚙️' },
    contact: { label: 'Contact', icon: '📧' },
  };

  // Update URL when tab changes (Deep Linking)
  const updateUrl = (tabId) => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabId);
    window.history.pushState({}, '', url);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tabFromUrl = params.get('tab');
      if (tabFromUrl && tabs[tabFromUrl]) {
        setActiveTab(tabFromUrl);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get('tab')) {
      updateUrl(activeTab);
    }
  }, []);

  // Lazy load tab content when tab is activated
  useEffect(() => {
    if (!tabContent[activeTab] && !loading[activeTab]) {
      setLoading((prev) => ({ ...prev, [activeTab]: true }));
      
      fetchTabContent(activeTab).then((data) => {
        setTabContent((prev) => ({ ...prev, [activeTab]: data }));
        setLoading((prev) => ({ ...prev, [activeTab]: false }));
      });
    }
  }, [activeTab]);

  // Handle tab click
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    updateUrl(tabId);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Tabs with Deep Linking</h1>
          <p>URL-based tab state + Lazy loading content</p>
          <div className="url-display">
            <strong>Current URL:</strong> <code>{window.location.href}</code>
          </div>
        </header>

        <div className="info-box">
          <h3>🎯 Key Features</h3>
          <ul>
            <li>
              <strong>Deep Linking:</strong> Tab state stored in URL query params (<code>?tab=home</code>)
            </li>
            <li>
              <strong>State Persistence:</strong> Refresh the page - tab stays selected!
            </li>
            <li>
              <strong>Browser Navigation:</strong> Back/forward buttons work
            </li>
            <li>
              <strong>Lazy Loading:</strong> Content loads only when tab is first clicked
            </li>
          </ul>
        </div>

        {/* Tab Buttons */}
        <div className="tabs">
          <div className="tabs-list" role="tablist">
            {Object.entries(tabs).map(([tabId, tabConfig]) => (
              <button
                key={tabId}
                className={`tab-button ${activeTab === tabId ? 'active' : ''}`}
                onClick={() => handleTabClick(tabId)}
                role="tab"
                aria-selected={activeTab === tabId}
              >
                <span className="tab-icon">{tabConfig.icon}</span>
                {tabConfig.label}
                {tabContent[tabId] && <span className="loaded-indicator">✓</span>}
              </button>
            ))}
          </div>

          {/* Tab Panel */}
          <div className="tab-panel" role="tabpanel">
            {loading[activeTab] ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Loading {tabs[activeTab].label} content...</p>
              </div>
            ) : tabContent[activeTab] ? (
              <div className="content">
                <h2>{tabContent[activeTab].title}</h2>
                <p>{tabContent[activeTab].description}</p>
                <div className="content-meta">
                  <small>
                    ✓ Content loaded{' '}
                    {tabContent[activeTab].loadedAt
                      ? new Date(tabContent[activeTab].loadedAt).toLocaleTimeString()
                      : 'just now'}
                  </small>
                </div>
              </div>
            ) : (
              <div className="empty">
                <p>No content available</p>
              </div>
            )}
          </div>
        </div>

        <div className="technical-notes">
          <h3>📝 Technical Implementation</h3>
          <div className="code-section">
            <h4>1. URLSearchParams API</h4>
            <pre>
{`// Read from URL
const params = new URLSearchParams(window.location.search);
const tab = params.get('tab');

// Write to URL
const url = new URL(window.location.href);
url.searchParams.set('tab', 'home');
window.history.pushState({}, '', url);`}
            </pre>
          </div>

          <div className="code-section">
            <h4>2. Query Params vs Hash Params</h4>
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Query Params (?tab=home)</th>
                  <th>Hash Params (#tab=home)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SEO Friendly</td>
                  <td>✅ Yes</td>
                  <td>❌ No</td>
                </tr>
                <tr>
                  <td>Server Access</td>
                  <td>✅ Yes</td>
                  <td>❌ Client only</td>
                </tr>
                <tr>
                  <td>Shareable</td>
                  <td>✅ Yes</td>
                  <td>⚠️ Limited</td>
                </tr>
                <tr>
                  <td>Page Reload</td>
                  <td>⚠️ May trigger</td>
                  <td>✅ No reload</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="code-section">
            <h4>3. Lazy Loading Strategy</h4>
            <pre>
{`useEffect(() => {
  // Only load if content not already loaded
  if (!tabContent[activeTab]) {
    setLoading(true);
    fetchTabContent(activeTab).then(data => {
      setTabContent(prev => ({ ...prev, [activeTab]: data }));
      setLoading(false);
    });
  }
}, [activeTab]);`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

