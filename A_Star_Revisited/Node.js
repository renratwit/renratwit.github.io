class Node{
    constructor(i, j){
        this.i = i;
        this.j = j;

        this.g = 0; this.h = 0;
        this.f = this.g + this.h;

        this.isBlock = false;
        this.isBlock = random(1) < 0.25 ? true : false;

        this.neighbors = [];
        this.parent = undefined;
    }

    show(){
        fill(255);
        stroke(0);
        rect(this.i * (width/cols), this.j * (height/rows), width/cols, height/rows);
    }

    populateNeighbors(){
        var i = this.i;
        var j = this.j;

        //this is a huge PITA
        if (i < cols - 1 && !grid[i + 1][j].isBlock) {
            this.neighbors.push(grid[i + 1][j]);
          }
        if (i > 0 && !grid[i - 1][j].isBlock) {
            this.neighbors.push(grid[i - 1][j]);
          }
         if (j < rows - 1 && !grid[i][j + 1].isBlock) {
            this.neighbors.push(grid[i][j + 1]);
          }
        if (j > 0 && !grid[i][j - 1].isBlock) {
            this.neighbors.push(grid[i][j - 1]);
          }
        if (i > 0 && j > 0 && !grid[i - 1][j - 1].isBlock) {
            this.neighbors.push(grid[i - 1][j - 1]);
          }
        if (i < cols - 1 && j > 0 && !grid[i + 1][j - 1].isBlock) {
            this.neighbors.push(grid[i + 1][j - 1]);
          }
        if (i > 0 && j < rows - 1 && !grid[i - 1][j + 1].isBlock) {
            this.neighbors.push(grid[i - 1][j + 1]);
          }
        if (i < cols - 1 && j < rows - 1 && !grid[i + 1][j + 1].isBlock) {
            this.neighbors.push(grid[i + 1][j + 1]);
          }
    }

}


    
