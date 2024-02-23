document.addEventListener("DOMContentLoaded", function() {
    // Get the canvas element
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = 400;
    canvas.height = 800;

    // Load the image
    var img = new Image();
    img.onload = function() {
        // Once the image is loaded, draw it on the canvas
        var imgWidth, imgHeight;
        if (img.width > img.height) {
            imgWidth = canvas.width - 60; // 30px margin on each side
            imgHeight = img.height * (imgWidth / img.width);
        } else {
            imgHeight = canvas.height - 100; // 50px margin on top and bottom
            imgWidth = img.width * (imgHeight / img.height);
        }
        var x = (canvas.width - imgWidth) / 2;
        var y = (canvas.height - imgHeight) / 2;
        context.drawImage(img, x, y, imgWidth, imgHeight);

        // Draw the toggle button
        var buttonWidth = 70;
        var buttonHeight = 30;
        var buttonX = (canvas.width - buttonWidth) * 0.8;
        var buttonY = canvas.height - 70;
        var isDrawingEnabled = false;
        var drawingColor = 'black'; // Default drawing color
        var currentCursor = 'default'; // Default cursor

        // Color squares
        var colorSquares = [
            { x: 20, y: buttonY, color: 'black' },
            { x: 60, y: buttonY, color: 'blue' },
            { x: 100, y: buttonY, color: 'red' },
            { x: 140, y: buttonY, color: 'green' },
            { x: 180, y: buttonY, color: 'yellow' },
            { x: 220, y: buttonY, color: 'orange' },
            { x: 260, y: buttonY, color: 'purple' }
        ];

        drawButtons();

        // Function to draw buttons
        function drawButtons() {
            // Clear the area for buttons
            context.clearRect(0, canvas.height - 80, canvas.width, 80);

            // Draw the toggle button
            context.fillStyle = isDrawingEnabled ? 'green' : 'red';
            context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
            context.fillStyle = 'white';
            context.fillText(isDrawingEnabled ? 'Drawing On' : 'Drawing Off', buttonX + 10, buttonY + 20);

            // Draw the revert button
            var revertButtonX = (canvas.width - buttonWidth) / 2 - 80;
            context.fillStyle = 'blue';
            context.fillRect(revertButtonX, buttonY, buttonWidth, buttonHeight);
            context.fillStyle = 'white';
            context.fillText('Revert', revertButtonX + 10, buttonY + 20);

            // Draw color squares
            var totalWidth = colorSquares.length * 40; // Total width of all squares plus padding
            var startX = (canvas.width - totalWidth) / 2; // Starting point for centering
            colorSquares.forEach(function(square, index) {
                var x = startX + index * 40; // 40 is the width of each square plus padding
                context.fillStyle = square.color;
                context.fillRect(x-30, square.y - 40, 30, 30);
            });
        }

        // Event listener for the toggle button
        canvas.addEventListener('click', function(e) {
            if (
                e.offsetX >= buttonX &&
                e.offsetX <= buttonX + buttonWidth &&
                e.offsetY >= buttonY &&
                e.offsetY <= buttonY + buttonHeight
            ) {
                // Toggle drawing mode
                isDrawingEnabled = !isDrawingEnabled;
                drawButtons();
            }

            if (
                e.offsetX >= (canvas.width - buttonWidth) / 2 - 120 &&
                e.offsetX <= (canvas.width - buttonWidth) / 2 - 120 + buttonWidth &&
                e.offsetY >= buttonY &&
                e.offsetY <= buttonY + buttonHeight
            ) {
                // Clear the canvas and redraw the image
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, x, y, imgWidth, imgHeight);
                drawButtons();
            }

            // Check if clicked on color squares
            colorSquares.forEach(function(square) {
                if (
                    e.offsetX >= square.x &&
                    e.offsetX <= square.x + 30 &&
                    e.offsetY >= square.y - 40 &&
                    e.offsetY <= square.y - 10
                ) {
                    drawingColor = square.color;
                    // Change cursor to a circle with the same color
                    canvas.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\'><circle cx=\'10\' cy=\'10\' r=\'5\' fill=\'' + drawingColor + '\'/><circle cx=\'10\' cy=\'10\' r=\'6\' stroke=\'black\' stroke-width=\'1\' fill=\'none\'/></svg>") 10 10, auto';
                    return;
                }
            });
        });

        // Event listener for the revert button
        canvas.addEventListener('click', function(e) {
            var revertButtonX = (canvas.width - buttonWidth) / 2 - 80;
            if (
                e.offsetX >= revertButtonX &&
                e.offsetX <= revertButtonX + buttonWidth &&
                e.offsetY >= buttonY &&
                e.offsetY <= buttonY + buttonHeight
            ) {
                // Revert cursor to default
                canvas.style.cursor = 'default';
            }
        });

        // Variables to track the drawing state
        var isDrawing = false;
        var lastX, lastY;

        // Event listeners for mouse actions
        canvas.addEventListener('mousedown', function(e) {
            if (isDrawingEnabled && isInsideImage(e.offsetX, e.offsetY)) {
                isDrawing = true;
                [lastX, lastY] = [e.offsetX, e.offsetY];
            }
        });

        canvas.addEventListener('mousemove', function(e) {
            if (isDrawingEnabled && isDrawing && isInsideImage(e.offsetX, e.offsetY)) {
                var x = e.offsetX;
                var y = e.offsetY;

                // Draw a line segment
                context.beginPath();
                context.moveTo(lastX, lastY);
                context.lineTo(x, y);
                context.strokeStyle = drawingColor; // Set the drawing color
                context.lineWidth = 2;
                context.lineCap = 'round';
                context.stroke();

                [lastX, lastY] = [x, y];
            }
        });

        canvas.addEventListener('mouseup', function() {
            isDrawing = false;
        });

        canvas.addEventListener('mouseout', function() {
            isDrawing = false;
        });
    };
    img.src = 'cat.png'; // Set the path to your image file

    // Function to check if the mouse is inside the image
    function isInsideImage(x, y) {
        var imgWidth, imgHeight;
        if (img.width > img.height) {
            imgWidth = canvas.width - 60; // 30px margin on each side
            imgHeight = img.height * (imgWidth / img.width);
        } else {
            imgHeight = canvas.height - 100; // 50px margin on top and bottom
            imgWidth = img.width * (imgHeight / img.height);
        }
        var imgX = (canvas.width - imgWidth) / 2;
        var imgY = (canvas.height - imgHeight) / 2;

        return (
            x > imgX &&
            x < imgX + imgWidth &&
            y > imgY &&
            y < imgY + imgHeight
        );
    }
});
