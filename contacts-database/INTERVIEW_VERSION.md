# Interview-Optimized Solution

This is a condensed, single-file version suitable for coding interviews. It demonstrates all core concepts without excessive componentization.

## Single-File Implementation

Create a file `ContactsApp.jsx`:

```jsx
import { useState, useEffect, useMemo } from 'react';

// Mock API - exactly as specified
const mockData = [
  {
    id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567', company: 'Tech Corp', jobTitle: 'Software Engineer',
    city: 'San Francisco', country: 'USA', avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com',
    phone: '+1 (555) 234-5678', company: 'Design Studio', jobTitle: 'UX Designer',
    city: 'New York', country: 'USA', avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: 3, firstName: 'Michael', lastName: 'Johnson', email: 'michael.j@example.com',
    phone: '+1 (555) 345-6789', company: 'Finance Inc', jobTitle: 'Financial Analyst',
    city: 'Chicago', country: 'USA', avatar: 'https://i.pravatar.cc/150?img=3'
  },
  // Add more as needed...
];

const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 500);
  });
};

// Main Component
export default function ContactsApp() {
  // State
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [sortField, setSortField] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch data
  useEffect(() => {
    getData().then(data => {
      setContacts(data);
      setLoading(false);
    });
  }, []);

  // Get unique values for filters
  const uniqueValues = useMemo(() => {
    if (!filterField) return [];
    return [...new Set(contacts.map(c => c[filterField]))].sort();
  }, [contacts, filterField]);

  // Process contacts: filter + sort
  const processedContacts = useMemo(() => {
    let result = [...contacts];

    // Global search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.firstName.toLowerCase().includes(query) ||
        c.lastName.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.company.toLowerCase().includes(query) ||
        c.jobTitle.toLowerCase().includes(query) ||
        c.city.toLowerCase().includes(query)
      );
    }

    // Field-specific filter
    if (filterField && filterValue) {
      result = result.filter(c =>
        c[filterField].toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      const aVal = String(a[sortField]).toLowerCase();
      const bVal = String(b[sortField]).toLowerCase();
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [contacts, searchQuery, filterField, filterValue, sortField, sortOrder]);

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1>Contacts Database</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        style={styles.input}
      />

      {/* Controls */}
      <div style={styles.controls}>
        {/* Filter */}
        <div>
          <label>Filter by: </label>
          <select
            value={filterField}
            onChange={e => { setFilterField(e.target.value); setFilterValue(''); }}
            style={styles.select}
          >
            <option value="">None</option>
            <option value="company">Company</option>
            <option value="jobTitle">Job Title</option>
            <option value="city">City</option>
          </select>

          {filterField && (
            <select
              value={filterValue}
              onChange={e => setFilterValue(e.target.value)}
              style={styles.select}
            >
              <option value="">Select...</option>
              {uniqueValues.map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          )}
        </div>

        {/* Sort */}
        <div>
          <label>Sort by: </label>
          <select
            value={sortField}
            onChange={e => setSortField(e.target.value)}
            style={styles.select}
          >
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="company">Company</option>
            <option value="city">City</option>
          </select>
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            style={styles.button}
          >
            {sortOrder === 'asc' ? '↑ A-Z' : '↓ Z-A'}
          </button>
        </div>
      </div>

      {/* Results */}
      <p>Showing {processedContacts.length} of {contacts.length} contacts</p>

      {/* Contact List */}
      <div style={styles.grid}>
        {processedContacts.map(contact => (
          <div key={contact.id} style={styles.card}>
            <img src={contact.avatar} alt={contact.firstName} style={styles.avatar} />
            <h3>{contact.firstName} {contact.lastName}</h3>
            <p><strong>{contact.jobTitle}</strong></p>
            <p>{contact.company}</p>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p>{contact.city}, {contact.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inline styles for interview simplicity
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'system-ui, sans-serif'
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '20px'
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    marginBottom: '20px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    color: '#111',
    fontWeight: '500'
  },
  controls: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  select: {
    padding: '8px 12px',
    fontSize: '14px',
    marginLeft: '8px',
    marginRight: '8px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    color: '#111',
    fontWeight: '500',
    background: 'white'
  },
  button: {
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    border: '1px solid #2563eb',
    borderRadius: '6px',
    background: '#2563eb',
    color: 'white',
    fontWeight: '500'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    background: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginBottom: '12px'
  }
};
```

