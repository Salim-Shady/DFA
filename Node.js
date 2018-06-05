class Node {
  constructor(accepting, id) {
    this.accepting = accepting;
    // this.inputs = {};
    this.outputs = {};
    this.id = id;
    // this.nextOut = 0;
  }

  addOutput(node, value) {
    this.outputs[value] = node;
  }

}
