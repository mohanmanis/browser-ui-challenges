import { useState, useEffect } from 'react';
import './TabsSimple.css';

// Mock API - simulates fetching tab content
const fetchTabData = async (tabName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        home: 'Welcome to the Home tab! This content was loaded from API.',
        profile: 'This is your Profile. Data loaded lazily when you first clicked this tab.',
        settings: 'Settings panel. Loaded on-demand to improve performance.',
      };
      resolve(data[tabName] || 'No content');
    }, 500);
  });
};

export default function TabsSimple() {
  // Get initial tab from URL query params
  const getTabFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'home';
  };

  const [activeTab, setActiveTab] = useState(getTabFromUrl);
  const [tabData, setTabData] = useState({});
  const [loading, setLoading] = useState(false);

  // Update URL when tab changes
  const updateUrl = (tabName) => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabName);
    window.history.pushState({}, '', url);
  };

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getTabFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Lazy load tab data when tab becomes active
  useEffect(() => {
    if (!tabData[activeTab]) {
      setLoading(true);
      fetchTabData(activeTab).then((data) => {
        setTabData((prev) => ({ ...prev, [activeTab]: data }));
        setLoading(false);
      });
    }
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    updateUrl(tabName);
  };

  const tabs = ['home', 'profile', 'settings'];

  return (
    <div className="tabs-container">
      <h1>Tab Component - Interview Solution</h1>
      <p className="url-info">Current URL: <code>{window.location.search || '?tab=home'}</code></p>

      {/* Tab Buttons */}
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="content">{tabData[activeTab]}</div>
        )}
      </div>

      {/* Interview Notes */}
      <div className="notes">
        <h3>✓ Requirements Met:</h3>
        <ul>
          <li>✓ Three tab buttons with content display</li>
          <li>✓ Tab name from URL query params (?tab=name)</li>
          <li>✓ Active tab restored on page reload</li>
          <li>✓ Lazy loading: content loaded only when tab is clicked</li>
          <li>✓ Browser back/forward navigation works</li>
        </ul>
        <h3>📝 Query vs Hash Params:</h3>
        <p><strong>Use Query Params (?tab=home) when:</strong></p>
        <ul>
          <li>SEO matters (search engines can index)</li>
          <li>Server needs to read the parameter</li>
          <li>URL needs to be shareable/bookmarkable</li>
          <li>Working with Next.js SSR</li>
        </ul>
        <p><strong>Use Hash Params (#tab=home) when:</strong></p>
        <ul>
          <li>Pure client-side routing (SPA)</li>
          <li>Don't want any page reload triggers</li>
          <li>Simpler implementation for small apps</li>
        </ul>
      </div>
    </div>
  );
}
