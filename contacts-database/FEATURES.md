# Contacts Database - Features Guide

## Quick Start

The application is running at: **http://localhost:5173/**

## How to Use

### 🔍 Global Search
1. Type in the search bar at the top
2. Search works across: Name, Email, Company, Job Title, City, Country
3. Results update instantly as you type
4. Click the ✕ button to clear search

### 🎯 Filter by Field
1. Click "Filter by" dropdown
2. Select a field (Company, Job Title, City, Country)
3. Select a specific value from the second dropdown
4. Click "Clear filter" to reset
5. Filters combine with search for precise results

### 📊 Sort Results
1. Click "Sort by" dropdown
2. Select a field to sort by
3. Click the A-Z / Z-A button to toggle order
4. Results update immediately

### 👁️ View Modes
- **Grid View** (⊞): Card layout, great for browsing
- **List View** (≡): Compact list, great for scanning

### 🔄 Combine Features
- Use search + filter + sort together
- Example: Search "tech" → Filter by City "San Francisco" → Sort by "Last Name"
- Clear all filters with "Clear all filters" button

## Sample Queries to Try

### By Name
- Search: "John" → Finds John Doe
- Search: "Smith" → Finds Jane Smith

### By Company
- Filter by Company → Select "Tech Corp"
- Filter by Company → Select "Design Studio"

### By Location
- Filter by City → Select "New York"
- Filter by Country → Select "USA"

### By Job Title
- Filter by Job Title → Select "Software Engineer"
- Filter by Job Title → Select "UX Designer"

### Combined Examples
1. **Find all Software Engineers in San Francisco**
   - Filter by Job Title → "Software Engineer"
   - Filter by City → "San Francisco"

2. **Find all contacts at Tech Corp sorted by name**
   - Filter by Company → "Tech Corp"
   - Sort by → "First Name" → A-Z

3. **Search and sort**
   - Search: "Marketing"
   - Sort by → "City"

## Data Fields

Each contact has:
- ✅ Avatar (profile picture)
- ✅ First Name & Last Name
- ✅ Job Title
- ✅ Company
- ✅ Email (clickable - opens email client)
- ✅ Phone (clickable - opens phone dialer)
- ✅ City & Country

## UI Features

### Loading State
- Spinner and "Loading contacts..." message
- Simulates 500ms API delay

### Empty State
- "No contacts found" message when no results
- Helpful prompt to adjust filters

### Results Counter
- Shows "X of Y contacts"
- Updates based on filters

### Hover Effects
- Cards lift and highlight on hover
- Buttons show interactive states
- Smooth animations

### Responsive Design
- Works on desktop, tablet, and mobile
- Adaptive layouts for different screen sizes
- Touch-friendly on mobile devices

## Keyboard Navigation
- Tab through all interactive elements
- Enter to activate buttons
- Standard form controls

## Performance

### Optimizations
- ✅ Memoized filtering (useMemo)
- ✅ Memoized sorting (useMemo)
- ✅ Efficient re-renders
- ✅ Only updates when data/filters change

### Data Size
- Current: 15 contacts
- Scales to hundreds/thousands with same performance
- Instant filtering and sorting

## Technical Details

### State Management
```javascript
const [contacts, setContacts] = useState([])          // All contacts
const [searchQuery, setSearchQuery] = useState('')    // Global search
const [filterBy, setFilterBy] = useState({...})       // Field filter
const [sortBy, setSortBy] = useState({...})           // Sort config
const [viewMode, setViewMode] = useState('grid')      // View mode
```

### Processing Pipeline
```
Raw Data → Search Filter → Field Filter → Sort → Display
```

### Filter Priority
1. Global search (broadest)
2. Field-specific filter (narrows down)
3. Sort (organizes results)

## Customization

### Adding More Contacts
Edit `src/api/api.js` and add more Person objects to the `data` array.

### Changing Fields
To add/remove searchable or filterable fields, edit:
- `ContactsDatabase.jsx` - filter logic
- `ContactCard.jsx` - display
- `api.js` - data structure

### Styling
All CSS is in component-specific files:
- `ContactsDatabase.css` - main layout
- `ContactCard.css` - card styles
- `SearchBar.css` - search styling
- `FilterControls.css` - filter styling
- `SortControls.css` - sort styling

## Browser Compatibility

Tested on:
- ✅ Chrome 120+
- ✅ Firefox 121+
- ✅ Safari 17+
- ✅ Edge 120+

## Known Limitations

- No pagination (all contacts load at once)
- No persistent state (resets on refresh)
- Mock data only (no real backend)
- Single filter field at a time

## Future Enhancements

See README.md for planned features.

