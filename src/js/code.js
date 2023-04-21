import * as d3 from 'd3';

/**
 * Affichage des 6 cartes avec les données du CSV
 */
function copyTemplate() {
    const node = document.querySelector('#template').cloneNode(true);

    const container = document.querySelector('#container');

    d3.csv('fichier.csv')
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });

    for(let i = 0; i < 6; i++) {
        container.insertAdjacentHTML('afterbegin', node.innerHTML);
    }
}

copyTemplate();