let selectedCircle = null; // Track the currently selected circle

// Add a click event listener to the canvas
document.getElementById("myCanvas").addEventListener("click", function(event) {
    // Get the mouse coordinates relative to the canvas
    const canvasRect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;

    // Iterate over the squares to check if the click is inside an inner circle
    for (let i = 0; i < model.board.squares.length; i++) {
        const sq = model.board.squares[i];
        
        // Calculate the coordinates of the center of the inner circle
        const circleX = 100 + sq.column * 80 + 8;  // Adjust for the circle's radius
        const circleY = 200 + sq.row * 80 + 8;

        // Calculate the distance from the click to the center of the circle
        const distance = Math.sqrt((mouseX - circleX) ** 2 + (mouseY - circleY) ** 2);

        // If the distance is less than the circle's radius, it means the click is inside the circle
        if (distance < 8) {
            // Check if a circle was previously selected
            if (selectedCircle) {
                // Reset the previously selected circle and its associated group to their original state
                resetCircleAndGroup(selectedCircle);
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

            // Define the offsets for the four squares surrounding the selected circle
            const offsets = [
                { dx: -1, dy: -1 },  // upper right
                { dx: -1, dy: 0 },   // upper left
                { dx: 0, dy: -1 },   // bottom right
                { dx: 0, dy: 0 },    // bottom left
            ];

            // Update the border colors of the neighboring squares
            for (const offset of offsets) {
                const neighborX = squareX + offset.dx;
                const neighborY = squareY + offset.dy;
                
                // Find the neighboring square in the model
                const neighbor = model.board.squares.find(sq => sq.column === neighborX && sq.row === neighborY);
                
                if (neighbor) {
                    // Update the border color of the neighboring square to red
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 4;
                    ctx.rect(100 + neighbor.column * 80, 200 + neighbor.row * 80, 80, 80);
                    ctx.stroke();
                }
            }
        }
    }
});

// Function to reset a circle and its associated group to their original state
function resetCircleAndGroup(circle) {
    const squareX = circle.column;
    const squareY = circle.row;

    // Reset the circle's color to white
    const circleX = 100 + squareX * 80 + 8;
    const circleY = 200 + squareY * 80 + 8;
    ctx.beginPath();
    ctx.arc(circleX, circleY, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

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
            ctx.strokeStyle = '#184A5C';
            ctx.lineWidth = 4;
            ctx.rect(100 + neighbor.column * 80, 200 + neighbor.row * 80, 80, 80);
            ctx.stroke();
        }
    }

    // Clear the selectedCircle variable
    selectedCircle = null;
}
