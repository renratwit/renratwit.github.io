/**
 * introduction to Perlin Noise
 * Attempted to create a simple burst-effect brush
 * Ended up with a Lovecraftiant nightmare
 */

let balls = [];
let min, max;
function setup(){
    createCanvas(1000, 1000);
    
    //pixelDensity(1);
    background(0);

    min = createSlider(0, 80);
    min.position(width + 20, 10);

    max = createSlider(min.value() + 1, min.value() * 2, min.value());
    max.position(width + 20, 40);

    
}

function draw(){

    for(var i = 0; i < balls.length; i++){
        balls[i].show();
        balls[i].update();
        console.log(balls[i].dx + " " + balls[i].dy);

        if(balls[i].radius <= 0)
            balls.splice(i, 1);
    }
    
    if(mouseIsPressed && mouseX <= width){
        for(var i = 0; i < 5; i++)
            balls.push(new Ball(mouseX, mouseY, min.value(), max.value()));
    }

}
  