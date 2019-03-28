'use strict';
import '../styles/index.scss';
import './movieForm';
import * as config from './config';
import Movie from './movie';

const movie = new Movie();

const movieList = document.getElementById('movie-list');
const addMovieForm = document.getElementById('movie-form');
const container = document.getElementById('container');
const movieDetails = document.getElementById('movie-details');


const list = () => {
    addMovieForm.style.display = 'none';
    fetch(config.url)
        .then((response) => {
            return response.json();
        })
        .then((movies) => {
            movies.sort().reverse();
            movies.map((item) => {
                let view = createViewButton(item);
                let remove = createDeleteButton(item);

                let actions = document.createElement('div');
                actions.className = 'movie-actions';
                actions.append(view);
                actions.append(remove);

                let title = document.createElement('h3');
                title.innerText = item.title;

                let rating = createVotingElement(item);

                let listItem = document.createElement('li');
                listItem.id = 'movie-item';
                listItem.append(title);
                listItem.append(rating);
                listItem.append(actions);
                movieList.append(listItem);
            });
        })
        .catch((err)=> {
            console.log(err);
        });
};

function removeMovieInfo(id) {
    let verification = confirm('Are you sure you want to delete the following movie ?');
    if (verification) {
        movie.delete(id);
        window.location.reload(true);
    }
}

function viewMovieInfo(item) {
    const calc = item.rate/item.nrVotes || 0;
    const result =
        `   <h3>Movie title is ${item.title}</h3>
                    <img alt="/" src="${item.image}" class="image"/>
                    <h3>Was released on ${item.releaseDate}</h3>
                    <h3>${item.description}</h3>
                    <h3>${(calc).toFixed(2)}</h3>
                    <button id="back-button">Back</button>
            `;
    movieDetails.innerHTML = result;
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', () => {
        movieDetails.style.display = 'none';
        container.style.display = 'inherit';
    });
    movie.get(item.id);
    container.style.display = 'none';
    movieDetails.style.display = 'inherit';
}

function createViewButton(item) {
    let view = document.createElement('button');
    view.id = 'view-button-' + item.id;
    view.className = 'view-button';
    view.innerText = 'VIEW';
    view.addEventListener('click', function(){
        viewMovieInfo(item);
    });

    return view;
}

function createDeleteButton(item) {
    let remove = document.createElement('button');
    remove.innerText = 'DELETE';
    remove.id = 'delete-button-' + item.id;
    remove.className = 'delete-button';
    remove.addEventListener('click', function () {
        removeMovieInfo(item.id);
    });

    return remove;
}

function createVotingElement(item) {
    let rating =  document.createElement('span');
    rating.id = 'rating';
    for (let i=1; i<=5; i++) {
        let star = document.createElement('i');
        star.addEventListener('click', function(){
            let rate = this.getAttributeNode('data-star').value;
            movie.vote(item, rate);
        } );
        star.setAttribute('data-star', i);
        star.className = 'fas fa-star';
        star.id = item.id;
        rating.append(star);
    }

    return rating;
}

list();





