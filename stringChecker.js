var input = document.getElementById('inputString');
var error = document.getElementById('error');

document.getElementById('check').addEventListener('click', function(e) {
  if (check(nodesObjects[0], input.value)) {
    input.style = "border: 2px solid green";
  } else {
    input.style = "border: 2px solid red";
  }
});


//checks if the string will be accepted by node
function check(node, string) {
  if (string.length === 0) return node.accepting;
  else {
    if (!node.outputs[parseInt(string[0])]) {
      return false;
    } else {
      return check(node.outputs[parseInt(string[0])], string.slice(1));
    }
  }
}//check
