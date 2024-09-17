# P6---OcMovies

OC Movies est une application web qui affiche des informations sur des films, notamment les films les mieux notés et les films par catégorie. L'application est responsive et fonctionne sur divers appareils, des téléphones mobiles aux ordinateurs de bureau. L'application permet de récuperer les données provenant d'une API et ainsi offre une information de bonne qualité.


# Fonctionnalités

Le site web permet un affichage:
- Du film le mieux noté d'IMDB,
- La présentation des films les mieux notés, toute catégorie confondue
- Deux catégories de films
- Un sélecteur de catégorie pour visualiser les films d'une catégorie spécifique
- Un Design responsive pour la visualisation sur mobile, tablette et bureau
- Une Popup de détails du film (année,  note, titre, description, catégorie, image, etc.)


# Technologies utilisées

- HTML5
- CSS3
- JavaScript
- API externe pour récupérer les données des films (OCMovies-API)

# Structure du projet

- style.css : Contient tous les styles pour l'application, y compris les designs responsives
- index.html : Le fichier HTML principal qui structure la page web en y integrant des balises ID ou class, permetant 
  ainsi de cibler les éléments pour les styles et les scripts
- script.js : Fichier JavaScript qui gère le contenu dynamique et les interactions
- config.js : Fichier de configuration contenant les URLs de l'API et les genres de films

# Configuration

Le fichier config.js contient les paramètres suivants :
- pathToOcMovie : URL de base de l'API (http://localhost:8000/api/v1/titles/).
- bestMovies : URL pour obtenir les 7 meilleurs films selon le score IMDb.
- genreMovie : Objet contenant les URLs pour obtenir les 6 meilleurs films de chaque catégorie.

# Installation et configuration

Clonez le dépôt sur votre machine locale
Assurez-vous que l'API OCMovies est en cours d'exécution sur http://localhost:8000 
En suivant les instructions du fichier Readme de l'API OCMovies.
Ouvrez le fichier index.html dans votre navigateur pour visualiser l'application

# Utilisation

La page principale affiche le film le mieux noté en haut, suivi de sections pour les films les mieux notés et deux catégories de films.
Utilisez le sélecteur de catégorie en bas pour voir les films d'une catégorie spécifique.
Cliquez sur un film pour voir plus de détails dans un popup.

# Design responsive
L'application est conçue pour être responsive :

Appareils mobiles (max-width: 480px) : Mise en page en une seule colonne avec des cartes de films optimisées
Tablettes (max-width: 820px) : Mise en page en deux colonnes pour les listes de films
Bureau : Mise en page multi-colonnes avec effets de survol

# Auteurs

-  [Nom de l'auteur](https://github.com/antogro)
