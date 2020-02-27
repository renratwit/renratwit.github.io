let particle;
let particles = [];
function setup(){
    createCanvas(500, 500);
    //background(0);
    angleMode(DEGREES);
    rectMode(CENTER);
}

/**
 * Create some particles at mouse
 * Rotate particles
 * Move particles away from mouse & decrease size
 * Remove particle when it gets too small
 */
function draw(){
    /**
     * push particles into array
     * show array
     * splice array when particles too small
     */
    background(0);

    if(mouseIsPressed){
         for(var i = 0; i < 3; i++)
            particles.push(new Particle());
    }

    for(var i = 0; i < particles.length; i++){
        particles[i].show();
        particles[i].update();
    }

    for(var i = 0; i < particles.length; i++){
        if(particles[i].size <= 0)
            particles.splice(i, 1);
    }

}

class Particle{
    constructor(){
        this.degree = 0;
        this.x = mouseX + random(-25, 25);
        this.y = mouseY + random(-25, 25);
        this.size = random(30, 50);
        
        this.xOff = random(-1, 1) * 5;
        this.yOff = random(-1, 1) * 5;
    }

    update(){
        let dx = noise(this.x);
        let dy = noise(this.y);
        
        this.x += this.yOff;
        this.y += this.xOff;
        
        this.size -= 1;
    }

    show(){
        noFill();
        rectMode(CENTER);
        stroke(255);
        strokeWeight(0.75);

        push();
            translate(this.x, this.y);
            rotate(this.degree);
            rect(0, 0, this.size, this.size);
            this.degree += 15;
        pop();
    
         
    }

    
}//end Particle class