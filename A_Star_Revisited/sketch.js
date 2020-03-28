let cols = 20;
let rows = 20;

let grid = new Array(cols);
for(var i = 0; i < cols; i++){
    grid[i] = new Array(rows);
}

let start;
let end;

let path; //set of Nodes that create the path

let open = [];
let closed = [];

let current;
let blocked = [];

let w, h;
function setup(){
    createCanvas(600, 600);
    background(255);
    
    w = width / cols;
    h = height / rows;

    //populate grid with Nodes
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            grid[i][j] = new Node(i, j);
        }
    }


    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    start.isBlock = false;
    end.isBlock = false;

    fill('rgb(0, 255, 0)');
    strokeWeight(0.5);
    rect(start.i * (width/cols), start.j * (height/rows), width/cols, height/rows);

    fill('rgb(255, 0, 0)');
    strokeWeight(0.5);
    rect(end.i * (width/cols), end.j * (height/rows), width/cols, height/rows);
    
    //set the neighbors of each node
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            if(grid[i][j].isBlock) {
                blocked.push(grid[i][j]);
            }
            grid[i][j].populateNeighbors();
        }
    }

    open.push(start);

    console.log(grid);
    // if(mouseIsPressed){
    //     let w = width / cols;
    //     let h = height/rows;
    //     var x = mouseX;
    //     var y = mouseY;
        
    //     fill('rgba(0, 0, 0, 0.01)');
    //     rect(x - (x % w), y - (y % h), w, h);
    //     console.log((Math.ceil(x / w) - 1) + ":" + (Math.ceil(y / h) - 1));
    // }
    //show blocks

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }

    //display the blocked cells
    for (var i = 0; i < blocked.length; i++) {
        fill('rgb(0, 0, 0)');
        rect(blocked[i].i * w, blocked[i].j * h, w, h);
    }

    

}


function draw(){
    
    //still searching
    if(open.length > 0){
        
        //current = node in OPEN with lowest f-cost
        current = open[0];
        for (var i = 0; i < open.length; i++) {
            if (open[i].f <= current.f) {
                if (open[i].h < current.h) {
                    current = open[i];
                }
            }
        }

        //remove current from OPEN
        removeFromArray(open, current);
        //add current to CLOSED
        closed.push(current);

        //if target node is found: do stuff & break from function
        if (current === end){
            tracePath();

            //draw the path
            for (var i = 0; i < path.length; i++){
                fill('rgb(255, 0, 0)');
                rect(path[i].i * w, path[i].j * h, w, h);
            }
            
            console.log("PATH FOUND");
            noLoop();
        }

        //for each neighbor of current
        for (var i = 0; i < current.neighbors.length; i++) {
            let n = current.neighbors[i];

            if (n.isBlock || closed.includes(n)) {
                continue;
            }

            let distanceToNeighbor = current.g + heuristic(current, n);
            //if new path to neighbor is shorter OR neighbor not in open
            if (heuristic(current, n) < distanceToNeighbor || !open.includes(n)) {
                distance = heuristic(current, n);
                n.g = heuristic(n, start);
                n.h = heuristic(n, end);
                n.f = n.h + n.g;
                n.parent = current;
                
                if(!open.includes(n)) {
                    open.push(n);
                }
            }

        }

    } else { //no path found
        console.log("No path");
        noLoop();
    }

    /**
     * draw everything
     */

    
    

     //draw open
     for (var i = 0; i < open.length; i++) {
        fill('rgb(0, 255, 0)');
        rect(open[i].i * w, open[i].j * h, width/cols, height/rows);
    }

     //draw closed
     for (var i = 0; i < closed.length; i++) {
        fill('rgb(0, 0, 255)');
        rect(closed[i].i * (width/cols), closed[i].j * (height/rows), width/cols, height/rows);
    }


}//end draw()

function getLowestFCostIndex(arr){
    let index = 0;
    for(var i = 0; i < arr.length - 1; i++){
        if (arr[i].f < arr[index].f){
            index = i;
        }
    }
    return index;
}

function removeFromArray(arr, elm){
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === elm)
            arr.splice(i, 1);
    }
}

function heuristic(p1, p2){
    var a = p1.i - p2.i;
    var b = p1.j - p2.j;
    return Math.abs(Math.sqrt(a*a + b*b));
}

function tracePath() {
    var temp = current;
            let path = [];
            path.push(temp);
            while(temp.parent){
                path.push(temp.parent);
                temp = temp.parent;
            }
        for(var i = 0; i < path.length; i++){
            var x = path[i].i;
            var y = path[i].j;
                fill('rgba(255, 0, 0, 1)');
                stroke(0);
                rect(x * w, y * h, w, h);
        }

}