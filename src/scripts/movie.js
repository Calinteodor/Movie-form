const url = 'http://localhost:3000/movies';
const movieList = document.getElementById('movie-list');
const movieDetails = document.getElementById('movie-container');
const allMovies = document.getElementById('movies-container');
const movieForm = document.getElementById('movie-form');
const movieAdd = document.getElementById('add-button');

export default class Movie {
    constructor(title, image, releaseDate, description, rate) {
        this.title = title;
        this.image = image;
        this.releaseDate = releaseDate;
        this.description = description;
        this.rate = rate;
    }
    showMovie(id) {
        fetch(url + `/` + id, {
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                movieForm.style.display = 'none';
                const {title, image, releaseDate, description, rate} = data;
                const result =
                    `   <h3>Movie title is ${title}</h3>
                        <img alt="/" src="${image}" class="image"/>
                        <h3>Was released on ${releaseDate}</h3>
                        <h3>${description}</h3>
                        <h3>${rate}</h3>
                        <button id="back-button">Back</button>
                    `;
                document.getElementById('result').innerHTML = result;
                let backButton = document.getElementById('back-button');

                backButton.addEventListener('click', function () {
                    movieDetails.style.display = 'none';
                    allMovies.style.display = 'inherit';
                });
            });
    }
}

