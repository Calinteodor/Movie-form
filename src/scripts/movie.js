'use strict';
import * as config from './config';

export default class Movie {
    constructor(title, image, releaseDate, description, rate, nrVotes) {
        this.title = title;
        this.image = image;
        this.releaseDate = releaseDate;
        this.description = description;
        this.rate = rate;
        this.nrVotes = nrVotes;
    }

    add() {
        fetch(config.url, {
            method: 'POST',
            body: JSON.stringify(this),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res.json()))
            .then(response => console.log('SUCCESS', JSON.stringify(response)))
            .catch(error => console.error('ERROR:', error));
    }

    vote(item, rate){
        item.rate += Number(rate);
        item.nrVotes += 1;

        fetch(config.url+ '/' + item.id, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => console.log('SUCCESS', JSON.stringify(response)))
            .catch(error => console.error('ERROR:', error));
    }

    get(id) {
        fetch(config.url + `/` + id, {
            method: 'GET'
        })
            .then(response => response.json())
            .catch((err)=> {
                console.log(err);
            });
    }

    delete(id) {
        fetch(config.url + `/` + id, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .catch((err)=> {
                console.log(err);
            });
    }
}