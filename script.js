var canvas = document.getElementById('canvas');

var nodesHTML = [];
var nodesObjects = [];
var makeNode = document.getElementById('makeNode');
createNode(true, 30, 150);

var sourceNode = null;
var targetNode = null;

var trBox = document.getElementById('transition-box');
var trNum = parseInt(document.getElementById('transition-text').innerHTML);

//add listeners for both nodes in the transition box to change value on click
for (var i = 0; i < trBox.childNodes.length; i++) {
  trBox.childNodes[i].addEventListener('click', function(e) {
    if (e.ctrlKey) {
      addTransition(10);
    } else if (e.shiftKey) {
      addTransition(5);
    } else {
      addTransition(1);
    }
  });

  trBox.childNodes[i].addEventListener('contextmenu', function(e) {
    e.preventDefault();
    if (e.ctrlKey) {
      subTransition(10);
    } else if (e.shiftKey) {
      subTransition(5);
    } else {
      subTransition(1);
    }
  });
}

//adds listener to the make node button
makeNode.addEventListener("click", function() {
  createNode(false);
});

//increase transition value
function addTransition(value) {
  trBox.childNodes[3].innerHTML = trNum + value;
  console.log("trNum:"+trNum);
  trNum += value;
  console.log("New trNum:"+trNum);
}

//decrease transition value
function subTransition(value) {
  trBox.childNodes[3].innerHTML = trNum - value;
  console.log("trNum:"+trNum);
  trNum -= value;
  console.log("New trNum:"+trNum);
}

//creates a new node
function createNode(accepting, nodeX, nodeY) {

  //creates and adds to nodes lists for objects
  var node =  new Node(accepting, nodesHTML.length);
  nodesObjects.push(node);

  var nodeVis = createNodeVis(node, nodeX, nodeY);

  canvas.appendChild(nodeVis);

  //adds to nodes list for html elements
  nodesHTML.push(nodeVis);
  return node;
}//createNode

//creates the graphics for the node
function createNodeVis(node, nodeX, nodeY) {
  var radius = 20;

  //checks if node coords are empty
  if (!nodeX || !nodeY) {
    nodeY = ((Math.random()*200) + 50);
    nodeX = ((Math.random()*200) + 50);
  }

  //set visuals for the node
  var graphic = document.createElementNS("http://www.w3.org/2000/svg", "g")
  var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
  var text =  document.createElementNS("http://www.w3.org/2000/svg","text");

  //circle for node visuals
  circle.setAttribute("cx", nodeX);
  circle.setAttribute("cy", nodeY);
  circle.setAttribute("r", radius);
  circle.setAttribute("fill", "rgba(0,0,0,0.3)");
  circle.setAttribute("stroke", "");
  circle.setAttribute("class", 'draggable');

  //text within the node
  text.setAttribute("x",nodeX-3);
  text.setAttribute("y",nodeY+5);
  text.setAttribute("fill", "white");
  text.innerHTML = node.id;

  //add the circle and text to graphic
  graphic.appendChild(circle);
  graphic.appendChild(text);
  graphic.setAttribute("id", node.id);

  //sets the sourceNode on mouse down
  graphic.addEventListener('mousedown', function(e) {
    // console.log(e.ctrlKey);
    e.preventDefault();
    if (e.button === 0) {
      if (!e.ctrlKey) {
        sourceNode = e.target.parentNode;
      }
    }
  });

  //creates connection on mouse up with target node
  graphic.addEventListener('mouseup', function(e) {
    // console.log(sourceNode);
    e.preventDefault();
    //if left click with no ctrl then create connection
    if (!e.ctrlKey && e.button === 0) {
      createCon(e);
    }
  });

  graphic.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    //remove connection that is selected by transition number in the transition box
    removeCon(e.target.parentNode, trNum);
  });

  return graphic;
}

//moves a node by x,y
function moveNode(nodeH, x, y) {
  nodeH.childNodes[0].setAttribute("cx", x);
  nodeH.childNodes[0].setAttribute("cy", y);

  nodeH.childNodes[1].setAttribute("x", x-3);
  nodeH.childNodes[1].setAttribute("y", y+5);
}

