class Node {
  constructor(accepting, id) {
    this.accepting = accepting;
    // this.inputs = {};
    this.outputs = {};
    this.id = id;
    // this.nextOut = 0;
  }

  addOutput(node, transition) {
    this.outputs[transition] = node;
  }

}
