import { useState, useEffect } from "react";

export function useMovie(query, setSelectedMovieId) {
  const apiKey = "dcb956eb";
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    [query, setSelectedMovieId]
  );
  return { movies, isLoading, error };
}
