let img;
let strokes = [];

function preload(){
    img = loadImage("TheStarryNight.jpg");
}

function setup(){
    createCanvas(img.width, img.height);
    background(51);
}


function draw(){
    if(mouseIsPressed){
        for(var i = 0; i < 3; i++)
        strokes.push(new Stroke(mouseX, mouseY));
    }

    for(brush of strokes){
        brush.update();
        brush.show();
    }

    for(var i = 0; i < strokes.length; i++){
        if(strokes[i].radius < 0){
            strokes.splice(i, 1);
        }
    }

}

class Stroke{
    constructor(x, y){
        this.x = x;
        this.y = y;

        this.xOff = 0;
        this.yOff = 0;

        this.radius = random(10, 15);
    }

    update(){
        this.radius -= random(0.25, 0.6);

        this.xOff += random(-2, 2);
        this.yOff += random(-2, 2);

        this.x += noise(this.x) * this.xOff;
        this.y += noise(this.y) * this.yOff;
    }

    show(){
       strokeWeight(0);
       //img.loadPixels();
       fill(img.get(this.x, this.y));
       ellipse(this.x, this.y, this.radius, this.radius);
       //img.updatePixels();
    }
}