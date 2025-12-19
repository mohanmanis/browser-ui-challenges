# File Explorer - Interview Solution

A clean, interview-ready file explorer component that renders a hierarchical folder/file structure from backend data. Features expand/collapse, add, and delete operations.

## 🎯 Interview Requirements

✅ **Fetch data from API** - `fetchData()` function with 100ms delay  
✅ **Backend data structure** - Uses `children` property for nested items  
✅ **Recursive rendering** - Handles deeply nested structures  
✅ **Folder detection** - Automatic (has `children` = folder)  
✅ **Expand/collapse** - Click to toggle folders  
✅ **Add folders/files** - Insert at any level  
✅ **Delete items** - Remove folders/files recursively  

## 📁 Data Structure

The component expects data in this format (as provided in interview):

```javascript
const backendData = [
  {
    id: "1",
    name: "Office Map"  // No children = file
  },
  {
    id: "2",
    name: "New Employee Onboarding",
    children: [  // Has children = folder
      {
        id: "8",
        name: "Onboarding Materials"
      }
    ]
  }
];
```

### Key Points:
- **Files**: Objects without `children` property
- **Folders**: Objects with `children` array
- **Nesting**: Unlimited depth supported
- **IDs**: Unique string identifiers

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Run dev server
bun dev
```

## 💻 Implementation Details

### Core Functions:

**1. fetchData()** - Mock API call
```javascript
function fetchData() {
  return new Promise(resolve => {
    setTimeout(resolve, 100, backendData);
  });
}
```

**2. Recursive Rendering**
- Detects folders by checking `item.children`
- Recursively renders children when expanded
- Maintains expand/collapse state per folder

**3. Insert Operation**
- Recursively finds parent by ID
- Adds new item to parent's children array
- Auto-generates unique ID using `Date.now()`

**4. Delete Operation**
- Recursively filters out item by ID
- Removes from children arrays at any depth
- Confirmation prompt before deletion

## 📊 Component Structure

```
FileExplorerSimple
├── Data fetching (useEffect)
├── Insert handler (recursive)
├── Delete handler (recursive)
└── FolderItem (recursive component)
    ├── Expand/collapse toggle
    ├── Folder/file icon
    ├── Action buttons
    └── Children rendering (recursive)
```

## ⏱️ Interview Timeline

| Time | Task |
|------|------|
| 0-10 min | Setup component, fetch data, display list |
| 10-25 min | Recursive rendering, expand/collapse |
| 25-40 min | Insert operation (recursive) |
| 40-50 min | Delete operation (recursive) |
| 50-60 min | Polish UI, add styling |

## 🎨 Features

- 📦 **Loading state** - Shows spinner while fetching
- 📁 **Visual hierarchy** - Indented children with borders
- 🎯 **Folder icons** - 📁 for folders, 📄 for files
- ➕ **Add operations** - Add folders/files at any level
- 🗑️ **Delete with confirmation** - Prevent accidental deletions
- 🎨 **Modern UI** - Purple gradient background, clean design

## 🔑 Key Concepts

- **Recursion**: Rendering nested structures
- **State management**: useState for data and loading
- **Side effects**: useEffect for API calls
- **Immutability**: Creating new arrays/objects on update
- **Tree traversal**: Finding/updating items in nested structure

## 📝 Interview Tips

1. **Explain the data structure** - Mention that folders have `children`
2. **Discuss recursion** - How component calls itself for children
3. **Talk about immutability** - Why we use spread operators
4. **Mention edge cases** - Empty names, deep nesting, deletion
5. **Optimize if asked** - Could use useCallback, useMemo

## 🚫 What's NOT Included (To Keep It Interview-Ready)

- ❌ Drag & drop
- ❌ Rename functionality
- ❌ Search/filter
- ❌ File type icons
- ❌ Context menu
- ❌ Keyboard navigation

These can be added as "scale-up" features if time permits!

---

**Time to complete:** 45-60 minutes  
**Difficulty:** Intermediate  
**Key skill:** Recursion

*Last Updated: December 2025*
