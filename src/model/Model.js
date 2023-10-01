import { config_4x4, config_5x5, config_6x6 } from "./configs";

export class Board{
    constructor(config){
        if(config){
            this.squares = []
            this.size = parseInt(config.numColumns)
        
            for (let csq of config.baseSquares){
                //{ "color" : "green", "row": "0", "column" : "0" }
                let sq = new Square(parseInt(csq.row), parseInt(csq.column), csq.color)
                this.squares.push(sq)
            }
        }
    }
}

export default class Model{
    constructor(ind){
        this.configs = [config_4x4, config_5x5, config_6x6]
        this.numMoves = 0
        if(ind === undefined){
            this.currentConfig = 0;
        }
        else {
            this.currentConfig = ind;
        }
        this.board = new Board(this.configs[this.currentConfig])
    }

    updateMoveCount(delta){
        this.numMoves += delta; 
    }

    resetMoveCount(){
        this.numMoves = 0;
    }

    /*
    load_4(){
        console.log("4")
        //this.flag=1
        //this.configs = [config_4x4, config_5x5, config_6x6]
        //this.currentConfig = 0;
        this.board = new Board(this.configs[0])
    }

    load_5(){
        console.log("5")
        this.flag=1
        this.configs = [config_4x4, config_5x5, config_6x6]
        this.currentConfig = 1;
        this.board = new Board(this.configs[this.currentConfig])
    }

    load_6(){
        console.log("6")
        this.flag=1
        this.configs = [config_4x4, config_5x5, config_6x6]
        this.currentConfig = 2;
        this.board = new Board(this.configs[this.currentConfig])
    }*/
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