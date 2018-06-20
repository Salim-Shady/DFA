var input = document.getElementById('inputString');
var error = document.getElementById('error');

input.addEventListener('keydown', function(e) {
  if (e.keyCode === 116) {
    input.value = "";
    return
  }

  if (e.keyCode !== 8 && isNaN(e.key)) {
    e.preventDefault();
    error.innerHTML = "Only numbers allowed";
  } else {
    error.innerHTML = check(nodesObjects[0],input.innerHTML);
  }
});



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
