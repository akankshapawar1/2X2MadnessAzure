export default function rotateHandler(model, row, column){
    const color = getColorByRowAndColumn(model, row, column);
    console.log("Row "+row+" Column "+column+" color "+color);
} 

function getColorByRowAndColumn(model, row, column) {
    const sq = model.board.squares;
    
    for (let i = 0; i < model.board.squares.length; i++) {
        const square = sq[i];
        if (square.row === row && square.column === column) {
            return square.color;
        }
    }
    
    // If no match is found, return a default value or handle the case as needed.
    return null; // You can change this to any default value or error handling.
}
