let n = 0;
let c = 5;
let alpha = 255;


function setup(){
  createCanvas(600, 600);
  background(0);
  angleMode(DEGREES);

}

function draw(){
  
  let a = n * 137.5;
  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2;
  let y = r * sin(a) + height / 2;

  noStroke();
  fill(n%255, a % 2, 255, alpha);
  ellipse(x, y, 8, 8);
  n++;
  alpha = alpha - 0.2;
}