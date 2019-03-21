'use strict';
import '../styles/index.scss';
import './movieForm';
import * as constant from './constants';
import Movie from './movie';
const movie = new Movie();

constant.addMovieForm.style.display = 'none';

const list = () => {
    fetch(constant.url)
        .then((response) => {
            return response.json();
        })
        .then((movies) => {
            movies.sort().reverse();
            movies.map((item, index) => {
                const itemList = `
                        <li class="movie-item">
                                    <h3>${item.title}</h3>
                                    <span id="rating">
                                        <i class="fas fa-star" data-star=1></i>
                                        <i class="fas fa-star" data-star=2></i>
                                        <i class="fas fa-star" data-star=3></i>
                                        <i class="fas fa-star" data-star=4></i>
                                        <i class="fas fa-star" data-star=5></i>
                                    </span>
                                    <div class="movie-details">
                                        <button class="view-button-class" id="view-button">VIEW</button>
                                        <button class="delete-button-class" id="delete-button">DELETE</button>
                                    </div>
                        </li>
                `;
                constant.movieList.innerHTML += itemList;
                const movieItem = document.querySelector(`#movie-list .movie-item:nth-child(${index + 1})`);
                let view = movieItem.querySelector(`.view-button-class`);
                view.addEventListener('click', () => {
                    movie.details(item.id);
                    constant.container.style.display = 'none';
                    constant.movieDetails.style.display = 'inherit';
                });
                let removeItem = document.querySelector(`#movie-list .movie-item:nth-child(${index + 1})`);
                let remove = removeItem.querySelector(`.delete-button-class`);
                remove.addEventListener('click', () => {
                    let verification = confirm('Are you sure you want to delete the following movie ?');
                    if (verification) {
                        movie.delete(item.id);
                        window.location.reload(true);
                    }
                });
                for (let i=1; i<=5; i++) {
                    let star = movieItem.querySelector(`i:nth-child(${i})`);
                    star.addEventListener("click", function(){
                        let rate = this.getAttributeNode('data-star').value;
                        console.log(rate);
                        item.rate += Number(rate);
                        item.nrVotes += 1;
                        movie.updateRating(item);
                    });
                }
            });
        })
        .catch((err)=> {
            console.log(err);
        });
};

list();




