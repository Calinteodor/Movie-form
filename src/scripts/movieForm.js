'use strict';
import Movie from './movie';

const addMovieButton = document.getElementById('button-add');
const submitMovieButton = document.getElementById('submit');
const addMovieForm = document.getElementById('movie-form');
const container = document.getElementById('container');
const movieDetails = document.getElementById('movie-details');
const cancelFormButton = document.getElementById('cancel');

const submit = () => {
    let titleInput = document.getElementById('title'),
        posterInput = document.getElementById('poster'),
        releaseInput = document.getElementById('releaseDate'),
        descriptionInput = document.getElementById('description');
    let titleValue = document.getElementById('title').value,
        posterValue = document.getElementById('poster').value,
        releaseValue = document.getElementById('releaseDate').value,
        descriptionValue = document.getElementById('description').value;
    if (!titleInput.checkValidity() || !posterInput.checkValidity() || !releaseInput.checkValidity() || !descriptionInput.checkValidity()){
        return false;
    } else {
        const movieInstance = new Movie(titleValue, posterValue, releaseValue, descriptionValue, 0, 0);
        movieInstance.add();
    }
};

const renderForm = () => {
    addMovieForm.style.display = 'inline-grid';
    addMovieButton.style.display = 'none';
    container.style.display = 'none';
    movieDetails.style.display = 'none';
    submitMovieButton.addEventListener('click',submit);

    cancelFormButton.addEventListener('click', () => {
        addMovieForm.style.display = 'none';
        addMovieButton.style.display = 'inline-block';
        container.style.display = 'inherit';
        movieDetails.style.display = 'none';
    });
};
addMovieButton.addEventListener('click', renderForm);
