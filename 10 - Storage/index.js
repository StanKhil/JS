const authContent = `<button id="exit" class="btn btn-danger">Exit</button>`;
const anonCotent = `<button id="auth" class="btn btn-primary">Auth</button>`;

document.addEventListener('DOMContentLoaded', ()=>{
    updateAuthBlock();
});

function authentificate(){
    const token = "eyJhbGciOiJub25lIn0.eyJuYW0iOiJTdGFzIiwiaWF0IjoxNzUwNzg2ODMyLCJleHAiOjE3NTA3ODgyMTB9.";
    return new Promise(
        (resolve, reject) => setTimeout(resolve(token), 600)
        
    );
}

function updateListeners(){
    const authBtn = document.getElementById("auth");
    if(authBtn) authBtn.onclick = authBtnClick;
    const exitBtn = document.getElementById("exit");
    if(exitBtn) exitBtn.onclick = exitBtnClick;
}

function authBtnClick(){
    authentificate()
    .then(token => {
        window.localStorage.setItem('token', token);
        updateAuthBlock();
        updateTimer();
    });
}

function updateTimer(){
    const timer = document.getElementById("timer");
    if (!timer) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = JSON.parse(decodeURIComponent(escape(window.atob(token.split('.')[1]))));
    console.log(payload);
    

    function update() {
        const now = Math.floor(Date.now() / 1000);
        const remaining = payload.exp - now;

        if (remaining <= 0) {
            timer.innerHTML = "Термін дії завершено";
            exitBtnClick();
            return;
        }

        const min = Math.floor(remaining / 60);
        const sec = remaining % 60;
        timer.innerHTML = `JWT ще діє: ${min} хв ${sec.toString().padStart(2, '0')} сек`;

        setTimeout(update, 1000);
    }

    update();
}


function exitBtnClick(){
    window.localStorage.removeItem('token');
    updateAuthBlock();
}

function updateAuthBlock(){
    const authBlock = document.getElementById('auth-block');
    const token = window.localStorage.getItem('token');
    //const token = "eyJhbGciOiJub25lIn0.eyJuYW0iOiJTdGFzIiwiaWF0IjoxNzUwNzg2ODMyLCJleHAiOjE3NTA3ODcwMTJ9..eyJuYW0iOiLQn9C10YHRgdC40Y8iLCJpYXQiOjE3MTkyNTc2NDAsImV4cCI6MTcxOTI1NzgyMH0.";
   
    if(window.localStorage['token']) {
        const payload = JSON.parse(decodeURIComponent(escape(window.atob(token.split('.')[1]))));
        authBlock.innerHTML = authContent;
        const name = document.createElement("p");
        name.innerHTML = payload.nam;
        authBlock.appendChild(name);
        const iat = document.createElement("p");
        console.log("Видано: " + new Date(payload.iat * 1000).toLocaleString());
        iat.innerHTML = "Видано: " + new Date(payload.iat * 1000).toLocaleString();

        const exp = document.createElement("p");
        console.log("Діє  до:  " + new Date(payload.exp * 1000).toLocaleString());
        exp.innerHTML = "Діє  до:  " + new Date(payload.exp * 1000).toLocaleString();

        authBlock.appendChild(iat);
        authBlock.appendChild(exp);

    }
    else
        authBlock.innerHTML = anonCotent;
    updateListeners();
}
