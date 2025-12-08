/**
 * Mock API utility for simulating async data fetching
 * Simulates network delays with random timing to test race conditions
 */

/**
 * Simulates fetching tab content from an API
 * @param {string} tabId - The ID of the tab to fetch content for
 * @returns {Promise<{id: string, content: string, timestamp: number}>}
 */
export async function fetchTabContent(tabId) {
  // Simulate network delay (random between 500ms and 2000ms)
  const delay = Math.random() * 1500 + 500;
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Simulate different content for each tab
  const contentMap = {
    home: 'Welcome to the Home tab! This content was fetched asynchronously.',
    about: 'About Us: We are a team of developers building amazing products.',
    services: 'Our Services: Web Development, Mobile Apps, and Cloud Solutions.',
    contact: 'Contact Us: Reach out at contact@example.com',
    blog: 'Latest Blog Posts: Check out our recent articles and updates.',
    portfolio: 'Our Portfolio: Showcasing our best work and client projects.',
  };
  
  const content = contentMap[tabId.toLowerCase()] || `Content for ${tabId} tab`;
  
  return {
    id: tabId,
    content,
    timestamp: Date.now(),
  };
}