//creates connection between two nodes
function createCon(e) {
  //set the target node
  targetNode = e.target.parentNode;

  //check if both target and source nodes are non-empty
  if (sourceNode && targetNode) {
    //select the object version of both nodes
    var sourceNodeObj = nodesObjects[sourceNode.id];
    var targetNodeObj = nodesObjects[targetNode.id];

    //checks if the source already has an output with this transition
    if (!sourceNodeObj.outputs.hasOwnProperty(trNum)) {
      //add the target node as output to the source node
      sourceNodeObj.addOutput(targetNodeObj, trNum);
      createConVis(sourceNode, targetNode, trNum);
      console.log("|Source: Node-"+sourceNodeObj.id + "|\n|Transition: " + trNum, "|\n|Target: Node-"+targetNodeObj.id+"|");
    }
    // console.log(sourceNodeObj, targetNodeObj);
  }

  sourceNode = null;
  targetNode = null;
}//createCon

function createConVis(source, target, transition) {
  //creates the elements for drawing line
  var line =  document.createElementNS("http://www.w3.org/2000/svg","line");
  var graphic = document.createElementNS("http://www.w3.org/2000/svg", "g");
  var text =  document.createElementNS("http://www.w3.org/2000/svg","text");

  //getting source and target co-ordinates
  var sourcePos = {
    x:source.childNodes[0].getAttribute("cx"),
    y:source.childNodes[0].getAttribute("cy")
  };

  var targetPos = {
    x:target.childNodes[0].getAttribute("cx"),
    y:target.childNodes[0].getAttribute("cy")
  }


  //setting the line graphics
  line.setAttribute("x1", sourcePos.x);
  line.setAttribute("y1", sourcePos.y);

  line.setAttribute("x2", targetPos.x);
  line.setAttribute("y2", targetPos.y);

  line.setAttribute("stroke", "black");
  line.setAttribute("marker-end", "url(#arrowhead)");

  //calculate text position
  var textPos = {
    x: ((parseInt(sourcePos.x) + parseInt(targetPos.x))/2),
    y: ((parseInt(sourcePos.y) + parseInt(targetPos.y))/2)
  }

  //check if a connection between source and target already exists
  if (document.getElementsByClassName(source.id+target.id).length === 0) {

    //set the visuls and pos of text
    text.setAttribute("x",textPos.x);
    text.setAttribute("y",textPos.y);
    text.innerHTML = transition;
    text.setAttribute("fill", "black")

    //add line and text to graphic
    graphic.appendChild(line);
    graphic.appendChild(text);

    //set the id of the connection graphic as "tr<source>-<transition>-<target>"
    graphic.setAttribute("id", "tr"+source.id+"-"+target.id);
    //set the class of the connection graphic as "<source><target>"
    graphic.setAttribute("class", source.id+target.id)

    canvas.appendChild(graphic);
  } else {
    //find the existing connection and update text field of that connection
    text = document.getElementsByClassName(source.id+target.id)[0].childNodes[1];
    text.innerHTML += ","+transition;
  }
}//createConVis

function removeCon(source, transition) {
  //get object version of html element
  var sourceObj = htmlToObj(source);
  if (!sourceObj.outputs[transition]) {
    console.log("No "+transition+" transition");
    return;
  }

  //get target of the to be deteleted connection and then delete the object connection
  var target = objToHtml(sourceObj.outputs[transition]);
  delete sourceObj.outputs[transition];

  console.log("Remove tr: "+transition+"\nFrom:"+source.id+"\nTo:"+target.id);

  //delete the visual connection
  removeConVis(source, target, transition);
}//removeCon

function removeConVis(source, target, transition) {
  //get the line element
  var edge = document.getElementById('tr'+source.id+"-"+target.id);
  //check if edge is defined else return
  if (!edge) {
    console.log("Invalid parameters");
    return;
  }

  var edgeText = edge.childNodes[1].innerHTML;
  //check if only one transition between nodes
  if (edgeText.length === 1) {
    // remove the whole connection
    canvas.removeChild(edge);
  } else if (edgeText.includes(transition)){
    //search for the location of where the transition number appears in text
    var trLoc = edgeText.search(transition);

    //according to location appropriately remove the number
    if (trLoc === 0) {
      edge.childNodes[1].innerHTML = edgeText.slice(2);
    } else if (trLoc > 0) {
      var first = edgeText.slice(0, trLoc-1);
      var last = edgeText.slice(trLoc+1);
      edge.childNodes[1].innerHTML = first+last;
    }
  }
}//removeConVis

function objToHtml(obj) {
  return nodesHTML[obj.id];
}//objToHtml

function  htmlToObj(node) {
  return nodesObjects[parseInt(node.id)];
}//htmlToObj
