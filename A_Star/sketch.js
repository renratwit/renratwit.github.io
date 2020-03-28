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

let begin = false;

let cameFrom = new Map();

let w, h;

function setup() {
    var canvas = createCanvas(dimensions, dimensions);
    background(0);
    canvas.parent('main-container');
    pixelDensity(1);

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
    // Am I still searching?
  if (openSet.length > 0) {

    // Best next option
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    // Did I finish?
    if (current === end) {
        console.log("End Found");
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
                fill('rgba(0, 0, 200, 1)');
                stroke(0);
                rect(x * w, y * h, dimensions/rows, dimensions/rows);
        }
      noLoop();
    }

    // Best option moves from openSet to closedSet
    removeFromArray(openSet, current);
    closedSet.push(current);

    // Check all the neighbors
    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      // Valid next spot?
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + heuristic(neighbor, current);

        // Is this a better path than before?
        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        // Yes, it's a better path
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }

    }
    // Uh oh, no solution
  } else {
    console.log('no solution');
    noLoop();
    return;
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