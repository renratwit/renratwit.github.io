class Ball{

    constructor(x, y, minRandom, maxRandom){
        this.x = x;
        this.y = y;

        this.xOff = 0;
        this.yOff = 0;

        this.radius = random(minRandom, maxRandom);
    }

    update(){
        this.radius -= random(0.25, 0.5);
        
        //a randomness to determine which direction each brush will flow
        this.xOff += random(-1, 1);
        this.yOff += random(-1, 1);

        //noise will return a psuedo-random, positive value between 0 and 1
        //the operation shortens the distance between new circles
        this.dx = noise(this.x) * this.yOff;
        this.dy = noise(this.y) * this.xOff;

        this.x += this.dx;
        this.y += this.dy;

    }

    show(){
        ellipse(this.x, this.y, this.radius, this.radius);
    }



}