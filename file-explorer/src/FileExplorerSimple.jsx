import { useState } from 'react';
import './FileExplorerSimple.css';

// Mock folder structure - inline for interview
const folderData = {
  id: '1',
  name: 'root',
  isFolder: true,
  items: [
    {
      id: '2',
      name: 'public',
      isFolder: true,
      items: [
        {
          id: '3',
          name: 'assets',
          isFolder: true,
          items: [
            { id: '4', name: 'logo.png', isFolder: false },
            { id: '5', name: 'favicon.ico', isFolder: false },
          ],
        },
        { id: '6', name: 'index.html', isFolder: false },
      ],
    },
    {
      id: '7',
      name: 'src',
      isFolder: true,
      items: [
        { id: '8', name: 'App.jsx', isFolder: false },
        { id: '9', name: 'main.jsx', isFolder: false },
        { id: '10', name: 'index.css', isFolder: false },
      ],
    },
    { id: '11', name: 'package.json', isFolder: false },
    { id: '12', name: 'README.md', isFolder: false },
  ],
};

// Folder/File Component (Recursive)
function FolderItem({ item, onInsert, onDelete, onRename }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);

  const handleToggle = () => {
    if (item.isFolder) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleRename = () => {
    if (newName.trim() && newName !== item.name) {
      onRename(item.id, newName);
    }
    setIsEditing(false);
  };

  return (
    <div className="folder-item">
      <div className="folder-header">
        <div className="folder-left" onClick={handleToggle}>
          {item.isFolder && (
            <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
          )}
          <span className="icon">{item.isFolder ? '📁' : '📄'}</span>
          {isEditing ? (
            <input
              className="rename-input"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => e.key === 'Enter' && handleRename()}
              autoFocus
            />
          ) : (
            <span className="name">{item.name}</span>
          )}
        </div>
        <div className="actions">
          {item.isFolder && (
            <>
              <button onClick={() => onInsert(item.id, true)} title="Add Folder">
                📁+
              </button>
              <button onClick={() => onInsert(item.id, false)} title="Add File">
                📄+
              </button>
            </>
          )}
          <button onClick={() => setIsEditing(true)} title="Rename">
            ✏️
          </button>
          <button onClick={() => onDelete(item.id)} title="Delete">
            🗑️
          </button>
        </div>
      </div>
      {isExpanded && item.isFolder && item.items && (
        <div className="folder-children">
          {item.items.map((child) => (
            <FolderItem
              key={child.id}
              item={child}
              onInsert={onInsert}
              onDelete={onDelete}
              onRename={onRename}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileExplorerSimple() {
  const [explorer, setExplorer] = useState(folderData);

  // Insert new folder/file
  const handleInsert = (folderId, isFolder) => {
    const name = prompt(`Enter ${isFolder ? 'folder' : 'file'} name:`);
    if (!name) return;

    const newItem = {
      id: Date.now().toString(),
      name,
      isFolder,
      items: isFolder ? [] : undefined,
    };

    const insertItem = (items) => {
      return items.map((item) => {
        if (item.id === folderId) {
          return {
            ...item,
            items: [...(item.items || []), newItem],
          };
        }
        if (item.items) {
          return { ...item, items: insertItem(item.items) };
        }
        return item;
      });
    };

    if (explorer.id === folderId) {
      setExplorer({
        ...explorer,
        items: [...explorer.items, newItem],
      });
    } else {
      setExplorer({
        ...explorer,
        items: insertItem(explorer.items),
      });
    }
  };

  // Delete folder/file
  const handleDelete = (itemId) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const deleteItem = (items) => {
      return items.filter((item) => {
        if (item.id === itemId) return false;
        if (item.items) {
          item.items = deleteItem(item.items);
        }
        return true;
      });
    };

    setExplorer({
      ...explorer,
      items: deleteItem(explorer.items),
    });
  };

  // Rename folder/file
  const handleRename = (itemId, newName) => {
    const renameItem = (items) => {
      return items.map((item) => {
        if (item.id === itemId) {
          return { ...item, name: newName };
        }
        if (item.items) {
          return { ...item, items: renameItem(item.items) };
        }
        return item;
      });
    };

    setExplorer({
      ...explorer,
      items: renameItem(explorer.items),
    });
  };

  return (
    <div className="app">
      <div className="header">
        <h1>📂 File Explorer</h1>
        <p>Interview-Ready Solution</p>
      </div>

      <div className="container">
        <div className="explorer">
          <FolderItem
            item={explorer}
            onInsert={handleInsert}
            onDelete={handleDelete}
            onRename={handleRename}
          />
        </div>
      </div>

      <div className="requirements">
        <h3>✅ Requirements Met:</h3>
        <ul>
          <li>✓ Recursive folder/file structure</li>
          <li>✓ Expand/collapse folders</li>
          <li>✓ Add new files and folders</li>
          <li>✓ Delete items</li>
          <li>✓ Rename items (inline editing)</li>
          <li>✓ Tree traversal logic (inline, no custom hook)</li>
        </ul>
      </div>
    </div>
  );
}
