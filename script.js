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

function displayBestMovie(movies, documentId) {
  const movie = movies[0];
  const container = document.getElementById(documentId);
  container.innerHTML = `
  <h2>Meilleur film</h2>
  <div class="movie-content">
            
        <img src="${movie.image_url}" alt="Affiche du meilleur film" class="best-movie-img">
        <div class="movie-info">
        <h3>${movie.original_title}</h3>
            <p>${movie.description}</p>
            <button class="details-best-movie-button">Détails</button>
              </div>
              </div>
        </div>
    `;
  document
    .querySelector(".details-best-movie-button")
    .addEventListener("click", () => showMovieDetails(movie));
}

function displayBestMovies(movies, documentId, categoryTitle) {
  const movieSlice = movies.slice(0, 6);
  const container = document.getElementById(documentId);
  if (!container) {
    console.error(`Element with id "${documentId}" not found in the DOM.`);
    return;
  }

  const movieListHTML = movieSlice
    .map(
      (movie) => `
      <div class="movie-item">
      <div class="movie-poster">
      <div class="movie-overlay">
      <h3>${movie.title}</h3>
      <button class="details-button">Détails</button>
      </div>
      <img src="${movie.image_url}" alt="Affiche de ${movie.title}" class="movie">
        </div>
        </div>
    `
    )
    .join("");

  container.innerHTML = `
      <h2>${categoryTitle}</h2>  
      <div class="movie-list">${movieListHTML}</div>
      <button class="show-more" onclick="{(event) => toggleMovie('${documentId}', event)}">Afficher Plus</button>
    `;
  const movieListContainer = container.querySelector(".movie-list");

  movieListContainer.innerHTML = movieListHTML;

  const buttons = container.querySelectorAll(".details-button");
  const showMoreButton = container.querySelectorAll(".show-more");
  showMoreButton.forEach((button) => 
  button.addEventListener("click", (event) => toggleMovie(documentId, event)));

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => showMovieDetails(movieSlice[index]));
  });
}


function toggleMovie(categoryId) {
  const container = document.getElementById(categoryId);
  const hiddenMovie = container.querySelectorAll(".movie-item.hidden");
  const showMoreButton = container.querySelector(".show-more");

  if (hiddenMovie.length > 0) {
    hiddenMovie.forEach((movie) => {
      movie.classList.remove("hidden");
    });
    showMoreButton.textContent = "Afficher Moins";
  } else {
    const movieToHide = container.querySelectorAll(".movie-item:nth-child(n+3)");
    movieToHide.forEach((movie) => {
      movie.classList.add("hidden");
    });
    showMoreButton.textContent = "Afficher Plus";
  }
}

function showMovieDetails(movie) {
  const popup = createNode("div");
  popup.className = "movie-popup";

  popup.innerHTML = `
    <div class="popup-details">
      <div class="popup-header">
        <div class="popup-info">
          <h2 class="popup-title">${movie.title}</h2>
          <p class="movie-info">
            <strong>${movie.year} - ${movie.genres.join(", ")}</strong><br>
            <strong>${movie.duration} minutes - (${movie.countries.join(" / ")})</strong><br>
            <strong>IMDB Score: ${movie.imdb_score}/10</strong>
          </p>
        </div>
        <img src="${movie.image_url}" alt="${movie.title}" class="popup-image">
      </div>
      <p><strong>Réalisé par:</strong> ${movie.directors.join(", ")}</p>
      <div class="popup-main-content">
        <div class="popup-description">
          <p class="movie-synopsis">${movie.description}</p>
        </div>
      </div>
      <div class="popup-actors">
        <p><strong>Acteurs:</strong> ${movie.actors.join(", ")}</p>
      </div>
    </div>
    <button class="close-popup-button" onclick="closePopup()">Fermer</button>
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
      displayBestMovies(movies, "category-movies", categoryTitle);
    });
  } else {
    document.getElementById("category-movies").innerHTML = "";
  }
}

async function initMovieDisplay() {
  const bestMoviesData = await fetchMovies(bestMovies);
  displayBestMovie(bestMoviesData, "best-movie");

  displayBestMovies(
    bestMoviesData,
    "best-movies",
    "Films les mieux notés toutes catégories confondus"
  );

  const fantasyMoviesData = await fetchMovies(genreMovie.Fantasy);
  displayBestMovies(
    fantasyMoviesData,
    "movie-category-1",
    "Films les mieux notés de la catégorie fantastiques"
  );

  const crimeMoviesData = await fetchMovies(genreMovie.Crime);
  displayBestMovies(
    crimeMoviesData,
    "movie-category-2",
    "Films les mieux notés de la catégorie crime"
  );

  populateCategorySelect();
  document
    .getElementById("category-select")
    .addEventListener("change", handleCategoryChange);
  console.log(window.innerWidth , window.innerHeight)
  if (window.innerWidth <= 768){
    document.querySelectorAll(".movie-item:nth-child(n+3)").forEach(movie => {
      movie.classList.add("hidden")
    });
  } else if ((window.innerWidth <= 1024)){
    document.querySelectorAll(".movie-item:nth-child(n+5)").forEach(movie => {
      movie.classList.add("hidden")
  });
}
}

document.addEventListener("DOMContentLoaded", initMovieDisplay);
