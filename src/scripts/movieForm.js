'use strict';
import '../styles/index.scss';
import * as value from './values';
import Movie from "./movie";

const renderForm = () => {
    value.movieForm.style.display = 'inline-grid';
    value.movieAdd.style.display = 'none';
    value.allMovies.style.display = 'none';
    value.movieDetails.style.display = 'none';
    value.submitBtn.addEventListener('click', () => {
        let t = document.getElementById('title'),
            p = document.getElementById('poster'),
            r = document.getElementById('releaseDate'),
            d = document.getElementById('description');
        let titleInput = document.getElementById('title').value,
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
};
value.movieAdd.addEventListener('click', renderForm);
