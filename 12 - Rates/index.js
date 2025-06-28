window.mainBlock = document.getElementById('main-block');
window.allRatesUrl = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date";
window.notFoundError = "page not found :(";
window.timeDiff = 604800000;
window.today = new Date();

window.addEventListener('hashchange', () =>{
    selectPage();
});

document.addEventListener('DOMContentLoaded', () => {
    selectPage();
});

function selectPage(){
    const route = window.location.hash.split('/');
    switch(route[0]){
        case '':
        case '#home' : homePage();break;
        case '#rate' : ratePage(route[1]); break;
        default: notFoundPage();
   }
} 

function homePage(){
    
    const d1 = `${window.today.getFullYear()}${getFullD(window.today.getMonth() + 1)}${getFullD(window.today.getDate())}`;
    const url = window.allRatesUrl +`${d1}&json`;
    showTable(url);
}

function notFoundPage(){
    window.mainBlock.innerHTML = window.notFoundError;
}

function rateClick(e){
    const cc = e.target.closest("tr").getAttribute("data-cc")
    console.log(cc);
    window.location.hash = "#rate/" + cc;
}

function getFullD(m){
    return m < 10 ? `0${m}`: m;
}

function ratePage(cc){
    if(typeof cc == 'undefined') cc = "USD";
    window.mainBlock.innerHTML = cc;
    
    const date1 = new Date();
    const date2 = new Date(date1.getTime() - window.timeDiff);

    const d1 = `${date1.getFullYear()}${getFullD(date1.getMonth() + 1)}${getFullD(date1.getDate())}`;
    const d2 = `${date2.getFullYear()}${getFullD(date2.getMonth() + 1)}${getFullD(date2.getDate())}`;

    let url = `https://bank.gov.ua/NBU_Exchange/exchange_site?start=${d2}&end=${d1}&valcode=${cc.toLowerCase()}&sort=exchangedate&order=desc&json`;
    url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20200302&json';
    fetch(url)
    .then(r => r.json())
    .then(j => {
        let html = JSON.stringify(j);
        window.mainBlock.innerHTML = html;
    });

}

function rateDateChange(e) {
    const [year, month, day] = e.target.value.split('-');
    const formattedDate = `${day}.${month}.${year}`;
    window.mainBlock.querySelector("#curr-date").innerHTML = formattedDate;

    const url = `${window.allRatesUrl}=${year}${month}${day}&json`;
    showTable(url,  e.target.value);
}

function showTable(url, selectedDateStr = null) {

    const date = selectedDateStr 
        ? new Date(selectedDateStr) 
        : window.today;

    const inputDateValue = date.toISOString().split('T')[0];
    const dateStr = `${getFullD(date.getDate())}.${getFullD(date.getMonth() + 1)}.${date.getFullYear()}`;

    fetch(url)
        .then(r => r.json())
        .then(j => {
            let table = `
                <input type='date' id='rate-date' value='${inputDateValue}'/>
                <h3 id='curr-date'>${dateStr}</h3>
                <table class='table table-striped table-dark'>
                    <thead><tr><th>Code</th><th>Name</th><th>Rate (UAH)</th></tr></thead>
                    <tbody>
            `;

            for (let r of j) {
                table += `<tr data-cc="${r.cc}"><td>${r.cc}</td><td>${r.txt}</td><td>${r.rate}</td></tr>`;
            }

            table += "</tbody></table>";
            window.mainBlock.innerHTML = table;

            for (let e of window.mainBlock.querySelectorAll("[data-cc")) {
                e.onclick = rateClick;
            }

            window.mainBlock.querySelector("#rate-date").onchange = rateDateChange;
        });
}
