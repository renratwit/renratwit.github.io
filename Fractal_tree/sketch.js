function setup() {
    createCanvas(500, 500);
    background(100);
    angleMode(DEGREES);
}

function draw() {
    translate(width / 2, height);
    branch(100);
}

function branch(length) {
    line(0, 0, 0, -length);
    translate(0, -length);

    if (length > 10) {
        push();
        rotate(90);
        branch(length * 0.6);
        pop();

        push();
        rotate(-90);
        branch(length * 0.6);
        pop();
    }


}