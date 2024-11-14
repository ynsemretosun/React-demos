import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkButton from "./LinkButton";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="sm:w-64 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:focus:w-72 placeholder:text-stone-400 rounded-full px-4 py-2 text-sm bg-yellow-100"
      ></input>
    </form>
  );
}

export default SearchBar;
