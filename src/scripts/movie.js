'use strict';
import '../styles/index.scss';
import * as constant from './constants';


export default class Movie {
    constructor(title, image, releaseDate, description, rate, nrVotes) {
        this.title = title;
        this.image = image;
        this.releaseDate = releaseDate;
        this.description = description;
        this.rate = rate;
        this.nrVotes = nrVotes;
    }

    // showList(){
    //
    // }

    register() {
        fetch(constant.url, {
            method: 'POST',
            body: JSON.stringify(this),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res.json()))
            .then(response => console.log('SUCCESS', JSON.stringify(response)))
            .catch(error => console.error('ERROR:', error));
    }

    updateRating(item){
        fetch(constant.url+ '/' + item.id, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => console.log('SUCCESS', response))
            .catch(error => console.error('ERROR:', error));
    }

    details(id) {
        fetch(constant.url + `/` + id, {
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                constant.addMovieForm.style.display = 'none';
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
                    constant.movieDetails.style.display = 'none';
                    constant.container.style.display = 'inherit';
                });
            });
    }

    delete(id) {
        fetch(constant.url + `/` + id, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .catch((err)=> {
                console.log(err);
            });
    }
}