## Key Interview Points to Explain

### 1. **State Management** (Critical)
```javascript
const [contacts, setContacts] = useState([]);      // Raw data
const [searchQuery, setSearchQuery] = useState(''); // Global search
const [filterField, setFilterField] = useState(''); // Which field to filter
const [filterValue, setFilterValue] = useState(''); // Filter value
const [sortField, setSortField] = useState('firstName'); // Sort field
const [sortOrder, setSortOrder] = useState('asc');  // Sort direction
```

**Why:** Demonstrates understanding of React hooks and state management.

### 2. **useMemo for Performance** (Important)
```javascript
const processedContacts = useMemo(() => {
  // Expensive filtering and sorting
}, [contacts, searchQuery, filterField, filterValue, sortField, sortOrder]);
```

**Why:** Shows optimization awareness - only recalculates when dependencies change.

### 3. **Processing Pipeline** (Core Logic)
```javascript
Search → Filter → Sort
```

**Explain:**
- Search narrows down globally
- Filter narrows to specific field
- Sort organizes the result
- Order matters!

### 4. **Dynamic Filter Dropdown**
```javascript
const uniqueValues = useMemo(() => {
  if (!filterField) return [];
  return [...new Set(contacts.map(c => c[filterField]))].sort();
}, [contacts, filterField]);
```

**Why:** Shows array manipulation, Set usage, and dynamic UI.

### 5. **Generic Sort Function**
```javascript
result.sort((a, b) => {
  const aVal = String(a[sortField]).toLowerCase();
  const bVal = String(b[sortField]).toLowerCase();
  const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
  return sortOrder === 'asc' ? comparison : -comparison;
});
```

**Why:** Works for any field dynamically.

## Interview Talking Points

### Time Complexity
- **Search**: O(n) - iterates through all contacts
- **Filter**: O(n) - iterates through filtered results
- **Sort**: O(n log n) - JavaScript sort
- **Overall**: O(n log n) dominated by sort

### Space Complexity
- O(n) - creates new array for processed contacts
- Could be optimized but clarity matters in interviews

### Alternative Approaches

**1. Without useMemo:**
```javascript
// Calculate on every render - BAD!
const processedContacts = applyFiltersAndSort(contacts);
```
❌ Re-calculates even when unrelated state changes

**2. With useCallback:**
```javascript
const handleSearch = useCallback((query) => {
  setSearchQuery(query);
}, []);
```
✅ Good for passing to child components

**3. With useReducer (more complex):**
```javascript
const [state, dispatch] = useReducer(contactsReducer, initialState);
```
✅ Better for complex state, overkill for this

### Edge Cases to Mention

1. **Empty search** - shows all contacts ✅
2. **No results** - empty array ✅
3. **Case sensitivity** - handled with `.toLowerCase()` ✅
4. **Null/undefined** - handled with String() conversion ✅
5. **Filter change** - resets filterValue ✅

## Improvements You Could Suggest

1. **Debouncing search** for large datasets
2. **Pagination** for performance
3. **URL state** for shareable links
4. **TypeScript** for type safety
5. **Tests** with Jest/React Testing Library

## What Makes This Interview-Ready?

✅ **Single file** - easy to review in 45 min
✅ **Clear logic** - easy to explain
✅ **No over-engineering** - just the requirements
✅ **Performance considered** - useMemo usage
✅ **Handles edge cases** - empty states, case sensitivity
✅ **Readable code** - clear variable names
✅ **Comments** - explaining key concepts
✅ **Inline styles** - no CSS file dependencies

## Time to Complete in Interview

- **Setup (5 min)**: State declarations
- **Data fetching (5 min)**: useEffect with getData
- **Search (10 min)**: Global search logic
- **Filter (10 min)**: Field-specific filtering
- **Sort (10 min)**: Generic sort function
- **UI (10 min)**: Basic rendering
- **Testing (5 min)**: Manual testing

**Total: ~45-50 minutes** ⏱️

This is the **sweet spot** for interview solutions!
