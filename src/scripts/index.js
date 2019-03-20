'use strict';
import '../styles/index.scss';
import './movieForm';
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
                    star.addEventListener("click", function(){
                        let rate = this.getAttributeNode('data-star').value;
                        item.rate += Number(rate);
                        item.nrVotes += 1;
                        movie.updateData(item);
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




