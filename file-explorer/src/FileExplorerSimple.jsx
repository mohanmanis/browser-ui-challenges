/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './FileExplorerSimple.css';

// Mock backend data - as provided in interview
const backendData = [
  {
    id: "1",
    name: "Office Map"
  },
  {
    id: "2",
    name: "New Employee Onboarding",
    children: [
      {
        id: "8",
        name: "Onboarding Materials"
      },
      {
        id: "9",
        name: "Training"
      }
    ]
  },
  {
    id: "3",
    name: "Office Events",
    children: [
      {
        id: "6",
        name: "2018",
        children: [
          {
            id: "10",
            name: "Summer Picnic"
          },
          {
            id: "11",
            name: "Valentine's Day Party"
          },
          {
            id: "12",
            name: "New Year's Party"
          }
        ]
      },
      {
        id: "7",
        name: "2017",
        children: [
          {
            id: "13",
            name: "Company Anniversary Celebration"
          }
        ]
      }
    ]
  },
  {
    id: "4",
    name: "Public Holidays"
  },
  {
    id: "5",
    name: "Vacations and Sick Leaves"
  }
];

// Mock API function
function fetchData() {
  return new Promise(resolve => {
    setTimeout(resolve, 100, backendData);
  });
}

// Recursive Folder/File Component
// eslint-disable-next-line react/prop-types
function FolderItem({ item, onInsert, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFolder = !!item.children;

  const handleToggle = () => {
    if (isFolder) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="folder-item">
      <div className="folder-header">
        <div className="folder-left" onClick={handleToggle}>
          {isFolder && (
            <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
          )}
          <span className="icon">{isFolder ? '📁' : '📄'}</span>
          <span className="name">{item.name}</span>
        </div>
        <div className="folder-actions">
          {isFolder && (
            <button className="action-btn" onClick={() => onInsert(item.id, true)}>
              + Folder
            </button>
          )}
          {isFolder && (
            <button className="action-btn" onClick={() => onInsert(item.id, false)}>
              + File
            </button>
          )}
          <button className="action-btn delete" onClick={() => onDelete(item.id)}>
            Delete
          </button>
        </div>
      </div>

      {isExpanded && isFolder && (
        <div className="folder-children">
          {item.children?.map((child) => (
            <FolderItem
              key={child.id}
              item={child}
              onInsert={onInsert}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileExplorerSimple() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    fetchData().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  // Insert new folder/file
  const handleInsert = (parentId, isFolder) => {
    const name = prompt(`Enter ${isFolder ? 'folder' : 'file'} name:`);
    if (!name) return;

    const newItem = {
      id: Date.now().toString(),
      name: name.trim(),
      ...(isFolder && { children: [] })
    };

    const insertRecursive = (items) => {
      return items.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [...(item.children || []), newItem]
          };
        }
        if (item.children) {
          return {
            ...item,
            children: insertRecursive(item.children)
          };
        }
        return item;
      });
    };

    setData(insertRecursive(data));
  };

  // Delete folder/file
  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const deleteRecursive = (items) => {
      return items
        .filter((item) => item.id !== id)
        .map((item) => {
          if (item.children) {
            return {
              ...item,
              children: deleteRecursive(item.children)
            };
          }
          return item;
        });
    };

    setData(deleteRecursive(data));
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading file explorer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <h1>📂 File Explorer</h1>
        <p>Interview-Ready Solution</p>
      </div>

      <div className="container">
        <div className="toolbar">
          <button
            className="add-root-btn"
            onClick={() => {
              const name = prompt('Enter folder name:');
              if (name) {
                setData([
                  ...data,
                  {
                    id: Date.now().toString(),
                    name: name.trim(),
                    children: []
                  }
                ]);
              }
            }}
          >
            + Add Root Folder
          </button>
        </div>

        <div className="explorer">
          {data.map((item) => (
            <FolderItem
              key={item.id}
              item={item}
              onInsert={handleInsert}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <div className="requirements">
        <h3>✅ Requirements Met:</h3>
        <ul>
          <li>✓ Fetch data from API (fetchData function with 100ms delay)</li>
          <li>✓ Display folder/file structure recursively</li>
          <li>✓ Expand/collapse folders</li>
          <li>✓ Add new folders/files</li>
          <li>✓ Delete folders/files</li>
          <li>✓ Backend data structure with children property</li>
          <li>✓ Automatic folder detection (has children)</li>
          <li>✓ Clean, interview-ready single component</li>
        </ul>
      </div>
    </div>
  );
}
