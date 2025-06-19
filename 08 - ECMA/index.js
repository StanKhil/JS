document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('buttons-container');
    if(!container) throw 'buttons-container not found';

    const inputN = document.getElementById('n-value');
    if(!inputN) throw 'n-value not found';
    

    const btnCreate = document.getElementById('create-n'); 
    if(!btnCreate) throw 'create-n not found';
    btnCreate.onclick = () => {
        window.N = parseInt(inputN.value) || 10;

        for(let i = 1; i <= window.N; i++){
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.onclick = () => { alert(i); };
        container.appendChild(btn);
    }
    };
    // for(i = 1; i < 10; i++){
    //     const btn = document.createElement('button');
    //     btn.innerText = i;
    //     btn.onclick = function(){ alert(i); };
    //     container.appendChild(btn);
    // }

    // for(i = 1; i <= 10; i++){
    //     const btn = document.createElement('button');
    //     btn.innerText = i;
    //     btn.onclick = 
    //     (function(x) { 
    //         return function(){ alert(x); }
    //     })(i);
    //     container.appendChild(btn);
    // }

    // for(i = 1; i <= 10; i++){
    //     const btn = document.createElement('button');
    //     btn.innerText = i;
    //     btn.onclick = function self(x){
    //         alert(x);
    //     };
    //     btn.onclick.x = i;
    //     container.appendChild(btn);
    // }

    window.field = document.getElementById("field-block");
    if(!window.field) throw "#field-block not found";
    window.ball = document.getElementById("ball-block");
    if(!window.ball) throw "#ball-block not found";
    window.brick = document.getElementById("brick-block");
    if(!window.brick) throw "#brick-block not found";
    window.ball.vx = - 1;
    window.ball.vy = - 1;

    moveBall();
});


function moveBall(){
    let posX = Number(window.ball.offsetLeft) + Number(window.ball.vx);
    let posY = Number(window.ball.offsetTop) + Number(window.ball.vy);
    if(posY <= 0){
        posY = 0;
        window.ball.vy *= -1;
    }

    if(posX <= 0){
        posX = 0;
        window.ball.vx *= -1;
    }

    if(posY >= window.field.clientHeight - window.ball.clientHeight){
        posY = window.field.clientHeight - window.ball.clientHeight;
        window.ball.vy *= -1;
    }

    if(posX == window.field.clientWidth - window.ball.clientWidth){
        posX = window.field.clientWidth - window.ball.clientWidth;  
        window.ball.vx *= -1;
    }

    const ballCenterX = posX + window.ball.offsetWidth / 2;
    const ballCenterY = posY + window.ball.offsetHeight / 2;
    const brickCenterX = window.brick.offsetLeft + window.brick.offsetWidth / 2;
    const brickCenterY = window.brick.offsetTop + window.brick.offsetHeight / 2;

    const dx = ballCenterX - brickCenterX;
    const dy = ballCenterY - brickCenterY;

    const halfW = (window.brick.offsetWidth + window.ball.offsetWidth) / 2;
    const halfH = (window.brick.offsetHeight + window.ball.offsetHeight) / 2;

    if (
        Math.abs(dx) <= halfW &&
        Math.abs(dy) <= halfH
    ) {
        const wy = halfW * dy;
        const hx = halfH * dx;

        if (wy > hx) {
            if (wy > -hx) {
                posY = window.brick.offsetTop + window.brick.offsetHeight;
                window.ball.vy *= -1;
            } else {
                posX = window.brick.offsetLeft - window.ball.offsetWidth;
                window.ball.vx *= -1;
            }
        } else {
            if (wy > -hx) {
                posX = window.brick.offsetLeft + window.brick.offsetWidth;
                window.ball.vx *= -1;
            } else {
                posY = window.brick.offsetTop - window.ball.offsetHeight;
                window.ball.vy *= -1;
            }
        }
    }


    window.ball.style.left = posX + 'px';
    window.ball.style.top = posY + 'px';
    setTimeout(moveBall, 8);
}
