import rotateHandler from "./CounterClockController";
//import removeColor from "./RemoveGroupController";

let selectedCircle = null; // Track the currently selected circle
const groupArr = [] 

export function processClick(model, canvas, x, y){
    //console.log("Inside select controller")
    const ctx = canvas.getContext('2d');

    //iterate over the squares to check if the click is inside the inner circle
    for (let i = 0; i < model.board.squares.length ; i++){
        const sq = model.board.squares[i]

        // Calculate the coordinates of the center of the inner circle
        const circleX = 100 + sq.column * 80; 
        const circleY = 200 + sq.row * 80;

        // Calculate the distance from the click to the center of the circle
        const distance = Math.sqrt((x - circleX) ** 2 + (y - circleY) ** 2);

        // If the distance is less than the circle's radius, it means the click is inside the circle
        if (distance < 8) {

            // Check if a circle was previously selected
            if (selectedCircle) {
                // Reset the previously selected circle and its associated group to their original state
                resetCircleAndGroup(selectedCircle, model, canvas);
            }

            // Set the newly selected circle
            selectedCircle = sq;

            // Change the circle color to red
            ctx.beginPath();
            ctx.arc(circleX, circleY, 8, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();
            ctx.closePath(); 

            // Determine the coordinates of the square containing the circle
            const squareX = sq.column;
            const squareY = sq.row;
            const color = sq.color;

            //console.log("row "+ squareY +" column "+ squareX + " color "+color)

            // Define the offsets for the neighboring squares
            const offsets = [
            { dx: -1, dy: -1 },  // upper right
            { dx: -1, dy: 0 },   // upper left
            { dx: 0, dy: 0 },   // bottom left
            { dx: 0, dy: -1 },  // bottom right
            ];
            
            for (const offset of offsets) {
                const neighborX = squareX + offset.dx;
                const neighborY = squareY + offset.dy;
                const neighborColor = sq.color;

                // Find the neighboring square in the model (neighbor contains row, column, color)
                const neighbor = model.board.squares.find(sq => sq.column === neighborX && sq.row === neighborY);

                if (neighbor) {
                    groupArr.push(neighbor)
                    /* 
                    // Update the border color of the neighboring square
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 2;
                    ctx.rect(100 + neighbor.column * 80, 200 + neighbor.row * 80, 80, 80);
                    ctx.stroke(); */
                    colorSquareBorder(ctx, neighbor, 'red');
                }
            }
            //colorCircle(ctx, sq, 'red');
            let newGrpArr = removeColor(groupArr)
            return newGrpArr
        }
    }
}

function colorSquareBorder(ctx, square, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.rect(100 + square.column * 80, 200 + square.row * 80, 80, 80);
    ctx.stroke();
}

function colorCircle(ctx, square, color) {
    ctx.beginPath();
    ctx.arc(100 + square.column * 80, 200 + square.row * 80, 8, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function removeColor(groupArr){

    let firstColor = groupArr[0].color
    let flag = false;
    for(let i = 1; i < groupArr.length; i++){
        if(firstColor != groupArr[i].color){
            flag = false;
            return groupArr
        }else{
            flag = true;
        }
    }
    if(flag == true){
        for(let i = 0; i < groupArr.length; i++){
            groupArr[i].color = ''
        }
        return groupArr;
    }
}

// get the circle and draw the red
// currently everything in the processClick. Separate it.
function selectGroup(){}

// Function to reset a circle and its associated group to their original state
function resetCircleAndGroup(circle,model,canvas){
    const ctx = canvas.getContext('2d');
    const squareX = circle.column;
    const squareY = circle.row;

    // Define the offsets for the four squares surrounding the circle
    const offsets = [
        { dx: -1, dy: -1 },  // upper right
        { dx: -1, dy: 0 },   // upper left
        { dx: 0, dy: -1 },   // bottom right
        { dx: 0, dy: 0 },    // bottom left
    ];

    // Reset the border colors of the neighboring squares
    for (const offset of offsets) {
        const neighborX = squareX + offset.dx;
        const neighborY = squareY + offset.dy;

        // Find the neighboring square in the model
        const neighbor = model.board.squares.find(sq => sq.column === neighborX && sq.row === neighborY);

        if (neighbor) {
            // Update the border color of the neighboring square to the original color
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.rect(100 + neighbor.column * 80, 200 + neighbor.row * 80, 80, 80);
            ctx.stroke();
        }

        // only draw the circles for inside - https://www.w3schools.com/jsref/canvas_arc.asp
        //https://stackoverflow.com/a/3736117/11441843
        let i = 0;
        while (i < model.board.squares.length){
            let sq = model.board.squares[i];
            if(sq.column * 80 !== 0 && sq.row * 80 !== 0){
                ctx.beginPath();
                ctx.arc(100+sq.column * 80, 200+sq.row * 80, 8, 0, 2 * Math.PI);
                ctx.fillStyle = "white"
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
            i++;
    }

    }

    // Clear the selectedCircle variable and clear the group array
    selectedCircle = null;
    groupArr.length=0;
}

/*
if we want to find the 4 squares around the circle
row and column = square is the bottom left
we need to find upper right, upper left, bottom right
how to do that?
upper right = row-1, column-1
upper left = row-1, column
bottom right = row, column-1
*/