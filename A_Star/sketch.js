//dimension of entire grid in pixels
let dimensions = 800;

//number of rows and columns.
//rows and cols will most likely always be equal...
let cols = 20;
let rows = 20;

let grid = new Array(cols);

let openSet = [];
let closedSet = [];

let start, end;

let path;

let startButton;
let begin = false;

let cameFrom = new Map();

let w, h;

function setup() {
    createCanvas(dimensions, dimensions);
    background(0);

    startButton = createButton('GO');
    startButton.position(dimensions + 20, 50);
    startButton.mousePressed(() => {
        begin = true;
        console.log("Starting Search...");
    });

    //create 2D array
    for (var i = 0; i < cols; i++)
        grid[i] = new Array(rows);

    //populate grid
    for (var y = 0; y < cols; y++) {
        for (var x = 0; x < rows; x++) {
            grid[y][x] = new Cell(y, x, grid, width);
        }
    }


    start = grid[0][0];
    end = grid[rows - 1][cols - 1];
    start.isBlock = false;
    end.isBlock = false;



    //populate neighbors
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (!grid[i][j].isBlock)
                grid[i][j].populateNeighbors(grid);
        }
    }

    //show grid
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(255);
        }
    }

    //show blocking cells
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if (grid[i][j].isBlock)
                grid[i][j].show(0, 0, 0);
        }
    }


    end.show(255, 0, 255);

    openSet.push(start);

    w = width / cols;
    h = height / rows;

    console.log(grid);

}

/*****************helper functions ******************************/
function removeFromArray(arr, element) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === element)
            arr.splice(i, 1);
    }
}

function heuristic(a, b) {
    var d = dist(a.i, a.j, b.i, b.j);
    return d;
}

function reconstructPath(cameFrom, current) {
    let totalPath = [current];
    while (cameFrom.has(current)) {
        current = current.cameFrom;
        totalPath.unshift(current);
    }
    return totalPath;
}
/***************************************************************/

function draw() {

    console.log("HERE");
    //start A*
    if (openSet.length > 0) {

        //current = node with lowest f
        var lowestIndex = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestIndex])
                lowestIndex = i;
        }

        let current = openSet[lowestIndex];

        //if the end is found
        if (openSet[lowestIndex] === end) {
            console.log("End Found");
            //draw the path
            var temp = current;
            path = [];
            path.push(temp);
            while(temp.cameFrom){
                path.push(temp.cameFrom);
                temp = temp.cameFrom;
            }
            for(var i = 0; i < path.length; i++){
                var x = path[i].i;
                var y = path[i].j;
                fill(0, 0, 200);
                stroke(0);
                ellipse(x * w + w/2, y * h + h/2, dimensions/rows, dimensions/rows);
            }
            noLoop();
            return;
        }

        closedSet.push(current);

        //openSet.remove(current)
        removeFromArray(openSet, current);

        //for each neighbor of current
        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var n = neighbors[i];
            if (!closedSet.includes(n)) {
                var tentG = current.g + 1;
                if (openSet.includes(n)) {
                    if (tentG < n.g){
                        n.g = tentG;
                    }    
                } else {
                    n.g = tentG;
                    openSet.push(n);
                }
                n.cameFrom = current;
                n.h = heuristic(n, end);
                n.f = n.g + n.h;
            }
        }//end for-loop
    } else { //ends algorithm
        console.log("No Path");
        noLoop();
    }

    //show openSet
    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(255, 0, 0);
    }

    //show closedSet
    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(0, 255, 0);
    }

    //show blocks
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if (grid[i][j].isBlock)
                grid[i][j].show(0, 0, 0);
        }
    }

    end.show(255, 0, 255);

}