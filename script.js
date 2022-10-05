const apiURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2aaf606463d9390bf6ceee2e230972ad&page=1';
const imgPath = 'https://image.tmdb.org/t/p/w1280';
const searchURL = 'https://api.themoviedb.org/3/search/movie?api_key=2aaf606463d9390bf6ceee2e230972ad&query="';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


//Get initial movies
getMovies(apiURL)
async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
}

//movie place
function showMovies(movies){
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, overview, vote_average} = movie;

        const movieEl =  document.createElement ('div');

        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${imgPath + poster_path}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieEl);
    })
}

//rate function
function getClassByRate(vote){
    if (vote >=8 ){
        return 'green';
    }else if(vote >= 5){
        return 'orange';
    }else{
        return'red';
    }
}

//Search function

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm && searchTerm !== ''){
        getMovies(searchURL + searchTerm);

        search.value = '';

    }else{
        window.location.reload();
    }
})