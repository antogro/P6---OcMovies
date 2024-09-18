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
  `;
  document
    .querySelector(".details-best-movie-button")
    .addEventListener("click", () => showMovieDetails(movie));
}

function displayBestMovies(movies, documentId, categoryTitle) {
  if (documentId === "best-movies"){
    movieSlice = movies.slice(1, 7);
  } else {
    movieSlice = movies.slice(0, 6);
  }
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
  <button class="show-more" onclick="{(event) => toggleMovie('${documentId}', event)}">Voir Plus</button>
  `;
  const movieListContainer = container.querySelector(".movie-list");

  movieListContainer.innerHTML = movieListHTML;

  const showMoreButton = container.querySelectorAll(".show-more");
  showMoreButton.forEach((button) =>
    button.addEventListener("click", (event) => toggleMovie(documentId, event))
);

const images = container.querySelectorAll(".movie");
images.forEach((image) => {
  image.addEventListener("error", () => {
    image.src = "pictureFile/Image-not-found.jpg";
    image.id = "image-not-found";
  });
});

const buttons = container.querySelectorAll(".details-button");
buttons.forEach((button, index) => {
  button.addEventListener("click", () => showMovieDetails(movieSlice[index]));
});
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
            <strong>${movie.duration} minutes - (${movie.countries.join(
    " / "
  )})</strong><br>
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

  const closeIcon = popup.querySelector(".popup-close-icon");
  if (closeIcon) {
    closeIcon.addEventListener("click", closePopup);
  }

  const closeButton = popup.querySelector(".close-popup-button");
  if (closeButton) {
    closeButton.addEventListener("click", closePopup);
  }
  adjustPopupSize(popup);
}

function displayLogo() {
  const logo = createNode("img");
  const baliseLogo = document.getElementById("logo");
  if (getVisibleMoviesCount() === 2) {
    logo.src = "pictureFile/logo-dimension-smartphone.png";
    logo.id = "logo-smartphone";
  } else {
    logo.src = "/pictureFile/logo-dimension-tablette-pc.png";
    logo.id = "logo-tablette-pc";
  }
  logo.alt = "Logo du site OcMovie";
  baliseLogo.appendChild(logo);
}

function getVisibleMoviesCount() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 768) {
    return 2;
  } else if (screenWidth <= 1024) {
    return 4;
  } else {
    return 6;
  }
}

function toggleMovie(categoryId) {
  const container = document.getElementById(categoryId);
  const hiddenMovies = container.querySelectorAll(".movie-item.hidden");
  const showMoreButton = container.querySelector(".show-more");

  const visibleMovies = getVisibleMoviesCount();

  if (hiddenMovies.length > 0) {
    hiddenMovies.forEach((movie) => {
      movie.classList.remove("hidden");
    });
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
  if (popup) {
    popup.remove();
  }
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

function populateCategorySelect() {
  const select = document.getElementById("category-select");
  select.innerHTML = '<option value="">--Sélectionnez une catégorie--</option>';
  Object.keys(genreMovie).forEach((key) => {
    const option = createNode("option") ;
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

  const categoriesToDisplay = [
    {
      data: bestMoviesData,
      id: "best-movies",
      title: "Meilleurs films ",
    },
    {
      data: await fetchMovies(genreMovie.Fantasy),
      id: "movie-category-1",
      title: "Fantastiques",
    },
    {
      data: await fetchMovies(genreMovie.Crime),
      id: "movie-category-2",
      title: "Crime",
    },
  ];

  categoriesToDisplay.forEach((category) => {
    displayBestMovies(category.data, category.id, category.title);
  });

  populateCategorySelect();
  document
    .getElementById("category-select")
    .addEventListener("change", handleCategoryChange);

  const applyInitialHidding = () => {
    const visibleMovies = getVisibleMoviesCount();

    document.querySelectorAll(".movie-list").forEach((list) => {
      const movies = list.querySelectorAll(".movie-item");
      movies.forEach((movie, index) => {
        if (index >= visibleMovies) {
          movie.classList.add("hidden");
        } else {
          movie.classList.remove("hidden");
        }
      });
      const showMoreButton = list.parentElement.querySelector(".show-more");
      if (showMoreButton) {
        showMoreButton.textContent =
          movies.length > visibleMovies ? "Voir Plus" : "Voir Moins";
      }
    });
  };
  applyInitialHidding();
  window.addEventListener("resize", applyInitialHidding);
  displayLogo();
}

document.addEventListener("DOMContentLoaded", initMovieDisplay);
