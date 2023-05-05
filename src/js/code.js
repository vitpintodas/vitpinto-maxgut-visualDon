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
    d3.csv("../data/data_compress.csv").then(function (data) {
        data.forEach(function (d) {
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
 */
function clickCard(event) {
    const modal = document.getElementById('modalBox');
    const close = document.querySelector('.close');
    const backgroundElements = document.querySelectorAll('.background-element');
    const logo = document.querySelector('#logo');
    const name = event.currentTarget.querySelector('.cara-name').textContent;

    /*
     * activation de la modal
     */
    modal.classList.add('active');

    backgroundElements.forEach((element) => {
        element.classList.add('blur');
    });

    logo.classList.add('blur');

    //* affichage des infos dans la modal
    displayGraph(name);
    displayCompletInfos(name);

    /*
     * fermeture de la modal
     */
    close.onclick = function () {
        modal.classList.remove('active');
        backgroundElements.forEach((element) => {
            element.classList.remove('blur');
        });
        logo.classList.remove('blur');
        removeGraph();
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.classList.remove('active');
            backgroundElements.forEach((element) => {
                element.classList.remove('blur');
            });
            logo.classList.remove('blur');
            removeGraph();
        };
    };
}

function displayCompletInfos(perso) {
    const node = document.querySelector('#modalTemplate').cloneNode(true);
    const modalHeader = document.querySelector('.modalHeader');
    const allContent = document.querySelectorAll('.modalHeader > div');

    // suppression des infos précédentes sans supprimer le template
    allContent.forEach((element) => {
        element.remove();
    });

    d3.csv("../data/data2.csv").then(function (data) {
        //console.log(data);
    });

    d3.csv("../data/data").then(function (data) {
        //console.log(data);
    });

    node.content.querySelector("h2").textContent = perso;
    node.content.querySelector("div").classList = perso;

    modalHeader.insertAdjacentHTML('afterbegin', node.innerHTML);
}


function removeCompleteInfos() {
    // suppression des infos précédentes sans supprimer le template
    const modalHeader = document.querySelector('.modalHeader');
}

/**
 * Affichage des graphiques sur les modals
 * @param {*} perso 
 */
function displayGraph(perso) {

    // création de l'espace graphique SVG

    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500);

    // récupération des données du CSV
    d3.csv("../data/data2.csv").then(function (data) {

        // filtrage des données pour le personnage sélectionné
        var filtereData = data.filter(function (d) {
            return d.name === perso;
        });

        // extraction des données des victimes pour chaque saison
        var seasons = ["Saison 1", "Saison 2", "Saison 3", "Saison 4", "Saison 5"];

        var victimData = [];

        seasons.forEach(function (season) {
            victimData.push(parseInt(filtereData[0][season]));
        });

        // échelle de l'axe y et de l'axe x
        var xScale = d3.scaleBand()
            .domain(seasons)
            .range([50, 450])
            .padding(0.2);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(victimData)])
            .range([350, 50]);

        // création de l'axe x et de l'axe y
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("transform", "translate(0, 350)")
            .call(xAxis);

        svg.append("g")
            .attr("transform", "translate(50, 0)")
            .call(yAxis);

        // ajout du nom de l'axe y
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x", -200)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Nombre de morts");

        // ajout du nom de l'axe x
        svg.append("text")
            .attr("y", 380)
            .attr("x", 225)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Saison");

        // création des barres
        svg.selectAll("rect")
        .data(victimData)
        .enter()
        .append("rect")
        .attr("x", function(d, i) { return xScale(seasons[i]); })
        .attr("y", function(d) { return yScale(d); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return 350 - yScale(d); })
        .attr("rx", 5)
        .attr("ry", 5)
        .on("mouseover", function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("fill", "yellow")

                // récupération de l'index de la barre survolée
                const i = d3.selectAll("rect").nodes().indexOf(this);

                svg.append("text")
                    .attr('class', 'value')
                    .attr('x', xScale(seasons[i]) + xScale.bandwidth() / 2)
                    .attr('y', yScale(d) - 30)
                    .attr('text-anchor', 'middle')
                    .text(d);
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("fill", "#0e1117");

                svg.selectAll('.value').remove();
            });
    });
}

/**
 * Suppression du graphique
 */
function removeGraph() {
    const svg = document.querySelector('svg');
    svg.remove();
}

// appel de la fonction
displayCards();