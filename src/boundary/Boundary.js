//export entire canvas from model
export default function redrawCanvas(model, canvasObj, appObj){
    const ctx = canvasObj.getContext('2d');

    // clear the canvas area before rendering
    ctx.clearRect(0,0, canvasObj.width, canvasObj.height);

    // Draw the board
    let i = 0;
    //console.log("here")

    //loop through the squares array
    while (i < model.board.squares.length){

        let sq = model.board.squares[i];
        //console.log(sq);
        
        // to draw borders along the squares - https://stackoverflow.com/a/38174937/11441843
        //drawBorder(100+sq.column * 80, 200+sq.row * 80, 80, 80);

        // fill the square with the color
        ctx.fillStyle = sq.color;
        ctx.fillRect(100+sq.column * 80, 200+sq.row * 80, 80, 80);

        // draw borders for squares
        ctx.strokeStyle = '#184A5C'
        ctx.lineWidth = 4
        ctx.rect(100+sq.column * 80, 200+sq.row * 80, 80, 80)
        ctx.stroke()

        // draw red borders when selected
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 4
        ctx.rect(100+sq.column * 80, 200+sq.row * 80, 80, 80)
        ctx.stroke()

        // only draw the circles for inside - https://www.w3schools.com/jsref/canvas_arc.asp
        if(sq.column * 80 != 0 & sq.row * 80 != 0){
            ctx.beginPath();
            ctx.arc(98+sq.column * 80, 198+sq.row * 80, 8, 0, 2 * Math.PI);
            ctx.fillStyle = "white"
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
        i++;
    }

    // this is basically drawing the rectangle underneath the board. Rect color is the border color. Not a good approach.
    function drawBorder(xPos, yPos, width, height, thickness = 4){
        ctx.fillStyle= "#184A5C";
        ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
    }
     

    /*
    //Draw squares
    let sq0 = model.board.squares[0]
    console.log(sq0)
    let sq1 = model.board.squares[1]
    console.log(sq1)
    let sq2 = model.board.squares[2]
    console.log(sq2)
    let sq3 = model.board.squares[3]
    console.log(sq3)
    let sq4 = model.board.squares[4]
    console.log(sq4)
    let sq5 = model.board.squares[5]
    console.log(sq5)
    let sq6 = model.board.squares[6]
    console.log(sq6)
    let sq7 = model.board.squares[7]
    console.log(sq7)
    let sq8 = model.board.squares[8]
    console.log(sq8)

    //400X400 canvas and this must support 6x6
    // if a square were 60 pixels
    ctx.fillStyle = sq0.color
    ctx.fillRect(sq0.column * 60, sq0.row * 60, 60, 60)

    ctx.fillStyle = sq1.color
    ctx.fillRect(sq1.column * 60, sq1.row * 60, 60, 60)

    ctx.fillStyle = sq2.color
    ctx.fillRect(sq2.column * 60, sq2.row * 60, 60, 60)

    ctx.fillStyle = sq3.color
    ctx.fillRect(sq3.column * 60, sq3.row * 60, 60, 60)

    ctx.fillStyle = sq4.color
    ctx.fillRect(sq4.column * 60, sq4.row * 60, 60, 60)

    ctx.fillStyle = sq5.color
    ctx.fillRect(sq5.column * 60, sq5.row * 60, 60, 60)

    ctx.fillStyle = sq6.color
    ctx.fillRect(sq6.column * 60, sq6.row * 60, 60, 60)

    ctx.fillStyle = sq7.color
    ctx.fillRect(sq7.column * 60, sq7.row * 60, 60, 60)

    ctx.fillStyle = sq8.color
    ctx.fillRect(sq8.column * 60, sq8.row * 60, 60, 60)

    */
}