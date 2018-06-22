class Tree {
  constructor(parent) {
    this.value = null;
    this.left = null;
    this.right = null;
    this.parent = parent;
  }

  setValue(value) {
    this.value = value;
    return this.value;
  }

  setLeft(tree) {
    this.left = tree;
    return this.left;
  }

  setRight(tree) {
    this.right = tree;
    return this.right;
  }
}
