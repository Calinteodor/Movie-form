'use strict';
import '../styles/index.scss';
import * as constant from './constants';
import Movie from "./movie";

const renderForm = () => {
    constant.addMovieForm.style.display = 'inline-grid';
    constant.addMovieButton.style.display = 'none';
    constant.container.style.display = 'none';
    constant.movieDetails.style.display = 'none';
    constant.submitMovieButton.addEventListener('click', () => {
        let titleInput = document.getElementById('title'),
            posterInput = document.getElementById('poster'),
            releaseInput = document.getElementById('releaseDate'),
            descriptionInput = document.getElementById('description');
        let titleValue = document.getElementById('title').value,
            posterValue = document.getElementById('poster').value,
            releaseValue = document.getElementById('releaseDate').value,
            descriptionValue = document.getElementById('description').value;
        if(!titleInput.checkValidity() || !posterInput.checkValidity() || !releaseInput.checkValidity() || !descriptionInput.checkValidity()){
            return false;
        } else {
            const movieInstance = new Movie(titleValue, posterValue, releaseValue, descriptionValue, 0, 0);
            movieInstance.register();
        }
    });
};
constant.addMovieButton.addEventListener('click', renderForm);
