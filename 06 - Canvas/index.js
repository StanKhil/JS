document.addEventListener('DOMContentLoaded', () => {

    const fig1 = document.getElementById('fig-1');
    if(!fig1) throw "#fig-1 not found";
    window.dc1 = fig1.getContext('2d');

    const fig2 = document.getElementById('fig-2');
    if(!fig2) throw "#fig-1 not found";
    window.dc2 = fig2.getContext('2d');
    showStatistics();
    
    const drawLineBtn = document.getElementById('draw-line-btn');
    if(drawLineBtn){
        drawLineBtn.onclick = drawLineBtnClick;
    }

    const drawRectBtn = document.getElementById('draw-rect-btn');
    if(drawRectBtn){
        drawRectBtn.onclick = drawRectBtnClick;
    }

    const fillRectBtn = document.getElementById('fill-rect-btn');
    if(fillRectBtn){
        fillRectBtn.onclick = fillRectBtnClick;
    }

    const fullRectBtn = document.getElementById('full-rect-btn');
    if(fullRectBtn){
        fullRectBtn.onclick = fullRectBtnClick;
    }

    const cleraBtn = document.getElementById('clear-btn');
    if(cleraBtn){
        cleraBtn.onclick = cleraBtnClick;
    }

    const circleBtn = document.getElementById('circle-btn');
    if(circleBtn){
        circleBtn.onclick = circleBtnClick;
    }

    const halfBtn = document.getElementById('half-btn');
    if(halfBtn){
        halfBtn.onclick = halfBtnClick;
    }

    const diskBtn = document.getElementById('disk-btn');
    if(diskBtn){
        diskBtn.onclick = diskBtnClick;
    }
});

function drawLineBtnClick() {
    window.dc1.beginPath();
    window.dc1.strokeStyle = 'black';
    window.dc1.lineWidth = 2;
    window.dc1.moveTo(0,0);
    window.dc1.lineTo(150, 150);
    window.dc1.lineTo(300, 0);
    window.dc1.stroke();
}

function drawRectBtnClick() {
    window.dc1.beginPath();
    window.dc1.strokeStyle = "green";
    window.dc1.strokeWidth = 3;
    window.dc1.strokeRect(50, 10, 200, 30);
    window.dc1.stroke();
}

function fillRectBtnClick() {
    window.dc1.beginPath();
    window.dc1.fillStyle = "gold";
    window.dc1.rect(100, 50, 100, 30);
    window.dc1.fill();
}

function fullRectBtnClick() {
    window.dc1.beginPath();
    window.dc1.fillStyle = "lime";
    window.dc1.strokeStyle = "purple";
    window.dc1.rect(200, 110, 80, 30);
    window.dc1.fill();
    window.dc1.stroke();
}

function cleraBtnClick() {
    window.dc1.beginPath();
    window.dc1.clearRect(0, 0, window.dc1.canvas.width, window.dc1.canvas.height);
}

function circleBtnClick() {
    window.dc1.beginPath();
    window.dc1.strokeStyle = "#ee2233";
    window.dc1.strokeWidth = 5;
    window.dc1.arc(30,80,20,0, Math.PI * 2, false);
    window.dc1.stroke();
}

function halfBtnClick() {
    window.dc1.beginPath();
    window.dc1.strokeStyle = "#2233ee";
    window.dc1.strokeWidth = 5;
    window.dc1.arc(30,140,20,0, Math.PI , true);
    window.dc1.lineTo(50,140);
    window.dc1.stroke();
}

function diskBtnClick() {
    window.dc1.beginPath();
    window.dc1.fillStyle = "cyan";
    window.dc1.arc(100, 100, 50, 0, Math.PI * 2, false);
    window.dc1.fill();
    window.dc1.stroke();
}

function getStatistics(){
    return [
        {"day" : 1, "sold" :100},
        {"day" : 2, "sold" :130},
        {"day" : 3, "sold" :80},
        {"day" : 4, "sold" :90},
        {"day" : 5, "sold" :500},
    ];
}

function showStatistics() {
    window.dc2.beginPath();
    window.dc2.clearRect(0,0,300,150);
    window.dc2.fillStyle = "tomato";

    const stat = getStatistics();
    const figWidth = 300;
    const maxHeight = 130;
    let n = stat.length;
    let w = figWidth / n * 0.68;
    let W = figWidth / n;
    let maxSold = 0;
    for(let sold of stat){
        if(sold.sold > maxSold) maxSold = sold.sold;
    }
    
    let k = maxHeight / maxSold;

    for(let i = 0; i < stat.length; i++){
        let sold = stat[i].sold;
        window.dc2.rect(W * 0.16 + i * W, 140 - sold * k, w, sold * k);
        window.dc2.fillText(sold, W * 0.32 + i * W, 140 - sold * k - 2)
        window.dc2.fillText("day " + (i + 1), W * 0.32 + i * W, 148);
    }

    window.dc2.fill();
}