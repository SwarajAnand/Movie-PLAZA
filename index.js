const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

function getClassByRate(vote){
    if (vote>=6){
        return "green";
    }
    else{
        return "orange";
    }
} 

function showMovies(movies){
    console.log(movies);
    main.innerHTML = "";

    movies.forEach((movies) => {
        const {title, poster_path, vote_average, overview } = movies;
    
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        
        movieEl.innerHTML =`
        <div>
        <img src= "${IMGPATH + poster_path}" alt= "${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">
            ${vote_average}
            </span>
        </div>
        <div class = "overview">${overview}</div>
        </div>`;

        main.appendChild(movieEl);
    });
}


async function getMovies(url) {
    const res = await fetch(url);
    const respdata = await res.json();
    showMovies(respdata.results);
}

getMovies(APIURL);


form.addEventListener("submit" , (e)=>{
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getMovies(SEARCHAPI+searchTerm);
        search.value = "";
    }
})




