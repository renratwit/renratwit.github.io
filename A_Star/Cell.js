class Cell{

    constructor(i, j, grid, dimension){

        this.i = i;
        this.j = j;
        
        this.f = 0;
        this.g = 0;
        this.h = 0;

        this.neighbors = [];
        this.isBlock = false;
        this.isBlock = random(1) < 0.22 ? true:false;

        this.length = grid.length;
        this.d = dimension;
        this.size = this.d / this.length;

        this.cameFrom = undefined;
    }

    show(r, g, b){
        
        fill(r, g, b);
        stroke(0);
        rect(this.i * this.size, this.j * this.size, this.size - 0.5, this.size - 0.5);
    }

    populateNeighbors(grid){
        var i = this.i;
        var j = this.j;

        if(i < cols - 1 && !grid[i+1][j].isBlock)
            this.neighbors.push(grid[i + 1][j]);

        if(j < rows - 1 && !grid[i][j+1].isBlock)
            this.neighbors.push(grid[i]    [j + 1]);

        if(i > 0 && !grid[i - 1][j].isBlock)
            this.neighbors.push(grid[i - 1][j]);
            
        if(j > 0 && !grid[i][j-1].isBlock)
            this.neighbors.push(grid[i]    [j - 1]);
    }

}