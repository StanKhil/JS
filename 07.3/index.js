window.apiKey = "b93a76c2";
window.page = 1;

document.addEventListener('DOMContentLoaded', () => {
    const btnSearch = document.getElementById("search-movie");
    if(!btnSearch) throw "search-movie not found";
    btnSearch.addEventListener("click", btnSearchClick);

    const btnPrev = document.getElementById("prev-page");
    if(!btnPrev) throw "prev-page not found";
    btnPrev.addEventListener("click", btnPrevClick);

    const btnNext = document.getElementById("next-page");
    if(!btnNext) throw "next-page not found";
    btnNext.addEventListener("click", btnNextClick);

});

function getMovies(){
    const title = document.getElementById("title");
    const type = document.getElementById("type");
    
    const requestString = `https://www.omdbapi.com/?apikey=${window.apiKey}&s=${title.value}&type=${type.value}&page=${window.page}`;
    console.log(requestString);
    fetch(requestString)
    .then(r => r.json())
    .then(showPage);
}

function getMovie(title){
    const type = document.getElementById("type");
    
    const requestString = `https://www.omdbapi.com/?apikey=${window.apiKey}&t=${title}&type=${type.value}`;
    console.log(requestString);
    fetch(requestString)
    .then(r => r.json())
    .then(showDetails);
}


function btnSearchClick(){
    getMovies();
}

function btnPrevClick(){
    window.page--;
    window.page = Math.max(window.page % 101,1);
    console.log(window.page);
    getMovies();
}

function btnNextClick(){
    window.page++;
    window.page = Math.max(window.page % 101,1);
    getMovies();
}


function showPage(j) {
    const listMovie = document.getElementById("list-movie");
    listMovie.innerHTML = "";

    for (let movie of j.Search) {
        const film = document.createElement("div");
        film.classList.add("card", "d-flex", "flex-column");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = movie.Poster;
        img.alt = movie.Title;
        film.appendChild(img);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "d-flex", "flex-column");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = movie.Title;
        cardBody.appendChild(title);

        const year = document.createElement("p");
        year.classList.add("card-text");
        year.textContent = `Year: ${movie.Year}`;
        cardBody.appendChild(year);

        const btn = document.createElement("button");
        btn.classList.add("btn", "btn-primary", "mt-auto");
        btn.textContent = "Details";
        btn.addEventListener("click", btnDetailsClick);
        cardBody.appendChild(btn);

        film.appendChild(cardBody);
        listMovie.appendChild(film);
    }
}

function btnDetailsClick(e){
    const card = e.target.closest(".card"); 
    if (!card) return;

    const title = card.querySelector(".card-title")?.textContent;
    getMovie(title);
}

function showDetails(j) {
    const detailsContainer = document.getElementById("movie-details");
    if (!detailsContainer) throw "movie-details not found";
    detailsContainer.innerHTML = "";

    const card = document.createElement("div");
    card.classList.add("card", "mb-4", "p-3", "bg-light");

    const heading = document.createElement("h4");
    heading.classList.add("mb-3", "text-center");
    heading.textContent = "Film info:";
    card.appendChild(heading);

    const row = document.createElement("div");
    row.classList.add("row", "g-3");

    const imgCol = document.createElement("div");
    imgCol.classList.add("col-md-4", "text-center");

    const poster = document.createElement("img");
    poster.src = j.Poster;
    poster.alt = j.Title;
    imgCol.appendChild(poster);

    const textCol = document.createElement("div");
    textCol.classList.add("col-md-8");

    const fields = [
        ["Title", j.Title],
        ["Released", j.Released],
        ["Genre", j.Genre],
        ["Country", j.Country],
        ["Director", j.Director],
        ["Writer", j.Writer],
        ["Actors", j.Actors],
        ["Awards", j.Awards],
        ["Plot", j.Plot]
    ];

    for (let [label, value] of fields) {
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = `${label}: `;
        p.appendChild(strong);
        p.appendChild(document.createTextNode(value));
        textCol.appendChild(p);
    }

    row.appendChild(imgCol);
    row.appendChild(textCol);
    card.appendChild(row);
    detailsContainer.appendChild(card);
}

