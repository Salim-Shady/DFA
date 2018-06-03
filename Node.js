class Node {
  constructor(size, x, y, accepting, id) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.accepting = accepting;
    this.inputs = [];
    this.outputs = [];
    this.id = id;
  }

  addInput(node) {
    this.inputs.push(node);
  }

  removeInput(node) {
    
  }

}
