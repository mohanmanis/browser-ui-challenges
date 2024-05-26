const useTraverseTree = () => {
  const insertNode = (tree, folderId, item, isFolder) => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime().toString(),
        name: item,
        isFolder,
        items: []
      });
      return tree;
    }

    const latestNode = tree.items.map((ob) => insertNode(ob, folderId, item, isFolder));
    return { ...tree, items: latestNode };
  };

  const deleteNode = (tree, nodeId) => {
    if (tree.id === nodeId) {
      return null;
    }

    if (tree.isFolder) {
      const filteredItems = tree.items.map(item => deleteNode(item, nodeId)).filter(Boolean);
      return { ...tree, items: filteredItems };
    }

    return tree;
  };

  const renameNode = (tree, nodeId, newName) => {
    if (tree.id === nodeId) {
      tree.name = newName;
      return tree;
    }

    if (tree.isFolder) {
      tree.items = tree.items.map(item => renameNode(item, nodeId, newName));
    }

    return tree;
  };

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
