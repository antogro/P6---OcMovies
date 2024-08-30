const pathToOcMovie = "http://localhost:8000/api/v1/titles/"
const bestMovies = pathToOcMovie + "?sort_by=-imdb_score&page_size=7"
const genreMovie = {
    Action: pathToOcMovie + "?genre=action&sort_by=-imdb_score&page_size=6",
    Fantasy: pathToOcMovie + "?genre=fantasy&sort_by=-imdb_score&page_size=6",
    Drama: pathToOcMovie + "?genre=drama&sort_by=-imdb_score&page_size=6",
    History: pathToOcMovie + "?genre=history&sort_by=-imdb_score&page_size=6",
    Adventure: pathToOcMovie + "?genre=adventure&sort_by=-imdb_score&page_size=6",
    Family: pathToOcMovie + "?genre=family&sort_by=-imdb_score&page_size=6",
    Romance: pathToOcMovie + "?genre=romance&sort_by=-imdb_score&page_size=6",
    Biography: pathToOcMovie + "?genre=biography&sort_by=-imdb_score&page_size=6",
    Crime: pathToOcMovie + "?genre=crime&sort_by=-imdb_score&page_size=6",
    War: pathToOcMovie + "?genre=war&sort_by=-imdb_score&page_size=6",
    SciFi: pathToOcMovie + "?genre=sci-fi&sort_by=-imdb_score&page_size=6",
    Horror: pathToOcMovie + "?genre=horror&sort_by=-imdb_score&page_size=6",
    Western: pathToOcMovie + "?genre=western&sort_by=-imdb_score&page_size=6",
    Comedy: pathToOcMovie + "?genre=comedy&sort_by=-imdb_score&page_size=6",
    Thriller: pathToOcMovie + "?genre=thriller&sort_by=-imdb_score&page_size=6&sort_by=-imdb_score&page_size=6",
    Sport: pathToOcMovie + "?genre=sport&sort_by=-imdb_score&page_size=6",
    News: pathToOcMovie + "?genre=news&sort_by=-imdb_score&page_size=6",
    Musical: pathToOcMovie + "?genre=musical&sort_by=-imdb_score&page_size=6",
    RealityTv: pathToOcMovie + "?genre=reality-tv&sort_by=-imdb_score&page_size=6",
    FilmNoir: pathToOcMovie + "?genre=film-noir&sort_by=-imdb_score&page_size=6",
    Adult: pathToOcMovie + "?genre=adult&sort_by=-imdb_score&page_size=6",
    Animation: pathToOcMovie + "?genre=animation&sort_by=-imdb_score&page_size=6",
    Documentary: pathToOcMovie + "?genre=documentary&sort_by=-imdb_score&page_size=6",
    Music: pathToOcMovie + "?genre=music&sort_by=-imdb_score&page_size=6",
    Mistery: pathToOcMovie + "?genre=mistery&sort_by=-imdb_score&page_size=6",

}
//console.log(Object.values(genreMovie))