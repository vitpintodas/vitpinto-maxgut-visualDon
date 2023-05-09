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
        // filtrage des données en fonction de perso
        const filtereData = data.filter(d => d.name === perso);

        console.log(node.content.querySelector(".age").textContent);
        console.log(filtereData[0].Age.toString());

        console.log(node.content.querySelector(".age").textContent = filtereData[0].Age.toString());

        node.content.querySelector("h2").textContent = perso;
        node.content.querySelector("div").classList = perso;
        node.content.querySelector("img").src = `assets/personnages/${perso}.png`;
        node.content.querySelector(".age").textContent = filtereData[0].Age.toString();
        node.content.querySelector(".role").textContent = filtereData[0].Role;
        node.content.querySelector(".victimes").textContent = Number(filtereData[0]["Saison 1"]) + Number(filtereData[0]["Saison 2"]) + Number(filtereData[0]["Saison 3"]) + Number(filtereData[0]["Saison 4"]) + Number(filtereData[0]["Saison 5"]);

        d3.csv("../data/data.csv").then(function (data) {
            const filtereData = data.filter(d => d.name === perso);
        });


        modalHeader.insertAdjacentHTML('afterbegin', node.innerHTML);
    });

    node.content.querySelector("div").classList = perso;
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
            .attr("x", function (d, i) { return xScale(seasons[i]); })
            .attr("y", function (d) { return yScale(d); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return 350 - yScale(d); })
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

function displaySeconGraph() {
    // dimensions du graphe
    const width = 3840;
    const height = 2160;

    // chargement des données
    d3.csv("../data/data.csv", function (data) {//mettre a jour vers le chemin du fichier csv
        // création du tableau des responsables de la mort avec le nombre de morts qu'ils ont causés
        const responsables = d3.nest()
            .key(function (d) { return d["Responsable de la mort"]; })
            .rollup(function (v) { return v.length; })
            .entries(data);

        // création de la mise en page
        const svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // création de la variable tooltip
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("visibility", "hidden");

        // création de la simulation de forces pour les bulles
        const simulation = d3.forceSimulation(responsables)
            .force("charge", d3.forceManyBody().strength(-7500))
            .force("x", d3.forceX(width / 2))
            .force("y", d3.forceY(height / 2))
            .force("collision", d3.forceCollide().radius(function (d) { return d.value + 8; }));

        // création des bulles pour chaque responsable
        const bubble = svg.selectAll(".bubble")
            .data(responsables)
            .enter()
            .append("circle")
            .attr("class", "bubble")
            .attr("r", function (d) { return d.value * 11; })
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("fill", "green")
            .attr("opacity", 1)
            .on("mouseover", function (d) {
                d3.select(this).attr("opacity", 1.0);
                tooltip.style("visibility", "visible");
                tooltip.text(d.key);
                tooltip.text(d.key + " - " + d.value + " victime(s)");
            })
            .on("mousemove", function () {
                tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", function () {
                d3.select(this).attr("opacity", 1);
                tooltip.style("visibility", "hidden");
            });

        //créer les étiquettes pour chaques bulles (ne sert a rien, mais sinon il y a des erreurs)
        const label = svg.selectAll(".label")
            .data(responsables)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("text-anchor", "middle")
            .text(function (d) { return d.key; })
            .attr("font-size", 0);


        // mise à jour des positions des bulles à chaque étape de la simulation de forces
        simulation.on("tick", function () {
            bubble.attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; });
            label.attr("x", function (d) { return d.x; })
                .attr("y", function (d) { return d.y + d.value + 5; });
        });



    });
}

// appel de la fonction
displayCards();