export const sampleDocument = [
  {
    type: 'h1',
    attributes: {
      children: 'This is the primary heading for our page',
    },
  },
  {
    type: 'h2',
    attributes: {
      children: 'Here is some accompanying info we render as a subheading',
    },
  },
  {
    type: 'ul',
    children: [
      { type: 'li', attributes: { children: 'Option 1' } },
      { type: 'li', attributes: { children: 'Option 2' } },
      { type: 'li', attributes: { children: 'Option 3' } },
    ],
  },
  {
    type: 'div',
    attributes: { className: 'doc-logo' },
    children: [
      {
        type: 'img',
        attributes: {
          src: '/vite.svg',
          alt: 'Atlassian style logo placeholder',
        },
      },
    ],
  },
]
