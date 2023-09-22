import { config_4x4, config_5x5, config_6x6 } from "./configs";


export class Board{
    constructor(config){
        this.squares = []
        this.size = parseInt(config.numColumns)
        
        for (let csq of config.baseSquares){
            //{ "color" : "green", "row": "0", "column" : "0" }
            let sq = new Square(parseInt(csq.row), parseInt(csq.column), csq.color)
            this.squares.push(sq)
        }
    }
}

export default class Model{
    constructor(){
        this.configs = [config_4x4, config_5x5, config_6x6]
        this.currentConfig = 2;
        this.board = new Board(this.configs[this.currentConfig])
    }
}

export class Square{
    constructor(row, col, color){
        this.row = row;
        this.column = col;
        this.color = color;
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

