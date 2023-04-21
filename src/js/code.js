import * as d3 from 'd3';
/**
 * Affichage des 6 cartes avec les données du CSV
 */
function copyTemplate() {
    const node = document.querySelector('#template').cloneNode(true);

    const container = document.querySelector('#container');

    d3.csv("../data/data_compress.csv").then(function(data) {
        data.forEach(function(d) {
            console.log(d);
        });
    });

    for(let i = 0; i < 6; i++) {
        container.insertAdjacentHTML('afterbegin', node.innerHTML);
    }
}

copyTemplate();