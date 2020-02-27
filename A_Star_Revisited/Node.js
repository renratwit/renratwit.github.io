class Node{
    constructor(i, j){
        this.i = i;
        this.j = j;

        this.isBlock = false;

        this.neighbors = [];
        this.cameFrom = undefined;

        this.f, this.g, this.h;
    }
    
}