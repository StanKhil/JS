window.selectedColor = "black";
window.startX = 0;
window.startY = 0;
window.endY = 0;
window.endX = 0;

document.addEventListener('DOMContentLoaded', () => {
    const fig1 = document.getElementById('fig-1');
    if(!fig1) throw "#fig-1 not found";
    window.dc = fig1.getContext('2d');

    const red = document.getElementById('red');
    if(red) red.onclick = changeColor;
    const blue = document.getElementById('blue');
    if(blue) blue.onclick = changeColor;
    const green = document.getElementById('green');
    if(green) green.onclick = changeColor;
    const yellow = document.getElementById('yellow');
    if(yellow) yellow.onclick = changeColor;
    const black = document.getElementById('black');
    if(black) black.onclick = changeColor;
    const gray = document.getElementById('gray');
    if(gray) gray.onclick = changeColor;
    const pink = document.getElementById('pink');
    if(pink) pink.onclick = changeColor;
    const purple = document.getElementById('purple');
    if(purple) purple.onclick = changeColor;

    document.addEventListener("mousedown", startDraw);
    document.addEventListener("mouseup", endDraw);
});

function changeColor(e){
    window.selectedColor = e.target.id;
    console.log(window.selectedColor);
}

function startDraw(e) {
    window.startX = e.offsetX;
    window.startY = e.offsetY;
}

function endDraw(e) {
    window.endX = e.offsetX;
    window.endY = e.offsetY;

    const selectedFigure = document.querySelector('input[name="figure"]:checked').id;
    if (selectedFigure === "square") drawSquare();
    else if (selectedFigure === "circle") drawCircle();
    else if (selectedFigure === "triangle") drawTriangle();
    else if (selectedFigure === "diamond") drawDiamond();
}


function drawSquare() {
    window.dc.beginPath();
    window.dc.fillStyle = window.selectedColor;
    
    const x = Math.min(window.startX, window.endX);
    const y = Math.min(window.startY, window.endY);
    const width = Math.abs(window.endX - window.startX);
    const height = Math.abs(window.endY - window.startY);

    window.dc.rect(x, y, width, height);
    window.dc.fill();

}

function drawCircle() {
    window.dc.beginPath();
    window.dc.fillStyle = window.selectedColor;

    const x1 = window.startX;
    const y1 = window.startY;
    const x2 = window.endX;
    const y2 = window.endY;

    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    const radius = Math.min(Math.abs(x2 - x1), Math.abs(y2 - y1)) / 2;

    window.dc.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    window.dc.fill();
    window.dc.stroke();
}


function drawTriangle(){
    window.dc.beginPath();
    window.dc.fillStyle = window.selectedColor;
    window.dc.strokeWidth = 3;

    const x1 = window.startX;
    const y1 = window.startY;
    const x2 = window.endX;
    const y2 = window.endY;

    window.dc.moveTo(x1,y1);
    window.dc.lineTo(x1,y2);
    window.dc.lineTo(x2,y2);
    window.dc.lineTo(x1,y1);

    window.dc.fill();
    window.dc.stroke();
}

function drawDiamond(){
    window.dc.beginPath();
    window.dc.fillStyle = window.selectedColor;

    const x1 = window.startX;
    const y1 = window.startY;
    const x2 = window.endX;
    const y2 = window.endY;

    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;

    window.dc.moveTo(centerX,y1);
    window.dc.lineTo(x1,centerY);
    window.dc.lineTo(centerX,y2);
    window.dc.lineTo(x2,centerY);
    window.dc.lineTo(centerX,y1);

    window.dc.fill();
    window.dc.stroke();
}