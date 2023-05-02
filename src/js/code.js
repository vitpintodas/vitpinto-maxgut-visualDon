// importation de la librairie D3
import * as d3 from 'd3';

/**
 * Affichage des 6 cartes avec les données du CSV
 */
function displayCards() {
    // copie du template
    const node = document.querySelector('#template').cloneNode(true);

    // récupération du container
    const container = document.querySelector('#container');

    /**
     * Récupération des données + affichage dans le HTML
     */
    d3.csv("../data/data_compress.csv").then(function(data) {
        data.forEach(function(d) {
            // affichage du totale de vitimes
            node.content.querySelector('.victim-number').textContent = Number(d.victims1) + Number(d.victims2) + Number(d.victims3) + Number(d.victims4) + Number(d.victims5);

            // affichage de la photo du personnage
            node.content.querySelector('.cara-img img').src = `assets/personnages/${d.name}.png`;

            // affichage du nom du personnage
            node.content.querySelector('.cara-name').textContent = d.name;

            // injection du code HTML dans le container
            container.insertAdjacentHTML('afterbegin', node.innerHTML);

            

            document.querySelector('.card').addEventListener('click', clickCard);
        });
    });
}

/**
 * Gère le clic sur une carte
 * TODO: afficher les informations détaillées au clic
 */
function clickCard() {
    const modal = document.getElementById('modalBox');
    const close = document.querySelector('.close');
    const backgroundElements = document.querySelectorAll('.background-element');
    const logo = document.querySelector('#logo');
    const body = document.querySelector('body');

    modal.classList.add('active');

    backgroundElements.forEach((element) => {
        element.classList.add('blur');
    });

    logo.classList.add('blur');

    close.onclick = function() {
        modal.classList.remove('active');
        backgroundElements.forEach((element) => {
            element.classList.remove('blur');
        });
        logo.classList.remove('blur');
    }

    window.onclick = function(event) {
        if(event.target == modal) {
            modal.classList.remove('active');
            backgroundElements.forEach((element) => {
                element.classList.remove('blur');
            });
            logo.classList.remove('blur');
        };
    };
}

// appel de la fonction
displayCards();