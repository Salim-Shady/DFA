  let container = document.getElementById('container');
  container.style.display = "inline-block";
  container.style.position = "absolute";

  function resize() {

    let containerBound = container.getBoundingClientRect();
    let center = containerBound.width/2;

    let bodyWidth = window.innerWidth;
    let offset =  (bodyWidth/2) - center;

    container.style.left = offset+"px";
  }

  window.onresize = function() {
    resize();
  }

  resize();
