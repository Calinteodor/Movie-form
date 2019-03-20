'use strict';
import '../styles/index.scss';
import * as value from './values';


export default class Movie {
    constructor(title, image, releaseDate, description, rate, nrVotes) {
        this.title = title;
        this.image = image;
        this.releaseDate = releaseDate;
        this.description = description;
        this.rate = rate;
        this.nrVotes = nrVotes;
    }

    register() {
    }

    delete() {
    }

    rate() {
    }

    add() {
    }

    registerMovie() {
        fetch(value.url, {
            method: 'POST',
            body: JSON.stringify(this),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res.json()))
            .then(response => console.log('SUCCESS', JSON.stringify(response)))
            .catch(error => console.error('ERROR:', error));
    }

    updateData(item){
        fetch(value.url+ '/' + item.id, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => console.log('SUCCESS', response))
            .catch(error => console.error('ERROR:', error));
    }

    renderMovie(id) {
        fetch(value.url + `/` + id, {
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                value.movieForm.style.display = 'none';
                const {title, image, releaseDate, description, rate, nrVotes} = data;
                const calc = rate/nrVotes || 0;
                const result =
                    `   <h3>Movie title is ${title}</h3>
                        <img alt="/" src="${image}" class="image"/>
                        <h3>Was released on ${releaseDate}</h3>
                        <h3>${description}</h3>
                        <h3>${(calc).toFixed(2)}</h3>
                        <button id="back-button">Back</button>
                    `;
                document.getElementById('result').innerHTML = result;
                let backButton = document.getElementById('back-button');

                backButton.addEventListener('click', function () {
                    value.movieDetails.style.display = 'none';
                    value.allMovies.style.display = 'inherit';
                });
            });
    }

    deleteMovie(id) {
        fetch(value.url + `/` + id, {
            method: 'DELETE'
        })
            .then(response => response.json());
    }
}