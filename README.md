# P6 - OC Movies

Bienvenue dans le projet OC Movies, une application web conçue pour offrir des informations détaillées sur les films. Cette application met en avant les films les mieux notés ainsi que ceux classés par catégorie. Grâce à sa conception responsive, elle s'adapte parfaitement à différents appareils allant des smartphones aux ordinateurs de bureau. Pour garantir des données de qualité, OC Movies utilise une API pour récupérer les informations nécessaires.

# Fonctionnalités

L'application OC Movies vous permet d'accéder à un large éventail de fonctionnalités, parmi lesquelles :

-   L'affichage du film le mieux noté sur IMDb.
-   La présentation des films les mieux notés dans toutes les catégories.
-   Deux catégories de films pour faciliter la navigation.
-   Un sélecteur de catégorie permettant de visualiser les films d'une catégorie spécifique.
-   Un design responsive pour une visualisation optimale sur mobile, tablette et bureau.
-   Une popup affichant les détails du film, tels que l'année, la note, le titre, la description, la catégorie, ainsi que l'image du film.

# Technologies utilisées

Pour le développement de cette application, différentes technologies ont été mises en œuvre :

-    HTML5 pour la structure de la page.
-    CSS3 pour le style et la mise en page.
-    JavaScript pour la gestion des interactions dynamiques.
-    Une API, désignée sous le nom d'OCMovies-API, pour la récupération des données cinématographiques.

# Structure du projet

La structure de l'application est organisée comme suit :

-    style.css : Ce fichier regroupe tous les styles appliqués à l'application, y compris les règles pour un design responsive.
-    index.html : Le fichier principal HTML qui définit la structure de la page et intègre des balises ID ou class pour faciliter le ciblage des éléments.
-    script.js : Ce fichier JavaScript gère la dynamisation des contenus et les interactions utilisateur.
-    config.js : Un fichier de configuration qui contient les URLs de l’API et les genres de films à explorer.

# Installation et configuration

Pour commencer avec OC Movies, suivez ces étapes :

-    Clonez le dépôt sur votre machine locale.
-    Assurez-vous que l'API OCMovies est opérationnelle à l'URL http://localhost:8000, conformément aux instructions fournies dans le fichier Readme de l'API.
-    Ouvrez le fichier index.html dans votre navigateur pour visualiser l'application.

# Utilisation

À l'ouverture de l'application, la page principale affiche le film le mieux noté en haut, suivi des sections pour les films les mieux notés et de deux catégories de films. Utilisez le sélecteur de catégorie en bas pour explorer les films d'une catégorie spécifique. Cliquez sur un film pour en découvrir les détails via une popup.

# Design responsive

L'application est soigneusement optimisée pour une expérience utilisateur fluide sur tous les types d'appareils :

-    Appareils mobiles (max-width: 480px) : Mise en page en une seule colonne.
-    Tablettes (max-width: 820px) : Mise en page en deux colonnes pour les listes de films.
-    Ordinateurs de bureau : Mise en page multi-colonnes avec des effets de survol pour améliorer l'interaction.

# Auteurs

- [antogro](https://github.com/antogro/)
