'use strict';
import '../styles/index.scss';
import * as value from './values';
import Movie from './movie';
const movie = new Movie();

value.movieForm.style.display = 'none';

function renderMovies() {
    fetch(value.url)
        .then((response) => {
            return response.json();
        })
        .then((movies) => {
            movies.sort().reverse();
            movies.map((item) => {

                let view = document.createElement('button');
                view.id = 'view-button-' + item.id;
                view.className = 'view-button-style';
                view.innerText = 'VIEW';
                view.addEventListener('click', () => {
                    movie.renderMovie(item.id);
                    value.allMovies.style.display = 'none';
                    value.movieDetails.style.display = 'inherit';
                });
                let remove = document.createElement('button');
                remove.innerText = 'DELETE';
                remove.id = 'delete-button-' + item.id;
                remove.className = 'delete-button-style';
                remove.addEventListener('click', () => {
                    let verification = confirm('Are you sure you want to delete the following movie ?');
                    if (verification) {
                        movie.deleteMovie(item.id);
                        location.reload(true);
                    }
                });
                let details = document.createElement('div');
                details.className = 'movie-details';
                details.append(view);
                details.append(remove);

                let title = document.createElement('h3');
                let rating = document.createElement('span');
                title.innerText = item.title;
                rating.className = 'rating';
                for (let i=1; i<=5; i++) {
                    let star = document.createElement('i');
                    let postDataFn = movie.updateData;
                    star.addEventListener("click", function(){
                        let rate = this.getAttributeNode('data-star').value;
                        item.rate += Number(rate);
                        item.nrVotes += 1;
                        postDataFn(item);
                    });
                    star.setAttribute('data-star', i);
                    star.className = 'fas fa-star';
                    star.id = item.id;
                    rating.append(star);
                }
                let listItem = document.createElement('li');
                listItem.id = 'movie-item';
                listItem.append(title);
                listItem.append(rating);
                listItem.append(details);
                value.movieList.append(listItem);
                //
            });
        })
        .catch((err)=> {
            console.log(err);
        });
}
renderMovies();

function renderForm() {
    value.movieForm.style.display = 'inline-grid';
    value.movieAdd.style.display = 'none';
    value.allMovies.style.display = 'none';
    value.movieDetails.style.display = 'none';
    value.submitBtn.addEventListener('click', () => {
        let t = document.getElementById('title'),
            p = document.getElementById('poster'),
            r = document.getElementById('releaseDate'),
            d = document.getElementById('description');
        const titleInput = document.getElementById('title').value,
              posterInput = document.getElementById('poster').value,
              releaseInput = document.getElementById('releaseDate').value,
              descriptInput = document.getElementById('description').value;
        if(!t.checkValidity() || !p.checkValidity() || !r.checkValidity() || !d.checkValidity()){
            return false;
        } else {
            const film = new Movie(titleInput, posterInput, releaseInput, descriptInput, 0, 0);
            film.registerMovie();
        }
    });
}

value.movieAdd.addEventListener('click', renderForm);




