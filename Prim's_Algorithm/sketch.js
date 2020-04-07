/**
 * http://www.mathcs.emory.edu/~cheung/Courses/171/Syllabus/11-Graph/prim2.html
 */
let vertices = [];



function setup(){
    createCanvas(700, 700);
    //background(0);
    //randomly populate verticies
    for(var i = 0; i < 20; i++){
        vertices.push(createVector(random(0, width - 50), random(0, height - 50)));
    }
}

function distance(v1, v2){
    return dist(v1.x, v1.y, v2.x, v2.y);
}

function connect(v1, v2){
    stroke(255);
    strokeWeight(5);
    line(v1.x, v1.y, v2.x, v2.y);
}

function mousePressed(){
    vertices.splice(0, 1);
    vertices.push(createVector(mouseX, mouseY));
}

function MST(){
    background(0);

    let reached = [];
    let unreached = [];
    
    //all vertices are unreached
    unreached = [...vertices];

    //Mark the starting node as reached
    //All other nodes are unreached
    reached.push(unreached[0]);
    unreached.splice(0, 1);

    for(var vertex of vertices){
        fill(255);
        ellipse(vertex.x, vertex.y, 10, 10);
    }

    while(unreached.length > 0){
        //Find an edge with minimum cost in the graph that connects
            //a REACHED node X to an UNREACHED node Y
        let minDist = Infinity;

        //substitute variables to access outside of index scopes
        let iValue;
        let jValue;

        //nested loop to find the shortest distance of all reached to all unreached nodes
        for(var i = 0; i < reached.length; i++){
            for(var j = 0; j < unreached.length; j++){
                currentDist = distance(reached[i], unreached[j]);
                if(minDist > currentDist) {
                    minDist = currentDist;
                    iValue = i;
                    jValue = j;
                }//end if
            }//end unreached loop
        }//end reached loop
        
        connect(reached[iValue], unreached[jValue]);
        reached.push(unreached[jValue]);
        unreached.splice(jValue, 1);
    }//end while-loop
}

function draw(){
    MST();
}//end draw()