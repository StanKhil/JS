document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById("pause-btn");
    if(!btn) throw "pause-btn not found";
    btn.addEventListener('click', pauseBtnClick);

    const btn2 = document.getElementById("sequence-btn");
    if(!btn2) throw "sequence-btn not found";
    btn2.addEventListener('click', sequenceBtnClick);

    const btnRates = document.getElementById("load-rates");
    if(!btnRates) throw "load-rates not found";
    btnRates.addEventListener('click', ratesBtnClick);

    const searchRate = document.getElementById("search-rate");
    if(!searchRate) throw "search-rate not found";
    searchRate.addEventListener('input', searchKeyPress);

    const loadMoon = document.getElementById("load-moon-phase");
    if(!loadMoon) throw "load-moon-phase not found";
    loadMoon.addEventListener('click', moonClick);
});


function pause(ms){
    return new Promise(
        (resolve,reject) =>{
            setTimeout(
                () => resolve(ms),
                ms
            );
        }
    );
}

async function pauseBtnClick(){
    console.log(await pause(1500));
}

async function sequenceBtnClick() {
    pause(1000)
    .then(() => {console.log(1); return pause(1000);})
    .then(() => {console.log(2); return pause(1000);})
    .then(() => {console.log(3);});
    
}

function ratesBtnClick(){
    const rates = document.getElementById("rates");
    fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
    .then(r =>{
        if(r.ok){
            return r.json();
        }
        else{
            rates.innerHTML = `<div class="alert alert-danger" role="alert">Error fetch ${r.status}</div>`;
        }
    })
    .then(j =>{
        window.nburates = j;
        showRates(j)
    });
}

function showRates(j){
    const table = document.createElement("table");
    table.classList.add("table", "table-dark", "table-striped-columns", "table-hover");
    const tbody = document.createElement("tbody");
    const thead = document.createElement("thead");
    var line = document.createElement('tr');
    var cell = document.createElement('th'); cell.innerText = "Code"; line.appendChild(cell);
    cell = document.createElement("th"); cell.innerText = "Short"; line.appendChild(cell);
    cell = document.createElement("th"); cell.innerText = "Full"; line.appendChild(cell);
    cell = document.createElement("th"); cell.innerText = "Rate"; line.appendChild(cell);
    thead.appendChild(line);
    thead.classList.add("table-light");
    for(let rate of j){
        line = document.createElement('tr');
        cell = document.createElement("td"); cell.innerText = rate.r030;  line.appendChild(cell);
        cell = document.createElement("td"); cell.innerText = rate.cc;    line.appendChild(cell);
        cell = document.createElement("td"); cell.innerText = rate.txt;   line.appendChild(cell);
        cell = document.createElement("td"); cell.innerText = rate.rate;  line.appendChild(cell);
        tbody.appendChild(line);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    const rates = document.getElementById("rates");
    rates.innerHTML = "";
    rates.appendChild(table);
}

function searchKeyPress(e){
    console.log(window.nburates);
    if(!window.nburates) return;
    let fragment = e.target.value;
    if(fragment.length > 0){
        showRates(window.nburates.filter(r => r.cc.includes(fragment) || r.txt.includes(fragment)));
    }
    else{
        showRates(window.nburates);
    }
}

function moonClick(){
    fetch("https://www.icalendar37.net/lunar/api/?year=2025&month=6&shadeColor=gray&size=150&texturize=true&day=10")
    .then(r => r.json())
    .then(j => {
        const div = document.getElementById("moon-phase");

        const todayMoon = j.phase[new Date().getDate()];
        const yesterdayMoon = j.phase[new Date().getDate() - 1];
        const tomorrowMoon = j.phase[new Date().getDate() + 1];

        const yesterday = document.createElement("div");
        const today = document.createElement("div");
        const tomorrow = document.createElement("div");

        yesterday.innerHTML += yesterdayMoon.svg;
        yesterday.innerHTML += "<br/>Phase name: " + yesterdayMoon.phaseName + "<br/>Lightning (%): " + yesterdayMoon.lighting + "<br/>Dist: " + yesterdayMoon.dis;
       //yesterday.style.display = "flex";

        today.innerHTML += todayMoon.svg;
        today.innerHTML += "<br/>Phase name: " + todayMoon.phaseName + "<br/>Lightning (%): " + todayMoon.lighting + "<br/>Dist: " + todayMoon.dis;
        //today.style.display = "flex";

        tomorrow.innerHTML += tomorrowMoon.svg;
        tomorrow.innerHTML += "<br/>Phase name: " + tomorrowMoon.phaseName + "<br/>Lightning (%): " + tomorrowMoon.lighting + "<br/>Dist: " + tomorrowMoon.dis;
        //tomorrow.style.display = "flex";
    
        div.style.display = "flex";
        div.appendChild(yesterday);
        div.appendChild(today);
        div.appendChild(tomorrow);
    });
}