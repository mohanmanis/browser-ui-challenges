import { useState } from 'react'

const ListItem = ({ name, hasChildren, showChildren, expand }) => {
  return (
    <li>
      <button onClick={expand}>
        {hasChildren ? (showChildren ? "📂" : "📁") : "📄"}
        <span>{name}</span>
      </button>
    </li>
  );
}



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
    <div key={id}>
      <ListItem name={name}
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
