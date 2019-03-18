const url = 'http://localhost:3000/movies';
const movieList = document.getElementById('movie-list');
const movieDetails = document.getElementById('movie-container');
const allMovies = document.getElementById('movies-container');
const movieForm = document.getElementById('movie-form');
const movieAdd = document.getElementById('add-button');

const movie = new Movie();

class Movie {
    constructor(title, image, releaseDate, description, rate, votes) {
        this.title = title;
        this.image = image;
        this.releaseDate = releaseDate;
        this.description = description;
        this.rate = rate;
        this.nrVotes = votes;
    }

    showMovieList() {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((movies) => {
                movies.sort().reverse();
                movies.map((item) => {
                    //
                    let view = document.createElement('button');
                    view.addEventListener('click', () => {
                        movie.showMovie(item.id);
                        allMovies.style.display = 'none';
                        movieDetails.style.display = 'inherit';
                    });
                    view.id = 'view-button-' + item.id;
                    view.className = 'button-style';
                    view.innerText = 'VIEW';
                    //
                    let remove = document.createElement('button');
                    remove.addEventListener('click', () => {
                        let verification = confirm('Are you sure you want to delete the following movie ?');
                        if (verification) {
                            movie.deleteMovie(item.id);
                            location.reload(true);
                        }
                    });
                    remove.innerText = 'DELETE';
                    remove.id = 'delete-button-' + item.id;
                    remove.className = 'button-style';
                    //
                    let details = document.createElement('div');
                    details.className = 'movie-details';
                    details.append(view);
                    details.append(remove);
                    //
                    let title = document.createElement('h3');
                    title.innerText = item.title;
                    //
                    let rating = document.createElement('span');
                    rating.className = 'rating';
                    for (let i=1; i<=5; i++) {
                        let star = document.createElement('i');
                        // Click event
                        star.addEventListener("click", function(){
                            let rate = this.getAttributeNode('data-star').value;
                            item.rate += Number(rate);
                            item.nrVotes += 1;
                            movie.postData(item);
                        });
                        star.setAttribute('data-star', i);
                        star.className = 'fas fa-star';
                        star.id = item.id;

                        rating.append(star);
                    }
                    //
                    let listItem = document.createElement('li');
                    listItem.id = 'movie-item';
                    //
                    listItem.append(title);
                    listItem.append(rating);
                    listItem.append(details);
                    //
                    movieList.append(listItem);
                    //
                });
            })
            .catch((err)=> {
                console.log(err);
            });
    }

    postData(item){
        fetch(url+ '/' + item.id, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => console.log('SUCCESS', JSON.stringify(response)))
            .catch(error => console.error('ERROR:', error));
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

    addMovie() {
        const titleInput = document.getElementById('title').value;
        const posterInput = document.getElementById('poster').value;
        const releaseInput = document.getElementById('releaseDate').value;
        const descriptInput = document.getElementById('description').value;
        let movie = new FormData();

        movie.title = titleInput;
        movie.image = posterInput;
        movie.releaseDate = releaseInput;
        movie.description = descriptInput;
        movie.rate = 0;
        movie.nrVotes = 0;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(movie),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => console.log('SUCCESS', JSON.stringify(response)))
            .catch(error => console.error('ERROR:', error));
    }

    deleteMovie(id) {
        fetch(url + `/` + id, {
            method: 'DELETE'
        })
            .then(response => response.json());
    }

    showForm() {
        movieForm.style.display = 'inline-grid';
        movieAdd.style.display = 'none';
        allMovies.style.display = 'none';
        movieDetails.style.display = 'none';
        submitBtn.addEventListener('click', () => {
            let t = document.getElementById('title'),
                p = document.getElementById('poster'),
                r = document.getElementById('releaseDate'),
                d = document.getElementById('description');
            if(!t.checkValidity() || !p.checkValidity() || !r.checkValidity() || !d.checkValidity()){
                return false;
            } else {
                movie.addMovie();
            }
        });
    }
}

movie.showMovieList();
movie.showForm();