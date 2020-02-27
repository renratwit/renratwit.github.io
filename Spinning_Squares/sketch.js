let balls = [];
let ball1;

function setup(){
    createCanvas(800, 600);
    //ball1 = new Ball();
    //ball2 = new Ball();

    for(var i = 0; i < 5; i++){
        balls.push(new Ball());
    }
    
}

function draw(){
    background(0);

    for(var i = 0; i < balls.length; i++){
        balls[i].show();
        

         for(var j = i + 1; j < balls.length; j++){
                if(balls[i].touch(balls[j])){

                    var temp = balls[i].deltaX;
                    balls[i].deltaX = balls[i].deltaY;
                    balls[i].deltaY = temp;

                    var temp = balls[j].deltaX;
                    balls[j].deltaX = balls[j].deltaY;
                    balls[j].deltaY = temp;

                    

                    // var tempX = balls[i].deltaX;
                    // var tempY = balls[i].deltaY;

                    // balls[i].deltaX = -(balls[i].deltaX + balls[j].deltaX)/2;
                    // balls[i].deltaY = -(balls[i].deltaY + balls[j].deltaY)/2;

                    // balls[j].deltaX = -(tempX + balls[j].deltaX)/2;
                    // balls[j].deltaY = -(tempY + balls[j].deltaY)/2;
                    
                    // balls[i].deltaX = -balls[i].deltaX;
                    // balls[i].deltaY = -balls[i].deltaY;

                    // balls[j].deltaX = -balls[j].deltaX;
                    // balls[j].deltaY = -balls[j].deltaY;
                }
        }

        balls[i].move();
    }

}