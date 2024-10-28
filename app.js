// Task 2: Configure the JavaScript for Drawing Context

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear');
const colorInput = document.getElementById('color');
const shapeOptions = document.getElementsByName('shape');

let drawing = false;
let startX, startY;

canvas.addEventListener('mousedown', (z) => {
    drawing = true;
    [startX, startY] = getMousePosition(z);
    }
);

canvas.addEventListener('mousemove', (z) => {
    if (!drawing) return;

    let [mouseX, mouseY] = getMousePosition(z);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShape(mouseX, mouseY); 
    }
); 

canvas.addEventListener('mouseup', (z) => {
    if (drawing) {
        let [mouseX, mouseY] = getMousePosition(z);
        drawShape(mouseX, mouseY); 
        drawing = false;
        }
    }
);

canvas.addEventListener('mouseout', (z) => {
    drawing = false;
    ctx.closePath(z);
    }
);

// Task 3: Draw shape based on selected option

function drawShape(mouseX, mouseY) {
    let shape = getSelectedShape();
    let color = colorInput.value;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.beginPath();
    if (shape === 'line') {
        ctx.moveTo(startX, startY);
        ctx.lineTo(mouseX, mouseY);

    } else if (shape === 'rectangle') {
        ctx.rect(startX, startY, mouseX - startX, mouseY - startY);

    } else if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(mouseX - startX, 2) + Math.pow(mouseY - startY, 2));
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    }
    ctx.stroke();
    ctx.closePath(); 
};

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function getSelectedShape() {
    for (const option of shapeOptions) {
        if (option.checked) {
            return option.value;
        }
    }
};

// Task 4: Clear the canvas

clearButton.addEventListener('click', clearCanvas);
function getMousePosition(z) {
    const rect = canvas.getBoundingClientRect();
    return [z.clientX - rect.left, z.clientY - rect.top];
};