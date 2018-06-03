var canvas = document.getElementById('canvas');

var nodesHTML = [];
var nodesObjects = [];
var makeNode = document.getElementById('makeNode');
createNode(true, 30, 150);

makeNode.addEventListener("click", createNode);

//creates a new node
function createNode(accepting, nodeX, nodeY) {

  var radius = 15;

  //checks if node coords are empty
  if (!nodeX || !nodeY) {
    nodeY = ((Math.random()*200) + 50);
    nodeX = ((Math.random()*200) + 50);
  }

  //creates and adds to nodes lists for objects
  var node =  new Node(15, nodeX, nodeY, accepting, nodesHTML.length);
  nodesObjects.push(node);

  //set visuals for the node
  var graphic = document.createElementNS("http://www.w3.org/2000/svg", "g")
  var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
  var text =  document.createElementNS("http://www.w3.org/2000/svg","text");

  //circle for node visuals
  circle.setAttribute("cx", node.x);
  circle.setAttribute("cy", node.y);
  circle.setAttribute("r", node.size);
  circle.setAttribute("fill", "rgba(0,0,0,0.3)");
  circle.setAttribute("stroke", "");

  //text within the node
  text.setAttribute("x",node.x-3);
  text.setAttribute("y",node.y+5);
  text.setAttribute("fill", "white");
  text.innerHTML = node.id;

  //add the circle and text to graphic
  graphic.appendChild(circle);
  graphic.appendChild(text);
  graphic.setAttribute("id", node.id);

  canvas.appendChild(graphic);

  //adds to nodes list for html elements
  nodesHTML.push(graphic);
  return node;
}//createNode
