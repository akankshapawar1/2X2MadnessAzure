//export entire canvas from model
export default function redrawCanvas(model, canvasObj, appObj){
    const ctx = canvasObj.getContext('2d');

    // clear the canvas area before rendering
    ctx.clearRect(0,0, canvasObj.width, canvasObj.height);

    //https://stackoverflow.com/a/50233691/11441843
    //inner circles were visible (6 to 4, 5 to 4)
    ctx.beginPath();

    // Draw the board
    let i = 0;

    //loop through the squares array
    while (i < model.board.squares.length){

        let sq = model.board.squares[i];

        // fill the square with the color
        ctx.fillStyle = sq.color;
        ctx.fillRect(100+sq.column * 80, 200+sq.row * 80, 80, 80);

        // draw borders for squares
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.rect(100+sq.column * 80, 200+sq.row * 80, 80, 80)
        ctx.stroke()

        // only draw the circles for inside - https://www.w3schools.com/jsref/canvas_arc.asp
        //https://stackoverflow.com/a/3736117/11441843
        if(sq.column * 80 !== 0 && sq.row * 80 !== 0){
            ctx.beginPath();
            //ctx.arc(98+sq.column * 80, 198+sq.row * 80, 8, 0, 2 * Math.PI);
            ctx.arc(100+sq.column * 80, 200+sq.row * 80, 8, 0, 2 * Math.PI);
            ctx.fillStyle = "white"
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }

        i++;
    }   
}