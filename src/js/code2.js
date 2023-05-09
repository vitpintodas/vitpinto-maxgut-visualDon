// importation de la librairie D3
import * as d3 from 'd3';

function displaySeconGraph() {
    // dimensions du graphe
    const width = 1310;
    const height = 732;

    // chargement des données
    d3.csv("../data/data.csv").then(function (data) {
        // création du tableau des responsables de la mort avec le nombre de morts qu'ils ont causés
        const dataMap = d3.rollup(
            data,
            (v) => v.length,
            (d) => d["Responsable de la mort"]
        );
        const responsables = Array.from(dataMap, ([key, value]) => ({
            key,
            value,
        }));

        console.log(responsables);

        // création de la mise en page
        const svg = d3
            .select("#my_dataviz")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // création de la variable tooltip
        const tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("visibility", "hidden");

        // création de la simulation de forces pour les bulles
        const simulation = d3
            .forceSimulation(responsables)
            .force("charge", d3.forceManyBody().strength(-1500))
            .force("x", d3.forceX(width / 2))
            .force("y", d3.forceY(height / 2))
            .force(
                "collision",
                d3.forceCollide().radius(function (d) {
                    return d.value + 8;
                })
            );

        // création des bulles pour chaque responsable
        const bubble = svg
            .selectAll(".bubble")
            .data(responsables)
            .join("circle")
            .attr("class", "bubble")
            .attr("r", function (d) {
                return d.value * 5;
            })
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("fill", "green")
            .attr("opacity", 1)
            .on("mouseover", function (event, d) {
                d3.select(this).attr("opacity", 1.0);
                tooltip.style("visibility", "visible");
                tooltip.text(d.key);
                tooltip.text(d.key + " - " + d.value + " victime(s)");
            })
            .on("mousemove", function () {
                tooltip
                    .style("top", event.pageY - 10 + "px")
                    .style("left", event.pageX + 10 + "px");
            })
            .on("mouseout", function () {
                d3.select(this).attr("opacity", 1);
                tooltip.style("visibility", "hidden");
            });

        //créer les étiquettes pour chaques bulles (ne sert a rien, mais sinon il y a des erreurs)
        const label = svg
            .selectAll(".label")
            .data(responsables)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d.key;
            })
            .attr("font-size", 0);

        // mise à jour des positions des bulles à chaque étape de la simulation de forces
        simulation.on("tick", function () {
            bubble
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
            label
                .attr("x", function (d) {
                    return d.x;
                })
                .attr("y", function (d) {
                    return d.y + d.value + 5;
                });
        });
    });
}

displaySeconGraph();