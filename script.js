function createNode(element) {
  return document.createElement(element);
}

function append(parent, child) {
  return parent.appendChild(child);
}

async function fetchMovieDetails(url) {
  const response = await fetch(url);
  return response.json();
}

async function fetchMovies(categoryUrl) {
  try {
    const response = await fetch(categoryUrl);
    const data = await response.json();
    const movies = data.results;

    if (movies.length > 0) {
      const moviesWithDetails = await Promise.all(
        movies.slice(0, 7).map((movie) => fetchMovieDetails(movie.url))
      );
      return moviesWithDetails;
    } else {
      console.error("aucun film trouvé dans l'API.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données: ", error);
  }
}

function displayMovie(
  moviesWithDetails,
  containerId,
  categoryTitle
) {
  display(moviesWithDetails, containerId, categoryTitle);
}

function displayBestMovie(movies, documentId) {
  const movie = movies[0];
  const container = document.getElementById(documentId);
  container.innerHTML = `
    <h2>Meilleur film</h2>
        <div class="movie-content">
            
            <div class="movie-info">
                <h3>${movie.original_title}</h3>
                <p>${movie.description}</p>
                <button id="details-button">
                    <img src="${movie.image_url}" alt="Affiche du meilleur film">
                </button>
                </div>
        </div>
    `;
  document
    .getElementById("details-button")
    .addEventListener("click", () => showMovieDetails(movie));
}

function displayBestMovies(movies, documentId, categoryTitle) {
  const movieSlice = movies.slice(0, 6);
  const container = document.getElementById(documentId);
  const movieListHTML = movieSlice
    .map(
      (movie) => `
      <div class="movie-item">
        <h3>${movie.title}</h3>
        <button class="details-button">détails
        <img src="${movie.image_url}" alt="Affiche de ${movie.title}"></button>
      </div>
    `
    )
    .join("");

  container.innerHTML = `
      <h2>${categoryTitle}</h2>  
      <div class="movie-list">${movieListHTML}</div>
    `;

  const buttons = container.querySelectorAll(".details-button");
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => showMovieDetails(movieSlice[index]));
  });
}


function showMovieDetails(movie) {
  const popup = createNode("div");
  popup.className = "movie-popup";

  popup.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${movie.image_url}" alt="${movie.title}">
        <p><strong>Année:</strong> ${movie.year}</p>
        <p><strong>Score IMDB:</strong> ${movie.imdb_score}</p>
        <p><strong>Réalisateur:</strong> ${movie.directors.join(", ")}</p>
        <p><strong>Acteurs:</strong> ${movie.actors.join(", ")}</p>
        <p><strong>Genre(s):</strong> ${movie.genres.join(", ")}</p>
        <p><strong>Durée:</strong> ${movie.duration} min</p>
        <p><strong>Date de sortie:</strong> ${movie.date_published}</p>
        <p><strong>Recette au box office:</strong> ${
          movie.worldwide_gross_income
        }</p>
        <p><strong>Pays d'origine:</strong> ${movie.countries}</p>
        <p><strong>Description:</strong> ${movie.description}</p>
        <button onclick="closePopup()">Fermer</button>
    `;

  document.body.appendChild(popup);
}

function closePopup() {
  const popup = document.querySelector(".movie-popup");
  if (popup) {
    popup.remove();
  }
}

function populateCategorySelect() {
  const select = document.getElementById("category-select");
  select.innerHTML = '<option value="">--Sélectionnez une catégorie--</option>';
  Object.keys(genreMovie).forEach((key) => {
    const option = createNode("option");
    option.value = key;
    option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    append(select, option);
  });
}

function handleCategoryChange() {
  const select = document.getElementById("category-select");
  const selectedValue = select.value;
  if (selectedValue) {
    const categoryUrl = genreMovie[selectedValue];
    const categoryTitle =
      selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1);
    fetchMovies(categoryUrl).then((movies) => {
      displayBestMovies(movies ,"category-movies", categoryTitle);
    });
  } else {
    document.getElementById("category-movies").innerHTML = "";
  }
}

async function initMovieDisplay() {
    const bestMoviesData = await fetchMovies(bestMovies);
    displayBestMovie(bestMoviesData, "best-movie");
    displayBestMovies(bestMoviesData, "best-movies", "Films les mieux notés toutes catégories confondus");

    const fantasyMoviesData = await fetchMovies(genreMovie.Fantasy);
    displayBestMovies(fantasyMoviesData, "movie-category-1", "Films les mieux notés de la catégorie fantastiques");

    const crimeMoviesData = await fetchMovies(genreMovie.Crime);
    displayBestMovies(crimeMoviesData, "movie-category-2", "Films les mieux notés de la catégorie crime");

    populateCategorySelect();
    document
        .getElementById("category-select")
        .addEventListener("change", handleCategoryChange);
}

document.addEventListener("DOMContentLoaded", initMovieDisplay);
