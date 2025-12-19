import { useState } from 'react';
import './FeatureFlagSimple.css';

// Mock feature flags - inline for interview
const initialFlags = {
  newDashboard: false,
  darkMode: false,
  advancedSearch: true,
  betaFeatures: false,
  notifications: true,
};

export default function FeatureFlagSimple() {
  const [flags, setFlags] = useState(initialFlags);

  const toggleFlag = (flagName) => {
    setFlags((prev) => ({
      ...prev,
      [flagName]: !prev[flagName],
    }));
  };

  const isEnabled = (flagName) => flags[flagName];

  return (
    <div className="app">
      <div className="header">
        <h1>🚩 Feature Flag System</h1>
        <p>Interview-Ready Solution</p>
      </div>

      <div className="container">
        {/* Control Panel */}
        <div className="panel">
          <h2>Feature Flags Control</h2>
          <div className="flag-list">
            {Object.entries(flags).map(([key, value]) => (
              <div key={key} className="flag-item">
                <div className="flag-info">
                  <span className="flag-name">{key}</span>
                  <span className={`flag-status ${value ? 'enabled' : 'disabled'}`}>
                    {value ? '✓ Enabled' : '✗ Disabled'}
                  </span>
                </div>
                <button
                  className={`toggle-btn ${value ? 'active' : ''}`}
                  onClick={() => toggleFlag(key)}
                >
                  {value ? 'ON' : 'OFF'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Demos */}
        <div className="panel">
          <h2>Conditional Features</h2>

          {/* New Dashboard */}
          {isEnabled('newDashboard') ? (
            <div className="feature-box enabled">
              <h3>🎨 New Dashboard</h3>
              <p>You're seeing the redesigned dashboard! Modern UI with better UX.</p>
            </div>
          ) : (
            <div className="feature-box disabled">
              <h3>📊 Old Dashboard</h3>
              <p>Classic dashboard view. Enable "newDashboard" to see the new design.</p>
            </div>
          )}

          {/* Dark Mode */}
          <div className={`feature-box ${isEnabled('darkMode') ? 'dark' : ''}`}>
            <h3>🌙 Dark Mode</h3>
            <p>
              {isEnabled('darkMode')
                ? 'Dark mode is active! Easy on the eyes.'
                : 'Light mode is active. Toggle to see dark mode.'}
            </p>
          </div>

          {/* Advanced Search */}
          {isEnabled('advancedSearch') && (
            <div className="feature-box enabled">
              <h3>🔍 Advanced Search</h3>
              <input
                type="text"
                placeholder="Search with filters, operators, and more..."
                className="search-input"
              />
              <p className="hint">Advanced search with autocomplete and filters</p>
            </div>
          )}

          {/* Beta Features */}
          {isEnabled('betaFeatures') && (
            <div className="feature-box beta">
              <h3>🧪 Beta Features</h3>
              <p>You have access to experimental features:</p>
              <ul>
                <li>AI-powered recommendations</li>
                <li>Voice commands</li>
                <li>Collaborative editing</li>
              </ul>
            </div>
          )}

          {/* Notifications */}
          {isEnabled('notifications') && (
            <div className="feature-box notification">
              <h3>🔔 Notifications</h3>
              <div className="notification-item">
                <span>New message received</span>
                <button className="notif-btn">View</button>
              </div>
              <div className="notification-item">
                <span>Your report is ready</span>
                <button className="notif-btn">Download</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Requirements */}
      <div className="requirements">
        <h3>✅ Requirements Met:</h3>
        <ul>
          <li>✓ Feature flag state management (useState)</li>
          <li>✓ Toggle flags on/off</li>
          <li>✓ Conditional rendering based on flags</li>
          <li>✓ Multiple feature demonstrations</li>
          <li>✓ Clean, simple implementation (no Context/HOC needed)</li>
        </ul>
      </div>
    </div>
  );
}
