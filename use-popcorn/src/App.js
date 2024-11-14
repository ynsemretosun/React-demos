import { useEffect, useRef, useState } from "react";
import "./index.css";
import StarRating from "./Star";
import { useMovie } from "./useMovie";
import { useLocalStorage } from "./useLocalStorage";
import { useKey } from "./useKey";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
const apiKey = "dcb956eb";
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");

  const [isOpen2, setIsOpen2] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const { movies, isLoading, error } = useMovie(query, setSelectedMovieId);
  const [watched, setWatched] = useLocalStorage([], "watched");
  function handleSelectMovie(id) {
    setSelectedMovieId((selected) => (id === selectedMovieId ? null : id));
  }

  function handleBackClick() {
    setSelectedMovieId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    setSelectedMovieId("");
  }

  function handleRemoveFromWatched(id) {
    setWatched((movie) =>
      movie.filter((watchedMovie) => watchedMovie.imdbID !== id)
    );
  }

  /*useEffect(function () {
    console.log("After initial render");
  }, []);
  useEffect(function () {
    console.log("After every render");
  });

  useEffect(
    function () {
      console.log("After query changed");
    },
    [query]
  );

  console.log("During render");*/

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <Result movies={movies} />
      </NavBar>
      <MainSection>
        <Box>
          {isLoading ? (
            error !== "" ? (
              <Error message={error} />
            ) : (
              <Loading />
            )
          ) : (
            <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedMovieId ? (
            <>
              <BackButton handleOnClick={handleBackClick} />
              <SelectedMovie
                setSelectedMovieId={setSelectedMovieId}
                selectedMovieId={selectedMovieId}
                apiKey={apiKey}
                handleAddWatched={handleAddWatched}
                watched={watched}
              />
            </>
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList
                watched={watched}
                handleRemoveFromWatched={handleRemoveFromWatched}
              />
            </>
          )}
        </Box>
      </MainSection>
    </>
  );
}
function BackButton({ handleOnClick }) {
  return (
    <button className="btn-back" onClick={handleOnClick}>
      ⬅
    </button>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
function Search({ query, setQuery }) {
  const inputElement = useRef(null);
  useKey("Enter", function () {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Result({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function MainSection({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
function MovieList({ movies, handleSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handleSelectMovie={handleSelectMovie}
        />
      ))}
    </ul>
  );
}
function Movie({ movie, handleSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => handleSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function WatchedBox({ isOpen, setIsOpen, children }) {
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, handleRemoveFromWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          handleRemoveFromWatched={handleRemoveFromWatched}
        />
      ))}
    </ul>
  );
}
function WatchedMovie({ movie, handleRemoveFromWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleRemoveFromWatched(movie.imdbID)}
        >
          {" "}
          ✖️{" "}
        </button>
      </div>
    </li>
  );
}

function Loading() {
  return <p className="loader"> Loading ... </p>;
}

function Error({ message }) {
  return (
    <p className="error">
      <span> 🚫</span>
      {message}
    </p>
  );
}

function SelectedMovie({
  selectedMovieId,
  apiKey,
  handleAddWatched,
  watched,
  setSelectedMovieId,
}) {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);

  const countRating = useRef(0);

  useEffect(
    function () {
      if (userRating) countRating.current = countRating.current + 1;
    },
    [userRating]
  );

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
      RatingCounter: countRating.current,
    };
    handleAddWatched(newWatchedMovie);
    setSelectedMovie("");
  }

  async function getSpesificData() {
    setIsLoading(true);
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedMovieId}`
    );
    const movieData = await response.json();
    setSelectedMovie(movieData);
    setIsLoading(false);
  }
  function goBack() {
    setSelectedMovieId("");
  }
  useKey("Escape", goBack);
  useEffect(
    function () {
      getSpesificData();
    },
    [selectedMovieId]
  );

  useEffect(
    function () {
      if (selectedMovie) document.title = `MOVIE: ${title}`;
      else document.title = "usePopcorn";

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
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
              {!watched
                .map((movie) => movie.imdbID)
                .includes(selectedMovieId) ? (
                <StarRating
                  starNumber={10}
                  color="yellow"
                  onSetRating={setUserRating}
                ></StarRating>
              ) : (
                <p>
                  {" "}
                  You already rated this movie with{" "}
                  <b>
                    {
                      watched.find(
                        (watched) => watched.imdbID === selectedMovieId
                      )?.userRating
                    }
                  </b>{" "}
                  stars !
                </p>
              )}

              {userRating && (
                <button
                  className="btn-add"
                  onClick={() => handleAddWatchedMovie(selectedMovie)}
                >
                  + Add to watchlist
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p> Starring {actors} </p>
            <p> Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
