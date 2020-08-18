// TODO: implement resizing support

function makeStarsCanvas(starSize = 0) {
  const canvas = document.createElement("canvas");
  canvas.className = "star-canvas";
  canvas.height = document.body.scrollHeight * 2; // TODO: change based on z position
  canvas.width = document.body.scrollWidth + 1000;
 

  const containerDiv = document.getElementsByClassName("pageBody")[0];
  canvas.height = containerDiv.clientHeight*0.8;
  canvas.width = containerDiv.clientWidth;

  const w = canvas.width+10000;
  const h = canvas.height;
  // const w = canvas.width + 200;
  // const h = canvas.height * 5;
  const stars = [];

  // If you want the density to be consistent, consider changing
  //  the number of stars based on the area of the canvas as well
  for (var i = 0; i < 500 * (Math.max(1, 3 - starSize)); i++) {
    stars.push({
      x: Math.ceil(Math.random() * w),
      y: Math.ceil(Math.random() * h),
      radius: Math.ceil(Math.random() + starSize / 2.0)
    });
  }

  const context = canvas.getContext("2d");
  stars.forEach(function (star) {
    context.beginPath();
    context.fillStyle = "rgba(255, 255, 255, 0.8)";
    context.arc(star.x, star.y, star.radius, 0, 1.5 * Math.PI);
    context.shadowColor = "yellow";
    context.shadowBlur = 9;
    context.fill();
  });

  window.addEventListener("resize",function(){
    canvas.height = containerDiv.clientHeight*0.8;
    canvas.width = containerDiv.clientWidth;
    
    stars.forEach(function (star) {
      context.beginPath();
      context.fillStyle = "rgba(255, 255, 255, 0.8)";
      context.arc(star.x, star.y, star.radius, 0, 1.5 * Math.PI);
      context.shadowColor = "yellow";
      context.shadowBlur = 9;
      context.fill();
    });
  });


  return canvas;
}

const starDivs = [{
  name: "stars-far",
  starSize: 0
}, {
  name: "stars-middle",
  starSize: 0.8
}, {
  name: "stars-near",
  starSize: 1.4
}];

starDivs.forEach(starDiv => {
  const div = document.getElementById(starDiv.name);
  div.appendChild(makeStarsCanvas(starDiv.starSize));
});