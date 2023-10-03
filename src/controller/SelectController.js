// If the group has no colors - 1. It should not turn red - Not done
//                              2. It should not be rotated - Done

/*
if we want to find the 4 squares around the circle
row and column = square is the bottom left
we need to find upper right, upper left, bottom right
how to do that?
upper right = row-1, column-1
upper left = row-1, column
bottom right = row, column-1
*/

let selectedCircle = null; // Track the currently selected circle
let groupArr = [];

const CIRCLE_RADIUS = 8;
const OFFSETS = [
    { dx: -1, dy: -1 },  // upper right
    { dx: -1, dy: 0 },   // upper left
    { dx: 0, dy: 0 },   // bottom left
    { dx: 0, dy: -1 },  // bottom right
];

//export function processClick(model, canvas, x, y, setSelectedGroups) {
export function processClick(model, canvas, x, y, forceRedraw, flag) {
    if(!flag){
    const ctx = canvas.getContext('2d');

    for (let sq of model.board.squares) {
        const circleX = 100 + sq.column * 80;
        const circleY = 200 + sq.row * 80;
        const distance = getDistance(x, y, circleX, circleY);

        if (distance < CIRCLE_RADIUS) {
            if (selectedCircle) {
                resetCircleAndGroup(selectedCircle, model, canvas);
            }

            selectedCircle = sq;

            groupArr = handleCircleClick(model, ctx, sq);
        
            if (!areAllSquresEmpty(groupArr)) {
                const newGrpArr = removeColor(groupArr, forceRedraw, model);
                return newGrpArr;
            }
            break;  // Exit loop if a circle has been processed.
        }
    }
}
}

function handleCircleClick(model, ctx, sq) {
    // Highlight the circle
    drawCircle(ctx, sq, 'red');

    // Highlight the neighboring squares
    for (const offset of OFFSETS) {
        const neighbor = getNeighbor(model, sq, offset);
        if (neighbor) {
            groupArr.push(neighbor);
            drawRectangle(ctx, neighbor, 'red');
        }
    }
    return groupArr;
}

function getNeighbor(model, square, offset) {
    const neighborX = square.column + offset.dx;
    const neighborY = square.row + offset.dy;
    return model.board.squares.find(sq => sq.column === neighborX && sq.row === neighborY);
}

function drawCircle(ctx, sq, color) {
    ctx.beginPath();
    ctx.arc(100 + sq.column * 80, 200 + sq.row * 80, CIRCLE_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function drawRectangle(ctx, sq, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.rect(100 + sq.column * 80, 200 + sq.row * 80, 80, 80);
    ctx.stroke();
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function resetCircleAndGroup(circle, model, canvas) {
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
                ctx.fillStyle = 'white'
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

//function removeColor(groupArr, setSelectedGroups, model) {
function removeColor(groupArr, forceRedraw, model) {
    const firstColor = groupArr[0].color;

    const allSameColor = groupArr.every(item => item.color === firstColor);

    if (allSameColor) {
        //groupArr.forEach(item => item.color = '');
        groupArr.forEach(item => item.color = 'white');
        //console.log(typeof setSelectedGroups);
        model.updateMoveCount(+1);
        //setSelectedGroups([...groupArr]);
        forceRedraw(+1);
    }
    return groupArr;
}


export function areAllSquresEmpty(groupArr) {
    for (let i = 0; i < groupArr.length; i++) {
        //if (groupArr[i].color !== '') {
        if (groupArr[i].color !== 'white') {
            return false;
        }
    }
    return true;
}