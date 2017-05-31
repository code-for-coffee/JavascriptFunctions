class Tree {
  constructor(root) {
    this._root = root;
  }

  static map(node, func, tree = null) {
    node.value = func(node.value);
    if (tree === null) {
      tree = new Tree(node);
    }

    if (node.hasChildren()) {
      _.map(node.children, function(child) {
        Tree.map(child, func, tree);
      });
    }
    return tree;
  }
  get root() {
    return this._root;
  }
}
