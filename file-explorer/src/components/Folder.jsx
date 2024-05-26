import { useState } from "react";

function Folder({
  handleInsertNode,
  handleDeleteNode,
  handleRenameNode,
  explorer,
}) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(explorer.name);

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onRename = (e) => {
    if (e.keyCode === 13 && newName) {
      handleRenameNode(explorer.id, newName);
      setIsRenaming(false);
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div onClick={() => setExpand(!expand)} className="folder">
          <span>
            {isRenaming ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={onRename}
                onBlur={() => setIsRenaming(false)}
                autoFocus
              />
            ) : (
              <>
                📁 {explorer.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsRenaming(true);
                  }}
                >
                  ✏️
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNode(explorer.id);
                  }}
                >
                  🗑️
                </button>
              </>
            )}
          </span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorer.items.map((exp) => (
            <Folder
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              handleRenameNode={handleRenameNode}
              key={exp.id}
              explorer={exp}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="file">
        {isRenaming ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={onRename}
            onBlur={() => setIsRenaming(false)}
            autoFocus
          />
        ) : (
          <>
            📄 {explorer.name}
            <button onClick={() => setIsRenaming(true)}>✏️</button>
            <button onClick={() => handleDeleteNode(explorer.id)}>🗑️</button>
          </>
        )}
      </div>
    );
  }
}

export default Folder;
