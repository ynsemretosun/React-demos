import { useEffect, useState } from "react";
import StarRating from "./Star";
import { Loading } from "./App";
import selectedMovieId from "./App";
import apiKey from "./App";

export default function SelectedMovie({
  selectedMovieId,
  apiKey,
  handleAddWatched,
}) {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);

  const {
    Title: title,
    Poster: poster,
    Year: year,
    imdbRating,
    Runtime: runtime,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Plot: plot,
  } = selectedMovie;

  function handleAddWatchedMovie() {
    const newWatchedMovie = {
      imdbID: selectedMovieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    handleAddWatched(newWatchedMovie);
    setSelectedMovie("");
  }

  useEffect(
    function () {
      async function getSpesificData() {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedMovieId}`
        );
        const movieData = await response.json();
        setSelectedMovie(movieData);
        setIsLoading(false);
      }
      getSpesificData();
    },
    [apiKey, selectedMovie, selectedMovieId]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <img src={poster} alt={selectedMovieId}></img>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} - {runtime}{" "}
              </p>
              <p> {genre} </p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                starNumber={10}
                color="yellow"
                onSetRating={setUserRating}
              ></StarRating>
              <p>
                <em>{plot}</em>
              </p>
              <p> Starring {actors} </p>
              <p> Directed by {director}</p>
              {userRating && (
                <button
                  className="btn-add"
                  onClick={() => handleAddWatchedMovie(selectedMovie)}
                >
                  + Add to watchlist
                </button>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
