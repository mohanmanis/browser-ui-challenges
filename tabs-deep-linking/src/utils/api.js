/**
 * API utility functions for lazy loading tab content
 * Simulates API calls with delays
 */

// Simulated API data
const mockData = {
  home: {
    title: 'Welcome Home',
    content: 'This is the home tab content. It was loaded lazily from an API.',
    timestamp: Date.now(),
  },
  about: {
    title: 'About Us',
    content: 'This is the about tab content. Learn more about our company and mission.',
    timestamp: Date.now(),
  },
  services: {
    title: 'Our Services',
    content: 'We offer a wide range of services to meet your needs.',
    timestamp: Date.now(),
  },
  config: {
    title: 'Config Driven UI',
    content: 'This tab demonstrates config-driven UI rendering.',
    timestamp: Date.now(),
  },
  form: {
    title: 'Form Validation',
    content: 'This tab contains a form with validation logic.',
    timestamp: Date.now(),
  },
  document: {
    title: 'Document Renderer',
    content: 'This tab demonstrates rendering documents from JSON.',
    timestamp: Date.now(),
  },
}

/**
 * Simulates fetching tab content from an API
 * @param {string} tabId - The ID of the tab to fetch content for
 * @returns {Promise<Object>} The tab content
 */
export const fetchTabContent = async (tabId) => {
  // Simulate network delay (1-3 seconds)
  const delay = Math.random() * 2000 + 1000
  
  await new Promise((resolve) => setTimeout(resolve, delay))

  if (mockData[tabId]) {
    return mockData[tabId]
  }

  throw new Error(`Content not found for tab: ${tabId}`)
}

/**
 * Fetches document data (for document renderer)
 */
export const fetchDocumentData = async () => {
  const delay = Math.random() * 1500 + 500
  await new Promise((resolve) => setTimeout(resolve, delay))

  return {
    title: 'Sample Document',
    content: 'This document was loaded from an API.',
  }
}
