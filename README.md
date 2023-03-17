# Projet Visualisation de données

*Auteurs: Vitor Emanuel Pinto Da Silva & Maxime Gutknecht*

## Contexte

**Liens vers les données**<br>
[Kaggle](https://www.kaggle.com/datasets/varpit94/breaking-bad-tv-show-all-seasons-episodes-data)<br>
[API](https://github.com/timbiles/Breaking-Bad--API)

Nous avons réussi à récupérer deux jeux de données concernant la série Breaking Bad. La première provient du site Kaggle et est un fichier csv contenant les informations sur les épisodes de la série. La seconde provient d'une API crée par un utilisateur de Github ([timbles](https://github.com/timbiles)) et son collaborateur ([thulin82](https://github.com/thulin82)). L'API contient des informations sur les personnages de la série, ainsi que sur les épisodes.

------------------------

## Description

Dans la première source de données en provenance de Kaggle, les données sont stockées dans un csv. les données présentes dans le csv sont les suivantes :<br>
- `Date` : date de diffusion de l'épisode
- `Season` : numéro de la saison
- `Episode` : numéro de l'épisode
- `Title` : titre de l'épisode
- `Directed by` : nom du réalisateur
- `Written by` : nom de l'auteur
- `Duration mins` : durée de l'épisode en minutes
- `Summary` : résumé de l'épisode
- `Rating IMDB` : note de l'épisode selon IMDB
- `US viewers in millions` : nombre de spectateurs américains (en millions)

Dans la seconde source, les données proviennes d'une API. Les données qu'on y trouve concernent les points suivants :<br>
- `Character Attributes` : informations sur les personnages
- `Episodes Attributes` : Données sur les épisodes
- `Quotes Attributes` : Citations provenant de la série
- `Death Attributes` : Informations sur les morts dans la série

Dans l'API, il y a possiblité de récupérer des informations très précises concernant les personnages, notamment si ils sont toujours vivants ou pas et leur cause de décès (si ils trouvent la mort).

------------------------

## But

Notre objectif est de prendre certains personnages clefs de la série Breaking Bad et d'afficher leur nombre de victimes par saison. L'objectif est de voir qui est le réel méchant de la série.
Entre des personnages comme Walter White, Gus Fring, Jesse Pinkman, etc, on veut voir qui est le plus meurtrier puisque chacun d'eux n'est pas forcément un personnage "gentil".

------------------------

## Références

Nous n'avons pas réellement trouvé de personnes qui utilisent ces données.<br>
Dans un premier temps, sur [Kaggle](https://www.kaggle.com/datasets/varpit94/breaking-bad-tv-show-all-seasons-episodes-data) nous avons trouvé une personne qui a utilisé les données du csv, mais apparemment sans réel but mis à part pour l'amusement.<br>
Nous avons ensuite eu vent de l'API, via un site où une personne s'est amusée à créer un tableau montrant le nombre de morts totales par saison avec leur cause.

------------------------

## Thématique

Voici notre wireframe pour notre projet, il contient une première page avec les 6 personnages clés, quand on clique dessus, on a accès a des informations sur ces personnages et un histogramme du nombre de morts par saison liées à ce personnage.
Quand on clique sur le logo breaking bad sur la page d'accueil on a accès a une pus grande visualisation sur les personnages, leurs nombres de morts causées en fonction des épisodes, on y ajoutera aussi des bulles à certains endroits clés pour racconter une histoire.
en scrollant depuis cette visualisation, on a accès finalement au personnage le plus meurtrier de la série, avec des infos sur lui.

![wireframe](https://user-images.githubusercontent.com/91839631/225916179-139f3b48-496a-4d11-abbb-709dca630fc9.png)
