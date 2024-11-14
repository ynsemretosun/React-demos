import { useEffect, useState } from "react";
import "./index.css";
import StarRating from "./Star";

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
const apiKey = "dcb956eb";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

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

  useEffect(
    function () {
      const controller = new AbortController();
      async function getData() {
        if (query.length < 3) {
          setMovies([]);
          setError("");
          return;
        }
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Nothing found related with your keyword!");
          }

          setMovies(data.Search);
          setError("");
          setIsLoading(false);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        }
      }

      setSelectedMovieId("");

      getData();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

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
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
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

  function goBack(target) {
    if (target.code === "Escape") {
      setSelectedMovieId("");
    }
  }

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

  async function getSpesificData() {
    setIsLoading(true);
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedMovieId}`
    );
    const movieData = await response.json();
    setSelectedMovie(movieData);
    setIsLoading(false);
  }

  useEffect(function () {
    function callback() {
      document.addEventListener("keydown", (e) => goBack(e));
      return function () {
        document.removeEventListener("keydown", callback);
      };
    }
    callback();
  }, []);
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
