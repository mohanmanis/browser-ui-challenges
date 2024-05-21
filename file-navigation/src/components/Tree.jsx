import { useState } from "react";

const ListItem = ({ name, hasChildren, showChildren, expand }) => {
  const [show, setShowDir] = useState(false);
  return (
    <div className="list-item">
      <li onClick={expand} style={{ cursor: hasChildren ? "pointer" : "auto" }}>
        {hasChildren ? (showChildren ? "📂" : "📁") : "📄"}
        <span>{name}</span>
      </li>
      {hasChildren && (
        <div>
          <button>Add Folder +</button>
          <button>Add File +</button>
        </div>
      )}
    </div>
  );
};

const TreeNode = ({ node }) => {
  const { id, name, children = [] } = node;
  const hasChildren = children.length > 0;
  const [showDir, setShowDir] = useState(false);
  const showChildren = hasChildren && showDir;

  const expand = () => {
    if (hasChildren) {
      setShowDir(!showDir);
    }
  };
  return (
    <div key={id} className={showChildren ? "expanded" : ""}>
      <ListItem
        name={name}
        hasChildren={hasChildren}
        showChildren={showChildren}
        expand={expand}
      />
      {showChildren && <Tree data={children} />}
    </div>
  );
};

const Tree = ({ data = [] }) => {
  return (
    <ul>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </ul>
  );
};

export default Tree;
