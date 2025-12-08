# Contacts Database - Interview Solution

A clean, interview-ready contacts management system built with React. This solution demonstrates search, filtering, and sorting capabilities in a single, easy-to-understand component.

## 🎯 Interview-Ready Features

✅ **Single component** - Easy to code and explain in 45-60 minutes  
✅ **Core functionality** - Search, filter, sort without over-engineering  
✅ **Performance optimized** - Uses `useMemo` for efficient processing  
✅ **Clean code** - Readable, maintainable, well-structured  
✅ **No unnecessary abstractions** - Straightforward implementation  

## 📁 Project Structure

```
contacts-database/
├── src/
│   ├── ContactsApp.jsx      # Main component (150 lines)
│   ├── ContactsApp.css      # Styling
│   ├── App.jsx              # Entry point
│   ├── main.jsx             # React mount
│   └── index.css            # Global styles
└── package.json
```

**Total:** ~300 lines of code (excluding data)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:5173
```

## 📊 Features Implemented

### 1. getData() Function
```javascript
const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 500);
  });
};
```
- Returns `Promise<Person[]>`
- 500ms simulated delay
- 10 Person objects with complete data

### 2. Search (Global)
- Searches across: firstName, lastName, email, company, jobTitle, city
- Real-time filtering
- Case-insensitive
- Substring matching

### 3. Filter (Field-Specific)
- Filter by: Company, Job Title, City, Country
- Dynamic dropdown values (extracted from data)
- Combines with search
- Clear filter button

### 4. Sort
- Sort by: First Name, Last Name, Company, Job Title, City
- Toggle ascending (A-Z) / descending (Z-A)
- Visual indicators
- Maintains filter state

## 🧠 Key Implementation Details

### State Management
```javascript
const [contacts, setContacts] = useState([]);       // All contacts
const [loading, setLoading] = useState(true);       // Loading state
const [search, setSearch] = useState('');           // Global search
const [filterField, setFilterField] = useState(''); // Which field to filter
const [filterValue, setFilterValue] = useState(''); // Filter value
const [sortField, setSortField] = useState('firstName');
const [sortOrder, setSortOrder] = useState('asc');
```

### Processing Pipeline (useMemo)
```javascript
const processedContacts = useMemo(() => {
  let result = [...contacts];
  
  // 1. Search
  if (search.trim()) {
    result = result.filter(/* search logic */);
  }
  
  // 2. Filter
  if (filterField && filterValue) {
    result = result.filter(/* filter logic */);
  }
  
  // 3. Sort
  result.sort(/* sort logic */);
  
  return result;
}, [contacts, search, filterField, filterValue, sortField, sortOrder]);
```

**Why useMemo?**  
Only recalculates when dependencies change → better performance

### Dynamic Filter Options
```javascript
const filterOptions = useMemo(() => {
  if (!filterField) return [];
  return [...new Set(contacts.map(c => c[filterField]))].sort();
}, [contacts, filterField]);
```

**Extracts unique values** from selected field for dropdown

## 💡 Interview Talking Points

### Time Complexity
- **Search**: O(n) - linear scan through contacts
- **Filter**: O(m) where m ≤ n - scans filtered results
- **Sort**: O(k log k) where k ≤ m - JavaScript sort
- **Overall**: O(n log n) - dominated by sort

### Space Complexity
- O(n) - creates new array for processed contacts
- Could optimize but clarity > micro-optimization in interviews

### Why This Approach?

**✅ Pros:**
- Simple to understand and explain
- All logic in one place
- Easy to debug and modify
- Performance-conscious (useMemo)
- Handles all requirements

**❌ Cons (and why they're okay for interviews):**
- Not componentized (interviewer can ask about this)
- Could extract functions (good follow-up question)
- No TypeScript (can discuss as enhancement)

### Follow-Up Questions You Might Get

**Q: How would you optimize for 10,000 contacts?**  
A: Add pagination, virtualization (react-window), debounce search

**Q: How would you test this?**  
A: Jest + React Testing Library - test search, filter, sort independently

**Q: How would you make this production-ready?**  
A: Add TypeScript, error handling, loading states, tests, accessibility

**Q: How would you handle real API?**  
A: Use try/catch, handle errors, add retry logic, show error states

## 🎨 Person Object Structure

```javascript
{
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  company: string,
  jobTitle: string,
  city: string,
  country: string,
  avatar: string
}
```

## 📝 Example Queries

1. **Search "engineer"** → Shows all engineers
2. **Filter by Company → "Tech Corp"** → Shows Tech Corp employees
3. **Sort by Last Name Z-A** → Reverse alphabetical order
4. **Search "john" + Filter City "San Francisco"** → Specific person

## 🔍 Code Walkthrough (For Interview)

### 1. Setup (Lines 1-15)
- Imports
- Mock data array
- getData() function

### 2. Component State (Lines 17-24)
- All useState declarations
- Clear variable names

### 3. Data Fetching (Lines 26-32)
- useEffect on mount
- Async getData call
- Set loading false

### 4. Filter Options (Lines 34-38)
- useMemo for unique values
- Dynamic based on selected field

### 5. Processing Logic (Lines 40-67)
- useMemo with dependencies
- Search → Filter → Sort pipeline
- Clear, linear flow

### 6. UI Rendering (Lines 69-186)
- Loading state
- Search input
- Filter controls
- Sort controls
- Results count
- Contact cards grid

## ✨ What Makes This Interview-Ready?

1. **Completable in 45-60 min** ⏱️
2. **All requirements met** ✅
3. **Clean, readable code** 📖
4. **Performance considered** 🚀
5. **Easy to explain** 💬
6. **Room for improvements** 📈 (shows growth mindset)

## 🎓 Concepts Demonstrated

- React Hooks (useState, useEffect, useMemo)
- Async/await and Promises
- Array methods (filter, map, sort)
- Controlled components
- Event handling
- Conditional rendering
- CSS styling
- Data structures (Set for unique values)

## 🚀 Running the App

The dev server should already be running at:
**http://localhost:5173/**

If not:
```bash
npm run dev
```

## 📦 Dependencies

- React 18+
- Vite (dev server)
- No external libraries needed!

## 🎯 Interview Success Criteria

✅ Works correctly (all features functional)  
✅ Code is clean and readable  
✅ Demonstrates React knowledge  
✅ Shows performance awareness  
✅ Handles edge cases (empty results, no data)  
✅ Explains thought process clearly  
✅ Completes in reasonable time  

---

**Built with React + Vite**  
*Interview-optimized solution - December 2025*
