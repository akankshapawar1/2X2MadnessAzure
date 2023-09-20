export class Board{
    constructor(con){
        this.config = con;
    }
}

export class Square{
    constructor(row, col){
        this.r = row;
        this.c = col;
    }
}

export class Direction{
    constructor(row, col){
        this.r = row;
        this.c = col;
    }
}

export class Group{
    constructor(xx, yy){
        this.x = xx;
        this.y = yy;
    }
}

export default class Model{
    constructor(info){
        this.initialize(info);
    }
    initialize(info){
        //this.Board = new Board(config_4x4);
        this.moveCount = 0;
        this.currentConfig = 1;
        this.victory = false;
    }

}