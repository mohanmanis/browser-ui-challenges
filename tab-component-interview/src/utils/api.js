/**
 * Mock API utility - Interview simplified version
 * Supports AbortController for request cancellation
 */

/**
 * Simulates fetching tab content from an API
 * @param {string} tabId - The ID of the tab to fetch content for
 * @param {AbortSignal} signal - Optional abort signal for cancellation
 * @returns {Promise<Object>} - Returns content with checkboxes
 */
export async function fetchTabContent(tabId, signal) {
  // Simulate network delay (random between 500ms and 2500ms)
  const delay = Math.random() * 2000 + 500;
  
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      // Return content with checkboxes for each tab
      const content = getTabContentWithCheckboxes(tabId);
      resolve(content);
    }, delay);
    
    // Handle abort signal
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        reject(new DOMException('Request was cancelled', 'AbortError'));
      });
    }
  });
}

/**
 * Generate tab content with checkboxes
 */
function getTabContentWithCheckboxes(tabId) {
  const contentMap = {
    home: {
      title: 'Home',
      description: 'Welcome to the home page!',
      options: [
        { id: 'notifications', label: 'Enable Notifications' },
        { id: 'newsletter', label: 'Subscribe to Newsletter' },
        { id: 'darkMode', label: 'Dark Mode' }
      ]
    },
    about: {
      title: 'About',
      description: 'Learn more about us.',
      options: [
        { id: 'team', label: 'Show Team Members' },
        { id: 'history', label: 'Show Company History' },
        { id: 'mission', label: 'Show Mission Statement' }
      ]
    },
    services: {
      title: 'Services',
      description: 'Explore our services.',
      options: [
        { id: 'consulting', label: 'Consulting Services' },
        { id: 'development', label: 'Development Services' },
        { id: 'support', label: '24/7 Support' }
      ]
    },
    contact: {
      title: 'Contact',
      description: 'Get in touch with us.',
      options: [
        { id: 'phone', label: 'Show Phone Number' },
        { id: 'email', label: 'Show Email Address' },
        { id: 'map', label: 'Show Office Location' }
      ]
    }
  };

  return contentMap[tabId] || contentMap.home;
}
