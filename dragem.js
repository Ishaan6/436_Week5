document.addEventListener("DOMContentLoaded", function () {
    // Get the canvas element
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = 400;
    canvas.height = 800;

    // Load the image
    var img = new Image();
    img.onload = function () {
        // Once the image is loaded, draw it on the canvas
        var imgWidth, imgHeight;
        imgWidth = canvas.width / 2; // Initial width
        imgHeight = img.height * (imgWidth / img.width);
        var x = (canvas.width - imgWidth) / 2;
        var y = (canvas.height - imgHeight) / 2;
        var rotation = 0; // Initial rotation angle
        drawImage();

        // Variables to track the movement state
        var isDragging = false;
        var isResizing = false;
        var isRotating = false;
        var offsetX, offsetY;
        var originalWidth = imgWidth;
        var originalHeight = imgHeight;

        // Event listeners for mouse actions
        canvas.addEventListener('mousedown', function (e) {
            var mouseX = e.clientX - canvas.getBoundingClientRect().left;
            var mouseY = e.clientY - canvas.getBoundingClientRect().top;

            // Check if the mouse is clicked within the image boundaries
            if (mouseX > x && mouseX < x + imgWidth && mouseY > y && mouseY < y + imgHeight) {
                isDragging = true;
                offsetX = mouseX - x;
                offsetY = mouseY - y;
            }

            // Check if the mouse is clicked on the bottom right corner for resizing
            if (
                mouseX > x + imgWidth - 20 &&
                mouseX < x + imgWidth + 20 &&
                mouseY > y + imgHeight - 20 &&
                mouseY < y + imgHeight + 20
            ) {
                isResizing = true;
                offsetX = mouseX - imgWidth;
                offsetY = mouseY - imgHeight;
            }

            // Check if the mouse is clicked within the rotation handle
            if (
                mouseX > x + imgWidth - 25 &&
                mouseX < x + imgWidth + 25 &&
                mouseY > y - 25 &&
                mouseY < y + 25
            ) {
                isRotating = true;
                offsetX = mouseX - x;
                offsetY = mouseY - y;
            }
        });

        canvas.addEventListener('mousemove', function (e) {
            if (isDragging) {
                x = e.clientX - canvas.getBoundingClientRect().left - offsetX;
                y = e.clientY - canvas.getBoundingClientRect().top - offsetY;
                redraw();
            } else if (isResizing) {
                imgWidth = e.clientX - canvas.getBoundingClientRect().left - x + offsetX;
                imgHeight = e.clientY - canvas.getBoundingClientRect().top - y + offsetY;
                redraw();
                // Update the position of the resizing handle
                drawResizeHandle(x + imgWidth, y + imgHeight);
            } else if (isRotating) {
                var angle = Math.atan2(e.clientY - canvas.getBoundingClientRect().top - y - offsetY, e.clientX - canvas.getBoundingClientRect().left - x - offsetX);
                rotation = angle;
                redraw();
            }
        });

        canvas.addEventListener('mouseup', function () {
            isDragging = false;
            isResizing = false;
            isRotating = false;
        });

        canvas.addEventListener('mouseout', function () {
            isDragging = false;
            isResizing = false;
            isRotating = false;
        });

        function redraw() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawImage();
            drawResizeHandle();
            drawRotateHandle();
        }

        function drawImage() {
            context.save();
            context.translate(x + imgWidth / 2, y + imgHeight / 2);
            context.rotate(rotation);
            context.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
            context.restore();
        }

        function drawResizeHandle() {
            context.fillStyle = 'black';
            context.beginPath();
            context.arc(x + imgWidth, y + imgHeight, 15, 0, Math.PI * 2);
            context.fill();
        }

        function drawRotateHandle() {
            context.fillStyle = 'red';
            context.beginPath();
            context.arc(x + imgWidth, y, 15, 0, Math.PI * 2);
            context.fill();
        }
    };
    img.src = 'cat.png'; // Set the path to your image file
});
