const pathToOcMovie = "http://localhost:8000/api/v1/";
const bestMovies = `${pathToOcMovie}titles/?sort_by=-imdb_score&page_size=7`;

async function genreName() {
  try {
    const pathToCategory = `${pathToOcMovie}genres/?page_size=25`;
    const response = await fetch(pathToCategory);
    const data = await response.json();
    const genres = data.results;

    if (genres && genres.length > 0) {
      return genres.map((genre) => genre.name);
    }
  } catch (error) {
    console.error("Error fetching genre data:", error);
  }
}

function categoryUrl(genre) {
  return `${pathToOcMovie}titles/?genre=${genre}&sort_by=-imdb_score&page_size=6`;
}

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

    if (movies && movies.length > 0) {
      const moviesWithDetails = await Promise.all(
        movies.slice(0, 7).map((movie) => fetchMovieDetails(movie.url))
      );
      return moviesWithDetails;
    } else {
      console.error("Aucun film trouvé dans l'API.");
      return [];
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données: ", error);
    return [];
  }
}

function displayBestMovie(movies, documentId) {
  const movie = movies[0];
  const container = document.getElementById(documentId);

  if (movie) {
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
    `;
    document.querySelector(".details-best-movie-button").addEventListener("click", () => showMovieDetails(movie));
  }
}

function displayBestMovies(movies, documentId, categoryTitle) {
  const container = document.getElementById(documentId);
  if (!container) {
    console.error(`Element with id "${documentId}" not found in the DOM.`);
    return;
  }

  const movieSlice = (documentId === "best-movies") ? movies.slice(1, 7) : movies.slice(0, 6);
  const movieListHTML = movieSlice.map((movie, index) => `
    <div class="movie-item">
      <div class="movie-poster">
        <div class="movie-overlay">
          <h3>${movie.title}</h3>
          <button class="details-button" data-movie-index="${index}">Détails</button>
        </div>
        <img src="${movie.image_url}" alt="Affiche de ${movie.title}" class="movie">
      </div>
    </div>
  `).join("");

  container.innerHTML = `
    <h2>${categoryTitle}</h2>  
    <div class="movie-list">${movieListHTML}</div>
    <button class="show-more">Voir Plus</button>
  `;

  container.querySelectorAll(".details-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const movieIndex = event.target.getAttribute("data-movie-index");
      showMovieDetails(movieSlice[movieIndex]);
    });
  });

  container.querySelectorAll(".movie").forEach((image) => {
    image.addEventListener("error", () => {
      image.src = "pictureFile/Image-not-found.jpg";
      image.id = "image-not-found";
    });
  });

  container.querySelector(".show-more").addEventListener("click", () => toggleMovie(documentId));
}

function showMovieDetails(movie) {
  const popup = createNode("div");
  popup.className = "movie-popup";
  popup.innerHTML = `
    <div class="popup-details">
      <div class="popup-header">
        <div class="popup-info">
          <h2 class="popup-title">${movie.title}</h2>
          <div class="popup-close-icon">&times</div>
          <p class="movie-info">
            <strong>${movie.year} - ${movie.genres.join(", ")}</strong><br>
            <strong>${movie.duration} minutes - (${movie.countries.join(" / ")})</strong><br>
            <strong>IMDB Score: ${movie.imdb_score}/10</strong>
          </p>
        </div>
        <img src="${movie.image_url}" alt="${movie.title}" class="popup-image" onerror="this.src='pictureFile/Image-not-found.jpg'; this.id='image-not-found-popup';">
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
  popup.querySelector(".popup-close-icon").addEventListener("click", closePopup);
  popup.querySelector(".close-popup-button").addEventListener("click", closePopup);

  adjustPopupSize(popup);
}

function getVisibleMoviesCount() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 600) return 2;
  if (screenWidth <= 1120) return 4;
  return 6;
}

function toggleMovie(categoryId) {
  const container = document.getElementById(categoryId);
  const hiddenMovies = container.querySelectorAll(".movie-item.hidden");
  const showMoreButton = container.querySelector(".show-more");
  const visibleMovies = getVisibleMoviesCount();

  if (hiddenMovies.length > 0) {
    hiddenMovies.forEach((movie) => movie.classList.remove("hidden"));
    showMoreButton.textContent = "Voir Moins";
  } else {
    const allMovies = container.querySelectorAll(".movie-item");
    allMovies.forEach((movie, index) => {
      if (index >= visibleMovies) {
        movie.classList.add("hidden");
      }
    });
    showMoreButton.textContent = "Voir Plus";
  }
}

function closePopup() {
  const popup = document.querySelector(".movie-popup");
  if (popup) popup.remove();
}

function adjustPopupSize(popup) {
  const content = popup.querySelector(".popup-details");
  const maxHeight = window.innerHeight * 0.9; // 90% of viewport height

  if (content.offsetHeight > maxHeight) {
    popup.style.height = `${maxHeight}px`;
    popup.style.overflowY = "scroll";
  } else {
    popup.style.height = "auto";
    popup.style.overflowY = "visible";
  }
}

async function populateCategorySelect() {
  const select = document.getElementById("category-select");
  select.innerHTML = '<option value="">--Sélectionnez une catégorie--</option>';
  const genres = await genreName();
  genres.forEach((genre) => {
    const option = createNode("option");
    option.value = genre;
    option.textContent = genre.charAt(0).toUpperCase() + genre.slice(1);
    append(select, option);
  });
}

function handleCategoryChange() {
  const select = document.getElementById("category-select");
  const selectedValue = select.value;

  if (selectedValue) {
    const categoryUrlStr = categoryUrl(selectedValue);
    const categoryTitle = selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1);
    fetchMovies(categoryUrlStr).then((movies) => {
      displayBestMovies(movies, "category-movies", categoryTitle);
    });
  } else {
    document.getElementById("category-movies").innerHTML = "";
  }
}

async function initMovieDisplay() {
  const bestMoviesData = await fetchMovies(bestMovies);
  displayBestMovie(bestMoviesData, "best-movie");

  const categoriesToDisplay = [
    {
      data: bestMoviesData,
      id: "best-movies",
      title: "Meilleurs films",
    },
    {
      data: await fetchMovies(categoryUrl("Fantasy")),
      id: "movie-category-1",
      title: "Fantastiques",
    },
    {
      data: await fetchMovies(categoryUrl("Crime")),
      id: "movie-category-2",
      title: "Crime",
    },
  ];

  categoriesToDisplay.forEach((category) => {
    displayBestMovies(category.data, category.id, category.title);
  });

  await populateCategorySelect();
  document
    .getElementById("category-select")
    .addEventListener("change", handleCategoryChange);

  const applyInitialHidding = () => {
    const visibleMovies = getVisibleMoviesCount();
    document.querySelectorAll(".movie-list").forEach((list) => {
      const movies = list.querySelectorAll(".movie-item");
      movies.forEach((movie, index) => {
        movie.classList.toggle("hidden", index >= visibleMovies);
      });
      const showMoreButton = list.parentElement.querySelector(".show-more");
      showMoreButton.textContent = movies.length > visibleMovies ? "Voir Plus" : "Voir Moins";
    });
  };

  applyInitialHidding();
  window.addEventListener("resize", applyInitialHidding);
}

document.addEventListener("DOMContentLoaded", initMovieDisplay);
