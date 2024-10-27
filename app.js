// Task 2: Configure the JavaScript for Drawing Context

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear');
const colorInput = document.getElementById('color');
const shapeOptions = document.getElementsByName('shape');

let drawing = false;
let startX, startY;

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    [startX, startY] = getMousePosition(e);
    }
);

canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;

    let [mouseX, mouseY] = getMousePosition(e);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShape(mouseX, mouseY); 
    }
); 

canvas.addEventListener('mouseup', (e) => {
    if (drawing) {
        let [mouseX, mouseY] = getMousePosition(e);
        drawShape(mouseX, mouseY); 
        drawing = false;
        }
    }
);

canvas.addEventListener('mouseout', () => {
    drawing = false;
    ctx.closePath();
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